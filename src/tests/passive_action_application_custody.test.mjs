import test from 'node:test';
import assert from 'node:assert/strict';
import {createPossessiveFixture} from './helpers/deverbal_possessive_fixture.mjs';
test('passive action consumes its issued nonactive application without requiring a separate source mirror',async()=>{
 const {r}=await createPossessiveFixture('');
 const parent=r.requestClassicalVncApplicationResult({sourceStem:'pōhua',verbClass:'A',sourceValence:'specific-projective',objectPerson:'3sg',subject:'3sg',mood:'indicative',tense:'distant-past',requestedVoice:'passive',nonactiveOptionId:'hua:pōhuī-hua'});
 assert.equal(parent.authorizationStatus,'authorized',parent.blockReason);
 assert.equal(r.isClassicalNahuatlVncApplicationIssuedFrame(parent),true);
 for(const [state,word] of [['absolutive','pōhuīhuacāyōtl'],['possessive','īpōhuīhuaca']]){
  const request={constructionKind:'predicate-nominalization',nominalizationKind:'passive-action',canonicalVncResult:parent,state};
  const result=r.evaluateClassicalNahuatlDeverbalNnc(request);
  assert.equal(result.authorizationStatus,'authorized',result.blockReason);
  assert.equal(result.wordSurface,word);
  assert.equal(result.sourceFrame.canonicalVncResult,parent);
  const copied=r.evaluateClassicalNahuatlDeverbalNnc({...request,canonicalVncResult:{...parent}});
  assert.equal(copied.authorizationStatus,'blocked');
 }
});
