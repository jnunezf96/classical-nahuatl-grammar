const spec = {
  "ownerId": "classical-compound-nnc-ca-exclusion",
  "prefix": "ClassicalCompoundNncCaExclusion",
  "operationId": "classical.compound.nnc.ca.exclusion.execute",
  "inputContract": "complete-typed-classical-compound-nnc-ca-exclusion-source",
  "domain": "classical-compound-nnc-ca-exclusion",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-compound-nnc-runtime",
  "selections": [
    "claim-p3111"
  ],
  "coordinates": {
    "claim-p3111::p3111-not-included-in-this-kind-of-compound-nounstem-are": {
      "assertionId": "classical-compound-nnc-ca-exclusion:p3111-not-included-in-this-kind-of-compound-nounstem-are",
      "canonicalPath": "cases.caExclusion.rules.compound-nnc/ca-exclusion"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCompoundNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCompoundNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3111": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3111": "authorized"
  }
};
export default Object.freeze(spec);
