const spec = {
  "ownerId": "classical-adjectival-lexicalized-modification-compound",
  "prefix": "ClassicalAdjectivalLexicalizedModificationCompound",
  "operationId": "classical.adjectival.lexicalized.modification.compound.execute",
  "inputContract": "complete-typed-classical-adjectival-lexicalized-modification-compound-source",
  "domain": "classical-adjectival-lexicalized-modification-compound",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p4086"
  ],
  "coordinates": {
    "claim-p4086::p4086-there-are-certain-modifier-nnc-plus-head-nnc-sequences": {
      "assertionId": "classical-adjectival-lexicalized-modification-compound:p4086-there-are-certain-modifier-nnc-plus-head-nnc-sequences",
      "canonicalPath": "sources.compoundNnc.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p4086": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4086": "authorized"
  }
};
export default Object.freeze(spec);
