const spec = {
  "ownerId": "classical-late-grammar-nonspecific-subject-specific-supplement",
  "prefix": "ClassicalLateGrammarNonspecificSubjectSpecificSupplement",
  "operationId": "classical.late.grammar.nonspecific.subject.specific.supplement.execute",
  "inputContract": "complete-typed-classical-late-grammar-nonspecific-subject-specific-supplement-source",
  "domain": "classical-late-grammar-nonspecific-subject-specific-supplement",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-referent-conditioned-agreement-runtime",
  "selections": [
    "claim-p5263"
  ],
  "coordinates": {
    "claim-p5263::p5263-a-nonspecific-subject-pronoun-in-the-principal-clause-may": {
      "assertionId": "classical-late-grammar-nonspecific-subject-specific-supplement:p5263-a-nonspecific-subject-pronoun-in-the-principal-clause-may",
      "canonicalPath": "result.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalLateGrammarValidationFrame",
  "executionValidatorName": "isClassicalLateGrammarValidationFrame",
  "executionArgsBySelection": {
    "claim-p5263": [
      "referent-conditioned-agreement",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5263": "authorized"
  }
};
export default Object.freeze(spec);
