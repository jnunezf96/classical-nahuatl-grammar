const freeze = Object.freeze;

export const classicalGraphologicalRepresentationFacts = freeze({
  letters: freeze(["a", "c", "e", "h", "i", "l", "m", "n", "o", "p", "q", "t", "u", "x", "y", "z"]),
  digraphs: freeze(["ch", "cu", "uc", "hu", "uh", "qu", "tz", "tl"]),
  letterURepresentsVowel: false,
  letterUOccursOnlyInConsonantalDigraph: true,
  letterURoles: freeze({
    cuUc: "labial-release-of-k-labiovelar",
    huUh: "w-carrier",
    qu: "empty-spanish-spelling-carrier",
  }),
  ordinarySpellingRelation: "phoneme-to-grapheme",
  conditionedIrregularPhoneSources: freeze([
    "phonological-environment",
    "morphological-operation",
  ]),
});

const spec = {
  ownerId: "classical-graphological-representation",
  prefix: "ClassicalGraphologicalRepresentation",
  operationId: "classical.orthography.graphological-representation.analyze",
  inputContract: "complete-typed-classical-graphological-representation-source",
  domain: "classical-graphological-representation",
  analyses: {
    "letter-inventory": {
      classification: "classical-graphological-letter-inventory",
      facts: ["sixteen-letter-symbols-represent-classical-nahuatl-sounds-in-this-transcription"],
      relation: "letter-inventory-supplies-members-to-single-letter-and-digraph-representations",
      checkpoint: "graphological-letter-inventory-checkpoint",
      allowedParticipantChoices: ["classical-letter-inventory"],
      payload: { letters: classicalGraphologicalRepresentationFacts.letters },
    },
    "digraph-inventory": {
      classification: "classical-graphological-digraph-inventory",
      facts: ["specified-two-letter-sequences-each-represent-one-sound"],
      relation: "cu-uc-and-hu-uh-are-positionally-ordered-digraph-variants",
      checkpoint: "graphological-digraph-inventory-checkpoint",
      allowedParticipantChoices: ["classical-digraph-inventory"],
      payload: { digraphs: classicalGraphologicalRepresentationFacts.digraphs },
    },
    "u-not-vowel": {
      classification: "classical-letter-u-nonvocalic-role",
      facts: ["letter-u-does-not-represent-a-vowel"],
      relation: "u-is-a-consonantal-digraph-component-not-an-independent-vowel-letter",
      checkpoint: "letter-u-nonvocalic-checkpoint",
      allowedParticipantChoices: ["u-is-not-a-vowel-representation"],
      payload: { letterURepresentsVowel: classicalGraphologicalRepresentationFacts.letterURepresentsVowel },
    },
    "u-consonantal-digraph-only": {
      classification: "classical-letter-u-distribution",
      facts: ["letter-u-occurs-only-in-a-consonantal-digraph"],
      relation: "u-distribution-is-licensed-only-by-cu-uc-hu-uh-and-qu",
      checkpoint: "letter-u-digraph-distribution-checkpoint",
      allowedParticipantChoices: ["u-only-in-consonantal-digraphs"],
      payload: {
        letterUOccursOnlyInConsonantalDigraph:
          classicalGraphologicalRepresentationFacts.letterUOccursOnlyInConsonantalDigraph,
      },
    },
    "u-digraph-roles": {
      classification: "classical-letter-u-digraph-role-analysis",
      facts: [
        "u-marks-the-labial-release-in-cu-and-uc",
        "u-carries-w-in-hu-and-uh-while-h-is-empty",
        "u-is-empty-in-qu-before-e-and-i",
      ],
      relation: "the-role-of-u-is-selected-by-the-containing-digraph-not-by-u-alone",
      checkpoint: "letter-u-digraph-role-checkpoint",
      allowedParticipantChoices: ["three-digraph-conditioned-u-roles"],
      payload: { letterURoles: classicalGraphologicalRepresentationFacts.letterURoles },
    },
    "ordinary-and-irregular-phone-relation": {
      classification: "classical-spelling-to-phonological-carrier-relation",
      facts: [
        "ordinary-spelling-represents-phonemes",
        "phonological-environment-may-cause-spelling-to-reflect-an-irregular-phone",
        "morphological-pressure-may-cause-spelling-to-reflect-an-irregular-phone",
      ],
      relation: "irregular-phone-reflection-is-conditioned-and-does-not-replace-phoneme-identity",
      checkpoint: "ordinary-and-irregular-phone-relation-checkpoint",
      allowedParticipantChoices: ["phoneme-default-with-conditioned-irregular-phone"],
      payload: {
        ordinarySpellingRelation: classicalGraphologicalRepresentationFacts.ordinarySpellingRelation,
        conditionedIrregularPhoneSources:
          classicalGraphologicalRepresentationFacts.conditionedIrregularPhoneSources,
      },
    },
  },
};

export default freeze(spec);
