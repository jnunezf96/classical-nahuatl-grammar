// This coordinator retains explicit participant choices only as drafts tied to
// an exact owner-issued Source. It never authorizes an operation or supplies a
// grammatical domain; the current canonical binding does both.
export function createApplicativeChoiceCoordinator(owner) {
  const memories = new WeakMap();
  const receipts = new WeakMap();
  const authentic = binding => owner?.isClassicalGrammarTypedSourceOperationBindingFrame?.(binding) === true
    && binding.operationId === 'vnc:application' && Boolean(binding.exactSource);
  const available = (binding, id, value) => Array.isArray(binding.choiceOptionProjection?.[id])
    && binding.choiceOptionProjection[id].some(option => String(option.optionId) === String(value)
      && option.availabilityStatus === 'available');
  function prepare({binding, selections, choiceId = '', explicitValidated = false} = {}) {
    if (!authentic(binding) || !selections || typeof selections !== 'object') return null;
    if (!['applicativeObjectKind','applicativeObjectPerson','applicativeObject','requestedDerivation','other'].includes(choiceId)) return null;
    const next = {...selections};
    const saved = {...(memories.get(binding) || {})};
    const changesKind = choiceId === 'applicativeObjectKind' || choiceId === 'applicativeObject';
    const changesPerson = choiceId === 'applicativeObjectPerson' || choiceId === 'applicativeObject';
    if (choiceId === 'requestedDerivation'
      && (!explicitValidated || !available(binding,'requestedDerivation',next.requestedDerivation))) return null;
    if (changesKind && (!explicitValidated || !available(binding,'applicativeObjectKind',next.applicativeObjectKind))) return null;
    if (changesPerson && next.applicativeObjectKind === 'specific-projective'
      && (!explicitValidated || !available(binding,'applicativeObjectPerson',next.applicativeObjectPerson))) return null;
    if (changesKind) saved.kind = next.applicativeObjectKind;
    if (changesPerson && next.applicativeObjectKind === 'specific-projective') saved.person = next.applicativeObjectPerson;
    if (next.requestedDerivation !== 'applicative') {
      delete next.applicativeObjectKind;
      delete next.applicativeObjectPerson;
    } else {
      if (choiceId === 'requestedDerivation' && !next.applicativeObjectKind
        && saved.kind && available(binding,'applicativeObjectKind',saved.kind)) next.applicativeObjectKind = saved.kind;
      if (next.applicativeObjectKind === 'specific-projective') {
        if (!next.applicativeObjectPerson && saved.person
          && available(binding,'applicativeObjectPerson',saved.person)) next.applicativeObjectPerson = saved.person;
      } else delete next.applicativeObjectPerson;
    }
    const receipt = Object.freeze({});
    receipts.set(receipt,{binding,source:binding.exactSource,saved,choices:{
      requestedDerivation:next.requestedDerivation,
      applicativeObjectKind:next.applicativeObjectKind,
      applicativeObjectPerson:next.applicativeObjectPerson,
    }});
    return Object.freeze({selections:Object.freeze(next),receipt,executionAuthority:false});
  }
  function commit(previous,next,receipt) {
    const transition = receipt && receipts.get(receipt);
    if (!transition || transition.binding !== previous || !authentic(previous) || !authentic(next)
      || previous.exactSource !== transition.source || next.exactSource !== transition.source) return false;
    for (const [key,value] of Object.entries(transition.choices)) {
      if ((next.callerSelections?.[key] ?? undefined) !== value) return false;
    }
    receipts.delete(receipt);
    memories.set(next,Object.freeze({...transition.saved}));
    return true;
  }
  function carry(previous,next) {
    if (!authentic(previous) || !authentic(next) || previous.exactSource !== next.exactSource) return false;
    const saved = memories.get(previous);
    if (saved) memories.set(next,saved);
    return true;
  }
  return Object.freeze({prepare,commit,carry});
}
