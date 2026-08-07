const spec = {
  "ownerId": "classical-adverbial-adjunction-negative-niman-intensifier",
  "prefix": "ClassicalAdverbialAdjunctionNegativeNimanIntensifier",
  "operationId": "classical.adverbial.adjunction.negative.niman.intensifier.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-negative-niman-intensifier-source",
  "domain": "classical-adverbial-adjunction-negative-niman-intensifier",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4682"
  ],
  "coordinates": {
    "claim-p4682::p4682-the-adverbialized-nnc-niman-at-this-very-moment-now": {
      "assertionId": "classical-adverbial-adjunction-negative-niman-intensifier:p4682-the-adverbialized-nnc-niman-at-this-very-moment-now",
      "canonicalPath": "analysis.negativeScopeIntensifierLicensed"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4682": [
      "negative-niman-intensifier"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4682": "authorized"
  }
};
export default Object.freeze(spec);
