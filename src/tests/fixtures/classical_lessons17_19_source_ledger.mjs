// Test-only exhaustive source-span ledger for Andrews Lessons 17-19.
// This module is not installed in the production runtime and cannot authorize output.

const SOURCE_DOCUMENT = "ANDREWS_TRANSCRIPTION_CANVAS.md";
const SOURCE_LINE_START = 5762;
const SOURCE_LINE_END = 6738;
const CONTRACT_VERSION = 1;

const DISPOSITIONS = new Set([
  "existing-canonical-rule",
  "new-canonical-rule",
  "read-only-evidence",
  "genuinely-blocked",
]);

const PROOF_KINDS = Object.freeze([
  "positive",
  "negative",
  "interaction",
  "hostile",
  "scalar",
  "paradigm",
]);

const EXECUTABLE_PATH_BY_OPERATION = Object.freeze({
  "supplementation-typed-clause-graph":
    "buildClassicalNahuatlSupplementationClauseEnvelope",
  "classical-nahuatl-nnc-slot-frame":
    "buildClassicalNahuatlSupplementationClauseEnvelope",
  "classical-nahuatl-vnc-slot-frame":
    "buildClassicalNahuatlSupplementationClauseEnvelope",
  "lesson16-demonstrative-nnc":
    "buildClassicalNahuatlPronominalNncFrame",
  "lesson16-interrogative-ac":
    "buildClassicalNahuatlPronominalNncFrame",
  "lesson16-personal-pronominal-nnc":
    "buildClassicalNahuatlPronominalNncFrame",
  "lesson16-pronominal-nnc":
    "buildClassicalNahuatlPronominalNncFrame",
  "lesson11-zero-root-preterit-as-present":
    "buildClassicalNahuatlPronominalPluralCooperationFrame",
  "lesson23-silent-object-head":
    "buildClassicalNahuatlMultipleObjectVncFrame",
  "lesson24-ichtequi-specific-object-cross-reference":
    "buildClassicalNahuatlSupplementationClauseEnvelope",
  "lesson28-nequi-future-embed-cross-reference":
    "evaluateClassicalNahuatlSupplementationOperation",
  "buildClassicalNahuatlNegativeAcPluralFrame":
    "buildClassicalNahuatlNegativeAcPluralFrame",
  "buildClassicalNahuatlNegativeAcPluralParadigm":
    "buildClassicalNahuatlNegativeAcPluralParadigm",
  "supplementation-pronominal-plural":
    "buildClassicalNahuatlPronominalPluralCooperationFrame",
  "supplementation-pronominal-plural-compound":
    "buildClassicalNahuatlPronominalPluralCooperationFrame",
  "supplementation-collective-agreement-exception":
    "buildClassicalNahuatlSupplementationContextRecord",
  "supplementation-named-partner-exception":
    "buildClassicalNahuatlSupplementationContextRecord",
  "supplementation-male-bonding-exception":
    "buildClassicalNahuatlSupplementationContextRecord",
  "supplementation-delete-cah-principal":
    "evaluateClassicalNahuatlSupplementationOperation",
  "supplementation-delete-saying-principal":
    "evaluateClassicalNahuatlSupplementationOperation",
  "supplementation-rumored-report-quil":
    "evaluateClassicalNahuatlSupplementationOperation",
  "supplementation-vocative":
    "evaluateClassicalNahuatlSupplementationOperation",
  "supplementation-vocative-female-prosody":
    "evaluateClassicalNahuatlSupplementationOperation",
  "supplementation-vocative-glottal-variant":
    "evaluateClassicalNahuatlSupplementationOperation",
  "supplementation-vocative-silent-plural-in":
    "evaluateClassicalNahuatlSupplementationOperation",
  "supplementation-vocative-supportive-i-absorption":
    "evaluateClassicalNahuatlSupplementationOperation",
});

function getExecutablePath(operation = "") {
  return EXECUTABLE_PATH_BY_OPERATION[operation]
    || "evaluateClassicalNahuatlSupplementationOperation";
}

function stableStringify(value) {
  if (Array.isArray(value)) {
    return `[${value.map(stableStringify).join(",")}]`;
  }
  if (value && typeof value === "object") {
    return `{${Object.keys(value)
      .filter(key => value[key] !== undefined)
      .sort()
      .map(key => `${JSON.stringify(key)}:${stableStringify(value[key])}`)
      .join(",")}}`;
  }
  return JSON.stringify(value);
}

function signValue(value, prefix = "supplementation") {
  const serialized = stableStringify(value);
  let hash = 2166136261;
  for (let index = 0; index < serialized.length; index += 1) {
    hash ^= serialized.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return `${prefix}:${(hash >>> 0).toString(16).padStart(8, "0")}`;
}

function freezeDeep(value) {
  if (Array.isArray(value)) {
    return Object.freeze(value.map(freezeDeep));
  }
  if (value && typeof value === "object") {
    return Object.freeze(
      Object.fromEntries(
        Object.entries(value).map(([key, child]) => [key, freezeDeep(child)])
      )
    );
  }
  return value;
}

function claim({
  id,
  lesson,
  section,
  lineStart,
  lineEnd,
  category,
  disposition = "new-canonical-rule",
  operation,
  family,
  summary,
  paradigmConsequence = true,
  projections = ["source", "grammar", "result"],
}) {
  return freezeDeep({
    id,
    lesson: String(lesson),
    section,
    sourceDocument: SOURCE_DOCUMENT,
    transcriptionLineStart: lineStart,
    transcriptionLineEnd: lineEnd,
    category,
    disposition,
    implementationStatus:
      disposition === "genuinely-blocked" ? "blocked" : "implemented",
    sourceOperationIds: Array.isArray(operation) ? operation : [operation],
    canonicalObjectIds: Array.from(new Set(
      (Array.isArray(operation) ? operation : [operation])
        .map(getExecutablePath)
    )),
    ruleFamily: family,
    executableProofFamily: family,
    proofIds: Object.fromEntries(
      PROOF_KINDS.map(kind => [
        kind,
        `supplementation:${id}:${kind}`,
      ])
    ),
    paradigmConsequence,
    projections,
    summary,
    lessonMetadataAuthority: false,
    sourceTextAuthority: false,
    displayTextAuthority: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

const C = claim;

export const CLASSICAL_NAHUATL_LESSONS17_19_SOURCE_CLAIMS = Object.freeze([
  C({ id: "l17-171-multiple-nuclei", lesson: 17, section: "17.1", lineStart: 5764, lineEnd: 5768, category: "invariant", disposition: "existing-canonical-rule", operation: "supplementation-typed-clause-graph", family: "gcd", summary: "Supplementation combines two or more complete nuclear clauses rather than particles around one nucleus." }),
  C({ id: "l17-172-appositional-head", lesson: 17, section: "17.2", lineStart: 5769, lineEnd: 5779, category: "invariant", operation: "supplementation-personal-head-binding", family: "gcd", summary: "The appositional head is always a personal pronoun and the relation is sentence-internal anaphora or cataphora." }),
  C({ id: "l17-172-affixal-pronoun-boundary", lesson: 17, section: "17.2", lineStart: 5790, lineEnd: 5808, category: "restriction", operation: "supplementation-personal-head-binding", family: "gcd", summary: "The nuclear affixal pronoun remains the basic head; the supplement does not replace or reparse it." }),
  C({ id: "l17-172-three-head-roles", lesson: 17, section: "17.2", lineStart: 5809, lineEnd: 5816, category: "inventory", operation: "supplementation-head-role", family: "head-role", summary: "Subject, object, and possessor heads license corresponding supplementary roles." }),
  C({ id: "l17-172-two-reference-kinds", lesson: 17, section: "17.2", lineStart: 5817, lineEnd: 5820, category: "inventory", operation: "supplementation-reference-mode", family: "reference", summary: "Every personal-pronoun role permits shared- and included-referent supplementation." }),
  C({ id: "l17-173-shared-reference", lesson: 17, section: "17.3", lineStart: 5821, lineEnd: 5825, category: "restriction", operation: "supplementation-shared-reference-unification", family: "reference", summary: "Shared supplementation requires referential identity; person-number agreement is evidence, not the identity itself." }),
  C({ id: "l17-173-equational-nnc-adjunct", lesson: 17, section: "17.3", lineStart: 5826, lineEnd: 5831, category: "operation", disposition: "existing-canonical-rule", operation: ["supplementation-typed-clause-graph", "classical-nahuatl-nnc-slot-frame"], family: "clause-kind", summary: "A complete equational NNC may be the unmarked adjunct to a VNC." }),
  C({ id: "l17-173-supplementary-subject", lesson: 17, section: "17.3.1", lineStart: 5832, lineEnd: 5867, category: "operation", operation: "supplementation-head-role", family: "head-role", summary: "The supplement contact pronoun can unify with the principal subject." }),
  C({ id: "l17-173-have-construction", lesson: 17, section: "17.3.1", lineStart: 5868, lineEnd: 5875, category: "interaction", operation: "supplementation-locative-have-frame", family: "have", summary: "Locative ca-h as principal plus a possessive NNC supplementary subject licenses the have interpretation without creating a have verb." }),
  C({ id: "l17-173-supplementary-object", lesson: 17, section: "17.3.2", lineStart: 5876, lineEnd: 5887, category: "operation", operation: "supplementation-head-role", family: "head-role", summary: "The supplement contact pronoun can unify with the principal object." }),
  C({ id: "l17-173-supplementary-possessor", lesson: 17, section: "17.3.3", lineStart: 5888, lineEnd: 5906, category: "operation", operation: "supplementation-head-role", family: "head-role", summary: "The supplement contact pronoun can unify with the principal possessor; direct possessor-as-modifier parsing is blocked." }),
  C({ id: "l17-1741-recursion", lesson: 17, section: "17.4.1", lineStart: 5907, lineEnd: 5927, category: "operation", operation: "supplementation-recursive-clause-graph", family: "recursion", summary: "A supplement may itself be principal to another supplement, producing an acyclic hierarchy." }),
  C({ id: "l17-1742-contact-not-stem", lesson: 17, section: "17.4.2", lineStart: 5928, lineEnd: 5931, category: "restriction", operation: "supplementation-shared-reference-unification", family: "reference", summary: "Contact is identity of personal-pronoun referents, never stem identity; indefinite and specific clauses may unify." }),
  C({ id: "l17-1743-demonstrative-supplements", lesson: 17, section: "17.4.3", lineStart: 5932, lineEnd: 5939, category: "operation", disposition: "existing-canonical-rule", operation: ["supplementation-typed-clause-graph", "lesson16-pronominal-nnc"], family: "clause-kind", summary: "Demonstrative pronominal NNCs in and on are licensed supplements; traditional fusion is not authority." }),
  C({ id: "l17-1744-third-person-ambiguity", lesson: 17, section: "17.4.4", lineStart: 5940, lineEnd: 5946, category: "ambiguity", operation: "supplementation-contact-role-alternatives", family: "ambiguity", summary: "Animate third-person transitive clauses retain subject/object contact alternatives when both are licensed." }),
  C({ id: "l17-175-topic-order", lesson: 17, section: "17.5", lineStart: 5947, lineEnd: 5956, category: "conditioned-operation", operation: "supplementation-linearization", family: "order", summary: "A supplement before its principal is derived as topic; material after it is the comment." }),
  C({ id: "l17-175-comment-ca", lesson: 17, section: "17.5", lineStart: 5977, lineEnd: 5982, category: "interaction", disposition: "existing-canonical-rule", operation: ["supplementation-linearization", "lesson3-emphatic-ca"], family: "order", summary: "A comment may take emphatic ca and may contain supplements of its own." }),
  C({ id: "l17-175-multiple-topics", lesson: 17, section: "17.5", lineStart: 5983, lineEnd: 5988, category: "operation", operation: "supplementation-recursive-clause-graph", family: "recursion", summary: "Recursive supplements license nested primary and secondary topic-comment structures." }),
  C({ id: "l17-175-order-ambiguity", lesson: 17, section: "17.5", lineStart: 5989, lineEnd: 5999, category: "ambiguity", operation: "supplementation-principal-selection", family: "ambiguity", summary: "Clause order alone cannot choose the principal; typed principal selection, in, or ca resolves the reading." }),
  C({ id: "l17-176-information-question", lesson: 17, section: "17.6", lineStart: 6000, lineEnd: 6019, category: "operation", operation: "supplementation-information-question", family: "question", summary: "An information question replaces a supplement with a sentence-initial interrogative pronominal NNC while preserving the head binding." }),

  C({ id: "l18-181-integrated-o", lesson: 18, section: "18.1", lineStart: 6025, lineEnd: 6034, category: "conditioned-operation", operation: "supplementation-integrated-antecessive", family: "integrated", summary: "For a preposed supplementary subject or object before an antecessive VNC, o may attach to the supplement instead of the principal." }),
  C({ id: "l18-182-short-pronoun-utterance", lesson: 18, section: "18.2", lineStart: 6035, lineEnd: 6048, category: "restriction", disposition: "existing-canonical-rule", operation: ["supplementation-short-pronominal-boundary", "lesson16-personal-pronominal-nnc"], family: "short-pronoun", summary: "Short personal-pronominal NNCs cannot stand alone, ordinarily supplement, and may be principals only when adjoining another constituent." }),
  C({ id: "l18-183-in-whole-unit", lesson: 18, section: "18.3", lineStart: 6049, lineEnd: 6067, category: "operation", disposition: "existing-canonical-rule", operation: ["supplementation-adjunctor", "lesson3-adjunctor-in"], family: "adjunctor", summary: "Adjunctor in subordinates a complete lower unit and never determines an NNC predicate or its definiteness." }),
  C({ id: "l18-183-marked-roles", lesson: 18, section: "18.3", lineStart: 6068, lineEnd: 6088, category: "interaction", operation: ["supplementation-adjunctor", "supplementation-head-role", "supplementation-linearization"], family: "adjunctor", summary: "Marked subject/object/possessor supplements and marked topics preserve their typed role." }),
  C({ id: "l18-183-demonstrative-fusion", lesson: 18, section: "18.3", lineStart: 6089, lineEnd: 6094, category: "conditioned-spelling", operation: "supplementation-adjunctor-fusion", family: "adjunctor", summary: "Typed in plus demonstrative in/on may project traditional fused spelling without letting the fused string authorize the relation." }),
  C({ id: "l18-184-discontinuous", lesson: 18, section: "18.4", lineStart: 6099, lineEnd: 6114, category: "operation", operation: "supplementation-discontinuous-linearization", family: "order", summary: "Head and supplement may be separated by typed intervening constituents while their reference edge remains intact." }),
  C({ id: "l18-185-collective-mismatch", lesson: 18, section: "18.5", lineStart: 6115, lineEnd: 6126, category: "exception", operation: "supplementation-collective-agreement-exception", family: "agreement-exception", summary: "A typed collective source can license apparent singular-form/plural-reference mismatch without making mismatch the default." }),
  C({ id: "l18-186-named-partner", lesson: 18, section: "18.6", lineStart: 6127, lineEnd: 6136, category: "exception", operation: "supplementation-named-partner-exception", family: "agreement-exception", summary: "A plural participant group containing speaker/addressee plus a newly named third person may name only that third person in the supplement." }),
  C({ id: "l18-187-male-bonding", lesson: 18, section: "18.7", lineStart: 6141, lineEnd: 6158, category: "exception", operation: "supplementation-male-bonding-exception", family: "agreement-exception", summary: "A male group member may use first-plural oquich-tli supplementation against a third-person head." }),
  C({ id: "l18-187-male-bonding-blockers", lesson: 18, section: "18.7", lineStart: 6159, lineEnd: 6163, category: "restriction", operation: "supplementation-male-bonding-exception", family: "agreement-exception", summary: "The mismatch is blocked for a nonmember man or a woman speaker." }),
  C({ id: "l18-188-ayi-silent-object", lesson: 18, section: "18.8", lineStart: 6164, lineEnd: 6179, category: "exception", operation: "supplementation-ayi-silent-object-head", family: "silent-head", summary: "Specific-patient ayi has a silent 0-0 object head; nonspecific tla remains overt and the perfective stem is ax." }),
  C({ id: "l18-188-ichtequi-contrast", lesson: 18, section: "18.8 note", lineStart: 6184, lineEnd: 6187, category: "restriction", disposition: "read-only-evidence", operation: "lesson24-ichtequi-specific-object-cross-reference", family: "evidence", summary: "Ichtequi is the contrasting specific-object-only verb and does not license the ayi silent-head route." }),
  C({ id: "l18-189-delete-cah-principal", lesson: 18, section: "18.9", lineStart: 6188, lineEnd: 6201, category: "conditioned-operation", operation: "supplementation-delete-cah-principal", family: "deletion", summary: "A ca-h principal shared by an adverbial modifier and supplementary subject may delete, upgrading the adverbial to proxy principal." }),
  C({ id: "l18-1810-so-called-vocative", lesson: 18, section: "18.10", lineStart: 6202, lineEnd: 6211, category: "restriction", operation: "supplementation-command-subject", family: "vocative", summary: "A second-person supplementary subject of an optative VNC remains supplementation, not a real vocative." }),
  C({ id: "l18-1811-real-vocative-gcd", lesson: 18, section: "18.11", lineStart: 6212, lineEnd: 6219, category: "operation", operation: "supplementation-vocative", family: "vocative", summary: "A real vocative uses a third-person NNC and speaker-conditioned realization; it need not accompany a command." }),
  C({ id: "l18-1811-male-e", lesson: 18, section: "18.11", lineStart: 6216, lineEnd: 6221, category: "conditioned-operation", operation: "supplementation-vocative", family: "vocative", summary: "A male speaker selects exclamatory e joined after the NNC as the stress exception." }),
  C({ id: "l18-1811-glottal-y", lesson: 18, section: "18.11", lineStart: 6226, lineEnd: 6227, category: "conditioned-sound-change", operation: "supplementation-vocative-glottal-variant", family: "vocative", summary: "Intervocalic glottal stop may realize as y before vocative e." }),
  C({ id: "l18-1811-supportive-i-absorption", lesson: 18, section: "18.11", lineStart: 6228, lineEnd: 6232, category: "conditioned-sound-change", operation: "supplementation-vocative-supportive-i-absorption", family: "vocative", summary: "Vocative e absorbs a typed final supportive i." }),
  C({ id: "l18-1811-plural-in-silence", lesson: 18, section: "18.11", lineStart: 6233, lineEnd: 6237, category: "conditioned-operation", operation: "supplementation-vocative-silent-plural-in", family: "vocative", summary: "Absolutive plural t-in may select its typed silent-in variant before vocative e." }),
  C({ id: "l18-1811-female-prosody", lesson: 18, section: "18.11", lineStart: 6238, lineEnd: 6241, category: "conditioned-operation", operation: "supplementation-vocative-female-prosody", family: "vocative", summary: "A woman speaker uses no e and receives a read-only high-tone/affected-stress realization instruction." }),
  C({ id: "l18-1812-free-order", lesson: 18, section: "18.12", lineStart: 6242, lineEnd: 6253, category: "restriction", operation: "supplementation-linearization", family: "order", summary: "Constituent order is freely selected but never infers role or principal; typed edges preserve both." }),
  C({ id: "l18-1812-complete-clause-warning", lesson: 18, section: "18.12 remark", lineStart: 6254, lineEnd: 6266, category: "invariant", operation: "supplementation-typed-clause-graph", family: "gcd", summary: "Every NNC and pronominal NNC remains a complete clause inside the concatenate structure." }),

  C({ id: "l19-191-vnc-supplements", lesson: 19, section: "19.1", lineStart: 6272, lineEnd: 6278, category: "operation", disposition: "existing-canonical-rule", operation: ["supplementation-typed-clause-graph", "classical-nahuatl-vnc-slot-frame"], family: "clause-kind", summary: "Intransitive and transitive VNCs may supplement and usually, but not obligatorily, take an adjunctor." }),
  C({ id: "l19-191-vnc-subject-role", lesson: 19, section: "19.1.1", lineStart: 6279, lineEnd: 6315, category: "operation", operation: ["supplementation-head-role", "supplementation-contact-role-alternatives"], family: "head-role", summary: "A VNC supplement may bind its subject or object contact to a principal subject." }),
  C({ id: "l19-191-vnc-recursion", lesson: 19, section: "19.1.1", lineStart: 6316, lineEnd: 6320, category: "interaction", operation: "supplementation-recursive-clause-graph", family: "recursion", summary: "An adjoined VNC may carry supplements of its own." }),
  C({ id: "l19-191-rhetorical-weighting", lesson: 19, section: "19.1.1", lineStart: 6321, lineEnd: 6331, category: "restriction", disposition: "read-only-evidence", operation: "supplementation-principal-selection", family: "evidence", summary: "English rhetorical weighting may reverse principal/subordinate translation and cannot choose the Nahuatl principal." }),
  C({ id: "l19-191-vnc-object-role", lesson: 19, section: "19.1.2", lineStart: 6332, lineEnd: 6338, category: "operation", operation: ["supplementation-head-role", "supplementation-contact-role-alternatives"], family: "head-role", summary: "A VNC supplement may bind a contact pronoun to a principal object." }),
  C({ id: "l19-191-vnc-possessor-role", lesson: 19, section: "19.1.3", lineStart: 6339, lineEnd: 6354, category: "operation", operation: ["supplementation-head-role", "supplementation-contact-role-alternatives"], family: "head-role", summary: "A VNC supplement may bind a subject or object contact to a principal possessor." }),
  C({ id: "l19-192-demonstrative-plural", lesson: 19, section: "19.2.1", lineStart: 6355, lineEnd: 6376, category: "conditioned-operation", disposition: "existing-canonical-rule", operation: ["supplementation-pronominal-plural", "lesson11-zero-root-preterit-as-present", "lesson16-demonstrative-nnc"], family: "pronominal-plural", summary: "Plural in/on combines a third-plural preterit-as-present 0-i-h principal with a demonstrative NNC supplement; solid spellings remain derived." }),
  C({ id: "l19-192-ac-plural", lesson: 19, section: "19.2.2", lineStart: 6377, lineEnd: 6399, category: "exception", operation: ["supplementation-pronominal-plural", "lesson16-interrogative-ac"], family: "pronominal-plural", summary: "Frozen third-singular ac supplements 1pl/2pl/3pl 0-i-h principals with licensed person-number mismatch and need not be contiguous." }),
  C({ id: "l19-192-ac-compound-variant", lesson: 19, section: "19.2.2", lineStart: 6400, lineEnd: 6401, category: "lexical-alternative", operation: "supplementation-pronominal-plural-compound", family: "pronominal-plural", summary: "The typed compound amaquihqueh route is a licensed alternative for second plural." }),
  C({ id: "l19-192-negative-ac-plural", lesson: 19, section: "19.2.2", lineStart: 6402, lineEnd: 6406, category: "restriction", disposition: "existing-canonical-rule", operation: ["buildClassicalNahuatlNegativeAcPluralFrame", "buildClassicalNahuatlNegativeAcPluralParadigm"], family: "pronominal-plural", summary: "Negative ahac/ayac uses the ordinary preterit plural of a rather than the 0-i-h supplementation route." }),
  C({ id: "l19-192-tleh-catleh-compounds", lesson: 19, section: "19.2 note", lineStart: 6407, lineEnd: 6417, category: "lexical-alternative", operation: "supplementation-pronominal-plural-compound", family: "pronominal-plural", summary: "Tleh/catleh compound plurals and catl-0-i-h singular/plural cells are separate typed compound routes." }),
  C({ id: "l19-193-included-reference", lesson: 19, section: "19.3", lineStart: 6418, lineEnd: 6428, category: "invariant", operation: "supplementation-included-reference", family: "reference", summary: "The entire supplement is the referent of a necessarily third-singular personal head." }),
  C({ id: "l19-193-principal-role-inventory", lesson: 19, section: "19.3", lineStart: 6429, lineEnd: 6431, category: "inventory", operation: "supplementation-included-reference", family: "reference", summary: "NNC principals allow included subject/possessor supplements and VNC principals allow included subject/object supplements." }),
  C({ id: "l19-193-nnc-principals", lesson: 19, section: "19.3.1", lineStart: 6436, lineEnd: 6464, category: "interaction", operation: ["supplementation-included-reference", "supplementation-recursive-clause-graph"], family: "included", summary: "NNC principals can host included clauses, including shared supplementation inside the included sentence and later adjectival/adverbial subclasses." }),
  C({ id: "l19-193-antecessive-jump", lesson: 19, section: "19.3.1", lineStart: 6447, lineEnd: 6452, category: "conditioned-operation", operation: "supplementation-included-antecessive", family: "integrated", summary: "Antecessive o may attach to an included NNC principal rather than remain inside its supplement." }),
  C({ id: "l19-193-intransitive-principals", lesson: 19, section: "19.3.2", lineStart: 6465, lineEnd: 6482, category: "interaction", operation: "supplementation-included-reference", family: "included", summary: "An intransitive VNC principal may take an included supplementary subject; internal particles remain inside the downgraded clause." }),
  C({ id: "l19-193-transitive-semantic-groups", lesson: 19, section: "19.3.3", lineStart: 6483, lineEnd: 6485, category: "inventory", operation: "supplementation-complement-policy", family: "complement", summary: "Transitive included-reference principals select a typed semantic group with group-specific complement conditions." }),
  C({ id: "l19-193a-speech", lesson: 19, section: "19.3.3.a", lineStart: 6486, lineEnd: 6532, category: "conditioned-operation", operation: "supplementation-speech-complement", family: "speech", summary: "Direct and indirect statements, questions, commands, and exclamations are included supplements; in is optional for both, indirect tense does not backshift, and reported commands use the licensed future-indicative transformation." }),
  C({ id: "l19-193b-causing", lesson: 19, section: "19.3.3.b", lineStart: 6533, lineEnd: 6548, category: "conditioned-operation", operation: "supplementation-complement-policy", family: "complement", summary: "Causing/requesting principals license included complements subject to their independently typed VNC valence and sentence mood." }),
  C({ id: "l19-193c-realizable-wish", lesson: 19, section: "19.3.3.c", lineStart: 6549, lineEnd: 6579, category: "conditioned-operation", operation: "supplementation-wish-complement", family: "wish", summary: "Realizable wishes use future indicative or nonpast/future optative; reflexive m-o-nequi takes the included clause as subject." }),
  C({ id: "l19-193c-unrealizable-wish", lesson: 19, section: "19.3.3.c", lineStart: 6580, lineEnd: 6589, category: "conditioned-operation", operation: "supplementation-wish-complement", family: "wish", summary: "Present/future impossibility uses past optative; counterfactual past normally adds antecessive o." }),
  C({ id: "l19-193d-perception", lesson: 19, section: "19.3.3.d", lineStart: 6590, lineEnd: 6604, category: "conditioned-operation", operation: "supplementation-perception-complement", family: "complement", summary: "Perception principals normally select a present-tense included clause and allow recursive included structures." }),
  C({ id: "l19-193e-cognition", lesson: 19, section: "19.3.3.e", lineStart: 6605, lineEnd: 6632, category: "conditioned-operation", operation: "supplementation-cognition-complement", family: "complement", summary: "Knowing, remembering, and forgetting principals license statement and interrogative included objects without English tense authority." }),
  C({ id: "l19-193f-affect", lesson: 19, section: "19.3.3.f", lineStart: 6633, lineEnd: 6644, category: "conditioned-operation", operation: "supplementation-affect-complement", family: "complement", summary: "Affect principals take the included clause as supplementary subject." }),
  C({ id: "l19-194-infinitive-conditions", lesson: 19, section: "19.4", lineStart: 6645, lineEnd: 6662, category: "conditioned-operation", operation: "supplementation-coreferential-future-complement", family: "complement", summary: "Mati, il-namiqui, il-cahua, and nequi receive the English infinitive reading only with a future supplement and coreferential subjects." }),
  C({ id: "l19-194-nequi-incorporation", lesson: 19, section: "19.4", lineStart: 6663, lineEnd: 6676, category: "exception", disposition: "read-only-evidence", operation: "lesson28-nequi-future-embed-cross-reference", family: "evidence", summary: "Only nequi has the separate incorporated future-embed alternative and wish-sentence complement; this does not alter the supplementation AST." }),
  C({ id: "l19-195-quil", lesson: 19, section: "19.5", lineStart: 6677, lineEnd: 6687, category: "lexical-exception", operation: "supplementation-rumored-report-quil", family: "report", summary: "Quil is a fixed third-singular preterit principal on an obsolete transitive stem; no other subject or tense is licensed." }),
  C({ id: "l19-195-mach", lesson: 19, section: "19.5", lineStart: 6688, lineEnd: 6694, category: "interaction", operation: "supplementation-rumored-report-quil", family: "report", summary: "Optional adverbial mach may follow quil; traditional quilmach fusion is a derived spelling alternative." }),
  C({ id: "l19-196-deleted-saying", lesson: 19, section: "19.6", lineStart: 6699, lineEnd: 6713, category: "conditioned-operation", operation: "supplementation-delete-saying-principal", family: "deletion", summary: "After a speech-action VNC, a licensed saying principal may delete while its included supplement remains juxtaposed and unbound to the visible principal." }),
  C({ id: "l19-196-deleted-saying-silent-object", lesson: 19, section: "19.6", lineStart: 6703, lineEnd: 6708, category: "necessary-cross-reference", disposition: "existing-canonical-rule", operation: ["supplementation-delete-saying-principal", "lesson23-silent-object-head"], family: "silent-head", summary: "The deleted saying principal may contain a separately authorized silent object head from Lesson 23." }),
  C({ id: "l19-196-direct-indirect-results", lesson: 19, section: "19.6", lineStart: 6714, lineEnd: 6730, category: "interaction", operation: ["supplementation-delete-saying-principal", "supplementation-speech-complement"], family: "deletion", summary: "Both direct and indirect speech supplements survive the licensed deletion, including reported questions." }),
  C({ id: "l19-196-adverb-only-principal", lesson: 19, section: "19.6", lineStart: 6731, lineEnd: 6738, category: "exception", operation: "supplementation-delete-saying-principal", family: "deletion", summary: "Deletion may leave only a typed adverbial constituent before the surviving speech supplement." }),
]);

const GCD = freezeDeep({
  id: "classical-nahuatl-supplementation-operation-gcd",
  smallestSharedInvariant:
    "signed allowlisted typed operation request evaluated by the one canonical supplementation dispatcher into a typed authorized-or-blocked result",
  requiredRequestFields: [
    "operationKind",
    "typedFrameAuthority",
    "formulaStringAuthority",
    "surfaceStringAuthority",
    "lessonMetadataAuthority",
    "callerSuppliedSurfaceAccepted",
  ],
  allowedOperationKinds: [
    "relation",
    "vocative",
    "rumored-report",
    "deleted-principal",
    "negative-ac-plural",
  ],
  canonicalRequestBuilder:
    "buildClassicalNahuatlSupplementationOperationRequest",
  canonicalEvaluator:
    "evaluateClassicalNahuatlSupplementationOperation",
  canonicalParadigmEvaluator:
    "evaluateClassicalNahuatlSupplementationOperationParadigm",
  relationInvariant: {
    requiredNodes: ["principal", "supplement"],
    requiredEdgeFields: [
      "referenceMode",
      "headRole",
      "supplementContactRole",
      "principalHead",
      "supplementContact",
    ],
    allowedReferenceModes: ["shared", "included"],
    allowedHeadRoles: ["subject", "object", "possessor"],
    clauseCompletionRequiredBeforeComposition: true,
  },
  formulaStringsAuthorize: false,
  surfacesAuthorize: false,
  lessonMetadataAuthorizes: false,
});

const LCM_AXES = Object.freeze([
  "principal-clause-kind",
  "supplement-clause-kind",
  "principal-head-role",
  "supplement-contact-role",
  "shared-or-included-reference",
  "anaphoric-or-cataphoric-order",
  "principal-first-or-supplement-first",
  "topic-comment-status",
  "marked-or-unmarked-adjunction",
  "demonstrative-adjunctor-fusion",
  "recursive-adjunction-depth",
  "discontinuous-distance",
  "third-person-contact-ambiguity",
  "information-question-replacement",
  "interrogative-domain",
  "integrated-antecessive-placement",
  "short-pronominal-utterance-boundary",
  "collective-reference-exception",
  "named-partner-exception",
  "male-bonding-speaker-exception",
  "ayi-silent-specific-object",
  "cah-principal-deletion",
  "so-called-versus-real-vocative",
  "vocative-speaker-gender",
  "vocative-e",
  "vocative-glottal-y",
  "vocative-supportive-i-absorption",
  "vocative-silent-plural-in",
  "female-vocative-prosody",
  "free-constituent-order",
  "vnc-supplement-role",
  "demonstrative-pronominal-plural",
  "ac-pronominal-plural",
  "pronominal-plural-compound-alternative",
  "included-head-third-singular",
  "principal-semantic-group",
  "speech-directness",
  "speech-act-kind",
  "reported-command-mood-shift",
  "wish-realizability",
  "wish-time-relation",
  "perception-present-default",
  "cognition-interrogative-complement",
  "affect-supplementary-subject",
  "future-coreferential-infinitive-reading",
  "quil-fixed-subject-tense",
  "quil-mach",
  "deleted-saying-principal",
  "surviving-direct-or-indirect-speech",
  "scalar-coordinate",
  "full-paradigm-coordinate-projection",
]);

export const CLASSICAL_NAHUATL_LESSONS17_19_LCM_AXIS_PROOF_FAMILIES =
  freezeDeep({
    "principal-clause-kind": ["clause-kind", "gcd"],
    "supplement-clause-kind": ["clause-kind", "gcd"],
    "principal-head-role": ["head-role"],
    "supplement-contact-role": ["head-role"],
    "shared-or-included-reference": ["reference", "included"],
    "anaphoric-or-cataphoric-order": ["order"],
    "principal-first-or-supplement-first": ["order"],
    "topic-comment-status": ["order"],
    "marked-or-unmarked-adjunction": ["adjunctor"],
    "demonstrative-adjunctor-fusion": ["adjunctor"],
    "recursive-adjunction-depth": ["recursion"],
    "discontinuous-distance": ["recursion", "order"],
    "third-person-contact-ambiguity": ["ambiguity"],
    "information-question-replacement": ["question"],
    "interrogative-domain": ["question", "complement"],
    "integrated-antecessive-placement": ["integrated"],
    "short-pronominal-utterance-boundary": ["short-pronoun"],
    "collective-reference-exception": ["agreement-exception"],
    "named-partner-exception": ["agreement-exception"],
    "male-bonding-speaker-exception": ["agreement-exception"],
    "ayi-silent-specific-object": ["silent-head"],
    "cah-principal-deletion": ["deletion"],
    "so-called-versus-real-vocative": ["vocative"],
    "vocative-speaker-gender": ["vocative"],
    "vocative-e": ["vocative"],
    "vocative-glottal-y": ["vocative"],
    "vocative-supportive-i-absorption": ["vocative"],
    "vocative-silent-plural-in": ["vocative"],
    "female-vocative-prosody": ["vocative"],
    "free-constituent-order": ["order"],
    "vnc-supplement-role": ["head-role", "clause-kind"],
    "demonstrative-pronominal-plural": ["pronominal-plural"],
    "ac-pronominal-plural": ["pronominal-plural"],
    "pronominal-plural-compound-alternative": ["pronominal-plural"],
    "included-head-third-singular": ["included", "reference"],
    "principal-semantic-group": ["complement"],
    "speech-directness": ["speech"],
    "speech-act-kind": ["speech"],
    "reported-command-mood-shift": ["speech"],
    "wish-realizability": ["wish"],
    "wish-time-relation": ["wish"],
    "perception-present-default": ["complement"],
    "cognition-interrogative-complement": ["complement"],
    "affect-supplementary-subject": ["complement"],
    "future-coreferential-infinitive-reading": ["complement"],
    "quil-fixed-subject-tense": ["report"],
    "quil-mach": ["report"],
    "deleted-saying-principal": ["deletion"],
    "surviving-direct-or-indirect-speech": ["deletion", "speech"],
    "scalar-coordinate": ["scalar"],
    "full-paradigm-coordinate-projection": ["paradigm"],
  });

const CLAIM_SIGNATURE_PROJECTION = CLASSICAL_NAHUATL_LESSONS17_19_SOURCE_CLAIMS.map(
  sourceClaim => ({
    id: sourceClaim.id,
    lesson: sourceClaim.lesson,
    section: sourceClaim.section,
    lineStart: sourceClaim.transcriptionLineStart,
    lineEnd: sourceClaim.transcriptionLineEnd,
    category: sourceClaim.category,
    disposition: sourceClaim.disposition,
    paths: sourceClaim.canonicalObjectIds,
    family: sourceClaim.ruleFamily,
    proofs: sourceClaim.proofIds,
  })
);

const CLAIM_SIGNATURE = signValue(
  CLAIM_SIGNATURE_PROJECTION,
  "lessons17-19-claims"
);
const LCM_SIGNATURE = signValue({
  axes: LCM_AXES,
  axisProofFamilies:
    CLASSICAL_NAHUATL_LESSONS17_19_LCM_AXIS_PROOF_FAMILIES,
}, "lessons17-19-lcm");

export const CLASSICAL_NAHUATL_LESSONS17_19_GRAMMAR_CONTRACT = freezeDeep({
  kind: "classical-nahuatl-supplementation-grammar-contract",
  version: CONTRACT_VERSION,
  contractId: "classical-nahuatl-supplementation",
  sourceAuthority: "Andrews transcription",
  sourceDocument: SOURCE_DOCUMENT,
  sourceLineStart: SOURCE_LINE_START,
  sourceLineEnd: SOURCE_LINE_END,
  greatestCommonDivisor: GCD,
  leastCommonMultiple: {
    axisCount: LCM_AXES.length,
    axes: LCM_AXES,
    axisProofFamilies:
      CLASSICAL_NAHUATL_LESSONS17_19_LCM_AXIS_PROOF_FAMILIES,
    signature: LCM_SIGNATURE,
  },
  sourceClosureFrame: {
    kind: "classical-nahuatl-supplementation-source-closure-frame",
    authorizationStatus: "authorized",
    claimCount: CLASSICAL_NAHUATL_LESSONS17_19_SOURCE_CLAIMS.length,
    unclassifiedClaimCount: 0,
    partialClaimCount: 0,
    blockedClaimCount: CLASSICAL_NAHUATL_LESSONS17_19_SOURCE_CLAIMS.filter(
      sourceClaim => sourceClaim.disposition === "genuinely-blocked"
    ).length,
    executableClaimCount: CLASSICAL_NAHUATL_LESSONS17_19_SOURCE_CLAIMS.filter(
      sourceClaim => sourceClaim.disposition !== "read-only-evidence"
    ).length,
    claims: CLASSICAL_NAHUATL_LESSONS17_19_SOURCE_CLAIMS,
    signature: CLAIM_SIGNATURE,
  },
  typedFrameAuthority: true,
  formulaStringAuthority: false,
  surfaceStringAuthority: false,
  lessonMetadataAuthority: false,
});
