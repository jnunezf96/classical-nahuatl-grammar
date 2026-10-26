import test from 'node:test';
import assert from 'node:assert/strict';
import {createComparisonApi} from '../core/comparison/comparison.mjs';
const owner=createComparisonApi();
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
const routes=['equality-iuhqui','equality-ihuan','similarity-iuhqui-principal'];
const noun=stem=>{const source=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem,sourceClass:'zero'});return r.executeClassicalGrammarApplicationRequest({operationId:'nnc:ordinary',args:[source,r.buildClassicalNahuatlOrdinaryNncOperationFrame(source,{subject:'3sg',state:'absolutive'})]}).canonicalResult;};
const parents={principal:noun('canāhuac'),adjoined:noun('tomāhuac'),dependent:noun('chicāhuac')};
function setup(route,dimension=true){const c=r.createClassicalClauseRelationController();for(const [role,parent] of Object.entries(parents))if(dimension||role!=='dependent')assert.equal(c.captureCurrentResult(role,parent).authorizationStatus,'authorized');return {c,s:{relation:'comparison',comparisonRoute:route}};}
for(const route of routes){
 test(`${route}: owner domains distinguish optional relation from its required input`,()=>{
  const yes=owner.getClassicalComparisonChoiceContract(route,{icRelation:'yes'}),no=owner.getClassicalComparisonChoiceContract(route,{icRelation:'no'});
  assert.deepEqual(yes.decisions.find(d=>d.key==='icRelation').values,['yes','no']);
  assert(yes.requiredSlots.includes('dimension'));assert(!no.requiredSlots.includes('dimension'));
  assert.equal(no.inputs.find(i=>i.slot==='dimension').contribution,'retained-not-included');
  assert.equal(yes.decisions.some(d=>d.key==='adjunctorIn'),route==='similarity-iuhqui-principal');
  assert(Object.isFrozen(yes.decisions));assert.equal(owner.getClassicalComparisonChoiceContract('size-ixquich',{}),null);
 });
 test(`${route}: shared frame explains default, prerequisite and explicit choice without changing parent`,()=>{
  const {c,s}=setup(route,false);let contract=c.buildDecisionContract(s),frame=contract.currentChoiceFrame;
  assert(frame);assert.equal(frame.decisions.find(d=>d.key==='icRelation').selectionOrigin,'application-default');
  assert.equal(frame.inputs.find(i=>i.slot==='dimension').requirement,'required');assert.equal(frame.outcome.readyToMake,false);
  contract=c.buildDecisionContract({...s,icRelation:'no'});frame=contract.currentChoiceFrame;
  assert.equal(frame.decisions.find(d=>d.key==='icRelation').selectionOrigin,'explicit-user');assert.equal(frame.outcome.readyToMake,true);
  assert.equal(c.getCapturedCanonicalResult('principal'),parents.principal);
  const invalid=c.buildDecisionContract({...s,icRelation:'invented'});
  assert.equal(invalid.authorizationStatus,'blocked');assert.equal(invalid.currentChoiceFrame.decisions.find(d=>d.key==='icRelation').selectedValue,'');
  assert.equal(invalid.currentChoiceFrame.decisions.find(d=>d.key==='icRelation').requestedValue,'invented');
 });
}
test('public explicit Yes policy does not replace owner omitted-value semantics',()=>{
 const slots={comparand:r.buildClassicalComparisonSourceUnit({sourceResult:parents.principal}),standard:r.buildClassicalComparisonSourceUnit({sourceResult:parents.adjoined})};
 const op=r.evaluateClassicalNahuatlComparison({routeId:'equality-iuhqui',slots});assert.equal(op.authorizationStatus,'authorized');assert(!op.selectedResult.includes('īc'));
 const {c,s}=setup('equality-iuhqui',false);assert.equal(c.buildDecisionContract(s).authorizationStatus,'blocked');
});
