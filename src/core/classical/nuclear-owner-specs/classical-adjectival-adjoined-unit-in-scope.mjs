const spec = {
  "ownerId": "classical-adjectival-adjoined-unit-in-scope",
  "prefix": "ClassicalAdjectivalAdjoinedUnitInScope",
  "operationId": "classical.adjectival.adjoined.unit.in.scope.execute",
  "inputContract": "complete-typed-classical-adjectival-adjoined-unit-in-scope-source",
  "domain": "classical-adjectival-adjoined-unit-in-scope",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p4023",
    "claim-p4024",
    "claim-p4025"
  ],
  "coordinates": {
    "claim-p4023::p4023-the-multiple-nucleus-adjoined-unit-may-be-introduced-by": {
      "assertionId": "classical-adjectival-adjoined-unit-in-scope:p4023-the-multiple-nucleus-adjoined-unit-may-be-introduced-by",
      "canonicalPath": "cases.markedPreposed.canonicalResult"
    },
    "claim-p4024::p4024-in-the-last-example-in-cana-huac-cuei-tl": {
      "assertionId": "classical-adjectival-adjoined-unit-in-scope:p4024-in-the-last-example-in-cana-huac-cuei-tl",
      "canonicalPath": "cases.markedPreposed.compositionScope"
    },
    "claim-p4025::p4025-similarly-in-the-following-example-in-ticualtin-timocni-hua": {
      "assertionId": "classical-adjectival-adjoined-unit-in-scope:p4025-similarly-in-the-following-example-in-ticualtin-timocni-hua",
      "canonicalPath": "cases.markedPreposed.adjunctor"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p4023": [],
    "claim-p4024": [],
    "claim-p4025": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4023": "authorized",
    "claim-p4024": "authorized",
    "claim-p4025": "authorized"
  }
};
export default Object.freeze(spec);
