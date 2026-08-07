const spec = {
  "ownerId": "classical-clause-conjunction-conjunction-arity",
  "prefix": "ClassicalClauseConjunctionConjunctionArity",
  "operationId": "classical.clause.conjunction.conjunction.arity.execute",
  "inputContract": "complete-typed-classical-clause-conjunction-conjunction-arity-source",
  "domain": "classical-clause-conjunction-conjunction-arity",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-conjunction-runtime",
  "selections": [
    "claim-p4844"
  ],
  "coordinates": {
    "claim-p4844::p4844-the-conjuncts-may-be-a-pair-or-a-series": {
      "assertionId": "classical-clause-conjunction-conjunction-arity:p4844-the-conjuncts-may-be-a-pair-or-a-series",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalClauseConjunctionValidationFrame",
  "executionValidatorName": "isClassicalClauseConjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4844": [
      "conjunction-arity"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4844": "authorized"
  }
};
export default Object.freeze(spec);
