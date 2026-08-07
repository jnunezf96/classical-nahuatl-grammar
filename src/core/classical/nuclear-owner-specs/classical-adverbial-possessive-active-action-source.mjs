const spec = {
  "ownerId": "classical-adverbial-possessive-active-action-source",
  "prefix": "ClassicalAdverbialPossessiveActiveActionSource",
  "operationId": "classical.adverbial.possessive.active.action.source.execute",
  "inputContract": "complete-typed-classical-adverbial-possessive-active-action-source-source",
  "domain": "classical-adverbial-possessive-active-action-source",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-nuclear-runtime",
  "selections": [
    "claim-p4212"
  ],
  "coordinates": {
    "claim-p4212::p4212-from-the-verbstem-iyo-a-see-44-3-11": {
      "assertionId": "classical-adverbial-possessive-active-action-source:p4212-from-the-verbstem-iyo-a-see-44-3-11",
      "canonicalPath": "cases.possessiveActive.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialNuclearValidationFrame",
  "executionValidatorName": "isClassicalAdverbialNuclearValidationFrame",
  "executionArgsBySelection": {
    "claim-p4212": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4212": "authorized"
  }
};
export default Object.freeze(spec);
