const spec = {
  "ownerId": "classical-denominal-vnc-ti-a-adjectival-modifier",
  "prefix": "ClassicalDenominalVncTiAAdjectivalModifier",
  "operationId": "classical.denominal.vnc.ti.a.adjectival.modifier.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-ti-a-adjectival-modifier-source",
  "domain": "classical-denominal-vnc-ti-a-adjectival-modifier",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5094"
  ],
  "coordinates": {
    "claim-p5094::p5094-after-the-formation-of-the-verbstem-the-adjectival-nnc": {
      "assertionId": "classical-denominal-vnc-ti-a-adjectival-modifier:p5094-after-the-formation-of-the-verbstem-the-adjectival-nnc",
      "canonicalPath": "result.operationId"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5094": [
      "ti-a-adjectival-modifier",
      "ti-a-causative-double-inceptive",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5094": "authorized"
  }
};
export default Object.freeze(spec);
