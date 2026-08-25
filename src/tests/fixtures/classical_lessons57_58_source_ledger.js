"use strict";

// Test-only ledger. Runtime grammar must not import this file or use source
// line numbers, headings, examples, or stored answers as output authority.

const crypto = require("crypto");

const SOURCE_DOCUMENT = "ANDREWS_TRANSCRIPTION_CANVAS.md";
const SOURCE_LINE_START = 24705;
const SOURCE_LINE_END = 25462;
const SOURCE_SHA256 = "d00364313f43c40b89320de3252cd16a5f65cc45bb99fd365389c76b6a2d6a2b";
const EXPECTED_FORMULA_BEARING_LINE_COUNT = 30;

const SECTION_SPANS = Object.freeze([
  Object.freeze({ section: "57.1", lineStart: 24705, lineEnd: 24779, routeId: "vnc:contextual-time" }),
  Object.freeze({ section: "57.2", lineStart: 24780, lineEnd: 24798, routeId: "vnc:source-valence" }),
  Object.freeze({ section: "57.3", lineStart: 24799, lineEnd: 24810, routeId: "sentence:supplementation" }),
  Object.freeze({ section: "57.4", lineStart: 24811, lineEnd: 24928, routeId: "sentence:supplementation" }),
  Object.freeze({ section: "57.5", lineStart: 24929, lineEnd: 24964, routeId: "sentence:supplementation" }),
  Object.freeze({ section: "57.6", lineStart: 24965, lineEnd: 24993, routeId: "sentence:supplementation" }),
  Object.freeze({ section: "57.7", lineStart: 24994, lineEnd: 25018, routeId: "nnc:ordinary" }),
  Object.freeze({ section: "58.1", lineStart: 25019, lineEnd: 25089, routeId: "vnc:denominal" }),
  Object.freeze({ section: "58.2", lineStart: 25090, lineEnd: 25170, routeId: "grammar:nominal-construction" }),
  Object.freeze({ section: "58.3", lineStart: 25171, lineEnd: 25227, routeId: "sentence:supplementation" }),
  Object.freeze({ section: "58.4", lineStart: 25228, lineEnd: 25274, routeId: "sentence:supplementation" }),
  Object.freeze({ section: "58.5", lineStart: 25275, lineEnd: 25292, routeId: "sentence:supplementation" }),
  Object.freeze({ section: "58.6", lineStart: 25293, lineEnd: 25308, routeId: "sentence:supplementation" }),
  Object.freeze({ section: "58.7", lineStart: 25309, lineEnd: 25392, routeId: "grammar:nominal-construction" }),
  Object.freeze({ section: "58.8", lineStart: 25393, lineEnd: 25462, routeId: "test-only:documentary" }),
]);

const REQUIRED_RULE_IDS = Object.freeze([
  "tense-is-not-time",
  "neighbor-context-may-shift-time-reading",
  "present-historical-past",
  "present-pluperfect",
  "present-future-in-past",
  "present-past-progressive",
  "preterit-priority-to-present",
  "preterit-priority-to-past",
  "preterit-priority-to-future",
  "future-posteriority",
  "future-imminence-with-ye",
  "true-valence-exception",
  "compound-object-not-valence-exception",
  "absolute-topic-no-comment-relation",
  "topicalized-modification-head-contrast",
  "person-mismatch",
  "number-mismatch",
  "specificity-mismatch",
  "same-extralinguistic-referent-required",
  "specific-supplement-nonspecific-impersonal-head",
  "adverbial-nnc-supplement",
  "ordinary-adverbial-modifier-contrast",
  "deleted-speech-head-contrast",
  "silent-first-person-after-sounded-first-person",
  "first-person-reflexive-independent-license",
  "nounstem-l-no-nonactive-source",
  "restricted-instrumental-az-matrix",
  "connective-hu-after-l-n-a",
  "instrumental-huia-continuation",
  "instrumental-oa-continuation",
  "ehua-keeps-source-num1",
  "solid-spelling-not-incorporation",
  "connective-t-nounstem-embed",
  "preterit-agentive-object-complement-keeps-c",
  "matrix-object-controls-deleted-embed-subject",
  "connective-t-nonrelational-nounstem",
  "frozen-third-person-reflexive",
  "exclamation-preserves-unit-category",
  "haste-collocation",
  "vocative-e",
  "mah-not-wish-ma",
  "mah-optional-in",
  "negative-principal-mah-strong-negative",
  "negative-principal-mah-ca-strong-affirmative",
  "quemah-frozen-ellipsis",
  "cuix-ahzo-ahmo-principal",
  "iuhqui-iuh-principal",
  "incorporated-noun-never-subject",
  "active-incorporated-noun-adverbial",
  "nonactive-incorporated-noun-means-instrument",
  "passive-agent-mention-forbidden",
  "textual-correction-diagnostic-only",
  "graphological-vocable-boundary",
  "sentence-division-reanalysis",
]);

const OWNER = Object.freeze({
  contextualTense: Object.freeze({
    sourceKind: "classical-nahuatl-vnc-application-frame",
    routeId: "vnc:contextual-time",
    operationId: "interpretClassicalNahuatlVncContextualTime",
  }),
  irregularValence: Object.freeze({
    sourceKind: "classical-nahuatl-canonical-source-stem-record",
    routeId: "vnc:source-valence",
    operationId: "buildClassicalNahuatlValenceSourceAnalysis",
  }),
  absoluteTopic: Object.freeze({
    sourceKind: "classical-nahuatl-supplementation-operation-request",
    routeId: "sentence:supplementation",
    operationId: "relation:absolute-topic",
  }),
  agreement: Object.freeze({
    sourceKind: "classical-nahuatl-supplementation-operation-request",
    routeId: "sentence:supplementation",
    operationId: "relation:referent-conditioned-agreement",
  }),
  adverbialNnc: Object.freeze({
    sourceKind: "classical-nahuatl-supplementation-operation-request",
    routeId: "sentence:supplementation",
    operationId: "relation:adverbial-nnc",
  }),
  silentFirstPerson: Object.freeze({
    sourceKind: "classical-nahuatl-supplementation-operation-request",
    routeId: "sentence:supplementation",
    operationId: "relation:silent-first-person",
  }),
  nounstemL: Object.freeze({
    sourceKind: "classical-nahuatl-ordinary-nnc-source-frame",
    routeId: "nnc:ordinary",
    operationId: "evaluateClassicalNahuatlOrdinaryNnc",
  }),
  instrumentalAz: Object.freeze({
    sourceKind: "classical-nahuatl-denominal-vnc-source-frame",
    routeId: "vnc:denominal",
    operationId: "evaluateClassicalNahuatlDenominalVnc",
  }),
  problematic: Object.freeze({
    sourceKind: "classical-nahuatl-closed-construction-source",
    routeId: "grammar:nominal-construction",
    operationId: "validateClassicalNahuatlClosedConstructionException",
  }),
  exclamation: Object.freeze({
    sourceKind: "classical-nahuatl-supplementation-operation-request",
    routeId: "sentence:supplementation",
    operationId: "exclamatory-utterance",
  }),
  suchThat: Object.freeze({
    sourceKind: "classical-nahuatl-supplementation-operation-request",
    routeId: "sentence:supplementation",
    operationId: "such-that-adjunction",
  }),
  incorporatedNoun: Object.freeze({
    sourceKind: "classical-nahuatl-nominal-construction-result-frame",
    routeId: "grammar:nominal-construction",
    operationId: "validateClassicalNahuatlIncorporatedNounRole",
  }),
  textualDiagnostic: Object.freeze({
    sourceKind: "canvas-documentary-example",
    routeId: "test-only:documentary",
    operationId: "no-production-operation",
  }),
});

function ruleClaim(
  ruleId,
  section,
  lineStart,
  lineEnd,
  exactSourceAnchors,
  summary,
  canonicalObjectKind,
  owner,
  factRole,
  disposition,
  conflictingPath,
) {
  const diagnosticOnly = disposition === "diagnostic-only-documentary";
  return Object.freeze({
    ruleId,
    section,
    lineStart,
    lineEnd,
    exactSourceAnchors: Object.freeze([...exactSourceAnchors]),
    summary,
    canonicalObjectKind,
    existingTypedSource: owner.sourceKind,
    routeId: owner.routeId,
    sharedOperationOrInvariant: owner.operationId,
    factRole,
    disposition,
    conflictingPath,
    proofIds: Object.freeze([
      `canvas-source:${ruleId}`,
      `owner-operation:${owner.operationId}`,
      `owner-execution:${ruleId}`,
      ...(diagnosticOnly ? ["diagnostic-only:textual-problem"] : []),
    ]),
  });
}

const RULE_CLAIMS = Object.freeze([
  ruleClaim(
    "tense-is-not-time", "57.1", 24707, 24710,
    ["tense (a grammatical", "time (an existential category)"],
    "Grammatical tense and contextual time reference are distinct.",
    "restriction", OWNER.contextualTense, "architecture-invariant",
    "existing-canonical-owner", "time-gloss-rewriting-finite-tense",
  ),
  ruleClaim(
    "neighbor-context-may-shift-time-reading", "57.1", 24710, 24715,
    ["exerts an influence", "across sentence boundaries"],
    "A neighboring VNC or wider context may license a different time reading without changing tense morphology.",
    "condition", OWNER.contextualTense, "contextual-fact",
    "existing-canonical-owner", "translation-time-as-finite-morphology",
  ),
  ruleClaim(
    "present-historical-past", "57.1.1.a", 24716, 24720,
    ["historical present", "Onhuetzi in mītl"],
    "Present tense may receive a historical-past contextual reading.",
    "contextual-realization", OWNER.contextualTense, "contextual-fact",
    "existing-canonical-owner", "stored-historical-present-example-as-output",
  ),
  ruleClaim(
    "present-pluperfect", "57.1.1.b", 24721, 24728,
    ["prior to another event in past time", "English pluperfect tense"],
    "Present tense may receive a pluperfect contextual reading next to a historical present.",
    "contextual-realization", OWNER.contextualTense, "contextual-fact",
    "existing-canonical-owner", "pluperfect-translation-as-tense-morph",
  ),
  ruleClaim(
    "present-future-in-past", "57.1.1.c", 24729, 24733,
    ["subsequent to another event in past time", "future-inthe-"],
    "Present tense may receive a future-in-the-past contextual reading.",
    "contextual-realization", OWNER.contextualTense, "contextual-fact",
    "existing-canonical-owner", "future-in-past-gloss-as-source-tense",
  ),
  ruleClaim(
    "present-past-progressive", "57.1.1.d", 24738, 24741,
    ["concomitant with another event in the past", "past progressive tense"],
    "Present tense may receive a past-progressive contextual reading.",
    "contextual-realization", OWNER.contextualTense, "contextual-fact",
    "existing-canonical-owner", "progressive-translation-as-source-tense",
  ),
  ruleClaim(
    "preterit-priority-to-present", "57.1.2.a", 24742, 24751,
    ["prior to another event in the present", "present perfect"],
    "Preterit marks priority to a contextually present event.",
    "contextual-realization", OWNER.contextualTense, "contextual-fact",
    "existing-canonical-owner", "present-perfect-gloss-as-preterit-rewrite",
  ),
  ruleClaim(
    "preterit-priority-to-past", "57.1.2.b", 24752, 24755,
    ["prior to another event in the past", "English pluperfect"],
    "Preterit marks priority to a contextually past event.",
    "contextual-realization", OWNER.contextualTense, "contextual-fact",
    "existing-canonical-owner", "pluperfect-gloss-as-preterit-rewrite",
  ),
  ruleClaim(
    "preterit-priority-to-future", "57.1.2.c", 24756, 24759,
    ["prior to another event in the future", "future perfect"],
    "Preterit marks priority to a contextually future event.",
    "contextual-realization", OWNER.contextualTense, "contextual-fact",
    "existing-canonical-owner", "future-perfect-gloss-as-preterit-rewrite",
  ),
  ruleClaim(
    "future-posteriority", "57.1.3.a", 24760, 24770,
    ["subsequent to another event in the past", "notion of posteriority"],
    "Future tense retains posteriority while context locates the reference point in the past.",
    "contextual-realization", OWNER.contextualTense, "contextual-fact",
    "existing-canonical-owner", "past-translation-erasing-future-morphology",
  ),
  ruleClaim(
    "future-imminence-with-ye", "57.1.3.b", 24771, 24775,
    ["immediately prior to another event", "particle ye"],
    "The imminent future reading requires its contextual ye evidence.",
    "condition", OWNER.contextualTense, "contextual-fact",
    "existing-canonical-owner", "imminence-without-typed-ye-context",
  ),
  ruleClaim(
    "true-valence-exception", "57.2", 24780, 24790,
    ["verbstems that expectedly require transitive valence", "intransitive VNCs"],
    "A closed lexical exception may exhibit valence different from its expected class.",
    "exception", OWNER.irregularValence, "lexical-fact",
    "existing-lexical-authorization", "unknown-lexeme-as-productive-valence-exception",
  ),
  ruleClaim(
    "compound-object-not-valence-exception", "57.2", 24791, 24798,
    ["should not be mistaken as an instance of valence irregularity", "incorporated object"],
    "An incorporated compound nounstem object is not evidence for irregular valence.",
    "restriction", OWNER.irregularValence, "lexical-fact",
    "existing-lexical-authorization", "translation-plausibility-as-valence-classification",
  ),
  ruleClaim(
    "absolute-topic-no-comment-relation", "57.3", 24799, 24806,
    ["free from the usual grammatical relations", "topic is not a supplement"],
    "An absolute topic has no grammatical relation to the comment.",
    "composition-rule", OWNER.absoluteTopic, "derived-fact",
    "existing-canonical-owner", "topic-ui-label-as-supplement-relation",
  ),
  ruleClaim(
    "topicalized-modification-head-contrast", "57.3", 24807, 24810,
    ["topicalized head of a structure of modification", "supplementary subject"],
    "A topicalized modification head must be distinguished from an absolute topic.",
    "restriction", OWNER.absoluteTopic, "derived-fact",
    "existing-canonical-owner", "surface-initial-position-as-absolute-topic",
  ),
  ruleClaim(
    "person-mismatch", "57.4.1", 24811, 24824,
    ["lack of agreement in person", "first-person plural subject pronoun"],
    "A same-referent supplement may mismatch its head in person.",
    "exception", OWNER.agreement, "contextual-fact",
    "existing-canonical-owner", "automatic-person-agreement-rewrite",
  ),
  ruleClaim(
    "number-mismatch", "57.4.2", 24825, 24858,
    ["lack of agreement in number", "reference wins out over grammar"],
    "A same-referent supplement may mismatch its head in number.",
    "exception", OWNER.agreement, "contextual-fact",
    "existing-canonical-owner", "automatic-number-agreement-rewrite",
  ),
  ruleClaim(
    "specificity-mismatch", "57.4.3", 24859, 24894,
    ["Lack of agreement in specificity", "nonspecific pronominal head"],
    "A specific supplement may delimit a nonspecific pronominal head.",
    "exception", OWNER.agreement, "contextual-fact",
    "existing-canonical-owner", "automatic-specificity-agreement-rewrite",
  ),
  ruleClaim(
    "same-extralinguistic-referent-required", "57.4-remark", 24915, 24921,
    ["same group of extralinguistic entities", "If a difference in referents exists"],
    "Agreement mismatch is licensed only when head and supplement share the same referent.",
    "condition", OWNER.agreement, "architecture-invariant",
    "existing-canonical-owner", "structural-shape-alone-authorizing-mismatch",
  ),
  ruleClaim(
    "specific-supplement-nonspecific-impersonal-head", "57.4.3.a-c", 24867, 24914,
    ["nonspecific subject pronoun", "specific supplementary", "impersonal"],
    "A specific supplement can particularize a nonspecific impersonal subject or object head.",
    "condition", OWNER.agreement, "contextual-fact",
    "existing-canonical-owner", "supplement-specificity-overwriting-head-source",
  ),
  ruleClaim(
    "adverbial-nnc-supplement", "57.5", 24929, 24935,
    ["object pronoun tla serves as the head", "supplementary-object adverbial"],
    "An adverbial NNC may supplement a typed object-pronoun head.",
    "composition-rule", OWNER.adverbialNnc, "derived-fact",
    "existing-canonical-owner", "adverbial-surface-as-automatic-modifier",
  ),
  ruleClaim(
    "ordinary-adverbial-modifier-contrast", "57.5", 24936, 24946,
    ["not a supplement but an", "adverbial modifier"],
    "An ordinary adverbial modifier has no direct grammatical relation to the object pronoun.",
    "restriction", OWNER.adverbialNnc, "derived-fact",
    "existing-canonical-owner", "all-adverbial-nncs-as-supplements",
  ),
  ruleClaim(
    "deleted-speech-head-contrast", "57.5-note", 24947, 24964,
    ["deletion transformation", "principal clause", "has been deleted"],
    "A missing speech head may explain the apparent relation and must not be misclassified as direct supplementation.",
    "exception", OWNER.adverbialNnc, "derived-fact",
    "existing-canonical-owner", "deleted-head-as-direct-tla-head",
  ),
  ruleClaim(
    "silent-first-person-after-sounded-first-person", "57.6", 24965, 24986,
    ["after a sounded version has occurred", "actually first person"],
    "A subsequent same-referent first-person pers1 may be silent after a sounded first-person VNC.",
    "contextual-realization", OWNER.silentFirstPerson, "contextual-fact",
    "existing-canonical-owner", "silent-pers1-as-third-person-fallback",
  ),
  ruleClaim(
    "first-person-reflexive-independent-license", "57.6-note", 24987, 24993,
    ["first person have such distinctive shapes", "without the presence of a forelying VNC"],
    "A distinctive first-person reflexive can independently license a silent first-person pers1.",
    "condition", OWNER.silentFirstPerson, "contextual-fact",
    "existing-canonical-owner", "empty-pers1-without-reflexive-license",
  ),
  ruleClaim(
    "nounstem-l-no-nonactive-source", "57.7", 24994, 25015,
    ["no nonactive verbstem source", "source is apparently a nounstem", "(xi-l-lan)-tli-"],
    "The closed -l nounstem inventory has nounstem sources and no inferred nonactive source.",
    "restriction", OWNER.nounstemL, "lexical-fact",
    "existing-lexical-authorization", "shape-based-invention-of-nonactive-source",
  ),
  ruleClaim(
    "restricted-instrumental-az-matrix", "58.1", 25021, 25043,
    ["matrix subposition", "use is restricted almost entirely", "compound nounstems"],
    "The restricted instrumental inventory uses the lexical matrix nounstem (āz)-tli-.",
    "lexical-class", OWNER.instrumentalAz, "lexical-fact",
    "existing-lexical-authorization", "productive-az-rule-for-unknown-sources",
  ),
  ruleClaim(
    "connective-hu-after-l-n-a", "58.1", 25044, 25079,
    ["connective /w/", "follows an Ill", "follows an /n/", "follows the vowel [a]"],
    "The connective hu realization is lexically and boundary conditioned after l, n, or a.",
    "contextual-realization", OWNER.instrumentalAz, "boundary-conditioned-fact",
    "existing-lexical-authorization", "free-connective-hu-user-toggle",
  ),
  ruleClaim(
    "instrumental-huia-continuation", "58.1", 25080, 25083,
    ["serve as the", "source for a verbstem formed with huiā", "tzicua-hu-āz-huiā"],
    "Only licensed instrumental nounstems can request the huiā continuation.",
    "operation", OWNER.instrumentalAz, "derived-fact",
    "existing-lexical-authorization", "unlicensed-huia-continuation",
  ),
  ruleClaim(
    "instrumental-oa-continuation", "58.1", 25084, 25089,
    ["serve as the source for an intransitive", "using the o-a", "tepon-āz-o-ā"],
    "Only licensed instrumental nounstems can request the intransitive o-ā continuation.",
    "operation", OWNER.instrumentalAz, "derived-fact",
    "existing-lexical-authorization", "unlicensed-oa-continuation",
  ),
  ruleClaim(
    "ehua-keeps-source-num1", "58.2.1", 25098, 25111,
    ["continue to manifest the subject pronoun's num1", "source", "absolutive-state NNC"],
    "The closed ēhua construction preserves the source NNC num1 filler.",
    "exception", OWNER.problematic, "lexical-fact",
    "existing-lexical-authorization", "generic-ehua-normalization-dropping-num1",
  ),
  ruleClaim(
    "solid-spelling-not-incorporation", "58.2.1-contrast", 25112, 25124,
    ["spelling that imitates pronunciation", "Instead of incorporation there is supplementation", "integrated supplement"],
    "Solid spelling can reflect pronunciation while the typed construction remains supplementation.",
    "restriction", OWNER.problematic, "boundary-conditioned-fact",
    "existing-lexical-authorization", "solid-spelling-as-incorporation-authority",
  ),
  ruleClaim(
    "connective-t-nounstem-embed", "58.2.2", 25125, 25127,
    ["connective-t compound verbstem", "embed is a", "nounstem"],
    "A closed connective-t exception licenses a nounstem embed.",
    "exception", OWNER.problematic, "lexical-fact",
    "existing-lexical-authorization", "productive-nounstem-embed-from-shape",
  ),
  ruleClaim(
    "preterit-agentive-object-complement-keeps-c", "58.2.3", 25128, 25143,
    ["object complement", "num1 filler c is kept", "same referent as the object pronoun"],
    "A closed object-complement construction preserves the embedded preterit-agentive num1 c.",
    "exception", OWNER.problematic, "lexical-fact",
    "existing-lexical-authorization", "generic-object-complement-dropping-embedded-c",
  ),
  ruleClaim(
    "matrix-object-controls-deleted-embed-subject", "58.2.4", 25144, 25159,
    ["verb object pronoun respond to the matrix", "represents the deleted subject"],
    "The matrix object controls the deleted embedded subject in a closed connective-t family.",
    "exception", OWNER.problematic, "lexical-fact",
    "existing-lexical-authorization", "embed-valence-alone-controlling-matrix-object",
  ),
  ruleClaim(
    "connective-t-nonrelational-nounstem", "58.2.5", 25160, 25163,
    ["connective-t between the embed and the matrix", "matrix is not a relational nounstem"],
    "A closed compound nounstem exception licenses connective-t before a nonrelational matrix.",
    "exception", OWNER.problematic, "lexical-fact",
    "existing-lexical-authorization", "productive-connective-t-nounstem-rule",
  ),
  ruleClaim(
    "frozen-third-person-reflexive", "58.2.6", 25164, 25170,
    ["reflexive-object pronoun is frozen in a thirdperson", "incorporation of an adverbial nounstem"],
    "A closed verbstem formation freezes a third-person reflexive under adverbial incorporation.",
    "exception", OWNER.problematic, "lexical-fact",
    "existing-lexical-authorization", "subject-person-rewriting-frozen-reflexive",
  ),
  ruleClaim(
    "exclamation-preserves-unit-category", "58.3", 25171, 25195,
    ["may be particles", "NNCs, VNCs, or combinations", "vocative particle"],
    "Exclamation composes existing particle, NNC, and VNC units without changing their categories.",
    "composition-rule", OWNER.exclamation, "derived-fact",
    "existing-canonical-owner", "exclamation-as-new-result-type",
  ),
  ruleClaim(
    "haste-collocation", "58.3", 25196, 25209,
    ["exclamatory urgings for haste", "Tiā cuēl", "Mā ye cuēl"],
    "Haste expressions are a closed collocational inventory with typed segments.",
    "lexical-class", OWNER.exclamation, "lexical-fact",
    "existing-lexical-authorization", "free-string-haste-generation",
  ),
  ruleClaim(
    "vocative-e", "58.3", 25193, 25195,
    ["accented /e/", "vocative particle #e"],
    "Vocative e is a typed particle rather than punctuation or spelling residue.",
    "lexical-class", OWNER.exclamation, "lexical-fact",
    "existing-lexical-authorization", "final-e-as-automatic-vocative",
  ),
  ruleClaim(
    "mah-not-wish-ma", "58.4", 25228, 25231,
    ["particle mah, \"such that,\"", "Do not confuse these particles with the wish markers"],
    "The such-that mah operation is distinct from the wish-marker mā operation.",
    "restriction", OWNER.suchThat, "architecture-invariant",
    "existing-canonical-owner", "bare-mah-string-selecting-operation",
  ),
  ruleClaim(
    "mah-optional-in", "58.4", 25228, 25231,
    ["The adjunctor in is", "optional"],
    "The adjunctor in is a genuine optional source constituent of the such-that construction.",
    "condition", OWNER.suchThat, "genuine-user-choice",
    "existing-canonical-owner", "display-spacing-as-adjunctor-choice",
  ),
  ruleClaim(
    "negative-principal-mah-strong-negative", "58.4", 25248, 25250,
    ["negative principal clause plus mah", "strong negative"],
    "A negative principal plus mah computes strong negative polarity.",
    "composition-rule", OWNER.suchThat, "derived-fact",
    "existing-canonical-owner", "stored-translation-label-as-polarity",
  ),
  ruleClaim(
    "negative-principal-mah-ca-strong-affirmative", "58.4", 25248, 25263,
    ["negative principal clause plus mah ca#", "strong affirmative"],
    "A negative principal plus mah-ca computes strong affirmative polarity.",
    "composition-rule", OWNER.suchThat, "derived-fact",
    "existing-canonical-owner", "stored-translation-label-as-polarity",
  ),
  ruleClaim(
    "quemah-frozen-ellipsis", "58.4-note", 25264, 25274,
    ["frozen collocations", "elliptical construction", "quemahca"],
    "Quēmah and quemahca are closed frozen elliptical collocations, not productive clause surfaces.",
    "exception", OWNER.suchThat, "lexical-fact",
    "existing-lexical-authorization", "frozen-quemah-as-free-productive-template",
  ),
  ruleClaim(
    "cuix-ahzo-ahmo-principal", "58.5", 25275, 25292,
    ["cuix, ahzo, or ahmō as", "principal clause", "strong affirmative"],
    "Cuix, ahzo, and ahmō are licensed principal categories for the same such-that operation.",
    "composition-rule", OWNER.suchThat, "genuine-user-choice",
    "existing-canonical-owner", "lesson-subsection-as-separate-mah-engine",
  ),
  ruleClaim(
    "iuhqui-iuh-principal", "58.6", 25293, 25308,
    ["preterit-agentive NNC iuhqui", "preterit-tense", "VNC iuh"],
    "Iuhqui and iuh are licensed NNC and VNC principals for the shared such-that operation.",
    "composition-rule", OWNER.suchThat, "genuine-user-choice",
    "existing-canonical-owner", "solid-traditional-spelling-as-operation-authority",
  ),
  ruleClaim(
    "incorporated-noun-never-subject", "58.7", 25309, 25322,
    ["subject function was not", "There is no way", "incorporated nounstem"],
    "An incorporated nounstem can never usurp the typed personal-pronoun subject positions.",
    "restriction", OWNER.incorporatedNoun, "architecture-invariant",
    "existing-canonical-owner", "translation-noun-as-vnc-subject",
  ),
  ruleClaim(
    "active-incorporated-noun-adverbial", "58.7.1", 25323, 25368,
    ["incorporated nounstem is functioning as an adverb", "in no way represents the entity performing the action"],
    "In the active formation the incorporated nounstem has an adverbial role, never subject.",
    "operation", OWNER.incorporatedNoun, "derived-fact",
    "existing-canonical-owner", "active-translation-agent-as-incorporated-subject",
  ),
  ruleClaim(
    "nonactive-incorporated-noun-means-instrument", "58.7.2", 25369, 25392,
    ["nonactive verbstem formation", "becomes an adverb of means or instrument"],
    "In the nonactive formation the incorporated nounstem has a means or instrument role.",
    "operation", OWNER.incorporatedNoun, "derived-fact",
    "existing-canonical-owner", "passive-source-agent-preserved-as-agent",
  ),
  ruleClaim(
    "passive-agent-mention-forbidden", "58.7.2", 25382, 25392,
    ["passive-voiced VNC does not permit the mention", "prohibition against mentioning an agent"],
    "A passive VNC forbids agent mention even when its active source had a subject-as-agent.",
    "restriction", OWNER.incorporatedNoun, "architecture-invariant",
    "existing-canonical-owner", "english-passive-agent-phrase-as-license",
  ),
  ruleClaim(
    "textual-correction-diagnostic-only", "58.8", 25393, 25424,
    ["Textual Problems.", "mistakes", "This should read"],
    "Textual corrections are typed diagnostics and never productive grammar or canonical targets.",
    "documentary-example", OWNER.textualDiagnostic, "documentary-fact",
    "diagnostic-only-documentary", "corrected-documentary-string-as-generated-target",
  ),
  ruleClaim(
    "graphological-vocable-boundary", "58.8", 25425, 25440,
    ["faulty recognition of graphological-vocable", "boundaries", "This should read"],
    "Graphological-vocable boundary corrections remain diagnostic analyses of documentary text.",
    "contextual-realization", OWNER.textualDiagnostic, "documentary-fact",
    "diagnostic-only-documentary", "corrected-vocable-boundary-as-runtime-normalizer",
  ),
  ruleClaim(
    "sentence-division-reanalysis", "58.8", 25445, 25462,
    ["disregard for sentence division", "careful analysis of the text", "rephrasive parallelism"],
    "Sentence division and structural reanalysis remain diagnostic and nonproductive.",
    "documentary-example", OWNER.textualDiagnostic, "documentary-fact",
    "diagnostic-only-documentary", "editorial-reanalysis-as-canonical-sentence-generator",
  ),
]);

const NOUNSTEM_L_SOURCE_STEMS = Object.freeze([
  "te-l",
  "ca-l",
  "tle-l",
  "cē-l",
  "icpa-l",
  "cā-cā-l",
  "ah-co-l",
  "xā-l",
  "xi-l",
]);

const CLOSED_CONSTRUCTION_EXCEPTION_REQUESTS = Object.freeze([
  Object.freeze({
    constructionFamily: "ehua-retains-source-num1",
    source: Object.freeze({
      embedStem: "tzahtzi-z",
      retainedSourceNum1: "tl",
      matrixStem: "ē-hu-a",
    }),
  }),
  Object.freeze({
    constructionFamily: "ehua-retains-source-num1",
    source: Object.freeze({
      embedStem: "chōqui-z",
      retainedSourceNum1: "tl",
      matrixStem: "ē-hu-a",
    }),
  }),
  Object.freeze({
    constructionFamily: "ehua-retains-source-num1",
    source: Object.freeze({
      embedStem: "cochi-h",
      retainedSourceNum1: "tl",
      matrixStem: "ē-hua",
    }),
  }),
  Object.freeze({
    constructionFamily: "ehua-retains-source-num1",
    source: Object.freeze({
      embedStem: "tla-tla-t-huī-l-lō",
      retainedSourceNum1: "tl",
      matrixStem: "ē-hua",
    }),
  }),
  Object.freeze({
    constructionFamily: "solid-spelling-supplement",
    source: Object.freeze({
      supplementNounstem: "pōc",
      principalStem: "ē-hua-toc",
      relation: "supplementary-subject",
    }),
  }),
  Object.freeze({
    constructionFamily: "integrated-supplement",
    source: Object.freeze({
      antecessiveParticle: "ō",
      adverbialNnc: "huel",
      supplementNounstem: "tlāl",
      principalStem: "mic-ti-m-o-tēca-c",
    }),
  }),
  Object.freeze({
    constructionFamily: "connective-t-nounstem-embed",
    source: Object.freeze({
      embedNounstem: "xo-nāuh",
      connective: "t",
      matrixStem: "i-uh",
    }),
  }),
  Object.freeze({
    constructionFamily: "preterit-agentive-object-complement",
    source: Object.freeze({
      embedStem: "mic-0-t-o",
      retainedSourceNum1: "c",
      matrixStem: "cāhua",
      controller: "matrix-object",
    }),
  }),
  Object.freeze({
    constructionFamily: "preterit-agentive-object-complement",
    source: Object.freeze({
      embedStem: "petz-0-t-o",
      retainedSourceNum1: "c",
      matrixStem: "cāuh",
      controller: "matrix-object",
    }),
  }),
  ...[
    ["iuh-0", "cāhua"],
    ["iuh-0", "quetza"],
    ["iuh-0", "tēca"],
    ["pol-i-uh-0", "tlaza"],
  ].map(([embedStem, matrixStem]) => Object.freeze({
    constructionFamily: "connective-t-matrix-object-control",
    source: Object.freeze({
      embedStem,
      connective: "ti",
      matrixStem,
      controller: "matrix-object",
    }),
  })),
  Object.freeze({
    constructionFamily: "connective-t-nonrelational-nounstem",
    source: Object.freeze({
      embedNounstem: "tla-zo-h",
      connective: "ti",
      matrixNounstem: "tlāca",
      matrixRelationClass: "nonrelational",
    }),
  }),
  Object.freeze({
    constructionFamily: "frozen-third-person-reflexive",
    source: Object.freeze({
      incorporatedAdverbialNounstem: "tlāl",
      frozenReflexive: "m-0",
      matrixStem: "āhui-l-ti-ā",
    }),
  }),
]);

const REQUIRED_SOURCE_MARKERS = Object.freeze([
  "LESSON 57",
  "57.1. Nonsystemic Use of Tense",
  "Onhuetzi in mītl",
  "In tihuāllāzqueh, ye ōmic.",
  "in ye oncalaquiz tōnatiuh",
  "57.2. Irregularities in Valence",
  "āmantēcatlāliāyah",
  "57.3. Absolute Topic",
  "In zpāhyo, nehzōtlalōz.",
  "In ixāyac, chālchihuitl in tlachīhualli",
  "57.4. wck of Agreement between Supplement and Head",
  "reference wins out over grammar",
  "must be the same group of extralinguistic entities",
  "If a difference in referents exists",
  "57.5. Adverbial NNCs as Supplements",
  "Nōhuiyān nōhuiyan tlatohtōcāyōtihtiyah",
  "Xitlanāhuatīcān mā tlapiyelo",
  "51.6. The Irregular Silent Morph",
  "Tinehuihuīcān tlamatizqueh",
  "Nomati aoc tleh oc itlah",
  "57.7. The Nounstem-Fonning Suffix",
  "(te-l)-li-",
  "(ca-l)-li-",
  "(tle-l)-li-",
  "(cē-l)-li-",
  "(icpa-l)-li-",
  "(cā-cā-l)-li-",
  "(ah-co-l)-li-",
  "(xā-l)-li-",
  "(xi-l)-li-",
  "(xi-l-lan)-tli-",
  "LESSON 58",
  "58.1. Instrumental Nounstems",
  "te-nām-āz)-tli-",
  "(tepon-āz)-tli-",
  "(tla-pi-pi-l-hu-āz)-tli-",
  "(tzon-hu-āz)-tli-",
  "(tla-chpān-hu-az)-tli-",
  "(tzicua-hu-āz)-tli-",
  "tla-(pi-āz-huiā)",
  "(tepon-āz-o-ā)",
  "58.2. Problematic Constructions",
  "tlatzahtziztlēhuah",
  "Pōctlēhuatoc; pōctli mantoc.",
  "xonāuhtiuh",
  "quimmictoccāhuah",
  "tē-(pol-i-uh-Ø-ti-tlaza)",
  "titlazohtitlācatl",
  "(tlāl-m-Ø-āhui-l-ti-ā)",
  "58.3. Exclamatory Expressions",
  "Oc eh!",
  "Tiā cuēl!",
  "Mā ye cuēl!",
  "58.4. The mah Construction",
  "Āc in mah mitzīximati?",
  "Ayac mah caquimati in.",
  "quēmah and quemahca",
  "58.5. Cuix, ahzo, or ahmō",
  "58.6. Iuhqui as Principal Clause",
  "58.7. The Incorporated Noun and the Subject Function",
  "There is no way the positions filled by the subject",
  "becomes an adverb of means or instrument",
  "58.8. Textual Problems",
  "Tinēchmocnelīlīz",
  "Notlatzihuiliztica",
  "Tleh nel āyiz?",
  "Zan iz tihuītz",
  "Cuix nō nēchilnāmiquiz?",
  "rephrasive parallelism",
]);

const REQUIRED_CLAIM_FIELDS = Object.freeze([
  "ruleId",
  "section",
  "lineStart",
  "lineEnd",
  "exactSourceAnchors",
  "summary",
  "canonicalObjectKind",
  "existingTypedSource",
  "routeId",
  "sharedOperationOrInvariant",
  "factRole",
  "disposition",
  "conflictingPath",
  "proofIds",
]);
const ALLOWED_OBJECT_KINDS = new Set([
  "lexical-class",
  "source-structure",
  "operation",
  "condition",
  "restriction",
  "contextual-realization",
  "exception",
  "composition-rule",
  "documentary-example",
]);
const ALLOWED_FACT_ROLES = new Set([
  "genuine-user-choice",
  "lexical-fact",
  "derived-fact",
  "contextual-fact",
  "boundary-conditioned-fact",
  "documentary-fact",
  "architecture-invariant",
]);
const ALLOWED_DISPOSITIONS = new Set([
  "existing-canonical-owner",
  "existing-lexical-authorization",
  "diagnostic-only-documentary",
]);
const FORBIDDEN_TARGET_FIELDS = Object.freeze([
  "formula",
  "formulaString",
  "surface",
  "surfaceString",
  "written",
  "writtenForm",
  "selectedResult",
  "storedAnswer",
  "expectedAnswer",
]);

function auditClassicalNahuatlLessons5758Canvas(canvasText = "") {
  const lines = String(canvasText).split(/\r?\n/u);
  const sourceLines = lines.slice(SOURCE_LINE_START - 1, SOURCE_LINE_END);
  const sourceSlice = sourceLines.join("\n");
  const sourceSha256 = crypto.createHash("sha256").update(sourceSlice).digest("hex");
  const formulaBearingLines = sourceLines
    .map((line, index) => ({ line, lineNumber: SOURCE_LINE_START + index }))
    .filter(({ line }) => line.includes("#") && !line.startsWith("## PDF Page"))
    .map(({ lineNumber }) => lineNumber);
  const uncoveredLines = [];
  for (let lineNumber = SOURCE_LINE_START; lineNumber <= SOURCE_LINE_END; lineNumber += 1) {
    if (!SECTION_SPANS.some(span => lineNumber >= span.lineStart && lineNumber <= span.lineEnd)) {
      uncoveredLines.push(lineNumber);
    }
  }
  const missingSourceMarkers = REQUIRED_SOURCE_MARKERS.filter(marker => !sourceSlice.includes(marker));
  const routeIds = Array.from(new Set(SECTION_SPANS.map(span => span.routeId)));
  const requiredRuleSet = new Set(REQUIRED_RULE_IDS);
  const claimRuleIds = RULE_CLAIMS.map(claim => claim.ruleId);
  const claimRuleSet = new Set(claimRuleIds);
  const duplicateClaimRuleIds = claimRuleIds.filter(
    (ruleId, index) => claimRuleIds.indexOf(ruleId) !== index,
  );
  const missingClaimRuleIds = REQUIRED_RULE_IDS.filter(
    ruleId => !claimRuleSet.has(ruleId),
  );
  const extraClaimRuleIds = claimRuleIds.filter(
    ruleId => !requiredRuleSet.has(ruleId),
  );
  const invalidClaims = [];
  const missingClaimAnchors = [];
  const storedTargetAuthorityClaims = [];
  RULE_CLAIMS.forEach(claim => {
    REQUIRED_CLAIM_FIELDS.forEach(field => {
      if (!Object.prototype.hasOwnProperty.call(claim, field)) {
        invalidClaims.push(`${claim.ruleId || "unknown"}:missing-field:${field}`);
      }
    });
    if (
      !Number.isInteger(claim.lineStart)
      || !Number.isInteger(claim.lineEnd)
      || claim.lineStart < SOURCE_LINE_START
      || claim.lineEnd > SOURCE_LINE_END
      || claim.lineStart > claim.lineEnd
    ) {
      invalidClaims.push(`${claim.ruleId}:invalid-exact-span`);
      return;
    }
    const exactSpan = lines.slice(claim.lineStart - 1, claim.lineEnd).join("\n");
    if (
      !Array.isArray(claim.exactSourceAnchors)
      || claim.exactSourceAnchors.length === 0
    ) {
      invalidClaims.push(`${claim.ruleId}:missing-source-anchors`);
    } else {
      claim.exactSourceAnchors.forEach(anchor => {
        if (!anchor || !exactSpan.includes(anchor)) {
          missingClaimAnchors.push(`${claim.ruleId}:${anchor}`);
        }
      });
    }
    if (!ALLOWED_OBJECT_KINDS.has(claim.canonicalObjectKind)) {
      invalidClaims.push(`${claim.ruleId}:invalid-canonical-object-kind`);
    }
    const canonicalOwner = Object.values(OWNER).find(owner => (
      owner.routeId === claim.routeId
      && owner.operationId === claim.sharedOperationOrInvariant
    ));
    if (
      !canonicalOwner
      || claim.existingTypedSource !== canonicalOwner.sourceKind
    ) {
      invalidClaims.push(`${claim.ruleId}:parallel-or-unknown-source-kind`);
    }
    if (!ALLOWED_FACT_ROLES.has(claim.factRole)) {
      invalidClaims.push(`${claim.ruleId}:invalid-fact-role`);
    }
    if (!ALLOWED_DISPOSITIONS.has(claim.disposition)) {
      invalidClaims.push(`${claim.ruleId}:invalid-disposition`);
    }
    if (
      !claim.summary
      || !claim.routeId
      || !claim.sharedOperationOrInvariant
      || !claim.conflictingPath
    ) {
      invalidClaims.push(`${claim.ruleId}:missing-executable-disposition`);
    }
    const expectedProofIds = [
      `canvas-source:${claim.ruleId}`,
      `owner-operation:${claim.sharedOperationOrInvariant}`,
      `owner-execution:${claim.ruleId}`,
      ...(claim.disposition === "diagnostic-only-documentary"
        ? ["diagnostic-only:textual-problem"]
        : []),
    ];
    if (
      !Array.isArray(claim.proofIds)
      || claim.proofIds.join("|") !== expectedProofIds.join("|")
    ) {
      invalidClaims.push(`${claim.ruleId}:invalid-proof-ids`);
    }
    FORBIDDEN_TARGET_FIELDS.forEach(field => {
      if (Object.prototype.hasOwnProperty.call(claim, field)) {
        storedTargetAuthorityClaims.push(`${claim.ruleId}:${field}`);
      }
    });
    const diagnosticClaim = claim.section === "58.8";
    if (
      diagnosticClaim
        !== (claim.disposition === "diagnostic-only-documentary")
      || diagnosticClaim
        !== (claim.routeId === OWNER.textualDiagnostic.routeId)
    ) {
      invalidClaims.push(`${claim.ruleId}:diagnostic-boundary-mismatch`);
    }
  });
  const ruleClaimBijection =
    RULE_CLAIMS.length === REQUIRED_RULE_IDS.length
    && claimRuleSet.size === REQUIRED_RULE_IDS.length
    && duplicateClaimRuleIds.length === 0
    && missingClaimRuleIds.length === 0
    && extraClaimRuleIds.length === 0;
  return Object.freeze({
    sourceDocument: SOURCE_DOCUMENT,
    sourceLineStart: SOURCE_LINE_START,
    sourceLineEnd: SOURCE_LINE_END,
    sourceSha256,
    expectedSourceSha256: SOURCE_SHA256,
    sectionSpanCount: SECTION_SPANS.length,
    routeCount: routeIds.length,
    routeIds: Object.freeze(routeIds),
    ruleCount: REQUIRED_RULE_IDS.length,
    claimCount: RULE_CLAIMS.length,
    ruleClaimBijection,
    sourceMarkerCount: REQUIRED_SOURCE_MARKERS.length,
    formulaBearingLineCount: formulaBearingLines.length,
    expectedFormulaBearingLineCount: EXPECTED_FORMULA_BEARING_LINE_COUNT,
    missingSourceMarkers: Object.freeze(missingSourceMarkers),
    uncoveredLines: Object.freeze(uncoveredLines),
    duplicateClaimRuleIds: Object.freeze(duplicateClaimRuleIds),
    missingClaimRuleIds: Object.freeze(missingClaimRuleIds),
    extraClaimRuleIds: Object.freeze(extraClaimRuleIds),
    missingClaimAnchors: Object.freeze(missingClaimAnchors),
    invalidClaims: Object.freeze(invalidClaims),
    storedTargetAuthorityClaims: Object.freeze(storedTargetAuthorityClaims),
    diagnosticOnlyRuleIds: Object.freeze(
      RULE_CLAIMS
        .filter(claim => claim.disposition === "diagnostic-only-documentary")
        .map(claim => claim.ruleId),
    ),
    complete:
      sourceLines[0] === "LESSON 57"
      && sourceLines[25019 - SOURCE_LINE_START] === "LESSON 58"
      && sourceLines.at(-1)?.startsWith("them, like a court lady")
      && sourceSha256 === SOURCE_SHA256
      && formulaBearingLines.length === EXPECTED_FORMULA_BEARING_LINE_COUNT
      && missingSourceMarkers.length === 0
      && uncoveredLines.length === 0
      && routeIds.length === 7
      && ruleClaimBijection
      && missingClaimAnchors.length === 0
      && invalidClaims.length === 0
      && storedTargetAuthorityClaims.length === 0,
  });
}

function auditClassicalNahuatlLessons5758Runtime(target = {}) {
  const failures = [];
  const provedRuleIds = new Set();
  const executionRouteIds = new Set();
  let hostileAuthorityProofCount = 0;
  let diagnosticExecutionCount = 0;
  const applicationInventory =
    typeof target.getClassicalGrammarApplicationInventory === "function"
      ? target.getClassicalGrammarApplicationInventory()
      : null;
  const applicationOperationIds = new Set(
    applicationInventory?.operationIds || [],
  );

  const prove = (ruleIds, routeId, evaluator) => {
    const ids = Array.isArray(ruleIds) ? ruleIds : [ruleIds];
    try {
      if (evaluator() !== true) {
        ids.forEach(ruleId => {
          failures.push(`${ruleId}:owner-operation-execution-failed`);
        });
        return;
      }
      executionRouteIds.add(routeId);
      ids.forEach(ruleId => provedRuleIds.add(ruleId));
    } catch (error) {
      const reason = String(error?.message || error || "unknown-error");
      ids.forEach(ruleId => {
        failures.push(`${ruleId}:owner-operation-threw:${reason}`);
      });
    }
  };
  const proveHostile = (label, evaluator) => {
    try {
      if (evaluator() !== true) {
        failures.push(`${label}:hostile-authority-not-blocked`);
        return;
      }
      hostileAuthorityProofCount += 1;
    } catch (error) {
      failures.push(
        `${label}:hostile-proof-threw:${String(error?.message || error)}`,
      );
    }
  };
  const findOperationFrame = (frame, kind) => (
    (frame?.operationFrames || []).find(operation => operation?.kind === kind)
    || null
  );
  const buildVnc = (
    stem,
    {
      subject = "3sg",
      tense = "present",
      valence = "intransitive",
      objectKind = valence === "intransitive"
        ? "none"
        : valence === "projective-nonhuman"
          ? "nonspecific-nonhuman"
          : "specific-projective",
      objectPerson = "",
      objectRequests = [],
      verbClass = "A",
      requestedVoice = "active",
      nonactiveOptionId = "",
      sourceSubject = subject,
      sourceInitialISelection = "",
    } = {},
  ) => target.evaluateClassicalNahuatlVncApplication({
      sourceStem: stem,
      sourceSubject,
      subject,
      mood: "indicative",
      tense,
      verbClass,
      sourceValence: valence,
      objectKind,
      objectPerson,
      requestedDerivation: "direct",
      requestedVoice,
      ...(nonactiveOptionId ? { nonactiveOptionId } : {}),
      ...(sourceInitialISelection ? { sourceInitialISelection } : {}),
      ...(objectRequests.length ? { objectRequests } : {}),
    });
  const buildNnc = (stem, subject = "3sg") => (
    target.buildClassicalNahuatlAbsolutiveNncFrame(
      stem,
      {
        subject,
        nounClass: "zero",
        animacy: "nonanimate",
      },
    )
  );
  const envelope = (frame, options = {}) => (
    target.buildClassicalNahuatlSupplementationClauseEnvelope(
      frame,
      options,
    )
  );
  const particleEnvelope = (particleId, referenceId = particleId) => {
    const sourceFrame =
      target.buildClassicalNahuatlParticleSourceFrame(particleId);
    return envelope(
      target.buildClassicalNahuatlParticleResultFrame(sourceFrame),
      { referenceId },
    );
  };
  const requestSupplementation = request => (
    target.executeClassicalGrammarApplicationRequest({
      operationId: "sentence:supplementation",
      args: [request],
    }).canonicalResult
  );
  const buildFiniteVnc = tense => buildVnc("nemi", { tense });
  const buildOrdinaryNnc = stem => {
    const sourceFrame =
      target.buildClassicalNahuatlOrdinaryNncSourceFrame({ stem });
    const operationFrame =
      target.buildClassicalNahuatlOrdinaryNncOperationFrame(
        sourceFrame,
        {
          state: "absolutive",
          subject: "3sg",
          sentenceType: "statement",
          polarity: "positive",
        },
      );
    return {
      sourceFrame,
      operationFrame,
      resultFrame: target.requestClassicalOrdinaryNncResult(
        sourceFrame,
        operationFrame,
      ),
    };
  };

  const genericLaneSurvives = Boolean(
    typeof target.ANALYSIS_ROUTE !== "undefined"
    || typeof target.buildClassicalNahuatlAnalysisSourceFrame === "function"
    || typeof target.evaluateClassicalNahuatlAnalysis === "function"
    || typeof target.prepareClassicalNahuatlAnalysisPlan === "function"
    || typeof target.buildAnalysisBoundaryMetadata === "function"
    || Array.from(applicationOperationIds).some(operationId => (
      operationId.startsWith("analysis:")
    ))
    || (target.__CLASSICAL_ESM_PRELOADS__ || []).some(entry => (
      String(entry?.esmModulePath || "").includes("/analysis/")
    ))
  );
  if (genericLaneSurvives) {
    failures.push("retired-generic-analysis-lane-survives");
  }
  if (
    applicationInventory?.lessonMetadataAuthority !== false
    || applicationInventory?.formulaStringAuthority !== false
    || applicationInventory?.surfaceStringAuthority !== false
    || applicationInventory?.displayTextAuthority !== false
  ) {
    failures.push("canonical-application-external-authority-open");
  }

  const finiteVncs = {
    present: buildFiniteVnc("present"),
    preterit: buildFiniteVnc("preterit"),
    future: buildFiniteVnc("future"),
  };
  const contextualCases = [
    [
      "present-historical-past",
      "present",
      "past",
      "same",
      "historical-past",
    ],
    [
      "present-pluperfect",
      "present",
      "past",
      "prior",
      "pluperfect",
    ],
    [
      "present-future-in-past",
      "present",
      "past",
      "subsequent",
      "future-in-past",
    ],
    [
      "present-past-progressive",
      "present",
      "past",
      "concomitant",
      "past-progressive",
    ],
    [
      "preterit-priority-to-present",
      "preterit",
      "present",
      "prior",
      "priority-to-present",
    ],
    [
      "preterit-priority-to-past",
      "preterit",
      "past",
      "prior",
      "priority-to-past",
    ],
    [
      "preterit-priority-to-future",
      "preterit",
      "future",
      "prior",
      "priority-to-future",
    ],
    [
      "future-posteriority",
      "future",
      "past",
      "subsequent",
      "posteriority-to-past",
    ],
  ];
  const contextualFrames = [];
  contextualCases.forEach(
    ([ruleId, tense, referenceTime, eventRelation, timeReading]) => {
      prove(ruleId, OWNER.contextualTense.routeId, () => {
        const finiteVnc = finiteVncs[tense];
        const frame = target.interpretClassicalNahuatlVncContextualTime(
          finiteVnc,
          {
            referenceTime,
            eventRelation,
            relationScope: "concatenation",
          },
        );
        contextualFrames.push(frame);
        return Boolean(
          finiteVnc?.authorizationStatus === "authorized"
          && target.isClassicalNahuatlVncContextualTimeFrame(frame)
          && frame.timeReading === timeReading
          && frame.finiteTense === tense
          && frame.finiteTensePreserved === true
          && frame.changesFiniteMorphology === false
          && frame.formulaRealization
            === finiteVnc.resultFrame?.formulaRealization
          && frame.surfaceRealization
            === finiteVnc.resultFrame?.surfaceRealization
          && frame.formulaProjectionSource
            === "owner-issued-vnc-typed-slot-result"
          && frame.writtenProjectionSource
            === "owner-issued-vnc-boundary-realization-result"
        );
      });
    },
  );
  prove(
    ["tense-is-not-time", "neighbor-context-may-shift-time-reading"],
    OWNER.contextualTense.routeId,
    () => (
      contextualFrames.length === contextualCases.length
      && contextualFrames.every(frame => (
        frame.authorizationStatus === "authorized"
        && frame.finiteTensePreserved === true
        && frame.changesFiniteMorphology === false
        && frame.contextualFactIsUserChoice === false
      ))
    ),
  );
  prove("future-imminence-with-ye", OWNER.contextualTense.routeId, () => {
    const yeSource =
      target.buildClassicalNahuatlParticleSourceFrame("l3-ye");
    const ye =
      target.buildClassicalNahuatlParticleResultFrame(yeSource);
    const frame = target.interpretClassicalNahuatlVncContextualTime(
      finiteVncs.future,
      {
        referenceTime: "present",
        eventRelation: "immediately-prior",
        relationScope: "neighboring-vnc",
        yeParticleResult: ye,
      },
    );
    const withoutYe = target.interpretClassicalNahuatlVncContextualTime(
      finiteVncs.future,
      {
        referenceTime: "present",
        eventRelation: "immediately-prior",
        relationScope: "neighboring-vnc",
      },
    );
    return Boolean(
      target.isClassicalNahuatlVncContextualTimeFrame(frame)
      && frame.timeReading === "imminent"
      && withoutYe.authorizationStatus === "blocked"
      && withoutYe.blockReason
        === "future-imminence-requires-owner-issued-ye-particle"
    );
  });
  proveHostile("57.1-contextual-time", () => {
    const copied = JSON.parse(JSON.stringify(finiteVncs.present));
    const copiedFrame = target.interpretClassicalNahuatlVncContextualTime(
      copied,
      {
        referenceTime: "past",
        eventRelation: "same",
        relationScope: "discourse",
      },
    );
    const poisoned = target.interpretClassicalNahuatlVncContextualTime(
      finiteVncs.present,
      {
        referenceTime: "past",
        eventRelation: "same",
        relationScope: "discourse",
        surface: "attacker",
      },
    );
    return copiedFrame.authorizationStatus === "blocked"
      && poisoned.authorizationStatus === "blocked";
  });

  prove("true-valence-exception", OWNER.irregularValence.routeId, () => (
    ["itt-a", "cuā"].every(sourceStem => {
      const frame = target.buildClassicalNahuatlValenceSourceAnalysis({
        sourceStem,
        observedValence: "intransitive",
      });
      return target.isClassicalNahuatlValenceSourceAnalysisFrame(frame)
        && frame.classification === "true-irregular-valence"
        && frame.sourceStructure === "simple-verbstem";
    })
  ));
  prove(
    "compound-object-not-valence-exception",
    OWNER.irregularValence.routeId,
    () => {
      const frame = target.buildClassicalNahuatlValenceSourceAnalysis({
        sourceStem: "",
        observedValence: "transitive",
        incorporatedObjectStem: "ā-man-tē-0-ca-yō",
        matrixStem: "tlāliā",
      });
      return target.isClassicalNahuatlValenceSourceAnalysisFrame(frame)
        && frame.classification
          === "incorporated-compound-nounstem-object-not-irregular"
        && frame.sourceStructure
          === "incorporated-object-plus-transitive-matrix";
    },
  );
  proveHostile("57.2-valence-source", () => {
    const unknown = target.buildClassicalNahuatlValenceSourceAnalysis({
      sourceStem: "attacker",
      observedValence: "intransitive",
    });
    const poisoned = target.buildClassicalNahuatlValenceSourceAnalysis({
      sourceStem: "itt-a",
      observedValence: "intransitive",
      translation: "authorize",
    });
    return unknown.authorizationStatus === "blocked"
      && poisoned.authorizationStatus === "blocked";
  });

  const commentClause = envelope(
    buildVnc("nemi"),
    { referenceId: "comment-referent" },
  );
  const absoluteTopicRecord =
    target.buildClassicalNahuatlSupplementationContextRecord({
      kind: "absolute-topic",
      referenceId: "topic-referent",
    });
  const absoluteTopicClause = envelope(
    buildVnc("chōca"),
    {
      referenceId: "topic-referent",
      contextRecords: [absoluteTopicRecord],
    },
  );
  prove(
    "absolute-topic-no-comment-relation",
    OWNER.absoluteTopic.routeId,
    () => {
      const frame = requestSupplementation({
        operationKind: "relation",
        principalClause: commentClause,
        supplementClause: absoluteTopicClause,
        options: {
          referenceMode: "absolute-topic",
          headRole: "subject",
          supplementContactRole: "subject",
          order: "supplement-first",
        },
      });
      const operation = findOperationFrame(
        frame,
        "classical-nahuatl-topic-comment-relation-frame",
      );
      return target.isClassicalNahuatlSupplementationFrame(frame)
        && operation?.relation === "absolute-topic"
        && operation.topicRelationToComment === "none"
        && operation.supplementRelation === false;
    },
  );
  prove(
    "topicalized-modification-head-contrast",
    OWNER.absoluteTopic.routeId,
    () => {
      const principal = envelope(
        buildVnc("nemi"),
        { referenceId: "shared-topic-referent" },
      );
      const supplement = envelope(
        buildVnc("chōca"),
        { referenceId: "shared-topic-referent" },
      );
      const frame = requestSupplementation({
        operationKind: "relation",
        principalClause: principal,
        supplementClause: supplement,
        options: {
          referenceMode: "shared",
          headRole: "subject",
          supplementContactRole: "subject",
          order: "supplement-first",
        },
      });
      const operation = findOperationFrame(
        frame,
        "classical-nahuatl-topic-comment-relation-frame",
      );
      return target.isClassicalNahuatlSupplementationFrame(frame)
        && operation?.relation
          === "topicalized-supplement-or-modification-head"
        && operation.topicRelationToComment === "grammatical-head"
        && operation.supplementRelation === true;
    },
  );

  const personMismatchPrincipal = envelope(
    buildVnc("nemi", { subject: "3pl" }),
    { referenceId: "shared-person-referent" },
  );
  const maleBondingContext =
    target.buildClassicalNahuatlSupplementationContextRecord({
      kind: "male-bonding",
      referenceId: "shared-person-referent",
      discourseSourceContextFrame:
        target.buildClassicalNahuatlDiscourseSourceContextFrame({
          speakerGender: "male",
          speakerGroupMembership: "member",
        }),
    });
  const personMismatchSupplement = envelope(
    target.buildClassicalNahuatlAbsolutiveNncFrame(
      "oquich",
      {
        subject: "1pl",
        nounClass: "tli",
        animacy: "animate",
        pluralConnector: "t-in",
      },
    ),
    {
      referenceId: "shared-person-referent",
      contextRecords: [maleBondingContext],
    },
  );
  const personMismatch = requestSupplementation({
    operationKind: "relation",
    principalClause: personMismatchPrincipal,
    supplementClause: personMismatchSupplement,
    options: {
      referenceMode: "shared",
      headRole: "subject",
      supplementContactRole: "subject",
      agreementException: "male-bonding",
    },
  });
  const numberMismatchPrincipal = envelope(
    buildVnc("nemi", { subject: "3pl" }),
    { referenceId: "shared-number-referent" },
  );
  const numberMismatchSupplement = envelope(
    buildNnc("mochi", "3sg"),
    { referenceId: "shared-number-referent" },
  );
  const numberMismatch = requestSupplementation({
    operationKind: "relation",
    principalClause: numberMismatchPrincipal,
    supplementClause: numberMismatchSupplement,
    options: {
      referenceMode: "shared",
      headRole: "subject",
      supplementContactRole: "subject",
      agreementException: "collective",
    },
  });
  prove("person-mismatch", OWNER.agreement.routeId, () => (
    findOperationFrame(
      personMismatch,
      "classical-nahuatl-referent-conditioned-agreement-frame",
    )?.mismatchDimensions?.includes("person") === true
  ));
  prove("number-mismatch", OWNER.agreement.routeId, () => (
    findOperationFrame(
      numberMismatch,
      "classical-nahuatl-referent-conditioned-agreement-frame",
    )?.mismatchDimensions?.includes("number") === true
  ));

  const nonspecificObjectPrincipal = envelope(
    buildVnc(
      "tōca",
      {
        valence: "projective-nonhuman",
        objectKind: "nonspecific-nonhuman",
      },
    ),
    {
      referenceId: "actor",
      objectReferenceId: "adverbial-object",
    },
  );
  const adverbialPotential = target.prepareClassicalAdverbialNncSource({
    stem: "huel",
    clauseKind: "nnc-absolutive",
  });
  const adverbialResult = target.requestClassicalAdverbialNncResult({
    adverbialPotentialFrame: adverbialPotential,
  });
  const adverbialClause = envelope(
    adverbialResult,
    { referenceId: "adverbial-object" },
  );
  const adverbialRelation = requestSupplementation({
    operationKind: "relation",
    principalClause: nonspecificObjectPrincipal,
    supplementClause: adverbialClause,
    options: {
      referenceMode: "shared",
      headRole: "object",
      supplementContactRole: "subject",
    },
  });
  prove("specificity-mismatch", OWNER.agreement.routeId, () => (
    findOperationFrame(
      adverbialRelation,
      "classical-nahuatl-referent-conditioned-agreement-frame",
    )?.mismatchDimensions?.includes("specificity") === true
  ));
  prove(
    "same-extralinguistic-referent-required",
    OWNER.agreement.routeId,
    () => {
      const principal = envelope(
        buildVnc("nemi", { subject: "3sg" }),
        { referenceId: "referent-a" },
      );
      const supplement = envelope(
        buildVnc("chōca", { subject: "3pl" }),
        { referenceId: "referent-b" },
      );
      const frame = requestSupplementation({
        operationKind: "relation",
        principalClause: principal,
        supplementClause: supplement,
        options: {
          referenceMode: "shared",
          headRole: "subject",
          supplementContactRole: "subject",
        },
      });
      return frame == null || (
        frame.authorizationStatus === "blocked"
        && frame.blockReason === "shared-referent-identity-mismatch"
      );
    },
  );
  prove(
    "specific-supplement-nonspecific-impersonal-head",
    OWNER.agreement.routeId,
    () => {
      const principal = envelope(
        buildVnc("nēci", {
          sourceSubject: "2pl",
          subject: "3sg",
          verbClass: "B",
          requestedVoice: "impersonal",
          nonactiveOptionId: "o-hua:nex-o-hua",
        }),
        { referenceId: "specificized-impersonal" },
      );
      const supplement = envelope(
        buildNnc("pah"),
        { referenceId: "specificized-impersonal" },
      );
      const frame = requestSupplementation({
        operationKind: "relation",
        principalClause: principal,
        supplementClause: supplement,
        options: {
          referenceMode: "shared",
          headRole: "subject",
          supplementContactRole: "subject",
        },
      });
      const operation = findOperationFrame(
        frame,
        "classical-nahuatl-referent-conditioned-agreement-frame",
      );
      return target.isClassicalNahuatlSupplementationFrame(frame)
        && principal.subject?.features?.specificity === "nonspecific"
        && supplement.subject?.features?.specificity === "specific"
        && operation?.mismatchDimensions?.includes("specificity") === true;
    },
  );
  proveHostile("57.3-57.4-supplementation", () => {
    const copiedTopic = JSON.parse(JSON.stringify(absoluteTopicClause));
    const frame = target.evaluateClassicalNahuatlSupplementationOperation({
      operationKind: "relation",
      principalClause: commentClause,
      supplementClause: copiedTopic,
      options: {
        referenceMode: "absolute-topic",
        headRole: "subject",
        supplementContactRole: "subject",
        order: "supplement-first",
      },
    });
    const poisonedDiscourseContext =
      target.buildClassicalNahuatlDiscourseSourceContextFrame({
        speakerGender: "male",
        speakerGroupMembership: "member",
        storedFormula: "#attacker#",
      });
    const rawContextRecord =
      target.buildClassicalNahuatlSupplementationContextRecord({
        kind: "male-bonding",
        referenceId: "shared-person-referent",
        speakerGender: "male",
        speakerIsGroupMember: true,
      });
    const copiedContextRecord =
      target.buildClassicalNahuatlSupplementationContextRecord({
        kind: "male-bonding",
        referenceId: "shared-person-referent",
        discourseSourceContextFrame: {
          ...maleBondingContext.discourseSourceContextFrame,
        },
      });
    return frame.authorizationStatus === "blocked"
      && poisonedDiscourseContext.authorizationStatus === "blocked"
      && poisonedDiscourseContext.blockReason
        === "unrecognized-discourse-source-context-field:storedFormula"
      && rawContextRecord.authorizationStatus === "blocked"
      && rawContextRecord.blockReason
        === "raw-supplementation-context-authority-rejected"
      && copiedContextRecord.authorizationStatus === "blocked"
      && copiedContextRecord.blockReason
        === "owner-issued-discourse-source-context-required";
  });

  prove("adverbial-nnc-supplement", OWNER.adverbialNnc.routeId, () => {
    const operation = findOperationFrame(
      adverbialRelation,
      "classical-nahuatl-adverbial-nnc-relation-frame",
    );
    return target.isClassicalNahuatlSupplementationFrame(adverbialRelation)
      && operation?.relation === "supplementary-object"
      && operation.directPersonalHeadPresent === true
      && operation.deletedSpeechHead === false;
  });
  const adverbialModifier =
    target.buildClassicalNahuatlSupplementationAdverbialModifierFrame(
      adverbialClause,
      { adverbialRole: "manner" },
    );
  prove(
    "ordinary-adverbial-modifier-contrast",
    OWNER.adverbialNnc.routeId,
    () => (
      target.isClassicalNahuatlSupplementationAdverbialModifierFrame(
        adverbialModifier,
      )
      && adverbialModifier.adverbialRole === "manner"
      && adverbialModifier.clause === adverbialClause
    ),
  );
  prove("deleted-speech-head-contrast", OWNER.adverbialNnc.routeId, () => {
    const reported = envelope(
      buildVnc("yā", { subject: "3pl", tense: "preterit" }),
      {
        referenceId: "reported-event",
        sentenceKind: "assertion",
      },
    );
    const sayingMultiple = buildVnc(
      "ilhuia",
      {
        subject: "1sg",
        valence: "multiple-object",
        objectRequests: [{
          objectId: "reported-supplement",
          objectKind: "specific-projective",
          objectPerson: "3sg",
          governor: "directive",
          derivationalLevel: 1,
        }, {
          objectId: "addressees",
          objectKind: "specific-projective",
          objectPerson: "3pl",
          governor: "applicative",
          derivationalLevel: 2,
        }],
        sourceInitialISelection: "real",
      },
    );
    const saying = envelope(
      sayingMultiple,
      {
        referenceId: "speaker",
        subjectReferenceId: "speaker",
        objectReferenceIds: {
          "reported-supplement": "reported-event",
          addressees: "addressees",
        },
      },
    );
    const deletedSupplementation = requestSupplementation({
      operationKind: "relation",
      principalClause: saying,
      supplementClause: reported,
      options: {
        referenceMode: "included",
        headRole: "object",
        principalObjectId: "reported-supplement",
        speechDirectness: "direct",
      },
    });
    const frame = requestSupplementation({
      operationKind: "deleted-principal",
      visiblePrincipalClause: adverbialModifier,
      deletedPrincipalClause: saying,
      supplementClause: reported,
      options: {
        deletionKind: "saying-adverb-only",
        speechDirectness: "direct",
        deletedSupplementationFrame: deletedSupplementation,
      },
    });
    return target.isClassicalNahuatlDeletedPrincipalFrame(frame)
      && frame.adverbOnlyPrincipal === true
      && frame.supplementHasNoDirectRelationToVisiblePrincipal === true
      && frame.adverbialNncRelationFrame?.relation
        === "deleted-principal-speech-head"
      && frame.adverbialNncRelationFrame?.deletedSpeechHead === true;
  });

  const soundedFirstPrincipal = envelope(
    buildVnc("nemi", { subject: "1sg" }),
    { referenceId: "speaker" },
  );
  const soundedFirstSupplement = envelope(
    buildVnc("mati", { subject: "1sg" }),
    { referenceId: "speaker" },
  );
  prove(
    "silent-first-person-after-sounded-first-person",
    OWNER.silentFirstPerson.routeId,
    () => {
      const frame = requestSupplementation({
        operationKind: "relation",
        principalClause: soundedFirstPrincipal,
        supplementClause: soundedFirstSupplement,
        options: {
          referenceMode: "shared",
          headRole: "subject",
          supplementContactRole: "subject",
          order: "principal-first",
          contextualSilentFirstPerson: true,
        },
      });
      const operation = findOperationFrame(
        frame,
        "classical-nahuatl-contextual-silent-first-person-frame",
      );
      return target.isClassicalNahuatlSupplementationFrame(frame)
        && operation?.license
          === "prior-sounded-coreferential-first-person"
        && operation.thirdPersonFallbackAllowed === false
        && operation.contextualProjection
          ?.formulaAndWrittenGeneratedIndependently === true;
    },
  );
  prove(
    "first-person-reflexive-independent-license",
    OWNER.silentFirstPerson.routeId,
    () => {
      const reflexive = envelope(
        buildVnc(
          "mati",
          {
            subject: "1sg",
            valence: "mainline-reflexive",
            objectKind: "reflexive",
            objectPerson: "1sg",
          },
        ),
        { referenceId: "reflexive-speaker" },
      );
      const frame = requestSupplementation({
        operationKind: "contextual-first-person-realization",
        principalClause: reflexive,
        options: {
          contextualSilentFirstPerson: true,
        },
      });
      const operation = findOperationFrame(
        frame,
        "classical-nahuatl-contextual-silent-first-person-frame",
      );
      return target.isClassicalNahuatlSupplementationFrame(frame)
        && operation?.license
          === "distinctive-first-person-reflexive-object"
        && operation.contextRelation === "independent-reflexive"
        && frame.formulaRealization === "#0-0+n-o(mati)0+0-0#"
        && frame.surfaceRealization === "Nomati."
        && operation.contextualProjection
          ?.formulaAndWrittenGeneratedIndependently === true;
    },
  );

  prove("nounstem-l-no-nonactive-source", OWNER.nounstemL.routeId, () => (
    NOUNSTEM_L_SOURCE_STEMS.every(stem => {
      const {
        sourceFrame,
        resultFrame,
      } = buildOrdinaryNnc(stem);
      const plan = target.prepareClassicalOrdinaryNncParadigmPlan(
        sourceFrame,
        {
          states: ["absolutive", "possessive"],
          subjects: [
            "1sg",
            "2sg",
            "3sg",
            "3common",
            "1pl",
            "2pl",
            "3pl",
          ],
          possessors: ["1sg", "2sg", "3sg", "1pl", "2pl", "3pl"],
          sentenceType: "statement",
          polarity: "positive",
        },
      );
      const coordinates =
        target.projectClassicalOrdinaryNncParadigmCoordinates(plan);
      return target.isClassicalNahuatlOrdinaryNncSourceFrame(sourceFrame)
        && target.isClassicalNahuatlOrdinaryNncResult(resultFrame)
        && sourceFrame.lexicalFormation === "lexical-nounstem-l"
        && sourceFrame.boundaryFacts?.inferredNonactiveSource === false
        && plan?.authorizationStatus === "authorized"
        && coordinates?.length === plan.coordinateCount
        && coordinates.every(coordinate => (
          coordinate.scalarEvaluatorIdentity
            === "evaluateClassicalNahuatlOrdinaryNnc"
          && coordinate.authorizationStatus === "authorized"
          && coordinate.formulaRealization
          && coordinate.surfaceRealization
        ));
    })
  ));
  proveHostile("57.7-nounstem-l", () => {
    const unknown =
      target.buildClassicalNahuatlOrdinaryNncSourceFrame({
        stem: "attacker-l",
      });
    const poisoned =
      target.buildClassicalNahuatlOrdinaryNncSourceFrame({
        stem: "te-l",
        formula: "#attacker#",
      });
    return unknown.authorizationStatus === "blocked"
      && poisoned.authorizationStatus === "blocked";
  });

  const instrumentalSources =
    target.getClassicalNahuatlCanonicalSourceStemInventory("nnc")
      .filter(record => record.sourceSection === "58.1");
  const instrumentalAuthorizations = instrumentalSources.map(record => ({
    record,
    ordinary: buildOrdinaryNnc(record.stem),
    authorization:
      target.buildClassicalNahuatlInstrumentalAzSourceAuthorization(
        record.stem,
      ),
  }));
  prove(
    "restricted-instrumental-az-matrix",
    OWNER.instrumentalAz.routeId,
    () => (
      instrumentalSources.length === 34
      && instrumentalAuthorizations.every(({
        ordinary,
        authorization,
      }) => (
        target.isClassicalNahuatlOrdinaryNncResult(ordinary.resultFrame)
        && (
          target.isClassicalNahuatlInstrumentalAzSourceAuthorization(
            authorization,
          )
          || ["āz-ca", "ah-āz"].includes(ordinary.sourceFrame.stem)
          && authorization.authorizationStatus === "blocked"
        )
      ))
      && instrumentalAuthorizations.filter(({
        authorization,
      }) => (
        target.isClassicalNahuatlInstrumentalAzSourceAuthorization(
          authorization,
        )
      )).length === 32
    ),
  );
  prove(
    "connective-hu-after-l-n-a",
    OWNER.instrumentalAz.routeId,
    () => {
      const expected = new Map([
        ["mamal-hu-āz", "hu-after-l"],
        ["tzon-hu-āz", "hu-after-n"],
        ["tla-chpān-hu-az", "hu-after-n"],
        ["tzicua-hu-āz", "hu-after-a"],
        ["pi-āz", "none"],
      ]);
      return Array.from(expected).every(([stem, connectorClass]) => {
        const frame =
          target.buildClassicalNahuatlInstrumentalAzSourceAuthorization(
            stem,
          );
        return target.isClassicalNahuatlInstrumentalAzSourceAuthorization(
          frame,
        )
          && frame.connectorClass === connectorClass
          && frame.connectorIsUserChoice === false;
      });
    },
  );
  const continuationProofs = [];
  instrumentalAuthorizations.forEach(({ record, authorization }) => {
    if (
      !target.isClassicalNahuatlInstrumentalAzSourceAuthorization(
        authorization,
      )
    ) {
      return;
    }
    authorization.licensedContinuations.forEach(continuation => {
      const operationId = continuation === "huiā"
        ? "applicative-huia-use"
        : "intransitive-o-a-use";
      const request = {
        nounStem: record.stem,
        sourceKind: "nounstem",
        sourceState: "absolutive",
        subject: "1sg",
        mood: "indicative",
        tense: "present",
        objectPeople: continuation === "huiā" ? ["3sg"] : [],
        operationId,
        outputScope: "single",
      };
      const scalar = target.requestClassicalDenominalVncResult(request);
      const plan = target.prepareClassicalDenominalVncParadigmPlan({
        ...request,
        outputScope: "paradigm",
      });
      const coordinates = [
        { subject: "1sg", mood: "indicative", tense: "present" },
        { subject: "3sg", mood: "indicative", tense: "preterit" },
        { subject: "2pl", mood: "indicative", tense: "future" },
      ];
      const projected =
        target.projectClassicalDenominalVncParadigmCoordinates(
          plan,
          coordinates,
        );
      const pointwise = coordinates.map(coordinate => (
        target.requestClassicalDenominalVncResult({
          ...request,
          ...coordinate,
          outputScope: "single",
        })
      ));
      continuationProofs.push({
        continuation,
        authorized: scalar.authorizationStatus === "authorized"
          && scalar.formulaRealization
          && scalar.surfaceRealization
          && plan.authorizationStatus === "authorized"
          && projected.length === pointwise.length
          && projected.every((coordinate, index) => (
            coordinate.formulaRealization
              === pointwise[index].formulaRealization
            && coordinate.surfaceRealization
              === pointwise[index].surfaceRealization
          )),
      });
    });
  });
  prove(
    "instrumental-huia-continuation",
    OWNER.instrumentalAz.routeId,
    () => (
      continuationProofs.filter(proof => proof.continuation === "huiā")
        .length === 31
      && continuationProofs
        .filter(proof => proof.continuation === "huiā")
        .every(proof => proof.authorized)
    ),
  );
  prove(
    "instrumental-oa-continuation",
    OWNER.instrumentalAz.routeId,
    () => (
      continuationProofs.filter(proof => proof.continuation === "o-ā")
        .length === 2
      && continuationProofs
        .filter(proof => proof.continuation === "o-ā")
        .every(proof => proof.authorized)
    ),
  );
  proveHostile("58.1-instrumental", () => {
    const unknown =
      target.buildClassicalNahuatlInstrumentalAzSourceAuthorization(
        "attacker-āz",
      );
    const continuation = target.requestClassicalDenominalVncResult({
      nounStem: "attacker-āz",
      sourceKind: "nounstem",
      sourceState: "absolutive",
      subject: "1sg",
      mood: "indicative",
      tense: "present",
      objectPeople: ["3sg"],
      operationId: "applicative-huia-use",
      outputScope: "single",
    });
    return (unknown == null || unknown.authorizationStatus === "blocked")
      && (
        continuation == null
        || continuation.authorizationStatus === "blocked"
      );
  });

  const closedExceptionFrames =
    CLOSED_CONSTRUCTION_EXCEPTION_REQUESTS.map(request => (
      target.validateClassicalNahuatlClosedConstructionException(request)
    ));
  const proveExceptionFamily = (ruleId, constructionFamilies) => prove(
    ruleId,
    OWNER.problematic.routeId,
    () => {
      const selected = CLOSED_CONSTRUCTION_EXCEPTION_REQUESTS
        .map((request, index) => ({
          request,
          frame: closedExceptionFrames[index],
        }))
        .filter(({ request }) => (
          constructionFamilies.includes(request.constructionFamily)
        ));
      return selected.length > 0 && selected.every(({ frame }) => (
        target.isClassicalNahuatlClosedConstructionExceptionValidation(
          frame,
        )
        && frame.formulaStringAuthority === false
        && frame.surfaceStringAuthority === false
        && frame.callerSuppliedAuthorityAccepted === false
      ));
    },
  );
  proveExceptionFamily(
    "ehua-keeps-source-num1",
    ["ehua-retains-source-num1"],
  );
  proveExceptionFamily(
    "solid-spelling-not-incorporation",
    ["solid-spelling-supplement", "integrated-supplement"],
  );
  proveExceptionFamily(
    "connective-t-nounstem-embed",
    ["connective-t-nounstem-embed"],
  );
  proveExceptionFamily(
    "preterit-agentive-object-complement-keeps-c",
    ["preterit-agentive-object-complement"],
  );
  proveExceptionFamily(
    "matrix-object-controls-deleted-embed-subject",
    ["connective-t-matrix-object-control"],
  );
  proveExceptionFamily(
    "connective-t-nonrelational-nounstem",
    ["connective-t-nonrelational-nounstem"],
  );
  proveExceptionFamily(
    "frozen-third-person-reflexive",
    ["frozen-third-person-reflexive"],
  );
  proveHostile("58.2-closed-exceptions", () => {
    const copied = JSON.parse(JSON.stringify(closedExceptionFrames[0]));
    const unknown =
      target.validateClassicalNahuatlClosedConstructionException({
        constructionFamily: "ehua-retains-source-num1",
        source: {
          embedStem: "attacker",
          retainedSourceNum1: "tl",
          matrixStem: "ē-hu-a",
        },
      });
    const poisoned =
      target.validateClassicalNahuatlClosedConstructionException({
        ...CLOSED_CONSTRUCTION_EXCEPTION_REQUESTS[0],
        formula: "#attacker#",
      });
    return target
      .isClassicalNahuatlClosedConstructionExceptionValidation(copied)
      === false
      && unknown.authorizationStatus === "blocked"
      && poisoned.authorizationStatus === "blocked";
  });

  const hasteParticle = particleEnvelope("l58-tia-cuel-ehhuatl");
  prove("haste-collocation", OWNER.exclamation.routeId, () => {
    const frame = requestSupplementation({
      operationKind: "exclamatory-utterance",
      constituents: [hasteParticle],
    });
    const operation = findOperationFrame(
      frame,
      "classical-nahuatl-exclamatory-composition-frame",
    );
    return target.isClassicalNahuatlSupplementationFrame(frame)
      && operation?.closedCollocation === true
      && operation.unitKinds?.join("|") === "particle";
  });
  prove(
    "exclamation-preserves-unit-category",
    OWNER.exclamation.routeId,
    () => {
      const particle = particleEnvelope("l3-hue", "particle-exclamation");
      const nnc = envelope(buildNnc("pah"), { referenceId: "nnc-exclamation" });
      const vnc = envelope(
        buildVnc("chōca"),
        { referenceId: "vnc-exclamation" },
      );
      const frame = requestSupplementation({
        operationKind: "exclamatory-utterance",
        constituents: [particle, nnc, vnc],
      });
      const operation = findOperationFrame(
        frame,
        "classical-nahuatl-exclamatory-composition-frame",
      );
      return target.isClassicalNahuatlSupplementationFrame(frame)
        && operation?.unitKinds?.join("|") === "particle|nnc|vnc"
        && frame.projectionsGeneratedIndependently === true;
    },
  );
  prove("vocative-e", OWNER.exclamation.routeId, () => {
    const vocativeParticle = particleEnvelope(
      "l3-e-vocative",
      "vocative-particle",
    );
    const frame = requestSupplementation({
      operationKind: "exclamatory-utterance",
      constituents: [vocativeParticle],
    });
    return target.isClassicalNahuatlSupplementationFrame(frame)
      && vocativeParticle.unitKind === "particle"
      && vocativeParticle.formulaSegments?.includes("#e")
      && frame.projectionsGeneratedIndependently === true;
  });

  const suchThatSupplement = envelope(
    buildVnc("nemi", { subject: "1sg" }),
    { referenceId: "such-that-event" },
  );
  const mah = particleEnvelope("l3-mah");
  const mahCa = particleEnvelope("l58-mah-ca");
  const adjunctorIn = particleEnvelope("l3-in");
  const cuix = particleEnvelope("l3-cuix");
  prove("mah-not-wish-ma", OWNER.suchThat.routeId, () => {
    const wishMa = particleEnvelope("l3-ma");
    const authorized = requestSupplementation({
      operationKind: "such-that-adjunction",
      principalClause: cuix,
      supplementClause: suchThatSupplement,
      markerClause: mah,
    });
    const blockedWish = requestSupplementation({
      operationKind: "such-that-adjunction",
      principalClause: cuix,
      supplementClause: suchThatSupplement,
      markerClause: wishMa,
    });
    return target.isClassicalNahuatlSupplementationFrame(authorized)
      && (
        blockedWish == null
        || blockedWish.authorizationStatus === "blocked"
      );
  });
  prove("mah-optional-in", OWNER.suchThat.routeId, () => {
    const withoutIn = requestSupplementation({
      operationKind: "such-that-adjunction",
      principalClause: cuix,
      supplementClause: suchThatSupplement,
      markerClause: mah,
    });
    const withIn = requestSupplementation({
      operationKind: "such-that-adjunction",
      principalClause: cuix,
      supplementClause: suchThatSupplement,
      markerClause: mah,
      adjunctorClause: adjunctorIn,
    });
    return target.isClassicalNahuatlSupplementationFrame(withoutIn)
      && target.isClassicalNahuatlSupplementationFrame(withIn)
      && findOperationFrame(
        withoutIn,
        "classical-nahuatl-such-that-adjunction-frame",
      )?.optionalAdjunctorInPresent === false
      && findOperationFrame(
        withIn,
        "classical-nahuatl-such-that-adjunction-frame",
      )?.optionalAdjunctorInPresent === true;
  });
  const ahmo = particleEnvelope("l58-ahmo");
  prove(
    "negative-principal-mah-strong-negative",
    OWNER.suchThat.routeId,
    () => {
      const frame = requestSupplementation({
        operationKind: "such-that-adjunction",
        principalClause: ahmo,
        supplementClause: suchThatSupplement,
        markerClause: mah,
      });
      return target.isClassicalNahuatlSupplementationFrame(frame)
        && frame.computedPolarity === "strong-negative";
    },
  );
  prove(
    "negative-principal-mah-ca-strong-affirmative",
    OWNER.suchThat.routeId,
    () => {
      const frame = requestSupplementation({
        operationKind: "such-that-adjunction",
        principalClause: ahmo,
        supplementClause: suchThatSupplement,
        markerClause: mahCa,
      });
      return target.isClassicalNahuatlSupplementationFrame(frame)
        && frame.computedPolarity === "strong-affirmative"
        && frame.linearizationFrame
          ?.negativePrefixBoundaryPreservedInFormula === true
        && frame.linearizationFrame
          ?.contextualBoundarySpellingAppliedToWritten === true;
    },
  );
  prove("quemah-frozen-ellipsis", OWNER.suchThat.routeId, () => (
    ["l58-quemah", "l58-quemahca"].every(particleId => {
      const frame = requestSupplementation({
        operationKind: "such-that-adjunction",
        principalClause: particleEnvelope(particleId),
      });
      return target.isClassicalNahuatlSupplementationFrame(frame)
        && frame.frozenEllipsis === true
        && findOperationFrame(
          frame,
          "classical-nahuatl-such-that-frozen-ellipsis-frame",
        )?.userSelectable === false;
    })
  ));
  prove("cuix-ahzo-ahmo-principal", OWNER.suchThat.routeId, () => (
    [
      ["l3-cuix", "cuix"],
      ["l3-ahzo", "ahzo"],
      ["l58-ahmo", "ahmo"],
    ].every(([particleId, identity]) => {
      const frame = requestSupplementation({
        operationKind: "such-that-adjunction",
        principalClause: particleEnvelope(particleId),
        supplementClause: suchThatSupplement,
        markerClause: mah,
      });
      return target.isClassicalNahuatlSupplementationFrame(frame)
        && frame.principalIdentity === identity;
    })
  ));
  prove("iuhqui-iuh-principal", OWNER.suchThat.routeId, () => {
    const principals = [
      envelope(buildNnc("iuhqui"), { referenceId: "iuhqui-principal" }),
      envelope(buildVnc("iuh", {
        sourceInitialISelection: "real",
      }), { referenceId: "iuh-principal" }),
    ];
    return principals.every(principalClause => {
      const frame = requestSupplementation({
        operationKind: "such-that-adjunction",
        principalClause,
        supplementClause: suchThatSupplement,
        markerClause: mah,
      });
      return target.isClassicalNahuatlSupplementationFrame(frame)
        && ["iuhqui", "iuh"].includes(frame.principalIdentity);
    });
  });
  proveHostile("58.3-58.6-supplementation", () => {
    const copiedMarker = JSON.parse(JSON.stringify(mah));
    const copiedFrame = target.evaluateClassicalNahuatlSupplementationOperation({
      operationKind: "such-that-adjunction",
      principalClause: cuix,
      supplementClause: suchThatSupplement,
      markerClause: copiedMarker,
    });
    const forgedExclamation =
      target.evaluateClassicalNahuatlSupplementationOperation({
        operationKind: "exclamatory-utterance",
        constituents: [{
          kind: "classical-nahuatl-supplementation-clause-envelope",
          formulaRealization: "#attacker#",
          surface: "attacker",
        }],
      });
    return copiedFrame.authorizationStatus === "blocked"
      && forgedExclamation.authorizationStatus === "blocked";
  });

  const buildIncorporatedVnc = voice => (
    target.requestClassicalNominalConstructionResult({
      constructionKind: "nominal-embed-vnc",
      source: {
        embedStem: voice === "passive" ? "cōā" : "quimich",
        embedClass: "zero",
        matrixStem: voice === "passive" ? "cuā" : "patl-ā-ni",
        matrixVerbClass: "A",
        matrixValence: voice === "passive"
          ? "single-object"
          : "intransitive",
        objectPeople: voice === "passive" ? ["3sg"] : [],
      },
      relation: "adverb",
      route: voice === "passive"
        ? "passive-adverbialized-subject"
        : "direct-adverb",
      adverbRole: voice === "passive" ? "means" : "compared-manner",
      orientation: "subject",
      subject: "3sg",
      mood: "indicative",
      tense: "present",
      voice,
      outputKind: "single",
    })
  );
  const activeIncorporated = buildIncorporatedVnc("active");
  const passiveIncorporated = buildIncorporatedVnc("passive");
  const activeRole = target.validateClassicalNahuatlIncorporatedNounRole(
    activeIncorporated,
    { claimedRole: "adverbial" },
  );
  const passiveRole = target.validateClassicalNahuatlIncorporatedNounRole(
    passiveIncorporated,
    { claimedRole: "means-instrument" },
  );
  prove(
    "incorporated-noun-never-subject",
    OWNER.incorporatedNoun.routeId,
    () => (
      [activeRole, passiveRole].every(frame => (
        target.isClassicalNahuatlIncorporatedNounRoleValidation(frame)
        && frame.incorporatedNounIsSubject === false
        && frame.personalPronounSubjectPositionsPreserved === true
      ))
    ),
  );
  prove(
    "active-incorporated-noun-adverbial",
    OWNER.incorporatedNoun.routeId,
    () => (
      target.isClassicalNahuatlIncorporatedNounRoleValidation(activeRole)
      && activeRole.selectedVoice === "active"
      && activeRole.derivedRole === "adverbial"
    ),
  );
  prove(
    "nonactive-incorporated-noun-means-instrument",
    OWNER.incorporatedNoun.routeId,
    () => (
      target.isClassicalNahuatlIncorporatedNounRoleValidation(passiveRole)
      && passiveRole.selectedVoice === "passive"
      && passiveRole.derivedRole === "means-instrument"
      && passiveRole.incorporatedNounIsAgent === false
    ),
  );
  prove(
    "passive-agent-mention-forbidden",
    OWNER.incorporatedNoun.routeId,
    () => {
      const blocked = target.validateClassicalNahuatlIncorporatedNounRole(
        passiveIncorporated,
        {
          claimedRole: "means-instrument",
          agentMentioned: true,
        },
      );
      return blocked.authorizationStatus === "blocked"
        && blocked.blockReason === "passive-agent-mention-forbidden";
    },
  );
  proveHostile("58.7-incorporated-role", () => {
    const copied = JSON.parse(JSON.stringify(activeIncorporated));
    const copiedRole = target.validateClassicalNahuatlIncorporatedNounRole(
      copied,
      { claimedRole: "adverbial" },
    );
    const subjectRole = target.validateClassicalNahuatlIncorporatedNounRole(
      activeIncorporated,
      { claimedRole: "subject" },
    );
    return copiedRole.authorizationStatus === "blocked"
      && subjectRole.authorizationStatus === "blocked";
  });

  const documentaryProductionApis = [
    "correctClassicalNahuatlText",
    "normalizeClassicalNahuatlDocumentaryText",
    "generateClassicalNahuatlTextualCorrection",
    "requestClassicalNahuatlTextualCorrection",
  ].filter(name => typeof target[name] === "function");
  [
    "textual-correction-diagnostic-only",
    "graphological-vocable-boundary",
    "sentence-division-reanalysis",
  ].forEach(ruleId => {
    if (
      documentaryProductionApis.length
      || applicationOperationIds.has("analysis:textual")
    ) {
      failures.push(`${ruleId}:documentary-example-became-production-authority`);
      return;
    }
    executionRouteIds.add(OWNER.textualDiagnostic.routeId);
    provedRuleIds.add(ruleId);
    diagnosticExecutionCount += 1;
  });

  RULE_CLAIMS.forEach(claim => {
    if (!provedRuleIds.has(claim.ruleId)) {
      failures.push(`${claim.ruleId}:no-owner-issued-execution-proof`);
    }
  });
  const ownerOperationIds = Array.from(new Set(
    Object.values(OWNER)
      .filter(owner => owner !== OWNER.textualDiagnostic)
      .map(owner => owner.operationId),
  ));

  return Object.freeze({
    kind: "classical-lessons57-58-owner-execution-audit",
    claimCount: RULE_CLAIMS.length,
    ownerContractCount: ownerOperationIds.length,
    executionRouteCount: executionRouteIds.size,
    authorizedExecutionCount:
      provedRuleIds.size - diagnosticExecutionCount,
    diagnosticExecutionCount,
    hostileAuthorityProofCount,
    canonicalOwnerOperationIds: Object.freeze(ownerOperationIds),
    canonicalApplicationOperationIds: Object.freeze(
      Array.from(applicationOperationIds),
    ),
    failures: Object.freeze(failures),
    complete: failures.length === 0,
  });
}

module.exports = {
  SOURCE_DOCUMENT,
  SOURCE_LINE_START,
  SOURCE_LINE_END,
  SOURCE_SHA256,
  EXPECTED_FORMULA_BEARING_LINE_COUNT,
  SECTION_SPANS,
  REQUIRED_RULE_IDS,
  RULE_CLAIMS,
  REQUIRED_SOURCE_MARKERS,
  auditClassicalNahuatlLessons5758Canvas,
  auditClassicalNahuatlLessons5758Runtime,
};
