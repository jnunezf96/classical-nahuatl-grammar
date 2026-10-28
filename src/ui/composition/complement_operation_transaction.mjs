import {createOwnerOperationProtocol} from './owner_operation_protocol.mjs?issuedBinding=20261028-1';
export const COMPLEMENT_OPERATION_ROUTES=Object.freeze(['object-complement','subject-complement','adverbial-complement']);
const equal=(a,b)=>a===b || Boolean(a&&b&&typeof a==='object'&&typeof b==='object'
 &&Object.keys(a).length===Object.keys(b).length&&Object.keys(a).every(k=>equal(a[k],b[k])));
const protocol=createOwnerOperationProtocol({
 kind:'complement-operation-contract',select:s=>COMPLEMENT_OPERATION_ROUTES.includes(s?.relation),routeId:s=>s.relation,
 projectIntent:s=>Object.freeze({...s}),
 buildContract:(c,s)=>c.buildDecisionContract(s),
 isCurrentFrame:(c,contract,s,expected=contract?.currentChoiceFrame)=>c.isCurrentChoiceFrame(expected,s),
 projectCaptures:(c,contract)=>contract.currentChoiceFrame.inputs.map(({role})=>({role,exact:c.getCapturedCanonicalResult(role)||null})),
 transition:(c,selections,intent,expectedFrame)=>c.transitionComplementChoice({selections,intent,expectedFrame}),
 equivalent:(a,b)=>a.controller===b.controller&&a.source===b.source&&equal(a.selections,b.selections)
  &&a.contract.currentChoiceFrame.captureRevision===b.contract.currentChoiceFrame.captureRevision
  &&a.contract.currentChoiceFrame.stagedRevision===b.contract.currentChoiceFrame.stagedRevision,
 staleReason:'complement-choice-stale-frame'
});
export const issueComplementOperationSnapshot=protocol.issue;
export const isCurrentComplementOperationSnapshot=protocol.isCurrent;
export const readComplementOperationSelections=protocol.readSelections;
export const transitionComplementOperationSnapshot=protocol.transition;
