const spec = {
  "ownerId": "classical-denominal-vnc-adverbial-huia-source",
  "prefix": "ClassicalDenominalVncAdverbialHuiaSource",
  "operationId": "classical.denominal.vnc.adverbial.huia.source.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-adverbial-huia-source-source",
  "domain": "classical-denominal-vnc-adverbial-huia-source",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5130"
  ],
  "coordinates": {
    "claim-p5130::p5130-some-of-the-nounstems-that-occur-in-the-adverbialized": {
      "assertionId": "classical-denominal-vnc-adverbial-huia-source:p5130-some-of-the-nounstems-that-occur-in-the-adverbialized",
      "canonicalPath": "result.sourceKind"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5130": [
      "adverbial-huia-source",
      "adverbial-huia",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5130": "authorized"
  }
};
export default Object.freeze(spec);
