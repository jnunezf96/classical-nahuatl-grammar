const spec = {
  "ownerId": "classical-attitude-honorific-causative-interpretation-analysis",
  "prefix": "ClassicalAttitudeHonorificCausativeInterpretationAnalysis",
  "operationId": "classical.attitude.honorific.causative.interpretation.analysis.execute",
  "inputContract": "complete-typed-classical-attitude-honorific-causative-interpretation-analysis-source",
  "domain": "classical-attitude-honorific-causative-interpretation-analysis",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-attitude-vnc-runtime",
  "selections": [
    "claim-p3210"
  ],
  "coordinates": {
    "claim-p3210::p3210-the-honored-entity-is-presented-as-causing-itself-to": {
      "assertionId": "classical-attitude-honorific-causative-interpretation-analysis:p3210-the-honored-entity-is-presented-as-causing-itself-to",
      "canonicalPath": "cases.honorificCausative.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAttitudeVncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAttitudeVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3210": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3210": "authorized"
  }
};
export default Object.freeze(spec);
