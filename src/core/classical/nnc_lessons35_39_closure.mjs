// Canonical Andrews-only nominalization and deverbal closure for Lessons 35-39.
//
// Production owns executable grammar only. Canvas source spans, dispositions,
// claim counts, and audit receipts remain in documentation and tests.

const VERSION = 1;
const ISSUED_SOURCE_FRAMES = new WeakSet();
const ISSUED_LEXICAL_AUTHORIZATION_FRAMES = new WeakSet();
const ISSUED_NNC_SLOT_FRAMES = new WeakSet();
const ISSUED_GRAMMAR_FRAMES = new WeakSet();
const ISSUED_PARADIGM_PLANS = new WeakSet();
const ISSUED_PARADIGM_COORDINATES = new WeakSet();
const PARADIGM_PLAN_CONTEXTS = new WeakMap();
const GCD_IDENTITY =
  "typed-source-unit+licensed-source-stage+nominal-or-deverbal-operation+participant-state-transformation+boundary-realization+canonical-target-evaluator";
const LCM_PROJECTION_IDENTITY =
  "classical-nahuatl-deverbal-nnc-owner-selected-lcm-projection";

const CONSTRUCTION_KINDS = Object.freeze([
  "predicate-nominalization",
  "deverbal-action",
  "patientive",
  "ownerhood",
  "nominal-continuation",
  "verbal-continuation",
  "vocative",
  "double-nucleus-ownerhood",
]);

const PREDICATE_NOMINALIZATION_KINDS = Object.freeze([
  "preterit-agentive",
  "preterit-patientive",
  "customary-agentive-reanalysis",
  "customary-agentive-full",
  "customary-patientive",
  "instrumentive",
  "present-agentive",
  "future-agentive",
  "passive-action",
  "active-action",
]);

const PATIENTIVE_SOURCE_FAMILIES = Object.freeze([
  "passive-core",
  "impersonal-core",
  "perfective-active-core",
  "imperfective-active-core",
  "root-or-stock",
]);

const LCM_DISTINCTION_AXES = Object.freeze([
  "source-unit",
  "source-category",
  "source-stage",
  "source-voice",
  "source-valence",
  "source-object-pattern",
  "verbstem-class",
  "restricted-versus-general-use",
  "nominalization-versus-derivation",
  "agentive-versus-patientive-versus-action-versus-instrumentive",
  "absolutive-versus-possessive-state",
  "subject-person-and-number",
  "possessor-source-and-case-transformation",
  "number-dyad",
  "noun-class-and-subclass",
  "nonactive-suffix-truncation",
  "z-versus-liz-action-derivation",
  "perfective-versus-imperfective-versus-root-stock-patientive",
  "ownerhood-matrix",
  "ordinary-versus-abundant-ownerhood",
  "characteristic-property-reading",
  "adventitious-versus-organic-possession",
  "compound-matrix-and-embed-role",
  "incorporated-object-versus-complement-versus-adverb",
  "valence-and-case-transfer",
  "affinity-distributive-and-boundary-allomorphy",
  "lexical-alternative-or-exception-selection",
  "vocative-boundary",
  "scalar-versus-full-paradigm",
]);

const HOSTILE_AUTHORITY_KEYS = Object.freeze([
  "answer",
  "canvasAnswer",
  "claimCount",
  "derivedStem",
  "displayFormula",
  "displayText",
  "formula",
  "formulaArtifact",
  "generationAllowed",
  "lexicalAuthorizationFrame",
  "lexicalAuthorizationIds",
  "lesson",
  "lessonMetadata",
  "selectedSemanticOptionIds",
  "specialLexicalFamily",
  "archaicQueAbsolutive",
  "rarePossessiveReanalysis",
  "activatedProjectiveObjectPerson",
  "agentiveEmbed",
  "boundaryVariant",
  "boundaryKind",
  "stemRule",
  "rootPlusYa",
  "transitivePotentialPatient",
  "rootPlusYaDeletion",
  "deleteRetainedHumanObject",
  "retainExceptionalHumanPrefix",
  "truncationStemRule",
  "stockKind",
  "stockAllomorph",
  "keepStockVowelLength",
  "preteritAgentiveGeneralUse",
  "result",
  "resultSurface",
  "sourceSpan",
  "sourceSpans",
  "surface",
  "targetClass",
  "targetStem",
  "word",
]);

const OBJECT_PATTERNS = Object.freeze([
  "none",
  "nonspecific-human",
  "nonspecific-nonhuman",
  "human-and-nonhuman",
  "reflexive",
  "reciprocal",
]);

const PERFECTIVE_PATIENTIVE_FINALS = Object.freeze([
  "uh", "c", "qu", "x", "z", "n", "h", "l", "tz",
]);

const OWNERHOOD_MATRICES = Object.freeze(["ē", "huā", "yō-ā"]);
const OLD_PERSON_FAMILIES = Object.freeze(["old-woman", "old-man"]);

// These are canonical lexical grammar facts keyed by the typed Source stem.
// They contain neither examples nor stored outputs. Callers choose only among
// alternatives that the owner-issued Source authorization frame exposes.
const LEXICAL_SOURCE_FACTS = deepFreeze({
  "yah": {
    preteritAgentiveVariants: [
      "ordinary",
      "archaic-que",
      "yauh-ti-owner",
    ],
    yauhTiOwner: true,
  },
  "mic": { preteritAgentiveVariants: ["ordinary", "archaic-que"] },
  "tēmō": { preteritAgentiveVariants: ["ordinary", "archaic-que"] },
  "m-o-quetz": { preteritAgentiveVariants: ["ordinary", "archaic-que"] },
  "cuīca-tla-mat": { preteritAgentiveVariants: ["ordinary", "archaic-que"] },
  "ilama-ti": { oldPersonFamily: "old-woman" },
  "huē-huē-ti": { oldPersonFamily: "old-man" },
  "tē-yāō-chihua": { rarePossessiveReanalysis: true },
  "tē-cuā": {
    rarePossessiveReanalysis: true,
    finalIRealizations: ["preserve", "drop"],
  },
  "tē-mach-tiā": { finalIRealizations: ["preserve", "drop"] },
  "toz-ō": { zActionException: true },
  "ā-temō": { zActionException: true },
  "chōca": { actionStemVariants: ["ca-to-qui"] },
  "cuica": { actionStemVariants: ["ca-to-qui"] },
  "chi-chin-a-ca": { actionStemVariants: ["ca-to-qui"] },
  "cha-chal-a-ca": { actionStemVariants: ["none"] },
  "ahhua": { actionStemVariants: ["none", "hua-to-hui"] },
  "ahci": { actionStemVariants: ["ci-to-xi"] },
  "huēl-nēci": { actionStemVariants: ["ci-to-xi"] },
  "teō-mati": { actionStemVariants: ["none", "ti-to-chi"] },
  "ahhuiā-ya": { actionStemVariants: ["root-plus-ya-delete"] },
  "coco-ya": { actionStemVariants: ["root-plus-ya-delete"] },
  "yancui-ya": { actionStemVariants: ["root-plus-ya-delete"] },
  "huē-i-ya": { actionStemVariants: ["none"] },
  "tlaōco-ya": { actionStemVariants: ["none"] },
  "te-ti-ya": { actionStemVariants: ["denominal-ya-delete"] },
  "xo-xō-hui-ya": {
    actionStemVariants: ["denominal-ya-delete", "none"],
  },
  "izta-ya": { nominalizedActionStemRule: "root-plus-ya-delete" },
  "cel-i-ya": { nominalizedActionStemRule: "root-plus-ya-delete" },
  "tlan-ē-uh-ti-lō": { passiveHumanObjectDeletion: true },
  "huica-lō": { exceptionalHumanPrefixRetention: true },
  "ilpi-lō": { exceptionalHumanPrefixRetention: true },
  "tla-ō-ya-lō": { patientiveRootPlusYaDeletion: true },
});

// Root/stock direction and the resulting stock are lexical facts. The selected
// allomorph is a user choice only where this inventory records alternatives.
const ROOT_STOCK_FACTS = deepFreeze({
  "cual-ā-ni": { stockKind: "ni-stock", targetBase: "cual-a", allomorphs: ["x"] },
  "coy-o-ni": { stockKind: "ni-stock", targetBase: "coy-o", allomorphs: ["c"] },
  "tlap-ā-ni": { stockKind: "ni-stock", targetBase: "tlap-a", allomorphs: ["c"] },
  "yam-ā-ni": { stockKind: "ni-stock", targetBase: "yam-a", allomorphs: ["z"] },
  "chacu-ā-ni": { stockKind: "ni-stock", targetBase: "chacu-a", allomorphs: ["ch"] },
  "xi-ni": { stockKind: "ni-stock", targetBase: "xi", allomorphs: ["c"] },
  "pō-ni": { stockKind: "ni-stock", targetBase: "pō", allomorphs: ["c", "ch"] },
  "tō-ni": { stockKind: "ni-stock", targetBase: "tō", allomorphs: ["ch"] },
  "mi-ni": { stockKind: "ni-stock", targetBase: "mi", allomorphs: ["ch"] },
  "chi-chip-i-ni": {
    stockKind: "ni-stock",
    targetBase: "chi-chip-i",
    allomorphs: ["c"],
  },
  "tō-tom-o-ni": {
    stockKind: "ni-stock",
    targetBase: "tō-tom-o",
    allomorphs: ["ch"],
  },
  "po-pō-ca": {
    stockKind: "ca-replacement-stock",
    targetBase: "po-pō",
    allomorphs: ["ch"],
  },
  "ca-cal-a-ca": {
    stockKind: "ca-replacement-stock",
    targetBase: "ca-cal-a",
    allomorphs: ["ch"],
  },
  "pe-pey-o-ca": {
    stockKind: "ca-replacement-stock",
    targetBase: "pe-pey-o",
    allomorphs: ["c"],
  },
  "cha-chal-a-ca": {
    stockKind: "ca-replacement-stock",
    targetBase: "cha-chal-a",
    allomorphs: ["h"],
  },
  "cha-chap-a-ca": {
    stockKind: "ca-replacement-stock",
    targetBase: "cha-chap-a",
    allomorphs: ["h"],
  },
  "ih-pot-o-ca": {
    stockKind: "ca-replacement-stock",
    targetBase: "ih-pot-o",
    allomorphs: ["c"],
  },
  "ih-zahu-a-ca": {
    stockKind: "ca-replacement-stock",
    targetBase: "ih-zahu-a",
    allomorphs: ["c"],
  },
  "pitz-ā-hua": { stockKind: "hua-stock", targetBase: "pitz-a", allomorphs: ["c"] },
  "cham-ā-hua": {
    stockKind: "hua-stock",
    targetBase: "cham-a",
    allomorphs: ["c", "zero"],
    nounClassByAllomorph: { zero: "tl" },
  },
  "tom-ā-hua": {
    stockKind: "hua-stock",
    targetBase: "tom-a",
    allomorphs: ["c", "zero"],
    nounClassByAllomorph: { zero: "tl" },
  },
  "zōn-ē-hua": { stockKind: "hua-stock", targetBase: "zōn-e", allomorphs: ["c"] },
  "pin-ē-hua": { stockKind: "hua-stock", targetBase: "pin-e", allomorphs: ["c"] },
  "tic-ē-hua": { stockKind: "hua-stock", targetBase: "tic-e", allomorphs: ["c"] },
  "pō-ch-ē-hua": { stockKind: "hua-stock", targetBase: "pō-ch-e", allomorphs: ["c"] },
  "tlīl-ē-hua": { stockKind: "hua-stock", targetBase: "tlīl-e", allomorphs: ["c"] },
  "nex-ē-hua": { stockKind: "hua-stock", targetBase: "nex-e", allomorphs: ["c"] },
  "izta-l-ē-hua": {
    stockKind: "hua-stock",
    targetBase: "izta-l-e",
    allomorphs: ["c"],
  },
  "patl-ā-hua": { stockKind: "hua-stock", targetBase: "patl-a", allomorphs: ["ch"] },
  "iy-ā-hua": {
    stockKind: "hua-stock",
    targetBase: "iy-e",
    allomorphs: ["zero"],
    nounClass: "tl",
  },
  "ā-tōy-a-hua": {
    stockKind: "hua-stock",
    targetBase: "ā-tōy-a",
    allomorphs: ["zero"],
    nounClass: "tl",
  },
  "cuetl-a-hui": {
    stockKind: "ihui-ahui-stock",
    targetBase: "cuetl-a",
    allomorphs: ["x"],
  },
  "poy-a-hui": {
    stockKind: "ihui-ahui-stock",
    targetBase: "poy-a",
    allomorphs: ["c"],
  },
  "yēc-a-hui": {
    stockKind: "ihui-ahui-root",
    targetBase: "yēc",
    allomorphs: ["zero"],
  },
  "tzol-i-hui": {
    stockKind: "ihui-ahui-root",
    targetBase: "tzol",
    allomorphs: ["zero"],
  },
  "tla-zāl-o-ā": {
    stockKind: "causative-root",
    targetBase: "tla-zāl",
    allomorphs: ["zero"],
  },
  "tla-huī-tōl-o-ā": {
    stockKind: "causative-root",
    targetBase: "tla-huī-tōl",
    allomorphs: ["zero"],
  },
  "pey-ō-ni": {
    stockKind: "bare-stock-agentive",
    targetBase: "pey-ō",
    allomorphs: ["zero"],
    nounClass: "tl",
  },
  "moy-ō-ni": {
    stockKind: "bare-stock-agentive",
    targetBase: "moy-ō",
    allomorphs: ["zero"],
    nounClass: "tl",
  },
});

const GCD_FRAME = deepFreeze({
  identity: GCD_IDENTITY,
  satisfied: true,
  sourceIsTyped: true,
  sourceStageIsLicensed: true,
  operationIsSemantic: true,
  participantAndStateChangesAreTyped: true,
  boundaryRealizationIsDownstream: true,
  canonicalTargetEvaluatorRequired: true,
});

const LCM_FRAME = deepFreeze({
  licensedAxisSetComplete: true,
  axisCount: LCM_DISTINCTION_AXES.length,
  axisIds: LCM_DISTINCTION_AXES,
  selectedAxisIds: LCM_DISTINCTION_AXES,
});

function normalizeToken(value = "") {
  return String(value ?? "").normalize("NFC").trim();
}

function normalizeKey(value = "") {
  return normalizeToken(value).toLowerCase().replace(/[\s_]+/gu, "-");
}

function normalizeStem(value = "") {
  const stem = normalizeToken(value)
    .replace(/[()[\]{}#]/gu, "")
    .replace(/\s+/gu, "")
    .replace(/^-+|-+$/gu, "");
  return /^[\p{L}\p{M}Ø⎕0-]+$/u.test(stem) ? stem : "";
}

function normalizeSubject(value = "3sg") {
  const key = normalizeKey(value).replace(/-/gu, "");
  return ({
    "1sg": "1sg",
    "2sg": "2sg",
    "3sg": "3sg",
    "1pl": "1pl",
    "2pl": "2pl",
    "3pl": "3pl",
    "3common": "3common",
    common: "3common",
  })[key] || "";
}

function normalizeNounClass(value = "") {
  const key = normalizeKey(value).replace(/^class-/, "");
  return ({
    "0": "zero",
    "ø": "zero",
    zero: "zero",
    tl: "tl",
    tli: "tli",
    in: "in",
  })[key] || "";
}

function deepClone(value) {
  if (Array.isArray(value)) return value.map(deepClone);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, deepClone(item)])
    );
  }
  return value;
}

function deepFreeze(value) {
  if (!value || typeof value !== "object" || Object.isFrozen(value)) return value;
  Object.values(value).forEach(deepFreeze);
  return Object.freeze(value);
}

function buildLexicalAuthorizationFrame({
  sourceUnit = "",
  sourceStage = "",
  sourceStem = "",
  sourceVoice = "",
  sourceValence = "",
  sourceObjectPattern = "",
} = {}) {
  const facts = LEXICAL_SOURCE_FACTS[sourceStem] || {};
  const rootStock = ROOT_STOCK_FACTS[sourceStem] || null;
  const preteritAgentiveVariants = facts.preteritAgentiveVariants
    || ["ordinary"];
  const finalIRealizations = facts.finalIRealizations || ["preserve"];
  const actionStemVariants = facts.actionStemVariants || ["none"];
  const lexicalAuthorizationIds = [
    ...(facts.oldPersonFamily
      ? [`old-person-family:${facts.oldPersonFamily}`]
      : []),
    ...(preteritAgentiveVariants.includes("archaic-que")
      ? ["preterit-agentive:archaic-que"]
      : []),
    ...(facts.yauhTiOwner ? ["preterit-agentive:yauh-ti-owner"] : []),
    ...(facts.rarePossessiveReanalysis
      ? ["customary-agentive:rare-possessive-reanalysis"]
      : []),
    ...(finalIRealizations.includes("drop")
      ? ["customary-agentive:real-final-i-loss"]
      : []),
    ...(facts.zActionException ? ["deverbal-action:z-final-exception"] : []),
    ...(facts.nominalizedActionStemRule
      ? [`nominalized-action:${facts.nominalizedActionStemRule}`]
      : []),
    ...(facts.passiveHumanObjectDeletion
      ? ["passive-patientive:human-object-deletion"]
      : []),
    ...(facts.exceptionalHumanPrefixRetention
      ? ["impersonal-patientive:exceptional-human-prefix-retention"]
      : []),
    ...(facts.patientiveRootPlusYaDeletion
      ? ["impersonal-patientive:root-plus-ya-deletion"]
      : []),
    ...(rootStock
      ? [`root-stock:${rootStock.stockKind}`]
      : []),
  ];
  const frame = deepFreeze({
    kind: "classical-nahuatl-deverbal-nnc-lexical-authorization-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    sourceIdentity: [
      sourceUnit,
      sourceStage,
      sourceStem,
      sourceVoice,
      sourceValence,
      sourceObjectPattern,
    ].join("|"),
    sourceStem,
    oldPersonFamily: facts.oldPersonFamily || "",
    preteritAgentiveVariants,
    yauhTiOwner: facts.yauhTiOwner === true,
    rarePossessiveReanalysis: facts.rarePossessiveReanalysis === true,
    finalIRealizations,
    zActionException: facts.zActionException === true,
    actionStemVariants,
    nominalizedActionStemRule: facts.nominalizedActionStemRule || "none",
    passiveHumanObjectDeletion: facts.passiveHumanObjectDeletion === true,
    exceptionalHumanPrefixRetention:
      facts.exceptionalHumanPrefixRetention === true,
    patientiveRootPlusYaDeletion:
      facts.patientiveRootPlusYaDeletion === true,
    rootStockAuthorization: rootStock
      ? {
        stockKind: rootStock.stockKind,
        targetBase: rootStock.targetBase,
        allomorphs: rootStock.allomorphs,
        defaultAllomorph: rootStock.allomorphs[0],
        nounClass: rootStock.nounClass || "tli",
        nounClassByAllomorph:
          rootStock.nounClassByAllomorph || {},
      }
      : null,
    lexicalAuthorizationIds,
    lexicalFactsReadOnly: true,
    callerSuppliedLexicalAuthorityAccepted: false,
    lessonMetadataAuthorizesOutput: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
  ISSUED_LEXICAL_AUTHORIZATION_FRAMES.add(frame);
  return frame;
}

function isClassicalNahuatlLexicalAuthorizationFrame(frame = null) {
  return Boolean(
    ISSUED_LEXICAL_AUTHORIZATION_FRAMES.has(frame)
    && frame?.kind
      === "classical-nahuatl-deverbal-nnc-lexical-authorization-frame"
    && frame.version === VERSION
    && frame.authorizationStatus === "authorized"
    && frame.lexicalFactsReadOnly === true
    && frame.callerSuppliedLexicalAuthorityAccepted === false
    && frame.lessonMetadataAuthorizesOutput === false
    && frame.formulaStringAuthority === false
    && frame.surfaceStringAuthority === false
    && Object.isFrozen(frame)
  );
}

function lexicalAuthorizationMatchesSource(lexicalFrame = null, sourceFrame = null) {
  return Boolean(
    isClassicalNahuatlLexicalAuthorizationFrame(lexicalFrame)
    && lexicalFrame.sourceStem === sourceFrame?.sourceStem
    && lexicalFrame.sourceIdentity === [
      sourceFrame.sourceUnit,
      sourceFrame.sourceStage,
      sourceFrame.sourceStem,
      sourceFrame.sourceVoice,
      sourceFrame.sourceValence,
      sourceFrame.sourceObjectPattern,
    ].join("|")
  );
}

function findHostileAuthorityPath(value, path = "request") {
  if (!value || typeof value !== "object") return "";
  if (
    value.kind === "classical-nahuatl-deverbal-nnc-source-frame"
  ) {
    // Owner identity is checked by buildSourceFrame. Skipping the recursive
    // hostile scan preserves its exact copied/forged-frame rejection.
    return "";
  }
  for (const [key, item] of Object.entries(value)) {
    const nextPath = `${path}.${key}`;
    if (
      HOSTILE_AUTHORITY_KEYS.includes(key)
      && item !== undefined
      && item !== null
      && item !== ""
    ) {
      return nextPath;
    }
    if (item && typeof item === "object") {
      const nested = findHostileAuthorityPath(item, nextPath);
      if (nested) return nested;
    }
  }
  return "";
}

function joinMorphs(parts = []) {
  return parts.map(normalizeStem).filter(Boolean).join("-");
}

function buildPredicateNominalizationSemanticProfile({
  nominalizationKind = "",
  preteritAgentiveVariant = "",
  sourceFrame = null,
  restrictedUse = "",
  generalUse = "",
  allowedStates = [],
} = {}) {
  if (
    nominalizationKind !== "preterit-agentive"
    || preteritAgentiveVariant !== "ordinary"
  ) {
    return null;
  }
  const derivation = sourceFrame?.canonicalStageDerivationFrame || null;
  const expectedRestrictedUse = joinMorphs([
    sourceFrame?.sourceStem || "",
    "0",
  ]);
  const expectedGeneralUse = joinMorphs([restrictedUse, "cā"]);
  const nonAbsolutiveStates = allowedStates.filter(
    state => state !== "absolutive",
  );
  const restrictedUseSourceRelation = deepFreeze({
    sourceUnit: sourceFrame?.sourceUnit || "",
    sourceStage: sourceFrame?.sourceStage || "",
    sourcePredicateStem: sourceFrame?.sourceStem || "",
    sourceImperfectiveStem: sourceFrame?.sourceImperfectiveStem || "",
    sourcePerfectiveStem: derivation?.perfectiveStem
      || sourceFrame?.sourceStem
      || "",
    perfectiveChangeRule: derivation?.perfectiveChangeRule || "",
    ownerFrameKind: derivation?.ownerFrameKind || "",
    ownerIssuedStageMember: derivation
      ? derivation.ownerIssuedStageMember === true
      : sourceFrame?.authorizationStatus === "authorized",
    outputNounstem: restrictedUse,
    finalConstituent: restrictedUse.endsWith("-0") ? "0" : "",
    relation: "preterit-predicate-reanalyzed-as-nounstem",
    satisfied: Boolean(
      sourceFrame?.sourceStage === "preterit-predicate"
      && restrictedUse === expectedRestrictedUse
    ),
  });
  const generalUseCompound = deepFreeze({
    constructionKind: "compound",
    embedRole: "restricted-use",
    embedStem: restrictedUse,
    matrixStem: "cā",
    outputStem: generalUse,
    relation: "restricted-use-embed-plus-ca-matrix",
    satisfied: Boolean(
      restrictedUse
      && generalUse
      && generalUse === expectedGeneralUse
    ),
  });
  return deepFreeze({
    kind: "classical-nahuatl-preterit-agentive-semantic-profile",
    version: VERSION,
    agentSemanticRole: "agent-of-action",
    agentiveTaxonomyStatus: "most-common-agentive-nnc",
    stemShapeInventory: [
      "restricted-use",
      "general-use",
    ],
    restrictedUseSourceRelation,
    generalUseCompound,
    stateStemDistribution: {
      absolutive: {
        state: "absolutive",
        stemRole: "restricted-use",
        stem: restrictedUse,
        licensed: allowedStates.includes("absolutive"),
      },
      nonAbsolutive: {
        stateClass: "non-absolutive",
        licensedStates: nonAbsolutiveStates,
        stemRole: "general-use",
        stem: generalUse,
        licensed: Boolean(
          nonAbsolutiveStates.length
          && nonAbsolutiveStates.every(state => allowedStates.includes(state))
        ),
      },
    },
    derivationOrder: {
      orderedRoles: [
        "restricted-use",
        "general-use",
      ],
      dependency: "general-use-embeds-restricted-use",
      satisfied: generalUseCompound.satisfied,
    },
    semanticProfileAuthority:
      "canonical-predicate-nominalization-operation",
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

function finalUnit(stem = "") {
  const source = normalizeStem(stem).replace(/-/gu, "");
  return ["tz", "ch", "qu", "uh"].find(unit => source.endsWith(unit))
    || Array.from(source).at(-1)
    || "";
}

function shortenFinalVowel(stem = "") {
  return normalizeStem(stem).replace(/[āēīō]$/u, vowel => ({
    ā: "a",
    ē: "e",
    ī: "i",
    ō: "o",
  })[vowel]);
}

function applyInitialReduplication(stem = "", mode = "affinity") {
  const source = normalizeStem(stem);
  const match = /^([^aeiouāēīō]*)([aeiouāēīō])/u.exec(source);
  if (!match) return source;
  const [, onset, vowel] = match;
  const short = ({ ā: "a", ē: "e", ī: "i", ō: "o" })[vowel] || vowel;
  const long = ({ a: "ā", e: "ē", i: "ī", o: "ō" })[vowel] || vowel;
  const prefix = mode === "affinity" ? `${onset}${long}` : `${onset}${short}h`;
  return `${prefix}-${source}`;
}

function mainlineReflexive(subject = "3sg") {
  return ({
    "1sg": "n-o",
    "2sg": "t-o",
    "3sg": "m-o",
    "1pl": "t-o",
    "2pl": "am-o",
    "3pl": "m-o",
    "3common": "m-o",
  })[subject] || "";
}

function internalObjectPrefix(pattern = "none", subject = "3sg", shuntline = false) {
  if (pattern === "nonspecific-human") return "tē";
  if (pattern === "nonspecific-nonhuman") return "tla";
  if (pattern === "human-and-nonhuman") return "tē-tla";
  if (pattern === "reciprocal") return "ne";
  if (pattern === "reflexive") return shuntline ? "ne" : mainlineReflexive(subject);
  return "";
}

function sourceSubjectToPossessor(subject = "") {
  return ({
    "1sg": "1sg",
    "2sg": "2sg",
    "3sg": "3sg",
    "1pl": "1pl",
    "2pl": "2pl",
    "3pl": "3pl",
  })[subject] || "";
}

function buildSelectedLcmFrame({
  constructionKind = "",
  sourceFrame = null,
  operationFrame = null,
  canonicalResult = null,
  outputScope = "single",
} = {}) {
  const appliedRules = operationFrame?.appliedSemanticRules || [];
  const selectedValues = {
    "source-unit": sourceFrame?.sourceUnit || "not-applicable",
    "source-category": constructionKind || "not-applicable",
    "source-stage": sourceFrame?.sourceStage || "not-applicable",
    "source-voice": sourceFrame?.sourceVoice || "not-applicable",
    "source-valence": sourceFrame?.sourceValence || "not-applicable",
    "source-object-pattern": sourceFrame?.sourceObjectPattern || "not-applicable",
    "verbstem-class": sourceFrame?.verbClass || "not-applicable",
    "restricted-versus-general-use": canonicalResult?.state === "possessive"
      ? "general-use"
      : canonicalResult?.state === "absolutive"
        ? "restricted-use"
        : "not-applicable",
    "nominalization-versus-derivation": constructionKind === "predicate-nominalization"
      ? "predicate-nominalization"
      : constructionKind || "not-applicable",
    "agentive-versus-patientive-versus-action-versus-instrumentive":
      operationFrame?.nncFamily || "not-applicable",
    "absolutive-versus-possessive-state":
      canonicalResult?.state || "not-applicable",
    "subject-person-and-number":
      canonicalResult?.subject || "not-applicable",
    "possessor-source-and-case-transformation":
      operationFrame?.transformedPossessor
      || canonicalResult?.possessor
      || "not-applicable",
    "number-dyad": canonicalResult?.numberFrame
      ? `${canonicalResult.numberFrame.num1}-${canonicalResult.numberFrame.num2}`
      : "not-applicable",
    "noun-class-and-subclass": operationFrame?.nounClass || "not-applicable",
    "nonactive-suffix-truncation": appliedRules.find(rule => (
      rule.includes("nonactive") && rule.includes("truncation")
    )) || "not-applicable",
    "z-versus-liz-action-derivation":
      operationFrame?.actionSuffix || "not-applicable",
    "perfective-versus-imperfective-versus-root-stock-patientive":
      operationFrame?.patientiveSourceFamily || "not-applicable",
    "ownerhood-matrix": operationFrame?.ownerhoodMatrix || "not-applicable",
    "ordinary-versus-abundant-ownerhood":
      operationFrame?.ownerhoodKind || "not-applicable",
    "characteristic-property-reading":
      operationFrame?.characteristicReading || "not-applicable",
    "adventitious-versus-organic-possession":
      operationFrame?.characteristicReading === "organic-possession"
        ? "organic-possession"
        : operationFrame?.patientiveKind === "characteristic-property"
          ? "adventitious-or-nonorganic"
          : "not-applicable",
    "compound-matrix-and-embed-role":
      operationFrame?.continuationRelation || "not-applicable",
    "incorporated-object-versus-complement-versus-adverb":
      operationFrame?.continuationRelation
      || operationFrame?.embedRole
      || "not-applicable",
    "valence-and-case-transfer":
      operationFrame?.participantTransform?.targetRole || "not-applicable",
    "affinity-distributive-and-boundary-allomorphy":
      operationFrame?.affinityApplied
        ? "affinity"
        : operationFrame?.boundaryVariant || "not-applicable",
    "lexical-alternative-or-exception-selection":
      operationFrame?.appliedAuthorizationIds?.join("+") || "not-applicable",
    "vocative-boundary":
      constructionKind === "vocative"
        ? operationFrame?.appliedSemanticRules?.[0] || "ordinary"
        : "not-applicable",
    "scalar-versus-full-paradigm": outputScope === "paradigm"
      ? "full-paradigm"
      : "scalar",
  };
  const ownerSourcePaths = {
    "incorporated-object-versus-complement-versus-adverb":
      operationFrame?.continuationRelation
        ? "operationFrame.continuationRelation"
        : operationFrame?.embedRole
          ? "operationFrame.embedRole"
          : "owner-evaluator.not-applicable",
  };
  const selectedAxisValues = LCM_DISTINCTION_AXES.map(axisId => deepFreeze({
    axisId,
    selectedValue: normalizeToken(selectedValues[axisId]) || "not-applicable",
    ownerSourcePath: ownerSourcePaths[axisId]
      || `buildSelectedLcmFrame.selectedValues.${axisId}`,
  }));
  return deepFreeze({
    projectionIdentity: LCM_PROJECTION_IDENTITY,
    licensedAxisSetComplete: selectedAxisValues.length === LCM_DISTINCTION_AXES.length
      && selectedAxisValues.every(selection => Boolean(selection.selectedValue)),
    axisCount: LCM_DISTINCTION_AXES.length,
    axisIds: LCM_DISTINCTION_AXES,
    selectedAxisIds: selectedAxisValues.map(selection => selection.axisId),
    selectedAxisValues,
    selectedValues: Object.fromEntries(
      selectedAxisValues.map(selection => [selection.axisId, selection.selectedValue])
    ),
    ownerSourcePaths: Object.fromEntries(
      selectedAxisValues.map(selection => [selection.axisId, selection.ownerSourcePath])
    ),
    selectedValuesAreTypedProjection: true,
    registryCompatibilitySelectedAxisIds: true,
  });
}

function buildEvaluatedGcdFrame({
  constructionKind = "",
  sourceFrame = null,
  operationFrame = null,
  canonicalResult = null,
} = {}) {
  const sourceIsTyped = ISSUED_SOURCE_FRAMES.has(sourceFrame)
    && lexicalAuthorizationMatchesSource(
      sourceFrame?.lexicalAuthorizationFrame,
      sourceFrame
    );
  const operationIsSemantic = operationFrame?.authorizationStatus === "authorized"
    && Boolean(operationFrame.operationId);
  const canonicalTargetEvaluatorRequired = constructionKind === "vocative"
    ? operationIsSemantic
    : canonicalResult?.authorizationStatus === "authorized";
  const participantAndStateChangesAreTyped = constructionKind === "vocative"
    ? true
    : canonicalResult?.nncSlotFrame
      ? ISSUED_NNC_SLOT_FRAMES.has(canonicalResult.nncSlotFrame)
      : canonicalResult?.authorizationStatus === "authorized";
  return deepFreeze({
    identity: GCD_IDENTITY,
    satisfied: sourceIsTyped
      && operationIsSemantic
      && participantAndStateChangesAreTyped
      && canonicalTargetEvaluatorRequired,
    sourceIsTyped,
    sourceStageIsLicensed: sourceFrame?.authorizationStatus === "authorized",
    operationIsSemantic,
    participantAndStateChangesAreTyped,
    boundaryRealizationIsDownstream: canonicalTargetEvaluatorRequired,
    canonicalTargetEvaluatorRequired,
  });
}

function applyOldPersonPerfective(stem = "", family = "", subject = "3sg") {
  const source = normalizeStem(stem);
  const plural = subject.endsWith("pl");
  if (family === "old-woman" && source === "ilama-ti") {
    return plural ? "ilama-t" : "ilama-h";
  }
  if (family === "old-man" && source === "huē-huē-ti") {
    return plural ? "huē-huē-t" : "huē-hue-h";
  }
  return "";
}

function buildBlockedFrame(blockReason, request = {}, extra = {}) {
  const result = deepFreeze({
    kind: "classical-nahuatl-deverbal-nnc-grammar-frame",
    version: VERSION,
    constructionKind: normalizeKey(request.constructionKind),
    authorizationStatus: "blocked",
    blockReason,
    requestedOutputKind: normalizeKey(request.outputKind || request.outputScope || "single"),
    typedFrameAuthority: true,
    callerSuppliedAuthorityAccepted: false,
    lessonMetadataAuthorizesOutput: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
    ...extra,
  });
  ISSUED_GRAMMAR_FRAMES.add(result);
  return result;
}

function buildSourceFrame(
  request = {},
  expectedStage = "",
  preparedSourceFrame = null,
  canonicalStageDerivationFrame = null
) {
  if (preparedSourceFrame) {
    if (
      ISSUED_SOURCE_FRAMES.has(preparedSourceFrame)
      && preparedSourceFrame.authorizationStatus === "authorized"
      && lexicalAuthorizationMatchesSource(
        preparedSourceFrame.lexicalAuthorizationFrame,
        preparedSourceFrame
      )
      && (!expectedStage || preparedSourceFrame.sourceStage === expectedStage)
    ) {
      return preparedSourceFrame;
    }
    return deepFreeze({
      kind: "classical-nahuatl-deverbal-nnc-source-frame",
      version: VERSION,
      authorizationStatus: "blocked",
      blockReason: "issued-prepared-source-frame-required",
      typedSourceAuthority: true,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
  }
  const source = request.source && typeof request.source === "object"
    ? request.source
    : request;
  if (source.kind === "classical-nahuatl-deverbal-nnc-source-frame") {
    if (
      ISSUED_SOURCE_FRAMES.has(source)
      && source.authorizationStatus === "authorized"
      && lexicalAuthorizationMatchesSource(
        source.lexicalAuthorizationFrame,
        source
      )
      && (!expectedStage || source.sourceStage === expectedStage)
    ) {
      return source;
    }
    return deepFreeze({
      kind: "classical-nahuatl-deverbal-nnc-source-frame",
      version: VERSION,
      authorizationStatus: "blocked",
      blockReason: "copied-or-forged-source-frame-rejected",
      typedSourceAuthority: true,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
  }
  const declaredSourceStage = normalizeKey(source.sourceStage || source.stage);
  const sourceStage = normalizeKey(expectedStage || declaredSourceStage);
  const sourceStem = normalizeStem(
    source.sourceStem
      || source.stageStem
      || source.coreStem
      || source.predicateStem
      || source.stem
  );
  const verbClass = normalizeToken(source.verbClass || source.class).toUpperCase();
  const sourceVoice = normalizeKey(source.sourceVoice || source.voice || "active");
  const sourceValence = normalizeKey(source.sourceValence || source.valence || "intransitive");
  const sourceObjectPattern = normalizeKey(source.sourceObjectPattern || source.objectPattern || "none");
  const sourceUnit = normalizeKey(source.sourceUnit || "vnc-core");
  const authorized = Boolean(
    sourceStem
    && (!expectedStage || !declaredSourceStage || declaredSourceStage === expectedStage)
    && ["A", "B", "C", "D", ""].includes(verbClass)
    && ["active", "passive", "impersonal", "nonactive"].includes(sourceVoice)
    && [
      "intransitive",
      "single-object",
      "double-object",
      "triple-object",
      "projective-human",
      "projective-nonhuman",
    ].includes(sourceValence)
    && OBJECT_PATTERNS.includes(sourceObjectPattern)
  );
  const lexicalAuthorizationFrame = authorized
    ? buildLexicalAuthorizationFrame({
      sourceUnit,
      sourceStage,
      sourceStem,
      sourceVoice,
      sourceValence,
      sourceObjectPattern,
    })
    : null;
  const frame = deepFreeze({
    kind: "classical-nahuatl-deverbal-nnc-source-frame",
    version: VERSION,
    authorizationStatus: authorized ? "authorized" : "blocked",
    blockReason: authorized
      ? ""
      : !sourceStem
        ? "typed-source-stem-required"
        : expectedStage && declaredSourceStage && declaredSourceStage !== expectedStage
          ? `source-stage-${expectedStage}-required`
          : "source-analysis-not-recognized",
    sourceUnit,
    sourceStage,
    sourceStem,
    verbClass,
    sourceVoice,
    sourceValence,
    sourceObjectPattern,
    sourceSubject: normalizeSubject(source.sourceSubject || request.subject || "3sg"),
    sourceIsCompound: source.sourceIsCompound === true,
    sourceImperfectiveStem:
      canonicalStageDerivationFrame?.imperfectiveStem || "",
    canonicalStageDerivationFrame,
    sourceStemDerivedByCanonicalOwner:
      canonicalStageDerivationFrame?.authorizationStatus === "authorized",
    lexicalAuthorizationFrame,
    lexicalFactsReadOnly: true,
    typedSourceAuthority: true,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
  if (authorized) ISSUED_SOURCE_FRAMES.add(frame);
  return frame;
}

function buildCustomNumberFrame({
  subject,
  stem,
  nounClass,
  num1,
  num2,
  animacy,
  ruleId,
}) {
  const authorized = Boolean(subject && stem && nounClass && num1 && num2);
  const frame = deepFreeze({
    kind: "classical-nahuatl-deverbal-nnc-number-frame",
    version: VERSION,
    authorizationStatus: authorized ? "authorized" : "blocked",
    blockReason: authorized ? "" : "incomplete-lessons35-39-number-frame",
    subject,
    subjectNumber: subject.endsWith("pl")
      ? "plural"
      : subject === "3common"
        ? "common"
        : "singular",
    stem,
    nounClass,
    nounClassAuthority: ruleId,
    ruleId,
    num1,
    num2,
    connectorRule: ruleId,
    animacy,
    metaphoricalOverride: false,
    numberBelongsTo: "subject-personal-pronoun",
    numberIsNounInflection: false,
  });
  return frame;
}

function resolveOperationNumberFrame(operationFrame, {
  subject,
  state,
  stem,
  animacy,
  requestedConnector = "",
}) {
  const plural = subject.endsWith("pl");
  const profile = operationFrame.connectorProfile;
  const nounClass = operationFrame.nounClass;
  if (state === "possessive") {
    if (plural) {
      return buildCustomNumberFrame({
        subject,
        stem,
        nounClass,
        num1: "hu",
        num2: "ān",
        animacy,
        ruleId: `${profile}:possessive-plural`,
      });
    }
    const singular = operationFrame.possessiveSingularConnector || "0";
    return buildCustomNumberFrame({
      subject,
      stem,
      nounClass,
      num1: singular,
      num2: "0",
      animacy,
      ruleId: `${profile}:possessive-singular`,
    });
  }
  if (profile === "preterit-agentive") {
    const selected = normalizeKey(requestedConnector || operationFrame.singularConnectorChoice);
    const num1 = plural
      ? "qu"
      : operationFrame.verbClass === "A"
        ? "c"
        : selected === "silent"
          ? "⎕"
          : "qui";
    return buildCustomNumberFrame({
      subject,
      stem,
      nounClass,
      num1,
      num2: plural ? "eh" : "0",
      animacy,
      ruleId: "35.3-35.4-preterit-agentive-number",
    });
  }
  if (profile === "vnc-reanalysis") {
    return buildCustomNumberFrame({
      subject,
      stem,
      nounClass,
      num1: "0",
      num2: plural ? "h" : "0",
      animacy,
      ruleId: "36.2-or-36.7-vnc-associated-number",
    });
  }
  if (profile === "future-agentive") {
    return buildCustomNumberFrame({
      subject,
      stem,
      nounClass,
      num1: plural ? "qu" : "qui",
      num2: plural ? "eh" : "0",
      animacy,
      ruleId: "36.8-future-agentive-number",
    });
  }
  if (profile === "fully-nominal-tl") {
    return buildCustomNumberFrame({
      subject,
      stem,
      nounClass,
      num1: plural ? "m" : normalizeKey(requestedConnector) === "tl" ? "tl" : "⎕",
      num2: plural ? "eh" : "0",
      animacy,
      ruleId: "36.3-or-36.5-fully-nominal-number",
    });
  }
  if (profile === "zero-class-vnc-number") {
    return buildCustomNumberFrame({
      subject,
      stem,
      nounClass,
      num1: "0",
      num2: plural ? "h" : "0",
      animacy,
      ruleId: "converted-vnc-subject-number",
    });
  }
  if (plural) {
    return buildCustomNumberFrame({
      subject,
      stem,
      nounClass,
      num1: operationFrame.pluralConnector === "m-eh" ? "m" : "t",
      num2: operationFrame.pluralConnector === "m-eh" ? "eh" : "in",
      animacy,
      ruleId: `${profile}:derived-plural`,
    });
  }
  return buildCustomNumberFrame({
    subject,
    stem,
    nounClass,
    num1: nounClass === "tli" ? (stem.endsWith("l") ? "li" : "tli") : nounClass === "tl" ? "tl" : nounClass === "in" ? "in" : "0",
    num2: "0",
    animacy,
    ruleId: `${profile}:derived-singular`,
  });
}

function buildNncTarget(target, sourceFrame, operationFrame, request = {}) {
  if (
    typeof target.buildClassicalNahuatlNncSubjectPersonFrame !== "function"
    || typeof target.buildClassicalNahuatlNncSlotFrame !== "function"
    || typeof target.renderClassicalNahuatlNncSlotFrameFormula !== "function"
  ) {
    return deepFreeze({
      authorizationStatus: "blocked",
      blockReason: "canonical-nnc-evaluator-unavailable",
    });
  }
  const subject = normalizeSubject(request.subject || "3sg");
  const state = normalizeKey(request.state || operationFrame.defaultState || "absolutive");
  const possessor = normalizeKey(
    request.possessor
      || operationFrame.transformedPossessor
      || "3sg"
  );
  const animacy = normalizeKey(request.animacy || operationFrame.defaultAnimacy || "animate");
  if (!subject) {
    return deepFreeze({ authorizationStatus: "blocked", blockReason: "unknown-nnc-subject" });
  }
  if (!operationFrame.allowedStates.includes(state)) {
    return deepFreeze({
      authorizationStatus: "blocked",
      blockReason: `${operationFrame.operationId}-${state}-state-not-licensed`,
    });
  }
  const stem = state === "possessive"
    ? operationFrame.targetStems.generalUse
    : operationFrame.targetStems.restrictedUse;
  if (!stem) {
    return deepFreeze({
      authorizationStatus: "blocked",
      blockReason: `${operationFrame.operationId}-${state}-stem-unavailable`,
    });
  }
  const personFrame = target.buildClassicalNahuatlNncSubjectPersonFrame({
    subject,
    followingMaterial: stem,
  });
  const stateFrame = state === "possessive"
    ? target.buildClassicalNahuatlPossessiveStateFrame({
      possessor,
      subject,
      stem,
      nounstemRelationKind: "nonrelational",
    })
    : deepFreeze({
      kind: "classical-nahuatl-deverbal-nnc-vacant-state-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      arity: "vacant",
      slots: [],
    });
  const numberFrame = resolveOperationNumberFrame(operationFrame, {
    subject,
    state,
    stem,
    animacy,
    requestedConnector: request.numberConnector || "",
  });
  const canonicalExternalObjectFrame = operationFrame.externalObjectPerson
    && typeof target.getClassicalNahuatlSpecificProjectiveObjectFrame === "function"
    ? target.getClassicalNahuatlSpecificProjectiveObjectFrame({
      objectPerson: operationFrame.externalObjectPerson,
      stem,
      personDyad: {
        pers1: personFrame.pers1,
        pers2: personFrame.pers2,
      },
    })
    : null;
  const externalObjectAuthorized = !operationFrame.externalObjectPerson
    || Boolean(canonicalExternalObjectFrame?.va1 && canonicalExternalObjectFrame?.va2);
  const participantFrame = operationFrame.externalObjectPerson
    ? deepFreeze({
      kind: "classical-nahuatl-specific-projective-object-participant-frame",
      version: VERSION,
      authorizationStatus: externalObjectAuthorized ? "authorized" : "blocked",
      blockReason: externalObjectAuthorized
        ? ""
        : "canonical-specific-projective-object-frame-unavailable",
      role: "specific-projective-object",
      arity: "dyadic",
      slots: externalObjectAuthorized
        ? [
          { role: "va1", carrier: canonicalExternalObjectFrame.va1 },
          { role: "va2", carrier: canonicalExternalObjectFrame.va2 },
        ]
        : [],
      objectPerson: canonicalExternalObjectFrame?.objectPerson || "",
      trajectory: canonicalExternalObjectFrame?.trajectory || "",
      specificity: canonicalExternalObjectFrame?.specificity || "",
      prominence: canonicalExternalObjectFrame?.prominence || "",
      caseFeature: canonicalExternalObjectFrame?.caseFeature || "",
      typedParticipantAuthority: true,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    })
    : null;
  const nncSlotFrame = target.buildClassicalNahuatlNncSlotFrame({
    sourceFrameKind: sourceFrame.kind,
    sourceAuthorizationStatus: sourceFrame.authorizationStatus,
    stem,
    stateFrame,
    personFrame,
    participantFrame,
    numberFrame,
    appliedOperationIds: [
      "lessons35-39-source-analysis",
      operationFrame.operationId,
      "canonical-nnc-projection",
    ],
    resultOperationId: operationFrame.operationId,
    requestedOutputKind: "selected-nnc-word",
    nncFamily: operationFrame.nncFamily,
  });
  const authorized = externalObjectAuthorized
    && target.isClassicalNahuatlNncSlotFrame?.(nncSlotFrame) === true;
  if (authorized) ISSUED_NNC_SLOT_FRAMES.add(nncSlotFrame);
  const formulaRealization = authorized
    ? target.renderClassicalNahuatlNncSlotFrameFormula(nncSlotFrame)
    : "";
  const carriers = authorized
    ? [
      nncSlotFrame.slots.subject.pers1,
      nncSlotFrame.slots.subject.pers2,
      ...nncSlotFrame.slots.participant.slots.map(slot => slot.carrier),
      ...nncSlotFrame.slots.state.slots.map(slot => slot.carrier),
      nncSlotFrame.slots.predicate.stem,
      nncSlotFrame.slots.number.num1,
      nncSlotFrame.slots.number.num2,
    ]
    : [];
  const realize = typeof target.realizeClassicalNahuatlNncSurfaceCarrier === "function"
    ? target.realizeClassicalNahuatlNncSurfaceCarrier
    : value => normalizeStem(value).replace(/[0Ø⎕-]/gu, "");
  const wordSurface = carriers.map(realize).join("");
  const sentenceSurface = authorized
    ? `${wordSurface.charAt(0).toUpperCase()}${wordSurface.slice(1)}.`
    : "";
  return deepFreeze({
    kind: "classical-nahuatl-deverbal-nnc-canonical-nnc-result",
    version: VERSION,
    authorizationStatus: authorized ? "authorized" : "blocked",
    blockReason: authorized
      ? ""
      : !externalObjectAuthorized
        ? "canonical-specific-projective-object-frame-unavailable"
      : nncSlotFrame?.blockReason
        || numberFrame?.blockReason
        || stateFrame?.blockReason
        || personFrame?.blockReason
        || "canonical-nnc-projection-blocked",
    state,
    subject,
    possessor: state === "possessive" ? possessor : "",
    personFrame,
    stateFrame,
    numberFrame,
    nncSlotFrame,
    externalObjectFrame: participantFrame
      ? deepFreeze({
        kind: "classical-nahuatl-deverbal-nnc-external-object-frame",
        version: VERSION,
        authorizationStatus: participantFrame.authorizationStatus,
        objectPerson: participantFrame.objectPerson,
        va1: participantFrame.slots[0]?.carrier || "",
        va2: participantFrame.slots[1]?.carrier || "",
        trajectory: participantFrame.trajectory,
        specificity: participantFrame.specificity,
        prominence: participantFrame.prominence,
        caseFeature: participantFrame.caseFeature,
        typedParticipantAuthority: true,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
      })
      : null,
    formulaRealization,
    wordSurface,
    sentenceSurface,
    typedSlotAuthority: true,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
  return result;
}

function isClassicalNahuatlDeverbalNncGrammarFrame(frame = null) {
  const vocative = frame?.constructionKind === "vocative";
  return Boolean(
    ISSUED_GRAMMAR_FRAMES.has(frame)
    && frame?.kind === "classical-nahuatl-deverbal-nnc-grammar-frame"
    && frame.version === VERSION
    && frame.authorizationStatus === "authorized"
    && frame.sourceFrame?.authorizationStatus === "authorized"
    && frame.operationFrame?.authorizationStatus === "authorized"
    && (vocative
      ? frame.canonicalResult === null
        && frame.canonicalTargetEvaluator
          === "typed-vocative-boundary-realizer"
        && String(frame.wordSurface || "").trim()
      : frame.canonicalResult?.authorizationStatus === "authorized")
    && frame.selectedResultMatchesTypedFrame === true
    && frame.greatestCommonDivisor?.satisfied === true
    && frame.leastCommonMultiple?.licensedAxisSetComplete === true
    && frame.typedFrameAuthority === true
    && frame.callerSuppliedAuthorityAccepted === false
    && frame.formulaStringAuthority === false
    && frame.surfaceStringAuthority === false
    && Object.isFrozen(frame)
  );
}

function resolveCanonicalPreteritPredicateSource(
  request = {},
  nominalizationKind = "",
  target = globalThis
) {
  const source = request.source && typeof request.source === "object"
    ? request.source
    : request;
  const imperfectiveStem = normalizeStem(source.sourceImperfectiveStem);
  if (!imperfectiveStem) {
    return {
      request,
      canonicalStageDerivationFrame: null,
      blockReason: "",
    };
  }
  if (![
    "preterit-agentive",
    "preterit-patientive",
  ].includes(nominalizationKind)) {
    return {
      request,
      canonicalStageDerivationFrame: null,
      blockReason:
        "source-imperfective-stem-only-licenses-preterit-predicate-formation",
    };
  }
  const competingStageStem = normalizeStem(
    source.sourceStem
      || source.stageStem
      || source.coreStem
      || source.predicateStem
      || source.stem
  );
  if (competingStageStem) {
    return {
      request,
      canonicalStageDerivationFrame: null,
      blockReason:
        "ambiguous-imperfective-and-prepared-preterit-source-rejected",
    };
  }
  if (typeof target?.buildClassicalNahuatlVerbstemClassRuleFrame !== "function") {
    return {
      request,
      canonicalStageDerivationFrame: null,
      blockReason: "canonical-verbstem-class-owner-required",
    };
  }
  const requestedClass = normalizeToken(
    source.verbClass || source.class
  ).toUpperCase();
  const classRuleFrame = target.buildClassicalNahuatlVerbstemClassRuleFrame(
    imperfectiveStem,
    {
      verbClass: requestedClass,
      stemClass: requestedClass,
      valence: source.sourceValence || source.valence || "intransitive",
    }
  );
  const perfectiveStem = normalizeStem(
    classRuleFrame?.analyzedPerfectiveStem
      || classRuleFrame?.perfectiveStem
  );
  if (
    classRuleFrame?.authorizationStatus !== "authorized"
    || !perfectiveStem
    || (requestedClass && classRuleFrame.classId !== requestedClass)
  ) {
    return {
      request,
      canonicalStageDerivationFrame: null,
      blockReason: "canonical-preterit-stem-class-derivation-blocked",
    };
  }
  const canonicalStageDerivationFrame = deepFreeze({
    kind: "classical-nahuatl-deverbal-preterit-source-derivation-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    imperfectiveStem,
    perfectiveStem,
    verbClass: classRuleFrame.classId,
    perfectiveChangeRule: classRuleFrame.perfectiveChangeRule || "",
    ownerFrameKind: classRuleFrame.kind || "",
    ownerIssuedStageMember: true,
    callerSuppliedStageMemberAccepted: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
  return {
    request: {
      ...request,
      source: {
        ...source,
        sourceStem: perfectiveStem,
      },
    },
    canonicalStageDerivationFrame,
    blockReason: "",
  };
}

function buildPredicateNominalizationOperation(
  request = {},
  preparedSourceFrame = null,
  target = globalThis
) {
  const nominalizationKind = normalizeKey(request.nominalizationKind);
  if (!PREDICATE_NOMINALIZATION_KINDS.includes(nominalizationKind)) {
    return { sourceFrame: null, operationFrame: null, blockReason: "predicate-nominalization-kind-required" };
  }
  const expectedStages = {
    "preterit-agentive": "preterit-predicate",
    "preterit-patientive": "preterit-predicate",
    "customary-agentive-reanalysis": "customary-present-predicate",
    "customary-agentive-full": "customary-present-predicate",
    "customary-patientive": "customary-present-predicate",
    instrumentive: normalizeKey(request.state || "absolutive") === "possessive"
      ? "imperfect-predicate"
      : "customary-present-predicate",
    "present-agentive": "present-predicate",
    "future-agentive": "future-predicate",
    "passive-action": "distant-past-predicate",
    "active-action": "distant-past-predicate",
  };
  const canonicalPreteritSource = resolveCanonicalPreteritPredicateSource(
    request,
    nominalizationKind,
    target
  );
  if (canonicalPreteritSource.blockReason) {
    return {
      sourceFrame: null,
      operationFrame: null,
      blockReason: canonicalPreteritSource.blockReason,
    };
  }
  request = canonicalPreteritSource.request;
  const sourceFrame = buildSourceFrame(
    request,
    expectedStages[nominalizationKind],
    preparedSourceFrame,
    canonicalPreteritSource.canonicalStageDerivationFrame
  );
  if (sourceFrame.authorizationStatus !== "authorized") {
    return { sourceFrame, operationFrame: null, blockReason: sourceFrame.blockReason };
  }
  const source = request.source && typeof request.source === "object" ? request.source : request;
  const lexicalFrame = sourceFrame.lexicalAuthorizationFrame;
  const subject = normalizeSubject(request.subject || sourceFrame.sourceSubject || "3sg");
  const activatedObjectPerson = normalizeSubject(
    request.activatedObjectPerson
  );
  const activationRequested = Boolean(normalizeToken(request.activatedObjectPerson));
  if (
    activationRequested
    && (
      !activatedObjectPerson
      || !["nonspecific-human", "nonspecific-nonhuman"].includes(
        sourceFrame.sourceObjectPattern
      )
    )
  ) {
    return {
      sourceFrame,
      operationFrame: null,
      blockReason: "35.4-or-36.2-typed-projective-object-activation-license-required",
    };
  }
  const reflexiveShuntline = [
    "customary-patientive",
    "instrumentive",
    "passive-action",
    "active-action",
  ].includes(nominalizationKind);
  const objectPrefix = activationRequested
    ? ""
    : internalObjectPrefix(
      sourceFrame.sourceObjectPattern,
      subject,
      reflexiveShuntline
    );
  const sourceStemWithObjects = joinMorphs([objectPrefix, sourceFrame.sourceStem]);
  const affinitySelected = request.affinity === true;
  let selectedSourceStem = affinitySelected
    ? applyInitialReduplication(sourceStemWithObjects, "affinity")
    : sourceStemWithObjects;
  const oldPersonFamily = nominalizationKind === "preterit-agentive"
    ? lexicalFrame.oldPersonFamily
    : "";
  if (OLD_PERSON_FAMILIES.includes(oldPersonFamily)) {
    const oldPersonStem = applyOldPersonPerfective(
      sourceFrame.sourceStem,
      oldPersonFamily,
      subject
    );
    if (!oldPersonStem) {
      return {
        sourceFrame,
        operationFrame: null,
        blockReason: "35.8-old-person-family-source-not-licensed",
      };
    }
    selectedSourceStem = oldPersonStem;
  }
  let restrictedUse = "";
  let generalUse = "";
  let nounClass = "zero";
  let connectorProfile = "zero-class-vnc-number";
  let possessiveSingularConnector = "0";
  let allowedStates = ["absolutive"];
  let defaultAnimacy = "animate";
  let transformedPossessor = "";
  const rules = [];
  const appliedAuthorizationIds = [];
  const preteritAgentiveVariant = normalizeKey(
    request.preteritAgentiveVariant || "ordinary"
  );

  if (["preterit-agentive", "preterit-patientive"].includes(nominalizationKind)) {
    if (
      nominalizationKind !== "preterit-agentive"
      && preteritAgentiveVariant !== "ordinary"
    ) {
      return {
        sourceFrame,
        operationFrame: null,
        blockReason: "35.5-preterit-agentive-variant-requires-agentive-source",
      };
    }
    if (
      nominalizationKind === "preterit-agentive"
      && !lexicalFrame.preteritAgentiveVariants.includes(
        preteritAgentiveVariant
      )
    ) {
      return {
        sourceFrame,
        operationFrame: null,
        blockReason: "35.5-preterit-agentive-variant-not-lexically-authorized",
      };
    }
    if (
      nominalizationKind === "preterit-agentive"
      && sourceFrame.sourceVoice !== "active"
    ) {
      return { sourceFrame, operationFrame: null, blockReason: "preterit-agentive-requires-active-source" };
    }
    if (
      nominalizationKind === "preterit-patientive"
      && sourceFrame.sourceVoice !== "passive"
    ) {
      return { sourceFrame, operationFrame: null, blockReason: "preterit-patientive-requires-passive-source" };
    }
    restrictedUse = joinMorphs([selectedSourceStem, "0"]);
    const generalObjectPrefix = sourceFrame.sourceObjectPattern === "reflexive"
      ? "ne"
      : objectPrefix;
    generalUse = joinMorphs([generalObjectPrefix, sourceFrame.sourceStem, "0", "cā"]);
    nounClass = "zero";
    connectorProfile = "preterit-agentive";
    possessiveSingularConnector = "uh";
    allowedStates = ["absolutive", "possessive"];
    rules.push("35.3-predicate-reanalysis", "35.5-ca-general-use");
    if (nominalizationKind === "preterit-patientive") rules.push("35.3-note-2-passive-source");
    if (activationRequested) {
      rules.push("35.4-activated-projective-object-hybrid");
      appliedAuthorizationIds.push(
        "structural-source:activated-projective-object"
      );
    }
    if (OLD_PERSON_FAMILIES.includes(oldPersonFamily)) {
      rules.push(`35.8-${oldPersonFamily}-perfective-family`);
      appliedAuthorizationIds.push(`lexical-source:${oldPersonFamily}`);
    }
    if (preteritAgentiveVariant === "archaic-que") {
      restrictedUse = joinMorphs([selectedSourceStem, "0", "quē"]);
      generalUse = restrictedUse;
      nounClass = "tl";
      connectorProfile = "derived-tl";
      allowedStates = ["absolutive"];
      rules.push("35.5-archaic-que-absolutive-general-use");
      appliedAuthorizationIds.push(
        "lexical-source:preterit-agentive-archaic-que"
      );
    }
    if (preteritAgentiveVariant === "yauh-ti-owner") {
      if (!lexicalFrame.yauhTiOwner) {
        return {
          sourceFrame,
          operationFrame: null,
          blockReason: "35.6-yauh-ti-owner-lexical-license-required",
        };
      }
      restrictedUse = "";
      generalUse = "ti-yah-0-cā";
      allowedStates = ["possessive"];
      connectorProfile = "preterit-agentive";
      rules.push("35.6-yauh-te-to-ti-inner-possessor");
      appliedAuthorizationIds.push(
        "lexical-source:yauh-ti-owner"
      );
    }
  } else if (nominalizationKind === "customary-agentive-reanalysis") {
    if (sourceFrame.sourceVoice !== "active") {
      return { sourceFrame, operationFrame: null, blockReason: "customary-agentive-reanalysis-requires-active-source" };
    }
    restrictedUse = joinMorphs([selectedSourceStem, "ni"]);
    nounClass = "zero";
    connectorProfile = "vnc-reanalysis";
    allowedStates = lexicalFrame.rarePossessiveReanalysis
      ? ["absolutive", "possessive"]
      : ["absolutive"];
    generalUse = lexicalFrame.rarePossessiveReanalysis ? restrictedUse : "";
    rules.push("36.2-customary-present-reanalysis");
    if (lexicalFrame.rarePossessiveReanalysis) {
      appliedAuthorizationIds.push(
        "lexical-source:rare-possessive-reanalysis"
      );
    }
  } else if (nominalizationKind === "customary-agentive-full") {
    if (sourceFrame.sourceVoice !== "active") {
      return { sourceFrame, operationFrame: null, blockReason: "customary-agentive-full-requires-active-source" };
    }
    restrictedUse = joinMorphs([selectedSourceStem, "ni"]);
    generalUse = restrictedUse;
    nounClass = "tl";
    connectorProfile = "fully-nominal-tl";
    allowedStates = ["absolutive", "possessive"];
    possessiveSingularConnector = "uh";
    rules.push("36.3-fully-nominal-customary-agentive");
  } else if (nominalizationKind === "customary-patientive") {
    if (!["passive", "nonactive"].includes(sourceFrame.sourceVoice)) {
      return { sourceFrame, operationFrame: null, blockReason: "customary-patientive-requires-passive-source" };
    }
    restrictedUse = joinMorphs([selectedSourceStem, "ni"]);
    nounClass = "tl";
    connectorProfile = "fully-nominal-tl";
    defaultAnimacy = "animate";
    rules.push("36.5-customary-present-passive-patientive");
  } else if (nominalizationKind === "instrumentive") {
    const state = normalizeKey(request.state || "absolutive");
    if (
      state === "absolutive"
      && !["impersonal", "nonactive"].includes(sourceFrame.sourceVoice)
    ) {
      return { sourceFrame, operationFrame: null, blockReason: "absolutive-instrumentive-requires-customary-impersonal-source" };
    }
    if (state === "possessive" && sourceFrame.sourceVoice !== "active") {
      return { sourceFrame, operationFrame: null, blockReason: "possessive-instrumentive-requires-imperfect-active-source" };
    }
    const stem = selectedSourceStem;
    restrictedUse = state === "absolutive" ? stem : "";
    generalUse = state === "possessive" ? stem : "";
    nounClass = state === "absolutive" ? "tl" : "tli";
    connectorProfile = state === "absolutive" ? "fully-nominal-tl" : "derived-tli";
    allowedStates = [state];
    transformedPossessor = state === "possessive"
      ? sourceSubjectToPossessor(sourceFrame.sourceSubject)
      : "";
    defaultAnimacy = "nonanimate";
    rules.push(
      state === "absolutive"
        ? "36.6-customary-impersonal-instrumentive"
        : "36.6-imperfect-active-subject-to-possessor"
    );
  } else if (nominalizationKind === "present-agentive") {
    if (sourceFrame.sourceVoice !== "active") {
      return { sourceFrame, operationFrame: null, blockReason: "present-agentive-requires-active-source" };
    }
    restrictedUse = joinMorphs([selectedSourceStem, "0"]);
    nounClass = "zero";
    connectorProfile = "vnc-reanalysis";
    rules.push("36.7-present-predicate-reanalysis");
  } else if (nominalizationKind === "future-agentive") {
    if (sourceFrame.sourceVoice !== "active") {
      return { sourceFrame, operationFrame: null, blockReason: "future-agentive-requires-active-source" };
    }
    restrictedUse = joinMorphs([selectedSourceStem, "z"]);
    generalUse = joinMorphs([selectedSourceStem, "z", "cā"]);
    nounClass = "zero";
    connectorProfile = "future-agentive";
    possessiveSingularConnector = "uh";
    allowedStates = ["absolutive", "possessive"];
    rules.push("36.8-future-agentive-restricted-and-general-use");
  } else {
    const passive = nominalizationKind === "passive-action";
    if (passive && sourceFrame.sourceVoice !== "passive") {
      return { sourceFrame, operationFrame: null, blockReason: "passive-action-requires-passive-distant-past-source" };
    }
    if (!passive && sourceFrame.sourceVoice !== "active") {
      return { sourceFrame, operationFrame: null, blockReason: "active-action-requires-active-distant-past-source" };
    }
    if (
      !passive
      && !["intransitive"].includes(sourceFrame.sourceValence)
      && !["reflexive", "reciprocal"].includes(sourceFrame.sourceObjectPattern)
    ) {
      return { sourceFrame, operationFrame: null, blockReason: "nominalized-active-action-requires-intransitive-or-reflexive-source" };
    }
    let actionCore = selectedSourceStem;
    const nominalizedActionStemRule =
      lexicalFrame.nominalizedActionStemRule;
    if (nominalizedActionStemRule !== "none") {
      const ruled = applyActionStemRule(
        actionCore,
        nominalizedActionStemRule
      );
      if (!ruled.authorized) {
        return { sourceFrame, operationFrame: null, blockReason: "root-plus-ya-source-required" };
      }
      actionCore = ruled.stem;
      appliedAuthorizationIds.push(
        `lexical-source:${nominalizedActionStemRule}`
      );
    }
    generalUse = joinMorphs([actionCore, "ca"]);
    restrictedUse = joinMorphs([actionCore, "cā", "yō"]);
    nounClass = "tl";
    connectorProfile = "derived-tl";
    possessiveSingularConnector = "0";
    allowedStates = ["absolutive", "possessive"];
    defaultAnimacy = "nonanimate";
    transformedPossessor = sourceSubjectToPossessor(sourceFrame.sourceSubject);
    rules.push(
      passive ? "36.10-passive-action" : "36.11-active-action",
      "36.10-36.11-ca-versus-ca-yo-state-allomorphy"
    );
    if (nominalizedActionStemRule !== "none") {
      rules.push("36.11-obsolete-root-distant-past");
    }
  }

  const finalIRealization = normalizeKey(
    request.finalIRealization || "preserve"
  );
  const boundaryContext = normalizeKey(
    request.boundaryContext || "ordinary-nnc"
  );
  if (!["preserve", "drop"].includes(finalIRealization)) {
    return {
      sourceFrame,
      operationFrame: null,
      blockReason: "36.2-final-i-realization-not-recognized",
    };
  }
  let boundaryVariant = "not-applicable";
  if (
    activationRequested
    && ["customary-agentive-reanalysis", "customary-agentive-full"].includes(
      nominalizationKind
    )
  ) {
    rules.push("36.2-note-2-activated-projective-object-hybrid");
  }
  if (finalIRealization === "drop") {
    if (
      !lexicalFrame.finalIRealizations.includes("drop")
      || !["compound", "vocative"].includes(boundaryContext)
      || !["customary-agentive-reanalysis", "customary-agentive-full"].includes(
        nominalizationKind
      )
      || !/ni$/u.test(restrictedUse)
    ) {
      return {
        sourceFrame,
        operationFrame: null,
        blockReason: "36.2-real-final-i-loss-boundary-license-required",
      };
    }
    restrictedUse = restrictedUse.replace(/ni$/u, "n");
    if (generalUse) generalUse = generalUse.replace(/ni$/u, "n");
    boundaryVariant = "drop-real-final-i";
    rules.push(`36.2-real-final-i-loss-before-${boundaryContext}`);
    appliedAuthorizationIds.push(
      "lexical-source:real-final-i-loss"
    );
  }

  const semanticProfile = buildPredicateNominalizationSemanticProfile({
    nominalizationKind,
    preteritAgentiveVariant,
    sourceFrame,
    restrictedUse,
    generalUse,
    allowedStates,
  });
  const operationFrame = deepFreeze({
    kind: "classical-nahuatl-deverbal-nnc-operation-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    operationId: `predicate-nominalization:${nominalizationKind}`,
    constructionKind: "predicate-nominalization",
    nominalizationKind,
    sourceStage: sourceFrame.sourceStage,
    sourceVoice: sourceFrame.sourceVoice,
    sourceValence: sourceFrame.sourceValence,
    sourceObjectPattern: sourceFrame.sourceObjectPattern,
    verbClass: sourceFrame.verbClass,
    canonicalStageDerivationFrame:
      sourceFrame.canonicalStageDerivationFrame,
    targetStems: {
      restrictedUse,
      generalUse,
    },
    nounClass,
    nncFamily: nominalizationKind,
    connectorProfile,
    singularConnectorChoice: normalizeKey(request.numberConnector || source.singularConnectorChoice || "qui"),
    pluralConnector: nounClass === "tl" ? "m-eh" : "t-in",
    possessiveSingularConnector,
    allowedStates,
    defaultState: allowedStates[0],
    defaultAnimacy,
    transformedPossessor,
    externalObjectPerson: activationRequested ? activatedObjectPerson : "",
    activatedProjectiveObject: activationRequested,
    lexicalFamily: oldPersonFamily,
    preteritAgentiveVariant,
    boundaryVariant,
    boundaryContext,
    affinityApplied: affinitySelected,
    appliedAuthorizationIds,
    appliedSemanticRules: rules,
    semanticProfile,
    typedOperationAuthority: true,
    callerSuppliedDerivedAuthorityAccepted: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
  return { sourceFrame, operationFrame, blockReason: "" };
}

function applyActionStemRule(stem = "", rule = "none") {
  const source = normalizeStem(stem);
  if (rule === "none") return { stem: source, authorized: true };
  const rules = {
    "ca-to-qui": [/ca$/u, "qui"],
    "hua-to-hui": [/hua$/u, "hui"],
    "ci-to-xi": [/ci$/u, "xi"],
    "ti-to-chi": [/ti$/u, "chi"],
    "root-plus-ya-delete": [/-?ya$/u, ""],
    "denominal-ya-delete": [/-?ya$/u, ""],
  };
  const selected = rules[rule];
  if (!selected || !selected[0].test(source)) return { stem: "", authorized: false };
  return { stem: source.replace(selected[0], selected[1]), authorized: true };
}

function selectOwnedActionStemRule(
  lexicalFrame = null,
  sourceStem = "",
  suffix = "",
  requestedVariant = ""
) {
  const allowed = lexicalFrame?.actionStemVariants || ["none"];
  const requested = normalizeKey(requestedVariant);
  if (requested) {
    return allowed.includes(requested)
      ? { authorizationStatus: "authorized", stemRule: requested }
      : {
        authorizationStatus: "blocked",
        stemRule: "",
        blockReason:
          "37.3-action-stem-variant-not-lexically-authorized",
      };
  }
  if (suffix === "z") {
    const compatible = allowed.find(rule => {
      const ruled = applyActionStemRule(sourceStem, rule);
      return ruled.authorized && /i$/u.test(ruled.stem);
    });
    if (compatible) {
      return { authorizationStatus: "authorized", stemRule: compatible };
    }
  }
  return {
    authorizationStatus: "authorized",
    stemRule: allowed[0] || "none",
  };
}

function buildDeverbalActionOperation(request = {}, preparedSourceFrame = null) {
  const sourceFrame = buildSourceFrame(request, "future-core", preparedSourceFrame);
  if (sourceFrame.authorizationStatus !== "authorized") {
    return { sourceFrame, operationFrame: null, blockReason: sourceFrame.blockReason };
  }
  const actionKind = normalizeKey(request.actionKind || "active-action");
  const suffix = normalizeKey(request.actionSuffix || "liz");
  if (!["active-action", "potential-patient", "impersonal-general-action"].includes(actionKind)) {
    return { sourceFrame, operationFrame: null, blockReason: "deverbal-action-kind-not-recognized" };
  }
  if (!["z", "liz"].includes(suffix)) {
    return { sourceFrame, operationFrame: null, blockReason: "z-or-liz-action-suffix-required" };
  }
  const lexicalFrame = sourceFrame.lexicalAuthorizationFrame;
  const stemSelection = selectOwnedActionStemRule(
    lexicalFrame,
    sourceFrame.sourceStem,
    suffix,
    request.actionStemVariant
  );
  if (stemSelection.authorizationStatus !== "authorized") {
    return {
      sourceFrame,
      operationFrame: null,
      blockReason: stemSelection.blockReason,
    };
  }
  const stemRule = stemSelection.stemRule;
  const ruled = applyActionStemRule(sourceFrame.sourceStem, stemRule);
  if (!ruled.authorized) {
    return { sourceFrame, operationFrame: null, blockReason: `action-stem-rule-${stemRule}-environment-not-met` };
  }
  let actionCore = ruled.stem;
  if (
    suffix === "z"
    && !/i$/u.test(actionCore)
    && !lexicalFrame.zActionException
  ) {
    return { sourceFrame, operationFrame: null, blockReason: "37.2-z-requires-final-i-or-typed-exception" };
  }
  const objectPrefix = actionKind === "potential-patient"
    ? ""
    : internalObjectPrefix(
      sourceFrame.sourceObjectPattern,
      sourceFrame.sourceSubject,
      true
    );
  if (
    actionKind === "potential-patient"
    && sourceFrame.sourceValence !== "intransitive"
    && ![
      "nonspecific-human",
      "nonspecific-nonhuman",
      "human-and-nonhuman",
      "reflexive",
      "reciprocal",
    ].includes(sourceFrame.sourceObjectPattern)
  ) {
    return {
      sourceFrame,
      operationFrame: null,
      blockReason:
        "transitive-potential-patient-projective-object-source-required",
    };
  }
  actionCore = joinMorphs([objectPrefix, actionCore]);
  const targetStem = joinMorphs([actionCore, suffix]);
  const appliedAuthorizationIds = [
    ...(stemRule === "none"
      ? []
      : [`lexical-source:action-stem-${stemRule}`]),
    ...(lexicalFrame.zActionException && suffix === "z"
      ? ["lexical-source:z-final-exception"]
      : []),
    ...(actionKind === "potential-patient"
      && sourceFrame.sourceValence !== "intransitive"
      ? ["structural-source:projective-object-deletion"]
      : []),
  ];
  const operationFrame = deepFreeze({
    kind: "classical-nahuatl-deverbal-nnc-operation-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    operationId: `deverbal-action:${actionKind}:${suffix}`,
    constructionKind: "deverbal-action",
    actionKind,
    actionSuffix: suffix,
    sourceStage: sourceFrame.sourceStage,
    sourceVoice: sourceFrame.sourceVoice,
    sourceObjectPattern: sourceFrame.sourceObjectPattern,
    stemRule,
    targetStems: {
      restrictedUse: targetStem,
      generalUse: targetStem,
    },
    nounClass: "tli",
    nncFamily: actionKind,
    connectorProfile: "derived-tli",
    pluralConnector: "t-in",
    possessiveSingularConnector: "0",
    allowedStates: ["absolutive", "possessive"],
    defaultState: "absolutive",
    defaultAnimacy: actionKind === "potential-patient" ? "animate" : "nonanimate",
    transformedPossessor: sourceSubjectToPossessor(sourceFrame.sourceSubject),
    appliedAuthorizationIds,
    appliedSemanticRules: [
      suffix === "z" ? "37.2-active-action-z" : "37.3-active-action-liz",
      ...(stemRule === "none" ? [] : [`37.3-${stemRule}`]),
      ...(actionKind === "potential-patient" ? ["37.5.2-potential-patient"] : []),
      ...(actionKind === "impersonal-general-action" ? ["37.5.3-impersonal-general-action"] : []),
    ],
    typedOperationAuthority: true,
    callerSuppliedDerivedAuthorityAccepted: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
  return { sourceFrame, operationFrame, blockReason: "" };
}

function truncateNonactiveStem(stem = "", suffix = "") {
  const source = normalizeStem(stem);
  const normalizedSuffix = normalizeKey(suffix).replace(/ō/gu, "ō");
  if (normalizedSuffix === "lō" && /lō$/u.test(source)) {
    return { stem: source.replace(/lō$/u, "l"), nounClass: "tli" };
  }
  if (normalizedSuffix === "lō-hua" && /lō-?hua$/u.test(source)) {
    return { stem: source.replace(/lō-?hua$/u, "l"), nounClass: "tli" };
  }
  if (normalizedSuffix === "ō" && /ō$/u.test(source)) {
    return { stem: source.replace(/ō$/u, ""), nounClass: "tli" };
  }
  if (normalizedSuffix === "ō-hua" && /ō-?hua$/u.test(source)) {
    return { stem: source.replace(/ō-?hua$/u, ""), nounClass: "tli" };
  }
  if (normalizedSuffix === "hua" && /hua$/u.test(source)) {
    return { stem: shortenFinalVowel(source.replace(/-?hua$/u, "")), nounClass: "tl" };
  }
  return { stem: "", nounClass: "" };
}

function assimilateCharacteristicYō(embedStem = "") {
  const stem = normalizeStem(embedStem);
  const final = finalUnit(stem);
  const assimilated = ({
    l: "lō",
    z: "zō",
    x: "xō",
    ch: "chō",
    tz: "tzō",
    c: "cō",
  })[final];
  if (!assimilated) return joinMorphs([stem, "yō"]);
  return `${stem}-${assimilated}`;
}

function buildPatientiveOperation(request = {}, preparedSourceFrame = null) {
  const patientiveKind = normalizeKey(request.patientiveKind || "ordinary");
  if (patientiveKind === "characteristic-property") {
    const sourceFrame = buildSourceFrame(
      request,
      "nounstem-embed",
      preparedSourceFrame
    );
    if (sourceFrame.authorizationStatus !== "authorized") {
      return { sourceFrame, operationFrame: null, blockReason: sourceFrame.blockReason };
    }
    const targetStem = assimilateCharacteristicYō(sourceFrame.sourceStem);
    const reading = normalizeKey(request.characteristicReading || "inherent-quality");
    if (!["inherent-quality", "pertaining-to", "intrinsic-aspect", "organic-possession"].includes(reading)) {
      return { sourceFrame, operationFrame: null, blockReason: "39.3-characteristic-reading-required" };
    }
    const state = normalizeKey(request.state || "absolutive");
    if (reading === "organic-possession" && state !== "possessive") {
      return { sourceFrame, operationFrame: null, blockReason: "39.3.4-organic-possession-is-possessive-only" };
    }
    return {
      sourceFrame,
      operationFrame: deepFreeze({
        kind: "classical-nahuatl-deverbal-nnc-operation-frame",
        version: VERSION,
        authorizationStatus: "authorized",
        operationId: `patientive:characteristic-property:${reading}`,
        constructionKind: "patientive",
        patientiveKind,
        patientiveSourceFamily: "imperfective-active-core",
        characteristicReading: reading,
        targetStems: {
          restrictedUse: reading === "organic-possession" ? "" : targetStem,
          generalUse: targetStem.replace(/ō$/u, "o"),
        },
        nounClass: "tl",
        nncFamily: "characteristic-property-patientive",
        connectorProfile: "derived-tl",
        pluralConnector: "t-in",
        possessiveSingularConnector: "0",
        allowedStates: reading === "organic-possession"
          ? ["possessive"]
          : ["absolutive", "possessive"],
        defaultState: state,
        defaultAnimacy: "nonanimate",
        transformedPossessor: "",
        appliedSemanticRules: [
          "39.3-characteristic-property-yo",
          ...(reading === "organic-possession" ? ["39.3.4-organic-possession"] : []),
        ],
        typedOperationAuthority: true,
        callerSuppliedDerivedAuthorityAccepted: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
      }),
      blockReason: "",
    };
  }

  const sourceFamily = normalizeKey(request.patientiveSourceFamily);
  if (!PATIENTIVE_SOURCE_FAMILIES.includes(sourceFamily)) {
    return { sourceFrame: null, operationFrame: null, blockReason: "patientive-source-family-required" };
  }
  const expectedStage = ({
    "passive-core": "nonactive-core",
    "impersonal-core": "nonactive-core",
    "perfective-active-core": "perfective-core",
    "imperfective-active-core": "imperfective-core",
    "root-or-stock": "root-or-stock",
  })[sourceFamily];
  const sourceFrame = buildSourceFrame(request, expectedStage, preparedSourceFrame);
  if (sourceFrame.authorizationStatus !== "authorized") {
    return { sourceFrame, operationFrame: null, blockReason: sourceFrame.blockReason };
  }
  const source = request.source && typeof request.source === "object" ? request.source : request;
  const lexicalFrame = sourceFrame.lexicalAuthorizationFrame;
  if (sourceFamily === "passive-core" && sourceFrame.sourceValence === "intransitive") {
    return { sourceFrame, operationFrame: null, blockReason: "37.9-passive-patientive-has-no-intransitive-ultimate-source" };
  }
  const passiveHumanObjectRealization = normalizeKey(
    request.passiveHumanObjectRealization || "retain"
  );
  if (!["retain", "delete"].includes(passiveHumanObjectRealization)) {
    return {
      sourceFrame,
      operationFrame: null,
      blockReason: "37.9.3-passive-human-object-realization-not-recognized",
    };
  }
  if (
    passiveHumanObjectRealization === "delete"
    && (
      sourceFamily !== "passive-core"
      || sourceFrame.sourceObjectPattern !== "nonspecific-human"
      || !lexicalFrame.passiveHumanObjectDeletion
    )
  ) {
    return {
      sourceFrame,
      operationFrame: null,
      blockReason: "37.9.3-human-object-deletion-lexical-license-required",
    };
  }
  let targetCore = "";
  let nounClass = "tli";
  const rules = [];
  const appliedAuthorizationIds = [];
  if (["passive-core", "impersonal-core"].includes(sourceFamily)) {
    let nonactiveSourceStem = sourceFrame.sourceStem;
    if (lexicalFrame.patientiveRootPlusYaDeletion) {
      const suffix = normalizeKey(source.nonactiveSuffix);
      const boundary = suffix === "lō" ? /-?ya(?=-?lō$)/u : /-?ya(?=-?ō$)/u;
      if (!boundary.test(nonactiveSourceStem)) {
        return {
          sourceFrame,
          operationFrame: null,
          blockReason: "38.1.1-root-plus-ya-deletion-environment-required",
        };
      }
      nonactiveSourceStem = nonactiveSourceStem.replace(boundary, "");
      rules.push("38.1.1-root-plus-ya-deletion");
      appliedAuthorizationIds.push(
        "lexical-source:patientive-root-plus-ya-deletion"
      );
    }
    const truncated = truncateNonactiveStem(
      nonactiveSourceStem,
      source.nonactiveSuffix
    );
    if (!truncated.stem) {
      return { sourceFrame, operationFrame: null, blockReason: "typed-nonactive-suffix-does-not-match-source-core" };
    }
    let objectPattern = sourceFrame.sourceObjectPattern;
    if (
      sourceFamily === "passive-core"
      && objectPattern === "nonspecific-human"
      && passiveHumanObjectRealization === "delete"
    ) {
      objectPattern = "none";
      rules.push("37.9.3-optional-retained-te-deletion");
      appliedAuthorizationIds.push(
        "lexical-source:passive-human-object-deletion"
      );
    }
    if (
      sourceFamily === "impersonal-core"
      && objectPattern === "nonspecific-human"
    ) {
      if (lexicalFrame.exceptionalHumanPrefixRetention) {
        rules.push("38.1.5-exceptional-human-te-retention");
        appliedAuthorizationIds.push(
          "lexical-source:exceptional-human-prefix-retention"
        );
      } else {
        objectPattern = "nonspecific-nonhuman";
        rules.push("38.1.4-human-source-tla-impersonalization");
      }
    }
    const prefix = internalObjectPrefix(
      objectPattern,
      sourceFrame.sourceSubject,
      true
    );
    let truncatedStem = normalizeStem(truncated.stem);
    targetCore = joinMorphs([prefix, truncatedStem]);
    nounClass = truncated.nounClass;
    rules.push(
      sourceFamily === "passive-core"
        ? "37.9-passive-patientive"
        : "38.1-impersonal-patientive",
      `37.8-nonactive-${normalizeKey(source.nonactiveSuffix)}-truncation`
    );
  } else if (sourceFamily === "perfective-active-core") {
    const final = finalUnit(sourceFrame.sourceStem);
    if (!PERFECTIVE_PATIENTIVE_FINALS.includes(final)) {
      return { sourceFrame, operationFrame: null, blockReason: "39.1-perfective-source-ending-not-licensed" };
    }
    const analogy = normalizeKey(request.patientiveAnalogy || "impersonal");
    if (!["passive", "impersonal"].includes(analogy)) {
      return { sourceFrame, operationFrame: null, blockReason: "39.1-perfective-patientive-analogy-required" };
    }
    let pattern = sourceFrame.sourceObjectPattern;
    if (analogy === "passive" && pattern === "nonspecific-nonhuman") pattern = "none";
    if (analogy === "impersonal" && pattern === "nonspecific-human") pattern = "nonspecific-nonhuman";
    targetCore = joinMorphs([
      internalObjectPrefix(pattern, sourceFrame.sourceSubject, true),
      sourceFrame.sourceStem,
    ]);
    nounClass = "tli";
    rules.push(`39.1-perfective-${analogy}-analogy`);
  } else if (sourceFamily === "imperfective-active-core") {
    const analogy = normalizeKey(request.patientiveAnalogy || "impersonal");
    if (!["passive", "impersonal"].includes(analogy)) {
      return { sourceFrame, operationFrame: null, blockReason: "39.2-imperfective-patientive-analogy-required" };
    }
    let pattern = sourceFrame.sourceObjectPattern;
    if (analogy === "passive" && pattern === "nonspecific-nonhuman") pattern = "none";
    targetCore = joinMorphs([
      internalObjectPrefix(pattern, sourceFrame.sourceSubject, true),
      sourceFrame.sourceStem,
    ]);
    nounClass = "tl";
    rules.push(`39.2-imperfective-${analogy}-analogy`);
  } else {
    const rootStock = lexicalFrame.rootStockAuthorization;
    if (!rootStock) {
      return {
        sourceFrame,
        operationFrame: null,
        blockReason: "39.4-root-stock-source-not-lexically-authorized",
      };
    }
    const allomorph = normalizeKey(
      request.rootStockAllomorph || rootStock.defaultAllomorph
    );
    if (!rootStock.allomorphs.includes(allomorph)) {
      return {
        sourceFrame,
        operationFrame: null,
        blockReason:
          "39.4-root-stock-allomorph-not-lexically-authorized",
      };
    }
    targetCore = allomorph === "zero"
      ? rootStock.targetBase
      : joinMorphs([rootStock.targetBase, allomorph]);
    nounClass = rootStock.nounClassByAllomorph[allomorph]
      || rootStock.nounClass;
    rules.push(`39.4-${rootStock.stockKind}-${allomorph}`);
    appliedAuthorizationIds.push(
      `lexical-source:root-stock-${rootStock.stockKind}-${allomorph}`
    );
  }
  const operationFrame = deepFreeze({
    kind: "classical-nahuatl-deverbal-nnc-operation-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    operationId: `patientive:${sourceFamily}`,
    constructionKind: "patientive",
    patientiveKind: "ordinary",
    patientiveSourceFamily: sourceFamily,
    sourceStage: sourceFrame.sourceStage,
    sourceVoice: sourceFrame.sourceVoice,
    sourceValence: sourceFrame.sourceValence,
    sourceObjectPattern: sourceFrame.sourceObjectPattern,
    targetStems: {
      restrictedUse: targetCore,
      generalUse: targetCore,
    },
    nounClass,
    nncFamily: `${sourceFamily}-patientive`,
    connectorProfile: nounClass === "tl" ? "derived-tl" : "derived-tli",
    pluralConnector: "t-in",
    possessiveSingularConnector: "0",
    allowedStates: ["absolutive", "possessive"],
    defaultState: "absolutive",
    defaultAnimacy: "animate",
    transformedPossessor: "",
    passiveHumanObjectRealization,
    rootStockKind:
      lexicalFrame.rootStockAuthorization?.stockKind || "",
    rootStockAllomorph:
      sourceFamily === "root-or-stock"
        ? normalizeKey(
          request.rootStockAllomorph
            || lexicalFrame.rootStockAuthorization?.defaultAllomorph
        )
        : "",
    appliedAuthorizationIds,
    appliedSemanticRules: rules,
    typedOperationAuthority: true,
    callerSuppliedDerivedAuthorityAccepted: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
  return { sourceFrame, operationFrame, blockReason: "" };
}

function ownerhoodMatrixForSource(source = {}) {
  const nounClass = normalizeNounClass(source.nounClass);
  const subclass = normalizeKey(source.nounSubclass || "");
  const stem = normalizeStem(source.sourceStem || source.stem);
  const requested = normalizeKey(source.ownerhoodMatrix || "").replace("yo-a", "yō-ā");
  if (requested === "yō-ā") return requested;
  const final = finalUnit(stem);
  const eLicensed = nounClass === "tli" && !["uh", "h"].includes(final)
    || nounClass === "tl" && ["2-b", "2-c", "2-a-glottal"].includes(subclass);
  const huaLicensed = nounClass === "in"
    || nounClass === "zero"
    || nounClass === "tl" && ["1", "1-a", "1-b"].includes(subclass)
    || nounClass === "tli" && ["uh", "h"].includes(final);
  if (requested === "ē" && eLicensed) return requested;
  if (requested === "huā" && huaLicensed) return requested;
  if (!requested && eLicensed && !huaLicensed) return "ē";
  if (!requested && huaLicensed && !eLicensed) return "huā";
  return "";
}

function buildOwnerhoodOperation(request = {}, preparedSourceFrame = null) {
  const source = request.source && typeof request.source === "object" ? request.source : request;
  const sourceFrame = buildSourceFrame({
    ...request,
    source: {
      ...source,
      sourceStage: "nounstem-general-use",
      sourceUnit: "nnc-nounstem",
      sourceVoice: "active",
      sourceValence: "intransitive",
      sourceObjectPattern: "none",
    },
  }, "nounstem-general-use", preparedSourceFrame);
  if (sourceFrame.authorizationStatus !== "authorized") {
    return { sourceFrame, operationFrame: null, blockReason: sourceFrame.blockReason };
  }
  const nounClass = normalizeNounClass(source.nounClass);
  const matrix = ownerhoodMatrixForSource(source);
  if (!nounClass || !matrix) {
    return { sourceFrame, operationFrame: null, blockReason: "35.9-ownerhood-matrix-not-licensed-for-typed-source-class" };
  }
  let restrictedUse = "";
  if (matrix === "ē") {
    restrictedUse = joinMorphs([sourceFrame.sourceStem, "eh", "0"]);
  } else if (matrix === "huā") {
    const stem = /uh$/u.test(sourceFrame.sourceStem)
      ? sourceFrame.sourceStem.replace(/uh$/u, "hui")
      : sourceFrame.sourceStem;
    restrictedUse = joinMorphs([stem, "huah", "0"]);
  } else {
    restrictedUse = joinMorphs([
      assimilateCharacteristicYō(sourceFrame.sourceStem),
      "h",
      "0",
    ]);
  }
  const generalUse = joinMorphs([restrictedUse, "cā"]);
  const operationFrame = deepFreeze({
    kind: "classical-nahuatl-deverbal-nnc-operation-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    operationId: `ownerhood:${matrix}`,
    constructionKind: "ownerhood",
    ownerhoodMatrix: matrix,
    ownerhoodKind: matrix === "yō-ā" ? "abundant-ownerhood" : "ordinary-ownerhood",
    sourceNounClass: nounClass,
    sourceNounSubclass: normalizeKey(source.nounSubclass),
    targetStems: {
      restrictedUse,
      generalUse,
    },
    nounClass: "zero",
    nncFamily: matrix === "yō-ā" ? "abundant-ownerhood-agentive" : "ownerhood-agentive",
    connectorProfile: "preterit-agentive",
    singularConnectorChoice: normalizeKey(request.numberConnector || "silent"),
    pluralConnector: "qu-eh",
    possessiveSingularConnector: "uh",
    allowedStates: ["absolutive", "possessive"],
    defaultState: "absolutive",
    defaultAnimacy: "animate",
    transformedPossessor: "",
    appliedSemanticRules: [
      matrix === "yō-ā" ? "35.10-abundant-ownerhood" : "35.9-ownerhood",
      "35.5-ca-general-use",
    ],
    typedOperationAuthority: true,
    callerSuppliedDerivedAuthorityAccepted: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
  return { sourceFrame, operationFrame, blockReason: "" };
}

function buildContinuationOperation(
  request = {},
  target = globalThis,
  preparedSourceFrame = null
) {
  const constructionKind = normalizeKey(request.constructionKind);
  const source = request.source && typeof request.source === "object" ? request.source : request;
  const derivationKind = normalizeKey(source.derivationKind);
  let continuationSourceStem = normalizeStem(
    source.sourceStem || source.stem
  );
  const boundaryRules = [];
  if (source.omitCharacteristicYō === true) {
    if (
      ![
        "characteristic-property-patientive",
        "preterit-agentive-characteristic-property",
      ].includes(derivationKind)
      || !/-?yō$/u.test(continuationSourceStem)
    ) {
      return {
        sourceFrame: null,
        operationFrame: null,
        canonicalResult: null,
        blockReason: "39.9-characteristic-yo-omission-requires-typed-derived-source",
      };
    }
    continuationSourceStem = continuationSourceStem.replace(/-?yō$/u, "");
    boundaryRules.push("39.9-characteristic-yo-embed-omission");
  }
  const sourceFrame = buildSourceFrame({
    ...request,
    source: {
      ...source,
      sourceStage: source.sourceStage || "derived-nounstem",
      sourceUnit: "derived-nnc-nounstem",
      sourceVoice: "active",
      sourceValence: "intransitive",
      sourceObjectPattern: "none",
      sourceStem: continuationSourceStem,
    },
  }, "derived-nounstem", preparedSourceFrame);
  if (sourceFrame.authorizationStatus !== "authorized") {
    return { sourceFrame, operationFrame: null, canonicalResult: null, blockReason: sourceFrame.blockReason };
  }
  const matrixStem = normalizeStem(source.matrixStem || request.matrixStem);
  if (!matrixStem) {
    return { sourceFrame, operationFrame: null, canonicalResult: null, blockReason: "typed-continuation-matrix-required" };
  }
  if (
    ["active-action-z", "active-action-liz"].includes(derivationKind)
    && /z$/u.test(continuationSourceStem)
    && /^tzin/u.test(matrixStem)
  ) {
    continuationSourceStem = continuationSourceStem.replace(/z$/u, "");
    boundaryRules.push("37.5-s-to-tz-affective-assimilation");
  }
  if (constructionKind === "nominal-continuation") {
    const matrixClass = normalizeNounClass(source.matrixClass || request.matrixClass);
    if (!matrixClass) {
      return { sourceFrame, operationFrame: null, canonicalResult: null, blockReason: "nominal-continuation-matrix-class-required" };
    }
    const compoundStem = joinMorphs([continuationSourceStem, matrixStem]);
    const operationFrame = deepFreeze({
      kind: "classical-nahuatl-deverbal-nnc-operation-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      operationId: "nominal-continuation:derived-nounstem-embed",
      constructionKind,
      continuationRelation: "compound-nnc-embed",
      targetStems: { restrictedUse: compoundStem, generalUse: compoundStem },
      nounClass: matrixClass,
      nncFamily: "derived-nounstem-compound",
      connectorProfile: matrixClass === "tl" ? "derived-tl" : matrixClass === "tli" ? "derived-tli" : "derived-other",
      pluralConnector: matrixClass === "tl" ? "m-eh" : "t-in",
      possessiveSingularConnector: "0",
      allowedStates: ["absolutive", "possessive"],
      defaultState: "absolutive",
      defaultAnimacy: normalizeKey(request.animacy || "nonanimate"),
      transformedPossessor: "",
      appliedSemanticRules: [
        "35.7-or-37.5.4-or-38.2-or-39.6-nominal-embed",
        ...boundaryRules,
      ],
      typedOperationAuthority: true,
      callerSuppliedDerivedAuthorityAccepted: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
    return { sourceFrame, operationFrame, canonicalResult: null, blockReason: "" };
  }
  if (constructionKind === "verbal-continuation") {
    if (typeof target.evaluateClassicalNahuatlNominalConstruction !== "function") {
      return { sourceFrame, operationFrame: null, canonicalResult: null, blockReason: "canonical-compound-vnc-evaluator-unavailable" };
    }
    const relation = normalizeKey(request.relation || "adverb");
    const sourceState = normalizeKey(source.sourceState || "absolutive");
    const possessor = normalizeSubject(source.possessor);
    const possessorToObjectTransfer = source.possessorToObjectTransfer === true;
    const objectCoreference = normalizeKey(source.objectCoreference);
    const matrixFamily = normalizeKey(source.matrixFamily);
    if (
      relation === "complement"
      && sourceState === "absolutive"
      && objectCoreference !== "matrix-object"
    ) {
      return {
        sourceFrame,
        operationFrame: null,
        canonicalResult: null,
        blockReason: "39.7-absolutive-complement-requires-matrix-object-coreference",
      };
    }
    if (
      ["complement", "object"].includes(relation)
      && sourceState === "possessive"
      && (!possessor || !possessorToObjectTransfer)
    ) {
      return {
        sourceFrame,
        operationFrame: null,
        canonicalResult: null,
        blockReason: "39.7-39.8-possessor-to-object-transfer-required",
      };
    }
    if (relation === "object" && sourceState !== "possessive") {
      return {
        sourceFrame,
        operationFrame: null,
        canonicalResult: null,
        blockReason: "39.8-incorporated-object-requires-possessive-source",
      };
    }
    if (
      relation === "object"
      && !["tlani", "ih-tlani", "tēm-o-ā"].includes(matrixFamily)
    ) {
      return {
        sourceFrame,
        operationFrame: null,
        canonicalResult: null,
        blockReason: "39.8-incorporated-object-matrix-family-not-licensed",
      };
    }
    const orientation = normalizeKey(request.orientation || "subject");
    const route = relation === "complement"
      ? "complement"
      : relation === "object"
        ? "object"
        : "direct-adverb";
    const canonicalResult = target.evaluateClassicalNahuatlNominalConstruction({
      constructionKind: "nominal-embed-vnc",
      source: {
        embedStem: continuationSourceStem,
        embedClass: normalizeNounClass(source.embedClass || "tli"),
        matrixStem,
        matrixVerbClass: normalizeToken(source.matrixVerbClass || "A").toUpperCase(),
        matrixValence: normalizeKey(source.matrixValence || "single-object"),
      },
      relation,
      route,
      orientation,
      complementKind: normalizeKey(request.complementKind || "considering"),
      adverbRole: normalizeKey(request.adverbRole || "manner"),
      subject: normalizeSubject(request.subject || "3sg"),
      mood: normalizeKey(request.mood || "indicative"),
      tense: normalizeKey(request.tense || "present"),
      voice: normalizeKey(request.voice || "active"),
    });
    const operationFrame = deepFreeze({
      kind: "classical-nahuatl-deverbal-nnc-operation-frame",
      version: VERSION,
      authorizationStatus: canonicalResult?.authorizationStatus || "blocked",
      operationId: `verbal-continuation:${relation}`,
      constructionKind,
      continuationRelation: relation,
      matrixStem,
      sourceState,
      sourcePossessor: possessor,
      participantTransform: possessorToObjectTransfer
        ? deepFreeze({
          sourceRole: "possessor",
          sourceCase: "possessive",
          targetRole: relation === "object"
            ? "outside-applicative-object"
            : "mainline-object",
          targetCase: "objective",
          person: possessor,
          valenceInflationWithoutSuffix: relation === "complement",
          valencePreservedWithInsideAndOutsideObjects: relation === "object",
        })
        : objectCoreference === "matrix-object"
          ? deepFreeze({
            sourceRole: "discarded-embedded-subject",
            targetRole: "matrix-object",
            referenceRelation: "coreferential",
          })
          : null,
      targetStems: {
        restrictedUse: canonicalResult?.operationFrame?.compoundStem || "",
        generalUse: canonicalResult?.operationFrame?.compoundStem || "",
      },
      nounClass: "",
      nncFamily: "",
      connectorProfile: "",
      allowedStates: [],
      defaultState: "",
      defaultAnimacy: "",
      transformedPossessor: "",
      appliedSemanticRules: [
        relation === "complement"
          ? "35.12-or-39.7-patientive-complement"
          : relation === "object"
            ? "39.8-patientive-incorporated-object"
            : "35.12-or-39.6-or-39.9-derived-adverb-embed",
        ...boundaryRules,
      ],
      typedOperationAuthority: true,
      callerSuppliedDerivedAuthorityAccepted: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
    return {
      sourceFrame,
      operationFrame,
      canonicalResult,
      blockReason: canonicalResult?.authorizationStatus === "authorized"
        ? ""
        : canonicalResult?.blockReason || "canonical-compound-vnc-projection-blocked",
    };
  }
  return { sourceFrame, operationFrame: null, canonicalResult: null, blockReason: "continuation-kind-not-recognized" };
}

function buildVocativeOperation(request = {}, preparedSourceFrame = null) {
  const source = request.source && typeof request.source === "object" ? request.source : request;
  const sourceFrame = buildSourceFrame({
    ...request,
    source: {
      ...source,
      sourceStage: "authorized-nnc-word",
      sourceUnit: "complete-nnc",
      sourceVoice: "active",
      sourceValence: "intransitive",
      sourceObjectPattern: "none",
      sourceStem: source.wordStem || source.sourceStem,
    },
  }, "authorized-nnc-word", preparedSourceFrame);
  if (sourceFrame.authorizationStatus !== "authorized") {
    return { sourceFrame, operationFrame: null, blockReason: sourceFrame.blockReason };
  }
  const connector = normalizeKey(source.numberConnector);
  const stemFinal = finalUnit(sourceFrame.sourceStem);
  let vocativeStem = sourceFrame.sourceStem;
  let boundaryRule = "";
  if (connector === "c") {
    vocativeStem = `${vocativeStem}qu`;
    boundaryRule = "35.13-class-a-c-to-qu-before-e";
  } else if (connector === "qui") {
    vocativeStem = `${vocativeStem}qu`;
    boundaryRule = "35.13-qui-supportive-i-loss-before-e";
  } else if (connector === "silent" && ["c", "qu"].includes(stemFinal)) {
    vocativeStem = vocativeStem.replace(/c$/u, "qu");
    boundaryRule = "35.13-final-k-spelled-qu-before-e";
  } else {
    boundaryRule = "35.13-no-special-vocative-boundary";
  }
  if (request.hToYVariant === true && /h$/u.test(vocativeStem)) {
    vocativeStem = `${vocativeStem.slice(0, -1)}y`;
    boundaryRule += "+35.13-h-to-y-variant";
  }
  const operationFrame = deepFreeze({
    kind: "classical-nahuatl-deverbal-nnc-operation-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    operationId: "vocative:preterit-agentive",
    constructionKind: "vocative",
    targetStems: { restrictedUse: vocativeStem, generalUse: vocativeStem },
    nounClass: "zero",
    nncFamily: "vocative",
    connectorProfile: "zero-class-vnc-number",
    allowedStates: [],
    defaultState: "",
    defaultAnimacy: "animate",
    transformedPossessor: "",
    vocativeParticle: "ē",
    vocativeSurface: `${vocativeStem.replace(/[0Ø⎕-]/gu, "")}ē`,
    appliedSemanticRules: [boundaryRule],
    typedOperationAuthority: true,
    callerSuppliedDerivedAuthorityAccepted: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
  return { sourceFrame, operationFrame, blockReason: "" };
}

function buildDoubleNucleusOwnerhoodOperation(request = {}) {
  const source = request.source && typeof request.source === "object" ? request.source : request;
  const principalFrame = source.principalNncFrame;
  const supplementFrame = source.supplementNncFrame;
  const typedPrincipal = ISSUED_NNC_SLOT_FRAMES.has(principalFrame);
  const typedSupplement = ISSUED_NNC_SLOT_FRAMES.has(supplementFrame);
  if (!typedPrincipal || !typedSupplement) {
    return {
      sourceFrame: null,
      operationFrame: null,
      blockReason: "35.14-typed-fixed-order-double-nucleus-source-required",
    };
  }
  const principalStem = normalizeStem(principalFrame.slots?.predicate?.stem);
  const supplementStem = normalizeStem(supplementFrame.slots?.predicate?.stem);
  const sourceStem = joinMorphs([supplementStem, principalStem]);
  const lexicalAuthorizationFrame = buildLexicalAuthorizationFrame({
    sourceUnit: "double-nucleus-nnc",
    sourceStage: "lexicalized-supplementation",
    sourceStem,
  });
  const sourceFrame = deepFreeze({
    kind: "classical-nahuatl-deverbal-nnc-source-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    sourceUnit: "double-nucleus-nnc",
    sourceStage: "lexicalized-supplementation",
    sourceStem,
    principalNncFrame: principalFrame,
    supplementNncFrame: supplementFrame,
    fixedOrder: true,
    lexicalAuthorizationFrame,
    lexicalFactsReadOnly: true,
    typedSourceAuthority: true,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
  ISSUED_SOURCE_FRAMES.add(sourceFrame);
  const targetStem = joinMorphs([sourceStem, "yō", "h", "0"]);
  const operationFrame = deepFreeze({
    kind: "classical-nahuatl-deverbal-nnc-operation-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    operationId: "double-nucleus-ownerhood:yō-ā",
    constructionKind: "double-nucleus-ownerhood",
    targetStems: { restrictedUse: targetStem, generalUse: joinMorphs([targetStem, "cā"]) },
    nounClass: "zero",
    nncFamily: "double-nucleus-abundant-ownerhood",
    connectorProfile: "preterit-agentive",
    singularConnectorChoice: "silent",
    pluralConnector: "qu-eh",
    possessiveSingularConnector: "uh",
    allowedStates: ["absolutive", "possessive"],
    defaultState: "absolutive",
    defaultAnimacy: "animate",
    transformedPossessor: "",
    appliedSemanticRules: ["35.14-double-nucleus-ownerhood"],
    typedOperationAuthority: true,
    callerSuppliedDerivedAuthorityAccepted: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
  return { sourceFrame, operationFrame, blockReason: "" };
}

function evaluateGrammar(request = {}, target = globalThis, internalContext = null) {
  const hostilePath = findHostileAuthorityPath(request);
  if (hostilePath) {
    return buildBlockedFrame(
      `caller-supplied-derived-authority-rejected:${hostilePath}`,
      request
    );
  }
  const constructionKind = normalizeKey(request.constructionKind);
  if (!CONSTRUCTION_KINDS.includes(constructionKind)) {
    return buildBlockedFrame("lessons35-39-construction-kind-required", request);
  }
  let built = null;
  const preparedSourceFrame = internalContext?.preparedSourceFrame || null;
  if (constructionKind === "predicate-nominalization") {
    built = buildPredicateNominalizationOperation(
      request,
      preparedSourceFrame,
      target
    );
  } else if (constructionKind === "deverbal-action") {
    built = buildDeverbalActionOperation(request, preparedSourceFrame);
  } else if (constructionKind === "patientive") {
    built = buildPatientiveOperation(request, preparedSourceFrame);
  } else if (constructionKind === "ownerhood") {
    built = buildOwnerhoodOperation(request, preparedSourceFrame);
  } else if (["nominal-continuation", "verbal-continuation"].includes(constructionKind)) {
    built = buildContinuationOperation(request, target, preparedSourceFrame);
  } else if (constructionKind === "vocative") {
    built = buildVocativeOperation(request, preparedSourceFrame);
  } else {
    built = buildDoubleNucleusOwnerhoodOperation(request);
  }
  if (!built?.operationFrame || built.blockReason) {
    return buildBlockedFrame(
      built?.blockReason || "lessons35-39-operation-blocked",
      request,
      { sourceFrame: built?.sourceFrame || null }
    );
  }
  const operationFrame = built.operationFrame;
  let canonicalResult = built.canonicalResult || null;
  let canonicalTargetEvaluator = "";
  if (
    !canonicalResult
    && !["vocative", "verbal-continuation"].includes(constructionKind)
  ) {
    canonicalResult = buildNncTarget(
      target,
      built.sourceFrame,
      operationFrame,
      request
    );
    canonicalTargetEvaluator = "buildClassicalNahuatlNncSlotFrame";
  } else if (constructionKind === "verbal-continuation") {
    canonicalTargetEvaluator = "evaluateClassicalNahuatlNominalConstruction";
  } else {
    canonicalTargetEvaluator = "typed-vocative-boundary-realizer";
  }
  const selectedResultMatchesTypedFrame = canonicalResult?.nncSlotFrame
    ? (
      target.isClassicalNahuatlNncSlotFrame?.(canonicalResult.nncSlotFrame) === true
      && target.renderClassicalNahuatlNncSlotFrameFormula?.(
        canonicalResult.nncSlotFrame
      ) === canonicalResult.formulaRealization
    )
    : canonicalResult?.authorizationStatus === "authorized"
      || constructionKind === "vocative";
  const authorized = (
    constructionKind === "vocative"
      ? operationFrame.authorizationStatus === "authorized"
      : canonicalResult?.authorizationStatus === "authorized"
  ) && selectedResultMatchesTypedFrame;
  const greatestCommonDivisor = buildEvaluatedGcdFrame({
    constructionKind,
    sourceFrame: built.sourceFrame,
    operationFrame,
    canonicalResult,
  });
  const leastCommonMultiple = buildSelectedLcmFrame({
    constructionKind,
    sourceFrame: built.sourceFrame,
    operationFrame,
    canonicalResult,
    outputScope: "single",
  });
  const result = deepFreeze({
    kind: "classical-nahuatl-deverbal-nnc-grammar-frame",
    version: VERSION,
    constructionKind,
    authorizationStatus: authorized ? "authorized" : "blocked",
    blockReason: authorized
      ? ""
      : canonicalResult?.blockReason || operationFrame.blockReason || "canonical-target-projection-blocked",
    sourceFrame: built.sourceFrame,
    operationFrame,
    canonicalTargetEvaluator,
    canonicalResult: canonicalResult || null,
    selectedResultMatchesTypedFrame,
    formulaRealization: canonicalResult?.formulaRealization || "",
    wordSurface: constructionKind === "vocative"
      ? operationFrame.vocativeSurface
      : canonicalResult?.wordSurface
        || canonicalResult?.surfaceRealization
        || "",
    sentenceSurface: canonicalResult?.sentenceSurface || "",
    requestedOutputKind: normalizeKey(request.outputKind || request.outputScope || "single"),
    gcdIdentity: GCD_IDENTITY,
    greatestCommonDivisor,
    leastCommonMultiple,
    typedFrameAuthority: true,
    callerSuppliedAuthorityAccepted: false,
    lessonMetadataAuthorizesOutput: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
  ISSUED_GRAMMAR_FRAMES.add(result);
  return result;
}

function buildParadigmPlan(request = {}, target = globalThis) {
  const hostilePath = findHostileAuthorityPath(request);
  if (hostilePath) {
    return deepFreeze({
      kind: "classical-nahuatl-deverbal-nnc-paradigm-plan",
      version: VERSION,
      authorizationStatus: "blocked",
      blockReason: `caller-supplied-derived-authority-rejected:${hostilePath}`,
      coordinates: [],
      coordinateCount: 0,
      callerSuppliedCoordinateAuthorityAccepted: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
  }
  const seed = evaluateGrammar({
    ...deepClone(request),
    outputScope: "single",
  }, target);
  if (seed.authorizationStatus !== "authorized") {
    return deepFreeze({
      kind: "classical-nahuatl-deverbal-nnc-paradigm-plan",
      version: VERSION,
      constructionKind: normalizeKey(request.constructionKind),
      authorizationStatus: "blocked",
      blockReason: seed.blockReason,
      coordinates: [],
      coordinateCount: 0,
      callerSuppliedCoordinateAuthorityAccepted: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
  }
  const operationFrame = seed.operationFrame;
  const subjects = (Array.isArray(request.subjects) && request.subjects.length
    ? request.subjects
    : ["1sg", "2sg", "3sg", "1pl", "2pl", "3pl"])
    .map(normalizeSubject)
    .filter(Boolean);
  const states = operationFrame.allowedStates.length
    ? (Array.isArray(request.states) && request.states.length
      ? request.states.map(normalizeKey)
      : operationFrame.allowedStates)
    : ["not-applicable"];
  const coordinates = states.flatMap(state => subjects.map(subject => deepFreeze({
    coordinateId: `${state}:${subject}`,
    state,
    subject,
  })));
  const baseRequest = deepClone(request);
  if (seed.constructionKind === "double-nucleus-ownerhood") {
    baseRequest.source.principalNncFrame = seed.sourceFrame.principalNncFrame;
    baseRequest.source.supplementNncFrame = seed.sourceFrame.supplementNncFrame;
  }
  delete baseRequest.subject;
  delete baseRequest.subjects;
  delete baseRequest.state;
  delete baseRequest.states;
  delete baseRequest.outputScope;
  const plan = deepFreeze({
    kind: "classical-nahuatl-deverbal-nnc-paradigm-plan",
    version: VERSION,
    constructionKind: seed.constructionKind,
    authorizationStatus: "authorized",
    blockReason: "",
    gcdIdentity: GCD_IDENTITY,
    greatestCommonDivisor: seed.greatestCommonDivisor,
    leastCommonMultiple: buildSelectedLcmFrame({
      constructionKind: seed.constructionKind,
      sourceFrame: seed.sourceFrame,
      operationFrame: seed.operationFrame,
      canonicalResult: seed.canonicalResult,
      outputScope: "paradigm",
    }),
    preparedSourceFrame: seed.sourceFrame,
    preparedOperationFrame: seed.operationFrame,
    coordinates,
    coordinateCount: coordinates.length,
    scalarEvaluatorIdentity: "evaluateClassicalNahuatlDeverbalNnc",
    callerSuppliedCoordinateAuthorityAccepted: false,
    lessonMetadataAuthorizesOutput: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
  ISSUED_PARADIGM_PLANS.add(plan);
  PARADIGM_PLAN_CONTEXTS.set(plan, deepFreeze({ baseRequest }));
  return plan;
}

function isClassicalNahuatlParadigmPlan(plan = null) {
  return Boolean(
    ISSUED_PARADIGM_PLANS.has(plan)
    && plan?.kind === "classical-nahuatl-deverbal-nnc-paradigm-plan"
    && plan.version === VERSION
    && plan.authorizationStatus === "authorized"
    && plan.gcdIdentity === GCD_IDENTITY
    && plan.scalarEvaluatorIdentity === "evaluateClassicalNahuatlDeverbalNnc"
    && Array.isArray(plan.coordinates)
    && plan.coordinateCount === plan.coordinates.length
    && plan.callerSuppliedCoordinateAuthorityAccepted === false
    && plan.lessonMetadataAuthorizesOutput === false
    && plan.formulaStringAuthority === false
    && plan.surfaceStringAuthority === false
    && Object.isFrozen(plan)
  );
}

function projectParadigm(plan = null, coordinates = null, target = globalThis) {
  if (
    !ISSUED_PARADIGM_PLANS.has(plan)
    || plan?.kind !== "classical-nahuatl-deverbal-nnc-paradigm-plan"
    || plan.authorizationStatus !== "authorized"
  ) {
    return Object.freeze([]);
  }
  const selected = Array.isArray(coordinates) && coordinates.length
    ? coordinates
    : plan.coordinates;
  const planContext = PARADIGM_PLAN_CONTEXTS.get(plan);
  return Object.freeze(selected.map(coordinate => {
    const hostilePath = findHostileAuthorityPath(coordinate);
    if (hostilePath) {
      return buildBlockedFrame(
        `caller-supplied-derived-authority-rejected:${hostilePath}`,
        coordinate
      );
    }
    const coordinateId = normalizeToken(coordinate.coordinateId);
    const planned = plan.coordinates.find(item => item.coordinateId === coordinateId)
      || plan.coordinates.find(item => (
        item.subject === normalizeSubject(coordinate.subject)
        && item.state === normalizeKey(coordinate.state || "not-applicable")
      ));
    if (!planned) {
      return buildBlockedFrame("coordinate-not-present-in-canonical-plan", coordinate);
    }
    const scalarRequest = {
      ...deepClone(planContext.baseRequest),
      subject: planned.subject,
      outputScope: "single",
    };
    if (plan.constructionKind === "double-nucleus-ownerhood") {
      scalarRequest.source.principalNncFrame =
        plan.preparedSourceFrame.principalNncFrame;
      scalarRequest.source.supplementNncFrame =
        plan.preparedSourceFrame.supplementNncFrame;
    }
    if (planned.state !== "not-applicable") scalarRequest.state = planned.state;
    const preparedFrame = evaluateGrammar(scalarRequest, target, {
      preparedSourceFrame: plan.preparedSourceFrame,
    });
    const scalarFrame = evaluateGrammar(scalarRequest, target);
    const scalarEquivalent = preparedFrame.authorizationStatus
      === scalarFrame.authorizationStatus
      && preparedFrame.blockReason === scalarFrame.blockReason
      && preparedFrame.operationFrame?.operationId
        === scalarFrame.operationFrame?.operationId
      && preparedFrame.canonicalResult?.nncSlotFrame?.semanticIdentity
        === scalarFrame.canonicalResult?.nncSlotFrame?.semanticIdentity
      && preparedFrame.formulaRealization === scalarFrame.formulaRealization
      && preparedFrame.wordSurface === scalarFrame.wordSurface
      && preparedFrame.sentenceSurface === scalarFrame.sentenceSurface
      && preparedFrame.selectedResultMatchesTypedFrame === true
      && scalarFrame.selectedResultMatchesTypedFrame === true;
    const result = deepFreeze({
      kind: "classical-nahuatl-deverbal-nnc-paradigm-coordinate-frame",
      version: VERSION,
      constructionKind: plan.constructionKind,
      coordinateId: planned.coordinateId,
      subject: planned.subject,
      state: planned.state,
      authorizationStatus: preparedFrame.authorizationStatus,
      blockReason: preparedFrame.blockReason,
      preparedFrame,
      scalarFrame,
      scalarEquivalent,
      formulaRealization: preparedFrame.formulaRealization || "",
      wordSurface: preparedFrame.wordSurface || "",
      sentenceSurface: preparedFrame.sentenceSurface || "",
      leastCommonMultiple: preparedFrame.leastCommonMultiple,
      callerSuppliedCoordinateAuthorityAccepted: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
    if (result.authorizationStatus === "authorized") {
      ISSUED_PARADIGM_COORDINATES.add(result);
    }
    return result;
  }));
}

function isClassicalNahuatlParadigmCoordinate(frame = null) {
  return Boolean(
    ISSUED_PARADIGM_COORDINATES.has(frame)
    && frame?.kind
      === "classical-nahuatl-deverbal-nnc-paradigm-coordinate-frame"
    && frame.version === VERSION
    && frame.authorizationStatus === "authorized"
    && isClassicalNahuatlDeverbalNncGrammarFrame(frame.preparedFrame)
    && isClassicalNahuatlDeverbalNncGrammarFrame(frame.scalarFrame)
    && frame.scalarEquivalent === true
    && frame.formulaRealization === frame.preparedFrame.formulaRealization
    && frame.wordSurface === frame.preparedFrame.wordSurface
    && frame.sentenceSurface === frame.preparedFrame.sentenceSurface
    && frame.callerSuppliedCoordinateAuthorityAccepted === false
    && frame.formulaStringAuthority === false
    && frame.surfaceStringAuthority === false
    && Object.isFrozen(frame)
  );
}

function buildUiProjection(frame = null) {
  if (frame?.kind !== "classical-nahuatl-deverbal-nnc-grammar-frame") return null;
  return deepFreeze({
    kind: "classical-nahuatl-deverbal-nnc-ui-projection",
    version: VERSION,
    authorizationStatus: frame.authorizationStatus,
    blockReason: frame.blockReason,
    source: {
      panel: "#1 Source",
      constructionKind: frame.constructionKind,
      sourceUnit: frame.sourceFrame?.sourceUnit || "",
      sourceStage: frame.sourceFrame?.sourceStage || "",
      sourceVoice: frame.sourceFrame?.sourceVoice || "",
      readOnly: true,
    },
    grammar: {
      panel: "#2 Grammar",
      gcdIdentity: GCD_IDENTITY,
      greatestCommonDivisor: GCD_FRAME,
      leastCommonMultiple: frame.leastCommonMultiple,
      operationId: frame.operationFrame?.operationId || "",
      sourceFamily: frame.operationFrame?.patientiveSourceFamily || "",
      restrictedUseStem: frame.operationFrame?.targetStems?.restrictedUse || "",
      generalUseStem: frame.operationFrame?.targetStems?.generalUse || "",
      nounClass: frame.operationFrame?.nounClass || "",
      allowedStates: frame.operationFrame?.allowedStates || [],
      readOnly: true,
    },
    result: {
      panel: "#3 Result",
      formulaRealization: frame.formulaRealization || "",
      wordSurface: frame.wordSurface || "",
      sentenceSurface: frame.sentenceSurface || "",
      readOnly: true,
    },
    sourceTextAuthority: false,
    displayTextAuthority: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

export function installClassicalNahuatlDeverbalNncGlobals(
  targetObject = globalThis
) {
  const target = targetObject && typeof targetObject === "object"
    ? targetObject
    : globalThis;
  const api = {
    CLASSICAL_NAHUATL_LESSONS_35_39_GCD_IDENTITY: GCD_IDENTITY,
    CLASSICAL_NAHUATL_LESSONS_35_39_CONSTRUCTION_KINDS: CONSTRUCTION_KINDS,
    CLASSICAL_NAHUATL_LESSONS_35_39_PREDICATE_NOMINALIZATION_KINDS:
      PREDICATE_NOMINALIZATION_KINDS,
    CLASSICAL_NAHUATL_LESSONS_35_39_PATIENTIVE_SOURCE_FAMILIES:
      PATIENTIVE_SOURCE_FAMILIES,
    CLASSICAL_NAHUATL_LESSONS_35_39_LCM_DISTINCTION_AXES:
      LCM_DISTINCTION_AXES,
    CLASSICAL_NAHUATL_LESSONS_35_39_OWNERHOOD_MATRICES:
      OWNERHOOD_MATRICES,
    CLASSICAL_NAHUATL_LESSONS_35_39_GCD_FRAME: GCD_FRAME,
    CLASSICAL_NAHUATL_LESSONS_35_39_LCM_FRAME: LCM_FRAME,
    evaluateClassicalNahuatlDeverbalNnc: request => evaluateGrammar(request, target),
    isClassicalNahuatlLexicalAuthorizationFrame,
    isClassicalNahuatlDeverbalNncGrammarFrame,
    buildClassicalNahuatlDeverbalNncParadigmPlan:
      request => buildParadigmPlan(request, target),
    isClassicalNahuatlParadigmPlan,
    projectClassicalNahuatlParadigmCoordinates:
      (plan, coordinates) => projectParadigm(plan, coordinates, target),
    isClassicalNahuatlParadigmCoordinate,
    buildClassicalNahuatlUiProjection: buildUiProjection,
  };
  Object.defineProperties(target, Object.getOwnPropertyDescriptors(api));
  return api;
}
