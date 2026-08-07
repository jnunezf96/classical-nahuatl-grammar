const spec = {
  "ownerId": "classical-adverbial-adjunction-condition-nnc-center",
  "prefix": "ClassicalAdverbialAdjunctionConditionNncCenter",
  "operationId": "classical.adverbial.adjunction.condition.nnc.center.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-condition-nnc-center-source",
  "domain": "classical-adverbial-adjunction-condition-nnc-center",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4741"
  ],
  "coordinates": {
    "claim-p4741::p4741-the-center-of-the-adjunct-may-be-an-nnc": {
      "assertionId": "classical-adverbial-adjunction-condition-nnc-center:p4741-the-center-of-the-adjunct-may-be-an-nnc",
      "canonicalPath": "analysis.nncMayCenterConditionAdjunct"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4741": [
      "condition-nnc-center"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4741": "authorized"
  }
};
export default Object.freeze(spec);
