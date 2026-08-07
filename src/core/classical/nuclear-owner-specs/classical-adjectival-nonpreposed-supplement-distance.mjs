const spec = {
  "ownerId": "classical-adjectival-nonpreposed-supplement-distance",
  "prefix": "ClassicalAdjectivalNonpreposedSupplementDistance",
  "operationId": "classical.adjectival.nonpreposed.supplement.distance.execute",
  "inputContract": "complete-typed-classical-adjectival-nonpreposed-supplement-distance-source",
  "domain": "classical-adjectival-nonpreposed-supplement-distance",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p4088",
    "claim-p4089",
    "claim-p4090"
  ],
  "coordinates": {
    "claim-p4088::p4088-a-nonpreposed-adjectival-adjunct-may-contain-supplementary-elements-not": {
      "assertionId": "classical-adjectival-nonpreposed-supplement-distance:p4088-a-nonpreposed-adjectival-adjunct-may-contain-supplementary-elements-not",
      "canonicalPath": "cases.supplementationModifier.canonicalResult"
    },
    "claim-p4089::p4089-a-supplementary-element-in-the-adjectival-adjunct-may-be": {
      "assertionId": "classical-adjectival-nonpreposed-supplement-distance:p4089-a-supplementary-element-in-the-adjectival-adjunct-may-be",
      "canonicalPath": "cases.supplementationModifier.modifierClauseType"
    },
    "claim-p4090::p4090-since-english-is-not-fond-of-this-arrangement-translation": {
      "assertionId": "classical-adjectival-nonpreposed-supplement-distance:p4090-since-english-is-not-fond-of-this-arrangement-translation",
      "canonicalPath": "sources.supplementation.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p4088": [],
    "claim-p4089": [],
    "claim-p4090": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4088": "authorized",
    "claim-p4089": "authorized",
    "claim-p4090": "authorized"
  }
};
export default Object.freeze(spec);
