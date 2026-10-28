import * as comparison from './comparison_operation_transaction.mjs';
import * as conjunction from './conjunction_operation_transaction.mjs';
const adapters={
 'comparison-operation-contract':{issue:comparison.issueComparisonOperationSnapshot,current:comparison.isCurrentComparisonOperationSnapshot,read:comparison.readComparisonOperationSelections,transition:comparison.transitionComparisonOperationSnapshot},
 'conjunction-operation-contract':{issue:conjunction.issueConjunctionOperationSnapshot,current:conjunction.isCurrentConjunctionOperationSnapshot,read:conjunction.readConjunctionOperationSelections,transition:conjunction.transitionConjunctionOperationSnapshot}
};
export function issueClauseOperationSnapshot(controller,selections,...args){
 const adapter=selections?.relation==='comparison'?adapters['comparison-operation-contract']
  :conjunction.CONJUNCTION_OPERATION_ROUTES.includes(selections?.relation)?adapters['conjunction-operation-contract']:null;
 return adapter?.issue(controller,selections,...args)||null;
}
export const isCurrentClauseOperationSnapshot=s=>adapters[s?.kind]?.current(s)||false;
export const readClauseOperationSelections=(s,legacy,source)=>adapters[s?.kind]?.read(s,legacy,source)||legacy;
export const transitionClauseOperationSnapshot=(s,intent,frame)=>adapters[s?.kind]?.transition(s,intent,frame)
 ||Object.freeze({handled:false,authorizationStatus:'blocked',blockReason:'clause-operation-snapshot-required'});
