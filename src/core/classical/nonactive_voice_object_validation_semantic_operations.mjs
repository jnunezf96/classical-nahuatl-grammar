// Non-authorizing validation projection for the independently owned
// nonactive, voice, impersonal, and object-history semantics. This module owns
// no Inventory atoms and defines no grammar. It selects typed coordinates,
// invokes the installed canonical runtime, and retains only runtime-emitted
// facts. Canvas examples, stored answers, formulas, and lesson coordinates are
// never inputs to a grammar decision.

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

function compactInventory(inventory = null) {
  return {
    authorizationStatus: inventory?.authorizationStatus || "blocked",
    blockReason: inventory?.blockReason || "",
    sourceStem: inventory?.sourceStem || "",
    verbClass: inventory?.verbClass || "",
    sourceValence: inventory?.sourceValence || "",
    formationCores: [...(inventory?.formationCores || [])],
    formationCoreAuthority: inventory?.formationCoreAuthority || "",
    selectorRequired: inventory?.selectorRequired === true,
    selectionRequired: inventory?.selectionRequired === true,
    alternativeSelectionPolicy: inventory?.alternativeSelectionPolicy || "",
    userSuppliedDerivedStemAllowed:
      inventory?.userSuppliedDerivedStemAllowed === true,
    options: (inventory?.options || []).map(option => ({
      optionId: option.optionId || "",
      nonactiveStem: option.nonactiveStem || "",
      suffixFamily: option.suffixFamily || "",
      ruleId: option.ruleId || "",
      formationAuthority: option.formationAuthority || "",
      formationCore: option.formationCore || "",
      formationContinuation: option.formationContinuation || "",
      formationSequence: [...(option.formationSequence || [])],
      surfaceAllomorph: option.formationStructure?.surfaceAllomorph || "",
      targetClass: option.targetClass || "",
      imperfectiveNonactiveStem: option.imperfectiveNonactiveStem || "",
      perfectiveNonactiveStem: option.perfectiveNonactiveStem || "",
      optionRole: option.optionRole || "",
      optionalForUser: option.optionalForUser === true,
      candidateSource: option.candidateSource || "",
      decisionCategory: option.decisionCategory || "",
      finalVowelLength:
        option.nonactiveFinalShapeFrame?.finalVowelLength || "",
      replacementShape: option.finalShapeRelation?.replacementShape || "",
      sourceInternalMorphology: {
        explicitRootPlusYaBoundary:
          option.sourceInternalMorphology?.explicitRootPlusYaBoundary === true,
        rootPlusYaAnalysisAuthorized:
          option.sourceInternalMorphology?.rootPlusYaAnalysisAuthorized === true,
      },
      callerSuppliedShapeAllowed:
        option.finalShapeRelation?.callerSuppliedShapeAllowed === true,
      formulaAuthority: false,
      surfaceAuthority: false,
    })),
  };
}

function compactNonactiveRecord(record = null) {
  return {
    authorizationStatus: record?.authorizationStatus || "blocked",
    blockReason: record?.blockReason || "",
    sourceStem: record?.sourceStem || "",
    nonactiveStem: record?.nonactiveStem || "",
    suffixFamily: record?.suffixFamily || "",
    targetClass: record?.targetClass || "",
    imperfectiveNonactiveStem: record?.imperfectiveNonactiveStem || "",
    perfectiveNonactiveStem: record?.perfectiveNonactiveStem || "",
    formationCore: record?.formationCore || "",
    formationContinuation: record?.formationContinuation || "",
    formationSequence: [...(record?.formationSequence || [])],
    sourceIsImperfectiveActiveStem:
      record?.sourceIsImperfectiveActiveStem === true,
    selectionAuthority: record?.selectionAuthority || "",
    formulaArtifactAuthority: record?.formulaArtifactAuthority === true,
    surfaceArtifactAuthority: record?.surfaceArtifactAuthority === true,
  };
}

function compactDerived(frame = null) {
  const transformation = frame?.voiceTransformationFrame || {};
  const cluster = frame?.multipleObjectClusterFrame || null;
  return {
    authorizationStatus: frame?.authorizationStatus || "blocked",
    blockReason: frame?.blockReason || "",
    voice: frame?.voice || "",
    stem: frame?.stem || "",
    subject: frame?.subject || "",
    valence: frame?.valence || "",
    nonactiveTargetClass: frame?.nonactiveTargetClass || "",
    selectedNonactiveAspect: frame?.selectedNonactiveAspect || "",
    formulaRealization: frame?.formulaRealization || "",
    sourceStem: transformation.sourceStem || "",
    targetStem: transformation.targetStem || "",
    sourceSubject: transformation.sourceSubject || "",
    sourceSubjectDeleted: transformation.sourceSubjectDeleted === true,
    sourceValence: transformation.sourceValence || "",
    targetValence: transformation.targetValence || "",
    targetSubject: transformation.targetSubject || "",
    promotedObjectBecomesSubject:
      transformation.promotedObjectBecomesSubject === true,
    impersonalSubjectImportedFromOutsideSource:
      transformation.impersonalSubjectImportedFromOutsideSource === true,
    impersonalSubjectReferent:
      transformation.impersonalSubjectReferent || "",
    agentExpressible: transformation.agentExpressible === true,
    retainedObjectCarriers: [
      ...(transformation.retainedObjectCarriers || []),
    ],
    objectPositionCount: cluster?.positionCount || 0,
    objectCarriers: [...(cluster?.retainedCarriers || cluster?.linearCarriers || [])],
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  };
}

function compactApplication(application = null) {
  const machinery = application?.resultFrame?.selectedMachineryFrame || null;
  return {
    authorizationStatus: application?.authorizationStatus || "blocked",
    blockReason: application?.blockReason || "",
    selectedVoice: application?.resultFrame?.selectedVoice || "",
    formulaRealization: application?.resultFrame?.formulaRealization || "",
    derived: compactDerived(machinery),
  };
}

function compactObjectCluster(frame = null) {
  return {
    authorizationStatus: frame?.authorizationStatus || "blocked",
    blockReason: frame?.blockReason || "",
    sourceStem: frame?.sourceStem || "",
    subject: frame?.subject || "",
    tense: frame?.tense || "",
    positionCount: frame?.positionCount || 0,
    valenceArity: frame?.valenceArity || "",
    derivationalLevelsContiguous:
      frame?.derivationalLevelsContiguous === true,
    directiveHistoryAuthorized: frame?.directiveHistoryAuthorized === true,
    soundedSpecificObjectId: frame?.soundedSpecificObjectId || "",
    linearOrder: [...(frame?.linearOrder || [])],
    linearCarriers: [...(frame?.linearCarriers || [])],
    orderingRules: [...(frame?.orderingRules || [])],
    positions: (frame?.positions || []).map(position => ({
      objectId: position.objectId || "",
      objectKind: position.objectKind || "",
      objectPerson: position.objectPerson || "",
      governor: position.governor || "",
      derivationalLevel: position.derivationalLevel || 0,
      prominence: position.prominence || "",
      valenceArity: position.valenceArity || "",
      carrier: position.carrier || "",
      sounded: position.sounded === true,
      silencingRule: position.silencingRule || "",
      governorUnit: {
        authorizationStatus:
          position.governorUnitFrame?.authorizationStatus || "blocked",
        objectFunction:
          position.governorUnitFrame?.objectFunction || "",
        governor: position.governorUnitFrame?.governor || "",
        requiredStemOperation:
          position.governorUnitFrame?.requiredStemOperation || "",
        discontinuousUnit:
          position.governorUnitFrame?.discontinuousUnit === true,
        callerSuppliedGovernorAllowed:
          position.governorUnitFrame?.callerSuppliedGovernorAllowed === true,
      },
    })),
    numberDyadOverride: frame?.numberDyadOverride
      ? { ...frame.numberDyadOverride }
      : null,
    formulaArtifactAuthority: frame?.formulaArtifactAuthority === true,
    surfaceArtifactAuthority: frame?.surfaceArtifactAuthority === true,
  };
}

function inventory(runtime, stem, verbClass, sourceValence) {
  return compactInventory(runtime.getClassicalNahuatlNonactiveStemOptions(
    stem,
    { verbClass, sourceValence },
  ));
}

function active(runtime, stem, {
  subject = "3sg",
  mood = "indicative",
  tense = "present",
  verbClass = "A",
  valence = "intransitive",
  objectPerson = "",
} = {}) {
  const objectKind = ({
    "projective-human": "nonspecific-human",
    "projective-nonhuman": "nonspecific-nonhuman",
  })[valence] || (valence === "intransitive" ? "" : valence);
  return runtime.buildClassicalNahuatlVerbstemClassFrame(stem, {
    subject,
    mood,
    tense,
    verbClass,
    perfectiveClass: verbClass,
    valence,
    transitivity: valence === "intransitive" ? "intransitive" : "transitive",
    objectKind,
    objectPerson,
  });
}

function derived(runtime, stem, {
  voice,
  sourceSubject = "3sg",
  sourceValence = "intransitive",
  objectPerson = "",
  verbClass = "A",
  mood = "indicative",
  tense = "present",
  optionId = "",
} = {}) {
  const source = active(runtime, stem, {
    subject: sourceSubject,
    mood,
    tense,
    verbClass,
    valence: sourceValence,
    objectPerson,
  });
  const nonactiveStemRecord = runtime.deriveClassicalNahuatlNonactiveStemRecord(
    stem,
    { verbClass, sourceValence, ...(optionId ? { optionId } : {}) },
  );
  return runtime.buildClassicalNahuatlDerivedVncFrame(source, {
    voice,
    nonactiveStemRecord,
    sourceValence,
    sourceSubject,
    sourceObjectPerson: objectPerson,
    mood,
    tense,
    verbClass,
  });
}

function objectCluster(runtime, requests, {
  sourceStem = "pāca-l-tiā",
  subject = "3sg",
  tense = "present",
} = {}) {
  return runtime.buildClassicalNahuatlObjectClusterFrame(sourceStem, {
    subject,
    subjectCarrier: subject === "1sg" ? "ni" : "0",
    predicateStem: sourceStem,
    tense,
    objectRequests: requests,
    minimumPositionCount: requests.length,
    maximumPositionCount: requests.length,
  });
}

const COMBINATION_KINDS = Object.freeze([
  ["nonspecific-nonhuman", "nonspecific-nonhuman", "nonspecific-nonhuman"],
  ["nonspecific-human", "nonspecific-nonhuman", "nonspecific-nonhuman"],
  ["reflexive", "nonspecific-nonhuman", "nonspecific-nonhuman"],
  ["nonspecific-human", "nonspecific-human", "nonspecific-nonhuman"],
  ["reflexive", "nonspecific-human", "nonspecific-nonhuman"],
  ["specific-projective", "reflexive", "nonspecific-nonhuman"],
  ["nonspecific-human", "nonspecific-human", "nonspecific-human"],
  ["reflexive", "nonspecific-human", "nonspecific-human"],
  ["specific-projective", "reflexive", "nonspecific-human"],
  ["specific-projective", "specific-projective", "nonspecific-nonhuman"],
  ["specific-projective", "specific-projective", "nonspecific-human"],
  ["specific-projective", "specific-projective", "reflexive"],
  ["specific-projective", "specific-projective", "specific-projective"],
]);

function combinationFrame(runtime, kinds, rowIndex) {
  const reflexiveIndex = kinds.indexOf("reflexive");
  const specificIndex = kinds.indexOf("specific-projective");
  const mainlineIndex = reflexiveIndex >= 0
    ? reflexiveIndex
    : specificIndex >= 0 ? specificIndex : kinds.length - 1;
  const remainingLevels = [1, 2];
  return objectCluster(runtime, kinds.map((objectKind, index) => {
    const derivationalLevel = index === mainlineIndex
      ? 3
      : remainingLevels.shift();
    return {
      objectId: `combination-${rowIndex + 1}-${index + 1}`,
      objectKind,
      objectPerson: ["specific-projective", "reflexive"].includes(objectKind)
        ? "3sg" : "",
      governor: derivationalLevel === 1
        ? "directive"
        : derivationalLevel === 2 ? "causative" : "applicative",
      derivationalLevel,
    };
  }), { sourceStem: "combination-proof" });
}

function buildProjection(runtime) {
  const grammarContract = runtime.buildClassicalNahuatlGrammarContract();
  const records = {
    lo: runtime.deriveClassicalNahuatlNonactiveStemRecord("mayāna", {
      verbClass: "B", sourceValence: "intransitive",
    }),
    lohua: runtime.deriveClassicalNahuatlNonactiveStemRecord("ye", {
      verbClass: "A", sourceValence: "intransitive",
    }),
    o: runtime.deriveClassicalNahuatlNonactiveStemRecord("āna", {
      verbClass: "B", sourceValence: "specific-projective",
      optionId: "ō:ān-ō",
    }),
    ohua: runtime.deriveClassicalNahuatlNonactiveStemRecord("miqui", {
      verbClass: "B", sourceValence: "intransitive",
    }),
    hua: runtime.deriveClassicalNahuatlNonactiveStemRecord("cochi", {
      verbClass: "B", sourceValence: "intransitive",
    }),
    hualo: runtime.deriveClassicalNahuatlNonactiveStemRecord("cui", {
      verbClass: "B", sourceValence: "specific-projective",
      optionId: "hua-lō:cui-hua-lō",
    }),
  };
  const passiveSingle = derived(runtime, "chihua", {
    voice: "passive", sourceSubject: "2pl",
    sourceValence: "specific-projective", objectPerson: "1sg",
    verbClass: "A",
  });
  const impersonalIntransitive = derived(runtime, "mayāna", {
    voice: "impersonal", sourceSubject: "3pl",
    sourceValence: "intransitive", verbClass: "B",
  });
  const impersonalNonspecific = derived(runtime, "tla-zo-h-tla", {
    voice: "impersonal", sourceSubject: "3pl",
    sourceValence: "projective-human", verbClass: "A",
    optionId: "lō:tla-zo-h-tla-lō",
  });
  const reflexivePassive = derived(runtime, "zahua", {
    voice: "passive", sourceSubject: "1sg",
    sourceValence: "mainline-reflexive", verbClass: "A",
  });
  const reflexiveImpersonal = derived(runtime, "zahua", {
    voice: "impersonal", sourceSubject: "1sg",
    sourceValence: "mainline-reflexive", verbClass: "A",
  });
  const inherentRecord = runtime.buildClassicalNahuatlInherentImpersonalRecord(
    "yohua", { selectionAuthority: "andrews-lesson22-voice-selection" },
  );
  const inherentSource = active(runtime, "yohua", {
    subject: "1sg", verbClass: "A", valence: "intransitive",
  });
  const inherentFrame = runtime.buildClassicalNahuatlDerivedVncFrame(
    inherentSource,
    {
      voice: "inherent-impersonal",
      inherentImpersonalRecord: inherentRecord,
      sourceValence: "intransitive",
      sourceSubject: "1sg",
      verbClass: "A",
    },
  );
  const tlaRecord = runtime.buildClassicalNahuatlTlaImpersonalStemRecord(
    "nēci", { selectionAuthority: "andrews-lesson22-rule-derivation" },
  );
  const tlaSource = active(runtime, "nēci", {
    subject: "2pl", verbClass: "B", valence: "intransitive",
  });
  const tlaFrame = runtime.buildClassicalNahuatlDerivedVncFrame(tlaSource, {
    voice: "tla-impersonal",
    tlaImpersonalStemRecord: tlaRecord,
    sourceValence: "intransitive",
    sourceSubject: "2pl",
    verbClass: "B",
  });

  const twoSpecificRequests = [
    { objectId: "direct", objectKind: "specific-projective", objectPerson: "3sg", governor: "directive", derivationalLevel: 1 },
    { objectId: "caused", objectKind: "specific-projective", objectPerson: "2sg", governor: "causative", derivationalLevel: 2 },
  ];
  const specificHumanRequests = [
    { objectId: "direct", objectKind: "specific-projective", objectPerson: "3sg", governor: "directive", derivationalLevel: 1 },
    { objectId: "applied-human", objectKind: "nonspecific-human", objectPerson: "", governor: "applicative", derivationalLevel: 2 },
  ];
  const reflexiveNonspecificRequests = [
    { objectId: "direct-nonhuman", objectKind: "nonspecific-nonhuman", objectPerson: "", governor: "directive", derivationalLevel: 1 },
    { objectId: "caused-human", objectKind: "nonspecific-human", objectPerson: "", governor: "causative", derivationalLevel: 2 },
    { objectId: "applied-reflexive", objectKind: "reflexive", objectPerson: "3sg", governor: "applicative", derivationalLevel: 3 },
  ];
  const twoSpecific = objectCluster(runtime, twoSpecificRequests, {
    sourceStem: "maca", tense: "future",
  });
  const specificHuman = objectCluster(runtime, specificHumanRequests, {
    sourceStem: "maca", tense: "future",
  });
  const reflexiveNonspecific = objectCluster(
    runtime,
    reflexiveNonspecificRequests,
    { sourceStem: "pāca-l-tiā" },
  );
  const twoSpecificApplication = runtime.evaluateClassicalNahuatlVncApplication({
    sourceStem: "maca",
    verbClass: "A",
    sourceValence: "multiple-object",
    subject: "3sg",
    mood: "indicative",
    tense: "future",
    requestedDerivation: "direct",
    requestedVoice: "passive",
    objectRequests: twoSpecificRequests,
  });
  const specificHumanApplication = runtime.evaluateClassicalNahuatlVncApplication({
    sourceStem: "maca",
    verbClass: "A",
    sourceValence: "multiple-object",
    subject: "3sg",
    mood: "indicative",
    tense: "future",
    requestedDerivation: "direct",
    requestedVoice: "passive",
    objectRequests: specificHumanRequests,
  });
  const threeSpecificRequests = [
    { objectId: "direct", objectKind: "specific-projective", objectPerson: "3sg", governor: "directive", derivationalLevel: 1 },
    { objectId: "caused", objectKind: "specific-projective", objectPerson: "2sg", governor: "causative", derivationalLevel: 2 },
    { objectId: "applied", objectKind: "specific-projective", objectPerson: "1sg", governor: "applicative", derivationalLevel: 3 },
  ];
  const threeSpecificApplication = runtime.evaluateClassicalNahuatlVncApplication({
    sourceStem: "maca",
    verbClass: "A",
    sourceValence: "multiple-object",
    subject: "3sg",
    mood: "indicative",
    tense: "future",
    requestedDerivation: "direct",
    requestedVoice: "passive",
    objectRequests: threeSpecificRequests,
  });
  const combinations = COMBINATION_KINDS.map((kinds, index) =>
    compactObjectCluster(combinationFrame(runtime, kinds, index)));
  const l23Axes = CLASSICAL_NAHUATL_LESSONS23_26_LCM.axes
    .filter(axis => axis.axisId.startsWith("lesson23-"))
    .map(axis => ({
      axisId: axis.axisId,
      distinctionKind: axis.distinctionKind,
      prerequisite: axis.prerequisite,
      semanticFactRole: axis.semanticFactRole,
      ownerCapabilities: [...axis.ownerCapabilities],
    }));

  const projection = deepFreeze({
    kind: "classical-nahuatl-nonactive-voice-object-validation-frame",
    authorizationStatus: [
      grammarContract.authorizationStatus,
      ...Object.values(records).map(record => record.authorizationStatus),
      passiveSingle.authorizationStatus,
      impersonalIntransitive.authorizationStatus,
      impersonalNonspecific.authorizationStatus,
      reflexivePassive.authorizationStatus,
      reflexiveImpersonal.authorizationStatus,
      inherentFrame.authorizationStatus,
      tlaFrame.authorizationStatus,
      twoSpecific.authorizationStatus,
      specificHuman.authorizationStatus,
      reflexiveNonspecific.authorizationStatus,
      twoSpecificApplication.authorizationStatus,
      specificHumanApplication.authorizationStatus,
      threeSpecificApplication.authorizationStatus,
      ...combinations.map(frame => frame.authorizationStatus),
    ].every(status => status === "authorized") ? "authorized" : "blocked",
    blockReason: "",
    typedFrameAuthority: true,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
    storedExampleAuthority: false,
    curriculumMetadataAuthority: false,
    contract: {
      gcd: { ...grammarContract.greatestCommonDivisor },
      formationCores: [
        ...grammarContract.leastCommonMultiple.nonactiveFormationCoreInventory,
      ],
      continuations: [
        ...grammarContract.leastCommonMultiple.nonactiveContinuationInventory,
      ],
      sourceClasses: [
        ...grammarContract.leastCommonMultiple.sourceClassInventory,
      ],
      nonactiveClasses: [
        ...grammarContract.leastCommonMultiple.nonactiveClassInventory,
      ],
      voiceOperations: [
        ...grammarContract.leastCommonMultiple.voiceOperationInventory,
      ],
      objectCounts: [
        ...grammarContract.leastCommonMultiple.objectCountInventory,
      ],
      restrictions: [...grammarContract.leastCommonMultiple.restrictions],
      interactions: [...grammarContract.leastCommonMultiple.interactions],
      exceptionFamilies: [
        ...grammarContract.leastCommonMultiple.exceptionFamilies,
      ],
      optionSelectionPolicy:
        grammarContract.leastCommonMultiple.optionSelectionPolicy,
      paradigmPolicy: grammarContract.leastCommonMultiple.paradigmPolicy,
      callerSuppliedAuthorityAccepted:
        grammarContract.callerSuppliedAuthorityAccepted,
    },
    nonactive: {
      loClassA: inventory(runtime, "chihua", "A", "specific-projective"),
      loClassB: inventory(runtime, "nequi-ya", "B", "intransitive"),
      loClassC: inventory(runtime, "chihua-l-tiā", "C", "specific-projective"),
      loClassD: inventory(runtime, "cua", "D", "intransitive"),
      lohua: inventory(runtime, "ye", "A", "intransitive"),
      oCaQui: inventory(runtime, "caqui", "B", "specific-projective"),
      oNaNi: inventory(runtime, "āna", "B", "specific-projective"),
      oZa: inventory(runtime, "pasa", "B", "specific-projective"),
      oCi: inventory(runtime, "ahci", "A", "intransitive"),
      oCui: inventory(runtime, "xocui", "B", "specific-projective"),
      oTa: inventory(runtime, "patata", "B", "specific-projective"),
      oTi: inventory(runtime, "meloti", "B", "specific-projective"),
      intransitiveTi: inventory(runtime, "pa-ti", "B", "intransitive"),
      ohua: inventory(runtime, "miqui", "B", "intransitive"),
      ohuaLexical: inventory(runtime, "aqui", "B", "intransitive"),
      ohuaAlternative: inventory(runtime, "zō", "A", "mainline-reflexive"),
      hua: inventory(runtime, "cochi", "B", "intransitive"),
      huaLexical: inventory(runtime, "ihcali", "B", "specific-projective"),
      hualo: inventory(runtime, "cui", "B", "specific-projective"),
      records: Object.fromEntries(Object.entries(records).map(([key, record]) =>
        [key, compactNonactiveRecord(record)])),
      finitePresent: compactDerived(passiveSingle),
      finiteFuture: compactDerived(derived(runtime, "chihua", {
        voice: "passive", sourceSubject: "3sg",
        sourceValence: "specific-projective", objectPerson: "1sg",
        verbClass: "A", tense: "future",
      })),
    },
    voice: {
      passiveSingle: compactDerived(passiveSingle),
      impersonalIntransitive: compactDerived(impersonalIntransitive),
      impersonalNonspecific: compactDerived(impersonalNonspecific),
      reflexivePassive: compactDerived(reflexivePassive),
      reflexiveImpersonal: compactDerived(reflexiveImpersonal),
      twoSpecificPassive: compactApplication(twoSpecificApplication),
      specificHumanPassive: compactApplication(specificHumanApplication),
      threeSpecificPassive: compactApplication(threeSpecificApplication),
    },
    impersonal: {
      inherentRecord: {
        authorizationStatus: inherentRecord.authorizationStatus,
        sourceStem: inherentRecord.sourceStem,
        inherentImpersonalStem: inherentRecord.inherentImpersonalStem,
        semanticClass: inherentRecord.sourceAnalysis?.semanticClass || "",
        selectionAuthority: inherentRecord.selectionAuthority,
      },
      inherent: compactDerived(inherentFrame),
      tlaRecord: {
        authorizationStatus: tlaRecord.authorizationStatus,
        sourceStem: tlaRecord.sourceStem,
        impersonalStem: tlaRecord.impersonalStem,
        realizationRuleId: tlaRecord.realizationRuleId,
        semanticClass: tlaRecord.sourceAnalysis?.semanticClass || "",
        targetDerivedByEngine:
          tlaRecord.sourceAnalysis?.targetDerivedByEngine === true,
        callerSuppliedTargetAuthority:
          tlaRecord.callerSuppliedTargetAuthority === true,
      },
      tla: compactDerived(tlaFrame),
      inherentInventory: ["tōna", "quiy-a-hui", "te-c-i-hui", "āy-a-hui", "yohua"]
        .map(sourceStem => runtime.getClassicalNahuatlInherentImpersonalSourceAnalysis(sourceStem))
        .map(analysis => ({
          authorizationStatus: analysis.authorizationStatus,
          sourceStem: analysis.canonicalSourceStem,
          semanticClass: analysis.semanticClass,
        })),
      tlaInventory: [
        "huā-qui", "pol-i-hui", "cel-i-ya", "ihyā-ya", "cah-ca-h",
        "on-o", "chic-ā-hua", "huē-i-ya", "it-hui", "petl-ā-ni",
        "tlatz-i-ni", "poy-ā-hua", "nēci", "ce-ce-ya", "yohua",
        "ih-cahu-a-ca", "cue-cuech-ca", "izta-ya",
      ].map(sourceStem => runtime.getClassicalNahuatlTlaImpersonalSourceAnalysis(sourceStem))
        .map(analysis => ({
          authorizationStatus: analysis.authorizationStatus,
          sourceStem: analysis.canonicalSourceStem,
          derivedTargetStem: analysis.derivedTargetStem,
          realizationRuleId: analysis.realizationRuleId,
          semanticClass: analysis.semanticClass,
          targetDerivedByEngine: analysis.targetDerivedByEngine === true,
        })),
    },
    objectHistory: {
      gcd: {
        identityId: CLASSICAL_NAHUATL_LESSONS23_26_GCD.identityId,
        stageOrder: [...CLASSICAL_NAHUATL_LESSONS23_26_GCD.stageOrder],
      },
      axes: l23Axes,
      twoSpecific: compactObjectCluster(twoSpecific),
      specificHuman: compactObjectCluster(specificHuman),
      reflexiveNonspecific: compactObjectCluster(reflexiveNonspecific),
      twoSpecificPassive: compactApplication(twoSpecificApplication),
      specificHumanPassive: compactApplication(specificHumanApplication),
      threeSpecificPassive: compactApplication(threeSpecificApplication),
      combinations,
      combinationCount: combinations.length,
      everyCombinationAuthorized: combinations.every(frame =>
        frame.authorizationStatus === "authorized"),
      maximumLicensedObjectCount:
        grammarContract.leastCommonMultiple.objectCountInventory.at(-1),
    },
  });
  return projection;
}

export function createClassicalNonactiveVoiceObjectValidationSemanticOperationsApi(
  targetObject = globalThis,
) {
  const issuedFrames = new WeakSet();
  let cachedProjection = null;

  function buildClassicalNahuatlNonactiveVoiceObjectValidationFrame() {
    if (!cachedProjection) {
      cachedProjection = buildProjection(targetObject);
      if (cachedProjection.authorizationStatus === "authorized") {
        issuedFrames.add(cachedProjection);
      }
    }
    return cachedProjection;
  }

  function isClassicalNahuatlNonactiveVoiceObjectValidationFrame(frame = null) {
    return Boolean(
      frame
      && issuedFrames.has(frame)
      && frame.kind
        === "classical-nahuatl-nonactive-voice-object-validation-frame"
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
    buildClassicalNahuatlNonactiveVoiceObjectValidationFrame,
    isClassicalNahuatlNonactiveVoiceObjectValidationFrame,
  });
}
