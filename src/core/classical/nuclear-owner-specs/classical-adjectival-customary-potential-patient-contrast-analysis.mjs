const spec = {
  "ownerId": "classical-adjectival-customary-potential-patient-contrast-analysis",
  "prefix": "ClassicalAdjectivalCustomaryPotentialPatientContrastAnalysis",
  "operationId": "classical.adjectival.customary.potential.patient.contrast.analysis.execute",
  "inputContract": "complete-typed-classical-adjectival-customary-potential-patient-contrast-analysis-source",
  "domain": "classical-adjectival-customary-potential-patient-contrast-analysis",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p3901",
    "claim-p3902"
  ],
  "coordinates": {
    "claim-p3901::p3901-the-predicate-of-a-customary-present-patientive-nnc-and": {
      "assertionId": "classical-adjectival-customary-potential-patient-contrast-analysis:p3901-the-predicate-of-a-customary-present-patientive-nnc-and",
      "canonicalPath": "sources.patientive.authorizationStatus"
    },
    "claim-p3902::p3902-at-times-there-may-be-a-difference-in-translation": {
      "assertionId": "classical-adjectival-customary-potential-patient-contrast-analysis:p3902-at-times-there-may-be-a-difference-in-translation",
      "canonicalPath": "sources.patientive.typedFrameAuthority"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p3901": [],
    "claim-p3902": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3901": "authorized",
    "claim-p3902": "authorized"
  }
};
export default Object.freeze(spec);
