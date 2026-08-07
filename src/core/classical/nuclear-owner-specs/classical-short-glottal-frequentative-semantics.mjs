const spec = {
  "ownerId": "classical-short-glottal-frequentative-semantics",
  "prefix": "ClassicalShortGlottalFrequentativeSemantics",
  "operationId": "classical.short.glottal.frequentative.semantics.execute",
  "inputContract": "complete-typed-classical-short-glottal-frequentative-semantics-source",
  "domain": "classical-short-glottal-frequentative-semantics",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-frequentative-runtime",
  "selections": [
    "claim-p2659"
  ],
  "coordinates": {
    "claim-p2659::p2659-generally-speaking-this-formation-signifies-intensity-with-the-implication": {
      "assertionId": "classical-short-glottal-frequentative-semantics:p2659-generally-speaking-this-formation-signifies-intensity-with-the-implication",
      "canonicalPath": "cases.ordinaryShortGlottal.operationFacts.shape"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlFrequentativeValidationFrame",
  "executionValidatorName": "isClassicalNahuatlFrequentativeValidationFrame",
  "executionArgsBySelection": {
    "claim-p2659": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2659": "authorized"
  }
};
export default Object.freeze(spec);
