const spec = {
  "ownerId": "classical-final-oa-huia-applicative-system",
  "prefix": "ClassicalFinalOaHuiaApplicativeSystem",
  "operationId": "classical.final.oa.huia.applicative.system.execute",
  "inputContract": "complete-typed-classical-final-oa-huia-applicative-system-source",
  "domain": "classical-final-oa-huia-applicative-system",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-applicative-runtime",
  "selections": [
    "claim-p2586",
    "claim-p2587",
    "claim-p2588"
  ],
  "coordinates": {
    "claim-p2586::p2586-a-causative-stem-formed-by-means-of-o-a": {
      "assertionId": "classical-final-oa-huia-applicative-system:p2586-a-causative-stem-formed-by-means-of-o-a",
      "canonicalPath": "formations.suppletiveOa.option.derivationSubtype"
    },
    "claim-p2587::p2587-contrast-this-applic-ative-use-of-huia-with-the": {
      "assertionId": "classical-final-oa-huia-applicative-system:p2587-contrast-this-applic-ative-use-of-huia-with-the",
      "canonicalPath": "formations.suppletiveOa.option.targetStem"
    },
    "claim-p2588::p2588-a-number-of-formations-are-possible-but-all-are": {
      "assertionId": "classical-final-oa-huia-applicative-system:p2588-a-number-of-formations-are-possible-but-all-are",
      "canonicalPath": "formations.suppletiveOa.option.targetClass"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlApplicativeValidationFrame",
  "executionValidatorName": "isClassicalNahuatlApplicativeValidationFrame",
  "executionArgsBySelection": {
    "claim-p2586": [],
    "claim-p2587": [],
    "claim-p2588": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2586": "authorized",
    "claim-p2587": "authorized",
    "claim-p2588": "authorized"
  }
};
export default Object.freeze(spec);
