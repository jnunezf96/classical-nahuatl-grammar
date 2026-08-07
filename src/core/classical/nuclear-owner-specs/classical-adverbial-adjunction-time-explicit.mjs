const spec = {
  "ownerId": "classical-adverbial-adjunction-time-explicit",
  "prefix": "ClassicalAdverbialAdjunctionTimeExplicit",
  "operationId": "classical.adverbial.adjunction.time.explicit.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-time-explicit-source",
  "domain": "classical-adverbial-adjunction-time-explicit",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4707"
  ],
  "coordinates": {
    "claim-p4707::p4707-the-temporal-meaning-may-be-explicitly-expressed-by-an": {
      "assertionId": "classical-adverbial-adjunction-time-explicit:p4707-the-temporal-meaning-may-be-explicitly-expressed-by-an",
      "canonicalPath": "analysis.explicitTemporalAdverbialLicensed"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4707": [
      "time-explicit"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4707": "authorized"
  }
};
export default Object.freeze(spec);
