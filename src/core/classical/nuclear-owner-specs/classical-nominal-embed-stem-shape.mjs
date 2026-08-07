const spec = {
  "ownerId": "classical-nominal-embed-stem-shape",
  "prefix": "ClassicalNominalEmbedStemShape",
  "operationId": "classical.nominal.embed.stem.shape.execute",
  "inputContract": "complete-typed-classical-nominal-embed-stem-shape-source",
  "domain": "classical-nominal-embed-stem-shape",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nominal-embed-runtime",
  "selections": [
    "claim-p2961"
  ],
  "coordinates": {
    "claim-p2961::p2961-whether-the-source-for-the-nominal-embed-is-the": {
      "assertionId": "classical-nominal-embed-stem-shape:p2961-whether-the-source-for-the-nominal-embed-is-the",
      "canonicalPath": "cases.base.rules.nominal-embed/stem-shape"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNominalEmbedValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNominalEmbedValidationFrame",
  "executionArgsBySelection": {
    "claim-p2961": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2961": "authorized"
  }
};
export default Object.freeze(spec);
