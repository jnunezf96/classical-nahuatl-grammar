const spec = {
  "ownerId": "classical-adverbial-adjunction-condition-context-without-prefix",
  "prefix": "ClassicalAdverbialAdjunctionConditionContextWithoutPrefix",
  "operationId": "classical.adverbial.adjunction.condition.context.without.prefix.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-condition-context-without-prefix-source",
  "domain": "classical-adverbial-adjunction-condition-context-without-prefix",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4759"
  ],
  "coordinates": {
    "claim-p4759::p4759-without-the-prefix-the-conditional-sentence-is-the-same": {
      "assertionId": "classical-adverbial-adjunction-condition-context-without-prefix:p4759-without-the-prefix-the-conditional-sentence-is-the-same",
      "canonicalPath": "analysis.absentAntecessiveLeavesContextualTime"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4759": [
      "condition-context-without-prefix"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4759": "authorized"
  }
};
export default Object.freeze(spec);
