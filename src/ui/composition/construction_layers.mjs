// Read-only owner projection: staging never executes or publishes the packet.
export function getConstructionLayerReadiness(runtime,packet) {
  if(packet?.kind==='result-edit')return getConstructionLayerReadiness(runtime,packet.inner);
  if(packet?.operation==='nnc:personal-name' && packet?.request?.operationId==='nnc:personal-name'
    && Object.hasOwn(packet.request.args?.[0] || {},'canonicalSourceResult')) {
    const request=packet.request.args?.[0];
    const resolution=runtime.resolvePersonalNameNncExactSource?.(request);
    const valid=runtime.isPersonalNameNncExactSourceResolution?.(resolution)===true
      && resolution.authorizationStatus==='authorized'
      && resolution.canonicalSourceResult===packet.source
      && request?.canonicalSourceResult===packet.source
      && resolution.requiredChoiceIds.length===0;
    const plan=valid ? runtime.preparePersonalNameNncParadigmPlan?.({sourceFrame:resolution.sourceFrame,
      affectiveScope:request.affectiveScope,affectiveMatrix:request.affectiveMatrix}) : null;
    if(!valid || runtime.isPersonalNameNncParadigmPlan?.(plan)!==true)return {ready:false,
      blockReason:resolution?.blockReason || plan?.blockReason || 'personal-name-compatible-affective-operation-required',
      recoveryKind:plan?.blockReason === 'ordinary-nnc-embed-source-use-analysis-required'
        ? 'personal-name-compound-source' : 'personal-name-affective'};
  }
  const tense=packet?.choices?.tense || packet?.request?.args?.[0]?.tense || '';
  for(const layer of packet?.layers || []) {
    if(layer.operationId==='sentence:particle-adjunction') {
      const availability=runtime.getClassicalNahuatlSentenceParticleSpeakerAvailability?.(layer.particleId,layer.speakerGender);
      if(availability?.ready!==true)return {ready:false,
        blockReason:availability?.blockReason || 'classical-sentence-particle-speaker-availability-required',
        recoveryKind:availability?.recoveryKind || ''};
    }
    if(layer.operationId!=='sentence:adverbial-adjunction')continue;
    const availability=runtime.getClassicalNahuatlSentenceAdverbialAvailability?.(layer.particleId,tense);
    if(availability?.ready!==true)return {ready:false,blockReason:availability?.blockReason || 'classical-sentence-adverbial-availability-required'};
  }
  return {ready:true,blockReason:''};
}
// The particle owner classifies its exact current host. A nuclear Result
// and an already composed particle sentence use different input contracts.
export function getConstructionParticleHostInput(runtime,operation,host) {
  const binding=runtime.issueClassicalNahuatlParticleSentenceBindingFrame?.(operation,host);
  if(runtime.isClassicalNahuatlParticleSentenceBindingFrame?.(binding)!==true
    || binding.authorizationStatus!=='authorized' || binding.operationId!==operation
    || binding.exactResult!==host || binding.exactHostClause!==host)return null;
  return binding.inputRole==='host-clause' ? Object.freeze({nuclearResultFrame:host})
    : binding.inputRole==='consumed-sentence' ? Object.freeze({consumedSentenceFrame:host}) : null;
}
