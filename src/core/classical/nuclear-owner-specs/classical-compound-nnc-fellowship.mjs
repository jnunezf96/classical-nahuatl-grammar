const spec = {
  "ownerId": "classical-compound-nnc-fellowship",
  "prefix": "ClassicalCompoundNncFellowship",
  "operationId": "classical.compound.nnc.fellowship.execute",
  "inputContract": "complete-typed-classical-compound-nnc-fellowship-source",
  "domain": "classical-compound-nnc-fellowship",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-compound-nnc-runtime",
  "selections": [
    "claim-p3120"
  ],
  "coordinates": {
    "claim-p3120::p3120-the-stem-poh-tli-companion-match-equal-peer-which": {
      "assertionId": "classical-compound-nnc-fellowship:p3120-the-stem-poh-tli-companion-match-equal-peer-which",
      "canonicalPath": "cases.fellowship.rules.compound-nnc/fellowship"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCompoundNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCompoundNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3120": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3120": "authorized"
  }
};
export default Object.freeze(spec);
