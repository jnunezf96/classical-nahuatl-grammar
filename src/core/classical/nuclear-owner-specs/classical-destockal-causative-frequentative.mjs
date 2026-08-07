const spec = {
  "ownerId": "classical-destockal-causative-frequentative",
  "prefix": "ClassicalDestockalCausativeFrequentative",
  "operationId": "classical.destockal.causative.frequentative.execute",
  "inputContract": "complete-typed-classical-destockal-causative-frequentative-source",
  "domain": "classical-destockal-causative-frequentative",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-frequentative-runtime",
  "selections": [
    "claim-p2693",
    "claim-p2694",
    "claim-p2695"
  ],
  "coordinates": {
    "claim-p2693::p2693-frequentative-causative-destockal-verbstems-are-formed-by-keeping-the": {
      "assertionId": "classical-destockal-causative-frequentative:p2693-frequentative-causative-destockal-verbstems-are-formed-by-keeping-the",
      "canonicalPath": "cases.destockalCausative.targetStem"
    },
    "claim-p2694::p2694-the-long-vowel-that-serves-as-the-stock-formative": {
      "assertionId": "classical-destockal-causative-frequentative:p2694-the-long-vowel-that-serves-as-the-stock-formative",
      "canonicalPath": "cases.destockalCausative.operationFacts.stockLongVowelReduced"
    },
    "claim-p2695::p2695-frequentative-causative-destockal-verbstems-formed-with-tz-a-belong": {
      "assertionId": "classical-destockal-causative-frequentative:p2695-frequentative-causative-destockal-verbstems-formed-with-tz-a-belong",
      "canonicalPath": "cases.destockalCausative.targetClass"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlFrequentativeValidationFrame",
  "executionValidatorName": "isClassicalNahuatlFrequentativeValidationFrame",
  "executionArgsBySelection": {
    "claim-p2693": [],
    "claim-p2694": [],
    "claim-p2695": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2693": "authorized",
    "claim-p2694": "authorized",
    "claim-p2695": "authorized"
  }
};
export default Object.freeze(spec);
