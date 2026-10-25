import test from 'node:test';
import assert from 'node:assert/strict';
import {createPossessiveFixture} from './helpers/deverbal_possessive_fixture.mjs';

// Andrews 56.2.1.c–d explicitly retain silent inner number in these names.
// Ambiguous raw preterit families require an existing analyzed Result.
for(const [family,stem,number,surface] of [
 ['customary-present-agentive','Tla-cuī-liā-ni','Ø','Tlacuīliāni'],
 ['purposive-past-agentive','Chān-ti-⎕-c-o','Ø','Chāntico'],
 ['present-agentive','Cuāuh-tla-ht-o-a-Ø','Ø','Cuāuhtlahtoa'],
])test(`raw name collector preserves ${family} inner number`,async()=>{
 const {r,set,controls}=await createPossessiveFixture(stem);
 controls.set('classical-source-parts',{dataset:{classicalBasalUnit:'nnc'}});
 for(const [id,value]of Object.entries({
  'classical-construction-operation':'personal-name-nnc',
  'classical-personal-name-source-family':family,
  'classical-rule-logic-nnc-state':'absolutive',
  'classical-rule-logic-nnc-class':'zero',
  'classical-personal-name-affective-scope':'none',
 }))set(id,value);
 assert.equal(r.getPersonalNameNncInnerClauseFunctionalSlotDefaults(family).numberPrefix,number);
 const request=r.buildClassicalNominalConstructionUiRequest();
 const result=r.evaluatePersonalNameNnc(request);
 assert.equal(result.authorizationStatus,'authorized',result.blockReason);
 assert.equal(result.surfaceRealization,surface);
});

test('raw preterit name declarations require an exact analyzed source',async()=>{
 const {r,set,controls}=await createPossessiveFixture('M-o-tel-chīuh-Ø');
 controls.set('classical-source-parts',{dataset:{classicalBasalUnit:'nnc'}});
 set('classical-construction-operation','personal-name-nnc');
 set('classical-personal-name-affective-scope','none');
 for(const family of ['preterit-agentive','preterit-as-present-agentive','reflexive-preterit-agentive','passive-preterit-patientive','impersonal-preterit-agentive']){
  set('classical-personal-name-source-family',family);
  const request=r.buildClassicalNominalConstructionUiRequest();
  assert.equal(request.sourceFrame,null,family);
  assert.notEqual(r.evaluatePersonalNameNnc(request).authorizationStatus,'authorized',family);
 }
});
