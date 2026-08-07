const spec = {
  "ownerId": "classical-nominal-embed-base",
  "prefix": "ClassicalNominalEmbedBase",
  "operationId": "classical.nominal.embed.base.execute",
  "inputContract": "complete-typed-classical-nominal-embed-base-source",
  "domain": "classical-nominal-embed-base",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nominal-embed-runtime",
  "selections": [
    "claim-p2960"
  ],
  "coordinates": {
    "claim-p2960::p2960-when-a-compound-verbstem-results-from-embedding-or-more": {
      "assertionId": "classical-nominal-embed-base:p2960-when-a-compound-verbstem-results-from-embedding-or-more",
      "canonicalPath": "cases.base.rules.nominal-embed/base"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNominalEmbedValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNominalEmbedValidationFrame",
  "executionArgsBySelection": {
    "claim-p2960": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2960": "authorized"
  }
};
export default Object.freeze(spec);
