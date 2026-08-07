const spec = {
  "ownerId": "classical-denominal-vnc-included-possessor-compound",
  "prefix": "ClassicalDenominalVncIncludedPossessorCompound",
  "operationId": "classical.denominal.vnc.included.possessor.compound.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-included-possessor-compound-source",
  "domain": "classical-denominal-vnc-included-possessor-compound",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5045"
  ],
  "coordinates": {
    "claim-p5045::p5045-the-predicate-of-a-vnc-built-on-one-of": {
      "assertionId": "classical-denominal-vnc-included-possessor-compound:p5045-the-predicate-of-a-vnc-built-on-one-of",
      "canonicalPath": "result.operationId"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5045": [
      "included-possessor-compound",
      "included-possessor-ti",
      "recompense"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5045": "authorized"
  }
};
export default Object.freeze(spec);
