const spec = {
  "ownerId": "classical-affective-tzin-ton-class",
  "prefix": "ClassicalAffectiveTzinTonClass",
  "operationId": "classical.affective.tzin.ton.class.execute",
  "inputContract": "complete-typed-classical-affective-tzin-ton-class-source",
  "domain": "classical-affective-tzin-ton-class",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-affective-nnc-runtime",
  "selections": [
    "claim-p3137",
    "claim-p3138",
    "claim-p3139",
    "claim-p3140",
    "claim-p3141"
  ],
  "coordinates": {
    "claim-p3137::p3137-two-affective-matrix-nounstems-allow-the-embedded-nounstem-to": {
      "assertionId": "classical-affective-tzin-ton-class:p3137-two-affective-matrix-nounstems-allow-the-embedded-nounstem-to",
      "canonicalPath": "cases.tzinTonClass.rules.affective/tzin-ton-class"
    },
    "claim-p3138::p3138-if-the-embedded-stem-belongs-to-the-class-the": {
      "assertionId": "classical-affective-tzin-ton-class:p3138-if-the-embedded-stem-belongs-to-the-class-the",
      "canonicalPath": "cases.tzinTonClass.authorizationStatus"
    },
    "claim-p3139::p3139-if-the-embedded-stem-belongs-to-one-of-the": {
      "assertionId": "classical-affective-tzin-ton-class:p3139-if-the-embedded-stem-belongs-to-one-of-the",
      "canonicalPath": "cases.tzinTonClass.gcdSatisfied"
    },
    "claim-p3140::p3140-the-nounstem-tzin-tli-basically-conveys-the-notion-of": {
      "assertionId": "classical-affective-tzin-ton-class:p3140-the-nounstem-tzin-tli-basically-conveys-the-notion-of",
      "canonicalPath": "cases.tzinTonClass.lcmComplete"
    },
    "claim-p3141::p3141-when-these-demonstrative-nncs-are-marked-by-the-adjunctor": {
      "assertionId": "classical-affective-tzin-ton-class:p3141-when-these-demonstrative-nncs-are-marked-by-the-adjunctor",
      "canonicalPath": "cases.tzinTonClass.rules.affective/tzin-ton-class"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAffectiveNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAffectiveNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3137": [],
    "claim-p3138": [],
    "claim-p3139": [],
    "claim-p3140": [],
    "claim-p3141": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3137": "authorized",
    "claim-p3138": "authorized",
    "claim-p3139": "authorized",
    "claim-p3140": "authorized",
    "claim-p3141": "authorized"
  }
};
export default Object.freeze(spec);
