const spec = {
  "ownerId": "classical-adjectival-interrogative-adjoined-unit",
  "prefix": "ClassicalAdjectivalInterrogativeAdjoinedUnit",
  "operationId": "classical.adjectival.interrogative.adjoined.unit.execute",
  "inputContract": "complete-typed-classical-adjectival-interrogative-adjoined-unit-source",
  "domain": "classical-adjectival-interrogative-adjoined-unit",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p4104",
    "claim-p4105",
    "claim-p4106",
    "claim-p4107"
  ],
  "coordinates": {
    "claim-p4104::p4104-both-the-structure-of-supplementation-and-the-structure-of": {
      "assertionId": "classical-adjectival-interrogative-adjoined-unit:p4104-both-the-structure-of-supplementation-and-the-structure-of",
      "canonicalPath": "cases.interrogativeHead.canonicalResult"
    },
    "claim-p4105::p4105-adjoined-unit-in-a-larger-sentence-this-adjoined-unit": {
      "assertionId": "classical-adjectival-interrogative-adjoined-unit:p4105-adjoined-unit-in-a-larger-sentence-this-adjoined-unit",
      "canonicalPath": "cases.interrogativeHead.headClauseType"
    },
    "claim-p4106::p4106-the-important-point-here-is-that-in-the-adjoined": {
      "assertionId": "classical-adjectival-interrogative-adjoined-unit:p4106-the-important-point-here-is-that-in-the-adjoined",
      "canonicalPath": "contract.documentarySpellingAuthority"
    },
    "claim-p4107::p4107-it-is-the-adjunctor-or-lack-of-one-after": {
      "assertionId": "classical-adjectival-interrogative-adjoined-unit:p4107-it-is-the-adjunctor-or-lack-of-one-after",
      "canonicalPath": "cases.interrogativeHead.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p4104": [],
    "claim-p4105": [],
    "claim-p4106": [],
    "claim-p4107": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4104": "authorized",
    "claim-p4105": "authorized",
    "claim-p4106": "authorized",
    "claim-p4107": "authorized"
  }
};
export default Object.freeze(spec);
