const spec = {
  "ownerId": "classical-relational-continuation-tlan-bodypart-embed",
  "prefix": "ClassicalRelationalContinuationTlanBodypartEmbed",
  "operationId": "classical.relational.continuation.tlan.bodypart.embed.execute",
  "inputContract": "complete-typed-classical-relational-continuation-tlan-bodypart-embed-source",
  "domain": "classical-relational-continuation-tlan-bodypart-embed",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-relational-continuation-runtime",
  "selections": [
    "claim-p4507",
    "claim-p4508"
  ],
  "coordinates": {
    "claim-p4507::p4507-the-matrix-stem-tlan-can-embed-certain-body-part": {
      "assertionId": "classical-relational-continuation-tlan-bodypart-embed:p4507-the-matrix-stem-tlan-can-embed-certain-body-part",
      "canonicalPath": "cases.tlanIntegrated.canonicalResult"
    },
    "claim-p4508::p4508-the-tlan-can-also-embed-a-compound-stem-that": {
      "assertionId": "classical-relational-continuation-tlan-bodypart-embed:p4508-the-tlan-can-also-embed-a-compound-stem-that",
      "canonicalPath": "cases.tlanNested.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalRelationalContinuationValidationFrame",
  "executionValidatorName": "isClassicalRelationalContinuationValidationFrame",
  "executionArgsBySelection": {
    "claim-p4507": [],
    "claim-p4508": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4507": "authorized",
    "claim-p4508": "authorized"
  }
};
export default Object.freeze(spec);
