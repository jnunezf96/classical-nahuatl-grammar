const spec = {
  "ownerId": "classical-clause-conjunction-negative-additive-inventory",
  "prefix": "ClassicalClauseConjunctionNegativeAdditiveInventory",
  "operationId": "classical.clause.conjunction.negative.additive.inventory.execute",
  "inputContract": "complete-typed-classical-clause-conjunction-negative-additive-inventory-source",
  "domain": "classical-clause-conjunction-negative-additive-inventory",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-conjunction-runtime",
  "selections": [
    "claim-p4874"
  ],
  "coordinates": {
    "claim-p4874::p4874-the-adverbial-modifiers-ahno-ahmo-no-no-zo-and": {
      "assertionId": "classical-clause-conjunction-negative-additive-inventory:p4874-the-adverbial-modifiers-ahno-ahmo-no-no-zo-and",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalClauseConjunctionValidationFrame",
  "executionValidatorName": "isClassicalClauseConjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4874": [
      "negative-additive-inventory"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4874": "authorized"
  }
};
export default Object.freeze(spec);
