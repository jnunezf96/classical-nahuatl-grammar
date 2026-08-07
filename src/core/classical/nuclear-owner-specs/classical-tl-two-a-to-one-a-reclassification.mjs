const spec = {
  "ownerId": "classical-tl-two-a-to-one-a-reclassification",
  "prefix": "ClassicalTlTwoAToOneAReclassification",
  "operationId": "classical.tl.two.a.to.one.a.reclassification.execute",
  "inputContract": "complete-typed-classical-tl-two-a-to-one-a-reclassification-source",
  "domain": "classical-tl-two-a-to-one-a-reclassification",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-higher-pronominal-nnc-runtime",
  "selections": [
    "claim-p1618",
    "claim-p1619",
    "claim-p1620",
    "claim-p1621"
  ],
  "coordinates": {
    "claim-p1618::p1618-a-subclass-2-a-stem-of-the-ti-class": {
      "assertionId": "classical-tl-two-a-to-one-a-reclassification:p1618-a-subclass-2-a-stem-of-the-ti-class",
      "canonicalPath": "reclassificationContract.greatestCommonDivisor.identityId"
    },
    "claim-p1619::p1619-sometimes-there-is-a-shift-in-meaning": {
      "assertionId": "classical-tl-two-a-to-one-a-reclassification:p1619-sometimes-there-is-a-shift-in-meaning",
      "canonicalPath": "reclassificationContract.leastCommonMultiple.ephemeralILossInventory.0.operation"
    },
    "claim-p1620::p1620-mai-tl-hand-arm-ma-tl-fathom-as-in": {
      "assertionId": "classical-tl-two-a-to-one-a-reclassification:p1620-mai-tl-hand-arm-ma-tl-fathom-as-in",
      "canonicalPath": "reclassificationContract.leastCommonMultiple.targetClassInventory.0.subclass"
    },
    "claim-p1621::p1621-at-other-times-no-change-of-meaning-is-present": {
      "assertionId": "classical-tl-two-a-to-one-a-reclassification:p1621-at-other-times-no-change-of-meaning-is-present",
      "canonicalPath": "reclassificationContract.leastCommonMultiple.semanticOutcomeInventory.1.meaningRelation"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlHigherPronominalNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlHigherPronominalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p1618": [
      "l15-reclassification"
    ],
    "claim-p1619": [
      "l15-reclassification"
    ],
    "claim-p1620": [
      "l15-reclassification"
    ],
    "claim-p1621": [
      "l15-reclassification"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1618": "authorized",
    "claim-p1619": "authorized",
    "claim-p1620": "authorized",
    "claim-p1621": "authorized"
  }
};
export default Object.freeze(spec);
