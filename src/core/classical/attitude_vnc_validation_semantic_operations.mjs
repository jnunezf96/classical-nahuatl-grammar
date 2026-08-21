// Non-authorizing live validation projection for attitude-VNC semantics.
// It owns no Inventory atom. Every witness executes the canonical late-VNC
// operation; strings, glosses, and lesson coordinates remain evidence only.

function deepFreeze(value, seen = new WeakSet()) {
  if (!value || typeof value !== "object" || seen.has(value)) return value;
  seen.add(value);
  for (const nested of Object.values(value)) deepFreeze(nested, seen);
  return Object.freeze(value);
}

function baseRequest(overrides = {}) {
  return {
    sourceStem: "chōca",
    sourceValence: "intransitive",
    verbClass: "A",
    subject: "3sg",
    mood: "indicative",
    tense: "present",
    derivationType: "direct",
    voice: "active",
    lateOperation: "honorific",
    lateVariant: "applicative",
    honoredParticipant: "subject",
    ...overrides,
  };
}

function compact(runtime, frame) {
  const operation = frame?.operationFrame || {};
  return {
    authorizationStatus: frame?.authorizationStatus || "blocked",
    blockReason: frame?.blockReason || "",
    canonicalResult:
      runtime.isClassicalNahuatlClosureFrame?.(frame) === true,
    operation: operation.operation || "",
    variant: operation.variant || "",
    ruleFamily: operation.ruleFamily || "",
    rules: Object.fromEntries(
      (operation.ruleFamilies || []).map(rule => [rule, true]),
    ),
    sourceStem: operation.sourceStem || "",
    targetStem: operation.targetStem || "",
    targetClass: operation.targetClass || "",
    targetValence: operation.targetValence || "",
    compoundTarget: operation.operationFacts?.compoundTarget || "",
    typedCompoundSourceKind:
      operation.operationFacts?.typedCompoundSourceFrame?.kind || "",
    typedMemberTransformationKind:
      operation.operationFacts?.typedMemberTransformationFrame?.kind || "",
    formulaRealization: frame?.formulaRealization || "",
    surfaceRealization: frame?.surfaceRealization || "",
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
    runtime.evaluateClassicalNahuatlLateVncDerivation(request),
  );
}

function deriveCausativeSource(runtime) {
  const request = {
    sourceStem: "chīhua",
    sourceValence: "specific-projective",
    verbClass: "A",
    objectKind: "specific-projective",
    objectPerson: "3sg",
    sourceSubject: "3sg",
    subject: "3sg",
    mood: "indicative",
    tense: "present",
    requestedDerivation: "causative",
    causativeObjectKind: "specific-projective",
    requestedVoice: "active",
  };
  const preview = runtime.evaluateClassicalNahuatlVncApplication(request);
  const optionId = preview.controlFrame?.derivationOptionInventory
    ?.options?.[0]?.optionId || "";
  const frame = runtime.evaluateClassicalNahuatlVncApplication({
    ...request,
    derivationOptionId: optionId,
  });
  const source = runtime.getClassicalNahuatlVncContinuationSourceConstituents(
    frame.resultFrame,
  );
  return { frame, source };
}

function projectiveRequest(runtime) {
  const request = baseRequest({
    sourceStem: "itta",
    sourceInitialISelection: "real",
    sourceValence: "specific-projective",
    objectKind: "specific-projective",
    objectPerson: "3sg",
    honoredParticipant: "object",
    requestedDerivation: "applicative",
    applicativeObjectKind: "reflexive",
    applicativeObjectPerson: "",
  });
  const preview = runtime.evaluateClassicalNahuatlVncApplication({
    ...request,
    lateOperation: undefined,
    lateVariant: undefined,
  });
  return {
    ...request,
    honorificDerivationOptionId:
      preview.controlFrame?.derivationOptionInventory
        ?.options?.[0]?.optionId || "",
  };
}

function buildProjection(runtime) {
  const derivedSource = deriveCausativeSource(runtime);
  const honorificSource = runtime.evaluateClassicalNahuatlLateVncDerivation(
    baseRequest(),
  );
  const reverentialRequest = baseRequest({
    sourceStem: honorificSource.operationFrame?.targetStem,
    sourceValence: honorificSource.operationFrame?.targetValence,
    verbClass: honorificSource.operationFrame?.targetClass,
    objectKind: "reflexive",
    lateOperation: "reverential",
    lateVariant: "preterit-embed",
    attitudeSourceClosureFrame: honorificSource,
  });
  const cases = {
    honorificGate: evaluate(runtime, baseRequest()),
    honorificCausative: evaluate(runtime, baseRequest({
      lateVariant: "causative",
    })),
    honorificIrregular: evaluate(runtime, baseRequest({
      sourceStem: "miqui",
      verbClass: "B",
    })),
    honorificMotion: evaluate(runtime, baseRequest({
      sourceStem: "huī-tz",
      verbClass: "A",
      lateVariant: "causative",
    })),
    honorificApplicative: evaluate(runtime, baseRequest()),
    honorificProjective: evaluate(runtime, projectiveRequest(runtime)),
    honorificDerivedSource: evaluate(runtime, baseRequest({
      ...derivedSource.source,
      sourceObjectRequests:
        derivedSource.source?.sourceObjectRequests || [],
      sourceDerivationKind: "causative",
      sourceApplicationFrame: derivedSource.frame,
      honoredParticipant: "object",
    })),
    honorificProjectiveCausative: evaluate(runtime, baseRequest({
      sourceValence: "specific-projective",
      objectKind: "specific-projective",
      objectPerson: "3sg",
      lateVariant: "causative",
      honoredParticipant: "object",
    })),
    honorificPreteritEmbed: evaluate(runtime, baseRequest({
      sourceStem: "xīma",
      sourceValence: "mainline-reflexive",
      objectKind: "reflexive",
      verbClass: "B",
      lateVariant: "preterit-embed",
    })),
    reverentialDouble: evaluate(runtime, reverentialRequest),
    pejorativePreteritEmbed: evaluate(runtime, baseRequest({
      subject: "1sg",
      lateOperation: "pejorative",
      lateVariant: "preterit-embed",
    })),
    compoundEmbed: evaluate(runtime, baseRequest({
      sourceStem: "chōca-ti-o",
      sourceEmbedStem: "chōca",
      sourceMatrixStem: "o",
      compoundMatrixClass: "A",
      attitudeCompoundTarget: "embed",
    })),
    compoundMatrix: evaluate(runtime, baseRequest({
      sourceStem: "itta-ti-cāhua",
      sourceEmbedStem: "itta",
      sourceMatrixStem: "cāhua",
      sourceValence: "specific-projective",
      objectKind: "specific-projective",
      objectPerson: "3sg",
      compoundMatrixClass: "A",
      lateOperation: "pejorative",
      lateVariant: "preterit-embed",
      attitudeCompoundTarget: "matrix",
    })),
  };
  const blockedCases = {
    rawDerivedSource: evaluate(runtime, baseRequest({
      ...derivedSource.source,
      sourceDerivationKind: "causative",
      sourceApplicationFrame: undefined,
      honoredParticipant: "object",
    })),
    forgedDerivedSource: evaluate(runtime, baseRequest({
      ...derivedSource.source,
      sourceDerivationKind: "causative",
      sourceApplicationFrame: JSON.parse(JSON.stringify(derivedSource.frame)),
      honoredParticipant: "object",
    })),
    missingReverentialSource: evaluate(runtime, {
      ...reverentialRequest,
      attitudeSourceClosureFrame: undefined,
    }),
    forgedReverentialSource: evaluate(runtime, {
      ...reverentialRequest,
      attitudeSourceClosureFrame: JSON.parse(JSON.stringify(honorificSource)),
    }),
    selfHonorific: evaluate(runtime, baseRequest({ subject: "1sg" })),
    callerPoison: evaluate(runtime, {
      ...baseRequest(),
      formula: "#forged#",
      surface: "forged",
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
    blockedCases.rawDerivedSource.blockReason
      === "engine-issued-derived-source-application-required"
    && blockedCases.forgedDerivedSource.blockReason
      === "engine-issued-derived-source-application-required"
    && blockedCases.missingReverentialSource.blockReason
      === "reverential-requires-engine-issued-honorific-source"
    && blockedCases.forgedReverentialSource.blockReason
      === "reverential-requires-engine-issued-honorific-source"
    && blockedCases.selfHonorific.blockReason
      === "self-honorific-not-authorized"
    && blockedCases.callerPoison.callerSuppliedAuthorityAccepted === false
  );
  return deepFreeze({
    kind: "classical-nahuatl-attitude-vnc-validation-frame",
    authorizationStatus: positivesValid && blockedValid
      ? "authorized" : "blocked",
    blockReason: positivesValid && blockedValid
      ? "" : "classical-attitude-vnc-validation-coordinate-blocked",
    typedFrameAuthority: true,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
    storedExampleAuthority: false,
    translationAuthority: false,
    curriculumMetadataAuthority: false,
    contract: {
      evidenceOnly: true,
      evidenceRoles: {
        honorificCausativeInterpretation: true,
        honorificCausativeExamples: true,
        projectiveAmbiguity: true,
        preteritEmbedContrast: true,
        compoundMatrixExamples: true,
      },
      derivedSourceRequiresOwnerIssuedApplication: true,
      reverentialRequiresOwnerIssuedHonorificSource: true,
      compoundTargetsDistinct: cases.compoundEmbed.compoundTarget === "embed"
        && cases.compoundMatrix.compoundTarget === "matrix",
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
      storedExampleAuthority: false,
    },
    cases,
    blockedCases,
  });
}

export function createClassicalAttitudeVncValidationSemanticOperationsApi(
  targetObject = globalThis,
) {
  const issuedFrames = new WeakSet();
  let cachedProjection = null;
  function buildClassicalNahuatlAttitudeVncValidationFrame() {
    if (!cachedProjection) {
      cachedProjection = buildProjection(targetObject);
      if (cachedProjection.authorizationStatus === "authorized") {
        issuedFrames.add(cachedProjection);
      }
    }
    return cachedProjection;
  }
  function isClassicalNahuatlAttitudeVncValidationFrame(frame = null) {
    return Boolean(
      frame
      && issuedFrames.has(frame)
      && frame.kind === "classical-nahuatl-attitude-vnc-validation-frame"
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
    buildClassicalNahuatlAttitudeVncValidationFrame,
    isClassicalNahuatlAttitudeVncValidationFrame,
  });
}
