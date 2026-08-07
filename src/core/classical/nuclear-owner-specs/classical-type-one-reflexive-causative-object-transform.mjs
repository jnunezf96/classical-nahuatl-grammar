const spec = {
  "ownerId": "classical-type-one-reflexive-causative-object-transform",
  "prefix": "ClassicalTypeOneReflexiveCausativeObjectTransform",
  "operationId": "classical.type.one.reflexive.causative.object.transform.execute",
  "inputContract": "complete-typed-classical-type-one-reflexive-causative-object-transform-source",
  "domain": "classical-type-one-reflexive-causative-object-transform",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-vnc-derivation-runtime",
  "selections": [
    "claim-p2402",
    "claim-p2403",
    "claim-p2404",
    "claim-p2405"
  ],
  "coordinates": {
    "claim-p2402::p2402-generating-a-reflexive-object-in-the-causative-vnc": {
      "assertionId": "classical-type-one-reflexive-causative-object-transform:p2402-generating-a-reflexive-object-in-the-causative-vnc",
      "canonicalPath": "participants.typeOneReflexive.authorizationStatus"
    },
    "claim-p2403::p2403-tense-predicate-i-become-untied-at-present-line-2": {
      "assertionId": "classical-type-one-reflexive-causative-object-transform:p2403-tense-predicate-i-become-untied-at-present-line-2",
      "canonicalPath": "participants.typeOneReflexive.targetObjectRequests.0.objectKind"
    },
    "claim-p2404::p2404-1-ni-0-0-subject-2-tom-n-0": {
      "assertionId": "classical-type-one-reflexive-causative-object-transform:p2404-1-ni-0-0-subject-2-tom-n-0",
      "canonicalPath": "participants.typeOneReflexive.formulaRealization"
    },
    "claim-p2405::p2405-predicate-become-untied-cause-myself-at-present-source-subject": {
      "assertionId": "classical-type-one-reflexive-causative-object-transform:p2405-predicate-become-untied-cause-myself-at-present-source-subject",
      "canonicalPath": "participants.typeOneReflexive.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlVncDerivationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlVncDerivationValidationFrame",
  "executionArgsBySelection": {
    "claim-p2402": [],
    "claim-p2403": [],
    "claim-p2404": [],
    "claim-p2405": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2402": "authorized",
    "claim-p2403": "authorized",
    "claim-p2404": "authorized",
    "claim-p2405": "authorized"
  }
};
export default Object.freeze(spec);
