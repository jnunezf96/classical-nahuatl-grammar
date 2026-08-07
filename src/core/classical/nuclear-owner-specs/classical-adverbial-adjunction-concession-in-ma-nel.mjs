const spec = {
  "ownerId": "classical-adverbial-adjunction-concession-in-ma-nel",
  "prefix": "ClassicalAdverbialAdjunctionConcessionInMaNel",
  "operationId": "classical.adverbial.adjunction.concession.in.ma.nel.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-concession-in-ma-nel-source",
  "domain": "classical-adverbial-adjunction-concession-in-ma-nel",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4770",
    "claim-p4771",
    "claim-p4772",
    "claim-p4773"
  ],
  "coordinates": {
    "claim-p4770::p4770-the-concessive-notion-may-also-be-expressed-by-introducing": {
      "assertionId": "classical-adverbial-adjunction-concession-in-ma-nel:p4770-the-concessive-notion-may-also-be-expressed-by-introducing",
      "canonicalPath": "analysis.inMaNelConcessionLicensed"
    },
    "claim-p4771::p4771-the-adverbialized-nnc-nel-in-truth-in-fact-really": {
      "assertionId": "classical-adverbial-adjunction-concession-in-ma-nel:p4771-the-adverbialized-nnc-nel-in-truth-in-fact-really",
      "canonicalPath": "result.canonicalResult"
    },
    "claim-p4772::p4772-the-collocation-in-ma-nel-may-be-translated-although": {
      "assertionId": "classical-adverbial-adjunction-concession-in-ma-nel:p4772-the-collocation-in-ma-nel-may-be-translated-although",
      "canonicalPath": "result.relation"
    },
    "claim-p4773::p4773-the-collocation-is-traditionally-written-solid-inmanel-or-immanel": {
      "assertionId": "classical-adverbial-adjunction-concession-in-ma-nel:p4773-the-collocation-is-traditionally-written-solid-inmanel-or-immanel",
      "canonicalPath": "analysis.rawStoredAuthorityBlocked"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4770": [
      "concession-in-ma-nel"
    ],
    "claim-p4771": [
      "concession-in-ma-nel"
    ],
    "claim-p4772": [
      "concession-in-ma-nel"
    ],
    "claim-p4773": [
      "concession-in-ma-nel"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4770": "authorized",
    "claim-p4771": "authorized",
    "claim-p4772": "authorized",
    "claim-p4773": "authorized"
  }
};
export default Object.freeze(spec);
