const spec = {
  "ownerId": "classical-personal-name-nnc-adverbial-modification-source",
  "prefix": "ClassicalPersonalNameNncAdverbialModificationSource",
  "operationId": "classical.personal.name.nnc.adverbial.modification.source.execute",
  "inputContract": "complete-typed-classical-personal-name-nnc-adverbial-modification-source-source",
  "domain": "classical-personal-name-nnc-adverbial-modification-source",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-personal-name-nnc-runtime",
  "selections": [
    "claim-p5220"
  ],
  "coordinates": {
    "claim-p5220::p5220-a-structure-of-adverbial-modification-serves-as-the-stem": {
      "assertionId": "classical-personal-name-nnc-adverbial-modification-source:p5220-a-structure-of-adverbial-modification-serves-as-the-stem",
      "canonicalPath": "result.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalPersonalNameNncValidationFrame",
  "executionValidatorName": "isClassicalPersonalNameNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5220": [
      "adverbial-modification-source",
      "adverbial-modification",
      "default",
      ""
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5220": "authorized"
  }
};
export default Object.freeze(spec);
