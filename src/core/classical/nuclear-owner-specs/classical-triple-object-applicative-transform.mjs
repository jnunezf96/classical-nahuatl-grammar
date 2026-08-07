const spec = {
  "ownerId": "classical-triple-object-applicative-transform",
  "prefix": "ClassicalTripleObjectApplicativeTransform",
  "operationId": "classical.triple.object.applicative.transform.execute",
  "inputContract": "complete-typed-classical-triple-object-applicative-transform-source",
  "domain": "classical-triple-object-applicative-transform",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-applicative-runtime",
  "selections": [
    "claim-p2615",
    "claim-p2616",
    "claim-p2617",
    "claim-p2618"
  ],
  "coordinates": {
    "claim-p2615::p2615-when-the-source-vnc-is-a-double-object-vnc": {
      "assertionId": "classical-triple-object-applicative-transform:p2615-when-the-source-vnc-is-a-double-object-vnc",
      "canonicalPath": "participants.tripleSpecific.sourceObjectCount"
    },
    "claim-p2616::p2616-if-there-is-no-incompatibility-among-the-objects-all": {
      "assertionId": "classical-triple-object-applicative-transform:p2616-if-there-is-no-incompatibility-among-the-objects-all",
      "canonicalPath": "participants.tripleSpecific.targetObjectCount"
    },
    "claim-p2617::p2617-mutual-incompatibility-of-specific-projective-object-pronouns-may-permit": {
      "assertionId": "classical-triple-object-applicative-transform:p2617-mutual-incompatibility-of-specific-projective-object-pronouns-may-permit",
      "canonicalPath": "participants.tripleSpecific.targetObjectRequests.2.governor"
    },
    "claim-p2618::p2618-mutual-incompatibility-of-specific-projective-object-pronouns-may-permit": {
      "assertionId": "classical-triple-object-applicative-transform:p2618-mutual-incompatibility-of-specific-projective-object-pronouns-may-permit",
      "canonicalPath": "participants.tripleSpecific.finiteAuthorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlApplicativeValidationFrame",
  "executionValidatorName": "isClassicalNahuatlApplicativeValidationFrame",
  "executionArgsBySelection": {
    "claim-p2615": [],
    "claim-p2616": [],
    "claim-p2617": [],
    "claim-p2618": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2615": "authorized",
    "claim-p2616": "authorized",
    "claim-p2617": "authorized",
    "claim-p2618": "authorized"
  }
};
export default Object.freeze(spec);
