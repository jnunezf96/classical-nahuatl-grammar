const spec = {
  "ownerId": "classical-incorporated-adverb-manner",
  "prefix": "ClassicalIncorporatedAdverbManner",
  "operationId": "classical.incorporated.adverb.manner.execute",
  "inputContract": "complete-typed-classical-incorporated-adverb-manner-source",
  "domain": "classical-incorporated-adverb-manner",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nominal-embed-runtime",
  "selections": [
    "claim-p2994",
    "claim-p2995"
  ],
  "coordinates": {
    "claim-p2994::p2994-the-incorporated-nnc-may-represent-the-manner-in-which": {
      "assertionId": "classical-incorporated-adverb-manner:p2994-the-incorporated-nnc-may-represent-the-manner-in-which",
      "canonicalPath": "cases.manner.rules.incorporated-adverb/manner"
    },
    "claim-p2995::p2995-a-related-concept-is-that-of-in-the-form": {
      "assertionId": "classical-incorporated-adverb-manner:p2995-a-related-concept-is-that-of-in-the-form",
      "canonicalPath": "cases.manner.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNominalEmbedValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNominalEmbedValidationFrame",
  "executionArgsBySelection": {
    "claim-p2994": [],
    "claim-p2995": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2994": "authorized",
    "claim-p2995": "authorized"
  }
};
export default Object.freeze(spec);
