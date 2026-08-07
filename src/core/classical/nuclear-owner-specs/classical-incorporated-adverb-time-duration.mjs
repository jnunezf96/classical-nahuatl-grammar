const spec = {
  "ownerId": "classical-incorporated-adverb-time-duration",
  "prefix": "ClassicalIncorporatedAdverbTimeDuration",
  "operationId": "classical.incorporated.adverb.time.duration.execute",
  "inputContract": "complete-typed-classical-incorporated-adverb-time-duration-source",
  "domain": "classical-incorporated-adverb-time-duration",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nominal-embed-runtime",
  "selections": [
    "claim-p2991",
    "claim-p2992"
  ],
  "coordinates": {
    "claim-p2991::p2991-the-incorporated-nnc-may-signify-the-time-of-an": {
      "assertionId": "classical-incorporated-adverb-time-duration:p2991-the-incorporated-nnc-may-signify-the-time-of-an",
      "canonicalPath": "cases.timeDuration.rules.incorporated-adverb/time-duration"
    },
    "claim-p2992::p2992-the-incorporated-nnc-may-also-signify-duration-of-an": {
      "assertionId": "classical-incorporated-adverb-time-duration:p2992-the-incorporated-nnc-may-also-signify-duration-of-an",
      "canonicalPath": "cases.timeDuration.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNominalEmbedValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNominalEmbedValidationFrame",
  "executionArgsBySelection": {
    "claim-p2991": [],
    "claim-p2992": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2991": "authorized",
    "claim-p2992": "authorized"
  }
};
export default Object.freeze(spec);
