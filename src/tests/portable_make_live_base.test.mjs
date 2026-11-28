import assert from 'node:assert/strict';
import test from 'node:test';
import {createPortableMake} from '../application/classical/portable_make.mjs';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';

async function boot() {
  const {runtimeObject: runtime} = await createRuntimeInstance({
    documentObject: {getElementById: () => null, addEventListener() {}},
  });
  return createPortableMake((request, prepared) =>
    runtime.executeClassicalGrammarApplicationRequest(request, prepared));
}

test('the v1.2.178 engine executes and replays a shared forward request with its exact earlier Result', async () => {
  const sender = await boot();
  const finite = sender.make({operationId: 'vnc:application', args: [{
    sourceStem: 'nemi', verbClass: 'B', sourceValence: 'intransitive',
    subject: '1sg', mood: 'indicative', tense: 'present',
  }]}).canonicalResult;
  const sentence = sender.make({operationId: 'vnc:sentence-result', args: [finite]}).canonicalResult;
  const sent = sender.requestFor(sentence);
  assert.deepEqual(sent.dependencies, [finite]);
  const recipient = await boot();
  const reopened = recipient.open(sender.addressFor(sentence)).canonicalResult;
  const received = recipient.requestFor(reopened);
  assert.equal(received.serialized, sent.serialized);
  assert.ok(received.dependencies[0] === reopened.canonicalSourceFrame);
  assert.equal(reopened.sentenceSurfaceDisplay, sentence.sentenceSurfaceDisplay);
  assert.equal(reopened.sentenceFormulaDisplay, sentence.sentenceFormulaDisplay);
});

test('the live-base construction packet uses the same portable engine for typed and direct Make', async () => {
  const {executeConstructionPacket} = await import('../ui/composition/construction_packet.mjs');
  const bootPreview = async () => (await createRuntimeInstance({
    portableMakeEnabled: true,
    documentObject: {getElementById: () => null, addEventListener() {}},
  })).runtimeObject;
  const runtime = await bootPreview();
  const make = runtime.classicalPortableMake;
  const source = runtime.buildClassicalNahuatlOrdinaryNncSourceFrame({stem: 'pil', sourceClass: 'tli-1'});
  const binding = runtime.issueClassicalGrammarTypedSourceOperationBindingFrame(
    runtime.getClassicalGrammarApplicationCapabilityNavigator(source),
    'nnc:ordinary', {subject: '3sg', state: 'absolutive'},
  );
  assert.equal(binding?.bindingStatus, 'ready', binding?.blockReason);
  const noun = executeConstructionPacket(runtime, {kind: 'typed', source, binding})?.canonicalResult;
  assert.ok(noun);
  assert.ok(noun.sourceFrame === source);
  const rawSource = runtime.buildClassicalNahuatlOrdinaryNncSourceFrame({stem: 'pil', sourceClass: 'tli-1'});
  const rawOperation = runtime.buildClassicalNahuatlOrdinaryNncOperationFrame(rawSource, {
    subject: '3sg', state: 'absolutive',
  });
  const rawNoun = executeConstructionPacket(runtime, {
    kind: 'request', operation: 'nnc:ordinary', source: rawSource,
    request: {operationId: 'nnc:ordinary', args: [rawSource, rawOperation]},
  })?.canonicalResult;
  assert.ok(rawNoun);
  assert.equal(rawNoun.sourceFrame, rawSource);
  const finite = executeConstructionPacket(runtime, {kind: 'request', operation: 'vnc:application',
    request: {operationId: 'vnc:application', args: [{
      sourceStem: 'nemi', verbClass: 'B', sourceValence: 'intransitive',
      subject: '1sg', mood: 'indicative', tense: 'present',
    }]}})?.canonicalResult;
  assert.ok(finite);
  const particleBinding = runtime.issueClassicalGrammarTypedSourceOperationBindingFrame(
    runtime.getClassicalGrammarApplicationCapabilityNavigator(finite), 'particle:result', {particleId: 'l3-in'},
  );
  assert.equal(particleBinding?.bindingStatus, 'ready');
  const particle = make.make({typedBinding: particleBinding})?.canonicalResult;
  assert.ok(particle);
  assert.deepEqual(make.requestFor(particle).dependencies, []);
  const fresh = await bootPreview();
  for (const result of [noun, rawNoun, finite, particle]) {
    const sent = make.requestFor(result);
    const reopened = fresh.classicalPortableMake.open(make.addressFor(result))?.canonicalResult;
    assert.ok(reopened);
    assert.equal(fresh.classicalPortableMake.requestFor(reopened).serialized, sent.serialized);
  }
});

test('a prepared Make shares the exact prepared request and keeps its local Result identity', async () => {
  const bootPreview = async () => (await createRuntimeInstance({
    portableMakeEnabled: true,
    documentObject: {getElementById: () => null, addEventListener() {}},
  })).runtimeObject;
  const runtime = await bootPreview();
  const make = runtime.classicalPortableMake;
  const preparation = runtime.prepareClassicalGrammarApplicationRequest({
    operationId: 'vnc:derivational-operation',
    args: [{sourceStem: 'layōuhcuitla', verbClass: 'A', sourceValence: 'intransitive',
      objectKind: 'none', subject: '2sg', mood: 'indicative', tense: 'present',
      voice: 'active', derivationType: 'direct', lateOperation: 'honorific', lateVariant: 'causative',
      honoredParticipant: 'subject', honorificDerivationOptionId: 'causative:type-one:final-a-replacement:layōuhcuitla'}],
  });
  assert.ok(preparation);
  assert.equal(make.make({...preparation.request}, preparation), null);
  const result = make.make(preparation.request, preparation)?.canonicalResult;
  assert.ok(result);
  assert.ok(result === preparation.canonicalResult);
  const sent = make.requestFor(result);
  assert.match(sent.serialized, /prepared-application/);
  const fresh = await bootPreview();
  const reopened = fresh.classicalPortableMake.open(make.addressFor(result))?.canonicalResult;
  assert.ok(reopened);
  assert.equal(fresh.classicalPortableMake.requestFor(reopened).serialized, sent.serialized);
  assert.equal(reopened.surfaceRealization, result.surfaceRealization);
  assert.equal(reopened.formulaRealization, result.formulaRealization);
});

test('the clause controller shares its prepared request and ordered Source roles', async () => {
  const bootPreview = async () => (await createRuntimeInstance({
    portableMakeEnabled: true,
    documentObject: {getElementById: () => null, addEventListener() {}},
  })).runtimeObject;
  const runtime = await bootPreview();
  const make = runtime.classicalPortableMake;
  const finite = sourceStem => make.make({operationId: 'vnc:application', args: [{
    sourceStem, verbClass: 'B', sourceValence: 'intransitive',
    subject: '3sg', mood: 'indicative', tense: 'present',
  }]})?.canonicalResult;
  const principal = finite('nemi');
  const adjunct = finite('cochi');
  assert.ok(principal && adjunct);
  const controller = runtime.createClassicalClauseRelationController();
  assert.equal(controller.captureCurrentResult('principal', principal).authorizationStatus, 'authorized');
  assert.equal(controller.captureCurrentResult('adjoined', adjunct).authorizationStatus, 'authorized');
  const composed = controller.compose({
    relation: 'supplementation', supplementationReferenceMode: 'shared',
    supplementationOrder: 'principal-first', supplementationHeadRole: 'subject', supplementationContactRole: 'subject',
  });
  assert.equal(composed?.authorizationStatus, 'authorized', composed?.blockReason);
  const result = composed.canonicalResult;
  const sent = make.requestFor(result);
  assert.match(sent?.serialized, /sentence:supplementation-envelope/);
  assert.deepEqual(sent.dependencies, [principal, adjunct]);
  const fresh = await bootPreview();
  const reopened = fresh.classicalPortableMake.open(make.addressFor(result))?.canonicalResult;
  assert.ok(reopened);
  const received = fresh.classicalPortableMake.requestFor(reopened);
  assert.equal(received.serialized, sent.serialized);
  assert.ok(fresh.getClassicalNahuatlSupplementationClauseSourceFrame(reopened.principalClause) === received.dependencies[0]);
  assert.ok(fresh.getClassicalNahuatlSupplementationClauseSourceFrame(reopened.supplementClause) === received.dependencies[1]);

  const {getResultEditReorder} = await import('../ui/composition/result_edit_rebuild.mjs');
  const {executeConstructionPacket} = await import('../ui/composition/construction_packet.mjs');
  const reorder = getResultEditReorder(runtime, result);
  assert.ok(reorder);
  const order = 'supplement-first';
  const reordered = executeConstructionPacket(runtime, {
    kind: 'result-edit', operation: 'sentence:supplementation',
    edit: {action: 'reorder', root: result, target: result, path: [], reorder, order},
    inner: {kind: 'clause', operation: 'sentence:supplementation', controller: reorder.controller,
      captures: reorder.captures, choices: {...reorder.choices, supplementationOrder: order}},
  })?.canonicalResult;
  assert.ok(reordered);
  assert.notEqual(reordered.surfaceRealization, result.surfaceRealization);
  const orderRequest = make.requestFor(reordered);
  assert.match(orderRequest.serialized, /supplement-first/);
  assert.deepEqual(orderRequest.dependencies, [principal, adjunct]);
  const reopenedOrder = fresh.classicalPortableMake.open(make.addressFor(reordered))?.canonicalResult;
  assert.ok(reopenedOrder);
  assert.equal(reopenedOrder.surfaceRealization, reordered.surfaceRealization);
  assert.equal(fresh.classicalPortableMake.requestFor(reopenedOrder).serialized, orderRequest.serialized);

  const replacement = finite('nemi');
  assert.ok(replacement);
  const edit = runtime.buildClassicalNahuatlSupplementationReplacementRequest(result, 'adjoined', replacement);
  assert.ok(edit);
  const changed = make.make({operationId: 'sentence:supplementation', args: [edit]})?.canonicalResult;
  assert.ok(changed);
  const changedRequest = make.requestFor(changed);
  assert.deepEqual(changedRequest.dependencies, [result, replacement]);
  assert.match(changedRequest.serialized, /sentence:supplementation-replacement/);
  const replayedEdit = fresh.classicalPortableMake.open(make.addressFor(changed))?.canonicalResult;
  assert.ok(replayedEdit);
  const replayedRequest = fresh.classicalPortableMake.requestFor(replayedEdit);
  assert.equal(replayedRequest.serialized, changedRequest.serialized);
  assert.equal(fresh.getClassicalNahuatlSupplementationClauseSourceFrame(replayedEdit.supplementClause),
    replayedRequest.dependencies[1]);
});

test('the live-base typed Make contract reissues attested and quantitative Sources as a group', async () => {
  const bootPreview = async () => (await createRuntimeInstance({
    portableMakeEnabled: true,
    documentObject: {getElementById: () => null, addEventListener() {}},
  })).runtimeObject;
  const r = await bootPreview();
  const fresh = await bootPreview();
  const cases = [
    ['nnc:quantitative-predicate', r.buildClassicalNahuatlQuantitativePredicateSourceFrame({
      citation: 'miec', sourceUse: 'quantitative-predicate', reference: 'nonanimate-common',
    }), {}],
    ['nnc:attested-cell', r.resolveClassicalNahuatlAttestedNncCellSourceFrame({
      enteredStem: 'icn-īuh', sourceUse: 'attested-cell',
    }), {possessor: '1sg'}],
    ['nnc:attested-place', r.resolveClassicalNahuatlAttestedPlaceSourceFrame({
      enteredStem: 'Teticpac', sourceUse: 'attested-place',
    }), {}],
    ['clause:attested-collocation', r.resolveClassicalNahuatlAttestedPrincipalCollocationSourceFrame({
      enteredStem: 'achi īc', sourceUse: 'attested-collocation',
    }), {}],
  ];
  for (const [operation, source, choices] of cases) {
    const typedBinding = r.issueClassicalGrammarTypedSourceOperationBindingFrame(
      r.getClassicalGrammarApplicationCapabilityNavigator(source), operation, choices,
    );
    assert.equal(typedBinding?.bindingStatus, 'ready', operation);
    const made = r.classicalPortableMake.make({typedBinding})?.canonicalResult;
    assert.ok(made, operation);
    const reopened = fresh.classicalPortableMake.open(r.classicalPortableMake.addressFor(made))?.canonicalResult;
    assert.ok(reopened, operation);
    assert.equal(fresh.classicalPortableMake.requestFor(reopened).serialized,
      r.classicalPortableMake.requestFor(made).serialized);
    assert.equal(reopened.formulaRealization, made.formulaRealization);
  }
});

test('ported Source families reissue nested names and bound or rank-corrected nominal verbs', async () => {
  const bootPreview = async () => (await createRuntimeInstance({
    portableMakeEnabled: true,
    documentObject: {getElementById: () => null, addEventListener() {}},
  })).runtimeObject;
  const r = await bootPreview();
  const recipient = await bootPreview();
  const inner = r.buildPersonalNameInnerClauseFrame({sourceFamily: 'absolutive-state-nnc',
    predicateMorphs: ['cihuā'], subjectPrefix: '0', subjectConnector: '0', numberPrefix: 'tl', numberSuffix: '0'});
  const name = r.buildPersonalNameNncSourceFrame({sourceFamily: 'absolutive-state-nnc', clauses: [inner]});
  const nominal = r.resolveClassicalNahuatlNominalRankCorrectedSourceFrame({enteredStem: 'yaca', valence: 'intransitive'});
  const typedBinding = r.issueClassicalGrammarTypedSourceOperationBindingFrame(
    r.getClassicalGrammarApplicationCapabilityNavigator(nominal), 'vnc:denominal',
    {pathChoiceId: 'nounstem|inceptive-ti:B', subject: '3sg', mood: 'indicative', tense: 'present'},
  );
  const requests = [
    [{operationId: 'nnc:personal-name', args: [{sourceFrame: name, outerSubject: '2sg'}]}, 'nnc:personal-name-inner-clause'],
    [{typedBinding}, 'vnc:nominal-rank-corrected-source'],
  ];
  for (const [request, issuer] of requests) {
    const result = r.classicalPortableMake.make(request)?.canonicalResult;
    assert.ok(result, issuer);
    const sent = r.classicalPortableMake.requestFor(result);
    assert.ok(sent.serialized.includes(issuer));
    const opened = recipient.classicalPortableMake.open(r.classicalPortableMake.addressFor(result))?.canonicalResult;
    assert.ok(opened);
    assert.equal(recipient.classicalPortableMake.requestFor(opened).serialized, sent.serialized);
    assert.equal(opened.formulaRealization, result.formulaRealization);
  }
});

test('the nominal operation and accepted slot reissue through one forward chain', async () => {
  const bootPreview = async () => (await createRuntimeInstance({
    portableMakeEnabled: true,
    documentObject: {getElementById: () => null, addEventListener() {}},
  })).runtimeObject;
  const r = await bootPreview();
  const make = r.classicalPortableMake;
  const source = r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem: 'pil', sourceClass: 'tli-1'});
  const operation = r.buildClassicalNahuatlOrdinaryNncOperationFrame(source, {state: 'absolutive', subject: '3sg'});
  const noun = make.make({operationId: 'nnc:ordinary', args: [source, operation]})?.canonicalResult;
  assert.ok(noun);
  const sentence = make.make({operationId: 'nnc:sentence-surface', args: [
    noun.typedSlotFrame, {sentenceType: 'assertion', polarity: 'positive'},
  ]})?.canonicalResult;
  assert.ok(sentence);
  const sent = make.requestFor(sentence);
  assert.deepEqual(sent.dependencies, [noun]);
  assert.match(sent.serialized, /nnc:accepted-result-slot/);
  assert.match(make.requestFor(noun).serialized, /nnc:ordinary-operation/);
  const recipient = (await bootPreview()).classicalPortableMake;
  const reopened = recipient.open(make.addressFor(sentence))?.canonicalResult;
  assert.ok(reopened);
  const received = recipient.requestFor(reopened);
  assert.equal(received.serialized, sent.serialized);
  assert.ok(reopened.sourceNncSlotFrame === received.dependencies[0].typedSlotFrame);
  assert.equal(reopened.sentenceSurface, sentence.sentenceSurface);
});

test('the live-base continuation owner reissues the three-stage verb request and object order', async () => {
  const bootPreview = async () => (await createRuntimeInstance({
    portableMakeEnabled: true,
    documentObject: {getElementById: () => null, addEventListener() {}},
  })).runtimeObject;
  const r = await bootPreview();
  const m = r.classicalPortableMake;
  const make = (operationId, ...args) => {
    const application = m.make({operationId, args});
    assert.ok(application, operationId);
    return application.canonicalResult;
  };
  const base = make('vnc:application', {
    sourceStem: 'cochi', verbClass: 'B', sourceValence: 'intransitive', sourceSubject: '3sg',
    subject: '1sg', mood: 'indicative', tense: 'present', derivationType: 'causative',
    causativeObjectKind: 'specific-projective', derivationOptionId: 'causative:type-two:hua:cochī-hua',
  });
  const {exportClassicalResultReloadRecipe, replayClassicalResultReloadRecipe} =
    await import('../application/classical/result_reload.mjs');
  let legacyParent = null;
  let result = make('vnc:sentence-result', base);
  for (const kind of ['specific-projective', 'nonspecific-human']) {
    const binding = r.issueClassicalNahuatlVncContinuationBindingFrame('vnc:application', result, {
      subject: '1sg', mood: 'indicative', tense: 'present',
      requestedDerivation: 'applicative', requestedVoice: 'active', applicativeObjectKind: kind,
      applicativeObjectPerson: kind === 'specific-projective' ? '3sg' : '',
    });
    assert.equal(binding.bindingStatus, 'ready', binding.blockReason);
    const finite = make('vnc:application', ...binding.executionArgs);
    assert.match(m.requestFor(finite).serialized, /vnc-continuation/);
    result = make('vnc:sentence-result', finite);
    if (kind === 'specific-projective') legacyParent = exportClassicalResultReloadRecipe(r, {result});
  }
  const fresh = await bootPreview();
  const recipient = fresh.classicalPortableMake;
  const opened = recipient.open(m.addressFor(result))?.canonicalResult;
  assert.ok(opened);
  assert.equal(opened.sentenceSurfaceDisplay, 'Nictēcochītililia');
  assert.equal(opened.sentenceFormulaDisplay, result.sentenceFormulaDisplay);
  const graph = (engine, node) => {
    const request = engine.requestFor(node);
    return [request.serialized, request.dependencies.map(parent => graph(engine, parent))];
  };
  assert.deepEqual(graph(recipient, opened), graph(m, result));
  const objects = fresh.getClassicalNahuatlVncContinuationSourceConstituents(opened.vncApplicationFrame).sourceObjectRequests;
  assert.deepEqual(objects.map(object => [object.derivationalLevel, object.objectKind]),
    [[1, 'specific-projective'], [2, 'specific-projective'], [3, 'nonspecific-human']]);
  assert.ok(legacyParent);
  const restored = await bootPreview();
  const parent = replayClassicalResultReloadRecipe(restored, JSON.parse(JSON.stringify(legacyParent)),
    {recordPortableRequests: true})?.result;
  assert.equal(parent?.sentenceSurfaceDisplay, 'Niccochītilia');
  const continuation = restored.issueClassicalNahuatlVncContinuationBindingFrame('vnc:application', parent, {
    subject: '1sg', mood: 'indicative', tense: 'present',
    requestedDerivation: 'applicative', requestedVoice: 'active', applicativeObjectKind: 'nonspecific-human',
    applicativeObjectPerson: '',
  });
  assert.equal(continuation?.bindingStatus, 'ready', continuation?.blockReason);
  const restoredEngine = restored.classicalPortableMake;
  const generated = restoredEngine.make({operationId: continuation.operationId, args: continuation.executionArgs})?.canonicalResult;
  assert.ok(generated);
  const address = restoredEngine.addressFor(generated);
  const newReceiver = (await bootPreview()).classicalPortableMake;
  const newResult = newReceiver.open(address)?.canonicalResult;
  assert.ok(newResult);
  assert.deepEqual(graph(newReceiver, newResult), graph(restoredEngine, generated));
});

test('authored verb machinery with participant and scope choices survives the typed workspace packet', async () => {
  const {executeConstructionPacket} = await import('../ui/composition/construction_packet.mjs');
  const {buildClassicalNahuatlParticipantFrame} = await import('../core/classical/participant_frame.mjs');
  const {buildClassicalResultOutputScopeSelectionFrame} = await import('../core/output/scope.mjs');
  const bootPreview = async () => (await createRuntimeInstance({
    portableMakeEnabled: true,
    documentObject: {getElementById: () => null, addEventListener() {}},
  })).runtimeObject;
  const r = await bootPreview();
  const original = r.evaluateClassicalNahuatlVncApplication({
    sourceStem: 'nemi', verbClass: 'B', sourceValence: 'intransitive', subject: '1sg', sourceSubject: '1sg',
    mood: 'indicative', tense: 'present',
    sourceSubjectFrame: buildClassicalNahuatlParticipantFrame({role: 'subject', agreement: '1sg'}),
    outputScopeSelectionFrame: buildClassicalResultOutputScopeSelectionFrame('single', {role:'vnc'}),
  });
  assert.equal(original?.authorizationStatus, 'authorized', original?.blockReason);
  const source = original.resultFrame.sourceMachineryFrame;
  const binding = r.issueClassicalGrammarTypedSourceOperationBindingFrame(
    r.getClassicalGrammarApplicationCapabilityNavigator(source), 'vnc:application',
    {subject:'1sg', mood:'indicative', tense:'present', requestedDerivation:'direct', requestedVoice:'active'},
  );
  assert.equal(binding?.bindingStatus, 'ready', binding?.blockReason);
  const made = executeConstructionPacket(r, {kind:'typed', source, binding})?.canonicalResult;
  assert.ok(made);
  const sent = r.classicalPortableMake.requestFor(made);
  assert.match(sent.serialized, /vnc:application-source-machinery/);
  assert.match(sent.serialized, /grammar:participant-source/);
  assert.match(sent.serialized, /grammar:output-scope-selection/);
  const recipient = (await bootPreview()).classicalPortableMake;
  const reopened = recipient.open(r.classicalPortableMake.addressFor(made))?.canonicalResult;
  assert.ok(reopened);
  assert.equal(recipient.requestFor(reopened).serialized, sent.serialized);
  assert.equal(reopened.surfaceRealization, made.surfaceRealization);
});

test('the place-name owner reissues its nominal site Source for typed Make', async () => {
  const bootPreview = async () => (await createRuntimeInstance({
    portableMakeEnabled: true,
    documentObject: {getElementById: () => null, addEventListener() {}},
  })).runtimeObject;
  const sender = await bootPreview();
  const source = sender.buildClassicalNahuatlPlaceNominalSourceFrame({embedStem: 'coch', matrixStem: 'to'});
  const binding = sender.issueClassicalGrammarTypedSourceOperationBindingFrame(
    sender.getClassicalGrammarApplicationCapabilityNavigator(source),
    'nnc:place-gentilic',
    {constructionKind: 'place-name', formation: 'n-can'},
  );
  assert.equal(binding?.bindingStatus, 'ready');
  const make = sender.classicalPortableMake;
  const made = make.make({typedBinding: binding})?.canonicalResult;
  assert.ok(made);
  const sent = make.requestFor(made);
  assert.match(sent.serialized, /nnc:place-nominal-source/);
  const recipient = (await bootPreview()).classicalPortableMake;
  const reopened = recipient.open(make.addressFor(made))?.canonicalResult;
  assert.ok(reopened);
  assert.equal(recipient.requestFor(reopened).serialized, sent.serialized);
  assert.deepEqual(reopened.sourceAnalysis, made.sourceAnalysis);
});

test('writing Sources preserve plain, compound, and lexical stress-group inputs', async () => {
  const {readFileSync} = await import('node:fs');
  const fixture = JSON.parse(readFileSync(new URL('./fixtures/nonce_writing_source_fixture.json', import.meta.url)));
  const bootPreview = async () => (await createRuntimeInstance({
    portableMakeEnabled: true,
    documentObject: {getElementById: () => null, addEventListener() {}},
  })).runtimeObject;
  const sender = await bootPreview();
  const receiver = (await bootPreview()).classicalPortableMake;
  const make = sender.classicalPortableMake;
  const parent = make.make({operationId: 'grammar:nominal-construction', args: [fixture.request]});
  assert.equal(parent?.authorizationStatus, 'authorized');
  const sources = [
    sender.buildClassicalNahuatlTranscriptionSourceFrame({constituents: [{segments: ['/s/', 'ā']}]}),
    sender.issueClassicalNahuatlWritingSourceFromApplication(parent, fixture.morphParts),
    sender.issueClassicalNahuatlWritingSourceFromParticleGroup(
      fixture.fixedGroup.map(id => sender.buildClassicalNahuatlParticleSourceFrame(id)),
    ),
  ];
  for (const source of sources) {
    const binding = sender.issueClassicalGrammarTypedSourceOperationBindingFrame(
      sender.getClassicalGrammarApplicationCapabilityNavigator(source),
      'orthography:transcription', {writingVariant: 'ordinary'},
    );
    assert.equal(binding?.bindingStatus, 'ready');
    const made = make.make({typedBinding: binding})?.canonicalResult;
    assert.ok(made);
    const reopened = receiver.open(make.addressFor(made))?.canonicalResult;
    assert.ok(reopened);
    assert.equal(receiver.requestFor(reopened).serialized, make.requestFor(made).serialized);
  }
});

test('the negative-particle owner reissues an internal contextual selection with the exact preceding Result', async () => {
  const bootPreview = async () => (await createRuntimeInstance({
    portableMakeEnabled: true,
    documentObject: {getElementById: () => null, addEventListener() {}},
  })).runtimeObject;
  const sender = await bootPreview();
  const make = sender.classicalPortableMake;
  const particle = id => make.make({
    operationId: 'particle:result', args: [sender.buildClassicalNahuatlParticleSourceFrame(id)],
  })?.canonicalResult;
  const preceding = particle('l3-ma');
  const following = particle('l3-zo');
  assert.ok(preceding && following);
  const selection = sender.selectClassicalNahuatlNegativeParticleFrame({
    precedingParticleResultFrame: preceding, sentenceKind: 'wish',
  });
  const made = make.make({
    operationId: 'particle:negative-attachment',
    args: [{negativeSelectionFrame: selection, followingParticleResultFrame: following}],
  })?.canonicalResult;
  assert.equal(made?.surface, 'mā cazo');
  const sent = make.requestFor(made);
  assert.match(sent.serialized, /particle:negative-selection-source/);
  assert.deepEqual(sent.dependencies, [preceding, following]);

  const recipient = (await bootPreview()).classicalPortableMake;
  const reopened = recipient.open(make.addressFor(made))?.canonicalResult;
  assert.equal(reopened?.surface, 'mā cazo');
  const received = recipient.requestFor(reopened);
  assert.equal(received.serialized, sent.serialized);
  assert.equal(reopened.negativeSelectionFrame.precedingParticleResultFrame, received.dependencies[0]);
  assert.equal(reopened.followingParticleResultFrame, received.dependencies[1]);
});

test('contextual nominal and lexical adverbial inputs replay from their Owner constructors', async () => {
  const bootPreview = async () => (await createRuntimeInstance({
    portableMakeEnabled: true,
    documentObject: {getElementById: () => null, addEventListener() {}},
  })).runtimeObject;
  const sender = await bootPreview();
  const make = sender.classicalPortableMake;
  const recipient = (await bootPreview()).classicalPortableMake;
  const noun = sender.buildClassicalNahuatlOrdinaryNncSourceFrame({stem: 'hueli', sourceClass: 'tl'});
  const negative = make.make({
    operationId: 'particle:negative-selection', args: [{polarity: 'negative', sentenceKind: 'statement'}],
  })?.canonicalResult;
  assert.ok(negative);
  const context = sender.issueClassicalNahuatlContextualFlawedSubjectSourceFrame(noun, negative);
  const potential = sender.buildClassicalNahuatlLexicalAdverbialPotentialFrame({stem: 'quēn'});
  const requests = [
    {operationId: 'grammar:nominal-construction', args: [{
      constructionKind: 'affective-nnc', affectRoute: 'flawed-subject', subject: '3common',
      state: 'absolutive', animacy: 'unspecified',
      source: {embedStem: 'hueli', embedClass: 'tl', embedSourceClass: 'tl',
        canonicalNncSourceFrame: noun, contextualFlawedSubjectSourceFrame: context},
    }]},
    {operationId: 'nnc:adverbial', args: [{
      adverbialPotentialFrame: potential, degree: 'second-degree', scope: 'external-clause', context: {},
    }]},
  ];
  for (const request of requests) {
    const made = make.make(request)?.canonicalResult;
    assert.ok(made, request.operationId);
    const reopened = recipient.open(make.addressFor(made))?.canonicalResult;
    assert.ok(reopened, request.operationId);
    assert.equal(recipient.requestFor(reopened).serialized, make.requestFor(made).serialized);
  }
});

test('relational Make preserves both declared and documented imperfect Sources', async () => {
  const bootPreview = async () => (await createRuntimeInstance({
    portableMakeEnabled: true,
    documentObject: {getElementById: () => null, addEventListener() {}},
  })).runtimeObject;
  const runtime = await bootPreview();
  const sender = runtime.classicalPortableMake;
  const receiver = (await bootPreview()).classicalPortableMake;
  const sourceKind = 'incorporated-adverb-imperfect-predicate';
  const sourceFormation = 'imperfect-active';
  const declared = runtime.buildClassicalNahuatlSelectedImperfectPredicateSourceFrame({
    sourceKind, sourceFormation, sourceVoice: 'active',
    incorporatedEmbed: {kind: 'nounstem', stem: 'ēyomatitlōcuitzo'},
    predicateStem: 'xīxehuoxātlacha', tenseCarrier: 'yā', initialI: 'supportive-omitted',
  });
  const documented = runtime.resolveClassicalNahuatlSelectedImperfectPredicateSourceFrame({
    enteredStem: 'nō-hui-yā', sourceKind, sourceFormation,
  });
  for (const [source, issuer] of [[declared, 'selected'], [documented, 'resolved']]) {
    assert.equal(source?.authorizationStatus, 'authorized');
    const build = {operationId: 'nnc:relational', args: [{
      nounstem: {
        kind: 'classical-nahuatl-nnc-nounstem-request', stemId: 'n-locative',
        formation: 'option-two', operation: 'relational-nnc', sourceKind, sourceFormation,
        selectedImperfectPredicateSource: source,
      },
      subjectMode: 'adverbialized', state: 'absolutive',
    }]};
    const ordinary = runtime.executeClassicalGrammarApplicationRequest(build);
    assert.equal(ordinary?.authorizationStatus, 'authorized', ordinary?.blockReason);
    const result = sender.make(build)?.canonicalResult;
    assert.ok(result, issuer);
    const request = sender.requestFor(result).serialized;
    assert.ok(request.includes(`nnc:${issuer}-imperfect-source`));
    const replay = receiver.open(sender.addressFor(result))?.canonicalResult;
    assert.ok(replay, issuer);
    assert.equal(receiver.requestFor(replay).serialized, request);
    assert.equal(replay.surfaceRealization, result.surfaceRealization);
  }
});

test('an older noun link supplies a portable parent for a new Make', async () => {
  const {replayClassicalResultReloadRecipe} = await import('../application/classical/result_reload.mjs');
  const bootPreview = async () => (await createRuntimeInstance({
    portableMakeEnabled: true,
    documentObject: {getElementById: () => null, addEventListener() {}},
  })).runtimeObject;
  const runtime = await bootPreview();
  const make = runtime.classicalPortableMake;
  const oldLink = {
    kind: 'classical-grammar-result-reload-recipe', version: 1,
    nodes: [{
      type: 'nnc:source-build', source: {stem: 'pil', sourceClass: 'tli-1'},
      choices: {state: 'absolutive', subject: '3sg'},
    }],
    roots: {result: 0},
  };
  const parent = replayClassicalResultReloadRecipe(runtime, oldLink, {recordPortableRequests: true})?.result;
  assert.ok(make.requestFor(parent));
  const application = make.make({operationId: 'nnc:sentence-surface', args: [parent.typedSlotFrame, {}]});
  assert.equal(application?.authorizationStatus, 'authorized');
  const made = application.canonicalResult;
  const sent = make.requestFor(made);
  assert.deepEqual(sent.dependencies, [parent]);
  const recipient = (await bootPreview()).classicalPortableMake;
  const reopened = recipient.open(make.addressFor(made))?.canonicalResult;
  assert.ok(reopened);
  assert.equal(recipient.requestFor(reopened).serialized, sent.serialized);
});

test('compound predicate Sources retain lexical or earlier nominal ancestry', async () => {
  const bootPreview = async () => (await createRuntimeInstance({
    portableMakeEnabled: true,
    documentObject: {getElementById: () => null, addEventListener() {}},
  })).runtimeObject;
  const runtime = await bootPreview();
  const sender = runtime.classicalPortableMake;
  const receiver = (await bootPreview()).classicalPortableMake;
  const nominal = sender.make({operationId: 'nnc:deverbal-construction', args: [{
    constructionKind: 'ownerhood',
    source: {sourceStem: 'xōch', nounClass: 'tli', ownerhoodMatrix: 'ē'},
    subject: '3sg', state: 'absolutive', animacy: 'animate', numberConnector: 'silent',
  }]})?.canonicalResult;
  assert.ok(nominal);
  for (const input of [{sourceStem: 'cac'}, {canonicalNncResult: nominal}]) {
    const source = runtime.buildClassicalNahuatlCompoundPredicateSourceFrame(input);
    const result = sender.make({operationId: 'vnc:derivational-operation', args: [{
      sourceStem: source.sourceStem, sourceValence: 'intransitive', verbClass: 'A',
      subject: '3sg', mood: 'indicative', tense: 'present', derivationType: 'direct',
      voice: 'active', lateOperation: 'compound', lateVariant: 'connective-t',
      compoundMatrixStem: 'yāuh', compoundPredicateSourceFrame: source,
    }]})?.canonicalResult;
    assert.ok(result);
    const sent = sender.requestFor(result);
    assert.match(sent.serialized, /vnc:compound-predicate-source/);
    assert.deepEqual(sent.dependencies, input.canonicalNncResult ? [nominal] : []);
    const reopened = receiver.open(sender.addressFor(result))?.canonicalResult;
    assert.ok(reopened);
    assert.equal(receiver.requestFor(reopened).serialized, sent.serialized);
    assert.equal(reopened.surfaceRealization, result.surfaceRealization);
  }
});

test('nominal state slots and patientive cores carry their issuing requests', async () => {
  const bootPreview = async () => (await createRuntimeInstance({
    portableMakeEnabled: true,
    documentObject: {getElementById: () => null, addEventListener() {}},
  })).runtimeObject;
  const runtime = await bootPreview();
  const sender = runtime.classicalPortableMake;
  const receiver = (await bootPreview()).classicalPortableMake;
  const absolutive = runtime.buildClassicalNahuatlAbsolutiveNncFrame('pil', {
    subject: '3sg', nounClass: 'tli', animacy: 'animate', humanness: 'human',
  });
  const possessive = runtime.buildClassicalNahuatlPossessiveNncFrame('chīmal', {
    subject: '3sg', possessor: '1sg', singularConnector: '0',
    nounstemRelationKind: 'nonrelational', animacy: 'nonanimate',
  });
  const sourceStem = 'pāna';
  const verbClass = 'B';
  const nonactive = runtime.getClassicalNahuatlNonactiveStemOptions(sourceStem, {
    verbClass, sourceValence: 'projective-human',
  }).options.find(option => option.suffixFamily === 'lō');
  assert.ok(nonactive);
  const core = runtime.buildClassicalNahuatlPatientiveCoreSourceFrame({
    sourceStem, verbClass, sourceStage: 'nonactive-core', sourceValence: 'single-object',
    sourceObjectPattern: 'nonspecific-human', sourceVoice: 'impersonal',
    impersonalDerivationPath: 'passive', nonactiveOptionId: nonactive.optionId,
  });
  const builds = [absolutive, possessive].map(frame => ({
    operationId: 'nnc:sentence-surface', args: [frame.nncSlotFrame, {sentenceType: 'assertion'}],
  }));
  builds.push({operationId: 'nnc:deverbal-construction', args: [{
    constructionKind: 'patientive', patientiveSourceFamily: 'impersonal-core',
    canonicalPatientiveCoreSourceFrame: core,
    subject: '3sg', state: 'absolutive', animacy: 'animate', humanness: 'human',
  }]});
  for (const build of builds) {
    const result = sender.make(build)?.canonicalResult;
    assert.ok(result, build.operationId);
    const sent = sender.requestFor(result).serialized;
    assert.match(sent, /nnc:(state-slot|patientive-core-source)/);
    const reopened = receiver.open(sender.addressFor(result))?.canonicalResult;
    assert.ok(reopened, build.operationId);
    assert.equal(receiver.requestFor(reopened).serialized, sent);
  }
});

test('typed finite Make reissues the specialized verb Sources', async () => {
  const bootPreview = async () => (await createRuntimeInstance({
    portableMakeEnabled: true,
    documentObject: {getElementById: () => null, addEventListener() {}},
  })).runtimeObject;
  const runtime = await bootPreview();
  const sender = runtime.classicalPortableMake;
  const receiver = (await bootPreview()).classicalPortableMake;
  const active = {
    subject: '1sg', subjectAnimacy: 'animate', subjectHumanness: 'human',
    mood: 'indicative', tense: 'present', requestedVoice: 'active', requestedDerivation: 'direct',
  };
  const cases = [
    ['restricted-containing', runtime.resolveClassicalNahuatlRestrictedContainingVncSourceFrame({
      enteredStem: 'itz', valence: 'intransitive', sourceLexemeId: 'cn-vnc-itz-motion-matrix',
    }), {subject: '3sg', subjectAnimacy: 'animate', subjectHumanness: 'human',
      mood: 'indicative', tense: 'present', embedStem: 'hui'}],
    ['analytical', runtime.resolveClassicalNahuatlAnalyticalVncSourceFrame({
      enteredStem: 'chich-ī-ni', valence: 'intransitive',
    }), {subject: '3sg', subjectAnimacy: 'animate', subjectHumanness: 'human',
      mood: 'indicative', tense: 'present', requestedDerivation: 'causative', objectSelection: 'specific-projective:2sg'}],
    ['imperfective', runtime.resolveClassicalNahuatlImperfectiveVncSourceFrame({enteredStem: 'mo-ca', valence: 'intransitive'}), active],
    ['preformed', runtime.resolveClassicalNahuatlPreformedVncSourceFrame({enteredStem: 'cah-ca-h', valence: 'intransitive'}), active],
    ['nonactive-carrier', runtime.resolveClassicalNahuatlNonactiveCarrierSourceFrame({enteredStem: 'nec-ō', valence: 'intransitive'}), {
      ...active, subject: '3common', subjectAnimacy: 'nonanimate', subjectHumanness: 'nonhuman',
      patientReferenceId: 'desired-p', requestedVoice: 'passive', tense: 'future',
    }],
  ];
  for (const [issuer, source, choices] of cases) {
    assert.ok(source, issuer);
    const typedBinding = runtime.issueClassicalGrammarTypedSourceOperationBindingFrame(
      runtime.getClassicalGrammarApplicationCapabilityNavigator(source), 'vnc:application', choices,
    );
    assert.equal(typedBinding?.bindingStatus, 'ready', typedBinding?.blockReason);
    const made = sender.make({typedBinding})?.canonicalResult;
    assert.ok(made, issuer);
    const sent = sender.requestFor(made).serialized;
    assert.ok(sent.includes(`vnc:${issuer}-source`));
    const reopened = receiver.open(sender.addressFor(made))?.canonicalResult;
    assert.ok(reopened, issuer);
    assert.equal(receiver.requestFor(reopened).serialized, sent);
    assert.equal(reopened.resultFrame.surfaceRealization, made.resultFrame.surfaceRealization);
  }
});

test('a cached Owner Result can be made again from the same portable request', () => {
  const cached = Object.freeze({kind: 'cached-test-result'});
  const application = {authorizationStatus: 'authorized', canonicalResult: cached};
  const make = createPortableMake(() => application);
  const request = {operationId: 'test:cached', args: [{choice: 'first'}]};
  assert.equal(make.make(request), application);
  const address = make.addressFor(cached);
  assert.ok(address);
  assert.equal(make.make(request), application);
  assert.equal(make.open(address), application);
  assert.equal(make.make({operationId: request.operationId, args: [{choice: 'different'}]}), null);
  assert.equal(make.addressFor(cached), address);
});

test('prepared finite Make replays from the retained typed or continuation binding', async () => {
  const bootPreview = async () => (await createRuntimeInstance({
    portableMakeEnabled: true,
    documentObject: {getElementById: () => null, addEventListener() {}},
  })).runtimeObject;
  const runtime = await bootPreview();
  const make = runtime.classicalPortableMake;
  const recipient = (await bootPreview()).classicalPortableMake;
  const authored = runtime.evaluateClassicalNahuatlVncApplication({
    sourceStem: 'chōca', verbClass: 'A', sourceValence: 'intransitive',
    subject: '3sg', mood: 'indicative', tense: 'present',
  });
  const source = authored.resultFrame.sourceMachineryFrame;
  const binding = runtime.issueClassicalGrammarTypedSourceOperationBindingFrame(
    runtime.getClassicalGrammarApplicationCapabilityNavigator(source), 'vnc:application',
    {subject: '1sg', mood: 'indicative', tense: 'imperfect',
      requestedDerivation: 'direct', requestedVoice: 'active'},
  );
  const typed = runtime.prepareClassicalGrammarApplicationRequest(binding);
  assert.ok(typed);
  const parent = make.make(typed.request, typed)?.canonicalResult;
  assert.ok(parent);
  assert.equal(parent, typed.canonicalResult);
  assert.match(make.requestFor(parent).serialized, /prepared-typed-source-binding/);
  const sentenceBinding = runtime.issueClassicalNahuatlVncContinuationBindingFrame(
    'vnc:sentence-result', parent, {punctuationMode: 'statement'},
  );
  const sentence = runtime.prepareClassicalGrammarApplicationRequest(sentenceBinding);
  assert.ok(sentence);
  const result = make.make(sentence.request, sentence)?.canonicalResult;
  assert.ok(result);
  assert.equal(result, sentence.canonicalResult);
  const sent = make.requestFor(result);
  assert.match(sent.serialized, /prepared-vnc-continuation/);
  const opened = recipient.open(make.addressFor(result))?.canonicalResult;
  assert.ok(opened);
  const received = recipient.requestFor(opened);
  assert.equal(received.serialized, sent.serialized);
  assert.equal(recipient.requestFor(received.dependencies[0]).serialized, make.requestFor(parent).serialized);
});

test('a long chain of small requests can Make and replay through a fragment URL', async () => {
  const {readPortableResultUrl, writePortableResultUrl} =
    await import('../application/classical/portable_result_url.mjs');
  const execute = ({args: [choice, parent]}) => ({
    authorizationStatus: 'authorized',
    canonicalResult: {choice, depth: (parent?.depth ?? 0) + 1},
  });
  const sender = createPortableMake(execute);
  let result = null;
  const choice = 'ā'.repeat(3000);
  for (let step = 0; step < 16; step++) {
    result = sender.make({operationId: 'test:chain', args: [choice, result]})?.canonicalResult;
    assert.equal(result?.depth, step + 1);
  }
  const address = sender.addressFor(result);
  assert.ok(address.length > 90_000);
  const url = new URL('https://example.test/');
  assert.equal(writePortableResultUrl(url, address), true);
  assert.equal(url.searchParams.get('r'), '84/p2/');
  const recipient = createPortableMake(execute);
  const reopened = recipient.open(readPortableResultUrl(url))?.canonicalResult;
  assert.deepEqual(reopened, result);
  assert.equal(recipient.requestFor(reopened).serialized, sender.requestFor(result).serialized);
});

test('the shared Make packet replays a prepared finite sentence and its adverbial layer', async () => {
  const {prepareConstructionVncEnvelope} = await import('../ui/composition/construction_layers.mjs?v=20261023-conjunct-edit-1&interfaceRelease=1.2.36&ownerDecision=20261031-1');
  const {executeConstructionPacket} = await import('../ui/composition/construction_packet.mjs');
  const bootPreview = async () => (await createRuntimeInstance({
    portableMakeEnabled: true,
    documentObject: {getElementById: () => null, addEventListener() {}},
  })).runtimeObject;
  const runtime = await bootPreview();
  const base = runtime.evaluateClassicalNahuatlVncApplication({
    sourceStem: 'chōca', verbClass: 'A', sourceValence: 'intransitive',
    subject: '3sg', mood: 'indicative', tense: 'present',
  });
  const source = base.resultFrame.sourceMachineryFrame;
  const binding = runtime.issueClassicalGrammarTypedSourceOperationBindingFrame(
    runtime.getClassicalGrammarApplicationCapabilityNavigator(source), 'vnc:application',
    {subject: '1sg', mood: 'indicative', tense: 'imperfect',
      requestedDerivation: 'direct', requestedVoice: 'active', sentenceOptions: {negative: true}},
  );
  const prepared = runtime.prepareClassicalGrammarApplicationRequest(binding);
  assert.ok(prepared);
  const envelope = prepareConstructionVncEnvelope(runtime, prepared, {adverbialId: 'l3-oc'});
  assert.equal(envelope.ready, true, envelope.blockReason);
  const made = executeConstructionPacket(runtime, {
    kind: 'typed', operation: 'vnc:application', source, binding, prepared,
    request: prepared.request, preparedSentence: envelope.preparedSentence,
    preparedLayers: envelope.layers.preparedLayers, layers: [],
  })?.canonicalResult;
  assert.ok(made);
  assert.equal(made, envelope.layers.preparedLayers[0].prepared.canonicalResult);
  const sender = runtime.classicalPortableMake;
  const recipient = (await bootPreview()).classicalPortableMake;
  const opened = recipient.open(sender.addressFor(made))?.canonicalResult;
  assert.ok(opened);
  const tree = (engine, result) => {
    const request = engine.requestFor(result);
    return [request.serialized, request.dependencies.map(parent => tree(engine, parent))];
  };
  assert.deepEqual(tree(recipient, opened), tree(sender, made));
  const [sentence] = sender.requestFor(made).dependencies;
  const [finite] = sender.requestFor(sentence).dependencies;
  assert.match(sender.requestFor(finite).serialized, /prepared-typed-source-binding/);
});

test('typed relational composition choices survive a portable Make', async () => {
  const bootPreview = async () => (await createRuntimeInstance({
    portableMakeEnabled: true,
    documentObject: {getElementById: () => null, addEventListener() {}},
  })).runtimeObject.classicalPortableMake;
  const sender = await bootPreview();
  const stem = value => ({kind: 'classical-nahuatl-relational-source-composition-stem-node', stem: value});
  const build = {operationId: 'nnc:relational', args: [{
    state: 'absolutive', subjectMode: 'adverbialized',
    nounstem: {
      kind: 'classical-nahuatl-nnc-nounstem-request', stemId: 'pa-direction',
      formation: 'option-two', operation: 'relational-nnc', sourceKind: 'relational-compound',
      sourceFormation: 'plain-nounstem', sourceVoice: 'active', sourceMode: 'embed-matrix',
      sourceComposition: {
        kind: 'classical-nahuatl-relational-source-composition-request',
        embed: stem('tech'), matrix: stem('pa'),
      },
    },
  }]};
  const made = sender.make(build)?.canonicalResult;
  assert.ok(made);
  const recipient = await bootPreview();
  const reopened = recipient.open(sender.addressFor(made))?.canonicalResult;
  assert.ok(reopened);
  assert.equal(recipient.requestFor(reopened).serialized, sender.requestFor(made).serialized);
  assert.deepEqual(reopened.sourceFrame.sourceCompositionFrame, made.sourceFrame.sourceCompositionFrame);
});

test('an authored initial-i choice remains in the typed finite request', async () => {
  const bootPreview = async () => (await createRuntimeInstance({
    portableMakeEnabled: true,
    documentObject: {getElementById: () => null, addEventListener() {}},
  })).runtimeObject;
  const runtime = await bootPreview();
  const engine = runtime.classicalPortableMake;
  const source = runtime.evaluateClassicalNahuatlVncApplication({
    sourceStem: 'itta', sourceInitialISelection: 'real', verbClass: 'A',
    sourceValence: 'specific-projective', objectKind: 'specific-projective', objectPerson: '3sg',
    subject: '3sg', mood: 'indicative', tense: 'present',
  })?.resultFrame?.sourceMachineryFrame;
  assert.ok(source);
  const binding = runtime.issueClassicalGrammarTypedSourceOperationBindingFrame(
    runtime.getClassicalGrammarApplicationCapabilityNavigator(source), 'vnc:application',
    {subject: '3sg', mood: 'indicative', tense: 'present',
      requestedDerivation: 'direct', requestedVoice: 'active'},
  );
  assert.equal(binding?.bindingStatus, 'ready', binding?.blockReason);
  const made = engine.make({typedBinding: binding})?.canonicalResult;
  assert.ok(made);
  const sent = engine.requestFor(made).serialized;
  assert.match(sent, /"sourceInitialISelection":"real"/);
  const receiver = (await bootPreview()).classicalPortableMake;
  const reopened = receiver.open(engine.addressFor(made))?.canonicalResult;
  assert.ok(reopened);
  assert.equal(receiver.requestFor(reopened).serialized, sent);
  assert.equal(reopened.resultFrame.surfaceRealization, made.resultFrame.surfaceRealization);
});

test('prepared ordered voice retains the exact parent and ordered Owner choices', async () => {
  const {executeConstructionPacket} = await import('../ui/composition/construction_packet.mjs');
  const bootPreview = async () => (await createRuntimeInstance({
    portableMakeEnabled: true,
    documentObject: {getElementById: () => null, addEventListener() {}},
  })).runtimeObject;
  const runtime = await bootPreview();
  const sender = runtime.classicalPortableMake;
  const parent = sender.make({operationId: 'vnc:application', args: [{
    sourceStem: 'yohua', verbClass: 'A', sourceValence: 'intransitive',
    subject: '1sg', mood: 'indicative', tense: 'present', requestedDerivation: 'direct',
    requestedVoice: 'impersonal', nonactiveOptionId: 'inherent-impersonal',
  }]})?.canonicalResult;
  assert.ok(parent);
  const operationId = 'vnc:ordered-voice-application';
  const binding = runtime.issueClassicalNahuatlVncContinuationBindingFrame(operationId, parent.resultFrame, {
    operations: ['inherent-impersonal', 'tla-impersonal', 'nonactive-lō'],
  });
  assert.equal(binding.bindingStatus, 'ready', binding.blockReason);
  const prepared = runtime.prepareClassicalGrammarApplicationRequest(binding);
  assert.ok(prepared);
  const made = executeConstructionPacket(runtime, {
    kind: 'request', operation: operationId, source: parent.resultFrame,
    request: prepared.request, prepared, layers: [],
  })?.canonicalResult;
  assert.equal(made, prepared.canonicalResult);
  const sent = sender.requestFor(made);
  assert.deepEqual(sent.dependencies, [parent]);
  assert.match(sent.serialized, /"operations":\["inherent-impersonal","tla-impersonal","nonactive-lō"\]/u);
  const recipient = (await bootPreview()).classicalPortableMake;
  const opened = recipient.open(sender.addressFor(made))?.canonicalResult;
  assert.ok(opened);
  assert.equal(recipient.requestFor(opened).serialized, sent.serialized);
});

test('an unavailable Owner request cannot crash replay or stop later valid links', () => {
  const sender = createPortableMake(({args: [choice]}) => ({
    authorizationStatus: 'authorized', canonicalResult: {choice},
  }));
  const link = choice => sender.addressFor(sender.make({
    operationId: 'test:owner', args: [choice],
  }).canonicalResult);
  const recipient = createPortableMake(({args: [choice]}) => {
    if (choice === 'unavailable') throw new Error('Owner rejected the request');
    return {authorizationStatus: 'authorized', canonicalResult: {choice}};
  });
  assert.equal(recipient.open(link('unavailable')), null);
  assert.equal(recipient.open(link('available'))?.canonicalResult.choice, 'available');
});

test('changing an attached particle shares the rebuilt whole and its exact host', async () => {
  const {executeConstructionPacket} = await import('../ui/composition/construction_packet.mjs');
  const {resolveResultEditTarget} = await import('../ui/composition/result_editing.mjs');
  const bootPreview = async () => (await createRuntimeInstance({
    portableMakeEnabled: true,
    documentObject: {getElementById: () => null, addEventListener() {}},
  })).runtimeObject;
  const runtime = await bootPreview();
  const sender = runtime.classicalPortableMake;
  const make = (operationId, ...args) => sender.make({operationId, args})?.canonicalResult;
  const finite = make('vnc:application', {
    sourceStem: 'nemi', verbClass: 'B', sourceValence: 'intransitive',
    subject: '3sg', mood: 'indicative', tense: 'present',
  });
  const host = make('vnc:sentence-result', finite);
  const particle = make('particle:result', runtime.buildClassicalNahuatlParticleSourceFrame('l3-o-behold'));
  const root = make('sentence:particle-adjunction', {particleResultFrame: particle, nuclearResultFrame: host});
  assert.ok(root);
  const path = ['particleResultFrame'];
  const target = resolveResultEditTarget(runtime, root, path);
  assert.equal(target?.node, particle);
  const binding = runtime.issueClassicalGrammarTypedSourceOperationBindingFrame(
    runtime.getClassicalGrammarApplicationCapabilityNavigator(particle), 'particle:result', {particleId: 'l3-ca'},
  );
  assert.equal(binding?.bindingStatus, 'ready', binding?.blockReason);
  const made = executeConstructionPacket(runtime, {
    kind: 'result-edit', operation: 'particle:result',
    edit: {action: 'change', intent: 'change', root, target: particle, path},
    inner: {kind: 'typed', operation: 'particle:result', source: binding.exactSource, binding},
  })?.canonicalResult;
  assert.ok(made);
  assert.equal(made.canonicalInputFrame, host);
  assert.equal(made.particleResultFrame.particleId, 'l3-ca');
  const recipient = (await bootPreview()).classicalPortableMake;
  const reopened = recipient.open(sender.addressFor(made))?.canonicalResult;
  assert.ok(reopened);
  const received = recipient.requestFor(reopened);
  assert.equal(received.serialized, sender.requestFor(made).serialized);
  assert.ok(received.dependencies.includes(reopened.canonicalInputFrame));
  assert.equal(reopened.particleResultFrame.particleId, 'l3-ca');

  const removal = resolveResultEditTarget(runtime, made, path);
  assert.equal(removal.removableTo, host);
  const removed = executeConstructionPacket(runtime, {
    kind: 'result-edit', operation: 'sentence:particle-adjunction',
    edit: {action: 'remove', root: made, target: removal.node, path, remaining: host},
  })?.canonicalResult;
  assert.equal(removed, host);
  const reopenedHost = recipient.open(sender.addressFor(removed))?.canonicalResult;
  assert.ok(reopenedHost);
  assert.equal(recipient.requestFor(reopenedHost).serialized, sender.requestFor(host).serialized);
  assert.equal(reopenedHost.sentenceFormulaDisplay, host.sentenceFormulaDisplay);
});

test('a conjunction edit replays the Owner request and retains its unchanged conjunct', async () => {
  const {executeConstructionPacket} = await import('../ui/composition/construction_packet.mjs');
  const {getResultEditTargets} = await import('../ui/composition/result_editing.mjs');
  const bootPreview = async () => (await createRuntimeInstance({
    portableMakeEnabled: true,
    documentObject: {getElementById: () => null, addEventListener() {}},
  })).runtimeObject;
  const runtime = await bootPreview();
  const sender = runtime.classicalPortableMake;
  const make = (operationId, ...args) => sender.make({operationId, args})?.canonicalResult;
  const nouns = ['zēcuēcuēcuēnēhua', 'xōmōnēhuīyāhua'].map(stem => {
    const source = runtime.buildClassicalNahuatlOrdinaryNncSourceFrame({stem, sourceClass: 'tl-1-a'});
    const typedBinding = runtime.issueClassicalGrammarTypedSourceOperationBindingFrame(
      runtime.getClassicalGrammarApplicationCapabilityNavigator(source), 'nnc:ordinary',
      {subject: '3sg', animacy: 'animate', humanness: 'human', state: 'absolutive', predicateFormation: 'source-stem'},
    );
    return sender.make({typedBinding})?.canonicalResult;
  });
  assert.ok(nouns.every(Boolean));
  const controller = runtime.createClassicalClauseRelationController();
  controller.captureCurrentResult('principal', nouns[0]);
  controller.captureCurrentResult('adjoined', nouns[1]);
  const composed = controller.compose({relation: 'correlative-conjunction',
    correlationType: 'standard', correlativePattern: 'ahzo-ahzo'});
  assert.equal(composed.authorizationStatus, 'authorized', composed.blockReason);
  assert.ok(sender.addressFor(composed.canonicalResult));
  const root = make('clause:composition', {
    operationKind: 'conjunction',
    conjuncts: nouns.map((noun, i) => runtime.buildClassicalNahuatlClauseCompositionSourceFrame(noun, {referenceId: `edit-${i}`})),
    options: {relation: 'marked', coordinationType: 'additive', level: 'principal', polarity: 'positive',
      rightwardModifier: 'oc', modifierAdjunctor: 'none', sharedModifierScope: 'none', sharedModifier: 'none',
      leftContextAbsent: false, adjoinedFunction: 'none', identicalAdjoinedClauseEllipsis: 'none', boundaryPunctuation: 'none'},
  });
  assert.ok(root);
  const target = getResultEditTargets(runtime, root).find(item => item.path.length === 2 && item.path[1] === 1);
  assert.ok(target);
  const operation = 'nnc:sentence-surface';
  const slot = runtime.getClassicalGrammarApplicationCapabilityNavigator(target.node).operations.find(entry => entry.operationId === operation).ownerProbeInputResult;
  const made = executeConstructionPacket(runtime, {
    kind: 'result-edit', operation,
    edit: {action: 'change', root, target: target.node, path: target.path},
    inner: {kind: 'request', operation, source: slot,
      request: {operationId: operation, args: [slot, {sentenceType: 'assertion', polarity: 'negative'}]}},
  })?.canonicalResult;
  assert.ok(made);
  assert.equal(made.conjuncts[0], root.conjuncts[0]);
  const sent = sender.requestFor(made);
  assert.match(sent.serialized, /clause:conjunction-replacement/);
  const recipient = (await bootPreview()).classicalPortableMake;
  const reopened = recipient.open(sender.addressFor(made))?.canonicalResult;
  assert.ok(reopened);
  assert.equal(recipient.requestFor(reopened).serialized, sent.serialized);
  assert.equal(reopened.surfaceRealization, made.surfaceRealization);
});

test('two-nucleus edits replay the whole, role and replacement without storing the internal relation', async () => {
  const bootPreview = async () => (await createRuntimeInstance({
    portableMakeEnabled: true,
    documentObject: {getElementById: () => null, addEventListener() {}},
  })).runtimeObject;
  const runtime = await bootPreview();
  const sender = runtime.classicalPortableMake;
  const make = (operationId, ...args) => sender.make({operationId, args})?.canonicalResult;
  const noun = stem => {
    const source = runtime.buildClassicalNahuatlOrdinaryNncSourceFrame({stem, sourceClass: 'tl-1-a'});
    const operation = runtime.buildClassicalNahuatlOrdinaryNncOperationFrame(source, {
      subject: '3sg', humanness: 'human', state: 'absolutive', predicateFormation: 'source-stem',
    });
    return make('nnc:ordinary', source, operation);
  };
  const principal = noun('zōhuōhuinānihua');
  const supplement = noun('mocēcōcaxēhua');
  const whole = make('nnc:deverbal-construction', {
    constructionKind: 'double-nucleus-ownerhood',
    source: {principalNncResult: principal, supplementNncResult: supplement,
      supplementationAnalysis: 'fixed-order-subject-supplementation'},
    subject: '1pl', state: 'possessive', possessor: '3pl', animacy: 'animate',
  });
  assert.ok(whole);
  const {executeConstructionPacket} = await import('../ui/composition/construction_packet.mjs');
  const changes = {state: 'possessive', possessor: '1sg'};
  const made = executeConstructionPacket(runtime, {
    kind: 'result-edit', operation: 'nnc:ordinary',
    edit: {action: 'change', intent: 'change', root: whole, target: supplement, path: ['children', 0]},
    inner: {kind: 'request', operation: 'nnc:ordinary', source: supplement,
      request: {operationId: 'nnc:ordinary', args: [supplement, changes]}},
  })?.canonicalResult;
  assert.ok(made);
  const sent = sender.requestFor(made);
  const replacement = made.sourceFrame.supplementNncResult;
  assert.equal(replacement.operationFrame.possessor, '1sg');
  assert.deepEqual(sent.dependencies, [whole, replacement]);
  const recipient = (await bootPreview()).classicalPortableMake;
  const opened = recipient.open(sender.addressFor(made))?.canonicalResult;
  assert.ok(opened);
  const received = recipient.requestFor(opened);
  assert.equal(received.serialized, sent.serialized);
  assert.equal(opened.sourceFrame.supplementNncResult, received.dependencies[1]);
  assert.equal(opened.sourceFrame.principalNncResult, received.dependencies[0].sourceFrame.principalNncResult);
});

test('prepared complement Owner requests keep principal and complement operands', async () => {
  const bootPreview = async () => (await createRuntimeInstance({
    portableMakeEnabled: true,
    documentObject: {getElementById: () => null, addEventListener() {}},
  })).runtimeObject;
  const runtime = await bootPreview();
  const make = runtime.classicalPortableMake;
  const pair = ['pēhua', 'cuīca'].map(sourceStem => make.make({
    operationId: 'vnc:application', args: [{
      sourceStem, verbClass: 'A', sourceValence: 'intransitive', subject: '3sg',
      mood: 'indicative', tense: 'present', requestedVoice: 'active', requestedDerivation: 'direct',
    }],
  })?.canonicalResult);
  assert.ok(pair.every(Boolean));
  const controller = runtime.createClassicalClauseRelationController();
  controller.captureCurrentResult('principal', pair[0]);
  controller.captureCurrentResult('adjoined', pair[1]);
  const clause = controller.compose({
    relation: 'adverbial-complement', semanticCategory: 'beginning', complementOrder: 'principal-complement',
  });
  assert.equal(clause.authorizationStatus, 'authorized', clause.blockReason);
  const inputs = runtime.getClassicalNahuatlClauseComplementationReloadInputs(clause.canonicalResult);
  assert.ok(inputs);
  const ownerRequest = runtime.buildClassicalNahuatlClauseComplementationOperationRequest(inputs);
  const built = make.make({operationId: 'clause:composition', args: [ownerRequest]})?.canonicalResult;
  assert.ok(built);
  const sent = make.requestFor(built);
  assert.match(sent.serialized, /clause:complement-operation/);
  assert.deepEqual(sent.dependencies, pair);
  const receiver = (await bootPreview()).classicalPortableMake;
  const replayed = receiver.open(make.addressFor(built))?.canonicalResult;
  assert.ok(replayed);
  assert.equal(receiver.requestFor(replayed).serialized, sent.serialized);
  assert.equal(replayed.surfaceRealization, built.surfaceRealization);
});

test('a supplementary absolute topic replays its Owner-issued context record', async () => {
  const bootPreview = async () => (await createRuntimeInstance({
    portableMakeEnabled: true,
    documentObject: {getElementById: () => null, addEventListener() {}},
  })).runtimeObject;
  const runtime = await bootPreview();
  const sender = runtime.classicalPortableMake;
  const make = (operationId, ...args) => sender.make({operationId, args})?.canonicalResult;
  const finite = make('vnc:application', {
    sourceStem: 'nemi', verbClass: 'B', sourceValence: 'intransitive',
    subject: '3sg', mood: 'indicative', tense: 'present',
  });
  const host = make('vnc:sentence-result', finite);
  const noun = runtime.buildClassicalNahuatlOrdinaryNncSourceFrame({stem: 'pil', sourceClass: 'tli-1'});
  const operation = runtime.buildClassicalNahuatlOrdinaryNncOperationFrame(noun, {
    subject: '3sg', humanness: 'human', state: 'absolutive', predicateFormation: 'source-stem',
  });
  const topic = make('nnc:ordinary', noun, operation);
  assert.ok(host && topic);
  const context = runtime.buildClassicalNahuatlSupplementationContextRecord({
    kind: 'absolute-topic', referenceId: 'topic',
  });
  const discourse = runtime.buildClassicalNahuatlDiscourseSourceContextFrame({
    speakerGender: 'male', speakerGroupMembership: 'member',
  });
  const bonding = runtime.buildClassicalNahuatlSupplementationContextRecord({
    kind: 'male-bonding', referenceId: 'topic', discourseSourceContextFrame: discourse,
  });
  assert.equal(bonding.authorizationStatus, 'authorized');
  const whole = make('sentence:supplementation', {
    operationKind: 'relation',
    principalClause: runtime.buildClassicalNahuatlSupplementationClauseEnvelope(host, {referenceId: 'principal'}),
    supplementClause: runtime.buildClassicalNahuatlSupplementationClauseEnvelope(topic, {
      referenceId: 'topic', contextRecords: [context, bonding],
    }),
    options: {referenceMode: 'absolute-topic', headRole: 'subject', supplementContactRole: 'subject',
      order: 'supplement-first', adjunctor: 'none'},
  });
  assert.ok(whole);
  const sent = sender.requestFor(whole).serialized;
  assert.match(sent, /sentence:supplementation-context/);
  assert.match(sent, /sentence:discourse-source-context/);
  const receiver = (await bootPreview()).classicalPortableMake;
  const result = receiver.open(sender.addressFor(whole))?.canonicalResult;
  assert.ok(result);
  assert.equal(receiver.requestFor(result).serialized, sent);
  assert.deepEqual(result.supplementClause.contextRecords, whole.supplementClause.contextRecords);
});

test('a comparison Source can reissue a prior comparison with its own operand', async () => {
  const bootPreview = async () => (await createRuntimeInstance({
    portableMakeEnabled: true,
    documentObject: {getElementById: () => null, addEventListener() {}},
  })).runtimeObject;
  const runtime = await bootPreview();
  const sender = runtime.classicalPortableMake;
  const noun = (stem, sourceClass) => {
    const source = runtime.buildClassicalNahuatlOrdinaryNncSourceFrame({stem, sourceClass});
    const operation = runtime.buildClassicalNahuatlOrdinaryNncOperationFrame(source, {
      state: 'absolutive', subject: '3common',
    });
    return sender.make({operationId: 'nnc:ordinary', args: [source, operation]})?.canonicalResult;
  };
  const quality = noun('chicāhuac', 'zero');
  const base = noun('cal', 'tli-1');
  assert.ok(quality && base);
  const source = result => runtime.buildClassicalComparisonSourceUnit({sourceResult: result});
  const comparison = (routeId, slots, choices) => sender.make({
    operationId: 'clause:comparison', args: [{routeId, slots, choices}],
  })?.canonicalResult;
  const smaller = comparison('similarity-iuhqui-principal', {adjoined: source(quality)}, {
    icRelation: false, sentenceType: 'none',
  });
  assert.ok(smaller);
  const route = runtime.getClassicalComparisonRouteInventory().find(row => row.id === 'similarity-iuhqui-larger-concatenate');
  assert.ok(route);
  const slots = Object.fromEntries(route.requiredSlots.map(role => [role, source(base)]));
  slots.similarityClause = source(smaller);
  const larger = comparison(route.id, slots, {sentenceType: 'none'});
  assert.ok(larger);
  const sent = sender.requestFor(larger);
  assert.ok(sent.dependencies.includes(smaller));
  const recipient = (await bootPreview()).classicalPortableMake;
  const reopened = recipient.open(sender.addressFor(larger))?.canonicalResult;
  assert.ok(reopened);
  assert.equal(recipient.requestFor(reopened).serialized, sent.serialized);
  assert.equal(reopened.surface, larger.surface);
});

test('primitive adverbial Make preserves its supportive i and possessor', async () => {
  const bootPreview = async () => (await createRuntimeInstance({
    portableMakeEnabled: true,
    documentObject: {getElementById: () => null, addEventListener() {}},
  })).runtimeObject;
  const runtime = await bootPreview();
  const sender = runtime.classicalPortableMake;
  const recipient = (await bootPreview()).classicalPortableMake;
  const requests = [];
  for (const possessor of ['1sg', '2sg']) {
    const adverbialPotentialFrame = runtime.buildClassicalNahuatlPrimitiveAdverbialPotentialFrame({
      predicateKind: 'active-action', sourceStem: 'iyo-ā', verbClass: 'C',
      sourceValence: 'intransitive', sourceInitialISelection: 'supportive', possessor,
    });
    assert.equal(adverbialPotentialFrame.authorizationStatus, 'authorized');
    const result = sender.make({operationId: 'nnc:adverbial', args: [{adverbialPotentialFrame}]})?.canonicalResult;
    assert.ok(result);
    const sent = sender.requestFor(result).serialized;
    requests.push(sent);
    assert.match(sent, /"sourceInitialISelection":"supportive"/);
    const reopened = recipient.open(sender.addressFor(result))?.canonicalResult;
    assert.ok(reopened);
    assert.equal(recipient.requestFor(reopened).serialized, sent);
    assert.equal(reopened.wordSurface, result.wordSurface);
    assert.equal(reopened.adverbialPotentialFrame.primitiveAdverbialSourceFrame.nominalPredicateSourceFrame.possessor, possessor);
  }
  assert.notEqual(...requests);
});

test('an exact adverbial Source reissues its earlier compound noun', async () => {
  const bootPreview = async () => (await createRuntimeInstance({
    portableMakeEnabled: true,
    documentObject: {getElementById: () => null, addEventListener() {}},
  })).runtimeObject;
  const runtime = await bootPreview();
  const sender = runtime.classicalPortableMake;
  const noun = runtime.buildClassicalNahuatlOrdinaryNncSourceFrame({
    stem: 'īx-tla-pal', embedStem: 'īx', matrixStem: 'tla-pal', sourceClass: 'tli',
  });
  const operation = runtime.buildClassicalNahuatlOrdinaryNncOperationFrame(noun, {
    subject: '3common', state: 'absolutive',
  });
  const parent = sender.make({operationId: 'nnc:ordinary', args: [noun, operation]})?.canonicalResult;
  assert.ok(parent);
  const adverbialPotentialFrame = runtime.resolveClassicalNahuatlAdverbialPotential({canonicalSourceResult: parent});
  assert.equal(adverbialPotentialFrame.authorizationStatus, 'authorized');
  const result = sender.make({operationId: 'nnc:adverbial', args: [{adverbialPotentialFrame}]})?.canonicalResult;
  assert.ok(result);
  const sent = sender.requestFor(result);
  assert.deepEqual(sent.dependencies, [parent]);
  const recipient = (await bootPreview()).classicalPortableMake;
  const reopened = recipient.open(sender.addressFor(result))?.canonicalResult;
  assert.ok(reopened);
  const received = recipient.requestFor(reopened);
  assert.equal(received.serialized, sent.serialized);
  assert.equal(reopened.adverbialPotentialFrame.canonicalSourceResult, received.dependencies[0]);
  assert.equal(reopened.wordSurface, result.wordSurface);
});

test('lexicalized present-agentive Make preserves the exact grammatical ancestry', async () => {
  const bootPreview = async () => (await createRuntimeInstance({
    portableMakeEnabled: true,
    documentObject: {getElementById: () => null, addEventListener() {}},
  })).runtimeObject;
  const runtime = await bootPreview();
  const sender = runtime.classicalPortableMake;
  const make = (operationId, ...args) => sender.make({operationId, args})?.canonicalResult;
  const compound = make('vnc:derivational-operation', {
    sourceStem: 'tōna', verbClass: 'A', sourceValence: 'intransitive', objectKind: 'none', subject: '3sg',
    mood: 'indicative', tense: 'present', requestedDerivation: 'direct', requestedVoice: 'active',
    lateOperation: 'compound', lateVariant: 'connective-t', compoundMatrixStem: 'ya-uh', compoundMatrixClass: 'B',
    sourceObjectRequests: [], sentenceOptions: {outsidePrefixes: []},
  });
  assert.ok(compound);
  const parent = make('nnc:deverbal-construction', {
    constructionKind: 'predicate-nominalization', nominalizationKind: 'present-agentive',
    canonicalVncResult: compound, subject: '3sg', state: 'absolutive', animacy: 'animate',
  });
  assert.ok(parent);
  const source = runtime.buildClassicalNahuatlLexicalizedPresentNncSourceFrame(parent);
  const typedBinding = runtime.issueClassicalGrammarTypedSourceOperationBindingFrame(
    runtime.getClassicalGrammarApplicationCapabilityNavigator(source), 'nnc:ordinary', {
      state: 'absolutive', subject: '3sg', animacy: 'animate', humanness: 'nonhuman',
    },
  );
  const made = sender.make({typedBinding})?.canonicalResult;
  assert.ok(made);
  const sent = sender.requestFor(made);
  assert.match(sent.serialized, /nnc:lexicalized-present-source/);
  assert.deepEqual(sent.dependencies, [parent]);
  const recipient = await bootPreview();
  const reopened = recipient.classicalPortableMake.open(sender.addressFor(made))?.canonicalResult;
  assert.ok(reopened);
  const received = recipient.classicalPortableMake.requestFor(reopened);
  assert.equal(received.serialized, sent.serialized);
  assert.equal(recipient.getClassicalNahuatlLexicalizedPresentNncSourceParent(reopened.sourceFrame).canonicalResult,
    received.dependencies[0]);
});

test('portable requests preserve shared ancestry and repeated operand roles', async () => {
  const {decodePortableRequestGraph} = await import('../application/classical/portable_request_graph.mjs');
  const execute = ({operationId, args}) => ({
    authorizationStatus: 'authorized',
    canonicalResult: {operationId, args},
  });
  const sender = createPortableMake(execute);
  const make = (operationId, ...args) => sender.make({operationId, args})?.canonicalResult;
  const source = make('test:source', 'choice');
  const first = make('test:branch', source, 'first');
  const second = make('test:branch', source, 'second');
  const sent = make('test:whole', {principal: first, supplement: second, repeated: first});
  const address = sender.addressFor(sent);
  const entries = decodePortableRequestGraph(address);
  assert.equal(entries.length, 4);
  const {encodeBuildRequestSuffix} = await import('../application/classical/portable_build_request.mjs');
  const legacySuffix = encodeBuildRequestSuffix(entries);
  const legacyAddress = '84/p2/' + legacySuffix.match(/.{1,72}/g).join('/');
  assert.ok(address.length < legacyAddress.length);
  assert.deepEqual(decodePortableRequestGraph(legacyAddress), entries);
  assert.deepEqual(createPortableMake(execute).open(legacyAddress)?.canonicalResult, sent);

  const recipient = createPortableMake(execute);
  const received = recipient.open(address)?.canonicalResult;
  assert.ok(received);
  const [{principal, supplement, repeated}] = received.args;
  assert.equal(principal, repeated);
  assert.equal(principal.args[0], supplement.args[0]);
  assert.notEqual(principal, supplement);
  assert.deepEqual(recipient.requestFor(received).dependencies, [principal, supplement]);
  assert.equal(recipient.requestFor(received).serialized, sender.requestFor(sent).serialized);
});

test('a restored older address stays tied to its exact Result when portability is unavailable', async () => {
  const {readFileSync} = await import('node:fs');
  const {runInNewContext} = await import('node:vm');
  const {writePortableResultUrl} = await import('../application/classical/portable_result_url.mjs');
  const source = readFileSync(new URL('../ui/rendering/rendering.mjs', import.meta.url), 'utf8');
  const begin = source.indexOf('    let lastAddressedResult;');
  const end = source.indexOf('      const publish = (compact, recipe = null) => {', begin);
  assert.ok(begin >= 0 && end > begin);
  const panel = {dataset: {}};
  const location = {href: 'https://example.test/#classical/v1/vnc/_'};
  const browser = {location, history: {replaceState(_state, _title, href) { location.href = href; }}};
  const warnings = [];
  const {updateClassicalResultLink, restoredLegacyResultAddresses} = runInNewContext(
    source.slice(begin, end) + '\n }\n({updateClassicalResultLink, restoredLegacyResultAddresses})', {
      URL, writePortableResultUrl,
      setClassicalWholeCanvasActionStatus: message => warnings.push(message),
      targetObject: {classicalPortableMake: {addressFor: () => null}, document: {getElementById: () => panel}},
    },
  );
  const savedResult = {};
  const oldUrl = new URL('https://example.test/?r=sgr2/example');
  restoredLegacyResultAddresses.set(savedResult, oldUrl);
  updateClassicalResultLink(browser, savedResult);
  assert.equal(location.href, oldUrl.href);
  assert.equal(panel.dataset.classicalResultLinkStatus, 'legacy-restored');
  assert.deepEqual(warnings, []);

  updateClassicalResultLink(browser, {});
  assert.equal(new URL(location.href).searchParams.has('r'), false);
  assert.equal(panel.dataset.classicalResultLinkStatus, 'missing-portable-request');
  assert.equal(warnings.length, 1);
});

test('the nominal Source constructor preserves cardinal and compound choices', async () => {
  const bootPreview = async () => (await createRuntimeInstance({
    portableMakeEnabled: true,
    documentObject: {getElementById: () => null, addEventListener() {}},
  })).runtimeObject;
  const runtime = await bootPreview();
  const sender = runtime.classicalPortableMake;
  const recipient = (await bootPreview()).classicalPortableMake;
  const source = runtime.buildClassicalNahuatlNominalConstructionTypedSourceFrame({value: 3});
  const navigator = runtime.getClassicalGrammarApplicationCapabilityNavigator(source);
  const common = {countKind: 'ordinary', classifier: 'basic', animacy: 'animate', subject: '1pl'};
  const addresses = [];
  for (const selection of [common, {...common, ordinaryNumberVariant: 'zero'}]) {
    const typedBinding = runtime.issueClassicalGrammarTypedSourceOperationBindingFrame(
      navigator, 'grammar:nominal-construction', selection,
    );
    assert.equal(typedBinding?.bindingStatus, 'ready', typedBinding?.blockReason);
    const made = sender.make({typedBinding})?.canonicalResult;
    assert.ok(made);
    const address = sender.addressFor(made);
    addresses.push(address);
    const opened = recipient.open(address)?.canonicalResult;
    assert.ok(opened);
    assert.equal(recipient.requestFor(opened).serialized, sender.requestFor(made).serialized);
  }
  assert.notEqual(addresses[0], addresses[1]);
  const compound = runtime.buildClassicalNahuatlNominalConstructionTypedSourceFrame({
    stem: 'cin-teō', embedStem: 'cin', matrixStem: 'teō', sourceClass: 'tl',
  });
  const compoundNavigator = runtime.getClassicalGrammarApplicationCapabilityNavigator(compound);
  const typedBinding = runtime.issueClassicalGrammarTypedSourceOperationBindingFrame(
    compoundNavigator, 'grammar:nominal-construction',
    {embedUse: 'nounstem', embedSourceClass: 'tli-1', subject: '3sg', animacy: 'animate',
      state: 'absolutive', structure: 'linked-connective-t'},
  );
  assert.equal(typedBinding?.bindingStatus, 'ready', typedBinding?.blockReason);
  const made = sender.make({typedBinding})?.canonicalResult;
  assert.ok(made);
  const address = sender.addressFor(made);
  const opened = recipient.open(address)?.canonicalResult;
  assert.ok(opened);
  const received = recipient.requestFor(opened).serialized;
  assert.equal(received, sender.requestFor(made).serialized);
  assert.match(received, /"structure":"linked-connective-t"/);
});

test('prepared relational Make reissues its typed Source with constituted choices', async () => {
  const bootPreview = async () => (await createRuntimeInstance({
    portableMakeEnabled: true,
    documentObject: {getElementById: () => null, addEventListener() {}},
  })).runtimeObject;
  const runtime = await bootPreview();
  const sender = runtime.classicalPortableMake;
  const source = runtime.buildClassicalNahuatlRelationalNncTypedSourceFrame({
    state: 'possessive', possessorId: '1sg', subjectMode: 'adverbialized', subjectId: '3common',
    nounstem: {
      kind: 'classical-nahuatl-nnc-nounstem-request', stemId: 'tloc-proximity', formation: 'option-one',
      operation: 'relational-nnc', sourceKind: 'possessor', sourceFormation: 'plain-nounstem',
      sourceVoice: 'active', sourceMode: 'whole-stem', sourceStem: 'tloc', sourceMatrixStem: 'tloc',
      affective: 'none',
    },
  });
  const binding = runtime.issueClassicalGrammarTypedSourceOperationBindingFrame(
    runtime.getClassicalGrammarApplicationCapabilityNavigator(source), 'nnc:relational', {},
  );
  assert.equal(binding?.bindingStatus, 'ready', binding?.blockReason);
  const prepared = runtime.prepareClassicalGrammarApplicationRequest(binding);
  assert.ok(prepared);
  const result = sender.make(prepared.request, prepared)?.canonicalResult;
  assert.equal(result, prepared.canonicalResult);
  const sent = sender.requestFor(result).serialized;
  assert.match(sent, /nnc:relational-source/);
  const recipient = (await bootPreview()).classicalPortableMake;
  const reopened = recipient.open(sender.addressFor(result))?.canonicalResult;
  assert.ok(reopened);
  assert.equal(recipient.requestFor(reopened).serialized, sent);
  assert.equal(reopened.sourceFrame.possessorId, '1sg');

  const continued = sender.make({operationId: 'nnc:sentence-surface', args: [result.nncSlotFrame, {
    sentenceType: 'assertion',
  }]})?.canonicalResult;
  assert.ok(continued);
  const sentContinuation = sender.requestFor(continued);
  assert.deepEqual(sentContinuation.dependencies, [result]);
  const reopenedSentence = recipient.open(sender.addressFor(continued))?.canonicalResult;
  assert.ok(reopenedSentence);
  const receivedContinuation = recipient.requestFor(reopenedSentence);
  assert.equal(receivedContinuation.serialized, sentContinuation.serialized);
  assert.equal(reopenedSentence.sourceNncSlotFrame, receivedContinuation.dependencies[0].nncSlotFrame);
});

test('conflicting Result URL carriers cannot select a legacy fallback', async () => {
  const {readPortableResultUrl, writePortableResultUrl} = await import('../application/classical/portable_result_url.mjs');
  const runtime = createPortableMake(() => ({authorizationStatus: 'authorized', canonicalResult: {}}));
  const result = runtime.make({operationId: 'test:url', args: []})?.canonicalResult;
  const address = runtime.addressFor(result);
  const url = new URL('https://example.test/#classical/v1/vnc/_');
  assert.equal(writePortableResultUrl(url, address), true);
  assert.ok(runtime.open(readPortableResultUrl(url)));
  const conflicts = [
    `?r=sgr2/old&r=${address}`,
    `?r=${address}#result-v1=older`,
    `?r=${address}#r-data=another-payload`,
    '?r=sgr2/old#r-data=orphaned-payload',
    '#r-data=orphaned-payload',
    '?r=84/p2/',
  ];
  for (const suffix of conflicts) {
    const request = readPortableResultUrl(new URL('https://example.test/' + suffix));
    assert.equal(request, '84/p2/');
    assert.equal(runtime.open(request), null);
  }
});

test('a typed Make cannot commit before its request can be reissued', () => {
  const typedBinding = {operationId: 'test:typed'};
  let executions = 0;
  const sender = createPortableMake(() => {
    executions++;
    return {authorizationStatus: 'authorized', canonicalResult: {}};
  }, {
    describePortableTypedBinding: () => ({
      operationId: 'test:typed', inputIssuer: 'typed-issued-source-binding', args: ['source', {}],
    }),
    issuePortableTypedBinding: () => null,
  });
  assert.equal(sender.make({typedBinding}), null);
  assert.equal(executions, 0);
});

test('clause modifier requests replay through the shared controller with exact operands', async () => {
  const bootPreview = async () => (await createRuntimeInstance({
    portableMakeEnabled: true,
    documentObject: {getElementById: () => null, addEventListener() {}},
  })).runtimeObject;
  const runtime = await bootPreview();
  const sender = runtime.classicalPortableMake;
  const recipient = (await bootPreview()).classicalPortableMake;
  const make = (operationId, ...args) => sender.make({operationId, args})?.canonicalResult;
  const noun = (stem, sourceClass) => {
    const source = runtime.buildClassicalNahuatlOrdinaryNncSourceFrame({stem, sourceClass});
    const operation = runtime.buildClassicalNahuatlOrdinaryNncOperationFrame(source, {
      subject: '3common', state: 'absolutive', humanness: 'nonhuman', predicateFormation: 'source-stem',
    });
    return make('nnc:ordinary', source, operation);
  };
  const finite = make('vnc:application', {
    sourceStem: 'cochi', verbClass: 'B', sourceValence: 'intransitive', subject: '3sg',
    mood: 'indicative', tense: 'present', requestedVoice: 'active',
  });
  const adverb = make('nnc:adverbial', {
    adverbialPotentialFrame: runtime.buildClassicalNahuatlLexicalAdverbialPotentialFrame({stem: 'iuh'}),
  });
  const cases = [
    [noun('cal', 'tli-1'), noun('canāhuac', 'zero'),
      {relation: 'adjectival-modification', topology: 'ordinary', order: 'head-modifier', modifierAdjunctor: 'in'}],
    [finite, adverb, {relation: 'manner', degree: 'first', order: 'modifier-head'}],
  ];
  for (const [principal, adjoined, choices] of cases) {
    assert.ok(principal && adjoined, choices.relation);
    const controller = runtime.createClassicalClauseRelationController();
    controller.captureCurrentResult('principal', principal);
    controller.captureCurrentResult('adjoined', adjoined);
    const application = controller.compose(choices);
    assert.equal(application.authorizationStatus, 'authorized', application.blockReason);
    const made = application.canonicalResult;
    const sent = sender.requestFor(made);
    assert.ok(sent.dependencies.includes(principal));
    assert.ok(sent.dependencies.includes(adjoined));
    const reopened = recipient.open(sender.addressFor(made))?.canonicalResult;
    assert.ok(reopened, choices.relation);
    assert.equal(recipient.requestFor(reopened).serialized, sent.serialized);
  }
});

test('both adverbial particle ingress paths replay the Owner packet', async () => {
  const {createConstructionSession} = await import('../ui/composition/construction_session.mjs');
  const {executeConstructionPacket} = await import('../ui/composition/construction_packet.mjs');
  const {createParticleOperationScope, issueParticleOperationSnapshot, projectParticleOperationExecution} =
    await import('../ui/composition/particle_operation_transaction.mjs');
  const bootPreview = async () => (await createRuntimeInstance({
    portableMakeEnabled: true,
    documentObject: {getElementById: () => null, addEventListener() {}},
  })).runtimeObject;
  const runtime = await bootPreview();
  const engine = runtime.classicalPortableMake;
  const recipient = (await bootPreview()).classicalPortableMake;
  const make = (operationId, ...args) => engine.make({operationId, args})?.canonicalResult;
  const finite = make('vnc:application', {
    sourceStem: 'cochi', verbClass: 'B', sourceValence: 'intransitive',
    subject: '3sg', mood: 'indicative', tense: 'present',
  });
  const host = make('vnc:sentence-result', finite);
  const particleId = 'l3-no-adverbial';
  const particle = make('particle:result', runtime.buildClassicalNahuatlParticleSourceFrame(particleId));
  assert.ok(host && particle);
  const operationId = 'sentence:adverbial-adjunction';
  const hostBinding = runtime.issueClassicalNahuatlParticleSentenceBindingFrame(operationId, host);
  const particleBinding = runtime.issueClassicalNahuatlParticleSentenceBindingFrame(operationId, particle);
  for (const [source, options, parents] of [
    [particle, {binding: particleBinding, hostBinding}, [host, particle]],
    [host, {binding: hostBinding, intent: {adverbialId: particleId}}, [host]],
  ]) {
    const ingress = {};
    const session = createConstructionSession({isSource: candidate => candidate === source});
    const scope = createParticleOperationScope({owner: runtime, source, operationId, session, getIngress: () => ingress});
    const snapshot = issueParticleOperationSnapshot(scope, {ingress, ...options});
    assert.equal(snapshot?.contract.ready, true, snapshot?.contract.blockReason);
    const packet = projectParticleOperationExecution(snapshot);
    assert.ok(packet);
    const result = executeConstructionPacket(runtime, packet)?.canonicalResult;
    assert.ok(result);
    const sent = engine.requestFor(result);
    assert.deepEqual(new Set(sent.dependencies), new Set(parents));
    const opened = recipient.open(engine.addressFor(result))?.canonicalResult;
    assert.ok(opened);
    assert.equal(recipient.requestFor(opened).serialized, sent.serialized);
  }
});

test('a prepared noun envelope keeps the exact internal sentence when changing force', async () => {
  const {prepareConstructionNncEnvelope} = await import('../ui/composition/construction_layers.mjs?v=20261023-conjunct-edit-1&interfaceRelease=1.2.36&ownerDecision=20261031-1');
  const {executeConstructionPacket} = await import('../ui/composition/construction_packet.mjs');
  const bootPreview = async () => (await createRuntimeInstance({
    portableMakeEnabled: true,
    documentObject: {getElementById: () => null, addEventListener() {}},
  })).runtimeObject;
  const runtime = await bootPreview();
  const sender = runtime.classicalPortableMake;
  const source = runtime.buildClassicalNahuatlOrdinaryNncSourceFrame({stem: 'pil'});
  const binding = runtime.issueClassicalGrammarTypedSourceOperationBindingFrame(
    runtime.getClassicalGrammarApplicationCapabilityNavigator(source), 'nnc:ordinary',
    {subject: '1sg', state: 'absolutive'},
  );
  const prepared = runtime.prepareClassicalGrammarApplicationRequest(binding);
  assert.ok(prepared);
  const envelope = prepareConstructionNncEnvelope(runtime, prepared, {
    sentenceType: 'wish', polarity: 'negative',
  }, {adverbialId: 'l3-oc'});
  assert.equal(envelope.ready, true, envelope.blockReason);
  const result = executeConstructionPacket(runtime, {
    kind: 'typed', operation: 'nnc:ordinary', source, binding, prepared,
    preparedSentence: envelope.preparedSentence, preparedLayers: envelope.layers.preparedLayers,
  })?.canonicalResult;
  assert.ok(result);
  const sent = sender.requestFor(result);
  assert.match(sender.requestFor(sent.dependencies[0]).serialized, /nnc:accepted-result-sentence/);
  const recipient = (await bootPreview()).classicalPortableMake;
  const reopened = recipient.open(sender.addressFor(result))?.canonicalResult;
  assert.ok(reopened);
  const received = recipient.requestFor(reopened);
  assert.equal(received.serialized, sent.serialized);
  assert.equal(recipient.requestFor(received.dependencies[0]).serialized,
    sender.requestFor(sent.dependencies[0]).serialized);
});

test('the generated denominal path keeps both ordered operations and classes', async () => {
  const bootPreview = async () => (await createRuntimeInstance({
    portableMakeEnabled: true,
    documentObject: {getElementById: () => null, addEventListener() {}},
  })).runtimeObject.classicalPortableMake;
  const sender = await bootPreview();
  const first = 'included-possessor-ti';
  const second = 'ti-a-causative-single';
  const request = {operationId: 'vnc:denominal', args: [{
    nounStem: 'pan', sourceNounClass: 'zero', sourceKind: 'possessive-nnc-predicate',
    sourceState: 'possessive', possessor: '3common', operationId: second,
    operationPath: [first, second], classChoices: {[first]: 'A', [second]: 'C'},
    classChoice: 'C', objectPeople: ['non-specific-nonhuman'],
    subject: '1sg', mood: 'indicative', tense: 'present',
  }]};
  const made = sender.make(request)?.canonicalResult;
  assert.ok(made);
  const sent = sender.requestFor(made).serialized;
  assert.match(sent, /"operationPath":\["included-possessor-ti","ti-a-causative-single"\]/);
  const recipient = await bootPreview();
  const reopened = recipient.open(sender.addressFor(made))?.canonicalResult;
  assert.ok(reopened);
  assert.equal(recipient.requestFor(reopened).serialized, sent);
  assert.equal(reopened.operationFrame.sourceFrame.priorOperationFrame.sourceFrame.possessorPerson, '3common');
  assert.equal(reopened.surfaceRealization, made.surfaceRealization);
});

test('legacy verb workspace replay registers a portable continuation parent', async () => {
  const {readFileSync} = await import('node:fs');
  const {runInNewContext} = await import('node:vm');
  const bootPreview = async () => (await createRuntimeInstance({
    portableMakeEnabled: true,
    documentObject: {getElementById: () => null, addEventListener() {}},
  })).runtimeObject;
  const original = await bootPreview();
  const root = original.classicalPortableMake.make({operationId: 'vnc:application', args: [{
    sourceStem: 'nemi', verbClass: 'B', sourceValence: 'intransitive',
    subject: '3sg', mood: 'indicative', tense: 'present',
  }]})?.canonicalResult;
  assert.ok(root);
  const savedRecipe = original.exportClassicalNahuatlVncApplicationRecipe(root);
  assert.ok(savedRecipe);
  const receiver = await bootPreview();
  const source = readFileSync(new URL('../ui/rendering/rendering.mjs', import.meta.url), 'utf8');
  const start = source.indexOf('      const replayRecipe = (recipe, reusedSteps');
  const end = source.indexOf('      let replayed, sourceResults;', start);
  assert.ok(start >= 0 && end > start);
  const replay = runInNewContext(source.slice(start, end) + '\nreplayRecipe', {targetObject: receiver});
  const parent = replay(savedRecipe)?.at(-1)?.canonicalResult;
  assert.ok(parent);
  const make = receiver.classicalPortableMake;
  assert.ok(make.addressFor(parent));
  const next = make.make({operationId: 'vnc:sentence-result', args: [parent]})?.canonicalResult;
  assert.ok(next);
  assert.deepEqual(make.requestFor(next).dependencies, [parent]);
});

test('prepared denominal Make reissues its stem preparation with the same nominal Source', async () => {
  const {executeConstructionPacket} = await import('../ui/composition/construction_packet.mjs');
  const bootPreview = async () => (await createRuntimeInstance({
    portableMakeEnabled: true,
    documentObject: {getElementById: () => null, addEventListener() {}},
  })).runtimeObject;
  const runtime = await bootPreview();
  const sender = runtime.classicalPortableMake;
  const source = runtime.buildClassicalNahuatlOrdinaryNncSourceFrame({stem: 'xō', sourceClass: 'tl'});
  const operation = 'vnc:denominal';
  const derivation = 'inceptive-hui';
  const preparation = runtime.issueClassicalNahuatlDenominalVerbalStemPreparation(
    source, {operationId: derivation, stemShape: 'short'},
  );
  const prepared = runtime.prepareClassicalGrammarApplicationRequest({operationId: operation, args: [{
    canonicalNncSourceFrame: source, verbalStemPreparationFrame: preparation,
    operationId: derivation, operationPath: [derivation],
    classChoice: 'B', classChoices: {[derivation]: 'B'},
    subject: '3sg', mood: 'indicative', tense: 'present',
  }]});
  assert.ok(prepared);
  const made = executeConstructionPacket(runtime, {
    kind: 'request', operation, source, prepared, request: prepared.request,
  })?.canonicalResult;
  assert.ok(made);
  assert.equal(made.sourceFrame.verbalStemPreparationFrame, preparation);
  const sent = sender.requestFor(made).serialized;
  assert.match(sent, /vnc:denominal-stem-preparation/);
  const recipient = (await bootPreview()).classicalPortableMake;
  const reopened = recipient.open(sender.addressFor(made))?.canonicalResult;
  assert.ok(reopened);
  assert.equal(recipient.requestFor(reopened).serialized, sent);
  const rebuiltPreparation = reopened.sourceFrame.verbalStemPreparationFrame;
  assert.notEqual(rebuiltPreparation, preparation);
  assert.equal(rebuiltPreparation.canonicalNncSourceFrame, reopened.sourceFrame.canonicalNncSourceFrame);
  assert.equal(reopened.surfaceRealization, made.surfaceRealization);
  for (const [parent, issuer] of [
    [made, null],
    [made.canonicalVncFrame, 'vnc:accepted-denominal-application'],
    [made.canonicalVncFrame.resultFrame, 'vnc:accepted-result-nucleus'],
  ]) {
    const binding = runtime.issueClassicalNahuatlVncContinuationBindingFrame(
      'vnc:sentence-result', parent, {punctuationMode: 'statement'},
    );
    assert.equal(binding?.bindingStatus, 'ready', binding?.blockReason);
    const sentence = executeConstructionPacket(runtime, {
      kind: 'request', operation: binding.operationId, source: parent,
      request: {operationId: binding.operationId, args: binding.executionArgs},
    })?.canonicalResult;
    assert.ok(sentence);
    const reopenedSentence = recipient.open(sender.addressFor(sentence))?.canonicalResult;
    assert.ok(reopenedSentence);
    const receivedSentence = recipient.requestFor(reopenedSentence);
    assert.equal(receivedSentence.serialized, sender.requestFor(sentence).serialized);
    const [reopenedParent] = receivedSentence.dependencies;
    assert.equal(recipient.requestFor(reopenedParent).serialized, sent);
    if (issuer) assert.ok(receivedSentence.serialized.includes(issuer));
    assert.equal(reopenedSentence.sentenceFormulaDisplay, sentence.sentenceFormulaDisplay);
  }
});

test('an exact continuation argument list retains its own choices when bindings share arguments', async () => {
  const {describePortableContinuation, recordPortableContinuation} =
    await import('../application/classical/portable_build_request.mjs');
  const parent = {};
  const operationId = 'vnc:sentence-result';
  const issue = reading => {
    const executionArgs = Object.freeze([parent]);
    recordPortableContinuation({
      bindingStatus: 'ready', operationId, executionArgs, exactInputResult: parent,
      callerSelections: {reading}, additionalResultFrames: {},
    });
    return executionArgs;
  };
  const first = issue('subject');
  const second = issue('object');
  assert.deepEqual(describePortableContinuation({operationId, args: first}).args[1], {reading: 'subject'});
  assert.deepEqual(describePortableContinuation({operationId, args: second}).args[1], {reading: 'object'});
  assert.throws(() => describePortableContinuation({operationId, args: [parent]}), /Ambiguous/);
});

test('the shared Make packet only accepts results with a portable request in the preview', async () => {
  const {executeConstructionPacket, requirePortableMakeResult} = await import('../ui/composition/construction_packet.mjs');
  const canonicalResult = {};
  const applicationResult = {authorizationStatus: 'authorized', canonicalResult};
  const portable = createPortableMake(() => applicationResult);
  const runtime = {
    classicalPortableMake: portable,
    captureClassicalGrammarApplicationResult: () => ({applicationResult}),
  };
  const packet = {
    kind: 'clause', captures: [], choices: {},
    controller: {compose: () => applicationResult},
  };
  const {readFileSync} = await import('node:fs');
  const {runInNewContext} = await import('node:vm');
  const renderer = readFileSync(new URL('../ui/rendering/rendering.mjs', import.meta.url), 'utf8');
  const first = renderer.indexOf('    function acceptClassicalPortableResult');
  const last = renderer.indexOf('    function continueClassicalCompositionAsSource', first);
  assert.ok(first >= 0 && last > first);
  let history = 0;
  let cancelled = 0;
  let accepted = null;
  let published = null;
  runtime.completeClassicalGrammarWorkspaceUserAction = () => history++;
  runtime.cancelClassicalGrammarWorkspaceUserAction = () => cancelled++;
  const directCompose = runInNewContext(renderer.slice(first, last) + '\ncomposeClassicalClauseRelationFromUserAction', {
    targetObject: runtime,
    requirePortableMakeResult,
    ClassicalConstructionSession: {restore: result => { accepted = result; }},
    scheduleClassicalVncReloadSave() { published = portable.addressFor(accepted); },
    syncClassicalGrammarWorkspaceHistory() {},
  });
  assert.equal(executeConstructionPacket(runtime, packet)?.blockReason, 'portable-make-request-required');
  assert.equal(directCompose(packet.controller, {}).blockReason, 'portable-make-request-required');
  assert.equal(cancelled, 1);
  assert.equal(accepted, null);
  assert.equal(published, null);
  assert.equal(portable.make({operationId: 'clause:fixture', args: []}), applicationResult);
  assert.equal(executeConstructionPacket(runtime, packet), applicationResult);
  assert.equal(directCompose(packet.controller, {}), applicationResult);
  assert.equal(history, 1);
  assert.equal(accepted, canonicalResult);
  assert.equal(published, portable.addressFor(canonicalResult));
  assert.ok(published);
});

test('Make and replay reject an Owner that changes a prepared choice', () => {
  let executions = 0;
  const request = {operationId: 'test:prepared', args: [{reading: 'subject'}]};
  const prepared = {request};
  const engine = reading => createPortableMake(() => {
    executions++;
    return {authorizationStatus: 'authorized', canonicalResult: {}};
  }, {
    describePortablePreparation: application => ({...application, inputIssuer: 'prepared-application'}),
    reissuePortablePreparation: application => ({
      request: {...application, args: [{reading}]},
    }),
    describeReissuedPlan: plan => ({...plan.request, inputIssuer: 'prepared-application'}),
  });
  const changed = engine('object');
  assert.equal(changed.make(request, prepared), null);
  assert.equal(executions, 0);

  const sender = engine('subject');
  const result = sender.make(request, prepared)?.canonicalResult;
  assert.ok(result);
  assert.equal(executions, 1);
  assert.equal(changed.open(sender.addressFor(result)), null);
  assert.equal(executions, 1);
});

test('Owner-issued Source instructions and the shared replay registry agree', async () => {
  const {readdir, readFile} = await import('node:fs/promises');
  const roots = [
    new URL('../application/classical/', import.meta.url),
    new URL('../core/', import.meta.url),
  ];
  const records = new Set();
  for (const root of roots) {
    const entries = await readdir(root, {withFileTypes: true, recursive: true});
    for (const entry of entries) {
      if (!entry.isFile() || !entry.name.endsWith('.mjs')) continue;
      const code = await readFile(entry.parentPath + '/' + entry.name, 'utf8');
      for (const match of code.matchAll(/\brecordPortableSource\(\s*[^,\n]+,\s*['"]([^'"]+)['"]/g)) {
        records.add(match[1]);
      }
    }
  }
  const code = await readFile(new URL('../application/classical/portable_make.mjs', import.meta.url), 'utf8');
  const registry = code.slice(code.indexOf('const sourceIssuers = new Map(['), code.indexOf('  function issueContinuation'));
  const constructors = Array.from(registry.matchAll(/\[['"]([^'"]+)['"],\s*args\s*=>/g), match => match[1]);
  const projections = code.slice(code.indexOf('const resultProjections = new Map(['),
    code.indexOf('  const sourceIssuers = new Map(['));
  const projectionIds = Array.from(projections.matchAll(/(?:\[|= )'((?:nnc|vnc):accepted-[^']+)'/g),
    match => match[1]);
  for (const issuer of projectionIds) {
    assert.ok(!records.has(issuer), issuer);
    records.add(issuer);
    constructors.push(issuer);
  }
  assert.ok(constructors.length > 0);
  assert.equal(new Set(constructors).size, constructors.length, 'Duplicate replay constructor ID');
  assert.deepEqual(new Set(constructors), records);
  const {runtimeObject: runtime} = await createRuntimeInstance({
    portableMakeEnabled: true,
    documentObject: {getElementById: () => null, addEventListener() {}},
  });
  for (const [, capability] of registry.matchAll(/\bruntime\.(\w+)(?:\?\.)?\(/g)) {
    assert.equal(typeof runtime[capability], 'function', capability);
  }
});

test('direct replay rejects a Source reissued with a different choice', async () => {
  const {recordPortableSource} = await import('../application/classical/portable_build_request.mjs');
  const issue = reading => {
    const source = Object.freeze({reading});
    recordPortableSource(source, 'test:source', [reading]);
    return source;
  };
  let executions = 0;
  const engine = reissue => createPortableMake(({args: [source]}) => {
    executions++;
    return {authorizationStatus: 'authorized', canonicalResult: {source}};
  }, {issuePortableSource: (_issuer, [reading]) => issue(reissue(reading))});

  const source = issue('subject');
  const sender = engine(reading => reading);
  const made = sender.make({operationId: 'test:direct', args: [source]})?.canonicalResult;
  assert.equal(made?.source, source);
  const address = sender.addressFor(made);
  const recipient = engine(reading => reading);
  assert.equal(recipient.open(address)?.canonicalResult.source.reading, 'subject');
  assert.equal(engine(() => 'object').open(address), null);
  assert.equal(executions, 2);
});

test('a nominally composed verbal matrix retains both exact inputs through Make and Share', async () => {
  const {executeConstructionPacket} = await import('../ui/composition/construction_packet.mjs');
  const bootPreview = async () => (await createRuntimeInstance({
    portableMakeEnabled: true,
    documentObject: {getElementById: () => null, addEventListener() {}},
  })).runtimeObject;
  const runtime = await bootPreview();
  const sender = runtime.classicalPortableMake;
  const make = (operationId, ...args) => sender.make({operationId, args})?.canonicalResult;
  const nounSource = runtime.buildClassicalNahuatlOrdinaryNncSourceFrame({stem: 'pil', sourceClass: 'tli-1'});
  const noun = make('nnc:ordinary', nounSource,
    runtime.buildClassicalNahuatlOrdinaryNncOperationFrame(nounSource, {
      state: 'absolutive', subject: '3sg', predicateFormation: 'source-stem', humanness: 'human',
    }));
  const finite = {subject: '3sg', mood: 'indicative', tense: 'present'};
  const matrix = make('vnc:application', {...finite, sourceStem: 'caqui', verbClass: 'B',
    sourceValence: 'specific-projective', objectKind: 'specific-projective', objectPerson: '3sg',
    requestedDerivation: 'direct', requestedVoice: 'active'});
  assert.ok(noun && matrix);
  const operation = 'grammar:nominal-construction';
  const request = {operationId: operation, args: [{...finite, constructionKind: 'nominal-embed-vnc',
    relation: 'object', route: 'object', voice: 'active', embedReduplication: 'none',
    matrixFormation: 'ordinary', matrixReduplication: 'none', orientation: 'not-applicable',
    source: {
      embedStem: 'pil', embedClass: 'tli', embedSourceClass: 'tli-1',
      embedConstituent: {kind: 'ordinary-nnc', stem: 'pil', resultFrame: noun},
      matrixStem: 'caqui', matrixValence: 'specific-projective', matrixVerbClass: 'B',
      matrixConstituent: {kind: 'vnc-result', stem: 'caqui', resultFrame: matrix},
    },
  }]};
  const made = executeConstructionPacket(runtime, {kind: 'request', operation, request})?.canonicalResult;
  assert.ok(made);
  const sent = sender.requestFor(made);
  assert.ok(sent.dependencies[0] === noun && sent.dependencies[1] === matrix);
  const recipient = (await bootPreview()).classicalPortableMake;
  const reopened = recipient.open(sender.addressFor(made))?.canonicalResult;
  assert.ok(reopened);
  const received = recipient.requestFor(reopened);
  assert.equal(received.serialized, sent.serialized);
  assert.deepEqual(received.dependencies.map(dependency => recipient.requestFor(dependency).serialized),
    sent.dependencies.map(dependency => sender.requestFor(dependency).serialized));
  assert.equal(reopened.surfaceRealization, made.surfaceRealization);
  const binding = runtime.issueClassicalNahuatlVncContinuationBindingFrame(
    'vnc:sentence-result', made.canonicalResult, {punctuationMode: 'statement'},
  );
  assert.equal(binding?.bindingStatus, 'ready', binding?.blockReason);
  const sentence = make('vnc:sentence-result', ...binding.executionArgs);
  assert.ok(sentence);
  const sharedSentence = sender.requestFor(sentence);
  assert.ok(sharedSentence.serialized.includes('vnc:accepted-nominal-verb-application'));
  assert.ok(sharedSentence.dependencies[0] === made);
  const address = sender.addressFor(sentence);
  for (const sentenceRecipient of [recipient, (await bootPreview()).classicalPortableMake]) {
    const reopenedSentence = sentenceRecipient.open(address)?.canonicalResult;
    assert.ok(reopenedSentence);
    assert.equal(sentenceRecipient.requestFor(reopenedSentence).serialized, sharedSentence.serialized);
    assert.equal(reopenedSentence.sentenceFormulaDisplay, sentence.sentenceFormulaDisplay);
  }
});

test('the shared request codec preserves grammar labels and requires issuance for classical frames', async () => {
  const {encodePortableBuildRequest, decodePortableBuildRequest} =
    await import('../application/classical/portable_build_request.mjs');
  const request = {operationId: 'test:grammar', args: [{kind: 'owner-defined-constituent', stem: 'pil'}]};
  assert.deepEqual(decodePortableBuildRequest(encodePortableBuildRequest(request)), request);
  assert.equal(encodePortableBuildRequest({
    ...request, args: [{kind: 'classical-nahuatl-vnc-application-frame', stem: 'pil'}],
  }), null);
  assert.equal(encodePortableBuildRequest({
    ...request, args: [{kind: 'owner-defined-constituent', authorizationStatus: 'authorized'}],
  }), null);
});

test('Make and Share preserve shared literal arguments without merging equal choices', async () => {
  const {executeConstructionPacket, freezeConstructionData} = await import('../ui/composition/construction_packet.mjs');
  const operationId = 'test:shared-literals';
  const createEngine = () => createPortableMake(({args: [first, second, third, fourth]}) => ({
    authorizationStatus: 'authorized',
    canonicalResult: {
      sameRecord: first === second,
      distinctRecords: first !== third,
      sameList: first.items === third.items && first.items === fourth,
      bare: Object.getPrototypeOf(first) === null,
    },
  }));
  const list = ['possessive', '3sg'];
  const shared = Object.assign(Object.create(null), {items: list});
  const sender = createEngine();
  const made = executeConstructionPacket({classicalPortableMake: sender}, freezeConstructionData({
    kind: 'request', operation: operationId,
    request: {operationId, args: [shared, shared, {items: list}, list]},
  }))?.canonicalResult;
  assert.deepEqual(made, {sameRecord: true, distinctRecords: true, sameList: true, bare: true});
  const recipient = createEngine();
  const reopened = recipient.open(sender.addressFor(made))?.canonicalResult;
  assert.deepEqual(reopened, made);
  assert.equal(recipient.requestFor(reopened).serialized, sender.requestFor(made).serialized);
});

test('a legacy typed impersonal recipe can issue a portable continuation parent', async () => {
  const {exportClassicalResultReloadRecipe, replayClassicalResultReloadRecipe} =
    await import('../application/classical/result_reload.mjs');
  const bootRuntime = async portableMakeEnabled => (await createRuntimeInstance({
    portableMakeEnabled,
    documentObject: {getElementById: () => null, addEventListener() {}},
  })).runtimeObject;
  const stock = await bootRuntime(false);
  const source = stock.requestClassicalVncApplicationResult({
    sourceStem: 'nemi', verbClass: 'B', sourceValence: 'intransitive',
    subject: '3sg', mood: 'indicative', tense: 'present',
  }).resultFrame.sourceMachineryFrame;
  const request = {
    requestedDerivation: 'direct', requestedVoice: 'impersonal',
    nonactiveOptionId: 'tla-impersonal', tense: 'present',
  };
  const typed = stock.issueClassicalNahuatlVncTypedSourceApplicationBindingFrame(source, request);
  const original = stock.executeClassicalGrammarApplicationRequest({
    operationId: 'vnc:application', args: [typed],
  })?.canonicalResult;
  assert.ok(original);
  const legacy = structuredClone(exportClassicalResultReloadRecipe(stock, {result: original}));
  const step = legacy.nodes.at(-1).recipe.steps.at(-1);
  step.operationId = 'vnc:typed-impersonal';
  const {requestedDerivation, requestedVoice, nonactiveOptionId, subject, mood, tense} = typed.effectiveSelections;
  step.request = {requestedDerivation, requestedVoice, nonactiveOptionId, subject, mood, tense};

  const runtime = await bootRuntime(true);
  const parent = replayClassicalResultReloadRecipe(runtime, legacy, {recordPortableRequests: true})?.result;
  assert.ok(parent);
  const sender = runtime.classicalPortableMake;
  const sentence = sender.make({operationId: 'vnc:sentence-result', args: [parent]})?.canonicalResult;
  assert.ok(sentence);
  assert.match(sender.requestFor(parent).serialized, /vnc:typed-application-binding/);
  const recipient = (await bootRuntime(true)).classicalPortableMake;
  const reopened = recipient.open(sender.addressFor(sentence))?.canonicalResult;
  assert.ok(reopened);
  assert.equal(recipient.requestFor(reopened).serialized, sender.requestFor(sentence).serialized);
  assert.equal(reopened.sentenceFormulaDisplay, sentence.sentenceFormulaDisplay);
});

test('name reranking shares the prepared name and exact place operation together', async () => {
  const {createConstructionSession} = await import('../ui/composition/construction_session.mjs');
  const {createPersonalNameScope, issuePersonalNameSnapshot, projectPersonalNameExecution} =
    await import('../ui/composition/personal_name_transaction.mjs');
  const {executeConstructionPacket} = await import('../ui/composition/construction_packet.mjs');
  const boot = async () => (await createRuntimeInstance({
    portableMakeEnabled: true,
    documentObject: {getElementById: () => null, addEventListener() {}},
  })).runtimeObject;
  const runtime = await boot();
  const clause = runtime.buildPersonalNameInnerClauseFrame({
    sourceFamily: 'absolutive-state-nnc', subjectPrefix: 'Ø', subjectConnector: 'Ø',
    predicateMorphs: ['Xip', 'e'], numberPrefix: '⎕', numberSuffix: 'Ø',
  });
  const source = runtime.buildPersonalNameNncSourceFrame({
    sourceFamily: 'absolutive-state-nnc', clauses: [clause], referentKind: 'god',
  });
  const ingress = {};
  const sourceContext = {source, ingress, committed: true};
  const scope = createPersonalNameScope({
    owner: runtime, source, session: createConstructionSession({isSource: value => value === source}),
    getIngress: () => ingress, getSourceContext: () => sourceContext,
  });
  const snapshot = issuePersonalNameSnapshot(scope, {
    ingress, sourceContext, request: {sourceFrame: source, outerSubject: '3sg'},
    sentence: {operation: 'god-name-to-place-name-embed', locativeMatrix: 'tlā-n'},
  });
  const packet = projectPersonalNameExecution(snapshot);
  assert.ok(packet);
  const made = executeConstructionPacket(runtime, packet)?.canonicalResult;
  assert.ok(made);
  const sender = runtime.classicalPortableMake;
  const sent = sender.requestFor(made);
  assert.ok(sent.dependencies[0] === snapshot.contract.namePreview);
  assert.match(sent.serialized, /"outputKind":"sentence-operation"/);
  const recipient = (await boot()).classicalPortableMake;
  const reopened = recipient.open(sender.addressFor(made))?.canonicalResult;
  assert.ok(reopened);
  const received = recipient.requestFor(reopened);
  assert.equal(received.serialized, sent.serialized);
  assert.ok(reopened.personalNameResult === received.dependencies[0]);
  assert.equal(recipient.requestFor(received.dependencies[0]).serialized,
    sender.requestFor(sent.dependencies[0]).serialized);
});

test('the application Owner supplies replay instructions for its internal continuation slots', async () => {
  const {portableSourceIssuer} = await import('../application/classical/portable_build_request.mjs');
  const boot = async () => (await createRuntimeInstance({
    portableMakeEnabled: true,
    documentObject: {getElementById: () => null, addEventListener() {}},
  })).runtimeObject;
  const runtime = await boot();
  const sender = runtime.classicalPortableMake;
  const verb = sender.make({operationId: 'vnc:application', args: [{
    sourceStem: 'nemi', verbClass: 'B', sourceValence: 'intransitive',
    subject: '3sg', mood: 'indicative', tense: 'present',
  }]})?.canonicalResult;
  assert.ok(verb);
  const issuer = 'grammar:accepted-continuation-source';
  const slots = runtime.getClassicalGrammarApplicationPortableContinuations(verb);
  const projection = slots.find(({source}) => portableSourceIssuer(source) === issuer
    && runtime.executeClassicalGrammarApplicationRequest({operationId: 'vnc:diagram', args: [source]})
      ?.authorizationStatus === 'authorized');
  assert.ok(projection);
  const {source, path} = projection;
  assert.equal(path.reduce((value, field) => value[field], verb), source);
  const diagram = sender.make({operationId: 'vnc:diagram', args: [source]})?.canonicalResult;
  assert.ok(diagram);
  const sent = sender.requestFor(diagram);
  assert.ok(sent.dependencies[0] === verb);
  assert.ok(sent.serialized.includes(issuer));
  assert.ok(sent.serialized.includes(JSON.stringify(path)));

  const fresh = await boot();
  const receiver = fresh.classicalPortableMake;
  const reopened = receiver.open(sender.addressFor(diagram))?.canonicalResult;
  assert.ok(reopened);
  assert.equal(receiver.requestFor(reopened).serialized, sent.serialized);
  const [parent] = receiver.requestFor(reopened).dependencies;
  assert.equal(receiver.requestFor(parent).serialized, sender.requestFor(verb).serialized);
  const {decodePortableRequestGraph, encodePortableRequestGraph} =
    await import('../application/classical/portable_request_graph.mjs');
  const entries = decodePortableRequestGraph(sender.addressFor(diagram));
  const withField = field => {
    const modified = structuredClone(entries);
    const root = modified.at(-1);
    const request = JSON.parse(root[0]);
    request.args[0].$issue[2][1] = field;
    root[0] = JSON.stringify(request);
    return encodePortableRequestGraph(modified);
  };
  const previousLink = withField(slots.indexOf(projection));
  const olderRecipient = (await boot()).classicalPortableMake;
  assert.ok(olderRecipient.open(previousLink)?.canonicalResult);
  assert.equal(olderRecipient.open(withField([...path, 'unissued'])), null);
});
