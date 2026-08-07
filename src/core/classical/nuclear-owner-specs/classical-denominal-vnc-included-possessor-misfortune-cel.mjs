const spec = {
  "ownerId": "classical-denominal-vnc-included-possessor-misfortune-cel",
  "prefix": "ClassicalDenominalVncIncludedPossessorMisfortuneCel",
  "operationId": "classical.denominal.vnc.included.possessor.misfortune.cel.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-included-possessor-misfortune-cel-source",
  "domain": "classical-denominal-vnc-included-possessor-misfortune-cel",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5049",
    "claim-p5050"
  ],
  "coordinates": {
    "claim-p5049::p5049-to-emphasize-the-misfortune-the-nounstem-ce-l-see": {
      "assertionId": "classical-denominal-vnc-included-possessor-misfortune-cel:p5049-to-emphasize-the-misfortune-the-nounstem-ce-l-see",
      "canonicalPath": "result.operationId"
    },
    "claim-p5050::p5050-since-the-possessor-pronoun-is-part-of-the-verbstem": {
      "assertionId": "classical-denominal-vnc-included-possessor-misfortune-cel:p5050-since-the-possessor-pronoun-is-part-of-the-verbstem",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5049": [
      "included-possessor-misfortune-cel",
      "included-possessor-ti",
      "misfortune"
    ],
    "claim-p5050": [
      "included-possessor-misfortune-cel",
      "included-possessor-ti",
      "misfortune"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5049": "authorized",
    "claim-p5050": "authorized"
  }
};
export default Object.freeze(spec);
