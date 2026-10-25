import test from 'node:test';
import assert from 'node:assert/strict';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
const {runtimeObject:r}=await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}});
const noun=(stem,sourceClass)=>{const s=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem,sourceClass});return r.executeClassicalGrammarApplicationRequest({operationId:'nnc:ordinary',args:[s,r.buildClassicalNahuatlOrdinaryNncOperationFrame(s,{subject:stem==='cal'?'3common':'3sg',state:'absolutive',...(stem==='cal'?{animacy:'nonanimate',humanness:'nonhuman'}:{})})]}).canonicalResult;};
const a=noun('canāhuac','zero'),b=noun('tomāhuac','zero'),d=noun('chicāhuac','zero');
const src=x=>r.buildClassicalComparisonSourceUnit({sourceResult:x});
const slots={comparand:src(a),standard:src(b)};
const execute=(ic,extra={})=>r.evaluateClassicalNahuatlComparison({routeId:'equality-iuhqui',slots:{...slots,...extra},choices:{icRelation:ic,sentenceType:'none'}});
test('equality īc requires an authenticated dimension; no-īc remains complete with two parents',()=>{
 assert.equal(execute(false).authorizationStatus,'authorized');
 assert.equal(execute(true).authorizationStatus,'blocked');
 const dimension=src(d);const yes=execute(true,{dimension});assert.equal(yes.authorizationStatus,'authorized');assert.match(yes.selectedResult,/īc chicāhuac$/);
 assert.equal(execute(true,{dimension:{...dimension}}).authorizationStatus,'blocked');
 assert.equal(execute(true,{dimension:src({kind:'unrelated-result'})}).authorizationStatus,'blocked');
});
test('controller requests dependent dimension only for īc yes and preserves captures while staging',()=>{
 const c=r.createClassicalClauseRelationController();c.captureCurrentResult('principal',a);c.captureCurrentResult('adjoined',b);
 const base={relation:'comparison',comparisonRoute:'equality-iuhqui',sentenceType:'none'};
 assert.equal(c.buildDecisionContract({...base,icRelation:'no'}).authorizationStatus,'authorized');
 const pending=c.buildDecisionContract({...base,icRelation:'yes'});assert.equal(pending.authorizationStatus,'blocked');assert.ok(pending.derived.requiredCaptureRoles.includes('dependent'));assert.equal(c.compose({...base,icRelation:'yes'}).authorizationStatus,'blocked');
 assert.equal(c.captureCurrentResult('dependent',{...d}).authorizationStatus,'blocked');
 assert.equal(c.getCapturedCanonicalResult('principal'),a);c.captureCurrentResult('dependent',d);assert.equal(c.buildDecisionContract({...base,icRelation:'yes'}).authorizationStatus,'authorized');
});
