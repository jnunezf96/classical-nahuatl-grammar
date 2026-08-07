// Test-only claim-level source ledger for Andrews Lesson 16.

const SOURCE_DOCUMENT = "ANDREWS_TRANSCRIPTION_CANVAS.md";
const DISPOSITIONS = new Set([
  "existing-canonical-rule",
  "new-canonical-rule",
  "read-only-evidence",
  "genuinely-blocked",
]);

const PROOF_FAMILIES = Object.freeze({
  source: Object.freeze({
    positive: "nnc-l16-closure:source-positive",
    negative: "nnc-l16-closure:source-negative",
    interaction: "nnc-l16-closure:source-subtype-interaction",
    hostile: "nnc-l16-closure:source-hostile-display",
    scalar: "nnc-l16-closure:source-scalar",
    paradigm: "nnc-l16-closure:source-paradigm",
  }),
  number: Object.freeze({
    positive: "nnc-l16-closure:number-positive",
    negative: "nnc-l16-closure:number-negative",
    interaction: "nnc-l16-closure:number-stem-interaction",
    hostile: "nnc-l16-closure:number-hostile-formula",
    scalar: "nnc-l16-closure:number-scalar",
    paradigm: "nnc-l16-closure:number-paradigm",
  }),
  context: Object.freeze({
    positive: "nnc-l16-closure:context-positive",
    negative: "nnc-l16-closure:context-negative",
    interaction: "nnc-l16-closure:context-subject-interaction",
    hostile: "nnc-l16-closure:context-hostile-boolean",
    scalar: "nnc-l16-closure:context-scalar",
    paradigm: "nnc-l16-closure:context-paradigm",
  }),
  discourse: Object.freeze({
    positive: "nnc-l16-closure:discourse-positive",
    negative: "nnc-l16-closure:discourse-negative",
    interaction: "nnc-l16-closure:discourse-position-interaction",
    hostile: "nnc-l16-closure:discourse-hostile-surface",
    scalar: "nnc-l16-closure:discourse-scalar",
    paradigm: "nnc-l16-closure:discourse-paradigm",
  }),
  paradigm: Object.freeze({
    positive: "nnc-l16-closure:paradigm-positive",
    negative: "nnc-l16-closure:paradigm-negative",
    interaction: "nnc-l16-closure:paradigm-coordinate-interaction",
    hostile: "nnc-l16-closure:paradigm-hostile-first-coordinate",
    scalar: "nnc-l16-closure:paradigm-scalar",
    paradigm: "nnc-l16-closure:paradigm-full",
  }),
  evidence: Object.freeze({
    positive: "nnc-l16-closure:evidence-audit",
    negative: "nnc-l16-closure:evidence-not-authority",
    interaction: "nnc-l16-closure:evidence-cross-reference",
    hostile: "nnc-l16-closure:evidence-hostile-answer",
    scalar: "nnc-l16-closure:evidence-scalar-nonauthority",
    paradigm: "nnc-l16-closure:evidence-paradigm-nonauthority",
  }),
});

function freezeClaim({
  id,
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
    lesson: "16",
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
    verificationScopes: Object.freeze(["engine", "scalar", "paradigm"]),
    lessonMetadataAuthority: false,
    sourceTextAuthority: false,
    displayTextAuthority: false,
  });
}

const C = freezeClaim;

export const CLASSICAL_NAHUATL_LESSON16_CLOSURE_CLAIMS = Object.freeze([
  C({ id: "l16-161-absolutive-semantic-family", section: "16.1", lineStart: 5374, lineEnd: 5377, category: "invariant", path: "nnc-pronominal-family", proofFamily: "source", summary: "Pronominal NNCs are absolutive entitive or quantitive predicates." }),
  C({ id: "l16-161-plain-versus-internal-plural", section: "16.1", lineStart: 5377, lineEnd: 5380, category: "structural-distinction", path: "resolveClassicalNahuatlLesson16PronominalNumberFrame", proofFamily: "number", summary: "Plural predicates retain a plain stem or acquire internal derivational n." }),
  C({ id: "l16-161-internal-n-subject-dyads", section: "16.1", lineStart: 5379, lineEnd: 5382, category: "invariant", path: "resolveClassicalNahuatlLesson16PronominalNumberFrame", proofFamily: "number", summary: "Internal n belongs to the predicate while t-in or a silent dyad belongs to the subject." }),
  C({ id: "l16-162-entitive-subtypes", section: "16.2", lineStart: 5383, lineEnd: 5384, category: "inventory", path: "buildClassicalNahuatlPronominalSourceFrame", proofFamily: "source", summary: "Entitive predicates divide into personal, interrogative, indefinite, and demonstrative subtypes; relative pronouns are absent." }),

  C({ id: "l16-1631-personal-semantics", section: "16.3.1", lineStart: 5385, lineEnd: 5393, category: "semantic-evidence", disposition: "read-only-evidence", path: "lesson16-personal-pronominal-semantics-evidence", proofFamily: "evidence", summary: "Personal stems identify a person and their English gloss does not define structure." }),
  C({ id: "l16-1632-simple-eh-yeh", section: "16.3.2.a", lineStart: 5394, lineEnd: 5406, category: "conditioned-source-selection", path: "buildClassicalNahuatlPronominalSourceFrame", proofFamily: "source", summary: "Simple eh is general and yeh is restricted to third-person subjects." }),
  C({ id: "l16-1632-simple-limited-use", section: "16.3.2.a note", lineStart: 5407, lineEnd: 5414, category: "contextual-restriction", disposition: "read-only-evidence", path: "lesson16-simple-personal-use-evidence", proofFamily: "evidence", summary: "Plural use is rare and third-common eh is abstract; use frequency is not output authority." }),
  C({ id: "l16-1632-simple-adverbial-crossref", section: "16.3.2.a note", lineStart: 5412, lineEnd: 5420, category: "necessary-cross-reference", disposition: "read-only-evidence", path: "lesson44-personal-adverbial-cross-reference", proofFamily: "evidence", summary: "Adverbial personal collocations belong to later sentence composition." }),
  C({ id: "l16-1632-compound-ehhua-yehhua", section: "16.3.2.b", lineStart: 5421, lineEnd: 5424, category: "conditioned-source-selection", path: "buildClassicalNahuatlPronominalSourceFrame", proofFamily: "source", summary: "Compound eh-hua is general and yeh-hua is third-person." }),
  C({ id: "l16-1632-compound-number-variants", section: "16.3.2.b", lineStart: 5425, lineEnd: 5456, category: "conditioned-operation", path: "resolveClassicalNahuatlLesson16PronominalNumberFrame", proofFamily: "number", summary: "Compound singulars have sounded or silent number; plurals use internal n with sounded or silent subject dyads." }),
  C({ id: "l16-1632-common-derived-personals", section: "16.3.2.c", lineStart: 5436, lineEnd: 5442, category: "derived-source", path: "buildClassicalNahuatlPronominalSourceFrame", proofFamily: "source", summary: "Common-number personal compounds admit plain abstract and reduplicated distributive stems." }),
  C({ id: "l16-1632-personal-modifier-evidence", section: "16.3.2.c note", lineStart: 5457, lineEnd: 5471, category: "sentence-evidence", disposition: "read-only-evidence", path: "lesson16-personal-modifier-evidence", proofFamily: "evidence", summary: "Modifier and idiomatic examples are sentence evidence, not stored answer routes." }),
  C({ id: "l16-1632-doubled-first-plural", section: "16.3.2.d", lineStart: 5472, lineEnd: 5481, category: "conditioned-operation", path: "buildClassicalNahuatlContextSelectionRecord", proofFamily: "context", summary: "Doubled first-person plural is limited to first-plural personal compounds and adds a contextual people-group meaning." }),
  C({ id: "l16-163-huampoh-crossref", section: "16.3 note", lineStart: 5482, lineEnd: 5484, category: "necessary-cross-reference", disposition: "read-only-evidence", path: "lesson31-huampoh-cross-reference", proofFamily: "evidence", summary: "Huam-poh belongs to the later comitative matrix inventory." }),
  C({ id: "l16-163-supplementation-crossref", section: "16.3 note", lineStart: 5489, lineEnd: 5492, category: "necessary-cross-reference", disposition: "read-only-evidence", path: "lessons17-18-personal-supplementation-cross-reference", proofFamily: "evidence", summary: "Personal paradigms may be supplemented by ordinary nounstems in Lessons 17 and 18." }),

  C({ id: "l16-164-identificational-interrogatives", section: "16.4", lineStart: 5493, lineEnd: 5496, category: "semantic-inventory", path: "buildClassicalNahuatlPronominalSourceFrame", proofFamily: "source", summary: "Interrogative entitives identify an entity or person." }),
  C({ id: "l16-1641-tleh-person-number", section: "16.4.1", lineStart: 5497, lineEnd: 5502, category: "source-and-paradigm", path: "buildClassicalNahuatlPronominalParadigmPlan", proofFamily: "paradigm", summary: "Tl-eh can occur with every subject person and number." }),
  C({ id: "l16-1641-tleh-in-fusion", section: "16.4.1", lineStart: 5503, lineEnd: 5510, category: "conditioned-realization", disposition: "new-canonical-rule", path: "buildClassicalNahuatlAdjunctorInFrame", proofFamily: "context", summary: "Elliptical in fuses with tl-eh as tlein, tlei, or tlen, and plural realizes tl-e-i before the plural dyad." }),
  C({ id: "l16-1641-dependent-in-separate", section: "16.4.1", lineStart: 5511, lineEnd: 5513, category: "conditioned-writing", path: "buildClassicalNahuatlContextSelectionRecord", proofFamily: "context", summary: "A present dependent clause keeps the pronominal NNC and in separate." }),
  C({ id: "l16-1641-interrogativity-deactivation", section: "16.4.1", lineStart: 5514, lineEnd: 5522, category: "discourse-condition", path: "classical-nahuatl-pronominal-nnc-pronominal-discourse-frame", proofFamily: "discourse", summary: "Negative or noninitial interrogative stems lose interrogative force." }),
  C({ id: "l16-1642-tlehhua", section: "16.4.2", lineStart: 5523, lineEnd: 5524, category: "source-operation", path: "buildClassicalNahuatlPronominalSourceFrame", proofFamily: "source", summary: "Tl-eh-hua is the compound what-entity matrix." }),
  C({ id: "l16-1643-ca-compounds", section: "16.4.3", lineStart: 5525, lineEnd: 5535, category: "source-composition", path: "buildClassicalNahuatlPronominalSourceFrame", proofFamily: "source", summary: "Ca is third-person and compounds with tl-eh, tl-e-in, or tl-eh-hua matrices." }),
  C({ id: "l16-1643-ca-negative-distinction", section: "16.4.3 note", lineStart: 5537, lineEnd: 5539, category: "boundary-warning", disposition: "read-only-evidence", path: "lesson16-long-ca-versus-negative-ca-evidence", proofFamily: "evidence", summary: "Long ca interrogative is structurally distinct from short ca at the end of a negative word." }),
  C({ id: "l16-1644-ac-restriction-and-ayac", section: "16.4.4", lineStart: 5540, lineEnd: 5552, category: "conditioned-operation", disposition: "new-canonical-rule", path: "buildClassicalNahuatlNncSentenceSurfaceFrame", proofFamily: "discourse", summary: "Ac has only a third-singular form with singular or plural semantics; its negative is ayac." }),
  C({ id: "l16-1644-ac-in-fusion", section: "16.4.4", lineStart: 5553, lineEnd: 5560, category: "conditioned-realization", disposition: "new-canonical-rule", path: "buildClassicalNahuatlAdjunctorInFrame", proofFamily: "context", summary: "Elliptical in fuses with ac as aquin or aqui; a present dependent clause keeps separate writing." }),
  C({ id: "l16-1644-ac-noninitial", section: "16.4.4", lineStart: 5561, lineEnd: 5563, category: "discourse-condition", path: "classical-nahuatl-pronominal-nnc-pronominal-discourse-frame", proofFamily: "discourse", summary: "Noninitial ac loses interrogative force." }),

  C({ id: "l16-165-demonstrative-inventory", section: "16.5", lineStart: 5564, lineEnd: 5579, category: "source-and-number-restriction", path: "buildClassicalNahuatlPronominalSourceFrame", proofFamily: "source", summary: "In and on are invariant third-person demonstratives; plural has a silent subject-number dyad and no internal n." }),
  C({ id: "l16-165-final-n-omission", section: "16.5", lineStart: 5580, lineEnd: 5580, category: "orthographic-alternative", disposition: "read-only-evidence", path: "lesson16-demonstrative-final-n-omission-evidence", proofFamily: "evidence", summary: "Traditional spelling may omit final n as i or o without changing the typed stem." }),
  C({ id: "l16-165-in-adjunctor-crossref", section: "16.5 note", lineStart: 5582, lineEnd: 5584, category: "necessary-cross-reference", disposition: "read-only-evidence", path: "lesson19-demonstrative-in-adjunctor-cross-reference", proofFamily: "evidence", summary: "The preceding in adjunctor and its traditional fusion belong to later sentence operations." }),

  C({ id: "l16-166-indefinite-ah", section: "16.6", lineStart: 5585, lineEnd: 5593, category: "source-and-boundary-operation", path: "buildClassicalNahuatlPronominalSourceFrame", proofFamily: "source", summary: "Indefinites use ah as matrix and remove embed vowel length before it." }),
  C({ id: "l16-1661-itlah", section: "16.6.1", lineStart: 5594, lineEnd: 5600, category: "source-composition", path: "buildClassicalNahuatlPronominalSourceFrame", proofFamily: "source", summary: "Itl-ah is the nonhuman indefinite pronominal predicate." }),
  C({ id: "l16-1662-itlah-human-special", section: "16.6.2", lineStart: 5601, lineEnd: 5605, category: "contextual-restriction", path: "buildClassicalNahuatlContextSelectionRecord", proofFamily: "context", summary: "A human subject with itlah requires the typed special-situation selection." }),
  C({ id: "l16-166-prefix-semantics-note", section: "16.6 note", lineStart: 5606, lineEnd: 5607, category: "semantic-restriction", disposition: "read-only-evidence", path: "lesson16-indefinite-versus-projective-prefix-evidence", proofFamily: "evidence", summary: "Indefinite stems are semantically narrower than te and tla projective prefixes." }),

  C({ id: "l16-167-quantitive-inventory", section: "16.7", lineStart: 5608, lineEnd: 5620, category: "typed-source-inventory", disposition: "new-canonical-rule", path: "buildClassicalNahuatlQuantitiveSourceAnalysis", proofFamily: "source", summary: "Quantitive sources use licensed chi, qui, or qui-ch matrices with iz, ix, miya, miye, mo, or a embeds." }),
  C({ id: "l16-167-long-before-internal-n", section: "16.7", lineStart: 5621, lineEnd: 5626, category: "conditioned-sound-change", path: "resolveClassicalNahuatlLesson16PronominalNumberFrame", proofFamily: "number", summary: "Long chi or qui allomorphs occur before internal plural n." }),
  C({ id: "l16-167-allomorph-deployment-note", section: "16.7 note", lineStart: 5627, lineEnd: 5633, category: "lexical-restriction", disposition: "read-only-evidence", path: "lesson16-quantitive-allomorph-deployment-evidence", proofFamily: "evidence", summary: "Glottal affective and short or vowelless allomorph deployment is lexically idiosyncratic and not predictable from a displayed string." }),

  C({ id: "l16-1681-ixquich", section: "16.8.1", lineStart: 5634, lineEnd: 5639, category: "source-and-number-operation", path: "buildClassicalNahuatlQuantitiveSourceAnalysis", proofFamily: "number", summary: "Ix-qui-ch keeps a plain predicate stem and uses t-in for plural subjects." }),
  C({ id: "l16-1681-adverbial-cem-evidence", section: "16.8.1", lineStart: 5640, lineEnd: 5650, category: "sentence-evidence", disposition: "read-only-evidence", path: "lesson16-ixquich-adverbial-evidence", proofFamily: "evidence", summary: "Adverbial ixquich and cem-ixquich uses are comparison evidence." }),
  C({ id: "l16-1682-quexquich-distributive", section: "16.8.2", lineStart: 5651, lineEnd: 5666, category: "source-composition", path: "buildClassicalNahuatlQuantitiveSourceAnalysis", proofFamily: "source", summary: "Que-x-qui-ch is interrogative and que-x-ix-qui-ch is its distributive source." }),
  C({ id: "l16-1682-noninitial-deactivation", section: "16.8.2", lineStart: 5667, lineEnd: 5673, category: "discourse-condition", path: "classical-nahuatl-pronominal-nnc-pronominal-discourse-frame", proofFamily: "discourse", summary: "Noninitial quantitive interrogatives lose interrogative force and may be adverbial." }),

  C({ id: "l16-169-general-internal-n", section: "16.9", lineStart: 5674, lineEnd: 5678, category: "conditioned-operation", path: "resolveClassicalNahuatlLesson16PronominalNumberFrame", proofFamily: "number", summary: "Qui and chi families normally add internal n with t-in or a silent subject dyad." }),
  C({ id: "l16-1691-miya-miye", section: "16.9.1", lineStart: 5679, lineEnd: 5688, category: "lexical-alternative", path: "buildClassicalNahuatlQuantitiveSourceAnalysis", proofFamily: "source", summary: "Miya and miye license qui or c matrices with internal-n and typed plain plural alternatives." }),
  C({ id: "l16-1692-cequi-cec", section: "16.9.2", lineStart: 5689, lineEnd: 5700, category: "source-restriction", path: "buildClassicalNahuatlQuantitiveSourceAnalysis", proofFamily: "source", summary: "Ce-qui is complete, ce-c is embed-only, and nasal plus s realizes ss." }),
  C({ id: "l16-1693-izqui", section: "16.9.3", lineStart: 5705, lineEnd: 5714, category: "lexical-alternative", path: "buildClassicalNahuatlQuantitiveSourceAnalysis", proofFamily: "number", summary: "Iz-qui licenses internal n or a plain qui plus m-eh plural." }),
  C({ id: "l16-1694-quezqui", section: "16.9.4", lineStart: 5715, lineEnd: 5730, category: "source-and-discourse-operation", path: "buildClassicalNahuatlQuantitiveSourceAnalysis", proofFamily: "source", summary: "Que-z-qui is interrogative, licenses internal n or rare m-eh, and has distributive que-c-iz-qui." }),
  C({ id: "l16-1695-aqui", section: "16.9.5", lineStart: 5731, lineEnd: 5732, category: "typed-source", path: "buildClassicalNahuatlQuantitiveSourceAnalysis", proofFamily: "source", summary: "A-qui is a licensed quantitive source." }),
  C({ id: "l16-1696-achi", section: "16.9.6", lineStart: 5733, lineEnd: 5735, category: "typed-source", path: "buildClassicalNahuatlQuantitiveSourceAnalysis", proofFamily: "source", summary: "A-chi is a licensed quantitive source." }),
  C({ id: "l16-1697-mochi", section: "16.9.7", lineStart: 5736, lineEnd: 5748, category: "lexical-alternative", path: "buildClassicalNahuatlQuantitiveSourceAnalysis", proofFamily: "number", summary: "Mo-chi or mo-ch licenses internal-n and typed plain plural alternatives." }),
  C({ id: "l16-1697-moch-ehhua", section: "16.9.7", lineStart: 5749, lineEnd: 5753, category: "source-composition", path: "buildClassicalNahuatlPronominalSourceFrame", proofFamily: "source", summary: "Mo-ch can embed in the eh-hua personal compound matrix." }),
  C({ id: "l16-1698-ixachi", section: "16.9.8", lineStart: 5754, lineEnd: 5758, category: "source-and-number-operation", path: "buildClassicalNahuatlQuantitiveSourceAnalysis", proofFamily: "number", summary: "Ix-a-chi licenses internal n with sounded or silent subject-number dyads." }),
]);

const REQUIRED_SECTIONS = Object.freeze([
  "16.1", "16.2", "16.3.1", "16.3.2.a", "16.3.2.a note",
  "16.3.2.b", "16.3.2.c", "16.3.2.c note", "16.3.2.d", "16.3 note",
  "16.4", "16.4.1", "16.4.2", "16.4.3", "16.4.3 note", "16.4.4",
  "16.5", "16.5 note", "16.6", "16.6.1", "16.6.2", "16.6 note",
  "16.7", "16.7 note", "16.8.1", "16.8.2", "16.9", "16.9.1",
  "16.9.2", "16.9.3", "16.9.4", "16.9.5", "16.9.6", "16.9.7",
  "16.9.8",
]);

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
    verificationScopes: claim.verificationScopes,
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

export function buildClassicalNahuatlLesson16ClosureFrame() {
  const claims = CLASSICAL_NAHUATL_LESSON16_CLOSURE_CLAIMS.map(claim => ({
    ...claim,
    canonicalObjectIds: [...claim.canonicalObjectIds],
    proofIds: { ...claim.proofIds },
    verificationScopes: [...claim.verificationScopes],
  }));
  const diagnostics = [];
  const seenIds = new Set();
  claims.forEach(claim => {
    if (!claim.id || seenIds.has(claim.id)) diagnostics.push(`duplicate-or-missing-claim-id:${claim.id || "empty"}`);
    seenIds.add(claim.id);
    if (!claim.section || !Number.isInteger(claim.transcriptionLineStart) || !Number.isInteger(claim.transcriptionLineEnd) || claim.transcriptionLineStart > claim.transcriptionLineEnd) diagnostics.push(`invalid-source-span:${claim.id}`);
    if (!DISPOSITIONS.has(claim.disposition)) diagnostics.push(`invalid-disposition:${claim.id}`);
    if (claim.implementationStatus !== "implemented") diagnostics.push(`partial-implementation:${claim.id}`);
    if (!claim.canonicalObjectIds.length || claim.canonicalObjectIds.some(value => !value)) diagnostics.push(`missing-executable-path:${claim.id}`);
    if (!PROOF_FAMILIES[claim.proofFamily]) diagnostics.push(`unknown-proof-family:${claim.id}`);
    if (!claim.proofIds || ["positive", "negative", "interaction", "hostile", "scalar", "paradigm"].some(kind => !claim.proofIds[kind])) diagnostics.push(`missing-proof-obligation:${claim.id}`);
    if (!["engine", "scalar", "paradigm"].every(scope => claim.verificationScopes.includes(scope))) diagnostics.push(`missing-verification-scope:${claim.id}`);
    if (claim.lessonMetadataAuthority !== false || claim.sourceTextAuthority !== false || claim.displayTextAuthority !== false) diagnostics.push(`authority-boundary-invalid:${claim.id}`);
  });
  REQUIRED_SECTIONS.forEach(section => {
    if (!claims.some(claim => claim.section === section)) diagnostics.push(`unclassified-source-section:${section}`);
  });
  const dispositionCounts = Object.fromEntries(
    [...DISPOSITIONS].map(disposition => [
      disposition,
      claims.filter(claim => claim.disposition === disposition).length,
    ])
  );
  return {
    kind: "classical-nahuatl-pronominal-nnc-source-closure-frame",
    version: 1,
    authorizationStatus: diagnostics.length ? "blocked" : "authorized",
    blockReason: diagnostics.length ? "lesson16-source-closure-incomplete" : "",
    sourceDocument: SOURCE_DOCUMENT,
    sourceLineStart: 5372,
    sourceLineEnd: 5758,
    claimCount: claims.length,
    claimSignatureAlgorithm: "fnv1a32-v1",
    claimSignature: buildSignature(claims),
    dispositionCounts,
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
