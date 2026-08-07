const spec = {
  "ownerId": "classical-clause-comparison-comparative-degree-markers",
  "prefix": "ClassicalClauseComparisonComparativeDegreeMarkers",
  "operationId": "classical.clause.comparison.comparative.degree.markers.execute",
  "inputContract": "complete-typed-classical-clause-comparison-comparative-degree-markers-source",
  "domain": "classical-clause-comparison-comparative-degree-markers",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-comparison-runtime",
  "selections": [
    "claim-p4939"
  ],
  "coordinates": {
    "claim-p4939::p4939-these-two-nuclear-clauses-are-modified-by-oc-oc": {
      "assertionId": "classical-clause-comparison-comparative-degree-markers:p4939-these-two-nuclear-clauses-are-modified-by-oc-oc",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalComparisonValidationFrame",
  "executionValidatorName": "isClassicalComparisonValidationFrame",
  "executionArgsBySelection": {
    "claim-p4939": [
      "comparative-degree-markers"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4939": "authorized"
  }
};
export default Object.freeze(spec);
