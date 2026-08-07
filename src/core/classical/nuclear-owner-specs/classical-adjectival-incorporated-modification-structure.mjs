const spec = {
  "ownerId": "classical-adjectival-incorporated-modification-structure",
  "prefix": "ClassicalAdjectivalIncorporatedModificationStructure",
  "operationId": "classical.adjectival.incorporated.modification.structure.execute",
  "inputContract": "complete-typed-classical-adjectival-incorporated-modification-structure-source",
  "domain": "classical-adjectival-incorporated-modification-structure",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p4081",
    "claim-p4082"
  ],
  "coordinates": {
    "claim-p4081::p4081-not-only-can-the-language-incorporate-the-predicate-of": {
      "assertionId": "classical-adjectival-incorporated-modification-structure:p4081-not-only-can-the-language-incorporate-the-predicate-of",
      "canonicalPath": "sources.compoundNnc.authorizationStatus"
    },
    "claim-p4082::p4082-that-is-an-entire-structure-consisting-of-adjectival-modifier": {
      "assertionId": "classical-adjectival-incorporated-modification-structure:p4082-that-is-an-entire-structure-consisting-of-adjectival-modifier",
      "canonicalPath": "sources.compoundNnc.cases.base.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p4081": [],
    "claim-p4082": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4081": "authorized",
    "claim-p4082": "authorized"
  }
};
export default Object.freeze(spec);
