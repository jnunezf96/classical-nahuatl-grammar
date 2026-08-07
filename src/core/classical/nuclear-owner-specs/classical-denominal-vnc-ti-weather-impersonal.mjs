const spec = {
  "ownerId": "classical-denominal-vnc-ti-weather-impersonal",
  "prefix": "ClassicalDenominalVncTiWeatherImpersonal",
  "operationId": "classical.denominal.vnc.ti.weather.impersonal.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-ti-weather-impersonal-source",
  "domain": "classical-denominal-vnc-ti-weather-impersonal",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p4969"
  ],
  "coordinates": {
    "claim-p4969::p4969-if-the-notion-of-time-or-weather-is-involved": {
      "assertionId": "classical-denominal-vnc-ti-weather-impersonal:p4969-if-the-notion-of-time-or-weather-is-involved",
      "canonicalPath": "result.operationId"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4969": [
      "ti-weather-impersonal",
      "inceptive-ti",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4969": "authorized"
  }
};
export default Object.freeze(spec);
