const spec = {
  "ownerId": "classical-continuation-preterit-agentive-embed",
  "prefix": "ClassicalContinuationPreteritAgentiveEmbed",
  "operationId": "classical.continuation.preterit.agentive.embed.execute",
  "inputContract": "complete-typed-classical-continuation-preterit-agentive-embed-source",
  "domain": "classical-continuation-preterit-agentive-embed",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-deverbal-nnc-runtime",
  "selections": [
    "claim-p3415"
  ],
  "coordinates": {
    "claim-p3415::p3415-the-general-use-preterit-agentive-nounstem-is-used-as": {
      "assertionId": "classical-continuation-preterit-agentive-embed:p3415-the-general-use-preterit-agentive-nounstem-is-used-as",
      "canonicalPath": "cases.preteritEmbed.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlDeverbalNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlDeverbalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3415": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3415": "authorized"
  }
};
export default Object.freeze(spec);
