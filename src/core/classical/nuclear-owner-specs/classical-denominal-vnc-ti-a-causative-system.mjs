const spec = {
  "ownerId": "classical-denominal-vnc-ti-a-causative-system",
  "prefix": "ClassicalDenominalVncTiACausativeSystem",
  "operationId": "classical.denominal.vnc.ti.a.causative.system.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-ti-a-causative-system-source",
  "domain": "classical-denominal-vnc-ti-a-causative-system",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5063",
    "claim-p5064",
    "claim-p5065"
  ],
  "coordinates": {
    "claim-p5063::p5063-second-type-causative-verbstems-formed-by-means-of-the": {
      "assertionId": "classical-denominal-vnc-ti-a-causative-system:p5063-second-type-causative-verbstems-formed-by-means-of-the",
      "canonicalPath": "result.objectCount"
    },
    "claim-p5064::p5064-there-are-also-first-type-causative-verbstems-formed-with": {
      "assertionId": "classical-denominal-vnc-ti-a-causative-system:p5064-there-are-also-first-type-causative-verbstems-formed-with",
      "canonicalPath": "analysis.semanticBoundary"
    },
    "claim-p5065::p5065-the-nnc-underlying-the-ti-verbstem-may-be-in": {
      "assertionId": "classical-denominal-vnc-ti-a-causative-system:p5065-the-nnc-underlying-the-ti-verbstem-may-be-in",
      "canonicalPath": "result.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5063": [
      "ti-a-causative-system",
      "ti-a-causative-single",
      "default"
    ],
    "claim-p5064": [
      "ti-a-causative-system",
      "ti-a-causative-single",
      "default"
    ],
    "claim-p5065": [
      "ti-a-causative-system",
      "ti-a-causative-single",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5063": "authorized",
    "claim-p5064": "authorized",
    "claim-p5065": "authorized"
  }
};
export default Object.freeze(spec);
