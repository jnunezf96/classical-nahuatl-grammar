const spec = {
  "ownerId": "classical-place-gentilic-gentilic-preterit-agentive-other",
  "prefix": "ClassicalPlaceGentilicGentilicPreteritAgentiveOther",
  "operationId": "classical.place.gentilic.gentilic.preterit.agentive.other.execute",
  "inputContract": "complete-typed-classical-place-gentilic-gentilic-preterit-agentive-other-source",
  "domain": "classical-place-gentilic-gentilic-preterit-agentive-other",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-place-gentilic-runtime",
  "selections": [
    "claim-p4622",
    "claim-p4623"
  ],
  "coordinates": {
    "claim-p4622::p4622-when-the-embed-is-a-preterit-agentive-nounstem-that": {
      "assertionId": "classical-place-gentilic-gentilic-preterit-agentive-other:p4622-when-the-embed-is-a-preterit-agentive-nounstem-that",
      "canonicalPath": "cases.preteritOtherGentilic.lcmAxisId"
    },
    "claim-p4623::p4623-when-the-embed-is-a-preterit-agentive-nounstem-that": {
      "assertionId": "classical-place-gentilic-gentilic-preterit-agentive-other:p4623-when-the-embed-is-a-preterit-agentive-nounstem-that",
      "canonicalPath": "cases.preteritOtherGentilic.lcmAxisId"
    }
  },
  "executionFunctionName": "buildClassicalPlaceGentilicValidationFrame",
  "executionValidatorName": "isClassicalPlaceGentilicValidationFrame",
  "executionArgsBySelection": {
    "claim-p4622": [],
    "claim-p4623": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4622": "authorized",
    "claim-p4623": "authorized"
  }
};
export default Object.freeze(spec);
