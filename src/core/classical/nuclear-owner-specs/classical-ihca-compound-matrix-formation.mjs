const spec = {
  "ownerId": "classical-ihca-compound-matrix-formation",
  "prefix": "ClassicalIhcaCompoundMatrixFormation",
  "operationId": "classical.ihca.compound.matrix.formation.execute",
  "inputContract": "complete-typed-classical-ihca-compound-matrix-formation-source",
  "domain": "classical-ihca-compound-matrix-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-compound-runtime",
  "selections": [
    "claim-p2803"
  ],
  "coordinates": {
    "claim-p2803::p2803-cho-ca-t-ihca-to-stand-crying": {
      "assertionId": "classical-ihca-compound-matrix-formation:p2803-cho-ca-t-ihca-to-stand-crying",
      "canonicalPath": "cases.intransitiveMatrices.ihca.targetStem"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCompoundValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCompoundValidationFrame",
  "executionArgsBySelection": {
    "claim-p2803": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2803": "authorized"
  }
};
export default Object.freeze(spec);
