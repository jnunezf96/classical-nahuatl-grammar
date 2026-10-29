import { capitalizeClassicalNahuatlNncSentenceInitial } from "./nnc_layer_evaluator.mjs?v=20260928-reader-evidence-cache-790&andrewsRelease=20261024-1&ownerDecision=20261029-12";

// Canonical Lesson 44 adverbial-nuclear grammar contribution.
// Grammar and lexical records in this module come only from
// ANDREWS_TRANSCRIPTION_CANVAS.md lines 17296-17908. Source-span audit
// metadata remains in tests and documentation.

const VERSION = 1;
const GCD_IDENTITY = "typed-source-nuclear-clause+adverbial-potential-gate+licensed-degree+adverbialized-subject+predicate-boundary-realization";
const LCM_PROJECTION_IDENTITY =
  "classical-nahuatl-adverbial-nuclear-owner-selected-lcm-projection";
const ISSUED_ADVERBIAL_POTENTIAL_FRAMES = new WeakSet();
const ADVERBIAL_POTENTIAL_RECORDS = new WeakMap();
const LEXICAL_ADVERBIAL_NNC_SOURCES = new WeakMap();
const LEXICAL_ADVERBIAL_VNC_SOURCES = new WeakMap();
const PRIMITIVE_ADVERBIAL_SOURCES = new WeakMap();
const ISSUED_ADVERBIAL_FRAMES = new WeakSet();
const EXACT_INCORPORATION_MATRICES = new WeakMap();
const ISSUED_ADVERBIAL_BATCH_PLANS = new WeakSet();
const ISSUED_ADVERBIAL_BATCH_COORDINATES = new WeakSet();
const ISSUED_ADVERBIAL_OPERATION_FRAMES = new WeakSet();
const ISSUED_ADVERBIAL_SUBJECT_OPERATION_FRAMES = new WeakSet();
const ISSUED_ADVERBIAL_CONTEXT_FRAMES = new WeakSet();
const ISSUED_ADVERBIAL_LCM_FRAMES = new WeakSet();
const ISSUED_ADVERBIAL_EXACT_SOURCE_RESOLUTIONS = new WeakSet();
const ISSUED_PRETERIT_AGENTIVE_ADVERBIAL_USES = new WeakSet();
const EXACT_SOURCE_PRODUCTIVE_RECORDS = new WeakMap();
const RETIRED_PRODUCTIVE_SOURCE_KEYS = Object.freeze([
  "predicateSegments",
  "route",
  "sourceKind",
  "sourcePredicateSegments",
]);
const HOSTILE_AUTHORITY_KEYS = Object.freeze([
  "answer",
  "canvasAnswer",
  "displayFormula",
  "displayText",
  "evidenceSource",
  "formula",
  "formulaArtifact",
  "generationAllowed",
  "lesson",
  "lessonMetadata",
  "result",
  "resultSurface",
  "sourceGate",
  "sourceId",
  "structuredSource",
  "surface",
  "surfaceForms",
  "targetStem",
  "word",
]);

const LCM_AXES = Object.freeze({
  sourceClauseKinds: Object.freeze(["vnc", "nnc-absolutive", "nnc-possessive"]),
  adverbialDegrees: Object.freeze(["first-degree", "second-degree"]),
  sourceStates: Object.freeze(["verbal", "absolutive", "possessive"]),
  semanticDomains: Object.freeze(["location", "direction", "time", "duration", "manner", "degree"]),
  constructionFamilies: Object.freeze([
    "lexicalized-vnc",
    "first-degree-nnc",
    "second-degree-nnc",
    "particle-looking-nnc",
    "other-absolutive-nnc",
    "preterit-agentive-nnc",
    "possessive-state-nnc",
    "incorporated-adverbial",
  ]),
  lexicalStatuses: Object.freeze([
    "productive",
    "lexicalized",
    "obligatorily-adverbial",
    "conjectural-analysis",
    "obsolete-source",
    "irregular",
    "compound-only",
  ]),
  preteritAgentiveSourceKinds: Object.freeze([
    "regular-intransitive",
    "obsolete-source",
    "obsolete-root-plus-ya-preterit",
    "root-plus-ya-full-stem",
    "irregular",
    "transitive",
    "reflexive-shuntline",
    "reflexive-mainline-lexicalized",
  ]),
  scopes: Object.freeze(["external-clause", "incorporated-predicate"]),
  subjectOperations: Object.freeze([
    "first-degree-shape-preserved",
    "second-degree-sounded-num1-to-silent",
    "incorporation-discards-subject",
  ]),
});

function normalizeToken(value = "") {
  return String(value ?? "").normalize("NFC").trim();
}

function normalizeKey(value = "") {
  return normalizeToken(value).toLowerCase().replace(/[\s_]+/gu, "-");
}

function deepClone(value) {
  if (Array.isArray(value)) return value.map(deepClone);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, deepClone(item)]));
  }
  return value;
}

function deepFreeze(value) {
  if (!value || typeof value !== "object" || Object.isFrozen(value)) return value;
  Object.values(value).forEach(deepFreeze);
  return Object.freeze(value);
}

function findHostileAuthorityPath(value, path = "request", trustedValue = null) {
  if (!value || typeof value !== "object") return "";
  if (trustedValue?.(value) === true) return "";
  for (const [key, item] of Object.entries(value)) {
    const nextPath = `${path}.${key}`;
    if (HOSTILE_AUTHORITY_KEYS.includes(key) && item !== undefined && item !== null && item !== "") return nextPath;
    if (item && typeof item === "object") {
      const nested = findHostileAuthorityPath(item, nextPath, trustedValue);
      if (nested) return nested;
    }
  }
  return "";
}

function normalizeStem(value = "") {
  const stem = normalizeToken(value)
    .replace(/[()[\]{}#]/gu, "")
    .replace(/\s+/gu, "")
    .replace(/^-+|-+$/gu, "");
  return /^[\p{L}\p{M}⎕Ø0-]+$/u.test(stem) ? stem : "";
}

function realizeCarrier(value = "") {
  return normalizeStem(value)
    .split("-")
    .filter(part => part && !["0", "Ø", "⎕"].includes(part))
    .join("");
}

function makeRecord({
  id,
  section,
  family,
  clauseKind,
  degree,
  domain,
  surface,
  predicateStem = "",
  formulaKind = "nnc",
  pers1 = "Ø",
  pers2 = "Ø",
  stateSlots = [],
  valence = "",
  num1 = "",
  num2 = "Ø",
  lexicalStatus = "lexicalized",
  sourceKind = "",
  variants = [],
  externalAllowed = true,
  incorporatedAllowed = true,
  incorporatedStem = "",
  restrictions = [],
  requiredPrecedingParticles = [],
  allowedNegativeParticles = [],
  stressPartners = [],
  writtenBoundaryRule = "identity",
  lexicalReadings = [],
  sourceAnalysis = null,
  sourceUseAnalysis = null,
  initialIAnalysis = null,
  compositionalReading = "",
  numberSystem = null,
  licensedUses = ["ordinary-adverb"],
  useEvidence = [],
  licensedAdjunctionRelations = null,
} = {}) {
  const degrees = Array.isArray(degree) ? degree : [degree];
  const sourceForm = normalizeToken(surface);
  return deepFreeze({
    id: normalizeKey(id),
    section: normalizeToken(section),
    family: normalizeKey(family),
    clauseKind: normalizeKey(clauseKind),
    allowedDegrees: degrees.map(normalizeKey).filter(Boolean),
    domain: normalizeKey(domain),
    licensedUses: licensedUses.map(normalizeKey).filter(Boolean),
    useEvidence: useEvidence.map(normalizeToken).filter(Boolean),
    licensedAdjunctionRelations: Array.isArray(licensedAdjunctionRelations)
      ? licensedAdjunctionRelations.map(normalizeKey).filter(Boolean) : null,
    sourceForms: sourceForm ? [sourceForm] : [],
    predicateStem: normalizeStem(predicateStem || sourceForm),
    formulaKind: normalizeKey(formulaKind),
    subjectSlots: { pers1: normalizeStem(pers1) || "Ø", pers2: normalizeStem(pers2) || "Ø" },
    stateSlots: stateSlots.map(normalizeStem).filter(Boolean),
    valence: normalizeStem(valence),
    num1: normalizeStem(num1) || (degrees.includes("second-degree") ? "⎕" : "Ø"),
    num2: normalizeStem(num2) || "Ø",
    lexicalStatus: normalizeKey(lexicalStatus),
    sourceKind: normalizeKey(sourceKind),
    variants: variants.map(normalizeToken).filter(Boolean),
    externalAllowed: externalAllowed !== false,
    incorporatedAllowed: incorporatedAllowed !== false && normalizeKey(clauseKind) === "nnc-absolutive",
    incorporatedStem: normalizeStem(incorporatedStem || sourceForm),
    restrictions: restrictions.map(normalizeKey).filter(Boolean),
    requiredPrecedingParticles: requiredPrecedingParticles.map(normalizeToken).filter(Boolean),
    allowedNegativeParticles: allowedNegativeParticles.map(normalizeKey).filter(Boolean),
    stressPartners: stressPartners.map(normalizeKey).filter(Boolean),
    writtenBoundaryRule: normalizeKey(writtenBoundaryRule || "identity"),
    lexicalReadings: lexicalReadings.map(normalizeToken).filter(Boolean),
    sourceAnalysis: sourceAnalysis ? deepClone(sourceAnalysis) : null,
    ...(sourceUseAnalysis ? {sourceUseAnalysis: deepClone(sourceUseAnalysis)} : {}),
    ...(initialIAnalysis?{initialIAnalysis:deepClone(initialIAnalysis)}:{}),
    compositionalReading: normalizeToken(compositionalReading),
    numberSystem: numberSystem ? deepClone(numberSystem) : null,
  });
}

const VNC_RECORDS = Object.freeze([
  makeRecord({ id: "44.3-cencah", section: "44.3.1", family: "lexicalized-vnc", clauseKind: "vnc", degree: "first-degree", domain: "degree", surface: "cencah", predicateStem: "cen-ca-h", formulaKind: "vnc", valence: "Ø", num1: "⎕", lexicalStatus: "lexicalized", licensedUses: ["ordinary-adverb", "intensifier"], useEvidence: ["49.6"] }),
  makeRecord({ id: "44.3-hualcah", section: "44.3.2", family: "lexicalized-vnc", clauseKind: "vnc", degree: "first-degree", domain: "direction", surface: "huālcah", predicateStem: "ca-h", formulaKind: "vnc", stateSlots: ["huāl"], valence: "Ø", num1: "⎕", restrictions: ["normally-modified-by-oc", "lexicalized-degree-reading"] }),
  makeRecord({ id: "44.3-cemihcac", section: "44.3.3", family: "lexicalized-vnc", clauseKind: "vnc", degree: "first-degree", domain: "duration", surface: "cemihcac", predicateStem: "cem-ihca", formulaKind: "vnc", valence: "Ø", num1: "c" }),
  makeRecord({ id: "44.3-ihui", section: "44.3.4", family: "lexicalized-vnc", clauseKind: "vnc", degree: "first-degree", domain: "manner", surface: "ihui", predicateStem: "ihui", formulaKind: "vnc", valence: "Ø", num1: "Ø" }),
  makeRecord({ id: "44.3-iuh", section: "44.3.5", family: "lexicalized-vnc", clauseKind: "vnc", degree: "first-degree", domain: "manner", surface: "iuh", predicateStem: "iuh", formulaKind: "vnc", valence: "Ø", num1: "⎕", variants: ["yuh"], restrictions: ["iuhqui-is-not-adverbial-here"] }),
  makeRecord({ id: "44.3-ihuihuih", section: "44.3.6", family: "lexicalized-vnc", clauseKind: "vnc", degree: "first-degree", domain: "manner", surface: "ihuīhuih", predicateStem: "ihuīhu-i-h", formulaKind: "vnc", valence: "Ø", num1: "⎕", lexicalStatus: "obsolete-source" }),
  makeRecord({ id: "44.3-ici", section: "44.3.7", family: "lexicalized-vnc", clauseKind: "vnc", degree: "first-degree", domain: "location", surface: "ici", predicateStem: "ici", formulaKind: "vnc", valence: "Ø", num1: "Ø" }),
  makeRecord({ id: "44.3-iz", section: "44.3.8", family: "lexicalized-vnc", clauseKind: "vnc", degree: "first-degree", domain: "location", surface: "iz", predicateStem: "iz", formulaKind: "vnc", valence: "Ø", num1: "⎕", restrictions: ["izqui-is-not-adverbial-here"] }),
  makeRecord({ id: "44.3-nohmah", section: "44.3.9", family: "lexicalized-vnc", clauseKind: "vnc", degree: "first-degree", domain: "time", surface: "nohmah", predicateStem: "noh-mah", formulaKind: "vnc", valence: "Ø", num1: "⎕", lexicalStatus: "conjectural-analysis", restrictions: ["distinct-from-possessive-nohmah-family"] }),
  makeRecord({ id: "44.3-yehua", section: "44.3.10", family: "lexicalized-vnc", clauseKind: "vnc", degree: "first-degree", domain: "time", surface: "yēhua", predicateStem: "yē-hua", formulaKind: "vnc", valence: "Ø", num1: "Ø" }),
  makeRecord({ id: "44.3-iyoh", section: "44.3.11", family: "lexicalized-vnc", clauseKind: "vnc", degree: "first-degree", domain: "degree", surface: "iyoh", predicateStem: "iyo-h", formulaKind: "vnc", valence: "Ø", num1: "⎕", restrictions: ["requires-zan-or-za"], requiredPrecedingParticles: ["zan", "zā"] }),
  makeRecord({ id: "44.3-motquiticah", section: "44.3.12", family: "lexicalized-vnc", clauseKind: "vnc", degree: "first-degree", domain: "degree", surface: "motquiticah", predicateStem: "tqui-Ø-ti-ca-h", formulaKind: "vnc", stateSlots: ["m", "o"], valence: "Ø", num1: "Ø" }),
  makeRecord({ id: "44.3-mahciticah", section: "44.3.13", family: "lexicalized-vnc", clauseKind: "vnc", degree: "first-degree", domain: "degree", surface: "mahciticah", predicateStem: "ahci-Ø-ti-ca-h", formulaKind: "vnc", stateSlots: ["m", "⎕"], valence: "Ø", num1: "Ø" }),
]);

const NNC_FOUNDATION_RECORDS = Object.freeze([
  makeRecord({ id: "44.4-cemilhuitl", section: "44.4.1", family: "first-degree-nnc", clauseKind: "nnc-absolutive", degree: "first-degree", domain: "duration", surface: "cemilhuitl", predicateStem: "cem-ilhui", num1: "tl" }),
  makeRecord({ id: "44.4-tequitl", section: "44.4.1", family: "first-degree-nnc", clauseKind: "nnc-absolutive", degree: "first-degree", domain: "manner", surface: "tequitl", predicateStem: "tequi", num1: "tl", restrictions: ["adverbial-reading-occurs-in-zan-tequitl"], requiredPrecedingParticles: ["zan"] }),
  makeRecord({ id: "44.4-inchān", section: "44.4.1", family: "first-degree-nnc", clauseKind: "nnc-possessive", degree: "first-degree", domain: "location", surface: "īnchān", predicateStem: "chān", stateSlots: ["ī", "n"], num1: "Ø", writtenBoundaryRule: "source-preserving" }),
  makeRecord({ id: "44.4-cenyohoal", section: "44.4.2", family: "second-degree-nnc", clauseKind: "nnc-absolutive", degree: "second-degree", domain: "duration", surface: "cenyohoal", predicateStem: "cen-yohoa-l", num1: "⎕" }),
  makeRecord({ id: "44.4-cecemilhuitl", section: "44.4-note", family: "first-degree-nnc", clauseKind: "nnc-absolutive", degree: "first-degree", domain: "time", surface: "cēcemilhuitl", predicateStem: "cē-cem-ilhui", num1: "tl", lexicalStatus: "productive" }),
  makeRecord({ id: "44.4-cecenyohual", section: "44.4-note", family: "second-degree-nnc", clauseKind: "nnc-absolutive", degree: "second-degree", domain: "time", surface: "cēcenyohual", predicateStem: "cē-cen-yohoa-l", num1: "⎕", lexicalStatus: "productive", writtenBoundaryRule: "oa-to-ua" }),
  makeRecord({ id: "44.4-inchahchan", section: "44.4-note", family: "first-degree-nnc", clauseKind: "nnc-possessive", degree: "first-degree", domain: "location", surface: "īnchahchān", predicateStem: "chah-chān", stateSlots: ["ī", "n"], lexicalStatus: "productive", writtenBoundaryRule: "source-preserving" }),
]);

const PARTICLE_LOOKING_RECORDS = Object.freeze([
  ["nel", "nel", "manner", "obligatorily-adverbial", []],
  ["huel", "huel", "manner", "lexicalized", ["negative-ahhuel-licensed", "ability-possibility-or-degree"]],
  ["nen", "nēn", "manner", "obligatorily-adverbial", ["may-embed-in-nnc-or-vnc"]],
  ["mo", "mō", "degree", "conjectural-analysis", ["not-inherently-interrogative", "negative-ahmo-and-camo-licensed", "subordinate-negative-reading"]],
  ["cuel", "cuēl", "time", "obsolete-source", ["source-nounstem-unattested"]],
  ["mach", "mach", "manner", "lexicalized", ["kinship-homophone-never-adverbializes", "mach-eh-collocation", "post-interrogative-ever-reading"]],
  ["quen", "quēn", "manner", "lexicalized", ["fused-in-adjunctor", "another-in-may-follow", "noninitial-loses-interrogative-force", "lexicalized-collocations"]],
].map(([id, surface, domain, lexicalStatus, restrictions]) => makeRecord({
  id: `44.5-${id}`,
  section: `44.5.${["nel", "huel", "nen", "mo", "cuel", "mach", "quen"].indexOf(id) + 1}`,
  family: "particle-looking-nnc",
  clauseKind: "nnc-absolutive",
  degree: "second-degree",
  domain,
  surface,
  predicateStem: id === "quen" ? "quē-n" : surface,
  num1: id === "quen" ? "Ø" : "⎕",
  lexicalStatus,
  restrictions,
  incorporatedAllowed: id !== "mo",
  allowedNegativeParticles: ["huel", "quen"].includes(id) ? ["ah"] : id === "mo" ? ["ah", "ca"] : [],
  stressPartners: id === "cuel" ? ["eh", "yeh"] : id === "mach" ? ["eh"] : [],
})));

const OTHER_ABSOLUTIVE_SPECS = Object.freeze([
  ["teotlac", "teōtlāc", "time", []],
  ["moztla", "mōztla", "time", ["reduplicated-momoztla-daily"]],
  ["huiptla", "huīptla", "time", ["reduplicated-huihuiptla-every-other-day"]],
  ["yalhua", "yālhua", "time", []],
  ["ticatla", "ticatla", "time", []],
  ["tlahcah", "tlahcah", "time", ["nonadverbial-tlahcahtli-distinct"]],
  ["niman", "niman", "time", []],
  ["imman", "imman", "time", ["often-collocates-imman-in"]],
  ["quemman", "quēmman", "time", ["interrogative-quen-incorporated"]],
  ["ihcuac", "ihcuāc", "time", []],
  ["yectel", "yectel", "time", ["compound-source-analysis"]],
  ["huehcauh", "huehcāuh", "duration", ["ye-huehcauh-collocation"]],
  ["ixquichcauh", "ixquichcāuh", "duration", ["first-degree-ixquichcahuitl-alternative"]],
  ["achtzan", "achtzan", "time", ["variants-achtza-atzan-atza"]],
  ["achto", "achto", "time", ["variants-acachto-yacachto-acatto-yacatto"]],
  ["cemi", "cemi", "manner", []],
  ["cen", "cen", "manner", []],
  ["cecen", "cēcen", "manner", []],
  ["cehcen", "cehcen", "manner", []],
  ["necoc", "necoc", "location", ["reduplicated-nenecoc-for-multiple-entities"]],
  ["noncuah", "nōncuah", "location", ["reduplicated-nononcuah-for-multiple-entities"]],
  ["chico", "chico", "location", ["irregular-manner-readings"]],
  ["pani", "pani", "location", ["incorporated-final-i-loss"]],
  ["tlani", "tlani", "location", []],
  ["ixtlapal", "īxtlapal", "location", ["compound-nounstem"]],
  ["centlapal", "centlapal", "location", ["variant-cectlapal"]],
  ["quexquich", "quēxquich", "location", ["interrogative-pronominal-source"]],
  ["ixquich", "ixquich", "location", ["pronominal-source"]],
  ["achi", "achi", "degree", ["pronominal-source"]],
  ["tlacuauh", "tlacuāuh", "manner", ["impersonal-patientive-source"]],
  ["tlapic", "tlapīc", "manner", ["perfective-patientive-source"]],
  ["ilhuiz", "ilhuiz", "manner", ["source-analysis-uncertain", "eh-stress-group"]],
  ["tlalhuiz", "tlalhuiz", "manner", ["source-analysis-uncertain"]],
  ["ilihhuiz", "īlihuiz", "manner", []],
  ["tlamach", "tlamach", "manner", ["impersonal-patientive-source", "distinct-from-mach"]],
  ["quemah", "quēmah", "manner", ["variants-quemahca-honorific-quemahcatzin"]],
]);

// Attested whole NNC use is independent of a proposed historical derivation.
// This records the admitted rank/cell, never an ordinary noun or finite Source.
const ATTESTED_WHOLE_ADVERBIAL_NNC = deepFreeze({
  kind: "attested-whole-adverbial-nnc", sourceRank: "nnc", state: "absolutive",
  degree: "second-degree", predicateAnalysis: "opaque", derivationalAncestry: "unclaimed",
});

const OTHER_ABSOLUTIVE_SEMANTICS = Object.freeze({
  noncuah: {
    compositionalReading: "it is off in a separate place",
    lexicalReadings: ["to one side", "separately", "apart"],
    numberSystem: {
      singularOrSingleEntityForm: "nōncuah",
      multipleEntityForm: "nōnōncuah",
      operation: "reduplication",
      multipleEntityCondition: "more-than-one-entity",
      multipleEntityReadings: ["severally apart", "separately apart"],
    },
  },
  ixtlapal: {
    compositionalReading: "it is with the side as the face",
    lexicalReadings: ["crosswise", "across", "athwart", "sideways"],
    sourceAnalysis: {
      nounstem: "ix-tla-pal-li",
      embed: { stem: "ix-tli", reading: "face" },
      matrix: { stem: "tla-pal-li", readings: ["a dyed thing", "a colored thing", "side"] },
    },
  },
  tlacuauh: {
    compositionalReading: "it is in the manner of a hardened thing",
    lexicalReadings: ["strongly", "positively", "especially"],
    sourceAnalysis: {
      nounstem: "tlacu-ā-uh-tli",
      nounstemReadings: ["a thing that has become hard", "a hardened thing"],
      sourceVerbStem: "tlacu-ā-hua",
      sourceVerbReading: "to become hard",
      patientiveKind: "impersonal",
    },
  },
  tlapic: {
    sourceUseAnalysis: ATTESTED_WHOLE_ADVERBIAL_NNC,
    compositionalReading: "it is in the manner of an imagined thing",
    lexicalReadings: ["falsely", "in vain", "futilely"],
    sourceAnalysis: {
      nounstem: "tla-pic-tli",
      nounstemReadings: ["an imagined thing", "a fabricated thing", "an invented thing"],
      sourceVerbStem: "tla-piqui",
      sourceVerbReadings: ["to imagine something", "to invent something"],
      object: { specificity: "nonspecific", referentCategory: "nonhuman" },
      patientiveKind: "perfective",
    },
  },
  ilhuiz: {sourceUseAnalysis: ATTESTED_WHOLE_ADVERBIAL_NNC},
  tlalhuiz: {sourceUseAnalysis: ATTESTED_WHOLE_ADVERBIAL_NNC},
  tlamach: {
    compositionalReading: "it is in the manner of a known thing",
    lexicalReadings: ["quietly", "calmly", "gently"],
    sourceAnalysis: {
      nounstem: "tla-mach-tli",
      sourceVerbStem: "tla-mati",
      sourceVerbReading: "to know a nonhuman thing or something",
      object: { morph: "tla", specificity: "nonspecific", referentCategory: "nonhuman" },
      patientiveKind: "impersonal",
    },
  },
});

const OTHER_ABSOLUTIVE_RECORDS = Object.freeze(OTHER_ABSOLUTIVE_SPECS.map(([id, surface, domain, restrictions]) => makeRecord({
  id: `44.6-${id}`,
  section: "44.6",
  family: "other-absolutive-nnc",
  clauseKind: "nnc-absolutive",
  degree: "second-degree",
  domain,
  surface,
  predicateStem: surface,
  num1: "⎕",
  lexicalStatus: restrictions.some(item => item.includes("uncertain")) ? "conjectural-analysis" : "lexicalized",
  restrictions,
  incorporatedStem: id === "pani" ? "pan" : surface,
  stressPartners: id === "moztla" ? ["yeh", "eh"] : id === "ilhuiz" ? ["eh"] : [],
  ...(OTHER_ABSOLUTIVE_SEMANTICS[id] || {}),
})));

const PRETERIT_AGENTIVE_SPECS = Object.freeze([
  ["pacca", "pāccā", "pāc-Ø-cā", "regular-intransitive", "productive"],
  ["chicahuaca", "chicāhuacā", "chic-ā-hua-Ø-cā", "regular-intransitive", "productive"],
  ["chipahuaca", "chipāhuacā", "chip-ā-hua-Ø-cā", "regular-intransitive", "productive"],
  ["ihuintica", "ihuinticā", "ihuin-ti-Ø-cā", "regular-intransitive", "productive"],
  ["tonaca", "tōnacā", "tōna-Ø-cā", "regular-intransitive", "productive"],
  ["cualanca", "cualāncā", "cual-ā-n-Ø-cā", "regular-intransitive", "productive"],
  ["ihciuhca", "ihciuhcā", "ihc-i-uh-Ø-cā", "regular-intransitive", "productive"],
  ["cenquizca", "cenquizca", "cen-quiz-Ø-cā", "regular-intransitive", "productive"],
  ["cecenyahca", "cēcenyahcā", "cē-cen-yah-Ø-cā", "regular-intransitive", "productive"],
  ["ohhuihca", "ohhuihcā", "oh-hui-h-Ø-cā", "obsolete-source", "obsolete-source"],
  ["nehneuhca", "nehneuhcā", "neh-ne-uh-Ø-cā", "obsolete-source", "obsolete-source"],
  ["ahhuiaca", "ahhuiācā", "ahhuiā-Ø-cā", "obsolete-root-plus-ya-preterit", "productive"],
  ["cececa", "cececā", "ce-ce-Ø-cā", "obsolete-root-plus-ya-preterit", "productive"],
  ["cococa", "cococā", "coco-Ø-cā", "obsolete-root-plus-ya-preterit", "productive"],
  ["celica", "celicā", "cel-i-Ø-cā", "obsolete-root-plus-ya-preterit", "productive"],
  ["itztica", "itzticā", "itz-ti-Ø-cā", "obsolete-root-plus-ya-preterit", "productive"],
  ["yancuica", "yancuicā", "yancui-Ø-cā", "obsolete-root-plus-ya-preterit", "productive"],
  ["hueica", "huēicā", "huē-i-Ø-cā", "obsolete-root-plus-ya-preterit", "productive"],
  ["yocoxca", "yōcoxca", "yōco-x-Ø-cā", "root-plus-ya-full-stem", "obsolete-source"],
  ["ichtaca", "ichtacā", "ich-ta-Ø-cā", "irregular", "irregular"],
  ["tlacemanca", "tlacemāncā", "tla-cem-ān-Ø-cā", "transitive", "lexicalized"],
  ["tecocohca", "tēcocohcā", "tē-coco-h-Ø-cā", "transitive", "lexicalized"],
  ["tlamatca", "tlamatcā", "tla-mat-Ø-cā", "transitive", "lexicalized"],
  ["nehmatca", "nehmatcā", "ne-h-mat-Ø-cā", "reflexive-shuntline", "lexicalized"],
  ["mihmatca", "mihmatcā", "m-⎕-ih-mat-Ø-cā", "reflexive-mainline-lexicalized", "lexicalized"],
  ["mahcica", "mahcicā", "m-⎕-ahci-Ø-cā", "reflexive-mainline-lexicalized", "lexicalized"],
]);

const PRETERIT_AGENTIVE_RECORDS = Object.freeze(PRETERIT_AGENTIVE_SPECS.map(([id, surface, predicateStem, sourceKind, lexicalStatus]) => makeRecord({
  id: `44.7-${id}`,
  section: "44.7",
  family: "preterit-agentive-nnc",
  clauseKind: "nnc-absolutive",
  degree: "second-degree",
  domain: "manner",
  surface,
  predicateStem,
  num1: "⎕",
  sourceKind,
  lexicalStatus,
  writtenBoundaryRule: ["cenquizca", "yocoxca"].includes(id)
    ? "shorten-final-a"
    : "identity",
  lexicalReadings: id === "yocoxca" ? ["calmly", "peacefully"] : [],
  ...(id === "ichtaca"?{initialIAnalysis:{kind:"real",sourceRank:"nominal-root",inheritedFrom:"ich",formationAncestry:["ich","ich-tequi","ich-tec-Ø-qui","ich-ta-Ø-cā"],sourceSections:["30.3","44.7"],sourceInitialIIsVerbalDefault:false}}:{}),
  sourceAnalysis: id === "yocoxca" ? {
    sourceStem: "yōco-ya",
    sourceStemStrategy: "full-root-plus-ya",
    sourceAttested: false,
    nonattestationBlocksDerivation: false,
    preteritAgentiveStem: "yōco-x-Ø-qui",
    preteritAgentiveReading: "one who has become well formed",
  } : null,
  restrictions: sourceKind === "transitive"
    ? ["transitive-source-is-occasional"]
    : sourceKind.startsWith("reflexive")
      ? ["reflexive-source-is-rare"]
      : [],
})));

const POSSESSIVE_RECORDS = Object.freeze([
  makeRecord({ id: "44.8-iyohca", section: "44.8.1", family: "possessive-state-nnc", clauseKind: "nnc-possessive", degree: "first-degree", domain: "manner", surface: "īyohca", predicateStem: "yo-h-ca", stateSlots: ["i", "Ø"], lexicalStatus: "lexicalized", writtenBoundaryRule: "lengthen-initial-i" }),
  makeRecord({ id: "44.8-noyohca", section: "44.8.1", family: "possessive-state-nnc", clauseKind: "nnc-possessive", degree: "first-degree", domain: "manner", surface: "noyohca", predicateStem: "yo-h-ca", stateSlots: ["n", "o"], lexicalStatus: "lexicalized" }),
  makeRecord({ id: "44.8-moyohca", section: "44.8.1", family: "possessive-state-nnc", clauseKind: "nnc-possessive", degree: "first-degree", domain: "manner", surface: "moyohca", predicateStem: "yo-h-ca", stateSlots: ["m", "o"], lexicalStatus: "lexicalized" }),
  makeRecord({ id: "44.8-nonohmah", section: "44.8.2.a", family: "possessive-state-nnc", clauseKind: "nnc-possessive", degree: "first-degree", domain: "manner", surface: "nonohmah", predicateStem: "noh-mah", stateSlots: ["n", "o"], lexicalStatus: "conjectural-analysis", restrictions: ["distinct-from-vnc-nohmah"] }),
  makeRecord({ id: "44.8-tonohmah", section: "44.8.2.a", family: "possessive-state-nnc", clauseKind: "nnc-possessive", degree: "first-degree", domain: "manner", surface: "tonohmah", predicateStem: "noh-mah", stateSlots: ["t", "o"], lexicalStatus: "conjectural-analysis" }),
  makeRecord({ id: "44.8-nonohmatca", section: "44.8.2.b", family: "possessive-state-nnc", clauseKind: "nnc-possessive", degree: "first-degree", domain: "manner", surface: "nonohmatca", predicateStem: "noh-mat-ca", stateSlots: ["n", "o"], lexicalStatus: "conjectural-analysis" }),
  makeRecord({ id: "44.8-tonohmatca", section: "44.8.2.b", family: "possessive-state-nnc", clauseKind: "nnc-possessive", degree: "first-degree", domain: "manner", surface: "tonohmatca", predicateStem: "noh-mat-ca", stateSlots: ["t", "o"], lexicalStatus: "conjectural-analysis" }),
]);

// These are Source rank/use facts, not an alternative sentence generator.
// The shared transformer still requires the exact ordinary NNC and its class
// and number carriers; the compared-use contract remains on the issued Result.
const COMPARED_MANNER_SOURCE_RECORDS = Object.freeze([
  makeRecord({
    id: "49.1-cuica-compared-manner", section: "49.1.1.d",
    family: "first-degree-nnc", clauseKind: "nnc-absolutive",
    degree: "first-degree", domain: "manner", surface: "cuīcatl",
    predicateStem: "cuīca", num1: "tl", lexicalStatus: "productive",
    sourceKind: "ordinary-nnc-compared-manner-analysis",
    incorporatedAllowed: false,
    licensedUses: ["compared-manner"], useEvidence: ["44.1", "44.2", "49.1.1.d"],
    licensedAdjunctionRelations: ["compared-manner"],
    sourceAnalysis: {
      kind: "ordinary-nnc-adverbial-source-analysis",
      nounClass: "tl", num1: "tl", state: "absolutive",
      subjectMode: "third-form-nonreferential-adverbial",
    },
  }),
]);

const INCORPORATION_ONLY_RECORDS = Object.freeze([
  makeRecord({ id: "44.9-nal", section: "44.9", family: "incorporated-adverbial", clauseKind: "nnc-absolutive", degree: "second-degree", domain: "location", surface: "nal", predicateStem: "nal", lexicalStatus: "compound-only", externalAllowed: false, incorporatedAllowed: true }),
  makeRecord({ id: "44.9-nepan", section: "44.9", family: "incorporated-adverbial", clauseKind: "nnc-absolutive", degree: "second-degree", domain: "manner", surface: "nepan", predicateStem: "ne-pan", incorporatedStem: "ne-pan", lexicalStatus: "compound-only", externalAllowed: false, incorporatedAllowed: true }),
]);

const SOURCE_RECORDS = deepFreeze([
  ...VNC_RECORDS,
  ...NNC_FOUNDATION_RECORDS,
  ...PARTICLE_LOOKING_RECORDS,
  ...OTHER_ABSOLUTIVE_RECORDS,
  ...PRETERIT_AGENTIVE_RECORDS,
  ...POSSESSIVE_RECORDS,
  ...INCORPORATION_ONLY_RECORDS,
  ...COMPARED_MANNER_SOURCE_RECORDS,
]);

const SOURCE_RECORD_BY_ID = new Map(SOURCE_RECORDS.map(record => [record.id, record]));
const SOURCE_RECORDS_BY_TYPED_SOURCE = new Map();

function normalizeTypedSourceStem(value = "") {
  return normalizeToken(value)
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .normalize("NFC")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]/gu, "");
}

for (const record of SOURCE_RECORDS) {
  for (const sourceForm of record.sourceForms) {
    const typedKey =
      `${record.clauseKind}:${normalizeTypedSourceStem(sourceForm)}`;
    const records = SOURCE_RECORDS_BY_TYPED_SOURCE.get(typedKey) || [];
    if (!records.some(candidate => candidate.id === record.id)) {
      records.push(record);
    }
    SOURCE_RECORDS_BY_TYPED_SOURCE.set(typedKey, records);
  }
}

function cloneRecord(record) {
  return deepClone(record);
}

function getAdverbialContextChoices(record) {
  return deepFreeze({
    precedingParticles: record.requiredPrecedingParticles.slice(),
    negativeParticles: record.allowedNegativeParticles.slice(),
    stressPartners: record.stressPartners.slice(),
    variants: record.variants.slice(),
    sentencePositions: record.id === "44.5-quen"
      ? ["initial", "noninitial"]
      : ["initial"],
    clauseTypes: record.id === "44.5-mo"
      ? ["assertion", "question", "subordinate"]
      : ["assertion"],
    negationScopes: record.allowedNegativeParticles.length
      ? ["adverbial-adjunct", "principal-vnc"]
      : [],
  });
}

function buildBlockedAdverbialPotentialFrame(
  blockReason,
  source = {},
  extra = {},
) {
  const frame = deepFreeze({
    kind: "classical-nahuatl-adverbial-potential-frame",
    version: VERSION,
    authorizationStatus: "blocked",
    blockReason,
    sourceConstituents: {
      stem: normalizeToken(source.stem),
      clauseKind: normalizeKey(source.clauseKind),
    },
    typedSourceAuthority: false,
    lexicalAuthorization: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
    lessonMetadataAuthority: false,
    ...extra,
  });
  ISSUED_ADVERBIAL_POTENTIAL_FRAMES.add(frame);
  return frame;
}

function hasAdverbialExactSourceResultField(source = {}) {
  return Boolean(
    source
    && typeof source === "object"
    && Object.prototype.hasOwnProperty.call(
      source,
      "canonicalSourceResult",
    )
  );
}

function getAdverbialExactSourceRawField(source = {}) {
  if (!source || typeof source !== "object") return "";
  return [
    "stem",
    "clauseKind",
    "preteritAgentiveFrame",
    "adverbialPotentialFrame",
    "sourceAnalysis",
    "licensedAdjunctionRelations",
  ].find(field => (
    Object.prototype.hasOwnProperty.call(source, field)
    && source[field] !== undefined
    && source[field] !== null
    && source[field] !== ""
  )) || "";
}

function getAdverbialExactNncSlotFrame(result = null, target = globalThis) {
  if (
    typeof target.isClassicalNahuatlIssuedNncSentenceSurfaceFrame
      === "function"
    && target.isClassicalNahuatlIssuedNncSentenceSurfaceFrame(result)
  ) {
    return result.sourceNncSlotFrame || null;
  }
  return [
    result?.typedSlotFrame,
    result?.nncSlotFrame,
    result?.canonicalResult?.nncSlotFrame,
    result?.canonicalResult?.typedSlotFrame,
    result?.resultFrame?.typedSlotFrame,
  ].find(frame => (
    typeof target.isClassicalNahuatlNncSlotFrame === "function"
    && target.isClassicalNahuatlNncSlotFrame(frame)
  )) || null;
}

function getOwnedNominalVncKernel(result = null, target = globalThis) {
  if (target.isClassicalNahuatlNominalConstructionResult?.(result) !== true
    || result.constructionKind !== 'nominal-embed-vnc') return null;
  const kernel = result.canonicalResult?.resultFrame;
  return kernel && isAdverbialExactVncResult(kernel,target)
    && getAdverbialExactVncSlotFrame(kernel,target)
    ? kernel : null;
}

function getAdverbialExactVncSlotFrame(result = null, target = globalThis) {
  const ownedKernel = getOwnedNominalVncKernel(result,target);
  const source = (
    typeof target.isClassicalNahuatlVncSentenceResultFrame === "function"
    && target.isClassicalNahuatlVncSentenceResultFrame(result)
  )
    ? result.canonicalSourceFrame || result.canonicalResultFrame || null
    : ownedKernel || result;
  return [
    source?.finalTypedVncSlotFrame,
    source?.targetTypedVncSlotFrame,
    source?.selectedMachineryFrame?.finalTypedVncSlotFrame,
    source?.selectedMachineryFrame?.targetTypedVncSlotFrame,
    source?.resultFrame?.finalTypedVncSlotFrame,
    source?.resultFrame?.targetTypedVncSlotFrame,
    source?.resultFrame?.selectedMachineryFrame?.finalTypedVncSlotFrame,
    source?.resultFrame?.selectedMachineryFrame?.targetTypedVncSlotFrame,
    source?.proofFrame?.conclusion?.finalTypedVncSlotFrame,
    source?.proofFrame?.conclusion?.finalBoundaryRealizationFrame
      ?.typedSlotFrame,
    source?.resultFrame?.proofFrame?.conclusion?.finalTypedVncSlotFrame,
    source?.resultFrame?.proofFrame?.conclusion
      ?.finalBoundaryRealizationFrame?.typedSlotFrame,
  ].find(frame => (
    typeof target.isClassicalNahuatlVncSlotFrame === "function"
    && target.isClassicalNahuatlVncSlotFrame(frame)
  )) || null;
}

function isAdverbialExactNncResult(result = null, target = globalThis) {
  if (target.isClassicalNahuatlNominalConstructionResult?.(result) === true
    && result.constructionKind === 'nominal-embed-vnc') return false;
  return Boolean([
    "isClassicalNahuatlOrdinaryNncResult",
    "isClassicalNahuatlPronominalNncResult",
    "isClassicalNahuatlNominalConstructionResult",
    "isClassicalNahuatlDeverbalNncGrammarFrame",
    "isClassicalNahuatlRelationalResult",
    "isClassicalNahuatlIssuedNncSentenceSurfaceFrame",
  ].some(name => (
    typeof target[name] === "function"
    && target[name](result) === true
  )) || isClassicalNahuatlAdverbialNuclearResult(result));
}

function isAdverbialExactVncResult(result = null, target = globalThis) {
  if (getOwnedNominalVncKernel(result,target)) return true;
  const exactApplicationCapture = (
    typeof target.captureClassicalGrammarApplicationResult === "function"
    && typeof target.isClassicalGrammarApplicationResultCapture
      === "function"
  )
    ? target.captureClassicalGrammarApplicationResult(
      result,
      "adverbial-exact-vnc-source",
    )
    : null;
  const applicationExact = Boolean(
    exactApplicationCapture
    && target.isClassicalGrammarApplicationResultCapture(
      exactApplicationCapture,
      "adverbial-exact-vnc-source",
    )
    && exactApplicationCapture.canonicalResult === result
  );
  return applicationExact || [
    "isClassicalNahuatlVncApplicationIssuedResultFrame",
    "isClassicalNahuatlOrderedVoiceVncApplicationFrame",
    "isClassicalNahuatlClosureFrame",
    "isClassicalNahuatlDenominalVncResultFrame",
    "isClassicalNahuatlVncSentenceResultFrame",
  ].some(name => (
    typeof target[name] === "function"
    && target[name](result) === true
  ));
}

function matchesDocumentedAdverbialNncSourceAnalysis(record, result, slotFrame, target) {
  const analysis = record.sourceAnalysis;
  if (analysis?.kind !== "ordinary-nnc-adverbial-source-analysis") return true;
  if (target?.isClassicalNahuatlOrdinaryNncResult?.(result) !== true
    || target?.isClassicalNahuatlOrdinaryNncSourceFrame?.(result.sourceFrame) !== true
    || result.typedSlotFrame !== slotFrame
    || result.sourceFrame.nounClass !== analysis.nounClass
    || slotFrame?.slots?.state?.arity !== "vacant"
    || slotFrame.slots.number.num1 !== analysis.num1) return false;
  return ![slotFrame.slots.subject.pers1, slotFrame.slots.subject.pers2,
    slotFrame.slots.number.num2].some(realizeTypedCarrier);
}

function getAdverbialExactSourceRecord({
  clauseKind = "",
  slotFrame = null,
  generalUseStemFrame = null,
  canonicalSourceResult = null,
  target = globalThis,
} = {}) {
  // Raw-entry aliases may omit quantity. An already-typed Result may not:
  // normalize Unicode composition, not the phonemic vowel distinction.
  const exactStemKey = value => normalizeToken(value).normalize("NFC")
    .toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");
  const exactStateKey = value => exactStemKey(normalizeToken(value).replaceAll("Ø", "0"));
  const selectedStem = generalUseStemFrame?.generalUseStem
    || slotFrame?.slots?.predicate?.stem || "";
  const predicateStem = exactStemKey(realizeCarrier(selectedStem));
  const exactStateSlots = (
    slotFrame?.slots?.state?.slots
    || slotFrame?.slots?.prePredicate
    || []
  ).filter(slot => (
    !slot?.kind || slot.kind === "vnc-internal-state"
  )).map(slot => exactStateKey(slot?.carrier || ""))
    .filter(Boolean);
  const matches = SOURCE_RECORDS.filter(record => (
    record.clauseKind === clauseKind
    && matchesDocumentedAdverbialNncSourceAnalysis(record, canonicalSourceResult, slotFrame, target)
    && (!generalUseStemFrame || record.allowedDegrees.includes("second-degree"))
    && exactStemKey(realizeCarrier(record.predicateStem))
      === predicateStem
    && (!record.predicateStem.includes("-")
      || normalizeStem(selectedStem).replaceAll("0", "Ø")
        === record.predicateStem.replaceAll("0", "Ø"))
    && (
      !record.stateSlots.length
      || record.stateSlots.map((carrier,index) => exactStateKey(index === 0
          && record.writtenBoundaryRule === "lengthen-initial-i" && carrier === "i" ? "ī" : carrier)).join("|")
        === exactStateSlots.join("|")
    )
  ));
  return matches.length === 1 ? matches[0] : null;
}

function buildOwnedPreteritAgentiveAdverbialUse(parent, slotFrame, productiveRecord, use, target) {
  const originalGeneralUseStem = parent.operationFrame.targetStems.generalUse;
  const capture = parent.sourceFrame.preteritVncCaptureFrame || null;
  let generalUseStem = originalGeneralUseStem;
  let initialContext = "preserve-owned-general-use";
  let reflexiveShape = parent.sourceFrame.sourceObjectPattern === "reflexive" ? "shuntline" : "none";
  if (reflexiveShape === "shuntline") {
    const slots = capture?.canonicalVncTypedSlotFrame?.slots;
    const projection = target.getClassicalNahuatlVncContinuationSourceConstituents?.(capture?.canonicalVncResult);
    const capturedReflexive = target.isClassicalNahuatlPreteritVncNominalizationCaptureFrame?.(capture) === true
      && target.isClassicalNahuatlVncSlotFrame?.(capture.canonicalVncTypedSlotFrame) === true
      && capture.sourceVoice === "active" && capture.sourceObjectPattern === "reflexive"
      && capture.sourceObjectRequests.length === 1 && capture.sourceObjectRequests[0].objectKind === "reflexive"
      && slots.predicate.stem === parent.sourceFrame.sourceStem && slots.predicate.tns === "0"
      && generalUseStem.startsWith(`ne-${slots.predicate.stem}-0-`);
    if (use === "lexicalized") {
      const object = slots?.prePredicate?.length === 1 ? slots.prePredicate[0] : null;
      if (!capturedReflexive || capture.sourceSubject !== "3sg"
        || object?.kind !== "dyadic-valence" || !object.va1 || !object.va2) return null;
      // Retain the actual captured mainline morphs and the already-owned
      // predicate/preterit/cā body. The record match below licenses this use.
      generalUseStem = `${object.va1}-${object.va2}-${generalUseStem.slice(3)}`;
      reflexiveShape = "retained-mainline";
    } else if (capturedReflexive && projection?.sourceStem?.replaceAll("-", "") === "ihmati"
      && projection.verbClass === "B" && slots.predicate.stem.replaceAll("-", "") === "ihmat") {
      // Andrews 35.12/44.7: ih-mati retains i after mainline contact but
      // has supportive i after shuntline ne. This is captured lexical contact,
      // not deletion of arbitrary real initial vowels or caller stem editing.
      generalUseStem = generalUseStem.replace(/^ne-i/u, "ne-");
      initialContext = "supportive-after-ne";
    }
  }
  let record = productiveRecord;
  if (use === "lexicalized") {
    record = getAdverbialExactSourceRecord({clauseKind: "nnc-absolutive", slotFrame,
      generalUseStemFrame: {generalUseStem}, canonicalSourceResult: parent, target});
    if (!record || record.family !== "preterit-agentive-nnc"
      || (reflexiveShape === "retained-mainline" && record.sourceKind !== "reflexive-mainline-lexicalized")) return null;
  } else if (generalUseStem !== originalGeneralUseStem) {
    record = deepFreeze({...productiveRecord, predicateStem: generalUseStem,
      surface: realizeCarrier(generalUseStem), incorporatedStem: generalUseStem});
  }
  const frame = deepFreeze({kind: "classical-nahuatl-preterit-agentive-adverbial-use-operation-frame",
    authorizationStatus: "authorized", use, canonicalSourceResult: parent,
    canonicalSourceCapture: capture, canonicalTypedNncSlotFrame: slotFrame,
    originalGeneralUseStem, generalUseStem, initialContext, reflexiveShape,
    lexicalEntryId: record.id, writtenBoundaryRule: record.writtenBoundaryRule,
    callerSuppliedAuthorityAccepted: false, formulaStringAuthority: false, surfaceStringAuthority: false});
  ISSUED_PRETERIT_AGENTIVE_ADVERBIAL_USES.add(frame);
  return {frame, record};
}

function resolveClassicalNahuatlAdverbialExactSource(
  source = {},
  target = globalThis,
) {
  const canonicalSourceResult = source?.canonicalSourceResult || null;
  const rawField = getAdverbialExactSourceRawField(source);
  let blockReason = "";
  let sourceUnitKind = "";
  let slotFrame = null;
  let record = null;
  let generalUseStemFrame = null;
  let obsoleteRootGeneralUseCaptureFrame = null;
  let productivePreteritAgentiveRecord = null;
  let lexicalUseOperationFrame = null;
  const useRequested = Object.prototype.hasOwnProperty.call(source, "preteritAgentiveUse");
  const preteritAgentiveUse = useRequested && typeof source.preteritAgentiveUse === "string"
    ? normalizeKey(source.preteritAgentiveUse) : useRequested ? "" : "productive";
  if (!["productive", "lexicalized"].includes(preteritAgentiveUse)) {
    blockReason = "preterit-agentive-adverbial-use-invalid";
  } else if (!hasAdverbialExactSourceResultField(source)) {
    blockReason = "canonical-source-result-required";
  } else if (rawField) {
    blockReason =
      "canonical-source-result-and-raw-source-are-mutually-exclusive";
  } else if (isAdverbialExactNncResult(canonicalSourceResult, target)) {
    sourceUnitKind = (
      typeof target.isClassicalNahuatlIssuedNncSentenceSurfaceFrame
        === "function"
      && target.isClassicalNahuatlIssuedNncSentenceSurfaceFrame(
        canonicalSourceResult,
      )
    ) ? "clause" : "nnc";
    slotFrame = getAdverbialExactNncSlotFrame(
      canonicalSourceResult,
      target,
    );
    const clauseKind = slotFrame?.slots?.state?.arity === "vacant"
      ? "nnc-absolutive"
      : "nnc-possessive";
    // The genuine agentive owner already derived its general-use stem. Reuse
    // that projection; an ordinary noun or a copied agentive cannot supply it.
    productivePreteritAgentiveRecord = clauseKind === "nnc-absolutive"
      && target.isClassicalNahuatlDeverbalNncGrammarFrame?.(canonicalSourceResult) === true
      ? buildProductivePreteritRecord(canonicalSourceResult)
      : null;
    if (productivePreteritAgentiveRecord) {
      const ownedUse = buildOwnedPreteritAgentiveAdverbialUse(canonicalSourceResult,
        slotFrame, productivePreteritAgentiveRecord, preteritAgentiveUse, target);
      if (!ownedUse) blockReason = "exact-preterit-agentive-source-has-no-licensed-lexical-adverbial-use";
      record = ownedUse?.record || null;
      lexicalUseOperationFrame = ownedUse?.frame || null;
      generalUseStemFrame = ownedUse ? deepFreeze({
        kind: "classical-nahuatl-owned-agentive-general-use-projection",
        authorizationStatus: "authorized",
        canonicalSourceResult,
        sourceFrame: canonicalSourceResult.sourceFrame,
        operationFrame: canonicalSourceResult.operationFrame,
        generalUseStem: ownedUse.frame.generalUseStem,
        lexicalUseOperationFrame,
        independentlyIssuedOrdinaryNnc: false,
        callerSuppliedAuthorityAccepted: false,
      }) : null;
    } else {
      record = getAdverbialExactSourceRecord({ clauseKind, slotFrame, canonicalSourceResult, target });
    }
    const nounSource = canonicalSourceResult?.sourceFrame;
    if (!record && clauseKind === "nnc-absolutive"
      && target.isClassicalNahuatlOrdinaryNncSourceFrame?.(nounSource)
      && nounSource.useShape === "truncated"
      && slotFrame?.slots?.predicate?.stem === nounSource.stem) {
      const generalUse = target.buildClassicalNahuatlNounstemSourceFrame?.(
        nounSource.stem,
        {
          nounClass: nounSource.nounClass,
          classSelectionAuthority: nounSource.lexicalSelectionAuthority,
          generalUseShape: nounSource.useShape,
          tlSubclass: nounSource.sourceClassShapeFrame.tlSubclass,
          ephemeralFinalVowel: nounSource.ephemeralFinalVowel,
          truncationRepair: nounSource.truncationRepair,
          state: "absolutive",
        },
      );
      if (generalUse?.authorizationStatus === "authorized") {
        record = getAdverbialExactSourceRecord({
          clauseKind, slotFrame, generalUseStemFrame: generalUse,
        });
        if (record) generalUseStemFrame = generalUse;
      }
    }
  } else if (isAdverbialExactVncResult(canonicalSourceResult, target)) {
    sourceUnitKind = (
      typeof target.isClassicalNahuatlVncSentenceResultFrame === "function"
      && target.isClassicalNahuatlVncSentenceResultFrame(
        canonicalSourceResult,
      )
    ) ? "clause" : "vnc";
    slotFrame = getAdverbialExactVncSlotFrame(
      canonicalSourceResult,
      target,
    );
    record = getAdverbialExactSourceRecord({
      clauseKind: "vnc",
      slotFrame,
    });
    if (!record) {
      const capture = target.captureClassicalNahuatlObsoleteRootVncGeneralUse?.(canonicalSourceResult);
      if (target.isClassicalNahuatlPreteritVncNominalizationCaptureFrame?.(capture) === true
        && capture.obsoleteRootPreteritAnalysis?.generalUseOnly === true) {
        obsoleteRootGeneralUseCaptureFrame = capture;
        generalUseStemFrame = deepFreeze({
          kind: "classical-nahuatl-obsolete-root-general-use-stem-projection",
          authorizationStatus: "authorized", generalUseStem: capture.obsoleteRootPreteritAnalysis.generalUseStem,
          canonicalSourceResult, canonicalCaptureFrame: capture,
          restrictedNounGenerated: false, callerSuppliedAuthorityAccepted: false,
        });
        const predicateStem = capture.obsoleteRootPreteritAnalysis.generalUseStem.replaceAll("0", "Ø");
        record = makeRecord({id: `productive-obsolete:${capture.obsoleteRootPreteritAnalysis.originalSourceStem}`,
          section: "40.9", family: "preterit-agentive-nnc", clauseKind: "nnc-absolutive",
          degree: "second-degree", domain: "manner", surface: realizeCarrier(predicateStem),
          predicateStem, num1: "⎕", sourceKind: "obsolete-root-plus-ya-preterit", lexicalStatus: "productive"});
      }
    }
  } else {
    blockReason = "exact-owner-issued-vnc-nnc-or-clause-result-required";
  }
  if (!blockReason && useRequested && !productivePreteritAgentiveRecord) {
    blockReason = "preterit-agentive-adverbial-use-requires-owned-agentive-parent";
  }
  if (!blockReason && !slotFrame) {
    blockReason = "exact-source-result-typed-nuclear-slots-unavailable";
  }
  if (!blockReason && !record) {
    blockReason = "exact-source-result-has-no-licensed-adverbial-potential";
  }
  if (!blockReason && record?.clauseKind === "vnc") {
    const canonicalCarrier = value => normalizeStem(value).replaceAll("Ø", "0");
    const slots = slotFrame.slots;
    if (canonicalCarrier(slots.predicate.tns) !== canonicalCarrier(record.valence)
      || canonicalCarrier(slots.number.num1) !== canonicalCarrier(record.num1)) {
      blockReason = "adverbial-source-tense-and-number-must-already-be-derived";
    }
  }
  const allowedScopes = record ? [
    ...(record.externalAllowed ? ["external-clause"] : []),
    ...(record.incorporatedAllowed ? ["incorporated-predicate"] : []),
  ] : [];
  const requiredChoiceIds = record ? [
    ...(record.allowedDegrees.length > 1 ? ["degree"] : []),
    ...(allowedScopes.length > 1 ? ["scope"] : []),
    ...(record.requiredPrecedingParticles.length > 1
      ? ["preceding-particle"]
      : []),
    ...(record.stressPartners.length ? ["stress-partner"] : []),
    ...(record.variants.length ? ["surface-variant"] : []),
    ...(record.id === "44.5-quen" ? ["sentence-position"] : []),
    ...(record.id === "44.5-mo" ? ["clause-type"] : []),
  ] : [];
  const frame = deepFreeze({
    kind: "classical-nahuatl-adverbial-exact-source-resolution",
    version: VERSION,
    authorizationStatus: blockReason ? "blocked" : "authorized",
    blockReason,
    sourceUnitKind,
    canonicalVncKernel: blockReason ? null : getOwnedNominalVncKernel(canonicalSourceResult,target),
    canonicalSourceResult: blockReason
      && !canonicalSourceResult?.authorizationStatus
      ? null
      : canonicalSourceResult,
    canonicalTypedSlotFrame: blockReason ? null : slotFrame,
    generalUseStemFrame: blockReason ? null : generalUseStemFrame,
    lexicalUseOperationFrame: blockReason ? null : lexicalUseOperationFrame,
    obsoleteRootGeneralUseCaptureFrame: blockReason ? null : obsoleteRootGeneralUseCaptureFrame,
    lexicalEntryId: blockReason ? "" : record.id,
    sourceConstituents: deepFreeze(blockReason ? {} : {
      stem: record.sourceForms[0],
      clauseKind: record.clauseKind,
    }),
    allowedDegrees: record ? record.allowedDegrees.slice() : [],
    allowedScopes,
    requiredChoiceIds,
    exactSourceResultIdentityPreserved: !blockReason,
    callerSuppliedSourceStringsAccepted: false,
    typedFrameAuthority: true,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
  ISSUED_ADVERBIAL_EXACT_SOURCE_RESOLUTIONS.add(frame);
  if (!blockReason && (obsoleteRootGeneralUseCaptureFrame || productivePreteritAgentiveRecord)) {
    EXACT_SOURCE_PRODUCTIVE_RECORDS.set(frame, record);
  }
  return frame;
}

function isClassicalNahuatlAdverbialExactSourceResolution(frame = null) {
  return Boolean(
    ISSUED_ADVERBIAL_EXACT_SOURCE_RESOLUTIONS.has(frame)
    && frame?.kind
      === "classical-nahuatl-adverbial-exact-source-resolution"
    && ["authorized", "blocked"].includes(frame.authorizationStatus)
    && frame.typedFrameAuthority === true
    && frame.formulaStringAuthority === false
    && frame.surfaceStringAuthority === false
    && (
      frame.authorizationStatus === "blocked"
        ? Boolean(frame.blockReason)
        : frame.exactSourceResultIdentityPreserved === true
          && Boolean(frame.canonicalSourceResult)
          && Boolean(frame.canonicalTypedSlotFrame)
          && Boolean(frame.lexicalEntryId)
          && (!frame.lexicalUseOperationFrame
            || (ISSUED_PRETERIT_AGENTIVE_ADVERBIAL_USES.has(frame.lexicalUseOperationFrame)
              && frame.lexicalUseOperationFrame.canonicalSourceResult === frame.canonicalSourceResult
              && frame.lexicalUseOperationFrame.canonicalTypedNncSlotFrame === frame.canonicalTypedSlotFrame))
    )
  );
}

function hasAttestedWholeAdverbialNncAnalysis(record) {
  const analysis = record.sourceUseAnalysis;
  return analysis?.kind === "attested-whole-adverbial-nnc"
    && analysis.sourceRank === "nnc" && analysis.state === "absolutive"
    && analysis.degree === "second-degree" && analysis.predicateAnalysis === "opaque"
    && analysis.derivationalAncestry === "unclaimed"
    && record.clauseKind === "nnc-absolutive" && record.formulaKind === "nnc";
}

// Lexical nuclei can be documented only in their adverbial shape. Their
// recorded slots do not establish an ordinary noun paradigm or verb class.
function buildClassicalNahuatlLexicalAdverbialPotentialFrame(source = {},target = globalThis) {
  const rejectedKey=Object.keys(source || {}).find(key=>key!=="stem");
  const stem=normalizeToken(source?.stem).normalize("NFC");
  const verbalRecords=SOURCE_RECORDS.filter(record=>record.family==="lexicalized-vnc"
    && record.clauseKind==="vnc" && record.formulaKind==="vnc"
    && record.allowedDegrees.length===1 && record.allowedDegrees[0]==="first-degree"
    && !record.sourceAnalysis
    && record.sourceForms.some(form=>form.normalize("NFC")===stem));
  if(!rejectedKey && verbalRecords.length===1){
    const record=verbalRecords[0];
    const typedSlotFrame=target.buildClassicalNahuatlVncSlotFrame?.({
      sourceFrameKind:"classical-nahuatl-lexical-adverbial-vnc-source-frame",
      sourceAuthorizationStatus:"authorized",stem:record.predicateStem,
      personDyad:{pers1:record.subjectSlots.pers1,pers2:record.subjectSlots.pers2},
      tenseFrame:{tns:record.valence},numberDyad:{num1:record.num1,num2:record.num2},
      ...(record.stateSlots.length===2 ? {objectFrame:{valenceArity:"dyadic",
        va1:record.stateSlots[0],va2:record.stateSlots[1]}}
        : record.stateSlots.length ? {internalStateFrame:buildAdverbialStateFrame(record.stateSlots)} : {}),
    });
    if(target.isClassicalNahuatlVncSlotFrame?.(typedSlotFrame)!==true)
      return buildBlockedAdverbialPotentialFrame("lexical-adverbial-typed-source-slots-unavailable",{});
    const lexicalVncSourceFrame=deepFreeze({kind:"classical-nahuatl-lexical-adverbial-vnc-source-frame",
      authorizationStatus:"authorized",lexicalEntryId:record.id,predicateStem:record.predicateStem,
      clauseKind:"vnc",subjectHasReferent:false,finiteSubjectAsserted:false,typedSlotFrame,
      ordinaryVncApplicationResult:null,ordinaryVncUseAuthorized:false,
      callerSuppliedAuthorityAccepted:false,formulaStringAuthority:false,surfaceStringAuthority:false});
    LEXICAL_ADVERBIAL_VNC_SOURCES.set(lexicalVncSourceFrame,record);
    return resolveClassicalNahuatlAdverbialPotential({stem,clauseKind:"vnc"},target,null,null,null,lexicalVncSourceFrame);
  }
  const records=SOURCE_RECORDS.filter(record=>
    (["particle-looking-nnc","other-absolutive-nnc","second-degree-nnc"].includes(record.family)
      || record.family === "preterit-agentive-nnc" && record.sourceKind === "irregular" && record.lexicalStatus === "irregular")
    && record.clauseKind==="nnc-absolutive"
    && record.allowedDegrees.length===1 && record.allowedDegrees[0]==="second-degree"
    // An affirmed whole NNC remains usable when its historical analysis is
    // conjectural or differs in quantity. Other derived recipes still require
    // their exact parents; caller-authored analyses never enter this gate.
    && (hasAttestedWholeAdverbialNncAnalysis(record) || (
      (["lexicalized","obligatorily-adverbial","obsolete-source"].includes(record.lexicalStatus)
        || record.family === "preterit-agentive-nnc" && record.sourceKind === "irregular" && record.lexicalStatus === "irregular"
        || record.id === "44.5-mo" && record.lexicalStatus === "conjectural-analysis")
      && !record.sourceAnalysis
      && !record.restrictions.some(restriction=>/patientive|pronominal|compound|uncertain/u.test(restriction))
    ))
    && record.sourceForms.some(form=>form.normalize("NFC")===stem));
  if(rejectedKey || records.length!==1)return buildBlockedAdverbialPotentialFrame(
    rejectedKey?"lexical-adverbial-source-only-accepts-stem":"documented-lexical-adverbial-nnc-source-required",{});
  const record=records[0];
  const typedSlotFrame=target.buildClassicalNahuatlNncSlotFrame?.({
    sourceFrameKind:"classical-nahuatl-lexical-adverbial-nnc-source-frame",
    sourceAuthorizationStatus:"authorized",stem:record.predicateStem,
    stateFrame:{authorizationStatus:"authorized",arity:"vacant",slots:[]},
    personFrame:{authorizationStatus:"authorized",pers1:record.subjectSlots.pers1,
      pers2:record.subjectSlots.pers2,subject:"adverbial"},
    numberFrame:{authorizationStatus:"authorized",num1:record.num1,num2:record.num2,
      subjectNumber:"adverbial"},
    appliedOperationIds:["nnc-clause-shell","nnc-absolutive-state"],
    resultOperationId:"nnc-absolutive-state",requestedOutputKind:"selected-absolutive-nnc-formula",nncFamily:"adverbial"});
  if(target.isClassicalNahuatlNncSlotFrame?.(typedSlotFrame)!==true)
    return buildBlockedAdverbialPotentialFrame("lexical-adverbial-typed-source-slots-unavailable",{});
  const lexicalNncSourceFrame=deepFreeze({kind:"classical-nahuatl-lexical-adverbial-nnc-source-frame",
    authorizationStatus:"authorized",lexicalEntryId:record.id,predicateStem:record.predicateStem,
    clauseKind:record.clauseKind,subjectHasReferent:false,typedSlotFrame,
    ...(record.initialIAnalysis?{initialIAnalysis:record.initialIAnalysis}:{}),
    ...(record.sourceUseAnalysis ? {sourceUseAnalysis:record.sourceUseAnalysis,derivationalAncestryAsserted:false} : {}),
    ordinaryNounParadigmAuthorized:false,callerSuppliedAuthorityAccepted:false,
    formulaStringAuthority:false,surfaceStringAuthority:false});
  LEXICAL_ADVERBIAL_NNC_SOURCES.set(lexicalNncSourceFrame,record);
  return resolveClassicalNahuatlAdverbialPotential({stem,clauseKind:record.clauseKind},target,null,lexicalNncSourceFrame);
}

function buildClassicalNahuatlPrimitiveAdverbialPotentialFrame(source = {}, target = globalThis) {
  const allowed = new Set(["predicateKind", "sourceStem", "verbClass", "sourceValence", "tense", "sourceInitialISelection", "possessor"]);
  const kind = normalizeKey(source.predicateKind);
  const stem = normalizeStem(source.sourceStem);
  const verbClass = normalizeToken(source.verbClass).toUpperCase();
  const blocked = reason => buildBlockedAdverbialPotentialFrame(reason, {});
  if (Object.keys(source).some(key => !allowed.has(key)) || !stem
    || !["A", "B", "C", "D"].includes(verbClass)
    || source.sourceValence !== "intransitive"
    || !["vnc", "preterit-agentive", "active-action"].includes(kind)) {
    return blocked("complete-primitive-adverbial-predicate-source-required");
  }
  let record = null, typedSlotFrame = null, morphology = null, surfaceFrame = null, nominal = null;
  const coordinate = kind === "vnc" ? {subject:"3sg",role:"morphology-only-unchanged-first-degree-shape"} : null;
  if (kind === "vnc") {
    if (source.possessor || !source.tense) return blocked("complete-primitive-adverbial-vnc-source-required");
    morphology = target.buildClassicalNahuatlVerbstemClassFrame?.(stem, {
      verbClass,perfectiveClass:verbClass,valence:"intransitive",transitivity:"intransitive",
      requestedSourceValence:"intransitive",objectKind:"none",tenseMode:"verbo",
      subject:"3sg",mood:"indicative",tense:source.tense,
      ...(source.sourceInitialISelection ? {initialVowelKind:source.sourceInitialISelection} : {}),
    });
    const slots = getAdverbialExactVncSlotFrame(morphology, target)?.slots;
    if (morphology?.authorizationStatus !== "authorized" || morphology.classId !== verbClass || !slots) return blocked("canonical-adverbial-vnc-predicate-morphology-required");
    typedSlotFrame = target.buildClassicalNahuatlVncSlotFrame?.({
      sourceFrameKind:"classical-nahuatl-primitive-adverbial-source-frame",sourceAuthorizationStatus:"authorized",
      stem:slots.predicate.stem,personDyad:{pers1:"0",pers2:"0",subject:"adverbial"},
      tenseFrame:{tns:slots.predicate.tns},numberDyad:{num1:slots.number.num1,num2:slots.number.num2},
    });
    record = getAdverbialExactSourceRecord({clauseKind:"vnc",slotFrame:typedSlotFrame});
    if (!record) {
      const eligible = SOURCE_RECORDS.filter(candidate => candidate.family === "lexicalized-vnc"
        && normalizeStem(candidate.predicateStem) === stem
        && realizeCarrier(candidate.predicateStem) === realizeCarrier(slots.predicate.stem));
      if (eligible.length === 1) record = eligible[0];
    }
    surfaceFrame = target.buildClassicalNahuatlVncFiniteSurfaceFrame?.(morphology);
    const sameCarrier = (left, right) => normalizeStem(left).replaceAll("Ø", "0")
      === normalizeStem(right).replaceAll("Ø", "0");
    if (!record || surfaceFrame?.authorizationStatus !== "authorized"
      || !sameCarrier(slots.predicate.tns,record.valence)
      || !sameCarrier(slots.number.num1,record.num1)) {
      return blocked("documented-adverbial-vnc-predicate-and-tense-required");
    }
  } else {
    if (source.tense) return blocked("nominal-adverbial-source-does-not-take-finite-tense-choice");
    nominal = target.buildClassicalNahuatlAdverbialNominalPredicateSourceFrame?.({
      sourceStem:stem,verbClass,sourceValence:"intransitive",nominalizationKind:kind,
      ...(source.sourceInitialISelection !== undefined ? {sourceInitialISelection:source.sourceInitialISelection} : {}),
      ...(source.possessor !== undefined ? {possessor:source.possessor} : {}),
    });
    if (target.isClassicalNahuatlAdverbialNominalPredicateSourceFrame?.(nominal) !== true) {
      return blocked(nominal?.blockReason || "canonical-adverbial-nominal-predicate-source-required");
    }
    const stateFrame = kind === "active-action"
      ? target.buildClassicalNahuatlPossessiveStateFrame?.({possessor:nominal.possessor,
        subject:"3common",stem:nominal.predicateStem,nounstemRelationKind:"nonrelational"})
      : buildAdverbialStateFrame([]);
    typedSlotFrame = target.buildClassicalNahuatlNncSlotFrame?.({
      sourceFrameKind:"classical-nahuatl-primitive-adverbial-source-frame",sourceAuthorizationStatus:"authorized",
      stem:nominal.predicateStem,stateFrame,
      personFrame:{authorizationStatus:"authorized",pers1:"Ø",pers2:"Ø",subject:"adverbial"},
      numberFrame:{authorizationStatus:"authorized",num1:kind === "preterit-agentive" ? "⎕" : "Ø",num2:"Ø",subjectNumber:"adverbial"},
      appliedOperationIds:["nnc-clause-shell",kind === "active-action" ? "nnc-possessive-state" : "nnc-absolutive-state"],
      resultOperationId:kind === "active-action" ? "nnc-possessive-state" : "nnc-absolutive-state",
      requestedOutputKind:"selected-nnc-word",nncFamily:"adverbial",
    });
    record = kind === "preterit-agentive" ? buildProductivePreteritRecord(nominal)
      : getAdverbialExactSourceRecord({clauseKind:"nnc-possessive",slotFrame:typedSlotFrame});
    if (!record) return blocked("licensed-adverbial-nominal-predicate-source-required");
  }
  if (!(record.clauseKind === "vnc" ? target.isClassicalNahuatlVncSlotFrame?.(typedSlotFrame)
    : target.isClassicalNahuatlNncSlotFrame?.(typedSlotFrame))) return blocked("primitive-adverbial-typed-source-slots-required");
  const primitive = deepFreeze({kind:"classical-nahuatl-primitive-adverbial-source-frame",
    authorizationStatus:"authorized",predicateKind:kind,lexicalEntryId:record.id,
    subjectHasReferent:false,subjectDomain:record.domain,finiteSubjectAsserted:false,
    ordinaryVncApplicationResult:null,ordinaryNncResult:null,predicateMorphologyCoordinate:coordinate,
    canonicalPredicateMorphologyFrame:morphology,canonicalVncFiniteSurfaceFrame:surfaceFrame,
    nominalPredicateSourceFrame:nominal,typedSlotFrame,
    callerSuppliedAuthorityAccepted:false,formulaStringAuthority:false,surfaceStringAuthority:false});
  PRIMITIVE_ADVERBIAL_SOURCES.set(primitive,record);
  return resolveClassicalNahuatlAdverbialPotential({stem,clauseKind:record.clauseKind},target,null,null,primitive);
}

function resolveClassicalNahuatlAdverbialPotential(
  source = {},
  target = globalThis,
  exactSourceResolution = null,
  lexicalNncSourceFrame = null,
  primitiveAdverbialSourceFrame = null,
  lexicalVncSourceFrame = null,
) {
  if (
    hasAdverbialExactSourceResultField(source)
    && !exactSourceResolution
  ) {
    const resolution = resolveClassicalNahuatlAdverbialExactSource(
      source,
      target,
    );
    if (resolution.authorizationStatus !== "authorized") {
      return buildBlockedAdverbialPotentialFrame(
        resolution.blockReason,
        {},
        {
          exactSourceResolution: resolution,
          canonicalSourceResult:
            resolution.canonicalSourceResult || null,
          exactSourceResultIdentityPreserved: false,
        },
      );
    }
    return resolveClassicalNahuatlAdverbialPotential(
      resolution.sourceConstituents,
      target,
      resolution,
    );
  }
  const preteritAgentiveFrame =
    source?.preteritAgentiveFrame || null;
  const sourceForAuthorityScan = {
    ...source,
  };
  delete sourceForAuthorityScan.preteritAgentiveFrame;
  const hostilePath = findHostileAuthorityPath(sourceForAuthorityScan);
  if (hostilePath) {
    return buildBlockedAdverbialPotentialFrame(
      `caller-supplied-derived-authority-rejected:${hostilePath}`,
      source,
    );
  }
  const retiredKey = RETIRED_PRODUCTIVE_SOURCE_KEYS.find(
    key => Object.prototype.hasOwnProperty.call(source, key)
  );
  if (retiredKey) {
    return buildBlockedAdverbialPotentialFrame(
      `retired-caller-authored-productive-source-rejected:${retiredKey}`,
      source,
    );
  }
  if (
    preteritAgentiveFrame
    && target.isClassicalNahuatlDeverbalNncGrammarFrame?.(
      preteritAgentiveFrame
    ) !== true
  ) {
    return buildBlockedAdverbialPotentialFrame(
      "owner-issued-preterit-agentive-prerequisite-required",
      source,
    );
  }
  const productiveRecord = preteritAgentiveFrame
    ? buildProductivePreteritRecord(preteritAgentiveFrame)
    : null;
  if (
    preteritAgentiveFrame
    && !productiveRecord
  ) {
    return buildBlockedAdverbialPotentialFrame(
      "licensed-preterit-agentive-general-use-prerequisite-required",
      source,
    );
  }
  if (productiveRecord && !exactSourceResolution) {
    // The compatibility prerequisite needs the same owned general-use
    // projection as canonicalSourceResult, not its restricted NNC stem.
    exactSourceResolution = resolveClassicalNahuatlAdverbialExactSource(
      { canonicalSourceResult: preteritAgentiveFrame,
        ...(Object.prototype.hasOwnProperty.call(source, "preteritAgentiveUse")
          ? {preteritAgentiveUse: source.preteritAgentiveUse} : {}) },
      target,
    );
    if (exactSourceResolution.authorizationStatus !== "authorized") {
      return buildBlockedAdverbialPotentialFrame(
        exactSourceResolution.blockReason,
        source,
        { exactSourceResolution },
      );
    }
  }
  const clauseKind = normalizeKey(source.clauseKind);
  if (
    !productiveRecord
    && !LCM_AXES.sourceClauseKinds.includes(clauseKind)
  ) {
    return buildBlockedAdverbialPotentialFrame(
      "canonical-vnc-or-nnc-source-clause-kind-required",
      source,
    );
  }
  const sourceStem = normalizeToken(source.stem);
  const lexicalSourceRecord=LEXICAL_ADVERBIAL_NNC_SOURCES.get(lexicalNncSourceFrame);
  const lexicalVncSourceRecord=LEXICAL_ADVERBIAL_VNC_SOURCES.get(lexicalVncSourceFrame);
  const primitiveSourceRecord=PRIMITIVE_ADVERBIAL_SOURCES.get(primitiveAdverbialSourceFrame);
  if (!exactSourceResolution && !productiveRecord && !lexicalSourceRecord && !lexicalVncSourceRecord && !primitiveSourceRecord) {
    return buildBlockedAdverbialPotentialFrame(
      "Generate the underlying VNC or NNC first, then Continue this exact Result and choose NNC adverbial. Lexical lookup cannot perform its grammatical operations.",
      source,
    );
  }
  const typedKey = `${clauseKind}:${normalizeTypedSourceStem(sourceStem)}`;
  const lexicalMatches = SOURCE_RECORDS_BY_TYPED_SOURCE.get(typedKey) || [];
  const record = primitiveSourceRecord || lexicalSourceRecord || lexicalVncSourceRecord
    || EXACT_SOURCE_PRODUCTIVE_RECORDS.get(exactSourceResolution) || productiveRecord
    || (lexicalMatches.length === 1
      ? lexicalMatches[0]
      : null);
  if (!record) {
    return buildBlockedAdverbialPotentialFrame(
      lexicalMatches.length > 1
        ? "typed-source-is-lexically-ambiguous"
        : "typed-source-has-no-licensed-adverbial-potential",
      source,
    );
  }
  const allowedScopes = [
    ...(record.externalAllowed ? ["external-clause"] : []),
    ...(record.incorporatedAllowed ? ["incorporated-predicate"] : []),
  ];
  const potentialFrame = deepFreeze({
    kind: "classical-nahuatl-adverbial-potential-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    blockReason: "",
    sourceConstituents: {
      stem: productiveRecord
        ? preteritAgentiveFrame.sourceFrame.sourceStem
        : sourceStem || record.sourceForms[0] || "",
      clauseKind: productiveRecord ? "vnc" : record.clauseKind,
      ...(productiveRecord
        ? {
          sourceStage:
            preteritAgentiveFrame.sourceFrame.sourceStage,
          sourceVoice:
            preteritAgentiveFrame.sourceFrame.sourceVoice,
          sourceValence:
            preteritAgentiveFrame.sourceFrame.sourceValence,
          sourceObjectPattern:
            preteritAgentiveFrame.sourceFrame.sourceObjectPattern,
        }
        : {}),
    },
    lexicalEntryId: record.id,
    allowedDegrees: record.allowedDegrees.slice(),
    allowedScopes,
    contextChoices: getAdverbialContextChoices(record),
    inheritedContext: (() => {
      const exact = exactSourceResolution?.canonicalSourceResult;
      const sentence = exact?.sentenceFrame || exact;
      if (!target.isClassicalNahuatlIssuedNncSentenceSurfaceFrame?.(sentence)
        || sentence.polarity !== "negative") return {};
      const stack = sentence.sentencePrefixalStack || [];
      // Read an issued grammatical prefix slot, never the written surface.
      const negativeParticle = stack.length === 1
        ? String(stack[0]).replace(/#$/u, "") : "";
      return negativeParticle ? { negativeParticle } : {};
    })(),
    lexicalFacts: {
      family: record.family,
      semanticDomain: record.domain,
      lexicalStatus: record.lexicalStatus,
      sourceKind: record.sourceKind,
      restrictions: record.restrictions.slice(),
      licensedUses: record.licensedUses.slice(),
      useEvidence: record.useEvidence.slice(),
    },
    prerequisiteOperation: productiveRecord
      ? {
        operationId:
          preteritAgentiveFrame.operationFrame.operationId,
        constructionKind:
          preteritAgentiveFrame.constructionKind,
        ownerValidated: true,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
      }
      : null,
    genuineChoiceAxes: [
      ...(record.allowedDegrees.length > 1 ? ["degree"] : []),
      ...(allowedScopes.length > 1 ? ["scope"] : []),
      ...(record.requiredPrecedingParticles.length > 1
        ? ["preceding-particle"]
        : []),
      ...(record.allowedNegativeParticles.length
        ? ["negative-particle"]
        : []),
      ...(record.stressPartners.length ? ["stress-partner"] : []),
      ...(record.variants.length ? ["surface-variant"] : []),
      ...(record.id === "44.5-quen" ? ["sentence-position"] : []),
      ...(record.id === "44.5-mo" ? ["clause-type"] : []),
      ...(record.allowedNegativeParticles.length ? ["negation-scope"] : []),
    ],
    sourceInputMode: primitiveSourceRecord
      ? "owner-issued-primitive-adverbial-predicate-source"
      : lexicalVncSourceRecord
      ? "owner-issued-lexical-adverbial-vnc-source"
      : lexicalSourceRecord
      ? "owner-issued-lexical-adverbial-nnc-source"
      : exactSourceResolution
      ? "exact-owner-issued-vnc-nnc-or-clause-result"
      : "typed-source-fields",
    lexicalNncSourceFrame,
    ...(lexicalVncSourceFrame?{lexicalVncSourceFrame}:{}),
    primitiveAdverbialSourceFrame,
    exactSourceResolution,
    canonicalSourceResult:
      exactSourceResolution?.canonicalSourceResult || preteritAgentiveFrame || null,
    canonicalTypedSlotFrame:
      primitiveAdverbialSourceFrame?.typedSlotFrame || lexicalNncSourceFrame?.typedSlotFrame || lexicalVncSourceFrame?.typedSlotFrame || exactSourceResolution?.canonicalTypedSlotFrame
        || getAdverbialExactNncSlotFrame(preteritAgentiveFrame, target),
    exactSourceResultIdentityPreserved: Boolean(exactSourceResolution || preteritAgentiveFrame),
    typedSourceAuthority: true,
    lexicalAuthorization: true,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
    lessonMetadataAuthority: false,
  });
  ISSUED_ADVERBIAL_POTENTIAL_FRAMES.add(potentialFrame);
  ADVERBIAL_POTENTIAL_RECORDS.set(potentialFrame, record);
  return potentialFrame;
}

function isClassicalNahuatlAdverbialPotentialFrame(frame = null) {
  const issuedFrame = Boolean(
    ISSUED_ADVERBIAL_POTENTIAL_FRAMES.has(frame)
    && frame?.kind === "classical-nahuatl-adverbial-potential-frame"
    && frame.version === VERSION
    && ["authorized", "blocked"].includes(frame.authorizationStatus)
    && frame.formulaStringAuthority === false
    && frame.surfaceStringAuthority === false
  );
  if (!issuedFrame) return false;
  if (frame.authorizationStatus === "blocked") {
    return Boolean(
      frame.blockReason
      && frame.typedSourceAuthority === false
      && frame.lexicalAuthorization === false
    );
  }
  if(frame.sourceInputMode==="owner-issued-lexical-adverbial-nnc-source"
    && (LEXICAL_ADVERBIAL_NNC_SOURCES.get(frame.lexicalNncSourceFrame)!==ADVERBIAL_POTENTIAL_RECORDS.get(frame)
      || frame.canonicalTypedSlotFrame!==frame.lexicalNncSourceFrame?.typedSlotFrame))return false;
  if(frame.sourceInputMode==="owner-issued-lexical-adverbial-vnc-source"
    && (LEXICAL_ADVERBIAL_VNC_SOURCES.get(frame.lexicalVncSourceFrame)!==ADVERBIAL_POTENTIAL_RECORDS.get(frame)
      || frame.canonicalTypedSlotFrame!==frame.lexicalVncSourceFrame?.typedSlotFrame
      || frame.canonicalSourceResult!==null))return false;
  if(frame.sourceInputMode==="owner-issued-primitive-adverbial-predicate-source"
    && (PRIMITIVE_ADVERBIAL_SOURCES.get(frame.primitiveAdverbialSourceFrame)!==ADVERBIAL_POTENTIAL_RECORDS.get(frame)
      || frame.canonicalTypedSlotFrame!==frame.primitiveAdverbialSourceFrame?.typedSlotFrame
      || frame.canonicalSourceResult!==null))return false;
  return Boolean(
    ADVERBIAL_POTENTIAL_RECORDS.has(frame)
    && frame.typedSourceAuthority === true
    && frame.lexicalAuthorization === true
    && (
      frame.sourceInputMode !==
        "exact-owner-issued-vnc-nnc-or-clause-result"
      || (
        isClassicalNahuatlAdverbialExactSourceResolution(
          frame.exactSourceResolution,
        )
        && frame.exactSourceResolution.authorizationStatus === "authorized"
        && frame.canonicalSourceResult
          === frame.exactSourceResolution.canonicalSourceResult
        && frame.canonicalTypedSlotFrame
          === frame.exactSourceResolution.canonicalTypedSlotFrame
        && frame.exactSourceResultIdentityPreserved === true
      )
    )
  );
}

function getClassicalNahuatlLcm() {
  const familyCounts = Object.fromEntries(LCM_AXES.constructionFamilies.map(family => [
    family,
    SOURCE_RECORDS.filter(record => record.family === family).length,
  ]));
  const frame = deepFreeze({
    kind: "classical-nahuatl-adverbial-nuclear-lcm",
    version: VERSION,
    gcdIdentity: GCD_IDENTITY,
    axes: deepClone(LCM_AXES),
    sourceRecordCount: SOURCE_RECORDS.length,
    familyCounts,
    completeLicensedInventory: true,
    sourceDocument: "ANDREWS_TRANSCRIPTION_CANVAS.md",
    sourceSpansExcludedFromRuntime: true,
    lessonMetadataAuthorizesOutput: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
  ISSUED_ADVERBIAL_LCM_FRAMES.add(frame);
  return frame;
}

function isClassicalNahuatlLcm(frame = null) {
  return Boolean(
    ISSUED_ADVERBIAL_LCM_FRAMES.has(frame)
    && frame?.kind === "classical-nahuatl-adverbial-nuclear-lcm"
    && frame.completeLicensedInventory === true
    && frame.lessonMetadataAuthorizesOutput === false
  );
}

function listClassicalNahuatlLesson44SourceRecords(filters = {}) {
  const family = normalizeKey(filters.family);
  const clauseKind = normalizeKey(filters.clauseKind);
  const domain = normalizeKey(filters.domain);
  const scope = normalizeKey(filters.scope);
  return SOURCE_RECORDS
    .filter(record => !family || record.family === family)
    .filter(record => !clauseKind || record.clauseKind === clauseKind)
    .filter(record => !domain || record.domain === domain)
    .filter(record => scope !== "external-clause" || record.externalAllowed)
    .filter(record => scope !== "incorporated-predicate" || record.incorporatedAllowed)
    .map(cloneRecord);
}

function buildBlockedFrame(blockReason, request = {}, extra = {}) {
  const frame = deepFreeze({
    kind: "classical-nahuatl-adverbial-nuclear-result",
    version: VERSION,
    authorizationStatus: "blocked",
    blockReason,
    gcdIdentity: GCD_IDENTITY,
    typedFrameAuthority: true,
    callerSuppliedAuthorityAccepted: false,
    lessonMetadataAuthorizesOutput: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
    ...extra,
  });
  ISSUED_ADVERBIAL_FRAMES.add(frame);
  return frame;
}

function realizeTypedCarrier(value = "") {
  return normalizeStem(value)
    .split("-")
    .filter(part => part && !["0", "Ø", "⎕"].includes(part))
    .join("");
}

function realizeAdverbialWrittenBoundary(
  carrier = "",
  writtenBoundaryRule = "identity",
  sourcePreservingCarrier = "",
) {
  const source = normalizeToken(carrier);
  if (writtenBoundaryRule === "source-preserving") {
    return normalizeToken(sourcePreservingCarrier) || source;
  }
  if (writtenBoundaryRule === "oa-to-ua") {
    return source.replace(/yohoa(?=l$)/u, "yohua");
  }
  if (writtenBoundaryRule === "shorten-final-a") {
    return source.replace(/ā$/u, "a");
  }
  if (writtenBoundaryRule === "lengthen-initial-i") {
    return source.replace(/^i/u, "ī");
  }
  return source;
}

function buildAdverbialStateFrame(stateSlots = []) {
  const slots = stateSlots.map((carrier, index) => ({
    role: stateSlots.length === 1 ? "st" : `st${index + 1}`,
    carrier,
  }));
  return {
    authorizationStatus: "authorized",
    arity: stateSlots.length === 0
      ? "vacant"
      : stateSlots.length === 1
        ? "monadic"
        : "dyadic",
    slots,
  };
}

function buildTypedAdverbialNuclearProjection(
  record,
  subjectOperationFrame,
  target = globalThis,
  canonicalTypedSlotFrame = null,
  canonicalSourceResult = null,
  generalUseStemFrame = null,
  primitiveAdverbialSourceFrame = null,
  lexicalVncSourceFrame = null,
) {
  if (subjectOperationFrame.subjectDiscarded) {
    return {
      authorizationStatus: "not-applicable",
      blockReason: "",
      typedSlotFrame: null,
      formulaRealization: "",
      wordSurface: "",
    };
  }
  if (!canonicalTypedSlotFrame) {
    return { authorizationStatus: "blocked", blockReason: "derived-nuclear-slot-frame-required" };
  }
  const sourceSlots = canonicalTypedSlotFrame.slots;
  const subjectSlots = sourceSlots.subject;
  const stateFrame = { authorizationStatus: "authorized", ...sourceSlots.state };
  if (record.formulaKind === "vnc") {
    if(LEXICAL_ADVERBIAL_VNC_SOURCES.get(lexicalVncSourceFrame)===record){
      if(lexicalVncSourceFrame.typedSlotFrame!==canonicalTypedSlotFrame)
        return {authorizationStatus:"blocked",blockReason:"lexical-adverbial-exact-vnc-slots-required"};
      const surfaceFrame=target.realizeClassicalNahuatlVncSlotFrameAtFinalBoundary?.({vncSlotFrame:canonicalTypedSlotFrame});
      if(surfaceFrame?.authorizationStatus!=="authorized")
        return {authorizationStatus:"blocked",blockReason:"lexical-adverbial-vnc-boundary-required"};
      const slots=surfaceFrame.typedSlotFrame.slots;
      const wordSurface=[slots.subject.pers1,slots.subject.pers2,
        ...slots.prePredicate.map(slot=>slot.carrier),slots.predicate.stem,
        slots.predicate.tns,slots.number.num1,slots.number.num2].map(realizeTypedCarrier).join("");
      return {authorizationStatus:"authorized",blockReason:"",typedSlotFrame:canonicalTypedSlotFrame,
        surfaceFrame,formulaRealization:target.renderClassicalNahuatlVncSlotFrameFormula(canonicalTypedSlotFrame),
        wordSurface:realizeAdverbialWrittenBoundary(wordSurface,record.writtenBoundaryRule)};
    }
    const nuclear = getOwnedNominalVncKernel(canonicalSourceResult, target)
      || canonicalSourceResult?.canonicalSourceFrame
      || canonicalSourceResult?.canonicalResultFrame || canonicalSourceResult;
    const result = nuclear?.resultFrame || nuclear;
    const surfaceFrame = PRIMITIVE_ADVERBIAL_SOURCES.has(primitiveAdverbialSourceFrame)
      ? primitiveAdverbialSourceFrame.canonicalVncFiniteSurfaceFrame
      : result?.finiteSurfaceFrame
      || target.buildClassicalNahuatlVncFiniteSurfaceFrame?.(result?.selectedMachineryFrame);
    if (surfaceFrame?.authorizationStatus !== "authorized") {
      return { authorizationStatus: "blocked", blockReason: "derived-vnc-boundary-result-required" };
    }
    return {
      authorizationStatus: "authorized",
      blockReason: "",
      typedSlotFrame: canonicalTypedSlotFrame,
      surfaceFrame,
      formulaRealization: target.renderClassicalNahuatlVncSlotFrameFormula(canonicalTypedSlotFrame),
      wordSurface: surfaceFrame.wordRealization,
    };
  }
  if (
    typeof target.buildClassicalNahuatlNncSlotFrame !== "function"
    || typeof target.renderClassicalNahuatlNncSlotFrameFormula
      !== "function"
    || typeof target.buildClassicalNahuatlNncSentenceSurfaceFrame
      !== "function"
    || typeof target.isClassicalNahuatlNncSlotFrame !== "function"
  ) {
    return {
      authorizationStatus: "blocked",
      blockReason: "canonical-typed-nnc-slot-evaluator-unavailable",
    };
  }
  const typedSlotFrame = subjectOperationFrame.degree === "first-degree"
      && record.sourceAnalysis?.kind !== "ordinary-nnc-adverbial-source-analysis"
    ? canonicalTypedSlotFrame
    : target.buildClassicalNahuatlNncSlotFrame({
    sourceFrameKind: "classical-nahuatl-adverbial-potential-frame",
    sourceAuthorizationStatus: "authorized",
    stem: generalUseStemFrame?.generalUseStem || sourceSlots.predicate.stem,
    stateFrame,
    personFrame: {
      authorizationStatus: "authorized",
      pers1: subjectSlots.pers1,
      pers2: subjectSlots.pers2,
      subject: "adverbial",
    },
    numberFrame: {
      authorizationStatus: "authorized",
      num1: subjectOperationFrame.resultNum1,
      num2: sourceSlots.number.num2,
      subjectNumber: "adverbial",
    },
    appliedOperationIds: [
      "nnc-clause-shell",
      record.clauseKind === "nnc-possessive"
        ? "nnc-possessive-state"
        : "nnc-absolutive-state",
    ],
    resultOperationId: record.clauseKind === "nnc-possessive"
      ? "nnc-possessive-state"
      : "nnc-absolutive-state",
    requestedOutputKind: record.clauseKind === "nnc-possessive"
      ? "selected-possessive-nnc-formula"
      : "selected-absolutive-nnc-formula",
    nncFamily: "adverbial",
  });
  if (!target.isClassicalNahuatlNncSlotFrame(typedSlotFrame)) {
    return {
      authorizationStatus: "blocked",
      blockReason: "canonical-typed-nnc-slot-frame-blocked",
      typedSlotFrame,
    };
  }
  const surfaceFrame = target.buildClassicalNahuatlNncSentenceSurfaceFrame(
    typedSlotFrame,
    { sentenceType: "assertion", polarity: "positive" },
  );
  if (surfaceFrame?.authorizationStatus !== "authorized") {
    return {
      authorizationStatus: "blocked",
      blockReason:
        surfaceFrame?.blockReason
        || "canonical-typed-nnc-boundary-realization-blocked",
      typedSlotFrame,
      surfaceFrame,
    };
  }
  return {
    authorizationStatus: "authorized",
    blockReason: "",
    typedSlotFrame,
    surfaceFrame,
    formulaRealization:
      target.renderClassicalNahuatlNncSlotFrameFormula(typedSlotFrame),
    wordSurface: realizeAdverbialWrittenBoundary(
      surfaceFrame.canonicalNuclearSurface,
      record.writtenBoundaryRule,
      surfaceFrame.canonicalNuclearSurfaceBeforeBoundary,
    ),
  };
}

function buildSubjectOperationFrame(record, degree, scope, sourceSlots = null) {
  const incorporated = scope === "incorporated-predicate";
  const fusedAdjunctorShapePreserved = degree === "second-degree"
    && record.restrictions.includes("fused-in-adjunctor")
    && sourceSlots?.number?.num1 === record.num1;
  return deepFreeze({
    kind: "classical-nahuatl-adverbialized-subject-operation-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    sourceClauseKind: record.clauseKind,
    subjectHasReferent: false,
    formalSubjectId: "3sg",
    subjectDomain: record.domain,
    degree,
    operationId: incorporated
      ? "adverbial-incorporation-discards-subject"
      : degree === "second-degree"
        ? "adverbial-second-degree-sounded-num1-to-silent"
        : "adverbial-first-degree-shape-preserved",
    sourceSubjectSlots: cloneRecord(sourceSlots?.subject || {}),
    resultSubjectSlots: incorporated ? null : cloneRecord(sourceSlots?.subject || {}),
    sourceNum1: sourceSlots?.number?.num1 || "",
    resultNum1: incorporated ? "" : degree === "second-degree" ? record.num1 : sourceSlots?.number?.num1 || "",
    subjectNumberOperation: fusedAdjunctorShapePreserved ? "fused-adjunctor-shape-preserved"
      : degree === "second-degree" ? "sounded-num1-to-silent" : "shape-preserved",
    subjectDiscarded: incorporated,
    firstDegreeShapePreserved: !incorporated && degree === "first-degree",
    secondDegreeNum1Silent: !incorporated && degree === "second-degree" && record.num1 === "⎕",
    typedFrameAuthority: true,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

function buildSelectedLcmProjection(record, subjectOperationFrame) {
  const sourceState = record.clauseKind === "vnc"
    ? "verbal"
    : record.clauseKind === "nnc-absolutive"
      ? "absolutive"
      : record.clauseKind === "nnc-possessive"
        ? "possessive"
        : "";
  const subjectOperation = subjectOperationFrame.subjectDiscarded
    ? "incorporation-discards-subject"
    : subjectOperationFrame.degree === "second-degree"
      ? "second-degree-sounded-num1-to-silent"
      : "first-degree-shape-preserved";
  const selectedValues = {
    ...(sourceState ? { sourceStates: sourceState } : {}),
    ...(subjectOperation ? { subjectOperations: subjectOperation } : {}),
  };
  const ownerSourcePaths = {
    sourceStates: "sourceFrame.clauseKind",
    subjectOperations: "operationFrame.subjectOperationFrame.operationId",
  };
  const selectedAxisValues = Object.entries(selectedValues).map(
    ([axisId, selectedValue]) => deepFreeze({
      axisId,
      selectedValue,
      ownerSourcePath: ownerSourcePaths[axisId],
    })
  );
  return deepFreeze({
    projectionIdentity: LCM_PROJECTION_IDENTITY,
    selectedValues,
    selectedAxisValues,
    selectedAxisIds: selectedAxisValues.map(selection => selection.axisId),
    ownerSourcePaths,
    selectedValuesAreTypedProjection: true,
  });
}

function buildProductivePreteritRecord(prerequisiteFrame = null) {
  if (
    prerequisiteFrame?.constructionKind
      !== "predicate-nominalization"
    || prerequisiteFrame?.operationFrame?.nominalizationKind
      !== "preterit-agentive"
    || prerequisiteFrame?.operationFrame?.operationId
      !== "predicate-nominalization:preterit-agentive"
    || prerequisiteFrame?.sourceFrame?.sourceVoice !== "active"
    || prerequisiteFrame?.operationFrame?.preteritAgentiveVariant
      !== "ordinary"
    || prerequisiteFrame?.operationFrame?.connectorProfile
      !== "preterit-agentive"
  ) {
    return null;
  }
  const generalUseStem = normalizeStem(
    prerequisiteFrame.operationFrame.targetStems?.generalUse
  );
  const segments = generalUseStem
    .split("-")
    .filter(Boolean)
    .map(segment => segment === "0" ? "Ø" : segment);
  if (
    !segments.length
    || segments.at(-1) !== "cā"
  ) {
    return null;
  }
  const sourceObjectPattern =
    prerequisiteFrame.sourceFrame.sourceObjectPattern;
  const sourceValence =
    prerequisiteFrame.sourceFrame.sourceValence;
  const sourceKind = sourceObjectPattern === "reflexive"
    ? "reflexive-shuntline"
    : sourceValence === "intransitive"
      ? "regular-intransitive"
      : "transitive";
  const predicateStem = segments.join("-");
  const record = makeRecord({
    id: [
      "productive",
      sourceKind,
      prerequisiteFrame.sourceFrame.sourceStem,
    ].join(":"),
    section: "44.7",
    family: "preterit-agentive-nnc",
    clauseKind: "nnc-absolutive",
    degree: "second-degree",
    domain: "manner",
    surface: realizeCarrier(predicateStem),
    predicateStem,
    num1: "⎕",
    sourceKind,
    lexicalStatus: "productive",
    restrictions: sourceKind === "transitive"
      ? ["transitive-source-is-occasional"]
      : sourceKind === "reflexive-shuntline"
        ? ["reflexive-source-is-rare"]
        : [],
  });
  return deepFreeze({
    ...record,
    sourceForms: [
      prerequisiteFrame.sourceFrame.sourceStem,
    ],
  });
}

function evaluateExternalContext(record, request = {}, canonicalWord = "") {
  const context = request.context && typeof request.context === "object" ? request.context : {};
  const precedingParticle = normalizeToken(context.precedingParticle);
  if (record.requiredPrecedingParticles.length
    && !record.requiredPrecedingParticles.includes(precedingParticle)) {
    return {
      authorizationStatus: "blocked",
      blockReason: "lesson44-required-preceding-particle-choice-missing-or-invalid",
    };
  }
  if (precedingParticle && !record.requiredPrecedingParticles.includes(precedingParticle)) {
    return {
      authorizationStatus: "blocked",
      blockReason: "lesson44-source-does-not-license-preceding-particle-context",
    };
  }
  const negativeParticle = normalizeKey(context.negativeParticle);
  if (negativeParticle && !record.allowedNegativeParticles.includes(negativeParticle)) {
    return {
      authorizationStatus: "blocked",
      blockReason: "lesson44-source-does-not-license-requested-negative-particle",
    };
  }
  const stressPartner = normalizeKey(context.stressPartner);
  if (stressPartner && !record.stressPartners.includes(stressPartner)) {
    return {
      authorizationStatus: "blocked",
      blockReason: "lesson44-source-does-not-license-requested-stress-partner",
    };
  }
  const requestedVariant = normalizeToken(context.variant);
  if (requestedVariant && !record.variants.includes(requestedVariant)) {
    return {
      authorizationStatus: "blocked",
      blockReason: "lesson44-source-does-not-license-requested-surface-variant",
    };
  }
  const sentencePosition = normalizeKey(context.sentencePosition || "initial");
  if (!["initial", "noninitial"].includes(sentencePosition)) {
    return {
      authorizationStatus: "blocked",
      blockReason: "lesson44-sentence-position-invalid",
    };
  }
  const clauseType = normalizeKey(context.clauseType || "assertion");
  if (!["assertion", "question", "subordinate"].includes(clauseType)) {
    return {
      authorizationStatus: "blocked",
      blockReason: "lesson44-clause-type-invalid",
    };
  }
  const negationScope = normalizeKey(context.negationScope);
  if (negationScope && !["adverbial-adjunct", "principal-vnc"].includes(negationScope)) {
    return {
      authorizationStatus: "blocked",
      blockReason: "lesson44-negation-scope-invalid",
    };
  }
  const baseSurface = requestedVariant || normalizeToken(canonicalWord);
  if (!baseSurface) {
    return {
      authorizationStatus: "blocked",
      blockReason: "lesson44-canonical-written-projection-required",
    };
  }
  let realizedSurface = baseSurface;
  // Admission above has already validated the licensed negative prefix.
  // Realize it on the derived nucleus rather than substituting a stored word.
  if (negativeParticle) realizedSurface = `${negativeParticle}${baseSurface}`;
  const surfaceParts = [precedingParticle, realizedSurface, stressPartner].filter(Boolean);
  const interrogativeForce = record.id === "44.5-quen"
    ? !negativeParticle && sentencePosition === "initial"
    : clauseType === "question" && record.id === "44.5-mo"
      ? "rhetorical"
      : false;
  const semanticPolarity = record.id === "44.5-mo"
    && (negativeParticle || clauseType === "subordinate")
      ? "negative"
      : negativeParticle
        ? "negative"
        : "affirmative";
  return {
    authorizationStatus: "authorized",
    blockReason: "",
    precedingParticle,
    negativeParticle,
    stressPartner,
    requestedVariant,
    sentencePosition,
    clauseType,
    negationScope,
    realizedSurface,
    phraseSurface: surfaceParts.join(" "),
    interrogativeForce,
    semanticPolarity,
    negativeImmediatelyPrecedes: negativeParticle
      ? (negationScope || "adverbial-adjunct")
      : "",
  };
}

function resolveExactIncorporationMatrix(exactResult, target, retainedSentence = null) {
  const projection = target.getClassicalNahuatlVncContinuationSourceConstituents?.(exactResult);
  if (!projection) return null;
  const sentence = retainedSentence || (target.isClassicalNahuatlVncSentenceResultFrame?.(exactResult) === true
    ? exactResult : target.requestClassicalVncSentenceResultFrame?.(exactResult));
  if (!projection || projection.grammarAuthority !== false
    || projection.callerSuppliedAuthorityAccepted !== false
    || target.isClassicalNahuatlVncSentenceResultFrame?.(sentence) !== true
    || sentence.authorizationStatus !== "authorized"
    || (sentence !== exactResult && sentence.canonicalSourceFrame !== exactResult)) return null;
  const application = sentence.vncApplicationFrame;
  if (target.isClassicalNahuatlVncApplicationFrame?.(application) !== true
    || application.authorizationStatus !== "authorized") return null;
  const finite = application.normalizedRequest;
  const objectCount = projection.sourceObjectRequests?.length;
  const valence = ["intransitive", "single-object", "double-object", "triple-object"][objectCount];
  if (!valence || !projection.sourceStem || !projection.sourceSubject
    || !finite?.mood || !finite.tense) return null;
  return {exactResult, sentence, target, matrix: {
    stem: projection.sourceStem, verbClass: projection.verbClass, valence,
    subject: projection.sourceSubject, voice: projection.sourceVoice,
    mood: finite.mood, tense: finite.tense,
  }};
}

function evaluateIncorporatedRecord(record, request, target, exactMatrix = null) {
  if (!record.incorporatedAllowed) {
    return { authorizationStatus: "blocked", blockReason: "lesson44-source-does-not-license-incorporation" };
  }
  const matrix = exactMatrix?.matrix || (request.matrix && typeof request.matrix === "object" ? request.matrix : {});
  const matrixStem = normalizeStem(matrix.stem);
  const matrixVerbClass = normalizeToken(matrix.verbClass || "A").toUpperCase();
  const matrixValence = normalizeKey(matrix.valence || "intransitive");
  if (!matrixStem) return { authorizationStatus: "blocked", blockReason: "lesson44-incorporation-matrix-stem-required" };
  if (!["A", "B", "C", "D"].includes(matrixVerbClass)) {
    return { authorizationStatus: "blocked", blockReason: "lesson44-incorporation-matrix-class-required" };
  }
  if (!["intransitive", "single-object", "transitive", "double-object", "triple-object"].includes(matrixValence)) {
    return { authorizationStatus: "blocked", blockReason: "lesson44-incorporation-matrix-valence-required" };
  }
  if (typeof target.requestClassicalNominalConstructionResult !== "function") {
    return { authorizationStatus: "blocked", blockReason: "canonical-nominal-construction-application-route-unavailable" };
  }
  const canonicalResult = target.requestClassicalNominalConstructionResult({
    constructionKind: "nominal-embed-vnc",
    relation: "adverb",
    route: "direct-adverb",
    adverbRole: ({
      degree: "manner",
      direction: "place",
      location: "place",
    })[record.domain] || record.domain,
    orientation: "not-applicable",
    source: {
      embedStem: record.incorporatedStem,
      matrixStem,
      matrixVerbClass,
      matrixValence,
      ...(exactMatrix ? {matrixConstituent: {
        kind: "vnc-result", stem: matrixStem, resultFrame: exactMatrix.exactResult,
      }} : {}),
    },
    subject: normalizeKey(matrix.subject || "3sg"),
    mood: normalizeKey(matrix.mood || "indicative"),
    tense: normalizeKey(matrix.tense || "present"),
    voice: normalizeKey(matrix.voice || "active"),
    outputKind: normalizeKey(request.outputKind || "single"),
  });
  return {
    authorizationStatus: canonicalResult?.authorizationStatus || "blocked",
    blockReason: canonicalResult?.blockReason || "",
    canonicalTargetEvaluator: "grammar:nominal-construction",
    canonicalResult,
    compoundStem: canonicalResult?.operationFrame?.compoundStem || "",
    formulaRealization: canonicalResult?.formulaRealization || "",
    wordSurface: canonicalResult?.wordSurface || "",
    sentenceSurface: canonicalResult?.sentenceSurface || "",
  };
}

function evaluateClassicalNahuatlAdverbialNuclear(request = {}, target = globalThis) {
  const exactSourceRequested = hasAdverbialExactSourceResultField(request);
  const exactMatrixRequested = request.canonicalMatrixResult != null;
  const exactMatrix = exactMatrixRequested
    ? resolveExactIncorporationMatrix(request.canonicalMatrixResult, target) : null;
  if (exactMatrixRequested && !exactMatrix) return buildBlockedFrame(
    "lesson44-incorporation-exact-matrix-result-required", request);
  if (exactMatrix && request.matrix != null) return buildBlockedFrame(
    "lesson44-exact-matrix-and-scalar-matrix-are-mutually-exclusive", request);
  const exactAndPotentialMixed = exactSourceRequested
    && Object.prototype.hasOwnProperty.call(
      request,
      "adverbialPotentialFrame",
    )
    && request.adverbialPotentialFrame !== undefined
    && request.adverbialPotentialFrame !== null;
  if (exactAndPotentialMixed) {
    return buildBlockedFrame(
      "canonical-source-result-and-adverbial-potential-are-mutually-exclusive",
      request,
    );
  }
  const requestForAuthorityScan = Object.fromEntries(Object.entries(request).filter(
    ([field, value]) => !(field === "canonicalSourceResult" && exactSourceRequested)
      && !(field === "canonicalMatrixResult" && exactMatrix)
      && !(field === "adverbialPotentialFrame"
        && isClassicalNahuatlAdverbialPotentialFrame(value)),
  ));
  const hostilePath = findHostileAuthorityPath(requestForAuthorityScan);
  if (hostilePath) {
    return buildBlockedFrame(`caller-supplied-derived-authority-rejected:${hostilePath}`, request);
  }
  const adverbialPotentialFrame = exactSourceRequested
    ? resolveClassicalNahuatlAdverbialPotential(
      { canonicalSourceResult: request.canonicalSourceResult,
        ...(Object.prototype.hasOwnProperty.call(request, "preteritAgentiveUse")
          ? {preteritAgentiveUse: request.preteritAgentiveUse} : {}) },
      target,
    )
    : request.adverbialPotentialFrame || null;
  if (!isClassicalNahuatlAdverbialPotentialFrame(adverbialPotentialFrame)) {
    return buildBlockedFrame("owner-issued-adverbial-potential-frame-required", request);
  }
  if (adverbialPotentialFrame.authorizationStatus === "blocked") {
    return buildBlockedFrame(adverbialPotentialFrame.blockReason, request);
  }
  const record = ADVERBIAL_POTENTIAL_RECORDS.get(adverbialPotentialFrame);
  if (!record) return buildBlockedFrame("adverbial-potential-lexical-receipt-missing", request);
  const requestedDegree = normalizeKey(request.degree);
  const degree = requestedDegree || (record.allowedDegrees.length === 1 ? record.allowedDegrees[0] : "");
  if (!degree) return buildBlockedFrame("adverbial-degree-choice-required", request, { lexicalEntryId: record.id });
  if (!record.allowedDegrees.includes(degree)) {
    return buildBlockedFrame("adverbial-source-does-not-license-requested-degree", request, {
      lexicalEntryId: record.id,
      allowedDegrees: record.allowedDegrees,
    });
  }
  if (record.clauseKind === "vnc" && degree !== "first-degree") {
    return buildBlockedFrame("adverbial-vnc-allows-first-degree-only", request, { lexicalEntryId: record.id });
  }
  if (record.clauseKind === "nnc-possessive" && degree !== "first-degree") {
    return buildBlockedFrame("adverbial-possessive-nnc-allows-first-degree-only", request, { lexicalEntryId: record.id });
  }
  const scope = normalizeKey(request.scope || (record.externalAllowed ? "external-clause" : "incorporated-predicate"));
  if (exactMatrix && scope !== "incorporated-predicate") return buildBlockedFrame(
    "lesson44-exact-matrix-requires-incorporated-scope", request);
  if (!LCM_AXES.scopes.includes(scope)) {
    return buildBlockedFrame("adverbial-scope-required", request, { lexicalEntryId: record.id });
  }
  if (scope === "external-clause" && !record.externalAllowed) {
    return buildBlockedFrame("adverbial-source-is-compound-only", request, { lexicalEntryId: record.id });
  }
  const sourceSlots = adverbialPotentialFrame.canonicalTypedSlotFrame?.slots;
  if (!sourceSlots) return buildBlockedFrame("derived-nuclear-slot-frame-required", request);
  if ([sourceSlots.subject?.pers1, sourceSlots.subject?.pers2, sourceSlots.number?.num2]
    .some(carrier => realizeTypedCarrier(carrier))) {
    return buildBlockedFrame("adverbialization-requires-third-person-nonplural-source", request);
  }
  const subjectOperationFrame = buildSubjectOperationFrame(record, degree, scope, sourceSlots);
  const typedProjection = scope === "external-clause"
    ? buildTypedAdverbialNuclearProjection(
      record,
      subjectOperationFrame,
      target,
      adverbialPotentialFrame.canonicalTypedSlotFrame,
      adverbialPotentialFrame.canonicalSourceResult,
      adverbialPotentialFrame.exactSourceResolution?.generalUseStemFrame,
      adverbialPotentialFrame.primitiveAdverbialSourceFrame,
      adverbialPotentialFrame.lexicalVncSourceFrame,
    )
    : null;
  if (
    typedProjection
    && typedProjection.authorizationStatus !== "authorized"
  ) {
    return buildBlockedFrame(typedProjection.blockReason, request, {
      lexicalEntryId: record.id,
      sourceFrame: deepClone(adverbialPotentialFrame.sourceConstituents),
      subjectOperationFrame,
      scope,
    });
  }
  const externalContext = scope === "external-clause"
    ? evaluateExternalContext(record, {
      ...request,
      context: {
        ...adverbialPotentialFrame.inheritedContext,
        ...Object.fromEntries(Object.entries(request.context || {})
          .filter(([, value]) => value !== "" && value != null)),
      },
    }, typedProjection.wordSurface)
    : null;
  if (externalContext && externalContext.authorizationStatus !== "authorized") {
    return buildBlockedFrame(externalContext.blockReason, request, {
      lexicalEntryId: record.id,
      sourceFrame: deepClone(adverbialPotentialFrame.sourceConstituents),
      subjectOperationFrame,
      scope,
    });
  }
  const incorporation = scope === "incorporated-predicate"
    ? evaluateIncorporatedRecord(record, request, target, exactMatrix)
    : null;
  if (incorporation && incorporation.authorizationStatus !== "authorized") {
    return buildBlockedFrame(incorporation.blockReason, request, {
      lexicalEntryId: record.id,
      sourceFrame: deepClone(adverbialPotentialFrame.sourceConstituents),
      subjectOperationFrame,
      scope,
    });
  }
  const baseFormulaRealization =
    typedProjection?.formulaRealization || "";
  const contextualNuclearFormula = externalContext?.negativeParticle
      ? `${externalContext.negativeParticle}#${baseFormulaRealization.slice(1)}`
      : baseFormulaRealization;
  const formulaRealization = incorporation?.formulaRealization
    || [externalContext?.precedingParticle,contextualNuclearFormula,
      externalContext?.stressPartner].filter(Boolean).join(" ");
  const wordSurface =
    incorporation?.wordSurface
    || externalContext?.realizedSurface
    || typedProjection?.wordSurface
    || "";
  const sentenceSurface = incorporation?.sentenceSurface
    || `${capitalizeClassicalNahuatlNncSentenceInitial(
      externalContext?.phraseSurface || wordSurface,
    )}.`;
  const selectedResultId = `${record.id}:${degree}:${scope}`;
  const appliedSemanticRules = [
    "adverbial-potential-gate",
    subjectOperationFrame.operationId,
    record.family,
    scope === "incorporated-predicate" ? "adverbial-incorporated-scope" : "adverbial-external-clause-scope",
  ];
  const frame = deepFreeze({
    kind: "classical-nahuatl-adverbial-nuclear-result",
    version: VERSION,
    authorizationStatus: "authorized",
    blockReason: "",
    lexicalEntryId: record.id,
    sourceFrame: deepClone(adverbialPotentialFrame.sourceConstituents),
    sourceInputMode: adverbialPotentialFrame.sourceInputMode,
    exactSourceResolution:
      adverbialPotentialFrame.exactSourceResolution || null,
    canonicalSourceResult:
      adverbialPotentialFrame.canonicalSourceResult || null,
    adverbialPotentialFrame,
    lexicalNncSourceFrame:adverbialPotentialFrame.lexicalNncSourceFrame || null,
    ...(adverbialPotentialFrame.lexicalVncSourceFrame?{lexicalVncSourceFrame:adverbialPotentialFrame.lexicalVncSourceFrame}:{}),
    primitiveAdverbialSourceFrame:adverbialPotentialFrame.primitiveAdverbialSourceFrame || null,
    canonicalTypedSlotFrame:
      adverbialPotentialFrame.canonicalTypedSlotFrame || null,
    exactSourceResultIdentityPreserved:
      adverbialPotentialFrame.exactSourceResultIdentityPreserved === true,
    canonicalMatrixResult: exactMatrix?.exactResult || null,
    exactMatrixResultIdentityPreserved: Boolean(exactMatrix),
    lexicalAuthorizationFrame: {
      kind: "classical-nahuatl-adverbial-lexical-authorization",
      authorizationStatus: "authorized",
      lexicalEntryId: record.id,
      allowedDegrees: record.allowedDegrees.slice(),
      allowedScopes: adverbialPotentialFrame.allowedScopes.slice(),
      licensedUses: record.licensedUses.slice(),
      licensedAdjunctionRelations: record.licensedAdjunctionRelations?.slice() || null,
      sourceAnalysis: record.sourceAnalysis,
      useEvidence: record.useEvidence.slice(),
      family: record.family,
      semanticDomain: record.domain,
      lexicalStatus: record.lexicalStatus,
      sourceKind: record.sourceKind,
      restrictions: record.restrictions.slice(),
      readOnly: true,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    },
    operationFrame: {
      kind: "classical-nahuatl-adverbial-nuclear-operation-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      gcdIdentity: GCD_IDENTITY,
      degree,
      scope,
      semanticDomain: record.domain,
      lexicalStatus: record.lexicalStatus,
      sourceKind: record.sourceKind,
      contextFrame: externalContext ? deepFreeze({
        kind: "classical-nahuatl-adverbial-context-frame",
        version: VERSION,
        authorizationStatus: "authorized",
        ...externalContext,
        typedFrameAuthority: true,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
      }) : null,
      subjectOperationFrame,
      typedSlotFrame: typedProjection?.typedSlotFrame || null,
      boundarySurfaceFrame: typedProjection?.surfaceFrame || null,
      appliedSemanticRules,
      predicateStem: record.predicateStem,
      incorporatedStem: scope === "incorporated-predicate" ? record.incorporatedStem : "",
      compoundStem: incorporation?.compoundStem || "",
      typedFrameAuthority: true,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    },
    canonicalTargetEvaluator: incorporation?.canonicalTargetEvaluator || "adverbial-nuclear-boundary-realizer",
    canonicalResult: incorporation?.canonicalResult || null,
    selectedResultId,
    formulaProjection: deepFreeze({
      resultId: selectedResultId,
      formulaRealization,
      typedSlotFrame: typedProjection?.typedSlotFrame || null,
      derivedIndependentlyFromWrittenProjection: true,
      formulaStringAuthority: false,
    }),
    writtenProjection: deepFreeze({
      resultId: selectedResultId,
      wordSurface,
      sentenceSurface,
      boundarySurfaceFrame: typedProjection?.surfaceFrame || null,
      derivedIndependentlyFromFormulaProjection: true,
      surfaceStringAuthority: false,
    }),
    formulaRealization,
    wordSurface,
    sentenceSurface,
    scope,
    leastCommonMultiple: buildSelectedLcmProjection(
      record,
      subjectOperationFrame
    ),
    gcdIdentity: GCD_IDENTITY,
    typedFrameAuthority: true,
    callerSuppliedAuthorityAccepted: false,
    lessonMetadataAuthorizesOutput: false,
    lexicalSourceRecordAuthorizesAdverbialPotential: true,
    catalogTargetAuthority: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
  ISSUED_ADVERBIAL_FRAMES.add(frame);
  if (exactMatrix) EXACT_INCORPORATION_MATRICES.set(frame, exactMatrix);
  ISSUED_ADVERBIAL_OPERATION_FRAMES.add(frame.operationFrame);
  ISSUED_ADVERBIAL_SUBJECT_OPERATION_FRAMES.add(
    frame.operationFrame.subjectOperationFrame
  );
  if (frame.operationFrame.contextFrame) {
    ISSUED_ADVERBIAL_CONTEXT_FRAMES.add(
      frame.operationFrame.contextFrame
    );
  }
  return frame;
}

function isClassicalNahuatlAdverbialNuclearResult(frame = null) {
  const issuedResult = Boolean(
    ISSUED_ADVERBIAL_FRAMES.has(frame)
    && frame?.kind === "classical-nahuatl-adverbial-nuclear-result"
    && frame.version === VERSION
    && ["authorized", "blocked"].includes(frame.authorizationStatus)
    && frame.typedFrameAuthority === true
    && frame.callerSuppliedAuthorityAccepted === false
    && frame.formulaStringAuthority === false
    && frame.surfaceStringAuthority === false
  );
  if (!issuedResult) return false;
  if (frame.authorizationStatus === "blocked") {
    return Boolean(frame.blockReason);
  }
  if (frame.canonicalMatrixResult) {
    const captured = EXACT_INCORPORATION_MATRICES.get(frame);
    if (!captured || captured.exactResult !== frame.canonicalMatrixResult
      || frame.exactMatrixResultIdentityPreserved !== true
      || !resolveExactIncorporationMatrix(captured.exactResult, captured.target, captured.sentence)
      || captured.target.isClassicalNahuatlNominalConstructionResult?.(frame.canonicalResult) !== true
      || frame.canonicalResult.sourceAuthorizationFrame?.lexicalFacts?.capturedMatrixVncResult !== captured.exactResult)
      return false;
  }
  if(frame.sourceInputMode==="owner-issued-lexical-adverbial-nnc-source"
    && (!isClassicalNahuatlAdverbialPotentialFrame(frame.adverbialPotentialFrame)
      || frame.lexicalNncSourceFrame!==frame.adverbialPotentialFrame.lexicalNncSourceFrame
      || frame.canonicalTypedSlotFrame!==frame.lexicalNncSourceFrame?.typedSlotFrame))return false;
  if(frame.sourceInputMode==="owner-issued-lexical-adverbial-vnc-source"
    && (!isClassicalNahuatlAdverbialPotentialFrame(frame.adverbialPotentialFrame)
      || frame.lexicalVncSourceFrame!==frame.adverbialPotentialFrame.lexicalVncSourceFrame
      || frame.canonicalTypedSlotFrame!==frame.lexicalVncSourceFrame?.typedSlotFrame))return false;
  if(frame.sourceInputMode==="owner-issued-primitive-adverbial-predicate-source"
    && (!isClassicalNahuatlAdverbialPotentialFrame(frame.adverbialPotentialFrame)
      || frame.primitiveAdverbialSourceFrame!==frame.adverbialPotentialFrame.primitiveAdverbialSourceFrame
      || frame.canonicalTypedSlotFrame!==frame.primitiveAdverbialSourceFrame?.typedSlotFrame))return false;
  const exactSourceIdentityValid = frame.sourceInputMode
    !== "exact-owner-issued-vnc-nnc-or-clause-result"
    || Boolean(
      isClassicalNahuatlAdverbialExactSourceResolution(
        frame.exactSourceResolution,
      )
      && frame.exactSourceResolution.authorizationStatus === "authorized"
      && frame.canonicalSourceResult
        === frame.exactSourceResolution.canonicalSourceResult
      && frame.canonicalTypedSlotFrame
        === frame.exactSourceResolution.canonicalTypedSlotFrame
      && frame.exactSourceResultIdentityPreserved === true
    );
  return Boolean(
    frame.leastCommonMultiple?.projectionIdentity
      === LCM_PROJECTION_IDENTITY
    && frame.leastCommonMultiple?.selectedValuesAreTypedProjection === true
    && frame.leastCommonMultiple?.selectedAxisIds?.join("|")
      === "sourceStates|subjectOperations"
    && exactSourceIdentityValid
  );
}

function isClassicalNahuatlAdverbialNuclearOperationFrame(frame = null) {
  return Boolean(
    ISSUED_ADVERBIAL_OPERATION_FRAMES.has(frame)
    && frame?.kind === "classical-nahuatl-adverbial-nuclear-operation-frame"
    && frame.authorizationStatus === "authorized"
    && frame.typedFrameAuthority === true
  );
}

function isClassicalNahuatlAdverbializedSubjectOperationFrame(
  frame = null
) {
  return Boolean(
    ISSUED_ADVERBIAL_SUBJECT_OPERATION_FRAMES.has(frame)
    && frame?.kind
      === "classical-nahuatl-adverbialized-subject-operation-frame"
    && frame.authorizationStatus === "authorized"
    && frame.typedFrameAuthority === true
  );
}

function isClassicalNahuatlAdverbialContextFrame(frame = null) {
  return Boolean(
    ISSUED_ADVERBIAL_CONTEXT_FRAMES.has(frame)
    && frame?.kind === "classical-nahuatl-adverbial-context-frame"
    && frame.authorizationStatus === "authorized"
    && frame.typedFrameAuthority === true
  );
}

function buildBlockedAdverbialBatchPlan(blockReason) {
  return deepFreeze({
    kind: "classical-nahuatl-adverbial-nuclear-batch-plan",
    version: VERSION,
    authorizationStatus: "blocked",
    blockReason,
    coordinates: [],
    coordinateCount: 0,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

function buildAdverbialContextCoordinateSelections(record) {
  const precedingParticles = record.requiredPrecedingParticles.length
    ? record.requiredPrecedingParticles
    : [""];
  const negativeParticles = ["", ...record.allowedNegativeParticles];
  const stressPartners = ["", ...record.stressPartners];
  const variants = ["", ...record.variants];
  const sentencePositions = record.id === "44.5-quen"
    ? ["initial", "noninitial"]
    : ["initial"];
  const clauseTypes = record.id === "44.5-mo"
    ? ["assertion", "question", "subordinate"]
    : ["assertion"];
  return precedingParticles.flatMap(precedingParticle => (
    negativeParticles.flatMap(negativeParticle => (
      stressPartners.flatMap(stressPartner => (
        variants.flatMap(variant => (
          sentencePositions.flatMap(sentencePosition => (
            clauseTypes.flatMap(clauseType => (
              (negativeParticle
                ? ["adverbial-adjunct", "principal-vnc"]
                : [""]
              ).map(negationScope => {
                const context = {
                  ...(precedingParticle ? { precedingParticle } : {}),
                  ...(negativeParticle ? { negativeParticle } : {}),
                  ...(stressPartner ? { stressPartner } : {}),
                  ...(variant ? { variant } : {}),
                  ...(sentencePosition !== "initial" ? { sentencePosition } : {}),
                  ...(clauseType !== "assertion" ? { clauseType } : {}),
                  ...(negationScope ? { negationScope } : {}),
                };
                return Object.keys(context).length ? context : null;
              })
            ))
          ))
        ))
      ))
    ))
  ));
}

function buildClassicalNahuatlAdverbialNuclearBatchPlan(
  request = {},
  target = globalThis
) {
  // Match scalar admission: only exact owner-issued potentials may carry
  // their internal morphology. Copies still pass through the authority scan.
  const hostilePath = findHostileAuthorityPath(
    request, "request", isClassicalNahuatlAdverbialPotentialFrame,
  );
  if (hostilePath) {
    return buildBlockedAdverbialBatchPlan(
      `caller-supplied-derived-authority-rejected:${hostilePath}`,
    );
  }
  const requestedScope = normalizeKey(request.scope);
  if (requestedScope && !LCM_AXES.scopes.includes(requestedScope)) {
    return buildBlockedAdverbialBatchPlan("adverbial-batch-scope-invalid");
  }
  const requestedPotentials = Array.isArray(request.adverbialPotentialFrames)
    ? request.adverbialPotentialFrames
    : [];
  if (requestedPotentials.some(
    potential => !isClassicalNahuatlAdverbialPotentialFrame(potential)
  )) {
    return buildBlockedAdverbialBatchPlan(
      "owner-issued-adverbial-potential-frames-required",
    );
  }
  const potentialFrames = requestedPotentials.length
    ? requestedPotentials
    : SOURCE_RECORDS.map(record => (
      resolveClassicalNahuatlAdverbialPotential({
        stem: record.sourceForms[0] || "",
        clauseKind: record.clauseKind,
      }, target)
    ));
  const entries = potentialFrames
    .map(potentialFrame => ({
      potentialFrame,
      record: ADVERBIAL_POTENTIAL_RECORDS.get(potentialFrame),
    }))
    .filter(entry => entry.record)
    .filter(entry => (
      !requestedScope
      || (requestedScope === "external-clause"
        ? entry.record.externalAllowed
        : entry.record.incorporatedAllowed)
    ));
  if (!entries.length) {
    return buildBlockedAdverbialBatchPlan(
      "recognized-adverbial-batch-source-inventory-required",
    );
  }
  const baseRequest = deepClone(request);
  delete baseRequest.adverbialPotentialFrame;
  delete baseRequest.adverbialPotentialFrames;
  delete baseRequest.scope;
  const coordinates = entries.flatMap(({ potentialFrame, record }, entryIndex) => {
    const scopes = requestedScope
      ? [requestedScope]
      : potentialFrame.allowedScopes;
    return record.allowedDegrees.flatMap(degree => (
      scopes.flatMap(scope => (
        (scope === "external-clause"
          ? buildAdverbialContextCoordinateSelections(record)
          : [null]
        ).map((context, contextIndex) => deepFreeze({
          coordinateId: `${record.id}:${entryIndex}:${degree}:${scope}:${contextIndex}`,
          lexicalEntryId: record.id,
          adverbialPotentialFrame: potentialFrame,
          degree,
          scope,
          context,
        }))
      ))
    ));
  });
  const plan = deepFreeze({
    kind: "classical-nahuatl-adverbial-nuclear-batch-plan",
    version: VERSION,
    authorizationStatus: "authorized",
    blockReason: "",
    baseRequest,
    coordinates,
    coordinateCount: coordinates.length,
    scalarEvaluatorIdentity: "evaluateClassicalNahuatlAdverbialNuclear",
    lessonMetadataAuthorizesOutput: false,
    callerSuppliedCoordinateAuthorityAccepted: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
  ISSUED_ADVERBIAL_BATCH_PLANS.add(plan);
  return plan;
}

function isClassicalNahuatlAdverbialNuclearBatchPlan(plan = null) {
  return Boolean(
    ISSUED_ADVERBIAL_BATCH_PLANS.has(plan)
    && plan?.kind === "classical-nahuatl-adverbial-nuclear-batch-plan"
    && plan.authorizationStatus === "authorized"
  );
}

function projectClassicalNahuatlAdverbialNuclearBatchCoordinates(plan = null, coordinates = null, target = globalThis) {
  if (!isClassicalNahuatlAdverbialNuclearBatchPlan(plan)) {
    return Object.freeze([]);
  }
  const selected = Array.isArray(coordinates) && coordinates.length ? coordinates : plan.coordinates;
  return Object.freeze(selected.map(coordinate => {
    const hostilePath = findHostileAuthorityPath(
      coordinate, "request", isClassicalNahuatlAdverbialPotentialFrame,
    );
    if (hostilePath) {
      return deepFreeze({
        kind: "classical-nahuatl-adverbial-nuclear-batch-coordinate",
        version: VERSION,
        authorizationStatus: "blocked",
        blockReason: `caller-supplied-derived-authority-rejected:${hostilePath}`,
        coordinateId: normalizeToken(coordinate?.coordinateId),
        scalarEquivalent: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
      });
    }
    const coordinateId = normalizeToken(coordinate?.coordinateId);
    const planned = plan.coordinates.find(item => item.coordinateId === coordinateId);
    if (!planned) {
      return deepFreeze({
        kind: "classical-nahuatl-adverbial-nuclear-batch-coordinate",
        version: VERSION,
        authorizationStatus: "blocked",
        blockReason: "coordinate-not-present-in-canonical-adverbial-plan",
        coordinateId,
        scalarEquivalent: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
      });
    }
    const scalarFrame = evaluateClassicalNahuatlAdverbialNuclear({
      ...deepClone(plan.baseRequest),
      adverbialPotentialFrame: planned.adverbialPotentialFrame,
      degree: planned.degree,
      scope: planned.scope,
      ...(planned.context ? { context: planned.context } : {}),
    }, target);
    const result = deepFreeze({
      kind: "classical-nahuatl-adverbial-nuclear-batch-coordinate",
      version: VERSION,
      authorizationStatus: scalarFrame.authorizationStatus,
      blockReason: scalarFrame.blockReason,
      coordinateId: planned.coordinateId,
      lexicalEntryId: planned.lexicalEntryId,
      degree: planned.degree,
      scope: planned.scope,
      context: planned.context,
      scalarFrame,
      scalarEquivalent: true,
      formulaRealization: scalarFrame.formulaRealization || "",
      wordSurface: scalarFrame.wordSurface || "",
      sentenceSurface: scalarFrame.sentenceSurface || "",
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
    ISSUED_ADVERBIAL_BATCH_COORDINATES.add(result);
    return result;
  }));
}

function isClassicalNahuatlAdverbialNuclearBatchCoordinate(
  coordinate = null
) {
  return Boolean(
    ISSUED_ADVERBIAL_BATCH_COORDINATES.has(coordinate)
    && coordinate?.kind
      === "classical-nahuatl-adverbial-nuclear-batch-coordinate"
    && coordinate.scalarEquivalent === true
  );
}

function getObsoleteGeneralUseAdverbialConstituent(result, target) {
  if (!isClassicalNahuatlAdverbialNuclearResult(result)
    || result.scope !== "external-clause") return null;
  const resolution = result.exactSourceResolution;
  const capture = resolution?.obsoleteRootGeneralUseCaptureFrame;
  const stem = capture?.obsoleteRootPreteritAnalysis?.generalUseStem;
  if (target.isClassicalNahuatlPreteritVncNominalizationCaptureFrame?.(capture) !== true
    || capture.obsoleteRootPreteritAnalysis.generalUseOnly !== true
    || capture.canonicalVncResult !== result.canonicalSourceResult
    || result.operationFrame.typedSlotFrame?.slots?.predicate?.stem !== stem) return null;
  // The existing preterit general-use cā body has TL1A embedding shape.
  // This derives its Source shape; it does not declare a detached noun lexeme.
  return deepFreeze({kind: "obsolete-general-use-nnc", stem,
    nounClass: "tl", sourceClass: "tl-1-a", canonicalResultFrame: result,
    canonicalCaptureFrame: capture, restrictedNounGenerated: false,
    callerSuppliedAuthorityAccepted: false});
}

export function installClassicalNahuatlAdverbialNuclearGlobals(targetObject = globalThis) {
  const target = targetObject && typeof targetObject === "object" ? targetObject : globalThis;
  const api = {
    CLASSICAL_NAHUATL_LESSON44_GCD_IDENTITY: GCD_IDENTITY,
    CLASSICAL_NAHUATL_LESSON44_LCM_AXES: LCM_AXES,
    getClassicalNahuatlLcm,
    isClassicalNahuatlLcm,
    listClassicalNahuatlLesson44SourceRecords,
    buildClassicalNahuatlLexicalAdverbialPotentialFrame:source=>
      buildClassicalNahuatlLexicalAdverbialPotentialFrame(source,target),
    buildClassicalNahuatlPrimitiveAdverbialPotentialFrame:source=>
      buildClassicalNahuatlPrimitiveAdverbialPotentialFrame(source,target),
    isClassicalNahuatlPrimitiveAdverbialPotentialFrame:frame=>
      isClassicalNahuatlAdverbialPotentialFrame(frame)
      && frame.sourceInputMode === "owner-issued-primitive-adverbial-predicate-source",
    resolveClassicalNahuatlAdverbialPotential:
      source => resolveClassicalNahuatlAdverbialPotential(
        source,
        target,
      ),
    resolveClassicalNahuatlAdverbialExactSource:
      source => resolveClassicalNahuatlAdverbialExactSource(
        source,
        target,
      ),
    isClassicalNahuatlAdverbialExactSourceResolution,
    isClassicalNahuatlAdverbialPotentialFrame,
    evaluateClassicalNahuatlAdverbialNuclear: request => (
      evaluateClassicalNahuatlAdverbialNuclear(request, target)
    ),
    isClassicalNahuatlAdverbialNuclearResult,
    getClassicalNahuatlObsoleteGeneralUseAdverbialConstituent:
      result => getObsoleteGeneralUseAdverbialConstituent(result, target),
    isClassicalNahuatlAdverbialNuclearOperationFrame,
    isClassicalNahuatlAdverbializedSubjectOperationFrame,
    isClassicalNahuatlAdverbialContextFrame,
    buildClassicalNahuatlAdverbialNuclearBatchPlan:
      request => buildClassicalNahuatlAdverbialNuclearBatchPlan(
        request,
        target,
      ),
    isClassicalNahuatlAdverbialNuclearBatchPlan,
    projectClassicalNahuatlAdverbialNuclearBatchCoordinates:
      (plan, coordinates) => (
        projectClassicalNahuatlAdverbialNuclearBatchCoordinates(
          plan,
          coordinates,
          target,
        )
      ),
    isClassicalNahuatlAdverbialNuclearBatchCoordinate,
  };
  Object.defineProperties(target, Object.getOwnPropertyDescriptors(api));
  return api;
}
