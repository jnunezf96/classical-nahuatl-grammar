const spec = {
  "ownerId": "classical-denominal-vnc-hui-vowel-class",
  "prefix": "ClassicalDenominalVncHuiVowelClass",
  "operationId": "classical.denominal.vnc.hui.vowel.class.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-hui-vowel-class-source",
  "domain": "classical-denominal-vnc-hui-vowel-class",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p4982",
    "claim-p4983"
  ],
  "coordinates": {
    "claim-p4982::p4982-if-it-ends-in-a-vowel-the-verbstem-belongs": {
      "assertionId": "classical-denominal-vnc-hui-vowel-class:p4982-if-it-ends-in-a-vowel-the-verbstem-belongs",
      "canonicalPath": "result.targetClass"
    },
    "claim-p4983::p4983-if-it-ends-in-a-vowel": {
      "assertionId": "classical-denominal-vnc-hui-vowel-class:p4983-if-it-ends-in-a-vowel",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4982": [
      "hui-vowel-class",
      "inceptive-hui",
      "vowel-source"
    ],
    "claim-p4983": [
      "hui-vowel-class",
      "inceptive-hui",
      "vowel-source"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4982": "authorized",
    "claim-p4983": "authorized"
  }
};
export default Object.freeze(spec);
