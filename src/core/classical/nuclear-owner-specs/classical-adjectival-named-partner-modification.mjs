const spec = {
  "ownerId": "classical-adjectival-named-partner-modification",
  "prefix": "ClassicalAdjectivalNamedPartnerModification",
  "operationId": "classical.adjectival.named.partner.modification.execute",
  "inputContract": "complete-typed-classical-adjectival-named-partner-modification-source",
  "domain": "classical-adjectival-named-partner-modification",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p4134",
    "claim-p4135"
  ],
  "coordinates": {
    "claim-p4134::p4134-when-the-makeup-of-a-group-includes-a-known": {
      "assertionId": "classical-adjectival-named-partner-modification:p4134-when-the-makeup-of-a-group-includes-a-known",
      "canonicalPath": "cases.namedPartner.canonicalResult"
    },
    "claim-p4135::p4135-when-the-makeup-of-a-group-includes-a-known": {
      "assertionId": "classical-adjectival-named-partner-modification:p4135-when-the-makeup-of-a-group-includes-a-known",
      "canonicalPath": "cases.namedPartner.exceptionProfile"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p4134": [],
    "claim-p4135": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4134": "authorized",
    "claim-p4135": "authorized"
  }
};
export default Object.freeze(spec);
