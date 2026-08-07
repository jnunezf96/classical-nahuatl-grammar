const spec = {
  "ownerId": "classical-possessive-plural-final-w-assimilation",
  "prefix": "ClassicalPossessivePluralFinalWAssimilation",
  "operationId": "classical.possessive.plural.final.w.assimilation.execute",
  "inputContract": "complete-typed-classical-possessive-plural-final-w-assimilation-source",
  "domain": "classical-possessive-plural-final-w-assimilation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-higher-pronominal-nnc-runtime",
  "selections": [
    "claim-p1588",
    "claim-p1589",
    "claim-p1590",
    "claim-p1591",
    "claim-p1592"
  ],
  "coordinates": {
    "claim-p1588::p1588-because-of-the-w-in-the-number-dyad-hu": {
      "assertionId": "classical-possessive-plural-final-w-assimilation:p1588-because-of-the-w-in-the-number-dyad-hu",
      "canonicalPath": "higherFrame.operationFrame.appliedActions.0.action"
    },
    "claim-p1589::p1589-when-a-nounstem-ends-in-a-voiceless-w-this": {
      "assertionId": "classical-possessive-plural-final-w-assimilation:p1589-when-a-nounstem-ends-in-a-voiceless-w-this",
      "canonicalPath": "higherFrame.operationFrame.appliedActions.0.outputStem"
    },
    "claim-p1590::p1590-result-this-sound-is-totally-assimilated-to-the-w": {
      "assertionId": "classical-possessive-plural-final-w-assimilation:p1590-result-this-sound-is-totally-assimilated-to-the-w",
      "canonicalPath": "formulaRealization"
    },
    "claim-p1591::p1591-cua-uh-tli-cua-uh-eagle": {
      "assertionId": "classical-possessive-plural-final-w-assimilation:p1591-cua-uh-tli-cua-uh-eagle",
      "canonicalPath": "ordinaryContract.leastCommonMultiple.selectedCoordinate.possessivePluralBoundaryIdentity"
    },
    "claim-p1592::p1592-icn-i-uh-tli-icn-i-uh-friend": {
      "assertionId": "classical-possessive-plural-final-w-assimilation:p1592-icn-i-uh-tli-icn-i-uh-friend",
      "canonicalPath": "stemOperationRecord.sourceStem"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlHigherPronominalNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlHigherPronominalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p1588": [
      "l15-final-w"
    ],
    "claim-p1589": [
      "l15-final-w"
    ],
    "claim-p1590": [
      "l15-final-w"
    ],
    "claim-p1591": [
      "l15-final-w"
    ],
    "claim-p1592": [
      "l15-final-w"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1588": "authorized",
    "claim-p1589": "authorized",
    "claim-p1590": "authorized",
    "claim-p1591": "authorized",
    "claim-p1592": "authorized"
  }
};
export default Object.freeze(spec);
