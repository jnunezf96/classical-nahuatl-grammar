import {createOwnerOperationProtocol} from './owner_operation_protocol.mjs?issuedBinding=20261028-1';
// Thin owner adapter; the construction session remains the sole state store.
export const COMPARISON_OPERATION_ROUTES=Object.freeze(['equality-iuhqui','similarity-iuhqui-principal','comparative-tachcauh-hualcah','comparative-panahuia-unspecified','similarity-reduplicative-prefix','comparative-panahuia-specified','equality-ihuan','size-ixquich','size-quezqui-no-izqui','size-more-more-correlative','comparative-adversative','comparative-negative-adverbial','question-how-much-more','superlative-adverbial','superlative-incorporated','superlative-principal-ic','similarity-downgraded-possessive-tla','similarity-tloc-relational-nnc','similarity-same-as-pronominal','similarity-incorporated-nehnequi','similarity-iuhqui-larger-concatenate','similarity-resemblance-verbstem-nnc','similarity-ihui-vnc']);
const equal=(a,b)=>a===b || Boolean(a && b && typeof a==='object' && typeof b==='object'
 && Object.keys(a).length===Object.keys(b).length && Object.keys(a).every(key=>equal(a[key],b[key])));
const protocol=createOwnerOperationProtocol({
 kind:'comparison-operation-contract',
 select:s=>s?.relation==='comparison'&&COMPARISON_OPERATION_ROUTES.includes(s.comparisonRoute),
 routeId:s=>s.comparisonRoute,
 projectIntent:s=>Object.freeze({...s}), // Comparison owner selection fields are scalar.
 buildContract:(c,s)=>c.buildDecisionContract(s),
 isCurrentFrame:(c,contract,s,expected=contract?.currentChoiceFrame)=>c.isCurrentChoiceFrame(expected,s),
 projectCaptures:(c,contract)=>Object.keys(contract.derived.captureSlotLayout).map(role=>({role,exact:c.getCapturedCanonicalResult(role)||null})),
 transition:(c,selections,intent,expectedFrame)=>c.transitionComparisonChoice({selections,expectedFrame,intent}),
 equivalent:(a,b)=>a.controller===b.controller&&a.source===b.source&&equal(a.selections,b.selections)
  &&a.contract.currentChoiceFrame.captureRevision===b.contract.currentChoiceFrame.captureRevision
  &&a.contract.currentChoiceFrame.stagedRevision===b.contract.currentChoiceFrame.stagedRevision,
 staleReason:'comparison-choice-stale-frame'
});
export const issueComparisonOperationSnapshot=protocol.issue;
export const isCurrentComparisonOperationSnapshot=protocol.isCurrent;
export const readComparisonOperationSelections=protocol.readSelections;
export const transitionComparisonOperationSnapshot=protocol.transition;
