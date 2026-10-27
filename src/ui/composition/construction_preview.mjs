import {previewRebuiltResultEdit} from './result_edit_rebuild.mjs?nucleusEdit=20261024-9&innerParticle=20261024-1&mixedInner=20261024-1&v=20261023-conjunct-edit-1&interfaceRelease=1.2.36';
import {getConstructionParticleHostInput,getConstructionLayerReadiness} from './construction_layers.mjs?v=20261023-conjunct-edit-1&interfaceRelease=1.2.36';
import {resolveResultEditTarget,projectResultForEditing} from './result_editing.mjs?nucleusEdit=20261024-9&innerParticle=20261024-1&v=20261023-conjunction-1&interfaceRelease=1.2.36&choiceGuidance=20261027-1';

// Owner evaluation only. No application receipt, History write or acceptance.
export function previewConstructionPacket(runtime,packet) {
  if(!packet || getConstructionLayerReadiness(runtime,packet).ready!==true)return null;
  const leases=[];
  const observe=preview=>{
    if(runtime.isClassicalGrammarApplicationPreview?.(preview)!==true)return null;
    leases.push(preview);return preview;
  };
  const request=(operationId,args)=>observe(runtime.previewClassicalGrammarApplicationRequest?.({operationId,args}));
  let preview;
  if(packet.kind==='result-edit') {
    const edit=packet.edit;
    const project=exact=>projectResultForEditing(runtime,exact);
    const target=edit&&resolveResultEditTarget(runtime,edit.root,edit.path,project);
    if(!target || target.node!==edit.target)return null;
    if(edit.action==='remove' && target.removableTo===edit.remaining) {
      const projection=project(edit.remaining);
      return projection?{surface:projection.surface,canonicalResult:edit.remaining,isCurrent:()=>resolveResultEditTarget(runtime,edit.root,edit.path,project)?.removableTo===edit.remaining}:null;
    }
    const child=previewConstructionPacket(runtime,packet.inner);
    return edit.root===edit.target?child:previewRebuiltResultEdit(runtime,edit.root,edit.target,child,project,edit.path);
  }
  if(packet.kind==='clause') {
    if(packet.captures.some(slot=>packet.controller.getCapturedCanonicalResult(slot.role)!==slot.exact))return null;
    return packet.controller.preview?.(packet.choices) || null;
  }
  if(packet.kind==='typed') {
    if(runtime.isClassicalGrammarTypedSourceOperationBindingFrame?.(packet.binding)!==true
      || packet.binding.exactSource!==packet.source)return null;
    preview=observe(runtime.previewClassicalGrammarTypedSourceOperationBindingFrame?.(packet.binding));
  } else preview=observe(runtime.previewClassicalGrammarApplicationRequest?.(packet.request,packet.prepared||null));
  if(!preview)return null;
  if(packet.sentenceOptions) {
    if(packet.operation==='nnc:ordinary')preview=request('nnc:sentence-surface',[preview.canonicalResult.typedSlotFrame,packet.sentenceOptions]);
    else if(packet.operation==='grammar:nominal-construction') {
      const slot=preview.canonicalResult?.canonicalResult?.nncSlotFrame;
      if(runtime.getClassicalNahuatlNominalNncSentenceContext?.(slot)?.authorizationStatus!=='authorized')return null;
      preview=request('nnc:sentence-surface',[slot,packet.sentenceOptions]);
    } else if(packet.operation==='vnc:application') {
      const binding=runtime.issueClassicalNahuatlVncContinuationBindingFrame?.('vnc:sentence-result',preview.canonicalResult,packet.sentenceOptions);
      if(binding?.bindingStatus!=='ready')return null;
      preview=request('vnc:sentence-result',binding.executionArgs);
    }
  }
  for(const layer of packet.layers||[]) {
    if(!preview)return null;
    const hostInput=getConstructionParticleHostInput(runtime,layer.operationId,preview.canonicalResult);
    if(!hostInput)return null;
    const source=runtime.buildClassicalNahuatlParticleSourceFrame?.(layer.particleId);
    const particle=request('particle:result',[source]);
    if(!particle)return null;
    preview=request(layer.operationId,[{particleResultFrame:particle.canonicalResult,...hostInput,
      ...(layer.operationId==='sentence:particle-adjunction'?{honorificized:layer.honorificized,speakerGender:layer.speakerGender}:{})}]);
  }
  if(!preview?.surface)return null;
  return Object.freeze({surface:preview.surface,canonicalResult:preview.canonicalResult,
    isCurrent:()=>leases.every(lease=>runtime.isClassicalGrammarApplicationPreview?.(lease)===true)
      && (packet.kind!=='typed' || runtime.isClassicalGrammarTypedSourceOperationBindingFrame?.(packet.binding)===true)});
}
