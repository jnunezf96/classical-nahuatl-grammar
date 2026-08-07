const spec = {
  "ownerId": "classical-clause-comparison-ic-relation",
  "prefix": "ClassicalClauseComparisonIcRelation",
  "operationId": "classical.clause.comparison.ic.relation.execute",
  "inputContract": "complete-typed-classical-clause-comparison-ic-relation-source",
  "domain": "classical-clause-comparison-ic-relation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-comparison-runtime",
  "selections": [
    "claim-p4927"
  ],
  "coordinates": {
    "claim-p4927::p4927-the-relationship-may-be-established-by-means-of-ic": {
      "assertionId": "classical-clause-comparison-ic-relation:p4927-the-relationship-may-be-established-by-means-of-ic",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalComparisonValidationFrame",
  "executionValidatorName": "isClassicalComparisonValidationFrame",
  "executionArgsBySelection": {
    "claim-p4927": [
      "ic-relation"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4927": "authorized"
  }
};
export default Object.freeze(spec);
