const spec = {
  "ownerId": "classical-personal-name-nnc-historical-personal-name-variant",
  "prefix": "ClassicalPersonalNameNncHistoricalPersonalNameVariant",
  "operationId": "classical.personal.name.nnc.historical.personal.name.variant.execute",
  "inputContract": "complete-typed-classical-personal-name-nnc-historical-personal-name-variant-source",
  "domain": "classical-personal-name-nnc-historical-personal-name-variant",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-personal-name-nnc-runtime",
  "selections": [
    "claim-p5318"
  ],
  "coordinates": {
    "claim-p5318::p5318-this-personal-name-nnc-is-a-variant-of-chalchihuitl": {
      "assertionId": "classical-personal-name-nnc-historical-personal-name-variant:p5318-this-personal-name-nnc-is-a-variant-of-chalchihuitl",
      "canonicalPath": "result.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalPersonalNameNncValidationFrame",
  "executionValidatorName": "isClassicalPersonalNameNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5318": [
      "historical-personal-name-variant",
      "absolutive-state-nnc",
      "default",
      ""
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5318": "authorized"
  }
};
export default Object.freeze(spec);
