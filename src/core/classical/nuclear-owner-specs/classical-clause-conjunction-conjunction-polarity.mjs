const spec = {
  "ownerId": "classical-clause-conjunction-conjunction-polarity",
  "prefix": "ClassicalClauseConjunctionConjunctionPolarity",
  "operationId": "classical.clause.conjunction.conjunction.polarity.execute",
  "inputContract": "complete-typed-classical-clause-conjunction-conjunction-polarity-source",
  "domain": "classical-clause-conjunction-conjunction-polarity",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-conjunction-runtime",
  "selections": [
    "claim-p4843"
  ],
  "coordinates": {
    "claim-p4843::p4843-the-conjunction-may-be-positive-and-or-negative-nor": {
      "assertionId": "classical-clause-conjunction-conjunction-polarity:p4843-the-conjunction-may-be-positive-and-or-negative-nor",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalClauseConjunctionValidationFrame",
  "executionValidatorName": "isClassicalClauseConjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4843": [
      "conjunction-polarity"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4843": "authorized"
  }
};
export default Object.freeze(spec);
