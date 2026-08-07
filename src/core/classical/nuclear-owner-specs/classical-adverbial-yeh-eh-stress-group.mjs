const spec = {
  "ownerId": "classical-adverbial-yeh-eh-stress-group",
  "prefix": "ClassicalAdverbialYehEhStressGroup",
  "operationId": "classical.adverbial.yeh.eh.stress.group.execute",
  "inputContract": "complete-typed-classical-adverbial-yeh-eh-stress-group-source",
  "domain": "classical-adverbial-yeh-eh-stress-group",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-nuclear-runtime",
  "selections": [
    "claim-p4193"
  ],
  "coordinates": {
    "claim-p4193::p4193-as-in-44-5-5-and-44-5-6": {
      "assertionId": "classical-adverbial-yeh-eh-stress-group:p4193-as-in-44-5-5-and-44-5-6",
      "canonicalPath": "cases.stressGroup.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialNuclearValidationFrame",
  "executionValidatorName": "isClassicalAdverbialNuclearValidationFrame",
  "executionArgsBySelection": {
    "claim-p4193": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4193": "authorized"
  }
};
export default Object.freeze(spec);
