const spec = {
  "ownerId": "classical-clause-comparison-ordinary-superlative",
  "prefix": "ClassicalClauseComparisonOrdinarySuperlative",
  "operationId": "classical.clause.comparison.ordinary.superlative.execute",
  "inputContract": "complete-typed-classical-clause-comparison-ordinary-superlative-source",
  "domain": "classical-clause-comparison-ordinary-superlative",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-comparison-runtime",
  "selections": [
    "claim-p4949"
  ],
  "coordinates": {
    "claim-p4949::p4949-all-may-be-translated-the-maiden-is-most-beautiful": {
      "assertionId": "classical-clause-comparison-ordinary-superlative:p4949-all-may-be-translated-the-maiden-is-most-beautiful",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalComparisonValidationFrame",
  "executionValidatorName": "isClassicalComparisonValidationFrame",
  "executionArgsBySelection": {
    "claim-p4949": [
      "ordinary-superlative"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4949": "authorized"
  }
};
export default Object.freeze(spec);
