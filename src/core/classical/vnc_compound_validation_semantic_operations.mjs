// Non-authorizing live projection for the independently owned compound-VNC
// semantics indexed by Andrews Lesson 28. It owns no Inventory atom and no
// stored example can authorize a result. Every generative value below is read
// from the canonical late-operation engine and its typed finite boundary.

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
    lateOperation: "compound",
    lateVariant: "connective-t",
    compoundMatrixStem: "nemi",
    ...overrides,
  };
}

function compact(runtime, frame) {
  const operation = frame?.operationFrame || {};
  const facts = operation.operationFacts || {};
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
      compoundType: facts.compoundType || "",
      linkage: facts.linkage || "",
      embedSourceValence: facts.embedSourceValence || "",
      matrixSourceValence: facts.matrixSourceValence || "",
      embedDeterminesCompoundValence:
        facts.embedDeterminesCompoundValence === true,
      matrixDeterminesCompoundType: facts.matrixDeterminesCompoundType === true,
      sourcePredicatePreserved: facts.sourcePredicatePreserved === true,
      embedSubjectDeleted: facts.embedSubjectDeleted === true,
      matrixAfterEmbed: facts.matrixAfterEmbed === true,
      embedStem: facts.embedStem || "",
      connective: facts.connective || "",
      matrixStem: facts.matrixStem || "",
      embedTenseMorph: facts.embedTenseMorph || "",
      itzEmbedSense: facts.itzEmbedSense || "",
      eventOrder: facts.eventOrder || "",
      nonactiveScope: facts.nonactiveScope || "",
      recursiveEmbed: facts.recursiveEmbed === true,
      recursiveMatrix: facts.recursiveMatrix === true,
      oldConnectivelessHuītzFormation:
        facts.oldConnectivelessHuītzFormation === true,
      prohibitedConnectiveT: facts.prohibitedConnectiveT === true,
      supplementarySubjectAuthorized:
        facts.supplementarySubjectFrame?.authorizationStatus === "authorized",
    },
    predicateTense: frame?.finalTypedVncSlotFrame?.slots?.predicate?.tns || "",
    numberMorph: frame?.finalTypedVncSlotFrame?.slots?.number?.num2 || "",
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

function nonactiveOption(runtime, request) {
  const preview = runtime.evaluateClassicalNahuatlVncApplication(request);
  return preview?.controlFrame?.nonactiveOptionInventory?.automaticOptionId
    || preview?.controlFrame?.nonactiveOptionInventory?.options?.[0]?.optionId
    || "";
}

function buildProjection(runtime) {
  const recursiveSource = runtime.evaluateClassicalNahuatlLateVncDerivation(
    baseRequest({ subject: "2sg", tense: "preterit" }),
  );
  const impersonalRequest = {
    sourceStem: "miqui",
    sourceValence: "intransitive",
    verbClass: "B",
    subject: "3sg",
    mood: "indicative",
    tense: "present",
    requestedVoice: "impersonal",
    voice: "impersonal",
  };
  const impersonalOptionId = nonactiveOption(runtime, impersonalRequest);
  const intransitiveMatrices = [
    "ca", "nemi", "ya-uh", "huāl-la-uh", "huī-tz", "ahci", "mani",
    "ihca", "o", "ē-hua", "quiza", "huetzi", "tlehcō", "cal-aqui",
    "pil-ca",
  ];
  const reflexiveMatrices = [
    "m-o-cāhua", "m-o-tēca", "m-o-tlāl-i-ā", "m-o-man-a", "m-o-quetza",
  ];
  const sharedObjectMatrices = [
    "tlāl-i-ā", "quetza", "tēca", "cāhua", "quix-tiā", "māy-a-hui",
  ];
  const cases = {
    basic: evaluate(runtime),
    preteritEmbed: evaluate(runtime, { tense: "preterit" }),
    vowelInitialMatrix: evaluate(runtime, { compoundMatrixStem: "o" }),
    syncopatedYa: evaluate(runtime, {
      compoundMatrixStem: "ya-uh",
      compoundYaSyncopation: true,
      tense: "imperfect",
    }),
    caEmbed: evaluate(runtime, { sourceStem: "ca", verbClass: "A" }),
    yaEmbed: evaluate(runtime, { sourceStem: "ya-uh", verbClass: "B" }),
    cacNonanimate: evaluate(runtime, {
      sourceStem: "cac",
      verbClass: "B",
      compoundSubjectAnimacy: "nonanimate",
    }),
    itzObservational: evaluate(runtime, {
      sourceStem: "itz",
      verbClass: "B",
      compoundItzSense: "observational",
      compoundMatrixStem: "o",
    }),
    huicaCarry: evaluate(runtime, {
      sourceStem: "huīca",
      verbClass: "A",
      lateVariant: "huītz-carry",
      compoundMatrixStem: "huī-tz",
    }),
    accompanyingPossession: evaluate(runtime, {
      sourceStem: "ca",
      verbClass: "A",
      lateVariant: "accompanying-possession",
      compoundPossessiveStem: "chīmal",
      compoundPossessor: "1sg",
    }),
    reflexiveMatrix: evaluate(runtime, {
      lateVariant: "reflexive-matrix",
      compoundMatrixStem: "m-o-quetza",
    }),
    sharedObject: evaluate(runtime, {
      sourceStem: "cui",
      sourceValence: "specific-projective",
      objectKind: "specific-projective",
      objectPerson: "3sg",
      verbClass: "A",
      lateVariant: "shared-object",
      compoundMatrixStem: "tlāl-i-ā",
    }),
    futureNequi: evaluate(runtime, {
      sourceStem: "cochi",
      verbClass: "B",
      tense: "future",
      lateVariant: "future-embed",
      compoundMatrixStem: "tla-nequi",
    }),
    futureQui: evaluate(runtime, {
      sourceStem: "cochi",
      verbClass: "B",
      tense: "imperfect",
      lateVariant: "future-embed",
      compoundMatrixStem: "tla-qui",
    }),
    hysteronProteron: evaluate(runtime, {
      compoundMatrixStem: "ahci",
      compoundEventOrder: "hysteron-proteron",
    }),
    nonactiveEmbed: evaluate(runtime, {
      ...impersonalRequest,
      nonactiveOptionId: impersonalOptionId,
      compoundNonactiveScope: "embed",
    }),
    recursiveEmbed: compact(runtime,
      runtime.evaluateClassicalNahuatlLateVncDerivation(baseRequest({
        sourceStem: recursiveSource.operationFrame?.targetStem,
        subject: "2sg",
        tense: "preterit",
        compoundMatrixStem: "ya-uh",
        compoundEmbedClosureFrame: recursiveSource,
      }))),
  };
  cases.intransitiveMatrices = Object.fromEntries(intransitiveMatrices.map(
    matrixStem => [matrixStem, evaluate(runtime, { compoundMatrixStem: matrixStem })],
  ));
  cases.reflexiveMatrices = Object.fromEntries(reflexiveMatrices.map(
    matrixStem => [matrixStem, evaluate(runtime, {
      subject: matrixStem === "m-o-man-a" ? "3pl" : "3sg",
      lateVariant: "reflexive-matrix",
      compoundMatrixStem: matrixStem,
    })],
  ));
  cases.sharedObjectMatrices = Object.fromEntries(sharedObjectMatrices.map(
    matrixStem => [matrixStem, evaluate(runtime, {
      sourceStem: "cui",
      sourceValence: "specific-projective",
      objectKind: "specific-projective",
      objectPerson: "3sg",
      verbClass: "A",
      lateVariant: "shared-object",
      compoundMatrixStem: matrixStem,
    })],
  ));
  const blockedCases = {
    unknownMatrix: evaluate(runtime, { compoundMatrixStem: "invented" }),
    wrongMatrixFamily: evaluate(runtime, {
      compoundMatrixStem: "tlāl-i-ā",
    }),
    sharedWithoutObject: evaluate(runtime, {
      lateVariant: "shared-object",
      compoundMatrixStem: "tlāl-i-ā",
    }),
    regularCarry: evaluate(runtime, {
      sourceStem: "huīca",
      verbClass: "A",
      compoundMatrixStem: "huī-tz",
    }),
    itzMissingSense: evaluate(runtime, {
      sourceStem: "itz",
      verbClass: "B",
      compoundMatrixStem: "o",
    }),
    animateCac: evaluate(runtime, {
      sourceStem: "cac",
      verbClass: "B",
      compoundSubjectAnimacy: "animate",
    }),
    futureQuiWrongTense: evaluate(runtime, {
      sourceStem: "cochi",
      verbClass: "B",
      tense: "present",
      lateVariant: "future-embed",
      compoundMatrixStem: "tla-qui",
    }),
  };
  const positive = [
    ...Object.values(cases).filter(record => record?.authorizationStatus),
    ...Object.values(cases.intransitiveMatrices),
    ...Object.values(cases.reflexiveMatrices),
    ...Object.values(cases.sharedObjectMatrices),
  ].filter(record => record?.authorizationStatus);
  const positiveAuthorized = positive.every(record => (
    record.authorizationStatus === "authorized"
    && record.canonicalClosure
    && record.finiteAuthorizationStatus === "authorized"
    && record.finiteMachineryContinuous
    && record.gcdSatisfied
    && record.lcmComplete
    && !record.callerSuppliedAuthorityAccepted
  ));
  const blockedReasons = {
    unknownMatrix: "lesson28-matrix-inventory-selection-required",
    wrongMatrixFamily: "lesson28-matrix-inventory-selection-required",
    sharedWithoutObject: "shared-object-coreferential-embed-object-required",
    regularCarry: "huīca-itqui-require-old-connectiveless-huītz-formation",
    itzMissingSense: "typed-itz-embed-sense-required",
    animateCac: "cac-embed-requires-nonanimate-subject",
    futureQuiWrongTense: "tla-qui-matrix-is-imperfect-only",
  };
  const blockedAuthorized = Object.entries(blockedCases).every(
    ([id, record]) => record.authorizationStatus === "blocked"
      && record.blockReason === blockedReasons[id],
  );
  const authorized = positiveAuthorized && blockedAuthorized;
  return deepFreeze({
    kind: "classical-nahuatl-compound-validation-frame",
    authorizationStatus: authorized ? "authorized" : "blocked",
    blockReason: authorized ? "" : "classical-compound-validation-coordinate-blocked",
    typedFrameAuthority: true,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
    storedExampleAuthority: false,
    curriculumMetadataAuthority: false,
    contract: {
      operationOrder: [
        "authorized-typed-embed-vnc",
        "licensed-compound-relationship",
        "authorized-typed-matrix-vnc",
        "embed-before-matrix-typed-predicate",
        "canonical-finite-boundary",
      ],
      process: "nuclear-clause-fusion-into-new-nuclear-clause",
      underlyingClauseRelationsPreserved: true,
      matrixAfterEmbed: cases.basic.facts.matrixAfterEmbed,
      embedSubjectDeleted: cases.basic.facts.embedSubjectDeleted,
      principalSubjectFromMatrix: true,
      embedNeverFunctionsAsSubject: true,
      matrixDeterminesCompoundKind:
        cases.basic.facts.matrixDeterminesCompoundType,
      embedDeterminesCompoundValence:
        cases.basic.facts.embedDeterminesCompoundValence,
      compoundTypes: ["linked", "integrated"],
      linkedRealizations: ["connective-t", "connectiveless"],
      valencePatterns: [
        "intransitive+intransitive",
        "intransitive+transitive",
        "transitive+intransitive",
        "transitive+transitive",
      ],
      connectiveAllomorphs: {
        beforeVowel: cases.vowelInitialMatrix.facts.connective,
        beforeConsonant: cases.basic.facts.connective,
        supportiveVowelSeparatesConstituents: true,
      },
      connectiveEmbedTense: "preterit",
      defaultEventOrder: "embed-before-matrix",
      reversedEventOrder:
        cases.hysteronProteron.facts.eventOrder,
      intransitiveMatrixInventory: intransitiveMatrices,
      reflexiveMatrixInventory: reflexiveMatrices,
      sharedObjectMatrixInventory: sharedObjectMatrices,
      futureEmbedMatrixInventory: ["tla-nequi", "tla-qui"],
      sharedObjectPronounManifestation: "single-on-embed",
      sharedObjectKinds: ["reflexive", "projective"],
      futureEmbedObjectFunction: true,
      recursiveTypedClosureRequired: true,
      traditionalSpellingRole: "documentary-structural-ambiguity-only",
      translationRole: "evidence-only-no-constituent-order-authority",
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
      storedExampleAuthority: false,
    },
    cases,
    blockedCases,
  });
}

export function createClassicalCompoundValidationSemanticOperationsApi(
  targetObject = globalThis,
) {
  const issuedFrames = new WeakSet();
  let cachedProjection = null;

  function buildClassicalNahuatlCompoundValidationFrame() {
    if (!cachedProjection) {
      cachedProjection = buildProjection(targetObject);
      if (cachedProjection.authorizationStatus === "authorized") {
        issuedFrames.add(cachedProjection);
      }
    }
    return cachedProjection;
  }

  function isClassicalNahuatlCompoundValidationFrame(frame = null) {
    return Boolean(
      frame
      && issuedFrames.has(frame)
      && frame.kind === "classical-nahuatl-compound-validation-frame"
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
    buildClassicalNahuatlCompoundValidationFrame,
    isClassicalNahuatlCompoundValidationFrame,
  });
}
