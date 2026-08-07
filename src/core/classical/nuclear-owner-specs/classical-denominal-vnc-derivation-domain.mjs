const spec = {
  "ownerId": "classical-denominal-vnc-derivation-domain",
  "prefix": "ClassicalDenominalVncDerivationDomain",
  "operationId": "classical.denominal.vnc.derivation.domain.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-derivation-domain-source",
  "domain": "classical-denominal-vnc-derivation-domain",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p4951",
    "claim-p4952"
  ],
  "coordinates": {
    "claim-p4951::p4951-verbstems-may-be-derived-from-nounstems-by-means-of": {
      "assertionId": "classical-denominal-vnc-derivation-domain:p4951-verbstems-may-be-derived-from-nounstems-by-means-of",
      "canonicalPath": "result.operationId"
    },
    "claim-p4952::p4952-this-is-an-area-of-strong-creative-power-for": {
      "assertionId": "classical-denominal-vnc-derivation-domain:p4952-this-is-an-area-of-strong-creative-power-for",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4951": [
      "derivation-domain",
      "inceptive-ti",
      "default"
    ],
    "claim-p4952": [
      "derivation-domain",
      "inceptive-ti",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4951": "authorized",
    "claim-p4952": "authorized"
  }
};
export default Object.freeze(spec);
