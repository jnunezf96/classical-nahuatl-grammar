const spec = {
  "ownerId": "classical-denominal-vnc-ya-class-b-perfective",
  "prefix": "ClassicalDenominalVncYaClassBPerfective",
  "operationId": "classical.denominal.vnc.ya.class.b.perfective.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-ya-class-b-perfective-source",
  "domain": "classical-denominal-vnc-ya-class-b-perfective",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p4992",
    "claim-p4993"
  ],
  "coordinates": {
    "claim-p4992::p4992-when-it-belongs-to-class-b-the-perfective-stem": {
      "assertionId": "classical-denominal-vnc-ya-class-b-perfective:p4992-when-it-belongs-to-class-b-the-perfective-stem",
      "canonicalPath": "result.targetClass"
    },
    "claim-p4993::p4993-when-it-belongs-to-class-b": {
      "assertionId": "classical-denominal-vnc-ya-class-b-perfective:p4993-when-it-belongs-to-class-b",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4992": [
      "ya-class-b-perfective",
      "inceptive-root-ya",
      "default"
    ],
    "claim-p4993": [
      "ya-class-b-perfective",
      "inceptive-root-ya",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4992": "authorized",
    "claim-p4993": "authorized"
  }
};
export default Object.freeze(spec);
