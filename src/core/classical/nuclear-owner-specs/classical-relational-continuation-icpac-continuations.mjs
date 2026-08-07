const spec = {
  "ownerId": "classical-relational-continuation-icpac-continuations",
  "prefix": "ClassicalRelationalContinuationIcpacContinuations",
  "operationId": "classical.relational.continuation.icpac.continuations.execute",
  "inputContract": "complete-typed-classical-relational-continuation-icpac-continuations-source",
  "domain": "classical-relational-continuation-icpac-continuations",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-relational-continuation-runtime",
  "selections": [
    "claim-p4498",
    "claim-p4499",
    "claim-p4500"
  ],
  "coordinates": {
    "claim-p4498::p4498-nnc-can-also-be-used-with-a-nonadverbialized-subject": {
      "assertionId": "classical-relational-continuation-icpac-continuations:p4498-nnc-can-also-be-used-with-a-nonadverbialized-subject",
      "canonicalPath": "cases.icpacNormal.canonicalResult"
    },
    "claim-p4499::p4499-the-compound-stem-icpa-c-tli-can-be-embedded": {
      "assertionId": "classical-relational-continuation-icpac-continuations:p4499-the-compound-stem-icpa-c-tli-can-be-embedded",
      "canonicalPath": "cases.icpacDirection.canonicalResult"
    },
    "claim-p4500::p4500-the-affective-forms-of-icpa-c-tli-are-icpa": {
      "assertionId": "classical-relational-continuation-icpac-continuations:p4500-the-affective-forms-of-icpa-c-tli-are-icpa",
      "canonicalPath": "cases.icpacAffective.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalRelationalContinuationValidationFrame",
  "executionValidatorName": "isClassicalRelationalContinuationValidationFrame",
  "executionArgsBySelection": {
    "claim-p4498": [],
    "claim-p4499": [],
    "claim-p4500": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4498": "authorized",
    "claim-p4499": "authorized",
    "claim-p4500": "authorized"
  }
};
export default Object.freeze(spec);
