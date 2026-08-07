const spec = {
  "ownerId": "classical-adverbial-preterit-agentive-root-plus-ya",
  "prefix": "ClassicalAdverbialPreteritAgentiveRootPlusYa",
  "operationId": "classical.adverbial.preterit.agentive.root.plus.ya.execute",
  "inputContract": "complete-typed-classical-adverbial-preterit-agentive-root-plus-ya-source",
  "domain": "classical-adverbial-preterit-agentive-root-plus-ya",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-nuclear-runtime",
  "selections": [
    "claim-p4203"
  ],
  "coordinates": {
    "claim-p4203::p4203-all-of-the-adjectival-preterit-agentive-nncs-formed-on": {
      "assertionId": "classical-adverbial-preterit-agentive-root-plus-ya:p4203-all-of-the-adjectival-preterit-agentive-nncs-formed-on",
      "canonicalPath": "cases.preteritRootYa.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialNuclearValidationFrame",
  "executionValidatorName": "isClassicalAdverbialNuclearValidationFrame",
  "executionArgsBySelection": {
    "claim-p4203": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4203": "authorized"
  }
};
export default Object.freeze(spec);
