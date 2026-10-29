import * as adjectival from './adjectival_operation_transaction.mjs?adjectivalSession=20261028-1&ownerDecision=20261029-12';
import * as adjunction from './adjunction_operation_transaction.mjs?adjunctionSession=20261028-2&ownerDecision=20261029-12';
import * as supplementation from './supplementation_operation_transaction.mjs?supplementationSession=20261028-1&utteranceProjection=20261028-1&ownerDecision=20261029-12';
import * as comparison from './comparison_operation_transaction.mjs?issuedBinding=20261028-1&ownerDecision=20261029-12';
import * as conjunction from './conjunction_operation_transaction.mjs?issuedBinding=20261028-1&ownerDecision=20261029-12';
import * as complement from './complement_operation_transaction.mjs?issuedBinding=20261028-1&ownerDecision=20261029-12';
const adapters={
 'adjectival-operation-contract':{issue:adjectival.issueAdjectivalOperationSnapshot,current:adjectival.isCurrentAdjectivalOperationSnapshot,read:adjectival.readAdjectivalOperationSelections,transition:adjectival.transitionAdjectivalOperationSnapshot},
 'adjunction-operation-contract':{issue:adjunction.issueAdjunctionOperationSnapshot,current:adjunction.isCurrentAdjunctionOperationSnapshot,read:adjunction.readAdjunctionOperationSelections,transition:adjunction.transitionAdjunctionOperationSnapshot},
 'supplementation-operation-contract':{issue:supplementation.issueSupplementationOperationSnapshot,current:supplementation.isCurrentSupplementationOperationSnapshot,read:supplementation.readSupplementationOperationSelections,transition:supplementation.transitionSupplementationOperationSnapshot},
 'complement-operation-contract':{issue:complement.issueComplementOperationSnapshot,current:complement.isCurrentComplementOperationSnapshot,read:complement.readComplementOperationSelections,transition:complement.transitionComplementOperationSnapshot},
 'comparison-operation-contract':{issue:comparison.issueComparisonOperationSnapshot,current:comparison.isCurrentComparisonOperationSnapshot,read:comparison.readComparisonOperationSelections,transition:comparison.transitionComparisonOperationSnapshot},
 'conjunction-operation-contract':{issue:conjunction.issueConjunctionOperationSnapshot,current:conjunction.isCurrentConjunctionOperationSnapshot,read:conjunction.readConjunctionOperationSelections,transition:conjunction.transitionConjunctionOperationSnapshot}
};
export function issueClauseOperationSnapshot(controller,selections,...args){
 const adapter=selections?.relation==='comparison'?adapters['comparison-operation-contract']
  :conjunction.CONJUNCTION_OPERATION_ROUTES.includes(selections?.relation)?adapters['conjunction-operation-contract']
  :supplementation.SUPPLEMENTATION_OPERATION_ROUTES.includes(selections?.relation)?adapters['supplementation-operation-contract']
  :adjunction.ADJUNCTION_OPERATION_ROUTES.includes(selections?.relation)?adapters['adjunction-operation-contract']
  :adjectival.ADJECTIVAL_OPERATION_ROUTES.includes(selections?.relation)?adapters['adjectival-operation-contract']
  :complement.COMPLEMENT_OPERATION_ROUTES.includes(selections?.relation)?adapters['complement-operation-contract']:null;
 return adapter?.issue(controller,selections,...args)||null;
}
export const isCurrentClauseOperationSnapshot=s=>adapters[s?.kind]?.current(s)||false;
export const readClauseOperationSelections=(s,legacy,source)=>adapters[s?.kind]?.read(s,legacy,source)||legacy;
export const transitionClauseOperationSnapshot=(s,intent,frame)=>adapters[s?.kind]?.transition(s,intent,frame)
 ||Object.freeze({handled:false,authorizationStatus:'blocked',blockReason:'clause-operation-snapshot-required'});
