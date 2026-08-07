const spec = {
  "ownerId": "classical-affective-mass-delimitation",
  "prefix": "ClassicalAffectiveMassDelimitation",
  "operationId": "classical.affective.mass.delimitation.execute",
  "inputContract": "complete-typed-classical-affective-mass-delimitation-source",
  "domain": "classical-affective-mass-delimitation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-affective-nnc-runtime",
  "selections": [
    "claim-p3142",
    "claim-p3143"
  ],
  "coordinates": {
    "claim-p3142::p3142-the-affective-matrix-nounstem-tzin-tli-may-also-embed": {
      "assertionId": "classical-affective-mass-delimitation:p3142-the-affective-matrix-nounstem-tzin-tli-may-also-embed",
      "canonicalPath": "cases.massDelimitation.rules.affective/mass-delimitation"
    },
    "claim-p3143::p3143-the-resultant-compound-affective-nounstem-usually-has-the-meaning": {
      "assertionId": "classical-affective-mass-delimitation:p3143-the-resultant-compound-affective-nounstem-usually-has-the-meaning",
      "canonicalPath": "cases.massDelimitation.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAffectiveNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAffectiveNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3142": [],
    "claim-p3143": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3142": "authorized",
    "claim-p3143": "authorized"
  }
};
export default Object.freeze(spec);
