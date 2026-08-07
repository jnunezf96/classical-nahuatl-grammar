const spec = {
  "ownerId": "classical-clause-conjunction-translator-choice-boundary",
  "prefix": "ClassicalClauseConjunctionTranslatorChoiceBoundary",
  "operationId": "classical.clause.conjunction.translator.choice.boundary.execute",
  "inputContract": "complete-typed-classical-clause-conjunction-translator-choice-boundary-source",
  "domain": "classical-clause-conjunction-translator-choice-boundary",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-conjunction-runtime",
  "selections": [
    "claim-p4865",
    "claim-p4866",
    "claim-p4867",
    "claim-p4868"
  ],
  "coordinates": {
    "claim-p4865::p4865-either-omit-the-nahuatl-adverbial-modifier-or-translate-it": {
      "assertionId": "classical-clause-conjunction-translator-choice-boundary:p4865-either-omit-the-nahuatl-adverbial-modifier-or-translate-it",
      "canonicalPath": "analysis.semanticBoundary"
    },
    "claim-p4866::p4866-as-with-any-of-these-adverbial-modifiers-that-stand": {
      "assertionId": "classical-clause-conjunction-translator-choice-boundary:p4866-as-with-any-of-these-adverbial-modifiers-that-stand",
      "canonicalPath": "result.canonicalResult"
    },
    "claim-p4867::p4867-but-of-course-if-the-adverbial-modifier-is-not": {
      "assertionId": "classical-clause-conjunction-translator-choice-boundary:p4867-but-of-course-if-the-adverbial-modifier-is-not",
      "canonicalPath": "analysis.rawStoredAuthorityBlocked"
    },
    "claim-p4868::p4868-if-the-adverbial-modifier-is-not-translated": {
      "assertionId": "classical-clause-conjunction-translator-choice-boundary:p4868-if-the-adverbial-modifier-is-not-translated",
      "canonicalPath": "analysis.copiedSignedNodeBlocked"
    }
  },
  "executionFunctionName": "buildClassicalClauseConjunctionValidationFrame",
  "executionValidatorName": "isClassicalClauseConjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4865": [
      "translator-choice-boundary"
    ],
    "claim-p4866": [
      "translator-choice-boundary"
    ],
    "claim-p4867": [
      "translator-choice-boundary"
    ],
    "claim-p4868": [
      "translator-choice-boundary"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4865": "authorized",
    "claim-p4866": "authorized",
    "claim-p4867": "authorized",
    "claim-p4868": "authorized"
  }
};
export default Object.freeze(spec);
