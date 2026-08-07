const spec = {
  "ownerId": "classical-relational-continuation-pan-verbal-continuation",
  "prefix": "ClassicalRelationalContinuationPanVerbalContinuation",
  "operationId": "classical.relational.continuation.pan.verbal.continuation.execute",
  "inputContract": "complete-typed-classical-relational-continuation-pan-verbal-continuation-source",
  "domain": "classical-relational-continuation-pan-verbal-continuation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-relational-continuation-runtime",
  "selections": [
    "claim-p4519",
    "claim-p4520"
  ],
  "coordinates": {
    "claim-p4519::p4519-the-stem-ne-pan-tli-also-serves-as-the": {
      "assertionId": "classical-relational-continuation-pan-verbal-continuation:p4519-the-stem-ne-pan-tli-also-serves-as-the",
      "canonicalPath": "analyses.panVerbalContinuation.canonicalCompoundFrame"
    },
    "claim-p4520::p4520-this-serves-as-the-source-for-the-imperfective-patientive": {
      "assertionId": "classical-relational-continuation-pan-verbal-continuation:p4520-this-serves-as-the-source-for-the-imperfective-patientive",
      "canonicalPath": "analyses.panVerbalContinuation.sourceAndContinuationOperationsRemainSeparate"
    }
  },
  "executionFunctionName": "buildClassicalRelationalContinuationValidationFrame",
  "executionValidatorName": "isClassicalRelationalContinuationValidationFrame",
  "executionArgsBySelection": {
    "claim-p4519": [],
    "claim-p4520": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4519": "authorized",
    "claim-p4520": "authorized"
  }
};
export default Object.freeze(spec);
