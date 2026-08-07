const spec = {
  "ownerId": "classical-adverbial-preterit-agentive-irregular",
  "prefix": "ClassicalAdverbialPreteritAgentiveIrregular",
  "operationId": "classical.adverbial.preterit.agentive.irregular.execute",
  "inputContract": "complete-typed-classical-adverbial-preterit-agentive-irregular-source",
  "domain": "classical-adverbial-preterit-agentive-irregular",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-nuclear-runtime",
  "selections": [
    "claim-p4205"
  ],
  "coordinates": {
    "claim-p4205::p4205-at-times-the-adverbialized-preterit-agentive-nnc-is-irregular": {
      "assertionId": "classical-adverbial-preterit-agentive-irregular:p4205-at-times-the-adverbialized-preterit-agentive-nnc-is-irregular",
      "canonicalPath": "cases.preteritIrregular.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialNuclearValidationFrame",
  "executionValidatorName": "isClassicalAdverbialNuclearValidationFrame",
  "executionArgsBySelection": {
    "claim-p4205": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4205": "authorized"
  }
};
export default Object.freeze(spec);
