import test from 'node:test';
import assert from 'node:assert/strict';
import {createPossessiveFixture} from './helpers/deverbal_possessive_fixture.mjs';
test('present and future agentive capture matches the consuming owner active-voice requirement',async()=>{
 const {r}=await createPossessiveFixture('');
 for(const tense of ['present','future'])for(const voice of ['active','passive']){
  const parent=r.requestClassicalVncApplicationResult({sourceStem:'pōhua',verbClass:'A',sourceValence:'specific-projective',objectPerson:'3sg',subject:'3sg',mood:'indicative',tense,requestedVoice:voice,nonactiveOptionId:voice==='passive'?'hua:pōhuī-hua':''});
  assert.equal(parent.authorizationStatus,'authorized',parent.blockReason);
  const kind=tense+'-agentive',expected=voice==='active'?'authorized':'blocked';
  const capture=r.captureClassicalNahuatlVncResultForPredicateNominalization(parent,kind,'absolutive');
  assert.equal(capture.authorizationStatus,expected,`${tense} ${voice} capture`);
  const batch=r.captureClassicalNahuatlVncResultForPredicateNominalizationBatch(parent,[{nominalizationKind:kind,state:'absolutive'}]);
  assert.equal(batch.captures[0].authorizationStatus,expected);
 }
});
