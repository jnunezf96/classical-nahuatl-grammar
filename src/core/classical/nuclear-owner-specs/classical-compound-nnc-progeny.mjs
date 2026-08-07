const spec = {
  "ownerId": "classical-compound-nnc-progeny",
  "prefix": "ClassicalCompoundNncProgeny",
  "operationId": "classical.compound.nnc.progeny.execute",
  "inputContract": "complete-typed-classical-compound-nnc-progeny-source",
  "domain": "classical-compound-nnc-progeny",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-compound-nnc-runtime",
  "selections": [
    "claim-p3119"
  ],
  "coordinates": {
    "claim-p3119::p3119-the-stem-cone-tl-child-offspring-may-serve-as": {
      "assertionId": "classical-compound-nnc-progeny:p3119-the-stem-cone-tl-child-offspring-may-serve-as",
      "canonicalPath": "cases.progeny.rules.compound-nnc/progeny"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCompoundNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCompoundNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3119": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3119": "authorized"
  }
};
export default Object.freeze(spec);
