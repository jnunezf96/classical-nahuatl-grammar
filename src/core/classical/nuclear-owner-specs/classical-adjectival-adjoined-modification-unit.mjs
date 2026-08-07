const spec = {
  "ownerId": "classical-adjectival-adjoined-modification-unit",
  "prefix": "ClassicalAdjectivalAdjoinedModificationUnit",
  "operationId": "classical.adjectival.adjoined.modification.unit.execute",
  "inputContract": "complete-typed-classical-adjectival-adjoined-modification-unit-source",
  "domain": "classical-adjectival-adjoined-modification-unit",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p4022"
  ],
  "coordinates": {
    "claim-p4022::p4022-a-structure-of-modification-as-a-unit-may-be": {
      "assertionId": "classical-adjectival-adjoined-modification-unit:p4022-a-structure-of-modification-as-a-unit-may-be",
      "canonicalPath": "cases.markedPreposed.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p4022": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4022": "authorized"
  }
};
export default Object.freeze(spec);
