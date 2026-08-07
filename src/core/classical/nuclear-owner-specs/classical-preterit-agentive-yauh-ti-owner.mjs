const spec = {
  "ownerId": "classical-preterit-agentive-yauh-ti-owner",
  "prefix": "ClassicalPreteritAgentiveYauhTiOwner",
  "operationId": "classical.preterit.agentive.yauh.ti.owner.execute",
  "inputContract": "complete-typed-classical-preterit-agentive-yauh-ti-owner-source",
  "domain": "classical-preterit-agentive-yauh-ti-owner",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-deverbal-nnc-runtime",
  "selections": [
    "claim-p3413",
    "claim-p3414"
  ],
  "coordinates": {
    "claim-p3413::p3413-note-3-the-irregular-verb-ya-uh-has-the": {
      "assertionId": "classical-preterit-agentive-yauh-ti-owner:p3413-note-3-the-irregular-verb-ya-uh-has-the",
      "canonicalPath": "cases.preteritYauhOwner.authorizationStatus"
    },
    "claim-p3414::p3414-when-the-possessor-pronoun-te-enters-into-a-predicate": {
      "assertionId": "classical-preterit-agentive-yauh-ti-owner:p3414-when-the-possessor-pronoun-te-enters-into-a-predicate",
      "canonicalPath": "cases.preteritYauhOwner.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlDeverbalNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlDeverbalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3413": [],
    "claim-p3414": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3413": "authorized",
    "claim-p3414": "authorized"
  }
};
export default Object.freeze(spec);
