const spec = {
  "ownerId": "classical-adverbial-iuh-vnc-adverbial-contrast",
  "prefix": "ClassicalAdverbialIuhVncAdverbialContrast",
  "operationId": "classical.adverbial.iuh.vnc.adverbial.contrast.execute",
  "inputContract": "complete-typed-classical-adverbial-iuh-vnc-adverbial-contrast-source",
  "domain": "classical-adverbial-iuh-vnc-adverbial-contrast",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-nuclear-runtime",
  "selections": [
    "claim-p4151",
    "claim-p4152"
  ],
  "coordinates": {
    "claim-p4151::p4151-the-preterit-agentive-nnc-iuhqui-iuh-qui-it-is": {
      "assertionId": "classical-adverbial-iuh-vnc-adverbial-contrast:p4151-the-preterit-agentive-nnc-iuhqui-iuh-qui-it-is",
      "canonicalPath": "cases.vncContrast.canonicalResult"
    },
    "claim-p4152::p4152-the-subject-pronoun-can-therefore-be-other-than-third": {
      "assertionId": "classical-adverbial-iuh-vnc-adverbial-contrast:p4152-the-subject-pronoun-can-therefore-be-other-than-third",
      "canonicalPath": "cases.vncContrast.lexicalEntryId"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialNuclearValidationFrame",
  "executionValidatorName": "isClassicalAdverbialNuclearValidationFrame",
  "executionArgsBySelection": {
    "claim-p4151": [],
    "claim-p4152": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4151": "authorized",
    "claim-p4152": "authorized"
  }
};
export default Object.freeze(spec);
