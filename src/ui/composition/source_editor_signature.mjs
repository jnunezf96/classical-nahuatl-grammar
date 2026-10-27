// An exact Result supplies its own Source analysis. The name-family control is
// then a Build choice; it is a Source declaration only in the raw-input route.
export function normalizeSourceEditorSignature(runtime, signature, capture, operationId) {
  if (operationId !== 'nnc:personal-name'
    || runtime.isClassicalGrammarApplicationResultCapture?.(capture) !== true) return signature;
  const navigator=runtime.getClassicalGrammarApplicationCapabilityNavigator?.(capture.canonicalResult);
  if (runtime.isClassicalGrammarApplicationCapabilityNavigator?.(navigator)!==true
    || navigator.exactResult!==capture.canonicalResult
    || !navigator.operations?.some(operation=>operation.operationId==='nnc:personal-name'
      && operation.availabilityStatus==='available')) return signature;
  try {
    const fields=JSON.parse(signature);
    if (!fields || Array.isArray(fields) || typeof fields!=='object') return signature;
    delete fields.sourcePersonalNameFamily;
    return JSON.stringify(fields);
  } catch { return signature; }
}
