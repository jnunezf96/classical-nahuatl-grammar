const spec = {
  "ownerId": "classical-preterit-agentive-preterit-as-present",
  "prefix": "ClassicalPreteritAgentivePreteritAsPresent",
  "operationId": "classical.preterit.agentive.preterit.as.present.execute",
  "inputContract": "complete-typed-classical-preterit-agentive-preterit-as-present-source",
  "domain": "classical-preterit-agentive-preterit-as-present",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-deverbal-nnc-runtime",
  "selections": [
    "claim-p3381",
    "claim-p3382"
  ],
  "coordinates": {
    "claim-p3381::p3381-this-preterit-as-present-agentive-nnc-has-become-frozen": {
      "assertionId": "classical-preterit-agentive-preterit-as-present:p3381-this-preterit-as-present-agentive-nnc-has-become-frozen",
      "canonicalPath": "cases.preteritAsPresent.authorizationStatus"
    },
    "claim-p3382::p3382-aya-c-he-is-not-present-as-an-nnc": {
      "assertionId": "classical-preterit-agentive-preterit-as-present:p3382-aya-c-he-is-not-present-as-an-nnc",
      "canonicalPath": "contract.evidenceRoles.preteritAsPresent"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlDeverbalNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlDeverbalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3381": [],
    "claim-p3382": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3381": "authorized",
    "claim-p3382": "authorized"
  }
};
export default Object.freeze(spec);
