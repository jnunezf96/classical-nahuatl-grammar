const spec = {
  "ownerId": "classical-place-gentilic-place-chan-supplementation",
  "prefix": "ClassicalPlaceGentilicPlaceChanSupplementation",
  "operationId": "classical.place.gentilic.place.chan.supplementation.execute",
  "inputContract": "complete-typed-classical-place-gentilic-place-chan-supplementation-source",
  "domain": "classical-place-gentilic-place-chan-supplementation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-place-gentilic-runtime",
  "selections": [
    "claim-p4602",
    "claim-p4603",
    "claim-p4604"
  ],
  "coordinates": {
    "claim-p4602::p4602-the-formation-type-created-by-means-of-this-stem": {
      "assertionId": "classical-place-gentilic-place-chan-supplementation:p4602-the-formation-type-created-by-means-of-this-stem",
      "canonicalPath": "cases.chan.canonicalFrame"
    },
    "claim-p4603::p4603-being-a-place-name-the-construction-is-typically-adverbialized": {
      "assertionId": "classical-place-gentilic-place-chan-supplementation:p4603-being-a-place-name-the-construction-is-typically-adverbialized",
      "canonicalPath": "cases.chan.lcmAxisId"
    },
    "claim-p4604::p4604-there-is-another-place-name-nnc-that-apparently-involves": {
      "assertionId": "classical-place-gentilic-place-chan-supplementation:p4604-there-is-another-place-name-nnc-that-apparently-involves",
      "canonicalPath": "cases.chan.canonicalFrame"
    }
  },
  "executionFunctionName": "buildClassicalPlaceGentilicValidationFrame",
  "executionValidatorName": "isClassicalPlaceGentilicValidationFrame",
  "executionArgsBySelection": {
    "claim-p4602": [],
    "claim-p4603": [],
    "claim-p4604": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4602": "authorized",
    "claim-p4603": "authorized",
    "claim-p4604": "authorized"
  }
};
export default Object.freeze(spec);
