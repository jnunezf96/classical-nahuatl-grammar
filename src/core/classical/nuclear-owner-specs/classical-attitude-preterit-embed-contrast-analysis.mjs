const spec = {
  "ownerId": "classical-attitude-preterit-embed-contrast-analysis",
  "prefix": "ClassicalAttitudePreteritEmbedContrastAnalysis",
  "operationId": "classical.attitude.preterit.embed.contrast.analysis.execute",
  "inputContract": "complete-typed-classical-attitude-preterit-embed-contrast-analysis-source",
  "domain": "classical-attitude-preterit-embed-contrast-analysis",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-attitude-vnc-runtime",
  "selections": [
    "claim-p3239"
  ],
  "coordinates": {
    "claim-p3239::p3239-note-study-the-difference-between-the-following-honorific-formations": {
      "assertionId": "classical-attitude-preterit-embed-contrast-analysis:p3239-note-study-the-difference-between-the-following-honorific-formations",
      "canonicalPath": "cases.honorificPreteritEmbed.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAttitudeVncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAttitudeVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3239": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3239": "authorized"
  }
};
export default Object.freeze(spec);
