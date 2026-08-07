const spec = {
  "ownerId": "classical-continuation-patientive-nominal-embed",
  "prefix": "ClassicalContinuationPatientiveNominalEmbed",
  "operationId": "classical.continuation.patientive.nominal.embed.execute",
  "inputContract": "complete-typed-classical-continuation-patientive-nominal-embed-source",
  "domain": "classical-continuation-patientive-nominal-embed",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-deverbal-patientive-runtime",
  "selections": [
    "claim-p3824"
  ],
  "coordinates": {
    "claim-p3824::p3824-yohua-l-ah-huach-tli-yohua-l-ah-huech": {
      "assertionId": "classical-continuation-patientive-nominal-embed:p3824-yohua-l-ah-huach-tli-yohua-l-ah-huech",
      "canonicalPath": "cases.patientiveNominalEmbed.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlDeverbalPatientiveValidationFrame",
  "executionValidatorName": "isClassicalNahuatlDeverbalPatientiveValidationFrame",
  "executionArgsBySelection": {
    "claim-p3824": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3824": "authorized"
  }
};
export default Object.freeze(spec);
