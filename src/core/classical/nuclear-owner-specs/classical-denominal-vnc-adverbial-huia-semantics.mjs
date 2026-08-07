const spec = {
  "ownerId": "classical-denominal-vnc-adverbial-huia-semantics",
  "prefix": "ClassicalDenominalVncAdverbialHuiaSemantics",
  "operationId": "classical.denominal.vnc.adverbial.huia.semantics.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-adverbial-huia-semantics-source",
  "domain": "classical-denominal-vnc-adverbial-huia-semantics",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5131"
  ],
  "coordinates": {
    "claim-p5131::p5131-the-derived-verbstem-can-be-translated-as-to-act": {
      "assertionId": "classical-denominal-vnc-adverbial-huia-semantics:p5131-the-derived-verbstem-can-be-translated-as-to-act",
      "canonicalPath": "result.operationId"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5131": [
      "adverbial-huia-semantics",
      "adverbial-huia",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5131": "authorized"
  }
};
export default Object.freeze(spec);
