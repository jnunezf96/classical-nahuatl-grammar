const spec = {
  "ownerId": "classical-nominal-embed-relation",
  "prefix": "ClassicalNominalEmbedRelation",
  "operationId": "classical.nominal.embed.relation.execute",
  "inputContract": "complete-typed-classical-nominal-embed-relation-source",
  "domain": "classical-nominal-embed-relation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nominal-embed-runtime",
  "selections": [
    "claim-p2962"
  ],
  "coordinates": {},
  "executionFunctionName": "buildClassicalNahuatlNominalEmbedValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNominalEmbedValidationFrame",
  "executionArgsBySelection": {
    "claim-p2962": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2962": "authorized"
  }
};
export default Object.freeze(spec);
