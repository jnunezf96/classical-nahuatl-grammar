const spec = {
  "ownerId": "classical-denominal-vnc-hui-absolutive-formation",
  "prefix": "ClassicalDenominalVncHuiAbsolutiveFormation",
  "operationId": "classical.denominal.vnc.hui.absolutive.formation.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-hui-absolutive-formation-source",
  "domain": "classical-denominal-vnc-hui-absolutive-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p4977",
    "claim-p4978"
  ],
  "coordinates": {
    "claim-p4977::p4977-like-ti-it-is-attached-directly-to-the-absolutive": {
      "assertionId": "classical-denominal-vnc-hui-absolutive-formation:p4977-like-ti-it-is-attached-directly-to-the-absolutive",
      "canonicalPath": "result.sourceState"
    },
    "claim-p4978::p4978-the-suffix-hui-is-not-as-prolific-as-ti": {
      "assertionId": "classical-denominal-vnc-hui-absolutive-formation:p4978-the-suffix-hui-is-not-as-prolific-as-ti",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4977": [
      "hui-absolutive-formation",
      "inceptive-hui",
      "default"
    ],
    "claim-p4978": [
      "hui-absolutive-formation",
      "inceptive-hui",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4977": "authorized",
    "claim-p4978": "authorized"
  }
};
export default Object.freeze(spec);
