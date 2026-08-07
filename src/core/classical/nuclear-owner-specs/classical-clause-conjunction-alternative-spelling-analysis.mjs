const spec = {
  "ownerId": "classical-clause-conjunction-alternative-spelling-analysis",
  "prefix": "ClassicalClauseConjunctionAlternativeSpellingAnalysis",
  "operationId": "classical.clause.conjunction.alternative.spelling.analysis.execute",
  "inputContract": "complete-typed-classical-clause-conjunction-alternative-spelling-analysis-source",
  "domain": "classical-clause-conjunction-alternative-spelling-analysis",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-conjunction-runtime",
  "selections": [
    "claim-p4876"
  ],
  "coordinates": {
    "claim-p4876::p4876-or-manozo-ma-no-zo-eh-or-manoceh-ahno": {
      "assertionId": "classical-clause-conjunction-alternative-spelling-analysis:p4876-or-manozo-ma-no-zo-eh-or-manoceh-ahno",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalClauseConjunctionValidationFrame",
  "executionValidatorName": "isClassicalClauseConjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4876": [
      "alternative-spelling-analysis"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4876": "authorized"
  }
};
export default Object.freeze(spec);
