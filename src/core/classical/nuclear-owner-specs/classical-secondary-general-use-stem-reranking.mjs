const spec = {
  "ownerId": "classical-secondary-general-use-stem-reranking",
  "prefix": "ClassicalSecondaryGeneralUseStemReranking",
  "operationId": "classical.secondary.general.use.stem.reranking.execute",
  "inputContract": "complete-typed-classical-secondary-general-use-stem-reranking-source",
  "domain": "classical-secondary-general-use-stem-reranking",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-higher-pronominal-nnc-runtime",
  "selections": [
    "claim-p1605",
    "claim-p1606",
    "claim-p1607",
    "claim-p1608",
    "claim-p1609"
  ],
  "coordinates": {
    "claim-p1605::p1605-certain-nouns-permit-the-formation-of-a-secondary-general": {
      "assertionId": "classical-secondary-general-use-stem-reranking:p1605-certain-nouns-permit-the-formation-of-a-secondary-general",
      "canonicalPath": "stemOperationRecord.operation"
    },
    "claim-p1606::p1606-tah-tli-tah-father": {
      "assertionId": "classical-secondary-general-use-stem-reranking:p1606-tah-tli-tah-father",
      "canonicalPath": "stemOperationRecord.targetStem"
    },
    "claim-p1607::p1607-ic-ca-uh-tli-ic-ca-uh-younger-brother": {
      "assertionId": "classical-secondary-general-use-stem-reranking:p1607-ic-ca-uh-tli-ic-ca-uh-younger-brother",
      "canonicalPath": "stemOperationRecord.secondaryPossessorCarrier"
    },
    "claim-p1608::p1608-a-ch-ca-uh-tli-a-ch-ca-uh": {
      "assertionId": "classical-secondary-general-use-stem-reranking:p1608-a-ch-ca-uh-tli-a-ch-ca-uh",
      "canonicalPath": "ordinaryContract.leastCommonMultiple.selectedCoordinate.stemOperation"
    },
    "claim-p1609::p1609-the-possessive-state-nature-of-such-an-nnc-occasionally": {
      "assertionId": "classical-secondary-general-use-stem-reranking:p1609-the-possessive-state-nature-of-such-an-nnc-occasionally",
      "canonicalPath": "stemOperationRecord.secondaryPossessorCarrier"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlHigherPronominalNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlHigherPronominalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p1605": [
      "l15-secondary"
    ],
    "claim-p1606": [
      "l15-secondary"
    ],
    "claim-p1607": [
      "l15-secondary"
    ],
    "claim-p1608": [
      "l15-secondary"
    ],
    "claim-p1609": [
      "l15-secondary-ti"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1605": "authorized",
    "claim-p1606": "authorized",
    "claim-p1607": "authorized",
    "claim-p1608": "authorized",
    "claim-p1609": "authorized"
  }
};
export default Object.freeze(spec);
