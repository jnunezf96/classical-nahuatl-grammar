const spec = {
  "ownerId": "classical-personal-name-nnc-possessive-state-source",
  "prefix": "ClassicalPersonalNameNncPossessiveStateSource",
  "operationId": "classical.personal.name.nnc.possessive.state.source.execute",
  "inputContract": "complete-typed-classical-personal-name-nnc-possessive-state-source-source",
  "domain": "classical-personal-name-nnc-possessive-state-source",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-personal-name-nnc-runtime",
  "selections": [
    "claim-p5211",
    "claim-p5212",
    "claim-p5213"
  ],
  "coordinates": {
    "claim-p5211::p5211-the-stem-of-the-personal-name-nnc-is-a": {
      "assertionId": "classical-personal-name-nnc-possessive-state-source:p5211-the-stem-of-the-personal-name-nnc-is-a",
      "canonicalPath": "result.canonicalResult"
    },
    "claim-p5212::p5212-nnc-tote-c-is-a-title-of-address-that": {
      "assertionId": "classical-personal-name-nnc-possessive-state-source:p5212-nnc-tote-c-is-a-title-of-address-that",
      "canonicalPath": "result.innerSubjectBarrier"
    },
    "claim-p5213::p5213-the-personal-name-nnc-is-another-name-for-xipe": {
      "assertionId": "classical-personal-name-nnc-possessive-state-source:p5213-the-personal-name-nnc-is-another-name-for-xipe",
      "canonicalPath": "result.sourceFamily"
    }
  },
  "executionFunctionName": "buildClassicalPersonalNameNncValidationFrame",
  "executionValidatorName": "isClassicalPersonalNameNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5211": [
      "possessive-state-source",
      "possessive-state-nnc",
      "default",
      ""
    ],
    "claim-p5212": [
      "possessive-state-source",
      "possessive-state-nnc",
      "default",
      ""
    ],
    "claim-p5213": [
      "possessive-state-source",
      "possessive-state-nnc",
      "default",
      ""
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5211": "authorized",
    "claim-p5212": "authorized",
    "claim-p5213": "authorized"
  }
};
export default Object.freeze(spec);
