const spec = {
  "ownerId": "classical-adverbial-adjunction-modifier-recursion",
  "prefix": "ClassicalAdverbialAdjunctionModifierRecursion",
  "operationId": "classical.adverbial.adjunction.modifier.recursion.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-modifier-recursion-source",
  "domain": "classical-adverbial-adjunction-modifier-recursion",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4673",
    "claim-p4674"
  ],
  "coordinates": {
    "claim-p4673::p4673-when-the-adverbial-modifier-is-itself-a-structure-of": {
      "assertionId": "classical-adverbial-adjunction-modifier-recursion:p4673-when-the-adverbial-modifier-is-itself-a-structure-of",
      "canonicalPath": "analysis.recursiveModifierRequiresIssuedPriorComposition"
    },
    "claim-p4674::p4674-when-the-adverbial-modifier-is-itself-a-structure-of": {
      "assertionId": "classical-adverbial-adjunction-modifier-recursion:p4674-when-the-adverbial-modifier-is-itself-a-structure-of",
      "canonicalPath": "result.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4673": [
      "modifier-recursion"
    ],
    "claim-p4674": [
      "modifier-recursion"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4673": "authorized",
    "claim-p4674": "authorized"
  }
};
export default Object.freeze(spec);
