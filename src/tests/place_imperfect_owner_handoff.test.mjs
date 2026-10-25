import test from 'node:test';
import assert from 'node:assert/strict';
import {createPossessiveFixture} from './helpers/deverbal_possessive_fixture.mjs';

for (const [stem,voice,option,formation] of [
  ['chōca','active','','n-imperfect-active'],
  ['panō','impersonal','hua:panō-hua','n-imperfect-nonactive'],
]) test(`place formation consumes the issued ${voice} imperfect nominalization`,async()=>{
  const {r}=await createPossessiveFixture('');
  const exact=r.requestClassicalVncApplicationResult({sourceStem:stem,verbClass:'A',sourceValence:'intransitive',subject:'3sg',mood:'indicative',tense:'imperfect',requestedDerivation:'direct',requestedVoice:voice,nonactiveOptionId:option});
  assert.equal(exact.authorizationStatus,'authorized',exact.blockReason);
  const preflight=r.resolvePlaceGentilicNncExactSource({canonicalVncResult:exact});
  assert.equal(preflight.authorizationStatus,'authorized',preflight.blockReason);
  assert.equal(preflight.canonicalVncResult,exact);
  assert.deepEqual(Array.from(preflight.availableConstructionKinds),['place-name']);
  assert.equal(r.resolvePlaceGentilicNncExactSource({canonicalVncResult:exact,constructionKind:'gentilic'}).authorizationStatus,'blocked');
  assert.match(preflight.canonicalImperfectNominalizationResult.nncSlotFrame.slots.predicate.stem,/-yā-n$/u);
  const sourceState=preflight.canonicalImperfectNominalizationResult.nncSlotFrame.slots.state;
  const stateBefore=JSON.stringify(sourceState);
  const result=r.requestClassicalPlaceGentilicResult({canonicalVncResult:exact,constructionKind:'place-name',formation});
  assert.equal(result.authorizationStatus,'authorized',result.blockReason);
  assert.equal(result.canonicalVncResult,exact);
  assert.equal(result.exactVncResultIdentityPreserved,true);
  assert.equal(JSON.stringify(sourceState),stateBefore);
  assert.equal(result.finiteFrame.typedSlotFrame.slots.state.arity,sourceState.arity);
  assert.deepEqual(result.finiteFrame.typedSlotFrame.slots.state.slots,sourceState.slots);
  for (const invalid of [{canonicalVncResult:{...exact}},{canonicalVncResult:exact,source:{embedStem:stem}}]) {
    assert.equal(r.resolvePlaceGentilicNncExactSource(invalid).authorizationStatus,'blocked');
  }
});

test('authentic place binding admits its constructor; copied bindings do not',async()=>{
  const {readFileSync}=await import('node:fs');
  const vm=await import('node:vm');
  const {r}=await createPossessiveFixture('');
  const application=r.executeClassicalGrammarApplicationRequest({operationId:'vnc:application',args:[{sourceStem:'chōca',verbClass:'A',sourceValence:'intransitive',subject:'3sg',tense:'imperfect',mood:'indicative',requestedVoice:'active'}]});
  const exact=application.canonicalResult;
  const source=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
  const start=source.indexOf('      const exactPlaceContinuation =');
  const end=source.indexOf('      const exactOwnerConstruction =',start);
  assert.ok(start>0&&end>start);
  const code=source.slice(start,end)+'\nexactPlaceContinuation';
  for(const [family,issuer] of [['formation','issueClassicalGrammarFormationResultBindingFrame']]){
    const frame=r[issuer]('nnc:place-gentilic',exact,{});
    assert.equal(frame.authorizationStatus,'authorized',frame.blockReason);
    const current={family,operationId:'nnc:place-gentilic',exactResult:exact,ownerBindingFrame:frame};
    const evaluate=()=>vm.runInNewContext(code,{targetObject:r,current,normalizedBindingId:frame.bindingIds[0],selectedOwnerBindingChoice:{exactResultIdentityRequired:true}});
    assert.equal(evaluate(),true,family);
    current.ownerBindingFrame={...frame};assert.equal(evaluate(),false,`${family} copied frame`);
    current.ownerBindingFrame=frame;current.exactResult={...exact};assert.equal(evaluate(),false,`${family} copied parent`);
  }
});
