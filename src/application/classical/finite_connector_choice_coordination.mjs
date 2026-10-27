// Remember explicit owner-offered finite connector choices by their finite
// coordinate. Memory is a draft, never execution authority or a grammar rule.
export function createFiniteConnectorCoordinator(owner) {
  const memories = new WeakMap();
  const authentic = binding => owner?.isClassicalGrammarTypedSourceOperationBindingFrame?.(binding) === true
    && binding.operationId === 'vnc:application' && Boolean(binding.exactSource);
  const fields = ['subject','mood','tense','requestedDerivation','requestedVoice',
    'derivationOptionId','nonactiveOptionId','objectSelection','objectInterpretation',
    'applicativeObjectKind','applicativeObjectPerson','causativeObjectKind',
    'causativeSpecificShuntlineRealization','irregularStemChoice'];
  const coordinate = binding => JSON.stringify(fields.map(key => binding.effectiveSelections?.[key] || ''));
  const available = (binding,value) => binding.choiceOptionProjection?.finiteSingularConnector?.some(
    option => option.optionId === value && option.availabilityStatus === 'available') === true;
  function handoff(previous,next,{choiceId='',value='',explicitValidated=false,issue}={}) {
    if (!authentic(previous) || !authentic(next) || previous.exactSource !== next.exactSource) return null;
    const saved = new Map(memories.get(previous) || []);
    if (choiceId === 'finiteSingularConnector' && explicitValidated && available(previous,value)
      && next.callerSelections?.finiteSingularConnector === value) saved.set(coordinate(previous),value);
    let final = next;
    if (choiceId !== 'finiteSingularConnector' && next.bindingStatus === 'ready') {
      const restored = saved.get(coordinate(next));
      if (restored && available(next,restored)
        && next.effectiveSelections?.finiteSingularConnector !== restored && typeof issue === 'function') {
        const selections = {...next.callerSelections,finiteSingularConnector:restored};
        if (selections.sentenceOptions) selections.sentenceOptions={...selections.sentenceOptions,finiteSingularConnector:restored};
        const candidate = issue(selections);
        if (authentic(candidate) && candidate.exactSource === next.exactSource
          && candidate.bindingStatus === 'ready' && coordinate(candidate) === coordinate(next)
          && candidate.callerSelections?.finiteSingularConnector === restored
          && candidate.effectiveSelections?.finiteSingularConnector === restored
          && available(candidate,restored)) final = candidate;
      }
    }
    memories.set(final,saved);
    return final;
  }
  return Object.freeze({handoff});
}

// The continuation lane is tied to its exact accepted Result and uses its own
// owner-issued preflight. It shares no receipt or draft with typed Sources.
export function createFiniteConnectorContinuationCoordinator(owner) {
  const memories=new WeakMap(), receipts=new WeakMap();
  const authentic=(frame,parent)=>Boolean(parent && frame
    && owner?.isClassicalNahuatlVncContinuationBindingFrame?.(frame) === true
    && frame.operationId === 'vnc:application' && frame.exactInputResult === parent
    && frame.ownerInputAcceptanceProven === true && (frame.bindingStatus === 'ready'
      || frame.bindingStatus === 'rejected'
        && frame.blockReason === 'classical-vnc-continuation-object-interpretation-not-licensed'
        && Array.isArray(frame.executionArgs) && frame.executionArgs.length === 0));
  const fields=['subject','mood','tense','requestedDerivation','requestedVoice','derivationOptionId',
    'nonactiveOptionId','objectSelection','objectInterpretation','applicativeObjectKind',
    'applicativeObjectPerson','causativeObjectKind','causativeSpecificShuntlineRealization','irregularStemChoice'];
  const coordinate=frame=>JSON.stringify(fields.map(key=>frame.callerSelections?.[key] || ''));
  const offered=(frame,value)=>frame.ownerChoiceOptionProjection?.finiteSingularConnector?.some(
    option=>option.optionId===value && option.availabilityStatus==='available') === true;
  function prepare({frame,parent,selections,choiceId='other',explicitValidated=false,additionalResults={}}={}) {
    if (!authentic(frame,parent) || !selections || !['finiteSingularConnector','other'].includes(choiceId)) return null;
    const next={...selections},saved=new Map(memories.get(frame)||[]);
    let restored=false;
    const selected=next.finiteSingularConnector || next.sentenceOptions?.finiteSingularConnector || '';
    if (choiceId==='finiteSingularConnector' && explicitValidated && offered(frame,selected)) saved.set(coordinate(frame),selected);
    if (choiceId!=='finiteSingularConnector') {
      const candidate=owner.issueClassicalNahuatlVncContinuationBindingFrame?.('vnc:application',parent,next,additionalResults);
      if (authentic(candidate,parent) && candidate.bindingStatus === 'ready') {
        const savedChoice=saved.get(coordinate(candidate));
        if (savedChoice && offered(candidate,savedChoice)) {
          next.finiteSingularConnector=savedChoice;
          if (next.sentenceOptions) next.sentenceOptions={...next.sentenceOptions,finiteSingularConnector:savedChoice};
          restored=true;
        }
      }
    }
    const receipt=Object.freeze({});receipts.set(receipt,{frame,parent,saved,selections:next});
    return Object.freeze({selections:Object.freeze(next),receipt,restored,executionAuthority:false});
  }
  function commit(previous,next,parent,receipt) {
    const value=receipt && receipts.get(receipt);
    if (!value || value.frame!==previous || value.parent!==parent || !authentic(previous,parent) || !authentic(next,parent)) return false;
    for (const key of fields) if ((next.callerSelections?.[key] || '') !== (value.selections[key] || '')) return false;
    const expected=value.selections.finiteSingularConnector || value.selections.sentenceOptions?.finiteSingularConnector || '';
    const actual=next.callerSelections?.finiteSingularConnector || next.callerSelections?.sentenceOptions?.finiteSingularConnector || '';
    if (actual!==expected) return false;
    receipts.delete(receipt);memories.set(next,value.saved);return true;
  }
  function carry(previous,next,parent) {
    if (!authentic(previous,parent) || !authentic(next,parent)) return false;
    const memory=memories.get(previous);if (memory) memories.set(next,memory);return true;
  }
  return Object.freeze({prepare,commit,carry});
}
