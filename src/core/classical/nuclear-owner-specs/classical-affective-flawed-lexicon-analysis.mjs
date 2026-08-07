const spec = {
  "ownerId": "classical-affective-flawed-lexicon-analysis",
  "prefix": "ClassicalAffectiveFlawedLexiconAnalysis",
  "operationId": "classical.affective.flawed.lexicon.analysis.execute",
  "inputContract": "complete-typed-classical-affective-flawed-lexicon-analysis-source",
  "domain": "classical-affective-flawed-lexicon-analysis",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-affective-nnc-runtime",
  "selections": [
    "claim-p3200"
  ],
  "coordinates": {
    "claim-p3200::p3200-unless-there-seems-to-be-an-obvious-difference-of": {
      "assertionId": "classical-affective-flawed-lexicon-analysis:p3200-unless-there-seems-to-be-an-obvious-difference-of",
      "canonicalPath": "cases.flawedLexicon.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAffectiveNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAffectiveNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3200": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3200": "authorized"
  }
};
export default Object.freeze(spec);
