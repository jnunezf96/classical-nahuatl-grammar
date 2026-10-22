import {resolveResultEditTarget,projectResultForEditing} from './result_editing.mjs?v=20261014-result-edit-2';
import {rebuildResultEdit} from './result_edit_rebuild.mjs?v=20261014-result-edit-2';

// Freeze request containers while retaining the exact opaque owner frames.
export function freezeConstructionData(value) {
  if(!value || typeof value!=='object' || Object.isFrozen(value))return value;
  if(Array.isArray(value))return Object.freeze(value.map(freezeConstructionData));
  return Object.freeze(Object.fromEntries(Object.entries(value).map(([key,item])=>[key,freezeConstructionData(item)])));
}

const origins=new WeakMap();
export const getConstructionPacketOrigin=packet=>origins.get(packet) || null;
export const captureConstructionParents=controller=>Object.freeze(['principal','adjoined','dependent','supplement','marker']
  .map(role=>Object.freeze({role,exact:controller.getCapturedCanonicalResult(role) || null})));
export const matchesConstructionWitness=(binding,{source,operation,sourceOrigin=null,originOwner=null})=>Boolean(binding
  && binding.operationId===operation && (binding.exactSource===source || sourceOrigin && originOwner===source && binding.exactSource===sourceOrigin));
export function orderConstructionSlots(structure) {
  const sources=structure?.sources || [];
  const semantic=sources.map(source=>({role:source.role,exact:source.exact}));
  const pieces=structure?.spatial?.pieces?.filter(piece=>piece.kind==='unit');
  if(!pieces || pieces.length!==semantic.length)return {slots:semantic,slotOrder:'unresolved'};
  const used=new Set(),slots=[];
  for(const piece of pieces) {
    const index=semantic.findIndex((slot,index)=>!used.has(index) && slot.exact===piece.source && slot.role===piece.captureRole);
    if(index<0)return {slots:semantic,slotOrder:'unresolved'};
    used.add(index);slots.push(semantic[index]);
  }
  return {slots,slotOrder:'left-to-right'};
}
export const getConstructionFixedChoices=binding=>binding?.operationId==='nnc:ordinary'
  && !binding.choiceOptionProjection?.humanness && binding.effectiveSelections?.humanness
  ? [{choiceId:'humanness',value:binding.effectiveSelections.humanness}] : [];
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
      recoveryKind:'personal-name-affective'};
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
export function executeConstructionPacket(runtime,packet) {
  let application;
  if(packet.kind==='result-edit') {
    const edit=packet.edit;
    const project=exact=>projectResultForEditing(runtime,exact);
    const target=edit && resolveResultEditTarget(runtime,edit.root,edit.path,project);
    if(!target || target.node!==edit.target)return null;
    if(edit.action==='remove') {
      if(!target.removableTo || target.removableTo!==edit.remaining)return null;
      return runtime.captureClassicalGrammarApplicationResult?.(edit.remaining,'result-edit-make')?.applicationResult || null;
    }
    if(!packet.inner || packet.inner.kind==='result-edit')return null;
    application=executeConstructionPacket(runtime,packet.inner);
    if(application?.authorizationStatus!=='authorized')return application;
    if(edit.root===edit.target)return application;
    return rebuildResultEdit(runtime,edit.root,edit.target,application.canonicalResult,project);
  }
  if(packet.kind==='clause') {
    if(packet.captures.some(slot=>packet.controller.getCapturedCanonicalResult(slot.role)!==slot.exact))return null;
    const result=packet.controller.compose(packet.choices);
    if(result?.authorizationStatus!=='authorized')return result;
    return runtime.captureClassicalGrammarApplicationResult?.(result.canonicalResult,'construction-position-make')?.applicationResult || null;
  }
  if(packet.kind==='typed') {
    if(runtime.isClassicalGrammarTypedSourceOperationBindingFrame?.(packet.binding)!==true
      || packet.binding.exactSource!==packet.source)return null;
    application=runtime.executeClassicalGrammarTypedSourceOperationBindingFrame(packet.binding);
  } else application=runtime.executeClassicalGrammarApplicationRequest(packet.request,packet.prepared || null);
  if(application?.authorizationStatus!=='authorized')return application;
  origins.set(packet,application);
  if(packet.sentenceOptions) {
    if(packet.operation==='nnc:ordinary')application=runtime.executeClassicalGrammarApplicationRequest({
      operationId:'nnc:sentence-surface',args:[application.canonicalResult.typedSlotFrame,packet.sentenceOptions]});
    else if(packet.operation==='grammar:nominal-construction') {
      const nominal=application.canonicalResult;
      const slot=nominal?.canonicalResult?.nncSlotFrame;
      if(runtime.isClassicalNahuatlNominalConstructionResult?.(nominal)!==true
        || runtime.getClassicalNahuatlNominalNncSentenceContext?.(slot)?.authorizationStatus!=='authorized')return null;
      // The scoped nominal nucleus is a constituent, never an accepted positive
      // intermediate. The sentence owner validates its exact issued slot/context.
      application=runtime.executeClassicalGrammarApplicationRequest({
        operationId:'nnc:sentence-surface',args:[slot,packet.sentenceOptions]});
    }
    else if(packet.operation==='vnc:application') {
      const binding=runtime.issueClassicalNahuatlVncContinuationBindingFrame('vnc:sentence-result',application.canonicalResult,packet.sentenceOptions);
      if(binding?.bindingStatus!=='ready')return null;
      application=runtime.executeClassicalGrammarApplicationRequest({operationId:'vnc:sentence-result',args:binding.executionArgs});
    }
  }
  for(const layer of packet.layers || []) {
    if(application?.authorizationStatus!=='authorized')return application;
    const host=application.canonicalResult;
    const hostInput=getConstructionParticleHostInput(runtime,layer.operationId,host);
    if(!hostInput)return null;
    const particle=runtime.requestClassicalParticleResult(layer.particleId);
    application=runtime.executeClassicalGrammarApplicationRequest({operationId:layer.operationId,args:[{
      particleResultFrame:particle,
      ...hostInput,
      ...(layer.operationId==='sentence:particle-adjunction' ? {honorificized:layer.honorificized,speakerGender:layer.speakerGender} : {}),
    }]});
  }
  return application;
}
