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
  for (const result of [noun, finite, particle]) {
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
      choices: {state: 'absolutive', subject: '3sg', animacy: 'animate', humanness: 'human'},
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

test('typed finite Make reissues imperfective, preformed, and nonactive lexical Sources', async () => {
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
  const sentenceBinding = runtime.issueClassicalNahuatlVncContinuationBindingFrame(
    'vnc:sentence-result', parent, {punctuationMode: 'statement'},
  );
  const sentence = runtime.prepareClassicalGrammarApplicationRequest(sentenceBinding);
  assert.ok(sentence);
  const result = make.make(sentence.request, sentence)?.canonicalResult;
  assert.ok(result);
  assert.equal(result, sentence.canonicalResult);
  const sent = make.requestFor(result);
  assert.match(sent.serialized, /vnc-continuation/);
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
  const {buildDoubleNucleusEditRequest} = await import('../application/classical/double_nucleus_edit.mjs');
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
  const replacement = noun('zenāchacuīcuēhua');
  const edit = buildDoubleNucleusEditRequest(runtime, whole, 'supplement', replacement);
  assert.ok(edit);
  const made = make('nnc:deverbal-construction', edit);
  assert.ok(made);
  const sent = sender.requestFor(made);
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
