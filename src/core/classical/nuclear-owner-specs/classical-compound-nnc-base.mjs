const spec = {
  "ownerId": "classical-compound-nnc-base",
  "prefix": "ClassicalCompoundNncBase",
  "operationId": "classical.compound.nnc.base.execute",
  "inputContract": "complete-typed-classical-compound-nnc-base-source",
  "domain": "classical-compound-nnc-base",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-compound-nnc-runtime",
  "selections": [
    "claim-p3064",
    "claim-p3065",
    "claim-p3066"
  ],
  "coordinates": {
    "claim-p3064::p3064-a-compound-nounstem-results-from-the-nnc-nnc-nnc": {
      "assertionId": "classical-compound-nnc-base:p3064-a-compound-nounstem-results-from-the-nnc-nnc-nnc",
      "canonicalPath": "cases.base.rules.compound-nnc/base"
    },
    "claim-p3065::p3065-like-compound-verbstems-compound-nounstems-organize-the-relations-between": {
      "assertionId": "classical-compound-nnc-base:p3065-like-compound-verbstems-compound-nounstems-organize-the-relations-between",
      "canonicalPath": "cases.base.authorizationStatus"
    },
    "claim-p3066::p3066-the-stem-occupying-the-embed-subposition-in-a-compound": {
      "assertionId": "classical-compound-nnc-base:p3066-the-stem-occupying-the-embed-subposition-in-a-compound",
      "canonicalPath": "cases.base.gcdSatisfied"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCompoundNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCompoundNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3064": [],
    "claim-p3065": [],
    "claim-p3066": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3064": "authorized",
    "claim-p3065": "authorized",
    "claim-p3066": "authorized"
  }
};
export default Object.freeze(spec);
