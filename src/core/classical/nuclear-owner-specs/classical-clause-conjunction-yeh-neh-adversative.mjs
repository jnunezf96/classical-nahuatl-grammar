const spec = {
  "ownerId": "classical-clause-conjunction-yeh-neh-adversative",
  "prefix": "ClassicalClauseConjunctionYehNehAdversative",
  "operationId": "classical.clause.conjunction.yeh.neh.adversative.execute",
  "inputContract": "complete-typed-classical-clause-conjunction-yeh-neh-adversative-source",
  "domain": "classical-clause-conjunction-yeh-neh-adversative",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-conjunction-runtime",
  "selections": [
    "claim-p4879"
  ],
  "coordinates": {
    "claim-p4879::p4879-the-adversative-notion-can-be-supported-by-yeh-or": {
      "assertionId": "classical-clause-conjunction-yeh-neh-adversative:p4879-the-adversative-notion-can-be-supported-by-yeh-or",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalClauseConjunctionValidationFrame",
  "executionValidatorName": "isClassicalClauseConjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4879": [
      "yeh-neh-adversative"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4879": "authorized"
  }
};
export default Object.freeze(spec);
