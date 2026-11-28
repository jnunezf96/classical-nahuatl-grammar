import {resolveResultEditTarget} from '../../ui/composition/result_editing.mjs';
import {buildDoubleNucleusEditRequest} from "./double_nucleus_edit.mjs";
import {buildClassicalNahuatlParticipantFrame} from '../../core/classical/participant_frame.mjs?ownerDecision=20261031-2';
import {buildClassicalResultOutputScopeSelectionFrame} from '../../core/output/scope.mjs';
import {describePortableContinuation, encodePortableBuildRequest, getPortablePreparedInput, hasPortableSource, markPortableResult, portableSourceIssuer, recordPortableSource} from './portable_build_request.mjs';
import {
  collectPortableRequestGraph,
  decodePortableRequestGraph,
  encodePortableRequestGraph,
  materializePortableRequest,
} from './portable_request_graph.mjs';

export function createPortableMake(execute, owner = {}) {
  const accepted = new WeakMap();
  // A workspace edit can return a previously issued Result. Retain its first
  // request for identity checks and its latest request for Share.
  const latest = new WeakMap();

  function executeNode(compiled, address, localPlan = null, seedOnly = false) {
    const projectedSources = new WeakMap();
    const replayPlan = materializePortableRequest(owner, compiled.serialized, compiled.dependencies, projectedSources);
    if (!replayPlan) return null;
    const {inputIssuer} = replayPlan;
    // The older typed alias is already checked against its exact dependency
    // by the decoder. Current Owner plans must reproduce the original encoding.
    if (inputIssuer === undefined
        || (inputIssuer !== 'typed-source-binding' && owner.describeReissuedPlan)) {
      const verified = inputIssuer === undefined
        ? replayPlan.request : owner.describeReissuedPlan(replayPlan);
      const serialized = encodePortableBuildRequest(verified, value => {
        const index = compiled.dependencies.indexOf(value);
        return index === -1 ? undefined : index;
      }, () => {}, projectedSources);
      if (serialized !== compiled.serialized) return null;
    }
    // The staged plan retains the sender's exact Owner-issued identities.
    // The same reissue check guards both new Make and link replay.
    const plan = localPlan ?? replayPlan;
    const application = execute(plan.request, plan.prepared ?? null);
    const result = application?.canonicalResult;
    const removal = plan.request.operationId === 'workspace:remove-result-part';
    if (application?.authorizationStatus !== 'authorized' || !result) return null;
    const existing = accepted.get(result);
    if (existing && (!removal || seedOnly)) {
      const previous = existing;
      const sameRequest = previous.serialized === compiled.serialized
        && previous.dependencies.length === compiled.dependencies.length
        && previous.dependencies.every((dependency, index) => dependency === compiled.dependencies[index]);
      if (sameRequest && !seedOnly) latest.set(result, {compiled, address});
      return sameRequest ? application : null;
    }
    if (!existing) accepted.set(result, compiled);
    latest.set(result, {compiled, address});
    if (!existing) {
      markPortableResult(result);
      owner.recordAcceptedSources?.(result, value => accepted.has(value));
    }
    return application;
  }

  function make(request, prepared = null, seedOnly = false) {
    const typedBinding = request?.typedBinding;
    if (typedBinding && prepared && getPortablePreparedInput(prepared) !== typedBinding) return null;
    let plan;
    try {
      plan = prepared ? owner.describePortablePreparation?.(typedBinding ? prepared.request : request, prepared)
        : typedBinding ? owner.describePortableTypedBinding?.(typedBinding)
          : describePortableContinuation(request) ?? request;
    } catch {
      return null;
    }
    if (!plan) return null;
    const dependencies = [];
    const serialized = encodePortableBuildRequest(plan, value => {
      if (!accepted.has(value)) return undefined;
      const at = dependencies.indexOf(value);
      return at < 0 ? dependencies.push(value) - 1 : at;
    }, source => {
      if (owner.supportsPortableSource?.(portableSourceIssuer(source)) === false) {
        throw new TypeError('Source constructor is unavailable');
      }
    });
    if (!serialized) return null;
    const compiled = compile(serialized, dependencies, dependencies.map(value => latest.get(value).compiled));
    const entries = collectPortableRequestGraph(compiled);
    const address = encodePortableRequestGraph(entries);
    const localPlan = {request, prepared};
    return address ? executeNode(compiled, address, localPlan, seedOnly) : null;
  }

  function compile(serialized, dependencies, inputs) {
    return Object.freeze({serialized, dependencies: Object.freeze(dependencies), inputs: Object.freeze(inputs)});
  }

  function open(address) {
    const entries = decodePortableRequestGraph(address);
    if (!entries) return null;
    try {
      const results = [];
      const requests = [];
      let application = null;
      for (const [serialized, refs] of entries) {
        const compiled = compile(serialized, refs.map(ref => results[ref]), refs.map(ref => requests[ref]));
        application = executeNode(compiled, results.length === entries.length - 1 ? address : null);
        if (!application) return null;
        results.push(application.canonicalResult);
        requests.push(compiled);
      }
      return application;
    } catch {
      return null;
    }
  }

  return Object.freeze({
    make: (request, prepared) => make(request, prepared),
    // Workspace restoration can supply new operands without replacing the
    // request already established by the open Result URL.
    seed: (request, prepared) => make(request, prepared, true),
    open,
    requestFor: result => latest.get(result)?.compiled ?? null,
    addressFor: result => {
      const entry = latest.get(result);
      return entry?.address ?? (entry ? encodePortableRequestGraph(
        collectPortableRequestGraph(entry.compiled),
      ) : null);
    },
  });
}


export function installPortableMake(runtime) {
  function nominalSlot(result) {
    if (runtime.isClassicalNahuatlOrdinaryNncResult?.(result)
        || runtime.isClassicalNahuatlPronominalNncResult?.(result)
        || runtime.isClassicalNahuatlAttestedNncCellResult?.(result)) return result.typedSlotFrame;
    if (runtime.isClassicalNahuatlRelationalResult?.(result) === true
      && runtime.isClassicalNahuatlNncSlotFrame?.(result.nncSlotFrame) === true) return result.nncSlotFrame;
    const slot = result?.canonicalResult?.nncSlotFrame;
    if (runtime.isClassicalNahuatlNominalConstructionResult?.(result)
        && runtime.isClassicalNahuatlIssuedNominalConstructionNncSlotFrame?.(slot)) return slot;
    if (runtime.isClassicalNahuatlDeverbalNncGrammarFrame?.(result)
        && runtime.isClassicalNahuatlIssuedDeverbalNncSlotFrame?.(slot)) return slot;
    return null;
  }

  function nominalSentence(result) {
    const sentence = result?.sentenceFrame;
    return runtime.isClassicalNahuatlIssuedNncSentenceSurfaceFrame?.(sentence) === true ? sentence : null;
  }

  function denominalApplication(result) {
    return runtime.isClassicalNahuatlDenominalVncResultFrame?.(result) === true
      && runtime.isClassicalNahuatlVncApplicationFrame?.(result.canonicalVncFrame) === true
      ? result.canonicalVncFrame : null;
  }

  function nominalVerbApplication(result) {
    if (runtime.isClassicalNahuatlAdverbialNuclearResult?.(result) === true
      && result.scope === 'incorporated-predicate') {
      return nominalVerbApplication(result.canonicalResult);
    }
    if (runtime.isClassicalNahuatlDeverbalNncGrammarFrame?.(result) === true
      && result.constructionKind === 'patientive-embed-continuation') {
      return nominalVerbApplication(result.canonicalResult);
    }
    return runtime.isClassicalNahuatlNominalConstructionResult?.(result) === true
      && runtime.isClassicalNahuatlVncApplicationFrame?.(result.canonicalResult) === true
      ? result.canonicalResult : null;
  }

  function verbalNucleus(result) {
    const application = denominalApplication(result) ?? nominalVerbApplication(result) ?? result;
    return runtime.isClassicalNahuatlVncApplicationFrame?.(application) === true
      && runtime.isClassicalNahuatlVncApplicationResultFrame?.(application.resultFrame) === true
      ? application.resultFrame : null;
  }

  function verbalSlots(result) {
    return {
      final: result?.finalTypedVncSlotFrame,
      typed: result?.typedVncSlotFrame,
      finite: result?.vncSlotFrame,
      application: result?.resultFrame?.finalTypedVncSlotFrame,
      sentence: result?.canonicalResultFrame?.finalTypedVncSlotFrame,
      denominal: result?.canonicalVncFrame?.resultFrame?.finalTypedVncSlotFrame,
    };
  }

  function finiteMachinery(result) {
    const finite = [
      result, result?.finiteSurfaceFrame, result?.resultFrame?.finiteSurfaceFrame,
      result?.canonicalResultFrame?.finiteSurfaceFrame,
      result?.canonicalVncFrame?.resultFrame?.finiteSurfaceFrame,
    ].find(candidate => runtime.isClassicalNahuatlVncFiniteSurfaceFrame?.(candidate) === true);
    return finite?.machineryFrame ?? null;
  }

  const resultProjections = new Map([
    ['nnc:accepted-result-sentence', nominalSentence],
    ['nnc:accepted-result-slot', nominalSlot],
    ['vnc:accepted-finite-machinery', finiteMachinery],
    ['vnc:accepted-nominal-verb-application', nominalVerbApplication],
    ['vnc:accepted-denominal-application', denominalApplication],
    ['vnc:accepted-result-nucleus', verbalNucleus],
  ]);
  const verbalSlotIssuer = 'vnc:accepted-result-slot';

  function projectVerbalSlot(result, coordinate) {
    const slots = verbalSlots(result);
    const slot = Object.hasOwn(slots, coordinate) ? slots[coordinate] : null;
    return runtime.isClassicalNahuatlVncSlotFrame?.(slot) === true ? slot : null;
  }

  const sourceIssuers = new Map([
    ['vnc:application-source-machinery', args => args.length === 1
      ? runtime.evaluateClassicalNahuatlVncApplication(args[0])?.resultFrame?.sourceMachineryFrame : null],
    ['grammar:participant-source', args => args.length === 1 ? buildClassicalNahuatlParticipantFrame(args[0]) : null],
    ['grammar:output-scope-selection', args => args.length === 2 ? buildClassicalResultOutputScopeSelectionFrame(...args) : null],
    ['nnc:ordinary-operation', args => args.length === 2
      ? runtime.buildClassicalNahuatlOrdinaryNncOperationFrame(...args) : null],
    ['nnc:pronominal-operation', args => args.length === 2
      ? runtime.buildClassicalNahuatlPronominalNncOperationFrame(...args) : null],
    ['nnc:state-slot', args => {
      if (args.length !== 3) return null;
      const [state, stem, options] = args;
      const frame = state === 'absolutive' ? runtime.buildClassicalNahuatlAbsolutiveNncFrame(stem, options)
        : state === 'possessive' ? runtime.buildClassicalNahuatlPossessiveNncFrame(stem, options) : null;
      return frame?.authorizationStatus === 'authorized' ? frame.nncSlotFrame : null;
    }],
    ['nnc:patientive-core-source', args => args.length === 1
      ? runtime.buildClassicalNahuatlPatientiveCoreSourceFrame(args[0]) : null],
    ['nnc:double-nucleus-replacement', args => args.length === 3
      ? buildDoubleNucleusEditRequest(runtime, ...args) : null],
    ...Array.from(resultProjections, ([issuer, project]) =>
      [issuer, args => args.length === 1 ? project(args[0]) : null]),
    [verbalSlotIssuer, args => args.length === 2 && typeof args[1] === 'string'
      ? projectVerbalSlot(...args) : null],
    ["clause:comparison-source", args => args.length === 1
        ? runtime.buildClassicalComparisonSourceUnit(args[0]) : null],
    ["clause:conjunction-replacement", args => args.length === 3
      ? runtime.buildClassicalNahuatlConjunctReplacementRequest(...args) : null],
    ["clause:conjunction-operation", args => args.length === 1
      ? runtime.buildClassicalNahuatlClauseConjunctionOperationRequest(args[0]) : null],
    ["clause:complement-operation", args => args.length === 1
      ? runtime.buildClassicalNahuatlClauseComplementationOperationRequest(args[0]) : null],
    ["clause:composition-source", args => args.length === 2
        ? runtime.buildClassicalNahuatlClauseCompositionSourceFrame(...args) : null],
    ["grammar:nominal-source", args => args.length === 1
        ? runtime.buildClassicalNahuatlNominalConstructionTypedSourceFrame(args[0]) : null],
    ['nnc:customary-agentive-boundary', args => args.length === 2
      ? runtime.buildClassicalNahuatlCustomaryAgentiveBoundaryConstituent(...args) : null],
    ['nnc:future-agentive-restricted-embed', args => args.length === 1
      ? runtime.captureClassicalNahuatlFutureAgentiveRestrictedEmbed(args[0]) : null],
    ['nnc:fixed-modification-analysis', args => args.length === 1
      ? runtime.buildClassicalNahuatlAdjectivalModificationIncorporationAnalysis(args[0]) : null],
    ['nnc:fixed-modification-constituent', args => args.length === 2
      ? runtime.projectClassicalNahuatlAdjectivalModificationForIncorporation(...args) : null],
    ['nnc:patientive-constituent-bridge', args => {
      if (args.length !== 2 || !['embed', 'matrix'].includes(args[1])) return null;
      const capture = runtime.captureClassicalNahuatlPatientiveNncResultForMatrixContinuation(args[0]);
      return args[1] === 'embed'
        ? runtime.issueClassicalNahuatlPatientiveEmbedConstituentFrame(capture)
        : runtime.issueClassicalNahuatlPatientiveMatrixConstituentFrame(capture);
    }],
    ["nnc:adjectival-source-bridge", args => args.length === 2
        ? runtime.getClassicalNahuatlAdjectivalNncSourceConstituent(...args)?.bridgeFrame : null],
    ["nnc:contextual-flawed-subject-source", args => args.length === 2
      ? runtime.issueClassicalNahuatlContextualFlawedSubjectSourceFrame(...args) : null],
    ["nnc:resolved-adverbial-source", args => args.length === 1
      ? runtime.resolveClassicalNahuatlAdverbialPotential(args[0]) : null],
    ["nnc:primitive-adverbial-source", args => args.length === 1
      ? runtime.buildClassicalNahuatlPrimitiveAdverbialPotentialFrame(args[0]) : null],
    ["nnc:lexical-adverbial-source", args => args.length === 1
      ? runtime.buildClassicalNahuatlLexicalAdverbialPotentialFrame(args[0]) : null],
    ["nnc:lexicalized-present-source", args => args.length === 1
      ? runtime.buildClassicalNahuatlLexicalizedPresentNncSourceFrame(args[0]) : null],
    ["nnc:lexicalized-double-nucleus-source", args => args.length === 1
        ? runtime.resolveClassicalNahuatlLexicalizedNncSourceFrame(args[0]) : null],
    ["nnc:personal-name-inner-clause", args => args.length === 1
        ? runtime.buildPersonalNameInnerClauseFrame(args[0]) : null],
    ["nnc:personal-name-source", args => args.length === 1
        ? runtime.buildPersonalNameNncSourceFrame(args[0]) : null],
    ["nnc:place-nominal-source", args => args.length === 1
        ? runtime.buildClassicalNahuatlPlaceNominalSourceFrame(args[0]) : null],
    ["nnc:quoted-name-source", args => args.length === 1
        ? runtime.buildPersonalNameOpaqueQuotedInnerSourceFrame(args[0]) : null],
    ["nnc:selected-imperfect-source", args => args.length === 1
      ? runtime.buildClassicalNahuatlSelectedImperfectPredicateSourceFrame(args[0]) : null],
    ["nnc:resolved-imperfect-source", args => args.length === 1
      ? runtime.resolveClassicalNahuatlSelectedImperfectPredicateSourceFrame(args[0]) : null],
    ["nnc:relational-predicate-source", args => args.length === 1
        ? runtime.buildClassicalNahuatlRelationalPredicateNounSourceFrame(args[0]) : null],
    ["nnc:relational-source", args => args.length === 1
        ? runtime.buildClassicalNahuatlRelationalNncTypedSourceFrame(args[0]) : null],
    ["orthography:transcription-source", args => args.length === 1
      ? runtime.buildClassicalNahuatlTranscriptionSourceFrame(args[0]) : null],
    ["orthography:particle-group-writing-source", args => args.length === 1
      ? runtime.issueClassicalNahuatlWritingSourceFromParticleGroup(args[0]) : null],
    ["orthography:application-writing-source", args => {
      if (args.length !== 2) return null;
      const application = runtime.captureClassicalGrammarApplicationResult(args[0], "portable-writing-source")?.applicationResult;
      return application ? runtime.issueClassicalNahuatlWritingSourceFromApplication(application, args[1]) : null;
    }],
    ["particle:negative-selection-source", args => args.length === 1
      ? runtime.selectClassicalNahuatlNegativeParticleFrame(args[0]) : null],
    ["orthography:transcription-operation", args => args.length === 2
        ? runtime.issueClassicalNahuatlTranscriptionBindingFrame(...args)?.executionArgs[1] : null],
    ["particle:source", args => args.length === 1 && typeof args[0] === "string"
        ? runtime.buildClassicalNahuatlParticleSourceFrame(args[0]) : null],
    ["vnc:compound-predicate-source", args => args.length === 1
      ? runtime.buildClassicalNahuatlCompoundPredicateSourceFrame(args[0]) : null],
    ["vnc:compound-predicate-binding", args => {
      if (args.length !== 2) return null;
      const binding = runtime.issueClassicalNahuatlCompoundPredicateBindingFrame(...args);
      return binding?.bindingStatus === "ready" ? binding : null;
    }],
    ["vnc:imperfective-source", args => args.length === 1
      ? runtime.resolveClassicalNahuatlImperfectiveVncSourceFrame(args[0]) : null],
    ["vnc:preformed-source", args => args.length === 1
      ? runtime.resolveClassicalNahuatlPreformedVncSourceFrame(args[0]) : null],
    ["vnc:nonactive-carrier-source", args => args.length === 1
      ? runtime.resolveClassicalNahuatlNonactiveCarrierSourceFrame(args[0]) : null],
    ["vnc:verbstem-class-source", args => args.length === 2
      ? runtime.buildClassicalNahuatlVerbstemClassFrame(...args) : null],
    ["vnc:derivation-operation", args => args.length === 2
      ? runtime.deriveClassicalNahuatlVncDerivationOperationFrame(...args) : null],
    ["vnc:derived-machinery", args => args.length === 3
      ? runtime.buildClassicalNahuatlDerivedVncMachineryFrame(...args) : null],
    ['grammar:internal-application-source', args => args.length === 2
      ? runtime.reissueClassicalGrammarInternalApplicationSource(...args) : null],
    ['grammar:accepted-continuation-source', args => {
      if (args.length !== 3) return null;
      const [parent, field, kind] = args;
      const projections = runtime.getClassicalGrammarApplicationPortableContinuations(parent);
      // Early preview links used the Owner's traversal index for this Source.
      const projection = Array.isArray(field) && field.length
        ? projections.find(entry => entry.path.length === field.length
          && entry.path.every((key, index) => key === field[index]))
        : Number.isSafeInteger(field) && field >= 0 ? projections[field] : null;
      return projection?.source.kind === kind ? projection.source : null;
    }],
    ['vnc:typed-application-binding', args => {
      if (args.length !== 2) return null;
      const binding = runtime.issueClassicalNahuatlVncTypedSourceApplicationBindingFrame(...args);
      return binding?.bindingStatus === 'ready' ? binding : null;
    }],
    ["vnc:denominal-parent-operation", args => args.length === 1
      && runtime.isClassicalNahuatlDenominalVncResultFrame(args[0]) ? args[0].operationFrame : null],
    ["vnc:analytical-source", args => args.length === 1
        ? runtime.resolveClassicalNahuatlAnalyticalVncSourceFrame(args[0]) : null],
    ["vnc:bound-nominal-source", args => args.length === 1
        ? runtime.buildClassicalNahuatlBoundNominalSourceFrame(args[0]) : null],
    ["vnc:canonical-source-selection", args => args.length === 1
        ? runtime.buildClassicalNahuatlCanonicalSourceSelectionFrame(args[0]) : null],
    ["vnc:denominal-stem-preparation", args => args.length === 2
        ? runtime.issueClassicalNahuatlDenominalVerbalStemPreparation(...args) : null],
    ["vnc:nominal-rank-corrected-source", args => args.length === 1
        ? runtime.resolveClassicalNahuatlNominalRankCorrectedSourceFrame(args[0]) : null],
    ["vnc:nonactive-stem-source", args => args.length === 2
        ? runtime.deriveClassicalNahuatlNonactiveStemRecord(...args) : null],
    ["vnc:restricted-containing-source", args => args.length === 1
        ? runtime.resolveClassicalNahuatlRestrictedContainingVncSourceFrame(args[0]) : null],
    ['nnc:ordinary-source', args => args.length === 1
      ? runtime.buildClassicalNahuatlOrdinaryNncSourceFrame(args[0]) : null],
    ['nnc:pronominal-source', args => args.length === 1 ? runtime.buildClassicalNahuatlPronominalNncSourceFrame(args[0]) : null],
    ['nnc:quantitative-source', args => args.length === 1 ? runtime.buildClassicalNahuatlQuantitativePredicateSourceFrame(args[0]) : null],
    ['nnc:attested-cell-source', args => args.length === 1 ? runtime.resolveClassicalNahuatlAttestedNncCellSourceFrame(args[0]) : null],
    ['nnc:attested-place-source', args => args.length === 1 ? runtime.resolveClassicalNahuatlAttestedPlaceSourceFrame(args[0]) : null],
    ['clause:attested-collocation-source', args => args.length === 1 ? runtime.resolveClassicalNahuatlAttestedPrincipalCollocationSourceFrame(args[0]) : null],
    ['nnc:quantitative-operation', args => args.length === 2
      ? runtime.buildClassicalNahuatlQuantitativePredicateOperationFrame(...args) : null],
    ["sentence:supplementation-operation", args => args.length === 1
      ? runtime.buildClassicalNahuatlSupplementationOperationRequest(args[0]) : null],
    ['sentence:supplementation-replacement', args => args.length === 3
      ? runtime.buildClassicalNahuatlSupplementationReplacementRequest(...args) : null],
    ['sentence:discourse-source-context', args => args.length === 1
      ? runtime.buildClassicalNahuatlDiscourseSourceContextFrame(args[0]) : null],
    ['sentence:supplementation-context', args => args.length === 2 && typeof args[0] === 'string'
      ? runtime.buildClassicalNahuatlSupplementationContextRecord({...args[1], kind: args[0]}) : null],
    ['sentence:supplementation-envelope', args => args.length === 2
      ? runtime.buildClassicalNahuatlSupplementationClauseEnvelope(...args) : null],
  ]);
  function issueContinuation(operationId, args, dependencies) {
    if (args.length !== 3) return null;
    const [parent] = args;
    if (portableSourceIssuer(parent) !== 'grammar:internal-application-source'
      && !dependencies.includes(parent)
      && !dependencies.some(result => runtime.getClassicalGrammarApplicationPortableContinuations(result).some(entry => entry.source === parent)
        || [...resultProjections.values()].some(project => project(result) === parent))) return null;
    const binding = runtime.issueClassicalNahuatlVncContinuationBindingFrame(operationId, ...args);
    return binding?.bindingStatus === 'ready' ? binding : null;
  }

  return createPortableMake((request, prepared) => {
    if (request.operationId === 'workspace:remove-result-part') {
      if (request.args.length !== 2) return null;
      const [root, path] = request.args;
      const remaining = resolveResultEditTarget(runtime, root, path)?.removableTo;
      return remaining
        ? runtime.captureClassicalGrammarApplicationResult?.(remaining, 'result-edit-make')?.applicationResult
        : null;
    }
    return request.typedBinding
      ? runtime.executeClassicalGrammarTypedSourceOperationBindingFrame(request.typedBinding)
      : runtime.executeClassicalGrammarApplicationRequest(request, prepared);
  }, {
    recordAcceptedSources(result, isAccepted) {
      for (const [issuer, project] of resultProjections) {
        const source = project(result);
        if (source && !hasPortableSource(source)) recordPortableSource(source, issuer, [result]);
      }
      for (const coordinate of Object.keys(verbalSlots(result))) {
        const slot = projectVerbalSlot(result, coordinate);
        if (slot && !hasPortableSource(slot)) {
          recordPortableSource(slot, verbalSlotIssuer, [result, coordinate]);
        }
      }
      const continuations = runtime.getClassicalGrammarApplicationPortableContinuations(result);
      for (const {source, path} of continuations) {
        if (!isAccepted(source) && !hasPortableSource(source)) {
          recordPortableSource(source, 'grammar:accepted-continuation-source', [result, path, source.kind]);
        }
      }
    },
    supportsPortableSource: issuer => sourceIssuers.has(issuer),
    isPortableResultProjection: issuer => resultProjections.has(issuer) || issuer === verbalSlotIssuer
      || issuer === 'grammar:accepted-continuation-source',
    issuePortableSource(issuer, args) {
      const source = sourceIssuers.get(issuer)?.(args);
      return source?.authorizationStatus === 'authorized'
        || (source?.authorizationStatus === undefined && hasPortableSource(source)) ? source : null;
    },
    describePortableTypedBinding(binding) {
      if (runtime.isClassicalGrammarTypedSourceOperationBindingFrame(binding) !== true
          || binding.bindingStatus !== 'ready') return null;
      if (binding.rootSourceConstructor && binding.operationId === 'particle:result') {
        const prepared = runtime.prepareClassicalGrammarApplicationRequest(binding);
        return prepared ? {...prepared.request, inputIssuer: 'prepared-application'} : null;
      }
      if (!binding.exactSource) return null;
      return {operationId: binding.operationId, inputIssuer: 'typed-issued-source-binding',
        args: [binding.exactSource, binding.callerSelections]};
    },
    describeReissuedPlan({request, prepared}) {
      if (prepared) return this.describePortablePreparation(request, prepared);
      if (request.typedBinding) return this.describePortableTypedBinding(request.typedBinding);
      return describePortableContinuation(request);
    },
    reissuePortableInternalInputs({inputIssuer, ...request}, dependencies) {
      if (inputIssuer !== 'vnc-continuation') return null;
      const binding = issueContinuation(request.operationId, request.args, dependencies);
      return binding ? {...request, args: binding.executionArgs} : null;
    },
    describePortablePreparation(request, prepared) {
      if (runtime.isClassicalGrammarPreparedApplicationRequest(prepared) !== true
          || prepared.request !== request) return null;
      const binding = getPortablePreparedInput(prepared);
      if (runtime.isClassicalGrammarTypedSourceOperationBindingFrame(binding) === true) {
        const plan = this.describePortableTypedBinding(binding);
        return plan?.inputIssuer === 'typed-issued-source-binding'
          ? {...plan, inputIssuer: 'prepared-typed-source-binding'} : plan;
      }
      const continuation = describePortableContinuation(request);
      return continuation
        ? {...continuation, inputIssuer: 'prepared-vnc-continuation'}
        : {...request, inputIssuer: 'prepared-application'};
    },
    reissuePortablePreparation({inputIssuer, ...request}, dependencies) {
      if (inputIssuer !== 'prepared-vnc-continuation') {
        return runtime.prepareClassicalGrammarApplicationRequest(request);
      }
      const binding = issueContinuation(request.operationId, request.args, dependencies);
      return binding ? runtime.prepareClassicalGrammarApplicationRequest(binding) : null;
    },
    preparePortableBinding(binding) {
      return runtime.prepareClassicalGrammarApplicationRequest(binding);
    },
    issuePortableTypedBinding(operation, source, choices) {
      const navigator = runtime.getClassicalGrammarApplicationCapabilityNavigator(source);
      const binding = runtime.issueClassicalGrammarTypedSourceOperationBindingFrame(navigator, operation, choices);
      return binding?.bindingStatus === 'ready' ? binding : null;
    },
  });
}
