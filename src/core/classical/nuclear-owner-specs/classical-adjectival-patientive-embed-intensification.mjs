const spec = {
  "ownerId": "classical-adjectival-patientive-embed-intensification",
  "prefix": "ClassicalAdjectivalPatientiveEmbedIntensification",
  "operationId": "classical.adjectival.patientive.embed.intensification.execute",
  "inputContract": "complete-typed-classical-adjectival-patientive-embed-intensification-source",
  "domain": "classical-adjectival-patientive-embed-intensification",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p3967"
  ],
  "coordinates": {
    "claim-p3967::p3967-included-in-this-type-of-embed-are-the-patientive": {
      "assertionId": "classical-adjectival-patientive-embed-intensification:p3967-included-in-this-type-of-embed-are-the-patientive",
      "canonicalPath": "sources.patientive.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p3967": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3967": "authorized"
  }
};
export default Object.freeze(spec);
