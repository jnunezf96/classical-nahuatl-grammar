import {previewConstructionPacket} from './construction_preview.mjs?nucleusEdit=20261024-9&innerParticle=20261024-1&mixedInner=20261024-1&v=20261023-conjunct-edit-1&interfaceRelease=1.2.36';
import {getConstructionLayerReadiness as getLayerReadiness,getConstructionParticleHostInput} from './construction_layers.mjs?v=20261023-conjunct-edit-1&interfaceRelease=1.2.36';
export {getConstructionParticleHostInput} from './construction_layers.mjs?v=20261023-conjunct-edit-1&interfaceRelease=1.2.36';
import {resolveResultEditTarget,projectResultForEditing} from './result_editing.mjs?nucleusEdit=20261024-9&innerParticle=20261024-1&v=20261023-conjunction-1&interfaceRelease=1.2.36';
import {rebuildResultEdit,requiresResultEditPreview,canRebuildResultEdit} from './result_edit_rebuild.mjs?nucleusEdit=20261024-9&innerParticle=20261024-1&mixedInner=20261024-1&v=20261023-conjunct-edit-1&interfaceRelease=1.2.36';

// Freeze request containers while retaining the exact opaque owner frames.
export function freezeConstructionData(value) {
  if(!value || typeof value!=='object' || Object.isFrozen(value))return value;
  if(Array.isArray(value))return Object.freeze(value.map(freezeConstructionData));
  return Object.freeze(Object.fromEntries(Object.entries(value).map(([key,item])=>[key,freezeConstructionData(item)])));
}

const origins=new WeakMap();
export const getConstructionPacketOrigin=packet=>origins.get(packet) || null;
export const captureConstructionParents=controller=>Object.freeze(['principal','adjoined','dependent','supplement','marker']
  .map(role=>Object.freeze({role,exact:controller.getCapturedCanonicalResult(role) || null,
    discourseContext:controller.getState?.()?.captures?.[role]?.discourseSourceContext || null})));
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
export function getConstructionLayerReadiness(runtime,packet) {
  const layers=getLayerReadiness(runtime,packet);
  if (!layers.ready || packet?.kind!=='result-edit' || packet.edit?.root===packet.edit?.target) return layers;
  const edit=packet.edit,project=exact=>projectResultForEditing(runtime,exact);
  if (!canRebuildResultEdit(runtime,edit.root,edit.target,project,edit.path))
    return {ready:false,blockReason:'result-edit-path-unavailable',recoveryKind:'result-edit'};
  if (!requiresResultEditPreview(runtime,edit.root,edit.target,project,edit.path)) return layers;
  return previewConstructionPacket(runtime,packet)?.isCurrent?.()
    ? layers : {ready:false,blockReason:'conjunct-change-incompatible-with-retained-whole',recoveryKind:'result-edit'};
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
    if(!packet.inner || packet.inner.kind==='result-edit'
      || !canRebuildResultEdit(runtime,edit.root,edit.target,project,edit.path))return null;
    if(requiresResultEditPreview(runtime,edit.root,edit.target,project,edit.path)
      && !previewConstructionPacket(runtime,packet)?.isCurrent?.())return null;
    application=executeConstructionPacket(runtime,packet.inner);
    if(application?.authorizationStatus!=='authorized')return application;
    if(edit.root===edit.target)return application;
    return rebuildResultEdit(runtime,edit.root,edit.target,application.canonicalResult,project,edit.path);
  }
  if(packet.kind==='clause') {
    if(packet.captures.some(slot=>packet.controller.getCapturedCanonicalResult(slot.role)!==slot.exact
      || JSON.stringify(packet.controller.getState?.()?.captures?.[slot.role]?.discourseSourceContext || null)
        !== JSON.stringify(slot.discourseContext || null)))return null;
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
