const spec = {
  "ownerId": "classical-denominal-vnc-preterit-agentive-function",
  "prefix": "ClassicalDenominalVncPreteritAgentiveFunction",
  "operationId": "classical.denominal.vnc.preterit.agentive.function.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-preterit-agentive-function-source",
  "domain": "classical-denominal-vnc-preterit-agentive-function",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p4958"
  ],
  "coordinates": {
    "claim-p4958::p4958-one-of-the-most-common-uses-of-these-verbstems": {
      "assertionId": "classical-denominal-vnc-preterit-agentive-function:p4958-one-of-the-most-common-uses-of-these-verbstems",
      "canonicalPath": "result.operationId"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4958": [
      "preterit-agentive-function",
      "inceptive-root-ya",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4958": "authorized"
  }
};
export default Object.freeze(spec);
