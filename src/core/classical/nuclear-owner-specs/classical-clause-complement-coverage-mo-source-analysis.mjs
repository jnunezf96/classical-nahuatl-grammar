const spec = {
  "ownerId": "classical-clause-complement-coverage-mo-source-analysis",
  "prefix": "ClassicalClauseComplementCoverageMoSourceAnalysis",
  "operationId": "classical.clause.complement.coverage.mo.source.analysis.execute",
  "inputContract": "complete-typed-classical-clause-complement-coverage-mo-source-analysis-source",
  "domain": "classical-clause-complement-coverage-mo-source-analysis",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-complementation-runtime",
  "selections": [
    "claim-p4818"
  ],
  "coordinates": {
    "claim-p4818::p4818-the-morph-mo-full-is-also-found-in-the": {
      "assertionId": "classical-clause-complement-coverage-mo-source-analysis:p4818-the-morph-mo-full-is-also-found-in-the",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalClauseComplementValidationFrame",
  "executionValidatorName": "isClassicalClauseComplementValidationFrame",
  "executionArgsBySelection": {
    "claim-p4818": [
      "coverage-mo-source-analysis"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4818": "authorized"
  }
};
export default Object.freeze(spec);
