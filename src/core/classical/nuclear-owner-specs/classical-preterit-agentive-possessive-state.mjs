const spec = {
  "ownerId": "classical-preterit-agentive-possessive-state",
  "prefix": "ClassicalPreteritAgentivePossessiveState",
  "operationId": "classical.preterit.agentive.possessive.state.execute",
  "inputContract": "complete-typed-classical-preterit-agentive-possessive-state-source",
  "domain": "classical-preterit-agentive-possessive-state",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-deverbal-nnc-runtime",
  "selections": [
    "claim-p3411",
    "claim-p3412"
  ],
  "coordinates": {
    "claim-p3411::p3411-since-the-general-use-preterit-agentive-nounstem-belongs-to": {
      "assertionId": "classical-preterit-agentive-possessive-state:p3411-since-the-general-use-preterit-agentive-nounstem-belongs-to",
      "canonicalPath": "cases.preteritPossessive.authorizationStatus"
    },
    "claim-p3412::p3412-if-it-is-plural-the-morphic-dyad-is-hu": {
      "assertionId": "classical-preterit-agentive-possessive-state:p3412-if-it-is-plural-the-morphic-dyad-is-hu",
      "canonicalPath": "cases.preteritPossessive.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlDeverbalNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlDeverbalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3411": [],
    "claim-p3412": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3411": "authorized",
    "claim-p3412": "authorized"
  }
};
export default Object.freeze(spec);
