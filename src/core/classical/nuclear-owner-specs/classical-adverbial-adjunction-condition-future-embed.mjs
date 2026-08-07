const spec = {
  "ownerId": "classical-adverbial-adjunction-condition-future-embed",
  "prefix": "ClassicalAdverbialAdjunctionConditionFutureEmbed",
  "operationId": "classical.adverbial.adjunction.condition.future.embed.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-condition-future-embed-source",
  "domain": "classical-adverbial-adjunction-condition-future-embed",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4753"
  ],
  "coordinates": {
    "claim-p4753::p4753-the-principal-clause-has-a-vnc-built-on-a": {
      "assertionId": "classical-adverbial-adjunction-condition-future-embed:p4753-the-principal-clause-has-a-vnc-built-on-a",
      "canonicalPath": "analysis.hypotheticalPrincipalRequiresFutureEmbed"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4753": [
      "condition-future-embed"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4753": "authorized"
  }
};
export default Object.freeze(spec);
