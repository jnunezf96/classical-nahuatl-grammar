const spec = {
  "ownerId": "classical-adverbial-adjunction-condition-hypothetical-present-future",
  "prefix": "ClassicalAdverbialAdjunctionConditionHypotheticalPresentFuture",
  "operationId": "classical.adverbial.adjunction.condition.hypothetical.present.future.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-condition-hypothetical-present-future-source",
  "domain": "classical-adverbial-adjunction-condition-hypothetical-present-future",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4750",
    "claim-p4751"
  ],
  "coordinates": {
    "claim-p4750::p4750-when-the-supposition-refers-to-present-or-future-time": {
      "assertionId": "classical-adverbial-adjunction-condition-hypothetical-present-future:p4750-when-the-supposition-refers-to-present-or-future-time",
      "canonicalPath": "analysis.presentFutureHypothesisRequiresPastOptative"
    },
    "claim-p4751::p4751-when-the-supposition-refers-to-present-or-future-time": {
      "assertionId": "classical-adverbial-adjunction-condition-hypothetical-present-future:p4751-when-the-supposition-refers-to-present-or-future-time",
      "canonicalPath": "result.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4750": [
      "condition-hypothetical-present-future"
    ],
    "claim-p4751": [
      "condition-hypothetical-present-future"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4750": "authorized",
    "claim-p4751": "authorized"
  }
};
export default Object.freeze(spec);
