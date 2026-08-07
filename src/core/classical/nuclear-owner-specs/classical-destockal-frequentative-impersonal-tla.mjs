const spec = {
  "ownerId": "classical-destockal-frequentative-impersonal-tla",
  "prefix": "ClassicalDestockalFrequentativeImpersonalTla",
  "operationId": "classical.destockal.frequentative.impersonal.tla.execute",
  "inputContract": "complete-typed-classical-destockal-frequentative-impersonal-tla-source",
  "domain": "classical-destockal-frequentative-impersonal-tla",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-frequentative-runtime",
  "selections": [
    "claim-p2690",
    "claim-p2691"
  ],
  "coordinates": {
    "claim-p2690::p2690-the-frequentative-intransitive-stems-can-also-be-made-impersonal": {
      "assertionId": "classical-destockal-frequentative-impersonal-tla:p2690-the-frequentative-intransitive-stems-can-also-be-made-impersonal",
      "canonicalPath": "cases.destockalImpersonalTla.targetStem"
    },
    "claim-p2691::p2691-tla-cua-cual-a-ca-to-thunder": {
      "assertionId": "classical-destockal-frequentative-impersonal-tla:p2691-tla-cua-cual-a-ca-to-thunder",
      "canonicalPath": "cases.destockalImpersonalTla.operationFacts.semanticForce"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlFrequentativeValidationFrame",
  "executionValidatorName": "isClassicalNahuatlFrequentativeValidationFrame",
  "executionArgsBySelection": {
    "claim-p2690": [],
    "claim-p2691": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2690": "authorized",
    "claim-p2691": "authorized"
  }
};
export default Object.freeze(spec);
