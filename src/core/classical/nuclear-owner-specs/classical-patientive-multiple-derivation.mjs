const spec = {
  "ownerId": "classical-patientive-multiple-derivation",
  "prefix": "ClassicalPatientiveMultipleDerivation",
  "operationId": "classical.patientive.multiple.derivation.execute",
  "inputContract": "complete-typed-classical-patientive-multiple-derivation-source",
  "domain": "classical-patientive-multiple-derivation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-deverbal-patientive-runtime",
  "selections": [
    "claim-p3820",
    "claim-p3821",
    "claim-p3822"
  ],
  "coordinates": {
    "claim-p3820::p3820-some-verbs-allow-the-formation-of-patientive-nounstems-by": {
      "assertionId": "classical-patientive-multiple-derivation:p3820-some-verbs-allow-the-formation-of-patientive-nounstems-by",
      "canonicalPath": "cases.patientiveMultipleDerivation.authorizationStatus"
    },
    "claim-p3821::p3821-in-the-majority-of-instances-the-various-patientive-nounstems": {
      "assertionId": "classical-patientive-multiple-derivation:p3821-in-the-majority-of-instances-the-various-patientive-nounstems",
      "canonicalPath": "cases.patientiveMultipleDerivation.first.canonicalResult"
    },
    "claim-p3822::p3822-tla-que-mi-tl-que-mi-tl-tla-que": {
      "assertionId": "classical-patientive-multiple-derivation:p3822-tla-que-mi-tl-que-mi-tl-tla-que",
      "canonicalPath": "cases.patientiveMultipleDerivation.second.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlDeverbalPatientiveValidationFrame",
  "executionValidatorName": "isClassicalNahuatlDeverbalPatientiveValidationFrame",
  "executionArgsBySelection": {
    "claim-p3820": [],
    "claim-p3821": [],
    "claim-p3822": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3820": "authorized",
    "claim-p3821": "authorized",
    "claim-p3822": "authorized"
  }
};
export default Object.freeze(spec);
