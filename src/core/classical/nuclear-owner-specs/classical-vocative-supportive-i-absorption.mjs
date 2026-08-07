const spec = {
  "ownerId": "classical-vocative-supportive-i-absorption",
  "prefix": "ClassicalVocativeSupportiveIAbsorption",
  "operationId": "classical.vocative.supportive.i.absorption.execute",
  "inputContract": "complete-typed-classical-vocative-supportive-i-absorption-source",
  "domain": "classical-vocative-supportive-i-absorption",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-supplementation-runtime",
  "selections": [
    "claim-p1870",
    "claim-p1871",
    "claim-p1872"
  ],
  "coordinates": {
    "claim-p1870::p1870-if-the-nnc-ends-in-a-supportive-i-the": {
      "assertionId": "classical-vocative-supportive-i-absorption:p1870-if-the-nnc-ends-in-a-supportive-i-the",
      "canonicalPath": "vocativeMale.operations.0"
    },
    "claim-p1871::p1871-pille-o-noble-pilli": {
      "assertionId": "classical-vocative-supportive-i-absorption:p1871-pille-o-noble-pilli",
      "canonicalPath": "vocativeMale.operations.1"
    },
    "claim-p1872::p1872-nocne-o-my-buddy-used-sarcastically-hey-rogue-nocni": {
      "assertionId": "classical-vocative-supportive-i-absorption:p1872-nocne-o-my-buddy-used-sarcastically-hey-rogue-nocni",
      "canonicalPath": "vocativeMale.surfaceRealization"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlSupplementationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlSupplementationValidationFrame",
  "executionArgsBySelection": {
    "claim-p1870": [],
    "claim-p1871": [],
    "claim-p1872": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1870": "authorized",
    "claim-p1871": "authorized",
    "claim-p1872": "authorized"
  }
};
export default Object.freeze(spec);
