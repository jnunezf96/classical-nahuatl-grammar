const spec = {
  "ownerId": "classical-clause-conjunction-translation-insertion-boundary",
  "prefix": "ClassicalClauseConjunctionTranslationInsertionBoundary",
  "operationId": "classical.clause.conjunction.translation.insertion.boundary.execute",
  "inputContract": "complete-typed-classical-clause-conjunction-translation-insertion-boundary-source",
  "domain": "classical-clause-conjunction-translation-insertion-boundary",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-conjunction-runtime",
  "selections": [
    "claim-p4862"
  ],
  "coordinates": {
    "claim-p4862::p4862-as-is-customary-in-translating-unmarked-additive-conjunction-english": {
      "assertionId": "classical-clause-conjunction-translation-insertion-boundary:p4862-as-is-customary-in-translating-unmarked-additive-conjunction-english",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalClauseConjunctionValidationFrame",
  "executionValidatorName": "isClassicalClauseConjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4862": [
      "translation-insertion-boundary"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4862": "authorized"
  }
};
export default Object.freeze(spec);
