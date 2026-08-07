const spec = {
  "ownerId": "classical-adverbial-quen-sentence-position",
  "prefix": "ClassicalAdverbialQuenSentencePosition",
  "operationId": "classical.adverbial.quen.sentence.position.execute",
  "inputContract": "complete-typed-classical-adverbial-quen-sentence-position-source",
  "domain": "classical-adverbial-quen-sentence-position",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-nuclear-runtime",
  "selections": [
    "claim-p4188",
    "claim-p4189"
  ],
  "coordinates": {
    "claim-p4188::p4188-when-not-sentence-initial": {
      "assertionId": "classical-adverbial-quen-sentence-position:p4188-when-not-sentence-initial",
      "canonicalPath": "cases.particleQuenNoninitial.canonicalResult"
    },
    "claim-p4189::p4189-when-not-sentence-initial-like-all-inherent-interrogatives-it": {
      "assertionId": "classical-adverbial-quen-sentence-position:p4189-when-not-sentence-initial-like-all-inherent-interrogatives-it",
      "canonicalPath": "cases.particleQuenNoninitial.context.interrogativeForce"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialNuclearValidationFrame",
  "executionValidatorName": "isClassicalAdverbialNuclearValidationFrame",
  "executionArgsBySelection": {
    "claim-p4188": [],
    "claim-p4189": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4188": "authorized",
    "claim-p4189": "authorized"
  }
};
export default Object.freeze(spec);
