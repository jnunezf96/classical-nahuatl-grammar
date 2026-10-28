import test from 'node:test';
import assert from 'node:assert/strict';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import {stageOrdinaryBindingIntent as stage} from '../application/classical/ordinary_binding_intent.mjs';
const owner=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
const source=owner.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:'pil',sourceClass:'tli-1'});
const base={subject:'3pl',animacy:'animate',humanness:'human',state:'possessive',possessor:'1sg',stemFormation:'plain',predicateFormation:'source-stem'};
const run=(selections,options={})=>stage(owner,{source,selections,bindingId:'ordinary',...options});

test('pil dependent intent becomes dormant and reactivates; explicit replacement wins',()=>{
 const chosen=run({...base,possessorReduplication:true},{choiceId:'possessorReduplication',explicitValidated:true});
 assert.equal(chosen.invalid,false);assert.equal(chosen.active.possessorReduplication,true);
 const single=run({...chosen.active,subject:'3sg'},{previousSelections:chosen.active,previousMemory:chosen.memory,choiceId:'subject'});
 assert.equal(single.invalid,false);assert.equal(Object.hasOwn(single.active,'possessorReduplication'),false);
 const restored=run({...single.active,subject:'3pl'},{previousSelections:single.active,previousMemory:single.memory,choiceId:'subject'});
 assert.equal(restored.active.possessorReduplication,true);
 const explicit=run({...restored.active,possessorReduplication:false},{previousMemory:restored.memory,choiceId:'possessorReduplication',explicitValidated:true});
 assert.equal(explicit.active.possessorReduplication,false);
 assert.ok(Object.isFrozen(explicit));assert.ok(Object.isFrozen(explicit.active));assert.ok(Object.isFrozen(explicit.memory));
});

test('copied, cross-Source, and cross-binding memories cannot recover user intent',()=>{
 const chosen=run({...base,possessorReduplication:true},{choiceId:'possessorReduplication',explicitValidated:true});
 const cal=owner.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:'cal',sourceClass:'tli-1'});
 for(const options of [{previousMemory:{...chosen.memory}},
  {previousMemory:chosen.memory,source:cal},{previousMemory:chosen.memory,bindingId:'replacement'}]) {
  const blocked=run(base,options);assert.equal(blocked.invalid,true);assert.equal(blocked.memory,null);
  assert.equal(blocked.active.possessorReduplication,undefined);
 }
 const fresh=run(base,{source:cal});assert.equal(fresh.invalid,false);
 assert.equal(fresh.active.possessorReduplication,undefined);
 assert.equal(run(base,{source:{...source}}).invalid,true);
});

test('unvalidated dependent requests remain invalid and do not become dormant choices',()=>{
 const bad=run({...base,possessorReduplication:true},{choiceId:'possessorReduplication'});
 assert.equal(bad.invalid,true);
 const next=run({...bad.active,subject:'3sg'},{previousMemory:bad.memory,choiceId:'subject'});
 assert.equal(next.invalid,true);
});

