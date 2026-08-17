const spec = {
  "ownerId": "classical-o-compound-matrix-formation",
  "prefix": "ClassicalOCompoundMatrixFormation",
  "operationId": "classical.o.compound.matrix.formation.execute",
  "inputContract": "complete-typed-classical-o-compound-matrix-formation-source",
  "domain": "classical-o-compound-matrix-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-compound-runtime",
  "selections": [
    "claim-p2804",
    "claim-p2805"
  ],
  "coordinates": {
    "claim-p2804::p2804-tlap-a-n-t-o-to-lie-after-having": {
      "assertionId": "classical-o-compound-matrix-formation:p2804-tlap-a-n-t-o-to-lie-after-having",
      "canonicalPath": "cases.oPreteritAsPresent.targetStem"
    },
    "claim-p2805::p2805-m-o-tlaz-t-o-to-be-recumbent-after": {
      "assertionId": "classical-o-compound-matrix-formation:p2805-m-o-tlaz-t-o-to-be-recumbent-after",
      "canonicalPath": "cases.oPreteritAsPresent.facts.oLocativeOnOmitted"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCompoundValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCompoundValidationFrame",
  "executionArgsBySelection": {
    "claim-p2804": [],
    "claim-p2805": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2804": "authorized",
    "claim-p2805": "authorized"
  }
};
export default Object.freeze(spec);
