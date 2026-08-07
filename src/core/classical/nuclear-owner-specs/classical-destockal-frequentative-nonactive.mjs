const spec = {
  "ownerId": "classical-destockal-frequentative-nonactive",
  "prefix": "ClassicalDestockalFrequentativeNonactive",
  "operationId": "classical.destockal.frequentative.nonactive.execute",
  "inputContract": "complete-typed-classical-destockal-frequentative-nonactive-source",
  "domain": "classical-destockal-frequentative-nonactive",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-frequentative-runtime",
  "selections": [
    "claim-p2687",
    "claim-p2688",
    "claim-p2689"
  ],
  "coordinates": {
    "claim-p2687::p2687-these-frequentative-intransitive-destockal-verbstems-form-nonactive-stems-by": {
      "assertionId": "classical-destockal-frequentative-nonactive:p2687-these-frequentative-intransitive-destockal-verbstems-form-nonactive-stems-by",
      "canonicalPath": "cases.destockalNonactive.targetStem"
    },
    "claim-p2688::p2688-they-are-of-course-used-only-in-impersonal-voice": {
      "assertionId": "classical-destockal-frequentative-nonactive:p2688-they-are-of-course-used-only-in-impersonal-voice",
      "canonicalPath": "cases.destockalNonactive.sourceVoice"
    },
    "claim-p2689::p2689-cbi-cbin-a-c-o-chi-chin-a-c": {
      "assertionId": "classical-destockal-frequentative-nonactive:p2689-cbi-cbin-a-c-o-chi-chin-a-c",
      "canonicalPath": "cases.destockalNonactive.operationFacts.nonactiveAppliedToFrequentativeStem"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlFrequentativeValidationFrame",
  "executionValidatorName": "isClassicalNahuatlFrequentativeValidationFrame",
  "executionArgsBySelection": {
    "claim-p2687": [],
    "claim-p2688": [],
    "claim-p2689": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2687": "authorized",
    "claim-p2688": "authorized",
    "claim-p2689": "authorized"
  }
};
export default Object.freeze(spec);
