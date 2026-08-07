const spec = {
  "ownerId": "classical-denominal-vnc-ti-a-causative-synonymy",
  "prefix": "ClassicalDenominalVncTiACausativeSynonymy",
  "operationId": "classical.denominal.vnc.ti.a.causative.synonymy.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-ti-a-causative-synonymy-source",
  "domain": "classical-denominal-vnc-ti-a-causative-synonymy",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5080"
  ],
  "coordinates": {
    "claim-p5080::p5080-at-times-this-first-type-causative-stem-is-synonymous": {
      "assertionId": "classical-denominal-vnc-ti-a-causative-synonymy:p5080-at-times-this-first-type-causative-stem-is-synonymous",
      "canonicalPath": "result.operationId"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5080": [
      "ti-a-causative-synonymy",
      "ti-a-causative-single",
      "inceptive-source"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5080": "authorized"
  }
};
export default Object.freeze(spec);
