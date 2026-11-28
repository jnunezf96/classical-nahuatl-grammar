// The wire format carries literal choices and indexes into the Owner's
// construction graph. References resolve to locally issued objects.
const maxRequestDepth = 64;
const maxPayloadBytes = 65_536;
const marker = '$dependency';
const issuerMarker = '$issue';
const sourceMarker = '$source';
const absentMarker = '$undefined';
const bareRecordMarker = '$record';
const reservedFields = new Set([
  marker, issuerMarker, sourceMarker, absentMarker, bareRecordMarker,
  '__proto__', 'constructor', 'prototype', 'authorizationStatus',
]);
const literalKinds = new Set([
  'classical-nahuatl-nnc-nounstem-request',
  'classical-nahuatl-relational-source-composition-request',
  'classical-nahuatl-relational-source-composition-stem-node',
  'classical-nahuatl-relational-source-composition-compound-node',
  'adjectival-root-nnc',
  'adjectival-general-use-nnc',
  'preterit-agentive-nnc',
  'particle',
  'nounstem',
]);

const sourceInstructions = new WeakMap();
const issuedPortableResults = new WeakSet();

export function markPortableResult(value) {
  issuedPortableResults.add(value);
}

export function recordPortableSource(input, issuer, args) {
  const inputs = [];
  const serialized = encodePortableBuildRequest({operationId: issuer, args}, value => {
    const authority = Object.getOwnPropertyDescriptor(value, 'authorizationStatus')?.value;
    if (!sourceInstructions.has(value) && !issuedPortableResults.has(value)
      && !(Object.isFrozen(value) && authority === 'authorized')) return undefined;
    const index = inputs.indexOf(value);
    return index < 0 ? inputs.push(value) - 1 : index;
  });
  if (!serialized) return;
  const recorded = decodePortableBuildRequest(serialized, index => inputs[index]);
  sourceInstructions.set(input, recorded);
}


export const hasPortableSource = value => sourceInstructions.has(value);
export const portableSourceIssuer = value => sourceInstructions.get(value)?.operationId ?? null;

function copy(value, context, depth = 0) {
  if (depth > maxRequestDepth) throw new TypeError('Request is too deeply nested');
  if (value === undefined) return {[absentMarker]: true};
  if (value === null || typeof value === 'string' || typeof value === 'boolean'
      || (Number.isFinite(value) && !Object.is(value, -0))) return value;
  if (!value || typeof value !== 'object') throw new TypeError('Unsupported request value');
  const index = context.reference?.(value);
  if (index !== undefined) return {[marker]: index};
  const instruction = context.describe?.(value);
  if (instruction) {
    const previous = context.sourceIndexes.get(value);
    if (previous !== undefined) return {[sourceMarker]: previous};
    const args = copy(instruction.args, context, depth + 1);
    const index = context.sourceIndexes.size;
    context.sourceIndexes.set(value, index);
    context.onSource(value);
    return {[issuerMarker]: [index, instruction.operationId, args]};
  }
  if (Array.isArray(value)) {
    if (Reflect.ownKeys(value).length !== value.length + 1) throw new TypeError('Invalid choice list');
    return Array.from({length: value.length}, (_, index) => {
      const field = Object.getOwnPropertyDescriptor(value, index);
      if (!field?.enumerable || !Object.hasOwn(field, 'value')) throw new TypeError('Invalid choice item');
      return copy(field.value, context, depth + 1);
    });
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== Object.prototype && prototype !== null) throw new TypeError('Unsupported choice record');
  const fields = Object.getOwnPropertyDescriptors(value);
  const keys = Reflect.ownKeys(fields);
  if (context.decoding && keys.length === 1 && keys[0] === absentMarker && fields[absentMarker].value === true) {
    return undefined;
  }
  if (context.decoding && keys.length === 1 && keys[0] === bareRecordMarker) {
    const record = fields[bareRecordMarker].value;
    if (!record || Object.getPrototypeOf(record) !== Object.prototype
      || Object.keys(record).some(key => reservedFields.has(key))) throw new TypeError('Invalid choice record');
    return Object.assign(Object.create(null), copy(record, context, depth));
  }
  if (keys.length === 1 && keys[0] === marker && context.resolve) {
    const index = fields[marker].value;
    const exact = Number.isSafeInteger(index) && index >= 0 ? context.resolve(index) : null;
    if (!exact) throw new TypeError('Invalid request dependency');
    return exact;
  }
  if (keys.length === 1 && keys[0] === sourceMarker && context.issue) {
    const index = fields[sourceMarker].value;
    const source = Number.isSafeInteger(index) && index >= 0 ? context.issuedSources[index] : null;
    if (!source) throw new TypeError('Invalid Source reference');
    return source;
  }
  if (keys.length === 1 && keys[0] === issuerMarker && context.issue) {
    const instruction = fields[issuerMarker].value;
    if (!Array.isArray(instruction) || instruction.length !== 3
        || typeof instruction[1] !== 'string' || !Array.isArray(instruction[2])) {
      throw new TypeError('Invalid Source instruction');
    }
    const [index, issuer, arguments_] = instruction;
    const args = copy(arguments_, context, depth + 1);
    if (index !== context.issuedSources.length) throw new TypeError('Invalid Source index');
    const source = context.issue(issuer, args);
    if (!source) throw new TypeError('Source could not be issued');
    context.issuedSources.push(source);
    return source;
  }
  const result = Object.fromEntries(keys.map(key => {
    const field = fields[key];
    if (typeof key !== 'string' || !field.enumerable || !Object.hasOwn(field, 'value')
        || reservedFields.has(key)
        || (key === 'kind' && !literalKinds.has(field.value))) {
      throw new TypeError('Unsupported request field');
    }
    return [key, copy(field.value, context, depth + 1)];
  }));
  return prototype === null ? {[bareRecordMarker]: result} : result;
}

export function encodePortableBuildRequest(request, reference, onSource) {
  try {
    const describe = onSource && (value => sourceInstructions.get(value));
    const encoded = copy(request, {reference, describe, onSource, sourceIndexes: new Map()});
    if (typeof encoded?.operationId !== 'string' || !Array.isArray(encoded.args)) return null;
    const serialized = JSON.stringify(encoded);
    return serialized.length <= maxPayloadBytes ? serialized : null;
  } catch {
    return null;
  }
}

export function decodePortableBuildRequest(serialized, resolve, issue) {
  try {
    if (typeof serialized !== 'string' || serialized.length > maxPayloadBytes) return null;
    const request = copy(JSON.parse(serialized), {resolve, issue, issuedSources: [], decoding: true});
    return typeof request?.operationId === 'string' && Array.isArray(request.args)
      ? request : null;
  } catch {
    return null;
  }
}

// A single choice record and the complete ancestry have separate budgets.
const maxGraphBytes = 1024 * 1024;
const maxGraphSuffixLength = Math.ceil(maxGraphBytes * 4 / 3);
const utf8 = new TextEncoder();
const text = new TextDecoder('utf-8', {fatal: true});

export function encodeBuildRequestSuffix(entries) {
  const bytes = utf8.encode(JSON.stringify(entries));
  if (bytes.length > maxGraphBytes) return null;
  let binary = '';
  for (let offset = 0; offset < bytes.length; offset += 8192) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + 8192));
  }
  return btoa(binary).replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/, '');
}

export function decodeBuildRequestSuffix(suffix) {
  try {
    if (typeof suffix !== 'string' || suffix.length > maxGraphSuffixLength
      || !/^[A-Za-z0-9_-]+$/.test(suffix)) return null;
    const binary = atob(suffix.replaceAll('-', '+').replaceAll('_', '/'));
    const entries = JSON.parse(text.decode(Uint8Array.from(binary, char => char.charCodeAt(0))));
    return Array.isArray(entries) && encodeBuildRequestSuffix(entries) === suffix ? entries : null;
  } catch {
    return null;
  }
}


const continuationBindings = new WeakMap();

export function recordPortableContinuation(binding) {
  if (binding?.bindingStatus !== 'ready') return;
  for (const argument of binding.executionArgs) {
    if (!argument || typeof argument !== 'object') continue;
    const bindings = continuationBindings.get(argument) ?? new Set();
    bindings.add(binding);
    continuationBindings.set(argument, bindings);
  }
}

export function describePortableContinuation(request) {
  if (!Array.isArray(request?.args)) return null;
  for (const argument of request.args) {
    for (const binding of continuationBindings.get(argument) ?? []) {
      if (binding.operationId === request.operationId
          && binding.executionArgs.length === request.args.length
          && binding.executionArgs.every((value, index) => value === request.args[index])) {
        return {...request, inputIssuer: 'vnc-continuation',
          args: [binding.exactInputResult, binding.callerSelections, binding.additionalResultFrames]};
      }
    }
  }
  return null;
}


const preparedInputs = new WeakMap();

export function recordPortablePreparedInput(prepared, binding) {
  if (binding) preparedInputs.set(prepared, binding);
}

export function getPortablePreparedInput(prepared) {
  return preparedInputs.get(prepared);
}
