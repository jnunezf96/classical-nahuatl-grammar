const spec = {
  "ownerId": "classical-double-object-applicative-transform",
  "prefix": "ClassicalDoubleObjectApplicativeTransform",
  "operationId": "classical.double.object.applicative.transform.execute",
  "inputContract": "complete-typed-classical-double-object-applicative-transform-source",
  "domain": "classical-double-object-applicative-transform",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-applicative-runtime",
  "selections": [
    "claim-p2612",
    "claim-p2613",
    "claim-p2614"
  ],
  "coordinates": {
    "claim-p2612::p2612-when-the-source-is-a-single-object-vnc-the": {
      "assertionId": "classical-double-object-applicative-transform:p2612-when-the-source-is-a-single-object-vnc-the",
      "canonicalPath": "participants.doubleSpecific.sourceObjectCount"
    },
    "claim-p2613::p2613-if-there-is-no-incompatibility-between-the-objects-both": {
      "assertionId": "classical-double-object-applicative-transform:p2613-if-there-is-no-incompatibility-between-the-objects-both",
      "canonicalPath": "participants.doubleSpecific.targetObjectCount"
    },
    "claim-p2614::p2614-as-pointed-out-in-25-16-a-supplementary-element": {
      "assertionId": "classical-double-object-applicative-transform:p2614-as-pointed-out-in-25-16-a-supplementary-element",
      "canonicalPath": "participants.doubleSpecific.finiteAuthorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlApplicativeValidationFrame",
  "executionValidatorName": "isClassicalNahuatlApplicativeValidationFrame",
  "executionArgsBySelection": {
    "claim-p2612": [],
    "claim-p2613": [],
    "claim-p2614": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2612": "authorized",
    "claim-p2613": "authorized",
    "claim-p2614": "authorized"
  }
};
export default Object.freeze(spec);
