const spec = {
  "ownerId": "classical-compound-nnc-bracketing",
  "prefix": "ClassicalCompoundNncBracketing",
  "operationId": "classical.compound.nnc.bracketing.execute",
  "inputContract": "complete-typed-classical-compound-nnc-bracketing-source",
  "domain": "classical-compound-nnc-bracketing",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-compound-nnc-runtime",
  "selections": [
    "claim-p3116"
  ],
  "coordinates": {
    "claim-p3116::p3116-at-times-possibly-ambiguous-combinations-occur": {
      "assertionId": "classical-compound-nnc-bracketing:p3116-at-times-possibly-ambiguous-combinations-occur",
      "canonicalPath": "cases.recursiveMatrix.rules.compound-nnc/bracketing"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCompoundNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCompoundNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3116": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3116": "authorized"
  }
};
export default Object.freeze(spec);
