const spec = {
  "ownerId": "classical-denominal-vnc-ihui-ahui-destockal",
  "prefix": "ClassicalDenominalVncIhuiAhuiDestockal",
  "operationId": "classical.denominal.vnc.ihui.ahui.destockal.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-ihui-ahui-destockal-source",
  "domain": "classical-denominal-vnc-ihui-ahui-destockal",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5138",
    "claim-p5139"
  ],
  "coordinates": {
    "claim-p5138::p5138-these-intransitive-and-transitive-pairs-of-verbstems-therefore-belong": {
      "assertionId": "classical-denominal-vnc-ihui-ahui-destockal:p5138-these-intransitive-and-transitive-pairs-of-verbstems-therefore-belong",
      "canonicalPath": "result.operationId"
    },
    "claim-p5139::p5139-here-however-the-focus-is-on-these-destockal-verbstems": {
      "assertionId": "classical-denominal-vnc-ihui-ahui-destockal:p5139-here-however-the-focus-is-on-these-destockal-verbstems",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5138": [
      "ihui-ahui-destockal",
      "denominal-a-hui",
      "default"
    ],
    "claim-p5139": [
      "ihui-ahui-destockal",
      "denominal-a-hui",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5138": "authorized",
    "claim-p5139": "authorized"
  }
};
export default Object.freeze(spec);
