// Canonical application boundary for Classical Nahuatl grammar projections.
//
// The renderer supplies genuine selections and already-issued grammar frames.
// This boundary resolves required engine capabilities and returns their canonical
// results. It never reconstructs a formula, surface, lesson answer, or fallback.

const REQUIRED_CAPABILITY_DIAGNOSTIC = "classical-grammar-application-required-capability-missing";
const APPLICATION_REQUEST_DIAGNOSTIC = "classical-grammar-application-request-invalid";
const APPLICATION_RESULT_DIAGNOSTIC = "classical-grammar-application-result-invalid";
const APPLICATION_RESULT_KIND = "classical-grammar-application-result";
const APPLICATION_RESULT_CAPTURE_KIND = "classical-grammar-application-result-capture";
const CLASSICAL_VISIBLE_SURFACE_DIAGNOSTIC = "classical-visible-surface-orthography-invalid";
const CANONICAL_RUNTIME_DIAGNOSTIC =
  "classical-grammar-application-canonical-runtime-required";
const CANONICAL_CAPABILITY_IDENTITY_DIAGNOSTIC =
  "classical-grammar-application-canonical-capability-identity-invalid";
const CANONICAL_APPLICATION_APIS = new WeakSet();
const CANONICAL_APPLICATION_STATE_BY_TARGET = new WeakMap();
const CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS = Object.freeze({
  scalar: "scalar",
  sourcePreparation: "source-preparation",
  preparedPlan: "prepared-plan",
  coordinateProjection: "coordinate-projection",
  sentenceOperation: "sentence-operation",
});
const DEFAULT_APPLICATION_OUTPUT_KIND =
  CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.scalar;
const CLASSICAL_VISIBLE_SURFACE_KEYS = Object.freeze(new Set([
  "surface",
  "surfaceForms",
  "surfaceRealization",
  "surfaceDisplay",
  "finiteSurface",
  "wordSurface",
  "wordRealization",
  "sentenceSurface",
  "sentenceRealization",
  "sentenceSurfaceDisplay",
]));
const CLASSICAL_FORBIDDEN_VISIBLE_GRAPHEME_PATTERN = /[wk]/iu;

const GCD_INVARIANT_IDS = Object.freeze([
  "canonical-runtime-installation",
  "typed-application-request",
  "semantic-operation-identity",
  "required-capability-resolution",
  "canonical-capability-identity",
  "canonical-engine-result",
  "no-renderer-fallback",
  "lesson-and-display-authority-forbidden",
  "classical-visible-surface-firewall",
]);

function getClassicalVisibleSurfaceViolation(
  value,
  path = "$",
  seen = new Set(),
  visibleSurfaceCollection = false,
) {
  if (
    visibleSurfaceCollection
    && typeof value === "string"
    && CLASSICAL_FORBIDDEN_VISIBLE_GRAPHEME_PATTERN.test(value)
  ) {
    return path;
  }
  if (!value || typeof value !== "object" || seen.has(value)) {
    return "";
  }
  seen.add(value);
  if (Array.isArray(value)) {
    for (let index = 0; index < value.length; index += 1) {
      const violation = getClassicalVisibleSurfaceViolation(
        value[index],
        `${path}[${index}]`,
        seen,
        visibleSurfaceCollection,
      );
      if (violation) return violation;
    }
    return "";
  }
  for (const [key, child] of Object.entries(value)) {
    const childPath = `${path}.${key}`;
    const childIsVisibleSurface = visibleSurfaceCollection
      || CLASSICAL_VISIBLE_SURFACE_KEYS.has(key);
    const violation = getClassicalVisibleSurfaceViolation(
      child,
      childPath,
      seen,
      childIsVisibleSurface,
    );
    if (violation) return violation;
  }
  return "";
}

function assertClassicalVisibleSurfaceResult(value) {
  const violation = getClassicalVisibleSurfaceViolation(value);
  if (violation) {
    throw new Error(`${CLASSICAL_VISIBLE_SURFACE_DIAGNOSTIC}:${violation}`);
  }
  return value;
}

const ROUTE_DEFINITIONS = Object.freeze({
  "concept:classification": Object.freeze({
    capabilityName: "evaluateClassicalGrammarConcept",
    axisIds: Object.freeze([
      "typed-concept-source",
      "read-only-classification",
      "concept-rank-validation",
      "concept-authority-rejection",
      "non-generative-projection",
    ]),
  }),
  "orthography:transcription": Object.freeze({
    capabilityName: "buildClassicalNahuatlTranscriptionFrame",
    axisIds: Object.freeze(["transcription-source", "phonological-boundary", "orthographic-realization"]),
  }),
  "vnc:nuclear-clause": Object.freeze({
    capabilityName: "buildClassicalNahuatlNuclearClauseResult",
    axisIds: Object.freeze(["basal-unit", "source-transitivity", "participant-structure", "predicate-stem"]),
  }),
  "vnc:finite-slot": Object.freeze({
    capabilityName: "buildClassicalNahuatlFiniteVncResult",
    axisIds: Object.freeze(["subject-person-number", "mood", "tense", "finite-slot-order"]),
  }),
  "vnc:finite-surface": Object.freeze({
    capabilityName: "buildClassicalNahuatlVncFiniteSurfaceFrame",
    axisIds: Object.freeze(["selected-formula", "finite-boundary-realization", "word-surface"]),
  }),
  "vnc:sentence-result": Object.freeze({
    capabilityName: "buildClassicalNahuatlVncSentenceResultFrame",
    axisIds: Object.freeze(["authorized-vnc-result", "sentence-composition", "sentence-realization"]),
  }),
  "nnc:ordinary": Object.freeze({
    capabilityName: "evaluateClassicalNahuatlOrdinaryNnc",
    axisIds: Object.freeze([
      "nounstem-source",
      "nounstem-class",
      "nnc-state",
      "subject-person-number",
      "possessor-person-number",
      "stem-relation",
      "predicate-formation",
      "possessor-reduplication",
      "sentence-force",
      "polarity",
      "state-availability",
      "referential-animacy",
      "use-stem-shape",
      "lexical-alternative",
      "number-dyad",
      "source-stem",
      "target-stem",
      "state-reentry",
      "ordinary-nnc-condition",
      "possessive-formation",
      "possessor-st2-allomorph",
      "possessor-st2-boundary-context",
      "sentence-composition",
      "lexical-license",
      "formula-projection",
      "written-boundary-realization",
    ]),
  }),
  "nnc:sentence-surface": Object.freeze({
    capabilityName: "buildClassicalNahuatlNncSentenceSurfaceFrame",
    axisIds: Object.freeze(["nnc-state", "sentence-force", "polarity", "contextual-interpretation"]),
  }),
  "nnc:diagram": Object.freeze({
    capabilityName: "buildClassicalNahuatlNncDiagrammaticFrame",
    axisIds: Object.freeze(["subject-constituent", "predicate-constituent", "nnc-slot-projection"]),
  }),
  "vnc:diagram": Object.freeze({
    capabilityName: "buildClassicalNahuatlVncDiagrammaticFrame",
    axisIds: Object.freeze(["subject-circumfix", "object-prefix", "predicate-constituent", "vnc-slot-projection"]),
  }),
  "sentence:adverbial-adjunction": Object.freeze({
    capabilityName: "buildClassicalNahuatlSentenceAdverbialLayerFrame",
    axisIds: Object.freeze(["sentence-adverbial", "clause-scope", "sentence-position"]),
  }),
  "sentence:particle-adjunction": Object.freeze({
    capabilityName: "buildClassicalNahuatlSentenceParticleLayerFrame",
    axisIds: Object.freeze(["sentence-particle", "honorificization", "sentence-position"]),
  }),
  "particle:result": Object.freeze({
    capabilityName: "buildClassicalNahuatlParticleResultFrame",
    axisIds: Object.freeze([
      "particle-identity",
      "particle-function",
      "particle-placement",
      "particle-semantic-marker",
    ]),
  }),
  "vnc:source-selection": Object.freeze({
    capabilityName: "buildClassicalNahuatlFuenteSourceSelectionFrame",
    axisIds: Object.freeze(["source-stem", "embed-matrix-structure", "source-selection"]),
  }),
  "vnc:ordered-voice-chain": Object.freeze({
    capabilityName: "deriveClassicalNahuatlOrderedVoiceLayerChain",
    axisIds: Object.freeze(["source-voice", "target-voice", "voice-operation-order", "participant-transformation"]),
  }),
  "vnc:ordered-voice-application": Object.freeze({
    capabilityName: "buildClassicalNahuatlOrderedVoiceVncApplicationFrame",
    axisIds: Object.freeze([
      "source-voice",
      "target-voice",
      "voice-operation-order",
      "participant-transformation",
      "selected-formula",
      "finite-boundary-realization",
      "word-surface",
    ]),
  }),
  "nnc:pronominal": Object.freeze({
    capabilityName: "evaluateClassicalNahuatlPronominalNnc",
    axisIds: Object.freeze([
      "pronominal-source",
      "pronominal-family",
      "subject-person-number",
      "number-realization",
      "pronominal-context",
      "quantitive-embed",
      "quantitive-matrix",
      "matrix-family",
      "matrix-form",
      "predicate-pluralization",
      "lexical-restriction",
      "clause-position",
      "discourse-role",
      "sentence-force",
      "polarity",
      "formula-projection",
      "written-boundary-realization",
    ]),
  }),
  "vnc:derivational-operation": Object.freeze({
    capabilityName: "evaluateClassicalNahuatlLateVncDerivation",
    axisIds: Object.freeze(["derivation-family", "operation-order", "source-participants", "target-participants"]),
  }),
  "vnc:application": Object.freeze({
    capabilityName: "evaluateClassicalNahuatlVncApplication",
    axisIds: Object.freeze(["source-analysis", "operation-plan", "coordinate-projection", "selected-result"]),
  }),
  "vnc:transitive-object": Object.freeze({
    capabilityName: "buildClassicalNahuatlTransitiveVncObjectFrame",
    axisIds: Object.freeze(["object-kind", "object-person-number", "valence", "object-prefix"]),
  }),
  "vnc:verbstem-class": Object.freeze({
    capabilityName: "buildClassicalNahuatlVerbstemClassFrame",
    axisIds: Object.freeze(["verbstem-class", "stem-alternation", "mood-tense-allomorphy", "finite-realization"]),
  }),
  "sentence:supplementation": Object.freeze({
    capabilityName: "evaluateClassicalNahuatlSupplementationOperation",
    axisIds: Object.freeze(["principal-clause", "supplement-clause", "shared-referent", "supplement-relation", "clause-order", "vocative", "reported-speech"]),
  }),
  "grammar:nominal-construction": Object.freeze({
    capabilityName: "evaluateClassicalNahuatlNominalConstruction",
    axisIds: Object.freeze(["nominal-embed", "compound-nnc", "affective-nnc", "cardinal-number", "measure-modification", "vacant-state"]),
  }),
  "nnc:deverbal-construction": Object.freeze({
    capabilityName: "evaluateClassicalNahuatlDeverbalNnc",
    axisIds: Object.freeze(["source-stage", "source-voice", "nominalization-family", "patientive-family", "external-object", "double-nucleus-ownerhood"]),
  }),
  "nnc:adjectival-modification": Object.freeze({
    capabilityName: "evaluateClassicalNahuatlAdjectivalModification",
    axisIds: Object.freeze([
      "modification-topology",
      "modifier-head-order",
      "adjunctor",
      "transitive-reference-contact",
      "compound-head-target",
    ]),
  }),
  "nnc:adverbial": Object.freeze({
    capabilityName: "evaluateClassicalNahuatlAdverbialNuclear",
    axisIds: Object.freeze(["adverbial-source", "adverbial-context", "adverbialized-subject", "clause-rank"]),
  }),
  "nnc:relational": Object.freeze({
    capabilityName: "evaluateClassicalNahuatlRelationalNnc",
    axisIds: Object.freeze(["relational-source", "relation-family", "possessor-structure", "voice-source", "relational-result"]),
  }),
  "nnc:place-gentilic": Object.freeze({
    capabilityName: "evaluatePlaceGentilicNnc",
    axisIds: Object.freeze(["place-source", "place-formation", "gentilic-formation", "collectivity", "profession", "closed-title"]),
  }),
  "clause:adverbial-adjunction": Object.freeze({
    capabilityName: "evaluateAdverbialAdjunction",
    axisIds: Object.freeze(["adverbial-principal", "adjoined-clause", "adjunctor", "relation-scope", "clause-position"]),
  }),
  "clause:composition": Object.freeze({
    capabilityName: "evaluateClassicalNahuatlClauseComposition",
    axisIds: Object.freeze(["complement-relation", "conjunction-relation", "clause-rank", "reference-graph", "relation-marker", "parallel-structure"]),
  }),
  "clause:comparison": Object.freeze({
    capabilityName: "evaluateClassicalNahuatlComparison",
    axisIds: Object.freeze(["comparison-relation", "comparand", "standard", "dimension", "degree-strategy", "superlative-strategy"]),
  }),
  "vnc:denominal": Object.freeze({
    capabilityName: "evaluateClassicalNahuatlDenominalVnc",
    axisIds: Object.freeze(["denominal-source-family", "denominal-operation", "source-rank", "target-verbstem-class", "target-valence", "finite-participants"]),
  }),
  "nnc:personal-name": Object.freeze({
    capabilityName: "evaluatePersonalNameNnc",
    axisIds: Object.freeze(["name-source-family", "inner-clause", "outer-subject", "outer-number", "sentence-operation", "reranking"]),
  }),
});

function defineAxisSemanticFactRoles(roles = {}) {
  return Object.freeze({ ...roles });
}

// Owner-declared semantic taxonomy for the Lesson 2-19 application routes.
// These declarations describe what each existing axis is; they do not create
// another source model or allow the aggregate inventory to infer authority.
const FOUNDATION_AXIS_SEMANTIC_FACT_ROLES = Object.freeze({
  "concept:classification": defineAxisSemanticFactRoles({
    "typed-concept-source": "lexical-fact",
    "read-only-classification": "derived-fact",
    "concept-rank-validation": "derived-fact",
    "concept-authority-rejection": "derived-fact",
    "non-generative-projection": "derived-fact",
  }),
  "orthography:transcription": defineAxisSemanticFactRoles({
    "transcription-source": "lexical-fact",
    "phonological-boundary": "boundary-conditioned-fact",
    "orthographic-realization": "boundary-conditioned-fact",
  }),
  "sentence:adverbial-adjunction": defineAxisSemanticFactRoles({
    "sentence-adverbial": "lexical-fact",
    "clause-scope": "contextual-fact",
    "sentence-position": "derived-fact",
  }),
  "sentence:particle-adjunction": defineAxisSemanticFactRoles({
    "sentence-particle": "lexical-fact",
    honorificization: "genuine-user-choice",
    "sentence-position": "derived-fact",
  }),
  "particle:result": defineAxisSemanticFactRoles({
    "particle-identity": "lexical-fact",
    "particle-function": "lexical-fact",
    "particle-placement": "lexical-fact",
    "particle-semantic-marker": "lexical-fact",
  }),
  "vnc:nuclear-clause": defineAxisSemanticFactRoles({
    "basal-unit": "derived-fact",
    "source-transitivity": "lexical-fact",
    "participant-structure": "contextual-fact",
    "predicate-stem": "lexical-fact",
  }),
  "vnc:finite-slot": defineAxisSemanticFactRoles({
    "subject-person-number": "contextual-fact",
    mood: "genuine-user-choice",
    tense: "genuine-user-choice",
    "finite-slot-order": "derived-fact",
  }),
  "vnc:transitive-object": defineAxisSemanticFactRoles({
    "object-kind": "contextual-fact",
    "object-person-number": "contextual-fact",
    valence: "lexical-fact",
    "object-prefix": "derived-fact",
  }),
  "vnc:source-selection": defineAxisSemanticFactRoles({
    "source-stem": "lexical-fact",
    "embed-matrix-structure": "contextual-fact",
    "source-selection": "lexical-fact",
  }),
  "vnc:verbstem-class": defineAxisSemanticFactRoles({
    "verbstem-class": "lexical-fact",
    "stem-alternation": "lexical-fact",
    "mood-tense-allomorphy": "contextual-fact",
    "finite-realization": "boundary-conditioned-fact",
  }),
  "nnc:diagram": defineAxisSemanticFactRoles({
    "subject-constituent": "derived-fact",
    "predicate-constituent": "derived-fact",
    "nnc-slot-projection": "derived-fact",
  }),
  "vnc:diagram": defineAxisSemanticFactRoles({
    "subject-circumfix": "derived-fact",
    "object-prefix": "derived-fact",
    "predicate-constituent": "derived-fact",
    "vnc-slot-projection": "derived-fact",
  }),
  "vnc:finite-surface": defineAxisSemanticFactRoles({
    "selected-formula": "derived-fact",
    "finite-boundary-realization": "boundary-conditioned-fact",
    "word-surface": "boundary-conditioned-fact",
  }),
  "vnc:sentence-result": defineAxisSemanticFactRoles({
    "authorized-vnc-result": "derived-fact",
    "sentence-composition": "derived-fact",
    "sentence-realization": "boundary-conditioned-fact",
  }),
  "nnc:sentence-surface": defineAxisSemanticFactRoles({
    "nnc-state": "derived-fact",
    "sentence-force": "genuine-user-choice",
    polarity: "genuine-user-choice",
    "contextual-interpretation": "contextual-fact",
  }),
  "nnc:ordinary": defineAxisSemanticFactRoles({
    "nounstem-source": "lexical-fact",
    "nounstem-class": "genuine-user-choice",
    "nnc-state": "genuine-user-choice",
    "subject-person-number": "genuine-user-choice",
    "possessor-person-number": "genuine-user-choice",
    "stem-relation": "genuine-user-choice",
    "predicate-formation": "genuine-user-choice",
    "possessor-reduplication": "genuine-user-choice",
    "sentence-force": "genuine-user-choice",
    polarity: "genuine-user-choice",
    "state-availability": "lexical-fact",
    "referential-animacy": "contextual-fact",
    "use-stem-shape": "lexical-fact",
    "lexical-alternative": "lexical-fact",
    "number-dyad": "derived-fact",
    "source-stem": "lexical-fact",
    "target-stem": "derived-fact",
    "state-reentry": "derived-fact",
    "ordinary-nnc-condition": "derived-fact",
    "possessive-formation": "derived-fact",
    "possessor-st2-allomorph": "boundary-conditioned-fact",
    "possessor-st2-boundary-context": "boundary-conditioned-fact",
    "sentence-composition": "derived-fact",
    "lexical-license": "lexical-fact",
    "formula-projection": "derived-fact",
    "written-boundary-realization": "boundary-conditioned-fact",
  }),
  "nnc:pronominal": defineAxisSemanticFactRoles({
    "pronominal-source": "lexical-fact",
    "pronominal-family": "lexical-fact",
    "subject-person-number": "contextual-fact",
    "number-realization": "boundary-conditioned-fact",
    "pronominal-context": "contextual-fact",
    "quantitive-embed": "lexical-fact",
    "quantitive-matrix": "lexical-fact",
    "matrix-family": "lexical-fact",
    "matrix-form": "lexical-fact",
    "predicate-pluralization": "derived-fact",
    "lexical-restriction": "lexical-fact",
    "clause-position": "contextual-fact",
    "discourse-role": "contextual-fact",
    "sentence-force": "genuine-user-choice",
    polarity: "genuine-user-choice",
    "formula-projection": "derived-fact",
    "written-boundary-realization": "boundary-conditioned-fact",
  }),
  "sentence:supplementation": defineAxisSemanticFactRoles({
    "principal-clause": "contextual-fact",
    "supplement-clause": "contextual-fact",
    "shared-referent": "contextual-fact",
    "supplement-relation": "genuine-user-choice",
    "clause-order": "genuine-user-choice",
    vocative: "derived-fact",
    "reported-speech": "derived-fact",
  }),
});

function defineAxisConstraint({
  constraintId,
  licensedProbeCoordinate,
  ownerCoordinatePath,
  ownerCoordinateProjectionKind = "direct",
} = {}) {
  const predicateValueKind = Array.isArray(licensedProbeCoordinate)
    ? "array"
    : licensedProbeCoordinate && typeof licensedProbeCoordinate === "object"
      ? "object"
      : typeof licensedProbeCoordinate;
  return Object.freeze({
    axisConstraintId: constraintId,
    licensedProbeCoordinate,
    unlicensedProbeCoordinate: predicateValueKind === "boolean"
      ? "__classical-owner-axis-coordinate-unlicensed__"
      : Object.freeze({
        kind: "classical-owner-axis-coordinate-unlicensed",
      }),
    predicateValueKinds: Object.freeze([predicateValueKind]),
    ownerCoordinatePath: Object.freeze([...ownerCoordinatePath]),
    ownerCoordinateProjectionKind,
  });
}

// Each proof coordinate is read from the issued canonical result of its owning
// operation. The negative coordinate is deliberately outside that projection;
// a merely nonempty caller value therefore cannot satisfy the owner predicate.
const FOUNDATION_AXIS_CONSTRAINT_DECLARATIONS = Object.freeze({
  "sentence:particle-adjunction": Object.freeze({
    honorificization: defineAxisConstraint({
      constraintId: "lesson3-particle-honorificization-selected",
      licensedProbeCoordinate: false,
      ownerCoordinatePath: ["honorificizedRequested"],
    }),
  }),
  "vnc:finite-slot": Object.freeze({
    mood: defineAxisConstraint({
      constraintId: "finite-vnc-mood-selected",
      licensedProbeCoordinate: "indicative",
      ownerCoordinatePath: ["mood"],
    }),
    tense: defineAxisConstraint({
      constraintId: "finite-vnc-tense-selected",
      licensedProbeCoordinate: "present",
      ownerCoordinatePath: ["tense"],
    }),
  }),
  "nnc:sentence-surface": Object.freeze({
    "sentence-force": defineAxisConstraint({
      constraintId: "lessons12-16-nnc-sentence-force-selected",
      licensedProbeCoordinate: "assertion",
      ownerCoordinatePath: ["sentenceType"],
    }),
    polarity: defineAxisConstraint({
      constraintId: "lessons12-16-nnc-polarity-selected",
      licensedProbeCoordinate: "positive",
      ownerCoordinatePath: ["polarity"],
    }),
  }),
  "nnc:ordinary": Object.freeze({
    "nnc-state": defineAxisConstraint({
      constraintId: "ordinary-nnc-state-selected",
      licensedProbeCoordinate: "possessive",
      ownerCoordinatePath: ["operationFrame", "state"],
    }),
    "subject-person-number": defineAxisConstraint({
      constraintId: "ordinary-nnc-subject-selected",
      licensedProbeCoordinate: "1sg",
      ownerCoordinatePath: ["operationFrame", "subject"],
    }),
    "possessor-person-number": defineAxisConstraint({
      constraintId: "ordinary-nnc-possessor-selected",
      licensedProbeCoordinate: "3sg",
      ownerCoordinatePath: ["operationFrame", "possessor"],
    }),
    "stem-relation": defineAxisConstraint({
      constraintId: "ordinary-nnc-stem-relation-selected",
      licensedProbeCoordinate: "plain",
      ownerCoordinatePath: ["operationFrame", "stemFormation"],
    }),
    "predicate-formation": defineAxisConstraint({
      constraintId: "ordinary-nnc-predicate-formation-selected",
      licensedProbeCoordinate: "source-stem",
      ownerCoordinatePath: ["operationFrame", "predicateFormation"],
    }),
    "possessor-reduplication": defineAxisConstraint({
      constraintId: "ordinary-nnc-possessor-reduplication-selected",
      licensedProbeCoordinate: false,
      ownerCoordinatePath: ["operationFrame", "possessorReduplication"],
    }),
    "sentence-force": defineAxisConstraint({
      constraintId: "ordinary-nnc-sentence-force-selected",
      licensedProbeCoordinate: "statement",
      ownerCoordinatePath: ["operationFrame", "sentenceType"],
    }),
    polarity: defineAxisConstraint({
      constraintId: "ordinary-nnc-polarity-selected",
      licensedProbeCoordinate: "positive",
      ownerCoordinatePath: ["operationFrame", "polarity"],
    }),
  }),
  "nnc:pronominal": Object.freeze({
    "sentence-force": defineAxisConstraint({
      constraintId: "pronominal-nnc-sentence-force-selected",
      licensedProbeCoordinate: "statement",
      ownerCoordinatePath: ["operationFrame", "sentenceType"],
    }),
    polarity: defineAxisConstraint({
      constraintId: "pronominal-nnc-polarity-selected",
      licensedProbeCoordinate: "positive",
      ownerCoordinatePath: ["operationFrame", "polarity"],
    }),
  }),
  "sentence:supplementation": Object.freeze({
    "supplement-relation": defineAxisConstraint({
      constraintId: "lessons17-19-supplement-relation-selected",
      licensedProbeCoordinate: "identical",
      ownerCoordinatePath: ["referenceFrame", "referenceRelationship"],
    }),
    "clause-order": defineAxisConstraint({
      constraintId: "lessons17-19-clause-order-selected",
      licensedProbeCoordinate: "principal-first",
      ownerCoordinatePath: ["linearizationFrame", "order"],
    }),
  }),
});

function defineCanonicalResultContract(...resultKinds) {
  return Object.freeze({
    resultKinds: Object.freeze(resultKinds),
  });
}

// Result identity is route-specific. A capability call does not become
// canonical merely because it returned a non-null object.
const CANONICAL_RESULT_CONTRACTS = Object.freeze({
  "concept:classification": defineCanonicalResultContract(
    "classical-grammar-concept-result",
  ),
  "orthography:transcription": defineCanonicalResultContract(
    "classical-nahuatl-transcription-frame",
  ),
  "vnc:nuclear-clause": defineCanonicalResultContract(
    "classical-nahuatl-nuclear-clause-structure-result",
  ),
  "vnc:finite-slot": defineCanonicalResultContract(
    "classical-nahuatl-finite-vnc-slot-result",
  ),
  "vnc:finite-surface": defineCanonicalResultContract(
    "classical-nahuatl-vnc-finite-surface-frame",
  ),
  "vnc:sentence-result": defineCanonicalResultContract(
    "classical-nahuatl-vnc-sentence-result-frame",
  ),
  "nnc:ordinary": defineCanonicalResultContract(
    "classical-nahuatl-ordinary-nnc-result-frame",
  ),
  "nnc:sentence-surface": defineCanonicalResultContract(
    "classical-nahuatl-nnc-sentence-surface-frame",
  ),
  "nnc:diagram": defineCanonicalResultContract(
    "classical-nahuatl-nnc-diagrammatic-frame",
  ),
  "vnc:diagram": defineCanonicalResultContract(
    "classical-nahuatl-vnc-diagrammatic-frame",
  ),
  "sentence:adverbial-adjunction": defineCanonicalResultContract(
    "classical-nahuatl-sentence-adverbial-layer-frame",
  ),
  "sentence:particle-adjunction": defineCanonicalResultContract(
    "classical-nahuatl-sentence-particle-layer-frame",
  ),
  "particle:result": defineCanonicalResultContract(
    "classical-nahuatl-particle-result-frame",
  ),
  "vnc:source-selection": defineCanonicalResultContract(
    "classical-nahuatl-verbstem-fuente-source-selection-frame",
  ),
  "vnc:ordered-voice-chain": defineCanonicalResultContract(
    "classical-nahuatl-ordered-voice-layer-chain-frame",
  ),
  "vnc:ordered-voice-application": defineCanonicalResultContract(
    "classical-nahuatl-ordered-voice-vnc-application-frame",
  ),
  "nnc:pronominal": defineCanonicalResultContract(
    "classical-nahuatl-pronominal-nnc-result-frame",
  ),
  "vnc:derivational-operation": defineCanonicalResultContract(
    "classical-nahuatl-late-vnc-derivation-closure-frame",
  ),
  "vnc:application": defineCanonicalResultContract(
    "classical-nahuatl-vnc-application-frame",
  ),
  "vnc:transitive-object": defineCanonicalResultContract(
    "classical-nahuatl-transitive-vnc-transitive-vnc-object-machinery-frame",
  ),
  "vnc:verbstem-class": defineCanonicalResultContract(
    "classical-nahuatl-verbstem-verbstem-class-machinery-frame",
  ),
  "sentence:supplementation": defineCanonicalResultContract(
    "classical-nahuatl-supplementation-frame",
    "classical-nahuatl-vocative-frame",
    "classical-nahuatl-rumored-report-frame",
    "classical-nahuatl-deleted-principal-frame",
    "classical-nahuatl-negative-ac-plural-frame",
  ),
  "grammar:nominal-construction": defineCanonicalResultContract(
    "classical-nahuatl-nominal-construction-result-frame",
  ),
  "nnc:deverbal-construction": defineCanonicalResultContract(
    "classical-nahuatl-deverbal-nnc-grammar-frame",
  ),
  "nnc:adjectival-modification": defineCanonicalResultContract(
    "classical-nahuatl-adjectival-modification-result-frame",
  ),
  "nnc:adverbial": defineCanonicalResultContract(
    "classical-nahuatl-adverbial-nuclear-result",
  ),
  "nnc:relational": defineCanonicalResultContract(
    "classical-nahuatl-relational-nnc-relational-result",
  ),
  "nnc:place-gentilic": defineCanonicalResultContract(
    "classical-nahuatl-place-gentilic-nnc-frame",
  ),
  "clause:adverbial-adjunction": defineCanonicalResultContract(
    "adverbial-adjunction-ast",
  ),
  "clause:composition": defineCanonicalResultContract(
    "classical-nahuatl-clause-complementation-result-frame",
    "classical-nahuatl-clause-conjunction-result-frame",
  ),
  "clause:comparison": defineCanonicalResultContract(
    "classical-nahuatl-comparison-result-frame",
  ),
  "vnc:denominal": defineCanonicalResultContract(
    "classical-nahuatl-denominal-vnc-result-frame",
  ),
  "nnc:personal-name": defineCanonicalResultContract(
    "classical-nahuatl-personal-name-result",
  ),
});

function defineAdditionalOutputContract(
  capabilityName,
  resultKinds,
  {
    resultCollection = false,
    validatorNames = [],
  } = {},
) {
  return Object.freeze({
    capabilityName,
    resultKinds: Object.freeze(resultKinds),
    resultCollection: resultCollection === true,
    validatorNames: Object.freeze(validatorNames),
  });
}

// Scalar, prepared-plan, and coordinate-projection are output kinds of one
// semantic operation. They do not create lesson-local operation IDs or lanes.
const ADDITIONAL_OUTPUT_CONTRACTS = Object.freeze({
  "nnc:ordinary": Object.freeze({
    [CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.preparedPlan]:
      defineAdditionalOutputContract(
        "prepareClassicalNahuatlOrdinaryNncParadigmPlan",
        ["classical-nahuatl-ordinary-nnc-paradigm-plan"],
        {
          validatorNames: [
            "isClassicalNahuatlOrdinaryNncParadigmPlan",
          ],
        },
      ),
    [CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.coordinateProjection]:
      defineAdditionalOutputContract(
        "projectClassicalNahuatlOrdinaryNncParadigmCoordinates",
        ["classical-nahuatl-ordinary-nnc-paradigm-coordinate-frame"],
        {
          resultCollection: true,
          validatorNames: [
            "isClassicalNahuatlOrdinaryNncParadigmCoordinate",
          ],
        },
      ),
  }),
  "nnc:relational": Object.freeze({
    [CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.preparedPlan]:
      defineAdditionalOutputContract(
        "buildClassicalNahuatlPreparedPlan",
        ["classical-nahuatl-relational-nnc-prepared-plan"],
        {
          validatorNames: [
            "isClassicalNahuatlPreparedPlan",
          ],
        },
      ),
    [CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.coordinateProjection]:
      defineAdditionalOutputContract(
        "projectClassicalNahuatlPreparedCoordinates",
        ["classical-nahuatl-relational-nnc-relational-result"],
        {
          resultCollection: true,
          validatorNames: [
            "isClassicalNahuatlRelationalResult",
          ],
        },
      ),
  }),
  "nnc:pronominal": Object.freeze({
    [CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.preparedPlan]:
      defineAdditionalOutputContract(
        "prepareClassicalNahuatlPronominalNncParadigmPlan",
        ["classical-nahuatl-pronominal-nnc-paradigm-plan"],
        {
          validatorNames: [
            "isClassicalNahuatlPronominalNncParadigmPlan",
          ],
        },
      ),
    [CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.coordinateProjection]:
      defineAdditionalOutputContract(
        "projectClassicalNahuatlPronominalNncParadigmCoordinates",
        ["classical-nahuatl-pronominal-nnc-paradigm-coordinate-frame"],
        {
          resultCollection: true,
          validatorNames: [
            "isClassicalNahuatlPronominalNncParadigmCoordinate",
          ],
        },
      ),
  }),
  "vnc:application": Object.freeze({
    [CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.preparedPlan]:
      defineAdditionalOutputContract(
        "prepareClassicalNahuatlVncParadigmPlan",
        ["classical-nahuatl-vnc-paradigm-generation-plan"],
        {
          validatorNames: [
            "isClassicalNahuatlVncParadigmPlan",
          ],
        },
      ),
    [CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.coordinateProjection]:
      defineAdditionalOutputContract(
        "projectClassicalNahuatlVncParadigmCoordinates",
        ["classical-nahuatl-vnc-paradigm-coordinate-frame"],
        {
          resultCollection: true,
          validatorNames: [
            "isClassicalNahuatlVncParadigmCoordinateFrame",
          ],
        },
      ),
  }),
  "grammar:nominal-construction": Object.freeze({
    [CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.preparedPlan]:
      defineAdditionalOutputContract(
        "buildClassicalNahuatlNominalConstructionParadigmPlan",
        ["classical-nahuatl-nominal-construction-paradigm-plan"],
        {
          validatorNames: [
            "isClassicalNahuatlNominalConstructionParadigmPlan",
          ],
        },
      ),
    [CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.coordinateProjection]:
      defineAdditionalOutputContract(
        "projectClassicalNahuatlNominalConstructionParadigmCoordinates",
        ["classical-nahuatl-nominal-construction-paradigm-coordinate-frame"],
        {
          resultCollection: true,
          validatorNames: [
            "isClassicalNahuatlNominalConstructionParadigmCoordinate",
          ],
        },
      ),
  }),
  "nnc:deverbal-construction": Object.freeze({
    [CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.preparedPlan]:
      defineAdditionalOutputContract(
        "buildClassicalNahuatlDeverbalNncParadigmPlan",
        ["classical-nahuatl-deverbal-nnc-paradigm-plan"],
        {
          validatorNames: [
            "isClassicalNahuatlParadigmPlan",
          ],
        },
      ),
    [CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.coordinateProjection]:
      defineAdditionalOutputContract(
        "projectClassicalNahuatlParadigmCoordinates",
        ["classical-nahuatl-deverbal-nnc-paradigm-coordinate-frame"],
        {
          resultCollection: true,
          validatorNames: [
            "isClassicalNahuatlParadigmCoordinate",
          ],
        },
      ),
  }),
  "nnc:adverbial": Object.freeze({
    [CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.sourcePreparation]:
      defineAdditionalOutputContract(
        "resolveClassicalNahuatlAdverbialPotential",
        ["classical-nahuatl-adverbial-potential-frame"],
        {
          validatorNames: [
            "isClassicalNahuatlAdverbialPotentialFrame",
          ],
        },
      ),
    [CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.preparedPlan]:
      defineAdditionalOutputContract(
        "buildClassicalNahuatlAdverbialNuclearBatchPlan",
        ["classical-nahuatl-adverbial-nuclear-batch-plan"],
        {
          validatorNames: [
            "isClassicalNahuatlAdverbialNuclearBatchPlan",
          ],
        },
      ),
    [CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.coordinateProjection]:
      defineAdditionalOutputContract(
        "projectClassicalNahuatlAdverbialNuclearBatchCoordinates",
        ["classical-nahuatl-adverbial-nuclear-batch-coordinate"],
        {
          resultCollection: true,
          validatorNames: [
            "isClassicalNahuatlAdverbialNuclearBatchCoordinate",
          ],
        },
      ),
  }),
  "nnc:place-gentilic": Object.freeze({
    [CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.preparedPlan]:
      defineAdditionalOutputContract(
        "buildPlaceGentilicNncParadigmPlan",
        ["classical-nahuatl-place-gentilic-paradigm-plan"],
        {
          validatorNames: [
            "isPlaceGentilicNncParadigmPlan",
          ],
        },
      ),
    [CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.coordinateProjection]:
      defineAdditionalOutputContract(
        "projectPlaceGentilicNncParadigmCoordinates",
        ["classical-nahuatl-place-gentilic-paradigm-coordinate-frame"],
        {
          resultCollection: true,
          validatorNames: [
            "isPlaceGentilicNncParadigmCoordinate",
          ],
        },
      ),
  }),
  "vnc:denominal": Object.freeze({
    [CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.preparedPlan]:
      defineAdditionalOutputContract(
        "prepareClassicalNahuatlDenominalVncParadigmPlan",
        ["classical-nahuatl-denominal-vnc-paradigm-plan"],
        {
          validatorNames: [
            "isClassicalNahuatlDenominalVncParadigmPlan",
          ],
        },
      ),
    [CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.coordinateProjection]:
      defineAdditionalOutputContract(
        "projectClassicalNahuatlDenominalVncParadigmCoordinates",
        ["classical-nahuatl-denominal-vnc-coordinate-frame"],
        {
          resultCollection: true,
          validatorNames: [
            "isClassicalNahuatlDenominalVncCoordinateFrame",
          ],
        },
      ),
  }),
  "nnc:personal-name": Object.freeze({
    [CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.preparedPlan]:
      defineAdditionalOutputContract(
        "preparePersonalNameNncParadigmPlan",
        ["classical-nahuatl-personal-name-paradigm-plan"],
        {
          validatorNames: [
            "isPersonalNameNncParadigmPlan",
          ],
        },
      ),
    [CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.coordinateProjection]:
      defineAdditionalOutputContract(
        "projectPersonalNameNncParadigmCoordinates",
        ["classical-nahuatl-personal-name-result"],
        {
          resultCollection: true,
          validatorNames: [
            "isPersonalNameNncResult",
          ],
        },
      ),
    [CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.sentenceOperation]:
      defineAdditionalOutputContract(
        "evaluatePersonalNameSentenceOperation",
        ["classical-nahuatl-personal-name-sentence-operation"],
        {
          validatorNames: [
            "isPersonalNameSentenceOperation",
          ],
        },
      ),
  }),
});

function getApplicationOutputKinds(
  operationId = "",
) {
  return Object.freeze([
    DEFAULT_APPLICATION_OUTPUT_KIND,
    ...Object.keys(ADDITIONAL_OUTPUT_CONTRACTS[operationId] || {}),
  ]);
}

function getApplicationOutputContract(
  operationId = "",
  outputKind = DEFAULT_APPLICATION_OUTPUT_KIND,
  targetObject = globalThis,
) {
  if (outputKind === DEFAULT_APPLICATION_OUTPUT_KIND) {
    const route = ROUTE_DEFINITIONS[operationId];
    const resultContract = CANONICAL_RESULT_CONTRACTS[operationId];
    if (!route || !resultContract) return null;
    return Object.freeze({
      capabilityName: route.capabilityName,
      resultKinds: resultContract.resultKinds,
      resultCollection: false,
      validatorNames: AUTHORIZED_RESULT_VALIDATOR_NAMES?.[operationId]
        || Object.freeze([]),
    });
  }
  return ADDITIONAL_OUTPUT_CONTRACTS[operationId]?.[outputKind] || null;
}

const LCM_AXIS_IDS = Object.freeze(Array.from(new Set(
  Object.values(ROUTE_DEFINITIONS).flatMap((definition) => definition.axisIds),
)).sort());

const LCM_AXIS_OWNERS = Object.freeze(LCM_AXIS_IDS.map((axisId) => Object.freeze({
  axisId,
  ownerOperationIds: Object.freeze(Object.entries(ROUTE_DEFINITIONS)
    .filter(([, definition]) => definition.axisIds.includes(axisId))
    .map(([operationId]) => operationId)
    .sort()),
  prerequisiteInvariantIds: Object.freeze([
    "typed-application-request",
    "semantic-operation-identity",
    "required-capability-resolution",
    "canonical-engine-result",
  ]),
  licensedValueAuthority: "semantic-owner-canonical-result",
  callerSuppliedValueAuthority: false,
})));

const FORBIDDEN_AUTHORITY_KEYS = Object.freeze(new Set([
  "lesson",
  "lessonid",
  "lessonnumber",
  "lessonmetadata",
  "highestactivelesson",
  "curriculum",
  "curriculumorder",
  "formula",
  "formulastring",
  "formularecord",
  "formularecords",
  "surface",
  "surfaceform",
  "surfaceforms",
  "targetsurface",
  "selectedresult",
  "result",
  "answer",
  "storedanswer",
  "canvasanswer",
  "example",
  "evidence",
  "citation",
  "sourcetext",
  "translation",
  "display",
  "displaytext",
  "label",
  "storedlabel",
  "glossary",
  "restoredstate",
  "uistate",
  "urlstate",
]));

function isForbiddenApplicationAuthorityKey(normalizedPropertyName = "") {
  const key = String(normalizedPropertyName || "");
  if (FORBIDDEN_AUTHORITY_KEYS.has(key)) return true;
  return /(formula|surface|answer|translation|display|label|glossary|curriculum|lesson|canvas|example|evidence|citation|sourcetext|restoredstate|uistate|urlstate)/u
    .test(key);
}

function isExplicitReadOnlyAuthorityDeclaration(
  normalizedPropertyName = "",
  value = undefined,
) {
  if (!/(authority|authorizing|accepted)$/u.test(
    String(normalizedPropertyName || ""),
  )) {
    return false;
  }
  if (value === false) {
    return true;
  }
  return [
    "display-only-not-authority",
    "not-authority",
    "non-authoritative",
    "read-only-not-authority",
  ].includes(String(value || "").trim().toLowerCase());
}

function hasExplicitReadOnlyArtifactDeclaration(
  owner,
  normalizedPropertyName = "",
) {
  const family = String(normalizedPropertyName || "").includes("formula")
    ? "formula"
    : String(normalizedPropertyName || "").includes("surface")
      ? "surface"
      : "";
  if (!family || !owner || typeof owner !== "object") {
    return false;
  }
  const authorityKeys = family === "formula"
    ? ["formulaArtifactAuthority", "formulaStringAuthority"]
    : ["surfaceArtifactAuthority", "surfaceStringAuthority"];
  return authorityKeys.some((authorityKey) => {
    let descriptor = null;
    try {
      descriptor = Object.getOwnPropertyDescriptor(owner, authorityKey);
    } catch {
      descriptor = null;
    }
    return Boolean(
      descriptor
      && Object.prototype.hasOwnProperty.call(descriptor, "value")
      && isExplicitReadOnlyAuthorityDeclaration(
        authorityKey.toLowerCase(),
        descriptor.value,
      ),
    );
  });
}

const CANONICAL_APPLICATION_SOURCE_BUILDER_NAMES = Object.freeze([
  "buildClassicalNahuatlTranscriptionSourceFrame",
  "buildClassicalNahuatlParticleSourceFrame",
]);

const CANONICAL_ARGUMENT_VALIDATOR_NAMES = Object.freeze([
  "isIssuedGrammarFrame",
  "isClassicalGrammarConceptSource",
  "isClassicalNahuatlTranscriptionFrame",
  "isClassicalNahuatlParticleSourceFrame",
  "isClassicalNahuatlNuclearClauseSource",
  "isClassicalNahuatlNuclearClauseResult",
  "isClassicalNahuatlFiniteVncSource",
  "isClassicalNahuatlFiniteVncResult",
  "isClassicalNahuatlVncApplicationFrame",
  "isClassicalNahuatlVncApplicationResultFrame",
  "isClassicalNahuatlVncParadigmPlan",
  "isClassicalNahuatlVncParadigmCoordinateFrame",
  "isClassicalNahuatlVncFiniteSurfaceFrame",
  "isClassicalNahuatlVncSentenceResultFrame",
  "isClassicalNahuatlOrdinaryNncSourceFrame",
  "isClassicalNahuatlOrdinaryNncOperationFrame",
  "isClassicalNahuatlOrdinaryNncResult",
  "isClassicalNahuatlOrdinaryNncParadigmPlan",
  "isClassicalNahuatlOrdinaryNncParadigmCoordinate",
  "isClassicalNahuatlPronominalNncSourceFrame",
  "isClassicalNahuatlPronominalNncOperationFrame",
  "isClassicalNahuatlPronominalNncResult",
  "isClassicalNahuatlPronominalNncParadigmPlan",
  "isClassicalNahuatlPronominalNncParadigmCoordinate",
  "isClassicalNahuatlIssuedNncSentenceSurfaceFrame",
  "isClassicalNahuatlNncSlotFrame",
  "isClassicalNahuatlVncSlotFrame",
  "isClassicalNahuatlDerivedVncMachineryFrame",
  "isClassicalNahuatlVncDerivationSourceMachineryFrame",
  "isClassicalNahuatlMachineryFrame",
  "isClassicalNahuatlClosureFrame",
  "isClassicalNahuatlOrderedVoiceLayerChain",
  "isClassicalNahuatlOrderedVoiceVncApplicationFrame",
  "isClassicalNahuatlIssuedParticleSentenceLayerFrame",
  "isClassicalNahuatlParticleResultFrame",
  "isClassicalNahuatlLexicalSelectionRecord",
  "isClassicalNahuatlStemOperationRecord",
  "isClassicalNahuatlPossessorReduplicationSelection",
  "isClassicalNahuatlNncSourceAuthorityFrame",
  "isClassicalNahuatlQuantitiveAuthorityRecord",
  "isClassicalNahuatlContextSelectionRecord",
  "isClassicalNahuatlSupplementationClauseEnvelope",
  "isClassicalNahuatlSupplementationAdverbialModifierFrame",
  "isClassicalNahuatlDiscourseSourceContextFrame",
  "isClassicalNahuatlSupplementationOperationRequest",
  "isClassicalNahuatlSupplementationFrame",
  "isClassicalNahuatlNominalConstructionSourceAuthorization",
  "isClassicalNahuatlNominalConstructionResult",
  "isClassicalNahuatlNominalConstructionParadigmPlan",
  "isClassicalNahuatlNominalConstructionParadigmCoordinate",
  "isClassicalNahuatlLexicalAuthorizationFrame",
  "isClassicalNahuatlDeverbalNncGrammarFrame",
  "isClassicalNahuatlParadigmPlan",
  "isClassicalNahuatlParadigmCoordinate",
  "isClassicalNahuatlResultFrame",
  "isClassicalNahuatlAdverbialPotentialFrame",
  "isClassicalNahuatlAdverbialNuclearResult",
  "isClassicalNahuatlAdverbialNuclearBatchPlan",
  "isClassicalNahuatlAdverbialNuclearBatchCoordinate",
  "isClassicalNahuatlRelationalNncGrammarFrame",
  "isClassicalNahuatlRelationalResult",
  "isPlaceGentilicNncFrame",
  "isAdverbialAdjunctionResult",
  "isClassicalNahuatlClauseCompositionSourceFrame",
  "isClassicalComparisonSourceUnit",
  "isClassicalNahuatlClauseComplementationResultFrame",
  "isClassicalNahuatlClauseConjunctionResultFrame",
  "isClassicalComparisonResultFrame",
  "isClassicalNahuatlDenominalVncResultFrame",
  "isPersonalNameInnerClauseFrame",
  "isPersonalNameNncSourceFrame",
  "isPersonalNameNncResult",
  "isPersonalNameSentenceOperation",
]);

const AUTHORIZED_RESULT_VALIDATOR_NAMES = Object.freeze({
  "concept:classification": Object.freeze([
    "isClassicalGrammarConceptResult",
  ]),
  "orthography:transcription": Object.freeze([
    "isClassicalNahuatlTranscriptionFrame",
  ]),
  "vnc:nuclear-clause": Object.freeze([
    "isClassicalNahuatlNuclearClauseResult",
  ]),
  "vnc:finite-slot": Object.freeze([
    "isClassicalNahuatlFiniteVncResult",
  ]),
  "vnc:finite-surface": Object.freeze([
    "isClassicalNahuatlVncFiniteSurfaceFrame",
  ]),
  "vnc:sentence-result": Object.freeze([
    "isClassicalNahuatlVncSentenceResultFrame",
  ]),
  "nnc:ordinary": Object.freeze([
    "isClassicalNahuatlOrdinaryNncResult",
  ]),
  "nnc:pronominal": Object.freeze([
    "isClassicalNahuatlPronominalNncResult",
  ]),
  "nnc:sentence-surface": Object.freeze([
    "isClassicalNahuatlIssuedNncSentenceSurfaceFrame",
  ]),
  "nnc:diagram": Object.freeze([
    "isClassicalNahuatlNncDiagrammaticFrame",
  ]),
  "vnc:diagram": Object.freeze([
    "isClassicalNahuatlVncDiagrammaticFrame",
  ]),
  "sentence:adverbial-adjunction": Object.freeze([
    "isClassicalNahuatlIssuedParticleSentenceLayerFrame",
  ]),
  "sentence:particle-adjunction": Object.freeze([
    "isClassicalNahuatlIssuedParticleSentenceLayerFrame",
  ]),
  "particle:result": Object.freeze([
    "isClassicalNahuatlParticleResultFrame",
  ]),
  "vnc:source-selection": Object.freeze([
    "isClassicalNahuatlFuenteSourceSelectionFrame",
  ]),
  "vnc:ordered-voice-chain": Object.freeze([
    "isClassicalNahuatlOrderedVoiceLayerChain",
  ]),
  "vnc:ordered-voice-application": Object.freeze([
    "isClassicalNahuatlOrderedVoiceVncApplicationFrame",
  ]),
  "vnc:derivational-operation": Object.freeze([
    "isClassicalNahuatlClosureFrame",
  ]),
  "vnc:application": Object.freeze([
    "isClassicalNahuatlVncApplicationFrame",
  ]),
  "vnc:transitive-object": Object.freeze([
    "isClassicalNahuatlTransitiveVncObjectFrame",
  ]),
  "vnc:verbstem-class": Object.freeze([
    "isClassicalNahuatlVerbstemClassFrame",
  ]),
  "sentence:supplementation": Object.freeze([
    "isClassicalNahuatlSupplementationFrame",
    "isClassicalNahuatlVocativeFrame",
    "isClassicalNahuatlRumoredReportFrame",
    "isClassicalNahuatlDeletedPrincipalFrame",
    "isClassicalNahuatlNegativeAcPluralFrame",
  ]),
  "grammar:nominal-construction": Object.freeze([
    "isClassicalNahuatlNominalConstructionResult",
  ]),
  "nnc:deverbal-construction": Object.freeze([
    "isClassicalNahuatlDeverbalNncGrammarFrame",
  ]),
  "nnc:adjectival-modification": Object.freeze([
    "isClassicalNahuatlResultFrame",
  ]),
  "nnc:adverbial": Object.freeze([
    "isClassicalNahuatlAdverbialNuclearResult",
  ]),
  "nnc:relational": Object.freeze([
    "isClassicalNahuatlRelationalResult",
  ]),
  "nnc:place-gentilic": Object.freeze([
    "isPlaceGentilicNncFrame",
  ]),
  "clause:adverbial-adjunction": Object.freeze([
    "isAdverbialAdjunctionResult",
  ]),
  "clause:composition": Object.freeze([
    "isClassicalNahuatlClauseComplementationResultFrame",
    "isClassicalNahuatlClauseConjunctionResultFrame",
  ]),
  "clause:comparison": Object.freeze([
    "isClassicalComparisonResultFrame",
  ]),
  "vnc:denominal": Object.freeze([
    "isClassicalNahuatlDenominalVncResultFrame",
  ]),
  "nnc:personal-name": Object.freeze([
    "isPersonalNameNncResult",
  ]),
});

function resolveCallableCapability(targetObject, capabilityName) {
  const visited = new Set();
  let owner = targetObject;
  while (owner && !visited.has(owner)) {
    visited.add(owner);
    let descriptor = null;
    try {
      descriptor = Object.getOwnPropertyDescriptor(owner, capabilityName);
    } catch {
      return null;
    }
    if (descriptor) {
      return Object.prototype.hasOwnProperty.call(descriptor, "value")
        && typeof descriptor.value === "function"
        ? Object.freeze({
          capability: descriptor.value,
          owner,
          dataProperty: true,
        })
        : null;
    }
    try {
      owner = Object.getPrototypeOf(owner);
    } catch {
      return null;
    }
  }
  return null;
}

function hasCallableCapability(targetObject, capabilityName) {
  return Boolean(resolveCallableCapability(targetObject, capabilityName));
}

function canonicalCapabilityNames() {
  return [...new Set([
    ...Object.values(ROUTE_DEFINITIONS).map((route) => route.capabilityName),
    ...Object.values(ADDITIONAL_OUTPUT_CONTRACTS).flatMap(
      (contracts) => Object.values(contracts).flatMap((contract) => [
        contract.capabilityName,
        ...(contract.validatorNames || []),
      ]),
    ),
    ...Object.values(AUTHORIZED_RESULT_VALIDATOR_NAMES).flat(),
    ...CANONICAL_APPLICATION_SOURCE_BUILDER_NAMES,
    ...CANONICAL_ARGUMENT_VALIDATOR_NAMES,
    "getClassicalNahuatlDenominalVncOperationPathInventory",
    "isClassicalNahuatlDenominalVncOperationPathInventory",
  ].filter(Boolean))];
}

function captureCanonicalApplicationState(targetObject, api) {
  const capabilityIdentities = new Map();
  canonicalCapabilityNames().forEach((capabilityName) => {
    const resolved = resolveCallableCapability(targetObject, capabilityName);
    if (resolved) {
      capabilityIdentities.set(capabilityName, resolved.capability);
    }
  });
  const state = Object.freeze({
    api,
    capabilityIdentities,
  });
  CANONICAL_APPLICATION_APIS.add(api);
  CANONICAL_APPLICATION_STATE_BY_TARGET.set(targetObject, state);
  return state;
}

function getCanonicalApplicationState(targetObject, api = null) {
  const state = CANONICAL_APPLICATION_STATE_BY_TARGET.get(targetObject) || null;
  if (
    !state
    || !CANONICAL_APPLICATION_APIS.has(state.api)
    || (api && state.api !== api)
  ) {
    return null;
  }
  return state;
}

function resolveCanonicalCallableCapability(
  targetObject,
  capabilityName,
  api = null,
) {
  const state = getCanonicalApplicationState(targetObject, api);
  const expectedCapability = state?.capabilityIdentities.get(capabilityName);
  const resolved = resolveCallableCapability(targetObject, capabilityName);
  return expectedCapability
    && resolved
    && resolved.capability === expectedCapability
    ? resolved
    : null;
}

export function createClassicalGrammarApplicationApi(targetObject = globalThis) {
  let api = null;
  const issuedApplicationResults = new WeakSet();
  const issuedCanonicalResults = new WeakSet();
  const issuedApplicationResultByCanonicalResult = new WeakMap();

  function isRecognizedCanonicalArgumentCarrier(value = null) {
    if (!value || typeof value !== "object") {
      return false;
    }
    if (
      issuedCanonicalResults.has(value)
      || issuedApplicationResults.has(value)
      || issuedApplicationResultByCanonicalResult.has(value)
    ) {
      return true;
    }
    const recognizedByCanonicalValidator =
      CANONICAL_ARGUMENT_VALIDATOR_NAMES.some((validatorName) => {
        const resolved = resolveCanonicalCallableCapability(
          targetObject,
          validatorName,
          api,
        );
        if (!resolved) return false;
        try {
          return Reflect.apply(resolved.capability, targetObject, [value]) === true;
        } catch {
          return false;
        }
      });
    if (recognizedByCanonicalValidator) {
      return true;
    }
    return false;
  }

  function getForbiddenApplicationAuthorityCarrier(
    value,
    path = "$",
    seen = new Set(),
  ) {
    if (
      !value
      || typeof value !== "object"
      || seen.has(value)
      || isRecognizedCanonicalArgumentCarrier(value)
    ) {
      return null;
    }
    seen.add(value);
    const owners = [];
    const ownersSeen = new Set();
    let owner = value;
    while (
      owner
      && owner !== Object.prototype
      && owner !== Array.prototype
      && !ownersSeen.has(owner)
    ) {
      owners.push(owner);
      ownersSeen.add(owner);
      try {
        owner = Object.getPrototypeOf(owner);
      } catch {
        owner = null;
      }
    }
    for (let ownerIndex = 0; ownerIndex < owners.length; ownerIndex += 1) {
      const inspectedOwner = owners[ownerIndex];
      let propertyKeys = [];
      try {
        propertyKeys = Reflect.ownKeys(inspectedOwner);
      } catch {
        continue;
      }
      for (const propertyKey of propertyKeys) {
        const propertyName = typeof propertyKey === "string"
          ? propertyKey
          : String(propertyKey);
        const normalizedPropertyName = propertyName
          .toLowerCase()
          .replace(/[^a-z0-9]/gu, "");
        if (Array.isArray(inspectedOwner) && propertyName === "length") {
          continue;
        }
        const childPath = ownerIndex === 0
          ? Array.isArray(inspectedOwner) && /^\d+$/u.test(propertyName)
            ? `${path}[${propertyName}]`
            : `${path}.${propertyName}`
          : `${path}[[Prototype]].${propertyName}`;
        let descriptor = null;
        try {
          descriptor = Object.getOwnPropertyDescriptor(
            inspectedOwner,
            propertyKey,
          );
        } catch {
          descriptor = null;
        }
        if (!descriptor) continue;
        if (!Object.prototype.hasOwnProperty.call(descriptor, "value")) {
          return Object.freeze({
            key: "accessor",
            path: childPath,
          });
        }
        if (
          isForbiddenApplicationAuthorityKey(normalizedPropertyName)
          && !isExplicitReadOnlyAuthorityDeclaration(
            normalizedPropertyName,
            descriptor.value,
          )
          && !hasExplicitReadOnlyArtifactDeclaration(
            inspectedOwner,
            normalizedPropertyName,
          )
        ) {
          return Object.freeze({ key: propertyName, path: childPath });
        }
        const violation = getForbiddenApplicationAuthorityCarrier(
          descriptor.value,
          childPath,
          seen,
        );
        if (violation) return violation;
      }
    }
    return null;
  }

  function validateClassicalGrammarApplicationRequest(request = {}) {
    if (!request || typeof request !== "object" || Array.isArray(request)) {
      throw new TypeError(`${APPLICATION_REQUEST_DIAGNOSTIC}:object-required`);
    }
    const operationId = String(request.operationId || "").trim();
    const route = ROUTE_DEFINITIONS[operationId];
    if (!route || !CANONICAL_RESULT_CONTRACTS[operationId]) {
      throw new Error(`${APPLICATION_REQUEST_DIAGNOSTIC}:semantic-operation-required`);
    }
    const outputKind = String(
      request.outputKind || DEFAULT_APPLICATION_OUTPUT_KIND,
    ).trim();
    const outputContract = getApplicationOutputContract(
      operationId,
      outputKind,
      targetObject,
    );
    if (!outputContract) {
      throw new Error(
        `${APPLICATION_REQUEST_DIAGNOSTIC}:output-kind-not-supported:${outputKind}`,
      );
    }
    if (!Array.isArray(request.args)) {
      throw new TypeError(`${APPLICATION_REQUEST_DIAGNOSTIC}:args-array-required`);
    }
    const forbiddenCarrier = getForbiddenApplicationAuthorityCarrier(request);
    if (forbiddenCarrier) {
      throw new Error(
        `${APPLICATION_REQUEST_DIAGNOSTIC}:forbidden-authority:${forbiddenCarrier.key}`,
      );
    }
    return Object.freeze({
      operationId,
      route,
      outputKind,
      outputContract,
      args: request.args,
      typedApplicationRequest: (
        request != null
        && typeof request === "object"
        && !Array.isArray(request)
        && Array.isArray(request.args)
      ),
      semanticOperationIdentity: (
        ROUTE_DEFINITIONS[operationId] === route
        && CANONICAL_RESULT_CONTRACTS[operationId] != null
        && getApplicationOutputContract(
          operationId,
          outputKind,
          targetObject,
        ) != null
      ),
      authorityCarrierClear: forbiddenCarrier == null,
    });
  }

  function isResultValidatedByTarget(
    operationId = "",
    outputContract = null,
    result = null,
  ) {
    const validatorNames = outputContract?.validatorNames?.length
      ? outputContract.validatorNames
      : AUTHORIZED_RESULT_VALIDATOR_NAMES[operationId] || [];
    if (!validatorNames.length) return false;
    const candidates = outputContract?.resultCollection === true
      ? Array.isArray(result) ? result : []
      : [result];
    return candidates.length > 0 && candidates.every((candidate) => validatorNames.some((validatorName) => {
      const resolved = resolveCanonicalCallableCapability(
        targetObject,
        validatorName,
        api,
      );
      if (!resolved) return false;
      try {
        return Reflect.apply(resolved.capability, targetObject, [candidate]) === true;
      } catch {
        return false;
      }
    }));
  }

  function isRecognizedCanonicalResult(
    operationId = "",
    outputKind = DEFAULT_APPLICATION_OUTPUT_KIND,
    outputContract = null,
    result = null,
    authorizationStatus = "blocked",
  ) {
    const contract = outputContract
      || getApplicationOutputContract(
        operationId,
        outputKind,
        targetObject,
      );
    const routeKindRecognized = Boolean(
      contract
      && result
      && typeof result === "object"
      && (
        contract.resultCollection === true
          ? Array.isArray(result)
            && result.length > 0
            && result.every((entry) => (
              entry
              && typeof entry === "object"
              && !Array.isArray(entry)
              && contract.resultKinds.includes(String(entry.kind || ""))
            ))
          : !Array.isArray(result)
            && contract.resultKinds.includes(String(result.kind || ""))
      )
    );
    if (!routeKindRecognized) return false;
    return isResultValidatedByTarget(
      operationId,
      contract,
      result,
    );
  }

  function getCanonicalResultAuthorizationStatus(result = null) {
    if (!result || typeof result !== "object") {
      return "blocked";
    }
    if (Array.isArray(result)) {
      return result.length > 0 && result.every(
        (entry) => getCanonicalResultAuthorizationStatus(entry) === "authorized",
      )
        ? "authorized"
        : "blocked";
    }
    if (Object.prototype.hasOwnProperty.call(result, "authorizationStatus")) {
      return String(result.authorizationStatus || "") === "authorized"
        ? "authorized"
        : "blocked";
    }
    if (
      result.supported === true
      && result.ok !== false
      && result.grammarFrame?.resultFrame?.ok !== false
    ) {
      return "authorized";
    }
    if (result.ok === true && result.supported !== false) {
      return "authorized";
    }
    if (
      result.proofFrame?.authorizationStatus === "authorized"
      || result.proofFrame?.conclusion?.authorizationStatus === "authorized"
    ) {
      return "authorized";
    }
    return "blocked";
  }

  function buildGcdInvariantProofs(facts = {}) {
    return Object.freeze(Object.fromEntries(GCD_INVARIANT_IDS.map(
      (invariantId) => [invariantId, facts[invariantId] === true],
    )));
  }

  function getClassicalGrammarApplicationInventory() {
    const operations = Object.freeze(Object.entries(ROUTE_DEFINITIONS).map(
      ([operationId, definition]) => {
        const outputKinds = getApplicationOutputKinds(
          operationId,
          targetObject,
        );
        const outputCapabilities = Object.freeze(outputKinds.map((outputKind) => {
          const contract = getApplicationOutputContract(
            operationId,
            outputKind,
            targetObject,
          );
          const installedCapabilityName = contract.capabilityName;
          const capabilityInstalled = Boolean(
            resolveCanonicalCallableCapability(
              targetObject,
              installedCapabilityName,
              api,
            ),
          );
          const validatorNames = contract.validatorNames
            || Object.freeze([]);
          const validatorsInstalled = (
            validatorNames.length > 0
            && validatorNames.every((validatorName) => Boolean(
              resolveCanonicalCallableCapability(
                targetObject,
                validatorName,
                api,
              ),
            ))
          );
          return Object.freeze({
            outputKind,
            capabilityName: contract.capabilityName,
            installedCapabilityName,
            resultKinds: contract.resultKinds,
            resultCollection: contract.resultCollection === true,
            validatorNames,
            capabilityInstalled,
            validatorsInstalled,
          });
        }));
        return Object.freeze({
          operationId,
          capabilityName: definition.capabilityName,
          outputKinds,
          outputCapabilities,
          axisIds: definition.axisIds,
          axisSemanticFactRoles:
            FOUNDATION_AXIS_SEMANTIC_FACT_ROLES[operationId]
              || Object.freeze({}),
          axisConstraintDeclarations:
            FOUNDATION_AXIS_CONSTRAINT_DECLARATIONS[operationId]
              || Object.freeze({}),
          capabilityInstalled: outputCapabilities.every(
            (output) => output.capabilityInstalled,
          ),
          allOutputsHaveOwnerValidators: outputCapabilities.every(
            (output) => output.validatorNames.length > 0,
          ),
          allOwnerValidatorsInstalled: outputCapabilities.every(
            (output) => output.validatorsInstalled,
          ),
        });
      },
    ));
    const missingOwnerValidatorOutputs = Object.freeze(
      operations.flatMap((operation) => operation.outputCapabilities
        .filter((output) => output.validatorNames.length === 0)
        .map((output) => Object.freeze({
          operationId: operation.operationId,
          outputKind: output.outputKind,
          resultKinds: output.resultKinds,
        }))),
    );
    return Object.freeze({
      kind: "classical-grammar-application-inventory",
      version: 1,
      outputKinds: CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS,
      operationIds: Object.freeze(operations.map((operation) => operation.operationId)),
      operations,
      allCapabilitiesInstalled: operations.every((operation) => operation.capabilityInstalled),
      allOutputsHaveOwnerValidators: missingOwnerValidatorOutputs.length === 0,
      allOwnerValidatorsInstalled: operations.every(
        (operation) => operation.allOwnerValidatorsInstalled,
      ),
      missingOwnerValidatorOutputs,
      greatestCommonDivisor: Object.freeze({
        identityId: "typed-semantic-application-to-canonical-result",
        invariantIds: GCD_INVARIANT_IDS,
      }),
      leastCommonMultiple: Object.freeze({
        axisIds: LCM_AXIS_IDS,
        axisCount: LCM_AXIS_IDS.length,
        axisOwners: LCM_AXIS_OWNERS,
        allAxesOwned: LCM_AXIS_OWNERS.every((axis) => axis.ownerOperationIds.length > 0),
      }),
      curriculumOrderAuthority: false,
      lessonMetadataAuthority: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
      displayTextAuthority: false,
    });
  }

  function getApplicationOutputPrerequisiteBlockReason(
    operationId = "",
    outputKind = "",
    args = [],
  ) {
    if (
      outputKind
      !== CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.coordinateProjection
    ) {
      return "";
    }
    const plan = args[0];
    const planReceipt = plan && typeof plan === "object"
      ? issuedApplicationResultByCanonicalResult.get(plan) || null
      : null;
    return (
      planReceipt
      && planReceipt.operationId === operationId
      && planReceipt.outputKind
        === CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.preparedPlan
      && planReceipt.authorizationStatus === "authorized"
      && issuedCanonicalResults.has(plan)
    )
      ? ""
      : `${APPLICATION_REQUEST_DIAGNOSTIC}:issued-authorized-prepared-plan-required`;
  }

  function executeClassicalGrammarApplicationRequest(request = {}) {
    const {
      operationId,
      route,
      outputKind,
      outputContract,
      args,
      typedApplicationRequest,
      semanticOperationIdentity,
      authorityCarrierClear,
    } = validateClassicalGrammarApplicationRequest(request);
    const canonicalApplicationState = getCanonicalApplicationState(
      targetObject,
      api,
    );
    const canonicalRuntimeInstallation = Boolean(canonicalApplicationState);
    const capabilityName = outputContract.capabilityName;
    const currentlyResolvedCapability = resolveCallableCapability(
      targetObject,
      capabilityName,
    );
    const resolvedCapability = resolveCanonicalCallableCapability(
      targetObject,
      capabilityName,
      api,
    );
    if (!currentlyResolvedCapability && !canonicalRuntimeInstallation) {
      throw new Error(`${REQUIRED_CAPABILITY_DIAGNOSTIC}:${capabilityName}`);
    }
    const canonicalCapabilityIdentity = Boolean(resolvedCapability);
    const requiredCapabilityResolution = (
      canonicalRuntimeInstallation
      && canonicalCapabilityIdentity
      && typeof resolvedCapability.capability === "function"
      && capabilityName === outputContract.capabilityName
    );
    const noRendererFallback = (
      requiredCapabilityResolution
      && canonicalCapabilityIdentity
      && resolvedCapability.dataProperty === true
    );
    const outputPrerequisiteBlockReason =
      getApplicationOutputPrerequisiteBlockReason(
        operationId,
        outputKind,
        args,
      );
    const candidateResult = (
      !canonicalRuntimeInstallation
      || !canonicalCapabilityIdentity
      || outputPrerequisiteBlockReason
    )
      ? null
      : Reflect.apply(
        resolvedCapability.capability,
        targetObject,
        args,
      );
    const visibleSurfaceViolation = getClassicalVisibleSurfaceViolation(candidateResult);
    if (visibleSurfaceViolation) {
      throw new Error(
        `${CLASSICAL_VISIBLE_SURFACE_DIAGNOSTIC}:${visibleSurfaceViolation}`,
      );
    }
    const candidateAuthorizationStatus = getCanonicalResultAuthorizationStatus(
      candidateResult,
    );
    const canonicalResultRecognized = isRecognizedCanonicalResult(
      operationId,
      outputKind,
      outputContract,
      candidateResult,
      candidateAuthorizationStatus,
    );
    const canonicalResult = canonicalResultRecognized ? candidateResult : null;
    if (canonicalResultRecognized) {
      issuedCanonicalResults.add(canonicalResult);
    }
    const canonicalAuthorizationStatus = canonicalResultRecognized
      ? candidateAuthorizationStatus
      : "blocked";
    const invariantProofs = buildGcdInvariantProofs({
      "canonical-runtime-installation": canonicalRuntimeInstallation,
      "typed-application-request": typedApplicationRequest,
      "semantic-operation-identity": semanticOperationIdentity,
      "required-capability-resolution": requiredCapabilityResolution,
      "canonical-capability-identity": canonicalCapabilityIdentity,
      "canonical-engine-result": canonicalResultRecognized
        && canonicalAuthorizationStatus === "authorized",
      "no-renderer-fallback": noRendererFallback,
      "lesson-and-display-authority-forbidden": authorityCarrierClear,
      "classical-visible-surface-firewall": visibleSurfaceViolation === "",
    });
    const gcdSatisfied = GCD_INVARIANT_IDS.every(
      (invariantId) => invariantProofs[invariantId] === true,
    );
    const authorizationStatus = gcdSatisfied ? "authorized" : "blocked";
    const candidateBlockReason = (
      candidateResult
      && typeof candidateResult === "object"
      && !Array.isArray(candidateResult)
      && typeof candidateResult.blockReason === "string"
    )
      ? candidateResult.blockReason
      : "";
    const result = Object.freeze({
      kind: APPLICATION_RESULT_KIND,
      version: 1,
      authorizationStatus,
      blockReason: authorizationStatus === "authorized"
        ? ""
        : !canonicalRuntimeInstallation
          ? CANONICAL_RUNTIME_DIAGNOSTIC
          : !canonicalCapabilityIdentity
            ? `${CANONICAL_CAPABILITY_IDENTITY_DIAGNOSTIC}:${capabilityName}`
            : outputPrerequisiteBlockReason || candidateBlockReason || (
          !canonicalResultRecognized
            ? candidateResult == null
              ? "canonical-engine-result-required"
              : `${APPLICATION_RESULT_DIAGNOSTIC}:unrecognized-route-result`
            : "canonical-engine-result-blocked"
        ),
      operationId,
      outputKind,
      capabilityName,
      canonicalResult,
      greatestCommonDivisor: Object.freeze({
        identityId: "typed-semantic-application-to-canonical-result",
        invariantIds: GCD_INVARIANT_IDS,
        invariantProofs,
        satisfied: gcdSatisfied,
      }),
      leastCommonMultiple: Object.freeze({
        axisIds: LCM_AXIS_IDS,
        selectedAxisIds: route.axisIds,
        selectedAxisCount: route.axisIds.length,
        selectedAxisOwners: Object.freeze(LCM_AXIS_OWNERS.filter(
          (axis) => route.axisIds.includes(axis.axisId),
        )),
      }),
      curriculumOrderAuthority: false,
      lessonMetadataAuthority: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
      displayTextAuthority: false,
    });
    issuedApplicationResults.add(result);
    if (canonicalResult && typeof canonicalResult === "object") {
      issuedApplicationResultByCanonicalResult.set(canonicalResult, result);
    }
    return result;
  }

  function isClassicalGrammarApplicationResult(result = null) {
    const invariantProofs = result?.greatestCommonDivisor?.invariantProofs;
    const outputContract = getApplicationOutputContract(
      result?.operationId,
      result?.outputKind,
      targetObject,
    );
    const gcdProofComplete = GCD_INVARIANT_IDS.every(
      (invariantId) => invariantProofs?.[invariantId] === true,
    );
    return Boolean(
      result
      && issuedApplicationResults.has(result)
      && result.kind === APPLICATION_RESULT_KIND
      && result.version === 1
      && ROUTE_DEFINITIONS[result.operationId]
      && outputContract
      && result.capabilityName === outputContract.capabilityName
      && (
        result.authorizationStatus === "authorized"
          ? result.greatestCommonDivisor?.satisfied === true
            && gcdProofComplete
            && issuedCanonicalResults.has(result.canonicalResult)
          : result.authorizationStatus === "blocked"
            ? result.greatestCommonDivisor?.satisfied === false
              && (
                result.canonicalResult === null
                || (
                  issuedCanonicalResults.has(result.canonicalResult)
                  && getCanonicalResultAuthorizationStatus(
                    result.canonicalResult
                  ) === "blocked"
                )
              )
            : false
      )
    );
  }

  function captureClassicalGrammarApplicationResult(
    currentResult = null,
    slotId = "",
  ) {
    const normalizedSlotId = String(slotId || "").trim();
    const applicationResult = isClassicalGrammarApplicationResult(currentResult)
      ? currentResult
      : currentResult && typeof currentResult === "object"
        ? issuedApplicationResultByCanonicalResult.get(currentResult) || null
        : null;
    if (
      !normalizedSlotId
      || !isClassicalGrammarApplicationResult(applicationResult)
      || applicationResult.authorizationStatus !== "authorized"
      || !applicationResult.canonicalResult
      || typeof applicationResult.canonicalResult !== "object"
    ) {
      return Object.freeze({
        kind: APPLICATION_RESULT_CAPTURE_KIND,
        version: 1,
        authorizationStatus: "blocked",
        blockReason: !normalizedSlotId
          ? "classical-grammar-application-result-capture-slot-required"
          : "classical-grammar-application-issued-authorized-result-required",
        slotId: normalizedSlotId,
        outputKind: "",
        applicationResult: null,
        canonicalResult: null,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        storedAnswerAuthority: false,
      });
    }
    return Object.freeze({
      kind: APPLICATION_RESULT_CAPTURE_KIND,
      version: 1,
      authorizationStatus: "authorized",
      blockReason: "",
      slotId: normalizedSlotId,
      operationId: applicationResult.operationId,
      outputKind: applicationResult.outputKind,
      applicationResult,
      canonicalResult: applicationResult.canonicalResult,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
      storedAnswerAuthority: false,
    });
  }

  function isClassicalGrammarApplicationResultCapture(
    capture = null,
    expectedSlotId = "",
  ) {
    const normalizedExpectedSlotId = String(expectedSlotId || "").trim();
    return Boolean(
      capture
      && capture.kind === APPLICATION_RESULT_CAPTURE_KIND
      && capture.version === 1
      && capture.authorizationStatus === "authorized"
      && capture.blockReason === ""
      && (!normalizedExpectedSlotId || capture.slotId === normalizedExpectedSlotId)
      && isClassicalGrammarApplicationResult(capture.applicationResult)
      && capture.applicationResult.authorizationStatus === "authorized"
      && capture.operationId === capture.applicationResult.operationId
      && capture.outputKind === capture.applicationResult.outputKind
      && capture.canonicalResult === capture.applicationResult.canonicalResult
      && capture.formulaStringAuthority === false
      && capture.surfaceStringAuthority === false
      && capture.storedAnswerAuthority === false
      && Object.isFrozen(capture)
    );
  }

  function requestCanonicalResult(
    operationId,
    args = [],
    outputKind = DEFAULT_APPLICATION_OUTPUT_KIND,
  ) {
    return executeClassicalGrammarApplicationRequest({
      operationId,
      outputKind,
      args,
    }).canonicalResult;
  }

  function requestClassicalVncSentenceResultFrame(applicationFrame = null) {
    return requestCanonicalResult("vnc:sentence-result", [applicationFrame]);
  }

  function issueClassicalTranscriptionSourceFrame(constituents = []) {
    const resolvedBuilder = resolveCanonicalCallableCapability(
      targetObject,
      "buildClassicalNahuatlTranscriptionSourceFrame",
      api,
    );
    if (!resolvedBuilder) {
      throw new Error(
        `${REQUIRED_CAPABILITY_DIAGNOSTIC}:buildClassicalNahuatlTranscriptionSourceFrame`,
      );
    }
    return Reflect.apply(
      resolvedBuilder.capability,
      targetObject,
      [{ constituents }],
    );
  }

  function requestClassicalOrdinaryNncResult(
    sourceFrame = null,
    operationFrame = null,
  ) {
    return requestCanonicalResult(
      "nnc:ordinary",
      [sourceFrame, operationFrame],
    );
  }

  function prepareClassicalOrdinaryNncParadigmPlan(
    sourceFrame = null,
    selections = {},
  ) {
    return requestCanonicalResult(
      "nnc:ordinary",
      [sourceFrame, selections],
      CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.preparedPlan,
    );
  }

  function projectClassicalOrdinaryNncParadigmCoordinates(plan = null) {
    return requestCanonicalResult(
      "nnc:ordinary",
      [plan],
      CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.coordinateProjection,
    );
  }

  function requestClassicalNncDiagrammaticFrame(slotFrame = null) {
    return requestCanonicalResult("nnc:diagram", [slotFrame]);
  }

  function requestClassicalVncDiagrammaticFrame(slotFrame = null) {
    return requestCanonicalResult("vnc:diagram", [slotFrame]);
  }

  function requestClassicalSentenceAdverbialFrame(selections = {}) {
    const hasAdverbialIdentity = Boolean(
      selections
      && typeof selections === "object"
      && Object.prototype.hasOwnProperty.call(selections, "adverbialId"),
    );
    if (!hasAdverbialIdentity) {
      return requestCanonicalResult(
        "sentence:adverbial-adjunction",
        [selections],
      );
    }
    if (Object.prototype.hasOwnProperty.call(selections, "particleSourceFrame")) {
      throw new Error(
        `${APPLICATION_REQUEST_DIAGNOSTIC}:adverbial-id-and-source-frame-are-mutually-exclusive`,
      );
    }
    const { adverbialId, ...sentenceSelections } = selections;
    return requestCanonicalResult("sentence:adverbial-adjunction", [{
      ...sentenceSelections,
      particleSourceFrame: issueClassicalParticleSourceFrame(adverbialId),
    }]);
  }

  function issueClassicalParticleSourceFrame(candidate = "") {
    if (candidate && typeof candidate === "object") {
      return candidate;
    }
    const normalizedCandidate = String(candidate || "").trim();
    if (!normalizedCandidate || normalizedCandidate.toLowerCase() === "none") {
      return null;
    }
    const resolvedBuilder = resolveCanonicalCallableCapability(
      targetObject,
      "buildClassicalNahuatlParticleSourceFrame",
      api,
    );
    if (!resolvedBuilder) {
      throw new Error(
        `${REQUIRED_CAPABILITY_DIAGNOSTIC}:buildClassicalNahuatlParticleSourceFrame`,
      );
    }
    return Reflect.apply(
      resolvedBuilder.capability,
      targetObject,
      [normalizedCandidate],
    );
  }

  function requestClassicalSentenceParticleFrame(selections = {}) {
    const hasParticleIdentity = Boolean(
      selections
      && typeof selections === "object"
      && Object.prototype.hasOwnProperty.call(selections, "particleId"),
    );
    if (!hasParticleIdentity) {
      return requestCanonicalResult(
        "sentence:particle-adjunction",
        [selections],
      );
    }
    if (Object.prototype.hasOwnProperty.call(selections, "particleSourceFrame")) {
      throw new Error(
        `${APPLICATION_REQUEST_DIAGNOSTIC}:particle-id-and-source-frame-are-mutually-exclusive`,
      );
    }
    const { particleId, ...sentenceSelections } = selections;
    return requestCanonicalResult("sentence:particle-adjunction", [{
      ...sentenceSelections,
      particleSourceFrame: issueClassicalParticleSourceFrame(particleId),
    }]);
  }

  function requestClassicalParticleResult(candidate = "", options = {}) {
    return requestCanonicalResult(
      "particle:result",
      [issueClassicalParticleSourceFrame(candidate), options],
    );
  }

  function requestClassicalVncSourceSelectionFrame(...args) {
    return requestCanonicalResult("vnc:source-selection", args);
  }

  function requestClassicalOrderedVoiceVncApplicationFrame(...args) {
    return requestCanonicalResult("vnc:ordered-voice-application", args);
  }

  function requestClassicalPronominalNncResult(
    sourceFrame = null,
    operationFrame = null,
  ) {
    return requestCanonicalResult(
      "nnc:pronominal",
      [sourceFrame, operationFrame],
    );
  }

  function prepareClassicalPronominalNncParadigmPlan(
    sourceFrame = null,
    selections = {},
  ) {
    return requestCanonicalResult(
      "nnc:pronominal",
      [sourceFrame, selections],
      CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.preparedPlan,
    );
  }

  function projectClassicalPronominalNncParadigmCoordinates(
    plan = null,
  ) {
    return requestCanonicalResult(
      "nnc:pronominal",
      [plan],
      CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.coordinateProjection,
    );
  }

  function requestClassicalLateVncOperation(...args) {
    return requestCanonicalResult("vnc:derivational-operation", args);
  }

  function requestClassicalVncApplicationResult(...args) {
    return requestCanonicalResult("vnc:application", args);
  }

  function prepareClassicalVncApplicationParadigmPlan(...args) {
    return requestCanonicalResult(
      "vnc:application",
      args,
      CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.preparedPlan,
    );
  }

  function projectClassicalVncApplicationParadigmCoordinates(...args) {
    return requestCanonicalResult(
      "vnc:application",
      args,
      CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.coordinateProjection,
    );
  }

  function requestClassicalNominalConstructionResult(...args) {
    return requestCanonicalResult("grammar:nominal-construction", args);
  }

  function prepareClassicalNominalConstructionParadigmPlan(...args) {
    return requestCanonicalResult(
      "grammar:nominal-construction",
      args,
      CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.preparedPlan,
    );
  }

  function projectClassicalNominalConstructionParadigmCoordinates(...args) {
    return requestCanonicalResult(
      "grammar:nominal-construction",
      args,
      CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.coordinateProjection,
    );
  }

  function requestClassicalDeverbalNncResult(...args) {
    return requestCanonicalResult("nnc:deverbal-construction", args);
  }

  function prepareClassicalDeverbalNncParadigmPlan(...args) {
    return requestCanonicalResult(
      "nnc:deverbal-construction",
      args,
      CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.preparedPlan,
    );
  }

  function projectClassicalDeverbalNncParadigmCoordinates(...args) {
    return requestCanonicalResult(
      "nnc:deverbal-construction",
      args,
      CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.coordinateProjection,
    );
  }

  function requestClassicalAdjectivalModificationResult(...args) {
    return requestCanonicalResult("nnc:adjectival-modification", args);
  }

  function requestClassicalAdverbialNncResult(...args) {
    return requestCanonicalResult("nnc:adverbial", args);
  }

  function prepareClassicalAdverbialNncSource(...args) {
    return requestCanonicalResult(
      "nnc:adverbial",
      args,
      CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.sourcePreparation,
    );
  }

  function prepareClassicalAdverbialNncParadigmPlan(...args) {
    return requestCanonicalResult(
      "nnc:adverbial",
      args,
      CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.preparedPlan,
    );
  }

  function projectClassicalAdverbialNncParadigmCoordinates(...args) {
    return requestCanonicalResult(
      "nnc:adverbial",
      args,
      CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.coordinateProjection,
    );
  }

  function requestClassicalRelationalNncResult(...args) {
    return requestCanonicalResult("nnc:relational", args);
  }

  function prepareClassicalRelationalNncParadigmPlan(...args) {
    return requestCanonicalResult(
      "nnc:relational",
      args,
      CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.preparedPlan,
    );
  }

  function projectClassicalRelationalNncParadigmCoordinates(...args) {
    return requestCanonicalResult(
      "nnc:relational",
      args,
      CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.coordinateProjection,
    );
  }

  function requestClassicalPlaceGentilicResult(...args) {
    return requestCanonicalResult("nnc:place-gentilic", args);
  }

  function prepareClassicalPlaceGentilicParadigmPlan(...args) {
    return requestCanonicalResult(
      "nnc:place-gentilic",
      args,
      CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.preparedPlan,
    );
  }

  function projectClassicalPlaceGentilicParadigmCoordinates(...args) {
    return requestCanonicalResult(
      "nnc:place-gentilic",
      args,
      CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.coordinateProjection,
    );
  }

  function requestClassicalAdverbialAdjunctionResult(...args) {
    return requestCanonicalResult("clause:adverbial-adjunction", args);
  }

  function requestClassicalClauseCompositionResult(...args) {
    return requestCanonicalResult("clause:composition", args);
  }

  function requestClassicalComparisonResult(...args) {
    return requestCanonicalResult("clause:comparison", args);
  }

  function requestClassicalDenominalVncResult(...args) {
    return requestCanonicalResult("vnc:denominal", args);
  }

  function prepareClassicalDenominalVncOperationPathInventory(
    request = {},
  ) {
    const inventoryCapability = resolveCanonicalCallableCapability(
      targetObject,
      "getClassicalNahuatlDenominalVncOperationPathInventory",
      api,
    );
    const validatorCapability = resolveCanonicalCallableCapability(
      targetObject,
      "isClassicalNahuatlDenominalVncOperationPathInventory",
      api,
    );
    if (!inventoryCapability || !validatorCapability) {
      return buildBlockedCanonicalNncApplicationFrame(
        "classical-nahuatl-denominal-vnc-operation-path-inventory",
        "canonical-denominal-operation-path-inventory-capability-missing",
      );
    }
    const inventory = Reflect.apply(
      inventoryCapability.capability,
      targetObject,
      [request],
    );
    let ownerIssued = false;
    try {
      ownerIssued = Reflect.apply(
        validatorCapability.capability,
        targetObject,
        [inventory],
      ) === true;
    } catch {
      ownerIssued = false;
    }
    return ownerIssued
      ? inventory
      : buildBlockedCanonicalNncApplicationFrame(
        "classical-nahuatl-denominal-vnc-operation-path-inventory",
        inventory?.blockReason
          || "canonical-denominal-operation-path-inventory-not-issued",
      );
  }

  function prepareClassicalDenominalVncParadigmPlan(...args) {
    return requestCanonicalResult(
      "vnc:denominal",
      args,
      CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.preparedPlan,
    );
  }

  function projectClassicalDenominalVncParadigmCoordinates(...args) {
    return requestCanonicalResult(
      "vnc:denominal",
      args,
      CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.coordinateProjection,
    );
  }

  function requestClassicalPersonalNameNncResult(...args) {
    return requestCanonicalResult("nnc:personal-name", args);
  }

  function prepareClassicalPersonalNameNncParadigmPlan(...args) {
    return requestCanonicalResult(
      "nnc:personal-name",
      args,
      CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.preparedPlan,
    );
  }

  function projectClassicalPersonalNameNncParadigmCoordinates(...args) {
    return requestCanonicalResult(
      "nnc:personal-name",
      args,
      CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.coordinateProjection,
    );
  }

  function buildBlockedCanonicalNncApplicationFrame(
    kind,
    blockReason,
    extras = {},
  ) {
    return Object.freeze({
      kind,
      version: 1,
      authorizationStatus: "blocked",
      blockReason,
      ...extras,
      typedSourceAuthority: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
      lessonMetadataAuthority: false,
    });
  }

  function issueCanonicalNncSourceFrame(source = {}) {
    if (
      typeof targetObject.buildClassicalNahuatlOrdinaryNncSourceFrame
        !== "function"
      || typeof targetObject.buildClassicalNahuatlPronominalNncSourceFrame
        !== "function"
    ) {
      return buildBlockedCanonicalNncApplicationFrame(
        "classical-nahuatl-nnc-source-frame",
        "canonical-nnc-source-capability-missing",
      );
    }
    const ordinary =
      targetObject.buildClassicalNahuatlOrdinaryNncSourceFrame(source);
    if (
      typeof targetObject.isClassicalNahuatlOrdinaryNncSourceFrame
        === "function"
      && targetObject.isClassicalNahuatlOrdinaryNncSourceFrame(ordinary)
    ) {
      return ordinary;
    }
    const pronominal =
      targetObject.buildClassicalNahuatlPronominalNncSourceFrame(source);
    if (
      typeof targetObject.isClassicalNahuatlPronominalNncSourceFrame
        === "function"
      && targetObject.isClassicalNahuatlPronominalNncSourceFrame(pronominal)
    ) {
      return pronominal;
    }
    return pronominal?.lexicalEntryId
      ? pronominal
      : ordinary?.lexicalEntryId
        ? ordinary
        : ordinary;
  }

  function isIssuedCanonicalNncSourceFrame(sourceFrame = null) {
    return Boolean(
      typeof targetObject.isClassicalNahuatlOrdinaryNncSourceFrame
        === "function"
      && targetObject.isClassicalNahuatlOrdinaryNncSourceFrame(sourceFrame)
      || typeof targetObject.isClassicalNahuatlPronominalNncSourceFrame
        === "function"
      && targetObject.isClassicalNahuatlPronominalNncSourceFrame(sourceFrame),
    );
  }

  function getCanonicalNncOperationSelectionFrame(
    sourceFrame = null,
    selections = {},
  ) {
    if (
      typeof targetObject.buildClassicalNahuatlNncOperationSelectionFrame
        !== "function"
    ) {
      return buildBlockedCanonicalNncApplicationFrame(
        "classical-nahuatl-nnc-operation-selection-frame",
        "canonical-nnc-operation-selection-capability-missing",
        { sourceFrame },
      );
    }
    return targetObject.buildClassicalNahuatlNncOperationSelectionFrame(
      sourceFrame,
      selections,
    );
  }

  function issueCanonicalNncOperationFrame(
    sourceFrame = null,
    selections = {},
  ) {
    if (
      typeof targetObject.isClassicalNahuatlOrdinaryNncSourceFrame
        === "function"
      && targetObject.isClassicalNahuatlOrdinaryNncSourceFrame(sourceFrame)
    ) {
      return typeof targetObject
        .buildClassicalNahuatlOrdinaryNncOperationFrame === "function"
        ? targetObject.buildClassicalNahuatlOrdinaryNncOperationFrame(
          sourceFrame,
          selections,
        )
        : buildBlockedCanonicalNncApplicationFrame(
          "classical-nahuatl-ordinary-nnc-operation-frame",
          "canonical-ordinary-nnc-operation-capability-missing",
          { sourceFrame },
        );
    }
    if (
      typeof targetObject.isClassicalNahuatlPronominalNncSourceFrame
        === "function"
      && targetObject.isClassicalNahuatlPronominalNncSourceFrame(sourceFrame)
    ) {
      return typeof targetObject
        .buildClassicalNahuatlPronominalNncOperationFrame === "function"
        ? targetObject.buildClassicalNahuatlPronominalNncOperationFrame(
          sourceFrame,
          selections,
        )
        : buildBlockedCanonicalNncApplicationFrame(
          "classical-nahuatl-pronominal-nnc-operation-frame",
          "canonical-pronominal-nnc-operation-capability-missing",
          { sourceFrame },
        );
    }
    return buildBlockedCanonicalNncApplicationFrame(
      "classical-nahuatl-nnc-operation-frame",
      "issued-authorized-nnc-source-required",
      { sourceFrame: null },
    );
  }

  api = Object.freeze({
    REQUIRED_CAPABILITY_DIAGNOSTIC,
    APPLICATION_REQUEST_DIAGNOSTIC,
    APPLICATION_RESULT_DIAGNOSTIC,
    APPLICATION_RESULT_KIND,
    APPLICATION_RESULT_CAPTURE_KIND,
    CLASSICAL_VISIBLE_SURFACE_DIAGNOSTIC,
    CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS,
    CLASSICAL_GRAMMAR_APPLICATION_GCD_INVARIANT_IDS: GCD_INVARIANT_IDS,
    CLASSICAL_GRAMMAR_APPLICATION_LCM_AXIS_IDS: LCM_AXIS_IDS,
    getClassicalVisibleSurfaceViolation,
    assertClassicalVisibleSurfaceResult,
    createClassicalGrammarApplicationApi,
    getClassicalGrammarApplicationInventory,
    executeClassicalGrammarApplicationRequest,
    isClassicalGrammarApplicationResult,
    captureClassicalGrammarApplicationResult,
    isClassicalGrammarApplicationResultCapture,
    issueClassicalTranscriptionSourceFrame,
    requestClassicalVncSentenceResultFrame,
    requestClassicalOrdinaryNncResult,
    prepareClassicalOrdinaryNncParadigmPlan,
    projectClassicalOrdinaryNncParadigmCoordinates,
    requestClassicalNncDiagrammaticFrame,
    requestClassicalVncDiagrammaticFrame,
    requestClassicalSentenceAdverbialFrame,
    requestClassicalSentenceParticleFrame,
    requestClassicalParticleResult,
    requestClassicalVncSourceSelectionFrame,
    requestClassicalOrderedVoiceVncApplicationFrame,
    requestClassicalPronominalNncResult,
    prepareClassicalPronominalNncParadigmPlan,
    projectClassicalPronominalNncParadigmCoordinates,
    requestClassicalLateVncOperation,
    requestClassicalVncApplicationResult,
    prepareClassicalVncApplicationParadigmPlan,
    projectClassicalVncApplicationParadigmCoordinates,
    requestClassicalNominalConstructionResult,
    prepareClassicalNominalConstructionParadigmPlan,
    projectClassicalNominalConstructionParadigmCoordinates,
    requestClassicalDeverbalNncResult,
    prepareClassicalDeverbalNncParadigmPlan,
    projectClassicalDeverbalNncParadigmCoordinates,
    requestClassicalAdjectivalModificationResult,
    requestClassicalAdverbialNncResult,
    prepareClassicalAdverbialNncSource,
    prepareClassicalAdverbialNncParadigmPlan,
    projectClassicalAdverbialNncParadigmCoordinates,
    requestClassicalRelationalNncResult,
    prepareClassicalRelationalNncParadigmPlan,
    projectClassicalRelationalNncParadigmCoordinates,
    requestClassicalPlaceGentilicResult,
    prepareClassicalPlaceGentilicParadigmPlan,
    projectClassicalPlaceGentilicParadigmCoordinates,
    requestClassicalAdverbialAdjunctionResult,
    requestClassicalClauseCompositionResult,
    requestClassicalComparisonResult,
    requestClassicalDenominalVncResult,
    prepareClassicalDenominalVncOperationPathInventory,
    prepareClassicalDenominalVncParadigmPlan,
    projectClassicalDenominalVncParadigmCoordinates,
    requestClassicalPersonalNameNncResult,
    prepareClassicalPersonalNameNncParadigmPlan,
    projectClassicalPersonalNameNncParadigmCoordinates,
    issueCanonicalNncSourceFrame,
    isIssuedCanonicalNncSourceFrame,
    getCanonicalNncOperationSelectionFrame,
    issueCanonicalNncOperationFrame,
  });
  return api;
}

export function installClassicalGrammarApplicationGlobals(targetObject = globalThis) {
  const api = createClassicalGrammarApplicationApi(targetObject);
  Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
  captureCanonicalApplicationState(targetObject, api);
  return api;
}
