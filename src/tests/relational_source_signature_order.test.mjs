import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';

const composer = readFileSync(new URL('../ui/composer/composer.mjs', import.meta.url), 'utf8');
const start = composer.indexOf('    function getClassicalSourcePartsEvaluationSignature(');
const end = composer.indexOf('    function hasCommittableClassicalSourceParts(', start);
assert.ok(start >= 0 && end > start);

test('relational Source signature ignores field placement but retains changed choices and object positions', () => {
  const controls = new Map([
    ['classical-nnc-source-example', 'relational:co-c-specific-location'],
    ['classical-relational-nnc-option', 'option-two'],
    ['classical-relational-nnc-source-formation', 'plain-nounstem'],
    ['classical-relational-nnc-source-kind', 'nounstem'],
    ['classical-relational-nnc-state', 'possessive'],
    ['classical-relational-nnc-possessor', '2sg'],
    ['classical-rule-logic-valence', 'specific-projective'],
    ['classical-source-object-count', '2'],
    ['classical-source-object-2-kind', 'specific-projective'],
    ['classical-source-object-2-person', '2sg'],
    ['classical-source-object-3-kind', 'nonspecific-human'],
    ['classical-source-object-3-person', ''],
    ['classical-rule-logic-object', 'specific-projective:1sg'],
  ].map(([id, value]) => [id, {id, value}]));
  let relational = Array.from(controls.values()).filter(control => control.id.startsWith('classical-relational-'));
  let unit = 'nnc';
  const context = vm.createContext({
    targetObject: {document: {
      getElementById: id => controls.get(id) || null,
      querySelectorAll: selector => {
        assert.equal(selector, '[data-classical-relational-nnc-control]');
        return relational;
      },
    }},
    getClassicalSourcePartControlState: () => ({
      mode: 'embed-matrix', sourceSelectionKind: 'embed-matrix',
      sourceWholeStem: '', sourceEmbedStem: 'nāhua', sourceMatrixStem: 'c',
      sourcePartsSource: 'fuente-user',
    }),
    getClassicalBasalUnitFromRuntime: () => unit,
    getClassicalVncSourceGuideElements: () => ({}),
    isClassicalRelationalNncUiModeEnabled: () => unit === 'nnc',
  });
  vm.runInContext(composer.slice(start, end), context);
  const signature = () => context.getClassicalSourcePartsEvaluationSignature();
  const before = signature();

  relational = [relational[3], relational[4], ...relational.slice(0, 3)];
  assert.equal(signature(), before, 'moving the same relational controls cannot create an unapplied edit');
  controls.get('classical-relational-nnc-possessor').value = '1sg';
  assert.notEqual(signature(), before, 'an actual possessor change must remain pending');
  controls.get('classical-relational-nnc-possessor').value = '2sg';
  assert.equal(signature(), before);
  assert.equal(Object.fromEntries(JSON.parse(signature()).sourceRelationalChoices)['classical-relational-nnc-possessor'], '2sg');

  unit = 'vnc';
  const objects = JSON.parse(signature()).sourceObjectSelections;
  assert.deepEqual(objects, ['2', 'specific-projective', '2sg', 'nonspecific-human', '', 'specific-projective:1sg']);
  controls.get('classical-source-object-2-kind').value = 'nonspecific-human';
  controls.get('classical-source-object-2-person').value = '';
  controls.get('classical-source-object-3-kind').value = 'specific-projective';
  controls.get('classical-source-object-3-person').value = '2sg';
  assert.notDeepEqual(JSON.parse(signature()).sourceObjectSelections, objects, 'object position remains grammatical data');
});
