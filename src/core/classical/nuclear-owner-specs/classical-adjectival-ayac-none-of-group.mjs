const spec = {
  "ownerId": "classical-adjectival-ayac-none-of-group",
  "prefix": "ClassicalAdjectivalAyacNoneOfGroup",
  "operationId": "classical.adjectival.ayac.none.of.group.execute",
  "inputContract": "complete-typed-classical-adjectival-ayac-none-of-group-source",
  "domain": "classical-adjectival-ayac-none-of-group",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p4129"
  ],
  "coordinates": {
    "claim-p4129::p4129-the-negative-pronominal-nnc-aya-c-he-she-is": {
      "assertionId": "classical-adjectival-ayac-none-of-group:p4129-the-negative-pronominal-nnc-aya-c-he-she-is",
      "canonicalPath": "cases.oneOf.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p4129": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4129": "authorized"
  }
};
export default Object.freeze(spec);
