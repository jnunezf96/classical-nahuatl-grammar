const spec = {
  "ownerId": "classical-adjectival-supplement-incorporated-adverb-source",
  "prefix": "ClassicalAdjectivalSupplementIncorporatedAdverbSource",
  "operationId": "classical.adjectival.supplement.incorporated.adverb.source.execute",
  "inputContract": "complete-typed-classical-adjectival-supplement-incorporated-adverb-source-source",
  "domain": "classical-adjectival-supplement-incorporated-adverb-source",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p3987",
    "claim-p3988"
  ],
  "coordinates": {
    "claim-p3987::p3987-the-adverb-may-be-incorporated-according-to-30-14": {
      "assertionId": "classical-adjectival-supplement-incorporated-adverb-source:p3987-the-adverb-may-be-incorporated-according-to-30-14",
      "canonicalPath": "sources.supplementation.authorizationStatus"
    },
    "claim-p3988::p3988-there-are-two-subtypes-of-the-formation": {
      "assertionId": "classical-adjectival-supplement-incorporated-adverb-source:p3988-there-are-two-subtypes-of-the-formation",
      "canonicalPath": "cases.supplementationModifier.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p3987": [],
    "claim-p3988": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3987": "authorized",
    "claim-p3988": "authorized"
  }
};
export default Object.freeze(spec);
