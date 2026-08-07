const spec = {
  "ownerId": "classical-place-gentilic-gentilic-preterit-agentive-owner",
  "prefix": "ClassicalPlaceGentilicGentilicPreteritAgentiveOwner",
  "operationId": "classical.place.gentilic.gentilic.preterit.agentive.owner.execute",
  "inputContract": "complete-typed-classical-place-gentilic-gentilic-preterit-agentive-owner-source",
  "domain": "classical-place-gentilic-gentilic-preterit-agentive-owner",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-place-gentilic-runtime",
  "selections": [
    "claim-p4618",
    "claim-p4619",
    "claim-p4620",
    "claim-p4621"
  ],
  "coordinates": {
    "claim-p4618::p4618-certain-place-names-are-formed-on-a-preterit-agentive": {
      "assertionId": "classical-place-gentilic-gentilic-preterit-agentive-owner:p4618-certain-place-names-are-formed-on-a-preterit-agentive",
      "canonicalPath": "cases.preteritOwnerGentilic.lcmAxisId"
    },
    "claim-p4619::p4619-this-gentilic-serves-as-the-embed-of-a-relational": {
      "assertionId": "classical-place-gentilic-gentilic-preterit-agentive-owner:p4619-this-gentilic-serves-as-the-embed-of-a-relational",
      "canonicalPath": "cases.preteritOwnerGentilic.lcmAxisId"
    },
    "claim-p4620::p4620-when-the-embed-is-a-preterit-agentive-nounstem-of": {
      "assertionId": "classical-place-gentilic-gentilic-preterit-agentive-owner:p4620-when-the-embed-is-a-preterit-agentive-nounstem-of",
      "canonicalPath": "cases.preteritOwnerGentilic.lcmAxisId"
    },
    "claim-p4621::p4621-when-the-embed-is-a-preterit-agentive-nounstem-of": {
      "assertionId": "classical-place-gentilic-gentilic-preterit-agentive-owner:p4621-when-the-embed-is-a-preterit-agentive-nounstem-of",
      "canonicalPath": "cases.preteritOwnerGentilic.lcmAxisId"
    }
  },
  "executionFunctionName": "buildClassicalPlaceGentilicValidationFrame",
  "executionValidatorName": "isClassicalPlaceGentilicValidationFrame",
  "executionArgsBySelection": {
    "claim-p4618": [],
    "claim-p4619": [],
    "claim-p4620": [],
    "claim-p4621": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4618": "authorized",
    "claim-p4619": "authorized",
    "claim-p4620": "authorized",
    "claim-p4621": "authorized"
  }
};
export default Object.freeze(spec);
