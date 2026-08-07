const spec = {
  "ownerId": "classical-clause-conjunction-collocation-translation",
  "prefix": "ClassicalClauseConjunctionCollocationTranslation",
  "operationId": "classical.clause.conjunction.collocation.translation.execute",
  "inputContract": "complete-typed-classical-clause-conjunction-collocation-translation-source",
  "domain": "classical-clause-conjunction-collocation-translation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-conjunction-runtime",
  "selections": [
    "claim-p4873"
  ],
  "coordinates": {
    "claim-p4873::p4873-all-of-these-collocations-can-be-translated-and-also": {
      "assertionId": "classical-clause-conjunction-collocation-translation:p4873-all-of-these-collocations-can-be-translated-and-also",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalClauseConjunctionValidationFrame",
  "executionValidatorName": "isClassicalClauseConjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4873": [
      "collocation-translation"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4873": "authorized"
  }
};
export default Object.freeze(spec);
