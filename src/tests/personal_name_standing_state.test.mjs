import test from 'node:test';
import assert from 'node:assert/strict';
import {createPossessiveFixture} from './helpers/deverbal_possessive_fixture.mjs';

test('issued preterit-as-present posture selects the matching personal-name family',async()=>{
 const {r}=await createPossessiveFixture('on-o');
 const parent=r.requestClassicalVncApplicationResult({sourceStem:'on-o',sourceValence:'intransitive',subject:'3sg',mood:'indicative',tense:'preterit-as-present',requestedVoice:'active'});
 assert.equal(parent.authorizationStatus,'authorized',parent.blockReason);
 assert.equal(parent.resultFrame.surfaceRealization,'onoc');
 const before=JSON.stringify(parent);
 const request={canonicalSourceResult:parent,sourceFamily:'preterit-as-present-agentive',outerSubject:'2sg'};
 const result=r.evaluatePersonalNameNnc(request);
 assert.equal(result.authorizationStatus,'authorized',result.blockReason);
 assert.equal(result.surfaceRealization,'tOnoc');
 assert.equal(result.canonicalSourceResult,parent);
 assert.equal(JSON.stringify(parent),before);
 assert.notEqual(r.evaluatePersonalNameNnc({...request,sourceFamily:'present-agentive'}).authorizationStatus,'authorized');
 assert.notEqual(r.evaluatePersonalNameNnc({...request,canonicalSourceResult:{...parent}}).authorizationStatus,'authorized');
});
