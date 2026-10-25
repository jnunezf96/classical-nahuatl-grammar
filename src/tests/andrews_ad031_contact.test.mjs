import test from 'node:test';
import assert from 'node:assert/strict';
import { createRuntimeInstance } from '../runtime/create_runtime.mjs';
import { createClassicalClauseRelationControllerGlobals } from '../application/classical/clause_relation_controller.mjs';

const documentObject = {
  getElementById: () => null,
  querySelectorAll: () => [],
  querySelector: () => null,
  addEventListener() {},
  documentElement: { lang: 'en' },
  body: null,
};
const runtime = (await createRuntimeInstance({ documentObject })).runtimeObject;

function execute(operationId, args) {
  const result = runtime.executeClassicalGrammarApplicationRequest({ operationId, args });
  assert.equal(result.authorizationStatus, 'authorized', result.blockReason);
  return result.canonicalResult;
}

function noun() {
  const source = runtime.buildClassicalNahuatlOrdinaryNncSourceFrame({ stem: 'pil', sourceClass: 'tli-1' });
  const operation = runtime.buildClassicalNahuatlOrdinaryNncOperationFrame(source, { state: 'absolutive', subject: '3sg' });
  return execute('nnc:ordinary', [source, operation]);
}

function verb(options = {}) {
  return execute('vnc:application', [{
    sourceStem: 'itta', verbClass: 'A', sourceValence: 'specific-projective',
    subject: '1sg', objectKind: 'specific-projective', objectPerson: '3sg',
    sourceInitialISelection: 'real', mood: 'indicative', tense: 'present',
    requestedDerivation: 'direct', requestedVoice: 'active', ...options,
  }]);
}

function harness(supplement) {
  const principal = noun();
  const target = Object.create(runtime);
  const executionRequests = [];
  Object.defineProperty(target, 'executeClassicalGrammarApplicationRequest', {
    value(request) {
      executionRequests.push(request);
      return runtime.executeClassicalGrammarApplicationRequest(request);
    },
  });
  Object.defineProperties(target, Object.getOwnPropertyDescriptors(createClassicalClauseRelationControllerGlobals(target)));
  const controller = target.createClassicalClauseRelationController();
  assert.equal(controller.captureCurrentResult('principal', principal).authorizationStatus, 'authorized');
  assert.equal(controller.captureCurrentResult('adjoined', supplement).authorizationStatus, 'authorized');
  return { controller, principal, supplement, executionRequests };
}

const selection = contact => ({
  relation: 'supplementation', supplementationReferenceMode: 'shared',
  supplementationHeadRole: 'subject', supplementationContactRole: contact,
  supplementationOrder: 'principal-first',
});

function authorized(result) {
  assert.equal(result.authorizationStatus, 'authorized', result.blockReason);
  return result.canonicalResult;
}

// Andrews §17.4.4 and §42.8.2: contact selects a pronoun referent, not
// every participant in the transitive supplementary clause.
test('AD-031 object contact preserves its distinct first-person supplementary subject', () => {
  const { controller } = harness(verb());
  const contract = controller.buildDecisionContract(selection('object'));
  assert.deepEqual(contract.decisions.find(d => d.id === 'supplementation-contact-role').values, ['subject', 'object']);
  const result = controller.compose(selection('object'));
  const frame = authorized(result);
  const head = frame.referenceFrame.principalHead;
  const subject = frame.supplementClause.subject;
  const object = frame.supplementClause.objects[0];
  assert.equal(head.category, '3sg');
  assert.equal(subject.category, '1sg');
  assert.equal(object.category, '3sg');
  assert.equal(frame.referenceFrame.supplementContactRole, 'object');
  assert.equal(head.referenceId, object.referenceId);
  assert.notEqual(subject.referenceId, object.referenceId, 'selecting the third-person object must not identify it with the first-person subject');
  assert.equal(result.presentation.surface, 'Pilli niquitta.');
});

test('AD-031 subject contact preserves its distinct first-person object', () => {
  const { controller } = harness(verb({ subject: '3sg', objectPerson: '1sg' }));
  const frame = authorized(controller.compose(selection('subject')));
  assert.equal(frame.referenceFrame.supplementContactRole, 'subject');
  assert.equal(frame.supplementClause.subject.category, '3sg');
  assert.equal(frame.supplementClause.objects[0].category, '1sg');
  assert.equal(frame.referenceFrame.principalHead.referenceId, frame.supplementClause.subject.referenceId);
  assert.notEqual(frame.supplementClause.subject.referenceId, frame.supplementClause.objects[0].referenceId);
});

test('AD-031 absent object is unavailable and cannot be composed', () => {
  const { controller, executionRequests } = harness(verb({
    sourceStem: 'cuīca', sourceValence: 'intransitive', subject: '3sg',
    objectKind: 'none', objectPerson: '', sourceInitialISelection: '',
  }));
  const contract = controller.buildDecisionContract(selection('object'));
  assert.equal(contract.decisions.find(d => d.id === 'supplementation-contact-role')?.values.includes('object') || false, false);
  const result = controller.compose(selection('object'));
  assert.equal(result.authorizationStatus, 'blocked');
  assert.equal(result.blockReason, 'classical-supplementation-supplementationContactRole-not-licensed');
  assert.equal(executionRequests.length, 0);
});

test('AD-031 staging and preview preserve exact captured parents and the accepted result until explicit composition', () => {
  const { controller, principal, supplement, executionRequests } = harness(verb({ subject: '3sg' }));
  const accepted = authorized(controller.compose(selection('subject')));
  const acceptedSnapshot = JSON.stringify(accepted);
  assert.equal(executionRequests.length, 1);
  const contract = controller.buildDecisionContract(selection('object'));
  assert.equal(contract.authorizationStatus, 'authorized');
  assert.equal(executionRequests.length, 1, 'selection alone must not execute');
  const preview = controller.preview(selection('object'));
  assert.ok(preview);
  assert.equal(preview.isCurrent(), true);
  assert.equal(executionRequests.length, 1, 'preview must not execute the accepted-result path');
  assert.strictEqual(controller.getCapturedCanonicalResult('principal'), principal);
  assert.strictEqual(controller.getCapturedCanonicalResult('adjoined'), supplement);
  assert.equal(JSON.stringify(accepted), acceptedSnapshot);
  const previewFrame = preview.canonicalResult;
  assert.equal(previewFrame.referenceFrame.principalHead.referenceId, previewFrame.supplementClause.objects[0].referenceId);
  assert.notEqual(previewFrame.supplementClause.subject.referenceId, previewFrame.supplementClause.objects[0].referenceId);
  const made = authorized(controller.compose(selection('object')));
  assert.equal(executionRequests.length, 2);
  for (const request of executionRequests) {
    assert.equal(request.operationId, 'sentence:supplementation');
    assert.deepEqual(request.args.slice(1), [principal, supplement]);
    assert.strictEqual(request.args[1], principal);
    assert.strictEqual(request.args[2], supplement);
  }
  assert.notStrictEqual(made, accepted);
  assert.equal(made.referenceFrame.supplementContactRole, 'object');
  assert.equal(JSON.stringify(accepted), acceptedSnapshot);
  assert.equal(controller.captureCurrentResult('adjoined', structuredClone(supplement)).authorizationStatus, 'blocked');
  assert.strictEqual(controller.getCapturedCanonicalResult('adjoined'), supplement);
});
