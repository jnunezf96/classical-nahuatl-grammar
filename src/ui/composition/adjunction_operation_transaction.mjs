import {createOwnerOperationProtocol} from './owner_operation_protocol.mjs?issuedBinding=20261028-1&ownerDecision=20261029-12';
export const ADJUNCTION_OPERATION_ROUTES=Object.freeze(['time','place','duration','manner','intensification','compared-manner','means','consideration','purpose','condition','concession','consequence','proviso','reason']);
const same=(a,b)=>Object.keys(a).length===Object.keys(b).length&&Object.keys(a).every(k=>a[k]===b[k]);
const protocol=createOwnerOperationProtocol({
 kind:'adjunction-operation-contract',select:s=>ADJUNCTION_OPERATION_ROUTES.includes(s?.relation),routeId:s=>s.relation,
 projectIntent:s=>Object.freeze({...s}),buildContract:(c,s)=>c.buildDecisionContract(s),
 isCurrentFrame:(c,contract,s,expected=contract?.currentChoiceFrame)=>c.isCurrentChoiceFrame(expected,s),
 projectCaptures:(c,contract)=>{return contract.currentChoiceFrame.inputs.flatMap(({role})=>[
  {role,exact:c.getCapturedCanonicalResult(role)||null},
  {role:`${role}:discourse-context`,exact:c.getCapturedDiscourseSourceContext(role)||null}
 ]);},
 transition:(c,selections,intent,expectedFrame)=>c.transitionAdjunctionChoice({selections,intent,expectedFrame}),
 equivalent:(a,b)=>a.controller===b.controller&&a.source===b.source&&same(a.selections,b.selections)
  &&a.contract.currentChoiceFrame.captureRevision===b.contract.currentChoiceFrame.captureRevision
  &&a.contract.currentChoiceFrame.stagedRevision===b.contract.currentChoiceFrame.stagedRevision,
 staleReason:'adjunction-choice-stale-frame'
});
export const issueAdjunctionOperationSnapshot=protocol.issue;
export const isCurrentAdjunctionOperationSnapshot=protocol.isCurrent;
export const readAdjunctionOperationSelections=protocol.readSelections;
export const transitionAdjunctionOperationSnapshot=protocol.transition;
