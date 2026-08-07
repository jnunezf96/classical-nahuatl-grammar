const spec = {
  "ownerId": "classical-adverbial-preterit-agentive-reflexive-shuntline",
  "prefix": "ClassicalAdverbialPreteritAgentiveReflexiveShuntline",
  "operationId": "classical.adverbial.preterit.agentive.reflexive.shuntline.execute",
  "inputContract": "complete-typed-classical-adverbial-preterit-agentive-reflexive-shuntline-source",
  "domain": "classical-adverbial-preterit-agentive-reflexive-shuntline",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-nuclear-runtime",
  "selections": [
    "claim-p4207"
  ],
  "coordinates": {
    "claim-p4207::p4207-as-pointed-out-in-35-5-the-shuntline-form": {
      "assertionId": "classical-adverbial-preterit-agentive-reflexive-shuntline:p4207-as-pointed-out-in-35-5-the-shuntline-form",
      "canonicalPath": "cases.preteritReflexiveShuntline.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialNuclearValidationFrame",
  "executionValidatorName": "isClassicalAdverbialNuclearValidationFrame",
  "executionArgsBySelection": {
    "claim-p4207": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4207": "authorized"
  }
};
export default Object.freeze(spec);
