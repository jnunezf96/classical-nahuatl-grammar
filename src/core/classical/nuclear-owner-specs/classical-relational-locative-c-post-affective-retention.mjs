const spec = {
  "ownerId": "classical-relational-locative-c-post-affective-retention",
  "prefix": "ClassicalRelationalLocativeCPostAffectiveRetention",
  "operationId": "classical.relational.locative.c.post.affective.retention.execute",
  "inputContract": "complete-typed-classical-relational-locative-c-post-affective-retention-source",
  "domain": "classical-relational-locative-c-post-affective-retention",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-locative-relational-nnc-runtime",
  "selections": [
    "claim-p4425",
    "claim-p4426"
  ],
  "coordinates": {
    "claim-p4425::p4425-also-when-an-affective-morph-follows-c-tli-the": {
      "assertionId": "classical-relational-locative-c-post-affective-retention:p4425-also-when-an-affective-morph-follows-c-tli-the",
      "canonicalPath": "cases.coAffective.canonicalResult"
    },
    "claim-p4426::p4426-when-an-affective-morph-follows-c-tli": {
      "assertionId": "classical-relational-locative-c-post-affective-retention:p4426-when-an-affective-morph-follows-c-tli",
      "canonicalPath": "cases.coAffective.stemId"
    }
  },
  "executionFunctionName": "buildClassicalLocativeRelationalNncValidationFrame",
  "executionValidatorName": "isClassicalLocativeRelationalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4425": [],
    "claim-p4426": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4425": "authorized",
    "claim-p4426": "authorized"
  }
};
export default Object.freeze(spec);
