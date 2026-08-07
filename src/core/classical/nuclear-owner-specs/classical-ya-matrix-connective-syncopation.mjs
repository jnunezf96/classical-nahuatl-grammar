const spec = {
  "ownerId": "classical-ya-matrix-connective-syncopation",
  "prefix": "ClassicalYaMatrixConnectiveSyncopation",
  "operationId": "classical.ya.matrix.connective.syncopation.execute",
  "inputContract": "complete-typed-classical-ya-matrix-connective-syncopation-source",
  "domain": "classical-ya-matrix-connective-syncopation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-compound-runtime",
  "selections": [
    "claim-p2787",
    "claim-p2788"
  ],
  "coordinates": {
    "claim-p2787::p2787-note-1-when-the-matrix-verbstem-has-the-shape": {
      "assertionId": "classical-ya-matrix-connective-syncopation:p2787-note-1-when-the-matrix-verbstem-has-the-shape",
      "canonicalPath": "cases.syncopatedYa.targetStem"
    },
    "claim-p2788::p2788-tla-cuah-t-a-to-eat-before-going-to": {
      "assertionId": "classical-ya-matrix-connective-syncopation:p2788-tla-cuah-t-a-to-eat-before-going-to",
      "canonicalPath": "cases.syncopatedYa.facts.connective"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCompoundValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCompoundValidationFrame",
  "executionArgsBySelection": {
    "claim-p2787": [],
    "claim-p2788": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2787": "authorized",
    "claim-p2788": "authorized"
  }
};
export default Object.freeze(spec);
