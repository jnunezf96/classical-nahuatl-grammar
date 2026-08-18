// Non-authorizing validation projection for independently owned Lessons 24-25
// source-analysis, causative-formation, participant, voice, mood, and
// supplementation semantics. This module owns no Inventory atom and defines no
// grammar. Every retained fact is emitted by an installed canonical runtime
// operation; Canvas text, translations, expected answers, and lesson metadata
// are never operation inputs.

import {
  CLASSICAL_NAHUATL_LESSONS23_26_GCD,
  CLASSICAL_NAHUATL_LESSONS23_26_LCM,
} from "./vnc_lessons23_26_grammar.mjs";

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

function compactSource(runtime, stem, options = {}) {
  const frame = active(runtime, stem, options);
  const analysis = runtime.buildClassicalNahuatlVncDerivationSourceAnalysisFrame(
    frame,
  );
  return {
    authorizationStatus: frame?.authorizationStatus || "blocked",
    blockReason: frame?.blockReason || "",
    sourceStem: frame?.sourceVerbstem || frame?.stem || "",
    classId: frame?.classId || "",
    sourceValence: frame?.classTargetValence || "",
    citationForm: frame?.citationForm || "",
    finalVowel:
      analysis?.sourceFinalShapeFrame?.finalLetter || "",
    finalVowelLength:
      analysis?.sourceFinalShapeFrame?.finalVowelLength || "",
    analysisAuthorizationStatus:
      analysis?.authorizationStatus || "blocked",
    analysisCategories: (analysis?.analyses || [])
      .map(record => record.category),
    callerSuppliedAnalysisAllowed:
      analysis?.callerSuppliedAnalysisAllowed === true,
    formulaArtifactAuthority:
      analysis?.formulaArtifactAuthority === true,
    surfaceArtifactAuthority:
      analysis?.surfaceArtifactAuthority === true,
  };
}

function compactOption(option = {}) {
  const bridge = option.typeTwoInternalBridgeFrame || null;
  return {
    authorizationStatus: option.authorizationStatus || "authorized",
    optionId: option.optionId || "",
    sourceStem: option.sourceStem || "",
    targetStem: option.targetStem || "",
    formulaTargetStem: option.formulaTargetStem || option.targetStem || "",
    derivationType: option.derivationType || "",
    derivationSubtype: option.derivationSubtype || "",
    derivationRoute: option.derivationRoute || "",
    procedure: option.procedure || "",
    ruleId: option.ruleId || "",
    targetClass: option.targetClass || "",
    stemRelation: option.stemRelation || "",
    formationRuleTier: option.formationRuleTier || "",
    typeTwoBridgeStem: option.typeTwoBridgeStem || "",
    typeTwoBridgeSuffixFamily: option.typeTwoBridgeSuffixFamily || "",
    participantRule: option.participantRule || "",
    bridge: bridge ? {
      authorizationStatus: bridge.authorizationStatus,
      sourceStem: bridge.sourceStem,
      bridgeBaseOperation: bridge.bridgeBaseOperation,
      suffixFamily: bridge.suffixFamily,
      nonactiveStem: bridge.nonactiveStem,
      internalPrerequisiteOnly: bridge.internalPrerequisiteOnly === true,
      lesson20OperationAuthority: bridge.lesson20OperationAuthority === true,
      curriculumOrderAuthority: bridge.curriculumOrderAuthority === true,
    } : null,
    formulaArtifactAuthority: option.formulaArtifactAuthority === true,
    surfaceArtifactAuthority: option.surfaceArtifactAuthority === true,
    callerSuppliedTargetAllowed: option.callerSuppliedTargetAllowed === true,
  };
}

function compactDerivation(runtime, stem, options = {}) {
  const source = active(runtime, stem, options);
  const analysis = runtime.buildClassicalNahuatlVncDerivationSourceAnalysisFrame(
    source,
  );
  const inventory = runtime.getClassicalNahuatlVncDerivationOptionInventory(
    source,
    { derivationType: "causative" },
  );
  return {
    authorizationStatus: inventory?.authorizationStatus || "blocked",
    blockReason: inventory?.blockReason || "",
    sourceStem: analysis?.sourceStem || stem,
    sourceClass: analysis?.sourceClass || "",
    sourceValence: analysis?.sourceValence || "",
    analysisCategories: (analysis?.analyses || [])
      .map(record => record.category),
    optionCount: inventory?.options?.length || 0,
    selectorRequired: inventory?.selectorRequired === true,
    selectionRequired: inventory?.selectionRequired === true,
    options: (inventory?.options || []).map(compactOption),
    callerSuppliedTargetAllowed:
      inventory?.callerSuppliedTargetAllowed === true,
    formulaArtifactAuthority:
      inventory?.formulaArtifactAuthority === true,
    surfaceArtifactAuthority:
      inventory?.surfaceArtifactAuthority === true,
  };
}

function derive(runtime, stem, targetStem, {
  verbClass = "B",
  sourceValence = "intransitive",
  sourceSubject = "3sg",
  objectPerson = "",
  targetSubject = "1sg",
  causativeObjectKind = "specific-projective",
} = {}) {
  const source = active(runtime, stem, {
    verbClass, sourceValence, sourceSubject, objectPerson,
  });
  const inventory = runtime.getClassicalNahuatlVncDerivationOptionInventory(
    source,
    { derivationType: "causative" },
  );
  const option = (inventory?.options || [])
    .find(candidate => candidate.targetStem === targetStem);
  const operation = runtime.deriveClassicalNahuatlVncDerivationOperationFrame(
    source,
    {
      derivationType: "causative",
      optionId: option?.optionId || "missing-canonical-option",
      targetSubject,
      causativeObjectKind,
    },
  );
  const machinery = runtime.buildClassicalNahuatlDerivedVncMachineryFrame(
    source,
    operation,
    { targetSubject, mood: "indicative", tense: "present" },
  );
  const finite = runtime.buildClassicalNahuatlVncFiniteSurfaceFrame(machinery);
  return {
    source,
    machinery,
    compact: {
      authorizationStatus: operation?.authorizationStatus || "blocked",
      blockReason: operation?.blockReason || "",
      sourceStem: operation?.sourceStem || "",
      targetStem: operation?.targetStem || "",
      targetClass: operation?.targetClass || "",
      derivationSubtype: operation?.derivationSubtype || "",
      derivationRoute: operation?.derivationRoute || "",
      targetSubject: operation?.targetSubject || "",
      requestedCausativeObjectKind:
        operation?.requestedCausativeObjectKind || "",
      targetObjectRequests: (operation?.targetObjectRequests || [])
        .map(request => ({
          objectId: request.objectId,
          objectKind: request.objectKind,
          objectPerson: request.objectPerson,
          governor: request.governor,
          derivationalLevel: request.derivationalLevel,
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
    },
  };
}

function deriveFromIntransitiveImpersonal(
  runtime,
  stem,
  targetStem,
  { verbClass = "B", targetSubject = "1sg" } = {},
) {
  const activeSource = active(runtime, stem, {
    verbClass,
    sourceValence: "intransitive",
    sourceSubject: "3sg",
  });
  const nonactiveStemRecord =
    runtime.deriveClassicalNahuatlNonactiveStemRecord(stem, {
      verbClass,
      sourceValence: "intransitive",
    });
  const source = runtime.buildClassicalNahuatlDerivedVncFrame(activeSource, {
    voice: "impersonal",
    nonactiveStemRecord,
    sourceValence: "intransitive",
    sourceSubject: "3sg",
    mood: "indicative",
    tense: "present",
    verbClass,
  });
  const inventory = runtime.getClassicalNahuatlVncDerivationOptionInventory(
    source,
    { derivationType: "causative" },
  );
  const option = (inventory?.options || [])
    .find(candidate => candidate.targetStem === targetStem);
  const operation = runtime.deriveClassicalNahuatlVncDerivationOperationFrame(
    source,
    {
      derivationType: "causative",
      optionId: option?.optionId || "missing-canonical-option",
      targetSubject,
    },
  );
  const machinery = runtime.buildClassicalNahuatlDerivedVncMachineryFrame(
    source,
    operation,
    { targetSubject, mood: "indicative", tense: "present" },
  );
  const finite = runtime.buildClassicalNahuatlVncFiniteSurfaceFrame(machinery);
  return {
    authorizationStatus: operation?.authorizationStatus || "blocked",
    blockReason: operation?.blockReason || "",
    sourceVoice: source?.voice || "",
    sourceFormula: source?.formulaRealization || "",
    derivationSubtype: option?.derivationSubtype || "",
    sourceSubjectBecomesCausativeObject:
      operation?.participantTransformFrame
        ?.sourceSubjectBecomesCausativeObject === true,
    implicitAgentBecomesCausativeObject:
      operation?.participantTransformFrame
        ?.implicitAgentBecomesCausativeObject === true,
    implicitAgentObjectKind:
      operation?.participantTransformFrame?.implicitAgentObjectKind || "",
    targetObjectRequests: (operation?.targetObjectRequests || [])
      .map(request => ({
        objectId: request.objectId,
        objectKind: request.objectKind,
        objectPerson: request.objectPerson,
        governor: request.governor,
        derivationalLevel: request.derivationalLevel,
      })),
    machineryAuthorizationStatus: machinery?.authorizationStatus || "blocked",
    finiteAuthorizationStatus: finite?.authorizationStatus || "blocked",
    formulaRealization: finite?.formulaRealization || "",
    wordRealization: finite?.wordRealization || "",
  };
}

function evaluateCausative(runtime, request, targetStem, voice = "active") {
  const activePreview = runtime.evaluateClassicalNahuatlVncApplication({
    ...request,
    requestedVoice: "active",
  });
  const option = activePreview?.controlFrame?.derivationOptionInventory
    ?.options?.find(candidate => candidate.targetStem === targetStem);
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

const SOURCE_SPECS = Object.freeze({
  ehco: ["ehcō", { verbClass: "A" }],
  tlehcō: ["tlehcō", { verbClass: "A" }],
  ono: ["on-o", { verbClass: "A" }],
  pano: ["panō", { verbClass: "A" }],
  choca: ["chōca", { verbClass: "A" }],
  quiza: ["quīza", { verbClass: "B" }],
  itqui: ["itqui", { verbClass: "A", sourceValence: "specific-projective", objectPerson: "3sg" }],
  ihtlani: ["ih-tlani", { sourceValence: "specific-projective", objectPerson: "3sg" }],
  nemi: ["nemi", {}],
  miqui: ["miqui", {}],
  notza: ["nōtza", { verbClass: "A", sourceValence: "specific-projective", objectPerson: "3sg" }],
  chihua: ["chīhua", { verbClass: "A", sourceValence: "projective-nonhuman" }],
  piya: ["piya", { verbClass: "B", sourceValence: "specific-projective", objectPerson: "3sg" }],
  mama: ["māmā", { verbClass: "D", sourceValence: "specific-projective", objectPerson: "3sg" }],
  cualani: ["cual-ā-ni", {}],
  tlapani: ["tlap-ā-ni", {}],
  xamani: ["xam-ā-ni", {}],
  patlani: ["patl-ā-ni", {}],
  tzayani: ["tzay-ā-ni", {}],
  tlatzini: ["tlatz-i-ni", {}],
  chipini: ["chip-ī-ni", {}],
  moyoni: ["mōy-ō-ni", {}],
  tzoyoni: ["tzoy-ō-ni", {}],
  poloni: ["pol-ō-ni", {}],
  tzoponi: ["tzop-ō-ni", {}],
  potoni: ["pot-ō-ni", {}],
  olini: ["ōl-i-ni", {}],
  tzotlani: ["tzotl-ā-ni", {}],
  cozahui: ["cōz-ā-hui", {}],
  peyoni: ["pey-ō-ni", {}],
  cueyoni: ["cuey-ō-ni", {}],
  queyoni: ["quey-ō-ni", {}],
  teini: ["te-ī-ni", {}],
  cuetlahui: ["cuetl-ā-hui", {}],
  caxahua: ["cax-ā-hua", { verbClass: "A" }],
  chamahua: ["cham-ā-hua", { verbClass: "A" }],
  huapahua: ["huap-ā-hua", { verbClass: "A" }],
  tlacuahua: ["tlacu-ā-hua", { verbClass: "A" }],
  patzahua: ["patz-ā-hua", { verbClass: "A" }],
  chipahua: ["chip-ā-hua", { verbClass: "A" }],
  chicahua: ["chic-ā-hua", { verbClass: "A" }],
  chiyahua: ["chiy-ā-hua", { verbClass: "A" }],
  pitzahua: ["pitz-ā-hua", { verbClass: "A" }],
  pinahua: ["pīn-ā-hua", { verbClass: "A" }],
  tomahua: ["tom-ā-hua", { verbClass: "A" }],
  zotlahua: ["zotl-ā-hua", { verbClass: "A" }],
  toxahua: ["tox-ā-hua", { verbClass: "A" }],
  petlahua: ["petl-ā-hua", { verbClass: "A" }],
  tetzahua: ["tetz-ā-hua", { verbClass: "A" }],
  petzihui: ["petz-i-hui", {}],
  patzihui: ["patz-i-hui", {}],
  ihtahui: ["iht-a-hui", {}],
  tzicahui: ["tzic-a-hui", {}],
  pixahui: ["pix-a-hui", {}],
  pilihui: ["pil-i-hui", {}],
  polihui: ["pol-i-hui", {}],
  nolihui: ["nol-i-hui", {}],
  colihui: ["cōl-i-hui", {}],
});

const DERIVATION_SPECS = Object.freeze({
  tomi: ["tomi", {}],
  temi: ["tēmi", {}],
  cocoya: ["coco-ya", {}],
  yocoya: ["yōco-ya", {}],
  ehua: ["ē-hua", { verbClass: "A" }],
  totoca: ["to-tō-ca", { verbClass: "A" }],
  huaqui: ["huā-qui", {}],
  zahui: ["zahui", {}],
  ilpi: ["ilpi", { verbClass: "A" }],
  chipini: ["chip-ī-ni", {}],
  tlapihui: ["tlap-ī-hui", {}],
  polihui: ["pol-i-hui", {}],
  tlalihui: ["tlal-i-hui", {}],
  pixahui: ["pix-a-hui", {}],
  tlapohui: ["tlap-o-hui", {}],
  pilca: ["pil-ca", { verbClass: "A" }],
  mini: ["mī-ni", {}],
  xini: ["xī-ni", {}],
  cehui: ["cē-hui", {}],
  pinahua: ["pīn-ā-hua", { verbClass: "A" }],
  neci: ["nēci", {}],
  cualani: ["cual-ā-ni", {}],
  cua: ["cuā", { verbClass: "D" }],
  itta: ["itt-a", { verbClass: "A" }],
  mahui: ["mahui", {}],
  quiza: ["quīza", {}],
  choca: ["chōca", { verbClass: "A" }],
  mati: ["mati", {}],
  matiProjective: ["mati", { sourceValence: "specific-projective", objectPerson: "3sg" }],
  caqui: ["caqui", { sourceValence: "specific-projective", objectPerson: "3sg" }],
  quemi: ["quēmi", { sourceValence: "specific-projective", objectPerson: "3sg" }],
  piya: ["piya", { sourceValence: "specific-projective", objectPerson: "3sg" }],
  nelti: ["nel-ti", { verbClass: "A" }],
  mazati: ["mazā-ti", {}],
  ahhuiaya: ["ahhuiā-ya", {}],
  ceceya: ["ce-ce-ya", {}],
  tzacua: ["tzacu-a", { sourceValence: "specific-projective", objectPerson: "3sg" }],
  ihza: ["ihza", { verbClass: "A" }],
  imacaci: ["īmacaci", { sourceValence: "specific-projective", objectPerson: "3sg" }],
  ixtlahua: ["ix-tlā-hu-a", { sourceValence: "specific-projective", objectPerson: "3sg" }],
  itzti: ["itz-ti", { verbClass: "A" }],
  temo: ["temō", { verbClass: "A" }],
  tlehcō: ["tlehcō", { verbClass: "A" }],
  pano: ["panō", { verbClass: "A" }],
  yauh: ["ya-uh", {}],
  huallauh: ["huāl-la-uh", {}],
});

function buildProjection(runtime) {
  const sources = Object.fromEntries(Object.entries(SOURCE_SPECS)
    .map(([key, [stem, options]]) => [
      key,
      compactSource(runtime, stem, options),
    ]));
  const derivations = Object.fromEntries(Object.entries(DERIVATION_SPECS)
    .map(([key, [stem, options]]) => [
      key,
      compactDerivation(runtime, stem, options),
    ]));

  const typeOneSpecific = derive(runtime, "tomi", "tom-a", {
    targetSubject: "1sg",
  });
  const typeOneReflexive = derive(runtime, "tomi", "tom-a", {
    sourceSubject: "1sg",
    targetSubject: "1sg",
    causativeObjectKind: "reflexive",
  });
  const typeOneNonspecific = deriveFromIntransitiveImpersonal(
    runtime,
    "tomi",
    "tom-a",
  );
  const typeTwoSpecific = derive(runtime, "tomi", "tom-tiā", {
    targetSubject: "1sg",
  });
  const typeTwoReflexive = derive(runtime, "tomi", "tom-tiā", {
    sourceSubject: "1sg",
    targetSubject: "1sg",
    causativeObjectKind: "reflexive",
  });
  const typeTwoNonspecific = deriveFromIntransitiveImpersonal(
    runtime,
    "tomi",
    "tom-tiā",
  );
  const doubleSpecific = derive(runtime, "caqui", "caquī-tiā", {
    sourceValence: "specific-projective",
    sourceSubject: "2sg",
    objectPerson: "3sg",
    targetSubject: "1sg",
  });
  const recursiveInventory = runtime.getClassicalNahuatlVncDerivationOptionInventory(
    doubleSpecific.machinery,
    { derivationType: "causative" },
  );
  const recursiveOption = (recursiveInventory?.options || [])
    .find(option => option.targetStem === "caqui-ti-l-tiā");
  const recursiveOperation = runtime.deriveClassicalNahuatlVncDerivationOperationFrame(
    doubleSpecific.machinery,
    {
      derivationType: "causative",
      optionId: recursiveOption?.optionId || "missing-canonical-option",
      targetSubject: "3sg",
      causativeObjectKind: "specific-projective",
    },
  );
  const recursiveMachinery = runtime.buildClassicalNahuatlDerivedVncMachineryFrame(
    doubleSpecific.machinery,
    recursiveOperation,
    { targetSubject: "3sg", mood: "indicative", tense: "present" },
  );
  const recursiveFinite = runtime.buildClassicalNahuatlVncFiniteSurfaceFrame(
    recursiveMachinery,
  );

  const moodWish = evaluateCausative(runtime, {
    sourceStem: "chīhua",
    verbClass: "A",
    sourceValence: "projective-nonhuman",
    sourceSubject: "3sg",
    subject: "1sg",
    mood: "optative",
    tense: "nonpast",
    requestedDerivation: "causative",
    causativeObjectKind: "specific-projective",
    sentenceOptions: {
      sentenceType: "wish-sentence",
      introductoryParticle: "ma",
    },
  }, "chīhua-l-tiā");
  const passive = evaluateCausative(runtime, {
    sourceStem: "nōtza",
    verbClass: "A",
    sourceValence: "specific-projective",
    sourceSubject: "2sg",
    objectKind: "specific-projective",
    objectPerson: "3pl",
    subject: "1pl",
    mood: "indicative",
    tense: "present",
    requestedDerivation: "causative",
    causativeObjectKind: "specific-projective",
  }, "nōtza-l-tiā", "passive");
  const supplementation =
    runtime.buildClassicalNahuatlSupplementationValidationFrame();
  const nonactiveVoiceObject =
    runtime.buildClassicalNahuatlNonactiveVoiceObjectValidationFrame();

  const statusValues = [
    ...Object.values(sources).map(frame => frame.authorizationStatus),
    ...Object.values(derivations).map(frame => frame.authorizationStatus),
    typeOneSpecific.compact.authorizationStatus,
    typeOneReflexive.compact.authorizationStatus,
    typeOneNonspecific.authorizationStatus,
    typeTwoSpecific.compact.authorizationStatus,
    typeTwoReflexive.compact.authorizationStatus,
    typeTwoNonspecific.authorizationStatus,
    doubleSpecific.compact.authorizationStatus,
    recursiveOperation?.authorizationStatus,
    recursiveMachinery?.authorizationStatus,
    recursiveFinite?.authorizationStatus,
    moodWish.authorizationStatus,
    passive.authorizationStatus,
    supplementation?.authorizationStatus,
    nonactiveVoiceObject?.authorizationStatus,
  ];

  return deepFreeze({
    kind: "classical-nahuatl-vnc-derivation-validation-frame",
    authorizationStatus: statusValues.every(status => status === "authorized")
      ? "authorized" : "blocked",
    blockReason: statusValues.every(status => status === "authorized")
      ? "" : "classical-vnc-derivation-validation-coordinate-blocked",
    typedFrameAuthority: true,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
    storedExampleAuthority: false,
    curriculumMetadataAuthority: false,
    contract: {
      gcd: {
        identityId: CLASSICAL_NAHUATL_LESSONS23_26_GCD.identityId,
        stageOrder: [...CLASSICAL_NAHUATL_LESSONS23_26_GCD.stageOrder],
        smallestSharedInvariant:
          CLASSICAL_NAHUATL_LESSONS23_26_GCD.smallestSharedInvariant,
      },
      axes: CLASSICAL_NAHUATL_LESSONS23_26_LCM.axes
        .filter(axis => axis.axisId.startsWith("lesson24-")
          || axis.axisId.startsWith("lesson25-"))
        .map(axis => ({
          axisId: axis.axisId,
          distinctionKind: axis.distinctionKind,
          prerequisite: axis.prerequisite,
          semanticFactRole: axis.semanticFactRole,
          ownerCapabilities: [...axis.ownerCapabilities],
        })),
    },
    sources,
    derivations,
    participants: {
      typeOneSpecific: typeOneSpecific.compact,
      typeOneReflexive: typeOneReflexive.compact,
      typeOneNonspecific,
      typeTwoSpecific: typeTwoSpecific.compact,
      typeTwoReflexive: typeTwoReflexive.compact,
      typeTwoNonspecific,
      doubleSpecific: doubleSpecific.compact,
      tripleSpecific: {
        authorizationStatus: recursiveOperation?.authorizationStatus || "blocked",
        targetStem: recursiveOperation?.targetStem || "",
        targetObjectRequests: (recursiveOperation?.targetObjectRequests || [])
          .map(request => ({
            objectId: request.objectId,
            objectKind: request.objectKind,
            objectPerson: request.objectPerson,
            governor: request.governor,
            derivationalLevel: request.derivationalLevel,
          })),
        machineryAuthorizationStatus:
          recursiveMachinery?.authorizationStatus || "blocked",
        finiteAuthorizationStatus:
          recursiveFinite?.authorizationStatus || "blocked",
        formulaRealization: recursiveFinite?.formulaRealization || "",
        wordRealization: recursiveFinite?.wordRealization || "",
      },
      objectCombinationCount:
        nonactiveVoiceObject?.objectHistory?.combinationCount || 0,
      maximumLicensedObjectCount:
        nonactiveVoiceObject?.objectHistory?.maximumLicensedObjectCount || 0,
      specificSilencing:
        nonactiveVoiceObject?.objectHistory?.twoSpecific?.positions?.[1]
          ?.silencingRule || "",
      fixedOrderingRules: [
        ...(nonactiveVoiceObject?.objectHistory?.twoSpecific
          ?.orderingRules || []),
      ],
      objectCombinations: [
        ...(nonactiveVoiceObject?.objectHistory?.combinations || []),
      ],
    },
    interactions: {
      moodWish,
      passive,
      silentObjectSupplement: {
        authorizationStatus:
          supplementation?.ayi?.authorizationStatus || "blocked",
        headRole:
          supplementation?.ayi?.referenceFrame?.headRole || "",
        principalHeadSilent:
          supplementation?.ayi?.referenceFrame?.principalHead?.silent === true,
        silentlyPresentCarrier:
          supplementation?.extractedFrames?.ayi?.realization || "",
        silentSpecificObjectAuthorized:
          supplementation?.ayi?.principalClause
            ?.silentSpecificObjectAuthorized === true,
        operationKind:
          supplementation?.extractedFrames?.ayi?.kind || "",
      },
    },
  });
}

export function createClassicalVncDerivationValidationSemanticOperationsApi(
  targetObject = globalThis,
) {
  const issuedFrames = new WeakSet();
  let cachedProjection = null;

  function buildClassicalNahuatlVncDerivationValidationFrame() {
    if (!cachedProjection) {
      cachedProjection = buildProjection(targetObject);
      if (cachedProjection.authorizationStatus === "authorized") {
        issuedFrames.add(cachedProjection);
      }
    }
    return cachedProjection;
  }

  function isClassicalNahuatlVncDerivationValidationFrame(frame = null) {
    return Boolean(
      frame
      && issuedFrames.has(frame)
      && frame.kind
        === "classical-nahuatl-vnc-derivation-validation-frame"
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
    buildClassicalNahuatlVncDerivationValidationFrame,
    isClassicalNahuatlVncDerivationValidationFrame,
  });
}
