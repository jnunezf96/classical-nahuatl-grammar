const spec = {
  "ownerId": "classical-denominal-vnc-ti-a-interpretive-disambiguation",
  "prefix": "ClassicalDenominalVncTiAInterpretiveDisambiguation",
  "operationId": "classical.denominal.vnc.ti.a.interpretive.disambiguation.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-ti-a-interpretive-disambiguation-source",
  "domain": "classical-denominal-vnc-ti-a-interpretive-disambiguation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5098"
  ],
  "coordinates": {
    "claim-p5098::p5098-one-must-not-only-decide-whether-the-ti-means": {
      "assertionId": "classical-denominal-vnc-ti-a-interpretive-disambiguation:p5098-one-must-not-only-decide-whether-the-ti-means",
      "canonicalPath": "result.operationId"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5098": [
      "ti-a-interpretive-disambiguation",
      "ti-a-causative-double-possession",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5098": "authorized"
  }
};
export default Object.freeze(spec);
