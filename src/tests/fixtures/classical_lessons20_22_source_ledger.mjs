// Test-only exhaustive claim-level source closure for Andrews Lessons 20-22.
//
// This module is not installed in the production runtime and cannot authorize
// a generated word. Runtime authority remains in the canonical VNC evaluator
// and its typed application service.

const SOURCE_DOCUMENT = "ANDREWS_TRANSCRIPTION_CANVAS.md";
const DISPOSITIONS = new Set([
  "existing-canonical-rule",
  "new-canonical-rule",
  "read-only-evidence",
  "genuinely-blocked",
]);

const PROOF_FAMILIES = Object.freeze({
  formation: Object.freeze({
    positive: "vnc20-22:formation-positive",
    negative: "vnc20-22:formation-negative",
    interaction: "vnc20-22:formation-aspect-interaction",
    hostile: "vnc20-22:formation-hostile-target",
    scalar: "vnc20-22:formation-scalar",
    paradigm: "vnc20-22:formation-paradigm",
  }),
  boundary: Object.freeze({
    positive: "vnc20-22:boundary-positive",
    negative: "vnc20-22:boundary-negative",
    interaction: "vnc20-22:boundary-class-interaction",
    hostile: "vnc20-22:boundary-hostile-spelling",
    scalar: "vnc20-22:boundary-scalar",
    paradigm: "vnc20-22:boundary-paradigm",
  }),
  passive: Object.freeze({
    positive: "vnc20-22:passive-positive",
    negative: "vnc20-22:passive-negative",
    interaction: "vnc20-22:passive-object-interaction",
    hostile: "vnc20-22:passive-hostile-formula",
    scalar: "vnc20-22:passive-scalar",
    paradigm: "vnc20-22:passive-paradigm",
  }),
  cluster: Object.freeze({
    positive: "vnc20-22:cluster-positive",
    negative: "vnc20-22:cluster-negative",
    interaction: "vnc20-22:cluster-order-interaction",
    hostile: "vnc20-22:cluster-hostile-carriers",
    scalar: "vnc20-22:cluster-scalar",
    paradigm: "vnc20-22:cluster-paradigm",
  }),
  impersonal: Object.freeze({
    positive: "vnc20-22:impersonal-positive",
    negative: "vnc20-22:impersonal-negative",
    interaction: "vnc20-22:impersonal-valence-interaction",
    hostile: "vnc20-22:impersonal-hostile-subject",
    scalar: "vnc20-22:impersonal-scalar",
    paradigm: "vnc20-22:impersonal-paradigm",
  }),
  tla: Object.freeze({
    positive: "vnc20-22:tla-positive",
    negative: "vnc20-22:tla-negative",
    interaction: "vnc20-22:tla-source-interaction",
    hostile: "vnc20-22:tla-hostile-target",
    scalar: "vnc20-22:tla-scalar",
    paradigm: "vnc20-22:tla-paradigm",
  }),
  mood: Object.freeze({
    positive: "vnc20-22:mood-positive",
    negative: "vnc20-22:mood-negative",
    interaction: "vnc20-22:mood-voice-interaction",
    hostile: "vnc20-22:mood-hostile-sentence",
    scalar: "vnc20-22:mood-scalar",
    paradigm: "vnc20-22:mood-paradigm",
  }),
  evidence: Object.freeze({
    positive: "vnc20-22:evidence-positive",
    negative: "vnc20-22:evidence-not-authority",
    interaction: "vnc20-22:evidence-cross-reference",
    hostile: "vnc20-22:evidence-hostile-answer",
    scalar: "vnc20-22:evidence-scalar-receipt",
    paradigm: "vnc20-22:evidence-paradigm-receipt",
  }),
});

function freezeClaim({
  id,
  lesson,
  section,
  lineStart,
  lineEnd,
  category,
  path,
  proofFamily,
  summary,
  disposition = "existing-canonical-rule",
  paradigmConsequence = true,
}) {
  return Object.freeze({
    id,
    lesson: String(lesson),
    section,
    sourceDocument: SOURCE_DOCUMENT,
    transcriptionLineStart: lineStart,
    transcriptionLineEnd: lineEnd,
    category,
    disposition,
    implementationStatus: "implemented",
    canonicalObjectIds: Object.freeze(Array.isArray(path) ? [...path] : [path]),
    proofFamily,
    proofIds: PROOF_FAMILIES[proofFamily],
    paradigmConsequence,
    projections: Object.freeze([]),
    presentationExposure: false,
    summary,
    lessonMetadataAuthority: false,
    sourceTextAuthority: false,
    displayTextAuthority: false,
  });
}

const C = freezeClaim;

export const CLASSICAL_NAHUATL_LESSONS20_22_CLOSURE_CLAIMS = Object.freeze([
  C({ id: "l20-201-three-core-system", lesson: 20, section: "20.1", lineStart: 6744, lineEnd: 6748, category: "derivational-invariant", path: ["getClassicalNahuatlNonactiveFormationStructure", "deriveClassicalNahuatlNonactiveStemRecord"], proofFamily: "formation", summary: "Nonactive formations use the three cores ō, lō, hua and only the licensed o-hua, lo-hua, and hua-lō combinations." }),
  C({ id: "l20-201-derivation-cross-reference", lesson: 20, section: "20.1 cross-reference", lineStart: 6744, lineEnd: 6746, category: "necessary-cross-reference", disposition: "read-only-evidence", path: "lesson1-derivation-definition-cross-reference", proofFamily: "evidence", summary: "Lesson 1 supplies the general definition of derivation; it does not create a Lesson 20 runtime lane." }),
  C({ id: "l20-201-imperfective-source", lesson: 20, section: "20.1", lineStart: 6748, lineEnd: 6752, category: "operation-order", path: ["buildClassicalNahuatlActiveStemIdentityFrame", "deriveClassicalNahuatlNonactiveStemRecord"], proofFamily: "formation", summary: "The nonactive derivation consumes the imperfective active stem; its perfective is derived from the nonactive imperfective." }),
  C({ id: "l20-201-voice-cross-reference", lesson: 20, section: "20.1", lineStart: 6753, lineEnd: 6753, category: "necessary-cross-reference", path: "buildClassicalNahuatlDerivedVncFrame", proofFamily: "evidence", summary: "Lessons 21 and 22 consume, but do not recreate, the Lesson 20 nonactive stem." }),
  C({ id: "l20-201-connective-analysis-note", lesson: 20, section: "20.1 note", lineStart: 6754, lineEnd: 6758, category: "morpheme-analysis", disposition: "read-only-evidence", path: "lesson20-connective-l-w-analysis-evidence", proofFamily: "evidence", summary: "The internal l and w connective analysis and Lessons 25-26 comparison are non-authorizing evidence." }),

  C({ id: "l20-202-lo-distribution", lesson: 20, section: "20.2", lineStart: 6759, lineEnd: 6765, category: "conditioned-formation", path: "buildClassicalNahuatlProductiveCandidateSet", proofFamily: "formation", summary: "lō primarily selects transitive final-a sources and Class C intransitives, using the future-shape imperfective base outside Class D." }),
  C({ id: "l20-202-future-shape-cross-reference", lesson: 20, section: "20.2 cross-reference", lineStart: 6762, lineEnd: 6764, category: "necessary-cross-reference", disposition: "read-only-evidence", path: "lesson7-future-stem-shape-cross-reference", proofFamily: "evidence", summary: "Lesson 7 supplies the future-shape active stem used as the lō base; curriculum order cannot select output." }),
  C({ id: "l20-202-class-a", lesson: 20, section: "20.2.1", lineStart: 6766, lineEnd: 6774, category: "class-family", path: "getClassicalNahuatlNonactiveStemOptions", proofFamily: "formation", summary: "Class A sources retain their imperfective base before lō." }),
  C({ id: "l20-202-class-b", lesson: 20, section: "20.2.2", lineStart: 6778, lineEnd: 6793, category: "class-family", path: "getClassicalNahuatlNonactiveStemOptions", proofFamily: "formation", summary: "Class B sources retain their licensed imperfective base before lō." }),
  C({ id: "l20-202-root-plus-ya", lesson: 20, section: "20.2.2", lineStart: 6794, lineEnd: 6796, category: "conditioned-stem-change", path: ["buildClassicalNahuatlActiveStemIdentityFrame", "buildClassicalNahuatlProductiveCandidateSet"], proofFamily: "boundary", summary: "Class B root-plus-ya sources delete ya before lō." }),
  C({ id: "l20-202-class-c-length", lesson: 20, section: "20.2.3", lineStart: 6797, lineEnd: 6808, category: "conditioned-sound-change", path: "buildClassicalNahuatlClassCFinalIVowelLengthRuleFrame", proofFamily: "boundary", summary: "Class C base-final o or i has the licensed length before lō." }),
  C({ id: "l20-202-class-c-length-exception", lesson: 20, section: "20.2.3 exception", lineStart: 6809, lineEnd: 6812, category: "exception", path: "buildClassicalNahuatlClassCFinalIVowelLengthRuleFrame", proofFamily: "boundary", summary: "A long antepenultimate can block final i or o length before lō." }),
  C({ id: "l20-202-class-d-reduction", lesson: 20, section: "20.2.4", lineStart: 6813, lineEnd: 6818, category: "conditioned-sound-change", path: "buildClassicalNahuatlProductiveCandidateSet", proofFamily: "boundary", summary: "Class D final ā has reduced-long realization before lō." }),
  C({ id: "l20-202-class-d-quantity-cross-reference", lesson: 20, section: "20.2.4 cross-reference", lineStart: 6813, lineEnd: 6814, category: "necessary-cross-reference", disposition: "read-only-evidence", path: "lesson2-reduced-long-quantity-cross-reference", proofFamily: "evidence", summary: "Lesson 2 defines the reduced-long pronunciation; the written example is not spelling authority." }),

  C({ id: "l20-203-suppletive-lohua", lesson: 20, section: "20.3", lineStart: 6819, lineEnd: 6826, category: "suppletion", path: ["buildClassicalNahuatlActiveStemIdentityFrame", "getClassicalNahuatlNonactiveStemOptions"], proofFamily: "formation", summary: "The small lo-hua class uses the licensed suppletive stem for ca, yā, and huāl-yā." }),
  C({ id: "l20-203-compound-first-member", lesson: 20, section: "20.3", lineStart: 6827, lineEnd: 6839, category: "compound-operation", path: "getClassicalNahuatlNonactiveStemOptions", proofFamily: "formation", summary: "For huī-tz, itqui-tz, and huica-tz, lo-hua attaches inside the compound to its first member." }),
  C({ id: "l20-203-irregular-compound-cross-reference", lesson: 20, section: "20.3 cross-reference", lineStart: 6827, lineEnd: 6828, category: "necessary-cross-reference", disposition: "read-only-evidence", path: "lesson11-irregular-compound-cross-reference", proofFamily: "evidence", summary: "Lesson 11 supplies the compound identities consumed by the Lesson 20 attachment rule." }),
  C({ id: "l20-203-huica-alternative", lesson: 20, section: "20.3", lineStart: 6837, lineEnd: 6840, category: "licensed-alternative", path: "getClassicalNahuatlNonactiveStemOptions", proofFamily: "formation", summary: "Huica-tz licenses both huica-lo-hua-tz and the §20.5 huīc-o-hua-tz formation." }),

  C({ id: "l20-204-o-domain-and-replacement", lesson: 20, section: "20.4", lineStart: 6841, lineEnd: 6847, category: "conditioned-formation", path: ["buildClassicalNahuatlStemFinalShapeFrame", "buildClassicalNahuatlProductiveCandidateSet"], proofFamily: "boundary", summary: "ō replaces the final vowel after licensed k, n, s, or kw environments; s becomes x and kw becomes k; na, ni, and sa can also license lō." }),
  C({ id: "l20-204-replacive-imperfective", lesson: 20, section: "20.4", lineStart: 6843, lineEnd: 6845, category: "stem-identity-restriction", path: "buildClassicalNahuatlActiveStemIdentityFrame", proofFamily: "formation", summary: "A truncated ō base may resemble the active perfective but remains a replacive imperfective nonactive base." }),
  C({ id: "l20-204-ca-qui", lesson: 20, section: "20.4", lineStart: 6848, lineEnd: 6864, category: "conditioned-final-shape", path: "buildClassicalNahuatlProductiveCandidateSet", proofFamily: "boundary", summary: "Final ca and qui map to c-ō, with exact lexical alternatives retained." }),
  C({ id: "l20-204-na-ni", lesson: 20, section: "20.4", lineStart: 6865, lineEnd: 6874, category: "conditioned-final-shape", path: "buildClassicalNahuatlProductiveCandidateSet", proofFamily: "boundary", summary: "Final na and ni map to n-ō and may retain licensed lō alternatives." }),
  C({ id: "l20-204-za-ci-cui", lesson: 20, section: "20.4", lineStart: 6875, lineEnd: 6885, category: "conditioned-final-shape", path: "buildClassicalNahuatlProductiveCandidateSet", proofFamily: "boundary", summary: "Final za or ci maps to x-ō and final cui maps to c-ō, with listed lexical alternatives." }),
  C({ id: "l20-204-ta-postvocalic-ti", lesson: 20, section: "20.4", lineStart: 6886, lineEnd: 6891, category: "conditioned-final-shape", path: "buildClassicalNahuatlProductiveCandidateSet", proofFamily: "boundary", summary: "Transitive final ta may yield t-ō, while licensed postvocalic ti yields ch-ō." }),
  C({ id: "l20-204-intransitive-exceptions", lesson: 20, section: "20.4", lineStart: 6892, lineEnd: 6900, category: "lexical-exception", path: "getClassicalNahuatlNonactiveStemOptions", proofFamily: "formation", summary: "The listed intransitive ca, qui, and ti sources exceptionally license ō." }),

  C({ id: "l20-205-ohua-domain", lesson: 20, section: "20.5", lineStart: 6901, lineEnd: 6910, category: "conditioned-formation", path: ["buildClassicalNahuatlStemFinalShapeFrame", "buildClassicalNahuatlProductiveCandidateSet"], proofFamily: "boundary", summary: "o-hua selects licensed intransitive final-vowel environments, deletes the final vowel and remaining w, compensatorily lengthens o after w, and applies s-to-x or tz-to-ch." }),
  C({ id: "l20-205-productive-endings", lesson: 20, section: "20.5", lineStart: 6911, lineEnd: 6923, category: "conditioned-final-shape", path: "buildClassicalNahuatlProductiveCandidateSet", proofFamily: "boundary", summary: "The ca, qui, mi, za, ci, tzi, hua, and hui families realize their specified o-hua outcomes." }),
  C({ id: "l20-205-obligatory-exceptions", lesson: 20, section: "20.5 exception", lineStart: 6924, lineEnd: 6957, category: "lexical-exception", path: "getClassicalNahuatlNonactiveStemOptions", proofFamily: "formation", summary: "The listed ca, qui, mi, ci, tzi, and hua sources override the productive family with exact ō, hua, or hua-lō formations." }),
  C({ id: "l20-205-optional-ni", lesson: 20, section: "20.5", lineStart: 6958, lineEnd: 6960, category: "licensed-alternative", path: "getClassicalNahuatlNonactiveStemOptions", proofFamily: "formation", summary: "An occasional intransitive final-ni source can license n-o-hua beside ni-hua." }),
  C({ id: "l20-205-transitive-exception", lesson: 20, section: "20.5", lineStart: 6961, lineEnd: 6963, category: "lexical-exception", path: "getClassicalNahuatlNonactiveStemOptions", proofFamily: "formation", summary: "A listed transitive source exceptionally licenses o-hua." }),

  C({ id: "l20-206-hua-domain", lesson: 20, section: "20.6", lineStart: 6964, lineEnd: 6975, category: "conditioned-formation", path: ["buildClassicalNahuatlFinalIOHuaVowelLengthRuleFrame", "buildClassicalNahuatlProductiveCandidateSet"], proofFamily: "boundary", summary: "hua selects licensed final i or o sources, respects the stated exception families, retains long vowels, and normally lengthens short i." }),
  C({ id: "l20-206-hua-transitivity-and-class-c", lesson: 20, section: "20.6", lineStart: 6967, lineEnd: 6975, category: "restriction-and-exception", path: "getClassicalNahuatlNonactiveStemOptions", proofFamily: "formation", summary: "hua is mainly intransitive but licenses the stated short and long transitive sources and rare Class C final-iā sources." }),
  C({ id: "l20-206-hua-inventory", lesson: 20, section: "20.6", lineStart: 6976, lineEnd: 7002, category: "lexical-and-productive-inventory", path: "getClassicalNahuatlNonactiveStemOptions", proofFamily: "formation", summary: "All listed final-i, final-o, and Class C hua formations and their exact alternatives are engine-owned options." }),
  C({ id: "l20-206-ci-xi", lesson: 20, section: "20.6", lineStart: 7003, lineEnd: 7004, category: "conditioned-stem-change", path: "buildClassicalNahuatlProductiveCandidateSet", proofFamily: "boundary", summary: "Licensed final-ci sources replace ci with xī before hua." }),
  C({ id: "l20-207-hualo-free-variants", lesson: 20, section: "20.7", lineStart: 7005, lineEnd: 7011, category: "licensed-alternative", path: "getClassicalNahuatlNonactiveStemOptions", proofFamily: "formation", summary: "The listed hua-lō formations are selectable free variants of hua formations." }),
  C({ id: "l20-208-class-a2-and-aspect", lesson: 20, section: "20.8", lineStart: 7012, lineEnd: 7020, category: "class-and-paradigm", path: ["deriveClassicalNahuatlNonactiveStemRecord", "buildClassicalNahuatlDerivedVncFrame"], proofFamily: "formation", summary: "Every nonactive stem is Class A; lō, ō, and hua-lō are A-2 with quantity conditioned by silent morphs or glottal stop, and the perfective derives from the nonactive imperfective." }),
  C({ id: "l20-208-class-a2-cross-reference", lesson: 20, section: "20.8 cross-reference", lineStart: 7019, lineEnd: 7020, category: "necessary-cross-reference", disposition: "read-only-evidence", path: "lesson7-class-a2-core-tense-cross-reference", proofFamily: "evidence", summary: "Lesson 7 supplies the reusable Class A-2 core-and-tense paradigm; the Lesson 20 inventory does not enumerate output strings." }),

  C({ id: "l21-211-passive-transform", lesson: 21, section: "21.1", lineStart: 7026, lineEnd: 7033, category: "voice-operation", path: "buildClassicalNahuatlDerivedVncFrame", proofFamily: "passive", summary: "Passive deletes the active subject, substitutes the nonactive stem, and promotes one specific object to nominative subject." }),
  C({ id: "l21-211-agent-prohibition", lesson: 21, section: "21.1", lineStart: 7034, lineEnd: 7037, category: "restriction", path: "classical-nahuatl-passive-vnc-passive-transformation-frame", proofFamily: "passive", summary: "The deleted active agent cannot be expressed in the passive transform." }),
  C({ id: "l21-211-specific-object-gate", lesson: 21, section: "21.1", lineStart: 7038, lineEnd: 7045, category: "restriction", path: "buildClassicalNahuatlDerivedVncFrame", proofFamily: "passive", summary: "Passive blocks intransitive and nonspecific-only sources; the latter route belongs to impersonal voice." }),
  C({ id: "l21-212-formula-arity", lesson: 21, section: "21.2", lineStart: 7046, lineEnd: 7053, category: "formula-invariant", path: ["buildClassicalNahuatlVoiceObjectClusterFrame", "applyClassicalNahuatlLesson23ObjectClusterToMachineryFrame"], proofFamily: "cluster", summary: "Passive output is intransitive or transitive according to retained object structure, never according to the discarded source subject." }),
  C({ id: "l21-2121-single-projective", lesson: 21, section: "21.2.1", lineStart: 7058, lineEnd: 7074, category: "participant-transform", path: "buildClassicalNahuatlDerivedVncFrame", proofFamily: "passive", summary: "A single specific projective object becomes the discontinuous subject and leaves an intransitive passive." }),
  C({ id: "l21-2121-silent-object", lesson: 21, section: "21.2.1", lineStart: 7075, lineEnd: 7080, category: "silent-participant", path: "buildClassicalNahuatlObjectClusterFrame", proofFamily: "cluster", summary: "A silently present third-singular object promotes exactly like a sounded specific object." }),
  C({ id: "l21-2121-silent-object-cross-reference", lesson: 21, section: "21.2.1 cross-reference", lineStart: 7075, lineEnd: 7080, category: "necessary-cross-reference", disposition: "read-only-evidence", path: "lesson18-silent-object-cross-reference", proofFamily: "evidence", summary: "Lesson 18 establishes the silent object's presence; the passive transform consumes the typed participant rather than the printed formula." }),
  C({ id: "l21-2122-reflexive-afterimage", lesson: 21, section: "21.2.2", lineStart: 7081, lineEnd: 7092, category: "participant-transform", path: "buildClassicalNahuatlDerivedVncFrame", proofFamily: "passive", summary: "A sole specific reflexive object becomes the subject and retains reflexivity as shuntline ne, yielding a transitive passive." }),
  C({ id: "l21-2123-reflexive-plus-projective", lesson: 21, section: "21.2.3", lineStart: 7093, lineEnd: 7108, category: "object-cluster-transform", path: "buildClassicalNahuatlVoiceObjectClusterFrame", proofFamily: "cluster", summary: "With reflexive plus specific projective, the projective promotes and the reflexive becomes shuntline ne." }),
  C({ id: "l21-2124-two-specific-mainline", lesson: 21, section: "21.2.4", lineStart: 7109, lineEnd: 7134, category: "object-cluster-transform", path: "buildClassicalNahuatlVoiceObjectClusterFrame", proofFamily: "cluster", summary: "With two specific projectives, the active mainline object promotes and the compatible silent shuntline object remains." }),
  C({ id: "l21-2124-object-order-cross-reference", lesson: 21, section: "21.2.4 cross-reference", lineStart: 7110, lineEnd: 7119, category: "necessary-cross-reference", disposition: "read-only-evidence", path: "lesson23-mainline-shuntline-cross-reference", proofFamily: "evidence", summary: "Lesson 23 supplies typed mainline/shuntline ordering and co-occurrence; Lesson 21 supplies the passive transform." }),
  C({ id: "l21-2124-third-plural-sounds", lesson: 21, section: "21.2.4", lineStart: 7135, lineEnd: 7147, category: "conditioned-object-realization", path: "buildClassicalNahuatlVoiceObjectClusterFrame", proofFamily: "cluster", summary: "Retained third-plural animate shuntline Ø-im regains sounded qu-im in the passive." }),
  C({ id: "l21-2125-specific-plus-nonspecific", lesson: 21, section: "21.2.5", lineStart: 7148, lineEnd: 7170, category: "object-cluster-transform", path: "buildClassicalNahuatlVoiceObjectClusterFrame", proofFamily: "cluster", summary: "The sole specific object promotes regardless of prominence and the nonspecific object remains." }),
  C({ id: "l21-2126-three-objects", lesson: 21, section: "21.2.6", lineStart: 7171, lineEnd: 7172, category: "recursive-object-transform", path: "buildClassicalNahuatlVoiceObjectClusterFrame", proofFamily: "cluster", summary: "Three-object passive sources recursively apply the same promotion, retention, and reflexive rules." }),
  C({ id: "l21-213-sentence-moods", lesson: 21, section: "21.3", lineStart: 7173, lineEnd: 7188, category: "sentence-interaction", path: ["buildClassicalNahuatlDerivedVncFrame", "buildClassicalNahuatlParticleSentenceSurfaceFrame"], proofFamily: "mood", summary: "Passive assertions feed wish, command/exhortation, and admonition sentence operations without a second voice engine." }),
  C({ id: "l21-213-negative-mo-cross-reference", lesson: 21, section: "21.3 cross-reference", lineStart: 7179, lineEnd: 7180, category: "necessary-cross-reference", disposition: "read-only-evidence", path: "lesson44-negative-mo-cross-reference", proofFamily: "evidence", summary: "The later negative-mō analysis is evidence for sentence polarity and cannot authorize passive morphology." }),
  C({ id: "l21-214-active-reflexive-passive-notion", lesson: 21, section: "21.4", lineStart: 7190, lineEnd: 7207, category: "contextual-alternative", path: "classical-nahuatl-active-reflexive-object-vnc", proofFamily: "passive", summary: "A limited active third-person reflexive construction can contextually express a passive notion without becoming passive morphology." }),
  C({ id: "l21-214-animate-patient", lesson: 21, section: "21.4", lineStart: 7208, lineEnd: 7218, category: "semantic-restriction", path: "classical-nahuatl-active-reflexive-object-vnc", proofFamily: "evidence", summary: "An animate subject remains a patient in this contextual construction; the examples cannot authorize a new voice route." }),
  C({ id: "l21-214-lesson30-crossref", lesson: 21, section: "21.4 note", lineStart: 7214, lineEnd: 7219, category: "necessary-cross-reference", disposition: "read-only-evidence", path: "lesson30-compound-verbstem-cross-reference", proofFamily: "evidence", summary: "The compound-stem analysis is deferred to Lesson 30 and is not constructed from the example string." }),

  C({ id: "l22-221-inherent-subject", lesson: 22, section: "22.1", lineStart: 7225, lineEnd: 7237, category: "lexical-voice", disposition: "new-canonical-rule", path: "buildClassicalNahuatlInherentImpersonalRecord", proofFamily: "impersonal", summary: "An inherently impersonal lexical stem has only a referentially empty third-singular subject." }),
  C({ id: "l22-221-meteorological-inventory", lesson: 22, section: "22.1", lineStart: 7238, lineEnd: 7246, category: "lexical-evidence", path: "getClassicalNahuatlInherentImpersonalSourceAnalysis", proofFamily: "evidence", summary: "The listed meteorological stems are exact lexical members; their printed finite examples are evidence, not answer authority." }),
  C({ id: "l22-222-nonanimate-distinction", lesson: 22, section: "22.2", lineStart: 7247, lineEnd: 7264, category: "semantic-restriction", path: "classical-nahuatl-vnc-subject-reference-frame", proofFamily: "impersonal", summary: "Nonanimate third-singular/common subjects remain specific and supplementable; impersonal subjects never are." }),
  C({ id: "l22-222-reflexive-cross-reference", lesson: 22, section: "22.2 cross-reference", lineStart: 7262, lineEnd: 7264, category: "necessary-cross-reference", disposition: "read-only-evidence", path: "lesson21-active-reflexive-passive-notion-cross-reference", proofFamily: "evidence", summary: "The §21.4 active reflexive substitute normally has a nonanimate but specific supplementable subject." }),
  C({ id: "l22-223-impersonal-transform", lesson: 22, section: "22.3", lineStart: 7265, lineEnd: 7286, category: "voice-operation", path: "buildClassicalNahuatlDerivedVncFrame", proofFamily: "impersonal", summary: "Transformed impersonal replaces the active subject with referentially empty third singular and substitutes the nonactive stem." }),
  C({ id: "l22-223-valence-and-object-gate", lesson: 22, section: "22.3", lineStart: 7287, lineEnd: 7295, category: "restriction", path: "buildClassicalNahuatlDerivedVncFrame", proofFamily: "impersonal", summary: "Intransitive and transitive sources may impersonalize, but any specific projective object blocks; reflexive sources remain eligible." }),
  C({ id: "l22-223-passive-complementarity", lesson: 22, section: "22.3", lineStart: 7300, lineEnd: 7308, category: "voice-interaction", path: "getClassicalNahuatlVncApplicationAllowedVoices", proofFamily: "impersonal", summary: "Passive promotes a specific patient, while impersonal requires no specific projective participant; their gates are complementary." }),
  C({ id: "l22-224-formula-and-subject", lesson: 22, section: "22.4", lineStart: 7309, lineEnd: 7317, category: "formula-invariant", path: "buildClassicalNahuatlDerivedVncFrame", proofFamily: "impersonal", summary: "The impersonal retains source valence formula, imports fixed third-singular subject, and makes the discarded source subject unrecoverable." }),
  C({ id: "l22-2241-intransitive-transform", lesson: 22, section: "22.4.1", lineStart: 7318, lineEnd: 7330, category: "voice-family", path: "buildClassicalNahuatlDerivedVncFrame", proofFamily: "impersonal", summary: "An intransitive active source yields an intransitive impersonal on its licensed nonactive stem." }),
  C({ id: "l22-2241-irregular-dislocation", lesson: 22, section: "22.4.1", lineStart: 7331, lineEnd: 7343, category: "irregular-interaction", path: ["buildClassicalNahuatlVerbstemPlan", "buildClassicalNahuatlDerivedVncFrame"], proofFamily: "impersonal", summary: "Lesson 11 form/meaning dislocation is inherited by the impersonal nonactive paradigm." }),
  C({ id: "l22-2242-retained-nonspecific", lesson: 22, section: "22.4.2", lineStart: 7344, lineEnd: 7357, category: "object-retention", path: "buildClassicalNahuatlVoiceObjectClusterFrame", proofFamily: "cluster", summary: "Transitive impersonal retains tē and tla nonspecific projective objects unchanged." }),
  C({ id: "l22-2243-reflexive-ne", lesson: 22, section: "22.4.3", lineStart: 7358, lineEnd: 7365, category: "object-transform", path: "buildClassicalNahuatlVoiceObjectClusterFrame", proofFamily: "cluster", summary: "A reflexive source retains reflexivity as shuntline ne in the impersonal transform." }),
  C({ id: "l22-225-sentence-moods", lesson: 22, section: "22.5", lineStart: 7366, lineEnd: 7384, category: "sentence-interaction", path: ["buildClassicalNahuatlDerivedVncFrame", "buildClassicalNahuatlParticleSentenceSurfaceFrame"], proofFamily: "mood", summary: "Impersonal assertions feed wish, command/exhortation, and admonition operations with their normal polarity interactions." }),
  C({ id: "l22-225-negative-mo-cross-reference", lesson: 22, section: "22.5 cross-reference", lineStart: 7374, lineEnd: 7375, category: "necessary-cross-reference", disposition: "read-only-evidence", path: "lesson44-negative-mo-cross-reference", proofFamily: "evidence", summary: "The later negative-mō analysis is a sentence-layer cross-reference, not impersonal stem authority." }),
  C({ id: "l22-226-tla-operation-and-restriction", lesson: 22, section: "22.6", lineStart: 7385, lineEnd: 7391, category: "conditioned-derivation", disposition: "new-canonical-rule", path: ["getClassicalNahuatlTlaImpersonalSourceAnalysis", "buildClassicalNahuatlTlaImpersonalStemRecord"], proofFamily: "tla", summary: "Predicate-internal derivational tla impersonalizes a licensed intransitive, normally inchoative or stative source and is not the tla object pronoun." }),
  C({ id: "l22-226-tla-lexical-inventory", lesson: 22, section: "22.6", lineStart: 7392, lineEnd: 7406, category: "lexical-and-conditioned-inventory", disposition: "new-canonical-rule", path: "getClassicalNahuatlTlaImpersonalSourceAnalysis", proofFamily: "tla", summary: "The listed inchoative and stative sources map to engine-owned tla-impersonal stems." }),
  C({ id: "l22-226-reduplication-cross-reference", lesson: 22, section: "22.6 cross-reference", lineStart: 7399, lineEnd: 7401, category: "necessary-cross-reference", disposition: "read-only-evidence", path: "lesson27-reduplicative-ca-cross-reference", proofFamily: "evidence", summary: "Lesson 27 supplies the reduplicative analysis of cah-ca-h; Lesson 22 only licenses its tla-impersonal use." }),
  C({ id: "l22-226-unattested-source", lesson: 22, section: "22.6", lineStart: 7407, lineEnd: 7410, category: "reconstructed-source-evidence", path: "getClassicalNahuatlTlaImpersonalSourceAnalysis", proofFamily: "evidence", summary: "The reconstructed unattested it-hui source is evidence for the licensed tla-t-hui output, not an editable source answer." }),
  C({ id: "l22-226-unattested-source-cross-reference", lesson: 22, section: "22.6 cross-reference", lineStart: 7407, lineEnd: 7410, category: "necessary-cross-reference", disposition: "read-only-evidence", path: "lesson26-it-hui-source-family-cross-reference", proofFamily: "evidence", summary: "Lesson 26 supplies the related source-family comparison for reconstructed it-hui." }),
  C({ id: "l22-226-meteorological-extensions", lesson: 22, section: "22.6", lineStart: 7411, lineEnd: 7421, category: "lexical-inventory", path: "getClassicalNahuatlTlaImpersonalSourceAnalysis", proofFamily: "tla", summary: "The listed lightning, thunder, darkness, dawn, and cold-weather stems are licensed tla-impersonal sources." }),
  C({ id: "l22-226-inherent-plus-tla", lesson: 22, section: "22.6", lineStart: 7426, lineEnd: 7429, category: "voice-layer-interaction", path: ["getClassicalNahuatlTlaImpersonalSourceAnalysis", "deriveClassicalNahuatlOrderedVoiceLayerChain"], proofFamily: "tla", summary: "Lexical yohua may take derivational tla without changing its translation value, as an ordered extra impersonal layer." }),
  C({ id: "l22-226-animate-generality-exception", lesson: 22, section: "22.6", lineStart: 7430, lineEnd: 7438, category: "lexical-semantic-exception", path: "getClassicalNahuatlTlaImpersonalSourceAnalysis", proofFamily: "tla", summary: "The two listed animate-general sources exceptionally permit tla-impersonal generality without grammatical plurality." }),
  C({ id: "l22-226-animate-source-cross-references", lesson: 22, section: "22.6 cross-reference", lineStart: 7433, lineEnd: 7438, category: "necessary-cross-reference", disposition: "read-only-evidence", path: ["lesson30-ihcahuaca-source-cross-reference", "lesson27-cuecuechca-source-cross-reference"], proofFamily: "evidence", summary: "Lessons 30 and 27 supply the internal source-stem formations; the Lesson 22 operation consumes those typed stems." }),
  C({ id: "l22-226-finite-contrasts", lesson: 22, section: "22.6", lineStart: 7439, lineEnd: 7452, category: "paradigm-consequence", path: ["buildClassicalNahuatlTlaImpersonalStemRecord", "buildClassicalNahuatlDerivedVncFrame"], proofFamily: "tla", summary: "The nēci, huāqui, tlatzini, and iztaya contrasts preserve tense while replacing the source with its exact tla-impersonal stem." }),
]);

const REQUIRED_SECTIONS = Object.freeze([
  "20.1", "20.1 note", "20.2", "20.2.1", "20.2.2", "20.2.3",
  "20.2.3 exception", "20.2.4", "20.3", "20.4", "20.5",
  "20.5 exception", "20.6", "20.7", "20.8",
  "21.1", "21.2", "21.2.1", "21.2.2", "21.2.3", "21.2.4",
  "21.2.5", "21.2.6", "21.3", "21.4", "21.4 note",
  "22.1", "22.2", "22.3", "22.4", "22.4.1", "22.4.2", "22.4.3",
  "22.5", "22.6",
]);

export const CLASSICAL_NAHUATL_LESSON22_INHERENT_IMPERSONAL_SOURCES =
  Object.freeze({
    "tōna": Object.freeze({ semanticClass: "meteorological-heat-or-sun", lineStart: 7238, lineEnd: 7238 }),
    "quiy-a-hui": Object.freeze({ semanticClass: "meteorological-rain", lineStart: 7239, lineEnd: 7239 }),
    "te-c-i-hui": Object.freeze({ semanticClass: "meteorological-hail", lineStart: 7240, lineEnd: 7240 }),
    "āy-a-hui": Object.freeze({ semanticClass: "meteorological-fog", lineStart: 7241, lineEnd: 7241 }),
    "yohua": Object.freeze({ semanticClass: "meteorological-nightfall", lineStart: 7242, lineEnd: 7242 }),
  });

export const CLASSICAL_NAHUATL_LESSON22_TLA_IMPERSONAL_SOURCES =
  Object.freeze({
    "huā-qui": Object.freeze({ targetStem: "tla-huā-qui", semanticClass: "inchoative", lineStart: 7393, lineEnd: 7393 }),
    "pol-i-hui": Object.freeze({ targetStem: "tla-pol-i-hui", semanticClass: "inchoative", lineStart: 7394, lineEnd: 7395 }),
    "cel-i-ya": Object.freeze({ targetStem: "tla-cel-i-ya", semanticClass: "inchoative", lineStart: 7396, lineEnd: 7397 }),
    "ihyā-ya": Object.freeze({ targetStem: "tla-ihyā-ya", semanticClass: "stative", lineStart: 7398, lineEnd: 7398 }),
    "cah-ca-h": Object.freeze({ targetStem: "tla-cah-ca-h", semanticClass: "stative", lineStart: 7399, lineEnd: 7401 }),
    "on-o": Object.freeze({ targetStem: "tla-on-o", semanticClass: "stative", lineStart: 7402, lineEnd: 7403 }),
    "chic-ā-hua": Object.freeze({ targetStem: "tla-chic-ā-hua", semanticClass: "inchoative", lineStart: 7404, lineEnd: 7405 }),
    "huē-i-ya": Object.freeze({ targetStem: "tla-huē-i-ya", semanticClass: "inchoative", lineStart: 7406, lineEnd: 7406 }),
    "it-hui": Object.freeze({ targetStem: "tla-t-hui", semanticClass: "reconstructed-inchoative", lineStart: 7407, lineEnd: 7410 }),
    "petl-ā-ni": Object.freeze({ targetStem: "tla-petl-ā-ni", semanticClass: "meteorological", lineStart: 7413, lineEnd: 7414 }),
    "tlatz-i-ni": Object.freeze({ targetStem: "tla-tlatz-ī-ni", semanticClass: "meteorological", lineStart: 7415, lineEnd: 7416 }),
    "poy-ā-hua": Object.freeze({ targetStem: "tla-poy-ā-hua", semanticClass: "meteorological", lineStart: 7417, lineEnd: 7418 }),
    "nēci": Object.freeze({ targetStem: "tla-nēci", semanticClass: "meteorological", lineStart: 7419, lineEnd: 7420 }),
    "ce-ce-ya": Object.freeze({ targetStem: "tla-ce-ce-ya", semanticClass: "meteorological", lineStart: 7421, lineEnd: 7421 }),
    "yohua": Object.freeze({ targetStem: "tla-yohua", semanticClass: "inherent-impersonal-layer", lineStart: 7426, lineEnd: 7429 }),
    "ih-cahu-a-ca": Object.freeze({ targetStem: "tla-h-cahu-a-ca", semanticClass: "animate-generality-exception", lineStart: 7430, lineEnd: 7436 }),
    "cue-cuech-ca": Object.freeze({ targetStem: "tla-cue-cuech-ca", semanticClass: "animate-generality-exception", lineStart: 7437, lineEnd: 7438 }),
    "izta-ya": Object.freeze({ targetStem: "tla-zta-ya", semanticClass: "finite-contrast-inchoative", lineStart: 7450, lineEnd: 7452 }),
  });

const LCM_DISTINCTION_AXES = Object.freeze([
  "source-stem-identity",
  "source-verbstem-class",
  "source-valence",
  "source-object-count",
  "object-kind-sequence",
  "mainline-shuntline-silent-object-status",
  "nonactive-formation-core",
  "nonactive-formation-continuation",
  "source-final-shape",
  "source-morpheme-boundaries",
  "lexical-exception-or-suppletion",
  "licensed-formation-alternatives",
  "nonactive-imperfective-perfective",
  "nonactive-class-a1-a2",
  "voice-operation",
  "specific-object-promotion",
  "reflexive-ne-retention",
  "nonspecific-object-retention",
  "specific-shuntline-retention",
  "impersonal-subject-reference",
  "active-agent-deletion",
  "irregular-stem-tense-dislocation",
  "mood-and-sentence-force",
  "polarity",
  "semantic-versus-morphological-tense",
  "scalar-versus-full-paradigm",
  "lexical-inherent-impersonal-class",
  "tla-impersonal-source-class",
  "conditioned-boundary-realization",
  "read-only-evidence",
]);

function normalizeStem(value = "") {
  return String(value || "").trim().replace(/[()]/gu, "").replace(/\s+/gu, "");
}

function boundaryFreeKey(value = "") {
  return normalizeStem(value).replace(/-/gu, "");
}

function resolveInventoryRecord(inventory, sourceStem = "") {
  const normalized = normalizeStem(sourceStem);
  const exact = inventory[normalized];
  if (exact) return { sourceStem: normalized, record: exact };
  const key = boundaryFreeKey(normalized);
  const match = Object.entries(inventory).find(([candidate]) => boundaryFreeKey(candidate) === key);
  return match ? { sourceStem: match[0], record: match[1] } : null;
}

export function getClassicalNahuatlInherentImpersonalSourceAnalysis(sourceStem = "") {
  const normalized = normalizeStem(sourceStem);
  const resolved = resolveInventoryRecord(
    CLASSICAL_NAHUATL_LESSON22_INHERENT_IMPERSONAL_SOURCES,
    normalized
  );
  return Object.freeze({
    kind: "classical-nahuatl-impersonal-vnc-inherent-impersonal-source-analysis",
    version: 1,
    authorizationStatus: resolved ? "authorized" : "blocked",
    blockReason: !normalized
      ? "lesson22-inherent-impersonal-source-stem-required"
      : resolved ? "" : "lesson22-inherent-impersonal-source-not-in-canvas-inventory",
    enteredSourceStem: normalized,
    canonicalSourceStem: resolved?.sourceStem || "",
    semanticClass: resolved?.record.semanticClass || "",
    sourceDocument: SOURCE_DOCUMENT,
    transcriptionLineStart: resolved?.record.lineStart || 0,
    transcriptionLineEnd: resolved?.record.lineEnd || 0,
    callerSuppliedLexicalClassAuthority: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

export function getClassicalNahuatlTlaImpersonalSourceAnalysis(sourceStem = "") {
  const normalized = normalizeStem(sourceStem);
  const resolved = resolveInventoryRecord(
    CLASSICAL_NAHUATL_LESSON22_TLA_IMPERSONAL_SOURCES,
    normalized
  );
  return Object.freeze({
    kind: "classical-nahuatl-impersonal-vnc-tla-impersonal-source-analysis",
    version: 1,
    authorizationStatus: resolved ? "authorized" : "blocked",
    blockReason: !normalized
      ? "lesson22-tla-impersonal-source-stem-required"
      : resolved ? "" : "lesson22-tla-impersonal-source-not-licensed-by-canvas",
    enteredSourceStem: normalized,
    canonicalSourceStem: resolved?.sourceStem || "",
    targetStem: resolved?.record.targetStem || "",
    semanticClass: resolved?.record.semanticClass || "",
    sourceDocument: SOURCE_DOCUMENT,
    transcriptionLineStart: resolved?.record.lineStart || 0,
    transcriptionLineEnd: resolved?.record.lineEnd || 0,
    targetDerivedByEngine: Boolean(resolved),
    callerSuppliedTargetAuthority: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

function buildSignature(claims) {
  const payload = JSON.stringify(claims.map(claim => ({
    id: claim.id,
    lesson: claim.lesson,
    section: claim.section,
    sourceDocument: claim.sourceDocument,
    transcriptionLineStart: claim.transcriptionLineStart,
    transcriptionLineEnd: claim.transcriptionLineEnd,
    category: claim.category,
    disposition: claim.disposition,
    implementationStatus: claim.implementationStatus,
    canonicalObjectIds: claim.canonicalObjectIds,
    proofFamily: claim.proofFamily,
    proofIds: claim.proofIds,
    paradigmConsequence: claim.paradigmConsequence,
    projections: claim.projections,
    lessonMetadataAuthority: claim.lessonMetadataAuthority,
    sourceTextAuthority: claim.sourceTextAuthority,
    displayTextAuthority: claim.displayTextAuthority,
  })));
  let hash = 2166136261;
  for (let index = 0; index < payload.length; index += 1) {
    hash ^= payload.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}

export function buildClassicalNahuatlLessons20To22ClosureFrame() {
  const claims = CLASSICAL_NAHUATL_LESSONS20_22_CLOSURE_CLAIMS.map(claim => ({
    ...claim,
    canonicalObjectIds: [...claim.canonicalObjectIds],
    proofIds: { ...claim.proofIds },
    projections: [...claim.projections],
  }));
  const diagnostics = [];
  const seenIds = new Set();
  claims.forEach(claim => {
    if (!claim.id || seenIds.has(claim.id)) diagnostics.push(`duplicate-or-missing-claim-id:${claim.id || "empty"}`);
    seenIds.add(claim.id);
    if (!["20", "21", "22"].includes(claim.lesson)) diagnostics.push(`unknown-lesson:${claim.id}`);
    if (!claim.section || !Number.isInteger(claim.transcriptionLineStart) || !Number.isInteger(claim.transcriptionLineEnd) || claim.transcriptionLineStart > claim.transcriptionLineEnd) diagnostics.push(`invalid-source-span:${claim.id}`);
    if (!DISPOSITIONS.has(claim.disposition)) diagnostics.push(`invalid-disposition:${claim.id}`);
    if (claim.implementationStatus !== "implemented") diagnostics.push(`partial-implementation:${claim.id}`);
    if (!claim.canonicalObjectIds.length || claim.canonicalObjectIds.some(value => !value)) diagnostics.push(`missing-executable-path:${claim.id}`);
    if (!PROOF_FAMILIES[claim.proofFamily]) diagnostics.push(`unknown-proof-family:${claim.id}`);
    if (!claim.proofIds || ["positive", "negative", "interaction", "hostile", "scalar", "paradigm"].some(kind => !claim.proofIds[kind])) diagnostics.push(`missing-proof-obligation:${claim.id}`);
    if (claim.projections.length !== 0 || claim.presentationExposure !== false) diagnostics.push(`audit-presentation-exposure:${claim.id}`);
    if (claim.lessonMetadataAuthority !== false || claim.sourceTextAuthority !== false || claim.displayTextAuthority !== false) diagnostics.push(`authority-boundary-invalid:${claim.id}`);
  });
  REQUIRED_SECTIONS.forEach(section => {
    if (!claims.some(claim => claim.section === section)) diagnostics.push(`unclassified-source-section:${section}`);
  });
  const lessonCounts = Object.fromEntries(
    ["20", "21", "22"].map(lesson => [
      lesson,
      claims.filter(claim => claim.lesson === lesson).length,
    ])
  );
  const dispositionCounts = Object.fromEntries(
    [...DISPOSITIONS].map(disposition => [
      disposition,
      claims.filter(claim => claim.disposition === disposition).length,
    ])
  );
  return {
    kind: "classical-nahuatl-nonactive-vnc-source-closure-frame",
    version: 1,
    authorizationStatus: diagnostics.length ? "blocked" : "authorized",
    blockReason: diagnostics.length ? "lessons20-22-source-closure-incomplete" : "",
    sourceDocument: SOURCE_DOCUMENT,
    sourceLineStart: 6742,
    sourceLineEnd: 7452,
    claimCount: claims.length,
    claimSignatureAlgorithm: "fnv1a32-v1",
    claimSignature: buildSignature(claims),
    lessonCounts,
    dispositionCounts,
    unclassifiedClaimCount: diagnostics.filter(value => value.startsWith("unclassified")).length,
    partialImplementationCount: diagnostics.filter(value => value.startsWith("partial")).length,
    missingExecutablePathCount: diagnostics.filter(value => value.startsWith("missing-executable")).length,
    missingProofObligationCount: diagnostics.filter(value => value.startsWith("missing-proof")).length,
    diagnostics,
    claims,
    greatestCommonDivisor: {
      identityId: "lessons20-22:typed-nonactive-voice-transformation",
      sourceKind: "authorized-typed-active-vnc",
      predicateInvariant: "one-typed-verbstem-in-the-predicate-slot",
      operationOrder: [
        "active-source-analysis",
        "nonactive-stem-derivation-when-required",
        "voice-participant-transformation",
        "class-a-finite-realization-when-nonactive",
        "sentence-force-composition",
      ],
      deletedAgentExpressible: false,
      sourceClosureRequired: true,
      formulaStringAuthority: false,
      displayTextAuthority: false,
    },
    leastCommonMultiple: {
      distinctionAxes: [...LCM_DISTINCTION_AXES],
      distinctionAxisCount: LCM_DISTINCTION_AXES.length,
      voiceOperationInventory: [
        "passive",
        "impersonal",
        "inherent-impersonal",
        "tla-impersonal",
      ],
      nonactiveCoreInventory: ["ō", "lō", "hua"],
      nonactiveContinuationInventory: ["none", "hua", "lō"],
      sourceClassInventory: ["A", "B", "C", "D"],
      nonactiveClassInventory: ["A-1", "A-2"],
      objectCountInventory: [0, 1, 2, 3],
      sourceClaimCount: claims.length,
      selectedRealizationsAreEngineOwned: true,
    },
    inherentImpersonalSourceCount: Object.keys(
      CLASSICAL_NAHUATL_LESSON22_INHERENT_IMPERSONAL_SOURCES
    ).length,
    tlaImpersonalSourceCount: Object.keys(
      CLASSICAL_NAHUATL_LESSON22_TLA_IMPERSONAL_SOURCES
    ).length,
    sourceInventoryIsRuntimeAuthority: false,
    sourceSpansAuthorizeOutput: false,
    proofIdsAuthorizeOutput: false,
    formulaStringAuthority: false,
    displayTextAuthority: false,
  };
}
