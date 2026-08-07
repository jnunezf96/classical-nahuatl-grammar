const spec = {
  "ownerId": "classical-adjectival-head-topicalization-discontinuity",
  "prefix": "ClassicalAdjectivalHeadTopicalizationDiscontinuity",
  "operationId": "classical.adjectival.head.topicalization.discontinuity.execute",
  "inputContract": "complete-typed-classical-adjectival-head-topicalization-discontinuity-source",
  "domain": "classical-adjectival-head-topicalization-discontinuity",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p4093",
    "claim-p4094",
    "claim-p4095"
  ],
  "coordinates": {
    "claim-p4093::p4093-the-modifier-may-be-placed-at-a-distance-from": {
      "assertionId": "classical-adjectival-head-topicalization-discontinuity:p4093-the-modifier-may-be-placed-at-a-distance-from",
      "canonicalPath": "cases.discontinuous.canonicalResult"
    },
    "claim-p4094::p4094-in-addition-to-permitting-the-modifier-to-be-in": {
      "assertionId": "classical-adjectival-head-topicalization-discontinuity:p4094-in-addition-to-permitting-the-modifier-to-be-in",
      "canonicalPath": "cases.discontinuous.topology"
    },
    "claim-p4095::p4095-at-times-the-modifier-is-not-introduced-by-an": {
      "assertionId": "classical-adjectival-head-topicalization-discontinuity:p4095-at-times-the-modifier-is-not-introduced-by-an",
      "canonicalPath": "cases.discontinuous.order"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p4093": [],
    "claim-p4094": [],
    "claim-p4095": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4093": "authorized",
    "claim-p4094": "authorized",
    "claim-p4095": "authorized"
  }
};
export default Object.freeze(spec);
