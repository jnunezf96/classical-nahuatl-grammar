const spec = {
  "ownerId": "classical-denominal-vnc-destockal-ya-source",
  "prefix": "ClassicalDenominalVncDestockalYaSource",
  "operationId": "classical.denominal.vnc.destockal.ya.source.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-destockal-ya-source-source",
  "domain": "classical-denominal-vnc-destockal-ya-source",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5010",
    "claim-p5011"
  ],
  "coordinates": {
    "claim-p5010::p5010-yam-a-ni-ya-fora-body-to-be-at": {
      "assertionId": "classical-denominal-vnc-destockal-ya-source:p5010-yam-a-ni-ya-fora-body-to-be-at",
      "canonicalPath": "result.sourceKind"
    },
    "claim-p5011::p5011-compare-yam-a-z-ti-ya-to-become-soft": {
      "assertionId": "classical-denominal-vnc-destockal-ya-source:p5011-compare-yam-a-z-ti-ya-to-become-soft",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5010": [
      "destockal-ya-source",
      "destockal-ya",
      "default"
    ],
    "claim-p5011": [
      "destockal-ya-source",
      "destockal-ya",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5010": "authorized",
    "claim-p5011": "authorized"
  }
};
export default Object.freeze(spec);
