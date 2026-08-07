const spec = {
  "ownerId": "classical-lo-class-d-reduced-length-formation",
  "prefix": "ClassicalLoClassDReducedLengthFormation",
  "operationId": "classical.lo.class.d.reduced.length.formation.execute",
  "inputContract": "complete-typed-classical-lo-class-d-reduced-length-formation-source",
  "domain": "classical-lo-class-d-reduced-length-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nonactive-voice-object-runtime",
  "selections": [
    "claim-p2001",
    "claim-p2002",
    "claim-p2003"
  ],
  "coordinates": {
    "claim-p2001::p2001-the-formation-is-exceptional-in-that-the-stem-final": {
      "assertionId": "classical-lo-class-d-reduced-length-formation:p2001-the-formation-is-exceptional-in-that-the-stem-final",
      "canonicalPath": "nonactive.loClassD.authorizationStatus"
    },
    "claim-p2002::p2002-tla-ma-to-captures-th": {
      "assertionId": "classical-lo-class-d-reduced-length-formation:p2002-tla-ma-to-captures-th",
      "canonicalPath": "nonactive.loClassD.verbClass"
    },
    "claim-p2003::p2003-tla-ma-ma-to-carry-s-th-on-one": {
      "assertionId": "classical-lo-class-d-reduced-length-formation:p2003-tla-ma-ma-to-carry-s-th-on-one",
      "canonicalPath": "contract.exceptionFamilies.2"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionArgsBySelection": {
    "claim-p2001": [],
    "claim-p2002": [],
    "claim-p2003": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2001": "authorized",
    "claim-p2002": "authorized",
    "claim-p2003": "authorized"
  }
};
export default Object.freeze(spec);
