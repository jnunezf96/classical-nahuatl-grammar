const spec = {
  "ownerId": "classical-adverbial-possessive-active-action-nohmatca",
  "prefix": "ClassicalAdverbialPossessiveActiveActionNohmatca",
  "operationId": "classical.adverbial.possessive.active.action.nohmatca.execute",
  "inputContract": "complete-typed-classical-adverbial-possessive-active-action-nohmatca-source",
  "domain": "classical-adverbial-possessive-active-action-nohmatca",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-nuclear-runtime",
  "selections": [
    "claim-p4216"
  ],
  "coordinates": {
    "claim-p4216::p4216-nncs-can-be-built-on-the-active-action-nounstem": {
      "assertionId": "classical-adverbial-possessive-active-action-nohmatca:p4216-nncs-can-be-built-on-the-active-action-nounstem",
      "canonicalPath": "cases.possessiveAction.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialNuclearValidationFrame",
  "executionValidatorName": "isClassicalAdverbialNuclearValidationFrame",
  "executionArgsBySelection": {
    "claim-p4216": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4216": "authorized"
  }
};
export default Object.freeze(spec);
