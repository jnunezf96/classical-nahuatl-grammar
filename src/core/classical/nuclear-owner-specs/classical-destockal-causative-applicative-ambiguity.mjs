const spec = {
  "ownerId": "classical-destockal-causative-applicative-ambiguity",
  "prefix": "ClassicalDestockalCausativeApplicativeAmbiguity",
  "operationId": "classical.destockal.causative.applicative.ambiguity.execute",
  "inputContract": "complete-typed-classical-destockal-causative-applicative-ambiguity-source",
  "domain": "classical-destockal-causative-applicative-ambiguity",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-frequentative-runtime",
  "selections": [
    "claim-p2705",
    "claim-p2706"
  ],
  "coordinates": {
    "claim-p2705::p2705-in-these-instances-the-stem-is-ambiguously-a-causative": {
      "assertionId": "classical-destockal-causative-applicative-ambiguity:p2705-in-these-instances-the-stem-is-ambiguously-a-causative",
      "canonicalPath": "cases.destockalApplicativeForce.operationFacts.semanticForce"
    },
    "claim-p2706::p2706-te-po-pol-o-tz-a-to-speak-to": {
      "assertionId": "classical-destockal-causative-applicative-ambiguity:p2706-te-po-pol-o-tz-a-to-speak-to",
      "canonicalPath": "cases.destockalApplicativeForce.targetValence"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlFrequentativeValidationFrame",
  "executionValidatorName": "isClassicalNahuatlFrequentativeValidationFrame",
  "executionArgsBySelection": {
    "claim-p2705": [],
    "claim-p2706": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2705": "authorized",
    "claim-p2706": "authorized"
  }
};
export default Object.freeze(spec);
