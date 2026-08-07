const spec = {
  "ownerId": "classical-denominal-vnc-included-possessor-recompense-exclamation",
  "prefix": "ClassicalDenominalVncIncludedPossessorRecompenseExclamation",
  "operationId": "classical.denominal.vnc.included.possessor.recompense.exclamation.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-included-possessor-recompense-exclamation-source",
  "domain": "classical-denominal-vnc-included-possessor-recompense-exclamation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5042",
    "claim-p5043",
    "claim-p5044"
  ],
  "coordinates": {
    "claim-p5042::p5042-the-preterit-tense-vnc-built-on-these-verbstems-is": {
      "assertionId": "classical-denominal-vnc-included-possessor-recompense-exclamation:p5042-the-preterit-tense-vnc-built-on-these-verbstems-is",
      "canonicalPath": "result.operationId"
    },
    "claim-p5043::p5043-the-preterit-tense-vnc-built-on-these-verbstems-is": {
      "assertionId": "classical-denominal-vnc-included-possessor-recompense-exclamation:p5043-the-preterit-tense-vnc-built-on-these-verbstems-is",
      "canonicalPath": "analysis.semanticBoundary"
    },
    "claim-p5044::p5044-the-preterit-tense-vnc-built-on-these-verbstems-is": {
      "assertionId": "classical-denominal-vnc-included-possessor-recompense-exclamation:p5044-the-preterit-tense-vnc-built-on-these-verbstems-is",
      "canonicalPath": "result.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5042": [
      "included-possessor-recompense-exclamation",
      "included-possessor-ti",
      "recompense"
    ],
    "claim-p5043": [
      "included-possessor-recompense-exclamation",
      "included-possessor-ti",
      "recompense"
    ],
    "claim-p5044": [
      "included-possessor-recompense-exclamation",
      "included-possessor-ti",
      "recompense"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5042": "authorized",
    "claim-p5043": "authorized",
    "claim-p5044": "authorized"
  }
};
export default Object.freeze(spec);
