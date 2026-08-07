const spec = {
  "ownerId": "classical-clause-conjunction-alternative-modifier-inventory",
  "prefix": "ClassicalClauseConjunctionAlternativeModifierInventory",
  "operationId": "classical.clause.conjunction.alternative.modifier.inventory.execute",
  "inputContract": "complete-typed-classical-clause-conjunction-alternative-modifier-inventory-source",
  "domain": "classical-clause-conjunction-alternative-modifier-inventory",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-conjunction-runtime",
  "selections": [
    "claim-p4875"
  ],
  "coordinates": {
    "claim-p4875::p4875-ahno-zo-eh-written-solid-and-with-liaison-as": {
      "assertionId": "classical-clause-conjunction-alternative-modifier-inventory:p4875-ahno-zo-eh-written-solid-and-with-liaison-as",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalClauseConjunctionValidationFrame",
  "executionValidatorName": "isClassicalClauseConjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4875": [
      "alternative-modifier-inventory"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4875": "authorized"
  }
};
export default Object.freeze(spec);
