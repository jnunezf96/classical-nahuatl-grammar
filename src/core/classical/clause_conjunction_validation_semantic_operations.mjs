// Non-authorizing validation projection for the typed clause-conjunction owner.
// Each profile is consumed by one independent Andrews semantic owner. This
// module owns no grammar, Inventory atom, route, receipt, or migration status.

const ISSUED_VALIDATION_FRAMES = new WeakSet();

function deepFreeze(value) {
  if (!value || typeof value !== "object" || Object.isFrozen(value)) return value;
  if (Array.isArray(value)) return Object.freeze(value.map(deepFreeze));
  for (const child of Object.values(value)) deepFreeze(child);
  return Object.freeze(value);
}

function assertRuntime(target, name) {
  if (typeof target?.[name] !== "function") {
    throw new Error(`clause-conjunction-validation-runtime-capability-required:${name}`);
  }
}

const PROFILE_IDS = Object.freeze([
  "conjunction-architecture", "balanced-conjuncts", "conjunct-units",
  "coordination-semantics", "markedness-system", "unmarked-asyndeton",
  "conjunction-polarity", "conjunction-arity", "translation-authority-boundary",
  "macron-spelling-analysis", "parallel-formation-analysis", "embed-distinction",
  "shared-supplement-ordering", "adjoined-conjunction-function",
  "series-list-conjunction", "supplementary-object-conjunction",
  "shared-modifier-scope", "adversative-arity", "auh-placement",
  "marked-topic-continuation", "shared-possessor-reference",
  "possessive-glottal-analysis", "modifier-status", "modifier-markedness-compatibility",
  "additive-modifier-inventory", "translation-insertion-boundary",
  "ihuan-relational-structure", "translation-mirage", "translator-choice-boundary",
  "ihuan-explicit-silent-head", "proxy-principal", "ihuan-collocations",
  "collocation-translation", "negative-additive-inventory", "alternative-modifier-inventory",
  "alternative-spelling-analysis", "zan-adversative", "tel-yeceh-adversative",
  "yeh-neh-adversative", "modifier-not-conjunctor", "modifier-in-interaction",
  "correlation-not-conjunctor", "standard-correlation", "loose-correlation",
  "lexical-conjunction-arity", "lexical-shared-referent", "lexical-translation-boundary",
  "lexical-source-boundary", "downstream-conjunctive-compound", "lexical-possessive-state",
  "lexical-synonymy-idiom", "lexical-incorporation", "lexical-derivation",
  "lexical-adjunctor-distribution", "sex-differentiated-reference",
  "predicate-noun-biclausalism", "lexical-semantic-types", "lord-master-unit",
  "literal-conjunction-contrast", "parallel-structure-creation", "parallel-structure-types",
  "rephrasive-definition", "rephrasive-grammar-variants", "appositive-parallelism",
  "progressive-parallelism",
]);

const PROFILE_FACTS = deepFreeze(Object.fromEntries(PROFILE_IDS.map(profileId => [
  profileId,
  {
    semanticBoundary: profileId,
    typedConjunctionExecutionRequired: true,
    storedTranslationAuthority: false,
    traditionalSpellingAuthority: false,
    curriculumCoordinateAuthority: false,
  },
])));

const CORRELATIVE_PROFILES = new Set([
  "correlation-not-conjunctor", "standard-correlation", "loose-correlation",
]);
const LEXICAL_PROFILES = new Set([
  "lexical-conjunction-arity", "lexical-shared-referent",
  "lexical-translation-boundary", "lexical-source-boundary",
  "downstream-conjunctive-compound", "lexical-possessive-state",
  "lexical-synonymy-idiom", "lexical-incorporation", "lexical-derivation",
  "lexical-adjunctor-distribution", "sex-differentiated-reference",
  "predicate-noun-biclausalism", "lexical-semantic-types", "lord-master-unit",
  "literal-conjunction-contrast",
]);
const PARALLEL_PROFILES = new Set([
  "parallel-formation-analysis", "parallel-structure-creation",
  "parallel-structure-types", "rephrasive-definition",
  "rephrasive-grammar-variants", "appositive-parallelism",
  "progressive-parallelism",
]);

export function createClassicalClauseConjunctionValidationSemanticOperationsApi(
  targetObject = globalThis,
) {
  const target = targetObject && typeof targetObject === "object"
    ? targetObject : globalThis;

  function nnc(stem, referenceId = "shared", { possessive = false } = {}) {
    const source = possessive
      ? target.buildClassicalNahuatlPossessiveNncFrame(stem, {
          subject: "3sg",
          possessor: "3sg",
          singularConnector: "0",
          nounstemRelationKind: "nonrelational",
          possessorCompatibility: "ordinary",
          animacy: "animate",
        })
      : target.buildClassicalNahuatlAbsolutiveNncFrame(stem, {
          subject: "3sg",
          nounClass: "zero",
          animacy: "animate",
        });
    return target.buildClassicalNahuatlClauseCompositionSourceFrame(source, {
      referenceId,
      subjectReferenceId: referenceId,
      ...(possessive ? { possessorReferenceId: `${referenceId}-possessor` } : {}),
    });
  }

  function vnc(stem, referenceId = "actor") {
    const result = target.requestClassicalVncApplicationResult({
      sourceStem: stem,
      verbClass: "A",
      sourceValence: "intransitive",
      subject: "3sg",
      objectKind: "none",
      objectPerson: "",
      requestedDerivation: "direct",
      requestedVoice: "active",
      mood: "indicative",
      tense: "present",
      outputScope: "single",
    });
    return target.buildClassicalNahuatlClauseCompositionSourceFrame(result, {
      referenceId,
      subjectReferenceId: referenceId,
    });
  }

  function baseNodes() {
    return [vnc("cuīca", "singer"), vnc("mihtōtīa", "dancer")];
  }

  function lexicalNodes(profileId) {
    const possessive = profileId === "lexical-possessive-state";
    const stems = profileId === "sex-differentiated-reference"
      ? ["cihuātl", "oquichtli", "pilli"]
      : ["tēuctli", "tlahtoāni", "tiyācāuh"];
    const count = profileId === "lexical-conjunction-arity" ? 3 : 2;
    return stems.slice(0, count).map(stem => nnc(stem, "shared-ruler", { possessive }));
  }

  function generalRequest(profileId) {
    let conjuncts = baseNodes();
    const options = {
      relation: "unmarked",
      coordinationType: "additive",
      level: "principal",
      polarity: "positive",
    };
    let sharedSupplement = null;
    if (["markedness-system", "auh-placement", "marked-topic-continuation"].includes(profileId)) {
      options.relation = "marked";
    }
    if (["series-list-conjunction", "conjunction-arity"].includes(profileId)) {
      conjuncts = [...conjuncts, nnc("tlahtoāni", "chief")];
    }
    if (["shared-supplement-ordering", "supplementary-object-conjunction"].includes(profileId)) {
      sharedSupplement = nnc("tlahtoāni", "shared-supplement");
    }
    if (profileId === "shared-modifier-scope") {
      options.sharedModifierScope = "before-first-applies-to-all";
      options.sharedModifier = "aic";
    }
    if (["adjoined-conjunction-function", "supplementary-object-conjunction"].includes(profileId)) {
      options.level = "adjoined";
      options.adjoinedFunction = "supplementary-object";
    }
    if (profileId === "adversative-arity") {
      options.coordinationType = "adversative";
      options.rightwardModifier = "zan";
    }
    if (["ihuan-relational-structure", "ihuan-explicit-silent-head", "proxy-principal", "ihuan-collocations"].includes(profileId)) {
      options.rightwardModifier = "ihuan";
    }
    if (profileId === "negative-additive-inventory") {
      options.polarity = "negative";
      options.rightwardModifier = "ahno";
    }
    if (["alternative-modifier-inventory", "alternative-spelling-analysis"].includes(profileId)) {
      options.coordinationType = "alternative";
      options.rightwardModifier = "ahzo-eh";
      options.modifierAdjunctor = "in";
    }
    if (profileId === "zan-adversative") {
      options.coordinationType = "adversative";
      options.rightwardModifier = "zan";
    }
    if (profileId === "tel-yeceh-adversative") {
      options.coordinationType = "adversative";
      options.rightwardModifier = "yeceh";
    }
    if (["yeh-neh-adversative", "modifier-in-interaction"].includes(profileId)) {
      options.coordinationType = "adversative";
      options.rightwardModifier = "yeh";
      options.modifierAdjunctor = "in";
    }
    if (profileId === "additive-modifier-inventory") options.rightwardModifier = "oc-no-ihuan";
    if (profileId === "marked-topic-continuation") {
      conjuncts = [conjuncts[1]];
      options.leftContextAbsent = true;
    }
    return { operationKind: "conjunction", conjuncts, sharedSupplement, options };
  }

  function correlativeRequest(profileId) {
    if (profileId === "loose-correlation") {
      return {
        operationKind: "correlative-conjunction",
        conjuncts: [nnc("cē", "left"), nnc("occē", "right")],
        options: { correlationType: "loose", pattern: "paired-nncs" },
      };
    }
    return {
      operationKind: "correlative-conjunction",
      conjuncts: baseNodes(),
      options: { correlationType: "standard", pattern: "ahzo-ahzo-no" },
    };
  }

  function lexicalRequest(profileId) {
    return {
      operationKind: "lexical-conjunction",
      conjuncts: lexicalNodes(profileId),
      options: {
        lexicalType: profileId === "lexical-synonymy-idiom"
          ? "bread-and-butter" : "lord-and-master",
        adjunctorDistribution: profileId === "lexical-adjunctor-distribution"
          ? "in-before-each" : "none",
        stateRealization: profileId === "downstream-conjunctive-compound"
          ? "compound-handoff" : "conjoined-stems",
      },
    };
  }

  function parallelRequest(profileId) {
    const options = { parallelType: "rephrasive" };
    if (profileId === "rephrasive-grammar-variants") options.rephraseAxis = "active-passive";
    if (profileId === "appositive-parallelism") options.appositiveType = "clarifying";
    if (profileId === "progressive-parallelism") options.parallelType = "progressive";
    if (profileId === "parallel-structure-types") options.parallelType = "combined";
    return { operationKind: "parallel-structure", conjuncts: baseNodes(), options };
  }

  function evaluateProfile(profileId) {
    const request = CORRELATIVE_PROFILES.has(profileId)
      ? correlativeRequest(profileId)
      : LEXICAL_PROFILES.has(profileId)
        ? lexicalRequest(profileId)
        : PARALLEL_PROFILES.has(profileId)
          ? parallelRequest(profileId)
          : generalRequest(profileId);
    return target.evaluateClassicalNahuatlClauseConjunction(request);
  }

  function buildClassicalClauseConjunctionValidationFrame(
    profileId = "conjunction-architecture",
  ) {
    for (const capability of [
      "buildClassicalNahuatlAbsolutiveNncFrame",
      "buildClassicalNahuatlPossessiveNncFrame",
      "requestClassicalVncApplicationResult",
      "buildClassicalNahuatlClauseCompositionSourceFrame",
      "evaluateClassicalNahuatlClauseConjunction",
      "isClassicalNahuatlClauseConjunctionResultFrame",
    ]) assertRuntime(target, capability);
    const facts = PROFILE_FACTS[profileId];
    if (!facts) throw new Error(`clause-conjunction-validation-profile-required:${profileId}`);
    const liveResult = evaluateProfile(profileId);
    const raw = target.evaluateClassicalNahuatlClauseConjunction({
      operationKind: "conjunction",
      conjuncts: ["stored-left", { surface: "stored-right" }],
      options: { relation: "unmarked", coordinationType: "additive", level: "principal", polarity: "positive" },
      lesson: 52,
      formula: "#FORGED#",
      surface: "forged surface",
    });
    const genuine = baseNodes();
    const copied = JSON.parse(JSON.stringify(genuine[0]));
    const copiedResult = target.evaluateClassicalNahuatlClauseConjunction({
      operationKind: "conjunction",
      conjuncts: [copied, genuine[1]],
      options: { relation: "unmarked", coordinationType: "additive", level: "principal", polarity: "positive" },
    });
    const canonicalResult = target.isClassicalNahuatlClauseConjunctionResultFrame(liveResult) === true;
    const frame = deepFreeze({
      kind: "classical-nahuatl-clause-conjunction-validation-frame",
      profileId,
      authorizationStatus: canonicalResult
        && liveResult.authorizationStatus === "authorized"
        && raw?.authorizationStatus === "blocked"
        && copiedResult?.authorizationStatus === "blocked"
        ? "authorized" : "blocked",
      result: {
        canonicalResult,
        authorizationStatus: liveResult?.authorizationStatus || "blocked",
        operationKind: liveResult?.operationKind || "",
        relation: liveResult?.relationFrame?.relation || "",
        coordinationType: liveResult?.relationFrame?.coordinationType || "",
        syntacticRank: liveResult?.relationFrame?.syntacticRank || "",
        formulaIndependentOfWritten:
          liveResult?.formulaRecord?.formula !== liveResult?.formulaRealizationRecord?.surface,
        liveResult,
      },
      analysis: {
        ...facts,
        rawStoredAuthorityBlocked: raw?.authorizationStatus === "blocked",
        copiedSignedNodeBlocked: copiedResult?.authorizationStatus === "blocked",
      },
      blockedRaw: { authorizationStatus: raw?.authorizationStatus || "blocked", blockReason: raw?.blockReason || "" },
      blockedCopy: { authorizationStatus: copiedResult?.authorizationStatus || "blocked", blockReason: copiedResult?.blockReason || "" },
      ownerSeparation: {
        validationProjectionOwnsGrammar: false,
        validationProjectionOwnsAtoms: false,
        oneOwnerProofSatisfiesAnother: false,
      },
    });
    if (frame.authorizationStatus === "authorized") ISSUED_VALIDATION_FRAMES.add(frame);
    return frame;
  }

  function isClassicalClauseConjunctionValidationFrame(frame = null) {
    return Boolean(
      ISSUED_VALIDATION_FRAMES.has(frame)
      && frame?.kind === "classical-nahuatl-clause-conjunction-validation-frame"
      && frame.authorizationStatus === "authorized"
      && frame.result?.canonicalResult === true
      && frame.analysis?.rawStoredAuthorityBlocked === true
      && frame.analysis?.copiedSignedNodeBlocked === true
      && frame.ownerSeparation?.validationProjectionOwnsAtoms === false
    );
  }

  return Object.freeze({
    buildClassicalClauseConjunctionValidationFrame,
    isClassicalClauseConjunctionValidationFrame,
  });
}

export function installClassicalClauseConjunctionValidationSemanticOperationsGlobals(
  targetObject = globalThis,
) {
  const api = createClassicalClauseConjunctionValidationSemanticOperationsApi(targetObject);
  Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
  return api;
}
