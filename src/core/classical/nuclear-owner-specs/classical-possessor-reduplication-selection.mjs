const spec = {
  "ownerId": "classical-possessor-reduplication-selection",
  "prefix": "ClassicalPossessorReduplicationSelection",
  "operationId": "classical.possessor.reduplication.selection.execute",
  "inputContract": "complete-typed-classical-possessor-reduplication-selection-source",
  "domain": "classical-possessor-reduplication-selection",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-higher-pronominal-nnc-runtime",
  "selections": [
    "claim-p1604"
  ],
  "coordinates": {
    "claim-p1604::p1604-occasionally-plurality-in-a-possessive-state-nnc-is-indicated": {
      "assertionId": "classical-possessor-reduplication-selection:p1604-occasionally-plurality-in-a-possessive-state-nnc-is-indicated",
      "canonicalPath": "possessorReduplicationSelection.selected"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlHigherPronominalNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlHigherPronominalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p1604": [
      "l15-reduplication"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1604": "authorized"
  }
};
export default Object.freeze(spec);
