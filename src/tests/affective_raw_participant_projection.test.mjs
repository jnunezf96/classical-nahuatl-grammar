import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import {createPossessiveFixture} from './helpers/deverbal_possessive_fixture.mjs';
const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
const start=code.indexOf('      if (rawAffective) {');
const end=code.indexOf('\n      if (getClassicalNominalConstructionControlValue(',start);
const syncStart=code.indexOf('    function syncClassicalAffectiveParticipantChoices(');
const syncEnd=code.indexOf('\n    function ',syncStart+1);
test('raw pil choices replace obsolete mass reference domains without accepting a preview',async()=>{
 const {r,set,controls}=await createPossessiveFixture('pil');
 for(const [id,value] of Object.entries({'classical-construction-operation':'affective-nnc','classical-rule-logic-nnc-class':'tli-1','classical-rule-logic-nnc-state':'absolutive','classical-affective-semantic-reading':'pil-child','classical-affective-pil-child-route':'affective','classical-affective-pil-gender':'unspecified'}))set(id,value);
 const number=controls.get('classical-rule-logic-nnc-subject-number');
 number.options.forEach(o=>{o.disabled=o.value!=='common';});
 const accepted={unchanged:true};
 const context=vm.createContext({targetObject:r,rawAffective:true,event:null,selectedConstruction:'affective-nnc',accepted,
 syncClassicalNominalConstructionControlVisibility(){},syncClassicalCardinalParticipantChoices(){},
 buildClassicalNominalConstructionUiRequest:()=>r.buildClassicalNominalConstructionUiRequest(),
 getClassicalNominalConstructionControlValue:(id,fallback)=>controls.get(id)?.value||fallback,
 getClassicalNncAuthorityOptionContract:(...args)=>r.getClassicalNncAuthorityOptionContract(...args),
 applyClassicalRuleLogicSelectOptionAvailability(id,values,selected){const c=controls.get(id);c.options.forEach(o=>o.disabled=!values.includes(o.value));if(selected)c.value=selected;},
 syncClassicalCapabilityApplyOperationState:()=>({ready:true})});
 vm.runInContext(code.slice(syncStart,syncEnd),context);
 vm.runInContext('function stage(){'+code.slice(start,end)+'}',context);
 context.stage();
 assert.equal(number.options.find(o=>o.value==='plural').disabled,false);
 set(number.id,'plural');set('classical-affective-pil-child-route','simple');context.stage();
 assert.equal(context.PendingClassicalRawAffectiveRequest.subject,'3pl');
 assert.equal(context.accepted,accepted);
 const made=r.requestClassicalNominalConstructionResult({...context.PendingClassicalRawAffectiveRequest,reduplication:'affinity'});
 assert.equal(made.authorizationStatus,'authorized',made.blockReason);
 assert.equal(made.wordSurface,'pīpiltin');
 const before=number.options.map(o=>o.disabled);
 context.syncClassicalAffectiveParticipantChoices({...made});
 assert.deepEqual(number.options.map(o=>o.disabled),before);
 const blocked=r.requestClassicalNominalConstructionResult({...context.PendingClassicalRawAffectiveRequest,semanticReading:'not-a-reading'});
 assert.equal(blocked.authorizationStatus,'blocked');
 context.syncClassicalAffectiveParticipantChoices(blocked);
 assert.deepEqual(number.options.map(o=>o.disabled),before);
 set('classical-affective-semantic-reading','pil-noble');
 set('classical-rule-logic-nnc-state','possessive');
 context.stage();
 assert.equal(context.PendingClassicalRawAffectiveRequest.state,'possessive');
 assert.equal(context.accepted,accepted);
});
