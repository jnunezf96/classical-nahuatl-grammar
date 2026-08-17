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
      matrixFiniteApplicationValence:
        facts.matrixFiniteApplicationValence || "",
      embedDeterminesCompoundValence:
        facts.embedDeterminesCompoundValence === true,
      matrixDeterminesCompoundType: facts.matrixDeterminesCompoundType === true,
      openTypedMatrixAdmission: facts.openTypedMatrixAdmission === true,
      canvasExamplesAreEvidenceOnly:
        facts.canvasExamplesAreEvidenceOnly === true,
      sourcePredicatePreserved: facts.sourcePredicatePreserved === true,
      embedSubjectDeleted: facts.embedSubjectDeleted === true,
      matrixAfterEmbed: facts.matrixAfterEmbed === true,
      embedStem: facts.embedStem || "",
      connective: facts.connective || "",
      matrixStem: facts.matrixStem || "",
      matrixSelectionStem: facts.matrixSelectionStem || "",
      matrixSuppliedStem: facts.matrixSuppliedStem || "",
      reflexiveMatrixCore: facts.reflexiveMatrixCore || "",
      typedReflexiveMatrixRole: facts.typedReflexiveMatrixRole || "",
      fixedReflexiveCarrier: facts.fixedReflexiveCarrier || "",
      fixedReflexiveCarrierDerived:
        facts.fixedReflexiveCarrierDerived === true,
      fixedReflexiveCarrierRegardlessOfSubject:
        facts.fixedReflexiveCarrierRegardlessOfSubject === true,
      suppliedPersonMarkedReflexiveCarrierReplaced:
        facts.suppliedPersonMarkedReflexiveCarrierReplaced === true,
      matrixTransitivityDischargedOntoFusedReflexive:
        facts.matrixTransitivityDischargedOntoFusedReflexive === true,
      reflexiveCoreStructurallyIntransitiveInCompound:
        facts.reflexiveCoreStructurallyIntransitiveInCompound === true,
      reflexiveMatrixIntroducesNoNewParticipant:
        facts.reflexiveMatrixIntroducesNoNewParticipant === true,
      reflexiveMatrixSubjectCoreference:
        facts.reflexiveMatrixSubjectCoreference === true,
      reflexiveMatrixExamplesNonexhaustive:
        facts.reflexiveMatrixExamplesNonexhaustive === true,
      reflexiveMatrixStemWhitelistUsed:
        facts.reflexiveMatrixStemWhitelistUsed === true,
      reflexiveMatrixSubjectAnimacy:
        facts.reflexiveMatrixSubjectAnimacy || "",
      moManaAnimateSubjectMustBePlural:
        facts.moManaAnimateSubjectMustBePlural === true,
      moManaSubjectNumberDerivedFromFiniteSubject:
        facts.moManaSubjectNumberDerivedFromFiniteSubject === true,
      matrixFiniteStem: facts.matrixFiniteStem || "",
      matrixFiniteMood: facts.matrixFiniteMood || "",
      matrixFiniteTense: facts.matrixFiniteTense || "",
      matrixFiniteSubject: facts.matrixFiniteSubject || "",
      matrixFiniteNumberMorph: facts.matrixFiniteNumberMorph || "",
      matrixConstruction: facts.matrixConstruction || "",
      matrixReadingOptions: [...(facts.matrixReadingOptions || [])],
      sharedObjectCompositionSelected:
        facts.sharedObjectCompositionSelected === true,
      sharedObjectEmbedAndMatrixTransitive:
        facts.sharedObjectEmbedAndMatrixTransitive === true,
      sharedObjectCoreferenceVerified:
        facts.sharedObjectCoreferenceVerified === true,
      sharedObjectKind: facts.sharedObjectKind || "",
      sharedObjectPerson: facts.sharedObjectPerson || "",
      sharedObjectNumber: facts.sharedObjectNumber || "",
      sharedObjectManifestationCount:
        Number(facts.sharedObjectManifestationCount || 0),
      sharedObjectCarrierSite: facts.sharedObjectCarrierSite || "",
      matrixSharedObjectCarrierSuppressed:
        facts.matrixSharedObjectCarrierSuppressed === true,
      sharedObjectReflexiveOrProjectivePreserved:
        facts.sharedObjectReflexiveOrProjectivePreserved === true,
      sharedObjectOtherParticipantsRemainDistinct:
        facts.sharedObjectOtherParticipantsRemainDistinct === true,
      sharedObjectReferentChoiceRequired:
        facts.sharedObjectReferentChoiceRequired === true,
      sharedObjectReferentResolvedByTypedSource:
        facts.sharedObjectReferentResolvedByTypedSource === true,
      sharedObjectExamplesNonexhaustive:
        facts.sharedObjectExamplesNonexhaustive === true,
      sharedObjectMatrixStemWhitelistUsed:
        facts.sharedObjectMatrixStemWhitelistUsed === true,
      sharedObjectEHuaClassAEmbedAutomatic:
        facts.sharedObjectEHuaClassAEmbedAutomatic === true,
      sharedObjectEmbedClass: facts.sharedObjectEmbedClass || "",
      sharedObjectPluralAllowsDistributiveReading:
        facts.sharedObjectPluralAllowsDistributiveReading === true,
      futureSupplementationAuthorized:
        facts.futureSupplementationAuthorized === true,
      futureSupplementSourceKind: facts.futureSupplementSourceKind || "",
      futureSupplementFunctionsAsObject:
        facts.futureSupplementFunctionsAsObject === true,
      matrixObjectReplacedByFuturePredicate:
        facts.matrixObjectReplacedByFuturePredicate === true,
      matrixObjectCarrierSuppressed:
        facts.matrixObjectCarrierSuppressed === true,
      futureEmbedPredicateStem: facts.futureEmbedPredicateStem || "",
      futureEmbedTense: facts.futureEmbedTense || "",
      futureEmbedTenseMorph: facts.futureEmbedTenseMorph || "",
      futureEmbedValence: facts.futureEmbedValence || "",
      futureEmbedMayBeIntransitiveOrTransitive:
        facts.futureEmbedMayBeIntransitiveOrTransitive === true,
      futureEmbedActionAfterMatrixAction:
        facts.futureEmbedActionAfterMatrixAction === true,
      futureMatrixAnalysisId: facts.futureMatrixAnalysisId || "",
      futureMatrixLexicalStem: facts.futureMatrixLexicalStem || "",
      futureMatrixConstructionStem:
        facts.futureMatrixConstructionStem || "",
      futureMatrixReading: facts.futureMatrixReading || "",
      futureMatrixAnalysisIsUserChoice:
        facts.futureMatrixAnalysisIsUserChoice === true,
      futureMatrixInventoryIsConstructionalNotSourceWhitelist:
        facts.futureMatrixInventoryIsConstructionalNotSourceWhitelist === true,
      futureMatrixStemWhitelistUsed:
        facts.futureMatrixStemWhitelistUsed === true,
      quiMatrixAnomalous: facts.quiMatrixAnomalous === true,
      quiMatrixImperfectOnly: facts.quiMatrixImperfectOnly === true,
      traditionalConditionalIsReadingNotTense:
        facts.traditionalConditionalIsReadingNotTense === true,
      principalAndSupplementSubjectsCoreferential:
        facts.principalAndSupplementSubjectsCoreferential === true,
      includedReferentSupplementationAvailable:
        facts.includedReferentSupplementationAvailable === true,
      antecessiveOrderAvailable:
        facts.antecessiveOrderAvailable === true,
      antecessiveOrderRequested:
        facts.antecessiveOrderRequested === true,
      antecessiveScopesFiniteMatrixTense:
        facts.antecessiveScopesFiniteMatrixTense === true,
      caSuppletiveFiniteStemDerived:
        facts.caSuppletiveFiniteStemDerived || "",
      yaPresentSingularUh: facts.yaPresentSingularUh === true,
      yaPresentPluralHui: facts.yaPresentPluralHui === true,
      yaSyncopationAvailable: facts.yaSyncopationAvailable === true,
      yaSyncopationSelected: facts.yaSyncopationSelected === true,
      yaUnsyncopatedSequence: facts.yaUnsyncopatedSequence || "",
      yaSyncopatedSequence: facts.yaSyncopatedSequence || "",
      connectiveCausativeStructurallyDistinct:
        facts.connectiveCausativeStructurallyDistinct === true,
      traditionalSpellingMayNeutralizeDistinction:
        facts.traditionalSpellingMayNeutralizeDistinction === true,
      traditionalSpellingAnalysisChoices:
        [...(facts.traditionalSpellingAnalysisChoices || [])],
      eHuaCaIdiomaticReadingAvailable:
        facts.eHuaCaIdiomaticReadingAvailable === true,
      matrixSemanticDomain: facts.matrixSemanticDomain || "",
      hualDirectionalRetained: facts.hualDirectionalRetained === true,
      retainedMatrixDirectional: facts.retainedMatrixDirectional || "",
      ordinaryHuītzConnectiveSelected:
        facts.ordinaryHuītzConnectiveSelected === true,
      carryAnalysisSelected: facts.carryAnalysisSelected === true,
      selectedMatrixAnalysis: facts.selectedMatrixAnalysis || "",
      ordinaryVersusCarryAnalysisIsTypedChoice:
        facts.ordinaryVersusCarryAnalysisIsTypedChoice === true,
      matrixAnalysisDoesNotWhitelistSourceStem:
        facts.matrixAnalysisDoesNotWhitelistSourceStem === true,
      embedFiniteCoordinate: facts.embedFiniteCoordinate || "",
      matrixSuppliesFiniteMoodAndTense:
        facts.matrixSuppliesFiniteMoodAndTense === true,
      embedFiniteCoordinateDecoupled:
        facts.embedFiniteCoordinateDecoupled === true,
      embedTenseMorph: facts.embedTenseMorph || "",
      specialPerfectiveEmbedDerived:
        facts.specialPerfectiveEmbedDerived === true,
      specialPerfectiveEmbedSource:
        facts.specialPerfectiveEmbedSource || "",
      specialPerfectiveEmbedResult:
        facts.specialPerfectiveEmbedResult || "",
      caToYeEmbedAlternation: facts.caToYeEmbedAlternation === true,
      yauhToYahEmbedAlternation: facts.yauhToYahEmbedAlternation === true,
      ittaToItzEmbedAlternation: facts.ittaToItzEmbedAlternation === true,
      itzEmbedSense: facts.itzEmbedSense || "",
      itzSourceAnalysis: facts.itzSourceAnalysis || "",
      itzHomophonesRemainDistinct:
        facts.itzHomophonesRemainDistinct === true,
      itzSourceAnalysisIsUserChoice:
        facts.itzSourceAnalysisIsUserChoice === true,
      cacNonanimateReferenceRequired:
        facts.cacNonanimateReferenceRequired === true,
      cacSubjectAnimacy: facts.cacSubjectAnimacy || "",
      cacAnimacyConsequenceAutomatic:
        facts.cacAnimacyConsequenceAutomatic === true,
      cacReadingOptions: [...(facts.cacReadingOptions || [])],
      eventOrder: facts.eventOrder || "",
      reversedEventOrderLicensed:
        facts.reversedEventOrderLicensed === true,
      reversedEventOrderMatrices:
        [...(facts.reversedEventOrderMatrices || [])],
      motionItzEHuaReversalLicensed:
        facts.motionItzEHuaReversalLicensed === true,
      reversedEventOrderSelected:
        facts.reversedEventOrderSelected === true,
      interpretedFirstEvent: facts.interpretedFirstEvent || "",
      interpretedSecondEvent: facts.interpretedSecondEvent || "",
      surfaceConstituentOrder: facts.surfaceConstituentOrder || "",
      eventOrderChoiceChangesInterpretationOnly:
        facts.eventOrderChoiceChangesInterpretationOnly === true,
      compoundVoice: facts.compoundVoice || "",
      nonactiveScope: facts.nonactiveScope || "",
      passiveScopeOptions: [...(facts.passiveScopeOptions || [])],
      impersonalScopeOptions: [...(facts.impersonalScopeOptions || [])],
      embedNonactiveApplied: facts.embedNonactiveApplied === true,
      matrixNonactiveApplied: facts.matrixNonactiveApplied === true,
      embedNonactiveOperation: facts.embedNonactiveOperation || "",
      matrixNonactiveOperation: facts.matrixNonactiveOperation || "",
      nonactiveScopeChangesParticipantTopology:
        facts.nonactiveScopeChangesParticipantTopology === true,
      nonactiveResultValence: facts.nonactiveResultValence || "",
      stativeMatrixPrefersEmbedOnly:
        facts.stativeMatrixPrefersEmbedOnly === true,
      stativeMatrixPreferenceIsNotAbsolute:
        facts.stativeMatrixPreferenceIsNotAbsolute === true,
      tlaImpersonalMustRemainOnEmbed:
        facts.tlaImpersonalMustRemainOnEmbed === true,
      tlaImpersonalCarrier: facts.tlaImpersonalCarrier || "",
      nonactiveSuffixesDerivedAutomatically:
        facts.nonactiveSuffixesDerivedAutomatically === true,
      recursiveEmbed: facts.recursiveEmbed === true,
      recursiveMatrix: facts.recursiveMatrix === true,
      recursiveCompoundAuthorized:
        facts.recursiveCompoundAuthorized === true,
      recursiveResultRole: facts.recursiveResultRole || "",
      recursiveRoleIsUserChoice:
        facts.recursiveRoleIsUserChoice === true,
      recursiveBinaryConstituentCount:
        Number(facts.recursiveBinaryConstituentCount || 0),
      recursiveHierarchyAcyclic:
        facts.recursiveHierarchyAcyclic === true,
      recursiveHierarchyValidated:
        facts.recursiveHierarchyValidated === true,
      recursiveConstituentsDistinct:
        facts.recursiveConstituentsDistinct === true,
      recursiveDepth: Number(facts.recursiveDepth || 0),
      recursiveSourceLinksPreserved:
        facts.recursiveSourceLinksPreserved === true,
      recursiveLocalRulesIndependent:
        facts.recursiveLocalRulesIndependent === true,
      recursiveLocalConnectiveDerived:
        facts.recursiveLocalConnectiveDerived === true,
      recursiveValenceInheritedFromOuterEmbed:
        facts.recursiveValenceInheritedFromOuterEmbed === true,
      recursiveParticipantsPreserved:
        facts.recursiveParticipantsPreserved === true,
      recursiveFiniteBoundaryOutsideCompletedCompound:
        facts.recursiveFiniteBoundaryOutsideCompletedCompound === true,
      recursiveContinuationAvailable:
        facts.recursiveContinuationAvailable === true,
      recursiveExampleStemWhitelistUsed:
        facts.recursiveExampleStemWhitelistUsed === true,
      recursiveManualDepthControlRequired:
        facts.recursiveManualDepthControlRequired === true,
      recursiveManualConnectiveControlRequired:
        facts.recursiveManualConnectiveControlRequired === true,
      recursiveManualParticipantCopyingRequired:
        facts.recursiveManualParticipantCopyingRequired === true,
      oldConnectivelessHuītzFormation:
        facts.oldConnectivelessHuītzFormation === true,
      prohibitedConnectiveT: facts.prohibitedConnectiveT === true,
      carryLexicalAnalysisSelected:
        facts.carryLexicalAnalysisSelected === true,
      carrySourceStem: facts.carrySourceStem || "",
      carryEmbedStem: facts.carryEmbedStem || "",
      carryMatrixPerfectiveStem: facts.carryMatrixPerfectiveStem || "",
      carryVisibleMatrixShape: facts.carryVisibleMatrixShape || "",
      carryObjectKind: facts.carryObjectKind || "",
      carryObjectPerson: facts.carryObjectPerson || "",
      openTypedCarrySourceAdmission:
        facts.openTypedCarrySourceAdmission === true,
      carrySourceStemWhitelistUsed:
        facts.carrySourceStemWhitelistUsed === true,
      specialCarryStemDerivedFromShape:
        facts.specialCarryStemDerivedFromShape === true,
      oLocativeOnOmitted: facts.oLocativeOnOmitted === true,
      omittedMatrixLocative: facts.omittedMatrixLocative || "",
      matrixLocativeRealization: facts.matrixLocativeRealization || "",
      eHuaClassHistoryChoiceAvailable:
        facts.eHuaClassHistoryChoiceAvailable === true,
      eHuaLicensedMatrixClasses:
        [...(facts.eHuaLicensedMatrixClasses || [])],
      eHuaSelectedMatrixClass: facts.eHuaSelectedMatrixClass || "",
      eHuaPerfectiveClassAlternants:
        [...(facts.eHuaPerfectiveClassAlternants || [])],
      rapidOrAbruptReadingIsCueOnly:
        facts.rapidOrAbruptReadingIsCueOnly === true,
      huetziBasicFallReadingAvailable:
        facts.huetziBasicFallReadingAvailable === true,
      huetziRapidAbruptReadingAvailable:
        facts.huetziRapidAbruptReadingAvailable === true,
      huetziReversedEventReadingAvailable:
        facts.huetziReversedEventReadingAvailable === true,
      huetziCausalFallReadingAvailable:
        facts.huetziCausalFallReadingAvailable === true,
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
  const passiveRequest = {
    sourceStem: "maca",
    sourceValence: "specific-projective",
    objectKind: "specific-projective",
    objectPerson: "3sg",
    verbClass: "A",
    subject: "3sg",
    mood: "indicative",
    tense: "present",
    requestedVoice: "passive",
    voice: "passive",
  };
  const passiveOptionId = nonactiveOption(runtime, passiveRequest);
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
    syncopatedYaPreterit: evaluate(runtime, {
      compoundMatrixStem: "ya-uh",
      compoundYaSyncopation: true,
      tense: "preterit",
    }),
    unsyncopatedYaFuture: evaluate(runtime, {
      compoundMatrixStem: "ya-uh",
      compoundYaSyncopation: false,
      tense: "future",
    }),
    yaPresentPlural: evaluate(runtime, {
      compoundMatrixStem: "ya-uh",
      subject: "3pl",
      tense: "present",
    }),
    caPresentPlural: evaluate(runtime, {
      compoundMatrixStem: "ca",
      subject: "3pl",
      tense: "present",
    }),
    caOptative: evaluate(runtime, {
      compoundMatrixStem: "ca",
      subject: "2sg",
      mood: "optative",
      tense: "nonpast",
    }),
    eHuaCa: evaluate(runtime, {
      sourceStem: "ē-hua",
      verbClass: "A",
      compoundMatrixStem: "ca",
    }),
    caEmbed: evaluate(runtime, { sourceStem: "ca", verbClass: "A" }),
    yaEmbed: evaluate(runtime, { sourceStem: "ya-uh", verbClass: "B" }),
    ittaObservational: evaluate(runtime, {
      sourceStem: "itt-a",
      sourceValence: "specific-projective",
      objectKind: "specific-projective",
      objectPerson: "3sg",
      verbClass: "A",
      compoundMatrixStem: "o",
    }),
    cacNonanimate: evaluate(runtime, {
      sourceStem: "cac",
      verbClass: "B",
    }),
    itzObservational: evaluate(runtime, {
      sourceStem: "itz",
      verbClass: "B",
      compoundItzSense: "observational",
      compoundMatrixStem: "o",
    }),
    itzMotion: evaluate(runtime, {
      sourceStem: "itz",
      verbClass: "B",
      compoundItzSense: "motion",
      compoundMatrixStem: "ya-uh",
    }),
    itzMotionEHuaReversed: evaluate(runtime, {
      sourceStem: "itz",
      verbClass: "B",
      compoundItzSense: "motion",
      compoundMatrixStem: "ē-hua",
      compoundMatrixClass: "B",
      compoundEventOrder: "hysteron-proteron",
      tense: "preterit",
    }),
    huicaCarry: evaluate(runtime, {
      sourceStem: "huīca",
      sourceValence: "tla",
      objectKind: "nonspecific-nonhuman",
      verbClass: "A",
      lateVariant: "huītz-carry",
      compoundMatrixStem: "huī-tz",
      subject: "3pl",
      tense: "preterit-as-present",
    }),
    itquiCarry: evaluate(runtime, {
      sourceStem: "itqui",
      sourceValence: "tla",
      objectKind: "nonspecific-nonhuman",
      verbClass: "A",
      lateVariant: "huītz-carry",
      compoundMatrixStem: "huī-tz",
      subject: "1sg",
      tense: "distant-past-as-past",
    }),
    openTypedCarry: evaluate(runtime, {
      sourceStem: "zamal",
      sourceValence: "tla",
      objectKind: "nonspecific-nonhuman",
      verbClass: "A",
      lateVariant: "huītz-carry",
      compoundMatrixStem: "huī-tz",
    }),
    ordinaryHuicaAnalysis: evaluate(runtime, {
      sourceStem: "huīca",
      sourceValence: "tla",
      objectKind: "nonspecific-nonhuman",
      verbClass: "A",
      compoundMatrixStem: "huī-tz",
    }),
    huallaPreterit: evaluate(runtime, {
      compoundMatrixStem: "huāl-la-uh",
      tense: "preterit",
    }),
    huitzPreteritAsPresent: evaluate(runtime, {
      compoundMatrixStem: "huī-tz",
      subject: "3pl",
      tense: "preterit-as-present",
    }),
    ahciPreterit: evaluate(runtime, {
      compoundMatrixStem: "ahci",
      subject: "1sg",
      tense: "preterit",
    }),
    maniDistantPast: evaluate(runtime, {
      compoundMatrixStem: "mani",
      tense: "distant-past-as-past",
    }),
    ihcaPreteritAsPresent: evaluate(runtime, {
      compoundMatrixStem: "ihca",
      subject: "1sg",
      tense: "preterit-as-present",
    }),
    ihcaDistantPast: evaluate(runtime, {
      compoundMatrixStem: "ihca",
      subject: "1pl",
      tense: "distant-past-as-past",
    }),
    oPreteritAsPresent: evaluate(runtime, {
      compoundMatrixStem: "o",
      subject: "3pl",
      tense: "preterit-as-present",
    }),
    eHuaClassAPreterit: evaluate(runtime, {
      compoundMatrixStem: "ē-hua",
      compoundMatrixClass: "A",
      subject: "1sg",
      tense: "preterit",
    }),
    eHuaClassBPreterit: evaluate(runtime, {
      compoundMatrixStem: "ē-hua",
      compoundMatrixClass: "B",
      subject: "1sg",
      tense: "preterit",
    }),
    quizaPreterit: evaluate(runtime, {
      sourceStem: "quīza",
      verbClass: "B",
      compoundMatrixStem: "quiza",
      subject: "1sg",
      tense: "preterit",
    }),
    huetziPreterit: evaluate(runtime, {
      sourceStem: "miqui",
      verbClass: "B",
      compoundMatrixStem: "huetzi",
      tense: "preterit",
    }),
    huetziReversedPreterit: evaluate(runtime, {
      sourceStem: "miqui",
      verbClass: "B",
      compoundMatrixStem: "huetzi",
      compoundEventOrder: "hysteron-proteron",
      tense: "preterit",
    }),
    tlehcoPresent: evaluate(runtime, {
      sourceStem: "tlal-o-h",
      verbClass: "A",
      compoundMatrixStem: "tlehcō",
    }),
    calAquiPreterit: evaluate(runtime, {
      sourceStem: "tlal-o-h",
      verbClass: "A",
      compoundMatrixStem: "cal-aqui",
      subject: "1pl",
      tense: "preterit",
    }),
    pilCaDistantPast: evaluate(runtime, {
      sourceStem: "cochi",
      verbClass: "B",
      compoundMatrixStem: "pil-ca",
      tense: "distant-past-as-past",
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
      compoundMatrixStem: "quetza",
    }),
    reflexiveMatrixFirstPerson: evaluate(runtime, {
      subject: "1sg",
      lateVariant: "reflexive-matrix",
      compoundMatrixStem: "quetza",
    }),
    reflexiveMatrixSuppliedWrongCarrier: evaluate(runtime, {
      subject: "2sg",
      lateVariant: "reflexive-matrix",
      compoundMatrixStem: "t-o-quetza",
    }),
    reflexiveMatrixTransitiveEmbed: evaluate(runtime, {
      sourceStem: "cui",
      sourceValence: "specific-projective",
      objectKind: "specific-projective",
      objectPerson: "3sg",
      verbClass: "A",
      lateVariant: "reflexive-matrix",
      compoundMatrixStem: "cāhua",
    }),
    arbitraryReflexiveMatrixCore: evaluate(runtime, {
      lateVariant: "reflexive-matrix",
      compoundMatrixStem: "invented",
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
    sharedObjectReflexive: evaluate(runtime, {
      sourceStem: "cui",
      sourceValence: "mainline-reflexive",
      objectKind: "reflexive",
      verbClass: "A",
      subject: "3sg",
      lateVariant: "shared-object",
      compoundMatrixStem: "quetza",
    }),
    sharedObjectEHuaClassA: evaluate(runtime, {
      sourceStem: "ē-hua",
      sourceValence: "specific-projective",
      objectKind: "specific-projective",
      objectPerson: "3sg",
      verbClass: "B",
      lateVariant: "shared-object",
      compoundMatrixStem: "tēca",
    }),
    sharedObjectDistributive: evaluate(runtime, {
      sourceStem: "teh-tēn",
      sourceValence: "specific-projective",
      objectKind: "specific-projective",
      objectPerson: "1pl",
      verbClass: "A",
      lateVariant: "shared-object",
      compoundMatrixStem: "māy-a-hui",
    }),
    futureNequi: evaluate(runtime, {
      sourceStem: "cochi",
      verbClass: "B",
      tense: "present",
      lateVariant: "future-embed",
      compoundMatrixStem: "tla-nequi",
    }),
    futureNequiTransitive: evaluate(runtime, {
      sourceStem: "cōhua",
      sourceValence: "specific-projective",
      objectKind: "specific-projective",
      objectPerson: "3sg",
      verbClass: "A",
      subject: "2sg",
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
    futureQuiTransitive: evaluate(runtime, {
      sourceStem: "cōhua",
      sourceValence: "specific-projective",
      objectKind: "specific-projective",
      objectPerson: "3sg",
      verbClass: "A",
      subject: "1pl",
      tense: "imperfect",
      lateVariant: "future-embed",
      compoundMatrixStem: "tla-qui",
    }),
    futureQuiAntecessive: evaluate(runtime, {
      sourceStem: "cochi",
      verbClass: "B",
      tense: "imperfect",
      sentenceAntecessive: true,
      lateVariant: "future-embed",
      compoundMatrixStem: "tla-qui",
    }),
    futureNequiPassive: evaluate(runtime, {
      ...passiveRequest,
      nonactiveOptionId: passiveOptionId,
      tense: "imperfect",
      lateVariant: "future-embed",
      compoundMatrixStem: "tla-nequi",
      compoundNonactiveScope: "embed",
    }),
    futureNequiImpersonal: evaluate(runtime, {
      ...impersonalRequest,
      nonactiveOptionId: impersonalOptionId,
      tense: "imperfect",
      lateVariant: "future-embed",
      compoundMatrixStem: "tla-nequi",
      compoundNonactiveScope: "embed",
    }),
    hysteronProteron: evaluate(runtime, {
      compoundMatrixStem: "ahci",
      compoundEventOrder: "hysteron-proteron",
    }),
    arbitraryTypedMatrix: evaluate(runtime, {
      compoundMatrixStem: "invented",
      compoundMatrixClass: "A",
    }),
    listedElsewhereTypedMatrix: evaluate(runtime, {
      compoundMatrixStem: "tlāl-i-ā",
      compoundMatrixClass: "A",
    }),
    nonactiveEmbed: evaluate(runtime, {
      ...impersonalRequest,
      nonactiveOptionId: impersonalOptionId,
      compoundNonactiveScope: "embed",
    }),
    passiveEmbed: evaluate(runtime, {
      ...passiveRequest,
      nonactiveOptionId: passiveOptionId,
      compoundMatrixStem: "nemi",
      compoundNonactiveScope: "embed",
    }),
    passiveBoth: evaluate(runtime, {
      ...passiveRequest,
      nonactiveOptionId: passiveOptionId,
      compoundMatrixStem: "nemi",
      compoundNonactiveScope: "both",
    }),
    impersonalMatrix: evaluate(runtime, {
      ...impersonalRequest,
      nonactiveOptionId: impersonalOptionId,
      compoundMatrixStem: "ahci",
      compoundNonactiveScope: "matrix",
    }),
    impersonalBoth: evaluate(runtime, {
      ...impersonalRequest,
      nonactiveOptionId: impersonalOptionId,
      compoundMatrixStem: "ahci",
      compoundNonactiveScope: "both",
    }),
    stativeImpersonalBoth: evaluate(runtime, {
      ...impersonalRequest,
      nonactiveOptionId: impersonalOptionId,
      compoundMatrixStem: "mani",
      compoundNonactiveScope: "both",
    }),
    recursiveEmbed: compact(runtime,
      runtime.evaluateClassicalNahuatlLateVncDerivation(baseRequest({
        sourceStem: recursiveSource.operationFrame?.targetStem,
        subject: "2sg",
        tense: "preterit",
        compoundMatrixStem: "ya-uh",
        compoundEmbedClosureFrame: recursiveSource,
      }))),
    recursiveMatrix: compact(runtime,
      runtime.evaluateClassicalNahuatlLateVncDerivation(baseRequest({
        sourceStem: "ahci",
        subject: "2sg",
        tense: "preterit",
        compoundMatrixClosureFrame: recursiveSource,
      }))),
  };
  cases.intransitiveMatrices = Object.fromEntries(intransitiveMatrices.map(
    matrixStem => [matrixStem, evaluate(runtime, { compoundMatrixStem: matrixStem })],
  ));
  cases.reflexiveMatrices = Object.fromEntries(reflexiveMatrices.map(
    matrixStem => [matrixStem, evaluate(runtime, {
      subject: matrixStem === "m-o-man-a" ? "3pl" : "3sg",
      lateVariant: "reflexive-matrix",
      compoundMatrixStem: matrixStem.replace(/^m-o-/u, ""),
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
    sharedWithoutObject: evaluate(runtime, {
      lateVariant: "shared-object",
      compoundMatrixStem: "tlāl-i-ā",
    }),
    carryWithoutObject: evaluate(runtime, {
      sourceStem: "zamal",
      sourceValence: "intransitive",
      verbClass: "A",
      lateVariant: "huītz-carry",
      compoundMatrixStem: "huī-tz",
    }),
    carryWithoutHuītzMatrix: evaluate(runtime, {
      sourceStem: "zamal",
      sourceValence: "tla",
      objectKind: "nonspecific-nonhuman",
      verbClass: "A",
      lateVariant: "huītz-carry",
      compoundMatrixStem: "nemi",
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
    futureUnknownMatrix: evaluate(runtime, {
      sourceStem: "cochi",
      verbClass: "B",
      tense: "present",
      lateVariant: "future-embed",
      compoundMatrixStem: "invented",
    }),
    invalidEHuaClassHistory: evaluate(runtime, {
      compoundMatrixStem: "ē-hua",
      compoundMatrixClass: "C",
    }),
    invalidEventOrder: evaluate(runtime, {
      compoundMatrixStem: "huetzi",
      compoundEventOrder: "translation-order",
    }),
    passiveMatrixOnly: evaluate(runtime, {
      ...passiveRequest,
      nonactiveOptionId: passiveOptionId,
      compoundMatrixStem: "nemi",
      compoundNonactiveScope: "matrix",
    }),
    impersonalWithoutScope: evaluate(runtime, {
      ...impersonalRequest,
      nonactiveOptionId: impersonalOptionId,
      compoundMatrixStem: "ahci",
      compoundNonactiveScope: "none",
    }),
    activeWithNonactiveScope: evaluate(runtime, {
      compoundMatrixStem: "nemi",
      compoundNonactiveScope: "embed",
    }),
    animateSingularMana: evaluate(runtime, {
      subject: "3sg",
      lateVariant: "reflexive-matrix",
      compoundMatrixStem: "man-a",
      compoundSubjectAnimacy: "animate",
    }),
    firstPersonSingularMana: evaluate(runtime, {
      subject: "1sg",
      lateVariant: "reflexive-matrix",
      compoundMatrixStem: "man-a",
      compoundSubjectAnimacy: "nonanimate",
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
    sharedWithoutObject: "shared-object-coreferential-embed-object-required",
    carryWithoutObject: "huītz-carry-requires-typed-carry-object",
    carryWithoutHuītzMatrix:
      "huītz-carry-requires-typed-huītz-matrix-analysis",
    itzMissingSense: "typed-itz-embed-sense-required",
    animateCac: "cac-embed-requires-nonanimate-subject",
    futureQuiWrongTense: "tla-qui-matrix-is-imperfect-only",
    futureUnknownMatrix:
      "future-embed-matrix-analysis-must-be-nequi-or-qui",
    invalidEHuaClassHistory:
      "e-hua-matrix-requires-licensed-a-or-b-class-history",
    invalidEventOrder: "licensed-compound-event-order-required",
    passiveMatrixOnly:
      "compound-passive-scope-must-be-embed-or-both",
    impersonalWithoutScope:
      "compound-impersonal-scope-must-be-embed-matrix-or-both",
    activeWithNonactiveScope:
      "compound-nonactive-scope-requires-nonactive-voice",
    animateSingularMana:
      "mo-mana-animate-subject-must-be-plural",
    firstPersonSingularMana:
      "mo-mana-animate-subject-must-be-plural",
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
      openTypedMatrixAdmission:
        cases.arbitraryTypedMatrix.facts.openTypedMatrixAdmission,
      canvasMatrixExamplesAreEvidenceOnly:
        cases.arbitraryTypedMatrix.facts.canvasExamplesAreEvidenceOnly,
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
      specialPerfectiveEmbeds: {
        ca: cases.caEmbed.facts.specialPerfectiveEmbedResult,
        yauh: cases.yaEmbed.facts.specialPerfectiveEmbedResult,
        itta: cases.ittaObservational.facts.specialPerfectiveEmbedResult,
      },
      cacReference: {
        animacy: cases.cacNonanimate.facts.cacSubjectAnimacy,
        automatic:
          cases.cacNonanimate.facts.cacAnimacyConsequenceAutomatic,
        readings: cases.cacNonanimate.facts.cacReadingOptions,
      },
      itzSourceAnalyses: {
        observational: cases.itzObservational.facts.itzSourceAnalysis,
        motion: cases.itzMotion.facts.itzSourceAnalysis,
        homophonesRemainDistinct:
          cases.itzMotion.facts.itzHomophonesRemainDistinct,
        userResolvesTypedIdentity:
          cases.itzMotion.facts.itzSourceAnalysisIsUserChoice,
      },
      nonactiveScopeSystem: {
        passiveScopes: cases.passiveEmbed.facts.passiveScopeOptions,
        impersonalScopes: cases.nonactiveEmbed.facts.impersonalScopeOptions,
        passiveEmbed: cases.passiveEmbed.facts.nonactiveScope,
        passiveBoth: cases.passiveBoth.facts.nonactiveScope,
        impersonalEmbed: cases.nonactiveEmbed.facts.nonactiveScope,
        impersonalMatrix: cases.impersonalMatrix.facts.nonactiveScope,
        impersonalBoth: cases.impersonalBoth.facts.nonactiveScope,
        stativePreference:
          cases.stativeImpersonalBoth.facts.stativeMatrixPrefersEmbedOnly,
        stativePreferenceNotAbsolute:
          cases.stativeImpersonalBoth.facts
            .stativeMatrixPreferenceIsNotAbsolute,
        suffixesDerivedAutomatically:
          cases.impersonalBoth.facts.nonactiveSuffixesDerivedAutomatically,
      },
      selectedMatrixProfiles: {
        ca: {
          singularPresent:
            cases.intransitiveMatrices.ca.facts.matrixFiniteStem,
          pluralPresent: cases.caPresentPlural.facts.matrixFiniteStem,
          optative: cases.caOptative.facts.matrixFiniteStem,
          readings: cases.intransitiveMatrices.ca.facts.matrixReadingOptions,
        },
        nemi: {
          present: cases.intransitiveMatrices.nemi.facts.matrixFiniteStem,
          preterit: cases.preteritEmbed.facts.matrixFiniteStem,
          readings: cases.intransitiveMatrices.nemi.facts.matrixReadingOptions,
        },
        "ya-uh": {
          singularPresent:
            cases.intransitiveMatrices["ya-uh"].facts.matrixFiniteStem,
          pluralPresent: cases.yaPresentPlural.facts.matrixFiniteStem,
          future: cases.unsyncopatedYaFuture.facts.matrixFiniteStem,
          readings:
            cases.intransitiveMatrices["ya-uh"].facts.matrixReadingOptions,
        },
        "huāl-la-uh": {
          present:
            cases.intransitiveMatrices["huāl-la-uh"].facts.matrixFiniteStem,
          preterit: cases.huallaPreterit.facts.matrixFiniteStem,
          directionalRetained:
            cases.intransitiveMatrices["huāl-la-uh"].facts
              .hualDirectionalRetained,
          readings:
            cases.intransitiveMatrices["huāl-la-uh"].facts
              .matrixReadingOptions,
        },
        "huī-tz": {
          ordinaryPreteritAsPresent:
            cases.huitzPreteritAsPresent.facts.matrixFiniteStem,
          ordinaryLinkage:
            cases.huitzPreteritAsPresent.facts.linkage,
          carryFiniteShape: cases.huicaCarry.facts.matrixFiniteStem,
          carryLinkage: cases.huicaCarry.facts.linkage,
          readings:
            cases.intransitiveMatrices["huī-tz"].facts
              .matrixReadingOptions,
        },
        ahci: {
          preterit: cases.ahciPreterit.facts.matrixFiniteStem,
          readings:
            cases.intransitiveMatrices.ahci.facts.matrixReadingOptions,
        },
        mani: {
          present: cases.intransitiveMatrices.mani.facts.matrixFiniteStem,
          distantPast: cases.maniDistantPast.facts.matrixFiniteStem,
          readings:
            cases.intransitiveMatrices.mani.facts.matrixReadingOptions,
        },
        ihca: {
          preteritAsPresent:
            cases.ihcaPreteritAsPresent.facts.matrixFiniteStem,
          distantPast: cases.ihcaDistantPast.facts.matrixFiniteStem,
          readings:
            cases.intransitiveMatrices.ihca.facts.matrixReadingOptions,
        },
        o: {
          preteritAsPresent: cases.oPreteritAsPresent.facts.matrixFiniteStem,
          locativeOnOmitted: cases.oPreteritAsPresent.facts.oLocativeOnOmitted,
          readings: cases.oPreteritAsPresent.facts.matrixReadingOptions,
        },
        "ē-hua": {
          classA: cases.eHuaClassAPreterit.facts.eHuaSelectedMatrixClass,
          classB: cases.eHuaClassBPreterit.facts.eHuaSelectedMatrixClass,
          licensedClasses:
            cases.eHuaClassAPreterit.facts.eHuaLicensedMatrixClasses,
          classAPreterit: cases.eHuaClassAPreterit.facts.matrixFiniteStem,
          classBPreterit: cases.eHuaClassBPreterit.facts.matrixFiniteStem,
          readings: cases.eHuaClassAPreterit.facts.matrixReadingOptions,
        },
        quiza: {
          preterit: cases.quizaPreterit.facts.matrixFiniteStem,
          readings: cases.quizaPreterit.facts.matrixReadingOptions,
        },
        huetzi: {
          preterit: cases.huetziPreterit.facts.matrixFiniteStem,
          ordinaryEventOrder: cases.huetziPreterit.facts.eventOrder,
          reversedEventOrder:
            cases.huetziReversedPreterit.facts.eventOrder,
          surfaceOrder:
            cases.huetziReversedPreterit.facts.surfaceConstituentOrder,
          readings: cases.huetziPreterit.facts.matrixReadingOptions,
        },
        tlehcō: {
          present: cases.tlehcoPresent.facts.matrixFiniteStem,
          readings: cases.tlehcoPresent.facts.matrixReadingOptions,
        },
        "cal-aqui": {
          preterit: cases.calAquiPreterit.facts.matrixFiniteStem,
          readings: cases.calAquiPreterit.facts.matrixReadingOptions,
        },
        "pil-ca": {
          distantPast: cases.pilCaDistantPast.facts.matrixFiniteStem,
          readings: cases.pilCaDistantPast.facts.matrixReadingOptions,
        },
      },
      typedCarryConstruction: {
        userSelectsAnalysis: true,
        huicaShape: cases.huicaCarry.targetStem,
        itquiShape: cases.itquiCarry.targetStem,
        arbitraryTypedShape: cases.openTypedCarry.targetStem,
        openTypedSourceAdmission:
          cases.openTypedCarry.facts.openTypedCarrySourceAdmission,
        stemWhitelistUsed:
          cases.openTypedCarry.facts.carrySourceStemWhitelistUsed,
        shapeDerived:
          cases.openTypedCarry.facts.specialCarryStemDerivedFromShape,
        matrixPerfective:
          cases.openTypedCarry.facts.carryMatrixPerfectiveStem,
        connectiveProhibited:
          cases.openTypedCarry.facts.prohibitedConnectiveT,
        ordinaryAnalysisRemainsTypedAndOpen:
          cases.ordinaryHuicaAnalysis.facts.selectedMatrixAnalysis,
      },
      optionalYaSyncopation: {
        unsyncopated:
          cases.unsyncopatedYaFuture.facts.yaUnsyncopatedSequence,
        syncopated: cases.syncopatedYa.facts.yaSyncopatedSequence,
        preteritSyncopated:
          cases.syncopatedYaPreterit.facts.yaSyncopatedSequence,
        userChoice: true,
      },
      connectiveCausativeStructuralDistinction:
        cases.intransitiveMatrices["ya-uh"].facts
          .connectiveCausativeStructurallyDistinct,
      traditionalSpellingAnalysisChoices:
        cases.intransitiveMatrices["ya-uh"].facts
          .traditionalSpellingAnalysisChoices,
      eHuaCaIdiomaticReadingAvailable:
        cases.eHuaCa.facts.eHuaCaIdiomaticReadingAvailable,
      defaultEventOrder: "embed-before-matrix",
      reversedEventOrder:
        cases.hysteronProteron.facts.eventOrder,
      eventOrderInterpretationOnly:
        cases.huetziReversedPreterit.facts
          .eventOrderChoiceChangesInterpretationOnly,
      reversedEventOrderKeepsSurfaceOrder:
        cases.huetziReversedPreterit.facts.surfaceConstituentOrder,
      intransitiveMatrixInventory: intransitiveMatrices,
      intransitiveMatrixExamplesNonexhaustive: true,
      reflexiveMatrixInventory: reflexiveMatrices,
      reflexiveMatrixSystem: {
        typedRole: cases.reflexiveMatrix.facts.typedReflexiveMatrixRole,
        fixedCarrier: cases.reflexiveMatrix.facts.fixedReflexiveCarrier,
        fixedRegardlessOfSubject:
          cases.reflexiveMatrixFirstPerson.facts
            .fixedReflexiveCarrierRegardlessOfSubject,
        personMarkedCarrierReplaced:
          cases.reflexiveMatrixSuppliedWrongCarrier.facts
            .suppliedPersonMarkedReflexiveCarrierReplaced,
        transitivityGrounded:
          cases.reflexiveMatrix.facts
            .matrixTransitivityDischargedOntoFusedReflexive,
        structurallyIntransitive:
          cases.reflexiveMatrix.facts
            .reflexiveCoreStructurallyIntransitiveInCompound,
        embedDeterminesValence:
          cases.reflexiveMatrixTransitiveEmbed.facts
            .embedDeterminesCompoundValence,
        transitiveEmbedResultValence:
          cases.reflexiveMatrixTransitiveEmbed.targetValence,
        openTypedCore:
          cases.arbitraryReflexiveMatrixCore.facts
            .openTypedMatrixAdmission,
        stemWhitelistUsed:
          cases.arbitraryReflexiveMatrixCore.facts
            .reflexiveMatrixStemWhitelistUsed,
        animateManaRestriction:
          blockedCases.animateSingularMana.blockReason,
        firstSecondPersonAnimacyDerived:
          blockedCases.firstPersonSingularMana.blockReason,
      },
      sharedObjectMatrixInventory: sharedObjectMatrices,
      futureEmbedMatrixInventory: ["tla-nequi", "tla-qui"],
      futureEmbedSystem: {
        supplementationAuthority:
          cases.futureNequi.facts.futureSupplementSourceKind,
        futureSupplementAuthorized:
          cases.futureNequi.facts.futureSupplementationAuthorized,
        supplementFunctionsAsObject:
          cases.futureNequi.facts.futureSupplementFunctionsAsObject,
        matrixObjectReplaced:
          cases.futureNequi.facts.matrixObjectReplacedByFuturePredicate,
        matrixObjectCarrierSuppressed:
          cases.futureNequi.facts.matrixObjectCarrierSuppressed,
        intransitiveStem: cases.futureNequi.targetStem,
        transitiveStem: cases.futureNequiTransitive.targetStem,
        transitiveValence: cases.futureNequiTransitive.targetValence,
        embedTense: cases.futureNequi.facts.futureEmbedTense,
        embedTenseMorph: cases.futureNequi.facts.futureEmbedTenseMorph,
        matrixTense: cases.futureNequi.facts.matrixFiniteTense,
        laterEmbedAction:
          cases.futureNequi.facts.futureEmbedActionAfterMatrixAction,
        nequiAnalysis: cases.futureNequi.facts.futureMatrixAnalysisId,
        quiAnalysis: cases.futureQui.facts.futureMatrixAnalysisId,
        quiTransitiveStem: cases.futureQuiTransitive.targetStem,
        quiImperfectOnly: cases.futureQui.facts.quiMatrixImperfectOnly,
        conditionalIsReading:
          cases.futureQui.facts.traditionalConditionalIsReadingNotTense,
        passiveEmbed: cases.futureNequiPassive.facts.nonactiveScope,
        impersonalEmbed: cases.futureNequiImpersonal.facts.nonactiveScope,
        antecessiveAvailable:
          cases.futureQuiAntecessive.facts.antecessiveOrderAvailable,
        antecessiveRequested:
          cases.futureQuiAntecessive.facts.antecessiveOrderRequested,
        includedReferentSupplementation:
          cases.futureQui.facts.includedReferentSupplementationAvailable,
        subjectsCoreferential:
          cases.futureQui.facts
            .principalAndSupplementSubjectsCoreferential,
        matrixConstructionInventoryOnly: true,
        sourceStemAdmissionOpen: true,
        stemWhitelistUsed:
          cases.futureNequi.facts.futureMatrixStemWhitelistUsed,
      },
      sharedObjectPronounManifestation: "single-on-embed",
      sharedObjectKinds: ["reflexive", "projective"],
      sharedObjectCoreferenceAuthority: "typed-referent-identity",
      sharedObjectReferentChoicePolicy:
        "only-when-more-than-one-typed-referent-can-be-shared",
      sharedObjectCarrierAuthority: "derived-single-embed-carrier",
      sharedObjectMatrixReadings: Object.fromEntries(sharedObjectMatrices.map(
        matrixStem => [
          matrixStem,
          [...(cases.sharedObjectMatrices[matrixStem].facts.matrixReadingOptions || [])],
        ],
      )),
      futureEmbedObjectFunction:
        cases.futureNequi.facts.futureSupplementFunctionsAsObject,
      recursiveTypedClosureRequired: true,
      recursiveCompoundingSystem: {
        capturedResultRoles: ["embed", "matrix"],
        roleIsUserChoice:
          cases.recursiveEmbed.facts.recursiveRoleIsUserChoice,
        embedReuseAuthorized:
          cases.recursiveEmbed.authorizationStatus === "authorized",
        matrixReuseAuthorized:
          cases.recursiveMatrix.authorizationStatus === "authorized",
        binaryConstituentCount:
          cases.recursiveEmbed.facts.recursiveBinaryConstituentCount,
        hierarchyAcyclic:
          cases.recursiveEmbed.facts.recursiveHierarchyAcyclic,
        sourceLinksPreserved:
          cases.recursiveEmbed.facts.recursiveSourceLinksPreserved,
        localRulesIndependent:
          cases.recursiveEmbed.facts.recursiveLocalRulesIndependent,
        localConnectiveDerived:
          cases.recursiveEmbed.facts.recursiveLocalConnectiveDerived,
        outerEmbedDeterminesValence:
          cases.recursiveEmbed.facts
            .recursiveValenceInheritedFromOuterEmbed,
        participantsPreserved:
          cases.recursiveEmbed.facts.recursiveParticipantsPreserved,
        finiteBoundaryOutsideCompletedCompound:
          cases.recursiveEmbed.facts
            .recursiveFiniteBoundaryOutsideCompletedCompound,
        continuationAvailable:
          cases.recursiveEmbed.facts.recursiveContinuationAvailable,
        exampleStemWhitelistUsed:
          cases.recursiveEmbed.facts.recursiveExampleStemWhitelistUsed,
        manualDepthControlRequired:
          cases.recursiveEmbed.facts.recursiveManualDepthControlRequired,
        manualConnectiveControlRequired:
          cases.recursiveEmbed.facts
            .recursiveManualConnectiveControlRequired,
        manualParticipantCopyingRequired:
          cases.recursiveEmbed.facts
            .recursiveManualParticipantCopyingRequired,
      },
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
