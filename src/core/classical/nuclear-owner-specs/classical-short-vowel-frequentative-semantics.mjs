const spec = {
  "ownerId": "classical-short-vowel-frequentative-semantics",
  "prefix": "ClassicalShortVowelFrequentativeSemantics",
  "operationId": "classical.short.vowel.frequentative.semantics.execute",
  "inputContract": "complete-typed-classical-short-vowel-frequentative-semantics-source",
  "domain": "classical-short-vowel-frequentative-semantics",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-frequentative-runtime",
  "selections": [
    "claim-p2665",
    "claim-p2666"
  ],
  "coordinates": {
    "claim-p2665::p2665-this-formation-is-less-used-than-the-first-two": {
      "assertionId": "classical-short-vowel-frequentative-semantics:p2665-this-formation-is-less-used-than-the-first-two",
      "canonicalPath": "cases.ordinaryShort.operationFacts.shape"
    },
    "claim-p2666::p2666-the-source-may-not-be-extant": {
      "assertionId": "classical-short-vowel-frequentative-semantics:p2666-the-source-may-not-be-extant",
      "canonicalPath": "cases.unattestedOrdinarySource.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlFrequentativeValidationFrame",
  "executionValidatorName": "isClassicalNahuatlFrequentativeValidationFrame",
  "executionArgsBySelection": {
    "claim-p2665": [],
    "claim-p2666": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2665": "authorized",
    "claim-p2666": "authorized"
  }
};
export default Object.freeze(spec);
