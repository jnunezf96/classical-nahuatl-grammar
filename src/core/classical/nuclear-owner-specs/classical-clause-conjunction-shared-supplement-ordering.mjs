const spec = {
  "ownerId": "classical-clause-conjunction-shared-supplement-ordering",
  "prefix": "ClassicalClauseConjunctionSharedSupplementOrdering",
  "operationId": "classical.clause.conjunction.shared.supplement.ordering.execute",
  "inputContract": "complete-typed-classical-clause-conjunction-shared-supplement-ordering-source",
  "domain": "classical-clause-conjunction-shared-supplement-ordering",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-conjunction-runtime",
  "selections": [
    "claim-p4849"
  ],
  "coordinates": {
    "claim-p4849::p4849-nahuatl-normally-puts-the-supplement-after-the-last-conjunct": {
      "assertionId": "classical-clause-conjunction-shared-supplement-ordering:p4849-nahuatl-normally-puts-the-supplement-after-the-last-conjunct",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalClauseConjunctionValidationFrame",
  "executionValidatorName": "isClassicalClauseConjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4849": [
      "shared-supplement-ordering"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4849": "authorized"
  }
};
export default Object.freeze(spec);
