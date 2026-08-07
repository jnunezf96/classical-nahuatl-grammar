const spec = {
  "ownerId": "classical-clause-comparison-superlative-adverbial",
  "prefix": "ClassicalClauseComparisonSuperlativeAdverbial",
  "operationId": "classical.clause.comparison.superlative.adverbial.execute",
  "inputContract": "complete-typed-classical-clause-comparison-superlative-adverbial-source",
  "domain": "classical-clause-comparison-superlative-adverbial",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-comparison-runtime",
  "selections": [
    "claim-p4945"
  ],
  "coordinates": {
    "claim-p4945::p4945-huel-and-the-adverbial-collocations-cencah-huel-za-cencah": {
      "assertionId": "classical-clause-comparison-superlative-adverbial:p4945-huel-and-the-adverbial-collocations-cencah-huel-za-cencah",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalComparisonValidationFrame",
  "executionValidatorName": "isClassicalComparisonValidationFrame",
  "executionArgsBySelection": {
    "claim-p4945": [
      "superlative-adverbial"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4945": "authorized"
  }
};
export default Object.freeze(spec);
