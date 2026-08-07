const spec = {
  "ownerId": "classical-adjectival-nepapan-affinity-function",
  "prefix": "ClassicalAdjectivalNepapanAffinityFunction",
  "operationId": "classical.adjectival.nepapan.affinity.function.execute",
  "inputContract": "complete-typed-classical-adjectival-nepapan-affinity-function-source",
  "domain": "classical-adjectival-nepapan-affinity-function",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p3871"
  ],
  "coordinates": {
    "claim-p3871::p3871-one-adjectival-nnc-nepa-pan-they-are-various-ones": {
      "assertionId": "classical-adjectival-nepapan-affinity-function:p3871-one-adjectival-nnc-nepa-pan-they-are-various-ones",
      "canonicalPath": "sources.compoundNnc.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p3871": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3871": "authorized"
  }
};
export default Object.freeze(spec);
