const spec = {
  "ownerId": "classical-adverbial-adjunction-time-other-expression",
  "prefix": "ClassicalAdverbialAdjunctionTimeOtherExpression",
  "operationId": "classical.adverbial.adjunction.time.other.expression.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-time-other-expression-source",
  "domain": "classical-adverbial-adjunction-time-other-expression",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4711"
  ],
  "coordinates": {
    "claim-p4711::p4711-other-temporal-adverbial-expressions-besides-ihcua-c-and-i": {
      "assertionId": "classical-adverbial-adjunction-time-other-expression:p4711-other-temporal-adverbial-expressions-besides-ihcua-c-and-i",
      "canonicalPath": "analysis.otherTemporalEmbedsLicensed"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4711": [
      "time-other-expression"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4711": "authorized"
  }
};
export default Object.freeze(spec);
