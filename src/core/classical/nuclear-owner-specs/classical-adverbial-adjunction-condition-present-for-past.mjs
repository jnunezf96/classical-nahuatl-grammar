const spec = {
  "ownerId": "classical-adverbial-adjunction-condition-present-for-past",
  "prefix": "ClassicalAdverbialAdjunctionConditionPresentForPast",
  "operationId": "classical.adverbial.adjunction.condition.present.for.past.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-condition-present-for-past-source",
  "domain": "classical-adverbial-adjunction-condition-present-for-past",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4747"
  ],
  "coordinates": {
    "claim-p4747::p4747-at-times-the-present-indicative-is-standing-for-a": {
      "assertionId": "classical-adverbial-adjunction-condition-present-for-past:p4747-at-times-the-present-indicative-is-standing-for-a",
      "canonicalPath": "analysis.presentIndicativeMayStandForPast"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4747": [
      "condition-present-for-past"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4747": "authorized"
  }
};
export default Object.freeze(spec);
