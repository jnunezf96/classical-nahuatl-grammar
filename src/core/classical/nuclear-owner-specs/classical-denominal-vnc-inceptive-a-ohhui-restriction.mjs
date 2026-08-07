const spec = {
  "ownerId": "classical-denominal-vnc-inceptive-a-ohhui-restriction",
  "prefix": "ClassicalDenominalVncInceptiveAOhhuiRestriction",
  "operationId": "classical.denominal.vnc.inceptive.a.ohhui.restriction.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-inceptive-a-ohhui-restriction-source",
  "domain": "classical-denominal-vnc-inceptive-a-ohhui-restriction",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5020",
    "claim-p5021",
    "claim-p5022"
  ],
  "coordinates": {
    "claim-p5020::p5020-it-is-found-in-adjectival-nncs-built-on-the": {
      "assertionId": "classical-denominal-vnc-inceptive-a-ohhui-restriction:p5020-it-is-found-in-adjectival-nncs-built-on-the",
      "canonicalPath": "analysis.unsupportedProductiveGuessBlocked"
    },
    "claim-p5021::p5021-the-asterisk-indicates-that-oh-hui-a-has-only": {
      "assertionId": "classical-denominal-vnc-inceptive-a-ohhui-restriction:p5021-the-asterisk-indicates-that-oh-hui-a-has-only",
      "canonicalPath": "analysis.semanticBoundary"
    },
    "claim-p5022::p5022-the-former-stem-means-for-s-th-to-pose": {
      "assertionId": "classical-denominal-vnc-inceptive-a-ohhui-restriction:p5022-the-former-stem-means-for-s-th-to-pose",
      "canonicalPath": "result.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5020": [
      "inceptive-a-ohhui-restriction",
      "inceptive-a",
      "default"
    ],
    "claim-p5021": [
      "inceptive-a-ohhui-restriction",
      "inceptive-a",
      "default"
    ],
    "claim-p5022": [
      "inceptive-a-ohhui-restriction",
      "inceptive-a",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5020": "authorized",
    "claim-p5021": "authorized",
    "claim-p5022": "authorized"
  }
};
export default Object.freeze(spec);
