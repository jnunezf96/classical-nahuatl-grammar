// Non-authorizing live projection for canonical adverbial-adjunction
// semantics. It shares typed source construction and result summarization;
// every semantic owner still retains independent atoms, routes, receipts,
// provenance, proof addresses, and migration status.

const ISSUED_VALIDATION_FRAMES = new WeakSet();

function deepFreeze(value, seen = new WeakSet()) {
  if (!value || typeof value !== "object" || seen.has(value)) return value;
  seen.add(value);
  for (const key of Reflect.ownKeys(value)) {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (descriptor && Object.prototype.hasOwnProperty.call(descriptor, "value")) {
      deepFreeze(descriptor.value, seen);
    }
  }
  return Object.freeze(value);
}

function assertRuntime(target, name) {
  if (typeof target?.[name] !== "function") {
    throw new Error(`adverbial-adjunction-validation-capability-required:${name}`);
  }
}

const PROFILE_FACTS = Object.freeze({
  "simple-definition": { simpleRequiresNonrecursiveUnits: true },
  "simple-order-reverse": { modifierNormallyPrecedesHead: true, headModifierOrderLicensed: true },
  "metaphorical-supplement-contrast": { metaphoricalSupplementIsNotAdverbialAdjunction: true },
  "incorporated-counterpart-contrast": { incorporatedAdverbHasSingleNucleus: true },
  "third-singular-ambiguity": { thirdSingularAllowsSupplementAmbiguity: true },
  "compared-manner-counterpart": { comparedMannerCompoundIsSingleNucleus: true },
  "multiple-nucleus-simple": { simpleAdjunctionAllowsMultipleNucleusUnits: true },
  "recursion-system": { headOrModifierOrBothMayRecurse: true },
  "head-recursion": { recursiveHeadRequiresIssuedPriorComposition: true },
  "cuix-recursive-interrogative": { cuixMayModifyRecursiveAdjunction: true },
  "inherent-interrogative-order": { inherentlyInterrogativeModifierRetainsForce: true },
  "cuix-first-order": { cuixPrecedesWhenNoInherentInterrogative: true },
  "mach-recursive-interrogative": { inherentlyInterrogativeModifierMayModifyMachStructure: true },
  "interrogative-nel-collocation": { nelFollowsInterrogativeAdverbial: true },
  "interrogative-spelling-analysis": { traditionalSpellingAuthorizesStructure: false },
  "modifier-recursion": { recursiveModifierRequiresIssuedPriorComposition: true },
  "particle-adverbial-collocation": { particleMayModifyAdverbializedNnc: true },
  "collocation-translation-analysis": { translationCompositionAuthorizesStructure: false },
  "intensifier-capability": { adverbialNncMayIntensify: true },
  "intensifier-order-translation": { intensifierPrecedesHead: true, translationAuthorizesStructure: false },
  "intensifier-inventory-analysis": { inventoryHeadingAuthorizesStructure: false },
  "negative-niman-intensifier": { negativeScopeIntensifierLicensed: true },
  "particle-intensifier": { particleIntensifierLicensed: true },
  "lexicalized-intensifier-collocation": { lexicalizedIntensifierCollocationLicensed: true },
  "adjectival-head-intensifier": { intensifierMayModifyAdjectivalNnc: true },
  "recursive-intensifier": { intensifierMayRecurseInsideModifier: true },
  "place-time-apposition": { generalPlaceOrTimePrecedesSpecificNnc: true },
  "modification-conjunction-contrast": { modificationAndConjunctionRemainSeparate: true },
  "both-sides-recursion": { bothHeadAndModifierMayRecurse: true },
  "recursive-complexity": { recursionDepthIsNotLessonBounded: true },
  "principal-adverbial-construction": { adverbialClauseMayBePrincipalUnit: true },
  "interrogative-adjunctor-boundary": { adjunctorSeparatesBeforeAdjoinedClause: true },
  "quen-adjunctor-exception": { quenRejectsSeparateAdjunctor: true },
  "larger-sentence-deinterrogation": { includedInterrogativeLosesQuestionForce: true },
  "relation-system": { nonadverbializedAdjunctionLicensed: true, relationTypeCount: 10 },
  "time-implicit": { timeMayBeImplicit: true },
  "time-iuhqui": { temporalIuhquiLicensed: true },
  "time-elliptical": { temporalIuhquiMayBeElliptical: true },
  "time-one-out-of-number": { oneOutOfNumberTemporalExtensionLicensed: true },
  "time-explicit": { explicitTemporalAdverbialLicensed: true },
  "time-ic-alternative": { possessiveIcTemporalAlternativeLicensed: true },
  "time-alternative-expression": { alternativeTemporalExpressionIsEvidenceOnly: true },
  "time-oc-modifier": { ocMayModifyTemporalIc: true },
  "time-other-expression": { otherTemporalEmbedsLicensed: true },
  "time-demonstrative-subject": { demonstrativeSubjectWithAdverbialPredicateLicensed: true },
  "time-downgrade": { downgradeToMultipleNucleusLicensed: true },
  "place-relation": { locativeAdjoinedClauseLicensed: true },
  "place-spelling-analysis": { traditionalSpellingAuthorizesStructure: false },
  "place-reduced-copula": { reducedCopulaAnalysisLicensed: true },
  "place-structural-ambiguity": { placeStructureMayCompeteWithApposition: true },
  "manner-relation": { mannerAdjoinedClauseLicensed: true },
  "consideration-relation": { considerationAdjoinedClauseLicensed: true },
  "consideration-reflexive": { reflexivePrincipalSupportsConsiderationAnalysis: true },
  "consideration-projective": { nonspecificProjectiveObjectBlocksIncludedReferentAnalysis: true },
  "consideration-shared-reference": { sharedReferenceDoesNotCollapseSupplementationAndAdjunction: true },
  "purpose-future": { futurePurposeIsUsual: true },
  "purpose-other-tense": { nonfuturePurposeIsLicensed: true },
  "purpose-purposive-vnc": { purposiveVncMayServeAsAdjunct: true },
  "purpose-adjectival-ambiguity": { purposeMayCompeteWithAdjectivalClause: true },
  "purpose-in-optional": { purposeAdjunctorMayBeAbsent: true },
  "purpose-ma-optative": { maOptativePurposeLicensed: true },
  "condition-core": { conditionRelationLicensed: true },
  "condition-marker": { tlaIntroducesCondition: true },
  "condition-in-optional": { conditionAdjunctorOptionalityLicensed: true },
  "condition-sentence-types": { principalSentenceTypeCount: 5 },
  "condition-order": { conditionMayPrecedeOrFollowPrincipal: true },
  "condition-open-hypothetical": { openAndHypotheticalRemainSeparate: true },
  "condition-nnc-center": { nncMayCenterConditionAdjunct: true },
  "condition-supplement-analysis": { supplementationClaimAuthorizesCondition: false },
  "condition-negative": { negativeConditionalMarkerLicensed: true },
  "condition-vnc-center": { vncMayCenterConditionAdjunct: true },
  "condition-optative-tense": { futureAndPreteritOptativeLicensed: true },
  "condition-form-ambiguity": { formIdentityDoesNotSelectMood: true },
  "condition-present-for-past": { presentIndicativeMayStandForPast: true },
  "condition-until": { negativeTemporalConditionalMayExpressUntil: true },
  "condition-hypothetical-present-future": { presentFutureHypothesisRequiresPastOptative: true },
  "condition-antecessive-absent": { presentFutureHypothesisRequiresAbsentAntecessive: true },
  "condition-future-embed": { hypotheticalPrincipalRequiresFutureEmbed: true },
  "condition-hypothetical-past": { pastHypothesisRequiresPastOptative: true },
  "condition-antecessive-match": { pastAntecessiveMustMatchAcrossClauses: true },
  "condition-context-without-prefix": { absentAntecessiveLeavesContextualTime: true },
  "condition-prefix-strict-past": { matchedAntecessiveSelectsStrictPast: true },
  "condition-tla-omission": { tlaMayBeOmittedWithConditionalCue: true },
  "concession-in-tla-nel": { inTlaNelConcessionLicensed: true },
  "concession-intensifier": { concessionMayTakeIntensivePronoun: true },
  "concession-spelling-analysis": { traditionalSpellingAuthorizesStructure: false },
  "concession-morphology-analysis": { storedMorphologicalAnalysisAuthorizesAdjunction: false },
  "concession-in-ma-nel": { inMaNelConcessionLicensed: true },
  "concession-ma-zo": { maZoConcessionLicensed: true },
  "concession-example-spelling-analysis": { exampleSpellingAuthorizesStructure: false },
  "concession-ma-zo-tel": { maZoTelConcessionLicensed: true },
  "concession-zan-za": { zanAndZaRemainSemanticallyDistinct: true },
  "concession-source-analysis": { reportedSourceJudgmentAuthorizesStructure: false },
  "reason-ca-juxtaposition": { caIntroducesPrincipalClause: true },
  "reason-ca-not-conjunction": { caIsConjunction: false },
  "reason-translation-analysis": { dictionaryTranslationAuthorizesStructure: false },
  "reason-camo-spelling-analysis": { traditionalCamoSpellingAuthorizesReason: false },
  "collocation-spelling-analysis": { traditionalSpellingAuthorizesStructure: false },
});

function profileKind(profileId) {
  if (profileId.includes("recursion") || profileId.includes("interrogative")) return "recursive-head";
  if (profileId.includes("apposition")) return "apposition";
  if (profileId.includes("intensifier")) return "intensifier";
  if (profileId.startsWith("time-")) return "time";
  if (profileId.startsWith("place-")) return "place";
  if (profileId.startsWith("manner-")) return "manner";
  if (profileId.startsWith("consideration-")) return "consideration";
  if (profileId.startsWith("purpose-")) return profileId === "purpose-ma-optative" ? "purpose-ma" : "purpose";
  if (profileId.startsWith("condition-hypothetical-present-future")
    || profileId.startsWith("condition-antecessive-absent")
    || profileId.startsWith("condition-future-embed")
    || profileId.startsWith("condition-context-without-prefix")) {
    return "condition-hypothetical-present-future";
  }
  if (profileId.startsWith("condition-hypothetical-past")
    || profileId.startsWith("condition-antecessive-match")
    || profileId.startsWith("condition-prefix-strict-past")) return "condition-hypothetical-past";
  if (profileId.startsWith("condition-")) return "condition-open";
  if (profileId.startsWith("concession-in-ma-nel")) return "concession-in-ma-nel";
  if (profileId.startsWith("concession-ma-zo-tel")) return "concession-ma-zo-tel";
  if (profileId.startsWith("concession-ma-zo") || profileId.startsWith("concession-zan-za")) return "concession-ma-zo";
  if (profileId.startsWith("concession-")) return "concession-in-tla-nel";
  if (profileId.startsWith("reason-")) return "reason";
  if (profileId === "principal-adverbial-construction") return "principal-adverbial";
  if (profileId === "simple-order-reverse") return "simple-reverse";
  if (profileId === "compared-manner-counterpart" || profileId === "third-singular-ambiguity"
    || profileId === "incorporated-counterpart-contrast" || profileId === "metaphorical-supplement-contrast") {
    return "compared-manner";
  }
  return "simple";
}

export function createClassicalAdverbialAdjunctionValidationSemanticOperationsApi(
  targetObject = globalThis,
) {
  const target = targetObject && typeof targetObject === "object" ? targetObject : globalThis;

  function vnc({ mood = "indicative", tense = "present", antecessive = false } = {}) {
    return target.requestClassicalVncApplicationResult({
      sourceStem: "cati",
      verbClass: "B",
      sourceValence: "intransitive",
      subject: "3sg",
      mood,
      tense,
      requestedVoice: "active",
      sentenceAntecessive: antecessive,
    });
  }

  function futureEmbed({ antecessive = false } = {}) {
    return target.requestClassicalLateVncOperation({
      sourceStem: "cochi",
      sourceValence: "intransitive",
      verbClass: "B",
      subject: "3sg",
      mood: "indicative",
      tense: "imperfect",
      derivationType: "direct",
      voice: "active",
      sentenceAntecessive: antecessive,
      lateOperation: "compound",
      lateVariant: "future-embed",
      compoundMatrixStem: "tla-qui",
    });
  }

  function place(usage = "adverbial") {
    return target.requestClassicalPlaceGentilicResult({
      constructionKind: "place-name",
      formation: "co",
      source: { embedStem: usage === "predicate" ? "Cal" : "Tlach" },
      usage,
    });
  }

  function sentence() {
    return target.requestClassicalVncSentenceResultFrame(vnc());
  }

  function adverbialIuh() {
    const source = target.resolveClassicalNahuatlAdverbialPotential({
      stem: "iuh",
      clauseKind: "vnc",
    });
    return target.requestClassicalAdverbialNncResult({ adverbialPotentialFrame: source });
  }

  function marker(id) {
    return target.requestClassicalParticleResult(id);
  }

  function baseRequest(overrides = {}) {
    return {
      principalClause: vnc(),
      adjoinedUnit: place(),
      semanticRelation: "place",
      adverbializationDegree: "first",
      structureKind: "simple",
      adjoinedUnitType: "nnc",
      order: "modifier-head",
      recursion: "none",
      marking: "unmarked",
      ...overrides,
    };
  }

  function evaluateProfile(kind, profileId = "") {
    if (kind === "simple-reverse") {
      return target.evaluateAdverbialAdjunction(baseRequest({ order: "head-modifier" }));
    }
    if (kind === "compared-manner") {
      return target.evaluateAdverbialAdjunction(baseRequest({
        semanticRelation: "compared-manner",
        contrast: "adverbial-modification",
      }));
    }
    if (kind === "recursive-head") {
      const inner = target.evaluateAdverbialAdjunction(baseRequest({
        semanticRelation: "manner",
        adverbializationDegree: "second",
      }));
      return target.evaluateAdverbialAdjunction(baseRequest({
        principalClause: inner,
        semanticRelation: "time",
        adverbializationDegree: "second",
        structureKind: "complex",
        recursion: "head",
        inherentlyInterrogative: true,
      }));
    }
    if (kind === "apposition") {
      return target.evaluateAdverbialAdjunction(baseRequest({
        principalClause: place("predicate"),
        structureKind: "apposition",
        adverbializationDegree: "second",
        order: "appositive-head-modifier",
        recursion: "appositive",
      }));
    }
    if (kind === "intensifier") {
      return target.evaluateAdverbialAdjunction(baseRequest({ intensifier: true }));
    }
    if (kind === "principal-adverbial") {
      return target.evaluateAdverbialAdjunction(baseRequest({
        structureKind: "adverbial-principal",
        order: "principal-adverbial-head",
      }));
    }
    if (["time", "place", "manner", "consideration"].includes(kind)) {
      const timeProfiles = {
        "time-implicit": "implicit",
        "time-iuhqui": "iuhqui",
        "time-elliptical": "elliptical",
        "time-one-out-of-number": "one-out-of-number",
      };
      return target.evaluateAdverbialAdjunction(baseRequest({
        semanticRelation: kind,
        adverbializationDegree: "nonadverbialized",
        structureKind: "complex",
        timeProfile: kind === "time" ? timeProfiles[profileId] || "explicit" : "unknown",
        explicitAdverbialIndicator: kind === "time",
        contrast: kind === "consideration" ? "adverbial-modification" : "unknown",
      }));
    }
    if (kind === "purpose" || kind === "purpose-ma") {
      const marked = kind === "purpose-ma";
      return target.evaluateAdverbialAdjunction(baseRequest({
        adjoinedUnit: vnc(marked
          ? { mood: "optative", tense: "nonpast" }
          : { mood: "indicative", tense: "future" }),
        markerUnit: marked ? marker("l3-ma") : undefined,
        semanticRelation: "purpose",
        adverbializationDegree: "nonadverbialized",
        structureKind: "complex",
        adjoinedUnitType: "vnc",
        marking: marked ? "ma" : "unmarked",
        purposeType: marked ? "ma-optative" : "unmarked",
      }));
    }
    if (kind === "condition-open") {
      return target.evaluateAdverbialAdjunction(baseRequest({
        adjoinedUnit: vnc({ mood: "optative", tense: "nonpast" }),
        markerUnit: marker("l3-in-tla"),
        semanticRelation: "condition",
        adverbializationDegree: "nonadverbialized",
        structureKind: "complex",
        adjoinedUnitType: "vnc",
        marking: "in-tla",
        conditionType: "open",
      }));
    }
    if (kind === "condition-hypothetical-past") {
      return target.evaluateAdverbialAdjunction(baseRequest({
        principalClause: futureEmbed({ antecessive: true }),
        adjoinedUnit: vnc({ mood: "optative", tense: "past", antecessive: true }),
        markerUnit: marker("l3-in-tla"),
        semanticRelation: "condition",
        adverbializationDegree: "nonadverbialized",
        structureKind: "complex",
        adjoinedUnitType: "vnc",
        marking: "in-tla",
        conditionType: "hypothetical-past",
      }));
    }
    if (kind === "condition-hypothetical-present-future") {
      return target.evaluateAdverbialAdjunction(baseRequest({
        principalClause: futureEmbed({ antecessive: false }),
        adjoinedUnit: vnc({ mood: "optative", tense: "past", antecessive: false }),
        markerUnit: marker("l3-in-tla"),
        semanticRelation: "condition",
        adverbializationDegree: "nonadverbialized",
        structureKind: "complex",
        adjoinedUnitType: "vnc",
        marking: "in-tla",
        conditionType: "hypothetical-present-future",
      }));
    }
    if (kind.startsWith("concession-")) {
      const profiles = {
        "concession-in-tla-nel": ["in-tla-nel", "l3-in-tla", "in-tla-nel"],
        "concession-in-ma-nel": ["in-ma-nel", "l3-ma", "in-ma-nel"],
        "concession-ma-zo": ["ma-zo", "l3-ma-zo", "ma-zo"],
        "concession-ma-zo-tel": ["ma-zo-tel", "l3-ma-zo-tel", "ma-zo-tel"],
      };
      const [marking, particleId, concessionType] = profiles[kind];
      return target.evaluateAdverbialAdjunction(baseRequest({
        markerUnit: marker(particleId),
        semanticRelation: "concession",
        adverbializationDegree: "nonadverbialized",
        structureKind: "complex",
        marking,
        concessionType,
      }));
    }
    if (kind === "reason") {
      return target.evaluateAdverbialAdjunction(baseRequest({
        adjoinedUnit: sentence(),
        markerUnit: marker("l3-ca"),
        semanticRelation: "reason",
        adverbializationDegree: "nonadverbialized",
        structureKind: "complex",
        adjoinedUnitType: "sentence",
        order: "head-modifier",
        marking: "ca",
      }));
    }
    if (kind === "consequence") {
      return target.evaluateAdverbialAdjunction(baseRequest({
        adjoinedUnit: adverbialIuh(),
        semanticRelation: "consequence",
        adverbializationDegree: "nonadverbialized",
        structureKind: "complex",
      }));
    }
    if (kind === "proviso") {
      return target.evaluateAdverbialAdjunction(baseRequest({
        adjoinedUnit: sentence(),
        markerUnit: marker("l3-ahzo"),
        semanticRelation: "proviso",
        adverbializationDegree: "nonadverbialized",
        structureKind: "complex",
        adjoinedUnitType: "sentence",
        marking: "ahzo",
      }));
    }
    return target.evaluateAdverbialAdjunction(baseRequest());
  }

  function evaluateRelationSet() {
    return [
      ["time", "time", "time-explicit"],
      ["place", "place", "place-relation"],
      ["manner", "manner", "manner-relation"],
      ["consideration", "consideration", "consideration-relation"],
      ["purpose", "purpose", "purpose-future"],
      ["condition", "condition-open", "condition-core"],
      ["concession", "concession-ma-zo", "concession-ma-zo"],
      ["consequence", "consequence", "relation-system"],
      ["proviso", "proviso", "relation-system"],
      ["reason", "reason", "reason-ca-not-conjunction"],
    ].map(([relation, kind, profileId]) => ({
      relation,
      ...summarize(evaluateProfile(kind, profileId)),
    }));
  }

  function summarize(result) {
    return deepFreeze({
      canonicalResult: target.isAdverbialAdjunctionResult(result) === true,
      authorizationStatus: result?.ok === true && result?.supported === true
        ? "authorized" : "blocked",
      relation: result?.ruleProfile?.relation || "",
      degree: result?.ruleProfile?.degree || "",
      structure: result?.ruleProfile?.structure || "",
      order: result?.ruleProfile?.order || "",
      recursion: result?.ruleProfile?.recursion || "",
      marking: result?.ruleProfile?.marking || "",
      conditionType: result?.ruleProfile?.conditionType || "",
      purposeType: result?.ruleProfile?.purposeType || "",
      concessionType: result?.ruleProfile?.concessionType || "",
      sourcePrincipalKind: result?.sourceContract?.principal?.sourceKind || "",
      sourceAdjoinedKind: result?.sourceContract?.adjoined?.sourceKind || "",
      caIsConjunction: result?.relationContract?.caIsConjunction ?? null,
      translationMirage: result?.relationContract?.translationMirage === true,
      generationAllowed: result?.generationAllowed === true,
      newWordGenerationAllowed: result?.newWordGenerationAllowed === true,
      formulaIndependentOfWritten:
        result?.grammarFrame?.resultFrame?.formulaRecord?.formula
        !== result?.grammarFrame?.resultFrame?.formulaRealizationRecord?.surface,
      diagnostics: result?.diagnostics || [],
      liveResult: result,
    });
  }

  function buildClassicalAdverbialAdjunctionValidationFrame(profileId = "simple-definition") {
    for (const capability of [
      "evaluateAdverbialAdjunction",
      "isAdverbialAdjunctionResult",
      "requestClassicalVncApplicationResult",
      "requestClassicalVncSentenceResultFrame",
      "requestClassicalPlaceGentilicResult",
      "requestClassicalParticleResult",
      "resolveClassicalNahuatlAdverbialPotential",
      "requestClassicalAdverbialNncResult",
      "requestClassicalLateVncOperation",
    ]) assertRuntime(target, capability);
    const facts = PROFILE_FACTS[profileId];
    if (!facts) throw new Error(`adverbial-adjunction-validation-profile-required:${profileId}`);
    const result = summarize(evaluateProfile(profileKind(profileId), profileId));
    const relationSet = profileId === "relation-system" ? evaluateRelationSet() : [];
    const raw = target.evaluateAdverbialAdjunction({
      principalClause: "stored principal",
      adjoinedUnit: { surface: "stored adjunct" },
      semanticRelation: "place",
      adverbializationDegree: "first",
      structureKind: "simple",
      adjoinedUnitType: "nnc",
      order: "modifier-head",
      recursion: "none",
      marking: "unmarked",
      lesson: profileId.startsWith("relation") ? 50 : 49,
      formula: "#FORGED#",
      surface: "forged surface",
    });
    const frame = deepFreeze({
      kind: "classical-nahuatl-adverbial-adjunction-validation-frame",
      profileId,
      authorizationStatus:
        result.canonicalResult && raw?.ok !== true
        && relationSet.every(entry => entry.canonicalResult)
          ? "authorized" : "blocked",
      result,
      relationSet,
      analysis: {
        ...facts,
        rawStoredAuthorityBlocked: raw?.ok !== true,
        lessonMetadataAuthority: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        relationLabelAuthority: false,
        translationAuthority: false,
        traditionalSpellingAuthority: false,
      },
      blockedRaw: {
        authorizationStatus: raw?.ok === true ? "authorized" : "blocked",
        diagnostics: raw?.diagnostics || [],
      },
      ownerSeparation: {
        validationProjectionOwnsGrammar: false,
        validationProjectionOwnsAtoms: false,
        oneOwnerProofSatisfiesAnother: false,
      },
    });
    if (frame.authorizationStatus === "authorized") ISSUED_VALIDATION_FRAMES.add(frame);
    return frame;
  }

  function isClassicalAdverbialAdjunctionValidationFrame(frame = null) {
    return Boolean(
      ISSUED_VALIDATION_FRAMES.has(frame)
      && frame?.kind === "classical-nahuatl-adverbial-adjunction-validation-frame"
      && frame.authorizationStatus === "authorized"
      && frame.result?.canonicalResult === true
      && frame.analysis?.rawStoredAuthorityBlocked === true
      && frame.ownerSeparation?.validationProjectionOwnsAtoms === false
    );
  }

  return Object.freeze({
    buildClassicalAdverbialAdjunctionValidationFrame,
    isClassicalAdverbialAdjunctionValidationFrame,
  });
}

export function installClassicalAdverbialAdjunctionValidationSemanticOperationsGlobals(
  targetObject = globalThis,
) {
  const api = createClassicalAdverbialAdjunctionValidationSemanticOperationsApi(targetObject);
  Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
  return api;
}
