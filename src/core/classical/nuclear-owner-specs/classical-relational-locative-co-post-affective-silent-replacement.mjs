const spec = {
  "ownerId": "classical-relational-locative-co-post-affective-silent-replacement",
  "prefix": "ClassicalRelationalLocativeCoPostAffectiveSilentReplacement",
  "operationId": "classical.relational.locative.co.post.affective.silent.replacement.execute",
  "inputContract": "complete-typed-classical-relational-locative-co-post-affective-silent-replacement-source",
  "domain": "classical-relational-locative-co-post-affective-silent-replacement",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-locative-relational-nnc-runtime",
  "selections": [
    "claim-p4427",
    "claim-p4428"
  ],
  "coordinates": {
    "claim-p4427::p4427-when-an-affective-morph-follows-co": {
      "assertionId": "classical-relational-locative-co-post-affective-silent-replacement:p4427-when-an-affective-morph-follows-co",
      "canonicalPath": "cases.coAffective.canonicalResult"
    },
    "claim-p4428::p4428-when-an-affective-morph-follows-co-replace-co-with": {
      "assertionId": "classical-relational-locative-co-post-affective-silent-replacement:p4428-when-an-affective-morph-follows-co-replace-co-with",
      "canonicalPath": "cases.coAffective.stemId"
    }
  },
  "executionFunctionName": "buildClassicalLocativeRelationalNncValidationFrame",
  "executionValidatorName": "isClassicalLocativeRelationalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4427": [],
    "claim-p4428": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4427": "authorized",
    "claim-p4428": "authorized"
  }
};
export default Object.freeze(spec);
