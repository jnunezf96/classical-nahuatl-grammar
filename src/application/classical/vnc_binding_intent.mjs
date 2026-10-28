import {createDerivationChoiceCoordinator} from './derivation_choice_coordination.mjs';
import {createSentenceChoiceCoordinator} from './sentence_choice_coordination.mjs';
import {resolveRejectedReflexiveDraft} from './reflexive_choice_coordination.mjs';
import {createApplicativeChoiceCoordinator} from './applicative_choice_coordination.mjs';
import {createVncTenseCoordinator,createVncContinuationTenseCoordinator} from './vnc_tense_choice_coordination.mjs';

// Presentation intent belongs to an issued revision. No current draft or
// execution authority lives here; every candidate returns through the owner.
export function createVncBindingIntentCoordinator(owner) {
 const derivation=createDerivationChoiceCoordinator(owner);
 const sentence=createSentenceChoiceCoordinator(owner);
 const applicative=createApplicativeChoiceCoordinator(owner);
 const typedTense=createVncTenseCoordinator(owner),exactTense=createVncContinuationTenseCoordinator(owner);
 const sentenceOrigins=new WeakMap();
 const describe=b=>owner.isClassicalGrammarTypedSourceOperationBindingFrame?.(b)===true
   && b.operationId==='vnc:application' && b.exactSource && b.navigator?.exactSource===b.exactSource
   ? {source:b.exactSource,kind:'typed'}
   : owner.isClassicalNahuatlVncContinuationBindingFrame?.(b)===true
     && b.operationId==='vnc:application' && b.ownerInputAcceptanceProven===true && b.exactInputResult
     ? {source:b.exactInputResult,kind:'exact'}:null;
 // Copy the mutable sentence envelope, retaining canonical values by identity.
 const project=s=>({...s,...(s.sentenceOptions?{sentenceOptions:{...s.sentenceOptions,
   ...(Array.isArray(s.sentenceOptions.outsidePrefixes)?{outsidePrefixes:[...s.sentenceOptions.outsidePrefixes]}:{})}}:{})});
 function reissue(previousBinding,requestedSelections,{choiceId='',explicitValidated=false,issue}={}) {
  const before=describe(previousBinding);
  if(!before||typeof issue!=='function'||!requestedSelections||typeof requestedSelections!=='object'||Array.isArray(requestedSelections))return null;
  let invalid=false;
  const guardedIssue=selections=>{
   const candidate=issue(project(selections)),after=describe(candidate);
   if(!after||after.source!==before.source||after.kind!==before.kind){invalid=true;return null;}
   return candidate;
  };
  let selections=project(requestedSelections);
  if(before.kind==='exact') {
   const intent=['subject','objectInterpretation'].includes(choiceId)
     ? {choiceId,value:selections[choiceId]}:null;
   const rejected=resolveRejectedReflexiveDraft(owner,before.source,previousBinding,intent);
   if(rejected)selections={...rejected,...selections};
  }
  const applicativeChoice=['applicativeObjectKind','applicativeObjectPerson','applicativeObject','requestedDerivation'].includes(choiceId);
  const participant=before.kind==='typed' ? applicative.prepare({binding:previousBinding,selections,
   choiceId:applicativeChoice?choiceId:'other',explicitValidated}):null;
  if(before.kind==='typed'&&applicativeChoice&&!participant)return null;
  let next=guardedIssue(participant?.selections||selections);
  if(!next)return null;
  next=derivation.handoff(previousBinding,next,{choiceId,explicitValidated,issue:guardedIssue});
  if(invalid)return null;
  const derivationFrame=next;
  next=sentence.handoff(sentenceOrigins.get(previousBinding)||previousBinding,next,{choiceId,explicitValidated,issue:guardedIssue});
  if(invalid)return null;
  const sentenceFrame=next;
  const tense=before.kind==='typed'?typedTense:exactTense;
  const effective=next.effectiveSelections||next.callerSelections||{};
  const proposal=tense.prepare({binding:previousBinding,frame:previousBinding,parent:before.source,
   choiceId:['mood','tense'].includes(choiceId)?choiceId:'other',mood:effective.mood,tense:effective.tense,
   availableTenses:owner.getClassicalNahuatlVncParadigmTensesForMood?.(effective.mood)||[],explicitValidated});
  if(proposal?.restored&&proposal.tense!==effective.tense) {
   const candidate=guardedIssue({...next.callerSelections,mood:proposal.mood,tense:proposal.tense});
   if(invalid)return null;
   if(candidate.bindingStatus==='ready')next=candidate;
  }
  derivation.carry(derivationFrame,next);
  sentenceOrigins.set(next,sentenceFrame);
  if(before.kind==='typed') {
   if(!participant||!applicative.commit(previousBinding,next,participant.receipt))applicative.carry(previousBinding,next);
   if(!proposal||!tense.commit(previousBinding,next,proposal.receipt))tense.carry(previousBinding,next);
  } else if(!proposal||!tense.commit(previousBinding,next,before.source,proposal.receipt))tense.carry(previousBinding,next,before.source);
  return next;
 }
 function carry(previous,next) {
  const before=describe(previous),after=describe(next);
  if(!before||!after||before.source!==after.source||before.kind!==after.kind)return false;
  derivation.carry(previous,next);
  sentenceOrigins.set(next,sentenceOrigins.get(previous)||previous);
  if(before.kind==='typed'){applicative.carry(previous,next);typedTense.carry(previous,next);}
  else exactTense.carry(previous,next,before.source);
  return true;
 }
 return Object.freeze({reissue,carry});
}
