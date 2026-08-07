const spec = {
  "ownerId": "classical-adverbial-adjunction-inherent-interrogative-order",
  "prefix": "ClassicalAdverbialAdjunctionInherentInterrogativeOrder",
  "operationId": "classical.adverbial.adjunction.inherent.interrogative.order.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-inherent-interrogative-order-source",
  "domain": "classical-adverbial-adjunction-inherent-interrogative-order",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4667"
  ],
  "coordinates": {
    "claim-p4667::p4667-when-the-modifier-is-an-inherently-interrogative-nnc": {
      "assertionId": "classical-adverbial-adjunction-inherent-interrogative-order:p4667-when-the-modifier-is-an-inherently-interrogative-nnc",
      "canonicalPath": "analysis.inherentlyInterrogativeModifierRetainsForce"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4667": [
      "inherent-interrogative-order"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4667": "authorized"
  }
};
export default Object.freeze(spec);
