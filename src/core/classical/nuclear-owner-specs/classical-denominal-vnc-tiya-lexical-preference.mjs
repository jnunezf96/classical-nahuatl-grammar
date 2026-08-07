const spec = {
  "ownerId": "classical-denominal-vnc-tiya-lexical-preference",
  "prefix": "ClassicalDenominalVncTiyaLexicalPreference",
  "operationId": "classical.denominal.vnc.tiya.lexical.preference.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-tiya-lexical-preference-source",
  "domain": "classical-denominal-vnc-tiya-lexical-preference",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5001"
  ],
  "coordinates": {
    "claim-p5001::p5001-certain-verbstem-formations-prefer-to-use-only-ti-others": {
      "assertionId": "classical-denominal-vnc-tiya-lexical-preference:p5001-certain-verbstem-formations-prefer-to-use-only-ti-others",
      "canonicalPath": "result.operationId"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5001": [
      "tiya-lexical-preference",
      "inceptive-ti-ya",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5001": "authorized"
  }
};
export default Object.freeze(spec);
