const spec = {
  "ownerId": "classical-denominal-vnc-ti-a-inceptive-restriction",
  "prefix": "ClassicalDenominalVncTiAInceptiveRestriction",
  "operationId": "classical.denominal.vnc.ti.a.inceptive.restriction.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-ti-a-inceptive-restriction-source",
  "domain": "classical-denominal-vnc-ti-a-inceptive-restriction",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5078",
    "claim-p5079"
  ],
  "coordinates": {
    "claim-p5078::p5078-only-the-stems-formed-according-to-54-2-1": {
      "assertionId": "classical-denominal-vnc-ti-a-inceptive-restriction:p5078-only-the-stems-formed-according-to-54-2-1",
      "canonicalPath": "result.operationId"
    },
    "claim-p5079::p5079-the-meaning-of-the-resultant-verbstem-is-to-cause": {
      "assertionId": "classical-denominal-vnc-ti-a-inceptive-restriction:p5079-the-meaning-of-the-resultant-verbstem-is-to-cause",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5078": [
      "ti-a-inceptive-restriction",
      "ti-a-causative-single",
      "inceptive-source"
    ],
    "claim-p5079": [
      "ti-a-inceptive-restriction",
      "ti-a-causative-single",
      "inceptive-source"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5078": "authorized",
    "claim-p5079": "authorized"
  }
};
export default Object.freeze(spec);
