const spec = {
  "ownerId": "classical-clause-comparison-tloc-similarity-strategy",
  "prefix": "ClassicalClauseComparisonTlocSimilarityStrategy",
  "operationId": "classical.clause.comparison.tloc.similarity.strategy.execute",
  "inputContract": "complete-typed-classical-clause-comparison-tloc-similarity-strategy-source",
  "domain": "classical-clause-comparison-tloc-similarity-strategy",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-comparison-runtime",
  "selections": [
    "claim-p4917"
  ],
  "coordinates": {
    "claim-p4917::p4917-a-possessive-state-nnc-formed-on-the-relational-nounstem": {
      "assertionId": "classical-clause-comparison-tloc-similarity-strategy:p4917-a-possessive-state-nnc-formed-on-the-relational-nounstem",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalComparisonValidationFrame",
  "executionValidatorName": "isClassicalComparisonValidationFrame",
  "executionArgsBySelection": {
    "claim-p4917": [
      "tloc-similarity-strategy"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4917": "authorized"
  }
};
export default Object.freeze(spec);
