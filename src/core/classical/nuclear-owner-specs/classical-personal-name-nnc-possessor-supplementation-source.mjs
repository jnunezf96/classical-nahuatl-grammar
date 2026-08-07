const spec = {
  "ownerId": "classical-personal-name-nnc-possessor-supplementation-source",
  "prefix": "ClassicalPersonalNameNncPossessorSupplementationSource",
  "operationId": "classical.personal.name.nnc.possessor.supplementation.source.execute",
  "inputContract": "complete-typed-classical-personal-name-nnc-possessor-supplementation-source-source",
  "domain": "classical-personal-name-nnc-possessor-supplementation-source",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-personal-name-nnc-runtime",
  "selections": [
    "claim-p5217",
    "claim-p5218"
  ],
  "coordinates": {
    "claim-p5217::p5217-a-structure-of-possessor-supplementation-serves-as-the-stem": {
      "assertionId": "classical-personal-name-nnc-possessor-supplementation-source:p5217-a-structure-of-possessor-supplementation-serves-as-the-stem",
      "canonicalPath": "result.canonicalResult"
    },
    "claim-p5218::p5218-an-example-of-such-an-identification-is-one-built": {
      "assertionId": "classical-personal-name-nnc-possessor-supplementation-source:p5218-an-example-of-such-an-identification-is-one-built",
      "canonicalPath": "result.innerSubjectBarrier"
    }
  },
  "executionFunctionName": "buildClassicalPersonalNameNncValidationFrame",
  "executionValidatorName": "isClassicalPersonalNameNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5217": [
      "possessor-supplementation-source",
      "possessor-supplementation",
      "default",
      ""
    ],
    "claim-p5218": [
      "possessor-supplementation-source",
      "possessor-supplementation",
      "default",
      ""
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5217": "authorized",
    "claim-p5218": "authorized"
  }
};
export default Object.freeze(spec);
