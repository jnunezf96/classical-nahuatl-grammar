import assert from 'node:assert/strict';
import test from 'node:test';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import {
  exportClassicalResultReloadRecipe,
  replayClassicalResultReloadRecipe,
} from '../application/classical/result_reload.mjs';

const makeRuntime = async () => (
  await createRuntimeInstance({
    documentObject: {getElementById: () => null, addEventListener() {}},
  })
).runtimeObject;

test('reload reissues VNC application and sentence roots with three-object history', async () => {
  const runtime = await makeRuntime();
  let application = runtime.executeClassicalGrammarApplicationRequest({
    operationId: 'vnc:application',
    args: [{
      sourceStem: 'cochi',
      verbClass: 'B',
      sourceValence: 'intransitive',
      sourceSubject: '3sg',
      subject: '1sg',
      mood: 'indicative',
      tense: 'present',
      derivationType: 'causative',
      causativeObjectKind: 'specific-projective',
      derivationOptionId: 'causative:type-two:hua:cochī-hua',
    }],
  });
  let source = application.canonicalResult;

  for (const [applicativeObjectKind, applicativeObjectPerson] of [
    ['specific-projective', '3sg'],
    ['nonspecific-human', ''],
  ]) {
    const binding = runtime.issueClassicalNahuatlVncContinuationBindingFrame(
      'vnc:application',
      source,
      {
        subject: '1sg',
        mood: 'indicative',
        tense: 'present',
        requestedVoice: 'active',
        requestedDerivation: 'applicative',
        applicativeObjectKind,
        applicativeObjectPerson,
      },
    );
    assert.equal(binding.bindingStatus, 'ready');
    application = runtime.executeClassicalGrammarApplicationRequest({
      operationId: 'vnc:application',
      args: [...binding.executionArgs],
    });
    assert.equal(application.authorizationStatus, 'authorized');
    source = application.canonicalResult;
  }

  const sentence = runtime.requestClassicalVncSentenceResultFrame(source);
  const recipe = exportClassicalResultReloadRecipe(runtime, {
    result: sentence,
    source,
  });
  assert.ok(recipe);

  const fresh = await makeRuntime();
  const roots = replayClassicalResultReloadRecipe(
    fresh,
    JSON.parse(JSON.stringify(recipe)),
  );
  assert.equal(fresh.isClassicalNahuatlVncSentenceResultFrame(roots.result), true);
  assert.equal(fresh.isClassicalNahuatlVncApplicationFrame(roots.source), true);
  assert.equal(
    fresh.isClassicalGrammarApplicationResultCapture(
      fresh.captureClassicalGrammarApplicationResult(roots.result, 'reload-inputs'),
      'reload-inputs',
    ),
    true,
  );
  assert.equal(
    fresh.isClassicalGrammarApplicationResultCapture(
      fresh.captureClassicalGrammarApplicationResult(roots.source, 'reload-inputs'),
      'reload-inputs',
    ),
    true,
  );
  assert.equal(roots.result.sentenceSurfaceDisplay, 'Nictēcochītililia');
  assert.equal(roots.source.resultFrame.surfaceRealization, 'nictēcochītililia');
  assert.equal(
    fresh.getClassicalNahuatlVncContinuationSourceConstituents(
      roots.result.vncApplicationFrame.resultFrame,
    ).sourceObjectRequests.length,
    3,
  );
  assert.equal(
    fresh.getClassicalNahuatlVncContinuationSourceConstituents(
      roots.source.resultFrame,
    ).sourceObjectRequests.length,
    3,
  );
  assert.notEqual(roots.result, sentence);
  assert.notEqual(roots.source, source);
});

test('reload reissues the sibling NNC adverbial route instead of retaining its old frame', async () => {
  const runtime = await makeRuntime();
  const sourceFrame = runtime.buildClassicalNahuatlOrdinaryNncSourceFrame({
    stem: 'mō',
    sourceClass: 'zero',
  });
  const noun = runtime.requestClassicalOrdinaryNncResult(
    sourceFrame,
    runtime.buildClassicalNahuatlOrdinaryNncOperationFrame(sourceFrame, {
      subject: '3common',
      state: 'absolutive',
    }),
  );
  const adverbial = runtime.requestClassicalAdverbialNncResult({
    canonicalSourceResult: noun,
    context: {negativeParticle: 'ah'},
  });
  const recipe = exportClassicalResultReloadRecipe(runtime, {
    result: adverbial,
    source: noun,
  });
  assert.ok(recipe);

  const fresh = await makeRuntime();
  const roots = replayClassicalResultReloadRecipe(
    fresh,
    JSON.parse(JSON.stringify(recipe)),
  );
  assert.equal(fresh.isClassicalNahuatlAdverbialNuclearResult(roots.result), true);
  assert.equal(fresh.isClassicalNahuatlOrdinaryNncResult(roots.source), true);
  assert.equal(roots.result.authorizationStatus, 'authorized');
  assert.equal(roots.source.authorizationStatus, 'authorized');
  assert.equal(roots.result.canonicalSourceResult, roots.source);
  assert.equal(roots.result.scope, 'external-clause');
  assert.equal(roots.result.operationFrame.contextFrame.negativeParticle, 'ah');
  assert.equal(roots.result.operationFrame.contextFrame.realizedSurface, 'ahmō');
  assert.equal(
    fresh.isClassicalGrammarApplicationResultCapture(
      fresh.captureClassicalGrammarApplicationResult(roots.result, 'reload-inputs'),
      'reload-inputs',
    ),
    true,
  );
  assert.notEqual(roots.result, adverbial);
  assert.notEqual(roots.source, noun);
});
