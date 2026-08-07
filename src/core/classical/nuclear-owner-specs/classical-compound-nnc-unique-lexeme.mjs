const spec = {
  "ownerId": "classical-compound-nnc-unique-lexeme",
  "prefix": "ClassicalCompoundNncUniqueLexeme",
  "operationId": "classical.compound.nnc.unique.lexeme.execute",
  "inputContract": "complete-typed-classical-compound-nnc-unique-lexeme-source",
  "domain": "classical-compound-nnc-unique-lexeme",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-compound-nnc-runtime",
  "selections": [
    "claim-p3103"
  ],
  "coordinates": {
    "claim-p3103::p3103-occasionally-a-nounstem-that-does-not-occur-as-the": {
      "assertionId": "classical-compound-nnc-unique-lexeme:p3103-occasionally-a-nounstem-that-does-not-occur-as-the",
      "canonicalPath": "cases.uniqueLexeme.rules.compound-nnc/unique-lexeme"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCompoundNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCompoundNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3103": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3103": "authorized"
  }
};
export default Object.freeze(spec);
