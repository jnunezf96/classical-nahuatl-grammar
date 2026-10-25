import test from 'node:test';
import assert from 'node:assert/strict';
import {createPossessiveFixture} from './helpers/deverbal_possessive_fixture.mjs';

test('predicate capture admits only the voice required by its nominalization, in single and batch paths',async()=>{
 const {r}=await createPossessiveFixture('');
 const cases=[
  ['active','cochi','intransitive','','customary-present',['customary-agentive-reanalysis','customary-agentive-full']],
  ['passive','pōhua','specific-projective','hua:pōhuī-hua','customary-present',['customary-patientive']],
  ['impersonal','cochi','intransitive','hua:cochī-hua','customary-present',['instrumentive','instrumentive-full']],
 ];
 const kinds=['customary-agentive-reanalysis','customary-agentive-full','customary-patientive','instrumentive','instrumentive-full'];
 for(const [voice,stem,valence,option,tense,allowed] of cases){
  const source=r.requestClassicalVncApplicationResult({sourceStem:stem,verbClass:stem==='pōhua'?'A':'B',sourceValence:valence,objectPerson:'3sg',subject:'3sg',mood:'indicative',tense,requestedVoice:voice,nonactiveOptionId:option});
  assert.equal(source.authorizationStatus,'authorized',source.blockReason);
  const specs=kinds.map(nominalizationKind=>({nominalizationKind,state:'absolutive'}));
  const batch=r.captureClassicalNahuatlVncResultForPredicateNominalizationBatch(source,specs);
  for(const [index,kind] of kinds.entries()){
   const capture=r.captureClassicalNahuatlVncResultForPredicateNominalization(source,kind,'absolutive');
   const expected=allowed.includes(kind)?'authorized':'blocked';
   assert.equal(capture.authorizationStatus,expected,`${voice} → ${kind}`);
   assert.equal(batch.captures[index].authorizationStatus,expected,`batch ${voice} → ${kind}`);
   if(expected==='authorized')assert.equal(capture.canonicalVncResult,source);
  }
 }
});

test('possessive instrumentive retains its active imperfect source and rejects passive imperfect',async()=>{
 const {r}=await createPossessiveFixture('');
 for(const [voice,stem,valence,option] of [['active','cochi','intransitive',''],['passive','pōhua','specific-projective','hua:pōhuī-hua']]){
  const source=r.requestClassicalVncApplicationResult({sourceStem:stem,verbClass:stem==='pōhua'?'A':'B',sourceValence:valence,objectPerson:'3sg',subject:'1sg',mood:'indicative',tense:'imperfect',requestedVoice:voice,nonactiveOptionId:option});
  assert.equal(source.authorizationStatus,'authorized',source.blockReason);
  const capture=r.captureClassicalNahuatlVncResultForPredicateNominalization(source,'instrumentive','possessive');
  assert.equal(capture.authorizationStatus,voice==='active'?'authorized':'blocked');
  if(voice==='active'){assert.equal(capture.sourceSubject,'1sg');assert.equal(capture.canonicalVncResult,source);}
 }
});
