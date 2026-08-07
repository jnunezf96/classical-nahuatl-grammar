const spec = {
  "ownerId": "classical-personal-name-nnc-passive-preterit-patientive",
  "prefix": "ClassicalPersonalNameNncPassivePreteritPatientive",
  "operationId": "classical.personal.name.nnc.passive.preterit.patientive.execute",
  "inputContract": "complete-typed-classical-personal-name-nnc-passive-preterit-patientive-source",
  "domain": "classical-personal-name-nnc-passive-preterit-patientive",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-personal-name-nnc-runtime",
  "selections": [
    "claim-p5194",
    "claim-p5195"
  ],
  "coordinates": {
    "claim-p5194::p5194-when-the-stem-of-the-personal-name-nnc-has": {
      "assertionId": "classical-personal-name-nnc-passive-preterit-patientive:p5194-when-the-stem-of-the-personal-name-nnc-has",
      "canonicalPath": "result.canonicalResult"
    },
    "claim-p5195::p5195-when-the-stem-of-the-personal-name-nnc-has": {
      "assertionId": "classical-personal-name-nnc-passive-preterit-patientive:p5195-when-the-stem-of-the-personal-name-nnc-has",
      "canonicalPath": "result.innerSubjectBarrier"
    }
  },
  "executionFunctionName": "buildClassicalPersonalNameNncValidationFrame",
  "executionValidatorName": "isClassicalPersonalNameNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5194": [
      "passive-preterit-patientive",
      "passive-preterit-patientive",
      "default",
      ""
    ],
    "claim-p5195": [
      "passive-preterit-patientive",
      "passive-preterit-patientive",
      "default",
      ""
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5194": "authorized",
    "claim-p5195": "authorized"
  }
};
export default Object.freeze(spec);
