const spec = {
  "ownerId": "classical-clause-comparison-two-conjunct-restriction",
  "prefix": "ClassicalClauseComparisonTwoConjunctRestriction",
  "operationId": "classical.clause.comparison.two.conjunct.restriction.execute",
  "inputContract": "complete-typed-classical-clause-comparison-two-conjunct-restriction-source",
  "domain": "classical-clause-comparison-two-conjunct-restriction",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-comparison-runtime",
  "selections": [
    "claim-p4932"
  ],
  "coordinates": {
    "claim-p4932::p4932-the-constructions-frequently-involve-conjunction-with-only-two-conjuncts": {
      "assertionId": "classical-clause-comparison-two-conjunct-restriction:p4932-the-constructions-frequently-involve-conjunction-with-only-two-conjuncts",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalComparisonValidationFrame",
  "executionValidatorName": "isClassicalComparisonValidationFrame",
  "executionArgsBySelection": {
    "claim-p4932": [
      "two-conjunct-restriction"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4932": "authorized"
  }
};
export default Object.freeze(spec);
