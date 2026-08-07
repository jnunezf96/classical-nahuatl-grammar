const spec = {
  "ownerId": "classical-denominal-vnc-included-possessor-target-reading",
  "prefix": "ClassicalDenominalVncIncludedPossessorTargetReading",
  "operationId": "classical.denominal.vnc.included.possessor.target.reading.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-included-possessor-target-reading-source",
  "domain": "classical-denominal-vnc-included-possessor-target-reading",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5053",
    "claim-p5054"
  ],
  "coordinates": {
    "claim-p5053::p5053-when-the-possessor-pronoun-is-third-person-common-number": {
      "assertionId": "classical-denominal-vnc-included-possessor-target-reading:p5053-when-the-possessor-pronoun-is-third-person-common-number",
      "canonicalPath": "result.operationId"
    },
    "claim-p5054::p5054-when-the-possessor-pronoun-is-third-person-common-number": {
      "assertionId": "classical-denominal-vnc-included-possessor-target-reading:p5054-when-the-possessor-pronoun-is-third-person-common-number",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5053": [
      "included-possessor-target-reading",
      "included-possessor-ti",
      "temporal"
    ],
    "claim-p5054": [
      "included-possessor-target-reading",
      "included-possessor-ti",
      "temporal"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5053": "authorized",
    "claim-p5054": "authorized"
  }
};
export default Object.freeze(spec);
