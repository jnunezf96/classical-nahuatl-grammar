const spec = {
  "ownerId": "classical-adjectival-nonpreposed-modifier",
  "prefix": "ClassicalAdjectivalNonpreposedModifier",
  "operationId": "classical.adjectival.nonpreposed.modifier.execute",
  "inputContract": "complete-typed-classical-adjectival-nonpreposed-modifier-source",
  "domain": "classical-adjectival-nonpreposed-modifier",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p4087"
  ],
  "coordinates": {
    "claim-p4087::p4087-the-adjectival-modifier-that-follows-its-head-has-several": {
      "assertionId": "classical-adjectival-nonpreposed-modifier:p4087-the-adjectival-modifier-that-follows-its-head-has-several",
      "canonicalPath": "cases.ordinary.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p4087": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4087": "authorized"
  }
};
export default Object.freeze(spec);
