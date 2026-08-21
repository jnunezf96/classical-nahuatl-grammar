// Non-authorizing live validation projection for the independently owned
// compound-NNC semantics indexed by Andrews Lesson 31. It owns no Inventory
// atom. Gloss order and stored examples are evidence only; all grammar facts
// below are projected from the canonical typed nominal-construction evaluator.

function deepFreeze(value, seen = new WeakSet()) {
  if (!value || typeof value !== "object" || seen.has(value)) return value;
  seen.add(value);
  for (const nested of Object.values(value)) deepFreeze(nested, seen);
  return Object.freeze(value);
}

function baseRequest(overrides = {}) {
  return {
    constructionKind: "compound-nnc",
    source: {
      embedStem: "ā",
      embedClass: "tl-1-a",
      embedSourceClass: "tl-1-a",
      matrixStem: "cal",
      matrixClass: "tli",
      matrixSourceClass: "tli-1",
    },
    structure: "integrated",
    embedRole: "association",
    possessorOrientation: "matrix",
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
  const rules = Object.fromEntries(
    (operation.appliedSemanticRules || []).map(rule => [rule, true]),
  );
  return {
    authorizationStatus: frame?.authorizationStatus || "blocked",
    blockReason: frame?.blockReason || "",
    canonicalResult:
      runtime.isClassicalNahuatlNominalConstructionResult?.(frame) === true,
    sourceKind: frame?.sourceFrame?.kind || "",
    operationKind: operation.kind || "",
    structure: frame?.sourceFrame?.structure || "",
    embedRole: frame?.sourceFrame?.embedRole || "",
    possessorOrientation: operation.possessorOrientation || "",
    matrixClass: operation.matrixClass || "",
    matrixGovernsClass: frame?.sourceFrame?.matrixGovernsClass === true,
    compoundStem: operation.compoundStem || "",
    embedSourceStem: operation.embedShape?.sourceStem || "",
    realizedEmbedStem: operation.embedShape?.realizedStem || "",
    embedRule: operation.embedShape?.ruleId || "",
    reduplication: operation.reduplication || "",
    reduplicationTarget: operation.reduplicationTarget || "",
    recursiveEmbed: operation.recursiveEmbed === true,
    recursiveMatrix: operation.recursiveMatrix === true,
    bracketing: operation.bracketing || "",
    rules,
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

function buildProjection(runtime) {
  const recursiveSourceResult = runtime
    .evaluateClassicalNahuatlNominalConstruction(baseRequest());
  const recursiveSourceStem = recursiveSourceResult.operationFrame
    ?.compoundStem || "";
  const recursiveSourceClass = recursiveSourceResult.operationFrame
    ?.resultSourceClass || "";
  const cases = {
    base: evaluate(runtime, baseRequest()),
    embedRole: evaluate(runtime, baseRequest({ embedRole: "material" })),
    embedOrientation: evaluate(runtime, baseRequest({
      possessorOrientation: "embed",
      state: "possessive",
      possessor: "3sg",
    })),
    linkedOrientation: evaluate(runtime, baseRequest({
      structure: "linked-connective-t",
      possessorOrientation: "embed",
    })),
    orderAmbiguity: evaluate(runtime, patchSource(baseRequest(), {
      embedStem: "mā",
      matrixStem: "ōpōch",
    })),
    glottalizedEmbed: evaluate(runtime, patchSource(baseRequest(), {
      embedStem: "teo",
    })),
    negativeEmbed: evaluate(runtime, patchSource(baseRequest(), {
      embedStem: "ah",
    })),
    lexicalBoundary: evaluate(runtime, patchSource(baseRequest(), {
      embedStem: "mah",
      matrixStem: "e-hu-a",
    })),
    uniqueLexeme: evaluate(runtime, patchSource(baseRequest(), {
      embedStem: "chi",
      uniqueCompoundNounstemAnalysis: {
        lexicalStatus: "unique-compound-only-nounstem",
        position: "embed",
        sourceStem: "chi",
        meaningCertainty: "uncertain",
        sourceBoundaries: ["chi"],
        relatedFormations: [],
      },
    })),
    caMatrix: evaluate(runtime, patchSource(baseRequest(), {
      matrixStem: "ca",
      matrixClass: "tl",
      matrixSourceClass: "tl-1-a",
    })),
    caExclusion: evaluate(runtime, patchSource(baseRequest(), {
      matrixStem: "naca",
      matrixClass: "tl",
      matrixSourceClass: "tl-2-b-a",
    })),
    yoMatrix: evaluate(runtime, patchSource(baseRequest(), {
      matrixStem: "yō",
      matrixClass: "tl",
      matrixSourceClass: "tl-1-b",
      yoEmbedAnalysis: {
        lexicalStatus: "yo-matrix-embed-history",
        sourceStem: "ā",
        embedState: "absolutive",
        possessorKind: "none",
        meaningRelation: "related-but-distinct",
      },
    })),
    conjunctive: evaluate(runtime, baseRequest({ structure: "conjunctive" })),
    recursiveEmbed: evaluate(runtime, patchSource(baseRequest(), {
      embedStem: recursiveSourceStem,
      embedClass: recursiveSourceClass,
      embedSourceClass: recursiveSourceClass,
      embedConstituent: {
        kind: "compound-nnc",
        stem: recursiveSourceStem,
        resultFrame: recursiveSourceResult,
      },
    })),
    recursiveMatrix: evaluate(runtime, patchSource(baseRequest(), {
      matrixStem: recursiveSourceStem,
      matrixClass: recursiveSourceResult.operationFrame?.matrixClass,
      matrixSourceClass: recursiveSourceClass,
      matrixConstituent: {
        kind: "compound-nnc",
        stem: recursiveSourceStem,
        resultFrame: recursiveSourceResult,
      },
    })),
    sex: evaluate(runtime, patchSource(baseRequest({ embedRole: "sex" }), {
      embedStem: "zaca",
      sexEmbedAnalysis: {
        lexicalStatus: "sex-distinction-embed",
        sourceStem: "zaca",
        sexValue: "female",
        referentClass: "animate",
        neutralWithoutSex: true,
      },
    })),
    progeny: evaluate(runtime, patchSource(baseRequest({
      embedRole: "progeny",
    }), { matrixStem: "conē", matrixClass: "zero" })),
    fellowship: evaluate(runtime, patchSource(baseRequest({
      embedRole: "fellowship",
      state: "possessive",
      possessor: "3sg",
      possessorOrientation: "matrix",
    }), { matrixStem: "poh", matrixClass: "zero" })),
    affinity: evaluate(runtime, baseRequest({
      reduplication: "affinity",
      reduplicationTarget: "both",
      subject: "3pl",
    })),
    distributive: evaluate(runtime, baseRequest({
      reduplication: "distributive-varietal",
      reduplicationTarget: "embed",
    })),
  };
  const blockedCases = {
    missingMatrix: evaluate(runtime, patchSource(baseRequest(), {
      matrixStem: "",
    })),
    linkedMatrixOrientation: evaluate(runtime, baseRequest({
      structure: "linked-connective-t",
      possessorOrientation: "matrix",
    })),
    fellowshipAbsolutive: evaluate(runtime, patchSource(baseRequest({
      embedRole: "fellowship",
      state: "absolutive",
    }), { matrixStem: "poh", matrixClass: "zero" })),
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
    blockedCases.missingMatrix.authorizationStatus === "blocked"
    && blockedCases.linkedMatrixOrientation.blockReason
      === "linked-compound-requires-embed-possessor-orientation"
    && blockedCases.fellowshipAbsolutive.authorizationStatus === "blocked"
    && blockedCases.callerPoison.authorizationStatus === "blocked"
  );
  const authorized = positivesValid && blockedValid;
  return deepFreeze({
    kind: "classical-nahuatl-compound-nnc-validation-frame",
    authorizationStatus: authorized ? "authorized" : "blocked",
    blockReason: authorized
      ? ""
      : "classical-compound-nnc-validation-coordinate-blocked",
    typedFrameAuthority: true,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
    storedExampleAuthority: false,
    translationAuthority: false,
    curriculumMetadataAuthority: false,
    contract: {
      structures: ["linked-connective-t", "connectiveless", "integrated"],
      orderedConstituents: ["embed", "matrix"],
      matrixGovernsClass: true,
      englishGlossOrderAuthority: false,
      possessorOrientations: ["matrix", "embed", "neutral"],
      recursionTargets: ["embed", "matrix", "both"],
      reduplicationMeanings: ["affinity", "distributive-varietal"],
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
      storedExampleAuthority: false,
    },
    cases,
    blockedCases,
  });
}

export function createClassicalCompoundNncValidationSemanticOperationsApi(
  targetObject = globalThis,
) {
  const issuedFrames = new WeakSet();
  let cachedProjection = null;

  function buildClassicalNahuatlCompoundNncValidationFrame() {
    if (!cachedProjection) {
      cachedProjection = buildProjection(targetObject);
      if (cachedProjection.authorizationStatus === "authorized") {
        issuedFrames.add(cachedProjection);
      }
    }
    return cachedProjection;
  }

  function isClassicalNahuatlCompoundNncValidationFrame(frame = null) {
    return Boolean(
      frame
      && issuedFrames.has(frame)
      && frame.kind === "classical-nahuatl-compound-nnc-validation-frame"
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
    buildClassicalNahuatlCompoundNncValidationFrame,
    isClassicalNahuatlCompoundNncValidationFrame,
  });
}
