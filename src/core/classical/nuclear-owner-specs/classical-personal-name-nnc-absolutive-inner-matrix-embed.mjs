const spec = {
  "ownerId": "classical-personal-name-nnc-absolutive-inner-matrix-embed",
  "prefix": "ClassicalPersonalNameNncAbsolutiveInnerMatrixEmbed",
  "operationId": "classical.personal.name.nnc.absolutive.inner.matrix.embed.execute",
  "inputContract": "complete-typed-classical-personal-name-nnc-absolutive-inner-matrix-embed-source",
  "domain": "classical-personal-name-nnc-absolutive-inner-matrix-embed",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-personal-name-nnc-runtime",
  "selections": [
    "claim-p5202"
  ],
  "coordinates": {
    "claim-p5202::p5202-the-matrix-of-the-inner-stem-is-o-po": {
      "assertionId": "classical-personal-name-nnc-absolutive-inner-matrix-embed:p5202-the-matrix-of-the-inner-stem-is-o-po",
      "canonicalPath": "result.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalPersonalNameNncValidationFrame",
  "executionValidatorName": "isClassicalPersonalNameNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5202": [
      "absolutive-inner-matrix-embed",
      "absolutive-state-nnc",
      "default",
      ""
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5202": "authorized"
  }
};
export default Object.freeze(spec);
