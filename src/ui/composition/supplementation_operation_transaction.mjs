import {createOwnerOperationProtocol} from './owner_operation_protocol.mjs?issuedBinding=20261028-1';
export const SUPPLEMENTATION_OPERATION_ROUTES=Object.freeze(['supplementation','vocative','rumored-report','deleted-principal','negative-ac-plural','contextual-first-person-realization','exclamatory-utterance','such-that-adjunction']);
const same=(a,b)=>Object.keys(a).length===Object.keys(b).length&&Object.keys(a).every(k=>a[k]===b[k]);
const protocol=createOwnerOperationProtocol({
 kind:'supplementation-operation-contract',select:s=>SUPPLEMENTATION_OPERATION_ROUTES.includes(s?.relation),routeId:s=>s.relation,
 projectIntent:s=>Object.freeze({...s}),buildContract:(c,s)=>c.buildDecisionContract(s),
 isCurrentFrame:(c,contract,s,expected=contract?.currentChoiceFrame)=>c.isCurrentChoiceFrame(expected,s),
 projectCaptures:(c,contract)=>{return contract.currentChoiceFrame.inputs.flatMap(({role})=>[
  {role,exact:c.getCapturedCanonicalResult(role)||null},
  {role:`${role}:discourse-context`,exact:c.getCapturedDiscourseSourceContext(role)||null}
 ]);},
 transition:(c,selections,intent,expectedFrame)=>c.transitionSentenceChoice({selections,intent,expectedFrame}),
 equivalent:(a,b)=>a.controller===b.controller&&a.source===b.source&&same(a.selections,b.selections)
  &&a.contract.currentChoiceFrame.captureRevision===b.contract.currentChoiceFrame.captureRevision
  &&a.contract.currentChoiceFrame.stagedRevision===b.contract.currentChoiceFrame.stagedRevision,
 staleReason:'sentence-choice-stale-frame'
});
export const issueSupplementationOperationSnapshot=protocol.issue;
export const isCurrentSupplementationOperationSnapshot=protocol.isCurrent;
export const readSupplementationOperationSelections=protocol.readSelections;
export const transitionSupplementationOperationSnapshot=protocol.transition;
