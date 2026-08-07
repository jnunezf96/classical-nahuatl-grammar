const spec = {
  "ownerId": "classical-adjectival-ordinary-nnc-modifier",
  "prefix": "ClassicalAdjectivalOrdinaryNncModifier",
  "operationId": "classical.adjectival.ordinary.nnc.modifier.execute",
  "inputContract": "complete-typed-classical-adjectival-ordinary-nnc-modifier-source",
  "domain": "classical-adjectival-ordinary-nnc-modifier",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p4073",
    "claim-p4074"
  ],
  "coordinates": {
    "claim-p4073::p4073-annnc": {
      "assertionId": "classical-adjectival-ordinary-nnc-modifier:p4073-annnc",
      "canonicalPath": "cases.ordinary.canonicalResult"
    },
    "claim-p4074::p4074-a-structure-of-modification-containing-an-nnc-as-modifier": {
      "assertionId": "classical-adjectival-ordinary-nnc-modifier:p4074-a-structure-of-modification-containing-an-nnc-as-modifier",
      "canonicalPath": "cases.ordinary.operationKind"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p4073": [],
    "claim-p4074": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4073": "authorized",
    "claim-p4074": "authorized"
  }
};
export default Object.freeze(spec);
