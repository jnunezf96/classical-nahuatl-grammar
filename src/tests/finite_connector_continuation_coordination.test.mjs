import test from 'node:test';
import assert from 'node:assert/strict';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import {createFiniteConnectorContinuationCoordinator} from '../application/classical/finite_connector_choice_coordination.mjs';
const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
function harness(stem='chōca') {
 const a=r.evaluateClassicalNahuatlVncApplication({sourceStem:stem,verbClass:'A',sourceValence:'intransitive',subject:'1sg',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active'});
 const n=r.getClassicalGrammarApplicationCapabilityNavigator(a.resultFrame.sourceMachineryFrame);
 const b=r.issueClassicalGrammarTypedSourceOperationBindingFrame(n,'vnc:application',{subject:'1sg',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active'});
 const parent=r.executeClassicalGrammarTypedSourceOperationBindingFrame(b).canonicalResult;
 const bind=s=>r.issueClassicalNahuatlVncContinuationBindingFrame('vnc:application',parent,{subject:'1sg',mood:'indicative',tense:'future',requestedDerivation:'direct',requestedVoice:'active',...s});
 return {parent,bind,coordinator:createFiniteConnectorContinuationCoordinator(r)};
}
test('exact Result continuation retains explicit qui inactive, then restores it in the same licensed coordinate',()=>{
 const {parent,bind,coordinator:c}=harness();let b=bind({});
 let s={...b.callerSelections,finiteSingularConnector:'qui'};let p=c.prepare({frame:b,parent,selections:s,choiceId:'finiteSingularConnector',explicitValidated:true});let n=bind(p.selections);assert(c.commit(b,n,parent,p.receipt));b=n;
 s={...b.callerSelections,subject:'1pl'};delete s.finiteSingularConnector;p=c.prepare({frame:b,parent,selections:s,choiceId:'other'});assert(!p.selections.finiteSingularConnector);n=bind(p.selections);assert(c.commit(b,n,parent,p.receipt));b=n;
 s={...b.callerSelections,subject:'1sg'};delete s.finiteSingularConnector;p=c.prepare({frame:b,parent,selections:s,choiceId:'other'});assert.equal(p.selections.finiteSingularConnector,'qui');n=bind(p.selections);assert(c.commit(b,n,parent,p.receipt));assert.equal(n.bindingStatus,'ready');assert.equal(n.exactInputResult,parent);assert.equal(n.ownerPreflightResult.normalizedRequest.sentenceOptions.finiteSingularConnector,'qui');
});
test('exact continuation memory requires owner-issued frames, the same parent and finite coordinate',()=>{
 const {parent,bind,coordinator:c}=harness();let b=bind({});let s={...b.callerSelections,finiteSingularConnector:'qui'};
 assert.equal(c.prepare({frame:{...b},parent,selections:s,choiceId:'finiteSingularConnector',explicitValidated:true}),null);
 assert.equal(c.prepare({frame:b,parent:{...parent},selections:s,choiceId:'finiteSingularConnector',explicitValidated:true}),null);
 let p=c.prepare({frame:b,parent,selections:s,choiceId:'finiteSingularConnector',explicitValidated:true});let n=bind(p.selections);assert(!c.commit(b,n,parent,{...p.receipt}));assert(c.commit(b,n,parent,p.receipt));b=n;
 s={...b.callerSelections,subject:'2sg'};delete s.finiteSingularConnector;p=c.prepare({frame:b,parent,selections:s,choiceId:'other'});assert(!p.selections.finiteSingularConnector);n=bind(p.selections);assert(c.commit(b,n,parent,p.receipt));
});
