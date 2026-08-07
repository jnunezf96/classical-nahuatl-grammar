const spec = {
  "ownerId": "classical-deverbal-action-way-of-reading",
  "prefix": "ClassicalDeverbalActionWayOfReading",
  "operationId": "classical.deverbal.action.way.of.reading.execute",
  "inputContract": "complete-typed-classical-deverbal-action-way-of-reading-source",
  "domain": "classical-deverbal-action-way-of-reading",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-deverbal-patientive-runtime",
  "selections": [
    "claim-p3655"
  ],
  "coordinates": {
    "claim-p3655::p3655-occasionally-an-active-action-nounstem-derived-by-means-of": {
      "assertionId": "classical-deverbal-action-way-of-reading:p3655-occasionally-an-active-action-nounstem-derived-by-means-of",
      "canonicalPath": "cases.deverbalWayOfReading.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlDeverbalPatientiveValidationFrame",
  "executionValidatorName": "isClassicalNahuatlDeverbalPatientiveValidationFrame",
  "executionArgsBySelection": {
    "claim-p3655": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3655": "authorized"
  }
};
export default Object.freeze(spec);
