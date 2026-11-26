const KIND = 'classical-construction-blueprint';
const VERSION = 1;
const MAX_NODES = 128;
const MAX_DEPTH = 32;
const MAX_TEXT_BYTES = 4_096;
const MAX_TOTAL_TEXT_BYTES = 65_536;
const utf8 = new TextEncoder();

function reject() {
  throw new TypeError('Invalid construction blueprint');
}

function readRecord(value) {
  if (value === null || typeof value !== 'object') reject();
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== Object.prototype && prototype !== null) reject();

  const record = Object.create(null);
  for (const key of Reflect.ownKeys(value)) {
    const property = Object.getOwnPropertyDescriptor(value, key);
    if (typeof key !== 'string' || !property?.enumerable || !Object.hasOwn(property, 'value')) {
      reject();
    }
    record[key] = property.value;
  }
  return record;
}

function checkFields(record, required, optional = []) {
  if (required.some((key) => !Object.hasOwn(record, key))
      || Object.keys(record).some((key) => !required.includes(key) && !optional.includes(key))) {
    reject();
  }
}

function readArray(value, readItem, maxLength = Infinity) {
  if (!Array.isArray(value) || Object.getPrototypeOf(value) !== Array.prototype) reject();
  const { value: length } = Object.getOwnPropertyDescriptor(value, 'length');
  if (!Number.isSafeInteger(length) || length < 0 || length > maxLength
      || Reflect.ownKeys(value).length !== length + 1) reject();
  const items = [];
  for (let index = 0; index < length; index++) {
    const property = Object.getOwnPropertyDescriptor(value, index);
    if (!property?.enumerable || !Object.hasOwn(property, 'value')) reject();
    items.push(readItem(property.value, index, items));
  }
  return items;
}

function readNatural(value, strict) {
  if (!Number.isSafeInteger(value) || value < 0 || (strict && Object.is(value, -0))) reject();
  return value === 0 ? 0 : value;
}

function createPortableReader(strict) {
  const completed = new WeakMap();
  const arraysByKey = new Map();
  const arrays = [];
  let textBytes = 0;

  function chargeText(bytes) {
    textBytes += bytes;
    if (textBytes > MAX_TOTAL_TEXT_BYTES) reject();
  }

  function readText(text) {
    // In Unicode mode, a valid surrogate pair matches as one code point
    // outside the surrogate range.
    if (typeof text !== 'string' || /[\uD800-\uDFFF]/u.test(text)) reject();
    const normalized = text.normalize('NFC');
    if ((strict && text !== normalized) || normalized.length > MAX_TEXT_BYTES) reject();
    const bytes = utf8.encode(normalized).length;
    if (bytes > MAX_TEXT_BYTES) reject();
    chargeText(bytes);
    return normalized;
  }

  function readValue(value, arrayDepth = 0) {
    if (typeof value === 'number') value = readNatural(value, strict);
    if (typeof value === 'string') value = readText(value);
    if (value === null || typeof value === 'boolean'
        || typeof value === 'number' || typeof value === 'string') {
      return { value, encoding: value, depth: 0 };
    }
    if (arrayDepth >= MAX_DEPTH) reject();
    const existing = completed.get(value);
    if (existing) {
      if (arrayDepth + existing.depth > MAX_DEPTH) reject();
      chargeText(existing.textBytes);
      return existing;
    }

    const startBytes = textBytes;
    const children = readArray(value, (item) => readValue(item, arrayDepth + 1));
    const entries = children.map((child) => child.encoding);
    const key = JSON.stringify(entries);
    let array = arraysByKey.get(key);
    if (!array) {
      let depth = 1;
      for (const child of children) depth = Math.max(depth, child.depth + 1);
      // An array encodes as a one-element reference tuple. Its entries live
      // in a local postorder table, so shared arrays never expand into a tree.
      array = {
        value: Object.freeze(children.map((child) => child.value)),
        encoding: [arrays.length],
        depth,
        textBytes: textBytes - startBytes,
      };
      arrays.push(entries);
      arraysByKey.set(key, array);
    }
    completed.set(value, array);
    return array;
  }

  return { readText, readValue, arrays, get textBytes() { return textBytes; } };
}

function readOrdering(value) {
  const ordering = readRecord(value);
  checkFields(ordering, [], ['inputs', 'slots', 'choices']);
  const allowed = {
    inputs: ['schema', 'unordered'],
    slots: ['schema', 'written', 'unordered'],
    choices: ['schema'],
  };
  for (const [coordinate, mode] of Object.entries(ordering)) {
    if (!allowed[coordinate].includes(mode)) reject();
  }
  return ordering;
}

function compareText(left, right) {
  if (left === right) return 0;
  return left < right ? -1 : 1;
}

function compareEncodedLists(left, right, compareEntry) {
  for (let index = 0; index < Math.min(left.length, right.length); index++) {
    const comparison = compareEntry(left[index], right[index]);
    if (comparison !== 0) return comparison;
  }
  // Each entry starts with '[' and a continuation starts with ','. Both sort
  // before the closing ']' of the shorter tuple.
  return right.length - left.length;
}

function compareSlots(left, right) {
  return compareText(left.roleKey, right.roleKey) || compareStructures(left.node, right.node);
}

function compareStructures(left, right) {
  if (left === right) return 0;
  // Compare the JSON tuple encoding of the tree without expanding shared DAG
  // branches. Interned children with equal structure compare by identity.
  const header = compareText(left.orderKey, right.orderKey);
  if (header !== 0 || left.nodeKind === 'source') return header;
  return compareEncodedLists(left.inputs, right.inputs, compareStructures)
    || compareEncodedLists(left.slots, right.slots, compareSlots)
    || compareText(left.choiceKey, right.choiceKey);
}

function createInterner() {
  const nodesByKey = new Map();
  let totalTextBytes = 0;
  return (node, identityKey, textBytes) => {
    const existing = nodesByKey.get(identityKey);
    if (existing) return existing;
    if (nodesByKey.size >= MAX_NODES || totalTextBytes + textBytes > MAX_TOTAL_TEXT_BYTES) {
      reject();
    }
    const interned = { ...node, index: nodesByKey.size, identityKey };
    nodesByKey.set(identityKey, interned);
    totalTextBytes += textBytes;
    return interned;
  };
}

function readNode(value, intern, readDependency, strict) {
  const node = readRecord(value);
  const { nodeKind } = node;
  const portable = createPortableReader(strict);
  const { readText, readValue } = portable;

  if (nodeKind === 'source') {
    checkFields(node, ['nodeKind', 'constructorId', 'arguments']);
    const constructorId = readText(node.constructorId);
    const args = readArray(node.arguments, (item) => readValue(item));
    const orderKey = JSON.stringify([
      nodeKind, constructorId, args.map((arg) => arg.encoding), portable.arrays,
    ]);
    return intern({
      nodeKind, constructorId, arguments: Object.freeze(args.map((arg) => arg.value)),
      orderKey, depth: 1,
    }, orderKey, portable.textBytes);
  }
  if (nodeKind !== 'application') reject();

  const inputField = strict ? 'inputRefs' : 'inputs';
  const slotField = strict ? 'nodeRef' : 'node';
  checkFields(node, ['nodeKind', 'operationId', inputField, 'slots', 'choices'],
    strict ? [] : ['ordering']);
  const ordering = Object.hasOwn(node, 'ordering') ? readOrdering(node.ordering) : {};
  const operationId = readText(node.operationId);
  let depth = 1;
  const readChild = (value) => {
    const child = readDependency(value);
    depth = Math.max(depth, child.depth + 1);
    if (depth > MAX_DEPTH) reject();
    return child;
  };
  const inputs = readArray(node[inputField], readChild);
  const slots = readArray(node.slots, (value) => {
    const slot = readRecord(value);
    checkFields(slot, ['roleId', slotField]);
    const roleId = readText(slot.roleId);
    return { roleId, roleKey: JSON.stringify(roleId), node: readChild(slot[slotField]) };
  });
  const choices = readArray(node.choices, (value) => {
    const choice = readRecord(value);
    checkFields(choice, ['choiceId', 'value']);
    return { choiceId: readText(choice.choiceId), value: readValue(choice.value) };
  });

  if (ordering.inputs === 'unordered') inputs.sort(compareStructures);
  if (ordering.slots === 'unordered') slots.sort(compareSlots);
  const orderKey = JSON.stringify([nodeKind, operationId]);
  const choiceKey = JSON.stringify([
    choices.map(({ choiceId, value }) => [choiceId, value.encoding]), portable.arrays,
  ]);
  // Interning uses local child identities. Sorting and public numbering use
  // structure and are independent of these discovery indexes.
  const identityKey = JSON.stringify([
    nodeKind, operationId, inputs.map((child) => child.index),
    slots.map(({ roleId, node: child }) => [roleId, child.index]), choiceKey,
  ]);
  return intern({
    nodeKind, operationId, inputs, slots, choices, orderKey, choiceKey, depth,
  }, identityKey, portable.textBytes);
}

function postorder(root) {
  const nodes = [];
  const visited = new Set();
  function visit(node) {
    if (visited.has(node)) return;
    visited.add(node);
    if (node.nodeKind === 'application') {
      for (const input of node.inputs) visit(input);
      for (const slot of node.slots) visit(slot.node);
    }
    nodes.push(node);
  }
  visit(root);
  return nodes;
}

function readBlueprint(candidate) {
  const envelope = readRecord(candidate);
  checkFields(envelope, ['kind', 'version', 'root', 'nodes']);
  if (envelope.kind !== KIND || envelope.version !== VERSION) reject();
  const rootRef = readNatural(envelope.root, true);
  const intern = createInterner();
  const nodes = readArray(envelope.nodes, (value, index, earlier) => readNode(
    value, intern, (ref) => {
      const childRef = readNatural(ref, true);
      if (childRef >= index) reject();
      return earlier[childRef];
    }, true,
  ), MAX_NODES);
  if (rootRef >= nodes.length) reject();
  const ordered = postorder(nodes[rootRef]);
  if (ordered.length !== nodes.length || ordered.some((node, index) => node !== nodes[index])) {
    reject();
  }
  return nodes;
}

function emitBlueprint(root) {
  const nodes = postorder(root);
  const refs = new Map(nodes.map((node, index) => [node, index]));
  const portableNodes = nodes.map((node) => {
    const { nodeKind } = node;
    if (nodeKind === 'source') {
      return Object.freeze({ nodeKind, constructorId: node.constructorId, arguments: node.arguments });
    }
    return Object.freeze({
      nodeKind,
      operationId: node.operationId,
      inputRefs: Object.freeze(node.inputs.map((child) => refs.get(child))),
      slots: Object.freeze(node.slots.map(({ roleId, node: child }) =>
        Object.freeze({ roleId, nodeRef: refs.get(child) }))),
      choices: Object.freeze(node.choices.map(({ choiceId, value }) =>
        Object.freeze({ choiceId, value: value.value }))),
    });
  });
  return Object.freeze({
    kind: KIND, version: VERSION, root: refs.get(root), nodes: Object.freeze(portableNodes),
  });
}

export function buildClassicalConstructionBlueprint(rootDescriptor) {
  try {
    const intern = createInterner();
    const completed = new WeakMap();
    const active = new WeakSet();
    function readDescriptor(descriptor, depth) {
      if (depth > MAX_DEPTH || active.has(descriptor)) reject();
      const existing = completed.get(descriptor);
      if (existing) return existing;
      if (descriptor === null || typeof descriptor !== 'object') reject();
      active.add(descriptor);
      const node = readNode(descriptor, intern, (child) => readDescriptor(child, depth + 1), false);
      active.delete(descriptor);
      completed.set(descriptor, node);
      return node;
    }
    return emitBlueprint(readDescriptor(rootDescriptor, 1));
  } catch {
    return null;
  }
}

export function canonicalizeClassicalConstructionBlueprint(candidate) {
  try {
    const nodes = readBlueprint(candidate);
    return emitBlueprint(nodes.at(-1));
  } catch {
    return null;
  }
}

export function equalClassicalConstructionBlueprint(left, right) {
  try {
    const leftNodes = readBlueprint(left);
    const rightNodes = readBlueprint(right);
    return leftNodes.length === rightNodes.length
      && leftNodes.every((node, index) => node.identityKey === rightNodes[index].identityKey);
  } catch {
    return false;
  }
}

export function getClassicalConstructionSubgraph(blueprint, nodeRef) {
  try {
    const ref = readNatural(nodeRef, true);
    const nodes = readBlueprint(blueprint);
    return ref < nodes.length ? emitBlueprint(nodes[ref]) : null;
  } catch {
    return null;
  }
}
