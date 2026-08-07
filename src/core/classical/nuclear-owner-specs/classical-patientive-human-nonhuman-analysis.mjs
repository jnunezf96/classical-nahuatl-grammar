const spec = {
  "ownerId": "classical-patientive-human-nonhuman-analysis",
  "prefix": "ClassicalPatientiveHumanNonhumanAnalysis",
  "operationId": "classical.patientive.human.nonhuman.analysis.execute",
  "inputContract": "complete-typed-classical-patientive-human-nonhuman-analysis-source",
  "domain": "classical-patientive-human-nonhuman-analysis",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-deverbal-patientive-runtime",
  "selections": [
    "claim-p3727",
    "claim-p3728"
  ],
  "coordinates": {
    "claim-p3727::p3727-nounstem-derived-from-a-nonactive-verbstem-formed-by-the": {
      "assertionId": "classical-patientive-human-nonhuman-analysis:p3727-nounstem-derived-from-a-nonactive-verbstem-formed-by-the",
      "canonicalPath": "cases.patientiveHumanNonhuman.authorizationStatus"
    },
    "claim-p3728::p3728-another-example-of-the-formation-is": {
      "assertionId": "classical-patientive-human-nonhuman-analysis:p3728-another-example-of-the-formation-is",
      "canonicalPath": "contract.evidenceRoles.humanNonhumanAnalysis"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlDeverbalPatientiveValidationFrame",
  "executionValidatorName": "isClassicalNahuatlDeverbalPatientiveValidationFrame",
  "executionArgsBySelection": {
    "claim-p3727": [],
    "claim-p3728": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3727": "authorized",
    "claim-p3728": "authorized"
  }
};
export default Object.freeze(spec);
