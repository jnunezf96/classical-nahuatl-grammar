const spec = {
  "ownerId": "classical-clause-comparison-honorific-superlative",
  "prefix": "ClassicalClauseComparisonHonorificSuperlative",
  "operationId": "classical.clause.comparison.honorific.superlative.execute",
  "inputContract": "complete-typed-classical-clause-comparison-honorific-superlative-source",
  "domain": "classical-clause-comparison-honorific-superlative",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-comparison-runtime",
  "selections": [
    "claim-p4950"
  ],
  "coordinates": {
    "claim-p4950::p4950-they-may-all-be-translated-the-eagle-warrior-is": {
      "assertionId": "classical-clause-comparison-honorific-superlative:p4950-they-may-all-be-translated-the-eagle-warrior-is",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalComparisonValidationFrame",
  "executionValidatorName": "isClassicalComparisonValidationFrame",
  "executionArgsBySelection": {
    "claim-p4950": [
      "honorific-superlative"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4950": "authorized"
  }
};
export default Object.freeze(spec);
