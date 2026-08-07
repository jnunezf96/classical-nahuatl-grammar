const spec = {
  "ownerId": "classical-clause-conjunction-modifier-status",
  "prefix": "ClassicalClauseConjunctionModifierStatus",
  "operationId": "classical.clause.conjunction.modifier.status.execute",
  "inputContract": "complete-typed-classical-clause-conjunction-modifier-status-source",
  "domain": "classical-clause-conjunction-modifier-status",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-conjunction-runtime",
  "selections": [
    "claim-p4859"
  ],
  "coordinates": {
    "claim-p4859::p4859-there-are-a-number-of-adverbial-modifiers-particles-or": {
      "assertionId": "classical-clause-conjunction-modifier-status:p4859-there-are-a-number-of-adverbial-modifiers-particles-or",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalClauseConjunctionValidationFrame",
  "executionValidatorName": "isClassicalClauseConjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4859": [
      "modifier-status"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4859": "authorized"
  }
};
export default Object.freeze(spec);
