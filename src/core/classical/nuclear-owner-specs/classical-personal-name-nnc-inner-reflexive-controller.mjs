const spec = {
  "ownerId": "classical-personal-name-nnc-inner-reflexive-controller",
  "prefix": "ClassicalPersonalNameNncInnerReflexiveController",
  "operationId": "classical.personal.name.nnc.inner.reflexive.controller.execute",
  "inputContract": "complete-typed-classical-personal-name-nnc-inner-reflexive-controller-source",
  "domain": "classical-personal-name-nnc-inner-reflexive-controller",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-personal-name-nnc-runtime",
  "selections": [
    "claim-p5191",
    "claim-p5192",
    "claim-p5193"
  ],
  "coordinates": {
    "claim-p5191::p5191-if-the-nnc-serving-as-the-stem-of-a": {
      "assertionId": "classical-personal-name-nnc-inner-reflexive-controller:p5191-if-the-nnc-serving-as-the-stem-of-a",
      "canonicalPath": "result.canonicalResult"
    },
    "claim-p5192::p5192-if-the-nnc-serving-as-the-stem-of-a": {
      "assertionId": "classical-personal-name-nnc-inner-reflexive-controller:p5192-if-the-nnc-serving-as-the-stem-of-a",
      "canonicalPath": "result.innerSubjectBarrier"
    },
    "claim-p5193::p5193-its-continued-use-is-a-measure-of-ignorance-uhc": {
      "assertionId": "classical-personal-name-nnc-inner-reflexive-controller:p5193-its-continued-use-is-a-measure-of-ignorance-uhc",
      "canonicalPath": "result.sourceFamily"
    }
  },
  "executionFunctionName": "buildClassicalPersonalNameNncValidationFrame",
  "executionValidatorName": "isClassicalPersonalNameNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5191": [
      "inner-reflexive-controller",
      "reflexive-preterit-agentive",
      "default",
      ""
    ],
    "claim-p5192": [
      "inner-reflexive-controller",
      "reflexive-preterit-agentive",
      "default",
      ""
    ],
    "claim-p5193": [
      "inner-reflexive-controller",
      "reflexive-preterit-agentive",
      "default",
      ""
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5191": "authorized",
    "claim-p5192": "authorized",
    "claim-p5193": "authorized"
  }
};
export default Object.freeze(spec);
