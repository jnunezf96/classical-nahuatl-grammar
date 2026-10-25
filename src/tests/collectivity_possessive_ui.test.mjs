import test from 'node:test';
import assert from 'node:assert/strict';
import { createPossessiveFixture } from './helpers/deverbal_possessive_fixture.mjs';

test('collectivity possessive endings reach the existing owner through the production collector', async () => {
  const { r, set, controls } = await createPossessiveFixture('Mē-xi-h-ca');
  controls.set('classical-basal-unit-controls', {dataset:{classicalBasalUnit:'nnc'}});
  set('classical-construction-operation', 'place-gentilic-nnc');
  set('classical-place-gentilic-result-kind', 'gentilic-collective');
  set('classical-rule-logic-nnc-possessor', '1sg');
  for (const [value, surface] of [['0','noMēxihcayo'],['uh','noMēxihcayōuh']]) {
    set('classical-gentilic-collectivity-ending', value);
    const request = r.buildClassicalNominalConstructionUiRequest();
    assert.equal(request.collectivityPossessiveVariant, value);
    const result = r.evaluatePlaceGentilicNnc(request);
    assert.equal(result.authorizationStatus, 'authorized');
    assert.equal(result.wordSurface, surface);
    assert.equal(result.formationFrame.derivedStem, 'Mē-xi-h-ca-yō');
    assert.equal(result.agreementFrame.typedSlotFrame.slots.predicate.stem, value === '0' ? 'Mē-xi-h-ca-yo' : 'Mē-xi-h-ca-yō');
  }
  set('classical-rule-logic-nnc-subject-number', 'plural');
  assert.equal(r.buildClassicalNominalConstructionUiRequest().collectivityPossessiveVariant, undefined);
  set('classical-rule-logic-nnc-subject-number', 'singular');
  set('classical-rule-logic-nnc-state', 'absolutive');
  assert.equal(r.buildClassicalNominalConstructionUiRequest().collectivityPossessiveVariant, undefined);
  set('classical-place-gentilic-result-kind', 'gentilic');
  assert.equal(r.buildClassicalNominalConstructionUiRequest().collectivityPossessiveVariant, undefined);
});


test('collectivity matrix realization follows typed number boundaries without a lexical whitelist', async () => {
  const {r} = await createPossessiveFixture('');
  const base = {constructionKind:'gentilic-collective', source:{gentilicStem:'Tōl-tē-ca'}, subject:'3sg',state:'possessive',possessor:'1sg'};
  for (const [extra, matrix] of [
    [{collectivityPossessiveVariant:'0'}, 'yo'],
    [{collectivityPossessiveVariant:'uh'}, 'yō'],
    [{collectivityPossessiveVariant:'0',singularConnector:'uh'}, 'yō'],
    [{collectivityPossessiveVariant:'0',state:'absolutive'}, 'yō'],
    [{collectivityPossessiveVariant:'0',subject:'3pl'}, 'yō'],
  ]) {
    const result=r.evaluatePlaceGentilicNnc({...base,...extra});
    assert.equal(result.authorizationStatus,'authorized');
    assert.equal(result.formationFrame.derivedStem,'Tōl-tē-ca-yō');
    assert.equal(result.agreementFrame.typedSlotFrame.slots.predicate.stem,`Tōl-tē-ca-${matrix}`);
  }
});
