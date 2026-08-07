const spec = {
  "ownerId": "classical-clause-conjunction-adversative-arity",
  "prefix": "ClassicalClauseConjunctionAdversativeArity",
  "operationId": "classical.clause.conjunction.adversative.arity.execute",
  "inputContract": "complete-typed-classical-clause-conjunction-adversative-arity-source",
  "domain": "classical-clause-conjunction-adversative-arity",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-conjunction-runtime",
  "selections": [
    "claim-p4854"
  ],
  "coordinates": {
    "claim-p4854::p4854-unlike-additive-and-alternative-conjunction-only-two-conjuncts-can": {
      "assertionId": "classical-clause-conjunction-adversative-arity:p4854-unlike-additive-and-alternative-conjunction-only-two-conjuncts-can",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalClauseConjunctionValidationFrame",
  "executionValidatorName": "isClassicalClauseConjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4854": [
      "adversative-arity"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4854": "authorized"
  }
};
export default Object.freeze(spec);
