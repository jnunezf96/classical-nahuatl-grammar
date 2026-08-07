const spec = {
  "ownerId": "classical-clause-conjunction-lexical-adjunctor-distribution",
  "prefix": "ClassicalClauseConjunctionLexicalAdjunctorDistribution",
  "operationId": "classical.clause.conjunction.lexical.adjunctor.distribution.execute",
  "inputContract": "complete-typed-classical-clause-conjunction-lexical-adjunctor-distribution-source",
  "domain": "classical-clause-conjunction-lexical-adjunctor-distribution",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-conjunction-runtime",
  "selections": [
    "claim-p4898",
    "claim-p4899",
    "claim-p4900"
  ],
  "coordinates": {
    "claim-p4898::p4898-if-the-conjoined-nnc-unit-functions-as-supplement-or": {
      "assertionId": "classical-clause-conjunction-lexical-adjunctor-distribution:p4898-if-the-conjoined-nnc-unit-functions-as-supplement-or",
      "canonicalPath": "analysis.semanticBoundary"
    },
    "claim-p4899::p4899-if-the-conjoined-nnc-unit-functions-as-supplement-or": {
      "assertionId": "classical-clause-conjunction-lexical-adjunctor-distribution:p4899-if-the-conjoined-nnc-unit-functions-as-supplement-or",
      "canonicalPath": "result.canonicalResult"
    },
    "claim-p4900::p4900-it-can-however-also-appear-only-in-front-of": {
      "assertionId": "classical-clause-conjunction-lexical-adjunctor-distribution:p4900-it-can-however-also-appear-only-in-front-of",
      "canonicalPath": "analysis.rawStoredAuthorityBlocked"
    }
  },
  "executionFunctionName": "buildClassicalClauseConjunctionValidationFrame",
  "executionValidatorName": "isClassicalClauseConjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4898": [
      "lexical-adjunctor-distribution"
    ],
    "claim-p4899": [
      "lexical-adjunctor-distribution"
    ],
    "claim-p4900": [
      "lexical-adjunctor-distribution"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4898": "authorized",
    "claim-p4899": "authorized",
    "claim-p4900": "authorized"
  }
};
export default Object.freeze(spec);
