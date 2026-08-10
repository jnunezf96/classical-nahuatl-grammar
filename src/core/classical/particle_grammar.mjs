// Canonical modern ESM module.

export function createClassicalNahuatlParticlesApi(
  targetObject = globalThis,
  installationContext = null
) {
    const CLASSICAL_NAHUATL_LESSON3_PARTICLES_VERSION = 1;
    const CLASSICAL_NAHUATL_LESSON3_PROFILE_ID = "classical-nahuatl";
    const CLASSICAL_NAHUATL_LESSON3_SOURCE_DOCUMENT = "ANDREWS_TRANSCRIPTION_CANVAS.md";
    const CLASSICAL_NAHUATL_LESSON3_PARTICLE_AUTHORITY_NOTE = "Lesson 3 authorizes particle frames only; it does not authorize nuclear-clause formulas.";
    const issuedParticleSentenceLayerFrames = new WeakMap();
    const issuedParticleSourceFrames = new WeakMap();
    const issuedParticleResultFrames = new WeakMap();
    const issuedParticleLexicalFactFrames = new WeakMap();
    const issuedParticleHonorificSourceFrames = new WeakMap();
    const issuedParticleHonorificResultFrames = new WeakMap();
    const grammarFrameOwnerCapability =
      installationContext?.grammarFrameOwnerCapability || null;
    const CLASSICAL_NAHUATL_LESSON3_CLAUSE_RELATION_MARKERS = Object.freeze({
      "l3-ca": "ca",
      "l3-cuix": "cuix",
      "l3-tla": "tla",
      "l3-ma": "ma",
      "l3-e-vocative": "vocative-e",
      "l3-in": "in",
      "l3-mah": "mah",
      "l3-ahzo": "ahzo",
      "l3-in-tla": "in-tla",
      "l3-ma-zo": "ma-zo",
      "l3-ma-zo-tel": "ma-zo-tel",
      "l58-ahmo": "ahmo",
      "l58-mah-ca": "mah-ca",
      "l58-quemah": "frozen-quemah",
      "l58-quemahca": "frozen-quemahca",
      "l58-oc-eh": "haste-collocation",
      "l58-tia-oc-eh": "haste-collocation",
      "l58-ma-oc-eh": "haste-collocation",
      "l58-tia-cuel": "haste-collocation",
      "l58-tia-cuel-eh": "haste-collocation",
      "l58-tia-cuel-ehhuatl": "haste-collocation",
      "l58-ma-cuel": "haste-collocation",
      "l58-ma-cuel-eh": "haste-collocation",
      "l58-ma-cuel-ehhuatl": "haste-collocation",
      "l58-ma-ye-cuel": "haste-collocation",
      "l58-ma-ye-cuel-eh": "haste-collocation",
      "l58-tia-ye-cuel": "haste-collocation",
      "l58-tia-ye-cuel-eh": "haste-collocation"
    });
    const CLASSICAL_NAHUATL_PARTICLE_SEGMENTS_BY_ID = Object.freeze({
      "l3-e-vocative": Object.freeze(["#e"]),
      "l3-ah-negative": Object.freeze(["ah#"]),
      "l3-ca-negative": Object.freeze(["ca#"]),
      "l3-ahzo": Object.freeze(["ah#", "zo"]),
      "l3-ma-cazo": Object.freeze(["mā", "ca#", "zo"]),
      "l3-ahtel": Object.freeze(["ah#", "tēl"]),
      "l3-aya": Object.freeze(["ah#", "ye"]),
      "l3-ma-caye": Object.freeze(["mā", "ca#", "ye"]),
      "l3-ma-caya": Object.freeze(["mā", "ca#", "ya"]),
      "l3-ahoc": Object.freeze(["ah#", "oc"]),
      "l3-ayoc": Object.freeze(["ah#", "yoc"]),
      "l3-aoc": Object.freeze(["ah#", "oc"]),
      "l3-ma-caoc": Object.freeze(["mā", "ca#", "oc"]),
      "l3-ahno": Object.freeze(["ah#", "nō"]),
      "l3-ma-cano": Object.freeze(["mā", "ca#", "nō"]),
      "l3-in-tla-ca": Object.freeze(["in", "tlā", "ca#"]),
      "l3-ma-cano-zo": Object.freeze(["mā", "ca#", "no", "zo"]),
      "l3-ahno-zo": Object.freeze(["ah#", "no", "zo"]),
      "l3-ahzo-ah": Object.freeze(["ah#", "zo", "ah#"]),
      "l3-ahca-zo-ah": Object.freeze(["ah", "ca", "zo", "ah#"]),
      "l3-ahzo-ca-ah": Object.freeze(["ah#", "zo", "ca", "ah#"]),
      "l3-auh-in-tla-ca": Object.freeze(["auh", "in", "tlā", "ca#"]),
      "l3-otzin": Object.freeze(["ō", "tzin"]),
      "l3-auhtzin": Object.freeze(["auh", "tzin"]),
      "l3-ca-no-zotzin": Object.freeze(["ca", "no", "zo", "tzin"]),
      "l58-ahmo": Object.freeze(["ahmō"]),
      "l58-mah-ca": Object.freeze(["mah", "ca#"]),
      "l58-quemah": Object.freeze(["quē", "mah"]),
      "l58-quemahca": Object.freeze(["quē", "mah", "ca#"]),
      "l58-oc-eh": Object.freeze(["oc", "eh"]),
      "l58-tia-oc-eh": Object.freeze(["tiā", "oc", "eh"]),
      "l58-ma-oc-eh": Object.freeze(["mā", "oc", "eh"]),
      "l58-tia-cuel": Object.freeze(["tiā", "cuēl"]),
      "l58-tia-cuel-eh": Object.freeze(["tiā", "cuēl", "eh"]),
      "l58-tia-cuel-ehhuatl": Object.freeze(["tiā", "cuēl", "ehhuātl"]),
      "l58-ma-cuel": Object.freeze(["mā", "cuēl"]),
      "l58-ma-cuel-eh": Object.freeze(["mā", "cuēl", "eh"]),
      "l58-ma-cuel-ehhuatl": Object.freeze(["mā", "cuēl", "ehhuātl"]),
      "l58-ma-ye-cuel": Object.freeze(["mā", "ye", "cuēl"]),
      "l58-ma-ye-cuel-eh": Object.freeze(["mā", "ye", "cuēl", "eh"]),
      "l58-tia-ye-cuel": Object.freeze(["tiā", "ye", "cuēl"]),
      "l58-tia-ye-cuel-eh": Object.freeze(["tiā", "ye", "cuēl", "eh"])
    });
    const CLASSICAL_NAHUATL_PARTICLE_CONTEXTUAL_VARIANTS_BY_ID = Object.freeze({
      "l58-oc-eh": Object.freeze(["oc yeh"]),
      "l58-tia-oc-eh": Object.freeze(["tiā oc yeh"]),
      "l58-ma-oc-eh": Object.freeze(["mā oc yeh"]),
      "l58-tia-cuel-eh": Object.freeze(["tiā cuēl yeh"]),
      "l58-tia-cuel-ehhuatl": Object.freeze(["tiā cuēl yehhuātl"]),
      "l58-ma-cuel-eh": Object.freeze(["mā cuēl yeh"]),
      "l58-ma-cuel-ehhuatl": Object.freeze(["mā cuēl yehhuātl"]),
      "l58-ma-ye-cuel-eh": Object.freeze(["mā ye cuēl yeh"]),
      "l58-tia-ye-cuel-eh": Object.freeze(["tiā ye cuēl yeh"])
    });
    const CLASSICAL_NAHUATL_PARTICLE_WRITTEN_BY_ID = Object.freeze({
      "l3-e-vocative": "e",
      "l58-mah-ca": "mah ca"
    });
    const CLASSICAL_NAHUATL_PARTICLE_SENTENCE_ADJUNCTION_UNPROVED_IDS =
      Object.freeze(new Set(["cn-achi"]));
    const CLASSICAL_NAHUATL_PARTICLE_EXTERNAL_AUTHORITY_KEYS =
      Object.freeze(new Set([
        "answer",
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
        "restored",
        "restoredstate",
        "result",
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
    const CLASSICAL_NAHUATL_LESSON3_LEGAL_WITNESS_TAG_IDS = Object.freeze(["cn-l3-particle-inventory", "cn-l3-particle-separation", "cn-l3-functional-classes", "cn-l3-negativizing-particles", "cn-l3-particle-collocations", "cn-l3-honorificized-particles"]);
    const CLASSICAL_NAHUATL_PARTICLE_STRUCTURE_RULES = Object.freeze([Object.freeze({
      id: "classical-particle-minor-monomorphemic-unit",
      unitKind: "particle",
      lexicalRank: "minor",
      morphemeCount: 1,
      rule: "A particle is a minor lexical item and is monomorphemic."
    }), Object.freeze({
      id: "classical-particle-no-internal-morphology",
      internalMorphologicalStructure: "none",
      rule: "A single particle has no internal morphological structure."
    }), Object.freeze({
      id: "classical-particle-syllable-profile",
      normalSyllableCount: 1,
      exceptionalSyllableCount: 2,
      rule: "Particles are normally monosyllabic, with a small disyllabic inventory."
    }), Object.freeze({
      id: "classical-particle-clause-dependent-class",
      dependency: "close-to-nuclear-clause",
      exceptionClass: "clitic-like-particles",
      rule: "Some particles require close dependence on a nuclear clause."
    }), Object.freeze({
      id: "classical-vocative-particle-left-bound",
      particleId: "l3-e-vocative",
      placement: "written-suffixed-to-preceding-nominal-nuclear-clause",
      rule: "The vocative particle e is written attached to the preceding nominal nuclear clause."
    }), Object.freeze({
      id: "classical-dependent-particle-stress",
      dependencyDoesNotSuppressStress: true,
      rule: "Even a clause-dependent particle can bear stress."
    }), Object.freeze({
      id: "classical-vocative-particle-stress",
      particleId: "l3-e-vocative",
      stressed: true,
      rule: "The vocative particle e is stressed."
    }), Object.freeze({
      id: "classical-degenerate-clause-particle-classification",
      defaultClassification: "particle",
      reclassificationRequiresClearProof: true,
      rule: "A possible degenerate nuclear clause remains classified as a particle absent clear contrary proof."
    })]);
    const CLASSICAL_NAHUATL_LESSON3_FUNCTIONAL_CLASS_RULES = Object.freeze([Object.freeze({
      id: "classical-particle-independent-utterance-limit",
      normalIndependentUtterance: false,
      exceptionsExist: true,
      rule: "Particles are not normally independent utterances, though specified exceptions exist."
    }), Object.freeze({
      id: "classical-particle-principal-clause-limit",
      normalPrincipalClause: false,
      exceptionsExist: true,
      rule: "Particles are not normally principal clauses, though specified exceptions exist."
    }), Object.freeze({
      id: "classical-particle-compound-embed-limit",
      normalCompoundEmbed: false,
      rule: "Particles rarely serve as compound-stem embeds, and some never do."
    }), Object.freeze({
      id: "classical-negative-ah-compound-embed-exception",
      particleId: "l3-ah-negative",
      compoundEmbedPossible: true,
      rule: "The negative particle ah can exceptionally occur inside a stem before another embed."
    }), Object.freeze({
      id: "classical-particle-matrix-stem-prohibition",
      matrixStemAllowed: false,
      rule: "A particle never serves as a matrix stem."
    }), Object.freeze({
      id: "classical-particle-typical-functions",
      functions: Object.freeze(["adverbial-modifier", "exclamation"]),
      rule: "Particles typically function as adverbial modifiers or exclamations."
    }), Object.freeze({
      id: "classical-particle-specialized-functions",
      specializedFunctionsExist: true,
      rule: "Some particle adverbial functions have specialized into other functions."
    }), Object.freeze({
      id: "classical-interjection-independent-utterance-distribution",
      functionScope: "interjection",
      mostCanOccurAlone: true,
      rule: "Most interjections may occur alone as utterances."
    }), Object.freeze({
      id: "cn-l3-32-particle-use-limits",
      section: "3.2",
      lineStart: 2037,
      lineEnd: 2042,
      exactWitness: "Particles never serve as\na matrix stem.",
      rule: "Particles are not normal independent principal clauses and never serve as a matrix stem.",
      particleAuthorityOnly: true
    }), Object.freeze({
      id: "cn-l3-32-clause-introducers",
      section: "3.2.1",
      lineStart: 2050,
      lineEnd: 2059,
      exactWitness: "1. Clause introducers:",
      functionScope: "clause-introducer",
      forms: Object.freeze(["ca", "cuix?", "tla", "ma", "o"]),
      rule: "These particles introduce clauses; this is particle-boundary authority, not clause generation authority."
    }), Object.freeze({
      id: "cn-l3-32-adjunctors",
      section: "3.2.2",
      lineStart: 2060,
      lineEnd: 2102,
      exactWitness: "2. Adjunctors (adjoined-clause introducers):",
      functionScope: "adjunctor",
      forms: Object.freeze(["in", "anca", "mah"]),
      rule: "Adjunctors mark adjoined material; the particle frame cannot decide the adjoined clause itself."
    }), Object.freeze({
      id: "cn-l3-32-conjunctor",
      section: "3.2.3",
      lineStart: 2103,
      lineEnd: 2104,
      exactWitness: "3. Clause and sentence conjunctor:",
      functionScope: "conjunctor",
      forms: Object.freeze(["auh"]),
      rule: "The conjunctor is a particle relation marker; it does not become a nuclear-clause predicate."
    }), Object.freeze({
      id: "cn-l3-32-adverbial-modifiers",
      section: "3.2.4",
      lineStart: 2105,
      lineEnd: 2125,
      exactWitness: "4. Adverbial modifiers:",
      functionScope: "adverbial-modifier",
      forms: Object.freeze(["mec", "nee", "tel", "oc", "zan", "za", "ye", "o#", "no", "zo", "quin", "ach", "at", "ac"]),
      rule: "Adverbial particles modify from the particle lane and do not occupy predicate-stem slots."
    }), Object.freeze({
      id: "cn-l3-32-interjections",
      section: "3.2.5",
      lineStart: 2126,
      lineEnd: 2152,
      exactWitness: "5. Interjections (most can occur alone as an utterance",
      functionScope: "interjection",
      forms: Object.freeze(["o", "#e", "a", "ax", "hue", "hueya", "ihyo", "no", "auh", "hui", "elele", "ahcua", "ye ye", "ih i", "yeya", "xi", "xiuh", "iye"]),
      rule: "Interjections can be utterance-level particles; that does not make them nuclear clauses."
    })]);
    const CLASSICAL_NAHUATL_LESSON3_NEGATIVIZING_PARTICLE_RULES = Object.freeze([Object.freeze({
      id: "cn-l3-33-negative-particle-set",
      section: "3.3",
      lineStart: 2153,
      lineEnd: 2156,
      exactWitness: "Nahuatl has two negative particles: ah# and ca#",
      forms: Object.freeze(["ah#", "ca#"]),
      rule: "Lesson 3 recognizes ah# and ca# as negativizing particles."
    }), Object.freeze({
      id: "cn-l3-33-prefixal-adverbs",
      section: "3.3",
      lineStart: 2153,
      lineEnd: 2156,
      exactWitness: "They are prefixal adverbs and therefore modify the item that is attached to their right",
      attachment: "bound-to-following",
      rule: "Negativizing particles attach to the item on their right as particle-prefix authority only."
    }), Object.freeze({
      id: "cn-l3-33-negative-prefixes-attach-to-particles",
      section: "3.3",
      attachmentTargets: Object.freeze(["particle", "other-right-hand-item"]),
      rule: "The negative particle prefixes may attach to another particle."
    }), Object.freeze({
      id: "cn-l3-33-ca-complementary-distribution",
      section: "3.3",
      lineStart: 2156,
      lineEnd: 2159,
      exactWitness: "ca# occurs only after the particles ma and tla",
      caLicensedAfter: Object.freeze(["ma", "tla", "mah"]),
      rule: "ca# requires a preceding ma, tla, or mah particle context; ah# is the elsewhere member."
    }), Object.freeze({
      id: "cn-l3-33-ca-written-as-prefix",
      section: "3.3",
      lineStart: 2171,
      lineEnd: 2174,
      exactWitness: "In these lessons ca# is treated as the prefix it is.",
      rule: "Traditional solid spelling is not authority; ca# remains a prefixal particle in the proof frame."
    }), Object.freeze({
      id: "cn-l3-33-solid-segmentation-violates-prefix-relation",
      section: "3.3",
      traditionalSolidSegmentationAuthorized: false,
      rule: "Joining ca to the preceding particle misrepresents its prefixal relation to following material."
    }), Object.freeze({
      id: "cn-l3-33-clause-ca-negative-ca-distinction",
      section: "3.3",
      identities: Object.freeze(["l3-ca", "l3-ca-negative"]),
      rule: "Clause-introducing ca and prefixal negative ca are distinct particle identities."
    })]);
    const CLASSICAL_NAHUATL_LESSON3_PARTICLE_COLLOCATION_RULES = Object.freeze([Object.freeze({
      id: "cn-l3-34-sequence",
      section: "3.4",
      lineStart: 2181,
      lineEnd: 2185,
      exactWitness: "Very frequently two or more particles are combined in sequence.",
      rule: "A collocation is a sequence of two or more particles."
    }), Object.freeze({
      id: "cn-l3-34-lexicalized-unit",
      section: "3.4",
      lexicalizationPossible: true,
      compositionalMeaningRequired: false,
      rule: "A particle collocation may lexicalize with a meaning not compositionally predictable from its members."
    }), Object.freeze({
      id: "cn-l3-34-fixed-order",
      section: "3.4",
      lineStart: 2181,
      lineEnd: 2185,
      exactWitness: "Normally they occur in a fixed order.",
      rule: "Lesson 3 collocation output must preserve the witnessed particle order."
    }), Object.freeze({
      id: "cn-l3-34-stress-group",
      section: "3.4",
      normalProsodicUnit: "stress-group",
      rule: "A particle collocation normally constitutes one stress group."
    }), Object.freeze({
      id: "cn-l3-34-nonfinal-no-shortening",
      section: "3.4",
      particleId: "l3-no-adverbial",
      context: "nonfinal-collocation-member",
      output: "no",
      rule: "Nonfinal nō in a particle collocation may lose vowel length."
    }), Object.freeze({
      id: "cn-l3-34-written-separately",
      section: "3.4",
      lineStart: 2185,
      lineEnd: 2188,
      exactWitness: "In these lessons the members of particle collocations are written separately.",
      rule: "Classical output keeps collocation members separate even when traditional spelling writes them solid."
    }), Object.freeze({
      id: "cn-l3-34-adjunctor-in-optional",
      section: "3.4",
      lineStart: 2189,
      lineEnd: 2191,
      exactWitness: "The adjunctor in is frequently\nthe first member",
      rule: "Initial in is collocation-member authority and does not itself build the subordinate clause."
    }), Object.freeze({
      id: "cn-l3-34-in-subordinates-following-material",
      section: "3.4",
      particleId: "l3-in",
      scope: "following-adjoined-material",
      rule: "Initial in marks the material it introduces as subordinate to another sentence part."
    }), Object.freeze({
      id: "cn-l3-34-in-tla-ca-prefix-segmentation",
      section: "3.4",
      collocationId: "l3-in-tla-ca",
      negativePrefixHost: "following-material",
      rule: "In in tlā ca, negative ca remains a right-attached prefix rather than joining tlā."
    }), Object.freeze({
      id: "cn-l3-34-za-zan-conjunction",
      section: "3.4",
      collocationId: "l3-za-zan",
      structure: "conjunction",
      writtenMembers: Object.freeze(["zā", "zan"]),
      rule: "The zā zan collocation is a conjunction structure whose members remain separate."
    }), Object.freeze({
      id: "cn-l3-34-collocational-ca-scope",
      section: "3.4",
      collocationalCaEquivalentTo: "zā",
      licensedCoMembers: Object.freeze(["ah#", "zo"]),
      rule: "Collocational ca is equivalent to zā only in collocations with ah and zo."
    })]);
    const CLASSICAL_NAHUATL_LESSON3_HONORIFICIZED_PARTICLE_RULES = Object.freeze([Object.freeze({
      id: "cn-l3-35-tzin-attaches-to-particle",
      section: "3.5",
      lineStart: 2239,
      lineEnd: 2243,
      exactWitness: "It can also be attached to a single\nparticle",
      rule: "(tzin)-tli- can attach to a single particle."
    }), Object.freeze({
      id: "cn-l3-35-tzin-final-collocation-member",
      section: "3.5",
      lineStart: 2241,
      lineEnd: 2244,
      exactWitness: "or to the final member of a particle collocation",
      rule: "When tzin attaches to the final member of a collocation, the whole collocation is honorificized."
    }), Object.freeze({
      id: "cn-l3-35-english-translation-limit",
      section: "3.5",
      lineStart: 2242,
      lineEnd: 2244,
      exactWitness: "There is no way to capture the honorific quality",
      rule: "English gloss cannot authorize or exhaust the honorific particle quality."
    }), Object.freeze({
      id: "cn-l3-35-tzin-affective-device",
      section: "3.5",
      sourceNounstem: "(tzin)-tli-",
      operation: "particle-honorificization",
      rule: "The affective matrix nounstem tzin supplies particle honorificization."
    })]);
    const CLASSICAL_NAHUATL_LESSON3_HONORIFICIZED_PARTICLE_EXAMPLES = Object.freeze([Object.freeze({
      sourceForm: "otzin",
      baseParticle: "o",
      finalMember: "o",
      honorificMarker: "tzin",
      hostKind: "single-particle",
      lineStart: 2245,
      lineEnd: 2245
    }), Object.freeze({
      sourceForm: "auhtzin",
      baseParticle: "auh",
      finalMember: "auh",
      honorificMarker: "tzin",
      hostKind: "single-particle",
      lineStart: 2246,
      lineEnd: 2246
    }), Object.freeze({
      sourceForm: "ca no zotzin",
      baseCollocation: "ca no zo",
      finalMember: "zo",
      honorificMarker: "tzin",
      hostKind: "collocation-final-member",
      lineStart: 2247,
      lineEnd: 2247
    })]);
    const CLASSICAL_NAHUATL_LESSON3_PARTICLE_SOURCE_ROWS = Object.freeze(`
l3-ca|ca|clause-introducer|clause-initial|3.2.1
l3-cuix|cuix?|clause-introducer|clause-initial|3.2.1
l3-tla|tlā|clause-introducer|clause-initial|3.2.1
l3-ma|mā|clause-introducer|clause-initial|3.2.1
l3-o-behold|ō|clause-introducer|clause-initial|3.2.1
l3-in|in|adjunctor|clause-initial|3.2.2
l3-anca|anca|adjunctor|clause-initial|3.2.2
l3-mah|mah|adjunctor|clause-initial|3.2.2
l3-auh-conjunctor|auh|conjunctor|clause-initial|3.2.3
l3-mec|mec|adverbial-modifier|floating|3.2.4
l3-nee|nee|adverbial-modifier|floating|3.2.4
l3-tel|tēl|adverbial-modifier|floating|3.2.4
l3-oc|oc|adverbial-modifier|floating|3.2.4
l3-zan|zan|adverbial-modifier|floating|3.2.4
l3-za|zā|adverbial-modifier|floating|3.2.4
l3-ye|ye|adverbial-modifier|floating|3.2.4
l3-o-antecessive|ō#|adverbial-modifier|bound-to-following|3.2.4
l3-no-adverbial|nō|adverbial-modifier|floating|3.2.4
l3-zo|zo|adverbial-modifier|floating|3.2.4
l3-quin|quin|adverbial-modifier|floating|3.2.4
l3-ach|ach|adverbial-modifier|floating|3.2.4
cn-achi|achi|adverbial-modifier|floating|1.13
l3-at|at|adverbial-modifier|floating|3.2.4
l3-ac|ac|adverbial-modifier|floating|3.2.4
l3-o-interjection|o|interjection|independent-utterance|3.2.5
l3-e-vocative|#e|interjection|bound-to-previous|3.2.5
l3-a|a|interjection|independent-utterance|3.2.5
l3-ax|ax|interjection|independent-utterance|3.2.5
l3-hue|hue|interjection|independent-utterance|3.2.5
l3-hueya|hueya|interjection|independent-utterance|3.2.5
l3-yahua|yahua|interjection|independent-utterance|3.2.5
l3-ihyo|ihyo|interjection|independent-utterance|3.2.5
l3-no-interjection|nō|interjection|independent-utterance|3.2.5
l3-auh-interjection|āuh|interjection|independent-utterance|3.2.5
l3-hui|hui|interjection|independent-utterance|3.2.5
l3-elele|elele|interjection|independent-utterance|3.2.5
l3-elele-ay|elele ay ay ay|interjection|independent-utterance|3.2.5
l3-ahcua|ahcua|interjection|independent-utterance|3.2.5
l3-ye-ye|ye ye|interjection|independent-utterance|3.2.5
l3-ih-i|ih i|interjection|independent-utterance|3.2.5
l3-yeya|yeya|interjection|independent-utterance|3.2.5
l3-xi|xi|interjection|independent-utterance|3.2.5
l3-xiuh|xiuh|interjection|independent-utterance|3.2.5
l3-iye|iye|interjection|independent-utterance|3.2.5
l3-ah-negative|ah#|negation|bound-to-following|3.3
l3-ca-negative|ca#|negation|bound-to-following|3.3
l3-ahzo|ahzo|negation|independent-utterance|3.3
l3-ma-cazo|mā cazo|negation|collocation-sequence|3.3
l3-ahtel|ahtēl?|negation|floating|3.3
l3-aya|aya|negation|floating|3.3
l3-ma-caye|mā caye|negation|collocation-sequence|3.3
l3-ma-caya|mā caya|negation|collocation-sequence|3.3
l3-ahoc|ahoc|negation|floating|3.3
l3-ayoc|ayoc|negation|floating|3.3
l3-aoc|aoc|negation|floating|3.3
l3-ma-caoc|mā caoc|negation|collocation-sequence|3.3
l3-ahno|ahnō|negation|floating|3.3
l3-ma-cano|mā canō|negation|collocation-sequence|3.3
l3-in-tla|in tlā|collocation|collocation-sequence|3.4
l3-in-tla-ca|in tlā ca#|collocation|collocation-sequence|3.4
l3-in-tla-zan|in tlā zan|collocation|collocation-sequence|3.4
l3-in-tla-za|in tlā zā|collocation|collocation-sequence|3.4
l3-in-aya|in aya|collocation|collocation-sequence|3.4
l3-in-tla-no-zo|in tlā no zo|collocation|collocation-sequence|3.4
l3-no-zo|no zo|collocation|collocation-sequence|3.4
l3-ahno-zo|ahno zo|collocation|collocation-sequence|3.4
l3-ma-cano-zo|mā cano zo|collocation|collocation-sequence|3.4
l3-no-zan|no zan|collocation|collocation-sequence|3.4
l3-za-zo|zā zo|collocation|collocation-sequence|3.4
l3-ahza-zo|ahzā zo|collocation|collocation-sequence|3.4
l3-ahza-zo-oc|ahzā zo oc|collocation|collocation-sequence|3.4
l3-ma-za-zo|mā zā zo|collocation|collocation-sequence|3.4
l3-za-zan|zā zan|collocation|collocation-sequence|3.4
l3-zan-no|zan no|collocation|collocation-sequence|3.4
l3-zan-ye-no|zan ye no|collocation|collocation-sequence|3.4
l3-ahzo-za|ahzo zā|collocation|collocation-sequence|3.4
l3-ahzo-zan|ahzo zan|collocation|collocation-sequence|3.4
l3-ahzo-ah|ahzo ah#|collocation|collocation-sequence|3.4
l3-ahzo-ma|ahzo mā|collocation|collocation-sequence|3.4
l3-oc-no|oc nō|collocation|collocation-sequence|3.4
l3-za-oc-no|zā oc nō|collocation|collocation-sequence|3.4
l3-auh-in-tla|auh in tlā|collocation|collocation-sequence|3.4
l3-auh-in-tla-ca|auh in tlā ca#|collocation|collocation-sequence|3.4
l3-ma-tel|mā tēl|collocation|collocation-sequence|3.4
l3-ma-zo|mā zo|collocation|collocation-sequence|3.4
l3-ma-zo-tel|mā zo tēl|collocation|collocation-sequence|3.4
l3-ihyo-ma|ihyo mā ... !|collocation|collocation-sequence|3.4
l3-ihyo-iyahua|ihyo iyahua!|collocation|collocation-sequence|3.4
l3-ahca-zo|ahca zo|collocation|collocation-sequence|3.4
l3-ahzo-ca|ahzo ca|collocation|collocation-sequence|3.4
l3-ahca-zo-ah|ahca zo ah#|collocation|collocation-sequence|3.4
l3-ahzo-ca-ah|ahzo ca ah#|collocation|collocation-sequence|3.4
l3-otzin|ōtzin|honorificized|floating|3.5
l3-auhtzin|āuhtzin|honorificized|floating|3.5
l3-ca-no-zotzin|ca no zotzin|honorificized|collocation-sequence|3.5
l58-ahmo|ahmō|clause-introducer|independent-utterance|58.5
l58-mah-ca|mah ca#|adjunctor|bound-to-following|58.4
l58-quemah|quēmah|collocation|independent-utterance|58.4
l58-quemahca|quemahca|collocation|independent-utterance|58.4
l58-oc-eh|oc eh|collocation|independent-utterance|58.3
l58-tia-oc-eh|tiā oc eh|collocation|independent-utterance|58.3
l58-ma-oc-eh|mā oc eh|collocation|independent-utterance|58.3
l58-tia-cuel|tiā cuēl|collocation|independent-utterance|58.3
l58-tia-cuel-eh|tiā cuēl eh|collocation|independent-utterance|58.3
l58-tia-cuel-ehhuatl|tiā cuēl ehhuātl|collocation|independent-utterance|58.3
l58-ma-cuel|mā cuēl|collocation|independent-utterance|58.3
l58-ma-cuel-eh|mā cuēl eh|collocation|independent-utterance|58.3
l58-ma-cuel-ehhuatl|mā cuēl ehhuātl|collocation|independent-utterance|58.3
l58-ma-ye-cuel|mā ye cuēl|collocation|independent-utterance|58.3
l58-ma-ye-cuel-eh|mā ye cuēl eh|collocation|independent-utterance|58.3
l58-tia-ye-cuel|tiā ye cuēl|collocation|independent-utterance|58.3
l58-tia-ye-cuel-eh|tiā ye cuēl eh|collocation|independent-utterance|58.3
`.trim().split("\n").map(row => Object.freeze(row.split("|"))));
    const CLASSICAL_NAHUATL_PARTICLE_LEXICAL_FACT_ROWS = Object.freeze(`
l3-ca|indeed; in fact|principal-clause introducer; never a causal conjunction
l3-cuix|perhaps; perchance|interrogative clause introducer
l3-tla|if; in the event that; in case; provided that|conditional clause introducer
l3-ma|if only; would that|wish clause introducer
l3-o-behold|here is; here are; here you have; behold|presentative clause introducer
l3-in|context-selected adjunctor|optional adjoined-unit marker; not a determiner
l3-anca|therefore; consequently; hence; apparently; evidently|adjunctor expressing inference or consequence
l3-mah|as though; such that|adjunctor
l3-auh-conjunctor|and; but|clause and sentence conjunctor
l3-mec|then|adverbial modifier
l3-nee|then|adverbial modifier
l3-tel|nevertheless; despite that; otherwise|adverbial modifier
l3-oc|still; yet; for a little while|adverbial modifier
l3-zan|only; just; nothing else but|unqualified restrictive adverbial modifier
l3-za|now only|diminutive-from-prior-state adverbial modifier
l3-ye|already; soon|soon with future tense
l3-o-antecessive|already|right-bound antecessive; licensed before a past-tense form
l3-no-adverbial|also|adverbial modifier
l3-zo|surely|meaning uncertain; follows mā or tlacah in nonnegative use
l3-quin|just now; presently|just now with past tense; presently with future tense
l3-ach|possibly; indeterminably; I do not know|adverbial modifier
cn-achi|somewhat; a little|distinct from ach; ach before iuh or iuhqui is its liaison form; y for i is documentary spelling only
l3-at|perhaps; maybe|variant of ac; distinct from interrogative pronoun āc
l3-ac|perhaps; maybe|variant of at; distinct from interrogative pronoun āc
l3-o-interjection|huh; really; is that a fact; oh; ouch; hey|surprise, pain, or vocative initiation
l3-e-vocative|O; Hey|male-address vocative; obligatorily left-bound; always stressed
l3-a|alas|interjection
l3-ax|alas; ouch; ow|normally doubled; may be tripled
l3-hue|alas|interjection
l3-hueya|alas|interjectional variant of hue
l3-yahua|alas|interjectional variant associated with hue
l3-ihyo|woe; alas|depression or dejection
l3-no-interjection|woe; alas|female-speaker interjection
l3-auh-interjection|good; so|approval, surprise, resignation, or indignation
l3-hui|wow; holy smoke; gracious|interjection
l3-elele|ow; ouch; oh|interjection
l3-elele-ay|ow; ouch; oh|expanded elele interjection
l3-ahcua|ouch; oh|interjection
l3-ye-ye|aha|detecting dishonest or improper action
l3-ih-i|aha|detecting dishonest or improper action
l3-yeya|aha|detecting dishonest or improper action
l3-xi|psst; hush|attention or silence interjection
l3-xiuh|shoo|frightening away animals
l3-iye|yes|affirmative interjection
l3-ah-negative|not|prefixal adverb; elsewhere negative outside licensed ca contexts
l3-ca-negative|not|prefixal adverb; requires preceding mā, tlā, or mah
l3-ahzo|perhaps|negativized particle; may stand as an utterance
l3-ma-cazo|if only perhaps; since; inasmuch as|fixed negative collocation
l3-ahtel|is it not clear; it cannot be otherwise|negativized particle
l3-aya|not yet|negativized particle
l3-ma-caye|if only not yet|fixed negative collocation
l3-ma-caya|if only not yet|variant of mā caye
l3-ahoc|no longer; not any more; not another|negativized particle
l3-ayoc|no longer; not any more; not another|variant of ahoc
l3-aoc|no longer; not any more; not another|variant of ahoc
l3-ma-caoc|if only no longer|ca may surface as cay before a vowel in some texts
l3-ahno|not also; neither; not either; nor|negativized particle
l3-ma-cano|if only not also; if only neither|fixed negative collocation
l3-in-tla|if|optional initial adjunctor collocation
l3-in-tla-ca|if not|ca remains right-attached prefix and separate from tlā
l3-in-tla-zan|and if; if only; if just|no particle member means and
l3-in-tla-za|and if; and if still; but if now only|no particle member means and or but
l3-in-aya|before|collocation
l3-in-tla-no-zo|and if perhaps; by chance; maybe; but if|fixed-order collocation
l3-no-zo|either|nonfinal nō is shortened
l3-ahno-zo|neither|collocation
l3-ma-cano-zo|if only neither|collocation
l3-no-zan|still; up until now|nonfinal nō is shortened
l3-za-zo|-ever; no matter; any|fixed-order collocation
l3-ahza-zo|perhaps; maybe|fixed-order collocation
l3-ahza-zo-oc|perhaps still; perhaps another|elision may affect traditional spelling
l3-ma-za-zo|be that as it may; regardless|fixed-order collocation
l3-za-zan|any which way; foolishly; nonsensically|conjunctive collocation
l3-zan-no|likewise; by the same token; similarly|fixed-order collocation
l3-zan-ye-no|likewise; by the same token; similarly|fixed-order collocation
l3-ahzo-za|perhaps; maybe; possibly|fixed-order collocation
l3-ahzo-zan|perhaps; maybe; possibly|fixed-order collocation
l3-ahzo-ah|perhaps not|negative prefix attaches to following material
l3-ahzo-ma|perhaps|interrogative-like collocation
l3-oc-no|and moreover; and also; similarly|no member independently expresses and
l3-za-oc-no|even more so; furthermore|traditional spelling may reflect elision
l3-auh-in-tla|and if|fixed-order collocation
l3-auh-in-tla-ca|and if not|ca remains a prefixal negative
l3-ma-tel|let it nevertheless be; maybe it will be for the best|dilemma-response collocation
l3-ma-zo|even if; even though; although|fixed-order collocation
l3-ma-zo-tel|supposing that; let us assume that|fixed-order collocation
l3-ihyo-ma|oh if only|exclamatory collocation
l3-ihyo-iyahua|oh woe|exclamatory collocation
l3-ahca-zo|perhaps; maybe|collocational ca is equivalent to zā
l3-ahzo-ca|perhaps; maybe|collocational ca is equivalent to zā
l3-ahca-zo-ah|perhaps not; maybe not|collocational ca is equivalent to zā
l3-ahzo-ca-ah|perhaps not; maybe not|collocational ca is equivalent to zā
l3-otzin|behold|honorificized single particle
l3-auhtzin|good; good|honorificized single particle
l3-ca-no-zotzin|thus it is|honorificizes the entire collocation through its final member
`.trim().split("\n").map(row => Object.freeze(row.split("|"))));
    const CLASSICAL_NAHUATL_PARTICLE_LEXICAL_FACTS_BY_ID =
      Object.freeze(Object.fromEntries(
        CLASSICAL_NAHUATL_PARTICLE_LEXICAL_FACT_ROWS.map(
          ([particleId, meaningText, usageText]) => [
            particleId,
            Object.freeze({
              particleId,
              meanings: Object.freeze(
                meaningText.split(";").map(value => value.trim())
                  .filter(Boolean)
              ),
              usageFacts: Object.freeze(
                usageText.split(";").map(value => value.trim())
                  .filter(Boolean)
              ),
            }),
          ]
        )
      ));
    const CLASSICAL_NAHUATL_LESSON3_PARTICLE_GROUPS = Object.freeze([
      Object.freeze({ id: "lesson3-functional-classes", sectionPrefix: "3.2", sectionLabel: "3.2" }),
      Object.freeze({ id: "lesson3-negation", sectionPrefix: "3.3", sectionLabel: "3.3" }),
      Object.freeze({ id: "lesson3-collocations", sectionPrefix: "3.4", sectionLabel: "3.4" }),
      Object.freeze({ id: "lesson3-honorificized", sectionPrefix: "3.5", sectionLabel: "3.5" }),
      Object.freeze({ id: "shared-later-particle-collocations", sectionPrefix: "58.", sectionLabel: "Shared collocations" })
    ]);
    function getClassicalNahuatlParticleRuntimeTarget() {
      return typeof targetObject !== "undefined" && targetObject || (typeof globalThis !== "undefined" ? globalThis : null);
    }
    function getClassicalNahuatlProfileWallFrame(options = {}) {
      const builder = getClassicalNahuatlParticleRuntimeTarget()?.buildClassicalNahuatlProfileWallFrame;
      if (typeof builder === "function") {
        return builder(CLASSICAL_NAHUATL_LESSON3_PROFILE_ID, {
          sourceDocument: options.sourceDocument || CLASSICAL_NAHUATL_LESSON3_SOURCE_DOCUMENT
        });
      }
      return {
        kind: "classical-nahuatl-profile-wall-frame",
        separationMechanism: "deployment-boundary",
        spellingInspection: "not-performed",
        sourceDocument: options.sourceDocument || CLASSICAL_NAHUATL_LESSON3_SOURCE_DOCUMENT,
      };
    }
    function normalizeClassicalNahuatlParticleLookupValue(value = "") {
      return String(value == null ? "" : value)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/gu, "")
        .trim()
        .toLowerCase()
        .replace(/[¡!?]/gu, "")
        .replace(/\u2026/gu, "...")
        .replace(/\s+/gu, " ");
    }
    function cloneClassicalNahuatlLesson3Rule(rule = {}) {
      const cloned = {
        ...rule
      };
      ["forms", "caLicensedAfter"].forEach(key => {
        if (Array.isArray(rule[key])) {
          cloned[key] = Array.from(rule[key]);
        }
      });
      return cloned;
    }
    function cloneClassicalNahuatlLesson3HonorificizedExample(example = {}) {
      return {
        ...example
      };
    }
    function getClassicalNahuatlFunctionalClassRules() {
      return CLASSICAL_NAHUATL_LESSON3_FUNCTIONAL_CLASS_RULES.map(cloneClassicalNahuatlLesson3Rule);
    }
    function getClassicalNahuatlNegativizingParticleRules() {
      return CLASSICAL_NAHUATL_LESSON3_NEGATIVIZING_PARTICLE_RULES.map(cloneClassicalNahuatlLesson3Rule);
    }
    function getClassicalNahuatlParticleStructureRules() {
      return CLASSICAL_NAHUATL_PARTICLE_STRUCTURE_RULES.map(cloneClassicalNahuatlLesson3Rule);
    }
    function getClassicalNahuatlParticleCollocationRules() {
      return CLASSICAL_NAHUATL_LESSON3_PARTICLE_COLLOCATION_RULES.map(cloneClassicalNahuatlLesson3Rule);
    }
    function getClassicalNahuatlHonorificizedParticleRules() {
      return CLASSICAL_NAHUATL_LESSON3_HONORIFICIZED_PARTICLE_RULES.map(cloneClassicalNahuatlLesson3Rule);
    }
    function getClassicalNahuatlHonorificizedParticleExamples() {
      return CLASSICAL_NAHUATL_LESSON3_HONORIFICIZED_PARTICLE_EXAMPLES.map(cloneClassicalNahuatlLesson3HonorificizedExample);
    }
    function getClassicalNahuatlParticleFunctionClassFrames() {
      return Array.from(new Set(
        CLASSICAL_NAHUATL_LESSON3_PARTICLE_SOURCE_ROWS.map(row => row[2])
      )).map(scope => ({
        kind: "classical-nahuatl-particle-particle-function-class-frame",
        scope,
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_LESSON3_SOURCE_DOCUMENT
      }));
    }
    function getClassicalNahuatlParticleGroups() {
      return CLASSICAL_NAHUATL_LESSON3_PARTICLE_GROUPS.map(group => ({
        ...group,
        label: group.sectionLabel,
        description: "",
        entryCount: CLASSICAL_NAHUATL_LESSON3_PARTICLE_SOURCE_ROWS
          .filter(row => row[4].startsWith(group.sectionPrefix)).length
      }));
    }
    function getClassicalNahuatlParticleSourceEntries(options = {}) {
      const limit = Number(options.limit || 0);
      const mapped = CLASSICAL_NAHUATL_LESSON3_PARTICLE_SOURCE_ROWS.map(row => {
        const [id, sourceForm, functionScope, placementScope, section] = row;
        const lexicalFacts =
          CLASSICAL_NAHUATL_PARTICLE_LEXICAL_FACTS_BY_ID[id] || null;
        const aliases = [sourceForm];
        const formulaSegments = CLASSICAL_NAHUATL_PARTICLE_SEGMENTS_BY_ID[id]
          || Object.freeze(
            sourceForm
              .replace(/[!?]+$/gu, "")
              .split(/\s+/gu)
              .filter(Boolean)
          );
        return {
          kind: "classical-nahuatl-particle-entry",
          version: CLASSICAL_NAHUATL_LESSON3_PARTICLES_VERSION,
          id,
          sourceForm,
          displayForm: sourceForm,
          aliases,
          formulaSegments,
          contextualVariants:
            CLASSICAL_NAHUATL_PARTICLE_CONTEXTUAL_VARIANTS_BY_ID[id] || [],
          lookupKeys: aliases.map(normalizeClassicalNahuatlParticleLookupValue).filter(Boolean).filter((value, index, list) => list.indexOf(value) === index),
          functionScope,
          functionClass: {
            kind: "classical-nahuatl-particle-function-class-frame",
            scope: functionScope
          },
          placement: {
            kind: "classical-nahuatl-particle-placement-frame",
            scope: placementScope
          },
          gloss: lexicalFacts?.meanings?.join("; ") || "",
          meanings: lexicalFacts?.meanings || Object.freeze([]),
          usageFacts: lexicalFacts?.usageFacts || Object.freeze([]),
          lexicalFactsDerivedByOwner: true,
          lexicalFactsUserSelectable: false,
          clauseComposable: Boolean(
            ["clause-introducer", "adjunctor", "conjunctor"]
              .includes(functionScope)
            && placementScope === "clause-initial"
          ),
          sentenceAdverbialComposable: Boolean(
            functionScope === "adverbial-modifier"
            && placementScope === "floating"
            && !CLASSICAL_NAHUATL_PARTICLE_SENTENCE_ADJUNCTION_UNPROVED_IDS
              .has(id)
          ),
          curriculumCoordinate: section,
          curriculumCoordinateAuthority: false,
          outputLanguage: "Classical Nahuatl",
          orthographyPolicy: "transcription-direct",
          grammarGenerationAllowed: false,
          sourceFormAuthority: false,
          displayTextAuthority: false,
          particleOutputAllowed: Boolean(sourceForm)
        };
      });
      return limit > 0 ? mapped.slice(0, limit) : mapped;
    }
    function findClassicalNahuatlLesson3ParticleEntries(candidate = "") {
      const requested = String(candidate == null ? "" : candidate).trim();
      const lookup = normalizeClassicalNahuatlParticleLookupValue(candidate);
      if (!requested && !lookup) {
        return [];
      }
      return getClassicalNahuatlParticleSourceEntries().filter(entry => entry.id === requested || entry.lookupKeys.includes(lookup));
    }
    function findClassicalNahuatlLesson3ParticleEntry(candidate = "") {
      return findClassicalNahuatlLesson3ParticleEntries(candidate)[0] || null;
    }
    function getClassicalNahuatlParticleEntries(options = {}) {
      return getClassicalNahuatlParticleSourceEntries(options);
    }
    function findClassicalNahuatlParticleEntries(candidate = "") {
      return findClassicalNahuatlLesson3ParticleEntries(candidate);
    }
    function findClassicalNahuatlParticleEntry(candidate = "") {
      return findClassicalNahuatlLesson3ParticleEntry(candidate);
    }
    function freezeClassicalNahuatlLesson3ParticleResult(value, seen = new Set()) {
      if (!value || typeof value !== "object" || Object.isFrozen(value) || seen.has(value)) {
        return value;
      }
      seen.add(value);
      Object.values(value).forEach(child => {
        freezeClassicalNahuatlLesson3ParticleResult(child, seen);
      });
      return Object.freeze(value);
    }
    function findClassicalNahuatlLesson3ExternalAuthorityPath(
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
        if (
          CLASSICAL_NAHUATL_PARTICLE_EXTERNAL_AUTHORITY_KEYS
            .has(normalizedKey)
        ) {
          return childPath;
        }
        if (Object.prototype.hasOwnProperty.call(descriptor, "value")) {
          const nested = findClassicalNahuatlLesson3ExternalAuthorityPath(
            descriptor.value,
            childPath,
            seen
          );
          if (nested) return nested;
        }
      }
      return "";
    }
    function buildBlockedClassicalNahuatlParticleSourceFrame(blockReason) {
      return freezeClassicalNahuatlLesson3ParticleResult({
        kind: "classical-nahuatl-particle-source-frame",
        version: CLASSICAL_NAHUATL_LESSON3_PARTICLES_VERSION,
        authorizationStatus: "blocked",
        blockReason,
        particleId: "",
        constituents: Object.freeze([]),
        sourceConstituentsOnly: true,
        lexicalFactsUserSelectable: false,
        callerSuppliedAuthorityAccepted: false,
        externalProjectionAuthorityAccepted: false,
        pedagogicalIndexAccepted: false
      });
    }
    function buildClassicalNahuatlParticleSourceFrame(candidate = "") {
      if (
        candidate
        && typeof candidate === "object"
        && issuedParticleSourceFrames.has(candidate)
      ) {
        return candidate;
      }
      if (candidate && typeof candidate === "object") {
        const authorityPath =
          findClassicalNahuatlLesson3ExternalAuthorityPath(candidate);
        return buildBlockedClassicalNahuatlParticleSourceFrame(
          authorityPath
            ? `classical-particle-external-authority-forbidden:${authorityPath}`
            : "classical-particle-source-selection-must-be-lexical-identity"
        );
      }
      const requested = String(candidate == null ? "" : candidate).trim();
      if (!requested) {
        return buildBlockedClassicalNahuatlParticleSourceFrame(
          "classical-particle-identity-required"
        );
      }
      const entries = findClassicalNahuatlLesson3ParticleEntries(requested);
      if (entries.length !== 1) {
        return buildBlockedClassicalNahuatlParticleSourceFrame(
          entries.length > 1
            ? "classical-particle-identity-ambiguous"
            : "classical-particle-identity-not-licensed"
        );
      }
      const entry = entries[0];
      const particleId = entry.id;
      const constituents = Object.freeze(
        Array.from(entry.formulaSegments || []).map((segment, index) =>
          Object.freeze({
            role: entry.formulaSegments.length > 1
              ? `particle-member-${index + 1}`
              : "particle",
            value: segment,
          })
        )
      );
      const sourceFrame =
        freezeClassicalNahuatlLesson3ParticleResult({
          kind: "classical-nahuatl-particle-source-frame",
          version: CLASSICAL_NAHUATL_LESSON3_PARTICLES_VERSION,
          authorizationStatus: "authorized",
          blockReason: "",
          particleId,
          constituents,
          sourceConstituentsOnly: true,
          lexicalFactsDerivedByOwner: true,
          lexicalFactsUserSelectable: false,
          callerSuppliedAuthorityAccepted: false,
          externalProjectionAuthorityAccepted: false,
          pedagogicalIndexAccepted: false
        });
      issuedParticleSourceFrames.set(
        sourceFrame,
        Object.freeze({ particleId, constituents })
      );
      return sourceFrame;
    }
    function isClassicalNahuatlParticleSourceFrame(frame = null) {
      const receipt = frame && typeof frame === "object"
        ? issuedParticleSourceFrames.get(frame)
        : null;
      return Boolean(
        receipt
        && frame.kind === "classical-nahuatl-particle-source-frame"
        && frame.version === CLASSICAL_NAHUATL_LESSON3_PARTICLES_VERSION
        && frame.authorizationStatus === "authorized"
        && frame.blockReason === ""
        && frame.particleId === receipt.particleId
        && frame.constituents === receipt.constituents
        && Array.isArray(frame.constituents)
        && frame.constituents.length > 0
        && frame.sourceConstituentsOnly === true
        && frame.lexicalFactsDerivedByOwner === true
        && frame.lexicalFactsUserSelectable === false
        && frame.callerSuppliedAuthorityAccepted === false
        && frame.externalProjectionAuthorityAccepted === false
        && frame.pedagogicalIndexAccepted === false
        && Object.isFrozen(frame)
      );
    }
    function getClassicalNahuatlParticleWrittenSurface(entry = null) {
      if (!entry) return "";
      if (
        Object.prototype.hasOwnProperty.call(
          CLASSICAL_NAHUATL_PARTICLE_WRITTEN_BY_ID,
          entry.id
        )
      ) {
        return CLASSICAL_NAHUATL_PARTICLE_WRITTEN_BY_ID[entry.id];
      }
      return String(entry.sourceForm || "")
        .split(/\s+/gu)
        .map(segment => segment.replace(/^#|#$/gu, ""))
        .join(" ");
    }
    function buildClassicalNahuatlParticleLexicalFactFrame(entry = null) {
      if (!entry || !entry.id) {
        return null;
      }
      const lexicalFacts =
        CLASSICAL_NAHUATL_PARTICLE_LEXICAL_FACTS_BY_ID[entry.id] || null;
      const formulaSegments = Object.freeze(
        Array.from(entry.formulaSegments || [])
      );
      const adjunctorProfile = entry.id === "l3-in"
        ? freezeClassicalNahuatlLesson3ParticleResult({
            category: "adjunctor",
            contextualTranslation: true,
            adjoinedUnitMarking: "almost-always-optional",
            adjoinedUnitScope: Object.freeze(["single-item", "multi-item-sequence"]),
            determinerStatus: "not-a-determiner",
            nounstemDefinitenessContrast: "absent",
            grammarUnit: "nuclear-clause",
            nounstemActualizationRequirement: Object.freeze([
              "nominal-nuclear-clause",
              "embed",
            ]),
            actualizationDeterminerPosition: "none",
            ceSemanticAnalysis: "nominal-nuclear-clause-one-in-number",
          })
        : null;
      const vocativeProfile = entry.id === "l3-e-vocative"
        ? freezeClassicalNahuatlLesson3ParticleResult({
            function: "vocative-direct-address",
            speakerGender: "male",
            attachmentHost: "preceding-nominal-nuclear-clause",
            pronunciationAttachment: "obligatory",
            writingAttachment: "obligatory",
            stressBehavior: "attracts-stress",
            writtenStressAccent: "required-unique-item",
            boundaryNotation: "hash-marks-obligatory-attachment-to-preceding-item",
          })
        : null;
      const frame = freezeClassicalNahuatlLesson3ParticleResult({
        kind: "classical-nahuatl-particle-lexical-fact-frame",
        version: CLASSICAL_NAHUATL_LESSON3_PARTICLES_VERSION,
        authorizationStatus: "authorized",
        blockReason: "",
        particleId: entry.id,
        unitStructure: formulaSegments.length > 1
          ? "particle-collocation"
          : "single-particle",
        formulaSegments,
        invariant: true,
        paradigmatic: false,
        internalMorphologicalStructure:
          formulaSegments.length > 1
            ? "ordered-particle-members"
            : "none",
        meanings: lexicalFacts?.meanings || Object.freeze([]),
        usageFacts: lexicalFacts?.usageFacts || Object.freeze([]),
        functionScope: entry.functionScope,
        placementScope: entry.placement?.scope || "",
        adjunctorProfile,
        vocativeProfile,
        readOnly: true,
        userSelectable: false,
        generationAuthority: false,
        callerSuppliedAuthorityAccepted: false,
        lessonMetadataAuthority: false,
        translationAuthority: false,
        documentaryEvidenceAuthority: false,
      });
      issuedParticleLexicalFactFrames.set(
        frame,
        Object.freeze({
          particleId: entry.id,
          formulaSegments: frame.formulaSegments,
          meanings: frame.meanings,
          usageFacts: frame.usageFacts,
          adjunctorProfile: frame.adjunctorProfile,
          vocativeProfile: frame.vocativeProfile,
        })
      );
      return frame;
    }
    function isClassicalNahuatlParticleLexicalFactFrame(frame = null) {
      const receipt = frame && typeof frame === "object"
        ? issuedParticleLexicalFactFrames.get(frame)
        : null;
      return Boolean(
        receipt
        && frame.kind
          === "classical-nahuatl-particle-lexical-fact-frame"
        && frame.authorizationStatus === "authorized"
        && frame.blockReason === ""
        && frame.particleId === receipt.particleId
        && frame.formulaSegments === receipt.formulaSegments
        && frame.meanings === receipt.meanings
        && frame.usageFacts === receipt.usageFacts
        && frame.adjunctorProfile === receipt.adjunctorProfile
        && frame.vocativeProfile === receipt.vocativeProfile
        && frame.invariant === true
        && frame.paradigmatic === false
        && frame.readOnly === true
        && frame.userSelectable === false
        && frame.generationAuthority === false
        && frame.callerSuppliedAuthorityAccepted === false
        && frame.lessonMetadataAuthority === false
        && frame.translationAuthority === false
        && frame.documentaryEvidenceAuthority === false
        && Object.isFrozen(frame)
      );
    }
    function getClassicalNahuatlClauseRelationMarkerOptions() {
      const entryById = new Map(
        getClassicalNahuatlParticleSourceEntries().map(entry => [entry.id, entry])
      );
      return Object.freeze(
        Object.entries(CLASSICAL_NAHUATL_LESSON3_CLAUSE_RELATION_MARKERS)
          .map(([particleId, semanticMarker]) => {
            const entry = entryById.get(particleId);
            if (!entry) return null;
            return Object.freeze({
              kind: "classical-nahuatl-particle-result-option",
              version: CLASSICAL_NAHUATL_LESSON3_PARTICLES_VERSION,
              particleId,
              semanticMarker,
              sourceForm: entry.sourceForm,
              functionScope: entry.functionScope,
              placementScope: entry.placement?.scope || "",
              unitKind: "particle",
              sourceFormAuthority: false,
              displayTextAuthority: false
            });
          })
          .filter(Boolean)
      );
    }
    function getClassicalNahuatlParticleClauseRelationMarkerOptions() {
      return getClassicalNahuatlClauseRelationMarkerOptions();
    }
    function buildClassicalNahuatlParticleResultFrame(
      sourceFrame = null,
      options = {}
    ) {
      const runtimeTarget = getClassicalNahuatlParticleRuntimeTarget();
      const requiredCapabilityNames = [
        "buildGrammarFormulaRecord",
        "buildGrammarFormulaRealizationRecord",
        "buildGrammarResultFrame",
        "buildGrammarFrame"
      ];
      const missingCapability = !grammarFrameOwnerCapability
        ? "grammarFrameOwnerCapability"
        : requiredCapabilityNames.find(name => (
            typeof runtimeTarget?.[name] !== "function"
          )) || "";
      const authorityPath =
        findClassicalNahuatlLesson3ExternalAuthorityPath(options);
      const allowedOptionKeys = new Set(["precedingParticleSourceFrame"]);
      const unexpectedOptionKey = Reflect.ownKeys(options)
        .map(String)
        .find(key => !allowedOptionKeys.has(key));
      const sourceAuthorized =
        isClassicalNahuatlParticleSourceFrame(sourceFrame);
      const entry = sourceAuthorized
        ? getClassicalNahuatlParticleSourceEntries()
          .find(candidate => candidate.id === sourceFrame.particleId)
          || null
        : null;
      const caContextRequired = entry?.id === "l3-ca-negative";
      const precedingParticleSourceFrame =
        options.precedingParticleSourceFrame || null;
      const precedingSourceAuthorized =
        isClassicalNahuatlParticleSourceFrame(
          precedingParticleSourceFrame
        );
      const caContextLicensed = !caContextRequired || (
        precedingSourceAuthorized
        && ["l3-ma", "l3-tla", "l3-mah"].includes(
          precedingParticleSourceFrame.particleId
        )
      );
      const semanticMarker = entry
        ? CLASSICAL_NAHUATL_LESSON3_CLAUSE_RELATION_MARKERS[entry.id]
          || "particle"
        : "";
      const lexicalFactFrame = entry
        ? buildClassicalNahuatlParticleLexicalFactFrame(entry)
        : null;
      const formulaSegments = entry
        ? Array.from(entry.formulaSegments || [])
        : [];
      const contextualVariants = entry
        ? Array.from(entry.contextualVariants || [])
        : [];
      const contextualRealizationFrame =
        freezeClassicalNahuatlLesson3ParticleResult({
          kind: "classical-nahuatl-particle-contextual-realization-frame",
          version: CLASSICAL_NAHUATL_LESSON3_PARTICLES_VERSION,
          particleId: entry?.id || "",
          variants: contextualVariants.map(writtenSurface => ({
            kind: "classical-nahuatl-particle-contextual-realization",
            variantId: "y-initial",
            formulaSegments: formulaSegments.map(segment => (
              segment === "eh"
                ? "yeh"
                : segment === "ehhuātl"
                  ? "yehhuātl"
                  : segment
            )),
            writtenSurface,
            formulaDerivedFromWrittenProjection: false,
            writtenDerivedFromFormulaProjection: false
          })),
          lexicalAvailabilityDerivedByOwner: true,
          lexicalAvailabilityUserSelectable: false,
          callerSuppliedAuthorityAccepted: false
        });
      const formula = formulaSegments.join(" + ");
      const writtenSurface = entry
        ? getClassicalNahuatlParticleWrittenSurface(entry)
        : "";
      const authorized = Boolean(
        sourceAuthorized
        && entry
        && !authorityPath
        && !unexpectedOptionKey
        && caContextLicensed
        && isClassicalNahuatlParticleLexicalFactFrame(lexicalFactFrame)
        && !missingCapability
      );
      if (!authorized) {
        const blocked = freezeClassicalNahuatlLesson3ParticleResult({
          kind: "classical-nahuatl-particle-result-frame",
          version: CLASSICAL_NAHUATL_LESSON3_PARTICLES_VERSION,
          authorizationStatus: "blocked",
          blockReason: authorityPath
            ? `classical-particle-external-authority-forbidden:${authorityPath}`
            : unexpectedOptionKey
              ? `classical-particle-result-option-forbidden:${unexpectedOptionKey}`
              : !sourceAuthorized
                ? sourceFrame?.blockReason
                  || "classical-particle-owner-issued-source-required"
                : caContextRequired && !precedingParticleSourceFrame
                  ? "classical-particle-ca-preceding-context-required"
                  : caContextRequired && !precedingSourceAuthorized
                    ? "classical-particle-ca-owner-issued-context-required"
                    : !caContextLicensed
                      ? "classical-particle-ca-context-mismatch"
                      : missingCapability
                        ? `classical-lesson3-particle-result-capability-required:${missingCapability}`
                        : "classical-particle-lexical-authorization-required",
          particleId: entry?.id || "",
          semanticMarker,
          surface: "",
          sourceFrame: sourceAuthorized ? sourceFrame : null,
          grammarFrame: null,
          frames: null,
          formula: "",
          formulaProjection: null,
          writtenProjection: null,
          contextualRealizationFrame: null,
          lexicalFactFrame: null,
          typedFrameAuthority: false,
          lexicalAuthorizationOwnerIssued: false,
          paradigmatic: false,
          callerSuppliedAuthorityAccepted: false,
          formulaStringAuthority: false,
          surfaceStringAuthority: false,
          sourceFormAuthority: false,
          lessonMetadataAuthority: false,
          formulaDerivedFromWrittenProjection: false,
          writtenDerivedFromFormulaProjection: false
        });
        issuedParticleResultFrames.set(
          blocked,
          Object.freeze({
            sourceFrame: blocked.sourceFrame,
            authorizationStatus: "blocked",
            formulaRecord: null,
            formulaRealizationRecord: null,
            formulaProjection: null,
            writtenProjection: null,
            contextualRealizationFrame: null,
            lexicalFactFrame: null,
            grammarFrame: null,
            formula: "",
            surface: ""
          })
        );
        return blocked;
      }
      const formulaRecord = runtimeTarget.buildGrammarFormulaRecord({
        id: `classical-particle:${entry.id}`,
        unit: "PARTICLE",
        formula,
        formulaSlots: {
          particle: {
            slot: "PARTICLE",
            particleId: entry.id,
            semanticMarker,
            segments: formulaSegments
          }
        },
        sourceFrame,
        source: "owner-issued-particle-source"
      });
      const formulaRealizationRecord =
        runtimeTarget.buildGrammarFormulaRealizationRecord({
          id: `${formulaRecord.id}:realization`,
          formulaRecord,
          unit: "PARTICLE",
          segmentFrames: [{
            slot: "particle-written-realization",
            role: "particle-written-boundary-realization",
            formulaValue: entry.id,
            surface: writtenSurface,
            sourceFrameId: `particle-source:${entry.id}`,
            classicalRealizationAuthority: "Andrews transcription"
          }],
          surfaceForms: [writtenSurface],
          classicalRealizationAuthority: "Andrews transcription",
          source: "owner-issued-particle-written-projection"
        });
      const resultFrame = runtimeTarget.buildGrammarResultFrame({
        ok: true,
        surface: writtenSurface,
        surfaceForms: [writtenSurface],
        outputKind: "particle",
        generationRoute: "particle-result",
        sourceInput: sourceFrame,
        formulaRecord,
        formulaRealizationRecord,
        provenance: {
          sourceDocument: CLASSICAL_NAHUATL_LESSON3_SOURCE_DOCUMENT,
          particleId: entry.id,
          sourceFrame,
          sourceFormAuthority: false
        }
      });
      const grammarFrame = runtimeTarget.buildGrammarFrame({
        authorityFrame: {
          grammarAuthority: "Andrews transcription",
          sourceDocument: CLASSICAL_NAHUATL_LESSON3_SOURCE_DOCUMENT,
          particleIdentity: entry.id,
          sourceFrame,
          lessonMetadataAuthority: false
        },
        orthographyFrame: {
          languageProfileId: CLASSICAL_NAHUATL_LESSON3_PROFILE_ID,
          policy: "transcription-direct",
          sourceFormAuthority: false
        },
        unitFrame: {
          unitKind: "particle",
          outputKind: "particle",
          particleId: entry.id,
          semanticMarker,
          marking: semanticMarker,
          functionScope: entry.functionScope,
          placementScope: entry.placement?.scope || "",
          authorizedForNuclearClause: false
        },
        morphBoundaryFrame: {
          particleId: entry.id,
          semanticMarker,
          marking: semanticMarker,
          placementScope: entry.placement?.scope || ""
        },
        nuclearClauseFrame: {
          authorizedForNuclearClause: false,
          particleAuthorityOnly: true
        },
        routeContract: {
          routeFamily: "particle",
          routeStage: "standalone-result",
          sourceContract: {
            sourceKind: "classical-nahuatl-particle-source-frame",
            sourceFrame,
            particleId: entry.id
          },
          targetContract: {
            outputKind: "particle",
            semanticMarker,
            marking: semanticMarker
          },
          generationAllowed: true,
          blockingDiagnostics: []
        },
        resultFrame
      }, grammarFrameOwnerCapability);
      const issued = freezeClassicalNahuatlLesson3ParticleResult({
        kind: "classical-nahuatl-particle-result-frame",
        version: CLASSICAL_NAHUATL_LESSON3_PARTICLES_VERSION,
        authorizationStatus: "authorized",
        blockReason: "",
        sourceFrame,
        precedingParticleSourceFrame:
          caContextRequired ? precedingParticleSourceFrame : null,
        particleId: entry.id,
        semanticMarker,
        surface: writtenSurface,
        formula,
        formulaSegments,
        contextualRealizationFrame,
        lexicalFactFrame,
        grammarFrame,
        frames: grammarFrame,
        formulaRecord: grammarFrame.resultFrame.formulaRecord,
        formulaRealizationRecord:
          grammarFrame.resultFrame.formulaRealizationRecord,
        formulaProjection: Object.freeze({
          kind: "classical-nahuatl-particle-formula-projection",
          sourceFrame,
          formula,
          formulaSegments: Object.freeze(formulaSegments.slice()),
          derivedFromWrittenProjection: false
        }),
        writtenProjection: Object.freeze({
          kind: "classical-nahuatl-particle-written-projection",
          sourceFrame,
          surface: writtenSurface,
          derivedFromFormulaProjection: false
        }),
        typedFrameAuthority: true,
        lexicalAuthorizationOwnerIssued: true,
        paradigmatic: false,
        callerSuppliedAuthorityAccepted: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        sourceFormAuthority: false,
        lessonMetadataAuthority: false,
        formulaDerivedFromWrittenProjection: false,
        writtenDerivedFromFormulaProjection: false
      });
      issuedParticleResultFrames.set(
        issued,
        Object.freeze({
          sourceFrame,
          authorizationStatus: "authorized",
          formulaRecord: issued.formulaRecord,
          formulaRealizationRecord: issued.formulaRealizationRecord,
          formulaProjection: issued.formulaProjection,
          writtenProjection: issued.writtenProjection,
          contextualRealizationFrame: issued.contextualRealizationFrame,
          lexicalFactFrame: issued.lexicalFactFrame,
          grammarFrame: issued.grammarFrame,
          formula,
          surface: writtenSurface
        })
      );
      return issued;
    }
    function isClassicalNahuatlParticleResultFrame(frame = null) {
      const receipt = frame && typeof frame === "object"
        ? issuedParticleResultFrames.get(frame)
        : null;
      const authorized = frame?.authorizationStatus === "authorized";
      return Boolean(
        receipt
        && frame
        && frame.kind === "classical-nahuatl-particle-result-frame"
        && frame.version === CLASSICAL_NAHUATL_LESSON3_PARTICLES_VERSION
        && frame.authorizationStatus === receipt.authorizationStatus
        && frame.sourceFrame === receipt.sourceFrame
        && frame.formulaProjection === receipt.formulaProjection
        && frame.writtenProjection === receipt.writtenProjection
        && frame.contextualRealizationFrame
          === receipt.contextualRealizationFrame
        && frame.lexicalFactFrame === receipt.lexicalFactFrame
        && frame.formula === receipt.formula
        && frame.surface === receipt.surface
        && (
          authorized
            ? Boolean(
              frame.blockReason === ""
              && isClassicalNahuatlParticleSourceFrame(
                frame.sourceFrame
              )
              && frame.particleId
              && frame.semanticMarker
              && frame.surface
              && frame.formula
              && Array.isArray(frame.formulaSegments)
              && frame.formulaSegments.length
              && frame.grammarFrame
              && frame.grammarFrame === receipt.grammarFrame
              && frame.frames === frame.grammarFrame
              && frame.formulaRecord === receipt.formulaRecord
              && frame.formulaRealizationRecord
                === receipt.formulaRealizationRecord
              && isClassicalNahuatlParticleLexicalFactFrame(
                frame.lexicalFactFrame
              )
              && frame.lexicalFactFrame.particleId === frame.particleId
              && frame.contextualRealizationFrame?.kind
                === "classical-nahuatl-particle-contextual-realization-frame"
              && frame.contextualRealizationFrame?.particleId
                === frame.particleId
              && Array.isArray(
                frame.contextualRealizationFrame?.variants
              )
              && frame.contextualRealizationFrame
                ?.lexicalAvailabilityDerivedByOwner === true
              && frame.contextualRealizationFrame
                ?.lexicalAvailabilityUserSelectable === false
              && frame.contextualRealizationFrame
                ?.callerSuppliedAuthorityAccepted === false
              && frame.formulaProjection.sourceFrame === frame.sourceFrame
              && frame.writtenProjection.sourceFrame === frame.sourceFrame
              && frame.formulaProjection
                .derivedFromWrittenProjection === false
              && frame.writtenProjection
                .derivedFromFormulaProjection === false
              && frame.grammarFrame.unitFrame?.unitKind === "particle"
              && frame.grammarFrame.unitFrame?.particleId === frame.particleId
              && frame.grammarFrame.unitFrame?.semanticMarker
                === frame.semanticMarker
              && frame.grammarFrame.resultFrame?.ok === true
              && frame.grammarFrame.resultFrame?.outputKind === "particle"
              && frame.grammarFrame.resultFrame?.surface === frame.surface
              && frame.typedFrameAuthority === true
              && frame.lexicalAuthorizationOwnerIssued === true
            )
            : Boolean(
              frame.authorizationStatus === "blocked"
              && frame.blockReason
              && frame.formula === ""
              && frame.surface === ""
              && frame.formulaProjection === null
              && frame.writtenProjection === null
              && frame.contextualRealizationFrame === null
              && frame.lexicalFactFrame === null
              && frame.grammarFrame === null
              && frame.frames === null
              && frame.typedFrameAuthority === false
              && frame.lexicalAuthorizationOwnerIssued === false
            )
        )
        && frame.callerSuppliedAuthorityAccepted === false
        && frame.formulaStringAuthority === false
        && frame.surfaceStringAuthority === false
        && frame.sourceFormAuthority === false
        && frame.lessonMetadataAuthority === false
        && frame.paradigmatic === false
        && frame.formulaDerivedFromWrittenProjection === false
        && frame.writtenDerivedFromFormulaProjection === false
        && !Object.prototype.hasOwnProperty.call(frame, "lesson")
        && !Object.prototype.hasOwnProperty.call(frame, "example")
        && Object.isFrozen(frame)
      );
    }
    const CLASSICAL_NAHUATL_PARTICLE_HONORIFIC_TARGETS = Object.freeze({
      "l3-otzin": Object.freeze({
        baseParticleIds: Object.freeze(["l3-o-behold"]),
        hostKind: "single-particle",
      }),
      "l3-auhtzin": Object.freeze({
        baseParticleIds: Object.freeze(["l3-auh-interjection"]),
        hostKind: "single-particle",
      }),
      "l3-ca-no-zotzin": Object.freeze({
        baseParticleIds: Object.freeze([
          "l3-ca", "l3-no-adverbial", "l3-zo",
        ]),
        hostKind: "collocation-final-member",
      }),
    });
    function buildClassicalNahuatlParticleHonorificSourceFrame(request = {}) {
      const targetId = request && typeof request === "object"
        && !Array.isArray(request) ? String(request.targetId || "") : "";
      const target = CLASSICAL_NAHUATL_PARTICLE_HONORIFIC_TARGETS[targetId] || null;
      const recognizedKeys = request && typeof request === "object"
        ? Reflect.ownKeys(request).every((key) => key === "targetId")
        : false;
      const baseParticleSourceFrames = target && recognizedKeys
        ? target.baseParticleIds.map((particleId) =>
          buildClassicalNahuatlParticleSourceFrame(particleId))
        : [];
      const authorized = Boolean(
        target
        && recognizedKeys
        && baseParticleSourceFrames.length === target.baseParticleIds.length
        && baseParticleSourceFrames.every(isClassicalNahuatlParticleSourceFrame)
      );
      const source = freezeClassicalNahuatlLesson3ParticleResult({
        kind: "classical-nahuatl-particle-honorific-source-frame",
        version: CLASSICAL_NAHUATL_LESSON3_PARTICLES_VERSION,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason: authorized
          ? ""
          : !recognizedKeys
            ? "classical-particle-honorific-typed-request-required"
            : "classical-particle-honorific-target-not-licensed",
        targetId: authorized ? targetId : "",
        hostKind: authorized ? target.hostKind : "",
        baseParticleSourceFrames: Object.freeze(baseParticleSourceFrames),
        operation: authorized ? "attach-tzin-to-final-particle-member" : "",
        callerSuppliedSurfaceAuthority: false,
        callerSuppliedFormulaAuthority: false,
        lessonMetadataAuthority: false,
      });
      issuedParticleHonorificSourceFrames.set(source, Object.freeze({
        authorized,
        targetId: source.targetId,
        baseParticleSourceFrames: source.baseParticleSourceFrames,
      }));
      return source;
    }
    function isClassicalNahuatlParticleHonorificSourceFrame(frame = null) {
      const receipt = frame && typeof frame === "object"
        ? issuedParticleHonorificSourceFrames.get(frame) : null;
      return Boolean(
        receipt?.authorized === true
        && frame.kind === "classical-nahuatl-particle-honorific-source-frame"
        && frame.authorizationStatus === "authorized"
        && frame.blockReason === ""
        && frame.targetId === receipt.targetId
        && frame.baseParticleSourceFrames === receipt.baseParticleSourceFrames
        && frame.baseParticleSourceFrames.every(
          isClassicalNahuatlParticleSourceFrame
        )
        && frame.operation === "attach-tzin-to-final-particle-member"
        && frame.callerSuppliedSurfaceAuthority === false
        && frame.callerSuppliedFormulaAuthority === false
        && frame.lessonMetadataAuthority === false
        && Object.isFrozen(frame)
      );
    }
    function evaluateClassicalNahuatlParticleHonorificFormation(source = null) {
      const sourceAuthorized =
        isClassicalNahuatlParticleHonorificSourceFrame(source);
      const baseResults = sourceAuthorized
        ? source.baseParticleSourceFrames.map((particleSource) =>
          buildClassicalNahuatlParticleResultFrame(particleSource))
        : [];
      const basesAuthorized = sourceAuthorized
        && baseResults.length > 0
        && baseResults.every(isClassicalNahuatlParticleResultFrame);
      const baseSurfaces = baseResults.map((result) => result.surface);
      if (source?.hostKind === "collocation-final-member"
        && source.targetId === "l3-ca-no-zotzin" && baseSurfaces.length === 3) {
        baseSurfaces[1] = "no";
      }
      if (baseSurfaces.length) {
        baseSurfaces[baseSurfaces.length - 1] =
          `${baseSurfaces[baseSurfaces.length - 1]}tzin`;
      }
      const formulaSegments = baseResults.flatMap((result) =>
        Array.from(result.formulaSegments || []));
      if (formulaSegments.length) formulaSegments.push("tzin");
      const surface = basesAuthorized ? baseSurfaces.join(" ") : "";
      const formula = basesAuthorized ? formulaSegments.join(" + ") : "";
      const result = freezeClassicalNahuatlLesson3ParticleResult({
        kind: "classical-nahuatl-particle-honorific-result-frame",
        version: CLASSICAL_NAHUATL_LESSON3_PARTICLES_VERSION,
        authorizationStatus: basesAuthorized ? "authorized" : "blocked",
        blockReason: basesAuthorized
          ? ""
          : sourceAuthorized
            ? "classical-particle-honorific-base-results-required"
            : "owner-issued-classical-particle-honorific-source-required",
        operationId: "classical.particle.honorific.form",
        sourceFrame: sourceAuthorized ? source : null,
        targetId: basesAuthorized ? source.targetId : "",
        hostKind: basesAuthorized ? source.hostKind : "",
        baseParticleResultFrames: Object.freeze(baseResults),
        honorificMarker: basesAuthorized ? "tzin" : "",
        attachmentTarget: basesAuthorized ? "final-particle-member" : "",
        collocationScope: basesAuthorized
          && source.hostKind === "collocation-final-member"
          ? "entire-collocation" : "single-particle",
        formulaSegments: Object.freeze(formulaSegments),
        formula,
        surface,
        outputKind: "honorificized-particle",
        typedSourceAuthority: basesAuthorized,
        storedTargetSurfaceAuthority: false,
        storedExampleAuthority: false,
        translationAuthority: false,
        lessonMetadataAuthority: false,
      });
      issuedParticleHonorificResultFrames.set(result, Object.freeze({
        authorized: basesAuthorized,
        sourceFrame: result.sourceFrame,
        baseParticleResultFrames: result.baseParticleResultFrames,
        formula: result.formula,
        surface: result.surface,
      }));
      return result;
    }
    function isClassicalNahuatlParticleHonorificResultFrame(frame = null) {
      const receipt = frame && typeof frame === "object"
        ? issuedParticleHonorificResultFrames.get(frame) : null;
      return Boolean(
        receipt
        && frame.kind === "classical-nahuatl-particle-honorific-result-frame"
        && frame.authorizationStatus === (receipt.authorized ? "authorized" : "blocked")
        && frame.sourceFrame === receipt.sourceFrame
        && frame.baseParticleResultFrames === receipt.baseParticleResultFrames
        && frame.formula === receipt.formula
        && frame.surface === receipt.surface
        && (receipt.authorized
          ? isClassicalNahuatlParticleHonorificSourceFrame(frame.sourceFrame)
            && frame.baseParticleResultFrames.every(
              isClassicalNahuatlParticleResultFrame
            )
            && frame.honorificMarker === "tzin"
            && frame.attachmentTarget === "final-particle-member"
            && frame.formula.endsWith(" + tzin")
            && frame.surface.endsWith("tzin")
            && frame.typedSourceAuthority === true
          : frame.formula === "" && frame.surface === "")
        && frame.storedTargetSurfaceAuthority === false
        && frame.storedExampleAuthority === false
        && frame.translationAuthority === false
        && frame.lessonMetadataAuthority === false
        && Object.isFrozen(frame)
      );
    }
    const CLASSICAL_NAHUATL_SPECIALIZED_SENTENCE_PARTICLE_IDS = Object.freeze([
      "l3-ca",
      "l3-cuix",
      "l3-tla",
      "l3-ma"
    ]);
    const CLASSICAL_NAHUATL_SPECIALIZED_ADVERBIAL_PARTICLE_IDS = Object.freeze([
      "l3-o-antecessive"
    ]);
    const CLASSICAL_NAHUATL_SENTENCE_PARTICLE_HONORIFIC_IDS = Object.freeze({
      "l3-o-behold": "l3-otzin",
      "l3-auh-conjunctor": "l3-auhtzin"
    });
    function getClassicalNahuatlSentenceParticleEntries() {
      const seen = new Set();
      return getClassicalNahuatlParticleSourceEntries().filter(entry => {
        const composable = entry.clauseComposable === true
          && !CLASSICAL_NAHUATL_SPECIALIZED_SENTENCE_PARTICLE_IDS.includes(entry.id);
        if (!composable || !entry.id || seen.has(entry.id)) {
          return false;
        }
        seen.add(entry.id);
        return true;
      });
    }
    function findClassicalNahuatlSentenceParticleEntry(candidate = "") {
      const requested = String(candidate == null ? "" : candidate).trim();
      const lookup = normalizeClassicalNahuatlParticleLookupValue(requested);
      return getClassicalNahuatlSentenceParticleEntries().find(entry => (
        entry.id === requested || entry.lookupKeys.includes(lookup)
      )) || null;
    }
    function getClassicalNahuatlSentenceAdverbialEntries() {
      const seen = new Set();
      return getClassicalNahuatlParticleSourceEntries().filter(entry => {
        const composable = entry.sentenceAdverbialComposable === true
          && !CLASSICAL_NAHUATL_SPECIALIZED_ADVERBIAL_PARTICLE_IDS.includes(entry.id);
        if (!composable || !entry.id || seen.has(entry.id)) {
          return false;
        }
        seen.add(entry.id);
        return true;
      });
    }
    function findClassicalNahuatlSentenceAdverbialEntry(candidate = "") {
      const requested = String(candidate == null ? "" : candidate).trim();
      const lookup = normalizeClassicalNahuatlParticleLookupValue(requested);
      return getClassicalNahuatlSentenceAdverbialEntries().find(entry => (
        entry.id === requested || entry.lookupKeys.includes(lookup)
      )) || null;
    }
    function isClassicalNahuatlIssuedParticleSentenceLayerFrame(frame = null) {
      const receipt = frame && typeof frame === "object"
        ? issuedParticleSentenceLayerFrames.get(frame)
        : null;
      const authorized = frame?.authorizationStatus === "authorized";
      return Boolean(
        receipt
        && (
          frame.kind === "classical-nahuatl-sentence-particle-layer-frame"
          || frame.kind === "classical-nahuatl-sentence-adverbial-layer-frame"
        )
        && frame.version === CLASSICAL_NAHUATL_LESSON3_PARTICLES_VERSION
        && frame.authorizationStatus === receipt.authorizationStatus
        && frame.blockReason === receipt.blockReason
        && frame.formulaStringAuthority === false
        && frame.displayStringsAreAuthority === false
        && frame.canonicalInputFrame === receipt.canonicalInputFrame
        && frame.particleSourceFrame === receipt.particleSourceFrame
        && frame.particleResultFrame === receipt.particleResultFrame
        && frame.formulaProjection === receipt.formulaProjection
        && frame.writtenProjection === receipt.writtenProjection
        && frame.nuclearClauseKind === receipt.nuclearClauseKind
        && frame.consumedNuclearFormula === receipt.consumedNuclearFormula
        && frame.consumedNuclearSurface === receipt.consumedNuclearSurface
        && frame.sentenceFormulaDisplay === receipt.sentenceFormulaDisplay
        && frame.sentenceSurfaceDisplay === receipt.sentenceSurfaceDisplay
        && (
          authorized
            ? Boolean(
              frame.blockReason === ""
              && isClassicalNahuatlParticleSourceFrame(
                frame.particleSourceFrame
              )
              && isClassicalNahuatlParticleResultFrame(
                frame.particleResultFrame
              )
              && frame.canonicalInputFrame
              && frame.formulaProjection?.particleSourceFrame
                === frame.particleSourceFrame
              && frame.formulaProjection?.particleResultFrame
                === frame.particleResultFrame
              && frame.formulaProjection?.canonicalInputFrame
                === frame.canonicalInputFrame
              && frame.formulaProjection?.formula
                === frame.sentenceFormulaDisplay
              && frame.formulaProjection
                ?.derivedFromWrittenProjection === false
              && frame.writtenProjection?.particleSourceFrame
                === frame.particleSourceFrame
              && frame.writtenProjection?.particleResultFrame
                === frame.particleResultFrame
              && frame.writtenProjection?.canonicalInputFrame
                === frame.canonicalInputFrame
              && frame.writtenProjection?.surface
                === frame.sentenceSurfaceDisplay
              && frame.writtenProjection
                ?.derivedFromFormulaProjection === false
              && frame.formulaDerivedFromWrittenProjection === false
              && frame.writtenDerivedFromFormulaProjection === false
              && frame.sentenceFormulaDisplay
              && frame.sentenceSurfaceDisplay
            )
            : Boolean(
              (
                frame.authorizationStatus === "blocked"
                || frame.authorizationStatus === "inactive"
              )
              && frame.formulaProjection === null
              && frame.writtenProjection === null
              && frame.sentenceFormulaDisplay === ""
              && frame.sentenceSurfaceDisplay === ""
            )
        )
        && frame.callerSuppliedAuthorityAccepted === false
        && frame.lessonMetadataAuthority === false
        && !Object.prototype.hasOwnProperty.call(frame, "lesson")
        && !Object.prototype.hasOwnProperty.call(frame, "section")
        && !Object.prototype.hasOwnProperty.call(frame, "sourceDocument")
        && !Object.prototype.hasOwnProperty.call(frame, "example")
        && Object.isFrozen(frame)
      );
    }
    function issueClassicalNahuatlParticleSentenceLayerFrame(frame = {}) {
      const issued = Object.freeze(frame);
      issuedParticleSentenceLayerFrames.set(issued, Object.freeze({
        authorizationStatus: issued.authorizationStatus,
        blockReason: issued.blockReason,
        canonicalInputFrame: issued.canonicalInputFrame,
        particleSourceFrame: issued.particleSourceFrame,
        particleResultFrame: issued.particleResultFrame,
        formulaProjection: issued.formulaProjection,
        writtenProjection: issued.writtenProjection,
        nuclearClauseKind: issued.nuclearClauseKind,
        consumedNuclearFormula: issued.consumedNuclearFormula,
        consumedNuclearSurface: issued.consumedNuclearSurface,
        sentenceFormulaDisplay: issued.sentenceFormulaDisplay,
        sentenceSurfaceDisplay: issued.sentenceSurfaceDisplay
      }));
      return issued;
    }
    function resolveClassicalNahuatlParticleCanonicalSentenceInput(options = {}) {
      const priorSentenceFrame =
        options.consumedSentenceFrame
        || options.sentenceResultFrame
        || null;
      if (isClassicalNahuatlIssuedParticleSentenceLayerFrame(priorSentenceFrame)) {
        return {
          authorizationStatus: "authorized",
          blockReason: "",
          nuclearClauseKind: priorSentenceFrame.nuclearClauseKind,
          nuclearFormula: priorSentenceFrame.consumedNuclearFormula,
          nuclearSurface: priorSentenceFrame.consumedNuclearSurface,
          sentenceFormula: priorSentenceFrame.sentenceFormulaDisplay,
          sentenceSurface: priorSentenceFrame.sentenceSurfaceDisplay,
          sentenceFormulaInitialCapitalization: "syntactic-sentence-initial",
          sentenceSurfaceInitialCapitalization: "syntactic-sentence-initial",
          canonicalInputKind: "issued-classical-nahuatl-particle-sentence-layer-frame",
          canonicalInputFrame: priorSentenceFrame
        };
      }
      const suppliedNuclearResult =
        options.nuclearResultFrame
        || options.nuclearResult
        || null;
      const runtimeTarget = getClassicalNahuatlParticleRuntimeTarget();
      if (
        typeof runtimeTarget?.isClassicalNahuatlVncSentenceResultFrame === "function"
        && runtimeTarget.isClassicalNahuatlVncSentenceResultFrame(suppliedNuclearResult)
      ) {
        return {
          authorizationStatus: "authorized",
          blockReason: "",
          nuclearClauseKind: "vnc",
          nuclearFormula: suppliedNuclearResult.consumedNuclearFormula,
          nuclearSurface: suppliedNuclearResult.consumedNuclearSurface,
          sentenceFormula: suppliedNuclearResult.sentenceFormulaDisplay,
          sentenceSurface: suppliedNuclearResult.sentenceSurfaceDisplay,
          sentenceFormulaInitialCapitalization:
            suppliedNuclearResult.sentenceFormulaInitialCapitalization,
          sentenceSurfaceInitialCapitalization:
            suppliedNuclearResult.sentenceSurfaceInitialCapitalization,
          canonicalInputKind: "classical-nahuatl-vnc-sentence-result-frame",
          canonicalInputFrame: suppliedNuclearResult
        };
      }
      if (
        typeof runtimeTarget?.isClassicalNahuatlIssuedNncSentenceSurfaceFrame === "function"
        && runtimeTarget.isClassicalNahuatlIssuedNncSentenceSurfaceFrame(
          suppliedNuclearResult
        )
      ) {
        return {
          authorizationStatus: "authorized",
          blockReason: "",
          nuclearClauseKind: "nnc",
          nuclearFormula: String(suppliedNuclearResult.baseNncFormula || "").trim(),
          nuclearSurface: String(
            suppliedNuclearResult.canonicalNuclearSurface
            || suppliedNuclearResult.nuclearSurface
            || ""
          ).trim(),
          sentenceFormula: String(
            suppliedNuclearResult.sentenceFormulaDisplay || ""
          ).trim(),
          sentenceSurface: String(
            suppliedNuclearResult.sentenceSurface || ""
          ).trim(),
          sentenceFormulaInitialCapitalization: "syntactic-sentence-initial",
          sentenceSurfaceInitialCapitalization: "syntactic-sentence-initial",
          canonicalInputKind: "issued-classical-nahuatl-nnc-sentence-surface-frame",
          canonicalInputFrame: suppliedNuclearResult
        };
      }
      return {
        authorizationStatus: "blocked",
        blockReason: "canonical-issued-nuclear-result-required",
        nuclearClauseKind: "",
        nuclearFormula: "",
        nuclearSurface: "",
        sentenceFormula: "",
        sentenceSurface: "",
        sentenceFormulaInitialCapitalization: "preserve",
        sentenceSurfaceInitialCapitalization: "preserve",
        canonicalInputKind: "",
        canonicalInputFrame: null
      };
    }
    function buildClassicalNahuatlSentenceAdverbialLayerFrame(options = {}) {
      if (!options || typeof options !== "object") {
        options = {};
      }
      const allowedOptionKeys = new Set([
        "particleSourceFrame",
        "nuclearResultFrame",
        "consumedSentenceFrame"
      ]);
      const unexpectedOptionKey = Reflect.ownKeys(options)
        .map(String)
        .find(key => !allowedOptionKeys.has(key));
      const unexpectedOptionValue = unexpectedOptionKey
        ? Object.getOwnPropertyDescriptor(options, unexpectedOptionKey)
            ?.value
        : null;
      const authorityPath = unexpectedOptionKey
        ? findClassicalNahuatlLesson3ExternalAuthorityPath({
            [unexpectedOptionKey]: unexpectedOptionValue
          })
        : "";
      const particleSourceFrame = options.particleSourceFrame || null;
      const adverbialOmitted =
        !particleSourceFrame && !unexpectedOptionKey;
      const particleSourceAuthorized =
        isClassicalNahuatlParticleSourceFrame(particleSourceFrame);
      const requestedAdverbialId = particleSourceAuthorized
        ? particleSourceFrame.particleId
        : "";
      const canonicalInput =
        resolveClassicalNahuatlParticleCanonicalSentenceInput(options);
      const nuclearClauseKind = canonicalInput.nuclearClauseKind;
      const nuclearFormula = canonicalInput.nuclearFormula;
      const nuclearSurface = canonicalInput.nuclearSurface;
      const consumedSentenceFormula = canonicalInput.sentenceFormula;
      const consumedSentenceSurface = canonicalInput.sentenceSurface;
      const sentenceFormulaInitialCapitalization =
        canonicalInput.sentenceFormulaInitialCapitalization;
      const sentenceSurfaceInitialCapitalization =
        canonicalInput.sentenceSurfaceInitialCapitalization;
      const removeSyntacticInitialCapitalization = (value, provenance) => provenance === "syntactic-sentence-initial" && value
        ? `${value.charAt(0).toLowerCase()}${value.slice(1)}`
        : value;
      const clauseKindAllowed = canonicalInput.authorizationStatus === "authorized"
        && (nuclearClauseKind === "vnc" || nuclearClauseKind === "nnc");
      const inventoryEntry = adverbialOmitted
        ? null
        : getClassicalNahuatlParticleSourceEntries()
          .find(entry => entry.id === requestedAdverbialId) || null;
      const selectedEntry = adverbialOmitted
        ? null
        : findClassicalNahuatlSentenceAdverbialEntry(
            requestedAdverbialId
          );
      const particleResultFrame = particleSourceAuthorized
        ? buildClassicalNahuatlParticleResultFrame(particleSourceFrame)
        : null;
      const authorized = !adverbialOmitted
        && !unexpectedOptionKey
        && !authorityPath
        && particleSourceAuthorized
        && clauseKindAllowed
        && Boolean(nuclearFormula)
        && Boolean(selectedEntry)
        && isClassicalNahuatlParticleResultFrame(particleResultFrame);
      const blocked = !adverbialOmitted && !authorized;
      const sourceForm = authorized ? particleResultFrame.surface : "";
      const formulaParticle = authorized
        ? particleResultFrame.formula
        : "";
      const embeddedSentenceFormula = removeSyntacticInitialCapitalization(consumedSentenceFormula, sentenceFormulaInitialCapitalization);
      const embeddedSentenceSurface = removeSyntacticInitialCapitalization(consumedSentenceSurface, sentenceSurfaceInitialCapitalization);
      const sentenceFormulaDisplay = authorized
        ? `${formulaParticle} ${embeddedSentenceFormula}`
        : "";
      const sentenceSurfaceDisplay = authorized
        ? `${sourceForm.charAt(0).toUpperCase()}${sourceForm.slice(1)} ${embeddedSentenceSurface}`
        : "";
      const formulaProjection = authorized ? Object.freeze({
        kind: "classical-nahuatl-sentence-adverbial-formula-projection",
        particleSourceFrame,
        particleResultFrame,
        canonicalInputFrame: canonicalInput.canonicalInputFrame,
        formula: sentenceFormulaDisplay,
        derivedFromWrittenProjection: false
      }) : null;
      const writtenProjection = authorized ? Object.freeze({
        kind: "classical-nahuatl-sentence-adverbial-written-projection",
        particleSourceFrame,
        particleResultFrame,
        canonicalInputFrame: canonicalInput.canonicalInputFrame,
        surface: sentenceSurfaceDisplay,
        derivedFromFormulaProjection: false
      }) : null;
      return issueClassicalNahuatlParticleSentenceLayerFrame({
        kind: "classical-nahuatl-sentence-adverbial-layer-frame",
        version: CLASSICAL_NAHUATL_LESSON3_PARTICLES_VERSION,
        requestedAdverbialId,
        adverbialOmitted,
        active: !adverbialOmitted,
        authorizationStatus: authorized ? "authorized" : blocked ? "blocked" : "inactive",
        blockReason: blocked
          ? authorityPath
            ? `classical-sentence-adverbial-external-authority-forbidden:${authorityPath}`
            : unexpectedOptionKey
              ? (
                unexpectedOptionKey === "adverbialId"
                || unexpectedOptionKey === "candidate"
              )
                ? "classical-particle-owner-issued-source-required"
                : `classical-sentence-adverbial-option-forbidden:${unexpectedOptionKey}`
              : !particleSourceAuthorized
                ? particleSourceFrame?.blockReason
                  || "classical-particle-owner-issued-source-required"
                : canonicalInput.authorizationStatus !== "authorized"
            ? canonicalInput.blockReason
            : !clauseKindAllowed
            ? "sentence-adverbial-requires-vnc-or-nnc"
            : !nuclearFormula
              ? "sentence-adverbial-requires-authorized-nuclear-formula"
              : !inventoryEntry || !selectedEntry
                ? "sentence-adverbial-not-in-composable-particle-inventory"
                : "sentence-adverbial-not-authorized"
          : "",
        particleSourceFrame:
          particleSourceAuthorized ? particleSourceFrame : null,
        particleResultFrame:
          authorized ? particleResultFrame : null,
        selectedEntry,
        sourceForm,
        functionScope: selectedEntry?.functionScope || "",
        placement: selectedEntry?.placement || null,
        sequenceRole: "adverbial-modifier",
        sequenceOrder: "before-consumed-sentence",
        sequenceOrderAuthority: "typed-placement-fact",
        nuclearClauseKind,
        canonicalInputKind: canonicalInput.canonicalInputKind,
        canonicalInputFrame: authorized ? canonicalInput.canonicalInputFrame : null,
        consumedNuclearFormula: nuclearFormula,
        consumedNuclearSurface: nuclearSurface,
        consumedSentenceFormula,
        consumedSentenceSurface,
        sentenceFormulaInitialCapitalization,
        sentenceSurfaceInitialCapitalization,
        sentenceFormulaDisplay,
        sentenceSurfaceDisplay,
        formulaProjection,
        writtenProjection,
        formulaDerivedFromWrittenProjection: false,
        writtenDerivedFromFormulaProjection: false,
        nuclearFormulaAuthority: "consumed-not-created",
        authorizedForNuclearClause: false,
        particleAuthorityOnly: true,
        paradigmatic: false,
        callerSuppliedAuthorityAccepted: false,
        formulaStringAuthority: false,
        displayStringsAreAuthority: false,
        lessonMetadataAuthority: false
      });
    }
    function buildClassicalNahuatlSentenceParticleLayerFrame(options = {}) {
      if (!options || typeof options !== "object") {
        options = {};
      }
      const allowedOptionKeys = new Set([
        "particleSourceFrame",
        "nuclearResultFrame",
        "consumedSentenceFrame",
        "honorificized"
      ]);
      const unexpectedOptionKey = Reflect.ownKeys(options)
        .map(String)
        .find(key => !allowedOptionKeys.has(key));
      const unexpectedOptionValue = unexpectedOptionKey
        ? Object.getOwnPropertyDescriptor(options, unexpectedOptionKey)
            ?.value
        : null;
      const authorityPath = unexpectedOptionKey
        ? findClassicalNahuatlLesson3ExternalAuthorityPath({
            [unexpectedOptionKey]: unexpectedOptionValue
          })
        : "";
      const particleSourceFrame = options.particleSourceFrame || null;
      const particleOmitted =
        !particleSourceFrame && !unexpectedOptionKey;
      const particleSourceAuthorized =
        isClassicalNahuatlParticleSourceFrame(particleSourceFrame);
      const requestedParticleId = particleSourceAuthorized
        ? particleSourceFrame.particleId
        : "";
      const honorificizedRequested = options.honorificized === true;
      const canonicalInput =
        resolveClassicalNahuatlParticleCanonicalSentenceInput(options);
      const nuclearClauseKind = canonicalInput.nuclearClauseKind;
      const nuclearFormula = canonicalInput.nuclearFormula;
      const nuclearSurface = canonicalInput.nuclearSurface;
      const consumedSentenceFormula = canonicalInput.sentenceFormula;
      const consumedSentenceSurface = canonicalInput.sentenceSurface;
      const sentenceFormulaInitialCapitalization =
        canonicalInput.sentenceFormulaInitialCapitalization;
      const sentenceSurfaceInitialCapitalization =
        canonicalInput.sentenceSurfaceInitialCapitalization;
      const removeInnerSentenceInitialCapitalization = (value, provenance) => provenance === "syntactic-sentence-initial" && value
        ? `${value.charAt(0).toLowerCase()}${value.slice(1)}`
        : value;
      const embeddedSentenceFormula = removeInnerSentenceInitialCapitalization(consumedSentenceFormula, sentenceFormulaInitialCapitalization);
      const embeddedSentenceSurface = removeInnerSentenceInitialCapitalization(consumedSentenceSurface, sentenceSurfaceInitialCapitalization);
      const clauseKindAllowed = canonicalInput.authorizationStatus === "authorized"
        && (nuclearClauseKind === "vnc" || nuclearClauseKind === "nnc");
      const inventoryEntry = particleOmitted
        ? null
        : getClassicalNahuatlParticleSourceEntries()
          .find(entry => entry.id === requestedParticleId) || null;
      const specializedSentenceControlOwnsEntry = CLASSICAL_NAHUATL_SPECIALIZED_SENTENCE_PARTICLE_IDS.includes(inventoryEntry?.id);
      const placementAuthorized = inventoryEntry?.placement?.scope === "clause-initial";
      const baseSelectedEntry = !specializedSentenceControlOwnsEntry && placementAuthorized
        ? findClassicalNahuatlSentenceParticleEntry(requestedParticleId)
        : null;
      const honorificizedEntryId = honorificizedRequested ? CLASSICAL_NAHUATL_SENTENCE_PARTICLE_HONORIFIC_IDS[baseSelectedEntry?.id] || "" : "";
      const selectedSourceFrame = honorificizedEntryId
        ? buildClassicalNahuatlParticleSourceFrame(honorificizedEntryId)
        : particleSourceFrame;
      const particleResultFrame = isClassicalNahuatlParticleSourceFrame(
        selectedSourceFrame
      ) ? buildClassicalNahuatlParticleResultFrame(
        selectedSourceFrame
      ) : null;
      const honorificizedAuthorized = !honorificizedRequested
        || Boolean(
          honorificizedEntryId
          && isClassicalNahuatlParticleResultFrame(
            particleResultFrame
          )
        );
      const selectedEntry =
        isClassicalNahuatlParticleResultFrame(particleResultFrame)
          ? getClassicalNahuatlParticleSourceEntries()
            .find(entry => entry.id === particleResultFrame.particleId)
            || null
          : null;
      const authorized = !particleOmitted
        && !unexpectedOptionKey
        && !authorityPath
        && particleSourceAuthorized
        && clauseKindAllowed
        && Boolean(nuclearFormula)
        && Boolean(selectedEntry)
        && Boolean(particleResultFrame)
        && placementAuthorized
        && honorificizedAuthorized;
      const blocked = !particleOmitted && !authorized;
      const sourceForm = authorized ? particleResultFrame.surface : "";
      const formulaParticle = authorized ? particleResultFrame.formula : "";
      const sentenceFormulaDisplay = authorized
        ? `${formulaParticle} ${embeddedSentenceFormula}`
        : "";
      const sentenceSurfaceDisplay = authorized
        ? `${sourceForm.charAt(0).toUpperCase()}${sourceForm.slice(1)} ${embeddedSentenceSurface}`
        : "";
      const formulaProjection = authorized ? Object.freeze({
        kind: "classical-nahuatl-sentence-particle-formula-projection",
        particleSourceFrame,
        particleResultFrame,
        canonicalInputFrame: canonicalInput.canonicalInputFrame,
        formula: sentenceFormulaDisplay,
        derivedFromWrittenProjection: false
      }) : null;
      const writtenProjection = authorized ? Object.freeze({
        kind: "classical-nahuatl-sentence-particle-written-projection",
        particleSourceFrame,
        particleResultFrame,
        canonicalInputFrame: canonicalInput.canonicalInputFrame,
        surface: sentenceSurfaceDisplay,
        derivedFromFormulaProjection: false
      }) : null;
      return issueClassicalNahuatlParticleSentenceLayerFrame({
        kind: "classical-nahuatl-sentence-particle-layer-frame",
        version: CLASSICAL_NAHUATL_LESSON3_PARTICLES_VERSION,
        requestedParticleId,
        particleOmitted,
        active: !particleOmitted,
        authorizationStatus: authorized ? "authorized" : blocked ? "blocked" : "inactive",
        blockReason: blocked
          ? authorityPath
            ? `classical-sentence-particle-external-authority-forbidden:${authorityPath}`
            : unexpectedOptionKey
              ? (
                unexpectedOptionKey === "particleId"
                || unexpectedOptionKey === "candidate"
              )
                ? "classical-particle-owner-issued-source-required"
                : `classical-sentence-particle-option-forbidden:${unexpectedOptionKey}`
              : !particleSourceAuthorized
                ? particleSourceFrame?.blockReason
                  || "classical-particle-owner-issued-source-required"
                : canonicalInput.authorizationStatus !== "authorized"
            ? canonicalInput.blockReason
            : !clauseKindAllowed
            ? "sentence-particle-requires-vnc-or-nnc"
            : !nuclearFormula
              ? "sentence-particle-requires-authorized-nuclear-formula"
              : inventoryEntry && !placementAuthorized
                ? "sentence-particle-placement-not-realizable-by-sentence-initial-control"
                : specializedSentenceControlOwnsEntry
                  ? "sentence-particle-has-specialized-sentence-control"
                  : honorificizedRequested && !honorificizedAuthorized
                    ? "sentence-particle-honorificization-not-witnessed"
                    : !isClassicalNahuatlParticleResultFrame(
                        particleResultFrame
                      )
                      ? particleResultFrame?.blockReason
                        || "classical-particle-result-required"
                      : "sentence-particle-not-in-composable-particle-inventory"
          : "",
        particleSourceFrame:
          particleSourceAuthorized ? particleSourceFrame : null,
        particleResultFrame:
          authorized ? particleResultFrame : null,
        selectedEntry,
        baseSelectedEntry,
        specializedSentenceControlOwnsEntry,
        honorificizedRequested,
        honorificizedAuthorized,
        honorificizedEntryId,
        sourceForm,
        functionScope: selectedEntry?.functionScope || "",
        functionClass: selectedEntry?.functionClass || null,
        placement: selectedEntry?.placement || null,
        placementAuthorized,
        gloss: selectedEntry?.gloss || "",
        nuclearClauseKind,
        canonicalInputKind: canonicalInput.canonicalInputKind,
        canonicalInputFrame: authorized ? canonicalInput.canonicalInputFrame : null,
        consumedNuclearFormula: nuclearFormula,
        consumedNuclearSurface: nuclearSurface,
        consumedSentenceFormula,
        consumedSentenceSurface,
        sentenceFormulaInitialCapitalization,
        sentenceSurfaceInitialCapitalization,
        embeddedSentenceFormula,
        embeddedSentenceSurface,
        nuclearFormulaAuthority: "consumed-not-created",
        authorizedForNuclearClause: false,
        particleAuthorityOnly: true,
        paradigmatic: false,
        lowerNuclearOutputIsProvisional: false,
        sentenceCompositionLayer: "typed-particle-sentence-adjunction",
        sentenceFormulaDisplay,
        sentenceSurfaceDisplay,
        formulaProjection,
        writtenProjection,
        formulaDerivedFromWrittenProjection: false,
        writtenDerivedFromFormulaProjection: false,
        callerSuppliedAuthorityAccepted: false,
        formulaStringAuthority: false,
        displayStringsAreAuthority: false,
        lessonMetadataAuthority: false,
        storedWitnessAuthority: false
      });
    }
    function installClassicalNahuatlParticlesClassicGlobals() {
      const globalTarget = typeof targetObject !== "undefined" && targetObject || (typeof globalThis !== "undefined" ? globalThis : null);
      if (!globalTarget || typeof globalTarget !== "object") {
        return null;
      }
      Object.assign(globalTarget, {
        getClassicalNahuatlParticleSourceEntries,
        findClassicalNahuatlLesson3ParticleEntries,
        findClassicalNahuatlLesson3ParticleEntry,
        getClassicalNahuatlParticleEntries,
        findClassicalNahuatlParticleEntries,
        findClassicalNahuatlParticleEntry,
        buildClassicalNahuatlParticleSourceFrame,
        isClassicalNahuatlParticleSourceFrame,
        getClassicalNahuatlClauseRelationMarkerOptions,
        getClassicalNahuatlParticleClauseRelationMarkerOptions,
        buildClassicalNahuatlParticleResultFrame,
        isClassicalNahuatlParticleResultFrame,
        buildClassicalNahuatlParticleHonorificSourceFrame,
        isClassicalNahuatlParticleHonorificSourceFrame,
        evaluateClassicalNahuatlParticleHonorificFormation,
        isClassicalNahuatlParticleHonorificResultFrame,
        getClassicalNahuatlSentenceParticleEntries,
        findClassicalNahuatlSentenceParticleEntry,
        buildClassicalNahuatlSentenceParticleLayerFrame,
        isClassicalNahuatlIssuedParticleSentenceLayerFrame,
        getClassicalNahuatlParticleGroups,
        getClassicalNahuatlParticleStructureRules,
        getClassicalNahuatlFunctionalClassRules,
        getClassicalNahuatlNegativizingParticleRules,
        getClassicalNahuatlParticleCollocationRules,
        getClassicalNahuatlHonorificizedParticleRules,
        getClassicalNahuatlHonorificizedParticleExamples
      });
      return globalTarget;
    }
    installClassicalNahuatlParticlesClassicGlobals();

    const api = {};
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON3_PARTICLES_VERSION", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON3_PARTICLES_VERSION; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON3_PROFILE_ID", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON3_PROFILE_ID; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON3_SOURCE_DOCUMENT", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON3_SOURCE_DOCUMENT; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON3_PARTICLE_AUTHORITY_NOTE", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON3_PARTICLE_AUTHORITY_NOTE; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON3_LEGAL_WITNESS_TAG_IDS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON3_LEGAL_WITNESS_TAG_IDS; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON3_FUNCTIONAL_CLASS_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON3_FUNCTIONAL_CLASS_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON3_NEGATIVIZING_PARTICLE_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON3_NEGATIVIZING_PARTICLE_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON3_PARTICLE_COLLOCATION_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON3_PARTICLE_COLLOCATION_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON3_HONORIFICIZED_PARTICLE_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON3_HONORIFICIZED_PARTICLE_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON3_HONORIFICIZED_PARTICLE_EXAMPLES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON3_HONORIFICIZED_PARTICLE_EXAMPLES; },
    });
    api.getClassicalNahuatlParticleRuntimeTarget = getClassicalNahuatlParticleRuntimeTarget;
    api.getClassicalNahuatlProfileWallFrame = getClassicalNahuatlProfileWallFrame;
    api.normalizeClassicalNahuatlParticleLookupValue = normalizeClassicalNahuatlParticleLookupValue;
    api.cloneClassicalNahuatlLesson3Rule = cloneClassicalNahuatlLesson3Rule;
    api.cloneClassicalNahuatlLesson3HonorificizedExample = cloneClassicalNahuatlLesson3HonorificizedExample;
    api.getClassicalNahuatlFunctionalClassRules = getClassicalNahuatlFunctionalClassRules;
    api.getClassicalNahuatlParticleStructureRules = getClassicalNahuatlParticleStructureRules;
    api.getClassicalNahuatlNegativizingParticleRules = getClassicalNahuatlNegativizingParticleRules;
    api.getClassicalNahuatlParticleCollocationRules = getClassicalNahuatlParticleCollocationRules;
    api.getClassicalNahuatlHonorificizedParticleRules = getClassicalNahuatlHonorificizedParticleRules;
    api.getClassicalNahuatlHonorificizedParticleExamples = getClassicalNahuatlHonorificizedParticleExamples;
    api.getClassicalNahuatlParticleFunctionClassFrames = getClassicalNahuatlParticleFunctionClassFrames;
    api.getClassicalNahuatlParticleGroups = getClassicalNahuatlParticleGroups;
    api.getClassicalNahuatlParticleSourceEntries = getClassicalNahuatlParticleSourceEntries;
    api.findClassicalNahuatlLesson3ParticleEntries = findClassicalNahuatlLesson3ParticleEntries;
    api.findClassicalNahuatlLesson3ParticleEntry = findClassicalNahuatlLesson3ParticleEntry;
    api.getClassicalNahuatlParticleEntries = getClassicalNahuatlParticleEntries;
    api.findClassicalNahuatlParticleEntries = findClassicalNahuatlParticleEntries;
    api.findClassicalNahuatlParticleEntry = findClassicalNahuatlParticleEntry;
    api.buildClassicalNahuatlParticleSourceFrame = buildClassicalNahuatlParticleSourceFrame;
    api.isClassicalNahuatlParticleSourceFrame = isClassicalNahuatlParticleSourceFrame;
    api.getClassicalNahuatlClauseRelationMarkerOptions = getClassicalNahuatlClauseRelationMarkerOptions;
    api.getClassicalNahuatlParticleClauseRelationMarkerOptions = getClassicalNahuatlParticleClauseRelationMarkerOptions;
    api.buildClassicalNahuatlParticleResultFrame = buildClassicalNahuatlParticleResultFrame;
    api.isClassicalNahuatlParticleResultFrame = isClassicalNahuatlParticleResultFrame;
    api.buildClassicalNahuatlParticleHonorificSourceFrame = buildClassicalNahuatlParticleHonorificSourceFrame;
    api.isClassicalNahuatlParticleHonorificSourceFrame = isClassicalNahuatlParticleHonorificSourceFrame;
    api.evaluateClassicalNahuatlParticleHonorificFormation = evaluateClassicalNahuatlParticleHonorificFormation;
    api.isClassicalNahuatlParticleHonorificResultFrame = isClassicalNahuatlParticleHonorificResultFrame;
    api.getClassicalNahuatlSentenceParticleEntries = getClassicalNahuatlSentenceParticleEntries;
    api.findClassicalNahuatlSentenceParticleEntry = findClassicalNahuatlSentenceParticleEntry;
    api.buildClassicalNahuatlSentenceParticleLayerFrame = buildClassicalNahuatlSentenceParticleLayerFrame;
    api.isClassicalNahuatlIssuedParticleSentenceLayerFrame = isClassicalNahuatlIssuedParticleSentenceLayerFrame;
    api.getClassicalNahuatlSentenceAdverbialEntries = getClassicalNahuatlSentenceAdverbialEntries;
    api.findClassicalNahuatlSentenceAdverbialEntry = findClassicalNahuatlSentenceAdverbialEntry;
    api.buildClassicalNahuatlSentenceAdverbialLayerFrame = buildClassicalNahuatlSentenceAdverbialLayerFrame;
    api.installClassicalNahuatlParticlesClassicGlobals = installClassicalNahuatlParticlesClassicGlobals;
    return api;
}

export function installClassicalNahuatlParticlesGlobals(
  targetObject = globalThis,
  installationContext = null
) {
    const api = createClassicalNahuatlParticlesApi(
      targetObject,
      installationContext
    );
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
