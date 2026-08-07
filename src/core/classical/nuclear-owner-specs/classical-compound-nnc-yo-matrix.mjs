const spec = {
  "ownerId": "classical-compound-nnc-yo-matrix",
  "prefix": "ClassicalCompoundNncYoMatrix",
  "operationId": "classical.compound.nnc.yo.matrix.execute",
  "inputContract": "complete-typed-classical-compound-nnc-yo-matrix-source",
  "domain": "classical-compound-nnc-yo-matrix",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-compound-nnc-runtime",
  "selections": [
    "claim-p3112",
    "claim-p3113"
  ],
  "coordinates": {
    "claim-p3112::p3112-this-is-a-deverbal-nounstem-whose-derivation-is-described": {
      "assertionId": "classical-compound-nnc-yo-matrix:p3112-this-is-a-deverbal-nounstem-whose-derivation-is-described",
      "canonicalPath": "cases.yoMatrix.rules.compound-nnc/yo-matrix"
    },
    "claim-p3113::p3113-it-is-frequently-translated-by-the-english-abstract-suffixes": {
      "assertionId": "classical-compound-nnc-yo-matrix:p3113-it-is-frequently-translated-by-the-english-abstract-suffixes",
      "canonicalPath": "cases.yoMatrix.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCompoundNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCompoundNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3112": [],
    "claim-p3113": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3112": "authorized",
    "claim-p3113": "authorized"
  }
};
export default Object.freeze(spec);
