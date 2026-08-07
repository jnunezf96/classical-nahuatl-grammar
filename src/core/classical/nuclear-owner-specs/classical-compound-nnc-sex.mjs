const spec = {
  "ownerId": "classical-compound-nnc-sex",
  "prefix": "ClassicalCompoundNncSex",
  "operationId": "classical.compound.nnc.sex.execute",
  "inputContract": "complete-typed-classical-compound-nnc-sex-source",
  "domain": "classical-compound-nnc-sex",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-compound-nnc-runtime",
  "selections": [
    "claim-p3117",
    "claim-p3118"
  ],
  "coordinates": {
    "claim-p3117::p3117-a-matrix-nounstem-signifying-an-animate-entity-can-incorporate": {
      "assertionId": "classical-compound-nnc-sex:p3117-a-matrix-nounstem-signifying-an-animate-entity-can-incorporate",
      "canonicalPath": "cases.sex.rules.compound-nnc/sex"
    },
    "claim-p3118::p3118-ordinarily-nounstems-signifying-humans-are-neutral-with-regard-to": {
      "assertionId": "classical-compound-nnc-sex:p3118-ordinarily-nounstems-signifying-humans-are-neutral-with-regard-to",
      "canonicalPath": "cases.sex.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCompoundNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCompoundNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3117": [],
    "claim-p3118": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3117": "authorized",
    "claim-p3118": "authorized"
  }
};
export default Object.freeze(spec);
