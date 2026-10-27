import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import {createDerivationChoiceCoordinator} from '../application/classical/derivation_choice_coordination.mjs';
const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
test('exact impersonal formation restores through its canonical continuation owner',()=>{
 const a=r.evaluateClassicalNahuatlVncApplication({sourceStem:'chōca',verbClass:'A',sourceValence:'intransitive',subject:'3sg',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active'});
 const bind=s=>r.issueClassicalNahuatlVncContinuationBindingFrame('vnc:application',a.resultFrame,{subject:'3sg',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active',...s});
 const c=createDerivationChoiceCoordinator(r);let b=bind({requestedVoice:'impersonal'});
 const options=b.ownerPreflightResult.controlFrame.nonactiveOptionInventory.options;
 const id=options.find(o=>o.authorityStatus!=='blocked').optionId;
 b=c.handoff(b,bind({requestedVoice:'impersonal',nonactiveOptionId:id}),{choiceId:'nonactiveOptionId',explicitValidated:true,issue:bind});
 b=c.handoff(b,bind({}),{issue:bind});assert.equal(b.callerSelections.nonactiveOptionId,undefined);
 b=c.handoff(b,bind({requestedVoice:'impersonal'}),{issue:bind});assert.equal(b.callerSelections.nonactiveOptionId,id);assert.equal(b.bindingStatus,'ready');
});
test('exact continuation uses the shared field mapping rather than a nonexistent nonactive control',async()=>{
 const text=await readFile(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
 assert.match(text,/nonactiveOptionId: "classical-rule-logic-nonactive-family"/);
 const start=text.indexOf("if(current.operationId==='vnc:application') nextFrame=ClassicalDerivationChoices.handoff");
 const handler=text.slice(start,text.indexOf('const derivationMemoryFrame=nextFrame',start));
 assert(handler.includes('getClassicalCapabilityBindingControlsForChoice(key).includes(editedControl)'));
 assert(!handler.includes('classical-rule-logic-nonactive-option'));
});
