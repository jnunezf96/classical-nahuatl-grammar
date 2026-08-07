const spec = {
  "ownerId": "classical-adverbial-adjunction-condition-hypothetical-past",
  "prefix": "ClassicalAdverbialAdjunctionConditionHypotheticalPast",
  "operationId": "classical.adverbial.adjunction.condition.hypothetical.past.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-condition-hypothetical-past-source",
  "domain": "classical-adverbial-adjunction-condition-hypothetical-past",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4754",
    "claim-p4755"
  ],
  "coordinates": {
    "claim-p4754::p4754-when-the-supposition-refers-to-a-past-time": {
      "assertionId": "classical-adverbial-adjunction-condition-hypothetical-past:p4754-when-the-supposition-refers-to-a-past-time",
      "canonicalPath": "analysis.pastHypothesisRequiresPastOptative"
    },
    "claim-p4755::p4755-when-the-supposition-refers-to-a-past-time-the": {
      "assertionId": "classical-adverbial-adjunction-condition-hypothetical-past:p4755-when-the-supposition-refers-to-a-past-time-the",
      "canonicalPath": "result.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4754": [
      "condition-hypothetical-past"
    ],
    "claim-p4755": [
      "condition-hypothetical-past"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4754": "authorized",
    "claim-p4755": "authorized"
  }
};
export default Object.freeze(spec);
