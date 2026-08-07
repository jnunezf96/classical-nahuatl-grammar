const spec = {
  "ownerId": "classical-adverbial-adjunction-cuix-first-order",
  "prefix": "ClassicalAdverbialAdjunctionCuixFirstOrder",
  "operationId": "classical.adverbial.adjunction.cuix.first.order.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-cuix-first-order-source",
  "domain": "classical-adverbial-adjunction-cuix-first-order",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4668",
    "claim-p4669"
  ],
  "coordinates": {
    "claim-p4668::p4668-if-there-is-no-inherently-interrogative-modifier": {
      "assertionId": "classical-adverbial-adjunction-cuix-first-order:p4668-if-there-is-no-inherently-interrogative-modifier",
      "canonicalPath": "analysis.cuixPrecedesWhenNoInherentInterrogative"
    },
    "claim-p4669::p4669-if-there-is-no-inherently-interrogative-modifier-cuix-comes": {
      "assertionId": "classical-adverbial-adjunction-cuix-first-order:p4669-if-there-is-no-inherently-interrogative-modifier-cuix-comes",
      "canonicalPath": "result.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4668": [
      "cuix-first-order"
    ],
    "claim-p4669": [
      "cuix-first-order"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4668": "authorized",
    "claim-p4669": "authorized"
  }
};
export default Object.freeze(spec);
