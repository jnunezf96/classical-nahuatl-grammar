const spec = {
  "ownerId": "classical-tlan-nested-bodypart-matrix-choice",
  "prefix": "ClassicalTlanNestedBodypartMatrixChoice",
  "operationId": "classical.tlan.nested.bodypart.matrix.choice.execute",
  "inputContract": "complete-typed-classical-tlan-nested-bodypart-matrix-choice-source",
  "domain": "classical-tlan-nested-bodypart-matrix-choice",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-relational-continuation-runtime",
  "selections": [
    "claim-p4508"
  ],
  "coordinates": {
    "claim-p4508::p4508-the-tlan-can-also-embed-a-compound-stem-that": {
      "assertionId": "classical-tlan-nested-bodypart-matrix-choice:p4508-the-tlan-can-also-embed-a-compound-stem-that",
      "canonicalPath": "constraints.tlanNestedBodypartMatrixChoice"
    }
  },
  "executionFunctionName": "buildClassicalRelationalContinuationValidationFrame",
  "executionValidatorName": "isClassicalRelationalContinuationValidationFrame",
  "executionArgsBySelection": {
    "claim-p4508": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4508": "authorized"
  }
};
export default Object.freeze(spec);
