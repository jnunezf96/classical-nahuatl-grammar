const spec = {
  "ownerId": "classical-attitude-honorific-causative-evidence-analysis",
  "prefix": "ClassicalAttitudeHonorificCausativeEvidenceAnalysis",
  "operationId": "classical.attitude.honorific.causative.evidence.analysis.execute",
  "inputContract": "complete-typed-classical-attitude-honorific-causative-evidence-analysis-source",
  "domain": "classical-attitude-honorific-causative-evidence-analysis",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-attitude-vnc-runtime",
  "selections": [
    "claim-p3214"
  ],
  "coordinates": {
    "claim-p3214::p3214-i-e-are-you-h-leaving-also-tonme-hualtia": {
      "assertionId": "classical-attitude-honorific-causative-evidence-analysis:p3214-i-e-are-you-h-leaving-also-tonme-hualtia",
      "canonicalPath": "cases.honorificCausative.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAttitudeVncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAttitudeVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3214": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3214": "authorized"
  }
};
export default Object.freeze(spec);
