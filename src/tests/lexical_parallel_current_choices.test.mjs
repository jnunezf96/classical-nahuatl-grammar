import test from 'node:test';
import assert from 'node:assert/strict';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import {createConjunctionClauseGlobals} from '../core/clause/conjunction/conjunction.mjs';
const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
const owner=createConjunctionClauseGlobals(r);
const ordinary=stem=>{const s=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem,sourceClass:'zero'});return r.executeClassicalGrammarApplicationRequest({operationId:'nnc:ordinary',args:[s,r.buildClassicalNahuatlOrdinaryNncOperationFrame(s,{subject:'3sg',state:'absolutive'})]}).canonicalResult;};
const a=ordinary('canāhuac'),b=ordinary('chicāhuac');
const setup=()=>{const c=r.createClassicalClauseRelationController();c.captureCurrentResult('principal',a);c.captureCurrentResult('adjoined',b);return c;};
const lexical={relation:'lexical-conjunction',lexicalType:'lord-and-master',adjunctorDistribution:'none',stateRealization:'conjoined-stems'};
const parallel={relation:'parallel-structure',parallelType:'rephrasive',rephraseAxis:'none',appositiveType:'none',boundaryPunctuation:'none'};
test('owner supplies lexical and parallel choices without claiming semantic attestation',()=>{
 const q=owner.getClassicalLexicalParallelChoiceContract('lexical-conjunction',lexical,[]);
 assert.equal(q.executionAuthority,false);assert.deepEqual(q.decisions.map(d=>d.key),['lexicalType','adjunctorDistribution','stateRealization']);
 const p=owner.getClassicalLexicalParallelChoiceContract('parallel-structure',{...parallel,parallelType:'progressive'},[]);
 assert(!p.decisions.some(d=>d.key==='rephraseAxis'));assert.deepEqual(p.decisions.find(d=>d.key==='boundaryPunctuation').values,['none','comma','semicolon','dash']);
});
test('lexical readiness uses Make shared reference, guards transitions and retains incompatible third input',()=>{
 const c=setup(),contract=c.buildDecisionContract(lexical);assert.equal(contract.authorizationStatus,'authorized',contract.blockReason);
 assert.equal(contract.currentChoiceFrame.familyId,'lexical-conjunction');const preview=c.preview(lexical);assert(preview.isCurrent());
 const next=c.transitionConjunctionChoice({selections:lexical,expectedFrame:contract.currentChoiceFrame,intent:{type:'set-choice',key:'stateRealization',value:'compound-handoff'}});
 assert.equal(next.contract.authorizationStatus,'authorized');assert.equal(preview.isCurrent(),false);
 const made=c.compose(next.selections);assert.equal(made.authorizationStatus,'authorized');assert.equal(made.canonicalResult.relationFrame.lexicalInterpretationIndependentlyValidated,false);
 assert.equal(r.getClassicalNahuatlSupplementationClauseSourceFrame(made.canonicalResult.conjuncts[0].envelope),a);
 const third=c.transitionConjunctionChoice({selections:next.selections,expectedFrame:next.contract.currentChoiceFrame,intent:{type:'capture',role:'dependent',result:a}});
 assert.equal(third.contract.authorizationStatus,'blocked');assert.equal(c.getCapturedCanonicalResult('dependent'),a);
 assert.equal(third.contract.decisions.find(d=>d.id==='state-realization').optionAvailability.find(d=>d.value==='compound-handoff').status,'incompatible');
 assert.equal(c.transitionConjunctionChoice({selections:third.selections,expectedFrame:{...third.contract.currentChoiceFrame},intent:{type:'clear-capture',role:'principal'}}).authorizationStatus,'blocked');
});
test('parallel retains inactive axis then revalidates on return; explicit correction restores readiness',()=>{
 const c=setup(),bad={...parallel,rephraseAxis:'active-passive'},blocked=c.buildDecisionContract(bad);assert.equal(blocked.authorizationStatus,'blocked');
 const progressive=c.transitionConjunctionChoice({selections:bad,expectedFrame:blocked.currentChoiceFrame,intent:{type:'set-choice',key:'parallelType',value:'progressive'}});
 assert.equal(progressive.contract.authorizationStatus,'authorized',progressive.contract.blockReason);assert.equal(progressive.selections.rephraseAxis,'active-passive');assert.equal(progressive.contract.operationSelections.rephraseAxis,'');
 const back=c.transitionConjunctionChoice({selections:progressive.selections,expectedFrame:progressive.contract.currentChoiceFrame,intent:{type:'set-choice',key:'parallelType',value:'rephrasive'}});assert.equal(back.contract.authorizationStatus,'blocked');
 const fixed=c.transitionConjunctionChoice({selections:back.selections,expectedFrame:back.contract.currentChoiceFrame,intent:{type:'set-choice',key:'rephraseAxis',value:'none'}});assert.equal(fixed.contract.authorizationStatus,'authorized');
 const made=c.compose(fixed.selections);assert.equal(made.authorizationStatus,'authorized');assert.equal(r.getClassicalNahuatlSupplementationClauseSourceFrame(made.canonicalResult.conjuncts[1].envelope),b);
 const summary=c.buildDecisionContract({...parallel,appositiveType:'summarizing'});assert.equal(summary.authorizationStatus,'blocked');
 const omitted=c.buildDecisionContract({...parallel,rephraseAxis:'',appositiveType:'clarifying'});assert.equal(omitted.authorizationStatus,'authorized');
});
test('bound lexical and parallel recovery remains available with a missing capture',async()=>{
 const {readFileSync}=await import('node:fs'),vm=await import('node:vm'),{Element}=await import('./helpers/organization_dom.mjs');
 const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8'),start=code.indexOf('    function syncClassicalClauseRelationCapabilityChoices(');
 for(const selection of [lexical,{...parallel,rephraseAxis:'active-passive'}]){
  const c=setup();c.clearCapture('adjoined');const contract=c.buildDecisionContract(selection),host=new Element(),seen=[];
  const ctx={targetObject:{document:{getElementById:()=>host}},clearOwnerChoicePortals(){},createClassicalClauseRelationDecisionControl(d,frame){seen.push({id:d.id,frame});return new Element();}};
  vm.runInNewContext(code.slice(start,code.indexOf('\n    function ',start+10)),ctx);ctx.syncClassicalClauseRelationCapabilityChoices(contract,['adjoined']);
  for(const id of selection===lexical?['lexical-type','state-realization']:['parallel-type','rephrase-axis'])assert(seen.some(d=>d.id===id));
  assert(seen.every(d=>d.frame===contract.currentChoiceFrame));
  if(selection!==lexical){assert.equal(contract.decisions.find(d=>d.id==='rephrase-axis').optionAvailability.find(o=>o.value==='none').status,'available');const reset=c.transitionConjunctionChoice({selections:selection,expectedFrame:contract.currentChoiceFrame,intent:{type:'set-choice',key:'rephraseAxis',value:'none'}});assert.equal(reset.selections.rephraseAxis,'none');assert.equal(reset.contract.authorizationStatus,'blocked');}

  assert.equal(c.transitionConjunctionChoice({selections:selection,expectedFrame:contract.currentChoiceFrame,intent:{type:'capture',role:'adjoined',result:{...b}}}).authorizationStatus,'blocked');
 }
});
