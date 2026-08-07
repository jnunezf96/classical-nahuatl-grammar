const spec = {
  "ownerId": "classical-clause-conjunction-parallel-formation-analysis",
  "prefix": "ClassicalClauseConjunctionParallelFormationAnalysis",
  "operationId": "classical.clause.conjunction.parallel.formation.analysis.execute",
  "inputContract": "complete-typed-classical-clause-conjunction-parallel-formation-analysis-source",
  "domain": "classical-clause-conjunction-parallel-formation-analysis",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-conjunction-runtime",
  "selections": [
    "claim-p4847"
  ],
  "coordinates": {
    "claim-p4847::p4847-the-formation-is-exactly-parallel-to-te-cua-a": {
      "assertionId": "classical-clause-conjunction-parallel-formation-analysis:p4847-the-formation-is-exactly-parallel-to-te-cua-a",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalClauseConjunctionValidationFrame",
  "executionValidatorName": "isClassicalClauseConjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4847": [
      "parallel-formation-analysis"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4847": "authorized"
  }
};
export default Object.freeze(spec);
