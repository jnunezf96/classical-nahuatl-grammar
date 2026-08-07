const spec = {
  "ownerId": "classical-intransitive-compound-matrix-inventory",
  "prefix": "ClassicalIntransitiveCompoundMatrixInventory",
  "operationId": "classical.intransitive.compound.matrix.inventory.execute",
  "inputContract": "complete-typed-classical-intransitive-compound-matrix-inventory-source",
  "domain": "classical-intransitive-compound-matrix-inventory",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-compound-runtime",
  "selections": [
    "claim-p2771",
    "claim-p2772",
    "claim-p2773",
    "claim-p2774"
  ],
  "coordinates": {
    "claim-p2771::p2771-in-the-intransitive-matrix-compound-stem-the-matrix-subposition": {
      "assertionId": "classical-intransitive-compound-matrix-inventory:p2771-in-the-intransitive-matrix-compound-stem-the-matrix-subposition",
      "canonicalPath": "contract.intransitiveMatrixInventory.0"
    },
    "claim-p2772::p2772-notice-that-at-times-a-stem-may-have-an": {
      "assertionId": "classical-intransitive-compound-matrix-inventory:p2772-notice-that-at-times-a-stem-may-have-an",
      "canonicalPath": "contract.intransitiveMatrixInventory.1"
    },
    "claim-p2773::p2773-the-following-are-those-that-occur-most-frequently": {
      "assertionId": "classical-intransitive-compound-matrix-inventory:p2773-the-following-are-those-that-occur-most-frequently",
      "canonicalPath": "contract.intransitiveMatrixInventory.4"
    },
    "claim-p2774::p2774-the-process-may-be-abstractly-represented-in-terms-of": {
      "assertionId": "classical-intransitive-compound-matrix-inventory:p2774-the-process-may-be-abstractly-represented-in-terms-of",
      "canonicalPath": "blockedCases.unknownMatrix.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCompoundValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCompoundValidationFrame",
  "executionArgsBySelection": {
    "claim-p2771": [],
    "claim-p2772": [],
    "claim-p2773": [],
    "claim-p2774": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2771": "authorized",
    "claim-p2772": "authorized",
    "claim-p2773": "authorized",
    "claim-p2774": "authorized"
  }
};
export default Object.freeze(spec);
