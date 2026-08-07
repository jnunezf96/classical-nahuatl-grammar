const spec = {
  "ownerId": "classical-customary-agentive-final-i-loss",
  "prefix": "ClassicalCustomaryAgentiveFinalILoss",
  "operationId": "classical.customary.agentive.final.i.loss.execute",
  "inputContract": "complete-typed-classical-customary-agentive-final-i-loss-source",
  "domain": "classical-customary-agentive-final-i-loss",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-deverbal-nnc-runtime",
  "selections": [
    "claim-p3521",
    "claim-p3522"
  ],
  "coordinates": {
    "claim-p3521::p3521-note-1-since-the-i-of-the-customary-present": {
      "assertionId": "classical-customary-agentive-final-i-loss:p3521-note-1-since-the-i-of-the-customary-present",
      "canonicalPath": "cases.customaryFinalILoss.authorizationStatus"
    },
    "claim-p3522::p3522-it-is-possible-however-for-the-irregular-loss-to": {
      "assertionId": "classical-customary-agentive-final-i-loss:p3522-it-is-possible-however-for-the-irregular-loss-to",
      "canonicalPath": "cases.customaryFinalILoss.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlDeverbalNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlDeverbalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3521": [],
    "claim-p3522": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3521": "authorized",
    "claim-p3522": "authorized"
  }
};
export default Object.freeze(spec);
