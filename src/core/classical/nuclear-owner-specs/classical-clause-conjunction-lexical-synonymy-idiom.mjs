const spec = {
  "ownerId": "classical-clause-conjunction-lexical-synonymy-idiom",
  "prefix": "ClassicalClauseConjunctionLexicalSynonymyIdiom",
  "operationId": "classical.clause.conjunction.lexical.synonymy.idiom.execute",
  "inputContract": "complete-typed-classical-clause-conjunction-lexical-synonymy-idiom-source",
  "domain": "classical-clause-conjunction-lexical-synonymy-idiom",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-conjunction-runtime",
  "selections": [
    "claim-p4893"
  ],
  "coordinates": {
    "claim-p4893::p4893-the-notion-expressed-by-a-conjoined-nnc-lexical-item": {
      "assertionId": "classical-clause-conjunction-lexical-synonymy-idiom:p4893-the-notion-expressed-by-a-conjoined-nnc-lexical-item",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalClauseConjunctionValidationFrame",
  "executionValidatorName": "isClassicalClauseConjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4893": [
      "lexical-synonymy-idiom"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4893": "authorized"
  }
};
export default Object.freeze(spec);
