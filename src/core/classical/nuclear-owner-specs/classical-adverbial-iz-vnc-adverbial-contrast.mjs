const spec = {
  "ownerId": "classical-adverbial-iz-vnc-adverbial-contrast",
  "prefix": "ClassicalAdverbialIzVncAdverbialContrast",
  "operationId": "classical.adverbial.iz.vnc.adverbial.contrast.execute",
  "inputContract": "complete-typed-classical-adverbial-iz-vnc-adverbial-contrast-source",
  "domain": "classical-adverbial-iz-vnc-adverbial-contrast",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-nuclear-runtime",
  "selections": [
    "claim-p4153",
    "claim-p4154"
  ],
  "coordinates": {
    "claim-p4153::p4153-since-the-verb-bui-tz-has-no-optative-the": {
      "assertionId": "classical-adverbial-iz-vnc-adverbial-contrast:p4153-since-the-verb-bui-tz-has-no-optative-the",
      "canonicalPath": "cases.vncIzContrast.canonicalResult"
    },
    "claim-p4154::p4154-the-preterit-agentive-nnc-izqui-iz-qui-it-is": {
      "assertionId": "classical-adverbial-iz-vnc-adverbial-contrast:p4154-the-preterit-agentive-nnc-izqui-iz-qui-it-is",
      "canonicalPath": "cases.vncIzContrast.lexicalEntryId"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialNuclearValidationFrame",
  "executionValidatorName": "isClassicalAdverbialNuclearValidationFrame",
  "executionArgsBySelection": {
    "claim-p4153": [],
    "claim-p4154": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4153": "authorized",
    "claim-p4154": "authorized"
  }
};
export default Object.freeze(spec);
