const spec = {
  "ownerId": "classical-personal-name-nnc-purposive-past-agentive",
  "prefix": "ClassicalPersonalNameNncPurposivePastAgentive",
  "operationId": "classical.personal.name.nnc.purposive.past.agentive.execute",
  "inputContract": "complete-typed-classical-personal-name-nnc-purposive-past-agentive-source",
  "domain": "classical-personal-name-nnc-purposive-past-agentive",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-personal-name-nnc-runtime",
  "selections": [
    "claim-p5190"
  ],
  "coordinates": {
    "claim-p5190::p5190-a-purposive-vnc-can-serve-as-the-stem-of": {
      "assertionId": "classical-personal-name-nnc-purposive-past-agentive:p5190-a-purposive-vnc-can-serve-as-the-stem-of",
      "canonicalPath": "result.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalPersonalNameNncValidationFrame",
  "executionValidatorName": "isClassicalPersonalNameNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5190": [
      "purposive-past-agentive",
      "purposive-past-agentive",
      "default",
      ""
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5190": "authorized"
  }
};
export default Object.freeze(spec);
