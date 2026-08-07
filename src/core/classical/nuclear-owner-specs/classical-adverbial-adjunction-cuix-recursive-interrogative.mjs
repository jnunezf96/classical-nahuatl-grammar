const spec = {
  "ownerId": "classical-adverbial-adjunction-cuix-recursive-interrogative",
  "prefix": "ClassicalAdverbialAdjunctionCuixRecursiveInterrogative",
  "operationId": "classical.adverbial.adjunction.cuix.recursive.interrogative.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-cuix-recursive-interrogative-source",
  "domain": "classical-adverbial-adjunction-cuix-recursive-interrogative",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4666"
  ],
  "coordinates": {
    "claim-p4666::p4666-the-interrogative-particle-cuix-perchance-can-participate-in-this": {
      "assertionId": "classical-adverbial-adjunction-cuix-recursive-interrogative:p4666-the-interrogative-particle-cuix-perchance-can-participate-in-this",
      "canonicalPath": "analysis.cuixMayModifyRecursiveAdjunction"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4666": [
      "cuix-recursive-interrogative"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4666": "authorized"
  }
};
export default Object.freeze(spec);
