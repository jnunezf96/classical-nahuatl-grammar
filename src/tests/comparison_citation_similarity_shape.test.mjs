import test from 'node:test';
import assert from 'node:assert/strict';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
test('citation similarity derives short reduplication and excludes nominal affinity/distribution analyses',()=>{
 const s=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:'cal',sourceClass:'tli-1'});
 const noun=r.executeClassicalGrammarApplicationRequest({operationId:'nnc:ordinary',args:[s,r.buildClassicalNahuatlOrdinaryNncOperationFrame(s,{subject:'3common',state:'absolutive'})]}).canonicalResult;
 const source=r.buildClassicalComparisonSourceUnit({sourceResult:noun});
 assert.deepEqual([...r.getClassicalComparisonCitationChoiceInventory(source).reduplicationShapes],['short-cv']);
 const c=r.createClassicalClauseRelationController();c.captureCurrentResult('principal',noun);
 for(const family of ['bare','absolutive-li']){
  const choices={relation:'comparison',comparisonRoute:'similarity-reduplicative-prefix',continuationFamily:family};
  const contract=c.buildDecisionContract(choices);
  assert.equal(contract.authorizationStatus,'authorized',contract.blockReason);
  assert.equal(contract.operationSelections.reduplicationShape,'short-cv');
  assert.equal(contract.decisions.some(d=>d.id==='reduplication-shape'),false);
  const result=c.compose(choices);assert.equal(result.authorizationStatus,'authorized',result.blockReason);
  assert.equal(result.canonicalResult?.surface||result.surface,family==='bare'?'cacal':'cacalli');
  for(const shape of ['long-cv','glottalized-cv']){
   assert.equal(c.buildDecisionContract({...choices,reduplicationShape:shape}).authorizationStatus,'blocked');
   assert.equal(c.compose({...choices,reduplicationShape:shape}).authorizationStatus,'blocked');
   assert.equal(r.evaluateClassicalNahuatlComparison({routeId:'similarity-reduplicative-prefix',slots:{source},choices:{continuationFamily:family,reduplicationShape:shape}}).authorizationStatus,'blocked');
  }
 }
 const before={relation:'comparison',comparisonRoute:'similarity-reduplicative-prefix',continuationFamily:'ti-agentive',reduplicationShape:'long-cv',tiClass:'c'};
 const transition=c.transitionComparisonChoice({selections:before,expectedFrame:c.buildDecisionContract(before).currentChoiceFrame,intent:{type:'set-choice',key:'continuationFamily',value:'bare'}});
 assert.equal(transition.authorizationStatus,'authorized');
 assert.equal(transition.selections.reduplicationShape,undefined);
 assert.equal(transition.selections.tiClass,undefined);
 assert.equal(transition.contract.operationSelections.reduplicationShape,'short-cv');
});
