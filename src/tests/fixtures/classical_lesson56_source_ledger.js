"use strict";

// Test-only Lesson 56 source ledger. Nothing in this file is installed into the
// runtime or may authorize a generated form.

const crypto = require("crypto");

const SOURCE_DOCUMENT = "ANDREWS_TRANSCRIPTION_CANVAS.md";
const SOURCE_LINE_START = 24065;
const SOURCE_LINE_END = 24704;
const SOURCE_SHA256 = "825419308d8c489da9efd5cfce63456f83f31dd4756ea1bbb14eca1c9700ca36";
const EXPECTED_FORMULA_BEARING_LINE_COUNT = 133;

const SECTION_SPANS = Object.freeze([
  Object.freeze({ section: "56.1", lineStart: 24065, lineEnd: 24109, path: "personal-name-two-tier-gcd" }),
  Object.freeze({ section: "56.2.1.a", lineStart: 24110, lineEnd: 24217, path: "preterit-and-preterit-as-present-agentive" }),
  Object.freeze({ section: "56.2.1.b", lineStart: 24218, lineEnd: 24268, path: "present-agentive" }),
  Object.freeze({ section: "56.2.1.c", lineStart: 24269, lineEnd: 24296, path: "customary-present-agentive" }),
  Object.freeze({ section: "56.2.1.d", lineStart: 24297, lineEnd: 24304, path: "purposive-past-agentive" }),
  Object.freeze({ section: "56.2.1.e", lineStart: 24305, lineEnd: 24334, path: "inner-reflexive-controller" }),
  Object.freeze({ section: "56.2.1.f", lineStart: 24335, lineEnd: 24342, path: "passive-preterit-patientive" }),
  Object.freeze({ section: "56.2.1.g", lineStart: 24343, lineEnd: 24368, path: "impersonal-preterit-agentive" }),
  Object.freeze({ section: "56.2.2.a", lineStart: 24369, lineEnd: 24479, path: "absolutive-and-truncated-inner-number" }),
  Object.freeze({ section: "56.2.2.b", lineStart: 24480, lineEnd: 24504, path: "possessive-state" }),
  Object.freeze({ section: "56.3.1", lineStart: 24505, lineEnd: 24527, path: "subject-supplementation" }),
  Object.freeze({ section: "56.3.2", lineStart: 24528, lineEnd: 24546, path: "possessor-supplementation-and-false-positive" }),
  Object.freeze({ section: "56.3.3", lineStart: 24547, lineEnd: 24574, path: "adjectival-modification" }),
  Object.freeze({ section: "56.3.4", lineStart: 24575, lineEnd: 24588, path: "adverbial-modification" }),
  Object.freeze({ section: "56.3.5", lineStart: 24589, lineEnd: 24613, path: "calendar-name-shapes" }),
  Object.freeze({ section: "56.4", lineStart: 24614, lineEnd: 24642, path: "conjunctorless-personal-name-unit" }),
  Object.freeze({ section: "56.5", lineStart: 24643, lineEnd: 24683, path: "sentence-title-vocative-adjunctor-scope" }),
  Object.freeze({ section: "56.5-note-1", lineStart: 24684, lineEnd: 24691, path: "god-name-normal-nnc-reranking" }),
  Object.freeze({ section: "56.5-note-2", lineStart: 24692, lineEnd: 24704, path: "god-name-place-name-embed" }),
]);

const REQUIRED_RULE_IDS = Object.freeze([
  "complete-statement-downgrade",
  "two-tier-inner-outer-predicate",
  "two-tier-inner-outer-subject",
  "outer-number-always-zero-zero",
  "inner-subject-preemptive-barrier",
  "quoted-predicate-translation",
  "bracket-paraphrase-not-structure",
  "source-vnc-or-nnc",
  "honorific-inner-number-shield",
  "incorporated-embed-not-subject",
  "honorific-general-use-agentive-alternative",
  "inner-nonanimate-outer-animate",
  "customary-ni-i-loss-optional",
  "customary-applicative-object-absence",
  "purposive-co-not-locative",
  "reflexive-controlled-by-inner-subject",
  "passive-source-to-preterit-patientive",
  "impersonal-source-nonspecific-inner-subject",
  "truncated-inner-number-optionality",
  "affective-inner-vs-outer-scope",
  "outer-affective-forces-inner-number-zero",
  "possessive-inner-possessor-shield",
  "whole-adjunction-unit-downgrade",
  "supplementation-vs-statement-false-positive",
  "adjectival-vs-subject-supplementation-ambiguity",
  "supportive-i-absence",
  "calendar-person-date-relation",
  "calendar-personalizing-thing",
  "conjunction-inner-subject-fusion",
  "conjunction-outer-subject-fusion",
  "conjunctive-compound-distinct-alternative",
  "title-nnc-not-name-nnc",
  "vocative-collocation",
  "adjunctor-each-conjunct",
  "adjunctor-whole-unit",
  "adjunctor-absent",
  "god-name-normal-nnc-plural-rights",
  "god-name-place-name-embed",
]);

const GENERATIVE_DISPOSITIONS = Object.freeze([
  "owner-generated",
  "contextual-owner-realization",
]);

function defineClaim({
  id,
  section,
  lineStart,
  lineEnd,
  anchor,
  canonicalObjectKind = "classical-nahuatl-personal-name-source-frame",
  factRole,
  disposition,
  conflictingPath,
  executionCases = [],
}) {
  const generative = GENERATIVE_DISPOSITIONS.includes(disposition);
  return Object.freeze({
    id,
    section,
    lineStart,
    lineEnd,
    anchor,
    canonicalObjectKind,
    sourceObjectKind: "classical-nahuatl-personal-name-source-frame",
    sharedOperationId: "nnc:personal-name",
    factRole,
    disposition,
    conflictingPath,
    proofIds: Object.freeze([
      `lesson56:${id}:canvas-exact`,
      `lesson56:${id}:${generative ? "owner-execution" : "non-authoritative-disposition"}`,
    ]),
    executionCases: Object.freeze(
      executionCases.map(executionCase => Object.freeze({
        ...executionCase,
        sourceOptions: Object.freeze({
          ...(executionCase.sourceOptions || {}),
        }),
        operationOptions: Object.freeze({
          ...(executionCase.operationOptions || {}),
        }),
        clauseOptions: Object.freeze({
          ...(executionCase.clauseOptions || {}),
        }),
        sentenceOptions: Object.freeze({
          ...(executionCase.sentenceOptions || {}),
        }),
      }))
    ),
  });
}

// Claim-level evidence only.  The exact anchors identify Andrews' statements;
// they are never imported into the runtime and cannot select a source family,
// operation, formula, or surface.
const LESSON56_CLAIMS = Object.freeze([
  defineClaim({
    id: "complete-statement-downgrade",
    section: "56.1",
    lineStart: 24083,
    lineEnd: 24085,
    anchor: "an entire statement ( consisting of one or more nuclear clauses) is downgraded to the rank of",
    factRole: "composition-rule",
    disposition: "owner-generated",
    conflictingPath: "flat-word-personal-name",
    executionCases: [{ sourceFamily: "preterit-agentive" }],
  }),
  defineClaim({
    id: "two-tier-inner-outer-predicate",
    section: "56.1",
    lineStart: 24085,
    lineEnd: 24089,
    anchor: "are then two predicates, an inner one and an outer one",
    factRole: "source-structure",
    disposition: "owner-generated",
    conflictingPath: "single-flat-predicate",
    executionCases: [{ sourceFamily: "preterit-agentive" }],
  }),
  defineClaim({
    id: "two-tier-inner-outer-subject",
    section: "56.1",
    lineStart: 24087,
    lineEnd: 24090,
    anchor: "inner subject) cooperating with the inner predicate and one (the outer subject) serving as the",
    factRole: "source-structure",
    disposition: "owner-generated",
    conflictingPath: "merged-inner-and-outer-subject",
    executionCases: [{ sourceFamily: "preterit-agentive" }],
  }),
  defineClaim({
    id: "outer-number-always-zero-zero",
    section: "56.1",
    lineStart: 24090,
    lineEnd: 24092,
    anchor: "The number position of the outer subject pronoun always has the morphic dyad",
    factRole: "derived-constraint",
    disposition: "owner-generated",
    conflictingPath: "outer-number-copied-from-inner",
    executionCases: [{ sourceFamily: "preterit-agentive" }],
  }),
  defineClaim({
    id: "inner-subject-preemptive-barrier",
    section: "56.1",
    lineStart: 24092,
    lineEnd: 24094,
    anchor: "it acts as a barrier that prevents the outer subject pronoun from having direct commerce",
    factRole: "restriction",
    disposition: "owner-generated",
    conflictingPath: "outer-subject-controls-inner-predicate",
    executionCases: [{ sourceFamily: "reflexive-preterit-agentive" }],
  }),
  defineClaim({
    id: "quoted-predicate-translation",
    section: "56.1",
    lineStart: 24099,
    lineEnd: 24104,
    anchor: "NNC has a quoted quality that gives it a different feeling from what it originally had as a",
    factRole: "derived-read-only-translation",
    disposition: "typed-derived-read-only",
    conflictingPath: "translation-selects-generated-name",
  }),
  defineClaim({
    id: "bracket-paraphrase-not-structure",
    section: "56.1",
    lineStart: 24105,
    lineEnd: 24108,
    anchor: "are totally foreign to Nahuatl.",
    canonicalObjectKind: "documentary-translation-evidence",
    factRole: "documentary-example",
    disposition: "documentary-non-authoritative",
    conflictingPath: "bracket-paraphrase-authorizes-grammar",
  }),
  defineClaim({
    id: "source-vnc-or-nnc",
    section: "56.2",
    lineStart: 24110,
    lineEnd: 24112,
    anchor: "name can be a VNC or an NNC.",
    factRole: "source-structure",
    disposition: "owner-generated",
    conflictingPath: "lesson-specific-renamed-source",
    executionCases: [
      { sourceFamily: "preterit-agentive" },
      { sourceFamily: "absolutive-state-nnc" },
    ],
  }),
  defineClaim({
    id: "honorific-inner-number-shield",
    section: "56.2.1.a",
    lineStart: 24125,
    lineEnd: 24131,
    anchor: "inner subject pronoun's number dyad filler c-Ø.",
    factRole: "boundary-conditioned-restriction",
    disposition: "owner-generated",
    conflictingPath: "affective-matrix-contacts-inner-predicate",
    executionCases: [{
      sourceFamily: "preterit-agentive",
      operationOptions: {
        affectiveScope: "outer-name",
        affectiveMatrix: "tzin",
      },
    }],
  }),
  defineClaim({
    id: "incorporated-embed-not-subject",
    section: "56.2.1.b",
    lineStart: 24254,
    lineEnd: 24263,
    anchor: "The nounstem filling the embed subposition of a compound",
    factRole: "negative-restriction",
    disposition: "negative-fail-closed",
    conflictingPath: "incorporated-embed-promoted-to-subject",
  }),
  defineClaim({
    id: "honorific-general-use-agentive-alternative",
    section: "56.2.1.a",
    lineStart: 24168,
    lineEnd: 24174,
    anchor: "honorific formed on the general-use preterit-agentive stem",
    factRole: "genuine-grammar-choice",
    disposition: "owner-generated",
    conflictingPath: "collapse-general-use-and-outer-affective",
    executionCases: [{
      sourceFamily: "preterit-agentive",
      operationOptions: {
        affectiveScope: "general-use-agentive",
        affectiveMatrix: "tzin",
      },
    }],
  }),
  defineClaim({
    id: "inner-nonanimate-outer-animate",
    section: "56.2.1.a",
    lineStart: 24204,
    lineEnd: 24211,
    anchor: "the inner subject is nonanimate while the outer one is animate.",
    factRole: "derived-constraint",
    disposition: "owner-generated",
    conflictingPath: "force-inner-outer-referent-identity",
    executionCases: [{
      sourceFamily: "preterit-as-present-agentive",
      clauseOptions: { subjectReference: "nonanimate" },
      outerSubject: "2sg",
    }],
  }),
  defineClaim({
    id: "customary-ni-i-loss-optional",
    section: "56.2.1.c",
    lineStart: 24280,
    lineEnd: 24282,
    anchor: "of the /i/ of the customary-present tense morph ni is optional",
    factRole: "contextual-realization",
    disposition: "contextual-owner-realization",
    conflictingPath: "fixed-supportive-i-in-customary-name",
    executionCases: [{
      sourceFamily: "customary-present-agentive",
      clauseOptions: { predicateMorphs: ["cui", "liā", "n"] },
    }],
  }),
  defineClaim({
    id: "customary-applicative-object-absence",
    section: "56.2.1.c",
    lineStart: 24277,
    lineEnd: 24279,
    anchor: "Notice the lack of the applicative",
    factRole: "restriction",
    disposition: "owner-generated",
    conflictingPath: "restore-source-applicative-object-from-example",
    executionCases: [{
      sourceFamily: "customary-present-agentive",
    }],
  }),
  defineClaim({
    id: "purposive-co-not-locative",
    section: "56.2.1.d",
    lineStart: 24454,
    lineEnd: 24457,
    anchor: "the co, which some have taken to be the locative relational nounstem",
    factRole: "negative-restriction",
    disposition: "owner-generated",
    conflictingPath: "route-purposive-co-through-locative-nnc",
    executionCases: [{
      sourceFamily: "purposive-past-agentive",
      clauseOptions: {
        predicateMorphs: ["chān", "ti", "⎕", "c", "o", "Ø"],
      },
    }],
  }),
  defineClaim({
    id: "reflexive-controlled-by-inner-subject",
    section: "56.2.1.e",
    lineStart: 24304,
    lineEnd: 24308,
    anchor: "because of the preemptive control of the inner subject",
    factRole: "derived-constraint",
    disposition: "owner-generated",
    conflictingPath: "outer-subject-controls-inner-reflexive",
    executionCases: [{
      sourceFamily: "reflexive-preterit-agentive",
      outerSubject: "1sg",
    }],
  }),
  defineClaim({
    id: "passive-source-to-preterit-patientive",
    section: "56.2.1.f",
    lineStart: 24332,
    lineEnd: 24338,
    anchor: "that stem is a preterit-patientive NNC",
    factRole: "source-structure",
    disposition: "owner-generated",
    conflictingPath: "flatten-passive-source-as-active-agentive",
    executionCases: [{
      sourceFamily: "passive-preterit-patientive",
    }],
  }),
  defineClaim({
    id: "impersonal-source-nonspecific-inner-subject",
    section: "56.2.1.g",
    lineStart: 24341,
    lineEnd: 24346,
    anchor: "pronoun is nonspecific while the outer one is specific",
    factRole: "source-structure",
    disposition: "owner-generated",
    conflictingPath: "force-impersonal-inner-subject-specific",
    executionCases: [{
      sourceFamily: "impersonal-preterit-agentive",
      clauseOptions: { subjectReference: "nonspecific" },
    }],
  }),
  defineClaim({
    id: "truncated-inner-number-optionality",
    section: "56.2.2.a",
    lineStart: 24409,
    lineEnd: 24412,
    anchor: "personal-name NNCs appear only in this truncated-inner-subject formation; others use it",
    factRole: "genuine-grammar-choice",
    disposition: "owner-generated",
    conflictingPath: "single-fixed-inner-number-analysis",
    executionCases: [
      { sourceFamily: "absolutive-state-nnc" },
      { sourceFamily: "absolutive-state-truncated-inner-number" },
    ],
  }),
  defineClaim({
    id: "affective-inner-vs-outer-scope",
    section: "56.2.2.a",
    lineStart: 24459,
    lineEnd: 24465,
    anchor: "The affective matrix has the option of embedding",
    factRole: "genuine-grammar-choice",
    disposition: "owner-generated",
    conflictingPath: "collapse-inner-and-outer-affective-scope",
    executionCases: [
      {
        sourceFamily: "absolutive-state-nnc",
        operationOptions: {
          affectiveScope: "inner-source",
          affectiveMatrix: "tzin",
        },
      },
      {
        sourceFamily: "absolutive-state-nnc",
        operationOptions: {
          affectiveScope: "outer-name",
          affectiveMatrix: "tzin",
        },
      },
    ],
  }),
  defineClaim({
    id: "outer-affective-forces-inner-number-zero",
    section: "56.2.2.a",
    lineStart: 24463,
    lineEnd: 24468,
    anchor: "The affective matrix stem always forces the inner subject pronoun's",
    factRole: "derived-constraint",
    disposition: "owner-generated",
    conflictingPath: "retain-overt-inner-number-under-outer-affective",
    executionCases: [{
      sourceFamily: "absolutive-state-nnc",
      operationOptions: {
        affectiveScope: "outer-name",
        affectiveMatrix: "tzin",
      },
      clauseOptions: {
        numberPrefix: "tl",
        numberSuffix: "Ø",
      },
    }],
  }),
  defineClaim({
    id: "possessive-inner-possessor-shield",
    section: "56.2.2.b",
    lineStart: 24480,
    lineEnd: 24490,
    anchor: "prevents the outer subject pronoun from having direct commerce with",
    factRole: "restriction",
    disposition: "owner-generated",
    conflictingPath: "outer-subject-rewrites-inner-possessor",
    executionCases: [{
      sourceFamily: "possessive-state-nnc",
      outerSubject: "1sg",
    }],
  }),
  defineClaim({
    id: "whole-adjunction-unit-downgrade",
    section: "56.3",
    lineStart: 24505,
    lineEnd: 24509,
    anchor: "entire structure is downgraded to the role of predicate in a personal-name NNC.",
    factRole: "composition-rule",
    disposition: "owner-generated",
    conflictingPath: "downgrade-only-one-adjunction-clause",
    executionCases: [{ sourceFamily: "subject-supplementation" }],
  }),
  defineClaim({
    id: "supplementation-vs-statement-false-positive",
    section: "56.3.2",
    lineStart: 24539,
    lineEnd: 24545,
    anchor: "two-tiered structure of personal-name NNCs, having merely a statement structure instead.",
    canonicalObjectKind: "personal-name-nnc-negative-classification",
    factRole: "negative-restriction",
    disposition: "negative-fail-closed",
    conflictingPath: "capitalized-statement-promoted-to-name",
  }),
  defineClaim({
    id: "adjectival-vs-subject-supplementation-ambiguity",
    section: "56.3.3",
    lineStart: 24547,
    lineEnd: 24551,
    anchor: "This could also be understood as \"the monkey is big,\" a structure of",
    factRole: "contextual-alternative",
    disposition: "owner-generated",
    conflictingPath: "force-single-modification-analysis",
    executionCases: [{
      sourceFamily: "adjectival-modification",
      sourceOptions: {
        modificationAmbiguity: "also-subject-supplementation",
      },
    }],
  }),
  defineClaim({
    id: "supportive-i-absence",
    section: "56.3.3",
    lineStart: 24558,
    lineEnd: 24560,
    anchor: "the supportive [i] at the end of",
    factRole: "contextual-realization",
    disposition: "contextual-owner-realization",
    conflictingPath: "restore-supportive-i-across-name-boundary",
    executionCases: [{
      sourceFamily: "adjectival-modification",
      clauseOptions: { predicateMorphs: ["cuāuh", "tl"] },
    }],
  }),
  defineClaim({
    id: "calendar-person-date-relation",
    section: "56.3.5",
    lineStart: 24588,
    lineEnd: 24592,
    anchor: "The name suggests some special relation of the person to the date",
    factRole: "contextual-source-fact",
    disposition: "owner-generated",
    conflictingPath: "calendar-label-authorizes-name-without-typed-source",
    executionCases: [
      { sourceFamily: "calendar-double-nucleus" },
      { sourceFamily: "calendar-single-nucleus" },
      { sourceFamily: "calendar-day-sign" },
    ],
  }),
  defineClaim({
    id: "calendar-personalizing-thing",
    section: "56.3.5",
    lineStart: 24608,
    lineEnd: 24613,
    anchor: "Calendrical names were also used as personalizing names for certain things.",
    factRole: "source-structure",
    disposition: "owner-generated",
    conflictingPath: "force-every-calendar-name-referent-human",
    executionCases: [{
      sourceFamily: "calendar-personalizing-thing",
      sourceOptions: { referentKind: "thing" },
    }],
  }),
  defineClaim({
    id: "conjunction-inner-subject-fusion",
    section: "56.4",
    lineStart: 24614,
    lineEnd: 24621,
    anchor: "inner subject pronouns constitute what amounts to one single subject",
    factRole: "composition-rule",
    disposition: "owner-generated",
    conflictingPath: "flatten-conjunct-inner-subjects",
    executionCases: [{
      sourceFamily: "conjunctorless-personal-name-unit",
    }],
  }),
  defineClaim({
    id: "conjunction-outer-subject-fusion",
    section: "56.4",
    lineStart: 24619,
    lineEnd: 24621,
    anchor: "subject pronouns constitute what amounts to another single subject.",
    factRole: "composition-rule",
    disposition: "owner-generated",
    conflictingPath: "independently-inflect-conjunct-outer-subjects",
    executionCases: [{
      sourceFamily: "conjunctorless-personal-name-unit",
      outerSubject: "2sg",
    }],
  }),
  defineClaim({
    id: "conjunctive-compound-distinct-alternative",
    section: "56.4",
    lineStart: 24629,
    lineEnd: 24636,
    anchor: "Yohualehehcatl, which contains as its predicate a",
    factRole: "documentary-alternative",
    disposition: "typed-derived-read-only",
    conflictingPath: "collapse-conjunction-and-compound-analysis",
  }),
  defineClaim({
    id: "title-nnc-not-name-nnc",
    section: "56.5",
    lineStart: 24652,
    lineEnd: 24656,
    anchor: "Here Tlācatēuctli is not a personal-",
    canonicalObjectKind: "classical-nahuatl-personal-name-sentence-operation",
    factRole: "sentence-composition-rule",
    disposition: "owner-generated",
    conflictingPath: "title-label-authorizes-personal-name-shell",
    executionCases: [{
      sourceFamily: "preterit-agentive",
      sentenceOperation: "title-contrast",
    }],
  }),
  defineClaim({
    id: "vocative-collocation",
    section: "56.5",
    lineStart: 24657,
    lineEnd: 24665,
    anchor: "Chālchiuhtlatōnactze!",
    canonicalObjectKind: "classical-nahuatl-personal-name-sentence-operation",
    factRole: "sentence-composition-rule",
    disposition: "owner-generated",
    conflictingPath: "vocative-label-authorizes-personal-name",
    executionCases: [{
      sourceFamily: "preterit-agentive",
      sentenceOperation: "vocative-collocation",
    }],
  }),
  defineClaim({
    id: "adjunctor-each-conjunct",
    section: "56.5",
    lineStart: 24670,
    lineEnd: 24674,
    anchor: "An adjunctor appears before each",
    canonicalObjectKind: "classical-nahuatl-personal-name-sentence-operation",
    factRole: "genuine-grammar-choice",
    disposition: "owner-generated",
    conflictingPath: "single-restored-adjunctor-scope",
    executionCases: [{
      sourceFamily: "conjunctorless-personal-name-unit",
      sentenceOperation: "adjunctor-before-each-conjunct",
    }],
  }),
  defineClaim({
    id: "adjunctor-whole-unit",
    section: "56.5",
    lineStart: 24675,
    lineEnd: 24678,
    anchor: "An adjunctor appears before the name",
    canonicalObjectKind: "classical-nahuatl-personal-name-sentence-operation",
    factRole: "genuine-grammar-choice",
    disposition: "owner-generated",
    conflictingPath: "single-restored-adjunctor-scope",
    executionCases: [{
      sourceFamily: "conjunctorless-personal-name-unit",
      sentenceOperation: "adjunctor-before-whole-unit",
    }],
  }),
  defineClaim({
    id: "adjunctor-absent",
    section: "56.5",
    lineStart: 24679,
    lineEnd: 24681,
    anchor: "No adjunctor is associated with the personal-name unit.",
    canonicalObjectKind: "classical-nahuatl-personal-name-sentence-operation",
    factRole: "genuine-grammar-choice",
    disposition: "owner-generated",
    conflictingPath: "mandatory-adjunctor-insertion",
    executionCases: [{
      sourceFamily: "conjunctorless-personal-name-unit",
      sentenceOperation: "adjunctor-absent",
    }],
  }),
  defineClaim({
    id: "god-name-normal-nnc-plural-rights",
    section: "56.5-note-1",
    lineStart: 24682,
    lineEnd: 24690,
    anchor: "acquiring the right to have a plural personal pronoun as subject.",
    canonicalObjectKind: "classical-nahuatl-personal-name-sentence-operation",
    factRole: "reranking-operation",
    disposition: "owner-generated",
    conflictingPath: "god-name-remains-personal-name-shell-after-reranking",
    executionCases: [{
      sourceFamily: "absolutive-state-nnc",
      sourceOptions: { referentKind: "god" },
      sentenceOperation: "god-name-to-normal-nnc",
      sentenceOptions: { ordinaryNncSubject: "3pl" },
    }],
  }),
  defineClaim({
    id: "god-name-place-name-embed",
    section: "56.5-note-2",
    lineStart: 24691,
    lineEnd: 24701,
    anchor: "The name of a god can appear as an embed in a place-name NNC",
    canonicalObjectKind: "classical-nahuatl-personal-name-sentence-operation",
    factRole: "reranking-operation",
    disposition: "owner-generated",
    conflictingPath: "unanalyzed-place-name-fixture",
    executionCases: [{
      sourceFamily: "absolutive-state-nnc",
      sourceOptions: { referentKind: "god" },
      sentenceOperation: "god-name-to-place-name-embed",
      sentenceOptions: { locativeMatrix: "tlā-n" },
    }],
  }),
]);

const REQUIRED_EXAMPLE_LABELS = Object.freeze([
  "tiTemōc", "tiTemōctzin", "Cuāuhtemōc", "niCuācuauhpitzāhuac",
  "niChālchiuhtepēhuah", "Tlāltehtecuīn", "Chīmalpāin", "tiPetlāuhtzin",
  "Tēhuetzquitihtzin", "tiTemōcātzin", "tiTenāmmīncātzin", "Tizoquīcātzin",
  "Tizoquic", "tiTlāloc", "tiMilīntoc", "tiMilīntoctzin",
  "Īxhuetzcatocātzin", "tiCuāuhtlahtoa", "tiCuāuhtlahtoātzin",
  "tiChīmalpopōca", "tiNēntlamatitzin", "tiTētlepanquetzatzin",
  "Tlacuiliāni", "Tlacuiliāntzin", "tiNōchcuāni", "Tlahyelcuāni",
  "Tēcōhuanitzin", "tiChimalpāquinitzin", "Chāntico", "niMotelchīuh",
  "niMōtēuczōma", "tiMotēnēhuatzin", "tiTepotzihtōlōc",
  "Ahhuelittōctzin", "tiCītlallatōnac", "tiChālchiuhtlatōnac",
  "nītztlacoliuhqui", "tiTōchin", "niTlīlātl", "tĀhuitzotl",
  "Mācuīlxōchitl", "tiTepoztēcatl", "Huitztzilōpōchtli", "tiPāinal",
  "Ehca", "Āxayaca", "tiTēntlīl", "Tīzoc", "Xīpe", "Huehmac",
  "tiXocotzin", "tiYāōtzin", "tiChāmpōchtzin", "ītzcuauhtzin",
  "tīxtlilton", "niTitlācahuān", "niTocih", "niTotēc", "niTopiltzin",
  "tiTonāntzin", "niCōātl-Īcuē", "tiCoyōtl-Īnāhuāl",
  "tiCitlalli-Īcuē", "tĪcxi-Cōātl", "niCōzahuic-Īnechihual",
  "tiMiztli-Īmā", "Tlohtli-Īix", "tiHuēi-Ozomahtli",
  "tiHuēi-Ozomahtzin", "nIztāc-Coyōtl", "tiCuāuhtl-Ēhuanitl",
  "tiCuāuhtl-Ēhuanitzin", "tiTēuctl-Ēhuac", "niTezcatl-Ihpōca",
  "tīpal-nemohuani", "niTopan-Temōc", "tiNāhui-Ōlin",
  "niChicōme-Cōātl", "nŌmācatl", "Cipactli", "Cipactōnal",
  "Xōchitōnal", "Cē-Cōātl", "tiYohualli tEhehcatl",
  "tiTloqueh tiNāhuaqueh", "NiTēucxōch nicihuātl",
  "Chālchiuhtlatōnactze", "Cuāuhtlequetzque", "tlāloqueh",
  "tiquēquetzalcōāh", "xixipemeh", "tōtotēctin", "Tlālocān",
  "Mācuilxōchic", "Huitztzilōpōchco", "Yōpihco", "Totēcco",
  "Tocihtitlan", "Xipetlān",
]);

function auditClassicalNahuatlLesson56Canvas(canvasText = "") {
  const lines = String(canvasText).split(/\r?\n/u);
  const lessonLines = lines.slice(SOURCE_LINE_START - 1, SOURCE_LINE_END);
  const lessonSlice = lessonLines.join("\n");
  const sourceSha256 = crypto
    .createHash("sha256")
    .update(lessonSlice)
    .digest("hex");
  const formulaBearingLines = [];
  lessonLines.forEach((line, index) => {
    if (line.includes("#") && !line.startsWith("## PDF Page")) {
      formulaBearingLines.push(SOURCE_LINE_START + index);
    }
  });
  const missingExamples = REQUIRED_EXAMPLE_LABELS.filter(label => !lessonLines.some(line => line.includes(label)));
  const uncoveredLines = [];
  for (let lineNumber = SOURCE_LINE_START; lineNumber <= SOURCE_LINE_END; lineNumber += 1) {
    if (!SECTION_SPANS.some(span => lineNumber >= span.lineStart && lineNumber <= span.lineEnd)) {
      uncoveredLines.push(lineNumber);
    }
  }
  const claimEvidence = LESSON56_CLAIMS.map(claim => {
    const spanInBounds =
      Number.isInteger(claim.lineStart)
      && Number.isInteger(claim.lineEnd)
      && claim.lineStart >= SOURCE_LINE_START
      && claim.lineEnd <= SOURCE_LINE_END
      && claim.lineEnd >= claim.lineStart;
    const exactSourceSpan = spanInBounds
      ? lines.slice(claim.lineStart - 1, claim.lineEnd).join("\n")
      : "";
    const anchorExact =
      Boolean(claim.anchor)
      && exactSourceSpan.includes(claim.anchor);
    const sectionOwnsSpan = Array.from(
      { length: claim.lineEnd - claim.lineStart + 1 },
      (_, index) => claim.lineStart + index
    ).every(lineNumber => SECTION_SPANS.some(span => (
      lineNumber >= span.lineStart && lineNumber <= span.lineEnd
    )));
    return Object.freeze({
      id: claim.id,
      lineStart: claim.lineStart,
      lineEnd: claim.lineEnd,
      anchor: claim.anchor,
      spanInBounds,
      sectionOwnsSpan,
      anchorExact,
      exact: spanInBounds && sectionOwnsSpan && anchorExact,
    });
  });
  const claimIds = LESSON56_CLAIMS.map(claim => claim.id);
  const duplicateClaimIds = Array.from(new Set(
    claimIds.filter((id, index) => claimIds.indexOf(id) !== index)
  ));
  const missingClaimIds = REQUIRED_RULE_IDS.filter(
    ruleId => !claimIds.includes(ruleId)
  );
  const unexpectedClaimIds = claimIds.filter(
    claimId => !REQUIRED_RULE_IDS.includes(claimId)
  );
  const allowedDispositions = new Set([
    ...GENERATIVE_DISPOSITIONS,
    "typed-derived-read-only",
    "negative-fail-closed",
    "documentary-non-authoritative",
  ]);
  const invalidClaimSchemaIds = LESSON56_CLAIMS.filter(claim => (
    !claim.section
    || !claim.anchor
    || !claim.canonicalObjectKind
    || claim.sourceObjectKind
      !== "classical-nahuatl-personal-name-source-frame"
    || claim.sharedOperationId !== "nnc:personal-name"
    || !claim.factRole
    || !allowedDispositions.has(claim.disposition)
    || !claim.conflictingPath
    || !Array.isArray(claim.proofIds)
    || claim.proofIds.length !== 2
    || new Set(claim.proofIds).size !== claim.proofIds.length
    || (
      GENERATIVE_DISPOSITIONS.includes(claim.disposition)
      && claim.executionCases.length === 0
    )
    || (
      claim.disposition === "documentary-non-authoritative"
      && claim.executionCases.length !== 0
    )
  )).map(claim => claim.id);
  const duplicateProofIds = (() => {
    const proofIds = LESSON56_CLAIMS.flatMap(claim => claim.proofIds);
    return Array.from(new Set(
      proofIds.filter(
        (proofId, index) => proofIds.indexOf(proofId) !== index
      )
    ));
  })();
  const exactClaimCount = claimEvidence.filter(
    evidence => evidence.exact
  ).length;
  const generativeClaimCount = LESSON56_CLAIMS.filter(
    claim => GENERATIVE_DISPOSITIONS.includes(claim.disposition)
  ).length;
  const documentaryClaimIds = LESSON56_CLAIMS.filter(
    claim => claim.disposition === "documentary-non-authoritative"
  ).map(claim => claim.id);
  const claimBijectionComplete =
    claimIds.length === REQUIRED_RULE_IDS.length
    && duplicateClaimIds.length === 0
    && missingClaimIds.length === 0
    && unexpectedClaimIds.length === 0;
  return Object.freeze({
    sourceDocument: SOURCE_DOCUMENT,
    sourceLineStart: SOURCE_LINE_START,
    sourceLineEnd: SOURCE_LINE_END,
    sourceSha256,
    expectedSourceSha256: SOURCE_SHA256,
    sectionSpanCount: SECTION_SPANS.length,
    ruleCount: REQUIRED_RULE_IDS.length,
    claimCount: LESSON56_CLAIMS.length,
    exactClaimCount,
    generativeClaimCount,
    documentaryClaimIds: Object.freeze(documentaryClaimIds),
    claimBijectionComplete,
    duplicateClaimIds: Object.freeze(duplicateClaimIds),
    missingClaimIds: Object.freeze(missingClaimIds),
    unexpectedClaimIds: Object.freeze(unexpectedClaimIds),
    invalidClaimSchemaIds: Object.freeze(invalidClaimSchemaIds),
    duplicateProofIds: Object.freeze(duplicateProofIds),
    claimEvidence: Object.freeze(claimEvidence),
    exampleCount: REQUIRED_EXAMPLE_LABELS.length,
    formulaBearingLineCount: formulaBearingLines.length,
    expectedFormulaBearingLineCount: EXPECTED_FORMULA_BEARING_LINE_COUNT,
    missingExamples: Object.freeze(missingExamples),
    uncoveredLines: Object.freeze(uncoveredLines),
    complete:
      lessonLines[0] === "LESSON 56"
      && /PDF Page 623/u.test(lessonLines.at(-2) || lessonLines.at(-1) || "")
      && sourceSha256 === SOURCE_SHA256
      && formulaBearingLines.length === EXPECTED_FORMULA_BEARING_LINE_COUNT
      && claimBijectionComplete
      && exactClaimCount === LESSON56_CLAIMS.length
      && invalidClaimSchemaIds.length === 0
      && duplicateProofIds.length === 0
      && missingExamples.length === 0
      && uncoveredLines.length === 0,
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
  GENERATIVE_DISPOSITIONS,
  LESSON56_CLAIMS,
  REQUIRED_EXAMPLE_LABELS,
  auditClassicalNahuatlLesson56Canvas,
};
