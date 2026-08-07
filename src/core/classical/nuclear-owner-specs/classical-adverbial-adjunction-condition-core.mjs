const spec = {
  "ownerId": "classical-adverbial-adjunction-condition-core",
  "prefix": "ClassicalAdverbialAdjunctionConditionCore",
  "operationId": "classical.adverbial.adjunction.condition.core.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-condition-core-source",
  "domain": "classical-adverbial-adjunction-condition-core",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4735"
  ],
  "coordinates": {
    "claim-p4735::p4735-the-adjoined-clause-unit-may-indicate-the-condition-under": {
      "assertionId": "classical-adverbial-adjunction-condition-core:p4735-the-adjoined-clause-unit-may-indicate-the-condition-under",
      "canonicalPath": "analysis.conditionRelationLicensed"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4735": [
      "condition-core"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4735": "authorized"
  }
};
export default Object.freeze(spec);
