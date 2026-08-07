const spec = {
  "ownerId": "classical-oya-applicative-source-analysis",
  "prefix": "ClassicalOyaApplicativeSourceAnalysis",
  "operationId": "classical.oya.applicative.source.analysis.execute",
  "inputContract": "complete-typed-classical-oya-applicative-source-analysis-source",
  "domain": "classical-oya-applicative-source-analysis",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-applicative-runtime",
  "selections": [
    "claim-p2582",
    "claim-p2583",
    "claim-p2584",
    "claim-p2585"
  ],
  "coordinates": {
    "claim-p2582::p2582-verb-stems-that-end-in-oya-may-be-intrasitive": {
      "assertionId": "classical-oya-applicative-source-analysis:p2582-verb-stems-that-end-in-oya-may-be-intrasitive",
      "canonicalPath": "formations.transitiveOya.option.targetStem"
    },
    "claim-p2583::p2583-they-create-the-applicative-stem-by-deleting-the-ya": {
      "assertionId": "classical-oya-applicative-source-analysis:p2583-they-create-the-applicative-stem-by-deleting-the-ya",
      "canonicalPath": "formations.valenceNeutralOya.option.targetStem"
    },
    "claim-p2584::p2584-if-a-transitive-stem-ending-in-oya-belongs-to": {
      "assertionId": "classical-oya-applicative-source-analysis:p2584-if-a-transitive-stem-ending-in-oya-belongs-to",
      "canonicalPath": "formations.valenceNeutralOya.option.derivationRoute"
    },
    "claim-p2585::p2585-others-ending-in-oya-use-the-formation-in-exception": {
      "assertionId": "classical-oya-applicative-source-analysis:p2585-others-ending-in-oya-use-the-formation-in-exception",
      "canonicalPath": "formations.transitiveOya.option.targetStem"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlApplicativeValidationFrame",
  "executionValidatorName": "isClassicalNahuatlApplicativeValidationFrame",
  "executionArgsBySelection": {
    "claim-p2582": [],
    "claim-p2583": [],
    "claim-p2584": [],
    "claim-p2585": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2582": "authorized",
    "claim-p2583": "authorized",
    "claim-p2584": "authorized",
    "claim-p2585": "authorized"
  }
};
export default Object.freeze(spec);
