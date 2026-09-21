const spec = {
  "ownerId": "classical-adjectival-preposed-modifier-order",
  "prefix": "ClassicalAdjectivalPreposedModifierOrder",
  "operationId": "classical.adjectival.preposed.modifier.order.execute",
  "inputContract": "complete-typed-classical-adjectival-preposed-modifier-order-source",
  "domain": "classical-adjectival-preposed-modifier-order",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p4020"
  ],
  "coordinates": {
    "claim-p4020::p4020-the-unmarked-adjectival-modifier-may-be-shifted-to-a": {
      "assertionId": "classical-adjectival-preposed-modifier-order:p4020-the-unmarked-adjectival-modifier-may-be-shifted-to-a",
      "canonicalPath": "cases.preposed.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p4020": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4020": "authorized"
  },
  "nonExecutableObservations": {
    "claim-p4021::p4021-this-proposing-transformation-does-not-create-a-topic-see": {
      "assertionId": "classical-adjectival-preposed-modifier-order:p4021-this-proposing-transformation-does-not-create-a-topic-see",
      "disposition": "documentary-claim-runtime-observation-unverified",
      "reason": "Canvas16658–16664 distinguishes preposing from topic announcement and hiatus; order alone does not observe this distinction.",
      "retiredCanonicalPath": "cases.preposed.order",
      "executionCredit": false,
      "grammarAuthority": false
    }
  }
};
export default Object.freeze(spec);
