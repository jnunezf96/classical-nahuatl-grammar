const spec = {
  "ownerId": "classical-possessor-number-boundary-formation",
  "prefix": "ClassicalPossessorNumberBoundaryFormation",
  "operationId": "classical.possessor.number.boundary.formation.execute",
  "inputContract": "complete-typed-classical-possessor-number-boundary-formation-source",
  "domain": "classical-possessor-number-boundary-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nnc-layer-evaluator",
  "selections": [
    "claim-p1410",
    "claim-p1411",
    "claim-p1412",
    "claim-p1413",
    "claim-p1414"
  ],
  "coordinates": {
    "claim-p1410::p1410-for-the-third-person-it-manifests-number-the-morphic": {
      "assertionId": "classical-possessor-number-boundary-formation:p1410-for-the-third-person-it-manifests-number-the-morphic",
      "canonicalPath": "contractPossessorStateShapeInventory.11.possessorNumber"
    },
    "claim-p1411::p1411-0-singular": {
      "assertionId": "classical-possessor-number-boundary-formation:p1411-0-singular",
      "canonicalPath": "stateFrame.slots.1.carrier"
    },
    "claim-p1412::p1412-m-n-plural-concerning-the-suspension-points-see-2": {
      "assertionId": "classical-possessor-number-boundary-formation:p1412-m-n-plural-concerning-the-suspension-points-see-2",
      "canonicalPath": "contractPossessorShapeIdentitiesByPossessor.3pl"
    },
    "claim-p1413::p1413-whenever-the-nounstem-begins-with-a-vowel": {
      "assertionId": "classical-possessor-number-boundary-formation:p1413-whenever-the-nounstem-begins-with-a-vowel",
      "canonicalPath": "contractPossessorStateShapeInventory.4.conditioning"
    },
    "claim-p1414::p1414-the-morphic-filler-is-o-but-whenever-the-nounstem": {
      "assertionId": "classical-possessor-number-boundary-formation:p1414-the-morphic-filler-is-o-but-whenever-the-nounstem",
      "canonicalPath": "contractPossessorShapeIdentitiesByPossessor.1sg"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlPossessiveNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlPossessiveNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p1410": [
      "dyadic-3sg"
    ],
    "claim-p1411": [
      "dyadic-3sg"
    ],
    "claim-p1412": [
      "dyadic-3pl-m"
    ],
    "claim-p1413": [
      "dyadic-1sg"
    ],
    "claim-p1414": [
      "dyadic-1sg"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1410": "authorized",
    "claim-p1411": "authorized",
    "claim-p1412": "authorized",
    "claim-p1413": "authorized",
    "claim-p1414": "authorized"
  }
};
export default Object.freeze(spec);
