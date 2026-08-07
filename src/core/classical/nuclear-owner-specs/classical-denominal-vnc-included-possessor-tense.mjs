const spec = {
  "ownerId": "classical-denominal-vnc-included-possessor-tense",
  "prefix": "ClassicalDenominalVncIncludedPossessorTense",
  "operationId": "classical.denominal.vnc.included.possessor.tense.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-included-possessor-tense-source",
  "domain": "classical-denominal-vnc-included-possessor-tense",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5041"
  ],
  "coordinates": {
    "claim-p5041::p5041-the-only-expected-tenses-are-the-present-the-preterit": {
      "assertionId": "classical-denominal-vnc-included-possessor-tense:p5041-the-only-expected-tenses-are-the-present-the-preterit",
      "canonicalPath": "result.operationId"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5041": [
      "included-possessor-tense",
      "included-possessor-ti",
      "recompense"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5041": "authorized"
  }
};
export default Object.freeze(spec);
