const spec = {
  "ownerId": "classical-tla-impersonal-source-inventory",
  "prefix": "ClassicalTlaImpersonalSourceInventory",
  "operationId": "classical.tla.impersonal.source.inventory.execute",
  "inputContract": "complete-typed-classical-tla-impersonal-source-inventory-source",
  "domain": "classical-tla-impersonal-source-inventory",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nonactive-voice-object-runtime",
  "selections": [
    "claim-p2172",
    "claim-p2173"
  ],
  "coordinates": {
    "claim-p2172::p2172-at-times-only-the-tla-impersonal-stem-is-attested": {
      "assertionId": "classical-tla-impersonal-source-inventory:p2172-at-times-only-the-tla-impersonal-stem-is-attested",
      "canonicalPath": "impersonal.tlaInventory.0.authorizationStatus"
    },
    "claim-p2173::p2173-the-derived-stem-has-the-same-translation-value-as": {
      "assertionId": "classical-tla-impersonal-source-inventory:p2173-the-derived-stem-has-the-same-translation-value-as",
      "canonicalPath": "impersonal.tlaInventory.17.targetDerivedByEngine"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionArgsBySelection": {
    "claim-p2172": [],
    "claim-p2173": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2172": "authorized",
    "claim-p2173": "authorized"
  }
};
export default Object.freeze(spec);
