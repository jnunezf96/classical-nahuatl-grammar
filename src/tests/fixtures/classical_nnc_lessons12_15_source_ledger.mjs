// Test-only claim-level source ledger for Andrews Lessons 12-15.

const SOURCE_DOCUMENT = "ANDREWS_TRANSCRIPTION_CANVAS.md";
const DISPOSITIONS = new Set([
  "existing-canonical-rule",
  "new-canonical-rule",
  "read-only-evidence",
  "genuinely-blocked",
]);

const PROOF_FAMILIES = Object.freeze({
  shell: Object.freeze({
    positive: "nnc-closure:shell-positive",
    negative: "nnc-closure:shell-negative",
    interaction: "nnc-closure:shell-state-interaction",
    hostile: "nnc-closure:shell-hostile-authority",
    scalar: "nnc-closure:shell-scalar",
    paradigm: "nnc-closure:shell-paradigm",
  }),
  subject: Object.freeze({
    positive: "nnc-closure:subject-positive",
    negative: "nnc-closure:subject-negative",
    interaction: "nnc-closure:subject-state-interaction",
    hostile: "nnc-closure:subject-hostile-formula",
    scalar: "nnc-closure:subject-scalar",
    paradigm: "nnc-closure:subject-paradigm",
  }),
  possessor: Object.freeze({
    positive: "nnc-closure:possessor-positive",
    negative: "nnc-closure:possessor-negative",
    interaction: "nnc-closure:possessor-boundary-interaction",
    hostile: "nnc-closure:possessor-hostile-carrier",
    scalar: "nnc-closure:possessor-scalar",
    paradigm: "nnc-closure:possessor-paradigm",
  }),
  class: Object.freeze({
    positive: "nnc-closure:class-positive",
    negative: "nnc-closure:class-negative",
    interaction: "nnc-closure:class-state-interaction",
    hostile: "nnc-closure:class-hostile-display",
    scalar: "nnc-closure:class-scalar",
    paradigm: "nnc-closure:class-paradigm",
  }),
  relation: Object.freeze({
    positive: "nnc-closure:relation-positive",
    negative: "nnc-closure:relation-negative",
    interaction: "nnc-closure:relation-number-interaction",
    hostile: "nnc-closure:relation-hostile-derived-string",
    scalar: "nnc-closure:relation-scalar",
    paradigm: "nnc-closure:relation-paradigm",
  }),
  boundary: Object.freeze({
    positive: "nnc-closure:boundary-positive",
    negative: "nnc-closure:boundary-negative",
    interaction: "nnc-closure:boundary-morphology-interaction",
    hostile: "nnc-closure:boundary-hostile-spelling",
    scalar: "nnc-closure:boundary-scalar",
    paradigm: "nnc-closure:boundary-paradigm",
  }),
  lexical: Object.freeze({
    positive: "nnc-closure:lexical-positive",
    negative: "nnc-closure:lexical-negative",
    interaction: "nnc-closure:lexical-state-interaction",
    hostile: "nnc-closure:lexical-hostile-example",
    scalar: "nnc-closure:lexical-scalar",
    paradigm: "nnc-closure:lexical-paradigm",
  }),
  sentence: Object.freeze({
    positive: "nnc-closure:sentence-positive",
    negative: "nnc-closure:sentence-negative",
    interaction: "nnc-closure:sentence-nnc-interaction",
    hostile: "nnc-closure:sentence-hostile-lesson-order",
    scalar: "nnc-closure:sentence-scalar",
    paradigm: "nnc-closure:sentence-paradigm",
  }),
  evidence: Object.freeze({
    positive: "nnc-closure:evidence-projection",
    negative: "nnc-closure:evidence-not-authority",
    interaction: "nnc-closure:evidence-cross-reference",
    hostile: "nnc-closure:evidence-hostile-source-answer",
    scalar: "nnc-closure:evidence-scalar-receipt",
    paradigm: "nnc-closure:evidence-paradigm-receipt",
  }),
});

function freezeClaim({
  id,
  lesson,
  section,
  lineStart,
  lineEnd,
  category,
  disposition = "existing-canonical-rule",
  path,
  proofFamily,
  summary,
  paradigmConsequence = true,
  projections = ["grammar", "result"],
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
    projections: Object.freeze([...projections]),
    summary,
    lessonMetadataAuthority: false,
    sourceTextAuthority: false,
    displayTextAuthority: false,
  });
}

const C = freezeClaim;

export const CLASSICAL_NAHUATL_LESSONS12_15_CLOSURE_CLAIMS = Object.freeze([
  C({ id: "l12-121-state-replaces-valence", lesson: 12, section: "12.1", lineStart: 4379, lineEnd: 4385, category: "invariant", path: "nnc-clause-shell", proofFamily: "shell", summary: "NNC State replaces VNC Valence and the possessor remains inside the predicate." }),
  C({ id: "l12-121-no-tense-slot", lesson: 12, section: "12.1", lineStart: 4380, lineEnd: 4386, category: "restriction", path: "nnc-clause-shell", proofFamily: "shell", summary: "An NNC has no tense position." }),
  C({ id: "l12-122-absolutive-formula", lesson: 12, section: "12.2", lineStart: 4387, lineEnd: 4393, category: "formula", path: "nnc-absolutive-state", proofFamily: "shell", summary: "Vacant State yields the absolutive formula and its Subject/Predicate hierarchy." }),
  C({ id: "l12-1231-subject-person-excludes-x", lesson: 12, section: "12.3.1", lineStart: 4394, lineEnd: 4398, category: "restriction", path: "buildClassicalNahuatlNncSubjectPersonFrame", proofFamily: "subject", summary: "NNC person morphs reuse the VNC inventory except second-person x and xi." }),
  C({ id: "l12-1232-number-is-subject-owned", lesson: 12, section: "12.3.2", lineStart: 4399, lineEnd: 4409, category: "invariant", path: "classical-nahuatl-nnc-slot-frame", proofFamily: "subject", summary: "The State-conditioned number connector belongs to the subject, not the predicate." }),
  C({ id: "l12-1232a-common-class-connectors", lesson: 12, section: "12.3.2.a", lineStart: 4410, lineEnd: 4422, category: "conditioned-operation", path: "resolveClassicalNahuatlLesson12AbsolutiveNumberDyad", proofFamily: "subject", summary: "Class and boundary select tl, tli/li, in, or zero with common num2 zero." }),
  C({ id: "l12-1232a-supportive-and-l-assimilation", lesson: 12, section: "12.3.2.a", lineStart: 4413, lineEnd: 4419, category: "conditioned-sound-change", path: ["resolveClassicalNahuatlLesson12AbsolutiveNumberDyad", "lesson-2-l-plus-tl-assimilation"], proofFamily: "boundary", summary: "Supportive i and stem-final l condition the tli/li realization." }),
  C({ id: "l12-1232b-plural-dyads", lesson: 12, section: "12.3.2.b", lineStart: 4423, lineEnd: 4437, category: "lexical-selection", path: "resolveClassicalNahuatlLesson12AbsolutiveNumberDyad", proofFamily: "subject", summary: "Animate plural subjects use a lexically selected t-in, m-eh, or zero-h dyad." }),
  C({ id: "l12-124-complete-subject-paradigm", lesson: 12, section: "12.4", lineStart: 4438, lineEnd: 4483, category: "paradigm", path: "buildClassicalNahuatlAbsolutiveParadigmContractFrame", proofFamily: "subject", summary: "All person and number-connector combinations are paradigm consequences." }),
  C({ id: "l12-125-nounstem-predicate", lesson: 12, section: "12.5", lineStart: 4484, lineEnd: 4496, category: "invariant", path: "classical-nahuatl-absolutive-nnc-nounstem-predicate-semantics-frame", proofFamily: "shell", summary: "The nounstem alone is the absolutive predicate and identifies, describes, or locates." }),
  C({ id: "l12-125-contextual-time", lesson: 12, section: "12.5", lineStart: 4487, lineEnd: 4492, category: "restriction", path: "classical-nahuatl-absolutive-nnc-nounstem-predicate-semantics-frame", proofFamily: "sentence", summary: "Time reference is contextual and is not an NNC tense selection." }),
  C({ id: "l12-125-definiteness-neutral", lesson: 12, section: "12.5", lineStart: 4500, lineEnd: 4504, category: "restriction", path: "buildClassicalNahuatlSentenceHandoffFrame", proofFamily: "sentence", summary: "The nominal predicate does not encode definiteness or indefiniteness." }),
  C({ id: "l12-126-lexical-animacy-and-reference", lesson: 12, section: "12.6", lineStart: 4505, lineEnd: 4515, category: "lexical-condition", path: "buildClassicalNahuatlNncSourceAuthorityFrame", proofFamily: "lexical", summary: "Lexical animacy guides but referential animacy can override it metaphorically." }),
  C({ id: "l12-126-animacy-number-gate", lesson: 12, section: "12.6", lineStart: 4516, lineEnd: 4533, category: "restriction", path: "resolveClassicalNahuatlLesson12AbsolutiveNumberDyad", proofFamily: "subject", summary: "Animate reference permits singular/plural; nonanimate reference uses common number unless metaphorical." }),
  C({ id: "l12-126-number-not-noun-inflection", lesson: 12, section: "12.6 warning", lineStart: 4534, lineEnd: 4560, category: "invariant", path: "classical-nahuatl-nnc-slot-frame", proofFamily: "subject", summary: "Number remains wholly in the subject despite nounstem-conditioned connector shape." }),
  C({ id: "l12-127-lexical-state-availability", lesson: 12, section: "12.7", lineStart: 4561, lineEnd: 4568, category: "lexical-restriction", path: "buildClassicalNahuatlNncSourceAuthorityFrame", proofFamily: "lexical", summary: "Most nounstems permit both States; typed lexical semantics can restrict one State." }),

  C({ id: "l13-131-monadic-and-dyadic-formulas", lesson: 13, section: "13.1", lineStart: 4576, lineEnd: 4589, category: "formula", path: "nnc-possessive-state", proofFamily: "possessor", summary: "Possessive State has monadic and dyadic formula arities." }),
  C({ id: "l13-132-person-reuse", lesson: 13, section: "13.2.1", lineStart: 4590, lineEnd: 4593, category: "invariant", path: "buildClassicalNahuatlNncSubjectPersonFrame", proofFamily: "subject", summary: "Possessive and absolutive NNCs share subject person fillers." }),
  C({ id: "l13-132-common-connectors", lesson: 13, section: "13.2.2", lineStart: 4594, lineEnd: 4603, category: "conditioned-operation", path: "resolveClassicalNahuatlLesson13PossessiveNumberDyad", proofFamily: "subject", summary: "Boundary and lexical subclass select uh, hui, or zero for common subjects." }),
  C({ id: "l13-132-uh-hu-spelling", lesson: 13, section: "13.2.2", lineStart: 4602, lineEnd: 4605, category: "conditioned-spelling", path: "resolveClassicalNahuatlLesson13PossessiveNumberDyad", proofFamily: "boundary", summary: "Silent following num2 spells uh; sounded plural num2 spells hu." }),
  C({ id: "l13-132-num2-zero-or-an", lesson: 13, section: "13.2.3", lineStart: 4606, lineEnd: 4608, category: "paradigm", path: "resolveClassicalNahuatlLesson13PossessiveNumberDyad", proofFamily: "subject", summary: "Possessive subject num2 is zero for common and an for plural." }),
  C({ id: "l13-133-complete-subject-paradigm", lesson: 13, section: "13.3", lineStart: 4609, lineEnd: 4626, category: "paradigm", path: "buildClassicalNahuatlPossessiveParadigmContractFrame", proofFamily: "subject", summary: "All possessive-State subject person and number forms are paradigm consequences." }),
  C({ id: "l13-134-monadic-possessor-categories", lesson: 13, section: "13.4", lineStart: 4627, lineEnd: 4647, category: "inventory", path: "buildClassicalNahuatlPossessiveStateFrame", proofFamily: "possessor", summary: "Monadic State realizes reciprocal ne and nonspecific human te or nonhuman tla." }),
  C({ id: "l13-134-reciprocal-third-person", lesson: 13, section: "13.4.1", lineStart: 4638, lineEnd: 4641, category: "restriction", path: "buildClassicalNahuatlPossessiveStateFrame", proofFamily: "possessor", summary: "Reciprocal possessor ne is restricted to third-person subjects." }),
  C({ id: "l13-134-tla-relational-condition", lesson: 13, section: "13.4.2", lineStart: 4642, lineEnd: 4647, category: "restriction", path: "buildClassicalNahuatlNncSourceAuthorityFrame", proofFamily: "lexical", summary: "Nonspecific nonhuman tla requires relational or licensed analogical source analysis." }),
  C({ id: "l13-135-dyadic-category-distribution", lesson: 13, section: "13.5", lineStart: 4648, lineEnd: 4671, category: "conditioned-operation", path: "buildClassicalNahuatlPossessiveStateFrame", proofFamily: "possessor", summary: "st1 and st2 distribute person, number, and possessive case by possessor person." }),
  C({ id: "l13-135-o-silent-before-vowel", lesson: 13, section: "13.5.2.b", lineStart: 4669, lineEnd: 4671, category: "conditioned-boundary", path: "buildClassicalNahuatlPossessiveStateFrame", proofFamily: "boundary", summary: "First/second possessor o is replaced by its silent mate before a vowel-initial stem." }),
  C({ id: "l13-135-third-plural-m-n", lesson: 13, section: "13.5.2.a", lineStart: 4663, lineEnd: 4668, category: "conditioned-operation", path: "resolveClassicalNahuatlThirdPluralPossessorSt2", proofFamily: "possessor", summary: "Third-plural possessor st2 realizes conditioned m or n." }),
  C({ id: "l13-136-specific-possessor-paradigm", lesson: 13, section: "13.6", lineStart: 4672, lineEnd: 4685, category: "paradigm", path: "buildClassicalNahuatlPossessiveParadigmContractFrame", proofFamily: "possessor", summary: "Specific possessor person/number morphs form the full possessor inventory." }),
  C({ id: "l13-136-plural-possessor-interpretation", lesson: 13, section: "13.6", lineStart: 4686, lineEnd: 4688, category: "contextual-interpretation", disposition: "read-only-evidence", path: "lesson13-possessor-interpretation-evidence", proofFamily: "evidence", summary: "Plural possessors admit contextual one-of and nonspecific translations." }),
  C({ id: "l13-136-traditional-spelling-warning", lesson: 13, section: "13.6 note", lineStart: 4689, lineEnd: 4693, category: "orthographic-warning", disposition: "read-only-evidence", path: "lesson13-traditional-spelling-evidence", proofFamily: "evidence", summary: "Traditional consonant spelling cannot select between VNC ammo and NNC amo analyses." }),

  C({ id: "l14-141-use-stem-selection", lesson: 14, section: "14.1", lineStart: 4699, lineEnd: 4705, category: "conditioned-operation", path: "buildClassicalNahuatlNounstemSourceFrame", proofFamily: "class", summary: "Absolutive selects restricted-use; possessive and compound embed select general-use." }),
  C({ id: "l14-142-four-lexical-classes", lesson: 14, section: "14.2", lineStart: 4706, lineEnd: 4723, category: "lexical-inventory", path: "buildClassicalNahuatlLexicalSelectionRecord", proofFamily: "class", summary: "The four nounstem classes are lexical and named by absolutive common num1." }),
  C({ id: "l14-142-form-constraints", lesson: 14, section: "14.2.2-5", lineStart: 4724, lineEnd: 4736, category: "restriction", path: "getClassicalNahuatlClassFormGuidance", proofFamily: "class", summary: "Stem shape constrains class candidates but never predicts class membership." }),
  C({ id: "l14-142-alternative-membership", lesson: 14, section: "14.2.6", lineStart: 4737, lineEnd: 4740, category: "lexical-alternative", path: "buildClassicalNahuatlLexicalSelectionRecord", proofFamily: "lexical", summary: "A typed lexical record may license multiple class memberships without a meaning change." }),
  C({ id: "l14-142-supportive-initial-variant", lesson: 14, section: "14.2.7", lineStart: 4741, lineEnd: 4742, category: "lexical-alternative", path: "buildClassicalNahuatlLexicalSelectionRecord", proofFamily: "boundary", summary: "A supportive initial vowel may have a lexically licensed absent variant." }),
  C({ id: "l14-142-use-shapes", lesson: 14, section: "14.2.8", lineStart: 4743, lineEnd: 4751, category: "inventory", path: ["buildClassicalNahuatlNounstemSourceFrame", "buildClassicalNahuatlGlottalizedGeneralUseFrame"], proofFamily: "class", summary: "General-use stems may be base, truncated, or compound-embed-only glottalized." }),
  C({ id: "l14-143-number-versus-relation", lesson: 14, section: "14.3", lineStart: 4752, lineEnd: 4763, category: "invariant", path: "nnc-derived-stem-relation", proofFamily: "relation", summary: "Affinity and distributive/varietal morphology is stem-internal relation, not grammatical number." }),
  C({ id: "l14-1431-affinity-derivation", lesson: 14, section: "14.3.1", lineStart: 4764, lineEnd: 4775, category: "operation", path: "deriveClassicalNahuatlStem", proofFamily: "relation", summary: "Affinity adds a reduplicative prefix with a long vowel." }),
  C({ id: "l14-1431-affective-cross-reference", lesson: 14, section: "14.3.1 note", lineStart: 4776, lineEnd: 4777, category: "necessary-cross-reference", disposition: "read-only-evidence", path: "lesson32-affective-nounstem-cross-reference", proofFamily: "evidence", summary: "Affective short-vowel reduplication is a distinct Lesson 32 operation." }),
  C({ id: "l14-1432-distributive-derivation", lesson: 14, section: "14.3.2", lineStart: 4778, lineEnd: 4788, category: "operation", path: "deriveClassicalNahuatlStem", proofFamily: "relation", summary: "Distributive/varietal derivation adds a glottal-stop reduplicative prefix and treats supportive initial i as a vowel." }),
  C({ id: "l14-143-derived-lexical-meaning", lesson: 14, section: "14.3.2", lineStart: 4789, lineEnd: 4799, category: "lexical-result", disposition: "read-only-evidence", path: "lesson14-derived-meaning-evidence", proofFamily: "evidence", summary: "Derived stems may lexicalize or intensify, but examples cannot mutate the source stem." }),
  C({ id: "l14-143-pronominal-number-exception", lesson: 14, section: "14.3 note", lineStart: 4800, lineEnd: 4801, category: "necessary-cross-reference", disposition: "read-only-evidence", path: "lesson16-pronominal-number-cross-reference", proofFamily: "evidence", summary: "Pluralized pronominal stems are a Lesson 16 exception, not an ordinary-NNC rule." }),
  C({ id: "l14-143-summary-environments", lesson: 14, section: "14.3 remark", lineStart: 4802, lineEnd: 4824, category: "interaction", path: "buildClassicalNahuatlNounstemParadigmContractFrame", proofFamily: "class", summary: "Use kind, use shape, and stem relation remain independent conditioned dimensions." }),
  C({ id: "l14-144-absolutive-common-base", lesson: 14, section: "14.4", lineStart: 4825, lineEnd: 4838, category: "restriction", path: "resolveClassicalNahuatlLesson14ConnectorSelection", proofFamily: "class", summary: "Absolutive singular/common uses the base restricted-use stem, including derived nonanimate common stems." }),
  C({ id: "l14-145-plain-plural-selection", lesson: 14, section: "14.5.1", lineStart: 4839, lineEnd: 4875, category: "lexical-selection", path: ["buildClassicalNahuatlLexicalSelectionRecord", "resolveClassicalNahuatlLesson14ConnectorSelection"], proofFamily: "lexical", summary: "Plain plural stem and number dyad choices are lexical, with class guidance only." }),
  C({ id: "l14-145-affinity-plural-selection", lesson: 14, section: "14.5.2", lineStart: 4876, lineEnd: 4902, category: "lexical-selection", path: "resolveClassicalNahuatlLesson14ConnectorSelection", proofFamily: "relation", summary: "Affinity can be obligatory and has class-conditioned connector defaults plus lexical exceptions." }),
  C({ id: "l14-145-distributive-copies-source", lesson: 14, section: "14.5.3", lineStart: 4906, lineEnd: 4908, category: "restriction", path: "resolveClassicalNahuatlLesson14ConnectorSelection", proofFamily: "relation", summary: "A distributive/varietal plural copies the source stem's plural connector." }),
  C({ id: "l14-145-alternative-cardinality-preference", lesson: 14, section: "14.5.4", lineStart: 4909, lineEnd: 4931, category: "lexical-alternative", path: "buildClassicalNahuatlLexicalSelectionRecord", proofFamily: "lexical", summary: "A lexical record licenses one to three formations and may mark one preferred." }),
  C({ id: "l14-146-possessive-plural-relation", lesson: 14, section: "14.6", lineStart: 4932, lineEnd: 4959, category: "interaction", path: "resolveClassicalNahuatlLesson14ConnectorSelection", proofFamily: "relation", summary: "Possessive plural normally uses plain general-use; affinity/distributive requires typed semantic need." }),
  C({ id: "l14-147-in-zero-common", lesson: 14, section: "14.7.1.a", lineStart: 4960, lineEnd: 4971, category: "conditioned-operation", path: "resolveClassicalNahuatlLesson14ConnectorSelection", proofFamily: "class", summary: "in and zero classes use base general-use with zero num1." }),
  C({ id: "l14-147-tli-subclasses", lesson: 14, section: "14.7.1.b", lineStart: 4972, lineEnd: 5017, category: "conditioned-operation", path: "resolveClassicalNahuatlLesson14ConnectorSelection", proofFamily: "class", summary: "tli subclass 1 uses zero; subclass 2 uses hui or a lexically licensed silent alternative." }),
  C({ id: "l14-147-tl-subclass1", lesson: 14, section: "14.7.2.a", lineStart: 5018, lineEnd: 5051, category: "conditioned-operation", path: "resolveClassicalNahuatlLesson14ConnectorSelection", proofFamily: "class", summary: "tl 1-A uses base plus uh; tl 1-B uses base plus zero." }),
  C({ id: "l14-147-stem-final-w-ambiguity", lesson: 14, section: "14.7.2.a.i note", lineStart: 5031, lineEnd: 5041, category: "constituent-ambiguity", path: "buildClassicalNahuatlConstituentAnalysisFrame", proofFamily: "boundary", summary: "Stem-final voiceless w plus zero and stem plus uh connector remain distinct typed analyses." }),
  C({ id: "l14-147-tl-subclass2-general", lesson: 14, section: "14.7.2.b", lineStart: 5052, lineEnd: 5056, category: "operation", path: "buildClassicalNahuatlNounstemSourceFrame", proofFamily: "class", summary: "tl subclass 2 deletes a lexically ephemeral final a or i and uses zero num1." }),
  C({ id: "l14-147-tl-2a-shape", lesson: 14, section: "14.7.2.b.i", lineStart: 5057, lineEnd: 5063, category: "conditioned-stem-change", disposition: "new-canonical-rule", path: "validateClassicalNahuatlSubclassSourceShape", proofFamily: "boundary", summary: "2-A deletes final short i only after long a or e." }),
  C({ id: "l14-147-tl-2b-shape", lesson: 14, section: "14.7.2.b.ii", lineStart: 5064, lineEnd: 5092, category: "conditioned-stem-change", disposition: "new-canonical-rule", path: "validateClassicalNahuatlSubclassSourceShape", proofFamily: "boundary", summary: "2-B deletes final short a or i only after one consonant and preserves resulting consonant spelling." }),
  C({ id: "l14-147-tl-2c-shape", lesson: 14, section: "14.7.2.b.iii", lineStart: 5093, lineEnd: 5103, category: "conditioned-stem-change", disposition: "new-canonical-rule", path: "validateClassicalNahuatlSubclassSourceShape", proofFamily: "boundary", summary: "2-C compound stems delete final a after a consonant cluster, then add supportive i after tl or k." }),
  C({ id: "l14-147-connectors-remain-subject", lesson: 14, section: "14.7 note", lineStart: 5104, lineEnd: 5108, category: "invariant", path: "classical-nahuatl-nnc-slot-frame", proofFamily: "subject", summary: "Post-stem connectors remain subject number morphs, never State suffixes." }),
  C({ id: "l14-148-back-and-front-ambiguities", lesson: 14, section: "14.8", lineStart: 5109, lineEnd: 5132, category: "constituent-ambiguity", path: ["buildClassicalNahuatlSurfaceConstituentAnalyses", "applyClassicalNahuatlLesson14SelectedConstituentAnalysis"], proofFamily: "boundary", summary: "Typed alternatives preserve front o/m and back uh/tl/tli constituent analyses." }),
  C({ id: "l14-148-long-o-before-uh", lesson: 14, section: "14.8 note", lineStart: 5133, lineEnd: 5139, category: "conditioned-spelling", path: "buildClassicalNahuatlOrthographicBoundaryFrame", proofFamily: "boundary", summary: "Stem-final long o remains before uh despite traditional under-spelling." }),
  C({ id: "l14-148-possessor-i-plus-long-i", lesson: 14, section: "14.8 note", lineStart: 5140, lineEnd: 5141, category: "conditioned-spelling", path: "buildClassicalNahuatlOrthographicBoundaryFrame", proofFamily: "boundary", summary: "Third possessor long i plus stem-initial long i preserves both vowels." }),
  C({ id: "l14-148-possessor-i-before-i-glottal", lesson: 14, section: "14.8 note", lineStart: 5142, lineEnd: 5147, category: "conditioned-sound-change", path: "buildClassicalNahuatlOrthographicBoundaryFrame", proofFamily: "boundary", summary: "Third possessor i is short before stem-initial i plus glottal stop." }),
  C({ id: "l14-148-supportive-i-after-possessor", lesson: 14, section: "14.8 note", lineStart: 5148, lineEnd: 5150, category: "conditioned-sound-change", path: "buildClassicalNahuatlOrthographicBoundaryFrame", proofFamily: "boundary", summary: "Stem-initial supportive i drops after third possessor i." }),

  C({ id: "l15-1511-final-w-assimilation", lesson: 15, section: "15.1.1.a", lineStart: 5158, lineEnd: 5165, category: "conditioned-sound-change", path: "nnc-ordinary-conditions", proofFamily: "boundary", summary: "Final voiceless w deletes before possessive plural hu-an." }),
  C({ id: "l15-1511-final-n-assimilation", lesson: 15, section: "15.1.1.b", lineStart: 5166, lineEnd: 5170, category: "conditioned-sound-change", path: "nnc-ordinary-conditions", proofFamily: "boundary", summary: "Final n assimilates before hu-an; retained-n spelling remains an alternative." }),
  C({ id: "l15-1512-possessive-suppletion", lesson: 15, section: "15.1.2", lineStart: 5171, lineEnd: 5195, category: "lexical-operation", path: "buildClassicalNahuatlStemOperationRecord", proofFamily: "lexical", summary: "Typed lexical records may replace the ordinary possessive stem, including licensed yo matrices." }),
  C({ id: "l15-1512-totec-title", lesson: 15, section: "15.1.2.c", lineStart: 5196, lineEnd: 5198, category: "lexical-exception", path: "getClassicalNahuatlPredicateOptionContract", proofFamily: "lexical", summary: "Totec is an exact title/name exception with typed subject and possessor context." }),
  C({ id: "l15-1512-reject-totecuiyo", lesson: 15, section: "15.1.2 note", lineStart: 5199, lineEnd: 5211, category: "prohibition", path: "lesson15-prohibited-derivation-record", proofFamily: "lexical", summary: "The unattested tecu-i source and priestly totēcuiyo derivation are rejected." }),
  C({ id: "l15-1513-derived-nonanimate-common", lesson: 15, section: "15.1.3", lineStart: 5212, lineEnd: 5218, category: "interaction", path: "classical-nahuatl-ordinary-nnc-derived-nonanimate-reading", proofFamily: "relation", summary: "Derived nonanimate possessive predicates retain common grammar number despite plural English translation." }),
  C({ id: "l15-1514-possessor-reduplication", lesson: 15, section: "15.1.4", lineStart: 5219, lineEnd: 5221, category: "lexical-operation", path: "buildClassicalNahuatlPossessorReduplicationSelection", proofFamily: "possessor", summary: "Typed lexical selection may reduplicate the dyadic possessor in possessive plural NNCs." }),
  C({ id: "l15-1515-secondary-general-use", lesson: 15, section: "15.1.5", lineStart: 5222, lineEnd: 5246, category: "rank-operation", path: "buildClassicalNahuatlStemOperationRecord", proofFamily: "lexical", summary: "An inner te possessive predicate may be reranked as a secondary general-use stem." }),
  C({ id: "l15-1515-carrier-blurring", lesson: 15, section: "15.1.5", lineStart: 5247, lineEnd: 5254, category: "conditioned-realization", path: "buildClassicalNahuatlStemOperationRecord", proofFamily: "boundary", summary: "The fused secondary possessor carrier may realize as te, ti, or t." }),
  C({ id: "l15-1516-analogical-lifecycle", lesson: 15, section: "15.1.6", lineStart: 5255, lineEnd: 5266, category: "rank-operation", path: "buildClassicalNahuatlAnalogicalRestrictedUseContractFrame", proofFamily: "lexical", summary: "A complete tla possessive predicate is reranked as a restricted-use stem with a general-use partner." }),
  C({ id: "l15-1516-source-disposition", lesson: 15, section: "15.1.6", lineStart: 5270, lineEnd: 5274, category: "lexical-alternative", path: "buildClassicalNahuatlAnalogicalRestrictedUseContractFrame", proofFamily: "lexical", summary: "The analogical derivative may coexist with or replace the source in absolutive use." }),
  C({ id: "l15-1517-reclassification", lesson: 15, section: "15.1.7", lineStart: 5275, lineEnd: 5285, category: "reclassification-operation", path: "buildClassicalNahuatlReclassificationContractFrame", proofFamily: "class", summary: "A valid tl 2-A source can lose ephemeral i and reenter both States as tl 1-A." }),
  C({ id: "l15-1517-meaning-and-environment", lesson: 15, section: "15.1.7", lineStart: 5276, lineEnd: 5285, category: "lexical-alternative", path: "buildClassicalNahuatlReclassificationContractFrame", proofFamily: "lexical", summary: "Meaning shift versus stylistic identity and standalone versus compound use remain lexical/downstream facts." }),
  C({ id: "l15-1518-basic-possessor", lesson: 15, section: "15.1.8", lineStart: 5286, lineEnd: 5287, category: "invariant", path: "nnc-ordinary-conditions", proofFamily: "possessor", summary: "The NNC-internal pronominal possessor is the nuclear/basic possessor." }),
  C({ id: "l15-151-appendix-paradigms", lesson: 15, section: "15.1 note", lineStart: 5288, lineEnd: 5288, category: "paradigm-cross-reference", disposition: "read-only-evidence", path: "classical-nahuatl-nnc-paradigm-frame", proofFamily: "evidence", summary: "Appendix B is comparison evidence for full possessive paradigms." }),
  C({ id: "l15-152-natural-possession-policy", lesson: 15, section: "15.2", lineStart: 5289, lineEnd: 5293, category: "lexical-restriction", path: "buildClassicalNahuatlNncSourceAuthorityFrame", proofFamily: "lexical", summary: "Naturally possessed stems are possessive-only lexical sources." }),
  C({ id: "l15-152-property-semantics", lesson: 15, section: "15.2.1", lineStart: 5294, lineEnd: 5304, category: "lexical-semantics", path: "buildClassicalNahuatlNncSourceAuthorityFrame", proofFamily: "lexical", summary: "Property stems form one naturally possessed semantic class; English possessive-pronoun readings are contextual." }),
  C({ id: "l15-152-relation-semantics", lesson: 15, section: "15.2.2", lineStart: 5305, lineEnd: 5321, category: "lexical-semantics", path: "buildClassicalNahuatlNncSourceAuthorityFrame", proofFamily: "lexical", summary: "Kinship and human-relation stems form another naturally possessed semantic class." }),
  C({ id: "l15-152-body-part-semantics", lesson: 15, section: "15.2.3", lineStart: 5322, lineEnd: 5331, category: "lexical-semantics", path: "buildClassicalNahuatlNncSourceAuthorityFrame", proofFamily: "lexical", summary: "Body-part stems form a naturally possessed semantic class." }),
  C({ id: "l15-152-integral-possession-cross-reference", lesson: 15, section: "15.2 note 1", lineStart: 5332, lineEnd: 5332, category: "necessary-cross-reference", disposition: "read-only-evidence", path: "lesson39-integral-possession-cross-reference", proofFamily: "evidence", summary: "Organic integral possession is a distinct Lesson 39 operation." }),
  C({ id: "l15-152-never-possessive-metaphor", lesson: 15, section: "15.2 note 2", lineStart: 5333, lineEnd: 5335, category: "lexical-restriction", path: "buildClassicalNahuatlNncSourceAuthorityFrame", proofFamily: "lexical", summary: "Never-possessive stems can enter possessive State only through an explicit metaphorical override." }),
  C({ id: "l15-153-sentence-composition", lesson: 15, section: "15.3", lineStart: 5336, lineEnd: 5341, category: "composition", path: "nnc-sentence-composition", proofFamily: "sentence", summary: "A complete NNC can compose into equative, attributive, or adverbial sentences." }),
  C({ id: "l15-153-force-and-polarity", lesson: 15, section: "15.3", lineStart: 5342, lineEnd: 5357, category: "sentence-inventory", path: "buildClassicalNahuatlSentenceHandoffFrame", proofFamily: "sentence", summary: "Assertions, negatives, emphasis, yes/no questions, and wishes are sentence-layer choices." }),
  C({ id: "l15-153-adverbial-modifiers", lesson: 15, section: "15.3", lineStart: 5358, lineEnd: 5362, category: "sentence-inventory", path: "buildClassicalNahuatlSentenceHandoffFrame", proofFamily: "sentence", summary: "zan, oc, ahzo, and aya are sentence modifiers, not NNC stem operations." }),
  C({ id: "l15-153-contextual-having", lesson: 15, section: "15.3", lineStart: 5363, lineEnd: 5365, category: "contextual-interpretation", path: "buildClassicalNahuatlSentenceHandoffFrame", proofFamily: "sentence", summary: "English having translations are contextual and do not add a grammar slot." }),
  C({ id: "l15-153-definiteness-ambiguity", lesson: 15, section: "15.3 note", lineStart: 5366, lineEnd: 5368, category: "restriction", path: "buildClassicalNahuatlSentenceHandoffFrame", proofFamily: "sentence", summary: "NNC predicates remain ambiguous for definiteness and indefiniteness." }),
]);

const REQUIRED_SECTIONS = Object.freeze({
  "12": ["12.1", "12.2", "12.3.1", "12.3.2", "12.3.2.a", "12.3.2.b", "12.4", "12.5", "12.6", "12.7"],
  "13": ["13.1", "13.2.1", "13.2.2", "13.2.3", "13.3", "13.4", "13.4.1", "13.4.2", "13.5", "13.5.2.a", "13.5.2.b", "13.6", "13.6 note"],
  "14": ["14.1", "14.2", "14.2.2-5", "14.2.6", "14.2.7", "14.2.8", "14.3", "14.3.1", "14.3.1 note", "14.3.2", "14.3 note", "14.3 remark", "14.4", "14.5.1", "14.5.2", "14.5.3", "14.5.4", "14.6", "14.7.1.a", "14.7.1.b", "14.7.2.a", "14.7.2.a.i note", "14.7.2.b", "14.7.2.b.i", "14.7.2.b.ii", "14.7.2.b.iii", "14.7 note", "14.8", "14.8 note"],
  "15": ["15.1.1.a", "15.1.1.b", "15.1.2", "15.1.2.c", "15.1.2 note", "15.1.3", "15.1.4", "15.1.5", "15.1.6", "15.1.7", "15.1.8", "15.1 note", "15.2", "15.2.1", "15.2.2", "15.2.3", "15.2 note 1", "15.2 note 2", "15.3", "15.3 note"],
});

function buildSourceClaimSignaturePayload(claims = []) {
  return JSON.stringify(claims.map(claim => ({
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
}

function buildSourceClaimSignature(claims = []) {
  const payload = buildSourceClaimSignaturePayload(claims);
  let hash = 2166136261;
  for (let index = 0; index < payload.length; index += 1) {
    hash ^= payload.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}

export function buildClassicalNahuatlLessons12To15ClosureFrame() {
  const claims = CLASSICAL_NAHUATL_LESSONS12_15_CLOSURE_CLAIMS.map(claim => ({
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
    if (!["12", "13", "14", "15"].includes(claim.lesson)) diagnostics.push(`unknown-lesson:${claim.id}`);
    if (!claim.section || !Number.isInteger(claim.transcriptionLineStart) || !Number.isInteger(claim.transcriptionLineEnd) || claim.transcriptionLineStart > claim.transcriptionLineEnd) diagnostics.push(`invalid-source-span:${claim.id}`);
    if (!DISPOSITIONS.has(claim.disposition)) diagnostics.push(`invalid-disposition:${claim.id}`);
    if (claim.implementationStatus !== "implemented") diagnostics.push(`partial-implementation:${claim.id}`);
    if (!claim.canonicalObjectIds.length || claim.canonicalObjectIds.some(value => !value)) diagnostics.push(`missing-executable-path:${claim.id}`);
    if (!PROOF_FAMILIES[claim.proofFamily]) diagnostics.push(`unknown-proof-family:${claim.id}`);
    if (!claim.proofIds || ["positive", "negative", "interaction", "hostile", "scalar", "paradigm"].some(kind => !claim.proofIds[kind])) diagnostics.push(`missing-proof-obligation:${claim.id}`);
    if (!claim.projections.includes("grammar") || !claim.projections.includes("result")) diagnostics.push(`missing-ui-projection:${claim.id}`);
    if (claim.lessonMetadataAuthority !== false || claim.sourceTextAuthority !== false || claim.displayTextAuthority !== false) diagnostics.push(`authority-boundary-invalid:${claim.id}`);
  });
  Object.entries(REQUIRED_SECTIONS).forEach(([lesson, sections]) => {
    sections.forEach(section => {
      if (!claims.some(claim => claim.lesson === lesson && claim.section === section)) {
        diagnostics.push(`unclassified-source-section:${lesson}:${section}`);
      }
    });
  });
  const dispositions = Object.fromEntries(
    [...DISPOSITIONS].map(disposition => [
      disposition,
      claims.filter(claim => claim.disposition === disposition).length,
    ])
  );
  const lessonCounts = Object.fromEntries(
    ["12", "13", "14", "15"].map(lesson => [
      lesson,
      claims.filter(claim => claim.lesson === lesson).length,
    ])
  );
  return {
    kind: "classical-nahuatl-nominal-nuclear-clause-source-closure-frame",
    version: 1,
    authorizationStatus: diagnostics.length ? "blocked" : "authorized",
    blockReason: diagnostics.length ? "lessons12-15-source-closure-incomplete" : "",
    sourceDocument: SOURCE_DOCUMENT,
    sourceLineStart: 4375,
    sourceLineEnd: 5371,
    claimCount: claims.length,
    claimSignatureAlgorithm: "fnv1a32-v1",
    claimSignature: buildSourceClaimSignature(claims),
    lessonCounts,
    dispositionCounts: dispositions,
    unclassifiedClaimCount: diagnostics.filter(value => value.startsWith("unclassified")).length,
    partialImplementationCount: diagnostics.filter(value => value.startsWith("partial")).length,
    missingExecutablePathCount: diagnostics.filter(value => value.startsWith("missing-executable")).length,
    missingProofObligationCount: diagnostics.filter(value => value.startsWith("missing-proof")).length,
    diagnostics,
    claims,
    proofFamilies: Object.fromEntries(
      Object.entries(PROOF_FAMILIES).map(([id, proofIds]) => [id, { ...proofIds }])
    ),
    sourceInventoryIsRuntimeAuthority: false,
    sourceSpansAuthorizeOutput: false,
    proofIdsAuthorizeOutput: false,
    formulaStringAuthority: false,
    displayTextAuthority: false,
  };
}
