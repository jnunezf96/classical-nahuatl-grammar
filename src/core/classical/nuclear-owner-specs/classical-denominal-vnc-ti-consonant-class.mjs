const spec = {
  "ownerId": "classical-denominal-vnc-ti-consonant-class",
  "prefix": "ClassicalDenominalVncTiConsonantClass",
  "operationId": "classical.denominal.vnc.ti.consonant.class.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-ti-consonant-class-source",
  "domain": "classical-denominal-vnc-ti-consonant-class",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p4972",
    "claim-p4973"
  ],
  "coordinates": {
    "claim-p4972::p4972-when-their-nounstem-source-ends-in-a-consonant": {
      "assertionId": "classical-denominal-vnc-ti-consonant-class:p4972-when-their-nounstem-source-ends-in-a-consonant",
      "canonicalPath": "result.targetClass"
    },
    "claim-p4973::p4973-denominal-ti-verbstems-belong-to-class-a-when-their": {
      "assertionId": "classical-denominal-vnc-ti-consonant-class:p4973-denominal-ti-verbstems-belong-to-class-a-when-their",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4972": [
      "ti-consonant-class",
      "inceptive-ti",
      "default"
    ],
    "claim-p4973": [
      "ti-consonant-class",
      "inceptive-ti",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4972": "authorized",
    "claim-p4973": "authorized"
  }
};
export default Object.freeze(spec);
