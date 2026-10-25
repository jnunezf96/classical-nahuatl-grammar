import test from 'node:test';
import {getConstructionLayerReadiness} from '../ui/composition/construction_layers.mjs';
import assert from 'node:assert/strict';
import {createPossessiveFixture} from './helpers/deverbal_possessive_fixture.mjs';

// Andrews 32.3 supplies compound class; 56.2.2 independently permits
// truncating the inner number. The whole original statement remains Source.
test('exact inner-name affective consumes the canonical compound before name truncation',async()=>{
 const {r}=await createPossessiveFixture('');
 for(const [stem,sourceClass,family,expected]of[
  ['Yaō','tl-1-a','absolutive-state-nnc','tiYaōtzintli'],
  ['chichi','zero','absolutive-state-nnc','tiChichitzin'],
  ['Yaō','tl-1-a','absolutive-state-truncated-inner-number','tiYaōtzin'],
 ]){
  const source=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem,sourceClass});
  const operation=r.buildClassicalNahuatlOrdinaryNncOperationFrame(source,{state:'absolutive',subject:'3sg'});
  const parent=r.requestClassicalOrdinaryNncResult(source,operation);
  const before=JSON.stringify(parent);
  const request={canonicalSourceResult:parent,sourceFamily:family,outerSubject:'2sg',affectiveScope:'inner-source',affectiveMatrix:'tzin'};
  assert.equal(getConstructionLayerReadiness(r,{operation:'nnc:personal-name',source:parent,request:{operationId:'nnc:personal-name',args:[request]}}).ready,true);
  const result=r.evaluatePersonalNameNnc(request);
  assert.equal(result.authorizationStatus,'authorized',result.blockReason);
  assert.equal(result.surfaceRealization,expected);
  assert.equal(result.canonicalSourceResult,parent);
  assert.equal(JSON.stringify(parent),before);
  const affected=result.typedSlotFrame.grammarOperation.canonicalInnerAffectiveResult;
  assert.equal(r.isClassicalNahuatlNominalConstructionResult(affected),true);
  assert.equal(affected.sourceAuthorizationFrame.lexicalFacts.capturedEmbedResult,parent);
  assert.equal(r.evaluatePersonalNameNnc({...request,canonicalSourceResult:{...parent}}).authorizationStatus,'blocked');
 }
});
test('inner affective requires compound source analysis while outer-name keeps the whole statement',async()=>{
 const {r}=await createPossessiveFixture('');
 const source=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:'Yaō',sourceClass:'tl'});
 const parent=r.requestClassicalOrdinaryNncResult(source,r.buildClassicalNahuatlOrdinaryNncOperationFrame(source,{state:'absolutive',subject:'3sg'}));
 const request={canonicalSourceResult:parent,outerSubject:'2sg',affectiveMatrix:'tzin'};
 const inner={...request,affectiveScope:'inner-source'};
 const readiness=getConstructionLayerReadiness(r,{operation:'nnc:personal-name',source:parent,request:{operationId:'nnc:personal-name',args:[inner]}});
 assert.equal(readiness.ready,false);
 assert.equal(readiness.blockReason,'ordinary-nnc-embed-source-use-analysis-required');
 assert.equal(r.evaluatePersonalNameNnc(inner).authorizationStatus,'blocked');
 assert.equal(r.evaluatePersonalNameNnc({...request,affectiveScope:'outer-name'}).surfaceRealization,'tiYaōtzin');
});
