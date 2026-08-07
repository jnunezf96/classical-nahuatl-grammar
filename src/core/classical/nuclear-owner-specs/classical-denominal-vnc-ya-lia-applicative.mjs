const spec = {
  "ownerId": "classical-denominal-vnc-ya-lia-applicative",
  "prefix": "ClassicalDenominalVncYaLiaApplicative",
  "operationId": "classical.denominal.vnc.ya.lia.applicative.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-ya-lia-applicative-source",
  "domain": "classical-denominal-vnc-ya-lia-applicative",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p4997",
    "claim-p4998"
  ],
  "coordinates": {
    "claim-p4997::p4997-there-are-occasions-when-the-lia-suffix-creates-an": {
      "assertionId": "classical-denominal-vnc-ya-lia-applicative:p4997-there-are-occasions-when-the-lia-suffix-creates-an",
      "canonicalPath": "result.objectCount"
    },
    "claim-p4998::p4998-when-the-lia-suffix-creates-an-applicative-verbstem": {
      "assertionId": "classical-denominal-vnc-ya-lia-applicative:p4998-when-the-lia-suffix-creates-an-applicative-verbstem",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4997": [
      "ya-lia-applicative",
      "ya-lia-applicative",
      "default"
    ],
    "claim-p4998": [
      "ya-lia-applicative",
      "ya-lia-applicative",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4997": "authorized",
    "claim-p4998": "authorized"
  }
};
export default Object.freeze(spec);
