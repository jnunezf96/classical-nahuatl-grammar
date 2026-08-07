const spec = {
  "ownerId": "classical-adverbial-adjunction-reason-ca-not-conjunction",
  "prefix": "ClassicalAdverbialAdjunctionReasonCaNotConjunction",
  "operationId": "classical.adverbial.adjunction.reason.ca.not.conjunction.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-reason-ca-not-conjunction-source",
  "domain": "classical-adverbial-adjunction-reason-ca-not-conjunction",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4785"
  ],
  "coordinates": {
    "claim-p4785::p4785-the-particle-ca-does-not-mean-because-for-since": {
      "assertionId": "classical-adverbial-adjunction-reason-ca-not-conjunction:p4785-the-particle-ca-does-not-mean-because-for-since",
      "canonicalPath": "analysis.caIsConjunction"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4785": [
      "reason-ca-not-conjunction"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4785": "authorized"
  }
};
export default Object.freeze(spec);
