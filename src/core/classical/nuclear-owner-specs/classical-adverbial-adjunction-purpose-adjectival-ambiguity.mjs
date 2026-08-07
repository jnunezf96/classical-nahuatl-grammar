const spec = {
  "ownerId": "classical-adverbial-adjunction-purpose-adjectival-ambiguity",
  "prefix": "ClassicalAdverbialAdjunctionPurposeAdjectivalAmbiguity",
  "operationId": "classical.adverbial.adjunction.purpose.adjectival.ambiguity.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-purpose-adjectival-ambiguity-source",
  "domain": "classical-adverbial-adjunction-purpose-adjectival-ambiguity",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4732"
  ],
  "coordinates": {
    "claim-p4732::p4732-occasionally-as-in-this-instance-the-construction-is-ambiguous": {
      "assertionId": "classical-adverbial-adjunction-purpose-adjectival-ambiguity:p4732-occasionally-as-in-this-instance-the-construction-is-ambiguous",
      "canonicalPath": "analysis.purposeMayCompeteWithAdjectivalClause"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4732": [
      "purpose-adjectival-ambiguity"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4732": "authorized"
  }
};
export default Object.freeze(spec);
