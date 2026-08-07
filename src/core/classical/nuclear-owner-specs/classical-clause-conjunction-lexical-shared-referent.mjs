const spec = {
  "ownerId": "classical-clause-conjunction-lexical-shared-referent",
  "prefix": "ClassicalClauseConjunctionLexicalSharedReferent",
  "operationId": "classical.clause.conjunction.lexical.shared.referent.execute",
  "inputContract": "complete-typed-classical-clause-conjunction-lexical-shared-referent-source",
  "domain": "classical-clause-conjunction-lexical-shared-referent",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-conjunction-runtime",
  "selections": [
    "claim-p4888"
  ],
  "coordinates": {
    "claim-p4888::p4888-it-should-be-obvious-that-in-order-to-create": {
      "assertionId": "classical-clause-conjunction-lexical-shared-referent:p4888-it-should-be-obvious-that-in-order-to-create",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalClauseConjunctionValidationFrame",
  "executionValidatorName": "isClassicalClauseConjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4888": [
      "lexical-shared-referent"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4888": "authorized"
  }
};
export default Object.freeze(spec);
