const spec = {
  "ownerId": "classical-e-hua-compound-matrix-formation",
  "prefix": "ClassicalEHuaCompoundMatrixFormation",
  "operationId": "classical.e.hua.compound.matrix.formation.execute",
  "inputContract": "complete-typed-classical-e-hua-compound-matrix-formation-source",
  "domain": "classical-e-hua-compound-matrix-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-compound-runtime",
  "selections": [
    "claim-p2806",
    "claim-p2807",
    "claim-p2808",
    "claim-p2809",
    "claim-p2810"
  ],
  "coordinates": {
    "claim-p2806::p2806-when-functioning-as-the-matrix-of-a-compound-stem": {
      "assertionId": "classical-e-hua-compound-matrix-formation:p2806-when-functioning-as-the-matrix-of-a-compound-stem",
      "canonicalPath": "cases.intransitiveMatrices.ē-hua.targetStem"
    },
    "claim-p2807::p2807-m-e-uh-t-e-hua-to-get-up": {
      "assertionId": "classical-e-hua-compound-matrix-formation:p2807-m-e-uh-t-e-hua-to-get-up",
      "canonicalPath": "cases.intransitiveMatrices.ē-hua.authorizationStatus"
    },
    "claim-p2808::p2808-tla-cauh-t-e-hua-to-leaves-th-and": {
      "assertionId": "classical-e-hua-compound-matrix-formation:p2808-tla-cauh-t-e-hua-to-leaves-th-and",
      "canonicalPath": "cases.intransitiveMatrices.ē-hua.targetStem"
    },
    "claim-p2809::p2809-ti-c-ca-uh-t-e-hua-z-qu": {
      "assertionId": "classical-e-hua-compound-matrix-formation:p2809-ti-c-ca-uh-t-e-hua-z-qu",
      "canonicalPath": "cases.intransitiveMatrices.ē-hua.authorizationStatus"
    },
    "claim-p2810::p2810-cual-a-n-t-e-hua-to-get-up": {
      "assertionId": "classical-e-hua-compound-matrix-formation:p2810-cual-a-n-t-e-hua-to-get-up",
      "canonicalPath": "cases.intransitiveMatrices.ē-hua.targetStem"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCompoundValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCompoundValidationFrame",
  "executionArgsBySelection": {
    "claim-p2806": [],
    "claim-p2807": [],
    "claim-p2808": [],
    "claim-p2809": [],
    "claim-p2810": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2806": "authorized",
    "claim-p2807": "authorized",
    "claim-p2808": "authorized",
    "claim-p2809": "authorized",
    "claim-p2810": "authorized"
  }
};
export default Object.freeze(spec);
