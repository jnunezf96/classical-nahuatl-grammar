const spec = {
  "ownerId": "classical-clause-comparison-principal-nnc-comparison",
  "prefix": "ClassicalClauseComparisonPrincipalNncComparison",
  "operationId": "classical.clause.comparison.principal.nnc.comparison.execute",
  "inputContract": "complete-typed-classical-clause-comparison-principal-nnc-comparison-source",
  "domain": "classical-clause-comparison-principal-nnc-comparison",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-comparison-runtime",
  "selections": [
    "claim-p4938"
  ],
  "coordinates": {
    "claim-p4938::p4938-the-affirmative-statement-may-consist-of-a-concatenate-structure": {
      "assertionId": "classical-clause-comparison-principal-nnc-comparison:p4938-the-affirmative-statement-may-consist-of-a-concatenate-structure",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalComparisonValidationFrame",
  "executionValidatorName": "isClassicalComparisonValidationFrame",
  "executionArgsBySelection": {
    "claim-p4938": [
      "principal-nnc-comparison"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4938": "authorized"
  }
};
export default Object.freeze(spec);
