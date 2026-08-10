const spec = {
  "ownerId": "classical-clause-conjunction-translation-mirage",
  "prefix": "ClassicalClauseConjunctionTranslationMirage",
  "operationId": "classical.clause.conjunction.translation.mirage.execute",
  "inputContract": "complete-typed-classical-clause-conjunction-translation-mirage-source",
  "domain": "classical-clause-conjunction-translation-mirage",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-conjunction-runtime",
  "selections": [
    "claim-p4864"
  ],
  "coordinates": {},
  "executionFunctionName": "buildClassicalClauseConjunctionValidationFrame",
  "executionValidatorName": "isClassicalClauseConjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4864": [
      "translation-mirage"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4864": "authorized"
  }
};
export default Object.freeze(spec);
