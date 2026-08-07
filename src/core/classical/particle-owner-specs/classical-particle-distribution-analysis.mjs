const spec = {
  "ownerId": "classical-particle-distribution-analysis",
  "prefix": "ClassicalParticleDistributionAnalysis",
  "operationId": "classical.particle.distribution.analyze",
  "inputContract": "complete-typed-classical-particle-distribution-analysis-source",
  "domain": "classical-particle-distribution-analysis",
  "mode": "canonical-rule-analysis",
  "canonicalActorId": "classical-particle-distribution",
  "selections": [
    "classical-particle-independent-utterance-limit",
    "classical-particle-principal-clause-limit",
    "classical-particle-compound-embed-limit",
    "classical-negative-ah-compound-embed-exception",
    "classical-particle-matrix-stem-prohibition",
    "classical-particle-typical-functions",
    "classical-particle-specialized-functions",
    "classical-interjection-independent-utterance-distribution"
  ],
  "coordinates": {
    "classical-particle-independent-utterance-limit::p480-with-certain-exceptions-particles-are-not-used-as-independent": {
      "assertionId": "classical-particle-distribution-analysis:p480-with-certain-exceptions-particles-are-not-used-as-independent",
      "canonicalPath": "rule"
    },
    "classical-particle-principal-clause-limit::p481-also-again-with-certain-exceptions-they-do-not-serve": {
      "assertionId": "classical-particle-distribution-analysis:p481-also-again-with-certain-exceptions-they-do-not-serve",
      "canonicalPath": "rule"
    },
    "classical-particle-compound-embed-limit::p482-they-rarely-some-never-serve-as-the-embed-of": {
      "assertionId": "classical-particle-distribution-analysis:p482-they-rarely-some-never-serve-as-the-embed-of",
      "canonicalPath": "rule"
    },
    "classical-negative-ah-compound-embed-exception::p483-among-those-that-do-serve-as-such-an-embed": {
      "assertionId": "classical-particle-distribution-analysis:p483-among-those-that-do-serve-as-such-an-embed",
      "canonicalPath": "rule"
    },
    "classical-particle-matrix-stem-prohibition::p484-particles-never-serve-as-a-matrix-stem": {
      "assertionId": "classical-particle-distribution-analysis:p484-particles-never-serve-as-a-matrix-stem",
      "canonicalPath": "rule"
    },
    "classical-particle-typical-functions::p485-particles-typically-function-as-adverbial-modifiers-or-as-exclamations": {
      "assertionId": "classical-particle-distribution-analysis:p485-particles-typically-function-as-adverbial-modifiers-or-as-exclamations",
      "canonicalPath": "rule"
    },
    "classical-particle-specialized-functions::p486-in-a-number-of-instances-the-adverbial-function-has": {
      "assertionId": "classical-particle-distribution-analysis:p486-in-a-number-of-instances-the-adverbial-function-has",
      "canonicalPath": "rule"
    },
    "classical-interjection-independent-utterance-distribution::p508-interjections-most-can-occur-alone-as-an-utterance-see": {
      "assertionId": "classical-particle-distribution-analysis:p508-interjections-most-can-occur-alone-as-an-utterance-see",
      "canonicalPath": "rule"
    }
  },
  "ruleGetterName": "getClassicalNahuatlFunctionalClassRules"
};
export default Object.freeze(spec);
