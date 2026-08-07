const spec = {
  "ownerId": "classical-compound-nnc-embed-role",
  "prefix": "ClassicalCompoundNncEmbedRole",
  "operationId": "classical.compound.nnc.embed.role.execute",
  "inputContract": "complete-typed-classical-compound-nnc-embed-role-source",
  "domain": "classical-compound-nnc-embed-role",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-compound-nnc-runtime",
  "selections": [
    "claim-p3067",
    "claim-p3068",
    "claim-p3069"
  ],
  "coordinates": {
    "claim-p3067::p3067-the-embed-in-a-compound-nnc-may-be-derived": {
      "assertionId": "classical-compound-nnc-embed-role:p3067-the-embed-in-a-compound-nnc-may-be-derived",
      "canonicalPath": "cases.embedRole.rules.compound-nnc/embed-role"
    },
    "claim-p3068::p3068-whatever-the-source-the-embed-stem-performs-a-modifier": {
      "assertionId": "classical-compound-nnc-embed-role:p3068-whatever-the-source-the-embed-stem-performs-a-modifier",
      "canonicalPath": "cases.embedRole.authorizationStatus"
    },
    "claim-p3069::p3069-as-a-modifier-of-the-matrix-it-has-a": {
      "assertionId": "classical-compound-nnc-embed-role:p3069-as-a-modifier-of-the-matrix-it-has-a",
      "canonicalPath": "cases.embedRole.gcdSatisfied"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCompoundNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCompoundNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3067": [],
    "claim-p3068": [],
    "claim-p3069": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3067": "authorized",
    "claim-p3068": "authorized",
    "claim-p3069": "authorized"
  }
};
export default Object.freeze(spec);
