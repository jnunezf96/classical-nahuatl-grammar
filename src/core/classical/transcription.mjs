// Canonical modern ESM module.

import {
  classicalSegmentalPhonemeInventoryFacts,
} from "../concepts/foundational-owner-specs/classical-segmental-phoneme-inventory.mjs";
import {
  classicalGraphologicalRepresentationFacts,
} from "../concepts/foundational-owner-specs/classical-graphological-representation.mjs";
import {
  CLASSICAL_IRREGULAR_PHONE_OPTIONALITY,
  CLASSICAL_PHONE_TO_PHONEME_DISAMBIGUATION,
} from "../concepts/phone_repertory_facts.mjs";

export function createClassicalNahuatlTranscriptionApi(targetObject = globalThis) {
    const CLASSICAL_NAHUATL_LESSON2_FRAME_VERSION = 1;
    const CLASSICAL_NAHUATL_TRANSCRIPTION_FRAME_VERSION = 1;
    const CLASSICAL_NAHUATL_TRANSCRIPTION_SOURCE_VERSION = 1;
    const issuedClassicalNahuatlTranscriptionSources = new WeakMap();
    const issuedClassicalNahuatlTranscriptionFrames = new WeakMap();
    const issuedClassicalNahuatlTranscriptionCarrierFrames = new WeakMap();
    const issuedClassicalNahuatlTranscriptionAnalysisSources = new WeakMap();
    const issuedClassicalNahuatlTranscriptionAnalysisFrames = new WeakMap();
    const CLASSICAL_NAHUATL_PROFILE_ID = "classical-nahuatl";
    const CLASSICAL_NAHUATL_TRANSCRIPTION_SOURCE_DOCUMENT = "ANDREWS_TRANSCRIPTION_CANVAS.md";
    const CLASSICAL_NAHUATL_LESSON2_LETTERS = Object.freeze("acehilmnopqtuxyzāēīō".split(""));
    const CLASSICAL_NAHUATL_LESSON2_DIGRAPHS = Object.freeze(["ch", "cu", "hu", "qu", "tz", "tl", "uc", "uh"]);
    const CLASSICAL_NAHUATL_LESSON2_MORPHIC_CARRIERS = Object.freeze(["\u2395"]);
    const CLASSICAL_NAHUATL_LESSON2_BOUNDARY_CHARS = Object.freeze(["-", "(", ")", "#", "/", ".", "'", "?", "!", "¡", ",", ";", ":", " "]);
    const CLASSICAL_NAHUATL_LESSON2_SIMPLE_VOWELS = Object.freeze(["a", "e", "i", "o"]);
    const CLASSICAL_NAHUATL_TRANSCRIPTION_VOWELS = Object.freeze([
      "a", "ā", "e", "ē", "i", "ī", "o", "ō"
    ]);
    const CLASSICAL_NAHUATL_TRANSCRIPTION_CONSONANT_SPELLINGS = Object.freeze({
      "/l/": "l",
      "/n/": "n",
      "/m/": "m",
      "/š/": "x",
      "/y/": "y",
      "/p/": "p",
      "/t/": "t",
      "/ʔ/": "h",
      "/λ/": "tl",
      "/¢/": "tz",
      "/č/": "ch"
    });
    const CLASSICAL_NAHUATL_TRANSCRIPTION_CONTEXTUAL_PHONEMES =
      Object.freeze(["/k/", "/s/", "/w/", "/kʷ/"]);
    const CLASSICAL_NAHUATL_TRANSCRIPTION_PHONEMES = Object.freeze([
      ...Object.keys(CLASSICAL_NAHUATL_TRANSCRIPTION_CONSONANT_SPELLINGS),
      ...CLASSICAL_NAHUATL_TRANSCRIPTION_CONTEXTUAL_PHONEMES
    ]);
    const CLASSICAL_NAHUATL_EXTERNAL_AUTHORITY_KEYS = Object.freeze(new Set([
      "answer",
      "analysiskind",
      "audit",
      "canvasexample",
      "display",
      "displaytext",
      "example",
      "formula",
      "formularecord",
      "formulastring",
      "lesson",
      "lessonmetadata",
      "lessonnumber",
      "metadata",
      "operationid",
      "proofstatus",
      "restored",
      "restoredstate",
      "result",
      "ruleid",
      "selectedruleid",
      "stored",
      "storedanswer",
      "sourcedocument",
      "sourceevidence",
      "surface",
      "surfaceforms",
      "surfacestring",
      "translation",
      "urlstate",
      "witness"
    ]));
    const CLASSICAL_NAHUATL_TRANSCRIPTION_SYSTEM_FACTS =
      Object.freeze({
        segmentalPhonemeCount:
          classicalSegmentalPhonemeInventoryFacts.segmentalPhonemeCount,
        vowelPhonemeCount:
          classicalSegmentalPhonemeInventoryFacts.vowelPhonemeCount,
        consonantPhonemeCount:
          classicalSegmentalPhonemeInventoryFacts.consonantPhonemeCount,
        unpronouncedSigemeCount:
          classicalSegmentalPhonemeInventoryFacts.unpronouncedSigemeCount,
        unpronouncedSigemeIsSegmentalPhoneme:
          classicalSegmentalPhonemeInventoryFacts
            .unpronouncedSigemeIsSegmentalPhoneme,
        letters: classicalGraphologicalRepresentationFacts.letters,
        digraphs: classicalGraphologicalRepresentationFacts.digraphs,
        letterURepresentsVowel:
          classicalGraphologicalRepresentationFacts.letterURepresentsVowel,
        letterUOccursOnlyInConsonantalDigraph:
          classicalGraphologicalRepresentationFacts
            .letterUOccursOnlyInConsonantalDigraph,
        letterURoles: classicalGraphologicalRepresentationFacts.letterURoles,
        ordinarySpellingRelation:
          classicalGraphologicalRepresentationFacts.ordinarySpellingRelation,
        conditionedIrregularPhoneSources:
          classicalGraphologicalRepresentationFacts
            .conditionedIrregularPhoneSources,
        irregularPhoneOptionality: CLASSICAL_IRREGULAR_PHONE_OPTIONALITY,
        phoneToPhonemeDisambiguation:
          CLASSICAL_PHONE_TO_PHONEME_DISAMBIGUATION,
      });
    const CLASSICAL_NAHUATL_TRANSCRIPTION_VOWEL_SYSTEM_FACTS =
      Object.freeze({
        lengthPairCount: 4,
        shortSegments: Object.freeze(["a", "e", "i", "o"]),
        longSegments: Object.freeze(["ā", "ē", "ī", "ō"]),
        vowelQuality: "pure-without-off-glide",
        unstressedQualityChanges: false,
        longProduction: "prolonged-short-counterpart",
        commonPhoneClasses: Object.freeze([
          "full",
          "reduced",
        ]),
        mostVowelPhonemesHaveAdditionalPhones: true,
        reducedLongDuration: "between-full-long-and-full-short",
        reducedShortRealization: "very-short-post-onset-devoicing",
        fullPhonePositions: Object.freeze([
          "vocable-initial",
          "vocable-medial",
        ]),
        finalPositionDistribution: Object.freeze({
          fullLong: "occasional",
          reducedShort: "obligatory",
          reducedLong: "conditioned",
        }),
        pitch: Object.freeze({
          fullLongUtteranceFinal: "low",
          fullLongElsewhere: "high",
          fullShort: "middle-even",
        }),
        fullLongVocableFinalLicense:
          "ephemeral-source-final-vowel-deleted-by-morphology",
        fullLongVocableFinalExceptions: Object.freeze([
          "adverbialized-nominal-nuclear-clause-final-ca",
          "licensed-monosyllabic-vocable",
        ]),
        licensedMonosyllabicFullLongFinalVocables:
          Object.freeze(["cē", "tlā", "mā", "zā", "nō"]),
        glottalFollowingLongVowelEffect: "shorten",
        reducedLongNotation: "upper-dot",
        reducedShortNotation: "breve",
        vowelLetters: Object.freeze(["a", "e", "i", "o"]),
        longVowelNotation: "macron",
        reducedLongWrittenAsShort: true,
        prefixAllowsRaisedOToUVariantByDefault: false,
        supportiveVowelPhone: "i",
        supportiveInitialStatus: "context-dependent-real-or-supportive",
      });
    const CLASSICAL_NAHUATL_TRANSCRIPTION_VOWEL_CARRIERS =
      Object.freeze({
        a: Object.freeze({
          segment: "a",
          quantity: "short",
          lengthPair: "ā",
          phones: Object.freeze(["a", "ã", "e", "ẽ"]),
          grapheme: "a",
          articulation: "pure-open-central-unrounded-vowel",
          raisedVariants: Object.freeze(["e", "ẽ"]),
          raisedVariantLicense: "lexically-conditioned-optional",
        }),
        ā: Object.freeze({
          segment: "ā",
          quantity: "long",
          lengthPair: "a",
          phones: Object.freeze(["a:", "a·", "a", "e:", "e·", "e"]),
          grapheme: "ā",
          articulation: "prolonged-pure-open-central-unrounded-vowel",
          raisedVariants: Object.freeze(["e:", "e·", "e"]),
          raisedVariantLicense: "lexically-conditioned-optional",
          shortVariantLicense: "before-glottal-stop-only",
        }),
        e: Object.freeze({
          segment: "e",
          quantity: "short",
          lengthPair: "ē",
          phones: Object.freeze(["e", "ẽ", "i", "a"]),
          grapheme: "e",
          articulation: "pure-mid-front-unrounded-vowel",
          raisedVariant: "i",
          raisedVariantLicense: "lexically-conditioned-optional",
          loweredVariant: "a",
          loweredVariantLicense: "rare-lexical",
        }),
        ē: Object.freeze({
          segment: "ē",
          quantity: "long",
          lengthPair: "e",
          phones: Object.freeze(["e:", "e·", "e", "i:"]),
          grapheme: "ē",
          articulation: "prolonged-pure-mid-front-unrounded-vowel",
          raisedVariant: "i:",
          raisedVariantLicense: "lexically-conditioned-optional",
        }),
        i: Object.freeze({
          segment: "i",
          quantity: "short",
          lengthPair: "ī",
          phones: Object.freeze(["i", "ĩ"]),
          grapheme: "i",
          articulation: "pure-high-front-unrounded-vowel",
        }),
        ī: Object.freeze({
          segment: "ī",
          quantity: "long",
          lengthPair: "i",
          phones: Object.freeze(["i:", "i·", "i"]),
          grapheme: "ī",
          articulation: "prolonged-pure-high-front-unrounded-vowel",
        }),
        o: Object.freeze({
          segment: "o",
          quantity: "short",
          lengthPair: "ō",
          phones: Object.freeze(["o", "õ", "u"]),
          grapheme: "o",
          articulation: "pure-mid-back-rounded-vowel",
          raisedVariant: "u",
          raisedVariantArticulation: "lax-high-back-rounded-vowel",
          raisedVariantEnvironments: Object.freeze([
            "before-consonant-cluster",
            "before-vocable-final-lateral-affricate",
            "before-possessive-number-final-voiceless-w",
            "before-continuant",
            "licensed-lexical-environment",
          ]),
        }),
        ō: Object.freeze({
          segment: "ō",
          quantity: "long",
          lengthPair: "o",
          phones: Object.freeze(["o:", "o·", "o", "u:", "u"]),
          grapheme: "ō",
          articulation: "prolonged-pure-mid-back-rounded-vowel",
          raisedVariants: Object.freeze(["u:", "u"]),
          raisedVariantArticulation: "lax-high-back-rounded-vowel",
          raisedVariantEnvironments: Object.freeze([
            "before-consonant-cluster",
            "before-vocable-final-lateral-affricate",
            "before-possessive-number-final-voiceless-w",
            "before-continuant",
            "licensed-lexical-environment",
          ]),
        }),
      });
    const CLASSICAL_NAHUATL_TRANSCRIPTION_CONSONANT_SYSTEM_FACTS =
      Object.freeze({
        classes: Object.freeze([
          "sonorant",
          "fricative",
          "stop",
          "affricate",
        ]),
        devoicedPhoneNotation: "subscript-circle",
      });
    const CLASSICAL_NAHUATL_TRANSCRIPTION_CONSONANT_CARRIERS =
      Object.freeze({
        "/l/": Object.freeze({
          segment: "/l/",
          class: "sonorant",
          phones: Object.freeze(["l", "l̥"]),
          grapheme: "l",
          vocableInitialAllowed: false,
          regularArticulation: "clear-l",
          englishDarkLExcluded: true,
          irregularRealizations: Object.freeze({
            "syllable-final": "l̥",
          }),
        }),
        "/n/": Object.freeze({
          segment: "/n/",
          class: "sonorant",
          phones: Object.freeze(["n", "ŋ", "n̥", "m"]),
          grapheme: "n",
          articulation: "alveolar-nasal-like-english-nine",
          irregularRealizations: Object.freeze({
            "before-k-or-k-labiovelar": "ŋ",
            "utterance-final": "n̥",
            "vocable-final-optional": "n̥",
            "before-w-or-y": "n̥",
            "assimilation-to-m": "m",
          }),
          spellingByPhone: Object.freeze({
            m: "m",
            default: "n",
          }),
          precedingVowelMayBecomeSlightlyNasalizedBeforeVoicelessN: true,
        }),
        "/m/": Object.freeze({
          segment: "/m/",
          class: "sonorant",
          phones: Object.freeze(["m", "n", "ŋ", "n̥"]),
          regularPhone: "m",
          articulation: "bilabial-nasal-like-english-m",
          regularPhoneVocableFinalAllowed: false,
          regularPhoneEnvironments: Object.freeze([
            "before-vowel",
            "before-p",
            "before-m",
          ]),
          spellingByPhone: Object.freeze({
            m: "m",
            default: "n",
          }),
        }),
        "/s/": Object.freeze({
          segment: "/s/",
          class: "fricative",
          phones: Object.freeze(["s", "š"]),
          articulation: "laminal",
          englishComparison: "english-s-like-but-laminal-not-apical",
          spellings: Object.freeze({
            "before-a-or-o": "z",
            "syllable-final": "z",
            "before-e-or-i": "c",
          }),
          irregularPhoneOwners: Object.freeze([
            "derived-nounstem-operation",
          ]),
        }),
        "/š/": Object.freeze({
          segment: "/š/",
          class: "fricative",
          phones: Object.freeze(["š"]),
          articulation: "laminal",
          englishComparison: "english-sh-like-but-laminal-not-apical",
          grapheme: "x",
        }),
        "/y/": Object.freeze({
          segment: "/y/",
          class: "fricative",
          phones: Object.freeze(["y", "š", "s", "l"]),
          grapheme: "y",
          articulation: "palatal-approximant-like-english-yes",
          regularPhoneVocableFinalAllowed: false,
          vocableFinalPhones: Object.freeze(["š", "s"]),
          yFrequentlyUnwrittenSequences: Object.freeze(["iya", "ayi"]),
        }),
        "/w/": Object.freeze({
          segment: "/w/",
          class: "fricative",
          phones: Object.freeze(["w", "w̥", "β", "ɸ", "m", "p"]),
          articulation: "labial-approximant-or-bilabial-fricative-speaker-variant",
          speakerVariants: Object.freeze({
            male: Object.freeze(["w", "w̥"]),
            female: Object.freeze(["β", "ɸ"]),
          }),
          lipShape: Object.freeze({
            w: "rounded",
            "w̥": "rounded",
            β: "spread",
            ɸ: "spread",
          }),
          syllableInitialPhones: Object.freeze(["w", "β"]),
          syllableFinalPhones: Object.freeze(["w̥", "ɸ"]),
          spellings: Object.freeze({
            "syllable-initial": "hu",
            "syllable-final": "uh",
          }),
          frequentlyUnwrittenSequence: "owā",
          owaOaLexicalAmbiguity: true,
        }),
        "/p/": Object.freeze({
          segment: "/p/",
          class: "stop",
          phones: Object.freeze(["p"]),
          grapheme: "p",
          aspiration: "unaspirated",
          englishComparison: "english-spot-p-not-english-pot-p",
        }),
        "/t/": Object.freeze({
          segment: "/t/",
          class: "stop",
          phones: Object.freeze(["t", "č", "h"]),
          grapheme: "t",
          aspiration: "unaspirated",
          articulation: "dental",
          englishComparison: "english-style-t-like-but-dental-not-english-tile-t",
          irregularPhoneOwners: Object.freeze([
            "morphological-operation",
            "preterit-realization",
          ]),
        }),
        "/k/": Object.freeze({
          segment: "/k/",
          class: "stop",
          phones: Object.freeze(["k", "h"]),
          aspiration: "unaspirated",
          englishComparison: "english-skid-or-school-k-not-kid-or-cool-k",
          spellings: Object.freeze({
            "before-a-or-o": "c",
            "syllable-final": "c",
            "before-e-or-i": "qu",
          }),
          irregularPhoneOwners: Object.freeze([
            "regressive-assimilation",
          ]),
        }),
        "/kʷ/": Object.freeze({
          segment: "/kʷ/",
          class: "stop",
          phones: Object.freeze(["kʷ", "kʷ̥", "k", "h"]),
          aspiration: "unaspirated",
          englishComparison: "english-squid-or-squash-labiovelar-not-quid-or-quash",
          composition: Object.freeze(["k-onset", "w-release"]),
          syllableInitialPhone: "kʷ",
          syllableFinalPhone: "kʷ̥",
          optionalSyllableFinalDelabializedPhone: "k",
          spellings: Object.freeze({
            "syllable-initial": "cu",
            "syllable-final": "uc",
            "syllable-final-delabialized": "c",
          }),
        }),
        "/ʔ/": Object.freeze({
          segment: "/ʔ/",
          class: "stop",
          phones: Object.freeze(["ʔ", "h", "y"]),
          grapheme: "h",
          articulation: "complete-glottal-closure-followed-by-sudden-release",
          followsShortVowelOnly: true,
          phonemicVocableInitialAllowed: false,
          regularPhoneEnvironment: "utterance-final-only",
          frequentInternalPhone: "h",
          dialectalGlottalFricativeAlternative: true,
          precedingLongVowelEffect: "shorten",
        }),
        "/λ/": Object.freeze({
          segment: "/λ/",
          class: "affricate",
          phones: Object.freeze(["λ", "λ̥", "t", "č", "l"]),
          grapheme: "tl",
          composition: Object.freeze(["t-onset", "lateral-l-release"]),
          articulation: "dental-t-onset-with-lateral-clear-l-release",
          englishClusterEquivalent: false,
          regularPhoneEnvironment: "syllable-initial",
          voicelessReleasePhoneEnvironment: "syllable-final",
          delateralizedPhoneOwner: "morphological-operation",
        }),
        "/¢/": Object.freeze({
          segment: "/¢/",
          class: "affricate",
          phones: Object.freeze(["¢", "č"]),
          grapheme: "tz",
          composition: Object.freeze(["laminal-t-onset", "s-release"]),
          onePhoneme: true,
          articulation: "laminal-t-onset-with-s-release",
          englishTsSequenceEquivalent: false,
          irregularPhoneOwners: Object.freeze([
            "regressive-assimilation",
            "lexical-or-morphological-factor",
          ]),
        }),
        "/č/": Object.freeze({
          segment: "/č/",
          class: "affricate",
          phones: Object.freeze(["č", "¢", "p"]),
          grapheme: "ch",
          composition: Object.freeze(["laminal-t-onset", "sh-release"]),
          articulation: "laminal-t-onset-at-sh-release-place",
          englishComparison: "english-ch-like-with-laminal-nahuatl-onset",
          irregularPhoneOwners: Object.freeze([
            "regressive-assimilation",
            "lexical-or-morphological-factor",
          ]),
          chuRepresentsPhonemeSequence: Object.freeze(["/k/", "/w/"]),
          chuIsSingleLabiovelarPhoneme: false,
        }),
      });
    const CLASSICAL_NAHUATL_TRANSCRIPTION_SIGEME_CARRIERS =
      Object.freeze({
        "\u2395": Object.freeze({
          segment: "\u2395",
          class: "sigeme",
          phoneme: false,
          pronounced: false,
          surface: "",
          carrierRole: "meaning-bearing-silence",
        }),
      });
    const CLASSICAL_NAHUATL_LESSON2_SPELLING_CHANGE_RULES = Object.freeze([{
      id: "cn-l2-24-k-initial-before-a-o",
      operationId: "cn-l2-spelling-changes-k-s-environment",
      phoneme: "/k/",
      syllablePosition: "initial",
      followingVowels: ["a", "o"],
      spelling: "c",
      examples: ["ca", "co"]
    }, {
      id: "cn-l2-24-k-initial-before-e-i",
      operationId: "cn-l2-spelling-changes-k-s-environment",
      phoneme: "/k/",
      syllablePosition: "initial",
      followingVowels: ["e", "i"],
      spelling: "qu",
      examples: ["que", "qui"]
    }, {
      id: "cn-l2-24-k-final",
      operationId: "cn-l2-spelling-changes-k-s-environment",
      phoneme: "/k/",
      syllablePosition: "final",
      precedingVowels: ["a", "o", "e", "i"],
      spelling: "c",
      examples: ["ac", "oc", "ec", "ic"]
    }, {
      id: "cn-l2-24-s-initial-before-a-o",
      operationId: "cn-l2-spelling-changes-k-s-environment",
      phoneme: "/s/",
      syllablePosition: "initial",
      followingVowels: ["a", "o"],
      spelling: "z",
      examples: ["za", "zo"]
    }, {
      id: "cn-l2-24-s-initial-before-e-i",
      operationId: "cn-l2-spelling-changes-k-s-environment",
      phoneme: "/s/",
      syllablePosition: "initial",
      followingVowels: ["e", "i"],
      spelling: "c",
      examples: ["ce", "ci"]
    }, {
      id: "cn-l2-24-s-final",
      operationId: "cn-l2-spelling-changes-k-s-environment",
      phoneme: "/s/",
      syllablePosition: "final",
      precedingVowels: ["a", "o", "e", "i"],
      spelling: "z",
      examples: ["az", "oz", "ez", "iz"]
    }, {
      id: "cn-l2-24-w-nonfinal",
      operationId: "cn-l2-spelling-changes-w-kw-syllable-final",
      phoneme: "[w]",
      syllablePosition: "nonfinal",
      followingVowels: ["a", "e", "i"],
      spelling: "hu",
      pronunciationPhone: "[w]",
      pronunciationChanged: true,
      examples: ["hua", "hue", "hui"]
    }, {
      id: "cn-l2-24-w-final",
      operationId: "cn-l2-spelling-changes-w-kw-syllable-final",
      phoneme: "[w]",
      syllablePosition: "final",
      precedingVowels: ["a", "e", "i", "o"],
      spelling: "uh",
      pronunciationPhone: "[w̥]",
      pronunciationChanged: true,
      examples: ["auh", "euh", "iuh", "ouh"]
    }, {
      id: "cn-l2-24-kw-nonfinal",
      operationId: "cn-l2-spelling-changes-w-kw-syllable-final",
      phoneme: "[kʷ]",
      syllablePosition: "nonfinal",
      followingVowels: ["a", "e", "i"],
      spelling: "cu",
      pronunciationPhone: "[kʷ]",
      pronunciationChanged: true,
      examples: ["cua", "cue", "cui"]
    }, {
      id: "cn-l2-24-kw-final",
      operationId: "cn-l2-spelling-changes-w-kw-syllable-final",
      phoneme: "[kʷ]",
      syllablePosition: "final",
      precedingVowels: ["a", "e", "i", "o"],
      spelling: "uc",
      pronunciationPhone: "[kʷ̥]",
      pronunciationChanged: true,
      examples: ["auc", "euc", "iuc", "ouc"]
    }].map(rule => Object.freeze({
      ...rule,
      lesson: "Andrews Lesson 2",
      section: "2.4",
      sourceAuthority: "Andrews transcription",
      sourceDocument: CLASSICAL_NAHUATL_TRANSCRIPTION_SOURCE_DOCUMENT,
      transcriptionLineStart: rule.operationId === "cn-l2-spelling-changes-w-kw-syllable-final" ? 1697 : 1686,
      transcriptionLineEnd: rule.operationId === "cn-l2-spelling-changes-w-kw-syllable-final" ? 1700 : 1696,
      exactWitness: rule.operationId === "cn-l2-spelling-changes-w-kw-syllable-final" ? "This depends on whether the sounds are syllable-final or not.\n[w]: hua hue hui; [w̥]: auh euh iuh ouh\n[kʷ]: cua cue cui; [kʷ̥]: auc euc iuc ouc" : "/k/: ca co que qui; ac oc ec ic\n/s/: za zo ce ci; az oz ez iz",
      pronunciationChanged: rule.pronunciationChanged === true
    })));
    const CLASSICAL_NAHUATL_LESSON2_OPEN_TRANSITION_RULES = Object.freeze([{
      id: "cn-l2-25-compound-boundary-open-transition",
      operationId: "cn-l2-open-transition",
      boundaryType: "compound-stem-boundary",
      outcome: "open-transition",
      examples: ["stem + stem"],
      transcriptionLineStart: 1701,
      transcriptionLineEnd: 1703,
      exactWitness: "When two stems are joined by compounding\n(see primarily Lessons 30 and 31), their boundaries, as a rule, are preserved by open\ntransition"
    }, {
      id: "cn-l2-25-supportive-i-kept",
      operationId: "cn-l2-open-transition",
      boundaryType: "compound-stem-boundary",
      stemInitialSupportiveI: true,
      outputSpelling: "i",
      examples: ["tekoma + ikšiλ"],
      transcriptionLineStart: 1703,
      transcriptionLineEnd: 1705,
      exactWitness: "an initial supportive [i] (see § 2.6, note) is frequently kept"
    }, {
      id: "cn-l2-25-stem-final-w-vocable-final",
      operationId: "cn-l2-open-transition",
      boundaryType: "compound-stem-boundary",
      phoneme: "[w]",
      followingVowels: ["a", "e", "i", "o"],
      outputSpelling: "uh",
      outputExample: "cuauhēhuatl",
      blockedExample: "cuahuēhuatl",
      spelledAsVocableFinal: true,
      pronunciationPhone: "[w̥]",
      transcriptionLineStart: 1705,
      transcriptionLineEnd: 1708,
      exactWitness: "a stem-final consonant has the sound it would have in vocable-final position"
    }, {
      id: "cn-l2-25-stem-final-k-before-e-i-qu",
      operationId: "cn-l2-open-transition",
      boundaryType: "compound-stem-boundary",
      phoneme: "/k/",
      followingVowels: ["e", "i"],
      outputSpelling: "qu",
      outputExample: "tēyēquihtoa",
      blockedExample: "tēyēcihtoa",
      exception: true,
      transcriptionLineStart: 1708,
      transcriptionLineEnd: 1709,
      exactWitness: "Stem-final\n/k/ before stem-initial /e/ or /i/ is spelled qu"
    }, {
      id: "cn-l2-25-stem-final-kw-before-vowel-cu",
      operationId: "cn-l2-open-transition",
      boundaryType: "compound-stem-boundary",
      phoneme: "[kʷ]",
      followingVowels: ["a", "e", "i", "o"],
      outputSpelling: "cu",
      outputExample: "necuātl",
      blockedExample: "neucātl",
      exception: true,
      transcriptionLineStart: 1709,
      transcriptionLineEnd: 1710,
      exactWitness: "Stem-\nfinal /kʷ/ retains voice on its release feature before a vowel and is usually spelled cu"
    }, {
      id: "cn-l2-25-stem-final-w-before-vowel-hu-variant",
      operationId: "cn-l2-open-transition",
      boundaryType: "compound-stem-boundary",
      phoneme: "[w]",
      followingVowels: ["a", "e", "i", "o"],
      outputSpelling: "hu",
      outputExample: "cuācuahueh",
      alternateForRuleId: "cn-l2-25-stem-final-w-vocable-final",
      exception: true,
      transcriptionLineStart: 1711,
      transcriptionLineEnd: 1712,
      exactWitness: "At times stem-final [w̥] before a vowel is spelled hu"
    }].map(rule => Object.freeze({
      ...rule,
      lesson: "Andrews Lesson 2",
      section: "2.5",
      sourceAuthority: "Andrews transcription",
      sourceDocument: CLASSICAL_NAHUATL_TRANSCRIPTION_SOURCE_DOCUMENT,
      examples: Array.isArray(rule.examples) ? rule.examples : []
    })));
    const CLASSICAL_NAHUATL_LESSON2_SYLLABLE_STRUCTURE_RULES = Object.freeze([{
      id: "cn-l2-26-vowel-count-no-diphthongs",
      operationId: "cn-l2-syllable-structure",
      transcriptionLineStart: 1713,
      transcriptionLineEnd: 1715,
      exactWitness: "has as many syllables as it has vowels (there are\nno diphthongs)"
    }, {
      id: "cn-l2-26-four-syllable-shapes",
      operationId: "cn-l2-syllable-structure",
      syllableShapes: ["V", "CV", "VC", "CVC"],
      transcriptionLineStart: 1714,
      transcriptionLineEnd: 1719,
      exactWitness: "A syllable may have one of four shapes"
    }, {
      id: "cn-l2-26-intervocalic-consonant-onset",
      operationId: "cn-l2-syllable-structure",
      examples: ["cā-na", "nā-hui"],
      transcriptionLineStart: 1721,
      transcriptionLineEnd: 1722,
      exactWitness: "Any consonant sound between two vowels forms a syllable with the second vowel"
    }, {
      id: "cn-l2-26-vowel-sequence-separated",
      operationId: "cn-l2-syllable-structure",
      examples: ["te-otl"],
      transcriptionLineStart: 1723,
      transcriptionLineEnd: 1723,
      exactWitness: "Any two vowels in sequence belong to separate syllables"
    }, {
      id: "cn-l2-26-u-is-digraph-only",
      operationId: "cn-l2-syllable-structure",
      examples: ["qui-tza-cui-a", "nauh", "iuc-ci", "no-cuauh", "cac-huah"],
      transcriptionLineStart: 1724,
      transcriptionLineEnd: 1727,
      exactWitness: "in these lessons it is never a vowel letter\nbut only a part of a digraph"
    }, {
      id: "cn-l2-26-two-consonant-cluster-split",
      operationId: "cn-l2-syllable-structure",
      examples: ["ōm-pa", "cal-li", "iz-tatl"],
      transcriptionLineStart: 1728,
      transcriptionLineEnd: 1731,
      exactWitness: "No more than two consonant sounds can be juxtaposed, and such a juxtaposition is never\npermitted in initial or final positions"
    }, {
      id: "cn-l2-26-digraphs-single-consonant",
      operationId: "cn-l2-syllable-structure",
      examples: ["a-tzan", "tōch-tli"],
      transcriptionLineStart: 1732,
      transcriptionLineEnd: 1733,
      exactWitness: "Care should be taken with digraphs, since they represent a single consonant sound"
    }, {
      id: "cn-l2-26-supportive-i-illegal-sequence",
      operationId: "cn-l2-supportive-i",
      examples: ["išλa:walo:", "kikaki", "okičλi"],
      transcriptionLineStart: 1738,
      transcriptionLineEnd: 1744,
      exactWitness: "any type-level consonant sequence\nthat is illegal at the token level is lifted into a pronounceable sequence by the introduction of an [i]"
    }, {
      id: "cn-l2-26-phonological-not-morphological",
      operationId: "cn-l2-syllable-structure",
      transcriptionLineStart: 1755,
      transcriptionLineEnd: 1758,
      exactWitness: "One should never confuse syllable\ndivision in a vocable with the morphological analysis of a particle or nuclear clause"
    }].map(rule => Object.freeze({
      ...rule,
      lesson: "Andrews Lesson 2",
      section: "2.6",
      sourceAuthority: "Andrews transcription",
      sourceDocument: CLASSICAL_NAHUATL_TRANSCRIPTION_SOURCE_DOCUMENT,
      examples: Array.isArray(rule.examples) ? rule.examples : []
    })));
    const CLASSICAL_NAHUATL_LESSON2_SUPPORTIVE_VOWEL_RULES = Object.freeze([{
      id: "cn-l2-263-supportive-i-illegal-sequence",
      operationId: "cn-l2-supportive-vowel-realization",
      action: "insert",
      phone: "i",
      condition: "type-level-consonant-sequence-illegal-at-token-level",
      licensedPositions: Object.freeze(["before", "between", "after"]),
      transcriptionLineStart: 1738,
      transcriptionLineEnd: 1744,
    }, {
      id: "cn-l2-263-supportive-i-drop-when-unneeded",
      operationId: "cn-l2-supportive-vowel-realization",
      action: "drop",
      phone: "i",
      condition: "supportive-vowel-no-longer-needed",
      ordinaryPosition: "initial",
      rarePosition: "final",
      transcriptionLineStart: 1744,
      transcriptionLineEnd: 1745,
    }].map(rule => Object.freeze({
      ...rule,
      sourceAuthority: "Andrews transcription",
      sourceDocument: CLASSICAL_NAHUATL_TRANSCRIPTION_SOURCE_DOCUMENT,
      section: "2.6.3",
    })));
    const CLASSICAL_NAHUATL_LESSON2_STRESS_RULES = Object.freeze([{
      id: "cn-l2-27-penultimate-vocable-stress",
      operationId: "cn-l2-vocable-stress",
      transcriptionLineStart: 1759,
      transcriptionLineEnd: 1760,
      exactWitness: "Stress in Nahuatl vocables falls on the penultimate (next-to-the-last) syllable."
    }, {
      id: "cn-l2-27-final-short-vowel-contrast",
      operationId: "cn-l2-vocable-stress",
      examples: ["calaqui", "calac"],
      transcriptionLineStart: 1773,
      transcriptionLineEnd: 1774,
      exactWitness: "Syllable stress helps indicate the presence of a vocable-final (reduced) short vowel."
    }, {
      id: "cn-l2-27-vocative-particle-exception",
      operationId: "cn-l2-vocable-stress",
      examples: ["nopiltziné"],
      transcriptionLineStart: 1775,
      transcriptionLineEnd: 1778,
      exactWitness: "There is only one exception to the above rule for stress"
    }, {
      id: "cn-l2-27-stress-group-connected-speech",
      operationId: "cn-l2-vocable-stress",
      examples: ["i-nōm-pa", "i-nin"],
      transcriptionLineStart: 1779,
      transcriptionLineEnd: 1790,
      exactWitness: "syllable division operates across vocable boundaries within the group"
    }].map(rule => Object.freeze({
      ...rule,
      lesson: "Andrews Lesson 2",
      section: "2.7",
      sourceAuthority: "Andrews transcription",
      sourceDocument: CLASSICAL_NAHUATL_TRANSCRIPTION_SOURCE_DOCUMENT,
      examples: Array.isArray(rule.examples) ? rule.examples : []
    })));
    const CLASSICAL_NAHUATL_LESSON2_CONSONANTAL_LENGTH_RULES = Object.freeze([{
      id: "cn-l2-28-identical-consonants-create-long-consonant",
      operationId: "cn-l2-consonantal-length",
      transcriptionLineStart: 1791,
      transcriptionLineEnd: 1792,
      exactWitness: "When two identical consonants come together as a result of grammatical\nconstruction, they create a long consonant."
    }, {
      id: "cn-l2-28-single-bridging-pronunciation",
      operationId: "cn-l2-consonantal-length",
      transcriptionLineStart: 1793,
      transcriptionLineEnd: 1799,
      exactWitness: "there is not a separate\npronunciation for each of the juxtaposed consonants but rather a single pronunciation"
    }, {
      id: "cn-l2-28-affricate-release-feature-loss",
      operationId: "cn-l2-consonantal-length",
      transcriptionLineStart: 1800,
      transcriptionLineEnd: 1801,
      exactWitness: "the release feature of the first consonant is lost"
    }, {
      id: "cn-l2-28-within-vocable-double-spelling",
      operationId: "cn-l2-consonantal-length",
      transcriptionLineStart: 1802,
      transcriptionLineEnd: 1812,
      exactWitness: "When a\nlong consonant occurs within a vocable, it is usually spelled with a double letter or a double\ndigraph"
    }, {
      id: "cn-l2-28-traditional-text-spelling-warning",
      operationId: "cn-l2-consonantal-length",
      transcriptionLineStart: 1813,
      transcriptionLineEnd: 1815,
      exactWitness: "one should, however, be alert to the possibility of a long consonant\nspelled as a short one"
    }].map(rule => Object.freeze({
      ...rule,
      lesson: "Andrews Lesson 2",
      section: "2.8",
      sourceAuthority: "Andrews transcription",
      sourceDocument: CLASSICAL_NAHUATL_TRANSCRIPTION_SOURCE_DOCUMENT
    })));
    const CLASSICAL_NAHUATL_LESSON2_ASSIMILATION_RULES = Object.freeze([{
      id: "cn-l2-29-grammatical-unlike-consonants",
      operationId: "cn-l2-assimilation",
      section: "2.9",
      matchKind: "gate",
      transcriptionLineStart: 1816,
      transcriptionLineEnd: 1820,
      exactWitness: "certain unlike consonants\nare juxtaposed"
    }, {
      id: "cn-l2-29-progressive-vs-regressive",
      operationId: "cn-l2-assimilation",
      section: "2.9",
      matchKind: "direction-inventory",
      transcriptionLineStart: 1821,
      transcriptionLineEnd: 1822,
      exactWitness: "The assimilation may be progressive"
    }, {
      id: "cn-l2-210-progressive-l-tl-ll",
      operationId: "cn-l2-assimilation",
      section: "2.10",
      matchKind: "exact",
      direction: "progressive",
      sourceLeft: "l",
      sourceRight: "tl",
      dominantSide: "left",
      assimilationType: "total",
      outputSound: "ll",
      outputSpelling: "ll",
      example: "mil- + -tlah > millah",
      transcriptionLineStart: 1829,
      transcriptionLineEnd: 1829,
      exactWitness: "1. /l/ + /λ/ > [ll]: mil- + -tlah > millah"
    }, {
      id: "cn-l2-210-progressive-l-y-ll",
      operationId: "cn-l2-assimilation",
      section: "2.10",
      matchKind: "exact",
      direction: "progressive",
      sourceLeft: "l",
      sourceRight: "y",
      dominantSide: "left",
      assimilationType: "total",
      outputSound: "ll",
      outputSpelling: "ll",
      example: "pil- + -yōtl > pillōtl",
      transcriptionLineStart: 1830,
      transcriptionLineEnd: 1830,
      exactWitness: "2. /l/ + /y/ > [ll]: pil- + -yōtl > pillōtl"
    }, {
      id: "cn-l2-210-progressive-s-y-ss",
      operationId: "cn-l2-assimilation",
      section: "2.10",
      matchKind: "exact",
      direction: "progressive",
      sourceLeft: "s",
      sourceRight: "y",
      dominantSide: "left",
      assimilationType: "total",
      outputSound: "ss",
      outputSpelling: "zz",
      example: "chōquiz- + -yoh > chōquizzoh",
      transcriptionLineStart: 1831,
      transcriptionLineEnd: 1831,
      exactWitness: "3. /s/ + /y/ > [ss]: chōquiz- + -yoh > chōquizzoh"
    }, {
      id: "cn-l2-210-progressive-x-y-xx",
      operationId: "cn-l2-assimilation",
      section: "2.10",
      matchKind: "exact",
      direction: "progressive",
      sourceLeft: "x",
      sourceRight: "y",
      dominantSide: "left",
      assimilationType: "total",
      outputSound: "šš",
      outputSpelling: "xx",
      example: "mix- + -yoh > mixxoh",
      transcriptionLineStart: 1832,
      transcriptionLineEnd: 1832,
      exactWitness: "4. /š/ + /y/ > [šš]: mix- + -yoh > mixxoh"
    }, {
      id: "cn-l2-210-progressive-tz-y-tztz",
      operationId: "cn-l2-assimilation",
      section: "2.10",
      matchKind: "exact",
      direction: "progressive",
      sourceLeft: "tz",
      sourceRight: "y",
      dominantSide: "left",
      assimilationType: "total",
      outputSound: "¢¢",
      outputSpelling: "tztz",
      releasePronunciation: "[t¢]",
      example: "huitz- + -yoh > huitztzoh",
      transcriptionLineStart: 1833,
      transcriptionLineEnd: 1833,
      exactWitness: "5. /¢/ + /y/ > [¢¢]: huitz- + -yoh > huitztzoh"
    }, {
      id: "cn-l2-210-progressive-ch-y-chch",
      operationId: "cn-l2-assimilation",
      section: "2.10",
      matchKind: "exact",
      direction: "progressive",
      sourceLeft: "ch",
      sourceRight: "y",
      dominantSide: "left",
      assimilationType: "total",
      outputSound: "čč",
      outputSpelling: "chch",
      releasePronunciation: "[tč]",
      example: "oquich- + -yōtl > oquichchōtl",
      transcriptionLineStart: 1834,
      transcriptionLineEnd: 1834,
      exactWitness: "6. /č/ + /y/ > [čč]: oquich- + -yōtl > oquichchōtl"
    }, {
      id: "cn-l2-210-ll-only-listed",
      operationId: "cn-l2-assimilation",
      section: "2.10",
      matchKind: "ll-restriction",
      transcriptionLineStart: 1835,
      transcriptionLineEnd: 1841,
      exactWitness: "Rules 1 and 2 above are the only ways in which the [ll] sequence can occur"
    }, {
      id: "cn-l2-211-regressive-nasal-sibilant",
      operationId: "cn-l2-assimilation",
      section: "2.11",
      matchKind: "nasal-sibilant",
      direction: "regressive",
      dominantSide: "right",
      assimilationType: "total",
      transcriptionLineStart: 1842,
      transcriptionLineEnd: 1851,
      exactWitness: "1. /nasal/+ /sibilant/> [long sibilant]"
    }, {
      id: "cn-l2-211-regressive-sibilant-group",
      operationId: "cn-l2-assimilation",
      section: "2.11",
      matchKind: "sibilant-group",
      direction: "regressive",
      dominantSide: "right",
      assimilationType: "total",
      transcriptionLineStart: 1852,
      transcriptionLineEnd: 1856,
      exactWitness: "In a combination of any two unlike consonants of the group /s š ¢ č/"
    }, {
      id: "cn-l2-211-regressive-w-bilabial",
      operationId: "cn-l2-assimilation",
      section: "2.11",
      matchKind: "w-bilabial",
      direction: "regressive",
      dominantSide: "right",
      assimilationType: "total",
      transcriptionLineStart: 1862,
      transcriptionLineEnd: 1864,
      exactWitness: "3. /w/ + /bilabial/ > [long bilabial]"
    }, {
      id: "cn-l2-211-regressive-m-n-nn",
      operationId: "cn-l2-assimilation",
      section: "2.11",
      matchKind: "exact",
      direction: "regressive",
      sourceLeft: "m",
      sourceRight: "n",
      dominantSide: "right",
      assimilationType: "total",
      outputSound: "nn",
      outputSpelling: "nn",
      example: "ōm- + nohpalli > ōnnohpalli",
      transcriptionLineStart: 1865,
      transcriptionLineEnd: 1866,
      exactWitness: "4. /m/ + /n/ > [nn]"
    }, {
      id: "cn-l2-211-regressive-m-partial",
      operationId: "cn-l2-assimilation",
      section: "2.11",
      matchKind: "m-partial",
      direction: "regressive",
      dominantSide: "right",
      assimilationType: "partial",
      transcriptionLineStart: 1871,
      transcriptionLineEnd: 1879,
      exactWitness: "When /m/ is followed by /t/, /λ/, /¢/, /č/, /k/, or /kʷ/, it undergoes partial assimilation"
    }, {
      id: "cn-l2-211-regressive-n-m-mm",
      operationId: "cn-l2-assimilation",
      section: "2.11",
      matchKind: "exact",
      direction: "regressive",
      sourceLeft: "n",
      sourceRight: "m",
      dominantSide: "right",
      assimilationType: "total",
      outputSound: "mm",
      outputSpelling: "mm",
      example: "on- + mopiqui > ommopiqui",
      transcriptionLineStart: 1880,
      transcriptionLineEnd: 1882,
      exactWitness: "6. /n/ + /m/ > [mm]"
    }, {
      id: "cn-l2-211-regressive-n-p-mp",
      operationId: "cn-l2-assimilation",
      section: "2.11",
      matchKind: "exact",
      direction: "regressive",
      sourceLeft: "n",
      sourceRight: "p",
      dominantSide: "right",
      assimilationType: "partial",
      outputSound: "mp",
      outputSpelling: "mp",
      example: "on- + pēhua > ompēhua",
      transcriptionLineStart: 1883,
      transcriptionLineEnd: 1885,
      exactWitness: "7. When /n/ is followed by /p/, it undergoes partial assimilation, resulting in [mp]."
    }, {
      id: "cn-l2-211-low-frequency-ch-p-pp",
      operationId: "cn-l2-assimilation",
      section: "2.11",
      matchKind: "exact",
      direction: "regressive",
      sourceLeft: "ch",
      sourceRight: "p",
      dominantSide: "right",
      assimilationType: "total",
      outputSound: "pp",
      outputSpelling: "pp",
      lowFrequency: true,
      example: "tzīntlāltech- + -pachihui > tzīntlālteppachihui",
      transcriptionLineStart: 1886,
      transcriptionLineEnd: 1889,
      exactWitness: "other, less frequently encountered assimilation is possible"
    }, {
      id: "cn-l2-211-regressive-dissimilation-kk-hk",
      operationId: "cn-l2-assimilation",
      section: "2.11",
      matchKind: "dissimilation",
      processKind: "dissimilation",
      direction: "regressive",
      sourceLeft: "k",
      sourceRight: "k",
      outputSound: "hk",
      outputSpelling: "hc",
      optional: true,
      transcriptionLineStart: 1890,
      transcriptionLineEnd: 1896,
      exactWitness: "another process called dissimilation"
    }].map(rule => Object.freeze({
      ...rule,
      lesson: "Andrews Lesson 2",
      sourceAuthority: "Andrews transcription",
      sourceDocument: CLASSICAL_NAHUATL_TRANSCRIPTION_SOURCE_DOCUMENT,
      examples: rule.example ? [rule.example] : [],
      lowFrequency: rule.lowFrequency === true,
      optional: rule.optional === true,
      processKind: rule.processKind || "assimilation"
    })));
    const CLASSICAL_NAHUATL_LESSON2_CONSONANT_LOSS_RULES = Object.freeze([{
      id: "cn-l2-212-loss-general",
      operationId: "cn-l2-consonant-loss",
      section: "2.12",
      matchKind: "gate",
      transcriptionLineStart: 1897,
      transcriptionLineEnd: 1899,
      exactWitness: "In certain consonant sequences one of the consonants becomes imperceptible."
    }, {
      id: "cn-l2-212-tz-w-tz",
      operationId: "cn-l2-consonant-loss",
      section: "2.12",
      matchKind: "exact",
      sourceLeft: "tz",
      sourceRight: "w",
      lostSide: "right",
      lostConsonant: "w",
      outputSound: "¢",
      outputSpelling: "tz",
      optional: true,
      example: "mitz- + -huālmomaquilia > mitzālmomaquilia",
      transcriptionLineStart: 1900,
      transcriptionLineEnd: 1901,
      exactWitness: "1. /¢/ + /w/ > [¢]. This is an optional rule."
    }, {
      id: "cn-l2-212-ch-w-ch",
      operationId: "cn-l2-consonant-loss",
      section: "2.12",
      matchKind: "exact",
      sourceLeft: "ch",
      sourceRight: "w",
      lostSide: "right",
      lostConsonant: "w",
      outputSound: "č",
      outputSpelling: "ch",
      optional: true,
      example: "tēch- + -huālnōtza > tēchālnōtza",
      transcriptionLineStart: 1902,
      transcriptionLineEnd: 1903,
      exactWitness: "2. /č/ + /w/ > [č]. This is an optional rule."
    }, {
      id: "cn-l2-212-glottal-y-h",
      operationId: "cn-l2-consonant-loss",
      section: "2.12",
      matchKind: "glottal-y-h",
      sourceLeft: "glottal",
      sourceRight: "y",
      lostSide: "merged",
      lostConsonant: "glottal-y",
      outputSound: "h",
      outputSpelling: "h",
      optional: true,
      example: "tlahyelli > tlahelli",
      transcriptionLineStart: 1904,
      transcriptionLineEnd: 1906,
      exactWitness: "3. /ʔ/ + /y/ > [h]. This is an optional rule."
    }, {
      id: "cn-l2-212-glottal-y-y",
      operationId: "cn-l2-consonant-loss",
      section: "2.12",
      matchKind: "glottal-y-y",
      sourceLeft: "glottal",
      sourceRight: "y",
      lostSide: "left",
      lostConsonant: "glottal",
      outputSound: "y",
      outputSpelling: "y",
      example: "ah- + ye > *ayye > aye > aya",
      transcriptionLineStart: 1907,
      transcriptionLineEnd: 1910,
      exactWitness: "There is another rule that produces the opposite result"
    }, {
      id: "cn-l2-212-glottal-y-y-reduplication-block",
      operationId: "cn-l2-consonant-loss",
      section: "2.12",
      matchKind: "reduplication-block",
      sourceLeft: "glottal",
      sourceRight: "y",
      transcriptionLineStart: 1907,
      transcriptionLineEnd: 1909,
      exactWitness: "This rule cannot operate when the /ʔ/ is due to reduplication."
    }, {
      id: "cn-l2-212-initial-y-unstable-note",
      operationId: "cn-l2-consonant-loss",
      section: "2.12",
      matchKind: "initial-y-note",
      sourceLeft: "y",
      lostSide: "initial",
      lostConsonant: "y",
      outputSound: "",
      outputSpelling: "",
      transcriptionLineStart: 1911,
      transcriptionLineEnd: 1912,
      exactWitness: "A stem-initial /y/ is sometimes omitted for no apparent reason"
    }, {
      id: "cn-l2-212-y-between-long-a-o-vowels",
      operationId: "cn-l2-consonant-loss",
      section: "2.12",
      matchKind: "long-vowel-y-loss",
      sourceLeft: "y",
      lostSide: "medial",
      lostConsonant: "y",
      outputSound: "long-vowel-sequence",
      outputSpelling: "",
      transcriptionLineStart: 1913,
      transcriptionLineEnd: 1914,
      exactWitness: "/y/ between the two long vowels /a:/ and /o:/ (in either order) is lost"
    }, {
      id: "cn-l2-212-nasal-y-y",
      operationId: "cn-l2-consonant-loss",
      section: "2.12",
      matchKind: "nasal-y",
      sourceRight: "y",
      lostSide: "left",
      lostConsonant: "nasal",
      outputSound: "y",
      outputSpelling: "ny",
      nasalizationTrace: true,
      transcriptionLineStart: 1919,
      transcriptionLineEnd: 1926,
      exactWitness: "4. /nasal/ + /y/ > [y]."
    }, {
      id: "cn-l2-212-nasal-w-w",
      operationId: "cn-l2-consonant-loss",
      section: "2.12",
      matchKind: "nasal-w",
      sourceRight: "w",
      lostSide: "left",
      lostConsonant: "nasal",
      outputSound: "w",
      outputSpelling: "nhu",
      nasalizationTrace: true,
      transcriptionLineStart: 1927,
      transcriptionLineEnd: 1933,
      exactWitness: "5. /nasal/ + /w/ > [w]."
    }, {
      id: "cn-l2-212-w-w-w",
      operationId: "cn-l2-consonant-loss",
      section: "2.12",
      matchKind: "exact",
      sourceLeft: "w",
      sourceRight: "w",
      lostSide: "left",
      lostConsonant: "w",
      outputSound: "w",
      outputSpelling: "hu",
      example: "cuāuh- + -huah > cuāhuah",
      transcriptionLineStart: 1934,
      transcriptionLineEnd: 1935,
      exactWitness: "6. /w/ + /w/ > [w]. The first /w/, which is voiceless, is lost."
    }].map(rule => Object.freeze({
      ...rule,
      lesson: "Andrews Lesson 2",
      sourceAuthority: "Andrews transcription",
      sourceDocument: CLASSICAL_NAHUATL_TRANSCRIPTION_SOURCE_DOCUMENT,
      examples: rule.example ? [rule.example] : [],
      optional: rule.optional === true,
      nasalizationTrace: rule.nasalizationTrace === true
    })));
    const CLASSICAL_NAHUATL_LESSON2_CONSONANT_PHONE_SHIFT_RULES = Object.freeze([{
      id: "cn-l2-213-phone-shift-general",
      operationId: "cn-l2-consonant-phone-shift",
      section: "2.13",
      matchKind: "gate",
      transcriptionLineStart: 1936,
      transcriptionLineEnd: 1940,
      exactWitness: "a shift may occur when, as a\nresult of grammatical construction"
    }, {
      id: "cn-l2-213-glottal-vowel-y",
      operationId: "cn-l2-consonant-phone-shift",
      section: "2.13",
      matchKind: "glottal-vowel",
      sourceConsonant: "glottal",
      outputSound: "y",
      outputSpelling: "y",
      optional: true,
      transcriptionLineStart: 1941,
      transcriptionLineEnd: 1945,
      exactWitness: "1. /ʔ/ + /vowel/ > [y] + [vowel]. This is an optional change."
    }, {
      id: "cn-l2-213-intervocalic-y-disappears",
      operationId: "cn-l2-consonant-phone-shift",
      section: "2.13",
      matchKind: "intervocalic-y-disappears",
      sourceConsonant: "glottal",
      outputSound: "",
      outputSpelling: "",
      transcriptionLineStart: 1941,
      transcriptionLineEnd: 1949,
      exactWitness: "When intervocalic, the resultant\n[y] may disappear."
    }, {
      id: "cn-l2-213-m-exposed-n",
      operationId: "cn-l2-consonant-phone-shift",
      section: "2.13",
      matchKind: "m-exposed",
      sourceConsonant: "m",
      outputSound: "n̥",
      outputSpelling: "n",
      transcriptionLineStart: 1950,
      transcriptionLineEnd: 1962,
      exactWitness: "2. /m/ > [n̥] when left exposed at the end of a syllable or vocable."
    }, {
      id: "cn-l2-213-y-exposed-x",
      operationId: "cn-l2-consonant-phone-shift",
      section: "2.13",
      matchKind: "y-exposed",
      sourceConsonant: "y",
      outputSound: "š",
      outputSpelling: "x",
      transcriptionLineStart: 1963,
      transcriptionLineEnd: 1967,
      exactWitness: "3. /y/ > [š] when left exposed at the end of a syllable or vocable."
    }, {
      id: "cn-l2-213-y-exposed-prior-s",
      operationId: "cn-l2-consonant-phone-shift",
      section: "2.13",
      matchKind: "y-exposed-prior-s",
      sourceConsonant: "y",
      outputSound: "s",
      outputSpelling: "z",
      transcriptionLineStart: 1966,
      transcriptionLineEnd: 1967,
      exactWitness: "When the vocable contains a prior s-sound, /y/ > [s]"
    }, {
      id: "cn-l2-213-kw-exposed-k",
      operationId: "cn-l2-consonant-phone-shift",
      section: "2.13",
      matchKind: "kw-exposed",
      sourceConsonant: "kw",
      outputSound: "k",
      outputSpelling: "c",
      optional: true,
      transcriptionLineStart: 1969,
      transcriptionLineEnd: 1972,
      exactWitness: "4. Occasionally, /kʷ/ > [k]"
    }, {
      id: "cn-l2-213-t-final-h",
      operationId: "cn-l2-consonant-phone-shift",
      section: "2.13",
      matchKind: "t-final",
      sourceConsonant: "t",
      outputSound: "h",
      outputSpelling: "h",
      optional: true,
      transcriptionLineStart: 1973,
      transcriptionLineEnd: 1975,
      exactWitness: "5. Occasionally, /t/ > [h] when the /t/ is forced into a vocable-final position"
    }, {
      id: "cn-l2-213-rare-glottal-nonfinal-t",
      operationId: "cn-l2-consonant-phone-shift",
      section: "2.13",
      matchKind: "rare-glottal-nonfinal-t",
      sourceConsonant: "glottal",
      outputSound: "t",
      outputSpelling: "t",
      rare: true,
      transcriptionLineStart: 1976,
      transcriptionLineEnd: 1978,
      exactWitness: "non-final /ʔ/ > non-\nfinal [t]"
    }].map(rule => Object.freeze({
      ...rule,
      lesson: "Andrews Lesson 2",
      sourceAuthority: "Andrews transcription",
      sourceDocument: CLASSICAL_NAHUATL_TRANSCRIPTION_SOURCE_DOCUMENT,
      optional: rule.optional === true,
      rare: rule.rare === true
    })));
    const CLASSICAL_NAHUATL_LESSON2_VOWEL_ELISION_RULES = Object.freeze([{
      id: "cn-l2-214-short-vowel-stress-group-elision",
      operationId: "cn-l2-vowel-elision",
      transcriptionLineStart: 1979,
      transcriptionLineEnd: 1981,
      exactWitness: "An initial or final short vowel of certain vocables can be elided"
    }, {
      id: "cn-l2-214-long-vowel-resists-elision",
      operationId: "cn-l2-vowel-elision",
      transcriptionLineStart: 1979,
      transcriptionLineEnd: 1981,
      exactWitness: "A long vowel tends not\nto undergo elision."
    }, {
      id: "cn-l2-214-listed-stress-group-examples",
      operationId: "cn-l2-vowel-elision",
      transcriptionLineStart: 1982,
      transcriptionLineEnd: 1985,
      exactWitness: "zā oc > zāc",
      examples: ["zā oc > zāc", "zā zo īc in > zāciquin", "mā zo ihui > mācihui", "mā zo in ahmō > mācinahmō"]
    }, {
      id: "cn-l2-214-spelling-change-required",
      operationId: "cn-l2-vowel-elision",
      transcriptionLineStart: 1986,
      transcriptionLineEnd: 1986,
      exactWitness: "if elision is indicated in writing, a spelling change is often necessary"
    }, {
      id: "cn-l2-214-supportive-i-not-proper-elision",
      operationId: "cn-l2-vowel-elision",
      transcriptionLineStart: 1987,
      transcriptionLineEnd: 1990,
      exactWitness: "When the omitted vowel is a supportive [i], it is not, properly speaking, elision"
    }].map(rule => Object.freeze({
      ...rule,
      lesson: "Andrews Lesson 2",
      section: "2.14",
      sourceAuthority: "Andrews transcription",
      sourceDocument: CLASSICAL_NAHUATL_TRANSCRIPTION_SOURCE_DOCUMENT,
      examples: Array.isArray(rule.examples) ? rule.examples : []
    })));
    const CLASSICAL_NAHUATL_LESSON2_LONG_VOWEL_GLOTTAL_RULES = Object.freeze([{
      id: "cn-l2-215-irregular-short-vowel-glottal-morph",
      operationId: "cn-l2-long-vowel-glottal-stop",
      transcriptionLineStart: 1991,
      transcriptionLineEnd: 1994,
      exactWitness: "certain morphemes with a long\nfinal vowel have in their morphic repertory an irregular morph that has a short vowel plus a glottal\nstop"
    }, {
      id: "cn-l2-215-small-number-of-morphemes",
      operationId: "cn-l2-long-vowel-glottal-stop",
      transcriptionLineStart: 1994,
      transcriptionLineEnd: 1994,
      exactWitness: "Only a small number of morphemes permit this."
    }, {
      id: "cn-l2-215-embed-subposition-required",
      operationId: "cn-l2-long-vowel-glottal-stop",
      transcriptionLineStart: 1994,
      transcriptionLineEnd: 1996,
      exactWitness: "the morph with the glottal stop must occupy the embed subposition of a compound stem"
    }, {
      id: "cn-l2-215-matrix-determines-choice",
      operationId: "cn-l2-long-vowel-glottal-stop",
      transcriptionLineStart: 1995,
      transcriptionLineEnd: 1996,
      exactWitness: "its choice being determined by the morpheme in the matrix subposition"
    }, {
      id: "cn-l2-215-listed-examples",
      operationId: "cn-l2-long-vowel-glottal-stop",
      transcriptionLineStart: 1997,
      transcriptionLineEnd: 1999,
      exactWitness: "huē- + -cāuh > huehcāuh",
      examples: ["huē- + -cāuh > huehcāuh", "teō- + -calli > teohcalli", "māi- + -pilli > mahpilli"]
    }].map(rule => Object.freeze({
      ...rule,
      lesson: "Andrews Lesson 2",
      section: "2.15",
      sourceAuthority: "Andrews transcription",
      sourceDocument: CLASSICAL_NAHUATL_TRANSCRIPTION_SOURCE_DOCUMENT,
      examples: Array.isArray(rule.examples) ? rule.examples : []
    })));
    const CLASSICAL_NAHUATL_LESSON2_PROSODIC_CONTOUR_RULES = Object.freeze([{
      id: "cn-l2-216-sentences-had-prosodic-contours",
      operationId: "cn-l2-prosodic-contours",
      transcriptionLineStart: 2004,
      transcriptionLineEnd: 2006,
      exactWitness: "Classical Nahuatl sentences, of course, had prosodic contours"
    }, {
      id: "cn-l2-216-known-stress-rules",
      operationId: "cn-l2-prosodic-contours",
      transcriptionLineStart: 2006,
      transcriptionLineEnd: 2008,
      exactWitness: "rules for stress are known for nuclear clauses and stress groups"
    }, {
      id: "cn-l2-216-long-final-vowel-low-pitch",
      operationId: "cn-l2-prosodic-contours",
      transcriptionLineStart: 2007,
      transcriptionLineEnd: 2008,
      exactWitness: "a long final vowel has low pitch"
    }, {
      id: "cn-l2-216-sentential-prosody-unknown",
      operationId: "cn-l2-prosodic-contours",
      transcriptionLineStart: 2008,
      transcriptionLineEnd: 2010,
      exactWitness: "practically nothing is known of the language's sentential prosodic features"
    }].map(rule => Object.freeze({
      ...rule,
      lesson: "Andrews Lesson 2",
      section: "2.16",
      sourceAuthority: "Andrews transcription",
      sourceDocument: CLASSICAL_NAHUATL_TRANSCRIPTION_SOURCE_DOCUMENT
    })));
    const CLASSICAL_NAHUATL_FIREWALL_RULES = Object.freeze([
      "The runtime has one Classical Nahuatl language boundary",
      "Visible output uses Andrews transcription and Classical boundary realization",
      "Literal w and k are forbidden in generated Classical surface fields",
      "No orthography converter or alternate language profile is installed"
    ]);
    function getClassicalNahuatlTranscriptionRuntimeTarget() {
      return typeof targetObject !== "undefined" && targetObject || (typeof globalThis !== "undefined" ? globalThis : null);
    }
    function getClassicalNahuatlLetters() {
      return Array.from(CLASSICAL_NAHUATL_LESSON2_LETTERS);
    }
    function getClassicalNahuatlDigraphs() {
      return Array.from(CLASSICAL_NAHUATL_LESSON2_DIGRAPHS);
    }
    function normalizeClassicalNahuatlOrthographyInput(value) {
      const normalizer = getClassicalNahuatlTranscriptionRuntimeTarget()?.normalizeOrthographyInput;
      if (typeof normalizer === "function") {
        return normalizer(value);
      }
      return String(value == null ? "" : value).trim().toLowerCase();
    }
    function normalizeClassicalNahuatlSimpleVowel(value) {
      const normalized = normalizeClassicalNahuatlOrthographyInput(value).replace(/[ā]/gu, "a").replace(/[ē]/gu, "e").replace(/[ī]/gu, "i").replace(/[ō]/gu, "o");
      const vowel = normalized[0] || "";
      return CLASSICAL_NAHUATL_LESSON2_SIMPLE_VOWELS.includes(vowel) ? vowel : "";
    }
    function normalizeClassicalNahuatlPhoneme(value) {
      const normalized = normalizeClassicalNahuatlOrthographyInput(value).normalize("NFD").replace(/\u0325/gu, "").replace(/[\/\[\]]/gu, "");
      if (normalized === "k") {
        return "/k/";
      }
      if (normalized === "s") {
        return "/s/";
      }
      if (normalized === "w") {
        return "[w]";
      }
      if (normalized === "kw" || normalized === "kʷ") {
        return "[kʷ]";
      }
      return "";
    }
    function normalizeClassicalNahuatlSyllablePosition(value) {
      const normalized = normalizeClassicalNahuatlOrthographyInput(value);
      if (["initial", "syllable-initial", "onset"].includes(normalized)) {
        return "initial";
      }
      if (["final", "syllable-final", "coda"].includes(normalized)) {
        return "final";
      }
      if (["nonfinal", "non-final", "not-final", "not-syllable-final"].includes(normalized)) {
        return "nonfinal";
      }
      return "";
    }
    function inferClassicalNahuatlLesson2SyllablePosition(options = {}, phoneme = "") {
      const explicit = normalizeClassicalNahuatlSyllablePosition(options.syllablePosition);
      if (explicit) {
        return explicit;
      }
      if (options.followingVowel) {
        return phoneme === "[w]" || phoneme === "[kʷ]" ? "nonfinal" : "initial";
      }
      if (options.precedingVowel) {
        return "final";
      }
      return "";
    }
    function getClassicalNahuatlSpellingChangeRules() {
      return CLASSICAL_NAHUATL_LESSON2_SPELLING_CHANGE_RULES.map(rule => ({
        ...rule,
        followingVowels: Array.isArray(rule.followingVowels) ? rule.followingVowels.slice() : [],
        precedingVowels: Array.isArray(rule.precedingVowels) ? rule.precedingVowels.slice() : [],
        examples: rule.examples.slice()
      }));
    }
    function copyClassicalNahuatlLesson2OpenTransitionRule(rule) {
      if (!rule) {
        return null;
      }
      return {
        ...rule,
        followingVowels: Array.isArray(rule.followingVowels) ? rule.followingVowels.slice() : [],
        examples: Array.isArray(rule.examples) ? rule.examples.slice() : []
      };
    }
    function getClassicalNahuatlOpenTransitionRules() {
      return CLASSICAL_NAHUATL_LESSON2_OPEN_TRANSITION_RULES.map(copyClassicalNahuatlLesson2OpenTransitionRule);
    }
    function copyClassicalNahuatlLesson2SyllableStructureRule(rule) {
      if (!rule) {
        return null;
      }
      return {
        ...rule,
        syllableShapes: Array.isArray(rule.syllableShapes) ? rule.syllableShapes.slice() : [],
        examples: Array.isArray(rule.examples) ? rule.examples.slice() : []
      };
    }
    function getClassicalNahuatlSyllableStructureRules() {
      return CLASSICAL_NAHUATL_LESSON2_SYLLABLE_STRUCTURE_RULES.map(copyClassicalNahuatlLesson2SyllableStructureRule);
    }
    function getClassicalNahuatlSupportiveVowelRules() {
      return CLASSICAL_NAHUATL_LESSON2_SUPPORTIVE_VOWEL_RULES.map(rule => ({
        ...rule,
        licensedPositions: Array.isArray(rule.licensedPositions)
          ? rule.licensedPositions.slice()
          : [],
      }));
    }
    function copyClassicalNahuatlLesson2StressRule(rule) {
      if (!rule) {
        return null;
      }
      return {
        ...rule,
        examples: Array.isArray(rule.examples) ? rule.examples.slice() : []
      };
    }
    function getClassicalNahuatlStressRules() {
      return CLASSICAL_NAHUATL_LESSON2_STRESS_RULES.map(copyClassicalNahuatlLesson2StressRule);
    }
    function copyClassicalNahuatlLesson2ConsonantalLengthRule(rule) {
      if (!rule) {
        return null;
      }
      return {
        ...rule
      };
    }
    function getClassicalNahuatlConsonantalLengthRules() {
      return CLASSICAL_NAHUATL_LESSON2_CONSONANTAL_LENGTH_RULES.map(copyClassicalNahuatlLesson2ConsonantalLengthRule);
    }
    function copyClassicalNahuatlLesson2AssimilationRule(rule) {
      if (!rule) {
        return null;
      }
      return {
        ...rule,
        examples: Array.isArray(rule.examples) ? rule.examples.slice() : []
      };
    }
    function getClassicalNahuatlAssimilationRules() {
      return CLASSICAL_NAHUATL_LESSON2_ASSIMILATION_RULES.map(copyClassicalNahuatlLesson2AssimilationRule);
    }
    function copyClassicalNahuatlLesson2ConsonantLossRule(rule) {
      if (!rule) {
        return null;
      }
      return {
        ...rule,
        examples: Array.isArray(rule.examples) ? rule.examples.slice() : []
      };
    }
    function getClassicalNahuatlConsonantLossRules() {
      return CLASSICAL_NAHUATL_LESSON2_CONSONANT_LOSS_RULES.map(copyClassicalNahuatlLesson2ConsonantLossRule);
    }
    function copyClassicalNahuatlLesson2ConsonantPhoneShiftRule(rule) {
      if (!rule) {
        return null;
      }
      return {
        ...rule
      };
    }
    function getClassicalNahuatlConsonantPhoneShiftRules() {
      return CLASSICAL_NAHUATL_LESSON2_CONSONANT_PHONE_SHIFT_RULES.map(copyClassicalNahuatlLesson2ConsonantPhoneShiftRule);
    }
    function copyClassicalNahuatlLesson2VowelElisionRule(rule) {
      if (!rule) {
        return null;
      }
      return {
        ...rule,
        examples: Array.isArray(rule.examples) ? rule.examples.slice() : []
      };
    }
    function getClassicalNahuatlVowelElisionRules() {
      return CLASSICAL_NAHUATL_LESSON2_VOWEL_ELISION_RULES.map(copyClassicalNahuatlLesson2VowelElisionRule);
    }
    function copyClassicalNahuatlLesson2LongVowelGlottalRule(rule) {
      if (!rule) {
        return null;
      }
      return {
        ...rule,
        examples: Array.isArray(rule.examples) ? rule.examples.slice() : []
      };
    }
    function getClassicalNahuatlLongVowelGlottalRules() {
      return CLASSICAL_NAHUATL_LESSON2_LONG_VOWEL_GLOTTAL_RULES.map(copyClassicalNahuatlLesson2LongVowelGlottalRule);
    }
    function copyClassicalNahuatlLesson2ProsodicContourRule(rule) {
      if (!rule) {
        return null;
      }
      return {
        ...rule
      };
    }
    function getClassicalNahuatlProsodicContourRules() {
      return CLASSICAL_NAHUATL_LESSON2_PROSODIC_CONTOUR_RULES.map(copyClassicalNahuatlLesson2ProsodicContourRule);
    }
    function isClassicalNahuatlSyllableVowel(sound) {
      return ["a", "e", "i", "o", "ā", "ē", "ī", "ō"].includes(sound);
    }
    function normalizeClassicalNahuatlStressSyllableInput(value) {
      return normalizeClassicalNahuatlOrthographyInput(value).replace(/[á]/gu, "a").replace(/[é]/gu, "e").replace(/[í]/gu, "i").replace(/[ó]/gu, "o");
    }
    function getClassicalNahuatlSyllableSoundSegmentations(value) {
      const normalized = normalizeClassicalNahuatlOrthographyInput(value);
      const consonantDigraphs = ["qu", "cu", "hu", "uc", "uh", "ch", "tz", "tl"];
      const singleConsonants = new Set(["c", "h", "l", "m", "n", "p", "t", "x", "y", "z"]);
      const cache = new Map();
      function segmentAt(index) {
        if (index >= normalized.length) {
          return [[]];
        }
        if (cache.has(index)) {
          return cache.get(index);
        }
        const char = normalized[index];
        if (isClassicalNahuatlBoundaryChar(char)) {
          const skipped = segmentAt(index + 1);
          cache.set(index, skipped);
          return skipped;
        }
        const segmentations = [];
        for (const digraph of consonantDigraphs) {
          if (normalized.startsWith(digraph, index)) {
            for (const rest of segmentAt(index + digraph.length)) {
              segmentations.push([digraph, ...rest]);
            }
          }
        }
        if (isClassicalNahuatlSyllableVowel(char) || singleConsonants.has(char)) {
          for (const rest of segmentAt(index + 1)) {
            segmentations.push([char, ...rest]);
          }
        }
        cache.set(index, segmentations);
        return segmentations;
      }
      return segmentAt(0);
    }
    function buildClassicalNahuatlSyllablesFromSounds(sounds) {
      const vowelIndexes = sounds.map((sound, index) => ({
        sound,
        index
      })).filter(entry => isClassicalNahuatlSyllableVowel(entry.sound)).map(entry => entry.index);
      const violations = [];
      if (!sounds.length) {
        violations.push("missing-vocable");
      }
      if (!vowelIndexes.length) {
        violations.push("missing-vowel");
      }
      const syllables = vowelIndexes.map(vowelIndex => ({
        onset: [],
        nucleus: sounds[vowelIndex],
        coda: []
      }));
      if (!vowelIndexes.length) {
        return {
          syllables: [],
          violations
        };
      }
      const firstCluster = sounds.slice(0, vowelIndexes[0]);
      if (firstCluster.length > 1) {
        violations.push("initial-consonant-cluster");
      } else if (firstCluster.length === 1) {
        syllables[0].onset = firstCluster;
      }
      for (let index = 0; index < vowelIndexes.length - 1; index += 1) {
        const cluster = sounds.slice(vowelIndexes[index] + 1, vowelIndexes[index + 1]);
        if (cluster.length > 2) {
          violations.push("too-many-medial-consonants");
        } else if (cluster.length === 1) {
          syllables[index + 1].onset = cluster;
        } else if (cluster.length === 2) {
          syllables[index].coda = [cluster[0]];
          syllables[index + 1].onset = [cluster[1]];
        }
      }
      const finalCluster = sounds.slice(vowelIndexes[vowelIndexes.length - 1] + 1);
      if (finalCluster.length > 1) {
        violations.push("final-consonant-cluster");
      } else if (finalCluster.length === 1) {
        syllables[syllables.length - 1].coda = finalCluster;
      }
      const syllableFrames = syllables.map(syllable => {
        const shape = `${syllable.onset.length ? "C" : ""}V${syllable.coda.length ? "C" : ""}`;
        return {
          onset: syllable.onset.slice(),
          nucleus: syllable.nucleus,
          coda: syllable.coda.slice(),
          shape,
          display: [...syllable.onset, syllable.nucleus, ...syllable.coda].join(""),
          open: syllable.coda.length === 0
        };
      });
      if (syllableFrames.some(syllable => !["V", "CV", "VC", "CVC"].includes(syllable.shape))) {
        violations.push("invalid-syllable-shape");
      }
      return {
        syllables: syllableFrames,
        violations
      };
    }
    function buildClassicalNahuatlSyllableStructureMechanicsFrame(value, options = {}) {
      const requestedRuleId = normalizeClassicalNahuatlOrthographyInput(options.ruleId);
      const selectedRule = requestedRuleId
        ? CLASSICAL_NAHUATL_LESSON2_SYLLABLE_STRUCTURE_RULES.find(rule => rule.id === requestedRuleId) || null
        : null;
      const normalized = normalizeClassicalNahuatlOrthographyInput(value);
      const segmentations = getClassicalNahuatlSyllableSoundSegmentations(normalized);
      const candidates = segmentations.map(sounds => ({
        sounds,
        result: buildClassicalNahuatlSyllablesFromSounds(sounds)
      }));
      const selected = candidates.find(candidate => candidate.result.violations.length === 0) || candidates[0] || {
        sounds: [],
        result: {
          syllables: [],
          violations: ["missing-vocable"]
        }
      };
      const sounds = selected.sounds;
      const syllables = selected.result.syllables;
      const violations = selected.result.violations;
      const vowelCount = sounds.filter(isClassicalNahuatlSyllableVowel).length;
      const hasStandaloneU = sounds.includes("u");
      const syllableCountMatchesVowelCount = syllables.length === vowelCount && vowelCount > 0;
      const evaluatedRuleIds = [
        "cn-l2-26-vowel-count-no-diphthongs",
        "cn-l2-26-four-syllable-shapes",
        ...(sounds.some((sound, index) =>
          index > 0
          && index < sounds.length - 1
          && !isClassicalNahuatlSyllableVowel(sound)
          && isClassicalNahuatlSyllableVowel(sounds[index - 1])
          && isClassicalNahuatlSyllableVowel(sounds[index + 1]))
          ? ["cn-l2-26-intervocalic-consonant-onset"] : []),
        ...(sounds.some((sound, index) =>
          isClassicalNahuatlSyllableVowel(sound)
          && isClassicalNahuatlSyllableVowel(sounds[index + 1]))
          ? ["cn-l2-26-vowel-sequence-separated"] : []),
        ...(normalized.includes("u") && !hasStandaloneU
          ? ["cn-l2-26-u-is-digraph-only"] : []),
        ...(syllables.some(syllable => syllable.coda.length)
          && syllables.slice(1).some(syllable => syllable.onset.length)
          ? ["cn-l2-26-two-consonant-cluster-split"] : []),
        ...(/(?:ch|cu|hu|qu|tz|tl|uc|uh)/u.test(normalized)
          ? ["cn-l2-26-digraphs-single-consonant"] : []),
      ];
      const authorized = normalized.length > 0
        && violations.length === 0
        && !hasStandaloneU
        && syllableCountMatchesVowelCount
        && (!requestedRuleId || Boolean(selectedRule));
      return {
        kind: "classical-nahuatl-transcription-syllable-structure-frame",
        version: CLASSICAL_NAHUATL_LESSON2_FRAME_VERSION,
        lesson: "Andrews Lesson 2",
        section: "2.6",
        operationId: "cn-l2-syllable-structure",
        selectedRuleId: selectedRule?.id || "",
        selectedRule: selectedRule ? { ...selectedRule } : null,
        evaluatedRuleIds,
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_TRANSCRIPTION_SOURCE_DOCUMENT,
        transcriptionLineStart: 1713,
        transcriptionLineEnd: 1758,
        exactWitness: "2.6. Syllable Structure. A vocable in Nahuatl has as many syllables as it has vowels",
        input: String(value == null ? "" : value),
        normalized,
        sounds,
        vowelCount,
        syllableCount: syllables.length,
        syllables,
        syllableDisplays: syllables.map(syllable => syllable.display),
        division: syllables.map(syllable => syllable.display).join("-"),
        violations,
        authorizationStatus: authorized ? "authorized" : "blocked",
        proofStatus: authorized ? "proven" : "blocked",
        blockReason: authorized
          ? ""
          : requestedRuleId && !selectedRule
            ? "no-lesson2-syllable-structure-rule"
            : violations[0] || (hasStandaloneU ? "u-used-as-vowel" : "syllable-count-mismatch"),
        morphologyBoundaryIgnored: options.morphologyBoundaryIgnored !== false,
        premises: [{
          layer: "vowel-count",
          rule: "A vocable has as many syllables as it has vowels; there are no diphthongs.",
          passed: syllableCountMatchesVowelCount,
          vowelCount,
          syllableCount: syllables.length
        }, {
          layer: "syllable-shapes",
          rule: "Only V, CV, VC, and CVC syllable shapes are permitted.",
          passed: syllables.every(syllable => ["V", "CV", "VC", "CVC"].includes(syllable.shape)),
          shapes: syllables.map(syllable => syllable.shape)
        }, {
          layer: "u-digraph-only",
          rule: "In Lesson 2, u is not a vowel letter and appears only as part of a digraph.",
          passed: !hasStandaloneU
        }, {
          layer: "consonant-clusters",
          rule: "At most two consonant sounds may be juxtaposed, and medial pairs split across syllables.",
          passed: !violations.some(violation => ["initial-consonant-cluster", "too-many-medial-consonants", "final-consonant-cluster"].includes(violation))
        }, {
          layer: "phonology-not-morphology",
          rule: "Syllable division is phonological and must not be confused with morpheme or morph analysis.",
          passed: options.morphologyBoundaryIgnored !== false,
          morphologyBoundaryIgnored: options.morphologyBoundaryIgnored !== false
        }],
        conclusion: {
          authorized,
          division: authorized ? syllables.map(syllable => syllable.display).join("-") : "",
          syllableDisplays: authorized ? syllables.map(syllable => syllable.display) : []
        }
      };
    }
    function buildClassicalNahuatlSupportiveVowelMechanicsFrame(options = {}) {
      const sourceSegments = Array.isArray(options.sourceSegments)
        ? options.sourceSegments.map(value => String(value || "").trim()).filter(Boolean)
        : [];
      const insertionPosition = normalizeClassicalNahuatlOrthographyInput(
        options.insertionPosition || "between",
      );
      const supportiveIndex = Number.isInteger(options.supportiveIndex)
        ? options.supportiveIndex
        : insertionPosition === "before" ? 0 : insertionPosition === "after"
          ? sourceSegments.length - 1 : 1;
      const tokenLevelLegal = options.tokenLevelLegal === true;
      const supportiveVowelNeeded = options.supportiveVowelNeeded !== false;
      const inferredRuleId = supportiveVowelNeeded === false
        ? "cn-l2-263-supportive-i-drop-when-unneeded"
        : "cn-l2-263-supportive-i-illegal-sequence";
      const selectedRule = CLASSICAL_NAHUATL_LESSON2_SUPPORTIVE_VOWEL_RULES
        .find(rule => rule.id === inferredRuleId) || null;
      let outputSegments = sourceSegments.slice();
      if (selectedRule?.action === "insert") {
        const insertAt = insertionPosition === "before"
          ? 0
          : insertionPosition === "after"
            ? sourceSegments.length
            : Math.min(Math.max(1, supportiveIndex), sourceSegments.length);
        outputSegments.splice(insertAt, 0, "i");
      } else if (selectedRule?.action === "drop") {
        if (outputSegments[supportiveIndex] === "i") outputSegments.splice(supportiveIndex, 1);
      }
      const insertLicensed = selectedRule?.action !== "insert" || (
        sourceSegments.length >= 2
        && tokenLevelLegal === false
        && selectedRule.licensedPositions.includes(insertionPosition)
      );
      const dropLicensed = selectedRule?.action !== "drop" || (
        sourceSegments[supportiveIndex] === "i"
        && supportiveVowelNeeded === false
        && (insertionPosition === "before" || insertionPosition === "after")
      );
      const authorized = Boolean(selectedRule)
        && insertLicensed
        && dropLicensed
        && outputSegments.join("") !== sourceSegments.join("");
      return {
        kind: "classical-nahuatl-transcription-supportive-vowel-frame",
        version: CLASSICAL_NAHUATL_LESSON2_FRAME_VERSION,
        operationId: "cn-l2-supportive-vowel-realization",
        selectedRuleId: selectedRule?.id || "",
        selectedRule: selectedRule ? { ...selectedRule } : null,
        sourceSegments,
        insertionPosition,
        supportiveIndex,
        tokenLevelLegal,
        supportiveVowelNeeded,
        outputSegments: authorized ? outputSegments : [],
        outputForm: authorized ? outputSegments.join("") : "",
        authorizationStatus: authorized ? "authorized" : "blocked",
        proofStatus: authorized ? "proven" : "blocked",
        blockReason: authorized
          ? ""
          : !selectedRule
            ? "supportive-vowel-rule-required"
            : selectedRule.action === "insert" && !insertLicensed
              ? "illegal-token-level-consonant-sequence-required"
              : selectedRule.action === "drop" && !dropLicensed
                ? "unneeded-supportive-vowel-at-edge-required"
                : "supportive-vowel-change-required",
        conclusion: {
          authorized,
          action: selectedRule?.action || "",
          outputForm: authorized ? outputSegments.join("") : "",
        },
      };
    }
    function buildClassicalNahuatlStressMechanicsFrame(value, options = {}) {
      const requestedRuleId = normalizeClassicalNahuatlOrthographyInput(options.ruleId);
      const selectedRule = requestedRuleId
        ? CLASSICAL_NAHUATL_LESSON2_STRESS_RULES.find(rule => rule.id === requestedRuleId) || null
        : null;
      const input = String(value == null ? "" : value);
      const normalized = normalizeClassicalNahuatlOrthographyInput(input);
      const syllableInput = normalizeClassicalNahuatlStressSyllableInput(input);
      const syllableFrame = buildClassicalNahuatlSyllableStructureMechanicsFrame(syllableInput);
      const syllableDisplays = syllableFrame.syllableDisplays.slice();
      const hasVocativeAccent = /é$/u.test(normalized);
      const vocativeParticle = options.vocativeParticle === true || hasVocativeAccent;
      const stressGroup = options.stressGroup === true || /\s/u.test(normalized);
      const stressIndex = syllableDisplays.length ? vocativeParticle ? syllableDisplays.length - 1 : Math.max(0, syllableDisplays.length - 2) : -1;
      const evaluatedRuleIds = [
        ...(vocativeParticle
          ? ["cn-l2-27-vocative-particle-exception"]
          : ["cn-l2-27-penultimate-vocable-stress"]),
        ...(options.finalShortVowelContrast === true
          ? ["cn-l2-27-final-short-vowel-contrast"] : []),
        ...(stressGroup ? ["cn-l2-27-stress-group-connected-speech"] : []),
      ];
      const authorized = syllableFrame.authorizationStatus === "authorized"
        && stressIndex >= 0
        && (!requestedRuleId || Boolean(selectedRule));
      return {
        kind: "classical-nahuatl-transcription-stress-frame",
        version: CLASSICAL_NAHUATL_LESSON2_FRAME_VERSION,
        lesson: "Andrews Lesson 2",
        section: "2.7",
        operationId: "cn-l2-vocable-stress",
        selectedRuleId: selectedRule?.id || "",
        selectedRule: selectedRule ? { ...selectedRule } : null,
        evaluatedRuleIds,
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_TRANSCRIPTION_SOURCE_DOCUMENT,
        transcriptionLineStart: 1759,
        transcriptionLineEnd: 1790,
        exactWitness: "Stress in Nahuatl vocables falls on the penultimate (next-to-the-last) syllable.",
        input,
        normalized,
        syllableInput,
        syllableFrame,
        syllableDisplays,
        division: syllableDisplays.join("-"),
        stressIndex,
        stressedSyllable: stressIndex >= 0 ? syllableDisplays[stressIndex] : "",
        stressRule: vocativeParticle ? "vocative-final-stress" : "penultimate",
        vocativeParticle,
        stressGroup,
        stressGroupDivision: stressGroup ? syllableDisplays.join("-") : "",
        authorizationStatus: authorized ? "authorized" : "blocked",
        proofStatus: authorized ? "proven" : "blocked",
        blockReason: authorized
          ? ""
          : requestedRuleId && !selectedRule
            ? "no-lesson2-stress-rule"
            : syllableFrame.blockReason || "missing-stressable-syllable",
        premises: [{
          layer: "syllable-structure",
          rule: "Stress is assigned after Lesson 2.6 syllable division.",
          passed: syllableFrame.authorizationStatus === "authorized",
          syllableCount: syllableDisplays.length
        }, {
          layer: "penultimate-stress",
          rule: "Ordinary Nahuatl vocables stress the penultimate syllable.",
          passed: vocativeParticle || stressIndex === Math.max(0, syllableDisplays.length - 2),
          stressIndex
        }, {
          layer: "vocative-exception",
          rule: "The vocative particle #é is stressed as an exception.",
          passed: vocativeParticle ? stressIndex === syllableDisplays.length - 1 : true,
          vocativeParticle
        }, {
          layer: "stress-group",
          rule: "In connected speech, syllable division can operate across vocable boundaries within a stress group.",
          passed: stressGroup ? syllableFrame.authorizationStatus === "authorized" : true,
          stressGroup,
          stressGroupDivision: stressGroup ? syllableDisplays.join("-") : ""
        }],
        conclusion: {
          authorized,
          stressedSyllable: authorized ? syllableDisplays[stressIndex] || "" : "",
          stressIndex: authorized ? stressIndex : -1,
          stressRule: authorized ? vocativeParticle ? "vocative-final-stress" : "penultimate" : "",
          division: authorized ? syllableDisplays.join("-") : ""
        }
      };
    }
    function normalizeClassicalNahuatlConsonantSound(value) {
      const raw = normalizeClassicalNahuatlOrthographyInput(value).replace(/[\/\[\]]/gu, "");
      if (raw === "č" || raw === "ch") {
        return "ch";
      }
      if (raw === "¢" || raw === "tz") {
        return "tz";
      }
      const normalized = raw.normalize("NFD").replace(/\u0325/gu, "").replace(/\u030c/gu, "");
      if (normalized === "kʷ" || normalized === "kw" || normalized === "cu") {
        return "cu";
      }
      if (["c", "h", "l", "m", "n", "p", "qu", "t", "x", "y", "z"].includes(normalized)) {
        return normalized;
      }
      return "";
    }
    function getClassicalNahuatlLongConsonantSpelling(sound) {
      if (!sound) {
        return "";
      }
      return `${sound}${sound}`;
    }
    function buildClassicalNahuatlConsonantalLengthMechanicsFrame(options = {}) {
      const requestedRuleId = normalizeClassicalNahuatlOrthographyInput(options.ruleId);
      const selectedRule = requestedRuleId
        ? CLASSICAL_NAHUATL_LESSON2_CONSONANTAL_LENGTH_RULES.find(rule => rule.id === requestedRuleId) || null
        : null;
      const leftConsonant = normalizeClassicalNahuatlConsonantSound(options.leftConsonant || options.firstConsonant || options.consonant);
      const rightConsonant = normalizeClassicalNahuatlConsonantSound(options.rightConsonant || options.secondConsonant || options.consonant);
      const boundaryType = normalizeClassicalNahuatlOrthographyInput(options.boundaryType || "within-vocable");
      const grammaticalConstruction = options.grammaticalConstruction !== false;
      const identicalConsonants = Boolean(leftConsonant) && leftConsonant === rightConsonant;
      const withinVocable = boundaryType === "within-vocable" || boundaryType === "vocable-internal";
      const releaseFeatureLost = ["tz", "ch"].includes(leftConsonant) && identicalConsonants;
      const releasePronunciation = releaseFeatureLost ? leftConsonant === "tz" ? "[t¢]" : "[tč]" : "";
      const evaluatedRuleIds = [
        "cn-l2-28-identical-consonants-create-long-consonant",
        "cn-l2-28-single-bridging-pronunciation",
        ...(releaseFeatureLost ? ["cn-l2-28-affricate-release-feature-loss"] : []),
        ...(withinVocable ? ["cn-l2-28-within-vocable-double-spelling"] : []),
        "cn-l2-28-traditional-text-spelling-warning",
      ];
      const authorized = grammaticalConstruction
        && identicalConsonants
        && (!requestedRuleId || Boolean(selectedRule));
      const outputSpelling = authorized && withinVocable ? getClassicalNahuatlLongConsonantSpelling(leftConsonant) : "";
      return {
        kind: "classical-nahuatl-transcription-consonantal-length-frame",
        version: CLASSICAL_NAHUATL_LESSON2_FRAME_VERSION,
        lesson: "Andrews Lesson 2",
        section: "2.8",
        operationId: "cn-l2-consonantal-length",
        selectedRuleId: selectedRule?.id || "",
        selectedRule: selectedRule ? { ...selectedRule } : null,
        evaluatedRuleIds,
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_TRANSCRIPTION_SOURCE_DOCUMENT,
        transcriptionLineStart: 1791,
        transcriptionLineEnd: 1815,
        exactWitness: "When two identical consonants come together as a result of grammatical\nconstruction, they create a long consonant.",
        leftConsonant,
        rightConsonant,
        boundaryType,
        grammaticalConstruction,
        identicalConsonants,
        longConsonant: authorized,
        outputSpelling,
        pronunciationMode: authorized ? "single-bridging-pronunciation" : "",
        releaseFeatureLost,
        releasePronunciation,
        traditionalTextSpellingWarning: authorized,
        authorizationStatus: authorized ? "authorized" : "blocked",
        proofStatus: authorized ? "proven" : "blocked",
        blockReason: authorized
          ? ""
          : requestedRuleId && !selectedRule
            ? "no-lesson2-consonantal-length-rule"
            : !grammaticalConstruction ? "not-grammatical-construction" : "consonants-not-identical",
        premises: [{
          layer: "grammatical-construction",
          rule: "The consonants come together as a result of grammatical construction.",
          passed: grammaticalConstruction
        }, {
          layer: "identical-consonants",
          rule: "Two identical consonants create a long consonant.",
          passed: identicalConsonants,
          leftConsonant,
          rightConsonant
        }, {
          layer: "single-pronunciation",
          rule: "The long consonant has a single bridging pronunciation, not two separate consonant pronunciations.",
          passed: authorized,
          pronunciationMode: authorized ? "single-bridging-pronunciation" : ""
        }, {
          layer: "within-vocable-spelling",
          rule: "A long consonant within a vocable is usually spelled with a double letter or double digraph.",
          passed: authorized ? withinVocable ? Boolean(outputSpelling) : true : false,
          outputSpelling
        }, {
          layer: "affricate-release",
          rule: "For tz/tz and ch/ch, the release feature of the first consonant is lost.",
          passed: releaseFeatureLost ? Boolean(releasePronunciation) : true,
          releaseFeatureLost,
          releasePronunciation
        }],
        conclusion: {
          authorized,
          longConsonant: authorized,
          outputSpelling,
          pronunciationMode: authorized ? "single-bridging-pronunciation" : "",
          releaseFeatureLost,
          releasePronunciation
        }
      };
    }
    function normalizeClassicalNahuatlAssimilationSound(value) {
      const raw = normalizeClassicalNahuatlOrthographyInput(value).replace(/[\/\[\]]/gu, "");
      if (raw === "λ" || raw === "tl") {
        return "tl";
      }
      if (raw === "š" || raw === "x") {
        return "x";
      }
      if (raw === "¢" || raw === "tz") {
        return "tz";
      }
      if (raw === "č" || raw === "ch") {
        return "ch";
      }
      if (raw === "kʷ" || raw === "kw" || raw === "cu" || raw === "uc") {
        return "kw";
      }
      if (raw === "w" || raw === "hu" || raw === "uh") {
        return "w";
      }
      if (raw === "ʔ" || raw === "glottal") {
        return "glottal";
      }
      const normalized = raw.normalize("NFD").replace(/\u0325/gu, "").replace(/\u030c/gu, "");
      if (normalized === "s" || normalized === "z") {
        return "s";
      }
      if (normalized === "c") {
        return "s";
      }
      if (normalized === "qu") {
        return "k";
      }
      if (["h", "k", "l", "m", "n", "p", "t", "y"].includes(normalized)) {
        return normalized;
      }
      return "";
    }
    function isClassicalNahuatlNasal(sound) {
      return sound === "m" || sound === "n";
    }
    function isClassicalNahuatlSibilant(sound) {
      return ["s", "x", "tz", "ch"].includes(sound);
    }
    function isClassicalNahuatlBilabial(sound) {
      return sound === "m" || sound === "p";
    }
    function getClassicalNahuatlLongAssimilationOutcome(sound) {
      const outcomeMap = {
        l: {
          outputSound: "ll",
          outputSpelling: "ll"
        },
        s: {
          outputSound: "ss",
          outputSpelling: "zz"
        },
        x: {
          outputSound: "šš",
          outputSpelling: "xx"
        },
        tz: {
          outputSound: "¢¢",
          outputSpelling: "tztz",
          releasePronunciation: "[t¢]"
        },
        ch: {
          outputSound: "čč",
          outputSpelling: "chch",
          releasePronunciation: "[tč]"
        },
        m: {
          outputSound: "mm",
          outputSpelling: "mm"
        },
        n: {
          outputSound: "nn",
          outputSpelling: "nn"
        },
        p: {
          outputSound: "pp",
          outputSpelling: "pp"
        }
      };
      return outcomeMap[sound] || {
        outputSound: "",
        outputSpelling: ""
      };
    }
    function getClassicalNahuatlPartialAssimilationOutcome(leftConsonant, rightConsonant) {
      if (leftConsonant === "m") {
        const outcomeMap = {
          t: {
            outputSound: "nt",
            outputSpelling: "nt"
          },
          tl: {
            outputSound: "nλ",
            outputSpelling: "ntl"
          },
          tz: {
            outputSound: "n¢",
            outputSpelling: "ntz"
          },
          ch: {
            outputSound: "nč",
            outputSpelling: "nch"
          },
          k: {
            outputSound: "ŋk",
            outputSpelling: "nc"
          },
          kw: {
            outputSound: "ŋkʷ",
            outputSpelling: "ncu"
          }
        };
        return outcomeMap[rightConsonant] || {
          outputSound: "",
          outputSpelling: ""
        };
      }
      if (leftConsonant === "n" && rightConsonant === "p") {
        return {
          outputSound: "mp",
          outputSpelling: "mp"
        };
      }
      return {
        outputSound: "",
        outputSpelling: ""
      };
    }
    function getClassicalNahuatlAssimilationRuleOutcome(rule, leftConsonant, rightConsonant) {
      if (!rule) {
        return {
          outputSound: "",
          outputSpelling: "",
          releasePronunciation: ""
        };
      }
      if (rule.outputSound || rule.outputSpelling) {
        return {
          outputSound: rule.outputSound || "",
          outputSpelling: rule.outputSpelling || "",
          releasePronunciation: rule.releasePronunciation || ""
        };
      }
      if (rule.assimilationType === "partial") {
        return {
          ...getClassicalNahuatlPartialAssimilationOutcome(leftConsonant, rightConsonant),
          releasePronunciation: ""
        };
      }
      if (rule.dominantSide === "right") {
        return getClassicalNahuatlLongAssimilationOutcome(rightConsonant);
      }
      if (rule.dominantSide === "left") {
        return getClassicalNahuatlLongAssimilationOutcome(leftConsonant);
      }
      return {
        outputSound: "",
        outputSpelling: "",
        releasePronunciation: ""
      };
    }
    function findClassicalNahuatlLesson2AssimilationRule(options = {}) {
      const requestedRuleId = normalizeClassicalNahuatlOrthographyInput(options.ruleId);
      if (requestedRuleId) {
        return CLASSICAL_NAHUATL_LESSON2_ASSIMILATION_RULES.find(rule => rule.id === requestedRuleId) || null;
      }
      const leftConsonant = normalizeClassicalNahuatlAssimilationSound(options.leftConsonant || options.firstConsonant || options.left || options.first);
      const rightConsonant = normalizeClassicalNahuatlAssimilationSound(options.rightConsonant || options.secondConsonant || options.right || options.second);
      const exactRule = CLASSICAL_NAHUATL_LESSON2_ASSIMILATION_RULES.find(rule => rule.matchKind === "exact" && rule.sourceLeft === leftConsonant && rule.sourceRight === rightConsonant);
      if (exactRule) {
        return exactRule;
      }
      const dissimilationRule = CLASSICAL_NAHUATL_LESSON2_ASSIMILATION_RULES.find(rule => rule.matchKind === "dissimilation" && rule.sourceLeft === leftConsonant && rule.sourceRight === rightConsonant);
      if (dissimilationRule) {
        return dissimilationRule;
      }
      if (isClassicalNahuatlNasal(leftConsonant) && isClassicalNahuatlSibilant(rightConsonant)) {
        return CLASSICAL_NAHUATL_LESSON2_ASSIMILATION_RULES.find(rule => rule.id === "cn-l2-211-regressive-nasal-sibilant") || null;
      }
      if (isClassicalNahuatlSibilant(leftConsonant) && isClassicalNahuatlSibilant(rightConsonant) && leftConsonant !== rightConsonant) {
        return CLASSICAL_NAHUATL_LESSON2_ASSIMILATION_RULES.find(rule => rule.id === "cn-l2-211-regressive-sibilant-group") || null;
      }
      if (leftConsonant === "w" && isClassicalNahuatlBilabial(rightConsonant)) {
        return CLASSICAL_NAHUATL_LESSON2_ASSIMILATION_RULES.find(rule => rule.id === "cn-l2-211-regressive-w-bilabial") || null;
      }
      if (leftConsonant === "m" && ["t", "tl", "tz", "ch", "k", "kw"].includes(rightConsonant)) {
        return CLASSICAL_NAHUATL_LESSON2_ASSIMILATION_RULES.find(rule => rule.id === "cn-l2-211-regressive-m-partial") || null;
      }
      return null;
    }
    function buildClassicalNahuatlAssimilationMechanicsFrame(options = {}) {
      const leftConsonant = normalizeClassicalNahuatlAssimilationSound(options.leftConsonant || options.firstConsonant || options.left || options.first);
      const rightConsonant = normalizeClassicalNahuatlAssimilationSound(options.rightConsonant || options.secondConsonant || options.right || options.second);
      const grammaticalConstruction = options.grammaticalConstruction !== false;
      const requestedSpelling = normalizeClassicalNahuatlOrthographyInput(options.requestedSpelling);
      const selectedRule = findClassicalNahuatlLesson2AssimilationRule({
        ...options,
        leftConsonant,
        rightConsonant
      });
      const processKind = selectedRule?.processKind || "assimilation";
      const unlikeConsonants = Boolean(leftConsonant && rightConsonant && leftConsonant !== rightConsonant);
      const dissimilation = processKind === "dissimilation";
      const outcome = getClassicalNahuatlAssimilationRuleOutcome(selectedRule, leftConsonant, rightConsonant);
      const requestedSpellingMatches = !requestedSpelling || !outcome.outputSpelling || requestedSpelling === outcome.outputSpelling;
      const authorized = grammaticalConstruction && Boolean(selectedRule) && (unlikeConsonants || dissimilation) && requestedSpellingMatches && Boolean(outcome.outputSound || outcome.outputSpelling);
      const releaseFeatureLost = outcome.outputSpelling === "tztz" || outcome.outputSpelling === "chch";
      let blockReason = "";
      if (!authorized) {
        if (!grammaticalConstruction) {
          blockReason = "not-grammatical-construction";
        } else if (!leftConsonant || !rightConsonant) {
          blockReason = "missing-consonant";
        } else if (!unlikeConsonants && !dissimilation) {
          blockReason = "consonants-not-unlike";
        } else if (!selectedRule) {
          blockReason = "no-lesson2-assimilation-rule";
        } else if (!requestedSpellingMatches) {
          blockReason = "requested-spelling-conflicts-with-assimilation-rule";
        } else {
          blockReason = "missing-assimilation-outcome";
        }
      }
      return {
        kind: "classical-nahuatl-transcription-assimilation-frame",
        version: CLASSICAL_NAHUATL_LESSON2_FRAME_VERSION,
        lesson: "Andrews Lesson 2",
        section: selectedRule?.section || "2.9-2.11",
        operationId: "cn-l2-assimilation",
        processKind,
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_TRANSCRIPTION_SOURCE_DOCUMENT,
        transcriptionLineStart: selectedRule?.transcriptionLineStart || 1816,
        transcriptionLineEnd: selectedRule?.transcriptionLineEnd || 1896,
        exactWitness: selectedRule?.exactWitness || "2.9. Assimilation.",
        leftConsonant,
        rightConsonant,
        grammaticalConstruction,
        unlikeConsonants,
        direction: selectedRule?.direction || "",
        dominantSide: selectedRule?.dominantSide || "",
        assimilationType: selectedRule?.assimilationType || "",
        selectedRuleId: selectedRule?.id || "",
        selectedRule: copyClassicalNahuatlLesson2AssimilationRule(selectedRule),
        outputSound: authorized ? outcome.outputSound : "",
        outputSpelling: authorized ? outcome.outputSpelling : "",
        requestedSpelling,
        releaseFeatureLost: authorized ? releaseFeatureLost : false,
        releasePronunciation: authorized ? outcome.releasePronunciation || "" : "",
        lowFrequency: selectedRule?.lowFrequency === true,
        optional: selectedRule?.optional === true,
        traditionalSpellingMayHidePronunciation: ["cn-l2-211-regressive-nasal-sibilant", "cn-l2-211-regressive-sibilant-group"].includes(selectedRule?.id || ""),
        authorizationStatus: authorized ? "authorized" : "blocked",
        proofStatus: authorized ? "proven" : "blocked",
        blockReason,
        premises: [{
          layer: "grammatical-construction",
          rule: "Assimilation applies when consonants meet as a result of grammatical construction.",
          passed: grammaticalConstruction
        }, {
          layer: "unlike-consonants",
          rule: "Lesson 2.9 assimilation concerns unlike consonants; the dissimilation note is separately marked.",
          passed: unlikeConsonants || dissimilation,
          leftConsonant,
          rightConsonant,
          processKind
        }, {
          layer: "rule-selection",
          rule: "The consonant pair must match an Andrews 2.10 or 2.11 rule.",
          passed: Boolean(selectedRule),
          selectedRuleId: selectedRule?.id || ""
        }, {
          layer: "direction",
          rule: "The proof records whether the dominant sound is progressive or regressive.",
          passed: Boolean(selectedRule?.direction) || dissimilation,
          direction: selectedRule?.direction || "",
          dominantSide: selectedRule?.dominantSide || ""
        }, {
          layer: "outcome",
          rule: "The selected rule must yield a long consonant, partial assimilation, or marked dissimilation output.",
          passed: Boolean(outcome.outputSound || outcome.outputSpelling),
          assimilationType: selectedRule?.assimilationType || "",
          outputSound: outcome.outputSound,
          outputSpelling: outcome.outputSpelling
        }, {
          layer: "requested-spelling",
          rule: "A requested spelling must match the Andrews assimilation outcome.",
          passed: requestedSpellingMatches,
          requestedSpelling,
          expectedSpelling: outcome.outputSpelling
        }],
        conclusion: {
          authorized,
          processKind: authorized ? processKind : "",
          selectedRuleId: authorized ? selectedRule?.id || "" : "",
          outputSound: authorized ? outcome.outputSound : "",
          outputSpelling: authorized ? outcome.outputSpelling : "",
          releasePronunciation: authorized ? outcome.releasePronunciation || "" : "",
          lowFrequency: selectedRule?.lowFrequency === true,
          optional: selectedRule?.optional === true
        }
      };
    }
    function getClassicalNahuatlBoundaryConsonant(part = "", side = "left") {
      const normalized = normalizeClassicalNahuatlOrthographyInput(part);
      const candidates = ["tl", "tz", "ch", "l", "s", "z", "x", "y"];
      return candidates.find(candidate => side === "right" ? normalized.startsWith(candidate) : normalized.endsWith(candidate)) || "";
    }
    function splitClassicalNahuatlLesson210AssimilationSpelling(outputSpelling = "") {
      const spelling = normalizeClassicalNahuatlOrthographyInput(outputSpelling);
      const pairs = {
        ll: ["l", "l"],
        zz: ["z", "z"],
        xx: ["x", "x"],
        tztz: ["tz", "tz"],
        chch: ["ch", "ch"]
      };
      return pairs[spelling] || ["", ""];
    }
    function buildClassicalNahuatlProgressiveAssimilationMechanicsFrame(stem = "", options = {}) {
      const requestedRuleId = normalizeClassicalNahuatlOrthographyInput(options.ruleId);
      const sourceStem = normalizeClassicalNahuatlOrthographyInput(stem).replace(/^\((.*)\)$/u, "$1").replace(/^-|-$/gu, "");
      const sourceMorphs = sourceStem ? sourceStem.split("-").filter(Boolean) : [];
      const realizedMorphs = sourceMorphs.slice();
      const boundaryActions = [];
      const prohibitedLlBoundaryIndexes = [];
      for (let index = 0; index < realizedMorphs.length - 1; index += 1) {
        const leftMorph = realizedMorphs[index];
        const rightMorph = realizedMorphs[index + 1];
        const leftSpelling = getClassicalNahuatlBoundaryConsonant(leftMorph, "left");
        const rightSpelling = getClassicalNahuatlBoundaryConsonant(rightMorph, "right");
        if (leftSpelling === "l" && rightSpelling === "l") {
          prohibitedLlBoundaryIndexes.push(index);
          continue;
        }
        const assimilationFrame = buildClassicalNahuatlAssimilationMechanicsFrame({
          leftConsonant: leftSpelling,
          rightConsonant: rightSpelling,
          grammaticalConstruction: true
        });
        const lesson210Rule = assimilationFrame.authorizationStatus === "authorized" && assimilationFrame.section === "2.10";
        if (!lesson210Rule) {
          continue;
        }
        const [leftOutput, rightOutput] = splitClassicalNahuatlLesson210AssimilationSpelling(assimilationFrame.outputSpelling);
        if (!leftOutput || !rightOutput) {
          continue;
        }
        realizedMorphs[index] = leftMorph.slice(0, -leftSpelling.length) + leftOutput;
        realizedMorphs[index + 1] = rightOutput + rightMorph.slice(rightSpelling.length);
        boundaryActions.push({
          kind: "classical-nahuatl-transcription-progressive-assimilation-action",
          ruleAction: "realize-progressive-assimilation-at-morph-boundary",
          boundaryIndex: index,
          sourceLeftMorph: leftMorph,
          sourceRightMorph: rightMorph,
          sourceLeftConsonant: assimilationFrame.leftConsonant,
          sourceRightConsonant: assimilationFrame.rightConsonant,
          selectedRuleId: assimilationFrame.selectedRuleId,
          outputSound: assimilationFrame.outputSound,
          outputSpelling: assimilationFrame.outputSpelling,
          realizedLeftMorph: realizedMorphs[index],
          realizedRightMorph: realizedMorphs[index + 1],
          transcriptionLineStart: assimilationFrame.transcriptionLineStart,
          transcriptionLineEnd: assimilationFrame.transcriptionLineEnd,
          exactWitness: assimilationFrame.exactWitness
        });
      }
      const realizedAnalyzedStem = realizedMorphs.join("-");
      const realizedSolidStem = realizedMorphs.join("");
      const requestedRealizedStem = normalizeClassicalNahuatlOrthographyInput(options.requestedRealizedStem || options.requestedStem || "");
      const requestedMatches = !requestedRealizedStem || requestedRealizedStem === realizedAnalyzedStem || requestedRealizedStem === realizedSolidStem;
      const requestedRuleApplied = !requestedRuleId
        || boundaryActions.some(action => action.selectedRuleId === requestedRuleId);
      const authorized = Boolean(sourceStem)
        && requestedMatches
        && prohibitedLlBoundaryIndexes.length === 0
        && requestedRuleApplied;
      return {
        kind: "classical-nahuatl-transcription-progressive-assimilation-frame",
        version: CLASSICAL_NAHUATL_LESSON2_FRAME_VERSION,
        lesson: "Andrews Lesson 2",
        section: "2.10",
        operationId: "cn-l2-210-progressive-assimilation-boundary-realization",
        selectedRuleId: requestedRuleId || boundaryActions[0]?.selectedRuleId || "",
        ruleLogicRole: "morph-boundary-surface-realization",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_TRANSCRIPTION_SOURCE_DOCUMENT,
        transcriptionLineStart: 1823,
        transcriptionLineEnd: 1841,
        exactWitness: "The following rules deal with the most frequent cases of progressive assimilation (the first consonant dominates the second)",
        generalRule: "At a grammatical morph boundary, apply only an Andrews 2.10 consonant pair; the first consonant determines the long output.",
        ruleVariables: {
          leftMorph: "morph before the boundary",
          rightMorph: "morph after the boundary",
          leftConsonant: "last consonant of the left morph",
          rightConsonant: "first consonant of the right morph"
        },
        ruleInputs: {
          sourceStem,
          sourceMorphs,
          boundaryCount: Math.max(0, sourceMorphs.length - 1)
        },
        ruleOutputs: {
          realizedAnalyzedStem,
          realizedSolidStem
        },
        sourceStem,
        sourceMorphs,
        realizedMorphs,
        realizedAnalyzedStem,
        realizedSolidStem,
        boundaryActions,
        appliedRuleIds: boundaryActions.map(action => action.selectedRuleId),
        evaluatedRuleIds: [
          "cn-l2-29-progressive-vs-regressive",
          ...boundaryActions.map(action => action.selectedRuleId),
          ...(prohibitedLlBoundaryIndexes.length === 0
            ? ["cn-l2-210-ll-only-listed"] : []),
        ],
        transformationApplied: boundaryActions.length > 0,
        prohibitedLlBoundaryIndexes,
        llRestrictedToLesson210Rules: true,
        witnessesAreProofAnchorsNotWhitelist: true,
        requestedRealizedStem,
        requestedMatches,
        authorizationStatus: authorized ? "authorized" : "blocked",
        proofStatus: authorized ? "proven" : "blocked",
        blockReason: authorized
          ? ""
          : !sourceStem
            ? "missing-stem"
            : prohibitedLlBoundaryIndexes.length
              ? "ll-not-authorized-outside-lesson2-10-rules-1-2"
              : !requestedRuleApplied
                ? "requested-progressive-assimilation-rule-not-executed"
                : "requested-realization-conflicts-with-lesson2-10",
        ruleRefs: boundaryActions.map(action => ({
          id: action.selectedRuleId,
          tagId: action.selectedRuleId,
          section: "2.10",
          lineStart: action.transcriptionLineStart,
          lineEnd: action.transcriptionLineEnd,
          exactWitness: action.exactWitness
        }))
      };
    }
    function normalizeClassicalNahuatlLongVowelForLoss(value) {
      const normalized = normalizeClassicalNahuatlOrthographyInput(value);
      if (["a:", "ā", "a"].includes(normalized)) {
        return "a";
      }
      if (["o:", "ō", "o"].includes(normalized)) {
        return "o";
      }
      return "";
    }
    function findClassicalNahuatlLesson2ConsonantLossRule(options = {}) {
      const requestedRuleId = normalizeClassicalNahuatlOrthographyInput(options.ruleId);
      if (requestedRuleId) {
        return CLASSICAL_NAHUATL_LESSON2_CONSONANT_LOSS_RULES.find(rule => rule.id === requestedRuleId) || null;
      }
      const leftConsonant = normalizeClassicalNahuatlAssimilationSound(options.leftConsonant || options.firstConsonant || options.left || options.first || options.consonant);
      const rightConsonant = normalizeClassicalNahuatlAssimilationSound(options.rightConsonant || options.secondConsonant || options.right || options.second);
      const position = normalizeClassicalNahuatlOrthographyInput(options.position || options.stemPosition);
      const environment = normalizeClassicalNahuatlOrthographyInput(options.environment);
      if (leftConsonant === "glottal" && rightConsonant === "y") {
        if (options.firstConsonantLost === true || options.outputSound === "y" || normalizeClassicalNahuatlOrthographyInput(options.requestedSpelling) === "y") {
          return CLASSICAL_NAHUATL_LESSON2_CONSONANT_LOSS_RULES.find(rule => rule.id === "cn-l2-212-glottal-y-y") || null;
        }
        return CLASSICAL_NAHUATL_LESSON2_CONSONANT_LOSS_RULES.find(rule => rule.id === "cn-l2-212-glottal-y-h") || null;
      }
      if (leftConsonant === "y" && (position === "stem-initial" || position === "initial")) {
        return CLASSICAL_NAHUATL_LESSON2_CONSONANT_LOSS_RULES.find(rule => rule.id === "cn-l2-212-initial-y-unstable-note") || null;
      }
      const leftVowel = normalizeClassicalNahuatlLongVowelForLoss(options.leftVowel || options.precedingVowel);
      const rightVowel = normalizeClassicalNahuatlLongVowelForLoss(options.rightVowel || options.followingVowel);
      if (leftConsonant === "y" && (environment === "between-long-a-o-vowels" || ["a", "o"].includes(leftVowel) && ["a", "o"].includes(rightVowel) && leftVowel !== rightVowel)) {
        return CLASSICAL_NAHUATL_LESSON2_CONSONANT_LOSS_RULES.find(rule => rule.id === "cn-l2-212-y-between-long-a-o-vowels") || null;
      }
      if (isClassicalNahuatlNasal(leftConsonant) && rightConsonant === "y") {
        return CLASSICAL_NAHUATL_LESSON2_CONSONANT_LOSS_RULES.find(rule => rule.id === "cn-l2-212-nasal-y-y") || null;
      }
      if (isClassicalNahuatlNasal(leftConsonant) && rightConsonant === "w") {
        return CLASSICAL_NAHUATL_LESSON2_CONSONANT_LOSS_RULES.find(rule => rule.id === "cn-l2-212-nasal-w-w") || null;
      }
      return CLASSICAL_NAHUATL_LESSON2_CONSONANT_LOSS_RULES.find(rule => rule.matchKind === "exact" && rule.sourceLeft === leftConsonant && rule.sourceRight === rightConsonant) || null;
    }
    function buildClassicalNahuatlConsonantLossMechanicsFrame(options = {}) {
      const leftConsonant = normalizeClassicalNahuatlAssimilationSound(options.leftConsonant || options.firstConsonant || options.left || options.first || options.consonant);
      const rightConsonant = normalizeClassicalNahuatlAssimilationSound(options.rightConsonant || options.secondConsonant || options.right || options.second);
      const selectedRule = findClassicalNahuatlLesson2ConsonantLossRule({
        ...options,
        leftConsonant,
        rightConsonant
      });
      const requestedSpelling = normalizeClassicalNahuatlOrthographyInput(options.requestedSpelling);
      const requestedSpellingMatches = !requestedSpelling || !selectedRule?.outputSpelling || requestedSpelling === selectedRule.outputSpelling;
      const grammaticalConstruction = options.grammaticalConstruction !== false;
      const requiresGrammaticalConstruction = !["cn-l2-212-initial-y-unstable-note", "cn-l2-212-y-between-long-a-o-vowels"].includes(selectedRule?.id || "");
      const reduplicationBlocked = selectedRule?.id === "cn-l2-212-glottal-y-y" && options.reduplicationGlottal === true;
      const hasLossOutcome = Boolean(selectedRule?.lostConsonant || selectedRule?.outputSound || selectedRule?.outputSpelling);
      const authorized = Boolean(selectedRule) && (!requiresGrammaticalConstruction || grammaticalConstruction) && !reduplicationBlocked && requestedSpellingMatches && hasLossOutcome;
      let blockReason = "";
      if (!authorized) {
        if (!selectedRule) {
          blockReason = "no-lesson2-consonant-loss-rule";
        } else if (requiresGrammaticalConstruction && !grammaticalConstruction) {
          blockReason = "not-grammatical-construction";
        } else if (reduplicationBlocked) {
          blockReason = "reduplicative-glottal-blocks-rule";
        } else if (!requestedSpellingMatches) {
          blockReason = "requested-spelling-conflicts-with-consonant-loss-rule";
        } else {
          blockReason = "missing-consonant-loss-outcome";
        }
      }
      return {
        kind: "classical-nahuatl-transcription-consonant-loss-frame",
        version: CLASSICAL_NAHUATL_LESSON2_FRAME_VERSION,
        lesson: "Andrews Lesson 2",
        section: "2.12",
        operationId: "cn-l2-consonant-loss",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_TRANSCRIPTION_SOURCE_DOCUMENT,
        transcriptionLineStart: selectedRule?.transcriptionLineStart || 1897,
        transcriptionLineEnd: selectedRule?.transcriptionLineEnd || 1935,
        exactWitness: selectedRule?.exactWitness || "2.12. Consonant Loss.",
        leftConsonant,
        rightConsonant,
        selectedRuleId: selectedRule?.id || "",
        selectedRule: copyClassicalNahuatlLesson2ConsonantLossRule(selectedRule),
        evaluatedRuleIds: [
          "cn-l2-212-loss-general",
          ...(selectedRule?.id ? [selectedRule.id] : []),
        ],
        grammaticalConstruction,
        requiresGrammaticalConstruction,
        lostSide: selectedRule?.lostSide || "",
        lostConsonant: selectedRule?.lostConsonant || "",
        outputSound: authorized ? selectedRule?.outputSound || "" : "",
        outputSpelling: authorized ? selectedRule?.outputSpelling || "" : "",
        requestedSpelling,
        optional: selectedRule?.optional === true,
        nasalizationTrace: selectedRule?.nasalizationTrace === true,
        reduplicationGlottal: options.reduplicationGlottal === true,
        authorizationStatus: authorized ? "authorized" : "blocked",
        proofStatus: authorized ? "proven" : "blocked",
        blockReason,
        premises: [{
          layer: "consonant-sequence",
          rule: "Lesson 2.12 begins from consonant sequences where one consonant becomes imperceptible.",
          passed: Boolean(selectedRule),
          leftConsonant,
          rightConsonant,
          selectedRuleId: selectedRule?.id || ""
        }, {
          layer: "grammatical-construction",
          rule: "Most consonant-loss rules are tied to grammatical construction unless Andrews marks them as a note.",
          passed: !requiresGrammaticalConstruction || grammaticalConstruction,
          requiresGrammaticalConstruction,
          grammaticalConstruction
        }, {
          layer: "loss-outcome",
          rule: "The selected rule identifies the lost consonant and the remaining phone or spelling trace.",
          passed: hasLossOutcome,
          lostSide: selectedRule?.lostSide || "",
          lostConsonant: selectedRule?.lostConsonant || "",
          outputSound: selectedRule?.outputSound || "",
          outputSpelling: selectedRule?.outputSpelling || ""
        }, {
          layer: "reduplication-block",
          rule: "The glottal+y -> y rule cannot operate when the glottal stop is due to reduplication.",
          passed: !reduplicationBlocked,
          reduplicationGlottal: options.reduplicationGlottal === true
        }, {
          layer: "requested-spelling",
          rule: "A requested spelling must match the Andrews consonant-loss outcome.",
          passed: requestedSpellingMatches,
          requestedSpelling,
          expectedSpelling: selectedRule?.outputSpelling || ""
        }],
        conclusion: {
          authorized,
          selectedRuleId: authorized ? selectedRule?.id || "" : "",
          lostConsonant: authorized ? selectedRule?.lostConsonant || "" : "",
          outputSound: authorized ? selectedRule?.outputSound || "" : "",
          outputSpelling: authorized ? selectedRule?.outputSpelling || "" : "",
          optional: selectedRule?.optional === true,
          nasalizationTrace: selectedRule?.nasalizationTrace === true
        }
      };
    }
    function normalizeClassicalNahuatlExposedPosition(value) {
      const normalized = normalizeClassicalNahuatlOrthographyInput(value);
      if (["exposed", "syllable-final", "vocable-final", "word-final", "final", "end-of-syllable", "end-of-vocable"].includes(normalized)) {
        return "exposed";
      }
      if (["nonfinal", "non-final", "intervocalic"].includes(normalized)) {
        return normalized === "intervocalic" ? "intervocalic" : "nonfinal";
      }
      return "";
    }
    function findClassicalNahuatlLesson2ConsonantPhoneShiftRule(options = {}) {
      const requestedRuleId = normalizeClassicalNahuatlOrthographyInput(options.ruleId);
      if (requestedRuleId) {
        return CLASSICAL_NAHUATL_LESSON2_CONSONANT_PHONE_SHIFT_RULES.find(rule => rule.id === requestedRuleId) || null;
      }
      const sourceConsonant = normalizeClassicalNahuatlAssimilationSound(options.sourceConsonant || options.consonant || options.leftConsonant || options.firstConsonant);
      const position = normalizeClassicalNahuatlExposedPosition(options.position || options.syllablePosition || options.vocablePosition);
      if (sourceConsonant === "glottal" && options.followingVowel) {
        if (options.intervocalicYDisappears === true || position === "intervocalic") {
          return CLASSICAL_NAHUATL_LESSON2_CONSONANT_PHONE_SHIFT_RULES.find(rule => rule.id === "cn-l2-213-intervocalic-y-disappears") || null;
        }
        return CLASSICAL_NAHUATL_LESSON2_CONSONANT_PHONE_SHIFT_RULES.find(rule => rule.id === "cn-l2-213-glottal-vowel-y") || null;
      }
      if (sourceConsonant === "m" && position === "exposed") {
        return CLASSICAL_NAHUATL_LESSON2_CONSONANT_PHONE_SHIFT_RULES.find(rule => rule.id === "cn-l2-213-m-exposed-n") || null;
      }
      if (sourceConsonant === "y" && position === "exposed") {
        if (options.priorSSound === true) {
          return CLASSICAL_NAHUATL_LESSON2_CONSONANT_PHONE_SHIFT_RULES.find(rule => rule.id === "cn-l2-213-y-exposed-prior-s") || null;
        }
        return CLASSICAL_NAHUATL_LESSON2_CONSONANT_PHONE_SHIFT_RULES.find(rule => rule.id === "cn-l2-213-y-exposed-x") || null;
      }
      if (sourceConsonant === "kw" && position === "exposed") {
        return CLASSICAL_NAHUATL_LESSON2_CONSONANT_PHONE_SHIFT_RULES.find(rule => rule.id === "cn-l2-213-kw-exposed-k") || null;
      }
      if (sourceConsonant === "t" && position === "exposed") {
        return CLASSICAL_NAHUATL_LESSON2_CONSONANT_PHONE_SHIFT_RULES.find(rule => rule.id === "cn-l2-213-t-final-h") || null;
      }
      if (sourceConsonant === "glottal" && position === "nonfinal") {
        return CLASSICAL_NAHUATL_LESSON2_CONSONANT_PHONE_SHIFT_RULES.find(rule => rule.id === "cn-l2-213-rare-glottal-nonfinal-t") || null;
      }
      return null;
    }
    function buildClassicalNahuatlConsonantPhoneShiftMechanicsFrame(options = {}) {
      const sourceConsonant = normalizeClassicalNahuatlAssimilationSound(options.sourceConsonant || options.consonant || options.leftConsonant || options.firstConsonant);
      const followingVowel = normalizeClassicalNahuatlSimpleVowel(options.followingVowel);
      const position = normalizeClassicalNahuatlExposedPosition(options.position || options.syllablePosition || options.vocablePosition);
      const selectedRule = findClassicalNahuatlLesson2ConsonantPhoneShiftRule({
        ...options,
        sourceConsonant,
        followingVowel,
        position
      });
      const grammaticalConstruction = options.grammaticalConstruction !== false;
      const requestedSpelling = normalizeClassicalNahuatlOrthographyInput(options.requestedSpelling);
      let outputSound = selectedRule?.outputSound || "";
      let outputSpelling = selectedRule?.outputSpelling || "";
      if (selectedRule?.id === "cn-l2-213-glottal-vowel-y" && followingVowel) {
        outputSound = `y${followingVowel}`;
        outputSpelling = `y${followingVowel}`;
      }
      if (selectedRule?.id === "cn-l2-213-intervocalic-y-disappears" && followingVowel) {
        outputSound = followingVowel;
        outputSpelling = followingVowel;
      }
      if (selectedRule?.id === "cn-l2-213-m-exposed-n" && options.followingVocableBeginsWithVowel === true) {
        outputSound = "m";
        outputSpelling = "m";
      }
      const requestedSpellingMatches = !requestedSpelling || !outputSpelling || requestedSpelling === outputSpelling;
      const authorized = grammaticalConstruction && Boolean(selectedRule) && requestedSpellingMatches && Boolean(outputSound || outputSpelling);
      let blockReason = "";
      if (!authorized) {
        if (!grammaticalConstruction) {
          blockReason = "not-grammatical-construction";
        } else if (!selectedRule) {
          blockReason = "no-lesson2-consonant-phone-shift-rule";
        } else if (!requestedSpellingMatches) {
          blockReason = "requested-spelling-conflicts-with-consonant-phone-shift-rule";
        } else {
          blockReason = "missing-consonant-phone-shift-outcome";
        }
      }
      return {
        kind: "classical-nahuatl-transcription-consonant-phone-shift-frame",
        version: CLASSICAL_NAHUATL_LESSON2_FRAME_VERSION,
        lesson: "Andrews Lesson 2",
        section: "2.13",
        operationId: "cn-l2-consonant-phone-shift",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_TRANSCRIPTION_SOURCE_DOCUMENT,
        transcriptionLineStart: selectedRule?.transcriptionLineStart || 1936,
        transcriptionLineEnd: selectedRule?.transcriptionLineEnd || 1978,
        exactWitness: selectedRule?.exactWitness || "2.13. Consonant-Phone Shift Other Than Assimilation.",
        sourceConsonant,
        followingVowel,
        position,
        grammaticalConstruction,
        selectedRuleId: selectedRule?.id || "",
        selectedRule: copyClassicalNahuatlLesson2ConsonantPhoneShiftRule(selectedRule),
        evaluatedRuleIds: [
          "cn-l2-213-phone-shift-general",
          ...(selectedRule?.id ? [selectedRule.id] : []),
        ],
        outputSound: authorized ? outputSound : "",
        outputSpelling: authorized ? outputSpelling : "",
        requestedSpelling,
        optional: selectedRule?.optional === true,
        rare: selectedRule?.rare === true,
        priorSSound: options.priorSSound === true,
        intervocalicYDisappears: selectedRule?.id === "cn-l2-213-intervocalic-y-disappears",
        followingVocableBeginsWithVowel: options.followingVocableBeginsWithVowel === true,
        revertsToOriginalM: selectedRule?.id === "cn-l2-213-m-exposed-n" && options.followingVocableBeginsWithVowel === true,
        authorizationStatus: authorized ? "authorized" : "blocked",
        proofStatus: authorized ? "proven" : "blocked",
        blockReason,
        premises: [{
          layer: "grammatical-construction",
          rule: "Lesson 2.13 shifts occur as a result of grammatical construction.",
          passed: grammaticalConstruction
        }, {
          layer: "environment",
          rule: "The consonant must be followed by a vowel or be exposed at syllable/vocable edge.",
          passed: Boolean(selectedRule),
          sourceConsonant,
          followingVowel,
          position
        }, {
          layer: "phone-shift-selection",
          rule: "The selected shift must be one of Andrews' listed 2.13 cases.",
          passed: Boolean(selectedRule),
          selectedRuleId: selectedRule?.id || ""
        }, {
          layer: "output-phone",
          rule: "The selected rule yields the irregular phone or the marked disappearance result.",
          passed: Boolean(outputSound || outputSpelling),
          outputSound,
          outputSpelling
        }, {
          layer: "requested-spelling",
          rule: "A requested spelling must match the Andrews consonant-phone shift outcome.",
          passed: requestedSpellingMatches,
          requestedSpelling,
          expectedSpelling: outputSpelling
        }],
        conclusion: {
          authorized,
          selectedRuleId: authorized ? selectedRule?.id || "" : "",
          outputSound: authorized ? outputSound : "",
          outputSpelling: authorized ? outputSpelling : "",
          optional: selectedRule?.optional === true,
          rare: selectedRule?.rare === true,
          revertsToOriginalM: selectedRule?.id === "cn-l2-213-m-exposed-n" && options.followingVocableBeginsWithVowel === true
        }
      };
    }
    function buildClassicalNahuatlVowelElisionMechanicsFrame(options = {}) {
      const requestedRuleId = normalizeClassicalNahuatlOrthographyInput(options.ruleId);
      const sourceMorpheme = normalizeClassicalNahuatlOrthographyInput(
        options.sourceMorpheme || options.morpheme || ""
      );
      const targetMorpheme = normalizeClassicalNahuatlOrthographyInput(
        options.targetMorpheme || options.elidedMorpheme || ""
      );
      const vowelLength = normalizeClassicalNahuatlOrthographyInput(options.vowelLength || "short");
      const supportiveI = options.supportiveI === true;
      const stressGroupCombination = options.stressGroupCombination !== false;
      const inferredRuleId = supportiveI
        ? "cn-l2-214-supportive-i-not-proper-elision"
        : vowelLength === "long"
          ? "cn-l2-214-long-vowel-resists-elision"
          : options.indicatedInWriting === true
            ? "cn-l2-214-spelling-change-required"
            : options.listedStressGroupExample === true
              ? "cn-l2-214-listed-stress-group-examples"
              : "cn-l2-214-short-vowel-stress-group-elision";
      const selectedRule = requestedRuleId
        ? CLASSICAL_NAHUATL_LESSON2_VOWEL_ELISION_RULES.find(rule => rule.id === requestedRuleId) || null
        : CLASSICAL_NAHUATL_LESSON2_VOWEL_ELISION_RULES.find(rule => rule.id === inferredRuleId) || null;
      const longVowelBlocked = vowelLength === "long";
      const targetMatchesSource = Boolean(
        sourceMorpheme
        && targetMorpheme
        && sourceMorpheme !== targetMorpheme
        && (
          sourceMorpheme.slice(1) === targetMorpheme
          || sourceMorpheme.slice(0, -1) === targetMorpheme
        )
      );
      const authorized =
        Boolean(selectedRule)
        && stressGroupCombination
        && !longVowelBlocked
        && targetMatchesSource;
      return {
        kind: "classical-nahuatl-transcription-vowel-elision-frame",
        version: CLASSICAL_NAHUATL_LESSON2_FRAME_VERSION,
        lesson: "Andrews Lesson 2",
        section: "2.14",
        operationId: "cn-l2-vowel-elision",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_TRANSCRIPTION_SOURCE_DOCUMENT,
        transcriptionLineStart: selectedRule?.transcriptionLineStart || 1979,
        transcriptionLineEnd: selectedRule?.transcriptionLineEnd || 1990,
        exactWitness: selectedRule?.exactWitness || "2.14. Vowel Elision.",
        selectedRuleId: selectedRule?.id || "",
        selectedRule: copyClassicalNahuatlLesson2VowelElisionRule(selectedRule),
        evaluatedRuleIds: [selectedRule?.id].filter(Boolean),
        sourceMorpheme,
        targetMorpheme,
        outputForm: authorized ? targetMorpheme : "",
        vowelLength,
        supportiveI,
        stressGroupCombination,
        properElision: !supportiveI,
        spellingChangeOftenNecessary: selectedRule?.id === "cn-l2-214-spelling-change-required" || options.indicatedInWriting === true,
        authorizationStatus: authorized ? "authorized" : "blocked",
        proofStatus: authorized ? "proven" : "blocked",
        blockReason: authorized
          ? ""
          : !sourceMorpheme
            ? "vowel-elision-source-morpheme-required"
            : !targetMorpheme
              ? "vowel-elision-target-morpheme-required"
              : !targetMatchesSource
                ? "vowel-elision-target-mismatch"
                : longVowelBlocked
                  ? "long-vowel-resists-elision"
                  : "not-set-stress-group-combination",
        premises: [{
          layer: "stress-group-combination",
          rule: "Vowel elision occurs in set stress-group combinations.",
          passed: stressGroupCombination
        }, {
          layer: "short-vowel",
          rule: "Initial or final short vowels can be elided; long vowels tend not to undergo elision.",
          passed: !longVowelBlocked,
          vowelLength
        }, {
          layer: "supportive-i",
          rule: "Supportive-i omission is recorded but is not properly phonemic elision.",
          passed: true,
          supportiveI,
          properElision: !supportiveI
        }],
        conclusion: {
          authorized,
          selectedRuleId: authorized ? selectedRule?.id || "" : "",
          properElision: authorized ? !supportiveI : false,
          outputForm: authorized ? targetMorpheme : "",
          spellingChangeOftenNecessary: selectedRule?.id === "cn-l2-214-spelling-change-required" || options.indicatedInWriting === true
        }
      };
    }
    function buildClassicalNahuatlLongVowelGlottalMechanicsFrame(options = {}) {
      const requestedRuleId = normalizeClassicalNahuatlOrthographyInput(options.ruleId);
      const morpheme = normalizeClassicalNahuatlOrthographyInput(options.morpheme || "");
      const permittedMorphemes = ["a", "ā", "huē", "hue", "teō", "teo", "māi", "mai"];
      const compoundSubposition = normalizeClassicalNahuatlOrthographyInput(options.compoundSubposition || options.subposition);
      const matrixMorpheme = normalizeClassicalNahuatlOrthographyInput(
        options.matrixMorpheme || ""
      );
      const embedSubposition = compoundSubposition === "embed";
      const matrixDeterminesChoice =
        options.matrixDeterminesChoice === true
        || Boolean(matrixMorpheme);
      const selectedRule = requestedRuleId ? CLASSICAL_NAHUATL_LESSON2_LONG_VOWEL_GLOTTAL_RULES.find(rule => rule.id === requestedRuleId) || null : CLASSICAL_NAHUATL_LESSON2_LONG_VOWEL_GLOTTAL_RULES.find(rule => rule.id === "cn-l2-215-irregular-short-vowel-glottal-morph");
      const morphemePermitted = !morpheme || permittedMorphemes.includes(morpheme);
      const outputForm = Object.freeze({
        a: "ah",
        ā: "ah",
        huē: "hueh",
        hue: "hueh",
        teō: "teoh",
        teo: "teoh",
        māi: "mah",
        mai: "mah",
      })[morpheme] || "";
      const authorized =
        Boolean(selectedRule)
        && morphemePermitted
        && embedSubposition
        && matrixDeterminesChoice
        && Boolean(outputForm);
      return {
        kind: "classical-nahuatl-transcription-long-vowel-glottal-frame",
        version: CLASSICAL_NAHUATL_LESSON2_FRAME_VERSION,
        lesson: "Andrews Lesson 2",
        section: "2.15",
        operationId: "cn-l2-long-vowel-glottal-stop",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_TRANSCRIPTION_SOURCE_DOCUMENT,
        transcriptionLineStart: selectedRule?.transcriptionLineStart || 1991,
        transcriptionLineEnd: selectedRule?.transcriptionLineEnd || 1999,
        exactWitness: selectedRule?.exactWitness || "2.15. Long Vowel to Short Vowel Plus Glottal Stop.",
        selectedRuleId: selectedRule?.id || "",
        selectedRule: copyClassicalNahuatlLesson2LongVowelGlottalRule(selectedRule),
        evaluatedRuleIds: [
          "cn-l2-215-irregular-short-vowel-glottal-morph",
          "cn-l2-215-small-number-of-morphemes",
          ...(embedSubposition ? ["cn-l2-215-embed-subposition-required"] : []),
          ...(matrixDeterminesChoice ? ["cn-l2-215-matrix-determines-choice"] : []),
          ...(options.listedExample === true ? ["cn-l2-215-listed-examples"] : []),
        ],
        morpheme,
        morphemePermitted,
        compoundSubposition,
        embedSubposition,
        matrixDeterminesChoice,
        matrixMorpheme,
        outputMorphType: authorized ? "short-vowel-plus-glottal-stop" : "",
        outputForm: authorized ? outputForm : "",
        authorizationStatus: authorized ? "authorized" : "blocked",
        proofStatus: authorized ? "proven" : "blocked",
        blockReason: authorized
          ? ""
          : !morpheme
            ? "morpheme-required"
            : !morphemePermitted
              ? "morpheme-not-in-small-permitted-class"
              : !embedSubposition
                ? "not-embed-subposition"
                : !matrixDeterminesChoice
                  ? "matrix-does-not-determine-choice"
                  : "long-vowel-source-required",
        premises: [{
          layer: "small-morpheme-class",
          rule: "Only a small number of morphemes permit the irregular glottal morph.",
          passed: morphemePermitted,
          morpheme
        }, {
          layer: "embed-subposition",
          rule: "The glottal-stop morph must occupy the embed subposition of a compound stem.",
          passed: embedSubposition,
          compoundSubposition
        }, {
          layer: "matrix-determination",
          rule: "The matrix morpheme determines the choice of glottal morph.",
          passed: matrixDeterminesChoice
        }],
        conclusion: {
          authorized,
          outputMorphType: authorized ? "short-vowel-plus-glottal-stop" : "",
          outputForm: authorized ? outputForm : "",
          selectedRuleId: authorized ? selectedRule?.id || "" : ""
        }
      };
    }
    function buildClassicalNahuatlProsodicContourMechanicsFrame(options = {}) {
      const contourType = normalizeClassicalNahuatlOrthographyInput(options.contourType || options.kind || "sentential-prosody");
      const vocable = normalizeClassicalNahuatlOrthographyInput(
        options.vocable || options.sourceVocable || ""
      );
      let selectedRule = null;
      if (contourType === "nuclear-clause-stress" || contourType === "stress-group") {
        selectedRule = CLASSICAL_NAHUATL_LESSON2_PROSODIC_CONTOUR_RULES.find(rule => rule.id === "cn-l2-216-known-stress-rules") || null;
      } else if (contourType === "long-final-vowel-low-pitch") {
        selectedRule = CLASSICAL_NAHUATL_LESSON2_PROSODIC_CONTOUR_RULES.find(rule => rule.id === "cn-l2-216-long-final-vowel-low-pitch") || null;
      } else {
        selectedRule = CLASSICAL_NAHUATL_LESSON2_PROSODIC_CONTOUR_RULES.find(rule => rule.id === "cn-l2-216-sentential-prosody-unknown") || null;
      }
      const sententialUnknown = selectedRule?.id === "cn-l2-216-sentential-prosody-unknown";
      const authorized =
        Boolean(selectedRule)
        && !sententialUnknown
        && Boolean(vocable);
      return {
        kind: "classical-nahuatl-transcription-prosodic-contour-frame",
        version: CLASSICAL_NAHUATL_LESSON2_FRAME_VERSION,
        lesson: "Andrews Lesson 2",
        section: "2.16",
        operationId: "cn-l2-prosodic-contours",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_TRANSCRIPTION_SOURCE_DOCUMENT,
        transcriptionLineStart: selectedRule?.transcriptionLineStart || 2004,
        transcriptionLineEnd: selectedRule?.transcriptionLineEnd || 2010,
        exactWitness: selectedRule?.exactWitness || "2.16. Prosodic Contours.",
        contourType,
        vocable,
        selectedRuleId: selectedRule?.id || "",
        selectedRule: copyClassicalNahuatlLesson2ProsodicContourRule(selectedRule),
        sententialProsodyKnown: !sententialUnknown,
        outputGenerationAllowed: authorized,
        authorizationStatus: authorized ? "authorized" : "blocked",
        proofStatus: authorized ? "proven" : "blocked",
        blockReason: authorized
          ? ""
          : sententialUnknown
            ? "sentential-prosody-lacks-information"
            : "prosodic-source-vocable-required",
        premises: [{
          layer: "known-contour-domain",
          rule: "Only nuclear-clause/stress-group stress and long-final-vowel low pitch are available as known contour facts.",
          passed: authorized,
          contourType
        }, {
          layer: "sentential-prosody-limit",
          rule: "Sentential prosodic features must be left undiscussed for lack of information.",
          passed: !sententialUnknown,
          sententialUnknown
        }],
        conclusion: {
          authorized,
          outputGenerationAllowed: authorized,
          selectedRuleId: authorized ? selectedRule?.id || "" : ""
        }
      };
    }
    function normalizeClassicalNahuatlBoundaryType(value) {
      const normalized = normalizeClassicalNahuatlOrthographyInput(value);
      if (["compound", "compound-stem-boundary", "stem-boundary", "internal-open-transition"].includes(normalized)) {
        return "compound-stem-boundary";
      }
      return "";
    }
    function findClassicalNahuatlLesson2OpenTransitionRule(options = {}) {
      const requestedRuleId = normalizeClassicalNahuatlOrthographyInput(options.ruleId);
      if (requestedRuleId) {
        return CLASSICAL_NAHUATL_LESSON2_OPEN_TRANSITION_RULES.find(rule => rule.id === requestedRuleId) || null;
      }
      const boundaryType = normalizeClassicalNahuatlBoundaryType(options.boundaryType || "compound");
      if (!boundaryType) {
        return null;
      }
      if (options.stemInitialSupportiveI === true) {
        return CLASSICAL_NAHUATL_LESSON2_OPEN_TRANSITION_RULES.find(rule => rule.id === "cn-l2-25-supportive-i-kept") || null;
      }
      const phoneme = normalizeClassicalNahuatlPhoneme(options.stemFinalPhoneme || options.phoneme);
      const followingVowel = normalizeClassicalNahuatlSimpleVowel(options.followingVowel);
      const requestedSpelling = normalizeClassicalNahuatlOrthographyInput(options.requestedSpelling);
      if (phoneme === "/k/" && ["e", "i"].includes(followingVowel)) {
        return CLASSICAL_NAHUATL_LESSON2_OPEN_TRANSITION_RULES.find(rule => rule.id === "cn-l2-25-stem-final-k-before-e-i-qu") || null;
      }
      if (phoneme === "[kʷ]" && followingVowel) {
        return CLASSICAL_NAHUATL_LESSON2_OPEN_TRANSITION_RULES.find(rule => rule.id === "cn-l2-25-stem-final-kw-before-vowel-cu") || null;
      }
      if (phoneme === "[w]" && followingVowel) {
        if (requestedSpelling === "hu") {
          return CLASSICAL_NAHUATL_LESSON2_OPEN_TRANSITION_RULES.find(rule => rule.id === "cn-l2-25-stem-final-w-before-vowel-hu-variant") || null;
        }
        return CLASSICAL_NAHUATL_LESSON2_OPEN_TRANSITION_RULES.find(rule => rule.id === "cn-l2-25-stem-final-w-vocable-final") || null;
      }
      return CLASSICAL_NAHUATL_LESSON2_OPEN_TRANSITION_RULES.find(rule => rule.id === "cn-l2-25-compound-boundary-open-transition") || null;
    }
    function buildClassicalNahuatlOpenTransitionMechanicsFrame(options = {}) {
      const boundaryType = normalizeClassicalNahuatlBoundaryType(options.boundaryType || "compound");
      const phoneme = normalizeClassicalNahuatlPhoneme(options.stemFinalPhoneme || options.phoneme);
      const followingVowel = normalizeClassicalNahuatlSimpleVowel(options.followingVowel);
      const requestedSpelling = normalizeClassicalNahuatlOrthographyInput(options.requestedSpelling);
      const selectedRule = findClassicalNahuatlLesson2OpenTransitionRule({
        ...options,
        boundaryType,
        phoneme,
        followingVowel,
        requestedSpelling
      });
      const expectedSpelling = selectedRule?.outputSpelling || "";
      const requestedSpellingMatches = !requestedSpelling || !expectedSpelling || requestedSpelling === expectedSpelling;
      const authorized = Boolean(selectedRule) && requestedSpellingMatches;
      return {
        kind: "classical-nahuatl-transcription-open-transition-frame",
        version: CLASSICAL_NAHUATL_LESSON2_FRAME_VERSION,
        lesson: "Andrews Lesson 2",
        section: "2.5",
        operationId: "cn-l2-open-transition",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_TRANSCRIPTION_SOURCE_DOCUMENT,
        transcriptionLineStart: selectedRule?.transcriptionLineStart || 1701,
        transcriptionLineEnd: selectedRule?.transcriptionLineEnd || 1712,
        exactWitness: selectedRule?.exactWitness || "2.5. Spelling at Points of Internal Open Transition.",
        boundaryType,
        stemFinalPhoneme: phoneme,
        followingVowel,
        stemInitialSupportiveI: options.stemInitialSupportiveI === true,
        requestedSpelling,
        selectedRuleId: selectedRule?.id || "",
        selectedRule: copyClassicalNahuatlLesson2OpenTransitionRule(selectedRule),
        outputSpelling: authorized ? expectedSpelling : "",
        outputExample: authorized ? selectedRule?.outputExample || selectedRule?.examples?.[0] || "" : "",
        authorizationStatus: authorized ? "authorized" : "blocked",
        proofStatus: authorized ? "proven" : "blocked",
        blockReason: authorized ? "" : selectedRule ? "requested-spelling-conflicts-with-open-transition-rule" : "no-lesson2-open-transition-rule",
        premises: [{
          layer: "transcription-witness",
          rule: "Lesson 2.5 is cited by exact transcription lines.",
          passed: true,
          transcriptionLineStart: selectedRule?.transcriptionLineStart || 1701,
          transcriptionLineEnd: selectedRule?.transcriptionLineEnd || 1712
        }, {
          layer: "compound-boundary",
          rule: "The rule applies when two stems are joined by compounding.",
          passed: boundaryType === "compound-stem-boundary",
          boundaryType
        }, {
          layer: "open-transition-selection",
          rule: "Open transition preserves the stem boundary and selects listed spelling consequences or exceptions.",
          passed: Boolean(selectedRule),
          selectedRuleId: selectedRule?.id || ""
        }, {
          layer: "requested-spelling",
          rule: "A requested spelling must match the selected open-transition consequence.",
          passed: requestedSpellingMatches,
          requestedSpelling,
          expectedSpelling
        }],
        conclusion: {
          authorized,
          selectedRuleId: selectedRule?.id || "",
          outputSpelling: authorized ? expectedSpelling : "",
          outputExample: authorized ? selectedRule?.outputExample || selectedRule?.examples?.[0] || "" : "",
          spelledAsVocableFinal: selectedRule?.spelledAsVocableFinal === true,
          exception: selectedRule?.exception === true
        }
      };
    }
    function findClassicalNahuatlLesson2SpellingChangeRule(options = {}) {
      const phoneme = normalizeClassicalNahuatlPhoneme(options.phoneme);
      const syllablePosition = inferClassicalNahuatlLesson2SyllablePosition(options, phoneme);
      const followingVowel = normalizeClassicalNahuatlSimpleVowel(options.followingVowel);
      const precedingVowel = normalizeClassicalNahuatlSimpleVowel(options.precedingVowel);
      return CLASSICAL_NAHUATL_LESSON2_SPELLING_CHANGE_RULES.find(rule => {
        const positionMatches = rule.syllablePosition === syllablePosition || rule.syllablePosition === "nonfinal" && syllablePosition === "initial";
        if (rule.phoneme !== phoneme || !positionMatches) {
          return false;
        }
        if (syllablePosition === "initial" || syllablePosition === "nonfinal") {
          return Array.isArray(rule.followingVowels) && rule.followingVowels.includes(followingVowel);
        }
        if (syllablePosition === "final") {
          return Array.isArray(rule.precedingVowels) && rule.precedingVowels.includes(precedingVowel);
        }
        return false;
      }) || null;
    }
    function getClassicalNahuatlSpellingChangeExample(rule, options = {}) {
      if (!rule) {
        return "";
      }
      if (rule.syllablePosition === "initial" || rule.syllablePosition === "nonfinal") {
        const followingVowel = normalizeClassicalNahuatlSimpleVowel(options.followingVowel);
        return followingVowel ? `${rule.spelling}${followingVowel}` : rule.examples[0];
      }
      const precedingVowel = normalizeClassicalNahuatlSimpleVowel(options.precedingVowel);
      return precedingVowel ? `${precedingVowel}${rule.spelling}` : rule.examples[0];
    }
    function buildClassicalNahuatlSpellingChangeMechanicsFrame(options = {}) {
      const phoneme = normalizeClassicalNahuatlPhoneme(options.phoneme);
      const syllablePosition = inferClassicalNahuatlLesson2SyllablePosition(options, phoneme);
      const followingVowel = normalizeClassicalNahuatlSimpleVowel(options.followingVowel);
      const precedingVowel = normalizeClassicalNahuatlSimpleVowel(options.precedingVowel);
      const requestedSpelling = normalizeClassicalNahuatlOrthographyInput(options.requestedSpelling);
      const selectedRule = findClassicalNahuatlLesson2SpellingChangeRule({
        phoneme,
        syllablePosition,
        followingVowel,
        precedingVowel
      });
      const requestedSpellingMatches = !requestedSpelling || selectedRule && requestedSpelling === selectedRule.spelling;
      const authorized = Boolean(selectedRule) && requestedSpellingMatches;
      const blockReason = selectedRule ? requestedSpellingMatches ? "" : "requested-spelling-conflicts-with-transcription-environment" : "no-lesson2-spelling-change-rule";
      const ruleCopy = selectedRule ? {
        ...selectedRule,
        followingVowels: Array.isArray(selectedRule.followingVowels) ? selectedRule.followingVowels.slice() : [],
        precedingVowels: Array.isArray(selectedRule.precedingVowels) ? selectedRule.precedingVowels.slice() : [],
        examples: selectedRule.examples.slice()
      } : null;
      return {
        kind: "classical-nahuatl-transcription-spelling-change-frame",
        version: CLASSICAL_NAHUATL_LESSON2_FRAME_VERSION,
        lesson: "Andrews Lesson 2",
        section: "2.4",
        operationId: selectedRule?.operationId || "cn-l2-spelling-changes",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_TRANSCRIPTION_SOURCE_DOCUMENT,
        transcriptionLineStart: selectedRule?.transcriptionLineStart || 1686,
        transcriptionLineEnd: selectedRule?.transcriptionLineEnd || 1696,
        exactWitness: selectedRule?.exactWitness || "2.4. Spelling Changes.",
        phoneme,
        syllablePosition,
        followingVowel,
        precedingVowel,
        requestedSpelling,
        selectedRuleId: selectedRule?.id || "",
        selectedRule: ruleCopy,
        outputSpelling: authorized ? selectedRule.spelling : "",
        outputExample: authorized ? getClassicalNahuatlSpellingChangeExample(selectedRule, {
          followingVowel,
          precedingVowel
        }) : "",
        pronunciationChanged: selectedRule ? selectedRule.pronunciationChanged : null,
        authorizationStatus: authorized ? "authorized" : "blocked",
        proofStatus: authorized ? "proven" : "blocked",
        blockReason,
        premises: [{
          layer: "transcription-witness",
          rule: "Lesson 2.4 is cited by exact transcription lines.",
          passed: true,
          transcriptionLineStart: selectedRule?.transcriptionLineStart || 1686,
          transcriptionLineEnd: selectedRule?.transcriptionLineEnd || 1696
        }, {
          layer: "phoneme",
          rule: "Lesson 2.4 spelling-change logic covers /k/, /s/, [w], and [kʷ].",
          passed: phoneme === "/k/" || phoneme === "/s/" || phoneme === "[w]" || phoneme === "[kʷ]",
          phoneme
        }, {
          layer: "environment",
          rule: "The spelling choice depends on syllable position and the neighboring vowel.",
          passed: Boolean(selectedRule),
          syllablePosition,
          followingVowel,
          precedingVowel
        }, {
          layer: "pronunciation",
          rule: "Lesson 2.4 distinguishes spelling-only changes from spelling changes that mark pronunciation contrast.",
          passed: Boolean(selectedRule),
          pronunciationChanged: selectedRule ? selectedRule.pronunciationChanged : null,
          pronunciationPhone: selectedRule?.pronunciationPhone || ""
        }, {
          layer: "requested-spelling",
          rule: "A requested spelling must match the Andrews environment rule.",
          passed: requestedSpellingMatches,
          requestedSpelling,
          expectedSpelling: selectedRule?.spelling || ""
        }],
        conclusion: {
          authorized,
          outputSpelling: authorized ? selectedRule.spelling : "",
          outputExample: authorized ? getClassicalNahuatlSpellingChangeExample(selectedRule, {
            followingVowel,
            precedingVowel
          }) : "",
          pronunciationChanged: selectedRule ? selectedRule.pronunciationChanged : null
        }
      };
    }
    function isClassicalNahuatlBoundaryChar(char) {
      return CLASSICAL_NAHUATL_LESSON2_BOUNDARY_CHARS.includes(char);
    }
    function splitClassicalNahuatlLesson2Graphemes(value) {
      const normalized = normalizeClassicalNahuatlOrthographyInput(value);
      const digraphs = CLASSICAL_NAHUATL_LESSON2_DIGRAPHS.slice().sort((a, b) => b.length - a.length);
      const graphemes = [];
      for (let index = 0; index < normalized.length;) {
        const char = normalized[index];
        if (isClassicalNahuatlBoundaryChar(char)) {
          index += 1;
          continue;
        }
        const digraph = digraphs.find(item => normalized.startsWith(item, index));
        if (digraph) {
          graphemes.push(digraph);
          index += digraph.length;
          continue;
        }
        graphemes.push(char);
        index += 1;
      }
      return graphemes;
    }
    function buildClassicalNahuatlDerivationalBoundarySpellingMechanicsFrame(options = {}) {
      const sourceStem = normalizeClassicalNahuatlOrthographyInput(options.sourceStem);
      const retainedStem = normalizeClassicalNahuatlOrthographyInput(options.retainedStem).replace(/-+$/gu, "");
      const followingMorpheme = normalizeClassicalNahuatlOrthographyInput(options.followingMorpheme).replace(/^-+/gu, "");
      const retainedGraphemes = splitClassicalNahuatlLesson2Graphemes(retainedStem);
      const inputSpelling = retainedGraphemes.at(-1) || "";
      // Keep an observed internal morpheme boundary before the retained final
      // consonant.  The boundary belongs to the analyzed stem; Lesson 2 may
      // change the consonant's spelling, but it must not collapse the analysis.
      const retainedPrefix = inputSpelling ? retainedStem.slice(0, -inputSpelling.length) : retainedStem;
      const sourceTail = sourceStem.startsWith(retainedStem)
        ? sourceStem.slice(retainedStem.length).replace(/^-+/gu, "")
        : "";
      const sourceFollowingVowel = normalizeClassicalNahuatlSimpleVowel(options.sourceFollowingVowel || sourceTail);
      const followingVowel = normalizeClassicalNahuatlSimpleVowel(followingMorpheme);
      const precedingVowelMatches = retainedPrefix.normalize("NFD").replace(/[\u0300-\u036f]/gu, "").match(/[aeio]/gu) || [];
      const precedingVowel = normalizeClassicalNahuatlSimpleVowel(options.precedingVowel || precedingVowelMatches.at(-1) || "");
      let phoneme = normalizeClassicalNahuatlPhoneme(options.phoneme || options.underlyingFinalConsonant);
      if (!phoneme) {
        if (["hu", "uh"].includes(inputSpelling)) {
          phoneme = "[w]";
        } else if (["cu", "uc"].includes(inputSpelling)) {
          phoneme = "[kʷ]";
        } else if (inputSpelling === "qu") {
          phoneme = "/k/";
        } else if (inputSpelling === "z") {
          phoneme = "/s/";
        } else if (inputSpelling === "c") {
          phoneme = ["e", "i"].includes(sourceFollowingVowel) ? "/s/" : "/k/";
        }
      }
      const environmentSensitive = ["/k/", "/s/", "[w]", "[kʷ]"].includes(phoneme);
      const consonantPresent = Boolean(inputSpelling) && !CLASSICAL_NAHUATL_LESSON2_SIMPLE_VOWELS.includes(
        normalizeClassicalNahuatlSimpleVowel(inputSpelling)
      );
      const spellingChangeFrame = environmentSensitive ? buildClassicalNahuatlSpellingChangeMechanicsFrame({
        phoneme,
        syllablePosition: followingVowel ? (["[w]", "[kʷ]"].includes(phoneme) ? "nonfinal" : "initial") : "final",
        followingVowel,
        precedingVowel
      }) : null;
      const authorized = !environmentSensitive || spellingChangeFrame?.authorizationStatus === "authorized";
      const outputSpelling = environmentSensitive && authorized ? spellingChangeFrame.outputSpelling : inputSpelling;
      const realizedRetainedStem = inputSpelling && outputSpelling
        ? `${retainedPrefix}${outputSpelling}`
        : retainedStem;
      return Object.freeze({
        kind: "classical-nahuatl-transcription-derivational-boundary-spelling-frame",
        version: CLASSICAL_NAHUATL_LESSON2_FRAME_VERSION,
        lesson: "Andrews Lesson 2",
        section: "2.4",
        operationId: "cn-l2-derivational-boundary-spelling",
        boundaryType: "derivational-morpheme-boundary",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_TRANSCRIPTION_SOURCE_DOCUMENT,
        sourceStem,
        retainedStem,
        followingMorpheme,
        inputSpelling,
        underlyingFinalConsonant: phoneme || inputSpelling,
        sourceFollowingVowel,
        followingVowel,
        precedingVowel,
        consonantPresent,
        realizationMode: environmentSensitive ? "lesson2.4-environment-sensitive" : consonantPresent ? "invariant" : "no-final-consonant",
        outputSpelling,
        realizedRetainedStem,
        changed: realizedRetainedStem !== retainedStem,
        spellingChangeFrame,
        authorizationStatus: authorized ? "authorized" : "blocked",
        proofStatus: authorized ? "proven" : "blocked",
        blockReason: authorized ? "" : spellingChangeFrame?.blockReason || "lesson2-derivational-boundary-spelling-unresolved",
        coveredEnvironmentSensitiveConsonants: Object.freeze(["/k/", "/s/", "[w]", "[kʷ]"]),
        separateProcessesNotApplied: Object.freeze(["assimilation", "consonant-loss", "consonant-phone-shift"])
      });
    }
    function getInvalidClassicalNahuatlGraphemes(value) {
      const allowed = new Set([...CLASSICAL_NAHUATL_LESSON2_LETTERS, ...CLASSICAL_NAHUATL_LESSON2_DIGRAPHS, ...CLASSICAL_NAHUATL_LESSON2_MORPHIC_CARRIERS]);
      return splitClassicalNahuatlLesson2Graphemes(value).filter(grapheme => !allowed.has(grapheme));
    }
    function attachClassicalNahuatlLesson2Contract(frame, options = {}) {
      const attach = getClassicalNahuatlTranscriptionRuntimeTarget()?.attachOrthographyGrammarContract;
      if (typeof attach === "function") {
        return attach(frame, options);
      }
      return frame;
    }
    function deepFreezeClassicalNahuatlTranscriptionValue(value, seen = new WeakSet()) {
      if (!value || typeof value !== "object" || seen.has(value)) {
        return value;
      }
      seen.add(value);
      Reflect.ownKeys(value).forEach((key) => {
        const descriptor = Object.getOwnPropertyDescriptor(value, key);
        if (descriptor && Object.prototype.hasOwnProperty.call(descriptor, "value")) {
          deepFreezeClassicalNahuatlTranscriptionValue(descriptor.value, seen);
        }
      });
      return Object.freeze(value);
    }
    const CLASSICAL_NAHUATL_TRANSCRIPTION_ANALYSIS_DOCUMENTARY_KEYS =
      Object.freeze(new Set([
        "exactWitness",
        "legalWitnessTagIds",
        "lesson",
        "section",
        "sourceAuthority",
        "sourceDocument",
        "sourceExcerpt",
        "transcriptionLineEnd",
        "transcriptionLineStart",
      ]));
    function sanitizeClassicalNahuatlTranscriptionAnalysisValue(
      value,
      seen = new WeakMap()
    ) {
      if (!value || typeof value !== "object") {
        return value;
      }
      if (seen.has(value)) {
        return seen.get(value);
      }
      const clone = Array.isArray(value) ? [] : {};
      seen.set(value, clone);
      Reflect.ownKeys(value).forEach((key) => {
        if (
          typeof key === "string"
          && (
            key === "kind"
            || CLASSICAL_NAHUATL_TRANSCRIPTION_ANALYSIS_DOCUMENTARY_KEYS
              .has(key)
          )
        ) {
          return;
        }
        const descriptor = Object.getOwnPropertyDescriptor(value, key);
        if (
          !descriptor
          || descriptor.get
          || descriptor.set
          || !Object.prototype.hasOwnProperty.call(descriptor, "value")
        ) {
          return;
        }
        clone[key] = sanitizeClassicalNahuatlTranscriptionAnalysisValue(
          descriptor.value,
          seen
        );
      });
      return clone;
    }
    function getClassicalNahuatlTranscriptionAnalysisInputConstituents(
      frame = {}
    ) {
      const input = String(frame.input || "").trim();
      if (input) {
        return input.split("-").map((value, index) => Object.freeze({
          role: `constituent-${index + 1}`,
          value,
        })).filter(constituent => constituent.value);
      }
      const directSegments = Array.isArray(frame.sounds)
        ? frame.sounds
        : Array.isArray(frame.sourceSegments)
          ? frame.sourceSegments
          : [];
      if (directSegments.length) {
        return directSegments.map((value, index) => Object.freeze({
          role: `segment-${index + 1}`,
          value: String(value || "").trim(),
        })).filter(constituent => constituent.value);
      }
      const candidates = frame.realizedRetainedStem
        ? [
          ["retained-stem", frame.retainedStem],
          ["following-morpheme", frame.followingMorpheme],
        ]
        : [
        ["left-constituent", frame.leftConsonant],
        ["right-constituent", frame.rightConsonant],
        ["source-consonant", frame.sourceConsonant],
        ["stem-final-phoneme", frame.stemFinalPhoneme],
        ["phoneme", frame.phoneme],
        ["following-vowel", frame.followingVowel],
        ["source-morpheme", frame.sourceMorpheme],
        ["morpheme", frame.morpheme],
        ["vocable", frame.normalized],
        ["source-stem", frame.sourceStem],
        ["retained-stem", frame.retainedStem],
        ["following-morpheme", frame.followingMorpheme],
        ["matrix-morpheme", frame.matrixMorpheme],
        ["vocable", frame.vocable],
        ["final-vowel", frame.finalVowel],
      ];
      return candidates.map(([role, value]) => Object.freeze({
        role,
        value: String(value || "").trim(),
      })).filter(
        (constituent, index, constituents) =>
          constituent.value
          && !constituents.slice(0, index).some(
            prior =>
              prior.role === constituent.role
              && prior.value === constituent.value
          )
      );
    }
    function issueClassicalNahuatlTranscriptionAnalysisSourceFrame(
      candidate = {},
      analysisKind = ""
    ) {
      const constituents =
        getClassicalNahuatlTranscriptionAnalysisInputConstituents(candidate);
      if (!constituents.length) {
        return null;
      }
      const sourceFrame = deepFreezeClassicalNahuatlTranscriptionValue({
        kind: "classical-nahuatl-transcription-analysis-source-frame",
        version: CLASSICAL_NAHUATL_TRANSCRIPTION_SOURCE_VERSION,
        authorizationStatus: "authorized",
        blockReason: "",
        analysisKind,
        constituents: Object.freeze(constituents),
        sourceConstituentsOnly: true,
        callerSuppliedAuthorityAccepted: false,
        callerSuppliedFormulaAuthority: false,
        callerSuppliedSurfaceAuthority: false,
        lessonMetadataAuthority: false,
        documentaryEvidenceAuthority: false,
      });
      issuedClassicalNahuatlTranscriptionAnalysisSources.set(
        sourceFrame,
        Object.freeze({
          analysisKind,
          constituents: sourceFrame.constituents,
        })
      );
      return sourceFrame;
    }
    function isClassicalNahuatlTranscriptionAnalysisSourceFrame(
      frame = null
    ) {
      const receipt = frame && typeof frame === "object"
        ? issuedClassicalNahuatlTranscriptionAnalysisSources.get(frame)
        : null;
      return Boolean(
        receipt
        && frame.kind
          === "classical-nahuatl-transcription-analysis-source-frame"
        && frame.authorizationStatus === "authorized"
        && frame.blockReason === ""
        && frame.analysisKind === receipt.analysisKind
        && frame.constituents === receipt.constituents
        && frame.sourceConstituentsOnly === true
        && frame.callerSuppliedAuthorityAccepted === false
        && frame.callerSuppliedFormulaAuthority === false
        && frame.callerSuppliedSurfaceAuthority === false
        && frame.lessonMetadataAuthority === false
        && frame.documentaryEvidenceAuthority === false
        && Object.isFrozen(frame)
      );
    }
    function projectClassicalNahuatlTranscriptionAnalysisFormula(
      sourceFrame = null
    ) {
      if (!isClassicalNahuatlTranscriptionAnalysisSourceFrame(sourceFrame)) {
        return "";
      }
      return `#(${sourceFrame.constituents
        .map(constituent => constituent.value)
        .join("-")})#`;
    }
    function projectClassicalNahuatlTranscriptionAnalysisWritten(
      frame = {},
      analysisKind = ""
    ) {
      if (
        analysisKind === "derivational-boundary-spelling"
        && frame.realizedRetainedStem
      ) {
        return String(frame.realizedRetainedStem);
      }
      if (
        analysisKind === "progressive-assimilation"
        && Array.isArray(frame.realizedMorphs)
      ) {
        return frame.realizedMorphs.join("");
      }
      if (
        analysisKind === "syllable-structure"
        || analysisKind === "vocable-stress"
      ) {
        return String(frame.normalized || frame.input || "")
          .replace(/[-\s]/gu, "");
      }
      const candidates = [
        frame.outputForm,
        frame.targetMorpheme,
        frame.outputSpelling,
        frame.realizedRetainedStem,
        frame.division,
        frame.vocable,
        frame.normalized,
        frame.conclusion?.division,
        frame.conclusion?.outputSpelling,
        frame.conclusion?.outputForm,
        frame.conclusion?.outputMorphType,
        frame.conclusion?.stressedSyllable,
        frame.outputMorphType,
        frame.contourType,
        frame.selectedRuleId,
      ];
      return String(candidates.find(value => String(value || "").trim()) || "")
        .trim();
    }
    function issueClassicalNahuatlTranscriptionAnalysisFrame(
      candidate = null,
      analysisKind = ""
    ) {
      if (
        candidate
        && typeof candidate === "object"
        && issuedClassicalNahuatlTranscriptionAnalysisFrames.has(candidate)
      ) {
        return candidate;
      }
      const normalizedAnalysisKind = String(analysisKind || "").trim();
      const authorized =
        candidate?.authorizationStatus === "authorized";
      const sourceFrame =
        issueClassicalNahuatlTranscriptionAnalysisSourceFrame(
          candidate || {},
          normalizedAnalysisKind
        );
      const resultAuthorized =
        authorized
        && isClassicalNahuatlTranscriptionAnalysisSourceFrame(sourceFrame);
      const formula = resultAuthorized
        ? projectClassicalNahuatlTranscriptionAnalysisFormula(
          sourceFrame
        )
        : "";
      const surface = resultAuthorized
        ? projectClassicalNahuatlTranscriptionAnalysisWritten(
          candidate,
          normalizedAnalysisKind
        )
        : "";
      const formulaProjection = resultAuthorized
        ? deepFreezeClassicalNahuatlTranscriptionValue({
          kind: "classical-nahuatl-transcription-analysis-formula-projection",
          analysisKind: normalizedAnalysisKind,
          sourceFrame,
          formula,
          preservesSourceBoundaries: true,
          derivedFromWrittenProjection: false,
        })
        : null;
      const writtenProjection = resultAuthorized
        ? deepFreezeClassicalNahuatlTranscriptionValue({
          kind: "classical-nahuatl-transcription-analysis-written-projection",
          analysisKind: normalizedAnalysisKind,
          sourceFrame,
          surface,
          contextualBoundaryRealization: true,
          derivedFromFormulaProjection: false,
        })
        : null;
      const semanticAnalysis =
        sanitizeClassicalNahuatlTranscriptionAnalysisValue(
          candidate && typeof candidate === "object" ? candidate : {}
        );
      const issued = deepFreezeClassicalNahuatlTranscriptionValue({
        ...semanticAnalysis,
        kind: "classical-nahuatl-transcription-analysis-frame",
        version: CLASSICAL_NAHUATL_TRANSCRIPTION_FRAME_VERSION,
        authorizationStatus: resultAuthorized ? "authorized" : "blocked",
        blockReason: resultAuthorized
          ? ""
          : candidate?.blockReason
            || "classical-transcription-analysis-source-required",
        canonicalAnalysisKind: normalizedAnalysisKind,
        canonicalSourceObjectId:
          "classical-nahuatl-transcription-analysis-source-frame",
        sharedOperationId: "orthography:transcription",
        sourceFrame,
        formula,
        surface,
        formulaProjection,
        writtenProjection,
        typedFrameAuthority: resultAuthorized,
        callerSuppliedAuthorityAccepted: false,
        callerSuppliedFormulaAuthority: false,
        callerSuppliedSurfaceAuthority: false,
        lessonMetadataAuthority: false,
        documentaryEvidenceAuthority: false,
        storedWitnessAuthority: false,
        paradigmatic: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        formulaDerivedFromWrittenProjection: false,
        writtenDerivedFromFormulaProjection: false,
      });
      issuedClassicalNahuatlTranscriptionAnalysisFrames.set(
        issued,
        Object.freeze({
          analysisKind: normalizedAnalysisKind,
          authorizationStatus: issued.authorizationStatus,
          sourceFrame,
          formulaProjection,
          writtenProjection,
          formula,
          surface,
        })
      );
      return issued;
    }
    function isClassicalNahuatlTranscriptionAnalysisFrame(frame = null) {
      const receipt = frame && typeof frame === "object"
        ? issuedClassicalNahuatlTranscriptionAnalysisFrames.get(frame)
        : null;
      if (!receipt) {
        return false;
      }
      const authorized = frame.authorizationStatus === "authorized";
      return Boolean(
        frame
        && frame.kind === "classical-nahuatl-transcription-analysis-frame"
        && frame.canonicalAnalysisKind === receipt.analysisKind
        && frame.canonicalSourceObjectId
          === "classical-nahuatl-transcription-analysis-source-frame"
        && frame.sharedOperationId === "orthography:transcription"
        && frame.authorizationStatus === receipt.authorizationStatus
        && frame.sourceFrame === receipt.sourceFrame
        && frame.formulaProjection === receipt.formulaProjection
        && frame.writtenProjection === receipt.writtenProjection
        && frame.formula === receipt.formula
        && frame.surface === receipt.surface
        && (
          authorized
            ? Boolean(
              frame.formula
              && frame.surface
              && frame.typedFrameAuthority === true
              && isClassicalNahuatlTranscriptionAnalysisSourceFrame(
                frame.sourceFrame
              )
              && frame.formulaProjection
              && frame.writtenProjection
              && frame.formulaProjection.sourceFrame === frame.sourceFrame
              && frame.writtenProjection.sourceFrame === frame.sourceFrame
            )
            : frame.typedFrameAuthority === false
              && frame.formula === ""
              && frame.surface === ""
        )
        && frame.callerSuppliedAuthorityAccepted === false
        && frame.callerSuppliedFormulaAuthority === false
        && frame.callerSuppliedSurfaceAuthority === false
        && frame.lessonMetadataAuthority === false
        && frame.documentaryEvidenceAuthority === false
        && frame.storedWitnessAuthority === false
        && frame.paradigmatic === false
        && frame.formulaStringAuthority === false
        && frame.surfaceStringAuthority === false
        && frame.formulaDerivedFromWrittenProjection === false
        && frame.writtenDerivedFromFormulaProjection === false
        && !Object.prototype.hasOwnProperty.call(frame, "lesson")
        && !Object.prototype.hasOwnProperty.call(frame, "section")
        && !Object.prototype.hasOwnProperty.call(frame, "sourceDocument")
        && !Object.prototype.hasOwnProperty.call(frame, "exactWitness")
        && Object.isFrozen(frame)
      );
    }
    function buildClassicalNahuatlTranscriptionAnalysisFromBuilder(
      builder,
      analysisKind,
      args
    ) {
      const authorityPath = Array.from(args || []).map(
        (value, index) => findClassicalNahuatlExternalAuthorityPath(
          value,
          `request.arguments[${index}]`
        )
      ).find(Boolean);
      const candidate = authorityPath
        ? {
          kind: "classical-nahuatl-transcription-analysis-frame",
          authorizationStatus: "blocked",
          blockReason:
            `classical-transcription-external-authority-forbidden:${authorityPath}`,
        }
        : builder(...args);
      return issueClassicalNahuatlTranscriptionAnalysisFrame(
        candidate,
        analysisKind
      );
    }
    function buildClassicalNahuatlSyllableStructureFrame(...args) {
      return buildClassicalNahuatlTranscriptionAnalysisFromBuilder(
        buildClassicalNahuatlSyllableStructureMechanicsFrame,
        "syllable-structure",
        args
      );
    }
    function buildClassicalNahuatlSupportiveVowelFrame(...args) {
      return buildClassicalNahuatlTranscriptionAnalysisFromBuilder(
        buildClassicalNahuatlSupportiveVowelMechanicsFrame,
        "supportive-vowel-realization",
        args
      );
    }
    function buildClassicalNahuatlStressFrame(...args) {
      return buildClassicalNahuatlTranscriptionAnalysisFromBuilder(
        buildClassicalNahuatlStressMechanicsFrame,
        "vocable-stress",
        args
      );
    }
    function buildClassicalNahuatlConsonantalLengthFrame(...args) {
      return buildClassicalNahuatlTranscriptionAnalysisFromBuilder(
        buildClassicalNahuatlConsonantalLengthMechanicsFrame,
        "consonantal-length",
        args
      );
    }
    function buildClassicalNahuatlAssimilationFrame(...args) {
      return buildClassicalNahuatlTranscriptionAnalysisFromBuilder(
        buildClassicalNahuatlAssimilationMechanicsFrame,
        "assimilation",
        args
      );
    }
    function buildClassicalNahuatlProgressiveAssimilationFrame(...args) {
      return buildClassicalNahuatlTranscriptionAnalysisFromBuilder(
        buildClassicalNahuatlProgressiveAssimilationMechanicsFrame,
        "progressive-assimilation",
        args
      );
    }
    function buildClassicalNahuatlConsonantLossFrame(...args) {
      return buildClassicalNahuatlTranscriptionAnalysisFromBuilder(
        buildClassicalNahuatlConsonantLossMechanicsFrame,
        "consonant-loss",
        args
      );
    }
    function buildClassicalNahuatlConsonantPhoneShiftFrame(...args) {
      return buildClassicalNahuatlTranscriptionAnalysisFromBuilder(
        buildClassicalNahuatlConsonantPhoneShiftMechanicsFrame,
        "consonant-phone-shift",
        args
      );
    }
    function buildClassicalNahuatlVowelElisionFrame(...args) {
      return buildClassicalNahuatlTranscriptionAnalysisFromBuilder(
        buildClassicalNahuatlVowelElisionMechanicsFrame,
        "vowel-elision",
        args
      );
    }
    function buildClassicalNahuatlLongVowelGlottalFrame(...args) {
      return buildClassicalNahuatlTranscriptionAnalysisFromBuilder(
        buildClassicalNahuatlLongVowelGlottalMechanicsFrame,
        "long-vowel-glottal",
        args
      );
    }
    function buildClassicalNahuatlProsodicContourFrame(...args) {
      return buildClassicalNahuatlTranscriptionAnalysisFromBuilder(
        buildClassicalNahuatlProsodicContourMechanicsFrame,
        "prosodic-contour",
        args
      );
    }
    function buildClassicalNahuatlOpenTransitionFrame(...args) {
      return buildClassicalNahuatlTranscriptionAnalysisFromBuilder(
        buildClassicalNahuatlOpenTransitionMechanicsFrame,
        "open-transition",
        args
      );
    }
    function buildClassicalNahuatlSpellingChangeFrame(...args) {
      return buildClassicalNahuatlTranscriptionAnalysisFromBuilder(
        buildClassicalNahuatlSpellingChangeMechanicsFrame,
        "contextual-spelling",
        args
      );
    }
    function buildClassicalNahuatlDerivationalBoundarySpellingFrame(...args) {
      return buildClassicalNahuatlTranscriptionAnalysisFromBuilder(
        buildClassicalNahuatlDerivationalBoundarySpellingMechanicsFrame,
        "derivational-boundary-spelling",
        args
      );
    }
    function findClassicalNahuatlExternalAuthorityPath(
      value,
      path = "request",
      seen = new WeakSet()
    ) {
      if (!value || typeof value !== "object" || seen.has(value)) {
        return "";
      }
      seen.add(value);
      for (const key of Reflect.ownKeys(value)) {
        const descriptor = Object.getOwnPropertyDescriptor(value, key);
        const keyText = String(key);
        const normalizedKey = keyText.toLowerCase().replace(/[^a-z]/gu, "");
        const childPath = `${path}.${keyText}`;
        if (!descriptor || descriptor.get || descriptor.set) {
          return `${childPath}:accessor`;
        }
        if (CLASSICAL_NAHUATL_EXTERNAL_AUTHORITY_KEYS.has(normalizedKey)) {
          return childPath;
        }
        if (Object.prototype.hasOwnProperty.call(descriptor, "value")) {
          const nested = findClassicalNahuatlExternalAuthorityPath(
            descriptor.value,
            childPath,
            seen
          );
          if (nested) return nested;
        }
      }
      return "";
    }
    function isClassicalNahuatlTranscriptionVowel(segment = "") {
      return CLASSICAL_NAHUATL_TRANSCRIPTION_VOWELS.includes(segment);
    }
    function getClassicalNahuatlTranscriptionSimpleVowel(segment = "") {
      return String(segment || "")
        .replace(/ā/gu, "a")
        .replace(/ē/gu, "e")
        .replace(/ī/gu, "i")
        .replace(/ō/gu, "o");
    }
    function normalizeClassicalNahuatlTranscriptionSegment(segment = "") {
      const normalized = String(segment == null ? "" : segment)
        .normalize("NFC")
        .trim();
      return (
        isClassicalNahuatlTranscriptionVowel(normalized)
        || CLASSICAL_NAHUATL_TRANSCRIPTION_PHONEMES.includes(normalized)
        || CLASSICAL_NAHUATL_LESSON2_MORPHIC_CARRIERS.includes(normalized)
      ) ? normalized : "";
    }
    function deriveClassicalNahuatlTranscriptionContexts(
      constituents = []
    ) {
      const contexts = [];
      for (
        let constituentIndex = 0;
        constituentIndex < constituents.length;
        constituentIndex += 1
      ) {
        const segments = constituents[constituentIndex].segments;
        for (
          let segmentIndex = 0;
          segmentIndex < segments.length;
          segmentIndex += 1
        ) {
          const phoneme = segments[segmentIndex];
          if (
            !CLASSICAL_NAHUATL_TRANSCRIPTION_CONTEXTUAL_PHONEMES
              .includes(phoneme)
          ) {
            continue;
          }
          const previous = segments[segmentIndex - 1] || "";
          const following = segments[segmentIndex + 1] || "";
          const nextConstituent =
            constituents[constituentIndex + 1] || null;
          const boundaryFollowing =
            segmentIndex === segments.length - 1
              ? nextConstituent?.segments?.[0] || ""
              : "";
          const followingIsVowel =
            isClassicalNahuatlTranscriptionVowel(following);
          const previousIsVowel =
            isClassicalNahuatlTranscriptionVowel(previous);
          const boundaryFollowingIsVowel =
            isClassicalNahuatlTranscriptionVowel(boundaryFollowing);
          let position = "";
          let followingVowel = "";
          if (followingIsVowel) {
            position = "syllable-initial";
            followingVowel =
              getClassicalNahuatlTranscriptionSimpleVowel(following);
          } else if (previousIsVowel) {
            position = boundaryFollowingIsVowel
              ? "stem-final-open-transition"
              : "syllable-final";
            followingVowel = boundaryFollowingIsVowel
              ? getClassicalNahuatlTranscriptionSimpleVowel(
                  boundaryFollowing
                )
              : "";
          }
          if (!position) {
            return Object.freeze({
              authorizationStatus: "blocked",
              blockReason: "classical-transcription-context-required",
              contexts: Object.freeze([])
            });
          }
          contexts.push(Object.freeze({
            constituentIndex,
            segmentIndex,
            phoneme,
            position,
            followingVowel
          }));
        }
      }
      return Object.freeze({
        authorizationStatus: "authorized",
        blockReason: "",
        contexts: Object.freeze(contexts)
      });
    }
    function buildBlockedClassicalNahuatlTranscriptionSource(blockReason) {
      return deepFreezeClassicalNahuatlTranscriptionValue({
        kind: "classical-nahuatl-transcription-source-frame",
        version: CLASSICAL_NAHUATL_TRANSCRIPTION_SOURCE_VERSION,
        authorizationStatus: "blocked",
        blockReason,
        constituents: [],
        callerSuppliedAuthorityAccepted: false,
        externalProjectionAuthorityAccepted: false,
        pedagogicalIndexAccepted: false
      });
    }
    function buildClassicalNahuatlTranscriptionSourceFrame(
      specification = {}
    ) {
      if (!specification || typeof specification !== "object") {
        return buildBlockedClassicalNahuatlTranscriptionSource(
          "classical-transcription-typed-constituents-required"
        );
      }
      const authorityPath =
        findClassicalNahuatlExternalAuthorityPath(specification);
      if (authorityPath) {
        return buildBlockedClassicalNahuatlTranscriptionSource(
          `classical-transcription-external-authority-forbidden:${authorityPath}`
        );
      }
      const allowedKeys = new Set(["constituents", "contextAssertions"]);
      const unexpectedKey = Reflect.ownKeys(specification)
        .map(String)
        .find(key => !allowedKeys.has(key));
      if (unexpectedKey) {
        return buildBlockedClassicalNahuatlTranscriptionSource(
          `classical-transcription-source-field-forbidden:${unexpectedKey}`
        );
      }
      const rawConstituents = specification.constituents;
      if (!Array.isArray(rawConstituents) || !rawConstituents.length) {
        return buildBlockedClassicalNahuatlTranscriptionSource(
          "classical-transcription-typed-constituents-required"
        );
      }
      const constituents = [];
      for (const rawConstituent of rawConstituents) {
        if (
          !rawConstituent
          || typeof rawConstituent !== "object"
          || Reflect.ownKeys(rawConstituent).some(
            key => String(key) !== "segments"
          )
          || !Array.isArray(rawConstituent.segments)
          || !rawConstituent.segments.length
        ) {
          return buildBlockedClassicalNahuatlTranscriptionSource(
            "classical-transcription-constituent-shape-invalid"
          );
        }
        const segments = rawConstituent.segments.map(
          normalizeClassicalNahuatlTranscriptionSegment
        );
        if (
          segments.some(segment => !segment)
          || !segments.some(isClassicalNahuatlTranscriptionVowel)
        ) {
          return buildBlockedClassicalNahuatlTranscriptionSource(
            segments.some(segment => !segment)
              ? "classical-transcription-segment-not-licensed"
              : "classical-transcription-context-required"
          );
        }
        constituents.push(Object.freeze({
          segments: Object.freeze(segments)
        }));
      }
      const contextResolution =
        deriveClassicalNahuatlTranscriptionContexts(constituents);
      if (contextResolution.authorizationStatus !== "authorized") {
        return buildBlockedClassicalNahuatlTranscriptionSource(
          contextResolution.blockReason
        );
      }
      if (specification.contextAssertions !== undefined) {
        if (!Array.isArray(specification.contextAssertions)) {
          return buildBlockedClassicalNahuatlTranscriptionSource(
            "classical-transcription-context-assertions-invalid"
          );
        }
        const derivedByCoordinate = new Map(
          contextResolution.contexts.map(context => [
            `${context.constituentIndex}:${context.segmentIndex}`,
            context
          ])
        );
        const assertionsMatch = specification.contextAssertions.every(
          assertion => {
            if (!assertion || typeof assertion !== "object") return false;
            const expected = derivedByCoordinate.get(
              `${Number(assertion.constituentIndex)}:${Number(assertion.segmentIndex)}`
            );
            return Boolean(
              expected
              && assertion.position === expected.position
              && String(assertion.followingVowel || "")
                === expected.followingVowel
            );
          }
        );
        if (!assertionsMatch) {
          return buildBlockedClassicalNahuatlTranscriptionSource(
            "classical-transcription-context-mismatch"
          );
        }
      }
      const sourceFrame = deepFreezeClassicalNahuatlTranscriptionValue({
        kind: "classical-nahuatl-transcription-source-frame",
        version: CLASSICAL_NAHUATL_TRANSCRIPTION_SOURCE_VERSION,
        authorizationStatus: "authorized",
        blockReason: "",
        constituents: Object.freeze(constituents),
        sourceConstituentsOnly: true,
        callerSuppliedAuthorityAccepted: false,
        externalProjectionAuthorityAccepted: false,
        pedagogicalIndexAccepted: false
      });
      issuedClassicalNahuatlTranscriptionSources.set(
        sourceFrame,
        Object.freeze({
          constituents: sourceFrame.constituents,
          contextualRealizations: contextResolution.contexts
        })
      );
      return sourceFrame;
    }
    function isClassicalNahuatlTranscriptionSourceFrame(frame = null) {
      const receipt = frame && typeof frame === "object"
        ? issuedClassicalNahuatlTranscriptionSources.get(frame)
        : null;
      return Boolean(
        receipt
        && frame.kind === "classical-nahuatl-transcription-source-frame"
        && frame.version === CLASSICAL_NAHUATL_TRANSCRIPTION_SOURCE_VERSION
        && frame.authorizationStatus === "authorized"
        && frame.blockReason === ""
        && frame.constituents === receipt.constituents
        && frame.sourceConstituentsOnly === true
        && frame.callerSuppliedAuthorityAccepted === false
        && frame.externalProjectionAuthorityAccepted === false
        && frame.pedagogicalIndexAccepted === false
        && Object.isFrozen(frame)
      );
    }
    function buildClassicalNahuatlTranscriptionCarrierFrame(
      sourceFrame = null
    ) {
      if (!isClassicalNahuatlTranscriptionSourceFrame(sourceFrame)) {
        return null;
      }
      const selectedCarriers = [];
      sourceFrame.constituents.forEach((constituent, constituentIndex) => {
        constituent.segments.forEach((segment, segmentIndex) => {
          const carrier =
            CLASSICAL_NAHUATL_TRANSCRIPTION_VOWEL_CARRIERS[segment]
            || CLASSICAL_NAHUATL_TRANSCRIPTION_CONSONANT_CARRIERS[segment]
            || CLASSICAL_NAHUATL_TRANSCRIPTION_SIGEME_CARRIERS[segment]
            || null;
          if (!carrier) {
            return;
          }
          selectedCarriers.push(Object.freeze({
            constituentIndex,
            segmentIndex,
            segment,
            carrier,
            lexicalOrDerivedFact: true,
            userSelectable: false,
            generationAuthority: false,
          }));
        });
      });
      const carrierFrame = deepFreezeClassicalNahuatlTranscriptionValue({
        kind: "classical-nahuatl-transcription-carrier-frame",
        version: CLASSICAL_NAHUATL_TRANSCRIPTION_FRAME_VERSION,
        authorizationStatus: "authorized",
        blockReason: "",
        sourceFrame,
        systemFacts: CLASSICAL_NAHUATL_TRANSCRIPTION_SYSTEM_FACTS,
        vowelSystemFacts:
          CLASSICAL_NAHUATL_TRANSCRIPTION_VOWEL_SYSTEM_FACTS,
        consonantSystemFacts:
          CLASSICAL_NAHUATL_TRANSCRIPTION_CONSONANT_SYSTEM_FACTS,
        vowelCarriers:
          CLASSICAL_NAHUATL_TRANSCRIPTION_VOWEL_CARRIERS,
        consonantCarriers:
          CLASSICAL_NAHUATL_TRANSCRIPTION_CONSONANT_CARRIERS,
        sigemeCarriers:
          CLASSICAL_NAHUATL_TRANSCRIPTION_SIGEME_CARRIERS,
        selectedCarriers: Object.freeze(selectedCarriers),
        readOnly: true,
        userSelectable: false,
        generationAuthority: false,
        paradigmatic: false,
        lessonMetadataAuthority: false,
        documentaryEvidenceAuthority: false,
      });
      issuedClassicalNahuatlTranscriptionCarrierFrames.set(
        carrierFrame,
        Object.freeze({
          sourceFrame,
          selectedCarriers: carrierFrame.selectedCarriers,
        })
      );
      return carrierFrame;
    }
    function isClassicalNahuatlTranscriptionCarrierFrame(frame = null) {
      const receipt = frame && typeof frame === "object"
        ? issuedClassicalNahuatlTranscriptionCarrierFrames.get(frame)
        : null;
      return Boolean(
        receipt
        && frame.kind === "classical-nahuatl-transcription-carrier-frame"
        && frame.authorizationStatus === "authorized"
        && frame.blockReason === ""
        && frame.sourceFrame === receipt.sourceFrame
        && isClassicalNahuatlTranscriptionSourceFrame(frame.sourceFrame)
        && frame.selectedCarriers === receipt.selectedCarriers
        && frame.systemFacts
          === CLASSICAL_NAHUATL_TRANSCRIPTION_SYSTEM_FACTS
        && frame.vowelSystemFacts
          === CLASSICAL_NAHUATL_TRANSCRIPTION_VOWEL_SYSTEM_FACTS
        && frame.consonantSystemFacts
          === CLASSICAL_NAHUATL_TRANSCRIPTION_CONSONANT_SYSTEM_FACTS
        && frame.vowelCarriers
          === CLASSICAL_NAHUATL_TRANSCRIPTION_VOWEL_CARRIERS
        && frame.consonantCarriers
          === CLASSICAL_NAHUATL_TRANSCRIPTION_CONSONANT_CARRIERS
        && frame.sigemeCarriers
          === CLASSICAL_NAHUATL_TRANSCRIPTION_SIGEME_CARRIERS
        && frame.readOnly === true
        && frame.userSelectable === false
        && frame.generationAuthority === false
        && frame.paradigmatic === false
        && frame.lessonMetadataAuthority === false
        && frame.documentaryEvidenceAuthority === false
        && Object.isFrozen(frame)
      );
    }
    function projectClassicalNahuatlTranscriptionFormula(
      sourceFrame = null
    ) {
      return `#(${sourceFrame.constituents
        .map(constituent => constituent.segments.join(""))
        .join("-")})#`;
    }
    function projectClassicalNahuatlTranscriptionWritten(
      sourceFrame = null
    ) {
      const receipt = sourceFrame && typeof sourceFrame === "object"
        ? issuedClassicalNahuatlTranscriptionSources.get(sourceFrame)
        : null;
      if (!receipt) return "";
      const contextByCoordinate = new Map(
        receipt.contextualRealizations.map(context => [
          `${context.constituentIndex}:${context.segmentIndex}`,
          context
        ])
      );
      return sourceFrame.constituents.map(
        (constituent, constituentIndex) => constituent.segments.map(
          (segment, segmentIndex) => {
            if (segment === "\u2395") {
              return "";
            }
            if (isClassicalNahuatlTranscriptionVowel(segment)) {
              return segment;
            }
            if (
              Object.prototype.hasOwnProperty.call(
                CLASSICAL_NAHUATL_TRANSCRIPTION_CONSONANT_SPELLINGS,
                segment
              )
            ) {
              return CLASSICAL_NAHUATL_TRANSCRIPTION_CONSONANT_SPELLINGS[
                segment
              ];
            }
            const context = contextByCoordinate.get(
              `${constituentIndex}:${segmentIndex}`
            );
            if (!context) return "";
            if (segment === "/k/") {
              return (
                context.followingVowel === "e"
                || context.followingVowel === "i"
              ) ? "qu" : "c";
            }
            if (segment === "/s/") {
              return (
                context.position === "syllable-initial"
                && (
                  context.followingVowel === "e"
                  || context.followingVowel === "i"
                )
              ) ? "c" : "z";
            }
            if (segment === "/w/") {
              return context.position === "syllable-initial"
                ? "hu"
                : "uh";
            }
            if (segment === "/kʷ/") {
              return (
                context.position === "syllable-initial"
                || (
                  context.position === "stem-final-open-transition"
                  && Boolean(context.followingVowel)
                )
              ) ? "cu" : "uc";
            }
            return "";
          }
        ).join("")
      ).join("");
    }
    function buildBlockedClassicalNahuatlTranscriptionFrame(
      sourceFrame,
      blockReason
    ) {
      const blocked = deepFreezeClassicalNahuatlTranscriptionValue({
        kind: "classical-nahuatl-transcription-frame",
        version: CLASSICAL_NAHUATL_TRANSCRIPTION_FRAME_VERSION,
        authorizationStatus: "blocked",
        blockReason,
        sourceFrame:
          isClassicalNahuatlTranscriptionSourceFrame(sourceFrame)
            ? sourceFrame
            : null,
        formula: "",
        surface: "",
        formulaProjection: null,
        writtenProjection: null,
        carrierFrame: null,
        typedFrameAuthority: false,
        callerSuppliedAuthorityAccepted: false,
        callerSuppliedFormulaAuthority: false,
        callerSuppliedSurfaceAuthority: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        displayTextAuthority: false,
        paradigmatic: false,
        lessonMetadataAuthority: false,
        formulaDerivedFromWrittenProjection: false,
        writtenDerivedFromFormulaProjection: false,
        writtenCarrierParsingAllowedForFormula: false
      });
      issuedClassicalNahuatlTranscriptionFrames.set(
        blocked,
        Object.freeze({
          sourceFrame: blocked.sourceFrame,
          authorizationStatus: "blocked",
          formulaProjection: null,
          writtenProjection: null,
          carrierFrame: null,
          formula: "",
          surface: ""
        })
      );
      return blocked;
    }
    function buildClassicalNahuatlTranscriptionFrame(
      sourceFrame = null,
      options = {}
    ) {
      const authorityPath =
        findClassicalNahuatlExternalAuthorityPath(options);
      if (authorityPath) {
        return buildBlockedClassicalNahuatlTranscriptionFrame(
          sourceFrame,
          `classical-transcription-external-authority-forbidden:${authorityPath}`
        );
      }
      if (Reflect.ownKeys(options).length) {
        return buildBlockedClassicalNahuatlTranscriptionFrame(
          sourceFrame,
          "classical-transcription-options-not-supported"
        );
      }
      if (!isClassicalNahuatlTranscriptionSourceFrame(sourceFrame)) {
        return buildBlockedClassicalNahuatlTranscriptionFrame(
          sourceFrame,
          sourceFrame?.blockReason
            || "classical-transcription-owner-issued-source-required"
        );
      }
      const formula = projectClassicalNahuatlTranscriptionFormula(
        sourceFrame
      );
      const surface = projectClassicalNahuatlTranscriptionWritten(
        sourceFrame
      );
      const carrierFrame =
        buildClassicalNahuatlTranscriptionCarrierFrame(sourceFrame);
      if (
        !formula
        || !surface
        || !isClassicalNahuatlTranscriptionCarrierFrame(carrierFrame)
      ) {
        return buildBlockedClassicalNahuatlTranscriptionFrame(
          sourceFrame,
          "classical-transcription-contextual-realization-failed"
        );
      }
      const formulaProjection = deepFreezeClassicalNahuatlTranscriptionValue({
        kind: "classical-nahuatl-transcription-formula-projection",
        sourceFrame,
        formula,
        preservesConstituentBoundaries: true,
        derivedFromWrittenProjection: false
      });
      const writtenProjection = deepFreezeClassicalNahuatlTranscriptionValue({
        kind: "classical-nahuatl-transcription-written-projection",
        sourceFrame,
        surface,
        contextualBoundaryRealization: true,
        derivedFromFormulaProjection: false
      });
      const proofFrame = deepFreezeClassicalNahuatlTranscriptionValue({
        kind: "classical-nahuatl-transcription-authorization-frame",
        authorizationStatus: "authorized",
        conclusion: Object.freeze({
          authorized: true
        }),
        lessonMetadataAuthority: false,
        storedWitnessAuthority: false
      });
      const transcriptionFrame =
        deepFreezeClassicalNahuatlTranscriptionValue({
          kind: "classical-nahuatl-transcription-frame",
          version: CLASSICAL_NAHUATL_TRANSCRIPTION_FRAME_VERSION,
          authorizationStatus: "authorized",
          blockReason: "",
          sourceFrame,
          formula,
          surface,
          normalized: surface,
          surfaceForms: Object.freeze([surface]),
          graphemes: Object.freeze(
            splitClassicalNahuatlLesson2Graphemes(surface)
          ),
          invalidGraphemes: Object.freeze([]),
          formulaProjection,
          writtenProjection,
          proofFrame,
          carrierFrame,
          languageProfileId: CLASSICAL_NAHUATL_PROFILE_ID,
          sourceProfileId: CLASSICAL_NAHUATL_PROFILE_ID,
          targetProfileId: CLASSICAL_NAHUATL_PROFILE_ID,
          sourceDocument:
            CLASSICAL_NAHUATL_TRANSCRIPTION_SOURCE_DOCUMENT,
          outputLanguage: "Classical Nahuatl",
          orthographyPolicy: "contextual-andrews-transcription",
          orthographyOutputAllowed: true,
          blocksInput: false,
          grammarGenerationAllowed: false,
          paradigmatic: false,
          typedFrameAuthority: true,
          callerSuppliedAuthorityAccepted: false,
          callerSuppliedFormulaAuthority: false,
          callerSuppliedSurfaceAuthority: false,
          lessonMetadataAuthority: false,
          formulaStringAuthority: false,
          surfaceStringAuthority: false,
          displayTextAuthority: false,
          formulaDerivedFromWrittenProjection: false,
          writtenDerivedFromFormulaProjection: false,
          writtenCarrierParsingAllowedForFormula: false
        });
      issuedClassicalNahuatlTranscriptionFrames.set(
        transcriptionFrame,
        Object.freeze({
          sourceFrame,
          authorizationStatus: "authorized",
          formulaProjection,
          writtenProjection,
          carrierFrame,
          formula,
          surface
        })
      );
      return transcriptionFrame;
    }
    function isClassicalNahuatlTranscriptionFrame(frame = null) {
      const receipt = frame && typeof frame === "object"
        ? issuedClassicalNahuatlTranscriptionFrames.get(frame)
        : null;
      const authorized = frame?.authorizationStatus === "authorized";
      return Boolean(
        receipt
        && frame.kind === "classical-nahuatl-transcription-frame"
        && frame.version === CLASSICAL_NAHUATL_TRANSCRIPTION_FRAME_VERSION
        && frame.authorizationStatus === receipt.authorizationStatus
        && frame.sourceFrame === receipt.sourceFrame
        && frame.formulaProjection === receipt.formulaProjection
        && frame.writtenProjection === receipt.writtenProjection
        && frame.carrierFrame === receipt.carrierFrame
        && frame.formula === receipt.formula
        && frame.surface === receipt.surface
        && (
          authorized
            ? Boolean(
              frame.blockReason === ""
              && isClassicalNahuatlTranscriptionSourceFrame(
                frame.sourceFrame
              )
              && isClassicalNahuatlTranscriptionCarrierFrame(
                frame.carrierFrame
              )
              && frame.carrierFrame.sourceFrame === frame.sourceFrame
              && frame.formulaProjection.sourceFrame === frame.sourceFrame
              && frame.writtenProjection.sourceFrame === frame.sourceFrame
              && frame.formulaProjection
                .derivedFromWrittenProjection === false
              && frame.writtenProjection
                .derivedFromFormulaProjection === false
              && frame.sourceDocument
                === CLASSICAL_NAHUATL_TRANSCRIPTION_SOURCE_DOCUMENT
              && frame.orthographyOutputAllowed === true
              && frame.typedFrameAuthority === true
            )
            : Boolean(
              frame.authorizationStatus === "blocked"
              && frame.blockReason
              && frame.formula === ""
              && frame.surface === ""
              && frame.formulaProjection === null
              && frame.writtenProjection === null
              && frame.carrierFrame === null
              && frame.typedFrameAuthority === false
            )
        )
        && frame.callerSuppliedAuthorityAccepted === false
        && frame.callerSuppliedFormulaAuthority === false
        && frame.callerSuppliedSurfaceAuthority === false
        && frame.lessonMetadataAuthority === false
        && frame.formulaStringAuthority === false
        && frame.surfaceStringAuthority === false
        && frame.displayTextAuthority === false
        && frame.paradigmatic === false
        && frame.formulaDerivedFromWrittenProjection === false
        && frame.writtenDerivedFromFormulaProjection === false
        && frame.writtenCarrierParsingAllowedForFormula === false
        && !Object.prototype.hasOwnProperty.call(frame, "lesson")
        && !Object.prototype.hasOwnProperty.call(frame, "section")
        && !Object.prototype.hasOwnProperty.call(frame, "example")
        && Object.isFrozen(frame)
      );
    }
    function getClassicalNahuatlFirewallRules() {
      return Array.from(CLASSICAL_NAHUATL_FIREWALL_RULES);
    }
    function installClassicalNahuatlTranscriptionClassicGlobals() {
      const globalTarget = typeof targetObject !== "undefined" && targetObject || (typeof globalThis !== "undefined" ? globalThis : null);
      if (!globalTarget || typeof globalTarget !== "object") {
        return null;
      }
      Object.assign(globalTarget, {
        getClassicalNahuatlLetters,
        getClassicalNahuatlDigraphs,
        getClassicalNahuatlSpellingChangeRules,
        buildClassicalNahuatlSpellingChangeFrame,
        buildClassicalNahuatlDerivationalBoundarySpellingFrame,
        getClassicalNahuatlOpenTransitionRules,
        buildClassicalNahuatlOpenTransitionFrame,
        getClassicalNahuatlSyllableStructureRules,
        buildClassicalNahuatlSyllableStructureFrame,
        getClassicalNahuatlSupportiveVowelRules,
        buildClassicalNahuatlSupportiveVowelFrame,
        getClassicalNahuatlStressRules,
        buildClassicalNahuatlStressFrame,
        getClassicalNahuatlConsonantalLengthRules,
        buildClassicalNahuatlConsonantalLengthFrame,
        getClassicalNahuatlAssimilationRules,
        buildClassicalNahuatlAssimilationFrame,
        buildClassicalNahuatlProgressiveAssimilationFrame,
        getClassicalNahuatlConsonantLossRules,
        buildClassicalNahuatlConsonantLossFrame,
        getClassicalNahuatlConsonantPhoneShiftRules,
        buildClassicalNahuatlConsonantPhoneShiftFrame,
        getClassicalNahuatlVowelElisionRules,
        buildClassicalNahuatlVowelElisionFrame,
        getClassicalNahuatlLongVowelGlottalRules,
        buildClassicalNahuatlLongVowelGlottalFrame,
        getClassicalNahuatlProsodicContourRules,
        buildClassicalNahuatlProsodicContourFrame,
        isClassicalNahuatlTranscriptionAnalysisFrame,
        normalizeClassicalNahuatlOrthographyInput,
        splitClassicalNahuatlLesson2Graphemes,
        getInvalidClassicalNahuatlGraphemes,
        buildClassicalNahuatlTranscriptionSourceFrame,
        isClassicalNahuatlTranscriptionSourceFrame,
        isClassicalNahuatlTranscriptionCarrierFrame,
        buildClassicalNahuatlTranscriptionFrame,
        isClassicalNahuatlTranscriptionFrame,
        getClassicalNahuatlFirewallRules
      });
      return globalTarget;
    }
    installClassicalNahuatlTranscriptionClassicGlobals();

    const api = {};
    Object.defineProperty(api, "CLASSICAL_NAHUATL_TRANSCRIPTION_FRAME_VERSION", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_TRANSCRIPTION_FRAME_VERSION; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_TRANSCRIPTION_SOURCE_VERSION", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_TRANSCRIPTION_SOURCE_VERSION; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_PROFILE_ID", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_PROFILE_ID; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_TRANSCRIPTION_SOURCE_DOCUMENT", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_TRANSCRIPTION_SOURCE_DOCUMENT; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON2_LETTERS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON2_LETTERS; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON2_DIGRAPHS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON2_DIGRAPHS; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON2_MORPHIC_CARRIERS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON2_MORPHIC_CARRIERS; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON2_BOUNDARY_CHARS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON2_BOUNDARY_CHARS; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON2_SIMPLE_VOWELS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON2_SIMPLE_VOWELS; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_TRANSCRIPTION_VOWEL_SYSTEM_FACTS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_TRANSCRIPTION_VOWEL_SYSTEM_FACTS; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_TRANSCRIPTION_VOWEL_CARRIERS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_TRANSCRIPTION_VOWEL_CARRIERS; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_TRANSCRIPTION_CONSONANT_SYSTEM_FACTS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_TRANSCRIPTION_CONSONANT_SYSTEM_FACTS; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_TRANSCRIPTION_CONSONANT_CARRIERS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_TRANSCRIPTION_CONSONANT_CARRIERS; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_TRANSCRIPTION_SIGEME_CARRIERS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_TRANSCRIPTION_SIGEME_CARRIERS; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON2_SPELLING_CHANGE_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON2_SPELLING_CHANGE_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON2_OPEN_TRANSITION_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON2_OPEN_TRANSITION_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON2_SYLLABLE_STRUCTURE_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON2_SYLLABLE_STRUCTURE_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON2_SUPPORTIVE_VOWEL_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON2_SUPPORTIVE_VOWEL_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON2_STRESS_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON2_STRESS_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON2_CONSONANTAL_LENGTH_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON2_CONSONANTAL_LENGTH_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON2_ASSIMILATION_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON2_ASSIMILATION_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON2_CONSONANT_LOSS_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON2_CONSONANT_LOSS_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON2_CONSONANT_PHONE_SHIFT_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON2_CONSONANT_PHONE_SHIFT_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON2_VOWEL_ELISION_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON2_VOWEL_ELISION_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON2_LONG_VOWEL_GLOTTAL_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON2_LONG_VOWEL_GLOTTAL_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON2_PROSODIC_CONTOUR_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON2_PROSODIC_CONTOUR_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_FIREWALL_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_FIREWALL_RULES; },
    });
    api.getClassicalNahuatlTranscriptionRuntimeTarget = getClassicalNahuatlTranscriptionRuntimeTarget;
    api.getClassicalNahuatlLetters = getClassicalNahuatlLetters;
    api.getClassicalNahuatlDigraphs = getClassicalNahuatlDigraphs;
    api.normalizeClassicalNahuatlOrthographyInput = normalizeClassicalNahuatlOrthographyInput;
    api.normalizeClassicalNahuatlSimpleVowel = normalizeClassicalNahuatlSimpleVowel;
    api.normalizeClassicalNahuatlPhoneme = normalizeClassicalNahuatlPhoneme;
    api.normalizeClassicalNahuatlSyllablePosition = normalizeClassicalNahuatlSyllablePosition;
    api.inferClassicalNahuatlLesson2SyllablePosition = inferClassicalNahuatlLesson2SyllablePosition;
    api.getClassicalNahuatlSpellingChangeRules = getClassicalNahuatlSpellingChangeRules;
    api.copyClassicalNahuatlLesson2OpenTransitionRule = copyClassicalNahuatlLesson2OpenTransitionRule;
    api.getClassicalNahuatlOpenTransitionRules = getClassicalNahuatlOpenTransitionRules;
    api.copyClassicalNahuatlLesson2SyllableStructureRule = copyClassicalNahuatlLesson2SyllableStructureRule;
    api.getClassicalNahuatlSyllableStructureRules = getClassicalNahuatlSyllableStructureRules;
    api.copyClassicalNahuatlLesson2StressRule = copyClassicalNahuatlLesson2StressRule;
    api.getClassicalNahuatlSupportiveVowelRules = getClassicalNahuatlSupportiveVowelRules;
    api.getClassicalNahuatlStressRules = getClassicalNahuatlStressRules;
    api.copyClassicalNahuatlLesson2ConsonantalLengthRule = copyClassicalNahuatlLesson2ConsonantalLengthRule;
    api.getClassicalNahuatlConsonantalLengthRules = getClassicalNahuatlConsonantalLengthRules;
    api.copyClassicalNahuatlLesson2AssimilationRule = copyClassicalNahuatlLesson2AssimilationRule;
    api.getClassicalNahuatlAssimilationRules = getClassicalNahuatlAssimilationRules;
    api.copyClassicalNahuatlLesson2ConsonantLossRule = copyClassicalNahuatlLesson2ConsonantLossRule;
    api.getClassicalNahuatlConsonantLossRules = getClassicalNahuatlConsonantLossRules;
    api.copyClassicalNahuatlLesson2ConsonantPhoneShiftRule = copyClassicalNahuatlLesson2ConsonantPhoneShiftRule;
    api.getClassicalNahuatlConsonantPhoneShiftRules = getClassicalNahuatlConsonantPhoneShiftRules;
    api.copyClassicalNahuatlLesson2VowelElisionRule = copyClassicalNahuatlLesson2VowelElisionRule;
    api.getClassicalNahuatlVowelElisionRules = getClassicalNahuatlVowelElisionRules;
    api.copyClassicalNahuatlLesson2LongVowelGlottalRule = copyClassicalNahuatlLesson2LongVowelGlottalRule;
    api.getClassicalNahuatlLongVowelGlottalRules = getClassicalNahuatlLongVowelGlottalRules;
    api.copyClassicalNahuatlLesson2ProsodicContourRule = copyClassicalNahuatlLesson2ProsodicContourRule;
    api.getClassicalNahuatlProsodicContourRules = getClassicalNahuatlProsodicContourRules;
    api.isClassicalNahuatlSyllableVowel = isClassicalNahuatlSyllableVowel;
    api.normalizeClassicalNahuatlStressSyllableInput = normalizeClassicalNahuatlStressSyllableInput;
    api.getClassicalNahuatlSyllableSoundSegmentations = getClassicalNahuatlSyllableSoundSegmentations;
    api.buildClassicalNahuatlSyllablesFromSounds = buildClassicalNahuatlSyllablesFromSounds;
    api.buildClassicalNahuatlSyllableStructureFrame = buildClassicalNahuatlSyllableStructureFrame;
    api.buildClassicalNahuatlSupportiveVowelFrame = buildClassicalNahuatlSupportiveVowelFrame;
    api.buildClassicalNahuatlStressFrame = buildClassicalNahuatlStressFrame;
    api.normalizeClassicalNahuatlConsonantSound = normalizeClassicalNahuatlConsonantSound;
    api.getClassicalNahuatlLongConsonantSpelling = getClassicalNahuatlLongConsonantSpelling;
    api.buildClassicalNahuatlConsonantalLengthFrame = buildClassicalNahuatlConsonantalLengthFrame;
    api.normalizeClassicalNahuatlAssimilationSound = normalizeClassicalNahuatlAssimilationSound;
    api.isClassicalNahuatlNasal = isClassicalNahuatlNasal;
    api.isClassicalNahuatlSibilant = isClassicalNahuatlSibilant;
    api.isClassicalNahuatlBilabial = isClassicalNahuatlBilabial;
    api.getClassicalNahuatlLongAssimilationOutcome = getClassicalNahuatlLongAssimilationOutcome;
    api.getClassicalNahuatlPartialAssimilationOutcome = getClassicalNahuatlPartialAssimilationOutcome;
    api.getClassicalNahuatlAssimilationRuleOutcome = getClassicalNahuatlAssimilationRuleOutcome;
    api.findClassicalNahuatlLesson2AssimilationRule = findClassicalNahuatlLesson2AssimilationRule;
    api.buildClassicalNahuatlAssimilationFrame = buildClassicalNahuatlAssimilationFrame;
    api.getClassicalNahuatlBoundaryConsonant = getClassicalNahuatlBoundaryConsonant;
    api.splitClassicalNahuatlLesson210AssimilationSpelling = splitClassicalNahuatlLesson210AssimilationSpelling;
    api.buildClassicalNahuatlProgressiveAssimilationFrame = buildClassicalNahuatlProgressiveAssimilationFrame;
    api.normalizeClassicalNahuatlLongVowelForLoss = normalizeClassicalNahuatlLongVowelForLoss;
    api.findClassicalNahuatlLesson2ConsonantLossRule = findClassicalNahuatlLesson2ConsonantLossRule;
    api.buildClassicalNahuatlConsonantLossFrame = buildClassicalNahuatlConsonantLossFrame;
    api.normalizeClassicalNahuatlExposedPosition = normalizeClassicalNahuatlExposedPosition;
    api.findClassicalNahuatlLesson2ConsonantPhoneShiftRule = findClassicalNahuatlLesson2ConsonantPhoneShiftRule;
    api.buildClassicalNahuatlConsonantPhoneShiftFrame = buildClassicalNahuatlConsonantPhoneShiftFrame;
    api.buildClassicalNahuatlVowelElisionFrame = buildClassicalNahuatlVowelElisionFrame;
    api.buildClassicalNahuatlLongVowelGlottalFrame = buildClassicalNahuatlLongVowelGlottalFrame;
    api.buildClassicalNahuatlProsodicContourFrame = buildClassicalNahuatlProsodicContourFrame;
    api.normalizeClassicalNahuatlBoundaryType = normalizeClassicalNahuatlBoundaryType;
    api.findClassicalNahuatlLesson2OpenTransitionRule = findClassicalNahuatlLesson2OpenTransitionRule;
    api.buildClassicalNahuatlOpenTransitionFrame = buildClassicalNahuatlOpenTransitionFrame;
    api.findClassicalNahuatlLesson2SpellingChangeRule = findClassicalNahuatlLesson2SpellingChangeRule;
    api.getClassicalNahuatlSpellingChangeExample = getClassicalNahuatlSpellingChangeExample;
    api.buildClassicalNahuatlSpellingChangeFrame = buildClassicalNahuatlSpellingChangeFrame;
    api.buildClassicalNahuatlDerivationalBoundarySpellingFrame = buildClassicalNahuatlDerivationalBoundarySpellingFrame;
    api.isClassicalNahuatlTranscriptionAnalysisFrame = isClassicalNahuatlTranscriptionAnalysisFrame;
    api.isClassicalNahuatlBoundaryChar = isClassicalNahuatlBoundaryChar;
    api.splitClassicalNahuatlLesson2Graphemes = splitClassicalNahuatlLesson2Graphemes;
    api.getInvalidClassicalNahuatlGraphemes = getInvalidClassicalNahuatlGraphemes;
    api.buildClassicalNahuatlTranscriptionSourceFrame = buildClassicalNahuatlTranscriptionSourceFrame;
    api.isClassicalNahuatlTranscriptionSourceFrame = isClassicalNahuatlTranscriptionSourceFrame;
    api.isClassicalNahuatlTranscriptionCarrierFrame = isClassicalNahuatlTranscriptionCarrierFrame;
    api.projectClassicalNahuatlTranscriptionFormula = projectClassicalNahuatlTranscriptionFormula;
    api.projectClassicalNahuatlTranscriptionWritten = projectClassicalNahuatlTranscriptionWritten;
    api.buildClassicalNahuatlTranscriptionFrame = buildClassicalNahuatlTranscriptionFrame;
    api.isClassicalNahuatlTranscriptionFrame = isClassicalNahuatlTranscriptionFrame;
    api.getClassicalNahuatlFirewallRules = getClassicalNahuatlFirewallRules;
    api.installClassicalNahuatlTranscriptionClassicGlobals = installClassicalNahuatlTranscriptionClassicGlobals;
    return api;
}

export function installClassicalNahuatlTranscriptionGlobals(targetObject = globalThis) {
    const api = createClassicalNahuatlTranscriptionApi(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
