const spec = {
  "ownerId": "classical-denominal-vnc-ti-a-yo-source",
  "prefix": "ClassicalDenominalVncTiAYoSource",
  "operationId": "classical.denominal.vnc.ti.a.yo.source.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-ti-a-yo-source-source",
  "domain": "classical-denominal-vnc-ti-a-yo-source",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5073",
    "claim-p5074"
  ],
  "coordinates": {
    "claim-p5073::p5073-the-source-of-a-type-one-causative-stem-is": {
      "assertionId": "classical-denominal-vnc-ti-a-yo-source:p5073-the-source-of-a-type-one-causative-stem-is",
      "canonicalPath": "result.operationId"
    },
    "claim-p5074::p5074-the-embed-of-the-yo-tl-is-a-first": {
      "assertionId": "classical-denominal-vnc-ti-a-yo-source:p5074-the-embed-of-the-yo-tl-is-a-first",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5073": [
      "ti-a-yo-source",
      "ti-a-causative-single",
      "default"
    ],
    "claim-p5074": [
      "ti-a-yo-source",
      "ti-a-causative-single",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5073": "authorized",
    "claim-p5074": "authorized"
  }
};
export default Object.freeze(spec);
