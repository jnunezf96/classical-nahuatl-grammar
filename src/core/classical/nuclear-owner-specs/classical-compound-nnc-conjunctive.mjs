const spec = {
  "ownerId": "classical-compound-nnc-conjunctive",
  "prefix": "ClassicalCompoundNncConjunctive",
  "operationId": "classical.compound.nnc.conjunctive.execute",
  "inputContract": "complete-typed-classical-compound-nnc-conjunctive-source",
  "domain": "classical-compound-nnc-conjunctive",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-compound-nnc-runtime",
  "selections": [
    "claim-p3114"
  ],
  "coordinates": {
    "claim-p3114::p3114-the-filler-of-the-first-conjunct-subposition-retains-a": {
      "assertionId": "classical-compound-nnc-conjunctive:p3114-the-filler-of-the-first-conjunct-subposition-retains-a",
      "canonicalPath": "cases.conjunctive.rules.compound-nnc/conjunctive"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCompoundNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCompoundNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3114": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3114": "authorized"
  }
};
export default Object.freeze(spec);
