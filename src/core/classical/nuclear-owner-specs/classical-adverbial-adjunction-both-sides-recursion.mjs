const spec = {
  "ownerId": "classical-adverbial-adjunction-both-sides-recursion",
  "prefix": "ClassicalAdverbialAdjunctionBothSidesRecursion",
  "operationId": "classical.adverbial.adjunction.both.sides.recursion.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-both-sides-recursion-source",
  "domain": "classical-adverbial-adjunction-both-sides-recursion",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4691"
  ],
  "coordinates": {
    "claim-p4691::p4691-when-both-the-modifier-and-the-head-in-a": {
      "assertionId": "classical-adverbial-adjunction-both-sides-recursion:p4691-when-both-the-modifier-and-the-head-in-a",
      "canonicalPath": "analysis.bothHeadAndModifierMayRecurse"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4691": [
      "both-sides-recursion"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4691": "authorized"
  }
};
export default Object.freeze(spec);
