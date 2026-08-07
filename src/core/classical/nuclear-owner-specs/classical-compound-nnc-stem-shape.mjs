const spec = {
  "ownerId": "classical-compound-nnc-stem-shape",
  "prefix": "ClassicalCompoundNncStemShape",
  "operationId": "classical.compound.nnc.stem.shape.execute",
  "inputContract": "complete-typed-classical-compound-nnc-stem-shape-source",
  "domain": "classical-compound-nnc-stem-shape",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-compound-nnc-runtime",
  "selections": [
    "claim-p3097",
    "claim-p3098",
    "claim-p3099"
  ],
  "coordinates": {
    "claim-p3097::p3097-the-embed-subposition-is-filled-with-a-tli-in": {
      "assertionId": "classical-compound-nnc-stem-shape:p3097-the-embed-subposition-is-filled-with-a-tli-in",
      "canonicalPath": "cases.base.rules.compound-nnc/stem-shape"
    },
    "claim-p3098::p3098-the-embed-subposition-is-filled-with-a-ti-stem": {
      "assertionId": "classical-compound-nnc-stem-shape:p3098-the-embed-subposition-is-filled-with-a-ti-stem",
      "canonicalPath": "cases.base.authorizationStatus"
    },
    "claim-p3099::p3099-the-embed-subposition-is-filled-with-a-ti-stem": {
      "assertionId": "classical-compound-nnc-stem-shape:p3099-the-embed-subposition-is-filled-with-a-ti-stem",
      "canonicalPath": "cases.base.gcdSatisfied"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCompoundNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCompoundNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3097": [],
    "claim-p3098": [],
    "claim-p3099": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3097": "authorized",
    "claim-p3098": "authorized",
    "claim-p3099": "authorized"
  }
};
export default Object.freeze(spec);
