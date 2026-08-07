const spec = {
  "ownerId": "classical-denominal-vnc-ahui-weather-root-analysis",
  "prefix": "ClassicalDenominalVncAhuiWeatherRootAnalysis",
  "operationId": "classical.denominal.vnc.ahui.weather.root.analysis.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-ahui-weather-root-analysis-source",
  "domain": "classical-denominal-vnc-ahui-weather-root-analysis",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5147"
  ],
  "coordinates": {
    "claim-p5147::p5147-the-verbstem-quiy-a-hui-to-rain-is-probably": {
      "assertionId": "classical-denominal-vnc-ahui-weather-root-analysis:p5147-the-verbstem-quiy-a-hui-to-rain-is-probably",
      "canonicalPath": "analysis.traditionalSpellingAuthority"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5147": [
      "ahui-weather-root-analysis",
      "denominal-a-hui",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5147": "authorized"
  }
};
export default Object.freeze(spec);
