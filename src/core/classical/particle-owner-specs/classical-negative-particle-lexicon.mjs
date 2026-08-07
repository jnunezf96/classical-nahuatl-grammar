const spec = {
  "ownerId": "classical-negative-particle-lexicon",
  "prefix": "ClassicalNegativeParticleLexicon",
  "operationId": "classical.particle.negative.lexicon.authorize",
  "inputContract": "complete-typed-classical-negative-particle-lexicon-source",
  "domain": "classical-negative-particle-lexicon",
  "mode": "canonical-particle-result",
  "canonicalActorId": "classical-particle-result",
  "selections": [
    "l3-ahzo",
    "l3-ma-cazo",
    "l3-ahtel",
    "l3-aya",
    "l3-ma-caye",
    "ma-caye-caya-variants",
    "ahoc-ayoc-aoc-variants",
    "l3-ma-caoc",
    "l3-ahno",
    "l3-ma-cano"
  ],
  "coordinates": {
    "l3-ahzo::p529-ahzo-perhaps-this-combination-can-occur-alone-as-an": {
      "assertionId": "classical-negative-particle-lexicon:p529-ahzo-perhaps-this-combination-can-occur-alone-as-an",
      "canonicalPath": ""
    },
    "l3-ma-cazo::p530-ma-cazo-if-only-perhaps-since-inasmuch-as": {
      "assertionId": "classical-negative-particle-lexicon:p530-ma-cazo-if-only-perhaps-since-inasmuch-as",
      "canonicalPath": ""
    },
    "l3-ahtel::p531-ahte-l-is-it-not-clear-obvious-it-cannot": {
      "assertionId": "classical-negative-particle-lexicon:p531-ahte-l-is-it-not-clear-obvious-it-cannot",
      "canonicalPath": ""
    },
    "l3-aya::p532-aya-not-yet-for-the-change-of-ahye-to": {
      "assertionId": "classical-negative-particle-lexicon:p532-aya-not-yet-for-the-change-of-ahye-to",
      "canonicalPath": ""
    },
    "l3-ma-caye::p533-ma-caye-if-only-not-yet-also-ma-caya": {
      "assertionId": "classical-negative-particle-lexicon:p533-ma-caye-if-only-not-yet-also-ma-caya",
      "canonicalPath": ""
    },
    "ma-caye-caya-variants::p534-also-ma-caya": {
      "assertionId": "classical-negative-particle-lexicon:p534-also-ma-caya",
      "canonicalPath": ""
    },
    "ahoc-ayoc-aoc-variants::p535-ahoc-ayoc-aoc-no-longer-not-any-more-not": {
      "assertionId": "classical-negative-particle-lexicon:p535-ahoc-ayoc-aoc-no-longer-not-any-more-not",
      "canonicalPath": ""
    },
    "l3-ma-caoc::p536-ma-caoc-if-only-no-longer-in-some-texts": {
      "assertionId": "classical-negative-particle-lexicon:p536-ma-caoc-if-only-no-longer-in-some-texts",
      "canonicalPath": ""
    },
    "l3-ahno::p537-ahno-not-also-neither-not-either-nor": {
      "assertionId": "classical-negative-particle-lexicon:p537-ahno-not-also-neither-not-either-nor",
      "canonicalPath": ""
    },
    "l3-ma-cano::p538-ma-cano-if-only-not-also-if-only-neither": {
      "assertionId": "classical-negative-particle-lexicon:p538-ma-cano-if-only-not-also-if-only-neither",
      "canonicalPath": ""
    }
  },
  "ruleGetterName": "getClassicalNahuatlParticleSourceEntries",
  "sourceBuilderName": "buildClassicalNahuatlParticleSourceFrame",
  "executionFunctionName": "buildClassicalNahuatlParticleResultFrame",
  "executionValidatorName": "isClassicalNahuatlParticleResultFrame",
  "selectionRecords": {
    "ma-caye-caya-variants": [
      "l3-ma-caye",
      "l3-ma-caya"
    ],
    "ahoc-ayoc-aoc-variants": [
      "l3-ahoc",
      "l3-ayoc",
      "l3-aoc"
    ]
  }
};
export default Object.freeze(spec);
