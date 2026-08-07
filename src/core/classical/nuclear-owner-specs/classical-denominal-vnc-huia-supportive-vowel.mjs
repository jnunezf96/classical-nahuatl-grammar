const spec = {
  "ownerId": "classical-denominal-vnc-huia-supportive-vowel",
  "prefix": "ClassicalDenominalVncHuiaSupportiveVowel",
  "operationId": "classical.denominal.vnc.huia.supportive.vowel.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-huia-supportive-vowel-source",
  "domain": "classical-denominal-vnc-huia-supportive-vowel",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5125"
  ],
  "coordinates": {
    "claim-p5125::p5125-the-initial-i-on-the-stem-is-a-supportive": {
      "assertionId": "classical-denominal-vnc-huia-supportive-vowel:p5125-the-initial-i-on-the-stem-is-a-supportive",
      "canonicalPath": "result.operationId"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5125": [
      "huia-supportive-vowel",
      "applicative-huia-use",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5125": "authorized"
  }
};
export default Object.freeze(spec);
