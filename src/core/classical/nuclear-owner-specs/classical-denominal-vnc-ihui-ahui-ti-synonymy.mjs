const spec = {
  "ownerId": "classical-denominal-vnc-ihui-ahui-ti-synonymy",
  "prefix": "ClassicalDenominalVncIhuiAhuiTiSynonymy",
  "operationId": "classical.denominal.vnc.ihui.ahui.ti.synonymy.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-ihui-ahui-ti-synonymy-source",
  "domain": "classical-denominal-vnc-ihui-ahui-ti-synonymy",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5141",
    "claim-p5142"
  ],
  "coordinates": {
    "claim-p5141::p5141-this-means-that-the-i-hui-a-hui-suffixal": {
      "assertionId": "classical-denominal-vnc-ihui-ahui-ti-synonymy:p5141-this-means-that-the-i-hui-a-hui-suffixal",
      "canonicalPath": "result.operationId"
    },
    "claim-p5142::p5142-on-occasion-one-even-finds-synonymous-denominal-verbstems-formed": {
      "assertionId": "classical-denominal-vnc-ihui-ahui-ti-synonymy:p5142-on-occasion-one-even-finds-synonymous-denominal-verbstems-formed",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5141": [
      "ihui-ahui-ti-synonymy",
      "denominal-i-hui",
      "default"
    ],
    "claim-p5142": [
      "ihui-ahui-ti-synonymy",
      "denominal-i-hui",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5141": "authorized",
    "claim-p5142": "authorized"
  }
};
export default Object.freeze(spec);
