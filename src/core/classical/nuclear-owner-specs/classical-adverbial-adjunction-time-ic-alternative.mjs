const spec = {
  "ownerId": "classical-adverbial-adjunction-time-ic-alternative",
  "prefix": "ClassicalAdverbialAdjunctionTimeIcAlternative",
  "operationId": "classical.adverbial.adjunction.time.ic.alternative.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-time-ic-alternative-source",
  "domain": "classical-adverbial-adjunction-time-ic-alternative",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4708"
  ],
  "coordinates": {
    "claim-p4708::p4708-instead-of-ihcua-c-the-synonymous-possessive-state-adverbialized": {
      "assertionId": "classical-adverbial-adjunction-time-ic-alternative:p4708-instead-of-ihcua-c-the-synonymous-possessive-state-adverbialized",
      "canonicalPath": "analysis.possessiveIcTemporalAlternativeLicensed"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4708": [
      "time-ic-alternative"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4708": "authorized"
  }
};
export default Object.freeze(spec);
