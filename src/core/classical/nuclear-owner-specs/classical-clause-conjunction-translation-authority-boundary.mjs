const spec = {
  "ownerId": "classical-clause-conjunction-translation-authority-boundary",
  "prefix": "ClassicalClauseConjunctionTranslationAuthorityBoundary",
  "operationId": "classical.clause.conjunction.translation.authority.boundary.execute",
  "inputContract": "complete-typed-classical-clause-conjunction-translation-authority-boundary-source",
  "domain": "classical-clause-conjunction-translation-authority-boundary",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-conjunction-runtime",
  "selections": [
    "claim-p4845"
  ],
  "coordinates": {
    "claim-p4845::p4845-the-marked-conjunctor-required-by-english-is-italicized-in": {
      "assertionId": "classical-clause-conjunction-translation-authority-boundary:p4845-the-marked-conjunctor-required-by-english-is-italicized-in",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalClauseConjunctionValidationFrame",
  "executionValidatorName": "isClassicalClauseConjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4845": [
      "translation-authority-boundary"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4845": "authorized"
  }
};
export default Object.freeze(spec);
