const spec = {
  "ownerId": "classical-nonactive-connective-evidence-analysis",
  "prefix": "ClassicalNonactiveConnectiveEvidenceAnalysis",
  "operationId": "classical.nonactive.connective.evidence.analysis.execute",
  "inputContract": "complete-typed-classical-nonactive-connective-evidence-analysis-source",
  "domain": "classical-nonactive-connective-evidence-analysis",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nonactive-voice-object-runtime",
  "selections": [
    "claim-p1977",
    "claim-p1978"
  ],
  "coordinates": {
    "claim-p1977::p1977-the-two-morphemes-are-written-solid-in-these-lessons": {
      "assertionId": "classical-nonactive-connective-evidence-analysis:p1977-the-two-morphemes-are-written-solid-in-these-lessons",
      "canonicalPath": "contract.callerSuppliedAuthorityAccepted"
    },
    "claim-p1978::p1978-if-the-w-of-hua-is-also-the-same": {
      "assertionId": "classical-nonactive-connective-evidence-analysis:p1978-if-the-w-of-hua-is-also-the-same",
      "canonicalPath": "nonactive.records.lo.selectionAuthority"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionArgsBySelection": {
    "claim-p1977": [],
    "claim-p1978": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1977": "authorized",
    "claim-p1978": "authorized"
  }
};
export default Object.freeze(spec);
