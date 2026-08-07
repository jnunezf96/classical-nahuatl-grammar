const spec = {
  "ownerId": "classical-denominal-vnc-relational-route-attestation",
  "prefix": "ClassicalDenominalVncRelationalRouteAttestation",
  "operationId": "classical.denominal.vnc.relational.route.attestation.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-relational-route-attestation-source",
  "domain": "classical-denominal-vnc-relational-route-attestation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5136"
  ],
  "coordinates": {
    "claim-p5136::p5136-at-times-only-one-of-the-derived-verbstems-is": {
      "assertionId": "classical-denominal-vnc-relational-route-attestation:p5136-at-times-only-one-of-the-derived-verbstems-is",
      "canonicalPath": "result.operationId"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5136": [
      "relational-route-attestation",
      "relational-huia",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5136": "authorized"
  }
};
export default Object.freeze(spec);
