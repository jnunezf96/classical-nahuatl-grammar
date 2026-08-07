const spec = {
  "ownerId": "classical-adverbial-preterit-agentive-obsolete-source",
  "prefix": "ClassicalAdverbialPreteritAgentiveObsoleteSource",
  "operationId": "classical.adverbial.preterit.agentive.obsolete.source.execute",
  "inputContract": "complete-typed-classical-adverbial-preterit-agentive-obsolete-source-source",
  "domain": "classical-adverbial-preterit-agentive-obsolete-source",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-nuclear-runtime",
  "selections": [
    "claim-p4202"
  ],
  "coordinates": {
    "claim-p4202::p4202-in-certain-instances-the-source-verbstem-is-obsolete-i": {
      "assertionId": "classical-adverbial-preterit-agentive-obsolete-source:p4202-in-certain-instances-the-source-verbstem-is-obsolete-i",
      "canonicalPath": "cases.preteritObsolete.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialNuclearValidationFrame",
  "executionValidatorName": "isClassicalAdverbialNuclearValidationFrame",
  "executionArgsBySelection": {
    "claim-p4202": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4202": "authorized"
  }
};
export default Object.freeze(spec);
