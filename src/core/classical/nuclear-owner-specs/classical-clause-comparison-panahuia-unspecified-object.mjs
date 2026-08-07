const spec = {
  "ownerId": "classical-clause-comparison-panahuia-unspecified-object",
  "prefix": "ClassicalClauseComparisonPanahuiaUnspecifiedObject",
  "operationId": "classical.clause.comparison.panahuia.unspecified.object.execute",
  "inputContract": "complete-typed-classical-clause-comparison-panahuia-unspecified-object-source",
  "domain": "classical-clause-comparison-panahuia-unspecified-object",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-comparison-runtime",
  "selections": [
    "claim-p4940"
  ],
  "coordinates": {
    "claim-p4940::p4940-a-somewhat-similar-construction-of-the-affirmative-statement-has": {
      "assertionId": "classical-clause-comparison-panahuia-unspecified-object:p4940-a-somewhat-similar-construction-of-the-affirmative-statement-has",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalComparisonValidationFrame",
  "executionValidatorName": "isClassicalComparisonValidationFrame",
  "executionArgsBySelection": {
    "claim-p4940": [
      "panahuia-unspecified-object"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4940": "authorized"
  }
};
export default Object.freeze(spec);
