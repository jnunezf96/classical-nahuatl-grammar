const spec = {
  "ownerId": "classical-adverbial-adjunction-simple-order-reverse",
  "prefix": "ClassicalAdverbialAdjunctionSimpleOrderReverse",
  "operationId": "classical.adverbial.adjunction.simple.order.reverse.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-simple-order-reverse-source",
  "domain": "classical-adverbial-adjunction-simple-order-reverse",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4655"
  ],
  "coordinates": {
    "claim-p4655::p4655-while-the-modifier-normally-precedes-the-head-it-is": {
      "assertionId": "classical-adverbial-adjunction-simple-order-reverse:p4655-while-the-modifier-normally-precedes-the-head-it-is",
      "canonicalPath": "analysis.headModifierOrderLicensed"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4655": [
      "simple-order-reverse"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4655": "authorized"
  }
};
export default Object.freeze(spec);
