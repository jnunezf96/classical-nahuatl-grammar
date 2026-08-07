const spec = {
  "ownerId": "classical-clause-conjunction-correlation-not-conjunctor",
  "prefix": "ClassicalClauseConjunctionCorrelationNotConjunctor",
  "operationId": "classical.clause.conjunction.correlation.not.conjunctor.execute",
  "inputContract": "complete-typed-classical-clause-conjunction-correlation-not-conjunctor-source",
  "domain": "classical-clause-conjunction-correlation-not-conjunctor",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-conjunction-runtime",
  "selections": [
    "claim-p4882",
    "claim-p4883"
  ],
  "coordinates": {
    "claim-p4882::p4882-to-express-the-notion-of-correlative-conjunction-in-english": {
      "assertionId": "classical-clause-conjunction-correlation-not-conjunctor:p4882-to-express-the-notion-of-correlative-conjunction-in-english",
      "canonicalPath": "analysis.semanticBoundary"
    },
    "claim-p4883::p4883-nahuatl-does-not-use-a-conjunctor": {
      "assertionId": "classical-clause-conjunction-correlation-not-conjunctor:p4883-nahuatl-does-not-use-a-conjunctor",
      "canonicalPath": "result.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalClauseConjunctionValidationFrame",
  "executionValidatorName": "isClassicalClauseConjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4882": [
      "correlation-not-conjunctor"
    ],
    "claim-p4883": [
      "correlation-not-conjunctor"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4882": "authorized",
    "claim-p4883": "authorized"
  }
};
export default Object.freeze(spec);
