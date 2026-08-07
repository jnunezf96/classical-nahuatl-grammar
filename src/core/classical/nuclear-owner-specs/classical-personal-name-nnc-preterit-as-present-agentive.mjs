const spec = {
  "ownerId": "classical-personal-name-nnc-preterit-as-present-agentive",
  "prefix": "ClassicalPersonalNameNncPreteritAsPresentAgentive",
  "operationId": "classical.personal.name.nnc.preterit.as.present.agentive.execute",
  "inputContract": "complete-typed-classical-personal-name-nnc-preterit-as-present-agentive-source",
  "domain": "classical-personal-name-nnc-preterit-as-present-agentive",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-personal-name-nnc-runtime",
  "selections": [
    "claim-p5179",
    "claim-p5180",
    "claim-p5181",
    "claim-p5182"
  ],
  "coordinates": {
    "claim-p5179::p5179-the-personal-name-stem-is-a-preterit-agentive-nnc": {
      "assertionId": "classical-personal-name-nnc-preterit-as-present-agentive:p5179-the-personal-name-stem-is-a-preterit-agentive-nnc",
      "canonicalPath": "result.canonicalResult"
    },
    "claim-p5180::p5180-since-the-preterit-as-present-agentive-nnc-has-the": {
      "assertionId": "classical-personal-name-nnc-preterit-as-present-agentive:p5180-since-the-preterit-as-present-agentive-nnc-has-the",
      "canonicalPath": "result.innerSubjectBarrier"
    },
    "claim-p5181::p5181-nnc-formed-from-the-preterit-as-present-vnc-milintoc": {
      "assertionId": "classical-personal-name-nnc-preterit-as-present-agentive:p5181-nnc-formed-from-the-preterit-as-present-vnc-milintoc",
      "canonicalPath": "result.sourceFamily"
    },
    "claim-p5182::p5182-the-honorific-preterit-agentive-nounstem-formed-on-ca-tl": {
      "assertionId": "classical-personal-name-nnc-preterit-as-present-agentive:p5182-the-honorific-preterit-agentive-nounstem-formed-on-ca-tl",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalPersonalNameNncValidationFrame",
  "executionValidatorName": "isClassicalPersonalNameNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5179": [
      "preterit-as-present-agentive",
      "preterit-as-present-agentive",
      "nonanimate",
      ""
    ],
    "claim-p5180": [
      "preterit-as-present-agentive",
      "preterit-as-present-agentive",
      "nonanimate",
      ""
    ],
    "claim-p5181": [
      "preterit-as-present-agentive",
      "preterit-as-present-agentive",
      "nonanimate",
      ""
    ],
    "claim-p5182": [
      "preterit-as-present-agentive",
      "preterit-as-present-agentive",
      "nonanimate",
      ""
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5179": "authorized",
    "claim-p5180": "authorized",
    "claim-p5181": "authorized",
    "claim-p5182": "authorized"
  }
};
export default Object.freeze(spec);
