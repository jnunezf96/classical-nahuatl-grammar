const spec = {
  "ownerId": "classical-denominal-vnc-ti-a-incorporated-object",
  "prefix": "ClassicalDenominalVncTiAIncorporatedObject",
  "operationId": "classical.denominal.vnc.ti.a.incorporated.object.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-ti-a-incorporated-object-source",
  "domain": "classical-denominal-vnc-ti-a-incorporated-object",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5070"
  ],
  "coordinates": {
    "claim-p5070::p5070-the-causative-stem-can-have-an-incorporated-causative-object": {
      "assertionId": "classical-denominal-vnc-ti-a-incorporated-object:p5070-the-causative-stem-can-have-an-incorporated-causative-object",
      "canonicalPath": "result.objectCount"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5070": [
      "ti-a-incorporated-object",
      "ti-a-causative-single",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5070": "authorized"
  }
};
export default Object.freeze(spec);
