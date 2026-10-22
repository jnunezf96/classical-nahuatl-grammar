// Andrews 16.8 copies the internal ix morpheme. The original constituent
// keeps its reduced x realization; the new copy retains its initial vowel.
export function deriveQuantitiveInternalReduplication(baseStem = '', owner = null) {
  const parts = String(baseStem).split('-');
  const matrixLength = parts.slice(-2).join('-') === 'qui-ch' ? 2 : 1;
  const matrixStem = parts.slice(-matrixLength).join('-');
  const targetIndex = parts.length - matrixLength - 1;
  const sourceMorpheme = matrixLength === 2 ? 'x' : 'z';
  if (!['qui-ch','qui','quī'].includes(matrixStem) || targetIndex < 1
      || parts[targetIndex] !== sourceMorpheme) return null;
  const underlyingMorpheme = `i${parts[targetIndex]}`;
  const derivedParts = [...parts];
  derivedParts.splice(targetIndex + 1, 0, underlyingMorpheme);
  const boundaryFrame = sourceMorpheme === 'z'
    ? owner?.buildClassicalNahuatlDerivationalBoundarySpellingFrame?.({
        sourceStem: sourceMorpheme, retainedStem: sourceMorpheme, followingMorpheme: underlyingMorpheme,
      }) : null;
  if (sourceMorpheme === 'z') {
    if (boundaryFrame?.authorizationStatus !== 'authorized') return null;
    derivedParts[targetIndex] = boundaryFrame.outputSpelling;
  }
  return Object.freeze({
    kind: 'quantitive-internal-reduplication',
    operation: 'copy-internal-quantity-morpheme',
    semanticRelation: 'distributive-varietal',
    baseStem,
    targetIndex,
    underlyingMorpheme,
    baseRealization: parts[targetIndex],
    copiedMorpheme: underlyingMorpheme,
    realizedOriginal: derivedParts[targetIndex],
    boundaryFrame,
    derivedStem: derivedParts.join('-'),
    derivedEmbed: derivedParts.slice(0, -matrixLength).join('-'),
    matrixStem,
  });
}

// A typed structured citation requests a formation; it does not supply an
// answer. Reconstruct the base and require that the operation reproduces it.
// Callers must separately validate the base through their grammatical owner.
export function analyzeQuantitiveInternalReduplication(stem = '', owner = null) {
  const parts = String(stem).split('-');
  const matrixLength = parts.slice(-2).join('-') === 'qui-ch' ? 2 : 1;
  const copyIndex = parts.length - matrixLength - 1;
  if (copyIndex < 2 || !['ix','iz'].includes(parts[copyIndex])) return null;
  const baseParts = parts.filter((_, index) => index !== copyIndex);
  if (parts[copyIndex] === 'iz' && baseParts[copyIndex - 1] === 'c') baseParts[copyIndex - 1] = 'z';
  const operation = deriveQuantitiveInternalReduplication(baseParts.join('-'), owner);
  return operation?.derivedStem === stem ? operation : null;
}
