const spec = {
  "ownerId": "classical-dyadic-possessor-category-distribution",
  "prefix": "ClassicalDyadicPossessorCategoryDistribution",
  "operationId": "classical.dyadic.possessor.category.distribution.execute",
  "inputContract": "complete-typed-classical-dyadic-possessor-category-distribution-source",
  "domain": "classical-dyadic-possessor-category-distribution",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nnc-layer-evaluator",
  "selections": [
    "claim-p1401",
    "claim-p1402",
    "claim-p1403",
    "claim-p1404",
    "claim-p1405",
    "claim-p1406",
    "claim-p1407",
    "claim-p1408",
    "claim-p1409"
  ],
  "coordinates": {
    "claim-p1401::p1401-when-the-state-position-is-dyadic-the-categories-of": {
      "assertionId": "classical-dyadic-possessor-category-distribution:p1401-when-the-state-position-is-dyadic-the-categories-of",
      "canonicalPath": "stateFrame.arity"
    },
    "claim-p1402::p1402-when-the-state-position-is-dyadic": {
      "assertionId": "classical-dyadic-possessor-category-distribution:p1402-when-the-state-position-is-dyadic",
      "canonicalPath": "contractGreatestCommonDivisor.stateArity"
    },
    "claim-p1403::p1403-1-subposition-st1-always-manifests-the-category-of-person": {
      "assertionId": "classical-dyadic-possessor-category-distribution:p1403-1-subposition-st1-always-manifests-the-category-of-person",
      "canonicalPath": "stateFrame.slots.0.role"
    },
    "claim-p1404::p1404-the-sole-morphic-filler-is-i-3rd-possessive": {
      "assertionId": "classical-dyadic-possessor-category-distribution:p1404-the-sole-morphic-filler-is-i-3rd-possessive",
      "canonicalPath": "stateFrame.slots.0.carrier"
    },
    "claim-p1405::p1405-for-the-third-person-person-is-combined-with-the": {
      "assertionId": "classical-dyadic-possessor-category-distribution:p1405-for-the-third-person-person-is-combined-with-the",
      "canonicalPath": "contractPossessorStateShapeInventory.11.possessiveCaseLocation"
    },
    "claim-p1406::p1406-for-the-first-and-second-persons-person-is-combined": {
      "assertionId": "classical-dyadic-possessor-category-distribution:p1406-for-the-first-and-second-persons-person-is-combined",
      "canonicalPath": "contractPossessorStateShapeInventory.3.possessorNumber"
    },
    "claim-p1407::p1407-there-are-four-morphic-fillers": {
      "assertionId": "classical-dyadic-possessor-category-distribution:p1407-there-are-four-morphic-fillers",
      "canonicalPath": "contractPossessorStateShapeInventory.length"
    },
    "claim-p1408::p1408-they-are-the-same-as-those-in-subposition-va1": {
      "assertionId": "classical-dyadic-possessor-category-distribution:p1408-they-are-the-same-as-those-in-subposition-va1",
      "canonicalPath": "stateFrame.slots.0.carrier"
    },
    "claim-p1409::p1409-2-subposition-st2-makes-up-for-the-category-not": {
      "assertionId": "classical-dyadic-possessor-category-distribution:p1409-2-subposition-st2-makes-up-for-the-category-not",
      "canonicalPath": "stateFrame.slots.1.role"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlPossessiveNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlPossessiveNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p1401": [
      "dyadic-1sg"
    ],
    "claim-p1402": [
      "dyadic-1sg"
    ],
    "claim-p1403": [
      "dyadic-1sg"
    ],
    "claim-p1404": [
      "dyadic-3sg"
    ],
    "claim-p1405": [
      "dyadic-3sg"
    ],
    "claim-p1406": [
      "dyadic-1sg"
    ],
    "claim-p1407": [
      "dyadic-1sg"
    ],
    "claim-p1408": [
      "dyadic-2pl"
    ],
    "claim-p1409": [
      "dyadic-1sg"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1401": "authorized",
    "claim-p1402": "authorized",
    "claim-p1403": "authorized",
    "claim-p1404": "authorized",
    "claim-p1405": "authorized",
    "claim-p1406": "authorized",
    "claim-p1407": "authorized",
    "claim-p1408": "authorized",
    "claim-p1409": "authorized"
  }
};
export default Object.freeze(spec);
