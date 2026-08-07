const spec = {
  "ownerId": "classical-denominal-vnc-included-possessor-recompense",
  "prefix": "ClassicalDenominalVncIncludedPossessorRecompense",
  "operationId": "classical.denominal.vnc.included.possessor.recompense.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-included-possessor-recompense-source",
  "domain": "classical-denominal-vnc-included-possessor-recompense",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5038",
    "claim-p5039"
  ],
  "coordinates": {
    "claim-p5038::p5038-in-the-second-type-the-source-nounstem-expresses-the": {
      "assertionId": "classical-denominal-vnc-included-possessor-recompense:p5038-in-the-second-type-the-source-nounstem-expresses-the",
      "canonicalPath": "result.operationId"
    },
    "claim-p5039::p5039-the-english-translation-of-a-possessive-state-nnc-formed": {
      "assertionId": "classical-denominal-vnc-included-possessor-recompense:p5039-the-english-translation-of-a-possessive-state-nnc-formed",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5038": [
      "included-possessor-recompense",
      "included-possessor-ti",
      "recompense"
    ],
    "claim-p5039": [
      "included-possessor-recompense",
      "included-possessor-ti",
      "recompense"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5038": "authorized",
    "claim-p5039": "authorized"
  }
};
export default Object.freeze(spec);
