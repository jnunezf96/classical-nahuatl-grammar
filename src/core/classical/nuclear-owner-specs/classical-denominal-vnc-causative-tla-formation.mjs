const spec = {
  "ownerId": "classical-denominal-vnc-causative-tla-formation",
  "prefix": "ClassicalDenominalVncCausativeTlaFormation",
  "operationId": "classical.denominal.vnc.causative.tla.formation.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-causative-tla-formation-source",
  "domain": "classical-denominal-vnc-causative-tla-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5112"
  ],
  "coordinates": {
    "claim-p5112::p5112-although-not-very-productive-the-suffix-tla-may-be": {
      "assertionId": "classical-denominal-vnc-causative-tla-formation:p5112-although-not-very-productive-the-suffix-tla-may-be",
      "canonicalPath": "result.objectCount"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5112": [
      "causative-tla-formation",
      "denominal-causative-tla",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5112": "authorized"
  }
};
export default Object.freeze(spec);
