const spec = {
  "ownerId": "classical-personal-name-nnc-preterit-agentive-source",
  "prefix": "ClassicalPersonalNameNncPreteritAgentiveSource",
  "operationId": "classical.personal.name.nnc.preterit.agentive.source.execute",
  "inputContract": "complete-typed-classical-personal-name-nnc-preterit-agentive-source-source",
  "domain": "classical-personal-name-nnc-preterit-agentive-source",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-personal-name-nnc-runtime",
  "selections": [
    "claim-p5171",
    "claim-p5172"
  ],
  "coordinates": {
    "claim-p5171::p5171-a-preterit-agentive-nnc-serves-as-the-stem": {
      "assertionId": "classical-personal-name-nnc-preterit-agentive-source:p5171-a-preterit-agentive-nnc-serves-as-the-stem",
      "canonicalPath": "result.canonicalResult"
    },
    "claim-p5172::p5172-the-entire-downgraded-preterit-agentive-nnc-becomes-the-embed": {
      "assertionId": "classical-personal-name-nnc-preterit-agentive-source:p5172-the-entire-downgraded-preterit-agentive-nnc-becomes-the-embed",
      "canonicalPath": "result.innerSubjectBarrier"
    }
  },
  "executionFunctionName": "buildClassicalPersonalNameNncValidationFrame",
  "executionValidatorName": "isClassicalPersonalNameNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5171": [
      "preterit-agentive-source",
      "preterit-agentive",
      "default",
      ""
    ],
    "claim-p5172": [
      "preterit-agentive-source",
      "preterit-agentive",
      "default",
      ""
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5171": "authorized",
    "claim-p5172": "authorized"
  }
};
export default Object.freeze(spec);
