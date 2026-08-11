// Independent read-only owners for the meaningful morpheme/affix hierarchy.
//
// This file is a non-authorizing organizational group only.  Every mechanism
// below has its own owner-issued Source, Result, operation contract, identity
// stores, route, and proof boundary.  Shared helpers cannot execute an owner
// or transfer authority between owners.

import {
  createGrammarOperationContractOwner,
} from "../grammar/operation_owner.mjs";
import {
  registerCanonicalOwnerSpecIdentity,
} from "../grammar/canonical_identity_registry.mjs";

const VERSION = 1;
const NON_AUTHORITY_FLAGS = Object.freeze({
  labelAuthority: false,
  storedCatalogAuthority: false,
  storedExampleAuthority: false,
  storedTableAuthority: false,
  lessonMetadataAuthority: false,
  expectedAnswerAuthority: false,
  surfaceStringAuthority: false,
  formulaStringAuthority: false,
  generationAllowed: false,
});

const OWNER_SPECS = Object.freeze({
  combinatorial: Object.freeze({
    ownerId: "morpheme-combinatorial-type-classification",
    operationId: "classical.morpheme.combinatorial-type.classify",
    sourceKind: "classical-morpheme-combinatorial-type-classification-source",
    resultKind: "classical-morpheme-combinatorial-type-classification-result",
    inputContract: "complete-typed-morpheme-combinatorial-type-source",
    sourceRequiredReason: "owner-issued-morpheme-combinatorial-type-source-required",
    successStepId: "morpheme-combinatorial-type-analysis-classified",
    rejectionStepId: "morpheme-combinatorial-type-analysis-rejected",
  }),
  position: Object.freeze({
    ownerId: "affix-linear-position-classification",
    operationId: "classical.morpheme.affix.position.classify",
    sourceKind: "classical-affix-linear-position-classification-source",
    resultKind: "classical-affix-linear-position-classification-result",
    inputContract: "complete-typed-affix-linear-position-source",
    sourceRequiredReason: "owner-issued-affix-linear-position-source-required",
    successStepId: "affix-linear-position-classified",
    rejectionStepId: "affix-linear-position-rejected",
  }),
  function: Object.freeze({
    ownerId: "affix-functional-type-classification",
    operationId: "classical.morpheme.affix.function.classify",
    sourceKind: "classical-affix-functional-type-classification-source",
    resultKind: "classical-affix-functional-type-classification-result",
    inputContract: "complete-typed-affix-functional-type-source",
    sourceRequiredReason: "owner-issued-affix-functional-type-source-required",
    successStepId: "affix-functional-type-classified",
    rejectionStepId: "affix-functional-type-rejected",
  }),
  paradigm: Object.freeze({
    ownerId: "inflectional-paradigm-definition",
    operationId: "classical.morpheme.inflectional-paradigm.classify",
    sourceKind: "classical-inflectional-paradigm-definition-source",
    resultKind: "classical-inflectional-paradigm-definition-result",
    inputContract: "complete-typed-inflectional-paradigm-definition-source",
    sourceRequiredReason: "owner-issued-inflectional-paradigm-definition-source-required",
    successStepId: "inflectional-paradigm-definition-classified",
    rejectionStepId: "inflectional-paradigm-definition-rejected",
  }),
  dyad: Object.freeze({
    ownerId: "inflectional-affix-dyad-analysis",
    operationId: "classical.morpheme.inflectional-dyad.analyze",
    sourceKind: "classical-inflectional-affix-dyad-analysis-source",
    resultKind: "classical-inflectional-affix-dyad-analysis-result",
    inputContract: "complete-typed-inflectional-affix-dyad-source",
    sourceRequiredReason: "owner-issued-inflectional-affix-dyad-source-required",
    successStepId: "inflectional-affix-dyad-analyzed",
    rejectionStepId: "inflectional-affix-dyad-rejected",
  }),
  hierarchy: Object.freeze({
    ownerId: "meaningful-structural-rank-hierarchy",
    operationId: "classical.morpheme.meaningful-rank.hierarchy.validate",
    sourceKind: "classical-meaningful-structural-rank-hierarchy-source",
    resultKind: "classical-meaningful-structural-rank-hierarchy-result",
    inputContract: "complete-typed-meaningful-structural-rank-hierarchy-source",
    sourceRequiredReason: "owner-issued-meaningful-structural-rank-hierarchy-source-required",
    successStepId: "meaningful-structural-rank-hierarchy-validated",
    rejectionStepId: "meaningful-structural-rank-hierarchy-rejected",
  }),
  postStem: Object.freeze({
    ownerId: "nahuatl-post-stem-unit-classification",
    operationId: "classical.structure.post-stem-unit.classify",
    sourceKind: "classical-nahuatl-post-stem-unit-classification-source",
    resultKind: "classical-nahuatl-post-stem-unit-classification-result",
    inputContract: "complete-typed-nahuatl-post-stem-unit-source",
    sourceRequiredReason: "owner-issued-nahuatl-post-stem-unit-source-required",
    successStepId: "nahuatl-post-stem-unit-classified",
    rejectionStepId: "nahuatl-post-stem-unit-rejected",
  }),
  affixDemotion: Object.freeze({
    ownerId: "inflectional-affix-stem-internal-demotion",
    operationId: "classical.morpheme.inflectional-affix.demote",
    sourceKind: "classical-inflectional-affix-stem-internal-demotion-source",
    resultKind: "classical-inflectional-affix-stem-internal-demotion-result",
    inputContract: "complete-typed-inflectional-affix-demotion-source",
    sourceRequiredReason: "owner-issued-inflectional-affix-demotion-source-required",
    successStepId: "inflectional-affix-stem-internal-demotion-executed",
    rejectionStepId: "inflectional-affix-stem-internal-demotion-rejected",
    operationType: "transform",
    effectScopes: Object.freeze(["semantic-rank-transition", "typed-source-validation"]),
    outputKinds: Object.freeze(["typed-demotion-result"]),
  }),
  rankSourceUpgrade: Object.freeze({
    ownerId: "meaningful-rank-source-and-upgrade-admissibility",
    operationId: "classical.structure.meaningful-rank.source-or-upgrade.validate",
    sourceKind: "classical-meaningful-rank-source-and-upgrade-source",
    resultKind: "classical-meaningful-rank-source-and-upgrade-result",
    inputContract: "complete-typed-meaningful-rank-source-or-upgrade-source",
    sourceRequiredReason: "owner-issued-meaningful-rank-source-or-upgrade-source-required",
    successStepId: "meaningful-rank-source-or-upgrade-validated",
    rejectionStepId: "meaningful-rank-source-or-upgrade-rejected",
  }),
  rankDowngrade: Object.freeze({
    ownerId: "meaningful-rank-downgrade",
    operationId: "classical.structure.meaningful-rank.downgrade",
    sourceKind: "classical-meaningful-rank-downgrade-source",
    resultKind: "classical-meaningful-rank-downgrade-result",
    inputContract: "complete-typed-meaningful-rank-downgrade-source",
    sourceRequiredReason: "owner-issued-meaningful-rank-downgrade-source-required",
    successStepId: "meaningful-rank-downgrade-executed",
    rejectionStepId: "meaningful-rank-downgrade-rejected",
    operationType: "transform",
    effectScopes: Object.freeze(["semantic-rank-transition", "typed-source-validation"]),
    outputKinds: Object.freeze(["typed-rank-transition-result"]),
  }),
  rootDefinition: Object.freeze({
    ownerId: "root-major-morpheme-definition",
    operationId: "classical.structure.root.major-morpheme.validate",
    sourceKind: "classical-root-major-morpheme-definition-source",
    resultKind: "classical-root-major-morpheme-definition-result",
    inputContract: "complete-typed-root-major-morpheme-source",
    sourceRequiredReason: "owner-issued-root-major-morpheme-source-required",
    successStepId: "root-major-morpheme-definition-validated",
    rejectionStepId: "root-major-morpheme-definition-rejected",
  }),
  directStem: Object.freeze({
    ownerId: "direct-stem-formation",
    operationId: "classical.structure.stem.form-directly",
    sourceKind: "classical-direct-stem-formation-source",
    resultKind: "classical-direct-stem-formation-result",
    inputContract: "complete-typed-direct-stem-formation-source",
    sourceRequiredReason: "owner-issued-direct-stem-formation-source-required",
    successStepId: "direct-stem-formation-executed",
    rejectionStepId: "direct-stem-formation-rejected",
    operationType: "compose",
    effectScopes: Object.freeze(["meaningful-unit-composition", "typed-source-validation"]),
    outputKinds: Object.freeze(["typed-stem-result"]),
    unitConstructed: true,
  }),
  stockStem: Object.freeze({
    ownerId: "stock-mediated-stem-formation",
    operationId: "classical.structure.stem.form-via-stock",
    sourceKind: "classical-stock-mediated-stem-formation-source",
    resultKind: "classical-stock-mediated-stem-formation-result",
    inputContract: "complete-typed-stock-mediated-stem-source",
    sourceRequiredReason: "owner-issued-stock-mediated-stem-source-required",
    successStepId: "stock-mediated-stem-formation-executed",
    rejectionStepId: "stock-mediated-stem-formation-rejected",
    operationType: "compose",
    effectScopes: Object.freeze(["meaningful-unit-composition", "typed-source-validation"]),
    outputKinds: Object.freeze(["typed-stem-result"]),
    unitConstructed: true,
  }),
  compoundStem: Object.freeze({
    ownerId: "compound-stem-formation",
    operationId: "classical.structure.stem.compound",
    sourceKind: "classical-compound-stem-formation-source",
    resultKind: "classical-compound-stem-formation-result",
    inputContract: "complete-typed-compound-stem-source",
    sourceRequiredReason: "owner-issued-compound-stem-source-required",
    successStepId: "compound-stem-formation-executed",
    rejectionStepId: "compound-stem-formation-rejected",
    operationType: "compose",
    effectScopes: Object.freeze(["meaningful-unit-composition", "typed-source-validation"]),
    outputKinds: Object.freeze(["typed-stem-result"]),
    unitConstructed: true,
  }),
  lexemeBearing: Object.freeze({
    ownerId: "lexeme-bearing-unit-classification",
    operationId: "classical.structure.meaning-bearing-unit.classify",
    sourceKind: "classical-lexeme-bearing-unit-classification-source",
    resultKind: "classical-lexeme-bearing-unit-classification-result",
    inputContract: "complete-typed-meaning-bearing-unit-source",
    sourceRequiredReason: "owner-issued-meaning-bearing-unit-source-required",
    successStepId: "lexeme-bearing-unit-classified",
    rejectionStepId: "lexeme-bearing-unit-rejected",
  }),
  stemLexical: Object.freeze({
    ownerId: "stem-lexical-item-classification",
    operationId: "classical.structure.stem.lexical-status.classify",
    sourceKind: "classical-stem-lexical-item-classification-source",
    resultKind: "classical-stem-lexical-item-classification-result",
    inputContract: "complete-typed-stem-lexical-status-source",
    sourceRequiredReason: "owner-issued-stem-lexical-status-source-required",
    successStepId: "stem-lexical-item-classified",
    rejectionStepId: "stem-lexical-item-rejected",
  }),
  rootMeaningUpgrade: Object.freeze({
    ownerId: "root-meaning-rank-upgrade",
    operationId: "classical.structure.root.meaning-rank.upgrade",
    sourceKind: "classical-root-meaning-rank-upgrade-source",
    resultKind: "classical-root-meaning-rank-upgrade-result",
    inputContract: "complete-typed-root-meaning-upgrade-source",
    sourceRequiredReason: "owner-issued-root-meaning-upgrade-source-required",
    successStepId: "root-meaning-rank-upgrade-executed",
    rejectionStepId: "root-meaning-rank-upgrade-rejected",
    operationType: "transform",
    effectScopes: Object.freeze(["semantic-rank-transition", "typed-source-validation"]),
    outputKinds: Object.freeze(["typed-meaning-rank-result"]),
  }),
  stemTransitionZone: Object.freeze({
    ownerId: "stem-inflection-transition-zone",
    operationId: "classical.structure.stem-transition-zone.validate",
    sourceKind: "classical-stem-inflection-transition-zone-source",
    resultKind: "classical-stem-inflection-transition-zone-result",
    inputContract: "complete-typed-stem-transition-zone-source",
    sourceRequiredReason: "owner-issued-stem-transition-zone-source-required",
    successStepId: "stem-inflection-transition-zone-validated",
    rejectionStepId: "stem-inflection-transition-zone-rejected",
  }),
});

const COMBINATORIAL_ANALYSES = Object.freeze([
  "type-inventory",
  "major-definition",
  "minor-definition",
]);
const COMBINATORIAL_FACTS = Object.freeze({
  "type-inventory": Object.freeze([
    "morphemes-or-morphs-have-exactly-major-and-minor-combinatorial-types",
    "major-and-minor-are-distinct-combinatorial-types",
  ]),
  "major-definition": Object.freeze([
    "major-morpheme-or-morph-is-locus-of-representational-information",
    "major-morpheme-or-morph-occurs-at-structural-rank-organization-center",
  ]),
  "minor-definition": Object.freeze([
    "minor-morpheme-or-morph-is-affixal",
  ]),
});
const COMBINATORIAL_RESTRICTIONS = Object.freeze([
  "meaningful-unit-result-must-be-owner-issued-and-route-retained",
  "requested-analysis-selects-a-read-only-taxonomy-question-not-a-token-answer",
  "major-or-minor-labels-do-not-authorize-a-candidate-classification",
  "affix-position-function-paradigm-dyad-and-rank-hierarchy-remain-separate-owners",
  "classification-does-not-realize-a-boundary-formula-or-surface",
]);

const POSITION_BY_COORDINATE = Object.freeze({
  beginning: "prefix",
  middle: "infix",
  end: "suffix",
});
const POSITION_RESTRICTIONS = Object.freeze([
  "minor-affix-definition-result-must-be-owner-issued-and-route-retained",
  "sequence-position-is-a-typed-coordinate-and-affix-class-is-derived",
  "a-prefix-infix-or-suffix-label-does-not-authorize-affix-identity",
  "functional-type-paradigm-dyad-and-boundary-realization-remain-separate-owners",
  "classification-does-not-segment-rewrite-or-generate-a-surface",
]);

const FUNCTION_RESTRICTIONS = Object.freeze([
  "affix-position-result-must-be-owner-issued-and-route-retained",
  "function-is-derived-from-information-role-boundary-relation-and-affix-position",
  "derivational-and-inflectional-proofs-remain-distinct",
  "inflectional-affixes-are-stem-external-and-never-infixes",
  "paradigm-dyad-demotion-boundary-realization-formula-and-surface-remain-separate",
]);

const PARADIGM_RESTRICTIONS = Object.freeze([
  "inflectional-affix-result-must-be-owner-issued-and-route-retained",
  "this-owner-defines-paradigm-membership-conditions-without-building-a-batch",
  "all-variants-must-share-one-classed-stem",
  "english-write-examples-and-participle-notes-are-evidence-only",
  "stored-tables-generated-batches-formulas-and-surfaces-cannot-authorize-the-definition",
]);

const DYAD_RESTRICTIONS = Object.freeze([
  "both-inflectional-member-results-must-be-independently-owner-issued",
  "the-two-member-sequence-must-be-inseparable",
  "one-members-proof-cannot-satisfy-the-other-members-proof",
  "the-spanish-person-number-example-and-lesson-cross-reference-are-evidence-only",
  "analysis-does-not-create-affixes-realize-boundaries-or-generate-a-surface",
]);

const NAHUATL_HIERARCHY_STAGES = Object.freeze([
  Object.freeze(["morpheme-or-morph"]),
  Object.freeze(["root"]),
  Object.freeze(["stock"]),
  Object.freeze(["stem"]),
  Object.freeze(["nuclear-clause", "particle"]),
  Object.freeze(["group"]),
  Object.freeze(["sentence"]),
]);
const HIERARCHY_RESTRICTIONS = Object.freeze([
  "major-and-minor-definition-results-must-be-independently-owner-issued",
  "higher-ranks-require-a-requisite-lower-stage",
  "nahuatl-rank-stages-remain-distinct-and-ordered",
  "english-spanish-comparison-lines-are-documentary-only",
  "the-hierarchy-does-not-create-rank-transitions-or-an-alternate-language-runtime",
  "rank-conversion-boundary-realization-formula-and-surface-remain-separate-owners",
]);

const POST_STEM_DISPOSITIONS = Object.freeze([
  "paradigmatic-unit",
  "monomorphemic-invariant-sentence-fragment",
  "other-post-stem-structural-unit",
]);
const POST_STEM_RESTRICTIONS = Object.freeze([
  "the-rank-prerequisite-must-be-owner-issued-and-route-retained",
  "paradigmaticity-and-unit-disposition-are-genuine-typed-coordinates",
  "particles-remain-the-explicit-monomorphemic-invariant-sentence-fragment-exception",
  "lesson-three-and-four-references-are-documentary-only",
  "classification-does-not-generate-a-particle-nuclear-clause-group-formula-or-surface",
]);
const AFFIX_DEMOTION_RESTRICTIONS = Object.freeze([
  "the-inflectional-affix-result-must-be-owner-issued-and-route-retained",
  "only-an-explicit-conversional-or-derivational-process-can-license-demotion",
  "demotion-changes-semantic-stem-boundary-status-without-realizing-written-spelling",
  "the-general-rank-source-rule-and-lesson-thirty-five-reference-cannot-authorize-demotion",
  "the-operation-does-not-create-an-affix-formula-or-surface",
]);
const RANK_SOURCE_UPGRADE_RESTRICTIONS = Object.freeze([
  "the-Nahuatl-meaningful-rank-hierarchy-result-must-be-owner-issued-and-route-retained",
  "normal-source-relations-move-only-to-the-next-higher-rank",
  "nonadjacent-upgrade-requires-the-explicit-upgrade-mode",
  "downgrade-is-outside-this-Canvas-atom-and-remains-a-separate-owner",
  "root-and-stem-examples-are-evidence-not-transition-authority",
  "validation-does-not-construct-a-unit-realize-a-boundary-formula-or-surface",
]);
const RANK_DOWNGRADE_RESTRICTIONS = Object.freeze([
  "the-Nahuatl-meaningful-rank-hierarchy-result-must-be-owner-issued-and-route-retained",
  "downgrade-requires-an-explicit-higher-to-lower-rank-transition",
  "upgrade-and-normal-source-relations-remain-separate-owners",
  "the-nuclear-clause-to-stem-path-changes-rank-and-function-not-written-surface",
  "stored-hierarchy-tables-and-examples-cannot-authorize-a-downgrade",
]);
const ROOT_DEFINITION_RESTRICTIONS = Object.freeze([
  "the-major-morpheme-result-must-be-owner-issued-and-route-retained",
  "a-root-has-exactly-one-major-morpheme-or-morph",
  "a-root-label-spelling-or-displayed-segmentation-cannot-authorize-structure",
  "validation-does-not-form-a-stock-stem-formula-or-surface",
]);
const DIRECT_STEM_RESTRICTIONS = Object.freeze([
  "the-root-or-stem-base-result-must-be-owner-issued-and-route-retained",
  "derivational-affix-results-are-required-for-derived-stem-paths",
  "a-root-alone-path-cannot-smuggle-an-affix-result",
  "stem-plus-derivational-affix-requires-an-existing-stem-result",
  "formation-builds-an-abstract-typed-stem-without-copying-an-example-spelling",
]);
const STOCK_STEM_RESTRICTIONS = Object.freeze([
  "root-derivational-affix-and-suffix-position-results-must-be-independently-owner-issued",
  "stock-formation-precedes-stock-to-stem-formation",
  "the-later-section-reference-is-documentary-and-cannot-supply-either-step",
  "the-operation-constructs-an-abstract-typed-stem-without-realizing-a-formula-or-surface",
  "compound-stem-formation-remains-a-separate-owner",
]);
const COMPOUND_STEM_RESTRICTIONS = Object.freeze([
  "both-stem-results-must-be-independently-owner-issued-and-route-retained",
  "the-two-stem-members-must-remain-distinct",
  "compound-stem-formation-does-not-inherit-stock-mediated-proof",
  "English-comparison-forms-are-evidence-only-and-cannot-create-an-alternate-runtime",
  "the-operation-constructs-an-abstract-typed-stem-without-realizing-a-formula-or-surface",
]);
const LEXEME_BEARING_RESTRICTIONS = Object.freeze([
  "the-unit-result-or-lexical-source-must-be-owner-issued",
  "lower-rank-morphological-units-retain-sememe-meaning-components",
  "stems-and-idioms-have-lexeme-meaning-components",
  "root-meaning-upgrade-remains-a-separate-operation",
  "a-term-gloss-lexicon-entry-example-formula-or-surface-cannot-authorize-the-classification",
]);
const STEM_LEXICAL_RESTRICTIONS = Object.freeze([
  "the-stem-result-must-be-owner-issued-and-route-retained",
  "lexicon-eligibility-is-derived-from-stem-rank-not-from-a-stored-vocabulary-entry",
  "classification-does-not-authorize-lexeme-selection-or-generated-output",
]);
const ROOT_MEANING_UPGRADE_RESTRICTIONS = Object.freeze([
  "the-root-and-rank-upgrade-results-must-be-independently-owner-issued-and-route-retained",
  "the-rank-transition-must-be-an-explicit-root-to-stem-upgrade",
  "a-root-label-or-general-transition-rule-alone-cannot-authorize-meaning-upgrade",
  "the-operation-does-not-construct-a-stem-formula-or-surface",
]);
const STEM_TRANSITION_ZONE_RESTRICTIONS = Object.freeze([
  "the-stem-and-post-stem-results-must-be-independently-owner-issued-and-route-retained",
  "the-stem-rank-is-the-upper-bound-of-derivation-and-other-stem-formation",
  "the-next-higher-rank-is-the-domain-of-inflection",
  "the-schema-does-not-demote-an-affix-form-a-stem-or-realize-a-written-boundary",
  "each-transition-zone-claim-retains-its-own-checkpoint-and-atom-receipt",
]);

function deepFreeze(value, seen = new WeakSet()) {
  if (!value || typeof value !== "object" || seen.has(value)) return value;
  seen.add(value);
  for (const key of Reflect.ownKeys(value)) {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (descriptor && Object.prototype.hasOwnProperty.call(descriptor, "value")) {
      deepFreeze(descriptor.value, seen);
    }
  }
  return Object.freeze(value);
}

function plainRequestFailure(request, allowedKeys, prefix) {
  if (!request || typeof request !== "object" || Array.isArray(request)) {
    return `${prefix}-source-object-required`;
  }
  const prototype = Object.getPrototypeOf(request);
  if (prototype !== Object.prototype && prototype !== null) {
    return `${prefix}-source-plain-object-required`;
  }
  for (const key of Reflect.ownKeys(request)) {
    if (typeof key !== "string" || !allowedKeys.includes(key)) {
      return `${prefix}-source-unrecognized-constituent:${String(key)}`;
    }
    const descriptor = Object.getOwnPropertyDescriptor(request, key);
    if (!descriptor || !Object.prototype.hasOwnProperty.call(descriptor, "value")) {
      return `${prefix}-source-data-constituent-required:${key}`;
    }
  }
  return "";
}

function call(target, name, ...args) {
  try {
    return typeof target?.[name] === "function" ? target[name](...args) : null;
  } catch {
    return null;
  }
}

function analyzePrerequisite(target, result, descriptor) {
  const ownerIssued = call(target, descriptor.isResult, result) === true;
  const evidence = ownerIssued ? call(target, descriptor.getEvidence, result) : null;
  const routeRetained = ownerIssued
    && call(target, descriptor.isEvidence, evidence, result) === true;
  const authorized = ownerIssued && result?.authorizationStatus === "authorized";
  const semanticMatch = authorized
    && result?.semanticOwnerId === descriptor.ownerId
    && result?.operationId === descriptor.operationId
    && (!descriptor.matches || descriptor.matches(result));
  const reason = !ownerIssued
    ? descriptor.ownerReason
    : !routeRetained
      ? descriptor.routeReason
      : !authorized
        ? descriptor.authorizationReason
        : !semanticMatch
          ? descriptor.semanticReason
          : "";
  return deepFreeze({
    ownerIssued,
    routeRetained,
    authorized,
    semanticMatch,
    admitted: reason === "",
    reason,
    result,
    evidence,
    semanticOwnerId: result?.semanticOwnerId || "",
    operationId: result?.operationId || "",
  });
}

function namespacePrerequisiteSteps(analyses = []) {
  const steps = [];
  analyses.forEach((analysis, index) => {
    const namespace = `prerequisite-${index + 1}.${analysis.semanticOwnerId || "unknown"}`;
    for (const step of analysis.evidence?.routeSteps || []) {
      steps.push(deepFreeze({
        ...step,
        stepId: `${namespace}.${step.stepId}`,
        branchId: step.branchId ? `${namespace}.${step.branchId}` : "",
        invocationRole: "prerequisite",
      }));
    }
  });
  return steps;
}

function createMechanism(targetObject, spec, analyzeRequest) {
  registerCanonicalOwnerSpecIdentity(spec);
  const issuedSources = new WeakSet();
  const sourceContexts = new WeakMap();
  const issuedResults = new WeakSet();
  const resultSources = new WeakMap();
  const resultEvidence = new WeakMap();
  const operationOwner = createGrammarOperationContractOwner({
    ownerId: spec.ownerId,
    domain: spec.ownerId,
  });
  const operationContract = operationOwner.buildContract({
    operationId: spec.operationId,
    operationType: spec.operationType || "establish",
    consumesFrameKinds: [spec.sourceKind],
    producesFrameKind: spec.resultKind,
    effectScopes: spec.effectScopes
      || ["read-only-classification", "typed-source-validation"],
    outputKinds: spec.outputKinds || ["read-only-result"],
    authorityRefs: ["andrews-meaningful-morpheme-hierarchy"],
    description: `Execute the independent ${spec.ownerId} contract without generating a formula or surface.`,
  });

  function buildSource(request = {}) {
    const analysis = analyzeRequest(targetObject, request);
    const source = deepFreeze({
      kind: spec.sourceKind,
      version: VERSION,
      authorizationStatus: analysis.reason ? "blocked" : "authorized",
      blockReason: analysis.reason,
      requestDigestInput: analysis.requestDigestInput,
      ...NON_AUTHORITY_FLAGS,
    });
    issuedSources.add(source);
    sourceContexts.set(source, analysis);
    return source;
  }

  function isSource(source = null) {
    const context = sourceContexts.get(source) || null;
    return Boolean(
      source
      && issuedSources.has(source)
      && context
      && source.kind === spec.sourceKind
      && source.version === VERSION
      && source.authorizationStatus === "authorized"
      && source.blockReason === ""
      && context.reason === ""
      && context.prerequisites.every((item) => item.admitted)
      && Object.entries(NON_AUTHORITY_FLAGS).every(([key, value]) => source[key] === value)
      && Object.isFrozen(source)
    );
  }

  function buildEvidence(source, context, authorized, reason, payload) {
    const providedInput = deepFreeze({ ...(context?.providedInput || {}) });
    const routeSteps = namespacePrerequisiteSteps(context?.prerequisites || []);
    const sourceIssued = issuedSources.has(source);
    routeSteps.push(
      deepFreeze({
        stepId: `${spec.ownerId}-source-admitted`,
        kind: "source",
        actorId: spec.ownerId,
        status: sourceIssued ? "accepted" : "rejected",
        reason: sourceIssued ? `owner-issued-${spec.ownerId}-source` : reason,
        branchId: `${spec.ownerId}-source-authority`,
        decision: sourceIssued ? "admit" : "reject",
        evaluatedRuleIds: [],
        executedRuleIds: [],
        inputState: providedInput,
        outputState: deepFreeze({ sourceIssued }),
      }),
      deepFreeze({
        stepId: `${spec.ownerId}-semantic-owner-selected`,
        kind: "semantic-owner",
        actorId: spec.ownerId,
        status: sourceIssued ? "selected" : "rejected",
        reason: sourceIssued ? `${spec.ownerId}-jurisdiction-selected` : reason,
        branchId: `${spec.ownerId}-owner-jurisdiction`,
        decision: sourceIssued ? spec.ownerId : "no-owner",
        evaluatedRuleIds: [],
        executedRuleIds: [],
        inputState: deepFreeze({ sourceKind: source?.kind || "" }),
        outputState: deepFreeze({ ownerId: sourceIssued ? spec.ownerId : "" }),
      }),
    );
    let priorReason = sourceIssued ? "" : reason;
    for (const guard of context?.guards || []) {
      const skipped = Boolean(priorReason);
      const guardReason = skipped
        ? `prior-${spec.ownerId}-condition-failed:${priorReason}`
        : guard.matches
          ? guard.acceptedReason
          : guard.rejectedReason;
      routeSteps.push(deepFreeze({
        stepId: guard.stepId,
        kind: "guard",
        actorId: spec.ownerId,
        status: skipped ? "skipped" : guard.matches ? "accepted" : "rejected",
        reason: guardReason,
        branchId: guard.branchId,
        decision: skipped ? "skip" : guard.matches ? "accept" : "reject",
        evaluatedRuleIds: skipped ? [] : [spec.operationId],
        executedRuleIds: [],
        inputState: deepFreeze({ ...(guard.inputState || {}) }),
        outputState: deepFreeze({ conditionSatisfied: !skipped && guard.matches }),
      }));
      if (!skipped && !guard.matches) priorReason = guard.rejectedReason;
    }
    for (const checkpoint of context?.checkpoints || []) {
      routeSteps.push(deepFreeze({
        stepId: checkpoint.stepId,
        kind: "branch",
        actorId: spec.ownerId,
        status: authorized && checkpoint.applicable ? "evaluated" : "not-applicable",
        reason: authorized && checkpoint.applicable
          ? checkpoint.acceptedReason
          : checkpoint.nonapplicableReason,
        branchId: checkpoint.branchId,
        decision: authorized && checkpoint.applicable ? "retain" : "not-applicable",
        evaluatedRuleIds: authorized ? [spec.operationId] : [],
        executedRuleIds: [],
        inputState: providedInput,
        outputState: deepFreeze({ checkpointSatisfied: authorized && checkpoint.applicable }),
      }));
    }
    routeSteps.push(deepFreeze({
      stepId: authorized ? spec.successStepId : spec.rejectionStepId,
      kind: authorized ? "operation" : "guard",
      actorId: spec.ownerId,
      status: authorized ? "executed" : "rejected",
      reason: authorized ? `${spec.ownerId}-executed` : reason,
      branchId: `${spec.ownerId}-outcome`,
      decision: authorized ? "classify" : "reject",
      evaluatedRuleIds: sourceIssued ? [spec.operationId] : [],
      executedRuleIds: authorized ? [spec.operationId] : [],
      inputState: providedInput,
      outputState: deepFreeze(authorized
        ? { classificationStatus: payload.classificationStatus }
        : { classificationStatus: `${spec.ownerId}-rejected` }),
    }));
    const frozenSteps = deepFreeze(routeSteps);
    const execution = deepFreeze({
      status: authorized ? "authorized" : "rejected",
      reason: reason || null,
      semanticOwnerId: spec.ownerId,
      operationId: spec.operationId,
      selectedRuleId: authorized ? spec.operationId : null,
      stages: frozenSteps.map((step) => step.stepId),
      routeSteps: frozenSteps,
    });
    return deepFreeze({
      ownerId: spec.ownerId,
      evaluatedOperationId: spec.operationId,
      inputContract: spec.inputContract,
      functionIds: deepFreeze([spec.buildName, spec.evaluateName]),
      providedInput,
      execution,
      routeSteps: frozenSteps,
      outcome: deepFreeze({ status: execution.status, reason: execution.reason }),
    });
  }

  function issueResult({ source = null, context = null, authorized = false, reason = "" } = {}) {
    const payload = authorized ? context.payload : deepFreeze({
      classificationStatus: `${spec.ownerId}-rejected`,
      analysisKind: "",
      classification: "",
      facts: deepFreeze([]),
      relations: deepFreeze([]),
      coordinates: deepFreeze({}),
      prerequisiteOwnerIds: deepFreeze([]),
    });
    const result = deepFreeze({
      kind: spec.resultKind,
      version: VERSION,
      authorizationStatus: authorized ? "authorized" : "blocked",
      blockReason: reason,
      semanticOwnerId: spec.ownerId,
      operationId: spec.operationId,
      operationContract,
      classificationStatus: payload.classificationStatus,
      analysisKind: payload.analysisKind,
      classification: payload.classification,
      facts: deepFreeze([...(payload.facts || [])]),
      relations: deepFreeze([...(payload.relations || [])]),
      restrictions: deepFreeze([...(context?.restrictions || [])]),
      coordinates: deepFreeze({ ...(payload.coordinates || {}) }),
      prerequisiteOwnerIds: deepFreeze([...(payload.prerequisiteOwnerIds || [])]),
      ownerExecutionCompleted: authorized,
      ...NON_AUTHORITY_FLAGS,
      unitConstructed: authorized && spec.unitConstructed === true,
      boundaryRewritten: false,
      soundedSurfaceGenerated: false,
      writtenSurfaceGenerated: false,
      formulaGenerated: false,
    });
    issuedResults.add(result);
    if (source) resultSources.set(result, source);
    resultEvidence.set(result, buildEvidence(source, context, authorized, reason, payload));
    return result;
  }

  function evaluate(source = null) {
    if (!issuedSources.has(source)) {
      return issueResult({ reason: spec.sourceRequiredReason });
    }
    const context = sourceContexts.get(source) || null;
    const reason = source?.blockReason || context?.reason || "";
    if (reason || !isSource(source)) {
      return issueResult({
        source,
        context,
        reason: reason || `authorized-${spec.ownerId}-source-required`,
      });
    }
    return issueResult({ source, context, authorized: true });
  }

  function isResult(result = null) {
    const source = resultSources.get(result) || null;
    const context = sourceContexts.get(source) || null;
    const expectedAuthorized = Boolean(source && context && !context.reason && isSource(source));
    return Boolean(
      result
      && issuedResults.has(result)
      && result.kind === spec.resultKind
      && result.version === VERSION
      && result.semanticOwnerId === spec.ownerId
      && result.operationId === spec.operationId
      && operationOwner.isContractIssued(result.operationContract)
      && result.authorizationStatus === (expectedAuthorized ? "authorized" : "blocked")
      && result.ownerExecutionCompleted === expectedAuthorized
      && result.generationAllowed === false
      && result.unitConstructed
        === (expectedAuthorized && spec.unitConstructed === true)
      && result.boundaryRewritten === false
      && result.soundedSurfaceGenerated === false
      && result.writtenSurfaceGenerated === false
      && result.formulaGenerated === false
      && Object.isFrozen(result)
    );
  }

  function getEvidence(result = null) {
    return resultEvidence.get(result) || null;
  }

  function isEvidence(evidence = null, result = null) {
    const currentOperationSteps = evidence?.routeSteps?.filter((step) =>
      step.invocationRole !== "prerequisite"
      && step.executedRuleIds?.includes(spec.operationId)) || [];
    return Boolean(
      evidence
      && result
      && issuedResults.has(result)
      && resultEvidence.get(result) === evidence
      && evidence.ownerId === spec.ownerId
      && evidence.evaluatedOperationId === spec.operationId
      && evidence.execution?.routeSteps === evidence.routeSteps
      && evidence.outcome?.status === evidence.execution?.status
      && evidence.outcome?.reason === evidence.execution?.reason
      && (result.authorizationStatus === "authorized"
        ? currentOperationSteps.length === 1
          && currentOperationSteps[0].stepId === spec.successStepId
        : currentOperationSteps.length === 0)
      && Object.isFrozen(evidence)
    );
  }

  return deepFreeze({
    buildSource,
    isSource,
    evaluate,
    isResult,
    isOperationContract: (contract = null) => operationOwner.isContractIssued(contract),
    getEvidence,
    isEvidence,
  });
}

const MEANINGFUL_DESCRIPTOR = Object.freeze({
  isResult: "isClassicalMeaningfulMorphemeUnitClassificationResult",
  getEvidence: "getClassicalMeaningfulMorphemeUnitClassificationExecutionEvidence",
  isEvidence: "isClassicalMeaningfulMorphemeUnitClassificationExecutionEvidence",
  ownerId: "meaningful-morpheme-unit-classification",
  operationId: "classical.morpheme.meaningful-unit.classify",
  ownerReason: "owner-issued-meaningful-unit-result-required",
  routeReason: "meaningful-unit-live-prerequisite-route-required",
  authorizationReason: "authorized-meaningful-unit-result-required",
  semanticReason: "morpheme-or-morph-meaningful-unit-result-required",
  matches: (result) => result.hierarchyFamily === "meaningful"
    && ["morpheme", "morph"].includes(result.candidateKind),
});

function combinatorialAnalysis(target, request) {
  const requestFailure = plainRequestFailure(
    request,
    ["meaningfulUnitResult", "requestedAnalysisKind"],
    "morpheme-combinatorial-type",
  );
  const prerequisite = analyzePrerequisite(
    target,
    requestFailure ? null : request.meaningfulUnitResult,
    MEANINGFUL_DESCRIPTOR,
  );
  const analysisKind = requestFailure ? "" : String(request.requestedAnalysisKind || "");
  const analysisKindValid = COMBINATORIAL_ANALYSES.includes(analysisKind);
  const reason = requestFailure
    || prerequisite.reason
    || (!analysisKindValid ? "morpheme-combinatorial-analysis-kind-required" : "");
  return deepFreeze({
    reason,
    requestDigestInput: `${prerequisite.result?.candidateKind || ""}:${analysisKind}`,
    prerequisites: deepFreeze([prerequisite]),
    providedInput: deepFreeze({
      meaningfulCandidateKind: prerequisite.result?.candidateKind || "",
      requestedAnalysisKind: analysisKind,
      prerequisiteOwnerId: prerequisite.semanticOwnerId,
    }),
    guards: deepFreeze([
      deepFreeze({ stepId: "morpheme-combinatorial-request-shape-validated", branchId: "request-shape", matches: !requestFailure, acceptedReason: "typed-meaningful-result-and-analysis-kind-supplied", rejectedReason: requestFailure || "morpheme-combinatorial-request-invalid" }),
      deepFreeze({ stepId: "morpheme-combinatorial-meaningful-result-authority-validated", branchId: "meaningful-result-authority", matches: prerequisite.admitted, acceptedReason: "owner-issued-meaningful-unit-result-retained", rejectedReason: prerequisite.reason || "owner-issued-meaningful-unit-result-required" }),
      deepFreeze({ stepId: "morpheme-combinatorial-analysis-kind-validated", branchId: "analysis-kind", matches: analysisKindValid, acceptedReason: "canvas-taxonomy-analysis-kind-recognized", rejectedReason: "morpheme-combinatorial-analysis-kind-required" }),
    ]),
    checkpoints: deepFreeze([
      deepFreeze({ stepId: "major-minor-type-inventory-checkpoint", branchId: "type-inventory-claim", applicable: analysisKind === "type-inventory", acceptedReason: "exact-major-minor-inventory-retained", nonapplicableReason: "different-combinatorial-analysis-requested" }),
      deepFreeze({ stepId: "major-representational-center-checkpoint", branchId: "major-definition-claim", applicable: analysisKind === "major-definition", acceptedReason: "major-representational-center-definition-retained", nonapplicableReason: "major-definition-not-requested" }),
      deepFreeze({ stepId: "minor-affixal-definition-checkpoint", branchId: "minor-definition-claim", applicable: analysisKind === "minor-definition", acceptedReason: "minor-affixal-definition-retained", nonapplicableReason: "minor-definition-not-requested" }),
    ]),
    restrictions: COMBINATORIAL_RESTRICTIONS,
    payload: deepFreeze({
      classificationStatus: `classified-morpheme-combinatorial-${analysisKind}`,
      analysisKind,
      classification: analysisKind === "type-inventory"
        ? "major-minor-inventory"
        : analysisKind === "major-definition"
          ? "major-morpheme-or-morph"
          : "minor-affixal-morpheme-or-morph",
      facts: COMBINATORIAL_FACTS[analysisKind] || [],
      relations: deepFreeze(["major-and-minor-combinatorial-types-remain-distinct"]),
      coordinates: deepFreeze({ meaningfulCandidateKind: prerequisite.result?.candidateKind || "" }),
      prerequisiteOwnerIds: deepFreeze([MEANINGFUL_DESCRIPTOR.ownerId]),
    }),
  });
}

function selfDescriptor(prefix, ownerKey, semanticMatch) {
  const title = prefix[0].toUpperCase() + prefix.slice(1);
  const spec = OWNER_SPECS[ownerKey];
  return Object.freeze({
    isResult: `is${title}Result`,
    getEvidence: `get${title}ExecutionEvidence`,
    isEvidence: `is${title}ExecutionEvidence`,
    ownerId: spec.ownerId,
    operationId: spec.operationId,
    ownerReason: `owner-issued-${spec.ownerId}-result-required`,
    routeReason: `${spec.ownerId}-live-prerequisite-route-required`,
    authorizationReason: `authorized-${spec.ownerId}-result-required`,
    semanticReason: `${spec.ownerId}-semantic-result-required`,
    matches: semanticMatch,
  });
}

const COMBINATORIAL_MINOR_DESCRIPTOR = selfDescriptor(
  "classicalMorphemeCombinatorialTypeClassification",
  "combinatorial",
  (result) => result.analysisKind === "minor-definition"
    && result.classification === "minor-affixal-morpheme-or-morph",
);

function positionAnalysis(target, request) {
  const requestFailure = plainRequestFailure(
    request,
    ["minorTypeResult", "sequencePosition"],
    "affix-linear-position",
  );
  const prerequisite = analyzePrerequisite(
    target,
    requestFailure ? null : request.minorTypeResult,
    COMBINATORIAL_MINOR_DESCRIPTOR,
  );
  const sequencePosition = requestFailure ? "" : String(request.sequencePosition || "");
  const affixClass = POSITION_BY_COORDINATE[sequencePosition] || "";
  const positionValid = Boolean(affixClass);
  const reason = requestFailure
    || prerequisite.reason
    || (!positionValid ? "affix-sequence-position-unlicensed" : "");
  return deepFreeze({
    reason,
    requestDigestInput: `${prerequisite.result?.coordinates?.meaningfulCandidateKind || ""}:${sequencePosition}`,
    prerequisites: deepFreeze([prerequisite]),
    providedInput: deepFreeze({ sequencePosition, prerequisiteOwnerId: prerequisite.semanticOwnerId }),
    guards: deepFreeze([
      deepFreeze({ stepId: "affix-position-request-shape-validated", branchId: "request-shape", matches: !requestFailure, acceptedReason: "typed-minor-result-and-sequence-coordinate-supplied", rejectedReason: requestFailure || "affix-position-request-invalid" }),
      deepFreeze({ stepId: "minor-affix-result-authority-validated", branchId: "minor-affix-authority", matches: prerequisite.admitted, acceptedReason: "owner-issued-minor-affix-definition-retained", rejectedReason: prerequisite.reason || "owner-issued-minor-affix-result-required" }),
      deepFreeze({ stepId: "affix-sequence-position-coordinate-validated", branchId: "sequence-position", matches: positionValid, acceptedReason: "sequence-position-coordinate-recognized", rejectedReason: "affix-sequence-position-unlicensed", inputState: { sequencePosition } }),
    ]),
    checkpoints: deepFreeze([
      deepFreeze({ stepId: "prefix-infix-suffix-inventory-checkpoint", branchId: "affix-position-inventory-claim", applicable: positionValid, acceptedReason: "three-member-affix-position-inventory-retained", nonapplicableReason: "position-coordinate-unlicensed" }),
      deepFreeze({ stepId: "affix-position-mapping-checkpoint", branchId: "affix-position-mapping-claim", applicable: positionValid, acceptedReason: `${affixClass}-mapped-from-sequence-${sequencePosition}`, nonapplicableReason: "position-coordinate-unlicensed" }),
    ]),
    restrictions: POSITION_RESTRICTIONS,
    payload: deepFreeze({
      classificationStatus: `classified-${affixClass}-from-sequence-position`,
      analysisKind: "linear-position-classification",
      classification: affixClass,
      facts: deepFreeze([
        "an-affix-may-be-prefix-infix-or-suffix",
        `${affixClass}-occurs-at-sequence-${sequencePosition}`,
      ]),
      relations: deepFreeze(["minor-affix-definition-precedes-linear-position-classification"]),
      coordinates: deepFreeze({ sequencePosition, affixClass }),
      prerequisiteOwnerIds: deepFreeze([OWNER_SPECS.combinatorial.ownerId]),
    }),
  });
}

const POSITION_DESCRIPTOR = selfDescriptor(
  "classicalAffixLinearPositionClassification",
  "position",
  (result) => ["prefix", "infix", "suffix"].includes(result.classification),
);

function functionalAnalysis(target, request) {
  const requestFailure = plainRequestFailure(
    request,
    ["affixPositionResult", "informationRole", "stemBoundaryRelation"],
    "affix-functional-type",
  );
  const prerequisite = analyzePrerequisite(
    target,
    requestFailure ? null : request.affixPositionResult,
    POSITION_DESCRIPTOR,
  );
  const position = prerequisite.result?.classification || "";
  const informationRole = requestFailure ? "" : String(request.informationRole || "");
  const boundary = requestFailure ? "" : String(request.stemBoundaryRelation || "");
  const derivational = informationRole === "modifying-or-category-altering"
    && boundary === "inside";
  const inflectional = informationRole === "syntactical"
    && boundary === "outside"
    && position !== "infix";
  const functionType = derivational ? "derivational" : inflectional ? "inflectional" : "";
  const coordinatesValid = Boolean(functionType);
  const reason = requestFailure
    || prerequisite.reason
    || (!coordinatesValid ? "affix-functional-coordinates-incompatible" : "");
  return deepFreeze({
    reason,
    requestDigestInput: `${position}:${informationRole}:${boundary}`,
    prerequisites: deepFreeze([prerequisite]),
    providedInput: deepFreeze({ position, informationRole, stemBoundaryRelation: boundary, prerequisiteOwnerId: prerequisite.semanticOwnerId }),
    guards: deepFreeze([
      deepFreeze({ stepId: "affix-function-request-shape-validated", branchId: "request-shape", matches: !requestFailure, acceptedReason: "typed-affix-result-and-functional-coordinates-supplied", rejectedReason: requestFailure || "affix-function-request-invalid" }),
      deepFreeze({ stepId: "affix-position-result-authority-validated", branchId: "affix-position-authority", matches: prerequisite.admitted, acceptedReason: "owner-issued-affix-position-result-retained", rejectedReason: prerequisite.reason || "owner-issued-affix-position-result-required" }),
      deepFreeze({ stepId: "affix-information-role-and-boundary-validated", branchId: "functional-coordinates", matches: coordinatesValid, acceptedReason: `${functionType}-coordinates-compatible`, rejectedReason: "affix-functional-coordinates-incompatible", inputState: { position, informationRole, boundary } }),
    ]),
    checkpoints: deepFreeze([
      deepFreeze({ stepId: "derivational-inflectional-inventory-checkpoint", branchId: "functional-type-inventory-claim", applicable: coordinatesValid, acceptedReason: "derivational-inflectional-inventory-retained", nonapplicableReason: "functional-coordinates-incompatible" }),
      deepFreeze({ stepId: "functional-type-distinction-checkpoint", branchId: "functional-type-distinction-claim", applicable: coordinatesValid, acceptedReason: "functional-types-remain-distinct", nonapplicableReason: "functional-coordinates-incompatible" }),
      deepFreeze({ stepId: "derivational-information-role-checkpoint", branchId: "derivational-definition-claim", applicable: derivational, acceptedReason: "derivational-information-role-retained", nonapplicableReason: "derivational-classification-not-selected" }),
      deepFreeze({ stepId: "derivational-inside-stem-checkpoint", branchId: "derivational-boundary-claim", applicable: derivational, acceptedReason: "derivational-inside-stem-constraint-retained", nonapplicableReason: "derivational-classification-not-selected" }),
      deepFreeze({ stepId: "inflectional-syntactical-role-checkpoint", branchId: "inflectional-definition-claim", applicable: inflectional, acceptedReason: "inflectional-syntactical-role-retained", nonapplicableReason: "inflectional-classification-not-selected" }),
      deepFreeze({ stepId: "inflectional-outside-stem-checkpoint", branchId: "inflectional-boundary-claim", applicable: inflectional, acceptedReason: "inflectional-outside-stem-constraint-retained", nonapplicableReason: "inflectional-classification-not-selected" }),
    ]),
    restrictions: FUNCTION_RESTRICTIONS,
    payload: deepFreeze({
      classificationStatus: `classified-${functionType}-affix`,
      analysisKind: "functional-type-classification",
      classification: functionType,
      facts: deepFreeze(functionType === "derivational"
        ? [
          "affixes-are-either-derivational-or-inflectional-and-must-not-be-confused",
          "derivational-affix-carries-stem-internal-modifying-or-category-altering-information",
          "derivational-affix-occurs-only-inside-the-stem-it-builds",
        ]
        : [
          "affixes-are-either-derivational-or-inflectional-and-must-not-be-confused",
          "inflectional-affix-carries-syntactical-information",
          "inflectional-affix-is-prefix-or-suffix-outside-the-stem-and-builds-a-paradigmatic-unit",
        ]),
      relations: deepFreeze([`${functionType}-affix-retains-independent-functional-owner-identity`]),
      coordinates: deepFreeze({ position, informationRole, stemBoundaryRelation: boundary }),
      prerequisiteOwnerIds: deepFreeze([OWNER_SPECS.position.ownerId]),
    }),
  });
}

const INFLECTIONAL_DESCRIPTOR = selfDescriptor(
  "classicalAffixFunctionalTypeClassification",
  "function",
  (result) => result.classification === "inflectional",
);

function paradigmAnalysis(target, request) {
  const requestFailure = plainRequestFailure(
    request,
    ["inflectionalAffixResult", "requestedAnalysisKind"],
    "inflectional-paradigm-definition",
  );
  const prerequisite = analyzePrerequisite(
    target,
    requestFailure ? null : request.inflectionalAffixResult,
    INFLECTIONAL_DESCRIPTOR,
  );
  const analysisKind = requestFailure ? "" : String(request.requestedAnalysisKind || "");
  const analysisKindValid = analysisKind === "common-classed-stem-definition";
  const reason = requestFailure
    || prerequisite.reason
    || (!analysisKindValid ? "inflectional-paradigm-analysis-kind-required" : "");
  return deepFreeze({
    reason,
    requestDigestInput: `${prerequisite.result?.classification || ""}:${analysisKind}`,
    prerequisites: deepFreeze([prerequisite]),
    providedInput: deepFreeze({ requestedAnalysisKind: analysisKind, prerequisiteOwnerId: prerequisite.semanticOwnerId }),
    guards: deepFreeze([
      deepFreeze({ stepId: "inflectional-paradigm-request-shape-validated", branchId: "request-shape", matches: !requestFailure, acceptedReason: "typed-inflectional-result-and-definition-request-supplied", rejectedReason: requestFailure || "inflectional-paradigm-request-invalid" }),
      deepFreeze({ stepId: "inflectional-affix-result-authority-validated", branchId: "inflectional-affix-authority", matches: prerequisite.admitted, acceptedReason: "owner-issued-inflectional-affix-result-retained", rejectedReason: prerequisite.reason || "owner-issued-inflectional-affix-result-required" }),
      deepFreeze({ stepId: "inflectional-paradigm-analysis-kind-validated", branchId: "analysis-kind", matches: analysisKindValid, acceptedReason: "common-classed-stem-definition-requested", rejectedReason: "inflectional-paradigm-analysis-kind-required" }),
    ]),
    checkpoints: deepFreeze([
      deepFreeze({ stepId: "inflectional-paradigm-common-stem-checkpoint", branchId: "paradigm-definition-claim", applicable: analysisKindValid, acceptedReason: "complete-variant-set-on-common-classed-stem-definition-retained", nonapplicableReason: "paradigm-definition-not-requested" }),
    ]),
    restrictions: PARADIGM_RESTRICTIONS,
    payload: deepFreeze({
      classificationStatus: "classified-inflectional-paradigm-definition",
      analysisKind,
      classification: "all-inflectional-variants-on-one-common-classed-stem",
      facts: deepFreeze([
        "paradigm-is-the-set-of-all-inflectionally-variant-forms",
        "all-paradigm-forms-are-built-on-one-common-stem-of-one-class",
      ]),
      relations: deepFreeze(["inflectional-affix-classification-precedes-paradigm-definition"]),
      coordinates: deepFreeze({ memberFunctionType: "inflectional" }),
      prerequisiteOwnerIds: deepFreeze([OWNER_SPECS.function.ownerId]),
    }),
  });
}

function dyadAnalysis(target, request) {
  const requestFailure = plainRequestFailure(
    request,
    ["firstInflectionalAffixResult", "secondInflectionalAffixResult", "sequenceRelation"],
    "inflectional-affix-dyad",
  );
  const first = analyzePrerequisite(
    target,
    requestFailure ? null : request.firstInflectionalAffixResult,
    INFLECTIONAL_DESCRIPTOR,
  );
  const second = analyzePrerequisite(
    target,
    requestFailure ? null : request.secondInflectionalAffixResult,
    INFLECTIONAL_DESCRIPTOR,
  );
  const independentMembers = first.admitted && second.admitted
    && first.result !== second.result;
  const relation = requestFailure ? "" : String(request.sequenceRelation || "");
  const inseparable = relation === "inseparable";
  const reason = requestFailure
    || first.reason
    || second.reason
    || (!independentMembers ? "two-independent-inflectional-affix-results-required" : "")
    || (!inseparable ? "inseparable-inflectional-sequence-required" : "");
  return deepFreeze({
    reason,
    requestDigestInput: `${first.result?.classification || ""}:${second.result?.classification || ""}:${relation}`,
    prerequisites: deepFreeze([first, second]),
    providedInput: deepFreeze({ memberCount: 2, sequenceRelation: relation, independentMembers, prerequisiteOwnerIds: [first.semanticOwnerId, second.semanticOwnerId] }),
    guards: deepFreeze([
      deepFreeze({ stepId: "inflectional-dyad-request-shape-validated", branchId: "request-shape", matches: !requestFailure, acceptedReason: "two-typed-members-and-sequence-relation-supplied", rejectedReason: requestFailure || "inflectional-dyad-request-invalid" }),
      deepFreeze({ stepId: "first-inflectional-member-authority-validated", branchId: "first-member-authority", matches: first.admitted, acceptedReason: "first-owner-issued-inflectional-result-retained", rejectedReason: first.reason || "first-owner-issued-inflectional-result-required" }),
      deepFreeze({ stepId: "second-inflectional-member-authority-validated", branchId: "second-member-authority", matches: second.admitted, acceptedReason: "second-owner-issued-inflectional-result-retained", rejectedReason: second.reason || "second-owner-issued-inflectional-result-required" }),
      deepFreeze({ stepId: "inflectional-dyad-member-independence-validated", branchId: "member-independence", matches: independentMembers, acceptedReason: "two-independent-member-results-retained", rejectedReason: "two-independent-inflectional-affix-results-required" }),
      deepFreeze({ stepId: "inflectional-dyad-inseparability-validated", branchId: "inseparability", matches: inseparable, acceptedReason: "inseparable-two-member-sequence", rejectedReason: "inseparable-inflectional-sequence-required" }),
    ]),
    checkpoints: deepFreeze([
      deepFreeze({ stepId: "inseparable-inflectional-dyad-checkpoint", branchId: "dyad-definition-claim", applicable: independentMembers && inseparable, acceptedReason: "two-member-inseparable-dyad-definition-retained", nonapplicableReason: "dyad-conditions-not-satisfied" }),
    ]),
    restrictions: DYAD_RESTRICTIONS,
    payload: deepFreeze({
      classificationStatus: "analyzed-inseparable-inflectional-affix-dyad",
      analysisKind: "inseparable-two-member-sequence",
      classification: "morphemic-or-morphic-dyad",
      facts: deepFreeze([
        "inflectional-affixes-may-occur-in-inseparable-sequences",
        "an-inseparable-two-member-inflectional-sequence-is-a-morphemic-or-morphic-dyad",
        "morphemic-or-morphic-dyads-play-a-major-structural-role-in-Nahuatl",
      ]),
      relations: deepFreeze(["two-independent-inflectional-members-compose-one-dyad-analysis"]),
      coordinates: deepFreeze({ memberCount: 2, sequenceRelation: relation }),
      prerequisiteOwnerIds: deepFreeze([OWNER_SPECS.function.ownerId, OWNER_SPECS.function.ownerId]),
    }),
  });
}

const COMBINATORIAL_MAJOR_DESCRIPTOR = selfDescriptor(
  "classicalMorphemeCombinatorialTypeClassification",
  "combinatorial",
  (result) => result.analysisKind === "major-definition"
    && result.classification === "major-morpheme-or-morph",
);

function hierarchyAnalysis(target, request) {
  const requestFailure = plainRequestFailure(
    request,
    ["majorTypeResult", "minorTypeResult", "requestedHierarchy"],
    "meaningful-structural-rank-hierarchy",
  );
  const major = analyzePrerequisite(
    target,
    requestFailure ? null : request.majorTypeResult,
    COMBINATORIAL_MAJOR_DESCRIPTOR,
  );
  const minor = analyzePrerequisite(
    target,
    requestFailure ? null : request.minorTypeResult,
    COMBINATORIAL_MINOR_DESCRIPTOR,
  );
  const hierarchy = requestFailure ? "" : String(request.requestedHierarchy || "");
  const hierarchyValid = hierarchy === "nahuatl-meaningful-ranks";
  const independentPrerequisites = major.admitted && minor.admitted
    && major.result !== minor.result;
  const reason = requestFailure
    || major.reason
    || minor.reason
    || (!independentPrerequisites ? "independent-major-and-minor-results-required" : "")
    || (!hierarchyValid ? "nahuatl-meaningful-rank-hierarchy-required" : "");
  return deepFreeze({
    reason,
    requestDigestInput: `${major.result?.analysisKind || ""}:${minor.result?.analysisKind || ""}:${hierarchy}`,
    prerequisites: deepFreeze([major, minor]),
    providedInput: deepFreeze({ requestedHierarchy: hierarchy, independentPrerequisites, prerequisiteOwnerIds: [major.semanticOwnerId, minor.semanticOwnerId] }),
    guards: deepFreeze([
      deepFreeze({ stepId: "meaningful-hierarchy-request-shape-validated", branchId: "request-shape", matches: !requestFailure, acceptedReason: "major-minor-results-and-hierarchy-request-supplied", rejectedReason: requestFailure || "meaningful-hierarchy-request-invalid" }),
      deepFreeze({ stepId: "major-combinatorial-result-authority-validated", branchId: "major-result-authority", matches: major.admitted, acceptedReason: "owner-issued-major-definition-retained", rejectedReason: major.reason || "owner-issued-major-definition-result-required" }),
      deepFreeze({ stepId: "minor-combinatorial-result-authority-validated", branchId: "minor-result-authority", matches: minor.admitted, acceptedReason: "owner-issued-minor-definition-retained", rejectedReason: minor.reason || "owner-issued-minor-definition-result-required" }),
      deepFreeze({ stepId: "major-minor-prerequisite-independence-validated", branchId: "prerequisite-independence", matches: independentPrerequisites, acceptedReason: "independent-major-and-minor-results-retained", rejectedReason: "independent-major-and-minor-results-required" }),
      deepFreeze({ stepId: "nahuatl-meaningful-hierarchy-scope-validated", branchId: "hierarchy-scope", matches: hierarchyValid, acceptedReason: "nahuatl-meaningful-rank-hierarchy-selected", rejectedReason: "nahuatl-meaningful-rank-hierarchy-required" }),
    ]),
    checkpoints: deepFreeze([
      deepFreeze({ stepId: "meaningful-hierarchy-intake-checkpoint", branchId: "hierarchy-intake-claim", applicable: hierarchyValid, acceptedReason: "major-minor-distinction-precedes-hierarchy-analysis", nonapplicableReason: "nahuatl-hierarchy-not-selected" }),
      deepFreeze({ stepId: "meaningful-hierarchy-stage-grouping-checkpoint", branchId: "stage-grouping-claim", applicable: hierarchyValid, acceptedReason: "ascending-ranks-grouped-into-stages", nonapplicableReason: "nahuatl-hierarchy-not-selected" }),
      deepFreeze({ stepId: "meaningful-hierarchy-lower-stage-dependency-checkpoint", branchId: "lower-stage-dependency-claim", applicable: hierarchyValid, acceptedReason: "higher-ranks-require-lower-stage", nonapplicableReason: "nahuatl-hierarchy-not-selected" }),
      deepFreeze({ stepId: "nahuatl-meaningful-rank-schema-checkpoint", branchId: "nahuatl-schema-claim", applicable: hierarchyValid, acceptedReason: "nahuatl-seven-stage-schema-retained", nonapplicableReason: "nahuatl-hierarchy-not-selected" }),
    ]),
    restrictions: HIERARCHY_RESTRICTIONS,
    payload: deepFreeze({
      classificationStatus: "validated-nahuatl-meaningful-structural-rank-hierarchy",
      analysisKind: "rank-stage-schema-validation",
      classification: "nahuatl-meaningful-rank-hierarchy",
      facts: deepFreeze([
        "major-and-minor-morpheme-or-morph-distinction-precedes-meaningful-rank-analysis",
        "ascending-meaningful-ranks-are-grouped-into-stages",
        "no-higher-rank-exists-without-a-requisite-lower-stage",
        "nahuatl-stages-ascend-from-morpheme-or-morph-through-root-stock-stem-nuclear-clause-or-particle-group-and-sentence",
      ]),
      relations: deepFreeze(["each-higher-stage-depends-on-a-requisite-lower-stage"]),
      coordinates: deepFreeze({ hierarchy, stageCount: NAHUATL_HIERARCHY_STAGES.length, stages: NAHUATL_HIERARCHY_STAGES }),
      prerequisiteOwnerIds: deepFreeze([OWNER_SPECS.combinatorial.ownerId, OWNER_SPECS.combinatorial.ownerId]),
    }),
  });
}

function analyzePostStemRankPrerequisite(target, result) {
  const ownerIssued = call(target, "isClassicalGrammarConceptResult", result) === true;
  const evidence = ownerIssued
    ? call(target, "getClassicalGrammarConceptExecutionEvidence", result)
    : null;
  const routeRetained = ownerIssued
    && call(
      target,
      "isClassicalGrammarConceptExecutionEvidence",
      evidence,
      result,
    ) === true;
  const evaluatedOperationId = evidence?.evaluatedOperationId
    || evidence?.execution?.operationId
    || "";
  const particle = routeRetained
    && result?.semanticOwnerId === "classical-nuclear-clause-structure"
    && evaluatedOperationId === "classical.nuclear-clause.rank.validate"
    && result?.selection === "particle"
    && result?.authorizationStatus === "authorized"
    && result?.classification === "word";
  const nuclearClause = routeRetained
    && result?.semanticOwnerId === "classical-nuclear-clause-structure"
    && evaluatedOperationId === "classical.nuclear-clause.rank.validate"
    && result?.selection === "nuclear-clause-as-word"
    && result?.authorizationStatus === "blocked"
    && result?.blockReason === "nuclear-clause-is-not-word";
  const semanticMatch = particle || nuclearClause;
  const reason = !ownerIssued
    ? "owner-issued-classical-nuclear-clause-structure-result-required"
    : !routeRetained
      ? "classical-nuclear-clause-structure-live-prerequisite-route-required"
      : !semanticMatch
        ? "post-stem-unit-rank-result-required"
        : "";
  return deepFreeze({
    ownerIssued,
    routeRetained,
    authorized: semanticMatch,
    semanticMatch,
    admitted: reason === "",
    reason,
    result,
    evidence,
    semanticOwnerId: result?.semanticOwnerId || "",
    operationId: evaluatedOperationId,
    classifiedUnitKind: particle ? "particle" : nuclearClause ? "nuclear-clause" : "",
  });
}

function postStemAnalysis(target, request) {
  const requestFailure = plainRequestFailure(
    request,
    ["rankResult", "unitDisposition"],
    "nahuatl-post-stem-unit",
  );
  const prerequisite = analyzePostStemRankPrerequisite(
    target,
    requestFailure ? null : request.rankResult,
  );
  const disposition = requestFailure ? "" : String(request.unitDisposition || "");
  const dispositionValid = POST_STEM_DISPOSITIONS.includes(disposition);
  const expectedUnitKind = disposition
    === "monomorphemic-invariant-sentence-fragment"
    ? "particle"
    : "nuclear-clause";
  const resultMatchesDisposition = prerequisite.admitted
    && prerequisite.classifiedUnitKind === expectedUnitKind;
  const reason = requestFailure
    || prerequisite.reason
    || (!dispositionValid ? "nahuatl-post-stem-unit-disposition-required" : "")
    || (!resultMatchesDisposition ? "post-stem-unit-result-disposition-mismatch" : "");
  const facts = disposition === "paradigmatic-unit"
    ? ["nahuatl-paradigmatic-units-are-nuclear-clauses-not-words"]
    : disposition === "monomorphemic-invariant-sentence-fragment"
      ? ["nahuatl-has-monomorphemic-nonparadigmatic-invariant-sentence-fragment-particles"]
      : ["apart-from-particles-all-structural-units-at-this-rank-are-nuclear-clauses"];
  return deepFreeze({
    reason,
    requestDigestInput: `${prerequisite.classifiedUnitKind}:${disposition}`,
    prerequisites: deepFreeze([prerequisite]),
    providedInput: deepFreeze({
      unitDisposition: disposition,
      prerequisiteUnitKind: prerequisite.classifiedUnitKind,
      prerequisiteOwnerId: prerequisite.semanticOwnerId,
    }),
    guards: deepFreeze([
      deepFreeze({ stepId: "post-stem-request-shape-validated", branchId: "request-shape", matches: !requestFailure, acceptedReason: "typed-rank-result-and-unit-disposition-supplied", rejectedReason: requestFailure || "post-stem-request-invalid" }),
      deepFreeze({ stepId: "post-stem-rank-result-authority-validated", branchId: "rank-result-authority", matches: prerequisite.admitted, acceptedReason: "owner-issued-route-retained-rank-result", rejectedReason: prerequisite.reason || "post-stem-rank-result-required" }),
      deepFreeze({ stepId: "post-stem-unit-disposition-validated", branchId: "unit-disposition", matches: dispositionValid, acceptedReason: "post-stem-unit-disposition-recognized", rejectedReason: "nahuatl-post-stem-unit-disposition-required" }),
      deepFreeze({ stepId: "post-stem-result-disposition-match-validated", branchId: "unit-result-match", matches: resultMatchesDisposition, acceptedReason: `${expectedUnitKind}-result-matches-unit-disposition`, rejectedReason: "post-stem-unit-result-disposition-mismatch" }),
    ]),
    checkpoints: deepFreeze([
      deepFreeze({ stepId: "nahuatl-paradigmatic-nuclear-clause-checkpoint", branchId: "paradigmatic-unit-claim", applicable: disposition === "paradigmatic-unit", acceptedReason: "paradigmatic-unit-is-nuclear-clause-not-word", nonapplicableReason: "paradigmatic-unit-not-requested" }),
      deepFreeze({ stepId: "nahuatl-particle-exception-checkpoint", branchId: "particle-exception-claim", applicable: disposition === "monomorphemic-invariant-sentence-fragment", acceptedReason: "monomorphemic-invariant-particle-exception-retained", nonapplicableReason: "particle-exception-not-requested" }),
      deepFreeze({ stepId: "nahuatl-post-stem-nuclear-clause-default-checkpoint", branchId: "nuclear-clause-default-claim", applicable: disposition === "other-post-stem-structural-unit", acceptedReason: "nonparticle-post-stem-unit-is-nuclear-clause", nonapplicableReason: "post-stem-default-not-requested" }),
    ]),
    restrictions: POST_STEM_RESTRICTIONS,
    payload: deepFreeze({
      classificationStatus: `classified-nahuatl-post-stem-${expectedUnitKind}`,
      analysisKind: disposition,
      classification: expectedUnitKind,
      facts: deepFreeze(facts),
      relations: deepFreeze(["particle-exception-and-nuclear-clause-default-remain-distinct"]),
      coordinates: deepFreeze({ unitDisposition: disposition, unitKind: expectedUnitKind }),
      prerequisiteOwnerIds: deepFreeze(["classical-nuclear-clause-structure"]),
    }),
  });
}

function affixDemotionAnalysis(target, request) {
  const requestFailure = plainRequestFailure(
    request,
    ["inflectionalAffixResult", "processKind", "requestedBoundaryRelation"],
    "inflectional-affix-demotion",
  );
  const prerequisite = analyzePrerequisite(
    target,
    requestFailure ? null : request.inflectionalAffixResult,
    INFLECTIONAL_DESCRIPTOR,
  );
  const processKind = requestFailure ? "" : String(request.processKind || "");
  const boundaryRelation = requestFailure
    ? ""
    : String(request.requestedBoundaryRelation || "");
  const processValid = ["conversional", "derivational"].includes(processKind);
  const boundaryValid = boundaryRelation === "stem-internal";
  const reason = requestFailure
    || prerequisite.reason
    || (!processValid ? "conversional-or-derivational-process-required" : "")
    || (!boundaryValid ? "stem-internal-demotion-target-required" : "");
  return deepFreeze({
    reason,
    requestDigestInput: `${prerequisite.result?.classification || ""}:${processKind}:${boundaryRelation}`,
    prerequisites: deepFreeze([prerequisite]),
    providedInput: deepFreeze({ processKind, requestedBoundaryRelation: boundaryRelation, prerequisiteOwnerId: prerequisite.semanticOwnerId }),
    guards: deepFreeze([
      deepFreeze({ stepId: "affix-demotion-request-shape-validated", branchId: "request-shape", matches: !requestFailure, acceptedReason: "typed-inflectional-result-process-and-boundary-supplied", rejectedReason: requestFailure || "affix-demotion-request-invalid" }),
      deepFreeze({ stepId: "affix-demotion-inflectional-result-authority-validated", branchId: "inflectional-result-authority", matches: prerequisite.admitted, acceptedReason: "owner-issued-inflectional-affix-result-retained", rejectedReason: prerequisite.reason || "owner-issued-inflectional-affix-result-required" }),
      deepFreeze({ stepId: "affix-demotion-process-validated", branchId: "demotion-process", matches: processValid, acceptedReason: `${processKind}-demotion-process-authorized`, rejectedReason: "conversional-or-derivational-process-required" }),
      deepFreeze({ stepId: "affix-demotion-boundary-target-validated", branchId: "boundary-target", matches: boundaryValid, acceptedReason: "stem-internal-boundary-target-authorized", rejectedReason: "stem-internal-demotion-target-required" }),
    ]),
    checkpoints: deepFreeze([
      deepFreeze({ stepId: "inflectional-affix-external-to-internal-demotion-checkpoint", branchId: "affix-demotion-claim", applicable: processValid && boundaryValid, acceptedReason: "inflectional-affix-demoted-from-stem-external-to-stem-internal", nonapplicableReason: "demotion-conditions-not-satisfied" }),
    ]),
    restrictions: AFFIX_DEMOTION_RESTRICTIONS,
    payload: deepFreeze({
      classificationStatus: "executed-inflectional-affix-stem-internal-demotion",
      analysisKind: `${processKind}-affix-demotion`,
      classification: "stem-internal-demoted-inflectional-affix",
      facts: deepFreeze([
        "conversional-and-derivational-processes-can-demote-inflectional-affixes",
        "demotion-moves-an-inflectional-affix-from-original-stem-external-to-stem-internal-status",
      ]),
      relations: deepFreeze(["inflectional-affix-classification-precedes-stem-internal-demotion"]),
      coordinates: deepFreeze({ processKind, sourceBoundaryRelation: "stem-external", targetBoundaryRelation: boundaryRelation }),
      prerequisiteOwnerIds: deepFreeze([OWNER_SPECS.function.ownerId]),
    }),
  });
}

const HIERARCHY_DESCRIPTOR = selfDescriptor(
  "classicalMeaningfulStructuralRankHierarchy",
  "hierarchy",
  (result) => result.classification === "nahuatl-meaningful-rank-hierarchy",
);

function rankIndex(rank) {
  return NAHUATL_HIERARCHY_STAGES.findIndex((stage) => stage.includes(rank));
}

function rankSourceUpgradeAnalysis(target, request) {
  const requestFailure = plainRequestFailure(
    request,
    ["hierarchyResult", "sourceRank", "targetRank", "transitionMode"],
    "meaningful-rank-source-upgrade",
  );
  const prerequisite = analyzePrerequisite(
    target,
    requestFailure ? null : request.hierarchyResult,
    HIERARCHY_DESCRIPTOR,
  );
  const sourceRank = requestFailure ? "" : String(request.sourceRank || "");
  const targetRank = requestFailure ? "" : String(request.targetRank || "");
  const transitionMode = requestFailure ? "" : String(request.transitionMode || "");
  const sourceIndex = rankIndex(sourceRank);
  const targetIndex = rankIndex(targetRank);
  const rankCoordinatesValid = sourceIndex >= 0 && targetIndex >= 0;
  const normalSource = rankCoordinatesValid
    && transitionMode === "normal-adjacent-source"
    && targetIndex === sourceIndex + 1;
  const explicitUpgrade = rankCoordinatesValid
    && transitionMode === "explicit-upgrade"
    && targetIndex > sourceIndex;
  const admissible = normalSource || explicitUpgrade;
  const reason = requestFailure
    || prerequisite.reason
    || (!rankCoordinatesValid ? "meaningful-rank-coordinates-required" : "")
    || (!admissible ? "meaningful-rank-source-or-upgrade-not-admissible" : "");
  return deepFreeze({
    reason,
    requestDigestInput: `${sourceRank}:${targetRank}:${transitionMode}`,
    prerequisites: deepFreeze([prerequisite]),
    providedInput: deepFreeze({ sourceRank, targetRank, transitionMode, prerequisiteOwnerId: prerequisite.semanticOwnerId }),
    guards: deepFreeze([
      deepFreeze({ stepId: "rank-source-upgrade-request-shape-validated", branchId: "request-shape", matches: !requestFailure, acceptedReason: "typed-hierarchy-and-rank-transition-coordinates-supplied", rejectedReason: requestFailure || "rank-source-upgrade-request-invalid" }),
      deepFreeze({ stepId: "rank-source-upgrade-hierarchy-authority-validated", branchId: "hierarchy-authority", matches: prerequisite.admitted, acceptedReason: "owner-issued-Nahuatl-hierarchy-result-retained", rejectedReason: prerequisite.reason || "owner-issued-Nahuatl-hierarchy-result-required" }),
      deepFreeze({ stepId: "rank-source-upgrade-rank-coordinates-validated", branchId: "rank-coordinates", matches: rankCoordinatesValid, acceptedReason: "source-and-target-ranks-occur-in-Nahuatl-hierarchy", rejectedReason: "meaningful-rank-coordinates-required" }),
      deepFreeze({ stepId: "rank-source-upgrade-admissibility-validated", branchId: "transition-admissibility", matches: admissible, acceptedReason: normalSource ? "normal-next-higher-rank-source-retained" : "explicit-lower-to-higher-rank-upgrade-retained", rejectedReason: "meaningful-rank-source-or-upgrade-not-admissible" }),
    ]),
    checkpoints: deepFreeze([
      deepFreeze({ stepId: "normal-next-higher-rank-source-checkpoint", branchId: "normal-source-claim", applicable: normalSource, acceptedReason: "lower-rank-normally-supplies-next-higher-rank", nonapplicableReason: "normal-adjacent-source-not-selected" }),
      deepFreeze({ stepId: "explicit-lower-rank-upgrade-checkpoint", branchId: "upgrade-claim", applicable: explicitUpgrade, acceptedReason: "lower-rank-may-be-explicitly-upgraded-to-higher-rank", nonapplicableReason: "explicit-upgrade-not-selected" }),
    ]),
    restrictions: RANK_SOURCE_UPGRADE_RESTRICTIONS,
    payload: deepFreeze({
      classificationStatus: normalSource ? "validated-normal-adjacent-rank-source" : "validated-explicit-meaningful-rank-upgrade",
      analysisKind: transitionMode,
      classification: normalSource ? "normal-adjacent-rank-source" : "explicit-meaningful-rank-upgrade",
      facts: deepFreeze(normalSource
        ? ["a-lower-rank-unit-normally-serves-as-source-for-the-next-higher-rank"]
        : ["a-lower-rank-unit-can-be-explicitly-upgraded-to-a-higher-rank"]),
      relations: deepFreeze(["downgrade-remains-outside-this-owner"]),
      coordinates: deepFreeze({ sourceRank, targetRank, transitionMode, sourceIndex, targetIndex }),
      prerequisiteOwnerIds: deepFreeze([OWNER_SPECS.hierarchy.ownerId]),
    }),
  });
}

function rankDowngradeAnalysis(target, request) {
  const requestFailure = plainRequestFailure(
    request,
    ["hierarchyResult", "sourceRank", "targetRank", "transitionMode"],
    "meaningful-rank-downgrade",
  );
  const prerequisite = analyzePrerequisite(
    target,
    requestFailure ? null : request.hierarchyResult,
    HIERARCHY_DESCRIPTOR,
  );
  const sourceRank = requestFailure ? "" : String(request.sourceRank || "");
  const targetRank = requestFailure ? "" : String(request.targetRank || "");
  const transitionMode = requestFailure ? "" : String(request.transitionMode || "");
  const sourceIndex = rankIndex(sourceRank);
  const targetIndex = rankIndex(targetRank);
  const coordinatesValid = sourceIndex >= 0 && targetIndex >= 0;
  const explicitDowngrade = coordinatesValid
    && transitionMode === "explicit-downgrade"
    && sourceIndex > targetIndex;
  const nuclearClauseToStem = explicitDowngrade
    && sourceRank === "nuclear-clause"
    && targetRank === "stem";
  const reason = requestFailure
    || prerequisite.reason
    || (!coordinatesValid ? "meaningful-rank-coordinates-required" : "")
    || (!explicitDowngrade ? "explicit-higher-to-lower-rank-downgrade-required" : "");
  return deepFreeze({
    reason,
    requestDigestInput: `${sourceRank}:${targetRank}:${transitionMode}`,
    prerequisites: deepFreeze([prerequisite]),
    providedInput: deepFreeze({ sourceRank, targetRank, transitionMode, prerequisiteOwnerId: prerequisite.semanticOwnerId }),
    guards: deepFreeze([
      deepFreeze({ stepId: "rank-downgrade-request-shape-validated", branchId: "request-shape", matches: !requestFailure, acceptedReason: "typed-hierarchy-and-downgrade-coordinates-supplied", rejectedReason: requestFailure || "rank-downgrade-request-invalid" }),
      deepFreeze({ stepId: "rank-downgrade-hierarchy-authority-validated", branchId: "hierarchy-authority", matches: prerequisite.admitted, acceptedReason: "owner-issued-Nahuatl-hierarchy-result-retained", rejectedReason: prerequisite.reason || "owner-issued-Nahuatl-hierarchy-result-required" }),
      deepFreeze({ stepId: "rank-downgrade-coordinates-validated", branchId: "rank-coordinates", matches: coordinatesValid, acceptedReason: "source-and-target-ranks-occur-in-Nahuatl-hierarchy", rejectedReason: "meaningful-rank-coordinates-required" }),
      deepFreeze({ stepId: "rank-downgrade-direction-validated", branchId: "downgrade-direction", matches: explicitDowngrade, acceptedReason: "explicit-higher-to-lower-rank-transition", rejectedReason: "explicit-higher-to-lower-rank-downgrade-required" }),
    ]),
    checkpoints: deepFreeze([
      deepFreeze({ stepId: "higher-rank-downgrade-checkpoint", branchId: "general-downgrade-claim", applicable: explicitDowngrade, acceptedReason: "higher-rank-unit-downgraded-to-lower-rank-function", nonapplicableReason: "explicit-downgrade-not-selected" }),
      deepFreeze({ stepId: "nuclear-clause-to-stem-downgrade-checkpoint", branchId: "Nahuatl-nuclear-clause-downgrade-claim", applicable: nuclearClauseToStem, acceptedReason: "Nahuatl-nuclear-clause-downgraded-to-stem-rank-and-function", nonapplicableReason: "different-rank-downgrade-selected" }),
    ]),
    restrictions: RANK_DOWNGRADE_RESTRICTIONS,
    payload: deepFreeze({
      classificationStatus: "executed-explicit-meaningful-rank-downgrade",
      analysisKind: transitionMode,
      classification: nuclearClauseToStem
        ? "nuclear-clause-downgraded-to-stem"
        : "explicit-meaningful-rank-downgrade",
      facts: deepFreeze([
        "a-higher-rank-unit-can-be-downgraded-to-function-at-a-lower-rank",
        ...(nuclearClauseToStem
          ? ["a-Nahuatl-nuclear-clause-can-be-downgraded-to-stem-rank-and-function"]
          : []),
      ]),
      relations: deepFreeze(["downgrade-remains-distinct-from-normal-source-and-upgrade"]),
      coordinates: deepFreeze({ sourceRank, targetRank, transitionMode, sourceIndex, targetIndex }),
      prerequisiteOwnerIds: deepFreeze([OWNER_SPECS.hierarchy.ownerId]),
    }),
  });
}

function rootDefinitionAnalysis(target, request) {
  const requestFailure = plainRequestFailure(
    request,
    ["majorTypeResult", "majorUnitCount", "requestedStructureKind"],
    "root-major-morpheme-definition",
  );
  const prerequisite = analyzePrerequisite(
    target,
    requestFailure ? null : request.majorTypeResult,
    COMBINATORIAL_MAJOR_DESCRIPTOR,
  );
  const majorUnitCount = requestFailure ? 0 : Number(request.majorUnitCount);
  const structureKind = requestFailure ? "" : String(request.requestedStructureKind || "");
  const countValid = majorUnitCount === 1;
  const structureValid = structureKind === "root";
  const reason = requestFailure
    || prerequisite.reason
    || (!countValid ? "root-single-major-morpheme-count-required" : "")
    || (!structureValid ? "root-structure-kind-required" : "");
  return deepFreeze({
    reason,
    requestDigestInput: `${prerequisite.result?.classification || ""}:${majorUnitCount}:${structureKind}`,
    prerequisites: deepFreeze([prerequisite]),
    providedInput: deepFreeze({ majorUnitCount, requestedStructureKind: structureKind, prerequisiteOwnerId: prerequisite.semanticOwnerId }),
    guards: deepFreeze([
      deepFreeze({ stepId: "root-definition-request-shape-validated", branchId: "request-shape", matches: !requestFailure, acceptedReason: "typed-major-result-count-and-structure-kind-supplied", rejectedReason: requestFailure || "root-definition-request-invalid" }),
      deepFreeze({ stepId: "root-definition-major-result-authority-validated", branchId: "major-result-authority", matches: prerequisite.admitted, acceptedReason: "owner-issued-major-morpheme-result-retained", rejectedReason: prerequisite.reason || "owner-issued-major-morpheme-result-required" }),
      deepFreeze({ stepId: "root-definition-major-count-validated", branchId: "major-unit-count", matches: countValid, acceptedReason: "exactly-one-major-morpheme-or-morph", rejectedReason: "root-single-major-morpheme-count-required" }),
      deepFreeze({ stepId: "root-definition-structure-kind-validated", branchId: "structure-kind", matches: structureValid, acceptedReason: "root-structure-kind-selected", rejectedReason: "root-structure-kind-required" }),
    ]),
    checkpoints: deepFreeze([
      deepFreeze({ stepId: "root-single-major-morpheme-checkpoint", branchId: "root-definition-claim", applicable: countValid && structureValid, acceptedReason: "root-is-one-major-morpheme-or-morph", nonapplicableReason: "root-definition-conditions-not-satisfied" }),
    ]),
    restrictions: ROOT_DEFINITION_RESTRICTIONS,
    payload: deepFreeze({
      classificationStatus: "validated-root-major-morpheme-definition",
      analysisKind: "root-structure-definition",
      classification: "root",
      facts: deepFreeze(["a-root-is-a-single-major-morpheme-or-morph"]),
      relations: deepFreeze(["major-morpheme-classification-precedes-root-definition"]),
      coordinates: deepFreeze({ structureKind, majorUnitCount }),
      prerequisiteOwnerIds: deepFreeze([OWNER_SPECS.combinatorial.ownerId]),
    }),
  });
}

const ROOT_DESCRIPTOR = selfDescriptor(
  "classicalRootMajorMorphemeDefinition",
  "rootDefinition",
  (result) => result.classification === "root"
    && result.coordinates?.majorUnitCount === 1,
);
const DERIVATIONAL_SUFFIX_DESCRIPTOR = selfDescriptor(
  "classicalAffixFunctionalTypeClassification",
  "function",
  (result) => result.classification === "derivational"
    && result.coordinates?.position === "suffix"
    && result.coordinates?.stemBoundaryRelation === "inside",
);
const DERIVATIONAL_AFFIX_DESCRIPTOR = selfDescriptor(
  "classicalAffixFunctionalTypeClassification",
  "function",
  (result) => result.classification === "derivational"
    && result.coordinates?.stemBoundaryRelation === "inside",
);

function directStemAnalysis(target, request) {
  const requestFailure = plainRequestFailure(
    request,
    ["baseResult", "derivationalAffixResult", "formationKind"],
    "direct-stem-formation",
  );
  const formationKind = requestFailure ? "" : String(request.formationKind || "");
  const rootBase = analyzePrerequisite(
    target,
    requestFailure ? null : request.baseResult,
    ROOT_DESCRIPTOR,
  );
  const stemBase = formationKind === "stem-plus-derivational-affix"
    ? analyzeStemPrerequisite(target, requestFailure ? null : request.baseResult)
    : null;
  const affix = formationKind === "root-alone"
    ? null
    : analyzePrerequisite(
      target,
      requestFailure ? null : request.derivationalAffixResult,
      DERIVATIONAL_AFFIX_DESCRIPTOR,
    );
  const formationValid = [
    "root-alone",
    "root-plus-derivational-affix",
    "stem-plus-derivational-affix",
  ].includes(formationKind);
  const baseAdmitted = formationKind === "stem-plus-derivational-affix"
    ? stemBase?.admitted === true
    : rootBase.admitted;
  const affixAdmitted = formationKind === "root-alone"
    ? request?.derivationalAffixResult === null
    : affix?.admitted === true;
  const reason = requestFailure
    || (!formationValid ? "direct-stem-formation-kind-required" : "")
    || (!baseAdmitted
      ? formationKind === "stem-plus-derivational-affix"
        ? stemBase?.reason || "owner-issued-stem-base-result-required"
        : rootBase.reason || "owner-issued-root-base-result-required"
      : "")
    || (!affixAdmitted
      ? formationKind === "root-alone"
        ? "root-alone-formation-requires-no-derivational-affix"
        : affix?.reason || "owner-issued-derivational-affix-result-required"
      : "");
  const base = formationKind === "stem-plus-derivational-affix" ? stemBase : rootBase;
  const facts = formationKind === "root-alone"
    ? ["a-Nahuatl-stem-may-consist-of-a-root-alone"]
    : formationKind === "root-plus-derivational-affix"
      ? ["a-Nahuatl-stem-may-consist-of-a-root-plus-a-derivational-affix"]
      : ["a-Nahuatl-stem-may-consist-of-an-existing-stem-plus-another-derivational-affix"];
  return deepFreeze({
    reason,
    requestDigestInput: `${formationKind}:${base?.semanticOwnerId || ""}:${affix?.semanticOwnerId || ""}`,
    prerequisites: deepFreeze([base, ...(affix ? [affix] : [])]),
    providedInput: deepFreeze({ formationKind, baseOwnerId: base?.semanticOwnerId || "", affixOwnerId: affix?.semanticOwnerId || "" }),
    guards: deepFreeze([
      deepFreeze({ stepId: "direct-stem-request-shape-validated", branchId: "request-shape", matches: !requestFailure, acceptedReason: "typed-base-affix-and-formation-kind-supplied", rejectedReason: requestFailure || "direct-stem-request-invalid" }),
      deepFreeze({ stepId: "direct-stem-formation-kind-validated", branchId: "formation-kind", matches: formationValid, acceptedReason: `${formationKind}-selected`, rejectedReason: "direct-stem-formation-kind-required" }),
      deepFreeze({ stepId: "direct-stem-base-authority-validated", branchId: "base-authority", matches: baseAdmitted, acceptedReason: "owner-issued-root-or-stem-base-retained", rejectedReason: base?.reason || "owner-issued-root-or-stem-base-result-required" }),
      deepFreeze({ stepId: "direct-stem-derivational-affix-validated", branchId: "derivational-affix", matches: affixAdmitted, acceptedReason: formationKind === "root-alone" ? "root-alone-has-no-affix" : "owner-issued-derivational-affix-retained", rejectedReason: formationKind === "root-alone" ? "root-alone-formation-requires-no-derivational-affix" : affix?.reason || "owner-issued-derivational-affix-result-required" }),
    ]),
    checkpoints: deepFreeze([
      deepFreeze({ stepId: "direct-Nahuatl-stem-formation-checkpoint", branchId: formationKind, applicable: formationValid && baseAdmitted && affixAdmitted, acceptedReason: `${formationKind}-forms-Nahuatl-stem`, nonapplicableReason: "direct-stem-conditions-not-satisfied" }),
    ]),
    restrictions: DIRECT_STEM_RESTRICTIONS,
    payload: deepFreeze({
      classificationStatus: `formed-direct-stem-by-${formationKind}`,
      analysisKind: formationKind,
      classification: "direct-stem",
      facts: deepFreeze(facts),
      relations: deepFreeze(["root-stem-and-derivational-affix-ranks-remain-explicit"]),
      coordinates: deepFreeze({ formationKind, resultRank: "stem" }),
      prerequisiteOwnerIds: deepFreeze([base?.semanticOwnerId || "", ...(affix ? [affix.semanticOwnerId] : [])]),
    }),
  });
}

function stockStemAnalysis(target, request) {
  const requestFailure = plainRequestFailure(
    request,
    ["rootResult", "derivationalSuffixResult", "requestedFormation"],
    "stock-mediated-stem-formation",
  );
  const root = analyzePrerequisite(
    target,
    requestFailure ? null : request.rootResult,
    ROOT_DESCRIPTOR,
  );
  const suffix = analyzePrerequisite(
    target,
    requestFailure ? null : request.derivationalSuffixResult,
    DERIVATIONAL_SUFFIX_DESCRIPTOR,
  );
  const formation = requestFailure ? "" : String(request.requestedFormation || "");
  const formationValid = formation === "root-plus-derivational-suffix-via-stock-to-stem";
  const independentPrerequisites = root.admitted && suffix.admitted
    && root.result !== suffix.result;
  const reason = requestFailure
    || root.reason
    || suffix.reason
    || (!independentPrerequisites ? "independent-root-and-derivational-suffix-results-required" : "")
    || (!formationValid ? "stock-mediated-two-step-stem-formation-required" : "");
  return deepFreeze({
    reason,
    requestDigestInput: `${root.result?.classification || ""}:${suffix.result?.classification || ""}:${formation}`,
    prerequisites: deepFreeze([root, suffix]),
    providedInput: deepFreeze({ requestedFormation: formation, independentPrerequisites, prerequisiteOwnerIds: [root.semanticOwnerId, suffix.semanticOwnerId] }),
    guards: deepFreeze([
      deepFreeze({ stepId: "stock-stem-request-shape-validated", branchId: "request-shape", matches: !requestFailure, acceptedReason: "typed-root-suffix-results-and-formation-request-supplied", rejectedReason: requestFailure || "stock-stem-request-invalid" }),
      deepFreeze({ stepId: "stock-stem-root-result-authority-validated", branchId: "root-result-authority", matches: root.admitted, acceptedReason: "owner-issued-root-result-retained", rejectedReason: root.reason || "owner-issued-root-result-required" }),
      deepFreeze({ stepId: "stock-stem-derivational-suffix-authority-validated", branchId: "derivational-suffix-authority", matches: suffix.admitted, acceptedReason: "owner-issued-derivational-suffix-result-retained", rejectedReason: suffix.reason || "owner-issued-derivational-suffix-result-required" }),
      deepFreeze({ stepId: "stock-stem-prerequisite-independence-validated", branchId: "prerequisite-independence", matches: independentPrerequisites, acceptedReason: "independent-root-and-suffix-results-retained", rejectedReason: "independent-root-and-derivational-suffix-results-required" }),
      deepFreeze({ stepId: "stock-stem-formation-path-validated", branchId: "formation-path", matches: formationValid, acceptedReason: "root-suffix-stock-to-stem-path-authorized", rejectedReason: "stock-mediated-two-step-stem-formation-required" }),
    ]),
    checkpoints: deepFreeze([
      deepFreeze({ stepId: "root-plus-derivational-suffix-stock-formation-checkpoint", branchId: "stock-formation-step", applicable: formationValid, acceptedReason: "root-plus-derivational-suffix-forms-stock", nonapplicableReason: "stock-mediated-path-not-selected" }),
      deepFreeze({ stepId: "stock-to-special-stem-formation-checkpoint", branchId: "stem-formation-step", applicable: formationValid, acceptedReason: "stock-forms-special-Nahuatl-stem", nonapplicableReason: "stock-mediated-path-not-selected" }),
    ]),
    restrictions: STOCK_STEM_RESTRICTIONS,
    payload: deepFreeze({
      classificationStatus: "formed-stock-mediated-stem",
      analysisKind: "two-step-stock-mediated-stem-formation",
      classification: "stock-mediated-stem",
      facts: deepFreeze([
        "a-stock-is-created-from-a-root-plus-a-derivational-suffix",
        "a-special-Nahuatl-stem-can-be-created-through-the-intermediate-stock",
      ]),
      relations: deepFreeze(["stock-formation-precedes-stock-to-stem-formation"]),
      coordinates: deepFreeze({ formation, intermediateRank: "stock", resultRank: "stem" }),
      prerequisiteOwnerIds: deepFreeze([OWNER_SPECS.rootDefinition.ownerId, OWNER_SPECS.function.ownerId]),
    }),
  });
}

const STOCK_STEM_DESCRIPTOR = selfDescriptor(
  "classicalStockMediatedStemFormation",
  "stockStem",
  (result) => result.classification === "stock-mediated-stem"
    && result.unitConstructed === true,
);
const DIRECT_STEM_DESCRIPTOR = selfDescriptor(
  "classicalDirectStemFormation",
  "directStem",
  (result) => result.classification === "direct-stem"
    && result.unitConstructed === true,
);
const COMPOUND_STEM_DESCRIPTOR = selfDescriptor(
  "classicalCompoundStemFormation",
  "compoundStem",
  (result) => result.classification === "compound-stem"
    && result.unitConstructed === true,
);

function analyzeStemPrerequisite(target, result) {
  const direct = analyzePrerequisite(target, result, DIRECT_STEM_DESCRIPTOR);
  if (direct.admitted) return direct;
  const stock = analyzePrerequisite(target, result, STOCK_STEM_DESCRIPTOR);
  if (stock.admitted) return stock;
  const compound = analyzePrerequisite(target, result, COMPOUND_STEM_DESCRIPTOR);
  if (compound.admitted) return compound;
  return deepFreeze({
    ...direct,
    reason: "owner-issued-stem-formation-result-required",
  });
}

function compoundStemAnalysis(target, request) {
  const requestFailure = plainRequestFailure(
    request,
    ["firstStemResult", "secondStemResult", "compositionRelation"],
    "compound-stem-formation",
  );
  const first = analyzeStemPrerequisite(
    target,
    requestFailure ? null : request.firstStemResult,
  );
  const second = analyzeStemPrerequisite(
    target,
    requestFailure ? null : request.secondStemResult,
  );
  const relation = requestFailure ? "" : String(request.compositionRelation || "");
  const relationValid = relation === "stem-plus-stem";
  const independentMembers = first.admitted && second.admitted
    && first.result !== second.result;
  const reason = requestFailure
    || first.reason
    || second.reason
    || (!independentMembers ? "two-independent-stem-results-required" : "")
    || (!relationValid ? "stem-plus-stem-composition-required" : "");
  return deepFreeze({
    reason,
    requestDigestInput: `${first.result?.classification || ""}:${second.result?.classification || ""}:${relation}`,
    prerequisites: deepFreeze([first, second]),
    providedInput: deepFreeze({ compositionRelation: relation, independentMembers, prerequisiteOwnerIds: [first.semanticOwnerId, second.semanticOwnerId] }),
    guards: deepFreeze([
      deepFreeze({ stepId: "compound-stem-request-shape-validated", branchId: "request-shape", matches: !requestFailure, acceptedReason: "two-typed-stem-results-and-composition-relation-supplied", rejectedReason: requestFailure || "compound-stem-request-invalid" }),
      deepFreeze({ stepId: "compound-stem-first-member-authority-validated", branchId: "first-stem-authority", matches: first.admitted, acceptedReason: "first-owner-issued-stem-result-retained", rejectedReason: first.reason || "first-owner-issued-stem-result-required" }),
      deepFreeze({ stepId: "compound-stem-second-member-authority-validated", branchId: "second-stem-authority", matches: second.admitted, acceptedReason: "second-owner-issued-stem-result-retained", rejectedReason: second.reason || "second-owner-issued-stem-result-required" }),
      deepFreeze({ stepId: "compound-stem-member-independence-validated", branchId: "member-independence", matches: independentMembers, acceptedReason: "two-independent-stem-results-retained", rejectedReason: "two-independent-stem-results-required" }),
      deepFreeze({ stepId: "compound-stem-composition-relation-validated", branchId: "composition-relation", matches: relationValid, acceptedReason: "stem-plus-stem-composition-authorized", rejectedReason: "stem-plus-stem-composition-required" }),
    ]),
    checkpoints: deepFreeze([
      deepFreeze({ stepId: "two-stem-compound-formation-checkpoint", branchId: "compound-stem-claim", applicable: independentMembers && relationValid, acceptedReason: "one-stem-combined-with-another-forms-compound-stem", nonapplicableReason: "compound-stem-conditions-not-satisfied" }),
    ]),
    restrictions: COMPOUND_STEM_RESTRICTIONS,
    payload: deepFreeze({
      classificationStatus: "formed-compound-stem",
      analysisKind: "stem-plus-stem-composition",
      classification: "compound-stem",
      facts: deepFreeze(["Nahuatl-can-create-compound-stems-by-combining-one-stem-with-another"]),
      relations: deepFreeze(["both-stem-members-retain-independent-source-and-proof"]),
      coordinates: deepFreeze({ compositionRelation: relation, memberCount: 2, resultRank: "stem" }),
      prerequisiteOwnerIds: deepFreeze([first.semanticOwnerId, second.semanticOwnerId]),
    }),
  });
}

function analyzeIdiomSourcePrerequisite(target, result) {
  const ownerIssued = call(target, "isClassicalNahuatlIdiomFrame", result) === true;
  const semanticMatch = ownerIssued
    && result?.witnessed === true
    && result?.authorizationStatus === "authorized"
    && result?.ordinaryVncGenerationAffected === false
    && result?.phraseRequiresItsOwnConstructionFrame === true;
  const reason = !ownerIssued
    ? "owner-issued-idiom-lexical-source-required"
    : !semanticMatch
      ? "authorized-witnessed-idiom-source-required"
      : "";
  return deepFreeze({
    ownerIssued,
    routeRetained: ownerIssued,
    authorized: semanticMatch,
    semanticMatch,
    admitted: reason === "",
    reason,
    result,
    evidence: null,
    semanticOwnerId: "classical-irregular-vnc-idiom-source",
    operationId: "",
  });
}

function lexemeBearingAnalysis(target, request) {
  const requestFailure = plainRequestFailure(
    request,
    ["unitResult", "unitKind"],
    "lexeme-bearing-unit",
  );
  const unitKind = requestFailure ? "" : String(request.unitKind || "");
  let prerequisite;
  if (unitKind === "lower-rank-morphological-unit") {
    prerequisite = analyzePrerequisite(
      target,
      requestFailure ? null : request.unitResult,
      MEANINGFUL_DESCRIPTOR,
    );
  } else if (unitKind === "stem") {
    prerequisite = analyzeStemPrerequisite(
      target,
      requestFailure ? null : request.unitResult,
    );
  } else if (unitKind === "idiom") {
    prerequisite = analyzeIdiomSourcePrerequisite(
      target,
      requestFailure ? null : request.unitResult,
    );
  } else {
    prerequisite = deepFreeze({
      ownerIssued: false,
      routeRetained: false,
      authorized: false,
      semanticMatch: false,
      admitted: false,
      reason: "meaning-bearing-unit-kind-required",
      result: null,
      evidence: null,
      semanticOwnerId: "",
      operationId: "",
    });
  }
  const unitKindValid = [
    "lower-rank-morphological-unit",
    "stem",
    "idiom",
  ].includes(unitKind);
  const reason = requestFailure
    || (!unitKindValid ? "meaning-bearing-unit-kind-required" : "")
    || prerequisite.reason;
  const lexemeBearing = unitKind === "stem" || unitKind === "idiom";
  return deepFreeze({
    reason,
    requestDigestInput: `${unitKind}:${prerequisite.semanticOwnerId}`,
    prerequisites: deepFreeze([prerequisite]),
    providedInput: deepFreeze({ unitKind, prerequisiteOwnerId: prerequisite.semanticOwnerId }),
    guards: deepFreeze([
      deepFreeze({ stepId: "lexeme-bearing-request-shape-validated", branchId: "request-shape", matches: !requestFailure, acceptedReason: "typed-unit-result-and-unit-kind-supplied", rejectedReason: requestFailure || "lexeme-bearing-request-invalid" }),
      deepFreeze({ stepId: "lexeme-bearing-unit-kind-validated", branchId: "unit-kind", matches: unitKindValid, acceptedReason: "meaning-bearing-unit-kind-recognized", rejectedReason: "meaning-bearing-unit-kind-required" }),
      deepFreeze({ stepId: "lexeme-bearing-unit-authority-validated", branchId: "unit-authority", matches: prerequisite.admitted, acceptedReason: "owner-issued-meaning-bearing-unit-retained", rejectedReason: prerequisite.reason || "owner-issued-meaning-bearing-unit-required" }),
    ]),
    checkpoints: deepFreeze([
      deepFreeze({ stepId: "lower-rank-sememe-meaning-component-checkpoint", branchId: "lower-rank-sememe-claim", applicable: unitKind === "lower-rank-morphological-unit", acceptedReason: "lower-rank-morphological-unit-has-sememe-meaning-component", nonapplicableReason: "lower-rank-unit-not-requested" }),
      deepFreeze({ stepId: "stem-lexeme-meaning-component-checkpoint", branchId: "stem-lexeme-claim", applicable: unitKind === "stem", acceptedReason: "stem-has-lexeme-meaning-component", nonapplicableReason: "stem-unit-not-requested" }),
      deepFreeze({ stepId: "idiom-lexeme-meaning-component-checkpoint", branchId: "idiom-lexeme-claim", applicable: unitKind === "idiom", acceptedReason: "idiom-has-lexeme-meaning-component", nonapplicableReason: "idiom-unit-not-requested" }),
    ]),
    restrictions: LEXEME_BEARING_RESTRICTIONS,
    payload: deepFreeze({
      classificationStatus: lexemeBearing ? "classified-lexeme-bearing-unit" : "classified-sememe-bearing-lower-rank-unit",
      analysisKind: "meaning-component-classification",
      classification: lexemeBearing ? "lexeme-bearing-unit" : "sememe-bearing-unit",
      facts: deepFreeze(unitKind === "lower-rank-morphological-unit"
        ? ["lower-rank-morphological-units-have-sememes-as-meaning-components"]
        : unitKind === "stem"
          ? ["the-meaning-component-of-a-stem-is-a-lexeme"]
          : ["the-meaning-component-of-an-idiom-is-a-lexeme"]),
      relations: deepFreeze(["sememe-and-lexeme-meaning-levels-remain-distinct"]),
      coordinates: deepFreeze({ unitKind, meaningComponentKind: lexemeBearing ? "lexeme" : "sememe" }),
      prerequisiteOwnerIds: deepFreeze([prerequisite.semanticOwnerId]),
    }),
  });
}

function stemLexicalAnalysis(target, request) {
  const requestFailure = plainRequestFailure(
    request,
    ["stemResult", "requestedLexicalStatus"],
    "stem-lexical-item",
  );
  const prerequisite = analyzeStemPrerequisite(
    target,
    requestFailure ? null : request.stemResult,
  );
  const lexicalStatus = requestFailure
    ? ""
    : String(request.requestedLexicalStatus || "");
  const statusValid = lexicalStatus === "lexical-item";
  const reason = requestFailure
    || prerequisite.reason
    || (!statusValid ? "stem-lexical-item-status-required" : "");
  return deepFreeze({
    reason,
    requestDigestInput: `${prerequisite.result?.classification || ""}:${lexicalStatus}`,
    prerequisites: deepFreeze([prerequisite]),
    providedInput: deepFreeze({ requestedLexicalStatus: lexicalStatus, prerequisiteOwnerId: prerequisite.semanticOwnerId }),
    guards: deepFreeze([
      deepFreeze({ stepId: "stem-lexical-request-shape-validated", branchId: "request-shape", matches: !requestFailure, acceptedReason: "typed-stem-result-and-lexical-status-supplied", rejectedReason: requestFailure || "stem-lexical-request-invalid" }),
      deepFreeze({ stepId: "stem-lexical-result-authority-validated", branchId: "stem-result-authority", matches: prerequisite.admitted, acceptedReason: "owner-issued-stem-result-retained", rejectedReason: prerequisite.reason || "owner-issued-stem-result-required" }),
      deepFreeze({ stepId: "stem-lexical-status-validated", branchId: "lexical-status", matches: statusValid, acceptedReason: "lexical-item-status-requested", rejectedReason: "stem-lexical-item-status-required" }),
    ]),
    checkpoints: deepFreeze([
      deepFreeze({ stepId: "stem-rank-lexical-item-checkpoint", branchId: "stem-lexical-item-claim", applicable: statusValid, acceptedReason: "stem-rank-unit-is-lexical-item-listed-in-lexicon", nonapplicableReason: "lexical-item-status-not-requested" }),
    ]),
    restrictions: STEM_LEXICAL_RESTRICTIONS,
    payload: deepFreeze({
      classificationStatus: "classified-stem-as-lexical-item",
      analysisKind: "stem-lexical-status-classification",
      classification: "stem-rank-lexical-item",
      facts: deepFreeze(["stem-rank-units-are-lexical-items-listed-in-a-lexicon"]),
      relations: deepFreeze(["stem-formation-precedes-lexical-item-classification"]),
      coordinates: deepFreeze({ unitRank: "stem", lexicalStatus }),
      prerequisiteOwnerIds: deepFreeze([prerequisite.semanticOwnerId]),
    }),
  });
}

const RANK_SOURCE_UPGRADE_DESCRIPTOR = selfDescriptor(
  "classicalMeaningfulRankSourceUpgradeAdmissibility",
  "rankSourceUpgrade",
  (result) => result.classification === "explicit-meaningful-rank-upgrade",
);

function rootMeaningUpgradeAnalysis(target, request) {
  const requestFailure = plainRequestFailure(
    request,
    ["rootResult", "rankUpgradeResult", "requestedMeaningTransition"],
    "root-meaning-rank-upgrade",
  );
  const root = analyzePrerequisite(
    target,
    requestFailure ? null : request.rootResult,
    ROOT_DESCRIPTOR,
  );
  const upgrade = analyzePrerequisite(
    target,
    requestFailure ? null : request.rankUpgradeResult,
    RANK_SOURCE_UPGRADE_DESCRIPTOR,
  );
  const transition = requestFailure
    ? ""
    : String(request.requestedMeaningTransition || "");
  const transitionValid = transition === "root-sememe-to-stem-lexeme";
  const rootToStem = upgrade.admitted
    && upgrade.result?.coordinates?.sourceRank === "root"
    && upgrade.result?.coordinates?.targetRank === "stem"
    && upgrade.result?.coordinates?.transitionMode === "explicit-upgrade";
  const independentPrerequisites = root.admitted && upgrade.admitted
    && root.result !== upgrade.result;
  const reason = requestFailure
    || root.reason
    || upgrade.reason
    || (!independentPrerequisites ? "independent-root-and-rank-upgrade-results-required" : "")
    || (!rootToStem ? "explicit-root-to-stem-rank-upgrade-required" : "")
    || (!transitionValid ? "root-sememe-to-stem-lexeme-transition-required" : "");
  return deepFreeze({
    reason,
    requestDigestInput: `${root.result?.classification || ""}:${upgrade.result?.classification || ""}:${transition}`,
    prerequisites: deepFreeze([root, upgrade]),
    providedInput: deepFreeze({ requestedMeaningTransition: transition, rootToStem, prerequisiteOwnerIds: [root.semanticOwnerId, upgrade.semanticOwnerId] }),
    guards: deepFreeze([
      deepFreeze({ stepId: "root-meaning-upgrade-request-shape-validated", branchId: "request-shape", matches: !requestFailure, acceptedReason: "typed-root-upgrade-results-and-meaning-transition-supplied", rejectedReason: requestFailure || "root-meaning-upgrade-request-invalid" }),
      deepFreeze({ stepId: "root-meaning-upgrade-root-authority-validated", branchId: "root-authority", matches: root.admitted, acceptedReason: "owner-issued-root-result-retained", rejectedReason: root.reason || "owner-issued-root-result-required" }),
      deepFreeze({ stepId: "root-meaning-upgrade-rank-authority-validated", branchId: "rank-upgrade-authority", matches: upgrade.admitted, acceptedReason: "owner-issued-rank-upgrade-result-retained", rejectedReason: upgrade.reason || "owner-issued-rank-upgrade-result-required" }),
      deepFreeze({ stepId: "root-meaning-upgrade-prerequisite-independence-validated", branchId: "prerequisite-independence", matches: independentPrerequisites, acceptedReason: "independent-root-and-upgrade-results-retained", rejectedReason: "independent-root-and-rank-upgrade-results-required" }),
      deepFreeze({ stepId: "root-meaning-upgrade-rank-path-validated", branchId: "rank-path", matches: rootToStem, acceptedReason: "explicit-root-to-stem-upgrade-retained", rejectedReason: "explicit-root-to-stem-rank-upgrade-required" }),
      deepFreeze({ stepId: "root-meaning-upgrade-transition-validated", branchId: "meaning-transition", matches: transitionValid, acceptedReason: "root-sememe-to-stem-lexeme-transition-selected", rejectedReason: "root-sememe-to-stem-lexeme-transition-required" }),
    ]),
    checkpoints: deepFreeze([
      deepFreeze({ stepId: "root-sememe-to-lexeme-upgrade-checkpoint", branchId: "root-meaning-upgrade-claim", applicable: rootToStem && transitionValid, acceptedReason: "root-sememe-upgraded-to-lexeme-when-root-serves-as-stem", nonapplicableReason: "root-meaning-upgrade-conditions-not-satisfied" }),
    ]),
    restrictions: ROOT_MEANING_UPGRADE_RESTRICTIONS,
    payload: deepFreeze({
      classificationStatus: "executed-root-sememe-to-lexeme-upgrade",
      analysisKind: "root-to-stem-meaning-rank-upgrade",
      classification: "root-sememe-upgraded-to-lexeme",
      facts: deepFreeze(["when-a-root-is-upgraded-to-serve-as-a-stem-its-sememe-is-upgraded-to-a-lexeme"]),
      relations: deepFreeze(["root-to-stem-rank-upgrade-precedes-sememe-to-lexeme-upgrade"]),
      coordinates: deepFreeze({ sourceRank: "root", targetRank: "stem", sourceMeaningKind: "sememe", targetMeaningKind: "lexeme" }),
      prerequisiteOwnerIds: deepFreeze([OWNER_SPECS.rootDefinition.ownerId, OWNER_SPECS.rankSourceUpgrade.ownerId]),
    }),
  });
}

const POST_STEM_DESCRIPTOR = selfDescriptor(
  "classicalNahuatlPostStemUnitClassification",
  "postStem",
  (result) => ["particle", "nuclear-clause"].includes(result.classification),
);
const TRANSITION_ZONE_ANALYSES = Object.freeze([
  "transition-boundary",
  "derivation-upper-bound",
  "inflection-domain-onset",
]);

function stemTransitionZoneAnalysis(target, request) {
  const requestFailure = plainRequestFailure(
    request,
    ["stemResult", "postStemResult", "requestedAnalysisKind"],
    "stem-inflection-transition-zone",
  );
  const stem = analyzeStemPrerequisite(
    target,
    requestFailure ? null : request.stemResult,
  );
  const postStem = analyzePrerequisite(
    target,
    requestFailure ? null : request.postStemResult,
    POST_STEM_DESCRIPTOR,
  );
  const analysisKind = requestFailure ? "" : String(request.requestedAnalysisKind || "");
  const analysisValid = TRANSITION_ZONE_ANALYSES.includes(analysisKind);
  const independentPrerequisites = stem.admitted && postStem.admitted
    && stem.result !== postStem.result;
  const reason = requestFailure
    || stem.reason
    || postStem.reason
    || (!independentPrerequisites ? "independent-stem-and-post-stem-results-required" : "")
    || (!analysisValid ? "stem-inflection-transition-zone-analysis-kind-required" : "");
  const classification = analysisKind === "transition-boundary"
    ? "stem-to-post-stem-rank-boundary"
    : analysisKind === "derivation-upper-bound"
      ? "stem-rank-upper-bound-of-derivation"
      : "post-stem-rank-domain-of-inflection";
  const facts = analysisKind === "transition-boundary"
    ? ["an-important-dividing-line-separates-stem-rank-from-the-next-higher-rank"]
    : analysisKind === "derivation-upper-bound"
      ? ["stem-rank-marks-the-upper-end-of-derivation-and-other-stem-forming-processes"]
      : ["the-next-higher-rank-is-the-domain-of-inflection"];
  return deepFreeze({
    reason,
    requestDigestInput: `${stem.result?.classification || ""}:${postStem.result?.classification || ""}:${analysisKind}`,
    prerequisites: deepFreeze([stem, postStem]),
    providedInput: deepFreeze({ requestedAnalysisKind: analysisKind, independentPrerequisites, prerequisiteOwnerIds: [stem.semanticOwnerId, postStem.semanticOwnerId] }),
    guards: deepFreeze([
      deepFreeze({ stepId: "stem-transition-zone-request-shape-validated", branchId: "request-shape", matches: !requestFailure, acceptedReason: "typed-stem-post-stem-results-and-analysis-kind-supplied", rejectedReason: requestFailure || "stem-transition-zone-request-invalid" }),
      deepFreeze({ stepId: "stem-transition-zone-stem-authority-validated", branchId: "stem-authority", matches: stem.admitted, acceptedReason: "owner-issued-stem-result-retained", rejectedReason: stem.reason || "owner-issued-stem-result-required" }),
      deepFreeze({ stepId: "stem-transition-zone-post-stem-authority-validated", branchId: "post-stem-authority", matches: postStem.admitted, acceptedReason: "owner-issued-post-stem-result-retained", rejectedReason: postStem.reason || "owner-issued-post-stem-result-required" }),
      deepFreeze({ stepId: "stem-transition-zone-prerequisite-independence-validated", branchId: "prerequisite-independence", matches: independentPrerequisites, acceptedReason: "independent-stem-and-post-stem-results-retained", rejectedReason: "independent-stem-and-post-stem-results-required" }),
      deepFreeze({ stepId: "stem-transition-zone-analysis-kind-validated", branchId: "analysis-kind", matches: analysisValid, acceptedReason: "transition-zone-analysis-kind-recognized", rejectedReason: "stem-inflection-transition-zone-analysis-kind-required" }),
    ]),
    checkpoints: deepFreeze([
      deepFreeze({ stepId: "stem-next-rank-dividing-line-checkpoint", branchId: "transition-boundary-claim", applicable: analysisKind === "transition-boundary", acceptedReason: "stem-next-rank-dividing-line-retained", nonapplicableReason: "transition-boundary-not-requested" }),
      deepFreeze({ stepId: "stem-derivation-upper-bound-checkpoint", branchId: "derivation-upper-bound-claim", applicable: analysisKind === "derivation-upper-bound", acceptedReason: "stem-rank-derivation-upper-bound-retained", nonapplicableReason: "derivation-upper-bound-not-requested" }),
      deepFreeze({ stepId: "post-stem-inflection-domain-checkpoint", branchId: "inflection-domain-claim", applicable: analysisKind === "inflection-domain-onset", acceptedReason: "next-higher-rank-inflection-domain-retained", nonapplicableReason: "inflection-domain-onset-not-requested" }),
    ]),
    restrictions: STEM_TRANSITION_ZONE_RESTRICTIONS,
    payload: deepFreeze({
      classificationStatus: `validated-${classification}`,
      analysisKind,
      classification,
      facts: deepFreeze(facts),
      relations: deepFreeze(["stem-formation-domain-and-inflection-domain-remain-separated-by-rank-boundary"]),
      coordinates: deepFreeze({ lowerRank: "stem", higherRankUnitKind: postStem.result?.classification || "", analysisKind }),
      prerequisiteOwnerIds: deepFreeze([stem.semanticOwnerId, OWNER_SPECS.postStem.ownerId]),
    }),
  });
}

function publicNames(prefix) {
  return Object.freeze({
    build: `build${prefix}Source`,
    isSource: `is${prefix}Source`,
    evaluate: `evaluate${prefix}`,
    isResult: `is${prefix}Result`,
    isContract: `is${prefix}OperationContract`,
    getEvidence: `get${prefix}ExecutionEvidence`,
    isEvidence: `is${prefix}ExecutionEvidence`,
  });
}

export function createMorphemeStructureOwnersApi(targetObject = globalThis) {
  const definitions = [
    ["combinatorial", "ClassicalMorphemeCombinatorialTypeClassification", combinatorialAnalysis],
    ["position", "ClassicalAffixLinearPositionClassification", positionAnalysis],
    ["function", "ClassicalAffixFunctionalTypeClassification", functionalAnalysis],
    ["paradigm", "ClassicalInflectionalParadigmDefinition", paradigmAnalysis],
    ["dyad", "ClassicalInflectionalAffixDyadAnalysis", dyadAnalysis],
    ["hierarchy", "ClassicalMeaningfulStructuralRankHierarchy", hierarchyAnalysis],
    ["postStem", "ClassicalNahuatlPostStemUnitClassification", postStemAnalysis],
    ["affixDemotion", "ClassicalInflectionalAffixStemInternalDemotion", affixDemotionAnalysis],
    ["rankSourceUpgrade", "ClassicalMeaningfulRankSourceUpgradeAdmissibility", rankSourceUpgradeAnalysis],
    ["rankDowngrade", "ClassicalMeaningfulRankDowngrade", rankDowngradeAnalysis],
    ["rootDefinition", "ClassicalRootMajorMorphemeDefinition", rootDefinitionAnalysis],
    ["directStem", "ClassicalDirectStemFormation", directStemAnalysis],
    ["stockStem", "ClassicalStockMediatedStemFormation", stockStemAnalysis],
    ["compoundStem", "ClassicalCompoundStemFormation", compoundStemAnalysis],
    ["lexemeBearing", "ClassicalLexemeBearingUnitClassification", lexemeBearingAnalysis],
    ["stemLexical", "ClassicalStemLexicalItemClassification", stemLexicalAnalysis],
    ["rootMeaningUpgrade", "ClassicalRootMeaningRankUpgrade", rootMeaningUpgradeAnalysis],
    ["stemTransitionZone", "ClassicalStemInflectionTransitionZone", stemTransitionZoneAnalysis],
  ];
  const api = Object.create(null);
  for (const [key, prefix, analyzer] of definitions) {
    const names = publicNames(prefix);
    const mechanism = createMechanism(targetObject, Object.freeze({
      ...OWNER_SPECS[key],
      buildName: names.build,
      evaluateName: names.evaluate,
    }), analyzer);
    api[names.build] = mechanism.buildSource;
    api[names.isSource] = mechanism.isSource;
    api[names.evaluate] = mechanism.evaluate;
    api[names.isResult] = mechanism.isResult;
    api[names.isContract] = mechanism.isOperationContract;
    api[names.getEvidence] = mechanism.getEvidence;
    api[names.isEvidence] = mechanism.isEvidence;
  }
  return Object.freeze(api);
}

export function installMorphemeStructureOwnersGlobals(targetObject = globalThis) {
  const api = createMorphemeStructureOwnersApi(targetObject);
  Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
  return api;
}
