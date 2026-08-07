const spec = {
  "ownerId": "classical-clause-comparison-tloc-principal-rank",
  "prefix": "ClassicalClauseComparisonTlocPrincipalRank",
  "operationId": "classical.clause.comparison.tloc.principal.rank.execute",
  "inputContract": "complete-typed-classical-clause-comparison-tloc-principal-rank-source",
  "domain": "classical-clause-comparison-tloc-principal-rank",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-comparison-runtime",
  "selections": [
    "claim-p4918"
  ],
  "coordinates": {
    "claim-p4918::p4918-the-nnc-serves-as-the-principal-clause": {
      "assertionId": "classical-clause-comparison-tloc-principal-rank:p4918-the-nnc-serves-as-the-principal-clause",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalComparisonValidationFrame",
  "executionValidatorName": "isClassicalComparisonValidationFrame",
  "executionArgsBySelection": {
    "claim-p4918": [
      "tloc-principal-rank"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4918": "authorized"
  }
};
export default Object.freeze(spec);
