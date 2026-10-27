import test from 'node:test';
import assert from 'node:assert/strict';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import {resolveReflexiveInterpretationChoice} from '../application/classical/reflexive_choice_coordination.mjs';
const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;

test('owner domain distinguishes singular and plural reciprocal eligibility without replacing explicit intent',()=>{
 const singular=resolveReflexiveInterpretationChoice(r,{valence:'mainline-reflexive',subject:'1sg',stem:'chīhua',requestedValue:'reciprocal'});
 assert.deepEqual(singular.values,['reflexive']);
 assert.equal(singular.requestedValue,'reciprocal');assert.equal(singular.state,'incompatible');
 assert.equal(singular.effectiveValue,'reciprocal');assert.equal(singular.executionAuthority,false);
 const owner=r.buildClassicalNahuatlTransitiveVncObjectFrame('chīhua',{subject:'1sg',objectKind:'mainline-reflexive',objectInterpretation:singular.effectiveValue}).objectFrame;
 assert.equal(owner.interpretationAuthorized,false);
 const plural=resolveReflexiveInterpretationChoice(r,{valence:'mainline-reflexive',subject:'1pl',stem:'chīhua',requestedValue:singular.requestedValue});
 assert.deepEqual(plural.values,['reflexive','reciprocal']);assert.equal(plural.state,'licensed');
 assert.equal(r.buildClassicalNahuatlTransitiveVncObjectFrame('chīhua',{subject:'1pl',objectKind:'mainline-reflexive',objectInterpretation:plural.effectiveValue}).objectFrame.interpretationAuthorized,true);
});

test('inactive meaning is retained but does not contribute to other valence',()=>{
 const choice=resolveReflexiveInterpretationChoice(r,{valence:'projective-nonhuman',subject:'1pl',stem:'chīhua',requestedValue:'reciprocal'});
 assert.equal(choice.state,'inactive');assert.equal(choice.requestedValue,'reciprocal');assert.equal(choice.effectiveValue,'');assert.deepEqual(choice.values,[]);
});

test('missing or malformed owner data does not fabricate a grammatical decision',()=>{
 const choice=resolveReflexiveInterpretationChoice({}, {valence:'mainline-reflexive',subject:'3sg',requestedValue:'reciprocal'});
 assert.equal(choice.state,'unresolved');assert.deepEqual(choice.values,[]);assert.equal(choice.executionAuthority,false);
 const bad=resolveReflexiveInterpretationChoice({buildClassicalNahuatlTransitiveVncObjectFrame:()=>({objectFrame:{availableInterpretations:['invented']}})},{valence:'mainline-reflexive',subject:'3pl'});
 assert.equal(bad.state,'unresolved');assert.deepEqual(bad.values,[]);
});

test('typed reflexive source preflight rejects incompatible or forged interpretation while allowing plural reciprocal',()=>{
 const original=r.evaluateClassicalNahuatlVncApplication({sourceStem:'chīhua',verbClass:'B',sourceValence:'mainline-reflexive',subject:'1pl',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active'});
 assert.equal(original.authorizationStatus,'authorized');
 const source=original.resultFrame.sourceMachineryFrame;
 const nav=r.getClassicalGrammarApplicationCapabilityNavigator(source);
 const choice=(subject,meaning)=>({subject,mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active',objectInterpretation:meaning});
 for (const [subject,meaning] of [['1sg','reciprocal'],['1sg','forged'],['1pl','forged']]) {
  const b=r.issueClassicalGrammarTypedSourceOperationBindingFrame(nav,'vnc:application',choice(subject,meaning));
  assert.notEqual(b?.bindingStatus,'ready',`${subject} ${meaning} must not pass preflight`);
  assert.notEqual(r.previewClassicalGrammarTypedSourceOperationBindingFrame(b)?.canonicalResult?.authorizationStatus,'authorized');
  assert.notEqual(r.executeClassicalGrammarTypedSourceOperationBindingFrame(b)?.authorizationStatus,'authorized');
 }
 const b=r.issueClassicalGrammarTypedSourceOperationBindingFrame(nav,'vnc:application',choice('1pl','reciprocal'));
 assert.equal(b.bindingStatus,'ready',b.blockReason);
 const p=r.previewClassicalGrammarTypedSourceOperationBindingFrame(b);assert.equal(p.canonicalResult.normalizedRequest.objectInterpretation,'reciprocal');
 const made=r.executeClassicalGrammarTypedSourceOperationBindingFrame(b);assert.equal(made.authorizationStatus,'authorized');assert.equal(made.canonicalResult.normalizedRequest.objectInterpretation,'reciprocal');
 assert.equal(made.canonicalResult.resultFrame.sourceMachineryFrame,source);
 assert.notEqual(r.issueClassicalNahuatlVncTypedSourceApplicationBindingFrame({...source},choice('1pl','reciprocal')).bindingStatus,'ready');
});

test('exact result continuation rejects incompatible or forged reflexive meaning before preview and Make',()=>{
 const req={sourceStem:'chīhua',verbClass:'B',sourceValence:'mainline-reflexive',subject:'1pl',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active'};
 const source=r.evaluateClassicalNahuatlVncApplication(req).resultFrame.sourceMachineryFrame;
 const nav=r.getClassicalGrammarApplicationCapabilityNavigator(source);
 const choices={subject:'1pl',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active'};
 const made=r.executeClassicalGrammarTypedSourceOperationBindingFrame(r.issueClassicalGrammarTypedSourceOperationBindingFrame(nav,'vnc:application',choices));
 assert.equal(made.authorizationStatus,'authorized');const parent=made.canonicalResult;
 const issue=(subject,objectInterpretation,input=parent)=>r.issueClassicalNahuatlVncContinuationBindingFrame('vnc:application',input,{...choices,subject,objectInterpretation});
 for(const [subject,meaning] of [['1sg','reciprocal'],['1sg','forged'],['1pl','forged']]) {
   const binding=issue(subject,meaning);assert.notEqual(binding.bindingStatus,'ready',`${subject} ${meaning}`);assert.equal(binding.executionArgs.length,0);
 }
 const valid=issue('1pl','reciprocal');assert.equal(valid.exactInputResult,parent);assert.equal(valid.bindingStatus,'ready',valid.blockReason);assert.equal(valid.ownerPreflightResult.normalizedRequest.objectInterpretation,'reciprocal');
 const copied=issue('1pl','reciprocal',{...parent});assert.notEqual(copied.bindingStatus,'ready');
});
test('a rejected exact continuation retains its issued draft until the user corrects it',async()=>{
 const {resolveRejectedReflexiveDraft}=await import('../application/classical/reflexive_choice_coordination.mjs');
 const base=r.evaluateClassicalNahuatlVncApplication({sourceStem:'chīhua',verbClass:'B',sourceValence:'mainline-reflexive',subject:'1pl',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active'});
 const s=base.resultFrame.sourceMachineryFrame,nav=r.getClassicalGrammarApplicationCapabilityNavigator(s);
 const parent=r.executeClassicalGrammarTypedSourceOperationBindingFrame(r.issueClassicalGrammarTypedSourceOperationBindingFrame(nav,'vnc:application',{subject:'1pl',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active'})).canonicalResult;
 const rejected=r.issueClassicalNahuatlVncContinuationBindingFrame('vnc:application',parent,{subject:'1sg',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active',objectInterpretation:'reciprocal'});
 assert.notEqual(rejected.bindingStatus,'ready');
 const retained=resolveRejectedReflexiveDraft(r,parent,rejected);assert.equal(retained.subject,'1sg');assert.equal(retained.objectInterpretation,'reciprocal');
 const corrected=resolveRejectedReflexiveDraft(r,parent,rejected,{choiceId:'objectInterpretation',value:'reflexive'});assert.equal(corrected.subject,'1sg');assert.equal(corrected.objectInterpretation,'reflexive');
 const resumed=r.issueClassicalNahuatlVncContinuationBindingFrame('vnc:application',parent,corrected);assert.equal(resumed.bindingStatus,'ready',resumed.blockReason);
 assert.equal(resolveRejectedReflexiveDraft(r,{...parent},rejected),null);assert.equal(resolveRejectedReflexiveDraft(r,parent,{...rejected}),null);
});
