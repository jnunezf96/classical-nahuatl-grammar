// Non-authorizing coordination adapter. State lives only in construction position.
export const COMPARISON_OPERATION_ROUTES=Object.freeze(['equality-iuhqui','similarity-iuhqui-principal','comparative-tachcauh-hualcah','comparative-panahuia-unspecified','similarity-reduplicative-prefix','comparative-panahuia-specified']);
const issued=new WeakSet();
const selected=s=>s?.relation==='comparison'&&COMPARISON_OPERATION_ROUTES.includes(s.comparisonRoute);
export function issueComparisonOperationSnapshot(controller,selections,source,contract=null,prior=null,ingress=prior?.ingress || selections){
 if(!selected(selections))return null;
 const intent=Object.freeze({...selections});
 contract ||= controller.buildDecisionContract(intent);
 if(!controller.isCurrentChoiceFrame(contract?.currentChoiceFrame,intent))return null;
 const captures=Object.freeze(Object.keys(contract.derived.captureSlotLayout).map(role=>Object.freeze({role,exact:controller.getCapturedCanonicalResult(role)||null})));
 if(!captures.some(x=>x.exact===source)&&!(issued.has(prior)&&prior.source===source))return null;
 const snapshot=Object.freeze({kind:'comparison-operation-contract',routeId:selections.comparisonRoute,controller,source,ingress,selections:intent,contract,captures});
 issued.add(snapshot);return snapshot;
}
export function isCurrentComparisonOperationSnapshot(snapshot){
 return issued.has(snapshot)&&snapshot.controller.isCurrentChoiceFrame(snapshot.contract.currentChoiceFrame,snapshot.selections)
  &&snapshot.captures.every(x=>(snapshot.controller.getCapturedCanonicalResult(x.role)||null)===x.exact);
}
export function readComparisonOperationSelections(snapshot,legacy,source){
 return issued.has(snapshot)&&snapshot.ingress===legacy&&selected(legacy)&&snapshot.source===source?snapshot.selections:legacy;
}
export function transitionComparisonOperationSnapshot(snapshot,intent,expectedFrame){
 if(!isCurrentComparisonOperationSnapshot(snapshot)||!snapshot.controller.isCurrentChoiceFrame(expectedFrame,snapshot.selections))
  return Object.freeze({handled:true,authorizationStatus:'blocked',blockReason:'comparison-choice-stale-frame'});
 const transition=snapshot.controller.transitionComparisonChoice({selections:snapshot.selections,expectedFrame,intent});
 if(transition.authorizationStatus!=='authorized')return transition;
 return Object.freeze({...transition,snapshot:issueComparisonOperationSnapshot(snapshot.controller,transition.selections,snapshot.source,transition.contract,snapshot)});
}
