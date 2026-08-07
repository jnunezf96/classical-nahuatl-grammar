const spec = {
  "ownerId": "classical-personal-name-nnc-fixed-outer-number",
  "prefix": "ClassicalPersonalNameNncFixedOuterNumber",
  "operationId": "classical.personal.name.nnc.fixed.outer.number.execute",
  "inputContract": "complete-typed-classical-personal-name-nnc-fixed-outer-number-source",
  "domain": "classical-personal-name-nnc-fixed-outer-number",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-personal-name-nnc-runtime",
  "selections": [
    "claim-p5163",
    "claim-p5164"
  ],
  "coordinates": {
    "claim-p5163::p5163-the-number-position-of-the-outer-subject-pronoun-always": {
      "assertionId": "classical-personal-name-nnc-fixed-outer-number:p5163-the-number-position-of-the-outer-subject-pronoun-always",
      "canonicalPath": "result.canonicalResult"
    },
    "claim-p5164::p5164-if-a-number-dyad-with-tl": {
      "assertionId": "classical-personal-name-nnc-fixed-outer-number:p5164-if-a-number-dyad-with-tl",
      "canonicalPath": "result.innerSubjectBarrier"
    }
  },
  "executionFunctionName": "buildClassicalPersonalNameNncValidationFrame",
  "executionValidatorName": "isClassicalPersonalNameNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5163": [
      "fixed-outer-number",
      "preterit-agentive",
      "default",
      ""
    ],
    "claim-p5164": [
      "fixed-outer-number",
      "preterit-agentive",
      "default",
      ""
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5163": "authorized",
    "claim-p5164": "authorized"
  }
};
export default Object.freeze(spec);
