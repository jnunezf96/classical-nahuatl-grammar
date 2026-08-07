const spec = {
  "ownerId": "classical-affective-flawed-lexicon",
  "prefix": "ClassicalAffectiveFlawedLexicon",
  "operationId": "classical.affective.flawed.lexicon.execute",
  "inputContract": "complete-typed-classical-affective-flawed-lexicon-source",
  "domain": "classical-affective-flawed-lexicon",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-affective-nnc-runtime",
  "selections": [
    "claim-p3201"
  ],
  "coordinates": {
    "claim-p3201::p3201-tecpin-tli-tecpin-flea": {
      "assertionId": "classical-affective-flawed-lexicon:p3201-tecpin-tli-tecpin-flea",
      "canonicalPath": "cases.flawedLexicon.rules.affective/flawed-lexicon"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAffectiveNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAffectiveNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3201": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3201": "authorized"
  }
};
export default Object.freeze(spec);
