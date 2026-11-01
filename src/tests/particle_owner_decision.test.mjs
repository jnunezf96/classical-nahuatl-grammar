import test from 'node:test';
import assert from 'node:assert/strict';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
const o=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
const particle=id=>o.buildClassicalNahuatlParticleResultFrame(o.buildClassicalNahuatlParticleSourceFrame(id));
const host=(tense='present')=>o.buildClassicalNahuatlVncSentenceResultFrame(o.requestClassicalVncApplicationResult({sourceStem:'cochi',verbClass:'A',sourceValence:'intransitive',subject:'3sg',mood:'indicative',tense,requestedDerivation:'direct',requestedVoice:'active'}));
const values=(frame,key)=>frame.choiceOptionProjection[key].options.filter(x=>x.availabilityStatus==='available').map(x=>x.optionId);
test('negative owner validates and projects the same sentence domain through rejected intent',()=>{
 const source=particle('l3-ma'),request={polarity:'negative',precedingParticleResultFrame:source,sentenceKind:'forged'};
 const blocked=o.selectClassicalNahuatlNegativeParticleFrame(request);
 assert.equal(blocked.authorizationStatus,'blocked');assert.match(blocked.blockReason,/sentence-kind/);
 assert.equal(blocked.choiceOptionProjection.sentenceKind.authoredValue,'forged');
 assert.deepEqual(values(blocked,'sentenceKind'),o.issueClassicalNahuatlParticleSentenceBindingFrame('particle:negative-selection',source).sentenceKindOptions);
 const recovered=o.selectClassicalNahuatlNegativeParticleFrame({...request,sentenceKind:'wish'});
 assert.equal(recovered.authorizationStatus,'authorized');assert.equal(recovered.precedingParticleResultFrame,source);assert.equal(recovered.selectedParticleId,'l3-ca-negative');
 assert.deepEqual(values(o.selectClassicalNahuatlNegativeParticleFrame({...request,precedingParticleResultFrame:{...source}}),'sentenceKind'),[]);
});
test('adverbial owner projects real host tense availability and keeps an exact particle fixed',()=>{
 const present=host(),future=host('future'),quin=o.buildClassicalNahuatlParticleSourceFrame('l3-quin');
 const blocked=o.buildClassicalNahuatlSentenceAdverbialLayerFrame({nuclearResultFrame:present,particleSourceFrame:quin});
 assert.equal(blocked.authorizationStatus,'blocked');assert.equal(values(blocked,'adverbialId').includes('l3-quin'),false);assert.equal(values(blocked,'adverbialId').includes('l3-ye'),true);
 const allowed=o.buildClassicalNahuatlSentenceAdverbialLayerFrame({nuclearResultFrame:future,particleSourceFrame:quin});
 assert.equal(allowed.authorizationStatus,'authorized');assert.equal(values(allowed,'adverbialId').includes('l3-quin'),true);
 const exact=particle('l3-no-adverbial'),fixed=o.buildClassicalNahuatlSentenceAdverbialLayerFrame({nuclearResultFrame:present,particleResultFrame:exact});
 assert.equal(fixed.choiceOptionProjection.adverbialId.editable,false);assert.deepEqual(values(fixed,'adverbialId'),['l3-no-adverbial']);
 assert.deepEqual(values(o.buildClassicalNahuatlSentenceAdverbialLayerFrame({nuclearResultFrame:{...present},particleSourceFrame:quin}),'adverbialId'),[]);
});
test('particle adjunct offers only its actual honorific and speaker requirements on the same owner frame',()=>{
 const nuclearResultFrame=host(),particleResultFrame=particle('l3-no-interjection');
 const blocked=o.buildClassicalNahuatlSentenceParticleLayerFrame({nuclearResultFrame,particleResultFrame,speakerGender:'male'});
 assert.equal(blocked.authorizationStatus,'blocked');assert.deepEqual(values(blocked,'speakerGender'),['female']);assert.equal(blocked.choiceOptionProjection.speakerGender.authoredValue,'male');
 const recovered=o.buildClassicalNahuatlSentenceParticleLayerFrame({nuclearResultFrame,particleResultFrame,speakerGender:'female'});assert.equal(recovered.authorizationStatus,'authorized');
 const behold=o.buildClassicalNahuatlSentenceParticleLayerFrame({nuclearResultFrame,particleResultFrame:particle('l3-o-behold')});
 assert.deepEqual(values(behold,'honorificized'),[false,true]);assert.equal(behold.choiceOptionProjection.speakerGender.applicable,false);
 assert.deepEqual(values(o.buildClassicalNahuatlSentenceParticleLayerFrame({nuclearResultFrame,particleResultFrame:{...particleResultFrame}}),'honorificized'),[]);
});
test('one prepared particle decision retains blocked recovery and exact immutable request through explicit publication',()=>{
 const source=particle('l3-ma'),original={operationId:'particle:negative-selection',args:[{polarity:'negative',sentenceKind:'forged',precedingParticleResultFrame:source}]};
 const blocked=o.prepareClassicalGrammarApplicationRequest(original);assert.ok(blocked);assert.equal(o.isClassicalGrammarPreparedApplicationRequest(blocked),true);assert.equal(blocked.authorizationStatus,'blocked');
 assert.equal(blocked.request.args[0].precedingParticleResultFrame,source);assert.equal(blocked.canonicalResult.choiceOptionProjection.sentenceKind.authoredValue,'forged');
 assert.equal(o.previewClassicalGrammarApplicationRequest(blocked.request,blocked),null);
 const request={...original,args:[{...original.args[0],sentenceKind:'wish'}]},prepared=o.prepareClassicalGrammarApplicationRequest(request);assert.equal(prepared.authorizationStatus,'authorized');
 request.args[0].sentenceKind='admonition';assert.equal(prepared.request.args[0].sentenceKind,'wish');assert.equal(Object.isFrozen(prepared.request.args[0]),true);
 assert.throws(()=>{prepared.request.args[0].sentenceKind='admonition';},TypeError);
 assert.equal(o.getClassicalGrammarApplicationCapabilityNavigator(prepared.canonicalResult),null,'preflight grants no continuation provenance');
 const capability=o.selectClassicalNahuatlNegativeParticleFrame;let fallbackCalls=0;
 o.selectClassicalNahuatlNegativeParticleFrame=()=>{fallbackCalls++;throw Error('unregistered replacement');};
 try{assert.equal(o.previewClassicalGrammarApplicationRequest(prepared.request,prepared),null);assert.equal(o.executeClassicalGrammarApplicationRequest(prepared.request,prepared).authorizationStatus,'blocked');assert.equal(fallbackCalls,0);}finally{o.selectClassicalNahuatlNegativeParticleFrame=capability;}
 const preview=o.previewClassicalGrammarApplicationRequest(prepared.request,prepared);assert.equal(preview.canonicalResult,prepared.canonicalResult);
 for(const [req,prep] of [[{...prepared.request},prepared],[prepared.request,{...prepared}]]){
  assert.equal(o.previewClassicalGrammarApplicationRequest(req,prep),null);assert.equal(o.executeClassicalGrammarApplicationRequest(req,prep).authorizationStatus,'blocked');
 }
 let getterCalls=0;const getterForged=Object.freeze({kind:source.kind,get authorizationStatus(){getterCalls++;return 'authorized';}});
 assert.equal(o.prepareClassicalGrammarApplicationRequest({...original,args:[{polarity:'negative',sentenceKind:'wish',precedingParticleResultFrame:getterForged}]}),null);assert.equal(getterCalls,0);
 const copied=o.prepareClassicalGrammarApplicationRequest({...original,args:[{polarity:'negative',sentenceKind:'wish',precedingParticleResultFrame:Object.freeze({...source})}]});
 assert.equal(copied,null,'copied authority is rejected at request validation');
 const made=o.executeClassicalGrammarApplicationRequest(prepared.request,prepared);assert.equal(made.authorizationStatus,'authorized');assert.equal(made.canonicalResult,prepared.canonicalResult);assert.equal(o.executeClassicalGrammarApplicationRequest(prepared.request,prepared),made);
 const discarded=o.prepareClassicalGrammarApplicationRequest(prepared.request);assert.equal(o.discardClassicalGrammarPreparedApplicationRequest(discarded),true);assert.equal(discarded.canonicalResult,null);
 assert.equal(o.previewClassicalGrammarApplicationRequest(discarded.request,discarded),null);assert.equal(o.executeClassicalGrammarApplicationRequest(discarded.request,discarded).authorizationStatus,'blocked');
});
