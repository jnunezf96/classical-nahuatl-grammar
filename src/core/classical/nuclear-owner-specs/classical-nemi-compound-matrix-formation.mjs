const spec = {
  "ownerId": "classical-nemi-compound-matrix-formation",
  "prefix": "ClassicalNemiCompoundMatrixFormation",
  "operationId": "classical.nemi.compound.matrix.formation.execute",
  "inputContract": "complete-typed-classical-nemi-compound-matrix-formation-source",
  "domain": "classical-nemi-compound-matrix-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-compound-runtime",
  "selections": [
    "claim-p2781",
    "claim-p2782"
  ],
  "coordinates": {
    "claim-p2781::p2781-o-ni-cual-a-n-ti-nen": {
      "assertionId": "classical-nemi-compound-matrix-formation:p2781-o-ni-cual-a-n-ti-nen",
      "canonicalPath": "cases.intransitiveMatrices.nemi.facts.matrixConstruction"
    },
    "claim-p2782::p2782-te-hui-ca-ti-nemi-to-go-along-accompanying": {
      "assertionId": "classical-nemi-compound-matrix-formation:p2782-te-hui-ca-ti-nemi-to-go-along-accompanying",
      "canonicalPath": "cases.preteritEmbed.facts.matrixFiniteStem"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCompoundValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCompoundValidationFrame",
  "executionArgsBySelection": {
    "claim-p2781": [],
    "claim-p2782": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2781": "authorized",
    "claim-p2782": "authorized"
  }
};
export default Object.freeze(spec);
