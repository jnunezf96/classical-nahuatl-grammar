const spec = {
  "ownerId": "classical-adjectival-huiyac-variant-licensing",
  "prefix": "ClassicalAdjectivalHuiyacVariantLicensing",
  "operationId": "classical.adjectival.huiyac.variant.licensing.execute",
  "inputContract": "complete-typed-classical-adjectival-huiyac-variant-licensing-source",
  "domain": "classical-adjectival-huiyac-variant-licensing",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p3928"
  ],
  "coordinates": {
    "claim-p3928::p3928-the-form-hui-ya-c-is-a-frequently-found": {
      "assertionId": "classical-adjectival-huiyac-variant-licensing:p3928-the-form-hui-ya-c-is-a-frequently-found",
      "canonicalPath": "sources.deverbal.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p3928": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3928": "authorized"
  }
};
export default Object.freeze(spec);
