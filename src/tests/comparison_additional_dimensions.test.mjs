import test from 'node:test';
import assert from 'node:assert/strict';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
const {runtimeObject:r}=await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}});
const noun=(stem)=>{const s=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem,sourceClass:'zero'});const x=r.executeClassicalGrammarApplicationRequest({operationId:'nnc:ordinary',args:[s,r.buildClassicalNahuatlOrdinaryNncOperationFrame(s,{subject:'3sg',state:'absolutive'})]});assert.equal(x.authorizationStatus,'authorized');return x.canonicalResult;};
const p=noun('canāhuac'),q=noun('tomāhuac'),d=noun('chicāhuac'),src=x=>r.buildClassicalComparisonSourceUnit({sourceResult:x});
for(const route of ['equality-ihuan','similarity-iuhqui-principal'])test(`${route}: īc requires a following authentic dimension`,()=>{
 const slots=route==='equality-ihuan'?{comparand:src(p),standard:src(q)}:{adjoined:src(p)};
 const execute=(icRelation,extra={})=>r.evaluateClassicalNahuatlComparison({routeId:route,slots:{...slots,...extra},choices:{icRelation,sentenceType:'none'}});
 assert.equal(execute(false).authorizationStatus,'authorized');assert.equal(execute(true).authorizationStatus,'blocked');
 const dimension=src(d),yes=execute(true,{dimension});assert.equal(yes.authorizationStatus,'authorized');assert.match(yes.selectedResult,/īc chicāhuac$/u);
 assert.equal(execute(true,{dimension:{...dimension}}).authorizationStatus,'blocked');assert.equal(execute(true,{dimension:src({kind:'fake'})}).authorizationStatus,'blocked');
 const c=r.createClassicalClauseRelationController();c.captureCurrentResult('principal',p);if(route==='equality-ihuan')c.captureCurrentResult('adjoined',q);
 const base={relation:'comparison',comparisonRoute:route};assert.equal(c.buildDecisionContract({...base,icRelation:'no'}).authorizationStatus,'authorized');
 const pending=c.buildDecisionContract({...base,icRelation:'yes'});assert.equal(pending.authorizationStatus,'blocked');assert.ok(pending.derived.requiredCaptureRoles.includes('dependent'));assert.equal(pending.decisions.find(x=>x.id==='ic-relation').determinesCaptureRoles,true,'īc must remain editable before dimension capture');assert.equal(c.compose({...base,icRelation:'yes'}).authorizationStatus,'blocked');
 assert.equal(c.captureCurrentResult('dependent',{...d}).authorizationStatus,'blocked');assert.equal(c.getCapturedCanonicalResult('principal'),p);c.captureCurrentResult('dependent',d);assert.equal(c.buildDecisionContract({...base,icRelation:'yes'}).authorizationStatus,'authorized');assert.equal(c.compose({...base,icRelation:'yes'}).authorizationStatus,'authorized');
});
test('turning īc off omits only the captured dimension layer and preserves it for reuse',()=>{
 for(const route of ['equality-iuhqui','equality-ihuan','similarity-iuhqui-principal']){
  const baseSlots=route==='similarity-iuhqui-principal'?{adjoined:src(p)}:{comparand:src(p),standard:src(q)};
  const dimension=src(d),make=(icRelation,include)=>r.evaluateClassicalNahuatlComparison({routeId:route,slots:{...baseSlots,...(include?{dimension}:{})},choices:{icRelation,sentenceType:'none'}});
  const without=make(false,false),off=make(false,true),on=make(true,true);
  assert.equal(off.authorizationStatus,'authorized');assert.equal(off.selectedResult,without.selectedResult);assert.equal(off.formula,without.formula);assert.deepEqual(off.formulaSlots,without.formulaSlots);
  assert.equal(on.authorizationStatus,'authorized');assert.match(on.selectedResult,/īc chicāhuac$/u);
  assert.equal(r.getClassicalComparisonCanonicalSourceResult(off.operationFrame.sourceSlots.dimension),d);
 }
});
