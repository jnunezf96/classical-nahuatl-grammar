// Non-authorizing live validation projection for deverbal-NNC semantics.
// It owns no Inventory atom and stores no Canvas answer. Every grammatical
// coordinate below is emitted by the canonical typed Lessons 35-39 engine.

function deepFreeze(value, seen = new WeakSet()) {
  if (!value || typeof value !== "object" || seen.has(value)) return value;
  seen.add(value);
  for (const nested of Object.values(value)) deepFreeze(nested, seen);
  return Object.freeze(value);
}

function predicateRequest(nominalizationKind, overrides = {}) {
  const sourceStages = {
    "preterit-agentive": "preterit-predicate",
    "preterit-patientive": "preterit-predicate",
    "customary-agentive-reanalysis": "customary-present-predicate",
    "customary-agentive-full": "customary-present-predicate",
    "customary-patientive": "customary-present-predicate",
    instrumentive: overrides.state === "possessive"
      ? "imperfect-predicate" : "customary-present-predicate",
    "present-agentive": "present-predicate",
    "future-agentive": "future-predicate",
    "passive-action": "distant-past-predicate",
    "active-action": "distant-past-predicate",
  };
  const passive = [
    "preterit-patientive", "customary-patientive", "passive-action",
  ].includes(nominalizationKind);
  const impersonal = nominalizationKind === "instrumentive"
    && overrides.state !== "possessive";
  return {
    constructionKind: "predicate-nominalization",
    nominalizationKind,
    source: {
      sourceStage: sourceStages[nominalizationKind],
      sourceStem: nominalizationKind === "preterit-agentive"
        ? "pix-ca" : "mach-ti",
      verbClass: "A",
      sourceVoice: passive ? "passive" : impersonal ? "impersonal" : "active",
      sourceValence: nominalizationKind === "active-action"
        ? "intransitive" : passive ? "single-object" : "intransitive",
      sourceObjectPattern: "none",
      sourceSubject: "3sg",
    },
    subject: "3sg",
    state: overrides.state || "absolutive",
    ...overrides,
  };
}

function patchSource(request, source = {}) {
  return { ...request, source: { ...(request.source || {}), ...source } };
}

function ownerhoodRequest(matrix = "ē", overrides = {}) {
  return {
    constructionKind: "ownerhood",
    source: {
      sourceStem: matrix === "ē" ? "caxitl" : "cal",
      nounClass: matrix === "ē" ? "tli" : "zero",
      nounSubclass: matrix === "ē" ? "2-b" : "",
      ownerhoodMatrix: matrix,
    },
    subject: "3sg",
    state: "absolutive",
    ...overrides,
  };
}

function nominalContinuationRequest(overrides = {}) {
  return {
    constructionKind: "nominal-continuation",
    source: {
      sourceStage: "derived-nounstem",
      sourceStem: "mic-ca",
      matrixStem: "tēuctli",
      matrixClass: "tli",
    },
    subject: "3sg",
    state: "absolutive",
    ...overrides,
  };
}

function verbalContinuationRequest(overrides = {}) {
  return {
    constructionKind: "verbal-continuation",
    source: {
      sourceStage: "derived-nounstem",
      sourceStem: "mic-ca",
      embedClass: "zero",
      matrixStem: "chōca",
      matrixVerbClass: "A",
      matrixValence: "intransitive",
    },
    relation: "adverb",
    adverbRole: "manner",
    subject: "3sg",
    mood: "indicative",
    tense: "present",
    voice: "active",
    ...overrides,
  };
}

function compact(runtime, frame) {
  const operation = frame?.operationFrame || {};
  return {
    authorizationStatus: frame?.authorizationStatus || "blocked",
    blockReason: frame?.blockReason || "",
    canonicalResult:
      runtime.isClassicalNahuatlDeverbalNncGrammarFrame?.(frame) === true,
    operationId: operation.operationId || "",
    sourceStage: operation.sourceStage || frame?.sourceFrame?.sourceStage || "",
    sourceStem: frame?.sourceFrame?.sourceStem || "",
    sourceImperfectiveStem:
      frame?.sourceFrame?.sourceImperfectiveStem || "",
    sourceStemDerivedByCanonicalOwner:
      frame?.sourceFrame?.sourceStemDerivedByCanonicalOwner === true,
    perfectiveChangeRule:
      frame?.sourceFrame?.canonicalStageDerivationFrame
        ?.perfectiveChangeRule || "",
    sourceVoice: operation.sourceVoice || frame?.sourceFrame?.sourceVoice || "",
    sourceValence: operation.sourceValence || frame?.sourceFrame?.sourceValence || "",
    sourceObjectPattern:
      operation.sourceObjectPattern || frame?.sourceFrame?.sourceObjectPattern || "",
    targetStems: operation.targetStems || {},
    proofObservations: operation.semanticProfile || {},
    selectedResultState: frame?.canonicalResult?.state || "",
    selectedResultStem:
      frame?.canonicalResult?.nncSlotFrame?.slots?.predicate?.stem || "",
    nounClass: operation.nounClass || "",
    connectorProfile: operation.connectorProfile || "",
    singularConnectorChoice: operation.singularConnectorChoice || "",
    pluralConnector: operation.pluralConnector || "",
    possessiveSingularConnector: operation.possessiveSingularConnector || "",
    allowedStates: operation.allowedStates || [],
    transformedPossessor: operation.transformedPossessor || "",
    externalObjectPerson: operation.externalObjectPerson || "",
    activatedProjectiveObject: operation.activatedProjectiveObject === true,
    lexicalFamily: operation.lexicalFamily || "",
    preteritAgentiveVariant: operation.preteritAgentiveVariant || "",
    boundaryVariant: operation.boundaryVariant || "",
    ownerhoodMatrix: operation.ownerhoodMatrix || "",
    continuationRelation: operation.continuationRelation || "",
    participantTransform: operation.participantTransform || {},
    rules: Object.fromEntries(
      (operation.appliedSemanticRules || []).map(rule => [rule, true]),
    ),
    canonicalTargetEvaluator: frame?.canonicalTargetEvaluator || "",
    formulaRealization: frame?.formulaRealization || "",
    wordSurface: frame?.wordSurface || "",
    gcdSatisfied: frame?.greatestCommonDivisor?.satisfied === true,
    lcmComplete:
      frame?.leastCommonMultiple?.licensedAxisSetComplete === true,
    callerSuppliedAuthorityAccepted:
      frame?.callerSuppliedAuthorityAccepted === true,
  };
}

function evaluate(runtime, request) {
  return compact(runtime, runtime.evaluateClassicalNahuatlDeverbalNnc(request));
}

function compare(runtime, firstRequest, secondRequest, relation) {
  const first = evaluate(runtime, firstRequest);
  const second = evaluate(runtime, secondRequest);
  return {
    authorizationStatus: first.authorizationStatus === "authorized"
      && second.authorizationStatus === "authorized"
      ? "authorized" : "blocked",
    blockReason: "",
    relation,
    first,
    second,
    distinctOperationIds: first.operationId !== second.operationId,
    distinctSourceStages: first.sourceStage !== second.sourceStage,
  };
}

function buildProjection(runtime) {
  const activatedRequest = patchSource(
    predicateRequest("preterit-agentive", { activatedObjectPerson: "3sg" }),
    {
      sourceStem: "mah-mat",
      verbClass: "B",
      sourceValence: "single-object",
      sourceObjectPattern: "nonspecific-nonhuman",
    },
  );
  const archaicRequest = patchSource(
    predicateRequest("preterit-agentive", {
      preteritAgentiveVariant: "archaic-que",
    }),
    { sourceStem: "yah", verbClass: "B" },
  );
  const possessiveRequest = predicateRequest("preterit-agentive", {
    state: "possessive",
    possessor: "3sg",
  });
  const nemiPreteritAgentiveRequest = patchSource(
    predicateRequest("preterit-agentive"),
    {
      sourceStem: "",
      sourceImperfectiveStem: "nemi",
      verbClass: "B",
      sourceVoice: "active",
      sourceValence: "intransitive",
      sourceObjectPattern: "none",
      sourceSubject: "3sg",
    },
  );
  const customaryFullRequest = predicateRequest("customary-agentive-full");
  const customaryReanalysisRequest =
    predicateRequest("customary-agentive-reanalysis");
  const finalILossRequest = patchSource(
    predicateRequest("customary-agentive-full", {
      finalIRealization: "drop",
      boundaryContext: "compound",
    }),
    {
      sourceStem: "tē-cuā",
      sourceValence: "single-object",
    },
  );
  const instrumentivePossessiveRequest = patchSource(
    predicateRequest("instrumentive", { state: "possessive" }),
    {
      sourceStage: "imperfect-predicate",
      sourceVoice: "active",
      sourceValence: "single-object",
      sourceSubject: "1sg",
    },
  );
  const preterit = runtime.evaluateClassicalNahuatlDeverbalNnc(
    predicateRequest("preterit-agentive"),
  );
  const customary = runtime.evaluateClassicalNahuatlDeverbalNnc(
    customaryReanalysisRequest,
  );
  const doubleNucleusRequest = {
    constructionKind: "double-nucleus-ownerhood",
    source: {
      principalNncFrame: preterit?.canonicalResult?.nncSlotFrame,
      supplementNncFrame: customary?.canonicalResult?.nncSlotFrame,
      lexicalizedFixedOrder: true,
    },
    subject: "3sg",
    state: "absolutive",
  };
  const cases = {
    structuralNominalization: evaluate(
      runtime, predicateRequest("preterit-agentive"),
    ),
    preteritAgentive: evaluate(runtime, predicateRequest("preterit-agentive")),
    preteritAgentiveNemi: evaluate(runtime, nemiPreteritAgentiveRequest),
    preteritRestricted: evaluate(runtime, patchSource(
      predicateRequest("preterit-agentive", { numberConnector: "silent" }),
      {
        sourceStem: "tla-mach-ti",
        verbClass: "B",
        sourceValence: "single-object",
        sourceObjectPattern: "nonspecific-nonhuman",
      },
    )),
    preteritAsPresent: evaluate(runtime, predicateRequest("preterit-agentive")),
    preteritPatientive: evaluate(
      runtime, predicateRequest("preterit-patientive"),
    ),
    preteritCompoundSource: evaluate(runtime, patchSource(
      predicateRequest("preterit-agentive"),
      {
        sourceStem: "tla-mach-ti",
        sourceValence: "single-object",
        sourceObjectPattern: "nonspecific-nonhuman",
      },
    )),
    preteritNumberSelection: evaluate(runtime, patchSource(
      predicateRequest("preterit-agentive", { numberConnector: "silent" }),
      { verbClass: "B" },
    )),
    preteritActivated: evaluate(runtime, activatedRequest),
    preteritGeneralUse: evaluate(runtime, possessiveRequest),
    preteritArchaic: evaluate(runtime, archaicRequest),
    preteritPossessive: evaluate(runtime, possessiveRequest),
    preteritPossessiveYo: evaluate(runtime, nominalContinuationRequest()),
    preteritPatientivePossessive: evaluate(
      runtime,
      predicateRequest("preterit-patientive", {
        state: "possessive", possessor: "3sg",
      }),
    ),
    preteritYauhOwner: evaluate(runtime, patchSource(
      predicateRequest("preterit-agentive", {
        state: "possessive",
        possessor: "3sg",
        preteritAgentiveVariant: "yauh-ti-owner",
      }),
      { sourceStem: "yah", verbClass: "B" },
    )),
    preteritEmbed: evaluate(runtime, nominalContinuationRequest()),
    preteritAffectiveHybrid: evaluate(runtime, activatedRequest),
    preteritOldPerson: evaluate(runtime, patchSource(
      predicateRequest("preterit-agentive", { numberConnector: "silent" }),
      { sourceStem: "ilama-ti", verbClass: "B" },
    )),
    ownerhoodBase: evaluate(runtime, ownerhoodRequest("ē")),
    ownerhoodSelection: compare(
      runtime, ownerhoodRequest("ē"), ownerhoodRequest("huā"),
      "class-conditioned-e-versus-hua",
    ),
    ownerhoodAbundant: evaluate(runtime, ownerhoodRequest("yō-ā", {
      source: {
        sourceStem: "cal",
        nounClass: "zero",
        ownerhoodMatrix: "yō-ā",
      },
    })),
    ownerhoodAnalysis: compare(
      runtime, ownerhoodRequest("ē"), ownerhoodRequest("yō-ā", {
        source: {
          sourceStem: "cal",
          nounClass: "zero",
          ownerhoodMatrix: "yō-ā",
        },
      }),
      "ordinary-versus-abundant-ownerhood",
    ),
    preteritVncContinuation: evaluate(runtime, verbalContinuationRequest()),
    activatedComplementObject: evaluate(runtime, verbalContinuationRequest({
      source: {
        sourceStage: "derived-nounstem",
        sourceStem: "chīhua-l",
        embedClass: "tli",
        sourceState: "possessive",
        possessor: "1sg",
        possessorToObjectTransfer: true,
        matrixFamily: "toca",
        matrixStem: "toca",
        matrixVerbClass: "A",
        matrixValence: "single-object",
      },
      relation: "complement",
      orientation: "object",
      complementKind: "pretending",
    })),
    vocativeBoundary: evaluate(runtime, {
      constructionKind: "vocative",
      source: { wordStem: "pix", numberConnector: "c" },
    }),
    doubleNucleusOwnerhood: evaluate(runtime, doubleNucleusRequest),
    customaryTwoDegrees: compare(
      runtime, customaryReanalysisRequest, customaryFullRequest,
      "reanalysis-versus-full-nominalization",
    ),
    customaryReanalysis: evaluate(runtime, customaryReanalysisRequest),
    customaryFull: evaluate(runtime, customaryFullRequest),
    customaryFinalILoss: evaluate(runtime, finalILossRequest),
    customaryActivated: evaluate(runtime, patchSource(
      predicateRequest("customary-agentive-full", {
        activatedObjectPerson: "3sg",
      }),
      {
        sourceStem: "mah-mat",
        verbClass: "B",
        sourceValence: "single-object",
        sourceObjectPattern: "nonspecific-nonhuman",
      },
    )),
    agentiveSourceStageContrast: compare(
      runtime, predicateRequest("preterit-agentive"),
      customaryReanalysisRequest,
      "preterit-versus-customary-source-stage",
    ),
    customaryPatientive: evaluate(
      runtime, predicateRequest("customary-patientive"),
    ),
    instrumentive: compare(
      runtime, predicateRequest("instrumentive"),
      instrumentivePossessiveRequest,
      "customary-impersonal-versus-imperfect-active",
    ),
    instrumentiveEvidence: compare(
      runtime, predicateRequest("instrumentive"),
      instrumentivePossessiveRequest,
      "cross-state-instrumentive-evidence",
    ),
    presentAgentive: evaluate(
      runtime, predicateRequest("present-agentive"),
    ),
    futureAgentive: evaluate(runtime, predicateRequest("future-agentive")),
    actionTaxonomy: compare(
      runtime, predicateRequest("passive-action"),
      predicateRequest("active-action"),
      "passive-versus-active-action",
    ),
    passiveAction: evaluate(runtime, predicateRequest("passive-action")),
    activeAction: evaluate(runtime, predicateRequest("active-action")),
    homophonyTypedAnalysis: compare(
      runtime, predicateRequest("active-action"),
      predicateRequest("preterit-agentive"),
      "active-action-versus-preterit-agentive",
    ),
  };
  const copiedNucleus = JSON.parse(JSON.stringify(
    preterit?.canonicalResult?.nncSlotFrame || {},
  ));
  if (copiedNucleus?.slots?.predicate) {
    copiedNucleus.slots.predicate.stem = "forged";
  }
  const blockedCases = {
    wrongPreteritStage: evaluate(runtime, patchSource(
      predicateRequest("preterit-agentive"),
      { sourceStage: "present-predicate" },
    )),
    forgedDoubleNucleus: evaluate(runtime, {
      ...doubleNucleusRequest,
      source: {
        ...doubleNucleusRequest.source,
        principalNncFrame: copiedNucleus,
      },
    }),
    callerPoison: evaluate(runtime, {
      ...predicateRequest("preterit-agentive"),
      displayFormula: "#forged#",
      resultSurface: "forged",
    }),
  };
  const positivesValid = Object.values(cases).every(record => (
    record.authorizationStatus === "authorized"
    && (record.canonicalResult === true
      || (record.first?.canonicalResult === true
        && record.second?.canonicalResult === true))
  ));
  const blockedValid = Boolean(
    blockedCases.wrongPreteritStage.authorizationStatus === "blocked"
    && blockedCases.forgedDoubleNucleus.authorizationStatus === "blocked"
    && blockedCases.callerPoison.authorizationStatus === "blocked"
    && cases.customaryTwoDegrees.distinctOperationIds === true
    && cases.agentiveSourceStageContrast.distinctSourceStages === true
    && cases.homophonyTypedAnalysis.distinctOperationIds === true
  );
  return deepFreeze({
    kind: "classical-nahuatl-deverbal-nnc-validation-frame",
    authorizationStatus: positivesValid && blockedValid
      ? "authorized" : "blocked",
    blockReason: positivesValid && blockedValid
      ? "" : "classical-deverbal-nnc-validation-coordinate-blocked",
    typedFrameAuthority: true,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
    storedExampleAuthority: false,
    translationAuthority: false,
    curriculumMetadataAuthority: false,
    actionTaxonomyDefinition: {
      authorizationStatus: "authorized",
      stemSemanticRange: [
        "action",
        "process",
        "event",
        "resultant-state",
        "related-notion",
      ],
      labelQualification: {
        term: "action-nnc",
        fullyExhaustive: false,
        mayName: ["instance-of-action", "result-of-action"],
      },
    },
    contract: {
      evidenceOnly: true,
      evidenceRoles: {
        preteritAsPresent: true,
        ownerhoodInterpretation: true,
        agentiveSourceStageContrast: true,
        instrumentiveExceptions: true,
        nominalizationHomophony: true,
      },
      separateOwnerProofRequired: true,
      sourceStageCannotBeCollapsedByTranslation: true,
      homophonyCannotCollapseOperationIdentity: true,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
      storedExampleAuthority: false,
      translationAuthority: false,
    },
    cases,
    blockedCases,
  });
}

export function createClassicalDeverbalNncValidationSemanticOperationsApi(
  targetObject = globalThis,
) {
  const issuedFrames = new WeakSet();
  let cachedProjection = null;
  function buildClassicalNahuatlDeverbalNncValidationFrame() {
    if (!cachedProjection) {
      cachedProjection = buildProjection(targetObject);
      if (cachedProjection.authorizationStatus === "authorized") {
        issuedFrames.add(cachedProjection);
      }
    }
    return cachedProjection;
  }
  function isClassicalNahuatlDeverbalNncValidationFrame(frame = null) {
    return Boolean(
      frame
      && issuedFrames.has(frame)
      && frame.kind === "classical-nahuatl-deverbal-nnc-validation-frame"
      && frame.authorizationStatus === "authorized"
      && frame.typedFrameAuthority === true
      && frame.formulaStringAuthority === false
      && frame.surfaceStringAuthority === false
      && frame.storedExampleAuthority === false
      && frame.translationAuthority === false
      && frame.curriculumMetadataAuthority === false
      && Object.isFrozen(frame)
    );
  }
  return Object.freeze({
    buildClassicalNahuatlDeverbalNncValidationFrame,
    isClassicalNahuatlDeverbalNncValidationFrame,
  });
}
