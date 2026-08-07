const spec = {
  "ownerId": "classical-relational-continuation-option-one-two-three-inventory",
  "prefix": "ClassicalRelationalContinuationOptionOneTwoThreeInventory",
  "operationId": "classical.relational.continuation.option.one.two.three.inventory.execute",
  "inputContract": "complete-typed-classical-relational-continuation-option-one-two-three-inventory-source",
  "domain": "classical-relational-continuation-option-one-two-three-inventory",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-relational-continuation-runtime",
  "selections": [
    "claim-p4501"
  ],
  "coordinates": {
    "claim-p4501::p4501-there-are-three-relational-nounstems-that-can-serve-as": {
      "assertionId": "classical-relational-continuation-option-one-two-three-inventory:p4501-there-are-three-relational-nounstems-that-can-serve-as",
      "canonicalPath": "catalog.optionOneTwoThreeStemIds"
    }
  },
  "executionFunctionName": "buildClassicalRelationalContinuationValidationFrame",
  "executionValidatorName": "isClassicalRelationalContinuationValidationFrame",
  "executionArgsBySelection": {
    "claim-p4501": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4501": "authorized"
  }
};
export default Object.freeze(spec);
