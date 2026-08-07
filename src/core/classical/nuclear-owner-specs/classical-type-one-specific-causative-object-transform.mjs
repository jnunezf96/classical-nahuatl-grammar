const spec = {
  "ownerId": "classical-type-one-specific-causative-object-transform",
  "prefix": "ClassicalTypeOneSpecificCausativeObjectTransform",
  "operationId": "classical.type.one.specific.causative.object.transform.execute",
  "inputContract": "complete-typed-classical-type-one-specific-causative-object-transform-source",
  "domain": "classical-type-one-specific-causative-object-transform",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-vnc-derivation-runtime",
  "selections": [
    "claim-p2399",
    "claim-p2400",
    "claim-p2401"
  ],
  "coordinates": {
    "claim-p2399::p2399-generating-a-specific-projective-object-in-the-causative-vnc": {
      "assertionId": "classical-type-one-specific-causative-object-transform:p2399-generating-a-specific-projective-object-in-the-causative-vnc",
      "canonicalPath": "participants.typeOneSpecific.authorizationStatus"
    },
    "claim-p2400::p2400-source-tomi-it-becomes-untied-they-become-untied-1": {
      "assertionId": "classical-type-one-specific-causative-object-transform:p2400-source-tomi-it-becomes-untied-they-become-untied-1",
      "canonicalPath": "participants.typeOneSpecific.targetObjectRequests.0.objectKind"
    },
    "claim-p2401::p2401-source-subject-0-0-0-0-becomes-causative-object": {
      "assertionId": "classical-type-one-specific-causative-object-transform:p2401-source-subject-0-0-0-0-becomes-causative-object",
      "canonicalPath": "participants.typeOneSpecific.formulaRealization"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlVncDerivationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlVncDerivationValidationFrame",
  "executionArgsBySelection": {
    "claim-p2399": [],
    "claim-p2400": [],
    "claim-p2401": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2399": "authorized",
    "claim-p2400": "authorized",
    "claim-p2401": "authorized"
  }
};
export default Object.freeze(spec);
