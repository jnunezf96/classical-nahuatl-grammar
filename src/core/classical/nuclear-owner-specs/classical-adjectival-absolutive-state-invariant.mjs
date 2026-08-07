const spec = {
  "ownerId": "classical-adjectival-absolutive-state-invariant",
  "prefix": "ClassicalAdjectivalAbsolutiveStateInvariant",
  "operationId": "classical.adjectival.absolutive.state.invariant.execute",
  "inputContract": "complete-typed-classical-adjectival-absolutive-state-invariant-source",
  "domain": "classical-adjectival-absolutive-state-invariant",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p3863"
  ],
  "coordinates": {
    "claim-p3863::p3863-as-a-rule-an-adjectival-nnc-occurs-only-in": {
      "assertionId": "classical-adjectival-absolutive-state-invariant:p3863-as-a-rule-an-adjectival-nnc-occurs-only-in",
      "canonicalPath": "cases.ordinary.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p3863": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3863": "authorized"
  }
};
export default Object.freeze(spec);
