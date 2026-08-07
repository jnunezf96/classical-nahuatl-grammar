// Canonical read-only linguistic-concept owner.
//
// The definitions in this module classify typed linguistic Sources.  They do
// not generate Nahuatl, select a lesson, or accept glossary/display text as
// authority.  Claims about an already-built nuclear clause or transcription
// consume the identity-bound Result issued by that semantic owner.

import {
  createGrammarOperationContractOwner,
} from "../grammar/operation_owner.mjs";
import {
  createMorphemeStructureOwnersApi,
} from "./morpheme_structure_owners.mjs";
import {
  createLinguisticStructureOwnersApi,
} from "./linguistic_structure_owners.mjs";
import {
  createCarrierStructureOwnersApi,
} from "./carrier_structure_chain.mjs";
import {
  CLASSICAL_PHONE_REPERTORY_OPTIONALITY_FACTS,
} from "./phone_repertory_facts.mjs";

const CONCEPT_SOURCE_KIND = "classical-grammar-concept-source";
const CONCEPT_RESULT_KIND = "classical-grammar-concept-result";
const CONCEPT_VERSION = 1;
const CONCEPT_APPLICATION_OPERATION_ID = "concept:classification";
const TERMINOLOGY_AUTHORITY_OWNER_ID = "classical-terminology-authority";
const TERMINOLOGY_AUTHORITY_OPERATION_ID =
  "classical.terminology.authority.validate";
const CONCEPT_CLASSIFICATION_OWNER_ID = "classical-concept-classification";
const CONCEPT_CLASSIFICATION_OPERATION_ID =
  "classical.concept.token.classify";
const NUCLEAR_CLAUSE_STRUCTURE_OWNER_ID =
  "classical-nuclear-clause-structure";
const NUCLEAR_CLAUSE_RANK_OPERATION_ID =
  "classical.nuclear-clause.rank.validate";
const COMMUNICATION_STRUCTURE_OWNER_ID =
  "linguistic-communication-structure";
const COMMUNICATION_STRUCTURE_OPERATION_ID =
  "classical.communication.structure.validate";
const ANALYSIS_LEVEL_OWNER_ID = "linguistic-analysis-levels";
const ANALYSIS_LEVEL_OPERATION_ID = "classical.analysis.level.classify";
const ELEMENT_CLASSIFICATION_OWNER_ID = "linguistic-element-classification";
const ELEMENT_CLASSIFICATION_OPERATION_ID =
  "classical.linguistic.element.classify";
const PHONEME_CLASSIFICATION_OWNER_ID = "carrier-phoneme-classification";
const PHONEME_CLASSIFICATION_OPERATION_ID =
  "classical.carrier.phoneme.classify";
const GRAPHEME_CLASSIFICATION_OWNER_ID = "carrier-grapheme-classification";
const GRAPHEME_CLASSIFICATION_OPERATION_ID =
  "classical.carrier.grapheme.classify";
const SIGEME_CLASSIFICATION_OWNER_ID = "carrier-sigeme-classification";
const SIGEME_CLASSIFICATION_OPERATION_ID =
  "classical.carrier.sigeme.classify";
const SEMEME_CLASSIFICATION_OWNER_ID = "content-sememe-classification";
const SEMEME_CLASSIFICATION_OPERATION_ID =
  "classical.content.sememe.classify";
const MORPHEME_TAXONOMY_OWNER_ID = "morpheme-taxonomy";
const MORPHEME_TAXONOMY_OPERATION_ID =
  "classical.morpheme.taxonomy.classify";
const TOKEN_ELEMENT_CLASSIFICATION_OWNER_ID =
  "token-element-classification";
const TOKEN_ELEMENT_CLASSIFICATION_OPERATION_ID =
  "classical.token.element.classify";
const PHONE_REPERTORY_ANALYSIS_OWNER_ID = "phone-repertory-analysis";
const PHONE_REPERTORY_ANALYSIS_OPERATION_ID =
  "classical.carrier.phone.repertory.analyze";
const GRAPH_VARIANT_ANALYSIS_OWNER_ID = "graph-variant-analysis";
const GRAPH_VARIANT_ANALYSIS_OPERATION_ID =
  "classical.carrier.graph.variant.analyze";
const SIG_TOKEN_CLASSIFICATION_OWNER_ID = "sig-token-classification";
const SIG_TOKEN_CLASSIFICATION_OPERATION_ID =
  "classical.carrier.sig.token.classify";
const SEME_TOKEN_CLASSIFICATION_OWNER_ID = "seme-token-classification";
const SEME_TOKEN_CLASSIFICATION_OPERATION_ID =
  "classical.content.seme.token.classify";
const MORPH_TOKEN_CLASSIFICATION_OWNER_ID = "morph-token-classification";
const MORPH_TOKEN_CLASSIFICATION_OPERATION_ID =
  "classical.morpheme.morph.token.classify";
const MORPH_CONDITIONING_ANALYSIS_OWNER_ID = "morph-conditioning-analysis";
const MORPH_CONDITIONING_ANALYSIS_OPERATION_ID =
  "classical.morpheme.morph.conditioning.analyze";
const MORPH_FORM_INSTANCE_CLASSIFICATION_OWNER_ID =
  "morph-form-instance-classification";
const MORPH_FORM_INSTANCE_CLASSIFICATION_OPERATION_ID =
  "classical.morpheme.form.instance.classify";
const MORPH_STRUCTURE_PERCEPTION_ANALYSIS_OWNER_ID =
  "morph-structure-perception-analysis";
const MORPH_STRUCTURE_PERCEPTION_ANALYSIS_OPERATION_ID =
  "classical.morpheme.structure.perception.analyze";
const SILENT_MORPH_CONTRAST_SOURCE_KIND =
  "classical-silent-morph-contrast-source";
const SILENT_MORPH_CONTRAST_RESULT_KIND =
  "classical-silent-morph-contrast-result";
const SILENT_MORPH_CONTRAST_VERSION = 1;
const SILENT_MORPH_CONTRAST_OWNER_ID =
  "silent-morph-contrast-validation";
const SILENT_MORPH_CONTRAST_OPERATION_ID =
  "classical.morpheme.silent.contrast.validate";
const LINGUISTIC_UNIT_COMPOSITION_SOURCE_KIND =
  "classical-linguistic-unit-composition-source";
const LINGUISTIC_UNIT_COMPOSITION_RESULT_KIND =
  "classical-linguistic-unit-composition-result";
const LINGUISTIC_UNIT_COMPOSITION_VERSION = 1;
const LINGUISTIC_UNIT_COMPOSITION_OWNER_ID =
  "linguistic-unit-composition";
const LINGUISTIC_UNIT_COMPOSITION_OPERATION_ID =
  "classical.linguistic.unit.compose";
const LINGUISTIC_STRUCTURE_RECURSION_SOURCE_KIND =
  "classical-linguistic-structure-recursion-source";
const LINGUISTIC_STRUCTURE_RECURSION_RESULT_KIND =
  "classical-linguistic-structure-recursion-result";
const LINGUISTIC_STRUCTURE_RECURSION_VERSION = 1;
const LINGUISTIC_STRUCTURE_RECURSION_OWNER_ID =
  "linguistic-structure-recursion";
const LINGUISTIC_STRUCTURE_RECURSION_OPERATION_ID =
  "classical.linguistic.structure.recurse";
const CARRIER_RANK_TAXONOMY_SOURCE_KIND =
  "classical-carrier-rank-taxonomy-source";
const CARRIER_RANK_TAXONOMY_RESULT_KIND =
  "classical-carrier-rank-taxonomy-result";
const CARRIER_RANK_TAXONOMY_VERSION = 1;
const CARRIER_RANK_TAXONOMY_OWNER_ID = "carrier-rank-taxonomy";
const CARRIER_RANK_TAXONOMY_OPERATION_ID =
  "classical.carrier.rank.taxonomy.classify";
const MEANINGLESS_CARRIER_UNIT_SOURCE_KIND =
  "classical-meaningless-carrier-unit-classification-source";
const MEANINGLESS_CARRIER_UNIT_RESULT_KIND =
  "classical-meaningless-carrier-unit-classification-result";
const MEANINGLESS_CARRIER_UNIT_VERSION = 1;
const MEANINGLESS_CARRIER_UNIT_OWNER_ID =
  "meaningless-carrier-unit-classification";
const MEANINGLESS_CARRIER_UNIT_OPERATION_ID =
  "classical.carrier.meaningless-unit.classify";
const MEANINGFUL_MORPHEME_UNIT_SOURCE_KIND =
  "classical-meaningful-morpheme-unit-classification-source";
const MEANINGFUL_MORPHEME_UNIT_RESULT_KIND =
  "classical-meaningful-morpheme-unit-classification-result";
const MEANINGFUL_MORPHEME_UNIT_VERSION = 1;
const MEANINGFUL_MORPHEME_UNIT_OWNER_ID =
  "meaningful-morpheme-unit-classification";
const MEANINGFUL_MORPHEME_UNIT_OPERATION_ID =
  "classical.morpheme.meaningful-unit.classify";
const MORPHEME_SYLLABLE_SEPARATION_SOURCE_KIND =
  "classical-morpheme-syllable-separation-source";
const MORPHEME_SYLLABLE_SEPARATION_RESULT_KIND =
  "classical-morpheme-syllable-separation-result";
const MORPHEME_SYLLABLE_SEPARATION_VERSION = 1;
const MORPHEME_SYLLABLE_SEPARATION_OWNER_ID =
  "morpheme-syllable-separation";
const MORPHEME_SYLLABLE_SEPARATION_OPERATION_ID =
  "classical.morpheme.syllable.rank.separate";
const DISCONTINUOUS_UNIT_ADMISSIBILITY_SOURCE_KIND =
  "classical-discontinuous-unit-admissibility-source";
const DISCONTINUOUS_UNIT_ADMISSIBILITY_RESULT_KIND =
  "classical-discontinuous-unit-admissibility-result";
const DISCONTINUOUS_UNIT_ADMISSIBILITY_VERSION = 1;
const DISCONTINUOUS_UNIT_ADMISSIBILITY_OWNER_ID =
  "discontinuous-unit-admissibility";
const DISCONTINUOUS_UNIT_ADMISSIBILITY_OPERATION_ID =
  "classical.linguistic.unit.discontinuity.validate";
const DISCONTINUOUS_UNIT_KIND =
  "nahuatl-subject-person-number-unit";
const DOCUMENTARY_STRUCTURE_CLASSIFICATION_OWNER_ID =
  "linguistic-structure-documentary-classification";
const READ_ONLY_PROJECTION_REASON =
  "not-applicable-read-only-non-generative-classification";

const DOCUMENTARY_NUCLEAR_CLAUSE_TERMINOLOGY = Object.freeze({
  nc: Object.freeze({
    english: "nuclear clause",
    spanish: "cláusula nuclear",
    abbreviation: "CN",
    semanticId: "nuclear-clause",
  }),
  vnc: Object.freeze({
    english: "verbal nuclear clause",
    spanish: "cláusula nuclear verbal",
    abbreviation: "CNV",
    semanticId: "verbal-nuclear-clause",
  }),
  nnc: Object.freeze({
    english: "nominal nuclear clause",
    spanish: "cláusula nuclear nominal",
    abbreviation: "CNN",
    semanticId: "nominal-nuclear-clause",
  }),
});

function deepFreeze(value, seen = new WeakSet()) {
  if (!value || typeof value !== "object" || seen.has(value)) {
    return value;
  }
  seen.add(value);
  Reflect.ownKeys(value).forEach((key) => {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (
      descriptor
      && Object.prototype.hasOwnProperty.call(descriptor, "value")
    ) {
      deepFreeze(descriptor.value, seen);
    }
  });
  return Object.freeze(value);
}

function defineConceptSpec({
  domain,
  selection,
  classification,
  semanticOwnerId = "classical-linguistic-concept-owner",
  factRole = "derived-fact",
  facts = [],
  restrictions = [],
  relations = [],
  rejected = false,
  rejectionReason = "",
  requiredOwnerRank = "",
} = {}) {
  return deepFreeze({
    domain,
    selection,
    classification,
    semanticOwnerId,
    factRole,
    facts: [...facts],
    restrictions: [...restrictions],
    relations: [...relations],
    rejected: rejected === true,
    rejectionReason,
    requiredOwnerRank,
  });
}

const MORPHEME_COMMON_FACTS = Object.freeze([
  "morpheme-type-level-linguistic-element",
  "morph-greek-root-means-shape-form",
  "carrier-content-symbiotic-amalgam",
  "sememe-or-sememe-cluster-combines-with-phoneme-unit-or-sigeme",
  "smallest-duality-manifesting-unit",
  "notation-indicates-symbiotic-nature",
  "slash-carrier-gloss-notation-saves-space",
  "carrier-only-representation-may-leave-content-understood",
  "carrier-content-cooperation-constitutes-elements",
  "three-symbiotic-morpheme-kinds",
]);

const MORPHEME_COMMON_RELATIONS = Object.freeze([
  "carrier-is-phoneme-unit-or-sigeme",
  "carrier-system-and-content-system-cooperate-in-morpheme",
]);

const MORPHEME_COMMON_RESTRICTIONS = Object.freeze([
  "grapheme-is-not-full-morpheme-carrier",
  "fraction-format-is-not-canonical-lesson-notation",
  "notation-string-does-not-authorize-morpheme-source",
  "carrier-alone-is-not-morpheme",
  "classification-does-not-generate-morpheme-surface",
]);

const PHONE_VARIANT_ANALYSIS_RESTRICTIONS = Object.freeze([
  "foreign-phone-examples-are-evidence-only",
  "lesson-cross-reference-is-routing-only",
  "phone-symbol-does-not-authorize-phone-repertory-analysis-source",
  "phone-variant-analysis-does-not-apply-an-environment",
  "phone-variant-analysis-does-not-generate-written-surface",
]);

const MEANINGLESS_CARRIER_UNIT_REQUEST_KEYS = new Set([
  "candidateResult",
]);
const MEANINGLESS_CARRIER_UNIT_MEMBER_KINDS = Object.freeze([
  "phoneme",
  "phone",
  "grapheme",
  "graph",
]);
const MEANINGLESS_CARRIER_UNIT_RESTRICTIONS = Object.freeze([
  "membership-requires-an-independently-owner-issued-carrier-result",
  "phoneme-phone-grapheme-and-graph-owners-remain-independent",
  "one-prerequisite-owner-proof-cannot-satisfy-another-owner",
  "the-four-carrier-constituent-kinds-do-not-exhaust-higher-meaningless-unit-ranks",
  "sigemes-cannot-participate-in-the-meaningless-carrier-unit-family",
  "sememes-are-absent-from-the-meaningless-carrier-unit-family",
  "a-family-label-or-stored-catalog-does-not-authorize-membership",
  "copied-prerequisite-results-do-not-retain-owner-authority",
  "carrier-rank-taxonomy-and-rank-formation-are-separately-owned",
  "syllable-and-vocable-structure-are-separately-owned",
  "sig-seme-morph-and-later-hierarchy-owners-remain-separate",
  "classification-does-not-construct-or-upgrade-a-unit",
  "classification-does-not-generate-a-formula-or-surface",
]);

const MEANINGFUL_MORPHEME_UNIT_REQUEST_KEYS = new Set([
  "candidateResult",
]);
const MEANINGFUL_MORPHEME_UNIT_MEMBER_KINDS = Object.freeze([
  "morpheme",
  "morph",
]);
const MEANINGFUL_MORPHEME_UNIT_RESTRICTIONS = Object.freeze([
  "membership-requires-an-independently-owner-issued-morpheme-or-morph-result",
  "morpheme-taxonomy-and-morph-token-classification-remain-independent-owners",
  "one-prerequisite-owner-proof-cannot-satisfy-the-other-owner",
  "a-family-label-or-stored-catalog-does-not-authorize-membership",
  "copied-prerequisite-results-do-not-retain-owner-authority",
  "sigeme-seme-and-carrier-owners-remain-separate",
  "morpheme-syllable-separation-and-coterminality-are-separately-owned",
  "syllable-formation-and-rank-conversion-are-separately-owned",
  "affix-hierarchy-and-combinatorial-types-are-separately-owned",
  "classification-does-not-construct-or-upgrade-a-unit",
  "classification-does-not-generate-a-formula-or-surface",
]);

const MORPHEME_SYLLABLE_SEPARATION_REQUEST_KEYS = new Set([
  "meaningfulUnitResult",
  "syllableRankResult",
  "requestedAnalysisKind",
]);
const MORPHEME_SYLLABLE_ANALYSIS_KINDS = Object.freeze([
  "rank-contrast",
  "coterminality-permission",
  "phonological-system-membership",
  "division-analysis-distinction",
]);
const MORPHEME_SYLLABLE_RANK_CONTRAST_FACTS = Object.freeze([
  "morpheme-or-morph-is-an-element-not-a-combination-or-sequence",
  "morpheme-or-morph-has-meaning-while-a-syllable-does-not",
  "morpheme-or-morph-may-have-a-sigeme-or-sig-as-meaning-carrier",
  "sounded-monophonemic-or-monophonic-carrier-may-be-one-consonant-or-vowel",
  "sounded-polyphonemic-or-polyphonic-carrier-may-be-consonants-alone-or-consonant-vowel-combination",
]);
const MORPHEME_SYLLABLE_COTERMINALITY_FACTS = Object.freeze([
  "morpheme-or-morph-may-be-coterminous-with-a-syllable",
  "coterminality-does-not-merge-morpheme-or-morph-with-syllable-rank",
  "vocable-and-word-analysis-remain-distinct-when-surface-span-is-shared",
]);
const MORPHEME_SYLLABLE_PHONOLOGICAL_MEMBERSHIP_FACTS = Object.freeze([
  "syllables-belong-to-the-phonological-system",
]);
const MORPHEME_SYLLABLE_DIVISION_ANALYSIS_FACTS = Object.freeze([
  "syllable-division-in-a-vocable-is-not-morphological-analysis",
  "particle-and-nuclear-clause-morphology-remain-distinct-from-syllable-division",
]);
function getMorphemeSyllableFacts(analysisKind = "") {
  if (analysisKind === "coterminality-permission") {
    return MORPHEME_SYLLABLE_COTERMINALITY_FACTS;
  }
  if (analysisKind === "phonological-system-membership") {
    return MORPHEME_SYLLABLE_PHONOLOGICAL_MEMBERSHIP_FACTS;
  }
  if (analysisKind === "division-analysis-distinction") {
    return MORPHEME_SYLLABLE_DIVISION_ANALYSIS_FACTS;
  }
  return MORPHEME_SYLLABLE_RANK_CONTRAST_FACTS;
}
function getMorphemeSyllableClassificationStatus(analysisKind = "") {
  return `validated-morpheme-syllable-${analysisKind}`;
}
function getMorphemeSyllableExecutionStepId(analysisKind = "") {
  return `morpheme-syllable-${analysisKind}-validated`;
}
function getMorphemeSyllableExecutionReason(analysisKind = "") {
  if (analysisKind === "coterminality-permission") {
    return "coterminality-permitted-without-rank-merger";
  }
  if (analysisKind === "phonological-system-membership") {
    return "syllable-phonological-system-membership-validated";
  }
  if (analysisKind === "division-analysis-distinction") {
    return "syllable-division-kept-distinct-from-morphological-analysis";
  }
  return "meaningful-element-and-meaningless-syllable-ranks-separated";
}
const MORPHEME_SYLLABLE_SEPARATION_RESTRICTIONS = Object.freeze([
  "meaningful-unit-and-syllable-rank-results-must-be-independently-owner-issued",
  "both-prerequisite-live-routes-remain-distinct-from-current-owner-execution",
  "one-prerequisite-owner-proof-cannot-satisfy-the-other-or-current-owner",
  "labels-stored-contrast-lists-and-syllabic-shape-do-not-authorize-separation",
  "if-and-nest-examples-are-evidence-only",
  "morph-structure-perception-analysis-remains-separately-owned",
  "separation-does-not-construct-or-segment-a-syllable-or-morph",
  "separation-does-not-infer-a-concrete-carrier-or-environment",
  "separation-does-not-rewrite-a-boundary-or-prove-affix-hierarchy",
  "separation-does-not-generate-a-formula-or-surface",
]);

const SIG_TOKEN_CLASSIFICATION_RESTRICTIONS = Object.freeze([
  "displayed-zero-does-not-authorize-sig-token-source",
  "formula-zero-does-not-authorize-sig-token-source",
  "plain-zero-and-square-zero-are-distinct-documentary-symbols",
  "sig-token-classification-does-not-realize-written-surface",
]);

const SEME_TOKEN_CLASSIFICATION_RESTRICTIONS = Object.freeze([
  "translation-gloss-does-not-authorize-seme-token-source",
  "displayed-meaning-does-not-authorize-seme-token-source",
  "seme-token-classification-does-not-generate-meaning-or-translation",
  "seme-token-classification-does-not-realize-written-surface",
]);

const MORPH_TOKEN_CLASSIFICATION_RESTRICTIONS = Object.freeze([
  "english-morph-examples-are-evidence-only",
  "borrowed-item-examples-are-analysis-only",
  "displayed-brackets-do-not-authorize-morph-token-source",
  "formula-does-not-authorize-morph-token-source",
  "morph-conditioning-is-separately-owned",
  "morph-token-classification-does-not-apply-an-environment",
  "morph-token-classification-does-not-generate-surface",
]);

const MORPH_CONDITIONING_ANALYSIS_RESTRICTIONS = Object.freeze([
  "english-morph-examples-are-evidence-only",
  "conditioning-label-does-not-authorize-analysis-source",
  "phonological-and-morphological-conditioning-remain-distinct",
  "conditioning-analysis-does-not-consume-a-concrete-environment",
  "conditioning-analysis-does-not-consume-a-governing-morpheme",
  "conditioning-analysis-does-not-choose-a-morph-variant",
  "conditioning-analysis-does-not-generate-surface",
]);

const MORPH_FORM_INSTANCE_CLASSIFICATION_RESTRICTIONS = Object.freeze([
  "form-label-does-not-authorize-form-instance-source",
  "concrete-form-does-not-authorize-form-instance-source",
  "token-element-grouping-is-routing-only",
  "morph-token-classification-is-separately-owned",
  "morph-conditioning-analysis-is-separately-owned",
  "form-instance-classification-does-not-consume-an-environment",
  "form-instance-classification-does-not-select-a-morph-variant",
  "form-instance-classification-does-not-generate-a-form-surface",
  "instance-level-realization-term-is-taxonomic-only",
]);

const MORPH_STRUCTURE_PERCEPTION_ANALYSIS_RESTRICTIONS = Object.freeze([
  "perception-analysis-does-not-license-a-silent-morph",
  "silent-contrast-policy-is-nonauthorizing-documentation",
  "displayed-empty-zero-and-surface-do-not-authorize-analysis",
  "formula-does-not-authorize-perception-analysis",
  "perception-analysis-does-not-consume-a-concrete-sound",
  "perception-analysis-does-not-consume-a-concrete-morph",
  "perception-analysis-does-not-consume-an-environment",
  "perception-analysis-does-not-select-or-generate-a-form",
  "syllable-morph-noncoterminality-does-not-rewrite-segmentation",
  "silent-morph-contrast-validation-is-separately-owned",
]);

const SILENT_MORPH_CONTRAST_CANDIDATE_KINDS = Object.freeze([
  "silent-morpheme",
  "silent-morph",
]);
const SILENT_MORPH_CONTRAST_COORDINATE_VALUES = Object.freeze({
  correspondingPosition: Object.freeze([
    "corresponding",
    "noncorresponding",
  ]),
  structuralPattern: Object.freeze([
    "similarly-structured",
    "differently-structured",
  ]),
  categoryRelation: Object.freeze([
    "related-category",
    "unrelated-category",
  ]),
  soundedCounterpart: Object.freeze(["present", "absent"]),
});
const SILENT_MORPH_CONTRAST_REQUEST_KEYS = new Set([
  "candidateKind",
  "correspondingPosition",
  "structuralPattern",
  "categoryRelation",
  "soundedCounterpart",
]);
const SILENT_MORPH_CONTRAST_RESTRICTIONS = Object.freeze([
  "all-four-contrast-coordinates-are-required",
  "candidate-kind-must-be-silent-morpheme-or-silent-morph",
  "displayed-zero-does-not-supply-a-contrast-coordinate",
  "empty-surface-does-not-supply-a-contrast-coordinate",
  "silence-alone-does-not-authorize-a-hypothesis",
  "policy-label-does-not-execute-contrast-validation",
  "contrast-validation-does-not-generate-a-form",
  "contrast-validation-does-not-realize-written-surface",
  "morpheme-taxonomy-is-separately-owned",
  "morph-structure-perception-analysis-is-separately-owned",
]);
const LINGUISTIC_UNIT_COMPOSITION_REQUEST_KEYS = new Set([
  "medium",
  "sequenceOrder",
  "structurePattern",
  "constituents",
]);
const LINGUISTIC_UNIT_COMPOSITION_MEDIUMS = Object.freeze([
  "speech",
  "writing",
]);
const LINGUISTIC_UNIT_COMPOSITION_ORDERS = Object.freeze([
  "temporal",
  "spatial",
]);
const LINGUISTIC_UNIT_COMPOSITION_PATTERNS = Object.freeze([
  "patterned-whole",
  "unstructured-sequence",
]);
const LINGUISTIC_UNIT_COMPOSITION_RESTRICTIONS = Object.freeze([
  "composition-requires-exactly-two-owner-issued-constituent-units",
  "speech-sequences-are-temporal",
  "writing-sequences-are-spatial",
  "linguistically-valid-sequences-must-be-structured",
  "constituents-enter-combinations-as-units",
  "composition-results-in-one-unit",
  "single-member-set-analogy-is-analysis-only",
  "display-formula-does-not-authorize-composition",
  "generic-structure-classification-does-not-authorize-composition",
  "lesson-and-curriculum-metadata-do-not-authorize-composition",
  "discontinuous-unit-admissibility-is-separately-owned",
  "recursive-composition-is-separately-owned",
  "structural-unit-hierarchy-is-separately-owned",
  "composition-does-not-generate-a-written-or-sounded-surface",
]);
const LINGUISTIC_STRUCTURE_RECURSION_REQUEST_KEYS = new Set([
  "priorStructureResult",
  "nextConstituentResult",
]);
const LINGUISTIC_STRUCTURE_RECURSION_RESTRICTIONS = Object.freeze([
  "recursion-requires-an-owner-issued-prior-structural-unit-result",
  "the-first-recursive-application-consumes-a-unit-composition-result",
  "later-recursive-applications-consume-an-owner-issued-recursion-result",
  "each-application-adds-one-independently-owner-issued-basic-linear-element-unit",
  "every-prior-composition-and-recursion-operation-remains-in-the-live-route",
  "medium-order-and-structured-whole-coordinates-are-inherited-from-the-prior-unit",
  "a-recursion-label-depth-counter-or-stored-tree-does-not-authorize-execution",
  "copied-prior-or-constituent-results-do-not-authorize-execution",
  "direct-binary-composition-retains-its-own-owner-atoms-and-receipts",
  "structural-unit-hierarchy-is-separately-owned",
  "recursion-does-not-prove-rank-potential-or-hierarchy-membership",
  "recursion-does-not-generate-a-formula-written-surface-or-sounded-surface",
]);
const CARRIER_RANK_TAXONOMY_REQUEST_KEYS = new Set([
  "subsystem",
  "rankTier",
]);
const CARRIER_RANK_TAXONOMY_TIERS = Object.freeze([
  "highest",
  "vocable",
  "syllable",
  "lowest",
]);
const CARRIER_RANK_TAXONOMY_DEFINITIONS = deepFreeze({
  phonological: {
    highest: { rankId: "stress-group", rankLabel: "stress group", rankOrdinal: 4 },
    vocable: { rankId: "vocable", rankLabel: "vocable", rankOrdinal: 3 },
    syllable: { rankId: "syllable", rankLabel: "syllable", rankOrdinal: 2 },
    lowest: { rankId: "phoneme-phone", rankLabel: "phoneme/phone", rankOrdinal: 1 },
  },
  graphological: {
    highest: { rankId: "punctuation-group", rankLabel: "punctuation group", rankOrdinal: 4 },
    vocable: { rankId: "vocable", rankLabel: "vocable", rankOrdinal: 3 },
    syllable: { rankId: "syllable", rankLabel: "syllable", rankOrdinal: 2 },
    lowest: { rankId: "grapheme-graph", rankLabel: "grapheme/graph", rankOrdinal: 1 },
  },
});
const CARRIER_RANK_TAXONOMY_RESTRICTIONS = Object.freeze([
  "taxonomy-is-limited-to-the-phonological-and-graphological-subsystems",
  "each-subsystem-has-four-basic-carrier-rank-tiers",
  "phonological-and-graphological-rank-identities-remain-distinct",
  "shared-vocable-and-syllable-labels-do-not-collapse-subsystem-identity",
  "a-raw-rank-label-does-not-authorize-a-taxonomy-result",
  "a-stored-hierarchy-table-does-not-authorize-a-taxonomy-result",
  "copied-sources-and-results-do-not-retain-owner-authority",
  "rank-taxonomy-does-not-construct-or-upgrade-a-unit",
  "rank-taxonomy-does-not-prove-structural-potential",
  "meaningful-structural-units-are-separately-owned",
  "syllable-and-vocable-structure-are-separately-owned",
  "taxonomy-does-not-generate-a-formula-written-surface-or-sounded-surface",
]);
const DISCONTINUOUS_UNIT_ADMISSIBILITY_REQUEST_KEYS = new Set([
  "canonicalNuclearClauseResult",
]);
const DISCONTINUOUS_UNIT_ADMISSIBILITY_RESTRICTIONS = Object.freeze([
  "admissibility-requires-an-owner-issued-canonical-nuclear-clause-result",
  "the-validated-unit-kind-is-the-nahuatl-subject-person-number-unit",
  "person-and-number-must-belong-to-one-subject-function",
  "the-predicate-must-intervene-between-person-and-number-positions",
  "one-validated-unit-kind-does-not-authorize-arbitrary-discontinuity",
  "a-gap-or-discontinuous-label-does-not-prove-cohesion",
  "formula-and-diagrammatic-projections-do-not-authorize-admissibility",
  "canvas-examples-and-cross-references-are-evidence-only",
  "linguistic-unit-composition-is-separately-owned",
  "later-structure-specific-atoms-retain-independent-proof-obligations",
  "admissibility-validation-does-not-generate-an-arrangement-or-surface",
]);

const CONCEPT_SPECS = Object.freeze([
  // Terminological restrictions.  These are exact validation failures, never
  // alternate names that can be selected to obtain a generated result.
  defineConceptSpec({
    domain: "terminology-assumption",
    selection: "english-sentence-template-as-nahuatl",
    classification: "foreign-grammar-template",
    semanticOwnerId: "classical-terminology-authority",
    factRole: "architecture-invariant",
    rejected: true,
    rejectionReason: "foreign-sentence-template-not-classical-grammar",
  }),
  ...[
    "noun-as-nounword",
    "verb-as-verbword",
    "adjective-as-adjectiveword",
    "adverb-as-adverbword",
  ].map((selection) => defineConceptSpec({
    domain: "terminology-assumption",
    selection,
    classification: "form-class-word-conflation",
    semanticOwnerId: "classical-terminology-authority",
    factRole: "architecture-invariant",
    rejected: true,
    rejectionReason: "lexical-item-is-a-stem-not-a-word-class",
  })),
  defineConceptSpec({
    domain: "terminology-assumption",
    selection: "english-transitivity-definition",
    classification: "foreign-transitivity-definition",
    semanticOwnerId: "classical-terminology-authority",
    factRole: "architecture-invariant",
    rejected: true,
    rejectionReason: "transitivity-must-be-classical-source-structure",
  }),
  ...[
    "auxiliary-verb",
    "modal-auxiliary",
    "preposition",
    "postposition",
  ].map((selection) => defineConceptSpec({
    domain: "terminology-assumption",
    selection,
    classification: "foreign-grammar-category",
    semanticOwnerId: "classical-terminology-authority",
    factRole: "architecture-invariant",
    rejected: true,
    rejectionReason: "foreign-category-has-no-classical-referent",
  })),
  defineConceptSpec({
    domain: "terminology-assumption",
    selection: "translation-as-grammar",
    classification: "translation-authority",
    semanticOwnerId: "classical-terminology-authority",
    factRole: "architecture-invariant",
    rejected: true,
    rejectionReason: "translation-is-not-source-or-grammar-authority",
  }),
  defineConceptSpec({
    domain: "terminology-assumption",
    selection: "nuclear-clause-as-word",
    classification: "word",
    semanticOwnerId: NUCLEAR_CLAUSE_STRUCTURE_OWNER_ID,
    factRole: "architecture-invariant",
    rejected: true,
    rejectionReason: "nuclear-clause-is-not-word",
  }),
  defineConceptSpec({
    domain: "word-rank",
    selection: "particle",
    classification: "word",
    semanticOwnerId: NUCLEAR_CLAUSE_STRUCTURE_OWNER_ID,
    factRole: "architecture-invariant",
    facts: ["sentence-fragment", "particle-rank"],
    restrictions: ["nuclear-clause-excluded"],
  }),

  // Reusable Nahuatl terminology.  The semantic identifiers are the Source;
  // English/Spanish labels are documentary and are deliberately absent here.
  defineConceptSpec({
    domain: "terminology",
    selection: "nounstem",
    classification: "nominal-lexical-item",
    factRole: "lexical-fact",
    facts: ["lexical-item", "stem-rank", "nominal-class"],
    restrictions: ["not-nounword"],
  }),
  defineConceptSpec({
    domain: "terminology",
    selection: "verbstem",
    classification: "verbal-lexical-item",
    factRole: "lexical-fact",
    facts: ["lexical-item", "stem-rank", "verbal-class"],
    restrictions: ["not-verbword"],
  }),
  defineConceptSpec({
    domain: "terminology",
    selection: "vocable",
    classification: "syllabic-carrier-unit",
    semanticOwnerId: CONCEPT_CLASSIFICATION_OWNER_ID,
    facts: ["syllabic-whole"],
    relations: ["particle-carrier", "nuclear-clause-carrier"],
    restrictions: ["not-morphosyntactic-rank"],
  }),
  ...[
    "mainline-object",
    "shuntline-object",
    "nuclear-clause",
    "basic-participant",
    "supplementary-participant",
    "stock",
    "destockal-verbstem",
  ].map((selection) => defineConceptSpec({
    domain: "terminology",
    selection,
    classification: "classical-structural-term",
    semanticOwnerId: CONCEPT_CLASSIFICATION_OWNER_ID,
    factRole: "lexical-fact",
    facts: ["classical-grammar-term"],
    restrictions: ["documentary-label-not-authority"],
  })),

  // Communication and its carrier/content organization.
  defineConceptSpec({
    domain: "communication",
    selection: "language",
    classification: "communication-system",
    semanticOwnerId: COMMUNICATION_STRUCTURE_OWNER_ID,
    factRole: "architecture-invariant",
    facts: ["primary-use-communication"],
  }),
  defineConceptSpec({
    domain: "communication",
    selection: "communication-event",
    classification: "structured-communication",
    semanticOwnerId: COMMUNICATION_STRUCTURE_OWNER_ID,
    factRole: "architecture-invariant",
    facts: [
      "speaker",
      "addressee",
      "information",
      "medium",
      "shared-selection-and-integration-rules",
    ],
    relations: [
      "carrier-content-coupling",
      "shared-rules-constrain-selection-and-integration",
      "speaker-combines-information-through-medium-for-addressee",
    ],
  }),
  defineConceptSpec({
    domain: "communication",
    selection: "carrier-system",
    classification: "carrier-system",
    semanticOwnerId: COMMUNICATION_STRUCTURE_OWNER_ID,
    facts: ["meaning-carrier"],
    relations: ["phonological-subsystem", "sigological-subsystem"],
  }),
  defineConceptSpec({
    domain: "communication",
    selection: "content-system",
    classification: "content-system",
    semanticOwnerId: COMMUNICATION_STRUCTURE_OWNER_ID,
    facts: ["information-content"],
    relations: ["sememic-subsystem"],
  }),
  defineConceptSpec({
    domain: "communication",
    selection: "phonological-subsystem",
    classification: "carrier-subsystem",
    semanticOwnerId: COMMUNICATION_STRUCTURE_OWNER_ID,
    facts: ["sounded-carrier"],
    relations: ["phoneme", "phone"],
  }),
  defineConceptSpec({
    domain: "communication",
    selection: "sigological-subsystem",
    classification: "carrier-subsystem",
    semanticOwnerId: COMMUNICATION_STRUCTURE_OWNER_ID,
    facts: ["silent-carrier"],
    relations: ["sigeme", "sig"],
  }),
  defineConceptSpec({
    domain: "communication",
    selection: "graphological-subsystem",
    classification: "derived-carrier-subsystem",
    semanticOwnerId: COMMUNICATION_STRUCTURE_OWNER_ID,
    facts: ["written-language-only"],
    relations: ["derived-from-phonological-subsystem", "grapheme", "graph"],
    restrictions: ["not-a-primary-carrier-subsystem"],
  }),

  // Type, token, and instance are classifications, not display conventions.
  defineConceptSpec({
    domain: "analysis-level",
    selection: "type",
    classification: "type-level",
    semanticOwnerId: ANALYSIS_LEVEL_OWNER_ID,
    facts: [
      "abstract-contrastive-class",
      "ideal-abstract-generalizing-entity",
      "hypothetical-identificational-class",
      "mental-construct",
      "language-specific-systemic-contrastive-feature-set",
    ],
    relations: [
      "identified-by-eme-label",
      "represented-by-limited-token-repertory",
      "distills-token-level-variation",
    ],
  }),
  defineConceptSpec({
    domain: "analysis-level",
    selection: "token",
    classification: "token-level",
    semanticOwnerId: ANALYSIS_LEVEL_OWNER_ID,
    facts: [
      "type-particularization",
      "type-representation",
      "less-abstract-than-type",
      "conforms-to-type-distinguishing-function",
      "may-add-environment-conditioned-variation",
      "mental-construct",
    ],
    relations: [
      "manifested-by-unbounded-instances",
      "distills-instance-level-details",
    ],
  }),
  defineConceptSpec({
    domain: "analysis-level",
    selection: "instance",
    classification: "instance-level",
    semanticOwnerId: ANALYSIS_LEVEL_OWNER_ID,
    facts: [
      "concrete-one-time-realization",
      "concrete-actual-performed-specific-one-time-realization",
      "quotation-marks-nontechnical-identification",
    ],
    relations: ["manifests-token"],
  }),

  // Type-level elements.
  defineConceptSpec({
    domain: "linguistic-element",
    selection: "element",
    classification: "basic-linear-element",
    semanticOwnerId: ELEMENT_CLASSIFICATION_OWNER_ID,
    factRole: "lexical-fact",
    facts: [
      "not-linearly-decomposable",
      "may-be-feature-bundle",
    ],
  }),
  defineConceptSpec({
    domain: "linguistic-element",
    selection: "type-level-inventory",
    classification: "four-kind-type-level-element-inventory",
    semanticOwnerId: ELEMENT_CLASSIFICATION_OWNER_ID,
    factRole: "lexical-fact",
    facts: [
      "basic-type-level-element-kinds",
      "phoneme-from-greek-phon-sound",
      "grapheme-from-greek-graph-writing",
      "sigeme-from-greek-sig-silence",
      "sememe-from-greek-sem-sign",
    ],
    relations: [
      "inventory-phoneme",
      "inventory-grapheme",
      "inventory-sigeme",
      "inventory-sememe",
      "carrier-elements-phoneme-grapheme-sigeme",
      "content-element-sememe",
    ],
  }),
  defineConceptSpec({
    domain: "linguistic-element",
    selection: "phoneme",
    classification: "carrier-type-element",
    semanticOwnerId: PHONEME_CLASSIFICATION_OWNER_ID,
    factRole: "contextual-fact",
    facts: [
      "phonological-subsystem-member",
      "meaningless-but-meaning-distinguishing",
      "language-specific-contrastive-identity",
      "distinctive-feature-organization",
      "physical-makeup-from-articulatory-feature-bundle",
      "voicing-place-and-manner-features",
      "enculturated-functional-distinctiveness-establishes-phoneme-identity",
      "phonemic-inventory-particular-to-language",
      "one-sound-one-alphabetic-symbol",
      "special-phonemic-symbols-may-be-required",
      "nahuatl-phonemic-symbols-defined-in-sections-2.2-2.3",
    ],
    relations: [
      "represented-by-phone-token",
      "phoneme-identity-distinct-from-physical-token",
    ],
    restrictions: [
      "foreign-language-examples-are-witnesses-only",
      "symbolization-does-not-authorize-written-result",
    ],
  }),
  defineConceptSpec({
    domain: "linguistic-element",
    selection: "grapheme",
    classification: "carrier-type-element",
    semanticOwnerId: GRAPHEME_CLASSIFICATION_OWNER_ID,
    factRole: "contextual-fact",
    facts: [
      "graphological-subsystem-member",
      "visual-representation-of-linguistic-sound",
      "identically-valued-shape-set",
      "phoneme-correspondence-may-be-many-to-many",
      "subsidiary-written-symbol",
      "recognizable-value-across-script-print-case-and-typeface",
      "phoneme-correspondence-one-two-or-three-to-one",
      "grapheme-may-correspond-to-multiple-phonemes",
      "phoneme-may-have-multiple-graphemic-spellings",
      "graph-variants-may-differ-by-case-script-print-typeface-style-and-size",
    ],
    relations: [
      "represented-by-graph-token",
      "graph-variation-preserves-grapheme-value",
    ],
    restrictions: [
      "foreign-spelling-examples-are-witnesses-only",
      "typographic-variation-is-not-a-grammar-choice",
      "classification-does-not-realize-written-output",
    ],
  }),
  defineConceptSpec({
    domain: "linguistic-element",
    selection: "sigeme",
    classification: "carrier-type-element",
    semanticOwnerId: SIGEME_CLASSIFICATION_OWNER_ID,
    facts: [
      "sigological-subsystem-member",
      "single-membered-meaning-bearing-silence-set",
      "one-sigeme-per-language-system",
      "soundless-element-carries-meaning-as-effectively-as-sounded-one",
      "slash-oval-zero-symbol",
      "slash-distinguishes-zero-from-vowel-o",
    ],
    relations: [
      "represented-by-sig-token",
      "carrier-system-includes-phoneme-and-sigeme",
      "documentarily-represented-by-slash-oval-zero",
    ],
    restrictions: [
      "phonological-system-label-cannot-exclude-sigeme",
      "displayed-zero-does-not-authorize-sigeme-source",
      "classification-does-not-realize-zero-surface",
      "square-zero-belongs-to-irregular-sig-token-owner",
    ],
  }),
  defineConceptSpec({
    domain: "linguistic-element",
    selection: "sememe",
    classification: "content-type-element",
    semanticOwnerId: SEMEME_CLASSIFICATION_OWNER_ID,
    factRole: "lexical-fact",
    facts: [
      "only-content-element-kind",
      "meaningfulness-set",
      "uniquely-expressible-by-carrier-unit",
      "meaningfulness-includes-sense-and-denotation",
      "semantic-component-exceeds-content-system",
      "meaning-generated-by-combination",
      "meaning-generated-by-use",
      "nahuatl-sememe-knowledge-extremely-limited",
      "english-translation-gloss-fundamentally-falsifies-sememe-value",
    ],
    relations: [
      "expressed-by-carrier-system-unit",
      "content-system-contained-within-semantic-component",
    ],
    restrictions: [
      "translation-gloss-is-not-sememe-identity",
      "meaning-also-arises-from-combination-and-use",
      "limited-knowledge-does-not-license-english-sememe-authority",
      "classification-does-not-generate-meaning-or-translation",
    ],
  }),

  // Token-level counterparts.
  defineConceptSpec({
    domain: "token-element",
    selection: "inventory",
    classification: "token-level-element-inventory",
    semanticOwnerId: TOKEN_ELEMENT_CLASSIFICATION_OWNER_ID,
    facts: [
      "four-basic-type-representing-token-element-kinds",
      "phone-graph-sig-seme-inventory",
      "morph-is-token-level-symbiotic-element",
    ],
    relations: [
      "phones-represent-phonemes",
      "graphs-represent-graphemes",
      "sigs-represent-sigeme",
      "semes-represent-sememes",
      "morphs-represent-morphemes",
    ],
    restrictions: [
      "inventory-labels-do-not-authorize-contextual-realization",
      "token-inventory-does-not-generate-surface",
    ],
  }),
  defineConceptSpec({
    domain: "token-element",
    selection: "instance-boundary",
    classification: "token-instance-realization-boundary",
    semanticOwnerId: TOKEN_ELEMENT_CLASSIFICATION_OWNER_ID,
    facts: [
      "four-basic-type-representing-token-element-kinds",
      "phone-graph-sig-seme-inventory",
      "morph-is-token-level-symbiotic-element",
      "instance-manifestations-are-sounds-letters-meanings",
      "silence-not-instance-level-element",
      "sig-has-no-instance-level-representation",
      "sig-has-no-instance-level-presence",
      "sig-presence-is-implicit",
    ],
    relations: [
      "phones-represent-phonemes",
      "graphs-represent-graphemes",
      "sigs-represent-sigeme",
      "semes-represent-sememes",
      "morphs-represent-morphemes",
      "token-elements-have-instance-manifestations-except-sigs",
    ],
    restrictions: [
      "inventory-labels-do-not-authorize-contextual-realization",
      "token-inventory-does-not-generate-surface",
      "actual-audible-silence-is-not-sig-instance",
      "displayed-silence-does-not-authorize-sig",
    ],
  }),

  // Phone-repertory analysis classifies sourced phone facts without receiving
  // or applying a phonological environment. Graph analysis uses a distinct
  // semantic owner below; both remain non-generative concept operations.
  defineConceptSpec({
    domain: "phone-repertory-analysis",
    selection: "phone-definition",
    classification: "phone-repertory-analysis",
    semanticOwnerId: PHONE_REPERTORY_ANALYSIS_OWNER_ID,
    factRole: "analysis-fact",
    facts: [
      "token-level-nondistinctive-phoneme-representation",
      "noncontrastive-phone",
      "specifiable-environment-required",
    ],
    relations: ["phone-realizes-phoneme"],
    restrictions: PHONE_VARIANT_ANALYSIS_RESTRICTIONS,
  }),
  defineConceptSpec({
    domain: "phone-repertory-analysis",
    selection: "single-member-repertory",
    classification: "phone-repertory-analysis",
    semanticOwnerId: PHONE_REPERTORY_ANALYSIS_OWNER_ID,
    factRole: "analysis-fact",
    facts: ["phonic-repertory-may-have-one-member"],
    relations: ["one-phone-may-exhaust-phoneme-repertory"],
    restrictions: PHONE_VARIANT_ANALYSIS_RESTRICTIONS,
  }),
  defineConceptSpec({
    domain: "phone-repertory-analysis",
    selection: "multiple-member-repertory",
    classification: "phone-repertory-analysis",
    semanticOwnerId: PHONE_REPERTORY_ANALYSIS_OWNER_ID,
    factRole: "analysis-fact",
    facts: ["phonic-repertory-may-have-two-or-more-members"],
    relations: ["multiple-environment-conditioned-phones-may-realize-one-phoneme"],
    restrictions: PHONE_VARIANT_ANALYSIS_RESTRICTIONS,
  }),
  defineConceptSpec({
    domain: "phone-repertory-analysis",
    selection: "regular-phone",
    classification: "phone-repertory-analysis",
    semanticOwnerId: PHONE_REPERTORY_ANALYSIS_OWNER_ID,
    factRole: "analysis-fact",
    facts: ["regular-phone-contains-only-phoneme-distinctive-features"],
    relations: ["regular-phone-realizes-phoneme"],
    restrictions: PHONE_VARIANT_ANALYSIS_RESTRICTIONS,
  }),
  defineConceptSpec({
    domain: "phone-repertory-analysis",
    selection: "irregular-phone",
    classification: "phone-repertory-analysis",
    semanticOwnerId: PHONE_REPERTORY_ANALYSIS_OWNER_ID,
    factRole: "analysis-fact",
    facts: ["phone-may-be-irregular"],
    relations: ["irregular-phone-realizes-phoneme"],
    restrictions: PHONE_VARIANT_ANALYSIS_RESTRICTIONS,
  }),
  defineConceptSpec({
    domain: "phone-repertory-analysis",
    selection: "distant-irregular-phone",
    classification: "phone-repertory-analysis",
    semanticOwnerId: PHONE_REPERTORY_ANALYSIS_OWNER_ID,
    factRole: "analysis-fact",
    facts: ["irregular-phone-may-be-seriously-or-totally-different"],
    relations: ["distant-irregular-phone-realizes-phoneme"],
    restrictions: PHONE_VARIANT_ANALYSIS_RESTRICTIONS,
  }),
  defineConceptSpec({
    domain: "phone-repertory-analysis",
    selection: "cross-phoneme-identity",
    classification: "phone-repertory-analysis",
    semanticOwnerId: PHONE_REPERTORY_ANALYSIS_OWNER_ID,
    factRole: "analysis-fact",
    facts: ["different-phone-may-match-regular-phone-of-another-phoneme"],
    relations: ["environment-preserves-phoneme-identity-across-phone-overlap"],
    restrictions: PHONE_VARIANT_ANALYSIS_RESTRICTIONS,
  }),
  defineConceptSpec({
    domain: "phone-repertory-analysis",
    selection: "nahuatl-irregular-repertory",
    classification: "phone-repertory-analysis",
    semanticOwnerId: PHONE_REPERTORY_ANALYSIS_OWNER_ID,
    factRole: "analysis-fact",
    facts: [
      "nahuatl-n-is-regular-phone-of-n",
      "nahuatl-n-is-irregular-phone-of-m",
      "nahuatl-ch-is-regular-phone-of-ch",
      "nahuatl-ch-is-irregular-phone-of-t",
      "nahuatl-t-is-regular-phone-of-t",
      "nahuatl-t-is-irregular-phone-of-tl",
    ],
    relations: ["nahuatl-repertory-records-regular-or-irregular-phone-identity"],
    restrictions: PHONE_VARIANT_ANALYSIS_RESTRICTIONS,
  }),
  defineConceptSpec({
    domain: "phone-repertory-analysis",
    selection: "symbol-specificity",
    classification: "phone-repertory-analysis",
    semanticOwnerId: PHONE_REPERTORY_ANALYSIS_OWNER_ID,
    factRole: "documentary-fact",
    facts: [
      "phone-symbol-representation-may-be-loose-or-strict",
      "loose-symbolization-leans-toward-type-generality",
      "strict-symbolization-leans-toward-instance-particularity",
    ],
    relations: ["symbol-specificity-does-not-change-phone-identity"],
    restrictions: PHONE_VARIANT_ANALYSIS_RESTRICTIONS,
  }),
  defineConceptSpec({
    domain: "phone-repertory-analysis",
    selection: "repertory-optionality",
    classification: "phone-repertory-analysis",
    semanticOwnerId: PHONE_REPERTORY_ANALYSIS_OWNER_ID,
    factRole: "analysis-fact",
    facts: CLASSICAL_PHONE_REPERTORY_OPTIONALITY_FACTS,
    relations: [
      "phone-repertory-membership-does-not-by-itself-supply-selection-conditions",
    ],
    restrictions: PHONE_VARIANT_ANALYSIS_RESTRICTIONS,
  }),
  ...[
    ["sig", "sigeme", "carrier-token-element"],
  ].map(([selection, represents, classification]) => defineConceptSpec({
    domain: "token-element",
    selection,
    classification,
    facts: ["nondistinctive-token-representation"],
    relations: [`represents-${represents}`],
  })),
  defineConceptSpec({
    domain: "token-element",
    selection: "seme",
    classification: "content-token-element",
    semanticOwnerId: SEME_TOKEN_CLASSIFICATION_OWNER_ID,
    factRole: "analysis-fact",
    facts: ["seme-is-token-level-representation-of-sememe"],
    relations: ["seme-represents-sememe"],
    restrictions: SEME_TOKEN_CLASSIFICATION_RESTRICTIONS,
  }),
  defineConceptSpec({
    domain: "graph-variant-analysis",
    selection: "graph-definition",
    classification: "graph-variant-analysis",
    semanticOwnerId: GRAPH_VARIANT_ANALYSIS_OWNER_ID,
    factRole: "analysis-fact",
    facts: [
      "token-level-nondistinctive-grapheme-representation",
      "noncontrastive-graph-token",
    ],
    relations: ["realizes-grapheme"],
    restrictions: [
      "typographic-variation-owned-by-grapheme-classification",
      "typography-is-not-a-grammar-choice",
      "graph-label-does-not-authorize-graph-analysis-source",
      "classification-does-not-realize-written-output",
    ],
  }),
  defineConceptSpec({
    domain: "token-element",
    selection: "regular-sig",
    classification: "regular-sig-token",
    semanticOwnerId: SIG_TOKEN_CLASSIFICATION_OWNER_ID,
    factRole: "analysis-fact",
    facts: [
      "regular-sig-is-token-level-representation-of-sigeme",
      "regular-sig-notation-[0]",
      "sigeme-has-one-token-level-member",
    ],
    relations: [
      "regular-sig-realizes-sigeme",
      "plain-zero-documents-regular-sig",
      "sigeme-has-one-token-level-member",
    ],
    restrictions: SIG_TOKEN_CLASSIFICATION_RESTRICTIONS,
  }),
  defineConceptSpec({
    domain: "token-element",
    selection: "irregular-sig",
    classification: "irregular-sig-token",
    semanticOwnerId: SIG_TOKEN_CLASSIFICATION_OWNER_ID,
    factRole: "analysis-fact",
    facts: [
      "irregular-sig-alternative-exists",
      "irregular-sig-is-representation-of-phoneme-unit",
      "irregular-sig-notation-[⎕]",
      "square-zero-name",
    ],
    relations: [
      "irregular-sig-is-exception-to-regular-sig",
      "irregular-sig-represents-phoneme-unit",
      "square-zero-documents-irregular-sig",
    ],
    restrictions: SIG_TOKEN_CLASSIFICATION_RESTRICTIONS,
  }),

  // Morpheme carrier/content taxonomy.
  defineConceptSpec({
    domain: "morpheme",
    selection: "morpheme",
    classification: "type-level-meaningful-unit",
    semanticOwnerId: MORPHEME_TAXONOMY_OWNER_ID,
    facts: MORPHEME_COMMON_FACTS,
    relations: MORPHEME_COMMON_RELATIONS,
    restrictions: MORPHEME_COMMON_RESTRICTIONS,
  }),
  defineConceptSpec({
    domain: "morpheme",
    selection: "portmanteau-morpheme",
    classification: "morpheme-class",
    semanticOwnerId: MORPHEME_TAXONOMY_OWNER_ID,
    facts: [
      ...MORPHEME_COMMON_FACTS,
      "content-cluster",
      "two-or-more-sememes",
      "indivisibly-joined-sememes",
      "no-separate-carrier-per-sememe",
    ],
    relations: [
      ...MORPHEME_COMMON_RELATIONS,
      "content-cluster-classifies-portmanteau-morpheme",
    ],
    restrictions: [
      ...MORPHEME_COMMON_RESTRICTIONS,
      "example-content-does-not-authorize-morpheme-source",
    ],
  }),
  defineConceptSpec({
    domain: "morpheme",
    selection: "connective-morpheme",
    classification: "morpheme-class",
    semanticOwnerId: MORPHEME_TAXONOMY_OWNER_ID,
    facts: [
      ...MORPHEME_COMMON_FACTS,
      "phoneme-unit-carrier",
      "no-sememe",
      "grammatical-meaning-without-sememic-meaning",
    ],
    relations: [
      ...MORPHEME_COMMON_RELATIONS,
      "sound-plus-no-sememic-meaning",
    ],
    restrictions: [
      ...MORPHEME_COMMON_RESTRICTIONS,
      "not-representational-content",
      "english-example-does-not-authorize-morpheme-source",
    ],
  }),
  defineConceptSpec({
    domain: "morpheme",
    selection: "ordinary-morpheme",
    classification: "morpheme-class",
    semanticOwnerId: MORPHEME_TAXONOMY_OWNER_ID,
    facts: [
      ...MORPHEME_COMMON_FACTS,
      "phoneme-unit-carrier",
      "sememe-unit-content",
      "sound-plus-meaning",
      "multiple-ordinary-morphemes-may-cooccur-in-one-word",
    ],
    relations: [
      ...MORPHEME_COMMON_RELATIONS,
      "sound-plus-meaning-classifies-ordinary-morpheme",
    ],
    restrictions: [
      ...MORPHEME_COMMON_RESTRICTIONS,
      "english-example-does-not-authorize-morpheme-source",
      "example-form-does-not-generate-classical-result",
    ],
  }),
  defineConceptSpec({
    domain: "morpheme",
    selection: "sounded-morpheme",
    classification: "morpheme-class",
    semanticOwnerId: "morpheme-taxonomy",
    facts: ["phoneme-unit-carrier"],
  }),
  defineConceptSpec({
    domain: "morpheme",
    selection: "silent-morpheme",
    classification: "morpheme-class",
    semanticOwnerId: MORPHEME_TAXONOMY_OWNER_ID,
    factRole: "boundary-conditioned-fact",
    facts: [
      ...MORPHEME_COMMON_FACTS,
      "sigeme-carrier",
      "sememe-unit-content",
      "no-sound-plus-meaning",
      "linguistic-economy-licenses-silence-for-default-value",
      "silent-expression-depends-on-cultural-default-redundancy",
    ],
    relations: [
      ...MORPHEME_COMMON_RELATIONS,
      "sigeme-plus-sememe-classifies-silent-morpheme",
    ],
    restrictions: [
      ...MORPHEME_COMMON_RESTRICTIONS,
      "requires-language-specific-default-value",
      "displayed-zero-does-not-authorize-silent-morpheme",
      "english-examples-do-not-authorize-morpheme-source",
    ],
  }),
  defineConceptSpec({
    domain: "morpheme",
    selection: "morph",
    classification: "token-level-meaningful-unit",
    semanticOwnerId: MORPH_TOKEN_CLASSIFICATION_OWNER_ID,
    factRole: "analysis-fact",
    facts: [
      "morph-is-token-level-representation-of-morpheme",
      "morph-may-be-regular-or-irregular",
      "morph-meaning-remains-constant-across-carrier-variation",
      "morph-carrier-may-be-phonic-or-sigic",
      "regular-morph-notation-follows-morpheme-notation",
      "regular-morph-notation-uses-square-brackets-around-morphic-carrier",
    ],
    relations: [
      "morph-represents-morpheme",
      "regular-and-irregular-morphs-share-morpheme-meaning",
      "square-brackets-document-morphic-carrier",
    ],
    restrictions: MORPH_TOKEN_CLASSIFICATION_RESTRICTIONS,
  }),
  defineConceptSpec({
    domain: "morph-form-instance-classification",
    selection: "form-instance",
    classification: "morph-form-instance-classification",
    semanticOwnerId: MORPH_FORM_INSTANCE_CLASSIFICATION_OWNER_ID,
    factRole: "analysis-fact",
    facts: [
      "forms-are-instance-level-realizations-of-morphs",
      "form-is-an-instance-level-morph-manifestation",
    ],
    relations: ["form-instantiates-morph"],
    restrictions: MORPH_FORM_INSTANCE_CLASSIFICATION_RESTRICTIONS,
  }),
  defineConceptSpec({
    domain: "morph-conditioning-analysis",
    selection: "phonological-conditioning",
    classification: "morph-conditioning-analysis",
    semanticOwnerId: MORPH_CONDITIONING_ANALYSIS_OWNER_ID,
    factRole: "analysis-fact",
    facts: [
      "slightly-irregular-morphs-may-be-phonologically-conditioned",
      "contextual-sounds-trigger-morph-variation",
    ],
    relations: ["contextual-sound-conditions-morph-variation"],
    restrictions: MORPH_CONDITIONING_ANALYSIS_RESTRICTIONS,
  }),
  defineConceptSpec({
    domain: "morph-structure-perception-analysis",
    selection: "sounded-morph-recognition",
    classification: "morph-structure-perception-analysis",
    semanticOwnerId: MORPH_STRUCTURE_PERCEPTION_ANALYSIS_OWNER_ID,
    factRole: "analysis-fact",
    facts: [
      "instance-level-sound-obscures-sounded-morphological-structure",
      "sounded-morphs-do-not-eliminate-recognition-difficulty",
    ],
    relations: ["sound-dominance-obscures-morphological-structure"],
    restrictions: MORPH_STRUCTURE_PERCEPTION_ANALYSIS_RESTRICTIONS,
  }),
  defineConceptSpec({
    domain: "morph-structure-perception-analysis",
    selection: "syllable-morph-noncoterminality",
    classification: "morph-structure-perception-analysis",
    semanticOwnerId: MORPH_STRUCTURE_PERCEPTION_ANALYSIS_OWNER_ID,
    factRole: "analysis-fact",
    facts: [
      "meaningless-phonic-segments-are-syllabic-segments",
      "syllabic-segments-need-not-be-coterminous-with-morphic-segments",
    ],
    relations: [
      "segment-noncoterminality-conditions-morph-recognition-difficulty",
    ],
    restrictions: MORPH_STRUCTURE_PERCEPTION_ANALYSIS_RESTRICTIONS,
  }),
  defineConceptSpec({
    domain: "morph-structure-perception-analysis",
    selection: "sigeme-content-recognition",
    classification: "morph-structure-perception-analysis",
    semanticOwnerId: MORPH_STRUCTURE_PERCEPTION_ANALYSIS_OWNER_ID,
    factRole: "analysis-fact",
    facts: [
      "phoneme-carried-sememes-can-be-difficult-to-recognize",
      "sigeme-carried-sememes-can-be-still-more-difficult-to-grasp",
    ],
    relations: [
      "phoneme-content-difficulty-supports-sigeme-content-difficulty-analysis",
    ],
    restrictions: MORPH_STRUCTURE_PERCEPTION_ANALYSIS_RESTRICTIONS,
  }),
  defineConceptSpec({
    domain: "morph-conditioning-analysis",
    selection: "morphological-conditioning",
    classification: "morph-conditioning-analysis",
    semanticOwnerId: MORPH_CONDITIONING_ANALYSIS_OWNER_ID,
    factRole: "analysis-fact",
    facts: [
      "certain-seriously-irregular-morphs-may-be-morphologically-conditioned",
      "particular-governing-morpheme-triggers-morph-variation",
    ],
    relations: ["governing-morpheme-conditions-morph-variation"],
    restrictions: MORPH_CONDITIONING_ANALYSIS_RESTRICTIONS,
  }),

  // Carrier units and the morpheme/syllable rank separation.
  defineConceptSpec({
    domain: "carrier-unit",
    selection: "syllable",
    classification: "meaningless-carrier-combination",
    semanticOwnerId: "carrier-unit-hierarchy",
    factRole: "boundary-conditioned-fact",
    facts: ["phone-combination", "syllabic-rank"],
    restrictions: ["not-morpheme-by-shape"],
  }),
  defineConceptSpec({
    domain: "carrier-unit",
    selection: "vocable",
    classification: "meaningless-carrier-sequence",
    semanticOwnerId: "carrier-unit-hierarchy",
    factRole: "boundary-conditioned-fact",
    facts: ["syllable-sequence", "syllabic-whole"],
    restrictions: ["not-morphosyntactic-analysis"],
  }),

  // Major/minor type, affix position/function, paradigm, dyad, and the
  // meaningful rank hierarchy are independent typed owners in
  // morpheme_structure_owners.mjs.  No generic label-driven concept record is
  // retained as a second proof or authority route.
  ...[
    ["morpheme", "meaningful-element-rank"],
    ["root", "single-major-morpheme-rank"],
    ["stock", "derived-stem-forming-rank"],
    ["stem", "lexical-item-rank"],
    ["particle", "invariant-sentence-fragment-rank"],
    ["group", "syntactic-unit-rank"],
    ["sentence", "sentence-rank"],
  ].map(([selection, classification]) => defineConceptSpec({
    domain: "rank",
    selection,
    classification,
    semanticOwnerId: "classical-rank-conversion",
    facts: ["ordered-structural-rank"],
    relations: selection === "stem"
      ? ["root-or-derived-or-compound-source", "upper-bound-of-derivation"]
      : [],
  })),
  defineConceptSpec({
    domain: "rank",
    selection: "owner-issued-nuclear-clause",
    classification: "nuclear-clause",
    semanticOwnerId: "classical-nuclear-clause-structure",
    factRole: "architecture-invariant",
    facts: [
      "morphosyntactic-unit",
      "subject-predicate-structure",
      "inflectional-rank-above-stem",
    ],
    restrictions: ["not-word", "not-generated-surface"],
    requiredOwnerRank: "nuclear-clause",
  }),
  defineConceptSpec({
    domain: "carrier-realization",
    selection: "owner-issued-transcription",
    classification: "contextual-carrier-realization",
    semanticOwnerId: "classical-orthographic-boundary",
    factRole: "boundary-conditioned-fact",
    facts: [
      "graph-realizes-grapheme",
      "written-realization-owned-by-orthographic-boundary",
    ],
    restrictions: ["classification-does-not-recreate-written-output"],
    requiredOwnerRank: "transcription",
  }),

  // Documentary structure labels. These organize terminology only; the
  // independent linguistic-unit-composition owner below consumes genuine
  // owner-issued constituent Results and executes composition. Recursion,
  // discontinuity, and hierarchy remain separately owned mechanisms.
  defineConceptSpec({
    domain: "structure",
    selection: "simple-unit",
    classification: "simple-structure",
    semanticOwnerId: DOCUMENTARY_STRUCTURE_CLASSIFICATION_OWNER_ID,
    facts: ["single-lower-ranked-source"],
    restrictions: [
      "classification-does-not-compose-unit",
      "structure-catalog-is-nonauthorizing",
    ],
  }),
  defineConceptSpec({
    domain: "structure",
    selection: "complex-unit",
    classification: "complex-structure",
    semanticOwnerId: DOCUMENTARY_STRUCTURE_CLASSIFICATION_OWNER_ID,
    facts: ["two-or-more-constituents", "static-and-dynamic-facets"],
    relations: ["constituents-may-themselves-be-structures"],
    restrictions: [
      "classification-does-not-compose-unit",
      "structure-catalog-is-nonauthorizing",
    ],
  }),
  defineConceptSpec({
    domain: "structure",
    selection: "constituent",
    classification: "structure-part",
    semanticOwnerId: DOCUMENTARY_STRUCTURE_CLASSIFICATION_OWNER_ID,
    facts: ["lower-ranked-unit-or-embedded-structure"],
    restrictions: [
      "classification-does-not-admit-constituent-unit",
      "structure-catalog-is-nonauthorizing",
    ],
  }),
  defineConceptSpec({
    domain: "structure",
    selection: "recursion",
    classification: "recursive-composition",
    semanticOwnerId: DOCUMENTARY_STRUCTURE_CLASSIFICATION_OWNER_ID,
    facts: ["structure-may-fill-constituent-slot"],
    restrictions: [
      "authority-carrier-is-not-a-constituent",
      "classification-does-not-execute-recursion",
      "linguistic-structure-recursion-is-separately-owned",
      "structure-catalog-is-nonauthorizing",
    ],
  }),
  defineConceptSpec({
    domain: "structure",
    selection: "concatenation",
    classification: "additive-composition-principle",
    semanticOwnerId: "classical-structure-governance",
    facts: ["meaningful-linking-of-two-or-more-constituents"],
  }),
  defineConceptSpec({
    domain: "structure",
    selection: "interaction",
    classification: "governed-composition-principle",
    semanticOwnerId: "classical-structure-governance",
    facts: ["justifies-concatenated-unity"],
    relations: ["adjunctive-or-conjunctive-governance"],
  }),
  defineConceptSpec({
    domain: "structure",
    selection: "adjunctive",
    classification: "unequal-function-unit-governance",
    semanticOwnerId: "classical-structure-governance",
    facts: ["head-governs-adjunct"],
    relations: ["adjunct-may-be-introduced-by-adjunctor"],
  }),
  defineConceptSpec({
    domain: "structure",
    selection: "conjunctive",
    classification: "equal-function-unit-governance",
    semanticOwnerId: "classical-structure-governance",
    facts: ["two-or-more-equal-conjuncts"],
    relations: ["nahuatl-normally-conjunctorless"],
  }),
  // Conceptual-plane separation and participant-role analysis are separate
  // semantic owners installed through the non-authorizing foundational
  // catalog. This concept list deliberately retains no second authority path.
]);

const CONCEPT_SPEC_BY_KEY = new Map(
  CONCEPT_SPECS.map((spec) => [`${spec.domain}:${spec.selection}`, spec]),
);
const KNOWN_CLASSIFICATIONS = new Set([
  ...CONCEPT_SPECS.map((spec) => spec.classification),
  "word",
]);
const ALLOWED_SOURCE_REQUEST_KEYS = new Set([
  "domain",
  "selection",
  "assertedClassification",
  "canonicalOwnerResult",
]);

function normalizeSemanticId(value = "") {
  return String(value == null ? "" : value).trim();
}

function getConceptValidationOperationId(spec = null) {
  if (spec?.semanticOwnerId === TERMINOLOGY_AUTHORITY_OWNER_ID) {
    return TERMINOLOGY_AUTHORITY_OPERATION_ID;
  }
  if (spec?.semanticOwnerId === CONCEPT_CLASSIFICATION_OWNER_ID) {
    return CONCEPT_CLASSIFICATION_OPERATION_ID;
  }
  if (spec?.semanticOwnerId === NUCLEAR_CLAUSE_STRUCTURE_OWNER_ID) {
    return NUCLEAR_CLAUSE_RANK_OPERATION_ID;
  }
  if (spec?.semanticOwnerId === COMMUNICATION_STRUCTURE_OWNER_ID) {
    return COMMUNICATION_STRUCTURE_OPERATION_ID;
  }
  if (spec?.semanticOwnerId === ANALYSIS_LEVEL_OWNER_ID) {
    return ANALYSIS_LEVEL_OPERATION_ID;
  }
  if (spec?.semanticOwnerId === ELEMENT_CLASSIFICATION_OWNER_ID) {
    return ELEMENT_CLASSIFICATION_OPERATION_ID;
  }
  if (spec?.semanticOwnerId === PHONEME_CLASSIFICATION_OWNER_ID) {
    return PHONEME_CLASSIFICATION_OPERATION_ID;
  }
  if (spec?.semanticOwnerId === GRAPHEME_CLASSIFICATION_OWNER_ID) {
    return GRAPHEME_CLASSIFICATION_OPERATION_ID;
  }
  if (spec?.semanticOwnerId === SIGEME_CLASSIFICATION_OWNER_ID) {
    return SIGEME_CLASSIFICATION_OPERATION_ID;
  }
  if (spec?.semanticOwnerId === SEMEME_CLASSIFICATION_OWNER_ID) {
    return SEMEME_CLASSIFICATION_OPERATION_ID;
  }
  if (spec?.semanticOwnerId === MORPHEME_TAXONOMY_OWNER_ID) {
    return MORPHEME_TAXONOMY_OPERATION_ID;
  }
  if (spec?.semanticOwnerId === TOKEN_ELEMENT_CLASSIFICATION_OWNER_ID) {
    return TOKEN_ELEMENT_CLASSIFICATION_OPERATION_ID;
  }
  if (spec?.semanticOwnerId === PHONE_REPERTORY_ANALYSIS_OWNER_ID) {
    return PHONE_REPERTORY_ANALYSIS_OPERATION_ID;
  }
  if (spec?.semanticOwnerId === GRAPH_VARIANT_ANALYSIS_OWNER_ID) {
    return GRAPH_VARIANT_ANALYSIS_OPERATION_ID;
  }
  if (spec?.semanticOwnerId === SIG_TOKEN_CLASSIFICATION_OWNER_ID) {
    return SIG_TOKEN_CLASSIFICATION_OPERATION_ID;
  }
  if (spec?.semanticOwnerId === SEME_TOKEN_CLASSIFICATION_OWNER_ID) {
    return SEME_TOKEN_CLASSIFICATION_OPERATION_ID;
  }
  if (spec?.semanticOwnerId === MORPH_TOKEN_CLASSIFICATION_OWNER_ID) {
    return MORPH_TOKEN_CLASSIFICATION_OPERATION_ID;
  }
  if (spec?.semanticOwnerId === MORPH_CONDITIONING_ANALYSIS_OWNER_ID) {
    return MORPH_CONDITIONING_ANALYSIS_OPERATION_ID;
  }
  if (
    spec?.semanticOwnerId === MORPH_FORM_INSTANCE_CLASSIFICATION_OWNER_ID
  ) {
    return MORPH_FORM_INSTANCE_CLASSIFICATION_OPERATION_ID;
  }
  if (
    spec?.semanticOwnerId === MORPH_STRUCTURE_PERCEPTION_ANALYSIS_OWNER_ID
  ) {
    return MORPH_STRUCTURE_PERCEPTION_ANALYSIS_OPERATION_ID;
  }
  return CONCEPT_APPLICATION_OPERATION_ID;
}

function getConceptDecisionStepId(spec = null) {
  if (
    spec?.semanticOwnerId === NUCLEAR_CLAUSE_STRUCTURE_OWNER_ID
    && spec.selection === "particle"
  ) {
    return "particle-word-rank-licensed";
  }
  if (
    spec?.semanticOwnerId === NUCLEAR_CLAUSE_STRUCTURE_OWNER_ID
    && spec.rejected
  ) {
    return "particle-only-word-jurisdiction-enforced";
  }
  if (spec?.semanticOwnerId === COMMUNICATION_STRUCTURE_OWNER_ID) {
    switch (spec.selection) {
      case "language":
        return "language-communication-function-validated";
      case "communication-event":
        return "communication-component-structure-validated";
      case "carrier-system":
        return "carrier-subsystem-inventory-validated";
      case "graphological-subsystem":
        return "graphological-derivation-boundary-validated";
      default:
        return "communication-structure-classified";
    }
  }
  if (spec?.semanticOwnerId === ANALYSIS_LEVEL_OWNER_ID) {
    switch (spec.selection) {
      case "type":
        return "analysis-type-abstraction-validated";
      case "token":
        return "analysis-token-particularization-validated";
      case "instance":
        return "analysis-instance-definition-validated";
      default:
        return "analysis-level-classified";
    }
  }
  if (spec?.semanticOwnerId === ELEMENT_CLASSIFICATION_OWNER_ID) {
    return spec.selection === "element"
      ? "element-basic-linear-unit-validated"
      : "element-four-kind-inventory-validated";
  }
  if (spec?.semanticOwnerId === PHONEME_CLASSIFICATION_OWNER_ID) {
    return "phoneme-subsystem-membership-validated";
  }
  if (spec?.semanticOwnerId === GRAPHEME_CLASSIFICATION_OWNER_ID) {
    return "grapheme-subsystem-membership-validated";
  }
  if (spec?.semanticOwnerId === SIGEME_CLASSIFICATION_OWNER_ID) {
    return "sigeme-silent-carrier-equivalence-validated";
  }
  if (spec?.semanticOwnerId === SEMEME_CLASSIFICATION_OWNER_ID) {
    return "sememe-only-content-kind-validated";
  }
  if (spec?.semanticOwnerId === MORPHEME_TAXONOMY_OWNER_ID) {
    return "morpheme-type-level-terminology-validated";
  }
  if (spec?.semanticOwnerId === TOKEN_ELEMENT_CLASSIFICATION_OWNER_ID) {
    return "token-four-kind-inventory-validated";
  }
  if (spec?.semanticOwnerId === PHONE_REPERTORY_ANALYSIS_OWNER_ID) {
    return ({
      "phone-definition": "phone-definition-validated",
      "single-member-repertory": "phone-single-member-repertory-validated",
      "multiple-member-repertory": "phone-multiple-member-repertory-validated",
      "regular-phone": "phone-regular-feature-identity-validated",
      "irregular-phone": "phone-irregular-alternative-validated",
      "distant-irregular-phone": "phone-distant-irregular-alternative-validated",
      "cross-phoneme-identity": "phone-cross-phoneme-identity-condition-validated",
      "nahuatl-irregular-repertory": "phone-nahuatl-irregular-repertory-validated",
      "symbol-specificity": "phone-symbol-specificity-alternative-validated",
      "repertory-optionality": "phone-repertory-optionality-validated",
    })[spec.selection] || "phone-repertory-analysis-validated";
  }
  if (spec?.semanticOwnerId === GRAPH_VARIANT_ANALYSIS_OWNER_ID) {
    return "graph-definition-validated";
  }
  if (spec?.semanticOwnerId === SIG_TOKEN_CLASSIFICATION_OWNER_ID) {
    return spec.selection === "irregular-sig"
      ? "sig-irregular-alternative-validated"
      : "sig-regular-definition-validated";
  }
  if (spec?.semanticOwnerId === SEME_TOKEN_CLASSIFICATION_OWNER_ID) {
    return "seme-token-representation-validated";
  }
  if (spec?.semanticOwnerId === MORPH_TOKEN_CLASSIFICATION_OWNER_ID) {
    return "morph-token-definition-validated";
  }
  if (spec?.semanticOwnerId === MORPH_CONDITIONING_ANALYSIS_OWNER_ID) {
    return spec.selection === "morphological-conditioning"
      ? "morph-morphological-conditioning-validated"
      : "morph-phonological-conditioning-validated";
  }
  if (
    spec?.semanticOwnerId === MORPH_FORM_INSTANCE_CLASSIFICATION_OWNER_ID
  ) {
    return "morph-form-instance-definition-validated";
  }
  if (
    spec?.semanticOwnerId === MORPH_STRUCTURE_PERCEPTION_ANALYSIS_OWNER_ID
  ) {
    return ({
      "sounded-morph-recognition":
        "morph-sounded-structure-recognition-validated",
      "syllable-morph-noncoterminality":
        "morph-syllable-noncoterminality-condition-validated",
      "sigeme-content-recognition":
        "morph-sigeme-content-recognition-condition-validated",
    })[spec.selection] || "morph-structure-perception-analysis-validated";
  }
  switch (spec?.classification) {
    case "foreign-grammar-template":
      return "foreign-sentence-template-rejected";
    case "form-class-word-conflation":
      return "word-class-conflation-rejected";
    case "foreign-transitivity-definition":
      return "foreign-transitivity-definition-rejected";
    case "foreign-grammar-category":
      return "foreign-category-rejected";
    case "translation-authority":
      return "translation-authority-rejected";
    case "syllabic-carrier-unit":
      return "vocable-term-classified";
    case "classical-structural-term":
      return "nahuatl-term-classified";
    default:
      return "concept-classification-resolved";
  }
}

function buildConceptExecutionEvidence({
  source = null,
  spec = null,
  canonicalOwnerRank = "",
  authorizationStatus = "blocked",
  blockReason = "",
} = {}) {
  const ownerId = spec?.semanticOwnerId
    || "classical-linguistic-concept-owner";
  const operationId = getConceptValidationOperationId(spec);
  const providedInput = deepFreeze({
    domain: source?.domain || "",
    selection: source?.selection || "",
    assertedClassification: source?.assertedClassification || "",
  });
  const sourceIdentity = deepFreeze({
    kind: source?.kind || "",
    domain: source?.domain || "",
    selection: source?.selection || "",
    assertedClassification: source?.assertedClassification || "",
    ownerIssued: Boolean(source),
  });
  const decisionStepId = getConceptDecisionStepId(spec);
  const rejected = authorizationStatus !== "authorized";
  const outcomeStatus = rejected ? "rejected" : "authorized";
  const routeStepList = [
    {
      stepId: "concept-source-admitted",
      kind: "source",
      actorId: "classical-linguistic-concept-owner",
      status: source ? "accepted" : "rejected",
      reason: source ? "owner-issued-concept-source" : blockReason,
      branchId: "concept-source-authority",
      decision: source ? "admit" : "reject",
      evaluatedRuleIds: [],
      executedRuleIds: [],
      inputState: providedInput,
      outputState: deepFreeze({
        sourceAuthorized: Boolean(source),
      }),
    },
    {
      stepId: "concept-semantic-owner-selected",
      kind: "semantic-owner",
      actorId: "classical-linguistic-concept-owner",
      status: spec ? "selected" : "rejected",
      reason: spec ? "typed-domain-selection-match" : blockReason,
      branchId: "semantic-owner-jurisdiction",
      decision: spec ? ownerId : "no-owner",
      evaluatedRuleIds: [],
      executedRuleIds: [],
      inputState: deepFreeze({
        domain: source?.domain || "",
        selection: source?.selection || "",
      }),
      outputState: deepFreeze({ ownerId }),
    },
    {
      stepId: decisionStepId,
      kind: rejected ? "guard" : "operation",
      actorId: ownerId,
      status: rejected ? "rejected" : "executed",
      reason: blockReason || "typed-classification-authorized",
      branchId: "concept-classification-decision",
      decision: rejected ? "reject" : "authorize",
      evaluatedRuleIds: spec ? [operationId] : [],
      executedRuleIds: spec && !rejected ? [operationId] : [],
      inputState: deepFreeze({
        classification: spec?.classification || "",
        assertedClassification: source?.assertedClassification || "",
      }),
      outputState: deepFreeze({
        authorizationStatus,
        blockReason,
        classification: authorizationStatus === "authorized"
          ? spec?.classification || ""
          : "",
      }),
    },
  ];
  if (spec?.requiredOwnerRank) {
    const prerequisiteAccepted = canonicalOwnerRank === spec.requiredOwnerRank;
    routeStepList.splice(2, 0, {
      stepId: `${spec.requiredOwnerRank}-owner-result-validated`,
      kind: "guard",
      actorId: ownerId,
      invocationRole: "prerequisite",
      status: prerequisiteAccepted ? "accepted" : "rejected",
      reason: prerequisiteAccepted
        ? `owner-issued-${spec.requiredOwnerRank}-result-retained`
        : `${spec.requiredOwnerRank}-owner-issued-result-required`,
      branchId: `${spec.requiredOwnerRank}-owner-result-authority`,
      decision: prerequisiteAccepted ? "consume" : "reject",
      evaluatedRuleIds: [],
      executedRuleIds: [],
      inputState: deepFreeze({
        requiredOwnerRank: spec.requiredOwnerRank,
        canonicalOwnerRank,
      }),
      outputState: deepFreeze({ prerequisiteAccepted }),
    });
  }
  if (
    !rejected
    && spec?.classification === "syllabic-carrier-unit"
  ) {
    routeStepList.push({
      stepId: "vocable-carrier-domain-expanded",
      kind: "operation",
      actorId: ownerId,
      status: "executed",
      reason: "vocable-covers-particle-and-nuclear-clause-carriers",
      branchId: "vocable-carrier-jurisdiction",
      decision: "expand-carrier-domain",
      evaluatedRuleIds: [operationId],
      executedRuleIds: [operationId],
      inputState: deepFreeze({
        classification: spec.classification,
        relations: [...spec.relations],
      }),
      outputState: deepFreeze({
        particleCarrier: spec.relations.includes("particle-carrier"),
        nuclearClauseCarrier:
          spec.relations.includes("nuclear-clause-carrier"),
      }),
    });
  }
  if (
    rejected
    && spec?.semanticOwnerId === NUCLEAR_CLAUSE_STRUCTURE_OWNER_ID
  ) {
    routeStepList.push({
      stepId: "nuclear-clause-word-rank-rejected",
      kind: "guard",
      actorId: ownerId,
      status: "rejected",
      reason: blockReason,
      branchId: "nuclear-clause-rank-boundary",
      decision: "reject-word-rank",
      evaluatedRuleIds: [operationId],
      executedRuleIds: [],
      inputState: deepFreeze({
        classification: spec.classification,
        selection: spec.selection,
      }),
      outputState: deepFreeze({
        nuclearClauseWordRankAuthorized: false,
      }),
    });
  }
  if (
    !rejected
    && spec?.semanticOwnerId === COMMUNICATION_STRUCTURE_OWNER_ID
    && spec.selection === "communication-event"
  ) {
    routeStepList.push(
      {
        stepId: "communication-rule-mediated-sequence-validated",
        kind: "operation",
        actorId: ownerId,
        status: "executed",
        reason: "shared-rules-mediate-speaker-information-medium-sequence",
        branchId: "communication-rule-mediated-composition",
        decision: "validate-rule-mediated-sequence",
        evaluatedRuleIds: [operationId],
        executedRuleIds: [operationId],
        inputState: deepFreeze({
          facts: [...spec.facts],
          relations: [...spec.relations],
        }),
        outputState: deepFreeze({
          speakerToAddressee:
            spec.relations.includes(
              "speaker-combines-information-through-medium-for-addressee",
            ),
          sharedRulesApplied:
            spec.relations.includes(
              "shared-rules-constrain-selection-and-integration",
            ),
        }),
      },
      {
        stepId: "information-medium-coupling-validated",
        kind: "operation",
        actorId: ownerId,
        status: "executed",
        reason: "information-and-medium-are-coupled",
        branchId: "communication-carrier-content-coupling",
        decision: "validate-coupling",
        evaluatedRuleIds: [operationId],
        executedRuleIds: [operationId],
        inputState: deepFreeze({
          relations: [...spec.relations],
        }),
        outputState: deepFreeze({
          informationMediumCoupled:
            spec.relations.includes("carrier-content-coupling"),
        }),
      },
    );
  }
  if (!rejected && spec?.semanticOwnerId === ANALYSIS_LEVEL_OWNER_ID) {
    const additionalStepIds = spec.selection === "type"
      ? [
        "analysis-type-class-identity-validated",
        "analysis-eme-label-system-validated",
        "analysis-type-token-cardinality-validated",
        "analysis-mental-construct-validated",
        "analysis-type-distillation-validated",
      ]
      : spec.selection === "token"
        ? [
          "analysis-token-representation-validated",
          "analysis-type-token-cardinality-validated",
          "analysis-mental-construct-validated",
          "analysis-token-distillation-validated",
        ]
        : [
          "analysis-instance-manifestation-validated",
          "analysis-instance-quotation-use-validated",
        ];
    routeStepList.push(...additionalStepIds.map((stepId) => ({
      stepId,
      kind: "operation",
      actorId: ownerId,
      status: "executed",
      reason: "typed-analysis-level-claim-validated",
      branchId: "analysis-level-structure",
      decision: "validate-analysis-level-claim",
      evaluatedRuleIds: [operationId],
      executedRuleIds: [operationId],
      inputState: deepFreeze({
        selection: spec.selection,
        facts: [...spec.facts],
        relations: [...spec.relations],
      }),
      outputState: deepFreeze({
        validatedClaim: stepId,
      }),
    })));
  }
  if (!rejected && spec?.semanticOwnerId === ELEMENT_CLASSIFICATION_OWNER_ID) {
    const additionalStepIds = spec.selection === "element"
      ? ["element-feature-bundle-validated"]
      : [
        "element-carrier-content-partition-validated",
        "element-greek-root-terminology-validated",
      ];
    routeStepList.push(...additionalStepIds.map((stepId) => ({
      stepId,
      kind: "operation",
      actorId: ownerId,
      status: "executed",
      reason: "typed-linguistic-element-claim-validated",
      branchId: "linguistic-element-classification",
      decision: "validate-linguistic-element-claim",
      evaluatedRuleIds: [operationId],
      executedRuleIds: [operationId],
      inputState: deepFreeze({
        selection: spec.selection,
        facts: [...spec.facts],
        relations: [...spec.relations],
      }),
      outputState: deepFreeze({
        validatedClaim: stepId,
      }),
    })));
  }
  if (!rejected && spec?.semanticOwnerId === PHONEME_CLASSIFICATION_OWNER_ID) {
    const additionalStepIds = [
      "phoneme-meaning-distinction-validated",
      "phoneme-articulatory-features-validated",
      "phoneme-enculturated-functional-identity-validated",
      "phoneme-language-specific-inventory-validated",
      "phoneme-one-sound-one-symbol-validated",
      "phoneme-special-symbol-requirement-validated",
    ];
    routeStepList.push(...additionalStepIds.map((stepId) => ({
      stepId,
      kind: "operation",
      actorId: ownerId,
      status: "executed",
      reason: "typed-phoneme-classification-claim-validated",
      branchId: "carrier-phoneme-classification",
      decision: "validate-phoneme-classification-claim",
      evaluatedRuleIds: [operationId],
      executedRuleIds: [operationId],
      inputState: deepFreeze({
        selection: spec.selection,
        facts: [...spec.facts],
        relations: [...spec.relations],
        restrictions: [...spec.restrictions],
      }),
      outputState: deepFreeze({
        validatedClaim: stepId,
      }),
    })));
  }
  if (!rejected && spec?.semanticOwnerId === GRAPHEME_CLASSIFICATION_OWNER_ID) {
    const additionalStepIds = [
      "grapheme-visual-representation-validated",
      "grapheme-shape-set-identity-validated",
      "grapheme-phoneme-correspondence-validated",
      "grapheme-graph-variation-validated",
    ];
    routeStepList.push(...additionalStepIds.map((stepId) => ({
      stepId,
      kind: "operation",
      actorId: ownerId,
      status: "executed",
      reason: "typed-grapheme-classification-claim-validated",
      branchId: "carrier-grapheme-classification",
      decision: "validate-grapheme-classification-claim",
      evaluatedRuleIds: [operationId],
      executedRuleIds: [operationId],
      inputState: deepFreeze({
        selection: spec.selection,
        facts: [...spec.facts],
        relations: [...spec.relations],
        restrictions: [...spec.restrictions],
      }),
      outputState: deepFreeze({
        validatedClaim: stepId,
      }),
    })));
  }
  if (!rejected && spec?.semanticOwnerId === SIGEME_CLASSIFICATION_OWNER_ID) {
    const additionalStepIds = [
      "sigeme-single-inventory-validated",
      "sigeme-meaning-bearing-silence-validated",
      "sigeme-slash-oval-zero-notation-validated",
    ];
    routeStepList.push(...additionalStepIds.map((stepId) => ({
      stepId,
      kind: "operation",
      actorId: ownerId,
      status: "executed",
      reason: "typed-sigeme-classification-claim-validated",
      branchId: "carrier-sigeme-classification",
      decision: "validate-sigeme-classification-claim",
      evaluatedRuleIds: [operationId],
      executedRuleIds: [operationId],
      inputState: deepFreeze({
        selection: spec.selection,
        facts: [...spec.facts],
        relations: [...spec.relations],
        restrictions: [...spec.restrictions],
      }),
      outputState: deepFreeze({
        validatedClaim: stepId,
      }),
    })));
  }
  if (!rejected && spec?.semanticOwnerId === SIG_TOKEN_CLASSIFICATION_OWNER_ID) {
    const additionalStepIds = spec.selection === "irregular-sig"
      ? [
        "sig-irregular-phoneme-unit-validated",
        "sig-irregular-square-zero-validated",
      ]
      : ["sig-regular-zero-singleton-validated"];
    routeStepList.push(...additionalStepIds.map((stepId) => ({
      stepId,
      kind: "operation",
      actorId: ownerId,
      status: "executed",
      reason: "typed-sig-token-classification-claim-validated",
      branchId: "sig-token-classification",
      decision: "validate-sig-token-classification-claim",
      evaluatedRuleIds: [operationId],
      executedRuleIds: [operationId],
      inputState: deepFreeze({
        selection: spec.selection,
        facts: [...spec.facts],
        relations: [...spec.relations],
        restrictions: [...spec.restrictions],
      }),
      outputState: deepFreeze({
        validatedClaim: stepId,
      }),
    })));
  }
  if (
    !rejected
    && spec?.semanticOwnerId === MORPH_TOKEN_CLASSIFICATION_OWNER_ID
  ) {
    const additionalStepIds = [
      "morph-regular-irregular-alternative-validated",
      "morph-notation-dependency-validated",
      "morph-square-bracket-notation-validated",
    ];
    routeStepList.push(...additionalStepIds.map((stepId) => ({
      stepId,
      kind: "operation",
      actorId: ownerId,
      status: "executed",
      reason: "typed-morph-token-classification-claim-validated",
      branchId: "morph-token-classification",
      decision: "validate-morph-token-classification-claim",
      evaluatedRuleIds: [operationId],
      executedRuleIds: [operationId],
      inputState: deepFreeze({
        selection: spec.selection,
        facts: [...spec.facts],
        relations: [...spec.relations],
        restrictions: [...spec.restrictions],
      }),
      outputState: deepFreeze({
        validatedClaim: stepId,
      }),
    })));
  }
  if (
    !rejected
    && spec?.semanticOwnerId
      === MORPH_FORM_INSTANCE_CLASSIFICATION_OWNER_ID
  ) {
    routeStepList.push({
      stepId: "morph-form-instance-separation-validated",
      kind: "operation",
      actorId: ownerId,
      status: "executed",
      reason: "typed-morph-form-instance-classification-claim-validated",
      branchId: "morph-form-instance-classification",
      decision: "validate-form-as-instance-of-morph",
      evaluatedRuleIds: [operationId],
      executedRuleIds: [operationId],
      inputState: deepFreeze({
        selection: spec.selection,
        facts: [...spec.facts],
        relations: [...spec.relations],
        restrictions: [...spec.restrictions],
      }),
      outputState: deepFreeze({
        formClassifiedAsMorphInstance: true,
        concreteSurfaceGenerated: false,
      }),
    });
  }
  if (
    !rejected
    && spec?.semanticOwnerId
      === MORPH_STRUCTURE_PERCEPTION_ANALYSIS_OWNER_ID
    && spec.selection === "syllable-morph-noncoterminality"
  ) {
    routeStepList.push({
      stepId: "morph-sounded-structure-recognition-validated",
      kind: "operation",
      actorId: ownerId,
      status: "executed",
      reason: "typed-sounded-morph-recognition-result-validated",
      branchId: "morph-structure-perception-analysis",
      decision: "validate-sounded-morph-recognition-result",
      evaluatedRuleIds: [operationId],
      executedRuleIds: [operationId],
      inputState: deepFreeze({
        selection: spec.selection,
        facts: [...spec.facts],
        relations: [...spec.relations],
        restrictions: [...spec.restrictions],
      }),
      outputState: deepFreeze({
        soundedMorphRecognitionDifficultyValidated: true,
        segmentationRewritten: false,
      }),
    });
  }
  if (!rejected && spec?.semanticOwnerId === SEMEME_CLASSIFICATION_OWNER_ID) {
    const additionalStepIds = [
      "sememe-meaningfulness-carrier-expression-validated",
      "sememe-semantic-component-boundary-validated",
    ];
    routeStepList.push(...additionalStepIds.map((stepId) => ({
      stepId,
      kind: "operation",
      actorId: ownerId,
      status: "executed",
      reason: "typed-sememe-classification-claim-validated",
      branchId: "content-sememe-classification",
      decision: "validate-sememe-classification-claim",
      evaluatedRuleIds: [operationId],
      executedRuleIds: [operationId],
      inputState: deepFreeze({
        selection: spec.selection,
        facts: [...spec.facts],
        relations: [...spec.relations],
        restrictions: [...spec.restrictions],
      }),
      outputState: deepFreeze({
        validatedClaim: stepId,
      }),
    })));
  }
  if (!rejected && spec?.semanticOwnerId === MORPHEME_TAXONOMY_OWNER_ID) {
    const commonStepIds = [
      "morpheme-composite-symbiosis-validated",
      "morpheme-carrier-content-formation-validated",
      "morpheme-grapheme-exclusion-validated",
      "morpheme-symbiotic-notation-validated",
      "morpheme-space-saving-notation-validated",
      "morpheme-carrier-shorthand-validated",
      "morpheme-carrier-nonconflation-validated",
      "morpheme-element-cooperation-validated",
      "morpheme-three-kind-inventory-validated",
    ];
    const selectionStepIds = ({
      "portmanteau-morpheme": [
        "morpheme-content-cluster-definition-validated",
        "morpheme-content-cluster-condition-validated",
      ],
      "connective-morpheme": [
        "morpheme-connective-carrier-content-validated",
        "morpheme-connective-grammatical-meaning-validated",
      ],
      "ordinary-morpheme": [
        "morpheme-ordinary-carrier-content-validated",
        "morpheme-ordinary-cooccurrence-evidence-validated",
      ],
      "silent-morpheme": [
        "morpheme-silent-carrier-content-validated",
        "morpheme-linguistic-economy-validated",
        "morpheme-default-redundancy-condition-validated",
      ],
    })[spec.selection] || [];
    routeStepList.push(...[
      ...commonStepIds,
      ...selectionStepIds,
    ].map((stepId) => ({
      stepId,
      kind: "operation",
      actorId: ownerId,
      status: "executed",
      reason: "typed-morpheme-taxonomy-claim-validated",
      branchId: "morpheme-taxonomy",
      decision: "validate-morpheme-taxonomy-claim",
      evaluatedRuleIds: [operationId],
      executedRuleIds: [operationId],
      inputState: deepFreeze({
        selection: spec.selection,
        facts: [...spec.facts],
        relations: [...spec.relations],
        restrictions: [...spec.restrictions],
      }),
      outputState: deepFreeze({
        validatedClaim: stepId,
      }),
    })));
  }
  if (
    !rejected
    && spec?.semanticOwnerId === TOKEN_ELEMENT_CLASSIFICATION_OWNER_ID
  ) {
    const commonStepIds = [
      "token-four-kind-names-validated",
      "token-morph-symbiotic-inventory-validated",
    ];
    const boundaryStepIds = spec.selection === "instance-boundary"
      ? [
        "token-instance-manifestation-inventory-validated",
        "token-instance-silence-exclusion-validated",
        "token-sig-no-instance-presence-validated",
        "token-sig-implicit-presence-validated",
      ]
      : [];
    routeStepList.push(...[
      ...commonStepIds,
      ...boundaryStepIds,
    ].map((stepId) => ({
      stepId,
      kind: "operation",
      actorId: ownerId,
      status: "executed",
      reason: "typed-token-element-classification-claim-validated",
      branchId: "token-element-classification",
      decision: "validate-token-element-classification-claim",
      evaluatedRuleIds: [operationId],
      executedRuleIds: [operationId],
      inputState: deepFreeze({
        selection: spec.selection,
        facts: [...spec.facts],
        relations: [...spec.relations],
        restrictions: [...spec.restrictions],
      }),
      outputState: deepFreeze({
        validatedClaim: stepId,
      }),
    })));
  }
  const routeSteps = deepFreeze(routeStepList);
  const execution = deepFreeze({
    status: outcomeStatus,
    reason: blockReason || null,
    semanticOwnerId: ownerId,
    operationId,
    selectedRuleId: rejected ? null : operationId,
    stages: routeSteps.map((step) => step.stepId),
    routeSteps,
  });
  return deepFreeze({
    ownerId,
    evaluatedOperationId: operationId,
    inputContract: "complete-typed-concept-source",
    functionIds: [
      "buildClassicalGrammarConceptSource",
      "evaluateClassicalGrammarConcept",
    ],
    providedInput,
    sourceIdentity,
    execution,
    routeSteps,
    outcome: {
      status: outcomeStatus,
      reason: blockReason || null,
    },
  });
}

function inspectSilentMorphContrastRequest(request) {
  if (!request || typeof request !== "object" || Array.isArray(request)) {
    return "silent-contrast-source-object-required";
  }
  const prototype = Object.getPrototypeOf(request);
  if (prototype !== Object.prototype && prototype !== null) {
    return "silent-contrast-source-plain-object-required";
  }
  for (const key of Reflect.ownKeys(request)) {
    if (
      typeof key !== "string"
      || !SILENT_MORPH_CONTRAST_REQUEST_KEYS.has(key)
    ) {
      return `silent-contrast-source-unrecognized-constituent:${String(key)}`;
    }
    const descriptor = Object.getOwnPropertyDescriptor(request, key);
    if (
      !descriptor
      || !Object.prototype.hasOwnProperty.call(descriptor, "value")
    ) {
      return `silent-contrast-source-data-constituent-required:${key}`;
    }
  }
  return "";
}

function silentMorphContrastFailureReason(source = null) {
  if (source?.correspondingPosition !== "corresponding") {
    return "silent-contrast-corresponding-position-required";
  }
  if (source?.structuralPattern !== "similarly-structured") {
    return "silent-contrast-similar-structure-required";
  }
  if (source?.categoryRelation !== "related-category") {
    return "silent-contrast-related-category-required";
  }
  if (source?.soundedCounterpart !== "present") {
    return "silent-contrast-sounded-counterpart-required";
  }
  return "";
}

function buildSilentMorphContrastExecutionEvidence({
  source = null,
  authorizationStatus = "blocked",
  blockReason = "",
} = {}) {
  const providedInput = deepFreeze({
    candidateKind: source?.candidateKind || "",
    correspondingPosition: source?.correspondingPosition || "",
    structuralPattern: source?.structuralPattern || "",
    categoryRelation: source?.categoryRelation || "",
    soundedCounterpart: source?.soundedCounterpart || "",
  });
  const sourceIdentity = deepFreeze({
    kind: source?.kind || "",
    ...providedInput,
    ownerIssued: Boolean(source),
  });
  const sourceAuthorized = Boolean(source);
  const contrastAuthorized = authorizationStatus === "authorized";
  const outcomeStatus = contrastAuthorized ? "authorized" : "rejected";
  const routeStepList = [
    {
      stepId: "silent-contrast-source-admitted",
      kind: "source",
      actorId: SILENT_MORPH_CONTRAST_OWNER_ID,
      status: sourceAuthorized ? "accepted" : "rejected",
      reason: sourceAuthorized
        ? "owner-issued-complete-silent-morph-contrast-source"
        : blockReason,
      branchId: "silent-contrast-source-authority",
      decision: sourceAuthorized ? "admit" : "reject",
      evaluatedRuleIds: [],
      executedRuleIds: [],
      inputState: providedInput,
      outputState: deepFreeze({ sourceAuthorized }),
    },
    {
      stepId: "silent-contrast-semantic-owner-selected",
      kind: "semantic-owner",
      actorId: SILENT_MORPH_CONTRAST_OWNER_ID,
      status: sourceAuthorized ? "selected" : "rejected",
      reason: sourceAuthorized
        ? "complete-typed-contrast-coordinates-admitted"
        : blockReason,
      branchId: "silent-contrast-owner-jurisdiction",
      decision: sourceAuthorized
        ? SILENT_MORPH_CONTRAST_OWNER_ID
        : "no-owner",
      evaluatedRuleIds: [],
      executedRuleIds: [],
      inputState: deepFreeze({
        sourceKind: source?.kind || "",
        candidateKind: source?.candidateKind || "",
      }),
      outputState: deepFreeze({
        ownerId: sourceAuthorized ? SILENT_MORPH_CONTRAST_OWNER_ID : "",
      }),
    },
  ];
  const coordinateSpecs = [
    {
      field: "correspondingPosition",
      expected: "corresponding",
      stepId: "silent-contrast-corresponding-position-validated",
      acceptedReason: "corresponding-position-confirmed",
      rejectedReason: "silent-contrast-corresponding-position-required",
    },
    {
      field: "structuralPattern",
      expected: "similarly-structured",
      stepId: "silent-contrast-similar-structure-validated",
      acceptedReason: "similarly-structured-item-confirmed",
      rejectedReason: "silent-contrast-similar-structure-required",
    },
    {
      field: "categoryRelation",
      expected: "related-category",
      stepId: "silent-contrast-related-category-validated",
      acceptedReason: "related-category-confirmed",
      rejectedReason: "silent-contrast-related-category-required",
    },
    {
      field: "soundedCounterpart",
      expected: "present",
      stepId: "silent-contrast-sounded-counterpart-validated",
      acceptedReason: "sounded-counterpart-confirmed",
      rejectedReason: "silent-contrast-sounded-counterpart-required",
    },
  ];
  let priorFailureReason = sourceAuthorized ? "" : blockReason;
  for (const coordinate of coordinateSpecs) {
    const suppliedValue = source?.[coordinate.field] || "";
    const matches = suppliedValue === coordinate.expected;
    const skipped = Boolean(priorFailureReason);
    const stepReason = skipped
      ? `prior-silent-contrast-condition-failed:${priorFailureReason}`
      : matches
        ? coordinate.acceptedReason
        : coordinate.rejectedReason;
    routeStepList.push({
      stepId: coordinate.stepId,
      kind: "guard",
      actorId: SILENT_MORPH_CONTRAST_OWNER_ID,
      status: skipped ? "skipped" : matches ? "accepted" : "rejected",
      reason: stepReason,
      branchId: `silent-contrast-${coordinate.field}`,
      decision: skipped ? "skip" : matches ? "accept" : "reject",
      evaluatedRuleIds: skipped
        ? []
        : [SILENT_MORPH_CONTRAST_OPERATION_ID],
      executedRuleIds: [],
      inputState: deepFreeze({
        field: coordinate.field,
        suppliedValue,
        requiredValue: coordinate.expected,
      }),
      outputState: deepFreeze({
        coordinateSatisfied: !skipped && matches,
        failureReason: stepReason,
      }),
    });
    if (!skipped && !matches) {
      priorFailureReason = coordinate.rejectedReason;
    }
  }
  const finalInputState = deepFreeze({
    candidateKind: source?.candidateKind || "",
    correspondingPosition: source?.correspondingPosition || "",
    structuralPattern: source?.structuralPattern || "",
    categoryRelation: source?.categoryRelation || "",
    soundedCounterpart: source?.soundedCounterpart || "",
  });
  if (contrastAuthorized) {
    routeStepList.push(
      {
        stepId: "silent-contrast-required-coordinates-validated",
        kind: "operation",
        actorId: SILENT_MORPH_CONTRAST_OWNER_ID,
        status: "executed",
        reason: "all-required-sounded-contrast-coordinates-confirmed",
        branchId: "silent-contrast-coordinate-conjunction",
        decision: "validate-coordinate-conjunction",
        evaluatedRuleIds: [SILENT_MORPH_CONTRAST_OPERATION_ID],
        executedRuleIds: [SILENT_MORPH_CONTRAST_OPERATION_ID],
        inputState: finalInputState,
        outputState: deepFreeze({ allRequiredCoordinatesSatisfied: true }),
      },
      {
        stepId: "silent-morph-hypothesis-contrast-licensed",
        kind: "operation",
        actorId: SILENT_MORPH_CONTRAST_OWNER_ID,
        status: "executed",
        reason: "sounded-silent-contrast-justifies-hypothesis",
        branchId: "silent-morph-hypothesis-decision",
        decision: "license-by-contrast",
        evaluatedRuleIds: [SILENT_MORPH_CONTRAST_OPERATION_ID],
        executedRuleIds: [SILENT_MORPH_CONTRAST_OPERATION_ID],
        inputState: finalInputState,
        outputState: deepFreeze({
          silentHypothesisAuthorized: true,
          surfaceGenerated: false,
        }),
      },
    );
  } else {
    routeStepList.push(
      {
        stepId: "silent-contrast-required-coordinates-rejected",
        kind: "guard",
        actorId: SILENT_MORPH_CONTRAST_OWNER_ID,
        status: "rejected",
        reason: blockReason,
        branchId: "silent-contrast-coordinate-conjunction",
        decision: "reject-coordinate-conjunction",
        evaluatedRuleIds: sourceAuthorized
          ? [SILENT_MORPH_CONTRAST_OPERATION_ID]
          : [],
        executedRuleIds: [],
        inputState: finalInputState,
        outputState: deepFreeze({ allRequiredCoordinatesSatisfied: false }),
      },
      {
        stepId: "silent-morph-hypothesis-contrast-rejected",
        kind: "guard",
        actorId: SILENT_MORPH_CONTRAST_OWNER_ID,
        status: "rejected",
        reason: blockReason,
        branchId: "silent-morph-hypothesis-decision",
        decision: "reject-unlicensed-silence",
        evaluatedRuleIds: sourceAuthorized
          ? [SILENT_MORPH_CONTRAST_OPERATION_ID]
          : [],
        executedRuleIds: [],
        inputState: finalInputState,
        outputState: deepFreeze({
          silentHypothesisAuthorized: false,
          surfaceGenerated: false,
        }),
      },
    );
  }
  const routeSteps = deepFreeze(routeStepList);
  const execution = deepFreeze({
    status: outcomeStatus,
    reason: blockReason || null,
    semanticOwnerId: SILENT_MORPH_CONTRAST_OWNER_ID,
    operationId: SILENT_MORPH_CONTRAST_OPERATION_ID,
    selectedRuleId: contrastAuthorized
      ? SILENT_MORPH_CONTRAST_OPERATION_ID
      : null,
    stages: routeSteps.map((step) => step.stepId),
    routeSteps,
  });
  return deepFreeze({
    ownerId: SILENT_MORPH_CONTRAST_OWNER_ID,
    evaluatedOperationId: SILENT_MORPH_CONTRAST_OPERATION_ID,
    inputContract: "complete-typed-silent-morph-contrast-source",
    functionIds: [
      "buildClassicalSilentMorphContrastSource",
      "evaluateClassicalSilentMorphContrast",
    ],
    providedInput,
    sourceIdentity,
    execution,
    routeSteps,
    outcome: {
      status: outcomeStatus,
      reason: blockReason || null,
    },
  });
}

function inspectLinguisticUnitCompositionRequest(request) {
  if (!request || typeof request !== "object" || Array.isArray(request)) {
    return "linguistic-unit-composition-source-object-required";
  }
  const prototype = Object.getPrototypeOf(request);
  if (prototype !== Object.prototype && prototype !== null) {
    return "linguistic-unit-composition-source-plain-object-required";
  }
  for (const key of Reflect.ownKeys(request)) {
    if (
      typeof key !== "string"
      || !LINGUISTIC_UNIT_COMPOSITION_REQUEST_KEYS.has(key)
    ) {
      return `linguistic-unit-composition-source-unrecognized-constituent:${String(key)}`;
    }
    const descriptor = Object.getOwnPropertyDescriptor(request, key);
    if (
      !descriptor
      || !Object.prototype.hasOwnProperty.call(descriptor, "value")
    ) {
      return `linguistic-unit-composition-source-data-constituent-required:${key}`;
    }
  }
  return "";
}

function summarizeCompositionConstituent(constituent = null, index = 0) {
  return deepFreeze({
    position: index + 1,
    kind: constituent?.kind || "",
    domain: constituent?.domain || "",
    selection: constituent?.selection || "",
    classification: constituent?.classification || "",
    semanticOwnerId: constituent?.semanticOwnerId || "",
    authorizationStatus: constituent?.authorizationStatus || "",
  });
}

function compositionMediumFailureReason(source = null) {
  if (source?.medium === "speech" && source?.sequenceOrder !== "temporal") {
    return "speech-linear-sequence-must-be-temporal";
  }
  if (source?.medium === "writing" && source?.sequenceOrder !== "spatial") {
    return "written-linear-sequence-must-be-spatial";
  }
  return "";
}

function buildLinguisticUnitCompositionExecutionEvidence({
  source = null,
  constituentAnalyses = [],
  authorizationStatus = "blocked",
  blockReason = "",
} = {}) {
  const constituentSummaries = deepFreeze(
    (Array.isArray(source?.constituents) ? source.constituents : [])
      .map(summarizeCompositionConstituent),
  );
  const providedInput = deepFreeze({
    medium: source?.medium || "",
    sequenceOrder: source?.sequenceOrder || "",
    structurePattern: source?.structurePattern || "",
    constituents: constituentSummaries,
  });
  const sourceAuthorized = Boolean(source);
  const compositionAuthorized = authorizationStatus === "authorized";
  const outcomeStatus = compositionAuthorized ? "authorized" : "rejected";
  const routeStepList = [
    {
      stepId: "linguistic-unit-composition-source-admitted",
      kind: "source",
      actorId: LINGUISTIC_UNIT_COMPOSITION_OWNER_ID,
      status: sourceAuthorized ? "accepted" : "rejected",
      reason: sourceAuthorized
        ? "owner-issued-complete-linguistic-unit-composition-source"
        : blockReason,
      branchId: "linguistic-unit-composition-source-authority",
      decision: sourceAuthorized ? "admit" : "reject",
      evaluatedRuleIds: [],
      executedRuleIds: [],
      inputState: providedInput,
      outputState: deepFreeze({ sourceAuthorized }),
    },
    {
      stepId: "linguistic-unit-composition-semantic-owner-selected",
      kind: "semantic-owner",
      actorId: LINGUISTIC_UNIT_COMPOSITION_OWNER_ID,
      status: sourceAuthorized ? "selected" : "rejected",
      reason: sourceAuthorized
        ? "typed-linear-sequence-source-admitted"
        : blockReason,
      branchId: "linguistic-unit-composition-owner-jurisdiction",
      decision: sourceAuthorized
        ? LINGUISTIC_UNIT_COMPOSITION_OWNER_ID
        : "no-owner",
      evaluatedRuleIds: [],
      executedRuleIds: [],
      inputState: deepFreeze({
        sourceKind: source?.kind || "",
        constituentCount: providedInput.constituents.length,
      }),
      outputState: deepFreeze({
        ownerId: sourceAuthorized
          ? LINGUISTIC_UNIT_COMPOSITION_OWNER_ID
          : "",
      }),
    },
  ];
  const mediumReason = sourceAuthorized
    ? compositionMediumFailureReason(source)
    : blockReason;
  const countReason = sourceAuthorized && !mediumReason
    && source.constituents.length !== 2
    ? "binary-unit-composition-requires-two-constituents"
    : "";
  const authorityReason = sourceAuthorized && !mediumReason && !countReason
    ? constituentAnalyses.find((analysis) => analysis.reason)?.reason || ""
    : "";
  const structureReason = sourceAuthorized
    && !mediumReason
    && !countReason
    && !authorityReason
    && source.structurePattern !== "patterned-whole"
    ? "linguistically-valid-sequence-must-be-structured"
    : "";
  const guardSpecs = [
    {
      stepId: "linear-sequence-medium-validated",
      branchId: "linear-sequence-medium-order",
      matches: !mediumReason,
      acceptedReason: source?.medium === "speech"
        ? "speech-temporal-linearity-confirmed"
        : "writing-spatial-linearity-confirmed",
      rejectedReason: mediumReason,
      inputState: {
        medium: source?.medium || "",
        sequenceOrder: source?.sequenceOrder || "",
      },
    },
    {
      stepId: "binary-constituent-count-validated",
      branchId: "binary-unit-composition-arity",
      matches: !countReason,
      acceptedReason: "two-constituent-units-confirmed",
      rejectedReason: countReason,
      inputState: { constituentCount: providedInput.constituents.length },
    },
    {
      stepId: "constituent-unit-authority-validated",
      branchId: "constituent-unit-authority",
      matches: !authorityReason,
      acceptedReason: "two-owner-issued-basic-linear-elements-confirmed",
      rejectedReason: authorityReason,
      inputState: {
        constituents: constituentSummaries,
        analyses: constituentAnalyses,
      },
    },
    {
      stepId: "linguistic-sequence-structure-validated",
      branchId: "linguistic-sequence-structure",
      matches: !structureReason,
      acceptedReason: "parts-patterned-into-whole-confirmed",
      rejectedReason: structureReason,
      inputState: {
        structurePattern: source?.structurePattern || "",
      },
    },
  ];
  let priorFailureReason = sourceAuthorized ? "" : blockReason;
  for (const guard of guardSpecs) {
    const skipped = Boolean(priorFailureReason);
    const stepReason = skipped
      ? `prior-linguistic-unit-composition-condition-failed:${priorFailureReason}`
      : guard.matches
        ? guard.acceptedReason
        : guard.rejectedReason;
    routeStepList.push({
      stepId: guard.stepId,
      kind: "guard",
      actorId: LINGUISTIC_UNIT_COMPOSITION_OWNER_ID,
      status: skipped ? "skipped" : guard.matches ? "accepted" : "rejected",
      reason: stepReason,
      branchId: guard.branchId,
      decision: skipped ? "skip" : guard.matches ? "accept" : "reject",
      evaluatedRuleIds: skipped
        ? []
        : [LINGUISTIC_UNIT_COMPOSITION_OPERATION_ID],
      executedRuleIds: [],
      inputState: deepFreeze(guard.inputState),
      outputState: deepFreeze({
        conditionSatisfied: !skipped && guard.matches,
        failureReason: stepReason,
      }),
    });
    if (!skipped && !guard.matches) {
      priorFailureReason = guard.rejectedReason;
    }
  }
  if (compositionAuthorized) {
    const operationInputState = deepFreeze({
      medium: source.medium,
      sequenceOrder: source.sequenceOrder,
      constituentCount: source.constituents.length,
      structurePattern: source.structurePattern,
    });
    const operationSteps = [
      [
        "linear-sequence-composition-executed",
        "two-elements-combined-into-linear-sequence",
        { linearSequenceComposed: true },
      ],
      [
        "linguistic-sequence-structure-established",
        "parts-patterned-into-one-structured-whole",
        { structuredWholeEstablished: true },
      ],
      [
        "binary-unity-principle-executed",
        "two-units-compose-as-one-result-unit",
        { inputUnitCount: 2, resultUnitCount: 1 },
      ],
      [
        "constituent-unit-composition-executed",
        "constituents-entered-as-units-and-resulted-in-unit",
        { constituentUnitsAdmitted: true, complexUnitIssued: true },
      ],
    ];
    for (const [stepId, reason, outputState] of operationSteps) {
      routeStepList.push({
        stepId,
        kind: "operation",
        actorId: LINGUISTIC_UNIT_COMPOSITION_OWNER_ID,
        status: "executed",
        reason,
        branchId: "linguistic-unit-composition",
        decision: "compose",
        evaluatedRuleIds: [LINGUISTIC_UNIT_COMPOSITION_OPERATION_ID],
        executedRuleIds: [LINGUISTIC_UNIT_COMPOSITION_OPERATION_ID],
        inputState: operationInputState,
        outputState: deepFreeze(outputState),
      });
    }
  } else {
    routeStepList.push({
      stepId: "linguistic-unit-composition-rejected",
      kind: "guard",
      actorId: LINGUISTIC_UNIT_COMPOSITION_OWNER_ID,
      status: "rejected",
      reason: blockReason,
      branchId: "linguistic-unit-composition",
      decision: "reject-composition",
      evaluatedRuleIds: sourceAuthorized
        ? [LINGUISTIC_UNIT_COMPOSITION_OPERATION_ID]
        : [],
      executedRuleIds: [],
      inputState: providedInput,
      outputState: deepFreeze({ complexUnitIssued: false }),
    });
  }
  const routeSteps = deepFreeze(routeStepList);
  const execution = deepFreeze({
    status: outcomeStatus,
    reason: blockReason || null,
    semanticOwnerId: LINGUISTIC_UNIT_COMPOSITION_OWNER_ID,
    operationId: LINGUISTIC_UNIT_COMPOSITION_OPERATION_ID,
    selectedRuleId: compositionAuthorized
      ? LINGUISTIC_UNIT_COMPOSITION_OPERATION_ID
      : null,
    stages: routeSteps.map((step) => step.stepId),
    routeSteps,
  });
  return deepFreeze({
    ownerId: LINGUISTIC_UNIT_COMPOSITION_OWNER_ID,
    evaluatedOperationId: LINGUISTIC_UNIT_COMPOSITION_OPERATION_ID,
    inputContract: "complete-typed-linguistic-unit-composition-source",
    functionIds: [
      "buildClassicalLinguisticUnitCompositionSource",
      "evaluateClassicalLinguisticUnitComposition",
    ],
    providedInput,
    sourceIdentity: deepFreeze({
      kind: source?.kind || "",
      ...providedInput,
      ownerIssued: sourceAuthorized,
    }),
    execution,
    routeSteps,
    outcome: {
      status: outcomeStatus,
      reason: blockReason || null,
    },
  });
}

function inspectLinguisticStructureRecursionRequest(request) {
  if (!request || typeof request !== "object" || Array.isArray(request)) {
    return "linguistic-structure-recursion-source-object-required";
  }
  const prototype = Object.getPrototypeOf(request);
  if (prototype !== Object.prototype && prototype !== null) {
    return "linguistic-structure-recursion-source-plain-object-required";
  }
  for (const key of Reflect.ownKeys(request)) {
    if (
      typeof key !== "string"
      || !LINGUISTIC_STRUCTURE_RECURSION_REQUEST_KEYS.has(key)
    ) {
      return `linguistic-structure-recursion-source-unrecognized-constituent:${String(key)}`;
    }
    const descriptor = Object.getOwnPropertyDescriptor(request, key);
    if (
      !descriptor
      || !Object.prototype.hasOwnProperty.call(descriptor, "value")
    ) {
      return `linguistic-structure-recursion-source-data-constituent-required:${key}`;
    }
  }
  return "";
}

function namespaceRecursivePrerequisiteRouteSteps(routeSteps = []) {
  return (Array.isArray(routeSteps) ? routeSteps : []).map((step) => deepFreeze({
    ...step,
    stepId: `prior-structure.${step.stepId}`,
    branchId: step.branchId ? `prior-structure.${step.branchId}` : "",
    invocationRole: "prerequisite",
  }));
}

function buildLinguisticStructureRecursionExecutionEvidence({
  source = null,
  priorAnalysis = null,
  nextAnalysis = null,
  authorizationStatus = "blocked",
  blockReason = "",
} = {}) {
  const recursiveCompositionAuthorized = authorizationStatus === "authorized";
  const sourceAuthorized = source?.authorizationStatus === "authorized";
  const priorEvidence = priorAnalysis?.executionEvidence || null;
  const nestedRouteSteps = priorAnalysis?.routeRetained === true
    ? namespaceRecursivePrerequisiteRouteSteps(priorEvidence?.routeSteps)
    : [];
  const providedInput = deepFreeze({
    priorStructureKind: priorAnalysis?.structureKind || "",
    priorSemanticOwnerId: priorAnalysis?.semanticOwnerId || "",
    nextConstituentKind: nextAnalysis?.constituentKind || "",
    nextSemanticOwnerId: nextAnalysis?.semanticOwnerId || "",
    medium: priorAnalysis?.medium || "",
    sequenceOrder: priorAnalysis?.sequenceOrder || "",
    structurePattern: priorAnalysis?.structurePattern || "",
    priorLeafConstituentCount:
      priorAnalysis?.leafConstituentCount || 0,
  });
  const routeStepList = [...nestedRouteSteps];
  routeStepList.push(
    {
      stepId: "linguistic-structure-recursion-source-admitted",
      kind: "source",
      actorId: LINGUISTIC_STRUCTURE_RECURSION_OWNER_ID,
      status: sourceAuthorized ? "accepted" : "rejected",
      reason: sourceAuthorized
        ? "owner-issued-complete-linguistic-structure-recursion-source"
        : blockReason,
      branchId: "linguistic-structure-recursion-source-authority",
      decision: sourceAuthorized ? "admit" : "reject",
      evaluatedRuleIds: [],
      executedRuleIds: [],
      inputState: providedInput,
      outputState: deepFreeze({ sourceAuthorized }),
    },
    {
      stepId: "linguistic-structure-recursion-semantic-owner-selected",
      kind: "semantic-owner",
      actorId: LINGUISTIC_STRUCTURE_RECURSION_OWNER_ID,
      status: sourceAuthorized ? "selected" : "rejected",
      reason: sourceAuthorized
        ? "typed-prior-structural-unit-and-next-unit-source-admitted"
        : blockReason,
      branchId: "linguistic-structure-recursion-owner-jurisdiction",
      decision: sourceAuthorized
        ? LINGUISTIC_STRUCTURE_RECURSION_OWNER_ID
        : "no-owner",
      evaluatedRuleIds: [],
      executedRuleIds: [],
      inputState: deepFreeze({
        sourceKind: source?.kind || "",
        priorStructureKind: providedInput.priorStructureKind,
      }),
      outputState: deepFreeze({
        ownerId: sourceAuthorized
          ? LINGUISTIC_STRUCTURE_RECURSION_OWNER_ID
          : "",
      }),
    },
  );
  const guardSpecs = [
    {
      stepId: "recursive-prior-structural-unit-validated",
      branchId: "recursive-prior-structural-unit-authority",
      matches: priorAnalysis?.admitted === true,
      acceptedReason: "owner-issued-prior-structural-unit-confirmed",
      rejectedReason: priorAnalysis?.reason
        || "owner-issued-prior-structural-unit-result-required",
      inputState: {
        structureKind: priorAnalysis?.structureKind || "",
        semanticOwnerId: priorAnalysis?.semanticOwnerId || "",
      },
    },
    {
      stepId: "recursive-prerequisite-route-retained",
      branchId: "recursive-prerequisite-execution-lineage",
      matches: priorAnalysis?.routeRetained === true,
      acceptedReason:
        "all-prior-composition-and-recursion-operations-retained-before-reapplication",
      rejectedReason: "prior-structural-unit-live-route-required",
      inputState: {
        retainedRouteStepCount: nestedRouteSteps.length,
        executedOperationLineage:
          priorAnalysis?.executedOperationLineage || [],
      },
    },
    {
      stepId: "recursive-next-constituent-unit-validated",
      branchId: "recursive-next-constituent-authority",
      matches: nextAnalysis?.admitted === true,
      acceptedReason:
        "independently-owner-issued-basic-linear-element-unit-confirmed",
      rejectedReason: nextAnalysis?.reason
        || "owner-issued-next-basic-linear-element-unit-required",
      inputState: {
        constituentKind: nextAnalysis?.constituentKind || "",
        semanticOwnerId: nextAnalysis?.semanticOwnerId || "",
      },
    },
    {
      stepId: "recursive-medium-order-continuity-validated",
      branchId: "recursive-medium-order-continuity",
      matches: priorAnalysis?.mediumOrderValid === true,
      acceptedReason: priorAnalysis?.medium === "speech"
        ? "speech-temporal-order-inherited-from-prior-unit"
        : "writing-spatial-order-inherited-from-prior-unit",
      rejectedReason: "prior-structural-unit-medium-order-required",
      inputState: {
        medium: priorAnalysis?.medium || "",
        sequenceOrder: priorAnalysis?.sequenceOrder || "",
      },
    },
    {
      stepId: "recursive-structured-whole-continuity-validated",
      branchId: "recursive-structured-whole-continuity",
      matches: priorAnalysis?.structurePattern === "patterned-whole",
      acceptedReason: "patterned-whole-inherited-from-prior-unit",
      rejectedReason: "prior-structured-whole-required",
      inputState: {
        structurePattern: priorAnalysis?.structurePattern || "",
      },
    },
  ];
  let priorFailureReason = sourceAuthorized ? "" : blockReason;
  for (const guard of guardSpecs) {
    const skipped = Boolean(priorFailureReason);
    const stepReason = skipped
      ? `prior-linguistic-structure-recursion-condition-failed:${priorFailureReason}`
      : guard.matches
        ? guard.acceptedReason
        : guard.rejectedReason;
    routeStepList.push({
      stepId: guard.stepId,
      kind: "guard",
      actorId: LINGUISTIC_STRUCTURE_RECURSION_OWNER_ID,
      status: skipped ? "skipped" : guard.matches ? "accepted" : "rejected",
      reason: stepReason,
      branchId: guard.branchId,
      decision: skipped ? "skip" : guard.matches ? "accept" : "reject",
      evaluatedRuleIds: skipped
        ? []
        : [LINGUISTIC_STRUCTURE_RECURSION_OPERATION_ID],
      executedRuleIds: [],
      inputState: deepFreeze(guard.inputState),
      outputState: deepFreeze({
        conditionSatisfied: !skipped && guard.matches,
        failureReason: stepReason,
      }),
    });
    if (!skipped && !guard.matches) {
      priorFailureReason = guard.rejectedReason;
    }
  }
  if (recursiveCompositionAuthorized) {
    const operationInputState = deepFreeze({
      priorStructureKind: priorAnalysis.structureKind,
      priorLeafConstituentCount: priorAnalysis.leafConstituentCount,
      nextConstituentKind: nextAnalysis.constituentKind,
      medium: priorAnalysis.medium,
      sequenceOrder: priorAnalysis.sequenceOrder,
    });
    routeStepList.push({
      stepId: "linguistic-structure-recursion-executed",
      kind: "operation",
      actorId: LINGUISTIC_STRUCTURE_RECURSION_OWNER_ID,
      status: "executed",
      reason:
        "prior-structural-unit-and-next-unit-composed-into-one-recurrently-structured-unit",
      branchId: "linguistic-structure-recursion",
      decision: "reapply-composition",
      evaluatedRuleIds: [LINGUISTIC_STRUCTURE_RECURSION_OPERATION_ID],
      executedRuleIds: [LINGUISTIC_STRUCTURE_RECURSION_OPERATION_ID],
      inputState: operationInputState,
      outputState: deepFreeze({
        recursiveCompositionExecuted: true,
        resultUnitCount: 1,
        leafConstituentCount: priorAnalysis.leafConstituentCount + 1,
      }),
    });
  } else {
    routeStepList.push({
      stepId: "linguistic-structure-recursion-rejected",
      kind: "guard",
      actorId: LINGUISTIC_STRUCTURE_RECURSION_OWNER_ID,
      status: "rejected",
      reason: blockReason,
      branchId: "linguistic-structure-recursion",
      decision: "reject-recursive-composition",
      evaluatedRuleIds: sourceAuthorized
        ? [LINGUISTIC_STRUCTURE_RECURSION_OPERATION_ID]
        : [],
      executedRuleIds: [],
      inputState: providedInput,
      outputState: deepFreeze({ recursiveCompositionExecuted: false }),
    });
  }
  const routeSteps = deepFreeze(routeStepList);
  const outcomeStatus = recursiveCompositionAuthorized
    ? "authorized"
    : "rejected";
  const execution = deepFreeze({
    status: outcomeStatus,
    reason: blockReason || null,
    semanticOwnerId: LINGUISTIC_STRUCTURE_RECURSION_OWNER_ID,
    operationId: LINGUISTIC_STRUCTURE_RECURSION_OPERATION_ID,
    selectedRuleId: recursiveCompositionAuthorized
      ? LINGUISTIC_STRUCTURE_RECURSION_OPERATION_ID
      : null,
    stages: routeSteps.map((step) => step.stepId),
    routeSteps,
  });
  return deepFreeze({
    ownerId: LINGUISTIC_STRUCTURE_RECURSION_OWNER_ID,
    evaluatedOperationId: LINGUISTIC_STRUCTURE_RECURSION_OPERATION_ID,
    inputContract: "complete-typed-linguistic-structure-recursion-source",
    functionIds: [
      "buildClassicalLinguisticStructureRecursionSource",
      "evaluateClassicalLinguisticStructureRecursion",
    ],
    providedInput,
    sourceIdentity: deepFreeze({
      kind: source?.kind || "",
      ...providedInput,
      ownerIssued: Boolean(source),
      authorized: sourceAuthorized,
    }),
    execution,
    routeSteps,
    outcome: {
      status: outcomeStatus,
      reason: blockReason || null,
    },
  });
}

function inspectCarrierRankTaxonomyRequest(request) {
  if (!request || typeof request !== "object" || Array.isArray(request)) {
    return "carrier-rank-taxonomy-source-object-required";
  }
  const prototype = Object.getPrototypeOf(request);
  if (prototype !== Object.prototype && prototype !== null) {
    return "carrier-rank-taxonomy-source-plain-object-required";
  }
  for (const key of Reflect.ownKeys(request)) {
    if (
      typeof key !== "string"
      || !CARRIER_RANK_TAXONOMY_REQUEST_KEYS.has(key)
    ) {
      return `carrier-rank-taxonomy-source-unrecognized-constituent:${String(key)}`;
    }
    const descriptor = Object.getOwnPropertyDescriptor(request, key);
    if (
      !descriptor
      || !Object.prototype.hasOwnProperty.call(descriptor, "value")
    ) {
      return `carrier-rank-taxonomy-source-data-constituent-required:${key}`;
    }
  }
  return "";
}

function carrierRankTaxonomyDefinition(subsystem = "", rankTier = "") {
  return CARRIER_RANK_TAXONOMY_DEFINITIONS[subsystem]?.[rankTier] || null;
}

function carrierRankTaxonomyFailure({
  requestFailure = "",
  subsystem = "",
  rankTier = "",
} = {}) {
  if (requestFailure) return requestFailure;
  if (!Object.prototype.hasOwnProperty.call(
    CARRIER_RANK_TAXONOMY_DEFINITIONS,
    subsystem,
  )) {
    return "carrier-rank-taxonomy-subsystem-required";
  }
  if (!CARRIER_RANK_TAXONOMY_TIERS.includes(rankTier)) {
    return "carrier-rank-taxonomy-rank-tier-required";
  }
  if (!carrierRankTaxonomyDefinition(subsystem, rankTier)) {
    return "carrier-rank-taxonomy-rank-identity-unavailable";
  }
  return "";
}

function buildCarrierRankTaxonomyExecutionEvidence({
  source = null,
  context = null,
  authorizationStatus = "blocked",
  blockReason = "",
} = {}) {
  const sourceIssued = Boolean(source);
  const classificationAuthorized = authorizationStatus === "authorized";
  const definition = context?.definition || null;
  const providedInput = deepFreeze({
    subsystem: source?.subsystem || "",
    rankTier: source?.rankTier || "",
  });
  const routeStepList = [
    {
      stepId: "carrier-rank-taxonomy-source-admitted",
      kind: "source",
      actorId: CARRIER_RANK_TAXONOMY_OWNER_ID,
      status: sourceIssued ? "accepted" : "rejected",
      reason: sourceIssued
        ? "owner-issued-carrier-rank-taxonomy-source"
        : blockReason,
      branchId: "carrier-rank-taxonomy-source-authority",
      decision: sourceIssued ? "admit" : "reject",
      evaluatedRuleIds: [],
      executedRuleIds: [],
      inputState: providedInput,
      outputState: deepFreeze({ sourceIssued }),
    },
    {
      stepId: "carrier-rank-taxonomy-semantic-owner-selected",
      kind: "semantic-owner",
      actorId: CARRIER_RANK_TAXONOMY_OWNER_ID,
      status: sourceIssued ? "selected" : "rejected",
      reason: sourceIssued
        ? "typed-carrier-rank-taxonomy-coordinates-received"
        : blockReason,
      branchId: "carrier-rank-taxonomy-owner-jurisdiction",
      decision: sourceIssued
        ? CARRIER_RANK_TAXONOMY_OWNER_ID
        : "no-owner",
      evaluatedRuleIds: [],
      executedRuleIds: [],
      inputState: deepFreeze({ sourceKind: source?.kind || "" }),
      outputState: deepFreeze({
        ownerId: sourceIssued ? CARRIER_RANK_TAXONOMY_OWNER_ID : "",
      }),
    },
  ];
  const guardSpecs = [
    {
      stepId: "carrier-rank-request-shape-validated",
      branchId: "carrier-rank-request-shape",
      matches: !context?.requestFailure,
      acceptedReason: "only-subsystem-and-rank-tier-coordinates-supplied",
      rejectedReason: context?.requestFailure
        || "owner-issued-carrier-rank-taxonomy-source-required",
      inputState: { requestFailure: context?.requestFailure || "" },
    },
    {
      stepId: "carrier-rank-subsystem-validated",
      branchId: "carrier-rank-subsystem",
      matches: Object.prototype.hasOwnProperty.call(
        CARRIER_RANK_TAXONOMY_DEFINITIONS,
        source?.subsystem || "",
      ),
      acceptedReason: `${source?.subsystem || ""}-carrier-subsystem-confirmed`,
      rejectedReason: "carrier-rank-taxonomy-subsystem-required",
      inputState: { subsystem: source?.subsystem || "" },
    },
    {
      stepId: "carrier-rank-tier-validated",
      branchId: "carrier-rank-tier",
      matches: CARRIER_RANK_TAXONOMY_TIERS.includes(
        source?.rankTier || "",
      ),
      acceptedReason: `${source?.rankTier || ""}-carrier-rank-tier-confirmed`,
      rejectedReason: "carrier-rank-taxonomy-rank-tier-required",
      inputState: { rankTier: source?.rankTier || "" },
    },
  ];
  let priorFailureReason = sourceIssued ? "" : blockReason;
  for (const guard of guardSpecs) {
    const skipped = Boolean(priorFailureReason);
    const stepReason = skipped
      ? `prior-carrier-rank-taxonomy-condition-failed:${priorFailureReason}`
      : guard.matches
        ? guard.acceptedReason
        : guard.rejectedReason;
    routeStepList.push({
      stepId: guard.stepId,
      kind: "guard",
      actorId: CARRIER_RANK_TAXONOMY_OWNER_ID,
      status: skipped ? "skipped" : guard.matches ? "accepted" : "rejected",
      reason: stepReason,
      branchId: guard.branchId,
      decision: skipped ? "skip" : guard.matches ? "accept" : "reject",
      evaluatedRuleIds: skipped
        ? []
        : [CARRIER_RANK_TAXONOMY_OPERATION_ID],
      executedRuleIds: [],
      inputState: deepFreeze(guard.inputState),
      outputState: deepFreeze({
        conditionSatisfied: !skipped && guard.matches,
        failureReason: stepReason,
      }),
    });
    if (!skipped && !guard.matches) {
      priorFailureReason = guard.rejectedReason;
    }
  }
  if (classificationAuthorized) {
    routeStepList.push({
      stepId: "carrier-rank-identity-classified",
      kind: "operation",
      actorId: CARRIER_RANK_TAXONOMY_OWNER_ID,
      status: "executed",
      reason: "exact-subsystem-bound-basic-carrier-rank-identity-issued",
      branchId: "carrier-rank-taxonomy-classification",
      decision: "classify-rank-identity",
      evaluatedRuleIds: [CARRIER_RANK_TAXONOMY_OPERATION_ID],
      executedRuleIds: [CARRIER_RANK_TAXONOMY_OPERATION_ID],
      inputState: providedInput,
      outputState: deepFreeze({
        hierarchyFamily: "meaningless",
        subsystem: source.subsystem,
        rankTier: source.rankTier,
        rankId: definition.rankId,
        rankOrdinal: definition.rankOrdinal,
      }),
    });
  } else {
    routeStepList.push({
      stepId: "carrier-rank-taxonomy-classification-rejected",
      kind: "guard",
      actorId: CARRIER_RANK_TAXONOMY_OWNER_ID,
      status: "rejected",
      reason: blockReason,
      branchId: "carrier-rank-taxonomy-classification",
      decision: "reject-rank-classification",
      evaluatedRuleIds: sourceIssued
        ? [CARRIER_RANK_TAXONOMY_OPERATION_ID]
        : [],
      executedRuleIds: [],
      inputState: providedInput,
      outputState: deepFreeze({ rankIdentityIssued: false }),
    });
  }
  const routeSteps = deepFreeze(routeStepList);
  const outcomeStatus = classificationAuthorized ? "authorized" : "rejected";
  const execution = deepFreeze({
    status: outcomeStatus,
    reason: blockReason || null,
    semanticOwnerId: CARRIER_RANK_TAXONOMY_OWNER_ID,
    operationId: CARRIER_RANK_TAXONOMY_OPERATION_ID,
    selectedRuleId: classificationAuthorized
      ? CARRIER_RANK_TAXONOMY_OPERATION_ID
      : null,
    stages: routeSteps.map((step) => step.stepId),
    routeSteps,
  });
  return deepFreeze({
    ownerId: CARRIER_RANK_TAXONOMY_OWNER_ID,
    evaluatedOperationId: CARRIER_RANK_TAXONOMY_OPERATION_ID,
    inputContract: "complete-typed-carrier-rank-taxonomy-source",
    functionIds: [
      "buildClassicalCarrierRankTaxonomySource",
      "evaluateClassicalCarrierRankTaxonomy",
    ],
    providedInput,
    sourceIdentity: deepFreeze({
      kind: source?.kind || "",
      ...providedInput,
      ownerIssued: sourceIssued,
    }),
    execution,
    routeSteps,
    outcome: {
      status: outcomeStatus,
      reason: blockReason || null,
    },
  });
}

function inspectMeaninglessCarrierUnitRequest(request) {
  if (!request || typeof request !== "object" || Array.isArray(request)) {
    return "meaningless-carrier-unit-source-object-required";
  }
  const prototype = Object.getPrototypeOf(request);
  if (prototype !== Object.prototype && prototype !== null) {
    return "meaningless-carrier-unit-source-plain-object-required";
  }
  for (const key of Reflect.ownKeys(request)) {
    if (
      typeof key !== "string"
      || !MEANINGLESS_CARRIER_UNIT_REQUEST_KEYS.has(key)
    ) {
      return `meaningless-carrier-unit-source-unrecognized-constituent:${String(key)}`;
    }
    const descriptor = Object.getOwnPropertyDescriptor(request, key);
    if (
      !descriptor
      || !Object.prototype.hasOwnProperty.call(descriptor, "value")
    ) {
      return `meaningless-carrier-unit-source-data-constituent-required:${key}`;
    }
  }
  return "";
}

function namespaceMeaninglessCarrierPrerequisiteRouteSteps(
  routeSteps = [],
  candidateKind = "unknown",
) {
  const namespace = `carrier-candidate.${candidateKind || "unknown"}`;
  return (Array.isArray(routeSteps) ? routeSteps : []).map((step) =>
    deepFreeze({
      ...step,
      stepId: `${namespace}.${step.stepId}`,
      branchId: step.branchId ? `${namespace}.${step.branchId}` : "",
      invocationRole: "prerequisite",
    }));
}

function buildMeaninglessCarrierUnitExecutionEvidence({
  source = null,
  context = null,
  authorizationStatus = "blocked",
  blockReason = "",
} = {}) {
  const sourceIssued = Boolean(source);
  const classificationAuthorized = authorizationStatus === "authorized";
  const analysis = context?.candidateAnalysis || null;
  const prerequisiteEvidence = analysis?.executionEvidence || null;
  const prerequisiteSteps = analysis?.routeRetained === true
    ? namespaceMeaninglessCarrierPrerequisiteRouteSteps(
      prerequisiteEvidence?.routeSteps,
      analysis.candidateKind,
    )
    : [];
  const providedInput = deepFreeze({
    candidateKind: analysis?.candidateKind || "",
    candidateSemanticOwnerId: analysis?.semanticOwnerId || "",
    candidateOperationId: analysis?.operationId || "",
    candidateDomain: analysis?.domain || "",
    candidateSelection: analysis?.selection || "",
    candidateClassification: analysis?.classification || "",
    candidateAuthorizationStatus: analysis?.authorizationStatus || "",
    prerequisiteRouteRetained: analysis?.routeRetained === true,
  });
  const routeStepList = [...prerequisiteSteps];
  routeStepList.push(
    {
      stepId: "meaningless-carrier-unit-source-admitted",
      kind: "source",
      actorId: MEANINGLESS_CARRIER_UNIT_OWNER_ID,
      status: sourceIssued ? "accepted" : "rejected",
      reason: sourceIssued
        ? "owner-issued-meaningless-carrier-unit-source"
        : blockReason,
      branchId: "meaningless-carrier-unit-source-authority",
      decision: sourceIssued ? "admit" : "reject",
      evaluatedRuleIds: [],
      executedRuleIds: [],
      inputState: providedInput,
      outputState: deepFreeze({ sourceIssued }),
    },
    {
      stepId: "meaningless-carrier-unit-semantic-owner-selected",
      kind: "semantic-owner",
      actorId: MEANINGLESS_CARRIER_UNIT_OWNER_ID,
      status: sourceIssued ? "selected" : "rejected",
      reason: sourceIssued
        ? "typed-owner-issued-carrier-candidate-result-received"
        : blockReason,
      branchId: "meaningless-carrier-unit-owner-jurisdiction",
      decision: sourceIssued
        ? MEANINGLESS_CARRIER_UNIT_OWNER_ID
        : "no-owner",
      evaluatedRuleIds: [],
      executedRuleIds: [],
      inputState: deepFreeze({ sourceKind: source?.kind || "" }),
      outputState: deepFreeze({
        ownerId: sourceIssued ? MEANINGLESS_CARRIER_UNIT_OWNER_ID : "",
      }),
    },
  );
  const guardSpecs = [
    {
      stepId: "meaningless-carrier-request-shape-validated",
      branchId: "meaningless-carrier-request-shape",
      matches: !context?.requestFailure,
      acceptedReason: "only-a-candidate-result-was-supplied",
      rejectedReason: context?.requestFailure
        || "owner-issued-meaningless-carrier-unit-source-required",
      inputState: { requestFailure: context?.requestFailure || "" },
    },
    {
      stepId: "carrier-candidate-owner-authority-validated",
      branchId: "carrier-candidate-owner-authority",
      matches: analysis?.ownerIssued === true,
      acceptedReason: "independently-owner-issued-carrier-candidate-result",
      rejectedReason: analysis?.reason
        || "owner-issued-carrier-candidate-result-required",
      inputState: {
        semanticOwnerId: analysis?.semanticOwnerId || "",
        routeRetained: analysis?.routeRetained === true,
      },
    },
    {
      stepId: "carrier-candidate-authorization-validated",
      branchId: "carrier-candidate-authorization",
      matches: analysis?.authorizationStatus === "authorized",
      acceptedReason: "authorized-carrier-candidate-result",
      rejectedReason: analysis?.reason
        || "authorized-carrier-candidate-result-required",
      inputState: {
        authorizationStatus: analysis?.authorizationStatus || "",
      },
    },
    {
      stepId: "carrier-candidate-kind-validated",
      branchId: "carrier-candidate-kind",
      matches: analysis?.recognized === true,
      acceptedReason: `${analysis?.candidateKind || ""}-candidate-kind-recognized`,
      rejectedReason: analysis?.reason
        || "meaningless-carrier-candidate-kind-unlicensed",
      inputState: {
        candidateKind: analysis?.candidateKind || "",
        domain: analysis?.domain || "",
        selection: analysis?.selection || "",
      },
    },
    {
      stepId: "meaningful-carrier-family-exclusion-enforced",
      branchId: "meaningless-carrier-meaning-exclusion",
      matches: analysis?.excludedByMeaningConstraint !== true,
      acceptedReason:
        "candidate-is-neither-a-sememe-nor-a-meaning-bearing-sigeme",
      rejectedReason: analysis?.reason
        || "meaning-bearing-candidate-excluded-from-meaningless-family",
      inputState: {
        candidateKind: analysis?.candidateKind || "",
        excludedByMeaningConstraint:
          analysis?.excludedByMeaningConstraint === true,
      },
    },
    {
      stepId: "meaningless-carrier-member-inventory-validated",
      branchId: "meaningless-carrier-member-inventory",
      matches: MEANINGLESS_CARRIER_UNIT_MEMBER_KINDS.includes(
        analysis?.candidateKind || "",
      ),
      acceptedReason:
        "candidate-is-phoneme-phone-grapheme-or-graph",
      rejectedReason: analysis?.reason
        || "meaningless-carrier-candidate-kind-unlicensed",
      inputState: {
        candidateKind: analysis?.candidateKind || "",
        admittedMemberKinds: [...MEANINGLESS_CARRIER_UNIT_MEMBER_KINDS],
      },
    },
  ];
  let priorFailureReason = sourceIssued ? "" : blockReason;
  for (const guard of guardSpecs) {
    const skipped = Boolean(priorFailureReason);
    const stepReason = skipped
      ? `prior-meaningless-carrier-condition-failed:${priorFailureReason}`
      : guard.matches
        ? guard.acceptedReason
        : guard.rejectedReason;
    routeStepList.push({
      stepId: guard.stepId,
      kind: "guard",
      actorId: MEANINGLESS_CARRIER_UNIT_OWNER_ID,
      status: skipped ? "skipped" : guard.matches ? "accepted" : "rejected",
      reason: stepReason,
      branchId: guard.branchId,
      decision: skipped ? "skip" : guard.matches ? "accept" : "reject",
      evaluatedRuleIds: skipped
        ? []
        : [MEANINGLESS_CARRIER_UNIT_OPERATION_ID],
      executedRuleIds: [],
      inputState: deepFreeze(guard.inputState),
      outputState: deepFreeze({
        conditionSatisfied: !skipped && guard.matches,
        failureReason: stepReason,
      }),
    });
    if (!skipped && !guard.matches) {
      priorFailureReason = guard.rejectedReason;
    }
  }
  if (classificationAuthorized) {
    routeStepList.push({
      stepId: "meaningless-carrier-family-membership-classified",
      kind: "operation",
      actorId: MEANINGLESS_CARRIER_UNIT_OWNER_ID,
      status: "executed",
      reason: "owner-issued-carrier-result-admitted-to-meaningless-family",
      branchId: "meaningless-carrier-family-membership",
      decision: "classify-meaningless-carrier-family-member",
      evaluatedRuleIds: [MEANINGLESS_CARRIER_UNIT_OPERATION_ID],
      executedRuleIds: [MEANINGLESS_CARRIER_UNIT_OPERATION_ID],
      inputState: providedInput,
      outputState: deepFreeze({
        hierarchyFamily: "meaningless",
        candidateKind: analysis.candidateKind,
        familyConstituentKindCount:
          MEANINGLESS_CARRIER_UNIT_MEMBER_KINDS.length,
      }),
    });
  } else {
    routeStepList.push({
      stepId: "meaningless-carrier-family-membership-rejected",
      kind: "guard",
      actorId: MEANINGLESS_CARRIER_UNIT_OWNER_ID,
      status: "rejected",
      reason: blockReason,
      branchId: "meaningless-carrier-family-membership",
      decision: "reject-meaningless-carrier-family-membership",
      evaluatedRuleIds: sourceIssued
        ? [MEANINGLESS_CARRIER_UNIT_OPERATION_ID]
        : [],
      executedRuleIds: [],
      inputState: providedInput,
      outputState: deepFreeze({ membershipClassified: false }),
    });
  }
  const routeSteps = deepFreeze(routeStepList);
  const outcomeStatus = classificationAuthorized ? "authorized" : "rejected";
  const execution = deepFreeze({
    status: outcomeStatus,
    reason: blockReason || null,
    semanticOwnerId: MEANINGLESS_CARRIER_UNIT_OWNER_ID,
    operationId: MEANINGLESS_CARRIER_UNIT_OPERATION_ID,
    selectedRuleId: classificationAuthorized
      ? MEANINGLESS_CARRIER_UNIT_OPERATION_ID
      : null,
    stages: routeSteps.map((step) => step.stepId),
    routeSteps,
  });
  return deepFreeze({
    ownerId: MEANINGLESS_CARRIER_UNIT_OWNER_ID,
    evaluatedOperationId: MEANINGLESS_CARRIER_UNIT_OPERATION_ID,
    inputContract:
      "complete-typed-meaningless-carrier-unit-classification-source",
    functionIds: [
      "buildClassicalMeaninglessCarrierUnitClassificationSource",
      "evaluateClassicalMeaninglessCarrierUnitClassification",
    ],
    providedInput,
    sourceIdentity: deepFreeze({
      kind: source?.kind || "",
      ...providedInput,
      ownerIssued: sourceIssued,
    }),
    execution,
    routeSteps,
    outcome: {
      status: outcomeStatus,
      reason: blockReason || null,
    },
  });
}

function inspectMeaningfulMorphemeUnitRequest(request) {
  if (!request || typeof request !== "object" || Array.isArray(request)) {
    return "meaningful-morpheme-unit-source-object-required";
  }
  const prototype = Object.getPrototypeOf(request);
  if (prototype !== Object.prototype && prototype !== null) {
    return "meaningful-morpheme-unit-source-plain-object-required";
  }
  for (const key of Reflect.ownKeys(request)) {
    if (
      typeof key !== "string"
      || !MEANINGFUL_MORPHEME_UNIT_REQUEST_KEYS.has(key)
    ) {
      return `meaningful-morpheme-unit-source-unrecognized-constituent:${String(key)}`;
    }
    const descriptor = Object.getOwnPropertyDescriptor(request, key);
    if (
      !descriptor
      || !Object.prototype.hasOwnProperty.call(descriptor, "value")
    ) {
      return `meaningful-morpheme-unit-source-data-constituent-required:${key}`;
    }
  }
  return "";
}

function namespaceMeaningfulMorphemePrerequisiteRouteSteps(
  routeSteps = [],
  candidateKind = "unknown",
) {
  const namespace = `meaningful-candidate.${candidateKind || "unknown"}`;
  return (Array.isArray(routeSteps) ? routeSteps : []).map((step) =>
    deepFreeze({
      ...step,
      stepId: `${namespace}.${step.stepId}`,
      branchId: step.branchId ? `${namespace}.${step.branchId}` : "",
      invocationRole: "prerequisite",
    }));
}

function buildMeaningfulMorphemeUnitExecutionEvidence({
  source = null,
  context = null,
  authorizationStatus = "blocked",
  blockReason = "",
} = {}) {
  const sourceIssued = Boolean(source);
  const classificationAuthorized = authorizationStatus === "authorized";
  const analysis = context?.candidateAnalysis || null;
  const prerequisiteEvidence = analysis?.executionEvidence || null;
  const prerequisiteSteps = analysis?.routeRetained === true
    ? namespaceMeaningfulMorphemePrerequisiteRouteSteps(
      prerequisiteEvidence?.routeSteps,
      analysis.candidateKind,
    )
    : [];
  const providedInput = deepFreeze({
    candidateKind: analysis?.candidateKind || "",
    candidateSemanticOwnerId: analysis?.semanticOwnerId || "",
    candidateOperationId: analysis?.operationId || "",
    candidateDomain: analysis?.domain || "",
    candidateSelection: analysis?.selection || "",
    candidateClassification: analysis?.classification || "",
    candidateAuthorizationStatus: analysis?.authorizationStatus || "",
    prerequisiteRouteRetained: analysis?.routeRetained === true,
  });
  const routeStepList = [...prerequisiteSteps];
  routeStepList.push(
    {
      stepId: "meaningful-morpheme-unit-source-admitted",
      kind: "source",
      actorId: MEANINGFUL_MORPHEME_UNIT_OWNER_ID,
      status: sourceIssued ? "accepted" : "rejected",
      reason: sourceIssued
        ? "owner-issued-meaningful-morpheme-unit-source"
        : blockReason,
      branchId: "meaningful-morpheme-unit-source-authority",
      decision: sourceIssued ? "admit" : "reject",
      evaluatedRuleIds: [],
      executedRuleIds: [],
      inputState: providedInput,
      outputState: deepFreeze({ sourceIssued }),
    },
    {
      stepId: "meaningful-morpheme-unit-semantic-owner-selected",
      kind: "semantic-owner",
      actorId: MEANINGFUL_MORPHEME_UNIT_OWNER_ID,
      status: sourceIssued ? "selected" : "rejected",
      reason: sourceIssued
        ? "typed-owner-issued-meaningful-candidate-result-received"
        : blockReason,
      branchId: "meaningful-morpheme-unit-owner-jurisdiction",
      decision: sourceIssued
        ? MEANINGFUL_MORPHEME_UNIT_OWNER_ID
        : "no-owner",
      evaluatedRuleIds: [],
      executedRuleIds: [],
      inputState: deepFreeze({ sourceKind: source?.kind || "" }),
      outputState: deepFreeze({
        ownerId: sourceIssued ? MEANINGFUL_MORPHEME_UNIT_OWNER_ID : "",
      }),
    },
  );
  const guardSpecs = [
    {
      stepId: "meaningful-morpheme-request-shape-validated",
      branchId: "meaningful-morpheme-request-shape",
      matches: !context?.requestFailure,
      acceptedReason: "only-a-candidate-result-was-supplied",
      rejectedReason: context?.requestFailure
        || "owner-issued-meaningful-morpheme-unit-source-required",
      inputState: { requestFailure: context?.requestFailure || "" },
    },
    {
      stepId: "meaningful-candidate-owner-authority-validated",
      branchId: "meaningful-candidate-owner-authority",
      matches: analysis?.ownerIssued === true,
      acceptedReason: "independently-owner-issued-meaningful-candidate-result",
      rejectedReason: analysis?.reason
        || "owner-issued-meaningful-candidate-result-required",
      inputState: {
        semanticOwnerId: analysis?.semanticOwnerId || "",
        routeRetained: analysis?.routeRetained === true,
      },
    },
    {
      stepId: "meaningful-candidate-authorization-validated",
      branchId: "meaningful-candidate-authorization",
      matches: analysis?.authorizationStatus === "authorized",
      acceptedReason: "authorized-meaningful-candidate-result",
      rejectedReason: analysis?.reason
        || "authorized-meaningful-candidate-result-required",
      inputState: {
        authorizationStatus: analysis?.authorizationStatus || "",
      },
    },
    {
      stepId: "meaningful-candidate-kind-validated",
      branchId: "meaningful-candidate-kind",
      matches: analysis?.recognized === true,
      acceptedReason: `${analysis?.candidateKind || ""}-candidate-kind-recognized`,
      rejectedReason: analysis?.reason
        || "meaningful-morpheme-unit-candidate-kind-unlicensed",
      inputState: {
        candidateKind: analysis?.candidateKind || "",
        domain: analysis?.domain || "",
        selection: analysis?.selection || "",
      },
    },
    {
      stepId: "meaningful-morpheme-member-inventory-validated",
      branchId: "meaningful-morpheme-member-inventory",
      matches: MEANINGFUL_MORPHEME_UNIT_MEMBER_KINDS.includes(
        analysis?.candidateKind || "",
      ),
      acceptedReason: "candidate-is-morpheme-or-morph",
      rejectedReason: analysis?.reason
        || "meaningful-morpheme-unit-candidate-kind-unlicensed",
      inputState: {
        candidateKind: analysis?.candidateKind || "",
        admittedMemberKinds: [...MEANINGFUL_MORPHEME_UNIT_MEMBER_KINDS],
      },
    },
  ];
  let priorFailureReason = sourceIssued ? "" : blockReason;
  for (const guard of guardSpecs) {
    const skipped = Boolean(priorFailureReason);
    const stepReason = skipped
      ? `prior-meaningful-morpheme-condition-failed:${priorFailureReason}`
      : guard.matches
        ? guard.acceptedReason
        : guard.rejectedReason;
    routeStepList.push({
      stepId: guard.stepId,
      kind: "guard",
      actorId: MEANINGFUL_MORPHEME_UNIT_OWNER_ID,
      status: skipped ? "skipped" : guard.matches ? "accepted" : "rejected",
      reason: stepReason,
      branchId: guard.branchId,
      decision: skipped ? "skip" : guard.matches ? "accept" : "reject",
      evaluatedRuleIds: skipped
        ? []
        : [MEANINGFUL_MORPHEME_UNIT_OPERATION_ID],
      executedRuleIds: [],
      inputState: deepFreeze(guard.inputState),
      outputState: deepFreeze({
        conditionSatisfied: !skipped && guard.matches,
        failureReason: stepReason,
      }),
    });
    if (!skipped && !guard.matches) {
      priorFailureReason = guard.rejectedReason;
    }
  }
  if (classificationAuthorized) {
    routeStepList.push({
      stepId: "meaningful-morpheme-family-membership-classified",
      kind: "operation",
      actorId: MEANINGFUL_MORPHEME_UNIT_OWNER_ID,
      status: "executed",
      reason: "owner-issued-morpheme-or-morph-result-admitted",
      branchId: "meaningful-morpheme-family-membership",
      decision: "classify-meaningful-morpheme-family-member",
      evaluatedRuleIds: [MEANINGFUL_MORPHEME_UNIT_OPERATION_ID],
      executedRuleIds: [MEANINGFUL_MORPHEME_UNIT_OPERATION_ID],
      inputState: providedInput,
      outputState: deepFreeze({
        hierarchyFamily: "meaningful",
        candidateKind: analysis.candidateKind,
        familyConstituentKindCount:
          MEANINGFUL_MORPHEME_UNIT_MEMBER_KINDS.length,
      }),
    });
  } else {
    routeStepList.push({
      stepId: "meaningful-morpheme-family-membership-rejected",
      kind: "guard",
      actorId: MEANINGFUL_MORPHEME_UNIT_OWNER_ID,
      status: "rejected",
      reason: blockReason,
      branchId: "meaningful-morpheme-family-membership",
      decision: "reject-meaningful-morpheme-family-membership",
      evaluatedRuleIds: sourceIssued
        ? [MEANINGFUL_MORPHEME_UNIT_OPERATION_ID]
        : [],
      executedRuleIds: [],
      inputState: providedInput,
      outputState: deepFreeze({ membershipClassified: false }),
    });
  }
  const routeSteps = deepFreeze(routeStepList);
  const outcomeStatus = classificationAuthorized ? "authorized" : "rejected";
  const execution = deepFreeze({
    status: outcomeStatus,
    reason: blockReason || null,
    semanticOwnerId: MEANINGFUL_MORPHEME_UNIT_OWNER_ID,
    operationId: MEANINGFUL_MORPHEME_UNIT_OPERATION_ID,
    selectedRuleId: classificationAuthorized
      ? MEANINGFUL_MORPHEME_UNIT_OPERATION_ID
      : null,
    stages: routeSteps.map((step) => step.stepId),
    routeSteps,
  });
  return deepFreeze({
    ownerId: MEANINGFUL_MORPHEME_UNIT_OWNER_ID,
    evaluatedOperationId: MEANINGFUL_MORPHEME_UNIT_OPERATION_ID,
    inputContract:
      "complete-typed-meaningful-morpheme-unit-classification-source",
    functionIds: [
      "buildClassicalMeaningfulMorphemeUnitClassificationSource",
      "evaluateClassicalMeaningfulMorphemeUnitClassification",
    ],
    providedInput,
    sourceIdentity: deepFreeze({
      kind: source?.kind || "",
      ...providedInput,
      ownerIssued: sourceIssued,
    }),
    execution,
    routeSteps,
    outcome: {
      status: outcomeStatus,
      reason: blockReason || null,
    },
  });
}

function inspectMorphemeSyllableSeparationRequest(request) {
  if (!request || typeof request !== "object" || Array.isArray(request)) {
    return "morpheme-syllable-separation-source-object-required";
  }
  const prototype = Object.getPrototypeOf(request);
  if (prototype !== Object.prototype && prototype !== null) {
    return "morpheme-syllable-separation-source-plain-object-required";
  }
  for (const key of Reflect.ownKeys(request)) {
    if (
      typeof key !== "string"
      || !MORPHEME_SYLLABLE_SEPARATION_REQUEST_KEYS.has(key)
    ) {
      return `morpheme-syllable-separation-source-unrecognized-constituent:${String(key)}`;
    }
    const descriptor = Object.getOwnPropertyDescriptor(request, key);
    if (
      !descriptor
      || !Object.prototype.hasOwnProperty.call(descriptor, "value")
    ) {
      return `morpheme-syllable-separation-source-data-constituent-required:${key}`;
    }
  }
  return "";
}

function namespaceMorphemeSyllablePrerequisiteRouteSteps(
  routeSteps = [],
  namespace = "unknown",
) {
  return (Array.isArray(routeSteps) ? routeSteps : []).map((step) =>
    deepFreeze({
      ...step,
      stepId: `${namespace}.${step.stepId}`,
      branchId: step.branchId ? `${namespace}.${step.branchId}` : "",
      invocationRole: "prerequisite",
    }));
}

function buildMorphemeSyllableSeparationExecutionEvidence({
  source = null,
  context = null,
  authorizationStatus = "blocked",
  blockReason = "",
} = {}) {
  const sourceIssued = Boolean(source);
  const separationAuthorized = authorizationStatus === "authorized";
  const meaningfulAnalysis = context?.meaningfulAnalysis || null;
  const rankAnalysis = context?.rankAnalysis || null;
  const requestedAnalysisKind = source?.requestedAnalysisKind || "";
  const meaningfulSteps = meaningfulAnalysis?.routeRetained === true
    ? namespaceMorphemeSyllablePrerequisiteRouteSteps(
      meaningfulAnalysis.executionEvidence?.routeSteps,
      "meaningful-unit-result",
    )
    : [];
  const rankSteps = rankAnalysis?.routeRetained === true
    ? namespaceMorphemeSyllablePrerequisiteRouteSteps(
      rankAnalysis.executionEvidence?.routeSteps,
      "syllable-rank-result",
    )
    : [];
  const providedInput = deepFreeze({
    meaningfulCandidateKind: meaningfulAnalysis?.candidateKind || "",
    meaningfulSemanticOwnerId: meaningfulAnalysis?.semanticOwnerId || "",
    meaningfulOperationId: meaningfulAnalysis?.operationId || "",
    meaningfulAuthorizationStatus:
      meaningfulAnalysis?.authorizationStatus || "",
    meaningfulRouteRetained: meaningfulAnalysis?.routeRetained === true,
    carrierSubsystem: rankAnalysis?.subsystem || "",
    carrierRankTier: rankAnalysis?.rankTier || "",
    carrierRankId: rankAnalysis?.rankId || "",
    carrierRankSemanticOwnerId: rankAnalysis?.semanticOwnerId || "",
    carrierRankOperationId: rankAnalysis?.operationId || "",
    carrierRankAuthorizationStatus: rankAnalysis?.authorizationStatus || "",
    carrierRankRouteRetained: rankAnalysis?.routeRetained === true,
    requestedAnalysisKind,
  });
  const routeStepList = [...meaningfulSteps, ...rankSteps];
  routeStepList.push(
    {
      stepId: "morpheme-syllable-separation-source-admitted",
      kind: "source",
      actorId: MORPHEME_SYLLABLE_SEPARATION_OWNER_ID,
      status: sourceIssued ? "accepted" : "rejected",
      reason: sourceIssued
        ? "owner-issued-morpheme-syllable-separation-source"
        : blockReason,
      branchId: "morpheme-syllable-separation-source-authority",
      decision: sourceIssued ? "admit" : "reject",
      evaluatedRuleIds: [],
      executedRuleIds: [],
      inputState: providedInput,
      outputState: deepFreeze({ sourceIssued }),
    },
    {
      stepId: "morpheme-syllable-separation-semantic-owner-selected",
      kind: "semantic-owner",
      actorId: MORPHEME_SYLLABLE_SEPARATION_OWNER_ID,
      status: sourceIssued ? "selected" : "rejected",
      reason: sourceIssued
        ? "typed-meaningful-unit-and-syllable-rank-results-received"
        : blockReason,
      branchId: "morpheme-syllable-separation-owner-jurisdiction",
      decision: sourceIssued
        ? MORPHEME_SYLLABLE_SEPARATION_OWNER_ID
        : "no-owner",
      evaluatedRuleIds: [],
      executedRuleIds: [],
      inputState: deepFreeze({ sourceKind: source?.kind || "" }),
      outputState: deepFreeze({
        ownerId: sourceIssued ? MORPHEME_SYLLABLE_SEPARATION_OWNER_ID : "",
      }),
    },
  );
  const guardSpecs = [
    {
      stepId: "morpheme-syllable-request-shape-validated",
      branchId: "morpheme-syllable-request-shape",
      matches: !context?.requestFailure,
      acceptedReason:
        "only-two-prerequisite-results-and-analysis-kind-were-supplied",
      rejectedReason: context?.requestFailure
        || "owner-issued-morpheme-syllable-separation-source-required",
      inputState: { requestFailure: context?.requestFailure || "" },
    },
    {
      stepId: "meaningful-unit-result-authority-validated",
      branchId: "meaningful-unit-result-authority",
      matches: meaningfulAnalysis?.ownerIssued === true
        && meaningfulAnalysis?.routeRetained === true,
      acceptedReason:
        "independently-owner-issued-meaningful-unit-result-with-live-route",
      rejectedReason: meaningfulAnalysis?.reason
        || "owner-issued-meaningful-unit-result-required",
      inputState: {
        semanticOwnerId: meaningfulAnalysis?.semanticOwnerId || "",
        routeRetained: meaningfulAnalysis?.routeRetained === true,
      },
    },
    {
      stepId: "meaningful-unit-result-membership-validated",
      branchId: "meaningful-unit-result-membership",
      matches: meaningfulAnalysis?.admitted === true,
      acceptedReason: `${meaningfulAnalysis?.candidateKind || ""}-meaningful-unit-admitted`,
      rejectedReason: meaningfulAnalysis?.reason
        || "authorized-meaningful-morpheme-or-morph-result-required",
      inputState: {
        candidateKind: meaningfulAnalysis?.candidateKind || "",
        authorizationStatus:
          meaningfulAnalysis?.authorizationStatus || "",
      },
    },
    {
      stepId: "syllable-rank-result-authority-validated",
      branchId: "syllable-rank-result-authority",
      matches: rankAnalysis?.ownerIssued === true
        && rankAnalysis?.routeRetained === true,
      acceptedReason:
        "independently-owner-issued-carrier-rank-result-with-live-route",
      rejectedReason: rankAnalysis?.reason
        || "owner-issued-syllable-rank-result-required",
      inputState: {
        semanticOwnerId: rankAnalysis?.semanticOwnerId || "",
        routeRetained: rankAnalysis?.routeRetained === true,
      },
    },
    {
      stepId: "phonological-syllable-rank-identity-validated",
      branchId: "phonological-syllable-rank-identity",
      matches: rankAnalysis?.admitted === true,
      acceptedReason: "exact-phonological-syllable-rank-identity-admitted",
      rejectedReason: rankAnalysis?.reason
        || "exact-phonological-syllable-rank-result-required",
      inputState: {
        subsystem: rankAnalysis?.subsystem || "",
        rankTier: rankAnalysis?.rankTier || "",
        rankId: rankAnalysis?.rankId || "",
        authorizationStatus: rankAnalysis?.authorizationStatus || "",
      },
    },
    {
      stepId: "morpheme-syllable-analysis-kind-validated",
      branchId: "morpheme-syllable-analysis-kind",
      matches: MORPHEME_SYLLABLE_ANALYSIS_KINDS.includes(
        requestedAnalysisKind,
      ),
      acceptedReason: `${requestedAnalysisKind}-analysis-selected`,
      rejectedReason: "morpheme-syllable-analysis-kind-required",
      inputState: {
        requestedAnalysisKind,
        supportedAnalysisKinds: [...MORPHEME_SYLLABLE_ANALYSIS_KINDS],
      },
    },
  ];
  let priorFailureReason = sourceIssued ? "" : blockReason;
  for (const guard of guardSpecs) {
    const skipped = Boolean(priorFailureReason);
    const stepReason = skipped
      ? `prior-morpheme-syllable-condition-failed:${priorFailureReason}`
      : guard.matches
        ? guard.acceptedReason
        : guard.rejectedReason;
    routeStepList.push({
      stepId: guard.stepId,
      kind: "guard",
      actorId: MORPHEME_SYLLABLE_SEPARATION_OWNER_ID,
      status: skipped ? "skipped" : guard.matches ? "accepted" : "rejected",
      reason: stepReason,
      branchId: guard.branchId,
      decision: skipped ? "skip" : guard.matches ? "accept" : "reject",
      evaluatedRuleIds: skipped
        ? []
        : [MORPHEME_SYLLABLE_SEPARATION_OPERATION_ID],
      executedRuleIds: [],
      inputState: deepFreeze(guard.inputState),
      outputState: deepFreeze({
        conditionSatisfied: !skipped && guard.matches,
        failureReason: stepReason,
      }),
    });
    if (!skipped && !guard.matches) {
      priorFailureReason = guard.rejectedReason;
    }
  }
  if (separationAuthorized) {
    const coterminality = requestedAnalysisKind === "coterminality-permission";
    routeStepList.push({
      stepId: getMorphemeSyllableExecutionStepId(requestedAnalysisKind),
      kind: "operation",
      actorId: MORPHEME_SYLLABLE_SEPARATION_OWNER_ID,
      status: "executed",
      reason: getMorphemeSyllableExecutionReason(requestedAnalysisKind),
      branchId: "morpheme-syllable-separation-analysis",
      decision: `validate-${requestedAnalysisKind}`,
      evaluatedRuleIds: [MORPHEME_SYLLABLE_SEPARATION_OPERATION_ID],
      executedRuleIds: [MORPHEME_SYLLABLE_SEPARATION_OPERATION_ID],
      inputState: providedInput,
      outputState: deepFreeze({
        analysisKind: requestedAnalysisKind,
        meaningfulCandidateKind: meaningfulAnalysis.candidateKind,
        syllableRankIdentity: rankAnalysis.rankIdentity,
        ranksRemainSeparate: true,
        coterminalityPermitted: coterminality,
      }),
    });
  } else {
    routeStepList.push({
      stepId: "morpheme-syllable-separation-rejected",
      kind: "guard",
      actorId: MORPHEME_SYLLABLE_SEPARATION_OWNER_ID,
      status: "rejected",
      reason: blockReason,
      branchId: "morpheme-syllable-separation-analysis",
      decision: "reject-morpheme-syllable-separation-analysis",
      evaluatedRuleIds: sourceIssued
        ? [MORPHEME_SYLLABLE_SEPARATION_OPERATION_ID]
        : [],
      executedRuleIds: [],
      inputState: providedInput,
      outputState: deepFreeze({ separationValidated: false }),
    });
  }
  const routeSteps = deepFreeze(routeStepList);
  const outcomeStatus = separationAuthorized ? "authorized" : "rejected";
  const execution = deepFreeze({
    status: outcomeStatus,
    reason: blockReason || null,
    semanticOwnerId: MORPHEME_SYLLABLE_SEPARATION_OWNER_ID,
    operationId: MORPHEME_SYLLABLE_SEPARATION_OPERATION_ID,
    selectedRuleId: separationAuthorized
      ? MORPHEME_SYLLABLE_SEPARATION_OPERATION_ID
      : null,
    stages: routeSteps.map((step) => step.stepId),
    routeSteps,
  });
  return deepFreeze({
    ownerId: MORPHEME_SYLLABLE_SEPARATION_OWNER_ID,
    evaluatedOperationId: MORPHEME_SYLLABLE_SEPARATION_OPERATION_ID,
    inputContract: "complete-typed-morpheme-syllable-separation-source",
    functionIds: [
      "buildClassicalMorphemeSyllableSeparationSource",
      "evaluateClassicalMorphemeSyllableSeparation",
    ],
    providedInput,
    sourceIdentity: deepFreeze({
      kind: source?.kind || "",
      ...providedInput,
      ownerIssued: sourceIssued,
    }),
    execution,
    routeSteps,
    outcome: {
      status: outcomeStatus,
      reason: blockReason || null,
    },
  });
}

function inspectDiscontinuousUnitAdmissibilityRequest(request) {
  if (!request || typeof request !== "object" || Array.isArray(request)) {
    return "discontinuous-unit-admissibility-source-object-required";
  }
  const prototype = Object.getPrototypeOf(request);
  if (prototype !== Object.prototype && prototype !== null) {
    return "discontinuous-unit-admissibility-source-plain-object-required";
  }
  for (const key of Reflect.ownKeys(request)) {
    if (
      typeof key !== "string"
      || !DISCONTINUOUS_UNIT_ADMISSIBILITY_REQUEST_KEYS.has(key)
    ) {
      return `discontinuous-unit-admissibility-source-unrecognized-constituent:${String(key)}`;
    }
    const descriptor = Object.getOwnPropertyDescriptor(request, key);
    if (
      !descriptor
      || !Object.prototype.hasOwnProperty.call(descriptor, "value")
    ) {
      return `discontinuous-unit-admissibility-source-data-constituent-required:${key}`;
    }
  }
  return "";
}

function summarizeDiscontinuousUnitNuclearClauseResult(result = null) {
  return deepFreeze({
    kind: result?.kind || "",
    authorizationStatus: result?.authorizationStatus || "",
    typedFrameKind: result?.typedSlotFrame?.kind || "",
    typedFrameSemanticIdentity: result?.typedSlotFrame?.semanticIdentity || "",
  });
}

function buildDiscontinuousUnitAdmissibilityExecutionEvidence({
  source = null,
  analysis = null,
  authorizationStatus = "blocked",
  blockReason = "",
} = {}) {
  const providedInput = deepFreeze({
    canonicalNuclearClauseResult:
      summarizeDiscontinuousUnitNuclearClauseResult(
        source?.canonicalNuclearClauseResult,
      ),
  });
  const sourceAuthorized = Boolean(source);
  const admissibilityAuthorized = authorizationStatus === "authorized";
  const outcomeStatus = admissibilityAuthorized ? "authorized" : "rejected";
  const routeStepList = [
    {
      stepId: "discontinuous-unit-admissibility-source-admitted",
      kind: "source",
      actorId: DISCONTINUOUS_UNIT_ADMISSIBILITY_OWNER_ID,
      status: sourceAuthorized ? "accepted" : "rejected",
      reason: sourceAuthorized
        ? "owner-issued-complete-discontinuous-unit-admissibility-source"
        : blockReason,
      branchId: "discontinuous-unit-admissibility-source-authority",
      decision: sourceAuthorized ? "admit" : "reject",
      evaluatedRuleIds: [],
      executedRuleIds: [],
      inputState: providedInput,
      outputState: deepFreeze({ sourceAuthorized }),
    },
    {
      stepId: "discontinuous-unit-admissibility-semantic-owner-selected",
      kind: "semantic-owner",
      actorId: DISCONTINUOUS_UNIT_ADMISSIBILITY_OWNER_ID,
      status: sourceAuthorized ? "selected" : "rejected",
      reason: sourceAuthorized
        ? "typed-nuclear-clause-source-admitted"
        : blockReason,
      branchId: "discontinuous-unit-admissibility-owner-jurisdiction",
      decision: sourceAuthorized
        ? DISCONTINUOUS_UNIT_ADMISSIBILITY_OWNER_ID
        : "no-owner",
      evaluatedRuleIds: [],
      executedRuleIds: [],
      inputState: deepFreeze({
        sourceKind: source?.kind || "",
        canonicalResultKind:
          source?.canonicalNuclearClauseResult?.kind || "",
      }),
      outputState: deepFreeze({
        ownerId: sourceAuthorized
          ? DISCONTINUOUS_UNIT_ADMISSIBILITY_OWNER_ID
          : "",
      }),
    },
  ];
  const guardSpecs = [
    {
      stepId: "canonical-nuclear-clause-result-validated",
      branchId: "canonical-nuclear-clause-result-authority",
      matches: analysis?.canonicalResultAuthorized === true,
      acceptedReason: "owner-issued-canonical-nuclear-clause-result-confirmed",
      rejectedReason: "owner-issued-canonical-nuclear-clause-result-required",
      inputState: {
        canonicalResultKind:
          source?.canonicalNuclearClauseResult?.kind || "",
      },
    },
    {
      stepId: "subject-person-number-constituents-validated",
      branchId: "discontinuous-subject-constituents",
      matches: analysis?.subjectConstituentsComplete === true,
      acceptedReason: "subject-person-and-number-constituents-confirmed",
      rejectedReason: "complete-subject-person-and-number-constituents-required",
      inputState: {
        personPosition: analysis?.personPosition || "",
        numberPosition: analysis?.numberPosition || "",
      },
    },
    {
      stepId: "nonjuxtaposed-subject-topology-validated",
      branchId: "discontinuous-subject-topology",
      matches: analysis?.nonjuxtaposedTopology === true,
      acceptedReason: "predicate-intervenes-between-subject-person-and-number",
      rejectedReason: "nonjuxtaposed-subject-person-number-topology-required",
      inputState: {
        personSlotIndex: analysis?.personSlotIndex ?? -1,
        predicateSlotIndex: analysis?.predicateSlotIndex ?? -1,
        numberSlotIndex: analysis?.numberSlotIndex ?? -1,
      },
    },
    {
      stepId: "subject-functional-cohesion-validated",
      branchId: "discontinuous-subject-cohesion",
      matches: analysis?.subjectCohesionAuthorized === true,
      acceptedReason: "separated-person-and-number-belong-to-one-subject-function",
      rejectedReason: "owner-issued-subject-functional-cohesion-required",
      inputState: {
        numberBelongsTo: analysis?.numberBelongsTo || "",
        unitKind: DISCONTINUOUS_UNIT_KIND,
      },
    },
  ];
  let priorFailureReason = sourceAuthorized ? "" : blockReason;
  for (const guard of guardSpecs) {
    const skipped = Boolean(priorFailureReason);
    const stepReason = skipped
      ? `prior-discontinuous-unit-admissibility-condition-failed:${priorFailureReason}`
      : guard.matches
        ? guard.acceptedReason
        : guard.rejectedReason;
    routeStepList.push({
      stepId: guard.stepId,
      kind: "guard",
      actorId: DISCONTINUOUS_UNIT_ADMISSIBILITY_OWNER_ID,
      status: skipped ? "skipped" : guard.matches ? "accepted" : "rejected",
      reason: stepReason,
      branchId: guard.branchId,
      decision: skipped ? "skip" : guard.matches ? "accept" : "reject",
      evaluatedRuleIds: skipped
        ? []
        : [DISCONTINUOUS_UNIT_ADMISSIBILITY_OPERATION_ID],
      executedRuleIds: [],
      inputState: deepFreeze(guard.inputState),
      outputState: deepFreeze({
        conditionSatisfied: !skipped && guard.matches,
        failureReason: stepReason,
      }),
    });
    if (!skipped && !guard.matches) {
      priorFailureReason = guard.rejectedReason;
    }
  }
  if (admissibilityAuthorized) {
    routeStepList.push({
      stepId: "discontinuous-unit-admissibility-validated",
      kind: "operation",
      actorId: DISCONTINUOUS_UNIT_ADMISSIBILITY_OWNER_ID,
      status: "executed",
      reason: "specific-owner-issued-complex-unit-kind-admits-nonjuxtaposed-constituents",
      branchId: "discontinuous-unit-admissibility",
      decision: "validate-admissibility",
      evaluatedRuleIds: [DISCONTINUOUS_UNIT_ADMISSIBILITY_OPERATION_ID],
      executedRuleIds: [DISCONTINUOUS_UNIT_ADMISSIBILITY_OPERATION_ID],
      inputState: deepFreeze({
        unitKind: DISCONTINUOUS_UNIT_KIND,
        topology: "non-juxtaposed",
      }),
      outputState: deepFreeze({
        admissible: true,
        scope: "specific-typed-unit-kind",
      }),
    });
  } else {
    routeStepList.push({
      stepId: "discontinuous-unit-admissibility-rejected",
      kind: "guard",
      actorId: DISCONTINUOUS_UNIT_ADMISSIBILITY_OWNER_ID,
      status: "rejected",
      reason: blockReason,
      branchId: "discontinuous-unit-admissibility",
      decision: "reject-admissibility",
      evaluatedRuleIds: sourceAuthorized
        ? [DISCONTINUOUS_UNIT_ADMISSIBILITY_OPERATION_ID]
        : [],
      executedRuleIds: [],
      inputState: providedInput,
      outputState: deepFreeze({ admissible: false }),
    });
  }
  const routeSteps = deepFreeze(routeStepList);
  const execution = deepFreeze({
    status: outcomeStatus,
    reason: blockReason || null,
    semanticOwnerId: DISCONTINUOUS_UNIT_ADMISSIBILITY_OWNER_ID,
    operationId: DISCONTINUOUS_UNIT_ADMISSIBILITY_OPERATION_ID,
    selectedRuleId: admissibilityAuthorized
      ? DISCONTINUOUS_UNIT_ADMISSIBILITY_OPERATION_ID
      : null,
    stages: routeSteps.map((step) => step.stepId),
    routeSteps,
  });
  return deepFreeze({
    ownerId: DISCONTINUOUS_UNIT_ADMISSIBILITY_OWNER_ID,
    evaluatedOperationId: DISCONTINUOUS_UNIT_ADMISSIBILITY_OPERATION_ID,
    inputContract:
      "complete-typed-discontinuous-unit-admissibility-source",
    functionIds: [
      "buildClassicalDiscontinuousUnitAdmissibilitySource",
      "evaluateClassicalDiscontinuousUnitAdmissibility",
    ],
    providedInput,
    sourceIdentity: deepFreeze({
      kind: source?.kind || "",
      canonicalNuclearClauseResult:
        providedInput.canonicalNuclearClauseResult,
      ownerIssued: sourceAuthorized,
    }),
    execution,
    routeSteps,
    outcome: {
      status: outcomeStatus,
      reason: blockReason || null,
    },
  });
}

function inspectSourceRequest(request) {
  if (!request || typeof request !== "object" || Array.isArray(request)) {
    return "concept-source-object-required";
  }
  const prototype = Object.getPrototypeOf(request);
  if (prototype !== Object.prototype && prototype !== null) {
    return "concept-source-plain-object-required";
  }
  for (const key of Reflect.ownKeys(request)) {
    if (typeof key !== "string" || !ALLOWED_SOURCE_REQUEST_KEYS.has(key)) {
      return `concept-source-unrecognized-constituent:${String(key)}`;
    }
    const descriptor = Object.getOwnPropertyDescriptor(request, key);
    if (
      !descriptor
      || !Object.prototype.hasOwnProperty.call(descriptor, "value")
    ) {
      return `concept-source-data-constituent-required:${key}`;
    }
  }
  return "";
}

function safelyValidate(targetObject, validatorName, value) {
  const validator = targetObject?.[validatorName];
  if (typeof validator !== "function") return false;
  try {
    return Reflect.apply(validator, targetObject, [value]) === true;
  } catch {
    return false;
  }
}

function getCanonicalOwnerRank(targetObject, value) {
  if (!value || typeof value !== "object") return "";
  if (
    [
      "isClassicalNahuatlNuclearClauseResult",
      "isClassicalNahuatlVncApplicationFrame",
      "isClassicalNahuatlOrderedVoiceVncApplicationFrame",
      "isClassicalNahuatlOrdinaryNncResult",
      "isClassicalNahuatlPronominalNncResult",
      "isClassicalNahuatlDeverbalNncGrammarFrame",
      "isClassicalNahuatlResultFrame",
      "isClassicalNahuatlAdverbialNuclearResult",
      "isClassicalNahuatlRelationalResult",
      "isPlaceGentilicNncFrame",
      "isPersonalNameNncResult",
    ].some((validatorName) => safelyValidate(
      targetObject,
      validatorName,
      value,
    ))
  ) {
    return "nuclear-clause";
  }
  if (safelyValidate(
    targetObject,
    "isClassicalNahuatlTranscriptionFrame",
    value,
  )) {
    return "transcription";
  }
  return "";
}

export function createConceptsApi(targetObject = globalThis) {
  const issuedSources = new WeakSet();
  const sourceContexts = new WeakMap();
  const issuedResults = new WeakSet();
  const resultSources = new WeakMap();
  const resultExecutions = new WeakMap();
  const issuedSilentContrastSources = new WeakSet();
  const issuedSilentContrastResults = new WeakSet();
  const silentContrastResultSources = new WeakMap();
  const silentContrastResultExecutions = new WeakMap();
  const issuedUnitCompositionSources = new WeakSet();
  const issuedUnitCompositionResults = new WeakSet();
  const unitCompositionResultSources = new WeakMap();
  const unitCompositionResultExecutions = new WeakMap();
  const issuedStructureRecursionSources = new WeakSet();
  const structureRecursionSourceContexts = new WeakMap();
  const issuedStructureRecursionResults = new WeakSet();
  const structureRecursionResultSources = new WeakMap();
  const structureRecursionResultExecutions = new WeakMap();
  const issuedCarrierRankTaxonomySources = new WeakSet();
  const carrierRankTaxonomySourceContexts = new WeakMap();
  const issuedCarrierRankTaxonomyResults = new WeakSet();
  const carrierRankTaxonomyResultSources = new WeakMap();
  const carrierRankTaxonomyResultExecutions = new WeakMap();
  const issuedMeaninglessCarrierUnitSources = new WeakSet();
  const meaninglessCarrierUnitSourceContexts = new WeakMap();
  const issuedMeaninglessCarrierUnitResults = new WeakSet();
  const meaninglessCarrierUnitResultSources = new WeakMap();
  const meaninglessCarrierUnitResultExecutions = new WeakMap();
  const issuedMeaningfulMorphemeUnitSources = new WeakSet();
  const meaningfulMorphemeUnitSourceContexts = new WeakMap();
  const issuedMeaningfulMorphemeUnitResults = new WeakSet();
  const meaningfulMorphemeUnitResultSources = new WeakMap();
  const meaningfulMorphemeUnitResultExecutions = new WeakMap();
  const issuedMorphemeSyllableSeparationSources = new WeakSet();
  const morphemeSyllableSeparationSourceContexts = new WeakMap();
  const issuedMorphemeSyllableSeparationResults = new WeakSet();
  const morphemeSyllableSeparationResultSources = new WeakMap();
  const morphemeSyllableSeparationResultExecutions = new WeakMap();
  const issuedDiscontinuousUnitSources = new WeakSet();
  const issuedDiscontinuousUnitResults = new WeakSet();
  const discontinuousUnitResultSources = new WeakMap();
  const discontinuousUnitResultExecutions = new WeakMap();
  const operationOwner = createGrammarOperationContractOwner({
    ownerId: "classical-linguistic-concept-owner",
    domain: "classical-linguistic-concept",
  });
  const classificationOperationContract = operationOwner.buildContract({
    operationId: CONCEPT_APPLICATION_OPERATION_ID,
    operationType: "establish",
    consumesFrameKinds: [CONCEPT_SOURCE_KIND],
    producesFrameKind: CONCEPT_RESULT_KIND,
    effectScopes: [
      "read-only-classification",
      "typed-rank-validation",
      "authority-rejection",
    ],
    outputKinds: ["read-only-result"],
    authorityRefs: ["andrews-linguistic-concept-system"],
    description:
      "Classify a typed linguistic Source without generating or rewriting a surface.",
  });
  const silentContrastOperationOwner = createGrammarOperationContractOwner({
    ownerId: SILENT_MORPH_CONTRAST_OWNER_ID,
    domain: "classical-silent-morph-contrast-validation",
  });
  const silentContrastOperationContract =
    silentContrastOperationOwner.buildContract({
      operationId: SILENT_MORPH_CONTRAST_OPERATION_ID,
      operationType: "establish",
      consumesFrameKinds: [SILENT_MORPH_CONTRAST_SOURCE_KIND],
      producesFrameKind: SILENT_MORPH_CONTRAST_RESULT_KIND,
      effectScopes: [
        "typed-contrast-validation",
        "silent-hypothesis-authorization",
        "unlicensed-silence-rejection",
      ],
      outputKinds: ["read-only-contrast-validation-result"],
      authorityRefs: ["andrews-sounded-silent-contrast-requirement"],
      description:
        "Validate a silent morpheme or morph hypothesis from complete sounded-contrast coordinates without generating a form or written surface.",
    });
  const unitCompositionOperationOwner = createGrammarOperationContractOwner({
    ownerId: LINGUISTIC_UNIT_COMPOSITION_OWNER_ID,
    domain: "classical-linguistic-unit-composition",
  });
  const unitCompositionOperationContract =
    unitCompositionOperationOwner.buildContract({
      operationId: LINGUISTIC_UNIT_COMPOSITION_OPERATION_ID,
      operationType: "compose",
      consumesFrameKinds: [
        LINGUISTIC_UNIT_COMPOSITION_SOURCE_KIND,
        CONCEPT_RESULT_KIND,
      ],
      producesFrameKind: LINGUISTIC_UNIT_COMPOSITION_RESULT_KIND,
      effectScopes: [
        "linear-sequence-composition",
        "structured-whole-establishment",
        "binary-unit-composition",
      ],
      outputKinds: ["typed-structural-unit-result"],
      authorityRefs: ["andrews-linguistic-unit-composition-principle"],
      description:
        "Compose exactly two owner-issued basic linear element units into one typed structured unit without generating a sounded or written surface.",
    });
  const structureRecursionOperationOwner = createGrammarOperationContractOwner({
    ownerId: LINGUISTIC_STRUCTURE_RECURSION_OWNER_ID,
    domain: "classical-linguistic-structure-recursion",
  });
  const structureRecursionOperationContract =
    structureRecursionOperationOwner.buildContract({
      operationId: LINGUISTIC_STRUCTURE_RECURSION_OPERATION_ID,
      operationType: "compose",
      consumesFrameKinds: [
        LINGUISTIC_STRUCTURE_RECURSION_SOURCE_KIND,
        LINGUISTIC_UNIT_COMPOSITION_RESULT_KIND,
        LINGUISTIC_STRUCTURE_RECURSION_RESULT_KIND,
        CONCEPT_RESULT_KIND,
      ],
      producesFrameKind: LINGUISTIC_STRUCTURE_RECURSION_RESULT_KIND,
      effectScopes: [
        "prior-structural-unit-admission",
        "recursive-composition-reapplication",
        "nested-operation-lineage-retention",
      ],
      outputKinds: ["typed-recursively-composed-structural-unit-result"],
      authorityRefs: ["andrews-linguistic-structure-recursion-principle"],
      description:
        "Reapply composition to an identity-bound prior structural-unit result and one independently owner-issued basic element unit while retaining all prior composition operations in the live route and generating no surface.",
    });
  const carrierRankTaxonomyOperationOwner =
    createGrammarOperationContractOwner({
      ownerId: CARRIER_RANK_TAXONOMY_OWNER_ID,
      domain: "classical-carrier-rank-taxonomy",
    });
  const carrierRankTaxonomyOperationContract =
    carrierRankTaxonomyOperationOwner.buildContract({
      operationId: CARRIER_RANK_TAXONOMY_OPERATION_ID,
      operationType: "establish",
      consumesFrameKinds: [CARRIER_RANK_TAXONOMY_SOURCE_KIND],
      producesFrameKind: CARRIER_RANK_TAXONOMY_RESULT_KIND,
      effectScopes: [
        "carrier-subsystem-rank-classification",
        "parallel-four-tier-taxonomy",
        "rank-identity-authority-rejection",
      ],
      outputKinds: ["read-only-carrier-rank-identity-result"],
      authorityRefs: ["andrews-carrier-rank-taxonomy"],
      description:
        "Classify one of the four Canvas-listed phonological or graphological carrier ranks as an identity-bound read-only Result without constructing, upgrading, or realizing a unit.",
    });
  const meaninglessCarrierUnitOperationOwner =
    createGrammarOperationContractOwner({
      ownerId: MEANINGLESS_CARRIER_UNIT_OWNER_ID,
      domain: "classical-meaningless-carrier-unit-classification",
    });
  const meaninglessCarrierUnitOperationContract =
    meaninglessCarrierUnitOperationOwner.buildContract({
      operationId: MEANINGLESS_CARRIER_UNIT_OPERATION_ID,
      operationType: "establish",
      consumesFrameKinds: [
        MEANINGLESS_CARRIER_UNIT_SOURCE_KIND,
        CONCEPT_RESULT_KIND,
      ],
      producesFrameKind: MEANINGLESS_CARRIER_UNIT_RESULT_KIND,
      effectScopes: [
        "meaningless-carrier-family-membership",
        "sigeme-sememe-exclusion",
        "independent-prerequisite-owner-validation",
      ],
      outputKinds: [
        "read-only-meaningless-carrier-family-membership-result",
      ],
      authorityRefs: ["andrews-meaningless-structural-unit-family"],
      description:
        "Classify an independently owner-issued phoneme, phone, grapheme, or graph Result as a member of the meaningless carrier-unit family while rejecting sigemes and sememes and generating no surface.",
    });
  const meaningfulMorphemeUnitOperationOwner =
    createGrammarOperationContractOwner({
      ownerId: MEANINGFUL_MORPHEME_UNIT_OWNER_ID,
      domain: "classical-meaningful-morpheme-unit-classification",
    });
  const meaningfulMorphemeUnitOperationContract =
    meaningfulMorphemeUnitOperationOwner.buildContract({
      operationId: MEANINGFUL_MORPHEME_UNIT_OPERATION_ID,
      operationType: "establish",
      consumesFrameKinds: [
        MEANINGFUL_MORPHEME_UNIT_SOURCE_KIND,
        CONCEPT_RESULT_KIND,
      ],
      producesFrameKind: MEANINGFUL_MORPHEME_UNIT_RESULT_KIND,
      effectScopes: [
        "meaningful-morpheme-family-membership",
        "morpheme-morph-member-inventory",
        "independent-prerequisite-owner-validation",
      ],
      outputKinds: [
        "read-only-meaningful-morpheme-family-membership-result",
      ],
      authorityRefs: ["andrews-meaningful-structural-unit-family"],
      description:
        "Classify an independently owner-issued morpheme or morph Result as a member of the meaningful structural-unit family while preserving separate prerequisite owners and generating no surface.",
    });
  const morphemeSyllableSeparationOperationOwner =
    createGrammarOperationContractOwner({
      ownerId: MORPHEME_SYLLABLE_SEPARATION_OWNER_ID,
      domain: "classical-morpheme-syllable-separation",
    });
  const morphemeSyllableSeparationOperationContract =
    morphemeSyllableSeparationOperationOwner.buildContract({
      operationId: MORPHEME_SYLLABLE_SEPARATION_OPERATION_ID,
      operationType: "establish",
      consumesFrameKinds: [
        MORPHEME_SYLLABLE_SEPARATION_SOURCE_KIND,
        MEANINGFUL_MORPHEME_UNIT_RESULT_KIND,
        CARRIER_RANK_TAXONOMY_RESULT_KIND,
      ],
      producesFrameKind: MORPHEME_SYLLABLE_SEPARATION_RESULT_KIND,
      effectScopes: [
        "morpheme-or-morph-versus-syllable-rank-separation",
        "meaningful-versus-meaningless-unit-contrast",
        "coterminality-without-rank-merger",
      ],
      outputKinds: [
        "read-only-morpheme-syllable-separation-analysis-result",
      ],
      authorityRefs: ["andrews-morpheme-syllable-rank-separation"],
      description:
        "Validate the rank contrast between an independently owner-issued meaningful morpheme or morph Result and an independently owner-issued phonological syllable-rank Result, including permitted coterminality without rank merger and without constructing or realizing a unit.",
    });
  const discontinuousUnitOperationOwner = createGrammarOperationContractOwner({
    ownerId: DISCONTINUOUS_UNIT_ADMISSIBILITY_OWNER_ID,
    domain: "classical-discontinuous-unit-admissibility",
  });
  const discontinuousUnitOperationContract =
    discontinuousUnitOperationOwner.buildContract({
      operationId: DISCONTINUOUS_UNIT_ADMISSIBILITY_OPERATION_ID,
      operationType: "establish",
      consumesFrameKinds: [
        DISCONTINUOUS_UNIT_ADMISSIBILITY_SOURCE_KIND,
        "classical-nahuatl-ordinary-nnc-result-frame",
      ],
      producesFrameKind: DISCONTINUOUS_UNIT_ADMISSIBILITY_RESULT_KIND,
      effectScopes: [
        "typed-complex-unit-kind-validation",
        "nonjuxtaposed-topology-validation",
        "functional-cohesion-validation",
      ],
      outputKinds: ["read-only-discontinuous-unit-admissibility-result"],
      authorityRefs: [
        "andrews-complex-unit-discontinuity-principle",
        "andrews-nahuatl-subject-person-number-structure",
      ],
      description:
        "Validate non-juxtaposed constituent admissibility for the exact Nahuatl subject person-number unit found in an owner-issued canonical nuclear-clause result, without generating an arrangement or surface.",
    });

  function getNuclearClauseTerminology() {
    return Object.fromEntries(Object.entries(
      DOCUMENTARY_NUCLEAR_CLAUSE_TERMINOLOGY,
    ).map(([key, value]) => [key, { ...value }]));
  }

  function buildClassicalGrammarConceptSource(request = {}) {
    const requestFailure = inspectSourceRequest(request);
    const domain = requestFailure
      ? ""
      : normalizeSemanticId(request.domain);
    const selection = requestFailure
      ? ""
      : normalizeSemanticId(request.selection);
    const assertedClassification = requestFailure
      ? ""
      : normalizeSemanticId(request.assertedClassification);
    const spec = CONCEPT_SPEC_BY_KEY.get(`${domain}:${selection}`) || null;
    const canonicalOwnerResult = requestFailure
      ? null
      : request.canonicalOwnerResult || null;
    const canonicalOwnerRank = canonicalOwnerResult
      ? getCanonicalOwnerRank(targetObject, canonicalOwnerResult)
      : "";
    const invalidReason = requestFailure
      || (!domain || !selection
        ? "concept-source-domain-and-selection-required"
        : "")
      || (!spec ? "concept-source-selection-unlicensed" : "")
      || (
        assertedClassification
        && !KNOWN_CLASSIFICATIONS.has(assertedClassification)
          ? "concept-source-asserted-classification-unlicensed"
          : ""
      )
      || (
        spec?.requiredOwnerRank
        && canonicalOwnerRank !== spec.requiredOwnerRank
          ? `${spec.requiredOwnerRank}-owner-issued-result-required`
          : ""
      )
      || (
        !spec?.requiredOwnerRank
        && canonicalOwnerResult
          ? "concept-source-owner-result-not-applicable"
          : ""
      );
    const source = deepFreeze({
      kind: CONCEPT_SOURCE_KIND,
      version: CONCEPT_VERSION,
      authorizationStatus: invalidReason ? "blocked" : "authorized",
      blockReason: invalidReason,
      domain,
      selection,
      assertedClassification,
      readOnly: true,
      generationAllowed: false,
      lessonMetadataAuthority: false,
      storedLabelAuthority: false,
      translationAuthority: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
    if (!invalidReason) {
      issuedSources.add(source);
      sourceContexts.set(source, Object.freeze({
        spec,
        canonicalOwnerResult,
        canonicalOwnerRank,
      }));
    }
    return source;
  }

  function isClassicalGrammarConceptSource(source = null) {
    const context = sourceContexts.get(source) || null;
    return Boolean(
      source
      && issuedSources.has(source)
      && context?.spec
      && source.kind === CONCEPT_SOURCE_KIND
      && source.version === CONCEPT_VERSION
      && source.authorizationStatus === "authorized"
      && source.blockReason === ""
      && source.domain === context.spec.domain
      && source.selection === context.spec.selection
      && source.readOnly === true
      && source.generationAllowed === false
      && source.lessonMetadataAuthority === false
      && source.storedLabelAuthority === false
      && source.translationAuthority === false
      && source.formulaStringAuthority === false
      && source.surfaceStringAuthority === false
      && Object.isFrozen(source)
    );
  }

  function issueConceptResult({
    source = null,
    spec = null,
    authorizationStatus = "blocked",
    blockReason = "",
  } = {}) {
    const sourceContext = sourceContexts.get(source) || null;
    const result = deepFreeze({
      kind: CONCEPT_RESULT_KIND,
      version: CONCEPT_VERSION,
      authorizationStatus,
      blockReason,
      operationId: CONCEPT_APPLICATION_OPERATION_ID,
      operationContract: classificationOperationContract,
      domain: spec?.domain || "",
      selection: spec?.selection || "",
      semanticOwnerId: spec?.semanticOwnerId
        || "classical-linguistic-concept-owner",
      classification: authorizationStatus === "authorized"
        ? spec?.classification || ""
        : "",
      factRole: authorizationStatus === "authorized"
        ? spec?.factRole || ""
        : "",
      facts: authorizationStatus === "authorized"
        ? [...(spec?.facts || [])]
        : [],
      restrictions: authorizationStatus === "authorized"
        ? [...(spec?.restrictions || [])]
        : [],
      relations: authorizationStatus === "authorized"
        ? [...(spec?.relations || [])]
        : [],
      readOnly: true,
      generationAllowed: false,
      projectionApplicability: {
        written: READ_ONLY_PROJECTION_REASON,
        formula: READ_ONLY_PROJECTION_REASON,
      },
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
      lessonMetadataAuthority: false,
      storedLabelAuthority: false,
      translationAuthority: false,
      curriculumOrderAuthority: false,
    });
    issuedResults.add(result);
    if (source && typeof source === "object") {
      resultSources.set(result, source);
    }
    resultExecutions.set(result, buildConceptExecutionEvidence({
      source,
      spec,
      canonicalOwnerRank: sourceContext?.canonicalOwnerRank || "",
      authorizationStatus,
      blockReason,
    }));
    return result;
  }

  function evaluateClassicalGrammarConcept(source = null) {
    if (!isClassicalGrammarConceptSource(source)) {
      return issueConceptResult({
        blockReason: "owner-issued-concept-source-required",
      });
    }
    const context = sourceContexts.get(source);
    const spec = context.spec;
    if (spec.rejected) {
      return issueConceptResult({
        source,
        spec,
        blockReason: spec.rejectionReason,
      });
    }
    if (
      source.assertedClassification
      && source.assertedClassification !== spec.classification
    ) {
      return issueConceptResult({
        source,
        spec,
        blockReason:
          `concept-classification-mismatch:${spec.classification}`,
      });
    }
    if (
      spec.requiredOwnerRank
      && context.canonicalOwnerRank !== spec.requiredOwnerRank
    ) {
      return issueConceptResult({
        source,
        spec,
        blockReason: `${spec.requiredOwnerRank}-owner-issued-result-required`,
      });
    }
    return issueConceptResult({
      source,
      spec,
      authorizationStatus: "authorized",
    });
  }

  function isClassicalGrammarConceptResult(result = null) {
    const source = resultSources.get(result) || null;
    const sourceContext = sourceContexts.get(source) || null;
    const expectedAuthorized = Boolean(
      sourceContext?.spec
      && !sourceContext.spec.rejected
      && (
        !source.assertedClassification
        || source.assertedClassification
          === sourceContext.spec.classification
      )
      && (
        !sourceContext.spec.requiredOwnerRank
        || sourceContext.canonicalOwnerRank
          === sourceContext.spec.requiredOwnerRank
      )
    );
    return Boolean(
      result
      && issuedResults.has(result)
      && result.kind === CONCEPT_RESULT_KIND
      && result.version === CONCEPT_VERSION
      && result.operationId === CONCEPT_APPLICATION_OPERATION_ID
      && operationOwner.isContractIssued(result.operationContract)
      && (
        expectedAuthorized
          ? result.authorizationStatus === "authorized"
            && result.blockReason === ""
            && result.classification === sourceContext.spec.classification
          : result.authorizationStatus === "blocked"
            && Boolean(result.blockReason)
      )
      && result.readOnly === true
      && result.generationAllowed === false
      && result.projectionApplicability?.written
        === READ_ONLY_PROJECTION_REASON
      && result.projectionApplicability?.formula
        === READ_ONLY_PROJECTION_REASON
      && result.formulaStringAuthority === false
      && result.surfaceStringAuthority === false
      && result.lessonMetadataAuthority === false
      && result.storedLabelAuthority === false
      && result.translationAuthority === false
      && result.curriculumOrderAuthority === false
      && Object.isFrozen(result)
    );
  }

  function isClassicalGrammarConceptOperationContract(contract = null) {
    return operationOwner.isContractIssued(contract);
  }

  function getClassicalGrammarConceptExecutionEvidence(result = null) {
    return resultExecutions.get(result) || null;
  }

  function isClassicalGrammarConceptExecutionEvidence(
    evidence = null,
    result = null,
  ) {
    return Boolean(
      evidence
      && result
      && issuedResults.has(result)
      && resultExecutions.get(result) === evidence
      && evidence.execution?.routeSteps === evidence.routeSteps
      && evidence.outcome?.status === evidence.execution?.status
      && evidence.outcome?.reason === evidence.execution?.reason
      && Object.isFrozen(evidence)
    );
  }

  function buildClassicalSilentMorphContrastSource(request = {}) {
    const requestFailure = inspectSilentMorphContrastRequest(request);
    const candidateKind = requestFailure
      ? ""
      : normalizeSemanticId(request.candidateKind);
    const correspondingPosition = requestFailure
      ? ""
      : normalizeSemanticId(request.correspondingPosition);
    const structuralPattern = requestFailure
      ? ""
      : normalizeSemanticId(request.structuralPattern);
    const categoryRelation = requestFailure
      ? ""
      : normalizeSemanticId(request.categoryRelation);
    const soundedCounterpart = requestFailure
      ? ""
      : normalizeSemanticId(request.soundedCounterpart);
    const invalidReason = requestFailure
      || (!candidateKind
        ? "silent-contrast-source-candidate-kind-required"
        : "")
      || (!SILENT_MORPH_CONTRAST_CANDIDATE_KINDS.includes(candidateKind)
        ? "silent-contrast-source-candidate-kind-unlicensed"
        : "")
      || (!correspondingPosition
        ? "silent-contrast-source-corresponding-position-required"
        : "")
      || (!SILENT_MORPH_CONTRAST_COORDINATE_VALUES
        .correspondingPosition.includes(correspondingPosition)
        ? "silent-contrast-source-corresponding-position-unlicensed"
        : "")
      || (!structuralPattern
        ? "silent-contrast-source-structural-pattern-required"
        : "")
      || (!SILENT_MORPH_CONTRAST_COORDINATE_VALUES
        .structuralPattern.includes(structuralPattern)
        ? "silent-contrast-source-structural-pattern-unlicensed"
        : "")
      || (!categoryRelation
        ? "silent-contrast-source-category-relation-required"
        : "")
      || (!SILENT_MORPH_CONTRAST_COORDINATE_VALUES
        .categoryRelation.includes(categoryRelation)
        ? "silent-contrast-source-category-relation-unlicensed"
        : "")
      || (!soundedCounterpart
        ? "silent-contrast-source-sounded-counterpart-required"
        : "")
      || (!SILENT_MORPH_CONTRAST_COORDINATE_VALUES
        .soundedCounterpart.includes(soundedCounterpart)
        ? "silent-contrast-source-sounded-counterpart-unlicensed"
        : "");
    const source = deepFreeze({
      kind: SILENT_MORPH_CONTRAST_SOURCE_KIND,
      version: SILENT_MORPH_CONTRAST_VERSION,
      authorizationStatus: invalidReason ? "blocked" : "authorized",
      blockReason: invalidReason,
      candidateKind,
      correspondingPosition,
      structuralPattern,
      categoryRelation,
      soundedCounterpart,
      readOnly: true,
      generationAllowed: false,
      lessonMetadataAuthority: false,
      storedAnswerAuthority: false,
      policyLabelAuthority: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
      displayedZeroAuthority: false,
    });
    if (!invalidReason) {
      issuedSilentContrastSources.add(source);
    }
    return source;
  }

  function isClassicalSilentMorphContrastSource(source = null) {
    return Boolean(
      source
      && issuedSilentContrastSources.has(source)
      && source.kind === SILENT_MORPH_CONTRAST_SOURCE_KIND
      && source.version === SILENT_MORPH_CONTRAST_VERSION
      && source.authorizationStatus === "authorized"
      && source.blockReason === ""
      && SILENT_MORPH_CONTRAST_CANDIDATE_KINDS.includes(
        source.candidateKind,
      )
      && SILENT_MORPH_CONTRAST_COORDINATE_VALUES
        .correspondingPosition.includes(source.correspondingPosition)
      && SILENT_MORPH_CONTRAST_COORDINATE_VALUES
        .structuralPattern.includes(source.structuralPattern)
      && SILENT_MORPH_CONTRAST_COORDINATE_VALUES
        .categoryRelation.includes(source.categoryRelation)
      && SILENT_MORPH_CONTRAST_COORDINATE_VALUES
        .soundedCounterpart.includes(source.soundedCounterpart)
      && source.readOnly === true
      && source.generationAllowed === false
      && source.lessonMetadataAuthority === false
      && source.storedAnswerAuthority === false
      && source.policyLabelAuthority === false
      && source.formulaStringAuthority === false
      && source.surfaceStringAuthority === false
      && source.displayedZeroAuthority === false
      && Object.isFrozen(source)
    );
  }

  function issueSilentMorphContrastResult({
    source = null,
    authorizationStatus = "blocked",
    blockReason = "",
  } = {}) {
    const authorized = authorizationStatus === "authorized";
    const validatedCoordinates = {
      correspondingPosition:
        source?.correspondingPosition === "corresponding",
      structuralPattern:
        source?.structuralPattern === "similarly-structured",
      categoryRelation:
        source?.categoryRelation === "related-category",
      soundedCounterpart: source?.soundedCounterpart === "present",
    };
    const result = deepFreeze({
      kind: SILENT_MORPH_CONTRAST_RESULT_KIND,
      version: SILENT_MORPH_CONTRAST_VERSION,
      authorizationStatus,
      blockReason,
      semanticOwnerId: SILENT_MORPH_CONTRAST_OWNER_ID,
      operationId: SILENT_MORPH_CONTRAST_OPERATION_ID,
      operationContract: silentContrastOperationContract,
      candidateKind: source?.candidateKind || "",
      correspondingPosition: source?.correspondingPosition || "",
      structuralPattern: source?.structuralPattern || "",
      categoryRelation: source?.categoryRelation || "",
      soundedCounterpart: source?.soundedCounterpart || "",
      validatedCoordinates,
      contrastStatus: authorized
        ? "licensed-by-sounded-contrast"
        : "unlicensed-silence",
      silentHypothesisAuthorized: authorized,
      facts: authorized
        ? [
          "corresponding-position-confirmed",
          "similarly-structured-item-confirmed",
          "related-category-confirmed",
          "sounded-counterpart-confirmed",
          "contrast-justifies-silent-hypothesis",
        ]
        : [],
      relations: authorized
        ? ["sounded-silent-contrast-licenses-silent-hypothesis"]
        : [],
      restrictions: [...SILENT_MORPH_CONTRAST_RESTRICTIONS],
      readOnly: true,
      generationAllowed: false,
      projectionApplicability: {
        written: READ_ONLY_PROJECTION_REASON,
        formula: READ_ONLY_PROJECTION_REASON,
      },
      formGenerated: false,
      writtenSurfaceGenerated: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
      displayedZeroAuthority: false,
      lessonMetadataAuthority: false,
      storedAnswerAuthority: false,
      policyLabelAuthority: false,
      curriculumOrderAuthority: false,
    });
    issuedSilentContrastResults.add(result);
    if (source && typeof source === "object") {
      silentContrastResultSources.set(result, source);
    }
    silentContrastResultExecutions.set(
      result,
      buildSilentMorphContrastExecutionEvidence({
        source,
        authorizationStatus,
        blockReason,
      }),
    );
    return result;
  }

  function evaluateClassicalSilentMorphContrast(source = null) {
    if (!isClassicalSilentMorphContrastSource(source)) {
      return issueSilentMorphContrastResult({
        blockReason:
          "owner-issued-silent-morph-contrast-source-required",
      });
    }
    const blockReason = silentMorphContrastFailureReason(source);
    if (blockReason) {
      return issueSilentMorphContrastResult({ source, blockReason });
    }
    return issueSilentMorphContrastResult({
      source,
      authorizationStatus: "authorized",
    });
  }

  function isClassicalSilentMorphContrastResult(result = null) {
    const source = silentContrastResultSources.get(result) || null;
    const expectedReason = source
      ? silentMorphContrastFailureReason(source)
      : "owner-issued-silent-morph-contrast-source-required";
    const expectedAuthorized = Boolean(source && !expectedReason);
    return Boolean(
      result
      && issuedSilentContrastResults.has(result)
      && result.kind === SILENT_MORPH_CONTRAST_RESULT_KIND
      && result.version === SILENT_MORPH_CONTRAST_VERSION
      && result.semanticOwnerId === SILENT_MORPH_CONTRAST_OWNER_ID
      && result.operationId === SILENT_MORPH_CONTRAST_OPERATION_ID
      && silentContrastOperationOwner.isContractIssued(
        result.operationContract,
      )
      && (
        expectedAuthorized
          ? result.authorizationStatus === "authorized"
            && result.blockReason === ""
            && result.silentHypothesisAuthorized === true
            && result.contrastStatus === "licensed-by-sounded-contrast"
          : result.authorizationStatus === "blocked"
            && result.blockReason === expectedReason
            && result.silentHypothesisAuthorized === false
            && result.contrastStatus === "unlicensed-silence"
      )
      && result.readOnly === true
      && result.generationAllowed === false
      && result.formGenerated === false
      && result.writtenSurfaceGenerated === false
      && result.projectionApplicability?.written
        === READ_ONLY_PROJECTION_REASON
      && result.projectionApplicability?.formula
        === READ_ONLY_PROJECTION_REASON
      && result.formulaStringAuthority === false
      && result.surfaceStringAuthority === false
      && result.displayedZeroAuthority === false
      && result.lessonMetadataAuthority === false
      && result.storedAnswerAuthority === false
      && result.policyLabelAuthority === false
      && result.curriculumOrderAuthority === false
      && Object.isFrozen(result)
    );
  }

  function isClassicalSilentMorphContrastOperationContract(
    contract = null,
  ) {
    return silentContrastOperationOwner.isContractIssued(contract);
  }

  function getClassicalSilentMorphContrastExecutionEvidence(result = null) {
    return silentContrastResultExecutions.get(result) || null;
  }

  function isClassicalSilentMorphContrastExecutionEvidence(
    evidence = null,
    result = null,
  ) {
    return Boolean(
      evidence
      && result
      && issuedSilentContrastResults.has(result)
      && silentContrastResultExecutions.get(result) === evidence
      && evidence.ownerId === SILENT_MORPH_CONTRAST_OWNER_ID
      && evidence.evaluatedOperationId
        === SILENT_MORPH_CONTRAST_OPERATION_ID
      && evidence.execution?.routeSteps === evidence.routeSteps
      && evidence.outcome?.status === evidence.execution?.status
      && evidence.outcome?.reason === evidence.execution?.reason
      && Object.isFrozen(evidence)
    );
  }

  function buildClassicalLinguisticUnitCompositionSource(request = {}) {
    const requestFailure = inspectLinguisticUnitCompositionRequest(request);
    const medium = requestFailure
      ? ""
      : normalizeSemanticId(request.medium);
    const sequenceOrder = requestFailure
      ? ""
      : normalizeSemanticId(request.sequenceOrder);
    const structurePattern = requestFailure
      ? ""
      : normalizeSemanticId(request.structurePattern);
    const constituents = requestFailure || !Array.isArray(request.constituents)
      ? []
      : [...request.constituents];
    const invalidReason = requestFailure
      || (!medium
        ? "linguistic-unit-composition-source-medium-required"
        : "")
      || (!LINGUISTIC_UNIT_COMPOSITION_MEDIUMS.includes(medium)
        ? "linguistic-unit-composition-source-medium-unlicensed"
        : "")
      || (!sequenceOrder
        ? "linguistic-unit-composition-source-sequence-order-required"
        : "")
      || (!LINGUISTIC_UNIT_COMPOSITION_ORDERS.includes(sequenceOrder)
        ? "linguistic-unit-composition-source-sequence-order-unlicensed"
        : "")
      || (!structurePattern
        ? "linguistic-unit-composition-source-structure-pattern-required"
        : "")
      || (!LINGUISTIC_UNIT_COMPOSITION_PATTERNS.includes(structurePattern)
        ? "linguistic-unit-composition-source-structure-pattern-unlicensed"
        : "")
      || (!Array.isArray(request.constituents)
        ? "linguistic-unit-composition-source-constituent-array-required"
        : "");
    const source = deepFreeze({
      kind: LINGUISTIC_UNIT_COMPOSITION_SOURCE_KIND,
      version: LINGUISTIC_UNIT_COMPOSITION_VERSION,
      authorizationStatus: invalidReason ? "blocked" : "authorized",
      blockReason: invalidReason,
      medium,
      sequenceOrder,
      structurePattern,
      constituents,
      lessonMetadataAuthority: false,
      storedAnswerAuthority: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
      genericStructureClassificationAuthority: false,
      curriculumOrderAuthority: false,
    });
    if (!invalidReason) {
      issuedUnitCompositionSources.add(source);
    }
    return source;
  }

  function isClassicalLinguisticUnitCompositionSource(source = null) {
    return Boolean(
      source
      && issuedUnitCompositionSources.has(source)
      && source.kind === LINGUISTIC_UNIT_COMPOSITION_SOURCE_KIND
      && source.version === LINGUISTIC_UNIT_COMPOSITION_VERSION
      && source.authorizationStatus === "authorized"
      && source.blockReason === ""
      && LINGUISTIC_UNIT_COMPOSITION_MEDIUMS.includes(source.medium)
      && LINGUISTIC_UNIT_COMPOSITION_ORDERS.includes(source.sequenceOrder)
      && LINGUISTIC_UNIT_COMPOSITION_PATTERNS.includes(
        source.structurePattern,
      )
      && Array.isArray(source.constituents)
      && source.lessonMetadataAuthority === false
      && source.storedAnswerAuthority === false
      && source.formulaStringAuthority === false
      && source.surfaceStringAuthority === false
      && source.genericStructureClassificationAuthority === false
      && source.curriculumOrderAuthority === false
      && Object.isFrozen(source)
      && Object.isFrozen(source.constituents)
    );
  }

  function analyzeCompositionConstituents(source = null) {
    return deepFreeze((source?.constituents || []).map((constituent, index) => {
      let reason = "";
      if (!isClassicalGrammarConceptResult(constituent)) {
        reason = "owner-issued-basic-linear-element-unit-required";
      } else if (constituent.authorizationStatus !== "authorized") {
        reason = "authorized-basic-linear-element-unit-required";
      } else if (
        constituent.semanticOwnerId !== ELEMENT_CLASSIFICATION_OWNER_ID
        || constituent.domain !== "linguistic-element"
        || constituent.selection !== "element"
        || constituent.classification !== "basic-linear-element"
      ) {
        reason = "basic-linear-element-constituent-required";
      }
      return deepFreeze({
        position: index + 1,
        admitted: reason === "",
        reason,
        semanticOwnerId: constituent?.semanticOwnerId || "",
        domain: constituent?.domain || "",
        selection: constituent?.selection || "",
        classification: constituent?.classification || "",
      });
    }));
  }

  function linguisticUnitCompositionFailure({
    source = null,
    constituentAnalyses = [],
  } = {}) {
    const mediumReason = compositionMediumFailureReason(source);
    if (mediumReason) return mediumReason;
    if (source?.constituents?.length !== 2) {
      return "binary-unit-composition-requires-two-constituents";
    }
    const constituentReason = constituentAnalyses.find(
      (analysis) => analysis.reason,
    )?.reason || "";
    if (constituentReason) return constituentReason;
    if (source?.structurePattern !== "patterned-whole") {
      return "linguistically-valid-sequence-must-be-structured";
    }
    return "";
  }

  function issueLinguisticUnitCompositionResult({
    source = null,
    constituentAnalyses = [],
    authorizationStatus = "blocked",
    blockReason = "",
  } = {}) {
    const authorized = authorizationStatus === "authorized";
    const result = deepFreeze({
      kind: LINGUISTIC_UNIT_COMPOSITION_RESULT_KIND,
      version: LINGUISTIC_UNIT_COMPOSITION_VERSION,
      authorizationStatus,
      blockReason,
      semanticOwnerId: LINGUISTIC_UNIT_COMPOSITION_OWNER_ID,
      operationId: LINGUISTIC_UNIT_COMPOSITION_OPERATION_ID,
      operationContract: unitCompositionOperationContract,
      medium: source?.medium || "",
      sequenceOrder: source?.sequenceOrder || "",
      structurePattern: source?.structurePattern || "",
      constituentCount: source?.constituents?.length || 0,
      constituentClassifications: authorized
        ? source.constituents.map((constituent) => constituent.classification)
        : [],
      constituentResults: authorized ? [...source.constituents] : [],
      compositionStatus: authorized
        ? "composed-complex-unit"
        : "composition-rejected",
      unitKind: authorized ? "complex-structural-unit" : "",
      resultUnitCount: authorized ? 1 : 0,
      facts: authorized
        ? [
          "elements-combined-into-linear-sequence",
          source.medium === "speech"
            ? "speech-sequence-is-temporal"
            : "written-sequence-is-spatial",
          "parts-patterned-into-structured-whole",
          "two-constituent-units-compose-as-one-unit",
          "constituents-entered-combination-as-units",
          "composition-result-is-a-unit",
        ]
        : [],
      relations: authorized
        ? ["two-admitted-units-compose-into-one-complex-unit"]
        : [],
      restrictions: [...LINGUISTIC_UNIT_COMPOSITION_RESTRICTIONS],
      structuralCompositionExecuted: authorized,
      generationAllowed: false,
      soundedSurfaceGenerated: false,
      writtenSurfaceGenerated: false,
      formulaGenerated: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
      lessonMetadataAuthority: false,
      storedAnswerAuthority: false,
      genericStructureClassificationAuthority: false,
      curriculumOrderAuthority: false,
    });
    issuedUnitCompositionResults.add(result);
    if (source && typeof source === "object") {
      unitCompositionResultSources.set(result, source);
    }
    unitCompositionResultExecutions.set(
      result,
      buildLinguisticUnitCompositionExecutionEvidence({
        source,
        constituentAnalyses,
        authorizationStatus,
        blockReason,
      }),
    );
    return result;
  }

  function evaluateClassicalLinguisticUnitComposition(source = null) {
    if (!isClassicalLinguisticUnitCompositionSource(source)) {
      return issueLinguisticUnitCompositionResult({
        blockReason:
          "owner-issued-linguistic-unit-composition-source-required",
      });
    }
    const constituentAnalyses = analyzeCompositionConstituents(source);
    const blockReason = linguisticUnitCompositionFailure({
      source,
      constituentAnalyses,
    });
    if (blockReason) {
      return issueLinguisticUnitCompositionResult({
        source,
        constituentAnalyses,
        blockReason,
      });
    }
    return issueLinguisticUnitCompositionResult({
      source,
      constituentAnalyses,
      authorizationStatus: "authorized",
    });
  }

  function isClassicalLinguisticUnitCompositionResult(result = null) {
    const source = unitCompositionResultSources.get(result) || null;
    const constituentAnalyses = source
      ? analyzeCompositionConstituents(source)
      : [];
    const expectedReason = source
      ? linguisticUnitCompositionFailure({ source, constituentAnalyses })
      : "owner-issued-linguistic-unit-composition-source-required";
    const expectedAuthorized = Boolean(source && !expectedReason);
    return Boolean(
      result
      && issuedUnitCompositionResults.has(result)
      && result.kind === LINGUISTIC_UNIT_COMPOSITION_RESULT_KIND
      && result.version === LINGUISTIC_UNIT_COMPOSITION_VERSION
      && result.semanticOwnerId === LINGUISTIC_UNIT_COMPOSITION_OWNER_ID
      && result.operationId === LINGUISTIC_UNIT_COMPOSITION_OPERATION_ID
      && unitCompositionOperationOwner.isContractIssued(
        result.operationContract,
      )
      && (
        expectedAuthorized
          ? result.authorizationStatus === "authorized"
            && result.blockReason === ""
            && result.compositionStatus === "composed-complex-unit"
            && result.unitKind === "complex-structural-unit"
            && result.resultUnitCount === 1
            && result.structuralCompositionExecuted === true
            && result.constituentResults.length === 2
          : result.authorizationStatus === "blocked"
            && result.blockReason === expectedReason
            && result.compositionStatus === "composition-rejected"
            && result.unitKind === ""
            && result.resultUnitCount === 0
            && result.structuralCompositionExecuted === false
            && result.constituentResults.length === 0
      )
      && result.generationAllowed === false
      && result.soundedSurfaceGenerated === false
      && result.writtenSurfaceGenerated === false
      && result.formulaGenerated === false
      && result.formulaStringAuthority === false
      && result.surfaceStringAuthority === false
      && result.lessonMetadataAuthority === false
      && result.storedAnswerAuthority === false
      && result.genericStructureClassificationAuthority === false
      && result.curriculumOrderAuthority === false
      && Object.isFrozen(result)
      && Object.isFrozen(result.constituentResults)
    );
  }

  function isClassicalLinguisticUnitCompositionOperationContract(
    contract = null,
  ) {
    return unitCompositionOperationOwner.isContractIssued(contract);
  }

  function getClassicalLinguisticUnitCompositionExecutionEvidence(
    result = null,
  ) {
    return unitCompositionResultExecutions.get(result) || null;
  }

  function isClassicalLinguisticUnitCompositionExecutionEvidence(
    evidence = null,
    result = null,
  ) {
    return Boolean(
      evidence
      && result
      && issuedUnitCompositionResults.has(result)
      && unitCompositionResultExecutions.get(result) === evidence
      && evidence.ownerId === LINGUISTIC_UNIT_COMPOSITION_OWNER_ID
      && evidence.evaluatedOperationId
        === LINGUISTIC_UNIT_COMPOSITION_OPERATION_ID
      && evidence.execution?.routeSteps === evidence.routeSteps
      && evidence.outcome?.status === evidence.execution?.status
      && evidence.outcome?.reason === evidence.execution?.reason
      && Object.isFrozen(evidence)
    );
  }

  function analyzePriorRecursiveStructureResult(result = null) {
    const initialComposition = Boolean(
      isClassicalLinguisticUnitCompositionResult(result)
      && result.authorizationStatus === "authorized"
      && result.structuralCompositionExecuted === true,
    );
    const priorRecursion = Boolean(
      !initialComposition
      && isClassicalLinguisticStructureRecursionResult(result)
      && result.authorizationStatus === "authorized"
      && result.recursiveCompositionExecuted === true,
    );
    const executionEvidence = initialComposition
      ? getClassicalLinguisticUnitCompositionExecutionEvidence(result)
      : priorRecursion
        ? getClassicalLinguisticStructureRecursionExecutionEvidence(result)
        : null;
    const evidenceValid = initialComposition
      ? isClassicalLinguisticUnitCompositionExecutionEvidence(
        executionEvidence,
        result,
      )
      : priorRecursion
        ? isClassicalLinguisticStructureRecursionExecutionEvidence(
          executionEvidence,
          result,
        )
        : false;
    const executedOperationLineage = initialComposition
      ? [LINGUISTIC_UNIT_COMPOSITION_OPERATION_ID]
      : priorRecursion
        ? [...result.executedOperationLineage]
        : [];
    const routeExecutedOperationIds = evidenceValid
      ? executionEvidence.routeSteps.flatMap(
        (step) => step.executedRuleIds || [],
      )
      : [];
    const routeRetained = Boolean(
      evidenceValid
      && routeExecutedOperationIds.includes(
        LINGUISTIC_UNIT_COMPOSITION_OPERATION_ID,
      )
      && (
        !priorRecursion
        || routeExecutedOperationIds.includes(
          LINGUISTIC_STRUCTURE_RECURSION_OPERATION_ID,
        )
      ),
    );
    let reason = "";
    if (!initialComposition && !priorRecursion) {
      reason = "owner-issued-prior-structural-unit-result-required";
    } else if (!routeRetained) {
      reason = "prior-structural-unit-live-route-required";
    }
    const medium = initialComposition || priorRecursion
      ? result.medium
      : "";
    const sequenceOrder = initialComposition || priorRecursion
      ? result.sequenceOrder
      : "";
    const structurePattern = initialComposition || priorRecursion
      ? result.structurePattern
      : "";
    const mediumOrderValid = Boolean(
      (medium === "speech" && sequenceOrder === "temporal")
      || (medium === "writing" && sequenceOrder === "spatial"),
    );
    return deepFreeze({
      admitted: reason === "",
      reason,
      structureKind: initialComposition
        ? "initial-composition-result"
        : priorRecursion
          ? "recursive-composition-result"
          : "",
      semanticOwnerId: result?.semanticOwnerId || "",
      medium,
      sequenceOrder,
      structurePattern,
      mediumOrderValid,
      leafConstituentCount: initialComposition
        ? result.constituentResults.length
        : priorRecursion
          ? result.leafConstituentCount
          : 0,
      leafConstituentResults: initialComposition
        ? [...result.constituentResults]
        : priorRecursion
          ? [...result.leafConstituentResults]
          : [],
      priorRecursionApplicationCount: priorRecursion
        ? result.recursionApplicationCount
        : 0,
      executedOperationLineage,
      executionEvidence,
      routeRetained,
    });
  }

  function analyzeRecursiveNextConstituent(result = null) {
    const ownerIssued = isClassicalGrammarConceptResult(result);
    const admitted = Boolean(
      ownerIssued
      && result.authorizationStatus === "authorized"
      && result.semanticOwnerId === ELEMENT_CLASSIFICATION_OWNER_ID
      && result.domain === "linguistic-element"
      && result.selection === "element"
      && result.classification === "basic-linear-element",
    );
    let reason = "";
    if (!ownerIssued) {
      reason = "owner-issued-next-basic-linear-element-unit-required";
    } else if (result.authorizationStatus !== "authorized") {
      reason = "authorized-next-basic-linear-element-unit-required";
    } else if (!admitted) {
      reason = "basic-linear-element-next-constituent-required";
    }
    return deepFreeze({
      admitted,
      reason,
      constituentKind: admitted ? "basic-linear-element-unit" : "",
      semanticOwnerId: result?.semanticOwnerId || "",
      classification: result?.classification || "",
    });
  }

  function linguisticStructureRecursionFailure({
    priorAnalysis = null,
    nextAnalysis = null,
  } = {}) {
    if (priorAnalysis?.reason) return priorAnalysis.reason;
    if (priorAnalysis?.routeRetained !== true) {
      return "prior-structural-unit-live-route-required";
    }
    if (nextAnalysis?.reason) return nextAnalysis.reason;
    if (priorAnalysis?.mediumOrderValid !== true) {
      return "prior-structural-unit-medium-order-required";
    }
    if (priorAnalysis?.structurePattern !== "patterned-whole") {
      return "prior-structured-whole-required";
    }
    return "";
  }

  function buildClassicalLinguisticStructureRecursionSource(request = {}) {
    const requestFailure = inspectLinguisticStructureRecursionRequest(request);
    const priorStructureResult = requestFailure
      ? null
      : request.priorStructureResult || null;
    const nextConstituentResult = requestFailure
      ? null
      : request.nextConstituentResult || null;
    const priorAnalysis = analyzePriorRecursiveStructureResult(
      priorStructureResult,
    );
    const nextAnalysis = analyzeRecursiveNextConstituent(
      nextConstituentResult,
    );
    const invalidReason = requestFailure
      || (!priorStructureResult
        ? "linguistic-structure-recursion-prior-structure-result-required"
        : "")
      || (!nextConstituentResult
        ? "linguistic-structure-recursion-next-constituent-result-required"
        : "")
      || linguisticStructureRecursionFailure({
        priorAnalysis,
        nextAnalysis,
      });
    const source = deepFreeze({
      kind: LINGUISTIC_STRUCTURE_RECURSION_SOURCE_KIND,
      version: LINGUISTIC_STRUCTURE_RECURSION_VERSION,
      authorizationStatus: invalidReason ? "blocked" : "authorized",
      blockReason: invalidReason,
      priorStructureResult,
      nextConstituentResult,
      inheritedMedium: priorAnalysis.medium,
      inheritedSequenceOrder: priorAnalysis.sequenceOrder,
      inheritedStructurePattern: priorAnalysis.structurePattern,
      recursionLabelAuthority: false,
      depthCounterAuthority: false,
      storedTreeAuthority: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
      lessonMetadataAuthority: false,
      curriculumOrderAuthority: false,
      generationAllowed: false,
    });
    issuedStructureRecursionSources.add(source);
    structureRecursionSourceContexts.set(source, deepFreeze({
      priorAnalysis,
      nextAnalysis,
    }));
    return source;
  }

  function isClassicalLinguisticStructureRecursionSource(source = null) {
    const context = structureRecursionSourceContexts.get(source) || null;
    return Boolean(
      source
      && issuedStructureRecursionSources.has(source)
      && context
      && source.kind === LINGUISTIC_STRUCTURE_RECURSION_SOURCE_KIND
      && source.version === LINGUISTIC_STRUCTURE_RECURSION_VERSION
      && source.authorizationStatus === "authorized"
      && source.blockReason === ""
      && context.priorAnalysis.admitted === true
      && context.priorAnalysis.routeRetained === true
      && context.nextAnalysis.admitted === true
      && source.inheritedMedium === context.priorAnalysis.medium
      && source.inheritedSequenceOrder === context.priorAnalysis.sequenceOrder
      && source.inheritedStructurePattern
        === context.priorAnalysis.structurePattern
      && source.recursionLabelAuthority === false
      && source.depthCounterAuthority === false
      && source.storedTreeAuthority === false
      && source.formulaStringAuthority === false
      && source.surfaceStringAuthority === false
      && source.lessonMetadataAuthority === false
      && source.curriculumOrderAuthority === false
      && source.generationAllowed === false
      && Object.isFrozen(source)
    );
  }

  function issueLinguisticStructureRecursionResult({
    source = null,
    priorAnalysis = null,
    nextAnalysis = null,
    authorizationStatus = "blocked",
    blockReason = "",
  } = {}) {
    const authorized = authorizationStatus === "authorized";
    const leafConstituentResults = authorized
      ? [
        ...priorAnalysis.leafConstituentResults,
        source.nextConstituentResult,
      ]
      : [];
    const executedOperationLineage = authorized
      ? [
        ...priorAnalysis.executedOperationLineage,
        LINGUISTIC_STRUCTURE_RECURSION_OPERATION_ID,
      ]
      : [];
    const result = deepFreeze({
      kind: LINGUISTIC_STRUCTURE_RECURSION_RESULT_KIND,
      version: LINGUISTIC_STRUCTURE_RECURSION_VERSION,
      authorizationStatus,
      blockReason,
      semanticOwnerId: LINGUISTIC_STRUCTURE_RECURSION_OWNER_ID,
      operationId: LINGUISTIC_STRUCTURE_RECURSION_OPERATION_ID,
      operationContract: structureRecursionOperationContract,
      priorStructureKind: authorized ? priorAnalysis.structureKind : "",
      medium: authorized ? priorAnalysis.medium : "",
      sequenceOrder: authorized ? priorAnalysis.sequenceOrder : "",
      structurePattern: authorized ? priorAnalysis.structurePattern : "",
      directConstituentCount: authorized ? 2 : 0,
      leafConstituentCount: authorized ? leafConstituentResults.length : 0,
      leafConstituentResults,
      recursionApplicationCount: authorized
        ? priorAnalysis.priorRecursionApplicationCount + 1
        : 0,
      executedOperationLineage,
      compositionStatus: authorized
        ? "recursively-composed-structural-unit"
        : "recursive-composition-rejected",
      unitKind: authorized
        ? "recursively-composed-structural-unit"
        : "",
      resultUnitCount: authorized ? 1 : 0,
      facts: authorized
        ? [
          "prior-composed-unit-entered-a-new-combination-as-one-unit",
          "one-next-basic-linear-element-unit-entered-the-new-combination",
          "composition-rule-reapplied-after-prior-composition",
          "recursive-composition-result-is-one-structured-unit",
          "all-prior-composition-operations-precede-the-new-recursive-operation",
        ]
        : [],
      relations: authorized
        ? ["prior-unit-plus-next-unit-form-one-recursively-composed-unit"]
        : [],
      restrictions: [...LINGUISTIC_STRUCTURE_RECURSION_RESTRICTIONS],
      priorOperationLineageRetained: authorized,
      recursiveCompositionExecuted: authorized,
      hierarchyAuthorized: false,
      rankPotentialAuthorized: false,
      recursionLabelAuthority: false,
      depthCounterAuthority: false,
      storedTreeAuthority: false,
      generationAllowed: false,
      soundedSurfaceGenerated: false,
      writtenSurfaceGenerated: false,
      formulaGenerated: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
      lessonMetadataAuthority: false,
      curriculumOrderAuthority: false,
    });
    issuedStructureRecursionResults.add(result);
    if (source && typeof source === "object") {
      structureRecursionResultSources.set(result, source);
    }
    structureRecursionResultExecutions.set(
      result,
      buildLinguisticStructureRecursionExecutionEvidence({
        source,
        priorAnalysis,
        nextAnalysis,
        authorizationStatus,
        blockReason,
      }),
    );
    return result;
  }

  function evaluateClassicalLinguisticStructureRecursion(source = null) {
    if (!issuedStructureRecursionSources.has(source)) {
      return issueLinguisticStructureRecursionResult({
        blockReason:
          "owner-issued-linguistic-structure-recursion-source-required",
      });
    }
    const context = structureRecursionSourceContexts.get(source) || null;
    if (!isClassicalLinguisticStructureRecursionSource(source)) {
      return issueLinguisticStructureRecursionResult({
        source,
        priorAnalysis: context?.priorAnalysis || null,
        nextAnalysis: context?.nextAnalysis || null,
        blockReason: source.blockReason
          || "authorized-linguistic-structure-recursion-source-required",
      });
    }
    const blockReason = linguisticStructureRecursionFailure(context);
    if (blockReason) {
      return issueLinguisticStructureRecursionResult({
        source,
        priorAnalysis: context.priorAnalysis,
        nextAnalysis: context.nextAnalysis,
        blockReason,
      });
    }
    return issueLinguisticStructureRecursionResult({
      source,
      priorAnalysis: context.priorAnalysis,
      nextAnalysis: context.nextAnalysis,
      authorizationStatus: "authorized",
    });
  }

  function isClassicalLinguisticStructureRecursionResult(result = null) {
    const source = structureRecursionResultSources.get(result) || null;
    const context = source
      ? structureRecursionSourceContexts.get(source) || null
      : null;
    const expectedReason = source
      ? source.blockReason || linguisticStructureRecursionFailure(context)
      : "owner-issued-linguistic-structure-recursion-source-required";
    const expectedAuthorized = Boolean(source && !expectedReason);
    const expectedLeafCount = expectedAuthorized
      ? context.priorAnalysis.leafConstituentCount + 1
      : 0;
    const expectedRecursionApplications = expectedAuthorized
      ? context.priorAnalysis.priorRecursionApplicationCount + 1
      : 0;
    return Boolean(
      result
      && issuedStructureRecursionResults.has(result)
      && result.kind === LINGUISTIC_STRUCTURE_RECURSION_RESULT_KIND
      && result.version === LINGUISTIC_STRUCTURE_RECURSION_VERSION
      && result.semanticOwnerId === LINGUISTIC_STRUCTURE_RECURSION_OWNER_ID
      && result.operationId === LINGUISTIC_STRUCTURE_RECURSION_OPERATION_ID
      && structureRecursionOperationOwner.isContractIssued(
        result.operationContract,
      )
      && (
        expectedAuthorized
          ? result.authorizationStatus === "authorized"
            && result.blockReason === ""
            && result.compositionStatus
              === "recursively-composed-structural-unit"
            && result.unitKind === "recursively-composed-structural-unit"
            && result.resultUnitCount === 1
            && result.directConstituentCount === 2
            && result.leafConstituentCount === expectedLeafCount
            && result.leafConstituentResults.length === expectedLeafCount
            && result.recursionApplicationCount
              === expectedRecursionApplications
            && result.executedOperationLineage.at(-1)
              === LINGUISTIC_STRUCTURE_RECURSION_OPERATION_ID
            && result.priorOperationLineageRetained === true
            && result.recursiveCompositionExecuted === true
          : result.authorizationStatus === "blocked"
            && result.blockReason === expectedReason
            && result.compositionStatus === "recursive-composition-rejected"
            && result.unitKind === ""
            && result.resultUnitCount === 0
            && result.directConstituentCount === 0
            && result.leafConstituentCount === 0
            && result.leafConstituentResults.length === 0
            && result.recursionApplicationCount === 0
            && result.executedOperationLineage.length === 0
            && result.priorOperationLineageRetained === false
            && result.recursiveCompositionExecuted === false
      )
      && result.hierarchyAuthorized === false
      && result.rankPotentialAuthorized === false
      && result.recursionLabelAuthority === false
      && result.depthCounterAuthority === false
      && result.storedTreeAuthority === false
      && result.generationAllowed === false
      && result.soundedSurfaceGenerated === false
      && result.writtenSurfaceGenerated === false
      && result.formulaGenerated === false
      && result.formulaStringAuthority === false
      && result.surfaceStringAuthority === false
      && result.lessonMetadataAuthority === false
      && result.curriculumOrderAuthority === false
      && Object.isFrozen(result)
      && Object.isFrozen(result.leafConstituentResults)
      && Object.isFrozen(result.executedOperationLineage)
    );
  }

  function isClassicalLinguisticStructureRecursionOperationContract(
    contract = null,
  ) {
    return structureRecursionOperationOwner.isContractIssued(contract);
  }

  function getClassicalLinguisticStructureRecursionExecutionEvidence(
    result = null,
  ) {
    return structureRecursionResultExecutions.get(result) || null;
  }

  function isClassicalLinguisticStructureRecursionExecutionEvidence(
    evidence = null,
    result = null,
  ) {
    const recursiveOperationSteps = evidence?.routeSteps?.filter(
      (step) => step.executedRuleIds?.includes(
        LINGUISTIC_STRUCTURE_RECURSION_OPERATION_ID,
      ),
    ) || [];
    const compositionOperationRetained = Boolean(
      evidence?.routeSteps?.some((step) => step.executedRuleIds?.includes(
        LINGUISTIC_UNIT_COMPOSITION_OPERATION_ID,
      )),
    );
    const outerRecursiveOperationStep = evidence?.routeSteps?.find(
      (step) => step.stepId === "linguistic-structure-recursion-executed",
    ) || null;
    return Boolean(
      evidence
      && result
      && issuedStructureRecursionResults.has(result)
      && structureRecursionResultExecutions.get(result) === evidence
      && evidence.ownerId === LINGUISTIC_STRUCTURE_RECURSION_OWNER_ID
      && evidence.evaluatedOperationId
        === LINGUISTIC_STRUCTURE_RECURSION_OPERATION_ID
      && evidence.execution?.routeSteps === evidence.routeSteps
      && evidence.outcome?.status === evidence.execution?.status
      && evidence.outcome?.reason === evidence.execution?.reason
      && (
        result.authorizationStatus === "authorized"
          ? compositionOperationRetained
            && recursiveOperationSteps.length
              === result.recursionApplicationCount
            && outerRecursiveOperationStep
              === recursiveOperationSteps.at(-1)
          : !outerRecursiveOperationStep
      )
      && Object.isFrozen(evidence)
    );
  }

  function buildClassicalCarrierRankTaxonomySource(request = {}) {
    const requestFailure = inspectCarrierRankTaxonomyRequest(request);
    const subsystem = typeof request?.subsystem === "string"
      ? request.subsystem
      : "";
    const rankTier = typeof request?.rankTier === "string"
      ? request.rankTier
      : "";
    const definition = carrierRankTaxonomyDefinition(subsystem, rankTier);
    const invalidReason = carrierRankTaxonomyFailure({
      requestFailure,
      subsystem,
      rankTier,
    });
    const source = deepFreeze({
      kind: CARRIER_RANK_TAXONOMY_SOURCE_KIND,
      version: CARRIER_RANK_TAXONOMY_VERSION,
      authorizationStatus: invalidReason ? "blocked" : "authorized",
      blockReason: invalidReason,
      subsystem,
      rankTier,
      rankLabelAuthority: false,
      storedHierarchyTableAuthority: false,
      expectedRankAuthority: false,
      hierarchyFamilyLabelAuthority: false,
      lessonMetadataAuthority: false,
      storedAnswerAuthority: false,
      surfaceStringAuthority: false,
      formulaStringAuthority: false,
      generationAllowed: false,
    });
    issuedCarrierRankTaxonomySources.add(source);
    carrierRankTaxonomySourceContexts.set(source, deepFreeze({
      requestFailure,
      definition,
    }));
    return source;
  }

  function isClassicalCarrierRankTaxonomySource(source = null) {
    const context = carrierRankTaxonomySourceContexts.get(source) || null;
    const definition = context?.definition || null;
    return Boolean(
      source
      && issuedCarrierRankTaxonomySources.has(source)
      && context
      && source.kind === CARRIER_RANK_TAXONOMY_SOURCE_KIND
      && source.version === CARRIER_RANK_TAXONOMY_VERSION
      && source.authorizationStatus === "authorized"
      && source.blockReason === ""
      && context.requestFailure === ""
      && definition
      && definition === carrierRankTaxonomyDefinition(
        source.subsystem,
        source.rankTier,
      )
      && source.rankLabelAuthority === false
      && source.storedHierarchyTableAuthority === false
      && source.expectedRankAuthority === false
      && source.hierarchyFamilyLabelAuthority === false
      && source.lessonMetadataAuthority === false
      && source.storedAnswerAuthority === false
      && source.surfaceStringAuthority === false
      && source.formulaStringAuthority === false
      && source.generationAllowed === false
      && Object.isFrozen(source)
    );
  }

  function issueCarrierRankTaxonomyResult({
    source = null,
    context = null,
    authorizationStatus = "blocked",
    blockReason = "",
  } = {}) {
    const authorized = authorizationStatus === "authorized";
    const definition = authorized ? context?.definition || null : null;
    const subsystem = authorized ? source.subsystem : "";
    const rankTier = authorized ? source.rankTier : "";
    const result = deepFreeze({
      kind: CARRIER_RANK_TAXONOMY_RESULT_KIND,
      version: CARRIER_RANK_TAXONOMY_VERSION,
      authorizationStatus,
      blockReason,
      semanticOwnerId: CARRIER_RANK_TAXONOMY_OWNER_ID,
      operationId: CARRIER_RANK_TAXONOMY_OPERATION_ID,
      operationContract: carrierRankTaxonomyOperationContract,
      classificationStatus: authorized
        ? "classified-carrier-rank-identity"
        : "carrier-rank-classification-rejected",
      hierarchyFamily: authorized ? "meaningless" : "",
      subsystem,
      rankTier,
      rankId: authorized ? definition.rankId : "",
      rankLabel: authorized ? definition.rankLabel : "",
      rankOrdinal: authorized ? definition.rankOrdinal : 0,
      hierarchyLength: authorized ? CARRIER_RANK_TAXONOMY_TIERS.length : 0,
      rankIdentity: authorized
        ? `${subsystem}:${definition.rankId}`
        : "",
      facts: authorized
        ? [
          "carrier-rank-is-one-of-four-basic-hierarchical-tiers",
          `${subsystem}-${rankTier}-rank-is-${definition.rankId}`,
          "rank-identity-is-bound-to-its-carrier-subsystem",
        ]
        : [],
      relations: authorized
        ? [
          `${definition.rankId}-belongs-to-${subsystem}-carrier-taxonomy`,
        ]
        : [],
      restrictions: [...CARRIER_RANK_TAXONOMY_RESTRICTIONS],
      rankTaxonomyClassified: authorized,
      rankUnitConstructed: false,
      rankUnitUpgraded: false,
      rankPotentialAuthorized: false,
      hierarchyPartitionAuthorized: false,
      meaningfulUnitAuthorized: false,
      syllableStructureAuthorized: false,
      vocableStructureAuthorized: false,
      generationAllowed: false,
      soundedSurfaceGenerated: false,
      writtenSurfaceGenerated: false,
      formulaGenerated: false,
      rankLabelAuthority: false,
      storedHierarchyTableAuthority: false,
      expectedRankAuthority: false,
      hierarchyFamilyLabelAuthority: false,
      lessonMetadataAuthority: false,
      storedAnswerAuthority: false,
      surfaceStringAuthority: false,
      formulaStringAuthority: false,
    });
    issuedCarrierRankTaxonomyResults.add(result);
    if (source && typeof source === "object") {
      carrierRankTaxonomyResultSources.set(result, source);
    }
    carrierRankTaxonomyResultExecutions.set(
      result,
      buildCarrierRankTaxonomyExecutionEvidence({
        source,
        context,
        authorizationStatus,
        blockReason,
      }),
    );
    return result;
  }

  function evaluateClassicalCarrierRankTaxonomy(source = null) {
    if (!issuedCarrierRankTaxonomySources.has(source)) {
      return issueCarrierRankTaxonomyResult({
        blockReason: "owner-issued-carrier-rank-taxonomy-source-required",
      });
    }
    const context = carrierRankTaxonomySourceContexts.get(source) || null;
    const blockReason = source.blockReason || carrierRankTaxonomyFailure({
      requestFailure: context?.requestFailure || "",
      subsystem: source.subsystem,
      rankTier: source.rankTier,
    });
    if (blockReason || !isClassicalCarrierRankTaxonomySource(source)) {
      return issueCarrierRankTaxonomyResult({
        source,
        context,
        blockReason: blockReason
          || "authorized-carrier-rank-taxonomy-source-required",
      });
    }
    return issueCarrierRankTaxonomyResult({
      source,
      context,
      authorizationStatus: "authorized",
    });
  }

  function isClassicalCarrierRankTaxonomyResult(result = null) {
    const source = carrierRankTaxonomyResultSources.get(result) || null;
    const context = source
      ? carrierRankTaxonomySourceContexts.get(source) || null
      : null;
    const expectedReason = source
      ? source.blockReason || carrierRankTaxonomyFailure({
        requestFailure: context?.requestFailure || "",
        subsystem: source.subsystem,
        rankTier: source.rankTier,
      })
      : "owner-issued-carrier-rank-taxonomy-source-required";
    const expectedAuthorized = Boolean(source && !expectedReason);
    const definition = expectedAuthorized ? context?.definition || null : null;
    return Boolean(
      result
      && issuedCarrierRankTaxonomyResults.has(result)
      && result.kind === CARRIER_RANK_TAXONOMY_RESULT_KIND
      && result.version === CARRIER_RANK_TAXONOMY_VERSION
      && result.semanticOwnerId === CARRIER_RANK_TAXONOMY_OWNER_ID
      && result.operationId === CARRIER_RANK_TAXONOMY_OPERATION_ID
      && carrierRankTaxonomyOperationOwner.isContractIssued(
        result.operationContract,
      )
      && (
        expectedAuthorized
          ? result.authorizationStatus === "authorized"
            && result.blockReason === ""
            && result.classificationStatus
              === "classified-carrier-rank-identity"
            && result.hierarchyFamily === "meaningless"
            && result.subsystem === source.subsystem
            && result.rankTier === source.rankTier
            && result.rankId === definition.rankId
            && result.rankLabel === definition.rankLabel
            && result.rankOrdinal === definition.rankOrdinal
            && result.hierarchyLength === 4
            && result.rankIdentity
              === `${source.subsystem}:${definition.rankId}`
            && result.rankTaxonomyClassified === true
          : result.authorizationStatus === "blocked"
            && result.blockReason === expectedReason
            && result.classificationStatus
              === "carrier-rank-classification-rejected"
            && result.hierarchyFamily === ""
            && result.subsystem === ""
            && result.rankTier === ""
            && result.rankId === ""
            && result.rankLabel === ""
            && result.rankOrdinal === 0
            && result.hierarchyLength === 0
            && result.rankIdentity === ""
            && result.rankTaxonomyClassified === false
      )
      && result.rankUnitConstructed === false
      && result.rankUnitUpgraded === false
      && result.rankPotentialAuthorized === false
      && result.hierarchyPartitionAuthorized === false
      && result.meaningfulUnitAuthorized === false
      && result.syllableStructureAuthorized === false
      && result.vocableStructureAuthorized === false
      && result.generationAllowed === false
      && result.soundedSurfaceGenerated === false
      && result.writtenSurfaceGenerated === false
      && result.formulaGenerated === false
      && result.rankLabelAuthority === false
      && result.storedHierarchyTableAuthority === false
      && result.expectedRankAuthority === false
      && result.hierarchyFamilyLabelAuthority === false
      && result.lessonMetadataAuthority === false
      && result.storedAnswerAuthority === false
      && result.surfaceStringAuthority === false
      && result.formulaStringAuthority === false
      && Object.isFrozen(result)
      && Object.isFrozen(result.facts)
      && Object.isFrozen(result.relations)
      && Object.isFrozen(result.restrictions)
    );
  }

  function isClassicalCarrierRankTaxonomyOperationContract(contract = null) {
    return carrierRankTaxonomyOperationOwner.isContractIssued(contract);
  }

  function getClassicalCarrierRankTaxonomyExecutionEvidence(result = null) {
    return carrierRankTaxonomyResultExecutions.get(result) || null;
  }

  function isClassicalCarrierRankTaxonomyExecutionEvidence(
    evidence = null,
    result = null,
  ) {
    const operationSteps = evidence?.routeSteps?.filter(
      (step) => step.executedRuleIds?.includes(
        CARRIER_RANK_TAXONOMY_OPERATION_ID,
      ),
    ) || [];
    return Boolean(
      evidence
      && result
      && issuedCarrierRankTaxonomyResults.has(result)
      && carrierRankTaxonomyResultExecutions.get(result) === evidence
      && evidence.ownerId === CARRIER_RANK_TAXONOMY_OWNER_ID
      && evidence.evaluatedOperationId === CARRIER_RANK_TAXONOMY_OPERATION_ID
      && evidence.execution?.routeSteps === evidence.routeSteps
      && evidence.outcome?.status === evidence.execution?.status
      && evidence.outcome?.reason === evidence.execution?.reason
      && (
        result.authorizationStatus === "authorized"
          ? operationSteps.length === 1
            && operationSteps[0].stepId === "carrier-rank-identity-classified"
          : operationSteps.length === 0
      )
      && Object.isFrozen(evidence)
    );
  }

  function analyzeMeaninglessCarrierCandidate(candidateResult = null) {
    const ownerIssued = isClassicalGrammarConceptResult(candidateResult);
    const executionEvidence = ownerIssued
      ? getClassicalGrammarConceptExecutionEvidence(candidateResult)
      : null;
    const routeRetained = ownerIssued
      && isClassicalGrammarConceptExecutionEvidence(
        executionEvidence,
        candidateResult,
      );
    const candidateDefinitions = [
      {
        candidateKind: "phoneme",
        semanticOwnerId: PHONEME_CLASSIFICATION_OWNER_ID,
        domain: "linguistic-element",
        selection: "phoneme",
        classification: "carrier-type-element",
        subsystem: "phonological",
        analysisLevel: "type",
      },
      {
        candidateKind: "phone",
        semanticOwnerId: PHONE_REPERTORY_ANALYSIS_OWNER_ID,
        domain: "phone-repertory-analysis",
        selection: "phone-definition",
        classification: "phone-repertory-analysis",
        subsystem: "phonological",
        analysisLevel: "token",
      },
      {
        candidateKind: "grapheme",
        semanticOwnerId: GRAPHEME_CLASSIFICATION_OWNER_ID,
        domain: "linguistic-element",
        selection: "grapheme",
        classification: "carrier-type-element",
        subsystem: "graphological",
        analysisLevel: "type",
      },
      {
        candidateKind: "graph",
        semanticOwnerId: GRAPH_VARIANT_ANALYSIS_OWNER_ID,
        domain: "graph-variant-analysis",
        selection: "graph-definition",
        classification: "graph-variant-analysis",
        subsystem: "graphological",
        analysisLevel: "token",
      },
      {
        candidateKind: "sigeme",
        semanticOwnerId: SIGEME_CLASSIFICATION_OWNER_ID,
        domain: "linguistic-element",
        selection: "sigeme",
        classification: "carrier-type-element",
        subsystem: "sigological",
        analysisLevel: "type",
        exclusionReason:
          "sigeme-cannot-participate-in-meaningless-carrier-unit-family",
      },
      {
        candidateKind: "sememe",
        semanticOwnerId: SEMEME_CLASSIFICATION_OWNER_ID,
        domain: "linguistic-element",
        selection: "sememe",
        classification: "content-type-element",
        subsystem: "content",
        analysisLevel: "type",
        exclusionReason:
          "sememe-absent-from-meaningless-carrier-unit-family",
      },
    ];
    const definition = ownerIssued
      ? candidateDefinitions.find((candidate) =>
        candidate.semanticOwnerId === candidateResult.semanticOwnerId
        && candidate.domain === candidateResult.domain
        && candidate.selection === candidateResult.selection
        && (
          candidateResult.authorizationStatus !== "authorized"
          || candidate.classification === candidateResult.classification
        )) || null
      : null;
    const recognized = Boolean(definition);
    const excludedByMeaningConstraint = Boolean(
      definition?.exclusionReason,
    );
    const reason = !ownerIssued
      ? "owner-issued-carrier-candidate-result-required"
      : !routeRetained
        ? "carrier-candidate-live-prerequisite-route-required"
        : candidateResult.authorizationStatus !== "authorized"
          ? "authorized-carrier-candidate-result-required"
          : !recognized
            ? "meaningless-carrier-candidate-kind-unlicensed"
            : definition.exclusionReason || "";
    return deepFreeze({
      ownerIssued,
      routeRetained,
      recognized,
      admitted: reason === "",
      excludedByMeaningConstraint,
      reason,
      candidateKind: definition?.candidateKind || "",
      semanticOwnerId: candidateResult?.semanticOwnerId || "",
      operationId: executionEvidence?.evaluatedOperationId || "",
      domain: candidateResult?.domain || "",
      selection: candidateResult?.selection || "",
      classification: candidateResult?.classification || "",
      authorizationStatus: candidateResult?.authorizationStatus || "",
      subsystem: definition?.subsystem || "",
      analysisLevel: definition?.analysisLevel || "",
      executionEvidence,
    });
  }

  function buildClassicalMeaninglessCarrierUnitClassificationSource(
    request = {},
  ) {
    const requestFailure = inspectMeaninglessCarrierUnitRequest(request);
    const candidateResult = requestFailure ? null : request.candidateResult;
    const candidateAnalysis = analyzeMeaninglessCarrierCandidate(
      candidateResult,
    );
    const invalidReason = requestFailure || candidateAnalysis.reason;
    const source = deepFreeze({
      kind: MEANINGLESS_CARRIER_UNIT_SOURCE_KIND,
      version: MEANINGLESS_CARRIER_UNIT_VERSION,
      authorizationStatus: invalidReason ? "blocked" : "authorized",
      blockReason: invalidReason,
      candidateResult,
      familyLabelAuthority: false,
      storedCatalogAuthority: false,
      expectedMembershipAuthority: false,
      prerequisiteOwnerLabelAuthority: false,
      lessonMetadataAuthority: false,
      storedAnswerAuthority: false,
      surfaceStringAuthority: false,
      formulaStringAuthority: false,
      generationAllowed: false,
    });
    issuedMeaninglessCarrierUnitSources.add(source);
    meaninglessCarrierUnitSourceContexts.set(source, deepFreeze({
      requestFailure,
      candidateResult,
      candidateAnalysis,
    }));
    return source;
  }

  function isClassicalMeaninglessCarrierUnitClassificationSource(
    source = null,
  ) {
    const context = meaninglessCarrierUnitSourceContexts.get(source) || null;
    return Boolean(
      source
      && issuedMeaninglessCarrierUnitSources.has(source)
      && context
      && source.kind === MEANINGLESS_CARRIER_UNIT_SOURCE_KIND
      && source.version === MEANINGLESS_CARRIER_UNIT_VERSION
      && source.authorizationStatus === "authorized"
      && source.blockReason === ""
      && context.requestFailure === ""
      && context.candidateAnalysis?.admitted === true
      && context.candidateAnalysis.ownerIssued === true
      && context.candidateAnalysis.routeRetained === true
      && source.candidateResult === context.candidateResult
      && isClassicalGrammarConceptResult(source.candidateResult)
      && source.candidateResult.authorizationStatus === "authorized"
      && source.familyLabelAuthority === false
      && source.storedCatalogAuthority === false
      && source.expectedMembershipAuthority === false
      && source.prerequisiteOwnerLabelAuthority === false
      && source.lessonMetadataAuthority === false
      && source.storedAnswerAuthority === false
      && source.surfaceStringAuthority === false
      && source.formulaStringAuthority === false
      && source.generationAllowed === false
      && Object.isFrozen(source)
    );
  }

  function issueMeaninglessCarrierUnitResult({
    source = null,
    context = null,
    authorizationStatus = "blocked",
    blockReason = "",
  } = {}) {
    const authorized = authorizationStatus === "authorized";
    const analysis = authorized ? context?.candidateAnalysis || null : null;
    const result = deepFreeze({
      kind: MEANINGLESS_CARRIER_UNIT_RESULT_KIND,
      version: MEANINGLESS_CARRIER_UNIT_VERSION,
      authorizationStatus,
      blockReason,
      semanticOwnerId: MEANINGLESS_CARRIER_UNIT_OWNER_ID,
      operationId: MEANINGLESS_CARRIER_UNIT_OPERATION_ID,
      operationContract: meaninglessCarrierUnitOperationContract,
      classificationStatus: authorized
        ? "classified-meaningless-carrier-unit-member"
        : "meaningless-carrier-unit-membership-rejected",
      hierarchyFamily: authorized ? "meaningless" : "",
      candidateKind: authorized ? analysis.candidateKind : "",
      candidateSemanticOwnerId: authorized ? analysis.semanticOwnerId : "",
      candidateOperationId: authorized ? analysis.operationId : "",
      candidateDomain: authorized ? analysis.domain : "",
      candidateSelection: authorized ? analysis.selection : "",
      candidateClassification: authorized ? analysis.classification : "",
      subsystem: authorized ? analysis.subsystem : "",
      analysisLevel: authorized ? analysis.analysisLevel : "",
      familyIdentity: authorized
        ? `meaningless-carrier-unit:${analysis.candidateKind}`
        : "",
      familyConstituentKinds: authorized
        ? [...MEANINGLESS_CARRIER_UNIT_MEMBER_KINDS]
        : [],
      facts: authorized
        ? [
          "meaningless-structural-units-have-phoneme-phone-grapheme-or-graph-constituents",
          `${analysis.candidateKind}-is-a-meaningless-carrier-unit`,
          "sememes-are-absent-from-meaningless-carrier-unit-family",
          "sigemes-cannot-participate-in-meaningless-carrier-unit-family",
        ]
        : [],
      relations: authorized
        ? [
          `${analysis.candidateKind}-belongs-to-meaningless-carrier-unit-family`,
          `${analysis.semanticOwnerId}-remains-independent-prerequisite-owner`,
        ]
        : [],
      restrictions: [...MEANINGLESS_CARRIER_UNIT_RESTRICTIONS],
      meaninglessCarrierMembershipClassified: authorized,
      sememeExcluded: authorized,
      sigemeExcluded: authorized,
      prerequisiteRouteRetained: authorized,
      rankTaxonomyAuthorized: false,
      rankFormationAuthorized: false,
      higherRankUnitInventoryAuthorized: false,
      structuralPotentialAuthorized: false,
      syllableStructureAuthorized: false,
      vocableStructureAuthorized: false,
      unitConstructed: false,
      unitUpgraded: false,
      generationAllowed: false,
      soundedSurfaceGenerated: false,
      writtenSurfaceGenerated: false,
      formulaGenerated: false,
      familyLabelAuthority: false,
      storedCatalogAuthority: false,
      expectedMembershipAuthority: false,
      prerequisiteOwnerLabelAuthority: false,
      lessonMetadataAuthority: false,
      storedAnswerAuthority: false,
      surfaceStringAuthority: false,
      formulaStringAuthority: false,
    });
    issuedMeaninglessCarrierUnitResults.add(result);
    if (source && typeof source === "object") {
      meaninglessCarrierUnitResultSources.set(result, source);
    }
    meaninglessCarrierUnitResultExecutions.set(
      result,
      buildMeaninglessCarrierUnitExecutionEvidence({
        source,
        context,
        authorizationStatus,
        blockReason,
      }),
    );
    return result;
  }

  function evaluateClassicalMeaninglessCarrierUnitClassification(
    source = null,
  ) {
    if (!issuedMeaninglessCarrierUnitSources.has(source)) {
      return issueMeaninglessCarrierUnitResult({
        blockReason:
          "owner-issued-meaningless-carrier-unit-source-required",
      });
    }
    const context = meaninglessCarrierUnitSourceContexts.get(source) || null;
    const blockReason = source.blockReason
      || context?.requestFailure
      || context?.candidateAnalysis?.reason
      || "";
    if (
      blockReason
      || !isClassicalMeaninglessCarrierUnitClassificationSource(source)
    ) {
      return issueMeaninglessCarrierUnitResult({
        source,
        context,
        blockReason: blockReason
          || "authorized-meaningless-carrier-unit-source-required",
      });
    }
    return issueMeaninglessCarrierUnitResult({
      source,
      context,
      authorizationStatus: "authorized",
    });
  }

  function isClassicalMeaninglessCarrierUnitClassificationResult(
    result = null,
  ) {
    const source = meaninglessCarrierUnitResultSources.get(result) || null;
    const context = source
      ? meaninglessCarrierUnitSourceContexts.get(source) || null
      : null;
    const expectedReason = source
      ? source.blockReason
        || context?.requestFailure
        || context?.candidateAnalysis?.reason
        || ""
      : "owner-issued-meaningless-carrier-unit-source-required";
    const expectedAuthorized = Boolean(source && !expectedReason);
    const analysis = expectedAuthorized
      ? context?.candidateAnalysis || null
      : null;
    return Boolean(
      result
      && issuedMeaninglessCarrierUnitResults.has(result)
      && result.kind === MEANINGLESS_CARRIER_UNIT_RESULT_KIND
      && result.version === MEANINGLESS_CARRIER_UNIT_VERSION
      && result.semanticOwnerId === MEANINGLESS_CARRIER_UNIT_OWNER_ID
      && result.operationId === MEANINGLESS_CARRIER_UNIT_OPERATION_ID
      && meaninglessCarrierUnitOperationOwner.isContractIssued(
        result.operationContract,
      )
      && (
        expectedAuthorized
          ? result.authorizationStatus === "authorized"
            && result.blockReason === ""
            && result.classificationStatus
              === "classified-meaningless-carrier-unit-member"
            && result.hierarchyFamily === "meaningless"
            && result.candidateKind === analysis.candidateKind
            && result.candidateSemanticOwnerId === analysis.semanticOwnerId
            && result.candidateOperationId === analysis.operationId
            && result.candidateDomain === analysis.domain
            && result.candidateSelection === analysis.selection
            && result.candidateClassification === analysis.classification
            && result.subsystem === analysis.subsystem
            && result.analysisLevel === analysis.analysisLevel
            && result.familyIdentity
              === `meaningless-carrier-unit:${analysis.candidateKind}`
            && result.meaninglessCarrierMembershipClassified === true
            && result.sememeExcluded === true
            && result.sigemeExcluded === true
            && result.prerequisiteRouteRetained === true
          : result.authorizationStatus === "blocked"
            && result.blockReason === expectedReason
            && result.classificationStatus
              === "meaningless-carrier-unit-membership-rejected"
            && result.hierarchyFamily === ""
            && result.candidateKind === ""
            && result.familyIdentity === ""
            && result.meaninglessCarrierMembershipClassified === false
            && result.sememeExcluded === false
            && result.sigemeExcluded === false
            && result.prerequisiteRouteRetained === false
      )
      && result.rankTaxonomyAuthorized === false
      && result.rankFormationAuthorized === false
      && result.higherRankUnitInventoryAuthorized === false
      && result.structuralPotentialAuthorized === false
      && result.syllableStructureAuthorized === false
      && result.vocableStructureAuthorized === false
      && result.unitConstructed === false
      && result.unitUpgraded === false
      && result.generationAllowed === false
      && result.soundedSurfaceGenerated === false
      && result.writtenSurfaceGenerated === false
      && result.formulaGenerated === false
      && result.familyLabelAuthority === false
      && result.storedCatalogAuthority === false
      && result.expectedMembershipAuthority === false
      && result.prerequisiteOwnerLabelAuthority === false
      && result.lessonMetadataAuthority === false
      && result.storedAnswerAuthority === false
      && result.surfaceStringAuthority === false
      && result.formulaStringAuthority === false
      && Object.isFrozen(result)
      && Object.isFrozen(result.familyConstituentKinds)
      && Object.isFrozen(result.facts)
      && Object.isFrozen(result.relations)
      && Object.isFrozen(result.restrictions)
    );
  }

  function isClassicalMeaninglessCarrierUnitClassificationOperationContract(
    contract = null,
  ) {
    return meaninglessCarrierUnitOperationOwner.isContractIssued(contract);
  }

  function getClassicalMeaninglessCarrierUnitClassificationExecutionEvidence(
    result = null,
  ) {
    return meaninglessCarrierUnitResultExecutions.get(result) || null;
  }

  function isClassicalMeaninglessCarrierUnitClassificationExecutionEvidence(
    evidence = null,
    result = null,
  ) {
    const currentOperationSteps = evidence?.routeSteps?.filter(
      (step) => step.invocationRole !== "prerequisite"
        && step.executedRuleIds?.includes(
          MEANINGLESS_CARRIER_UNIT_OPERATION_ID,
        ),
    ) || [];
    const prerequisiteOwnerSteps = evidence?.routeSteps?.filter(
      (step) => step.invocationRole === "prerequisite"
        && step.executedRuleIds?.length > 0,
    ) || [];
    return Boolean(
      evidence
      && result
      && issuedMeaninglessCarrierUnitResults.has(result)
      && meaninglessCarrierUnitResultExecutions.get(result) === evidence
      && evidence.ownerId === MEANINGLESS_CARRIER_UNIT_OWNER_ID
      && evidence.evaluatedOperationId
        === MEANINGLESS_CARRIER_UNIT_OPERATION_ID
      && evidence.execution?.routeSteps === evidence.routeSteps
      && evidence.outcome?.status === evidence.execution?.status
      && evidence.outcome?.reason === evidence.execution?.reason
      && (
        result.authorizationStatus === "authorized"
          ? currentOperationSteps.length === 1
            && currentOperationSteps[0].stepId
              === "meaningless-carrier-family-membership-classified"
            && prerequisiteOwnerSteps.length >= 1
          : currentOperationSteps.length === 0
      )
      && Object.isFrozen(evidence)
    );
  }

  function analyzeMeaningfulMorphemeCandidate(candidateResult = null) {
    const conceptOwnerIssued = isClassicalGrammarConceptResult(
      candidateResult,
    );
    const carrierFamilyOwnerIssued =
      isClassicalMeaninglessCarrierUnitClassificationResult(
        candidateResult,
      );
    const carrierRankOwnerIssued = isClassicalCarrierRankTaxonomyResult(
      candidateResult,
    );
    const ownerIssued = conceptOwnerIssued
      || carrierFamilyOwnerIssued
      || carrierRankOwnerIssued;
    const executionEvidence = conceptOwnerIssued
      ? getClassicalGrammarConceptExecutionEvidence(candidateResult)
      : carrierFamilyOwnerIssued
        ? getClassicalMeaninglessCarrierUnitClassificationExecutionEvidence(
          candidateResult,
        )
        : carrierRankOwnerIssued
          ? getClassicalCarrierRankTaxonomyExecutionEvidence(candidateResult)
          : null;
    const routeRetained = conceptOwnerIssued
      ? isClassicalGrammarConceptExecutionEvidence(
        executionEvidence,
        candidateResult,
      )
      : carrierFamilyOwnerIssued
        ? isClassicalMeaninglessCarrierUnitClassificationExecutionEvidence(
          executionEvidence,
          candidateResult,
        )
        : carrierRankOwnerIssued
          ? isClassicalCarrierRankTaxonomyExecutionEvidence(
            executionEvidence,
            candidateResult,
          )
          : false;
    const candidateDefinitions = [
      {
        candidateKind: "morpheme",
        semanticOwnerId: MORPHEME_TAXONOMY_OWNER_ID,
        domain: "morpheme",
        selection: "morpheme",
        classification: "type-level-meaningful-unit",
        analysisLevel: "type",
      },
      {
        candidateKind: "morph",
        semanticOwnerId: MORPH_TOKEN_CLASSIFICATION_OWNER_ID,
        domain: "morpheme",
        selection: "morph",
        classification: "token-level-meaningful-unit",
        analysisLevel: "token",
      },
      {
        candidateKind: "sigeme",
        semanticOwnerId: SIGEME_CLASSIFICATION_OWNER_ID,
        domain: "linguistic-element",
        selection: "sigeme",
        classification: "carrier-type-element",
        analysisLevel: "type",
      },
      {
        candidateKind: "sememe",
        semanticOwnerId: SEMEME_CLASSIFICATION_OWNER_ID,
        domain: "linguistic-element",
        selection: "sememe",
        classification: "content-type-element",
        analysisLevel: "type",
      },
      {
        candidateKind: "phoneme",
        semanticOwnerId: PHONEME_CLASSIFICATION_OWNER_ID,
        domain: "linguistic-element",
        selection: "phoneme",
        classification: "carrier-type-element",
        analysisLevel: "type",
      },
      {
        candidateKind: "phone",
        semanticOwnerId: PHONE_REPERTORY_ANALYSIS_OWNER_ID,
        domain: "phone-repertory-analysis",
        selection: "phone-definition",
        classification: "phone-repertory-analysis",
        analysisLevel: "token",
      },
      {
        candidateKind: "grapheme",
        semanticOwnerId: GRAPHEME_CLASSIFICATION_OWNER_ID,
        domain: "linguistic-element",
        selection: "grapheme",
        classification: "carrier-type-element",
        analysisLevel: "type",
      },
      {
        candidateKind: "graph",
        semanticOwnerId: GRAPH_VARIANT_ANALYSIS_OWNER_ID,
        domain: "graph-variant-analysis",
        selection: "graph-definition",
        classification: "graph-variant-analysis",
        analysisLevel: "token",
      },
    ];
    const conceptDefinition = conceptOwnerIssued
      ? candidateDefinitions.find((candidate) =>
        candidate.semanticOwnerId === candidateResult.semanticOwnerId
        && candidate.domain === candidateResult.domain
        && candidate.selection === candidateResult.selection
        && (
          candidateResult.authorizationStatus !== "authorized"
          || candidate.classification === candidateResult.classification
        )) || null
      : null;
    const definition = conceptDefinition || (
      carrierFamilyOwnerIssued
        ? {
          candidateKind: "carrier-family",
          semanticOwnerId: MEANINGLESS_CARRIER_UNIT_OWNER_ID,
          domain: "carrier-family-classification",
          selection: candidateResult.candidateKind || "",
          classification: candidateResult.classificationStatus || "",
          analysisLevel: candidateResult.analysisLevel || "",
        }
        : carrierRankOwnerIssued
          ? {
            candidateKind: candidateResult.rankId === "syllable"
              ? "syllable-rank"
              : "carrier-rank",
            semanticOwnerId: CARRIER_RANK_TAXONOMY_OWNER_ID,
            domain: candidateResult.subsystem || "",
            selection: candidateResult.rankTier || "",
            classification: candidateResult.classificationStatus || "",
            analysisLevel: "rank",
          }
          : null
    );
    const recognized = Boolean(definition);
    const member = MEANINGFUL_MORPHEME_UNIT_MEMBER_KINDS.includes(
      definition?.candidateKind || "",
    );
    const reason = !ownerIssued
      ? "owner-issued-meaningful-candidate-result-required"
      : !routeRetained
        ? "meaningful-candidate-live-prerequisite-route-required"
        : candidateResult.authorizationStatus !== "authorized"
          ? "authorized-meaningful-candidate-result-required"
          : !recognized || !member
            ? "meaningful-morpheme-unit-candidate-kind-unlicensed"
            : "";
    return deepFreeze({
      ownerIssued,
      routeRetained,
      recognized,
      member,
      admitted: reason === "",
      reason,
      candidateKind: definition?.candidateKind || "",
      semanticOwnerId: candidateResult?.semanticOwnerId || "",
      operationId: executionEvidence?.evaluatedOperationId || "",
      domain: candidateResult?.domain || "",
      selection: candidateResult?.selection || "",
      classification: candidateResult?.classification || "",
      authorizationStatus: candidateResult?.authorizationStatus || "",
      analysisLevel: definition?.analysisLevel || "",
      executionEvidence,
    });
  }

  function buildClassicalMeaningfulMorphemeUnitClassificationSource(
    request = {},
  ) {
    const requestFailure = inspectMeaningfulMorphemeUnitRequest(request);
    const candidateResult = requestFailure ? null : request.candidateResult;
    const candidateAnalysis = analyzeMeaningfulMorphemeCandidate(
      candidateResult,
    );
    const invalidReason = requestFailure || candidateAnalysis.reason;
    const source = deepFreeze({
      kind: MEANINGFUL_MORPHEME_UNIT_SOURCE_KIND,
      version: MEANINGFUL_MORPHEME_UNIT_VERSION,
      authorizationStatus: invalidReason ? "blocked" : "authorized",
      blockReason: invalidReason,
      candidateResult,
      familyLabelAuthority: false,
      storedCatalogAuthority: false,
      expectedMembershipAuthority: false,
      prerequisiteOwnerLabelAuthority: false,
      notationAuthority: false,
      glossAuthority: false,
      lessonMetadataAuthority: false,
      storedAnswerAuthority: false,
      surfaceStringAuthority: false,
      formulaStringAuthority: false,
      generationAllowed: false,
    });
    issuedMeaningfulMorphemeUnitSources.add(source);
    meaningfulMorphemeUnitSourceContexts.set(source, deepFreeze({
      requestFailure,
      candidateResult,
      candidateAnalysis,
    }));
    return source;
  }

  function isClassicalMeaningfulMorphemeUnitClassificationSource(
    source = null,
  ) {
    const context = meaningfulMorphemeUnitSourceContexts.get(source) || null;
    return Boolean(
      source
      && issuedMeaningfulMorphemeUnitSources.has(source)
      && context
      && source.kind === MEANINGFUL_MORPHEME_UNIT_SOURCE_KIND
      && source.version === MEANINGFUL_MORPHEME_UNIT_VERSION
      && source.authorizationStatus === "authorized"
      && source.blockReason === ""
      && context.requestFailure === ""
      && context.candidateAnalysis?.admitted === true
      && context.candidateAnalysis.ownerIssued === true
      && context.candidateAnalysis.routeRetained === true
      && source.candidateResult === context.candidateResult
      && isClassicalGrammarConceptResult(source.candidateResult)
      && source.candidateResult.authorizationStatus === "authorized"
      && source.familyLabelAuthority === false
      && source.storedCatalogAuthority === false
      && source.expectedMembershipAuthority === false
      && source.prerequisiteOwnerLabelAuthority === false
      && source.notationAuthority === false
      && source.glossAuthority === false
      && source.lessonMetadataAuthority === false
      && source.storedAnswerAuthority === false
      && source.surfaceStringAuthority === false
      && source.formulaStringAuthority === false
      && source.generationAllowed === false
      && Object.isFrozen(source)
    );
  }

  function issueMeaningfulMorphemeUnitResult({
    source = null,
    context = null,
    authorizationStatus = "blocked",
    blockReason = "",
  } = {}) {
    const authorized = authorizationStatus === "authorized";
    const analysis = authorized ? context?.candidateAnalysis || null : null;
    const result = deepFreeze({
      kind: MEANINGFUL_MORPHEME_UNIT_RESULT_KIND,
      version: MEANINGFUL_MORPHEME_UNIT_VERSION,
      authorizationStatus,
      blockReason,
      semanticOwnerId: MEANINGFUL_MORPHEME_UNIT_OWNER_ID,
      operationId: MEANINGFUL_MORPHEME_UNIT_OPERATION_ID,
      operationContract: meaningfulMorphemeUnitOperationContract,
      classificationStatus: authorized
        ? "classified-meaningful-morpheme-unit-member"
        : "meaningful-morpheme-unit-membership-rejected",
      hierarchyFamily: authorized ? "meaningful" : "",
      candidateKind: authorized ? analysis.candidateKind : "",
      candidateSemanticOwnerId: authorized ? analysis.semanticOwnerId : "",
      candidateOperationId: authorized ? analysis.operationId : "",
      candidateDomain: authorized ? analysis.domain : "",
      candidateSelection: authorized ? analysis.selection : "",
      candidateClassification: authorized ? analysis.classification : "",
      analysisLevel: authorized ? analysis.analysisLevel : "",
      familyIdentity: authorized
        ? `meaningful-morpheme-unit:${analysis.candidateKind}`
        : "",
      familyConstituentKinds: authorized
        ? [...MEANINGFUL_MORPHEME_UNIT_MEMBER_KINDS]
        : [],
      facts: authorized
        ? [
          "meaningful-structural-units-have-morpheme-or-morph-constituents",
          `${analysis.candidateKind}-is-a-meaningful-structural-unit`,
        ]
        : [],
      relations: authorized
        ? [
          `${analysis.candidateKind}-belongs-to-meaningful-morpheme-unit-family`,
          `${analysis.semanticOwnerId}-remains-independent-prerequisite-owner`,
        ]
        : [],
      restrictions: [...MEANINGFUL_MORPHEME_UNIT_RESTRICTIONS],
      meaningfulMorphemeMembershipClassified: authorized,
      prerequisiteRouteRetained: authorized,
      morphemeSyllableContrastAuthorized: false,
      coterminalityAuthorized: false,
      syllableFormationAuthorized: false,
      rankConversionAuthorized: false,
      affixHierarchyAuthorized: false,
      unitConstructed: false,
      unitUpgraded: false,
      generationAllowed: false,
      soundedSurfaceGenerated: false,
      writtenSurfaceGenerated: false,
      formulaGenerated: false,
      familyLabelAuthority: false,
      storedCatalogAuthority: false,
      expectedMembershipAuthority: false,
      prerequisiteOwnerLabelAuthority: false,
      notationAuthority: false,
      glossAuthority: false,
      lessonMetadataAuthority: false,
      storedAnswerAuthority: false,
      surfaceStringAuthority: false,
      formulaStringAuthority: false,
    });
    issuedMeaningfulMorphemeUnitResults.add(result);
    if (source && typeof source === "object") {
      meaningfulMorphemeUnitResultSources.set(result, source);
    }
    meaningfulMorphemeUnitResultExecutions.set(
      result,
      buildMeaningfulMorphemeUnitExecutionEvidence({
        source,
        context,
        authorizationStatus,
        blockReason,
      }),
    );
    return result;
  }

  function evaluateClassicalMeaningfulMorphemeUnitClassification(
    source = null,
  ) {
    if (!issuedMeaningfulMorphemeUnitSources.has(source)) {
      return issueMeaningfulMorphemeUnitResult({
        blockReason:
          "owner-issued-meaningful-morpheme-unit-source-required",
      });
    }
    const context = meaningfulMorphemeUnitSourceContexts.get(source) || null;
    const blockReason = source.blockReason
      || context?.requestFailure
      || context?.candidateAnalysis?.reason
      || "";
    if (
      blockReason
      || !isClassicalMeaningfulMorphemeUnitClassificationSource(source)
    ) {
      return issueMeaningfulMorphemeUnitResult({
        source,
        context,
        blockReason: blockReason
          || "authorized-meaningful-morpheme-unit-source-required",
      });
    }
    return issueMeaningfulMorphemeUnitResult({
      source,
      context,
      authorizationStatus: "authorized",
    });
  }

  function isClassicalMeaningfulMorphemeUnitClassificationResult(
    result = null,
  ) {
    const source = meaningfulMorphemeUnitResultSources.get(result) || null;
    const context = source
      ? meaningfulMorphemeUnitSourceContexts.get(source) || null
      : null;
    const expectedReason = source
      ? source.blockReason
        || context?.requestFailure
        || context?.candidateAnalysis?.reason
        || ""
      : "owner-issued-meaningful-morpheme-unit-source-required";
    const expectedAuthorized = Boolean(source && !expectedReason);
    const analysis = expectedAuthorized
      ? context?.candidateAnalysis || null
      : null;
    return Boolean(
      result
      && issuedMeaningfulMorphemeUnitResults.has(result)
      && result.kind === MEANINGFUL_MORPHEME_UNIT_RESULT_KIND
      && result.version === MEANINGFUL_MORPHEME_UNIT_VERSION
      && result.semanticOwnerId === MEANINGFUL_MORPHEME_UNIT_OWNER_ID
      && result.operationId === MEANINGFUL_MORPHEME_UNIT_OPERATION_ID
      && meaningfulMorphemeUnitOperationOwner.isContractIssued(
        result.operationContract,
      )
      && (
        expectedAuthorized
          ? result.authorizationStatus === "authorized"
            && result.blockReason === ""
            && result.classificationStatus
              === "classified-meaningful-morpheme-unit-member"
            && result.hierarchyFamily === "meaningful"
            && result.candidateKind === analysis.candidateKind
            && result.candidateSemanticOwnerId === analysis.semanticOwnerId
            && result.candidateOperationId === analysis.operationId
            && result.candidateDomain === analysis.domain
            && result.candidateSelection === analysis.selection
            && result.candidateClassification === analysis.classification
            && result.analysisLevel === analysis.analysisLevel
            && result.familyIdentity
              === `meaningful-morpheme-unit:${analysis.candidateKind}`
            && result.meaningfulMorphemeMembershipClassified === true
            && result.prerequisiteRouteRetained === true
          : result.authorizationStatus === "blocked"
            && result.blockReason === expectedReason
            && result.classificationStatus
              === "meaningful-morpheme-unit-membership-rejected"
            && result.hierarchyFamily === ""
            && result.candidateKind === ""
            && result.candidateSemanticOwnerId === ""
            && result.candidateOperationId === ""
            && result.candidateDomain === ""
            && result.candidateSelection === ""
            && result.candidateClassification === ""
            && result.analysisLevel === ""
            && result.familyIdentity === ""
            && result.meaningfulMorphemeMembershipClassified === false
            && result.prerequisiteRouteRetained === false
      )
      && result.familyConstituentKinds.length === (expectedAuthorized ? 2 : 0)
      && result.morphemeSyllableContrastAuthorized === false
      && result.coterminalityAuthorized === false
      && result.syllableFormationAuthorized === false
      && result.rankConversionAuthorized === false
      && result.affixHierarchyAuthorized === false
      && result.unitConstructed === false
      && result.unitUpgraded === false
      && result.generationAllowed === false
      && result.soundedSurfaceGenerated === false
      && result.writtenSurfaceGenerated === false
      && result.formulaGenerated === false
      && result.familyLabelAuthority === false
      && result.storedCatalogAuthority === false
      && result.expectedMembershipAuthority === false
      && result.prerequisiteOwnerLabelAuthority === false
      && result.notationAuthority === false
      && result.glossAuthority === false
      && result.lessonMetadataAuthority === false
      && result.storedAnswerAuthority === false
      && result.surfaceStringAuthority === false
      && result.formulaStringAuthority === false
      && Object.isFrozen(result)
      && Object.isFrozen(result.familyConstituentKinds)
      && Object.isFrozen(result.facts)
      && Object.isFrozen(result.relations)
      && Object.isFrozen(result.restrictions)
    );
  }

  function isClassicalMeaningfulMorphemeUnitClassificationOperationContract(
    contract = null,
  ) {
    return meaningfulMorphemeUnitOperationOwner.isContractIssued(contract);
  }

  function getClassicalMeaningfulMorphemeUnitClassificationExecutionEvidence(
    result = null,
  ) {
    return meaningfulMorphemeUnitResultExecutions.get(result) || null;
  }

  function isClassicalMeaningfulMorphemeUnitClassificationExecutionEvidence(
    evidence = null,
    result = null,
  ) {
    const currentOperationSteps = evidence?.routeSteps?.filter(
      (step) => step.invocationRole !== "prerequisite"
        && step.executedRuleIds?.includes(
          MEANINGFUL_MORPHEME_UNIT_OPERATION_ID,
        ),
    ) || [];
    const prerequisiteOwnerSteps = evidence?.routeSteps?.filter(
      (step) => step.invocationRole === "prerequisite"
        && step.executedRuleIds?.length > 0,
    ) || [];
    return Boolean(
      evidence
      && result
      && issuedMeaningfulMorphemeUnitResults.has(result)
      && meaningfulMorphemeUnitResultExecutions.get(result) === evidence
      && evidence.ownerId === MEANINGFUL_MORPHEME_UNIT_OWNER_ID
      && evidence.evaluatedOperationId
        === MEANINGFUL_MORPHEME_UNIT_OPERATION_ID
      && evidence.execution?.routeSteps === evidence.routeSteps
      && evidence.outcome?.status === evidence.execution?.status
      && evidence.outcome?.reason === evidence.execution?.reason
      && (
        result.authorizationStatus === "authorized"
          ? currentOperationSteps.length === 1
            && currentOperationSteps[0].stepId
              === "meaningful-morpheme-family-membership-classified"
            && prerequisiteOwnerSteps.length >= 1
          : currentOperationSteps.length === 0
      )
      && Object.isFrozen(evidence)
    );
  }

  function analyzeMorphemeSyllableMeaningfulUnitResult(result = null) {
    const ownerIssued = isClassicalMeaningfulMorphemeUnitClassificationResult(
      result,
    );
    const executionEvidence = ownerIssued
      ? getClassicalMeaningfulMorphemeUnitClassificationExecutionEvidence(
        result,
      )
      : null;
    const routeRetained = ownerIssued
      && isClassicalMeaningfulMorphemeUnitClassificationExecutionEvidence(
        executionEvidence,
        result,
      );
    const authorized = ownerIssued
      && result.authorizationStatus === "authorized";
    const admitted = authorized
      && result.hierarchyFamily === "meaningful"
      && MEANINGFUL_MORPHEME_UNIT_MEMBER_KINDS.includes(
        result.candidateKind,
      );
    const reason = !ownerIssued
      ? "owner-issued-meaningful-unit-result-required"
      : !routeRetained
        ? "meaningful-unit-live-prerequisite-route-required"
        : !authorized
          ? "authorized-meaningful-unit-result-required"
          : !admitted
            ? "authorized-meaningful-morpheme-or-morph-result-required"
            : "";
    return deepFreeze({
      ownerIssued,
      routeRetained,
      authorized,
      admitted,
      reason,
      candidateKind: result?.candidateKind || "",
      hierarchyFamily: result?.hierarchyFamily || "",
      familyIdentity: result?.familyIdentity || "",
      semanticOwnerId: result?.semanticOwnerId || "",
      operationId: result?.operationId || "",
      authorizationStatus: result?.authorizationStatus || "",
      executionEvidence,
    });
  }

  function analyzeMorphemeSyllableRankResult(result = null) {
    const ownerIssued = isClassicalCarrierRankTaxonomyResult(result);
    const executionEvidence = ownerIssued
      ? getClassicalCarrierRankTaxonomyExecutionEvidence(result)
      : null;
    const routeRetained = ownerIssued
      && isClassicalCarrierRankTaxonomyExecutionEvidence(
        executionEvidence,
        result,
      );
    const authorized = ownerIssued
      && result.authorizationStatus === "authorized";
    const admitted = authorized
      && result.hierarchyFamily === "meaningless"
      && result.subsystem === "phonological"
      && result.rankTier === "syllable"
      && result.rankId === "syllable";
    const reason = !ownerIssued
      ? "owner-issued-syllable-rank-result-required"
      : !routeRetained
        ? "syllable-rank-live-prerequisite-route-required"
        : !authorized
          ? "authorized-syllable-rank-result-required"
          : !admitted
            ? "exact-phonological-syllable-rank-result-required"
            : "";
    return deepFreeze({
      ownerIssued,
      routeRetained,
      authorized,
      admitted,
      reason,
      hierarchyFamily: result?.hierarchyFamily || "",
      subsystem: result?.subsystem || "",
      rankTier: result?.rankTier || "",
      rankId: result?.rankId || "",
      rankIdentity: result?.rankIdentity || "",
      semanticOwnerId: result?.semanticOwnerId || "",
      operationId: result?.operationId || "",
      authorizationStatus: result?.authorizationStatus || "",
      executionEvidence,
    });
  }

  function buildClassicalMorphemeSyllableSeparationSource(request = {}) {
    const requestFailure = inspectMorphemeSyllableSeparationRequest(request);
    const meaningfulUnitResult = requestFailure
      ? null
      : request.meaningfulUnitResult || null;
    const syllableRankResult = requestFailure
      ? null
      : request.syllableRankResult || null;
    const requestedAnalysisKind = requestFailure
      ? ""
      : String(request.requestedAnalysisKind || "");
    const meaningfulAnalysis =
      analyzeMorphemeSyllableMeaningfulUnitResult(meaningfulUnitResult);
    const rankAnalysis = analyzeMorphemeSyllableRankResult(
      syllableRankResult,
    );
    const analysisKindValid = MORPHEME_SYLLABLE_ANALYSIS_KINDS.includes(
      requestedAnalysisKind,
    );
    const invalidReason = requestFailure
      || meaningfulAnalysis.reason
      || rankAnalysis.reason
      || (!analysisKindValid
        ? "morpheme-syllable-analysis-kind-required"
        : "");
    const source = deepFreeze({
      kind: MORPHEME_SYLLABLE_SEPARATION_SOURCE_KIND,
      version: MORPHEME_SYLLABLE_SEPARATION_VERSION,
      authorizationStatus: invalidReason ? "blocked" : "authorized",
      blockReason: invalidReason,
      meaningfulUnitResult,
      syllableRankResult,
      requestedAnalysisKind,
      rankLabelAuthority: false,
      meaningfulUnitLabelAuthority: false,
      storedContrastAuthority: false,
      syllabicShapeAuthority: false,
      exampleAuthority: false,
      lessonMetadataAuthority: false,
      storedAnswerAuthority: false,
      surfaceStringAuthority: false,
      formulaStringAuthority: false,
      generationAllowed: false,
    });
    issuedMorphemeSyllableSeparationSources.add(source);
    morphemeSyllableSeparationSourceContexts.set(source, deepFreeze({
      requestFailure,
      meaningfulUnitResult,
      syllableRankResult,
      requestedAnalysisKind,
      meaningfulAnalysis,
      rankAnalysis,
      analysisKindValid,
    }));
    return source;
  }

  function isClassicalMorphemeSyllableSeparationSource(source = null) {
    const context = morphemeSyllableSeparationSourceContexts.get(source)
      || null;
    return Boolean(
      source
      && issuedMorphemeSyllableSeparationSources.has(source)
      && context
      && source.kind === MORPHEME_SYLLABLE_SEPARATION_SOURCE_KIND
      && source.version === MORPHEME_SYLLABLE_SEPARATION_VERSION
      && source.authorizationStatus === "authorized"
      && source.blockReason === ""
      && context.requestFailure === ""
      && context.meaningfulAnalysis?.admitted === true
      && context.meaningfulAnalysis?.routeRetained === true
      && context.rankAnalysis?.admitted === true
      && context.rankAnalysis?.routeRetained === true
      && context.analysisKindValid === true
      && source.meaningfulUnitResult === context.meaningfulUnitResult
      && source.syllableRankResult === context.syllableRankResult
      && source.requestedAnalysisKind === context.requestedAnalysisKind
      && source.rankLabelAuthority === false
      && source.meaningfulUnitLabelAuthority === false
      && source.storedContrastAuthority === false
      && source.syllabicShapeAuthority === false
      && source.exampleAuthority === false
      && source.lessonMetadataAuthority === false
      && source.storedAnswerAuthority === false
      && source.surfaceStringAuthority === false
      && source.formulaStringAuthority === false
      && source.generationAllowed === false
      && Object.isFrozen(source)
    );
  }

  function issueMorphemeSyllableSeparationResult({
    source = null,
    context = null,
    authorizationStatus = "blocked",
    blockReason = "",
  } = {}) {
    const authorized = authorizationStatus === "authorized";
    const analysisKind = authorized ? context.requestedAnalysisKind : "";
    const coterminality = analysisKind === "coterminality-permission";
    const facts = authorized ? [...getMorphemeSyllableFacts(analysisKind)] : [];
    const result = deepFreeze({
      kind: MORPHEME_SYLLABLE_SEPARATION_RESULT_KIND,
      version: MORPHEME_SYLLABLE_SEPARATION_VERSION,
      authorizationStatus,
      blockReason,
      semanticOwnerId: MORPHEME_SYLLABLE_SEPARATION_OWNER_ID,
      operationId: MORPHEME_SYLLABLE_SEPARATION_OPERATION_ID,
      operationContract: morphemeSyllableSeparationOperationContract,
      classificationStatus: authorized
        ? getMorphemeSyllableClassificationStatus(analysisKind)
        : "morpheme-syllable-separation-rejected",
      analysisKind,
      meaningfulCandidateKind: authorized
        ? context.meaningfulAnalysis.candidateKind
        : "",
      meaningfulFamilyIdentity: authorized
        ? context.meaningfulAnalysis.familyIdentity
        : "",
      meaningfulSemanticOwnerId: authorized
        ? context.meaningfulAnalysis.semanticOwnerId
        : "",
      meaningfulOperationId: authorized
        ? context.meaningfulAnalysis.operationId
        : "",
      syllableRankIdentity: authorized
        ? context.rankAnalysis.rankIdentity
        : "",
      syllableRankSemanticOwnerId: authorized
        ? context.rankAnalysis.semanticOwnerId
        : "",
      syllableRankOperationId: authorized
        ? context.rankAnalysis.operationId
        : "",
      rankRelation: authorized ? "distinct-ranks" : "",
      coterminalityStatus: authorized
        ? coterminality
          ? "permitted-without-rank-merger"
          : "not-evaluated-by-rank-contrast"
        : "",
      facts,
      relations: authorized
        ? [
          "meaningful-morpheme-or-morph-and-meaningless-syllable-remain-distinct",
          "meaningful-unit-and-carrier-rank-prerequisite-owners-remain-independent",
        ]
        : [],
      restrictions: [...MORPHEME_SYLLABLE_SEPARATION_RESTRICTIONS],
      rankSeparationValidated: authorized,
      coterminalityPermitted: authorized && coterminality,
      unitConstructed: false,
      unitSegmented: false,
      boundaryRewritten: false,
      generationAllowed: false,
      soundedSurfaceGenerated: false,
      writtenSurfaceGenerated: false,
      formulaGenerated: false,
      rankLabelAuthority: false,
      meaningfulUnitLabelAuthority: false,
      storedContrastAuthority: false,
      syllabicShapeAuthority: false,
      exampleAuthority: false,
      lessonMetadataAuthority: false,
      storedAnswerAuthority: false,
      surfaceStringAuthority: false,
      formulaStringAuthority: false,
    });
    issuedMorphemeSyllableSeparationResults.add(result);
    if (source && typeof source === "object") {
      morphemeSyllableSeparationResultSources.set(result, source);
    }
    morphemeSyllableSeparationResultExecutions.set(
      result,
      buildMorphemeSyllableSeparationExecutionEvidence({
        source,
        context,
        authorizationStatus,
        blockReason,
      }),
    );
    return result;
  }

  function evaluateClassicalMorphemeSyllableSeparation(source = null) {
    if (!issuedMorphemeSyllableSeparationSources.has(source)) {
      return issueMorphemeSyllableSeparationResult({
        blockReason:
          "owner-issued-morpheme-syllable-separation-source-required",
      });
    }
    const context = morphemeSyllableSeparationSourceContexts.get(source)
      || null;
    const blockReason = source.blockReason
      || context?.requestFailure
      || context?.meaningfulAnalysis?.reason
      || context?.rankAnalysis?.reason
      || (context?.analysisKindValid !== true
        ? "morpheme-syllable-analysis-kind-required"
        : "");
    if (
      blockReason
      || !isClassicalMorphemeSyllableSeparationSource(source)
    ) {
      return issueMorphemeSyllableSeparationResult({
        source,
        context,
        blockReason: blockReason
          || "authorized-morpheme-syllable-separation-source-required",
      });
    }
    return issueMorphemeSyllableSeparationResult({
      source,
      context,
      authorizationStatus: "authorized",
    });
  }

  function isClassicalMorphemeSyllableSeparationResult(result = null) {
    const source = morphemeSyllableSeparationResultSources.get(result) || null;
    const context = source
      ? morphemeSyllableSeparationSourceContexts.get(source) || null
      : null;
    const expectedReason = source
      ? source.blockReason
        || context?.requestFailure
        || context?.meaningfulAnalysis?.reason
        || context?.rankAnalysis?.reason
        || (context?.analysisKindValid !== true
          ? "morpheme-syllable-analysis-kind-required"
          : "")
      : "owner-issued-morpheme-syllable-separation-source-required";
    const expectedAuthorized = Boolean(source && !expectedReason);
    const expectedKind = expectedAuthorized
      ? context.requestedAnalysisKind
      : "";
    const expectedCoterminality =
      expectedKind === "coterminality-permission";
    const expectedFacts = expectedAuthorized
      ? getMorphemeSyllableFacts(expectedKind)
      : [];
    return Boolean(
      result
      && issuedMorphemeSyllableSeparationResults.has(result)
      && result.kind === MORPHEME_SYLLABLE_SEPARATION_RESULT_KIND
      && result.version === MORPHEME_SYLLABLE_SEPARATION_VERSION
      && result.semanticOwnerId === MORPHEME_SYLLABLE_SEPARATION_OWNER_ID
      && result.operationId === MORPHEME_SYLLABLE_SEPARATION_OPERATION_ID
      && morphemeSyllableSeparationOperationOwner.isContractIssued(
        result.operationContract,
      )
      && (
        expectedAuthorized
          ? result.authorizationStatus === "authorized"
            && result.blockReason === ""
            && result.classificationStatus
              === getMorphemeSyllableClassificationStatus(expectedKind)
            && result.analysisKind === expectedKind
            && result.meaningfulCandidateKind
              === context.meaningfulAnalysis.candidateKind
            && result.meaningfulFamilyIdentity
              === context.meaningfulAnalysis.familyIdentity
            && result.meaningfulSemanticOwnerId
              === context.meaningfulAnalysis.semanticOwnerId
            && result.meaningfulOperationId
              === context.meaningfulAnalysis.operationId
            && result.syllableRankIdentity
              === context.rankAnalysis.rankIdentity
            && result.syllableRankSemanticOwnerId
              === context.rankAnalysis.semanticOwnerId
            && result.syllableRankOperationId
              === context.rankAnalysis.operationId
            && result.rankRelation === "distinct-ranks"
            && result.coterminalityStatus === (
              expectedCoterminality
                ? "permitted-without-rank-merger"
                : "not-evaluated-by-rank-contrast"
            )
            && result.rankSeparationValidated === true
            && result.coterminalityPermitted === expectedCoterminality
          : result.authorizationStatus === "blocked"
            && result.blockReason === expectedReason
            && result.classificationStatus
              === "morpheme-syllable-separation-rejected"
            && result.analysisKind === ""
            && result.meaningfulCandidateKind === ""
            && result.meaningfulFamilyIdentity === ""
            && result.meaningfulSemanticOwnerId === ""
            && result.meaningfulOperationId === ""
            && result.syllableRankIdentity === ""
            && result.syllableRankSemanticOwnerId === ""
            && result.syllableRankOperationId === ""
            && result.rankRelation === ""
            && result.coterminalityStatus === ""
            && result.rankSeparationValidated === false
            && result.coterminalityPermitted === false
      )
      && result.facts.length === expectedFacts.length
      && result.facts.every((fact, index) => fact === expectedFacts[index])
      && result.relations.length === (expectedAuthorized ? 2 : 0)
      && result.unitConstructed === false
      && result.unitSegmented === false
      && result.boundaryRewritten === false
      && result.generationAllowed === false
      && result.soundedSurfaceGenerated === false
      && result.writtenSurfaceGenerated === false
      && result.formulaGenerated === false
      && result.rankLabelAuthority === false
      && result.meaningfulUnitLabelAuthority === false
      && result.storedContrastAuthority === false
      && result.syllabicShapeAuthority === false
      && result.exampleAuthority === false
      && result.lessonMetadataAuthority === false
      && result.storedAnswerAuthority === false
      && result.surfaceStringAuthority === false
      && result.formulaStringAuthority === false
      && Object.isFrozen(result)
      && Object.isFrozen(result.facts)
      && Object.isFrozen(result.relations)
      && Object.isFrozen(result.restrictions)
    );
  }

  function isClassicalMorphemeSyllableSeparationOperationContract(
    contract = null,
  ) {
    return morphemeSyllableSeparationOperationOwner.isContractIssued(contract);
  }

  function getClassicalMorphemeSyllableSeparationExecutionEvidence(
    result = null,
  ) {
    return morphemeSyllableSeparationResultExecutions.get(result) || null;
  }

  function isClassicalMorphemeSyllableSeparationExecutionEvidence(
    evidence = null,
    result = null,
  ) {
    const currentOperationSteps = evidence?.routeSteps?.filter(
      (step) => step.invocationRole !== "prerequisite"
        && step.executedRuleIds?.includes(
          MORPHEME_SYLLABLE_SEPARATION_OPERATION_ID,
        ),
    ) || [];
    const meaningfulPrerequisiteSteps = evidence?.routeSteps?.filter(
      (step) => step.invocationRole === "prerequisite"
        && step.stepId?.startsWith("meaningful-unit-result.")
        && step.executedRuleIds?.length > 0,
    ) || [];
    const rankPrerequisiteSteps = evidence?.routeSteps?.filter(
      (step) => step.invocationRole === "prerequisite"
        && step.stepId?.startsWith("syllable-rank-result.")
        && step.executedRuleIds?.length > 0,
    ) || [];
    const expectedStepId = getMorphemeSyllableExecutionStepId(
      result?.analysisKind,
    );
    return Boolean(
      evidence
      && result
      && issuedMorphemeSyllableSeparationResults.has(result)
      && morphemeSyllableSeparationResultExecutions.get(result) === evidence
      && evidence.ownerId === MORPHEME_SYLLABLE_SEPARATION_OWNER_ID
      && evidence.evaluatedOperationId
        === MORPHEME_SYLLABLE_SEPARATION_OPERATION_ID
      && evidence.execution?.routeSteps === evidence.routeSteps
      && evidence.outcome?.status === evidence.execution?.status
      && evidence.outcome?.reason === evidence.execution?.reason
      && (
        result.authorizationStatus === "authorized"
          ? currentOperationSteps.length === 1
            && currentOperationSteps[0].stepId === expectedStepId
            && meaningfulPrerequisiteSteps.length >= 2
            && rankPrerequisiteSteps.length >= 1
          : currentOperationSteps.length === 0
      )
      && Object.isFrozen(evidence)
    );
  }

  function isOwnerIssuedDiscontinuousUnitNuclearClauseResult(value = null) {
    return Boolean(
      value
      && typeof targetObject?.isClassicalNahuatlOrdinaryNncResult === "function"
      && targetObject.isClassicalNahuatlOrdinaryNncResult(value) === true
    );
  }

  function buildClassicalDiscontinuousUnitAdmissibilitySource(request = {}) {
    const requestFailure = inspectDiscontinuousUnitAdmissibilityRequest(request);
    const canonicalNuclearClauseResult = requestFailure
      ? null
      : request.canonicalNuclearClauseResult || null;
    const canonicalResultAuthorized = Boolean(
      !requestFailure
      && isOwnerIssuedDiscontinuousUnitNuclearClauseResult(
        canonicalNuclearClauseResult,
      ),
    );
    const invalidReason = requestFailure
      || (!canonicalNuclearClauseResult
        ? "discontinuous-unit-admissibility-canonical-nuclear-clause-result-required"
        : "")
      || (!canonicalResultAuthorized
        ? "owner-issued-canonical-nuclear-clause-result-required"
        : "");
    const source = deepFreeze({
      kind: DISCONTINUOUS_UNIT_ADMISSIBILITY_SOURCE_KIND,
      version: DISCONTINUOUS_UNIT_ADMISSIBILITY_VERSION,
      authorizationStatus: invalidReason ? "blocked" : "authorized",
      blockReason: invalidReason,
      canonicalNuclearClauseResult,
      requestedUnitKindAuthority: false,
      discontinuityLabelAuthority: false,
      cohesionLabelAuthority: false,
      formulaStringAuthority: false,
      diagrammaticProjectionAuthority: false,
      exampleAuthority: false,
      lessonMetadataAuthority: false,
      storedAnswerAuthority: false,
      surfaceStringAuthority: false,
      generationAllowed: false,
    });
    if (!invalidReason) {
      issuedDiscontinuousUnitSources.add(source);
    }
    return source;
  }

  function isClassicalDiscontinuousUnitAdmissibilitySource(source = null) {
    return Boolean(
      source
      && issuedDiscontinuousUnitSources.has(source)
      && source.kind === DISCONTINUOUS_UNIT_ADMISSIBILITY_SOURCE_KIND
      && source.version === DISCONTINUOUS_UNIT_ADMISSIBILITY_VERSION
      && source.authorizationStatus === "authorized"
      && source.blockReason === ""
      && isOwnerIssuedDiscontinuousUnitNuclearClauseResult(
        source.canonicalNuclearClauseResult,
      )
      && source.requestedUnitKindAuthority === false
      && source.discontinuityLabelAuthority === false
      && source.cohesionLabelAuthority === false
      && source.formulaStringAuthority === false
      && source.diagrammaticProjectionAuthority === false
      && source.exampleAuthority === false
      && source.lessonMetadataAuthority === false
      && source.storedAnswerAuthority === false
      && source.surfaceStringAuthority === false
      && source.generationAllowed === false
      && Object.isFrozen(source)
    );
  }

  function analyzeDiscontinuousUnitSource(source = null) {
    const canonicalResult = source?.canonicalNuclearClauseResult || null;
    const canonicalResultAuthorized =
      isOwnerIssuedDiscontinuousUnitNuclearClauseResult(canonicalResult);
    const typedFrame = canonicalResultAuthorized
      ? canonicalResult.typedSlotFrame || null
      : null;
    const typedFrameAuthorized = Boolean(
      typedFrame
      && typeof targetObject?.isClassicalNahuatlNncSlotFrame === "function"
      && targetObject.isClassicalNahuatlNncSlotFrame(typedFrame) === true,
    );
    const subject = typedFrameAuthorized ? typedFrame.slots?.subject || {} : {};
    const number = typedFrameAuthorized ? typedFrame.slots?.number || {} : {};
    const predicate = typedFrameAuthorized
      ? typedFrame.slots?.predicate || {}
      : {};
    const slotOrder = typedFrameAuthorized && Array.isArray(typedFrame.slotOrder)
      ? typedFrame.slotOrder
      : [];
    const personSlotIndex = Math.max(
      slotOrder.indexOf("pers1"),
      slotOrder.indexOf("pers2"),
    );
    const predicateSlotIndex = slotOrder.indexOf("stem");
    const numberSlotIndexes = [
      slotOrder.indexOf("num1"),
      slotOrder.indexOf("num2"),
    ];
    const numberSlotIndex = numberSlotIndexes.every((index) => index >= 0)
      ? Math.min(...numberSlotIndexes)
      : -1;
    const subjectConstituentsComplete = Boolean(
      typedFrameAuthorized
      && subject.pers1
      && subject.pers2
      && number.num1
      && number.num2,
    );
    const nonjuxtaposedTopology = Boolean(
      subjectConstituentsComplete
      && predicate.stem
      && personSlotIndex >= 0
      && predicateSlotIndex > personSlotIndex
      && numberSlotIndex > predicateSlotIndex,
    );
    const subjectCohesionAuthorized = Boolean(
      nonjuxtaposedTopology
      && number.belongsTo === "subject-personal-pronoun",
    );
    return deepFreeze({
      canonicalResultAuthorized,
      typedFrameAuthorized,
      subjectConstituentsComplete,
      nonjuxtaposedTopology,
      subjectCohesionAuthorized,
      personPosition: subjectConstituentsComplete
        ? `${subject.pers1}-${subject.pers2}`
        : "",
      numberPosition: subjectConstituentsComplete
        ? `${number.num1}-${number.num2}`
        : "",
      predicateStem: predicate.stem || "",
      personSlotIndex,
      predicateSlotIndex,
      numberSlotIndex,
      numberBelongsTo: number.belongsTo || "",
    });
  }

  function discontinuousUnitAdmissibilityFailure(analysis = null) {
    if (analysis?.canonicalResultAuthorized !== true) {
      return "owner-issued-canonical-nuclear-clause-result-required";
    }
    if (analysis.subjectConstituentsComplete !== true) {
      return "complete-subject-person-and-number-constituents-required";
    }
    if (analysis.nonjuxtaposedTopology !== true) {
      return "nonjuxtaposed-subject-person-number-topology-required";
    }
    if (analysis.subjectCohesionAuthorized !== true) {
      return "owner-issued-subject-functional-cohesion-required";
    }
    return "";
  }

  function issueDiscontinuousUnitAdmissibilityResult({
    source = null,
    analysis = null,
    authorizationStatus = "blocked",
    blockReason = "",
  } = {}) {
    const authorized = authorizationStatus === "authorized";
    const result = deepFreeze({
      kind: DISCONTINUOUS_UNIT_ADMISSIBILITY_RESULT_KIND,
      version: DISCONTINUOUS_UNIT_ADMISSIBILITY_VERSION,
      authorizationStatus,
      blockReason,
      semanticOwnerId: DISCONTINUOUS_UNIT_ADMISSIBILITY_OWNER_ID,
      operationId: DISCONTINUOUS_UNIT_ADMISSIBILITY_OPERATION_ID,
      operationContract: discontinuousUnitOperationContract,
      unitKind: authorized ? DISCONTINUOUS_UNIT_KIND : "",
      constituentRoles: authorized
        ? ["subject-person", "subject-number"]
        : [],
      topology: authorized ? "non-juxtaposed" : "",
      interveningConstituentRole: authorized ? "predicate" : "",
      validationScope: authorized ? "specific-typed-unit-kind" : "",
      admissibilityStatus: authorized
        ? "admissible-specific-typed-complex-unit"
        : "admissibility-rejected",
      sourceResultKind: authorized
        ? source.canonicalNuclearClauseResult.kind
        : "",
      sourceTypedFrameSemanticIdentity: authorized
        ? source.canonicalNuclearClauseResult.typedSlotFrame.semanticIdentity
        : "",
      facts: authorized
        ? [
          "subject-person-and-number-are-distinct-constituents",
          "predicate-intervenes-between-subject-person-and-number",
          "separated-person-and-number-belong-to-one-subject-function",
          "specific-complex-unit-kind-admits-nonjuxtaposed-constituents",
        ]
        : [],
      relations: authorized
        ? ["subject-person-plus-subject-number-form-one-discontinuous-unit"]
        : [],
      restrictions: [...DISCONTINUOUS_UNIT_ADMISSIBILITY_RESTRICTIONS],
      admissibilityValidated: authorized,
      universalDiscontinuityAuthorized: false,
      arbitraryGapAuthorized: false,
      arrangementGenerated: false,
      generationAllowed: false,
      soundedSurfaceGenerated: false,
      writtenSurfaceGenerated: false,
      formulaGenerated: false,
      formulaStringAuthority: false,
      diagrammaticProjectionAuthority: false,
      discontinuityLabelAuthority: false,
      cohesionLabelAuthority: false,
      lessonMetadataAuthority: false,
      storedAnswerAuthority: false,
      exampleAuthority: false,
    });
    issuedDiscontinuousUnitResults.add(result);
    if (source && typeof source === "object") {
      discontinuousUnitResultSources.set(result, source);
    }
    discontinuousUnitResultExecutions.set(
      result,
      buildDiscontinuousUnitAdmissibilityExecutionEvidence({
        source,
        analysis,
        authorizationStatus,
        blockReason,
      }),
    );
    return result;
  }

  function evaluateClassicalDiscontinuousUnitAdmissibility(source = null) {
    if (!isClassicalDiscontinuousUnitAdmissibilitySource(source)) {
      return issueDiscontinuousUnitAdmissibilityResult({
        blockReason:
          "owner-issued-discontinuous-unit-admissibility-source-required",
      });
    }
    const analysis = analyzeDiscontinuousUnitSource(source);
    const blockReason = discontinuousUnitAdmissibilityFailure(analysis);
    if (blockReason) {
      return issueDiscontinuousUnitAdmissibilityResult({
        source,
        analysis,
        blockReason,
      });
    }
    return issueDiscontinuousUnitAdmissibilityResult({
      source,
      analysis,
      authorizationStatus: "authorized",
    });
  }

  function isClassicalDiscontinuousUnitAdmissibilityResult(result = null) {
    const source = discontinuousUnitResultSources.get(result) || null;
    const analysis = source ? analyzeDiscontinuousUnitSource(source) : null;
    const expectedReason = source
      ? discontinuousUnitAdmissibilityFailure(analysis)
      : "owner-issued-discontinuous-unit-admissibility-source-required";
    const expectedAuthorized = Boolean(source && !expectedReason);
    return Boolean(
      result
      && issuedDiscontinuousUnitResults.has(result)
      && result.kind === DISCONTINUOUS_UNIT_ADMISSIBILITY_RESULT_KIND
      && result.version === DISCONTINUOUS_UNIT_ADMISSIBILITY_VERSION
      && result.semanticOwnerId === DISCONTINUOUS_UNIT_ADMISSIBILITY_OWNER_ID
      && result.operationId === DISCONTINUOUS_UNIT_ADMISSIBILITY_OPERATION_ID
      && discontinuousUnitOperationOwner.isContractIssued(
        result.operationContract,
      )
      && (
        expectedAuthorized
          ? result.authorizationStatus === "authorized"
            && result.blockReason === ""
            && result.unitKind === DISCONTINUOUS_UNIT_KIND
            && result.topology === "non-juxtaposed"
            && result.validationScope === "specific-typed-unit-kind"
            && result.admissibilityStatus
              === "admissible-specific-typed-complex-unit"
            && result.admissibilityValidated === true
            && result.constituentRoles.length === 2
          : result.authorizationStatus === "blocked"
            && result.blockReason === expectedReason
            && result.unitKind === ""
            && result.topology === ""
            && result.validationScope === ""
            && result.admissibilityStatus === "admissibility-rejected"
            && result.admissibilityValidated === false
            && result.constituentRoles.length === 0
      )
      && result.universalDiscontinuityAuthorized === false
      && result.arbitraryGapAuthorized === false
      && result.arrangementGenerated === false
      && result.generationAllowed === false
      && result.soundedSurfaceGenerated === false
      && result.writtenSurfaceGenerated === false
      && result.formulaGenerated === false
      && result.formulaStringAuthority === false
      && result.diagrammaticProjectionAuthority === false
      && result.discontinuityLabelAuthority === false
      && result.cohesionLabelAuthority === false
      && result.lessonMetadataAuthority === false
      && result.storedAnswerAuthority === false
      && result.exampleAuthority === false
      && Object.isFrozen(result)
      && Object.isFrozen(result.constituentRoles)
    );
  }

  function isClassicalDiscontinuousUnitAdmissibilityOperationContract(
    contract = null,
  ) {
    return discontinuousUnitOperationOwner.isContractIssued(contract);
  }

  function getClassicalDiscontinuousUnitAdmissibilityExecutionEvidence(
    result = null,
  ) {
    return discontinuousUnitResultExecutions.get(result) || null;
  }

  function isClassicalDiscontinuousUnitAdmissibilityExecutionEvidence(
    evidence = null,
    result = null,
  ) {
    return Boolean(
      evidence
      && result
      && issuedDiscontinuousUnitResults.has(result)
      && discontinuousUnitResultExecutions.get(result) === evidence
      && evidence.ownerId === DISCONTINUOUS_UNIT_ADMISSIBILITY_OWNER_ID
      && evidence.evaluatedOperationId
        === DISCONTINUOUS_UNIT_ADMISSIBILITY_OPERATION_ID
      && evidence.execution?.routeSteps === evidence.routeSteps
      && evidence.outcome?.status === evidence.execution?.status
      && evidence.outcome?.reason === evidence.execution?.reason
      && Object.isFrozen(evidence)
    );
  }

  const morphemeStructureBridge = Object.create(targetObject);
  Object.defineProperties(morphemeStructureBridge, {
    isClassicalMeaningfulMorphemeUnitClassificationResult: {
      value: isClassicalMeaningfulMorphemeUnitClassificationResult,
    },
    getClassicalMeaningfulMorphemeUnitClassificationExecutionEvidence: {
      value: getClassicalMeaningfulMorphemeUnitClassificationExecutionEvidence,
    },
    isClassicalMeaningfulMorphemeUnitClassificationExecutionEvidence: {
      value: isClassicalMeaningfulMorphemeUnitClassificationExecutionEvidence,
    },
    isClassicalNahuatlIdiomFrame: {
      value(frame = null) {
        return typeof targetObject?.isClassicalNahuatlIdiomFrame === "function"
          && targetObject.isClassicalNahuatlIdiomFrame(frame) === true;
      },
    },
  });
  const morphemeStructureApi = createMorphemeStructureOwnersApi(
    morphemeStructureBridge,
  );
  Object.defineProperties(
    morphemeStructureBridge,
    Object.getOwnPropertyDescriptors(morphemeStructureApi),
  );
  const linguisticStructureApi = createLinguisticStructureOwnersApi();
  const carrierStructureBridge = Object.create(targetObject);
  Object.defineProperties(carrierStructureBridge, {
    isClassicalGrammarConceptResult: {
      value: isClassicalGrammarConceptResult,
    },
    isClassicalCarrierRankTaxonomyResult: {
      value: isClassicalCarrierRankTaxonomyResult,
    },
    isClassicalMeaninglessCarrierUnitClassificationResult: {
      value: isClassicalMeaninglessCarrierUnitClassificationResult,
    },
    isClassicalMeaningfulMorphemeUnitClassificationResult: {
      value: isClassicalMeaningfulMorphemeUnitClassificationResult,
    },
    isClassicalStockMediatedStemFormationResult: {
      value: morphemeStructureApi.isClassicalStockMediatedStemFormationResult,
    },
  });
  const carrierStructureApi = createCarrierStructureOwnersApi(
    carrierStructureBridge,
  );

  return Object.freeze({
    getNuclearClauseTerminology,
    buildClassicalGrammarConceptSource,
    isClassicalGrammarConceptSource,
    evaluateClassicalGrammarConcept,
    isClassicalGrammarConceptResult,
    isClassicalGrammarConceptOperationContract,
    getClassicalGrammarConceptExecutionEvidence,
    isClassicalGrammarConceptExecutionEvidence,
    buildClassicalSilentMorphContrastSource,
    isClassicalSilentMorphContrastSource,
    evaluateClassicalSilentMorphContrast,
    isClassicalSilentMorphContrastResult,
    isClassicalSilentMorphContrastOperationContract,
    getClassicalSilentMorphContrastExecutionEvidence,
    isClassicalSilentMorphContrastExecutionEvidence,
    buildClassicalLinguisticUnitCompositionSource,
    isClassicalLinguisticUnitCompositionSource,
    evaluateClassicalLinguisticUnitComposition,
    isClassicalLinguisticUnitCompositionResult,
    isClassicalLinguisticUnitCompositionOperationContract,
    getClassicalLinguisticUnitCompositionExecutionEvidence,
    isClassicalLinguisticUnitCompositionExecutionEvidence,
    buildClassicalLinguisticStructureRecursionSource,
    isClassicalLinguisticStructureRecursionSource,
    evaluateClassicalLinguisticStructureRecursion,
    isClassicalLinguisticStructureRecursionResult,
    isClassicalLinguisticStructureRecursionOperationContract,
    getClassicalLinguisticStructureRecursionExecutionEvidence,
    isClassicalLinguisticStructureRecursionExecutionEvidence,
    buildClassicalCarrierRankTaxonomySource,
    isClassicalCarrierRankTaxonomySource,
    evaluateClassicalCarrierRankTaxonomy,
    isClassicalCarrierRankTaxonomyResult,
    isClassicalCarrierRankTaxonomyOperationContract,
    getClassicalCarrierRankTaxonomyExecutionEvidence,
    isClassicalCarrierRankTaxonomyExecutionEvidence,
    buildClassicalMeaninglessCarrierUnitClassificationSource,
    isClassicalMeaninglessCarrierUnitClassificationSource,
    evaluateClassicalMeaninglessCarrierUnitClassification,
    isClassicalMeaninglessCarrierUnitClassificationResult,
    isClassicalMeaninglessCarrierUnitClassificationOperationContract,
    getClassicalMeaninglessCarrierUnitClassificationExecutionEvidence,
    isClassicalMeaninglessCarrierUnitClassificationExecutionEvidence,
    buildClassicalMeaningfulMorphemeUnitClassificationSource,
    isClassicalMeaningfulMorphemeUnitClassificationSource,
    evaluateClassicalMeaningfulMorphemeUnitClassification,
    isClassicalMeaningfulMorphemeUnitClassificationResult,
    isClassicalMeaningfulMorphemeUnitClassificationOperationContract,
    getClassicalMeaningfulMorphemeUnitClassificationExecutionEvidence,
    isClassicalMeaningfulMorphemeUnitClassificationExecutionEvidence,
    buildClassicalMorphemeSyllableSeparationSource,
    isClassicalMorphemeSyllableSeparationSource,
    evaluateClassicalMorphemeSyllableSeparation,
    isClassicalMorphemeSyllableSeparationResult,
    isClassicalMorphemeSyllableSeparationOperationContract,
    getClassicalMorphemeSyllableSeparationExecutionEvidence,
    isClassicalMorphemeSyllableSeparationExecutionEvidence,
    ...morphemeStructureApi,
    ...linguisticStructureApi,
    ...carrierStructureApi,
    buildClassicalDiscontinuousUnitAdmissibilitySource,
    isClassicalDiscontinuousUnitAdmissibilitySource,
    evaluateClassicalDiscontinuousUnitAdmissibility,
    isClassicalDiscontinuousUnitAdmissibilityResult,
    isClassicalDiscontinuousUnitAdmissibilityOperationContract,
    getClassicalDiscontinuousUnitAdmissibilityExecutionEvidence,
    isClassicalDiscontinuousUnitAdmissibilityExecutionEvidence,
  });
}

export function installConceptsGlobals(targetObject = globalThis) {
  const api = createConceptsApi(targetObject);
  Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
  return api;
}
