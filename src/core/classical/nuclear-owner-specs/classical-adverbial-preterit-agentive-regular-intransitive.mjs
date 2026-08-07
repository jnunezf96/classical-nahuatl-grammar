const spec = {
  "ownerId": "classical-adverbial-preterit-agentive-regular-intransitive",
  "prefix": "ClassicalAdverbialPreteritAgentiveRegularIntransitive",
  "operationId": "classical.adverbial.preterit.agentive.regular.intransitive.execute",
  "inputContract": "complete-typed-classical-adverbial-preterit-agentive-regular-intransitive-source",
  "domain": "classical-adverbial-preterit-agentive-regular-intransitive",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-nuclear-runtime",
  "selections": [
    "claim-p4201"
  ],
  "coordinates": {
    "claim-p4201::p4201-the-source-for-these-adverbialized-preterit-agentive-nncs-is": {
      "assertionId": "classical-adverbial-preterit-agentive-regular-intransitive:p4201-the-source-for-these-adverbialized-preterit-agentive-nncs-is",
      "canonicalPath": "cases.preteritRegular.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialNuclearValidationFrame",
  "executionValidatorName": "isClassicalAdverbialNuclearValidationFrame",
  "executionArgsBySelection": {
    "claim-p4201": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4201": "authorized"
  }
};
export default Object.freeze(spec);
