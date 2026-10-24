import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createPossessiveFixture, domains, nativeOptions} from './helpers/deverbal_possessive_fixture.mjs';

const nonce = JSON.parse(readFileSync(new URL('./fixtures/nonce_deverbal_possessive_20261024.json', import.meta.url)));

async function fixture() {
  const h = await createPossessiveFixture(nonce.nouns[1]);
  h.set('classical-deverbal-nnc-family', 'patientive');
  h.set('classical-deverbal-nnc-patientive-family', 'characteristic-property');
  h.set('classical-rule-logic-nnc-subject-number', 'plural');
  return h;
}

test('native characteristic patientive keeps its classified Source independent of outer plural and possessor', async () => {
  const h = await fixture();
  for (const {value: reading} of nativeOptions('classical-deverbal-nnc-characteristic-reading')) {
    h.set('classical-deverbal-nnc-characteristic-reading', reading);
    for (const {value: possessor} of domains.possessors) {
      h.set('classical-rule-logic-nnc-possessor', possessor);
      const request = h.r.buildClassicalNominalConstructionUiRequest();
      const result = h.r.evaluateClassicalNahuatlDeverbalNnc(request);
      assert.equal(result.authorizationStatus, 'authorized', `${reading}/${possessor}: ${result.blockReason}`);
      assert.equal(h.r.isClassicalNahuatlOrdinaryNncSourceFrame(request.canonicalNncSourceFrame), true);
      assert.equal(request.canonicalNncResult, undefined);
      assert.equal(result.canonicalResult.subject, '3pl');
      assert.equal(result.canonicalResult.possessor, possessor);
      const application = {operationId: 'nnc:deverbal-construction', args: [request]};
      assert.equal(h.r.isClassicalGrammarApplicationPreview(h.r.previewClassicalGrammarApplicationRequest(application)), true);
      assert.equal(h.r.executeClassicalGrammarApplicationRequest(application).authorizationStatus, 'authorized');
      const copiedRequest = {...request, canonicalNncSourceFrame: {...request.canonicalNncSourceFrame}};
      assert.equal(h.r.evaluateClassicalNahuatlDeverbalNnc(copiedRequest).authorizationStatus, 'blocked');
      assert.equal(h.r.isClassicalGrammarApplicationPreview(h.r.previewClassicalGrammarApplicationRequest({...application, args: [copiedRequest]})), false);
      assert.throws(() => h.r.executeClassicalGrammarApplicationRequest({...application, args: [copiedRequest]}), /classical-grammar-application-request-invalid/);
    }
  }
});

test('exact characteristic patientive binding retains its parent and never replaces a copied parent with raw Source', async () => {
  const h = await fixture();
  const source = h.r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem: nonce.nouns[0], sourceClass: 'tl-1-a'});
  const operation = h.r.buildClassicalNahuatlOrdinaryNncOperationFrame(source, {
    state: 'absolutive', subject: '3sg', humanness: 'human', predicateFormation: 'source-stem',
    stemFormation: 'plain', sentenceType: 'statement', polarity: 'positive',
  });
  const parent = h.r.evaluateClassicalNahuatlOrdinaryNnc(source, operation);
  assert.equal(parent.authorizationStatus, 'authorized', parent.blockReason);
  const binding = {operationId: 'nnc:deverbal-construction', exactResult: parent, selectedBindingId: 'patientive:characteristic-property'};
  const request = h.r.buildClassicalNominalConstructionUiRequest(binding);
  assert.equal(request.canonicalNncResult, parent);
  assert.equal(request.canonicalNncSourceFrame, undefined);
  assert.equal(h.r.evaluateClassicalNahuatlDeverbalNnc(request).authorizationStatus, 'authorized');
  const copied = h.r.buildClassicalNominalConstructionUiRequest({...binding, exactResult: {...parent}});
  assert.equal(copied.canonicalNncSourceFrame, undefined);
  assert.equal(h.r.evaluateClassicalNahuatlDeverbalNnc(copied).authorizationStatus, 'blocked');
});
