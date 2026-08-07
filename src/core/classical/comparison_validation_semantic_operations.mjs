// Non-authorizing validation projection for the canonical typed comparison
// engine. Profiles remain separate semantic owners; this projection owns no
// grammar, Inventory atom, route, receipt, or migration status.

const ISSUED_VALIDATION_FRAMES = new WeakSet();

function deepFreeze(value) {
  if (!value || typeof value !== "object" || Object.isFrozen(value)) return value;
  if (Array.isArray(value)) return Object.freeze(value.map(deepFreeze));
  for (const child of Object.values(value)) deepFreeze(child);
  return Object.freeze(value);
}

function assertRuntime(target, name) {
  if (typeof target?.[name] !== "function") {
    throw new Error(`comparison-validation-runtime-capability-required:${name}`);
  }
}

const PROFILE_IDS = Object.freeze([
  "similarity-strategy-system", "tloc-similarity-strategy",
  "tloc-principal-rank", "resemblance-verbstem-nnc",
  "ihui-iuhqui-source-alternation", "iuhqui-measure",
  "iuhqui-impersonal", "iuhqui-optional-in", "supplementary-topic",
  "larger-concatenate", "ic-relation", "sameness-difference-system",
  "equality-system", "more-more-correlation", "inequality-degree-system",
  "two-conjunct-restriction", "comparative-route-system",
  "comparative-adversative", "cencah-collocation",
  "negative-standard-introducers", "traditional-solid-spelling-analysis",
  "principal-nnc-comparison", "comparative-degree-markers",
  "panahuia-unspecified-object", "panahuia-modifiers",
  "panahuia-alternative-principal-use", "panahuia-specified-object",
  "question-how-much-more", "superlative-adverbial",
  "superlative-incorporated", "superlative-principal",
  "superlative-example-variants", "ordinary-superlative",
  "honorific-superlative",
]);

const PROFILE_FACTS = deepFreeze(Object.fromEntries(PROFILE_IDS.map(profileId => [
  profileId,
  {
    semanticBoundary: profileId,
    typedComparisonExecutionRequired: true,
    storedExampleAuthority: false,
    translationAuthority: false,
    traditionalSpellingAuthority: false,
    curriculumCoordinateAuthority: false,
  },
])));

export function createClassicalComparisonValidationSemanticOperationsApi(
  targetObject = globalThis,
) {
  const target = targetObject && typeof targetObject === "object"
    ? targetObject : globalThis;

  function ordinary(stem, { state = "absolutive", possessor = "" } = {}) {
    const sourceFrame = target.buildClassicalNahuatlOrdinaryNncSourceFrame({ stem });
    const operationFrame = target.buildClassicalNahuatlOrdinaryNncOperationFrame(
      sourceFrame,
      {
        state,
        subject: "3sg",
        ...(state === "possessive" ? { possessor: possessor || "3sg" } : {}),
        sentenceType: "statement",
        polarity: "positive",
      },
    );
    const receipt = target.executeClassicalGrammarApplicationRequest({
      operationId: "nnc:ordinary",
      args: [sourceFrame, operationFrame],
    });
    return target.buildClassicalComparisonSourceUnit({
      sourceResult: receipt.canonicalResult,
    });
  }

  function pronominal(stem) {
    const sourceFrame = target.buildClassicalNahuatlPronominalNncSourceFrame({ stem });
    const operationFrame = target.buildClassicalNahuatlPronominalNncOperationFrame(
      sourceFrame,
      {
        subject: "3sg",
        clausePosition: "initial",
        adjunctorInMode: "none",
        sentenceType: "statement",
        polarity: "positive",
      },
    );
    const receipt = target.executeClassicalGrammarApplicationRequest({
      operationId: "nnc:pronominal",
      args: [sourceFrame, operationFrame],
    });
    return target.buildClassicalComparisonSourceUnit({
      sourceResult: receipt.canonicalResult,
    });
  }

  function vnc(sourceStem, objectSpecificity = "") {
    const unspecified = objectSpecificity === "unspecified";
    const specified = objectSpecificity === "specified";
    const receipt = target.executeClassicalGrammarApplicationRequest({
      operationId: "vnc:application",
      args: [{
        sourceStem,
        verbClass: "A",
        sourceValence: unspecified
          ? "projective-nonhuman"
          : specified ? "specific-projective" : "intransitive",
        subject: specified ? "3sg" : "1sg",
        objectKind: unspecified
          ? "projective-nonhuman"
          : specified ? "specific-projective" : "none",
        objectPerson: specified ? "3sg" : "",
        requestedDerivation: "direct",
        requestedVoice: "active",
        mood: "indicative",
        tense: "present",
        outputScope: "single",
      }],
    });
    return target.buildClassicalComparisonSourceUnit({
      sourceResult: receipt.canonicalResult,
    });
  }

  function composition(leftStem, rightStem) {
    const left = ordinary(leftStem);
    const right = ordinary(rightStem);
    const sourceResults = [leftStem, rightStem].map(stem => {
      const sourceFrame = target.buildClassicalNahuatlOrdinaryNncSourceFrame({ stem });
      const operationFrame = target.buildClassicalNahuatlOrdinaryNncOperationFrame(
        sourceFrame,
        { state: "absolutive", subject: "3sg", sentenceType: "statement", polarity: "positive" },
      );
      return target.executeClassicalGrammarApplicationRequest({
        operationId: "nnc:ordinary",
        args: [sourceFrame, operationFrame],
      }).canonicalResult;
    });
    const conjuncts = sourceResults.map((result, index) => (
      target.buildClassicalNahuatlClauseCompositionSourceFrame(result, {
        referenceId: `comparison-composition-${index + 1}`,
      })
    ));
    const receipt = target.executeClassicalGrammarApplicationRequest({
      operationId: "clause:composition",
      args: [{
        operationKind: "conjunction",
        conjuncts,
        options: {
          relation: "unmarked",
          coordinationType: "additive",
          level: "principal",
          polarity: "positive",
        },
      }],
    });
    if (!left || !right) throw new Error("comparison-composition-source-required");
    return target.buildClassicalComparisonSourceUnit({
      sourceResult: receipt.canonicalResult,
    });
  }

  function sources() {
    return {
      cal: ordinary("cal"),
      mich: ordinary("mich"),
      teuc: ordinary("tēuc"),
      possessiveCal: ordinary("cal", { state: "possessive", possessor: "3sg" }),
      resemblance: ordinary("nēnehuilia"),
      honorific: ordinary("yōlchicāhuacātzintli"),
      yeh: pronominal("yeh"),
      ihui: vnc("ihui"),
      panahuiaUnspecified: vnc("cempanahuia", "unspecified"),
      panahuiaSpecified: vnc("cempanahuia", "specified"),
    };
  }

  function requestForRoute(routeId, source) {
    const any = source.cal;
    const standard = source.mich;
    const requests = {
      "similarity-reduplicative-prefix": {
        routeId, slots: { source: source.cal }, choices: { continuationFamily: "absolutive-li" },
      },
      "similarity-downgraded-possessive-tla": {
        routeId, slots: { source: source.possessiveCal }, choices: {},
      },
      "similarity-tloc-relational-nnc": {
        routeId, slots: { comparand: any, standard }, choices: { degreeMarker: "achi", sentenceType: "declarative" },
      },
      "similarity-same-as-pronominal": {
        routeId, slots: { comparand: any, standard }, choices: { sameAsMarker: "zan-no-yehhuatl" },
      },
      "similarity-incorporated-nehnequi": {
        routeId, slots: { source: source.cal, comparand: standard }, choices: { degreeMarker: "none" },
      },
      "similarity-resemblance-verbstem-nnc": {
        routeId, slots: { principal: source.resemblance, standard }, choices: {},
      },
      "similarity-ihui-vnc": {
        routeId, slots: { topic: source.yeh, principal: source.ihui }, choices: {},
      },
      "similarity-iuhqui-principal": {
        routeId,
        slots: { topic: source.yeh, adjoined: any, dimension: standard },
        choices: { iuhquiModifier: "huel", adjunctorIn: true, icRelation: true },
      },
      "equality-iuhqui": {
        routeId, slots: { comparand: any, standard, dimension: source.teuc }, choices: { icRelation: true },
      },
      "equality-ihuan": {
        routeId, slots: { comparand: any, standard, dimension: source.teuc }, choices: { icRelation: true },
      },
      "size-more-more-correlative": {
        routeId, slots: { leftClause: any, rightClause: standard }, choices: {},
      },
      "comparative-adversative": {
        routeId, slots: { baseClause: any, superiorClause: standard }, choices: { adversativeMarker: "yeceh", degreeMarker: "cencah" },
      },
      "comparative-negative-adverbial": {
        routeId,
        slots: { topic: source.yeh, principal: any, standard },
        choices: { degreeMarker: "cencah", negativeIntroducer: "in-ahmo-iuhqui" },
      },
      "comparative-tachcauh-hualcah": {
        routeId,
        slots: { topic: source.yeh, point: any, standard },
        choices: { principalNnc: "tachcauh", degreeMarker: "oc-cencah", negativeIntroducer: "in-ahmo-iuhqui", copula: true, adjunctorIn: true },
      },
      "comparative-panahuia-unspecified": {
        routeId,
        slots: { topic: source.yeh, principal: source.panahuiaUnspecified, point: any, standard },
        choices: { degreeMarker: "cencah", negativeIntroducer: "in-ahmo-iuhqui", adjunctorIn: true },
      },
      "comparative-panahuia-specified": {
        routeId,
        slots: { comparand: source.yeh, principal: source.panahuiaSpecified, standard, point: any },
        choices: { degreeMarker: "cencah", adjunctorIn: true },
      },
      "question-how-much-more": {
        routeId, slots: { baseClause: any, degreeClause: standard }, choices: { questionCollocation: "oc-yeh", sentenceType: "interrogative" },
      },
      "superlative-adverbial": {
        routeId, slots: { topic: source.teuc, predicate: source.honorific }, choices: { superlativeAdverbial: "cencah", sentenceType: "declarative" },
      },
      "superlative-incorporated": {
        routeId, slots: { topic: source.teuc, predicate: source.honorific }, choices: { incorporatedSuperlative: "cem", sentenceType: "declarative" },
      },
      "superlative-principal-ic": {
        routeId, slots: { topic: source.teuc, predicate: source.honorific }, choices: { superlativePrincipal: "ahcic", adjunctorIn: true, sentenceType: "declarative" },
      },
    };
    return requests[routeId];
  }

  function similarityCoverage(source) {
    const routeIds = [
      "similarity-reduplicative-prefix", "similarity-downgraded-possessive-tla",
      "similarity-tloc-relational-nnc", "similarity-same-as-pronominal",
      "similarity-incorporated-nehnequi", "similarity-resemblance-verbstem-nnc",
      "similarity-ihui-vnc", "similarity-iuhqui-principal",
    ];
    const requests = routeIds.map(routeId => requestForRoute(routeId, source));
    const similarityClause = composition("cal", "mich");
    const headClause = composition("tēuc", "cal");
    requests.push({
      routeId: "similarity-iuhqui-larger-concatenate",
      slots: { similarityClause, headClause },
      choices: { position: "preposed", sentenceType: "declarative" },
    });
    return requests.map(request => target.evaluateClassicalNahuatlComparison(request));
  }

  function routeForProfile(profileId) {
    if (["tloc-similarity-strategy", "tloc-principal-rank"].includes(profileId)) return "similarity-tloc-relational-nnc";
    if (profileId === "resemblance-verbstem-nnc") return "similarity-resemblance-verbstem-nnc";
    if (profileId === "ihui-iuhqui-source-alternation") return "similarity-ihui-vnc";
    if (["iuhqui-measure", "iuhqui-impersonal", "iuhqui-optional-in", "supplementary-topic", "ic-relation"].includes(profileId)) return "similarity-iuhqui-principal";
    if (profileId === "larger-concatenate") return "similarity-iuhqui-larger-concatenate";
    if (profileId === "sameness-difference-system") return "similarity-same-as-pronominal";
    if (profileId === "equality-system") return "equality-iuhqui";
    if (profileId === "more-more-correlation") return "size-more-more-correlative";
    if (["inequality-degree-system", "two-conjunct-restriction", "comparative-adversative"].includes(profileId)) return "comparative-adversative";
    if (["cencah-collocation", "negative-standard-introducers", "traditional-solid-spelling-analysis"].includes(profileId)) return "comparative-negative-adverbial";
    if (["principal-nnc-comparison", "comparative-degree-markers", "panahuia-alternative-principal-use"].includes(profileId)) return "comparative-tachcauh-hualcah";
    if (["panahuia-unspecified-object", "panahuia-modifiers"].includes(profileId)) return "comparative-panahuia-unspecified";
    if (profileId === "panahuia-specified-object") return "comparative-panahuia-specified";
    if (profileId === "question-how-much-more") return "question-how-much-more";
    if (["superlative-adverbial", "superlative-example-variants", "ordinary-superlative"].includes(profileId)) return "superlative-adverbial";
    if (profileId === "superlative-incorporated") return "superlative-incorporated";
    return "superlative-principal-ic";
  }

  function evaluateProfile(profileId, source) {
    if (profileId === "similarity-strategy-system") return similarityCoverage(source);
    if (profileId === "comparative-route-system") {
      return [
        "comparative-adversative", "comparative-negative-adverbial",
        "comparative-tachcauh-hualcah", "comparative-panahuia-unspecified",
        "comparative-panahuia-specified",
      ].map(routeId => target.evaluateClassicalNahuatlComparison(
        requestForRoute(routeId, source),
      ));
    }
    const routeId = routeForProfile(profileId);
    if (routeId === "similarity-iuhqui-larger-concatenate") {
      return target.evaluateClassicalNahuatlComparison({
        routeId,
        slots: {
          similarityClause: composition("cal", "mich"),
          headClause: composition("tēuc", "cal"),
        },
        choices: { position: "postposed", sentenceType: "declarative" },
      });
    }
    return target.evaluateClassicalNahuatlComparison(requestForRoute(routeId, source));
  }

  function buildClassicalComparisonValidationFrame(
    profileId = "similarity-strategy-system",
  ) {
    for (const capability of [
      "buildClassicalNahuatlOrdinaryNncSourceFrame",
      "buildClassicalNahuatlOrdinaryNncOperationFrame",
      "buildClassicalNahuatlPronominalNncSourceFrame",
      "buildClassicalNahuatlPronominalNncOperationFrame",
      "executeClassicalGrammarApplicationRequest",
      "buildClassicalNahuatlClauseCompositionSourceFrame",
      "buildClassicalComparisonSourceUnit",
      "evaluateClassicalNahuatlComparison",
      "isClassicalComparisonResultFrame",
    ]) assertRuntime(target, capability);
    const facts = PROFILE_FACTS[profileId];
    if (!facts) throw new Error(`comparison-validation-profile-required:${profileId}`);
    const source = sources();
    const evaluated = evaluateProfile(profileId, source);
    const results = Array.isArray(evaluated) ? evaluated : [evaluated];
    const raw = target.evaluateClassicalNahuatlComparison({
      routeId: "equality-iuhqui",
      slots: { comparand: "stored comparand", standard: { surface: "stored standard" } },
      choices: {},
      lesson: 53,
      formula: "#FORGED#",
      surface: "forged surface",
    });
    const copiedSource = JSON.parse(JSON.stringify(source.mich));
    const copiedResult = target.evaluateClassicalNahuatlComparison({
      routeId: "similarity-iuhqui-principal",
      slots: { adjoined: copiedSource },
      choices: {},
    });
    const allCanonical = results.every(result => (
      target.isClassicalComparisonResultFrame(result) === true
      && result.authorizationStatus === "authorized"
    ));
    const primary = results[0];
    const frame = deepFreeze({
      kind: "classical-nahuatl-comparison-validation-frame",
      profileId,
      authorizationStatus: allCanonical
        && raw?.authorizationStatus === "blocked"
        && copiedResult?.authorizationStatus === "blocked"
        ? "authorized" : "blocked",
      result: {
        canonicalResult: allCanonical,
        authorizationStatus: allCanonical ? "authorized" : "blocked",
        routeIds: results.map(result => result.routeId),
        relation: primary?.relation || "",
        formulaIndependentOfWritten:
          results.every(result => result.formulaRecord?.id !== result.formulaRealizationRecord?.id),
        liveResult: primary,
        liveResults: results,
      },
      analysis: {
        ...facts,
        rawStoredAuthorityBlocked: raw?.authorizationStatus === "blocked",
        copiedSourceIdentityBlocked: copiedResult?.authorizationStatus === "blocked",
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

  function isClassicalComparisonValidationFrame(frame = null) {
    return Boolean(
      ISSUED_VALIDATION_FRAMES.has(frame)
      && frame?.kind === "classical-nahuatl-comparison-validation-frame"
      && frame.authorizationStatus === "authorized"
      && frame.result?.canonicalResult === true
      && frame.analysis?.rawStoredAuthorityBlocked === true
      && frame.analysis?.copiedSourceIdentityBlocked === true
      && frame.ownerSeparation?.validationProjectionOwnsAtoms === false
    );
  }

  return Object.freeze({
    buildClassicalComparisonValidationFrame,
    isClassicalComparisonValidationFrame,
  });
}

export function installClassicalComparisonValidationSemanticOperationsGlobals(
  targetObject = globalThis,
) {
  const api = createClassicalComparisonValidationSemanticOperationsApi(targetObject);
  Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
  return api;
}
