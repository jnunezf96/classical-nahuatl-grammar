const spec = {
  "ownerId": "classical-adverbial-adjunction-condition-antecessive-absent",
  "prefix": "ClassicalAdverbialAdjunctionConditionAntecessiveAbsent",
  "operationId": "classical.adverbial.adjunction.condition.antecessive.absent.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-condition-antecessive-absent-source",
  "domain": "classical-adverbial-adjunction-condition-antecessive-absent",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4752"
  ],
  "coordinates": {
    "claim-p4752::p4752-the-antecessive-order-prefix-is-obligatorily-absent": {
      "assertionId": "classical-adverbial-adjunction-condition-antecessive-absent:p4752-the-antecessive-order-prefix-is-obligatorily-absent",
      "canonicalPath": "analysis.presentFutureHypothesisRequiresAbsentAntecessive"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4752": [
      "condition-antecessive-absent"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4752": "authorized"
  }
};
export default Object.freeze(spec);
