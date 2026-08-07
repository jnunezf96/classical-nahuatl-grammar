const spec = {
  "ownerId": "classical-adverbial-first-degree-subject-shape",
  "prefix": "ClassicalAdverbialFirstDegreeSubjectShape",
  "operationId": "classical.adverbial.first.degree.subject.shape.execute",
  "inputContract": "complete-typed-classical-adverbial-first-degree-subject-shape-source",
  "domain": "classical-adverbial-first-degree-subject-shape",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-nuclear-runtime",
  "selections": [
    "claim-p4142"
  ],
  "coordinates": {
    "claim-p4142::p4142-the-first-degree-is-merely-semantic-that-is-there": {
      "assertionId": "classical-adverbial-first-degree-subject-shape:p4142-the-first-degree-is-merely-semantic-that-is-there",
      "canonicalPath": "cases.firstDegree.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialNuclearValidationFrame",
  "executionValidatorName": "isClassicalAdverbialNuclearValidationFrame",
  "executionArgsBySelection": {
    "claim-p4142": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4142": "authorized"
  }
};
export default Object.freeze(spec);
