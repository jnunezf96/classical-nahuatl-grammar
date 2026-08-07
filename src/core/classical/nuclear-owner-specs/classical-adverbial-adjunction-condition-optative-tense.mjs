const spec = {
  "ownerId": "classical-adverbial-adjunction-condition-optative-tense",
  "prefix": "ClassicalAdverbialAdjunctionConditionOptativeTense",
  "operationId": "classical.adverbial.adjunction.condition.optative.tense.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-condition-optative-tense-source",
  "domain": "classical-adverbial-adjunction-condition-optative-tense",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4745"
  ],
  "coordinates": {
    "claim-p4745::p4745-it-is-also-possible-to-use-the-future-optative": {
      "assertionId": "classical-adverbial-adjunction-condition-optative-tense:p4745-it-is-also-possible-to-use-the-future-optative",
      "canonicalPath": "analysis.futureAndPreteritOptativeLicensed"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4745": [
      "condition-optative-tense"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4745": "authorized"
  }
};
export default Object.freeze(spec);
