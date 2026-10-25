import test from 'node:test';
import assert from 'node:assert/strict';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
const s=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:'chicāhuac',sourceClass:'zero'});
const noun=r.executeClassicalGrammarApplicationRequest({operationId:'nnc:ordinary',args:[s,r.buildClassicalNahuatlOrdinaryNncOperationFrame(s,{subject:'1sg',state:'absolutive'})]}).canonicalResult;
const src=x=>r.buildClassicalComparisonSourceUnit({sourceResult:x});
const child=r.requestClassicalComparisonResult({routeId:'similarity-iuhqui-principal',slots:{adjoined:src(noun)},choices:{icRelation:false,sentenceType:'declarative'}});
const head=r.requestClassicalVncApplicationResult({sourceStem:'cuīca',verbClass:'A',sourceValence:'intransitive',subject:'1sg',mood:'indicative',tense:'present',requestedVoice:'active'});
test('larger iuhqui carries the exact genuine similarity clause into an ordinary VNC host',()=>{
 assert.equal(child.authorizationStatus,'authorized');assert.equal(head.authorizationStatus,'authorized');
 const childSource=src(child),headSource=src(head);
 assert.equal(childSource.authorizationStatus,'authorized',childSource.blockReason);
 assert.equal(childSource.baseUnitKind,'composition');assert.equal(r.getClassicalComparisonCanonicalSourceResult(childSource),child);
 for(const position of ['preposed','postposed']){
  const result=r.evaluateClassicalNahuatlComparison({routeId:'similarity-iuhqui-larger-concatenate',slots:{similarityClause:childSource,headClause:headSource},choices:{position,sentenceType:'none'}});
  assert.equal(result.authorizationStatus,'authorized',result.blockReason);
  assert.equal(result.surface,position==='preposed'?'iuhqui in nichicāhuac nicuīca':'nicuīca iuhqui in nichicāhuac');
  assert.equal(r.getClassicalComparisonCanonicalSourceResult(result.operationFrame.sourceSlots.similarityClause),child);
  assert.equal(r.getClassicalComparisonCanonicalSourceResult(result.operationFrame.sourceSlots.headClause),head);
  assert.ok(result.formula.includes(child.formula));assert.equal(child.surface.endsWith('.'),true);
 }
 const c=r.createClassicalClauseRelationController();assert.equal(c.captureCurrentResult('principal',child).authorizationStatus,'authorized');c.captureCurrentResult('adjoined',head);
 const choices={relation:'comparison',comparisonRoute:'similarity-iuhqui-larger-concatenate',position:'preposed',sentenceType:'none'};
 assert.equal(c.buildDecisionContract(choices).authorizationStatus,'authorized');assert.equal(c.compose(choices).authorizationStatus,'authorized');
 for(const fake of [{...child},JSON.parse(JSON.stringify(child))]){assert.equal(src(fake).authorizationStatus,'blocked');assert.equal(c.captureCurrentResult('principal',fake).authorizationStatus,'blocked');}
 assert.equal(c.getCapturedCanonicalResult('principal'),child);
 const noun2=r.executeClassicalGrammarApplicationRequest({operationId:'nnc:ordinary',args:[s,r.buildClassicalNahuatlOrdinaryNncOperationFrame(s,{subject:'2sg',state:'absolutive'})]}).canonicalResult;
 const conjuncts=[noun,noun2].map((x,i)=>r.buildClassicalNahuatlClauseCompositionSourceFrame(x,{referenceId:`contrast-${i}`}));
 const unrelated=r.requestClassicalClauseCompositionResult({operationKind:'conjunction',conjuncts,options:{relation:'unmarked',coordinationType:'additive',level:'principal',polarity:'positive'}});
 assert.equal(unrelated.authorizationStatus,'authorized');assert.equal(src(unrelated).baseUnitKind,'composition');
 c.captureCurrentResult('principal',unrelated);
 assert.equal(c.buildDecisionContract(choices).authorizationStatus,'blocked');assert.equal(c.compose(choices).authorizationStatus,'blocked');
 const wrong=r.requestClassicalComparisonResult({routeId:'size-ixquich',slots:{standard:src(noun)},choices:{sentenceType:'none'}});
 for(const bad of [src(noun),src(unrelated),src(wrong),{...childSource}])assert.equal(r.evaluateClassicalNahuatlComparison({routeId:'similarity-iuhqui-larger-concatenate',slots:{similarityClause:bad,headClause:headSource},choices:{position:'preposed'}}).authorizationStatus,'blocked');
});
