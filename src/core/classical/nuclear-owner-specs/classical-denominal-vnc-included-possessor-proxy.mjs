const spec = {
  "ownerId": "classical-denominal-vnc-included-possessor-proxy",
  "prefix": "ClassicalDenominalVncIncludedPossessorProxy",
  "operationId": "classical.denominal.vnc.included.possessor.proxy.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-included-possessor-proxy-source",
  "domain": "classical-denominal-vnc-included-possessor-proxy",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5035",
    "claim-p5036",
    "claim-p5037"
  ],
  "coordinates": {
    "claim-p5035::p5035-in-the-first-type-the-source-nounstem-expresses-the": {
      "assertionId": "classical-denominal-vnc-included-possessor-proxy:p5035-in-the-first-type-the-source-nounstem-expresses-the",
      "canonicalPath": "result.operationId"
    },
    "claim-p5036::p5036-see-56-4-which-allows-it-to-be-the": {
      "assertionId": "classical-denominal-vnc-included-possessor-proxy:p5036-see-56-4-which-allows-it-to-be-the",
      "canonicalPath": "analysis.semanticBoundary"
    },
    "claim-p5037::p5037-compare-the-verbstem-te-pa-ti-l-lo-ti": {
      "assertionId": "classical-denominal-vnc-included-possessor-proxy:p5037-compare-the-verbstem-te-pa-ti-l-lo-ti",
      "canonicalPath": "result.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5035": [
      "included-possessor-proxy",
      "included-possessor-ti",
      "proxy"
    ],
    "claim-p5036": [
      "included-possessor-proxy",
      "included-possessor-ti",
      "proxy"
    ],
    "claim-p5037": [
      "included-possessor-proxy",
      "included-possessor-ti",
      "proxy"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5035": "authorized",
    "claim-p5036": "authorized",
    "claim-p5037": "authorized"
  }
};
export default Object.freeze(spec);
