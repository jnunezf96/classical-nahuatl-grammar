import test from 'node:test';
import assert from 'node:assert/strict';
import {createPossessiveFixture} from './helpers/deverbal_possessive_fixture.mjs';

test('exact preterit personal names retain the genuine source number rather than universal c',async()=>{
 const {r}=await createPossessiveFixture('telchīhua');
 for(const [sourceStem,verbClass,sourceValence,surface] of [
  ['telchīhua','B','mainline-reflexive','niMotelchīuh'],
  ['temō','A','intransitive','niTemōc'],
 ]){
  const parent=r.evaluateClassicalNahuatlVncApplication({sourceStem,verbClass,sourceValence,subject:'3sg',mood:'indicative',tense:'preterit',requestedDerivation:'direct',requestedVoice:'active'});
  assert.equal(parent.authorizationStatus,'authorized',parent.blockReason);
  const before=JSON.stringify(parent);
  const name=r.evaluatePersonalNameNnc({canonicalSourceResult:parent.resultFrame,sourceFamily:'preterit-agentive',outerSubject:'1sg'});
  assert.equal(name.authorizationStatus,'authorized',name.blockReason);
  assert.equal(name.surfaceRealization,surface);
  assert.equal(name.canonicalSourceResult,parent.resultFrame);
  assert.equal(JSON.stringify(parent),before);
  assert.notEqual(r.evaluatePersonalNameNnc({canonicalSourceResult:{...parent.resultFrame},sourceFamily:'preterit-agentive',outerSubject:'1sg'}).authorizationStatus,'authorized');
 }
});
