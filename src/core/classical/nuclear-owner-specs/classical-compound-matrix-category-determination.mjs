const spec = {
  "ownerId": "classical-compound-matrix-category-determination",
  "prefix": "ClassicalCompoundMatrixCategoryDetermination",
  "operationId": "classical.compound.matrix.category.determination.execute",
  "inputContract": "complete-typed-classical-compound-matrix-category-determination-source",
  "domain": "classical-compound-matrix-category-determination",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-compound-runtime",
  "selections": [
    "claim-p2732",
    "claim-p2733",
    "claim-p2734"
  ],
  "coordinates": {
    "claim-p2732::p2732-as-is-obvious-from-the-formulas-in-28-1": {
      "assertionId": "classical-compound-matrix-category-determination:p2732-as-is-obvious-from-the-formulas-in-28-1",
      "canonicalPath": "contract.matrixDeterminesCompoundKind"
    },
    "claim-p2733::p2733-if-the-filler-is-verbal-the-matrix-subposition-is": {
      "assertionId": "classical-compound-matrix-category-determination:p2733-if-the-filler-is-verbal-the-matrix-subposition-is",
      "canonicalPath": "cases.basic.facts.matrixSourceValence"
    },
    "claim-p2734::p2734-if-there-is-a-nominal-filler-the-matrix-subposition": {
      "assertionId": "classical-compound-matrix-category-determination:p2734-if-there-is-a-nominal-filler-the-matrix-subposition",
      "canonicalPath": "contract.matrixDeterminesCompoundKind"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCompoundValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCompoundValidationFrame",
  "executionArgsBySelection": {
    "claim-p2732": [],
    "claim-p2733": [],
    "claim-p2734": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2732": "authorized",
    "claim-p2733": "authorized",
    "claim-p2734": "authorized"
  }
};
export default Object.freeze(spec);
