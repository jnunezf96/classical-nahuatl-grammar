const spec = {
  "ownerId": "classical-adverbial-adjunction-condition-form-ambiguity",
  "prefix": "ClassicalAdverbialAdjunctionConditionFormAmbiguity",
  "operationId": "classical.adverbial.adjunction.condition.form.ambiguity.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-condition-form-ambiguity-source",
  "domain": "classical-adverbial-adjunction-condition-form-ambiguity",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4746"
  ],
  "coordinates": {
    "claim-p4746::p4746-remember-that-at-times-a-present-indicative-vnc-and": {
      "assertionId": "classical-adverbial-adjunction-condition-form-ambiguity:p4746-remember-that-at-times-a-present-indicative-vnc-and",
      "canonicalPath": "analysis.formIdentityDoesNotSelectMood"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4746": [
      "condition-form-ambiguity"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4746": "authorized"
  }
};
export default Object.freeze(spec);
