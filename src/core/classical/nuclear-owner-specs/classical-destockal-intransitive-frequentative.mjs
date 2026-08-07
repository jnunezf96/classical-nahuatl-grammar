const spec = {
  "ownerId": "classical-destockal-intransitive-frequentative",
  "prefix": "ClassicalDestockalIntransitiveFrequentative",
  "operationId": "classical.destockal.intransitive.frequentative.execute",
  "inputContract": "complete-typed-classical-destockal-intransitive-frequentative-source",
  "domain": "classical-destockal-intransitive-frequentative",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-frequentative-runtime",
  "selections": [
    "claim-p2683",
    "claim-p2684",
    "claim-p2685"
  ],
  "coordinates": {
    "claim-p2683::p2683-intransitive-destockal-stems-change-the-theme-suffix-ni-and": {
      "assertionId": "classical-destockal-intransitive-frequentative:p2683-intransitive-destockal-stems-change-the-theme-suffix-ni-and",
      "canonicalPath": "cases.destockalIntransitive.targetStem"
    },
    "claim-p2684::p2684-the-long-vowel-that-serves-as-the-stock-formative": {
      "assertionId": "classical-destockal-intransitive-frequentative:p2684-the-long-vowel-that-serves-as-the-stock-formative",
      "canonicalPath": "cases.destockalIntransitive.operationFacts.stockLongVowelReduced"
    },
    "claim-p2685::p2685-a-stem-formed-with-this-special-frequentative-often-has": {
      "assertionId": "classical-destockal-intransitive-frequentative:p2685-a-stem-formed-with-this-special-frequentative-often-has",
      "canonicalPath": "cases.destockalIntransitive.targetClass"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlFrequentativeValidationFrame",
  "executionValidatorName": "isClassicalNahuatlFrequentativeValidationFrame",
  "executionArgsBySelection": {
    "claim-p2683": [],
    "claim-p2684": [],
    "claim-p2685": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2683": "authorized",
    "claim-p2684": "authorized",
    "claim-p2685": "authorized"
  }
};
export default Object.freeze(spec);
