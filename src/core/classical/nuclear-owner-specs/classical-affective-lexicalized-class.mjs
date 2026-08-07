const spec = {
  "ownerId": "classical-affective-lexicalized-class",
  "prefix": "ClassicalAffectiveLexicalizedClass",
  "operationId": "classical.affective.lexicalized.class.execute",
  "inputContract": "complete-typed-classical-affective-lexicalized-class-source",
  "domain": "classical-affective-lexicalized-class",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-affective-nnc-runtime",
  "selections": [
    "claim-p3136"
  ],
  "coordinates": {
    "claim-p3136::p3136-if-the-compound-affective-nounstem-becomes-lexicalized-in-a": {
      "assertionId": "classical-affective-lexicalized-class:p3136-if-the-compound-affective-nounstem-becomes-lexicalized-in-a",
      "canonicalPath": "cases.lexicalizedClass.rules.affective/lexicalized-class"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAffectiveNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAffectiveNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3136": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3136": "authorized"
  }
};
export default Object.freeze(spec);
