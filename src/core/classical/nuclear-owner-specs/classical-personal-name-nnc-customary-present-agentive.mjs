const spec = {
  "ownerId": "classical-personal-name-nnc-customary-present-agentive",
  "prefix": "ClassicalPersonalNameNncCustomaryPresentAgentive",
  "operationId": "classical.personal.name.nnc.customary.present.agentive.execute",
  "inputContract": "complete-typed-classical-personal-name-nnc-customary-present-agentive-source",
  "domain": "classical-personal-name-nnc-customary-present-agentive",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-personal-name-nnc-runtime",
  "selections": [
    "claim-p5188",
    "claim-p5189"
  ],
  "coordinates": {
    "claim-p5188::p5188-a-customary-present-agentive-nnc-serves-as-the-stem": {
      "assertionId": "classical-personal-name-nnc-customary-present-agentive:p5188-a-customary-present-agentive-nnc-serves-as-the-stem",
      "canonicalPath": "result.canonicalResult"
    },
    "claim-p5189::p5189-the-embed-of-the-inner-stem-is-tla-hye": {
      "assertionId": "classical-personal-name-nnc-customary-present-agentive:p5189-the-embed-of-the-inner-stem-is-tla-hye",
      "canonicalPath": "result.innerSubjectBarrier"
    }
  },
  "executionFunctionName": "buildClassicalPersonalNameNncValidationFrame",
  "executionValidatorName": "isClassicalPersonalNameNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5188": [
      "customary-present-agentive",
      "customary-present-agentive",
      "customary",
      ""
    ],
    "claim-p5189": [
      "customary-present-agentive",
      "customary-present-agentive",
      "customary",
      ""
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5188": "authorized",
    "claim-p5189": "authorized"
  }
};
export default Object.freeze(spec);
