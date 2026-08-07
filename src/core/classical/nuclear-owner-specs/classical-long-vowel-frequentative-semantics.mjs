const spec = {
  "ownerId": "classical-long-vowel-frequentative-semantics",
  "prefix": "ClassicalLongVowelFrequentativeSemantics",
  "operationId": "classical.long.vowel.frequentative.semantics.execute",
  "inputContract": "complete-typed-classical-long-vowel-frequentative-semantics-source",
  "domain": "classical-long-vowel-frequentative-semantics",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-frequentative-runtime",
  "selections": [
    "claim-p2664"
  ],
  "coordinates": {
    "claim-p2664::p2664-generally-speaking-this-formation-signifies-intensity-with-the-implication": {
      "assertionId": "classical-long-vowel-frequentative-semantics:p2664-generally-speaking-this-formation-signifies-intensity-with-the-implication",
      "canonicalPath": "cases.ordinaryLong.operationFacts.shape"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlFrequentativeValidationFrame",
  "executionValidatorName": "isClassicalNahuatlFrequentativeValidationFrame",
  "executionArgsBySelection": {
    "claim-p2664": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2664": "authorized"
  }
};
export default Object.freeze(spec);
