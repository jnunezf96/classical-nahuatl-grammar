const spec = {
  "ownerId": "classical-adverbial-preterit-agentive-full-stem",
  "prefix": "ClassicalAdverbialPreteritAgentiveFullStem",
  "operationId": "classical.adverbial.preterit.agentive.full.stem.execute",
  "inputContract": "complete-typed-classical-adverbial-preterit-agentive-full-stem-source",
  "domain": "classical-adverbial-preterit-agentive-full-stem",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-nuclear-runtime",
  "selections": [
    "claim-p4204"
  ],
  "coordinates": {
    "claim-p4204::p4204-other-root-plus-ya-verbs-use-the-full-stem": {
      "assertionId": "classical-adverbial-preterit-agentive-full-stem:p4204-other-root-plus-ya-verbs-use-the-full-stem",
      "canonicalPath": "cases.preteritFullStem.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialNuclearValidationFrame",
  "executionValidatorName": "isClassicalAdverbialNuclearValidationFrame",
  "executionArgsBySelection": {
    "claim-p4204": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4204": "authorized"
  }
};
export default Object.freeze(spec);
