// Read-only observation for DOM-only browsers. Tokens identify references in
// this realm; neither a token nor this projection can authorize an operation.
export function createClassicalWorkspaceProvenanceProjector(target, readContext = null) {
  const observationSessionId = globalThis.crypto?.randomUUID?.()
    || `observation-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const identities = new WeakMap();
  let sequence = 0;
  const token = value => {
    if (!value || typeof value !== 'object') return '';
    if (!identities.has(value)) identities.set(value, `reference-${++sequence}`);
    return identities.get(value);
  };
  const capture = value => {
    if (!value || typeof value !== 'object') return null;
    const issued = target.captureClassicalGrammarApplicationResult?.(value, 'dom-provenance');
    return target.isClassicalGrammarApplicationResultCapture?.(issued, 'dom-provenance')
      && issued.canonicalResult === value ? issued : null;
  };
  const slots = value => {
    if (target.isPlaceGentilicNncFrame?.(value) === true)
      return value.agreementFrame?.typedSlotFrame || null;
    const direct = value?.typedSlotFrame || value?.finalTypedVncSlotFrame
      || value?.resultFrame?.finalTypedVncSlotFrame || value?.canonicalResult?.nncSlotFrame
      || value?.nncSlotFrame || value?.sourceNncSlotFrame;
    if (direct) return direct;
    if (target.isClassicalNahuatlVncSentenceResultFrame?.(value) === true) {
      const owned = value.vncApplicationFrame;
      if (target.isClassicalNahuatlVncApplicationFrame?.(owned) === true
        && value.canonicalSourceFrame === owned
        && value.canonicalResultFrame === owned.resultFrame
        && value.vncApplicationResultFrame === owned.resultFrame) return slots(owned);
    }
    if (target.isClassicalNahuatlIssuedParticleSentenceLayerFrame?.(value) === true
      && capture(value.canonicalInputFrame)) return slots(value.canonicalInputFrame);
    // The modification owner exports its head's slots as the composite NNC
    // contact projection, while the complete composition remains the Source.
    if (value?.kind === 'classical-nahuatl-adjectival-modification-result-frame'
      && capture(value)) return value.selectedClauses?.[0]?.typedSlotFrame || null;
    return null;
  };
  const scalars = value => Object.fromEntries(Object.entries(value || {})
    .filter(([, v]) => v === null || ['string', 'number', 'boolean'].includes(typeof v)));
  const plain = (value, depth = 5) => {
    if (!value || typeof value !== 'object') return value;
    if (depth === 0) return {reference: token(value), kind: value.kind || '', omittedDepth: true};
    if (Array.isArray(value)) return value.map(v => plain(v, depth - 1));
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, plain(v, depth - 1)]));
  };
  return function project() {
    const history = target.getClassicalGrammarWorkspaceHistorySnapshot?.();
    const historyAuthenticated = target.isClassicalGrammarWorkspaceHistorySnapshot?.(history) === true;
    const records = historyAuthenticated ? history.nodes.map(node => ({node,
      capture: target.recoverClassicalGrammarWorkspaceResult?.(node.nodeId)}))
      .filter(item => target.isClassicalGrammarApplicationResultCapture?.(item.capture) === true) : [];
    const nodeByResult = new Map(records.map(({node, capture: c}) => [c.canonicalResult, node.nodeId]));
    const ref = (value, depth = 1) => {
      if (!value || typeof value !== 'object') return null;
      const result = {...scalars(value), token: token(value), nodeId: nodeByResult.get(value) || '', kind: value.kind || ''};
      if (depth > 0) result.references = Object.fromEntries(Object.entries(value)
        .filter(([, v]) => v && typeof v === 'object')
        .map(([k, v]) => [k, Array.isArray(v) ? v.map(x => typeof x === 'object' ? ref(x, depth - 1) : x) : ref(v, depth - 1)]));
      return result;
    };
    const resultWitness = value => {
      if (!capture(value)) return null;
      const bodySlots = slots(value);
      const witness = {...ref(value, 2), surface: value.surfaceRealization || value.wordSurface
        || value.sentenceSurfaceDisplay || value.embeddedSurface || value.resultFrame?.surfaceRealization || '',
        typedSlotToken: token(bodySlots), typedSlots: bodySlots ? plain(bodySlots) : null,
        derived: value.derived ? plain(value.derived) : null,
        selection: value.selection ? plain(value.selection) : null};
      if (target.isClassicalNahuatlNominalConstructionResult?.(value) === true
        && value.constructionKind === 'calendar-date-nnc') {
        const date = value.operationFrame?.calendarDateFrame;
        if (date?.kind === 'classical-nahuatl-calendar-date-formation-frame')
          witness.calendarDate = {...scalars(date),
            numeralToken: token(date.numeralResult), daySignToken: token(date.daySignResult),
            numeralSlotToken: token(date.sourceNumeralSlotFrame),
            daySignSlotToken: token(date.sourceDaySignSlotFrame),
            ordinal: ref(date.ordinalNncResult, 2), daySign: ref(date.daySignNncResult, 2),
            compound: ref(date.compoundNncResult, 2)};
      }
      const application = value.vncApplicationFrame || value.canonicalVncFrame || value;
      const request = application.normalizedRequest;
      if (request) witness.vnc = {...scalars(request),
        sourceObjectRequests: plain(request.sourceObjectRequests || []),
        finalTypedSlots: plain(slots(application)),
        applicationToken: token(application),
        ownedSentenceApplication: value.vncApplicationFrame ? {
          canonicalSourceExact: value.canonicalSourceFrame === application,
          canonicalResultExact: value.canonicalResultFrame === application.resultFrame,
          applicationResultExact: value.vncApplicationResultFrame === application.resultFrame,
        } : null};
      if (witness.vnc && target.isClassicalNahuatlVncApplicationFrame?.(application) === true) {
        const attestation = application.resultFrame?.derivationOperationFrame?.selectedOption?.sourceAttestationFrame;
        if (attestation?.kind === 'classical-nahuatl-source-attested-object-fact')
          witness.vnc.sourceAttestation = {...scalars(attestation), token: token(attestation),
            targetScope: scalars(attestation.targetScope)};
      }
      witness.selectedClauses = (value.selectedClauses || []).map(clause => ({...scalars(clause),
        parentToken: token(clause.sourceResult), parentNodeId: nodeByResult.get(clause.sourceResult) || '',
        parentAuthenticated: Boolean(capture(clause.sourceResult)),
        typedSlotToken: token(clause.typedSlotFrame),
        typedSlotsExactParent: clause.typedSlotFrame === slots(clause.sourceResult),
        typedSlots: plain(clause.typedSlotFrame)}));
      witness.envelopeSources = ['principalClause', 'supplementClause', 'dependentClause', 'adjoinedClause']
        .flatMap(role => {
          const envelope = value[role];
          if (target.isClassicalNahuatlSupplementationClauseEnvelope?.(envelope) !== true) return [];
          const source = target.getClassicalNahuatlSupplementationClauseSourceFrame?.(envelope);
          const collective = envelope.quantityModifiedNominalCollectiveFrame;
          return [{role, envelopeToken: token(envelope), envelopeAuthenticated: true,
            sourceToken: token(source), sourceNodeId: nodeByResult.get(source) || '',
            sourceAuthenticated: Boolean(capture(source)), sourceKind: source?.kind || '',
            sourceTypedSlotToken: token(slots(source)), sourceTypedSlots: plain(slots(source)),
            collectiveReference: envelope.collectiveReference === true,
            quantityModifiedNominalCollective: collective ? {...scalars(collective),
              wholeToken: token(collective.wholeModificationResult),
              nominalToken: token(collective.nominalResult),
              quantitiveToken: token(collective.quantitiveResult),
              references: ref(collective, 1)?.references} : null}];
        });
      witness.referenceContact = value.referenceFrame ? plain(value.referenceFrame) : null;
      witness.contactAlternatives = (value.operationFrames || [])
        .filter(frame => frame.kind === 'classical-nahuatl-supplementation-contact-alternatives-frame')
        .flatMap(frame => plain(frame.alternatives || []));
      const graph = target.getClassicalGrammarApplicationLayerGraph?.(value);
      witness.applicationParents = target.isClassicalGrammarApplicationLayerGraph?.(graph) === true
        && graph.terminalCanonicalResult === value ? (graph.edges || [])
          .filter(edge => edge.outerApplicationResult?.canonicalResult === value)
          .map(edge => ({parentToken: token(edge.innerApplicationResult?.canonicalResult),
            parentNodeId: nodeByResult.get(edge.innerApplicationResult?.canonicalResult) || '',
            exactArguments: edge.exactInnerResultIdentityObservedInOuterArguments === true,
            edgeKind: edge.edgeKind || edge.kind || ''})) : [];
      const continuationFrames = value.principalContinuationFrames;
      witness.principalContinuationFrames = (Array.isArray(continuationFrames)
        ? continuationFrames : continuationFrames instanceof Map ? [...continuationFrames.values()] : []).map(v => ref(v, 1));
      return witness;
    };
    const context = readContext?.() || {};
    const active = (Object.hasOwn(context, 'applicationResult') ? context.applicationResult
      : target.getActiveClassicalCapabilityApplicationResult?.())?.canonicalResult;
    const source = (Object.hasOwn(context, 'sourceCapture') ? context.sourceCapture
      : target.getActiveClassicalGrammarResultSourceCapture?.())?.canonicalResult;
    const activeOperation = target.document?.getElementById?.('classical-capability-navigator')
      ?.dataset?.classicalCapabilityEnteredOperation || '';
    const binding = activeOperation ? target.getActiveClassicalGrammarResultBinding?.(activeOperation) : null;
    return {kind: 'classical-workspace-provenance-projection', version: 1, observationSessionId,
      factsAreReadOnly: true, grammarAuthority: false, formulaStringAuthority: false,
      surfaceStringAuthority: false, callerSelectionAuthority: false, historyAuthenticated,
      revision: historyAuthenticated ? history.revision : null,
      currentNodeId: historyAuthenticated ? history.currentNodeId : '',
      nodes: records.map(({node, capture: c}) => ({...node, result: resultWitness(c.canonicalResult)})),
      acceptedResult: resultWitness(active), sourceResult: resultWitness(source),
      binding: binding ? ref(binding, 2) : null,
      cards: [...(target.document?.querySelectorAll?.('.classical-result-continuation-card') || [])]
        .map(card => {const exact = target.getClassicalResultContinuationIdentity?.(card); return {
          token: capture(exact) ? token(exact) : '', nodeId: nodeByResult.get(exact) || '',
          accepted: target.isClassicalResultContinuationAcceptedApplication?.(card) === true};}),
    };
  };
}
