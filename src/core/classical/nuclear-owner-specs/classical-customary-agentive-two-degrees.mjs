const spec = {
  "ownerId": "classical-customary-agentive-two-degrees",
  "prefix": "ClassicalCustomaryAgentiveTwoDegrees",
  "operationId": "classical.customary.agentive.two.degrees.execute",
  "inputContract": "complete-typed-classical-customary-agentive-two-degrees-source",
  "domain": "classical-customary-agentive-two-degrees",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-deverbal-nnc-runtime",
  "selections": [
    "claim-p3502",
    "claim-p3503",
    "claim-p3504"
  ],
  "coordinates": {
    "claim-p3502::p3502-the-second-most-frequent-type-of-agentive-nnc-results": {
      "assertionId": "classical-customary-agentive-two-degrees:p3502-the-second-most-frequent-type-of-agentive-nnc-results",
      "canonicalPath": "cases.customaryTwoDegrees.authorizationStatus"
    },
    "claim-p3503::p3503-the-predicate-of-the-vnc-becomes-a-nounstem": {
      "assertionId": "classical-customary-agentive-two-degrees:p3503-the-predicate-of-the-vnc-becomes-a-nounstem",
      "canonicalPath": "cases.customaryTwoDegrees.first.canonicalResult"
    },
    "claim-p3504::p3504-a-customary-present-vnc-permits-two-degrees-of-nominalization": {
      "assertionId": "classical-customary-agentive-two-degrees:p3504-a-customary-present-vnc-permits-two-degrees-of-nominalization",
      "canonicalPath": "cases.customaryTwoDegrees.second.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlDeverbalNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlDeverbalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3502": [],
    "claim-p3503": [],
    "claim-p3504": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3502": "authorized",
    "claim-p3503": "authorized",
    "claim-p3504": "authorized"
  }
};
export default Object.freeze(spec);
