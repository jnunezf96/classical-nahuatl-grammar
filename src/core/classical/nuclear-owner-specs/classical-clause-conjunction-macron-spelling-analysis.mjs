const spec = {
  "ownerId": "classical-clause-conjunction-macron-spelling-analysis",
  "prefix": "ClassicalClauseConjunctionMacronSpellingAnalysis",
  "operationId": "classical.clause.conjunction.macron.spelling.analysis.execute",
  "inputContract": "complete-typed-classical-clause-conjunction-macron-spelling-analysis-source",
  "domain": "classical-clause-conjunction-macron-spelling-analysis",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-conjunction-runtime",
  "selections": [
    "claim-p4846"
  ],
  "coordinates": {
    "claim-p4846::p4846-spelled-with-a-single-macronless-letter": {
      "assertionId": "classical-clause-conjunction-macron-spelling-analysis:p4846-spelled-with-a-single-macronless-letter",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalClauseConjunctionValidationFrame",
  "executionValidatorName": "isClassicalClauseConjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4846": [
      "macron-spelling-analysis"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4846": "authorized"
  }
};
export default Object.freeze(spec);
