const spec = {
  "ownerId": "classical-clause-conjunction-lexical-translation-boundary",
  "prefix": "ClassicalClauseConjunctionLexicalTranslationBoundary",
  "operationId": "classical.clause.conjunction.lexical.translation.boundary.execute",
  "inputContract": "complete-typed-classical-clause-conjunction-lexical-translation-boundary-source",
  "domain": "classical-clause-conjunction-lexical-translation-boundary",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-conjunction-runtime",
  "selections": [
    "claim-p4889"
  ],
  "coordinates": {
    "claim-p4889::p4889-it-is-my-means-of-support": {
      "assertionId": "classical-clause-conjunction-lexical-translation-boundary:p4889-it-is-my-means-of-support",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalClauseConjunctionValidationFrame",
  "executionValidatorName": "isClassicalClauseConjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4889": [
      "lexical-translation-boundary"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4889": "authorized"
  }
};
export default Object.freeze(spec);
