const spec = {
  "ownerId": "classical-adverbial-adjunction-condition-order",
  "prefix": "ClassicalAdverbialAdjunctionConditionOrder",
  "operationId": "classical.adverbial.adjunction.condition.order.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-condition-order-source",
  "domain": "classical-adverbial-adjunction-condition-order",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4739"
  ],
  "coordinates": {
    "claim-p4739::p4739-the-adjoined-clause-may-precede-or-follow-the-principal": {
      "assertionId": "classical-adverbial-adjunction-condition-order:p4739-the-adjoined-clause-may-precede-or-follow-the-principal",
      "canonicalPath": "analysis.conditionMayPrecedeOrFollowPrincipal"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4739": [
      "condition-order"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4739": "authorized"
  }
};
export default Object.freeze(spec);
