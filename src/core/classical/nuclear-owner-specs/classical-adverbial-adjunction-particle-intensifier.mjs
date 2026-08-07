const spec = {
  "ownerId": "classical-adverbial-adjunction-particle-intensifier",
  "prefix": "ClassicalAdverbialAdjunctionParticleIntensifier",
  "operationId": "classical.adverbial.adjunction.particle.intensifier.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-particle-intensifier-source",
  "domain": "classical-adverbial-adjunction-particle-intensifier",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4683"
  ],
  "coordinates": {
    "claim-p4683::p4683-there-are-also-a-few-adverbial-particles-that-can": {
      "assertionId": "classical-adverbial-adjunction-particle-intensifier:p4683-there-are-also-a-few-adverbial-particles-that-can",
      "canonicalPath": "analysis.particleIntensifierLicensed"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4683": [
      "particle-intensifier"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4683": "authorized"
  }
};
export default Object.freeze(spec);
