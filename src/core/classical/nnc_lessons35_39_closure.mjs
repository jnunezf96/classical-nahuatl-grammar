// Canonical Andrews-only nominalization and deverbal closure for Lessons 35-39.
//
// Production owns executable grammar only. Canvas source spans, dispositions,
// claim counts, and audit receipts remain in documentation and tests.

import {
  buildClassicalGrammaticalRhymeCoordinateFrame as
    buildSharedGrammaticalRhymeCoordinateFrame,
} from "../grammar/grammatical_rhyme_space.mjs?v=20260825-capability-closure-333";
import {
  buildClassicalNahuatlParticipantRoleTransitionFrame,
} from "./participant_frame.mjs?v=20260823-passive-formation-continuity-238";

const VERSION = 1;
const ISSUED_SOURCE_FRAMES = new WeakSet();
const ISSUED_LEXICAL_AUTHORIZATION_FRAMES = new WeakSet();
const ISSUED_PRETERIT_VNC_CAPTURE_FRAMES = new WeakSet();
const ISSUED_PREDICATE_NOMINALIZATION_VNC_CAPTURE_FRAMES = new WeakSet();
const ISSUED_DEVERBAL_ACTION_VNC_CAPTURE_FRAMES = new WeakSet();
const ISSUED_PASSIVE_PATIENTIVE_VNC_CAPTURE_FRAMES = new WeakSet();
const ISSUED_IMPERSONAL_PATIENTIVE_VNC_CAPTURE_FRAMES = new WeakSet();
const ISSUED_PERFECTIVE_PATIENTIVE_VNC_CAPTURE_FRAMES = new WeakSet();
const ISSUED_IMPERFECTIVE_PATIENTIVE_VNC_CAPTURE_FRAMES = new WeakSet();
const ISSUED_CHARACTERISTIC_PATIENTIVE_NNC_CAPTURE_FRAMES = new WeakSet();
const ISSUED_ACTION_NNC_CONTINUATION_CAPTURE_FRAMES = new WeakSet();
const ISSUED_PATIENTIVE_NNC_CONTINUATION_CAPTURE_FRAMES = new WeakSet();
const ISSUED_INSTRUMENTIVE_SOURCE_PAIR_FRAMES = new WeakSet();
const ISSUED_NNC_SLOT_FRAMES = new WeakSet();
const ISSUED_GRAMMAR_FRAMES = new WeakSet();
const ISSUED_PARADIGM_PLANS = new WeakSet();
const ISSUED_PARADIGM_COORDINATES = new WeakSet();
const PARADIGM_PLAN_CONTEXTS = new WeakMap();
const PREDICATE_NNC_CONTINUATION_CONTEXTS = new WeakMap();
const ACTION_NNC_CONTINUATION_CONTEXTS = new WeakMap();
const PATIENTIVE_NNC_CONTINUATION_CONTEXTS = new WeakMap();
const GCD_IDENTITY =
  "typed-source-unit+licensed-source-stage+nominal-or-deverbal-operation+participant-state-transformation+boundary-realization+canonical-target-evaluator";
const LCM_PROJECTION_IDENTITY =
  "classical-nahuatl-deverbal-nnc-owner-selected-lcm-projection";

const CONSTRUCTION_KINDS = Object.freeze([
  "predicate-nominalization",
  "deverbal-action",
  "patientive",
  "patientive-embed-continuation",
  "patientive-matrix-continuation",
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
const PATIENTIVE_MATRIX_COMPOUND_RELATIONS = Object.freeze([
  "source", "material", "purpose", "form", "appearance", "manner",
  "pertinence", "possession", "association", "production", "carrier",
  "sex", "instrument", "means", "character", "progeny", "fellowship",
]);

function freezeDeverbalNounstemSourceContract({
  sourceStage,
  sourceVoices,
  sourceEvidenceKinds,
  voiceMismatchBlockReason,
}) {
  return Object.freeze({
    sourceStage,
    sourceVoices: Object.freeze([...sourceVoices]),
    sourceEvidenceKinds: Object.freeze([...sourceEvidenceKinds]),
    voiceMismatchBlockReason,
  });
}

// One structural contract covers the recurring Lessons 37-39 path. These are
// productive formation families, never example-stem or lesson-number routes.
const DEVERBAL_NOUNSTEM_SOURCE_CONTRACTS = Object.freeze({
  "deverbal-action:active-action": freezeDeverbalNounstemSourceContract({
    sourceStage: "future-core",
    sourceVoices: ["active"],
    sourceEvidenceKinds: [
      "typed-morphemic-source",
      "owner-issued-vnc-result",
    ],
    voiceMismatchBlockReason: "deverbal-action-kind-source-voice-mismatch",
  }),
  "deverbal-action:potential-patient": freezeDeverbalNounstemSourceContract({
    sourceStage: "future-core",
    sourceVoices: ["active"],
    sourceEvidenceKinds: [
      "typed-morphemic-source",
      "owner-issued-vnc-result",
    ],
    voiceMismatchBlockReason: "deverbal-action-kind-source-voice-mismatch",
  }),
  "deverbal-action:impersonal-general-action":
    freezeDeverbalNounstemSourceContract({
      sourceStage: "future-core",
      sourceVoices: ["impersonal"],
      sourceEvidenceKinds: [
        "typed-morphemic-source",
        "owner-issued-vnc-result",
      ],
      voiceMismatchBlockReason:
        "deverbal-action-kind-source-voice-mismatch",
    }),
  "patientive:passive-core": freezeDeverbalNounstemSourceContract({
    sourceStage: "nonactive-core",
    sourceVoices: ["passive"],
    sourceEvidenceKinds: ["owner-issued-vnc-result"],
    voiceMismatchBlockReason: "patientive-family-source-voice-mismatch",
  }),
  "patientive:impersonal-core": freezeDeverbalNounstemSourceContract({
    sourceStage: "nonactive-core",
    sourceVoices: ["impersonal"],
    sourceEvidenceKinds: ["owner-issued-vnc-result"],
    voiceMismatchBlockReason: "patientive-family-source-voice-mismatch",
  }),
  "patientive:perfective-active-core":
    freezeDeverbalNounstemSourceContract({
      sourceStage: "perfective-core",
      sourceVoices: ["active"],
      sourceEvidenceKinds: ["owner-issued-vnc-result"],
      voiceMismatchBlockReason: "patientive-family-source-voice-mismatch",
    }),
  "patientive:imperfective-active-core":
    freezeDeverbalNounstemSourceContract({
      sourceStage: "imperfective-core",
      sourceVoices: ["active"],
      sourceEvidenceKinds: ["owner-issued-vnc-result"],
      voiceMismatchBlockReason: "patientive-family-source-voice-mismatch",
    }),
  "patientive:root-or-stock": freezeDeverbalNounstemSourceContract({
    sourceStage: "root-or-stock",
    sourceVoices: ["active"],
    sourceEvidenceKinds: ["typed-morphemic-source"],
    voiceMismatchBlockReason: "patientive-family-source-voice-mismatch",
  }),
  "patientive:characteristic-property":
    freezeDeverbalNounstemSourceContract({
      sourceStage: "nounstem-embed",
      sourceVoices: ["active"],
      sourceEvidenceKinds: ["owner-issued-nnc-result"],
      voiceMismatchBlockReason: "patientive-family-source-voice-mismatch",
    }),
});

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
  "participantRoleTransitionFrame",
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
  "patientiveInterpretation",
  "patientiveMeaning",
  "patientiveTranslation",
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

// These readings are narrow lexical facts attached to an otherwise productive
// perfective-patientive route. Membership here never authorizes or blocks the
// route; it only preserves the special acquired-relation/abundance reading
// Andrews gives the typed perfective Source.
const PERFECTIVE_PATIENTIVE_OWNERHOOD_FACTS = deepFreeze({
  "yōl-lo-h": {
    family: "abundant-ownerhood",
    reading: "abounding-in-life-or-heart",
    sourceHistory: "isolated-yō-ā-ownerhood-formation",
  },
  "oquich-huah": {
    family: "acquired-relation-ownerhood",
    reading: "one-who-has-acquired-a-man-or-husband",
  },
  "cihuā-huah": {
    family: "acquired-relation-ownerhood",
    reading: "one-who-has-acquired-a-woman-or-wife",
  },
  "pil-huah": {
    family: "acquired-relation-ownerhood",
    reading: "one-who-has-acquired-a-dependent-or-child",
  },
  "huez-huah": {
    family: "acquired-relation-ownerhood",
    reading: "one-who-has-acquired-a-sister-in-law",
  },
  "oquich-ti-huah": {
    family: "acquired-relation-ownerhood",
    reading: "one-who-has-acquired-an-older-brother",
  },
  "huēl-ti-huah": {
    family: "acquired-relation-ownerhood",
    reading: "one-who-has-acquired-an-older-sister",
  },
  "tlāca-huah": {
    family: "acquired-relation-ownerhood",
    reading: "one-who-has-acquired-a-person-or-slave",
  },
});

// These are narrow readings and Source histories for §39.2.2. They never
// admit a Source to the productive imperfective-patientive route.
const IMPERFECTIVE_PATIENTIVE_READING_FACTS = deepFreeze({
  cuica: {
    reading: "song",
    compositionalReading: "thing-that-is-sung",
  },
  cuīca: {
    reading: "song",
    compositionalReading: "thing-that-is-sung",
  },
  "tla-pāca": {
    reading: "laundry",
    compositionalReading: "thing-that-is-washed",
  },
  "āy-a-hui": {
    reading: "fog-or-mist",
  },
  copi: {
    reading: "firefly",
    nonpatientiveGlossPossible: "agentive-blinking-entity",
    lexicalAttestationContrast: "bare-copi-versus-ih-copi",
  },
  "eh-ca": {
    reading: "breeze",
    sourceAnalysis: "intransitive-verbstem-with-ca-suffix",
    rejectedSurfaceReanalysis: "noun-compound-with-ca-matrix",
    glottalStopIsTypedSourceEvidence: true,
  },
  "te-c-i-hui": {
    reading: "hail",
  },
  "tla-cuā": {
    reading: "opossum",
    compositionalReading: "thing-that-is-eaten",
    frequentContinuation: "affective-tzin",
  },
  "tla-t-hui": {
    reading: "dawn",
    compositionalReading:
      "result-of-things-becoming-visible-or-perceptible",
    sourceHistory: Object.freeze([
      "intransitive-it-hui",
      "impersonal-tla-t-hui",
      "imperfective-patientive-tla-t-hui-tl",
    ]),
  },
});

const CHARACTERISTIC_PATIENTIVE_READING_FACTS = deepFreeze({
  "tla-īx": {
    reading: "grease-or-oily-surface",
    sourceRankHistory: "downgraded-possessive-predicate-to-nounstem",
    incorporatedRole: "nonhuman-object-of-abundant-ownerhood",
  },
  teō: { reading: "divinity-or-godhood" },
  chichi: { reading: "dogginess" },
  oquich: { reading: "virility-or-manliness" },
  "cua-l": {
    reading: "goodness",
    sourceKind: "passive-patientive-nounstem",
  },
  "huē-hueh": {
    reading: "old-agedness",
    sourceKind: "glottalized-embed-only-nounstem",
  },
  "huē-huē-t-Ø-cā": {
    reading: "old-agedness",
    sourceKind: "preterit-agentive-nounstem",
  },
  "tla-ht-o-h-Ø-cā": {
    reading: "kingliness-or-kingship",
    sourceKind: "preterit-agentive-nounstem",
  },
  "tōpīl-eh-Ø-cā": {
    reading: "constable-officeship",
    sourceKind: "ownerhood-preterit-agentive-nounstem",
  },
  pil: {
    reading: "nobility",
    possessiveStateCorrespondence: "pil-li",
  },
  tēuc: {
    reading: "lordship",
    possessiveStateCorrespondence: "tēuc-tli",
    assimilationException: "retain-yō-after-k",
  },
});

// These are narrow §39.3.2–§39.3.3 readings and Source histories. They never
// admit a Source to the productive characteristic-patientive route. The same
// typed Source can still take a different compositional reading when context
// licenses it, so translation is never used to merge or select analyses.
const CHARACTERISTIC_OWNERHOOD_CONTRAST_FACTS = deepFreeze({
  tici: {
    attestedReading: "pertaining-to",
    lexicalReading: "medical-art",
  },
  teō: {
    attestedReadings: ["inherent-quality", "pertaining-to"],
    lexicalReadings: ["divinity-or-godhood", "doctrine-or-ritual"],
    genuineLexicalAmbiguity: true,
  },
  yāo: {
    attestedReading: "pertaining-to",
    lexicalReading: "enmity-war-or-battle",
  },
  "mahui-z": {
    attestedReading: "pertaining-to",
    lexicalReading: "honor",
    traditionalSpelling: "mahuizo",
    rejectedSourceReanalysis: "tla-mahui-z-o-ā",
    traditionalSpellingAuthorizesRejectedReanalysis: false,
  },
  "tla-ht-o-h-Ø-cā": {
    attestedReadings: ["inherent-quality", "pertaining-to"],
    lexicalReadings: ["kingliness-or-kingship", "dignity-or-grandeur"],
    genuineLexicalAmbiguity: true,
    sourceKind: "preterit-agentive-nounstem",
  },
  "mich-huah-Ø-cā": {
    attestedReading: "pertaining-to",
    lexicalReading: "fish-owner-customs-and-mode-of-life",
    sourceKind: "ordinary-ownerhood-preterit-agentive-nounstem",
  },
  "tla-mati-ni": {
    attestedReading: "pertaining-to",
    lexicalReading: "doctrine-or-teaching",
    sourceKind: "customary-present-agentive-nounstem",
  },
  "tla-maca-z-cā": {
    attestedReading: "pertaining-to",
    lexicalReading: "priestly-privileges",
    sourceKind: "future-agentive-nounstem",
  },
  "cual-ā-n": {
    attestedReading: "intrinsic-aspect",
    lexicalReading: "irritation",
    sourceKind: "impersonal-patientive-nounstem",
    targetEmbedStem: "cual-a-n",
    comparisonSource: "cual-ā-n-Ø-cā",
    comparisonReading: "characteristic-of-an-angry-human-person",
  },
  yōl: {
    attestedReading: "intrinsic-aspect",
    lexicalReading: "heart",
    intrinsicRelation: "essential-component-of-a-living-whole",
    perfectivePatientiveComparison: "yōl-lo-h",
  },
  "tē-mach-tī-liz": {
    attestedReading: "intrinsic-aspect",
    lexicalReading: "lesson",
  },
  "pa-ti": {
    attestedReading: "intrinsic-aspect",
    lexicalReadings: ["pay", "price", "exchange-value", "exchange"],
    reconstructedEmbed: "pa-ti",
    reconstructedEmbedKind: "passive-patientive-nounstem",
    reconstructedVerbalSource: "tla-pa-tla",
    reconstructedObjectPattern: "nonspecific-nonhuman",
    traditionalSpelling: "patio",
  },
  "ih-i": {
    attestedReading: "intrinsic-aspect",
    lexicalReadings: ["breath", "essence", "influence"],
    reconstructedEmbed: "ih-i",
    reconstructedEmbedKind: "reduplicative-nounstem",
    traditionalSpelling: "ihio",
  },
  machi: {
    attestedReading: "intrinsic-aspect",
    lexicalReadings: ["sign", "symbol", "example", "model", "pattern"],
    verbalSourceHistory: "mati",
  },
  pac: {
    attestedReading: "intrinsic-aspect",
    lexicalReading: "joy",
    possessiveStateTarget: "embed-not-compound",
  },
  "ti-yah-Ø-ca-uh": {
    attestedReading: "intrinsic-aspect",
    lexicalReading: "warriorhood",
    sourceRankHistory: "downgraded-possessive-predicate-to-general-use-stem",
    generalUseStatusRequired: true,
  },
});

// These facts describe witnessed §39.3.4 meanings and exceptions. They are
// reading evidence, not a list of nounstems allowed to use the productive
// organic-possession analysis. The explicit typed relation, Result state, and
// possessor/possessum roles authorize the construction.
const ORGANIC_POSSESSION_READING_FACTS = deepFreeze({
  tlan: {
    contrastStatus: "ordinary-part-whole-ambiguity-often-tolerated",
    organicReading: "tooth-as-integral-part",
    adventitiousReading: "acquired-tooth",
  },
  omi: {
    contrastStatus: "formal-organic-versus-adventitious-contrast",
    organicReading: "bone-as-integral-part-of-possessor",
    adventitiousReading: "acquired-bone",
    possessumNumberOptions: ["singular", "plural"],
  },
  ez: {
    contrastStatus: "formal-organic-versus-adventitious-contrast",
    organicReading: "blood-as-part-of-or-flowing-from-possessor",
    adventitiousReading: "blood-not-part-of-possessor",
  },
  naca: {
    contrastStatus: "formal-organic-versus-adventitious-contrast",
    organicReading: "flesh-as-part-of-possessor",
    adventitiousReading: "meat-not-part-of-possessor",
  },
  "ah-tla-pa-l": {
    contrastStatus: "formal-organic-versus-adventitious-contrast",
    organicReadings: ["leaf-as-part-of-plant", "wing-as-part-of-bird"],
    adventitiousReadings: ["acquired-leaf", "acquired-wing"],
  },
  ihhui: {
    contrastStatus: "formal-organic-versus-adventitious-contrast",
    organicReading: "feather-as-part-of-bird",
    adventitiousReading: "acquired-feather",
  },
  "xō-chi": {
    contrastStatus: "formal-organic-versus-adventitious-contrast",
    organicReadings: [
      "flower-as-part-of-plant",
      "animal-fat-grease-or-suet-with-animate-possessor",
    ],
    adventitiousReading: "acquired-flower",
    possessorAnimacyCanSelectNarrowReading: true,
  },
  tzo: {
    contrastStatus: "yo-compound-does-not-imply-formal-contrast",
    lexicalReading: "anus",
  },
  "ix-ā": {
    contrastStatus: "yo-compound-does-not-imply-formal-contrast",
    lexicalReading: "tear-or-tears",
  },
  tēn: {
    contrastStatus: "body-part-embed-does-not-imply-formal-contrast",
    lexicalReading: "fame",
  },
  tzon: {
    contrastStatus: "sense-dependent-organic-possession",
    noncontrastiveReading: "hair",
    organicReading: "upper-part-end-tip-or-peak",
  },
  "ah-co-l-tzon": {
    contrastStatus: "compound-specific-organic-possession",
    organicReading: "shoulder-hair-as-organic-part",
  },
  "cal-tech": {
    contrastStatus: "nonliving-whole-organic-possession",
    organicReading: "wall-as-integral-part-of-building",
    adventitiousReading: "acquired-house-wall",
  },
  tecol: {
    contrastStatus: "nonliving-whole-organic-possession",
    organicReading: "charcoal-as-integral-product-of-torches",
    adventitiousReading: "acquired-charcoal",
  },
});

// These §39.3.5 readings describe the witnessed tōna example. The productive
// route is licensed by the typed preterit-agentive Result and its general-use
// stem, never by membership in this table.
const PRETERIT_AGENTIVE_CHARACTERISTIC_READING_FACTS = deepFreeze({
  tōna: {
    verbalReading: "for-the-sun-to-shine",
    generalUseAgentiveReading: "thing-that-shines-warmingly",
    compositionalReadings: [
      "characteristic-of-the-thing-that-shines-warmingly",
      "thing-characteristic-of-sun-warmth",
    ],
    lexicalReadings: [
      "agricultural-produce",
      "sustenance",
      "maize",
    ],
  },
  tona: {
    verbalReading: "for-the-sun-to-shine",
    generalUseAgentiveReading: "thing-that-shines-warmingly",
    compositionalReadings: [
      "characteristic-of-the-thing-that-shines-warmingly",
      "thing-characteristic-of-sun-warmth",
    ],
    lexicalReadings: [
      "agricultural-produce",
      "sustenance",
      "maize",
    ],
  },
});

const OWNERHOOD_MATRICES = Object.freeze(["ē", "huā", "yō-ā"]);
const OLD_PERSON_FAMILIES = Object.freeze(["old-woman", "old-man"]);

// These are lexical exceptions and genuine alternatives, never route gates.
// Every other typed nounstem continues through the structural class rules.
const OWNERHOOD_LEXICAL_FACTS = deepFreeze({
  pil: { matrixOptions: ["huā"], exception: "child-hua-only" },
  āxcā: { matrixOptions: ["huā"], exception: "property-hua-only" },
  āmox: { matrixOptions: ["ē", "huā"], exception: "optional-hua" },
  cax: { matrixOptions: ["ē", "huā"], exception: "optional-hua" },
  cama: { matrixOptions: ["ē"], exception: "mouth-e-only" },
  izt: { matrixOptions: ["ē"], exception: "subclass-1b-final-i-deletion" },
  iht: { matrixOptions: ["ē"], exception: "subclass-1b-final-i-deletion" },
  icx: { matrixOptions: ["ē"], exception: "subclass-1b-final-i-deletion" },
});

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
  "mic": {
    preteritAgentiveVariants: ["ordinary", "archaic-que"],
    affinityRequirement: "plural-required",
  },
  "tēmō": { preteritAgentiveVariants: ["ordinary", "archaic-que"] },
  "m-o-quetz": { preteritAgentiveVariants: ["ordinary", "archaic-que"] },
  "cuīca-tla-mat": { preteritAgentiveVariants: ["ordinary", "archaic-que"] },
  "ilama-ti": {
    oldPersonFamily: "old-woman",
    preteritAgentiveNumberOptions: ["silent"],
  },
  "huē-huē-ti": {
    oldPersonFamily: "old-man",
    preteritAgentiveNumberOptions: ["silent"],
  },
  "pāin": { preteritAgentiveNumberOptions: ["silent"] },
  "ihcuil-o-h": { preteritAgentiveNumberOptions: ["silent"] },
  "mēmeh": { preteritAgentiveNumberOptions: ["silent"] },
  "pix": { preteritAgentiveNumberOptions: ["qui"] },
  "chiuh": { preteritAgentiveNumberOptions: ["qui"] },
  "nāmic": { preteritAgentiveNumberOptions: ["qui", "silent"] },
  "māuh": { preteritAgentiveNumberOptions: ["silent"] },
  "mic-tih": {
    preteritAgentiveNumberOptions: ["silent"],
    agentiveAnimacyOptions: ["animate", "nonanimate"],
  },
  "izcal-i-h": {
    preteritAgentiveNumberOptions: ["qui", "silent"],
    agentiveAnimacyByConnector: {
      qui: ["animate"],
      silent: ["nonanimate"],
    },
  },
  "chōc-tih": {
    preteritAgentiveNumberOptions: ["qui", "silent"],
    agentiveAnimacyByConnector: {
      qui: ["animate"],
      silent: ["nonanimate"],
    },
  },
  "tt-a": { affinityRequirement: "plural-optional" },
  "ht-o-h": { affinityRequirement: "plural-optional" },
  "tla-ht-o-h": { possessiveAgentiveYoMatrix: true },
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
  "chi-chin-a-ca": {
    actionStemAnalysis: "frequentative-destockal",
    actionStemVariants: ["ca-to-qui"],
  },
  "cha-chal-a-ca": {
    actionStemAnalysis: "frequentative-destockal",
    actionStemVariants: ["none"],
  },
  "ahhua": { actionStemVariants: ["none", "hua-to-hui"] },
  "ahci": { actionStemVariants: ["ci-to-xi"] },
  "huēl-nēci": { actionStemVariants: ["ci-to-xi"] },
  "teō-mati": { actionStemVariants: ["none", "ti-to-chi"] },
  "ahhuiā-ya": {
    actionStemAnalysis: "root-plus-ya",
    actionStemVariants: ["root-plus-ya-delete"],
  },
  "coco-ya": {
    actionStemAnalysis: "root-plus-ya",
    actionStemVariants: ["root-plus-ya-delete"],
  },
  "yancui-ya": {
    actionStemAnalysis: "root-plus-ya",
    actionStemVariants: ["root-plus-ya-delete"],
  },
  "huē-i-ya": {
    actionStemAnalysis: "root-plus-ya",
    actionStemVariants: ["none"],
  },
  "tlaōco-ya": {
    actionStemAnalysis: "root-plus-ya",
    actionStemVariants: ["none"],
  },
  "te-ti-ya": {
    actionStemAnalysis: "denominal-ti-ya",
    actionStemVariants: ["denominal-ya-delete"],
  },
  "xo-xō-hui-ya": {
    actionStemAnalysis: "denominal-hui-ya",
    actionStemVariants: ["denominal-ya-delete", "none"],
  },
  "ca-h": {
    lizReadingOptions: [
      "compositional-action",
      "way-of-being",
      "nature",
      "state-or-condition",
    ],
  },
  "chiya": {
    lizReadingOptions: [
      "compositional-action",
      "way-of-looking",
      "appearance",
    ],
  },
  "izta-ya": { nominalizedActionStemRule: "root-plus-ya-delete" },
  "cel-i-ya": { nominalizedActionStemRule: "root-plus-ya-delete" },
  "tlan-ē-uh-ti-lō": { patientiveLexicalReadings: ["loan"] },
  "iht-o-lō": { patientiveLexicalReadings: ["promise", "vow"] },
  "huica-lō": { exceptionalHumanPrefixRetention: true },
  "ilpi-lō": { exceptionalHumanPrefixRetention: true },
});

// These records license only the exceptional human/nonhuman interpretation
// contrast in §38.1.5. They never gate the productive patientive route.
const PATIENTIVE_CONTRAST_FACTS = deepFreeze({
  "nāhua-t-iā": {
    mode: "source-valence-disambiguated",
    readings: [
      "regular-human-tla",
      "anomalous-nonhuman-te",
    ],
  },
  "icn-ēl-i-ā": {
    mode: "human-source-realization-choice",
    readings: [
      "regular-human-tla",
      "anomalous-nonhuman-te",
    ],
    targetStemReplacements: {
      "anomalous-nonhuman-te": ["icn-ēl-i-l", "icn-ēl-ī-l"],
    },
  },
  "tlāuh-ti-ā": {
    mode: "human-source-realization-choice",
    readings: [
      "regular-human-tla",
      "anomalous-nonhuman-te",
    ],
    targetStemReplacements: {
      "regular-human-tla": ["tlāuh-ti-l", "tlāuh-tī-l"],
      "anomalous-nonhuman-te": ["tlāuh-ti-l", "tlāuh-tī-l"],
    },
  },
  "nō-nōtzā": {
    mode: "human-source-realization-choice",
    readings: [
      "regular-human-tla",
      "anomalous-nonhuman-te",
    ],
  },
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
  "pitz-ā-hua": {
    stockKind: "hua-stock",
    targetBase: "pitz-a",
    allomorphs: ["c"],
    sourceReadings: ["become-narrow-or-thin"],
    resultReadings: ["thing-that-has-become-narrow-or-thin"],
  },
  "cham-ā-hua": {
    stockKind: "hua-stock",
    targetBase: "cham-a",
    allomorphs: ["c", "zero"],
    nounClassByAllomorph: { zero: "tl" },
    sourceReadings: ["become-thick", "become-dense", "become-large"],
    resultReadingsByAllomorph: {
      c: ["thing-that-has-become-thick-or-large"],
      zero: [
        "human-claimant-who-says-he-has-become-large",
        "one-who-brags-about-himself",
        "braggart",
      ],
    },
    referentProfileByAllomorph: {
      zero: {
        animacy: "animate",
        humanness: "human",
        person: "third",
        number: "singular",
        claimantGenderReading: "male",
        claimJustification: "without-reason",
      },
    },
  },
  "tom-ā-hua": {
    stockKind: "hua-stock",
    targetBase: "tom-a",
    allomorphs: ["c", "zero"],
    nounClassByAllomorph: { zero: "tl" },
    sourceReadings: ["become-plump"],
    resultReadingsByAllomorph: {
      c: ["thing-that-has-become-plump"],
      zero: ["thing-that-has-become-plump", "green-husk-tomato"],
    },
  },
  "zōn-ē-hua": {
    stockKind: "hua-stock",
    targetBase: "zōn-e",
    allomorphs: ["c"],
    sourceReadings: ["become-spongy-or-squashy"],
    resultReadings: ["spongy-or-squashy-thing"],
  },
  "pin-ē-hua": {
    stockKind: "hua-stock",
    targetBase: "pin-e",
    allomorphs: ["c"],
    sourceReadings: ["become-pallid"],
    resultReadings: ["pallid-thing"],
  },
  "tic-ē-hua": {
    stockKind: "hua-stock",
    targetBase: "tic-e",
    allomorphs: ["c"],
    sourceReadings: ["become-the-color-of-chalk"],
    resultReadings: ["chalkish-colored-thing"],
    rootSourceFrame: {
      sourceKind: "downgraded-nounstem",
      nounstem: "tiza-tl",
      downgradedRoot: "tic",
      readings: ["white-clay", "chalk"],
    },
  },
  "pō-ch-ē-hua": {
    stockKind: "hua-stock",
    targetBase: "pō-ch-e",
    allomorphs: ["c"],
    sourceReadings: ["become-darkened-by-smoke"],
    resultReadings: ["smoky-colored-thing", "smoke-blackened-thing"],
    rootSourceFrame: {
      sourceKind: "downgraded-nounstem",
      nounstem: "pō-ch-tli",
      downgradedRoot: "pō-ch",
      readings: ["incense-smoke", "smoke"],
    },
  },
  "tlīl-ē-hua": {
    stockKind: "hua-stock",
    targetBase: "tlīl-e",
    allomorphs: ["c"],
    sourceReadings: ["become-like-ink", "become-black", "become-blackish"],
    resultReadings: ["ink-colored-thing", "blackish-thing"],
    rootSourceFrame: {
      sourceKind: "downgraded-nounstem",
      nounstem: "tlīl-li",
      downgradedRoot: "tlīl",
      readings: ["ink", "black-ink"],
    },
  },
  "nex-ē-hua": {
    stockKind: "hua-stock",
    targetBase: "nex-e",
    allomorphs: ["c"],
    sourceReadings: ["become-the-color-of-ashes"],
    resultReadings: ["ash-colored-thing"],
    rootSourceFrame: {
      sourceKind: "downgraded-nounstem",
      nounstem: "nex-tli",
      downgradedRoot: "nex",
      readings: ["ash", "ashes"],
    },
  },
  "izta-l-ē-hua": {
    stockKind: "hua-stock",
    targetBase: "izta-l-e",
    allomorphs: ["c"],
    sourceReadings: ["become-pallid"],
    resultReadings: ["pallid-colored-thing"],
    rootSourceFrame: {
      sourceKind: "downgraded-impersonal-patientive-nounstem",
      nounstem: "izta-l-li",
      downgradedRoot: "izta-l",
      readings: [
        "thing-that-has-become-white",
        "whitish-thing",
        "pallid-thing",
      ],
      earlierSourceStem: "izta-ya",
      earlierSourceReadings: ["become-like-salt", "become-white"],
    },
  },
  "patl-ā-hua": {
    stockKind: "hua-stock",
    targetBase: "patl-a",
    allomorphs: ["ch"],
    sourceReadings: ["become-wide"],
    resultReadings: ["thing-that-has-become-wide", "wide-thing"],
  },
  "iy-ā-hua": {
    stockKind: "hua-stock",
    targetBase: "iy-e",
    allomorphs: ["zero"],
    nounClass: "tl",
    vowelRealizationRule: "raise-short-a-to-e",
    sourceReadings: ["become-lifted-up-in-sacrificial-offering"],
    resultReadings: [
      "thing-that-has-become-offered-in-sacrifice",
      "tobacco",
    ],
  },
  "ā-tōy-a-hua": {
    stockKind: "hua-stock",
    targetBase: "ā-tōy-a",
    allomorphs: ["zero"],
    nounClass: "tl",
    vowelRealizationRule: "retain-short-compound-stock-vowel",
    sourceReadings: ["become-flowing-in-the-form-of-water"],
    resultReadings: [
      "thing-that-has-become-flowing-in-the-form-of-water",
      "river",
    ],
    referentProfileByAllomorph: {
      zero: {
        animacy: "nonanimate",
        humanness: "nonhuman",
        referentKind: "body-of-flowing-water",
      },
    },
    compoundSourceFrame: {
      compoundKind: "incorporated-adverb",
      embedStem: "ā-tl",
      embedReading: "water",
      matrixStem: "tōy-ā-hua",
      matrixReading: "flow-forth",
      sourceStem: "ā-tōy-a-hua",
      boundariesPreserved: true,
    },
  },
  "cuetl-a-hui": {
    stockKind: "ihui-ahui-stock",
    targetBase: "cuetl-a",
    allomorphs: ["x"],
    sourceReadings: ["become-withered", "become-shriveled"],
    resultReadings: [
      "thing-that-has-become-withered-or-shriveled",
      "tanned-hide",
      "leather",
    ],
    relatedSourceContrastFrame: {
      relatedSourceStem: "cuetl-ā-ni",
      relatedSourceReadings: [
        "for-wind-or-sickness-to-abate",
        "become-attenuated",
      ],
      selectedHistoricalSource: "cuetl-a-hui",
      relatedSourceRejectedForThisResult: true,
      rejectionReason: "meaning-too-distant",
    },
  },
  "poy-a-hui": {
    stockKind: "ihui-ahui-stock",
    targetBase: "poy-a",
    allomorphs: ["c"],
    sourceReadings: ["for-a-cloud-to-become-thin-or-fade-away"],
    resultReadings: [
      "thing-that-has-become-thin",
      "thing-that-has-nearly-faded-away",
    ],
  },
  "yēc-a-hui": {
    stockKind: "ihui-ahui-root",
    targetBase: "yēc",
    allomorphs: ["zero"],
    sourceReadings: ["become-finished", "become-completed"],
    resultReadings: [
      "thing-that-has-become-finished",
      "thing-that-has-become-completed",
      "consummate-thing",
      "good-thing",
    ],
    referentProfileByAllomorph: {
      zero: {
        animacy: "nonanimate",
        humanness: "nonhuman",
        number: "singular",
        changeState: "completed",
      },
    },
  },
  "tzol-i-hui": {
    stockKind: "ihui-ahui-root",
    targetBase: "tzol",
    allomorphs: ["zero"],
    sourceReadings: ["become-narrow", "taper"],
    resultReadings: [
      "thing-that-has-become-narrow-toward-the-end",
      "tapering-thing",
    ],
  },
  "tzic-a-hui": {
    stockKind: "ihui-ahui-root",
    targetBase: "tzic",
    allomorphs: ["zero"],
    sourceReadings: ["become-gummy", "adhere"],
    resultReadings: [
      "thing-that-has-become-gummy",
      "resin-gum",
      "chewing-gum",
    ],
    sourceAnalysisOptionsByAllomorph: {
      zero: ["deverbal-patientive", "nounstem-root-source"],
    },
    sourceAnalysisDefaultByAllomorph: { zero: "" },
    sourceDirectionEvidence: "genuinely-underdetermined",
  },
  "tla-zāl-o-ā": {
    stockKind: "causative-root",
    targetBase: "tla-zāl",
    allomorphs: ["zero"],
    sourceReadings: [
      "cause-a-nonhuman-thing-to-become-sticky",
      "cause-a-nonhuman-thing-to-stick",
      "glue-something",
      "paste-something",
      "solder-something",
    ],
    resultReadings: ["thing-that-has-been-made-sticky", "birdlime"],
    referentProfileByAllomorph: {
      zero: {
        animacy: "nonanimate",
        humanness: "nonhuman",
        number: "singular",
        changeState: "made-sticky",
      },
    },
    causativeSourceFrame: {
      sourceStem: "tla-zāl-o-ā",
      sourceKind: "causative-o-ā-derivative",
      internalObjectCarrier: "tla",
      internalObjectReferent: "nonspecific-nonhuman",
      rootStem: "zāl",
      rootPatientiveStem: "tla-zāl",
      verbcoreIncludesObjectCarrier: true,
    },
  },
  "tla-huī-tōl-o-ā": {
    stockKind: "causative-root",
    targetBase: "tla-huī-tōl",
    allomorphs: ["zero"],
    sourceReadings: ["bend-something-in-the-shape-of-an-arc"],
    resultReadings: ["thing-that-has-been-bowed", "bow-for-shooting-arrows"],
    referentProfileByAllomorph: {
      zero: {
        animacy: "nonanimate",
        humanness: "nonhuman",
        number: "singular",
        instrumentPurpose: "shooting-nonhuman-arrows",
      },
    },
    causativeSourceFrame: {
      sourceStem: "tla-huī-tōl-o-ā",
      sourceKind: "causative-o-ā-derivative",
      internalObjectCarrier: "tla",
      internalObjectReferent: "nonspecific-nonhuman",
      rootStem: "huī-tōl",
      rootPatientiveStem: "tla-huī-tōl",
      verbcoreIncludesObjectCarrier: true,
    },
  },
  "coy-ō-ni": {
    stockKind: "bare-stock-agentive",
    targetBase: "coy-ō",
    allomorphs: ["zero"],
    nounClass: "tl",
    sourceReadings: [
      "make-a-yipping-or-howling-sound",
      "become-a-hole",
    ],
    resultReadings: ["entity-that-yips-or-howls", "coyote"],
    lexicalEvidenceFrame: {
      selectedSourceReading: "make-a-yipping-or-howling-sound",
      selectedReadingStatus: "conjectural-but-derivationally-supported",
      dictionaryReading: "become-a-hole",
      supportingDerivedStem: "ih-coy-o-ca",
      supportingDerivedStemReading: "make-a-noise-buzz-or-hum",
      supportingNounstems: ["tocuil-coy-ō-tl", "ā-coy-ō-tl"],
      supportingLexicalStem: "te-coy-ō-hua",
      supportingLexicalStemReading: "howl",
      evidenceDoesNotAuthorizeProductiveRoute: true,
    },
  },
  "pey-ō-ni": {
    stockKind: "bare-stock-agentive",
    targetBase: "pey-ō",
    allomorphs: ["zero"],
    nounClass: "tl",
    sourceReadings: ["glow"],
    resultReadings: ["entity-that-glows", "chrysalis", "cocoon", "peyote"],
  },
  "moy-ō-ni": {
    stockKind: "bare-stock-agentive",
    targetBase: "mōy-ō",
    allomorphs: ["zero"],
    nounClass: "tl",
    sourceReadings: ["swarm"],
    resultReadings: ["entity-that-swarms", "mosquito", "gnat"],
  },
  "tla-lhua": {
    stockKind: "unknown-source-deverbal-nounstem",
    targetBase: "tla-lhua",
    allomorphs: ["zero"],
    nounClass: "tl",
    resultReadings: ["sinew", "tendon"],
    unknownSourceFrame: {
      exactSourceVerbstemKnown: false,
      deverbalStatusKnown: true,
      diagnosticObjectCarrier: "tla",
      diagnosticObjectRole: "nonspecific-nonhuman-projective",
      carrierIsNominalRoot: false,
      unknownSourceDoesNotNegateResult: true,
      organicPossessionStem: "tla-lhua-yo",
      organicPossessionRelation: "possessor-whole-to-integral-part",
    },
  },
  "ne-lhua": {
    stockKind: "unknown-source-deverbal-nounstem",
    targetBase: "ne-lhua",
    allomorphs: ["zero"],
    nounClass: "tl",
    resultReadings: ["root"],
    unknownSourceFrame: {
      exactSourceVerbstemKnown: false,
      deverbalStatusKnown: true,
      diagnosticObjectCarrier: "ne",
      diagnosticObjectRole: "shuntline-reflexive",
      carrierIsNominalRoot: false,
      unknownSourceDoesNotNegateResult: true,
      organicPossessionStem: "ne-lhua-yō",
      organicPossessionRelation: "possessor-whole-to-integral-part",
    },
  },
});

function deriveRootStockAuthorization({
  sourceStem = "",
  sourceStage = "",
} = {}) {
  const stem = normalizeStem(sourceStem);
  if (normalizeKey(sourceStage) !== "root-or-stock" || !stem) {
    return null;
  }
  const witnessedFact = ROOT_STOCK_FACTS[stem] || null;
  let stockKind = "";
  let structuralBase = "";
  let structuralAllomorphs = [];
  let structuralTargetBaseByAllomorph = {};
  let stockFormativeVowel = "";
  let stockFormativeShorteningApplied = false;
  if (/-?ni$/u.test(stem)) {
    stockKind = "ni-stock";
    structuralBase = stem.replace(/-?ni$/u, "");
    structuralAllomorphs = ["c", "ch", "x", "z"];
    const match = structuralBase.match(/(?:^|-)([āēīō])$/u);
    if (match) {
      stockFormativeVowel = match[1];
      structuralBase = structuralBase.replace(
        /[āēīō]$/u,
        vowel => ({ ā: "a", ē: "e", ī: "i", ō: "o" })[vowel]
      );
      stockFormativeShorteningApplied = true;
    }
  } else if (/-?ca$/u.test(stem)) {
    stockKind = "ca-replacement-stock";
    structuralBase = stem.replace(/-?ca$/u, "");
    structuralAllomorphs = ["c", "ch", "h"];
  } else if (/-?hua$/u.test(stem)) {
    stockKind = "hua-stock";
    structuralBase = stem.replace(/-?hua$/u, "");
    structuralAllomorphs = ["c", "ch", "zero"];
    const match = structuralBase.match(/(?:^|-)([āēīō])$/u);
    if (match) {
      stockFormativeVowel = match[1];
      structuralBase = structuralBase.replace(
        /[āēīō]$/u,
        vowel => ({ ā: "a", ē: "e", ī: "i", ō: "o" })[vowel]
      );
      stockFormativeShorteningApplied = true;
    }
  } else if (/(?:^|-)(?:i|a)-hui$/u.test(stem)) {
    stockKind = "ihui-ahui-root-or-stock";
    const stockBase = stem.replace(/-?hui$/u, "");
    const rootBase = stockBase.replace(/-(?:i|a)$/u, "");
    structuralBase = stockBase;
    structuralAllomorphs = ["c", "x", "zero"];
    structuralTargetBaseByAllomorph = {
      c: stockBase,
      x: stockBase,
      zero: rootBase,
    };
  } else if (/^tla-.+-o-ā$/u.test(stem)) {
    stockKind = "causative-root";
    structuralBase = stem.replace(/-o-ā$/u, "");
    structuralAllomorphs = ["zero"];
  } else if (
    witnessedFact?.stockKind === "unknown-source-deverbal-nounstem"
  ) {
    stockKind = witnessedFact.stockKind;
    structuralBase = witnessedFact.targetBase;
    structuralAllomorphs = witnessedFact.allomorphs;
  }
  if (!stockKind || !structuralBase) return null;
  const allomorphs = Object.freeze([
    ...(witnessedFact?.allomorphs || structuralAllomorphs),
  ]);
  return deepFreeze({
    stockKind: witnessedFact?.stockKind || stockKind,
    targetBase: witnessedFact?.targetBase || structuralBase,
    targetBaseByAllomorph:
      witnessedFact?.targetBaseByAllomorph
      || structuralTargetBaseByAllomorph,
    allomorphs,
    defaultAllomorph: allomorphs.length === 1 ? allomorphs[0] : "",
    allomorphChoiceRequired: allomorphs.length > 1,
    nounClass: witnessedFact?.nounClass || "tli",
    nounClassByAllomorph:
      witnessedFact?.nounClassByAllomorph
      || (stockKind === "hua-stock" ? { zero: "tl" } : {}),
    vowelRealizationRule:
      witnessedFact?.vowelRealizationRule
      || (stockFormativeShorteningApplied
        ? "shorten-stock-formative-long-vowel"
        : "retain-typed-stock-vowel"),
    sourceReadings: Object.freeze([
      ...(witnessedFact?.sourceReadings || []),
    ]),
    resultReadings: Object.freeze([
      ...(witnessedFact?.resultReadingsByAllomorph?.[
        allomorphs.length === 1 ? allomorphs[0] : ""
      ] || witnessedFact?.resultReadings || []),
    ]),
    resultReadingsByAllomorph:
      witnessedFact?.resultReadingsByAllomorph || {},
    referentProfileByAllomorph:
      witnessedFact?.referentProfileByAllomorph || {},
    rootSourceFrame: witnessedFact?.rootSourceFrame || null,
    compoundSourceFrame: witnessedFact?.compoundSourceFrame || null,
    relatedSourceContrastFrame:
      witnessedFact?.relatedSourceContrastFrame || null,
    causativeSourceFrame: witnessedFact?.causativeSourceFrame || null,
    lexicalEvidenceFrame: witnessedFact?.lexicalEvidenceFrame || null,
    unknownSourceFrame: witnessedFact?.unknownSourceFrame || null,
    sourceAnalysisOptionsByAllomorph:
      witnessedFact?.sourceAnalysisOptionsByAllomorph
      || (!witnessedFact && stockKind === "ihui-ahui-root-or-stock"
        ? { zero: ["deverbal-patientive", "nounstem-root-source"] }
        : {}),
    sourceAnalysisDefaultByAllomorph:
      witnessedFact?.sourceAnalysisDefaultByAllomorph || {},
    sourceDirectionEvidence:
      witnessedFact?.sourceDirectionEvidence
      || (!witnessedFact && stockKind === "ihui-ahui-root-or-stock"
        ? "unknown-for-unlisted-root-zero"
        : "typed-source-settles-direction"),
    stockFormativeVowel,
    stockFormativeShorteningApplied:
      witnessedFact
        ? witnessedFact.targetBase !== structuralBase
          ? /[aeio]$/u.test(witnessedFact.targetBase)
          : stockFormativeShorteningApplied
        : stockFormativeShorteningApplied,
    witnessedReadingFact: witnessedFact
      ? deepFreeze({
        sourceStem: stem,
        documentedAllomorphs: witnessedFact.allomorphs,
        documentedTargetBase: witnessedFact.targetBase,
      })
      : null,
    sourceShapeAuthorizesFamily: true,
    exampleMembershipRequired: false,
    callerSuppliedFormulaOrSurfaceAuthorityAccepted: false,
  });
}

function getRootStockPatientiveInventory(request = {}) {
  const sourceStem = normalizeStem(request.sourceStem);
  const sourceStage = normalizeKey(
    request.sourceStage || "root-or-stock"
  );
  const rootStock = deriveRootStockAuthorization({
    sourceStem,
    sourceStage,
  });
  return rootStock
    ? deepFreeze({
      kind: "classical-nahuatl-root-stock-patientive-choice-inventory",
      version: VERSION,
      authorizationStatus: "authorized",
      blockReason: "",
      sourceStem,
      sourceStage,
      stockKind: rootStock.stockKind,
      stockBase: rootStock.targetBase,
      targetBaseByAllomorph: rootStock.targetBaseByAllomorph,
      availableAllomorphs: rootStock.allomorphs,
      defaultAllomorph: rootStock.defaultAllomorph,
      choiceRequired: rootStock.allomorphChoiceRequired,
      availableSourceAnalyses: Object.freeze([
        ...(rootStock.sourceAnalysisOptionsByAllomorph?.[
          normalizeKey(request.rootStockAllomorph)
            || rootStock.defaultAllomorph
        ] || []),
      ]),
      defaultSourceAnalysis:
        rootStock.sourceAnalysisDefaultByAllomorph?.[
          normalizeKey(request.rootStockAllomorph)
            || rootStock.defaultAllomorph
        ] || "",
      sourceAnalysisChoiceRequired:
        (rootStock.sourceAnalysisOptionsByAllomorph?.[
          normalizeKey(request.rootStockAllomorph)
            || rootStock.defaultAllomorph
        ] || []).length > 1
        && !rootStock.sourceAnalysisDefaultByAllomorph?.[
          normalizeKey(request.rootStockAllomorph)
            || rootStock.defaultAllomorph
        ],
      sourceShapeAuthorizesFamily: true,
      exampleMembershipRequired: false,
      grammarAuthority: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    })
    : deepFreeze({
      kind: "classical-nahuatl-root-stock-patientive-choice-inventory",
      version: VERSION,
      authorizationStatus: "blocked",
      blockReason: "39.4-root-stock-source-not-lexically-authorized",
      sourceStem,
      sourceStage,
      stockKind: "",
      stockBase: "",
      availableAllomorphs: Object.freeze([]),
      defaultAllomorph: "",
      choiceRequired: false,
      sourceShapeAuthorizesFamily: false,
      exampleMembershipRequired: false,
      grammarAuthority: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
}

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

function cloneParadigmRequest(request = {}) {
  const cloned = deepClone(request);
  [
    "canonicalVncResult",
    "canonicalPreteritVncResult",
    "canonicalInstrumentiveAbsolutiveVncResult",
    "canonicalInstrumentivePossessiveVncResult",
    "canonicalNncResult",
    "canonicalPatientiveNncResult",
    "canonicalPatientiveNncGrammarFrame",
  ].forEach(key => {
    if (request?.[key]) cloned[key] = request[key];
  });
  return cloned;
}

function deepFreeze(value) {
  if (!value || typeof value !== "object" || Object.isFrozen(value)) return value;
  Object.values(value).forEach(deepFreeze);
  return Object.freeze(value);
}

function deriveLizActionStemOptions(sourceStem = "", lexicalFacts = {}) {
  const stem = normalizeStem(sourceStem);
  if (Array.isArray(lexicalFacts.actionStemVariants)) {
    return lexicalFacts.actionStemVariants;
  }
  if (/(?:^|-)ti-ya$/u.test(stem)) return ["denominal-ya-delete"];
  if (/(?:^|-)hui-ya$/u.test(stem)) {
    return ["denominal-ya-delete", "none"];
  }
  if (/-ya$/u.test(stem)) return ["root-plus-ya-delete", "none"];
  if (/(?:^|-)a-ca$/u.test(stem)) return ["ca-to-qui", "none"];
  if (/ca$/u.test(stem)) return ["ca-to-qui"];
  if (/hua$/u.test(stem)) return ["none", "hua-to-hui"];
  if (/ci$/u.test(stem)) return ["ci-to-xi"];
  if (/ti$/u.test(stem)) return ["none", "ti-to-chi"];
  return ["none"];
}

function deriveLizActionStemAnalysis(sourceStem = "", lexicalFacts = {}) {
  const stem = normalizeStem(sourceStem);
  if (lexicalFacts.actionStemAnalysis) {
    return lexicalFacts.actionStemAnalysis;
  }
  if (/(?:^|-)ti-ya$/u.test(stem)) return "denominal-ti-ya";
  if (/(?:^|-)hui-ya$/u.test(stem)) return "denominal-hui-ya";
  if (/-ya$/u.test(stem)) return "typed-root-plus-ya-choice";
  if (/(?:^|-)a-ca$/u.test(stem)) {
    return "typed-frequentative-destockal-choice";
  }
  return "typed-final-shape";
}

function getPatientiveContrastInventory({
  sourceStem = "",
  sourceValence = "",
} = {}) {
  const normalizedStem = normalizeStem(sourceStem);
  const normalizedValence = normalizeKey(sourceValence);
  const profile = PATIENTIVE_CONTRAST_FACTS[normalizedStem] || null;
  const applicable = Boolean(
    profile
    && ["projective-human", "projective-nonhuman"].includes(
      normalizedValence
    )
  );
  const readings = applicable
    ? Array.from(profile.readings || [])
    : [];
  const choiceRequired = Boolean(
    applicable
    && profile.mode === "human-source-realization-choice"
    && normalizedValence === "projective-human"
    && readings.length > 1
  );
  const automaticReading = !applicable
    ? ""
    : profile.mode === "source-valence-disambiguated"
      ? normalizedValence === "projective-human"
        ? "regular-human-tla"
        : "anomalous-nonhuman-te"
      : readings.length === 1
        ? readings[0]
        : "";
  return deepFreeze({
    kind:
      "classical-nahuatl-lesson38-patientive-contrast-inventory",
    version: VERSION,
    authorizationStatus: applicable ? "authorized" : "not-applicable",
    sourceStem: normalizedStem,
    sourceValence: normalizedValence,
    profileMode: profile?.mode || "",
    options: readings,
    choiceRequired,
    automaticReading,
    examplesAuthorizeRoute: false,
    lexicalFactsAuthorizeOnlyExceptionalReading: true,
    productivePatientiveRouteRemainsOpen: true,
    grammarAuthority: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

function buildLexicalAuthorizationFrame({
  sourceUnit = "",
  sourceStage = "",
  sourceStem = "",
  verbClass = "",
  sourceVoice = "",
  sourceValence = "",
  sourceObjectPattern = "",
  lexicalFactStem = "",
  patientiveContrastFactStem = "",
} = {}) {
  const lexicalSourceIdentity = normalizeStem(lexicalFactStem) || sourceStem;
  const facts = LEXICAL_SOURCE_FACTS[lexicalSourceIdentity] || {};
  const patientiveContrastProfile =
    PATIENTIVE_CONTRAST_FACTS[
      normalizeStem(patientiveContrastFactStem) || lexicalSourceIdentity
    ] || null;
  const rootStock = deriveRootStockAuthorization({
    sourceStem,
    sourceStage,
  });
  const preteritAgentiveVariants = facts.preteritAgentiveVariants
    || ["ordinary"];
  const finalIRealizations = facts.finalIRealizations || ["preserve"];
  const actionStemVariants = deriveLizActionStemOptions(sourceStem, facts);
  const lizReadingOptions = facts.lizReadingOptions
    || ["compositional-action"];
  const preteritAgentiveNumberOptions = facts.preteritAgentiveNumberOptions
    || (verbClass === "A" ? ["c"] : ["qui"]);
  const agentiveAnimacyOptions = facts.agentiveAnimacyOptions
    || ["animate", "nonanimate"];
  const agentiveAnimacyByConnector = facts.agentiveAnimacyByConnector || {};
  const affinityRequirement = facts.affinityRequirement || "none";
  const lexicalAuthorizationIds = [
    ...(facts.oldPersonFamily
      ? [`old-person-family:${facts.oldPersonFamily}`]
      : []),
    ...(preteritAgentiveVariants.includes("archaic-que")
      ? ["preterit-agentive:archaic-que"]
      : []),
    ...(facts.yauhTiOwner ? ["preterit-agentive:yauh-ti-owner"] : []),
    ...(facts.possessiveAgentiveYoMatrix
      ? ["preterit-agentive:possessive-ca-yo-matrix"]
      : []),
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
    ...(patientiveContrastProfile
      ? ["impersonal-patientive:human-nonhuman-contrast"]
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
      verbClass,
      sourceVoice,
      sourceValence,
      sourceObjectPattern,
    ].join("|"),
    sourceStem,
    lexicalFactStem: lexicalSourceIdentity,
    verbClass,
    oldPersonFamily: facts.oldPersonFamily || "",
    preteritAgentiveVariants,
    yauhTiOwner: facts.yauhTiOwner === true,
    possessiveAgentiveYoMatrix:
      facts.possessiveAgentiveYoMatrix === true,
    rarePossessiveReanalysis: facts.rarePossessiveReanalysis === true,
    finalIRealizations,
    zActionException: facts.zActionException === true,
    actionStemAnalysis: deriveLizActionStemAnalysis(sourceStem, facts),
    actionStemVariants,
    lizReadingOptions,
    preteritAgentiveNumberOptions,
    agentiveAnimacyOptions,
    agentiveAnimacyByConnector,
    affinityRequirement,
    nominalizedActionStemRule: facts.nominalizedActionStemRule || "none",
    passiveHumanObjectDeletion: facts.passiveHumanObjectDeletion === true,
    exceptionalHumanPrefixRetention:
      facts.exceptionalHumanPrefixRetention === true,
    patientiveLexicalReadings: Array.from(
      facts.patientiveLexicalReadings || []
    ),
    patientiveContrastProfile,
    rootStockAuthorization: rootStock
      ? {
        stockKind: rootStock.stockKind,
        targetBase: rootStock.targetBase,
        targetBaseByAllomorph: rootStock.targetBaseByAllomorph,
        allomorphs: rootStock.allomorphs,
        defaultAllomorph: rootStock.defaultAllomorph,
        allomorphChoiceRequired: rootStock.allomorphChoiceRequired,
        nounClass: rootStock.nounClass || "tli",
        nounClassByAllomorph:
          rootStock.nounClassByAllomorph || {},
        vowelRealizationRule: rootStock.vowelRealizationRule,
        sourceReadings: rootStock.sourceReadings,
        resultReadings: rootStock.resultReadings,
        resultReadingsByAllomorph:
          rootStock.resultReadingsByAllomorph,
        referentProfileByAllomorph:
          rootStock.referentProfileByAllomorph,
        rootSourceFrame: rootStock.rootSourceFrame,
        compoundSourceFrame: rootStock.compoundSourceFrame,
        relatedSourceContrastFrame:
          rootStock.relatedSourceContrastFrame,
        causativeSourceFrame: rootStock.causativeSourceFrame,
        lexicalEvidenceFrame: rootStock.lexicalEvidenceFrame,
        unknownSourceFrame: rootStock.unknownSourceFrame,
        sourceAnalysisOptionsByAllomorph:
          rootStock.sourceAnalysisOptionsByAllomorph,
        sourceAnalysisDefaultByAllomorph:
          rootStock.sourceAnalysisDefaultByAllomorph,
        sourceDirectionEvidence: rootStock.sourceDirectionEvidence,
        stockFormativeVowel: rootStock.stockFormativeVowel,
        stockFormativeShorteningApplied:
          rootStock.stockFormativeShorteningApplied,
        witnessedReadingFact: rootStock.witnessedReadingFact,
        sourceShapeAuthorizesFamily:
          rootStock.sourceShapeAuthorizesFamily,
        exampleMembershipRequired: rootStock.exampleMembershipRequired,
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
      sourceFrame.verbClass,
      sourceFrame.sourceVoice,
      sourceFrame.sourceValence,
      sourceFrame.sourceObjectPattern,
    ].join("|")
  );
}

function sourceObjectPatternFromVncProjection(projection = null) {
  const kinds = (projection?.sourceObjectRequests || [])
    .map(request => normalizeKey(request?.objectKind))
    .filter(Boolean);
  const human = kinds.includes("nonspecific-human");
  const nonhuman = kinds.includes("nonspecific-nonhuman");
  if (human && nonhuman) return "human-and-nonhuman";
  if (human) return "nonspecific-human";
  if (nonhuman) return "nonspecific-nonhuman";
  if (kinds.includes("reciprocal")) return "reciprocal";
  if (kinds.includes("reflexive")) return "reflexive";
  const directKind = normalizeKey(projection?.objectKind);
  return ({
    "nonspecific-human": "nonspecific-human",
    "nonspecific-nonhuman": "nonspecific-nonhuman",
    reciprocal: "reciprocal",
    reflexive: "reflexive",
    "mainline-reflexive": "reflexive",
    "shuntline-reflexive": "reflexive",
  })[directKind] || "none";
}

function matrixValenceFromExactObjectRequests(objectRequests = []) {
  const requests = Array.isArray(objectRequests) ? objectRequests : [];
  if (!requests.length) return "intransitive";
  if (requests.length === 2) return "double-object";
  if (requests.length >= 3) return "triple-object";
  return ({
    reflexive: "mainline-reflexive",
    reciprocal: "human-reciprocal",
    "nonspecific-human": "projective-human",
    "nonspecific-nonhuman": "projective-nonhuman",
    "specific-projective": "specific-projective",
  })[normalizeKey(requests[0]?.objectKind)] || "single-object";
}

function patientiveObjectPatternFromEvidence(evidence = []) {
  const kinds = evidence.map(item => normalizeKey(item?.objectKind));
  if (kinds.includes("nonspecific-human")) return "nonspecific-human";
  if (kinds.includes("nonspecific-nonhuman")) return "nonspecific-nonhuman";
  if (kinds.some(kind => [
    "reflexive",
    "mainline-reflexive",
    "shuntline-reflexive",
  ].includes(kind))) return "reflexive";
  if (kinds.includes("reciprocal")) return "reciprocal";
  if (kinds.includes("specific-projective")) return "specific-projective";
  return "none";
}

function getVncResultTense(result = null) {
  const selected = result?.selectedMachineryFrame || null;
  const active = selected?.activeMachineryFrame || selected;
  const prior = active?.priorVncFrame
    || active?.targetLesson7MachineryFrame?.priorVncFrame
    || selected?.priorVncFrame
    || null;
  return normalizeKey(
    result?.normalizedRequest?.tense
      || prior?.tense
      || prior?.tenseFrame?.tense
      || active?.lesson11VncApplicationFrame?.morphologicalTense
      || selected?.lesson11VncApplicationFrame?.morphologicalTense
  );
}

function getExactVncResultSourceProjection(result = null, target = globalThis) {
  const ordinaryProjection = typeof target
    ?.getClassicalNahuatlVncContinuationSourceConstituents === "function"
    ? target.getClassicalNahuatlVncContinuationSourceConstituents(result)
    : null;
  if (ordinaryProjection) return ordinaryProjection;
  if (
    typeof target?.isClassicalNahuatlVncApplicationIssuedResultFrame
      !== "function"
    || target.isClassicalNahuatlVncApplicationIssuedResultFrame(result)
      !== true
  ) {
    return null;
  }
  const request = result.normalizedRequest || {};
  const formation = result.formationSourceMachineryFrame || {};
  const sourceObjectRequests = Array.isArray(request.sourceObjectRequests)
    ? request.sourceObjectRequests
    : Array.isArray(request.objectRequests)
      ? request.objectRequests
      : [];
  return deepFreeze({
    kind: "classical-nahuatl-vnc-result-source-constituent-projection",
    version: VERSION,
    sourceStem: normalizeStem(
      formation.stem || request.sourceStem || request.stem
    ),
    verbClass: normalizeToken(
      formation.classId || request.verbClass || request.stemClass
    ).toUpperCase(),
    sourceValence: normalizeKey(
      request.sourceValence || formation.sourceValence
        || formation.classTargetValence || "intransitive"
    ),
    sourceSubject: normalizeSubject(
      request.sourceSubject || request.subject || "3sg"
    ),
    sourceVoice: normalizeKey(
      result.selectedSourceVoice || request.sourceVoice || "active"
    ),
    sourceNonactiveOptionId: normalizeToken(
      result.selectedNonactiveOptionId
    ),
    sourceObjectRequests,
    projectionRole:
      "read-only-owner-issued-result-source-constituents",
    exactIssuedResultIdentityRequired: true,
    grammarAuthority: false,
    callerSuppliedAuthorityAccepted: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

function captureTypedCompoundVncSource(result = null, projection = null) {
  const sourceAnalysisFrame = result?.sourceAnalysisFrame || null;
  const sourceSelectionFrame =
    sourceAnalysisFrame?.sourceMachineryFrame?.sourceSelectionFrame
    || sourceAnalysisFrame?.formationSourceMachineryFrame?.sourceSelectionFrame
    || result?.formationSourceMachineryFrame?.sourceSelectionFrame
    || result?.sourceMachineryFrame?.sourceSelectionFrame
    || result?.selectedMachineryFrame?.sourceSelectionFrame
    || null;
  const embedStem = normalizeStem(sourceSelectionFrame?.selectedEmbedStem);
  const matrixStem = normalizeStem(sourceSelectionFrame?.selectedMatrixStem);
  if (
    sourceSelectionFrame?.selectedSourceKind !== "embed-matrix"
    || !embedStem
    || !matrixStem
  ) return null;
  return deepFreeze({
    kind: "classical-nahuatl-lesson38-compound-vnc-source-capture-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    canonicalVncResult: result,
    canonicalVncSourceAnalysisFrame: sourceAnalysisFrame,
    canonicalSourceSelectionFrame: sourceSelectionFrame,
    activeCompoundStem: normalizeStem(projection?.sourceStem),
    embedStem,
    matrixStem,
    sourceConstituentOrder: Object.freeze(["embed", "matrix"]),
    relationOptions: Object.freeze([
      "adverbial-embed",
      "incorporated-object",
    ]),
    exactResultIdentityPreserved: true,
    exactSourceAnalysisIdentityPreserved: true,
    examplesAuthorizeRoute: false,
    grammarAuthority: false,
    callerSuppliedAuthorityAccepted: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

function capturePreteritVncResult(result = null, target = globalThis) {
  const projection = getExactVncResultSourceProjection(result, target);
  const typedSlotFrame = result?.finalTypedVncSlotFrame || null;
  const predicateStem = normalizeStem(typedSlotFrame?.slots?.predicate?.stem);
  const tense = getVncResultTense(result);
  if (!projection || !predicateStem || tense !== "preterit") {
    return deepFreeze({
      kind: "classical-nahuatl-preterit-vnc-nominalization-capture-frame",
      version: VERSION,
      authorizationStatus: "blocked",
      blockReason: !projection
        ? "exact-owner-issued-vnc-result-required"
        : tense !== "preterit"
          ? "preterit-vnc-result-required"
          : "typed-vnc-predicate-stem-required",
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
  }
  const sourceObjectPattern = sourceObjectPatternFromVncProjection(projection);
  const sourceValence = projection.sourceValence === "multiple-object"
    ? "double-object"
    : projection.sourceValence === "specific-projective"
      ? "single-object"
      : projection.sourceValence === "mainline-reflexive"
        ? "single-object"
      : projection.sourceValence;
  const frame = deepFreeze({
    kind: "classical-nahuatl-preterit-vnc-nominalization-capture-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    blockReason: "",
    canonicalVncResult: result,
    continuationProjection: projection,
    canonicalVncSourceAnalysisFrame: result.sourceAnalysisFrame || null,
    canonicalVncTypedSlotFrame: typedSlotFrame,
    sourceUnit: "owner-issued-vnc-result",
    sourceStage: "preterit-predicate",
    sourceStem: predicateStem,
    verbClass: normalizeToken(projection.verbClass).toUpperCase(),
    sourceVoice: normalizeKey(result.selectedVoice || projection.sourceVoice || "active"),
    sourceVoiceOperation: normalizeKey(
      result.selectedVoiceOperation
        || projection.sourceNonactiveOptionId
        || result.selectedVoice
        || "active"
    ),
    inherentImpersonalAnalysisPreserved: Boolean(
      result.selectedVoiceOperation === "inherent-impersonal"
      && (
        result.sourceAnalysisFrame?.inherentImpersonalRecord
        || result.selectedMachineryFrame?.inherentImpersonalRecord
      )
    ),
    sourceValence,
    sourceObjectPattern,
    sourceSubject: normalizeSubject(projection.sourceSubject || "3sg"),
    sourceObjectRequests: projection.sourceObjectRequests || [],
    morphologicalTense: tense,
    projectionRole: "read-only-preterit-vnc-result-to-nnc-source",
    exactResultIdentityPreserved: true,
    grammarAuthority: false,
    callerSuppliedAuthorityAccepted: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
  ISSUED_PRETERIT_VNC_CAPTURE_FRAMES.add(frame);
  return frame;
}

function capturePerfectivePatientiveVncResult(
  result = null,
  target = globalThis
) {
  const projection = getExactVncResultSourceProjection(result, target);
  const typedSlotFrame = result?.finalTypedVncSlotFrame || null;
  const perfectiveStem = normalizeStem(
    typedSlotFrame?.slots?.predicate?.stem
  );
  const tense = getVncResultTense(result);
  const selectedVoice = normalizeKey(
    result?.selectedVoice
      || result?.normalizedRequest?.requestedVoice
      || result?.normalizedRequest?.voice
      || projection?.sourceVoice
      || ""
  );
  if (
    !projection
    || !perfectiveStem
    || tense !== "preterit"
    || selectedVoice !== "active"
  ) {
    return deepFreeze({
      kind:
        "classical-nahuatl-perfective-patientive-vnc-capture-frame",
      version: VERSION,
      authorizationStatus: "blocked",
      blockReason: !projection
        ? "exact-owner-issued-active-preterit-vnc-result-required"
        : tense !== "preterit"
          ? "active-preterit-vnc-result-required"
          : selectedVoice !== "active"
            ? "active-preterit-vnc-result-required"
            : "typed-perfective-predicate-stem-required",
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
  }
  const canonicalRequest = result.normalizedRequest || {};
  const sourceObjectRequests = Object.freeze(Array.from(
    Array.isArray(canonicalRequest.sourceObjectRequests)
      ? canonicalRequest.sourceObjectRequests
      : Array.isArray(projection.sourceObjectRequests)
        ? projection.sourceObjectRequests
        : []
  ));
  const activeSourceValence = normalizeKey(
    canonicalRequest.sourceValence
      || projection.sourceValence
      || "intransitive"
  );
  const sourceValence = activeSourceValence === "multiple-object"
    ? "double-object"
    : [
      "specific-projective",
      "mainline-reflexive",
      "shuntline-reflexive",
      "human-reciprocal",
    ].includes(activeSourceValence)
      ? "single-object"
      : activeSourceValence;
  let sourceObjectPattern = sourceObjectPatternFromVncProjection({
    sourceObjectRequests,
    objectKind: canonicalRequest.objectKind || projection.objectKind,
  });
  if (sourceObjectPattern === "none") {
    sourceObjectPattern = activeSourceValence === "projective-human"
      ? "nonspecific-human"
      : activeSourceValence === "projective-nonhuman"
        ? "nonspecific-nonhuman"
        : ["mainline-reflexive", "shuntline-reflexive"]
          .includes(activeSourceValence)
          ? "reflexive"
          : activeSourceValence === "human-reciprocal"
            ? "reciprocal"
            : "none";
  }
  const compoundVncSourceFrame = captureTypedCompoundVncSource(
    result,
    projection
  );
  const frame = deepFreeze({
    kind: "classical-nahuatl-perfective-patientive-vnc-capture-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    blockReason: "",
    canonicalVncResult: result,
    continuationProjection: projection,
    canonicalVncSourceAnalysisFrame: result.sourceAnalysisFrame || null,
    canonicalVncTypedSlotFrame: typedSlotFrame,
    sourceUnit: "owner-issued-active-vnc-result",
    sourceStage: "perfective-core",
    sourceStem: perfectiveStem,
    activeSourceStem: normalizeStem(projection.sourceStem),
    lexicalSourceStem: normalizeStem(projection.sourceStem),
    sourceIsCompound: Boolean(compoundVncSourceFrame),
    compoundVncSourceFrame,
    verbClass: normalizeToken(projection.verbClass).toUpperCase(),
    sourceVoice: "active",
    sourceValence,
    activeSourceValence,
    sourceObjectPattern,
    sourceObjectRequests,
    sourceSubject: normalizeSubject(projection.sourceSubject || "3sg"),
    morphologicalTense: tense,
    exactResultIdentityPreserved: true,
    completeTypedSourceAnalysisPreserved: Boolean(
      result.sourceAnalysisFrame || projection
    ),
    projectionRole:
      "read-only-owner-issued-active-perfective-vnc-to-patientive-source",
    grammarAuthority: false,
    callerSuppliedAuthorityAccepted: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
  ISSUED_PERFECTIVE_PATIENTIVE_VNC_CAPTURE_FRAMES.add(frame);
  return frame;
}

function isClassicalNahuatlPerfectivePatientiveVncCaptureFrame(
  frame = null
) {
  return Boolean(
    ISSUED_PERFECTIVE_PATIENTIVE_VNC_CAPTURE_FRAMES.has(frame)
    && frame?.kind
      === "classical-nahuatl-perfective-patientive-vnc-capture-frame"
    && frame.version === VERSION
    && frame.authorizationStatus === "authorized"
    && frame.sourceVoice === "active"
    && frame.morphologicalTense === "preterit"
    && frame.exactResultIdentityPreserved === true
    && frame.grammarAuthority === false
    && frame.callerSuppliedAuthorityAccepted === false
    && frame.formulaStringAuthority === false
    && frame.surfaceStringAuthority === false
    && Object.isFrozen(frame)
  );
}

function captureImperfectivePatientiveVncResult(
  result = null,
  target = globalThis
) {
  const projection = getExactVncResultSourceProjection(result, target);
  const typedSlotFrame = result?.finalTypedVncSlotFrame || null;
  const finitePredicateStem = normalizeStem(
    typedSlotFrame?.slots?.predicate?.stem
  );
  const imperfectiveStem = normalizeStem(projection?.sourceStem)
    || finitePredicateStem;
  const tense = getVncResultTense(result);
  const selectedVoice = normalizeKey(
    result?.selectedVoice
      || result?.normalizedRequest?.requestedVoice
      || result?.normalizedRequest?.voice
      || projection?.sourceVoice
      || ""
  );
  if (
    !projection
    || !imperfectiveStem
    || !finitePredicateStem
    || tense !== "present"
    || selectedVoice !== "active"
  ) {
    return deepFreeze({
      kind:
        "classical-nahuatl-imperfective-patientive-vnc-capture-frame",
      version: VERSION,
      authorizationStatus: "blocked",
      blockReason: !projection
        ? "exact-owner-issued-active-present-vnc-result-required"
        : tense !== "present" || selectedVoice !== "active"
          ? "active-present-vnc-result-required"
          : "typed-imperfective-predicate-stem-required",
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
  }
  const canonicalRequest = result.normalizedRequest || {};
  const sourceObjectRequests = Object.freeze(Array.from(
    Array.isArray(canonicalRequest.sourceObjectRequests)
      ? canonicalRequest.sourceObjectRequests
      : Array.isArray(projection.sourceObjectRequests)
        ? projection.sourceObjectRequests
        : []
  ));
  const activeSourceValence = normalizeKey(
    canonicalRequest.sourceValence
      || projection.sourceValence
      || "intransitive"
  );
  const sourceValence = activeSourceValence === "multiple-object"
    ? "double-object"
    : [
      "specific-projective",
      "mainline-reflexive",
      "shuntline-reflexive",
      "human-reciprocal",
    ].includes(activeSourceValence)
      ? "single-object"
      : activeSourceValence;
  let sourceObjectPattern = sourceObjectPatternFromVncProjection({
    sourceObjectRequests,
    objectKind: canonicalRequest.objectKind || projection.objectKind,
  });
  if (sourceObjectPattern === "none") {
    sourceObjectPattern = activeSourceValence === "projective-human"
      ? "nonspecific-human"
      : activeSourceValence === "projective-nonhuman"
        ? "nonspecific-nonhuman"
        : ["mainline-reflexive", "shuntline-reflexive"]
          .includes(activeSourceValence)
          ? "reflexive"
          : activeSourceValence === "human-reciprocal"
            ? "reciprocal"
            : "none";
  }
  const compoundVncSourceFrame = captureTypedCompoundVncSource(
    result,
    projection
  );
  const frame = deepFreeze({
    kind: "classical-nahuatl-imperfective-patientive-vnc-capture-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    blockReason: "",
    canonicalVncResult: result,
    continuationProjection: projection,
    canonicalVncSourceAnalysisFrame: result.sourceAnalysisFrame || null,
    canonicalVncTypedSlotFrame: typedSlotFrame,
    sourceUnit: "owner-issued-active-vnc-result",
    sourceStage: "imperfective-core",
    sourceStem: imperfectiveStem,
    finiteTypedPredicateStem: finitePredicateStem,
    activeSourceStem: normalizeStem(projection.sourceStem),
    lexicalSourceStem: normalizeStem(projection.sourceStem),
    sourceIsCompound: Boolean(compoundVncSourceFrame),
    compoundVncSourceFrame,
    verbClass: normalizeToken(projection.verbClass).toUpperCase(),
    sourceVoice: "active",
    sourceValence,
    activeSourceValence,
    sourceObjectPattern,
    sourceObjectRequests,
    sourceSubject: normalizeSubject(projection.sourceSubject || "3sg"),
    morphologicalTense: tense,
    exactResultIdentityPreserved: true,
    completeTypedSourceAnalysisPreserved: Boolean(
      result.sourceAnalysisFrame || projection
    ),
    projectionRole:
      "read-only-owner-issued-active-imperfective-vnc-to-patientive-source",
    grammarAuthority: false,
    callerSuppliedAuthorityAccepted: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
  ISSUED_IMPERFECTIVE_PATIENTIVE_VNC_CAPTURE_FRAMES.add(frame);
  return frame;
}

function isClassicalNahuatlImperfectivePatientiveVncCaptureFrame(
  frame = null
) {
  return Boolean(
    ISSUED_IMPERFECTIVE_PATIENTIVE_VNC_CAPTURE_FRAMES.has(frame)
    && frame?.kind
      === "classical-nahuatl-imperfective-patientive-vnc-capture-frame"
    && frame.version === VERSION
    && frame.authorizationStatus === "authorized"
    && frame.sourceVoice === "active"
    && frame.morphologicalTense === "present"
    && frame.exactResultIdentityPreserved === true
    && frame.grammarAuthority === false
    && frame.callerSuppliedAuthorityAccepted === false
    && frame.formulaStringAuthority === false
    && frame.surfaceStringAuthority === false
    && Object.isFrozen(frame)
  );
}

function predicateNominalizationCaptureSpec(
  nominalizationKind = "",
  state = "absolutive"
) {
  const kind = normalizeKey(nominalizationKind);
  const requestedState = normalizeKey(state || "absolutive");
  return {
    "customary-agentive-reanalysis": {
      tense: "customary-present",
      stage: "customary-present-predicate",
    },
    "customary-agentive-full": {
      tense: "customary-present",
      stage: "customary-present-predicate",
    },
    "customary-patientive": {
      tense: "customary-present",
      stage: "customary-present-predicate",
    },
    instrumentive: requestedState === "possessive"
      ? { tense: "imperfect", stage: "imperfect-predicate" }
      : {
        tense: "customary-present",
        stage: "customary-present-predicate",
      },
    "present-agentive": {
      tense: "present",
      stage: "present-predicate",
    },
    "future-agentive": {
      tense: "future",
      stage: "future-predicate",
    },
    "passive-action": {
      tense: "distant-past",
      stage: "distant-past-predicate",
    },
    "active-action": {
      tense: "distant-past",
      stage: "distant-past-predicate",
    },
  }[kind] || null;
}

function capturePredicateNominalizationVncResult(
  result = null,
  nominalizationKind = "",
  state = "absolutive",
  target = globalThis
) {
  const spec = predicateNominalizationCaptureSpec(
    nominalizationKind,
    state
  );
  const projection = getExactVncResultSourceProjection(result, target);
  const typedSlotFrame = result?.finalTypedVncSlotFrame || null;
  const predicateStem = normalizeStem(typedSlotFrame?.slots?.predicate?.stem);
  const tense = getVncResultTense(result);
  const authorized = Boolean(
    spec
    && projection
    && predicateStem
    && tense === spec.tense
  );
  if (!authorized) {
    return deepFreeze({
      kind:
        "classical-nahuatl-predicate-nominalization-vnc-capture-frame",
      version: VERSION,
      authorizationStatus: "blocked",
      blockReason: !spec
        ? "predicate-nominalization-capture-kind-not-recognized"
        : !projection
          ? "exact-owner-issued-vnc-result-required"
          : tense !== spec.tense
            ? `${spec.tense}-vnc-result-required`
            : "typed-vnc-predicate-stem-required",
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
  }
  const sourceObjectPattern = sourceObjectPatternFromVncProjection(projection);
  const sourceValence = projection.sourceValence === "multiple-object"
    ? "double-object"
    : projection.sourceValence === "specific-projective"
      ? "single-object"
      : projection.sourceValence === "mainline-reflexive"
        ? "single-object"
      : projection.sourceValence;
  const frame = deepFreeze({
    kind: "classical-nahuatl-predicate-nominalization-vnc-capture-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    blockReason: "",
    nominalizationKind: normalizeKey(nominalizationKind),
    canonicalVncResult: result,
    continuationProjection: projection,
    canonicalVncSourceAnalysisFrame: result.sourceAnalysisFrame || null,
    canonicalVncTypedSlotFrame: typedSlotFrame,
    sourceUnit: "owner-issued-vnc-result",
    sourceStage: spec.stage,
    sourceStem: predicateStem,
    verbClass: normalizeToken(projection.verbClass).toUpperCase(),
    sourceVoice: normalizeKey(
      result.selectedVoice || projection.sourceVoice || "active"
    ),
    sourceValence,
    sourceObjectPattern,
    sourceSubject: normalizeSubject(projection.sourceSubject || "3sg"),
    sourceObjectRequests: projection.sourceObjectRequests || [],
    morphologicalTense: tense,
    projectionRole:
      "read-only-owner-issued-vnc-result-to-nnc-source",
    exactResultIdentityPreserved: true,
    grammarAuthority: false,
    callerSuppliedAuthorityAccepted: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
  ISSUED_PREDICATE_NOMINALIZATION_VNC_CAPTURE_FRAMES.add(frame);
  return frame;
}

function isClassicalNahuatlPredicateNominalizationVncCaptureFrame(
  frame = null
) {
  return Boolean(
    ISSUED_PREDICATE_NOMINALIZATION_VNC_CAPTURE_FRAMES.has(frame)
    && frame?.kind
      === "classical-nahuatl-predicate-nominalization-vnc-capture-frame"
    && frame.version === VERSION
    && frame.authorizationStatus === "authorized"
    && frame.exactResultIdentityPreserved === true
    && frame.callerSuppliedAuthorityAccepted === false
    && frame.formulaStringAuthority === false
    && frame.surfaceStringAuthority === false
    && Object.isFrozen(frame)
  );
}

function getVncSourceInitialIKind(result = null) {
  return normalizeKey(
    result?.sourceAnalysisFrame?.sourceMachineryFrame
      ?.citationRuleFrame?.initialVowelKind
    || result?.sourceAnalysisFrame?.formationSourceMachineryFrame
      ?.citationRuleFrame?.initialVowelKind
    || result?.formationSourceMachineryFrame
      ?.citationRuleFrame?.initialVowelKind
    || result?.sourceMachineryFrame
      ?.citationRuleFrame?.initialVowelKind
    || result?.sourceAnalysisFrame?.sourceMachineryFrame
      ?.analysisRuleFrame?.initialVowelKind
    || result?.sourceAnalysisFrame?.sourceInternalMorphology
      ?.initialVowelKind
    || ""
  );
}

function captureDeverbalActionVncResult(
  result = null,
  target = globalThis
) {
  const projection = getExactVncResultSourceProjection(result, target);
  const typedSlotFrame = result?.finalTypedVncSlotFrame || null;
  const coreStem = normalizeStem(typedSlotFrame?.slots?.predicate?.stem);
  const futureCarrier = normalizeStem(typedSlotFrame?.slots?.predicate?.tns);
  const tense = getVncResultTense(result);
  if (!projection || !coreStem || tense !== "future") {
    return deepFreeze({
      kind: "classical-nahuatl-deverbal-action-vnc-capture-frame",
      version: VERSION,
      authorizationStatus: "blocked",
      blockReason: !projection
        ? "exact-owner-issued-vnc-result-required"
        : tense !== "future"
          ? "future-vnc-result-required"
          : "typed-vnc-core-stem-required",
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
  }
  const canonicalRequest = result.normalizedRequest || {};
  const exactSourceObjectProjection = {
    sourceObjectRequests: Array.isArray(canonicalRequest.sourceObjectRequests)
      ? canonicalRequest.sourceObjectRequests
      : projection.sourceObjectRequests,
    objectKind: canonicalRequest.objectKind || projection.objectKind,
  };
  let sourceObjectPattern = sourceObjectPatternFromVncProjection(
    exactSourceObjectProjection
  );
  if (sourceObjectPattern === "none") {
    sourceObjectPattern = ({
      "projective-human": "nonspecific-human",
      "projective-nonhuman": "nonspecific-nonhuman",
      "mainline-reflexive": "reflexive",
      "shuntline-reflexive": "reflexive",
    })[normalizeKey(projection.sourceValence)] || "none";
  }
  const sourceValence = projection.sourceValence === "multiple-object"
    ? "double-object"
    : ["specific-projective", "mainline-reflexive"].includes(
      projection.sourceValence
    )
      ? "single-object"
      : projection.sourceValence;
  const lexicalSourceStem = normalizeStem(
    result.sourceAnalysisFrame?.sourceStem || projection.sourceStem
  );
  const sourceInitialIKind = getVncSourceInitialIKind(result)
    || normalizeKey(canonicalRequest.sourceInitialISelection)
    || normalizeKey(
      canonicalRequest.sourceInitialIAnalysis?.resolvedKind
        || canonicalRequest.sourceInitialIAnalysis?.kind
    )
    || normalizeKey(projection.sourceInitialISelection)
    || (/^i/u.test(lexicalSourceStem)
      && lexicalSourceStem.replace(/^i/u, "") === coreStem
      ? "supportive"
      : "");
  const frame = deepFreeze({
    kind: "classical-nahuatl-deverbal-action-vnc-capture-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    blockReason: "",
    canonicalVncResult: result,
    continuationProjection: projection,
    canonicalVncSourceAnalysisFrame: result.sourceAnalysisFrame || null,
    canonicalVncTypedSlotFrame: typedSlotFrame,
    sourceUnit: "owner-issued-vnc-result",
    sourceStage: "future-core",
    sourceStem: coreStem,
    lexicalSourceStem,
    verbClass: normalizeToken(projection.verbClass).toUpperCase(),
    sourceVoice: normalizeKey(
      result.selectedVoice || projection.sourceVoice || "active"
    ),
    sourceValence,
    sourceObjectPattern,
    sourceSubject: normalizeSubject(projection.sourceSubject || "3sg"),
    sourceObjectRequests:
      exactSourceObjectProjection.sourceObjectRequests || [],
    sourceInitialIKind,
    sourceVoiceOperation: normalizeKey(
      result.selectedVoiceOperation
        || projection.sourceNonactiveOptionId
        || result.selectedVoice
        || "active"
    ),
    sourceNonactiveOptionId: normalizeToken(
      result.selectedNonactiveOptionId
        || projection.sourceNonactiveOptionId
        || ""
    ),
    sourceMorphemes: Object.freeze(
      lexicalSourceStem.split("-").filter(Boolean)
    ),
    sourceIsPolymorphemic: lexicalSourceStem.includes("-"),
    morphologicalTense: tense,
    futureTenseCarrier: futureCarrier,
    coreExcludesSubjectAndTense: true,
    derivationUsesCoreRatherThanPredicateReanalysis: true,
    exactResultIdentityPreserved: true,
    projectionRole: "read-only-owner-issued-vnc-result-core-to-nnc-source",
    grammarAuthority: false,
    callerSuppliedAuthorityAccepted: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
  ISSUED_DEVERBAL_ACTION_VNC_CAPTURE_FRAMES.add(frame);
  return frame;
}

function isClassicalNahuatlDeverbalActionVncCaptureFrame(frame = null) {
  return Boolean(
    ISSUED_DEVERBAL_ACTION_VNC_CAPTURE_FRAMES.has(frame)
    && frame?.kind
      === "classical-nahuatl-deverbal-action-vnc-capture-frame"
    && frame.version === VERSION
    && frame.authorizationStatus === "authorized"
    && frame.sourceStage === "future-core"
    && frame.morphologicalTense === "future"
    && frame.coreExcludesSubjectAndTense === true
    && frame.derivationUsesCoreRatherThanPredicateReanalysis === true
    && frame.exactResultIdentityPreserved === true
    && frame.grammarAuthority === false
    && frame.callerSuppliedAuthorityAccepted === false
    && frame.formulaStringAuthority === false
    && frame.surfaceStringAuthority === false
    && Object.isFrozen(frame)
  );
}

function capturePassivePatientiveVncResult(
  result = null,
  target = globalThis
) {
  const projection = getExactVncResultSourceProjection(result, target);
  const selectedMachinery = result?.selectedMachineryFrame || null;
  const nonactiveStemRecord = selectedMachinery?.nonactiveStemRecord || null;
  const passiveParticipantFrame =
    selectedMachinery?.voiceTransformationFrame || null;
  const selectedVoice = normalizeKey(
    result?.selectedVoice || result?.selectedVoiceOperation || ""
  );
  const sourceStem = normalizeStem(nonactiveStemRecord?.nonactiveStem);
  const nonactiveSuffix = normalizeKey(nonactiveStemRecord?.suffixFamily)
    .replace(/ō/gu, "ō");
  const sourceObjectRequests = Object.freeze(
    Array.from(projection?.sourceObjectRequests || [])
  );
  const passiveSourcePositions = Array.from(
    passiveParticipantFrame?.sourceObjectClusterFrame?.positions || []
  );
  const activeSourceValence = passiveSourcePositions.length > 1
    || sourceObjectRequests.length > 1
    ? "multiple-object"
    : normalizeKey(projection?.sourceValence);
  const activeSourceIsTransitive = Boolean(
    activeSourceValence
    && activeSourceValence !== "intransitive"
  );
  if (
    !projection
    || selectedVoice !== "passive"
    || !sourceStem
    || ![
      "lō", "lō-hua", "hua-lō", "ō", "ō-hua", "o-hua", "hua",
    ].includes(
      nonactiveSuffix
    )
    || !activeSourceIsTransitive
  ) {
    return deepFreeze({
      kind:
        "classical-nahuatl-passive-patientive-vnc-capture-frame",
      version: VERSION,
      authorizationStatus: "blocked",
      blockReason: !projection
        ? "exact-owner-issued-vnc-result-required"
        : selectedVoice !== "passive"
          ? "exact-owner-issued-passive-vnc-result-required"
          : !activeSourceIsTransitive
            ? "37.9-passive-patientive-has-no-intransitive-ultimate-source"
            : "typed-passive-nonactive-core-required",
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
  }
  let activeSourceObjectPattern = sourceObjectPatternFromVncProjection(
    projection
  );
  if (activeSourceObjectPattern === "none") {
    activeSourceObjectPattern = ({
      "mainline-reflexive": "reflexive",
      "shuntline-reflexive": "reflexive",
    })[activeSourceValence] || "none";
  }
  const sourceValence = activeSourceValence === "multiple-object"
    ? "double-object"
    : [
      "specific-projective",
      "mainline-reflexive",
      "shuntline-reflexive",
      "human-reciprocal",
    ].includes(activeSourceValence)
      ? "single-object"
      : activeSourceValence;
  const activeObjectEvidence = Object.freeze(
    (passiveSourcePositions.length
      ? passiveSourcePositions
      : sourceObjectRequests)
      .filter(item => [
        "nonspecific-human",
        "nonspecific-nonhuman",
        "reflexive",
        "mainline-reflexive",
        "shuntline-reflexive",
        "reciprocal",
      ].includes(normalizeKey(item?.objectKind)))
      .map(item => deepFreeze({
        objectId: normalizeToken(item?.objectId),
        objectKind: normalizeKey(item?.objectKind),
        objectPerson: normalizeSubject(item?.objectPerson),
        governor: normalizeKey(item?.governor),
        derivationalLevel: Number(item?.derivationalLevel || 0),
        carrier: normalizeStem(item?.carrier),
        evidenceRole: "active-source-object",
      }))
  );
  const retainedPassivePositions = Array.from(
    passiveParticipantFrame?.targetObjectClusterFrame?.positions || []
  );
  let retainedObjectEvidence = retainedPassivePositions.map(item => deepFreeze({
    objectId: normalizeToken(item?.objectId),
    objectKind: normalizeKey(item?.objectKind),
    objectPerson: normalizeSubject(item?.objectPerson),
    governor: normalizeKey(item?.governor),
    derivationalLevel: Number(item?.derivationalLevel || 0),
    carrier: normalizeStem(item?.carrier),
    evidenceRole: "passive-surviving-object",
  }));
  if (
    !retainedObjectEvidence.length
    && ["mainline-reflexive", "shuntline-reflexive"]
      .includes(activeSourceValence)
  ) {
    retainedObjectEvidence = [deepFreeze({
      objectId: "reflexive",
      objectKind: "shuntline-reflexive",
      objectPerson: normalizeSubject(projection.sourceSubject || "3sg"),
      governor: "directive",
      derivationalLevel: 1,
      carrier: "ne",
      evidenceRole: "passive-reflexive-shuntline",
    })];
  }
  retainedObjectEvidence = Object.freeze(retainedObjectEvidence);
  const sourceObjectPattern = patientiveObjectPatternFromEvidence(
    retainedObjectEvidence
  );
  const promotedObjectId = normalizeToken(
    passiveParticipantFrame?.targetObjectClusterFrame?.promotedObjectId
  );
  const promotedObjectEvidence = deepFreeze(
    promotedObjectId
      ? activeObjectEvidence.find(item => item.objectId === promotedObjectId)
        || {
          objectId: promotedObjectId,
          objectKind: "specific-projective",
          objectPerson: normalizeSubject(
            passiveParticipantFrame?.targetObjectClusterFrame
              ?.promotedObjectPerson
          ),
          evidenceRole: "passive-promoted-object",
        }
      : {
        objectId: "",
        objectKind: activeSourceValence === "specific-projective"
          ? "specific-projective"
          : activeSourceValence === "mainline-reflexive"
            ? "reflexive"
            : "",
        objectPerson: normalizeSubject(
          passiveParticipantFrame?.targetSubject
        ),
        evidenceRole: "passive-promoted-object",
      }
  );
  const completeActiveObjectEvidence = Object.freeze(
    promotedObjectEvidence.objectId
    && !activeObjectEvidence.some(item => (
      item.objectId === promotedObjectEvidence.objectId
    ))
      ? [promotedObjectEvidence, ...activeObjectEvidence]
      : Array.from(activeObjectEvidence)
  );
  const noObjectPassiveBranch = Boolean(
    sourceObjectPattern === "none"
    && ["specific-projective", "projective-human", "projective-nonhuman"]
      .includes(activeSourceValence)
  );
  const compoundVncSourceFrame = captureTypedCompoundVncSource(
    result,
    projection
  );
  const frame = deepFreeze({
    kind: "classical-nahuatl-passive-patientive-vnc-capture-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    blockReason: "",
    canonicalVncResult: result,
    continuationProjection: projection,
    canonicalVncSourceAnalysisFrame: result.sourceAnalysisFrame || null,
    canonicalVncTypedSlotFrame: result.finalTypedVncSlotFrame || null,
    canonicalNonactiveStemRecord: nonactiveStemRecord,
    canonicalPassiveParticipantFrame: passiveParticipantFrame,
    sourceUnit: "owner-issued-passive-vnc-result",
    sourceStage: "nonactive-core",
    sourceStem,
    activeSourceStem: normalizeStem(projection.sourceStem),
    sourceIsCompound: Boolean(compoundVncSourceFrame),
    compoundVncSourceFrame,
    verbClass: normalizeToken(projection.verbClass).toUpperCase(),
    sourceVoice: "passive",
    sourceVoiceOperation: normalizeKey(
      result.selectedVoiceOperation || "passive"
    ),
    sourceNonactiveOptionId: normalizeToken(
      result.selectedNonactiveOptionId
      || projection.sourceNonactiveOptionId
      || ""
    ),
    sourceValence,
    activeSourceValence,
    activeSourceObjectPattern,
    sourceObjectPattern,
    sourceObjectRequests,
    activeObjectEvidence: completeActiveObjectEvidence,
    retainedObjectEvidence,
    promotedObjectEvidence,
    retainedObjectCount: retainedObjectEvidence.length,
    retainedObjectCarrier:
      retainedObjectEvidence.length === 1
        ? retainedObjectEvidence[0].carrier
        : "",
    sourceSubject: normalizeSubject(projection.sourceSubject || "3sg"),
    patientReferent: normalizeSubject(
      passiveParticipantFrame?.targetSubject
      || result.normalizedRequest?.subject
      || "3sg"
    ),
    nonactiveSuffix,
    noObjectPassiveBranch,
    ultimateActiveSourceIsTransitive: true,
    nonspecificProjectiveEvidencePreserved:
      retainedObjectEvidence.some(item => (
        item.objectKind === "nonspecific-human"
        || item.objectKind === "nonspecific-nonhuman"
      )),
    shuntlineReflexiveEvidencePreserved:
      retainedObjectEvidence.some(item => (
        item.objectKind === "shuntline-reflexive"
        || item.objectKind === "reflexive"
      )),
    exactResultIdentityPreserved: true,
    projectionRole:
      "read-only-owner-issued-passive-vnc-core-to-patientive-source",
    grammarAuthority: false,
    callerSuppliedAuthorityAccepted: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
  ISSUED_PASSIVE_PATIENTIVE_VNC_CAPTURE_FRAMES.add(frame);
  return frame;
}

function isClassicalNahuatlPassivePatientiveVncCaptureFrame(frame = null) {
  return Boolean(
    ISSUED_PASSIVE_PATIENTIVE_VNC_CAPTURE_FRAMES.has(frame)
    && frame?.kind
      === "classical-nahuatl-passive-patientive-vnc-capture-frame"
    && frame.version === VERSION
    && frame.authorizationStatus === "authorized"
    && frame.sourceVoice === "passive"
    && frame.ultimateActiveSourceIsTransitive === true
    && frame.exactResultIdentityPreserved === true
    && frame.grammarAuthority === false
    && frame.callerSuppliedAuthorityAccepted === false
    && frame.formulaStringAuthority === false
    && frame.surfaceStringAuthority === false
    && Object.isFrozen(frame)
  );
}

function captureImpersonalPatientiveVncResult(
  result = null,
  target = globalThis
) {
  const projection = getExactVncResultSourceProjection(result, target);
  const selectedMachinery = result?.selectedMachineryFrame || null;
  const voiceTransformationFrame =
    selectedMachinery?.voiceTransformationFrame || null;
  const nonactiveStemRecord = selectedMachinery?.nonactiveStemRecord || null;
  const selectedVoice = normalizeKey(
    result?.selectedVoice || result?.normalizedRequest?.voice || ""
  );
  const selectedVoiceOperation = normalizeKey(
    result?.selectedVoiceOperation
      || projection?.sourceNonactiveOptionId
      || ""
  );
  const sourceStem = normalizeStem(nonactiveStemRecord?.nonactiveStem);
  const nonactiveSuffix = normalizeKey(nonactiveStemRecord?.suffixFamily)
    .replace(/ō/gu, "ō");
  if (
    !projection
    || selectedVoice !== "impersonal"
    || !sourceStem
    || ![
      "lō", "lō-hua", "hua-lō", "ō", "ō-hua", "o-hua", "hua",
    ].includes(
      nonactiveSuffix
    )
  ) {
    return deepFreeze({
      kind:
        "classical-nahuatl-impersonal-patientive-vnc-capture-frame",
      version: VERSION,
      authorizationStatus: "blocked",
      blockReason: !projection
        ? "exact-owner-issued-vnc-result-required"
        : selectedVoice !== "impersonal"
          ? "exact-owner-issued-impersonal-vnc-result-required"
          : "typed-impersonal-nonactive-core-required",
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
  }
  const canonicalRequest = result.normalizedRequest || {};
  const sourceClusterPositions = Array.from(
    selectedMachinery?.voiceTransformationFrame
      ?.sourceObjectClusterFrame?.positions
    || selectedMachinery?.sourceObjectClusterFrame?.positions
    || []
  );
  const sourceObjectRequests = Object.freeze(
    Array.from(
      Array.isArray(canonicalRequest.sourceObjectRequests)
        ? canonicalRequest.sourceObjectRequests
        : sourceClusterPositions.length
          ? sourceClusterPositions
        : projection.sourceObjectRequests || []
    )
  );
  const sourceObjectPattern = sourceObjectPatternFromVncProjection(
    {
      sourceObjectRequests,
      objectKind: canonicalRequest.objectKind || projection.objectKind,
    }
  );
  const activeSourceValence = sourceObjectRequests.length > 1
    || sourceClusterPositions.length > 1
    ? "multiple-object"
    : normalizeKey(
      canonicalRequest.sourceValence
        || projection.sourceValence
        || "intransitive"
    );
  const sourceValence = activeSourceValence === "multiple-object"
    ? "double-object"
    : [
      "specific-projective",
      "mainline-reflexive",
      "shuntline-reflexive",
      "human-reciprocal",
    ].includes(activeSourceValence)
      ? "single-object"
      : activeSourceValence;
  const activeSourceStem = normalizeStem(projection.sourceStem);
  const sourceObjectKinds = Object.freeze(
    sourceObjectRequests
      .map(item => normalizeKey(item?.objectKind))
      .filter(Boolean)
  );
  const directObjectKind = normalizeKey(
    canonicalRequest.objectKind || projection.objectKind
  );
  const objectInterpretation = normalizeKey(
    canonicalRequest.objectInterpretation
  );
  const reflexiveReciprocalAncestryKind = sourceObjectKinds.includes(
    "reciprocal"
  ) || directObjectKind === "reciprocal"
    || objectInterpretation === "reciprocal"
    || activeSourceValence === "human-reciprocal"
    ? "reciprocal"
    : sourceObjectKinds.some(kind => [
      "reflexive",
      "mainline-reflexive",
      "shuntline-reflexive",
    ].includes(kind))
      || ["mainline-reflexive", "shuntline-reflexive"].includes(
        activeSourceValence
      )
      || [
        "reflexive",
        "mainline-reflexive",
        "shuntline-reflexive",
      ].includes(directObjectKind)
      ? "reflexive"
      : "";
  const explicitProjectiveObjectEvidence = sourceObjectRequests
      .filter(item => [
        "nonspecific-human",
        "nonspecific-nonhuman",
        "specific-projective",
      ].includes(normalizeKey(item?.objectKind)))
      .map(item => deepFreeze({
        objectId: normalizeToken(item?.objectId),
        objectKind: normalizeKey(item?.objectKind),
        objectPerson: normalizeSubject(item?.objectPerson),
        governor: normalizeKey(item?.governor),
        derivationalLevel: Number(item?.derivationalLevel || 0),
        carrier: normalizeStem(item?.carrier),
        evidenceRole: "impersonal-surviving-projective-object",
      }));
  const retainedProjectiveObjectEvidence = Object.freeze(
    explicitProjectiveObjectEvidence.length
      ? explicitProjectiveObjectEvidence
      : ["nonspecific-human", "nonspecific-nonhuman"].includes(
        sourceObjectPattern
      )
        ? [deepFreeze({
          objectId: "source-direct-object",
          objectKind: sourceObjectPattern,
          objectPerson: "",
          governor: "source-verbstem",
          derivationalLevel: 0,
          carrier: sourceObjectPattern === "nonspecific-human"
            ? "tē"
            : "tla",
          evidenceRole: "impersonal-surviving-projective-object",
        })]
        : []
  );
  const compoundVncSourceFrame = captureTypedCompoundVncSource(
    result,
    projection
  );
  const frame = deepFreeze({
    kind: "classical-nahuatl-impersonal-patientive-vnc-capture-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    blockReason: "",
    canonicalVncResult: result,
    continuationProjection: projection,
    canonicalVncSourceAnalysisFrame:
      result.sourceAnalysisFrame
      || nonactiveStemRecord.sourceInternalMorphology
      || null,
    canonicalVncTypedSlotFrame: result.finalTypedVncSlotFrame || null,
    canonicalNonactiveStemRecord: nonactiveStemRecord,
    sourceUnit: "owner-issued-impersonal-vnc-result",
    sourceStage: "nonactive-core",
    sourceStem,
    activeSourceStem,
    sourceIsCompound: Boolean(compoundVncSourceFrame),
    compoundVncSourceFrame,
    verbClass: normalizeToken(projection.verbClass).toUpperCase(),
    sourceVoice: "impersonal",
    sourceVoiceOperation: selectedVoiceOperation || "impersonal",
    sourceNonactiveOptionId: normalizeToken(
      result.selectedNonactiveOptionId
        || projection.sourceNonactiveOptionId
        || ""
    ),
    sourceValence,
    activeSourceValence,
    sourceObjectPattern,
    sourceObjectRequests,
    sourceObjectKinds,
    objectInterpretation,
    reflexiveReciprocalAncestryKind,
    shuntlineNeInheritedAutomatically: Boolean(
      reflexiveReciprocalAncestryKind
    ),
    retainedProjectiveObjectEvidence,
    humanProjectiveImpersonalizedPassive:
      voiceTransformationFrame
        ?.humanProjectiveImpersonalizedPassive === true,
    voiceOperationSequence: Object.freeze(Array.from(
      voiceTransformationFrame?.voiceOperationSequence || []
    )),
    activeHumanObjectCarrier: normalizeStem(
      voiceTransformationFrame?.activeHumanObjectCarrier
    ),
    passivePatientPromotionApplied:
      voiceTransformationFrame?.passivePatientPromotionApplied === true,
    passivePatientSubjectThenDeletedByImpersonalization:
      voiceTransformationFrame
        ?.passivePatientSubjectThenDeletedByImpersonalization === true,
    directImpersonalizationOfActiveBlocked:
      voiceTransformationFrame
        ?.directImpersonalizationOfActiveBlocked === true,
    impersonalCarrier: normalizeStem(
      voiceTransformationFrame?.impersonalCarrier
    ),
    impersonalizedPassiveStem: normalizeStem(
      voiceTransformationFrame?.impersonalizedPassiveStem
    ),
    activeObjectTopologyPreserved: true,
    sourceSubject: normalizeSubject(projection.sourceSubject || "3sg"),
    nonactiveSuffix,
    rootPlusYaBoundaryAvailable: Boolean(
      nonactiveSuffix === "lō"
      && nonactiveStemRecord.sourceInternalMorphology
        ?.explicitRootPlusYaBoundary === true
    ),
    rootPlusYaRemovalAlreadyAppliedByVncOwner: Boolean(
      nonactiveSuffix === "lō"
      && nonactiveStemRecord.sourceInternalMorphology
        ?.explicitRootPlusYaBoundary === true
      && !/(?:^|-)ya(?:-|$)/u.test(sourceStem)
    ),
    sourceAlreadyCarriesTlaImpersonalLayer:
      /^tla-/u.test(activeSourceStem)
      || selectedVoiceOperation === "tla-impersonal",
    inherentImpersonalAnalysisPreserved: Boolean(
      selectedVoiceOperation === "inherent-impersonal"
      || result.sourceAnalysisFrame?.inherentImpersonalRecord
      || selectedMachinery?.inherentImpersonalRecord
    ),
    exactResultIdentityPreserved: true,
    completeTypedSourceAnalysisPreserved: Boolean(
      result.sourceAnalysisFrame || projection
    ),
    projectionRole:
      "read-only-owner-issued-impersonal-vnc-core-to-patientive-source",
    grammarAuthority: false,
    callerSuppliedAuthorityAccepted: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
  ISSUED_IMPERSONAL_PATIENTIVE_VNC_CAPTURE_FRAMES.add(frame);
  return frame;
}

function isClassicalNahuatlImpersonalPatientiveVncCaptureFrame(
  frame = null
) {
  return Boolean(
    ISSUED_IMPERSONAL_PATIENTIVE_VNC_CAPTURE_FRAMES.has(frame)
    && frame?.kind
      === "classical-nahuatl-impersonal-patientive-vnc-capture-frame"
    && frame.version === VERSION
    && frame.authorizationStatus === "authorized"
    && frame.sourceVoice === "impersonal"
    && frame.exactResultIdentityPreserved === true
    && frame.grammarAuthority === false
    && frame.callerSuppliedAuthorityAccepted === false
    && frame.formulaStringAuthority === false
    && frame.surfaceStringAuthority === false
    && Object.isFrozen(frame)
  );
}

function buildInstrumentiveSourcePairFrame(request = {}, target = globalThis) {
  const customaryImpersonal = capturePredicateNominalizationVncResult(
    request.canonicalInstrumentiveAbsolutiveVncResult,
    "instrumentive",
    "absolutive",
    target
  );
  const imperfectActive = capturePredicateNominalizationVncResult(
    request.canonicalInstrumentivePossessiveVncResult,
    "instrumentive",
    "possessive",
    target
  );
  const customarySourceStem = normalizeStem(
    customaryImpersonal?.continuationProjection?.sourceStem
  );
  const imperfectSourceStem = normalizeStem(
    imperfectActive?.continuationProjection?.sourceStem
  );
  const sameTypedLexicalSource = Boolean(
    customarySourceStem
    && customarySourceStem === imperfectSourceStem
    && customaryImpersonal?.verbClass === imperfectActive?.verbClass
  );
  const authorized = Boolean(
    isClassicalNahuatlPredicateNominalizationVncCaptureFrame(
      customaryImpersonal
    )
    && isClassicalNahuatlPredicateNominalizationVncCaptureFrame(
      imperfectActive
    )
    && ["impersonal", "nonactive"].includes(
      customaryImpersonal.sourceVoice
    )
    && imperfectActive.sourceVoice === "active"
    && sameTypedLexicalSource
  );
  const frame = deepFreeze({
    kind: "classical-nahuatl-instrumentive-source-pair-frame",
    version: VERSION,
    authorizationStatus: authorized ? "authorized" : "blocked",
    blockReason: authorized
      ? ""
      : customaryImpersonal?.authorizationStatus !== "authorized"
        ? customaryImpersonal?.blockReason
          || "customary-impersonal-vnc-result-required"
        : imperfectActive?.authorizationStatus !== "authorized"
          ? imperfectActive?.blockReason
            || "imperfect-active-vnc-result-required"
          : !["impersonal", "nonactive"].includes(
            customaryImpersonal?.sourceVoice
          )
            ? "customary-impersonal-vnc-result-required"
            : imperfectActive?.sourceVoice !== "active"
              ? "imperfect-active-vnc-result-required"
              : "instrumentive-source-pair-must-share-typed-lexical-source",
    customaryImpersonal,
    imperfectActive,
    customaryPresentPredicateStem:
      customaryImpersonal?.sourceStem || "",
    imperfectPredicateStem: imperfectActive?.sourceStem || "",
    sharedSourceStem: sameTypedLexicalSource ? customarySourceStem : "",
    sameTypedLexicalSource,
    absolutiveStateSourcePath:
      "customary-present-impersonal-vnc-result",
    possessiveStateSourcePath: "imperfect-active-vnc-result",
    subjectContinuityInAbsolutive: true,
    sourceSubjectBecomesPossessorInPossessive: true,
    targetSubjectImportedOutsideBothSourceVncs: true,
    completeParadigmRequiresBothSources: true,
    exactResultIdentitiesPreserved: authorized,
    grammarAuthority: false,
    callerSuppliedAuthorityAccepted: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
  if (authorized) ISSUED_INSTRUMENTIVE_SOURCE_PAIR_FRAMES.add(frame);
  return frame;
}

function isClassicalNahuatlInstrumentiveSourcePairFrame(frame = null) {
  return Boolean(
    ISSUED_INSTRUMENTIVE_SOURCE_PAIR_FRAMES.has(frame)
    && frame?.kind
      === "classical-nahuatl-instrumentive-source-pair-frame"
    && frame.version === VERSION
    && frame.authorizationStatus === "authorized"
    && frame.sameTypedLexicalSource === true
    && frame.exactResultIdentitiesPreserved === true
    && frame.callerSuppliedAuthorityAccepted === false
    && frame.formulaStringAuthority === false
    && frame.surfaceStringAuthority === false
    && Object.isFrozen(frame)
  );
}

function isClassicalNahuatlPreteritVncNominalizationCaptureFrame(frame = null) {
  return Boolean(
    ISSUED_PRETERIT_VNC_CAPTURE_FRAMES.has(frame)
    && frame?.kind
      === "classical-nahuatl-preterit-vnc-nominalization-capture-frame"
    && frame.version === VERSION
    && frame.authorizationStatus === "authorized"
    && frame.exactResultIdentityPreserved === true
    && frame.callerSuppliedAuthorityAccepted === false
    && frame.formulaStringAuthority === false
    && frame.surfaceStringAuthority === false
    && Object.isFrozen(frame)
  );
}

function findHostileAuthorityPath(
  value,
  path = "request",
  target = globalThis
) {
  if (!value || typeof value !== "object") return "";
  if (
    value.kind === "classical-nahuatl-deverbal-nnc-source-frame"
    || value.kind === "classical-nahuatl-vnc-application-result-frame"
    || value.kind === "classical-nahuatl-ordinary-nnc-result-frame"
    || value.kind === "classical-nahuatl-pronominal-nnc-result-frame"
    || isClassicalNahuatlDeverbalNncGrammarFrame(value)
    || (
      typeof target?.isClassicalNahuatlClosureFrame === "function"
      && target.isClassicalNahuatlClosureFrame(value) === true
    )
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
      const nested = findHostileAuthorityPath(item, nextPath, target);
      if (nested) return nested;
    }
  }
  return "";
}

function joinMorphs(parts = []) {
  return parts.map(normalizeStem).filter(Boolean).join("-");
}

function buildPredicateMorphemicShapeFrame(sourceFrame = null) {
  const predicateStem = normalizeStem(sourceFrame?.sourceStem);
  const morphs = predicateStem.split("-").filter(Boolean);
  const lexicalSourceStem = normalizeStem(
    sourceFrame?.predicateNominalizationVncCaptureFrame
      ?.continuationProjection?.sourceStem
      || sourceFrame?.preteritVncCaptureFrame
        ?.continuationProjection?.sourceStem
  );
  const sourceAnalysisFrame = sourceFrame
    ?.canonicalVncSourceAnalysisFrame || null;
  return deepFreeze({
    kind: "classical-nahuatl-predicate-morphemic-shape-frame",
    version: VERSION,
    authorizationStatus: predicateStem ? "authorized" : "blocked",
    blockReason: predicateStem ? "" : "typed-predicate-stem-required",
    predicateStem,
    morphs,
    morphemicComplexity: morphs.length > 1
      ? "polymorphemic"
      : "monomorphemic",
    finalMorpheme: morphs.at(-1) || "",
    prefinalMorpheme: morphs.at(-2) || "",
    lexicalSourceStem,
    sourceAnalysisFrame,
    exactSourceAnalysisIdentityPreserved: Boolean(
      sourceAnalysisFrame
      && sourceAnalysisFrame === sourceFrame.canonicalVncResult
        ?.sourceAnalysisFrame
    ),
    internalBoundariesPreserved: predicateStem.includes("-"),
    sourceInitialVowelAnalysisPreserved: Boolean(
      sourceAnalysisFrame || lexicalSourceStem
    ),
    shapeSuppliesGrammaticalEvidence: true,
    shapeAloneSuppliesLexicalMeaning: false,
    exampleStemMembershipRequired: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

function buildInstrumentiveRealizationFrame({
  sourceFrame = null,
  state = "absolutive",
  targetStem = "",
} = {}) {
  const shape = buildPredicateMorphemicShapeFrame(sourceFrame);
  const sourcePattern = sourceFrame?.sourceObjectPattern || "none";
  const absolutive = state === "absolutive";
  const hasHua = /(?:^|-)hua(?:-|$)/u.test(targetStem);
  const hasHuaLo = /(?:^|-)hua-lō(?:-|$)/u.test(targetStem);
  const lexicalSourceInitialI = /^i/u.test(shape.lexicalSourceStem);
  const supportiveEnvironment = [
    "nonspecific-nonhuman",
    "reflexive",
  ].includes(sourcePattern);
  return deepFreeze({
    kind: "classical-nahuatl-instrumentive-realization-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    selectedState: state,
    sourcePath: absolutive
      ? "customary-present-impersonal"
      : "imperfect-active",
    sourceMorphemicShapeFrame: shape,
    targetStem,
    sourceObjectPattern: sourcePattern,
    sourceParticipantsPreservedInsideNounstem: true,
    sourceSubjectBecomesPossessor: !absolutive,
    importedInstrumentSubject: "3common-nonanimate",
    customaryAgentsRemainContextual: absolutive,
    compositionalReading: absolutive
      ? "thing-or-means-by-which-the-source-event-is-customarily-realized"
      : "possessor-associated-means-by-which-the-source-event-was-realized",
    lexicalizedReadingRequiresTypedLexicalOrContextualEvidence: true,
    lexicalizedReadingIsInferredFromShape: false,
    selectedNonactiveHuaRealization: hasHuaLo
      ? "hua-lō"
      : hasHua
        ? "hua"
        : "not-applicable",
    huaAndHuaLoAreLicensedSourceVariants: hasHua || hasHuaLo,
    huaVariantMustArriveInOwnerIssuedVncResult: true,
    supportiveInitialIEnvironment: lexicalSourceInitialI
      && supportiveEnvironment,
    supportiveInitialIDeletionInheritedFromVncOwner:
      lexicalSourceInitialI && supportiveEnvironment,
    supportiveInitialIIsUserChoice: false,
    setDefinedHighGenerality: true,
    fixedEnglishInstrumentTypeRequired: false,
    exampleStemMembershipRequired: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

function buildPresentAgentiveFrame({
  sourceFrame = null,
  targetStem = "",
} = {}) {
  const shape = buildPredicateMorphemicShapeFrame(sourceFrame);
  return deepFreeze({
    kind: "classical-nahuatl-present-agentive-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    sourceMorphemicShapeFrame: shape,
    sourcePredicateStem: sourceFrame?.sourceStem || "",
    targetStem,
    predicateBecomesNounstemWithoutSuffixReplacement: true,
    presentTenseZeroIsFinalConstituent: targetStem.endsWith("-0"),
    sourceSubject: sourceFrame?.sourceSubject || "",
    sourceSubjectAndNumberContinueIntoNnc: true,
    allowedStates: ["absolutive"],
    sourceObjectPattern: sourceFrame?.sourceObjectPattern || "none",
    reflexiveCarrierRemainsSubjectMatched:
      sourceFrame?.sourceObjectPattern === "reflexive",
    incorporatedAndCompoundStructurePreserved: true,
    lexicalizedOrMetaphoricalReadingRequiresTypedEvidence: true,
    lexicalizedResultMayEnterSeparatelyLicensedContinuation: true,
    lexicalMeaningInferredFromShape: false,
    exampleStemMembershipRequired: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

function buildFutureAgentiveFrame({
  sourceFrame = null,
  restrictedUse = "",
  generalUse = "",
  omittedApplicativeObject = false,
} = {}) {
  const shape = buildPredicateMorphemicShapeFrame(sourceFrame);
  return deepFreeze({
    kind: "classical-nahuatl-future-agentive-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    sourceMorphemicShapeFrame: shape,
    sourcePredicateStem: sourceFrame?.sourceStem || "",
    restrictedUseStem: restrictedUse,
    generalUseStem: generalUse,
    futureZPreserved: /(?:^|-)z$/u.test(restrictedUse),
    generalUseCaAddedAfterFutureZ: /(?:^|-)z-cā$/u.test(generalUse),
    restrictedUseDistribution: ["absolutive-state"],
    generalUseDistribution: [
      "possessive-state",
      "nominal-compound-embed",
      "verbal-compound-embed",
    ],
    sourceSubject: sourceFrame?.sourceSubject || "",
    sourceSubjectAndNumberContinueIntoNnc: true,
    singularNumberDyad: "qui-0",
    pluralNumberDyad: "qu-eh",
    omittedApplicativeObject,
    omittedApplicativeObjectRemainsGrammaticallyAvailable:
      omittedApplicativeObject,
    restrictedStemAsEmbedRequiresTypedLexicalization: true,
    lexicalizedOrCompoundReadingRequiresTypedEvidence: true,
    suffixOrExampleSelectionIsUserChoice: false,
    exampleStemMembershipRequired: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

function buildActionNncTaxonomyFrame({
  nominalizationKind = "",
  sourceFrame = null,
  restrictedUse = "",
  generalUse = "",
} = {}) {
  return deepFreeze({
    kind: "classical-nahuatl-action-nnc-taxonomy-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    actionNncKinds: ["passive-action", "active-action"],
    selectedActionNncKind: nominalizationKind,
    passiveAndActiveKindsRemainDistinct: true,
    licensedSemanticScope: [
      "action",
      "process",
      "event",
      "resultant-state",
      "instance-of-source-action",
      "result-of-source-action",
    ],
    semanticScopeIsContextualOrLexicallyTyped: true,
    shapeAloneSelectsLexicalMeaning: false,
    englishActionLabelIsUniversallyExact: false,
    sourceVoiceSelectsStructuralFamily: true,
    sourceVoice: sourceFrame?.sourceVoice || "",
    restrictedUseStem: restrictedUse,
    restrictedUseFormation: "general-use-source-plus-yo-tl-matrix-compound",
    generalUseStem: generalUse,
    generalUseFormation: "nominalized-distant-past-predicate",
    restrictedAndGeneralUseRemainDistinct: true,
    userChoosesMeaningOnlyWhenContextLeavesRealAmbiguity: true,
    exampleStemMembershipRequired: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

function buildPassiveActionFrame({
  sourceFrame = null,
  selectedState = "absolutive",
  restrictedUse = "",
  generalUse = "",
  transformedPossessor = "",
} = {}) {
  const shape = buildPredicateMorphemicShapeFrame(sourceFrame);
  return deepFreeze({
    kind: "classical-nahuatl-passive-action-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    sourceMorphemicShapeFrame: shape,
    sourceStage: sourceFrame?.sourceStage || "",
    sourceVoice: sourceFrame?.sourceVoice || "",
    sourceValence: sourceFrame?.sourceValence || "",
    sourceObjectPattern: sourceFrame?.sourceObjectPattern || "none",
    passivePerspectivePreserved: true,
    exactPassiveDistantPastResultRequired: true,
    sourcePredicateStem: sourceFrame?.sourceStem || "",
    selectedState,
    generalUseStem: generalUse,
    generalUseDistribution: ["possessive-state"],
    generalUseFinalDistantPastMorph: "ca",
    restrictedUseStem: restrictedUse,
    restrictedUseDistribution: ["absolutive-state"],
    restrictedUseFormation: "general-use-source-plus-yo-tl-matrix-compound",
    restrictedUseProtectedDistantPastMorph: "cā",
    yoTlMatrix: "yō-tl",
    caQuantityProtectedByMatrix: /(?:^|-)cā-yō$/u.test(restrictedUse),
    internalObjectsPreserved: true,
    reflexiveUsesShuntlineNe:
      sourceFrame?.sourceObjectPattern === "reflexive",
    sourceSubject: sourceFrame?.sourceSubject || "",
    sourceSubjectBecomesPossessor: selectedState === "possessive",
    transformedPossessor,
    targetSubject: "3common",
    targetSubjectImportedOutsideSource: true,
    targetAnimacy: "nonanimate",
    commonNumberOnly: true,
    nounClass: "tl",
    nounSubclass: "tl-1-b",
    restrictedCompoundCanReenterPossessiveStateThroughLicensedContinuation:
      true,
    semanticScope: ["action", "state", "instance", "result"],
    lexicalOrContextualMeaningNotDerivedFromShape: true,
    manualTensePossessorYoOrClassChoiceRequired: false,
    exampleStemMembershipRequired: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

function buildActiveActionFoundationFrame({
  sourceFrame = null,
} = {}) {
  const reflexiveTransitive = ["single-object", "double-object"].includes(
    sourceFrame?.sourceValence
  ) && sourceFrame?.sourceObjectPattern === "reflexive";
  return deepFreeze({
    kind: "classical-nahuatl-active-action-foundation-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    selectedFamily: "nominalized-active-action",
    distinctActiveActionFamilies: [
      "nominalized-active-action",
      "derived-active-action",
    ],
    nominalizationAndDerivationRemainDistinct: true,
    nominalizedFamilyVoice: "active",
    passiveCounterpart: "passive-action",
    sourceStage: sourceFrame?.sourceStage || "",
    sourceVoice: sourceFrame?.sourceVoice || "",
    sourceValence: sourceFrame?.sourceValence || "",
    sourceObjectPattern: sourceFrame?.sourceObjectPattern || "none",
    ordinarySourceProfile: "active-intransitive-distant-past",
    sourceIsOrdinaryIntransitive:
      sourceFrame?.sourceValence === "intransitive",
    narrowTransitiveException: "reflexive-object-source",
    sourceUsesNarrowReflexiveTransitivePath: reflexiveTransitive,
    nonreflexiveTransitiveSourceAuthorized: false,
    voiceValenceAndReflexiveFactsAreTyped: true,
    familyChoiceIsGenuineOnlyWhenBothAnalysesAreIntended: true,
    exampleStemMembershipRequired: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

function buildActionCharacteristicFrame({
  nominalizationKind = "",
  sourceFrame = null,
  restrictedUse = "",
  generalUse = "",
} = {}) {
  if (!['passive-action', 'active-action'].includes(nominalizationKind)) {
    return null;
  }
  const actionKind = nominalizationKind;
  return deepFreeze({
    kind: "classical-nahuatl-lesson39-action-characteristic-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    actionKind,
    canonicalVncResult: sourceFrame?.canonicalVncResult || null,
    canonicalVncSourceAnalysisFrame:
      sourceFrame?.canonicalVncSourceAnalysisFrame || null,
    sourceMorphemicShapeFrame:
      buildPredicateMorphemicShapeFrame(sourceFrame),
    exactDistantPastHistoryPreserved: true,
    characteristicEmbedStem: generalUse,
    characteristicMatrix: "yō-tl",
    characteristicRestrictedUseStem: restrictedUse,
    characteristicGeneralUseStem: generalUse,
    actionAndStateReadingsRemainAvailable: true,
    actionAndPreteritAgentiveAnalysesRemainDistinct: true,
    homophonousSurfaceMayHaveBothAnalyses:
      actionKind === "active-action",
    surfaceOrEnglishTranslationSelectsAnalysis: false,
    contextualAnalysisChoiceRequiredOnlyWhenBothTypedSourcesRemainPossible:
      true,
    typedSourceAlreadySettlesAnalysis: true,
    reconstructedIntermediateVncIsReadingEvidenceOnly: true,
    reconstructedIntermediateVncAuthorizesProductiveRoute: false,
    completePolymorphemicSourceHistoryPreserved: true,
    compatibleUnlistedActionResultsRemainProductive: true,
    exampleStemMembershipRequired: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

function buildGeneralUseActiveActionFrame({
  sourceFrame = null,
  selectedState = "absolutive",
  generalUse = "",
  transformedPossessor = "",
  nominalizedActionStemRule = "none",
} = {}) {
  const shape = buildPredicateMorphemicShapeFrame(sourceFrame);
  const generalUseSourceFrame = deepFreeze({
    kind: "classical-nahuatl-general-use-active-action-source-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    canonicalVncResult: sourceFrame?.canonicalVncResult || null,
    canonicalVncSourceAnalysisFrame:
      sourceFrame?.canonicalVncSourceAnalysisFrame || null,
    canonicalVncTypedSlotFrame:
      sourceFrame?.canonicalVncTypedSlotFrame || null,
    sourceMorphemicShapeFrame: shape,
    sourceStage: sourceFrame?.sourceStage || "",
    sourcePredicateStem: sourceFrame?.sourceStem || "",
    outputNounstem: generalUse,
    finalConstituent: "ca",
    nounClass: "tl",
    nounSubclass: "tl-1-b",
    distribution: [
      "possessive-state-nnc",
      "licensed-compound-continuation",
    ],
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
  return deepFreeze({
    kind: "classical-nahuatl-general-use-active-action-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    generalUseSourceFrame,
    exactActiveDistantPastResultRequired: true,
    sourceStage: sourceFrame?.sourceStage || "",
    sourceVoice: sourceFrame?.sourceVoice || "",
    sourceValence: sourceFrame?.sourceValence || "",
    sourceObjectPattern: sourceFrame?.sourceObjectPattern || "none",
    sourcePredicateStem: sourceFrame?.sourceStem || "",
    generalUseStem: generalUse,
    finalDistantPastMorph: "ca",
    finalDistantPastMorphIsLastConstituent:
      /(?:^|-)ca$/u.test(generalUse),
    distribution: ["possessive-state"],
    selectedState,
    sourceSubject: sourceFrame?.sourceSubject || "",
    sourceSubjectBecomesPossessor: selectedState === "possessive",
    transformedPossessor,
    targetSubject: "3common",
    targetAnimacy: "nonanimate",
    commonNumberOnly: true,
    reflexiveUsesShuntlineNe:
      sourceFrame?.sourceObjectPattern === "reflexive",
    reflexiveShuntlineSatisfied:
      sourceFrame?.sourceObjectPattern !== "reflexive"
      || /(?:^|-)ne-/u.test(`-${generalUse}`),
    nounClass: "tl",
    nounSubclass: "tl-1-b",
    ordinaryMeaningScope: ["action", "process", "resultant-state"],
    lexicalMeaningScope: ["means", "source", "result"],
    lexicalMeaningRequiresTypedEvidence: true,
    obsoleteRootDistantPastVariant:
      nominalizedActionStemRule === "root-plus-ya-delete",
    obsoleteVariantRequiresTypedLexicalAnalysis:
      nominalizedActionStemRule === "root-plus-ya-delete",
    exampleStemMembershipRequired: false,
    manualCaReflexivePossessorOrClassChoiceRequired: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

function buildRestrictedUseActiveActionFrame({
  generalUseFrame = null,
  selectedState = "absolutive",
  restrictedUse = "",
} = {}) {
  const generalSource = generalUseFrame?.generalUseSourceFrame || null;
  return deepFreeze({
    kind: "classical-nahuatl-restricted-use-active-action-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    exactGeneralUseSourceFrame: generalSource,
    generalUseSourceIdentityRetained: generalSource != null,
    generalUseStem: generalUseFrame?.generalUseStem || "",
    restrictedUseStem: restrictedUse,
    selectedState,
    distribution: ["absolutive-state"],
    formation: "general-use-active-action-source-plus-yo-tl-matrix",
    protectedDistantPastMorph: "cā",
    yoTlMatrix: "yō-tl",
    protectedCaImmediatelyPrecedesYo:
      /(?:^|-)cā-yō$/u.test(restrictedUse),
    targetSubject: "3common",
    targetAnimacy: "nonanimate",
    commonNumberOnly: true,
    nounClass: "tl",
    nounSubclass: "tl-1-b",
    compoundCanReenterPossessiveStateThroughLicensedContinuation: true,
    semanticScope: ["action", "state", "means", "source", "result"],
    lexicalMeaningRequiresTypedEvidence: true,
    manualCaYoMatrixOrClassChoiceRequired: false,
    exampleStemMembershipRequired: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

function buildActionPreteritContrastFrame({
  nominalizationKind = "",
  sourceFrame = null,
} = {}) {
  if (![
    "active-action",
    "passive-action",
    "preterit-agentive",
    "preterit-patientive",
  ].includes(nominalizationKind)) {
    return null;
  }
  return deepFreeze({
    kind: "classical-nahuatl-action-preterit-contrast-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    selectedAnalysis: nominalizationKind,
    selectedCanonicalVncResult: sourceFrame?.canonicalVncResult || null,
    selectedCanonicalVncSourceAnalysisFrame:
      sourceFrame?.canonicalVncSourceAnalysisFrame || null,
    activeActionAnalysis: deepFreeze({
      sourceStage: "distant-past-predicate",
      finalTenseMorph: "ca",
      matrixNounstem: "",
      nounClass: "tl",
      nounSubclass: "tl-1-b",
      meaningScope: ["action", "result-of-action", "resultant-state"],
      sourceSubjectBecomesPossessor: true,
    }),
    preteritAgentiveAnalysis: deepFreeze({
      sourceStage: "preterit-predicate",
      finalTenseMorph: "0",
      matrixNounstem: "cā-tl",
      nounClass: "tl",
      nounSubclass: "tl-1-a",
      meaningScope: ["agent", "entrant-into-state", "thing-in-state"],
      sourceSubjectRemainsNncSubject: true,
      possessorImportedOutsideSource: true,
    }),
    passiveActionAnalysis: deepFreeze({
      sourceStage: "distant-past-predicate",
      finalTenseMorph: "ca",
      meaningScope: ["action", "condition-resulting-from-action"],
    }),
    preteritPatientiveAnalysis: deepFreeze({
      sourceStage: "preterit-predicate",
      finalTenseMorph: "0",
      matrixNounstem: "cā-tl",
      meaningScope: ["person-undergone-action", "thing-undergone-action"],
      distributionFrequency: "infrequent",
    }),
    phonologicalIdentityCanOccur: true,
    phonologicalIdentityMergesAnalyses: false,
    sourceHistoryClassBoundariesAndMeaningRemainTyped: true,
    sourceReconstructedFromSurfaceString: false,
    compatibleContinuationSelectedFromTypedAnalysis: true,
    userChoiceRequiredOnlyForGenuineSourceAmbiguity: true,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

function buildActionVoicePossessorRoleFrame({
  actionAnalysis = "",
  sourceFrame = null,
  selectedState = "absolutive",
  transformedPossessor = "",
} = {}) {
  const analysis = normalizeKey(actionAnalysis);
  if (!["active-action", "passive-action"].includes(analysis)) {
    return null;
  }
  const sourceVoice = normalizeKey(sourceFrame?.sourceVoice);
  const expectedVoice = analysis === "active-action" ? "active" : "passive";
  const possessorRole = analysis === "active-action" ? "agent" : "patient";
  return deepFreeze({
    kind: "classical-nahuatl-lesson37-action-voice-possessor-role-frame",
    version: VERSION,
    authorizationStatus: sourceVoice === expectedVoice
      ? "authorized"
      : "blocked",
    selectedAnalysis: analysis,
    sourceVoice,
    expectedSourceVoice: expectedVoice,
    typedVoiceHistoryPreserved: sourceVoice === expectedVoice,
    canonicalVncResult: sourceFrame?.canonicalVncResult || null,
    exactOwnerIssuedVncResultPreserved:
      sourceFrame?.sourceCapturedFromExactVncResult === true,
    selectedState,
    possessorPresent: selectedState === "possessive",
    transformedPossessor: selectedState === "possessive"
      ? transformedPossessor
      : "",
    possessorRole,
    activePossessorRole: "agent",
    passivePossessorRole: "patient",
    possessorRoleDerivedFromTypedVoice: true,
    manualPossessorRoleChoiceRequired: false,
    surfaceOrTranslationOverlapCanOccur: true,
    surfaceOrTranslationOverlapMergesAnalyses: false,
    userChoiceOnlyForGenuineTypedSourceAmbiguity: true,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

function buildPredicateNominalizationSemanticProfile({
  nominalizationKind = "",
  preteritAgentiveVariant = "",
  sourceFrame = null,
  restrictedUse = "",
  generalUse = "",
  allowedStates = [],
  possessiveAgentiveYoMatrix = false,
} = {}) {
  if (
    nominalizationKind !== "preterit-agentive"
    || !["ordinary", "archaic-que"].includes(preteritAgentiveVariant)
  ) {
    return null;
  }
  const archaicQue = preteritAgentiveVariant === "archaic-que";
  const derivation = sourceFrame?.canonicalStageDerivationFrame || null;
  const embeddedRestrictedUse = joinMorphs([
    sourceFrame?.sourceStem || "",
    "0",
  ]);
  const baseGeneralUse = possessiveAgentiveYoMatrix
    ? generalUse.replace(/-yō$/u, "")
    : generalUse;
  const generalUseEmbedStem = baseGeneralUse.replace(
    archaicQue ? /-quē$/u : /-cā$/u,
    ""
  );
  const expectedGeneralUse = possessiveAgentiveYoMatrix
    ? joinMorphs([baseGeneralUse, "yō"])
    : baseGeneralUse;
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
    outputNounstem: embeddedRestrictedUse,
    finalConstituent: embeddedRestrictedUse.endsWith("-0") ? "0" : "",
    relation: "preterit-predicate-reanalyzed-as-nounstem",
    satisfied: Boolean(
      sourceFrame?.sourceStage === "preterit-predicate"
      && embeddedRestrictedUse === joinMorphs([
        sourceFrame?.sourceStem || "",
        "0",
      ])
    ),
  });
  const generalUseCompound = deepFreeze({
    constructionKind: "compound",
    embedRole: "restricted-use",
    embedStem: generalUseEmbedStem,
    matrixStem: archaicQue ? "quē" : "cā",
    matrixNounClass: "tl",
    matrixNounSubclass: archaicQue ? "archaic-tl" : "tl-1-a",
    outputStem: baseGeneralUse,
    relation: archaicQue
      ? "restricted-use-embed-plus-archaic-que-matrix"
      : "restricted-use-embed-plus-ca-matrix",
    finalPreteritZeroImmediatelyBeforeMatrix: Boolean(
      baseGeneralUse.includes(archaicQue ? "-0-quē" : "-0-cā")
    ),
    reflexiveUsesShuntlineNe:
      sourceFrame?.sourceObjectPattern === "reflexive"
        ? baseGeneralUse.startsWith("ne-")
        : true,
    distribution: [
      "possessive-state-nnc",
      "adverbialized-nnc",
      "nominal-compound-embed",
      "verbal-compound-embed",
    ],
    automaticForLicensedEnvironment: !archaicQue,
    archaicLexicalLicenseRequired: archaicQue,
    satisfied: Boolean(
      embeddedRestrictedUse
      && baseGeneralUse
      && generalUse === expectedGeneralUse
    ),
  });
  return deepFreeze({
    kind: "classical-nahuatl-preterit-agentive-semantic-profile",
    version: VERSION,
    nominalizationType: "structural",
    functionalNominalizationKeptDistinct: true,
    predicateNominalizationFamilyInventory: [
      "preterit-agentive",
      "customary-agentive",
      "customary-patientive",
      "instrumentive",
      "present-agentive",
      "future-agentive",
      "passive-action",
      "active-action",
    ],
    agentSemanticRole: "agent-of-action",
    agentiveTaxonomyStatus: "most-common-agentive-nnc",
    stemShapeInventory: [
      "restricted-use",
      "general-use",
    ],
    restrictedUseSourceRelation,
    sourceResultCapture: {
      exactOwnerIssuedVncResult:
        sourceFrame?.sourceCapturedFromExactVncResult === true,
      canonicalVncResult: sourceFrame?.canonicalVncResult || null,
      canonicalVncSourceAnalysisFrame:
        sourceFrame?.canonicalVncSourceAnalysisFrame || null,
      canonicalVncTypedSlotFrame:
        sourceFrame?.canonicalVncTypedSlotFrame || null,
      copiedOrStringResultAccepted: false,
    },
    predicateToNounstemReanalysis: {
      sourceRank: "vnc-predicate",
      targetRank: "nnc-nounstem",
      sourcePredicateStem: sourceFrame?.sourceStem || "",
      retainedInternalObjectPattern:
        sourceFrame?.sourceObjectPattern || "none",
      retainedReflexiveInsideNounstem:
        sourceFrame?.sourceObjectPattern === "reflexive",
      finalPreteritZero: "0",
      finalPreteritZeroIsFinalConstituent:
        restrictedUseSourceRelation.finalConstituent === "0",
      antecessiveOParticleCarriedIntoNounstem: false,
      sourceSubjectNumberCarriedIntoNnc: true,
      sourceClassPreserved: sourceFrame?.verbClass || "",
      sourceCompoundAnalysisPreserved:
        sourceFrame?.sourceIsCompound === true,
      sourceVoicePreserved: sourceFrame?.sourceVoice || "",
    },
    generalUseCompound,
    possessiveYoExtension: deepFreeze({
      licensed: possessiveAgentiveYoMatrix,
      baseGeneralUse,
      matrixStem: possessiveAgentiveYoMatrix ? "yō" : "",
      outputStem: possessiveAgentiveYoMatrix ? generalUse : "",
      lexicalLicenseRequired: true,
      generalizedFromExamples: false,
    }),
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
    exampleStemMembershipRequired: false,
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

function shortenFinalLongI(stem = "") {
  return normalizeStem(stem).replace(/ī$/u, "i");
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

function buildDeverbalParticipantRoleTransitionFrame({
  operationId = "",
  sourceFrame = null,
  sourceSubjectBecomesPossessor = false,
  targetSubjectImportedOutsideSource = false,
  activatedProjectiveObject = false,
  sourceProjectiveObjectExpressionRetired = false,
} = {}) {
  const movementDeclared = Boolean(
    sourceSubjectBecomesPossessor
    || targetSubjectImportedOutsideSource
    || activatedProjectiveObject
    || sourceProjectiveObjectExpressionRetired
  );
  if (!movementDeclared) return null;
  return buildClassicalNahuatlParticipantRoleTransitionFrame({
    operationId,
    sourceRoles: [
      "source-subject-controller",
      ...(sourceFrame?.sourceObjectPattern
        && sourceFrame.sourceObjectPattern !== "none"
        ? ["source-object-expression"]
        : []),
    ],
    targetRoles: [
      ...(sourceSubjectBecomesPossessor
        ? ["source-subject-as-nnc-possessor"]
        : []),
      ...(targetSubjectImportedOutsideSource
        ? ["imported-nnc-subject"]
        : []),
      ...(activatedProjectiveObject
        ? ["activated-projective-object"]
        : []),
    ],
    retiredSourceRoles: [
      ...(sourceSubjectBecomesPossessor
        ? ["source-subject-controller"]
        : []),
      ...(sourceProjectiveObjectExpressionRetired
        ? ["source-projective-object-expression"]
        : []),
    ],
    activatedTargetRoles: [
      ...(sourceSubjectBecomesPossessor
        ? ["source-subject-as-nnc-possessor"]
        : []),
      ...(targetSubjectImportedOutsideSource
        ? ["imported-nnc-subject"]
        : []),
      ...(activatedProjectiveObject
        ? ["activated-projective-object"]
        : []),
    ],
    preservedParticipantFacts: [
      "typed-source-history",
      "source-participant-identities",
    ],
  });
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
        : operationFrame?.characteristicPreteritAgentiveFrame
          ? "preterit-agentive-characteristic-not-possession"
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

function buildOldPersonAnalysisFrame({
  family = "",
  sourceStem = "",
  subject = "",
  selectedPerfectiveStem = "",
} = {}) {
  if (!OLD_PERSON_FAMILIES.includes(family)) return null;
  const oldWoman = family === "old-woman";
  return deepFreeze({
    kind: "classical-nahuatl-lesson35-old-person-source-analysis-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    family,
    sourceKind: "derived-verbstem",
    sourceStem,
    sourceMeaning: oldWoman
      ? "become-an-old-woman"
      : "become-an-old-man",
    referentialAnimacy: "animate",
    referentialHumanness: "human",
    referentialSex: oldWoman ? "female" : "male",
    perfectiveAlternants: oldWoman
      ? ["ilama-t", "ilama-h"]
      : ["huē-huē-t", "huē-hue-h"],
    selectedPerfectiveStem,
    generalUsePerfectiveStem: oldWoman ? "ilama-t" : "huē-huē-t",
    selectionCondition: subject.endsWith("pl")
      ? "plural-subject"
      : "singular-or-common-subject",
    singularNumberRealization: "silent-zero",
    pluralNumberRealization: "qu-eh",
    generalUseMatrix: "cā",
    compatibleContinuations: [
      "possessive-state",
      "affective-compound",
      "characteristic-yo-compound",
    ],
    relatedNominalSources: oldWoman
      ? ["ilama/tl", "ilan/tli"]
      : ["huē-huē/tl", "huē-hueh/embed", "huē-huē-n/tli"],
    relatedNominalSourcesRemainDistinct: true,
    surfaceSimilarityDoesNotMergeSources: true,
    exampleStemMembershipAuthorizesProductiveRoute: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
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
  const preteritVncCaptureFrame = source.preteritVncCaptureFrame || null;
  const predicateNominalizationVncCaptureFrame =
    source.predicateNominalizationVncCaptureFrame || null;
  const deverbalActionVncCaptureFrame =
    source.deverbalActionVncCaptureFrame || null;
  const passivePatientiveVncCaptureFrame =
    source.passivePatientiveVncCaptureFrame || null;
  const impersonalPatientiveVncCaptureFrame =
    source.impersonalPatientiveVncCaptureFrame || null;
  const perfectivePatientiveVncCaptureFrame =
    source.perfectivePatientiveVncCaptureFrame || null;
  const imperfectivePatientiveVncCaptureFrame =
    source.imperfectivePatientiveVncCaptureFrame || null;
  const characteristicPatientiveNncCaptureFrame =
    source.characteristicPatientiveNncCaptureFrame || null;
  const compoundVncSourceFrame =
    passivePatientiveVncCaptureFrame?.compoundVncSourceFrame
    || impersonalPatientiveVncCaptureFrame?.compoundVncSourceFrame
    || perfectivePatientiveVncCaptureFrame?.compoundVncSourceFrame
    || imperfectivePatientiveVncCaptureFrame?.compoundVncSourceFrame
    || source.compoundVncSourceFrame
    || null;
  const vncCaptureFrame = preteritVncCaptureFrame
    || predicateNominalizationVncCaptureFrame
    || deverbalActionVncCaptureFrame
    || passivePatientiveVncCaptureFrame
    || impersonalPatientiveVncCaptureFrame
    || perfectivePatientiveVncCaptureFrame
    || imperfectivePatientiveVncCaptureFrame;
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
    && (
      !preteritVncCaptureFrame
      || isClassicalNahuatlPreteritVncNominalizationCaptureFrame(
        preteritVncCaptureFrame
      )
    )
    && (
      !predicateNominalizationVncCaptureFrame
      || isClassicalNahuatlPredicateNominalizationVncCaptureFrame(
        predicateNominalizationVncCaptureFrame
      )
    )
    && (
      !deverbalActionVncCaptureFrame
      || isClassicalNahuatlDeverbalActionVncCaptureFrame(
        deverbalActionVncCaptureFrame
      )
    )
    && (
      !passivePatientiveVncCaptureFrame
      || isClassicalNahuatlPassivePatientiveVncCaptureFrame(
        passivePatientiveVncCaptureFrame
      )
    )
    && (
      !impersonalPatientiveVncCaptureFrame
      || isClassicalNahuatlImpersonalPatientiveVncCaptureFrame(
        impersonalPatientiveVncCaptureFrame
      )
    )
    && (
      !perfectivePatientiveVncCaptureFrame
      || isClassicalNahuatlPerfectivePatientiveVncCaptureFrame(
        perfectivePatientiveVncCaptureFrame
      )
    )
    && (
      !imperfectivePatientiveVncCaptureFrame
      || isClassicalNahuatlImperfectivePatientiveVncCaptureFrame(
        imperfectivePatientiveVncCaptureFrame
      )
    )
    && (
      !characteristicPatientiveNncCaptureFrame
      || isClassicalNahuatlCharacteristicPatientiveNncCaptureFrame(
        characteristicPatientiveNncCaptureFrame
      )
    )
  );
  const lexicalAuthorizationFrame = authorized
    ? buildLexicalAuthorizationFrame({
      sourceUnit,
      sourceStage,
      sourceStem,
      verbClass,
      sourceVoice,
      sourceValence,
      sourceObjectPattern,
      lexicalFactStem:
        deverbalActionVncCaptureFrame?.lexicalSourceStem || sourceStem,
      patientiveContrastFactStem:
        passivePatientiveVncCaptureFrame?.activeSourceStem
        || impersonalPatientiveVncCaptureFrame?.activeSourceStem
        || perfectivePatientiveVncCaptureFrame?.activeSourceStem
        || imperfectivePatientiveVncCaptureFrame?.activeSourceStem
        || "",
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
    sourceVoiceOperation: normalizeKey(
      source.sourceVoiceOperation || sourceVoice
    ),
    sourceNonactiveOptionId: normalizeToken(
      source.sourceNonactiveOptionId || ""
    ),
    sourceValence,
    sourceObjectPattern,
    sourceSubject: normalizeSubject(source.sourceSubject || request.subject || "3sg"),
    sourceIsCompound:
      source.sourceIsCompound === true || Boolean(compoundVncSourceFrame),
    compoundVncSourceFrame,
    sourceImperfectiveStem:
      canonicalStageDerivationFrame?.imperfectiveStem || "",
    canonicalStageDerivationFrame,
    sourceStemDerivedByCanonicalOwner:
      canonicalStageDerivationFrame?.authorizationStatus === "authorized",
    preteritVncCaptureFrame,
    predicateNominalizationVncCaptureFrame,
    deverbalActionVncCaptureFrame,
    passivePatientiveVncCaptureFrame,
    impersonalPatientiveVncCaptureFrame,
    perfectivePatientiveVncCaptureFrame,
    imperfectivePatientiveVncCaptureFrame,
    characteristicPatientiveNncCaptureFrame,
    canonicalVncResult: vncCaptureFrame?.canonicalVncResult || null,
    canonicalVncOperationFrame:
      vncCaptureFrame?.canonicalVncOperationFrame
      || vncCaptureFrame?.canonicalVncResult?.operationFrame
      || null,
    canonicalVncSourceAnalysisFrame:
      vncCaptureFrame?.canonicalVncSourceAnalysisFrame || null,
    canonicalVncTypedSlotFrame:
      vncCaptureFrame?.canonicalVncTypedSlotFrame || null,
    sourceCapturedFromExactVncResult: Boolean(vncCaptureFrame),
    canonicalNncResult:
      characteristicPatientiveNncCaptureFrame?.canonicalNncResult || null,
    canonicalNncSourceFrame:
      characteristicPatientiveNncCaptureFrame?.canonicalNncSourceFrame
      || null,
    canonicalNncOperationFrame:
      characteristicPatientiveNncCaptureFrame?.canonicalNncOperationFrame
      || null,
    canonicalNncTypedSlotFrame:
      characteristicPatientiveNncCaptureFrame?.canonicalNncTypedSlotFrame
      || null,
    sourceCapturedFromExactNncResult: Boolean(
      characteristicPatientiveNncCaptureFrame
    ),
    lexicalAuthorizationFrame,
    lexicalFactsReadOnly: true,
    typedSourceAuthority: true,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
  if (authorized) ISSUED_SOURCE_FRAMES.add(frame);
  return frame;
}

function buildGrammaticalRhymeCoordinateFrame({
  sourceFrame = null,
  structuralContractId = "",
  formationFamily = "",
  allowedStates = [],
  sourceEvidenceKind = "",
} = {}) {
  const normalizedStates = [...new Set(
    allowedStates.map(normalizeKey).filter(Boolean)
  )];
  const canonicalSourceResult =
    sourceFrame?.canonicalVncResult || sourceFrame?.canonicalNncResult || null;
  const canonicalSourceOperationFrame =
    sourceFrame?.canonicalVncOperationFrame
    || sourceFrame?.canonicalNncOperationFrame
    || null;
  const sourceDerivationOperation = normalizeKey(
    canonicalSourceOperationFrame?.operation || ""
  );
  const sharedCoordinateFrame =
    buildSharedGrammaticalRhymeCoordinateFrame({
      canonicalSourceFrame: sourceFrame,
      canonicalSourceResult,
      canonicalSourceOperationFrame,
      emptyPin: {
        sourceUnit: sourceFrame?.sourceUnit || "",
        sourceStage: sourceFrame?.sourceStage || "",
        sourceVoice: sourceFrame?.sourceVoice || "",
        sourceValence: sourceFrame?.sourceValence || "",
        sourceObjectPattern: sourceFrame?.sourceObjectPattern || "",
        sourceEvidenceKind,
      },
      fullPin: {
        structuralContractId: normalizeKey(structuralContractId),
        formationFamily: normalizeKey(formationFamily),
        allowedStates: normalizedStates,
      },
      localResultTense:
        canonicalSourceResult?.normalizedRequest?.tense || "",
      localDerivationOperation: sourceDerivationOperation,
      exactSourceIdentityValidated: Boolean(
        ISSUED_SOURCE_FRAMES.has(sourceFrame)
        && sourceFrame?.authorizationStatus === "authorized"
        && canonicalSourceResult
      ),
    });
  const authorized = sharedCoordinateFrame.coordinateCompleteness
    === "complete";
  return deepFreeze({
    ...sharedCoordinateFrame,
    kind: "classical-nahuatl-grammatical-rhyme-coordinate-frame",
    authorizationStatus: authorized ? "authorized" : "blocked",
    blockReason: authorized
      ? ""
      : "complete-exact-result-rhyme-coordinate-required",
  });
}

function buildDeverbalNounstemAxisFrame({
  sourceFrame = null,
  structuralContractId = "",
  formationFamily = "",
  allowedStates = [],
} = {}) {
  const sourceMorphemes = normalizeStem(sourceFrame?.sourceStem)
    .split("-").filter(Boolean);
  const sourceEvidenceKind = sourceFrame?.sourceCapturedFromExactVncResult
    ? "owner-issued-vnc-result"
    : sourceFrame?.sourceCapturedFromExactNncResult
      ? "owner-issued-nnc-result"
      : "typed-morphemic-source";
  const contract = DEVERBAL_NOUNSTEM_SOURCE_CONTRACTS[
    normalizeKey(structuralContractId)
  ] || null;
  const normalizedStates = [...new Set(
    allowedStates.map(normalizeKey).filter(Boolean)
  )];
  const sourceFrameIsCanonical = Boolean(
    ISSUED_SOURCE_FRAMES.has(sourceFrame)
    && sourceFrame?.authorizationStatus === "authorized"
  );
  const sourceStageMatches = Boolean(
    contract && sourceFrame?.sourceStage === contract.sourceStage
  );
  const sourceVoiceMatches = Boolean(
    contract && contract.sourceVoices.includes(sourceFrame?.sourceVoice)
  );
  const sourceEvidenceMatches = Boolean(
    contract && contract.sourceEvidenceKinds.includes(sourceEvidenceKind)
  );
  const statesAreRecognized = Boolean(
    normalizedStates.length > 0
    && normalizedStates.every(state => [
      "absolutive",
      "possessive",
    ].includes(state))
  );
  const authorized = Boolean(
    sourceFrameIsCanonical
    && contract
    && sourceStageMatches
    && sourceVoiceMatches
    && sourceEvidenceMatches
    && statesAreRecognized
    && normalizeKey(formationFamily)
  );
  const rhymeSpaceCoordinateFrame = buildGrammaticalRhymeCoordinateFrame({
    sourceFrame,
    structuralContractId,
    formationFamily,
    allowedStates: normalizedStates,
    sourceEvidenceKind,
  });
  return deepFreeze({
    kind: "classical-nahuatl-deverbal-nounstem-axis-frame",
    version: VERSION,
    authorizationStatus: authorized ? "authorized" : "blocked",
    blockReason: authorized
      ? ""
      : !sourceFrameIsCanonical
        ? "canonical-deverbal-nounstem-source-frame-required"
        : !contract
          ? "deverbal-nounstem-structural-contract-required"
          : !sourceStageMatches
            ? `source-stage-${contract.sourceStage}-required`
            : !sourceVoiceMatches
              ? contract.voiceMismatchBlockReason
              : !sourceEvidenceMatches
                ? "deverbal-nounstem-source-evidence-mismatch"
                : !statesAreRecognized
                  ? "deverbal-nounstem-state-contract-required"
                  : "deverbal-nounstem-formation-family-required",
    structuralContractId: normalizeKey(structuralContractId),
    structuralContractSatisfied: authorized,
    requiredSourceStage: contract?.sourceStage || "",
    permittedSourceVoices: contract?.sourceVoices || Object.freeze([]),
    permittedSourceEvidenceKinds:
      contract?.sourceEvidenceKinds || Object.freeze([]),
    sourceStage: sourceFrame?.sourceStage || "",
    sourceVoice: sourceFrame?.sourceVoice || "",
    sourceValence: sourceFrame?.sourceValence || "",
    sourceObjectPattern: sourceFrame?.sourceObjectPattern || "",
    sourceStem: sourceFrame?.sourceStem || "",
    sourceMorphemes,
    sourceShapeComplexity: sourceMorphemes.length > 1
      ? "polymorphemic"
      : "monomorphemic",
    sourceEvidenceKind,
    formationFamily,
    allowedStates: Object.freeze(normalizedStates),
    runtimeRouteFamily: "deverbal-nnc",
    lessonQualifiedRuntimeRoute: false,
    lessonMetadataAuthorizesFormation: false,
    productiveRuleUsesTypedSourceProperties: true,
    sourceShapeAloneSelectsLexicalMeaning: false,
    exampleStemMembershipAuthorizesFormation: false,
    continuationSourceRequirement: "exact-owner-issued-canonical-result",
    continuationConsumesExactCanonicalResult: true,
    continuationAuthorityOwnedByConsumer: true,
    rhymeSpaceCoordinateFrame,
    compatibleCoordinatesCollapsedBySharedContract:
      rhymeSpaceCoordinateFrame.authorizationStatus === "authorized",
    canonicalSourceFrame: sourceFrame,
    canonicalSourceResult:
      sourceFrame?.canonicalVncResult || sourceFrame?.canonicalNncResult || null,
    canonicalSourceOperationFrame:
      sourceFrame?.canonicalVncOperationFrame
      || sourceFrame?.canonicalNncOperationFrame
      || null,
    sourceDerivationOperation: normalizeKey(
      sourceFrame?.canonicalVncOperationFrame?.operation || ""
    ),
    exactSourceHistoryPreserved: Boolean(
      sourceFrame?.canonicalVncResult || sourceFrame?.canonicalNncResult
    ),
    grammarAuthority: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
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
  if (profile === "instrumentive-absolutive") {
    return buildCustomNumberFrame({
      subject,
      stem,
      nounClass,
      num1: "0",
      num2: "0",
      animacy,
      ruleId: "36.6-instrumentive-imported-common-number",
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
  const subject = normalizeSubject(
    operationFrame.fixedTargetSubject || request.subject || "3sg"
  );
  const state = normalizeKey(request.state || operationFrame.defaultState || "absolutive");
  const possessor = normalizeKey(
    operationFrame.possessorFixedBySourceSubject
      ? operationFrame.transformedPossessor
      : request.possessor
        || operationFrame.transformedPossessor
        || "3sg"
  );
  const animacy = normalizeKey(
    operationFrame.fixedTargetAnimacy
      || request.animacy
      || operationFrame.defaultAnimacy
      || "animate"
  );
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
  const followingStateMaterial = stateFrame.slots
    ?.map(slot => slot.carrier)
    .filter(Boolean)
    .join("-") || "";
  const personFrame = target.buildClassicalNahuatlNncSubjectPersonFrame({
    subject,
    followingMaterial: followingStateMaterial || stem,
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
  const wordSurface = typeof target.realizeClassicalNahuatlNncSurfaceCarriers === "function"
    ? target.realizeClassicalNahuatlNncSurfaceCarriers(carriers)
    : carriers.map(realize).join("");
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
  let instrumentiveSourcePairFrame = null;
  let prebuiltCustomaryAgentivePossessiveSupplement = null;
  if (
    nominalizationKind === "instrumentive"
    && request.canonicalInstrumentiveAbsolutiveVncResult
    && request.canonicalInstrumentivePossessiveVncResult
  ) {
    instrumentiveSourcePairFrame = buildInstrumentiveSourcePairFrame(
      request,
      target
    );
    if (!isClassicalNahuatlInstrumentiveSourcePairFrame(
      instrumentiveSourcePairFrame
    )) {
      return {
        sourceFrame: null,
        operationFrame: null,
        blockReason: instrumentiveSourcePairFrame.blockReason,
      };
    }
    request = {
      ...request,
      canonicalVncResult:
        normalizeKey(request.state || "absolutive") === "possessive"
          ? instrumentiveSourcePairFrame.imperfectActive.canonicalVncResult
          : instrumentiveSourcePairFrame.customaryImpersonal
            .canonicalVncResult,
    };
  }
  if (
    nominalizationKind === "customary-agentive-full"
    && normalizeKey(request.state || "absolutive") === "possessive"
    && request.canonicalVncResult
  ) {
    if (!request.canonicalPreteritVncResult) {
      return {
        sourceFrame: null,
        operationFrame: null,
        blockReason:
          "customary-agentive-possessive-preterit-supplement-required",
      };
    }
    prebuiltCustomaryAgentivePossessiveSupplement = evaluateGrammar({
      constructionKind: "predicate-nominalization",
      nominalizationKind: "preterit-agentive",
      canonicalVncResult: request.canonicalPreteritVncResult,
      subject: normalizeSubject(request.subject || "3sg"),
      state: "possessive",
      possessor: normalizeSubject(request.possessor || "3sg"),
      animacy: normalizeKey(request.animacy || "animate"),
    }, target);
    if (
      prebuiltCustomaryAgentivePossessiveSupplement.authorizationStatus
        !== "authorized"
    ) {
      return {
        sourceFrame: null,
        operationFrame: null,
        blockReason:
          prebuiltCustomaryAgentivePossessiveSupplement.blockReason,
      };
    }
  }
  if (request.canonicalVncResult) {
    const preteritNominalization = [
      "preterit-agentive",
      "preterit-patientive",
    ].includes(nominalizationKind);
    const captureFrame = preteritNominalization
      ? capturePreteritVncResult(request.canonicalVncResult, target)
      : capturePredicateNominalizationVncResult(
        request.canonicalVncResult,
        nominalizationKind,
        request.state,
        target
      );
    const captureAuthorized = preteritNominalization
      ? isClassicalNahuatlPreteritVncNominalizationCaptureFrame(
        captureFrame
      )
      : isClassicalNahuatlPredicateNominalizationVncCaptureFrame(
        captureFrame
      );
    if (!captureAuthorized) {
      return {
        sourceFrame: null,
        operationFrame: null,
        blockReason: captureFrame.blockReason,
      };
    }
    request = {
      ...request,
      source: {
        sourceUnit: captureFrame.sourceUnit,
        sourceStage: captureFrame.sourceStage,
        sourceStem: captureFrame.sourceStem,
        verbClass: captureFrame.verbClass,
        sourceVoice: captureFrame.sourceVoice,
        sourceVoiceOperation: captureFrame.sourceVoiceOperation,
        sourceValence: captureFrame.sourceValence,
        sourceObjectPattern: captureFrame.sourceObjectPattern,
        sourceSubject: captureFrame.sourceSubject,
        sourceIsCompound: captureFrame.sourceStem.includes("-"),
        ...(preteritNominalization
          ? { preteritVncCaptureFrame: captureFrame }
          : { predicateNominalizationVncCaptureFrame: captureFrame }),
      },
    };
  }
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
  let customaryAgentivePossessiveSupplementFrame = null;
  if (
    nominalizationKind === "customary-agentive-full"
    && normalizeKey(request.state || "absolutive") === "possessive"
    && sourceFrame.sourceCapturedFromExactVncResult === true
  ) {
    const supplement = prebuiltCustomaryAgentivePossessiveSupplement;
    const customaryLexicalSource = normalizeStem(
      sourceFrame.predicateNominalizationVncCaptureFrame
        ?.continuationProjection?.sourceStem
    );
    const preteritLexicalSource = normalizeStem(
      supplement.sourceFrame?.preteritVncCaptureFrame
        ?.continuationProjection?.sourceStem
    );
    if (
      !ISSUED_GRAMMAR_FRAMES.has(supplement)
      || supplement.authorizationStatus !== "authorized"
      || !customaryLexicalSource
      || customaryLexicalSource !== preteritLexicalSource
      || sourceFrame.verbClass !== supplement.sourceFrame?.verbClass
    ) {
      return {
        sourceFrame,
        operationFrame: null,
        blockReason: supplement.authorizationStatus !== "authorized"
          ? supplement.blockReason
          : "customary-and-preterit-agentive-supplement-source-mismatch",
      };
    }
    customaryAgentivePossessiveSupplementFrame = deepFreeze({
      kind:
        "classical-nahuatl-customary-agentive-possessive-supplement-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      customarySourceFrame: sourceFrame,
      preteritAgentiveFrame: supplement,
      sharedTypedLexicalSource: customaryLexicalSource,
      customaryAndPreteritAnalysesRemainDistinct: true,
      sameTranslationDoesNotMergeAnalyses: true,
      possessiveStemSuppliedByPreteritAgentive: true,
      automaticParadigmSupplement: true,
      userSelectsSupplementStem: false,
      grammarAuthority: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
  }
  const activatedObjectPerson = normalizeSubject(
    request.activatedObjectPerson
  );
  const activationRequested = Boolean(normalizeToken(request.activatedObjectPerson));
  const supplementaryObjectRelation = normalizeKey(
    request.supplementaryObjectRelation
  );
  const supplementaryObjectReferentId = normalizeToken(
    request.supplementaryObjectReferentId
  );
  if (
    activationRequested
    && (
      !activatedObjectPerson
      || ["customary-patientive", "instrumentive"].includes(
        nominalizationKind
      )
      || !["nonspecific-human", "nonspecific-nonhuman"].includes(
        sourceFrame.sourceObjectPattern
      )
      || supplementaryObjectRelation !== "supplementary-object"
      || !supplementaryObjectReferentId
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
  const affinityRequirement = lexicalFrame.affinityRequirement || "none";
  const affinityRequested = request.affinity === true;
  const pluralSubject = subject.endsWith("pl");
  if (
    affinityRequested
    && (!pluralSubject || affinityRequirement === "none")
  ) {
    return {
      sourceFrame,
      operationFrame: null,
      blockReason: "35.3-affinity-plural-lexical-license-required",
    };
  }
  const affinitySelected = pluralSubject
    && (
      affinityRequirement === "plural-required"
      || (
        affinityRequirement === "plural-optional"
        && affinityRequested
      )
    );
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
  let fixedTargetSubject = "";
  let fixedTargetAnimacy = "";
  let possessorFixedBySourceSubject = false;
  let customaryPatientiveFrame = null;
  let instrumentiveParticipantFrame = null;
  let instrumentiveRealizationFrame = null;
  let presentAgentiveFrame = null;
  let futureAgentiveFrame = null;
  let actionNncTaxonomyFrame = null;
  let passiveActionFrame = null;
  let activeActionFoundationFrame = null;
  let generalUseActiveActionFrame = null;
  let restrictedUseActiveActionFrame = null;
  let actionCharacteristicFrame = null;
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
    const preteritAgentiveSourceAuthorized = Boolean(
      sourceFrame.sourceVoice === "active"
      || (
        sourceFrame.sourceVoice === "impersonal"
        && sourceFrame.sourceVoiceOperation === "inherent-impersonal"
        && sourceFrame.preteritVncCaptureFrame
          ?.inherentImpersonalAnalysisPreserved === true
      )
    );
    if (
      nominalizationKind === "preterit-agentive"
      && !preteritAgentiveSourceAuthorized
    ) {
      return {
        sourceFrame,
        operationFrame: null,
        blockReason:
          "preterit-agentive-requires-active-or-typed-inherent-impersonal-source",
      };
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
    const generalUsePredicateStem = OLD_PERSON_FAMILIES.includes(
      oldPersonFamily
    )
      ? applyOldPersonPerfective(
        sourceFrame.sourceStem,
        oldPersonFamily,
        "3pl"
      )
      : sourceFrame.sourceStem;
    generalUse = joinMorphs([
      generalObjectPrefix,
      generalUsePredicateStem,
      "0",
      "cā",
    ]);
    nounClass = "zero";
    connectorProfile = "preterit-agentive";
    possessiveSingularConnector = "uh";
    allowedStates = ["absolutive", "possessive"];
    rules.push("35.3-predicate-reanalysis", "35.5-ca-general-use");
    if (sourceFrame.sourceVoiceOperation === "inherent-impersonal") {
      rules.push("39.3.5-typed-inherent-impersonal-preterit-agentive");
    }
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
    if (
      normalizeKey(request.state || "absolutive") === "possessive"
      && lexicalFrame.possessiveAgentiveYoMatrix
    ) {
      generalUse = joinMorphs([
        generalObjectPrefix,
        sourceFrame.sourceStem,
        "0",
        "cā",
        "yō",
      ]);
      rules.push("35.6-possessive-agentive-ca-yo-irregularity");
      appliedAuthorizationIds.push(
        "lexical-source:possessive-agentive-ca-yo-matrix"
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
    generalUse = customaryAgentivePossessiveSupplementFrame
      ? customaryAgentivePossessiveSupplementFrame.preteritAgentiveFrame
        .operationFrame.targetStems.generalUse
      : restrictedUse;
    nounClass = "tl";
    connectorProfile = "fully-nominal-tl";
    allowedStates = ["absolutive", "possessive"];
    possessiveSingularConnector = "uh";
    rules.push("36.3-fully-nominal-customary-agentive");
    if (customaryAgentivePossessiveSupplementFrame) {
      rules.push("36.4-customary-agentive-possessive-preterit-suppletion");
    }
  } else if (nominalizationKind === "customary-patientive") {
    if (!["passive", "nonactive"].includes(sourceFrame.sourceVoice)) {
      return { sourceFrame, operationFrame: null, blockReason: "customary-patientive-requires-passive-source" };
    }
    restrictedUse = joinMorphs([selectedSourceStem, "ni"]);
    nounClass = "tl";
    connectorProfile = "fully-nominal-tl";
    allowedStates = ["absolutive"];
    defaultAnimacy = sourceFrame.sourceObjectPattern === "nonspecific-human"
      ? "nonanimate"
      : sourceFrame.sourceObjectPattern === "nonspecific-nonhuman"
        ? "animate"
        : normalizeKey(request.animacy || "animate");
    const retainedProjectiveCarrier = sourceFrame.sourceObjectPattern
      === "nonspecific-human"
      ? "tē"
      : sourceFrame.sourceObjectPattern === "nonspecific-nonhuman"
        ? "tla"
        : "";
    customaryPatientiveFrame = deepFreeze({
      kind: "classical-nahuatl-customary-present-patientive-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      grammaticalRole: "patient-or-undergoer-of-customary-treatment",
      semanticExtension: "worthy-or-fit-to-receive-the-treatment",
      potentialPatientiveIsSameAnalysis: false,
      instrumentiveIsSameAnalysis: false,
      sourceVoice: sourceFrame.sourceVoice,
      possessiveStateAvailable: false,
      externalProjectiveObjectActivationAvailable: false,
      reflexiveUsesShuntlineNe: sourceFrame.sourceObjectPattern === "reflexive",
      retainedProjectiveCarrier,
      retainedCarrierReferentAnimacy: retainedProjectiveCarrier === "tē"
        ? "nonanimate"
        : retainedProjectiveCarrier === "tla"
          ? "animate"
          : defaultAnimacy,
      passiveLongOSuffixProtectedBeforeNi:
        /(?:^|-)l?ō$/u.test(selectedSourceStem),
      sourceShapeVariantIsProductiveEvidence: true,
      exampleStemMembershipRequired: false,
      nounClass: "tl",
      nounSubclass: "tl-1-a",
      singularNumberDyad: "⎕-0",
      pluralNumberDyad: "m-eh",
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
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
    const customaryImpersonalStem = /(?:^|-)ni$/u.test(stem)
      ? stem
      : joinMorphs([stem, "ni"]);
    const imperfectActiveStem = /(?:^|-)ya$/u.test(stem)
      ? stem
      : joinMorphs([stem, "ya"]);
    restrictedUse = state === "absolutive"
      ? customaryImpersonalStem
      : "";
    generalUse = state === "possessive" ? imperfectActiveStem : "";
    nounClass = state === "absolutive" ? "tl" : "tli";
    connectorProfile = state === "absolutive"
      ? "instrumentive-absolutive"
      : "derived-tli";
    allowedStates = [state];
    transformedPossessor = state === "possessive"
      ? sourceSubjectToPossessor(sourceFrame.sourceSubject)
      : "";
    fixedTargetSubject = "3common";
    fixedTargetAnimacy = "nonanimate";
    possessorFixedBySourceSubject = state === "possessive";
    defaultAnimacy = "nonanimate";
    instrumentiveParticipantFrame = deepFreeze({
      kind: "classical-nahuatl-instrumentive-participant-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      selectedState: state,
      selectedSourcePath: state === "absolutive"
        ? "customary-present-impersonal-vnc-result"
        : "imperfect-active-vnc-result",
      sourcePredicateStem: sourceFrame.sourceStem,
      sourceVoice: sourceFrame.sourceVoice,
      sourceSubject: sourceFrame.sourceSubject,
      sourceSubjectBecomesPossessor: state === "possessive",
      transformedPossessor,
      targetSubject: "3common",
      targetSubjectImportedOutsideSource: true,
      targetAnimacy: "nonanimate",
      reflexiveUsesShuntlineNe: sourceFrame.sourceObjectPattern === "reflexive",
      nounClass,
      nounSubclass: "tl-1-b",
      absolutiveNumberDyad: "0-0",
      completeParadigmRequiresTwoExactVncResults: true,
      meansInstrumentFacultyReadingsAreLexicalOrContextual: true,
      sourceShapeDeterminesLexicalMeaning: false,
      instrumentiveSourcePairFrame,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
    instrumentiveRealizationFrame = buildInstrumentiveRealizationFrame({
      sourceFrame,
      state,
      targetStem: state === "absolutive"
        ? restrictedUse
        : generalUse,
    });
    rules.push(
      state === "absolutive"
        ? "36.6-customary-impersonal-instrumentive"
        : "36.6-imperfect-active-subject-to-possessor"
    );
    rules.push("36.6.1-36.6.3-morphemic-shape-instrumentive-realization");
  } else if (nominalizationKind === "present-agentive") {
    if (sourceFrame.sourceVoice !== "active") {
      return { sourceFrame, operationFrame: null, blockReason: "present-agentive-requires-active-source" };
    }
    restrictedUse = joinMorphs([selectedSourceStem, "0"]);
    nounClass = "zero";
    connectorProfile = "vnc-reanalysis";
    allowedStates = ["absolutive"];
    fixedTargetSubject = sourceFrame.sourceSubject;
    presentAgentiveFrame = buildPresentAgentiveFrame({
      sourceFrame,
      targetStem: restrictedUse,
    });
    rules.push("36.7-present-predicate-reanalysis");
  } else if (nominalizationKind === "future-agentive") {
    if (sourceFrame.sourceVoice !== "active") {
      return { sourceFrame, operationFrame: null, blockReason: "future-agentive-requires-active-source" };
    }
    const futureObjectPrefix = sourceFrame.sourceObjectPattern
      === "human-and-nonhuman"
      ? "tla"
      : objectPrefix;
    const futureSourceStem = joinMorphs([
      futureObjectPrefix,
      sourceFrame.sourceStem,
    ]);
    restrictedUse = /(?:^|-)z$/u.test(futureSourceStem)
      ? futureSourceStem
      : joinMorphs([futureSourceStem, "z"]);
    generalUse = joinMorphs([restrictedUse, "cā"]);
    nounClass = "zero";
    connectorProfile = "future-agentive";
    possessiveSingularConnector = "uh";
    allowedStates = ["absolutive", "possessive"];
    fixedTargetSubject = sourceFrame.sourceSubject;
    futureAgentiveFrame = buildFutureAgentiveFrame({
      sourceFrame,
      restrictedUse,
      generalUse,
      omittedApplicativeObject:
        sourceFrame.sourceObjectPattern === "human-and-nonhuman",
    });
    rules.push("36.8-future-agentive-restricted-and-general-use");
    if (sourceFrame.sourceObjectPattern === "human-and-nonhuman") {
      rules.push("36.8.1-future-agentive-unexpressed-applicative-object");
    }
  } else {
    const passive = nominalizationKind === "passive-action";
    if (passive && sourceFrame.sourceVoice !== "passive") {
      return { sourceFrame, operationFrame: null, blockReason: "passive-action-requires-passive-distant-past-source" };
    }
    if (
      passive
      && !["single-object", "double-object"].includes(
        sourceFrame.sourceValence
      )
    ) {
      return { sourceFrame, operationFrame: null, blockReason: "passive-action-requires-transitive-source" };
    }
    if (!passive && sourceFrame.sourceVoice !== "active") {
      return { sourceFrame, operationFrame: null, blockReason: "active-action-requires-active-distant-past-source" };
    }
    if (
      !passive
      && !["intransitive"].includes(sourceFrame.sourceValence)
      && sourceFrame.sourceObjectPattern !== "reflexive"
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
    fixedTargetSubject = "3common";
    fixedTargetAnimacy = "nonanimate";
    possessorFixedBySourceSubject = true;
    actionNncTaxonomyFrame = buildActionNncTaxonomyFrame({
      nominalizationKind,
      sourceFrame,
      restrictedUse,
      generalUse,
    });
    if (passive) {
      passiveActionFrame = buildPassiveActionFrame({
        sourceFrame,
        selectedState: normalizeKey(request.state || "absolutive"),
        restrictedUse,
        generalUse,
        transformedPossessor,
      });
    } else {
      activeActionFoundationFrame = buildActiveActionFoundationFrame({
        sourceFrame,
      });
      generalUseActiveActionFrame = buildGeneralUseActiveActionFrame({
        sourceFrame,
        selectedState: normalizeKey(request.state || "absolutive"),
        generalUse,
        transformedPossessor,
        nominalizedActionStemRule,
      });
      restrictedUseActiveActionFrame = buildRestrictedUseActiveActionFrame({
        generalUseFrame: generalUseActiveActionFrame,
        selectedState: normalizeKey(request.state || "absolutive"),
        restrictedUse,
      });
    }
    actionCharacteristicFrame = buildActionCharacteristicFrame({
      nominalizationKind,
      sourceFrame,
      restrictedUse,
      generalUse,
    });
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

  const preteritAgentiveNumberOptions = sourceFrame.verbClass === "A"
    ? ["c"]
    : lexicalFrame.preteritAgentiveNumberOptions || ["qui"];
  const requestedNumberConnector = normalizeKey(
    request.numberConnector || source.singularConnectorChoice
  );
  if (
    connectorProfile === "preterit-agentive"
    && !pluralSubject
    && requestedNumberConnector
    && !preteritAgentiveNumberOptions.includes(requestedNumberConnector)
  ) {
    return {
      sourceFrame,
      operationFrame: null,
      blockReason: "35.4-preterit-agentive-number-variant-not-licensed",
    };
  }
  const singularConnectorChoice = connectorProfile === "preterit-agentive"
    ? requestedNumberConnector || preteritAgentiveNumberOptions[0]
    : requestedNumberConnector || "qui";
  const selectedAnimacyOptions = connectorProfile === "preterit-agentive"
    ? lexicalFrame.agentiveAnimacyByConnector?.[singularConnectorChoice]
      || lexicalFrame.agentiveAnimacyOptions
      || ["animate", "nonanimate"]
    : [defaultAnimacy];
  const requestedAnimacy = normalizeKey(request.animacy || defaultAnimacy);
  if (
    connectorProfile === "preterit-agentive"
    && requestedAnimacy
    && !selectedAnimacyOptions.includes(requestedAnimacy)
  ) {
    return {
      sourceFrame,
      operationFrame: null,
      blockReason: "35.4-agentive-number-and-animacy-analysis-mismatch",
    };
  }
  const numberAnimacyFrame = connectorProfile === "preterit-agentive"
    ? deepFreeze({
      kind: "classical-nahuatl-preterit-agentive-number-animacy-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      sourceStem: sourceFrame.sourceStem,
      verbClass: sourceFrame.verbClass,
      subject,
      availableSingularConnectors: preteritAgentiveNumberOptions,
      selectedSingularConnector: singularConnectorChoice,
      connectorChoiceRequired:
        !pluralSubject && preteritAgentiveNumberOptions.length > 1,
      availableAnimacyReadings: selectedAnimacyOptions,
      selectedAnimacy: requestedAnimacy,
      animacyChoiceRequired: selectedAnimacyOptions.length > 1,
      silentNonanimateTendencyIsUniversal: false,
      lexicalSourceAuthority:
        "owner-issued-deverbal-nnc-lexical-authorization-frame",
      exampleStemMembershipRequired: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    })
    : null;
  const activationLicenseFrame = activationRequested
    ? deepFreeze({
      kind: "classical-nahuatl-agentive-object-activation-license-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      sourceObjectPattern: sourceFrame.sourceObjectPattern,
      sourceCarrier: sourceFrame.sourceObjectPattern === "nonspecific-human"
        ? "tē"
        : "tla",
      targetObjectPerson: activatedObjectPerson,
      targetRelation: supplementaryObjectRelation,
      targetReferentId: supplementaryObjectReferentId,
      destination: "specific-projective-object-outside-nominalized-predicate",
      hybridStructure: true,
      freeObjectMovementAllowed: false,
      participantFactsValidated: true,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    })
    : null;
  const affinityFrame = deepFreeze({
    kind: "classical-nahuatl-preterit-agentive-affinity-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    requirement: affinityRequirement,
    pluralSubject,
    availableChoices: affinityRequirement === "plural-optional" && pluralSubject
      ? ["plain", "affinity"]
      : [affinitySelected ? "affinity" : "plain"],
    selectedChoice: affinitySelected ? "affinity" : "plain",
    choiceRequired:
      affinityRequirement === "plural-optional" && pluralSubject,
    appliedAutomatically:
      affinityRequirement === "plural-required" && pluralSubject,
    exampleStemMembershipRequired: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });

  const semanticProfile = buildPredicateNominalizationSemanticProfile({
    nominalizationKind,
    preteritAgentiveVariant,
    sourceFrame,
    restrictedUse,
    generalUse,
    allowedStates,
    possessiveAgentiveYoMatrix:
      lexicalFrame.possessiveAgentiveYoMatrix === true,
  });
  const oldPersonAnalysisFrame = buildOldPersonAnalysisFrame({
    family: oldPersonFamily,
    sourceStem: sourceFrame.sourceStem,
    subject,
    selectedPerfectiveStem: selectedSourceStem,
  });
  const requestedState = normalizeKey(request.state || "absolutive");
  const requestedPossessor = normalizeSubject(request.possessor);
  const possessiveAgentiveFrame = requestedState === "possessive"
    && ["preterit-agentive", "preterit-patientive"].includes(
      nominalizationKind
    )
    ? deepFreeze({
      kind: "classical-nahuatl-possessive-preterit-agentive-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      sourceStem: generalUse,
      sourceNounClass: "tl",
      sourceSubclass: "tl-1-a",
      subject,
      possessor: requestedPossessor,
      numberDyad: subject.endsWith("pl") ? "hu-ān" : "uh-0",
      singularNumberDerivedAsUhZero: !subject.endsWith("pl"),
      pluralNumberDerivedAsHuAn: subject.endsWith("pl"),
      cāInsertionIsUserChoice: false,
      numberDyadIsUserChoice: false,
      participantReferenceIsUserChoice: true,
      internalObjectPattern: sourceFrame.sourceObjectPattern,
      patientiveCounterpart:
        nominalizationKind === "preterit-patientive",
      yauhInnerPossessorShift:
        preteritAgentiveVariant === "yauh-ti-owner",
      caYoMatrixIrregularity:
        lexicalFrame.possessiveAgentiveYoMatrix === true,
      typedLexicalIrregularitiesOnly: true,
      exampleStemMembershipRequired: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    })
    : null;
  const agentiveContrastFrame = [
    "customary-agentive-reanalysis",
    "customary-agentive-full",
  ].includes(nominalizationKind)
    ? deepFreeze({
      kind: "classical-nahuatl-customary-preterit-agentive-contrast-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      customaryAnalysis: nominalizationKind,
      preteritAnalysis: "preterit-agentive",
      analysesRemainDistinct: true,
      sameEnglishTranslationMergesAnalyses: false,
      nominalizationOrMeaningAmbiguityCanRequireUserChoice: true,
      englishTranslationAloneRequiresUserChoice: false,
      customaryAgentivePossessiveSupplementFrame,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    })
    : null;
  const actionPreteritContrastFrame = buildActionPreteritContrastFrame({
    nominalizationKind,
    sourceFrame,
  });
  const actionVoicePossessorRoleFrame =
    buildActionVoicePossessorRoleFrame({
      actionAnalysis: nominalizationKind,
      sourceFrame,
      selectedState: normalizeKey(request.state || "absolutive"),
      transformedPossessor,
    });
  const participantRoleTransitionFrame =
    buildDeverbalParticipantRoleTransitionFrame({
      operationId: `predicate-nominalization:${nominalizationKind}`,
      sourceFrame,
      sourceSubjectBecomesPossessor: Boolean(
        transformedPossessor && possessorFixedBySourceSubject
      ),
      targetSubjectImportedOutsideSource: Boolean(
        fixedTargetSubject
        && fixedTargetSubject !== sourceFrame.sourceSubject
      ),
      activatedProjectiveObject: activationRequested,
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
    singularConnectorChoice,
    singularConnectorOptions: preteritAgentiveNumberOptions,
    numberAnimacyFrame,
    pluralConnector: nounClass === "tl" ? "m-eh" : "t-in",
    possessiveSingularConnector,
    allowedStates,
    defaultState: allowedStates[0],
    defaultAnimacy,
    transformedPossessor,
    fixedTargetSubject,
    fixedTargetAnimacy,
    possessorFixedBySourceSubject,
    customaryAgentivePossessiveSupplementFrame,
    customaryPatientiveFrame,
    instrumentiveSourcePairFrame,
    instrumentiveParticipantFrame,
    instrumentiveRealizationFrame,
    presentAgentiveFrame,
    futureAgentiveFrame,
    actionNncTaxonomyFrame,
    passiveActionFrame,
    activeActionFoundationFrame,
    generalUseActiveActionFrame,
    restrictedUseActiveActionFrame,
    actionCharacteristicFrame,
    actionPreteritContrastFrame,
    actionVoicePossessorRoleFrame,
    participantRoleTransitionFrame,
    agentiveContrastFrame,
    externalObjectPerson: activationRequested ? activatedObjectPerson : "",
    activatedProjectiveObject: activationRequested,
    activationLicenseFrame,
    lexicalFamily: oldPersonFamily,
    preteritAgentiveVariant,
    boundaryVariant,
    boundaryContext,
    affinityApplied: affinitySelected,
    affinityFrame,
    possessiveAgentiveFrame,
    appliedAuthorizationIds,
    appliedSemanticRules: rules,
    semanticProfile,
    oldPersonAnalysisFrame,
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
      ? {
        authorizationStatus: "authorized",
        stemRule: requested,
        options: allowed,
        choiceRequired: allowed.length > 1,
      }
      : {
        authorizationStatus: "blocked",
        stemRule: "",
        blockReason:
          "37.3-action-stem-variant-not-authorized-by-typed-source-analysis",
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
    options: allowed,
    choiceRequired: allowed.length > 1,
  };
}

function deriveProductiveZActionCore(
  sourceStem = "",
  lexicalFrame = null
) {
  const stem = normalizeStem(sourceStem);
  if (/i$/u.test(stem)) {
    return {
      authorizationStatus: "authorized",
      blockReason: "",
      stem,
      rule: "final-i",
    };
  }
  if (/hua$/u.test(stem)) {
    return {
      authorizationStatus: "authorized",
      blockReason: "",
      stem: stem.replace(/hua$/u, "hui"),
      rule: "replacive-a-to-i",
    };
  }
  if (/ca$/u.test(stem)) {
    return {
      authorizationStatus: "authorized",
      blockReason: "",
      stem: stem.replace(/ca$/u, "qui"),
      rule: "replacive-a-to-i",
    };
  }
  if (/a$/u.test(stem)) {
    return {
      authorizationStatus: "authorized",
      blockReason: "",
      stem: stem.replace(/a$/u, "i"),
      rule: "replacive-a-to-i",
    };
  }
  if (lexicalFrame?.zActionException === true) {
    return {
      authorizationStatus: "authorized",
      blockReason: "",
      stem,
      rule: "typed-lexical-exception",
    };
  }
  return {
    authorizationStatus: "blocked",
    blockReason:
      "37.2-z-requires-final-i-or-typed-exception",
    stem: "",
    rule: "",
  };
}

function applySupportiveInitialIActionBoundary({
  stem = "",
  objectPrefix = "",
  sourceInitialIKind = "",
  lexicalSourceStem = "",
  requestedVariant = "",
} = {}) {
  const source = normalizeStem(stem);
  const lexicalSource = normalizeStem(lexicalSourceStem);
  const supportive = normalizeKey(sourceInitialIKind) === "supportive";
  const beginsWithI = /^i/u.test(source);
  const requested = normalizeKey(requestedVariant);
  if (supportive && objectPrefix === "ne") {
    const retainedStem = beginsWithI
      ? source
      : /^i/u.test(lexicalSource)
        && lexicalSource.replace(/^i/u, "") === source
        ? lexicalSource
        : "";
    if (retainedStem) {
      const options = ["supportive-i-drop", "supportive-i-retain"];
      const selected = requested || options[0];
      if (!options.includes(selected)) {
        return {
          authorizationStatus: "blocked",
          blockReason: "37.3-supportive-i-choice-not-recognized",
          stem: "",
          rule: "",
          options,
          choiceRequired: true,
        };
      }
      return {
        authorizationStatus: "authorized",
        blockReason: "",
        stem: selected === "supportive-i-drop"
          ? retainedStem.replace(/^i/u, "")
          : retainedStem,
        rule: `${selected}-after-ne`,
        options,
        choiceRequired: true,
      };
    }
  }
  if (supportive && !beginsWithI && objectPrefix === "tla") {
    return {
      authorizationStatus: "authorized",
      blockReason: "",
      stem: source,
      rule: "supportive-i-deletion-inherited-from-vnc-owner",
      options: [],
      choiceRequired: false,
    };
  }
  if (!supportive || !beginsWithI || !["tla", "ne"].includes(objectPrefix)) {
    return {
      authorizationStatus: "authorized",
      blockReason: "",
      stem: source,
      rule: "not-applicable",
      options: [],
      choiceRequired: false,
    };
  }
  if (objectPrefix === "tla") {
    return {
      authorizationStatus: "authorized",
      blockReason: "",
      stem: source.replace(/^i/u, ""),
      rule: "supportive-i-drop-after-tla",
      options: [],
      choiceRequired: false,
    };
  }
  return {
    authorizationStatus: "authorized",
    blockReason: "",
    stem: source,
    rule: "not-applicable",
    options: [],
    choiceRequired: false,
  };
}

function buildDeverbalActionOperation(
  request = {},
  preparedSourceFrame = null,
  target = globalThis
) {
  if (request.canonicalVncResult) {
    const captureFrame = captureDeverbalActionVncResult(
      request.canonicalVncResult,
      target
    );
    if (!isClassicalNahuatlDeverbalActionVncCaptureFrame(captureFrame)) {
      return {
        sourceFrame: null,
        operationFrame: null,
        blockReason: captureFrame.blockReason,
      };
    }
    request = {
      ...request,
      source: {
        sourceUnit: captureFrame.sourceUnit,
        sourceStage: captureFrame.sourceStage,
        sourceStem: captureFrame.sourceStem,
        verbClass: captureFrame.verbClass,
        sourceVoice: captureFrame.sourceVoice,
        sourceValence: captureFrame.sourceValence,
        sourceObjectPattern: captureFrame.sourceObjectPattern,
        sourceSubject: captureFrame.sourceSubject,
        sourceIsCompound: captureFrame.sourceIsPolymorphemic,
        sourceVoiceOperation: captureFrame.sourceVoiceOperation,
        sourceNonactiveOptionId: captureFrame.sourceNonactiveOptionId,
        deverbalActionVncCaptureFrame: captureFrame,
      },
    };
  }
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
  const deverbalNounstemAxisFrame = buildDeverbalNounstemAxisFrame({
    sourceFrame,
    structuralContractId: `deverbal-action:${actionKind}`,
    formationFamily: `deverbal-action:${actionKind}:${suffix}`,
    allowedStates: ["absolutive", "possessive"],
  });
  if (deverbalNounstemAxisFrame.authorizationStatus !== "authorized") {
    return {
      sourceFrame,
      operationFrame: null,
      blockReason: deverbalNounstemAxisFrame.blockReason,
    };
  }
  const lexicalFrame = sourceFrame.lexicalAuthorizationFrame;
  const actionCapture = sourceFrame.deverbalActionVncCaptureFrame;
  const exactObjectKinds = (actionCapture?.sourceObjectRequests || [])
    .map(item => normalizeKey(item?.objectKind))
    .filter(Boolean);
  const reflexiveAndTlaException = Boolean(
    exactObjectKinds.includes("reflexive")
    && exactObjectKinds.includes("nonspecific-nonhuman")
  );
  const activeActionObjectPrefix = reflexiveAndTlaException
    ? "ne"
    : internalObjectPrefix(
      sourceFrame.sourceObjectPattern,
      sourceFrame.sourceSubject,
      true
    );
  const objectPrefix = actionKind === "potential-patient"
    ? ""
    : activeActionObjectPrefix;
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
  const stemSelection = suffix === "z"
    ? deriveProductiveZActionCore(sourceFrame.sourceStem, lexicalFrame)
    : selectOwnedActionStemRule(
      lexicalFrame,
      sourceFrame.sourceStem,
      suffix,
      ["supportive-i-drop", "supportive-i-retain"].includes(
        normalizeKey(request.actionStemVariant)
      )
        ? ""
        : request.actionStemVariant
    );
  if (stemSelection.authorizationStatus !== "authorized") {
    return {
      sourceFrame,
      operationFrame: null,
      blockReason: stemSelection.blockReason,
    };
  }
  const stemRule = stemSelection.rule || stemSelection.stemRule;
  const ruled = suffix === "z"
    ? { authorized: true, stem: stemSelection.stem }
    : applyActionStemRule(sourceFrame.sourceStem, stemRule);
  if (!ruled.authorized) {
    return { sourceFrame, operationFrame: null, blockReason: `action-stem-rule-${stemRule}-environment-not-met` };
  }
  const supportiveBoundary = applySupportiveInitialIActionBoundary({
    stem: ruled.stem,
    objectPrefix,
    sourceInitialIKind:
      sourceFrame.deverbalActionVncCaptureFrame?.sourceInitialIKind || "",
    lexicalSourceStem:
      sourceFrame.deverbalActionVncCaptureFrame?.lexicalSourceStem || "",
    requestedVariant: [
      "supportive-i-drop",
      "supportive-i-retain",
    ].includes(normalizeKey(request.actionStemVariant))
      ? request.actionStemVariant
      : "",
  });
  if (supportiveBoundary.authorizationStatus !== "authorized") {
    return {
      sourceFrame,
      operationFrame: null,
      blockReason: supportiveBoundary.blockReason,
    };
  }
  let actionCore = supportiveBoundary.stem;
  actionCore = joinMorphs([objectPrefix, actionCore]);
  const targetStem = joinMorphs([actionCore, suffix]);
  const sourceMorphemes = Object.freeze(
    sourceFrame.sourceStem.split("-").filter(Boolean)
  );
  const connectiveTOnOMatrix = /(?:^|-)(?:0|Ø|⎕)-t-o$/u.test(
    sourceFrame.sourceStem
  );
  const sourceStructureFrame = deepFreeze({
    kind: "classical-nahuatl-lesson37-action-source-structure-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    canonicalVncSourceAnalysisFrame:
      sourceFrame.canonicalVncSourceAnalysisFrame,
    exactSourceAnalysisIdentityPreserved: Boolean(
      sourceFrame.canonicalVncSourceAnalysisFrame
      && sourceFrame.canonicalVncSourceAnalysisFrame
        === sourceFrame.canonicalVncResult?.sourceAnalysisFrame
    ),
    typedFutureCore: sourceFrame.sourceStem,
    morphemes: sourceMorphemes,
    morphemicComplexity: sourceMorphemes.length > 1
      ? "polymorphemic"
      : "monomorphemic",
    internalBoundariesPreserved: sourceFrame.sourceStem.includes("-"),
    completeCompoundCoreEligible:
      sourceMorphemes.length > 1,
    connectiveTOnOMatrix,
    connectiveMorph: connectiveTOnOMatrix ? "t" : "",
    matrixVerbstem: connectiveTOnOMatrix ? "on-o" : "",
    apparentFinalTOIsIndependentVerbstemClass: false,
    exampleStemMembershipRequired: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
  const selectedTargetSubject = normalizeSubject(
    request.subject || "3sg"
  );
  const intransitiveActionPotentialHomophony =
    sourceFrame.sourceValence === "intransitive";
  const actionPotentialPatientContrastFrame = deepFreeze({
    kind: "classical-nahuatl-lesson37-action-potential-patient-contrast-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    selectedAnalysis: actionKind,
    sourceValence: sourceFrame.sourceValence,
    sourceObjectPattern: sourceFrame.sourceObjectPattern,
    sourceObjectKinds: Object.freeze([...exactObjectKinds]),
    activeActionObjectPrefix,
    potentialPatientObjectPrefix: "",
    transitiveContrastCarriedByObjectPresence:
      sourceFrame.sourceValence !== "intransitive",
    intransitiveActionPotentialHomophony,
    selectedTargetSubject,
    thirdSingularSurfaceAmbiguity: Boolean(
      intransitiveActionPotentialHomophony
      && ["3sg", "3common"].includes(selectedTargetSubject)
    ),
    otherPersonOrNumberDisambiguates: Boolean(
      intransitiveActionPotentialHomophony
      && !["3sg", "3common"].includes(selectedTargetSubject)
    ),
    reflexiveAndTlaObjectDeletionIsActiveActionException:
      reflexiveAndTlaException,
    surfaceIdentityMergesAnalyses: false,
    translationAuthorizesAnalysis: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
  const impersonalSourcePath = actionKind !== "impersonal-general-action"
    ? "not-applicable"
    : sourceFrame.sourceVoiceOperation === "tla-impersonal"
      || sourceFrame.sourceNonactiveOptionId === "tla-impersonal"
      ? "tla-impersonal"
      : sourceFrame.sourceVoiceOperation === "inherent-impersonal"
        || sourceFrame.sourceNonactiveOptionId === "inherent-impersonal"
        ? "inherent-impersonal"
        : "nonactive-suffix";
  const impersonalGeneralActionFrame = deepFreeze({
    kind: "classical-nahuatl-lesson37-impersonal-general-action-frame",
    version: VERSION,
    authorizationStatus: actionKind === "impersonal-general-action"
      ? "authorized"
      : "not-applicable",
    canonicalImpersonalVncResult:
      actionKind === "impersonal-general-action"
        ? sourceFrame.canonicalVncResult
        : null,
    exactImpersonalResultIdentityPreserved:
      actionKind === "impersonal-general-action"
        && sourceFrame.sourceCapturedFromExactVncResult === true,
    sourceVoice: sourceFrame.sourceVoice,
    sourceVoiceOperation: sourceFrame.sourceVoiceOperation,
    sourceNonactiveOptionId: sourceFrame.sourceNonactiveOptionId,
    impersonalSourcePath,
    generalActionPerformedByEveryoneInvolved:
      actionKind === "impersonal-general-action",
    sourceImpersonalMorphologyPreservedInsideNounstem:
      actionKind === "impersonal-general-action",
    spellingWarningCreatesGrammarOption: false,
    lexicalReadingRequiresTypedSourceOrContext: true,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
  const stemVariantOptions = stemSelection.options || [];
  const visibleVariantOptions = supportiveBoundary.options.length
    ? supportiveBoundary.options
    : stemVariantOptions;
  const visibleVariantChoiceRequired = supportiveBoundary.options.length
    ? supportiveBoundary.choiceRequired
    : stemSelection.choiceRequired === true;
  const lizReadingOptions = suffix === "liz"
    ? lexicalFrame.lizReadingOptions
    : ["compositional-action"];
  const appliedAuthorizationIds = [
    ...([
      "none",
      "final-i",
      "replacive-a-to-i",
      "typed-lexical-exception",
    ].includes(stemRule)
      ? []
      : [`typed-source-analysis:action-stem-${stemRule}`]),
    ...(lexicalFrame.zActionException && suffix === "z"
      ? ["lexical-source:z-final-exception"]
      : []),
    ...(actionKind === "potential-patient"
      && sourceFrame.sourceValence !== "intransitive"
      ? ["structural-source:projective-object-deletion"]
      : []),
  ];
  const actionVoicePossessorRoleFrame =
    buildActionVoicePossessorRoleFrame({
      actionAnalysis: actionKind,
      sourceFrame,
      selectedState: normalizeKey(request.state || "absolutive"),
      transformedPossessor:
        sourceSubjectToPossessor(sourceFrame.sourceSubject),
    });
  const selectedActionState = normalizeKey(request.state || "absolutive");
  const participantRoleTransitionFrame =
    buildDeverbalParticipantRoleTransitionFrame({
      operationId: `deverbal-action:${actionKind}:${suffix}`,
      sourceFrame,
      sourceSubjectBecomesPossessor:
        actionKind === "active-action"
        && selectedActionState === "possessive",
      targetSubjectImportedOutsideSource:
        actionKind !== "potential-patient",
      sourceProjectiveObjectExpressionRetired:
        actionKind === "potential-patient"
        && sourceFrame.sourceValence !== "intransitive",
    });
  const operationFrame = deepFreeze({
    kind: "classical-nahuatl-deverbal-nnc-operation-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    operationId: `deverbal-action:${actionKind}:${suffix}`,
    deverbalNounstemAxisFrame,
    constructionKind: "deverbal-action",
    actionKind,
    actionSuffix: suffix,
    sourceStage: sourceFrame.sourceStage,
    sourceVoice: sourceFrame.sourceVoice,
    sourceObjectPattern: sourceFrame.sourceObjectPattern,
    stemRule,
    actionStemVariantOptions: visibleVariantOptions,
    actionStemVariantChoiceRequired: visibleVariantChoiceRequired,
    actionStemAnalysis: lexicalFrame.actionStemAnalysis,
    supportiveInitialIRule: supportiveBoundary.rule,
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
    fixedTargetSubject: actionKind === "potential-patient" ? "" : "3common",
    fixedTargetAnimacy: actionKind === "potential-patient" ? "" : "nonanimate",
    defaultAnimacy: actionKind === "potential-patient" ? "animate" : "nonanimate",
    transformedPossessor: sourceSubjectToPossessor(sourceFrame.sourceSubject),
    possessorFixedBySourceSubject: actionKind === "active-action",
    actionVoicePossessorRoleFrame,
    participantRoleTransitionFrame,
    deverbalActionFrame: deepFreeze({
      kind: "classical-nahuatl-lesson37-deverbal-action-frame",
      version: VERSION,
      canonicalVncResult:
        sourceFrame.deverbalActionVncCaptureFrame?.canonicalVncResult || null,
      canonicalVncResultRequiredByNormalApplication: true,
      exactVncResultIdentityPreserved:
        sourceFrame.sourceCapturedFromExactVncResult === true,
      lexicalSourceStem:
        sourceFrame.deverbalActionVncCaptureFrame?.lexicalSourceStem || "",
      futureVncCore: sourceFrame.sourceStem,
      futureTenseCarrier:
        sourceFrame.deverbalActionVncCaptureFrame?.futureTenseCarrier || "",
      nominalSuffix: suffix,
      nominalSuffixStructure: suffix === "z" ? ["z"] : ["l", "i", "z"],
      futureTenseAndNominalZAreDistinct: true,
      verbClass: sourceFrame.verbClass,
      objectPrefix,
      supportiveInitialIKind:
        sourceFrame.deverbalActionVncCaptureFrame?.sourceInitialIKind || "",
      supportiveInitialIRule: supportiveBoundary.rule,
      actionStemRule: stemRule,
      actionStemVariantOptions: stemVariantOptions,
      actionStemVariantChoiceRequired:
        stemSelection.choiceRequired === true,
      actionStemAnalysis: lexicalFrame.actionStemAnalysis,
      sourceStructureFrame,
      actionPotentialPatientContrastFrame,
      impersonalGeneralActionFrame,
      actionVoicePossessorRoleFrame,
      internalBoundariesPreserved:
        sourceFrame.sourceStem.includes("-"),
      exampleStemMembershipRequired: false,
      sourceSubject: sourceFrame.sourceSubject,
      targetSubject: actionKind === "potential-patient"
        ? selectedTargetSubject
        : "3common",
      targetAnimacy: actionKind === "potential-patient"
        ? normalizeKey(request.animacy || "animate")
        : "nonanimate",
      sourceSubjectBecomesPossessor: actionKind === "active-action",
      nounClass: "tli",
      lizReadingOptions,
      compositionalActionReadingAlwaysAvailable: true,
      lexicalReadingRequiresTypedSourceOrContext:
        lizReadingOptions.length > 1,
      lexicalReadingSelectedFromLizShape: false,
      readingChoiceOnlyWhenContextRemainsAmbiguous: true,
      examplesAuthorizeRoute: false,
      sourceShapeChoosesLexicalMeaning: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    }),
    appliedAuthorizationIds,
    appliedSemanticRules: [
      actionKind === "active-action"
        ? suffix === "z"
          ? "37.2-active-action-z"
          : "37.3-active-action-liz"
        : actionKind === "potential-patient"
          ? `37.5.2-potential-patient-${suffix}`
          : `37.5.3-impersonal-general-action-${suffix}`,
      ...(["none", "final-i", "replacive-a-to-i"].includes(stemRule)
        ? []
        : [`37.3-${stemRule}`]),
    ],
    typedOperationAuthority: true,
    callerSuppliedDerivedAuthorityAccepted: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
  return { sourceFrame, operationFrame, blockReason: "" };
}

function truncateNonactiveStem(
  stem = "",
  suffix = "",
  { activeSourceStem = "" } = {}
) {
  const source = normalizeStem(stem);
  const activeSource = normalizeStem(activeSourceStem);
  const normalizedSuffix = normalizeKey(suffix).replace(/ō/gu, "ō");
  const build = ({
    targetStem,
    nounClass,
    removedMaterial,
    precedingVowelBehaviorOverride = "",
  }) => {
    const retainedStem = normalizeStem(targetStem);
    const precedingVowel = (
      normalizedSuffix.startsWith("lō")
        ? source.match(/([aāeēiīoō])-?lō(?:-?hua)?$/u)?.[1]
        : normalizedSuffix === "hua"
          ? source.match(/([aāeēiīoō])-?hua$/u)?.[1]
          : ""
    ) || "";
    const precedingVowelBehavior = precedingVowelBehaviorOverride
      || (normalizedSuffix === "hua"
      ? precedingVowel === "ī"
        ? "long-i-shortened-to-i"
        : precedingVowel
          ? "preceding-vowel-preserved"
          : "not-applicable"
      : ["ī", "ō"].includes(precedingVowel)
        ? "long-i-or-o-preserved"
        : precedingVowel === "a"
          ? "reduced-long-a-written-without-macron"
          : "not-applicable");
    return {
      stem: retainedStem,
      nounClass,
      sourceStem: source,
      suffixFamily: normalizedSuffix,
      removedMaterial,
      retainedStem,
      precedingVowel,
      precedingVowelBehavior,
      activeSourceStem: activeSource,
      activeSourceFinalVowel:
        activeSource.replace(/-/gu, "").match(/([aāeēiīoō])$/u)?.[1]
        || "",
      truncationDerivedFromTypedMorphemicBoundary: true,
      finalLettersAloneAuthorizeTruncation: false,
    };
  };
  if (normalizedSuffix === "lō" && /lō$/u.test(source)) {
    return build({
      targetStem: source.replace(/lō$/u, "l"),
      nounClass: "tli",
      removedMaterial: "ō",
    });
  }
  if (normalizedSuffix === "lō-hua" && /lō-?hua$/u.test(source)) {
    return build({
      targetStem: source.replace(/lō-?hua$/u, "l"),
      nounClass: "tli",
      removedMaterial: "ō-hua",
    });
  }
  if (normalizedSuffix === "hua-lō" && /hua-?lō$/u.test(source)) {
    return build({
      targetStem: source.replace(/lō$/u, "l"),
      nounClass: "tli",
      removedMaterial: "ō",
    });
  }
  if (normalizedSuffix === "ō" && /ō$/u.test(source)) {
    return build({
      targetStem: source.replace(/ō$/u, ""),
      nounClass: "tli",
      removedMaterial: "ō",
    });
  }
  if (normalizedSuffix === "o-hua" && /o-?hua$/u.test(source)) {
    return build({
      targetStem: source.replace(/o-?hua$/u, ""),
      nounClass: "tli",
      removedMaterial: "o-hua",
    });
  }
  if (normalizedSuffix === "ō-hua" && /ō-?hua$/u.test(source)) {
    return build({
      targetStem: source.replace(/ō-?hua$/u, ""),
      nounClass: "tli",
      removedMaterial: "ō-hua",
    });
  }
  if (normalizedSuffix === "hua" && /hua$/u.test(source)) {
    const stripped = source.replace(/-?hua$/u, "");
    const activeFinalVowel = activeSource
      .replace(/-/gu, "")
      .match(/([aāeēiīoō])$/u)?.[1] || "";
    const strippedFinalVowel = stripped
      .replace(/-/gu, "")
      .match(/([aāeēiīoō])$/u)?.[1] || "";
    const activeLongVowelIsInherited = ["ā", "ē", "ī", "ō"].includes(
      activeFinalVowel
    ) && activeFinalVowel === strippedFinalVowel;
    const targetStem = activeLongVowelIsInherited
      ? stripped
      : shortenFinalLongI(stripped);
    const precedingVowelBehaviorOverride = activeLongVowelIsInherited
      ? "active-source-long-vowel-preserved"
      : activeFinalVowel === "a" && strippedFinalVowel === "ī"
        ? "active-final-a-replaced-by-short-i"
        : strippedFinalVowel === "ī"
          ? "long-i-shortened-to-i"
          : strippedFinalVowel
            ? "preceding-vowel-preserved"
            : "not-applicable";
    return build({
      targetStem,
      nounClass: "tl",
      removedMaterial: "hua",
      precedingVowelBehaviorOverride,
    });
  }
  return {
    stem: "",
    nounClass: "",
    sourceStem: source,
    suffixFamily: normalizedSuffix,
    removedMaterial: "",
    retainedStem: "",
    precedingVowel: "",
    precedingVowelBehavior: "not-applicable",
    activeSourceStem: activeSource,
    activeSourceFinalVowel: "",
    truncationDerivedFromTypedMorphemicBoundary: false,
    finalLettersAloneAuthorizeTruncation: false,
  };
}

function buildPassivePatientiveFamilyFrame({
  request = {},
  sourceFrame = null,
  truncationFrame = null,
  targetStem = "",
  nounClass = "",
} = {}) {
  const capture = sourceFrame?.passivePatientiveVncCaptureFrame || null;
  if (!capture || !truncationFrame) return null;
  const suffixFamily = truncationFrame.typedSuffixFamily;
  const family = suffixFamily === "lō"
    ? "lō-passive-patientive"
    : suffixFamily === "ō"
      ? "ō-passive-patientive"
      : suffixFamily === "hua"
        ? "hua-passive-patientive"
        : "extended-passive-patientive";
  const sourceFormationAuthority = normalizeKey(
    capture.canonicalNonactiveStemRecord?.selectedFormationAuthority || ""
  );
  const sourceRuleId = normalizeToken(
    capture.canonicalNonactiveStemRecord?.selectedRuleId || ""
  );
  const sourceVowelRuleId = normalizeToken(
    capture.canonicalNonactiveStemRecord?.vowelLengthRuleFrame?.ruleId || ""
  );
  const sourceInitialISelection = normalizeKey(
    capture.continuationProjection?.sourceInitialISelection || ""
  );
  const activeSourceStem = normalizeStem(
    capture.continuationProjection?.sourceStem
  );
  const targetAnimacy = normalizeKey(request.animacy || "animate");
  const targetHumanness = normalizeKey(
    request.humanness
      || (targetAnimacy === "nonanimate" ? "nonhuman" : "unspecified")
  );
  const reflexive = capture.sourceObjectPattern === "reflexive"
    && capture.shuntlineReflexiveEvidencePreserved === true;
  const doubleObject = capture.sourceValence === "double-object";
  const retainedObject = capture.retainedObjectEvidence?.[0] || null;
  const humanObjectDeletionLicensed = Boolean(
    doubleObject
    && capture.retainedObjectEvidence?.length === 1
    && retainedObject?.objectKind === "nonspecific-human"
  );
  const selectedHumanObjectRealization = normalizeKey(
    request.passiveHumanObjectRealization || "retain"
  );
  const lexicalReadings = Object.freeze(Array.from(
    sourceFrame.lexicalAuthorizationFrame?.patientiveLexicalReadings || []
  ));
  return deepFreeze({
    kind: "classical-nahuatl-lesson37-passive-patientive-family-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    selectedFamily: family,
    typedSuffixFamily: suffixFamily,
    canonicalPassiveVncResult: capture.canonicalVncResult,
    exactPassiveVncResultIdentityPreserved:
      capture.canonicalVncResult === sourceFrame.canonicalVncResult,
    canonicalPassiveSourceAnalysisFrame:
      capture.canonicalVncSourceAnalysisFrame,
    canonicalNonactiveStemRecord:
      capture.canonicalNonactiveStemRecord,
    canonicalPassiveParticipantFrame:
      capture.canonicalPassiveParticipantFrame,
    activeSourceStem,
    passiveSourceStem: truncationFrame.sourceStem,
    patientiveTargetStem: normalizeStem(targetStem),
    completeActivePassivePatientiveChainPreserved: true,
    activeSourceValence: capture.activeSourceValence,
    sourceObjectPattern: capture.sourceObjectPattern,
    retainedObjectEvidence: capture.retainedObjectEvidence,
    promotedObjectEvidence: capture.promotedObjectEvidence,
    patientReferent: capture.patientReferent,
    targetAnimacy,
    targetHumanness,
    nounClass,
    removedMaterial: truncationFrame.removedMaterial,
    retainedMaterial: truncationFrame.retainedStem,
    precedingVowel: truncationFrame.precedingVowel,
    precedingVowelBehavior: truncationFrame.precedingVowelBehavior,
    activeSourceFinalVowel: truncationFrame.activeSourceFinalVowel,
    loDeletesFinalOAndRetainsL:
      suffixFamily === "lō"
      && truncationFrame.removedMaterial === "ō"
      && /l$/u.test(truncationFrame.retainedStem),
    oDeletesCompletePassiveSuffix:
      suffixFamily === "ō"
      && truncationFrame.removedMaterial === "ō",
    huaDeletesCompleteSuffix:
      suffixFamily === "hua"
      && truncationFrame.removedMaterial === "hua",
    huaShortensPrecedingLongI:
      suffixFamily === "hua"
      && truncationFrame.precedingVowel === "ī"
      && truncationFrame.precedingVowelBehavior
        === "long-i-shortened-to-i",
    huaPreservesOtherPrecedingVowels:
      suffixFamily === "hua"
      && truncationFrame.precedingVowel !== "ī",
    sourceFormationAuthority,
    sourceRuleId,
    sourceVowelRuleId,
    unexpectedOrIrregularNonactiveSourcePreserved:
      Boolean(sourceFormationAuthority)
      && !["productive-rule", "productive-lexical-class-rule"]
        .includes(sourceFormationAuthority),
    unexpectedOrIrregularSourceBlocksPatientive: false,
    sourceInitialISelection,
    supportiveInitialVowelAnalysisPreserved:
      Boolean(sourceInitialISelection)
      || Boolean(capture.canonicalVncSourceAnalysisFrame),
    reduplicationAndInternalBoundariesPreserved:
      activeSourceStem.includes("-")
      || truncationFrame.sourceStem.includes("-"),
    compositionalPatientReadingAlwaysAvailable: true,
    lexicalizedOrFigurativeReadingRequiresTypedSourceOrContext: true,
    lexicalMeaningSelectedBySuffixShape: false,
    nahuatlPatientiveConstrualRemainsAuthoritative: true,
    englishSemanticIntuitionAuthorizesAgentiveReanalysis: false,
    exampleStemMembershipRequired: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
    reflexivePassivePatientiveFrame: reflexive
      ? {
        kind:
          "classical-nahuatl-lesson37-reflexive-passive-patientive-frame",
        version: VERSION,
        authorizationStatus: "authorized",
        canonicalPassiveVncResult: capture.canonicalVncResult,
        activeSourceValence: capture.activeSourceValence,
        activeReflexiveAncestryPreserved: true,
        shuntlineReflexiveCarrier: "ne",
        shuntlineReflexiveInheritedAutomatically: true,
        manualNeInsertionAccepted: false,
        patientiveTargetStem: normalizeStem(targetStem),
        patientReferent: capture.patientReferent,
        targetAnimacy,
        targetHumanness,
        compositionalReading: "thing-that-has-undergone-the-reflexive-action",
        lexicalReadings,
        lexicalReadingRequiresTypedSourceOrContext: true,
        reflexivityReconstructedFromSurface: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
      }
      : null,
    doubleObjectPassivePatientiveFrame: doubleObject
      ? {
        kind:
          "classical-nahuatl-lesson37-double-object-passive-patientive-frame",
        version: VERSION,
        authorizationStatus: "authorized",
        canonicalPassiveVncResult: capture.canonicalVncResult,
        activeObjectEvidence: capture.activeObjectEvidence,
        promotedObjectEvidence: capture.promotedObjectEvidence,
        patientiveReferent: capture.patientReferent,
        survivingInternalObjects: capture.retainedObjectEvidence,
        survivingInternalObjectCount: capture.retainedObjectEvidence.length,
        onlyPassiveSurvivingObjectRetained:
          capture.retainedObjectEvidence.length === 1,
        retainedObjectPattern: capture.sourceObjectPattern,
        retainedObjectCarrier: capture.retainedObjectCarrier,
        humanObjectDeletionLicensed,
        humanObjectRealizationOptions: humanObjectDeletionLicensed
          ? ["retain", "delete"]
          : ["retain"],
        selectedHumanObjectRealization,
        arbitraryObjectDeletionAccepted: false,
        participantRolesInferredFromPrefixOrder: false,
        lexicalReadings,
        lexicalReadingRequiresTypedSourceOrContext: true,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
      }
      : null,
  });
}

function buildImpersonalPatientiveFamilyFrame({
  request = {},
  sourceFrame = null,
  truncationFrame = null,
  targetStem = "",
  nounClass = "",
} = {}) {
  const capture = sourceFrame?.impersonalPatientiveVncCaptureFrame || null;
  if (!capture || !truncationFrame) return null;
  const suffixFamily = truncationFrame.typedSuffixFamily;
  const activeSourceMorphemes = Object.freeze(
    normalizeStem(capture.activeSourceStem).split("-").filter(Boolean)
  );
  const impersonalSourceMorphemes = Object.freeze(
    normalizeStem(truncationFrame.sourceStem).split("-").filter(Boolean)
  );
  const layeredHuaLoSource = suffixFamily === "hua-lō";
  const rootPlusYaBoundaryAvailable =
    capture.rootPlusYaBoundaryAvailable === true;
  const selectedFamily = layeredHuaLoSource
    ? "hua-lō-impersonal-patientive"
    : suffixFamily === "lō"
      ? "lō-impersonal-patientive"
    : ["ō", "ō-hua", "o-hua"].includes(suffixFamily)
      ? "ō-or-o-hua-impersonal-patientive"
      : suffixFamily === "hua"
        ? "hua-impersonal-patientive"
        : "extended-impersonal-patientive";
  const sourceFormationAuthority = normalizeKey(
    capture.canonicalNonactiveStemRecord?.formationAuthority || ""
  );
  const sourceRuleId = normalizeToken(
    capture.canonicalNonactiveStemRecord?.ruleId || ""
  );
  const sourceVowelRuleId = normalizeToken(
    capture.canonicalNonactiveStemRecord?.vowelLengthRuleId || ""
  );
  return deepFreeze({
    kind: "classical-nahuatl-lesson38-impersonal-patientive-family-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    selectedFamily,
    typedSuffixFamily: suffixFamily,
    canonicalImpersonalVncResult: capture.canonicalVncResult,
    exactImpersonalVncResultIdentityPreserved:
      capture.canonicalVncResult === sourceFrame.canonicalVncResult,
    canonicalImpersonalSourceAnalysisFrame:
      capture.canonicalVncSourceAnalysisFrame,
    canonicalNonactiveStemRecord:
      capture.canonicalNonactiveStemRecord,
    activeSourceStem: capture.activeSourceStem,
    impersonalSourceStem: truncationFrame.sourceStem,
    patientiveTargetStem: normalizeStem(targetStem),
    completeActiveImpersonalPatientiveChainPreserved: true,
    sourceVoiceOperation: capture.sourceVoiceOperation,
    sourceValence: capture.sourceValence,
    sourceObjectPattern: capture.sourceObjectPattern,
    sourceSubject: capture.sourceSubject,
    sourceAlreadyCarriesTlaImpersonalLayer:
      capture.sourceAlreadyCarriesTlaImpersonalLayer,
    inherentImpersonalAnalysisPreserved:
      capture.inherentImpersonalAnalysisPreserved,
    completeTypedSourceAnalysisPreserved:
      capture.completeTypedSourceAnalysisPreserved,
    patientiveNamesResultRatherThanAgent: true,
    englishParticipleAnalogyAuthorizesGrammar: false,
    nounClass,
    removedMaterial: truncationFrame.removedMaterial,
    retainedMaterial: truncationFrame.retainedStem,
    precedingVowel: truncationFrame.precedingVowel,
    precedingVowelBehavior: truncationFrame.precedingVowelBehavior,
    huaDeletesCompleteNonactiveMaterial:
      suffixFamily === "hua"
      && truncationFrame.removedMaterial === "hua",
    huaPrecedingLongIShortenedAutomatically:
      suffixFamily === "hua"
      && truncationFrame.precedingVowel === "ī"
      && truncationFrame.precedingVowelBehavior
        === "long-i-shortened-to-i",
    huaActiveSourceLongVowelPreserved:
      suffixFamily === "hua"
      && truncationFrame.precedingVowelBehavior
        === "active-source-long-vowel-preserved",
    huaActiveFinalAReplacedByShortI:
      suffixFamily === "hua"
      && truncationFrame.precedingVowelBehavior
        === "active-final-a-replaced-by-short-i",
    huaOtherPrecedingVowelQuantityPreserved:
      suffixFamily === "hua"
      && truncationFrame.precedingVowel !== "ī"
      && [
        "preceding-vowel-preserved",
        "not-applicable",
      ].includes(truncationFrame.precedingVowelBehavior),
    huaVowelBehaviorIsUserChoice: false,
    nounClassIsUserChoice: false,
    alternativeFormationRequiresAnotherOwnerIssuedVncResult: true,
    manualAlternativeFormationAuthorizesThisResult: false,
    layeredHuaLoSource,
    activeSourceMorphemes,
    impersonalSourceMorphemes,
    innerHuaBoundaryPreserved:
      layeredHuaLoSource
      && /(?:^|-)hua-l$/u.test(truncationFrame.retainedStem),
    outerLoDeletesOnlyFinalOAndRetainsL:
      layeredHuaLoSource
      && truncationFrame.removedMaterial === "ō"
      && /l$/u.test(truncationFrame.retainedStem),
    deletionLayerSelectedByUser: false,
    layeredSourceReconstructedFromFinalLetters: false,
    loDeletesFinalOAndRetainsL:
      suffixFamily === "lō"
      && truncationFrame.removedMaterial === "ō"
      && /l$/u.test(truncationFrame.retainedStem),
    oOrOHuaDeletesCompleteNonactiveMaterial:
      ["ō", "ō-hua", "o-hua"].includes(suffixFamily)
      && ["ō", "ō-hua", "o-hua"].includes(
        truncationFrame.removedMaterial
      ),
    rootPlusYaBoundaryAvailable,
    rootPlusYaRealizationOptions: Object.freeze([]),
    selectedRootPlusYaRealization: rootPlusYaBoundaryAvailable
      ? "already-derived-by-vnc-owner"
      : "not-applicable",
    rootPlusYaDeletionApplied:
      capture.rootPlusYaRemovalAlreadyAppliedByVncOwner === true,
    rootPlusYaRemovalAlreadyAppliedByVncOwner:
      capture.rootPlusYaRemovalAlreadyAppliedByVncOwner === true,
    rootPlusYaChoiceDerivedFromTypedBoundary:
      rootPlusYaBoundaryAvailable,
    visibleFinalLettersAloneAuthorizeRootPlusYaChoice: false,
    duplicatePatientiveRootPlusYaChoiceExposed: false,
    sourceFormationAuthority,
    sourceRuleId,
    sourceVowelRuleId,
    typedIrregularNonactiveRealizationPreserved: Boolean(
      sourceFormationAuthority
      && !["productive-rule", "productive-lexical-class-rule"]
        .includes(sourceFormationAuthority)
    ),
    compositionalPatientiveReadingAlwaysAvailable: true,
    lexicalReadingRequiresTypedSourceOrContext: true,
    lexicalMeaningSelectedBySuffixShape: false,
    exampleStemMembershipRequired: false,
    copiedResultAccepted: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

function buildImpersonalPatientiveInternalObjectFrame({
  capture = null,
  fallbackObjectPattern = "none",
  sourceSubject = "3sg",
  humanProjectiveCarrier = "",
  projectiveCarrierOverride = "",
} = {}) {
  const reflexiveReciprocalAncestryKind = normalizeKey(
    capture?.reflexiveReciprocalAncestryKind
  );
  const projectiveObjectEvidence = Array.from(
    capture?.retainedProjectiveObjectEvidence || []
  ).sort((left, right) => (
    Number(left?.derivationalLevel || 0)
    - Number(right?.derivationalLevel || 0)
  ));
  const projectiveCarriers = projectiveObjectEvidence
    .map(item => {
      const objectKind = normalizeKey(item?.objectKind);
      if (["tla", "tē"].includes(projectiveCarrierOverride)) {
        return projectiveCarrierOverride;
      }
      if (
        objectKind === "nonspecific-human"
        && ["tla", "tē"].includes(humanProjectiveCarrier)
      ) {
        return humanProjectiveCarrier;
      }
      return normalizeStem(item?.carrier) || ({
        "nonspecific-human": "tē",
        "nonspecific-nonhuman": "tla",
      })[objectKind] || "";
    })
    .filter(Boolean);
  const carriers = reflexiveReciprocalAncestryKind
    ? ["ne", ...projectiveCarriers]
    : projectiveCarriers.length
      ? projectiveCarriers
      : [["tla", "tē"].includes(projectiveCarrierOverride)
        ? projectiveCarrierOverride
        : internalObjectPrefix(
          fallbackObjectPattern,
          sourceSubject,
          true
        )].filter(Boolean);
  return deepFreeze({
    kind:
      "classical-nahuatl-lesson38-impersonal-patientive-object-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    reflexiveReciprocalAncestryKind,
    shuntlineNeInheritedAutomatically: Boolean(
      reflexiveReciprocalAncestryKind
    ),
    projectiveObjectEvidence,
    humanProjectiveCarrier: ["tla", "tē"].includes(
      humanProjectiveCarrier
    ) ? humanProjectiveCarrier : "",
    humanProjectiveCarrierDerivedFromTypedSource:
      ["tla", "tē"].includes(humanProjectiveCarrier),
    projectiveCarrierOverride: ["tla", "tē"].includes(
      projectiveCarrierOverride
    ) ? projectiveCarrierOverride : "",
    projectiveCarrierOverrideLicensedByTypedContrast:
      ["tla", "tē"].includes(projectiveCarrierOverride),
    projectiveObjectsPreserved: projectiveObjectEvidence.length > 0,
    carrierSequence: Object.freeze(carriers),
    nonspecificNonhumanPatientCarrierPreserved:
      carriers.includes("tla"),
    nonspecificHumanRecipientCarrierPreserved:
      carriers.includes("tē"),
    directPatientCarrier: carriers.includes("tla") ? "tla" : "",
    directPatientCarrierPosition: carriers.includes("tla")
      ? carriers.indexOf("tla") === 0
        ? "mainline"
        : "shuntline-after-human-recipient"
      : "not-applicable",
    manualNeInsertionAccepted: false,
    carrierSequenceSelectedByUser: false,
    objectTopologyReconstructedFromNounstemSurface: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

function buildImpersonalProjectivePatientiveFrame({
  sourceFrame = null,
  objectFrame = null,
  truncationFrame = null,
  targetStem = "",
} = {}) {
  const capture = sourceFrame?.impersonalPatientiveVncCaptureFrame || null;
  if (
    !capture
    || capture.activeSourceValence === "projective-human"
    || !objectFrame?.carrierSequence?.includes("tla")
  ) return null;
  const carrierSequence = objectFrame.carrierSequence;
  const hasHumanRecipient = carrierSequence.includes("tē");
  const suffixFamily = normalizeKey(truncationFrame?.typedSuffixFamily);
  return deepFreeze({
    kind:
      "classical-nahuatl-lesson38-projective-impersonal-patientive-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    canonicalImpersonalVncResult: capture.canonicalVncResult,
    exactImpersonalVncResultIdentityPreserved:
      capture.canonicalVncResult === sourceFrame.canonicalVncResult,
    activeSourceStem: capture.activeSourceStem,
    impersonalSourceStem: truncationFrame.sourceStem,
    patientiveTargetStem: normalizeStem(targetStem),
    typedSuffixFamily: suffixFamily,
    activeSourceValence: capture.activeSourceValence,
    activeObjectTopologyPreserved: capture.activeObjectTopologyPreserved,
    retainedProjectiveObjectEvidence: objectFrame.projectiveObjectEvidence,
    carrierSequence,
    directPatientCarrier: "tla",
    directPatientCarrierPosition: hasHumanRecipient
      ? "shuntline-after-human-recipient"
      : "mainline",
    nonhumanDirectObjectRequired: true,
    nonhumanDirectObjectPreserved: true,
    patientiveSubjectReferentAnimacy: "nonhuman",
    humanRecipientCarrier: hasHumanRecipient ? "tē" : "",
    humanRecipientPreserved: hasHumanRecipient,
    singleObjectProjectivePattern: !hasHumanRecipient,
    doubleObjectTeTlaPattern: hasHumanRecipient,
    loDeletesFinalOAndRetainsL:
      suffixFamily === "lō"
      && truncationFrame.removedMaterial === "ō"
      && /l$/u.test(truncationFrame.retainedStem),
    oDeletesCompleteNonactiveSuffix:
      ["ō", "ō-hua", "o-hua"].includes(suffixFamily)
      && ["ō", "ō-hua", "o-hua"].includes(
        truncationFrame.removedMaterial
      ),
    huaDeletesCompleteNonactiveSuffix:
      suffixFamily === "hua"
      && truncationFrame.removedMaterial === "hua",
    activeSourceFinalVowel: truncationFrame.activeSourceFinalVowel,
    precedingVowel: truncationFrame.precedingVowel,
    precedingVowelBehavior: truncationFrame.precedingVowelBehavior,
    activeLongVowelPreserved:
      truncationFrame.precedingVowelBehavior
        === "active-source-long-vowel-preserved",
    activeFinalAReplacedByShortI:
      truncationFrame.precedingVowelBehavior
        === "active-final-a-replaced-by-short-i",
    objectPlacementSelectedByUser: false,
    vowelBehaviorSelectedByUser: false,
    objectTopologyReconstructedFromSurface: false,
    compositionalPatientReadingAlwaysAvailable: true,
    lexicalReadingRequiresTypedSourceOrContext: true,
    lexicalMeaningSelectedBySuffixShape: false,
    exampleStemMembershipRequired: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

function buildImpersonalHumanSourcePatientiveFrame({
  sourceFrame = null,
  objectFrame = null,
  truncationFrame = null,
  targetStem = "",
  exceptionalHumanPrefixRetention = false,
  selectedContrastReading = "",
} = {}) {
  const capture = sourceFrame?.impersonalPatientiveVncCaptureFrame || null;
  if (
    !capture
    || capture.activeSourceValence !== "projective-human"
    || capture.reflexiveReciprocalAncestryKind
  ) return null;
  const suffixFamily = normalizeKey(truncationFrame?.typedSuffixFamily);
  const exceptional = exceptionalHumanPrefixRetention === true;
  const anomalousNonhuman = normalizeKey(selectedContrastReading)
    === "anomalous-nonhuman-te";
  const expectedCarrier = exceptional || anomalousNonhuman ? "tē" : "tla";
  return deepFreeze({
    kind:
      "classical-nahuatl-lesson38-human-source-impersonal-patientive-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    canonicalImpersonalVncResult: capture.canonicalVncResult,
    exactImpersonalVncResultIdentityPreserved:
      capture.canonicalVncResult === sourceFrame.canonicalVncResult,
    activeSourceStem: capture.activeSourceStem,
    activeSourceValence: capture.activeSourceValence,
    activeHumanObjectCarrier: capture.activeHumanObjectCarrier || "tē",
    activeHumanObjectReferent: "human",
    voiceOperationSequence: capture.voiceOperationSequence,
    passivePatientPromotionApplied:
      capture.passivePatientPromotionApplied === true,
    passivePatientSubjectThenDeletedByImpersonalization:
      capture.passivePatientSubjectThenDeletedByImpersonalization === true,
    directImpersonalizationOfActiveBlocked:
      capture.directImpersonalizationOfActiveBlocked === true,
    impersonalizedPassiveStem:
      capture.impersonalizedPassiveStem || truncationFrame.sourceStem,
    patientiveTargetStem: normalizeStem(targetStem),
    typedSuffixFamily: suffixFamily,
    patientiveCarrier: expectedCarrier,
    carrierSequence: objectFrame?.carrierSequence || Object.freeze([]),
    regularHumanSourceTlaCarrier: !exceptional && !anomalousNonhuman,
    exceptionalHumanTeRetention: exceptional,
    exceptionalRetentionLicensedByTypedLexicalSource: exceptional,
    anomalousNonhumanTePatientive: anomalousNonhuman,
    selectedContrastReading: normalizeKey(selectedContrastReading),
    patientiveSubjectReferentAnimacy:
      anomalousNonhuman ? "nonhuman" : "human",
    passivePatientiveAnalysisRemainsDistinct: true,
    homonymousNonhumanTlaPatientiveRequiresDifferentTypedSource: true,
    loDeletesFinalOAndRetainsL:
      suffixFamily === "lō"
      && truncationFrame.removedMaterial === "ō"
      && /l$/u.test(truncationFrame.retainedStem),
    oDeletesCompleteNonactiveSuffix:
      ["ō", "ō-hua", "o-hua"].includes(suffixFamily)
      && ["ō", "ō-hua", "o-hua"].includes(
        truncationFrame.removedMaterial
      ),
    huaDeletesCompleteNonactiveSuffix:
      suffixFamily === "hua"
      && truncationFrame.removedMaterial === "hua",
    activeSourceFinalVowel: truncationFrame.activeSourceFinalVowel,
    precedingVowel: truncationFrame.precedingVowel,
    precedingVowelBehavior: truncationFrame.precedingVowelBehavior,
    compositionalHumanPatientReadingAlwaysAvailable: true,
    lexicalReadingRequiresTypedSourceOrContext: true,
    lexicalMeaningSelectedBySuffixShape: false,
    exampleStemMembershipRequired: false,
    carrierSelectedByUser: false,
    voicePathSelectedByUser: false,
    referentSelectedByUser: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

function buildPatientiveHumanNonhumanContrastFrame({
  sourceFrame = null,
  objectFrame = null,
  targetStem = "",
  sourceFamily = "",
  selectedReading = "",
  contrastInventory = null,
  passivePatientiveFamilyFrame = null,
} = {}) {
  const impersonalCapture =
    sourceFrame?.impersonalPatientiveVncCaptureFrame || null;
  const passiveCapture = sourceFrame?.passivePatientiveVncCaptureFrame || null;
  const doubleObjectPassive = Boolean(
    sourceFamily === "passive-core"
    && passiveCapture?.activeSourceValence === "multiple-object"
    && passiveCapture?.retainedObjectEvidence?.some(item => (
      normalizeKey(item?.objectKind) === "nonspecific-human"
    ))
  );
  const contrastApplies = contrastInventory?.authorizationStatus
    === "authorized";
  if (!contrastApplies && !doubleObjectPassive) return null;
  const resolvedReading = normalizeKey(selectedReading)
    || (doubleObjectPassive
      ? "double-object-passive-nonhuman-theme"
      : contrastInventory?.automaticReading || "");
  const anomalous = resolvedReading === "anomalous-nonhuman-te";
  const regularHuman = resolvedReading === "regular-human-tla";
  const patientiveCarrier = objectFrame?.carrierSequence?.[0]
    || passivePatientiveFamilyFrame?.doubleObjectPassivePatientiveFrame
      ?.retainedObjectCarrier
    || (anomalous ? "tē" : regularHuman ? "tla" : "");
  return deepFreeze({
    kind:
      "classical-nahuatl-lesson38-patientive-human-nonhuman-contrast-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    canonicalVncResult:
      impersonalCapture?.canonicalVncResult
      || passiveCapture?.canonicalVncResult
      || null,
    activeSourceStem:
      impersonalCapture?.activeSourceStem
      || passiveCapture?.activeSourceStem
      || "",
    activeSourceValence:
      impersonalCapture?.activeSourceValence
      || passiveCapture?.activeSourceValence
      || sourceFrame?.sourceValence
      || "",
    sourceFamily,
    sourceObjectTopology: doubleObjectPassive
      ? "double-object-passive"
      : "single-object-impersonalized-passive",
    selectedReading: resolvedReading,
    patientiveCarrier,
    patientiveReferent: anomalous || doubleObjectPassive
      ? "nonhuman-or-abstract"
      : "human",
    regularHumanTla: regularHuman,
    anomalousNonhumanTe: anomalous,
    doubleObjectPassiveNonhumanTheme: doubleObjectPassive,
    choiceRequired: contrastInventory?.choiceRequired === true,
    choiceDerivedFromTypedSource:
      contrastInventory?.choiceRequired !== true,
    patientiveTargetStem: normalizeStem(targetStem),
    sourceValenceAndObjectTopologyDecideBeforePrefixShape: true,
    teAndTlaDoNotIndependentlyDecideTransitivityOrReferent: true,
    examplesAuthorizeRoute: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

function buildPatientiveActiveActionContrastFrame({
  sourceFrame = null,
  targetStem = "",
  sourceFamily = "",
} = {}) {
  return deepFreeze({
    kind:
      "classical-nahuatl-lesson38-patientive-active-action-contrast-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    patientiveConstruction: "patientive",
    activeActionConstruction: "deverbal-action:active-action",
    patientiveSourceFamily: sourceFamily,
    patientiveSourceStage: sourceFrame?.sourceStage || "",
    patientiveTargetStem: normalizeStem(targetStem),
    constructionsRemainDistinct: true,
    canonicalResultsRemainDistinct: true,
    englishTranslationMayOverlap: true,
    sharedEnglishTranslationMergesAnalyses: false,
    translationAuthorizesAnalysis: false,
    userSelectsAnalysisOnlyWhenTypedContextLeavesRealAmbiguity: true,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

function buildCompoundSourcePatientiveFrame({
  sourceFrame = null,
  targetStem = "",
  sourceFamily = "",
  relation = "",
} = {}) {
  const capture = sourceFrame?.compoundVncSourceFrame || null;
  if (!capture) return null;
  const selectedRelation = normalizeKey(relation);
  return deepFreeze({
    kind: "classical-nahuatl-lesson38-compound-source-patientive-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    canonicalVncResult: capture.canonicalVncResult,
    canonicalVncSourceAnalysisFrame:
      capture.canonicalVncSourceAnalysisFrame,
    canonicalSourceSelectionFrame:
      capture.canonicalSourceSelectionFrame,
    exactResultIdentityPreserved: true,
    exactSourceAnalysisIdentityPreserved: true,
    activeCompoundStem: capture.activeCompoundStem,
    embedStem: capture.embedStem,
    matrixStem: capture.matrixStem,
    sourceConstituentOrder: capture.sourceConstituentOrder,
    sourceFamily,
    relationOptions: capture.relationOptions,
    selectedRelation,
    patientiveTargetStem: normalizeStem(targetStem),
    nahuatlOrder: "embed-before-matrix",
    englishReadingOrder: selectedRelation === "incorporated-object"
      ? "matrix-before-embed"
      : "embed-before-matrix",
    englishReversalIsReadingOnly:
      selectedRelation === "incorporated-object",
    constituentOrderSelectedByUser: false,
    relationIsGenuineUserChoice: true,
    compoundReconstructedFromSurface: false,
    examplesAuthorizeRoute: false,
    grammarAuthority: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

function buildPerfectivePatientiveFrame({
  sourceFrame = null,
  targetStem = "",
  analogy = "",
  final = "",
  realizedObjectPattern = "none",
} = {}) {
  const capture = sourceFrame?.perfectivePatientiveVncCaptureFrame || null;
  if (!capture) return null;
  const selectedAnalogy = normalizeKey(analogy);
  const passiveAvailable = sourceFrame.sourceValence !== "intransitive";
  const analogyOptions = passiveAvailable
    ? ["impersonal", "passive"]
    : ["impersonal"];
  const lexicalOwnerhoodFact =
    PERFECTIVE_PATIENTIVE_OWNERHOOD_FACTS[capture.sourceStem]
    || null;
  return deepFreeze({
    kind: "classical-nahuatl-lesson39-perfective-patientive-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    canonicalActivePreteritVncResult: capture.canonicalVncResult,
    canonicalVncSourceAnalysisFrame:
      capture.canonicalVncSourceAnalysisFrame,
    canonicalVncTypedSlotFrame: capture.canonicalVncTypedSlotFrame,
    exactActivePreteritResultIdentityPreserved: true,
    completeTypedSourceAnalysisPreserved:
      capture.completeTypedSourceAnalysisPreserved,
    lexicalSourceStem: capture.lexicalSourceStem,
    perfectivePredicateStem: capture.sourceStem,
    perfectiveFinalEdge: final,
    licensedPerfectiveFinalEdges: PERFECTIVE_PATIENTIVE_FINALS,
    perfectiveShapeLicensedAutomatically:
      PERFECTIVE_PATIENTIVE_FINALS.includes(final),
    selectedAnalogy,
    analogyOptions: Object.freeze(analogyOptions),
    passiveAnalogyAvailable: passiveAvailable,
    analogyIsGenuineUserChoice: analogyOptions.length > 1,
    sourceValence: sourceFrame.sourceValence,
    sourceObjectPattern: sourceFrame.sourceObjectPattern,
    realizedObjectPattern,
    patientiveTargetStem: normalizeStem(targetStem),
    nounClass: "tli",
    sourceIsCompound: sourceFrame.sourceIsCompound,
    compoundVncSourceFrame: capture.compoundVncSourceFrame,
    lexicalOwnerhoodFact,
    lexicalFactAuthorizesOnlyNarrowReading: Boolean(
      lexicalOwnerhoodFact
    ),
    unlistedCompatibleSourceRemainsProductive: true,
    exampleIdentityAuthorizesProductiveRoute: false,
    copiedResultAccepted: false,
    rawPerfectiveLookingStemAccepted: false,
    shapeSelectsLexicalMeaning: false,
    grammarAuthority: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

function resolveImperfectivePatientiveStem(capture = null) {
  const sourceStem = normalizeStem(capture?.sourceStem);
  const verbClass = normalizeToken(capture?.verbClass).toUpperCase();
  if (!sourceStem) {
    return { stem: "", rule: "", blockReason: "typed-imperfective-predicate-stem-required" };
  }
  if (verbClass === "C") {
    const stem = sourceStem
      .replace(/-o-ā$/u, "-ō")
      .replace(/-i-ā$/u, "-ī")
      .replace(/o-ā$/u, "ō")
      .replace(/i-ā$/u, "ī");
    if (!/[ōī]$/u.test(stem)) {
      return {
        stem: "",
        rule: "class-c-truncated-final-long-o-or-i",
        blockReason:
          "39.2-class-c-truncated-imperfective-shape-required",
      };
    }
    return {
      stem,
      rule: "class-c-truncated-final-long-o-or-i",
      blockReason: "",
    };
  }
  if (verbClass === "D") {
    return {
      stem: /ā$/u.test(sourceStem)
        ? sourceStem
        : sourceStem.replace(/a$/u, "ā"),
      rule: "class-d-final-long-a",
      blockReason: /[aā]$/u.test(sourceStem)
        ? ""
        : "39.2-class-d-final-long-a-required",
    };
  }
  return {
    stem: sourceStem,
    rule: "class-a-or-b-full-imperfective-stem",
    blockReason: "",
  };
}

function buildImperfectivePatientiveFrame({
  sourceFrame = null,
  targetStem = "",
  analogy = "",
  realizedObjectPattern = "none",
  shapeRule = "",
} = {}) {
  const capture = sourceFrame?.imperfectivePatientiveVncCaptureFrame || null;
  if (!capture) return null;
  const passiveAvailable = sourceFrame.sourceValence !== "intransitive";
  const analogyOptions = passiveAvailable
    ? ["impersonal", "passive"]
    : ["impersonal"];
  return deepFreeze({
    kind: "classical-nahuatl-lesson39-imperfective-patientive-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    canonicalActivePresentVncResult: capture.canonicalVncResult,
    canonicalVncSourceAnalysisFrame:
      capture.canonicalVncSourceAnalysisFrame,
    canonicalVncTypedSlotFrame: capture.canonicalVncTypedSlotFrame,
    exactActivePresentResultIdentityPreserved: true,
    completeTypedSourceAnalysisPreserved:
      capture.completeTypedSourceAnalysisPreserved,
    lexicalSourceStem: capture.lexicalSourceStem,
    imperfectivePredicateStem: capture.sourceStem,
    verbClass: capture.verbClass,
    selectedShapeRule: shapeRule,
    classCUsesTruncatedFinalLongOOrI:
      capture.verbClass === "C",
    classDUsesFinalLongA: capture.verbClass === "D",
    sourceShapeRuleDerivedAutomatically: true,
    selectedAnalogy: normalizeKey(analogy),
    analogyOptions: Object.freeze(analogyOptions),
    passiveAnalogyAvailable: passiveAvailable,
    analogyIsGenuineUserChoice: analogyOptions.length > 1,
    sourceValence: sourceFrame.sourceValence,
    sourceObjectPattern: sourceFrame.sourceObjectPattern,
    realizedObjectPattern,
    patientiveTargetStem: normalizeStem(targetStem),
    nounClass: "tl",
    sourceIsCompound: sourceFrame.sourceIsCompound,
    compoundVncSourceFrame: capture.compoundVncSourceFrame,
    unlistedCompatibleSourceRemainsProductive: true,
    exampleIdentityAuthorizesProductiveRoute: false,
    copiedResultAccepted: false,
    rawImperfectiveLookingStemAccepted: false,
    shapeSelectsLexicalMeaning: false,
    grammarAuthority: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

function buildImperfectiveImpersonalPatientiveFrame({
  sourceFrame = null,
  targetStem = "",
  realizedObjectPattern = "none",
} = {}) {
  const capture = sourceFrame?.imperfectivePatientiveVncCaptureFrame || null;
  if (!capture) return null;
  const carrierSequence = Object.freeze(({
    "nonspecific-human": ["tē"],
    "nonspecific-nonhuman": ["tla"],
    "human-and-nonhuman": ["tē", "tla"],
    reflexive: ["ne"],
    reciprocal: ["ne"],
  })[realizedObjectPattern] || []);
  const normalizedTargetStem = normalizeStem(targetStem);
  const lexicalReadingFact =
    IMPERFECTIVE_PATIENTIVE_READING_FACTS[normalizedTargetStem]
    || IMPERFECTIVE_PATIENTIVE_READING_FACTS[capture.lexicalSourceStem]
    || null;
  return deepFreeze({
    kind:
      "classical-nahuatl-lesson39-imperfective-impersonal-patientive-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    canonicalActivePresentVncResult: capture.canonicalVncResult,
    canonicalVncSourceAnalysisFrame:
      capture.canonicalVncSourceAnalysisFrame,
    canonicalVncTypedSlotFrame: capture.canonicalVncTypedSlotFrame,
    exactActivePresentResultIdentityPreserved: true,
    completeTypedSourceAnalysisPreserved:
      capture.completeTypedSourceAnalysisPreserved,
    selectedModel: "impersonal",
    transitiveAndIntransitiveSourcesAllowed: true,
    lexicalSourceStem: capture.lexicalSourceStem,
    imperfectiveSourceStem: capture.sourceStem,
    sourceValence: sourceFrame.sourceValence,
    sourceObjectPattern: sourceFrame.sourceObjectPattern,
    realizedObjectPattern,
    carrierSequence,
    carrierSequenceDerivedFromTypedParticipants: true,
    projectiveObjectsPreserved:
      realizedObjectPattern !== "none",
    reflexiveOrReciprocalNePreserved:
      ["reflexive", "reciprocal"].includes(realizedObjectPattern),
    patientiveTargetStem: normalizedTargetStem,
    visibleCarrierDeterminesSourceValence: false,
    visibleCarrierDeterminesReferentIdentity: false,
    lexicalReadingFact,
    lexicalFactAuthorizesOnlyNarrowReading: Boolean(lexicalReadingFact),
    compositionalReadingRemainsAvailable: true,
    affectiveContinuationIsSeparateOperation:
      lexicalReadingFact?.frequentContinuation === "affective-tzin",
    sourceHistoryPreserved:
      lexicalReadingFact?.sourceHistory || Object.freeze([]),
    sourceHistoryInferredFromVisiblePrefix: false,
    unlistedCompatibleSourceRemainsProductive: true,
    exampleIdentityAuthorizesProductiveRoute: false,
    shapeSelectsLexicalMeaning: false,
    copiedResultAccepted: false,
    rawImperfectiveLookingStemAccepted: false,
    grammarAuthority: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

function buildImpersonalReflexivePatientiveFrame({
  sourceFrame = null,
  objectFrame = null,
  targetStem = "",
} = {}) {
  const capture = sourceFrame?.impersonalPatientiveVncCaptureFrame || null;
  if (!capture?.reflexiveReciprocalAncestryKind || !objectFrame) return null;
  const projectiveObjectDisambiguates =
    objectFrame.projectiveObjectEvidence.length > 0;
  return deepFreeze({
    kind:
      "classical-nahuatl-lesson38-reflexive-impersonal-patientive-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    canonicalImpersonalVncResult: capture.canonicalVncResult,
    exactImpersonalVncResultIdentityPreserved:
      capture.canonicalVncResult === sourceFrame.canonicalVncResult,
    sourceVoice: "impersonal",
    activeSourceValence: capture.activeSourceValence,
    activeReflexiveOrReciprocalAncestry:
      capture.reflexiveReciprocalAncestryKind,
    activeObjectTopologyPreserved: capture.activeObjectTopologyPreserved,
    shuntlineReflexiveReciprocalCarrier: "ne",
    shuntlineNeInheritedAutomatically:
      objectFrame.shuntlineNeInheritedAutomatically,
    retainedProjectiveObjectEvidence:
      objectFrame.projectiveObjectEvidence,
    projectiveObjectsPreserved: objectFrame.projectiveObjectsPreserved,
    carrierSequence: objectFrame.carrierSequence,
    patientiveTargetStem: normalizeStem(targetStem),
    projectiveObjectDisambiguatesPassiveFromImpersonal:
      projectiveObjectDisambiguates,
    passiveImpersonalSurfaceOverlapPossible:
      !projectiveObjectDisambiguates,
    passiveAndImpersonalAnalysesRemainDistinct: true,
    genuineSourceAmbiguityPreserved: !projectiveObjectDisambiguates,
    analysisChoiceOnlyWhenExactSourceRemainsAmbiguous: true,
    manualNeInsertionAccepted: false,
    reflexivityReconstructedFromNounstemSurface: false,
    copiedResultAccepted: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

function captureCharacteristicPatientiveNncResult(
  result = null,
  target = globalThis
) {
  const canonicalNncGrammarFrame = typeof target
    ?.isClassicalNahuatlDeverbalNncGrammarFrame === "function"
    && target.isClassicalNahuatlDeverbalNncGrammarFrame(result)
    && result?.canonicalResult?.authorizationStatus === "authorized"
    ? result
    : null;
  const canonicalNncResult = canonicalNncGrammarFrame?.canonicalResult
    || result;
  const predicateNominalizationContext =
    PREDICATE_NNC_CONTINUATION_CONTEXTS.get(canonicalNncResult) || null;
  const applicationProjection = typeof target
    ?.getClassicalNahuatlNncContinuationSourceConstituents === "function"
    ? target.getClassicalNahuatlNncContinuationSourceConstituents(
      canonicalNncResult
    )
    : null;
  const internalProjection = predicateNominalizationContext
    && ISSUED_NNC_SLOT_FRAMES.has(canonicalNncResult?.nncSlotFrame)
    && canonicalNncResult?.authorizationStatus === "authorized"
    ? deepFreeze({
      kind:
        "classical-nahuatl-deverbal-nnc-result-source-constituent-projection",
      version: VERSION,
      nncType: "deverbal-predicate-nominalization",
      canonicalResultFrame: canonicalNncResult,
      canonicalSourceFrame: predicateNominalizationContext.sourceFrame,
      canonicalOperationFrame:
        predicateNominalizationContext.operationFrame,
      typedSlotFrame: canonicalNncResult.nncSlotFrame,
      sourceIdentityStem:
        predicateNominalizationContext.sourceFrame?.sourceStem || "",
      predicateStem:
        canonicalNncResult.nncSlotFrame?.slots?.predicate?.stem || "",
      state: canonicalNncResult.state || "absolutive",
      possessor: canonicalNncResult.possessor || "",
      projectionRole: "read-only-source-constituents",
      grammarAuthority: false,
      callerSuppliedAuthorityAccepted: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    })
    : null;
  const projection = applicationProjection || internalProjection;
  if (
    !projection
    || (
      projection.nncType !== "ordinary"
      && projection.nncType !== "deverbal-predicate-nominalization"
    )
  ) {
    return deepFreeze({
      kind:
        "classical-nahuatl-characteristic-patientive-nnc-capture-frame",
      version: VERSION,
      authorizationStatus: "blocked",
      blockReason:
        "exact-owner-issued-ordinary-nnc-result-required-for-characteristic-patientive",
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
  }
  const predicateNominalizationKind = normalizeKey(
    predicateNominalizationContext?.operationFrame?.nominalizationKind
  );
  const preteritAgentiveSource =
    predicateNominalizationKind === "preterit-agentive";
  const characteristicEmbedStem = preteritAgentiveSource
    ? normalizeStem(
      predicateNominalizationContext.operationFrame
        ?.targetStems?.generalUse
    )
    : normalizeStem(projection.predicateStem);
  if (!characteristicEmbedStem) {
    return deepFreeze({
      kind:
        "classical-nahuatl-characteristic-patientive-nnc-capture-frame",
      version: VERSION,
      authorizationStatus: "blocked",
      blockReason: preteritAgentiveSource
        ? "typed-preterit-agentive-general-use-stem-required"
        : "typed-ordinary-nnc-predicate-stem-required",
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
  }
  const frame = deepFreeze({
    kind:
      "classical-nahuatl-characteristic-patientive-nnc-capture-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    blockReason: "",
    canonicalNncGrammarFrame,
    canonicalNncResult,
    continuationProjection: projection,
    canonicalNncSourceFrame: projection.canonicalSourceFrame,
    canonicalNncOperationFrame: projection.canonicalOperationFrame,
    canonicalNncTypedSlotFrame: projection.typedSlotFrame,
    sourceUnit: "owner-issued-ordinary-nnc-result",
    sourceStage: "nounstem-embed",
    sourceStem: normalizeStem(projection.sourceIdentityStem),
    predicateStem: normalizeStem(projection.predicateStem),
    characteristicEmbedStem,
    predicateNominalizationKind,
    predicateNominalizationSourceFrame:
      predicateNominalizationContext?.sourceFrame || null,
    predicateNominalizationOperationFrame:
      predicateNominalizationContext?.operationFrame || null,
    preteritAgentiveSource,
    preteritAgentiveRestrictedUseStem: preteritAgentiveSource
      ? normalizeStem(
        predicateNominalizationContext.operationFrame
          ?.targetStems?.restrictedUse
      )
      : "",
    preteritAgentiveGeneralUseStem: preteritAgentiveSource
      ? characteristicEmbedStem
      : "",
    sourceNounClass: normalizeNounClass(projection.sourceNounClass),
    sourceUseShape: normalizeKey(projection.sourceUseShape),
    sourceSubclass: normalizeKey(projection.sourceSubclass),
    sourceReferentialAnimacy:
      normalizeKey(projection.sourceReferentialAnimacy),
    sourceNaturalPossessionPolicy:
      normalizeKey(projection.naturalPossessionPolicy),
    sourceNaturalPossessionSemantics:
      normalizeKey(projection.naturalPossessionSemantics),
    sourceStateAvailability:
      normalizeKey(projection.stateAvailability),
    sourceAllowedStateValues: projection.allowedStateValues,
    sourcePossessorCompatibility:
      normalizeKey(projection.possessorCompatibility),
    sourceState: normalizeKey(projection.state),
    sourcePossessor: normalizeKey(projection.possessor),
    sourceConstituentKinds: projection.sourceConstituentKinds,
    sourceConstituents: projection.sourceConstituents,
    exactResultIdentityPreserved: true,
    exactSourceAndOperationIdentityPreserved: true,
    sourceIdentityAndPredicateShapeRemainDistinct: true,
    projectionRole:
      "read-only-owner-issued-nnc-result-to-characteristic-patientive-source",
    grammarAuthority: false,
    callerSuppliedAuthorityAccepted: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
  ISSUED_CHARACTERISTIC_PATIENTIVE_NNC_CAPTURE_FRAMES.add(frame);
  return frame;
}

function isClassicalNahuatlCharacteristicPatientiveNncCaptureFrame(
  frame = null
) {
  return Boolean(
    ISSUED_CHARACTERISTIC_PATIENTIVE_NNC_CAPTURE_FRAMES.has(frame)
    && frame?.kind
      === "classical-nahuatl-characteristic-patientive-nnc-capture-frame"
    && frame.version === VERSION
    && frame.authorizationStatus === "authorized"
    && frame.exactResultIdentityPreserved === true
    && frame.exactSourceAndOperationIdentityPreserved === true
    && frame.grammarAuthority === false
    && frame.callerSuppliedAuthorityAccepted === false
    && frame.formulaStringAuthority === false
    && frame.surfaceStringAuthority === false
    && Object.isFrozen(frame)
  );
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
  })[final];
  if (!assimilated) return joinMorphs([stem, "yō"]);
  return `${stem}-${assimilated}`;
}

function buildCharacteristicOwnerhoodContrastFrame(
  captureFrame = null,
  reading = "",
  lexicalFact = null
) {
  if (!["pertaining-to", "intrinsic-aspect"].includes(reading)) return null;
  const sourceConstituents = Object.freeze([
    ...(captureFrame?.sourceConstituents || []),
  ]);
  const matrixConstituent = normalizeStem(
    sourceConstituents.length > 1
      ? sourceConstituents[sourceConstituents.length - 1]
      : ""
  );
  const embeddedOwnerhoodKind = /(?:^|-)(?:eh|huah)(?:-|$)/u.test(
    matrixConstituent
  )
    ? "ordinary-ownerhood"
    : /(?:^|-)(?:yō|yo)(?:-h)?(?:-|$)/u.test(matrixConstituent)
      ? "abundant-ownerhood"
      : "not-present";
  const attestedReadings = lexicalFact?.attestedReadings
    || (lexicalFact?.attestedReading ? [lexicalFact.attestedReading] : []);
  const lexicalReadings = lexicalFact?.lexicalReadings
    || (lexicalFact?.lexicalReading ? [lexicalFact.lexicalReading] : []);
  const selectedLexicalReadingIndex = attestedReadings.indexOf(reading);
  const selectedLexicalReading = selectedLexicalReadingIndex >= 0
    ? lexicalReadings[selectedLexicalReadingIndex]
      || lexicalReadings[0]
      || ""
    : "";
  return deepFreeze({
    kind:
      "classical-nahuatl-lesson39-characteristic-ownerhood-contrast-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    exactOwnerIssuedOrdinaryNncResultIdentityPreserved: true,
    sourceIdentityStem: captureFrame?.sourceStem || "",
    predicateStem: captureFrame?.predicateStem || "",
    sourceConstituents,
    sourceConstituentKinds: captureFrame?.sourceConstituentKinds || [],
    selectedReading: reading,
    selectedRelation: reading === "pertaining-to"
      ? "thing-pertaining-to-incorporated-nounstem"
      : "thing-intrinsic-to-incorporated-nounstem",
    compositionalReadingOptions: ["pertaining-to", "intrinsic-aspect"],
    readingRelationIsGenuineUserChoice: true,
    sourceShapeAloneSelectsReading: false,
    translationSelectsOrMergesAnalysis: false,
    embeddedOwnerhoodKind,
    embeddedOwnerhoodMatrixConstituent: matrixConstituent,
    embeddedOwnerhoodAnalysisPreserved:
      embeddedOwnerhoodKind !== "not-present",
    outerOwnerhoodKind: "abundant-ownerhood",
    outerOwnerhoodMatrix: "yō-ā",
    outerOwnerhoodRole: "characteristic-patientive-source",
    ordinaryAndAbundantOwnerhoodAnalysesRemainDistinct: true,
    lexicalFact,
    selectedLexicalReading,
    selectedReadingIsAttestedLexicalFact:
      selectedLexicalReadingIndex >= 0,
    lexicalFactAuthorizesOnlyNarrowReading: Boolean(selectedLexicalReading),
    lexicalFactAuthorizesProductiveRoute: false,
    reconstructedHistoryIsReadingEvidenceOnly: Boolean(
      lexicalFact?.reconstructedEmbed
      || lexicalFact?.reconstructedVerbalSource
      || lexicalFact?.verbalSourceHistory
    ),
    traditionalSpellingAuthorizesSourceReanalysis: false,
    comparisonSource: lexicalFact?.comparisonSource || "",
    comparisonReading: lexicalFact?.comparisonReading || "",
    possessiveStateTarget:
      lexicalFact?.possessiveStateTarget || "compound-stem",
    compatibleUnlistedSourceRemainsProductive: true,
    exampleIdentityAuthorizesProductiveRoute: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

function buildOrganicPossessionFrame({
  captureFrame = null,
  request = {},
  targetStem = "",
  lexicalFact = null,
} = {}) {
  const possessor = normalizeKey(request.possessor);
  const subject = normalizeSubject(request.subject || "3common");
  const factNumberOptions = lexicalFact?.possessumNumberOptions || [];
  const possessumNumberOptions = factNumberOptions.length
    ? factNumberOptions
    : subject === "3common"
      ? ["singular", "plural"]
      : [subject.endsWith("pl") ? "plural" : "singular"];
  return deepFreeze({
    kind:
      "classical-nahuatl-lesson39-characteristic-organic-possession-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    exactOwnerIssuedOrdinaryNncResultIdentityPreserved: true,
    canonicalNncResult: captureFrame?.canonicalNncResult || null,
    sourceIdentityStem: captureFrame?.sourceStem || "",
    predicateStem: captureFrame?.predicateStem || "",
    sourceNaturalPossessionPolicy:
      captureFrame?.sourceNaturalPossessionPolicy || "",
    sourceNaturalPossessionSemantics:
      captureFrame?.sourceNaturalPossessionSemantics || "",
    sourceState: captureFrame?.sourceState || "",
    selectedReading: "organic-possession",
    relationSelectionAuthority:
      "explicit-user-selected-organic-possession-reading",
    readingChoiceIsGenuineUserChoice: true,
    resultState: "possessive",
    organicPossessionIsPossessiveOnly: true,
    resultStateDerivedAutomatically: true,
    resultStateSelectedByUser: false,
    possessorRequired: true,
    possessor,
    possessorParticipantRole: "whole",
    possessumSubject: subject,
    possessumParticipantRole:
      "organic-part-segment-appendage-or-integral-product",
    possessumNumberOptions: Object.freeze([...possessumNumberOptions]),
    commonNumberPreservesSingularPluralPossibility:
      subject === "3common",
    possessorIdentifiesWhole: true,
    possessumIdentifiesIntegralPart: true,
    possessorMayBeLivingOrNonliving: true,
    detachmentPossibilityAloneSelectsRelation: false,
    ordinaryPartWholePossessionMayRemainAmbiguous: true,
    formalOrganicAdventitiousContrastIsNotUniversal: true,
    organicTargetStem: normalizeStem(targetStem),
    outerOwnerhoodMatrix: "yō-ā",
    yōShapeAloneAuthorizesOrganicPossession: false,
    bodyPartMeaningAloneAuthorizesOrganicPossession: false,
    sourceShapeSelectsPossessionRelation: false,
    otherCharacteristicReadingMayUseAbsolutiveState: true,
    adventitiousCounterpartUsesNormalNounstem: true,
    lexicalDistributionFact: lexicalFact,
    lexicalFactAuthorizesProductiveRoute: false,
    lexicalDistributionRequiresTypedSourceOrContext: true,
    compatibleUnlistedSourceRemainsProductive: true,
    exampleIdentityAuthorizesProductiveRoute: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

function buildPreteritAgentiveCharacteristicFrame({
  captureFrame = null,
  request = {},
  targetStem = "",
  lexicalFact = null,
} = {}) {
  const resultState = normalizeKey(request.state || "absolutive");
  return deepFreeze({
    kind:
      "classical-nahuatl-lesson39-preterit-agentive-characteristic-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    exactOwnerIssuedPreteritAgentiveNncResultIdentityPreserved: true,
    canonicalNncResult: captureFrame?.canonicalNncResult || null,
    canonicalPredicateNominalizationSourceFrame:
      captureFrame?.predicateNominalizationSourceFrame || null,
    canonicalPredicateNominalizationOperationFrame:
      captureFrame?.predicateNominalizationOperationFrame || null,
    sourceIdentityStem: captureFrame?.sourceStem || "",
    predicateStem: captureFrame?.predicateStem || "",
    embeddedNounstemKind: "general-use-preterit-agentive",
    embeddedRestrictedUseStem:
      captureFrame?.preteritAgentiveRestrictedUseStem || "",
    embeddedGeneralUseStem:
      captureFrame?.preteritAgentiveGeneralUseStem || "",
    matrixNounstem: "yō",
    matrixRole: "characteristic-property",
    targetStem: normalizeStem(targetStem),
    resultState,
    resultStateOptions: Object.freeze(["absolutive", "possessive"]),
    stateChoiceIsGenuineUserChoice: true,
    absolutiveStatePreservesTlConnector: resultState === "absolutive",
    possessiveStateUsesGeneralUseYo: resultState === "possessive",
    lexicalFact,
    compositionalReadings: Object.freeze([
      ...(lexicalFact?.compositionalReadings || [
        "characteristic-of-the-preterit-agentive-referent",
      ]),
    ]),
    lexicalReadings: Object.freeze([
      ...(lexicalFact?.lexicalReadings || []),
    ]),
    lexicalReadingsAreNarrowReadingFactsOnly: true,
    lexicalFactAuthorizesProductiveRoute: false,
    compatibleUnlistedPreteritAgentiveSourcesRemainProductive: true,
    exampleIdentityAuthorizesProductiveRoute: false,
    adventitiousPossessionAnalysisApplies: false,
    organicPossessionAnalysisApplies: false,
    nacaFleshEmbedAnalysisApplies: false,
    initialTōIsPossessorPronoun: false,
    initialTōBelongsToTypedVerbstem:
      Boolean(lexicalFact?.verbalReading),
    spellingAloneAuthorizesPossessionReanalysis: false,
    supplementationPrincipalChoiceBelongsToClauseRelationOwner: true,
    supplementationPrincipalOptions: Object.freeze([
      "preterit-agentive-characteristic-nnc",
      "other-nnc",
    ]),
    principalFirstReading:
      "characteristic-nnc-is-predicated-of-the-other-nnc",
    supplementFirstReading:
      "other-nnc-is-predicated-of-the-characteristic-nnc",
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

function buildPatientiveOperation(
  request = {},
  preparedSourceFrame = null,
  target = globalThis
) {
  const patientiveKind = normalizeKey(request.patientiveKind || "ordinary");
  if (patientiveKind === "characteristic-property") {
    if (!request.canonicalNncResult) {
      return {
        sourceFrame: null,
        operationFrame: null,
        blockReason:
          "exact-owner-issued-ordinary-nnc-result-required-for-characteristic-patientive",
      };
    }
    const captureFrame = captureCharacteristicPatientiveNncResult(
      request.canonicalNncResult,
      target
    );
    if (!isClassicalNahuatlCharacteristicPatientiveNncCaptureFrame(
      captureFrame
    )) {
      return {
        sourceFrame: null,
        operationFrame: null,
        blockReason: captureFrame.blockReason,
      };
    }
    request = {
      ...request,
      source: {
        sourceUnit: captureFrame.sourceUnit,
        sourceStage: captureFrame.sourceStage,
        sourceStem: captureFrame.characteristicEmbedStem,
        verbClass: "",
        sourceVoice: "active",
        sourceValence: "intransitive",
        sourceObjectPattern: "none",
        characteristicPatientiveNncCaptureFrame: captureFrame,
      },
    };
    const sourceFrame = buildSourceFrame(
      request,
      "nounstem-embed",
      preparedSourceFrame
    );
    if (sourceFrame.authorizationStatus !== "authorized") {
      return { sourceFrame, operationFrame: null, blockReason: sourceFrame.blockReason };
    }
    const reading = normalizeKey(request.characteristicReading || "inherent-quality");
    if (!["inherent-quality", "pertaining-to", "intrinsic-aspect", "organic-possession"].includes(reading)) {
      return { sourceFrame, operationFrame: null, blockReason: "39.3-characteristic-reading-required" };
    }
    const deverbalNounstemAxisFrame = buildDeverbalNounstemAxisFrame({
      sourceFrame,
      structuralContractId: "patientive:characteristic-property",
      formationFamily: `patientive:characteristic-property:${reading}`,
      allowedStates: reading === "organic-possession"
        ? ["possessive"]
        : ["absolutive", "possessive"],
    });
    if (deverbalNounstemAxisFrame.authorizationStatus !== "authorized") {
      return {
        sourceFrame,
        operationFrame: null,
        blockReason: deverbalNounstemAxisFrame.blockReason,
      };
    }
    const state = normalizeKey(request.state || "absolutive");
    if (
      captureFrame.preteritAgentiveSource
      && reading === "organic-possession"
    ) {
      return {
        sourceFrame,
        operationFrame: null,
        blockReason:
          "39.3.5-preterit-agentive-characteristic-is-not-possession",
      };
    }
    if (reading === "organic-possession" && state !== "possessive") {
      return { sourceFrame, operationFrame: null, blockReason: "39.3.4-organic-possession-is-possessive-only" };
    }
    const possessor = normalizeKey(request.possessor);
    if (
      reading === "organic-possession"
      && (!possessor || possessor === "none")
    ) {
      return {
        sourceFrame,
        operationFrame: null,
        blockReason: "39.3.4-organic-possession-requires-typed-possessor-whole",
      };
    }
    const lexicalReadingFact =
      CHARACTERISTIC_PATIENTIVE_READING_FACTS[
        captureFrame.sourceStem
      ]
      || CHARACTERISTIC_PATIENTIVE_READING_FACTS[
        captureFrame.characteristicEmbedStem
      ]
      || null;
    const ownerhoodContrastFact =
      CHARACTERISTIC_OWNERHOOD_CONTRAST_FACTS[
        captureFrame.sourceStem
      ]
      || CHARACTERISTIC_OWNERHOOD_CONTRAST_FACTS[
        captureFrame.characteristicEmbedStem
      ]
      || null;
    const organicPossessionFact =
      ORGANIC_POSSESSION_READING_FACTS[captureFrame.sourceStem]
      || ORGANIC_POSSESSION_READING_FACTS[
        captureFrame.characteristicEmbedStem
      ]
      || null;
    const predicateNominalizationSourceStem = normalizeStem(
      captureFrame.predicateNominalizationSourceFrame?.sourceStem
    );
    const preteritAgentiveCharacteristicFact =
      PRETERIT_AGENTIVE_CHARACTERISTIC_READING_FACTS[
        predicateNominalizationSourceStem
      ] || null;
    const targetEmbedStem = ownerhoodContrastFact?.targetEmbedStem
      || sourceFrame.sourceStem;
    const targetStem = lexicalReadingFact?.assimilationException
      ? joinMorphs([targetEmbedStem, "yō"])
      : assimilateCharacteristicYō(targetEmbedStem);
    const generalUseStem = targetStem.replace(/ō$/u, "o");
    const ownerhoodContrastFrame =
      buildCharacteristicOwnerhoodContrastFrame(
        captureFrame,
        reading,
        ownerhoodContrastFact
      );
    const organicPossessionFrame = reading === "organic-possession"
      ? buildOrganicPossessionFrame({
        captureFrame,
        request,
        targetStem,
        lexicalFact: organicPossessionFact,
      })
      : null;
    const preteritAgentiveCharacteristicFrame =
      captureFrame.preteritAgentiveSource
        ? buildPreteritAgentiveCharacteristicFrame({
          captureFrame,
          request,
          targetStem,
          lexicalFact: preteritAgentiveCharacteristicFact,
        })
        : null;
    const foundationFrame = deepFreeze({
      kind:
        "classical-nahuatl-lesson39-characteristic-patientive-foundation-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      canonicalNncResult: captureFrame.canonicalNncResult,
      exactOwnerIssuedOrdinaryNncResultIdentityPreserved:
        captureFrame.canonicalNncResult === request.canonicalNncResult,
      canonicalNncSourceFrame: captureFrame.canonicalNncSourceFrame,
      canonicalNncOperationFrame: captureFrame.canonicalNncOperationFrame,
      canonicalNncTypedSlotFrame: captureFrame.canonicalNncTypedSlotFrame,
      sourceIdentityStem: captureFrame.sourceStem,
      predicateStem: captureFrame.predicateStem,
      characteristicEmbedStem: captureFrame.characteristicEmbedStem,
      sourceIdentityAndPredicateShapeRemainDistinct: true,
      sourceNounClass: captureFrame.sourceNounClass,
      sourceUseShape: captureFrame.sourceUseShape,
      sourceSubclass: captureFrame.sourceSubclass,
      sourceState: captureFrame.sourceState,
      sourcePossessor: captureFrame.sourcePossessor,
      sourceConstituentKinds: captureFrame.sourceConstituentKinds,
      sourceConstituents: captureFrame.sourceConstituents,
      abundantOwnerhoodMatrix: "tla-(-yo-ā)",
      matrixStem: "yō-ā",
      incorporatedRole: "nonhuman-object",
      compoundSourcePath:
        "owner-issued-nnc-result→nounstem-embed→yō-ā→imperfective-patientive",
      characteristicMeaning:
        "pertains-to-or-is-characterized-by-the-incorporated-nounstem",
      selectedReading: reading,
      lexicalReadingFact,
      ownerhoodContrastFact,
      characteristicOwnerhoodContrastFrame: ownerhoodContrastFrame,
      organicPossessionFact,
      characteristicOrganicPossessionFrame: organicPossessionFrame,
      preteritAgentiveCharacteristicFact,
      characteristicPreteritAgentiveFrame:
        preteritAgentiveCharacteristicFrame,
      lexicalReadingFactAuthorizesOnlyNarrowReading: Boolean(
        lexicalReadingFact
      ),
      compositionalReadingRemainsAvailable: true,
      shapeSelectsLexicalMeaning: false,
      exampleIdentityAuthorizesProductiveRoute: false,
      unlistedCompatibleNncResultRemainsProductive: true,
      yAssimilationEnvironment: finalUnit(sourceFrame.sourceStem),
      yAssimilationApplied: /-(?:lō|zō|xō|tzō|chō)$/u.test(
        targetStem
      ),
      yAssimilationException:
        lexicalReadingFact?.assimilationException || "",
      characteristicPatientiveTargetStem: targetStem,
      nounClass: "tl",
      nounSubclass: "1-B",
      possessiveStateUsesZeroZero: true,
      possessiveStateShortensFinalO: true,
      possessiveStateStem: generalUseStem,
      rawNounstemAccepted: false,
      copiedResultAccepted: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
    return {
      sourceFrame,
      operationFrame: deepFreeze({
        kind: "classical-nahuatl-deverbal-nnc-operation-frame",
        version: VERSION,
        authorizationStatus: "authorized",
        operationId: `patientive:characteristic-property:${reading}`,
        deverbalNounstemAxisFrame,
        constructionKind: "patientive",
        patientiveKind,
        patientiveSourceFamily: "imperfective-active-core",
        characteristicReading: reading,
        targetStems: {
          restrictedUse: reading === "organic-possession" ? "" : targetStem,
          generalUse: generalUseStem,
        },
        nounClass: "tl",
        nounSubclass: "1-B",
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
        characteristicPatientiveFoundationFrame: foundationFrame,
        characteristicOwnerhoodContrastFrame: ownerhoodContrastFrame,
        characteristicOrganicPossessionFrame: organicPossessionFrame,
        characteristicPreteritAgentiveFrame:
          preteritAgentiveCharacteristicFrame,
        appliedSemanticRules: [
          "39.3-exact-owner-issued-nnc-result-source",
          "39.3-abundant-ownerhood-compound-source",
          "39.3-characteristic-property-yo",
          "39.3-y-assimilation",
          "39.3-subclass-1-b-tl",
          "39.3-possessive-zero-zero-and-final-o-shortening",
          "39.3.1-inherent-state-or-quality",
          ...(reading === "pertaining-to"
            ? ["39.3.2-thing-pertaining-to-incorporated-nounstem"]
            : []),
          ...(reading === "intrinsic-aspect"
            ? [
              "39.3.3-thing-intrinsic-to-incorporated-nounstem",
              "39.3.3-ordinary-and-abundant-ownerhood-remain-distinct",
            ]
            : []),
          ...(reading === "organic-possession" ? [
            "39.3.4-organic-possession",
            "39.3.4-possessive-state-only",
            "39.3.4-possessor-identifies-whole",
            "39.3.4-possessum-identifies-integral-part",
            "39.3.4-shape-does-not-authorize-possession-relation",
          ] : []),
          ...(preteritAgentiveCharacteristicFrame ? [
            "39.3.5-general-use-preterit-agentive-embed",
            "39.3.5-characteristic-yo-matrix",
            "39.3.5-absolutive-versus-possessive-state-remains-distinct",
            "39.3.5-not-adventitious-or-organic-possession",
            "39.3.5-supplementation-principal-choice-owned-by-clause-relation",
          ] : []),
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
  const structuralContractId = `patientive:${sourceFamily}`;
  const structuralContract =
    DEVERBAL_NOUNSTEM_SOURCE_CONTRACTS[structuralContractId];
  if (sourceFamily === "passive-core") {
    if (!request.canonicalVncResult) {
      return {
        sourceFrame: null,
        operationFrame: null,
        blockReason: "exact-owner-issued-passive-vnc-result-required",
      };
    }
    const captureFrame = capturePassivePatientiveVncResult(
      request.canonicalVncResult,
      target
    );
    if (!isClassicalNahuatlPassivePatientiveVncCaptureFrame(captureFrame)) {
      return {
        sourceFrame: null,
        operationFrame: null,
        blockReason: captureFrame.blockReason,
      };
    }
    request = {
      ...request,
      source: {
        sourceUnit: captureFrame.sourceUnit,
        sourceStage: captureFrame.sourceStage,
        sourceStem: captureFrame.sourceStem,
        verbClass: captureFrame.verbClass,
        sourceVoice: captureFrame.sourceVoice,
        sourceVoiceOperation: captureFrame.sourceVoiceOperation,
        sourceNonactiveOptionId: captureFrame.sourceNonactiveOptionId,
        sourceValence: captureFrame.sourceValence,
        sourceObjectPattern: captureFrame.sourceObjectPattern,
        sourceSubject: captureFrame.sourceSubject,
        nonactiveSuffix: captureFrame.nonactiveSuffix,
        sourceIsCompound: captureFrame.sourceIsCompound,
        compoundVncSourceFrame: captureFrame.compoundVncSourceFrame,
        passivePatientiveVncCaptureFrame: captureFrame,
      },
    };
  }
  if (sourceFamily === "impersonal-core") {
    if (!request.canonicalVncResult) {
      return {
        sourceFrame: null,
        operationFrame: null,
        blockReason: "exact-owner-issued-impersonal-vnc-result-required",
      };
    }
    const captureFrame = captureImpersonalPatientiveVncResult(
      request.canonicalVncResult,
      target
    );
    if (!isClassicalNahuatlImpersonalPatientiveVncCaptureFrame(
      captureFrame
    )) {
      return {
        sourceFrame: null,
        operationFrame: null,
        blockReason: captureFrame.blockReason,
      };
    }
    request = {
      ...request,
      source: {
        sourceUnit: captureFrame.sourceUnit,
        sourceStage: captureFrame.sourceStage,
        sourceStem: captureFrame.sourceStem,
        verbClass: captureFrame.verbClass,
        sourceVoice: captureFrame.sourceVoice,
        sourceVoiceOperation: captureFrame.sourceVoiceOperation,
        sourceNonactiveOptionId: captureFrame.sourceNonactiveOptionId,
        sourceValence: captureFrame.sourceValence,
        sourceObjectPattern: captureFrame.sourceObjectPattern,
        sourceSubject: captureFrame.sourceSubject,
        nonactiveSuffix: captureFrame.nonactiveSuffix,
        sourceIsCompound: captureFrame.sourceIsCompound,
        compoundVncSourceFrame: captureFrame.compoundVncSourceFrame,
        impersonalPatientiveVncCaptureFrame: captureFrame,
      },
    };
  }
  if (sourceFamily === "perfective-active-core") {
    if (!request.canonicalVncResult) {
      return {
        sourceFrame: null,
        operationFrame: null,
        blockReason:
          "exact-owner-issued-active-preterit-vnc-result-required",
      };
    }
    const captureFrame = capturePerfectivePatientiveVncResult(
      request.canonicalVncResult,
      target
    );
    if (!isClassicalNahuatlPerfectivePatientiveVncCaptureFrame(
      captureFrame
    )) {
      return {
        sourceFrame: null,
        operationFrame: null,
        blockReason: captureFrame.blockReason,
      };
    }
    request = {
      ...request,
      source: {
        sourceUnit: captureFrame.sourceUnit,
        sourceStage: captureFrame.sourceStage,
        sourceStem: captureFrame.sourceStem,
        verbClass: captureFrame.verbClass,
        sourceVoice: captureFrame.sourceVoice,
        sourceValence: captureFrame.sourceValence,
        sourceObjectPattern: captureFrame.sourceObjectPattern,
        sourceSubject: captureFrame.sourceSubject,
        sourceIsCompound: captureFrame.sourceIsCompound,
        compoundVncSourceFrame: captureFrame.compoundVncSourceFrame,
        perfectivePatientiveVncCaptureFrame: captureFrame,
      },
    };
  }
  if (sourceFamily === "imperfective-active-core") {
    if (!request.canonicalVncResult) {
      return {
        sourceFrame: null,
        operationFrame: null,
        blockReason:
          "exact-owner-issued-active-present-vnc-result-required",
      };
    }
    const captureFrame = captureImperfectivePatientiveVncResult(
      request.canonicalVncResult,
      target
    );
    if (!isClassicalNahuatlImperfectivePatientiveVncCaptureFrame(
      captureFrame
    )) {
      return {
        sourceFrame: null,
        operationFrame: null,
        blockReason: captureFrame.blockReason,
      };
    }
    request = {
      ...request,
      source: {
        sourceUnit: captureFrame.sourceUnit,
        sourceStage: captureFrame.sourceStage,
        sourceStem: captureFrame.sourceStem,
        verbClass: captureFrame.verbClass,
        sourceVoice: captureFrame.sourceVoice,
        sourceValence: captureFrame.sourceValence,
        sourceObjectPattern: captureFrame.sourceObjectPattern,
        sourceSubject: captureFrame.sourceSubject,
        sourceIsCompound: captureFrame.sourceIsCompound,
        compoundVncSourceFrame: captureFrame.compoundVncSourceFrame,
        imperfectivePatientiveVncCaptureFrame: captureFrame,
      },
    };
  }
  const expectedStage = structuralContract.sourceStage;
  const sourceFrame = buildSourceFrame(request, expectedStage, preparedSourceFrame);
  if (sourceFrame.authorizationStatus !== "authorized") {
    return { sourceFrame, operationFrame: null, blockReason: sourceFrame.blockReason };
  }
  const deverbalNounstemAxisFrame = buildDeverbalNounstemAxisFrame({
    sourceFrame,
    structuralContractId,
    formationFamily: structuralContractId,
    allowedStates: ["absolutive", "possessive"],
  });
  if (deverbalNounstemAxisFrame.authorizationStatus !== "authorized") {
    return {
      sourceFrame,
      operationFrame: null,
      blockReason: deverbalNounstemAxisFrame.blockReason,
    };
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
      || sourceFrame.sourceValence !== "double-object"
      || sourceFrame.sourceObjectPattern !== "nonspecific-human"
      || sourceFrame.passivePatientiveVncCaptureFrame
        ?.retainedObjectEvidence?.length !== 1
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
  let truncationFrame = null;
  let impersonalPatientiveObjectFrame = null;
  let patientiveContrastInventory = null;
  let selectedPatientiveContrastReading = "";
  let perfectivePatientiveAnalogy = "";
  let perfectivePatientiveFinal = "";
  let perfectivePatientiveRealizedObjectPattern = "none";
  let imperfectivePatientiveAnalogy = "";
  let imperfectivePatientiveRealizedObjectPattern = "none";
  let imperfectivePatientiveShapeRule = "";
  let rootStockSourceAnalysis = "";
  const rules = [];
  const appliedAuthorizationIds = [];
  const compoundRelation = normalizeKey(
    request.patientiveCompoundRelation || ""
  );
  const compoundSource = sourceFrame.compoundVncSourceFrame || null;
  if (compoundSource && !compoundRelation) {
    return {
      sourceFrame,
      operationFrame: null,
      blockReason: "38.2.1-compound-source-relation-choice-required",
    };
  }
  if (
    compoundSource
    && !compoundSource.relationOptions.includes(compoundRelation)
  ) {
    return {
      sourceFrame,
      operationFrame: null,
      blockReason: "38.2.1-compound-source-relation-not-recognized",
    };
  }
  if (!compoundSource && Object.prototype.hasOwnProperty.call(
    request,
    "patientiveCompoundRelation"
  )) {
    return {
      sourceFrame,
      operationFrame: null,
      blockReason:
        "38.2.1-compound-relation-requires-typed-compound-vnc-source",
    };
  }
  if (["passive-core", "impersonal-core"].includes(sourceFamily)) {
    let nonactiveSourceStem = sourceFrame.sourceStem;
    if (Object.prototype.hasOwnProperty.call(
      request,
      "patientiveRootPlusYaRealization"
    )) {
      return {
        sourceFrame,
        operationFrame: null,
        blockReason:
          "38.1.1-root-plus-ya-realization-is-owned-by-the-vnc-result",
      };
    }
    if (
      sourceFamily === "impersonal-core"
      && Object.prototype.hasOwnProperty.call(
        request,
        "patientiveHuaVowelBehavior"
      )
    ) {
      return {
        sourceFrame,
        operationFrame: null,
        blockReason:
          "38.1.1c-hua-vowel-behavior-is-derived-from-typed-source",
      };
    }
    if (
      sourceFamily === "impersonal-core"
      && Object.prototype.hasOwnProperty.call(
        request,
        "patientiveLayerDeletion"
      )
    ) {
      return {
        sourceFrame,
        operationFrame: null,
        blockReason:
          "38.1.1d-layer-deletion-is-derived-from-typed-source",
      };
    }
    if (
      sourceFamily === "impersonal-core"
      && Object.prototype.hasOwnProperty.call(
        request,
        "patientiveReflexiveCarrier"
      )
    ) {
      return {
        sourceFrame,
        operationFrame: null,
        blockReason:
          "38.1.2-reflexive-carrier-is-inherited-from-the-vnc-result",
      };
    }
    if (
      sourceFamily === "impersonal-core"
      && [
        "patientiveProjectiveCarrier",
        "patientiveProjectivePlacement",
        "patientiveProjectiveVowelAnalysis",
      ].some(field => Object.prototype.hasOwnProperty.call(request, field))
    ) {
      return {
        sourceFrame,
        operationFrame: null,
        blockReason:
          "38.1.3-projective-object-and-vowel-facts-are-inherited-from-the-vnc-result",
      };
    }
    if (
      sourceFamily === "impersonal-core"
      && [
        "patientiveHumanSourceCarrier",
        "patientiveHumanSourceVoicePath",
        "patientiveHumanSourceReferent",
        "retainExceptionalHumanPrefix",
      ].some(field => Object.prototype.hasOwnProperty.call(request, field))
    ) {
      return {
        sourceFrame,
        operationFrame: null,
        blockReason:
          "38.1.4-human-source-carrier-path-and-referent-are-derived",
      };
    }
    const impersonalCapture =
      sourceFrame.impersonalPatientiveVncCaptureFrame || null;
    patientiveContrastInventory = getPatientiveContrastInventory({
      sourceStem: impersonalCapture?.activeSourceStem,
      sourceValence: impersonalCapture?.activeSourceValence,
    });
    const requestedContrastReading = normalizeKey(
      request.patientiveContrastRealization || ""
    );
    if (
      patientiveContrastInventory.choiceRequired
      && !requestedContrastReading
    ) {
      return {
        sourceFrame,
        operationFrame: null,
        blockReason:
          "38.1.5-human-nonhuman-patientive-reading-choice-required",
      };
    }
    if (
      requestedContrastReading
      && !patientiveContrastInventory.options.includes(
        requestedContrastReading
      )
    ) {
      return {
        sourceFrame,
        operationFrame: null,
        blockReason:
          patientiveContrastInventory.authorizationStatus === "authorized"
            ? "38.1.5-patientive-contrast-reading-not-licensed"
            : "38.1.5-patientive-contrast-choice-requires-typed-lexical-source",
      };
    }
    selectedPatientiveContrastReading = requestedContrastReading
      || patientiveContrastInventory.automaticReading;
    const truncated = truncateNonactiveStem(
      nonactiveSourceStem,
      source.nonactiveSuffix,
      {
        activeSourceStem: sourceFrame.impersonalPatientiveVncCaptureFrame
          ?.activeSourceStem || "",
      }
    );
    if (!truncated.stem) {
      return { sourceFrame, operationFrame: null, blockReason: "typed-nonactive-suffix-does-not-match-source-core" };
    }
    let objectPattern = sourceFrame.sourceObjectPattern;
    const humanProjectiveImpersonalizedPassive = Boolean(
      sourceFamily === "impersonal-core"
      && impersonalCapture?.activeSourceValence === "projective-human"
      && !impersonalCapture?.reflexiveReciprocalAncestryKind
    );
    const exceptionalHumanPrefixRetention = Boolean(
      humanProjectiveImpersonalizedPassive
      && lexicalFrame.exceptionalHumanPrefixRetention
    );
    const anomalousNonhumanTe =
      selectedPatientiveContrastReading === "anomalous-nonhuman-te";
    const humanProjectiveCarrier = humanProjectiveImpersonalizedPassive
      ? exceptionalHumanPrefixRetention || anomalousNonhumanTe ? "tē" : "tla"
      : "";
    const projectiveCarrierOverride = anomalousNonhumanTe
      ? "tē"
      : humanProjectiveCarrier;
    if (
      sourceFamily === "passive-core"
      && objectPattern === "nonspecific-human"
      && passiveHumanObjectRealization === "delete"
    ) {
      objectPattern = "none";
      rules.push("37.9.3-optional-retained-te-deletion");
      appliedAuthorizationIds.push(
        "typed-passive-source:double-object-retained-te-deletion"
      );
    }
    if (
      sourceFamily === "impersonal-core"
      && objectPattern === "nonspecific-human"
      && !sourceFrame.impersonalPatientiveVncCaptureFrame
        ?.reflexiveReciprocalAncestryKind
    ) {
      if (exceptionalHumanPrefixRetention) {
        rules.push("38.1.5-exceptional-human-te-retention");
        appliedAuthorizationIds.push(
          "lexical-source:exceptional-human-prefix-retention"
        );
      } else {
        objectPattern = "nonspecific-nonhuman";
        rules.push("38.1.4-human-source-tla-impersonalization");
      }
    }
    if (selectedPatientiveContrastReading === "regular-human-tla") {
      rules.push("38.1.5-regular-human-tla-patientive");
    } else if (anomalousNonhumanTe) {
      rules.push("38.1.5-anomalous-nonhuman-te-patientive");
      appliedAuthorizationIds.push(
        "lexical-source:human-nonhuman-patientive-contrast"
      );
    }
    impersonalPatientiveObjectFrame = sourceFamily === "impersonal-core"
      ? buildImpersonalPatientiveInternalObjectFrame({
        capture: sourceFrame.impersonalPatientiveVncCaptureFrame,
        fallbackObjectPattern: objectPattern,
        sourceSubject: sourceFrame.sourceSubject,
        humanProjectiveCarrier,
        projectiveCarrierOverride,
      })
      : null;
    const prefixes = impersonalPatientiveObjectFrame
      ? impersonalPatientiveObjectFrame.carrierSequence
      : [internalObjectPrefix(
        objectPattern,
        sourceFrame.sourceSubject,
        true
      )].filter(Boolean);
    let truncatedStem = normalizeStem(truncated.stem);
    const contrastStemReplacement =
      lexicalFrame.patientiveContrastProfile?.targetStemReplacements
        ?.[selectedPatientiveContrastReading] || null;
    if (
      Array.isArray(contrastStemReplacement)
      && contrastStemReplacement.length === 2
      && truncatedStem === contrastStemReplacement[0]
    ) {
      truncatedStem = contrastStemReplacement[1];
      rules.push("38.1.5-typed-lexical-vowel-realization");
    }
    truncationFrame = deepFreeze({
      kind: "classical-nahuatl-patientive-truncation-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      sourceFamily,
      sourceStem: truncated.sourceStem,
      typedSuffixFamily: truncated.suffixFamily,
      removedMaterial: truncated.removedMaterial,
      retainedStem: truncated.retainedStem,
      precedingVowel: truncated.precedingVowel,
      precedingVowelBehavior: truncated.precedingVowelBehavior,
      activeSourceStem: truncated.activeSourceStem,
      activeSourceFinalVowel: truncated.activeSourceFinalVowel,
      nounClass: truncated.nounClass,
      truncationDerivedFromTypedMorphemicBoundary:
        truncated.truncationDerivedFromTypedMorphemicBoundary,
      finalLettersAloneAuthorizeTruncation:
        truncated.finalLettersAloneAuthorizeTruncation,
      fullSourceFramePreserved: true,
      exampleStemMembershipRequired: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
    targetCore = joinMorphs([...prefixes, truncatedStem]);
    nounClass = truncated.nounClass;
    rules.push(
      sourceFamily === "passive-core"
        ? "37.9-passive-patientive"
        : "38.1-impersonal-patientive",
      `37.8-nonactive-${normalizeKey(source.nonactiveSuffix)}-truncation`
    );
    if (sourceFamily === "impersonal-core") {
      const layeredHuaLo =
        normalizeKey(source.nonactiveSuffix) === "hua-lō";
      rules.push(
        "38.1-owner-issued-impersonal-vnc-result",
        layeredHuaLo
          ? "38.1.1d-hua-lo-impersonal-patientive"
          : normalizeKey(source.nonactiveSuffix) === "lō"
          ? "38.1.1a-lo-impersonal-patientive"
          : ["ō", "ō-hua", "o-hua"].includes(
            normalizeKey(source.nonactiveSuffix)
          )
            ? "38.1.1b-o-or-o-hua-impersonal-patientive"
            : normalizeKey(source.nonactiveSuffix) === "hua"
              ? "38.1.1c-hua-impersonal-patientive"
              : "38.1-impersonal-nonactive-patientive"
      );
      if (impersonalPatientiveObjectFrame
        ?.reflexiveReciprocalAncestryKind) {
        rules.push(
          "38.1.2-reflexive-reciprocal-impersonal-patientive"
        );
      }
      if (
        humanProjectiveImpersonalizedPassive
        && !exceptionalHumanPrefixRetention
      ) {
        rules.push(
          "38.1.4-human-source-impersonalized-passive-patientive",
          normalizeKey(source.nonactiveSuffix) === "lō"
            ? "38.1.4a-human-source-tla-lo-patientive"
            : ["ō", "ō-hua", "o-hua"].includes(
              normalizeKey(source.nonactiveSuffix)
            )
              ? "38.1.4b-human-source-tla-o-patientive"
              : normalizeKey(source.nonactiveSuffix) === "hua"
                ? "38.1.4c-human-source-tla-hua-patientive"
                : "38.1.4-human-source-tla-patientive"
        );
      } else if (
        impersonalPatientiveObjectFrame
          ?.nonspecificNonhumanPatientCarrierPreserved
      ) {
        rules.push(
          "38.1.3-projective-object-impersonal-patientive",
          normalizeKey(source.nonactiveSuffix) === "lō"
            ? "38.1.3a-projective-lo-impersonal-patientive"
            : ["ō", "ō-hua", "o-hua"].includes(
              normalizeKey(source.nonactiveSuffix)
            )
              ? "38.1.3b-projective-o-impersonal-patientive"
              : normalizeKey(source.nonactiveSuffix) === "hua"
                ? "38.1.3c-projective-hua-impersonal-patientive"
                : "38.1.3-projective-impersonal-patientive"
        );
      }
    }
    if (
      sourceFamily === "passive-core"
      && sourceFrame.sourceObjectPattern === "reflexive"
    ) {
      rules.push("37.9.2-reflexive-shuntline-ne-retention");
    }
    if (
      sourceFamily === "passive-core"
      && sourceFrame.sourceValence === "double-object"
    ) {
      rules.push("37.9.3-double-object-passive-surviving-object-retention");
    }
  } else if (sourceFamily === "perfective-active-core") {
    const final = finalUnit(sourceFrame.sourceStem);
    if (!PERFECTIVE_PATIENTIVE_FINALS.includes(final)) {
      return { sourceFrame, operationFrame: null, blockReason: "39.1-perfective-source-ending-not-licensed" };
    }
    const analogy = normalizeKey(request.patientiveAnalogy || "impersonal");
    if (!["passive", "impersonal"].includes(analogy)) {
      return { sourceFrame, operationFrame: null, blockReason: "39.1-perfective-patientive-analogy-required" };
    }
    if (
      analogy === "passive"
      && sourceFrame.sourceValence === "intransitive"
    ) {
      return {
        sourceFrame,
        operationFrame: null,
        blockReason:
          "39.1.1-passive-analogy-requires-transitive-source",
      };
    }
    let pattern = sourceFrame.sourceObjectPattern;
    if (analogy === "passive") {
      if (["nonspecific-human", "nonspecific-nonhuman"]
        .includes(pattern)) {
        pattern = "none";
      } else if (pattern === "human-and-nonhuman") {
        pattern = "nonspecific-human";
      }
    }
    if (analogy === "impersonal" && pattern === "nonspecific-human") {
      pattern = "nonspecific-nonhuman";
    }
    targetCore = joinMorphs([
      internalObjectPrefix(pattern, sourceFrame.sourceSubject, true),
      sourceFrame.sourceStem,
    ]);
    nounClass = "tli";
    perfectivePatientiveAnalogy = analogy;
    perfectivePatientiveFinal = final;
    perfectivePatientiveRealizedObjectPattern = pattern;
    rules.push(
      "39.1-owner-issued-active-perfective-vnc-result",
      `39.1-perfective-${analogy}-analogy`,
      "39.1-perfective-patientive-tli-class"
    );
  } else if (sourceFamily === "imperfective-active-core") {
    const analogy = normalizeKey(request.patientiveAnalogy || "impersonal");
    if (!["passive", "impersonal"].includes(analogy)) {
      return { sourceFrame, operationFrame: null, blockReason: "39.2-imperfective-patientive-analogy-required" };
    }
    if (
      analogy === "passive"
      && sourceFrame.sourceValence === "intransitive"
    ) {
      return {
        sourceFrame,
        operationFrame: null,
        blockReason:
          "39.2.1-passive-analogy-requires-transitive-source",
      };
    }
    const shape = resolveImperfectivePatientiveStem(
      sourceFrame.imperfectivePatientiveVncCaptureFrame
    );
    if (shape.blockReason) {
      return {
        sourceFrame,
        operationFrame: null,
        blockReason: shape.blockReason,
      };
    }
    let pattern = sourceFrame.sourceObjectPattern;
    if (analogy === "passive") {
      if (["nonspecific-human", "nonspecific-nonhuman"]
        .includes(pattern)) {
        pattern = "none";
      } else if (pattern === "human-and-nonhuman") {
        pattern = "nonspecific-human";
      }
    }
    targetCore = joinMorphs([
      internalObjectPrefix(pattern, sourceFrame.sourceSubject, true),
      shape.stem,
    ]);
    nounClass = "tl";
    imperfectivePatientiveAnalogy = analogy;
    imperfectivePatientiveRealizedObjectPattern = pattern;
    imperfectivePatientiveShapeRule = shape.rule;
    rules.push(
      "39.2-owner-issued-active-imperfective-vnc-result",
      `39.2-imperfective-${analogy}-analogy`,
      `39.2-${shape.rule}`,
      "39.2-imperfective-patientive-tl-class"
    );
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
    if (!allomorph && rootStock.allomorphChoiceRequired) {
      return {
        sourceFrame,
        operationFrame: null,
        blockReason: "39.4-root-stock-allomorph-choice-required",
      };
    }
    if (!rootStock.allomorphs.includes(allomorph)) {
      return {
        sourceFrame,
        operationFrame: null,
        blockReason:
          "39.4-root-stock-allomorph-not-lexically-authorized",
      };
    }
    const sourceAnalysisOptions = Object.freeze([
      ...(rootStock.sourceAnalysisOptionsByAllomorph?.[allomorph] || []),
    ]);
    const defaultSourceAnalysis =
      rootStock.sourceAnalysisDefaultByAllomorph?.[allomorph] || "";
    rootStockSourceAnalysis = normalizeKey(
      request.rootStockSourceAnalysis || defaultSourceAnalysis
    );
    if (
      sourceAnalysisOptions.length > 1
      && !rootStockSourceAnalysis
    ) {
      return {
        sourceFrame,
        operationFrame: null,
        blockReason: "39.4.3-root-stock-source-analysis-choice-required",
      };
    }
    if (
      rootStockSourceAnalysis
      && !sourceAnalysisOptions.includes(rootStockSourceAnalysis)
    ) {
      return {
        sourceFrame,
        operationFrame: null,
        blockReason: "39.4.3-root-stock-source-analysis-not-licensed",
      };
    }
    if (!rootStockSourceAnalysis) {
      rootStockSourceAnalysis = rootStock.stockKind === "causative-root"
        ? "deverbal-patientive-proven-by-object-carrier"
        : rootStock.stockKind === "bare-stock-agentive"
          ? "stock-as-agentive-nounstem"
          : rootStock.stockKind === "unknown-source-deverbal-nounstem"
            ? "deverbal-source-identity-unknown"
            : allomorph === "zero"
              ? "deverbal-root-patientive"
              : "deverbal-stock-patientive";
    }
    const selectedTargetBase =
      rootStock.targetBaseByAllomorph?.[allomorph]
      || rootStock.targetBase;
    targetCore = allomorph === "zero"
      ? selectedTargetBase
      : joinMorphs([selectedTargetBase, allomorph]);
    nounClass = rootStock.nounClassByAllomorph[allomorph]
      || rootStock.nounClass;
    rules.push(`39.4-${rootStock.stockKind}-${allomorph}`);
    appliedAuthorizationIds.push(
      `lexical-source:root-stock-${rootStock.stockKind}-${allomorph}`
    );
  }
  rules.push("38.1.6-patientive-active-action-analyses-remain-distinct");
  if (compoundSource) {
    rules.push(
      "38.2-compound-vnc-source-patientive",
      compoundRelation === "incorporated-object"
        ? "38.2.1-object-embed-english-reading-reversal"
        : "38.2.1-adverbial-embed-direct-reading-order"
    );
  }
  const passivePatientiveFamilyFrame = sourceFamily === "passive-core"
    ? buildPassivePatientiveFamilyFrame({
      request,
      sourceFrame,
      truncationFrame,
      targetStem: targetCore,
      nounClass,
    })
    : null;
  const impersonalPatientiveFamilyFrame = sourceFamily === "impersonal-core"
    ? buildImpersonalPatientiveFamilyFrame({
      request,
      sourceFrame,
      truncationFrame,
      targetStem: targetCore,
      nounClass,
    })
    : null;
  const impersonalReflexivePatientiveFrame =
    sourceFamily === "impersonal-core"
      ? buildImpersonalReflexivePatientiveFrame({
        sourceFrame,
        objectFrame: impersonalPatientiveObjectFrame,
        targetStem: targetCore,
      })
      : null;
  const impersonalProjectivePatientiveFrame =
    sourceFamily === "impersonal-core"
      ? buildImpersonalProjectivePatientiveFrame({
        sourceFrame,
        objectFrame: impersonalPatientiveObjectFrame,
        truncationFrame,
        targetStem: targetCore,
      })
      : null;
  const impersonalHumanSourcePatientiveFrame =
    sourceFamily === "impersonal-core"
      ? buildImpersonalHumanSourcePatientiveFrame({
        sourceFrame,
        objectFrame: impersonalPatientiveObjectFrame,
        truncationFrame,
        targetStem: targetCore,
        exceptionalHumanPrefixRetention:
          lexicalFrame.exceptionalHumanPrefixRetention === true,
        selectedContrastReading: selectedPatientiveContrastReading,
      })
      : null;
  const patientiveHumanNonhumanContrastFrame =
    buildPatientiveHumanNonhumanContrastFrame({
      sourceFrame,
      objectFrame: impersonalPatientiveObjectFrame,
      targetStem: targetCore,
      sourceFamily,
      selectedReading: selectedPatientiveContrastReading,
      contrastInventory: patientiveContrastInventory,
      passivePatientiveFamilyFrame,
    });
  const patientiveActiveActionContrastFrame =
    buildPatientiveActiveActionContrastFrame({
      sourceFrame,
      targetStem: targetCore,
      sourceFamily,
    });
  const compoundSourcePatientiveFrame =
    buildCompoundSourcePatientiveFrame({
      sourceFrame,
      targetStem: targetCore,
      sourceFamily,
      relation: compoundRelation,
    });
  const perfectivePatientiveFrame =
    sourceFamily === "perfective-active-core"
      ? buildPerfectivePatientiveFrame({
        sourceFrame,
        targetStem: targetCore,
        analogy: perfectivePatientiveAnalogy,
        final: perfectivePatientiveFinal,
        realizedObjectPattern: perfectivePatientiveRealizedObjectPattern,
      })
      : null;
  const imperfectivePatientiveFrame =
    sourceFamily === "imperfective-active-core"
      ? buildImperfectivePatientiveFrame({
        sourceFrame,
        targetStem: targetCore,
        analogy: imperfectivePatientiveAnalogy,
        realizedObjectPattern:
          imperfectivePatientiveRealizedObjectPattern,
        shapeRule: imperfectivePatientiveShapeRule,
      })
      : null;
  const imperfectiveImpersonalPatientiveFrame =
    sourceFamily === "imperfective-active-core"
      && imperfectivePatientiveAnalogy === "impersonal"
      ? buildImperfectiveImpersonalPatientiveFrame({
        sourceFrame,
        targetStem: targetCore,
        realizedObjectPattern:
          imperfectivePatientiveRealizedObjectPattern,
      })
      : null;
  const rootStockPatientiveFrame = sourceFamily === "root-or-stock"
    ? deepFreeze({
      kind: "classical-nahuatl-lesson39-root-stock-patientive-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      sourceStem: sourceFrame.sourceStem,
      sourceMorphemicShapeFrame:
        buildPredicateMorphemicShapeFrame(sourceFrame),
      stockKind: lexicalFrame.rootStockAuthorization?.stockKind || "",
      stockBase: lexicalFrame.rootStockAuthorization?.targetBase || "",
      stockFormativeVowel:
        lexicalFrame.rootStockAuthorization?.stockFormativeVowel || "",
      stockFormativeShorteningApplied:
        lexicalFrame.rootStockAuthorization
          ?.stockFormativeShorteningApplied === true,
      availableAllomorphs: Object.freeze([
        ...(lexicalFrame.rootStockAuthorization?.allomorphs || []),
      ]),
      selectedAllomorph: normalizeKey(
        request.rootStockAllomorph
          || lexicalFrame.rootStockAuthorization?.defaultAllomorph
      ),
      allomorphChoiceRequired:
        lexicalFrame.rootStockAuthorization
          ?.allomorphChoiceRequired === true,
      targetStem: targetCore,
      nounClass,
      rootStockExtensionFrame: deepFreeze({
        kind:
          "classical-nahuatl-lesson39-root-stock-extension-frame",
        version: VERSION,
        authorizationStatus: "authorized",
        structuralFamily:
          lexicalFrame.rootStockAuthorization?.stockKind || "",
        stockOrRootFormation:
          ["c", "x"].includes(normalizeKey(
            request.rootStockAllomorph
              || lexicalFrame.rootStockAuthorization?.defaultAllomorph
          ))
            ? "stock-based"
            : lexicalFrame.rootStockAuthorization?.stockKind
                === "bare-stock-agentive"
              ? "stock-as-agentive-nounstem"
              : lexicalFrame.rootStockAuthorization?.stockKind
                  === "unknown-source-deverbal-nounstem"
                ? "fixed-deverbal-nounstem-with-unknown-verbstem"
                : "root-based",
        sourceAnalysisOptions: Object.freeze([
          ...(lexicalFrame.rootStockAuthorization
            ?.sourceAnalysisOptionsByAllomorph?.[normalizeKey(
              request.rootStockAllomorph
                || lexicalFrame.rootStockAuthorization?.defaultAllomorph
            )] || []),
        ]),
        selectedSourceAnalysis: rootStockSourceAnalysis,
        sourceAnalysisChoiceRequired:
          (lexicalFrame.rootStockAuthorization
            ?.sourceAnalysisOptionsByAllomorph?.[normalizeKey(
              request.rootStockAllomorph
                || lexicalFrame.rootStockAuthorization?.defaultAllomorph
            )] || []).length > 1,
        sourceDirectionEvidence:
          lexicalFrame.rootStockAuthorization?.sourceDirectionEvidence || "",
        relatedSourceContrastFrame:
          lexicalFrame.rootStockAuthorization
            ?.relatedSourceContrastFrame || null,
        causativeSourceFrame:
          lexicalFrame.rootStockAuthorization?.causativeSourceFrame || null,
        causativeObjectCarrierProvesDeverbalHistory:
          lexicalFrame.rootStockAuthorization?.causativeSourceFrame
            ?.verbcoreIncludesObjectCarrier === true,
        lexicalEvidenceFrame:
          lexicalFrame.rootStockAuthorization?.lexicalEvidenceFrame || null,
        unknownSourceFrame:
          lexicalFrame.rootStockAuthorization?.unknownSourceFrame || null,
        exactSourceVerbstemMayRemainUnknown:
          lexicalFrame.rootStockAuthorization?.unknownSourceFrame
            ?.exactSourceVerbstemKnown === false,
        unknownSourceDoesNotNegateNounstem:
          lexicalFrame.rootStockAuthorization?.unknownSourceFrame
            ?.unknownSourceDoesNotNegateResult === true,
        sourceReadingsRemainTypedLexicalFacts: true,
        resultReadingsRemainTypedLexicalFacts: true,
        homophonousOrRelatedSourcesRemainDistinct: true,
        surfaceShapeSelectsHistoricalSource: false,
        englishMeaningAuthorizesRoute: false,
        examplesAuthorizeRoute: false,
        compatibleUnlistedIhuiAhuiSourcesRemainProductive: true,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
      }),
      allomorphFamilyFrame: deepFreeze({
        kind:
          "classical-nahuatl-lesson39-root-stock-allomorph-family-frame",
        version: VERSION,
        authorizationStatus: "authorized",
        sourceFamily: lexicalFrame.rootStockAuthorization?.stockKind || "",
        huaFamilyAllomorphs: Object.freeze(["c", "ch", "zero"]),
        availableTypedAlternatives: Object.freeze([
          ...(lexicalFrame.rootStockAuthorization?.allomorphs || []),
        ]),
        selectedAllomorph: normalizeKey(
          request.rootStockAllomorph
            || lexicalFrame.rootStockAuthorization?.defaultAllomorph
        ),
        selectedFormation: ({
          c: "stock-plus-c",
          ch: "stock-plus-ch",
          zero: "stock-as-nounstem",
        })[normalizeKey(
          request.rootStockAllomorph
            || lexicalFrame.rootStockAuthorization?.defaultAllomorph
        )] || "",
        cIsFrequentHuaFormation: true,
        chIsOccasionalHuaFormation: true,
        zeroUsesStockDirectlyAsNounstem: true,
        typedAlternativesOnly: true,
        freeSpellingChoiceAccepted: false,
        stockBoundaryPreserved: true,
        vowelRealizationRule:
          lexicalFrame.rootStockAuthorization?.vowelRealizationRule || "",
        longStockFormativeShortened:
          lexicalFrame.rootStockAuthorization
            ?.stockFormativeShorteningApplied === true,
        eStockOftenHasCharacteristicReading:
          lexicalFrame.rootStockAuthorization?.stockFormativeVowel === "ē",
        sourceReadings: Object.freeze([
          ...(lexicalFrame.rootStockAuthorization?.sourceReadings || []),
        ]),
        resultReadings: Object.freeze([
          ...(lexicalFrame.rootStockAuthorization
            ?.resultReadingsByAllomorph?.[normalizeKey(
              request.rootStockAllomorph
                || lexicalFrame.rootStockAuthorization?.defaultAllomorph
            )]
            || lexicalFrame.rootStockAuthorization?.resultReadings
            || []),
        ]),
        referentProfile:
          lexicalFrame.rootStockAuthorization
            ?.referentProfileByAllomorph?.[normalizeKey(
              request.rootStockAllomorph
                || lexicalFrame.rootStockAuthorization?.defaultAllomorph
            )] || null,
        rootRole:
          lexicalFrame.rootStockAuthorization?.rootSourceFrame
            ?.sourceKind || "lexical-root",
        downgradedNounstemSourceFrame:
          lexicalFrame.rootStockAuthorization?.rootSourceFrame || null,
        compoundSourceFrame:
          lexicalFrame.rootStockAuthorization?.compoundSourceFrame || null,
        lexicalMeaningDerivedFromShape: false,
        exampleIdentityAuthorizesRoute: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
      }),
      witnessedReadingFact:
        lexicalFrame.rootStockAuthorization?.witnessedReadingFact || null,
      witnessedFactSuppliesDefaultButDoesNotAuthorizeRoute: true,
      sourceShapeAuthorizesFamily:
        lexicalFrame.rootStockAuthorization
          ?.sourceShapeAuthorizesFamily === true,
      compatibleUnlistedTypedSourcesRemainProductive: true,
      lexicalMeaningDerivedFromShape: false,
      exampleMembershipRequired: false,
      copiedFormulaOrSurfaceAuthorityAccepted: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    })
    : null;
  const patientiveUseFrame = deepFreeze({
    kind: "classical-nahuatl-lesson39-patientive-use-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    procedureInventory: PATIENTIVE_SOURCE_FAMILIES,
    selectedProcedure: sourceFamily,
    selectedConstructionIdentity:
      `patientive:${sourceFamily}:${sourceFrame.sourceStage}`,
    selectedTypedSourceFrame: sourceFrame,
    selectedTargetStem: targetCore,
    selectedNounClass: nounClass,
    multipleProceduresMayBeLicensedForOneLexicalSource: true,
    multipleProceduresAreUniversalForEverySource: false,
    eachProcedureRequiresItsOwnTypedSourceAuthorization: true,
    currentExactTypedSourceSettlesProcedure: true,
    contextualInterpretationChoiceRequired: false,
    contextualInterpretationChoiceRequiredOnlyWhenTypedAlternativesRemain:
      true,
    synonymousTranslationMayCoverDistinctPatientiveConstructions: true,
    synonymousTranslationGuaranteesIdenticalMeaning: false,
    differingFormationMayCarryIdiomaticRestriction: true,
    highGeneralityReadingRemainsAvailableUnlessTypedLexicalUseNarrowsIt:
      true,
    translationSelectsProcedure: false,
    translationAuthorizesStructure: false,
    displayedMeaningAuthorizesStructure: false,
    surfaceIdentityMergesProcedures: false,
    examplesAuthorizeProcedure: false,
    compatibleUnlistedTypedSourcesRemainProductive: true,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
  const operationFrame = deepFreeze({
    kind: "classical-nahuatl-deverbal-nnc-operation-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    operationId: `patientive:${sourceFamily}`,
    deverbalNounstemAxisFrame,
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
    patientiveTaxonomyFrame: deepFreeze({
      kind: "classical-nahuatl-lesson37-patientive-taxonomy-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      basicSourceFamilies: PATIENTIVE_SOURCE_FAMILIES,
      selectedSourceFamily: sourceFamily,
      selectedSourceStage: sourceFrame.sourceStage,
      selectedSourceVoice: sourceFrame.sourceVoice,
      completeTypedSourceFrame: sourceFrame,
      meaningRange: Object.freeze([
        "entity-capable-of-undergoing-action",
        "entity-that-has-undergone-action",
        "entity-that-has-become-a-state",
        "product-or-result",
      ]),
      regularTruncationFrame: truncationFrame,
      lexicalMeaningOrIrregularFormationRequiresTypedAnalysis: true,
      sourceShapeAloneSelectsLexicalMeaning: false,
      examplesAuthorizeRoute: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    }),
    patientiveTruncationFrame: truncationFrame,
    passivePatientiveFamilyFrame,
    impersonalPatientiveFamilyFrame,
    impersonalPatientiveObjectFrame,
    impersonalReflexivePatientiveFrame,
    impersonalProjectivePatientiveFrame,
    impersonalHumanSourcePatientiveFrame,
    patientiveHumanNonhumanContrastFrame,
    patientiveActiveActionContrastFrame,
    compoundSourcePatientiveFrame,
    perfectivePatientiveFrame,
    imperfectivePatientiveFrame,
    imperfectiveImpersonalPatientiveFrame,
    rootStockPatientiveFrame,
    patientiveUseFrame,
    impersonalPatientiveFoundationFrame:
      sourceFamily === "impersonal-core"
        ? deepFreeze({
          kind:
            "classical-nahuatl-lesson38-impersonal-patientive-foundation-frame",
          version: VERSION,
          authorizationStatus: "authorized",
          canonicalImpersonalVncResult:
            sourceFrame.impersonalPatientiveVncCaptureFrame
              ?.canonicalVncResult || null,
          exactImpersonalResultIdentityPreserved:
            sourceFrame.sourceCapturedFromExactVncResult === true,
          activeSourceStem:
            sourceFrame.impersonalPatientiveVncCaptureFrame
              ?.activeSourceStem || "",
          impersonalCore: sourceFrame.sourceStem,
          nonactiveSuffix:
            sourceFrame.impersonalPatientiveVncCaptureFrame
              ?.nonactiveSuffix || "",
          sourceVoiceOperation:
            sourceFrame.impersonalPatientiveVncCaptureFrame
              ?.sourceVoiceOperation || "",
          sourceValence: sourceFrame.sourceValence,
          activeSourceValence:
            sourceFrame.impersonalPatientiveVncCaptureFrame
              ?.activeSourceValence || sourceFrame.sourceValence,
          sourceObjectPattern: sourceFrame.sourceObjectPattern,
          sourceObjectRequests:
            sourceFrame.impersonalPatientiveVncCaptureFrame
              ?.sourceObjectRequests || [],
          reflexiveReciprocalAncestryKind:
            sourceFrame.impersonalPatientiveVncCaptureFrame
              ?.reflexiveReciprocalAncestryKind || "",
          shuntlineNeInheritedAutomatically:
            sourceFrame.impersonalPatientiveVncCaptureFrame
              ?.shuntlineNeInheritedAutomatically === true,
          retainedProjectiveObjectEvidence:
            sourceFrame.impersonalPatientiveVncCaptureFrame
              ?.retainedProjectiveObjectEvidence || [],
          completeTypedSourceAnalysisPreserved:
            sourceFrame.impersonalPatientiveVncCaptureFrame
              ?.completeTypedSourceAnalysisPreserved === true,
          patientiveNamesResultRatherThanAgent: true,
          englishParticipleAnalogyAuthorizesGrammar: false,
          impersonalHistoryReconstructedFromSurface: false,
          rawNonactiveLookingStemAccepted: false,
          copiedResultAccepted: false,
          formulaStringAuthority: false,
          surfaceStringAuthority: false,
        })
        : null,
    passivePatientiveFoundationFrame:
      sourceFamily === "passive-core"
        ? deepFreeze({
          kind:
            "classical-nahuatl-lesson37-passive-patientive-foundation-frame",
          version: VERSION,
          authorizationStatus: "authorized",
          canonicalPassiveVncResult:
            sourceFrame.passivePatientiveVncCaptureFrame
              ?.canonicalVncResult || null,
          exactPassiveResultIdentityPreserved:
            sourceFrame.sourceCapturedFromExactVncResult === true,
          activeSourceValence:
            sourceFrame.passivePatientiveVncCaptureFrame
              ?.activeSourceValence || "",
          ultimateActiveSourceIsTransitive:
            sourceFrame.passivePatientiveVncCaptureFrame
              ?.ultimateActiveSourceIsTransitive === true,
          intransitiveUltimateSourceAllowed: false,
          passiveCore: sourceFrame.sourceStem,
          nonactiveSuffix:
            sourceFrame.passivePatientiveVncCaptureFrame
              ?.nonactiveSuffix || "",
          sourceObjectPattern: sourceFrame.sourceObjectPattern,
          retainedObjectEvidence:
            sourceFrame.passivePatientiveVncCaptureFrame
              ?.retainedObjectEvidence || [],
          nonspecificProjectiveEvidencePreserved:
            sourceFrame.passivePatientiveVncCaptureFrame
              ?.nonspecificProjectiveEvidencePreserved === true,
          shuntlineReflexiveEvidencePreserved:
            sourceFrame.passivePatientiveVncCaptureFrame
              ?.shuntlineReflexiveEvidencePreserved === true,
          noObjectPassiveBranch:
            sourceFrame.passivePatientiveVncCaptureFrame
              ?.noObjectPassiveBranch === true,
          patientReferent:
            sourceFrame.passivePatientiveVncCaptureFrame
              ?.patientReferent || "",
          passiveHistoryReconstructedFromSurface: false,
          formulaStringAuthority: false,
          surfaceStringAuthority: false,
        })
        : null,
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
    appliedSemanticRules: [
      ...rules,
      "39.5-multiple-patientive-procedures-remain-distinct",
      "39.5-translation-does-not-authorize-structure",
      "39.5-idiomatic-use-requires-typed-lexical-or-contextual-evidence",
    ],
    typedOperationAuthority: true,
    callerSuppliedDerivedAuthorityAccepted: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
  return { sourceFrame, operationFrame, blockReason: "" };
}

function normalizeOwnerhoodSubclass(value = "") {
  const key = normalizeKey(value).replace(/^tl-/, "");
  return ({
    "1": "1",
    "1-a": "1-a",
    "1-b": "1-b",
    "2-a": "2-a",
    "2-a-glottal": "2-a-glottal",
    "2-b": "2-b",
    "2-c": "2-c",
  })[key] || "";
}

function buildOwnerhoodSourceAnalysisFrame(source = {}) {
  const nounClass = normalizeNounClass(source.nounClass);
  const nounSubclass = normalizeOwnerhoodSubclass(source.nounSubclass);
  const sourceStem = normalizeStem(source.sourceStem || source.stem);
  const final = finalUnit(sourceStem);
  const lexicalFacts = OWNERHOOD_LEXICAL_FACTS[sourceStem] || null;
  const structuralMatrices = [];
  const eLicensed = (
    (nounClass === "tli" && !["uh", "h"].includes(final))
    || (
      nounClass === "tl"
      && ["2-b", "2-c", "2-a", "2-a-glottal"].includes(nounSubclass)
    )
  );
  const huaLicensed = (
    ["in", "zero"].includes(nounClass)
    || (
      nounClass === "tl"
      && ["1", "1-a", "1-b"].includes(nounSubclass)
    )
    || (nounClass === "tli" && ["uh", "h"].includes(final))
  );
  if (eLicensed) structuralMatrices.push("ē");
  if (huaLicensed) structuralMatrices.push("huā");
  const matrixOptions = lexicalFacts?.matrixOptions
    ? [...lexicalFacts.matrixOptions]
    : structuralMatrices;
  return deepFreeze({
    kind: "classical-nahuatl-lesson35-ownerhood-source-analysis-frame",
    version: VERSION,
    authorizationStatus: sourceStem && nounClass
      ? "authorized"
      : "blocked",
    sourceStem,
    sourceShapeRole: "incorporated-nounstem-general-use",
    nounClass,
    nounSubclass,
    finalUnit: final,
    matrixOptions,
    matrixChoiceRequired: matrixOptions.length > 1,
    matrixChoiceDerivedAutomatically: matrixOptions.length === 1,
    lexicalException: lexicalFacts?.exception || "",
    lexicalExceptionOnly: Boolean(lexicalFacts),
    structuralRuleApplied: lexicalFacts ? "lexical-exception" : "class-and-final-edge",
    supportiveFinalIDeletesBeforeE:
      nounClass === "tl" && nounSubclass === "2-c",
    glottalizedFinalHMayBecomeYBeforeE:
      nounClass === "tl"
      && ["2-a", "2-a-glottal"].includes(nounSubclass),
    finalZSpellsCBeforeE: matrixOptions.includes("ē") && final === "z",
    eHuaAreFixedVerbalMatrices: true,
    preteritOnly: true,
    finiteVncContinuation: "connective-t-only",
    singularOrCommonNumberOptions: ["silent", "qui"],
    generalUseMatrix: "cā",
    recursiveOwnerhoodAvailable: true,
    exampleStemMembershipRequired: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

function getOwnerhoodSourceAnalysis(source = {}) {
  return buildOwnerhoodSourceAnalysisFrame(source);
}

function ownerhoodMatrixForSource(source = {}, analysisFrame = null) {
  const requested = normalizeKey(source.ownerhoodMatrix || "")
    .replace("yo-a", "yō-ā");
  if (requested === "yō-ā") return requested;
  const analysis = analysisFrame || buildOwnerhoodSourceAnalysisFrame(source);
  if (analysis.matrixOptions.includes(requested)) return requested;
  if (!requested && analysis.matrixOptions.length === 1) {
    return analysis.matrixOptions[0];
  }
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
  const ownerhoodSourceAnalysisFrame =
    buildOwnerhoodSourceAnalysisFrame(source);
  const matrix = ownerhoodMatrixForSource(
    source,
    ownerhoodSourceAnalysisFrame
  );
  if (!nounClass || !matrix) {
    return { sourceFrame, operationFrame: null, blockReason: "35.9-ownerhood-matrix-not-licensed-for-typed-source-class" };
  }
  let restrictedUse = "";
  if (matrix === "ē") {
    let incorporatedStem = sourceFrame.sourceStem;
    if (
      ownerhoodSourceAnalysisFrame.supportiveFinalIDeletesBeforeE
      && /i$/u.test(incorporatedStem)
    ) {
      incorporatedStem = incorporatedStem.slice(0, -1);
    }
    if (
      ownerhoodSourceAnalysisFrame.glottalizedFinalHMayBecomeYBeforeE
      && /h$/u.test(incorporatedStem)
    ) {
      incorporatedStem = `${incorporatedStem.slice(0, -1)}y`;
    }
    if (ownerhoodSourceAnalysisFrame.finalZSpellsCBeforeE) {
      incorporatedStem = incorporatedStem.replace(/z$/u, "c");
    }
    restrictedUse = joinMorphs([incorporatedStem, "eh", "0"]);
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
    sourceNounSubclass: normalizeOwnerhoodSubclass(source.nounSubclass),
    ownerhoodSourceAnalysisFrame,
    availableOwnerhoodMatrices:
      ownerhoodSourceAnalysisFrame.matrixOptions,
    ownerhoodMatrixChoiceRequired:
      ownerhoodSourceAnalysisFrame.matrixChoiceRequired,
    ownerhoodBoundaryFrame: deepFreeze({
      kind: "classical-nahuatl-lesson35-ownerhood-boundary-frame",
      version: VERSION,
      underlyingMatrix: matrix,
      realizedPreteritMatrix: matrix === "ē"
        ? "eh"
        : matrix === "huā"
          ? "huah"
          : "yō-h",
      finalPreteritMorph: "0",
      preteritOnly: true,
      finiteVncContinuation: matrix === "yō-ā"
        ? "typed-owner-continuation"
        : "connective-t-only",
      supportiveFinalIDeletes:
        ownerhoodSourceAnalysisFrame.supportiveFinalIDeletesBeforeE,
      glottalizedFinalHMayBecomeY:
        ownerhoodSourceAnalysisFrame.glottalizedFinalHMayBecomeYBeforeE,
      finalZSpellsC:
        ownerhoodSourceAnalysisFrame.finalZSpellsCBeforeE,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    }),
    targetStems: {
      restrictedUse,
      generalUse,
    },
    nounClass: "zero",
    nncFamily: matrix === "yō-ā" ? "abundant-ownerhood-agentive" : "ownerhood-agentive",
    connectorProfile: "preterit-agentive",
    singularConnectorChoice: normalizeKey(request.numberConnector || "silent"),
    singularConnectorOptions: matrix === "yō-ā"
      ? ["silent"]
      : ["silent", "qui"],
    singularConnectorChoiceRequired: matrix !== "yō-ā"
      && ["3sg", "3common"].includes(normalizeSubject(request.subject || "3sg"))
      && normalizeKey(request.numberConnector || "") === "",
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
    exampleStemMembershipRequired: false,
    typedOperationAuthority: true,
    callerSuppliedDerivedAuthorityAccepted: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
  return { sourceFrame, operationFrame, blockReason: "" };
}

function captureActionNncResultForContinuation(
  result = null,
  target = globalThis
) {
  const context = ACTION_NNC_CONTINUATION_CONTEXTS.get(result) || null;
  const applicationProjection = typeof target
    ?.getClassicalNahuatlNncContinuationSourceConstituents === "function"
    ? target.getClassicalNahuatlNncContinuationSourceConstituents(result)
    : null;
  const internalProjection = context
    && ISSUED_NNC_SLOT_FRAMES.has(result?.nncSlotFrame)
    && result?.authorizationStatus === "authorized"
    ? deepFreeze({
      kind:
        "classical-nahuatl-deverbal-nnc-result-source-constituent-projection",
      version: VERSION,
      canonicalResultFrame: result,
      canonicalSourceFrame: context.sourceFrame,
      canonicalOperationFrame: context.operationFrame,
      typedSlotFrame: result.nncSlotFrame,
      sourceIdentityStem:
        context.operationFrame?.targetStems?.restrictedUse || "",
      predicateStem: result.nncSlotFrame?.slots?.predicate?.stem || "",
      sourceNounClass: context.operationFrame?.nounClass || "",
      state: result.state || "absolutive",
      possessor: result.possessor || "",
      projectionRole: "read-only-source-constituents",
      grammarAuthority: false,
      callerSuppliedAuthorityAccepted: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    })
    : null;
  const projection = applicationProjection || internalProjection;
  if (!context || !projection) {
    return deepFreeze({
      kind:
        "classical-nahuatl-action-nnc-continuation-capture-frame",
      version: VERSION,
      authorizationStatus: "blocked",
      blockReason: "exact-owner-issued-active-action-nnc-result-required",
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
  }
  const action = context.operationFrame?.deverbalActionFrame || null;
  const sourceDeverbalNounstemAxisFrame =
    context.operationFrame?.deverbalNounstemAxisFrame || null;
  const predicateActionKind = context.operationFrame?.constructionKind
      === "predicate-nominalization"
    ? context.operationFrame?.nominalizationKind || ""
    : "";
  const isPredicateAction = ["passive-action", "active-action"].includes(
    predicateActionKind
  ) && context.operationFrame?.actionCharacteristicFrame
    ?.authorizationStatus === "authorized";
  const isDerivedActiveAction = (
    context.operationFrame?.actionKind === "active-action"
    && ["z", "liz"].includes(context.operationFrame?.actionSuffix)
    && action?.exactVncResultIdentityPreserved
    && sourceDeverbalNounstemAxisFrame?.authorizationStatus
      === "authorized"
    && sourceDeverbalNounstemAxisFrame.structuralContractSatisfied === true
  );
  if (!isPredicateAction && !isDerivedActiveAction) {
    return deepFreeze({
      kind:
        "classical-nahuatl-action-nnc-continuation-capture-frame",
      version: VERSION,
      authorizationStatus: "blocked",
      blockReason:
        "exact-owner-issued-active-or-passive-action-nnc-result-required",
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
  }
  const sourceStem = isPredicateAction
    ? context.operationFrame.targetStems?.generalUse || ""
    : projection.predicateStem;
  const sourceIdentityStem = isPredicateAction
    ? context.operationFrame.targetStems?.restrictedUse || ""
    : projection.sourceIdentityStem;
  const sourceUnit = isPredicateAction
    ? `owner-issued-${predicateActionKind}-nnc-result`
    : "owner-issued-active-action-nnc-result";
  const derivationKind = isPredicateAction
    ? `${predicateActionKind}-characteristic`
    : `active-action-${context.operationFrame.actionSuffix}`;
  const frame = deepFreeze({
    kind: "classical-nahuatl-action-nnc-continuation-capture-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    blockReason: "",
    canonicalActionNncResult: result,
    canonicalActionNncSourceFrame: context.sourceFrame,
    canonicalActionNncOperationFrame: context.operationFrame,
    sourceDeverbalNounstemAxisFrame: isDerivedActiveAction
      ? sourceDeverbalNounstemAxisFrame
      : null,
    canonicalFutureVncResult: isPredicateAction
      ? context.sourceFrame?.canonicalVncResult || null
      : action.canonicalVncResult,
    continuationProjection: projection,
    sourceUnit,
    sourceStage: "derived-action-nounstem",
    sourceStem,
    sourceIdentityStem,
    sourceNounClass: projection.sourceNounClass,
    sourceState: projection.state,
    possessor: projection.possessor,
    derivationKind,
    actionKind: isPredicateAction
      ? predicateActionKind
      : context.operationFrame.actionKind,
    actionSuffix: context.operationFrame.actionSuffix || "",
    actionStemRule: context.operationFrame.stemRule || "",
    actionCharacteristicFrame:
      context.operationFrame.actionCharacteristicFrame || null,
    characteristicContinuationAvailable: isPredicateAction,
    canonicalSourceAnalysisPreserved: true,
    exactResultIdentityPreserved: true,
    projectionRole:
      "read-only-owner-issued-action-nnc-result-to-compound-source",
    grammarAuthority: false,
    callerSuppliedAuthorityAccepted: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
  ISSUED_ACTION_NNC_CONTINUATION_CAPTURE_FRAMES.add(frame);
  return frame;
}

function isClassicalNahuatlActionNncContinuationCaptureFrame(
  frame = null
) {
  return Boolean(
    ISSUED_ACTION_NNC_CONTINUATION_CAPTURE_FRAMES.has(frame)
    && frame?.kind
      === "classical-nahuatl-action-nnc-continuation-capture-frame"
    && frame.version === VERSION
    && frame.authorizationStatus === "authorized"
    && frame.exactResultIdentityPreserved === true
    && frame.callerSuppliedAuthorityAccepted === false
    && frame.formulaStringAuthority === false
    && frame.surfaceStringAuthority === false
    && Object.isFrozen(frame)
  );
}

function capturePatientiveNncResultForMatrixContinuation(
  result = null,
  target = globalThis
) {
  const context = PATIENTIVE_NNC_CONTINUATION_CONTEXTS.get(result) || null;
  const applicationProjection = typeof target
    ?.getClassicalNahuatlNncContinuationSourceConstituents === "function"
    ? target.getClassicalNahuatlNncContinuationSourceConstituents(result)
    : null;
  const internalProjection = context
    && ISSUED_NNC_SLOT_FRAMES.has(result?.nncSlotFrame)
    && result?.authorizationStatus === "authorized"
    ? deepFreeze({
      kind:
        "classical-nahuatl-deverbal-nnc-result-source-constituent-projection",
      version: VERSION,
      canonicalResultFrame: result,
      canonicalSourceFrame: context.sourceFrame,
      canonicalOperationFrame: context.operationFrame,
      typedSlotFrame: result.nncSlotFrame,
      sourceIdentityStem:
        context.operationFrame?.targetStems?.restrictedUse || "",
      predicateStem: result.nncSlotFrame?.slots?.predicate?.stem || "",
      sourceNounClass: context.operationFrame?.nounClass || "",
      state: result.state || "absolutive",
      possessor: result.possessor || "",
      projectionRole: "read-only-source-constituents",
      grammarAuthority: false,
      callerSuppliedAuthorityAccepted: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    })
    : null;
  const projection = applicationProjection || internalProjection;
  if (!context || !projection) {
    return deepFreeze({
      kind:
        "classical-nahuatl-patientive-nnc-matrix-continuation-capture-frame",
      version: VERSION,
      authorizationStatus: "blocked",
      blockReason: "exact-owner-issued-patientive-nnc-result-required",
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
  }
  const operation = context.operationFrame || null;
  const sourceDeverbalNounstemAxisFrame =
    operation?.deverbalNounstemAxisFrame || null;
  const characteristicPropertyPatientive = Boolean(
    operation?.constructionKind === "patientive"
    && operation?.patientiveKind === "characteristic-property"
  );
  if (
    operation?.constructionKind !== "patientive"
    || !["ordinary", "characteristic-property"].includes(
      operation?.patientiveKind
    )
    || sourceDeverbalNounstemAxisFrame?.authorizationStatus !== "authorized"
    || sourceDeverbalNounstemAxisFrame.structuralContractSatisfied !== true
  ) {
    return deepFreeze({
      kind:
        "classical-nahuatl-patientive-nnc-matrix-continuation-capture-frame",
      version: VERSION,
      authorizationStatus: "blocked",
      blockReason: "38.2.2-or-39.9-patientive-nnc-result-required",
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
  }
  const canonicalVncResult = operation
    ?.impersonalPatientiveFoundationFrame?.canonicalImpersonalVncResult
    || operation?.passivePatientiveFoundationFrame?.canonicalPassiveVncResult
    || operation?.patientiveHumanNonhumanContrastFrame?.canonicalVncResult
    || operation?.imperfectivePatientiveFrame
      ?.canonicalActivePresentVncResult
    || operation?.perfectivePatientiveFrame
      ?.canonicalActivePreteritVncResult
    || operation?.characteristicPreteritAgentiveFrame
      ?.canonicalPredicateNominalizationSourceFrame?.canonicalVncResult
    || null;
  const realizedObjectPattern = normalizeKey(
    operation?.imperfectiveImpersonalPatientiveFrame
      ?.realizedObjectPattern
    || operation?.imperfectivePatientiveFrame?.realizedObjectPattern
    || operation?.perfectivePatientiveFrame?.realizedObjectPattern
    || "none"
  );
  const participantCarrierSequence = Object.freeze([
    ...(operation?.impersonalPatientiveObjectFrame?.carrierSequence
      || operation?.imperfectiveImpersonalPatientiveFrame?.carrierSequence
      || ({
        "nonspecific-human": ["tē"],
        "nonspecific-nonhuman": ["tla"],
        "human-and-nonhuman": ["tē", "tla"],
        reflexive: ["ne"],
        reciprocal: ["ne"],
      })[realizedObjectPattern]
      || []),
  ].map(normalizeStem).filter(Boolean));
  const predicateMorphs = normalizeStem(projection.predicateStem)
    .split("-").filter(Boolean);
  const participantCarriersMatch = participantCarrierSequence.length > 0
    && participantCarrierSequence.every(
      (carrier, index) => predicateMorphs[index] === carrier
    );
  const participantSeparatedSourceStem = participantCarriersMatch
    ? predicateMorphs.slice(participantCarrierSequence.length).join("-")
    : normalizeStem(projection.predicateStem);
  const characteristicFoundation = characteristicPropertyPatientive
    ? operation?.characteristicPatientiveFoundationFrame || null
    : null;
  const characteristicMatrixFullEmbedStem = characteristicPropertyPatientive
    ? normalizeStem(
      operation?.targetStems?.restrictedUse || projection.predicateStem
    )
    : "";
  const characteristicMatrixOmittedEmbedStem = characteristicPropertyPatientive
    ? normalizeStem(characteristicFoundation?.characteristicEmbedStem)
    : "";
  const frame = deepFreeze({
    kind:
      "classical-nahuatl-patientive-nnc-matrix-continuation-capture-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    blockReason: "",
    canonicalPatientiveNncResult: result,
    canonicalPatientiveSourceFrame: context.sourceFrame,
    canonicalPatientiveOperationFrame: operation,
    sourceDeverbalNounstemAxisFrame,
    canonicalVncResult,
    continuationProjection: projection,
    sourceUnit: "owner-issued-patientive-nnc-result",
    sourceStage: "derived-patientive-nounstem",
    sourceStem: characteristicMatrixFullEmbedStem
      || projection.predicateStem,
    restrictedUseStem: normalizeStem(
      operation?.targetStems?.restrictedUse
      || projection.sourceIdentityStem
      || projection.predicateStem
    ),
    generalUseStem: normalizeStem(
      operation?.targetStems?.generalUse
      || projection.predicateStem
    ),
    participantCarrierSequence,
    participantSeparatedSourceStem,
    participantCarriersSeparatedOnlyByTypedContinuation:
      participantCarriersMatch,
    sourceIdentityStem: projection.sourceIdentityStem,
    sourceNounClass: operation.nounClass,
    sourceCompoundClass:
      compoundSourceClassForPatientiveNounClass(operation.nounClass),
    sourceState: projection.state,
    possessor: projection.possessor,
    patientiveSourceFamily: characteristicPropertyPatientive
      ? "characteristic-property-patientive"
      : operation.patientiveSourceFamily,
    patientiveKind: operation.patientiveKind,
    characteristicPropertyPatientive,
    characteristicPatientiveFoundationFrame: characteristicFoundation,
    characteristicMatrixFullEmbedStem,
    characteristicMatrixOmittedEmbedStem,
    characteristicMatrixOmissionAvailable: Boolean(
      characteristicMatrixFullEmbedStem
      && characteristicMatrixOmittedEmbedStem
      && characteristicMatrixFullEmbedStem
        !== characteristicMatrixOmittedEmbedStem
    ),
    patientiveDerivationPreserved: true,
    verbalAncestryPreserved: Boolean(canonicalVncResult),
    canonicalSourceAnalysisPreserved: true,
    exactResultIdentityPreserved: true,
    eligibleCompoundRoles: Object.freeze(["embed", "matrix"]),
    continuationRoleSelectedByConsumer: true,
    nounstemStringAuthorityAccepted: false,
    projectionRole:
      "read-only-owner-issued-patientive-nnc-result-to-compound-matrix",
    grammarAuthority: false,
    callerSuppliedAuthorityAccepted: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
  ISSUED_PATIENTIVE_NNC_CONTINUATION_CAPTURE_FRAMES.add(frame);
  return frame;
}

function isClassicalNahuatlPatientiveNncContinuationCaptureFrame(
  frame = null
) {
  return Boolean(
    ISSUED_PATIENTIVE_NNC_CONTINUATION_CAPTURE_FRAMES.has(frame)
    && frame?.kind
      === "classical-nahuatl-patientive-nnc-matrix-continuation-capture-frame"
    && frame.version === VERSION
    && frame.authorizationStatus === "authorized"
    && frame.exactResultIdentityPreserved === true
    && frame.sourceDeverbalNounstemAxisFrame?.structuralContractSatisfied
      === true
    && frame.callerSuppliedAuthorityAccepted === false
    && frame.formulaStringAuthority === false
    && frame.surfaceStringAuthority === false
    && Object.isFrozen(frame)
  );
}

function nounClassFromCompoundSourceClass(sourceClass = "") {
  const normalized = normalizeKey(sourceClass);
  if (normalized === "zero" || normalized === "in") return normalized;
  if (normalized.startsWith("tli-")) return "tli";
  if (normalized.startsWith("tl-")) return "tl";
  return "";
}

function compoundSourceClassForPatientiveNounClass(nounClass = "") {
  return ({
    zero: "zero",
    in: "in",
    tli: "tli-1",
    tl: "tl-1-a",
  })[normalizeNounClass(nounClass)] || "";
}

function buildPatientiveMatrixContinuationOperation(
  request = {},
  target = globalThis,
  preparedSourceFrame = null
) {
  const source = request.source && typeof request.source === "object"
    ? request.source
    : request;
  const suppliedGrammarFrame = request.canonicalPatientiveNncGrammarFrame
    || source.canonicalPatientiveNncGrammarFrame
    || null;
  if (
    suppliedGrammarFrame
    && (
      !isClassicalNahuatlDeverbalNncGrammarFrame(suppliedGrammarFrame)
      || suppliedGrammarFrame.constructionKind !== "patientive"
      || suppliedGrammarFrame.operationFrame?.patientiveKind !== "ordinary"
    )
  ) {
    return {
      sourceFrame: null,
      operationFrame: null,
      canonicalResult: null,
      blockReason: "38.2.2-owner-issued-patientive-nnc-result-required",
    };
  }
  const suppliedResult = suppliedGrammarFrame?.canonicalResult
    || request.canonicalPatientiveNncResult
    || source.canonicalPatientiveNncResult
    || null;
  const capture = capturePatientiveNncResultForMatrixContinuation(
    suppliedResult,
    target
  );
  if (!isClassicalNahuatlPatientiveNncContinuationCaptureFrame(capture)) {
    return {
      sourceFrame: null,
      operationFrame: null,
      canonicalResult: null,
      blockReason: capture.blockReason,
    };
  }
  const embedStem = normalizeStem(source.embedStem || request.embedStem);
  const embedSourceClass = normalizeKey(
    source.embedSourceClass || source.embedClass || request.embedSourceClass
  );
  const embedClass = nounClassFromCompoundSourceClass(embedSourceClass);
  const embedRole = normalizeKey(
    request.embedRole || source.embedRole || ""
  );
  if (!embedStem || !embedClass) {
    return {
      sourceFrame: null,
      operationFrame: null,
      canonicalResult: null,
      blockReason: "38.2.2-typed-compound-embed-and-class-required",
    };
  }
  if (!PATIENTIVE_MATRIX_COMPOUND_RELATIONS.includes(embedRole)) {
    return {
      sourceFrame: null,
      operationFrame: null,
      canonicalResult: null,
      blockReason: "38.2.2-licensed-embed-matrix-relation-required",
    };
  }
  const matrixStem = capture.sourceStem;
  const matrixClass = capture.sourceNounClass;
  const matrixSourceClass = compoundSourceClassForPatientiveNounClass(
    matrixClass
  );
  const matrixBridgeFrame = target
    .issueClassicalNahuatlPatientiveMatrixConstituentFrame?.(capture)
    || null;
  if (!matrixBridgeFrame) {
    return {
      sourceFrame: null,
      operationFrame: null,
      canonicalResult: null,
      blockReason: "38.2.2-canonical-patientive-matrix-bridge-unavailable",
    };
  }
  const sourceFrame = buildSourceFrame({
    ...request,
    source: {
      sourceUnit: capture.sourceUnit,
      sourceStage: capture.sourceStage,
      sourceStem: matrixStem,
      sourceVoice: "active",
      sourceValence: "intransitive",
      sourceObjectPattern: "none",
      patientiveNncContinuationCaptureFrame: capture,
    },
  }, "derived-patientive-nounstem", preparedSourceFrame);
  if (sourceFrame.authorizationStatus !== "authorized") {
    return {
      sourceFrame,
      operationFrame: null,
      canonicalResult: null,
      blockReason: sourceFrame.blockReason,
    };
  }
  if (typeof target.evaluateClassicalNahuatlNominalConstruction !== "function") {
    return {
      sourceFrame,
      operationFrame: null,
      canonicalResult: null,
      blockReason: "canonical-compound-nnc-evaluator-unavailable",
    };
  }
  const canonicalResult = target.evaluateClassicalNahuatlNominalConstruction({
    constructionKind: "compound-nnc",
    source: {
      embedStem,
      embedClass,
      embedSourceClass,
      matrixStem,
      matrixClass,
      matrixSourceClass,
      matrixConstituent: {
        kind: "patientive-nnc",
        stem: matrixStem,
        resultFrame: suppliedResult,
        bridgeFrame: matrixBridgeFrame,
      },
    },
    structure: "integrated",
    embedRole,
    possessorOrientation: "matrix",
    subject: normalizeSubject(request.subject || "3sg"),
    state: normalizeKey(request.state || "absolutive"),
    possessor: normalizeSubject(request.possessor),
    animacy: normalizeKey(request.animacy || "nonanimate"),
  });
  if (canonicalResult?.authorizationStatus !== "authorized") {
    return {
      sourceFrame,
      operationFrame: null,
      canonicalResult,
      blockReason: canonicalResult?.blockReason
        || "38.2.2-canonical-compound-result-blocked",
    };
  }
  const compoundOperation = canonicalResult.operationFrame || {};
  const frame = deepFreeze({
    kind:
      "classical-nahuatl-lesson38-patientive-matrix-compound-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    canonicalPatientiveNncGrammarFrame: suppliedGrammarFrame,
    canonicalPatientiveNncResult: suppliedResult,
    canonicalPatientiveSourceFrame: capture.canonicalPatientiveSourceFrame,
    canonicalPatientiveOperationFrame:
      capture.canonicalPatientiveOperationFrame,
    canonicalVncResult: capture.canonicalVncResult,
    canonicalCompoundNncResult: canonicalResult,
    continuationProjection: capture.continuationProjection,
    exactPatientiveResultIdentityPreserved:
      capture.canonicalPatientiveNncResult === suppliedResult,
    exactPatientiveMatrixIdentityPreserved:
      capture.canonicalPatientiveNncResult === suppliedResult,
    patientiveDerivationPreserved: capture.patientiveDerivationPreserved,
    verbalAncestryPreserved: capture.verbalAncestryPreserved,
    canonicalSourceAnalysisPreserved:
      capture.canonicalSourceAnalysisPreserved,
    embedStem,
    embedSourceClass,
    embedClass,
    selectedRelation: embedRole,
    matrixStem,
    matrixClass,
    compoundStem: compoundOperation.compoundStem || "",
    embedShapeFrame: compoundOperation.embedShape || null,
    matrixSourceClassFrame:
      compoundOperation.matrixSourceClassFrame || null,
    sourceConstituentOrder: Object.freeze(["embed", "matrix"]),
    matrixGovernsResultClass:
      compoundOperation.matrixClass === matrixClass,
    boundaryBehaviorDerivedAutomatically: true,
    embedAndRelationSelectedByUser: true,
    typedEmbedSelectedByUser: true,
    relationSelectedByUser: true,
    patientiveMatrixSelectedByUser: false,
    matrixReconstructedFromSurfaceSpelling: false,
    derivationalHistoryRequiredForFinalShapeAndMeaning: true,
    sourceAssimilationBelongsToTypedHistory: true,
    recursiveTypedSourceHistoryPreserved: true,
    compositionalMeaningAvailable: true,
    lexicalMeaningRequiresTypedSourceOrContext: true,
    compatibleUnlistedPatientiveMatricesRemainProductive: true,
    copiedResultAccepted: false,
    formulaOrSurfaceAuthorityAccepted: false,
    exampleIdentityAuthorizesContinuation: false,
    grammarAuthority: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
  const operationFrame = deepFreeze({
    kind: "classical-nahuatl-deverbal-nnc-operation-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    operationId: "patientive-matrix-continuation:compound-nnc",
    constructionKind: "patientive-matrix-continuation",
    continuationRelation: "patientive-result-as-compound-matrix",
    sourceDeverbalNounstemAxisFrame:
      capture.sourceDeverbalNounstemAxisFrame,
    patientiveMatrixCompoundFrame: frame,
    targetStems: {
      restrictedUse: frame.compoundStem,
      generalUse: frame.compoundStem,
    },
    nounClass: matrixClass,
    nncFamily: "patientive-matrix-compound",
    connectorProfile:
      matrixClass === "tl" ? "derived-tl" : "derived-tli",
    pluralConnector: matrixClass === "tl" ? "m-eh" : "t-in",
    possessiveSingularConnector: "0",
    allowedStates: ["absolutive", "possessive"],
    defaultState: "absolutive",
    defaultAnimacy: normalizeKey(request.animacy || "nonanimate"),
    transformedPossessor: "",
    appliedSemanticRules: Object.freeze([
      "38.2.2-owner-issued-patientive-result-as-compound-matrix",
      ...(compoundOperation.appliedSemanticRules || []),
    ]),
    typedOperationAuthority: true,
    callerSuppliedDerivedAuthorityAccepted: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
  return {
    sourceFrame,
    operationFrame,
    canonicalResult,
    canonicalTargetEvaluator:
      "evaluateClassicalNahuatlNominalConstruction",
    blockReason: "",
  };
}

function buildPatientiveEmbedContinuationOperation(
  request = {},
  target = globalThis,
  preparedSourceFrame = null
) {
  const source = request.source && typeof request.source === "object"
    ? request.source
    : request;
  const suppliedGrammarFrame = request.canonicalPatientiveNncGrammarFrame
    || source.canonicalPatientiveNncGrammarFrame
    || null;
  if (
    suppliedGrammarFrame
    && (
      !isClassicalNahuatlDeverbalNncGrammarFrame(suppliedGrammarFrame)
      || suppliedGrammarFrame.constructionKind !== "patientive"
      || !["ordinary", "characteristic-property"].includes(
        suppliedGrammarFrame.operationFrame?.patientiveKind
      )
    )
  ) {
    return {
      sourceFrame: null,
      operationFrame: null,
      canonicalResult: null,
      blockReason:
        "39.6-owner-issued-patientive-nnc-grammar-frame-required",
    };
  }
  const suppliedResult = request.canonicalPatientiveNncResult
    || source.canonicalPatientiveNncResult
    || suppliedGrammarFrame?.canonicalResult
    || null;
  const capture = capturePatientiveNncResultForMatrixContinuation(
    suppliedResult,
    target
  );
  if (!isClassicalNahuatlPatientiveNncContinuationCaptureFrame(capture)) {
    return {
      sourceFrame: null,
      operationFrame: null,
      canonicalResult: null,
      blockReason: suppliedResult
        ? capture.blockReason
        : "39.6-exact-owner-issued-patientive-nnc-result-required",
    };
  }
  const characteristicMatrixRealization = normalizeKey(
    request.characteristicMatrixRealization
    || source.characteristicMatrixRealization
  );
  if (
    capture.characteristicMatrixOmissionAvailable
    && !["full", "omitted"].includes(characteristicMatrixRealization)
  ) {
    return {
      sourceFrame: null,
      operationFrame: null,
      canonicalResult: null,
      blockReason:
        "39.9-full-or-omitted-characteristic-matrix-choice-required",
    };
  }
  const selectedCharacteristicEmbedStem =
    characteristicMatrixRealization === "omitted"
      ? capture.characteristicMatrixOmittedEmbedStem
      : capture.sourceStem;
  const embedBridgeFrame = target
    .issueClassicalNahuatlPatientiveEmbedConstituentFrame?.(capture)
    || null;
  if (!embedBridgeFrame) {
    return {
      sourceFrame: null,
      operationFrame: null,
      canonicalResult: null,
      blockReason: "39.6-canonical-patientive-embed-bridge-unavailable",
    };
  }
  const compoundTargetKind = normalizeKey(
    request.compoundTargetKind || source.compoundTargetKind
  );
  if (!["nnc", "vnc"].includes(compoundTargetKind)) {
    return {
      sourceFrame: null,
      operationFrame: null,
      canonicalResult: null,
      blockReason: "39.6-patientive-compound-target-kind-required",
    };
  }
  const matrixStem = normalizeStem(source.matrixStem || request.matrixStem);
  if (!matrixStem) {
    return {
      sourceFrame: null,
      operationFrame: null,
      canonicalResult: null,
      blockReason: "39.6-typed-compound-matrix-required",
    };
  }
  const selectedRelation = normalizeKey(
    request.relation || request.embedRole || source.relation
      || source.embedRole
  );
  if (!selectedRelation) {
    return {
      sourceFrame: null,
      operationFrame: null,
      canonicalResult: null,
      blockReason: "39.6-genuine-compound-relation-choice-required",
    };
  }
  const sourceFrame = buildSourceFrame({
    ...request,
    source: {
      sourceUnit: capture.sourceUnit,
      sourceStage: capture.sourceStage,
      sourceStem: capture.sourceStem,
      sourceVoice: "active",
      sourceValence: "intransitive",
      sourceObjectPattern: "none",
      patientiveNncContinuationCaptureFrame: capture,
    },
  }, "derived-patientive-nounstem", preparedSourceFrame);
  if (sourceFrame.authorizationStatus !== "authorized") {
    return {
      sourceFrame,
      operationFrame: null,
      canonicalResult: null,
      blockReason: sourceFrame.blockReason,
    };
  }
  if (typeof target.evaluateClassicalNahuatlNominalConstruction !== "function") {
    return {
      sourceFrame,
      operationFrame: null,
      canonicalResult: null,
      blockReason: "39.6-canonical-compound-evaluator-unavailable",
    };
  }
  const embedConstituent = {
    kind: "patientive-nnc",
    stem: selectedCharacteristicEmbedStem,
    resultFrame: suppliedResult,
    bridgeFrame: embedBridgeFrame,
  };
  const matrixNounClass = normalizeNounClass(
    source.matrixNounClass || source.matrixClass || request.matrixNounClass
      || request.matrixClass
  );
  const matrixSourceClass = normalizeKey(
    source.matrixSourceClass || request.matrixSourceClass
  ) || compoundSourceClassForPatientiveNounClass(matrixNounClass);
  const matrixSemanticFamily = normalizeKey(
    source.matrixSemanticFamily || request.matrixSemanticFamily
      || "typed-matrix"
  );
  const patientiveSourceVncProjection = capture.canonicalVncResult
    && typeof target
      ?.getClassicalNahuatlVncContinuationSourceConstituents === "function"
    ? target.getClassicalNahuatlVncContinuationSourceConstituents(
      capture.canonicalVncResult
    )
    : null;
  const selectedComplementKind = normalizeKey(
    request.complementKind || "considering"
  );
  const selectedComplementOrientation = normalizeKey(
    request.orientation
      || (selectedRelation === "complement" ? "object" : "subject")
  );
  const isPossessiveTlaniTypeThreeCausative = Boolean(
    compoundTargetKind === "vnc"
    && capture.sourceState === "possessive"
    && selectedRelation === "complement"
    && selectedComplementOrientation === "object"
    && selectedComplementKind === "desiring"
    && normalizeStem(matrixStem) === "tlani"
    && matrixSemanticFamily === "short-a-type-three-causative-tlani"
  );
  const isPossessivePatientiveIncorporatedObject = Boolean(
    compoundTargetKind === "vnc"
    && capture.sourceState === "possessive"
    && selectedRelation === "object"
    && matrixSemanticFamily === "patientive-incorporated-object-matrix"
  );
  const inheritedTypeThreeObjectRequests = Object.freeze(
    isPossessiveTlaniTypeThreeCausative
      ? (patientiveSourceVncProjection?.sourceObjectRequests || []).map(
        (objectRequest, index) => Object.freeze({
          objectId: normalizeKey(
            objectRequest?.objectId || `patientive-source-object-${index + 1}`
          ),
          objectKind: normalizeKey(
            objectRequest?.objectKind || "specific-projective"
          ),
          objectPerson: normalizeKey(objectRequest?.objectPerson || ""),
          governor: normalizeKey(
            objectRequest?.governor || (index ? "shuntline" : "directive")
          ),
          derivationalLevel: Number(
            objectRequest?.derivationalLevel || index + 1
          ),
          ...(objectRequest?.silentSpecificObject === true
            ? { silentSpecificObject: true }
            : {}),
        })
      )
      : []
  );
  const selectedPatientiveEmbedStem = capture.characteristicPropertyPatientive
    ? selectedCharacteristicEmbedStem
    : isPossessivePatientiveIncorporatedObject
    ? normalizeStem(
      embedBridgeFrame.restrictedUseEmbedStem
      || capture.restrictedUseStem
      || capture.sourceIdentityStem
      || capture.sourceStem
    )
    : isPossessiveTlaniTypeThreeCausative
    ? normalizeStem(
      embedBridgeFrame.participantSeparatedEmbedStem || capture.sourceStem
    )
    : capture.sourceStem;
  const selectedEmbedConstituent = (
    isPossessivePatientiveIncorporatedObject
    || isPossessiveTlaniTypeThreeCausative
  )
    ? {
      ...embedConstituent,
      stem: selectedPatientiveEmbedStem,
    }
    : embedConstituent;
  const canonicalResult = compoundTargetKind === "nnc"
    ? target.evaluateClassicalNahuatlNominalConstruction({
      constructionKind: "compound-nnc",
      source: {
        embedStem: selectedCharacteristicEmbedStem,
        embedClass: capture.sourceNounClass,
        embedSourceClass: capture.sourceCompoundClass,
        embedConstituent: {
          ...embedConstituent,
          stem: selectedCharacteristicEmbedStem,
        },
        matrixStem,
        matrixClass: matrixNounClass,
        matrixSourceClass,
      },
      structure: "integrated",
      embedRole: selectedRelation,
      possessorOrientation: normalizeKey(
        request.possessorOrientation || "matrix"
      ),
      subject: normalizeSubject(request.subject || "3sg"),
      state: normalizeKey(request.state || "absolutive"),
      possessor: normalizeSubject(request.possessor || "3sg"),
      animacy: normalizeKey(request.animacy || "nonanimate"),
    })
    : target.evaluateClassicalNahuatlNominalConstruction({
      constructionKind: "nominal-embed-vnc",
      source: {
        embedStem: selectedPatientiveEmbedStem,
        embedClass: capture.sourceNounClass,
        embedConstituent: selectedEmbedConstituent,
        matrixStem,
        matrixVerbClass: normalizeToken(
          source.matrixVerbClass || request.matrixVerbClass || "A"
        ).toUpperCase(),
        matrixValence: isPossessiveTlaniTypeThreeCausative
          ? matrixValenceFromExactObjectRequests(
            inheritedTypeThreeObjectRequests
          )
          : normalizeKey(
            source.matrixValence || request.matrixValence || "intransitive"
          ),
        matrixSemanticFamily,
        sourceObjectRequests: isPossessiveTlaniTypeThreeCausative
          ? inheritedTypeThreeObjectRequests
          : Array.isArray(source.sourceObjectRequests)
            ? source.sourceObjectRequests
            : Array.isArray(request.sourceObjectRequests)
              ? request.sourceObjectRequests
              : undefined,
        objectKind: normalizeKey(
          source.objectKind || request.objectKind
        ),
        embedState: capture.sourceState,
        embedPossessorPerson: capture.possessor,
        embedPossessorCorefersWithSubject:
          source.embedPossessorCorefersWithSubject === true
          || request.embedPossessorCorefersWithSubject === true,
        embedPossessorReferenceId: normalizeKey(
          source.embedPossessorReferenceId
          || request.embedPossessorReferenceId
        ),
        objectPerson: normalizeSubject(
          source.objectPerson || request.objectPerson || "3sg"
        ),
        objectReferenceIds: Array.isArray(source.objectReferenceIds)
          ? source.objectReferenceIds
          : undefined,
        complementKindCandidates: Array.isArray(
          source.complementKindCandidates
        )
          ? source.complementKindCandidates
          : Array.isArray(request.complementKindCandidates)
            ? request.complementKindCandidates
            : undefined,
        embedSubjectReferenceId: normalizeKey(
          source.embedSubjectReferenceId
            || request.embedSubjectReferenceId
        ),
      },
      relation: selectedRelation,
      route: selectedRelation === "adverb"
        ? "direct-adverb"
        : selectedRelation,
      adverbRole: normalizeKey(request.adverbRole || "manner"),
      orientation: selectedComplementOrientation,
      complementKind: selectedComplementKind,
      subject: normalizeSubject(request.subject || "3sg"),
      mood: normalizeKey(request.mood || "indicative"),
      tense: normalizeKey(request.tense || "present"),
      voice: normalizeKey(request.voice || "active"),
      nonactiveOptionId: normalizeKey(
        request.nonactiveOptionId || source.nonactiveOptionId
      ),
      objectPerson: normalizeSubject(request.objectPerson || "3sg"),
    });
  if (canonicalResult?.authorizationStatus !== "authorized") {
    return {
      sourceFrame,
      operationFrame: null,
      canonicalResult,
      blockReason: canonicalResult?.blockReason
        || "39.6-canonical-patientive-embed-compound-blocked",
    };
  }
  const compoundOperation = canonicalResult.operationFrame || {};
  const patientiveObjectComplement = compoundTargetKind === "vnc"
    && selectedRelation === "complement"
    && compoundOperation.complementReferenceFrame?.orientation === "object";
  const complementReferenceFrame = patientiveObjectComplement
    ? compoundOperation.complementReferenceFrame || null
    : null;
  const complementScopeFrame = patientiveObjectComplement
    ? compoundOperation.complementScopeFrame || null
    : null;
  const matrixObjectRequest = Array.isArray(
    compoundOperation.targetObjectRequests
  )
    ? compoundOperation.targetObjectRequests.find(objectRequest => (
      objectRequest?.objectId
        === complementReferenceFrame?.complementTargetReferenceId
    )) || compoundOperation.targetObjectRequests[0] || null
    : null;
  const patientiveOwnerhoodFoundationFrame = patientiveObjectComplement
    ? deepFreeze({
      kind:
        "classical-nahuatl-lesson39-patientive-ownerhood-foundation-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      canonicalPatientiveNncResult: suppliedResult,
      canonicalPatientiveSourceFrame: capture.canonicalPatientiveSourceFrame,
      canonicalPatientiveOperationFrame:
        capture.canonicalPatientiveOperationFrame,
      exactPatientiveResultIdentityPreserved:
        capture.canonicalPatientiveNncResult === suppliedResult,
      patientiveSourceState: capture.sourceState,
      patientiveSourceStateAlternatives: Object.freeze([
        "absolutive", "possessive",
      ]),
      patientiveResultServesAsObjectComplement: true,
      discardedPatientiveSubjectRepresentation:
        complementReferenceFrame?.embeddedSubjectRepresentation || "",
      matrixObjectReferenceId:
        complementReferenceFrame?.complementTargetReferenceId || "",
      discardedPatientiveSubjectReferenceId:
        complementReferenceFrame?.embedSubjectReferenceId || "",
      discardedSubjectCorefersWithMatrixObject:
        complementReferenceFrame?.referenceIdentityUnified === true,
      referentIdentityDerivedAutomatically:
        complementReferenceFrame
          ?.referenceIdentityDerivedFromComplementSelection === true,
      matrixStem,
      matrixVerbClass: normalizeToken(
        source.matrixVerbClass || request.matrixVerbClass || "A"
      ).toUpperCase(),
      matrixValence: normalizeKey(
        source.matrixValence || request.matrixValence || "intransitive"
      ),
      matrixSemanticFamily,
      perceptionMatrixIsLicensed: true,
      matrixRemainsSeparatelyTyped: true,
      matrixSelectionIsGenuineUserChoice: true,
      relationSelectionIsGenuineUserChoice: true,
      patientiveStateReconstructedFromSurfaceSpelling: false,
      lexicalMeaningRequiresTypedSourceOrContext: true,
      compatibleUnlistedPerceptionMatricesRemainProductive: true,
      exampleIdentityAuthorizesContinuation: false,
      copiedResultAccepted: false,
      formulaOrSurfaceAuthorityAccepted: false,
      grammarAuthority: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    })
    : null;
  const patientiveLicensedMatrixComplementFrame = patientiveObjectComplement
    && capture.sourceState === "absolutive"
    ? deepFreeze({
      kind:
        "classical-nahuatl-lesson39-patientive-licensed-matrix-complement-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      canonicalPatientiveNncResult: suppliedResult,
      canonicalPatientiveSourceFrame: capture.canonicalPatientiveSourceFrame,
      canonicalPatientiveOperationFrame:
        capture.canonicalPatientiveOperationFrame,
      canonicalPatientiveVncResult: capture.canonicalVncResult,
      patientiveSourceVncProjection,
      exactPatientiveResultIdentityPreserved:
        capture.canonicalPatientiveNncResult === suppliedResult,
      patientiveSourceState: capture.sourceState,
      patientiveSourceIdentityStem: capture.sourceIdentityStem,
      patientiveSourceMorphemicBoundaries: Object.freeze(
        normalizeStem(capture.sourceIdentityStem || capture.sourceStem)
          .split("-").filter(Boolean)
      ),
      patientiveSourceObjectRequests: Object.freeze(
        Array.isArray(patientiveSourceVncProjection?.sourceObjectRequests)
          ? patientiveSourceVncProjection.sourceObjectRequests
          : []
      ),
      nonspecificHumanObjectHistoryPreserved:
        patientiveSourceVncProjection?.sourceObjectRequests?.some(
          objectRequest => objectRequest?.objectKind === "nonspecific-human"
        ) === true,
      compoundPatientiveEmbedHistoryPreserved: Boolean(
        capture.continuationProjection?.sourceConstituents?.length > 1
        || normalizeStem(capture.sourceIdentityStem).includes("-")
      ),
      compoundYeMatrixPatientiveEmbedAllowed: true,
      matrixStem,
      matrixVerbClass: normalizeToken(
        source.matrixVerbClass || request.matrixVerbClass || "A"
      ).toUpperCase(),
      matrixValence: normalizeKey(
        source.matrixValence || request.matrixValence || "intransitive"
      ),
      matrixSemanticFamily,
      complementKind: complementScopeFrame?.complementKind || "",
      complementKindCandidates:
        complementScopeFrame?.complementKindCandidates || Object.freeze([]),
      complementKindChoiceRequired:
        complementScopeFrame?.complementKindChoiceRequired === true,
      complementKindSelectedByUser: Boolean(
        normalizeKey(request.complementKind || source.complementKind)
      ),
      matrixObjectReferenceId:
        complementReferenceFrame?.complementTargetReferenceId || "",
      matrixObjectKind: matrixObjectRequest?.objectKind || "",
      matrixObjectPerson: matrixObjectRequest?.objectPerson || "",
      matrixObjectGovernor: matrixObjectRequest?.governor || "",
      reflexiveMatrixObjectCoreferencePreserved: Boolean(
        matrixObjectRequest?.objectKind === "reflexive"
        && complementReferenceFrame?.referenceIdentityUnified === true
      ),
      applicativeMatrixObjectCoreferencePreserved: Boolean(
        matrixObjectRequest?.governor === "applicative"
        && complementReferenceFrame?.referenceIdentityUnified === true
      ),
      discardedPatientiveSubjectReferenceId:
        complementReferenceFrame?.embedSubjectReferenceId || "",
      discardedSubjectCorefersWithMatrixObject:
        complementReferenceFrame?.referenceIdentityUnified === true,
      matrixStemMembershipAuthorizesRoute: false,
      matrixAnalysisRatherThanExampleIdentityAuthorizesCompatibility: true,
      compatibleUnlistedTypedMatricesRemainProductive: true,
      compositionalReadingAvailable: true,
      lexicalReadingRequiresTypedSourceOrContext: true,
      copiedResultAccepted: false,
      formulaOrSurfaceAuthorityAccepted: false,
      grammarAuthority: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    })
    : null;
  const tlaniDesiredObjectKind = normalizeKey(
    matrixObjectRequest?.objectKind
  );
  const patientiveTlaniDesiderativeFrame = patientiveObjectComplement
    && capture.sourceState === "absolutive"
    && complementScopeFrame?.complementKind === "desiring"
    && normalizeStem(matrixStem) === "tlani"
    && [
      "reflexive",
      "nonspecific-human",
      "nonspecific-nonhuman",
    ].includes(tlaniDesiredObjectKind)
    ? deepFreeze({
      kind:
        "classical-nahuatl-lesson39-patientive-tlani-desiderative-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      canonicalPatientiveNncResult: suppliedResult,
      canonicalPatientiveSourceFrame: capture.canonicalPatientiveSourceFrame,
      canonicalPatientiveOperationFrame:
        capture.canonicalPatientiveOperationFrame,
      canonicalPatientiveVncResult: capture.canonicalVncResult,
      exactPatientiveResultIdentityPreserved:
        capture.canonicalPatientiveNncResult === suppliedResult,
      completePatientiveSourceAndVncAncestryPreserved:
        Boolean(capture.canonicalVncResult),
      patientiveSourceState: capture.sourceState,
      patientiveSourceIdentityStem: capture.sourceIdentityStem,
      patientiveSourceMorphemicBoundaries: Object.freeze(
        normalizeStem(capture.sourceIdentityStem || capture.sourceStem)
          .split("-").filter(Boolean)
      ),
      patientiveSourceFamily: capture.patientiveSourceFamily,
      matrixStem,
      matrixLexicalAnalysis: "short-a-desiderative-tlani",
      matrixFinalVowelQuantity: "short-a",
      contrastingLongAStem: "tlāni",
      contrastingLongAReading: "win-something-in-a-game",
      shortAndLongAMatricesRemainDistinct: true,
      onlyLicensedAsMatrixSubpositionInThisFormation: true,
      complementKind: "desiring",
      desiredObjectReferenceId:
        complementReferenceFrame?.complementTargetReferenceId || "",
      desiredObjectKind: tlaniDesiredObjectKind,
      desiredObjectPerson: matrixObjectRequest?.objectPerson || "",
      desiredObjectGovernor: matrixObjectRequest?.governor || "",
      objectCarrier: ({
        reflexive: "m-o",
        "nonspecific-human": "tē",
        "nonspecific-nonhuman": "tla",
      })[tlaniDesiredObjectKind],
      objectCarrierDerivedFromTypedParticipantStructure: true,
      reflexiveSubjectAndDesiredHumanCoreferential: Boolean(
        tlaniDesiredObjectKind === "reflexive"
        && complementReferenceFrame?.referenceIdentityUnified === true
      ),
      humanDesiredObjectPreserved:
        tlaniDesiredObjectKind === "nonspecific-human",
      nonhumanDesiredObjectPreserved:
        tlaniDesiredObjectKind === "nonspecific-nonhuman",
      patientiveEmbedServesAsDesiredStateOrIdentity: true,
      compositionalReadings: Object.freeze([
        "desire-object-to-become-patientive-referent",
        "desire-object-to-be-regarded-as-patientive-referent",
      ]),
      alternatePatientiveProceduresRemainDistinct: true,
      upstreamPatientiveProcedurePreservedAutomatically: true,
      fixedLexicalMatrixAnalysisRequiresExactTypedTlani: true,
      matrixStemMembershipAuthorizesGeneralPatientiveRoute: false,
      compatibleUnlistedPatientiveResultsRemainProductive: true,
      idiomaticReadingRequiresTypedLexicalSourceOrContext: true,
      examplesAuthorizeRoute: false,
      translationsAuthorizeStructure: false,
      copiedResultAccepted: false,
      formulaOrSurfaceAuthorityAccepted: false,
      grammarAuthority: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    })
    : null;
  const possessorObjectTransformationFrame = patientiveObjectComplement
    ? compoundOperation.possessiveComplementObjectTransformationFrame || null
    : null;
  const patientivePossessiveTocaFrame = patientiveObjectComplement
    && capture.sourceState === "possessive"
    && complementScopeFrame?.complementKind === "pretending"
    && normalizeStem(matrixStem) === "toca"
    && normalizeKey(matrixSemanticFamily) === "baseless-claim-matrix"
    && possessorObjectTransformationFrame?.authorizationStatus
      === "authorized"
    ? deepFreeze({
      kind:
        "classical-nahuatl-lesson39-patientive-possessive-toca-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      canonicalPatientiveNncResult: suppliedResult,
      canonicalPatientiveSourceFrame: capture.canonicalPatientiveSourceFrame,
      canonicalPatientiveOperationFrame:
        capture.canonicalPatientiveOperationFrame,
      canonicalPatientiveVncResult: capture.canonicalVncResult,
      exactPatientiveResultIdentityPreserved:
        capture.canonicalPatientiveNncResult === suppliedResult,
      completePatientiveSourceAndVncAncestryPreserved:
        Boolean(capture.canonicalVncResult),
      patientiveSourceState: capture.sourceState,
      patientiveSourcePossessor: capture.possessor,
      patientiveSourceIdentityStem: capture.sourceIdentityStem,
      patientiveSourceMorphemicBoundaries: Object.freeze(
        normalizeStem(capture.sourceIdentityStem || capture.sourceStem)
          .split("-").filter(Boolean)
      ),
      patientiveSourceFamily: capture.patientiveSourceFamily,
      matrixStem,
      matrixLexicalAnalysis: "baseless-claim-matrix",
      complementKind: "pretending",
      possessorObjectTransformationFrame,
      possessorSourceRole: possessorObjectTransformationFrame.sourceRole,
      possessorSourceCase: possessorObjectTransformationFrame.sourceCase,
      possessorTargetRole: possessorObjectTransformationFrame.targetRole,
      possessorTargetCase: possessorObjectTransformationFrame.targetCase,
      transformedObjectId: possessorObjectTransformationFrame.targetObjectId,
      transformedObjectKind:
        possessorObjectTransformationFrame.targetObjectKind,
      transformedObjectPerson:
        possessorObjectTransformationFrame.targetObjectPerson,
      transformedObjectGovernor:
        possessorObjectTransformationFrame.targetObjectGovernor,
      reflexiveWhenPossessorCorefersWithMatrixSubject:
        possessorObjectTransformationFrame.corefersWithMatrixSubject === true,
      projectiveWhenPossessorDoesNotCorefer:
        possessorObjectTransformationFrame.corefersWithMatrixSubject === false,
      sourceMatrixValence:
        possessorObjectTransformationFrame.sourceMatrixValence,
      sourceValencePositionCount:
        possessorObjectTransformationFrame.sourceValencePositionCount,
      targetValencePositionCount:
        possessorObjectTransformationFrame.targetValencePositionCount,
      valenceInflationWithoutSuffix:
        possessorObjectTransformationFrame.valenceInflationWithoutSuffix,
      ordinaryValencePrincipleViolated:
        possessorObjectTransformationFrame.ordinaryValencePrincipleViolated,
      transformationDerivedAutomatically:
        possessorObjectTransformationFrame.transformationDerivedAutomatically,
      userChoiceRequired:
        possessorObjectTransformationFrame.userChoiceRequired,
      originalMatrixObjectRequests:
        compoundOperation.sourceObjectRequests || Object.freeze([]),
      resultingMatrixObjectRequests:
        compoundOperation.targetObjectRequests || Object.freeze([]),
      compoundYeMatrixPatientiveEmbedAllowed: true,
      fixedLexicalMatrixAnalysisRequiresExactTypedToca: true,
      matrixStemMembershipAuthorizesGeneralPatientiveRoute: false,
      compatibleUnlistedPatientiveResultsRemainProductive: true,
      lexicalReadingRequiresTypedSourceOrContext: true,
      examplesAuthorizeRoute: false,
      translationsAuthorizeStructure: false,
      copiedResultAccepted: false,
      formulaOrSurfaceAuthorityAccepted: false,
      grammarAuthority: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    })
    : null;
  const patientivePossessiveTlaniCausativeFrame = patientiveObjectComplement
    && isPossessiveTlaniTypeThreeCausative
    && possessorObjectTransformationFrame?.authorizationStatus
      === "authorized"
    && possessorObjectTransformationFrame?.targetObjectGovernor
      === "causative"
    ? deepFreeze({
      kind:
        "classical-nahuatl-lesson39-patientive-possessive-tlani-causative-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      canonicalPatientiveNncResult: suppliedResult,
      canonicalPatientiveSourceFrame: capture.canonicalPatientiveSourceFrame,
      canonicalPatientiveOperationFrame:
        capture.canonicalPatientiveOperationFrame,
      canonicalPatientiveVncResult: capture.canonicalVncResult,
      exactPatientiveResultIdentityPreserved:
        capture.canonicalPatientiveNncResult === suppliedResult,
      completePatientiveSourceAndVncAncestryPreserved:
        Boolean(capture.canonicalVncResult),
      patientiveSourceState: capture.sourceState,
      patientiveSourcePossessor: capture.possessor,
      patientiveSourceIdentityStem: capture.sourceIdentityStem,
      patientiveSourceMorphemicBoundaries: Object.freeze(
        normalizeStem(capture.sourceIdentityStem || capture.sourceStem)
          .split("-").filter(Boolean)
      ),
      patientiveSourceFamily: capture.patientiveSourceFamily,
      matrixStem,
      matrixLexicalAnalysis: matrixSemanticFamily,
      matrixFinalVowelQuantity: "short-a",
      contrastingLongAStem: "tlāni",
      shortAndLongAMatricesRemainDistinct: true,
      complementKind: "desiring",
      typeThreeCausative: true,
      matrixConstituentIsVerbstemNotSuffix: true,
      possessorObjectTransformationFrame,
      possessorSourceRole: possessorObjectTransformationFrame.sourceRole,
      possessorSourceCase: possessorObjectTransformationFrame.sourceCase,
      possessorTargetRole: possessorObjectTransformationFrame.targetRole,
      possessorTargetCase: possessorObjectTransformationFrame.targetCase,
      transformedCausativeObjectId:
        possessorObjectTransformationFrame.targetObjectId,
      transformedCausativeObjectKind:
        possessorObjectTransformationFrame.targetObjectKind,
      transformedCausativeObjectPerson:
        possessorObjectTransformationFrame.targetObjectPerson,
      transformedCausativeObjectGovernor:
        possessorObjectTransformationFrame.targetObjectGovernor,
      causativeObjectMustBeMainline: true,
      transformationDerivedAutomatically:
        possessorObjectTransformationFrame.transformationDerivedAutomatically,
      userChoiceRequired: possessorObjectTransformationFrame.userChoiceRequired,
      originalPatientiveObjectRequests: inheritedTypeThreeObjectRequests,
      resultingCompoundObjectRequests:
        compoundOperation.targetObjectRequests || Object.freeze([]),
      originalPatientiveObjectHistoryInheritedAutomatically: true,
      originalPatientiveEmbedStem: capture.sourceStem,
      participantSeparatedPatientiveEmbedStem:
        selectedPatientiveEmbedStem,
      patientiveParticipantCarriersMovedOutOfTheEmbed: Boolean(
        capture.participantCarrierSequence?.length > 0
        && selectedPatientiveEmbedStem !== capture.sourceStem
      ),
      originalObjectBecomesShuntline:
        inheritedTypeThreeObjectRequests.length > 0,
      reciprocalSource: Boolean(
        normalizeKey(patientiveSourceVncProjection?.sourceValence)
          === "human-reciprocal"
        || inheritedTypeThreeObjectRequests.some(objectRequest => (
          normalizeKey(objectRequest?.objectKind) === "reciprocal"
        ))
      ),
      reciprocalShuntlineCarrier: "ne",
      reciprocalNeFollowsMainlineCausativeObject: true,
      boundaryAssimilationFrame:
        compoundOperation.boundaryAssimilationFrame || null,
      patientiveLPlusTlRealizesAsLPlusL: Boolean(
        compoundOperation.boundaryAssimilationFrame?.targetSequence === "l-l"
      ),
      availableNonactiveVoices:
        compoundOperation.nonactiveContinuationFrame
          ?.availableNonactiveVoices || Object.freeze([]),
      passiveAndImpersonalUseCanonicalVoiceOwner: true,
      typeTwoTypeThreeComparisonFrame: deepFreeze({
        kind:
          "classical-nahuatl-lesson39-type-two-type-three-causative-comparison-frame",
        version: VERSION,
        authorizationStatus: "authorized",
        typeTwoMatrix: "tiā",
        typeThreeMatrix: "tlani",
        synonymousReadingPossible: true,
        semanticDifferencePossible: true,
        typeTwoAndTypeThreeRemainDistinct: true,
        reciprocalSourceMovesToShuntline: true,
        translationSelectsCausativeType: false,
      }),
      fixedLexicalMatrixAnalysisRequiresExactTypedTlani: true,
      matrixStemMembershipAuthorizesGeneralPatientiveRoute: false,
      compatibleUnlistedPatientiveResultsRemainProductive: true,
      lexicalReadingRequiresTypedSourceOrContext: true,
      examplesAuthorizeRoute: false,
      translationsAuthorizeStructure: false,
      copiedResultAccepted: false,
      formulaOrSurfaceAuthorityAccepted: false,
      grammarAuthority: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    })
    : null;
  const incorporatedObjectTransformationFrame =
    isPossessivePatientiveIncorporatedObject
      ? compoundOperation
        .possessiveIncorporatedObjectTransformationFrame || null
      : null;
  const patientiveIncorporatedObjectFrame =
    isPossessivePatientiveIncorporatedObject
    && incorporatedObjectTransformationFrame?.authorizationStatus
      === "authorized"
    ? deepFreeze({
      kind:
        "classical-nahuatl-lesson39-patientive-incorporated-object-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      canonicalPatientiveNncResult: suppliedResult,
      canonicalPatientiveSourceFrame: capture.canonicalPatientiveSourceFrame,
      canonicalPatientiveOperationFrame:
        capture.canonicalPatientiveOperationFrame,
      canonicalPatientiveVncResult: capture.canonicalVncResult,
      exactPatientiveResultIdentityPreserved:
        capture.canonicalPatientiveNncResult === suppliedResult,
      completePatientiveSourceAndVncAncestryPreserved:
        Boolean(capture.canonicalVncResult),
      patientiveSourceState: capture.sourceState,
      patientiveSourcePossessor: capture.possessor,
      patientiveSourceIdentityStem: capture.sourceIdentityStem,
      patientiveEmbedStem: capture.sourceStem,
      patientiveSourceFamily: capture.patientiveSourceFamily,
      patientiveSourceMorphemicBoundaries: Object.freeze(
        normalizeStem(capture.sourceIdentityStem || capture.sourceStem)
          .split("-").filter(Boolean)
      ),
      patientiveResultServesAsIncorporatedObject: true,
      incorporatedObjectInsideVerbstem: true,
      incorporatedObjectId:
        incorporatedObjectTransformationFrame.incorporatedObjectId,
      incorporatedObjectOccupiesExternalValencePosition: false,
      possessorObjectTransformationFrame:
        incorporatedObjectTransformationFrame,
      possessorSourceRole:
        incorporatedObjectTransformationFrame.sourceRole,
      possessorSourceCase:
        incorporatedObjectTransformationFrame.sourceCase,
      possessorTargetRole:
        incorporatedObjectTransformationFrame.targetRole,
      possessorTargetCase:
        incorporatedObjectTransformationFrame.targetCase,
      transformedApplicativeObjectId:
        incorporatedObjectTransformationFrame.targetObjectId,
      transformedApplicativeObjectKind:
        incorporatedObjectTransformationFrame.targetObjectKind,
      transformedApplicativeObjectPerson:
        incorporatedObjectTransformationFrame.targetObjectPerson,
      transformedApplicativeObjectGovernor:
        incorporatedObjectTransformationFrame.targetObjectGovernor,
      externalPossessorObjectOutsideVerbstem: true,
      reflexiveWhenPossessorCorefersWithMatrixSubject:
        incorporatedObjectTransformationFrame.corefersWithMatrixSubject
          === true,
      projectiveWhenPossessorDoesNotCorefer:
        incorporatedObjectTransformationFrame.corefersWithMatrixSubject
          === false,
      matrixStem,
      matrixVerbClass: normalizeToken(
        source.matrixVerbClass || request.matrixVerbClass || "A"
      ).toUpperCase(),
      matrixSemanticFamily,
      matrixMorphemicBoundaries: Object.freeze(
        normalizeStem(matrixStem).split("-").filter(Boolean)
      ),
      internallyCompoundMatrixPreserved:
        normalizeStem(matrixStem).includes("-"),
      sourceMatrixValence:
        incorporatedObjectTransformationFrame.sourceMatrixValence,
      sourceValencePositionCount:
        incorporatedObjectTransformationFrame.sourceValencePositionCount,
      targetValencePositionCount:
        incorporatedObjectTransformationFrame.targetValencePositionCount,
      matrixValencePreserved:
        incorporatedObjectTransformationFrame.matrixValencePreserved,
      applicativeSuffixAdded:
        incorporatedObjectTransformationFrame.applicativeSuffixAdded,
      transitiveForceDischargedAcrossInternalAndExternalObjects: true,
      ordinaryValencePrincipleViolated:
        incorporatedObjectTransformationFrame
          .ordinaryValencePrincipleViolated,
      transformationDerivedAutomatically:
        incorporatedObjectTransformationFrame
          .transformationDerivedAutomatically,
      userChoiceRequired:
        incorporatedObjectTransformationFrame.userChoiceRequired,
      sourceMatrixObjectRequests:
        compoundOperation.sourceObjectRequests || Object.freeze([]),
      resultingExternalObjectRequests:
        compoundOperation.targetObjectRequests || Object.freeze([]),
      shortATlaniUseDocumentedAsRare:
        normalizeStem(matrixStem) === "tlani",
      ihTlaniInternalTlaniMatrixPreserved:
        normalizeStem(matrixStem) === "ih-tlani",
      lexicalReadingRequiresTypedSourceOrContext: true,
      matrixAnalysisRatherThanExampleIdentityAuthorizesCompatibility: true,
      compatibleUnlistedTypedMatricesRemainProductive: true,
      matrixStemMembershipAuthorizesRoute: false,
      examplesAuthorizeRoute: false,
      translationsAuthorizeStructure: false,
      nounstemStringAccepted: false,
      copiedResultAccepted: false,
      formulaOrSurfaceAuthorityAccepted: false,
      grammarAuthority: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    })
    : null;
  const patientiveEmbedCompoundFrame = deepFreeze({
    kind:
      "classical-nahuatl-lesson39-patientive-embed-compound-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    canonicalPatientiveNncGrammarFrame: suppliedGrammarFrame,
    canonicalPatientiveNncResult: suppliedResult,
    canonicalPatientiveSourceFrame: capture.canonicalPatientiveSourceFrame,
    canonicalPatientiveOperationFrame:
      capture.canonicalPatientiveOperationFrame,
    continuationProjection: capture.continuationProjection,
    exactPatientiveResultIdentityPreserved:
      capture.canonicalPatientiveNncResult === suppliedResult,
    patientiveDerivationPreserved: capture.patientiveDerivationPreserved,
    patientiveSourceFamily: capture.patientiveSourceFamily,
    patientiveEmbedStem: selectedCharacteristicEmbedStem,
    characteristicMatrixRealization:
      capture.characteristicPropertyPatientive
        ? characteristicMatrixRealization
        : "not-applicable",
    characteristicMatrixFullEmbedStem:
      capture.characteristicMatrixFullEmbedStem || "",
    characteristicMatrixOmittedEmbedStem:
      capture.characteristicMatrixOmittedEmbedStem || "",
    characteristicMatrixOmissionAvailable:
      capture.characteristicMatrixOmissionAvailable === true,
    characteristicMatrixRealizationIsGenuineUserChoice:
      capture.characteristicMatrixOmissionAvailable === true,
    fullCharacteristicMeaningPreservedWhenMatrixIsOmitted:
      capture.characteristicPropertyPatientive
      && characteristicMatrixRealization === "omitted",
    completeCharacteristicPatientiveResultPreserved:
      capture.characteristicPropertyPatientive
      && capture.canonicalPatientiveNncResult === suppliedResult,
    typedSourceIdentityPreservedAgainstSurfaceReanalysis:
      capture.characteristicPropertyPatientive,
    initialTōBelongsToTypedVerbstem:
      capture.characteristicPatientiveFoundationFrame
        ?.characteristicPreteritAgentiveFrame
        ?.initialTōBelongsToTypedVerbstem === true,
    initialTōIsPossessorPronoun: false,
    preteritAgentiveNum1Connector:
      capture.characteristicPatientiveFoundationFrame
        ?.characteristicPreteritAgentiveFrame
        ?.canonicalPredicateNominalizationOperationFrame
        ?.preteritAgentiveFrame?.num1Connector || "ti",
    frequencyFactIsReadingOnly: true,
    homophonousSurfaceDoesNotMergeTypedSources: true,
    patientiveEmbedNounClass: capture.sourceNounClass,
    patientiveEmbedSourceClass: capture.sourceCompoundClass,
    compoundTargetKind,
    matrixStem,
    matrixNounClass: compoundTargetKind === "nnc" ? matrixNounClass : "",
    matrixVerbClass: compoundTargetKind === "vnc"
      ? normalizeToken(source.matrixVerbClass || request.matrixVerbClass || "A")
        .toUpperCase()
      : "",
    matrixValence: compoundTargetKind === "vnc"
      ? normalizeKey(source.matrixValence || request.matrixValence
        || "intransitive")
      : "",
    selectedRelation,
    compoundStem: compoundOperation.compoundStem || "",
    patientiveOwnerhoodFoundationFrame,
    patientiveLicensedMatrixComplementFrame,
    patientiveTlaniDesiderativeFrame,
    patientivePossessiveTocaFrame,
    patientivePossessiveTlaniCausativeFrame,
    patientiveIncorporatedObjectFrame,
    patientiveResultServesAsEmbed: true,
    nominalAndVerbalCompoundTargetsAvailable: true,
    exactSourceAndDerivationRemainAttached: true,
    boundaryBehaviorDerivedAutomatically: true,
    relationIsGenuineUserChoice: true,
    nounstemStringAccepted: false,
    copiedResultAccepted: false,
    formulaOrSurfaceAuthorityAccepted: false,
    exampleIdentityAuthorizesContinuation: false,
    compatibleUnlistedPatientiveResultsRemainProductive: true,
    grammarAuthority: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
  const operationFrame = deepFreeze({
    kind: "classical-nahuatl-deverbal-nnc-operation-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    operationId: `patientive-embed-continuation:${compoundTargetKind}`,
    constructionKind: "patientive-embed-continuation",
    continuationRelation: "patientive-result-as-compound-embed",
    sourceDeverbalNounstemAxisFrame:
      capture.sourceDeverbalNounstemAxisFrame,
    patientiveEmbedCompoundFrame,
    targetStems: {
      restrictedUse: compoundOperation.compoundStem || "",
      generalUse: compoundOperation.compoundStem || "",
    },
    nounClass: compoundTargetKind === "nnc" ? matrixNounClass : "",
    nncFamily: compoundTargetKind === "nnc"
      ? "patientive-embed-compound"
      : "",
    connectorProfile: compoundTargetKind === "nnc"
      ? matrixNounClass === "tl" ? "derived-tl" : "derived-other"
      : "",
    pluralConnector: compoundTargetKind === "nnc"
      ? matrixNounClass === "tl" ? "m-eh" : "t-in"
      : "",
    possessiveSingularConnector: compoundTargetKind === "nnc" ? "0" : "",
    allowedStates: compoundTargetKind === "nnc"
      ? ["absolutive", "possessive"]
      : [],
    defaultState: compoundTargetKind === "nnc" ? "absolutive" : "",
    defaultAnimacy: compoundTargetKind === "nnc"
      ? normalizeKey(request.animacy || "nonanimate")
      : "",
    transformedPossessor: "",
    appliedSemanticRules: Object.freeze([
      "39.6-exact-patientive-result-as-compound-embed",
      compoundTargetKind === "nnc"
        ? "39.6.1-patientive-embed-in-nominal-compound"
        : "39.6-patientive-embed-in-verbal-compound",
      ...(patientiveLicensedMatrixComplementFrame
        ? ["39.7.1.b-patientive-object-complement-licensed-matrix"]
        : []),
      ...(patientiveTlaniDesiderativeFrame
        ? ["39.7.1.c-short-a-tlani-desiderative-matrix"]
        : []),
      ...(patientivePossessiveTocaFrame
        ? ["39.7.2.a-possessive-patientive-toca-object-transfer"]
        : []),
      ...(patientivePossessiveTlaniCausativeFrame
        ? ["39.7.2.b-possessive-patientive-tlani-type-three-causative"]
        : []),
      ...(patientiveIncorporatedObjectFrame
        ? ["39.8-patientive-result-as-incorporated-object"]
        : []),
      ...(capture.characteristicPropertyPatientive
        ? [
          "39.9-exact-characteristic-patientive-result-as-compound-embed",
          characteristicMatrixRealization === "omitted"
            ? "39.9-characteristic-yo-matrix-zero-realization"
            : "39.9-characteristic-yo-matrix-full-realization",
        ]
        : []),
    ]),
    typedOperationAuthority: true,
    callerSuppliedDerivedAuthorityAccepted: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
  return {
    sourceFrame,
    operationFrame,
    canonicalResult,
    canonicalTargetEvaluator: "evaluateClassicalNahuatlNominalConstruction",
    blockReason: "",
  };
}

function buildContinuationOperation(
  request = {},
  target = globalThis,
  preparedSourceFrame = null
) {
  const constructionKind = normalizeKey(request.constructionKind);
  let source = request.source && typeof request.source === "object"
    ? request.source
    : request;
  const suppliedActionResult = request.canonicalNncResult
    || source.canonicalNncResult
    || null;
  const actionCapture = suppliedActionResult
    ? captureActionNncResultForContinuation(suppliedActionResult, target)
    : null;
  if (
    suppliedActionResult
    && !isClassicalNahuatlActionNncContinuationCaptureFrame(actionCapture)
  ) {
    return {
      sourceFrame: null,
      operationFrame: null,
      canonicalResult: null,
      blockReason: actionCapture.blockReason,
    };
  }
  if (actionCapture) {
    source = {
      ...source,
      sourceUnit: actionCapture.sourceUnit,
      sourceStage: "derived-nounstem",
      sourceStem: actionCapture.sourceStem,
      sourceState: actionCapture.sourceState,
      possessor: actionCapture.possessor,
      embedClass: actionCapture.sourceNounClass,
      derivationKind: actionCapture.derivationKind,
      actionNncContinuationCaptureFrame: actionCapture,
    };
  }
  const derivationKind = normalizeKey(source.derivationKind);
  if (
    ["active-action-z", "active-action-liz"].includes(derivationKind)
    && !actionCapture
  ) {
    return {
      sourceFrame: null,
      operationFrame: null,
      canonicalResult: null,
      blockReason: "exact-owner-issued-active-action-nnc-result-required",
    };
  }
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
      sourceUnit: source.sourceUnit || "derived-nnc-nounstem",
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
  const underlyingContinuationSourceStem = continuationSourceStem;
  if (
    [
      "passive-action-characteristic",
      "active-action-characteristic",
    ].includes(derivationKind)
    && /^yō$/u.test(matrixStem)
    && /ca$/u.test(continuationSourceStem)
  ) {
    continuationSourceStem = continuationSourceStem.replace(/ca$/u, "cā");
    boundaryRules.push("39.3.6-action-ca-protected-before-yo");
  }
  if (
    ["active-action-z", "active-action-liz"].includes(derivationKind)
    && /z$/u.test(continuationSourceStem)
    && /^tzin/u.test(matrixStem)
  ) {
    continuationSourceStem = continuationSourceStem.replace(/z$/u, "");
    boundaryRules.push("37.5-s-to-tz-affective-assimilation");
  }
  const tzinAssimilationApplied = boundaryRules.includes(
    "37.5-s-to-tz-affective-assimilation"
  );
  const tzinBoundaryFrame = deepFreeze({
    kind: "classical-nahuatl-lesson37-z-liz-tzin-boundary-frame",
    version: VERSION,
    authorizationStatus: tzinAssimilationApplied
      ? "authorized"
      : "not-applicable",
    underlyingActionNounstem: underlyingContinuationSourceStem,
    followingMatrix: matrixStem,
    underlyingBoundary: tzinAssimilationApplied ? "z+tzin" : "",
    phonologicalOutcome: tzinAssimilationApplied ? "tz+tz" : "",
    conventionalWrittenBoundary: tzinAssimilationApplied ? "tzin" : "",
    finalZOrLizAnalysisPreserved: Boolean(
      tzinAssimilationApplied && actionCapture
    ),
    assimilationAutomatic: tzinAssimilationApplied,
    userChoosesAssimilationOrDoubledSpelling: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
  const actionNncContinuationFrame = resultFamily => deepFreeze({
    kind: "classical-nahuatl-lesson37-action-nnc-continuation-frame",
    version: VERSION,
    authorizationStatus: actionCapture ? "authorized" : "not-applicable",
    canonicalActionNncResult:
      actionCapture?.canonicalActionNncResult || null,
    canonicalFutureVncResult:
      actionCapture?.canonicalFutureVncResult || null,
    exactActionNncResultIdentityPreserved:
      actionCapture?.exactResultIdentityPreserved === true,
    completeCanonicalSourceAnalysisPreserved:
      actionCapture?.canonicalSourceAnalysisPreserved === true,
    actionSuffix: actionCapture?.actionSuffix || "",
    actionStemRule: actionCapture?.actionStemRule || "",
    sourceNounstem: underlyingContinuationSourceStem,
    selectedMatrix: matrixStem,
    selectedSemanticRelation: constructionKind === "nominal-continuation"
      ? "nounstem-compound-embed"
      : normalizeKey(request.relation || "adverb"),
    resultFamily,
    sourceState: actionCapture?.sourceState || "",
    sourcePossessor: actionCapture?.possessor || "",
    boundaryRules: Object.freeze([...boundaryRules]),
    tzinBoundaryFrame,
    userChoosesLicensedMatrixAndGenuineSemanticRelation:
      actionCapture != null,
    compoundMeaningRequiresTypedLexicalOrContextualEvidence: true,
    copiedStringOrExampleIdentityAuthorizesContinuation: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
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
      sourceDeverbalNounstemAxisFrame:
        actionCapture?.sourceDeverbalNounstemAxisFrame || null,
      actionNncContinuationFrame:
        actionNncContinuationFrame("nnc"),
      tzinBoundaryFrame,
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
      sourceDeverbalNounstemAxisFrame:
        actionCapture?.sourceDeverbalNounstemAxisFrame || null,
      actionNncContinuationFrame:
        actionNncContinuationFrame("vnc"),
      tzinBoundaryFrame,
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
          participantRoleTransitionFrame:
            buildClassicalNahuatlParticipantRoleTransitionFrame({
              operationId: `deverbal-continuation:possessor-to-${relation}-object`,
              sourceRoles: ["source-possessor"],
              targetRoles: [relation === "object"
                ? "outside-applicative-object"
                : "mainline-object"],
              retiredSourceRoles: ["source-possessor"],
              activatedTargetRoles: [relation === "object"
                ? "outside-applicative-object"
                : "mainline-object"],
              preservedParticipantFacts: [
                "possessor-participant-identity",
                "typed-source-history",
              ],
            }),
        })
        : objectCoreference === "matrix-object"
          ? deepFreeze({
            sourceRole: "discarded-embedded-subject",
            targetRole: "matrix-object",
            referenceRelation: "coreferential",
            participantRoleTransitionFrame:
              buildClassicalNahuatlParticipantRoleTransitionFrame({
                operationId: "deverbal-continuation:embedded-subject-reference-unification",
                sourceRoles: ["embedded-subject-expression"],
                targetRoles: ["matrix-object-reference-carrier"],
                retiredSourceRoles: ["embedded-subject-expression"],
                activatedTargetRoles: [],
                preservedParticipantFacts: [
                  "embedded-subject-referent-identity",
                  "matrix-object-reference",
                  "typed-source-history",
                ],
              }),
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

function captureVocativeAgentiveNncResult(result = null) {
  const canonicalNncGrammarFrame = result?.kind
    === "classical-nahuatl-deverbal-nnc-grammar-frame"
    && result.authorizationStatus === "authorized"
    ? result
    : null;
  const canonicalNncResult = canonicalNncGrammarFrame?.canonicalResult
    || result;
  const context = PREDICATE_NNC_CONTINUATION_CONTEXTS.get(
    canonicalNncResult
  ) || null;
  const typedSlotFrame = canonicalNncResult?.nncSlotFrame || null;
  if (
    !context
    || context.operationFrame?.nominalizationKind !== "preterit-agentive"
    || canonicalNncResult?.authorizationStatus !== "authorized"
    || canonicalNncResult?.state !== "absolutive"
    || !ISSUED_NNC_SLOT_FRAMES.has(typedSlotFrame)
  ) {
    return deepFreeze({
      kind: "classical-nahuatl-lesson35-vocative-agentive-capture-frame",
      version: VERSION,
      authorizationStatus: "blocked",
      blockReason:
        "35.13-exact-owner-issued-absolutive-preterit-agentive-result-required",
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
  }
  const predicateStem = normalizeStem(
    typedSlotFrame.slots?.predicate?.stem
  ).replace(/-0$/u, "");
  const num1 = normalizeStem(typedSlotFrame.slots?.number?.num1);
  const num2 = normalizeStem(typedSlotFrame.slots?.number?.num2);
  const numberConnector = num1 && num1 !== "0"
    ? joinMorphs([num1, num2 && num2 !== "0" ? num2 : ""])
    : "silent";
  return deepFreeze({
    kind: "classical-nahuatl-lesson35-vocative-agentive-capture-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    blockReason: "",
    canonicalNncGrammarFrame,
    canonicalNncResult,
    canonicalSourceFrame: context.sourceFrame,
    canonicalOperationFrame: context.operationFrame,
    canonicalTypedSlotFrame: typedSlotFrame,
    sourceStem: predicateStem,
    numberConnector,
    subject: canonicalNncResult.subject,
    exactResultIdentityPreserved: true,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

function buildVocativeOperation(
  request = {},
  preparedSourceFrame = null
) {
  const suppliedResult = request.canonicalNncResult
    || request.canonicalNncGrammarFrame
    || request.source?.canonicalNncResult
    || null;
  const capture = captureVocativeAgentiveNncResult(suppliedResult);
  if (capture.authorizationStatus !== "authorized") {
    return {
      sourceFrame: null,
      operationFrame: null,
      blockReason: capture.blockReason,
    };
  }
  const source = {
    sourceStem: capture.sourceStem,
    wordStem: capture.sourceStem,
    numberConnector: capture.numberConnector,
    vocativeAgentiveCaptureFrame: capture,
  };
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
  } else if (connector === "qu-eh") {
    vocativeStem = joinMorphs([vocativeStem, "qu", "eh"]);
    boundaryRule = "35.13-plural-qu-eh-preserved-before-e";
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
    vocativeAgentiveCaptureFrame: capture,
    sourceNumberConnector: connector,
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
  if (
    !typedPrincipal
    || !typedSupplement
    || source.lexicalizedFixedOrder !== true
  ) {
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
    supplementationRelation: "lexicalized-fixed-order-double-nucleus",
    internalPersonPositionsPreserved: true,
    outerSubjectMayOverwriteInternalPersonPositions: false,
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
  const hostilePath = findHostileAuthorityPath(request, "request", target);
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
    built = buildDeverbalActionOperation(
      request,
      preparedSourceFrame,
      target
    );
  } else if (constructionKind === "patientive") {
    built = buildPatientiveOperation(request, preparedSourceFrame, target);
  } else if (constructionKind === "patientive-embed-continuation") {
    built = buildPatientiveEmbedContinuationOperation(
      request,
      target,
      preparedSourceFrame
    );
  } else if (constructionKind === "patientive-matrix-continuation") {
    built = buildPatientiveMatrixContinuationOperation(
      request,
      target,
      preparedSourceFrame
    );
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
  } else if (
    constructionKind === "verbal-continuation"
    || constructionKind === "patientive-embed-continuation"
    || constructionKind === "patientive-matrix-continuation"
  ) {
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
  if (
    authorized
    && constructionKind === "predicate-nominalization"
    && canonicalResult
  ) {
    PREDICATE_NNC_CONTINUATION_CONTEXTS.set(
      canonicalResult,
      deepFreeze({
        sourceFrame: built.sourceFrame,
        operationFrame,
      })
    );
  }
  if (
    authorized
    && (
      (
        constructionKind === "deverbal-action"
        && operationFrame.actionKind === "active-action"
      )
      || (
        constructionKind === "predicate-nominalization"
        && ["passive-action", "active-action"].includes(
          operationFrame.nominalizationKind
        )
      )
    )
    && canonicalResult
  ) {
    ACTION_NNC_CONTINUATION_CONTEXTS.set(canonicalResult, deepFreeze({
      sourceFrame: built.sourceFrame,
      operationFrame,
    }));
  }
  if (
    authorized
    && constructionKind === "patientive"
    && canonicalResult
  ) {
    PATIENTIVE_NNC_CONTINUATION_CONTEXTS.set(canonicalResult, deepFreeze({
      sourceFrame: built.sourceFrame,
      operationFrame,
    }));
  }
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
  const hostilePath = findHostileAuthorityPath(request, "request", target);
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
    ...cloneParadigmRequest(request),
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
  const instrumentiveSourcePairFrame = operationFrame
    ?.instrumentiveSourcePairFrame || null;
  const subjects = (Array.isArray(request.subjects) && request.subjects.length
    ? request.subjects
    : ["1sg", "2sg", "3sg", "1pl", "2pl", "3pl"])
    .map(normalizeSubject)
    .filter(Boolean);
  const states = operationFrame.allowedStates.length
    ? (Array.isArray(request.states) && request.states.length
      ? request.states.map(normalizeKey)
      : isClassicalNahuatlInstrumentiveSourcePairFrame(
        instrumentiveSourcePairFrame
      )
        ? ["absolutive", "possessive"]
        : operationFrame.allowedStates)
    : ["not-applicable"];
  const coordinates = states.flatMap(state => subjects.map(subject => deepFreeze({
    coordinateId: `${state}:${subject}`,
    state,
    subject,
  })));
  const baseRequest = cloneParadigmRequest(request);
  if (seed.constructionKind === "double-nucleus-ownerhood") {
    baseRequest.source.principalNncFrame = seed.sourceFrame.principalNncFrame;
    baseRequest.source.supplementNncFrame = seed.sourceFrame.supplementNncFrame;
  }
  delete baseRequest.subject;
  delete baseRequest.subjects;
  delete baseRequest.state;
  delete baseRequest.states;
  delete baseRequest.outputScope;
  const preparedSourceFramesByState = isClassicalNahuatlInstrumentiveSourcePairFrame(
    instrumentiveSourcePairFrame
  )
    ? deepFreeze(Object.fromEntries(states.map(state => {
      const stateSeed = evaluateGrammar({
        ...cloneParadigmRequest(request),
        state,
        outputScope: "single",
      }, target);
      return [state, stateSeed.sourceFrame || null];
    })))
    : null;
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
    preparedSourceFramesByState,
    preparedOperationFrame: seed.operationFrame,
    instrumentiveSourcePairFrame,
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
    && (
      plan.instrumentiveSourcePairFrame == null
      || isClassicalNahuatlInstrumentiveSourcePairFrame(
        plan.instrumentiveSourcePairFrame
      )
    )
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
    const hostilePath = findHostileAuthorityPath(
      coordinate,
      "request",
      target
    );
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
      ...cloneParadigmRequest(planContext.baseRequest),
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
    const preparedSourceFrame = plan.preparedSourceFramesByState
      ?.[planned.state] || plan.preparedSourceFrame;
    const preparedFrame = evaluateGrammar(scalarRequest, target, {
      preparedSourceFrame,
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
  targetObject = globalThis,
  installationContext = {}
) {
  const target = targetObject && typeof targetObject === "object"
    ? targetObject
    : globalThis;
  const semanticTarget = Object.create(target);
  Object.defineProperties(
    semanticTarget,
    Object.getOwnPropertyDescriptors(
      installationContext?.moduleDependencyCapabilities || {}
    )
  );
  const api = {
    CLASSICAL_NAHUATL_LESSONS_35_39_GCD_IDENTITY: GCD_IDENTITY,
    CLASSICAL_NAHUATL_LESSONS_35_39_CONSTRUCTION_KINDS: CONSTRUCTION_KINDS,
    CLASSICAL_NAHUATL_LESSONS_35_39_PREDICATE_NOMINALIZATION_KINDS:
      PREDICATE_NOMINALIZATION_KINDS,
    CLASSICAL_NAHUATL_LESSONS_35_39_PATIENTIVE_SOURCE_FAMILIES:
      PATIENTIVE_SOURCE_FAMILIES,
    CLASSICAL_NAHUATL_DEVERBAL_NOUNSTEM_SOURCE_CONTRACTS:
      DEVERBAL_NOUNSTEM_SOURCE_CONTRACTS,
    CLASSICAL_NAHUATL_LESSONS_35_39_PATIENTIVE_MATRIX_COMPOUND_RELATIONS:
      PATIENTIVE_MATRIX_COMPOUND_RELATIONS,
    CLASSICAL_NAHUATL_LESSONS_35_39_LCM_DISTINCTION_AXES:
      LCM_DISTINCTION_AXES,
    CLASSICAL_NAHUATL_LESSONS_35_39_OWNERHOOD_MATRICES:
      OWNERHOOD_MATRICES,
    CLASSICAL_NAHUATL_LESSONS_35_39_GCD_FRAME: GCD_FRAME,
    CLASSICAL_NAHUATL_LESSONS_35_39_LCM_FRAME: LCM_FRAME,
    getClassicalNahuatlOwnerhoodSourceAnalysis:
      getOwnerhoodSourceAnalysis,
    getClassicalNahuatlPatientiveContrastInventory:
      getPatientiveContrastInventory,
    getClassicalNahuatlRootStockPatientiveInventory:
      getRootStockPatientiveInventory,
    evaluateClassicalNahuatlDeverbalNnc:
      request => evaluateGrammar(request, semanticTarget),
    captureClassicalNahuatlPreteritVncResultForNominalization:
      result => capturePreteritVncResult(result, semanticTarget),
    captureClassicalNahuatlVncResultForPredicateNominalization:
      (result, nominalizationKind, state = "absolutive") => (
        capturePredicateNominalizationVncResult(
          result,
          nominalizationKind,
          state,
          semanticTarget
        )
      ),
    captureClassicalNahuatlVncResultForDeverbalAction:
      result => captureDeverbalActionVncResult(result, semanticTarget),
    captureClassicalNahuatlPassiveVncResultForPatientive:
      result => capturePassivePatientiveVncResult(result, semanticTarget),
    captureClassicalNahuatlImpersonalVncResultForPatientive:
      result => captureImpersonalPatientiveVncResult(result, semanticTarget),
    captureClassicalNahuatlPerfectiveVncResultForPatientive:
      result => capturePerfectivePatientiveVncResult(result, semanticTarget),
    captureClassicalNahuatlImperfectiveVncResultForPatientive:
      result => captureImperfectivePatientiveVncResult(
        result,
        semanticTarget
      ),
    captureClassicalNahuatlNncResultForCharacteristicPatientive:
      result => captureCharacteristicPatientiveNncResult(
        result,
        semanticTarget
      ),
    captureClassicalNahuatlActionNncResultForContinuation:
      result => captureActionNncResultForContinuation(result, semanticTarget),
    captureClassicalNahuatlPatientiveNncResultForMatrixContinuation:
      result => capturePatientiveNncResultForMatrixContinuation(
        result,
        semanticTarget
      ),
    isClassicalNahuatlPreteritVncNominalizationCaptureFrame,
    isClassicalNahuatlPredicateNominalizationVncCaptureFrame,
    isClassicalNahuatlDeverbalActionVncCaptureFrame,
    isClassicalNahuatlPassivePatientiveVncCaptureFrame,
    isClassicalNahuatlImpersonalPatientiveVncCaptureFrame,
    isClassicalNahuatlPerfectivePatientiveVncCaptureFrame,
    isClassicalNahuatlImperfectivePatientiveVncCaptureFrame,
    isClassicalNahuatlCharacteristicPatientiveNncCaptureFrame,
    isClassicalNahuatlActionNncContinuationCaptureFrame,
    isClassicalNahuatlPatientiveNncContinuationCaptureFrame,
    buildClassicalNahuatlInstrumentiveSourcePairFrame:
      request => buildInstrumentiveSourcePairFrame(request, semanticTarget),
    isClassicalNahuatlInstrumentiveSourcePairFrame,
    isClassicalNahuatlLexicalAuthorizationFrame,
    isClassicalNahuatlDeverbalNncGrammarFrame,
    buildClassicalNahuatlDeverbalNncParadigmPlan:
      request => buildParadigmPlan(request, semanticTarget),
    isClassicalNahuatlParadigmPlan,
    projectClassicalNahuatlParadigmCoordinates:
      (plan, coordinates) => projectParadigm(
        plan,
        coordinates,
        semanticTarget
      ),
    isClassicalNahuatlParadigmCoordinate,
    buildClassicalNahuatlUiProjection: buildUiProjection,
  };
  Object.defineProperties(target, Object.getOwnPropertyDescriptors(api));
  return api;
}
