// Non-authorizing live validation projection for independently owned
// deverbal-action and patientive semantics. This module owns no Inventory atom
// and stores no Canvas answer. Every positive result and every rejection below
// is emitted by the installed canonical typed runtime.

function deepFreeze(value, seen = new WeakSet()) {
  if (!value || typeof value !== "object" || seen.has(value)) return value;
  seen.add(value);
  for (const nested of Object.values(value)) deepFreeze(nested, seen);
  return Object.freeze(value);
}

function patchSource(request, source = {}) {
  return { ...request, source: { ...(request.source || {}), ...source } };
}

function predicateRequest(nominalizationKind, overrides = {}) {
  const passive = nominalizationKind === "passive-action";
  return {
    constructionKind: "predicate-nominalization",
    nominalizationKind,
    source: {
      sourceStage: "distant-past-predicate",
      sourceStem: "mach-ti",
      verbClass: "A",
      sourceVoice: passive ? "passive" : "active",
      sourceValence: passive ? "single-object" : "intransitive",
      sourceObjectPattern: "none",
      sourceSubject: "3sg",
    },
    subject: "3sg",
    state: "absolutive",
    ...overrides,
  };
}

function deverbalRequest(overrides = {}) {
  return {
    constructionKind: "deverbal-action",
    actionKind: "active-action",
    actionSuffix: "liz",
    source: {
      sourceStage: "future-core",
      sourceStem: "chi",
      verbClass: "B",
      sourceVoice: "active",
      sourceValence: "intransitive",
      sourceObjectPattern: "none",
      sourceSubject: "3sg",
    },
    subject: "3sg",
    state: "absolutive",
    ...overrides,
  };
}

function patientiveRequest(family = "passive-core", overrides = {}) {
  const profile = {
    "passive-core": {
      sourceStage: "nonactive-core",
      sourceStem: "cua-lō",
      sourceVoice: "passive",
      sourceValence: "single-object",
      nonactiveSuffix: "lō",
    },
    "impersonal-core": {
      sourceStage: "nonactive-core",
      sourceStem: "coch-ō",
      sourceVoice: "impersonal",
      sourceValence: "intransitive",
      nonactiveSuffix: "ō",
    },
    "perfective-active-core": {
      sourceStage: "perfective-core",
      sourceStem: "mic",
      sourceVoice: "active",
      sourceValence: "intransitive",
    },
    "imperfective-active-core": {
      sourceStage: "imperfective-core",
      sourceStem: "mictiā",
      sourceVoice: "active",
      sourceValence: "single-object",
    },
    "root-or-stock": {
      sourceStage: "root-or-stock",
      sourceStem: "cual-ā-ni",
      sourceVoice: "active",
      sourceValence: "intransitive",
    },
  }[family];
  return {
    constructionKind: "patientive",
    patientiveSourceFamily: family,
    patientiveAnalogy: "impersonal",
    source: {
      ...profile,
      verbClass: "A",
      sourceObjectPattern: "none",
      sourceSubject: "3sg",
    },
    subject: "3sg",
    state: "absolutive",
    ...overrides,
  };
}

function characteristicRequest(overrides = {}) {
  return {
    constructionKind: "patientive",
    patientiveKind: "characteristic-property",
    characteristicReading: "inherent-quality",
    source: {
      sourceStage: "nounstem-embed",
      sourceStem: "mahuiz",
      sourceUnit: "nnc-nounstem",
      sourceVoice: "active",
      sourceValence: "intransitive",
      sourceObjectPattern: "none",
    },
    subject: "3sg",
    state: "absolutive",
    ...overrides,
  };
}

function nominalContinuationRequest(overrides = {}) {
  return {
    constructionKind: "nominal-continuation",
    source: {
      sourceStage: "derived-nounstem",
      sourceStem: "chīhua-l",
      derivationKind: "patientive",
      matrixStem: "cal",
      matrixClass: "tli",
    },
    subject: "3sg",
    state: "absolutive",
    ...overrides,
  };
}

function verbalContinuationRequest(overrides = {}) {
  return {
    constructionKind: "verbal-continuation",
    source: {
      sourceStage: "derived-nounstem",
      sourceStem: "chīhua-l",
      embedClass: "tli",
      matrixStem: "chōca",
      matrixVerbClass: "A",
      matrixValence: "intransitive",
    },
    relation: "adverb",
    adverbRole: "manner",
    subject: "3sg",
    mood: "indicative",
    tense: "present",
    voice: "active",
    ...overrides,
  };
}

function compact(runtime, frame) {
  const operation = frame?.operationFrame || {};
  return {
    authorizationStatus: frame?.authorizationStatus || "blocked",
    blockReason: frame?.blockReason || "",
    canonicalResult:
      runtime.isClassicalNahuatlDeverbalNncGrammarFrame?.(frame) === true,
    operationId: operation.operationId || "",
    constructionKind: operation.constructionKind || frame?.constructionKind || "",
    sourceStage: operation.sourceStage || frame?.sourceFrame?.sourceStage || "",
    sourceVoice: operation.sourceVoice || frame?.sourceFrame?.sourceVoice || "",
    sourceValence: operation.sourceValence || frame?.sourceFrame?.sourceValence || "",
    sourceObjectPattern:
      operation.sourceObjectPattern || frame?.sourceFrame?.sourceObjectPattern || "",
    actionKind: operation.actionKind || "",
    actionSuffix: operation.actionSuffix || "",
    patientiveKind: operation.patientiveKind || "",
    patientiveSourceFamily: operation.patientiveSourceFamily || "",
    characteristicReading: operation.characteristicReading || "",
    nounClass: operation.nounClass || "",
    targetStems: operation.targetStems || {},
    allowedStates: operation.allowedStates || [],
    transformedPossessor: operation.transformedPossessor || "",
    participantTransform: operation.participantTransform || {},
    rootStockKind: operation.rootStockKind || "",
    rootStockAllomorph: operation.rootStockAllomorph || "",
    authorizationIds: operation.appliedAuthorizationIds || [],
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
      operation.callerSuppliedDerivedAuthorityAccepted === true,
  };
}

function evaluate(runtime, request) {
  return compact(runtime, runtime.evaluateClassicalNahuatlDeverbalNnc(request));
}

function compare(first, second, relation) {
  const firstRules = Object.keys(first.rules || {}).sort();
  const secondRules = Object.keys(second.rules || {}).sort();
  return {
    authorizationStatus: first.authorizationStatus === "authorized"
      && second.authorizationStatus === "authorized"
      ? "authorized" : "blocked",
    blockReason: "",
    relation,
    first,
    second,
    distinctOperationIds: first.operationId !== second.operationId,
    distinctSourceStages: first.sourceStage !== second.sourceStage,
    distinctSourceVoices: first.sourceVoice !== second.sourceVoice,
    distinctTargetStems:
      first.targetStems?.restrictedUse !== second.targetStems?.restrictedUse,
    distinctRuleSets: JSON.stringify(firstRules) !== JSON.stringify(secondRules),
    surfaceHomophony: Boolean(
      first.wordSurface
      && first.wordSurface === second.wordSurface
      && first.operationId !== second.operationId
    ),
  };
}

function collection(records, relation) {
  return {
    authorizationStatus: records.every(record => (
      record.authorizationStatus === "authorized"
      && record.canonicalResult === true
    )) ? "authorized" : "blocked",
    blockReason: "",
    relation,
    records,
    allCanonical: records.every(record => record.canonicalResult === true),
    operationIds: records.map(record => record.operationId),
    sourceFamilies: records.map(record => record.patientiveSourceFamily),
  };
}

function buildActionSupplement(runtime) {
  const action = runtime.evaluateClassicalNahuatlDeverbalNnc(deverbalRequest());
  const principal = runtime.evaluateClassicalNahuatlVncApplication({
    sourceStem: "cuīca",
    verbClass: "A",
    sourceValence: "intransitive",
    sourceSubject: "3sg",
    subject: "3sg",
    mood: "indicative",
    tense: "present",
    requestedDerivation: "direct",
    objectKind: "",
    requestedVoice: "active",
  });
  const principalClause =
    runtime.buildClassicalNahuatlSupplementationClauseEnvelope(principal, {
      referenceId: "actor",
      subjectReferenceId: "actor",
    });
  const supplementClause =
    runtime.buildClassicalNahuatlSupplementationClauseEnvelope(action, {
      referenceId: "actor",
      subjectReferenceId: "actor",
    });
  const relation = runtime.evaluateClassicalNahuatlSupplementationOperation({
    operationKind: "relation",
    principalClause,
    supplementClause,
    options: {
      referenceMode: "shared",
      headRole: "subject",
      supplementContactRole: "subject",
    },
  });
  return {
    authorizationStatus:
      action.authorizationStatus === "authorized"
      && principalClause.authorizationStatus === "authorized"
      && supplementClause.authorizationStatus === "authorized"
      && relation.authorizationStatus === "authorized"
        ? "authorized" : "blocked",
    blockReason: relation.blockReason || supplementClause.blockReason || "",
    canonicalResult: relation.authorizationStatus === "authorized",
    operationId: "supplementation:active-action-nnc",
    action: compact(runtime, action),
    principalClauseKind: principalClause.unitKind || "",
    supplementClauseKind: supplementClause.unitKind || "",
    supplementFormula: supplementClause.nuclearFormulaRealization || "",
    supplementSurface: supplementClause.nuclearSurface || "",
    relationKind: relation.kind || "",
    gcdSatisfied: action.greatestCommonDivisor?.satisfied === true,
    lcmComplete: action.leastCommonMultiple?.licensedAxisSetComplete === true,
  };
}

function buildProjection(runtime) {
  const activeAction = evaluate(runtime, deverbalRequest());
  const zAction = evaluate(runtime, deverbalRequest({ actionSuffix: "z" }));
  const compoundActiveAction = evaluate(runtime, patchSource(
    deverbalRequest(),
    {
      sourceStem: "ā-miqui",
      sourceValence: "intransitive",
      sourceObjectPattern: "none",
    },
  ));
  const intransitivePotentialActive = evaluate(runtime, patchSource(
    deverbalRequest(),
    {
      sourceStem: "mahui",
      sourceValence: "intransitive",
      sourceObjectPattern: "none",
    },
  ));
  const intransitivePotentialPatient = evaluate(runtime, patchSource(
    deverbalRequest({ actionKind: "potential-patient" }),
    {
      sourceStem: "mahui",
      sourceValence: "intransitive",
      sourceObjectPattern: "none",
    },
  ));
  const transitivePotentialActive = evaluate(runtime, patchSource(
    deverbalRequest(),
    {
      sourceStem: "chīhua",
      sourceValence: "single-object",
      sourceObjectPattern: "nonspecific-nonhuman",
    },
  ));
  const transitivePotentialPatient = evaluate(runtime, patchSource(
    deverbalRequest({ actionKind: "potential-patient" }),
    {
      sourceStem: "chīhua",
      sourceValence: "single-object",
      sourceObjectPattern: "nonspecific-nonhuman",
    },
  ));
  const doubleObjectReflexiveActiveException = evaluate(runtime, patchSource(
    deverbalRequest(),
    {
      sourceStem: "cui-ti",
      sourceValence: "double-object",
      sourceObjectPattern: "reflexive",
    },
  ));
  const impersonalNonactiveAction = evaluate(runtime, patchSource(
    deverbalRequest({ actionKind: "impersonal-general-action" }),
    {
      sourceStem: "huī-lo-hua",
      verbClass: "A",
      sourceVoice: "impersonal",
      sourceObjectPattern: "none",
    },
  ));
  const impersonalTlaAction = evaluate(runtime, patchSource(
    deverbalRequest({ actionKind: "impersonal-general-action" }),
    {
      sourceStem: "yohui",
      verbClass: "A",
      sourceVoice: "impersonal",
      sourceObjectPattern: "nonspecific-nonhuman",
    },
  ));
  const passiveAction = evaluate(runtime, predicateRequest("passive-action"));
  const passivePatientive = evaluate(runtime, patientiveRequest("passive-core"));
  const deletedHumanObject = evaluate(runtime, patientiveRequest(
    "passive-core",
    {
      source: {
        sourceStage: "nonactive-core",
        sourceStem: "tlan-ē-uh-ti-lō",
        verbClass: "A",
        sourceVoice: "passive",
        sourceValence: "double-object",
        sourceObjectPattern: "nonspecific-human",
        sourceSubject: "3sg",
        nonactiveSuffix: "lō",
      },
      passiveHumanObjectRealization: "delete",
    },
  ));
  const passiveReflexive = evaluate(runtime, patientiveRequest(
    "passive-core",
    {
      source: {
        sourceStage: "nonactive-core", sourceStem: "mach-ti-lō",
        verbClass: "A", sourceVoice: "passive", sourceValence: "single-object",
        sourceObjectPattern: "reflexive", sourceSubject: "3sg",
        nonactiveSuffix: "lō",
      },
    },
  ));
  const passiveDoubleObject = evaluate(runtime, patientiveRequest(
    "passive-core",
    {
      source: {
        sourceStage: "nonactive-core", sourceStem: "mach-ti-lō",
        verbClass: "A", sourceVoice: "passive", sourceValence: "double-object",
        sourceObjectPattern: "nonspecific-nonhuman", sourceSubject: "3sg",
        nonactiveSuffix: "lō",
      },
    },
  ));
  const impersonal = evaluate(runtime, patientiveRequest("impersonal-core"));
  const impersonalReflexive = evaluate(runtime, patientiveRequest(
    "impersonal-core",
    {
      source: {
        sourceStage: "nonactive-core",
        sourceStem: "mach-ti-lō",
        verbClass: "A",
        sourceVoice: "impersonal",
        sourceValence: "single-object",
        sourceObjectPattern: "reflexive",
        sourceSubject: "3sg",
        nonactiveSuffix: "lō",
      },
    },
  ));
  const impersonalDouble = evaluate(runtime, patientiveRequest(
    "impersonal-core",
    {
      source: {
        sourceStage: "nonactive-core",
        sourceStem: "mach-ti-lō",
        verbClass: "A",
        sourceVoice: "impersonal",
        sourceValence: "double-object",
        sourceObjectPattern: "nonspecific-nonhuman",
        sourceSubject: "3sg",
        nonactiveSuffix: "lō",
      },
    },
  ));
  const impersonalLo = evaluate(runtime, patientiveRequest(
    "impersonal-core",
    { source: {
      sourceStage: "nonactive-core", sourceStem: "cua-lō", verbClass: "A",
      sourceVoice: "impersonal", sourceValence: "intransitive",
      sourceObjectPattern: "none", sourceSubject: "3sg", nonactiveSuffix: "lō",
    } },
  ));
  const impersonalHua = evaluate(runtime, patientiveRequest(
    "impersonal-core",
    { source: {
      sourceStage: "nonactive-core", sourceStem: "pā-hua", verbClass: "A",
      sourceVoice: "impersonal", sourceValence: "intransitive",
      sourceObjectPattern: "none", sourceSubject: "3sg", nonactiveSuffix: "hua",
    } },
  ));
  const humanToTla = evaluate(runtime, patientiveRequest(
    "impersonal-core",
    { source: {
      sourceStage: "nonactive-core", sourceStem: "pach-ō-lō", verbClass: "A",
      sourceVoice: "impersonal", sourceValence: "single-object",
      sourceObjectPattern: "nonspecific-human", sourceSubject: "3sg",
      nonactiveSuffix: "lō",
    } },
  ));
  const exceptionalTe = evaluate(runtime, patientiveRequest(
    "impersonal-core",
    { source: {
      sourceStage: "nonactive-core", sourceStem: "huica-lō", verbClass: "A",
      sourceVoice: "impersonal", sourceValence: "single-object",
      sourceObjectPattern: "nonspecific-human", sourceSubject: "3sg",
      nonactiveSuffix: "lō",
    } },
  ));
  const nonhumanImpersonal = evaluate(runtime, patientiveRequest(
    "impersonal-core",
    { source: {
      sourceStage: "nonactive-core", sourceStem: "pach-ō-lō", verbClass: "A",
      sourceVoice: "impersonal", sourceValence: "single-object",
      sourceObjectPattern: "nonspecific-nonhuman", sourceSubject: "3sg",
      nonactiveSuffix: "lō",
    } },
  ));
  const compoundPatientive = evaluate(runtime, patientiveRequest(
    "passive-core",
    { source: {
      sourceStage: "nonactive-core", sourceStem: "tla-mach-ti-lō", verbClass: "A",
      sourceVoice: "passive", sourceValence: "single-object",
      sourceObjectPattern: "none", sourceSubject: "3sg",
      nonactiveSuffix: "lō",
    } },
  ));
  const perfectivePassive = evaluate(runtime, patientiveRequest(
    "perfective-active-core", { patientiveAnalogy: "passive" },
  ));
  const perfectiveImpersonal = evaluate(runtime, patientiveRequest(
    "perfective-active-core", { patientiveAnalogy: "impersonal" },
  ));
  const imperfectivePassive = evaluate(runtime, patientiveRequest(
    "imperfective-active-core", { patientiveAnalogy: "passive" },
  ));
  const imperfectiveImpersonal = evaluate(runtime, patientiveRequest(
    "imperfective-active-core", { patientiveAnalogy: "impersonal" },
  ));
  const characteristicInherent = evaluate(runtime, characteristicRequest());
  const characteristicPertaining = evaluate(runtime, characteristicRequest({
    characteristicReading: "pertaining-to",
  }));
  const characteristicIntrinsic = evaluate(runtime, characteristicRequest({
    characteristicReading: "intrinsic-aspect",
  }));
  const organicPossession = evaluate(runtime, characteristicRequest({
    characteristicReading: "organic-possession",
    state: "possessive",
    possessor: "3sg",
  }));
  const predicateActiveAction = evaluate(runtime, predicateRequest("active-action"));
  const characteristicActionHomophone = evaluate(runtime, characteristicRequest({
    source: {
      sourceStage: "nounstem-embed", sourceStem: "mach-ti-cā",
      sourceUnit: "nnc-nounstem", sourceVoice: "active",
      sourceValence: "intransitive", sourceObjectPattern: "none",
    },
  }));
  const rootStockNi = evaluate(runtime, patientiveRequest("root-or-stock"));
  const rootStockHua = evaluate(runtime, patientiveRequest("root-or-stock", {
    rootStockAllomorph: "zero",
    source: {
      sourceStage: "root-or-stock", sourceStem: "tom-ā-hua", verbClass: "A",
      sourceVoice: "active", sourceValence: "intransitive",
      sourceObjectPattern: "none", sourceSubject: "3sg",
    },
  }));
  const rootStockIhui = evaluate(runtime, patientiveRequest("root-or-stock", {
    source: {
      sourceStage: "root-or-stock", sourceStem: "cuetl-a-hui", verbClass: "A",
      sourceVoice: "active", sourceValence: "intransitive",
      sourceObjectPattern: "none", sourceSubject: "3sg",
    },
  }));
  const rootStockCausative = evaluate(runtime, patientiveRequest("root-or-stock", {
    source: {
      sourceStage: "root-or-stock", sourceStem: "tla-zāl-o-ā", verbClass: "A",
      sourceVoice: "active", sourceValence: "single-object",
      sourceObjectPattern: "nonspecific-nonhuman", sourceSubject: "3sg",
    },
  }));
  const bareStockAgentive = evaluate(runtime, patientiveRequest("root-or-stock", {
    source: {
      sourceStage: "root-or-stock", sourceStem: "pey-ō-ni", verbClass: "A",
      sourceVoice: "active", sourceValence: "intransitive",
      sourceObjectPattern: "none", sourceSubject: "3sg",
    },
  }));
  const rootStockPoC = evaluate(runtime, patientiveRequest("root-or-stock", {
    rootStockAllomorph: "c",
    source: {
      sourceStage: "root-or-stock", sourceStem: "pō-ni", verbClass: "A",
      sourceVoice: "active", sourceValence: "intransitive",
      sourceObjectPattern: "none", sourceSubject: "3sg",
    },
  }));
  const rootStockPoCh = evaluate(runtime, patientiveRequest("root-or-stock", {
    rootStockAllomorph: "ch",
    source: {
      sourceStage: "root-or-stock", sourceStem: "pō-ni", verbClass: "A",
      sourceVoice: "active", sourceValence: "intransitive",
      sourceObjectPattern: "none", sourceSubject: "3sg",
    },
  }));
  const nominalContinuation = evaluate(runtime, nominalContinuationRequest());
  const verbalContinuation = evaluate(runtime, verbalContinuationRequest());
  const actionNominalContinuation = evaluate(runtime, nominalContinuationRequest({
    source: {
      sourceStage: "derived-nounstem", sourceStem: "miqui-liz",
      derivationKind: "active-action-liz", matrixStem: "cal",
      matrixClass: "tli",
    },
  }));
  const actionVerbalContinuation = evaluate(runtime, verbalContinuationRequest({
    source: {
      sourceStage: "derived-nounstem", sourceStem: "chōqui-liz",
      derivationKind: "active-action-liz", embedClass: "tli",
      matrixStem: "tzahtzi", matrixVerbClass: "A",
      matrixValence: "intransitive",
    },
  }));
  const actionAffectiveAssimilation = evaluate(runtime,
    nominalContinuationRequest({
      source: {
        sourceStage: "derived-nounstem", sourceStem: "miqui-z",
        derivationKind: "active-action-z", matrixStem: "tzin",
        matrixClass: "tli",
      },
    }));
  const absolutiveComplement = evaluate(runtime, verbalContinuationRequest({
    source: {
      sourceStage: "derived-nounstem", sourceStem: "chīhua-l", embedClass: "tli",
      sourceState: "absolutive", objectCoreference: "matrix-object",
      matrixFamily: "toca", matrixStem: "toca", matrixVerbClass: "A",
      matrixValence: "single-object",
    },
    relation: "complement", orientation: "object", complementKind: "pretending",
  }));
  const possessiveComplement = evaluate(runtime, verbalContinuationRequest({
    source: {
      sourceStage: "derived-nounstem", sourceStem: "chīhua-l", embedClass: "tli",
      sourceState: "possessive", possessor: "1sg",
      possessorToObjectTransfer: true, matrixFamily: "toca", matrixStem: "toca",
      matrixVerbClass: "A", matrixValence: "single-object",
    },
    relation: "complement", orientation: "object", complementKind: "pretending",
  }));
  const incorporatedObject = evaluate(runtime, verbalContinuationRequest({
    source: {
      sourceStage: "derived-nounstem", sourceStem: "tla-ht-ō-l", embedClass: "tli",
      sourceState: "possessive", possessor: "3pl",
      possessorToObjectTransfer: true, matrixFamily: "ih-tlani",
      matrixStem: "ih-tlani", matrixVerbClass: "A", matrixValence: "single-object",
    },
    relation: "object", orientation: "object",
  }));
  const fullCharacteristicEmbed = evaluate(runtime, nominalContinuationRequest({
    source: {
      sourceStage: "derived-nounstem", sourceStem: "yōl-lō-yō",
      derivationKind: "characteristic-property-patientive",
      matrixStem: "chicāhua", matrixClass: "tl",
    },
  }));
  const omittedCharacteristicEmbed = evaluate(runtime, nominalContinuationRequest({
    source: {
      sourceStage: "derived-nounstem", sourceStem: "yōl-lō-yō",
      derivationKind: "characteristic-property-patientive",
      omitCharacteristicYō: true, matrixStem: "chicāhua", matrixClass: "tl",
    },
  }));
  const unknownRootStock = evaluate(runtime, patientiveRequest("root-or-stock", {
    source: {
      sourceStage: "root-or-stock", sourceStem: "cuē", verbClass: "A",
      sourceVoice: "active", sourceValence: "intransitive",
      sourceObjectPattern: "none", sourceSubject: "3sg",
    },
  }));

  const cases = {
    deverbalCoreDerivation: activeAction,
    deverbalZ: zAction,
    deverbalLiz: activeAction,
    deverbalWayOfReading: activeAction,
    deverbalCompoundSource: compoundActiveAction,
    deverbalPotentialPatient: {
      authorizationStatus:
        intransitivePotentialActive.authorizationStatus === "authorized"
        && intransitivePotentialPatient.authorizationStatus === "authorized"
        && transitivePotentialActive.authorizationStatus === "authorized"
        && transitivePotentialPatient.authorizationStatus === "authorized"
        && doubleObjectReflexiveActiveException.authorizationStatus === "authorized"
          ? "authorized" : "blocked",
      blockReason: "",
      allCanonical: [
        intransitivePotentialActive, intransitivePotentialPatient,
        transitivePotentialActive, transitivePotentialPatient,
        doubleObjectReflexiveActiveException,
      ].every(record => record.canonicalResult === true),
      intransitiveHomophony: compare(intransitivePotentialActive,
        intransitivePotentialPatient,
        "intransitive-active-action-versus-potential-patient-homophony"),
      transitiveProjectiveDeletion: compare(transitivePotentialActive,
        transitivePotentialPatient,
        "transitive-active-action-versus-potential-patient-projective-deletion"),
      doubleObjectReflexiveActiveException,
    },
    deverbalImpersonalSource: collection([
      impersonalNonactiveAction, impersonalTlaAction,
    ], "nonactive-and-tla-impersonal-action-sources"),
    deverbalActionEmbedCapability: compare(actionNominalContinuation,
      actionVerbalContinuation,
      "active-action-nominal-versus-verbal-continuation"),
    deverbalActionAffectiveAssimilation: actionAffectiveAssimilation,
    actionPossessorRoleContrast: compare(activeAction, passiveAction,
      "agent-possessor-versus-patient-possessor"),
    actionNncSupplement: buildActionSupplement(runtime),
    patientiveFiveFamilyTaxonomy: collection([
      passivePatientive, impersonal, perfectiveImpersonal,
      imperfectiveImpersonal, rootStockNi,
    ], "five-typed-patientive-source-families"),
    patientivePassiveCore: passivePatientive,
    patientivePassiveObjectPatterns: collection([
      passiveReflexive, passiveDoubleObject, deletedHumanObject,
    ], "reflexive-double-object-and-deleted-human-patterns"),
    patientiveImpersonalIntransitive: impersonal,
    patientiveImpersonalObjectPatterns: compare(impersonalReflexive,
      impersonalDouble, "reflexive-versus-double-object-impersonal"),
    patientiveImpersonalSuffixes: collection([
      impersonalLo, impersonal, impersonalHua,
    ], "lo-o-hua-nonactive-source-families"),
    patientiveHumanSourceTla: compare(humanToTla, exceptionalTe,
      "productive-tla-versus-exceptional-te"),
    patientiveHumanNonhuman: compare(humanToTla, nonhumanImpersonal,
      "human-versus-nonhuman-source-history"),
    patientiveLexicalExceptions: compare(exceptionalTe, impersonal,
      "lexical-exception-versus-productive-default"),
    patientiveCompoundSource: compoundPatientive,
    patientiveCompoundContinuation: nominalContinuation,
    patientivePerfectiveCore: compare(perfectivePassive,
      perfectiveImpersonal, "perfective-passive-versus-impersonal-analogy"),
    patientiveImperfectiveCore: compare(imperfectivePassive,
      imperfectiveImpersonal, "imperfective-passive-versus-impersonal-analogy"),
    characteristicProperty: collection([
      characteristicInherent, characteristicPertaining, characteristicIntrinsic,
    ], "inherent-pertaining-and-intrinsic-readings"),
    organicPossession: compare(characteristicInherent, organicPossession,
      "adventitious-versus-organic-possession"),
    typedHomophonyHistory: compare(predicateActiveAction,
      characteristicActionHomophone,
      "active-action-ca-yo-versus-characteristic-property-ca-yo-history"),
    rootStockNi,
    rootStockHua,
    rootStockIhuiUncertainty: {
      authorizationStatus: rootStockIhui.authorizationStatus === "authorized"
        && rootStockCausative.authorizationStatus === "authorized"
        && bareStockAgentive.authorizationStatus === "authorized"
        && unknownRootStock.authorizationStatus === "blocked"
        ? "authorized" : "blocked",
      blockReason: "",
      licensed: collection([
        rootStockIhui, rootStockCausative, bareStockAgentive,
      ], "ihui-causative-and-bare-stock-licensed-histories"),
      uncertain: unknownRootStock,
      separateHistories: true,
    },
    patientiveMultipleDerivation: compare(rootStockPoC, rootStockPoCh,
      "one-source-multiple-licensed-procedures"),
    patientiveEmbedCapability: compare(nominalContinuation, verbalContinuation,
      "nominal-versus-verbal-patientive-continuation"),
    patientiveNominalEmbed: nominalContinuation,
    patientiveVerbalEmbed: verbalContinuation,
    patientiveComplement: compare(absolutiveComplement,
      possessiveComplement, "coreference-versus-possessor-case-transfer"),
    patientiveIncorporatedObject: incorporatedObject,
    characteristicPropertyEmbed: compare(fullCharacteristicEmbed,
      omittedCharacteristicEmbed, "full-versus-typed-yo-omission"),
  };

  const actionFrame = runtime.evaluateClassicalNahuatlDeverbalNnc(
    deverbalRequest(),
  );
  const copiedAction = JSON.parse(JSON.stringify(actionFrame));
  if (copiedAction?.canonicalResult?.nncSlotFrame?.slots?.predicate) {
    copiedAction.canonicalResult.nncSlotFrame.slots.predicate.stem = "forged";
  }
  const blockedCases = {
    wrongActionStage: evaluate(runtime, patchSource(
      deverbalRequest(), { sourceStage: "present-predicate" },
    )),
    unknownRootStock,
    missingPossessorTransfer: evaluate(runtime, verbalContinuationRequest({
      source: {
        sourceStage: "derived-nounstem", sourceStem: "chīhua-l", embedClass: "tli",
        sourceState: "possessive", possessor: "1sg",
        matrixFamily: "toca", matrixStem: "toca", matrixVerbClass: "A",
        matrixValence: "single-object",
      },
      relation: "complement", orientation: "object",
    })),
    forgedCharacteristicOmission: evaluate(runtime, nominalContinuationRequest({
      source: {
        sourceStage: "derived-nounstem", sourceStem: "yōl-lō-yō",
        derivationKind: "ordinary-patientive", omitCharacteristicYō: true,
        matrixStem: "chicāhua", matrixClass: "tl",
      },
    })),
    callerPoison: evaluate(runtime, {
      ...deverbalRequest(), displayFormula: "#forged#", resultSurface: "forged",
    }),
    copiedActionSupplement:
      runtime.buildClassicalNahuatlSupplementationClauseEnvelope(copiedAction, {
        referenceId: "actor", subjectReferenceId: "actor",
      }),
  };

  const caseValid = record => record?.authorizationStatus === "authorized" && (
      record.canonicalResult === true
      || record.allCanonical === true
      || (record.first?.canonicalResult === true
        && record.second?.canonicalResult === true)
      || (record.licensed?.allCanonical === true
        && record.uncertain?.authorizationStatus === "blocked"
        && record.separateHistories === true)
    );
  const positivesValid = Object.values(cases).every(caseValid);
  const blockedValid = Object.values(blockedCases).every(record => (
    record?.authorizationStatus === "blocked"
  ));
  const discriminationValid = Boolean(
    cases.deverbalPotentialPatient.intransitiveHomophony.surfaceHomophony
    && cases.deverbalPotentialPatient.intransitiveHomophony.distinctOperationIds
    && cases.deverbalPotentialPatient.transitiveProjectiveDeletion.distinctTargetStems
    && cases.deverbalPotentialPatient.doubleObjectReflexiveActiveException.actionKind
      === "active-action"
    && cases.deverbalImpersonalSource.allCanonical
    && cases.deverbalActionEmbedCapability.distinctOperationIds
    && cases.deverbalActionAffectiveAssimilation.rules["37.5-s-to-tz-affective-assimilation"]
    && cases.actionPossessorRoleContrast.distinctOperationIds
    && cases.actionPossessorRoleContrast.distinctSourceVoices
    && cases.patientiveHumanSourceTla.distinctTargetStems
    && cases.patientiveHumanNonhuman.distinctRuleSets
    && cases.patientivePerfectiveCore.distinctRuleSets
    && cases.patientiveImperfectiveCore.distinctRuleSets
    && cases.patientivePerfectiveCore.first.operationId
      === cases.patientivePerfectiveCore.second.operationId
    && cases.patientivePassiveObjectPatterns.allCanonical
    && cases.characteristicProperty.allCanonical
    && cases.typedHomophonyHistory.surfaceHomophony
    && cases.typedHomophonyHistory.distinctOperationIds
    && cases.patientiveMultipleDerivation.distinctTargetStems
    && cases.patientiveEmbedCapability.distinctOperationIds
    && cases.patientiveNominalEmbed.operationId
      === "nominal-continuation:derived-nounstem-embed"
    && cases.patientiveVerbalEmbed.operationId
      === "verbal-continuation:adverb"
    && cases.characteristicPropertyEmbed.distinctTargetStems
    && cases.rootStockIhuiUncertainty.licensed.allCanonical
    && cases.rootStockIhuiUncertainty.uncertain.authorizationStatus === "blocked"
  );

  return deepFreeze({
    kind: "classical-nahuatl-deverbal-patientive-validation-frame",
    authorizationStatus: positivesValid && blockedValid && discriminationValid
      ? "authorized" : "blocked",
    blockReason: positivesValid && blockedValid && discriminationValid
      ? "" : "classical-deverbal-patientive-validation-coordinate-blocked",
    typedFrameAuthority: true,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
    storedExampleAuthority: false,
    translationAuthority: false,
    curriculumMetadataAuthority: false,
    contract: {
      evidenceOnly: true,
      evidenceRoles: {
        wayOfReading: true,
        humanNonhumanAnalysis: true,
        lexicalExceptionEvidence: true,
        typedHomophonyHistory: true,
        sourceUncertainty: true,
      },
      separateOwnerProofRequired: true,
      sourceFamilyCannotBeInferredFromSurface: true,
      homophonyCannotCollapseOperationIdentity: true,
      blockedUncertaintyCannotAuthorizeGrammar: true,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
      storedExampleAuthority: false,
      translationAuthority: false,
    },
    cases,
    blockedCases,
  });
}

export function createClassicalDeverbalPatientiveValidationSemanticOperationsApi(
  targetObject = globalThis,
) {
  const issuedFrames = new WeakSet();
  let cachedProjection = null;
  function buildClassicalNahuatlDeverbalPatientiveValidationFrame() {
    if (!cachedProjection) {
      cachedProjection = buildProjection(targetObject);
      if (cachedProjection.authorizationStatus === "authorized") {
        issuedFrames.add(cachedProjection);
      }
    }
    return cachedProjection;
  }
  function isClassicalNahuatlDeverbalPatientiveValidationFrame(frame = null) {
    return Boolean(
      frame
      && issuedFrames.has(frame)
      && frame.kind === "classical-nahuatl-deverbal-patientive-validation-frame"
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
    buildClassicalNahuatlDeverbalPatientiveValidationFrame,
    isClassicalNahuatlDeverbalPatientiveValidationFrame,
  });
}
