const spec = {
  "ownerId": "classical-adjectival-reduplicated-embed-intensification",
  "prefix": "ClassicalAdjectivalReduplicatedEmbedIntensification",
  "operationId": "classical.adjectival.reduplicated.embed.intensification.execute",
  "inputContract": "complete-typed-classical-adjectival-reduplicated-embed-intensification-source",
  "domain": "classical-adjectival-reduplicated-embed-intensification",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p3970"
  ],
  "coordinates": {
    "claim-p3970::p3970-the-embed-may-be-intensified-by-reduplication-according-to": {
      "assertionId": "classical-adjectival-reduplicated-embed-intensification:p3970-the-embed-may-be-intensified-by-reduplication-according-to",
      "canonicalPath": "sources.compoundNnc.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p3970": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3970": "authorized"
  }
};
export default Object.freeze(spec);
