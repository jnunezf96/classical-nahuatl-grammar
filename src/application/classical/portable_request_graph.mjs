import {decodeBuildRequestSuffix, decodePortableBuildRequest, encodeBuildRequestSuffix} from './portable_build_request.mjs';

const version = '84/p2/';
const chunkLength = 72;

export function encodePortableRequestGraph(entries) {
  if (!validGraph(entries)) return null;
  const suffix = encodeBuildRequestSuffix(entries.map(([request, refs]) => [JSON.parse(request), refs]));
  if (!suffix) return null;
  const chunks = [];
  for (let index = 0; index < suffix.length; index += chunkLength) {
    chunks.push(suffix.slice(index, index + chunkLength));
  }
  return version + chunks.join('/');
}

export function decodePortableRequestGraph(address) {
  if (typeof address !== 'string' || !address.startsWith(version)) return null;
  const chunks = address.slice(version.length).split('/');
  if (chunks.length > 1 && chunks.some((chunk, index) =>
    !chunk || (index < chunks.length - 1 ? chunk.length !== chunkLength : chunk.length > chunkLength))) return null;
  const wire = decodeBuildRequestSuffix(chunks.join(''));
  if (!wire?.every(entry => Array.isArray(entry) && entry.length === 2)) return null;
  // Early p2 links wrapped each request in an extra JSON string.
  const entries = wire.map(([request, refs]) => [
    typeof request === 'string' ? request : JSON.stringify(request), refs,
  ]);
  return validGraph(entries) ? entries : null;
}

function validGraph(entries) {
  if (!Array.isArray(entries) || !entries.length) return false;
  const reachable = new Set([entries.length - 1]);
  for (let index = entries.length - 1; index >= 0; index--) {
    const entry = entries[index];
    if (!reachable.has(index) || !Array.isArray(entry) || entry.length !== 2
      || typeof entry[0] !== 'string'
      || !Array.isArray(entry[1]) || new Set(entry[1]).size !== entry[1].length) return false;
    const used = new Set();
    const parsed = decodePortableBuildRequest(entry[0], ref => {
      if (ref >= entry[1].length) return null;
      used.add(ref);
      return {};
    }, () => ({}));
    if (!parsed?.operationId || used.size !== entry[1].length) return false;
    for (const ref of entry[1]) {
      if (!Number.isSafeInteger(ref) || ref < 0 || ref >= index) return false;
      reachable.add(ref);
    }
  }
  return true;
}

export function collectPortableRequestGraph(root) {
  const entries = [];
  const indexes = new Map();
  const visiting = new Set();
  const pending = [{request: root, next: 0, refs: []}];
  visiting.add(root);
  try {
    while (pending.length) {
      const frame = pending.at(-1);
      const dependencies = frame.request.inputs;
      if (frame.next === dependencies.length) {
        visiting.delete(frame.request);
        const index = entries.push([frame.request.serialized, frame.refs]) - 1;
        indexes.set(frame.request, index);
        pending.pop();
        continue;
      }
      const value = dependencies[frame.next];
      if (indexes.has(value)) {
        frame.refs.push(indexes.get(value));
        frame.next++;
        continue;
      }
      if (visiting.has(value)) return null;
      visiting.add(value);
      pending.push({request: value, next: 0, refs: []});
    }
    return entries;
  } catch {
    return null;
  }
}

export function materializePortableRequest(owner, serialized, dependencies, projectedSources) {
  const plan = decodePortableBuildRequest(serialized, index => dependencies[index],
    (id, args) => {
      const source = owner.issuePortableSource?.(id, args);
      if (source && owner.isPortableResultProjection?.(id)) {
        projectedSources.set(source, {operationId: id, args});
      }
      return source;
    });
  if (!plan) return null;
  const {operationId, inputIssuer, args} = plan;
  if (['typed-source-binding', 'typed-issued-source-binding', 'prepared-typed-source-binding'].includes(inputIssuer)) {
    if (args.length !== 2 || (inputIssuer === 'typed-source-binding'
      && (dependencies.length !== 1 || dependencies[0] !== args[0]))) return null;
    const typedBinding = owner.issuePortableTypedBinding(operationId, ...args);
    if (typedBinding?.operationId !== operationId) return null;
    if (inputIssuer !== 'prepared-typed-source-binding') return {request: {operationId, typedBinding}, inputIssuer};
    const prepared = owner.preparePortableBinding(typedBinding);
    return prepared?.request.operationId === operationId ? {request: prepared.request, prepared, inputIssuer} : null;
  }
  if (inputIssuer === 'prepared-application' || inputIssuer === 'prepared-vnc-continuation') {
    const prepared = owner.reissuePortablePreparation(plan, dependencies);
    return prepared?.request.operationId === operationId ? {request: prepared.request, prepared, inputIssuer} : null;
  }
  const request = Object.hasOwn(plan, 'inputIssuer')
    ? owner.reissuePortableInternalInputs(plan, dependencies) : plan;
  return request?.operationId === operationId ? {request, inputIssuer} : null;
}
