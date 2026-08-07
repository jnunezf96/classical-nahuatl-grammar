const spec = {
  "ownerId": "classical-personal-name-nnc-normal-honorific-preterit-agentive",
  "prefix": "ClassicalPersonalNameNncNormalHonorificPreteritAgentive",
  "operationId": "classical.personal.name.nnc.normal.honorific.preterit.agentive.execute",
  "inputContract": "complete-typed-classical-personal-name-nnc-normal-honorific-preterit-agentive-source",
  "domain": "classical-personal-name-nnc-normal-honorific-preterit-agentive",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-personal-name-nnc-runtime",
  "selections": [
    "claim-p5178"
  ],
  "coordinates": {
    "claim-p5178::p5178-while-the-last-two-examples-above-and-the-earlier": {
      "assertionId": "classical-personal-name-nnc-normal-honorific-preterit-agentive:p5178-while-the-last-two-examples-above-and-the-earlier",
      "canonicalPath": "result.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalPersonalNameNncValidationFrame",
  "executionValidatorName": "isClassicalPersonalNameNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5178": [
      "normal-honorific-preterit-agentive",
      "preterit-agentive",
      "outer-affective",
      ""
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5178": "authorized"
  }
};
export default Object.freeze(spec);
