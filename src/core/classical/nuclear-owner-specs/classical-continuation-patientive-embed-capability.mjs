const spec = {
  "ownerId": "classical-continuation-patientive-embed-capability",
  "prefix": "ClassicalContinuationPatientiveEmbedCapability",
  "operationId": "classical.continuation.patientive.embed.capability.execute",
  "inputContract": "complete-typed-classical-continuation-patientive-embed-capability-source",
  "domain": "classical-continuation-patientive-embed-capability",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-deverbal-patientive-runtime",
  "selections": [
    "claim-p3823"
  ],
  "coordinates": {
    "claim-p3823::p3823-the-patientive-nounstem-may-serve-as-the-embed-of": {
      "assertionId": "classical-continuation-patientive-embed-capability:p3823-the-patientive-nounstem-may-serve-as-the-embed-of",
      "canonicalPath": "cases.patientiveEmbedCapability.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlDeverbalPatientiveValidationFrame",
  "executionValidatorName": "isClassicalNahuatlDeverbalPatientiveValidationFrame",
  "executionArgsBySelection": {
    "claim-p3823": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3823": "authorized"
  }
};
export default Object.freeze(spec);
