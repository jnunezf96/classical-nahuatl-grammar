// Non-authorizing live projection for the independently owned purposive-VNC
// semantics indexed by Andrews Lesson 29. It owns no Inventory atom. Stored
// forms and translations are evidence only; canonical route values come from
// live typed late-operation and finite-boundary execution.

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
    lateOperation: "purposive",
    lateVariant: "directional",
    purposiveSeries: "outbound-nonpast-indicative",
    ...overrides,
  };
}

function compact(runtime, frame) {
  const operation = frame?.operationFrame || {};
  const facts = operation.operationFacts || {};
  const slots = frame?.finalTypedVncSlotFrame?.slots || {};
  return {
    authorizationStatus: frame?.authorizationStatus || "blocked",
    blockReason: frame?.blockReason || "",
    canonicalClosure: runtime.isClassicalNahuatlClosureFrame?.(frame) === true,
    operation: operation.operation || "",
    variant: operation.variant || "",
    ruleFamily: operation.ruleFamily || "",
    ruleFamilies: [...(operation.ruleFamilies || [])],
    sourceStem: operation.sourceStem || "",
    targetStem: operation.targetStem || "",
    targetClass: operation.targetClass || "",
    targetValence: operation.targetValence || "",
    facts: {
      direction: facts.direction || "",
      series: facts.series || "",
      compoundType: facts.compoundType || "",
      linkage: facts.linkage || "",
      embedTense: facts.embedTense || "",
      embedFutureMorph: facts.embedFutureMorph || "",
      matrixDirectionalMorph: facts.matrixDirectionalMorph || "",
      matrixBaseStem: facts.matrixBaseStem || "",
      matrixTenseMeaning: facts.matrixTenseMeaning || "",
      finiteTenseMorph: facts.finiteTenseMorph || "",
      numberMorph: facts.numberMorph || "",
      movementPrecedesPurposeAction:
        facts.movementPrecedesPurposeAction === true,
      matrixDirectionalInsideStem:
        facts.matrixDirectionalInsideStem === true,
      irregularPluralN: facts.irregularPluralN === true,
      externalDirectional: facts.externalDirectional || "",
      callerPurposiveDirectionAuthority:
        facts.callerPurposiveDirectionAuthority === true,
    },
    predicateTense: frame?.finalTypedVncSlotFrame?.slots?.predicate?.tns || "",
    numberMorph: frame?.finalTypedVncSlotFrame?.slots?.number?.num2 || "",
    subjectMorphs: [slots.subject?.pers1 || "", slots.subject?.pers2 || ""],
    objectMorphs: (slots.prePredicate || []).map(slot => slot.carrier || ""),
    predicateStem: slots.predicate?.stem || "",
    formulaRealization: frame?.formulaRealization || "",
    surfaceRealization: frame?.surfaceRealization || "",
    finiteAuthorizationStatus:
      frame?.finiteSurfaceFrame?.authorizationStatus || "blocked",
    finiteMachineryContinuous:
      frame?.finiteSurfaceFrame?.machineryFrame
        === frame?.selectedMachineryFrame,
    gcdSatisfied: frame?.greatestCommonDivisor?.satisfied === true,
    lcmComplete:
      frame?.leastCommonMultiple?.licensedAxisSetComplete === true,
    callerSuppliedAuthorityAccepted:
      frame?.callerSuppliedAuthorityAccepted === true,
  };
}

function evaluate(runtime, overrides = {}) {
  return compact(
    runtime,
    runtime.evaluateClassicalNahuatlLateVncDerivation(
      baseRequest(overrides),
    ),
  );
}

function canonicalTranscriptionFormula(formula = "") {
  return String(formula).replaceAll("0", "Ø");
}

function buildParadigmExample(runtime, overrides, {
  subjectRole,
  purposeAction,
  currentReading,
  futureReading,
  nonspecificNonhumanObject = false,
}) {
  const result = evaluate(runtime, overrides);
  return deepFreeze({
    ...result,
    canonicalTranscriptionFormula: canonicalTranscriptionFormula(result.formulaRealization),
    subjectRole,
    purposeAction,
    nonspecificNonhumanObject,
    purposeRelation: "embedded-action-is-purpose-of-movement",
    readings: {
      ongoingMovement: currentReading,
      futureMovement: futureReading,
    },
  });
}

function nonactiveOption(runtime, request) {
  const preview = runtime.evaluateClassicalNahuatlVncApplication(request);
  return preview?.controlFrame?.nonactiveOptionInventory?.automaticOptionId
    || preview?.controlFrame?.nonactiveOptionInventory?.options?.[0]?.optionId
    || "";
}

function buildProjection(runtime) {
  const seriesIds = [
    "outbound-nonpast-indicative",
    "outbound-past-indicative",
    "outbound-nonpast-optative",
    "inbound-nonfuture-indicative",
    "inbound-future-indicative",
    "inbound-nonpast-optative",
  ];
  const singularSeries = Object.fromEntries(seriesIds.map(
    series => [series, evaluate(runtime, { purposiveSeries: series })],
  ));
  const pluralSeries = Object.fromEntries(seriesIds.map(
    series => [series, evaluate(runtime, {
      subject: "3pl",
      purposiveSeries: series,
    })],
  ));
  const compoundSource = runtime.evaluateClassicalNahuatlLateVncDerivation({
    sourceStem: "chōca",
    sourceValence: "intransitive",
    verbClass: "A",
    subject: "2sg",
    mood: "indicative",
    tense: "preterit",
    derivationType: "direct",
    voice: "active",
    lateOperation: "compound",
    lateVariant: "connective-t",
    compoundMatrixStem: "nemi",
  });
  const nonactiveRequest = {
    sourceStem: "miqui",
    sourceValence: "intransitive",
    verbClass: "B",
    subject: "3sg",
    mood: "indicative",
    tense: "present",
    requestedVoice: "impersonal",
    voice: "impersonal",
  };
  const cases = {
    singularSeries,
    pluralSeries,
    irregularPluralN: evaluate(runtime, {
      subject: "3pl",
      purposiveSeries: "outbound-nonpast-optative",
      purposiveIrregularPluralN: true,
    }),
    poisonedDirection: evaluate(runtime, {
      purposiveSeries: "inbound-future-indicative",
      purposiveDirection: "outbound",
      formula: "#forged#",
      surface: "forged",
    }),
    externalHual: evaluate(runtime, {
      purposiveExternalDirectional: "huāl",
    }),
    externalOn: evaluate(runtime, {
      purposiveExternalDirectional: "on",
    }),
    nonactiveEmbed: evaluate(runtime, {
      ...nonactiveRequest,
      nonactiveOptionId: nonactiveOption(runtime, nonactiveRequest),
      purposiveSeries: "inbound-nonfuture-indicative",
    }),
    recursiveCompoundEmbed: compact(
      runtime,
      runtime.evaluateClassicalNahuatlLateVncDerivation(baseRequest({
        sourceStem: compoundSource.operationFrame?.targetStem,
        subject: "2sg",
        compoundEmbedClosureFrame: compoundSource,
      })),
    ),
    paradigmAxisExamples: {
      singFirstSingular: buildParadigmExample(runtime, {
        sourceStem: "cuīca", sourceValence: "intransitive", verbClass: "A",
        subject: "1sg", purposiveSeries: "outbound-nonpast-indicative",
      }, {
        subjectRole: { person: "first", number: "singular", animacy: "human" },
        purposeAction: "sing",
        currentReading: "I am going in order to sing",
        futureReading: "I shall go in order to sing",
      }),
      singFirstPlural: buildParadigmExample(runtime, {
        sourceStem: "cuīca", sourceValence: "intransitive", verbClass: "A",
        subject: "1pl", purposiveSeries: "outbound-nonpast-indicative",
      }, {
        subjectRole: { person: "first", number: "plural", animacy: "human" },
        purposeAction: "sing",
        currentReading: "we are going in order to sing",
        futureReading: "we shall go in order to sing",
      }),
      eatFirstSingular: buildParadigmExample(runtime, {
        sourceStem: "cuā", sourceValence: "projective-nonhuman",
        objectKind: "nonspecific-nonhuman", verbClass: "D",
        subject: "1sg", purposiveSeries: "outbound-nonpast-indicative",
      }, {
        subjectRole: { person: "first", number: "singular", animacy: "human" },
        purposeAction: "eat",
        currentReading: "I am going in order to eat",
        futureReading: "I shall go in order to eat",
        nonspecificNonhumanObject: true,
      }),
      eatSecondPlural: buildParadigmExample(runtime, {
        sourceStem: "cuā", sourceValence: "projective-nonhuman",
        objectKind: "nonspecific-nonhuman", verbClass: "D",
        subject: "2pl", purposiveSeries: "outbound-nonpast-indicative",
      }, {
        subjectRole: { person: "second", number: "plural", animacy: "human" },
        purposeAction: "eat",
        currentReading: "you plural are going in order to eat",
        futureReading: "you plural will go in order to eat",
        nonspecificNonhumanObject: true,
      }),
    },
  };
  const blockedCases = {
    unknownSeries: evaluate(runtime, { purposiveSeries: "invented-series" }),
    invalidExternalDirectional: evaluate(runtime, {
      purposiveExternalDirectional: "invented",
    }),
    irregularNWrongCoordinate: evaluate(runtime, {
      subject: "3sg",
      purposiveSeries: "outbound-nonpast-optative",
      purposiveIrregularPluralN: true,
    }),
  };
  const positives = [
    ...Object.values(singularSeries),
    ...Object.values(pluralSeries),
    ...Object.values(cases).filter(record => record?.authorizationStatus),
  ].filter(record => record?.authorizationStatus);
  const positiveAuthorized = positives.every(record => (
    record.authorizationStatus === "authorized"
    && record.canonicalClosure
    && record.finiteAuthorizationStatus === "authorized"
    && record.finiteMachineryContinuous
    && record.gcdSatisfied
    && record.lcmComplete
    && !record.callerSuppliedAuthorityAccepted
  ));
  const blockedReasons = {
    unknownSeries: "licensed-purposive-series-required",
    invalidExternalDirectional: "licensed-external-directional-required",
    irregularNWrongCoordinate: "irregular-n-is-outbound-plural-optative-only",
  };
  const blockedAuthorized = Object.entries(blockedCases).every(
    ([id, record]) => record.authorizationStatus === "blocked"
      && record.blockReason === blockedReasons[id],
  );
  const authorized = positiveAuthorized && blockedAuthorized;
  return deepFreeze({
    kind: "classical-nahuatl-purposive-validation-frame",
    authorizationStatus: authorized ? "authorized" : "blocked",
    blockReason: authorized ? "" : "classical-purposive-validation-coordinate-blocked",
    typedFrameAuthority: true,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
    storedExampleAuthority: false,
    curriculumMetadataAuthority: false,
    contract: {
      operationOrder: [
        "authorized-typed-future-embed-vnc",
        "silent-future-morph",
        "internal-directional-matrix",
        "canonical-finite-boundary",
      ],
      compoundType: "linked",
      linkage: "connectiveless",
      embedTense: "future",
      soundedFutureMorphReplacedBy: "⎕",
      imperfectiveStemShapePreserved: true,
      matrixValence: "intransitive",
      matrixDirectionalPlacement: "inside-matrix-subposition",
      directionalMorphs: { outbound: "t", inbound: "c/qu" },
      matrixBaseStems: { imperfective: "i", perfective: "o" },
      movementBaseMeaning: "move-purposefully",
      movements: ["outbound", "inbound"],
      moods: ["indicative", "optative"],
      outboundTenseMeanings: ["nonpast", "past"],
      inboundTenseMeanings: ["nonfuture", "future"],
      optativeTenseMeaning: "nonpast",
      finiteTenseMorph: "0",
      numberDyads: { singularCommon: "0-0", plural: "0-h" },
      purposeActionBeginsAfterMovement: true,
      progressiveContrast: {
        purposiveDirectionalInsideMatrix: true,
        progressiveConnectiveOutsideMatrix: true,
        traditionalSpellingAuthority: false,
      },
      nonactiveEmbedVoices: ["passive", "impersonal"],
      recursiveTypedClosureRequired: true,
      externalDirectionalMorphs: ["huāl", "on"],
      externalDirectionalMayIntensifyMovement: true,
      interpretationReadings: [
        "intended-purpose",
        "fulfilled-purpose",
        "metaphorical-movement-muted-purpose",
      ],
      interpretationRole: "contextual-read-only-no-surface-authority",
      translationRole: "evidence-only",
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
      storedExampleAuthority: false,
    },
    cases,
    blockedCases,
  });
}

export function createClassicalPurposiveValidationSemanticOperationsApi(
  targetObject = globalThis,
) {
  const issuedFrames = new WeakSet();
  let cachedProjection = null;

  function buildClassicalNahuatlPurposiveValidationFrame() {
    if (!cachedProjection) {
      cachedProjection = buildProjection(targetObject);
      if (cachedProjection.authorizationStatus === "authorized") {
        issuedFrames.add(cachedProjection);
      }
    }
    return cachedProjection;
  }

  function isClassicalNahuatlPurposiveValidationFrame(frame = null) {
    return Boolean(
      frame
      && issuedFrames.has(frame)
      && frame.kind === "classical-nahuatl-purposive-validation-frame"
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
    buildClassicalNahuatlPurposiveValidationFrame,
    isClassicalNahuatlPurposiveValidationFrame,
  });
}
