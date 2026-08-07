const spec = {
  "ownerId": "classical-denominal-vnc-tiya-class-b-perfective",
  "prefix": "ClassicalDenominalVncTiyaClassBPerfective",
  "operationId": "classical.denominal.vnc.tiya.class.b.perfective.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-tiya-class-b-perfective-source",
  "domain": "classical-denominal-vnc-tiya-class-b-perfective",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5003",
    "claim-p5004"
  ],
  "coordinates": {
    "claim-p5003::p5003-when-it-belongs-to-class-b-the-perfective-stem": {
      "assertionId": "classical-denominal-vnc-tiya-class-b-perfective:p5003-when-it-belongs-to-class-b-the-perfective-stem",
      "canonicalPath": "result.operationId"
    },
    "claim-p5004::p5004-when-it-belongs-to-class-b": {
      "assertionId": "classical-denominal-vnc-tiya-class-b-perfective:p5004-when-it-belongs-to-class-b",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5003": [
      "tiya-class-b-perfective",
      "inceptive-ti-ya",
      "default"
    ],
    "claim-p5004": [
      "tiya-class-b-perfective",
      "inceptive-ti-ya",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5003": "authorized",
    "claim-p5004": "authorized"
  }
};
export default Object.freeze(spec);
