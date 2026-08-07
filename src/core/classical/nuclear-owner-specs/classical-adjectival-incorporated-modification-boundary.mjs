const spec = {
  "ownerId": "classical-adjectival-incorporated-modification-boundary",
  "prefix": "ClassicalAdjectivalIncorporatedModificationBoundary",
  "operationId": "classical.adjectival.incorporated.modification.boundary.execute",
  "inputContract": "complete-typed-classical-adjectival-incorporated-modification-boundary-source",
  "domain": "classical-adjectival-incorporated-modification-boundary",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p4084",
    "claim-p4085"
  ],
  "coordinates": {
    "claim-p4084::p4084-a-structure-of-adjectival-modification-that-participates-in-this": {
      "assertionId": "classical-adjectival-incorporated-modification-boundary:p4084-a-structure-of-adjectival-modification-that-participates-in-this",
      "canonicalPath": "sources.compoundNnc.authorizationStatus"
    },
    "claim-p4085::p4085-a-plus-sign-inside-the-compound-stem-marks-the": {
      "assertionId": "classical-adjectival-incorporated-modification-boundary:p4085-a-plus-sign-inside-the-compound-stem-marks-the",
      "canonicalPath": "sources.compoundNnc.cases.base.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p4084": [],
    "claim-p4085": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4084": "authorized",
    "claim-p4085": "authorized"
  }
};
export default Object.freeze(spec);
