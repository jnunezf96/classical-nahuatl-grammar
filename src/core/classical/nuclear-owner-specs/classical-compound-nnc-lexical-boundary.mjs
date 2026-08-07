const spec = {
  "ownerId": "classical-compound-nnc-lexical-boundary",
  "prefix": "ClassicalCompoundNncLexicalBoundary",
  "operationId": "classical.compound.nnc.lexical.boundary.execute",
  "inputContract": "complete-typed-classical-compound-nnc-lexical-boundary-source",
  "domain": "classical-compound-nnc-lexical-boundary",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-compound-nnc-runtime",
  "selections": [
    "claim-p3102"
  ],
  "coordinates": {
    "claim-p3102::p3102-if-the-embed-stem-has-the-glottalized-shape-see": {
      "assertionId": "classical-compound-nnc-lexical-boundary:p3102-if-the-embed-stem-has-the-glottalized-shape-see",
      "canonicalPath": "cases.lexicalBoundary.rules.compound-nnc/lexical-boundary"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCompoundNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCompoundNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3102": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3102": "authorized"
  }
};
export default Object.freeze(spec);
