const spec = {
  "ownerId": "classical-attitude-compound-matrix-evidence-analysis",
  "prefix": "ClassicalAttitudeCompoundMatrixEvidenceAnalysis",
  "operationId": "classical.attitude.compound.matrix.evidence.analysis.execute",
  "inputContract": "complete-typed-classical-attitude-compound-matrix-evidence-analysis-source",
  "domain": "classical-attitude-compound-matrix-evidence-analysis",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-attitude-vnc-runtime",
  "selections": [
    "claim-p3251"
  ],
  "coordinates": {
    "claim-p3251::p3251-the-neutral-counterparts-of-the-following-honorific-vncs-are": {
      "assertionId": "classical-attitude-compound-matrix-evidence-analysis:p3251-the-neutral-counterparts-of-the-following-honorific-vncs-are",
      "canonicalPath": "cases.compoundMatrix.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAttitudeVncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAttitudeVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3251": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3251": "authorized"
  }
};
export default Object.freeze(spec);
