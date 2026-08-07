const spec = {
  "ownerId": "classical-clause-conjunction-lexical-derivation",
  "prefix": "ClassicalClauseConjunctionLexicalDerivation",
  "operationId": "classical.clause.conjunction.lexical.derivation.execute",
  "inputContract": "complete-typed-classical-clause-conjunction-lexical-derivation-source",
  "domain": "classical-clause-conjunction-lexical-derivation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-conjunction-runtime",
  "selections": [
    "claim-p4896",
    "claim-p4897"
  ],
  "coordinates": {
    "claim-p4896::p4896-when-its-members-are-used-to-derive-verbstems": {
      "assertionId": "classical-clause-conjunction-lexical-derivation:p4896-when-its-members-are-used-to-derive-verbstems",
      "canonicalPath": "analysis.semanticBoundary"
    },
    "claim-p4897::p4897-the-lexical-unit-can-survive-when-its-members-are": {
      "assertionId": "classical-clause-conjunction-lexical-derivation:p4897-the-lexical-unit-can-survive-when-its-members-are",
      "canonicalPath": "result.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalClauseConjunctionValidationFrame",
  "executionValidatorName": "isClassicalClauseConjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4896": [
      "lexical-derivation"
    ],
    "claim-p4897": [
      "lexical-derivation"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4896": "authorized",
    "claim-p4897": "authorized"
  }
};
export default Object.freeze(spec);
