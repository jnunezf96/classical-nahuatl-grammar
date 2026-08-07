const spec = {
  "ownerId": "classical-adverbial-adjunction-interrogative-nel-collocation",
  "prefix": "ClassicalAdverbialAdjunctionInterrogativeNelCollocation",
  "operationId": "classical.adverbial.adjunction.interrogative.nel.collocation.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-interrogative-nel-collocation-source",
  "domain": "classical-adverbial-adjunction-interrogative-nel-collocation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4671"
  ],
  "coordinates": {
    "claim-p4671::p4671-the-adverbialized-nnc-nel-in-truth-either-alone-or": {
      "assertionId": "classical-adverbial-adjunction-interrogative-nel-collocation:p4671-the-adverbialized-nnc-nel-in-truth-either-alone-or",
      "canonicalPath": "analysis.nelFollowsInterrogativeAdverbial"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4671": [
      "interrogative-nel-collocation"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4671": "authorized"
  }
};
export default Object.freeze(spec);
