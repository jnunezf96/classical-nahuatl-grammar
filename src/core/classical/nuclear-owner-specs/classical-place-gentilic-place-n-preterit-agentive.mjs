const spec = {
  "ownerId": "classical-place-gentilic-place-n-preterit-agentive",
  "prefix": "ClassicalPlaceGentilicPlaceNPreteritAgentive",
  "operationId": "classical.place.gentilic.place.n.preterit.agentive.execute",
  "inputContract": "complete-typed-classical-place-gentilic-place-n-preterit-agentive-source",
  "domain": "classical-place-gentilic-place-n-preterit-agentive",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-place-gentilic-runtime",
  "selections": [
    "claim-p4581",
    "claim-p4582",
    "claim-p4583"
  ],
  "coordinates": {
    "claim-p4581::p4581-the-formation-can-use-the-n-tli-of-46": {
      "assertionId": "classical-place-gentilic-place-n-preterit-agentive:p4581-the-formation-can-use-the-n-tli-of-46",
      "canonicalPath": "cases.nPreterit.canonicalFrame"
    },
    "claim-p4582::p4582-the-embed-is-frequently-the-general-use-stem-of": {
      "assertionId": "classical-place-gentilic-place-n-preterit-agentive:p4582-the-embed-is-frequently-the-general-use-stem-of",
      "canonicalPath": "cases.nPreterit.lcmAxisId"
    }
  },
  "executionFunctionName": "buildClassicalPlaceGentilicValidationFrame",
  "executionValidatorName": "isClassicalPlaceGentilicValidationFrame",
  "executionArgsBySelection": {
    "claim-p4581": [],
    "claim-p4582": [],
    "claim-p4583": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4581": "authorized",
    "claim-p4582": "authorized",
    "claim-p4583": "authorized"
  }
};
export default Object.freeze(spec);
