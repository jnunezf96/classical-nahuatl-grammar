const spec = {
  "ownerId": "classical-incorporated-adverb-means",
  "prefix": "ClassicalIncorporatedAdverbMeans",
  "operationId": "classical.incorporated.adverb.means.execute",
  "inputContract": "complete-typed-classical-incorporated-adverb-means-source",
  "domain": "classical-incorporated-adverb-means",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nominal-embed-runtime",
  "selections": [
    "claim-p2984",
    "claim-p2985"
  ],
  "coordinates": {
    "claim-p2984::p2984-incorporated-adverbs-of-means-or-instrument": {
      "assertionId": "classical-incorporated-adverb-means:p2984-incorporated-adverbs-of-means-or-instrument",
      "canonicalPath": "cases.direct.rules.incorporated-adverb/means"
    },
    "claim-p2985::p2985-the-incorporated-nnc-may-represent-the-means-or-instrument": {
      "assertionId": "classical-incorporated-adverb-means:p2985-the-incorporated-nnc-may-represent-the-means-or-instrument",
      "canonicalPath": "cases.direct.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNominalEmbedValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNominalEmbedValidationFrame",
  "executionArgsBySelection": {
    "claim-p2984": [],
    "claim-p2985": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2984": "authorized",
    "claim-p2985": "authorized"
  }
};
export default Object.freeze(spec);
