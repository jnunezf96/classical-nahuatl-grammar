const spec = {
  "ownerId": "classical-adverbial-adjunction-condition-until",
  "prefix": "ClassicalAdverbialAdjunctionConditionUntil",
  "operationId": "classical.adverbial.adjunction.condition.until.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-condition-until-source",
  "domain": "classical-adverbial-adjunction-condition-until",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4748",
    "claim-p4749"
  ],
  "coordinates": {
    "claim-p4748::p4748-if-not-at-that-time": {
      "assertionId": "classical-adverbial-adjunction-condition-until:p4748-if-not-at-that-time",
      "canonicalPath": "analysis.negativeTemporalConditionalMayExpressUntil"
    },
    "claim-p4749::p4749-the-collocation-in-tla-camo-ihcua-c-if-not": {
      "assertionId": "classical-adverbial-adjunction-condition-until:p4749-the-collocation-in-tla-camo-ihcua-c-if-not",
      "canonicalPath": "result.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4748": [
      "condition-until"
    ],
    "claim-p4749": [
      "condition-until"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4748": "authorized",
    "claim-p4749": "authorized"
  }
};
export default Object.freeze(spec);
