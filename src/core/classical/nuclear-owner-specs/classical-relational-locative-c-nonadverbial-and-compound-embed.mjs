const spec = {
  "ownerId": "classical-relational-locative-c-nonadverbial-and-compound-embed",
  "prefix": "ClassicalRelationalLocativeCNonadverbialAndCompoundEmbed",
  "operationId": "classical.relational.locative.c.nonadverbial.and.compound.embed.execute",
  "inputContract": "complete-typed-classical-relational-locative-c-nonadverbial-and-compound-embed-source",
  "domain": "classical-relational-locative-c-nonadverbial-and-compound-embed",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-locative-relational-nnc-runtime",
  "selections": [
    "claim-p4417",
    "claim-p4418"
  ],
  "coordinates": {
    "claim-p4417::p4417-a-compound-stem-formed-on-the-matrix-stem-c": {
      "assertionId": "classical-relational-locative-c-nonadverbial-and-compound-embed:p4417-a-compound-stem-formed-on-the-matrix-stem-c",
      "canonicalPath": "cases.cBodyPart.canonicalResult"
    },
    "claim-p4418::p4418-a-compound-stem-formed-on-the-matrix-stem-c": {
      "assertionId": "classical-relational-locative-c-nonadverbial-and-compound-embed:p4418-a-compound-stem-formed-on-the-matrix-stem-c",
      "canonicalPath": "cases.cBodyPart.sourceKind"
    }
  },
  "executionFunctionName": "buildClassicalLocativeRelationalNncValidationFrame",
  "executionValidatorName": "isClassicalLocativeRelationalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4417": [],
    "claim-p4418": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4417": "authorized",
    "claim-p4418": "authorized"
  }
};
export default Object.freeze(spec);
