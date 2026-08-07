const spec = {
  "ownerId": "classical-adverbial-adjunction-condition-in-optional",
  "prefix": "ClassicalAdverbialAdjunctionConditionInOptional",
  "operationId": "classical.adverbial.adjunction.condition.in.optional.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-condition-in-optional-source",
  "domain": "classical-adverbial-adjunction-condition-in-optional",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4737"
  ],
  "coordinates": {
    "claim-p4737::p4737-if-the-adjunctor-in-is-present": {
      "assertionId": "classical-adverbial-adjunction-condition-in-optional:p4737-if-the-adjunctor-in-is-present",
      "canonicalPath": "analysis.conditionAdjunctorOptionalityLicensed"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4737": [
      "condition-in-optional"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4737": "authorized"
  }
};
export default Object.freeze(spec);
