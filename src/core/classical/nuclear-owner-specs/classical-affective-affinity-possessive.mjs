const spec = {
  "ownerId": "classical-affective-affinity-possessive",
  "prefix": "ClassicalAffectiveAffinityPossessive",
  "operationId": "classical.affective.affinity.possessive.execute",
  "inputContract": "complete-typed-classical-affective-affinity-possessive-source",
  "domain": "classical-affective-affinity-possessive",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-affective-nnc-runtime",
  "selections": [
    "claim-p3163"
  ],
  "coordinates": {
    "claim-p3163::p3163-the-possessive-state-nnc-with-a-plural-subject-is": {
      "assertionId": "classical-affective-affinity-possessive:p3163-the-possessive-state-nnc-with-a-plural-subject-is",
      "canonicalPath": "cases.affinityPossessive.rules.affective/affinity-possessive"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAffectiveNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAffectiveNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3163": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3163": "authorized"
  }
};
export default Object.freeze(spec);
