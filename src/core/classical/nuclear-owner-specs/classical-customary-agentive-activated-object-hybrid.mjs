const spec = {
  "ownerId": "classical-customary-agentive-activated-object-hybrid",
  "prefix": "ClassicalCustomaryAgentiveActivatedObjectHybrid",
  "operationId": "classical.customary.agentive.activated.object.hybrid.execute",
  "inputContract": "complete-typed-classical-customary-agentive-activated-object-hybrid-source",
  "domain": "classical-customary-agentive-activated-object-hybrid",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-deverbal-nnc-runtime",
  "selections": [
    "claim-p3523",
    "claim-p3524"
  ],
  "coordinates": {
    "claim-p3523::p3523-note-2-like-preterit-agentive-nncs-customary-present-agentive": {
      "assertionId": "classical-customary-agentive-activated-object-hybrid:p3523-note-2-like-preterit-agentive-nncs-customary-present-agentive",
      "canonicalPath": "cases.customaryActivated.authorizationStatus"
    },
    "claim-p3524::p3524-if-the-source-of-the-verbal-and-nominal-nnc": {
      "assertionId": "classical-customary-agentive-activated-object-hybrid:p3524-if-the-source-of-the-verbal-and-nominal-nnc",
      "canonicalPath": "cases.customaryActivated.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlDeverbalNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlDeverbalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3523": [],
    "claim-p3524": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3523": "authorized",
    "claim-p3524": "authorized"
  }
};
export default Object.freeze(spec);
