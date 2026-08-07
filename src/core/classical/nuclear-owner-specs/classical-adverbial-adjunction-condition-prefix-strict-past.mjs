const spec = {
  "ownerId": "classical-adverbial-adjunction-condition-prefix-strict-past",
  "prefix": "ClassicalAdverbialAdjunctionConditionPrefixStrictPast",
  "operationId": "classical.adverbial.adjunction.condition.prefix.strict.past.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-condition-prefix-strict-past-source",
  "domain": "classical-adverbial-adjunction-condition-prefix-strict-past",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4760"
  ],
  "coordinates": {
    "claim-p4760::p4760-with-the-prefix-the-conditional-sentence-refers-strictly-to": {
      "assertionId": "classical-adverbial-adjunction-condition-prefix-strict-past:p4760-with-the-prefix-the-conditional-sentence-refers-strictly-to",
      "canonicalPath": "analysis.matchedAntecessiveSelectsStrictPast"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4760": [
      "condition-prefix-strict-past"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4760": "authorized"
  }
};
export default Object.freeze(spec);
