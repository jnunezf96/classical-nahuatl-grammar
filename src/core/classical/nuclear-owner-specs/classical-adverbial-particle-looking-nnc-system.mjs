const spec = {
  "ownerId": "classical-adverbial-particle-looking-nnc-system",
  "prefix": "ClassicalAdverbialParticleLookingNncSystem",
  "operationId": "classical.adverbial.particle.looking.nnc.system.execute",
  "inputContract": "complete-typed-classical-adverbial-particle-looking-nnc-system-source",
  "domain": "classical-adverbial-particle-looking-nnc-system",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-nuclear-runtime",
  "selections": [
    "claim-p4165",
    "claim-p4166"
  ],
  "coordinates": {
    "claim-p4165::p4165-when-second-degree-adverbialization-creates-a-single-syllabled-nnc": {
      "assertionId": "classical-adverbial-particle-looking-nnc-system:p4165-when-second-degree-adverbialization-creates-a-single-syllabled-nnc",
      "canonicalPath": "cases.particleNel.canonicalResult"
    },
    "claim-p4166::p4166-when-second-degree-adverbialization-creates-a-single-syllabled-nnc": {
      "assertionId": "classical-adverbial-particle-looking-nnc-system:p4166-when-second-degree-adverbialization-creates-a-single-syllabled-nnc",
      "canonicalPath": "cases.particleNel.family"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialNuclearValidationFrame",
  "executionValidatorName": "isClassicalAdverbialNuclearValidationFrame",
  "executionArgsBySelection": {
    "claim-p4165": [],
    "claim-p4166": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4165": "authorized",
    "claim-p4166": "authorized"
  }
};
export default Object.freeze(spec);
