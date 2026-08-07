const spec = {
  "ownerId": "classical-denominal-vnc-inceptive-semantics",
  "prefix": "ClassicalDenominalVncInceptiveSemantics",
  "operationId": "classical.denominal.vnc.inceptive.semantics.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-inceptive-semantics-source",
  "domain": "classical-denominal-vnc-inceptive-semantics",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p4955",
    "claim-p4956"
  ],
  "coordinates": {
    "claim-p4955::p4955-these-five-suffixes-create-intransitive-verbstems-having-the-translation": {
      "assertionId": "classical-denominal-vnc-inceptive-semantics:p4955-these-five-suffixes-create-intransitive-verbstems-having-the-translation",
      "canonicalPath": "result.operationId"
    },
    "claim-p4956::p4956-since-nahuatl-like-arabic-does-not-normally-distinguish-being": {
      "assertionId": "classical-denominal-vnc-inceptive-semantics:p4956-since-nahuatl-like-arabic-does-not-normally-distinguish-being",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4955": [
      "inceptive-semantics",
      "inceptive-ti",
      "default"
    ],
    "claim-p4956": [
      "inceptive-semantics",
      "inceptive-ti",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4955": "authorized",
    "claim-p4956": "authorized"
  }
};
export default Object.freeze(spec);
