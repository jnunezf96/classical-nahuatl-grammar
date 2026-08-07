const spec = {
  "ownerId": "classical-denominal-vnc-possession-ti-glottal-analysis",
  "prefix": "ClassicalDenominalVncPossessionTiGlottalAnalysis",
  "operationId": "classical.denominal.vnc.possession.ti.glottal.analysis.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-possession-ti-glottal-analysis-source",
  "domain": "classical-denominal-vnc-possession-ti-glottal-analysis",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5060"
  ],
  "coordinates": {
    "claim-p5060::p5060-carochi-does-not-show-a-glottal-stop-see-54": {
      "assertionId": "classical-denominal-vnc-possession-ti-glottal-analysis:p5060-carochi-does-not-show-a-glottal-stop-see-54",
      "canonicalPath": "analysis.traditionalSpellingAuthority"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5060": [
      "possession-ti-glottal-analysis",
      "possession-ti",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5060": "authorized"
  }
};
export default Object.freeze(spec);
