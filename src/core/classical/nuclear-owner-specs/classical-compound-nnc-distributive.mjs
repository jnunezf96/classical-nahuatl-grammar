const spec = {
  "ownerId": "classical-compound-nnc-distributive",
  "prefix": "ClassicalCompoundNncDistributive",
  "operationId": "classical.compound.nnc.distributive.execute",
  "inputContract": "complete-typed-classical-compound-nnc-distributive-source",
  "domain": "classical-compound-nnc-distributive",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-compound-nnc-runtime",
  "selections": [
    "claim-p3127"
  ],
  "coordinates": {
    "claim-p3127::p3127-notice-the-difference-in-the-following-compound-stem-formations": {
      "assertionId": "classical-compound-nnc-distributive:p3127-notice-the-difference-in-the-following-compound-stem-formations",
      "canonicalPath": "cases.distributive.rules.compound-nnc/distributive"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCompoundNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCompoundNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3127": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3127": "authorized"
  }
};
export default Object.freeze(spec);
