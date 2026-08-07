const spec = {
  "ownerId": "classical-denominal-vnc-relational-possessive-source",
  "prefix": "ClassicalDenominalVncRelationalPossessiveSource",
  "operationId": "classical.denominal.vnc.relational.possessive.source.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-relational-possessive-source-source",
  "domain": "classical-denominal-vnc-relational-possessive-source",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5135"
  ],
  "coordinates": {
    "claim-p5135::p5135-at-times-the-source-of-the-verbstem-is-simply": {
      "assertionId": "classical-denominal-vnc-relational-possessive-source:p5135-at-times-the-source-of-the-verbstem-is-simply",
      "canonicalPath": "result.sourceKind"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5135": [
      "relational-possessive-source",
      "relational-huia",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5135": "authorized"
  }
};
export default Object.freeze(spec);
