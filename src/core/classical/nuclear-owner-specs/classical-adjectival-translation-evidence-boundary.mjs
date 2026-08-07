const spec = {
  "ownerId": "classical-adjectival-translation-evidence-boundary",
  "prefix": "ClassicalAdjectivalTranslationEvidenceBoundary",
  "operationId": "classical.adjectival.translation.evidence.boundary.execute",
  "inputContract": "complete-typed-classical-adjectival-translation-evidence-boundary-source",
  "domain": "classical-adjectival-translation-evidence-boundary",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p3889"
  ],
  "coordinates": {
    "claim-p3889::p3889-for-the-present-the-possibility-of-treating-absolutive-state": {
      "assertionId": "classical-adjectival-translation-evidence-boundary:p3889-for-the-present-the-possibility-of-treating-absolutive-state",
      "canonicalPath": "contract.translationAuthority"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p3889": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3889": "authorized"
  }
};
export default Object.freeze(spec);
