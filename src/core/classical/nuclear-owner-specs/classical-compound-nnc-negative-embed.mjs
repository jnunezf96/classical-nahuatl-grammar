const spec = {
  "ownerId": "classical-compound-nnc-negative-embed",
  "prefix": "ClassicalCompoundNncNegativeEmbed",
  "operationId": "classical.compound.nnc.negative.embed.execute",
  "inputContract": "complete-typed-classical-compound-nnc-negative-embed-source",
  "domain": "classical-compound-nnc-negative-embed",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-compound-nnc-runtime",
  "selections": [
    "claim-p3101"
  ],
  "coordinates": {
    "claim-p3101::p3101-note-1-in-addition-to-negating-a-nuclear-clause": {
      "assertionId": "classical-compound-nnc-negative-embed:p3101-note-1-in-addition-to-negating-a-nuclear-clause",
      "canonicalPath": "cases.negativeEmbed.rules.compound-nnc/negative-embed"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCompoundNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCompoundNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3101": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3101": "authorized"
  }
};
export default Object.freeze(spec);
