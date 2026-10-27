// Draft descriptions only: the exact Source owner remains the execution authority.
const dependentDomains = Object.freeze({
  possessor: ['possessorValues', 'selectedPossessor'],
  pluralConnector: ['pluralConnectorValues', 'selectedPluralConnector'],
  singularConnector: ['singularConnectorValues', 'selectedSingularConnector'],
  possessorReduplication: ['possessorReduplicationAvailable', 'selectedPossessorReduplication'],
});
const issuedMemories = new WeakSet();

export function stageOrdinaryNncDependencies(owner, source, selections = {}, {
  choiceId = '', previousMemory = null, previousSelections = null, explicitValidated = false,
} = {}) {
  const active = {...selections};
  if (owner.isClassicalNahuatlOrdinaryNncSourceFrame?.(source) !== true) {
    return Object.freeze({active:Object.freeze(active), memory:null, invalid:true});
  }
  const values = previousMemory && issuedMemories.has(previousMemory) && previousMemory.source === source
    ? {...previousMemory.values} : {};
  const frame = owner.getCanonicalNncOperationSelectionFrame?.(source, active);
  const prior = previousSelections && owner.getCanonicalNncOperationSelectionFrame?.(source, previousSelections);
  if (frame?.authorizationStatus !== 'authorized' || frame.sourceFrame !== source || frame.sourceKind !== 'ordinary') {
    return Object.freeze({active:Object.freeze(active), memory:null, invalid:true});
  }
  const applicable = (f, id) => id === 'possessorReduplication'
    ? f?.possessorReduplicationAvailable === true
    : Array.isArray(f?.[dependentDomains[id][0]]) && f[dependentDomains[id][0]].length > 0;
  const allowed = (f, id, value) => id === 'possessorReduplication'
    ? applicable(f,id) && typeof value === 'boolean'
    : Array.isArray(f?.[dependentDomains[id][0]]) && f[dependentDomains[id][0]].includes(value);
  if (explicitValidated && Object.hasOwn(dependentDomains, choiceId)
    && Object.hasOwn(active, choiceId) && allowed(frame, choiceId, active[choiceId])) {
    values[choiceId] = active[choiceId];
  }
  let invalid = false;
  for (const id of Object.keys(dependentDomains)) {
    if (id === 'possessorReduplication' && Object.hasOwn(active,id) && typeof active[id] !== 'boolean') invalid = true;
    if (!applicable(frame,id)) {
      const value = active[id];
      const wasRecognized = prior?.authorizationStatus === 'authorized' && prior.sourceFrame === source
        && previousSelections?.[id] === value && prior[dependentDomains[id][1]] === value && allowed(prior,id,value);
      if (value === '' || value === false || value == null || wasRecognized
        || Object.hasOwn(values,id) && values[id] === value) delete active[id];
      else invalid = true;
    } else if (choiceId !== id && Object.hasOwn(values, id)) {
      // Keep an incompatible active request for the canonical owner to reject.
      active[id] = values[id];
    } else if (choiceId === id && Object.hasOwn(active,id) && !explicitValidated) {
      invalid = true;
    }
  }
  const memory = Object.freeze({source, values:Object.freeze(values)});
  issuedMemories.add(memory);
  return Object.freeze({active:Object.freeze(active), memory, invalid, executionAuthority:false});
}
