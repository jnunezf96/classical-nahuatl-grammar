const spec = {
  "ownerId": "classical-denominal-vnc-oa-use-apply",
  "prefix": "ClassicalDenominalVncOaUseApply",
  "operationId": "classical.denominal.vnc.oa.use.apply.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-oa-use-apply-source",
  "domain": "classical-denominal-vnc-oa-use-apply",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5119",
    "claim-p5120"
  ],
  "coordinates": {
    "claim-p5119::p5119-to-use-or-apply-the-thing-signified-by-the": {
      "assertionId": "classical-denominal-vnc-oa-use-apply:p5119-to-use-or-apply-the-thing-signified-by-the",
      "canonicalPath": "result.operationId"
    },
    "claim-p5120::p5120-at-times-the-expected-meaning-is-replaced-by-to": {
      "assertionId": "classical-denominal-vnc-oa-use-apply:p5120-at-times-the-expected-meaning-is-replaced-by-to",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5119": [
      "oa-use-apply",
      "intransitive-o-a-use",
      "default"
    ],
    "claim-p5120": [
      "oa-use-apply",
      "intransitive-o-a-use",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5119": "authorized",
    "claim-p5120": "authorized"
  }
};
export default Object.freeze(spec);
