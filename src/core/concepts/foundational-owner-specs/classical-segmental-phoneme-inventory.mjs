const freeze = Object.freeze;

export const classicalSegmentalPhonemeInventoryFacts = freeze({
  segmentalPhonemeCount: 23,
  vowelPhonemeCount: 8,
  consonantPhonemeCount: 15,
  vowelPhonemes: freeze(["/a/", "/a:/", "/e/", "/e:/", "/i/", "/i:/", "/o/", "/o:/"]),
  fullLengthNotation: ":",
  vowelLengthPairs: freeze([
    freeze(["/a/", "/a:/"]),
    freeze(["/e/", "/e:/"]),
    freeze(["/i/", "/i:/"]),
    freeze(["/o/", "/o:/"]),
  ]),
  unpronouncedSigemeCount: 1,
  unpronouncedSigemeIsSegmentalPhoneme: false,
});

const spec = {
  ownerId: "classical-segmental-phoneme-inventory",
  prefix: "ClassicalSegmentalPhonemeInventory",
  operationId: "classical.carrier.segmental-phoneme-inventory.analyze",
  inputContract: "complete-typed-classical-segmental-phoneme-inventory-source",
  domain: "classical-segmental-phoneme-inventory",
  analyses: {
    "segmental-count": {
      classification: "classical-segmental-phoneme-count",
      facts: ["classical-nahuatl-has-twenty-three-segmental-phonemes"],
      relation: "segmental-inventory-partitions-into-vowel-and-consonant-phonemes",
      checkpoint: "segmental-phoneme-count-checkpoint",
      allowedParticipantChoices: ["twenty-three-segmental-phonemes"],
      payload: { segmentalPhonemeCount: classicalSegmentalPhonemeInventoryFacts.segmentalPhonemeCount },
    },
    "vowel-membership-and-length": {
      classification: "classical-vowel-phoneme-membership",
      facts: [
        "classical-nahuatl-has-eight-vowel-phonemes",
        "colon-marks-full-vowel-length-in-andrews-phoneme-notation",
      ],
      relation: "four-vowel-qualities-each-have-short-and-long-phoneme-members",
      checkpoint: "vowel-phoneme-membership-checkpoint",
      allowedParticipantChoices: ["eight-vowel-phonemes"],
      payload: {
        vowelPhonemeCount: classicalSegmentalPhonemeInventoryFacts.vowelPhonemeCount,
        vowelPhonemes: classicalSegmentalPhonemeInventoryFacts.vowelPhonemes,
        fullLengthNotation: classicalSegmentalPhonemeInventoryFacts.fullLengthNotation,
      },
    },
    "consonant-count-and-silent-sigeme": {
      classification: "classical-consonant-and-silent-sigeme-inventory",
      facts: [
        "classical-nahuatl-has-fifteen-consonant-phonemes",
        "one-additional-carrier-sigeme-is-unpronounced",
        "the-unpronounced-sigeme-is-not-a-segmental-phoneme",
      ],
      relation: "silent-sigeme-membership-does-not-increase-the-segmental-phoneme-count",
      checkpoint: "consonant-and-silent-sigeme-count-checkpoint",
      allowedParticipantChoices: ["fifteen-consonants-plus-one-silent-sigeme"],
      payload: {
        consonantPhonemeCount: classicalSegmentalPhonemeInventoryFacts.consonantPhonemeCount,
        unpronouncedSigemeCount: classicalSegmentalPhonemeInventoryFacts.unpronouncedSigemeCount,
        unpronouncedSigemeIsSegmentalPhoneme:
          classicalSegmentalPhonemeInventoryFacts.unpronouncedSigemeIsSegmentalPhoneme,
      },
    },
    "vowel-length-pairs": {
      classification: "classical-vowel-length-pair-inventory",
      facts: [
        "eight-vowel-phonemes-form-four-short-long-pairs",
        "phonological-length-distinguishes-each-pair",
      ],
      relation: "each-short-vowel-phoneme-is-paired-with-a-long-vowel-phoneme",
      checkpoint: "vowel-length-pair-checkpoint",
      allowedParticipantChoices: ["four-short-long-vowel-pairs"],
      payload: {
        lengthPairCount: classicalSegmentalPhonemeInventoryFacts.vowelLengthPairs.length,
        vowelLengthPairs: classicalSegmentalPhonemeInventoryFacts.vowelLengthPairs,
      },
    },
  },
};

export default freeze(spec);
