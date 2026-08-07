// Documentary semantic accounting for the grammar claims indexed by Andrews
// Lessons 23-26. These frozen records let source audits map curriculum evidence
// to the reusable owners named in `ownerCapabilities`; they are never a
// runtime operation, generation contract, Result, or authority tier.

function freeze(value) {
  if (Array.isArray(value)) return Object.freeze(value.map(freeze));
  if (!value || typeof value !== "object" || Object.isFrozen(value)) return value;
  return Object.freeze(Object.fromEntries(
    Object.entries(value).map(([key, entry]) => [key, freeze(entry)])
  ));
}

const AXIS_CONSTRAINTS = freeze({
  "lesson25-alternatives": {
    axisConstraintId: "lesson25-causative-alternative-selected",
    licensedProbeCoordinate: "causative:type-one:replacement:tomi:tom-a",
    unlicensedProbeCoordinate: {
      kind: "classical-owner-axis-coordinate-unlicensed",
    },
    licensedProbeReceiptIndex: 1,
    predicateConstraint: {
      predicateId: "lesson25-owner-selected-alternative",
      valueKinds: ["string"],
    },
    ownerCoordinatePath: [
      "normalizedRequest",
      "derivationOptionId",
    ],
    ownerCoordinateProjectionKind: "direct",
  },
  "lesson26-alternatives": {
    axisConstraintId: "lesson26-applicative-alternative-selected",
    licensedProbeCoordinate:
      "applicative:type-one:optional-final-vowel-replacement:mati:mat-iā",
    unlicensedProbeCoordinate: {
      kind: "classical-owner-axis-coordinate-unlicensed",
    },
    licensedProbeReceiptIndex: 2,
    predicateConstraint: {
      predicateId: "lesson26-owner-selected-alternative",
      valueKinds: ["string"],
    },
    ownerCoordinatePath: [
      "normalizedRequest",
      "derivationOptionId",
    ],
    ownerCoordinateProjectionKind: "direct",
  },
});

const AXIS_SPECS = [
  ["lesson23-object-kinds", "typed-distinction", "participant-history", ["buildClassicalNahuatlObjectClusterFrame", "deriveClassicalNahuatlVncDerivationOperationFrame"], "contextual-fact"],
  ["lesson23-governor-unit", "typed-invariant", "participant-history", ["buildClassicalNahuatlObjectClusterFrame"], "derived-fact"],
  ["lesson23-history", "ordered-restriction", "participant-history", ["buildClassicalNahuatlObjectClusterFrame", "deriveClassicalNahuatlVncDerivationOperationFrame"], "derived-fact"],
  ["lesson23-position", "structural-restriction", "participant-history", ["buildClassicalNahuatlObjectClusterFrame"], "derived-fact"],
  ["lesson23-reflexive", "conditioned-restriction", "participant-history", ["buildClassicalNahuatlObjectClusterFrame"], "contextual-fact"],
  ["lesson23-order", "linear-order", "participant-history", ["buildClassicalNahuatlObjectClusterFrame"], "derived-fact"],
  ["lesson23-silencing", "conditioned-realization", "participant-history", ["buildClassicalNahuatlObjectClusterFrame"], "boundary-conditioned-fact"],
  ["lesson23-formula", "typed-projection", "boundary-realization", ["applyClassicalNahuatlLesson23ObjectClusterToMachineryFrame", "renderClassicalNahuatlVncSlotFrameFormula"], "derived-fact"],
  ["lesson23-combinations", "paradigm-consequence", "participant-history", ["buildClassicalNahuatlObjectClusterFrame"], "derived-fact"],

  ["lesson24-valence", "typed-distinction", "source-analysis", ["buildClassicalNahuatlVerbstemClassFrame", "getClassicalNahuatlVncDerivationOptionInventory", "getClassicalNahuatlNonactiveStemOptions"], "lexical-fact"],
  ["lesson24-type-one", "conditioned-operation", "licensed-operation", ["getClassicalNahuatlVncDerivationOptionInventory"], "derived-fact"],
  ["lesson24-stock", "ordered-operation", "source-analysis", ["evaluateClassicalNahuatlVncApplication"], "derived-fact"],
  ["lesson24-paradigm", "paradigm-consequence", "finite-result", ["buildClassicalNahuatlVerbstemClassFrame", "getClassicalNahuatlVncDerivationOptionInventory"], "derived-fact"],
  ["lesson24-destockal", "conditioned-operation", "licensed-operation", ["getClassicalNahuatlVncDerivationOptionInventory"], "derived-fact"],
  ["lesson24-boundary", "conditioned-realization", "boundary-realization", ["evaluateClassicalNahuatlVncApplication"], "boundary-conditioned-fact"],
  ["lesson24-synonym", "lexical-alternative", "source-analysis", ["evaluateClassicalNahuatlVncApplication"], "lexical-fact"],
  ["lesson24-i-hui", "conditioned-operation", "licensed-operation", ["getClassicalNahuatlVncDerivationOptionInventory"], "derived-fact"],
  ["lesson24-negative", "negative-restriction", "licensed-operation", ["getClassicalNahuatlVncDerivationOptionInventory"], "derived-fact"],
  ["lesson24-transform", "participant-transform", "participant-history", ["deriveClassicalNahuatlVncDerivationOperationFrame", "buildClassicalNahuatlDerivedVncMachineryFrame"], "derived-fact"],

  ["lesson25-type-two", "conditioned-operation", "licensed-operation", ["getClassicalNahuatlVncDerivationOptionInventory"], "derived-fact"],
  ["lesson25-suppletion", "lexical-exception", "licensed-operation", ["getClassicalNahuatlVncDerivationOptionInventory"], "lexical-fact"],
  ["lesson25-nonactive-source", "conditioned-source", "source-analysis", ["getClassicalNahuatlVncDerivationOptionInventory"], "lexical-fact"],
  ["lesson25-transform", "participant-transform", "participant-history", ["deriveClassicalNahuatlVncDerivationOperationFrame"], "derived-fact"],
  ["lesson25-lo", "conditioned-operation", "licensed-operation", ["getClassicalNahuatlVncDerivationOptionInventory"], "derived-fact"],
  ["lesson25-lia", "conditioned-operation", "licensed-operation", ["getClassicalNahuatlVncDerivationOptionInventory"], "derived-fact"],
  ["lesson25-huia", "conditioned-operation", "licensed-operation", ["getClassicalNahuatlVncDerivationOptionInventory"], "derived-fact"],
  ["lesson25-paradigm", "paradigm-consequence", "finite-result", ["buildClassicalNahuatlDerivedVncMachineryFrame"], "derived-fact"],
  ["lesson25-alternatives", "genuine-choice", "licensed-operation", ["getClassicalNahuatlVncDerivationOptionInventory"], "genuine-user-choice"],
  ["lesson25-double-object", "interaction", "participant-history", ["deriveClassicalNahuatlVncDerivationOperationFrame", "buildClassicalNahuatlObjectClusterFrame"], "derived-fact"],
  ["lesson25-triple-object", "interaction", "participant-history", ["deriveClassicalNahuatlVncDerivationOperationFrame", "buildClassicalNahuatlObjectClusterFrame"], "derived-fact"],
  ["lesson25-ambiguity", "alternative-source-analysis", "source-analysis", ["deriveClassicalNahuatlVncDerivationOperationFrame"], "lexical-fact"],
  ["lesson25-mood", "mood-interaction", "finite-result", ["evaluateClassicalNahuatlVncApplication"], "contextual-fact"],
  ["lesson25-voice", "voice-interaction", "finite-result", ["deriveClassicalNahuatlOrderedVoiceLayerChain"], "contextual-fact"],
  ["lesson25-supplementation", "sentence-interaction", "finite-result", ["evaluateClassicalNahuatlSupplementationOperation"], "derived-fact"],

  ["lesson26-nature", "typed-distinction", "licensed-operation", ["getClassicalNahuatlVncDerivationOptionInventory"], "derived-fact"],
  ["lesson26-type-one", "conditioned-operation", "licensed-operation", ["getClassicalNahuatlVncDerivationOptionInventory"], "derived-fact"],
  ["lesson26-type-two", "conditioned-operation", "licensed-operation", ["getClassicalNahuatlVncDerivationOptionInventory"], "derived-fact"],
  ["lesson26-final-a", "conditioned-routing", "licensed-operation", ["getClassicalNahuatlVncDerivationOptionInventory"], "boundary-conditioned-fact"],
  ["lesson26-ambiguity", "alternative-source-analysis", "source-analysis", ["deriveClassicalNahuatlVncDerivationOperationFrame", "getClassicalNahuatlVncDerivationOptionInventory"], "lexical-fact"],
  ["lesson26-exceptions", "lexical-exception", "licensed-operation", ["getClassicalNahuatlVncDerivationOptionInventory"], "lexical-fact"],
  ["lesson26-o-a", "conditioned-operation", "licensed-operation", ["getClassicalNahuatlVncDerivationOptionInventory"], "derived-fact"],
  ["lesson26-final-o", "governor-ambiguity", "participant-history", ["getClassicalNahuatlVncDerivationOptionInventory"], "contextual-fact"],
  ["lesson26-rare", "lexical-exception", "licensed-operation", ["getClassicalNahuatlVncDerivationOptionInventory"], "lexical-fact"],
  ["lesson26-alternatives", "genuine-choice", "licensed-operation", ["getClassicalNahuatlVncDerivationOptionInventory"], "genuine-user-choice"],
  ["lesson26-paradigm", "paradigm-consequence", "finite-result", ["buildClassicalNahuatlDerivedVncMachineryFrame"], "derived-fact"],
  ["lesson26-transform", "participant-transform", "participant-history", ["deriveClassicalNahuatlVncDerivationOperationFrame"], "derived-fact"],
  ["lesson26-double-object", "interaction", "participant-history", ["deriveClassicalNahuatlVncDerivationOperationFrame", "buildClassicalNahuatlObjectClusterFrame", "evaluateClassicalNahuatlSupplementationOperation"], "derived-fact"],
  ["lesson26-triple-object", "interaction", "participant-history", ["deriveClassicalNahuatlVncDerivationOperationFrame", "buildClassicalNahuatlObjectClusterFrame"], "derived-fact"],
  ["lesson26-mood", "mood-interaction", "finite-result", ["evaluateClassicalNahuatlVncApplication"], "contextual-fact"],
  ["lesson26-voice", "voice-interaction", "finite-result", ["deriveClassicalNahuatlOrderedVoiceLayerChain"], "contextual-fact"],
  ["lesson26-humanity", "genuine-choice", "participant-history", ["deriveClassicalNahuatlVncDerivationOperationFrame"], "contextual-fact"],
];

export const CLASSICAL_NAHUATL_LESSONS23_26_GCD = freeze({
  identityId: "classical-vnc:typed-source>licensed-operation>participant-governor-history>boundary-realization>finite-result",
  stageOrder: [
    "source-analysis",
    "licensed-operation",
    "participant-history",
    "boundary-realization",
    "finite-result",
  ],
  smallestSharedInvariant: "A canonical typed VNC source is consumed by one licensed operation; typed participant and governor history then reaches boundary realization and one finite result.",
});

export const CLASSICAL_NAHUATL_LESSONS23_26_LCM = freeze({
  identityId: "classical-vnc:lessons23-26-complete-licensed-distinction-space",
  axes: AXIS_SPECS.map(([axisId, distinctionKind, prerequisite, ownerCapabilities, semanticFactRole]) => ({
    axisId,
    distinctionKind,
    prerequisite,
    ownerCapabilities,
    semanticFactRole,
    ...(AXIS_CONSTRAINTS[axisId] || {}),
  })),
});
