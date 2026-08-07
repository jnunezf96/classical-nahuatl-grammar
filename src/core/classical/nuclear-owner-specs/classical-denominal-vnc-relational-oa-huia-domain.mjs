const spec = {
  "ownerId": "classical-denominal-vnc-relational-oa-huia-domain",
  "prefix": "ClassicalDenominalVncRelationalOaHuiaDomain",
  "operationId": "classical.denominal.vnc.relational.oa.huia.domain.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-relational-oa-huia-domain-source",
  "domain": "classical-denominal-vnc-relational-oa-huia-domain",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5132",
    "claim-p5133"
  ],
  "coordinates": {
    "claim-p5132::p5132-verbstems-formed-with-o-a-and-huia-from-compound": {
      "assertionId": "classical-denominal-vnc-relational-oa-huia-domain:p5132-verbstems-formed-with-o-a-and-huia-from-compound",
      "canonicalPath": "result.sourceKind"
    },
    "claim-p5133::p5133-certain-compound-nounstems-whose-matrix-is-a-relational-nounstem": {
      "assertionId": "classical-denominal-vnc-relational-oa-huia-domain:p5133-certain-compound-nounstems-whose-matrix-is-a-relational-nounstem",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5132": [
      "relational-oa-huia-domain",
      "relational-o-a-transitive",
      "default"
    ],
    "claim-p5133": [
      "relational-oa-huia-domain",
      "relational-o-a-transitive",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5132": "authorized",
    "claim-p5133": "authorized"
  }
};
export default Object.freeze(spec);
