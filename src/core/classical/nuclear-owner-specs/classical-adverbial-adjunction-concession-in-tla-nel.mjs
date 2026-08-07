const spec = {
  "ownerId": "classical-adverbial-adjunction-concession-in-tla-nel",
  "prefix": "ClassicalAdverbialAdjunctionConcessionInTlaNel",
  "operationId": "classical.adverbial.adjunction.concession.in.tla.nel.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-concession-in-tla-nel-source",
  "domain": "classical-adverbial-adjunction-concession-in-tla-nel",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4763",
    "claim-p4764"
  ],
  "coordinates": {
    "claim-p4763::p4763-if-in-truth": {
      "assertionId": "classical-adverbial-adjunction-concession-in-tla-nel:p4763-if-in-truth",
      "canonicalPath": "analysis.inTlaNelConcessionLicensed"
    },
    "claim-p4764::p4764-the-introductory-collocation-in-tla-nel-if-in-truth": {
      "assertionId": "classical-adverbial-adjunction-concession-in-tla-nel:p4764-the-introductory-collocation-in-tla-nel-if-in-truth",
      "canonicalPath": "result.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4763": [
      "concession-in-tla-nel"
    ],
    "claim-p4764": [
      "concession-in-tla-nel"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4763": "authorized",
    "claim-p4764": "authorized"
  }
};
export default Object.freeze(spec);
