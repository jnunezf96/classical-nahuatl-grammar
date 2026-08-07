const spec = {
  "ownerId": "classical-personal-name-nnc-adjectival-modification-source",
  "prefix": "ClassicalPersonalNameNncAdjectivalModificationSource",
  "operationId": "classical.personal.name.nnc.adjectival.modification.source.execute",
  "inputContract": "complete-typed-classical-personal-name-nnc-adjectival-modification-source-source",
  "domain": "classical-personal-name-nnc-adjectival-modification-source",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-personal-name-nnc-runtime",
  "selections": [
    "claim-p5219"
  ],
  "coordinates": {
    "claim-p5219::p5219-a-structure-of-adjectival-modification-serves-as-the-stem": {
      "assertionId": "classical-personal-name-nnc-adjectival-modification-source:p5219-a-structure-of-adjectival-modification-serves-as-the-stem",
      "canonicalPath": "result.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalPersonalNameNncValidationFrame",
  "executionValidatorName": "isClassicalPersonalNameNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5219": [
      "adjectival-modification-source",
      "adjectival-modification",
      "ambiguous",
      ""
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5219": "authorized"
  }
};
export default Object.freeze(spec);
