// Non-authorizing live projection for canonical adverbial-adjunction
// semantics. It shares typed source construction and result summarization;
// every semantic owner still retains independent atoms, routes, receipts,
// provenance, proof addresses, and migration status.

import { observeFormulaProjectionDifference } from "./validation_projection_observations.mjs";

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
  "simple-definition": {},
  "simple-order-reverse": {},
  "metaphorical-supplement-contrast": {},
  "incorporated-counterpart-contrast": {},
  "third-singular-ambiguity": {},
  "compared-manner-counterpart": {},
  "multiple-nucleus-simple": {},
  "recursion-system": {},
  "head-recursion": {},
  "cuix-recursive-interrogative": {},
  "inherent-interrogative-order": {},
  "cuix-first-order": {},
  "mach-recursive-interrogative": {},
  "interrogative-nel-collocation": {},
  "interrogative-spelling-analysis": {},
  "modifier-recursion": {},
  "particle-adverbial-collocation": {},
  "collocation-translation-analysis": {},
  "intensifier-capability": {},
  "intensifier-order-translation": {},
  "intensifier-inventory-analysis": {},
  "negative-niman-intensifier": {},
  "particle-intensifier": {},
  "lexicalized-intensifier-collocation": {},
  "adjectival-head-intensifier": {},
  "recursive-intensifier": {},
  "place-time-apposition": {},
  "modification-conjunction-contrast": {},
  "both-sides-recursion": {},
  "recursive-complexity": {},
  "principal-adverbial-construction": {},
  "interrogative-adjunctor-boundary": {},
  "quen-adjunctor-exception": {},
  "larger-sentence-deinterrogation": {},
  "relation-system": {},
  "time-implicit": {},
  "time-iuhqui": {},
  "time-elliptical": {},
  "time-one-out-of-number": {},
  "time-explicit": {},
  "time-ic-alternative": {},
  "time-alternative-expression": {},
  "time-oc-modifier": {},
  "time-other-expression": {},
  "time-demonstrative-subject": {},
  "time-downgrade": {},
  "place-relation": {},
  "place-spelling-analysis": {},
  "place-reduced-copula": {},
  "place-structural-ambiguity": {},
  "manner-relation": {},
  "consideration-relation": {},
  "consideration-reflexive": {},
  "consideration-projective": {},
  "consideration-shared-reference": {},
  "purpose-future": {},
  "purpose-other-tense": {},
  "purpose-purposive-vnc": {},
  "purpose-adjectival-ambiguity": {},
  "purpose-in-optional": {},
  "purpose-ma-optative": {},
  "condition-core": {},
  "condition-marker": {},
  "condition-in-optional": {},
  "condition-sentence-types": {},
  "condition-order": {},
  "condition-open-hypothetical": {},
  "condition-nnc-center": {},
  "condition-supplement-analysis": {},
  "condition-negative": {},
  "condition-vnc-center": {},
  "condition-optative-tense": {},
  "condition-form-ambiguity": {},
  "condition-present-for-past": {},
  "condition-until": {},
  "condition-hypothetical-present-future": {},
  "condition-antecessive-absent": {},
  "condition-future-embed": {},
  "condition-hypothetical-past": {},
  "condition-antecessive-match": {},
  "condition-context-without-prefix": {},
  "condition-prefix-strict-past": {},
  "condition-tla-omission": {},
  "concession-in-tla-nel": {},
  "concession-intensifier": {},
  "concession-spelling-analysis": {},
  "concession-morphology-analysis": {},
  "concession-in-ma-nel": {},
  "concession-ma-zo": {},
  "concession-example-spelling-analysis": {},
  "concession-ma-zo-tel": {},
  "concession-zan-za": {},
  "concession-source-analysis": {},
  "reason-ca-juxtaposition": {},
  "reason-ca-not-conjunction": {},
  "reason-translation-analysis": {},
  "reason-camo-spelling-analysis": {},
  "collocation-spelling-analysis": {},
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
        adjoinedUnit: profileId === "purpose-purposive-vnc" ? target.evaluateClassicalNahuatlLateVncDerivation({
          sourceStem: "cuīca", sourceValence: "intransitive", verbClass: "A", subject: "1sg",
          mood: "indicative", tense: "present", derivationType: "direct", voice: "active",
          lateOperation: "purposive", lateVariant: "directional", purposiveSeries: "outbound-nonpast-indicative",
        }) : vnc(marked
          ? { mood: "optative", tense: "nonpast" }
          : { mood: "indicative", tense: profileId === "purpose-other-tense" ? "present" : "future" }),
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
      const bareTla = profileId === "condition-marker";
      const nominal = profileId === "condition-nnc-center";
      return target.evaluateAdverbialAdjunction(baseRequest({
        adjoinedUnit: nominal ? target.requestClassicalNominalConstructionResult({ constructionKind: "cardinal-numeral-nnc",
          value: 1, classifier: "basic", countKind: "ordinary", subject: "3common", state: "absolutive", animacy: "nonanimate" })
          : vnc({ mood: "optative", tense: "nonpast" }),
        markerUnit: marker(profileId === "condition-negative" ? "l3-in-tla-ca" : bareTla ? "l3-tla" : "l3-in-tla"),
        semanticRelation: "condition",
        adverbializationDegree: "nonadverbialized",
        structureKind: "complex",
        adjoinedUnitType: nominal ? "nnc" : "vnc",
        marking: bareTla ? "tla" : "in-tla",
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
        "concession-in-tla-nel": ["in-tla-nel", "l50-in-tla-nel", "in-tla-nel"],
        "concession-in-ma-nel": ["in-ma-nel", "l50-in-ma-nel", "in-ma-nel"],
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
      expectedRelation: relation,
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
      ...observeFormulaProjectionDifference(
        result?.grammarFrame?.resultFrame?.formulaRecord,
        result?.grammarFrame?.resultFrame?.formulaRealizationRecord),
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
    const compoundProfile = ["incorporated-counterpart-contrast", "compared-manner-counterpart"].includes(profileId);
    const supplementContrastProfile = ["metaphorical-supplement-contrast", "third-singular-ambiguity"].includes(profileId);
    const contrastSubject = profileId === "metaphorical-supplement-contrast" ? "1sg" : "3sg";
    const incorporatedMannerWitness = compoundProfile ? target.evaluateClassicalNahuatlNominalConstruction({
      constructionKind: "nominal-embed-vnc",
      source: { embedStem: "quetzaltōtō", embedClass: "tl", matrixStem: "patlāni", matrixVerbClass: "A", matrixValence: "intransitive" },
      relation: "adverb", route: "direct-adverb", adverbRole: "compared-manner", orientation: "subject",
      subject: "3sg", mood: "indicative", tense: "present", voice: "active", outputKind: "single",
    }) : null;
    const incorporatedMannerObserved = Boolean(incorporatedMannerWitness
      && target.isClassicalNahuatlNominalConstructionResult(incorporatedMannerWitness)
      && incorporatedMannerWitness.authorizationStatus === "authorized"
      && incorporatedMannerWitness.constructionKind === "nominal-embed-vnc"
      && incorporatedMannerWitness.operationFrame?.relation === "adverb"
      && incorporatedMannerWitness.operationFrame?.semanticRole === "compared-manner"
      && incorporatedMannerWitness.operationFrame?.orientation === "subject"
      && target.isClassicalNahuatlVncApplicationFrame(incorporatedMannerWitness.canonicalResult)
      && incorporatedMannerWitness.canonicalResult.authorizationStatus === "authorized");
    let matchedCounterpartRequest = null;
    if (compoundProfile || supplementContrastProfile) {
      const source = target.buildClassicalNahuatlOrdinaryNncSourceFrame({ stem: "quetzaltōtō", sourceClass: "tl-1-a" });
      const operation = target.buildClassicalNahuatlOrdinaryNncOperationFrame(source, {
        state: "absolutive", subject: "3sg", sentenceType: "statement", polarity: "positive",
      });
      const receipt = target.executeClassicalGrammarApplicationRequest({ operationId: "nnc:ordinary", args: [source, operation] });
      matchedCounterpartRequest = baseRequest({
        principalClause: target.requestClassicalVncApplicationResult({
          sourceStem: "patlāni", verbClass: "A", sourceValence: "intransitive", subject: contrastSubject,
          mood: "indicative", tense: "present", requestedVoice: "active",
        }),
        adjoinedUnit: receipt.canonicalResult, semanticRelation: "compared-manner", contrast: "adverbial-modification",
      });
    }
    const supplementContrastWitness = supplementContrastProfile
      ? target.evaluateClassicalNahuatlSupplementationOperation({
        operationKind: "relation",
        principalClause: target.buildClassicalNahuatlSupplementationClauseEnvelope(matchedCounterpartRequest.principalClause, { referenceId: "actor" }),
        supplementClause: target.buildClassicalNahuatlSupplementationClauseEnvelope(
          target.buildClassicalNahuatlAbsolutiveNncFrame("quetzaltōtō", { subject: contrastSubject, nounClass: "tl", animacy: "animate" }),
          { referenceId: "actor" }),
        options: { referenceMode: "shared", headRole: "subject", adjunctor: "none", order: "supplement-first" },
      }) : null;
    let multipleNucleusWitness = null;
    if (profileId === "multiple-nucleus-simple") {
      const principalClause = target.buildClassicalNahuatlSupplementationClauseEnvelope(vnc(), { referenceId: "actor" });
      const supplementClause = target.buildClassicalNahuatlSupplementationClauseEnvelope(
        target.buildClassicalNahuatlAbsolutiveNncFrame("tlāca", { subject: "3sg", nounClass: "tl", animacy: "animate" }),
        { referenceId: "actor" },
      );
      multipleNucleusWitness = target.evaluateClassicalNahuatlSupplementationOperation({
        operationKind: "relation", principalClause, supplementClause,
        options: { referenceMode: "shared", headRole: "subject", adjunctor: "in" },
      });
    }
    let hypotheticalTenseWitness = null;
    let reasonWitness = null;
    if (["reason-ca-juxtaposition", "reason-ca-not-conjunction"].includes(profileId)) {
      const principal = vnc(), adjunct = sentence(), particle = marker("l3-ca");
      const request = baseRequest({ principalClause: principal, adjoinedUnit: adjunct, adjoinedUnitType: "sentence",
        markerUnit: particle, semanticRelation: "reason", adverbializationDegree: "nonadverbialized",
        structureKind: "complex", order: "head-modifier", marking: "ca" });
      const result = target.evaluateAdverbialAdjunction(request);
      const wrongUnit = target.evaluateAdverbialAdjunction({ ...request, adjoinedUnit: vnc(), adjoinedUnitType: "vnc" });
      const observed = target.isAdverbialAdjunctionResult(result) && result.ok && result.supported
        && result.sourceContract?.principal?.issuedResult === principal
        && result.sourceContract?.adjoined?.issuedResult === adjunct
        && result.sourceContract?.marker?.grammarFrame === particle.grammarFrame
        && result.ruleProfile?.unitType === "sentence"
        && result.relationContract?.principalClauseIntroducer === "ca" && result.relationContract.caIsConjunction === false
        && wrongUnit.ok === false && wrongUnit.supported === false
        && wrongUnit.diagnostics?.includes("adverbial-adjunction-reason-is-juxtaposed-principal-sentence");
      reasonWitness = { principal, adjunct, particle, result, wrongUnit, observed: observed === true };
    }
    const restrictiveParticleWitnesses = profileId === "concession-zan-za" ? [
      ["l3-zan", "zan", "unqualified restrictive adverbial modifier"],
      ["l3-za", "zā", "diminutive-from-prior-state adverbial modifier"],
    ].map(([id, surface, usage]) => {
      const particle = marker(id), facts = particle?.lexicalFactFrame;
      const observed = target.isClassicalNahuatlParticleResultFrame(particle)
        && particle.particleId === id && facts.particleId === id
        && facts.usageFacts?.includes(usage) && facts.generationAuthority === false;
      return { id, surface, particle, facts, observed: observed === true };
    }) : [];
    const maNelWitnesses = profileId === "concession-in-ma-nel" ? ["in-ma-nel", "ma-nel"].map(marking => {
      const particle = marker(`l50-${marking}`), principal = vnc(), adjunct = vnc();
      const result = target.evaluateAdverbialAdjunction(baseRequest({ principalClause: principal, adjoinedUnit: adjunct,
        adjoinedUnitType: "vnc", markerUnit: particle, semanticRelation: "concession", concessionType: "in-ma-nel",
        adverbializationDegree: "nonadverbialized", structureKind: "complex", marking }));
      const observed = target.isAdverbialAdjunctionResult(result) && result.ok && result.supported
        && result.ruleProfile?.concessionType === "in-ma-nel" && result.ruleProfile.marking === marking
        && result.sourceContract?.marker?.grammarFrame === particle.grammarFrame
        && result.sourceContract.marker.surface === (marking === "in-ma-nel" ? "in mā nel" : "mā nel")
        && result.sourceContract?.principal?.issuedResult === principal && result.sourceContract?.adjoined?.issuedResult === adjunct;
      return { particle, principal, adjunct, result, observed: observed === true };
    }) : [];
    const concessionPronounWitnesses = profileId === "concession-intensifier" ? ["yeh", "eh"].map(stem => {
      const source = target.buildClassicalNahuatlPronominalNncSourceFrame({ stem });
      const operation = target.buildClassicalNahuatlPronominalNncOperationFrame(source, { subject: "3common" });
      const pronoun = target.requestClassicalPronominalNncResult(source, operation);
      const particle = marker("l50-in-tla-nel");
      const inner = target.evaluateAdverbialAdjunction(baseRequest({ principalClause: particle, adjoinedUnit: pronoun,
        semanticRelation: "manner", adverbializationDegree: "second", order: "head-modifier" }));
      const principal = vnc(), adjunct = vnc();
      const result = target.evaluateAdverbialAdjunction(baseRequest({ principalClause: principal, adjoinedUnit: adjunct,
        adjoinedUnitType: "vnc", markerUnit: inner, semanticRelation: "concession", concessionType: "in-tla-nel",
        adverbializationDegree: "nonadverbialized", structureKind: "complex", marking: "in-tla-nel" }));
      const observed = [inner, result].every(r => target.isAdverbialAdjunctionResult(r) && r.ok && r.supported)
        && inner.sourceContract?.adjoined?.issuedResult === pronoun
        && inner.sourceContract?.principal?.grammarFrame === particle.grammarFrame
        && pronoun.sourceFrame?.stem === stem && pronoun.sourceFrame.familyId === "personal-simple"
        && inner.surface === `in tlā nel ${stem}`
        && result.sourceContract?.marker?.issuedResult === inner
        && result.sourceContract?.principal?.issuedResult === principal && result.sourceContract?.adjoined?.issuedResult === adjunct
        && result.ruleProfile?.concessionType === "in-tla-nel";
      return { stem, source, operation, pronoun, particle, inner, result, observed: observed === true };
    }) : [];
    const omissionWitnesses = profileId === "condition-tla-omission" ? ["l3-ahzo", "l3-at"].map(id => {
      const principal = vnc(), adjunct = vnc(), cue = marker(id);
      const inner = target.evaluateAdverbialAdjunction(baseRequest({ principalClause: adjunct, adjoinedUnit: cue,
        adjoinedUnitType: "particle", semanticRelation: "manner", adverbializationDegree: "second", intensifier: true }));
      const request = baseRequest({ principalClause: principal, adjoinedUnit: inner, adjoinedUnitType: "clause",
        semanticRelation: "condition", conditionType: "open", adverbializationDegree: "nonadverbialized",
        structureKind: "complex", recursion: "modifier", marking: "unmarked" });
      const result = target.evaluateAdverbialAdjunction(request);
      const bareFlag = target.evaluateAdverbialAdjunction({ ...request, adjoinedUnit: adjunct,
        adjoinedUnitType: "vnc", recursion: "none", conditionalCuePresent: true });
      const observed = [inner, result].every(r => target.isAdverbialAdjunctionResult(r) && r.ok && r.supported)
        && inner.sourceContract?.adjoined?.grammarFrame === cue.grammarFrame
        && inner.sourceContract?.principal?.issuedResult === adjunct
        && result.sourceContract?.adjoined?.grammarFrame === inner.grammarFrame
        && result.sourceContract?.principal?.issuedResult === principal
        && result.ruleProfile?.conditionalCuePresent === true && result.ruleProfile.marking === "unmarked"
        && bareFlag.ok === false && bareFlag.supported === false
        && bareFlag.diagnostics?.includes("adverbial-adjunction-condition-marker-or-cue-required");
      return { cue, principal, adjunct, inner, result, bareFlag, observed: observed === true };
    }) : [];
    let strictPastWitness = null;
    if (profileId === "condition-prefix-strict-past") {
      const principal = futureEmbed({ antecessive: true });
      const adjunct = vnc({ mood: "optative", tense: "past", antecessive: true });
      const request = baseRequest({ principalClause: principal, adjoinedUnit: adjunct, adjoinedUnitType: "vnc",
        semanticRelation: "condition", conditionType: "hypothetical-past", adverbializationDegree: "nonadverbialized",
        structureKind: "complex", marking: "in-tla", markerUnit: marker("l3-in-tla") });
      const result = target.evaluateAdverbialAdjunction(request);
      const nonpastReading = target.evaluateAdverbialAdjunction({ ...request, conditionType: "hypothetical-present-future" });
      const observed = target.isAdverbialAdjunctionResult(result) && result.ok && result.supported
        && result.ruleProfile?.conditionType === "hypothetical-past"
        && result.sourceContract?.principal?.issuedResult === principal && result.sourceContract?.adjoined?.issuedResult === adjunct
        && result.sourceContract.principal.features.antecessive === true && result.sourceContract.adjoined.features.antecessive === true
        && nonpastReading.ok === false && nonpastReading.supported === false
        && nonpastReading.diagnostics?.includes("adverbial-adjunction-present-future-hypothetical-forbids-antecessive");
      strictPastWitness = { principal, adjunct, result, nonpastReading, observed: observed === true };
    }
    let unprefixedContextWitness = null;
    if (profileId === "condition-context-without-prefix") {
      const principal = futureEmbed(), adjunct = vnc({ mood: "optative", tense: "past" });
      const readings = ["hypothetical-present-future", "hypothetical-past"].map(conditionType => {
        const result = target.evaluateAdverbialAdjunction(baseRequest({ principalClause: principal, adjoinedUnit: adjunct,
          adjoinedUnitType: "vnc", semanticRelation: "condition", conditionType,
          adverbializationDegree: "nonadverbialized", structureKind: "complex", marking: "in-tla", markerUnit: marker("l3-in-tla") }));
        const observed = target.isAdverbialAdjunctionResult(result) && result.ok && result.supported
          && result.ruleProfile?.conditionType === conditionType
          && result.sourceContract?.principal?.issuedResult === principal
          && result.sourceContract?.adjoined?.issuedResult === adjunct
          && result.sourceContract.principal.features.antecessive === false
          && result.sourceContract.adjoined.features.antecessive === false
          && result.sourceContract.adjoined.features.tense === "past";
        return { conditionType, result, observed: observed === true };
      });
      const observed = readings.every(w => w.observed) && Boolean(readings[0].result.surface)
        && readings[0].result.surface === readings[1].result.surface;
      unprefixedContextWitness = { principal, adjunct, readings, observed };
    }
    const antecessiveMatchWitnesses = profileId === "condition-antecessive-match"
      ? [false, true].flatMap(principalPrefix => [false, true].map(adjunctPrefix => {
        const principal = futureEmbed({ antecessive: principalPrefix });
        const adjunct = vnc({ mood: "optative", tense: "past", antecessive: adjunctPrefix });
        const result = target.evaluateAdverbialAdjunction(baseRequest({ principalClause: principal,
          adjoinedUnit: adjunct, adjoinedUnitType: "vnc", semanticRelation: "condition", conditionType: "hypothetical-past",
          adverbializationDegree: "nonadverbialized", structureKind: "complex", marking: "in-tla", markerUnit: marker("l3-in-tla") }));
        const observed = principalPrefix === adjunctPrefix
          ? target.isAdverbialAdjunctionResult(result) && result.ok && result.supported
            && result.ruleProfile?.conditionType === "hypothetical-past"
            && result.sourceContract?.principal?.issuedResult === principal
            && result.sourceContract?.adjoined?.issuedResult === adjunct
            && result.sourceContract.principal.features.antecessive === principalPrefix
            && result.sourceContract.adjoined.features.antecessive === adjunctPrefix
          : result.ok === false && result.supported === false
            && result.diagnostics?.includes("adverbial-adjunction-past-hypothetical-antecessive-must-match");
        return { principalPrefix, adjunctPrefix, principal, adjunct, result, observed: observed === true };
      })) : [];
    const futureEmbedWitnesses = profileId === "condition-future-embed"
      ? ["hypothetical-present-future", "hypothetical-past"].map(conditionType => {
        const principal = futureEmbed(), adjunct = vnc({ mood: "optative", tense: "past" });
        const request = baseRequest({ principalClause: principal, adjoinedUnit: adjunct, adjoinedUnitType: "vnc",
          semanticRelation: "condition", conditionType, adverbializationDegree: "nonadverbialized",
          structureKind: "complex", marking: "in-tla", markerUnit: marker("l3-in-tla") });
        const result = target.evaluateAdverbialAdjunction(request);
        const counterexample = vnc({ tense: "future" });
        const rejected = target.evaluateAdverbialAdjunction({ ...request, principalClause: counterexample });
        const observed = target.isAdverbialAdjunctionResult(result) && result.ok && result.supported
          && result.ruleProfile?.conditionType === conditionType
          && result.sourceContract?.principal?.issuedResult === principal
          && result.sourceContract?.adjoined?.issuedResult === adjunct
          && result.sourceContract.principal.features.futureEmbed === true
          && rejected.ok === false && rejected.supported === false
          && rejected.diagnostics?.includes("adverbial-adjunction-hypothetical-requires-future-embed-principal");
        return { conditionType, principal, adjunct, result, counterexample, rejected, observed: observed === true };
      }) : [];
    if (["condition-hypothetical-present-future", "condition-antecessive-absent", "condition-hypothetical-past"].includes(profileId)) {
      const antecessiveProfile = profileId === "condition-antecessive-absent";
      const pastProfile = profileId === "condition-hypothetical-past";
      const conditionType = pastProfile ? "hypothetical-past" : "hypothetical-present-future";
      const principal = futureEmbed({ antecessive: pastProfile }), adjunct = vnc({ mood: "optative", tense: "past", antecessive: pastProfile });
      const request = baseRequest({ principalClause: principal, adjoinedUnit: adjunct, adjoinedUnitType: "vnc",
        semanticRelation: "condition", conditionType, adverbializationDegree: "nonadverbialized",
        structureKind: "complex", marking: "in-tla", markerUnit: marker("l3-in-tla") });
      const result = target.evaluateAdverbialAdjunction(request);
      const counterexample = vnc({ mood: "optative", tense: antecessiveProfile ? "past" : "nonpast", antecessive: antecessiveProfile || pastProfile });
      const nonpast = target.evaluateAdverbialAdjunction({ ...request, adjoinedUnit: counterexample });
      const observed = target.isAdverbialAdjunctionResult(result) && result.ok && result.supported
        && result.ruleProfile?.conditionType === conditionType
        && result.sourceContract?.principal?.issuedResult === principal && result.sourceContract?.adjoined?.issuedResult === adjunct
        && result.sourceContract.adjoined.features.mood === "optative" && result.sourceContract.adjoined.features.tense === "past"
        && (!antecessiveProfile || result.sourceContract.adjoined.features.antecessive === false)
        && nonpast.ok === false && nonpast.supported === false
        && nonpast.diagnostics?.includes(antecessiveProfile
          ? "adverbial-adjunction-present-future-hypothetical-forbids-antecessive"
          : "adverbial-adjunction-hypothetical-requires-past-optative-adjunct");
      hypotheticalTenseWitness = { principal, adjunct, result, counterexample, nonpast, observed: observed === true };
    }
    let untilWitness = null;
    if (profileId === "condition-until") {
      const adverb = (stem, context = {}) => target.requestClassicalAdverbialNncResult({
        adverbialPotentialFrame: target.resolveClassicalNahuatlAdverbialPotential({ stem, clauseKind: "nnc-absolutive" }), context });
      const negative = adverb("mo", { negativeParticle: "ca", clauseType: "subordinate" });
      const time = adverb("ihcuāc");
      const temporal = target.evaluateAdverbialAdjunction(baseRequest({ principalClause: time, adjoinedUnit: negative,
        semanticRelation: "time", adverbializationDegree: "second", order: "modifier-head" }));
      const event = vnc({ mood: "optative", tense: "preterit", antecessive: true });
      const inner = target.evaluateAdverbialAdjunction(baseRequest({ principalClause: event, adjoinedUnit: temporal,
        adjoinedUnitType: "clause", semanticRelation: "time", adverbializationDegree: "nonadverbialized", structureKind: "complex",
        recursion: "modifier", timeProfile: "explicit", explicitAdverbialIndicator: true }));
      const result = target.evaluateAdverbialAdjunction(baseRequest({ adjoinedUnit: inner, adjoinedUnitType: "clause",
        semanticRelation: "condition", conditionType: "open", adverbializationDegree: "nonadverbialized", structureKind: "complex",
        recursion: "modifier", marking: "in-tla", markerUnit: marker("l3-in-tla") }));
      const observed = [temporal, inner, result].every(r => target.isAdverbialAdjunctionResult(r) && r.ok && r.supported)
        && negative?.operationFrame?.contextFrame?.negativeParticle === "ca"
        && negative.operationFrame.contextFrame.semanticPolarity === "negative"
        && temporal.sourceContract?.adjoined?.issuedResult === negative && temporal.sourceContract?.principal?.issuedResult === time
        && inner.sourceContract?.adjoined?.grammarFrame === temporal.grammarFrame
        && result.sourceContract?.adjoined?.grammarFrame === inner.grammarFrame
        && result.ruleProfile?.relation === "condition";
      untilWitness = { negative, time, temporal, event, inner, result, observed: observed === true };
    }
    const conditionHistoricalWitnesses = profileId === "condition-present-for-past" ? ["principal", "adjoined"].map(role => {
      const principal = vnc({ tense: role === "principal" ? "present" : "imperfect" });
      const adjunct = role === "adjoined" ? vnc() : vnc({ mood: "optative", tense: "preterit", antecessive: true });
      const finite = role === "principal" ? principal : adjunct;
      const context = target.interpretClassicalNahuatlVncContextualTime(finite, { referenceTime: "past", eventRelation: "same", relationScope: "discourse" });
      const result = summarize(target.evaluateAdverbialAdjunction(baseRequest({ principalClause: principal, adjoinedUnit: adjunct,
        adjoinedUnitType: "vnc", semanticRelation: "condition", conditionType: "open", adverbializationDegree: "nonadverbialized",
        structureKind: "complex", marking: "in-tla", markerUnit: marker("l3-in-tla") })));
      const observed = result.canonicalResult && result.authorizationStatus === "authorized" && result.relation === "condition"
        && result.liveResult?.sourceContract?.[role]?.issuedResult === finite
        && result.liveResult.sourceContract[role].features.mood === "indicative"
        && result.liveResult.sourceContract[role].features.tense === "present"
        && target.isClassicalNahuatlVncContextualTimeFrame(context) && context.finiteVncResult === finite
        && context.timeReading === "historical-past" && context.finiteTense === "present"
        && context.finiteTensePreserved && context.changesFiniteMorphology === false;
      return { role, finite, context, result, observed: observed === true };
    }) : [];
    const conditionHistoricalObserved = conditionHistoricalWitnesses.length === 2 && conditionHistoricalWitnesses.every(w => w.observed);
    const conditionMoodAmbiguity = profileId === "condition-form-ambiguity";
    const conditionOptativeWitnesses = profileId === "condition-optative-tense" || conditionMoodAmbiguity
      ? (conditionMoodAmbiguity ? [["indicative", "present"], ["optative", "nonpast"]] : [["optative", "future"], ["optative", "preterit"]]).map(([mood, tense]) => {
      const principal = vnc(), adjunct = vnc({ mood, tense, antecessive: tense === "preterit" });
      const result = summarize(target.evaluateAdverbialAdjunction(baseRequest({ principalClause: principal, adjoinedUnit: adjunct,
        adjoinedUnitType: "vnc", semanticRelation: "condition", conditionType: "open", adverbializationDegree: "nonadverbialized",
        structureKind: "complex", marking: "in-tla", markerUnit: marker("l3-in-tla") })));
      const observed = result.canonicalResult && result.authorizationStatus === "authorized" && result.relation === "condition"
        && target.isClassicalNahuatlVncApplicationFrame(adjunct)
        && result.conditionType === "open" && result.liveResult?.sourceContract?.principal?.issuedResult === principal
        && result.liveResult?.sourceContract?.adjoined?.issuedResult === adjunct
        && result.liveResult.sourceContract.adjoined.features.mood === mood
        && result.liveResult.sourceContract.adjoined.features.tense === tense;
      return { mood, tense, principal, adjunct, result, observed: observed === true };
    }) : [];
    const conditionOptativeObserved = conditionOptativeWitnesses.length === 2 && conditionOptativeWitnesses.every(w => w.observed);
    const conditionMoodAmbiguityObserved = conditionMoodAmbiguity && conditionOptativeObserved
      && conditionOptativeWitnesses[0].result.liveResult.surface === conditionOptativeWitnesses[1].result.liveResult.surface
      && conditionOptativeWitnesses[0].adjunct !== conditionOptativeWitnesses[1].adjunct;
    let conditionSupplementWitness = null;
    if (profileId === "condition-supplement-analysis") {
      const numeral = target.requestClassicalNominalConstructionResult({ constructionKind: "cardinal-numeral-nnc",
        value: 1, classifier: "basic", countKind: "ordinary", subject: "3common", state: "absolutive", animacy: "nonanimate" });
      const nominalFrame = target.buildClassicalNahuatlAbsolutiveNncFrame("tlācatl", { subject: "3sg", nounClass: "zero", animacy: "animate" });
      const nominal = target.executeClassicalGrammarApplicationRequest({ operationId: "nnc:sentence-surface",
        args: [nominalFrame.nncSlotFrame, { sentenceType: "assertion", polarity: "positive" }] }).canonicalResult;
      const principalClause = target.buildClassicalNahuatlSupplementationClauseEnvelope(numeral, { referenceId: "person" });
      const supplementClause = target.buildClassicalNahuatlSupplementationClauseEnvelope(nominal, { referenceId: "person" });
      const inner = target.evaluateClassicalNahuatlSupplementationOperation({ operationKind: "relation", principalClause, supplementClause,
        options: { referenceMode: "shared", headRole: "subject", adjunctor: "none", order: "principal-first" } });
      const result = target.evaluateAdverbialAdjunction(baseRequest({ adjoinedUnit: inner, adjoinedUnitType: "sentence",
        semanticRelation: "condition", conditionType: "open", adverbializationDegree: "nonadverbialized",
        structureKind: "complex", marking: "in-tla", markerUnit: marker("l3-in-tla") }));
      const observed = target.isClassicalNahuatlSupplementationFrame(inner) && inner.authorizationStatus === "authorized"
        && inner.referenceFrame?.referenceMode === "shared" && inner.referenceFrame?.headRole === "subject"
        && inner.principalClause === principalClause && inner.supplementClause === supplementClause
        && target.isAdverbialAdjunctionResult(result) && result.ok && result.supported
        && result.ruleProfile?.relation === "condition" && result.sourceContract?.adjoined?.issuedResult === inner;
      conditionSupplementWitness = { numeral, nominal, inner, result, observed: observed === true };
    }
    const conditionContrastWitnesses = profileId === "condition-open-hypothetical" ? [
      ["open", "condition-open", "nonpast"],
      ["hypothetical-present-future", "condition-hypothetical-present-future", "past"],
      ["hypothetical-past", "condition-hypothetical-past", "past"],
    ].map(([expected, kind, tense]) => {
      const result = summarize(evaluateProfile(kind));
      const adjunct = result.liveResult?.sourceContract?.adjoined;
      const principal = result.liveResult?.sourceContract?.principal?.issuedResult;
      const observed = result.canonicalResult && result.authorizationStatus === "authorized" && result.relation === "condition"
        && result.conditionType === expected && adjunct?.features?.mood === "optative" && adjunct?.features?.tense === tense
        && (expected === "open" || (principal?.operationFrame?.operation === "compound"
          && principal.operationFrame.variant === "future-embed"));
      return { expected, result, observed: observed === true };
    }) : [];
    const conditionContrastObserved = conditionContrastWitnesses.length === 3 && conditionContrastWitnesses.every(w => w.observed)
      && new Set(conditionContrastWitnesses.map(w => w.result.conditionType)).size === 3;
    let conditionOrderWitness = null;
    if (profileId === "condition-order") {
      const principal = vnc(), adjunct = vnc({ mood: "optative", tense: "nonpast" }), conditional = marker("l3-in-tla");
      const request = baseRequest({ principalClause: principal, adjoinedUnit: adjunct, adjoinedUnitType: "vnc",
        semanticRelation: "condition", conditionType: "open", adverbializationDegree: "nonadverbialized",
        structureKind: "complex", marking: "in-tla", markerUnit: conditional });
      const before = target.evaluateAdverbialAdjunction({ ...request, order: "modifier-head" });
      const after = target.evaluateAdverbialAdjunction({ ...request, order: "head-modifier" });
      const observed = [before, after].every(r => target.isAdverbialAdjunctionResult(r) && r.ok && r.supported
        && r.ruleProfile?.relation === "condition" && r.ruleProfile?.conditionType === "open"
        && r.sourceContract?.principal?.issuedResult === principal && r.sourceContract?.adjoined?.issuedResult === adjunct
        && r.sourceContract?.marker?.grammarFrame === conditional.grammarFrame)
        && before.ruleProfile?.order === "modifier-head" && after.ruleProfile?.order === "head-modifier"
        && before.surface !== after.surface;
      conditionOrderWitness = { principal, adjunct, before, after, observed: observed === true };
    }
    const conditionSentenceWitnesses = profileId === "condition-sentence-types" ? [
      ["statement", { mood: "indicative", tense: "present" }],
      ["question", { mood: "indicative", tense: "present", sentenceType: "yes-no-question", questionMode: "cuix" }],
      ["wish", { mood: "optative", tense: "nonpast", sentenceType: "wish-sentence", introductoryParticle: "mā" }],
      ["command", { mood: "optative", tense: "nonpast", sentenceType: "command-sentence", subject: "2sg" }],
      ["admonition", { mood: "admonitive", tense: "nonpast", introductoryParticle: "mā", subject: "2sg" }],
    ].map(([expected, options]) => {
      const principal = target.requestClassicalVncSentenceResultFrame(target.requestClassicalVncApplicationResult({
        sourceStem: "chōca", verbClass: "A", sourceValence: "intransitive", subject: "3sg", requestedVoice: "active", ...options }));
      const sentence = principal?.sentenceSurfaceFrame;
      const actual = sentence?.sentenceType === "yes-no-question" ? "question"
        : sentence?.sentenceType === "wish-sentence" ? "wish"
        : sentence?.sentenceType === "command-sentence" ? "command"
        : sentence?.sentenceType === "admonition-sentence" ? "admonition"
        : sentence?.mood === "indicative" && sentence.sentenceSurfaceApplies === false ? "statement" : "";
      const adjunct = vnc({ mood: "optative", tense: "nonpast" });
      const result = target.evaluateAdverbialAdjunction(baseRequest({ principalClause: principal, adjoinedUnit: adjunct,
        adjoinedUnitType: "vnc", semanticRelation: "condition", adverbializationDegree: "nonadverbialized",
        structureKind: "complex", conditionType: "open", marking: "in-tla", markerUnit: marker("l3-in-tla"), order: "head-modifier" }));
      const observed = actual === expected && principal?.authorizationStatus === "authorized"
        && target.isAdverbialAdjunctionResult(result) && result.ok && result.supported
        && result.ruleProfile?.relation === "condition" && result.ruleProfile?.conditionType === "open"
        && result.sourceContract?.principal?.issuedResult === principal && result.sourceContract?.adjoined?.issuedResult === adjunct;
      return { expected, actual, principal, adjunct, result, observed: observed === true };
    }) : [];
    const conditionSentenceCount = new Set(conditionSentenceWitnesses.filter(w => w.observed).map(w => w.actual)).size;
    let purposeOptionalWitness = null;
    if (["purpose-in-optional", "condition-in-optional"].includes(profileId)) {
      const condition = profileId === "condition-in-optional";
      const principal = vnc(), adjunct = vnc(condition ? { mood: "optative", tense: "nonpast" } : { tense: "future" });
      const adjunctor = marker(condition ? "l3-in-tla" : "l3-in"), bareMarker = condition ? marker("l3-tla") : undefined;
      const relation = condition ? "condition" : "purpose";
      const request = baseRequest({ principalClause: principal, adjoinedUnit: adjunct, adjoinedUnitType: "vnc",
        semanticRelation: relation, adverbializationDegree: "nonadverbialized", structureKind: "complex",
        order: "head-modifier", ...(condition ? { conditionType: "open" } : { purposeType: "unmarked" }) });
      const absent = target.evaluateAdverbialAdjunction({ ...request, marking: condition ? "tla" : "unmarked", markerUnit: bareMarker });
      const present = target.evaluateAdverbialAdjunction({ ...request, marking: condition ? "in-tla" : "in", markerUnit: adjunctor });
      const observed = [absent, present].every(r => target.isAdverbialAdjunctionResult(r) && r.ok && r.supported
        && r.ruleProfile?.relation === relation && r.ruleProfile?.degree === "nonadverbialized"
        && r.sourceContract?.principal?.issuedResult === principal && r.sourceContract?.adjoined?.issuedResult === adjunct)
        && absent.ruleProfile?.marking === (condition ? "tla" : "unmarked") && present.ruleProfile?.marking === (condition ? "in-tla" : "in")
        && (!condition || (absent.ruleProfile?.conditionType === "open" && present.ruleProfile?.conditionType === "open"
          && absent.sourceContract?.marker?.grammarFrame === bareMarker.grammarFrame
          && present.sourceContract?.marker?.grammarFrame === adjunctor.grammarFrame))
        && present.surface === absent.surface.replace(/ /u, " in ");
      purposeOptionalWitness = { principal, adjunct, adjunctor, absent, present, observed: observed === true };
    }
    let purposeAmbiguityWitness = null;
    if (profileId === "purpose-adjectival-ambiguity") {
      const nounFrame = target.buildClassicalNahuatlAbsolutiveNncFrame("tlācatl", { subject: "3sg", nounClass: "zero", animacy: "animate" });
      const noun = target.executeClassicalGrammarApplicationRequest({ operationId: "nnc:sentence-surface",
        args: [nounFrame.nncSlotFrame, { sentenceType: "assertion", polarity: "positive" }] }).canonicalResult;
      const action = target.requestClassicalVncApplicationResult({ sourceStem: "mati", verbClass: "B",
        sourceValence: "specific-projective", objectKind: "specific-projective", objectPerson: "3sg", subject: "1sg",
        mood: "indicative", tense: "present", requestedVoice: "active" });
      const modifier = target.evaluateClassicalNahuatlLateVncDerivation({ sourceStem: "cuīca", sourceValence: "intransitive",
        verbClass: "A", subject: "3sg", mood: "indicative", tense: "present", derivationType: "direct", voice: "active",
        lateOperation: "purposive", lateVariant: "directional", purposiveSeries: "outbound-nonpast-indicative" });
      const principalClause = target.buildClassicalNahuatlSupplementationClauseEnvelope(action, { referenceId: "speaker", objectReferenceId: "person" });
      const supplementClause = target.buildClassicalNahuatlSupplementationClauseEnvelope(noun, { referenceId: "person" });
      const principal = target.evaluateClassicalNahuatlSupplementationOperation({ operationKind: "relation", principalClause, supplementClause,
        options: { referenceMode: "shared", headRole: "object", order: "principal-first", adjunctor: "in" } });
      const result = target.evaluateAdverbialAdjunction(baseRequest({ principalClause: principal, adjoinedUnit: modifier,
        adjoinedUnitType: "vnc", semanticRelation: "purpose", adverbializationDegree: "nonadverbialized",
        structureKind: "complex", order: "head-modifier", marking: "in", markerUnit: marker("l3-in"), purposeType: "unmarked" }));
      const adjectival = target.evaluateClassicalNahuatlAdjectivalModification({ operationKind: "adjectival-modification",
        head: noun, modifier, linkRole: "shared-subject", topology: "ordinary", order: "head-modifier", adjunctor: "in" });
      const selectedHead = adjectival.selectedClauses?.find(x => x.role === "head");
      const selectedModifier = adjectival.selectedClauses?.find(x => x.role === "modifier");
      const observed = target.isAdverbialAdjunctionResult(result) && result.ok && result.supported
        && result.ruleProfile?.relation === "purpose" && result.sourceContract?.principal?.issuedResult === principal
        && result.sourceContract?.adjoined?.issuedResult === modifier
        && target.isClassicalNahuatlSupplementationFrame(principal) && principal.authorizationStatus === "authorized"
        && principal.supplementClause === supplementClause
        && target.isClassicalNahuatlResultFrame(adjectival) && adjectival.authorizationStatus === "authorized"
        && selectedHead?.sourceResult === noun && selectedModifier?.sourceResult === modifier
        && selectedHead.subjectId === selectedModifier.subjectId
        && target.isClassicalNahuatlClosureFrame(modifier) && modifier.operationFrame?.operation === "purposive";
      purposeAmbiguityWitness = { noun, action, modifier, principal, adjectival, result, observed: observed === true };
    }
    let considerationWitness = null;
    if (["consideration-relation", "consideration-reflexive", "consideration-projective", "consideration-shared-reference"].includes(profileId)) {
      const reflexive = profileId === "consideration-reflexive";
      const projective = profileId === "consideration-projective";
      const shared = profileId === "consideration-shared-reference";
      const principal = shared ? target.requestClassicalVncApplicationResult({ sourceStem: "mati", verbClass: "B",
        sourceValence: "specific-projective", objectKind: "specific-projective", objectPerson: "2pl", subject: "1sg",
        mood: "indicative", tense: "present", requestedVoice: "active" }) : projective ? target.requestClassicalVncApplicationResult({ sourceStem: "mati", verbClass: "B",
        sourceValence: "projective-nonhuman", objectKind: "nonspecific-nonhuman", subject: "1pl",
        mood: "indicative", tense: "future", requestedVoice: "active" }) : reflexive ? target.requestClassicalVncApplicationResult({ sourceStem: "mati", verbClass: "B",
        sourceValence: "mainline-reflexive", objectKind: "reflexive", subject: "1sg",
        mood: "indicative", tense: "present", requestedVoice: "active" }) : vnc();
      const adjunct = shared ? target.requestClassicalVncApplicationResult({ sourceStem: "cati", verbClass: "B",
        sourceValence: "intransitive", subject: "2pl", mood: "indicative", tense: "future", requestedVoice: "active" }) : vnc({ tense: "future" });
      const result = summarize(target.evaluateAdverbialAdjunction(baseRequest({ principalClause: principal, adjoinedUnit: adjunct,
        adjoinedUnitType: "vnc", semanticRelation: "consideration", adverbializationDegree: "nonadverbialized",
        structureKind: "complex", contrast: "adverbial-modification" })));
      const principalClause = target.buildClassicalNahuatlSupplementationClauseEnvelope(principal, { referenceId: "actor", ...(shared ? { objectReferenceId: "topic" } : {}) });
      const supplementClause = target.buildClassicalNahuatlSupplementationClauseEnvelope(adjunct, { referenceId: "topic" });
      const objectAttempt = target.evaluateClassicalNahuatlSupplementationOperation({ operationKind: "relation", principalClause, supplementClause,
        options: { referenceMode: shared ? "shared" : "included", headRole: "object", order: "principal-first" } });
      const observed = result.canonicalResult && result.authorizationStatus === "authorized" && result.relation === "consideration"
        && result.degree === "nonadverbialized" && result.liveResult?.sourceContract?.principal?.issuedResult === principal
        && result.liveResult?.sourceContract?.adjoined?.issuedResult === adjunct
        && principalClause.authorizationStatus === "authorized"
        && (shared ? principalClause.objects.length === 1
          && principalClause.objects[0].category === "2pl" && supplementClause.subject.category === "2pl"
          && principalClause.objects[0].referenceId === supplementClause.subject.referenceId
          && principalClause.subject.referenceId !== supplementClause.subject.referenceId
          && target.isClassicalNahuatlSupplementationFrame(objectAttempt)
          && objectAttempt.authorizationStatus === "authorized"
          && objectAttempt.referenceFrame?.referenceMode === "shared" && objectAttempt.referenceFrame?.headRole === "object"
          && objectAttempt.principalClause === principalClause && objectAttempt.supplementClause === supplementClause
          && !target.isAdverbialAdjunctionResult(objectAttempt)
          && !target.isClassicalNahuatlSupplementationFrame(result.liveResult)
          : projective ? principalClause.objects.length === 1
          && principalClause.objects[0].objectKind === "nonspecific-nonhuman"
          && principalClause.objects[0].features.specificity === "nonspecific"
          && objectAttempt.authorizationStatus === "blocked"
          && objectAttempt.blockReason === "included-referent-head-must-be-third-person-singular"
          : reflexive ? principalClause.objects.length === 1
          && principalClause.objects[0].objectKind === "reflexive"
          && principalClause.objects[0].referenceId === principalClause.subject.referenceId
          : principalClause.objects.length === 0
            && objectAttempt.authorizationStatus === "blocked" && objectAttempt.blockReason === "typed-principal-personal-head-required");
      considerationWitness = { principal, adjunct, principalClause, supplementClause, objectAttempt, result, observed: observed === true };
    }
    let locativeClauseWitness = null;
    if (["place-relation", "place-spelling-analysis", "manner-relation"].includes(profileId)) {
      const manner = profileId === "manner-relation";
      const relation = manner ? "manner" : "place";
      const locative = manner ? adverbialIuh() : place(), nuclear = vnc({ tense: "future" });
      const inner = target.evaluateAdverbialAdjunction(baseRequest({ principalClause: nuclear, adjoinedUnit: locative, semanticRelation: relation }));
      const result = summarize(target.evaluateAdverbialAdjunction(baseRequest({ adjoinedUnit: inner,
        semanticRelation: relation, adverbializationDegree: "nonadverbialized", structureKind: "complex", recursion: "modifier",
        markerUnit: marker("l3-in"), marking: "in" })));
      const observed = target.isAdverbialAdjunctionResult(inner) && inner.ruleProfile?.relation === relation
        && inner.sourceContract?.principal?.issuedResult === nuclear
        && inner.sourceContract?.adjoined?.issuedResult === locative
        && inner.sourceContract?.principal?.features?.tense === "future"
        && (!manner || locative.wordSurface === "iuh")
        && result.canonicalResult && result.authorizationStatus === "authorized" && result.relation === relation
        && result.degree === "nonadverbialized" && result.liveResult?.sourceContract?.adjoined?.grammarFrame === inner.grammarFrame;
      locativeClauseWitness = { locative, nuclear, inner, result, observed: observed === true };
    }
    let temporalDowngradeWitness = null;
    if (profileId === "time-downgrade") {
      const stem = target.getClassicalNahuatlRelationalStemInventory().find(s => s.stemId === "c-means-purpose-reason-time");
      const temporal = target.requestClassicalRelationalNncResult({ state: "possessive", possessorId: "3common",
        subjectMode: "adverbialized", subjectId: "3common", sentencePosition: "noninitial",
        nounstem: { kind: target.CLASSICAL_NAHUATL_NNC_NOUNSTEM_REQUEST_KIND, stemId: stem.stemId, formation: "option-one",
          operation: "relational-nnc", sourceKind: "possessor", sourceFormation: "plain-nounstem", sourceVoice: "active",
          sourceMode: "whole-stem", sourceStem: stem.classicalMatrix, sourceMatrixStem: stem.classicalMatrix } });
      const source = target.buildClassicalNahuatlPronominalNncSourceFrame({ stem: "ōn" });
      const demonstrative = target.requestClassicalPronominalNncResult(source,
        target.buildClassicalNahuatlPronominalNncOperationFrame(source, { subject: "3sg", clausePosition: "initial",
          adjunctorInMode: "none", sentenceType: "statement", polarity: "positive" }));
      const principalClause = target.buildClassicalNahuatlSupplementationClauseEnvelope(temporal, { referenceId: "time", possessorReferenceId: "event" });
      const supplementClause = target.buildClassicalNahuatlSupplementationClauseEnvelope(demonstrative, { referenceId: "event" });
      const inner = target.evaluateClassicalNahuatlSupplementationOperation({ operationKind: "relation", principalClause, supplementClause,
        options: { referenceMode: "shared", headRole: "possessor", adjunctor: "in", order: "principal-first" } });
      const result = summarize(target.evaluateAdverbialAdjunction(baseRequest({ adjoinedUnit: inner, adjoinedUnitType: "sentence",
        semanticRelation: "time", adverbializationDegree: "second", structureKind: "simple" })));
      const observed = target.isClassicalNahuatlSupplementationFrame(inner) && inner.authorizationStatus === "authorized"
        && inner.referenceFrame?.headRole === "possessor" && inner.referenceFrame?.referenceMode === "shared"
        && inner.referenceFrame?.referenceIdentityUnified === true && temporal.surface === "īc" && demonstrative.wordSurface === "ōn"
        && inner.principalClause === principalClause && inner.supplementClause === supplementClause
        && result.canonicalResult && result.relation === "time" && result.degree === "second" && result.structure === "simple"
        && result.liveResult?.sourceContract?.adjoined?.issuedResult === inner;
      temporalDowngradeWitness = { temporal, demonstrative, principalClause, supplementClause, inner, result, observed: observed === true };
    }
    let demonstrativeSubjectWitness = null;
    if (["time-demonstrative-subject", "place-reduced-copula", "place-structural-ambiguity"].includes(profileId)) {
      const placeAmbiguity = profileId === "place-structural-ambiguity";
      const reducedPlace = profileId !== "time-demonstrative-subject";
      const predicate = target.requestClassicalAdverbialNncResult({ adverbialPotentialFrame:
        target.resolveClassicalNahuatlAdverbialPotential({ stem: reducedPlace ? "pani" : "ihcuāc", clauseKind: "nnc-absolutive" }) });
      const source = target.buildClassicalNahuatlPronominalNncSourceFrame({ stem: "īn" });
      const building = placeAmbiguity ? target.buildClassicalNahuatlAbsolutiveNncFrame("telpōchcalli", { subject: "3sg", nounClass: "zero", animacy: "inanimate" }) : null;
      const demonstrative = placeAmbiguity ? target.executeClassicalGrammarApplicationRequest({ operationId: "nnc:sentence-surface", outputKind: "scalar",
        args: [building.nncSlotFrame, { sentenceType: "assertion", polarity: "positive" }] }).canonicalResult : target.requestClassicalPronominalNncResult(source,
        target.buildClassicalNahuatlPronominalNncOperationFrame(source, { subject: "3sg", clausePosition: "initial",
          adjunctorInMode: "none", sentenceType: "statement", polarity: "positive" }));
      const principalClause = target.buildClassicalNahuatlSupplementationClauseEnvelope(predicate, { referenceId: "event" });
      const supplementClause = target.buildClassicalNahuatlSupplementationClauseEnvelope(demonstrative, { referenceId: "event" });
      const inner = target.evaluateClassicalNahuatlSupplementationOperation({ operationKind: "relation", principalClause, supplementClause,
        options: { referenceMode: "shared", headRole: "subject", adjunctor: "none", order: "principal-first" } });
      const result = summarize(target.evaluateAdverbialAdjunction(baseRequest({ adjoinedUnit: inner,
        adjoinedUnitType: "sentence",
        semanticRelation: reducedPlace ? "place" : "time", adverbializationDegree: "nonadverbialized", structureKind: "complex",
        reducedCopula: reducedPlace,
        timeProfile: "explicit", explicitAdverbialIndicator: true, markerUnit: marker("l3-in"), marking: "in" })));
      const observed = target.isClassicalNahuatlSupplementationFrame(inner) && inner.authorizationStatus === "authorized"
        && inner.referenceFrame?.headRole === "subject" && inner.referenceFrame?.referenceMode === "shared"
        && inner.referenceFrame?.referenceIdentityUnified === true
        && inner.principalClause === principalClause && inner.supplementClause === supplementClause
        && (reducedPlace ? inner.principalClause.unitKind === "nnc" : predicate.wordSurface === "ihcuāc") && (placeAmbiguity || demonstrative.wordSurface === "īn")
        && result.canonicalResult && result.relation === (reducedPlace ? "place" : "time")
        && (!reducedPlace || (result.liveResult?.ruleProfile?.reducedCopula === true && inner.supplementClause.unitKind === "nnc"))
        && result.liveResult?.sourceContract?.adjoined?.issuedResult === inner;
      const apposition = placeAmbiguity ? target.evaluateAdverbialAdjunction(baseRequest({ principalClause: predicate, adjoinedUnit: demonstrative,
        semanticRelation: "place", structureKind: "apposition", order: "appositive-head-modifier", recursion: "appositive" })) : null;
      const ambiguityObserved = placeAmbiguity && observed && target.isAdverbialAdjunctionResult(apposition)
        && apposition.sourceContract?.principal?.issuedResult === predicate
        && apposition.sourceContract?.adjoined?.issuedResult === demonstrative
        && apposition.ruleProfile?.structure === "apposition"
        && apposition.surface.toLowerCase() === inner.surfaceRealization.replace(/[.?!]$/u, "").toLowerCase();
      demonstrativeSubjectWitness = { predicate, demonstrative, principalClause, supplementClause, inner, result,
        ...(placeAmbiguity ? { apposition, ambiguityObserved: ambiguityObserved === true } : {}),
        observed: (placeAmbiguity ? ambiguityObserved : observed) === true };
    }
    let temporalNumeralWitness = null;
    if (profileId === "time-one-out-of-number") {
      const issue = value => target.requestClassicalNominalConstructionResult({ constructionKind: "cardinal-numeral-nnc",
        value, classifier: "basic", countKind: "ordinary", subject: "3common", state: "absolutive", animacy: "nonanimate" });
      const whole = issue(10), part = issue(1);
      const result = summarize(target.evaluateAdverbialAdjunction(baseRequest({ principalClause: part, adjoinedUnit: whole,
        semanticRelation: "time", adverbializationDegree: "nonadverbialized", structureKind: "complex",
        timeProfile: "one-out-of-number", explicitAdverbialIndicator: false, markerUnit: marker("l3-in"), marking: "in" })));
      const observed = whole?.operationFrame?.value === 10 && part?.operationFrame?.value === 1
        && target.isClassicalNahuatlNominalConstructionResult(whole) && target.isClassicalNahuatlNominalConstructionResult(part)
        && result.canonicalResult && result.authorizationStatus === "authorized" && result.relation === "time"
        && result.liveResult?.ruleProfile?.timeProfile === "one-out-of-number"
        && result.liveResult?.sourceContract?.principal?.issuedResult === part
        && result.liveResult?.sourceContract?.adjoined?.issuedResult === whole;
      temporalNumeralWitness = { whole, part, result, observed: observed === true };
    }
    let temporalEllipsisWitness = null;
    if (profileId === "time-elliptical") {
      const source = target.buildClassicalNahuatlPronominalNncSourceFrame({ stem: "īn" });
      const operation = target.buildClassicalNahuatlPronominalNncOperationFrame(source, { subject: "3sg",
        clausePosition: "initial", adjunctorInMode: "none", sentenceType: "statement", polarity: "positive" });
      const demonstrative = target.requestClassicalPronominalNncResult(source, operation);
      const result = summarize(target.evaluateAdverbialAdjunction(baseRequest({ adjoinedUnit: demonstrative,
        semanticRelation: "time", adverbializationDegree: "nonadverbialized", structureKind: "complex",
        timeProfile: "elliptical", explicitAdverbialIndicator: false, markerUnit: marker("l3-in"), marking: "in" })));
      const observed = demonstrative?.authorizationStatus === "authorized" && demonstrative.wordSurface === "īn"
        && result.canonicalResult && result.authorizationStatus === "authorized" && result.relation === "time"
        && result.degree === "nonadverbialized" && result.liveResult?.ruleProfile?.timeProfile === "elliptical"
        && result.liveResult?.sourceContract?.adjoined?.issuedResult === demonstrative
        && result.liveResult?.surface?.startsWith("in īn ") && !result.liveResult.surface.includes("iuhqui");
      temporalEllipsisWitness = { demonstrative, result, observed: observed === true };
    }
    let temporalIuhquiWitness = null;
    if (profileId === "time-iuhqui") {
      const nominal = target.requestClassicalDeverbalNncResult({ constructionKind: "predicate-nominalization",
        nominalizationKind: "preterit-agentive", source: { sourceStem: "iuh", sourceStage: "preterit-predicate",
          sourceVoice: "active", sourceValence: "intransitive", sourceObjectPattern: "none", verbClass: "B" },
        subject: "3sg", state: "absolutive", numberConnector: "qui" });
      const result = summarize(target.evaluateAdverbialAdjunction(baseRequest({ adjoinedUnit: nominal,
        semanticRelation: "time", adverbializationDegree: "nonadverbialized", structureKind: "complex",
        timeProfile: "iuhqui", explicitAdverbialIndicator: false, markerUnit: marker("l3-in"), marking: "in" })));
      const observed = nominal?.authorizationStatus === "authorized" && nominal.wordSurface === "iuhqui"
        && result.canonicalResult && result.authorizationStatus === "authorized" && result.relation === "time"
        && result.degree === "nonadverbialized" && result.liveResult?.ruleProfile?.timeProfile === "iuhqui"
        && result.liveResult?.sourceContract?.adjoined?.issuedResult === nominal;
      temporalIuhquiWitness = { nominal, result, observed: observed === true };
    }
    let explicitTimeWitness = null;
    if (["time-explicit", "time-ic-alternative", "time-alternative-expression", "time-oc-modifier"].includes(profileId)) {
      const icAlternative = profileId !== "time-explicit";
      const icStem = icAlternative ? target.getClassicalNahuatlRelationalStemInventory().find(s => s.stemId === "c-means-purpose-reason-time") : null;
      const temporal = icAlternative ? target.requestClassicalRelationalNncResult({ state: "possessive", possessorId: "3common",
        subjectMode: "adverbialized", subjectId: "3common", sentencePosition: "noninitial",
        nounstem: { kind: target.CLASSICAL_NAHUATL_NNC_NOUNSTEM_REQUEST_KIND, stemId: icStem.stemId, formation: "option-one",
          operation: "relational-nnc", sourceKind: "possessor", sourceFormation: "plain-nounstem", sourceVoice: "active",
          sourceMode: "whole-stem", sourceStem: icStem.classicalMatrix, sourceMatrixStem: icStem.classicalMatrix },
      }) : target.requestClassicalAdverbialNncResult({
        adverbialPotentialFrame: target.resolveClassicalNahuatlAdverbialPotential({ stem: "ihcuāc", clauseKind: "nnc-absolutive" }),
      });
      const nuclear = target.requestClassicalVncApplicationResult({ sourceStem: "ahci", verbClass: "A",
        sourceValence: "intransitive", subject: "2sg", mood: "indicative", tense: "future", requestedVoice: "active" });
      const oc = profileId === "time-oc-modifier" ? marker("l3-oc") : null;
      const modifiedTemporal = oc ? target.evaluateAdverbialAdjunction(baseRequest({ principalClause: temporal, adjoinedUnit: oc,
        adjoinedUnitType: "particle", semanticRelation: "time", adverbializationDegree: "second" })) : null;
      const inner = target.evaluateAdverbialAdjunction(baseRequest({ principalClause: nuclear, adjoinedUnit: modifiedTemporal || temporal,
        semanticRelation: "time", adverbializationDegree: "second",
        ...(oc ? { structureKind: "complex", recursion: "modifier" } : {}) }));
      const result = summarize(target.evaluateAdverbialAdjunction(baseRequest({ adjoinedUnit: inner,
        semanticRelation: "time", adverbializationDegree: "nonadverbialized", structureKind: "complex", recursion: "modifier",
        timeProfile: "explicit", explicitAdverbialIndicator: true, markerUnit: marker("l3-in"), marking: "in" })));
      const observed = target.isAdverbialAdjunctionResult(inner)
        && (oc ? target.isAdverbialAdjunctionResult(modifiedTemporal)
          && modifiedTemporal.sourceContract?.principal?.issuedResult === temporal
          && modifiedTemporal.sourceContract?.adjoined?.grammarFrame === oc.grammarFrame
          && modifiedTemporal.sourceContract?.adjoined?.surface === "oc"
          && modifiedTemporal.ruleProfile?.order === "modifier-head"
          && inner.sourceContract?.adjoined?.grammarFrame === modifiedTemporal.grammarFrame
          : inner.sourceContract?.adjoined?.issuedResult === temporal)
        && inner.sourceContract?.principal?.issuedResult === nuclear
        && (icAlternative ? temporal.surface === "īc" && temporal.predicateState === "possessive" : temporal.wordSurface === "ihcuāc")
        && result.canonicalResult && result.authorizationStatus === "authorized" && result.relation === "time"
        && result.degree === "nonadverbialized" && result.liveResult?.ruleProfile?.timeProfile === "explicit"
        && result.liveResult?.ruleProfile?.explicitAdverbialIndicator === true
        && result.liveResult?.sourceContract?.adjoined?.grammarFrame === inner.grammarFrame;
      explicitTimeWitness = { temporal, nuclear, ...(oc ? { oc, modifiedTemporal } : {}), inner, result, observed: observed === true };
    }
    let otherTemporalWitness = null;
    if (profileId === "time-other-expression") {
      const oc = marker("l3-oc"), nuclear = vnc();
      const inner = target.evaluateAdverbialAdjunction(baseRequest({ principalClause: nuclear, adjoinedUnit: oc,
        adjoinedUnitType: "particle", semanticRelation: "time", adverbializationDegree: "second" }));
      const result = summarize(target.evaluateAdverbialAdjunction(baseRequest({ adjoinedUnit: inner,
        semanticRelation: "time", adverbializationDegree: "nonadverbialized", structureKind: "complex", recursion: "modifier",
        timeProfile: "explicit", explicitAdverbialIndicator: true, markerUnit: marker("l3-in"), marking: "in" })));
      const observed = target.isAdverbialAdjunctionResult(inner)
        && inner.sourceContract?.principal?.issuedResult === nuclear
        && inner.sourceContract?.adjoined?.grammarFrame === oc.grammarFrame
        && inner.sourceContract?.adjoined?.surface === "oc" && inner.ruleProfile?.order === "modifier-head"
        && result.canonicalResult && result.authorizationStatus === "authorized" && result.relation === "time"
        && result.degree === "nonadverbialized" && result.liveResult?.sourceContract?.adjoined?.grammarFrame === inner.grammarFrame;
      otherTemporalWitness = { oc, nuclear, inner, result, observed: observed === true };
    }
    let implicitTimeWitness = null;
    if (profileId === "time-implicit") {
      const adjunct = target.requestClassicalVncApplicationResult({ sourceStem: "ahci", verbClass: "A",
        sourceValence: "intransitive", subject: "2sg", mood: "indicative", tense: "future", requestedVoice: "active" });
      const principal = vnc();
      const result = summarize(target.evaluateAdverbialAdjunction(baseRequest({ principalClause: principal,
        adjoinedUnit: adjunct, adjoinedUnitType: "vnc", semanticRelation: "time", adverbializationDegree: "nonadverbialized",
        structureKind: "complex", timeProfile: "implicit", explicitAdverbialIndicator: false,
        markerUnit: marker("l3-in"), marking: "in" })));
      const observed = result.canonicalResult && result.authorizationStatus === "authorized"
        && result.relation === "time" && result.degree === "nonadverbialized"
        && result.liveResult?.ruleProfile?.timeProfile === "implicit"
        && result.liveResult?.ruleProfile?.explicitAdverbialIndicator === false
        && result.liveResult?.sourceContract?.adjoined?.unitType === "vnc"
        && result.liveResult?.sourceContract?.adjoined?.issuedResult === adjunct
        && result.liveResult?.sourceContract?.principal?.issuedResult === principal;
      implicitTimeWitness = { adjunct, principal, result, observed: observed === true };
    }
    let deinterrogationWitness = null;
    if (profileId === "larger-sentence-deinterrogation") {
      const issue = sentencePosition => target.requestClassicalAdverbialNncResult({
        adverbialPotentialFrame: target.resolveClassicalNahuatlAdverbialPotential({ stem: "quēn", clauseKind: "nnc-absolutive" }),
        context: { sentencePosition },
      });
      const initial = issue("initial"), included = issue("noninitial");
      const request = baseRequest({ adjoinedUnit: included, markerUnit: marker("l3-in"), marking: "in",
        semanticRelation: "manner", adverbializationDegree: "second", structureKind: "adverbial-principal",
        order: "principal-adverbial-head", includedInLargerSentence: true, interrogativeForceRetained: false });
      const inner = target.evaluateAdverbialAdjunction(request);
      const retained = target.evaluateAdverbialAdjunction({ ...request, interrogativeForceRetained: true });
      const outer = summarize(target.evaluateAdverbialAdjunction(baseRequest({ adjoinedUnit: inner,
        semanticRelation: "manner", adverbializationDegree: "second", structureKind: "complex", recursion: "modifier",
        order: "head-modifier", markerUnit: marker("l3-in"), marking: "in" })));
      const observed = initial.operationFrame?.contextFrame?.interrogativeForce === true
        && included.operationFrame?.contextFrame?.interrogativeForce === false
        && target.isAdverbialAdjunctionResult(inner)
        && inner.ruleProfile?.structure === "adverbial-principal" && inner.ruleProfile?.order === "principal-adverbial-head"
        && inner.sourceContract?.adjoined?.issuedResult === included
        && outer.canonicalResult && outer.liveResult?.sourceContract?.adjoined?.grammarFrame === inner.grammarFrame
        && retained?.ok === false && retained?.supported === false
        && retained?.diagnostics?.includes("adverbial-adjunction-included-interrogative-loses-force");
      deinterrogationWitness = { initial, included, inner, retained, outer, observed: observed === true };
    }
    let principalAdverbialWitness = null;
    if (["principal-adverbial-construction", "interrogative-adjunctor-boundary", "quen-adjunctor-exception"].includes(profileId)) {
      const interrogativeBoundary = profileId === "interrogative-adjunctor-boundary";
      const quenException = profileId === "quen-adjunctor-exception";
      const adverbialStem = quenException ? "quēn" : interrogativeBoundary ? "quēmman" : "cēcenyohual";
      const adverbial = target.requestClassicalAdverbialNncResult({
        adverbialPotentialFrame: target.resolveClassicalNahuatlAdverbialPotential({ stem: adverbialStem, clauseKind: "nnc-absolutive" }),
      });
      const nuclear = target.requestClassicalVncApplicationResult({ sourceStem: "tēmiqui", verbClass: "A",
        sourceValence: "intransitive", subject: "1sg", mood: "indicative", tense: "present", requestedVoice: "active" });
      const adjunctor = marker("l3-in");
      // This existing order promotes the adjoined input to semantic principal.
      const request = baseRequest({ principalClause: nuclear, adjoinedUnit: adverbial, markerUnit: adjunctor,
        marking: "in", semanticRelation: quenException ? "manner" : "time", adverbializationDegree: "second",
        structureKind: "adverbial-principal", order: "principal-adverbial-head" });
      const result = summarize(target.evaluateAdverbialAdjunction(request));
      const observed = result.canonicalResult && result.authorizationStatus === "authorized"
        && result.structure === "adverbial-principal" && result.order === "principal-adverbial-head"
        && result.liveResult?.sourceContract?.adjoined?.issuedResult === adverbial
        && result.liveResult?.sourceContract?.principal?.issuedResult === nuclear
        && adverbial.wordSurface === adverbialStem
        && (!(interrogativeBoundary || quenException) || (result.liveResult?.sourceContract?.marker?.grammarFrame === adjunctor.grammarFrame
          && result.liveResult?.surface?.startsWith(`${adverbialStem} in `)))
        && result.liveResult?.formulaRecord?.formula === "ADVERBIAL-PRINCIPAL(CN) + ADJUNCTOR? + ADJOINED-HEAD(CN)";
      principalAdverbialWitness = { adverbial, nuclear, adjunctor, result, observed: observed === true };
    }
    let appositionWitness = null;
    if (["place-time-apposition", "modification-conjunction-contrast"].includes(profileId)) {
      const issue = stem => target.requestClassicalAdverbialNncResult({
        adverbialPotentialFrame: target.resolveClassicalNahuatlAdverbialPotential({ stem, clauseKind: "nnc-absolutive" }),
      });
      const general = issue("mōztla"), specific = issue("teōtlāc");
      const request = baseRequest({ principalClause: general, adjoinedUnit: specific, semanticRelation: "time",
        adverbializationDegree: "second", structureKind: "apposition", order: "appositive-head-modifier", recursion: "appositive" });
      const result = summarize(target.evaluateAdverbialAdjunction(request));
      const reversed = target.evaluateAdverbialAdjunction({ ...request, order: "modifier-head" });
      const observed = result.canonicalResult && result.authorizationStatus === "authorized"
        && result.structure === "apposition" && result.order === "appositive-head-modifier" && result.recursion === "appositive"
        && result.liveResult?.sourceContract?.principal?.issuedResult === general
        && result.liveResult?.sourceContract?.adjoined?.issuedResult === specific
        && general.wordSurface === "mōztla" && specific.wordSurface === "teōtlāc"
        && reversed?.ok === false && reversed?.supported === false
        && reversed?.diagnostics?.includes("adverbial-adjunction-appositive-modifier-must-follow-head");
      appositionWitness = { general, specific, result, reversed, observed: observed === true };
    }
    let modificationConjunctionWitness = null;
    if (profileId === "modification-conjunction-contrast") {
      const nextDay = target.requestClassicalAdverbialNncResult({
        adverbialPotentialFrame: target.resolveClassicalNahuatlAdverbialPotential({ stem: "huīptla", clauseKind: "nnc-absolutive" }),
      });
      const nodes = [appositionWitness.general, nextDay].map((source, index) => target.buildClassicalNahuatlClauseCompositionSourceFrame(source, { referenceId: `time-${index}` }));
      const conjunction = target.evaluateClassicalNahuatlClauseConjunction({ operationKind: "conjunction", conjuncts: nodes,
        options: { relation: "unmarked", coordinationType: "additive", level: "principal", polarity: "positive" } });
      const observed = appositionWitness.observed && target.isClassicalNahuatlClauseConjunctionResultFrame(conjunction)
        && conjunction.authorizationStatus === "authorized" && conjunction.operationKind === "conjunction"
        && conjunction.conjuncts?.length === 2 && conjunction.conjuncts.every((node, index) => node === nodes[index])
        && nextDay.wordSurface === "huīptla"
        && !target.isAdverbialAdjunctionResult(conjunction)
        && !target.isClassicalNahuatlClauseConjunctionResultFrame(appositionWitness.result.liveResult);
      modificationConjunctionWitness = { nextDay, nodes, conjunction, observed: observed === true };
    }
    let recursiveIntensifierWitness = null;
    if (profileId === "recursive-intensifier") {
      const negative = marker("l58-ahmo");
      const niman = target.requestClassicalAdverbialNncResult({
        adverbialPotentialFrame: target.resolveClassicalNahuatlAdverbialPotential({ stem: "niman", clauseKind: "nnc-absolutive" }),
      });
      const zan = marker("l3-zan");
      const inner = target.evaluateAdverbialAdjunction(baseRequest({ principalClause: negative, adjoinedUnit: niman,
        semanticRelation: "time", adverbializationDegree: "second", intensifier: true }));
      const middle = target.evaluateAdverbialAdjunction(baseRequest({ principalClause: inner, adjoinedUnit: zan,
        adjoinedUnitType: "particle", semanticRelation: "manner", adverbializationDegree: "second",
        intensifier: true, structureKind: "complex", recursion: "head" }));
      const outer = summarize(target.evaluateAdverbialAdjunction(baseRequest({ adjoinedUnit: middle,
        semanticRelation: "manner", adverbializationDegree: "second", structureKind: "complex", recursion: "modifier" })));
      const observed = target.isAdverbialAdjunctionResult(inner) && target.isAdverbialAdjunctionResult(middle)
        && inner.ruleProfile?.intensifier === true && middle.ruleProfile?.intensifier === true
        && inner.ruleProfile?.order === "modifier-head" && middle.ruleProfile?.order === "modifier-head"
        && inner.sourceContract?.principal?.grammarFrame === negative.grammarFrame
        && inner.sourceContract?.adjoined?.issuedResult === niman
        && middle.sourceContract?.principal?.grammarFrame === inner.grammarFrame
        && middle.sourceContract?.adjoined?.grammarFrame === zan.grammarFrame
        && outer.canonicalResult && outer.recursion === "modifier"
        && outer.liveResult?.sourceContract?.adjoined?.grammarFrame === middle.grammarFrame;
      recursiveIntensifierWitness = { negative, niman, zan, inner, middle, outer, observed: observed === true };
    }
    const recursionModes = ({ "recursion-system": ["head", "modifier", "both"],
      "head-recursion": ["head"], "modifier-recursion": ["modifier"], "both-sides-recursion": ["both"] })[profileId];
    const recursionWitnesses = (recursionModes || []).map(mode => {
      const inner = target.evaluateAdverbialAdjunction(baseRequest());
      const request = baseRequest({
        ...(mode !== "modifier" ? { principalClause: inner } : {}),
        ...(mode !== "head" ? { adjoinedUnit: inner } : {}),
        structureKind: "complex", recursion: mode,
      });
      const outer = summarize(target.evaluateAdverbialAdjunction(request));
      const observed = target.isAdverbialAdjunctionResult(inner) && inner.ok === true && inner.supported === true
        && outer.canonicalResult && outer.authorizationStatus === "authorized"
        && outer.structure === "complex" && outer.recursion === mode
        && (mode === "modifier" || outer.liveResult?.sourceContract?.principal?.grammarFrame === inner.grammarFrame)
        && (mode === "head" || outer.liveResult?.sourceContract?.adjoined?.grammarFrame === inner.grammarFrame);
      return { mode, inner, outer, observed: observed === true };
    });
    const recursionCoverageComplete = recursionWitnesses.length > 0 && recursionWitnesses.every(w => w.observed);
    const recursiveClosureWitnesses = [];
    if (profileId === "recursive-complexity") {
      let prior = target.evaluateAdverbialAdjunction(baseRequest());
      for (let depth = 1; depth <= 3; depth += 1) {
        const outer = summarize(target.evaluateAdverbialAdjunction(baseRequest({
          principalClause: prior, structureKind: "complex", recursion: "head",
        })));
        const observed = target.isAdverbialAdjunctionResult(prior) && prior.ok === true && prior.supported === true
          && outer.canonicalResult && outer.authorizationStatus === "authorized"
          && outer.structure === "complex" && outer.recursion === "head"
          && outer.liveResult?.sourceContract?.principal?.grammarFrame === prior.grammarFrame;
        recursiveClosureWitnesses.push({ depth, prior, outer, observed: observed === true });
        prior = outer.liveResult;
      }
    }
    const recursiveClosureObserved = recursiveClosureWitnesses.length === 3 && recursiveClosureWitnesses.every(w => w.observed);
    const collocationStem = ({ "mach-recursive-interrogative": "mach", "interrogative-nel-collocation": "nel" })[profileId];
    let interrogativeCollocationWitness = null;
    if (collocationStem) {
      const adverb = target.requestClassicalAdverbialNncResult({
        adverbialPotentialFrame: target.resolveClassicalNahuatlAdverbialPotential({ stem: collocationStem, clauseKind: "nnc-absolutive" }),
      });
      const modifier = target.requestClassicalAdverbialNncResult({
        adverbialPotentialFrame: target.resolveClassicalNahuatlAdverbialPotential({ stem: "quēn", clauseKind: "nnc-absolutive" }),
        context: { sentencePosition: "initial" },
      });
      const inner = summarize(target.evaluateAdverbialAdjunction(baseRequest({
        adjoinedUnit: adverb, semanticRelation: "manner", adverbializationDegree: "second",
      })));
      const outer = summarize(target.evaluateAdverbialAdjunction(baseRequest({
        principalClause: inner.liveResult, adjoinedUnit: modifier, semanticRelation: "manner", adverbializationDegree: "second",
        structureKind: "complex", recursion: "head", inherentlyInterrogative: true,
      })));
      const observed = inner.canonicalResult && inner.authorizationStatus === "authorized" && inner.order === "modifier-head"
        && inner.liveResult?.sourceContract?.adjoined?.issuedResult === adverb
        && inner.liveResult?.sourceContract?.adjoined?.surface === collocationStem
        && modifier.operationFrame?.contextFrame?.interrogativeForce === true
        && outer.canonicalResult && outer.authorizationStatus === "authorized" && outer.recursion === "head" && outer.order === "modifier-head"
        && outer.liveResult?.sourceContract?.principal?.grammarFrame === inner.liveResult.grammarFrame
        && outer.liveResult?.sourceContract?.adjoined?.issuedResult === modifier;
      interrogativeCollocationWitness = { adverb, modifier, inner, outer, observed: observed === true };
    }
    const recursiveQuestionWitnesses = profileId === "cuix-recursive-interrogative" ? ["cuix", "intonation"].map(questionMode => {
      const sentence = target.requestClassicalVncSentenceResultFrame(target.requestClassicalVncApplicationResult({
        sourceStem: "cati", verbClass: "B", sourceValence: "intransitive", subject: "3sg",
        mood: "indicative", tense: "present", requestedVoice: "active", sentenceType: "yes-no-question", questionMode,
      }));
      const inner = summarize(target.evaluateAdverbialAdjunction(baseRequest({ principalClause: sentence, order: "head-modifier" })));
      const modifier = target.requestClassicalAdverbialNncResult({
        adverbialPotentialFrame: target.resolveClassicalNahuatlAdverbialPotential({ stem: "quēn", clauseKind: "nnc-absolutive" }),
        context: { sentencePosition: "initial" },
      });
      const outer = summarize(target.evaluateAdverbialAdjunction(baseRequest({
        principalClause: inner.liveResult, adjoinedUnit: modifier, semanticRelation: "manner", adverbializationDegree: "second",
        structureKind: "complex", recursion: "head", order: "modifier-head", inherentlyInterrogative: true,
      })));
      const observed = inner.canonicalResult && inner.authorizationStatus === "authorized"
        && inner.liveResult?.sourceContract?.principal?.issuedResult === sentence
        && /^cuix\b/iu.test(inner.liveResult?.sourceContract?.principal?.surface || "") === (questionMode === "cuix")
        && modifier.operationFrame?.contextFrame?.interrogativeForce === true
        && outer.canonicalResult && outer.authorizationStatus === "authorized" && outer.recursion === "head"
        && outer.order === "modifier-head" && outer.liveResult?.sourceContract?.principal?.grammarFrame === inner.liveResult.grammarFrame
        && outer.liveResult?.sourceContract?.adjoined?.issuedResult === modifier;
      return { questionMode, sentence, inner, modifier, outer, observed: observed === true };
    }) : [];
    const recursiveQuestionObserved = recursiveQuestionWitnesses.length === 2 && recursiveQuestionWitnesses.every(w => w.observed);
    const inherentQuestionProfile = profileId === "inherent-interrogative-order";
    const interrogativeModifierWitness = inherentQuestionProfile ? target.requestClassicalAdverbialNncResult({
      adverbialPotentialFrame: target.resolveClassicalNahuatlAdverbialPotential({ stem: "quēn", clauseKind: "nnc-absolutive" }),
      context: { sentencePosition: "initial" },
    }) : null;
    const cuixSentenceWitness = profileId === "cuix-first-order" || inherentQuestionProfile ? target.requestClassicalVncSentenceResultFrame(
      target.requestClassicalVncApplicationResult({ sourceStem: "cati", verbClass: "B", sourceValence: "intransitive",
        subject: "3sg", mood: "indicative", tense: "present", requestedVoice: "active",
        sentenceType: "yes-no-question", questionMode: "cuix" }),
    ) : null;
    const particleAdverbialWitness = profileId === "particle-adverbial-collocation" ? target.requestClassicalAdverbialNncResult({
      adverbialPotentialFrame: target.resolveClassicalNahuatlAdverbialPotential({ stem: "tequitl", clauseKind: "nnc-absolutive" }),
      context: { precedingParticle: "zan" },
    }) : null;
    const adjectivalIntensifierProfile = profileId === "adjectival-head-intensifier";
    const adjectivalNnc = stem => {
      const frame = target.buildClassicalNahuatlAbsolutiveNncFrame(stem, { subject: "3sg", nounClass: "zero", animacy: "inanimate" });
      return target.executeClassicalGrammarApplicationRequest({ operationId: "nnc:sentence-surface", outputKind: "scalar",
        args: [frame.nncSlotFrame, { sentenceType: "assertion", polarity: "positive" }],
      }).canonicalResult;
    };
    const adjectivalHeadWitness = adjectivalIntensifierProfile ? adjectivalNnc("cuācualli") : null;
    const adjectivalOuterHeadWitness = adjectivalIntensifierProfile ? adjectivalNnc("cactli") : null;
    const adjectivalIntensifierWitness = adjectivalIntensifierProfile ? target.requestClassicalAdverbialNncResult({
      adverbialPotentialFrame: target.resolveClassicalNahuatlAdverbialPotential({ stem: "huel", clauseKind: "nnc-absolutive" }),
    }) : null;
    const lexicalizedIntensifierProfile = profileId === "lexicalized-intensifier-collocation";
    const lexicalizedIntensifierWitness = lexicalizedIntensifierProfile ? target.requestClassicalAdverbialNncResult({
      adverbialPotentialFrame: target.resolveClassicalNahuatlAdverbialPotential({ stem: "huel", clauseKind: "nnc-absolutive" }),
    }) : null;
    const lexicalizedHeadWitness = lexicalizedIntensifierProfile ? target.requestClassicalAdverbialNncResult({
      adverbialPotentialFrame: target.resolveClassicalNahuatlAdverbialPotential({ stem: "imman", clauseKind: "nnc-absolutive" }),
    }) : null;
    const particleIntensifierProfile = profileId === "particle-intensifier";
    const particleIntensifierWitness = particleIntensifierProfile ? marker("l3-ahzo") : null;
    const negativeNimanProfile = profileId === "negative-niman-intensifier";
    const negativeNimanWitness = negativeNimanProfile ? target.requestClassicalAdverbialNncResult({
      adverbialPotentialFrame: target.resolveClassicalNahuatlAdverbialPotential({ stem: "niman", clauseKind: "nnc-absolutive" }),
    }) : null;
    const negativeHeadWitness = negativeNimanProfile ? target.requestClassicalAdverbialNncResult({
      adverbialPotentialFrame: target.resolveClassicalNahuatlAdverbialPotential({ stem: "huel", clauseKind: "nnc-absolutive" }),
      context: { negativeParticle: "ah" },
    }) : null;
    const basicIntensifierProfile = ["intensifier-capability", "intensifier-order-translation", "intensifier-inventory-analysis"].includes(profileId);
    const intensifierNncWitness = basicIntensifierProfile ? target.requestClassicalAdverbialNncResult({
      adverbialPotentialFrame: target.resolveClassicalNahuatlAdverbialPotential({ stem: "nel", clauseKind: "nnc-absolutive" }),
    }) : null;
    const intensifierRequest = adjectivalIntensifierProfile ? baseRequest({
      principalClause: adjectivalHeadWitness, adjoinedUnit: adjectivalIntensifierWitness,
      semanticRelation: "manner", adverbializationDegree: "second", intensifier: true,
    }) : lexicalizedIntensifierProfile ? baseRequest({
      principalClause: lexicalizedHeadWitness, adjoinedUnit: lexicalizedIntensifierWitness,
      semanticRelation: "manner", adverbializationDegree: "second", intensifier: true,
    }) : particleIntensifierProfile ? baseRequest({
      adjoinedUnit: particleIntensifierWitness, adjoinedUnitType: "particle",
      semanticRelation: "manner", adverbializationDegree: "second", intensifier: true,
    }) : negativeNimanProfile ? baseRequest({
      principalClause: negativeHeadWitness, adjoinedUnit: negativeNimanWitness,
      semanticRelation: "time", adverbializationDegree: "second", intensifier: true,
    }) : basicIntensifierProfile ? baseRequest({
      adjoinedUnit: intensifierNncWitness, semanticRelation: "manner", adverbializationDegree: "second", intensifier: true,
    }) : null;
    const reversedIntensifierWitness = basicIntensifierProfile || negativeNimanProfile || particleIntensifierProfile || lexicalizedIntensifierProfile
      ? target.evaluateAdverbialAdjunction({ ...intensifierRequest, order: "head-modifier" }) : null;
    const result = considerationWitness ? considerationWitness.result : locativeClauseWitness ? locativeClauseWitness.result : temporalDowngradeWitness ? temporalDowngradeWitness.result : demonstrativeSubjectWitness ? demonstrativeSubjectWitness.result : otherTemporalWitness ? otherTemporalWitness.result : temporalNumeralWitness ? temporalNumeralWitness.result : temporalEllipsisWitness ? temporalEllipsisWitness.result : temporalIuhquiWitness ? temporalIuhquiWitness.result : explicitTimeWitness ? explicitTimeWitness.result : implicitTimeWitness ? implicitTimeWitness.result : deinterrogationWitness ? deinterrogationWitness.outer : principalAdverbialWitness ? principalAdverbialWitness.result : appositionWitness ? appositionWitness.result : recursiveIntensifierWitness ? recursiveIntensifierWitness.outer : intensifierRequest ? summarize(target.evaluateAdverbialAdjunction(intensifierRequest)) : particleAdverbialWitness ? summarize(target.evaluateAdverbialAdjunction(baseRequest({
      adjoinedUnit: particleAdverbialWitness, semanticRelation: "manner",
    }))) : interrogativeCollocationWitness ? interrogativeCollocationWitness.outer : recursiveQuestionWitnesses.length ? recursiveQuestionWitnesses[0].outer : cuixSentenceWitness ? summarize(target.evaluateAdverbialAdjunction(baseRequest({
      principalClause: cuixSentenceWitness, order: inherentQuestionProfile ? "modifier-head" : "head-modifier",
      ...(inherentQuestionProfile ? { adjoinedUnit: interrogativeModifierWitness, semanticRelation: "manner", adverbializationDegree: "second", inherentlyInterrogative: true } : {}),
    }))) : recursiveClosureWitnesses.length ? recursiveClosureWitnesses.at(-1).outer : recursionModes ? recursionWitnesses[0].outer : summarize(matchedCounterpartRequest
      ? target.evaluateAdverbialAdjunction(matchedCounterpartRequest)
      : multipleNucleusWitness
      ? target.evaluateAdverbialAdjunction(baseRequest({ principalClause: multipleNucleusWitness }))
      : hypotheticalTenseWitness ? hypotheticalTenseWitness.result : untilWitness ? untilWitness.result : conditionHistoricalWitnesses.length ? conditionHistoricalWitnesses[0].result.liveResult : conditionOptativeWitnesses.length ? conditionOptativeWitnesses[0].result.liveResult : conditionSupplementWitness ? conditionSupplementWitness.result : conditionContrastWitnesses.length ? conditionContrastWitnesses[0].result.liveResult : conditionOrderWitness ? conditionOrderWitness.before : conditionSentenceWitnesses.length ? conditionSentenceWitnesses[0].result : purposeOptionalWitness ? purposeOptionalWitness.absent : purposeAmbiguityWitness ? purposeAmbiguityWitness.result : evaluateProfile(profileKind(profileId), profileId));
    const purposiveAdjunct = profileId === "purpose-purposive-vnc" ? result.liveResult?.sourceContract?.adjoined?.issuedResult : null;
    const purposiveAdjunctObserved = Boolean(purposiveAdjunct && result.canonicalResult
      && result.authorizationStatus === "authorized" && result.relation === "purpose"
      && result.degree === "nonadverbialized" && target.isClassicalNahuatlClosureFrame(purposiveAdjunct)
      && purposiveAdjunct.authorizationStatus === "authorized"
      && purposiveAdjunct.operationFrame?.operation === "purposive"
      && purposiveAdjunct.operationFrame?.operationFacts?.series === "outbound-nonpast-indicative");
    const negativeConditionObserved = profileId === "condition-negative" && result.canonicalResult
      && result.authorizationStatus === "authorized" && result.relation === "condition"
      && result.liveResult?.sourceContract?.marker?.grammarFrame?.unitFrame?.particleId === "l3-in-tla-ca"
      && result.liveResult.sourceContract.marker.grammarFrame.morphBoundaryFrame.rightAttachedToFollowingUnit === true
      && result.liveResult.surface.startsWith(`${result.liveResult.sourceContract.marker.surface}${result.liveResult.sourceContract.adjoined.surface} `);
    const conditionNncObserved = profileId === "condition-nnc-center" && result.canonicalResult
      && result.authorizationStatus === "authorized" && result.relation === "condition" && result.conditionType === "open"
      && result.liveResult?.sourceContract?.principal?.unitType === "vnc"
      && result.liveResult?.sourceContract?.adjoined?.unitType === "nnc"
      && result.liveResult?.sourceContract?.adjoined?.issuedResult?.operationFrame?.value === 1;
    const concessionMarkerSpec = ({
      "concession-in-tla-nel": ["in-tla-nel", "in tlā nel", "l50-in-tla-nel", "inTlaNelConcessionLicensed"],
      "concession-ma-zo": ["ma-zo", "mā zo", "l3-ma-zo", "maZoConcessionLicensed"],
      "concession-ma-zo-tel": ["ma-zo-tel", "mā zo tēl", "l3-ma-zo-tel", "maZoTelConcessionLicensed"],
    })[profileId];
    const concessionMarkerObserved = Boolean(concessionMarkerSpec && result.canonicalResult
      && result.authorizationStatus === "authorized" && result.relation === "concession"
      && result.liveResult?.ruleProfile?.concessionType === concessionMarkerSpec[0]
      && result.liveResult?.sourceContract?.marker?.surface === concessionMarkerSpec[1]
      && result.liveResult.sourceContract.marker.grammarFrame?.unitFrame?.particleId === concessionMarkerSpec[2]);
    const conditionMarkerObserved = profileId === "condition-marker" && result.canonicalResult
      && result.authorizationStatus === "authorized" && result.relation === "condition"
      && result.marking === "tla" && result.conditionType === "open"
      && result.liveResult?.sourceContract?.marker?.unitType === "particle"
      && result.liveResult?.sourceContract?.marker?.surface === "tlā";
    const conditionCoreProfile = ["condition-core", "condition-vnc-center"].includes(profileId);
    const conditionCoreObserved = conditionCoreProfile && result.canonicalResult
      && result.authorizationStatus === "authorized" && result.relation === "condition"
      && result.degree === "nonadverbialized" && result.conditionType === "open"
      && result.marking === "in-tla"
      && result.liveResult?.sourceContract?.principal?.unitType === "vnc"
      && result.liveResult?.sourceContract?.adjoined?.unitType === "vnc"
      && result.liveResult?.sourceContract?.adjoined?.features?.mood === "optative"
      && result.liveResult?.sourceContract?.adjoined?.features?.tense === "nonpast";
    const maPurposeObserved = profileId === "purpose-ma-optative" && result.canonicalResult
      && result.authorizationStatus === "authorized" && result.relation === "purpose"
      && result.degree === "nonadverbialized" && result.purposeType === "ma-optative"
      && result.marking === "ma" && result.liveResult?.sourceContract?.marker?.surface === "mā"
      && result.liveResult?.sourceContract?.adjoined?.unitType === "vnc"
      && result.liveResult?.sourceContract?.adjoined?.features?.mood === "optative";
    const futurePurposeObserved = profileId === "purpose-future" && result.canonicalResult
      && result.authorizationStatus === "authorized" && result.relation === "purpose"
      && result.degree === "nonadverbialized" && result.purposeType === "unmarked"
      && result.liveResult?.sourceContract?.adjoined?.unitType === "vnc"
      && result.liveResult?.sourceContract?.adjoined?.features?.mood === "indicative"
      && result.liveResult?.sourceContract?.adjoined?.features?.tense === "future";
    const adjectivalOuterWitness = adjectivalIntensifierProfile ? target.evaluateClassicalNahuatlAdjectivalModification({
      operationKind: "adjectival-modification", topology: "ordinary", order: "modifier-head-preposed", adjunctor: "none",
      head: adjectivalOuterHeadWitness, modifier: result.liveResult,
    }) : null;
    // Inner NNC intensification does not by itself establish its outer adjectival function.
    const adjectivalInnerObserved = Boolean(adjectivalIntensifierProfile && result.canonicalResult
      && result.authorizationStatus === "authorized" && result.liveResult?.ruleProfile?.intensifier === true
      && result.order === "modifier-head"
      && result.liveResult?.sourceContract?.principal?.issuedResult === adjectivalHeadWitness
      && result.liveResult?.sourceContract?.adjoined?.issuedResult === adjectivalIntensifierWitness);
    const adjectivalOuterObserved = Boolean(adjectivalInnerObserved
      && target.isClassicalNahuatlResultFrame(adjectivalOuterWitness)
      && adjectivalOuterWitness?.authorizationStatus === "authorized"
      && adjectivalOuterWitness.selectedClauses?.[0]?.sourceResult === adjectivalOuterHeadWitness
      && adjectivalOuterWitness.selectedClauses?.[1]?.sourceResult === result.liveResult);
    const lexicalizedIntensifierObserved = Boolean(lexicalizedIntensifierProfile && result.canonicalResult && result.authorizationStatus === "authorized"
      && result.liveResult?.ruleProfile?.intensifier === true && result.order === "modifier-head"
      && result.liveResult?.sourceContract?.principal?.issuedResult === lexicalizedHeadWitness
      && result.liveResult?.sourceContract?.adjoined?.issuedResult === lexicalizedIntensifierWitness
      && lexicalizedHeadWitness?.wordSurface === "imman" && lexicalizedIntensifierWitness?.wordSurface === "huel"
      && reversedIntensifierWitness?.ok === false && reversedIntensifierWitness?.supported === false
      && reversedIntensifierWitness?.diagnostics?.includes("adverbial-adjunction-intensifier-must-precede-head"));
    const particleIntensifierObserved = Boolean(particleIntensifierProfile && result.canonicalResult && result.authorizationStatus === "authorized"
      && result.liveResult?.ruleProfile?.intensifier === true && result.order === "modifier-head"
      && result.liveResult?.sourceContract?.adjoined?.grammarFrame === particleIntensifierWitness?.grammarFrame
      && result.liveResult?.sourceContract?.adjoined?.unitType === "particle"
      && result.liveResult?.sourceContract?.adjoined?.surface === "ahzo"
      && reversedIntensifierWitness?.ok === false && reversedIntensifierWitness?.supported === false
      && reversedIntensifierWitness?.diagnostics?.includes("adverbial-adjunction-intensifier-must-precede-head"));
    const negativeNimanObserved = Boolean(negativeNimanProfile && result.canonicalResult && result.authorizationStatus === "authorized"
      && result.liveResult?.ruleProfile?.intensifier === true && result.order === "modifier-head"
      && result.liveResult?.sourceContract?.principal?.issuedResult === negativeHeadWitness
      && result.liveResult?.sourceContract?.adjoined?.issuedResult === negativeNimanWitness
      && negativeHeadWitness?.operationFrame?.contextFrame?.negativeParticle === "ah"
      && negativeHeadWitness?.operationFrame?.contextFrame?.semanticPolarity === "negative"
      && negativeNimanWitness?.wordSurface === "niman"
      && reversedIntensifierWitness?.ok === false && reversedIntensifierWitness?.supported === false
      && reversedIntensifierWitness?.diagnostics?.includes("adverbial-adjunction-intensifier-must-precede-head"));
    const intensifierObserved = Boolean(basicIntensifierProfile && result.canonicalResult && result.authorizationStatus === "authorized"
      && result.liveResult?.ruleProfile?.intensifier === true && result.order === "modifier-head"
      && result.liveResult?.sourceContract?.adjoined?.issuedResult === intensifierNncWitness
      && result.liveResult?.sourceContract?.adjoined?.unitType === "nnc"
      && reversedIntensifierWitness?.ok === false && reversedIntensifierWitness?.supported === false
      && reversedIntensifierWitness?.diagnostics?.includes("adverbial-adjunction-intensifier-must-precede-head"));
    const particleAdverbialObserved = Boolean(particleAdverbialWitness && result.canonicalResult && result.authorizationStatus === "authorized"
      && result.relation === "manner" && result.liveResult?.sourceContract?.adjoined?.issuedResult === particleAdverbialWitness
      && particleAdverbialWitness.authorizationStatus === "authorized"
      && particleAdverbialWitness.operationFrame?.contextFrame?.precedingParticle === "zan"
      && result.liveResult?.sourceContract?.adjoined?.unitType === "nnc");
    const cuixFirstObserved = Boolean(cuixSentenceWitness && result.canonicalResult && result.authorizationStatus === "authorized"
      && result.order === "head-modifier"
      && result.liveResult?.sourceContract?.principal?.issuedResult === cuixSentenceWitness
      && /^cuix\b/iu.test(result.liveResult?.sourceContract?.principal?.surface || ""));
    const inherentQuestionObserved = Boolean(inherentQuestionProfile && result.canonicalResult && result.authorizationStatus === "authorized"
      && result.order === "modifier-head" && result.relation === "manner"
      && interrogativeModifierWitness?.operationFrame?.contextFrame?.interrogativeForce === true
      && result.liveResult?.sourceContract?.principal?.issuedResult === cuixSentenceWitness
      && result.liveResult?.sourceContract?.adjoined?.issuedResult === interrogativeModifierWitness);
    const matchedCounterpartObserved = Boolean(matchedCounterpartRequest && result.canonicalResult
      && result.authorizationStatus === "authorized" && result.relation === "compared-manner"
      && result.liveResult?.sourceContract?.principal?.issuedResult === matchedCounterpartRequest.principalClause
      && result.liveResult?.sourceContract?.adjoined?.issuedResult === matchedCounterpartRequest.adjoinedUnit);
    const supplementContrastObserved = Boolean(supplementContrastWitness && matchedCounterpartObserved
      && target.isClassicalNahuatlSupplementationFrame(supplementContrastWitness)
      && supplementContrastWitness.authorizationStatus === "authorized"
      && supplementContrastWitness.referenceFrame?.referenceMode === "shared"
      && supplementContrastWitness.principalClause.subject.category === contrastSubject
      && supplementContrastWitness.supplementClause.subject.category === contrastSubject
      && supplementContrastWitness.principalClause.subject.referenceId === supplementContrastWitness.supplementClause.subject.referenceId);
    const multipleNucleusObserved = Boolean(multipleNucleusWitness
      && target.isClassicalNahuatlSupplementationFrame(multipleNucleusWitness)
      && multipleNucleusWitness.authorizationStatus === "authorized"
      && multipleNucleusWitness.principalClause !== multipleNucleusWitness.supplementClause
      && result.canonicalResult && result.authorizationStatus === "authorized"
      && result.structure === "simple" && result.recursion === "none"
      && result.liveResult?.sourceContract?.principal?.issuedResult === multipleNucleusWitness);
    const simpleProfile = ["simple-definition", "simple-order-reverse"].includes(profileId);
    const normalOrderWitness = profileId === "simple-order-reverse"
      ? summarize(evaluateProfile("simple", "simple-definition")) : null;
    const simpleObserved = witness => Boolean(witness?.canonicalResult
      && witness.authorizationStatus === "authorized" && witness.structure === "simple"
      && witness.recursion === "none");
    const simpleCoverageComplete = !simpleProfile || (simpleObserved(result)
      && result.order === (profileId === "simple-definition" ? "modifier-head" : "head-modifier")
      && (!normalOrderWitness || (simpleObserved(normalOrderWitness) && normalOrderWitness.order === "modifier-head")));
    const relationSet = profileId === "relation-system" ? evaluateRelationSet() : [];
    const observedRelations = [...new Set(relationSet.filter(entry => entry.canonicalResult
      && entry.authorizationStatus === "authorized" && entry.degree === "nonadverbialized").map(entry => entry.relation))];
    const relationCoverageComplete = relationSet.length === 10 && observedRelations.length === relationSet.length
      && relationSet.every(entry => entry.canonicalResult && entry.authorizationStatus === "authorized"
        && entry.degree === "nonadverbialized" && entry.relation === entry.expectedRelation);
    const documentaryField = ({ "interrogative-spelling-analysis": "traditionalSpellingAuthorizesStructure",
      "concession-spelling-analysis": "traditionalSpellingAuthorizesStructure",
      "concession-morphology-analysis": "storedMorphologicalAnalysisAuthorizesAdjunction",
      "concession-example-spelling-analysis": "exampleSpellingAuthorizesStructure",
      "concession-source-analysis": "reportedSourceJudgmentAuthorizesStructure",
      "reason-translation-analysis": "dictionaryTranslationAuthorizesStructure",
      "reason-camo-spelling-analysis": "traditionalCamoSpellingAuthorizesReason",
      "collocation-spelling-analysis": "traditionalSpellingAuthorizesStructure",
      "place-spelling-analysis": "traditionalSpellingAuthorizesStructure",
      "condition-supplement-analysis": "supplementationClaimAuthorizesCondition",
      "time-alternative-expression": "alternativeTemporalExpressionAuthorizesStructure",
      "intensifier-inventory-analysis": "inventoryHeadingAuthorizesStructure",
      "intensifier-order-translation": "translationAuthorizesStructure",
      "collocation-translation-analysis": "translationCompositionAuthorizesStructure" })[profileId];
    const concessionDocumentary = ["concession-spelling-analysis", "concession-morphology-analysis", "concession-example-spelling-analysis", "concession-source-analysis"].includes(profileId);
    const reasonDocumentary = ["reason-translation-analysis", "reason-camo-spelling-analysis"].includes(profileId);
    const documentarySlots = concessionDocumentary || reasonDocumentary ? ["principalClause", "adjoinedUnit", "markerUnit"] : ["principalClause", "adjoinedUnit"];
    const documentaryCounterwitnesses = documentaryField ? documentarySlots.map(slot => {
      const carrier = profileId === "collocation-spelling-analysis"
        ? { sourceSection: "50.8", surface: "immazo", traditionalSpelling: "immazo", normalizedSpelling: "in mā zo" }
        : reasonDocumentary
        ? { sourceSection: "50.11", documentaryReason: true, surface: "camo", traditionalSpelling: "camo",
          possibleAnalysis: "ca ahmō", dictionaryTranslation: "because", semanticMarker: "ca", authorizationStatus: "authorized" }
        : profileId === "concession-source-analysis"
        ? { sourceSection: "50.8", reportedSource: "Carochi as explained by Andrews",
          sourceJudgment: "zan would imply worthiness as son or companion with willingness to accept servant status",
          surface: "mā nel zan", authorizationStatus: "authorized" }
        : profileId === "concession-example-spelling-analysis"
        ? { sourceSection: "50.8", surface: "macihuin", traditionalSpelling: "macihuin",
          possibleAnalyses: ["mā zo ihui in", "mā zo iuh in"], authorizationStatus: "authorized" }
        : concessionDocumentary
        ? { sourceSection: "50.8", surface: "intlanelle", traditionalSpelling: "intlanelle",
          morphologicalAnalysis: "in tlā nel yeh", semanticMarker: "in-tla-nel", authorizationStatus: "authorized" }
        : profileId === "condition-supplement-analysis"
        ? { sourceSection: "50.7.1.a", supplementationClaim: "nominal is supplementary subject of ce", surface: "cē tlācatl", authorizationStatus: "authorized" }
        : profileId === "place-spelling-analysis"
        ? { sourceSection: "50.3", traditionalSpelling: "nochpotzin", normalizedSpelling: "nochpōchtzin", surface: "nochpotzin" }
        : profileId === "time-alternative-expression"
        ? { sourceSection: "50.2.2", alternativeExpression: "Ca ye imman in titequitizqueh", surface: "Ca ye imman in titequitizqueh", synonymousWith: "Ca ye imman in īc titequitizqueh" }
        : profileId === "intensifier-inventory-analysis"
        ? { inventoryHeading: "Intensifiers", sourceSection: "49.6", surface: "nel", intensifier: true }
        : profileId === "interrogative-spelling-analysis"
        ? { traditionalSpelling: "quemmach", surface: "quemmach", sourceSection: "49.4" }
        : { translation: "how in the world", surface: "how in the world", compositionAnalysis: "interrogative plus adverb" };
      const rejected = target.evaluateAdverbialAdjunction(baseRequest({ ...(concessionDocumentary ? {
        adjoinedUnit: vnc(), adjoinedUnitType: "vnc", semanticRelation: "concession", concessionType: "in-tla-nel",
        adverbializationDegree: "nonadverbialized", structureKind: "complex", marking: "in-tla-nel", markerUnit: marker("l50-in-tla-nel"),
      } : reasonDocumentary ? {
        adjoinedUnit: sentence(), adjoinedUnitType: "sentence", semanticRelation: "reason",
        adverbializationDegree: "nonadverbialized", structureKind: "complex", marking: "ca", markerUnit: marker("l3-ca"),
        order: "head-modifier",
      } : {}), [slot]: carrier }));
      const expectedDiagnostic = `adverbial-adjunction-canonical-${slot === "principalClause" ? "principal" : slot === "markerUnit" ? "marker" : "adjoined"}-result-required`;
      return { slot, rejected, expectedDiagnostic, observed: rejected?.ok === false && rejected?.supported === false
        && rejected?.diagnostics?.includes(expectedDiagnostic) === true };
    }) : [];
    const documentaryAuthorityBlocked = documentaryCounterwitnesses.length === documentarySlots.length && documentaryCounterwitnesses.every(w => w.observed);
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
        && (!basicIntensifierProfile || intensifierObserved)
        && (!negativeNimanProfile || negativeNimanObserved)
        && (!particleIntensifierProfile || particleIntensifierObserved)
        && (!lexicalizedIntensifierProfile || lexicalizedIntensifierObserved)
        && (!adjectivalIntensifierProfile || adjectivalOuterObserved)
        && (!recursiveIntensifierWitness || recursiveIntensifierWitness.observed)
        && (!appositionWitness || appositionWitness.observed)
        && (!modificationConjunctionWitness || modificationConjunctionWitness.observed)
        && (!principalAdverbialWitness || principalAdverbialWitness.observed)
        && (!deinterrogationWitness || deinterrogationWitness.observed)
        && (!implicitTimeWitness || implicitTimeWitness.observed)
        && (!explicitTimeWitness || explicitTimeWitness.observed)
        && (!temporalIuhquiWitness || temporalIuhquiWitness.observed)
        && (!temporalEllipsisWitness || temporalEllipsisWitness.observed)
        && (!temporalNumeralWitness || temporalNumeralWitness.observed)
        && (!otherTemporalWitness || otherTemporalWitness.observed)
        && (!demonstrativeSubjectWitness || demonstrativeSubjectWitness.observed)
        && (!temporalDowngradeWitness || temporalDowngradeWitness.observed)
        && (!locativeClauseWitness || locativeClauseWitness.observed)
        && (!considerationWitness || considerationWitness.observed)
        && (!purposeAmbiguityWitness || purposeAmbiguityWitness.observed)
        && (!purposeOptionalWitness || purposeOptionalWitness.observed)
        && (profileId !== "purpose-future" || futurePurposeObserved)
        && (profileId !== "purpose-ma-optative" || maPurposeObserved)
        && (!conditionCoreProfile || conditionCoreObserved)
        && (profileId !== "condition-marker" || conditionMarkerObserved)
        && (!concessionMarkerSpec || concessionMarkerObserved)
        && (profileId !== "condition-nnc-center" || conditionNncObserved)
        && (profileId !== "condition-negative" || negativeConditionObserved)
        && (profileId !== "condition-sentence-types" || conditionSentenceCount === 5)
        && (!conditionOrderWitness || conditionOrderWitness.observed)
        && (profileId !== "condition-open-hypothetical" || conditionContrastObserved)
        && (!conditionSupplementWitness || conditionSupplementWitness.observed)
        && (profileId !== "condition-optative-tense" || conditionOptativeObserved)
        && (!conditionMoodAmbiguity || conditionMoodAmbiguityObserved)
        && (profileId !== "condition-present-for-past" || conditionHistoricalObserved)
        && (!untilWitness || untilWitness.observed)
        && (!hypotheticalTenseWitness || hypotheticalTenseWitness.observed)
        && futureEmbedWitnesses.every(w => w.observed)
        && antecessiveMatchWitnesses.every(w => w.observed)
        && (!unprefixedContextWitness || unprefixedContextWitness.observed)
        && (!strictPastWitness || strictPastWitness.observed)
        && omissionWitnesses.every(w => w.observed)
        && concessionPronounWitnesses.every(w => w.observed)
        && maNelWitnesses.every(w => w.observed)
        && restrictiveParticleWitnesses.every(w => w.observed)
        && (!reasonWitness || reasonWitness.observed)
        && (profileId !== "purpose-purposive-vnc" || purposiveAdjunctObserved)
        && (profileId !== "relation-system" || relationCoverageComplete)
        && (profileId !== "particle-adverbial-collocation" || particleAdverbialObserved)
        && (!documentaryField || documentaryAuthorityBlocked)
        && (!collocationStem || interrogativeCollocationWitness.observed)
        && (profileId !== "cuix-recursive-interrogative" || recursiveQuestionObserved)
        && (!inherentQuestionProfile || inherentQuestionObserved)
        && (profileId !== "cuix-first-order" || cuixFirstObserved)
        && (profileId !== "recursive-complexity" || recursiveClosureObserved)
        && (!recursionModes || recursionCoverageComplete)
        && (!supplementContrastProfile || supplementContrastObserved)
        && (!compoundProfile || (incorporatedMannerObserved && matchedCounterpartObserved))
        && (profileId !== "multiple-nucleus-simple" || multipleNucleusObserved)
        && simpleCoverageComplete
        && relationSet.every(entry => entry.canonicalResult)
          ? "authorized" : "blocked",
      result,
      ...(hypotheticalTenseWitness ? { hypotheticalTenseWitness } : {}),
      ...(futureEmbedWitnesses.length ? { futureEmbedWitnesses } : {}),
      ...(antecessiveMatchWitnesses.length ? { antecessiveMatchWitnesses } : {}),
      ...(unprefixedContextWitness ? { unprefixedContextWitness } : {}),
      ...(strictPastWitness ? { strictPastWitness } : {}),
      ...(omissionWitnesses.length ? { omissionWitnesses } : {}),
      ...(concessionPronounWitnesses.length ? { concessionPronounWitnesses } : {}),
      ...(maNelWitnesses.length ? { maNelWitnesses } : {}),
      ...(restrictiveParticleWitnesses.length ? { restrictiveParticleWitnesses } : {}),
      ...(reasonWitness ? { reasonWitness } : {}),
      ...(untilWitness ? { untilWitness } : {}),
      ...(conditionHistoricalWitnesses.length ? { conditionHistoricalWitnesses } : {}),
      ...(conditionOptativeWitnesses.length ? { conditionOptativeWitnesses } : {}),
      ...(conditionSupplementWitness ? { conditionSupplementWitness } : {}),
      ...(conditionContrastWitnesses.length ? { conditionContrastWitnesses } : {}),
      ...(conditionOrderWitness ? { conditionOrderWitness } : {}),
      ...(conditionSentenceWitnesses.length ? { conditionSentenceWitnesses } : {}),
      ...(purposeAmbiguityWitness ? { purposeAmbiguityWitness } : {}),
      ...(purposeOptionalWitness ? { purposeOptionalWitness } : {}),
      ...(considerationWitness ? { considerationWitness } : {}),
      ...(locativeClauseWitness ? { locativeClauseWitness } : {}),
      ...(temporalDowngradeWitness ? { temporalDowngradeWitness,
        ...(!temporalDowngradeWitness.observed ? { blockReason: "temporal-ic-supplementary-possessor-witness-required" } : {}) } : {}),
      ...(demonstrativeSubjectWitness ? { demonstrativeSubjectWitness } : {}),
      ...(otherTemporalWitness ? { otherTemporalWitness } : {}),
      ...(temporalNumeralWitness ? { temporalNumeralWitness } : {}),
      ...(temporalEllipsisWitness ? { temporalEllipsisWitness } : {}),
      ...(temporalIuhquiWitness ? { temporalIuhquiWitness } : {}),
      ...(explicitTimeWitness ? { explicitTimeWitness } : {}),
      ...(implicitTimeWitness ? { implicitTimeWitness } : {}),
      ...(deinterrogationWitness ? { deinterrogationWitness } : {}),
      ...(principalAdverbialWitness ? { principalAdverbialWitness } : {}),
      ...(modificationConjunctionWitness ? { modificationConjunctionWitness } : {}),
      ...(appositionWitness ? { appositionWitness } : {}),
      ...(recursiveIntensifierWitness ? { recursiveIntensifierWitness } : {}),
      ...(adjectivalIntensifierProfile ? { adjectivalHeadWitness, adjectivalOuterHeadWitness, adjectivalIntensifierWitness,
        adjectivalOuterWitness, ...(!adjectivalOuterObserved ? { blockReason: "adjectival-intensifier-outer-composition-witness-required" } : {}) } : {}),
      ...(lexicalizedIntensifierProfile ? { lexicalizedIntensifierWitness, lexicalizedHeadWitness, reversedIntensifierWitness } : {}),
      ...(particleIntensifierProfile ? { particleIntensifierWitness, reversedIntensifierWitness } : {}),
      ...(negativeNimanProfile ? { negativeNimanWitness, negativeHeadWitness, reversedIntensifierWitness } : {}),
      ...(basicIntensifierProfile ? { intensifierNncWitness, reversedIntensifierWitness } : {}),
      ...(particleAdverbialWitness ? { particleAdverbialWitness } : {}),
      ...(documentaryField ? { documentaryCounterwitnesses } : {}),
      ...(collocationStem && !interrogativeCollocationWitness.observed ? { blockReason: "interrogative-collocation-degree-adjunction-witness-not-established" } : {}),
      ...(collocationStem ? { interrogativeCollocationWitness } : {}),
      ...(recursiveQuestionWitnesses.length ? { recursiveQuestionWitnesses } : {}),
      ...(inherentQuestionProfile ? { interrogativeModifierWitness } : {}),
      ...(cuixSentenceWitness ? { cuixSentenceWitness } : {}),
      ...(profileId === "recursive-complexity" ? { recursiveClosureWitnesses } : {}),
      ...(recursionModes ? { recursionWitnesses } : {}),
      ...(supplementContrastProfile ? { supplementContrastWitness } : {}),
      ...(compoundProfile ? { incorporatedMannerWitness } : {}),
      ...(profileId === "multiple-nucleus-simple" ? { multipleNucleusWitness } : {}),
      ...(normalOrderWitness ? { normalOrderWitness } : {}),
      relationSet,
      analysis: {
        ...facts,
        ...(reasonWitness ? (profileId === "reason-ca-juxtaposition"
          ? { caIntroducesPrincipalClause: reasonWitness.observed }
          : { caIsConjunction: reasonWitness.observed ? false : null }) : {}),
        ...(restrictiveParticleWitnesses.length ? {
          zanAndZaRemainSemanticallyDistinct: restrictiveParticleWitnesses.every(w => w.observed),
          restrictiveParticleScope: "owner-issued-lexical-meaning-distinction-not-automatic-context-inference-or-full-at-least-collocation-proof",
        } : {}),
        ...(maNelWitnesses.length ? { inMaNelConcessionLicensed: maNelWitnesses.every(w => w.observed) } : {}),
        ...(concessionPronounWitnesses.length ? {
          concessionMayTakeIntensivePronoun: concessionPronounWitnesses.every(w => w.observed),
        } : {}),
        ...(concessionMarkerSpec ? { [concessionMarkerSpec[3]]: concessionMarkerObserved } : {}),
        ...(omissionWitnesses.length ? {
          tlaMayBeOmittedWithConditionalCue: omissionWitnesses.every(w => w.observed),
          omissionScope: "actual-ahzo-and-at-compositions-not-exhaustive-contextual-cue-inventory",
        } : {}),
        ...(strictPastWitness ? {
          matchedAntecessiveSelectsStrictPast: strictPastWitness.observed,
          strictPastScope: "matched-prefixed-hypothetical-condition-admits-past-rejects-present-future-not-a-universal-prefix-time-rule",
        } : {}),
        ...(unprefixedContextWitness ? {
          absentAntecessiveLeavesContextualTime: unprefixedContextWitness.observed,
          unprefixedContextScope: "same-unprefixed-constituents-and-surface-admit-both-explicit-hypothetical-analyses-not-automatic-context-inference",
        } : {}),
        ...(antecessiveMatchWitnesses.length ? {
          pastAntecessiveMustMatchAcrossClauses: antecessiveMatchWitnesses.every(w => w.observed),
        } : {}),
        ...(futureEmbedWitnesses.length ? {
          hypotheticalPrincipalRequiresFutureEmbed: futureEmbedWitnesses.every(w => w.observed),
        } : {}),
        ...(hypotheticalTenseWitness ? {
          [profileId === "condition-antecessive-absent" ? "presentFutureHypothesisRequiresAbsentAntecessive"
            : profileId === "condition-hypothetical-past" ? "pastHypothesisRequiresPastOptative"
              : "presentFutureHypothesisRequiresPastOptative"]: hypotheticalTenseWitness.observed,
        } : {}),
        ...(untilWitness ? {
          negativeTemporalConditionalMayExpressUntil: untilWitness.observed ? true : null,
          untilScope: "typed-camo-ihcuac-negative-temporal-condition-source-supported-until-reading-not-automatic-translation",
        } : {}),
        ...(profileId === "condition-present-for-past" ? {
          presentIndicativeMayStandForPast: conditionHistoricalObserved,
          conditionHistoricalScope: "principal-and-adjunct-present-preserved-with-explicit-past-discourse-context-not-automatic-time-inference",
        } : {}),
        ...(conditionMoodAmbiguity ? {
          formIdentityDoesNotSelectMood: conditionMoodAmbiguityObserved,
          conditionMoodScope: "identical-cati-surface-with-distinct-indicative-present-and-optative-nonpast-results-not-automatic-disambiguation",
        } : {}),
        ...(profileId === "condition-optative-tense" ? {
          futureAndPreteritOptativeLicensed: conditionOptativeObserved,
          conditionOptativeScope: "actual-future-and-preterit-optative-open-conditions-not-past-optative-hypothesis",
        } : {}),
        ...(profileId === "condition-negative" ? {
          negativeConditionalMarkerLicensed: negativeConditionObserved,
          negativeConditionObservationScope: "issued-in-tla-ca-with-right-attached-negative-prefix-not-camo-variant",
        } : {}),
        ...(conditionSupplementWitness ? {
          actualSupplementedNncConditionObserved: conditionSupplementWitness.observed,
          conditionSupplementScope: "issued-ce-with-supplementary-subject-not-documentary-claim-authority",
        } : {}),
        ...(profileId === "condition-nnc-center" ? {
          nncMayCenterConditionAdjunct: conditionNncObserved,
          conditionNncScope: "actual-cardinal-ce-nnc-condition-not-supplementation-or-contextual-time-inference",
        } : {}),
        ...(profileId === "condition-open-hypothetical" ? {
          openAndHypotheticalRemainSeparate: conditionContrastObserved,
          conditionContrastScope: "open-nonpast-versus-hypothetical-past-optative-with-future-embed-principal-not-context-inference",
        } : {}),
        ...(conditionOrderWitness ? {
          conditionMayPrecedeOrFollowPrincipal: conditionOrderWitness.observed,
          conditionOrderScope: "same-open-vnc-condition-in-both-orders-not-every-conditional-subtype",
        } : {}),
        ...(profileId === "condition-sentence-types" ? {
          principalSentenceTypeCount: conditionSentenceCount,
          conditionSentenceScope: "five-issued-principal-sentence-types-with-open-vnc-condition-not-all-condition-subtypes",
        } : {}),
        ...(profileId === "condition-marker" ? {
          tlaIntroducesCondition: conditionMarkerObserved,
          conditionMarkerScope: "issued-tla-in-open-condition-not-traditional-solid-intla-spelling",
        } : {}),
        ...(conditionCoreProfile ? {
          [profileId === "condition-vnc-center" ? "vncMayCenterConditionAdjunct" : "conditionRelationLicensed"]: conditionCoreObserved,
          conditionCoreScope: "open-optative-nonpast-vnc-condition-not-all-nnc-hypothetical-or-principal-sentence-types",
        } : {}),
        ...(purposeOptionalWitness ? {
          [profileId === "condition-in-optional" ? "conditionAdjunctorOptionalityLicensed" : "purposeAdjunctorMayBeAbsent"]: purposeOptionalWitness.observed,
          purposeOptionalScope: profileId === "condition-in-optional"
            ? "same-open-condition-with-tla-or-in-tla-not-solid-intla-spelling"
            : "same-finite-purpose-constituents-with-and-without-in-not-conjunction-identity",
        } : {}),
        ...(purposeAmbiguityWitness ? {
          purposeMayCompeteWithAdjectivalClause: purposeAmbiguityWitness.observed,
          purposeAmbiguityScope: "same-purposive-attached-to-action-or-its-nominal-participant-not-automatic-discourse-parse",
        } : {}),
        ...(considerationWitness ? {
          [profileId === "consideration-shared-reference" ? "sharedReferenceDoesNotCollapseSupplementationAndAdjunction" : profileId === "consideration-projective" ? "nonspecificProjectiveObjectBlocksIncludedReferentAnalysis" : profileId === "consideration-reflexive" ? "reflexivePrincipalSupportsConsiderationAnalysis" : "considerationAdjoinedClauseLicensed"]: considerationWitness.observed,
          considerationObservationScope: profileId === "consideration-shared-reference"
            ? "matched-vnc-object-subject-shared-reference-distinct-owner-structures-not-discourse-disambiguation"
            : profileId === "consideration-projective"
            ? "nonspecific-tla-mati-consideration-and-included-object-rejection-not-all-projective-readings"
            : profileId === "consideration-reflexive"
            ? "ninomati-reflexive-contact-with-consideration-not-automatic-belief-translation"
            : "intransitive-principal-without-object-contact-not-all-consideration-readings" } : {}),
        ...(profileId === "place-structural-ambiguity" ? { placeStructureMayCompeteWithApposition: demonstrativeSubjectWitness.observed,
          placeAmbiguityObservationScope: "matched-pani-telpochcalli-analyses-not-contextual-disambiguation" } : {}),
        ...(locativeClauseWitness ? {
          [profileId === "manner-relation" ? "mannerAdjoinedClauseLicensed" : "locativeAdjoinedClauseLicensed"]: locativeClauseWitness.observed,
          locativeClauseObservationScope: profileId === "manner-relation"
            ? "issued-iuh-plus-finite-vnc-inside-manner-clause-not-all-manner-subtypes"
            : "issued-place-plus-finite-vnc-adjoined-unit-not-reduced-copula-or-contextual-time" } : {}),
        ...(temporalDowngradeWitness ? { downgradeToMultipleNucleusLicensed: temporalDowngradeWitness.observed ? true : null,
          temporalDowngradeObservationScope: "ic-with-supplementary-possessor-on-not-contextual-past-future-resolution" } : {}),
        ...(demonstrativeSubjectWitness && profileId !== "place-structural-ambiguity" ? {
          [profileId === "place-reduced-copula" ? "reducedCopulaAnalysisLicensed" : "demonstrativeSubjectWithAdverbialPredicateLicensed"]: demonstrativeSubjectWitness.observed,
          demonstrativeTemporalObservationScope: profileId === "place-reduced-copula"
            ? "locative-predicate-and-demonstrative-subject-without-vnc-not-copula-deletion-transformation"
            : "shared-subject-ihcuac-in-not-higher-tense-reference-resolution" } : {}),
        ...(otherTemporalWitness ? { otherTemporalEmbedsLicensed: otherTemporalWitness.observed,
          otherTemporalObservationScope: "oc-plus-finite-clause-without-ic-not-all-other-temporal-expressions" } : {}),
        ...(profileId === "time-oc-modifier" ? { ocMayModifyTemporalIc: explicitTimeWitness.observed,
          ocTemporalObservationScope: "oc-modifies-ic-before-nuclear-and-outer-composition-not-frequency-or-fused-spelling" } : {}),
        ...(profileId === "time-alternative-expression" ? {
          alternativeTemporalExpressionIsEvidenceOnly: documentaryAuthorityBlocked,
          alternativeExpressionObservationScope: "two-documentary-carrier-rejections-not-equivalence-of-all-alternative-forms",
        } : {}),
        ...(temporalNumeralWitness ? { oneOutOfNumberTemporalExtensionLicensed: temporalNumeralWitness.observed,
          temporalNumeralObservationScope: "one-out-of-ten-basic-numerals-not-all-classifiers-or-ratios" } : {}),
        ...(temporalEllipsisWitness ? { temporalIuhquiMayBeElliptical: temporalEllipsisWitness.observed,
          temporalEllipsisObservationScope: "issued-in-demonstrative-without-iuhqui-not-automatic-ellipsis-reconstruction" } : {}),
        ...(temporalIuhquiWitness ? { temporalIuhquiLicensed: temporalIuhquiWitness.observed } : {}),
        ...(explicitTimeWitness ? {
          [profileId !== "time-explicit" ? "possessiveIcTemporalAlternativeLicensed" : "explicitTemporalAdverbialLicensed"]: explicitTimeWitness.observed,
          explicitTimeObservationScope: profileId !== "time-explicit" ? "possessive-ic-inside-temporal-unit-not-all-synonymous-contexts" : "ihcuac-inside-issued-adjoined-unit-not-indicator-flag-alone" } : {}),
        ...(implicitTimeWitness ? { timeMayBeImplicit: implicitTimeWitness.observed,
          implicitTimeObservationScope: "finite-vnc-adjunct-without-time-nnc-not-automatic-contextual-time-inference" } : {}),
        ...(profileId === "relation-system" ? { nonadverbializedAdjunctionLicensed: relationCoverageComplete,
          relationTypeCount: observedRelations.length, observedRelations,
          relationSystemObservationScope: "ten-meaning-types-with-one-issued-witness-each-not-all-subtypes" } : {}),
        ...(deinterrogationWitness ? { includedInterrogativeLosesQuestionForce: deinterrogationWitness.observed,
          deinterrogationObservationScope: "quen-noninitial-context-and-nested-principal-structure-not-all-complement-embeddings" } : {}),
        ...(profileId === "quen-adjunctor-exception" ? {
          quenRejectsSeparateAdjunctor: principalAdverbialWitness.observed ? false : null,
          intactQuenAllowsFollowingAdjunctor: principalAdverbialWitness.observed,
          quenExceptionObservationScope: "intact-quen-plus-in-not-splitting-quen-into-que-in",
        } : {}),
        ...(principalAdverbialWitness && profileId !== "quen-adjunctor-exception" ? {
          [profileId === "interrogative-adjunctor-boundary" ? "adjunctorSeparatesBeforeAdjoinedClause" : "adverbialClauseMayBePrincipalUnit"]: principalAdverbialWitness.observed,
          principalAdverbialObservationScope: profileId === "interrogative-adjunctor-boundary"
            ? "quemman-in-issued-marker-boundary-not-global-interrogative-force"
            : "cecenyohual-in-nitemiqui-semantic-principal-not-request-slot-name" } : {}),
        ...(modificationConjunctionWitness ? { modificationAndConjunctionRemainSeparate: modificationConjunctionWitness.observed,
          modificationConjunctionObservationScope: "moztla-teotlac-apposition-versus-moztla-huiptla-coordination-not-contextual-reading-inference" } : {}),
        ...(appositionWitness ? { generalPlaceOrTimePrecedesSpecificNnc: appositionWitness.observed,
          appositionObservationScope: "moztla-teotlac-temporal-example-not-all-place-time-relations" } : {}),
        ...(recursiveIntensifierWitness ? { intensifierMayRecurseInsideModifier: recursiveIntensifierWitness.observed,
          recursiveIntensifierObservationScope: "zan-niman-ahmo-nested-modifier-not-all-49.7-collocations" } : {}),
        ...(adjectivalIntensifierProfile ? {
          intensifierMayModifyAdjectivalNnc: adjectivalOuterObserved,
          innerNncIntensificationObserved: adjectivalInnerObserved,
          adjectivalIntensifierObservationScope: "huel-cuacualli-modifying-cactli-with-issued-inner-and-outer-results",
        } : {}),
        ...(lexicalizedIntensifierProfile ? {
          lexicalizedIntensifierCollocationLicensed: lexicalizedIntensifierObserved,
          lexicalizedIntensifierObservationScope: "huel-imman-composition-not-idiomatic-translation-or-inventory-coverage",
          idiomaticTranslationObserved: null,
        } : {}),
        ...(particleIntensifierProfile ? {
          particleIntensifierLicensed: particleIntensifierObserved,
          particleIntensifierObservationScope: "issued-ahzo-not-entire-particle-inventory",
        } : {}),
        ...(negativeNimanProfile ? {
          negativeScopeIntensifierLicensed: negativeNimanObserved,
          negativeIntensifierObservationScope: "niman-before-ahhuel-not-every-negative-or-contextual-translation",
        } : {}),
        ...(basicIntensifierProfile ? {
          [profileId === "intensifier-capability" ? "adverbialNncMayIntensify" : "intensifierPrecedesHead"]: intensifierObserved,
        } : {}),
        ...(profileId === "particle-adverbial-collocation" ? {
          particleMayModifyAdverbializedNnc: particleAdverbialObserved,
          particleCollocationObservationScope: "zan-tequitl-not-entire-49.5-inventory",
        } : {}),
        ...(documentaryField ? {
          [documentaryField]: documentaryAuthorityBlocked ? false : null,
          documentaryAuthorityObservationScope: "principal-and-adjoined-carrier-substitutions-not-every-metadata-path",
        } : {}),
        ...(collocationStem ? {
          [collocationStem === "mach" ? "inherentlyInterrogativeModifierMayModifyMachStructure" : "nelFollowsInterrogativeAdverbial"]: interrogativeCollocationWitness.observed,
          collocationObservationScope: "typed-constituents-and-order-not-pragmatic-reading-selection",
        } : {}),
        ...(recursiveQuestionWitnesses.length ? {
          cuixMayModifyRecursiveAdjunction: recursiveQuestionObserved,
          optionalCuixWithInterrogativeWitnessed: recursiveQuestionObserved,
        } : {}),
        ...(inherentQuestionProfile ? { inherentlyInterrogativeModifierRetainsForce: inherentQuestionObserved } : {}),
        ...(profileId === "cuix-first-order" ? { cuixPrecedesWhenNoInherentInterrogative: cuixFirstObserved } : {}),
        ...(profileId === "recursive-complexity" ? {
          recursionDepthIsNotLessonBounded: null,
          recursiveResultReentryObserved: recursiveClosureObserved,
          verifiedRecursiveReentries: recursiveClosureObserved ? recursiveClosureWitnesses.length : null,
          recursiveDepthProofScope: "finite-reentry-witness-not-unbounded-depth-proof",
        } : {}),
        ...(recursionModes ? {
          [({ "recursion-system": "headOrModifierOrBothMayRecurse", "head-recursion": "recursiveHeadRequiresIssuedPriorComposition",
            "modifier-recursion": "recursiveModifierRequiresIssuedPriorComposition", "both-sides-recursion": "bothHeadAndModifierMayRecurse" })[profileId]]: recursionCoverageComplete,
        } : {}),
        ...(supplementContrastProfile ? {
          [profileId === "metaphorical-supplement-contrast" ? "metaphoricalSupplementIsNotAdverbialAdjunction" : "thirdSingularAllowsSupplementAmbiguity"]: supplementContrastObserved,
          supplementContrastObservationScope: "two-authorized-analyses-not-contextual-reading-selection",
        } : {}),
        ...(compoundProfile ? {
          [profileId === "incorporated-counterpart-contrast" ? "incorporatedAdverbHasSingleNucleus" : "comparedMannerCompoundIsSingleNucleus"]: incorporatedMannerObserved,
          matchedDoubleNucleusCounterpartObserved: matchedCounterpartObserved,
          counterpartObservationScope: "same-stem-compound-and-double-nucleus-compared-manner-not-supplementation",
        } : {}),
        ...(profileId === "multiple-nucleus-simple" ? {
          simpleAdjunctionAllowsMultipleNucleusUnits: multipleNucleusObserved,
          multipleNucleusObservationScope: "supplemented-principal-not-all-adjectival-combinations",
        } : {}),
        ...(profileId === "simple-definition" ? {
          simpleRequiresNonrecursiveUnits: simpleObserved(result),
          simpleStructureObservationScope: "issued-simple-nonrecursive-witness",
        } : {}),
        ...(profileId === "simple-order-reverse" ? {
          modifierNormallyPrecedesHead: simpleObserved(normalOrderWitness) && normalOrderWitness.order === "modifier-head",
          headModifierOrderLicensed: simpleObserved(result) && result.order === "head-modifier",
          orderObservationScope: "both-orders-licensed-not-frequency-measurement",
        } : {}),
        ...(profileId === "purpose-purposive-vnc" ? {
          purposiveVncMayServeAsAdjunct: purposiveAdjunctObserved,
          purposiveObservationScope: "actual-outbound-cuica-purposive-in-purpose-adjunction-not-all-series-or-adjectival-ambiguity",
        } : {}),
        ...(profileId === "purpose-ma-optative" ? {
          maOptativePurposeLicensed: maPurposeObserved,
          maPurposeScope: "issued-ma-with-optative-purpose-not-admonitive-lest-or-all-in-ma-variants",
        } : {}),
        ...(profileId === "purpose-future" ? {
          futurePurposeIsUsual: null,
          futurePurposeIsLicensed: futurePurposeObserved,
          purposeObservationScope: "indicative-future-purpose-admission-not-frequency-or-exclusive-tense-rule",
          sourceDescription: "Andrews 50.6 describes future as usual and explicitly permits other tenses.",
        } : {}),
        ...(profileId === "purpose-other-tense" ? {
          // This witness establishes the present-tense case in Andrews 50.6,
          // not a blanket claim about every tense other than the future.
          nonfuturePurposeIsLicensed: result.canonicalResult
            && result.authorizationStatus === "authorized"
            && result.relation === "purpose"
            && result.liveResult?.sourceContract?.adjoined?.unitType === "vnc"
            && result.liveResult?.sourceContract?.adjoined?.features?.mood === "indicative"
            && result.liveResult?.sourceContract?.adjoined?.features?.tense === "present",
        } : {}),
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
