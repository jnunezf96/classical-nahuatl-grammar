const spec = {
  "ownerId": "classical-clause-conjunction-additive-modifier-inventory",
  "prefix": "ClassicalClauseConjunctionAdditiveModifierInventory",
  "operationId": "classical.clause.conjunction.additive.modifier.inventory.execute",
  "inputContract": "complete-typed-classical-clause-conjunction-additive-modifier-inventory-source",
  "domain": "classical-clause-conjunction-additive-modifier-inventory",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-conjunction-runtime",
  "selections": [
    "claim-p4861"
  ],
  "coordinates": {
    "claim-p4861::p4861-the-adverbial-particles-no-also-oc-still-and-the": {
      "assertionId": "classical-clause-conjunction-additive-modifier-inventory:p4861-the-adverbial-particles-no-also-oc-still-and-the",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalClauseConjunctionValidationFrame",
  "executionValidatorName": "isClassicalClauseConjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4861": [
      "additive-modifier-inventory"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4861": "authorized"
  }
};
export default Object.freeze(spec);
