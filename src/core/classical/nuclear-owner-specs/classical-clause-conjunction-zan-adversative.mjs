const spec = {
  "ownerId": "classical-clause-conjunction-zan-adversative",
  "prefix": "ClassicalClauseConjunctionZanAdversative",
  "operationId": "classical.clause.conjunction.zan.adversative.execute",
  "inputContract": "complete-typed-classical-clause-conjunction-zan-adversative-source",
  "domain": "classical-clause-conjunction-zan-adversative",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-conjunction-runtime",
  "selections": [
    "claim-p4877"
  ],
  "coordinates": {
    "claim-p4877::p4877-the-adverbial-particle-zan-only-may-be-used-in": {
      "assertionId": "classical-clause-conjunction-zan-adversative:p4877-the-adverbial-particle-zan-only-may-be-used-in",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalClauseConjunctionValidationFrame",
  "executionValidatorName": "isClassicalClauseConjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4877": [
      "zan-adversative"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4877": "authorized"
  }
};
export default Object.freeze(spec);
