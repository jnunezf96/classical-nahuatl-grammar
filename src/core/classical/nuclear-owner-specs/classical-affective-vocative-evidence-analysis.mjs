const spec = {
  "ownerId": "classical-affective-vocative-evidence-analysis",
  "prefix": "ClassicalAffectiveVocativeEvidenceAnalysis",
  "operationId": "classical.affective.vocative.evidence.analysis.execute",
  "inputContract": "complete-typed-classical-affective-vocative-evidence-analysis-source",
  "domain": "classical-affective-vocative-evidence-analysis",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-affective-nnc-runtime",
  "selections": [
    "claim-p3146"
  ],
  "coordinates": {
    "claim-p3146::p3146-personal-names-borrowed-from-spanish-use-the-abbreviated-stem": {
      "assertionId": "classical-affective-vocative-evidence-analysis:p3146-personal-names-borrowed-from-spanish-use-the-abbreviated-stem",
      "canonicalPath": "cases.vocative.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAffectiveNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAffectiveNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3146": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3146": "authorized"
  }
};
export default Object.freeze(spec);
