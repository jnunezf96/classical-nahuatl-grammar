const spec = {
  "ownerId": "classical-relational-locative-can-pronominal-modifier",
  "prefix": "ClassicalRelationalLocativeCanPronominalModifier",
  "operationId": "classical.relational.locative.can.pronominal.modifier.execute",
  "inputContract": "complete-typed-classical-relational-locative-can-pronominal-modifier-source",
  "domain": "classical-relational-locative-can-pronominal-modifier",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-locative-relational-nnc-runtime",
  "selections": [
    "claim-p4359",
    "claim-p4360",
    "claim-p4361"
  ],
  "coordinates": {
    "claim-p4359::p4359-when-the-x-component-is-present": {
      "assertionId": "classical-relational-locative-can-pronominal-modifier:p4359-when-the-x-component-is-present",
      "canonicalPath": "cases.canModified.canonicalResult"
    },
    "claim-p4360::p4360-when-the-x-component-is-present-it-is-represented": {
      "assertionId": "classical-relational-locative-can-pronominal-modifier:p4360-when-the-x-component-is-present-it-is-represented",
      "canonicalPath": "cases.canModified.predicateStem"
    },
    "claim-p4361::p4361-it-may-be-a-pronominal-stem": {
      "assertionId": "classical-relational-locative-can-pronominal-modifier:p4361-it-may-be-a-pronominal-stem",
      "canonicalPath": "cases.canModified.sourceKind"
    }
  },
  "executionFunctionName": "buildClassicalLocativeRelationalNncValidationFrame",
  "executionValidatorName": "isClassicalLocativeRelationalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4359": [],
    "claim-p4360": [],
    "claim-p4361": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4359": "authorized",
    "claim-p4360": "authorized",
    "claim-p4361": "authorized"
  }
};
export default Object.freeze(spec);
