// Non-authorizing live validation projection for cardinal-numeral semantics.
// It owns no Inventory atom and stores no Canvas answer. Every fact is emitted
// by the canonical typed nominal-construction and prerequisite engines.

function deepFreeze(value, seen = new WeakSet()) {
  if (!value || typeof value !== "object" || seen.has(value)) return value;
  seen.add(value);
  for (const nested of Object.values(value)) deepFreeze(nested, seen);
  return Object.freeze(value);
}

function baseRequest(overrides = {}) {
  return {
    constructionKind: "cardinal-numeral-nnc",
    value: 1,
    classifier: "basic",
    countKind: "ordinary",
    subject: "3common",
    state: "absolutive",
    animacy: "nonanimate",
    ...overrides,
  };
}

function patchSource(request, patch = {}) {
  return { ...request, source: { ...(request.source || {}), ...patch } };
}

function cobPreteritAgentiveResult(runtime) {
  return runtime.evaluateClassicalNahuatlDeverbalNnc({
    constructionKind: "predicate-nominalization",
    nominalizationKind: "preterit-agentive",
    source: {
      sourceStage: "preterit-predicate",
      sourceStem: "tlami",
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

function compact(runtime, frame) {
  const operation = frame?.operationFrame || {};
  return {
    authorizationStatus: frame?.authorizationStatus || "blocked",
    blockReason: frame?.blockReason || "",
    canonicalResult:
      runtime.isClassicalNahuatlNominalConstructionResult?.(frame) === true,
    sourceKind: frame?.sourceFrame?.kind || "",
    operationKind: operation.kind || "",
    value: operation.value ?? -1,
    countKind: operation.countKind || "",
    classifier: operation.classifier || "",
    stem: operation.stem || "",
    nounClass: operation.nounClass || "",
    reduplication: operation.reduplication || "",
    modifier: operation.modifier || "",
    conjunctionDirection: operation.conjunctionDirection || "",
    rightConjunctRepeatsClassifier:
      operation.rightConjunctRepeatsClassifier === true,
    rules: Object.fromEntries(
      (operation.appliedSemanticRules || []).map(rule => [rule, true]),
    ),
    typedCobPrerequisite: Boolean(
      operation.cobPreteritAgentiveResultFrame
      && runtime.isClassicalNahuatlDeverbalNncGrammarFrame?.(
        operation.cobPreteritAgentiveResultFrame
      ) === true
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
  return compact(
    runtime,
    runtime.evaluateClassicalNahuatlNominalConstruction(request),
  );
}

function classifierRequest(runtime, classifier, overrides = {}) {
  const source = {
    referentClass: classifier === "tecpan" ? "people"
      : classifier === "ipil" ? "paper"
        : classifier === "quimil" ? "blankets" : "",
    ...(classifier === "cob"
      ? { cobPreteritAgentiveResultFrame:
          cobPreteritAgentiveResult(runtime) }
      : {}),
  };
  return patchSource(baseRequest({
    value: classifier === "cob" ? 39
      : ["tecpan", "ipil", "quimil"].includes(classifier) ? 40 : 2,
    classifier,
    ...overrides,
  }), source);
}

function buildProjection(runtime) {
  const cases = {
    base: evaluate(runtime, baseRequest()),
    countKind: evaluate(runtime, baseRequest({
      countKind: "gross",
      subject: "3pl",
      animacy: "animate",
    })),
    numberGate: evaluate(runtime, baseRequest()),
    basicSet: evaluate(runtime, baseRequest({ value: 10 })),
    one: evaluate(runtime, baseRequest({ value: 1 })),
    vncAdverb: evaluate(runtime, patchSource(baseRequest({
      numeralOutputKind: "vnc-adverb",
      subject: "3sg",
    }), {
      matrixStem: "yā",
      matrixVerbClass: "B",
      matrixValence: "intransitive",
    })),
    twoFour: evaluate(runtime, baseRequest({ value: 3 })),
    fourBoundary: evaluate(runtime, baseRequest({ value: 4 })),
    five: evaluate(runtime, baseRequest({ value: 5 })),
    sixNine: evaluate(runtime, baseRequest({ value: 7 })),
    tenFifteen: evaluate(runtime, baseRequest({ value: 15 })),
    grossPossessive: evaluate(runtime, baseRequest({
      value: 2,
      countKind: "gross",
      subject: "3pl",
      state: "possessive",
      animacy: "animate",
      possessor: "3pl",
    })),
    order20: evaluate(runtime, baseRequest({ value: 20 })),
    order400: evaluate(runtime, baseRequest({ value: 400 })),
    order8000: evaluate(runtime, baseRequest({ value: 8000 })),
    conjunction: evaluate(runtime, baseRequest({ value: 21 })),
    conjunctiveCompound: evaluate(runtime, patchSource(
      baseRequest({ value: 11 }),
      { conjunctionForm: "compound" },
    )),
    downgradedMultiplier: evaluate(runtime, baseRequest({ value: 340 })),
    conjunctionAgreement: evaluate(runtime, baseRequest({ value: 21 })),
    higherOrderLink: evaluate(runtime, patchSource(
      baseRequest({ value: 8421 }),
      { higherOrderLink: "īpan" },
    )),
    conjunctionRestriction: evaluate(runtime, baseRequest({ value: 203 })),
    classifierRock: evaluate(runtime, classifierRequest(runtime, "rock")),
    classifierRecursion: evaluate(runtime, patchSource(
      classifierRequest(runtime, "rock"),
      { classifierEmbeddedIn: "nnc" },
    )),
    classifierRow: evaluate(runtime, classifierRequest(runtime, "row")),
    classifierThing: evaluate(runtime, classifierRequest(runtime, "thing")),
    classifierCob: evaluate(runtime, classifierRequest(runtime, "cob")),
    classifierSelection: evaluate(runtime, patchSource(
      classifierRequest(runtime, "rock"),
      { classifierSelectionExplicit: true },
    )),
    twentyClassifierTecpan: evaluate(
      runtime,
      classifierRequest(runtime, "tecpan"),
    ),
    twentyClassifierIpil: evaluate(
      runtime,
      classifierRequest(runtime, "ipil"),
    ),
    twentyClassifierQuimil: evaluate(
      runtime,
      classifierRequest(runtime, "quimil"),
    ),
    reduplication: evaluate(runtime, baseRequest({
      value: 3,
      reduplication: "affinity",
    })),
    reduplicationException: evaluate(runtime, baseRequest({
      value: 7,
      reduplication: "affinity",
    })),
    conjunctionReduplication: evaluate(runtime, baseRequest({
      value: 21,
      reduplication: "affinity",
    })),
    modifier: evaluate(runtime, baseRequest({ value: 3, modifier: "oc" })),
    measure: evaluate(runtime, patchSource(baseRequest({
      value: 1,
      classifier: "measure",
      measureComposition: "measure-only",
    }), { measureStem: "tla-māma-l", measureClass: "tli" })),
    adjectivalModification: evaluate(runtime, patchSource(baseRequest({
      value: 1,
      classifier: "measure",
      measureComposition: "with-measured-nnc",
    }), {
      measureStem: "tla-māma-l",
      measureClass: "tli",
      measuredStem: "tlacuā-l",
      measuredClass: "tli",
    })),
  };
  const cobFrame = cobPreteritAgentiveResult(runtime);
  const blockedCases = {
    missingCobPrerequisite: evaluate(
      runtime,
      baseRequest({ value: 39, classifier: "cob" }),
    ),
    forgedCobPrerequisite: evaluate(runtime, patchSource(
      baseRequest({ value: 39, classifier: "cob" }),
      {
        cobPreteritAgentiveResultFrame:
          JSON.parse(JSON.stringify(cobFrame)),
      },
    )),
    cobBeyond39: evaluate(runtime, patchSource(
      baseRequest({ value: 40, classifier: "cob" }),
      { cobPreteritAgentiveResultFrame: cobFrame },
    )),
    sameMatrixPoison: evaluate(runtime, patchSource(
      baseRequest({ value: 203 }),
      { sameMatrixConjunctionAllowed: true },
    )),
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
    blockedCases.missingCobPrerequisite.blockReason
      === "cob-twenty-route-requires-engine-issued-tlamic-preterit-agentive"
    && blockedCases.forgedCobPrerequisite.blockReason
      === "cob-twenty-route-requires-engine-issued-tlamic-preterit-agentive"
    && blockedCases.cobBeyond39.blockReason
      === "cob-classifier-is-not-licensed-beyond-thirty-nine"
    && blockedCases.callerPoison.authorizationStatus === "blocked"
    && cases.classifierCob.typedCobPrerequisite === true
  );
  return deepFreeze({
    kind: "classical-nahuatl-cardinal-numeral-validation-frame",
    authorizationStatus: positivesValid && blockedValid
      ? "authorized" : "blocked",
    blockReason: positivesValid && blockedValid
      ? "" : "classical-cardinal-numeral-validation-coordinate-blocked",
    typedFrameAuthority: true,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
    storedExampleAuthority: false,
    translationAuthority: false,
    curriculumMetadataAuthority: false,
    contract: {
      evidenceOnly: true,
      evidenceRoles: {
        basicSetInventory: true,
        twoFourExamples: true,
        fiveDerivationHistory: true,
        tenFifteenAnalysis: true,
        grossPossessiveSpelling: true,
        conjunctionAgreementSpelling: true,
        conjunctionRestrictionDocumentation: true,
        classifierSelectionVariation: true,
      },
      cobTwentyRouteRequiresOwnerIssuedPreteritAgentive: true,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
      storedExampleAuthority: false,
    },
    cases,
    blockedCases,
  });
}

export function createClassicalCardinalNumeralValidationSemanticOperationsApi(
  targetObject = globalThis,
) {
  const issuedFrames = new WeakSet();
  let cachedProjection = null;
  function buildClassicalNahuatlCardinalNumeralValidationFrame() {
    if (!cachedProjection) {
      cachedProjection = buildProjection(targetObject);
      if (cachedProjection.authorizationStatus === "authorized") {
        issuedFrames.add(cachedProjection);
      }
    }
    return cachedProjection;
  }
  function isClassicalNahuatlCardinalNumeralValidationFrame(frame = null) {
    return Boolean(
      frame
      && issuedFrames.has(frame)
      && frame.kind
        === "classical-nahuatl-cardinal-numeral-validation-frame"
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
    buildClassicalNahuatlCardinalNumeralValidationFrame,
    isClassicalNahuatlCardinalNumeralValidationFrame,
  });
}
