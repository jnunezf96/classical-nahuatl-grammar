import test from 'node:test';
import assert from 'node:assert/strict';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import {stageOrdinaryNncDependencies} from '../application/classical/participant_choice_coordination.mjs';
const owner=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
const source=owner.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:'pil',sourceClass:'tli-1'});
const base={subject:'3pl',animacy:'animate',humanness:'human',state:'possessive',possessor:'1sg',stemFormation:'plain',predicateFormation:'source-stem'};
test('explicit reduplication is inactive in singular and returns only to its original owner-issued Source',()=>{
 const selected=stageOrdinaryNncDependencies(owner,source,{...base,possessorReduplication:true},{choiceId:'possessorReduplication',previousMemory:null,explicitValidated:true});
 assert.equal(selected.active.possessorReduplication,true);
 const singular=stageOrdinaryNncDependencies(owner,source,{...selected.active,subject:'3sg'},{choiceId:'subject',previousMemory:selected.memory});
 assert(!Object.hasOwn(singular.active,'possessorReduplication'));assert.equal(singular.memory.values.possessorReduplication,true);
 const {animacy,...operationSelections}=singular.active;const operation=owner.buildClassicalNahuatlOrdinaryNncOperationFrame(source,operationSelections);assert.equal(operation.authorizationStatus,'authorized');assert.equal(operation.possessorReduplication,false);
 const restored=stageOrdinaryNncDependencies(owner,source,{...singular.active,subject:'3pl'},{choiceId:'subject',previousMemory:singular.memory});
 assert.equal(restored.active.possessorReduplication,true);
 const other=owner.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:'cal',sourceClass:'tli-1'});
 const changed=stageOrdinaryNncDependencies(owner,other,{...base},{choiceId:'subject',previousMemory:singular.memory});
 assert(!Object.hasOwn(changed.active,'possessorReduplication'));
});
test('an explicit replacement is not overwritten by dormant memory and rejected Sources grant no authority',()=>{
 const selected=stageOrdinaryNncDependencies(owner,source,{...base,possessorReduplication:true},{choiceId:'possessorReduplication',explicitValidated:true});
 const deselected=stageOrdinaryNncDependencies(owner,source,{...selected.active,possessorReduplication:false},{choiceId:'possessorReduplication',previousMemory:selected.memory,explicitValidated:true});
 assert.equal(deselected.active.possessorReduplication,false);
 const copied={...source};const blocked=stageOrdinaryNncDependencies(owner,copied,{...base},{choiceId:'subject',previousMemory:selected.memory});
 assert.equal(blocked.memory,null);assert.equal(blocked.active.possessorReduplication,undefined);
});
test('a request without a validated offered event is never remembered for later reactivation',()=>{
 const forged=stageOrdinaryNncDependencies(owner,source,{...base,possessorReduplication:true},{choiceId:'possessorReduplication'});
 assert.equal(Object.hasOwn(forged.memory.values,'possessorReduplication'),false);
 assert.equal(forged.invalid,true);
 const inactive=stageOrdinaryNncDependencies(owner,source,{...forged.active,subject:'3sg'},{choiceId:'subject',previousMemory:forged.memory});
 assert.equal(inactive.invalid,true);assert.equal(Object.hasOwn(inactive.memory.values,'possessorReduplication'),false);
});
test('a copied memory cannot invent a previous user decision',()=>{
 const forged={source,values:{possessorReduplication:true}};
 const result=stageOrdinaryNncDependencies(owner,source,{...base},{choiceId:'subject',previousMemory:forged});
 assert.equal(Object.hasOwn(result.active,'possessorReduplication'),false);
});
test('an unrecognized inactive request is not laundered into a valid operation',()=>{
 const result=stageOrdinaryNncDependencies(owner,source,{...base,subject:'3sg',possessorReduplication:'forged'},{choiceId:'subject'});
 assert.equal(result.active.possessorReduplication,'forged');assert.equal(result.invalid,true);
});
test('a selected plural ending remains an explicit incompatible request when the stem relation changes',()=>{
 const s=owner.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:'oquich',sourceClass:'tli-1'});
 const values={...base,state:'absolutive',stemFormation:'plain',pluralConnector:'m-eh'};delete values.possessor;
 const chosen=stageOrdinaryNncDependencies(owner,s,values,{choiceId:'pluralConnector',explicitValidated:true});
 const changed=stageOrdinaryNncDependencies(owner,s,{...chosen.active,stemFormation:'affinity'},{choiceId:'stemFormation',previousMemory:chosen.memory,previousSelections:chosen.active});
 assert.equal(changed.active.pluralConnector,'m-eh');
 const {animacy,...op}=changed.active;
 assert.equal(owner.buildClassicalNahuatlOrdinaryNncOperationFrame(s,op).authorizationStatus,'blocked');
});
test('a sole affinity connector is derived from its current owner domain when no ending was requested',()=>{
 const s=owner.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:'oquich',sourceClass:'tli-1'});
 const op=owner.buildClassicalNahuatlOrdinaryNncOperationFrame(s,{subject:'3pl',state:'absolutive',humanness:'human',stemFormation:'affinity',predicateFormation:'source-stem'});
 assert.equal(op.authorizationStatus,'authorized',op.blockReason);assert.equal(op.pluralConnector,'t-in');
});
test('a valid plural subject can be staged while the owner requests a plural ending',async()=>{
 const {readFileSync}=await import('node:fs');const vm=await import('node:vm');
 const s=owner.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:'oquich',sourceClass:'tli-1'}),nav=owner.getClassicalGrammarApplicationCapabilityNavigator(s);
 const binding=owner.issueClassicalGrammarTypedSourceOperationBindingFrame(nav,'nnc:ordinary',{subject:'3sg',animacy:'animate',humanness:'human',state:'absolutive',stemFormation:'plain',predicateFormation:'source-stem'});
 assert.equal(binding.bindingStatus,'ready');
 const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');const a=code.indexOf('    function getClassicalOrdinaryNncNextChoiceProjection('),b=code.indexOf('\n    function ',a+1);
 const ctx={targetObject:owner,getClassicalOrdinaryNncActiveCallerSelections:(_,v)=>v,getClassicalPronominalNextChoiceProjection:()=>null};vm.runInNewContext(code.slice(a,b),ctx);
 const option=ctx.getClassicalOrdinaryNncNextChoiceProjection(binding).subject.find(x=>x.optionId==='3pl');
 assert.equal(option?.availabilityStatus,'available');assert.equal(option?.requiresDependentChoice,'pluralConnector');
});
test('affinity can be staged with an incompatible earlier ending and exposes the owner-approved correction',async()=>{
 const {readFileSync}=await import('node:fs');const vm=await import('node:vm');
 const s=owner.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:'oquich',sourceClass:'tli-1'}),nav=owner.getClassicalGrammarApplicationCapabilityNavigator(s);
 const base={subject:'3pl',animacy:'animate',humanness:'human',state:'absolutive',stemFormation:'plain',predicateFormation:'source-stem',pluralConnector:'m-eh'};
 const binding=owner.issueClassicalGrammarTypedSourceOperationBindingFrame(nav,'nnc:ordinary',base);assert.equal(binding.bindingStatus,'ready');
 const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');const a=code.indexOf('    function getClassicalOrdinaryNncNextChoiceProjection('),b=code.indexOf('\n    function ',a+1);
 const ctx={targetObject:owner,getClassicalOrdinaryNncActiveCallerSelections:(_,v)=>v,getClassicalPronominalNextChoiceProjection:()=>null};vm.runInNewContext(code.slice(a,b),ctx);
 const option=ctx.getClassicalOrdinaryNncNextChoiceProjection(binding).stemFormation.find(x=>x.optionId==='affinity');assert.equal(option.availabilityStatus,'available');assert.equal(option.requiresDependentChoice,'pluralConnector');
 const next=owner.issueClassicalGrammarTypedSourceOperationBindingFrame(nav,'nnc:ordinary',{...base,stemFormation:'affinity'});
 assert.notEqual(next.bindingStatus,'ready');assert(next.requiredChoiceIds.includes('pluralConnector'));
 assert(next.choiceOptionProjection.pluralConnector.some(o=>o.optionId==='t-in' && o.availabilityStatus==='available'));
 const fixed=owner.issueClassicalGrammarTypedSourceOperationBindingFrame(nav,'nnc:ordinary',{...base,stemFormation:'affinity',pluralConnector:'t-in'});assert.equal(fixed.bindingStatus,'ready');
});
