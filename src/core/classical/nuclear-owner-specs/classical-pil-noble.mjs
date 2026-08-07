const spec = {
  "ownerId": "classical-pil-noble",
  "prefix": "ClassicalPilNoble",
  "operationId": "classical.pil.noble.execute",
  "inputContract": "complete-typed-classical-pil-noble-source",
  "domain": "classical-pil-noble",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-affective-nnc-runtime",
  "selections": [
    "claim-p3185",
    "claim-p3186",
    "claim-p3187"
  ],
  "coordinates": {
    "claim-p3185::p3185-the-simple-stem-of-pil-li-is-used-in": {
      "assertionId": "classical-pil-noble:p3185-the-simple-stem-of-pil-li-is-used-in",
      "canonicalPath": "cases.pilNoble.rules.pil/noble"
    },
    "claim-p3186::p3186-the-nounstem-is-used-of-both-men-and-women": {
      "assertionId": "classical-pil-noble:p3186-the-nounstem-is-used-of-both-men-and-women",
      "canonicalPath": "cases.pilNoble.authorizationStatus"
    },
    "claim-p3187::p3187-to-form-a-possessive-state-nnc-the-stem-pil": {
      "assertionId": "classical-pil-noble:p3187-to-form-a-possessive-state-nnc-the-stem-pil",
      "canonicalPath": "cases.pilNoble.gcdSatisfied"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAffectiveNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAffectiveNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3185": [],
    "claim-p3186": [],
    "claim-p3187": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3185": "authorized",
    "claim-p3186": "authorized",
    "claim-p3187": "authorized"
  }
};
export default Object.freeze(spec);
