// Keep staged tense requests per mood; all generated forms still require the
// canonical typed-source owner. Receipts below describe a transition only.
export function createVncTenseCoordinator(owner) {
  const memories = new WeakMap();
  const receipts = new WeakMap();
  const authentic = binding => Boolean(
    binding && binding.operationId === 'vnc:application'
      && owner?.isClassicalGrammarTypedSourceOperationBindingFrame?.(binding) === true
      && binding.exactSource && binding.navigator?.exactSource === binding.exactSource
  );
  const domainFor = mood => {
    const values = owner?.getClassicalNahuatlVncParadigmTensesForMood?.(mood);
    return Array.isArray(values) ? values : [];
  };
  const licensed = (mood, tense, available) => Boolean(
    available.includes(tense) && domainFor(mood).includes(tense)
      && owner?.validateClassicalNahuatlVncSemanticSelection?.({mood,tense})?.authorizationStatus === 'authorized'
  );
  function prepare({binding, choiceId = '', mood = '', tense = '', availableTenses = null, explicitValidated = false} = {}) {
    if (!authentic(binding) || !Array.isArray(availableTenses)
      || !['mood','tense','other'].includes(choiceId)
      || !licensed(mood,tense,availableTenses)) return null;
    if (choiceId === 'tense' && binding.effectiveSelections?.mood !== mood) return null;
    const remembered = {...(memories.get(binding) || {})};
    if (choiceId === 'tense' && explicitValidated === true) remembered[mood] = tense;
    const saved = choiceId === 'mood' ? remembered[mood] : '';
    const restored = Boolean(saved && licensed(mood,saved,availableTenses));
    const selected = restored ? saved : tense;
    const receipt = Object.freeze({});
    receipts.set(receipt, {binding, source:binding.exactSource, mood, tense:selected, remembered});
    return Object.freeze({mood,tense:selected,restored,receipt,executionAuthority:false});
  }
  function commit(previous, next, receipt) {
    const transition = receipt && receipts.get(receipt);
    if (!transition || transition.binding !== previous || !authentic(previous) || !authentic(next)
      || next.exactSource !== transition.source || previous.exactSource !== transition.source
      || next.effectiveSelections?.mood !== transition.mood || next.effectiveSelections?.tense !== transition.tense) return false;
    receipts.delete(receipt);
    memories.set(next,Object.freeze({...transition.remembered}));
    return true;
  }
  function carry(previous,next) {
    if (!authentic(previous) || !authentic(next) || previous.exactSource !== next.exactSource) return false;
    const previousMemory=memories.get(previous);
    if (previousMemory) memories.set(next,previousMemory);
    return true;
  }
  return Object.freeze({prepare,commit,carry});
}

// A prospective UI frame asks the existing irregular owner about the new cell.
export function buildProspectiveVncTenseFrame(owner, previous, binding, selections) {
  const state = {...previous?.state, subject:selections.subject, mood:selections.mood, tense:selections.tense};
  const stem = binding?.ownerBindingFrame?.ownerRequest?.sourceStem || state.stem || '';
  const plan = stem && owner.buildClassicalNahuatlIrregularVncParadigmPlan?.(stem, {
    subject:state.subject, mood:state.mood, tense:state.tense,
  });
  return {...previous,state,machineryFrame:{...previous?.machineryFrame,
    ...(plan ? {lesson11ParadigmPlan:plan} : {})}};
}

// Exact Result continuations use their own issued frame and parent, never a
// typed-source receipt or a copied wrapper as execution authority.
export function createVncContinuationTenseCoordinator(owner) {
  const memories = new WeakMap(), receipts = new WeakMap();
  const authentic = (frame,parent) => Boolean(parent && frame
    && owner?.isClassicalNahuatlVncContinuationBindingFrame?.(frame) === true
    && frame.operationId === 'vnc:application' && frame.exactInputResult === parent
    && frame.ownerInputAcceptanceProven === true && frame.bindingStatus === 'ready');
  const licensed = (mood,tense,available) => Array.isArray(available) && available.includes(tense)
    && owner?.getClassicalNahuatlVncParadigmTensesForMood?.(mood)?.includes(tense)
    && owner?.validateClassicalNahuatlVncSemanticSelection?.({mood,tense})?.authorizationStatus === 'authorized';
  function prepare({frame,parent,choiceId='',mood='',tense='',availableTenses=null,explicitValidated=false}={}) {
    if (!authentic(frame,parent) || !['mood','tense','other'].includes(choiceId)
      || !licensed(mood,tense,availableTenses)) return null;
    if (choiceId === 'tense' && frame.callerSelections?.mood !== mood) return null;
    const remembered={...(memories.get(frame)||{})};
    if (choiceId === 'tense' && explicitValidated) remembered[mood]=tense;
    const saved=choiceId === 'mood' ? remembered[mood] : '';
    const restored=Boolean(saved && licensed(mood,saved,availableTenses));
    const selected=restored ? saved : tense, receipt=Object.freeze({});
    receipts.set(receipt,{frame,parent,mood,tense:selected,remembered});
    return Object.freeze({mood,tense:selected,restored,receipt,executionAuthority:false});
  }
  function commit(previous,next,parent,receipt) {
    const value=receipt && receipts.get(receipt);
    if (!value || value.frame !== previous || value.parent !== parent
      || !authentic(previous,parent) || !authentic(next,parent)
      || next.callerSelections?.mood !== value.mood || next.callerSelections?.tense !== value.tense
      || next.ownerPreflightResult?.normalizedRequest?.mood !== value.mood
      || next.ownerPreflightResult?.normalizedRequest?.tense !== value.tense) return false;
    receipts.delete(receipt);memories.set(next,Object.freeze({...value.remembered}));return true;
  }
  function carry(previous,next,parent) {
    if (!authentic(previous,parent) || !authentic(next,parent)) return false;
    const memory=memories.get(previous);if (memory) memories.set(next,memory);return true;
  }
  return Object.freeze({prepare,commit,carry});
}
