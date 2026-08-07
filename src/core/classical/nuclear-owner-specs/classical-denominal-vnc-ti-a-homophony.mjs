const spec = {
  "ownerId": "classical-denominal-vnc-ti-a-homophony",
  "prefix": "ClassicalDenominalVncTiAHomophony",
  "operationId": "classical.denominal.vnc.ti.a.homophony.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-ti-a-homophony-source",
  "domain": "classical-denominal-vnc-ti-a-homophony",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5088"
  ],
  "coordinates": {
    "claim-p5088::p5088-as-a-consequence-of-this-in-many-instances-there": {
      "assertionId": "classical-denominal-vnc-ti-a-homophony:p5088-as-a-consequence-of-this-in-many-instances-there",
      "canonicalPath": "result.operationId"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5088": [
      "ti-a-homophony",
      "ti-a-causative-double-inceptive",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5088": "authorized"
  }
};
export default Object.freeze(spec);
