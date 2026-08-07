const spec = {
  "ownerId": "classical-denominal-vnc-ya-lia-causative",
  "prefix": "ClassicalDenominalVncYaLiaCausative",
  "operationId": "classical.denominal.vnc.ya.lia.causative.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-ya-lia-causative-source",
  "domain": "classical-denominal-vnc-ya-lia-causative",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p4995",
    "claim-p4996"
  ],
  "coordinates": {
    "claim-p4995::p4995-the-causative-stem-of-the-denominal-ya-verbstems-is": {
      "assertionId": "classical-denominal-vnc-ya-lia-causative:p4995-the-causative-stem-of-the-denominal-ya-verbstems-is",
      "canonicalPath": "result.objectCount"
    },
    "claim-p4996::p4996-hui-ya-c-the-e-has-become-raised-to": {
      "assertionId": "classical-denominal-vnc-ya-lia-causative:p4996-hui-ya-c-the-e-has-become-raised-to",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4995": [
      "ya-lia-causative",
      "ya-lia-causative",
      "default"
    ],
    "claim-p4996": [
      "ya-lia-causative",
      "ya-lia-causative",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4995": "authorized",
    "claim-p4996": "authorized"
  }
};
export default Object.freeze(spec);
