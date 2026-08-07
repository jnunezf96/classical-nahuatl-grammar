const spec = {
  "ownerId": "classical-clause-conjunction-lexical-source-boundary",
  "prefix": "ClassicalClauseConjunctionLexicalSourceBoundary",
  "operationId": "classical.clause.conjunction.lexical.source.boundary.execute",
  "inputContract": "complete-typed-classical-clause-conjunction-lexical-source-boundary-source",
  "domain": "classical-clause-conjunction-lexical-source-boundary",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-conjunction-runtime",
  "selections": [
    "claim-p4890"
  ],
  "coordinates": {
    "claim-p4890::p4890-the-difference-between-the-source-and-the-translation-is": {
      "assertionId": "classical-clause-conjunction-lexical-source-boundary:p4890-the-difference-between-the-source-and-the-translation-is",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalClauseConjunctionValidationFrame",
  "executionValidatorName": "isClassicalClauseConjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4890": [
      "lexical-source-boundary"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4890": "authorized"
  }
};
export default Object.freeze(spec);
