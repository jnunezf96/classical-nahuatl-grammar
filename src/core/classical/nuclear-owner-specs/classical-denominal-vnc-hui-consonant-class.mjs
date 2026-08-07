const spec = {
  "ownerId": "classical-denominal-vnc-hui-consonant-class",
  "prefix": "ClassicalDenominalVncHuiConsonantClass",
  "operationId": "classical.denominal.vnc.hui.consonant.class.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-hui-consonant-class-source",
  "domain": "classical-denominal-vnc-hui-consonant-class",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p4980",
    "claim-p4981"
  ],
  "coordinates": {
    "claim-p4980::p4980-if-the-source-stem-ends-in-a-consonant-denominal": {
      "assertionId": "classical-denominal-vnc-hui-consonant-class:p4980-if-the-source-stem-ends-in-a-consonant-denominal",
      "canonicalPath": "result.targetClass"
    },
    "claim-p4981::p4981-if-the-source-stem-ends-in-a-consonant": {
      "assertionId": "classical-denominal-vnc-hui-consonant-class:p4981-if-the-source-stem-ends-in-a-consonant",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4980": [
      "hui-consonant-class",
      "inceptive-hui",
      "default"
    ],
    "claim-p4981": [
      "hui-consonant-class",
      "inceptive-hui",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4980": "authorized",
    "claim-p4981": "authorized"
  }
};
export default Object.freeze(spec);
