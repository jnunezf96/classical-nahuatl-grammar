const spec = {
  "ownerId": "classical-adverbial-quen-fused-adjunctor-in",
  "prefix": "ClassicalAdverbialQuenFusedAdjunctorIn",
  "operationId": "classical.adverbial.quen.fused.adjunctor.in.execute",
  "inputContract": "complete-typed-classical-adverbial-quen-fused-adjunctor-in-source",
  "domain": "classical-adverbial-quen-fused-adjunctor-in",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-nuclear-runtime",
  "selections": [
    "claim-p4185",
    "claim-p4186",
    "claim-p4187"
  ],
  "coordinates": {
    "claim-p4185::p4185-is-vouched-for-by-its-role-as-embed-in": {
      "assertionId": "classical-adverbial-quen-fused-adjunctor-in:p4185-is-vouched-for-by-its-role-as-embed-in",
      "canonicalPath": "cases.particleQuenInitial.canonicalResult"
    },
    "claim-p4187::p4187-the-fusion-of-que-and-in-has-been-so": {
      "assertionId": "classical-adverbial-quen-fused-adjunctor-in:p4187-the-fusion-of-que-and-in-has-been-so",
      "canonicalPath": "cases.particleQuenInitial.lexicalEntryId"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialNuclearValidationFrame",
  "executionValidatorName": "isClassicalAdverbialNuclearValidationFrame",
  "executionArgsBySelection": {
    "claim-p4185": [],
    "claim-p4186": [],
    "claim-p4187": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4185": "authorized",
    "claim-p4186": "authorized",
    "claim-p4187": "authorized"
  }
};
export default Object.freeze(spec);
