const spec = {
  "ownerId": "classical-denominal-vnc-ti-ia-applicative-formation",
  "prefix": "ClassicalDenominalVncTiIaApplicativeFormation",
  "operationId": "classical.denominal.vnc.ti.ia.applicative.formation.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-ti-ia-applicative-formation-source",
  "domain": "classical-denominal-vnc-ti-ia-applicative-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5106"
  ],
  "coordinates": {
    "claim-p5106::p5106-a-few-intransitive-ti-verbstems-of-either-the-inceptive": {
      "assertionId": "classical-denominal-vnc-ti-ia-applicative-formation:p5106-a-few-intransitive-ti-verbstems-of-either-the-inceptive",
      "canonicalPath": "result.objectCount"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5106": [
      "ti-ia-applicative-formation",
      "ti-ia-applicative",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5106": "authorized"
  }
};
export default Object.freeze(spec);
