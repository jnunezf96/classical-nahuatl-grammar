const spec = {
  "ownerId": "classical-clause-conjunction-lexical-semantic-types",
  "prefix": "ClassicalClauseConjunctionLexicalSemanticTypes",
  "operationId": "classical.clause.conjunction.lexical.semantic.types.execute",
  "inputContract": "complete-typed-classical-clause-conjunction-lexical-semantic-types-source",
  "domain": "classical-clause-conjunction-lexical-semantic-types",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-conjunction-runtime",
  "selections": [
    "claim-p4905"
  ],
  "coordinates": {
    "claim-p4905::p4905-two-types-of-conjoined-nnc-lexical-units-should-be": {
      "assertionId": "classical-clause-conjunction-lexical-semantic-types:p4905-two-types-of-conjoined-nnc-lexical-units-should-be",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalClauseConjunctionValidationFrame",
  "executionValidatorName": "isClassicalClauseConjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4905": [
      "lexical-semantic-types"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4905": "authorized"
  }
};
export default Object.freeze(spec);
