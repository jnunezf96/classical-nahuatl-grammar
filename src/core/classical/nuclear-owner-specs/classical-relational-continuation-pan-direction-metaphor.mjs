const spec = {
  "ownerId": "classical-relational-continuation-pan-direction-metaphor",
  "prefix": "ClassicalRelationalContinuationPanDirectionMetaphor",
  "operationId": "classical.relational.continuation.pan.direction.metaphor.execute",
  "inputContract": "complete-typed-classical-relational-continuation-pan-direction-metaphor-source",
  "domain": "classical-relational-continuation-pan-direction-metaphor",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-relational-continuation-runtime",
  "selections": [
    "claim-p4521",
    "claim-p4522"
  ],
  "coordinates": {
    "claim-p4521::p4521-the-stem-pan-can-serve-as-an-embed-for": {
      "assertionId": "classical-relational-continuation-pan-direction-metaphor:p4521-the-stem-pan-can-serve-as-an-embed-for",
      "canonicalPath": "cases.panDirection.canonicalResult"
    },
    "claim-p4522::p4522-in-addition-to-the-usage-of-pam-pa-in": {
      "assertionId": "classical-relational-continuation-pan-direction-metaphor:p4522-in-addition-to-the-usage-of-pam-pa-in",
      "canonicalPath": "cases.panDirection.predicateStem"
    }
  },
  "executionFunctionName": "buildClassicalRelationalContinuationValidationFrame",
  "executionValidatorName": "isClassicalRelationalContinuationValidationFrame",
  "executionArgsBySelection": {
    "claim-p4521": [],
    "claim-p4522": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4521": "authorized",
    "claim-p4522": "authorized"
  }
};
export default Object.freeze(spec);
