const spec = {
  "ownerId": "classical-clause-conjunction-series-list-conjunction",
  "prefix": "ClassicalClauseConjunctionSeriesListConjunction",
  "operationId": "classical.clause.conjunction.series.list.conjunction.execute",
  "inputContract": "complete-typed-classical-clause-conjunction-series-list-conjunction-source",
  "domain": "classical-clause-conjunction-series-list-conjunction",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-conjunction-runtime",
  "selections": [
    "claim-p4851"
  ],
  "coordinates": {
    "claim-p4851::p4851-the-adjunct-group-may-consist-of-a-series-or": {
      "assertionId": "classical-clause-conjunction-series-list-conjunction:p4851-the-adjunct-group-may-consist-of-a-series-or",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalClauseConjunctionValidationFrame",
  "executionValidatorName": "isClassicalClauseConjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4851": [
      "series-list-conjunction"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4851": "authorized"
  }
};
export default Object.freeze(spec);
