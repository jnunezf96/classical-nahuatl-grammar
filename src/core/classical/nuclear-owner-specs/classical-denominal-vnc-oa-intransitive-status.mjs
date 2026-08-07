const spec = {
  "ownerId": "classical-denominal-vnc-oa-intransitive-status",
  "prefix": "ClassicalDenominalVncOaIntransitiveStatus",
  "operationId": "classical.denominal.vnc.oa.intransitive.status.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-oa-intransitive-status-source",
  "domain": "classical-denominal-vnc-oa-intransitive-status",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5116"
  ],
  "coordinates": {
    "claim-p5116::p5116-the-one-treated-in-this-section-is-surprisingly-intransitive": {
      "assertionId": "classical-denominal-vnc-oa-intransitive-status:p5116-the-one-treated-in-this-section-is-surprisingly-intransitive",
      "canonicalPath": "result.objectCount"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5116": [
      "oa-intransitive-status",
      "intransitive-o-a-use",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5116": "authorized"
  }
};
export default Object.freeze(spec);
