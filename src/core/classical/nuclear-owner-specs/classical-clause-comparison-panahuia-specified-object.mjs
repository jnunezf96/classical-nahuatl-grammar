const spec = {
  "ownerId": "classical-clause-comparison-panahuia-specified-object",
  "prefix": "ClassicalClauseComparisonPanahuiaSpecifiedObject",
  "operationId": "classical.clause.comparison.panahuia.specified.object.execute",
  "inputContract": "complete-typed-classical-clause-comparison-panahuia-specified-object-source",
  "domain": "classical-clause-comparison-panahuia-specified-object",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-comparison-runtime",
  "selections": [
    "claim-p4943"
  ],
  "coordinates": {
    "claim-p4943::p4943-a-vnc-with-a-personal-subject-pronoun-formed-on": {
      "assertionId": "classical-clause-comparison-panahuia-specified-object:p4943-a-vnc-with-a-personal-subject-pronoun-formed-on",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalComparisonValidationFrame",
  "executionValidatorName": "isClassicalComparisonValidationFrame",
  "executionArgsBySelection": {
    "claim-p4943": [
      "panahuia-specified-object"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4943": "authorized"
  }
};
export default Object.freeze(spec);
