// Canonical Andrews-only nominalization and deverbal closure for Lessons 35-39.
//
// Production owns executable grammar only. Canvas source spans, dispositions,
// claim counts, and audit receipts remain in documentation and tests.

import {
  buildClassicalGrammaticalRhymeCoordinateFrame as
    buildSharedGrammaticalRhymeCoordinateFrame,
} from "../grammar/grammatical_rhyme_space.mjs?v=20260826-relational-role-340";
import {
  buildClassicalNahuatlParticipantRoleTransitionFrame,
} from "./participant_frame.mjs?v=20260823-passive-formation-continuity-238";

import { projectClassicalNahuatlRetainedReflexiveShuntline }
  from "./vnc_derivation_evaluator.mjs?v=20261008-reader-40-9-190";

const VERSION = 1;
const ISSUED_SOURCE_FRAMES = new WeakSet();
const ISSUED_PATIENTIVE_CORE_SOURCES = new WeakSet();
const ISSUED_ADVERBIAL_NOMINAL_CORES = new WeakSet();
const ISSUED_ADVERBIAL_NOMINAL_PREDICATES = new WeakSet();
const ISSUED_CHARACTERISTIC_NOUN_SOURCES = new WeakSet();
const ISSUED_LEXICAL_AUTHORIZATION_FRAMES = new WeakSet();
const ISSUED_PRETERIT_VNC_CAPTURE_FRAMES = new WeakSet();
const ISSUED_OWNERHOOD_CHARACTERISTIC_SOURCE_FRAMES = new WeakSet();
const ISSUED_PREDICATE_NOMINALIZATION_VNC_CAPTURE_FRAMES = new WeakSet();
const ISSUED_PREDICATE_NOMINALIZATION_VNC_CAPTURE_BATCH_FRAMES = new WeakSet();
const ISSUED_DEVERBAL_ACTION_VNC_CAPTURE_FRAMES = new WeakSet();
const ISSUED_PASSIVE_PATIENTIVE_VNC_CAPTURE_FRAMES = new WeakSet();
const ISSUED_IMPERSONAL_PATIENTIVE_VNC_CAPTURE_FRAMES = new WeakSet();
const ISSUED_RECONSTRUCTED_NONACTIVE_PATIENTIVE_CAPTURE_FRAMES = new WeakSet();
const ISSUED_PERFECTIVE_PATIENTIVE_VNC_CAPTURE_FRAMES = new WeakSet();
const ISSUED_IMPERFECTIVE_PATIENTIVE_VNC_CAPTURE_FRAMES = new WeakSet();
const ISSUED_ROOT_STOCK_PATIENTIVE_VNC_CAPTURE_FRAMES = new WeakSet();
const ISSUED_CHARACTERISTIC_PATIENTIVE_NNC_CAPTURE_FRAMES = new WeakSet();
const ISSUED_OWNERHOOD_NNC_CAPTURE_FRAMES = new WeakSet();
const ISSUED_ACTION_NNC_CONTINUATION_CAPTURE_FRAMES = new WeakSet();
const ISSUED_PATIENTIVE_NNC_CONTINUATION_CAPTURE_FRAMES = new WeakSet();
const ISSUED_INSTRUMENTIVE_SOURCE_PAIR_FRAMES = new WeakSet();
const ISSUED_INSTRUMENTIVE_CITATION_CAPTURES = new WeakSet();
const ISSUED_NNC_SLOT_FRAMES = new WeakSet();
const ISSUED_NNC_EXTERNAL_OBJECTS = new WeakMap();
const PRETERIT_NNC_SLOT_PARENTS = new WeakMap();
const CUSTOMARY_NNC_SLOT_PARENTS = new WeakMap();
const ISSUED_GRAMMAR_FRAMES = new WeakSet();
const ISSUED_PARADIGM_PLANS = new WeakSet();
const ISSUED_PARADIGM_COORDINATES = new WeakSet();
const PARADIGM_PLAN_CONTEXTS = new WeakMap();
const PREDICATE_NNC_CONTINUATION_CONTEXTS = new WeakMap();
const ACTION_NNC_CONTINUATION_CONTEXTS = new WeakMap();
const PATIENTIVE_NNC_CONTINUATION_CONTEXTS = new WeakMap();
const PRETERIT_NNC_RESTRICTED_USE_CITATION_PROJECTIONS = new WeakMap();
const PRETERIT_NNC_RESTRICTED_USE_CITATION_RECEIPTS = new WeakMap();
const PREDICATE_NNC_RESTRICTED_USE_CITATION_PROJECTIONS = new WeakMap();
const PREDICATE_NNC_RESTRICTED_USE_CITATION_RECEIPTS = new WeakMap();
const CUSTOMARY_AGENTIVE_BOUNDARY_CONSTITUENT_RECEIPTS = new WeakMap();
const BOUND_CUSTOMARY_AGENTIVE_NNC_MATERIAL = new WeakSet();
const FUTURE_RESTRICTED_EMBED_RECEIPTS = new WeakMap();
const ISSUED_FUTURE_RESTRICTED_EMBEDS = new WeakSet();
const LEXICALIZED_PRESENT_NNC_SOURCES = new WeakMap();
const LEXICALIZED_PRESENT_NNC_PARENTS = new WeakMap();
const DEVERBAL_ACTION_NNC_CITATION_PROJECTIONS = new WeakMap();
const DEVERBAL_ACTION_NNC_CITATION_RECEIPTS = new WeakMap();
const PATIENTIVE_NNC_CITATION_PROJECTIONS = new WeakMap();
const PATIENTIVE_NNC_CITATION_RECEIPTS = new WeakMap();
const PATIENTIVE_NNC_CITATION_PROJECTION_KIND =
  "classical-nahuatl-patientive-nnc-restricted-use-citation-projection";
const DEVERBAL_ACTION_NNC_CITATION_PROJECTION_KIND =
  "classical-nahuatl-deverbal-action-nnc-restricted-use-citation-projection";
const PREDICATE_NNC_RESTRICTED_USE_CITATION_PROJECTION_KIND =
  "classical-nahuatl-predicate-nnc-restricted-use-citation-projection";
const PRETERIT_NNC_RESTRICTED_USE_CITATION_PROJECTION_KIND =
  "classical-nahuatl-preterit-nnc-restricted-use-citation-projection";
const GCD_IDENTITY =
  "typed-source-unit+licensed-source-stage+nominal-or-deverbal-operation+participant-state-transformation+boundary-realization+canonical-target-evaluator";
const LCM_PROJECTION_IDENTITY =
  "classical-nahuatl-deverbal-nnc-owner-selected-lcm-projection";

const CONSTRUCTION_KINDS = Object.freeze([
  "predicate-nominalization",
  "predicate-citation",
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
  "instrumentive-full",
  "present-agentive",
  "future-agentive",
  "passive-action",
  "active-action",
]);

const PATIENTIVE_SOURCE_FAMILIES = Object.freeze([
  "passive-core",
  "impersonal-core",
  "reconstructed-nonactive-core",
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
    sourceEvidenceKinds: ["owner-issued-vnc-result", "owner-issued-core-source"],
    voiceMismatchBlockReason: "patientive-family-source-voice-mismatch",
  }),
  "patientive:impersonal-core": freezeDeverbalNounstemSourceContract({
    sourceStage: "nonactive-core",
    sourceVoices: ["impersonal"],
    sourceEvidenceKinds: ["owner-issued-vnc-result", "owner-issued-core-source"],
    voiceMismatchBlockReason: "patientive-family-source-voice-mismatch",
  }),
  "patientive:reconstructed-nonactive-core": freezeDeverbalNounstemSourceContract({
    sourceStage: "reconstructed-nonactive-core",
    sourceVoices: ["nonactive"],
    sourceEvidenceKinds: ["owner-issued-vnc-result"],
    voiceMismatchBlockReason: "patientive-family-source-voice-mismatch",
  }),
  "patientive:perfective-active-core":
    freezeDeverbalNounstemSourceContract({
      sourceStage: "perfective-core",
      sourceVoices: ["active"],
      sourceEvidenceKinds: ["owner-issued-vnc-result", "owner-issued-nnc-result", "owner-issued-core-source"],
      voiceMismatchBlockReason: "patientive-family-source-voice-mismatch",
    }),
  "patientive:imperfective-active-core":
    freezeDeverbalNounstemSourceContract({
      sourceStage: "imperfective-core",
      sourceVoices: ["active"],
      sourceEvidenceKinds: ["owner-issued-vnc-result", "owner-issued-core-source"],
      voiceMismatchBlockReason: "patientive-family-source-voice-mismatch",
    }),
  "patientive:root-or-stock": freezeDeverbalNounstemSourceContract({
    sourceStage: "root-or-stock",
    sourceVoices: ["active"],
    sourceEvidenceKinds: ["typed-morphemic-source", "owner-issued-vnc-result"],
    voiceMismatchBlockReason: "patientive-family-source-voice-mismatch",
  }),
  "patientive:characteristic-property":
    freezeDeverbalNounstemSourceContract({
      sourceStage: "nounstem-embed",
      sourceVoices: ["active"],
      sourceEvidenceKinds: ["owner-issued-nnc-result", "owner-issued-nnc-source"],
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
  "pāc": {
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
  cama: { matrixOptions: ["ē"], exception: "mouth-e-only", ownerhoodRetainsRestrictedVariant: true, ownerhoodYVariantAvailable: true },
  tah: { matrixOptions: ["huā", "ē"], exception: "father-glottal-t-spelling", eBoundaryVariants: ["t-for-glottal"] },
  izt: { matrixOptions: ["ē"], exception: "subclass-1b-final-i-deletion" },
  iht: { matrixOptions: ["ē"], exception: "subclass-1b-final-i-deletion" },
  icx: { matrixOptions: ["ē"], exception: "subclass-1b-final-i-deletion" },
});

// These are canonical lexical grammar facts keyed by the typed Source stem.
// They contain neither examples nor stored outputs. Callers choose only among
// alternatives that the owner-issued Source authorization frame exposes.
const LEXICAL_SOURCE_FACTS = deepFreeze({
  // §37.5.2 documents this lexical l-compound's base liz formation.
  // It is distinct from the ordinary replacive imperfective of toca.
  "chīhua-l-toca": { actionStemVariants: ["none"] },
  // §36.6 Note 2 records these exceptional absolutive imperfect nouns.
  // Only their nominal -yā citation is irregular; their VNC derivation stays
  // productive and the normal possessed instrumentive keeps its actual -ya.
  cochi: { instrumentiveAbsolutiveCitation: "long-ya" },
  icza: { instrumentiveAbsolutiveCitation: "long-ya" },
  // §44.6 identifies an impersonal patientive that retains the active /w/.
  // Only this irregular retention is lexical; no target word is stored here.
  "tlacu-ā-hua": { impersonalPatientiveRetainsActiveFinalW: true },
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
  "temō": { preteritAgentiveVariants: ["ordinary", "archaic-que"] },
  "quetz": { preteritAgentiveReflexiveVariants: ["ordinary", "archaic-que"] },
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
  "cuī-tih": { preteritAgentiveNumberOptions: ["qui", "silent"] },
  "nāhua-l-tih": { preteritAgentiveNumberOptions: ["qui", "silent"] },
  "chōc-tih": {
    preteritAgentiveNumberOptions: ["qui", "silent"],
    agentiveAnimacyByConnector: {
      qui: ["animate"],
      silent: ["nonanimate"],
    },
  },
  "tt-a": { affinityRequirement: "plural-optional" },
  "iht-o-h": { possessiveAgentiveYoObjectPattern: "nonspecific-nonhuman" },
  "ht-o-h": {
    affinityRequirement: "plural-optional",
    possessiveAgentiveYoObjectPattern: "nonspecific-nonhuman",
  },
  "tē-yāō-chīhua": { rarePossessiveReanalysis: true },
  "tē-cuā": {
    rarePossessiveReanalysis: true,
    finalIRealizations: ["preserve", "drop"],
  },
  "tē-mach-tiā": { finalIRealizations: ["preserve", "drop"] },
  "toz-ō": { zActionException: true },
  // §37.2's lexical exception belongs to the imperfective lexeme;
  // its Class C future supplies toz-ō through ordinary derivation.
  "toz-o-ā": { zActionException: true },
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
  "huīca": { exceptionalHumanPrefixRetention: true },
  "ilpi-ā": { exceptionalHumanPrefixRetention: true },
  // §38.1.1 changes the noun vowel after the exact nonactive is captured.
  // Neither fact rewrites the verb Source or stores a finished noun.
  "ihyā-ya": { patientiveVowelAlternation: { from: "ā", to: "e" } },
  "huetzi": { patientiveVowelAlternation: { from: "e", to: "a" } },
});

// These records license only the exceptional human/nonhuman interpretation
// contrast in §38.1.5. They never gate the productive patientive route.
const PATIENTIVE_CONTRAST_FACTS = deepFreeze({
  "huīca": {
    mode: "human-source-realization-choice",
    readings: ["regular-human-tla", "exceptional-human-te"],
  },
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
  },
  "tlāuh-ti-ā": {
    mode: "human-source-realization-choice",
    readings: [
      "regular-human-tla",
      "anomalous-nonhuman-te",
    ],
  },
  "nō-nōtza": {
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
  "tlap-ā-ni": { stockKind: "ni-stock", targetBase: "tlap-a", allomorphs: ["c"] },
  // §39.4.1 attests z; §40.11 additionally attests c. Keep the earlier
  // reading as the default without treating its example as exhaustive.
  "yam-ā-ni": { stockKind: "ni-stock", targetBase: "yam-a", allomorphs: ["z", "c"], defaultAllomorph: "z" },
  "chacu-ā-ni": { stockKind: "ni-stock", targetBase: "chacu-a", allomorphs: ["ch"] },
  "xi-ni": { stockKind: "ni-stock", targetBase: "xi", allomorphs: ["c"] },
  "pō-ni": { stockKind: "ni-stock", targetBase: "pō", allomorphs: ["c", "ch"] },
  "tō-ni": { stockKind: "ni-stock", targetBase: "tō", allomorphs: ["ch"], nounClassOptions: ["tli", "in"] },
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
  "tīc-ē-hua": {
    stockKind: "hua-stock",
    allomorphs: ["c"],
    sourceReadings: ["become-the-color-of-chalk"],
    resultReadings: ["chalkish-colored-thing"],
    rootSourceFrame: {
      sourceKind: "downgraded-nounstem",
      nounstem: "tīza-tl",
      downgradedRoot: "tīc",
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
    stockKind: "ni-stock",
    stockKindByAllomorph: { c: "ni-stock", zero: "bare-stock-agentive" },
    allomorphs: ["c", "zero"],
    nounClassByAllomorph: { c: "tli", zero: "tl" },
    sourceReadings: [
      "make-a-yipping-or-howling-sound",
      "become-a-hole",
    ],
    sourceReadingsByAllomorph: { c: ["become-a-hole"], zero: ["make-a-yipping-or-howling-sound"] },
    resultReadingsByAllomorph: { c: ["thing-that-has-become-a-hole"], zero: ["entity-that-yips-or-howls", "coyote"] },
    lexicalEvidenceAllomorphs: ["zero"],
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
  "mōy-ō-ni": {
    stockKind: "bare-stock-agentive",
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
  } else if (/(?:^|-)ā-hui$/u.test(stem)) {
    // §24.5 documents a long stock formative with hui. The bare-root
    // operation removes that formative; it never shortens the Source.
    stockKind = "long-stock-hui-root";
    structuralBase = stem.replace(/-ā-hui$/u, "");
    stockFormativeVowel = "ā";
    structuralAllomorphs = ["zero"];
    structuralTargetBaseByAllomorph = { zero: structuralBase };
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
  // A licensed bare-stock agentive uses the unshortened stock. Suffixal
  // patientives continue through the ordinary stock-formative shortening.
  if (stockKind === "ni-stock") {
    for (const allomorph of allomorphs) {
      if ((witnessedFact?.stockKindByAllomorph?.[allomorph]
        || witnessedFact?.stockKind) === "bare-stock-agentive") {
        structuralTargetBaseByAllomorph[allomorph] = stem.replace(/-?ni$/u, "");
      }
    }
  }
  return deepFreeze({
    stockKind: witnessedFact?.stockKind || stockKind,
    stockKindByAllomorph: witnessedFact?.stockKindByAllomorph || {},
    targetBase: witnessedFact?.targetBase || structuralBase,
    targetBaseByAllomorph:
      witnessedFact?.targetBaseByAllomorph
      || structuralTargetBaseByAllomorph,
    allomorphs,
    defaultAllomorph: allomorphs.includes(witnessedFact?.defaultAllomorph)
      ? witnessedFact.defaultAllomorph
      : allomorphs.length === 1 ? allomorphs[0] : "",
    allomorphChoiceRequired: allomorphs.length > 1,
    nounClass: witnessedFact?.nounClass || "tli",
    nounClassByAllomorph:
      witnessedFact?.nounClassByAllomorph
      || (stockKind === "hua-stock" ? { zero: "tl" } : {}),
    nounClassOptions: witnessedFact?.nounClassOptions || [],
    nounClassOptionsByAllomorph: witnessedFact?.nounClassOptionsByAllomorph || {},
    vowelRealizationRule:
      witnessedFact?.vowelRealizationRule
      || (stockFormativeShorteningApplied
        ? "shorten-stock-formative-long-vowel"
        : "retain-typed-stock-vowel"),
    sourceReadings: Object.freeze([
      ...(witnessedFact?.sourceReadings || []),
    ]),
    sourceReadingsByAllomorph: witnessedFact?.sourceReadingsByAllomorph || {},
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
    lexicalEvidenceAllomorphs: witnessedFact?.lexicalEvidenceAllomorphs || null,
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
      witnessedFact?.targetBase
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

function selectRootStockFormationProfile(rootStock, allomorph = "") {
  const stockKind = rootStock.stockKindByAllomorph?.[allomorph] || rootStock.stockKind;
  const stockBase = rootStock.targetBaseByAllomorph?.[allomorph] || rootStock.targetBase;
  const defaultNounClass = rootStock.nounClassByAllomorph?.[allomorph] || rootStock.nounClass;
  const availableNounClasses = Object.freeze([
    ...(rootStock.nounClassOptionsByAllomorph?.[allomorph]
      || (rootStock.nounClassOptions?.length ? rootStock.nounClassOptions : [defaultNounClass])),
  ]);
  const shortening = stockKind === "bare-stock-agentive" ? false : rootStock.stockFormativeShorteningApplied;
  return { stockKind, stockBase, defaultNounClass, availableNounClasses,
    nounClassChoiceAvailable: availableNounClasses.length > 1,
    nounClassChoiceRequired: !availableNounClasses.includes(defaultNounClass),
    stockFormativeShorteningApplied: shortening,
    vowelRealizationRule: stockKind === "bare-stock-agentive"
      ? "retain-agentive-stock-vowel-length" : rootStock.vowelRealizationRule,
    sourceReadings: rootStock.sourceReadingsByAllomorph?.[allomorph] || rootStock.sourceReadings,
    lexicalEvidenceFrame: !rootStock.lexicalEvidenceAllomorphs
      || rootStock.lexicalEvidenceAllomorphs.includes(allomorph) ? rootStock.lexicalEvidenceFrame : null,
  };
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
  const selected = rootStock && selectRootStockFormationProfile(rootStock,
    normalizeKey(request.rootStockAllomorph) || rootStock.defaultAllomorph);
  return rootStock
    ? deepFreeze({
      kind: "classical-nahuatl-root-stock-patientive-choice-inventory",
      version: VERSION,
      authorizationStatus: "authorized",
      blockReason: "",
      sourceStem,
      sourceStage,
      stockKind: selected.stockKind,
      stockBase: selected.stockBase,
      availableNounClasses: selected.availableNounClasses,
      defaultNounClass: selected.defaultNounClass,
      nounClassChoiceAvailable: selected.nounClassChoiceAvailable,
      nounClassChoiceRequired: selected.nounClassChoiceRequired,
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
    "canonicalNncSourceFrame",
    "canonicalPatientiveCoreSourceFrame",
    "canonicalOwnerhoodNncResult",
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

function getPatientiveSourceFact(table, sourceStem = "") {
  const stem = normalizeStem(sourceStem);
  return table[stem] || Object.entries(table).find(([key]) =>
    key.replaceAll("-", "") === stem.replaceAll("-", ""))?.[1] || null;
}

function getPatientiveContrastInventory({
  sourceStem = "",
  sourceValence = "",
  canonicalVncResult = null,
} = {}, target = globalThis) {
  const exactParentSupplied = canonicalVncResult !== null
    && canonicalVncResult !== undefined;
  // Read the existing owner-issued nucleus of an authentic App internally;
  // retain the actual outer operand in the inventory receipt.
  const captureInput = exactParentSupplied
    && target.isClassicalNahuatlVncApplicationFrame?.(canonicalVncResult) === true
    ? canonicalVncResult.resultFrame : canonicalVncResult;
  const capture = exactParentSupplied
    ? captureImpersonalPatientiveVncResult(captureInput, target) : null;
  const exactSourceAccepted = !exactParentSupplied
    || isClassicalNahuatlImpersonalPatientiveVncCaptureFrame(capture);
  const normalizedStem = normalizeStem(exactParentSupplied
    ? capture?.activeSourceStem : sourceStem);
  const normalizedValence = normalizeKey(exactParentSupplied
    ? capture?.activeSourceValence : sourceValence);
  const impersonalizedPassiveSource = Boolean(exactParentSupplied
    && exactSourceAccepted && hasImpersonalizedPassivePatientiveSource(capture));
  const profile = getPatientiveSourceFact(PATIENTIVE_CONTRAST_FACTS, normalizedStem);
  const applicable = Boolean(
    exactSourceAccepted && profile
    && ["projective-human", "projective-nonhuman"].includes(
      normalizedValence
    )
  );
  const readings = applicable
    ? Array.from(profile.readings || []).filter(reading => (
      !exactParentSupplied || reading !== "regular-human-tla"
      || impersonalizedPassiveSource
    ))
    : [];
  const choiceRequired = Boolean(
    applicable
    && profile.mode === "human-source-realization-choice"
    && normalizedValence === "projective-human"
    && readings.length > 1
  );
  const automaticReading = !applicable
    ? ""
    : readings.length === 1
      ? readings[0]
      : profile.mode === "source-valence-disambiguated"
      ? normalizedValence === "projective-human"
        ? "regular-human-tla"
        : "anomalous-nonhuman-te"
      : "";
  return deepFreeze({
    kind:
      "classical-nahuatl-lesson38-patientive-contrast-inventory",
    version: VERSION,
    authorizationStatus: !exactSourceAccepted ? "blocked"
      : applicable ? "authorized" : "not-applicable",
    blockReason: exactSourceAccepted ? "" : "exact-owner-issued-impersonal-vnc-result-required",
    canonicalVncResult: exactParentSupplied ? canonicalVncResult : null,
    sourcePrerequisiteStatus: exactParentSupplied
      ? exactSourceAccepted ? "authorized" : "blocked" : "unclaimed",
    impersonalizedPassiveSource,
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

function hasImpersonalizedPassivePatientiveSource(capture = null) {
  return Boolean(isClassicalNahuatlImpersonalPatientiveVncCaptureFrame(capture)
    && capture.humanProjectiveImpersonalizedPassive === true
    && capture.passivePatientPromotionApplied === true
    && capture.passivePatientSubjectThenDeletedByImpersonalization === true
    && capture.voiceOperationSequence?.length === 3
    && capture.voiceOperationSequence[0] === "active"
    && capture.voiceOperationSequence[1] === "passive"
    && capture.voiceOperationSequence[2] === "impersonalized-passive");
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
  instrumentiveCitationFactStem = "",
  patientiveContrastFactStem = "",
  impersonalPatientiveFactStem = "",
  actionCompoundMatrixStem = "",
  patientiveCompoundMatrixStem = "",
} = {}) {
  const lexicalSourceIdentity = normalizeStem(lexicalFactStem) || sourceStem;
  const facts = LEXICAL_SOURCE_FACTS[lexicalSourceIdentity] || {};
  const possessiveAgentiveYoMatrix = facts.possessiveAgentiveYoMatrix === true
    || facts.possessiveAgentiveYoObjectPattern === sourceObjectPattern;
  const patientiveContrastProfile =
    getPatientiveSourceFact(PATIENTIVE_CONTRAST_FACTS,
      normalizeStem(patientiveContrastFactStem) || lexicalSourceIdentity);
  const rootStock = deriveRootStockAuthorization({
    sourceStem,
    sourceStage,
  });
  const preteritAgentiveVariants = (sourceObjectPattern === "reflexive"
    ? facts.preteritAgentiveReflexiveVariants : null)
    || facts.preteritAgentiveVariants
    || ["ordinary"];
  const finalIRealizations = facts.finalIRealizations || ["preserve"];
  // §37.5.1 documents huechi as the liz allomorph of a compound's
  // huetzi matrix. This lexical alternation is not the productive ti rule.
  const actionStemVariants = actionCompoundMatrixStem === "huetzi"
    && sourceVoice === "active"
    ? ["none", "tzi-to-chi"]
    : deriveLizActionStemOptions(sourceStem, facts);
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
    ...(possessiveAgentiveYoMatrix
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
    instrumentiveAbsolutiveCitation: sourceStage === "imperfect-predicate"
      && sourceVoice === "active"
      && ((instrumentiveCitationFactStem === "cochi" && sourceObjectPattern === "none")
        || (instrumentiveCitationFactStem === "icza" && sourceObjectPattern === "nonspecific-nonhuman"))
      ? LEXICAL_SOURCE_FACTS[instrumentiveCitationFactStem]?.instrumentiveAbsolutiveCitation || ""
      : "",
    verbClass,
    oldPersonFamily: facts.oldPersonFamily || "",
    preteritAgentiveVariants,
    yauhTiOwner: facts.yauhTiOwner === true,
    possessiveAgentiveYoMatrix,
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
      facts.exceptionalHumanPrefixRetention === true
      || getPatientiveSourceFact(LEXICAL_SOURCE_FACTS, impersonalPatientiveFactStem)
        ?.exceptionalHumanPrefixRetention === true,
    patientiveVowelAlternation:
      getPatientiveSourceFact(LEXICAL_SOURCE_FACTS, impersonalPatientiveFactStem)
        ?.patientiveVowelAlternation || null,
    patientiveNounVowelVariantOptions:
      patientiveCompoundMatrixStem === "huetzi" ? ["e", "a"] : [],
    patientiveLexicalReadings: Array.from(
      facts.patientiveLexicalReadings || []
    ),
    patientiveContrastProfile,
    impersonalPatientiveRetainsActiveFinalW:
      LEXICAL_SOURCE_FACTS[normalizeStem(impersonalPatientiveFactStem)]
        ?.impersonalPatientiveRetainsActiveFinalW === true,
    rootStockAuthorization: rootStock
      ? {
        stockKind: rootStock.stockKind,
        stockKindByAllomorph: rootStock.stockKindByAllomorph,
        targetBase: rootStock.targetBase,
        targetBaseByAllomorph: rootStock.targetBaseByAllomorph,
        allomorphs: rootStock.allomorphs,
        defaultAllomorph: rootStock.defaultAllomorph,
        allomorphChoiceRequired: rootStock.allomorphChoiceRequired,
        nounClass: rootStock.nounClass || "tli",
        nounClassByAllomorph:
          rootStock.nounClassByAllomorph || {},
        nounClassOptions: rootStock.nounClassOptions,
        nounClassOptionsByAllomorph: rootStock.nounClassOptionsByAllomorph,
        vowelRealizationRule: rootStock.vowelRealizationRule,
        sourceReadings: rootStock.sourceReadings,
        sourceReadingsByAllomorph: rootStock.sourceReadingsByAllomorph,
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
        lexicalEvidenceAllomorphs: rootStock.lexicalEvidenceAllomorphs,
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

// Translate only the authenticated VNC projection into nominal valence terms.
// Its original voice, reflexive placement and exact object requests stay in it.
function nominalValenceFromVncProjection(projection) {
  return projection?.sourceValence === "multiple-object" ? "double-object"
    : ["specific-projective", "mainline-reflexive", "shuntline-reflexive"].includes(projection?.sourceValence)
      ? "single-object" : projection?.sourceValence;
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

function getVncResultTense(result = null, target = globalThis) {
  const selected = result?.selectedMachineryFrame || null;
  // Exact tla fusion wraps the target finite coordinate in its issued late
  // operation. Read that owner-held coordinate instead of the earlier Source.
  const fusionOperation = target.isClassicalNahuatlVncApplicationIssuedResultFrame?.(result) === true
    && target.isClassicalNahuatlMachineryFrame?.(selected) === true
    && target.isClassicalNahuatlOperationFrame?.(selected.operationFrame) === true
    && selected.operationFrame.operation === "tla-fusion"
    && selected.operationFrame.targetTypedVncSlotFrame === result.finalTypedVncSlotFrame
    && selected.operationFrame.targetCoordinate?.tense
      === selected.operationFrame.operationFacts?.priorVncFrame?.tense
      ? selected.operationFrame : null;
  const targetPredicate = selected?.predicateFormationRuleFrame
    || result?.matrixApplicationFrame?.resultFrame?.selectedMachineryFrame
      ?.predicateFormationRuleFrame;
  const targetTense = targetPredicate?.authorizationStatus === "authorized"
    && targetPredicate.semanticSelectionAuthorized === true
    ? targetPredicate.tense : "";
  const active = selected?.activeMachineryFrame || selected;
  const prior = active?.priorVncFrame
    || active?.targetLesson7MachineryFrame?.priorVncFrame
    || selected?.priorVncFrame
    || fusionOperation?.operationFacts?.priorVncFrame
    || null;
  const tense = normalizeKey(
    result?.normalizedRequest?.tense
      || targetTense
      || prior?.tense
      || prior?.tenseFrame?.tense
      || active?.lesson11VncApplicationFrame?.morphologicalTense
      || selected?.lesson11VncApplicationFrame?.morphologicalTense
  );
  // A completed standing-state compound retains its semantic request. Its
  // issued predicate formation supplies the morphological coordinate used
  // by nominalization; do not replace the whole Result with its matrix.
  return tense === "preterit-as-present" && targetTense === "preterit"
    ? "preterit" : tense;
}

function getCapturedPreteritNumberRepertory(sourceFrame, target) {
  const capture = sourceFrame.preteritVncCaptureFrame;
  const predicate = capture?.canonicalVncTypedSlotFrame?.slots?.predicate;
  if (!capture || !ISSUED_PRETERIT_VNC_CAPTURE_FRAMES.has(capture)
    || capture.authorizationStatus !== "authorized"
    || capture.morphologicalTense !== "preterit"
    || !["A", "B", "C", "D"].includes(capture.verbClass)
    || target.isClassicalNahuatlVncSlotFrame?.(capture.canonicalVncTypedSlotFrame) !== true
    || !predicate?.stem
    || typeof target.getClassicalNahuatlFiniteSubjectNumberDyad !== "function"
    || typeof target.isClassicalNahuatlFiniteSubjectNumberDyad !== "function") return null;
  // Project a number repertoire from the authenticated completed Source,
  // including when its actual actor was plural. This is not a new Source
  // Result or a permission to replace its participant dependencies.
  const frame = target.getClassicalNahuatlFiniteSubjectNumberDyad({
    subject: "3sg", mood: "indicative", tense: capture.morphologicalTense,
    stem: predicate.stem, verbClass: capture.verbClass,
  });
  return target.isClassicalNahuatlFiniteSubjectNumberDyad(frame) === true
    && frame?.num1Variants?.includes("⎕")
    && frame.num1Variants.includes("qui") ? frame : null;
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

function captureRootStockPatientiveVncResult(result = null, target = globalThis) {
  const wholeParent = result;
  if (target.isClassicalNahuatlVncSentenceResultFrame?.(result) === true) {
    result = result.canonicalResultFrame;
  }
  if (target.isClassicalNahuatlVncApplicationFrame?.(result) === true) {
    result = result.resultFrame;
  } else if (target.isClassicalNahuatlNominalConstructionResult?.(result) === true
    && result.constructionKind === "nominal-embed-vnc"
    && target.isClassicalNahuatlVncApplicationFrame?.(result.canonicalResult) === true) {
    result = result.canonicalResult.resultFrame;
  }
  const projection = getExactVncResultSourceProjection(result, target);
  const sourceVerbstem = normalizeStem(projection?.sourceStem);
  const voice = normalizeKey(projection?.sourceVoice);
  const objects = projection?.sourceObjectRequests || [];
  const objectPattern = sourceObjectPatternFromVncProjection(projection);
  const operation = projection?.canonicalOperationFrame || result?.operationFrame
    || result?.selectedMachineryFrame?.derivationOperationFrame
    || result?.derivationOperationFrame || null;
  const slots = result?.finalTypedVncSlotFrame;
  // These are explicitly analyzed destockal boundaries, not any word that
  // happens to end in ni, ca or hua. Ordinary chīhua/maca are not such Sources.
  const stockShape = /-[āēīō]-ni$/u.test(sourceVerbstem)
    || /(?:^|-)[^-]+[āēīō]-ni$/u.test(sourceVerbstem)
    || /-(?:[aeio]|[āēīō])-ca$/u.test(sourceVerbstem)
    || /-[āēīō]-hua$/u.test(sourceVerbstem)
    || /-(?:i|a)-hui$/u.test(sourceVerbstem)
    || Object.hasOwn(ROOT_STOCK_FACTS, sourceVerbstem);
  const causativeShape = /-o-ā$/u.test(sourceVerbstem)
    && operation?.derivationType === "causative"
    && objects.length === 1
    && normalizeKey(objects[0]?.objectKind) === "nonspecific-nonhuman";
  const sourceStem = causativeShape
    ? joinMorphs(["tla", sourceVerbstem]) : sourceVerbstem;
  const authorization = deriveRootStockAuthorization({sourceStem, sourceStage:"root-or-stock"});
  const active = voice === "active"
    && !["passive", "impersonal", "nonactive"].includes(normalizeKey(result?.selectedVoice));
  const authorized = Boolean(projection && result?.authorizationStatus === "authorized"
    && active && target.isClassicalNahuatlVncSlotFrame?.(slots) === true
    && authorization && authorization.stockKind !== "unknown-source-deverbal-nounstem"
    && (causativeShape || (stockShape && objects.length === 0
      && projection.sourceValence === "intransitive")));
  if (!authorized) return deepFreeze({
    kind:"classical-nahuatl-root-stock-patientive-vnc-capture-frame",version:VERSION,
    authorizationStatus:"blocked",
    blockReason:!projection ? "exact-owner-issued-vnc-result-required"
      : !active ? "39.4-active-destockal-source-required"
      : "39.4-typed-destockal-verbstem-source-required",
    formulaStringAuthority:false,surfaceStringAuthority:false,
  });
  const frame = deepFreeze({
    kind:"classical-nahuatl-root-stock-patientive-vnc-capture-frame",version:VERSION,
    authorizationStatus:"authorized",blockReason:"",
    canonicalVncResult:wholeParent,canonicalNucleusResult:result,
    continuationProjection:projection,
    canonicalVncSourceMachineryFrame:projection.canonicalSourceMachineryFrame || result.selectedMachineryFrame,
    canonicalVncSourceAnalysisFrame:result.sourceAnalysisFrame
      || result.baseApplicationFrame?.resultFrame?.sourceAnalysisFrame || null,
    canonicalVncOperationFrame:operation,canonicalVncTypedSlotFrame:slots,
    sourceUnit:"owner-issued-vnc-result",sourceStage:"root-or-stock",
    sourceVerbstem,sourceStem,verbClass:projection.verbClass,
    sourceVoice:voice,sourceValence:causativeShape ? "projective-nonhuman" : projection.sourceValence,
    sourceObjectPattern:objectPattern,sourceSubject:projection.sourceSubject,
    sourceObjectRequests:objects,rootStockAuthorization:authorization,
    exactResultIdentityPreserved:true,exactSourceAndOperationIdentityPreserved:true,
    grammarAuthority:false,callerSuppliedAuthorityAccepted:false,
    formulaStringAuthority:false,surfaceStringAuthority:false,
  });
  ISSUED_ROOT_STOCK_PATIENTIVE_VNC_CAPTURE_FRAMES.add(frame);
  return frame;
}

function isClassicalNahuatlRootStockPatientiveVncCaptureFrame(frame = null) {
  return Boolean(ISSUED_ROOT_STOCK_PATIENTIVE_VNC_CAPTURE_FRAMES.has(frame)
    && frame?.authorizationStatus === "authorized" && frame.exactResultIdentityPreserved === true
    && frame.callerSuppliedAuthorityAccepted === false && Object.isFrozen(frame));
}

function captureTypedCompoundVncSource(result = null, projection = null, target = globalThis) {
  const nominal = projection?.canonicalNominalConstructionResultFrame;
  const whole = projection?.canonicalNominalSourceResultFrame;
  const exactNominal = target.isClassicalNahuatlNominalConstructionResult?.(nominal) === true
    && nominal.authorizationStatus === "authorized"
    && nominal.constructionKind === "nominal-embed-vnc";
  const wholeAuthorized = whole === nominal || (
    target.isClassicalNahuatlDeverbalNncGrammarFrame?.(whole) === true
    && whole.authorizationStatus === "authorized"
    && whole.constructionKind === "patientive-embed-continuation"
    && whole.canonicalResult === nominal
  );
  if (exactNominal && wholeAuthorized) {
    const relation = nominal.operationFrame.relation === "object"
      ? "incorporated-object" : "adverbial-embed";
    const embedStem = normalizeStem(nominal.operationFrame.embedShape?.realizedStem);
    const matrixStem = normalizeStem(nominal.sourceFrame.matrixStem);
    if (embedStem && matrixStem) return deepFreeze({
      kind: "classical-nahuatl-lesson38-compound-vnc-source-capture-frame",
      version: VERSION, authorizationStatus: "authorized",
      canonicalVncResult: result,
      canonicalNominalSourceResultFrame: whole,
      canonicalNominalConstructionResultFrame: nominal,
      canonicalVncSourceAnalysisFrame: result?.sourceAnalysisFrame || null,
      canonicalNominalSourceAuthorizationFrame: nominal.sourceAuthorizationFrame,
      canonicalSourceSelectionFrame: nominal.operationFrame,
      activeCompoundStem: normalizeStem(projection.sourceStem),
      embedStem, matrixStem,
      sourceConstituentOrder: Object.freeze(["embed", "matrix"]),
      resolvedRelation: relation, relationOptions: Object.freeze([relation]),
      exactResultIdentityPreserved: true, exactSourceAnalysisIdentityPreserved: true,
      examplesAuthorizeRoute: false, grammarAuthority: false,
      callerSuppliedAuthorityAccepted: false,
      formulaStringAuthority: false, surfaceStringAuthority: false,
    });
  }
  const coordinate = result?.operationFrame?.operationFacts?.nominalMatrixCoordinateFrame;
  if (target.isClassicalNahuatlClosureFrame?.(result) === true
    && target.isClassicalNahuatlNominalVncMatrixCoordinateFrame?.(coordinate) === true) {
    const relation = coordinate.operationFrame.relation === "object"
      ? "incorporated-object" : "adverbial-embed";
    return deepFreeze({
      kind: "classical-nahuatl-lesson38-compound-vnc-source-capture-frame",
      version: VERSION, authorizationStatus: "authorized",
      canonicalVncResult: result,
      canonicalVncSourceAnalysisFrame: coordinate.matrixCoordinate.resultFrame.sourceAnalysisFrame,
      canonicalNominalSourceAuthorizationFrame: coordinate.sourceAuthorizationFrame,
      canonicalSourceSelectionFrame: coordinate,
      activeCompoundStem: normalizeStem(projection.sourceStem),
      embedStem: normalizeStem(coordinate.embedStem),
      matrixStem: normalizeStem(coordinate.nominalRequest.source.matrixStem),
      sourceConstituentOrder: Object.freeze(["embed", "matrix"]),
      resolvedRelation: relation, relationOptions: Object.freeze([relation]),
      exactResultIdentityPreserved: true, exactSourceAnalysisIdentityPreserved: true,
      examplesAuthorizeRoute: false, grammarAuthority: false,
      callerSuppliedAuthorityAccepted: false,
      formulaStringAuthority: false, surfaceStringAuthority: false,
    });
  }
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

function buildBlockedFrameForObsoleteRoot(blockReason) {
  return deepFreeze({kind: "classical-nahuatl-preterit-vnc-nominalization-capture-frame",
    version: VERSION, authorizationStatus: "blocked", blockReason,
    formulaStringAuthority: false, surfaceStringAuthority: false});
}

function capturePreteritVncResult(result = null, target = globalThis, sourceAnalysis = "ordinary", generalUseOnly = false) {
  const exactInputResult = result;
  if (target?.isClassicalNahuatlVncSentenceResultFrame?.(result) === true) {
    if (target?.isClassicalNahuatlVncApplicationFrame?.(result.vncApplicationFrame) === true) {
      result = result.vncApplicationFrame.resultFrame;
    } else if (target?.isClassicalNahuatlClosureFrame?.(result.lateOperationClosureFrame) === true) {
      result = result.lateOperationClosureFrame;
    } else if (target?.isClassicalNahuatlNominalConstructionResult?.(result.canonicalResultFrame) === true) {
      result = result.canonicalResultFrame;
    }
  }
  // A genuine application is the retained parent; its issued finite child
  // supplies the completed preterit coordinate, just as inside a Sentence.
  if (target?.isClassicalNahuatlVncApplicationFrame?.(result) === true) {
    result = result.resultFrame;
  }
  // The whole issued nominal compound is the retained parent. Its genuine
  // finite child supplies the completed predicate coordinate, as it does
  // for customary and other predicate nominalizations.
  if (target?.isClassicalNahuatlNominalConstructionResult?.(result) === true
    && result.constructionKind === "nominal-embed-vnc"
    && result.authorizationStatus === "authorized") {
    result = result.canonicalResult?.resultFrame;
  }
  // Denominal grammar retains the exact nominal ancestor in its issued
  // facade. The native finite child supplies tense/class/slot authority;
  // normalizing the public parent itself would discard that genealogy.
  const denominalParent = target?.isClassicalNahuatlDenominalVncResultFrame?.(result) === true
    ? result : null;
  if (denominalParent) result = denominalParent.canonicalVncFrame.resultFrame;
  let obsoleteRootPreteritAnalysis = null;
  const ownedDerivedRootSource = result?.selectedMachineryFrame?.obsoleteRootSourceMachineryFrame;
  if (sourceAnalysis === "ordinary"
    && target.isClassicalNahuatlVerbstemClassFrame?.(ownedDerivedRootSource) === true
    && ["huēiya", "tlaōcoya"].includes(normalizeStem(ownedDerivedRootSource.stem).replace(/-/gu, ""))) {
    return buildBlockedFrameForObsoleteRoot("40.9-source-does-not-use-obsolete-root-adjective");
  }
  if (!["ordinary", "obsolete-root"].includes(sourceAnalysis)) {
    return buildBlockedFrameForObsoleteRoot("40.9-preterit-source-analysis-required");
  }
  if (sourceAnalysis === "obsolete-root") {
    const originalProjection = getExactVncResultSourceProjection(result, target);
    const fullStem = normalizeStem(originalProjection?.sourceStem);
    const originalVoice = normalizeKey(result?.selectedVoice || originalProjection?.sourceVoice || "active");
    if (!originalProjection || originalVoice !== "active"
      || originalProjection.sourceValence !== "intransitive"
      || !/-ya$/u.test(fullStem)) {
      return buildBlockedFrameForObsoleteRoot("40.9-typed-intransitive-root-plus-ya-source-required");
    }
    // Andrews 40.9 explicitly contrasts these lexical formations with the root route.
    if (fullStem.replace(/-/gu, "") === "tlaōcoya"
      || (!generalUseOnly && fullStem.replace(/-/gu, "") === "huēiya")) {
      return buildBlockedFrameForObsoleteRoot("40.9-source-does-not-use-obsolete-root-adjective");
    }
    const rootStem = fullStem.replace(/-ya$/u, "");
    const application = target?.deriveClassicalNahuatlObsoleteRootVncApplication?.(exactInputResult);
    if (target?.isClassicalNahuatlVncApplicationFrame?.(application) !== true
      || application.authorizationStatus !== "authorized") {
      return buildBlockedFrameForObsoleteRoot("40.9-root-class-a-preterit-unavailable");
    }
    obsoleteRootPreteritAnalysis = deepFreeze({
      rule: "40.9-obsolete-root-preterit", originalVncResult: exactInputResult,
      originalNucleusResult: result, originalSourceStem: fullStem,
      rootStem, derivedClass: "A", derivedVncApplication: application,
      rootRemoval: "ya", originalClassPreservedInSource: true,
      generalUseOnly, generalUseStem: joinMorphs([rootStem, "0", "cā"]),
      grammaticalFormationNotSurfaceSubstitution: true,
    });
    result = application.resultFrame;
  }
  const projection = getExactVncResultSourceProjection(
    denominalParent && !obsoleteRootPreteritAnalysis ? denominalParent : result, target
  );
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
  const sourceValence = nominalValenceFromVncProjection(projection);
  const frame = deepFreeze({
    kind: "classical-nahuatl-preterit-vnc-nominalization-capture-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    blockReason: "",
    canonicalVncResult: exactInputResult,
    canonicalNucleusResult: result,
    obsoleteRootPreteritAnalysis,
    continuationProjection: projection,
    canonicalVncSourceAnalysisFrame: result.sourceAnalysisFrame || null,
    canonicalVncTypedSlotFrame: typedSlotFrame,
    sourceUnit: "owner-issued-vnc-result",
    sourceStage: "preterit-predicate",
    sourceStem: predicateStem,
    // Completed passive class governs this predicate; lexical class ancestry
    // remains intact in continuationProjection.
    verbClass: normalizeToken(
      result.selectedVoice === "passive"
        ? result.selectedMachineryFrame?.classId || projection.verbClass
        : projection.verbClass
    ).toUpperCase().replace(/^([A-D])-.*$/u, "$1"),
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

function captureOwnerhoodPerfectivePatientiveSource(result, target) {
  if (!isClassicalNahuatlDeverbalNncGrammarFrame(result)
    || result.operationFrame?.constructionKind !== "ownerhood"
    || result.operationFrame.ownerhoodBoundaryFrame?.preteritOnly !== true) return null;
  const operation = result.operationFrame;
  const sourceCapture = operation.ownerhoodSourceCaptureFrame;
  if (!isOwnerhoodNncSourceCapture(sourceCapture)) return null;
  const embedded = sourceCapture.canonicalNncResult;
  const projection = target.getClassicalNahuatlNncContinuationSourceConstituents?.(embedded);
  const humanSource = projection?.subjectParticipantFrame?.animacy === "animate"
    && projection.subjectParticipantFrame.humanness === "human";
  const lifeSource = isClassicalNahuatlDeverbalNncGrammarFrame(embedded)
    && embedded.operationFrame?.constructionKind === "patientive"
    && embedded.sourceFrame?.perfectivePatientiveVncCaptureFrame?.lexicalSourceStem === "yōli"
    && embedded.sourceFrame.sourceStem === "yōl";
  const acquired = operation.ownerhoodMatrix === "huā" && humanSource;
  const abundantLife = operation.ownerhoodMatrix === "yō-ā" && lifeSource;
  if (!acquired && !abundantLife) return null;
  const predicate = normalizeStem(operation.targetStems?.restrictedUse);
  if (!predicate.endsWith("-0")) return null;
  const stem = predicate.slice(0, -2);
  const ownerhoodPerfectiveSourceFrame = deepFreeze({
    kind: "classical-nahuatl-ownerhood-perfective-patientive-source-frame",
    authorizationStatus: "authorized",
    canonicalOwnerhoodNncResult: result,
    canonicalOwnerhoodOperationFrame: operation,
    canonicalEmbeddedNncResult: embedded,
    canonicalOwnerhoodSourceCaptureFrame: sourceCapture,
    canonicalOwnerhoodBoundaryFrame: operation.ownerhoodBoundaryFrame,
    canonicalEmbeddedParticipantFrame: projection?.subjectParticipantFrame || null,
    readingOptions: acquired ? ["acquired-family", "acquired-slave"] : ["abundant-life"],
    automaticReading: abundantLife ? "abundant-life" : "",
    contextualReadingRequired: acquired,
    predicateStem: stem,
    independentFiniteVncAuthorized: false,
    finiteContinuationRestrictionPreserved: true,
    grammarAuthority: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
  const frame = deepFreeze({
    kind: "classical-nahuatl-perfective-patientive-vnc-capture-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    blockReason: "",
    canonicalVncResult: null,
    canonicalNncResult: result,
    canonicalOwnerhoodNncResult: result,
    canonicalNucleusResult: null,
    canonicalNncSourceFrame: result.sourceFrame,
    canonicalNncOperationFrame: operation,
    canonicalNncTypedSlotFrame: result.canonicalResult?.nncSlotFrame || null,
    ownerhoodPerfectiveSourceFrame,
    sourceUnit: "owner-issued-ownerhood-perfective-predicate",
    sourceStage: "perfective-core",
    sourceStem: stem,
    activeSourceStem: stem,
    lexicalSourceStem: stem,
    verbClass: "",
    sourceVoice: "active",
    sourceValence: "intransitive",
    activeSourceValence: "intransitive",
    sourceObjectPattern: "none",
    sourceObjectRequests: [],
    sourceSubject: result.canonicalResult?.subject || "3sg",
    sourceIsCompound: true,
    morphologicalTense: "preterit",
    exactResultIdentityPreserved: true,
    completeTypedSourceAnalysisPreserved: true,
    projectionRole: "read-only-fixed-ownerhood-perfective-predicate-to-patientive-source",
    grammarAuthority: false,
    callerSuppliedAuthorityAccepted: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
  ISSUED_PERFECTIVE_PATIENTIVE_VNC_CAPTURE_FRAMES.add(frame);
  return frame;
}

function capturePerfectivePatientiveVncResult(
  result = null,
  target = globalThis
) {
  const ownerhoodSource = captureOwnerhoodPerfectivePatientiveSource(result, target);
  if (ownerhoodSource) return ownerhoodSource;
  const exactInputResult = result;
  const nominalWhole = target?.isClassicalNahuatlNominalConstructionResult?.(result) === true
    && result.authorizationStatus === "authorized"
    && result.constructionKind === "nominal-embed-vnc"
    && result.canonicalResult?.authorizationStatus === "authorized"
    ? result : null;
  // The owned finite child supplies the active perfective constitution;
  // the complete nominal compound remains the exact patientive parent.
  if (nominalWhole) result = nominalWhole.canonicalResult.resultFrame;
  let wrappedVncApplication = null;
  if (target?.isClassicalNahuatlVncSentenceResultFrame?.(result) === true) {
    if (target?.isClassicalNahuatlVncApplicationFrame?.(result.vncApplicationFrame) === true) {
      wrappedVncApplication = result.vncApplicationFrame;
      result = wrappedVncApplication.resultFrame;
    } else if (target?.isClassicalNahuatlClosureFrame?.(result.lateOperationClosureFrame) === true) {
      result = result.lateOperationClosureFrame;
    }
  }
  let projection = getExactVncResultSourceProjection(result, target);
  if (nominalWhole && projection) {
    projection = deepFreeze({...projection,
      canonicalNominalSourceResultFrame: nominalWhole,
      canonicalNominalConstructionResultFrame: nominalWhole,
    });
  }
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
  const canonicalRequest = wrappedVncApplication?.normalizedRequest
    || result.normalizedRequest || {};
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
    projection,
    target
  );
  const frame = deepFreeze({
    kind: "classical-nahuatl-perfective-patientive-vnc-capture-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    blockReason: "",
    canonicalVncResult: exactInputResult,
    canonicalNucleusResult: result,
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
  const exactInputResult = result;
  let wrappedVncApplication = null;
  if (target?.isClassicalNahuatlNominalConstructionResult?.(result) === true
    && result.constructionKind === "nominal-embed-vnc"
    && target?.isClassicalNahuatlVncApplicationFrame?.(result.canonicalResult) === true) {
    wrappedVncApplication = result.canonicalResult;
    result = wrappedVncApplication.resultFrame;
  }
  if (target?.isClassicalNahuatlVncSentenceResultFrame?.(result) === true) {
    if (target?.isClassicalNahuatlVncApplicationFrame?.(result.vncApplicationFrame) === true) {
      wrappedVncApplication = result.vncApplicationFrame;
      result = wrappedVncApplication.resultFrame;
    } else if (target?.isClassicalNahuatlClosureFrame?.(result.lateOperationClosureFrame) === true) {
      result = result.lateOperationClosureFrame;
    }
  }
  const projection = getExactVncResultSourceProjection(result, target);
  const typedSlotFrame = result?.finalTypedVncSlotFrame || null;
  const finitePredicateStem = normalizeStem(
    typedSlotFrame?.slots?.predicate?.stem
  );
  let imperfectiveStem = normalizeStem(projection?.sourceStem)
    || finitePredicateStem;
  const tense = getVncResultTense(result);
  const selectedVoice = normalizeKey(
    result?.selectedVoice
      || result?.normalizedRequest?.requestedVoice
      || result?.normalizedRequest?.voice
      || projection?.sourceVoice
      || ""
  );
  const sourceVoiceOperation = normalizeKey(result?.selectedVoiceOperation || "active");
  const sourceRecord = sourceVoiceOperation === "inherent-impersonal"
    ? result?.selectedMachineryFrame?.inherentImpersonalRecord
    : sourceVoiceOperation === "tla-impersonal"
      ? result?.selectedMachineryFrame?.tlaImpersonalStemRecord : null;
  const inherentSource = Boolean(
    selectedVoice === "impersonal"
    && projection?.sourceVoice === "active"
    && projection.sourceValence === "intransitive"
    && target?.isClassicalNahuatlVncApplicationIssuedResultFrame?.(result) === true
    && sourceRecord?.authorizationStatus === "authorized"
    && Object.isFrozen(sourceRecord)
    && sourceRecord.sourceAnalysis?.authorizationStatus === "authorized"
    && normalizeStem(sourceRecord.sourceStem) === normalizeStem(projection.sourceStem)
    && normalizeStem(sourceRecord.inherentImpersonalStem || sourceRecord.impersonalStem)
      === finitePredicateStem
  );
  if (inherentSource) imperfectiveStem = finitePredicateStem;
  if (
    !projection
    || !imperfectiveStem
    || !finitePredicateStem
    || tense !== "present"
    || (selectedVoice !== "active" && !inherentSource)
  ) {
    return deepFreeze({
      kind:
        "classical-nahuatl-imperfective-patientive-vnc-capture-frame",
      version: VERSION,
      authorizationStatus: "blocked",
      blockReason: !projection
        ? "exact-owner-issued-active-present-vnc-result-required"
        : tense !== "present" || (selectedVoice !== "active" && !inherentSource)
          ? "active-present-vnc-result-required"
          : "typed-imperfective-predicate-stem-required",
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
  }
  const canonicalRequest = wrappedVncApplication?.normalizedRequest
    || result.normalizedRequest || {};
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
    canonicalVncResult: exactInputResult,
    canonicalNucleusResult: result,
    canonicalImpersonalSourceRecord: inherentSource ? sourceRecord : null,
    finiteVoice: selectedVoice,
    sourceVoiceOperation,
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
    "instrumentive-full": {
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

function capturePatientiveComplementActivation(result, target) {
  if (target.isClassicalNahuatlClosureFrame?.(result) !== true) return null;
  const matrix = result.operationFrame?.operationFacts?.nominalMatrixCoordinateFrame;
  const patientive = matrix?.sourceAuthorizationFrame?.lexicalFacts
    ?.capturedEmbedPatientiveCaptureFrame;
  if (target.isClassicalNahuatlNominalVncMatrixCoordinateFrame?.(matrix) !== true
    || !isClassicalNahuatlPatientiveNncContinuationCaptureFrame(patientive)
    || matrix.coordinate.voice !== "active"
    || matrix.operationFrame.relation !== "complement"
    || matrix.operationFrame.orientation !== "subject"
    || matrix.targetObjectRequests.length !== 1
    || matrix.targetObjectRequests[0].objectKind !== "reflexive"
    || normalizeStem(matrix.embedStem) !== normalizeStem(patientive.sourceStem)
    || !patientive.participantCarriersSeparatedOnlyByTypedContinuation) return null;
  const ancestry = getExactVncResultSourceProjection(patientive.canonicalVncResult, target);
  const objects = (ancestry?.sourceObjectRequests || []).filter(object =>
    ["nonspecific-human", "nonspecific-nonhuman"].includes(object.objectKind)
    && object.governor === "directive");
  if (objects.length !== 1) return null;
  const matrixPredicate = normalizeStem(matrix.matrixCoordinate.resultFrame
    ?.finalTypedVncSlotFrame?.slots?.predicate?.stem);
  if (!matrixPredicate) return null;
  return deepFreeze({
    kind: "classical-nahuatl-patientive-complement-activation-capture-frame",
    authorizationStatus: "authorized", canonicalVncResult: result,
    canonicalMatrixCoordinateFrame: matrix,
    canonicalPatientiveNncResult: patientive.canonicalPatientiveNncResult,
    canonicalPatientiveCaptureFrame: patientive,
    canonicalProjectiveSourceResult: patientive.canonicalVncResult,
    activatedInternalObjectRequest: objects[0],
    sourceObjectRequests: [objects[0], ...matrix.targetObjectRequests],
    activatedPredicateStem: joinMorphs([patientive.participantSeparatedSourceStem, matrixPredicate]),
    matrixReflexivePreserved: true, suffixAdded: false,
    grammarAuthority: false, callerSuppliedAuthorityAccepted: false,
    formulaStringAuthority: false, surfaceStringAuthority: false,
  });
}

function actionNominalizationSourceBlockReason(kind, source) {
  if (!["passive-action", "active-action"].includes(kind)) return "";
  const passive = kind === "passive-action";
  if (source.sourceVoice !== (passive ? "passive" : "active")) {
    return `${kind}-requires-${passive ? "passive" : "active"}-distant-past-source`;
  }
  if (passive && !["single-object", "double-object"].includes(source.sourceValence)) {
    return "passive-action-requires-transitive-source";
  }
  if (!passive && source.sourceValence !== "intransitive"
    && source.sourceObjectPattern !== "reflexive") {
    return "nominalized-active-action-requires-intransitive-or-reflexive-source";
  }
  return "";
}

function buildPredicateNominalizationVncCaptureContext(result, target) {
  const exactInputResult = result;
  // A complete issued sentence retains its whole parent identity. Grammar
  // coordinates belong to the authenticated nucleus, as in preterit capture.
  if (target?.isClassicalNahuatlVncSentenceResultFrame?.(result) === true) {
    result = result.canonicalResultFrame;
  }
  if (target?.isClassicalNahuatlVncApplicationFrame?.(result) === true
    && target.getClassicalNahuatlVncContinuationSourceConstituents?.(result)
      ?.canonicalApplicationFrame === result) {
    result = result.resultFrame;
  }
  // An issued nominal compound retains its whole parent in a sentence. Its
  // authenticated finite child supplies the predicate and tense, not the
  // surrounding nominal-construction record.
  if (target?.isClassicalNahuatlNominalConstructionResult?.(result) === true
    && result.constructionKind === "nominal-embed-vnc"
    && result.authorizationStatus === "authorized") {
    result = result.canonicalResult?.resultFrame;
  }
  const projection = getExactVncResultSourceProjection(result, target);
  const typedSlotFrame = result?.finalTypedVncSlotFrame || null;
  const predicateStem = normalizeStem(typedSlotFrame?.slots?.predicate?.stem);
  const tense = getVncResultTense(result, target);
  const sourceObjectPattern = sourceObjectPatternFromVncProjection(projection);
  const sourceValence = nominalValenceFromVncProjection(projection);
  return {exactInputResult, result, projection, typedSlotFrame, predicateStem,
    tense, sourceObjectPattern, sourceValence, activationComputed: false,
    incorporatedComplementActivationFrame: null};
}

function capturePredicateNominalizationVncResultFromContext(
  context, nominalizationKind, state, target,
) {
  const {exactInputResult, result, projection, typedSlotFrame, predicateStem,
    tense, sourceObjectPattern, sourceValence} = context;
  const spec = predicateNominalizationCaptureSpec(
    nominalizationKind,
    state
  );
  const fullInstrumentiveVoiceAllowed = normalizeKey(nominalizationKind) !== "instrumentive-full"
    || ["impersonal", "nonactive"].includes(normalizeKey(
      result?.selectedVoice || projection?.sourceVoice || "active"));
  const actionSourceBlock = actionNominalizationSourceBlockReason(normalizeKey(nominalizationKind), {
    sourceVoice: normalizeKey(result?.selectedVoice || projection?.sourceVoice || "active"),
    sourceValence, sourceObjectPattern,
  });
  const authorized = Boolean(
    spec
    && projection
    && predicateStem
    && tense === spec.tense
    && fullInstrumentiveVoiceAllowed
    && !actionSourceBlock
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
            : !fullInstrumentiveVoiceAllowed
              ? "full-instrumentive-requires-customary-impersonal-source"
            : actionSourceBlock
              ? actionSourceBlock
            : "typed-vnc-predicate-stem-required",
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
  }
  if (!context.activationComputed) {
    context.incorporatedComplementActivationFrame =
      capturePatientiveComplementActivation(result, target);
    context.activationComputed = true;
  }
  const frame = deepFreeze({
    kind: "classical-nahuatl-predicate-nominalization-vnc-capture-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    blockReason: "",
    nominalizationKind: normalizeKey(nominalizationKind),
    canonicalVncResult: exactInputResult,
    canonicalNucleusResult: result,
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
    incorporatedComplementActivationFrame:
      context.incorporatedComplementActivationFrame,
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


function capturePredicateNominalizationVncResult(
  result = null, nominalizationKind = "", state = "absolutive", target = globalThis,
) {
  return capturePredicateNominalizationVncResultFromContext(
    buildPredicateNominalizationVncCaptureContext(result, target),
    nominalizationKind, state, target,
  );
}

function snapshotPredicateNominalizationCaptureSpecifications(specifications) {
  if (!Array.isArray(specifications)) return null;
  const snapshot = [];
  for (let index = 0; index < specifications.length; index++) {
    const entry = Object.getOwnPropertyDescriptor(specifications, String(index));
    const spec = entry && "value" in entry ? entry.value : null;
    if (!spec || typeof spec !== "object" || Array.isArray(spec)
      || ![Object.prototype, null].includes(Object.getPrototypeOf(spec))) return null;
    const fields = Object.getOwnPropertyDescriptors(spec);
    if (Reflect.ownKeys(fields).some(name => !["nominalizationKind", "state"].includes(name))
      || !fields.nominalizationKind || !("value" in fields.nominalizationKind)
      || typeof fields.nominalizationKind.value !== "string"
      || fields.state && (!("value" in fields.state) || typeof fields.state.value !== "string")) return null;
    snapshot.push(Object.freeze({nominalizationKind: fields.nominalizationKind.value,
      state: fields.state ? fields.state.value : "absolutive"}));
  }
  return Object.freeze(snapshot);
}

function capturePredicateNominalizationVncResultBatch(result, specifications, target) {
  const snapshot = snapshotPredicateNominalizationCaptureSpecifications(specifications);
  if (!snapshot) return null;
  // The complete closed data batch shares only this invocation's authenticated
  // exact nucleus and read-only source facts. No caller callback or context escapes.
  const context = buildPredicateNominalizationVncCaptureContext(result, target);
  const captures = Object.freeze(snapshot.map(spec =>
    capturePredicateNominalizationVncResultFromContext(
      context, spec.nominalizationKind, spec.state, target,
    )));
  const frame = Object.freeze({
    kind: "classical-nahuatl-predicate-nominalization-vnc-capture-batch-frame",
    version: VERSION, canonicalVncResult: result,
    specifications: snapshot, captures, grammarAuthority: false,
  });
  ISSUED_PREDICATE_NOMINALIZATION_VNC_CAPTURE_BATCH_FRAMES.add(frame);
  return frame;
}

function isClassicalNahuatlPredicateNominalizationVncCaptureBatchFrame(
  frame, result, specifications,
) {
  const snapshot = snapshotPredicateNominalizationCaptureSpecifications(specifications);
  return Boolean(snapshot
    && ISSUED_PREDICATE_NOMINALIZATION_VNC_CAPTURE_BATCH_FRAMES.has(frame)
    && frame.canonicalVncResult === result
    && frame.specifications.length === snapshot.length
    && frame.captures.length === snapshot.length
    && frame.specifications.every((spec, index) =>
      spec.nominalizationKind === snapshot[index].nominalizationKind
      && spec.state === snapshot[index].state)
    && frame.captures.every(capture => capture.authorizationStatus === "blocked"
      || isClassicalNahuatlPredicateNominalizationVncCaptureFrame(capture)
        && capture.canonicalVncResult === result));
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
  const exactInputResult = result;
  if (target?.isClassicalNahuatlVncSentenceResultFrame?.(result) === true) {
    result = result.canonicalResultFrame;
  }
  const canonicalCompoundResult = target?.isClassicalNahuatlNominalConstructionResult?.(result) === true
    && result.constructionKind === "nominal-embed-vnc"
    && result.authorizationStatus === "authorized" ? result : null;
  if (canonicalCompoundResult) {
    result = canonicalCompoundResult.canonicalResult?.resultFrame;
  }
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
  // The finite manner compound can inflect an embedded reflexive on the
  // mainline. Its action noun restores the exact nominal parent's shuntline
  // expression; neither a spelling nor a caller's object flag licenses this.
  const embedAnalysis = canonicalCompoundResult?.operationFrame
    ?.preteritAgentiveVncEmbedAnalysisFrame;
  const embeddedParent = embedAnalysis?.canonicalParentResult;
  const predicateEmbedStem = normalizeStem(embedAnalysis?.realizedStem);
  const nominalEmbedStem = normalizeStem(
    embeddedParent?.operationFrame?.targetStems?.generalUse
  );
  const latentReflexiveActionBoundaryFrame = embedAnalysis
    && embedAnalysis.authorizationStatus === "authorized"
    && embedAnalysis.lexicalized === false
    && embedAnalysis.shuntline === false
    && target?.isClassicalNahuatlDeverbalNncGrammarFrame?.(embeddedParent) === true
    && embeddedParent.sourceFrame?.sourceObjectPattern === "reflexive"
    && predicateEmbedStem && nominalEmbedStem
    && coreStem.startsWith(`${predicateEmbedStem}-`)
      ? deepFreeze({
        kind: "classical-nahuatl-action-latent-reflexive-boundary-frame",
        authorizationStatus: "authorized",
        canonicalCompoundResult,
        canonicalEmbeddedNncResult: embeddedParent,
        canonicalEmbedAnalysisFrame: embedAnalysis,
        predicateEmbedStem,
        nominalEmbedStem,
        retainedMatrixCore: coreStem.slice(predicateEmbedStem.length + 1),
        callerSuppliedAuthorityAccepted: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
      }) : null;
  const frame = deepFreeze({
    kind: "classical-nahuatl-deverbal-action-vnc-capture-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    blockReason: "",
    canonicalVncResult: exactInputResult,
    canonicalNucleusResult: result,
    latentReflexiveActionBoundaryFrame,
    continuationProjection: projection,
    canonicalVncSourceAnalysisFrame: result.sourceAnalysisFrame || null,
    canonicalVncTypedSlotFrame: typedSlotFrame,
    sourceUnit: "owner-issued-vnc-result",
    sourceStage: "future-core",
    sourceStem: coreStem,
    lexicalSourceStem,
    actionCompoundMatrixStem:
      result.operationFrame?.operation === "compound"
      && result.operationFrame.variant === "connective-t"
        ? normalizeStem(result.operationFrame.operationFacts?.matrixStem)
        : "",
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

function capturePrefixedNonactiveCore(result, projection, target) {
  if (!projection || target?.isClassicalNahuatlClosureFrame?.(result) !== true) return null;
  const operation = result.operationFrame;
  const machinery = result.selectedMachineryFrame;
  const parentMachinery = operation?.sourceMachineryFrame;
  const record = parentMachinery?.nonactiveStemRecord;
  if (!record || machinery?.sourceMachineryFrame !== parentMachinery) return null;
  const facts = operation.operationFacts || {};
  let prefix = "";
  if (operation.operation === "nominal-prefix") {
    const coordinate = facts.nominalMatrixCoordinateFrame;
    if (target.isClassicalNahuatlNominalVncMatrixCoordinateFrame?.(coordinate) !== true
      || coordinate.matrixCoordinate?.resultFrame?.selectedMachineryFrame !== parentMachinery) return null;
    prefix = normalizeStem(coordinate.embedStem);
  } else if (operation.operation === "frequentative"
    && facts.reduplicationTarget === "lexical-stem"
    && ["short-glottal", "long", "short"].includes(facts.shape)
    && Number.isInteger(facts.repetitions) && facts.repetitions > 0) {
    prefix = joinMorphs(Array(facts.repetitions).fill(normalizeStem(facts.copiedPrefix)));
  }
  if (!prefix || !record.nonactiveStem) return null;
  return deepFreeze({
    kind: "classical-nahuatl-prefixed-nonactive-core-capture-frame",
    authorizationStatus: "authorized", canonicalClosureResult: result,
    canonicalPrefixOperation: operation, canonicalNonactiveStemRecord: record,
    canonicalPassiveParticipantFrame: parentMachinery.voiceTransformationFrame,
    prefix, nonactiveStem: joinMorphs([prefix, record.nonactiveStem]),
    prefixDerivedFromIssuedOperation: true, finiteSpellingAuthorizesCore: false,
    formulaStringAuthority: false, surfaceStringAuthority: false,
  });
}

function capturePassivePatientiveVncResult(
  result = null,
  target = globalThis
) {
  const exactInputResult = result;
  if (target?.isClassicalNahuatlVncSentenceResultFrame?.(result) === true) {
    result = result.canonicalResultFrame;
  }
  if (target?.isClassicalNahuatlNominalConstructionResult?.(result) === true
    && result.constructionKind === "nominal-embed-vnc"
    && result.authorizationStatus === "authorized") {
    result = result.canonicalResult?.resultFrame;
  }
  const projection = getExactVncResultSourceProjection(result, target);
  const selectedMachinery = result?.selectedMachineryFrame || null;
  const prefixedNonactiveSourceFrame = capturePrefixedNonactiveCore(result, projection, target);
  const nonactiveStemRecord = selectedMachinery?.nonactiveStemRecord
    || prefixedNonactiveSourceFrame?.canonicalNonactiveStemRecord || null;
  const passiveParticipantFrame =
    selectedMachinery?.voiceTransformationFrame
    || prefixedNonactiveSourceFrame?.canonicalPassiveParticipantFrame || null;
  const selectedVoice = normalizeKey(
    result?.selectedVoice || result?.selectedVoiceOperation || projection?.sourceVoice || ""
  );
  const sourceStem = normalizeStem(prefixedNonactiveSourceFrame?.nonactiveStem || nonactiveStemRecord?.nonactiveStem);
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
      "lō", "lō-hua", "lo-hua", "hua-lō", "ō", "ō-hua", "o-hua", "hua",
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
    canonicalVncResult: exactInputResult,
    canonicalNucleusResult: result,
    continuationProjection: projection,
    canonicalVncSourceAnalysisFrame: result.sourceAnalysisFrame || null,
    canonicalVncTypedSlotFrame: result.finalTypedVncSlotFrame || null,
    canonicalNonactiveStemRecord: nonactiveStemRecord,
    prefixedNonactiveSourceFrame,
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

function captureTypeTwoReconstructedNonactivePatientiveSource(result = null, target = globalThis) {
  const blocked = () => deepFreeze({
    kind: "classical-nahuatl-type-two-reconstructed-nonactive-patientive-capture-frame",
    version: VERSION, authorizationStatus: "blocked",
    blockReason: "exact-issued-type-two-causal-sentence-reconstruction-required",
    grammarAuthority: false, callerSuppliedAuthorityAccepted: false,
    formulaStringAuthority: false, surfaceStringAuthority: false,
  });
  if (target.isClassicalNahuatlVncSentenceResultFrame?.(result) !== true) return blocked();
  const application = result.vncApplicationFrame;
  if (target.isClassicalNahuatlVncApplicationFrame?.(application) !== true
    || application.authorizationStatus !== "authorized") return blocked();
  const nucleus = application.resultFrame;
  const immediateOperation = nucleus?.derivationOperationFrame;
  const causalSourceMachinery = immediateOperation
    ? nucleus.selectedMachineryFrame : nucleus?.formationSourceMachineryFrame;
  // Registered Sentence continuation reissues the finite coordinate over the
  // exact derived Source. Its current App is not the earlier causal App.
  // Follow only that issued immediate Source, never arbitrary graph ancestry.
  if (!immediateOperation && (
    !causalSourceMachinery
    || nucleus.sourceMachineryFrame !== causalSourceMachinery
    || target.isClassicalNahuatlDerivedVncMachineryFrame?.(causalSourceMachinery) !== true
  )) return blocked();
  const operation = immediateOperation || causalSourceMachinery.derivationOperationFrame;
  const bridge = operation?.selectedOption?.typeTwoInternalBridgeFrame;
  // The operation validator authenticates the exact selected internal bridge
  // against its original Source. It grants no ordinary finite nonactive voice.
  if (target.isClassicalNahuatlVncDerivationOperationFrame?.(operation) !== true
    || operation.authorizationStatus !== "authorized"
    || operation.derivationType !== "causative"
    || operation.selectedOption?.derivationSubtype !== "type-two"
    || bridge?.authorizationStatus !== "authorized"
    || bridge.internalPrerequisiteOnly !== true || bridge.userSelectable !== false
    || bridge.lesson20OperationAuthority !== false
    || bridge.sourceSignature !== operation.sourceSignature
    || !bridge.nonactiveStem || !bridge.suffixFamily
    || !Array.isArray(operation.participantTransformFrame?.sourceObjectRequests)) return blocked();
  const sourceObjectRequests = operation.participantTransformFrame.sourceObjectRequests;
  const activeSourceValence = normalizeKey(bridge.sourceValence);
  const sourceValence = sourceObjectRequests.length > 1 ? "double-object"
    : ["specific-projective", "mainline-reflexive", "shuntline-reflexive", "human-reciprocal"].includes(activeSourceValence)
      ? "single-object" : activeSourceValence;
  const frame = deepFreeze({
    kind: "classical-nahuatl-type-two-reconstructed-nonactive-patientive-capture-frame",
    version: VERSION, authorizationStatus: "authorized", blockReason: "",
    canonicalVncResult: result, canonicalNucleusResult: nucleus,
    canonicalCurrentApplicationFrame: application,
    canonicalCausalApplicationFrame: immediateOperation ? application : null,
    canonicalCausalSourceMachineryFrame: causalSourceMachinery,
    canonicalVncOperationFrame: operation, canonicalInternalBridgeFrame: bridge,
    canonicalVncSourceMachineryFrame: operation.sourceMachineryFrame,
    canonicalVncTypedSlotFrame: operation.sourceTypedVncSlotFrame,
    sourceUnit: "owner-issued-type-two-reconstructed-nonactive-source",
    sourceStage: "reconstructed-nonactive-core", sourceVoice: "nonactive",
    sourceStem: normalizeStem(bridge.nonactiveStem),
    activeSourceStem: normalizeStem(operation.sourceStem),
    verbClass: normalizeToken(bridge.sourceClass).toUpperCase(),
    sourceValence, activeSourceValence, sourceObjectRequests,
    sourceObjectPattern: sourceObjectPatternFromVncProjection({sourceObjectRequests}),
    sourceSubject: normalizeSubject(operation.participantTransformFrame.sourceSubject || "3sg"),
    nonactiveSuffix: normalizeKey(bridge.suffixFamily),
    hypotheticalReconstruction: true, internalSourceOnly: true,
    finiteNonactiveAttestationClaimed: false, ordinaryNonactiveAuthority: false,
    causeeImported: false, exactResultIdentityPreserved: true,
    grammarAuthority: false, callerSuppliedAuthorityAccepted: false,
    formulaStringAuthority: false, surfaceStringAuthority: false,
  });
  ISSUED_RECONSTRUCTED_NONACTIVE_PATIENTIVE_CAPTURE_FRAMES.add(frame);
  return frame;
}

function isClassicalNahuatlTypeTwoReconstructedNonactivePatientiveCaptureFrame(frame = null) {
  return Boolean(ISSUED_RECONSTRUCTED_NONACTIVE_PATIENTIVE_CAPTURE_FRAMES.has(frame)
    && frame?.kind === "classical-nahuatl-type-two-reconstructed-nonactive-patientive-capture-frame"
    && frame.authorizationStatus === "authorized" && frame.version === VERSION
    && frame.internalSourceOnly === true && frame.hypotheticalReconstruction === true
    && frame.finiteNonactiveAttestationClaimed === false
    && frame.ordinaryNonactiveAuthority === false && frame.causeeImported === false
    && frame.exactResultIdentityPreserved === true
    && frame.grammarAuthority === false && frame.callerSuppliedAuthorityAccepted === false
    && frame.formulaStringAuthority === false && frame.surfaceStringAuthority === false
    && Object.isFrozen(frame));
}

function captureImpersonalPatientiveVncResult(
  result = null,
  target = globalThis
) {
  const exactInputResult = result;
  const nominalWhole = target?.isClassicalNahuatlNominalConstructionResult?.(result) === true
    && result.authorizationStatus === "authorized"
    && result.constructionKind === "nominal-embed-vnc"
    && result.canonicalResult?.authorizationStatus === "authorized"
    ? result : null;
  // Voice and the nonactive core belong to the nominal owner's genuine
  // finite child. The whole remains the exact patientive parent.
  if (nominalWhole) result = nominalWhole.canonicalResult.resultFrame;
  let wrappedVncApplication = null;
  let nominalCoordinate = null;
  const lateNucleus = target?.isClassicalNahuatlVncSentenceResultFrame?.(result) === true
    ? result.lateOperationClosureFrame : result;
  const candidateCoordinate = lateNucleus?.operationFrame?.operationFacts?.nominalMatrixCoordinateFrame;
  if (target?.isClassicalNahuatlClosureFrame?.(lateNucleus) === true
    && lateNucleus.operationFrame?.operation === "nominal-prefix"
    && target?.isClassicalNahuatlNominalVncMatrixCoordinateFrame?.(candidateCoordinate) === true
    && target?.isClassicalNahuatlVncApplicationFrame?.(candidateCoordinate.matrixCoordinate) === true) {
    nominalCoordinate = candidateCoordinate;
    result = lateNucleus;
  }
  let orderedVoiceResult = null;
  if (target?.isClassicalNahuatlVncSentenceResultFrame?.(result) === true
    && target?.isClassicalNahuatlOrderedVoiceVncApplicationFrame?.(
      result.orderedVoiceApplicationFrame) === true) {
    orderedVoiceResult = result.orderedVoiceApplicationFrame;
  } else if (target?.isClassicalNahuatlOrderedVoiceVncApplicationFrame?.(result) === true) {
    orderedVoiceResult = result;
  }
  if (orderedVoiceResult) result = orderedVoiceResult;
  if (target?.isClassicalNahuatlVncSentenceResultFrame?.(result) === true
    && target?.isClassicalNahuatlVncApplicationFrame?.(result.vncApplicationFrame) === true) {
    wrappedVncApplication = result.vncApplicationFrame;
    result = result.vncApplicationFrame.resultFrame;
  }
  const orderedChain = orderedVoiceResult?.voiceLayerChainFrame || null;
  const orderedNonactiveLayer = orderedChain?.finalLayerFrame || null;
  // §38.1.4 retains the nonactive boundary of the passive layer when its
  // patient is subsequently deleted by impersonalization. The final layer
  // adds tla; it introduces no new nonactive suffix.
  const orderedImpersonalizedPassive = Boolean(orderedVoiceResult
    && orderedChain?.completeRoute === true
    && orderedChain.targetVoice === "impersonalized-passive"
    && orderedNonactiveLayer?.operationId === "impersonalize-passive"
    && orderedNonactiveLayer.sourceFrame?.targetVoice === "passive"
    && orderedChain.layers?.at(-2) === orderedNonactiveLayer.sourceFrame);
  const orderedSuffixLayer = orderedImpersonalizedPassive
    ? orderedNonactiveLayer.sourceFrame : orderedNonactiveLayer;
  const orderedBaseResult = orderedVoiceResult?.baseApplicationFrame?.resultFrame || null;
  let projection = getExactVncResultSourceProjection(
    orderedBaseResult || result, target);
  if (nominalWhole && projection) {
    // Reuse the existing compound-source projection fields; only an owned
    // nominal whole can provide this relation and constituent ancestry.
    projection = deepFreeze({...projection,
      canonicalNominalSourceResultFrame: nominalWhole,
      canonicalNominalConstructionResultFrame: nominalWhole,
    });
  }
  const selectedMachinery = result?.selectedMachineryFrame || null;
  const voiceTransformationFrame =
    selectedMachinery?.voiceTransformationFrame || null;
  const nonactiveStemRecord = orderedSuffixLayer
    || nominalCoordinate?.matrixCoordinate.resultFrame.selectedMachineryFrame.nonactiveStemRecord
    || selectedMachinery?.nonactiveStemRecord || null;
  const selectedVoice = normalizeKey(
    (orderedImpersonalizedPassive ? "impersonal" : orderedChain?.targetVoice) || nominalCoordinate?.coordinate.voice
      || result?.selectedVoice || result?.normalizedRequest?.voice || ""
  );
  const selectedVoiceOperation = normalizeKey(
    orderedNonactiveLayer?.operationId || result?.selectedVoiceOperation
      || projection?.sourceNonactiveOptionId
      || ""
  );
  const sourceStem = normalizeStem(nominalCoordinate
    ? joinMorphs([nominalCoordinate.embedStem, nonactiveStemRecord?.nonactiveStem])
    : orderedNonactiveLayer?.targetStem || nonactiveStemRecord?.nonactiveStem);
  const nonactiveSuffix = normalizeKey(nonactiveStemRecord?.suffixFamily)
    .replace(/ō/gu, "ō");
  if (
    !projection
    || selectedVoice !== "impersonal"
    || !sourceStem
    || ![
      "lō", "lō-hua", "lo-hua", "hua-lō", "ō", "ō-hua", "o-hua", "hua",
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
  const canonicalRequest = orderedVoiceResult?.baseApplicationFrame?.normalizedRequest
    || wrappedVncApplication?.normalizedRequest
    || (nominalCoordinate ? {sourceValence: projection.sourceValence,
      sourceObjectRequests: projection.sourceObjectRequests, objectKind: projection.objectKind} : null)
    || result.normalizedRequest || {};
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
    projection,
    target
  );
  const frame = deepFreeze({
    kind: "classical-nahuatl-impersonal-patientive-vnc-capture-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    blockReason: "",
    canonicalVncResult: exactInputResult,
    canonicalNucleusResult: result,
    canonicalOrderedVoiceResult: orderedVoiceResult,
    canonicalOrderedVoiceChain: orderedChain,
    continuationProjection: projection,
    canonicalVncSourceAnalysisFrame:
      orderedBaseResult?.sourceAnalysisFrame || result.sourceAnalysisFrame
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
        || nominalCoordinate?.matrixCoordinate.resultFrame.selectedNonactiveOptionId
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
      orderedImpersonalizedPassive || voiceTransformationFrame
        ?.humanProjectiveImpersonalizedPassive === true,
    voiceOperationSequence: Object.freeze(Array.from(
      orderedImpersonalizedPassive
        ? [orderedChain.sourceVoice, ...orderedChain.layers.map(layer => layer.targetVoice)]
        : voiceTransformationFrame?.voiceOperationSequence || []
    )),
    activeHumanObjectCarrier: normalizeStem(
      voiceTransformationFrame?.activeHumanObjectCarrier
    ),
    passivePatientPromotionApplied:
      orderedImpersonalizedPassive || voiceTransformationFrame?.passivePatientPromotionApplied === true,
    passivePatientSubjectThenDeletedByImpersonalization:
      orderedImpersonalizedPassive || voiceTransformationFrame
        ?.passivePatientSubjectThenDeletedByImpersonalization === true,
    directImpersonalizationOfActiveBlocked:
      orderedImpersonalizedPassive || voiceTransformationFrame
        ?.directImpersonalizationOfActiveBlocked === true,
    impersonalCarrier: normalizeStem(
      orderedImpersonalizedPassive ? "tla" : voiceTransformationFrame?.impersonalCarrier
    ),
    impersonalizedPassiveStem: normalizeStem(
      orderedImpersonalizedPassive ? orderedNonactiveLayer.targetStem : voiceTransformationFrame?.impersonalizedPassiveStem
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
      orderedImpersonalizedPassive || /^tla-/u.test(activeSourceStem)
      || selectedVoiceOperation === "tla-impersonal"
      || orderedChain?.operations?.includes("tla-impersonal") === true,
    inherentImpersonalAnalysisPreserved: Boolean(
      selectedVoiceOperation === "inherent-impersonal"
      || orderedChain?.operations?.includes("inherent-impersonal") === true
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
  target = globalThis,
  allowRootStockParent = path === "request"
    && normalizeKey(value?.constructionKind) === "patientive"
    && normalizeKey(value?.patientiveSourceFamily) === "root-or-stock",
  predicateCaptureContext = path === "request"
    && normalizeKey(value?.constructionKind) === "predicate-nominalization"
      ? {kind: normalizeKey(value.nominalizationKind), state: normalizeKey(value.state || "absolutive"),
        sourceAnalysis: normalizeKey(value.preteritSourceAnalysis || "ordinary")}
      : null
) {
  if (!value || typeof value !== "object") return "";
  if (predicateCaptureContext && path.endsWith(".canonicalVncResult")
    && target?.isClassicalNahuatlVncApplicationFrame?.(value) === true
    && target.getClassicalNahuatlVncContinuationSourceConstituents?.(value)
      ?.canonicalApplicationFrame === value
    && (isClassicalNahuatlPredicateNominalizationVncCaptureFrame(
      capturePredicateNominalizationVncResult(value,
        predicateCaptureContext.kind, predicateCaptureContext.state, target))
      || ["preterit-agentive", "preterit-patientive"].includes(predicateCaptureContext.kind)
        && isClassicalNahuatlPreteritVncNominalizationCaptureFrame(
          capturePreteritVncResult(value, target, predicateCaptureContext.sourceAnalysis)))) {
    // The private wrapper lookup and this consuming owner's exact capture
    // establish custody. A copied wrapper still undergoes the hostile scan.
    return "";
  }
  if (allowRootStockParent && path.endsWith(".canonicalVncResult")
    && target?.isClassicalNahuatlVncApplicationFrame?.(value) === true
    && isClassicalNahuatlRootStockPatientiveVncCaptureFrame(
      captureRootStockPatientiveVncResult(value, target))) {
    // Only this authenticated stock parent may retain its owner's derived
    // request fields. Copies still undergo the ordinary hostile scan.
    return "";
  }
  if (target?.isClassicalNahuatlAdjectivalModificationIncorporationAnalysis?.(value) === true
    || path.endsWith(".canonicalNncSourceFrame")
      && target?.isClassicalNahuatlOrdinaryNncSourceFrame?.(value) === true
    || path.endsWith(".canonicalPatientiveCoreSourceFrame")
      && ISSUED_PATIENTIVE_CORE_SOURCES.has(value)
    || path.endsWith(".canonicalNncResult")
      && (target?.isClassicalNahuatlResultFrame?.(value) === true
        || target?.isClassicalNahuatlRelationalResult?.(value) === true)) {
    // The consuming owner still requires its licensed exact Source shape.
    // Copies do not pass either identity validator and retain the hostile scan.
    return "";
  }
  if (
    value.kind === "classical-nahuatl-deverbal-nnc-source-frame"
    || value.kind === "classical-nahuatl-vnc-application-result-frame"
    || value.kind === "classical-nahuatl-ordinary-nnc-result-frame"
    || value.kind === "classical-nahuatl-pronominal-nnc-result-frame"
    || isClassicalNahuatlDeverbalNncGrammarFrame(value)
    || target?.isClassicalNahuatlNominalConstructionResult?.(value) === true
    || target?.isClassicalNahuatlDenominalVncResultFrame?.(value) === true
    || target?.isClassicalNahuatlVncSentenceResultFrame?.(value) === true
    || target?.isClassicalNahuatlOrderedVoiceVncApplicationFrame?.(value) === true
    || target?.isClassicalNahuatlSupplementationFrame?.(value) === true
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
      const nested = findHostileAuthorityPath(item, nextPath, target, allowRootStockParent, predicateCaptureContext);
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
  supportiveInitialIBoundaryFrame = null,
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
    supportiveInitialIIsUserChoice: supportiveInitialIBoundaryFrame?.choiceRequired === true,
    supportiveInitialIBoundaryFrame,
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
    archaicMainlineReflexiveRetained: archaicQue
      && sourceFrame?.sourceObjectPattern === "reflexive",
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
        stemRole: archaicQue ? "general-use" : "restricted-use",
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
  target = null,
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
        || (target?.isClassicalNahuatlNominalConstructionResult?.(
          canonicalResult
        ) === true
          && target?.isClassicalNahuatlNncSlotFrame?.(
            canonicalResult.nncSlotFrame
          ) === true)
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

function buildCharacteristicNounSource(request = {}) {
  const block = blockReason => deepFreeze({
    kind: "classical-nahuatl-characteristic-noun-source-frame", version: VERSION,
    authorizationStatus: "blocked", blockReason,
  });
  const allowed = new Set(["sourceStem", "baseStem", "matrixStem", "nounClass", "analysisKind"]);
  if (!request || typeof request !== "object" || Array.isArray(request)
    || Reflect.ownKeys(request).some(key => typeof key !== "string" || !allowed.has(key))) {
    return block("complete-analyzed-characteristic-noun-source-required");
  }
  const sourceStem = normalizeStem(request.sourceStem);
  const baseStem = normalizeStem(request.baseStem);
  const matrixStem = normalizeStem(request.matrixStem);
  if (!baseStem || matrixStem !== "yō" || sourceStem !== joinMorphs([baseStem, matrixStem])
    || normalizeNounClass(request.nounClass) !== "tl"
    || normalizeKey(request.analysisKind) !== "characteristic-property") {
    return block("characteristic-noun-source-analysis-mismatch");
  }
  // A cited analyzed nounstem is Source. It does not assert an earlier finite
  // predicate, a participant, or an unattested derivational genealogy.
  const frame = deepFreeze({
    kind: "classical-nahuatl-characteristic-noun-source-frame", version: VERSION,
    authorizationStatus: "authorized", blockReason: "",
    sourceUnit: "analyzed-characteristic-nounstem", sourceStage: "nounstem",
    sourceStem, baseStem, matrixStem, nounClass: "tl", analysisKind: "characteristic-property",
    sourceConstituents: Object.freeze([baseStem, matrixStem]),
    characteristicMatrixFullEmbedStem: sourceStem,
    characteristicMatrixOmittedEmbedStem: baseStem,
    characteristicMatrixRealizations: Object.freeze(["full", "omitted"]),
    finiteSubjectAsserted: false, canonicalNncResult: null,
    grammarAuthority: false, callerSuppliedAuthorityAccepted: false,
    formulaStringAuthority: false, surfaceStringAuthority: false,
  });
  ISSUED_CHARACTERISTIC_NOUN_SOURCES.add(frame);
  return frame;
}

function isCharacteristicNounSource(frame = null) {
  return ISSUED_CHARACTERISTIC_NOUN_SOURCES.has(frame)
    && frame.authorizationStatus === "authorized" && Object.isFrozen(frame);
}

function buildPatientiveCoreSource(request = {}, target = globalThis) {
  const allowed = new Set(["sourceStem", "verbClass", "sourceStage", "sourceValence", "sourceObjectPattern", "sourceVoice", "nonactiveOptionId", "impersonalDerivationPath"]);
  const stage = normalizeKey(request.sourceStage);
  const stem = normalizeStem(request.sourceStem);
  const verbClass = normalizeToken(request.verbClass).toUpperCase();
  const valence = normalizeKey(request.sourceValence);
  const objectPattern = normalizeKey(request.sourceObjectPattern);
  const block = blockReason => deepFreeze({kind:"classical-nahuatl-patientive-core-source-frame",
    version:VERSION,authorizationStatus:"blocked",blockReason});
  if (Object.keys(request).some(key => !allowed.has(key))
    || !["perfective-core","imperfective-core","nonactive-core"].includes(stage)
    || !stem || !["A","B","C","D"].includes(verbClass)
    || !["intransitive","single-object","double-object","triple-object"].includes(valence)
    || !OBJECT_PATTERNS.includes(objectPattern)
    || valence === "intransitive" && objectPattern !== "none") return block("complete-typed-patientive-core-source-required");
  const classRule = target.buildClassicalNahuatlVerbstemClassRuleFrame?.(stem,
    {verbClass,stemClass:verbClass,valence});
  const perfective = normalizeStem(classRule?.analyzedPerfectiveStem || classRule?.perfectiveStem);
  if (classRule?.authorizationStatus !== "authorized" || classRule.classId !== verbClass
    || stage === "perfective-core" && !perfective) return block("canonical-patientive-verbstem-class-analysis-required");
  const passive = stage === "nonactive-core";
  const impersonalizedPassive = passive && request.sourceVoice === "impersonal"
    && request.impersonalDerivationPath === "passive" && objectPattern === "nonspecific-human";
  if ((passive && ((!impersonalizedPassive && request.sourceVoice !== "passive") || !request.nonactiveOptionId
    || valence !== "single-object" || !["nonspecific-human","nonspecific-nonhuman"].includes(objectPattern)))
    || !impersonalizedPassive && request.impersonalDerivationPath
    || !passive && (request.sourceVoice && request.sourceVoice !== "active" || request.nonactiveOptionId)) {
    return block("patientive-nonactive-core-requires-complete-single-projective-passive-source");
  }
  const nonactive = passive ? target.deriveClassicalNahuatlNonactiveStemRecord?.(stem,
    {verbClass,sourceValence:objectPattern === "nonspecific-human" ? "projective-human" : "projective-nonhuman",optionId:request.nonactiveOptionId}) : null;
  if (passive && (nonactive?.authorizationStatus !== "authorized" || !nonactive.nonactiveStem)) return block("canonical-patientive-nonactive-core-analysis-required");
  // §38.1.4 supplies stems and cores, not a finite passive patient. Consume
  // the ordered voice owner's core genealogy without manufacturing a VNC.
  const orderedChain = impersonalizedPassive
    ? target.deriveClassicalNahuatlOrderedVoiceLayerChain?.(stem,
      {operations:[`passive-${nonactive.suffixFamily}`, "impersonalize-passive"],
        canonicalNonactiveStemRecord:nonactive}) : null;
  if (impersonalizedPassive && (orderedChain?.authorizationStatus !== "authorized"
    || target.isClassicalNahuatlOrderedVoiceLayerChain?.(orderedChain, stem) !== true
    || orderedChain.sourceCapability !== "nonactive-core"
    || orderedChain.canonicalNonactiveStemRecord !== nonactive
    || orderedChain.completeRoute !== true || orderedChain.targetVoice !== "impersonalized-passive"
    || orderedChain.finalLayerFrame?.sourceFrame !== orderedChain.layers?.at(-2)
    || orderedChain.layers?.at(-2)?.targetStem !== nonactive.nonactiveStem
    || orderedChain.layers.at(-2).suffixFamily !== nonactive.suffixFamily)) {
    return block("canonical-patientive-impersonalized-passive-core-chain-required");
  }
  const frame = deepFreeze({kind:"classical-nahuatl-patientive-core-source-frame",version:VERSION,
    authorizationStatus:"authorized",blockReason:"",sourceUnit:"owner-issued-verb-core-source",
    sourceStage:stage,sourceStem:orderedChain?.targetStem || (passive ? nonactive.nonactiveStem : stage === "perfective-core" ? perfective : stem),
    lexicalSourceStem:stem,activeSourceStem:stem,verbClass,sourceVoice:impersonalizedPassive ? "impersonal" : passive ? "passive" : "active",
    sourceValence:valence,activeSourceValence:valence,activeSourceObjectPattern:objectPattern,
    sourceObjectPattern:passive ? "none" : objectPattern,sourceSubject:"",
    nonactiveSuffix:nonactive?.suffixFamily || "",canonicalNonactiveStemRecord:nonactive,
    canonicalOrderedVoiceChain:orderedChain,impersonalDerivationPath:impersonalizedPassive ? "passive" : "",
    ultimateActiveSourceIsTransitive:valence !== "intransitive",patientReferent:"",
    canonicalVerbstemClassRuleFrame:classRule,canonicalVncResult:null,
    canonicalVncSourceAnalysisFrame:null,canonicalVncTypedSlotFrame:null,
    exactCoreSourceIdentityPreserved:true,completeTypedSourceAnalysisPreserved:true,
    sourceIsCompound:false,compoundVncSourceFrame:null,
    finiteSubjectAsserted:false,grammarAuthority:false,callerSuppliedAuthorityAccepted:false,
    formulaStringAuthority:false,surfaceStringAuthority:false});
  ISSUED_PATIENTIVE_CORE_SOURCES.add(frame); return frame;
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
  const reconstructedNonactivePatientiveCaptureFrame = source.reconstructedNonactivePatientiveCaptureFrame || null;
  const perfectivePatientiveVncCaptureFrame =
    source.perfectivePatientiveVncCaptureFrame || null;
  const imperfectivePatientiveVncCaptureFrame =
    source.imperfectivePatientiveVncCaptureFrame || null;
  const rootStockPatientiveVncCaptureFrame = source.rootStockPatientiveVncCaptureFrame || null;
  const patientiveCoreSourceFrame = source.patientiveCoreSourceFrame || null;
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
    || reconstructedNonactivePatientiveCaptureFrame
    || perfectivePatientiveVncCaptureFrame
    || imperfectivePatientiveVncCaptureFrame
    || rootStockPatientiveVncCaptureFrame;
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
    && (!patientiveCoreSourceFrame || ISSUED_PATIENTIVE_CORE_SOURCES.has(patientiveCoreSourceFrame)
      && patientiveCoreSourceFrame.sourceStem === sourceStem
      && patientiveCoreSourceFrame.sourceStage === sourceStage
      && patientiveCoreSourceFrame.sourceValence === sourceValence
      && patientiveCoreSourceFrame.sourceObjectPattern === sourceObjectPattern
      && patientiveCoreSourceFrame.verbClass === verbClass)
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
    && (!reconstructedNonactivePatientiveCaptureFrame
      || (isClassicalNahuatlTypeTwoReconstructedNonactivePatientiveCaptureFrame(reconstructedNonactivePatientiveCaptureFrame)
        && reconstructedNonactivePatientiveCaptureFrame.sourceStem === sourceStem
        && reconstructedNonactivePatientiveCaptureFrame.sourceStage === sourceStage
        && reconstructedNonactivePatientiveCaptureFrame.sourceVoice === sourceVoice
        && reconstructedNonactivePatientiveCaptureFrame.sourceValence === sourceValence
        && reconstructedNonactivePatientiveCaptureFrame.sourceObjectPattern === sourceObjectPattern
        && reconstructedNonactivePatientiveCaptureFrame.verbClass === verbClass))
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
    && (!rootStockPatientiveVncCaptureFrame
      || (isClassicalNahuatlRootStockPatientiveVncCaptureFrame(rootStockPatientiveVncCaptureFrame)
        && rootStockPatientiveVncCaptureFrame.sourceUnit === sourceUnit
        && rootStockPatientiveVncCaptureFrame.sourceStage === sourceStage
        && rootStockPatientiveVncCaptureFrame.sourceStem === sourceStem
        && rootStockPatientiveVncCaptureFrame.verbClass === verbClass
        && rootStockPatientiveVncCaptureFrame.sourceVoice === sourceVoice
        && rootStockPatientiveVncCaptureFrame.sourceValence === sourceValence
        && rootStockPatientiveVncCaptureFrame.sourceObjectPattern === sourceObjectPattern))
  );
  const capturedPredicateLexicalStem = predicateNominalizationVncCaptureFrame
    ? joinMorphs([
      internalObjectPrefix(sourceObjectPattern, "3sg", false),
      sourceStem,
    ]) : "";
  // The predicate may have lost imaginary i at its actual object boundary.
  // Preserve the lexical number license through the authenticated Source analysis,
  // without treating a caller-supplied spelling as a second lexical alias.
  const capturedInitialIAnalysis = preteritVncCaptureFrame
    ?.canonicalVncSourceAnalysisFrame;
  const capturedPreteritLexicalStem = capturedInitialIAnalysis?.sourceInitialIKind
      === "supportive"
    && normalizeStem(capturedInitialIAnalysis.sourceStem).startsWith("i")
    && !sourceStem.startsWith("i")
      ? `i${sourceStem}` : sourceStem;
  // The exact captured Source keeps the lexical imperfective identity separate
  // from its realized preterit predicate. These two attested old-person families
  // select their own number-conditioned alternants during nominal reanalysis.
  const capturedOldPersonLexicalStem = normalizeStem(
    preteritVncCaptureFrame?.continuationProjection?.sourceStem
  );
  const oldPersonLexicalStem = OLD_PERSON_FAMILIES.includes(
    LEXICAL_SOURCE_FACTS[capturedOldPersonLexicalStem]?.oldPersonFamily
  ) && sourceVoice === "active" && sourceValence === "intransitive"
    ? capturedOldPersonLexicalStem : "";
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
        (deverbalActionVncCaptureFrame?.sourceVoice === "active"
          ? deverbalActionVncCaptureFrame.lexicalSourceStem : "")
        || oldPersonLexicalStem
        || (Object.hasOwn(LEXICAL_SOURCE_FACTS, capturedPredicateLexicalStem)
          ? capturedPredicateLexicalStem : capturedPreteritLexicalStem),
      instrumentiveCitationFactStem: normalizeStem(
        predicateNominalizationVncCaptureFrame?.continuationProjection?.sourceStem),
      impersonalPatientiveFactStem:
        impersonalPatientiveVncCaptureFrame?.activeSourceStem || "",
      actionCompoundMatrixStem:
        deverbalActionVncCaptureFrame?.actionCompoundMatrixStem || "",
      patientiveCompoundMatrixStem:
        impersonalPatientiveVncCaptureFrame?.compoundVncSourceFrame?.matrixStem || "",
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
    sourceSubject: normalizeSubject(source.sourceSubject || (
      patientiveCoreSourceFrame || sourceStage === "future-core" && !vncCaptureFrame
        || characteristicPatientiveNncCaptureFrame && !characteristicPatientiveNncCaptureFrame.canonicalNncResult
        ? "" : request.subject || "3sg")),
    sourceIsCompound:
      source.sourceIsCompound === true || Boolean(compoundVncSourceFrame),
    compoundVncSourceFrame,
    sourceImperfectiveStem:
      canonicalStageDerivationFrame?.imperfectiveStem || patientiveCoreSourceFrame?.lexicalSourceStem || "",
    canonicalStageDerivationFrame,
    sourceStemDerivedByCanonicalOwner:
      canonicalStageDerivationFrame?.authorizationStatus === "authorized",
    preteritVncCaptureFrame,
    predicateNominalizationVncCaptureFrame,
    deverbalActionVncCaptureFrame,
    passivePatientiveVncCaptureFrame,
    impersonalPatientiveVncCaptureFrame,
    reconstructedNonactivePatientiveCaptureFrame,
    perfectivePatientiveVncCaptureFrame,
    imperfectivePatientiveVncCaptureFrame,
    rootStockPatientiveVncCaptureFrame,
    patientiveCoreSourceFrame,
    sourceCapturedFromExactCoreSource: Boolean(patientiveCoreSourceFrame),
    characteristicPatientiveNncCaptureFrame,
    canonicalVncResult: vncCaptureFrame?.canonicalOwnerhoodNncResult
      ? null : vncCaptureFrame?.canonicalVncResult || null,
    canonicalNucleusResult: vncCaptureFrame?.canonicalNucleusResult
      || vncCaptureFrame?.canonicalVncResult || null,
    canonicalVncOperationFrame: vncCaptureFrame?.canonicalOwnerhoodNncResult
      ? null : vncCaptureFrame?.canonicalVncOperationFrame
      || vncCaptureFrame?.canonicalVncResult?.operationFrame
      || null,
    canonicalVncSourceAnalysisFrame:
      vncCaptureFrame?.canonicalVncSourceAnalysisFrame || null,
    canonicalVncSourceMachineryFrame:
      rootStockPatientiveVncCaptureFrame?.canonicalVncSourceMachineryFrame
      || reconstructedNonactivePatientiveCaptureFrame?.canonicalVncSourceMachineryFrame || null,
    canonicalVncTypedSlotFrame:
      vncCaptureFrame?.canonicalVncTypedSlotFrame || null,
    sourceCapturedFromExactVncResult: Boolean(vncCaptureFrame
      && !perfectivePatientiveVncCaptureFrame?.canonicalOwnerhoodNncResult),
    canonicalNncResult:
      characteristicPatientiveNncCaptureFrame?.canonicalNncResult
      || perfectivePatientiveVncCaptureFrame?.canonicalOwnerhoodNncResult || null,
    canonicalNncSourceFrame:
      characteristicPatientiveNncCaptureFrame?.canonicalNncSourceFrame
      || perfectivePatientiveVncCaptureFrame?.canonicalNncSourceFrame
      || null,
    canonicalNncOperationFrame:
      characteristicPatientiveNncCaptureFrame?.canonicalNncOperationFrame
      || perfectivePatientiveVncCaptureFrame?.canonicalNncOperationFrame
      || null,
    canonicalNncTypedSlotFrame:
      characteristicPatientiveNncCaptureFrame?.canonicalNncTypedSlotFrame
      || perfectivePatientiveVncCaptureFrame?.canonicalNncTypedSlotFrame
      || null,
    sourceCapturedFromExactNncResult: Boolean(
      characteristicPatientiveNncCaptureFrame?.canonicalNncResult
      || perfectivePatientiveVncCaptureFrame?.canonicalOwnerhoodNncResult
    ),
    sourceCapturedFromExactNncSourceFrame: Boolean(characteristicPatientiveNncCaptureFrame
      && !characteristicPatientiveNncCaptureFrame.canonicalNncResult
      && characteristicPatientiveNncCaptureFrame.canonicalNncSourceFrame),
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
    sourceFrame?.canonicalVncResult || sourceFrame?.canonicalNncResult
    || (sourceFrame?.sourceCapturedFromExactNncSourceFrame ? sourceFrame.canonicalNncSourceFrame : null);
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
    : sourceFrame?.sourceCapturedFromExactCoreSource
      ? "owner-issued-core-source"
    : sourceFrame?.sourceCapturedFromExactNncResult
      ? "owner-issued-nnc-result"
      : sourceFrame?.sourceCapturedFromExactNncSourceFrame
        ? "owner-issued-nnc-source"
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
    continuationSourceRequirement: sourceEvidenceKind === "owner-issued-nnc-source"
      ? "exact-owner-issued-classified-nounstem-source" : "exact-owner-issued-canonical-result",
    continuationConsumesExactCanonicalResult: sourceEvidenceKind !== "owner-issued-nnc-source",
    continuationAuthorityOwnedByConsumer: true,
    rhymeSpaceCoordinateFrame,
    compatibleCoordinatesCollapsedBySharedContract:
      rhymeSpaceCoordinateFrame.authorizationStatus === "authorized",
    canonicalSourceFrame: sourceFrame,
    canonicalSourceResult:
      sourceFrame?.canonicalVncResult || sourceFrame?.canonicalNncResult
      || (sourceFrame?.sourceCapturedFromExactNncSourceFrame ? sourceFrame.canonicalNncSourceFrame : null),
    canonicalSourceOperationFrame:
      sourceFrame?.canonicalVncOperationFrame
      || sourceFrame?.canonicalNncOperationFrame
      || null,
    sourceDerivationOperation: normalizeKey(
      sourceFrame?.canonicalVncOperationFrame?.operation || ""
    ),
    exactSourceHistoryPreserved: Boolean(
      sourceFrame?.canonicalVncResult || sourceFrame?.canonicalNncResult
      || sourceFrame?.sourceCapturedFromExactNncSourceFrame
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
  // Rare possessed customary reanalyses retain VNC-associated number (§36.2).
  if (profile === "vnc-reanalysis"
    && operationFrame.nominalizationKind === "customary-agentive-reanalysis") {
    return buildCustomNumberFrame({
      subject, stem, nounClass, num1: "0", num2: plural ? "h" : "0", animacy,
      ruleId: "36.2-vnc-associated-number-in-both-states",
    });
  }
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
    const selected = operationFrame.singularConnectorOptions?.length === 1
      ? operationFrame.singularConnectorOptions[0]
      : normalizeKey(requestedConnector || operationFrame.singularConnectorChoice);
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
  if (state === "possessive" && operationFrame.patientivePossessedClassRequired === true) {
    return deepFreeze({authorizationStatus: "blocked", blockReason: "39.2-possessed-nounstem-class-required"});
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
      stem: operationFrame.possessivePredicateContactFrame?.authorizationStatus === "authorized"
        ? stem.replace(/^i/u, "") : stem,
      nounstemRelationKind: "nonrelational",
      nncSourceAuthorityFrame: operationFrame.possessiveAgentiveFrame
        ?.yauhOuterPossessorShift
        ? target.buildClassicalNahuatlNncSourceAuthorityFrame(stem, {
          selectedState: "possessive",
          nonspecificHumanPossessorCarrier: "ti",
        })
        : null,
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
      silentSpecificObject: operationFrame.activationLicenseFrame
        ?.silentSpecificObject === true,
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
  if (authorized) {
    ISSUED_NNC_SLOT_FRAMES.add(nncSlotFrame);
    if (canonicalExternalObjectFrame) {
      ISSUED_NNC_EXTERNAL_OBJECTS.set(nncSlotFrame, canonicalExternalObjectFrame);
    }
  }
  const formulaRealization = authorized
    ? target.renderClassicalNahuatlNncSlotFrameFormula(nncSlotFrame)
    : "";
  const carriers = authorized
    ? [
      nncSlotFrame.slots.subject.pers1,
      nncSlotFrame.slots.subject.pers2,
      ...nncSlotFrame.slots.participant.slots.map(slot => slot.carrier),
      ...nncSlotFrame.slots.state.slots.map(slot => slot.carrier),
      // Nominal continuation introduces declared internal morph contacts.
      // Keep their underlying stem in the slots, but let Lesson 2 realize
      // those contacts before the carrier realizer erases the separators.
      ...(operationFrame.constructionKind === "nominal-continuation"
        ? nncSlotFrame.slots.predicate.stem.split("-")
        : [nncSlotFrame.slots.predicate.stem]),
      nncSlotFrame.slots.number.num1,
      nncSlotFrame.slots.number.num2,
    ]
    : [];
  const realize = typeof target.realizeClassicalNahuatlNncSurfaceCarrier === "function"
    ? target.realizeClassicalNahuatlNncSurfaceCarrier
    : value => normalizeStem(value).replace(/[0Ø⎕-]/gu, "");
  const wordSurface = typeof target.realizeClassicalNahuatlNncSurfaceCarriers === "function"
    ? target.realizeClassicalNahuatlNncSurfaceCarriers(carriers, {
        boundaryKind: ["preterit-agentive", "preterit-patientive"].includes(operationFrame.nominalizationKind)
          ? "typed-ordered-morphemes"
          : operationFrame.constructionKind === "nominal-continuation" ? "typed-nnc-slots" : "",
      })
    : carriers.map(realize).join("");
  const boundMaterialOnly = operationFrame.boundMaterialOnly === true;
  const sentenceSurface = authorized && !boundMaterialOnly
    ? `${wordSurface.charAt(0).toUpperCase()}${wordSurface.slice(1)}.`
    : "";
  const result = deepFreeze({
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
        objectKind: "specific-projective",
        silentSpecificObject: canonicalExternalObjectFrame?.silentSpecificObject === true,
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
    boundMaterialOnly,
    standaloneSentenceAuthorized: !boundMaterialOnly,
    typedSlotAuthority: true,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
  if (authorized && boundMaterialOnly) {
    BOUND_CUSTOMARY_AGENTIVE_NNC_MATERIAL.add(result);
    BOUND_CUSTOMARY_AGENTIVE_NNC_MATERIAL.add(nncSlotFrame);
  }
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

function hasCanonicalPreteritCitationAnalysis(
  resultFrame = null,
  target = globalThis
) {
  const sourceFrame = resultFrame?.sourceFrame;
  const operationFrame = resultFrame?.operationFrame;
  const canonicalResult = resultFrame?.canonicalResult;
  const typedSlotFrame = canonicalResult?.nncSlotFrame;
  const targetStems = operationFrame?.targetStems;
  const state = canonicalResult?.state;
  const selectedStem = state === "possessive"
    ? targetStems?.generalUse
    : targetStems?.restrictedUse;
  return Boolean(
    isClassicalNahuatlDeverbalNncGrammarFrame(resultFrame)
    && resultFrame.constructionKind === "predicate-nominalization"
    && ISSUED_SOURCE_FRAMES.has(sourceFrame)
    && sourceFrame.kind === "classical-nahuatl-deverbal-nnc-source-frame"
    && sourceFrame.sourceStage === "preterit-predicate"
    && isClassicalNahuatlLexicalAuthorizationFrame(
      sourceFrame.lexicalAuthorizationFrame
    )
    && operationFrame.kind === "classical-nahuatl-deverbal-nnc-operation-frame"
    && operationFrame.constructionKind === "predicate-nominalization"
    && ["preterit-agentive", "preterit-patientive"].includes(
      operationFrame.nominalizationKind
    )
    && operationFrame.operationId
      === `predicate-nominalization:${operationFrame.nominalizationKind}`
    && operationFrame.sourceStage === sourceFrame.sourceStage
    && operationFrame.sourceVoice === sourceFrame.sourceVoice
    && operationFrame.sourceValence === sourceFrame.sourceValence
    && operationFrame.sourceObjectPattern === sourceFrame.sourceObjectPattern
    && operationFrame.verbClass === sourceFrame.verbClass
    && canonicalResult.kind === "classical-nahuatl-deverbal-nnc-canonical-nnc-result"
    && ["absolutive", "possessive"].includes(state)
    && operationFrame.allowedStates.includes(state)
    && ISSUED_NNC_SLOT_FRAMES.has(typedSlotFrame)
    && typeof target.isClassicalNahuatlNncSlotFrame === "function"
    && target.isClassicalNahuatlNncSlotFrame(typedSlotFrame)
    && selectedStem
    && selectedStem === typedSlotFrame.slots.predicate.stem
    && selectedStem === canonicalResult.numberFrame.stem
    && operationFrame.nounClass === typedSlotFrame.nounClass
    && operationFrame.nounClass === canonicalResult.numberFrame.nounClass
    && canonicalResult.subject === typedSlotFrame.slots.subject.subject
    && (state === "absolutive"
      ? typedSlotFrame.slots.state.arity === "vacant"
      : typedSlotFrame.slots.state.arity !== "vacant")
    && Object.isFrozen(sourceFrame)
    && Object.isFrozen(operationFrame)
    && Object.isFrozen(targetStems)
    && Object.isFrozen(canonicalResult)
    && Object.isFrozen(typedSlotFrame)
  );
}

function getCanonicalPreteritCitationBase(source, operation) {
  if (operation.preteritAgentiveVariant === "yauh-ti-owner") {
    const secondary = operation.secondaryPossessiveStemFrame;
    const possessive = operation.possessiveAgentiveFrame;
    // §§15.1.5 and 35.6 Note 3 downgrade the possessed predicate to a
    // secondary GENERAL-use stem, retaining its inner tē > ti. Citation
    // (§14.1) neither reverses that derivation nor supplies the distinct
    // restricted-use downgrade described in §15.1.6.
    if (secondary?.kind !== "classical-nahuatl-secondary-possessive-agentive-stem-frame"
      || secondary.authorizationStatus !== "authorized"
      || secondary.sourceFrame !== source
      || secondary.lexicalAuthorizationFrame !== source.lexicalAuthorizationFrame
      || secondary.targetRank !== "secondary-general-use-nounstem"
      || !secondary.stem || secondary.stem !== operation.targetStems.generalUse
      || secondary.restrictedUseCounterpart !== null
      || operation.targetStems.restrictedUse !== ""
      || possessive?.yauhInnerPossessorShift !== true
      || possessive.sourceStem !== secondary.stem
      || !Object.isFrozen(secondary)) return null;
    return {
      stem: secondary.stem,
      useKind: "isolated-citation",
      citationStemSource: "owned-secondary-possessive-predicate",
      citationNumberConstraint: "secondary-possessive-only",
    };
  }
  return operation.targetStems.restrictedUse ? {
    stem: operation.targetStems.restrictedUse,
    useKind: "restricted-use",
    citationStemSource: "owned-restricted-use-counterpart",
    citationNumberConstraint: "class-governed",
  } : null;
}

function getClassicalNahuatlPreteritNncRestrictedUseCitationProjection(
  resultFrame = null,
  target = globalThis
) {
  const blocked = blockReason => deepFreeze({
    kind: PRETERIT_NNC_RESTRICTED_USE_CITATION_PROJECTION_KIND,
    version: VERSION,
    authorizationStatus: "blocked",
    blockReason,
    callerSuppliedAuthorityAccepted: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
  if (!isClassicalNahuatlDeverbalNncGrammarFrame(resultFrame)) {
    return blocked("preterit-nnc-canonical-result-required");
  }
  const sourceFrame = resultFrame.sourceFrame;
  const operationFrame = resultFrame.operationFrame;
  if (resultFrame.constructionKind !== "predicate-nominalization"
    || !["preterit-agentive", "preterit-patientive"].includes(
      operationFrame.nominalizationKind
    )) {
    return blocked("preterit-nnc-predicate-nominalization-required");
  }
  if (!hasCanonicalPreteritCitationAnalysis(resultFrame, target)) {
    return blocked("preterit-nnc-canonical-use-stem-analysis-required");
  }
  const citationBase = getCanonicalPreteritCitationBase(sourceFrame, operationFrame);
  if (!citationBase) {
    return blocked("preterit-nnc-selected-source-has-no-restricted-use-counterpart");
  }
  const { stem } = citationBase;
  const existing = PRETERIT_NNC_RESTRICTED_USE_CITATION_PROJECTIONS.get(
    resultFrame
  );
  if (existing) return existing;
  const canonicalNncResultFrame = resultFrame.canonicalResult;
  const typedSlotFrame = canonicalNncResultFrame.nncSlotFrame;
  // §§14.1 and 35.2–35.6: cite the owner's retained restricted counterpart
  // or its already downgraded secondary general-use stem, as selected above.
  // Do not strip a cā matrix or a number connector from a written result,
  // replay a singular clause, or replace its internal reflexive, affinity,
  // selected perfective, or genuinely archaic quē derivation.
  // §35.4 puts an activated specific object outside the nounstem. Retain
  // that clause's provenance, but do not restore an internal tē/tla or
  // mistake an isolated citation for a replacement clause.
  const projection = deepFreeze({
    kind: PRETERIT_NNC_RESTRICTED_USE_CITATION_PROJECTION_KIND,
    version: VERSION,
    authorizationStatus: "authorized",
    blockReason: "",
    canonicalResultFrame: resultFrame,
    canonicalSourceFrame: sourceFrame,
    canonicalOperationFrame: operationFrame,
    canonicalNncResultFrame,
    canonicalLexicalAuthorizationFrame: sourceFrame.lexicalAuthorizationFrame,
    canonicalTargetStemsFrame: operationFrame.targetStems,
    canonicalSemanticProfile: operationFrame.semanticProfile,
    canonicalAffinityFrame: operationFrame.affinityFrame,
    canonicalOldPersonAnalysisFrame: operationFrame.oldPersonAnalysisFrame,
    canonicalPossessiveAgentiveFrame: operationFrame.possessiveAgentiveFrame,
    canonicalSecondaryPossessiveStemFrame: operationFrame.secondaryPossessiveStemFrame,
    canonicalActivationLicenseFrame: operationFrame.activationLicenseFrame,
    canonicalExternalObjectFrame: canonicalNncResultFrame.externalObjectFrame,
    typedSlotFrame,
    ...citationBase,
    nounClass: operationFrame.nounClass,
    nominalizationKind: operationFrame.nominalizationKind,
    useShape: "base",
    sourcePredicateStem: typedSlotFrame.slots.predicate.stem,
    sourceState: canonicalNncResultFrame.state,
    sourceSubject: canonicalNncResultFrame.subject,
    sourceObjectPattern: sourceFrame.sourceObjectPattern,
    sourceAgreementChanged: false,
    sourceReferenceChanged: false,
    sourceDerivationChanged: false,
    sourceClauseFeaturesProjected: false,
    projectionScope: "isolated-nounstem",
    projectionRole: "read-only-source-constituents",
    continuationMode: "licensed-operation-only",
    directSourceReentryAuthorized: false,
    grammarAuthority: false,
    callerSuppliedAuthorityAccepted: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
  PRETERIT_NNC_RESTRICTED_USE_CITATION_RECEIPTS.set(projection, Object.freeze({
    resultFrame,
    sourceFrame,
    operationFrame,
    canonicalNncResultFrame,
    typedSlotFrame,
    targetStems: operationFrame.targetStems,
    stem,
    nounClass: operationFrame.nounClass,
  }));
  PRETERIT_NNC_RESTRICTED_USE_CITATION_PROJECTIONS.set(resultFrame, projection);
  return projection;
}

function isClassicalNahuatlPreteritNncRestrictedUseCitationProjection(
  frame = null,
  target = globalThis
) {
  const receipt = frame && typeof frame === "object"
    ? PRETERIT_NNC_RESTRICTED_USE_CITATION_RECEIPTS.get(frame)
    : null;
  const citationBase = receipt && getCanonicalPreteritCitationBase(
    receipt.sourceFrame, receipt.operationFrame
  );
  return Boolean(
    receipt
    && PRETERIT_NNC_RESTRICTED_USE_CITATION_PROJECTIONS.get(receipt.resultFrame)
      === frame
    && hasCanonicalPreteritCitationAnalysis(receipt.resultFrame, target)
    && frame.kind === PRETERIT_NNC_RESTRICTED_USE_CITATION_PROJECTION_KIND
    && frame.version === VERSION
    && frame.authorizationStatus === "authorized"
    && frame.blockReason === ""
    && frame.canonicalResultFrame === receipt.resultFrame
    && frame.canonicalSourceFrame === receipt.sourceFrame
    && frame.canonicalOperationFrame === receipt.operationFrame
    && frame.canonicalNncResultFrame === receipt.canonicalNncResultFrame
    && frame.typedSlotFrame === receipt.typedSlotFrame
    && frame.canonicalTargetStemsFrame === receipt.targetStems
    && frame.canonicalPossessiveAgentiveFrame === receipt.operationFrame.possessiveAgentiveFrame
    && frame.canonicalSecondaryPossessiveStemFrame === receipt.operationFrame.secondaryPossessiveStemFrame
    && frame.stem === receipt.stem
    && citationBase && frame.stem === citationBase.stem
    && frame.nounClass === receipt.nounClass
    && frame.sourcePredicateStem === receipt.typedSlotFrame.slots.predicate.stem
    && frame.useKind === citationBase.useKind
    && frame.citationStemSource === citationBase.citationStemSource
    && frame.citationNumberConstraint === citationBase.citationNumberConstraint
    && frame.useShape === "base"
    && frame.sourceAgreementChanged === false
    && frame.sourceReferenceChanged === false
    && frame.sourceDerivationChanged === false
    && frame.sourceClauseFeaturesProjected === false
    && frame.projectionScope === "isolated-nounstem"
    && frame.projectionRole === "read-only-source-constituents"
    && frame.continuationMode === "licensed-operation-only"
    && frame.directSourceReentryAuthorized === false
    && frame.grammarAuthority === false
    && frame.callerSuppliedAuthorityAccepted === false
    && frame.formulaStringAuthority === false
    && frame.surfaceStringAuthority === false
    && Object.isFrozen(frame)
  );
}

function hasCanonicalPredicateCitationAnalysis(resultFrame, target) {
  const source = resultFrame?.sourceFrame;
  const operation = resultFrame?.operationFrame;
  const canonical = resultFrame?.canonicalResult;
  const slots = canonical?.nncSlotFrame;
  const selectedStem = canonical?.state === "possessive"
    ? operation?.targetStems?.generalUse : operation?.targetStems?.restrictedUse;
  return Boolean(
    isClassicalNahuatlDeverbalNncGrammarFrame(resultFrame)
    && resultFrame.constructionKind === "predicate-nominalization"
    && ISSUED_SOURCE_FRAMES.has(source)
    && isClassicalNahuatlLexicalAuthorizationFrame(source.lexicalAuthorizationFrame)
    && operation.kind === "classical-nahuatl-deverbal-nnc-operation-frame"
    && operation.constructionKind === "predicate-nominalization"
    && PREDICATE_NOMINALIZATION_KINDS.includes(operation.nominalizationKind)
    && !["preterit-agentive", "preterit-patientive"].includes(operation.nominalizationKind)
    && operation.operationId === `predicate-nominalization:${operation.nominalizationKind}`
    && operation.sourceStage === source.sourceStage
    && operation.sourceVoice === source.sourceVoice
    && operation.sourceValence === source.sourceValence
    && operation.sourceObjectPattern === source.sourceObjectPattern
    && operation.verbClass === source.verbClass
    && canonical.kind === "classical-nahuatl-deverbal-nnc-canonical-nnc-result"
    && ["absolutive", "possessive"].includes(canonical.state)
    && operation.allowedStates.includes(canonical.state)
    && ISSUED_NNC_SLOT_FRAMES.has(slots)
    && typeof target.isClassicalNahuatlNncSlotFrame === "function"
    && target.isClassicalNahuatlNncSlotFrame(slots)
    && selectedStem && selectedStem === slots.slots.predicate.stem
    && selectedStem === canonical.numberFrame.stem
    && operation.nounClass === slots.nounClass
    && operation.nounClass === canonical.numberFrame.nounClass
    && canonical.subject === slots.slots.subject.subject
    && canonical.numberFrame.num1 === slots.slots.number.num1
    && canonical.numberFrame.num2 === slots.slots.number.num2
    && (slots.slots.state.arity === "vacant") === (canonical.state === "absolutive")
    && Object.isFrozen(source) && Object.isFrozen(operation)
    && Object.isFrozen(operation.targetStems) && Object.isFrozen(canonical)
  );
}

function getCanonicalPredicateCitationBase(source, operation) {
  if (operation.nominalizationKind === "instrumentive"
    && operation.instrumentiveRealizationFrame?.selectedState === "possessive") {
    const realization = operation.instrumentiveRealizationFrame;
    const participants = operation.instrumentiveParticipantFrame;
    // §36.6 has two independently nominalized stems. The exact imperfect
    // active -ya nounstem can be cited without inventing a customary -ni
    // counterpart. Note 2 contradicts a possessive-only citation veto.
    if (source.sourceStage !== "imperfect-predicate" || source.sourceVoice !== "active"
      || realization.authorizationStatus !== "authorized"
      || realization.sourcePath !== "imperfect-active"
      || realization.sourceMorphemicShapeFrame?.predicateStem !== source.sourceStem
      || realization.sourceObjectPattern !== source.sourceObjectPattern
      || participants?.authorizationStatus !== "authorized"
      || participants.selectedState !== "possessive"
      || participants.selectedSourcePath !== "imperfect-active-vnc-result"
      || participants.sourceVoice !== source.sourceVoice
      || participants.sourceSubject !== source.sourceSubject
      || participants.sourceSubjectBecomesPossessor !== true
      || participants.transformedPossessor !== operation.transformedPossessor
      || participants.nounClass !== "tl" || participants.nounSubclass !== "tl-1-b"
      || operation.nounClass !== "tl"
      || !realization.targetStem || realization.targetStem !== operation.targetStems.generalUse
      || operation.targetStems.restrictedUse !== ""
      || operation.targetStems.citationRestrictedUse !== "") return null;
    return { stem: realization.targetStem, useKind: "isolated-citation",
      citationStemSource: "owned-imperfect-active-instrumentive" };
  }
  return operation.targetStems.citationRestrictedUse ? {
    stem: operation.targetStems.citationRestrictedUse, useKind: "restricted-use",
    citationStemSource: "owned-restricted-use-counterpart",
  } : null;
}

function getClassicalNahuatlPredicateNncRestrictedUseCitationProjection(resultFrame, target) {
  const blocked = blockReason => deepFreeze({
    kind: PREDICATE_NNC_RESTRICTED_USE_CITATION_PROJECTION_KIND,
    version: VERSION, authorizationStatus: "blocked", blockReason,
    callerSuppliedAuthorityAccepted: false, formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
  if (!hasCanonicalPredicateCitationAnalysis(resultFrame, target)) {
    return blocked("predicate-nnc-canonical-use-stem-analysis-required");
  }
  const source = resultFrame.sourceFrame;
  const operation = resultFrame.operationFrame;
  const canonical = resultFrame.canonicalResult;
  const slots = canonical.nncSlotFrame;
  const citationBase = getCanonicalPredicateCitationBase(source, operation);
  if (!citationBase) {
    return blocked("predicate-nnc-selected-source-has-no-restricted-use-counterpart");
  }
  const { stem } = citationBase;
  const existing = PREDICATE_NNC_RESTRICTED_USE_CITATION_PROJECTIONS.get(resultFrame);
  if (existing) return existing;
  const citationRestorationFrame = deepFreeze({
    kind: "classical-nahuatl-predicate-citation-restoration-frame",
    authorizationStatus: "authorized",
    canonicalTargetStemsFrame: operation.targetStems,
    selectedRestrictedUse: operation.targetStems.restrictedUse,
    citationRestrictedUse: operation.targetStems.citationRestrictedUse,
    citationStem: stem,
    sourceBoundaryVariant: operation.boundaryVariant,
    sourceBoundaryContext: operation.boundaryContext,
    action: citationBase.useKind === "isolated-citation"
      ? "retain-owned-imperfect-active-instrumentive"
      : operation.boundaryVariant === "drop-real-final-i"
        ? "restore-retained-pre-boundary-ni" : "retain-owned-restricted-counterpart",
    surfaceSuffixRecovery: false, sourceReevaluated: false,
    formulaStringAuthority: false, surfaceStringAuthority: false,
  });
  const projection = deepFreeze({
    kind: PREDICATE_NNC_RESTRICTED_USE_CITATION_PROJECTION_KIND,
    version: VERSION, authorizationStatus: "authorized", blockReason: "",
    canonicalResultFrame: resultFrame, canonicalSourceFrame: source,
    canonicalOperationFrame: operation, canonicalNncResultFrame: canonical,
    canonicalLexicalAuthorizationFrame: source.lexicalAuthorizationFrame,
    canonicalTargetStemsFrame: operation.targetStems,
    canonicalSemanticProfile: operation.semanticProfile,
    canonicalCustomaryAgentivePossessiveSupplementFrame: operation.customaryAgentivePossessiveSupplementFrame,
    canonicalInstrumentiveSourcePairFrame: operation.instrumentiveSourcePairFrame,
    canonicalInstrumentiveParticipantFrame: operation.instrumentiveParticipantFrame || null,
    canonicalInstrumentiveRealizationFrame: operation.instrumentiveRealizationFrame || null,
    canonicalParticipantRoleTransitionFrame: operation.participantRoleTransitionFrame,
    canonicalActivationLicenseFrame: operation.activationLicenseFrame,
    canonicalExternalObjectFrame: canonical.externalObjectFrame,
    citationRestorationFrame, typedSlotFrame: slots, ...citationBase,
    nounClass: operation.nounClass, nominalizationKind: operation.nominalizationKind,
    useShape: "base",
    sourcePredicateStem: slots.slots.predicate.stem,
    sourceState: canonical.state, sourceSubject: canonical.subject,
    sourceObjectPattern: source.sourceObjectPattern,
    citationNumberConstraint: "class-governed",
    sourceAgreementChanged: false, sourceReferenceChanged: false,
    sourceDerivationChanged: false, sourceClauseFeaturesProjected: false,
    projectionScope: "isolated-nounstem", projectionRole: "read-only-source-constituents",
    continuationMode: "licensed-operation-only", directSourceReentryAuthorized: false,
    grammarAuthority: false, callerSuppliedAuthorityAccepted: false,
    formulaStringAuthority: false, surfaceStringAuthority: false,
  });
  PREDICATE_NNC_RESTRICTED_USE_CITATION_RECEIPTS.set(projection, Object.freeze({
    resultFrame, source, operation, canonical, slots, stem, citationRestorationFrame,
  }));
  PREDICATE_NNC_RESTRICTED_USE_CITATION_PROJECTIONS.set(resultFrame, projection);
  return projection;
}

function isClassicalNahuatlPredicateNncRestrictedUseCitationProjection(frame, target) {
  const receipt = frame && typeof frame === "object"
    ? PREDICATE_NNC_RESTRICTED_USE_CITATION_RECEIPTS.get(frame) : null;
  const citationBase = receipt && getCanonicalPredicateCitationBase(receipt.source, receipt.operation);
  return Boolean(receipt
    && PREDICATE_NNC_RESTRICTED_USE_CITATION_PROJECTIONS.get(receipt.resultFrame) === frame
    && hasCanonicalPredicateCitationAnalysis(receipt.resultFrame, target)
    && frame.kind === PREDICATE_NNC_RESTRICTED_USE_CITATION_PROJECTION_KIND
    && frame.version === VERSION && frame.authorizationStatus === "authorized"
    && frame.blockReason === ""
    && frame.canonicalResultFrame === receipt.resultFrame
    && frame.canonicalSourceFrame === receipt.source
    && frame.canonicalOperationFrame === receipt.operation
    && frame.canonicalNncResultFrame === receipt.canonical
    && frame.typedSlotFrame === receipt.slots
    && frame.canonicalTargetStemsFrame === receipt.operation.targetStems
    && citationBase && frame.stem === receipt.stem && frame.stem === citationBase.stem
    && frame.useKind === citationBase.useKind
    && frame.citationStemSource === citationBase.citationStemSource
    && frame.nounClass === receipt.operation.nounClass
    && frame.citationRestorationFrame === receipt.citationRestorationFrame
    && frame.sourcePredicateStem === receipt.slots.slots.predicate.stem
    && frame.useShape === "base"
    && frame.sourceAgreementChanged === false && frame.sourceReferenceChanged === false
    && frame.sourceDerivationChanged === false && frame.sourceClauseFeaturesProjected === false
    && frame.projectionScope === "isolated-nounstem"
    && frame.projectionRole === "read-only-source-constituents"
    && frame.continuationMode === "licensed-operation-only"
    && frame.directSourceReentryAuthorized === false && frame.grammarAuthority === false
    && frame.callerSuppliedAuthorityAccepted === false
    && frame.formulaStringAuthority === false && frame.surfaceStringAuthority === false
    && Object.isFrozen(frame));
}

function getClassicalNahuatlCustomaryAgentiveFinalIBoundaryFacts(
  result = null,
  {useKind = "ordinary-nnc"} = {},
  target = globalThis,
) {
  const blocked = blockReason => deepFreeze({
    kind: "classical-nahuatl-customary-agentive-final-i-boundary-facts",
    version: VERSION, authorizationStatus: "blocked", blockReason,
    availableRealizations: [], factsReadOnly: true,
    callerSuppliedAuthorityAccepted: false, formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
  let canonicalNncGrammarFrame = isClassicalNahuatlDeverbalNncGrammarFrame(result)
    ? result : null;
  if (!canonicalNncGrammarFrame && PREDICATE_NNC_CONTINUATION_CONTEXTS.has(result)) {
    canonicalNncGrammarFrame = CUSTOMARY_NNC_SLOT_PARENTS.get(result.nncSlotFrame) || null;
  }
  if (!canonicalNncGrammarFrame
    && target.isClassicalNahuatlIssuedNncSentenceSurfaceFrame?.(result) === true
    && result.polarity === "positive" && result.sentenceType === "assertion"
    && !result.sentencePrefixalStack?.length) {
    canonicalNncGrammarFrame = CUSTOMARY_NNC_SLOT_PARENTS.get(result.sourceNncSlotFrame) || null;
  }
  const canonicalNncResult = canonicalNncGrammarFrame?.canonicalResult || result;
  const context = PREDICATE_NNC_CONTINUATION_CONTEXTS.get(canonicalNncResult);
  const source = context?.sourceFrame;
  const operation = context?.operationFrame;
  const slots = canonicalNncResult?.nncSlotFrame;
  const nominalizationKind = operation?.nominalizationKind;
  if (!context || canonicalNncResult?.authorizationStatus !== "authorized"
    || !["customary-agentive-reanalysis", "customary-agentive-full"].includes(nominalizationKind)
    || !ISSUED_NNC_SLOT_FRAMES.has(slots)
    || target.isClassicalNahuatlNncSlotFrame?.(slots) !== true
    || (canonicalNncGrammarFrame && (canonicalNncGrammarFrame.sourceFrame !== source
      || canonicalNncGrammarFrame.operationFrame !== operation))) {
    return blocked("exact-owner-issued-customary-agentive-result-required");
  }
  const selectedUse = normalizeKey(useKind);
  if (!["ordinary-nnc", "possessive-singular", "compound-embed", "vocative"].includes(selectedUse)) {
    return blocked("customary-agentive-final-i-use-not-recognized");
  }
  const full = nominalizationKind === "customary-agentive-full" && operation.nounClass === "tl";
  const possessiveSingular = nominalizationKind === "customary-agentive-reanalysis"
    && canonicalNncResult.state === "possessive"
    && !isPluralSubject(canonicalNncResult.subject)
    && operation.possessiveSingularFinalILossLicensed === true;
  if (selectedUse === "compound-embed" && !full) {
    return blocked("36.3-fully-nominal-customary-agentive-embed-required");
  }
  if (selectedUse === "vocative" && (!full || canonicalNncResult.state !== "absolutive")) {
    return blocked("36.3-exact-absolutive-full-customary-agentive-vocative-required");
  }
  if (selectedUse === "possessive-singular" && !possessiveSingular) {
    return blocked("36.2-rare-singular-possessive-reanalysis-required");
  }
  const citationStem = normalizeStem(operation.targetStems?.citationRestrictedUse);
  const sourceDropped = operation.boundaryVariant === "drop-real-final-i";
  const preservedStem = sourceDropped ? citationStem : normalizeStem(
    selectedUse === "compound-embed" ? operation.targetStems?.generalUse
      : operation.targetStems?.restrictedUse,
  );
  if (!citationStem || !preservedStem) {
    return blocked("customary-agentive-owned-pre-boundary-stem-required");
  }
  const silentNumber = [slots.slots.number.num1, slots.slots.number.num2]
    .every(carrier => ["0", "Ø", "⎕"].includes(normalizeStem(carrier)));
  const lossLicensed = /ni$/u.test(preservedStem) && (
    (["ordinary-nnc", "possessive-singular"].includes(selectedUse) && possessiveSingular)
    || (["compound-embed", "vocative"].includes(selectedUse)
      && source.lexicalAuthorizationFrame.finalIRealizations.includes("drop")
      && (selectedUse !== "vocative" || silentNumber))
  );
  const availableRealizations = lossLicensed ? ["preserve", "drop"] : ["preserve"];
  return deepFreeze({
    kind: "classical-nahuatl-customary-agentive-final-i-boundary-facts",
    version: VERSION, authorizationStatus: "authorized", blockReason: "",
    canonicalParentResult: result, canonicalNncGrammarFrame, canonicalNncResult,
    canonicalSourceFrame: source, canonicalOperationFrame: operation,
    canonicalTypedSlotFrame: slots, useKind: selectedUse, citationStem, preservedStem,
    droppedStem: lossLicensed ? preservedStem.replace(/ni$/u, "n") : "",
    availableRealizations, defaultRealization: "preserve",
    selectedRealization: sourceDropped && lossLicensed ? "drop" : "preserve",
    factsReadOnly: true, exactResultIdentityPreserved: true,
    callerSuppliedAuthorityAccepted: false, formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

function buildClassicalNahuatlCustomaryAgentiveBoundaryConstituent(
  result = null,
  options = {},
  target = globalThis,
) {
  const blocked = blockReason => deepFreeze({
    kind: "classical-nahuatl-customary-agentive-boundary-constituent",
    version: VERSION, authorizationStatus: "blocked", blockReason,
    standaloneNncAuthorized: false, callerSuppliedAuthorityAccepted: false,
    formulaStringAuthority: false, surfaceStringAuthority: false,
  });
  if (!options || typeof options !== "object" || Array.isArray(options)
    || Reflect.ownKeys(options).some(key => !["useKind", "finalIRealization"].includes(key))) {
    return blocked("customary-agentive-boundary-selection-not-recognized");
  }
  const useKind = normalizeKey(options.useKind || "compound-embed");
  if (useKind !== "compound-embed") return blocked("customary-agentive-compound-embed-boundary-required");
  const facts = getClassicalNahuatlCustomaryAgentiveFinalIBoundaryFacts(result, {useKind}, target);
  if (facts.authorizationStatus !== "authorized") return blocked(facts.blockReason);
  const selectedRealization = normalizeKey(options.finalIRealization || facts.selectedRealization);
  if (!facts.availableRealizations.includes(selectedRealization)) {
    return blocked("36.3-customary-agentive-final-i-realization-not-licensed");
  }
  const selectedStem = selectedRealization === "drop" ? facts.droppedStem : facts.preservedStem;
  const bridge = deepFreeze({
    ...facts, kind: "classical-nahuatl-customary-agentive-boundary-constituent",
    selectedRealization, selectedStem, standaloneNncAuthorized: false,
  });
  CUSTOMARY_AGENTIVE_BOUNDARY_CONSTITUENT_RECEIPTS.set(bridge, {result, facts, selectedRealization, selectedStem});
  return bridge;
}

function isClassicalNahuatlCustomaryAgentiveBoundaryConstituent(
  frame = null,
  parent = null,
  target = globalThis,
) {
  const receipt = frame && typeof frame === "object"
    ? CUSTOMARY_AGENTIVE_BOUNDARY_CONSTITUENT_RECEIPTS.get(frame) : null;
  if (!receipt || (parent && parent !== receipt.result)) return false;
  const facts = getClassicalNahuatlCustomaryAgentiveFinalIBoundaryFacts(receipt.result,
    {useKind: "compound-embed"}, target);
  return facts.authorizationStatus === "authorized"
    && frame.authorizationStatus === "authorized"
    && frame.useKind === "compound-embed"
    && frame.canonicalParentResult === receipt.result
    && frame.canonicalNncResult === facts.canonicalNncResult
    && frame.canonicalNncGrammarFrame === facts.canonicalNncGrammarFrame
    && frame.canonicalSourceFrame === facts.canonicalSourceFrame
    && frame.canonicalOperationFrame === facts.canonicalOperationFrame
    && frame.canonicalTypedSlotFrame === facts.canonicalTypedSlotFrame
    && frame.citationStem === facts.citationStem
    && frame.selectedRealization === receipt.selectedRealization
    && facts.availableRealizations.includes(frame.selectedRealization)
    && frame.selectedStem === receipt.selectedStem
    && frame.selectedStem === (frame.selectedRealization === "drop" ? facts.droppedStem : facts.preservedStem)
    && frame.standaloneNncAuthorized === false && Object.isFrozen(frame);
}

function isClassicalNahuatlBoundCustomaryAgentiveNncMaterial(value = null) {
  return Boolean(value && typeof value === "object" && BOUND_CUSTOMARY_AGENTIVE_NNC_MATERIAL.has(value));
}

function hasCanonicalDeverbalActionCitationAnalysis(resultFrame, target) {
  const source = resultFrame?.sourceFrame;
  const operation = resultFrame?.operationFrame;
  const canonical = resultFrame?.canonicalResult;
  const slots = canonical?.nncSlotFrame;
  const stem = operation?.targetStems?.restrictedUse;
  return Boolean(
    isClassicalNahuatlDeverbalNncGrammarFrame(resultFrame)
    && resultFrame.constructionKind === "deverbal-action"
    && ISSUED_SOURCE_FRAMES.has(source)
    && isClassicalNahuatlLexicalAuthorizationFrame(source.lexicalAuthorizationFrame)
    && operation.constructionKind === "deverbal-action"
    && ["active-action", "potential-patient", "impersonal-general-action"].includes(operation.actionKind)
    && ["z", "liz"].includes(operation.actionSuffix)
    && operation.operationId === `deverbal-action:${operation.actionKind}:${operation.actionSuffix}`
    && operation.deverbalNounstemAxisFrame?.authorizationStatus === "authorized"
    && operation.sourceStage === "future-core" && source.sourceStage === "future-core"
    && operation.sourceVoice === source.sourceVoice
    && operation.sourceObjectPattern === source.sourceObjectPattern
    && operation.deverbalActionFrame?.futureVncCore === source.sourceStem
    && operation.deverbalActionFrame.nominalSuffix === operation.actionSuffix
    && (!source.deverbalActionVncCaptureFrame
      || isClassicalNahuatlDeverbalActionVncCaptureFrame(source.deverbalActionVncCaptureFrame))
    && canonical.kind === "classical-nahuatl-deverbal-nnc-canonical-nnc-result"
    && operation.allowedStates.includes(canonical.state)
    && ["absolutive", "possessive"].includes(canonical.state)
    && ISSUED_NNC_SLOT_FRAMES.has(slots)
    && target.isClassicalNahuatlNncSlotFrame?.(slots) === true
    // §37.2 gives the same stem in both uses. Validate that exact owned
    // analysis; neither the outer tli nor the source future z is its suffix.
    && stem && stem === operation.targetStems.generalUse
    && stem === slots.slots.predicate.stem && stem === canonical.numberFrame.stem
    && operation.nounClass === "tli" && slots.nounClass === operation.nounClass
    && canonical.numberFrame.nounClass === operation.nounClass
    && canonical.subject === slots.slots.subject.subject
    && canonical.numberFrame.num1 === slots.slots.number.num1
    && canonical.numberFrame.num2 === slots.slots.number.num2
    && (slots.slots.state.arity === "vacant") === (canonical.state === "absolutive")
    && Object.isFrozen(source) && Object.isFrozen(operation)
    && Object.isFrozen(operation.targetStems) && Object.isFrozen(canonical)
  );
}

function getClassicalNahuatlDeverbalActionNncRestrictedUseCitationProjection(resultFrame, target) {
  if (!hasCanonicalDeverbalActionCitationAnalysis(resultFrame, target)) {
    return deepFreeze({ kind: DEVERBAL_ACTION_NNC_CITATION_PROJECTION_KIND,
      version: VERSION, authorizationStatus: "blocked",
      blockReason: "deverbal-action-nnc-canonical-use-stem-analysis-required",
      callerSuppliedAuthorityAccepted: false, formulaStringAuthority: false,
      surfaceStringAuthority: false });
  }
  const existing = DEVERBAL_ACTION_NNC_CITATION_PROJECTIONS.get(resultFrame);
  if (existing) return existing;
  const source = resultFrame.sourceFrame;
  const operation = resultFrame.operationFrame;
  const canonical = resultFrame.canonicalResult;
  const slots = canonical.nncSlotFrame;
  const projection = deepFreeze({
    kind: DEVERBAL_ACTION_NNC_CITATION_PROJECTION_KIND, version: VERSION,
    authorizationStatus: "authorized", blockReason: "",
    canonicalResultFrame: resultFrame, canonicalSourceFrame: source,
    canonicalOperationFrame: operation, canonicalNncResultFrame: canonical,
    canonicalLexicalAuthorizationFrame: source.lexicalAuthorizationFrame,
    canonicalTargetStemsFrame: operation.targetStems,
    canonicalDeverbalNounstemAxisFrame: operation.deverbalNounstemAxisFrame,
    canonicalDeverbalActionFrame: operation.deverbalActionFrame,
    canonicalVncCaptureFrame: source.deverbalActionVncCaptureFrame || null,
    canonicalParticipantRoleTransitionFrame: operation.participantRoleTransitionFrame,
    canonicalActionVoicePossessorRoleFrame: operation.actionVoicePossessorRoleFrame,
    typedSlotFrame: slots, stem: operation.targetStems.restrictedUse,
    nounClass: operation.nounClass, actionKind: operation.actionKind,
    actionSuffix: operation.actionSuffix,
    useKind: "restricted-use", useShape: "base",
    sourcePredicateStem: slots.slots.predicate.stem,
    sourceState: canonical.state, sourceSubject: canonical.subject,
    sourceObjectPattern: source.sourceObjectPattern,
    citationNumberConstraint: "class-governed",
    sourceAgreementChanged: false, sourceReferenceChanged: false,
    sourceDerivationChanged: false, sourceClauseFeaturesProjected: false,
    projectionScope: "isolated-nounstem", projectionRole: "read-only-source-constituents",
    continuationMode: "licensed-operation-only", directSourceReentryAuthorized: false,
    grammarAuthority: false, callerSuppliedAuthorityAccepted: false,
    formulaStringAuthority: false, surfaceStringAuthority: false,
  });
  DEVERBAL_ACTION_NNC_CITATION_RECEIPTS.set(projection, resultFrame);
  DEVERBAL_ACTION_NNC_CITATION_PROJECTIONS.set(resultFrame, projection);
  return projection;
}

function isClassicalNahuatlDeverbalActionNncRestrictedUseCitationProjection(frame, target) {
  const result = frame && typeof frame === "object"
    ? DEVERBAL_ACTION_NNC_CITATION_RECEIPTS.get(frame) : null;
  return Boolean(result && DEVERBAL_ACTION_NNC_CITATION_PROJECTIONS.get(result) === frame
    && hasCanonicalDeverbalActionCitationAnalysis(result, target)
    && frame.kind === DEVERBAL_ACTION_NNC_CITATION_PROJECTION_KIND
    && frame.version === VERSION && frame.authorizationStatus === "authorized"
    && frame.canonicalResultFrame === result
    && frame.canonicalSourceFrame === result.sourceFrame
    && frame.canonicalOperationFrame === result.operationFrame
    && frame.canonicalNncResultFrame === result.canonicalResult
    && frame.typedSlotFrame === result.canonicalResult.nncSlotFrame
    && frame.canonicalTargetStemsFrame === result.operationFrame.targetStems
    && frame.stem === result.operationFrame.targetStems.restrictedUse
    && frame.formulaStringAuthority === false && frame.surfaceStringAuthority === false
    && frame.callerSuppliedAuthorityAccepted === false && Object.isFrozen(frame));
}

function hasCanonicalPatientiveCitationAnalysis(resultFrame, target) {
  const source = resultFrame?.sourceFrame;
  const operation = resultFrame?.operationFrame;
  const canonical = resultFrame?.canonicalResult;
  const slots = canonical?.nncSlotFrame;
  const characteristic = operation?.patientiveKind === "characteristic-property";
  const contractId = characteristic ? "patientive:characteristic-property"
    : `patientive:${operation?.patientiveSourceFamily}`;
  const contract = DEVERBAL_NOUNSTEM_SOURCE_CONTRACTS[contractId];
  const axis = operation?.deverbalNounstemAxisFrame;
  const selectedStem = canonical?.state === "possessive"
    ? operation?.targetStems?.generalUse : operation?.targetStems?.restrictedUse;
  return Boolean(
    isClassicalNahuatlDeverbalNncGrammarFrame(resultFrame)
    && resultFrame.constructionKind === "patientive"
    && ISSUED_SOURCE_FRAMES.has(source)
    && isClassicalNahuatlLexicalAuthorizationFrame(source.lexicalAuthorizationFrame)
    && operation.constructionKind === "patientive"
    && ["ordinary", "characteristic-property"].includes(operation.patientiveKind)
    && contract && source.sourceStage === contract.sourceStage
    && contract.sourceVoices.includes(source.sourceVoice)
    && axis?.authorizationStatus === "authorized" && axis.structuralContractSatisfied === true
    && axis.structuralContractId === contractId && axis.canonicalSourceFrame === source
    && contract.sourceEvidenceKinds.includes(axis.sourceEvidenceKind)
    && operation.operationId === (characteristic
      ? `${contractId}:${operation.characteristicReading}` : contractId)
    && canonical.kind === "classical-nahuatl-deverbal-nnc-canonical-nnc-result"
    && ["absolutive", "possessive"].includes(canonical.state)
    && operation.allowedStates.includes(canonical.state)
    && ISSUED_NNC_SLOT_FRAMES.has(slots)
    && target.isClassicalNahuatlNncSlotFrame?.(slots) === true
    && selectedStem && selectedStem === slots.slots.predicate.stem
    && selectedStem === canonical.numberFrame.stem
    && operation.nounClass === slots.nounClass
    && operation.nounClass === canonical.numberFrame.nounClass
    && canonical.subject === slots.slots.subject.subject
    && canonical.numberFrame.num1 === slots.slots.number.num1
    && canonical.numberFrame.num2 === slots.slots.number.num2
    && (slots.slots.state.arity === "vacant") === (canonical.state === "absolutive")
    && Object.isFrozen(source) && Object.isFrozen(operation)
    && Object.isFrozen(operation.targetStems) && Object.isFrozen(canonical)
  );
}

function getCanonicalPatientiveCitationBase(operation) {
  if (operation.patientiveKind === "characteristic-property"
    && operation.characteristicReading === "organic-possession") {
    const organic = operation.characteristicOrganicPossessionFrame;
    const foundation = operation.characteristicPatientiveFoundationFrame;
    // §14.1 distinguishes isolated citation from absolutive-NNC formation.
    // §39.3.4 restricts the organic NNC's state, not citation of its nounstem.
    // Read the already owned long target; do not invert possessed -yo or
    // manufacture a restricted-use NNC counterpart for this exact reading.
    if (organic?.authorizationStatus !== "authorized"
      || organic.selectedReading !== "organic-possession"
      || organic.organicPossessionIsPossessiveOnly !== true
      || foundation?.characteristicOrganicPossessionFrame !== organic
      || foundation.selectedReading !== "organic-possession"
      || !organic.organicTargetStem
      || organic.organicTargetStem !== foundation.characteristicPatientiveTargetStem
      || foundation.possessiveStateStem !== operation.targetStems.generalUse
      || operation.targetStems.restrictedUse !== ""
      || operation.allowedStates.length !== 1 || operation.allowedStates[0] !== "possessive") return null;
    return {
      stem: organic.organicTargetStem, useKind: "isolated-citation",
      citationStemSource: "owned-organic-target", citationNumberConstraint: "possessive-only",
    };
  }
  return operation.targetStems.restrictedUse ? {
    stem: operation.targetStems.restrictedUse, useKind: "restricted-use",
    citationStemSource: "owned-restricted-use-counterpart", citationNumberConstraint: "class-governed",
  } : null;
}

function getClassicalNahuatlPatientiveNncRestrictedUseCitationProjection(resultFrame, target) {
  const blocked = blockReason => deepFreeze({
    kind: PATIENTIVE_NNC_CITATION_PROJECTION_KIND, version: VERSION,
    authorizationStatus: "blocked", blockReason,
    callerSuppliedAuthorityAccepted: false, formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
  if (!hasCanonicalPatientiveCitationAnalysis(resultFrame, target)) {
    return blocked("patientive-nnc-canonical-use-stem-analysis-required");
  }
  const source = resultFrame.sourceFrame;
  const operation = resultFrame.operationFrame;
  const canonical = resultFrame.canonicalResult;
  const citationBase = getCanonicalPatientiveCitationBase(operation);
  if (!citationBase) {
    return blocked("patientive-nnc-selected-source-has-no-owned-citation-base");
  }
  const existing = PATIENTIVE_NNC_CITATION_PROJECTIONS.get(resultFrame);
  if (existing) return existing;
  // Read the existing derivation, including selected object/core/allomorph
  // and characteristic yō assimilation. Never invert a possessed spelling.
  const projection = deepFreeze({
    kind: PATIENTIVE_NNC_CITATION_PROJECTION_KIND, version: VERSION,
    authorizationStatus: "authorized", blockReason: "",
    canonicalResultFrame: resultFrame, canonicalSourceFrame: source,
    canonicalOperationFrame: operation, canonicalNncResultFrame: canonical,
    canonicalTargetStemsFrame: operation.targetStems,
    canonicalLexicalAuthorizationFrame: source.lexicalAuthorizationFrame,
    canonicalDeverbalNounstemAxisFrame: operation.deverbalNounstemAxisFrame,
    canonicalPatientiveUseFrame: operation.patientiveUseFrame || null,
    canonicalPatientiveTaxonomyFrame: operation.patientiveTaxonomyFrame || null,
    canonicalPatientiveTruncationFrame: operation.patientiveTruncationFrame || null,
    canonicalRootStockPatientiveFrame: operation.rootStockPatientiveFrame || null,
    canonicalPerfectivePatientiveFrame: operation.perfectivePatientiveFrame || null,
    canonicalImperfectivePatientiveFrame: operation.imperfectivePatientiveFrame || null,
    canonicalCharacteristicFoundationFrame: operation.characteristicPatientiveFoundationFrame || null,
    canonicalCharacteristicOwnerhoodContrastFrame: operation.characteristicOwnerhoodContrastFrame || null,
    canonicalCharacteristicOrganicPossessionFrame: operation.characteristicOrganicPossessionFrame || null,
    canonicalCharacteristicPreteritAgentiveFrame: operation.characteristicPreteritAgentiveFrame || null,
    typedSlotFrame: canonical.nncSlotFrame, ...citationBase, nounClass: operation.nounClass,
    patientiveKind: operation.patientiveKind,
    patientiveSourceFamily: operation.patientiveSourceFamily,
    characteristicReading: operation.characteristicReading || "",
    sourcePredicateStem: canonical.nncSlotFrame.slots.predicate.stem,
    sourceState: canonical.state, sourceSubject: canonical.subject,
    sourceObjectPattern: source.sourceObjectPattern,
    useShape: "base",
    sourceAgreementChanged: false, sourceReferenceChanged: false,
    sourceDerivationChanged: false, sourceClauseFeaturesProjected: false,
    projectionScope: "isolated-nounstem", projectionRole: "read-only-source-constituents",
    continuationMode: "licensed-operation-only", directSourceReentryAuthorized: false,
    grammarAuthority: false, callerSuppliedAuthorityAccepted: false,
    formulaStringAuthority: false, surfaceStringAuthority: false,
  });
  PATIENTIVE_NNC_CITATION_RECEIPTS.set(projection, resultFrame);
  PATIENTIVE_NNC_CITATION_PROJECTIONS.set(resultFrame, projection);
  return projection;
}

function isClassicalNahuatlPatientiveNncRestrictedUseCitationProjection(frame, target) {
  const result = frame && typeof frame === "object"
    ? PATIENTIVE_NNC_CITATION_RECEIPTS.get(frame) : null;
  const citationBase = result && getCanonicalPatientiveCitationBase(result.operationFrame);
  return Boolean(result && PATIENTIVE_NNC_CITATION_PROJECTIONS.get(result) === frame
    && hasCanonicalPatientiveCitationAnalysis(result, target)
    && frame.kind === PATIENTIVE_NNC_CITATION_PROJECTION_KIND
    && frame.version === VERSION && frame.authorizationStatus === "authorized"
    && frame.canonicalResultFrame === result
    && frame.canonicalSourceFrame === result.sourceFrame
    && frame.canonicalOperationFrame === result.operationFrame
    && frame.canonicalNncResultFrame === result.canonicalResult
    && frame.typedSlotFrame === result.canonicalResult.nncSlotFrame
    && frame.canonicalTargetStemsFrame === result.operationFrame.targetStems
    && citationBase && frame.stem === citationBase.stem
    && frame.useKind === citationBase.useKind
    && frame.citationStemSource === citationBase.citationStemSource
    && frame.citationNumberConstraint === citationBase.citationNumberConstraint
    && frame.formulaStringAuthority === false && frame.surfaceStringAuthority === false
    && frame.callerSuppliedAuthorityAccepted === false && Object.isFrozen(frame));
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

function captureInstrumentiveCitation(result, target) {
  const projection = getClassicalNahuatlPredicateNncRestrictedUseCitationProjection(result, target);
  const licensed = isClassicalNahuatlPredicateNncRestrictedUseCitationProjection(projection, target)
    && projection.canonicalResultFrame === result
    && projection.citationStemSource === "owned-imperfect-active-instrumentive"
    && projection.canonicalLexicalAuthorizationFrame?.instrumentiveAbsolutiveCitation === "long-ya"
    && /(?:^|-)ya$/u.test(projection.stem);
  const frame = deepFreeze({
    kind: "classical-nahuatl-instrumentive-citation-capture-frame", version: VERSION,
    authorizationStatus: licensed ? "authorized" : "blocked",
    blockReason: licensed ? "" : "36.6-attested-imperfect-instrumentive-citation-required",
    canonicalNncResult: result, citationProjection: projection,
    canonicalSourceFrame: licensed ? projection.canonicalSourceFrame : null,
    canonicalOperationFrame: licensed ? projection.canonicalOperationFrame : null,
    callerSuppliedAuthorityAccepted: false, formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
  if (licensed) ISSUED_INSTRUMENTIVE_CITATION_CAPTURES.add(frame);
  return frame;
}

// §36.7 licenses the Sun noun as a lexicalized use of an actual present
// compound. Its ordinary noun operations are separate from the absolutive-only
// present-agentive operation. Neither an entered word nor a copied frame
// establishes that history.
function buildLexicalizedPresentNncSource(result, target) {
  const projection = getClassicalNahuatlPredicateNncRestrictedUseCitationProjection(result, target);
  const op = result?.sourceFrame?.canonicalVncOperationFrame;
  const licensed = isClassicalNahuatlPredicateNncRestrictedUseCitationProjection(projection, target)
    && result.operationFrame.nominalizationKind === "present-agentive"
    && result.sourceFrame.sourceCapturedFromExactVncResult === true
    && result.sourceFrame.sourceSubject === "3sg"
    && result.sourceFrame.sourceObjectPattern === "none"
    && op?.operation === "compound" && op.variant === "connective-t"
    && op.sourceStem === "tōna"
    && op.operationFacts?.matrixSuppliedStem === "ya-uh"
    && op.targetStem === result.sourceFrame.sourceStem
    && projection.stem === `${op.targetStem}-0`;
  if (!licensed) return deepFreeze({
    kind: "classical-nahuatl-lexicalized-present-nnc-source-frame",
    authorizationStatus: "blocked", blockReason: "36.7-exact-lexicalized-present-compound-required",
    callerSuppliedAuthorityAccepted: false, surfaceStringAuthority: false,
  });
  const existing = LEXICALIZED_PRESENT_NNC_SOURCES.get(result);
  if (existing) return existing;
  const source = target.buildClassicalNahuatlOrdinaryNncSourceFrame?.({stem: projection.stem, sourceClass: "zero"});
  if (!target.isClassicalNahuatlOrdinaryNncSourceFrame?.(source)
    || source.authorizationStatus !== "authorized") return source;
  const parent = deepFreeze({
    kind: "classical-nahuatl-lexicalized-present-nnc-source-parent",
    canonicalResult: result, canonicalSourceFrame: result.sourceFrame,
    canonicalOperationFrame: result.operationFrame,
    typedSlotFrame: result.canonicalResult.nncSlotFrame, citationProjection: projection,
    lexicalization: "sun", contextualReadings: ["Sun-god", "spouse", "sun-designs", "world-age"],
    ordinaryPresentAgentiveStateRestrictionChanged: false,
    savedStateCapability: "deliberately-unsupported",
    callerSuppliedAuthorityAccepted: false, surfaceStringAuthority: false,
  });
  LEXICALIZED_PRESENT_NNC_SOURCES.set(result, source);
  LEXICALIZED_PRESENT_NNC_PARENTS.set(source, parent);
  return source;
}

// §36.8 attests this priest's restricted stem as an embed. The starred
// tli citation is an embed class analysis, not a new standalone noun Source.
function captureFutureAgentiveRestrictedEmbed(result, target) {
  if (target.isClassicalNahuatlDeverbalNncGrammarFrame?.(result) !== true
    || result.operationFrame?.nominalizationKind !== "future-agentive"
    || result.sourceFrame?.sourceCapturedFromExactVncResult !== true
    || result.sourceFrame.sourceStem !== "maca"
    || result.sourceFrame.verbClass !== "A"
    || result.sourceFrame.sourceObjectPattern !== "human-and-nonhuman"
    || result.operationFrame.targetStems.restrictedUse !== "tla-maca-z") return null;
  const existing = FUTURE_RESTRICTED_EMBED_RECEIPTS.get(result);
  if (existing) return existing;
  const receipt = deepFreeze({
    kind: "classical-nahuatl-future-agentive-restricted-embed-receipt",
    authorizationStatus: "authorized", canonicalResult: result,
    canonicalSourceFrame: result.sourceFrame,
    canonicalOperationFrame: result.operationFrame,
    typedSlotFrame: result.canonicalResult.nncSlotFrame,
    stem: result.operationFrame.targetStems.restrictedUse,
    nounClass: "tli", sourceClass: "tli-1", lexicalization: "offering-priest",
    allowedConstructions: ["compound-nnc", "affective-nnc"],
    standaloneSourceAuthorized: false,
    savedStateCapability: "deliberately-unsupported",
    callerSuppliedAuthorityAccepted: false, surfaceStringAuthority: false,
  });
  FUTURE_RESTRICTED_EMBED_RECEIPTS.set(result, receipt);
  ISSUED_FUTURE_RESTRICTED_EMBEDS.add(receipt);
  return receipt;
}

function isInstrumentiveCitationCapture(frame, target) {
  return ISSUED_INSTRUMENTIVE_CITATION_CAPTURES.has(frame)
    && frame?.authorizationStatus === "authorized"
    && isClassicalNahuatlPredicateNncRestrictedUseCitationProjection(frame.citationProjection, target)
    && frame.citationProjection.canonicalResultFrame === frame.canonicalNncResult;
}

function buildInstrumentiveCitationOperation(request, target) {
  const capture = captureInstrumentiveCitation(request.canonicalNncResult, target);
  if (!isInstrumentiveCitationCapture(capture, target)) return {
    sourceFrame: null, operationFrame: null, blockReason: capture.blockReason,
  };
  if (request.canonicalCitationProjection
    && request.canonicalCitationProjection !== capture.citationProjection) return {
    sourceFrame: capture.canonicalSourceFrame, operationFrame: null,
    blockReason: "36.6-exact-citation-projection-required",
  };
  const stem = capture.citationProjection.stem.replace(/ya$/u, "yā");
  return { sourceFrame: capture.canonicalSourceFrame, blockReason: "",
    operationFrame: deepFreeze({
      kind: "classical-nahuatl-deverbal-nnc-operation-frame", version: VERSION,
      authorizationStatus: "authorized", operationId: "predicate-citation:instrumentive",
      constructionKind: "predicate-citation", nominalizationKind: "instrumentive-citation",
      predicateCitationBridgeFrame: capture,
      targetStems: { restrictedUse: stem, generalUse: "" },
      nounClass: "tl", nounSubclass: "tl-1-b", nncFamily: "instrumentive-citation",
      connectorProfile: "derived-tl", allowedStates: ["absolutive"],
      defaultState: "absolutive", fixedTargetSubject: "3common",
      fixedTargetAnimacy: "nonanimate", defaultAnimacy: "nonanimate",
      possessorFixedBySourceSubject: false, transformedPossessor: "",
      appliedSemanticRules: ["36.6-note-2-attested-absolutive-imperfect-yā", "ordinary-tl-1-b-nominal-number"],
      appliedAuthorizationIds: ["lexical-exception:absolutive-instrumentive-citation"],
      formulaStringAuthority: false, surfaceStringAuthority: false,
    }),
  };
}

function buildAdverbialNominalPredicateSource(request = {}, target = globalThis) {
  const allowed = new Set(["sourceStem", "verbClass", "sourceValence", "nominalizationKind", "sourceInitialISelection", "possessor"]);
  const kind = normalizeKey(request.nominalizationKind);
  const stem = normalizeStem(request.sourceStem);
  const verbClass = normalizeToken(request.verbClass).toUpperCase();
  const possessor = normalizeSubject(request.possessor);
  const initialI = normalizeKey(request.sourceInitialISelection);
  const block = blockReason => deepFreeze({kind:"classical-nahuatl-adverbial-nominal-predicate-source-frame",
    version:VERSION,authorizationStatus:"blocked",blockReason});
  if (Object.keys(request).some(key => !allowed.has(key)) || !stem
    || !["A", "B", "C", "D"].includes(verbClass)
    || request.sourceValence !== "intransitive"
    || !["preterit-agentive", "active-action"].includes(kind)
    || kind === "active-action" && (!possessor || /^i/u.test(stem) && !["real", "supportive"].includes(initialI))
    || kind === "preterit-agentive" && (request.possessor || initialI)) {
    return block("complete-primitive-adverbial-nominal-predicate-source-required");
  }
  const classRule = target.buildClassicalNahuatlVerbstemClassRuleFrame?.(stem,
    {verbClass, valence:"intransitive"});
  const perfective = normalizeStem(classRule?.analyzedPerfectiveStem || classRule?.perfectiveStem);
  if (classRule?.authorizationStatus !== "authorized" || classRule.classId !== verbClass || !perfective) {
    return block("canonical-adverbial-nominal-predicate-class-analysis-required");
  }
  const sourceStage = kind === "preterit-agentive" ? "preterit-predicate" : "distant-past-predicate";
  const ordinarySource = buildSourceFrame({source:{sourceStage,sourceStem:perfective,
    verbClass,sourceVoice:"active",sourceValence:"intransitive",sourceObjectPattern:"none"}}, sourceStage);
  if (ordinarySource.authorizationStatus !== "authorized") return block(ordinarySource.blockReason);
  // The core has no finite subject. In the possessive action family the
  // supplied possessor identifies the source actor (36.11); it never supplies
  // the independent adverbial subject of 44.1.
  const core = deepFreeze({...ordinarySource,primitiveSourceKind:"adverbial-nominal-predicate-core",
    sourceSubject:kind === "active-action" ? possessor : "",
    sourceInitialISelection:initialI,canonicalVerbstemClassRuleFrame:classRule,
    finiteSubjectAsserted:false,canonicalVncResult:null});
  ISSUED_SOURCE_FRAMES.add(core);
  ISSUED_ADVERBIAL_NOMINAL_CORES.add(core);
  const built = buildPredicateNominalizationOperation({nominalizationKind:kind,
    state:kind === "active-action" ? "possessive" : "absolutive",source:core}, core, target);
  if (!built.operationFrame || built.blockReason) return block(built.blockReason || "canonical-adverbial-nominal-predicate-operation-required");
  const predicateStem = built.operationFrame.targetStems.generalUse;
  const frame = deepFreeze({kind:"classical-nahuatl-adverbial-nominal-predicate-source-frame",
    version:VERSION,authorizationStatus:"authorized",blockReason:"",constructionKind:"predicate-nominalization",
    nominalizationKind:kind,sourceFrame:core,operationFrame:built.operationFrame,predicateStem,
    possessor:kind === "active-action" ? possessor : "",sourceInitialISelection:initialI,
    canonicalVerbstemClassRuleFrame:classRule,finiteSubjectAsserted:false,ordinaryNncResult:null,
    callerSuppliedAuthorityAccepted:false,formulaStringAuthority:false,surfaceStringAuthority:false});
  ISSUED_ADVERBIAL_NOMINAL_PREDICATES.add(frame);
  return frame;
}

function isAdverbialNominalPredicateSource(frame = null) {
  return Boolean(frame && ISSUED_ADVERBIAL_NOMINAL_PREDICATES.has(frame)
    && frame.authorizationStatus === "authorized"
    && ISSUED_ADVERBIAL_NOMINAL_CORES.has(frame.sourceFrame)
    && frame.operationFrame.sourceStage === frame.sourceFrame.sourceStage
    && frame.operationFrame.sourceVoice === frame.sourceFrame.sourceVoice
    && frame.predicateStem === frame.operationFrame.targetStems.generalUse
    && frame.finiteSubjectAsserted === false && frame.ordinaryNncResult === null);
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
    "instrumentive-full": "customary-present-predicate",
    instrumentive: normalizeKey(request.state || "absolutive") === "possessive"
      ? "imperfect-predicate"
      : "customary-present-predicate",
    "present-agentive": "present-predicate",
    "future-agentive": "future-predicate",
    "passive-action": "distant-past-predicate",
    "active-action": "distant-past-predicate",
  };
  let instrumentiveSourcePairFrame = null;
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
  if (request.canonicalVncResult) {
    const preteritNominalization = [
      "preterit-agentive",
      "preterit-patientive",
    ].includes(nominalizationKind);
    const captureFrame = preteritNominalization
      ? capturePreteritVncResult(request.canonicalVncResult, target,
          nominalizationKind === "preterit-agentive"
            ? normalizeKey(request.preteritSourceAnalysis || "ordinary") : "ordinary")
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
  // Andrews explicitly retains iztāc although its verbal Source is izta-ya.
  // This nominal spelling never lengthens the captured verb or its root rule.
  const retainedWhiteSpellingAvailable = nominalizationKind === "preterit-agentive"
    && normalizeKey(request.preteritSourceAnalysis || "ordinary") === "obsolete-root"
    && isClassicalNahuatlPreteritVncNominalizationCaptureFrame(sourceFrame.preteritVncCaptureFrame)
    && sourceFrame.preteritVncCaptureFrame.obsoleteRootPreteritAnalysis?.originalSourceStem === "izta-ya"
    && sourceFrame.sourceVoice === "active"
    && sourceFrame.sourceValence === "intransitive"
    && sourceFrame.sourceObjectPattern === "none";
  const nominalSpellingOptions = retainedWhiteSpellingAvailable
    ? ["productive", "retained-lexical"] : ["productive"];
  const nominalSpelling = normalizeKey(request.nominalSpelling || "productive");
  if (!nominalSpellingOptions.includes(nominalSpelling)) return {
    sourceFrame, operationFrame: null, blockReason: "nominal-spelling-not-source-licensed",
  };
  const nominalSpellingFrame = nominalSpelling === "retained-lexical" ? deepFreeze({
    kind: "classical-nahuatl-retained-nominal-spelling-frame", version: VERSION,
    authorizationStatus: "authorized", nominalSpelling,
    canonicalSourceCapture: sourceFrame.preteritVncCaptureFrame,
    originalSourceStem: "izta-ya", productiveNominalRoot: "izta",
    retainedNominalRoot: "iztā", verbalSourceUnchanged: true,
    sourceWarrant: "Andrews preface; §40.9", lexicalSpellingOnly: true,
    formulaStringAuthority: false, surfaceStringAuthority: false,
  }) : null;
  const subject = normalizeSubject(request.subject || sourceFrame.sourceSubject || "3sg");
  const activatedObjectPerson = normalizeSubject(
    request.activatedObjectPerson
  );
  const activationRequested = Boolean(normalizeToken(request.activatedObjectPerson));
  const incorporatedComplementActivationFrame = sourceFrame
    .predicateNominalizationVncCaptureFrame?.incorporatedComplementActivationFrame;
  const exactInternalObjectRequests = activationRequested && incorporatedComplementActivationFrame
    ? incorporatedComplementActivationFrame.sourceObjectRequests
    : sourceFrame.preteritVncCaptureFrame
    ?.sourceObjectRequests
    || sourceFrame.predicateNominalizationVncCaptureFrame?.sourceObjectRequests
    || [];
  // Availability is computed from the same privately captured ancestry as
  // execution, including a patientive complement's latent directive object.
  // Do not insert those latent prefixes into an unactivated predicate.
  const availableActivationRequests = incorporatedComplementActivationFrame
    ? incorporatedComplementActivationFrame.sourceObjectRequests
    : exactInternalObjectRequests;
  const availableActivationCandidates = availableActivationRequests.filter(object =>
    ["nonspecific-human", "nonspecific-nonhuman"].includes(object.objectKind));
  const availableActivationChoices = availableActivationCandidates.length > 1
    ? availableActivationCandidates.filter(object => object.governor === "directive")
    : availableActivationCandidates;
  const supplementaryObjectActivationAvailable = ![
    "customary-patientive", "instrumentive", "instrumentive-full",
  ].includes(nominalizationKind) && (availableActivationRequests.length
    ? availableActivationChoices.length === 1
    : ["nonspecific-human", "nonspecific-nonhuman"].includes(sourceFrame.sourceObjectPattern));
  const activationCandidates = exactInternalObjectRequests.filter(object =>
    ["nonspecific-human", "nonspecific-nonhuman"].includes(object.objectKind)
  );
  // In a multiple-object predicate the directive projective object moves
  // outside the nounstem; applicative beneficiaries remain incorporated.
  const directiveCandidates = activationCandidates.filter(object =>
    object.governor === "directive");
  const activationChoices = activationCandidates.length > 1
    ? directiveCandidates : activationCandidates;
  const activatedInternalObjectRequest = activationRequested
    && activationChoices.length === 1 ? activationChoices[0] : null;
  const retainedInternalObjectRequests = exactInternalObjectRequests.filter(
    object => object !== activatedInternalObjectRequest
  );
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
      || ["customary-patientive", "instrumentive", "instrumentive-full"].includes(
        nominalizationKind
      )
      || (exactInternalObjectRequests.length
        ? activationChoices.length !== 1
        : !["nonspecific-human", "nonspecific-nonhuman"].includes(
          sourceFrame.sourceObjectPattern
        ))
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
  const capturedSourceProjection = (sourceFrame.preteritVncCaptureFrame
    || sourceFrame.predicateNominalizationVncCaptureFrame)?.continuationProjection;
  const reflexiveShuntline = capturedSourceProjection?.sourceValence === "shuntline-reflexive" || [
    "customary-patientive",
    "instrumentive",
    "instrumentive-full",
    "passive-action",
    "active-action",
  ].includes(nominalizationKind);
  const sourceNucleus = sourceFrame.canonicalNucleusResult
    || sourceFrame.canonicalVncResult;
  const sourceMachinery = sourceNucleus?.selectedMachineryFrame;
  const sourceObjectPositions = (sourceMachinery?.multipleObjectClusterFrame
    || sourceMachinery?.targetObjectClusterFrame
    || sourceNucleus?.operationFrame?.operationFacts
      ?.completedObjectClusterFrame)?.positions || [];
  const orderedRetainedObjects = sourceObjectPositions.length
    ? sourceObjectPositions.map(position => retainedInternalObjectRequests.find(
      object => object.objectId === position.objectId)).filter(Boolean)
    : retainedInternalObjectRequests;
  const nominalPredicateStem = activationRequested && incorporatedComplementActivationFrame
    ? incorporatedComplementActivationFrame.activatedPredicateStem
    : nominalSpellingFrame ? nominalSpellingFrame.retainedNominalRoot : sourceFrame.sourceStem;
  const nominalObjectPrefix = (pattern, followingObjects = []) => {
    if (pattern !== "reflexive" || reflexiveShuntline) {
      return internalObjectPrefix(pattern, subject, reflexiveShuntline);
    }
    // Reanalysis retains the canonical reflexive dyad and its actual contact.
    // A following object still intervenes before a vowel-initial predicate.
    const followingStem = joinMorphs([
      ...followingObjects.map(object => internalObjectPrefix(object.objectKind, subject, false)),
      nominalPredicateStem,
    ]);
    const initialVowelKind = followingObjects.length ? ""
      : getVncSourceInitialIKind(sourceNucleus);
    const reflexive = target.buildClassicalNahuatlTransitiveVncObjectFrame?.(
      followingStem, {
        subject, mood: "indicative", tense: "present",
        objectKind: "mainline-reflexive", initialVowelKind,
      }
    )?.objectFrame;
    return reflexive
      ? joinMorphs([reflexive.va1, reflexive.va2])
      : internalObjectPrefix(pattern, subject, false);
  };
  const objectPrefix = exactInternalObjectRequests.length
    ? joinMorphs(orderedRetainedObjects.map((object, index) =>
      nominalObjectPrefix(object.objectKind, orderedRetainedObjects.slice(index + 1))
    ))
    : activationRequested ? "" : nominalObjectPrefix(sourceFrame.sourceObjectPattern);
  const sourceStemWithObjects = joinMorphs([objectPrefix, nominalPredicateStem]);
  const supportiveInitialIBoundaryFrame = ["instrumentive", "instrumentive-full", "passive-action"].includes(nominalizationKind)
    ? applySupportiveInitialIActionBoundary({
        stem: nominalPredicateStem, objectPrefix,
        sourceInitialIKind: getVncSourceInitialIKind(sourceNucleus),
        requestedVariant: request.supportiveInitialIVariant,
        nominalBoundary: nominalizationKind === "passive-action"
          && sourceFrame.sourceCapturedFromExactVncResult === true,
      }) : null;
  if (supportiveInitialIBoundaryFrame
    && (supportiveInitialIBoundaryFrame.authorizationStatus !== "authorized"
      || (request.supportiveInitialIVariant && !supportiveInitialIBoundaryFrame.options.includes(
        normalizeKey(request.supportiveInitialIVariant))))) {
    return { sourceFrame, operationFrame: null,
      blockReason: "36.6-supportive-initial-i-variant-not-licensed" };
  }
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
  if (supportiveInitialIBoundaryFrame) selectedSourceStem = joinMorphs([
    objectPrefix, supportiveInitialIBoundaryFrame.stem,
  ]);
  const oldPersonFamily = nominalizationKind === "preterit-agentive"
    ? lexicalFrame.oldPersonFamily
    : "";
  if (OLD_PERSON_FAMILIES.includes(oldPersonFamily)) {
    const oldPersonStem = applyOldPersonPerfective(
      lexicalFrame.lexicalFactStem,
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
  let possessivePredicateContactFrame = null;
  let humanActionReferenceFrame = null;
  let passiveActionFrame = null;
  let activeActionFoundationFrame = null;
  let generalUseActiveActionFrame = null;
  let restrictedUseActiveActionFrame = null;
  let actionCharacteristicFrame = null;
  let secondaryPossessiveStemFrame = null;
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
        lexicalFrame.lexicalFactStem,
        oldPersonFamily,
        "3pl"
      )
      : nominalSpellingFrame ? nominalSpellingFrame.retainedNominalRoot : sourceFrame.sourceStem;
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
      // §35.6 Note 3 / §15.1.5: the nonspecific inner possessor is now
      // inside the secondary stem. A later NNC's subject and possessor
      // remain outer slots; no citation operation demotes them again.
      secondaryPossessiveStemFrame = deepFreeze({
        kind: "classical-nahuatl-secondary-possessive-agentive-stem-frame",
        version: VERSION,
        authorizationStatus: "authorized",
        sourceFrame,
        lexicalAuthorizationFrame: lexicalFrame,
        stem: generalUse,
        sourceRank: "possessive-state-predicate",
        targetRank: "secondary-general-use-nounstem",
        innerPossessor: {
          person: "nonspecific-human", underlyingPrefix: "tē",
          realizedPrefix: "ti", role: "retained-inner-possessor",
        },
        embeddedPreterit: { stem: sourceFrame.sourceStem, tenseEnding: "0" },
        matrix: { stem: "cā", nounClass: "tl", subclass: "tl-1-a" },
        restrictedUseCounterpart: null,
        grammarAuthority: false,
        callerSuppliedAuthorityAccepted: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
      });
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
    generalUse = restrictedUse;
    nounClass = "tl";
    connectorProfile = "fully-nominal-tl";
    allowedStates = ["absolutive", "possessive"];
    possessiveSingularConnector = "uh";
    rules.push("36.3-fully-nominal-customary-agentive");
  } else if (nominalizationKind === "instrumentive-full") {
    if (!["impersonal", "nonactive"].includes(sourceFrame.sourceVoice)) {
      return { sourceFrame, operationFrame: null,
        blockReason: "full-instrumentive-requires-customary-impersonal-source" };
    }
    // §36.6 Note 2: a fully nominal ni stem has the ordinary tl 1-A
    // paradigm. Its outer participant and possessor are new nominal choices.
    restrictedUse = joinMorphs([selectedSourceStem, "ni"]);
    generalUse = restrictedUse;
    nounClass = "tl";
    connectorProfile = "fully-nominal-tl";
    possessiveSingularConnector = "uh";
    allowedStates = ["absolutive", "possessive"];
    rules.push("36.6-note-2-fully-nominal-instrumentive");
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
    // §36.6 explicitly assigns the imperfect-active instrumentive to tl
    // Class 1-B; Note 2's -ya-tl citation is not a tli-class formation.
    nounClass = "tl";
    connectorProfile = state === "absolutive"
      ? "instrumentive-absolutive"
      : "derived-tl";
    // A complete paradigm has two independently authenticated Sources. State
    // selects its own capture above; an impersonal Source alone stays restricted.
    allowedStates = instrumentiveSourcePairFrame
      ? ["absolutive", "possessive"]
      : [state];
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
      supportiveInitialIBoundaryFrame,
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
    const actionSourceBlock = actionNominalizationSourceBlockReason(nominalizationKind, sourceFrame);
    if (actionSourceBlock) return { sourceFrame, operationFrame: null, blockReason: actionSourceBlock };
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
    if (!passive && /^i/u.test(actionCore)
      && (getVncSourceInitialIKind(sourceNucleus) === "supportive"
          && sourceFrame.sourceCapturedFromExactVncResult === true
        || ISSUED_ADVERBIAL_NOMINAL_CORES.has(sourceFrame)
          && sourceFrame.sourceInitialISelection === "supportive")) {
      // §36.11 ī-Ø(lpi-ca): the supportive vowel belongs to the VNC
      // environment; nominal state material supports the consonantal stem.
      actionCore = actionCore.replace(/^i/u, "");
      rules.push("36.11-active-action-supportive-initial-i-deletion");
    }
    const humanActionMetaphor = !passive && request.actionReference === "human-metaphor";
    if (humanActionMetaphor && (normalizeKey(request.state) !== "possessive"
      || normalizeKey(request.animacy) !== "animate"
      || normalizeKey(request.humanness || "human") !== "human"
      || !normalizeSubject(request.subject) || request.subject === "3common")) {
      return { sourceFrame, operationFrame: null,
        blockReason: "36.11-human-metaphor-requires-possessive-human-reference" };
    }
    const protectedHumanPlural = humanActionMetaphor && request.subject.endsWith("pl");
    generalUse = joinMorphs([actionCore, protectedHumanPlural ? "cā" : "ca"]);
    restrictedUse = joinMorphs([actionCore, "cā", "yō"]);
    if (humanActionMetaphor) humanActionReferenceFrame = deepFreeze({
      kind: "classical-nahuatl-active-action-human-reference-frame",
      authorizationStatus: "authorized", referenceKind: "human-metaphor",
      canonicalVncResult: sourceFrame.canonicalVncResult,
      importedSubject: normalizeSubject(request.subject),
      transformedPossessor: sourceSubjectToPossessor(sourceFrame.sourceSubject),
      sourceSubjectUnchanged: true, protectedDistantPastMorph: protectedHumanPlural,
      grammarFromContextualReference: true, exampleStemMembershipRequired: false,
      formulaStringAuthority: false, surfaceStringAuthority: false,
    });
    nounClass = "tl";
    connectorProfile = "derived-tl";
    possessiveSingularConnector = "0";
    allowedStates = ["absolutive", "possessive"];
    defaultAnimacy = "nonanimate";
    transformedPossessor = sourceSubjectToPossessor(sourceFrame.sourceSubject);
    fixedTargetSubject = humanActionMetaphor ? normalizeSubject(request.subject) : "3common";
    fixedTargetAnimacy = humanActionMetaphor ? "animate" : "nonanimate";
    possessorFixedBySourceSubject = true;
    if (passive && /^i/u.test(selectedSourceStem)
      && getVncSourceInitialIKind(sourceNucleus) === "supportive"
      && sourceFrame.sourceCapturedFromExactVncResult === true) {
      possessivePredicateContactFrame = deepFreeze({
        kind: "classical-nahuatl-action-predicate-initial-i-contact-frame",
        authorizationStatus: "authorized",
        canonicalVncResult: sourceFrame.canonicalVncResult,
        retainedPredicateInitialI: true,
        sourceInitialIKind: "supportive",
        possessorContactsUnderlyingConsonantalBase: true,
        ordinaryNounSupportiveIDeletionApplied: false,
        formulaStringAuthority: false, surfaceStringAuthority: false,
      });
    }
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
      generalUseActiveActionFrame = deepFreeze({ ...buildGeneralUseActiveActionFrame({
        sourceFrame,
        selectedState: normalizeKey(request.state || "absolutive"),
        generalUse,
        transformedPossessor,
        nominalizedActionStemRule,
      }), targetSubject: fixedTargetSubject, targetAnimacy: fixedTargetAnimacy,
        commonNumberOnly: !humanActionMetaphor,
        humanActionReferenceFrame,
        finalDistantPastMorph: protectedHumanPlural ? "cā" : "ca",
        finalDistantPastMorphIsLastConstituent: /(?:^|-)(?:ca|cā)$/u.test(generalUse),
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

  // §14.1 citation has no following compound/vocative boundary. Retain the
  // already-derived base before §36.3's locally licensed loss of real ni-i;
  // never recover it later from an arbitrary n-final written spelling.
  const citationRestrictedUse = restrictedUse;
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
  const possessiveSingularFinalILossLicensed = Boolean(
    nominalizationKind === "customary-agentive-reanalysis"
    && lexicalFrame.rarePossessiveReanalysis
    && normalizeKey(request.state || "absolutive") === "possessive"
    && !pluralSubject
  );
  if (finalIRealization === "drop") {
    const ordinaryPossessiveLoss = boundaryContext === "possessive-singular"
      && possessiveSingularFinalILossLicensed;
    const followingBoundaryLoss = lexicalFrame.finalIRealizations.includes("drop")
      && ["compound", "vocative"].includes(boundaryContext);
    if (
      !(ordinaryPossessiveLoss || followingBoundaryLoss)
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

  const explicitNumberFacts = LEXICAL_SOURCE_FACTS[lexicalFrame.lexicalFactStem]
    ?.preteritAgentiveNumberOptions;
  const capturedPreteritNumberRepertory = !explicitNumberFacts
    && ["preterit-agentive", "preterit-patientive"].includes(nominalizationKind)
    ? getCapturedPreteritNumberRepertory(sourceFrame, target) : null;
  const preteritAgentiveNumberOptions = sourceFrame.verbClass === "A"
    ? ["c"]
    : explicitNumberFacts || (capturedPreteritNumberRepertory
      ? ["qui", "silent"] : lexicalFrame.preteritAgentiveNumberOptions || ["qui"]);
  const requestedNumberConnector = normalizeKey(
    request.numberConnector || source.singularConnectorChoice
  );
  const fullNominalNumberOptions = nominalizationKind === "customary-patientive"
    ? ["silent"] : ["silent", "tl"];
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
  if (connectorProfile === "fully-nominal-tl"
    && requestedNumberConnector
    && !fullNominalNumberOptions.includes(requestedNumberConnector)) {
    return { sourceFrame, operationFrame: null,
      blockReason: "36.3-full-nominal-number-variant-not-licensed" };
  }
  const singularConnectorChoice = connectorProfile === "preterit-agentive"
    ? requestedNumberConnector || preteritAgentiveNumberOptions[0]
    : requestedNumberConnector || (nominalizationKind === "customary-patientive"
      ? "silent" : "qui");
  const preteritAgentiveBoundarySpelling = normalizeKey(
    request.preteritAgentiveBoundarySpelling || "regular"
  );
  const exposedKwAgentiveBoundary = nominalizationKind === "preterit-agentive"
    && connectorProfile === "preterit-agentive"
    && normalizeKey(request.state || "absolutive") === "absolutive"
    && /uc-0$/u.test(restrictedUse)
    && (pluralSubject || singularConnectorChoice === "qui");
  const boundarySpellingOptions = exposedKwAgentiveBoundary
    ? ["regular", "delabialized"] : ["regular"];
  if (!boundarySpellingOptions.includes(preteritAgentiveBoundarySpelling)) {
    return { sourceFrame, operationFrame: null,
      blockReason: "agentive-delabialization-boundary-required" };
  }
  let boundaryWritingFrame = null;
  if (preteritAgentiveBoundarySpelling === "delabialized") {
    const phonologyApplication = target.executeClassicalGrammarApplicationRequest?.({
      operationId: "phonology:consonant-shift",
      args: [{ sourceConsonant: "kw", position: "exposed", grammaticalConstruction: true }],
    });
    if (phonologyApplication?.authorizationStatus !== "authorized"
      || phonologyApplication.canonicalResult?.selectedRuleId !== "cn-l2-213-kw-exposed-k"
      || phonologyApplication.canonicalResult?.outputSpelling !== "c") {
      return { sourceFrame, operationFrame: null,
        blockReason: "agentive-delabialization-owner-required" };
    }
    const underlyingRestrictedUse = restrictedUse;
    // This changes the exposed consonant's writing at the number boundary;
    // the captured perfective and its general-use stem remain exact.
    restrictedUse = restrictedUse.replace(/uc-0$/u,
      `${phonologyApplication.canonicalResult.outputSpelling}-0`);
    boundaryWritingFrame = deepFreeze({
      kind: "classical-nahuatl-agentive-boundary-writing-frame",
      authorizationStatus: "authorized", sourceFrame,
      underlyingRestrictedUse, realizedRestrictedUse: restrictedUse,
      followingConsonant: "k", phonologyApplication,
      selectedSpelling: preteritAgentiveBoundarySpelling,
      changesSourceAuthority: false,
    });
    rules.push("2.13.4-optional-exposed-kw-delabialization");
  }
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
  const activatedCanonicalObjectRequest = activationRequested
    ? target.getClassicalNahuatlVncApplicationSourceObjectRequests?.({
      ...(sourceNucleus?.normalizedRequest || {}),
      sourceStem: sourceFrame.lexicalAuthorizationFrame?.lexicalFactStem
        || sourceFrame.sourceStem,
      sourceObjectRequests: [{
        ...(activatedInternalObjectRequest || {}),
        objectKind: "specific-projective", objectPerson: activatedObjectPerson,
        governor: activatedInternalObjectRequest?.governor || "directive",
      }],
    }, "specific-projective")?.[0] || null
    : null;
  const activationLicenseFrame = activationRequested
    ? deepFreeze({
      kind: "classical-nahuatl-agentive-object-activation-license-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      sourceObjectPattern: sourceFrame.sourceObjectPattern,
      incorporatedComplementActivationFrame:
        incorporatedComplementActivationFrame || null,
      activatedCanonicalObjectRequest,
      silentSpecificObject: activatedCanonicalObjectRequest?.silentSpecificObject === true,
      sourceCarrier: (activatedInternalObjectRequest?.objectKind
        || sourceFrame.sourceObjectPattern) === "nonspecific-human"
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
    sourceStem: OLD_PERSON_FAMILIES.includes(oldPersonFamily)
      ? lexicalFrame.lexicalFactStem : sourceFrame.sourceStem,
    subject,
    selectedPerfectiveStem: selectedSourceStem,
  });
  const requestedState = normalizeKey(request.state || "absolutive");
  const requestedPossessor = normalizeSubject(request.possessor)
    || normalizeKey(request.possessor);
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
      // First-level possession blurs tē to ti; secondary possession keeps
      // that ti inside its stem and realizes a new outer possessor normally.
      yauhOuterPossessorShift: nominalizationKind === "preterit-agentive"
        && preteritAgentiveVariant === "ordinary"
        && lexicalFrame.yauhTiOwner === true
        && ["tē", "nonspecific-human"].includes(normalizeKey(request.possessor)),
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
      customaryAgentivePossessiveSupplementFrame: null,
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
      ...(!["preterit-agentive", "preterit-patientive"].includes(nominalizationKind)
        ? { citationRestrictedUse } : {}),
    },
    nounClass,
    nncFamily: nominalizationKind,
    connectorProfile,
    singularConnectorChoice,
    capturedPreteritNumberRepertory,
    preteritAgentiveBoundarySpelling,
    boundarySpellingOptions,
    boundaryWritingFrame,
    singularConnectorOptions: connectorProfile === "fully-nominal-tl"
      ? fullNominalNumberOptions : preteritAgentiveNumberOptions,
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
    customaryAgentivePossessiveSupplementFrame: null,
    customaryPatientiveFrame,
    instrumentiveSourcePairFrame,
    instrumentiveParticipantFrame,
    instrumentiveRealizationFrame,
    supportiveInitialIBoundaryFrame,
    presentAgentiveFrame,
    futureAgentiveFrame,
    actionNncTaxonomyFrame,
    possessivePredicateContactFrame,
    humanActionReferenceFrame,
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
    supplementaryObjectActivationAvailable,
    activatedInternalObjectRequest,
    retainedInternalObjectRequests,
    activationLicenseFrame,
    lexicalFamily: oldPersonFamily,
    preteritAgentiveVariant,
    preteritSourceAnalysis: normalizeKey(request.preteritSourceAnalysis || "ordinary"),
    nominalSpelling, nominalSpellingOptions, nominalSpellingFrame,
    preteritSourceAnalysisOptions: nominalizationKind === "preterit-agentive"
      && request.canonicalVncResult
      && capturePreteritVncResult(request.canonicalVncResult, target, "obsolete-root")
        .authorizationStatus === "authorized"
      ? ["ordinary", "obsolete-root"] : ["ordinary"],
    boundaryVariant,
    boundaryContext,
    boundMaterialOnly: boundaryVariant === "drop-real-final-i"
      && ["compound", "vocative"].includes(boundaryContext),
    possessiveSingularFinalILossLicensed,
    affinityApplied: affinitySelected,
    affinityFrame,
    possessiveAgentiveFrame,
    secondaryPossessiveStemFrame,
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
    "tzi-to-chi": [/tzi$/u, "chi"],
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

function deriveProductiveZActionCore(sourceStem = "", lexicalFrame = null, requestedVariant = "") {
  const requested = normalizeKey(requestedVariant);
  const selection = requested
    ? selectOwnedActionStemRule(lexicalFrame, sourceStem, "z", requested)
    : null;
  if (selection?.authorizationStatus === "blocked") return selection;
  const realized = requested && requested !== "none"
    ? applyActionStemRule(sourceStem, selection.stemRule)
    : { authorized: true, stem: sourceStem };
  if (!realized.authorized) return {
    authorizationStatus: "blocked", blockReason: "z-action-stem-variant-environment-not-met",
  };
  const derived = deriveBaseProductiveZActionCore(realized.stem, lexicalFrame);
  const options = lexicalFrame?.actionStemVariants || ["none"];
  return { ...derived,
    rule: requested && requested !== "none" ? requested : derived.rule,
    options, choiceRequired: options.length > 1,
  };
}

function deriveBaseProductiveZActionCore(
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
  nominalBoundary = false,
} = {}) {
  const source = normalizeStem(stem);
  const lexicalSource = normalizeStem(lexicalSourceStem);
  const supportive = normalizeKey(sourceInitialIKind) === "supportive";
  const beginsWithI = /^i/u.test(source);
  const requested = normalizeKey(requestedVariant);
  if (nominalBoundary && supportive && beginsWithI && !objectPrefix) {
    // §14.2.7 applies after the predicate becomes a nounstem. §36.10
    // explicitly retains its supportive i; §37.6 uses the absent variant.
    const options = ["supportive-i-retain", "supportive-i-drop"];
    const selected = requested || options[0];
    const authorized = options.includes(selected);
    return {
      authorizationStatus: authorized ? "authorized" : "blocked",
      blockReason: authorized ? "" : "nominal-supportive-i-choice-not-recognized",
      stem: authorized ? selected === "supportive-i-drop"
        ? source.replace(/^i/u, "") : source : "",
      rule: "14.2.7-passive-action-nounstem-supportive-i-variant",
      selectedVariant: selected,
      options,
      choiceRequired: true,
    };
  }
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
    ? deriveProductiveZActionCore(sourceFrame.sourceStem, lexicalFrame,
      ["supportive-i-drop", "supportive-i-retain"].includes(normalizeKey(request.actionStemVariant))
        ? "" : request.actionStemVariant)
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
  const latentReflexiveActionBoundaryFrame = actionKind === "active-action"
    ? actionCapture?.latentReflexiveActionBoundaryFrame || null : null;
  if (latentReflexiveActionBoundaryFrame) {
    const boundary = latentReflexiveActionBoundaryFrame;
    if (!actionCore.startsWith(`${boundary.predicateEmbedStem}-`)) {
      return { sourceFrame, operationFrame: null,
        blockReason: "action-latent-reflexive-embed-boundary-not-retained" };
    }
    actionCore = joinMorphs([boundary.nominalEmbedStem,
      actionCore.slice(boundary.predicateEmbedStem.length + 1)]);
  }
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
    latentReflexiveActionBoundaryFrame,
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
    possessorFixedBySourceSubject: actionKind === "active-action" && Boolean(sourceFrame.sourceSubject),
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
  { activeSourceStem = "", rootPlusYaDeletionApplied = false } = {}
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
    const originalRetainedStem = normalizeStem(targetStem);
    // §37.8 is a noun boundary: short i/o before retained patientive l
    // lengthens here, without changing the finite or reconstructed Source.
    // §38.1.1a separately documents the owner-derived root+ya deletion forms.
    const patientiveLBoundary = ["lō", "lō-hua", "lo-hua", "hua-lō"].includes(normalizedSuffix);
    const shortVowel = originalRetainedStem.match(/([io])(-?l)$/u)?.[1] || "";
    const lengtheningApplied = Boolean(patientiveLBoundary && shortVowel && !rootPlusYaDeletionApplied);
    const retainedStem = lengtheningApplied
      ? originalRetainedStem.replace(/([io])(-?l)$/u, (_, vowel, l) => `${vowel === "i" ? "ī" : "ō"}${l}`)
      : originalRetainedStem;
    const precedingVowel = (
      ["lō", "lō-hua", "lo-hua"].includes(normalizedSuffix)
        ? source.match(/([aāeēiīoō])-?l[oō](?:-?hua)?$/u)?.[1]
        : normalizedSuffix === "hua"
          ? source.match(/([aāeēiīoō])-?hua$/u)?.[1]
          : ""
    ) || "";
    const precedingVowelBehavior = lengtheningApplied
      ? `short-${shortVowel}-lengthened-before-patientive-l`
      : rootPlusYaDeletionApplied && shortVowel
        ? "root-plus-ya-patientive-short-vowel-preserved"
        : precedingVowelBehaviorOverride
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
      originalRetainedStem,
      patientiveVowelLengtheningApplied: lengtheningApplied,
      rootPlusYaPatientiveQuantityPreserved: rootPlusYaDeletionApplied,
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
  if (["lō-hua", "lo-hua"].includes(normalizedSuffix)
    && /l[oō]-?hua$/u.test(source)) {
    // §37.8 removes the vowel and hua from the typed nonactive suffix.
    // Quantity belongs to the captured Source; do not rewrite it to ō.
    return build({
      targetStem: source.replace(/l[oō]-?hua$/u, "l"),
      nounClass: "tli",
      removedMaterial: /lō-?hua$/u.test(source) ? "ō-hua" : "o-hua",
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
  // §20.5 lengthens this same suffix after deletion of base-final /w/.
  if (normalizedSuffix === "o-hua" && /[oō]-?hua$/u.test(source)) {
    return build({
      targetStem: source.replace(/[oō]-?hua$/u, ""),
      nounClass: "tli",
      removedMaterial: /ō-?hua$/u.test(source) ? "ō-hua" : "o-hua",
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
  const coreSource = sourceFrame?.patientiveCoreSourceFrame || null;
  const capture = sourceFrame?.passivePatientiveVncCaptureFrame || coreSource;
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
    capture.continuationProjection?.sourceStem || coreSource?.activeSourceStem
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
      !coreSource && capture.canonicalVncResult === sourceFrame.canonicalVncResult,
    canonicalPatientiveCoreSourceFrame:coreSource,
    exactCoreSourceIdentityPreserved:Boolean(coreSource),
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
      : hasImpersonalizedPassivePatientiveSource(impersonalCapture)
        ? "single-object-impersonalized-passive"
        : anomalous ? "single-object-anomalous-impersonal"
        : "single-object-impersonal",
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
  ownerhoodReading = "",
} = {}) {
  const coreSource = sourceFrame?.patientiveCoreSourceFrame || null;
  const capture = sourceFrame?.perfectivePatientiveVncCaptureFrame || coreSource;
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
    canonicalActivePreteritVncResult: capture.canonicalOwnerhoodNncResult
      ? null : capture.canonicalVncResult,
    canonicalOwnerhoodNncResult: capture.canonicalOwnerhoodNncResult || null,
    canonicalVncSourceAnalysisFrame:
      capture.canonicalVncSourceAnalysisFrame,
    canonicalVncTypedSlotFrame: capture.canonicalVncTypedSlotFrame,
    exactActivePreteritResultIdentityPreserved: !coreSource && !capture.canonicalOwnerhoodNncResult,
    canonicalPatientiveCoreSourceFrame: coreSource,
    exactCoreSourceIdentityPreserved: Boolean(coreSource),
    exactOwnerhoodNncResultIdentityPreserved: Boolean(capture.canonicalOwnerhoodNncResult
      && capture.ownerhoodPerfectiveSourceFrame?.canonicalOwnerhoodNncResult
        === capture.canonicalOwnerhoodNncResult),
    completeTypedSourceAnalysisPreserved:
      capture.completeTypedSourceAnalysisPreserved,
    lexicalSourceStem: capture.lexicalSourceStem,
    perfectivePredicateStem: capture.sourceStem,
    perfectiveFinalEdge: final,
    licensedPerfectiveFinalEdges: PERFECTIVE_PATIENTIVE_FINALS,
    perfectiveShapeLicensedAutomatically:
      PERFECTIVE_PATIENTIVE_FINALS.includes(final),
    selectedAnalogy,
    ownerhoodPerfectiveSourceFrame: capture.ownerhoodPerfectiveSourceFrame || null,
    selectedOwnerhoodReading: normalizeKey(ownerhoodReading
      || capture.ownerhoodPerfectiveSourceFrame?.automaticReading),
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

function getImperfectivePatientiveNounClassAnalyses(stem, target) {
  return ["tl-1-a", "tl-1-b", "tl-2-a", "tl-2-b-a", "tl-2-b-i", "tl-2-c"].flatMap(sourceClass => {
    const source = target.buildClassicalNahuatlOrdinaryNncSourceFrame?.({stem, sourceClass});
    if (target.isClassicalNahuatlOrdinaryNncSourceFrame?.(source) !== true
      || source.authorizationStatus !== "authorized") return [];
    const operation = target.buildClassicalNahuatlOrdinaryNncOperationFrame?.(source, {
      state: "possessive", subject: "3common", possessor: "3sg", humanness: "nonhuman",
    });
    const result = target.evaluateClassicalNahuatlOrdinaryNnc?.(source, operation);
    if (target.isClassicalNahuatlOrdinaryNncResult?.(result) !== true
      || result.authorizationStatus !== "authorized") return [];
    return [{sourceClass, canonicalSource: source, canonicalOperation: operation,
      canonicalResult: result, generalUseStem: result.typedSlotFrame.slots.predicate.stem,
      singularConnector: result.typedSlotFrame.slots.number.num1}];
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
  const coreSource = sourceFrame?.patientiveCoreSourceFrame || null;
  const capture = sourceFrame?.imperfectivePatientiveVncCaptureFrame || coreSource;
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
    exactActivePresentResultIdentityPreserved: !coreSource,
    canonicalPatientiveCoreSourceFrame: coreSource,
    exactCoreSourceIdentityPreserved: Boolean(coreSource),
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
  const coreSource = sourceFrame?.patientiveCoreSourceFrame || null;
  const capture = sourceFrame?.imperfectivePatientiveVncCaptureFrame || coreSource;
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
    exactActivePresentResultIdentityPreserved: !coreSource,
    canonicalPatientiveCoreSourceFrame:coreSource,
    exactCoreSourceIdentityPreserved:Boolean(coreSource),
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
  // §39.3 incorporates a classified nounstem into abundant ownerhood. A
  // primitive nounstem need not first be asserted of an invented referent.
  const classifiedSource = target.isClassicalNahuatlOrdinaryNncSourceFrame?.(result) === true
    && result.authorizationStatus === "authorized" ? result : null;
  const sourceUse = classifiedSource
    && !(classifiedSource.nounClass === "tl" && classifiedSource.restrictedUseOnly === true)
    ? buildOwnerhoodNounGeneralUse({sourceStem: classifiedSource.stem,
      nounClass: classifiedSource.nounClass, nounSubclass: classifiedSource.subclass}, target) : null;
  const classifiedProjection = sourceUse?.generalUseSourceStem ? deepFreeze({
    nncType: "classified-nounstem-source", canonicalSourceFrame: classifiedSource,
    canonicalResultFrame: null, canonicalOperationFrame: null, typedSlotFrame: null,
    sourceIdentityStem: classifiedSource.stem, predicateStem: sourceUse.generalUseSourceStem,
    sourceNounClass: classifiedSource.nounClass, sourceUseShape: classifiedSource.useShape,
    sourceSubclass: classifiedSource.subclass, canonicalNounGeneralUseFrame: sourceUse.nounGeneralUseFrame,
    sourceReferentialAnimacy: classifiedSource.referentialAnimacy,
    naturalPossessionPolicy: classifiedSource.naturalPossessionPolicy,
    naturalPossessionSemantics: classifiedSource.naturalPossessionSemantics,
    stateAvailability: classifiedSource.stateAvailability, allowedStateValues: classifiedSource.allowedStateValues,
    possessorCompatibility: classifiedSource.possessorCompatibility,
    sourceConstituentKinds: ["classified-nounstem"], sourceConstituents: [classifiedSource.stem],
    state: "", possessor: "", projectionRole: "read-only-classified-nounstem-source",
    grammarAuthority: false, callerSuppliedAuthorityAccepted: false,
    formulaStringAuthority: false, surfaceStringAuthority: false,
  }) : null;
  const canonicalNncGrammarFrame = typeof target
    ?.isClassicalNahuatlDeverbalNncGrammarFrame === "function"
    && target.isClassicalNahuatlDeverbalNncGrammarFrame(result)
    && result?.canonicalResult?.authorizationStatus === "authorized"
    ? result
    : null;
  const canonicalNncResult = classifiedSource ? null : canonicalNncGrammarFrame?.canonicalResult || result;
  const predicateNominalizationContext =
    PREDICATE_NNC_CONTINUATION_CONTEXTS.get(canonicalNncResult)
    || PATIENTIVE_NNC_CONTINUATION_CONTEXTS.get(canonicalNncResult)
    || ACTION_NNC_CONTINUATION_CONTEXTS.get(canonicalNncResult) || null;
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
  const compoundSource = target.isClassicalNahuatlNominalConstructionResult?.(canonicalNncResult) === true
    && canonicalNncResult.constructionKind === "compound-nnc"
    && canonicalNncResult.authorizationStatus === "authorized"
    && target.isClassicalNahuatlNncSlotFrame?.(canonicalNncResult.nncSlotFrame) === true
    ? captureOwnerhoodNncSource(canonicalNncResult, target) : null;
  const compoundClass = canonicalNncResult?.operationFrame?.resultSourceClassFrame;
  const compoundProjection = compoundSource?.authorizationStatus === "authorized"
    && compoundClass?.authorizationStatus === "authorized"
    && compoundClass.sourceClass === canonicalNncResult.operationFrame.resultSourceClass
    && compoundClass.nounClass === canonicalNncResult.nncSlotFrame.nounClass
    ? deepFreeze({
      nncType: "compound-nnc",
      canonicalResultFrame: canonicalNncResult,
      canonicalSourceFrame: canonicalNncResult.sourceFrame,
      canonicalOperationFrame: canonicalNncResult.operationFrame,
      typedSlotFrame: canonicalNncResult.nncSlotFrame,
      sourceIdentityStem: compoundSource.sourceStem,
      predicateStem: canonicalNncResult.nncSlotFrame.slots.predicate.stem,
      sourceNounClass: compoundClass.nounClass,
      sourceUseShape: compoundClass.useShape,
      sourceSubclass: compoundClass.subclass,
      state: canonicalNncResult.operationFrame.state,
      possessor: canonicalNncResult.operationFrame.possessor,
      sourceConstituentKinds: ["nounstem-embed", "nounstem-matrix"],
      sourceConstituents: canonicalNncResult.sourceFrame.orderedConstituents,
      canonicalCompoundSourceAuthorizationFrame: canonicalNncResult.sourceAuthorizationFrame,
      canonicalCompoundEmbedResult: canonicalNncResult.sourceAuthorizationFrame.lexicalFacts.capturedEmbedResult,
      canonicalCompoundMatrixResult: canonicalNncResult.sourceAuthorizationFrame.lexicalFacts.capturedMatrixNncResult,
      canonicalCompoundResultClassFrame: compoundClass,
      projectionRole: "read-only-source-constituents",
      grammarAuthority: false, callerSuppliedAuthorityAccepted: false,
      formulaStringAuthority: false, surfaceStringAuthority: false,
    }) : null;
  const relationalSlots = canonicalNncResult?.nncSlotFrame;
  const relationalProjection = target.isClassicalNahuatlRelationalResult?.(canonicalNncResult) === true
    && canonicalNncResult.sourceFrame.subjectMode === "adverbialized"
    && target.isClassicalNahuatlNncSlotFrame?.(relationalSlots) === true
    ? deepFreeze({
      nncType: "relational-adverbialized-nnc", canonicalResultFrame: canonicalNncResult,
      canonicalSourceFrame: canonicalNncResult.sourceFrame,
      canonicalOperationFrame: canonicalNncResult.operationFrame,
      typedSlotFrame: relationalSlots,
      // The possessor is internal to the embedded nounstem (§47.5).
      // The outer characteristic NNC keeps its own absolutive state.
      sourceIdentityStem: joinMorphs([
        ...relationalSlots.slots.state.slots.map(slot => slot.carrier),
        relationalSlots.slots.predicate.stem,
      ]),
      predicateStem: joinMorphs([
        ...relationalSlots.slots.state.slots.map(slot => slot.carrier),
        relationalSlots.slots.predicate.stem,
      ]),
      sourceNounClass: relationalSlots.nounClass, state: canonicalNncResult.sourceFrame.state,
      possessor: canonicalNncResult.sourceFrame.possessorId || "",
      sourceConstituentKinds: ["relational-nounstem"],
      sourceConstituents: [relationalSlots.slots.predicate.stem],
      projectionRole: "read-only-source-constituents", grammarAuthority: false,
      formulaStringAuthority: false, surfaceStringAuthority: false,
    }) : null;
  const projection = classifiedProjection || applicationProjection || internalProjection || compoundProjection || relationalProjection;
  if (
    !projection
    || (
      projection.nncType !== "ordinary"
      && projection.nncType !== "classified-nounstem-source"
      && projection.nncType !== "deverbal-predicate-nominalization"
      && projection.nncType !== "compound-nnc"
      && projection.nncType !== "relational-adverbialized-nnc"
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
  // Nominal embedding selects the owner's general-use degree, not the
  // currently displayed restricted/possessed predicate. This preserves cā
  // in future and preterit agentives and the genuine patientive/action stem.
  let characteristicEmbedStem = predicateNominalizationContext
    ? normalizeStem(predicateNominalizationContext.operationFrame?.targetStems?.generalUse
      || predicateNominalizationContext.operationFrame?.targetStems?.citationRestrictedUse)
    : normalizeStem(projection.predicateStem);
  const underlyingPreteritAgentiveGeneralUseStem = preteritAgentiveSource
    ? characteristicEmbedStem : "";
  let characteristicGeneralUseBoundaryFrame = null;
  if (preteritAgentiveSource && /uc-0-cā$/u.test(characteristicEmbedStem)) {
    // §39.6 documents the delabialized realization at the actual cā
    // contact. The perfective and agentive general-use Source stay intact;
    // only their downstream characteristic-use operand is realized here.
    const shift = target.buildClassicalNahuatlConsonantPhoneShiftFrame?.({
      sourceConsonant: "kw", position: "exposed", grammaticalConstruction: true,
    });
    const length = target.buildClassicalNahuatlConsonantalLengthFrame?.({
      leftConsonant: shift?.outputSpelling, rightConsonant: "c", grammaticalConstruction: true,
    });
    const authorized = value => value?.authorizationStatus === "authorized"
      && target.isClassicalNahuatlTranscriptionAnalysisFrame?.(value) === true;
    if (!authorized(shift) || shift.selectedRuleId !== "cn-l2-213-kw-exposed-k"
      || shift.outputSpelling !== "c" || !authorized(length) || length.outputSpelling !== "cc") {
      return deepFreeze({
        kind: "classical-nahuatl-characteristic-patientive-nnc-capture-frame",
        version: VERSION, authorizationStatus: "blocked",
        blockReason: "characteristic-general-use-kw-boundary-owner-required",
        formulaStringAuthority: false, surfaceStringAuthority: false,
      });
    }
    characteristicEmbedStem = characteristicEmbedStem.replace(/uc-0-cā$/u,
      `${shift.outputSpelling}-0-cā`);
    characteristicGeneralUseBoundaryFrame = deepFreeze({
      kind: "classical-nahuatl-characteristic-general-use-boundary-frame",
      version: VERSION, authorizationStatus: "authorized",
      canonicalNncGrammarFrame, canonicalNncResult,
      canonicalPredicateNominalizationSourceFrame: predicateNominalizationContext.sourceFrame,
      canonicalPredicateNominalizationOperationFrame: predicateNominalizationContext.operationFrame,
      underlyingGeneralUseStem: underlyingPreteritAgentiveGeneralUseStem,
      realizedGeneralUseStem: characteristicEmbedStem,
      followingMorpheme: "cā", consonantPhoneShiftFrame: shift,
      consonantalLengthFrame: length,
      optionalPhoneSelectedByCharacteristicConstruction: true,
      sourcePerfectiveAndGeneralUseUnchanged: true,
      sourceIdentityAuthorizesRule: false,
      formulaStringAuthority: false, surfaceStringAuthority: false,
    });
  }
  const secondaryPossessive = predicateNominalizationContext?.operationFrame?.secondaryPossessiveStemFrame;
  if (secondaryPossessive?.authorizationStatus === "authorized"
    && secondaryPossessive.targetRank === "secondary-general-use-nounstem"
    && canonicalNncResult.state === "possessive") {
    const number = canonicalNncResult.nncSlotFrame.slots.number;
    characteristicEmbedStem = joinMorphs([characteristicEmbedStem, number.num1, number.num2]);
  }
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
    canonicalNounGeneralUseFrame: projection.canonicalNounGeneralUseFrame || null,
    sourceUnit: classifiedSource ? "owner-issued-classified-nounstem-source"
      : compoundProjection ? "owner-issued-compound-nnc-result"
      : relationalProjection ? "owner-issued-relational-nnc-result" : "owner-issued-ordinary-nnc-result",
    sourceStage: "nounstem-embed",
    sourceStem: normalizeStem(projection.sourceIdentityStem),
    predicateStem: normalizeStem(projection.predicateStem),
    characteristicEmbedStem,
    characteristicGeneralUseBoundaryFrame,
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
    preteritAgentiveGeneralUseStem: underlyingPreteritAgentiveGeneralUseStem,
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
    canonicalCompoundSourceAuthorizationFrame: projection.canonicalCompoundSourceAuthorizationFrame || null,
    canonicalCompoundEmbedResult: projection.canonicalCompoundEmbedResult || null,
    canonicalCompoundMatrixResult: projection.canonicalCompoundMatrixResult || null,
    canonicalCompoundResultClassFrame: projection.canonicalCompoundResultClassFrame || null,
    exactResultIdentityPreserved: !classifiedSource,
    exactSourceIdentityPreserved: true,
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
    && frame.exactSourceIdentityPreserved === true
    && (frame.canonicalNncResult ? frame.exactResultIdentityPreserved === true
      : frame.exactResultIdentityPreserved === false && Boolean(frame.canonicalNncSourceFrame))
    && frame.exactSourceAndOperationIdentityPreserved === true
    && frame.grammarAuthority === false
    && frame.callerSuppliedAuthorityAccepted === false
    && frame.formulaStringAuthority === false
    && frame.surfaceStringAuthority === false
    && Object.isFrozen(frame)
  );
}

function assimilateCharacteristicYō(embedStem = "", matrixVowel = "ō") {
  const stem = normalizeStem(embedStem);
  const final = finalUnit(stem);
  const assimilated = ({
    l: `l${matrixVowel}`,
    z: `z${matrixVowel}`,
    x: `x${matrixVowel}`,
    ch: `ch${matrixVowel}`,
    tz: `tz${matrixVowel}`,
  })[final];
  if (!assimilated) return joinMorphs([stem, `y${matrixVowel}`]);
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
    embeddedGeneralUseBoundaryFrame: captureFrame?.characteristicGeneralUseBoundaryFrame || null,
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
  if (normalizeKey(request.rootStockNounClass)
    && normalizeKey(request.patientiveSourceFamily) !== "root-or-stock") {
    return {sourceFrame:null,operationFrame:null,blockReason:"39.4-root-stock-noun-class-family-required"};
  }
  if (patientiveKind === "characteristic-property") {
    if (request.canonicalNncResult && request.canonicalNncSourceFrame) return {
      sourceFrame: null, operationFrame: null, blockReason: "characteristic-source-and-result-are-mutually-exclusive",
    };
    if (request.canonicalNncSourceFrame
      && target.isClassicalNahuatlOrdinaryNncSourceFrame?.(request.canonicalNncSourceFrame) !== true) return {
      sourceFrame: null, operationFrame: null, blockReason: "exact-owner-issued-classified-nounstem-source-required",
    };
    if (request.canonicalNncResult
      && target.isClassicalNahuatlOrdinaryNncSourceFrame?.(request.canonicalNncResult) === true) return {
      sourceFrame: null, operationFrame: null, blockReason: "characteristic-classified-source-field-required",
    };
    if (!request.canonicalNncResult && !request.canonicalNncSourceFrame) {
      return {
        sourceFrame: null,
        operationFrame: null,
        blockReason:
          "exact-owner-issued-ordinary-nnc-result-required-for-characteristic-patientive",
      };
    }
    const captureFrame = captureCharacteristicPatientiveNncResult(
      request.canonicalNncSourceFrame || request.canonicalNncResult,
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
    const targetEmbedStem = sourceFrame.sourceStem;
    const targetStem = lexicalReadingFact?.assimilationException
      ? joinMorphs([targetEmbedStem, "yō"])
      : assimilateCharacteristicYō(targetEmbedStem);
    const generalUseStem = ownerhoodContrastFact?.possessiveStateTarget === "embed-not-compound"
      ? targetEmbedStem
      : targetStem.replace(/ō$/u, "o");
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
        Boolean(captureFrame.canonicalNncResult && captureFrame.canonicalNncResult === request.canonicalNncResult),
      exactClassifiedNounstemSourceIdentityPreserved:
        Boolean(request.canonicalNncSourceFrame && captureFrame.canonicalNncSourceFrame === request.canonicalNncSourceFrame),
      canonicalNncSourceFrame: captureFrame.canonicalNncSourceFrame,
      canonicalNncOperationFrame: captureFrame.canonicalNncOperationFrame,
      canonicalNncTypedSlotFrame: captureFrame.canonicalNncTypedSlotFrame,
      sourceIdentityStem: captureFrame.sourceStem,
      predicateStem: captureFrame.predicateStem,
      characteristicEmbedStem: captureFrame.characteristicEmbedStem,
      characteristicGeneralUseBoundaryFrame: captureFrame.characteristicGeneralUseBoundaryFrame || null,
      sourceIdentityAndPredicateShapeRemainDistinct: true,
      sourceNounClass: captureFrame.sourceNounClass,
      sourceUseShape: captureFrame.sourceUseShape,
      sourceSubclass: captureFrame.sourceSubclass,
      sourceState: captureFrame.sourceState,
      sourcePossessor: captureFrame.sourcePossessor,
      sourceConstituentKinds: captureFrame.sourceConstituentKinds,
      sourceConstituents: captureFrame.sourceConstituents,
      canonicalCompoundSourceAuthorizationFrame: captureFrame.canonicalCompoundSourceAuthorizationFrame,
      canonicalCompoundEmbedResult: captureFrame.canonicalCompoundEmbedResult,
      canonicalCompoundMatrixResult: captureFrame.canonicalCompoundMatrixResult,
      canonicalCompoundResultClassFrame: captureFrame.canonicalCompoundResultClassFrame,
      abundantOwnerhoodMatrix: "tla-(-yo-ā)",
      matrixStem: "yō-ā",
      incorporatedRole: "nonhuman-object",
      compoundSourcePath:
        request.canonicalNncSourceFrame
          ? "owner-issued-classified-nounstem-source→nounstem-embed→yō-ā→imperfective-patientive"
          : "owner-issued-nnc-result→nounstem-embed→yō-ā→imperfective-patientive",
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
      copiedSourceAccepted: false,
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
          ...(request.canonicalNncSourceFrame ? [] : ["39.3-exact-owner-issued-nnc-result-source"]),
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
  const coreSource = request.canonicalPatientiveCoreSourceFrame || null;
  if (coreSource) {
    const expectedStage = ({"perfective-active-core":"perfective-core",
      "imperfective-active-core":"imperfective-core","passive-core":"nonactive-core","impersonal-core":"nonactive-core"})[sourceFamily];
    if (!ISSUED_PATIENTIVE_CORE_SOURCES.has(coreSource) || !expectedStage
      || coreSource.sourceStage !== expectedStage || request.source
      || request.canonicalVncResult || request.canonicalOwnerhoodNncResult) return {
      sourceFrame:null,operationFrame:null,blockReason:"exact-compatible-patientive-core-source-required-without-competing-source",
    };
    request = {...request,source:{sourceUnit:coreSource.sourceUnit,sourceStage:coreSource.sourceStage,
      sourceStem:coreSource.sourceStem,verbClass:coreSource.verbClass,sourceVoice:coreSource.sourceVoice,
      sourceValence:coreSource.sourceValence,sourceObjectPattern:coreSource.sourceObjectPattern,
      nonactiveSuffix:coreSource.nonactiveSuffix,patientiveCoreSourceFrame:coreSource}};
  }
  if (!PATIENTIVE_SOURCE_FAMILIES.includes(sourceFamily)) {
    return { sourceFrame: null, operationFrame: null, blockReason: "patientive-source-family-required" };
  }
  const structuralContractId = `patientive:${sourceFamily}`;
  const structuralContract =
    DEVERBAL_NOUNSTEM_SOURCE_CONTRACTS[structuralContractId];
  if (sourceFamily === "reconstructed-nonactive-core") {
    if (normalizeKey(request.patientiveAnalogy || "impersonal") !== "impersonal") return {
      sourceFrame: null, operationFrame: null,
      blockReason: "reconstructed-nonactive-patientive-impersonal-analogy-required",
    };
    const capture = captureTypeTwoReconstructedNonactivePatientiveSource(request.canonicalVncResult, target);
    if (!isClassicalNahuatlTypeTwoReconstructedNonactivePatientiveCaptureFrame(capture)) return {
      sourceFrame: null, operationFrame: null, blockReason: capture.blockReason,
    };
    request = {...request, source: {
      sourceUnit: capture.sourceUnit, sourceStage: capture.sourceStage,
      sourceStem: capture.sourceStem, verbClass: capture.verbClass,
      sourceVoice: capture.sourceVoice, sourceValence: capture.sourceValence,
      sourceObjectPattern: capture.sourceObjectPattern, sourceSubject: capture.sourceSubject,
      nonactiveSuffix: capture.nonactiveSuffix,
      reconstructedNonactivePatientiveCaptureFrame: capture,
    }};
  }
  if (sourceFamily === "passive-core" && !coreSource) {
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
  if (sourceFamily === "impersonal-core" && !coreSource) {
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
  if (sourceFamily === "perfective-active-core" && !coreSource) {
    const perfectiveParent = request.canonicalOwnerhoodNncResult || request.canonicalVncResult;
    if (!perfectiveParent) {
      return {
        sourceFrame: null,
        operationFrame: null,
        blockReason:
          "exact-owner-issued-active-preterit-vnc-result-required",
      };
    }
    const captureFrame = capturePerfectivePatientiveVncResult(
      perfectiveParent,
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
  if (sourceFamily === "imperfective-active-core" && !coreSource) {
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
  if (sourceFamily === "root-or-stock" && request.canonicalVncResult) {
    const captureFrame = captureRootStockPatientiveVncResult(request.canonicalVncResult, target);
    if (!isClassicalNahuatlRootStockPatientiveVncCaptureFrame(captureFrame)) {
      return {sourceFrame:null,operationFrame:null,blockReason:captureFrame.blockReason};
    }
    request = {...request,source:{
      sourceUnit:captureFrame.sourceUnit,sourceStage:captureFrame.sourceStage,
      sourceStem:captureFrame.sourceStem,verbClass:captureFrame.verbClass,
      sourceVoice:captureFrame.sourceVoice,sourceValence:captureFrame.sourceValence,
      sourceObjectPattern:captureFrame.sourceObjectPattern,sourceSubject:captureFrame.sourceSubject,
      rootStockPatientiveVncCaptureFrame:captureFrame,
    }};
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
  let patientiveSupportiveInitialIBoundaryFrame = null;
  let patientiveStemFormationFrame = null;
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
  let rootStockFormationProfile = null;
  const rules = [];
  const appliedAuthorizationIds = [];
  const compoundSource = sourceFrame.compoundVncSourceFrame || null;
  const compoundRelation = normalizeKey(
    request.patientiveCompoundRelation || compoundSource?.resolvedRelation || ""
  );
  const patientiveNounVowelVariantOptions = sourceFamily === "impersonal-core"
    ? lexicalFrame.patientiveNounVowelVariantOptions || [] : [];
  const patientiveNounVowelVariant = normalizeKey(
    request.patientiveNounVowelVariant || patientiveNounVowelVariantOptions[0] || ""
  );
  if (Object.hasOwn(request, "patientiveNounVowelVariant")
    && !patientiveNounVowelVariantOptions.includes(patientiveNounVowelVariant)) {
    return { sourceFrame, operationFrame: null,
      blockReason: "patientive-noun-vowel-variant-not-licensed-by-exact-source" };
  }
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
  if (["passive-core", "impersonal-core", "reconstructed-nonactive-core"].includes(sourceFamily)) {
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
      ...(impersonalCapture ? {canonicalVncResult: impersonalCapture.canonicalVncResult} : {}),
    }, target);
    const requestedContrastReading = normalizeKey(
      request.patientiveContrastRealization || ""
    );
    if (sourceFamily === "impersonal-core"
      && impersonalCapture?.activeSourceValence === "projective-human"
      && requestedContrastReading === "regular-human-tla"
      && !hasImpersonalizedPassivePatientiveSource(impersonalCapture)) return {
      sourceFrame, operationFrame: null,
      blockReason: "38.1.4-impersonalized-passive-source-required",
    };
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
    const exceptionalHumanTeReading = lexicalFrame.exceptionalHumanPrefixRetention
      && (!patientiveContrastInventory.choiceRequired
        || selectedPatientiveContrastReading === "exceptional-human-te");
    if (sourceFamily === "impersonal-core"
      && impersonalCapture?.activeSourceValence === "projective-human"
      && !impersonalCapture.reflexiveReciprocalAncestryKind
      && !exceptionalHumanTeReading
      && selectedPatientiveContrastReading !== "anomalous-nonhuman-te"
      && !hasImpersonalizedPassivePatientiveSource(impersonalCapture)) return {
      sourceFrame, operationFrame: null,
      blockReason: "38.1.4-impersonalized-passive-source-required",
    };
    let truncated = truncateNonactiveStem(
      nonactiveSourceStem,
      source.nonactiveSuffix,
      {
        activeSourceStem: sourceFrame.impersonalPatientiveVncCaptureFrame
          ?.activeSourceStem || sourceFrame.reconstructedNonactivePatientiveCaptureFrame?.activeSourceStem || "",
        rootPlusYaDeletionApplied: sourceFrame.impersonalPatientiveVncCaptureFrame
          ?.rootPlusYaRemovalAlreadyAppliedByVncOwner === true,
      }
    );
    if (!truncated.stem) {
      return { sourceFrame, operationFrame: null, blockReason: "typed-nonactive-suffix-does-not-match-source-core" };
    }
    if (
      sourceFamily === "impersonal-core"
      && lexicalFrame.impersonalPatientiveRetainsActiveFinalW
      && impersonalCapture?.canonicalNonactiveStemRecord?.selectedRuleId
        === "cn-l20-5-intransitive-final-w"
    ) {
      const activeStem = normalizeStem(impersonalCapture.activeSourceStem);
      const retainedActiveStem = activeStem.replace(/[ai]$/u, "");
      const boundarySpelling = target
        .buildClassicalNahuatlDerivationalBoundarySpellingFrame?.({
          sourceStem: activeStem,
          retainedStem: retainedActiveStem,
          followingMorpheme: truncated.nounClass,
        });
      if (
        !/hu$/u.test(retainedActiveStem)
        || normalizeStem(retainedActiveStem.replace(/hu$/u, ""))
          !== normalizeStem(truncated.stem)
        || boundarySpelling?.authorizationStatus !== "authorized"
      ) {
        return { sourceFrame, operationFrame: null,
          blockReason: "impersonal-patientive-irregular-w-retention-unresolved" };
      }
      truncated = {
        ...truncated,
        stem: boundarySpelling.realizedRetainedStem,
        retainedStem: boundarySpelling.realizedRetainedStem,
        lexicalFinalWRetentionFrame: deepFreeze({
          operation: "retain-active-final-w-after-nonactive-truncation",
          section: "44.6",
          activeSourceStem: activeStem,
          regularTruncatedStem: truncated.stem,
          boundarySpellingFrame: boundarySpelling,
        }),
      };
      rules.push("44.6-impersonal-patientive-irregular-final-w-retention");
    }
    const vowelAlternation = patientiveNounVowelVariant === "a"
      ? { from: "e", to: "a" } : lexicalFrame.patientiveVowelAlternation;
    if (sourceFamily === "impersonal-core" && vowelAlternation
      && truncated.stem.includes(vowelAlternation.from)) {
      const matrixStart = patientiveNounVowelVariantOptions.length
        ? normalizeStem(compoundSource?.embedStem).length + 1 : 0;
      if (matrixStart && !truncated.stem.startsWith(`${normalizeStem(compoundSource?.embedStem)}-`)) {
        return { sourceFrame, operationFrame: null,
          blockReason: "patientive-noun-vowel-variant-requires-preserved-matrix-boundary" };
      }
      const changedStem = truncated.stem.slice(0, matrixStart)
        + truncated.stem.slice(matrixStart).replace(vowelAlternation.from, vowelAlternation.to);
      truncated = { ...truncated,
        stem: changedStem,
        retainedStem: changedStem,
        lexicalVowelAlternationFrame: deepFreeze({
          activeSourceStem: impersonalCapture.activeSourceStem,
          operation: "realize-documented-nounstem-vowel-alternant",
          from: vowelAlternation.from, to: vowelAlternation.to,
          canonicalVncSourceUnchanged: true,
        }),
      };
      rules.push("38.1.1-source-documented-nounstem-vowel-alternation");
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
      && (!patientiveContrastInventory.choiceRequired
        || selectedPatientiveContrastReading === "exceptional-human-te")
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
      originalRetainedStem: truncated.originalRetainedStem,
      patientiveVowelLengtheningApplied: truncated.patientiveVowelLengtheningApplied,
      rootPlusYaPatientiveQuantityPreserved: truncated.rootPlusYaPatientiveQuantityPreserved,
      lexicalFinalWRetentionFrame: truncated.lexicalFinalWRetentionFrame || null,
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
    if ((sourceFamily === "impersonal-core" && prefixes.at(-1) === "tla")
      || (sourceFamily === "passive-core" && prefixes.at(-1) === "ne")) {
      const sourceCapture = sourceFamily === "passive-core"
        ? sourceFrame.passivePatientiveVncCaptureFrame
        : sourceFrame.impersonalPatientiveVncCaptureFrame;
      const boundary = applySupportiveInitialIActionBoundary({
        stem: truncatedStem,
        objectPrefix: prefixes.at(-1),
        sourceInitialIKind: getVncSourceInitialIKind(sourceCapture?.canonicalNucleusResult)
          || sourceCapture?.continuationProjection?.sourceInitialISelection,
        lexicalSourceStem: sourceCapture?.activeSourceStem,
        requestedVariant: request.supportiveInitialIVariant,
      });
      if (boundary.authorizationStatus !== "authorized") {
        return { sourceFrame, operationFrame: null, blockReason: boundary.blockReason };
      }
      if (sourceFamily === "passive-core") patientiveSupportiveInitialIBoundaryFrame = boundary;
      truncatedStem = boundary.stem;
      if (boundary.rule !== "not-applicable") rules.push(boundary.rule);
    }
    if (sourceFamily === "passive-core" && !prefixes.length
      && normalizeKey(request.state || "absolutive") === "possessive"
      && (getVncSourceInitialIKind(sourceFrame.passivePatientiveVncCaptureFrame?.canonicalNucleusResult)
        || sourceFrame.passivePatientiveVncCaptureFrame?.continuationProjection?.sourceInitialISelection) === "supportive"
      && /^i/u.test(truncatedStem)) {
      // §14.2.7: the supportive vowel is absent at the possessed noun boundary.
      // Keep its canonical VNC source; it does not become a real vowel.
      patientiveSupportiveInitialIBoundaryFrame = applySupportiveInitialIActionBoundary({
        stem: truncatedStem, sourceInitialIKind: "supportive", nominalBoundary: true,
        requestedVariant: "supportive-i-drop",
      });
      truncatedStem = patientiveSupportiveInitialIBoundaryFrame.stem;
      rules.push("14.2.7-patientive-possessive-supportive-i-drop");
    }
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
    const ownerhoodSource = sourceFrame.perfectivePatientiveVncCaptureFrame?.ownerhoodPerfectiveSourceFrame;
    if (ownerhoodSource) {
      const reading = normalizeKey(request.ownerhoodPatientiveReading || ownerhoodSource.automaticReading);
      if (!ownerhoodSource.readingOptions.includes(reading)) return {
        sourceFrame, operationFrame: null,
        blockReason: "39.1-ownerhood-patientive-acquired-reading-required",
      };
    }
    const final = finalUnit(sourceFrame.sourceStem);
    const typedExtendedPerfective = ["t", "p"].includes(final)
      && isClassicalNahuatlPerfectivePatientiveVncCaptureFrame(
        sourceFrame.perfectivePatientiveVncCaptureFrame,
      );
    if (!PERFECTIVE_PATIENTIVE_FINALS.includes(final) && !typedExtendedPerfective) {
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
      sourceFrame.imperfectivePatientiveVncCaptureFrame || sourceFrame.patientiveCoreSourceFrame
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
    rootStockFormationProfile = selectRootStockFormationProfile(rootStock, allomorph);
    const requestedClass = normalizeKey(request.rootStockNounClass);
    if (requestedClass && !rootStockFormationProfile.availableNounClasses.includes(requestedClass)) {
      return {sourceFrame,operationFrame:null,blockReason:"39.4-root-stock-noun-class-not-licensed"};
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
      rootStockSourceAnalysis = rootStockFormationProfile.stockKind === "causative-root"
        ? "deverbal-patientive-proven-by-object-carrier"
        : rootStockFormationProfile.stockKind === "bare-stock-agentive"
          ? "stock-as-agentive-nounstem"
          : rootStockFormationProfile.stockKind === "unknown-source-deverbal-nounstem"
            ? "deverbal-source-identity-unknown"
            : allomorph === "zero"
              ? "deverbal-root-patientive"
              : "deverbal-stock-patientive";
    }
    const selectedTargetBase = rootStockFormationProfile.stockBase;
    targetCore = allomorph === "zero"
      ? selectedTargetBase
      : joinMorphs([selectedTargetBase, allomorph]);
    nounClass = requestedClass || rootStockFormationProfile.defaultNounClass;
    rules.push(`39.4-${rootStockFormationProfile.stockKind}-${allomorph}`);
    appliedAuthorizationIds.push(
      `lexical-source:root-stock-${rootStockFormationProfile.stockKind}-${allomorph}`
    );
  }
  const patientiveStemFormation = normalizeKey(request.patientiveStemFormation || "plain");
  const affinityStemCandidate = sourceFamily === "passive-core"
    && typeof target.buildClassicalNahuatlDerivedStemFrame === "function"
    ? target.buildClassicalNahuatlDerivedStemFrame(targetCore, {
        stemFormation: "affinity", subject: request.subject || "3sg",
        animacy: request.animacy || "animate",
      }) : null;
  const patientiveStemFormationOptions = affinityStemCandidate?.authorizationStatus === "authorized"
    ? ["plain", "affinity"] : ["plain"];
  if (patientiveStemFormation !== "plain") {
    if (sourceFamily !== "passive-core" || patientiveStemFormation !== "affinity"
      || typeof target.buildClassicalNahuatlDerivedStemFrame !== "function") {
      return { sourceFrame, operationFrame: null, blockReason: "patientive-nounstem-relation-not-licensed" };
    }
    patientiveStemFormationFrame = affinityStemCandidate;
    if (patientiveStemFormationFrame.authorizationStatus !== "authorized") {
      return { sourceFrame, operationFrame: null, blockReason: patientiveStemFormationFrame.blockReason };
    }
    targetCore = patientiveStemFormationFrame.derivedStem;
    rules.push("14.3-patientive-nounstem-affinity");
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
          lexicalFrame.exceptionalHumanPrefixRetention === true
          && (selectedPatientiveContrastReading !== "regular-human-tla"),
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
          ownerhoodReading: request.ownerhoodPatientiveReading,
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
      stockKind: rootStockFormationProfile.stockKind,
      stockBase: rootStockFormationProfile.stockBase,
      stockFormativeVowel:
        lexicalFrame.rootStockAuthorization?.stockFormativeVowel || "",
      stockFormativeShorteningApplied:
        rootStockFormationProfile.stockFormativeShorteningApplied === true,
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
      availableNounClasses: rootStockFormationProfile.availableNounClasses,
      defaultNounClass: rootStockFormationProfile.defaultNounClass,
      nounClassChoiceAvailable: rootStockFormationProfile.nounClassChoiceAvailable,
      nounClassChoiceRequired: rootStockFormationProfile.nounClassChoiceRequired,
      rootStockExtensionFrame: deepFreeze({
        kind:
          "classical-nahuatl-lesson39-root-stock-extension-frame",
        version: VERSION,
        authorizationStatus: "authorized",
        structuralFamily:
          rootStockFormationProfile.stockKind,
        stockOrRootFormation:
          ["c", "x"].includes(normalizeKey(
            request.rootStockAllomorph
              || lexicalFrame.rootStockAuthorization?.defaultAllomorph
          ))
            ? "stock-based"
            : rootStockFormationProfile.stockKind
                === "bare-stock-agentive"
              ? "stock-as-agentive-nounstem"
              : rootStockFormationProfile.stockKind
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
          rootStockFormationProfile.lexicalEvidenceFrame,
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
        sourceFamily: rootStockFormationProfile.stockKind,
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
          rootStockFormationProfile.vowelRealizationRule,
        longStockFormativeShortened:
          rootStockFormationProfile.stockFormativeShorteningApplied === true,
        eStockOftenHasCharacteristicReading:
          lexicalFrame.rootStockAuthorization?.stockFormativeVowel === "ē",
        sourceReadings: Object.freeze([
          ...rootStockFormationProfile.sourceReadings,
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
  const nounClassAnalyses = sourceFamily === "imperfective-active-core"
    ? getImperfectivePatientiveNounClassAnalyses(targetCore, target) : [];
  const requestedNounSourceClass = normalizeKey(request.patientiveNounSourceClass);
  const selectedNounClassAnalysis = nounClassAnalyses.find(a => a.sourceClass === requestedNounSourceClass) || null;
  if (requestedNounSourceClass && !selectedNounClassAnalysis) return {
    sourceFrame, operationFrame: null, blockReason: "39.2-patientive-noun-class-analysis-not-licensed",
  };
  const generalUseShapes = [...new Set(nounClassAnalyses.map(a => a.generalUseStem))];
  const patientiveGeneralUse = selectedNounClassAnalysis?.generalUseStem
    || (generalUseShapes.length === 1 ? generalUseShapes[0] : "");
  const operationFrame = deepFreeze({
    kind: "classical-nahuatl-deverbal-nnc-operation-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    operationId: `patientive:${sourceFamily}`,
    deverbalNounstemAxisFrame,
    constructionKind: "patientive",
    patientiveKind: "ordinary",
    patientiveSourceFamily: sourceFamily,
    patientiveStemFormation,
    patientiveStemFormationOptions,
    patientiveNounVowelVariant,
    patientiveNounVowelVariantOptions,
    patientiveStemFormationFrame,
    supportiveInitialIBoundaryFrame: patientiveSupportiveInitialIBoundaryFrame,
    sourceStage: sourceFrame.sourceStage,
    sourceVoice: sourceFrame.sourceVoice,
    sourceValence: sourceFrame.sourceValence,
    sourceObjectPattern: sourceFrame.sourceObjectPattern,
    targetStems: {
      restrictedUse: targetCore,
      generalUse: sourceFamily === "imperfective-active-core" ? patientiveGeneralUse : targetCore,
    },
    nounClass,
    ...(sourceFamily === "imperfective-active-core" ? {
      patientiveNounSourceClassOptions: nounClassAnalyses.map(a => a.sourceClass),
      selectedPatientiveNounSourceClass: requestedNounSourceClass,
      patientiveNounClassAnalysis: selectedNounClassAnalysis,
      nounSubclass: selectedNounClassAnalysis?.canonicalSource.subclass || "",
      patientiveGeneralUseUnresolved: !patientiveGeneralUse,
      patientivePossessedClassRequired: !selectedNounClassAnalysis,
    } : {}),
    nncFamily: `${sourceFamily}-patientive`,
    connectorProfile: nounClass === "tl" ? "derived-tl" : "derived-tli",
    pluralConnector: nounClass === "tl" ? "m-eh" : "t-in",
    possessiveSingularConnector: sourceFamily === "imperfective-active-core"
      ? selectedNounClassAnalysis?.singularConnector || ""
      : nounClass === "tl" ? "uh" : "0",
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
          canonicalPatientiveCoreSourceFrame:sourceFrame.patientiveCoreSourceFrame || null,
          exactCoreSourceIdentityPreserved:sourceFrame.sourceCapturedFromExactCoreSource === true,
          activeSourceValence:
            sourceFrame.passivePatientiveVncCaptureFrame
              ?.activeSourceValence || sourceFrame.patientiveCoreSourceFrame?.activeSourceValence || "",
          ultimateActiveSourceIsTransitive:
            sourceFrame.passivePatientiveVncCaptureFrame
              ?.ultimateActiveSourceIsTransitive === true
              || sourceFrame.patientiveCoreSourceFrame?.ultimateActiveSourceIsTransitive === true,
          intransitiveUltimateSourceAllowed: false,
          passiveCore: sourceFrame.sourceStem,
          nonactiveSuffix:
            sourceFrame.passivePatientiveVncCaptureFrame
              ?.nonactiveSuffix || sourceFrame.patientiveCoreSourceFrame?.nonactiveSuffix || "",
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
      rootStockFormationProfile?.stockKind || lexicalFrame.rootStockAuthorization?.stockKind || "",
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

function captureOwnerhoodNncSource(result = null, target = globalThis, incorporationAnalysis = null) {
  if (incorporationAnalysis != null
    && (target.isClassicalNahuatlAdjectivalModificationIncorporationAnalysis?.(incorporationAnalysis) !== true
      || target.isClassicalNahuatlResultFrame?.(result) !== true)) return deepFreeze({
    authorizationStatus: "blocked", blockReason: "ownerhood-fixed-modification-source-required",
  });
  if (isClassicalNahuatlDeverbalNncGrammarFrame(result)
    && result.operationFrame?.patientivePossessedClassRequired === true) return deepFreeze({
      authorizationStatus: "blocked", blockReason: "39.2-patientive-noun-class-required-for-ownerhood",
    });
  let sourceStem = "";
  let nounClass = "";
  let nounSubclass = "";
  let sourceKind = "";
  let characteristicPatientiveCaptureFrame = null;
  let adjectivalIncorporationFrame = null;
  const doubleNucleusProjection = target.getClassicalNahuatlDoubleNucleusOwnerhoodProjection?.(result) || null;
  if (target.isClassicalNahuatlOrdinaryNncSourceFrame?.(result)
    && result.authorizationStatus === "authorized") {
    sourceStem = result.stem;
    nounClass = result.nounClass;
    nounSubclass = result.subclass;
    sourceKind = "classified-nounstem-source";
  } else if (target.isClassicalNahuatlOrdinaryNncResult?.(result)
    && result.authorizationStatus === "authorized"
    && target.isClassicalNahuatlOrdinaryNncSourceFrame?.(result.sourceFrame)) {
    const citation = target.getClassicalNahuatlNncRestrictedUseCitationProjection?.(result);
    if (citation?.authorizationStatus === "authorized"
      && citation.canonicalResultFrame === result) {
      sourceStem = citation.stem;
      nounClass = citation.nounClass;
      nounSubclass = result.sourceFrame.subclass;
      sourceKind = "ordinary-nounstem-result";
    }
  } else if (target.isClassicalNahuatlNominalConstructionResult?.(result)
    && result.authorizationStatus === "authorized"
    && ["compound-nnc", "affective-nnc"].includes(result.constructionKind)
    && result.operationFrame?.resultSourceClass) {
    const derivedClassSource = target.issueCanonicalNncSourceFrame?.({
      stem: result.operationFrame.compoundStem,
      sourceClass: result.operationFrame.resultSourceClass,
    });
    if (target.isClassicalNahuatlOrdinaryNncSourceFrame?.(derivedClassSource)
      && derivedClassSource.authorizationStatus === "authorized") {
      sourceStem = derivedClassSource.stem;
      nounClass = derivedClassSource.nounClass;
      nounSubclass = derivedClassSource.subclass;
      sourceKind = "compound-nounstem-result";
    }
  } else if (isClassicalNahuatlDeverbalNncGrammarFrame(result)
    && result.authorizationStatus === "authorized"
    && result.constructionKind === "patientive"
    && result.operationFrame?.patientiveKind === "characteristic-property") {
    const characteristic = capturePatientiveNncResultForMatrixContinuation(result.canonicalResult, target);
    if (isClassicalNahuatlPatientiveNncContinuationCaptureFrame(characteristic)
      && characteristic.characteristicPropertyPatientive) {
      characteristicPatientiveCaptureFrame = characteristic;
      sourceStem = characteristic.characteristicMatrixFullEmbedStem;
      nounClass = "tl";
      // §39.3 classifies the characteristic yō matrix as TL1B regardless
      // of its assimilated spelling or the incorporated noun's own class.
      nounSubclass = "1-b";
      sourceKind = "characteristic-patientive-nounstem-result";
    }
  } else if (isClassicalNahuatlDeverbalNncGrammarFrame(result)
    && result.authorizationStatus === "authorized"
    && result.constructionKind === "patientive"
    && result.operationFrame?.patientiveKind === "ordinary"
    && result.operationFrame?.targetStems?.restrictedUse) {
    sourceStem = result.operationFrame.targetStems.restrictedUse;
    nounClass = result.operationFrame.nounClass;
    nounSubclass = nounClass === "tl" ? "1-a" : "";
    sourceKind = "patientive-nounstem-result";
  } else if (isClassicalNahuatlDeverbalNncGrammarFrame(result)
    && result.authorizationStatus === "authorized"
    && result.operationFrame?.connectorProfile === "preterit-agentive"
    && result.operationFrame?.targetStems?.generalUse) {
    sourceStem = result.operationFrame.targetStems.generalUse;
    nounClass = "tl";
    nounSubclass = "1-a";
    sourceKind = "preterit-agentive-general-use-result";
  }
  if (doubleNucleusProjection?.exactSourceResult === result) {
    sourceStem = doubleNucleusProjection.sourceStem;
    nounClass = "zero";
    sourceKind = "double-nucleus-nnc-result";
  }
  if (target.isClassicalNahuatlResultFrame?.(result) === true
    && target.isClassicalNahuatlAdjectivalModificationIncorporationAnalysis?.(incorporationAnalysis) === true) {
    const projection = target.projectClassicalNahuatlAdjectivalModificationForIncorporation?.(result, incorporationAnalysis);
    if (target.isClassicalNahuatlAdjectivalModificationIncorporationFrame?.(projection) === true
      && projection.canonicalAdjectivalModificationResult === result) {
      const head = projection.headPart.clause;
      const headParent = head.sourceResult;
      const ordinarySource = target.isClassicalNahuatlOrdinaryNncResult?.(headParent) === true
        ? headParent.sourceFrame : null;
      const compoundClass = target.isClassicalNahuatlNominalConstructionResult?.(headParent) === true
        ? headParent.operationFrame?.resultSourceClassFrame : null;
      const headClass = normalizeNounClass(head.typedSlotFrame?.nounClass);
      const claimedSourceClass = ordinarySource?.sourceClass || compoundClass?.sourceClass || "";
      if (headClass && (headClass !== "tl" || claimedSourceClass)) {
        adjectivalIncorporationFrame = projection;
        sourceStem = projection.incorporatedStem;
        nounClass = headClass;
        nounSubclass = headClass === "tl" ? normalizeOwnerhoodSubclass(claimedSourceClass) : "";
        sourceKind = "adjectival-modification-nnc-result";
      }
    }
  }
  const frame = deepFreeze({
    kind: "classical-nahuatl-ownerhood-nnc-source-capture-frame",
    version: VERSION,
    authorizationStatus: sourceStem && nounClass ? "authorized" : "blocked",
    blockReason: sourceStem && nounClass ? "" : "35.9-exact-issued-noun-source-or-agentive-parent-required",
    canonicalNncResult: sourceStem ? result : null,
    sourceStem, nounClass, nounSubclass, sourceKind, doubleNucleusProjection,
    adjectivalIncorporationFrame,
    characteristicPatientiveCaptureFrame,
    sourceStage: ["classified-nounstem-source", "ordinary-nounstem-result", "compound-nounstem-result", "patientive-nounstem-result", "adjectival-modification-nnc-result"].includes(sourceKind)
      ? "restricted-use-nounstem" : "nounstem-general-use",
    sourceStringAuthority: false,
    surfaceStringAuthority: false,
    formulaStringAuthority: false,
  });
  ISSUED_OWNERHOOD_NNC_CAPTURE_FRAMES.add(frame);
  return frame;
}

function isOwnerhoodNncSourceCapture(frame = null) {
  return Boolean(frame && ISSUED_OWNERHOOD_NNC_CAPTURE_FRAMES.has(frame)
    && frame.authorizationStatus === "authorized" && frame.canonicalNncResult);
}

function deriveOwnerhoodCharacteristicSource(source = {}, capture = null) {
  const characteristic = capture?.characteristicPatientiveCaptureFrame;
  const captured = isOwnerhoodNncSourceCapture(capture)
    && isClassicalNahuatlPatientiveNncContinuationCaptureFrame(characteristic)
    && characteristic.characteristicPropertyPatientive;
  // This is the documented lexical noun Source/analysis of §39.8/40.8,
  // not a list of finished ownerhood words. The same operation also accepts
  // any authentic characteristic-patientive Result through the capture above.
  const documented = !captured && normalizeStem(source.sourceStem || source.stem) === "icn-ō-yō";
  if (!captured && !documented) return null;
  const sourceClass = normalizeNounClass(source.nounClass || capture?.nounClass);
  const subclass = normalizeOwnerhoodSubclass(source.nounSubclass || capture?.nounSubclass);
  const validClass = sourceClass === "tl" && ["", "1", "1-b"].includes(subclass);
  const frame = deepFreeze({
    kind: "classical-nahuatl-ownerhood-characteristic-source-analysis-frame",
    version: VERSION, authorizationStatus: validClass ? "authorized" : "blocked",
    blockReason: validClass ? "" : "40.8-characteristic-source-class-contradiction",
    fullSourceStem: captured ? characteristic.characteristicMatrixFullEmbedStem : "icn-ō-yō",
    representativeSourceStem: captured ? characteristic.characteristicMatrixOmittedEmbedStem : "icn-ō",
    sourceNounClass: "tl", sourceNounSubclass: "1-b",
    characteristicMatrix: "yō",
    canonicalCharacteristicNncResult: captured ? capture.canonicalNncResult : null,
    canonicalCharacteristicCaptureFrame: captured ? characteristic : null,
    sourceOrigin: captured ? "issued-characteristic-patientive" : "documented-primitive-characteristic-source",
    fullCharacteristicAnalysis: captured ? characteristic : deepFreeze({
      sourceStem: "icn-ō-yō", embedStem: "icn-ō", matrix: "yō",
      meaning: "misery, poverty, wretchedness", sourceClass: "tl-1-b",
    }),
    realizationOptions: ["full", "omitted"],
    representativeIsStandaloneNounClaim: false,
    callerSuppliedMeaningAuthority: false, surfaceStringAuthority: false,
  });
  ISSUED_OWNERHOOD_CHARACTERISTIC_SOURCE_FRAMES.add(frame);
  return frame;
}

function buildOwnerhoodNounGeneralUse(source = {}, target = globalThis, preparedSourceFrame = null) {
  const sourceSubclass = normalizeOwnerhoodSubclass(source.nounSubclass);
  const sourceStem = normalizeStem(source.sourceStem || source.stem);
  // Ownership incorporates the noun's general-use shape (35.9), not its
  // restricted citation. Let the Lesson14 owner perform truncation and
  // supportive repair, retaining its underlying and exposed-edge evidence.
  const needsGeneralUseShape = !preparedSourceFrame
    && !OWNERHOOD_LEXICAL_FACTS[sourceStem]?.ownerhoodRetainsRestrictedVariant
    && normalizeNounClass(source.nounClass) === "tl"
    && ["2-a", "2-b", "2-c"].includes(sourceSubclass);
  const nounGeneralUseFrame = needsGeneralUseShape
    ? target.buildClassicalNahuatlNounstemSourceFrame?.(sourceStem, {
      nounClass: "tl",
      state: "possessive",
      generalUseShape: "truncated",
      tlSubclass: sourceSubclass.replace("-", "").toUpperCase(),
      ephemeralFinalVowel: /i$/u.test(sourceStem) ? "i" : "a",
      truncationRepair: sourceSubclass === "2-c" ? "supportive-i" : "none",
      compoundStem: sourceStem.includes("-"),
      classSelectionAuthority: "user-selection",
    }) || null : null;
  const generalUseSourceStem = needsGeneralUseShape
    ? nounGeneralUseFrame?.authorizationStatus === "authorized"
      ? nounGeneralUseFrame.generalUseStem : ""
    : sourceStem;
  return { sourceStem, generalUseSourceStem, nounGeneralUseFrame };
}

function buildOwnerhoodSourceAnalysisFrame(source = {}, sourceShape = null, characteristicSource = null) {
  characteristicSource ||= deriveOwnerhoodCharacteristicSource(source);
  if (characteristicSource && !ISSUED_OWNERHOOD_CHARACTERISTIC_SOURCE_FRAMES.has(characteristicSource)) {
    characteristicSource = deriveOwnerhoodCharacteristicSource(source);
  }
  const nounClass = normalizeNounClass(source.nounClass);
  const nounSubclass = normalizeOwnerhoodSubclass(source.nounSubclass);
  const restrictedSourceStem = normalizeStem(source.sourceStem || source.stem);
  const sourceStem = sourceShape ? sourceShape.generalUseSourceStem : restrictedSourceStem;
  const final = finalUnit(sourceStem);
  const finalIDeletionFact = nounClass === "tl" && nounSubclass === "1-b"
    && /i$/u.test(sourceStem)
    && OWNERHOOD_LEXICAL_FACTS[sourceStem.slice(0, -1)]?.exception
      === "subclass-1b-final-i-deletion"
    ? OWNERHOOD_LEXICAL_FACTS[sourceStem.slice(0, -1)] : null;
  const lexicalFacts = OWNERHOOD_LEXICAL_FACTS[sourceStem] || finalIDeletionFact;
  const structuralMatrices = [];
  const eLicensed = (
    (nounClass === "tli" && final !== "h")
    || nounClass === "in"
    || (nounClass === "zero" && !/[aāeēiīoō]$/u.test(sourceStem))
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
    || nounClass === "tli"
    || (nounClass === "tl" && nounSubclass === "2-b")
  );
  if (eLicensed) structuralMatrices.push("ē");
  if (huaLicensed) structuralMatrices.push("huā");
  const matrixOptions = lexicalFacts?.matrixOptions
    ? [...lexicalFacts.matrixOptions]
    : structuralMatrices;
  return deepFreeze({
    kind: "classical-nahuatl-lesson35-ownerhood-source-analysis-frame",
    version: VERSION,
    authorizationStatus: sourceStem && nounClass && characteristicSource?.authorizationStatus !== "blocked"
      ? "authorized"
      : "blocked",
    blockReason: characteristicSource?.blockReason || (!sourceStem || !nounClass ? "typed-ownerhood-source-required" : ""),
    sourceStem,
    sourceShapeRole: "incorporated-nounstem-general-use",
    nounClass,
    nounSubclass,
    ownerhoodCharacteristicSourceFrame: characteristicSource,
    characteristicMatrixRealizationOptions: characteristicSource?.authorizationStatus === "authorized"
      ? characteristicSource.realizationOptions : [],
    finalUnit: final,
    matrixOptions,
    eBoundaryVariants: nounClass === "tl" && ["2-a", "2-a-glottal"].includes(nounSubclass)
      && /[āēīō]$/u.test(sourceStem) ? ["y-embed", "unmodified"]
      : lexicalFacts?.eBoundaryVariants || (lexicalFacts?.ownerhoodYVariantAvailable
        ? ["ordinary", "y-embed"] : ["ordinary"]),
    abundantBoundaryVariants: ["l", "z", "x", "ch", "tz"].includes(final)
      ? ["ordinary", "single-writing"] : ["ordinary"],
    matrixChoiceRequired: matrixOptions.length > 1,
    matrixChoiceDerivedAutomatically: matrixOptions.length === 1,
    lexicalException: lexicalFacts?.exception || "",
    lexicalExceptionOnly: Boolean(lexicalFacts),
    structuralRuleApplied: lexicalFacts ? "lexical-exception" : "class-and-final-edge",
    supportiveFinalIDeletesBeforeE:
      nounClass === "tl" && nounSubclass === "2-c",
    lexicalFinalIDeletesBeforeE: Boolean(finalIDeletionFact),
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

function getOwnerhoodSourceAnalysis(source = {}, target = globalThis) {
  const capture = source.canonicalNncResult ? captureOwnerhoodNncSource(source.canonicalNncResult, target, source.adjectivalIncorporationAnalysis) : null;
  if (source.canonicalNncResult && !isOwnerhoodNncSourceCapture(capture)) return capture;
  if (isOwnerhoodNncSourceCapture(capture)) source = {...source, sourceStem: capture.sourceStem,
    nounClass: capture.nounClass, nounSubclass: capture.nounSubclass};
  const characteristic = deriveOwnerhoodCharacteristicSource(source, capture);
  return buildOwnerhoodSourceAnalysisFrame(source, buildOwnerhoodNounGeneralUse(source, target), characteristic);
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

function buildOwnerhoodOperation(request = {}, preparedSourceFrame = null, target = globalThis) {
  const declaredSource = request.source && typeof request.source === "object" ? request.source : request;
  const hasExactParent = Object.prototype.hasOwnProperty.call(request, "canonicalNncResult");
  const ownerhoodSourceCaptureFrame = hasExactParent
    ? captureOwnerhoodNncSource(request.canonicalNncResult, target, request.adjectivalIncorporationAnalysis) : null;
  if (hasExactParent && !isOwnerhoodNncSourceCapture(ownerhoodSourceCaptureFrame)) {
    return { sourceFrame: null, operationFrame: null,
      blockReason: ownerhoodSourceCaptureFrame.blockReason };
  }
  if (hasExactParent && declaredSource.sourceStem
    && normalizeStem(declaredSource.sourceStem) !== ownerhoodSourceCaptureFrame.sourceStem) {
    return { sourceFrame: null, operationFrame: null,
      blockReason: "35.9-ownerhood-declared-source-conflicts-with-exact-parent" };
  }
  let source = hasExactParent ? {
    ...declaredSource,
    sourceStem: ownerhoodSourceCaptureFrame.sourceStem,
    nounClass: ownerhoodSourceCaptureFrame.nounClass,
    nounSubclass: ownerhoodSourceCaptureFrame.nounSubclass,
  } : declaredSource;
  const ownerhoodCharacteristicSourceFrame = deriveOwnerhoodCharacteristicSource(source, ownerhoodSourceCaptureFrame);
  const requestedCharacteristicRealization = normalizeKey(request.characteristicMatrixRealization
    || source.characteristicMatrixRealization);
  if (ownerhoodCharacteristicSourceFrame?.authorizationStatus === "blocked"
    || requestedCharacteristicRealization && !ownerhoodCharacteristicSourceFrame
    || requestedCharacteristicRealization && !["full", "omitted"].includes(requestedCharacteristicRealization)) return {
      sourceFrame: null, operationFrame: null,
      blockReason: ownerhoodCharacteristicSourceFrame?.blockReason || "40.8-characteristic-ownerhood-source-required",
    };
  const characteristicMatrixRealization = ownerhoodCharacteristicSourceFrame
    ? requestedCharacteristicRealization || "full" : "not-applicable";
  if (ownerhoodCharacteristicSourceFrame) source = {
    ...source,
    sourceStem: characteristicMatrixRealization === "omitted"
      ? ownerhoodCharacteristicSourceFrame.representativeSourceStem
      : ownerhoodCharacteristicSourceFrame.fullSourceStem,
    nounClass: ownerhoodCharacteristicSourceFrame.sourceNounClass,
    nounSubclass: ownerhoodCharacteristicSourceFrame.sourceNounSubclass,
  };
  const { sourceStem, generalUseSourceStem, nounGeneralUseFrame } =
    buildOwnerhoodNounGeneralUse(source, target, preparedSourceFrame);
  let sourceFrame = buildSourceFrame({
    ...request,
    source: {
      ...source,
      sourceStem: generalUseSourceStem,
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
  if (ownerhoodCharacteristicSourceFrame) {
    sourceFrame = deepFreeze({...sourceFrame, ownerhoodCharacteristicSourceFrame});
    ISSUED_SOURCE_FRAMES.add(sourceFrame);
  }
  const nounClass = normalizeNounClass(source.nounClass);
  const ownerhoodSourceAnalysisFrame =
    buildOwnerhoodSourceAnalysisFrame(source, { generalUseSourceStem }, ownerhoodCharacteristicSourceFrame);
  const matrix = ownerhoodMatrixForSource(
    source,
    ownerhoodSourceAnalysisFrame
  );
  if (!nounClass || !matrix) {
    return { sourceFrame, operationFrame: null, blockReason: "35.9-ownerhood-matrix-not-licensed-for-typed-source-class" };
  }
  const boundaryVariants = matrix === "ē"
    ? ownerhoodSourceAnalysisFrame.eBoundaryVariants
    : matrix === "yō-ā" ? ownerhoodSourceAnalysisFrame.abundantBoundaryVariants : ["ordinary"];
  const boundaryVariant = normalizeKey(request.ownerhoodBoundaryVariant || "")
    || boundaryVariants[0];
  if (!boundaryVariants.includes(boundaryVariant)) return {
    sourceFrame, operationFrame: null,
    blockReason: "35.9-ownerhood-boundary-variant-not-licensed",
  };
  let restrictedUse = "";
  const boundaryPhoneFrames = [];
  const boundaryAuthorized = frame => Boolean(
    target.isClassicalNahuatlTranscriptionAnalysisFrame?.(frame)
    && frame.authorizationStatus === "authorized"
  );
  if (matrix === "ē") {
    let incorporatedStem = sourceFrame.sourceStem;
    if (nounGeneralUseFrame?.exposedFinalMFrame?.applies) {
      const frame = target.buildClassicalNahuatlConsonantPhoneShiftFrame?.({
        sourceConsonant: "m", position: "exposed",
        followingVocableBeginsWithVowel: true, grammaticalConstruction: true,
      });
      if (!boundaryAuthorized(frame)) return {
        sourceFrame, operationFrame: null,
        blockReason: "35.9-ownerhood-nasal-boundary-owner-required",
      };
      incorporatedStem = `${nounGeneralUseFrame.underlyingGeneralUseStem.slice(0, -1)}${frame.outputSpelling}`;
      boundaryPhoneFrames.push(frame);
    }
    if (/uh$/u.test(incorporatedStem)) {
      const frame = target.buildClassicalNahuatlSpellingChangeFrame?.({
        phoneme: "[w]", syllablePosition: "initial", followingVowel: "e",
      });
      if (!boundaryAuthorized(frame)) return {
        sourceFrame, operationFrame: null,
        blockReason: "35.9-ownerhood-w-boundary-owner-required",
      };
      incorporatedStem = `${incorporatedStem.slice(0, -2)}${frame.outputSpelling}`;
      boundaryPhoneFrames.push(frame);
    }
    if (/(?<!u)c$/u.test(incorporatedStem)) {
      const frame = target.buildClassicalNahuatlSpellingChangeFrame?.({
        phoneme: "/k/", syllablePosition: "initial", followingVowel: "e",
      });
      if (!boundaryAuthorized(frame)) return {
        sourceFrame, operationFrame: null,
        blockReason: "35.9-ownerhood-k-boundary-owner-required",
      };
      incorporatedStem = `${incorporatedStem.slice(0, -1)}${frame.outputSpelling}`;
      boundaryPhoneFrames.push(frame);
    }
    if (
      (ownerhoodSourceAnalysisFrame.supportiveFinalIDeletesBeforeE
        || ownerhoodSourceAnalysisFrame.lexicalFinalIDeletesBeforeE)
      && /i$/u.test(incorporatedStem)
    ) {
      incorporatedStem = incorporatedStem.slice(0, -1);
    }
    if (boundaryVariant === "y-embed") {
      const frame = target.buildClassicalNahuatlConsonantPhoneShiftFrame?.({
        sourceConsonant: "glottal", position: "nonfinal", followingVowel: "e",
        grammaticalConstruction: true,
      });
      if (!boundaryAuthorized(frame)) return {
        sourceFrame, operationFrame: null,
        blockReason: "35.9-ownerhood-glottal-boundary-owner-required",
      };
      // The class-shaped underlying vowel keeps its quantity. This is the
      // ownership embed alternation, not Lesson2.15's lexical shortening.
      incorporatedStem = `${incorporatedStem}${frame.outputSpelling.replace(/e$/u, "")}`;
      boundaryPhoneFrames.push(frame);
    } else if (boundaryVariant === "t-for-glottal") {
      incorporatedStem = incorporatedStem.replace(/h$/u, "t");
    } else if (
      boundaryVariant !== "unmodified"
      && ownerhoodSourceAnalysisFrame.glottalizedFinalHMayBecomeYBeforeE
      && /h$/u.test(incorporatedStem)
    ) {
      incorporatedStem = `${incorporatedStem.slice(0, -1)}y`;
    }
    if (ownerhoodSourceAnalysisFrame.finalZSpellsCBeforeE) {
      incorporatedStem = incorporatedStem.replace(/z$/u, "c");
    }
    restrictedUse = joinMorphs([incorporatedStem, "eh", "0"]);
  } else if (matrix === "huā") {
    let stem = sourceFrame.sourceStem;
    if (/(?:uh|hu)$/u.test(stem)) {
      const frame = target.buildClassicalNahuatlConsonantLossFrame?.({
        leftConsonant: "w", rightConsonant: "w", grammaticalConstruction: true,
      });
      if (!boundaryAuthorized(frame) || frame.lostSide !== "left") return {
        sourceFrame, operationFrame: null,
        blockReason: "35.9-ownerhood-w-coalescence-owner-required",
      };
      stem = stem.slice(0, -2);
      boundaryPhoneFrames.push(frame);
    }
    restrictedUse = joinMorphs([stem, "huah", "0"]);
  } else {
    const final = finalUnit(sourceFrame.sourceStem);
    let incorporated = assimilateCharacteristicYō(sourceFrame.sourceStem, "o");
    if (["l", "z", "x", "ch", "tz"].includes(final)) {
      const assimilation = target.buildClassicalNahuatlAssimilationFrame?.({
        leftConsonant: final, rightConsonant: "y", grammaticalConstruction: true,
        sourceLeftMorpheme: sourceFrame.sourceStem, sourceRightMorpheme: "yo",
      });
      const length = target.buildClassicalNahuatlConsonantalLengthFrame?.({
        leftConsonant: final, rightConsonant: final, grammaticalConstruction: true,
      });
      if (!boundaryAuthorized(assimilation) || !boundaryAuthorized(length)) return {
        sourceFrame, operationFrame: null, blockReason: "35.10-assimilation-owner-required",
      };
      boundaryPhoneFrames.push(assimilation, length);
      // Andrews permits single writing of the long consonant; the phonological
      // contact and both canonical witnesses remain unchanged.
      if (boundaryVariant === "single-writing") incorporated = joinMorphs([sourceFrame.sourceStem, "o"]);
    }
    restrictedUse = joinMorphs([incorporated, "h", "0"]);
  }
  const generalUse = joinMorphs([restrictedUse, "cā"]);
  const operationFrame = deepFreeze({
    kind: "classical-nahuatl-deverbal-nnc-operation-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    operationId: `ownerhood:${matrix}`,
    constructionKind: "ownerhood",
    nominalizationKind: "preterit-agentive",
    ownerhoodSourceCaptureFrame,
    ownerhoodCharacteristicSourceFrame,
    characteristicMatrixRealization,
    characteristicMatrixRealizationOptions: ownerhoodCharacteristicSourceFrame?.realizationOptions || [],
    ownerhoodMatrix: matrix,
    ownerhoodKind: matrix === "yō-ā" ? "abundant-ownerhood" : "ordinary-ownerhood",
    sourceNounClass: nounClass,
    sourceNounSubclass: normalizeOwnerhoodSubclass(source.nounSubclass),
    ownerhoodSourceAnalysisFrame,
    nounGeneralUseFrame,
    restrictedUseNounSourceStem: sourceStem,
    availableOwnerhoodMatrices:
      ownerhoodSourceAnalysisFrame.matrixOptions,
    ownerhoodMatrixChoiceRequired:
      ownerhoodSourceAnalysisFrame.matrixChoiceRequired,
    ownerhoodBoundaryFrame: deepFreeze({
      kind: "classical-nahuatl-lesson35-ownerhood-boundary-frame",
      version: VERSION,
      boundaryVariant,
      boundaryVariants,
      boundaryPhoneFrames: deepFreeze(boundaryPhoneFrames),
      underlyingMatrix: matrix === "yō-ā" ? "yo-ā" : matrix,
      realizedPreteritMatrix: matrix === "ē"
        ? "eh"
        : matrix === "huā"
          ? "huah"
          : "yo-h",
      finalPreteritMorph: "0",
      preteritOnly: true,
      finiteVncContinuation: "connective-t-only",
      phonologicalConsonantLength: matrix === "yō-ā" && boundaryPhoneFrames.length ? "long" : "",
      writtenConsonantLength: matrix === "yō-ā" && boundaryPhoneFrames.length
        ? boundaryVariant === "single-writing" ? "single" : "double" : "",
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
    singularConnectorChoice: matrix === "yō-ā"
      ? "silent" : normalizeKey(request.numberConnector || "silent"),
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
  const exactInputResult = result;
  if (isClassicalNahuatlDeverbalNncGrammarFrame(result)) result = result.canonicalResult;
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
  const isDerivedAction = (
    ["active-action", "potential-patient"].includes(context.operationFrame?.actionKind)
    && ["z", "liz"].includes(context.operationFrame?.actionSuffix)
    && (action?.exactVncResultIdentityPreserved
      || context.operationFrame.actionKind === "active-action"
        && sourceDeverbalNounstemAxisFrame?.sourceEvidenceKind === "typed-morphemic-source"
        && sourceDeverbalNounstemAxisFrame.canonicalSourceFrame === context.sourceFrame
        && ISSUED_SOURCE_FRAMES.has(context.sourceFrame)
        && context.sourceFrame.sourceStage === "future-core")
    && sourceDeverbalNounstemAxisFrame?.authorizationStatus
      === "authorized"
    && sourceDeverbalNounstemAxisFrame.structuralContractSatisfied === true
  );
  if (!isPredicateAction && !isDerivedAction) {
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
    : `owner-issued-${context.operationFrame.actionKind}-nnc-result`;
  const derivationKind = isPredicateAction
    ? `${predicateActionKind}-characteristic`
    : `${context.operationFrame.actionKind}-${context.operationFrame.actionSuffix}`;
  const frame = deepFreeze({
    kind: "classical-nahuatl-action-nnc-continuation-capture-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    blockReason: "",
    canonicalActionNncResult: exactInputResult,
    canonicalActionNncSourceFrame: context.sourceFrame,
    canonicalActionNncOperationFrame: context.operationFrame,
    sourceDeverbalNounstemAxisFrame: isDerivedAction
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
  const canonicalNncGrammarFrame = isClassicalNahuatlDeverbalNncGrammarFrame(result)
    ? result : null;
  result = canonicalNncGrammarFrame?.canonicalResult || result;
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
  if (operation?.patientiveGeneralUseUnresolved === true) return deepFreeze({
    kind: "classical-nahuatl-patientive-nnc-matrix-continuation-capture-frame",
    version: VERSION, authorizationStatus: "blocked",
    blockReason: "39.2-patientive-general-use-class-required",
    grammarAuthority: false, callerSuppliedAuthorityAccepted: false,
    formulaStringAuthority: false, surfaceStringAuthority: false,
  });
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
  const canonicalPatientiveCoreSourceFrame =
    ISSUED_PATIENTIVE_CORE_SOURCES.has(context.sourceFrame?.patientiveCoreSourceFrame)
    && context.sourceFrame.sourceCapturedFromExactCoreSource === true
      ? context.sourceFrame.patientiveCoreSourceFrame : null;
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
  const patientiveEmbedStem = normalizeStem(
    operation?.targetStems?.generalUse || projection.predicateStem
  );
  const predicateMorphs = patientiveEmbedStem
    .split("-").filter(Boolean);
  const participantCarriersMatch = participantCarrierSequence.length > 0
    && participantCarrierSequence.every(
      (carrier, index) => predicateMorphs[index] === carrier
    );
  const participantSeparatedSourceStem = participantCarriersMatch
    ? predicateMorphs.slice(participantCarrierSequence.length).join("-")
    : patientiveEmbedStem;
  const characteristicFoundation = characteristicPropertyPatientive
    ? operation?.characteristicPatientiveFoundationFrame || null
    : null;
  const characteristicMatrixFullEmbedStem = characteristicPropertyPatientive
    ? normalizeStem(
      characteristicFoundation?.characteristicPatientiveTargetStem
        || operation?.targetStems?.restrictedUse || projection.predicateStem
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
    canonicalNncGrammarFrame,
    canonicalPatientiveNncResult: result,
    canonicalPatientiveSourceFrame: context.sourceFrame,
    canonicalPatientiveOperationFrame: operation,
    sourceDeverbalNounstemAxisFrame,
    canonicalVncResult,
    canonicalPatientiveCoreSourceFrame,
    continuationProjection: projection,
    sourceUnit: "owner-issued-patientive-nnc-result",
    sourceStage: "derived-patientive-nounstem",
    sourceStem: characteristicMatrixFullEmbedStem || patientiveEmbedStem,
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
    verbalAncestryPreserved: Boolean(canonicalVncResult || canonicalPatientiveCoreSourceFrame),
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
  let embedClassAlternatives = source.embedClassAlternatives;
  let embedClassFormGuidanceFrame = null;
  if (embedStem && !embedSourceClass && embedClassAlternatives === undefined) {
    const guidance = target.getClassicalNahuatlClassFormGuidance?.(embedStem);
    if (!guidance || normalizeStem(guidance.stem) !== embedStem
      || guidance.classAuthorized !== false || guidance.candidateStatus !== "guidance-only"
      || !Array.isArray(guidance.candidateClasses) || !guidance.candidateClasses.length) {
      return { sourceFrame: null, operationFrame: null, canonicalResult: null,
        blockReason: "38.2.2-embed-class-form-guidance-unavailable" };
    }
    // §14.2 bounds consonant-final hypotheses, not actual lexical membership.
    // Their invariant bound use can be proved without selecting a class. The
    // vowel-final/truncatable cases require consequential Source information.
    if (guidance.endsInVowel !== false) {
      return { sourceFrame: null, operationFrame: null, canonicalResult: null,
        blockReason: "38.2.2-unresolved-embed-class-common-use-not-established" };
    }
    embedClassFormGuidanceFrame = deepFreeze({ ...guidance,
      candidateClasses: [...guidance.candidateClasses],
    });
    embedClassAlternatives = Object.freeze([...guidance.candidateClasses]);
  }
  const constrainedEmbedSource = embedClassAlternatives !== undefined;
  if (!embedStem || (!embedClass && !constrainedEmbedSource)) {
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
      ...(constrainedEmbedSource ? { embedClassAlternatives } : {}),
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
    canonicalPatientiveCoreSourceFrame: capture.canonicalPatientiveCoreSourceFrame,
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
    embedClassFormGuidanceFrame,
    embedClassAlternativesSource: embedClassFormGuidanceFrame
      ? "form-compatible-hypotheses"
      : constrainedEmbedSource ? "provided-source-constraints" : "provided-source-class",
    classMembershipKnown: Boolean(embedClass),
    selectedEmbedClass: embedClass || "",
    selectedRelation: embedRole,
    matrixStem,
    matrixClass,
    compoundStem: compoundOperation.compoundStem || "",
    embedShapeFrame: compoundOperation.embedShape || null,
    embedClassConstraintFrame: compoundOperation.embedClassConstraintFrame || null,
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
  const explicitMatrixSourceClass = normalizeKey(
    source.matrixSourceClass || request.matrixSourceClass
  );
  const matrixNounClass = normalizeNounClass(
    source.matrixNounClass || source.matrixClass || request.matrixNounClass
      || request.matrixClass
  ) || normalizeNounClass(explicitMatrixSourceClass)
    || nounClassFromCompoundSourceClass(explicitMatrixSourceClass);
  // A citation class does not identify a general-use subclass. Preserve
  // an expressly supplied analysis; otherwise keep the citation coarse.
  const matrixSourceClass = explicitMatrixSourceClass || matrixNounClass;
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
  const originalTypeThreeObjectRequests = Object.freeze(
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
  const typeThreeReflexiveTransition = isPossessiveTlaniTypeThreeCausative
    ? projectClassicalNahuatlRetainedReflexiveShuntline(originalTypeThreeObjectRequests)
    : null;
  const inheritedTypeThreeObjectRequests = typeThreeReflexiveTransition
    ?.targetObjectRequests || originalTypeThreeObjectRequests;
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
      complementTargetReferenceId: normalizeKey(
        request.complementTargetReferenceId || source.complementTargetReferenceId,
      ),
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
      originalPatientiveObjectRequests: originalTypeThreeObjectRequests,
      retainedSourceReflexiveShuntlineRuleFrame: typeThreeReflexiveTransition?.ruleFrame || null,
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
    const characteristicMatrix = actionCapture?.characteristicContinuationAvailable === true
      && matrixStem === "yō" && matrixClass === "tl";
    const characteristicUse = characteristicMatrix
      ? target.buildClassicalNahuatlNounstemSourceFrame?.(compoundStem, {
        nounClass: "tl", tlSubclass: "1B", classSelectionAuthority: "user-selection",
        state: "possessive", subject: request.subject || "3common",
        sourceStructure: "compound",
        compoundSourceConstituents: [continuationSourceStem, matrixStem],
      }) : null;
    if (characteristicMatrix && characteristicUse?.authorizationStatus !== "authorized") {
      return { sourceFrame, operationFrame: null, canonicalResult: null,
        blockReason: characteristicUse?.blockReason || "canonical-characteristic-use-owner-required" };
    }
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
      targetStems: { restrictedUse: compoundStem, generalUse: characteristicUse?.generalUseStem || compoundStem },
      characteristicUseSourceFrame: characteristicUse,
      possessivePredicateContactFrame: actionCapture?.canonicalActionNncOperationFrame
        ?.possessivePredicateContactFrame || null,
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
    if (relation === "object" && sourceState !== "possessive" && !actionCapture) {
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
        ...(actionCapture?.actionKind === "active-action"
          && isClassicalNahuatlDeverbalNncGrammarFrame(actionCapture.canonicalActionNncResult)
          && actionCapture.canonicalActionNncResult.constructionKind === "deverbal-action"
          ? {embedConstituent: {kind: "action-nnc", stem: continuationSourceStem,
            resultFrame: actionCapture.canonicalActionNncResult}} : {}),
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
    // Written alternatives describe this issued boundary; they never replace
    // its grammar, accepted surface, or exact continuation parent.
    const leftSibilant = continuationSourceStem.match(/(?:tz|ch|z|x)$/u)?.[0];
    const rightSibilant = matrixStem.match(/^(?:tz|ch|z|x)/u)?.[0];
    const leftWriting = target.realizeClassicalNahuatlNncSurfaceCarrier?.(continuationSourceStem);
    const rightWriting = target.realizeClassicalNahuatlNncSurfaceCarrier?.(matrixStem);
    const preservedWriting = leftSibilant && rightSibilant
      ? target.buildClassicalNahuatlAssimilationFrame?.({
        leftConsonant: leftSibilant, rightConsonant: rightSibilant,
        sourceLeftMorpheme: leftWriting,
        sourceRightMorpheme: rightWriting,
        grammaticalConstruction: true, spellingStyle: "source-preserving",
      }) : null;
    const writtenRepresentationFrames = [];
    if (actionCapture
      && canonicalResult?.authorizationStatus === "authorized"
      && target.isClassicalNahuatlTranscriptionAnalysisFrame?.(preservedWriting)
      && preservedWriting.authorizationStatus === "authorized"
      && preservedWriting.selectedRuleId === "cn-l2-211-regressive-sibilant-group"
      && preservedWriting.outputForm === canonicalResult.wordSurface) {
      for (const spellingStyle of ["fully-assimilated", "contracted"]) {
        const writing = target.buildClassicalNahuatlAssimilationFrame?.({
          leftConsonant: leftSibilant, rightConsonant: rightSibilant,
          sourceLeftMorpheme: leftWriting,
          sourceRightMorpheme: rightWriting,
          grammaticalConstruction: true, spellingStyle,
        });
        if (target.isClassicalNahuatlTranscriptionAnalysisFrame?.(writing)
          && writing.authorizationStatus === "authorized") {
          writtenRepresentationFrames.push(writing);
        }
      }
    }
    const operationFrame = deepFreeze({
      kind: "classical-nahuatl-deverbal-nnc-operation-frame",
      version: VERSION,
      authorizationStatus: canonicalResult?.authorizationStatus || "blocked",
      operationId: `verbal-continuation:${relation}`,
      writtenRepresentationFrames,
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
  const canonicalNncGrammarFrame = isClassicalNahuatlDeverbalNncGrammarFrame(result)
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
    || !["preterit-agentive", "customary-agentive-full"].includes(
      context.operationFrame?.nominalizationKind
    )
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
  const numberConnector = num1 && !["0", "Ø", "⎕"].includes(num1)
    ? joinMorphs([num1, num2 && !["0", "Ø", "⎕"].includes(num2) ? num2 : ""])
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
  preparedSourceFrame = null,
  target = globalThis,
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
  const customary = capture.canonicalOperationFrame.nominalizationKind === "customary-agentive-full";
  const finalIFacts = customary
    ? getClassicalNahuatlCustomaryAgentiveFinalIBoundaryFacts(suppliedResult, {useKind: "vocative"}, target) : null;
  const finalIRealization = normalizeKey(request.finalIRealization
    || finalIFacts?.selectedRealization || "preserve");
  if ((customary && (finalIFacts.authorizationStatus !== "authorized"
      || !finalIFacts.availableRealizations.includes(finalIRealization)))
    || (!customary && finalIRealization !== "preserve")) return {
    sourceFrame: null, operationFrame: null,
    blockReason: finalIFacts?.blockReason || "36.3-vocative-final-i-realization-not-licensed",
  };
  const selectedSourceStem = customary
    ? finalIRealization === "drop" ? finalIFacts.droppedStem : finalIFacts.preservedStem
    : capture.sourceStem;
  const source = {
    sourceStem: selectedSourceStem,
    wordStem: selectedSourceStem,
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
  } else if (request.hToYVariant === true) {
    return {sourceFrame, operationFrame: null,
      blockReason: "35.13-h-to-y-vocative-requires-final-glottal"};
  }
  const slots = capture.canonicalTypedSlotFrame.slots;
  const silent = carrier => ["0", "Ø", "⎕"].includes(carrier);
  let predicate = customary ? selectedSourceStem : slots.predicate.stem;
  let num1 = slots.number.num1;
  let num2 = slots.number.num2;
  if (["c", "qui"].includes(connector)) num1 = "qu";
  if (connector === "silent" && stemFinal === "c") predicate = predicate.replace(/c-0$/u, "qu-0");
  if (request.hToYVariant === true) {
    if (!silent(num2)) num2 = num2.replace(/h$/u, "y");
    else predicate = predicate.replace(/h-0$/u, "y-0");
  }
  // This is display of the selected typed boundaries, not formula admission.
  const originalPredicate = slots.predicate.stem;
  const originalNumber = `${slots.number.num1}-${slots.number.num2}#`;
  const vocativeFormula = capture.canonicalNncResult.formulaRealization
    .replace(`(${originalPredicate})`, `(${predicate})`)
    .replace(new RegExp(`${originalNumber.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&")}$`, "u"), `${num1}-${num2}#é`);
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
    finalIRealization,
    customaryAgentiveFinalIBoundaryFrame: customary ? deepFreeze({
      ...finalIFacts, selectedRealization: finalIRealization, selectedStem: selectedSourceStem,
    }) : null,
    sourceNumberConnector: connector,
    vocativeParticle: "é",
    vocativeSurface: `${vocativeStem.replace(/[0Ø⎕-]/gu, "")}é`,
    vocativeFormula,
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
  } else if (constructionKind === "predicate-citation") {
    built = buildInstrumentiveCitationOperation(request, target);
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
    built = buildOwnerhoodOperation(request, preparedSourceFrame, target);
  } else if (["nominal-continuation", "verbal-continuation"].includes(constructionKind)) {
    built = buildContinuationOperation(request, target, preparedSourceFrame);
  } else if (constructionKind === "vocative") {
    built = buildVocativeOperation(request, preparedSourceFrame, target);
  } else {
    built = buildDoubleNucleusOwnerhoodOperation(request);
  }
  if (!built?.operationFrame || built.blockReason) {
    return buildBlockedFrame(
      built?.blockReason || "lessons35-39-operation-blocked",
      request,
      { sourceFrame: built?.sourceFrame || null,
        canonicalResult: built?.canonicalResult || null }
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
    && ["predicate-nominalization", "ownerhood"].includes(constructionKind)
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
        && ["active-action", "potential-patient"].includes(operationFrame.actionKind)
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
    target,
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
    formulaRealization: operationFrame.vocativeFormula || canonicalResult?.formulaRealization || "",
    wordSurface: constructionKind === "vocative"
      ? operationFrame.vocativeSurface
      : canonicalResult?.wordSurface
        || canonicalResult?.surfaceRealization
        || "",
    sentenceSurface: canonicalResult?.sentenceSurface || "",
    boundMaterialOnly: operationFrame.boundMaterialOnly === true,
    standaloneSentenceAuthorized: operationFrame.boundMaterialOnly !== true,
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
  if (authorized && operationFrame.boundMaterialOnly === true) BOUND_CUSTOMARY_AGENTIVE_NNC_MATERIAL.add(result);
  if (authorized && operationFrame.nominalizationKind === "preterit-agentive"
    && canonicalResult?.nncSlotFrame) {
    PRETERIT_NNC_SLOT_PARENTS.set(canonicalResult.nncSlotFrame, result);
  }
  if (authorized && ["customary-agentive-full", "customary-agentive-reanalysis"].includes(operationFrame.nominalizationKind)
    && canonicalResult?.nncSlotFrame) {
    CUSTOMARY_NNC_SLOT_PARENTS.set(canonicalResult.nncSlotFrame, result);
  }
  return result;
}

function getPreteritNncNegativeEmbedProjection(sentence, target) {
  if (target.isClassicalNahuatlIssuedNncSentenceSurfaceFrame?.(sentence) !== true
    || sentence.polarity !== "negative" || sentence.sentenceType !== "assertion"
    || sentence.sentencePrefixalStack?.length !== 1
    || sentence.sentencePrefixalStack[0] !== "ah#") return null;
  const parent = PRETERIT_NNC_SLOT_PARENTS.get(sentence.sourceNncSlotFrame);
  if (!parent || !isClassicalNahuatlDeverbalNncGrammarFrame(parent)
    || parent.canonicalResult.nncSlotFrame !== sentence.sourceNncSlotFrame) return null;
  return deepFreeze({
    kind: "classical-nahuatl-preterit-nnc-negative-embed-projection",
    authorizationStatus: "authorized", canonicalParentResult: parent,
    canonicalSentenceResult: sentence, typedSlotFrame: sentence.sourceNncSlotFrame,
    stem: parent.operationFrame.targetStems.generalUse,
    prefixalStack: sentence.sentencePrefixalStack, semanticScope: "incorporated-embed",
    grammarAuthority: false, callerSuppliedAuthorityAccepted: false,
    formulaStringAuthority: false, surfaceStringAuthority: false,
  });
}

function getPreteritNncVocativeProjection(source, options, target) {
  // The exact parent owns predicate and number. A positive sentence wrapper
  // may carry those same issued slots; spelling and copied frames cannot.
  let parent = isClassicalNahuatlDeverbalNncGrammarFrame(source) ? source : null;
  if (!parent && PREDICATE_NNC_CONTINUATION_CONTEXTS.has(source)) {
    parent = PRETERIT_NNC_SLOT_PARENTS.get(source.nncSlotFrame)
      || CUSTOMARY_NNC_SLOT_PARENTS.get(source.nncSlotFrame) || null;
  }
  if (!parent
    && target.isClassicalNahuatlIssuedNncSentenceSurfaceFrame?.(source) === true
    && source.polarity === "positive" && source.sentenceType === "assertion"
    && !source.sentencePrefixalStack?.length) {
    parent = PRETERIT_NNC_SLOT_PARENTS.get(source.sourceNncSlotFrame)
      || CUSTOMARY_NNC_SLOT_PARENTS.get(source.sourceNncSlotFrame) || null;
  }
  if (!parent || !isClassicalNahuatlDeverbalNncGrammarFrame(parent)) return null;
  if (source !== parent && parent.operationFrame.nominalizationKind === "customary-agentive-full"
    && ![parent.canonicalResult.nncSlotFrame.slots.number.num1,
      parent.canonicalResult.nncSlotFrame.slots.number.num2]
      .every(carrier => ["0", "Ø", "⎕"].includes(normalizeStem(carrier)))) return null;
  const boundary = evaluateGrammar({constructionKind: "vocative",
    canonicalNncResult: parent, hToYVariant: options?.hToYVariant === true,
    ...(options?.finalIRealization ? {finalIRealization: options.finalIRealization} : {})}, target);
  if (boundary.authorizationStatus !== "authorized") return null;
  return deepFreeze({
    kind: "classical-nahuatl-preterit-nnc-vocative-projection",
    exactSourceResult: source, canonicalParentResult: parent,
    typedSlotFrame: parent.canonicalResult.nncSlotFrame,
    canonicalBoundaryResult: boundary, surface: boundary.wordSurface,
    formula: boundary.formulaRealization,
    grammarAuthority: false, formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
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
    getClassicalNahuatlPreteritNncNegativeEmbedProjection:
      sentence => getPreteritNncNegativeEmbedProjection(sentence, semanticTarget),
    getClassicalNahuatlPreteritNncVocativeProjection:
      (source, options = {}) => getPreteritNncVocativeProjection(source, options, semanticTarget),
    getClassicalNahuatlOwnerhoodSourceAnalysis:
      source => getOwnerhoodSourceAnalysis(source, semanticTarget),
    captureClassicalNahuatlNncSourceForOwnerhood:
      (result, analysis = null) => captureOwnerhoodNncSource(result, semanticTarget, analysis),
    isClassicalNahuatlOwnerhoodNncSourceCaptureFrame: isOwnerhoodNncSourceCapture,
    getClassicalNahuatlPatientiveContrastInventory:
      request => getPatientiveContrastInventory(request, semanticTarget),
    getClassicalNahuatlRootStockPatientiveInventory:
      getRootStockPatientiveInventory,
    evaluateClassicalNahuatlDeverbalNnc:
      request => evaluateGrammar(request, semanticTarget),
    buildClassicalNahuatlPatientiveCoreSourceFrame:
      request => buildPatientiveCoreSource(request, semanticTarget),
    buildClassicalNahuatlAdverbialNominalPredicateSourceFrame:
      request => buildAdverbialNominalPredicateSource(request, semanticTarget),
    isClassicalNahuatlAdverbialNominalPredicateSourceFrame:
      isAdverbialNominalPredicateSource,
    isClassicalNahuatlPatientiveCoreSourceFrame:
      frame => ISSUED_PATIENTIVE_CORE_SOURCES.has(frame),
    buildClassicalNahuatlCharacteristicNounSourceFrame: buildCharacteristicNounSource,
    isClassicalNahuatlCharacteristicNounSourceFrame: isCharacteristicNounSource,
    captureClassicalNahuatlInstrumentiveNncForCitation:
      result => captureInstrumentiveCitation(result, semanticTarget),
    captureClassicalNahuatlFutureAgentiveRestrictedEmbed:
      result => captureFutureAgentiveRestrictedEmbed(result, semanticTarget),
    isClassicalNahuatlFutureAgentiveRestrictedEmbedReceipt:
      receipt => ISSUED_FUTURE_RESTRICTED_EMBEDS.has(receipt),
    buildClassicalNahuatlLexicalizedPresentNncSourceFrame:
      result => buildLexicalizedPresentNncSource(result, semanticTarget),
    getClassicalNahuatlLexicalizedPresentNncSourceParent:
      source => LEXICALIZED_PRESENT_NNC_PARENTS.get(source) || null,
    isClassicalNahuatlInstrumentiveCitationCaptureFrame:
      frame => isInstrumentiveCitationCapture(frame, semanticTarget),
    captureClassicalNahuatlObsoleteRootVncGeneralUse:
      result => capturePreteritVncResult(result, semanticTarget, "obsolete-root", true),
    captureClassicalNahuatlPreteritVncResultForNominalization:
      (result, sourceAnalysis = "ordinary") => (
        capturePreteritVncResult(result, semanticTarget, sourceAnalysis)
      ),
    captureClassicalNahuatlVncResultForPredicateNominalization:
      (result, nominalizationKind, state = "absolutive") => (
        capturePredicateNominalizationVncResult(
          result,
          nominalizationKind,
          state,
          semanticTarget
        )
      ),
    captureClassicalNahuatlVncResultForPredicateNominalizationBatch:
      (result, specifications) => capturePredicateNominalizationVncResultBatch(
        result, specifications, semanticTarget,
      ),
    isClassicalNahuatlPredicateNominalizationVncCaptureBatchFrame,
    captureClassicalNahuatlVncResultForDeverbalAction:
      result => captureDeverbalActionVncResult(result, semanticTarget),
    captureClassicalNahuatlPassiveVncResultForPatientive:
      result => capturePassivePatientiveVncResult(result, semanticTarget),
    captureClassicalNahuatlImpersonalVncResultForPatientive:
      result => captureImpersonalPatientiveVncResult(result, semanticTarget),
    captureClassicalNahuatlTypeTwoReconstructedNonactiveSourceForPatientive:
      result => captureTypeTwoReconstructedNonactivePatientiveSource(result, semanticTarget),
    captureClassicalNahuatlPerfectiveVncResultForPatientive:
      result => capturePerfectivePatientiveVncResult(result, semanticTarget),
    captureClassicalNahuatlImperfectiveVncResultForPatientive:
      result => captureImperfectivePatientiveVncResult(
        result,
        semanticTarget
      ),
    captureClassicalNahuatlVncResultForRootStockPatientive:
      result => captureRootStockPatientiveVncResult(result, semanticTarget),
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
    isClassicalNahuatlTypeTwoReconstructedNonactivePatientiveCaptureFrame,
    isClassicalNahuatlPerfectivePatientiveVncCaptureFrame,
    isClassicalNahuatlImperfectivePatientiveVncCaptureFrame,
    isClassicalNahuatlRootStockPatientiveVncCaptureFrame,
    isClassicalNahuatlCharacteristicPatientiveNncCaptureFrame,
    isClassicalNahuatlActionNncContinuationCaptureFrame,
    isClassicalNahuatlPatientiveNncContinuationCaptureFrame,
    buildClassicalNahuatlInstrumentiveSourcePairFrame:
      request => buildInstrumentiveSourcePairFrame(request, semanticTarget),
    isClassicalNahuatlInstrumentiveSourcePairFrame,
    getClassicalNahuatlDeverbalNncSlotExternalObject:
      frame => ISSUED_NNC_SLOT_FRAMES.has(frame)
        ? ISSUED_NNC_EXTERNAL_OBJECTS.get(frame) || null : null,
    isClassicalNahuatlIssuedDeverbalNncSlotFrame:
      frame => ISSUED_NNC_SLOT_FRAMES.has(frame)
        && semanticTarget.isClassicalNahuatlNncSlotFrame?.(frame) === true,
    isClassicalNahuatlLexicalAuthorizationFrame,
    isClassicalNahuatlDeverbalNncGrammarFrame,
    getClassicalNahuatlPreteritNncRestrictedUseCitationProjection:
      result => getClassicalNahuatlPreteritNncRestrictedUseCitationProjection(
        result,
        semanticTarget
      ),
    isClassicalNahuatlPreteritNncRestrictedUseCitationProjection:
      frame => isClassicalNahuatlPreteritNncRestrictedUseCitationProjection(
        frame,
        semanticTarget
      ),
    getClassicalNahuatlPredicateNncRestrictedUseCitationProjection:
      result => getClassicalNahuatlPredicateNncRestrictedUseCitationProjection(result, semanticTarget),
    isClassicalNahuatlPredicateNncRestrictedUseCitationProjection:
      frame => isClassicalNahuatlPredicateNncRestrictedUseCitationProjection(frame, semanticTarget),
    getClassicalNahuatlCustomaryAgentiveFinalIBoundaryFacts:
      (result, options = {}) => getClassicalNahuatlCustomaryAgentiveFinalIBoundaryFacts(result, options, semanticTarget),
    buildClassicalNahuatlCustomaryAgentiveBoundaryConstituent:
      (result, options = {}) => buildClassicalNahuatlCustomaryAgentiveBoundaryConstituent(result, options, semanticTarget),
    isClassicalNahuatlCustomaryAgentiveBoundaryConstituent:
      (frame, parent = null) => isClassicalNahuatlCustomaryAgentiveBoundaryConstituent(frame, parent, semanticTarget),
    isClassicalNahuatlBoundCustomaryAgentiveNncMaterial,
    getClassicalNahuatlDeverbalActionNncRestrictedUseCitationProjection:
      result => getClassicalNahuatlDeverbalActionNncRestrictedUseCitationProjection(result, semanticTarget),
    isClassicalNahuatlDeverbalActionNncRestrictedUseCitationProjection:
      frame => isClassicalNahuatlDeverbalActionNncRestrictedUseCitationProjection(frame, semanticTarget),
    getClassicalNahuatlPatientiveNncRestrictedUseCitationProjection:
      result => getClassicalNahuatlPatientiveNncRestrictedUseCitationProjection(result, semanticTarget),
    isClassicalNahuatlPatientiveNncRestrictedUseCitationProjection:
      frame => isClassicalNahuatlPatientiveNncRestrictedUseCitationProjection(frame, semanticTarget),
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
