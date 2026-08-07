const spec = {
  "ownerId": "classical-denominal-vnc-included-possessor-paradigm",
  "prefix": "ClassicalDenominalVncIncludedPossessorParadigm",
  "operationId": "classical.denominal.vnc.included.possessor.paradigm.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-included-possessor-paradigm-source",
  "domain": "classical-denominal-vnc-included-possessor-paradigm",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5029"
  ],
  "coordinates": {
    "claim-p5029::p5029-as-a-consequence-a-given-nounstem-can-serve-as": {
      "assertionId": "classical-denominal-vnc-included-possessor-paradigm:p5029-as-a-consequence-a-given-nounstem-can-serve-as",
      "canonicalPath": "result.operationId"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5029": [
      "included-possessor-paradigm",
      "included-possessor-ti",
      "proxy"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5029": "authorized"
  }
};
export default Object.freeze(spec);
