import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {createPossessiveFixture} from './helpers/deverbal_possessive_fixture.mjs';

test('double-nucleus ownerhood releases inherited patientive participant restrictions without accepting a Result', async () => {
  const h = await createPossessiveFixture('');
  h.set('classical-deverbal-nnc-family', 'double-nucleus-ownerhood');
  for (const [key, value] of Object.entries({
    analysis: 'fixed-order-possessor-supplementation',
    'supplement-stem': 'mich', 'supplement-class': 'in', 'supplement-subject': '3sg',
    'supplement-humanness': 'nonhuman', 'supplement-state': 'absolutive',
    'principal-stem': 'īx', 'principal-class': 'tli-1', 'principal-subject': '3common',
    'principal-humanness': 'nonhuman', 'principal-state': 'possessive', 'principal-possessor': '3sg',
  })) h.set(`classical-double-nucleus-${key}`, value);
  h.set('classical-rule-logic-nnc-state', 'absolutive');
  h.set('classical-rule-logic-nnc-subject-person', '3');
  h.set('classical-rule-logic-nnc-subject-humanness', 'nonhuman');
  const prior = Object.freeze({accepted: 'prior patientive'});
  h.r.CurrentClassicalResult = prior;
  const offers = new Map([['subject-person', ['3']], ['subject-humanness', ['nonhuman']], ['subject-number', ['common']]]);
  const source = readFileSync(new URL('../ui/rendering/rendering.mjs', import.meta.url), 'utf8');
  const start = source.indexOf('    function syncClassicalDeverbalNncControls(');
  const previewEnd = source.indexOf('      const oldPerson =', start);
  const projectionComment = source.indexOf('// Use the current owner-issued target class', previewEnd);
  const projectionStart = source.lastIndexOf('      if (active', projectionComment);
  const projectionEnd = source.indexOf('      const currentSubject =', projectionStart);
  assert(start > 0 && previewEnd > start && projectionStart > previewEnd && projectionEnd > projectionStart);
  const env = {
    targetObject: h.r, ActiveClassicalGrammarResultBinding: null, ActiveClassicalGrammarResultSourceCapture: null,
    getActiveClassicalGrammarResultBinding: () => null,
    getClassicalBasalUnitFromSurfaceForRendering: () => 'nnc', syncClassicalPendingSourceIdentity() {},
    getClassicalNominalConstructionControlValue: (id, fallback) => h.controls.get(id)?.value ?? fallback,
    buildClassicalNominalConstructionUiRequest: () => h.r.buildClassicalNominalConstructionUiRequest(),
    getClassicalPreteritAgentiveParticipantChoices: () => null,
    applyClassicalRuleLogicSelectOptionAvailability: (id, values) => offers.set(id.replace('classical-rule-logic-nnc-', ''), Array.from(values)),
  };
  vm.runInNewContext(source.slice(start, previewEnd) + source.slice(projectionStart, projectionEnd)
    + '\nreturn frame; }\nissued = syncClassicalDeverbalNncControls("deverbal-nnc");', env);
  assert.equal(env.issued?.authorizationStatus, 'authorized', 'raw double-nucleus target receives an owner preview');
  assert.deepEqual(offers.get('subject-person'), ['1', '2', '3']);
  assert(offers.get('subject-humanness').includes('human'));
  assert(offers.get('subject-number').includes('singular'));
  assert.equal(h.r.CurrentClassicalResult, prior, 'choice projection does not accept or replace the prior Result');
  assert.equal(h.controls.get('classical-double-nucleus-principal-subject').value, '3common');
  assert.equal(h.controls.get('classical-double-nucleus-supplement-subject').value, '3sg');
});
