const spec = {
  "ownerId": "classical-relational-ic-downgraded-ah-embed",
  "prefix": "ClassicalRelationalIcDowngradedAhEmbed",
  "operationId": "classical.relational.ic.downgraded.ah.embed.execute",
  "inputContract": "complete-typed-classical-relational-ic-downgraded-ah-embed-source",
  "domain": "classical-relational-ic-downgraded-ah-embed",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-relational-nnc-runtime",
  "selections": [
    "claim-p4305",
    "claim-p4306"
  ],
  "coordinates": {
    "claim-p4305::p4305-the-nnc-i-c-can-be-downgraded-to-the": {
      "assertionId": "classical-relational-ic-downgraded-ah-embed:p4305-the-nnc-i-c-can-be-downgraded-to-the",
      "canonicalPath": "cases.ic.canonicalResult"
    },
    "claim-p4306::p4306-the-vowel-length-on-the-embed-is-lost-as": {
      "assertionId": "classical-relational-ic-downgraded-ah-embed:p4306-the-vowel-length-on-the-embed-is-lost-as",
      "canonicalPath": "cases.ic.stemId"
    }
  },
  "executionFunctionName": "buildClassicalRelationalNncValidationFrame",
  "executionValidatorName": "isClassicalRelationalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4305": [],
    "claim-p4306": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4305": "authorized",
    "claim-p4306": "authorized"
  }
};
export default Object.freeze(spec);
