const spec = {
  "ownerId": "classical-adjectival-in-pattern-scope-disambiguation",
  "prefix": "ClassicalAdjectivalInPatternScopeDisambiguation",
  "operationId": "classical.adjectival.in.pattern.scope.disambiguation.execute",
  "inputContract": "complete-typed-classical-adjectival-in-pattern-scope-disambiguation-source",
  "domain": "classical-adjectival-in-pattern-scope-disambiguation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p4032",
    "claim-p4033",
    "claim-p4034"
  ],
  "coordinates": {
    "claim-p4032::p4032-when-standing-alone": {
      "assertionId": "classical-adjectival-in-pattern-scope-disambiguation:p4032-when-standing-alone",
      "canonicalPath": "cases.markedPreposed.canonicalResult"
    },
    "claim-p4033::p4033-this-disambiguates-the-in-adjunct-principal-pattern-when-standing": {
      "assertionId": "classical-adjectival-in-pattern-scope-disambiguation:p4033-this-disambiguates-the-in-adjunct-principal-pattern-when-standing",
      "canonicalPath": "cases.markedPreposed.compositionScope"
    },
    "claim-p4034::p4034-even-though-all-the-theoretically-possible-patterns-may-not": {
      "assertionId": "classical-adjectival-in-pattern-scope-disambiguation:p4034-even-though-all-the-theoretically-possible-patterns-may-not",
      "canonicalPath": "cases.markedPreposed.adjunctor"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p4032": [],
    "claim-p4033": [],
    "claim-p4034": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4032": "authorized",
    "claim-p4033": "authorized",
    "claim-p4034": "authorized"
  }
};
export default Object.freeze(spec);
