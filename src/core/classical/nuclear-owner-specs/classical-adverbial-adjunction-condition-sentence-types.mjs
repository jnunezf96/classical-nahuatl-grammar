const spec = {
  "ownerId": "classical-adverbial-adjunction-condition-sentence-types",
  "prefix": "ClassicalAdverbialAdjunctionConditionSentenceTypes",
  "operationId": "classical.adverbial.adjunction.condition.sentence.types.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-condition-sentence-types-source",
  "domain": "classical-adverbial-adjunction-condition-sentence-types",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4738"
  ],
  "coordinates": {
    "claim-p4738::p4738-the-principal-clause-can-be-any-type-of-sentence": {
      "assertionId": "classical-adverbial-adjunction-condition-sentence-types:p4738-the-principal-clause-can-be-any-type-of-sentence",
      "canonicalPath": "analysis.principalSentenceTypeCount"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4738": [
      "condition-sentence-types"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4738": "authorized"
  }
};
export default Object.freeze(spec);
