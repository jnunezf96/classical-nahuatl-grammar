const spec = {
  "ownerId": "classical-adverbial-adjunction-purpose-future",
  "prefix": "ClassicalAdverbialAdjunctionPurposeFuture",
  "operationId": "classical.adverbial.adjunction.purpose.future.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-purpose-future-source",
  "domain": "classical-adverbial-adjunction-purpose-future",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4728"
  ],
  "coordinates": {
    "claim-p4728::p4728-its-nnc-is-usually-in-the-future-tense": {
      "assertionId": "classical-adverbial-adjunction-purpose-future:p4728-its-nnc-is-usually-in-the-future-tense",
      "canonicalPath": "analysis.futurePurposeIsUsual"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4728": [
      "purpose-future"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4728": "authorized"
  }
};
export default Object.freeze(spec);
