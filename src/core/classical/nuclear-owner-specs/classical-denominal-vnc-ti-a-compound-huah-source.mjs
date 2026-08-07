const spec = {
  "ownerId": "classical-denominal-vnc-ti-a-compound-huah-source",
  "prefix": "ClassicalDenominalVncTiACompoundHuahSource",
  "operationId": "classical.denominal.vnc.ti.a.compound.huah.source.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-ti-a-compound-huah-source-source",
  "domain": "classical-denominal-vnc-ti-a-compound-huah-source",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5072"
  ],
  "coordinates": {
    "claim-p5072::p5072-cal-li-house-among-these-type-one-causative-stems": {
      "assertionId": "classical-denominal-vnc-ti-a-compound-huah-source:p5072-cal-li-house-among-these-type-one-causative-stems",
      "canonicalPath": "result.operationId"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5072": [
      "ti-a-compound-huah-source",
      "ti-a-causative-single",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5072": "authorized"
  }
};
export default Object.freeze(spec);
