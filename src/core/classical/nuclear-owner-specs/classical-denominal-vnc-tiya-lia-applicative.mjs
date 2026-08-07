const spec = {
  "ownerId": "classical-denominal-vnc-tiya-lia-applicative",
  "prefix": "ClassicalDenominalVncTiyaLiaApplicative",
  "operationId": "classical.denominal.vnc.tiya.lia.applicative.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-tiya-lia-applicative-source",
  "domain": "classical-denominal-vnc-tiya-lia-applicative",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5006",
    "claim-p5007"
  ],
  "coordinates": {
    "claim-p5006::p5006-there-are-however-occasions-when-the-lia-suffix-has": {
      "assertionId": "classical-denominal-vnc-tiya-lia-applicative:p5006-there-are-however-occasions-when-the-lia-suffix-has",
      "canonicalPath": "result.objectCount"
    },
    "claim-p5007::p5007-when-the-lia-suffix-has-an-applicative-meaning": {
      "assertionId": "classical-denominal-vnc-tiya-lia-applicative:p5007-when-the-lia-suffix-has-an-applicative-meaning",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5006": [
      "tiya-lia-applicative",
      "ya-lia-applicative",
      "default"
    ],
    "claim-p5007": [
      "tiya-lia-applicative",
      "ya-lia-applicative",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5006": "authorized",
    "claim-p5007": "authorized"
  }
};
export default Object.freeze(spec);
