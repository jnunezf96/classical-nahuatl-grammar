const spec = {
  "ownerId": "classical-male-vocative-particle-realization",
  "prefix": "ClassicalMaleVocativeParticleRealization",
  "operationId": "classical.male.vocative.particle.realization.execute",
  "inputContract": "complete-typed-classical-male-vocative-particle-realization-source",
  "domain": "classical-male-vocative-particle-realization",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-supplementation-runtime",
  "selections": [
    "claim-p1868",
    "claim-p1869"
  ],
  "coordinates": {
    "claim-p1868::p1868-the-vocative-nnc-used-by-a-male-speaker-is": {
      "assertionId": "classical-male-vocative-particle-realization:p1868-the-vocative-nnc-used-by-a-male-speaker-is",
      "canonicalPath": "vocativeMale.speakerGender"
    },
    "claim-p1869::p1869-7-is-the-sole-exception-to-the-rule-for": {
      "assertionId": "classical-male-vocative-particle-realization:p1869-7-is-the-sole-exception-to-the-rule-for",
      "canonicalPath": "vocativeMale.prosody"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlSupplementationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlSupplementationValidationFrame",
  "executionArgsBySelection": {
    "claim-p1868": [],
    "claim-p1869": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1868": "authorized",
    "claim-p1869": "authorized"
  }
};
export default Object.freeze(spec);
