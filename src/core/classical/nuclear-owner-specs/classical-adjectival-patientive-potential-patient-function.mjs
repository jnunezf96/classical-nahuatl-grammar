const spec = {
  "ownerId": "classical-adjectival-patientive-potential-patient-function",
  "prefix": "ClassicalAdjectivalPatientivePotentialPatientFunction",
  "operationId": "classical.adjectival.patientive.potential.patient.function.execute",
  "inputContract": "complete-typed-classical-adjectival-patientive-potential-patient-function-source",
  "domain": "classical-adjectival-patientive-potential-patient-function",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p3890",
    "claim-p3891",
    "claim-p3892",
    "claim-p3893",
    "claim-p3894"
  ],
  "coordinates": {
    "claim-p3890::p3890-among-the-nounstems-created-by-derivation-the-potential-patient": {
      "assertionId": "classical-adjectival-patientive-potential-patient-function:p3890-among-the-nounstems-created-by-derivation-the-potential-patient",
      "canonicalPath": "cases.patientive.canonicalResult"
    },
    "claim-p3891::p3891-unlike-english-adjectives-which-assign-an-abstract-quality-or": {
      "assertionId": "classical-adjectival-patientive-potential-patient-function:p3891-unlike-english-adjectives-which-assign-an-abstract-quality-or",
      "canonicalPath": "cases.patientive.modifierClauseType"
    },
    "claim-p3892::p3892-in-the-examples-the-adjectival-nncs-are-translated-loosely": {
      "assertionId": "classical-adjectival-patientive-potential-patient-function:p3892-in-the-examples-the-adjectival-nncs-are-translated-loosely",
      "canonicalPath": "sources.patientive.authorizationStatus"
    },
    "claim-p3893::p3893-a-stricter-rendering-would-always-show-the-substantive-nature": {
      "assertionId": "classical-adjectival-patientive-potential-patient-function:p3893-a-stricter-rendering-would-always-show-the-substantive-nature",
      "canonicalPath": "cases.patientive.canonicalResult"
    },
    "claim-p3894::p3894-nncs-formed-on-a-nounstem-derived-by-means-of": {
      "assertionId": "classical-adjectival-patientive-potential-patient-function:p3894-nncs-formed-on-a-nounstem-derived-by-means-of",
      "canonicalPath": "cases.patientive.modifierClauseType"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p3890": [],
    "claim-p3891": [],
    "claim-p3892": [],
    "claim-p3893": [],
    "claim-p3894": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3890": "authorized",
    "claim-p3891": "authorized",
    "claim-p3892": "authorized",
    "claim-p3893": "authorized",
    "claim-p3894": "authorized"
  }
};
export default Object.freeze(spec);
