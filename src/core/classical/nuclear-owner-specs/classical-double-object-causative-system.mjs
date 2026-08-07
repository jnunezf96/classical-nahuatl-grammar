const spec = {
  "ownerId": "classical-double-object-causative-system",
  "prefix": "ClassicalDoubleObjectCausativeSystem",
  "operationId": "classical.double.object.causative.system.execute",
  "inputContract": "complete-typed-classical-double-object-causative-system-source",
  "domain": "classical-double-object-causative-system",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-vnc-derivation-runtime",
  "selections": [
    "claim-p2488",
    "claim-p2489"
  ],
  "coordinates": {
    "claim-p2488::p2488-the-causative-object-becomes-the-mainline-object": {
      "assertionId": "classical-double-object-causative-system:p2488-the-causative-object-becomes-the-mainline-object",
      "canonicalPath": "contract.axes.19.axisId"
    },
    "claim-p2489::p2489-a-double-object-causative-vnc-may-be-generated-from": {
      "assertionId": "classical-double-object-causative-system:p2489-a-double-object-causative-vnc-may-be-generated-from",
      "canonicalPath": "participants.doubleSpecific.targetObjectRequests.1.derivationalLevel"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlVncDerivationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlVncDerivationValidationFrame",
  "executionArgsBySelection": {
    "claim-p2488": [],
    "claim-p2489": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2488": "authorized",
    "claim-p2489": "authorized"
  }
};
export default Object.freeze(spec);
