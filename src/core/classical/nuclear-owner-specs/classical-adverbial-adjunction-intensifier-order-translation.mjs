const spec = {
  "ownerId": "classical-adverbial-adjunction-intensifier-order-translation",
  "prefix": "ClassicalAdverbialAdjunctionIntensifierOrderTranslation",
  "operationId": "classical.adverbial.adjunction.intensifier.order.translation.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-intensifier-order-translation-source",
  "domain": "classical-adverbial-adjunction-intensifier-order-translation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4678",
    "claim-p4679",
    "claim-p4680"
  ],
  "coordinates": {
    "claim-p4678::p4678-when-functioning-as-an-intensifier-an-adverbial-nuclear-clause": {
      "assertionId": "classical-adverbial-adjunction-intensifier-order-translation:p4678-when-functioning-as-an-intensifier-an-adverbial-nuclear-clause",
      "canonicalPath": "analysis.intensifierPrecedesHead"
    },
    "claim-p4679::p4679-when-functioning-as-an-intensifier": {
      "assertionId": "classical-adverbial-adjunction-intensifier-order-translation:p4679-when-functioning-as-an-intensifier",
      "canonicalPath": "result.canonicalResult"
    },
    "claim-p4680::p4680-in-this-function-the-adverbial-modifier-always-precedes-its": {
      "assertionId": "classical-adverbial-adjunction-intensifier-order-translation:p4680-in-this-function-the-adverbial-modifier-always-precedes-its",
      "canonicalPath": "analysis.rawStoredAuthorityBlocked"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4678": [
      "intensifier-order-translation"
    ],
    "claim-p4679": [
      "intensifier-order-translation"
    ],
    "claim-p4680": [
      "intensifier-order-translation"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4678": "authorized",
    "claim-p4679": "authorized",
    "claim-p4680": "authorized"
  }
};
export default Object.freeze(spec);
