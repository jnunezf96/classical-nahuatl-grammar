const spec = {
  "ownerId": "classical-personal-name-nnc-sentence-adjunctor-scope",
  "prefix": "ClassicalPersonalNameNncSentenceAdjunctorScope",
  "operationId": "classical.personal.name.nnc.sentence.adjunctor.scope.execute",
  "inputContract": "complete-typed-classical-personal-name-nnc-sentence-adjunctor-scope-source",
  "domain": "classical-personal-name-nnc-sentence-adjunctor-scope",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-personal-name-nnc-runtime",
  "selections": [
    "claim-p5230"
  ],
  "coordinates": {
    "claim-p5230::p5230-the-following-three-sentences-illustrate-the-use-of-the": {
      "assertionId": "classical-personal-name-nnc-sentence-adjunctor-scope:p5230-the-following-three-sentences-illustrate-the-use-of-the",
      "canonicalPath": "result.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalPersonalNameNncValidationFrame",
  "executionValidatorName": "isClassicalPersonalNameNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5230": [
      "sentence-adjunctor-scope",
      "conjunctorless-personal-name-unit",
      "default",
      "adjunctor-before-whole-unit"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5230": "authorized"
  }
};
export default Object.freeze(spec);
