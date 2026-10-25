import test from 'node:test';
import assert from 'node:assert/strict';
import {createPossessiveFixture} from './helpers/deverbal_possessive_fixture.mjs';
import {installClassicalNahuatlDeverbalNncGlobals} from '../core/classical/nnc_lessons35_39_closure.mjs';
test('instrumentive pair consumes genuine application parents and rejects copied or incompatible parents',async()=>{
 const {r}=await createPossessiveFixture('');const api=installClassicalNahuatlDeverbalNncGlobals(Object.create(r));
 const base={sourceStem:'cochi',verbClass:'B',sourceValence:'intransitive',subject:'3sg',mood:'indicative'};
 const a=r.requestClassicalVncApplicationResult({...base,tense:'customary-present',requestedVoice:'impersonal',nonactiveOptionId:'ō:coch-ō'});
 const b=r.requestClassicalVncApplicationResult({...base,tense:'imperfect',requestedVoice:'active'});
 assert.equal(a.authorizationStatus,'authorized',a.blockReason);assert.equal(b.authorizationStatus,'authorized',b.blockReason);
 const request={constructionKind:'predicate-nominalization',nominalizationKind:'instrumentive',canonicalVncResult:a,canonicalInstrumentiveAbsolutiveVncResult:a,canonicalInstrumentivePossessiveVncResult:b,subject:'3common',state:'absolutive',possessor:'3sg',animacy:'nonanimate'};
 for(const [state,word] of [['absolutive','cochōni'],['possessive','īcochiya']]){
  const result=api.evaluateClassicalNahuatlDeverbalNnc({...request,state});assert.equal(result.authorizationStatus,'authorized',result.blockReason);assert.equal(result.wordSurface,word);
  const pair=result.operationFrame.instrumentiveSourcePairFrame;assert.equal(pair.customaryImpersonal.canonicalVncResult,a);assert.equal(pair.imperfectActive.canonicalVncResult,b);
 }
 for(const key of ['canonicalInstrumentiveAbsolutiveVncResult','canonicalInstrumentivePossessiveVncResult'])assert.equal(api.evaluateClassicalNahuatlDeverbalNnc({...request,[key]:{...request[key]}}).authorizationStatus,'blocked');
 const other=r.requestClassicalVncApplicationResult({...base,sourceStem:'nemi',tense:'imperfect',requestedVoice:'active'});assert.equal(other.authorizationStatus,'authorized');
 assert.equal(api.evaluateClassicalNahuatlDeverbalNnc({...request,canonicalInstrumentivePossessiveVncResult:other}).authorizationStatus,'blocked');
});
