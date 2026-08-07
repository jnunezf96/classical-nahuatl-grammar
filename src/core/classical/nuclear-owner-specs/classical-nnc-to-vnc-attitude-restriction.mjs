const spec = {
  "ownerId": "classical-nnc-to-vnc-attitude-restriction",
  "prefix": "ClassicalNncToVncAttitudeRestriction",
  "operationId": "classical.nnc.to.vnc.attitude.restriction.execute",
  "inputContract": "complete-typed-classical-nnc-to-vnc-attitude-restriction-source",
  "domain": "classical-nnc-to-vnc-attitude-restriction",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-affective-nnc-runtime",
  "selections": [
    "claim-p3154"
  ],
  "coordinates": {
    "claim-p3154::p3154-the-affective-matrix-nounsterns-tzin-tli-and-po-l": {
      "assertionId": "classical-nnc-to-vnc-attitude-restriction:p3154-the-affective-matrix-nounsterns-tzin-tli-and-po-l",
      "canonicalPath": "blockedCases.freeTzinDenominal.blockReason"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAffectiveNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAffectiveNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3154": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3154": "authorized"
  }
};
export default Object.freeze(spec);
