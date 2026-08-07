const spec = {
  "ownerId": "classical-personal-name-nnc-absolutive-possessive-source-alternative",
  "prefix": "ClassicalPersonalNameNncAbsolutivePossessiveSourceAlternative",
  "operationId": "classical.personal.name.nnc.absolutive.possessive.source.alternative.execute",
  "inputContract": "complete-typed-classical-personal-name-nnc-absolutive-possessive-source-alternative-source",
  "domain": "classical-personal-name-nnc-absolutive-possessive-source-alternative",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-personal-name-nnc-runtime",
  "selections": [
    "claim-p5201"
  ],
  "coordinates": {
    "claim-p5201::p5201-the-stem-of-this-kind-of-personal-name-nnc": {
      "assertionId": "classical-personal-name-nnc-absolutive-possessive-source-alternative:p5201-the-stem-of-this-kind-of-personal-name-nnc",
      "canonicalPath": "result.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalPersonalNameNncValidationFrame",
  "executionValidatorName": "isClassicalPersonalNameNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5201": [
      "absolutive-possessive-source-alternative",
      "absolutive-state-nnc",
      "default",
      ""
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5201": "authorized"
  }
};
export default Object.freeze(spec);
