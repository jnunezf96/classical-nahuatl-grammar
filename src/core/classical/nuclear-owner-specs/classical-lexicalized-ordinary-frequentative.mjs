const spec = {
  "ownerId": "classical-lexicalized-ordinary-frequentative",
  "prefix": "ClassicalLexicalizedOrdinaryFrequentative",
  "operationId": "classical.lexicalized.ordinary.frequentative.execute",
  "inputContract": "complete-typed-classical-lexicalized-ordinary-frequentative-source",
  "domain": "classical-lexicalized-ordinary-frequentative",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-frequentative-runtime",
  "selections": [
    "claim-p2660",
    "claim-p2661"
  ],
  "coordinates": {
    "claim-p2660::p2660-at-times-a-frequentative-stem-has-an-idiomatic-translation": {
      "assertionId": "classical-lexicalized-ordinary-frequentative:p2660-at-times-a-frequentative-stem-has-an-idiomatic-translation",
      "canonicalPath": "cases.lexicalizedOrdinary.targetStem"
    },
    "claim-p2661::p2661-at-times-the-source-stem-is-no-longer-extant": {
      "assertionId": "classical-lexicalized-ordinary-frequentative:p2661-at-times-the-source-stem-is-no-longer-extant",
      "canonicalPath": "cases.unattestedOrdinarySource.targetStem"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlFrequentativeValidationFrame",
  "executionValidatorName": "isClassicalNahuatlFrequentativeValidationFrame",
  "executionArgsBySelection": {
    "claim-p2660": [],
    "claim-p2661": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2660": "authorized",
    "claim-p2661": "authorized"
  }
};
export default Object.freeze(spec);
