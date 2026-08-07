const spec = {
  "ownerId": "classical-personal-name-nnc-general-use-honorific-alternative",
  "prefix": "ClassicalPersonalNameNncGeneralUseHonorificAlternative",
  "operationId": "classical.personal.name.nnc.general.use.honorific.alternative.execute",
  "inputContract": "complete-typed-classical-personal-name-nnc-general-use-honorific-alternative-source",
  "domain": "classical-personal-name-nnc-general-use-honorific-alternative",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-personal-name-nnc-runtime",
  "selections": [
    "claim-p5174",
    "claim-p5175"
  ],
  "coordinates": {
    "claim-p5174::p5174-as-pointed-out-in-35-7-2-an-honorific": {
      "assertionId": "classical-personal-name-nnc-general-use-honorific-alternative:p5174-as-pointed-out-in-35-7-2-an-honorific",
      "canonicalPath": "result.canonicalResult"
    },
    "claim-p5175::p5175-such-a-formation-is-possible-for-an-honorific-personal": {
      "assertionId": "classical-personal-name-nnc-general-use-honorific-alternative:p5175-such-a-formation-is-possible-for-an-honorific-personal",
      "canonicalPath": "result.innerSubjectBarrier"
    }
  },
  "executionFunctionName": "buildClassicalPersonalNameNncValidationFrame",
  "executionValidatorName": "isClassicalPersonalNameNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5174": [
      "general-use-honorific-alternative",
      "preterit-agentive",
      "general-use-affective",
      ""
    ],
    "claim-p5175": [
      "general-use-honorific-alternative",
      "preterit-agentive",
      "general-use-affective",
      ""
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5174": "authorized",
    "claim-p5175": "authorized"
  }
};
export default Object.freeze(spec);
