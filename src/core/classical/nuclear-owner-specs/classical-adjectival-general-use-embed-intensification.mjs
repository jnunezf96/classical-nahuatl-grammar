const spec = {
  "ownerId": "classical-adjectival-general-use-embed-intensification",
  "prefix": "ClassicalAdjectivalGeneralUseEmbedIntensification",
  "operationId": "classical.adjectival.general.use.embed.intensification.execute",
  "inputContract": "complete-typed-classical-adjectival-general-use-embed-intensification-source",
  "domain": "classical-adjectival-general-use-embed-intensification",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p3969"
  ],
  "coordinates": {
    "claim-p3969::p3969-the-embed-may-be-the-general-use-form-of": {
      "assertionId": "classical-adjectival-general-use-embed-intensification:p3969-the-embed-may-be-the-general-use-form-of",
      "canonicalPath": "sources.deverbal.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p3969": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3969": "authorized"
  }
};
export default Object.freeze(spec);
