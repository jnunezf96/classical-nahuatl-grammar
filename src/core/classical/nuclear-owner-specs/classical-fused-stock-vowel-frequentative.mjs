const spec = {
  "ownerId": "classical-fused-stock-vowel-frequentative",
  "prefix": "ClassicalFusedStockVowelFrequentative",
  "operationId": "classical.fused.stock.vowel.frequentative.execute",
  "inputContract": "complete-typed-classical-fused-stock-vowel-frequentative-source",
  "domain": "classical-fused-stock-vowel-frequentative",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-frequentative-runtime",
  "selections": [
    "claim-p2700",
    "claim-p2701",
    "claim-p2702",
    "claim-p2703",
    "claim-p2704"
  ],
  "coordinates": {
    "claim-p2700::p2700-there-are-irregular-frequentative-stem-formations-based-on-the": {
      "assertionId": "classical-fused-stock-vowel-frequentative:p2700-there-are-irregular-frequentative-stem-formations-based-on-the",
      "canonicalPath": "cases.lexicalizedDestockalIntransitive.operationFacts.fusedStockVowelRemainsLong"
    },
    "claim-p2701::p2701-in-the-frequentative-stem-this-fused-vowel-remains-long": {
      "assertionId": "classical-fused-stock-vowel-frequentative:p2701-in-the-frequentative-stem-this-fused-vowel-remains-long",
      "canonicalPath": "cases.lexicalizedDestockalCausative.targetStem"
    },
    "claim-p2702::p2702-tla-po-po-tz-a-to-makes-th-emit": {
      "assertionId": "classical-fused-stock-vowel-frequentative:p2702-tla-po-po-tz-a-to-makes-th-emit",
      "canonicalPath": "cases.lexicalizedDestockalCausative.operationFacts.semanticForce"
    },
    "claim-p2703::p2703-te-tla-to-to-tz-a-to-spur-s": {
      "assertionId": "classical-fused-stock-vowel-frequentative:p2703-te-tla-to-to-tz-a-to-spur-s",
      "canonicalPath": "cases.lexicalizedDestockalIntransitive.operationFacts.fusedStockVowelRemainsLong"
    },
    "claim-p2704::p2704-tla-pi-pi-tz-a-to-cause-s-th": {
      "assertionId": "classical-fused-stock-vowel-frequentative:p2704-tla-pi-pi-tz-a-to-cause-s-th",
      "canonicalPath": "cases.lexicalizedDestockalCausative.targetStem"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlFrequentativeValidationFrame",
  "executionValidatorName": "isClassicalNahuatlFrequentativeValidationFrame",
  "executionArgsBySelection": {
    "claim-p2700": [],
    "claim-p2701": [],
    "claim-p2702": [],
    "claim-p2703": [],
    "claim-p2704": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2700": "authorized",
    "claim-p2701": "authorized",
    "claim-p2702": "authorized",
    "claim-p2703": "authorized",
    "claim-p2704": "authorized"
  }
};
export default Object.freeze(spec);
