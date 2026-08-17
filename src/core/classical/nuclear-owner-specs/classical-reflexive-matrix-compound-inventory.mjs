const spec = {
  "ownerId": "classical-reflexive-matrix-compound-inventory",
  "prefix": "ClassicalReflexiveMatrixCompoundInventory",
  "operationId": "classical.reflexive.matrix.compound.inventory.execute",
  "inputContract": "complete-typed-classical-reflexive-matrix-compound-inventory-source",
  "domain": "classical-reflexive-matrix-compound-inventory",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-compound-runtime",
  "selections": [
    "claim-p2853",
    "claim-p2854",
    "claim-p2855",
    "claim-p2856",
    "claim-p2857"
  ],
  "coordinates": {
    "claim-p2853::p2853-te-yahual-o-h-ti-m-o-te-ca": {
      "assertionId": "classical-reflexive-matrix-compound-inventory:p2853-te-yahual-o-h-ti-m-o-te-ca",
      "canonicalPath": "cases.reflexiveMatrices.m-o-tēca.facts.matrixReadingOptions"
    },
    "claim-p2854::p2854-tla-mat-ti-m-o-tla-l-i-a": {
      "assertionId": "classical-reflexive-matrix-compound-inventory:p2854-tla-mat-ti-m-o-tla-l-i-a",
      "canonicalPath": "cases.reflexiveMatrices.m-o-tlāl-i-ā.facts.matrixReadingOptions"
    },
    "claim-p2855::p2855-i-got-control-of-myself": {
      "assertionId": "classical-reflexive-matrix-compound-inventory:p2855-i-got-control-of-myself",
      "canonicalPath": "cases.reflexiveMatrices.m-o-tlāl-i-ā.facts.matrixReadingOptions"
    },
    "claim-p2856::p2856-nal-to-na-ti-m-o-man-a-to": {
      "assertionId": "classical-reflexive-matrix-compound-inventory:p2856-nal-to-na-ti-m-o-man-a-to",
      "canonicalPath": "cases.reflexiveMatrices.m-o-man-a.targetStem"
    },
    "claim-p2857::p2857-the-m-o-man-a-matrix-cannot-be-used": {
      "assertionId": "classical-reflexive-matrix-compound-inventory:p2857-the-m-o-man-a-matrix-cannot-be-used",
      "canonicalPath": "blockedCases.animateSingularMana.blockReason"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCompoundValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCompoundValidationFrame",
  "executionArgsBySelection": {
    "claim-p2853": [],
    "claim-p2854": [],
    "claim-p2855": [],
    "claim-p2856": [],
    "claim-p2857": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2853": "authorized",
    "claim-p2854": "authorized",
    "claim-p2855": "authorized",
    "claim-p2856": "authorized",
    "claim-p2857": "authorized"
  }
};
export default Object.freeze(spec);
