// Non-authorizing live projection for the independently owned frequentative
// semantics indexed by Andrews Lesson 27.  It owns no Inventory atom and does
// not supply a predicted answer: every retained value comes from the canonical
// late-operation engine, its typed source, and its finite result.

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
    lateOperation: "frequentative",
    ...overrides,
  };
}

function compactSlot(slot = {}) {
  return {
    id: slot.id || "",
    kind: slot.kind || "",
    carrier: slot.carrier || "",
    objectKind: slot.objectPositionFrame?.objectKind || "",
    governor: slot.objectPositionFrame?.governor || "",
    derivationalLevel:
      Number(slot.objectPositionFrame?.derivationalLevel || 0),
  };
}

function evaluate(runtime, overrides = {}) {
  const frame = runtime.evaluateClassicalNahuatlLateVncDerivation(
    baseRequest(overrides),
  );
  const operation = frame?.operationFrame || {};
  const sourceTyped = operation.sourceTypedVncSlotFrame || null;
  const targetTyped = operation.targetTypedVncSlotFrame || null;
  return {
    authorizationStatus: frame?.authorizationStatus || "blocked",
    blockReason: frame?.blockReason || "",
    canonicalClosure:
      runtime.isClassicalNahuatlClosureFrame?.(frame) === true,
    operation: operation.operation || "",
    variant: operation.variant || "",
    ruleFamily: operation.ruleFamily || "",
    ruleFamilies: [...(operation.ruleFamilies || [])],
    sourceStem: operation.sourceStem || "",
    targetStem: operation.targetStem || "",
    targetClass: operation.targetClass || "",
    targetValence: operation.targetValence || "",
    operationFacts: { ...(operation.operationFacts || {}) },
    sourceVoice:
      operation.sourceMachineryFrame?.voice
      || operation.sourceMachineryFrame?.selectedVoice || "",
    sourcePredicateStem: sourceTyped?.slots?.predicate?.stem || "",
    targetPredicateStem: targetTyped?.slots?.predicate?.stem || "",
    sourcePrePredicate: (sourceTyped?.slots?.prePredicate || [])
      .map(compactSlot),
    targetPrePredicate: (targetTyped?.slots?.prePredicate || [])
      .map(compactSlot),
    targetSemanticIdentity: targetTyped?.semanticIdentity || "",
    gcdSatisfied: frame?.greatestCommonDivisor?.satisfied === true,
    lcmComplete:
      frame?.leastCommonMultiple?.licensedAxisSetComplete === true,
    formulaRealization: frame?.formulaRealization || "",
    surfaceRealization: frame?.surfaceRealization || "",
    finiteAuthorizationStatus:
      frame?.finiteSurfaceFrame?.authorizationStatus || "blocked",
    finiteMachineryContinuous:
      frame?.finiteSurfaceFrame?.machineryFrame
        === frame?.selectedMachineryFrame,
    callerFormulaAuthority:
      operation.callerFormulaAuthority === true,
    callerSurfaceAuthority:
      operation.callerSurfaceAuthority === true,
    storedExampleAuthority:
      operation.storedExampleAuthority === true,
    callerSuppliedAuthorityAccepted:
      frame?.callerSuppliedAuthorityAccepted === true,
  };
}

function evaluateNonactive(runtime) {
  const preview = runtime.evaluateClassicalNahuatlVncApplication({
    sourceStem: "miqui",
    sourceValence: "intransitive",
    verbClass: "B",
    subject: "3sg",
    mood: "indicative",
    tense: "present",
    requestedVoice: "impersonal",
    voice: "impersonal",
  });
  const nonactiveOptionId =
    preview?.controlFrame?.nonactiveOptionInventory?.automaticOptionId
    || preview?.controlFrame?.nonactiveOptionInventory?.options?.[0]?.optionId
    || "";
  return evaluate(runtime, {
    sourceStem: "miqui",
    sourceValence: "intransitive",
    verbClass: "B",
    requestedVoice: "impersonal",
    voice: "impersonal",
    nonactiveOptionId,
    lateVariant: "ordinary-short",
  });
}

function evaluateDestockalNonactive(runtime) {
  const request = {
    sourceStem: "chi-chin-a-ca",
    sourceValence: "intransitive",
    verbClass: "A",
    subject: "3sg",
    mood: "indicative",
    tense: "present",
    requestedVoice: "impersonal",
    voice: "impersonal",
  };
  const preview = runtime.evaluateClassicalNahuatlVncApplication(request);
  const nonactiveOptionId =
    preview?.controlFrame?.nonactiveOptionInventory?.automaticOptionId
    || preview?.controlFrame?.nonactiveOptionInventory?.options?.[0]?.optionId
    || "";
  return evaluate(runtime, {
    ...request,
    nonactiveOptionId,
    lateVariant: "destockal-lexicalized",
  });
}

function buildProjection(runtime) {
  const cases = {
    ordinaryShortGlottal: evaluate(runtime, {
      lateVariant: "ordinary-short-glottal",
    }),
    ordinaryLong: evaluate(runtime, {
      lateVariant: "ordinary-long",
    }),
    ordinaryShort: evaluate(runtime, {
      lateVariant: "ordinary-short",
    }),
    lexicalizedOrdinary: evaluate(runtime, {
      sourceStem: "nōtza",
      sourceValence: "specific-projective",
      objectKind: "specific-projective",
      objectPerson: "3sg",
      verbClass: "A",
      lateVariant: "ordinary-short-glottal",
    }),
    unattestedOrdinarySource: evaluate(runtime, {
      sourceStem: "tzona",
      sourceValence: "specific-projective",
      objectKind: "specific-projective",
      objectPerson: "3sg",
      verbClass: "A",
      lateVariant: "ordinary-short-glottal",
    }),
    recursive: evaluate(runtime, {
      lateVariant: "ordinary-long",
      frequentativeRepetitions: 3,
    }),
    fusedTlaStemScope: evaluate(runtime, {
      sourceStem: "tla-petl-ā-ni",
      verbClass: "B",
      lateVariant: "ordinary-short-glottal",
    }),
    fusedTlaObjectScope: evaluate(runtime, {
      sourceStem: "tla-yohua",
      verbClass: "A",
      lateVariant: "tla-short-glottal",
    }),
    fusedTlaAndStem: evaluate(runtime, {
      sourceStem: "tla-cōhua",
      lateVariant: "tla-short-glottal-and-stem-short-glottal",
    }),
    supportiveI: evaluate(runtime, {
      sourceStem: "ihcuil-o-ā",
      sourceValence: "specific-projective",
      objectKind: "specific-projective",
      objectPerson: "3sg",
      verbClass: "C",
      lateVariant: "ordinary-short",
      sourceInitialISelection: "supportive",
    }),
    supportiveIExceptional: evaluate(runtime, {
      sourceStem: "ihcuil-o-ā",
      sourceValence: "specific-projective",
      objectKind: "specific-projective",
      objectPerson: "3sg",
      verbClass: "C",
      lateVariant: "ordinary-short-glottal",
      sourceInitialISelection: "supportive",
    }),
    reflexivePartial: evaluate(runtime, {
      sourceStem: "ilpi-ā",
      sourceValence: "mainline-reflexive",
      verbClass: "C",
      lateVariant: "reflexive-partial",
      sourceInitialISelection: "supportive",
    }),
    destockalIntransitive: evaluate(runtime, {
      sourceStem: "patl-ā-ni",
      verbClass: "B",
      lateVariant: "destockal-intransitive",
    }),
    destockalIntransitiveRecursive: evaluate(runtime, {
      sourceStem: "chal-ā-ni",
      verbClass: "B",
      lateVariant: "destockal-intransitive",
      frequentativeRepetitions: 2,
    }),
    destockalNonactive: evaluateDestockalNonactive(runtime),
    destockalImpersonalTla: evaluate(runtime, {
      sourceStem: "tla-cua-cual-a-ca",
      verbClass: "A",
      lateVariant: "destockal-lexicalized",
    }),
    destockalCausative: evaluate(runtime, {
      sourceStem: "tlap-ā-n-a",
      sourceValence: "specific-projective",
      objectKind: "specific-projective",
      objectPerson: "3sg",
      verbClass: "B",
      lateVariant: "destockal-causative",
    }),
    destockalApplicativeForce: evaluate(runtime, {
      sourceStem: "chay-ā-hu-a",
      sourceValence: "specific-projective",
      objectKind: "specific-projective",
      objectPerson: "3sg",
      verbClass: "B",
      lateVariant: "destockal-applicative-force",
    }),
    lexicalizedDestockalIntransitive: evaluate(runtime, {
      sourceStem: "po-pō-ca",
      verbClass: "A",
      lateVariant: "destockal-lexicalized",
    }),
    lexicalizedDestockalCausative: evaluate(runtime, {
      sourceStem: "po-pō-tz-a",
      sourceValence: "specific-projective",
      objectKind: "specific-projective",
      objectPerson: "3sg",
      verbClass: "B",
      lateVariant: "destockal-lexicalized",
    }),
    lexicalizedDestockalApplicative: evaluate(runtime, {
      sourceStem: "qui-quin-a-tz-a",
      sourceValence: "specific-projective",
      objectKind: "specific-projective",
      objectPerson: "3sg",
      verbClass: "B",
      lateVariant: "destockal-lexicalized",
    }),
    destockalApplicative: evaluate(runtime, {
      sourceStem: "co-cot-o-tz-a",
      sourceValence: "specific-projective",
      objectKind: "specific-projective",
      objectPerson: "3sg",
      verbClass: "B",
      lateVariant: "destockal-applicative",
    }),
    destockalTypeTwo: evaluate(runtime, {
      sourceStem: "chi-chin-a-ca",
      verbClass: "A",
      lateVariant: "destockal-type-two",
    }),
    uncertainCa: evaluate(runtime, {
      sourceStem: "hual",
      verbClass: "A",
      lateVariant: "uncertain-ca",
    }),
    uncertainCaApplicativeGrowl: evaluate(runtime, {
      sourceStem: "hual",
      verbClass: "A",
      lateVariant: "uncertain-ca-applicative-growl",
    }),
    uncertainCaFusedTlaBark: evaluate(runtime, {
      sourceStem: "hual",
      verbClass: "A",
      lateVariant: "uncertain-ca-fused-tla-bark",
    }),
    uncertainTzca: evaluate(runtime, {
      sourceStem: "tla-tla",
      verbClass: "A",
      lateVariant: "uncertain-tzca",
    }),
    nonactive: evaluateNonactive(runtime),
  };
  const statuses = Object.values(cases).flatMap(record => [
    record.authorizationStatus,
    record.finiteAuthorizationStatus,
    record.canonicalClosure ? "authorized" : "blocked",
    record.gcdSatisfied ? "authorized" : "blocked",
    record.lcmComplete ? "authorized" : "blocked",
  ]);
  const authorized = statuses.every(status => status === "authorized");
  return deepFreeze({
    kind: "classical-nahuatl-frequentative-validation-frame",
    authorizationStatus: authorized ? "authorized" : "blocked",
    blockReason: authorized
      ? "" : "classical-frequentative-validation-coordinate-blocked",
    typedFrameAuthority: true,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
    storedExampleAuthority: false,
    curriculumMetadataAuthority: false,
    contract: {
      operationOrder: [
        "engine-issued-typed-vnc-source",
        "licensed-frequentative-variant",
        "typed-predicate-and-object-transformation",
        "canonical-finite-boundary",
      ],
      shapes: [
        cases.ordinaryShortGlottal.operationFacts.shape,
        cases.ordinaryLong.operationFacts.shape,
        cases.ordinaryShort.operationFacts.shape,
      ],
      lexicalShapeChoice:
        cases.ordinaryShortGlottal.operationFacts.lexicalShapeChoice === true,
      recursiveRuleFamily:
        cases.recursive.ruleFamilies.includes("frequentative-recursion"),
      objectRuleFamily:
        cases.fusedTlaObjectScope.ruleFamilies.includes("frequentative-object"),
      nonactiveRuleFamily:
        cases.nonactive.ruleFamilies.includes("frequentative-nonactive"),
      callerFormulaAuthority: cases.ordinaryLong.callerFormulaAuthority,
      callerSurfaceAuthority: cases.ordinaryLong.callerSurfaceAuthority,
      storedExampleAuthority: cases.ordinaryLong.storedExampleAuthority,
    },
    cases,
  });
}

export function createClassicalFrequentativeValidationSemanticOperationsApi(
  targetObject = globalThis,
) {
  const issuedFrames = new WeakSet();
  let cachedProjection = null;

  function buildClassicalNahuatlFrequentativeValidationFrame() {
    if (!cachedProjection) {
      cachedProjection = buildProjection(targetObject);
      if (cachedProjection.authorizationStatus === "authorized") {
        issuedFrames.add(cachedProjection);
      }
    }
    return cachedProjection;
  }

  function isClassicalNahuatlFrequentativeValidationFrame(frame = null) {
    return Boolean(
      frame
      && issuedFrames.has(frame)
      && frame.kind === "classical-nahuatl-frequentative-validation-frame"
      && frame.authorizationStatus === "authorized"
      && frame.typedFrameAuthority === true
      && frame.formulaStringAuthority === false
      && frame.surfaceStringAuthority === false
      && frame.storedExampleAuthority === false
      && frame.curriculumMetadataAuthority === false
      && Object.isFrozen(frame)
    );
  }

  return Object.freeze({
    buildClassicalNahuatlFrequentativeValidationFrame,
    isClassicalNahuatlFrequentativeValidationFrame,
  });
}
