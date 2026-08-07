const spec = {
  "ownerId": "classical-clause-conjunction-balanced-conjuncts",
  "prefix": "ClassicalClauseConjunctionBalancedConjuncts",
  "operationId": "classical.clause.conjunction.balanced.conjuncts.execute",
  "inputContract": "complete-typed-classical-clause-conjunction-balanced-conjuncts-source",
  "domain": "classical-clause-conjunction-balanced-conjuncts",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-conjunction-runtime",
  "selections": [
    "claim-p4836",
    "claim-p4837"
  ],
  "coordinates": {
    "claim-p4836::p4836-it-is-created-by-a-transformational-process-that-joins": {
      "assertionId": "classical-clause-conjunction-balanced-conjuncts:p4836-it-is-created-by-a-transformational-process-that-joins",
      "canonicalPath": "analysis.semanticBoundary"
    },
    "claim-p4837::p4837-since-neither-of-the-conjuncts-conjoined-items-in-a": {
      "assertionId": "classical-clause-conjunction-balanced-conjuncts:p4837-since-neither-of-the-conjuncts-conjoined-items-in-a",
      "canonicalPath": "result.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalClauseConjunctionValidationFrame",
  "executionValidatorName": "isClassicalClauseConjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4836": [
      "balanced-conjuncts"
    ],
    "claim-p4837": [
      "balanced-conjuncts"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4836": "authorized",
    "claim-p4837": "authorized"
  }
};
export default Object.freeze(spec);
