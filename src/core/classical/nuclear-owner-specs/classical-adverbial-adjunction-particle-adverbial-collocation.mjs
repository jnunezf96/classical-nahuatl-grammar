const spec = {
  "ownerId": "classical-adverbial-adjunction-particle-adverbial-collocation",
  "prefix": "ClassicalAdverbialAdjunctionParticleAdverbialCollocation",
  "operationId": "classical.adverbial.adjunction.particle.adverbial.collocation.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-particle-adverbial-collocation-source",
  "domain": "classical-adverbial-adjunction-particle-adverbial-collocation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4675"
  ],
  "coordinates": {
    "claim-p4675::p4675-there-are-many-lexicalized-collocations-in-which-a-particle": {
      "assertionId": "classical-adverbial-adjunction-particle-adverbial-collocation:p4675-there-are-many-lexicalized-collocations-in-which-a-particle",
      "canonicalPath": "analysis.particleMayModifyAdverbializedNnc"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4675": [
      "particle-adverbial-collocation"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4675": "authorized"
  }
};
export default Object.freeze(spec);
