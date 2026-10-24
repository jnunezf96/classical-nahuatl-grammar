// Add extends the current Result; Change reopens its existing operation.
// Both retain a whole/occurrence packet, so distinguish the explicit intent.
export function getVncChoiceEditContext(runtime, edit, capture) {
  if (edit?.action !== 'change' || edit.intent === 'add'
    || !edit.target || edit.target !== capture?.canonicalResult) return null;
  return runtime.getClassicalNahuatlVncApplicationEditContext?.(edit.target) || null;
}

// Passive/impersonal Subjects are derived by the voice owner. A requested
// active subject is not evidence of the promoted/faceless participant.
export function getVncVoiceEditSubject(runtime, binding) {
  if (binding?.bindingStatus !== 'ready' || binding.effectiveSelections?.requestedVoice === 'active') return null;
  const preview = runtime.previewClassicalGrammarTypedSourceOperationBindingFrame?.(binding);
  if (runtime.isClassicalGrammarApplicationPreview?.(preview) !== true) return null;
  return preview.canonicalResult?.resultFrame?.participantProjection?.targetSubject || null;
}

// Build follows the selected exact operation even when the separate Source
// editor currently contains a noun. The preview supplies display facts only.
export function projectVncChoiceEditControls(runtime, edit, capture, binding, previous = {}) {
  const context = getVncChoiceEditContext(runtime, edit, capture);
  if (!context || binding?.operationId !== 'vnc:application'
    || binding.exactSource !== context.sourceFrame
    || runtime.isClassicalGrammarTypedSourceOperationBindingFrame?.(binding) !== true) return null;
  const preview = runtime.previewClassicalGrammarTypedSourceOperationBindingFrame?.(binding);
  const application = runtime.isClassicalGrammarApplicationPreview?.(preview) === true
    ? preview.canonicalResult : context.applicationFrame;
  const selected = binding.effectiveSelections;
  const participant = application.resultFrame.participantProjection.targetSubject;
  return {...previous, basalUnit:'vnc', authorityCapabilityFrame:null,
    machineryFrame:application.resultFrame.selectedMachineryFrame,
    state:{...previous.state, stem:application.normalizedRequest.sourceStem,
      verbClass:application.normalizedRequest.verbClass,
      sourceValence:application.normalizedRequest.sourceValence,
      subject:participant.agreement, vncSubjectFrame:participant,
      mood:selected.mood, tense:selected.tense,
      derivationType:selected.requestedDerivation,
      derivationOptionId:selected.derivationOptionId || '',
      vncVoice:selected.requestedVoice, selectedNonactiveOptionId:selected.nonactiveOptionId || '',
      vncApplicationFrame:application}};
}
