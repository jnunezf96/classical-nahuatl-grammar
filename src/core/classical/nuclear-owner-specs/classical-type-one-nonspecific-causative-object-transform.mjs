const spec = {
  "ownerId": "classical-type-one-nonspecific-causative-object-transform",
  "prefix": "ClassicalTypeOneNonspecificCausativeObjectTransform",
  "operationId": "classical.type.one.nonspecific.causative.object.transform.execute",
  "inputContract": "complete-typed-classical-type-one-nonspecific-causative-object-transform-source",
  "domain": "classical-type-one-nonspecific-causative-object-transform",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-vnc-derivation-runtime",
  "selections": [
    "claim-p2410",
    "claim-p2411"
  ],
  "coordinates": {
    "claim-p2410::p2410-generating-a-nonspecific-projective-object-in-the-causative-vnc": {
      "assertionId": "classical-type-one-nonspecific-causative-object-transform:p2410-generating-a-nonspecific-projective-object-in-the-causative-vnc",
      "canonicalPath": "participants.typeOneNonspecific.implicitAgentObjectKind"
    },
    "claim-p2411::p2411-source-subject-0-0-0-0-becomes-causative-object": {
      "assertionId": "classical-type-one-nonspecific-causative-object-transform:p2411-source-subject-0-0-0-0-becomes-causative-object",
      "canonicalPath": "participants.typeOneNonspecific.formulaRealization"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlVncDerivationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlVncDerivationValidationFrame",
  "executionArgsBySelection": {
    "claim-p2410": [],
    "claim-p2411": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2410": "authorized",
    "claim-p2411": "authorized"
  }
};
export default Object.freeze(spec);
