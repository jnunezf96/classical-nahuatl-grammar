const spec = {
  "ownerId": "classical-integrated-antecessive-supplementation",
  "prefix": "ClassicalIntegratedAntecessiveSupplementation",
  "operationId": "classical.integrated.antecessive.supplementation.execute",
  "inputContract": "complete-typed-classical-integrated-antecessive-supplementation-source",
  "domain": "classical-integrated-antecessive-supplementation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-supplementation-runtime",
  "selections": [
    "claim-p1829",
    "claim-p1830",
    "claim-p1831",
    "claim-p1832"
  ],
  "coordinates": {
    "claim-p1829::p1829-result-the-o-can-be-prefixed-to-the-supplement": {
      "assertionId": "classical-integrated-antecessive-supplementation:p1829-result-the-o-can-be-prefixed-to-the-supplement",
      "canonicalPath": "extractedFrames.integratedAntecessive.attachesTo"
    },
    "claim-p1830::p1830-when-a-supplementary-subject-or-object-is-placed-before": {
      "assertionId": "classical-integrated-antecessive-supplementation:p1830-when-a-supplementary-subject-or-object-is-placed-before",
      "canonicalPath": "extractedFrames.integratedAntecessive.logicalScope"
    },
    "claim-p1831::p1831-the-result-is-a-feeling-that-supplement-and-principal": {
      "assertionId": "classical-integrated-antecessive-supplementation:p1831-the-result-is-a-feeling-that-supplement-and-principal",
      "canonicalPath": "integrated.authorizationStatus"
    },
    "claim-p1832::p1832-the-difference-in-the-nahuatl-structure-cannot-be-translated": {
      "assertionId": "classical-integrated-antecessive-supplementation:p1832-the-difference-in-the-nahuatl-structure-cannot-be-translated",
      "canonicalPath": "integrated.principalClause.antecessiveOrder"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlSupplementationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlSupplementationValidationFrame",
  "executionArgsBySelection": {
    "claim-p1829": [],
    "claim-p1830": [],
    "claim-p1831": [],
    "claim-p1832": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1829": "authorized",
    "claim-p1830": "authorized",
    "claim-p1831": "authorized",
    "claim-p1832": "authorized"
  }
};
export default Object.freeze(spec);
