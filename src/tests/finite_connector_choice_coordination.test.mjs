import test from 'node:test';
import assert from 'node:assert/strict';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import {createFiniteConnectorCoordinator} from '../application/classical/finite_connector_choice_coordination.mjs';
const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
function harness(stem='chōca') {
 const a=r.evaluateClassicalNahuatlVncApplication({sourceStem:stem,verbClass:'A',sourceValence:'intransitive',subject:'1sg',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active'});
 const nav=r.getClassicalGrammarApplicationCapabilityNavigator(a.resultFrame.sourceMachineryFrame);
 const bind=s=>r.issueClassicalGrammarTypedSourceOperationBindingFrame(nav,'vnc:application',{subject:'1sg',mood:'indicative',tense:'future',requestedDerivation:'direct',requestedVoice:'active',...s});
 return {bind,coordinator:createFiniteConnectorCoordinator(r)};
}
test('explicit singular qui is inactive in plural and restored when the same owner-licensed coordinate returns',()=>{
 const {bind,coordinator:c}=harness();let b=bind({}),n=bind({...b.callerSelections,finiteSingularConnector:'qui'});
 b=c.handoff(b,n,{choiceId:'finiteSingularConnector',value:'qui',explicitValidated:true,issue:bind});assert.equal(b.effectiveSelections.finiteSingularConnector,'qui');
 n=bind({...b.callerSelections,subject:'1pl',finiteSingularConnector:''});b=c.handoff(b,n,{issue:bind});assert.notEqual(b.effectiveSelections.finiteSingularConnector,'qui');assert.equal(b.bindingStatus,'ready');
 n=bind({...b.callerSelections,subject:'1sg',finiteSingularConnector:''});b=c.handoff(b,n,{issue:bind});assert.equal(b.effectiveSelections.finiteSingularConnector,'qui');assert.equal(b.bindingStatus,'ready');
 const made=r.executeClassicalGrammarTypedSourceOperationBindingFrame(b);assert.equal(made.authorizationStatus,'authorized');assert.equal(made.canonicalResult.normalizedRequest.sentenceOptions.finiteSingularConnector,'qui');
});
test('copied or foreign bindings and unvalidated selections cannot carry a saved choice',()=>{
 const {bind,coordinator:c}=harness();let b=bind({});let n=bind({...b.callerSelections,finiteSingularConnector:'qui'});
 assert.equal(c.handoff({...b},n,{choiceId:'finiteSingularConnector',value:'qui',explicitValidated:true,issue:bind}),null);
 assert.equal(c.handoff(b,harness('ēhua').bind({}),{issue:bind}),null);
 b=c.handoff(b,n,{choiceId:'finiteSingularConnector',value:'qui',explicitValidated:false,issue:bind});
 n=bind({...b.callerSelections,subject:'1pl',finiteSingularConnector:''});b=c.handoff(b,n,{issue:bind});
 n=bind({...b.callerSelections,subject:'1sg',finiteSingularConnector:''});b=c.handoff(b,n,{issue:bind});assert.equal(b.effectiveSelections.finiteSingularConnector,'silent');
});
test('a saved variant is not applied to a different eligible finite coordinate',()=>{
 const {bind,coordinator:c}=harness();let b=bind({});let n=bind({...b.callerSelections,finiteSingularConnector:'qui'});
 b=c.handoff(b,n,{choiceId:'finiteSingularConnector',value:'qui',explicitValidated:true,issue:bind});
 n=bind({...b.callerSelections,subject:'2sg',finiteSingularConnector:''});b=c.handoff(b,n,{issue:bind});
 assert.equal(b.effectiveSelections.finiteSingularConnector,'silent');assert.equal(b.bindingStatus,'ready');
 n=bind({...b.callerSelections,subject:'1sg',finiteSingularConnector:''});b=c.handoff(b,n,{issue:bind});
 assert.equal(b.effectiveSelections.finiteSingularConnector,'qui');
});
