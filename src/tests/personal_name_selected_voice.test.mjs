import test from 'node:test';
import assert from 'node:assert/strict';
import {createPossessiveFixture} from './helpers/deverbal_possessive_fixture.mjs';

test('personal-name families follow the issued selected voice, not the earlier source voice',async()=>{
 const {r}=await createPossessiveFixture('tepotz-iht-o-ā');
 for(const [voice,family,source,expected]of[
  ['passive','passive-preterit-patientive',{sourceStem:'tepotz-iht-o-ā',sourceEmbedStem:'tepotz',sourceMatrixStem:'iht-o-ā',verbClass:'C',sourceValence:'specific-projective',objectPerson:'3sg'},'tiTepotzihtōlōc'],
  ['impersonal','impersonal-preterit-agentive',{sourceStem:'cochi',verbClass:'B',sourceValence:'intransitive'},'tiCochīhuac'],
 ]){
  const option=voice==='impersonal'?r.getClassicalNahuatlNonactiveStemOptions(source.sourceStem,{verbClass:source.verbClass,sourceValence:source.sourceValence}).options.find(o=>o.suffixFamily==='hua'):null;
  const parent=r.requestClassicalVncApplicationResult({...source,...(option?{nonactiveOptionId:option.optionId}:{}),subject:'3sg',mood:'indicative',tense:'preterit',requestedVoice:voice});
  assert.equal(parent.authorizationStatus,'authorized',parent.blockReason);
  const before=JSON.stringify(parent);
  const name=r.evaluatePersonalNameNnc({canonicalSourceResult:parent,sourceFamily:family,outerSubject:'2sg'});
  assert.equal(name.authorizationStatus,'authorized',name.blockReason);
  assert.equal(name.surfaceRealization,expected);
  assert.equal(name.canonicalSourceResult,parent);
  assert.equal(JSON.stringify(parent),before);
  assert.notEqual(r.evaluatePersonalNameNnc({canonicalSourceResult:{...parent},sourceFamily:family,outerSubject:'2sg'}).authorizationStatus,'authorized');
 }
});
