const spec = {
  "ownerId": "classical-denominal-vnc-included-possessor-pronoun",
  "prefix": "ClassicalDenominalVncIncludedPossessorPronoun",
  "operationId": "classical.denominal.vnc.included.possessor.pronoun.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-included-possessor-pronoun-source",
  "domain": "classical-denominal-vnc-included-possessor-pronoun",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5028"
  ],
  "coordinates": {
    "claim-p5028::p5028-this-means-that-a-possessor-pronoun-n-o-m": {
      "assertionId": "classical-denominal-vnc-included-possessor-pronoun:p5028-this-means-that-a-possessor-pronoun-n-o-m",
      "canonicalPath": "result.operationId"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5028": [
      "included-possessor-pronoun",
      "included-possessor-ti",
      "proxy"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5028": "authorized"
  }
};
export default Object.freeze(spec);
