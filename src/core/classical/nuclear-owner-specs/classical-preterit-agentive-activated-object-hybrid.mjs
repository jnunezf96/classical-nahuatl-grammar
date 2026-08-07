const spec = {
  "ownerId": "classical-preterit-agentive-activated-object-hybrid",
  "prefix": "ClassicalPreteritAgentiveActivatedObjectHybrid",
  "operationId": "classical.preterit.agentive.activated.object.hybrid.execute",
  "inputContract": "complete-typed-classical-preterit-agentive-activated-object-hybrid-source",
  "domain": "classical-preterit-agentive-activated-object-hybrid",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-deverbal-nnc-runtime",
  "selections": [
    "claim-p3399",
    "claim-p3400"
  ],
  "coordinates": {
    "claim-p3399::p3399-note-it-is-possible-for-a-nonspecific-projective-object": {
      "assertionId": "classical-preterit-agentive-activated-object-hybrid:p3399-note-it-is-possible-for-a-nonspecific-projective-object",
      "canonicalPath": "cases.preteritActivated.authorizationStatus"
    },
    "claim-p3400::p3400-the-result-is-a-verbal-plus-nominal-nnc-hybrid": {
      "assertionId": "classical-preterit-agentive-activated-object-hybrid:p3400-the-result-is-a-verbal-plus-nominal-nnc-hybrid",
      "canonicalPath": "cases.preteritActivated.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlDeverbalNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlDeverbalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3399": [],
    "claim-p3400": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3399": "authorized",
    "claim-p3400": "authorized"
  }
};
export default Object.freeze(spec);
