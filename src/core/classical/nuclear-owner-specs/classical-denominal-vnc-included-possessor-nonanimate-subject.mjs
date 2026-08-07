const spec = {
  "ownerId": "classical-denominal-vnc-included-possessor-nonanimate-subject",
  "prefix": "ClassicalDenominalVncIncludedPossessorNonanimateSubject",
  "operationId": "classical.denominal.vnc.included.possessor.nonanimate.subject.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-included-possessor-nonanimate-subject-source",
  "domain": "classical-denominal-vnc-included-possessor-nonanimate-subject",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5040"
  ],
  "coordinates": {
    "claim-p5040::p5040-the-derived-verbstems-normally-participate-in-a-vnc-that": {
      "assertionId": "classical-denominal-vnc-included-possessor-nonanimate-subject:p5040-the-derived-verbstems-normally-participate-in-a-vnc-that",
      "canonicalPath": "result.operationId"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5040": [
      "included-possessor-nonanimate-subject",
      "included-possessor-ti",
      "recompense"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5040": "authorized"
  }
};
export default Object.freeze(spec);
