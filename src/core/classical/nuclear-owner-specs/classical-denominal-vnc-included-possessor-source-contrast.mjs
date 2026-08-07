const spec = {
  "ownerId": "classical-denominal-vnc-included-possessor-source-contrast",
  "prefix": "ClassicalDenominalVncIncludedPossessorSourceContrast",
  "operationId": "classical.denominal.vnc.included.possessor.source.contrast.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-included-possessor-source-contrast-source",
  "domain": "classical-denominal-vnc-included-possessor-source-contrast",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5026",
    "claim-p5027"
  ],
  "coordinates": {
    "claim-p5026::p5026-there-is-still-another-derivational-process-involving-the-inceptive": {
      "assertionId": "classical-denominal-vnc-included-possessor-source-contrast:p5026-there-is-still-another-derivational-process-involving-the-inceptive",
      "canonicalPath": "result.sourceState"
    },
    "claim-p5027::p5027-all-of-the-intransitive-ti-verbstems-of-54-2": {
      "assertionId": "classical-denominal-vnc-included-possessor-source-contrast:p5027-all-of-the-intransitive-ti-verbstems-of-54-2",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5026": [
      "included-possessor-source-contrast",
      "included-possessor-ti",
      "proxy"
    ],
    "claim-p5027": [
      "included-possessor-source-contrast",
      "included-possessor-ti",
      "proxy"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5026": "authorized",
    "claim-p5027": "authorized"
  }
};
export default Object.freeze(spec);
