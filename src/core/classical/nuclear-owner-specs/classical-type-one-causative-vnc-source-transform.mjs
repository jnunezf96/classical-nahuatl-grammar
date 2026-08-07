const spec = {
  "ownerId": "classical-type-one-causative-vnc-source-transform",
  "prefix": "ClassicalTypeOneCausativeVncSourceTransform",
  "operationId": "classical.type.one.causative.vnc.source.transform.execute",
  "inputContract": "complete-typed-classical-type-one-causative-vnc-source-transform-source",
  "domain": "classical-type-one-causative-vnc-source-transform",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-vnc-derivation-runtime",
  "selections": [
    "claim-p2396",
    "claim-p2397",
    "claim-p2398"
  ],
  "coordinates": {
    "claim-p2396::p2396-a-single-object-causative-vnc-may-be-generated-from": {
      "assertionId": "classical-type-one-causative-vnc-source-transform:p2396-a-single-object-causative-vnc-may-be-generated-from",
      "canonicalPath": "contract.axes.9.axisId"
    },
    "claim-p2397::p2397-the-subject-pronoun-of-the-source-vnc-is-transformed": {
      "assertionId": "classical-type-one-causative-vnc-source-transform:p2397-the-subject-pronoun-of-the-source-vnc-is-transformed",
      "canonicalPath": "participants.typeOneSpecific.targetObjectRequests.0.governor"
    },
    "claim-p2398::p2398-the-subject-pronoun-of-the-causative-vnc-is-imported": {
      "assertionId": "classical-type-one-causative-vnc-source-transform:p2398-the-subject-pronoun-of-the-causative-vnc-is-imported",
      "canonicalPath": "participants.typeOneSpecific.targetSubject"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlVncDerivationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlVncDerivationValidationFrame",
  "executionArgsBySelection": {
    "claim-p2396": [],
    "claim-p2397": [],
    "claim-p2398": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2396": "authorized",
    "claim-p2397": "authorized",
    "claim-p2398": "authorized"
  }
};
export default Object.freeze(spec);
