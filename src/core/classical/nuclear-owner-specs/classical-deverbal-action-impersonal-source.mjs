const spec = {
  "ownerId": "classical-deverbal-action-impersonal-source",
  "prefix": "ClassicalDeverbalActionImpersonalSource",
  "operationId": "classical.deverbal.action.impersonal.source.execute",
  "inputContract": "complete-typed-classical-deverbal-action-impersonal-source-source",
  "domain": "classical-deverbal-action-impersonal-source",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-deverbal-patientive-runtime",
  "selections": [
    "claim-p3665",
    "claim-p3666",
    "claim-p3667"
  ],
  "coordinates": {
    "claim-p3665::p3665-the-suffixal-unit-liz-can-be-added-to-an": {
      "assertionId": "classical-deverbal-action-impersonal-source:p3665-the-suffixal-unit-liz-can-be-added-to-an",
      "canonicalPath": "cases.deverbalImpersonalSource.authorizationStatus"
    },
    "claim-p3666::p3666-the-source-impersonal-verbstem-may-be-created-by-a": {
      "assertionId": "classical-deverbal-action-impersonal-source:p3666-the-source-impersonal-verbstem-may-be-created-by-a",
      "canonicalPath": "cases.deverbalImpersonalSource.allCanonical"
    },
    "claim-p3667::p3667-the-source-impersonal-verbstem-may-be-created-by-the": {
      "assertionId": "classical-deverbal-action-impersonal-source:p3667-the-source-impersonal-verbstem-may-be-created-by-the",
      "canonicalPath": "cases.deverbalImpersonalSource.records.1.operationId"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlDeverbalPatientiveValidationFrame",
  "executionValidatorName": "isClassicalNahuatlDeverbalPatientiveValidationFrame",
  "executionArgsBySelection": {
    "claim-p3665": [],
    "claim-p3666": [],
    "claim-p3667": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3665": "authorized",
    "claim-p3666": "authorized",
    "claim-p3667": "authorized"
  }
};
export default Object.freeze(spec);
