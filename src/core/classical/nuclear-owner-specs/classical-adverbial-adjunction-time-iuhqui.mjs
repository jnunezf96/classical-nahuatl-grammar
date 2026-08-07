const spec = {
  "ownerId": "classical-adverbial-adjunction-time-iuhqui",
  "prefix": "ClassicalAdverbialAdjunctionTimeIuhqui",
  "operationId": "classical.adverbial.adjunction.time.iuhqui.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-time-iuhqui-source",
  "domain": "classical-adverbial-adjunction-time-iuhqui",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4704"
  ],
  "coordinates": {
    "claim-p4704::p4704-the-preterit-agentive-nnc-iuhqui-it-is-a-thing": {
      "assertionId": "classical-adverbial-adjunction-time-iuhqui:p4704-the-preterit-agentive-nnc-iuhqui-it-is-a-thing",
      "canonicalPath": "analysis.temporalIuhquiLicensed"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4704": [
      "time-iuhqui"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4704": "authorized"
  }
};
export default Object.freeze(spec);
