// Presentation state retains owner-issued objects; it never reconstructs grammar.
export function createCompositionSelection() {
  let accepted = null;
  let path = [];
  return Object.freeze({
    accept(result) {
      if (result !== accepted) { accepted = result; path = []; }
      return accepted;
    },
    select(nextPath = []) {
      let current = accepted;
      for (const key of nextPath) {
        if (!current || typeof current !== 'object' || !current[key]) return false;
        current = current[key];
      }
      path = [...nextPath];
      return true;
    },
    get result() { return accepted; },
    get path() { return [...path]; },
    get target() { return path.reduce((node, key) => node?.[key], accepted); }
  });
}

export function getCompositionParts(result, isRelation) {
  if (!isRelation(result)) return [];
  const parts = [];
  const walk = (node, path, label, seen) => {
    if (!node || seen.has(node)) return;
    const nextSeen = new Set(seen).add(node);
    parts.push({node, path, label});
    if (!isRelation(node)) return;
    for (const [role, key, continuations] of [
      ['Principal', 'principalClause', 'principalContinuationFrames'],
      ['Adjunct', 'supplementClause', 'supplementContinuationFrames']
    ]) {
      const nested = node[continuations] || [];
      if (nested.length) nested.forEach((child, index) => walk(child, [...path, continuations, index], role, nextSeen));
      else if (node[key]) parts.push({node: node[key], path: [...path, key], label: role});
    }
    (node.interveningClauses || []).forEach((child, index) => parts.push({node:child, path:[...path,'interveningClauses',index], label:'Intervening clause'}));
  };
  walk(result, [], 'Whole sentence', new Set());
  return parts;
}
