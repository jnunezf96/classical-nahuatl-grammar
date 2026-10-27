import test from 'node:test';
import assert from 'node:assert/strict';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import {createApplicativeChoiceCoordinator} from '../application/classical/applicative_choice_coordination.mjs';
const owner=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
function harness(stem='chōca') {
 const base=owner.evaluateClassicalNahuatlVncApplication({sourceStem:stem,verbClass:'A',sourceValence:'intransitive',subject:'1sg',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active'});
 assert.equal(base.authorizationStatus,'authorized');
 const navigator=owner.getClassicalGrammarApplicationCapabilityNavigator(base.resultFrame.sourceMachineryFrame);
 const fixed={subject:'1sg',mood:'indicative',tense:'present',requestedVoice:'active'};
 return {coordinator:createApplicativeChoiceCoordinator(owner), bind:selections=>owner.issueClassicalGrammarTypedSourceOperationBindingFrame(navigator,'vnc:application',{...fixed,...selections})};
}
test('explicit applied-object person becomes inactive for nonspecific, then returns without entering the inactive owner request',()=>{
 const {coordinator:c,bind}=harness();
 let b=bind({requestedDerivation:'applicative',applicativeObjectKind:'specific-projective',derivationOptionId:'applicative:type-one:optional-final-vowel-replacement:chōca:chōqu-iā'});
 let p=c.prepare({binding:b,selections:{...b.callerSelections,applicativeObjectPerson:'2pl'},choiceId:'applicativeObjectPerson',explicitValidated:true});
 let n=bind(p.selections);assert(c.commit(b,n,p.receipt));b=n;
 p=c.prepare({binding:b,selections:{...b.callerSelections,applicativeObjectKind:'nonspecific-human'},choiceId:'applicativeObjectKind',explicitValidated:true});
 assert.equal(p.selections.applicativeObjectPerson,undefined);n=bind(p.selections);assert(c.commit(b,n,p.receipt));b=n;
 p=c.prepare({binding:b,selections:{...b.callerSelections,applicativeObjectKind:'specific-projective'},choiceId:'applicativeObjectKind',explicitValidated:true});
 assert.equal(p.selections.applicativeObjectPerson,'2pl');n=bind(p.selections);assert.equal(n.bindingStatus,'ready',n.blockReason);assert(c.commit(b,n,p.receipt));
 const result=owner.executeClassicalGrammarTypedSourceOperationBindingFrame(n);assert.equal(result.authorizationStatus,'authorized');assert.equal(result.canonicalResult.normalizedRequest.applicativeObjectPerson,'2pl');
});
test('switching away from applicative makes saved kind and person inactive; returning restores only explicit values',()=>{
 const {coordinator:c,bind}=harness();let b=bind({requestedDerivation:'applicative'});
 let p=c.prepare({binding:b,selections:{...b.callerSelections,applicativeObjectKind:'specific-projective'},choiceId:'applicativeObjectKind',explicitValidated:true});let n=bind(p.selections);assert(c.commit(b,n,p.receipt));b=n;
 p=c.prepare({binding:b,selections:{...b.callerSelections,applicativeObjectPerson:'2pl'},choiceId:'applicativeObjectPerson',explicitValidated:true});n=bind(p.selections);assert(c.commit(b,n,p.receipt));b=n;
 p=c.prepare({binding:b,selections:{...b.callerSelections,requestedDerivation:'direct'},choiceId:'requestedDerivation',explicitValidated:true});assert.equal(p.selections.applicativeObjectKind,undefined);assert.equal(p.selections.applicativeObjectPerson,undefined);n=bind(p.selections);assert(c.commit(b,n,p.receipt));b=n;
 p=c.prepare({binding:b,selections:{...b.callerSelections,requestedDerivation:'applicative'},choiceId:'requestedDerivation',explicitValidated:true});assert.equal(p.selections.applicativeObjectKind,'specific-projective');assert.equal(p.selections.applicativeObjectPerson,'2pl');
});
test('memory cannot pass through forged bindings, forged events, copied receipts or a different Source',()=>{
 const h=harness(),c=h.coordinator,b=h.bind({requestedDerivation:'applicative',applicativeObjectKind:'specific-projective'});
 assert.equal(c.prepare({binding:{...b},selections:{...b.callerSelections,applicativeObjectPerson:'2pl'},choiceId:'applicativeObjectPerson',explicitValidated:true}),null);
 assert.equal(c.prepare({binding:b,selections:{...b.callerSelections,applicativeObjectPerson:'forged'},choiceId:'applicativeObjectPerson',explicitValidated:true}),null);
 const p=c.prepare({binding:b,selections:{...b.callerSelections,applicativeObjectPerson:'2pl'},choiceId:'applicativeObjectPerson',explicitValidated:true});
 assert.equal(c.commit(b,h.bind(p.selections),{...p.receipt}),false);
 assert.equal(c.commit(b,harness('ēhua').bind(p.selections),p.receipt),false);
 assert(c.commit(b,h.bind(p.selections),p.receipt));
 assert.equal(c.commit(b,h.bind(p.selections),p.receipt),false);
});
