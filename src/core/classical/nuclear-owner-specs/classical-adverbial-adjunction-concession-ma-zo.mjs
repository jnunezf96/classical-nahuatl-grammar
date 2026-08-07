const spec = {
  "ownerId": "classical-adverbial-adjunction-concession-ma-zo",
  "prefix": "ClassicalAdverbialAdjunctionConcessionMaZo",
  "operationId": "classical.adverbial.adjunction.concession.ma.zo.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-concession-ma-zo-source",
  "domain": "classical-adverbial-adjunction-concession-ma-zo",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4774",
    "claim-p4775",
    "claim-p4776",
    "claim-p4777"
  ],
  "coordinates": {
    "claim-p4774::p4774-one-may-also-express-concession-by-the-collocation-ma": {
      "assertionId": "classical-adverbial-adjunction-concession-ma-zo:p4774-one-may-also-express-concession-by-the-collocation-ma",
      "canonicalPath": "analysis.maZoConcessionLicensed"
    },
    "claim-p4775::p4775-ma-zo-may-be-combined-with-nel-or-with": {
      "assertionId": "classical-adverbial-adjunction-concession-ma-zo:p4775-ma-zo-may-be-combined-with-nel-or-with",
      "canonicalPath": "result.canonicalResult"
    },
    "claim-p4776::p4776-this-can-also-be-ma-zo-eh-traditionally-written": {
      "assertionId": "classical-adverbial-adjunction-concession-ma-zo:p4776-this-can-also-be-ma-zo-eh-traditionally-written",
      "canonicalPath": "result.relation"
    },
    "claim-p4777::p4777-these-collocations-may-be-introduced-by-the-adjunctor-in": {
      "assertionId": "classical-adverbial-adjunction-concession-ma-zo:p4777-these-collocations-may-be-introduced-by-the-adjunctor-in",
      "canonicalPath": "analysis.rawStoredAuthorityBlocked"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4774": [
      "concession-ma-zo"
    ],
    "claim-p4775": [
      "concession-ma-zo"
    ],
    "claim-p4776": [
      "concession-ma-zo"
    ],
    "claim-p4777": [
      "concession-ma-zo"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4774": "authorized",
    "claim-p4775": "authorized",
    "claim-p4776": "authorized",
    "claim-p4777": "authorized"
  }
};
export default Object.freeze(spec);
