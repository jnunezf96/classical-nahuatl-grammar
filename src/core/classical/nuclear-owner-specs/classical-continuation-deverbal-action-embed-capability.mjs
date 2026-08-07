const spec = {
  "ownerId": "classical-continuation-deverbal-action-embed-capability",
  "prefix": "ClassicalContinuationDeverbalActionEmbedCapability",
  "operationId": "classical.continuation.deverbal.action.embed.capability.execute",
  "inputContract": "complete-typed-classical-continuation-deverbal-action-embed-capability-source",
  "domain": "classical-continuation-deverbal-action-embed-capability",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-deverbal-patientive-runtime",
  "selections": [
    "claim-p3668"
  ],
  "coordinates": {
    "claim-p3668::p3668-an-active-action-nounstem-can-be-used-as-the": {
      "assertionId": "classical-continuation-deverbal-action-embed-capability:p3668-an-active-action-nounstem-can-be-used-as-the",
      "canonicalPath": "cases.deverbalActionEmbedCapability.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlDeverbalPatientiveValidationFrame",
  "executionValidatorName": "isClassicalNahuatlDeverbalPatientiveValidationFrame",
  "executionArgsBySelection": {
    "claim-p3668": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3668": "authorized"
  }
};
export default Object.freeze(spec);
