const spec = {
  "ownerId": "classical-adverbial-adjunction-recursive-intensifier",
  "prefix": "ClassicalAdverbialAdjunctionRecursiveIntensifier",
  "operationId": "classical.adverbial.adjunction.recursive.intensifier.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-recursive-intensifier-source",
  "domain": "classical-adverbial-adjunction-recursive-intensifier",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4686"
  ],
  "coordinates": {
    "claim-p4686::p4686-a-modifier-of-an-adverbial-modifier-can-exhibit-recursion": {
      "assertionId": "classical-adverbial-adjunction-recursive-intensifier:p4686-a-modifier-of-an-adverbial-modifier-can-exhibit-recursion",
      "canonicalPath": "analysis.intensifierMayRecurseInsideModifier"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4686": [
      "recursive-intensifier"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4686": "authorized"
  }
};
export default Object.freeze(spec);
