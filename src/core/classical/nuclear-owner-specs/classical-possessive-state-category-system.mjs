const spec = {
  "ownerId": "classical-possessive-state-category-system",
  "prefix": "ClassicalPossessiveStateCategorySystem",
  "operationId": "classical.possessive.state.category.system.execute",
  "inputContract": "complete-typed-classical-possessive-state-category-system-source",
  "domain": "classical-possessive-state-category-system",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nnc-layer-evaluator",
  "selections": [
    "claim-p1392",
    "claim-p1393",
    "claim-p1394",
    "claim-p1395",
    "claim-p1396",
    "claim-p1397"
  ],
  "coordinates": {
    "claim-p1392::p1392-the-only-other-constituent-in-the-predicate-is-the": {
      "assertionId": "classical-possessive-state-category-system:p1392-the-only-other-constituent-in-the-predicate-is-the",
      "canonicalPath": "contractGreatestCommonDivisor.statePosition"
    },
    "claim-p1393::p1393-as-a-position-that-is-filled-by-a-prefixal": {
      "assertionId": "classical-possessive-state-category-system:p1393-as-a-position-that-is-filled-by-a-prefixal",
      "canonicalPath": "contractGreatestCommonDivisor.stateCategories"
    },
    "claim-p1394::p1394-the-case-here-is-possessive": {
      "assertionId": "classical-possessive-state-category-system:p1394-the-case-here-is-possessive",
      "canonicalPath": "contractPossessorStateShapeInventory.3.possessiveCaseLocation"
    },
    "claim-p1395::p1395-when-the-state-position-is-monadic-the-categories-are": {
      "assertionId": "classical-possessive-state-category-system:p1395-when-the-state-position-is-monadic-the-categories-are",
      "canonicalPath": "stateFrame.arity"
    },
    "claim-p1396::p1396-when-the-state-position-is-monadic": {
      "assertionId": "classical-possessive-state-category-system:p1396-when-the-state-position-is-monadic",
      "canonicalPath": "contractPossessorStateShapeInventory.1.stateArity"
    },
    "claim-p1397::p1397-there-are-three-possible-fillers-having-the-same-shape": {
      "assertionId": "classical-possessive-state-category-system:p1397-there-are-three-possible-fillers-having-the-same-shape",
      "canonicalPath": "stateFrame.arity"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlPossessiveNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlPossessiveNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p1392": [
      "dyadic-1sg"
    ],
    "claim-p1393": [
      "dyadic-1sg"
    ],
    "claim-p1394": [
      "dyadic-1sg"
    ],
    "claim-p1395": [
      "monadic-te"
    ],
    "claim-p1396": [
      "monadic-te"
    ],
    "claim-p1397": [
      "dyadic-1sg"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1392": "authorized",
    "claim-p1393": "authorized",
    "claim-p1394": "authorized",
    "claim-p1395": "authorized",
    "claim-p1396": "authorized",
    "claim-p1397": "authorized"
  }
};
export default Object.freeze(spec);
