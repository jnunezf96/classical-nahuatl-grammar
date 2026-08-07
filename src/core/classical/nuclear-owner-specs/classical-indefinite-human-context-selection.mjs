const spec = {
  "ownerId": "classical-indefinite-human-context-selection",
  "prefix": "ClassicalIndefiniteHumanContextSelection",
  "operationId": "classical.indefinite.human.context.selection.execute",
  "inputContract": "complete-typed-classical-indefinite-human-context-selection-source",
  "domain": "classical-indefinite-human-context-selection",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-higher-pronominal-nnc-runtime",
  "selections": [
    "claim-p1721",
    "claim-p1722",
    "claim-p1723"
  ],
  "coordinates": {
    "claim-p1721::p1721-as-is-obvious-from-the-meaning-the-stem-would": {
      "assertionId": "classical-indefinite-human-context-selection:p1721-as-is-obvious-from-the-meaning-the-stem-would",
      "canonicalPath": "contextSelectionRecord.specialHumanUse.available"
    },
    "claim-p1722::p1722-subject-in-special-situations": {
      "assertionId": "classical-indefinite-human-context-selection:p1722-subject-in-special-situations",
      "canonicalPath": "contextSelectionRecord.specialHumanUse.required"
    },
    "claim-p1723::p1723-note-the-indefinite-pronominal-sterns-a-c-ah-and": {
      "assertionId": "classical-indefinite-human-context-selection:p1723-note-the-indefinite-pronominal-sterns-a-c-ah-and",
      "canonicalPath": "contextSelectionRecord.specialHumanUse.selected"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlHigherPronominalNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlHigherPronominalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p1721": [
      "l16-indefinite-human-special"
    ],
    "claim-p1722": [
      "l16-indefinite-human-special"
    ],
    "claim-p1723": [
      "l16-indefinite-human-special"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1721": "authorized",
    "claim-p1722": "authorized",
    "claim-p1723": "authorized"
  }
};
export default Object.freeze(spec);
