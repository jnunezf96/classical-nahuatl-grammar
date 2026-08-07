const spec = {
  "ownerId": "classical-lexicalized-destockal-frequentative",
  "prefix": "ClassicalLexicalizedDestockalFrequentative",
  "operationId": "classical.lexicalized.destockal.frequentative.execute",
  "inputContract": "complete-typed-classical-lexicalized-destockal-frequentative-source",
  "domain": "classical-lexicalized-destockal-frequentative",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-frequentative-runtime",
  "selections": [
    "claim-p2696",
    "claim-p2697",
    "claim-p2698",
    "claim-p2699"
  ],
  "coordinates": {
    "claim-p2696::p2696-at-times-the-original-destockal-verbstem-is-no-longer": {
      "assertionId": "classical-lexicalized-destockal-frequentative:p2696-at-times-the-original-destockal-verbstem-is-no-longer",
      "canonicalPath": "cases.lexicalizedDestockalIntransitive.operationFacts.lexicalizedDestockal"
    },
    "claim-p2697::p2697-chi-chin-a-ca-to-be-in-pain": {
      "assertionId": "classical-lexicalized-destockal-frequentative:p2697-chi-chin-a-ca-to-be-in-pain",
      "canonicalPath": "cases.lexicalizedDestockalIntransitive.targetStem"
    },
    "claim-p2698::p2698-te-chi-cbin-a-tz-a-to-torment-s": {
      "assertionId": "classical-lexicalized-destockal-frequentative:p2698-te-chi-cbin-a-tz-a-to-torment-s",
      "canonicalPath": "cases.lexicalizedDestockalApplicative.operationFacts.semanticForce"
    },
    "claim-p2699::p2699-te-qui-quin-a-tz-a-to-growl-at": {
      "assertionId": "classical-lexicalized-destockal-frequentative:p2699-te-qui-quin-a-tz-a-to-growl-at",
      "canonicalPath": "cases.lexicalizedDestockalIntransitive.operationFacts.lexicalizedDestockal"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlFrequentativeValidationFrame",
  "executionValidatorName": "isClassicalNahuatlFrequentativeValidationFrame",
  "executionArgsBySelection": {
    "claim-p2696": [],
    "claim-p2697": [],
    "claim-p2698": [],
    "claim-p2699": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2696": "authorized",
    "claim-p2697": "authorized",
    "claim-p2698": "authorized",
    "claim-p2699": "authorized"
  }
};
export default Object.freeze(spec);
