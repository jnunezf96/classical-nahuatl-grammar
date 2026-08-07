const spec = {
  "ownerId": "classical-clause-conjunction-lexical-possessive-state",
  "prefix": "ClassicalClauseConjunctionLexicalPossessiveState",
  "operationId": "classical.clause.conjunction.lexical.possessive.state.execute",
  "inputContract": "complete-typed-classical-clause-conjunction-lexical-possessive-state-source",
  "domain": "classical-clause-conjunction-lexical-possessive-state",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-conjunction-runtime",
  "selections": [
    "claim-p4892"
  ],
  "coordinates": {
    "claim-p4892::p4892-the-possessive-state-may-be-formed-on-the-compound": {
      "assertionId": "classical-clause-conjunction-lexical-possessive-state:p4892-the-possessive-state-may-be-formed-on-the-compound",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalClauseConjunctionValidationFrame",
  "executionValidatorName": "isClassicalClauseConjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4892": [
      "lexical-possessive-state"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4892": "authorized"
  }
};
export default Object.freeze(spec);
