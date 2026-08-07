const spec = {
  "ownerId": "classical-denominal-vnc-ti-a-possession-single-semantics",
  "prefix": "ClassicalDenominalVncTiAPossessionSingleSemantics",
  "operationId": "classical.denominal.vnc.ti.a.possession.single.semantics.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-ti-a-possession-single-semantics-source",
  "domain": "classical-denominal-vnc-ti-a-possession-single-semantics",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5068"
  ],
  "coordinates": {
    "claim-p5068::p5068-a-type-one-causative-stem-from-a-ti-ofpossession": {
      "assertionId": "classical-denominal-vnc-ti-a-possession-single-semantics:p5068-a-type-one-causative-stem-from-a-ti-ofpossession",
      "canonicalPath": "result.operationId"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5068": [
      "ti-a-possession-single-semantics",
      "ti-a-causative-single",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5068": "authorized"
  }
};
export default Object.freeze(spec);
