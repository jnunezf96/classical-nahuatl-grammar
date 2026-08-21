// Non-authorizing live projection for the independently owned applicative
// semantics indexed by Andrews Lesson 26.  This module owns no Inventory atom
// and supplies no grammar.  Every projected value is read from an engine-issued
// source, option, operation, machinery, or finite-result frame.

function deepFreeze(value, seen = new WeakSet()) {
  if (!value || typeof value !== "object" || seen.has(value)) return value;
  seen.add(value);
  for (const nested of Object.values(value)) deepFreeze(nested, seen);
  return Object.freeze(value);
}

function active(runtime, stem, {
  verbClass = "B",
  sourceValence = "intransitive",
  sourceSubject = "3sg",
  objectPerson = "",
  mood = "indicative",
  tense = "present",
} = {}) {
  return runtime.buildClassicalNahuatlVerbstemClassFrame(stem, {
    subject: sourceSubject,
    mood,
    tense,
    verbClass,
    perfectiveClass: verbClass,
    valence: sourceValence,
    requestedSourceValence: sourceValence,
    transitivity: sourceValence === "intransitive"
      ? "intransitive" : "transitive",
    objectKind: sourceValence === "intransitive"
      ? "none" : sourceValence,
    objectPerson,
    object: objectPerson,
  });
}

function compactOption(option = null) {
  if (!option) {
    return {
      authorizationStatus: "blocked",
      blockReason: "canonical-applicative-option-not-found",
    };
  }
  const bridge = option.typeTwoInternalBridgeFrame || null;
  return {
    authorizationStatus: option.authorizationStatus || "authorized",
    blockReason: option.blockReason || "",
    optionId: option.optionId || "",
    sourceStem: option.sourceStem || "",
    targetStem: option.targetStem || "",
    formulaTargetStem: option.formulaTargetStem || option.targetStem || "",
    derivationType: option.derivationType || "",
    derivationSubtype: option.derivationSubtype || "",
    derivationRoute: option.derivationRoute || "",
    procedure: option.procedure || "",
    ruleId: option.ruleId || "",
    andrewsSection: option.andrewsSection || "",
    targetClass: option.targetClass || "",
    underlyingSuffix: option.underlyingSuffix || "",
    suffixLength: option.suffixLength || "",
    scopeModel: option.scopeModel || "",
    scopeRule: option.scopeRule || "",
    participantRule: option.participantRule || "",
    formationRuleTier: option.formationRuleTier || "",
    productivityStatus: option.productivityStatus || "",
    sourceDefective: option.sourceDefective === true,
    sourceMeaning: option.sourceMeaning || "",
    geminateStatus: option.geminateStatus || "",
    phonologicalShift: option.phonologicalShift
      ? { ...option.phonologicalShift }
      : null,
    targetConstruction: option.targetConstruction
      ? { ...option.targetConstruction }
      : null,
    bridge: bridge ? {
      authorizationStatus: bridge.authorizationStatus || "",
      nonactiveStem: bridge.nonactiveStem || "",
      suffixFamily: bridge.suffixFamily || "",
      bridgeBaseOperation: bridge.bridgeBaseOperation || "",
      internalPrerequisiteOnly: bridge.internalPrerequisiteOnly === true,
      lesson20OperationAuthority: bridge.lesson20OperationAuthority === true,
      curriculumOrderAuthority: bridge.curriculumOrderAuthority === true,
    } : null,
    callerSuppliedTargetAllowed:
      option.callerSuppliedTargetAllowed === true,
    formulaArtifactAuthority: option.formulaArtifactAuthority === true,
    surfaceArtifactAuthority: option.surfaceArtifactAuthority === true,
  };
}

function formation(runtime, stem, targetStem, sourceOptions = {}) {
  const source = active(runtime, stem, sourceOptions);
  const inventory = runtime.getClassicalNahuatlVncDerivationOptionInventory(
    source,
    { derivationType: "applicative" },
  );
  const option = (inventory?.options || [])
    .find(candidate => candidate.targetStem === targetStem);
  return {
    inventoryAuthorizationStatus:
      inventory?.authorizationStatus || "blocked",
    inventoryBlockReason: inventory?.blockReason || "",
    inventoryOptionCount: inventory?.optionCount || 0,
    selectorRequired: inventory?.selectorRequired === true,
    callerSuppliedTargetAllowed:
      inventory?.callerSuppliedTargetAllowed === true,
    formulaArtifactAuthority:
      inventory?.formulaArtifactAuthority === true,
    surfaceArtifactAuthority:
      inventory?.surfaceArtifactAuthority === true,
    option: compactOption(option),
  };
}

function compactObjectRequest(request = {}) {
  return {
    objectId: request.objectId || "",
    objectKind: request.objectKind || "",
    objectPerson: request.objectPerson || "",
    governor: request.governor || "",
    derivationalLevel: Number(request.derivationalLevel || 0),
  };
}

function deriveApplicative(runtime, stem, targetStem, {
  verbClass = "B",
  sourceValence = "intransitive",
  sourceSubject = "3sg",
  objectPerson = "",
  applicativeObjectKind = "specific-projective",
  applicativeObjectPerson = "1sg",
} = {}) {
  const source = active(runtime, stem, {
    verbClass,
    sourceValence,
    sourceSubject,
    objectPerson,
  });
  const inventory = runtime.getClassicalNahuatlVncDerivationOptionInventory(
    source,
    { derivationType: "applicative" },
  );
  const option = (inventory?.options || [])
    .find(candidate => candidate.targetStem === targetStem);
  const operation = runtime.deriveClassicalNahuatlVncDerivationOperationFrame(
    source,
    {
      derivationType: "applicative",
      optionId: option?.optionId || "missing-canonical-option",
      targetSubject: sourceSubject,
      applicativeObjectKind,
      applicativeObjectPerson,
    },
  );
  const machinery = runtime.buildClassicalNahuatlDerivedVncMachineryFrame(
    source,
    operation,
    { targetSubject: sourceSubject, mood: "indicative", tense: "present" },
  );
  const finite = runtime.buildClassicalNahuatlVncFiniteSurfaceFrame(machinery);
  const transform = operation?.participantTransformFrame || {};
  const cluster = machinery?.targetObjectClusterFrame
    || machinery?.multipleObjectClusterFrame || null;
  return {
    authorizationStatus: operation?.authorizationStatus || "blocked",
    blockReason: operation?.blockReason || "",
    targetStem: operation?.targetStem || "",
    targetClass: operation?.targetClass || "",
    derivationSubtype: operation?.derivationSubtype || "",
    derivationRoute: operation?.derivationRoute || "",
    sourceSubject: transform.sourceSubject || "",
    targetSubject: transform.targetSubject || "",
    sourceSubjectPreservedByApplicative:
      transform.sourceSubjectPreservedByApplicative === true,
    sourceObjectCount: Number(transform.sourceObjectCount || 0),
    targetObjectCount: Number(transform.targetObjectCount || 0),
    newestDerivationalLevel:
      Number(transform.newestDerivationalLevel || 0),
    addedObjectRequest: compactObjectRequest(transform.addedObjectRequest),
    targetObjectRequests: (transform.targetObjectRequests || [])
      .map(compactObjectRequest),
    objectClusterAuthorizationStatus:
      cluster?.authorizationStatus || "",
    objectClusterPositionCount:
      Number(cluster?.positionCount || cluster?.objectPositions?.length || 0),
    objectClusterPositions: (cluster?.objectPositions || [])
      .map(position => ({
        objectKind: position.objectKind || "",
        governor: position.governor || "",
        derivationalLevel: Number(position.derivationalLevel || 0),
        prominence: position.prominence || "",
        sounded: position.sounded === true,
        silencingRule: position.silencingRule || "",
      })),
    machineryAuthorizationStatus:
      machinery?.authorizationStatus || "blocked",
    finiteAuthorizationStatus: finite?.authorizationStatus || "blocked",
    formulaRealization: finite?.formulaRealization || "",
    wordRealization: finite?.wordRealization || "",
    formulaDerivedFromWrittenProjection:
      finite?.formulaDerivedFromWrittenProjection === true,
    writtenDerivedFromFormulaProjection:
      finite?.writtenDerivedFromFormulaProjection === true,
    callerSuppliedAuthorityAccepted:
      operation?.callerSuppliedAuthorityAccepted === true,
  };
}

function deriveTripleApplicative(runtime) {
  const source = active(runtime, "caqui", {
    sourceValence: "specific-projective",
    sourceSubject: "2sg",
    objectPerson: "3sg",
  });
  const causativeInventory =
    runtime.getClassicalNahuatlVncDerivationOptionInventory(source, {
      derivationType: "causative",
    });
  const causativeOption = (causativeInventory?.options || [])
    .find(option => option.targetStem === "caquī-tiā");
  const causativeOperation =
    runtime.deriveClassicalNahuatlVncDerivationOperationFrame(source, {
      derivationType: "causative",
      optionId: causativeOption?.optionId || "missing-canonical-option",
      targetSubject: "1sg",
      causativeObjectKind: "specific-projective",
    });
  const causativeMachinery =
    runtime.buildClassicalNahuatlDerivedVncMachineryFrame(
      source,
      causativeOperation,
      { targetSubject: "1sg", mood: "indicative", tense: "present" },
    );
  const applicativeInventory =
    runtime.getClassicalNahuatlVncDerivationOptionInventory(
      causativeMachinery,
      { derivationType: "applicative" },
    );
  const applicativeOption = (applicativeInventory?.options || [])
    .find(option => option.targetStem === "caquī-ti-liā");
  const operation = runtime.deriveClassicalNahuatlVncDerivationOperationFrame(
    causativeMachinery,
    {
      derivationType: "applicative",
      optionId: applicativeOption?.optionId || "missing-canonical-option",
      targetSubject: "1sg",
      applicativeObjectKind: "specific-projective",
      applicativeObjectPerson: "2sg",
    },
  );
  const machinery = runtime.buildClassicalNahuatlDerivedVncMachineryFrame(
    causativeMachinery,
    operation,
    { targetSubject: "1sg", mood: "indicative", tense: "present" },
  );
  const finite = runtime.buildClassicalNahuatlVncFiniteSurfaceFrame(machinery);
  const transform = operation?.participantTransformFrame || {};
  return {
    authorizationStatus: operation?.authorizationStatus || "blocked",
    blockReason: operation?.blockReason || "",
    sourceDerivationAuthorizationStatus:
      causativeOperation?.authorizationStatus || "blocked",
    targetStem: operation?.targetStem || "",
    sourceObjectCount: Number(transform.sourceObjectCount || 0),
    targetObjectCount: Number(transform.targetObjectCount || 0),
    newestDerivationalLevel:
      Number(transform.newestDerivationalLevel || 0),
    targetObjectRequests: (transform.targetObjectRequests || [])
      .map(compactObjectRequest),
    machineryAuthorizationStatus:
      machinery?.authorizationStatus || "blocked",
    finiteAuthorizationStatus: finite?.authorizationStatus || "blocked",
    formulaRealization: finite?.formulaRealization || "",
    wordRealization: finite?.wordRealization || "",
  };
}

function evaluateApplicative(runtime, request, targetStem, voice = "active") {
  const preview = runtime.evaluateClassicalNahuatlVncApplication({
    ...request,
    requestedVoice: "active",
  });
  const option = preview?.controlFrame?.derivationOptionInventory?.options
    ?.find(candidate => candidate.targetStem === targetStem);
  let selectedRequest = {
    ...request,
    requestedVoice: voice,
    derivationOptionId: option?.optionId || "missing-canonical-option",
  };
  if (voice !== "active") {
    const voicePreview = runtime.evaluateClassicalNahuatlVncApplication(
      selectedRequest,
    );
    selectedRequest = {
      ...selectedRequest,
      nonactiveOptionId:
        voicePreview?.controlFrame?.nonactiveOptionInventory
          ?.automaticOptionId
        || voicePreview?.controlFrame?.nonactiveOptionInventory
          ?.options?.[0]?.optionId
        || "",
    };
  }
  const result = runtime.evaluateClassicalNahuatlVncApplication(
    selectedRequest,
  );
  return {
    authorizationStatus: result?.authorizationStatus || "blocked",
    blockReason: result?.blockReason || "",
    targetStem: result?.normalizedRequest?.targetStem || "",
    selectedVoice: result?.resultFrame?.selectedVoice || "",
    formulaRealization: result?.resultFrame?.formulaRealization || "",
    wordRealization: result?.resultFrame?.surfaceRealization || "",
    sentenceType:
      result?.resultFrame?.selectedMachineryFrame?.sentenceSurfaceFrame
        ?.sentenceType || "",
    sentenceRole:
      result?.resultFrame?.selectedMachineryFrame?.sentenceSurfaceFrame
        ?.canvasSentenceRole || "",
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  };
}

function buildProjection(runtime) {
  const transitive = {
    verbClass: "A",
    sourceValence: "specific-projective",
    objectPerson: "3sg",
  };
  const formations = {
    inherentMaca: formation(runtime, "maca", "maca", transitive),
    irregularItzi: formation(runtime, "itzi", "itt-a"),
    valenceNeutralItzi: formation(runtime, "itzi", "itzi"),
    valenceNeutralHuetzca: formation(
      runtime,
      "huetzca",
      "hue-tz-ca",
      { verbClass: "A" },
    ),
    typeOnePinahua: formation(
      runtime,
      "pīn-ā-hua",
      "pīn-ā-hu-iā",
      { verbClass: "A" },
    ),
    typeOneIxca: formation(runtime, "ixca", "ixqu-iā", transitive),
    typeOneOhquetza: formation(
      runtime,
      "oh-quetza",
      "oh-quech-iā",
      transitive,
    ),
    typeOneIhtlani: formation(
      runtime,
      "ihtlani",
      "ih-tlan-iā",
      { sourceValence: "specific-projective", objectPerson: "3sg" },
    ),
    typeOneCuicati: formation(
      runtime,
      "cuīca-ti",
      "cuica-t-iā",
      { verbClass: "A" },
    ),
    typeTwoFinalI: formation(
      runtime,
      "ihtlani",
      "ih-tlani-liā",
      { sourceValence: "specific-projective", objectPerson: "3sg" },
    ),
    typeTwoFinalHui: formation(
      runtime,
      "tlatz-i-hui",
      "tlatz-i-l-huiā",
    ),
    typeTwoFinalSi: formation(
      runtime,
      "caci",
      "caxi-liā",
      { sourceValence: "specific-projective", objectPerson: "3sg" },
    ),
    typeTwoFinalTzi: formation(runtime, "huetzi", "huechi-liā"),
    typeTwoFinalTi: formation(
      runtime,
      "mati",
      "machi-liā",
      { sourceValence: "specific-projective", objectPerson: "3sg" },
    ),
    recursiveFinalIa: formation(
      runtime,
      "cual-ā-ni-l-tiā",
      "cual-ā-ni-l-ti-liā",
      { verbClass: "C", sourceValence: "specific-projective", objectPerson: "3sg" },
    ),
    typeTwoConsonantA: formation(
      runtime,
      "chōca",
      "chōqui-liā",
      { verbClass: "A" },
    ),
    sourceAbsentConsonantA: formation(
      runtime,
      "nān-ca",
      "nānqui-liā",
      { verbClass: "A", sourceValence: "specific-projective", objectPerson: "3sg" },
    ),
    finalSaToXi: formation(
      runtime,
      "tlāza",
      "tlāxi-liā",
      transitive,
    ),
    finalTzaToChi: formation(
      runtime,
      "nōtza",
      "nōchi-liā",
      transitive,
    ),
    typeTwoTlToT: formation(runtime, "pa-tla", "pa-ti-liā", transitive),
    classDFinalLong: formation(
      runtime,
      "cuā",
      "cuā-liā",
      { verbClass: "D", sourceValence: "specific-projective", objectPerson: "3sg" },
    ),
    transitiveIya: formation(
      runtime,
      "piya",
      "piya-liā",
      { sourceValence: "specific-projective", objectPerson: "3sg" },
    ),
    intransitiveEya: formation(runtime, "ce-ce-ya", "ce-ce-liā"),
    transitiveOya: formation(
      runtime,
      "tla-poya",
      "tla-poya-liā",
      { sourceValence: "specific-projective", objectPerson: "3sg" },
    ),
    valenceNeutralOya: formation(
      runtime,
      "yōco-ya",
      "yōco-liā",
      { sourceValence: "specific-projective", objectPerson: "3sg" },
    ),
    suppletiveOa: formation(
      runtime,
      "iht-o-ā",
      "il-huiā",
      { verbClass: "C", sourceValence: "specific-projective", objectPerson: "3sg" },
    ),
    oaHistoryAHui: formation(
      runtime,
      "iht-o-ā",
      "iht-a-l-huiā",
      { verbClass: "C", sourceValence: "specific-projective", objectPerson: "3sg" },
    ),
    oaHistoryIHui: formation(
      runtime,
      "iht-o-ā",
      "iht-i-l-huiā",
      { verbClass: "C", sourceValence: "specific-projective", objectPerson: "3sg" },
    ),
    oaHistoryRootO: formation(
      runtime,
      "iht-o-ā",
      "iht-o-l-huiā",
      { verbClass: "C", sourceValence: "specific-projective", objectPerson: "3sg" },
    ),
    exceptionalOaLia: formation(
      runtime,
      "tēm-o-ā",
      "tēm-o-liā",
      { verbClass: "C", sourceValence: "specific-projective", objectPerson: "3sg" },
    ),
    finalOHuia: formation(
      runtime,
      "temō",
      "temō-huiā",
      { verbClass: "A" },
    ),
    typeThreeNamaca: formation(
      runtime,
      "namaca",
      "namaqui-l-tiā",
      transitive,
    ),
    typeThreeNequi: formation(
      runtime,
      "nequi",
      "nec-tiā",
      { sourceValence: "specific-projective", objectPerson: "3sg" },
    ),
    typeThreeNequiLo: formation(
      runtime,
      "nequi",
      "nequi-l-tiā",
      { sourceValence: "specific-projective", objectPerson: "3sg" },
    ),
    parallelChihuaTypeOne: formation(
      runtime,
      "chīhua",
      "chīhu-iā",
      transitive,
    ),
    parallelChihuaTypeTwo: formation(
      runtime,
      "chīhua",
      "chihui-liā",
      transitive,
    ),
    objectReadingTlani: formation(runtime, "tlāni", "tlāni"),
    objectReadingNonotza: formation(
      runtime,
      "nō-nōtza",
      "nō-nōtza",
      { verbClass: "A" },
    ),
    defusedTla: formation(
      runtime,
      "tla-hua-hua-l-o-ā",
      "hua-hua-l-o-ā",
      { verbClass: "C", sourceValence: "specific-projective", objectPerson: "3sg" },
    ),
    rootFinalLOa: formation(
      runtime,
      "tla-hua-hua-l-o-ā",
      "tla-hua-hua-l-huiā",
      { verbClass: "C", sourceValence: "specific-projective", objectPerson: "3sg" },
    ),
  };

  const participants = {
    singleSpecific: deriveApplicative(runtime, "chōca", "chōqu-iā", {
      verbClass: "A",
    }),
    singleNonspecificHuman: deriveApplicative(
      runtime,
      "chōca",
      "chōqu-iā",
      {
        verbClass: "A",
        applicativeObjectKind: "nonspecific-human",
        applicativeObjectPerson: "",
      },
    ),
    doubleSpecific: deriveApplicative(
      runtime,
      "chīhua",
      "chihui-liā",
      transitive,
    ),
    doubleReflexiveSource: deriveApplicative(
      runtime,
      "ilpi-ā",
      "ilpi-liā",
      {
        verbClass: "C",
        sourceValence: "mainline-reflexive",
        sourceSubject: "1sg",
        objectPerson: "1sg",
        applicativeObjectPerson: "2sg",
      },
    ),
    tripleSpecific: deriveTripleApplicative(runtime),
  };

  const interactions = {
    moodWish: evaluateApplicative(runtime, {
      sourceStem: "chōca",
      verbClass: "A",
      sourceValence: "intransitive",
      sourceSubject: "3sg",
      subject: "3sg",
      mood: "optative",
      tense: "nonpast",
      requestedDerivation: "applicative",
      applicativeObjectKind: "specific-projective",
      applicativeObjectPerson: "1sg",
      sentenceOptions: {
        sentenceType: "wish-sentence",
        introductoryParticle: "ma",
      },
    }, "chōqu-iā"),
    passive: evaluateApplicative(runtime, {
      sourceStem: "chōca",
      verbClass: "A",
      sourceValence: "intransitive",
      sourceSubject: "3sg",
      subject: "3sg",
      mood: "indicative",
      tense: "present",
      requestedDerivation: "applicative",
      applicativeObjectKind: "specific-projective",
      applicativeObjectPerson: "1sg",
    }, "chōqu-iā", "passive"),
  };

  const statuses = [
    ...Object.values(formations).flatMap(record => [
      record.inventoryAuthorizationStatus,
      record.option.authorizationStatus,
    ]),
    ...Object.values(participants).flatMap(record => [
      record.authorizationStatus,
      record.machineryAuthorizationStatus,
      record.finiteAuthorizationStatus,
    ]),
    ...Object.values(interactions).map(record => record.authorizationStatus),
  ];
  const authorized = statuses.every(status => status === "authorized");
  return deepFreeze({
    kind: "classical-nahuatl-applicative-validation-frame",
    authorizationStatus: authorized ? "authorized" : "blocked",
    blockReason: authorized
      ? "" : "classical-applicative-validation-coordinate-blocked",
    typedFrameAuthority: true,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
    storedExampleAuthority: false,
    curriculumMetadataAuthority: false,
    contract: {
      operationOrder: [
        "typed-vnc-source",
        "licensed-applicative-stem-option",
        "applicative-participant-import",
        "object-history-ordering-and-silencing",
        "canonical-finite-boundary",
      ],
      participantRule:
        formations.typeOnePinahua.option.participantRule,
      scopeModel: formations.typeOnePinahua.option.scopeModel,
      sourceSubjectPreserved:
        participants.singleSpecific.sourceSubjectPreservedByApplicative,
      maximumLicensedObjectCount:
        participants.tripleSpecific.targetObjectCount,
      formulaArtifactAuthority:
        formations.typeOnePinahua.formulaArtifactAuthority,
      surfaceArtifactAuthority:
        formations.typeOnePinahua.surfaceArtifactAuthority,
    },
    deceptiveDoubleObjectSourceCondition: {
      authorizationStatus: "authorized",
      surfaceReading: "double-object",
      requiredSourceStem: "tla-chihu-iā",
      requiredSourceValence: "single-object-applicative",
      sourceMeaning: "cast-a-spell-on-object",
      derivedFromApplicativeFormation:
        formations.parallelChihuaTypeOne.option.authorizationStatus
          === "authorized",
    },
    formations,
    participants,
    interactions,
  });
}

export function createClassicalApplicativeValidationSemanticOperationsApi(
  targetObject = globalThis,
) {
  const issuedFrames = new WeakSet();
  let cachedProjection = null;

  function buildClassicalNahuatlApplicativeValidationFrame() {
    if (!cachedProjection) {
      cachedProjection = buildProjection(targetObject);
      if (cachedProjection.authorizationStatus === "authorized") {
        issuedFrames.add(cachedProjection);
      }
    }
    return cachedProjection;
  }

  function isClassicalNahuatlApplicativeValidationFrame(frame = null) {
    return Boolean(
      frame
      && issuedFrames.has(frame)
      && frame.kind === "classical-nahuatl-applicative-validation-frame"
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
    buildClassicalNahuatlApplicativeValidationFrame,
    isClassicalNahuatlApplicativeValidationFrame,
  });
}
