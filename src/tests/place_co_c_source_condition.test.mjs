import test from 'node:test';
import assert from 'node:assert/strict';
import {createPossessiveFixture} from './helpers/deverbal_possessive_fixture.mjs';

test('place co/c obeys the source-final segment and the fire exception across exact and typed sources',async()=>{
  const {r}=await createPossessiveFixture('');
  const source=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:'xōchi',sourceClass:'tl-1-a'});
  const operation=r.buildClassicalNahuatlOrdinaryNncOperationFrame(source,{state:'absolutive',subject:'3common'});
  const noun=r.requestClassicalOrdinaryNncResult(source,operation);
  assert.equal(noun.authorizationStatus,'authorized',noun.blockReason);
  const request={canonicalNncResult:noun,constructionKind:'place-name',usage:'adverbial'};
  assert.equal(r.requestClassicalPlaceGentilicResult({...request,formation:'co'}).authorizationStatus,'blocked');
  assert.equal(r.resolvePlaceGentilicNncExactSource({...request,formation:'co'}).authorizationStatus,'blocked');
  const result=r.requestClassicalPlaceGentilicResult({...request,formation:'c'});
  assert.equal(result.authorizationStatus,'authorized',result.blockReason);
  assert.equal(result.wordSurface,'xōchic');
  assert.equal(result.canonicalNncResult,noun);
  for(const bad of [{...request,canonicalNncResult:{...noun}}, {...request,source:{embedStem:'Tlach'}}]) {
    assert.equal(r.resolvePlaceGentilicNncExactSource({...bad,formation:'c'}).authorizationStatus,'blocked');
    let rejected=false;
    try { rejected=r.requestClassicalPlaceGentilicResult({...bad,formation:'c'}).authorizationStatus==='blocked'; }
    catch(error) { rejected=/classical-grammar-application-request-invalid:forbidden-authority/.test(error.message); }
    assert.equal(rejected,true);
  }
  for(const [embed,good,bad,surface] of [['Tlach','co','c','Tlachco'],['xōchi','c','co','xōchic'],['tle','co','c','tleco'],['xōchi-Ø','c','co','xōchic']]) {
    assert.deepEqual(Array.from(r.getPlaceGentilicNncCoCFormationOptions(embed)),[good]);
    const q={constructionKind:'place-name',source:{embedStem:embed},usage:'adverbial'};
    const made=r.requestClassicalPlaceGentilicResult({...q,formation:good});
    assert.equal(made.authorizationStatus,'authorized',made.blockReason);
    assert.equal(made.wordSurface,surface);
    assert.equal(r.requestClassicalPlaceGentilicResult({...q,formation:bad}).authorizationStatus,'blocked');
  }
  const affective=r.requestClassicalPlaceGentilicResult({constructionKind:'place-name',formation:'co-affective-embed',source:{embedStem:'Tōl-tzin'},usage:'adverbial'});
  assert.equal(affective.authorizationStatus,'authorized',affective.blockReason);
  assert.equal(affective.wordSurface,'Tōltzinco');
});
