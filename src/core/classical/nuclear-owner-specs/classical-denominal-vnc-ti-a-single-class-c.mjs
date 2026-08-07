const spec = {
  "ownerId": "classical-denominal-vnc-ti-a-single-class-c",
  "prefix": "ClassicalDenominalVncTiASingleClassC",
  "operationId": "classical.denominal.vnc.ti.a.single.class.c.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-ti-a-single-class-c-source",
  "domain": "classical-denominal-vnc-ti-a-single-class-c",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5081"
  ],
  "coordinates": {
    "claim-p5081::p5081-single-object-causative-verbstems-of-both-subsection-a-and": {
      "assertionId": "classical-denominal-vnc-ti-a-single-class-c:p5081-single-object-causative-verbstems-of-both-subsection-a-and",
      "canonicalPath": "result.targetClass"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5081": [
      "ti-a-single-class-c",
      "ti-a-causative-single",
      "inceptive-source"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5081": "authorized"
  }
};
export default Object.freeze(spec);
