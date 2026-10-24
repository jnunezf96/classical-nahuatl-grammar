// Request assembly over privately retained owner inputs. This adapter adds no
// grammatical relation and never accepts an application Result.
export function getDoubleNucleusEditChildren(runtime, exact) {
  const inputs=runtime.getClassicalNahuatlDeverbalNncReloadInputs?.(exact);
  if(inputs?.constructionKind!=='double-nucleus-ownerhood')return [];
  const source=inputs.source,actual=exact.sourceFrame;
  if(!source || source.principalNncResult!==actual?.principalNncResult
    ||source.supplementNncResult!==actual?.supplementNncResult
    ||source.canonicalSupplementationResult!==actual?.canonicalSupplementationResult
    ||runtime.isClassicalNahuatlOrdinaryNncResult?.(source.principalNncResult)!==true
    ||runtime.isClassicalNahuatlOrdinaryNncResult?.(source.supplementNncResult)!==true
    ||runtime.isClassicalNahuatlSupplementationFrame?.(source.canonicalSupplementationResult)!==true)return [];
  return [{role:'Supplement nucleus',key:'supplement',exact:source.supplementNncResult},
    {role:'Principal nucleus',key:'principal',exact:source.principalNncResult}];
}

export function isDoubleNucleusContinuationCapture(runtime, capture, exact) {
  return capture?.capturedResultRole==='continuation-result'
    &&capture.canonicalResult===exact
    &&getDoubleNucleusEditChildren(runtime,capture.applicationResult?.canonicalResult)
      .some(child=>child.exact===exact);
}

export function buildDoubleNucleusEditRequest(runtime,parent,role,replacement) {
  const children=getDoubleNucleusEditChildren(runtime,parent);
  if(!children.some(child=>child.key===role)
    ||runtime.isClassicalNahuatlOrdinaryNncResult?.(replacement)!==true)return null;
  const inputs=runtime.getClassicalNahuatlDeverbalNncReloadInputs(parent);
  const relationRequest=runtime.buildClassicalNahuatlSupplementationReplacementRequest?.(
    inputs.source.canonicalSupplementationResult,role==='supplement'?'adjoined':'principal',replacement);
  if(!relationRequest)return null;
  const relation=runtime.evaluateClassicalNahuatlSupplementationOperation?.(relationRequest);
  if(runtime.isClassicalNahuatlSupplementationFrame?.(relation)!==true
    ||relation.authorizationStatus!=='authorized')return null;
  return {...inputs,source:{...inputs.source,
    [role==='principal'?'principalNncResult':'supplementNncResult']:replacement,
    canonicalSupplementationResult:relation}};
}
