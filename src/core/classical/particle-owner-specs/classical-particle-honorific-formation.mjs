const spec = {
  "ownerId": "classical-particle-honorific-formation",
  "prefix": "ClassicalParticleHonorificFormation",
  "operationId": "classical.particle.honorific.form",
  "inputContract": "complete-typed-classical-particle-honorific-formation-source",
  "domain": "classical-particle-honorific-formation",
  "mode": "canonical-particle-operation",
  "canonicalActorId": "classical-particle-honorific-formation",
  "selections": [
    "l3-otzin",
    "l3-auhtzin",
    "l3-ca-no-zotzin"
  ],
  "coordinates": {
    "l3-otzin::p596-o-tzin-behold": {
      "assertionId": "classical-particle-honorific-formation:p596-o-tzin-behold",
      "canonicalPath": ""
    },
    "l3-auhtzin::p597-a-uhtzin-good-good": {
      "assertionId": "classical-particle-honorific-formation:p597-a-uhtzin-good-good",
      "canonicalPath": ""
    },
    "l3-ca-no-zotzin::p598-ca-no-zotzin-thus-it-is": {
      "assertionId": "classical-particle-honorific-formation:p598-ca-no-zotzin-thus-it-is",
      "canonicalPath": ""
    }
  },
  "sourceBuilderName": "buildClassicalNahuatlParticleHonorificSourceFrame",
  "executionFunctionName": "evaluateClassicalNahuatlParticleHonorificFormation",
  "executionValidatorName": "isClassicalNahuatlParticleHonorificResultFrame",
  "executionArgsBySelection": {
    "l3-otzin": [
      {
        "targetId": "l3-otzin"
      }
    ],
    "l3-auhtzin": [
      {
        "targetId": "l3-auhtzin"
      }
    ],
    "l3-ca-no-zotzin": [
      {
        "targetId": "l3-ca-no-zotzin"
      }
    ]
  }
};
export default Object.freeze(spec);
