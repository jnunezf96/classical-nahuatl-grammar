const spec = {
  "ownerId": "classical-denominal-vnc-ti-a-glottal-source-analysis",
  "prefix": "ClassicalDenominalVncTiAGlottalSourceAnalysis",
  "operationId": "classical.denominal.vnc.ti.a.glottal.source.analysis.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-ti-a-glottal-source-analysis-source",
  "domain": "classical-denominal-vnc-ti-a-glottal-source-analysis",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5076"
  ],
  "coordinates": {
    "claim-p5076::p5076-the-presence-of-the-glottal-stop-represented-by-j": {
      "assertionId": "classical-denominal-vnc-ti-a-glottal-source-analysis:p5076-the-presence-of-the-glottal-stop-represented-by-j",
      "canonicalPath": "analysis.traditionalSpellingAuthority"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5076": [
      "ti-a-glottal-source-analysis",
      "ti-a-causative-single",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5076": "authorized"
  }
};
export default Object.freeze(spec);
