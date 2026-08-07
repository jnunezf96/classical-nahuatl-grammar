const spec = {
  "ownerId": "classical-adverbial-incorporation-subject-discard",
  "prefix": "ClassicalAdverbialIncorporationSubjectDiscard",
  "operationId": "classical.adverbial.incorporation.subject.discard.execute",
  "inputContract": "complete-typed-classical-adverbial-incorporation-subject-discard-source",
  "domain": "classical-adverbial-incorporation-subject-discard",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-nuclear-runtime",
  "selections": [
    "claim-p4225"
  ],
  "coordinates": {
    "claim-p4225::p4225-as-explained-in-30-5-the-predicate-of-absolutive": {
      "assertionId": "classical-adverbial-incorporation-subject-discard:p4225-as-explained-in-30-5-the-predicate-of-absolutive",
      "canonicalPath": "cases.incorporation.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialNuclearValidationFrame",
  "executionValidatorName": "isClassicalAdverbialNuclearValidationFrame",
  "executionArgsBySelection": {
    "claim-p4225": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4225": "authorized"
  }
};
export default Object.freeze(spec);
