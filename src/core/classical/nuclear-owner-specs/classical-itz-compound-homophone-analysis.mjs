const spec = {
  "ownerId": "classical-itz-compound-homophone-analysis",
  "prefix": "ClassicalItzCompoundHomophoneAnalysis",
  "operationId": "classical.itz.compound.homophone.analysis.execute",
  "inputContract": "complete-typed-classical-itz-compound-homophone-analysis-source",
  "domain": "classical-itz-compound-homophone-analysis",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-compound-runtime",
  "selections": [
    "claim-p2830",
    "claim-p2831",
    "claim-p2832"
  ],
  "coordinates": {
    "claim-p2830::p2830-note-one-should-not-confuse-the-intransitive-embed-stem": {
      "assertionId": "classical-itz-compound-homophone-analysis:p2830-note-one-should-not-confuse-the-intransitive-embed-stem",
      "canonicalPath": "cases.itzObservational.facts.itzSourceAnalysis"
    },
    "claim-p2831::p2831-itz-ti-uh-to-go-going-i-e-to": {
      "assertionId": "classical-itz-compound-homophone-analysis:p2831-itz-ti-uh-to-go-going-i-e-to",
      "canonicalPath": "cases.itzMotion.facts.itzSourceAnalysis"
    },
    "claim-p2832::p2832-itz-t-e-hua-to-get-up-and-go": {
      "assertionId": "classical-itz-compound-homophone-analysis:p2832-itz-t-e-hua-to-get-up-and-go",
      "canonicalPath": "cases.itzMotionEHuaReversed.facts.eventOrder"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCompoundValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCompoundValidationFrame",
  "executionArgsBySelection": {
    "claim-p2830": [],
    "claim-p2831": [],
    "claim-p2832": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2830": "authorized",
    "claim-p2831": "authorized",
    "claim-p2832": "authorized"
  }
};
export default Object.freeze(spec);
