import {decodeBuildRequestSuffix, decodePortableBuildRequest, encodeBuildRequestSuffix} from './portable_build_request.mjs';

const version = '84/p2/';
const chunkLength = 72;

export function encodePortableRequestGraph(entries) {
  if (!validGraph(entries)) return null;
  const suffix = encodeBuildRequestSuffix(entries);
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
  const entries = decodeBuildRequestSuffix(chunks.join(''));
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

export function collectPortableRequestGraph(root, lookup) {
  const entries = [];
  const indexes = new Map();
  const visiting = new Set();
  const pending = [{value: root, request: root, next: 0, refs: []}];
  visiting.add(root);
  try {
    while (pending.length) {
      const frame = pending.at(-1);
      if (frame.next === frame.request.dependencies.length) {
        visiting.delete(frame.value);
        const index = entries.push([frame.request.serialized, frame.refs]) - 1;
        indexes.set(frame.value, index);
        pending.pop();
        continue;
      }
      const value = frame.request.dependencies[frame.next];
      if (indexes.has(value)) {
        frame.refs.push(indexes.get(value));
        frame.next++;
        continue;
      }
      if (visiting.has(value)) return null;
      const request = lookup(value);
      if (!request) return null;
      visiting.add(value);
      pending.push({value, request, next: 0, refs: []});
    }
    return entries;
  } catch {
    return null;
  }
}

export function materializePortableRequest(owner, serialized, dependencies) {
  const plan = decodePortableBuildRequest(serialized, index => dependencies[index],
    (id, args) => owner.issuePortableSource?.(id, args));
  if (!plan) return null;
  const {operationId, inputIssuer, args} = plan;
  if (inputIssuer === 'typed-source-binding' || inputIssuer === 'typed-issued-source-binding') {
    if (args.length !== 2 || (inputIssuer === 'typed-source-binding'
      && (dependencies.length !== 1 || dependencies[0] !== args[0]))) return null;
    const typedBinding = owner.issuePortableTypedBinding(operationId, ...args);
    return typedBinding?.operationId === operationId ? {request: {operationId, typedBinding}} : null;
  }
  if (inputIssuer === 'prepared-application') {
    const prepared = owner.reissuePortablePreparation(plan);
    return prepared?.request.operationId === operationId ? {request: prepared.request, prepared} : null;
  }
  const request = Object.hasOwn(plan, 'inputIssuer')
    ? owner.reissuePortableInternalInputs(plan, dependencies) : plan;
  return request?.operationId === operationId ? {request} : null;
}
