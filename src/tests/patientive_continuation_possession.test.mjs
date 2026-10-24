import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createPossessiveFixture, domains} from './helpers/deverbal_possessive_fixture.mjs';

const nonce = JSON.parse(readFileSync(new URL('./fixtures/nonce_deverbal_possessive_20261024.json', import.meta.url)));

async function fixture(family) {
  const h = await createPossessiveFixture(nonce.verb);
  const option = h.r.getClassicalNahuatlNonactiveStemOptions(nonce.verb, {
    verbClass: 'B', sourceValence: 'specific-projective',
  }).options.find(o => o.suffixFamily === 'lō');
  assert(option, 'the fresh Source supplies an actual nonactive option');
  const source = h.r.evaluateClassicalNahuatlVncApplication({
    sourceStem: nonce.verb, verbClass: 'B', sourceValence: 'specific-projective',
    subject: '3sg', objectKind: 'specific-projective', objectPerson: '3sg',
    mood: 'indicative', tense: 'present', requestedDerivation: 'direct',
    requestedVoice: 'passive', nonactiveOptionId: option.optionId,
  });
  assert.equal(source.authorizationStatus, 'authorized', source.blockReason);
  const parent = h.r.evaluateClassicalNahuatlDeverbalNnc({
    constructionKind: 'patientive', patientiveSourceFamily: 'passive-core',
    canonicalVncResult: source.resultFrame, subject: '3common',
    state: 'absolutive', animacy: 'nonanimate',
  });
  assert.equal(parent.authorizationStatus, 'authorized', parent.blockReason);
  const ownerBindingFrame = h.r.issueClassicalNahuatlFormationResultBindingFrame('nnc:deverbal-construction', parent);
  assert(ownerBindingFrame.bindingIds.includes('continuation:patientive-nnc'));
  const binding = {operationId: 'nnc:deverbal-construction', exactResult: parent,
    ownerBindingFrame, selectedBindingId: 'continuation:patientive-nnc'};
  h.set('classical-deverbal-nnc-family', family);
  if (family === 'patientive-embed-continuation') {
    h.set('classical-deverbal-nnc-patientive-embed-target', 'nnc');
    h.set('classical-deverbal-nnc-patientive-embed-matrix-stem', nonce.nouns[2]);
    h.set('classical-deverbal-nnc-patientive-embed-matrix-noun-class', 'tl-1-a');
    h.set('classical-deverbal-nnc-patientive-embed-relation', 'material');
  } else {
    h.set('classical-deverbal-nnc-patientive-matrix-embed-stem', nonce.nouns[2]);
    h.set('classical-deverbal-nnc-patientive-matrix-embed-class', 'tl-1-a');
    h.set('classical-deverbal-nnc-patientive-matrix-relation', 'purpose');
  }
  return {...h, parent, binding};
}

for (const family of ['patientive-embed-continuation', 'patientive-matrix-continuation']) {
  test(`native ${family} preserves all nine nominal possessors at both outer numbers`, async () => {
    const h = await fixture(family);
    const acceptedSurface = h.parent.wordSurface;
    for (const number of ['singular', 'plural']) {
      h.set('classical-rule-logic-nnc-subject-number', number);
      for (const {value: possessor} of domains.possessors) {
        h.set('classical-rule-logic-nnc-possessor', possessor);
        const request = h.r.buildClassicalNominalConstructionUiRequest(h.binding);
        const sourceKey = request.canonicalPatientiveNncGrammarFrame
          ? 'canonicalPatientiveNncGrammarFrame' : 'canonicalPatientiveNncResult';
        assert(request[sourceKey] === h.parent, 'native continuation retains its exact patientive parent');
        const actual = h.r.evaluateClassicalNahuatlDeverbalNnc(request);
        assert.equal(actual.authorizationStatus, 'authorized', actual.blockReason);
        // The established nominal compound owner defines this possessor
        // domain; a finite VNC Subject normalizer must not narrow it.
        const direct = h.r.evaluateClassicalNahuatlNominalConstruction({
          constructionKind: 'compound-nnc',
          source: {embedStem: nonce.nouns[0], embedClass: 'tl', embedSourceClass: 'tl-1-a',
            matrixStem: nonce.nouns[2], matrixClass: 'tl', matrixSourceClass: 'tl-1-a'},
          structure: 'integrated', embedRole: 'material', possessorOrientation: 'matrix',
          subject: number === 'plural' ? '3pl' : '3sg', state: 'possessive', possessor, animacy: 'animate',
        });
        assert.equal(direct.authorizationStatus, 'authorized', direct.blockReason);
        assert.equal(direct.operationFrame.possessor, possessor);
        assert.equal(actual.canonicalResult.operationFrame.possessor, direct.operationFrame.possessor, `${number}/${possessor}`);
        assert.equal(actual.canonicalResult.operationFrame.subject, number === 'plural' ? '3pl' : '3sg');
        const application = {operationId: 'nnc:deverbal-construction', args: [request]};
        assert.equal(h.r.isClassicalGrammarApplicationPreview(h.r.previewClassicalGrammarApplicationRequest(application)), true);
        assert.equal(h.parent.wordSurface, acceptedSurface, 'preview preserves the exact accepted Source');
        const made = h.r.executeClassicalGrammarApplicationRequest(application);
        assert.equal(made.authorizationStatus, 'authorized', made.blockReason);
        assert.equal(made.canonicalResult.canonicalResult.operationFrame.possessor, possessor);
        const copied = {...request, [sourceKey]: {...h.parent}};
        assert.equal(h.r.evaluateClassicalNahuatlDeverbalNnc(copied).authorizationStatus, 'blocked');
        assert.equal(h.r.isClassicalGrammarApplicationPreview(h.r.previewClassicalGrammarApplicationRequest({...application, args: [copied]})), false);
        assert.throws(() => h.r.executeClassicalGrammarApplicationRequest({...application, args: [copied]}), /classical-grammar-application-request-invalid/);
      }
    }
  });
}
