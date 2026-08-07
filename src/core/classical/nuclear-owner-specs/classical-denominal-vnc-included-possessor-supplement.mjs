const spec = {
  "ownerId": "classical-denominal-vnc-included-possessor-supplement",
  "prefix": "ClassicalDenominalVncIncludedPossessorSupplement",
  "operationId": "classical.denominal.vnc.included.possessor.supplement.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-included-possessor-supplement-source",
  "domain": "classical-denominal-vnc-included-possessor-supplement",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5030",
    "claim-p5031"
  ],
  "coordinates": {
    "claim-p5030::p5030-if-this-inclusion-of-a-possessor-pronoun-inside-a": {
      "assertionId": "classical-denominal-vnc-included-possessor-supplement:p5030-if-this-inclusion-of-a-possessor-pronoun-inside-a",
      "canonicalPath": "result.operationId"
    },
    "claim-p5031::p5031-if-this-inclusion-of-a-possessor-pronoun-inside-a": {
      "assertionId": "classical-denominal-vnc-included-possessor-supplement:p5031-if-this-inclusion-of-a-possessor-pronoun-inside-a",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5030": [
      "included-possessor-supplement",
      "included-possessor-ti",
      "proxy"
    ],
    "claim-p5031": [
      "included-possessor-supplement",
      "included-possessor-ti",
      "proxy"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5030": "authorized",
    "claim-p5031": "authorized"
  }
};
export default Object.freeze(spec);
