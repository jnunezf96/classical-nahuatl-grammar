import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import {previewConstructionPacket} from '../ui/composition/construction_preview.mjs';
import {executeConstructionPacket,freezeConstructionData,getConstructionPacketOrigin} from '../ui/composition/construction_packet.mjs';
import {createConstructionSession} from '../ui/composition/construction_session.mjs';
const fixtures=JSON.parse(readFileSync(new URL('./fixtures/nonce_honorific_attachment_20261023.json',import.meta.url)));
const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
const runtime=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
function harness({stem,sourceClass}){
 const source=runtime.buildClassicalNahuatlOrdinaryNncSourceFrame({stem,sourceClass});
 const navigator=runtime.getClassicalGrammarApplicationCapabilityNavigator(source);
 const issue=choices=>runtime.issueClassicalGrammarTypedSourceOperationBindingFrame(navigator,'nnc:ordinary',choices);
 let binding=issue({subject:'3sg',animacy:'animate',humanness:'human',state:'absolutive',predicateFormation:'source-stem'});
 let consumed=binding,accepted=runtime.executeClassicalGrammarTypedSourceOperationBindingFrame(binding);
 assert.equal(accepted.authorizationStatus,'authorized');
 const honorific={id:'classical-rule-logic-sentence-particle-honorific',type:'checkbox',checked:true,disabled:false,readOnly:false,
   closest:s=>s==='#classical-rule-logic-controls'?{}:null};
 const status={textContent:''};
 const controls={[honorific.id]:honorific,'classical-rule-logic-sentence-particle':{value:'l3-o-behold'},
  'classical-capability-navigator-operation':{value:'nnc:ordinary'},'classical-capability-operation-plan-status':status};
 const state=()=>({subject:'3sg',nncAnimacy:'animate',nncHumanness:'human',nncState:'absolutive',nncPredicateOptionId:'source-stem',nncStemRelation:'plain',nncMetaphoricalUse:false,nncPossessor:'',nncNumberForm:''});
 const ctx=vm.createContext({targetObject:{...runtime,document:{getElementById:id=>controls[id]||null}},
  ActiveClassicalGrammarTypedSourceOperationBinding:binding,ClassicalTypedSourceBindingSelectionSignatures:new WeakMap(),ActiveClassicalGrammarCapabilityNavigator:navigator,ActiveClassicalGrammarResultBinding:null,ActiveClassicalGrammarResultSourceCapture:null,
  PendingClassicalOrdinaryGrammarBinding:null,PendingClassicalOrdinarySentenceOptions:null,
  HandledClassicalContinuationChoiceEvents:new WeakSet(),CLASSICAL_CUSTOM_CONSTRUCTION_SOURCE_ANALYSIS_CONTROL_IDS:[],CLASSICAL_CAPABILITY_BINDING_CONTROL_IDS:{},
  stageClassicalSentenceRelationalMarkerRoute:()=>false,stageClassicalSentenceConjunctorRoute:()=>false,stageClassicalInactiveFiniteChoiceForParticleRoot:()=>false,
  getClassicalNominalConstructionControlValue:()=> 'none',handleClassicalIntermediateBuildTaskReset:()=>false,clearClassicalPreparedAttitudeResult(){},
  getActiveClassicalGrammarTypedSourceOperationBinding:()=>ctx.ActiveClassicalGrammarTypedSourceOperationBinding,getClassicalNncReinflectionDraft:()=>null,getClassicalRuleLogicSurfaceState:state,
  getActiveClassicalCapabilityApplicationResult:()=>accepted,ClassicalOrdinaryGrammarApplicationBySentence:new WeakMap(),
  normalizeClassicalOrdinaryNncApplicationPossessor:value=>value,syncClassicalRuleLogicControlsForSurfaceFrame(){},
  syncClassicalSourceFiniteStage:()=>false,syncClassicalGrammarTypedSourceOperationChoices(){},clearClassicalGrammarTypedSourceOperationBinding(){throw Error('unexpected unavailable Source');},
  stageClassicalOrdinaryGrammarControlChange:()=>false,
  syncClassicalCapabilityApplyOperationState:()=>({ready:ctx.ActiveClassicalGrammarTypedSourceOperationBinding.bindingStatus==='ready'}),
  getClassicalNncSentenceTaskExecutionArgs:()=>[null,{sentenceType:'assertion',polarity:'positive'}],
  ClassicalPositionSources:new WeakSet([source]),getClassicalPositionIdentity:()=> 'exact-source',getClassicalOwnerIssuedResultProjection:()=>null,freezeConstructionData,
 });
 for(const name of ['getClassicalOrdinaryNncActiveCallerSelections','getClassicalGrammarTypedSourceNncSelections','getClassicalTypedNncBindingSurfaceState','getClassicalTypedSourceSelectionSignature','stageClassicalGrammarTypedSourceOperationBinding','handleClassicalCapabilityStagedGrammarControlChange','captureClassicalPositionLayers','captureClassicalConstructionPacket']){
  const start=code.indexOf(`    function ${name}(`),end=code.indexOf('\n    function ',start+1);assert(start>=0,name);vm.runInContext(code.slice(start,end),ctx);
 }
 const normalized=ctx.getClassicalGrammarTypedSourceNncSelections('nnc:ordinary',navigator);
 binding=issue(normalized);consumed=binding;accepted=runtime.executeClassicalGrammarTypedSourceOperationBindingFrame(binding);
 ctx.ActiveClassicalGrammarTypedSourceOperationBinding=binding;ctx.ClassicalTypedSourceBindingSelectionSignatures.set(binding,ctx.getClassicalTypedSourceSelectionSignature(normalized));
 return {ctx,source,navigator,consumed,accepted,honorific,get binding(){return ctx.ActiveClassicalGrammarTypedSourceOperationBinding;},edit(){return ctx.handleClassicalCapabilityStagedGrammarControlChange(honorific,{});},packet(){return ctx.captureClassicalConstructionPacket('nnc:ordinary',source,null,ctx.ActiveClassicalGrammarTypedSourceOperationBinding);}};
}
test('NNC honorific On and Off refresh a consumed binding and make exactly the captured preview',()=>{
 for(const fixture of fixtures.cases){
  const h=harness(fixture);
  const session=createConstructionSession({isSource:s=>s===h.source,isResult:r=>runtime.captureClassicalGrammarApplicationResult(r,'test-result').authorizationStatus==='authorized',execute:p=>executeConstructionPacket(runtime,p),present:()=>true});
  session.restore(h.accepted.canonicalResult,null);
  for(const on of [true,false]){
   const previous=session.position.accepted.result;h.honorific.checked=on;
   assert.equal(h.edit(),true,'native honorific checkbox must stage, not fall through to surface regeneration');
   assert.notEqual(h.binding,h.consumed);assert.equal(h.binding.bindingStatus,'ready');assert.equal(h.binding.exactSource,h.source);
   const packet=h.packet();assert.equal(packet.layers[0].honorificized,on);
   session.stage({source:h.source,route:{operation:'nnc:ordinary'},slots:[],choices:{honorific:on},legalMoves:[],ready:true,execution:packet});
   const before=runtime.getClassicalGrammarWorkspaceHistorySnapshot();
   const preview=previewConstructionPacket(runtime,packet);assert(preview?.surface);assert.equal(preview.isCurrent(),true);
   assert.equal(session.position.accepted.result,previous);assert.deepEqual(runtime.getClassicalGrammarWorkspaceHistorySnapshot(),before);
   assert.equal(runtime.captureClassicalGrammarApplicationResult(preview.canonicalResult,'preview').authorizationStatus,'blocked');
   assert.equal(session.make(),true);const made=session.position.accepted.receipt.application;
   assert.equal(made.authorizationStatus,'authorized');assert.equal(made.canonicalResult.honorificizedRequested,on);
   assert.equal(made.canonicalResult.canonicalInputFrame.sourceNncSlotFrame,getConstructionPacketOrigin(packet).canonicalResult.typedSlotFrame);
   if(on){assert.equal(runtime.isClassicalNahuatlIssuedParticleSentenceLayerFrame(made.canonicalResult),true);assert.equal(made.canonicalResult.honorificSourceFrame,made.canonicalResult.particleResultFrame.sourceFrame);assert.equal(made.canonicalResult.honorificizedAuthorized,true);}
   const projection=runtime.getClassicalOwnerIssuedResultProjection?.(made.canonicalResult);
   assert.equal(preview.surface,projection?.surface||made.canonicalResult.sentenceSurface||made.canonicalResult.surfaceRealization||made.canonicalResult.sentenceSurfaceDisplay);
   assert.equal(runtime.executeClassicalGrammarTypedSourceOperationBindingFrame(h.binding),null,'one-use execution guard remains intact');
   assert.notEqual(session.position.accepted.result,previous);
  }
 }
});
test('ordinary accepted-Result editing also stages the honorific checkbox before recollection',()=>{
 const h=harness(fixtures.cases[0]);
 const name='stageClassicalOrdinaryGrammarControlChange',start=code.indexOf(`    function ${name}(`),end=code.indexOf('\n    function ',start+1);vm.runInContext(code.slice(start,end),h.ctx);
 assert.equal(h.ctx.stageClassicalOrdinaryGrammarControlChange(h.honorific),true);
 const staged=h.ctx.PendingClassicalOrdinaryGrammarBinding;assert.equal(staged.exactSource,h.source);assert.notEqual(staged,h.consumed);assert.equal(staged.bindingStatus,'ready');
});

test('copied binding, mismatched Source and forged honorific host remain rejected',()=>{
 const h=harness(fixtures.cases[1]);h.edit();const packet=h.packet();
 for(const forged of [{...packet,binding:{...packet.binding}},{...packet,source:{...h.source}}]){
  assert.equal(previewConstructionPacket(runtime,forged),null);assert.equal(executeConstructionPacket(runtime,forged),null);
 }
 const particle=runtime.buildClassicalNahuatlParticleSourceFrame('l3-o-behold');
 for(const options of [{particleSourceFrame:particle,nuclearResultFrame:{...h.accepted.canonicalResult},honorificized:true},
  {particleSourceFrame:{...particle},nuclearResultFrame:h.accepted.canonicalResult,honorificized:true}]){
  const request={operationId:'sentence:particle-adjunction',args:[options]};
  const preview=runtime.previewClassicalGrammarApplicationRequest(request);
  assert.notEqual(preview?.authorizationStatus,'authorized');
  let made;try{made=runtime.executeClassicalGrammarApplicationRequest(request);}catch(error){assert.match(error.message,/forbidden-authority/);}assert.notEqual(made?.authorizationStatus,'authorized');
 }
});
