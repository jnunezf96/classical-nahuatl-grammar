const spec = {
  "ownerId": "classical-assimilation-taxonomy",
  "prefix": "ClassicalAssimilationTaxonomy",
  "operationId": "classical.transcription.classical-assimilation-taxonomy.analyze",
  "inputContract": "complete-typed-classical-assimilation-taxonomy-source",
  "domain": "classical-assimilation-taxonomy",
  "mode": "canonical-rule-analysis",
  "selections": [
    "cn-l2-29-grammatical-unlike-consonants",
    "cn-l2-29-progressive-vs-regressive"
  ],
  "facets": [
    "a-grammatical-construction-unlike-consonants-juxtaposed-two",
    "a-grammatical-construction-unlike-consonants-juxtaposed-two-undergoes-a",
    "there-total-assimilation",
    "there-total-assimilation-a-situation-parallel-juxtaposition-identical-consonants",
    "assimilation-progressive-second-sound-imitates-dominant-first-regressive-first"
  ],
  "coordinates": {
    "cn-l2-29-grammatical-unlike-consonants::a-grammatical-construction-unlike-consonants-juxtaposed-two": {
      "assertionId": "classical-assimilation-taxonomy:a-grammatical-construction-unlike-consonants-juxtaposed-two",
      "canonicalPath": ""
    },
    "cn-l2-29-grammatical-unlike-consonants::a-grammatical-construction-unlike-consonants-juxtaposed-two-undergoes-a": {
      "assertionId": "classical-assimilation-taxonomy:a-grammatical-construction-unlike-consonants-juxtaposed-two-undergoes-a",
      "canonicalPath": ""
    },
    "cn-l2-29-grammatical-unlike-consonants::there-total-assimilation": {
      "assertionId": "classical-assimilation-taxonomy:there-total-assimilation",
      "canonicalPath": ""
    },
    "cn-l2-29-grammatical-unlike-consonants::there-total-assimilation-a-situation-parallel-juxtaposition-identical-consonants": {
      "assertionId": "classical-assimilation-taxonomy:there-total-assimilation-a-situation-parallel-juxtaposition-identical-consonants",
      "canonicalPath": ""
    },
    "cn-l2-29-progressive-vs-regressive::assimilation-progressive-second-sound-imitates-dominant-first-regressive-first": {
      "assertionId": "classical-assimilation-taxonomy:assimilation-progressive-second-sound-imitates-dominant-first-regressive-first",
      "canonicalPath": ""
    }
  },
  "ruleGetterName": "getClassicalNahuatlAssimilationRules"
};
export default Object.freeze(spec);
