const spec = {
  "ownerId": "classical-locative-have-supplementation",
  "prefix": "ClassicalLocativeHaveSupplementation",
  "operationId": "classical.locative.have.supplementation.execute",
  "inputContract": "complete-typed-classical-locative-have-supplementation-source",
  "domain": "classical-locative-have-supplementation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-supplementation-runtime",
  "selections": [
    "claim-p1799",
    "claim-p1800"
  ],
  "coordinates": {
    "claim-p1799::p1799-before-the-conquest-nahuatl-had-no-verb-equivalent-to": {
      "assertionId": "classical-locative-have-supplementation:p1799-before-the-conquest-nahuatl-had-no-verb-equivalent-to",
      "canonicalPath": "extractedFrames.have.locativePrincipalStem"
    },
    "claim-p1800::p1800-one-of-the-ways-the-notion-was-expressed-was": {
      "assertionId": "classical-locative-have-supplementation:p1800-one-of-the-ways-the-notion-was-expressed-was",
      "canonicalPath": "extractedFrames.have.possessiveSupplement"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlSupplementationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlSupplementationValidationFrame",
  "executionArgsBySelection": {
    "claim-p1799": [],
    "claim-p1800": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1799": "authorized",
    "claim-p1800": "authorized"
  }
};
export default Object.freeze(spec);
