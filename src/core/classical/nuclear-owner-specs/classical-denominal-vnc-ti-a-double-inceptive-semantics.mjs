const spec = {
  "ownerId": "classical-denominal-vnc-ti-a-double-inceptive-semantics",
  "prefix": "ClassicalDenominalVncTiADoubleInceptiveSemantics",
  "operationId": "classical.denominal.vnc.ti.a.double.inceptive.semantics.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-ti-a-double-inceptive-semantics-source",
  "domain": "classical-denominal-vnc-ti-a-double-inceptive-semantics",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5089",
    "claim-p5090",
    "claim-p5091"
  ],
  "coordinates": {
    "claim-p5089::p5089-the-meaning-of-the-double-object-stem-is-to": {
      "assertionId": "classical-denominal-vnc-ti-a-double-inceptive-semantics:p5089-the-meaning-of-the-double-object-stem-is-to",
      "canonicalPath": "result.objectCount"
    },
    "claim-p5090::p5090-as-oneself-s-house-for-example-nicnocaltia-in-mocal": {
      "assertionId": "classical-denominal-vnc-ti-a-double-inceptive-semantics:p5090-as-oneself-s-house-for-example-nicnocaltia-in-mocal",
      "canonicalPath": "analysis.semanticBoundary"
    },
    "claim-p5091::p5091-compare-the-single-object-stem-m-o-cal-ti": {
      "assertionId": "classical-denominal-vnc-ti-a-double-inceptive-semantics:p5091-compare-the-single-object-stem-m-o-cal-ti",
      "canonicalPath": "result.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5089": [
      "ti-a-double-inceptive-semantics",
      "ti-a-causative-double-inceptive",
      "default"
    ],
    "claim-p5090": [
      "ti-a-double-inceptive-semantics",
      "ti-a-causative-double-inceptive",
      "default"
    ],
    "claim-p5091": [
      "ti-a-double-inceptive-semantics",
      "ti-a-causative-double-inceptive",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5089": "authorized",
    "claim-p5090": "authorized",
    "claim-p5091": "authorized"
  }
};
export default Object.freeze(spec);
