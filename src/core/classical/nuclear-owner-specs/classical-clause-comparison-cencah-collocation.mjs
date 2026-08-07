const spec = {
  "ownerId": "classical-clause-comparison-cencah-collocation",
  "prefix": "ClassicalClauseComparisonCencahCollocation",
  "operationId": "classical.clause.comparison.cencah.collocation.execute",
  "inputContract": "complete-typed-classical-clause-comparison-cencah-collocation-source",
  "domain": "classical-clause-comparison-cencah-collocation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-comparison-runtime",
  "selections": [
    "claim-p4935"
  ],
  "coordinates": {
    "claim-p4935::p4935-one-of-the-conjoined-clause-units-contains-the-adverbialized": {
      "assertionId": "classical-clause-comparison-cencah-collocation:p4935-one-of-the-conjoined-clause-units-contains-the-adverbialized",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalComparisonValidationFrame",
  "executionValidatorName": "isClassicalComparisonValidationFrame",
  "executionArgsBySelection": {
    "claim-p4935": [
      "cencah-collocation"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4935": "authorized"
  }
};
export default Object.freeze(spec);
