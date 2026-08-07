const spec = {
  "ownerId": "classical-adverbial-preterit-agentive-transitive",
  "prefix": "ClassicalAdverbialPreteritAgentiveTransitive",
  "operationId": "classical.adverbial.preterit.agentive.transitive.execute",
  "inputContract": "complete-typed-classical-adverbial-preterit-agentive-transitive-source",
  "domain": "classical-adverbial-preterit-agentive-transitive",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-nuclear-runtime",
  "selections": [
    "claim-p4206"
  ],
  "coordinates": {
    "claim-p4206::p4206-occasionally-a-transitive-verbstem-may-serve-as-the-source": {
      "assertionId": "classical-adverbial-preterit-agentive-transitive:p4206-occasionally-a-transitive-verbstem-may-serve-as-the-source",
      "canonicalPath": "cases.preteritTransitive.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialNuclearValidationFrame",
  "executionValidatorName": "isClassicalAdverbialNuclearValidationFrame",
  "executionArgsBySelection": {
    "claim-p4206": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4206": "authorized"
  }
};
export default Object.freeze(spec);
