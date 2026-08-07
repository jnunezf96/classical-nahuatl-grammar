const spec = {
  "ownerId": "classical-clause-conjunction-modifier-markedness-compatibility",
  "prefix": "ClassicalClauseConjunctionModifierMarkednessCompatibility",
  "operationId": "classical.clause.conjunction.modifier.markedness.compatibility.execute",
  "inputContract": "complete-typed-classical-clause-conjunction-modifier-markedness-compatibility-source",
  "domain": "classical-clause-conjunction-modifier-markedness-compatibility",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-conjunction-runtime",
  "selections": [
    "claim-p4860"
  ],
  "coordinates": {
    "claim-p4860::p4860-they-may-accompany-either-marked-or-unmarked-structures-of": {
      "assertionId": "classical-clause-conjunction-modifier-markedness-compatibility:p4860-they-may-accompany-either-marked-or-unmarked-structures-of",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalClauseConjunctionValidationFrame",
  "executionValidatorName": "isClassicalClauseConjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4860": [
      "modifier-markedness-compatibility"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4860": "authorized"
  }
};
export default Object.freeze(spec);
