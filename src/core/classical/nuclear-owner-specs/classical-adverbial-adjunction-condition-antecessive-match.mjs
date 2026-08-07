const spec = {
  "ownerId": "classical-adverbial-adjunction-condition-antecessive-match",
  "prefix": "ClassicalAdverbialAdjunctionConditionAntecessiveMatch",
  "operationId": "classical.adverbial.adjunction.condition.antecessive.match.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-condition-antecessive-match-source",
  "domain": "classical-adverbial-adjunction-condition-antecessive-match",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4756",
    "claim-p4757",
    "claim-p4758"
  ],
  "coordinates": {
    "claim-p4756::p4756-the-vnc-governing-the-principal-clause-is-built-on": {
      "assertionId": "classical-adverbial-adjunction-condition-antecessive-match:p4756-the-vnc-governing-the-principal-clause-is-built-on",
      "canonicalPath": "analysis.pastAntecessiveMustMatchAcrossClauses"
    },
    "claim-p4757::p4757-if-the-antecessive-order-prefix-is-used-in-the": {
      "assertionId": "classical-adverbial-adjunction-condition-antecessive-match:p4757-if-the-antecessive-order-prefix-is-used-in-the",
      "canonicalPath": "result.canonicalResult"
    },
    "claim-p4758::p4758-if-the-antecessive-order-prefix-is-used-in-the": {
      "assertionId": "classical-adverbial-adjunction-condition-antecessive-match:p4758-if-the-antecessive-order-prefix-is-used-in-the",
      "canonicalPath": "result.relation"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4756": [
      "condition-antecessive-match"
    ],
    "claim-p4757": [
      "condition-antecessive-match"
    ],
    "claim-p4758": [
      "condition-antecessive-match"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4756": "authorized",
    "claim-p4757": "authorized",
    "claim-p4758": "authorized"
  }
};
export default Object.freeze(spec);
