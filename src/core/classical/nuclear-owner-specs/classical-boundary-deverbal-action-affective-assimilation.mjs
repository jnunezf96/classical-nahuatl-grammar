const spec = {
  "ownerId": "classical-boundary-deverbal-action-affective-assimilation",
  "prefix": "ClassicalBoundaryDeverbalActionAffectiveAssimilation",
  "operationId": "classical.boundary.deverbal.action.affective.assimilation.execute",
  "inputContract": "complete-typed-classical-boundary-deverbal-action-affective-assimilation-source",
  "domain": "classical-boundary-deverbal-action-affective-assimilation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-deverbal-patientive-runtime",
  "selections": [
    "claim-p3669"
  ],
  "coordinates": {
    "claim-p3669::p3669-when-a-nounstem-created-with-liz-or-z-is": {
      "assertionId": "classical-boundary-deverbal-action-affective-assimilation:p3669-when-a-nounstem-created-with-liz-or-z-is",
      "canonicalPath": "cases.deverbalActionAffectiveAssimilation.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlDeverbalPatientiveValidationFrame",
  "executionValidatorName": "isClassicalNahuatlDeverbalPatientiveValidationFrame",
  "executionArgsBySelection": {
    "claim-p3669": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3669": "authorized"
  }
};
export default Object.freeze(spec);
