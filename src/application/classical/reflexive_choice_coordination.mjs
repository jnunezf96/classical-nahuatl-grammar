// Project the owner's current interpretation domain without granting execution.
export function resolveReflexiveInterpretationChoice(owner, {
  valence = '', subject = '', stem = '', requestedValue = '',
} = {}) {
  const requested = String(requestedValue || '').trim().toLowerCase();
  const result = (state, values = [], effectiveValue = '') => Object.freeze({
    state, values: Object.freeze([...values]), requestedValue: requested,
    effectiveValue, executionAuthority: false,
  });
  if (valence !== 'mainline-reflexive') return result('inactive');
  if (!/^[123](?:sg|pl|common)$/u.test(subject)
    || typeof owner?.buildClassicalNahuatlTransitiveVncObjectFrame !== 'function') {
    return result('unresolved');
  }
  let frame;
  try {
    frame = owner.buildClassicalNahuatlTransitiveVncObjectFrame(stem, {
      subject, objectKind: 'mainline-reflexive', objectInterpretation: requested || 'reflexive',
    })?.objectFrame;
  } catch {
    return result('unresolved');
  }
  const values = frame?.availableInterpretations;
  if (frame?.objectKind !== 'mainline-reflexive' || !Array.isArray(values) || !values.length
    || values.some(value => !['reflexive', 'reciprocal'].includes(value))
    || typeof frame.interpretationAuthorized !== 'boolean'
    || typeof frame.requestedInterpretation !== 'string') {
    return result('unresolved');
  }
  return result(frame.interpretationAuthorized ? 'licensed' : 'incompatible', values, frame.requestedInterpretation);
}

// An issued rejection retains a request for correction, not execution authority.
export function resolveRejectedReflexiveDraft(owner, exactResult, frame, intent = null) {
  if (owner?.isClassicalNahuatlVncContinuationBindingFrame?.(frame) !== true
    || frame.operationId !== 'vnc:application' || frame.exactInputResult !== exactResult
    || frame.ownerInputAcceptanceProven !== true
    || frame.blockReason !== 'classical-vnc-continuation-object-interpretation-not-licensed'
    || !frame.callerSelections || frame.executionArgs?.length) return null;
  const draft = {...frame.callerSelections};
  if (intent?.choiceId === 'objectInterpretation' && ['reflexive','reciprocal'].includes(intent.value)) {
    draft.objectInterpretation = intent.value;
  } else if (intent?.choiceId === 'subject' && /^[123](?:sg|pl|common)$/u.test(intent.value || '')) {
    draft.subject = intent.value;
  } else if (intent) return null;
  return Object.freeze(draft);
}
