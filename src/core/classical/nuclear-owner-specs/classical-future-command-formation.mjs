const spec = {
  "ownerId": "classical-future-command-formation",
  "prefix": "ClassicalFutureCommandFormation",
  "operationId": "classical.future.command.formation.execute",
  "inputContract": "complete-typed-classical-future-command-formation-source",
  "domain": "classical-future-command-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-future-command-formation",
  "selections": [
    "claim-p1087",
    "claim-p1088"
  ],
  "coordinates": {
    "claim-p1087::p1087-future-command-sentences-a-command-seeking-compliance-at-a": {
      "assertionId": "classical-future-command-formation:p1087-future-command-sentences-a-command-seeking-compliance-at-a",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1088::p1088-future-uses-a-future-indicative-as-optative-vnc-in": {
      "assertionId": "classical-future-command-formation:p1088-future-uses-a-future-indicative-as-optative-vnc-in",
      "canonicalPath": "authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlOptativeValidationFrame",
  "executionValidatorName": "isClassicalNahuatlOptativeValidationFrame",
  "executionArgsBySelection": {
    "claim-p1087": [
      "future-command"
    ],
    "claim-p1088": [
      "future-command"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1087": "authorized",
    "claim-p1088": "authorized"
  }
};
export default Object.freeze(spec);
