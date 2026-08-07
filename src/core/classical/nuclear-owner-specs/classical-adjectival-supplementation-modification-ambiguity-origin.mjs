const spec = {
  "ownerId": "classical-adjectival-supplementation-modification-ambiguity-origin",
  "prefix": "ClassicalAdjectivalSupplementationModificationAmbiguityOrigin",
  "operationId": "classical.adjectival.supplementation.modification.ambiguity.origin.execute",
  "inputContract": "complete-typed-classical-adjectival-supplementation-modification-ambiguity-origin-source",
  "domain": "classical-adjectival-supplementation-modification-ambiguity-origin",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p4027",
    "claim-p4028",
    "claim-p4029",
    "claim-p4030"
  ],
  "coordinates": {
    "claim-p4027::p4027-there-are-two-reasons-for-ambiguity-between-a-structure": {
      "assertionId": "classical-adjectival-supplementation-modification-ambiguity-origin:p4027-there-are-two-reasons-for-ambiguity-between-a-structure",
      "canonicalPath": "sources.supplementation.authorizationStatus"
    },
    "claim-p4028::p4028-second-a-structure-of-adjectival-modification-is-generated-from": {
      "assertionId": "classical-adjectival-supplementation-modification-ambiguity-origin:p4028-second-a-structure-of-adjectival-modification-is-generated-from",
      "canonicalPath": "cases.supplementationModifier.canonicalResult"
    },
    "claim-p4029::p4029-when-one-surveys-the-patterns-theoretically-possible-to-structures": {
      "assertionId": "classical-adjectival-supplementation-modification-ambiguity-origin:p4029-when-one-surveys-the-patterns-theoretically-possible-to-structures",
      "canonicalPath": "contract.sourceAndModificationOperationsRemainSeparate"
    },
    "claim-p4030::p4030-the-probability-that-this-potential-for-ambiguity-will-be": {
      "assertionId": "classical-adjectival-supplementation-modification-ambiguity-origin:p4030-the-probability-that-this-potential-for-ambiguity-will-be",
      "canonicalPath": "sources.supplementation.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p4027": [],
    "claim-p4028": [],
    "claim-p4029": [],
    "claim-p4030": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4027": "authorized",
    "claim-p4028": "authorized",
    "claim-p4029": "authorized",
    "claim-p4030": "authorized"
  }
};
export default Object.freeze(spec);
