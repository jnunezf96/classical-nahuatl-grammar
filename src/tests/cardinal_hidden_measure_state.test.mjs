import test from 'node:test';
import assert from 'node:assert/strict';
import { createPossessiveFixture } from './helpers/deverbal_possessive_fixture.mjs';

test('a stored measured composition applies only while the measure classifier is selected', async () => {
  const { r, set, controls } = await createPossessiveFixture('');
  controls.set('classical-basal-unit-controls', {dataset:{classicalBasalUnit:'nnc'}});
  for (const [id, value] of Object.entries({
    'classical-construction-operation': 'cardinal-numeral-nnc',
    'classical-cardinal-value': '2',
    'classical-cardinal-count-kind': 'gross',
    'classical-cardinal-classifier': 'basic',
    'classical-rule-logic-nnc-subject-number': 'plural',
    'classical-rule-logic-nnc-possessor': '3pl',
    'classical-cardinal-measure-composition': 'with-measured-nnc',
  })) set(id, value);
  let request = r.buildClassicalNominalConstructionUiRequest();
  assert.equal(request.measureComposition, 'measure-only');
  assert.equal(r.evaluateClassicalNahuatlNominalConstruction(request).authorizationStatus, 'authorized');
  assert.equal(controls.get('classical-cardinal-measure-composition').value, 'with-measured-nnc');

  r.getClassicalSourcePartControlState = () => ({mode:'parts',sourceWholeStem:'',sourceEmbedStem:'tlacuāl',sourceMatrixStem:'tla-māma-l'});
  for (const [id, value] of Object.entries({
    'classical-cardinal-value': '1',
    'classical-cardinal-count-kind': 'ordinary',
    'classical-cardinal-classifier': 'measure',
    'classical-cardinal-measure-class': 'tli',
    'classical-cardinal-measured-class': 'tli',
    'classical-cardinal-measure-meaning': 'amount',
    'classical-rule-logic-nnc-state': 'absolutive',
    'classical-rule-logic-nnc-subject-number': 'singular',
  })) set(id, value);
  request = r.buildClassicalNominalConstructionUiRequest();
  assert.equal(request.measureComposition, 'with-measured-nnc');
  assert.equal(r.evaluateClassicalNahuatlNominalConstruction(request).authorizationStatus, 'authorized');
});
