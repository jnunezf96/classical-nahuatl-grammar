import test from 'node:test';
import assert from 'node:assert/strict';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
const kind='classical-nahuatl-nnc-nounstem-request';
const parent=(noun,extra={})=>r.evaluateClassicalNahuatlRelationalNnc({subjectMode:'adverbialized',...extra,nounstem:{kind,stemId:'huic-direction',operation:'relational-nnc',...noun}});
const outer=(p,extra={},noun={})=>r.evaluateClassicalNahuatlRelationalNnc({state:'absolutive',subjectMode:'adverbialized',...extra,nounstem:{kind,stemId:'pa-direction',operation:'relational-nnc',formation:'option-two',sourceFormation:'relational-nnc-predicate',upstreamResult:p,...noun}});
for(const [name,noun,extra,expected] of [
 ['compound',{formation:'option-two',sourceKind:'relational-compound',sourceEmbedStem:'tlani'},{},'tlanihuīcpa'],
 ['possessor',{formation:'option-one',sourceKind:'possessor'},{state:'possessive',possessorId:'nonspecific-human'},'tēhuīcpa'],
 ['negative',{formation:'option-two',sourceKind:'negative-particle',sourceEmbedStem:'ah'},{},'ahhuīcpa']]){
 test(`genuine ${name} huic Result continues into pa with exact inner custody`,()=>{
  const p=parent(noun,extra);assert.equal(p.authorizationStatus,'authorized');
  const result=outer(p);assert.equal(result.authorizationStatus,'authorized',JSON.stringify(result.diagnostics));
  assert.equal(result.surface,expected);assert.equal(result.sourceFrame.state,'absolutive');assert.equal(result.sourceFrame.possessorId,'');
  const c=result.sourceFrame.upstreamSourceCarrier;assert.equal(c.ownerResult,p);assert.equal(c.canonicalTypedSlotFrame,p.nncSlotFrame);
  const binding=r.issueClassicalNahuatlFormationResultBindingFrame('nnc:relational',p);
  assert.ok(binding.bindingChoices.some(c=>c.id==='relational-source:relational-nnc-predicate:pa-direction'));
  for(const invalid of [{...p},JSON.parse(JSON.stringify(p))]){
   assert.notEqual(outer(invalid).authorizationStatus,'authorized');
   const b=r.issueClassicalNahuatlFormationResultBindingFrame('nnc:relational',invalid);
   assert.ok(!b.bindingChoices?.some(c=>c.id==='relational-source:relational-nnc-predicate:pa-direction'));
  }
  assert.notEqual(outer(p,{}, {sourceEmbedStem:'forged'}).authorizationStatus,'authorized');
  assert.notEqual(outer(p,{state:'possessive',possessorId:'nonspecific-human'}).authorizationStatus,'authorized');
  assert.notEqual(outer(p,{negative:true}).authorizationStatus,'authorized');
 });
}
test('existing co/c predicate continuation and incompatible huic boundary',()=>{
 const p=r.evaluateClassicalNahuatlRelationalNnc({subjectMode:'adverbialized',nounstem:{kind,stemId:'co-c-specific-location',operation:'relational-nnc',formation:'option-two',sourceKind:'nounstem',sourceEmbedStem:'cal'}});
 assert.equal(p.authorizationStatus,'authorized');assert.equal(outer(p).surface,'calcopa');
 const normal=parent({formation:'option-two',sourceKind:'relational-compound',sourceEmbedStem:'tlani'},{subjectMode:'normal'});
 assert.notEqual(outer(normal).authorizationStatus,'authorized');
});
