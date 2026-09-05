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
      "canonicalPath": "constraints.fusedStockVowelFrequentativeSystem.formationScope"
    },
    "claim-p2700::aci-p247-l033-8eeeaac63f-fused-source-frequentative-formation-scope": {
      "assertionId": "classical-fused-stock-vowel-frequentative:aci-p247-l033-8eeeaac63f-fused-source-frequentative-formation-scope",
      "canonicalPath": "constraints.fusedStockVowelFrequentativeSystem.formationScope"
    },
    "claim-p2701::p2701-in-the-frequentative-stem-this-fused-vowel-remains-long": {
      "assertionId": "classical-fused-stock-vowel-frequentative:p2701-in-the-frequentative-stem-this-fused-vowel-remains-long",
      "canonicalPath": "constraints.fusedStockVowelFrequentativeSystem.longVowelRetention"
    },
    "claim-p2701::aci-p247-l034-5663d65b8d-fused-vowel-remains-long": {
      "assertionId": "classical-fused-stock-vowel-frequentative:aci-p247-l034-5663d65b8d-fused-vowel-remains-long",
      "canonicalPath": "constraints.fusedStockVowelFrequentativeSystem.longVowelRetention"
    },
    "claim-p2702::p2702-tla-po-po-tz-a-to-makes-th-emit": {
      "assertionId": "classical-fused-stock-vowel-frequentative:p2702-tla-po-po-tz-a-to-makes-th-emit",
      "canonicalPath": "constraints.fusedStockVowelFrequentativeSystem.lexicalCausatives.popotza"
    },
    "claim-p2702::aci-p247-l037-76a99f08c2-popotza-causative-reading": {
      "assertionId": "classical-fused-stock-vowel-frequentative:aci-p247-l037-76a99f08c2-popotza-causative-reading",
      "canonicalPath": "constraints.fusedStockVowelFrequentativeSystem.lexicalCausatives.popotza"
    },
    "claim-p2703::p2703-te-tla-to-to-tz-a-to-spur-s": {
      "assertionId": "classical-fused-stock-vowel-frequentative:p2703-te-tla-to-to-tz-a-to-spur-s",
      "canonicalPath": "constraints.fusedStockVowelFrequentativeSystem.lexicalCausatives.tototza"
    },
    "claim-p2703::aci-p247-l039-6dd10064fa-tototza-participant-alternation": {
      "assertionId": "classical-fused-stock-vowel-frequentative:aci-p247-l039-6dd10064fa-tototza-participant-alternation",
      "canonicalPath": "constraints.fusedStockVowelFrequentativeSystem.lexicalCausatives.tototza"
    },
    "claim-p2704::p2704-tla-pi-pi-tz-a-to-cause-s-th": {
      "assertionId": "classical-fused-stock-vowel-frequentative:p2704-tla-pi-pi-tz-a-to-cause-s-th",
      "canonicalPath": "constraints.fusedStockVowelFrequentativeSystem.lexicalCausatives.pipitza"
    },
    "claim-p2704::aci-p248-l003-3c6186d887-pipitza-causative-reading": {
      "assertionId": "classical-fused-stock-vowel-frequentative:aci-p248-l003-3c6186d887-pipitza-causative-reading",
      "canonicalPath": "constraints.fusedStockVowelFrequentativeSystem.lexicalCausatives.pipitza"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlFrequentativeValidationFrame",
  "executionValidatorName": "isClassicalNahuatlFrequentativeValidationFrame",
  "executionArgsBySelection": {
    "claim-p2700": [{ "observation": "fused-stock-system" }],
    "claim-p2701": [{ "observation": "fused-stock-system" }],
    "claim-p2702": [{ "observation": "fused-stock-lexical", "lexicalSelection": "popotza" }],
    "claim-p2703": [{ "observation": "fused-stock-lexical", "lexicalSelection": "tototza" }],
    "claim-p2704": [{ "observation": "fused-stock-lexical", "lexicalSelection": "pipitza" }]
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
