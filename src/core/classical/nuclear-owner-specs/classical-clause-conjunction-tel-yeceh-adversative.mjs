const spec = {
  "ownerId": "classical-clause-conjunction-tel-yeceh-adversative",
  "prefix": "ClassicalClauseConjunctionTelYecehAdversative",
  "operationId": "classical.clause.conjunction.tel.yeceh.adversative.execute",
  "inputContract": "complete-typed-classical-clause-conjunction-tel-yeceh-adversative-source",
  "domain": "classical-clause-conjunction-tel-yeceh-adversative",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-conjunction-runtime",
  "selections": [
    "claim-p4878"
  ],
  "coordinates": {
    "claim-p4878::p4878-the-adversative-notion-can-be-supported-by-the-adverbial": {
      "assertionId": "classical-clause-conjunction-tel-yeceh-adversative:p4878-the-adversative-notion-can-be-supported-by-the-adverbial",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalClauseConjunctionValidationFrame",
  "executionValidatorName": "isClassicalClauseConjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4878": [
      "tel-yeceh-adversative"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4878": "authorized"
  }
};
export default Object.freeze(spec);
