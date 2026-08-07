const spec = {
  "ownerId": "classical-denominal-vnc-ti-preterit-agentive-source",
  "prefix": "ClassicalDenominalVncTiPreteritAgentiveSource",
  "operationId": "classical.denominal.vnc.ti.preterit.agentive.source.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-ti-preterit-agentive-source-source",
  "domain": "classical-denominal-vnc-ti-preterit-agentive-source",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p4966"
  ],
  "coordinates": {
    "claim-p4966::p4966-a-preterit-agentive-nounstem-may-serve-as-the-source": {
      "assertionId": "classical-denominal-vnc-ti-preterit-agentive-source:p4966-a-preterit-agentive-nounstem-may-serve-as-the-source",
      "canonicalPath": "result.operationId"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4966": [
      "ti-preterit-agentive-source",
      "inceptive-ti",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4966": "authorized"
  }
};
export default Object.freeze(spec);
