// Non-authorizing live validation projection for affective-NNC semantics.
// It owns no Inventory atom and stores no Canvas answer. Every grammar fact
// below is projected from the canonical typed nominal-construction evaluator.

function deepFreeze(value, seen = new WeakSet()) {
  if (!value || typeof value !== "object" || seen.has(value)) return value;
  seen.add(value);
  for (const nested of Object.values(value)) deepFreeze(nested, seen);
  return Object.freeze(value);
}

function baseRequest(overrides = {}) {
  return {
    constructionKind: "affective-nnc",
    source: { embedStem: "chichi", embedClass: "zero" },
    affectRoute: "compound",
    affectiveMatrix: "tzin",
    semanticReading: "ordinary-affective",
    subject: "3sg",
    state: "absolutive",
    animacy: "animate",
    ...overrides,
  };
}

function patchSource(request, patch = {}) {
  return { ...request, source: { ...(request.source || {}), ...patch } };
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
    affectRoute: operation.affectRoute || "",
    affectiveMatrix: operation.affectiveMatrix || "",
    semanticReading: operation.semanticReading || "",
    compoundStem: operation.compoundStem || "",
    matrixClass: operation.matrixClass || "",
    reduplication: operation.reduplication || "",
    affectiveSemanticContribution:
      operation.affectiveMatrixFrame?.semanticContribution || "",
    tonMatrix: operation.tonMatrixFrame ? {
      selectedMeaning: operation.tonMatrixFrame.selectedMeaning || "",
      compatibleEmbedAdmission:
        operation.tonMatrixFrame.compatibleEmbedAdmission || "",
      recursiveEmbedAvailable:
        operation.tonMatrixFrame.recursiveEmbedAvailable === true,
    } : null,
    tzinMatrix: operation.tzinMatrixFrame ? {
      selectedMeaning: operation.tzinMatrixFrame.selectedMeaning || "",
      availableMeanings: [
        ...(operation.tzinMatrixFrame.availableMeanings || []),
      ],
      meaningChoiceRequired:
        operation.tzinMatrixFrame.meaningChoiceRequired === true,
    } : null,
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

export function buildClassicalNahuatlTonTzinSemanticContrastConstraint({
  tonCase = {},
  tzinCase = {},
} = {}) {
  const ton = tonCase.tonMatrix || {};
  const tzin = tzinCase.tzinMatrix || {};
  const tzinAvailableMeanings = [...(tzin.availableMeanings || [])];
  const tonAffectionAvailable = [
    ton.selectedMeaning,
    ...(ton.availableMeanings || []),
  ].includes("affection");
  const tzinAffectionAvailable = tzinAvailableMeanings.includes("affection");
  const authorized = tonCase.authorizationStatus === "authorized"
    && tonCase.affectiveMatrix === "tōn"
    && tonCase.affectiveSemanticContribution
      === "smallness-without-admiration-or-affection"
    && ton.selectedMeaning === "smallness-without-admiration-or-affection"
    && ton.compatibleEmbedAdmission === "open-typed-nnc-source"
    && ton.recursiveEmbedAvailable === true
    && tonAffectionAvailable === false
    && tzinCase.authorizationStatus === "authorized"
    && tzinCase.affectiveMatrix === "tzin"
    && tzinCase.affectiveSemanticContribution === "special-regard"
    && tzin.selectedMeaning === "special-regard"
    && tzin.meaningChoiceRequired === true
    && tzinAffectionAvailable === true;
  return deepFreeze({
    authorizationStatus: authorized ? "authorized" : "blocked",
    blockReason: authorized
      ? "" : "ton-tzin-semantic-contrast-coordinate-blocked",
    tōn: {
      selectedMeaning: ton.selectedMeaning || "",
      affectionAvailable: tonAffectionAvailable,
    },
    tzin: {
      ordinaryMeaning: tzin.selectedMeaning || "",
      availableMeanings: tzinAvailableMeanings,
      affectionAvailable: tzinAffectionAvailable,
    },
  });
}

function evaluate(runtime, request) {
  const record = compact(
    runtime,
    runtime.evaluateClassicalNahuatlNominalConstruction(request),
  );
  return {
    ...record,
    requestedAffectiveMatrix: request?.affectiveMatrix || "",
  };
}

export function buildClassicalDenominalAttitudeRestrictionPair(
  blockedCases = {},
) {
  const expected = {
    tzin: "tzin-denominal-vnc-is-restricted-to-honorific-matrix-operation",
    pol: "pol-denominal-vnc-is-restricted-to-pejorative-matrix-operation",
  };
  const branches = {
    tzin: blockedCases.freeTzinDenominal || {},
    pol: blockedCases.freePolDenominal || {},
  };
  const authorizationStatus = Object.entries(branches).every(
    ([branchId, record]) => (
      record.authorizationStatus === "blocked"
      && record.blockReason === expected[branchId]
      && record.canonicalResult === true
      && record.requestedAffectiveMatrix
        === (branchId === "tzin" ? "tzin" : "pōl")
    ),
  ) ? "authorized" : "blocked";
  return deepFreeze({
    authorizationStatus,
    blockReason: authorizationStatus === "authorized"
      ? "" : "paired-affective-denominal-restriction-not-proven",
    branches: Object.fromEntries(Object.entries(branches).map(
      ([branchId, record]) => [branchId, {
        authorizationStatus: record.authorizationStatus || "blocked",
        restrictionReason: record.blockReason || "",
        affectiveMatrix: record.requestedAffectiveMatrix || "",
      }],
    )),
  });
}

function buildProjection(runtime) {
  const flawed = (stem = "tzapa", extras = {}) => patchSource(baseRequest({
    affectRoute: "flawed-subject",
    affectiveMatrix: "",
    defectAnalysis: "defect",
    ...extras,
  }), {
    embedStem: stem,
    embedClass: "tli",
    flawedSubjectAnalysis: {
      lexicalStatus: "flawed-subject-lexical-analysis",
      sourceStem: stem,
      availability: "optional",
      semanticDomain: "abnormal-or-defective-entity",
      defectEntityAmbiguous: false,
      neutralStemClass: "tli",
      flawedStemClassStrategy: "irregular-silent-num1",
      lexicalReading: "",
      usuallyRooster: false,
    },
  });
  const cases = {
    base: evaluate(runtime, baseRequest()),
    pilPol: evaluate(runtime, baseRequest({ affectiveMatrix: "pōl" })),
    lexicalizedClass: evaluate(runtime, patchSource(
      baseRequest({ affectiveMatrix: "pōl" }),
      {
        embedStem: "cal",
        embedClass: "tli",
        affectiveLexicalAnalysis: {
          lexicalStatus: "affective-compound-lexical-analysis",
          embedStem: "cal",
          matrixStem: "pōl",
          lexicalizedSpecialMeaning: true,
          classException: false,
          resultClass: "tli",
          embedVariantStem: "",
          variantKind: "",
        },
      },
    )),
    tzinTonClass: evaluate(runtime, baseRequest({ affectiveMatrix: "tōn" })),
    massDelimitation: evaluate(runtime, baseRequest({
      affectiveMatrix: "tzin",
      semanticReading: "mass-delimited",
    })),
    vocative: evaluate(runtime, baseRequest({ state: "vocative" })),
    tonException: evaluate(runtime, patchSource(
      baseRequest({ affectiveMatrix: "tōn" }),
      {
        embedStem: "quimich",
        embedClass: "in",
        affectiveLexicalAnalysis: {
          lexicalStatus: "affective-compound-lexical-analysis",
          embedStem: "quimich",
          matrixStem: "tōn",
          lexicalizedSpecialMeaning: false,
          classException: true,
          resultClass: "zero",
          embedVariantStem: "",
          variantKind: "",
        },
      },
    )),
    zol: evaluate(runtime, patchSource(baseRequest({
      affectiveMatrix: "zol",
      animacy: "nonanimate",
    }), { animacy: "nonanimate" })),
    zolDenominal: evaluate(runtime, patchSource(baseRequest({
      affectiveOutputKind: "denominal-vnc",
      affectiveMatrix: "zol",
      denominalKind: "inchoative",
    }), { embedStem: "zol", embedClass: "tli" })),
    affinityAbsolutive: evaluate(runtime, baseRequest({
      subject: "3pl",
      reduplication: "affinity",
    })),
    affinityPossessive: evaluate(runtime, baseRequest({
      subject: "3pl",
      state: "possessive",
      reduplication: "affinity",
    })),
    pilReading: evaluate(runtime, patchSource(baseRequest({
      affectiveMatrix: "pil",
      semanticReading: "pil-appendage",
    }), { embedStem: "pil", embedClass: "tli" })),
    pilChildSimple: evaluate(runtime, patchSource(baseRequest({
      affectiveMatrix: "pil",
      semanticReading: "pil-child",
      pilChildRoute: "simple",
    }), { embedStem: "pil", embedClass: "tli" })),
    pilChildAffective: evaluate(runtime, patchSource(baseRequest({
      affectiveMatrix: "pil",
      semanticReading: "pil-child",
      pilChildRoute: "affective",
    }), { embedStem: "pil", embedClass: "tli" })),
    pilNoble: evaluate(runtime, patchSource(baseRequest({
      affectiveMatrix: "pil",
      semanticReading: "pil-noble",
    }), { embedStem: "pil", embedClass: "tli" })),
    pilHonorificVocative: evaluate(runtime, patchSource(baseRequest({
      affectiveMatrix: "tzin",
      semanticReading: "pil-honorific-vocative",
      state: "vocative",
    }), { embedStem: "pil", embedClass: "tli" })),
    nonanimateAffinity: evaluate(runtime, patchSource(baseRequest({
      subject: "3pl",
      affectiveMatrix: "zol",
      animacy: "nonanimate",
      reduplication: "affinity",
    }), { animacy: "nonanimate" })),
    nonanimateReduplication: evaluate(runtime, patchSource(baseRequest({
      subject: "3pl",
      affectiveMatrix: "zol",
      animacy: "nonanimate",
      reduplication: "affinity",
    }), { animacy: "nonanimate" })),
    flawedSubject: evaluate(runtime, flawed()),
    defectEntity: evaluate(runtime, flawed("ix-te-coh-coy-o-c")),
    flawedLexicon: evaluate(runtime, flawed()),
    flawingPurpose: evaluate(runtime, flawed()),
    chicken: evaluate(runtime, patchSource(flawed("cuā-naca"), {
      flawedSubjectAnalysis: {
        lexicalStatus: "flawed-subject-lexical-analysis",
        sourceStem: "cuā-naca",
        availability: "obligatory",
        semanticDomain: "lexicalized-flawed-subject",
        defectEntityAmbiguous: false,
        neutralStemClass: "tl",
        flawedStemClassStrategy: "irregular-silent-num1",
        lexicalReading: "rooster",
        usuallyRooster: true,
      },
    })),
  };
  const tonTzinSemanticContrast =
    buildClassicalNahuatlTonTzinSemanticContrastConstraint({
      tonCase: cases.tzinTonClass,
      tzinCase: cases.base,
    });
  const blockedCases = {
    freeTzinDenominal: evaluate(runtime, baseRequest({
      affectiveOutputKind: "denominal-vnc",
      affectiveMatrix: "tzin",
    })),
    freePolDenominal: evaluate(runtime, baseRequest({
      affectiveOutputKind: "denominal-vnc",
      affectiveMatrix: "pōl",
    })),
    animateZol: evaluate(runtime, baseRequest({ affectiveMatrix: "zol" })),
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
    blockedCases.freeTzinDenominal.blockReason
      === "tzin-denominal-vnc-is-restricted-to-honorific-matrix-operation"
    && blockedCases.freePolDenominal.blockReason
      === "pol-denominal-vnc-is-restricted-to-pejorative-matrix-operation"
    && blockedCases.animateZol.authorizationStatus === "blocked"
    && blockedCases.callerPoison.authorizationStatus === "blocked"
    && tonTzinSemanticContrast.authorizationStatus === "authorized"
  );
  const denominalAttitudeRestrictionPair =
    buildClassicalDenominalAttitudeRestrictionPair(blockedCases);
  return deepFreeze({
    kind: "classical-nahuatl-affective-nnc-validation-frame",
    authorizationStatus: positivesValid && blockedValid
      ? "authorized" : "blocked",
    blockReason: positivesValid && blockedValid
      ? "" : "classical-affective-nnc-validation-coordinate-blocked",
    typedFrameAuthority: true,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
    storedExampleAuthority: false,
    translationAuthority: false,
    curriculumMetadataAuthority: false,
    contract: {
      evidenceOnly: true,
      evidenceRoles: {
        vocativeExamples: true,
        affinityAbsolutiveExamples: true,
        affinityPossessiveUsageAndAuthorityHistory: true,
        childFormationHistory: true,
        flawedSubjectInterpretation: true,
        flawedLexiconAnalysis: true,
      },
      freeTzinDenominalAuthority: false,
      freePolDenominalAuthority: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
      storedExampleAuthority: false,
    },
    constraints: {
      tonTzinSemanticContrast,
      denominalAttitudeRestrictionPair,
    },
    cases,
    blockedCases,
  });
}

export function createClassicalAffectiveNncValidationSemanticOperationsApi(
  targetObject = globalThis,
) {
  const issuedFrames = new WeakSet();
  let cachedProjection = null;
  function buildClassicalNahuatlAffectiveNncValidationFrame() {
    if (!cachedProjection) {
      cachedProjection = buildProjection(targetObject);
      if (cachedProjection.authorizationStatus === "authorized") {
        issuedFrames.add(cachedProjection);
      }
    }
    return cachedProjection;
  }
  function isClassicalNahuatlAffectiveNncValidationFrame(frame = null) {
    return Boolean(
      frame
      && issuedFrames.has(frame)
      && frame.kind === "classical-nahuatl-affective-nnc-validation-frame"
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
    buildClassicalNahuatlTonTzinSemanticContrastConstraint,
    buildClassicalDenominalAttitudeRestrictionPair,
    buildClassicalNahuatlAffectiveNncValidationFrame,
    isClassicalNahuatlAffectiveNncValidationFrame,
  });
}
