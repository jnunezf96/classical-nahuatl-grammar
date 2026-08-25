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
const ISSUED_ADVERBIAL_FRAMES = new WeakSet();
const ISSUED_ADVERBIAL_BATCH_PLANS = new WeakSet();
const ISSUED_ADVERBIAL_BATCH_COORDINATES = new WeakSet();
const ISSUED_ADVERBIAL_OPERATION_FRAMES = new WeakSet();
const ISSUED_ADVERBIAL_SUBJECT_OPERATION_FRAMES = new WeakSet();
const ISSUED_ADVERBIAL_CONTEXT_FRAMES = new WeakSet();
const ISSUED_ADVERBIAL_LCM_FRAMES = new WeakSet();
const ISSUED_ADVERBIAL_EXACT_SOURCE_RESOLUTIONS = new WeakSet();
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

function findHostileAuthorityPath(value, path = "request") {
  if (!value || typeof value !== "object") return "";
  for (const [key, item] of Object.entries(value)) {
    const nextPath = `${path}.${key}`;
    if (HOSTILE_AUTHORITY_KEYS.includes(key) && item !== undefined && item !== null && item !== "") return nextPath;
    if (item && typeof item === "object") {
      const nested = findHostileAuthorityPath(item, nextPath);
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
  compositionalReading = "",
  numberSystem = null,
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
    compositionalReading: normalizeToken(compositionalReading),
    numberSystem: numberSystem ? deepClone(numberSystem) : null,
  });
}

const VNC_RECORDS = Object.freeze([
  makeRecord({ id: "44.3-cencah", section: "44.3.1", family: "lexicalized-vnc", clauseKind: "vnc", degree: "first-degree", domain: "degree", surface: "cencah", predicateStem: "cen-ca-h", formulaKind: "vnc", valence: "Ø", num1: "⎕", lexicalStatus: "lexicalized" }),
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
  ["nel", "nel", "degree", "obligatorily-adverbial", []],
  ["huel", "huel", "manner", "lexicalized", ["negative-ahhuel-licensed", "ability-possibility-or-degree"]],
  ["nen", "nēn", "manner", "obligatorily-adverbial", ["may-embed-in-nnc-or-vnc"]],
  ["mo", "mō", "degree", "conjectural-analysis", ["not-inherently-interrogative", "negative-ahmo-and-camo-licensed", "subordinate-negative-reading"]],
  ["cuel", "cuēl", "time", "obsolete-source", ["source-nounstem-unattested"]],
  ["mach", "mach", "degree", "lexicalized", ["kinship-homophone-never-adverbializes", "mach-eh-collocation", "post-interrogative-ever-reading"]],
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
  allowedNegativeParticles: id === "huel" ? ["ah"] : id === "mo" ? ["ah", "ca"] : [],
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

function getAdverbialExactVncSlotFrame(result = null, target = globalThis) {
  const source = (
    typeof target.isClassicalNahuatlVncSentenceResultFrame === "function"
    && target.isClassicalNahuatlVncSentenceResultFrame(result)
  )
    ? result.canonicalSourceFrame || result.canonicalResultFrame || null
    : result;
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

function getAdverbialExactSourceRecord({
  clauseKind = "",
  slotFrame = null,
} = {}) {
  const predicateStem = normalizeTypedSourceStem(
    realizeCarrier(slotFrame?.slots?.predicate?.stem || ""),
  );
  const exactStateSlots = (
    slotFrame?.slots?.state?.slots
    || slotFrame?.slots?.prePredicate
    || []
  ).filter(slot => (
    !slot?.kind || slot.kind === "vnc-internal-state"
  )).map(slot => normalizeTypedSourceStem(slot?.carrier || ""))
    .filter(Boolean);
  const matches = SOURCE_RECORDS.filter(record => (
    record.clauseKind === clauseKind
    && normalizeTypedSourceStem(realizeCarrier(record.predicateStem))
      === predicateStem
    && (
      !record.stateSlots.length
      || record.stateSlots.map(normalizeTypedSourceStem).join("|")
        === exactStateSlots.join("|")
    )
  ));
  return matches.length === 1 ? matches[0] : null;
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
  if (!hasAdverbialExactSourceResultField(source)) {
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
    record = getAdverbialExactSourceRecord({ clauseKind, slotFrame });
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
  } else {
    blockReason = "exact-owner-issued-vnc-nnc-or-clause-result-required";
  }
  if (!blockReason && !slotFrame) {
    blockReason = "exact-source-result-typed-nuclear-slots-unavailable";
  }
  if (!blockReason && !record) {
    blockReason = "exact-source-result-has-no-licensed-adverbial-potential";
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
    ...(record.allowedNegativeParticles.length
      ? ["negative-particle", "negation-scope"]
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
    canonicalSourceResult: blockReason
      && !canonicalSourceResult?.authorizationStatus
      ? null
      : canonicalSourceResult,
    canonicalTypedSlotFrame: blockReason ? null : slotFrame,
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
    )
  );
}

function resolveClassicalNahuatlAdverbialPotential(
  source = {},
  target = globalThis,
  exactSourceResolution = null,
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
  const typedKey = `${clauseKind}:${normalizeTypedSourceStem(sourceStem)}`;
  const lexicalMatches = SOURCE_RECORDS_BY_TYPED_SOURCE.get(typedKey) || [];
  const record = productiveRecord
    ? productiveRecord
    : lexicalMatches.length === 1
      ? lexicalMatches[0]
      : null;
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
    lexicalFacts: {
      family: record.family,
      semanticDomain: record.domain,
      lexicalStatus: record.lexicalStatus,
      sourceKind: record.sourceKind,
      restrictions: record.restrictions.slice(),
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
    sourceInputMode: exactSourceResolution
      ? "exact-owner-issued-vnc-nnc-or-clause-result"
      : "typed-source-fields",
    exactSourceResolution,
    canonicalSourceResult:
      exactSourceResolution?.canonicalSourceResult || null,
    canonicalTypedSlotFrame:
      exactSourceResolution?.canonicalTypedSlotFrame || null,
    exactSourceResultIdentityPreserved: Boolean(exactSourceResolution),
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
  const subjectSlots = subjectOperationFrame.resultSubjectSlots || {};
  const stateFrame = buildAdverbialStateFrame(record.stateSlots);
  if (record.formulaKind === "vnc") {
    if (
      typeof target.buildClassicalNahuatlVncSlotFrame !== "function"
      || typeof target.renderClassicalNahuatlVncSlotFrameFormula
        !== "function"
      || typeof target.isClassicalNahuatlVncSlotFrame !== "function"
    ) {
      return {
        authorizationStatus: "blocked",
        blockReason: "canonical-typed-vnc-slot-evaluator-unavailable",
      };
    }
    const typedSlotFrame = target.buildClassicalNahuatlVncSlotFrame({
      sourceFrameKind: "classical-nahuatl-adverbial-potential-frame",
      sourceAuthorizationStatus: "authorized",
      stem: record.predicateStem,
      personDyad: {
        pers1: subjectSlots.pers1,
        pers2: subjectSlots.pers2,
      },
      tenseFrame: { tns: record.valence || "Ø" },
      numberDyad: { num1: record.num1, num2: record.num2 },
      objectFrame: { valenceArity: "vacant" },
      internalStateFrame: record.stateSlots.length
        ? {
          authorizationStatus: "authorized",
          slots: [{
            role: "state",
            carrier: record.stateSlots.join("-"),
          }],
        }
        : null,
    });
    if (!target.isClassicalNahuatlVncSlotFrame(typedSlotFrame)) {
      return {
        authorizationStatus: "blocked",
        blockReason: "canonical-typed-vnc-slot-frame-blocked",
        typedSlotFrame,
      };
    }
    const slots = typedSlotFrame.slots;
    const wordSurface = [
      slots.subject?.pers1,
      slots.subject?.pers2,
      ...(slots.prePredicate || []).map(slot => slot.carrier),
      slots.predicate?.stem,
      slots.predicate?.tns,
      slots.number?.num1,
      slots.number?.num2,
    ].map(realizeTypedCarrier).join("");
    return {
      authorizationStatus: "authorized",
      blockReason: "",
      typedSlotFrame,
      formulaRealization:
        target.renderClassicalNahuatlVncSlotFrameFormula(typedSlotFrame),
      wordSurface: realizeAdverbialWrittenBoundary(
        wordSurface,
        record.writtenBoundaryRule,
      ),
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
  const typedSlotFrame = target.buildClassicalNahuatlNncSlotFrame({
    sourceFrameKind: "classical-nahuatl-adverbial-potential-frame",
    sourceAuthorizationStatus: "authorized",
    stem: record.predicateStem,
    stateFrame,
    personFrame: {
      authorizationStatus: "authorized",
      pers1: subjectSlots.pers1,
      pers2: subjectSlots.pers2,
      subject: "adverbial",
    },
    numberFrame: {
      authorizationStatus: "authorized",
      num1: record.num1,
      num2: record.num2,
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

function buildSubjectOperationFrame(record, degree, scope) {
  const incorporated = scope === "incorporated-predicate";
  return deepFreeze({
    kind: "classical-nahuatl-adverbialized-subject-operation-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    sourceClauseKind: record.clauseKind,
    degree,
    operationId: incorporated
      ? "adverbial-incorporation-discards-subject"
      : degree === "second-degree"
        ? "adverbial-second-degree-sounded-num1-to-silent"
        : "adverbial-first-degree-shape-preserved",
    sourceSubjectSlots: cloneRecord(record.subjectSlots),
    resultSubjectSlots: incorporated ? null : cloneRecord(record.subjectSlots),
    sourceNum1: degree === "second-degree" ? "sounded-lexical-source-num1" : record.num1,
    resultNum1: incorporated ? "" : record.num1,
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
  if (negativeParticle === "ah" && record.id === "44.5-huel") realizedSurface = `ah${baseSurface}`;
  if (negativeParticle === "ah" && record.id === "44.5-mo") realizedSurface = "ahmō";
  if (negativeParticle === "ca" && record.id === "44.5-mo") realizedSurface = "camō";
  const surfaceParts = [precedingParticle, realizedSurface, stressPartner].filter(Boolean);
  const interrogativeForce = record.id === "44.5-quen"
    ? sentencePosition === "initial"
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

function evaluateIncorporatedRecord(record, request, target) {
  if (!record.incorporatedAllowed) {
    return { authorizationStatus: "blocked", blockReason: "lesson44-source-does-not-license-incorporation" };
  }
  const matrix = request.matrix && typeof request.matrix === "object" ? request.matrix : {};
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
  const requestForAuthorityScan = exactSourceRequested
    ? Object.fromEntries(Object.entries(request).filter(
      ([field]) => field !== "canonicalSourceResult",
    ))
    : request;
  const hostilePath = findHostileAuthorityPath(requestForAuthorityScan);
  if (hostilePath) {
    return buildBlockedFrame(`caller-supplied-derived-authority-rejected:${hostilePath}`, request);
  }
  const adverbialPotentialFrame = exactSourceRequested
    ? resolveClassicalNahuatlAdverbialPotential(
      { canonicalSourceResult: request.canonicalSourceResult },
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
  if (!LCM_AXES.scopes.includes(scope)) {
    return buildBlockedFrame("adverbial-scope-required", request, { lexicalEntryId: record.id });
  }
  if (scope === "external-clause" && !record.externalAllowed) {
    return buildBlockedFrame("adverbial-source-is-compound-only", request, { lexicalEntryId: record.id });
  }
  const subjectOperationFrame = buildSubjectOperationFrame(record, degree, scope);
  const typedProjection = scope === "external-clause"
    ? buildTypedAdverbialNuclearProjection(
      record,
      subjectOperationFrame,
      target,
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
    ? evaluateExternalContext(record, request, typedProjection.wordSurface)
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
    ? evaluateIncorporatedRecord(record, request, target)
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
  const formulaRealization = incorporation?.formulaRealization
    || (externalContext?.negativeParticle
      ? `${externalContext.negativeParticle}#${baseFormulaRealization.slice(1)}`
      : baseFormulaRealization);
  const wordSurface =
    incorporation?.wordSurface
    || externalContext?.realizedSurface
    || typedProjection?.wordSurface
    || "";
  const sentenceSurface = incorporation?.sentenceSurface
    || `${externalContext?.phraseSurface || wordSurface}.`;
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
    canonicalTypedSlotFrame:
      adverbialPotentialFrame.canonicalTypedSlotFrame || null,
    exactSourceResultIdentityPreserved:
      adverbialPotentialFrame.exactSourceResultIdentityPreserved === true,
    lexicalAuthorizationFrame: {
      kind: "classical-nahuatl-adverbial-lexical-authorization",
      authorizationStatus: "authorized",
      lexicalEntryId: record.id,
      allowedDegrees: record.allowedDegrees.slice(),
      allowedScopes: adverbialPotentialFrame.allowedScopes.slice(),
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
  const hostilePath = findHostileAuthorityPath(request);
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
    const hostilePath = findHostileAuthorityPath(coordinate);
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

export function installClassicalNahuatlAdverbialNuclearGlobals(targetObject = globalThis) {
  const target = targetObject && typeof targetObject === "object" ? targetObject : globalThis;
  const api = {
    CLASSICAL_NAHUATL_LESSON44_GCD_IDENTITY: GCD_IDENTITY,
    CLASSICAL_NAHUATL_LESSON44_LCM_AXES: LCM_AXES,
    getClassicalNahuatlLcm,
    isClassicalNahuatlLcm,
    listClassicalNahuatlLesson44SourceRecords,
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
