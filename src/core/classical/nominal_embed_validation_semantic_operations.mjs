// Non-authorizing live validation projection for the independently owned
// nominal-embed semantics indexed by Andrews Lesson 30. It owns no Inventory
// atom. Canvas examples and translations remain evidence only; every grammar
// witness below is evaluated by the canonical typed nominal-construction path.

function deepFreeze(value, seen = new WeakSet()) {
  if (!value || typeof value !== "object" || seen.has(value)) return value;
  seen.add(value);
  for (const nested of Object.values(value)) deepFreeze(nested, seen);
  return Object.freeze(value);
}

function baseRequest(overrides = {}) {
  return {
    constructionKind: "nominal-embed-vnc",
    source: {
      embedStem: "coy-ō",
      embedClass: "zero",
      matrixStem: "chōca",
      matrixVerbClass: "A",
      matrixValence: "intransitive",
    },
    relation: "adverb",
    route: "direct-adverb",
    adverbRole: "compared-manner",
    orientation: "subject",
    subject: "3sg",
    mood: "indicative",
    tense: "present",
    voice: "active",
    outputKind: "single",
    ...overrides,
  };
}

function objectRequest(overrides = {}) {
  return baseRequest({
    relation: "object",
    route: "object",
    source: {
      embedStem: "xō-chi",
      embedClass: "zero",
      matrixStem: "tēm-o-a",
      matrixVerbClass: "C",
      matrixValence: "single-object",
    },
    subject: "1sg",
    ...overrides,
  });
}

function patchSource(request, patch = {}) {
  return { ...request, source: { ...(request.source || {}), ...patch } };
}

function compact(runtime, frame) {
  const operation = frame?.operationFrame || {};
  const rules = Object.fromEntries(
    (operation.appliedSemanticRules || []).map(rule => [rule, true]),
  );
  const canonicalRestriction =
    frame?.semanticRestrictionFrame?.restrictionEnforced === true;
  return {
    authorizationStatus: frame?.authorizationStatus || "blocked",
    blockReason: frame?.blockReason || "",
    canonicalResult:
      runtime.isClassicalNahuatlNominalConstructionResult?.(frame) === true,
    canonicalRestriction,
    sourceKind: frame?.sourceFrame?.kind || "",
    operationKind: operation.kind || "",
    relation: operation.relation || "",
    route: operation.route || "",
    semanticRole: operation.semanticRole || "",
    orientation: operation.orientation || "",
    sourceValencePositionCount:
      operation.sourceValencePositionCount ?? -1,
    targetValencePositionCount:
      operation.targetValencePositionCount ?? -1,
    targetSourceValence: operation.targetSourceValence || "",
    selectedVoice: operation.selectedVoice || "",
    compoundStem: operation.compoundStem || "",
    embedRule: operation.embedShape?.ruleId || "",
    realizedEmbedStem: operation.embedShape?.realizedStem || "",
    embedReduplication: operation.embedReduplication || "",
    matrixReduplication: operation.matrixReduplication || "",
    restrictions: [...(operation.restrictions || [])],
    rules,
    embedIsAgent: operation.embedIsAgent === true,
    embedIsGrammaticalSubject:
      operation.embedIsGrammaticalSubject === true,
    passiveAgentExpressible:
      operation.passiveAgentExpressible === true,
    valenceChanged: operation.valenceChanged === true,
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
  return compact(
    runtime,
    runtime.evaluateClassicalNahuatlNominalConstruction(request),
  );
}

function preteritAgentiveFrame(runtime) {
  return runtime.evaluateClassicalNahuatlDeverbalNnc({
    constructionKind: "predicate-nominalization",
    nominalizationKind: "preterit-agentive",
    source: {
      sourceStage: "preterit-predicate",
      sourceStem: "pix-ca",
      verbClass: "A",
      sourceVoice: "active",
      sourceValence: "intransitive",
      sourceObjectPattern: "none",
      sourceSubject: "3sg",
    },
    subject: "3sg",
    state: "absolutive",
  });
}

function buildProjection(runtime) {
  const agentiveResult = preteritAgentiveFrame(runtime);
  const agentiveRequest = patchSource(baseRequest(), {
    embedStem: "pix-ca-0",
    embedConstituent: {
      kind: "preterit-agentive-nnc",
      stem: "pix-ca-0",
      resultFrame: agentiveResult,
    },
  });
  const cases = {
    base: evaluate(runtime, baseRequest()),
    object: evaluate(runtime, objectRequest()),
    atli: evaluate(runtime, patchSource(objectRequest(), {
      embedStem: "ā",
      matrixStem: "ī",
    })),
    tlaFusion: evaluate(runtime, patchSource(baseRequest({
      adverbRole: "means",
    }), { matrixStem: "tla-cui" })),
    direct: evaluate(runtime, baseRequest({ adverbRole: "means" })),
    directPossessorDeletion: evaluate(runtime, patchSource(baseRequest({
      adverbRole: "means",
    }), { embedStem: "mā" })),
    place: evaluate(runtime, baseRequest({ adverbRole: "place" })),
    timeDuration: evaluate(runtime, baseRequest({ adverbRole: "duration" })),
    causePurpose: evaluate(runtime, baseRequest({ adverbRole: "purpose" })),
    manner: evaluate(runtime, baseRequest({ adverbRole: "manner" })),
    comparedManner: evaluate(runtime, baseRequest()),
    comparedMannerObject: evaluate(runtime, baseRequest({
      source: { ...baseRequest().source, matrixValence: "single-object" },
      orientation: "object",
    })),
    agentiveEmbed: evaluate(runtime, agentiveRequest),
    uniqueLexeme: evaluate(runtime, patchSource(baseRequest(), {
      embedStem: "il",
    })),
    ihFamily: evaluate(runtime, patchSource(baseRequest(), {
      embedStem: "ih",
    })),
    ihInteraction: evaluate(runtime, patchSource(baseRequest({
      embedReduplication: "affinity",
    }), { embedStem: "ih" })),
    supplementSubject: evaluate(runtime, patchSource(baseRequest({
      route: "supplement-subject",
      adverbRole: "means",
    }), { embedState: "possessive" })),
    supplementObject: evaluate(runtime, patchSource(objectRequest({
      relation: "adverb",
      route: "supplement-object",
      adverbRole: "means",
    }), { embedState: "possessive", possessionKind: "less-intimate" })),
    directAmbiguity: evaluate(runtime, patchSource(baseRequest({
      sourceAnalysis: "direct",
    }), { embedStem: "icxi", matrixStem: "toh-toca" })),
    lessIntimate: evaluate(runtime, patchSource(objectRequest({
      relation: "adverb",
      route: "supplement-object",
      adverbRole: "means",
    }), { embedState: "possessive", possessionKind: "less-intimate" })),
    passiveBarrier: evaluate(runtime, baseRequest({
      route: "passive-adverbialized-subject",
      adverbRole: "means",
    })),
    complementSubject: evaluate(runtime, baseRequest({
      relation: "complement",
      route: "complement",
      orientation: "subject",
      complementKind: "considering",
    })),
    complementConsidering: evaluate(runtime, baseRequest({
      relation: "complement",
      route: "complement",
      orientation: "object",
      complementKind: "considering",
    })),
    complementChanging: evaluate(runtime, baseRequest({
      relation: "complement",
      route: "complement",
      orientation: "object",
      complementKind: "changing",
    })),
    reduplication: evaluate(runtime, baseRequest({
      embedReduplication: "affinity",
    })),
  };
  const blockedCases = {
    missingAgentivePrerequisite: evaluate(runtime, patchSource(
      agentiveRequest,
      {
        embedConstituent: {
          kind: "preterit-agentive-nnc",
          stem: "pix-ca-0",
        },
      },
    )),
    intimateApplicative: evaluate(runtime, patchSource(objectRequest({
      relation: "adverb",
      route: "supplement-object",
      adverbRole: "means",
    }), {
      embedState: "possessive",
      possessionKind: "intimate",
      matrixStem: "mil-chihui-lia",
    })),
    ambiguousNuance: evaluate(runtime, baseRequest({
      relation: "complement",
      route: "complement",
      orientation: "object",
      complementKind: "pretending",
      preciseAsIfNuance: true,
    })),
    incorporatedObjectPassive: evaluate(runtime, objectRequest({
      voice: "passive",
    })),
    callerPoison: evaluate(runtime, {
      ...baseRequest(),
      displayFormula: "#forged#",
      resultSurface: "forged",
    }),
  };
  const positivesValid = Object.values(cases).every(record => (
    record.authorizationStatus === "authorized"
    && record.canonicalResult
    && record.gcdSatisfied
    && record.lcmComplete
    && !record.callerSuppliedAuthorityAccepted
  ));
  const blockedValid = Boolean(
    blockedCases.missingAgentivePrerequisite.blockReason
      === "preterit-agentive-embed-constituent-mismatch"
    && blockedCases.intimateApplicative.authorizationStatus === "blocked"
    && blockedCases.ambiguousNuance.canonicalRestriction
    && blockedCases.incorporatedObjectPassive.authorizationStatus === "blocked"
    && blockedCases.callerPoison.authorizationStatus === "blocked"
  );
  const authorized = positivesValid && blockedValid;
  return deepFreeze({
    kind: "classical-nahuatl-nominal-embed-validation-frame",
    authorizationStatus: authorized ? "authorized" : "blocked",
    blockReason: authorized
      ? ""
      : "classical-nominal-embed-validation-coordinate-blocked",
    typedFrameAuthority: true,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
    storedExampleAuthority: false,
    translationAuthority: false,
    curriculumMetadataAuthority: false,
    contract: {
      semanticRelations: ["object", "adverb", "complement"],
      sourceRoutes: [
        "object",
        "direct-adverb",
        "supplement-subject",
        "supplement-object",
        "passive-adverbialized-subject",
        "complement",
      ],
      typedAgentivePrerequisiteRequired: true,
      translationAndIdiomRole: "evidence-only-no-source-route-authority",
      nominalEmbedIsAgent: false,
      nominalEmbedIsGrammaticalSubject: false,
      passiveAgentExpressible: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
      storedExampleAuthority: false,
    },
    cases,
    blockedCases,
  });
}

export function createClassicalNominalEmbedValidationSemanticOperationsApi(
  targetObject = globalThis,
) {
  const issuedFrames = new WeakSet();
  let cachedProjection = null;

  function buildClassicalNahuatlNominalEmbedValidationFrame() {
    if (!cachedProjection) {
      cachedProjection = buildProjection(targetObject);
      if (cachedProjection.authorizationStatus === "authorized") {
        issuedFrames.add(cachedProjection);
      }
    }
    return cachedProjection;
  }

  function isClassicalNahuatlNominalEmbedValidationFrame(frame = null) {
    return Boolean(
      frame
      && issuedFrames.has(frame)
      && frame.kind
        === "classical-nahuatl-nominal-embed-validation-frame"
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
    buildClassicalNahuatlNominalEmbedValidationFrame,
    isClassicalNahuatlNominalEmbedValidationFrame,
  });
}

