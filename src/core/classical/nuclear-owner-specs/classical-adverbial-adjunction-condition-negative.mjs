const spec = {
  "ownerId": "classical-adverbial-adjunction-condition-negative",
  "prefix": "ClassicalAdverbialAdjunctionConditionNegative",
  "operationId": "classical.adverbial.adjunction.condition.negative.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-condition-negative-source",
  "domain": "classical-adverbial-adjunction-condition-negative",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4743"
  ],
  "coordinates": {
    "claim-p4743::p4743-the-collocation-in-tla-ca-or-the-slightly-more": {
      "assertionId": "classical-adverbial-adjunction-condition-negative:p4743-the-collocation-in-tla-ca-or-the-slightly-more",
      "canonicalPath": "analysis.negativeConditionalMarkerLicensed"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4743": [
      "condition-negative"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4743": "authorized"
  }
};
export default Object.freeze(spec);
