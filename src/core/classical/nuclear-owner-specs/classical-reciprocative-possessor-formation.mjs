const spec = {
  "ownerId": "classical-reciprocative-possessor-formation",
  "prefix": "ClassicalReciprocativePossessorFormation",
  "operationId": "classical.reciprocative.possessor.formation.execute",
  "inputContract": "complete-typed-classical-reciprocative-possessor-formation-source",
  "domain": "classical-reciprocative-possessor-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nnc-layer-evaluator",
  "selections": [
    "claim-p1398",
    "claim-p1399"
  ],
  "coordinates": {
    "claim-p1398::p1398-the-reciprocative-possessor-morph-ne-one-another-s-each": {
      "assertionId": "classical-reciprocative-possessor-formation:p1398-the-reciprocative-possessor-morph-ne-one-another-s-each",
      "canonicalPath": "stateFrame.possessorRole"
    },
    "claim-p1399::p1399-as-can-be-seen-the-meaning-of-this-morph": {
      "assertionId": "classical-reciprocative-possessor-formation:p1399-as-can-be-seen-the-meaning-of-this-morph",
      "canonicalPath": "contractPossessorStateShapeInventory.0.conditioning"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlPossessiveNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlPossessiveNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p1398": [
      "monadic-ne"
    ],
    "claim-p1399": [
      "monadic-ne"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1398": "authorized",
    "claim-p1399": "authorized"
  }
};
export default Object.freeze(spec);
