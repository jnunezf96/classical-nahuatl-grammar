const spec = {
  "ownerId": "classical-denominal-vnc-ti-a-double-valence-exception",
  "prefix": "ClassicalDenominalVncTiADoubleValenceException",
  "operationId": "classical.denominal.vnc.ti.a.double.valence.exception.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-ti-a-double-valence-exception-source",
  "domain": "classical-denominal-vnc-ti-a-double-valence-exception",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5087"
  ],
  "coordinates": {
    "claim-p5087::p5087-the-result-is-a-violation-of-the-valence-principle": {
      "assertionId": "classical-denominal-vnc-ti-a-double-valence-exception:p5087-the-result-is-a-violation-of-the-valence-principle",
      "canonicalPath": "result.objectCount"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5087": [
      "ti-a-double-valence-exception",
      "ti-a-causative-double-inceptive",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5087": "authorized"
  }
};
export default Object.freeze(spec);
