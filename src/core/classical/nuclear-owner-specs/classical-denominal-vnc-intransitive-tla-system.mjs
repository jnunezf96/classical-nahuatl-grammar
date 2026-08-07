const spec = {
  "ownerId": "classical-denominal-vnc-intransitive-tla-system",
  "prefix": "ClassicalDenominalVncIntransitiveTlaSystem",
  "operationId": "classical.denominal.vnc.intransitive.tla.system.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-intransitive-tla-system-source",
  "domain": "classical-denominal-vnc-intransitive-tla-system",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5114"
  ],
  "coordinates": {
    "claim-p5114::p5114-there-is-another-verbstem-forming-tla-that-is-unlike": {
      "assertionId": "classical-denominal-vnc-intransitive-tla-system:p5114-there-is-another-verbstem-forming-tla-that-is-unlike",
      "canonicalPath": "result.objectCount"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5114": [
      "intransitive-tla-system",
      "intransitive-tla",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5114": "authorized"
  }
};
export default Object.freeze(spec);
