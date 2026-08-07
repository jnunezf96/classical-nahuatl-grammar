const spec = {
  "ownerId": "classical-denominal-vnc-ti-vowel-class-alternation",
  "prefix": "ClassicalDenominalVncTiVowelClassAlternation",
  "operationId": "classical.denominal.vnc.ti.vowel.class.alternation.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-ti-vowel-class-alternation-source",
  "domain": "classical-denominal-vnc-ti-vowel-class-alternation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p4974",
    "claim-p4975"
  ],
  "coordinates": {
    "claim-p4974::p4974-if-the-nounstem-source-ends-in-a-vowel": {
      "assertionId": "classical-denominal-vnc-ti-vowel-class-alternation:p4974-if-the-nounstem-source-ends-in-a-vowel",
      "canonicalPath": "result.targetClass"
    },
    "claim-p4975::p4975-if-the-nounstem-source-ends-in-a-vowel-the": {
      "assertionId": "classical-denominal-vnc-ti-vowel-class-alternation:p4975-if-the-nounstem-source-ends-in-a-vowel-the",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4974": [
      "ti-vowel-class-alternation",
      "inceptive-ti",
      "vowel-source"
    ],
    "claim-p4975": [
      "ti-vowel-class-alternation",
      "inceptive-ti",
      "vowel-source"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4974": "authorized",
    "claim-p4975": "authorized"
  }
};
export default Object.freeze(spec);
