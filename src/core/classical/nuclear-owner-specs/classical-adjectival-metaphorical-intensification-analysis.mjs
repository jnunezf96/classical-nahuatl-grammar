const spec = {
  "ownerId": "classical-adjectival-metaphorical-intensification-analysis",
  "prefix": "ClassicalAdjectivalMetaphoricalIntensificationAnalysis",
  "operationId": "classical.adjectival.metaphorical.intensification.analysis.execute",
  "inputContract": "complete-typed-classical-adjectival-metaphorical-intensification-analysis-source",
  "domain": "classical-adjectival-metaphorical-intensification-analysis",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p3980"
  ],
  "coordinates": {
    "claim-p3980::p3980-another-means-of-expressing-intensity-with-regard-to-a": {
      "assertionId": "classical-adjectival-metaphorical-intensification-analysis:p3980-another-means-of-expressing-intensity-with-regard-to-a",
      "canonicalPath": "contract.translationAuthority"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p3980": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3980": "authorized"
  }
};
export default Object.freeze(spec);
