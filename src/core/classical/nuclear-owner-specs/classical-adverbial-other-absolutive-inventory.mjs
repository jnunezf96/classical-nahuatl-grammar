const spec = {
  "ownerId": "classical-adverbial-other-absolutive-inventory",
  "prefix": "ClassicalAdverbialOtherAbsolutiveInventory",
  "operationId": "classical.adverbial.other.absolutive.inventory.execute",
  "inputContract": "complete-typed-classical-adverbial-other-absolutive-inventory-source",
  "domain": "classical-adverbial-other-absolutive-inventory",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-nuclear-runtime",
  "selections": [
    "claim-p4191",
    "claim-p4192"
  ],
  "coordinates": {
    "claim-p4191::p4191-while-in-44-5-seconddegree-adverbialization-creates-nncs-whose": {
      "assertionId": "classical-adverbial-other-absolutive-inventory:p4191-while-in-44-5-seconddegree-adverbialization-creates-nncs-whose",
      "canonicalPath": "cases.otherPlace.canonicalResult"
    },
    "claim-p4192::p4192-nnc-cectlapal-for-the-embed-ce-c-see-16": {
      "assertionId": "classical-adverbial-other-absolutive-inventory:p4192-nnc-cectlapal-for-the-embed-ce-c-see-16",
      "canonicalPath": "cases.otherPlace.family"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialNuclearValidationFrame",
  "executionValidatorName": "isClassicalAdverbialNuclearValidationFrame",
  "executionArgsBySelection": {
    "claim-p4191": [],
    "claim-p4192": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4191": "authorized",
    "claim-p4192": "authorized"
  }
};
export default Object.freeze(spec);
