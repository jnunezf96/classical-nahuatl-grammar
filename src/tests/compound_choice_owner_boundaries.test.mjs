import test from 'node:test';
import assert from 'node:assert/strict';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import {createCompoundChoiceMemory} from '../application/classical/compound_choice_coordination.mjs';
import {getCompoundNonactiveScopeDomain} from '../core/classical/compound_choice_contract.mjs';
const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
const noun={constructionKind:'compound-nnc',structure:'integrated',embedRole:'association',possessorOrientation:'matrix',subject:'3sg',state:'possessive',possessor:'1sg',animacy:'animate',source:{embedStem:'xōchi',embedClass:'zero',matrixStem:'mox',matrixClass:'zero'}};
test('owner constrains restored possessor orientation after linked excursion',()=>{
 const c=createCompoundChoiceMemory(),scope={source:{},matrix:null,route:'compound-nnc'};
 const a=r.evaluateClassicalNahuatlNominalConstruction(noun);assert.equal(a.authorizationStatus,'authorized');
 c.record(scope,'integrated','matrix',a.operationFrame.possessorOrientationOptions);
 const linked=r.evaluateClassicalNahuatlNominalConstruction({...noun,structure:'linked-connective-t',possessorOrientation:'embed'});
 assert.equal(linked.authorizationStatus,'authorized');assert.deepEqual(linked.operationFrame.possessorOrientationOptions,['embed']);
 assert.equal(c.restore(scope,'integrated',linked.operationFrame.possessorOrientationOptions,()=>true),'');
 assert.equal(c.restore(scope,'integrated',a.operationFrame.possessorOrientationOptions,value=>r.evaluateClassicalNahuatlNominalConstruction({...noun,possessorOrientation:value}).authorizationStatus==='authorized'),'matrix');
 const contradiction=r.evaluateClassicalNahuatlNominalConstruction({...noun,structure:'linked-connective-t'});assert.equal(contradiction.authorizationStatus,'blocked');
});
test('canonical structural scope domain retains passive, impersonal, tla and future boundaries',()=>{
 assert.deepEqual(getCompoundNonactiveScopeDomain({voice:'passive'}),['embed','both']);
 assert.deepEqual(getCompoundNonactiveScopeDomain({voice:'impersonal'}),['embed','matrix','both']);
 assert.deepEqual(getCompoundNonactiveScopeDomain({voice:'impersonal',voiceOperation:'tla-impersonal'}),['embed','both']);
 assert.deepEqual(getCompoundNonactiveScopeDomain({voice:'impersonal',variant:'future-embed'}),['embed']);
 assert.deepEqual(getCompoundNonactiveScopeDomain(),['none']);
});
test('real compound owner accepts both-scope and rejects scope on active voice',()=>{
 const source={sourceStem:'miqui',sourceValence:'intransitive',verbClass:'B',subject:'3sg',mood:'indicative',tense:'present',requestedVoice:'impersonal',voice:'impersonal'};
 const probe=r.evaluateClassicalNahuatlVncApplication(source),id=probe.controlFrame.nonactiveOptionInventory.options[0].optionId;
 const request={...source,derivationType:'direct',objectKind:'none',objectPerson:'',lateOperation:'compound',lateVariant:'connective-t',compoundMatrixStem:'ahci',nonactiveOptionId:id,compoundNonactiveScope:'both'};
 const made=r.evaluateClassicalNahuatlLateVncDerivation(request);assert.equal(made.authorizationStatus,'authorized',made.blockReason);assert.equal(made.operationFrame.operationFacts.nonactiveScope,'both');
 const rejected=r.evaluateClassicalNahuatlLateVncDerivation({...request,requestedVoice:'active',voice:'active',nonactiveOptionId:''});assert.equal(rejected.authorizationStatus,'blocked');assert.equal(rejected.blockReason,'compound-nonactive-scope-requires-nonactive-voice');
});
test('affinity restoration is offered by the current owner and does not generalize to distributive matrix copying',()=>{
 const request={...noun,state:'absolutive',subject:'3pl',reduplication:'affinity',reduplicationTarget:'both'};
 const both=r.evaluateClassicalNahuatlNominalConstruction(request);assert.equal(both.authorizationStatus,'authorized');assert(both.operationFrame.affinityScopeFrame.availableTargets.includes('both'));
 const memory=createCompoundChoiceMemory(),scope={source:{},matrix:null,route:'compound-nnc'};
 memory.record(scope,'affinity','both',both.operationFrame.affinityScopeFrame.availableTargets);
 assert.equal(memory.restore(scope,'affinity',[],()=>true),'');
 assert.equal(memory.restore(scope,'affinity',both.operationFrame.affinityScopeFrame.availableTargets,value=>r.evaluateClassicalNahuatlNominalConstruction({...request,reduplicationTarget:value}).authorizationStatus==='authorized'),'both');
 const bad=r.evaluateClassicalNahuatlNominalConstruction({...request,reduplication:'distributive-varietal',reduplicationTarget:'matrix'});assert.equal(bad.authorizationStatus,'blocked');
});
test('exact active parent issues nonactive embed for both scope without replacing its authority',()=>{
 const parent=r.evaluateClassicalNahuatlVncApplication({sourceStem:'miqui',verbClass:'B',sourceValence:'intransitive',subject:'3sg',mood:'indicative',tense:'present',requestedVoice:'active'});
 const selections={lateOperation:'compound',lateVariant:'connective-t',compoundMatrixStem:'ahci',compoundNonactiveScope:'both',requestedVoice:'impersonal',nonactiveOptionId:'o-hua:mic-o-hua',subject:'3sg',mood:'indicative',tense:'present'};
 const binding=r.issueClassicalNahuatlVncContinuationBindingFrame('vnc:derivational-operation',parent.resultFrame,selections);
 assert.equal(binding.bindingStatus,'ready');assert.equal(binding.exactInputResult===parent.resultFrame,true,'exact parent');
 const made=r.executeClassicalGrammarApplicationRequest({operationId:'vnc:derivational-operation',args:binding.executionArgs}).canonicalResult;
 assert.equal(made.authorizationStatus,'authorized',made.blockReason);
 assert.equal(made.baseApplicationFrame.controlFrame.selectedVoiceOperation,'impersonal');
 assert.equal(made.baseApplicationFrame.resultFrame.surfaceRealization,'micohua');
 assert.equal(made.operationFrame.operationFacts.nonactiveScope,'both');
 assert.equal(binding.executionArgs[0].sourceApplicationFrame===parent,true,'original application');
 assert.equal(parent.controlFrame.selectedVoiceOperation,'active');
 const copy=r.issueClassicalNahuatlVncContinuationBindingFrame('vnc:derivational-operation',{...parent.resultFrame},selections);
 assert.notEqual(copy?.bindingStatus,'ready');
 const forged=r.evaluateClassicalNahuatlLateVncDerivation({...binding.executionArgs[0],sourceApplicationFrame:{...parent}});
 assert.equal(forged.authorizationStatus,'blocked');
});
test('shared-object active class exception cannot erase requested nonactive embed',()=>{
 const parent=r.evaluateClassicalNahuatlVncApplication({sourceStem:'ē-hua',verbClass:'B',sourceValence:'specific-projective',objectKind:'specific-projective',objectPerson:'3sg',subject:'3sg',mood:'indicative',tense:'present',requestedVoice:'active'});
 const binding=r.issueClassicalNahuatlVncContinuationBindingFrame('vnc:derivational-operation',parent.resultFrame,{lateOperation:'compound',lateVariant:'shared-object',compoundMatrixStem:'caqui',compoundMatrixClass:'B',compoundNonactiveScope:'embed',requestedVoice:'passive',nonactiveOptionId:'hua:ē-huī-hua',subject:'3sg',mood:'indicative',tense:'present'});
 assert.equal(binding.bindingStatus,'rejected');assert.equal(binding.blockReason,'shared-object-coreferential-embed-object-required');
});
