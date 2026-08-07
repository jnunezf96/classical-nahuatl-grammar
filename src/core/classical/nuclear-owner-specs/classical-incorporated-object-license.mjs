const spec = {
  "ownerId": "classical-incorporated-object-license",
  "prefix": "ClassicalIncorporatedObjectLicense",
  "operationId": "classical.incorporated.object.license.execute",
  "inputContract": "complete-typed-classical-incorporated-object-license-source",
  "domain": "classical-incorporated-object-license",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nominal-embed-runtime",
  "selections": [
    "claim-p2963",
    "claim-p2964"
  ],
  "coordinates": {
    "claim-p2963::p2963-this-formation-is-possible-only-when-a-transitive-vnc": {
      "assertionId": "classical-incorporated-object-license:p2963-this-formation-is-possible-only-when-a-transitive-vnc",
      "canonicalPath": "cases.object.rules.incorporated-object/license"
    },
    "claim-p2964::p2964-the-nnc-predicate-occupying-the-embed-subposition-qualifies-the": {
      "assertionId": "classical-incorporated-object-license:p2964-the-nnc-predicate-occupying-the-embed-subposition-qualifies-the",
      "canonicalPath": "cases.object.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNominalEmbedValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNominalEmbedValidationFrame",
  "executionArgsBySelection": {
    "claim-p2963": [],
    "claim-p2964": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2963": "authorized",
    "claim-p2964": "authorized"
  }
};
export default Object.freeze(spec);
