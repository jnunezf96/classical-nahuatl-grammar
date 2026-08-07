const spec = {
  "ownerId": "classical-clause-conjunction-appositive-parallelism",
  "prefix": "ClassicalClauseConjunctionAppositiveParallelism",
  "operationId": "classical.clause.conjunction.appositive.parallelism.execute",
  "inputContract": "complete-typed-classical-clause-conjunction-appositive-parallelism-source",
  "domain": "classical-clause-conjunction-appositive-parallelism",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-conjunction-runtime",
  "selections": [
    "claim-p4913"
  ],
  "coordinates": {
    "claim-p4913::p4913-there-are-several-types-the-following-discussion-is-limited": {
      "assertionId": "classical-clause-conjunction-appositive-parallelism:p4913-there-are-several-types-the-following-discussion-is-limited",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalClauseConjunctionValidationFrame",
  "executionValidatorName": "isClassicalClauseConjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4913": [
      "appositive-parallelism"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4913": "authorized"
  }
};
export default Object.freeze(spec);
