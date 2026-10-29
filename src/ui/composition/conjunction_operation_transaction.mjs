import {createOwnerOperationProtocol} from './owner_operation_protocol.mjs?issuedBinding=20261028-1&ownerDecision=20261029-12';
export const CONJUNCTION_OPERATION_ROUTES=Object.freeze(['conjunction','correlative-conjunction','lexical-conjunction','parallel-structure']);
const equal=(a,b)=>a===b || Boolean(a&&b&&typeof a==='object'&&typeof b==='object'
 &&Object.keys(a).length===Object.keys(b).length&&Object.keys(a).every(k=>equal(a[k],b[k])));
const protocol=createOwnerOperationProtocol({
 kind:'conjunction-operation-contract',select:s=>CONJUNCTION_OPERATION_ROUTES.includes(s?.relation),routeId:s=>s.relation,
 projectIntent:s=>Object.freeze({...s}),
 buildContract:(c,s)=>c.buildDecisionContract(s),
 isCurrentFrame:(c,contract,s,expected=contract?.currentChoiceFrame)=>c.isCurrentChoiceFrame(expected,s),
 projectCaptures:(c,contract)=>contract.currentChoiceFrame.inputs.map(({role})=>({role,exact:c.getCapturedCanonicalResult(role)||null})),
 transition:(c,selections,intent,expectedFrame)=>c.transitionConjunctionChoice({selections,intent,expectedFrame}),
 equivalent:(a,b)=>a.controller===b.controller&&a.source===b.source&&equal(a.selections,b.selections)
  &&a.contract.currentChoiceFrame.captureRevision===b.contract.currentChoiceFrame.captureRevision
  &&a.contract.currentChoiceFrame.stagedRevision===b.contract.currentChoiceFrame.stagedRevision,
 staleReason:'conjunction-choice-stale-frame'
});
export const issueConjunctionOperationSnapshot=protocol.issue;
export const isCurrentConjunctionOperationSnapshot=protocol.isCurrent;
export const readConjunctionOperationSelections=protocol.readSelections;
export const transitionConjunctionOperationSnapshot=protocol.transition;
