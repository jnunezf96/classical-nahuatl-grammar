// Test-only source ledger. None of these spans or dispositions is installed in
// the runtime or projected into Source, Grammar, Result, or paradigm rows.

const claim = (claimId, lesson, section, lineStart, lineEnd, axisIds, disposition = "canonical-rule") =>
  Object.freeze({
    claimId,
    lesson,
    section,
    lineStart,
    lineEnd,
    axisIds: Object.freeze(axisIds),
    disposition,
    sourceDocument: "ANDREWS_TRANSCRIPTION_CANVAS.md",
  });

export const CLASSICAL_NAHUATL_LESSONS45_47_SOURCE_SPAN_INVENTORY = Object.freeze([
  claim("45-01", 45, "45.1", 17914, 17962, [
    "relational-nounstem-not-preposition",
    "translation-preposition-has-no-source-slot",
    "relational-context-role-locale-source-goal-path",
    "supplementary-possessor-cooperation",
    "affective-relational-tzin-or-ton-then-co",
  ]),
  claim("45-02", 45, "45.2", 17963, 18018, [
    "usage-option-one-simple-possessive",
    "usage-option-two-integrated-matrix",
    "usage-option-three-linked-connective-t",
    "usage-option-four-compound-embed",
    "ordinary-vs-adverbialized-subject-branch",
  ]),
  claim("45-03", 45, "45.3", 18019, 18034, [
    "five-option-groups",
    "contextual-translation-does-not-authorize-morphology",
  ]),
  claim("45-04", 45, "45.4.1", 18035, 18096, [
    "option-one-only-four-stems",
    "huan-reciprocal-downgrade",
    "huan-and-pan-numeral-link-not-conjunctor",
  ]),
  claim("45-05", 45, "45.4.2", 18097, 18111, ["option-one-only-four-stems"]),
  claim("45-06", 45, "45.4.3", 18112, 18126, ["option-one-only-four-stems"]),
  claim("45-07", 45, "45.4.4.a", 18127, 18154, [
    "ic-fixed-third-common-possessor",
    "ic-means-purpose-reason-time-functions",
  ]),
  claim("45-08", 45, "45.4.4.b", 18155, 18171, ["ic-means-purpose-reason-time-functions"]),
  claim("45-09", 45, "45.4.4.c", 18172, 18176, ["ic-means-purpose-reason-time-functions"]),
  claim("45-10", 45, "45.4.4.d", 18177, 18250, [
    "ic-initial-interrogative-vs-noninitial",
    "ic-canin-fusion-only-with-absent-adjunct",
    "ic-negative-noninterrogative",
  ]),
  claim("45-11", 45, "45.4.4.e", 18251, 18280, ["ic-ordinal-adverb-degree-measurement"]),

  claim("46-01", 46, "46.1-46.2", 18283, 18303, [
    "option-two-only-eleven-matrices-not-suffixes",
    "locative-n-supportive-i-after-consonant",
  ]),
  claim("46-02", 46, "46.3", 18304, 18314, ["locative-n-ca-two-source-attachments"]),
  claim("46-03", 46, "46.3.1.a", 18315, 18368, ["locative-n-ca-two-source-attachments"]),
  claim("46-04", 46, "46.3.1.b", 18369, 18418, ["locative-n-active-action-possessor-agent"]),
  claim("46-05", 46, "46.3.2.a", 18419, 18449, [
    "ic-canin-fusion-only-with-absent-adjunct",
    "ic-initial-interrogative-vs-noninitial",
    "ic-negative-noninterrogative",
  ]),
  claim("46-06", 46, "46.3.2.b", 18450, 18494, ["locative-n-ca-two-source-attachments"]),
  claim("46-07", 46, "46.4.1", 18495, 18580, [
    "locative-n-imperfect-active-passive-impersonal-state-mapping",
    "ordinary-vs-adverbialized-subject-branch",
  ]),
  claim("46-08", 46, "46.4.2", 18581, 18591, ["locative-n-imperfect-active-passive-impersonal-state-mapping"]),
  claim("46-09", 46, "46.4.3", 18592, 18625, ["locative-n-imperfect-active-passive-impersonal-state-mapping"]),
  claim("46-10", 46, "46.4 notes", 18626, 18637, [
    "locative-n-yohua-present-exception",
    "locative-n-varietal-and-affective",
  ]),
  claim("46-11", 46, "46.5", 18638, 18682, [
    "yan-perfective-source-subject-to-possessor",
    "yan-absolutive-incorporated-adverb-and-tla-impersonal",
  ]),
  claim("46-12", 46, "46.6", 18683, 18706, ["tlah-abundance-absolutive-or-possessive"]),
  claim("46-13", 46, "46.7", 18707, 18847, [
    "co-c-conditioned-by-preceding-segment",
    "co-fire-after-vowel-exception",
    "co-c-temporal-yo-and-nested-location",
    "co-c-affective-silent-replacement",
  ]),
  claim("46-14", 46, "46.8", 18848, 18965, ["co-c-body-part-combinations-not-compound-prepositions"]),
  claim("46-15", 46, "46.9", 18966, 19004, ["ca-interval-vs-locative-c-homonym"]),
  claim("46-16", 46, "46.10", 19005, 19090, [
    "pa-direction-can-embed-relational-compounds",
    "co-pa-composed-direction-source",
  ]),
  claim("46-17", 46, "46.11", 19091, 19122, [
    "pa-direction-vs-pa-frequency-source-gate",
    "pa-frequency-boundary-assimilation",
  ]),
  claim("46-18", 46, "46.12", 19123, 19149, [
    "nal-fixed-water-embed",
    "chi-favorite-ground-vs-rare-other-embed",
  ]),
  claim("46-19", 46, "46.13", 19150, 19163, ["ic-downward-body-part-source"]),
  claim("46-20", 46, "46.14", 19164, 19172, ["teuh-similarity-manner"]),
  claim("46-21", 46, "46.15", 19173, 19215, [
    "numeral-modifier-of-co-c-must-be-adverbialized",
    "contextual-translation-does-not-authorize-morphology",
  ]),

  claim("47-01", 47, "47.1.1", 19219, 19258, ["options-one-two-tzalan-and-huic"]),
  claim("47-02", 47, "47.1.2", 19259, 19292, ["options-one-two-tzalan-and-huic"]),
  claim("47-03", 47, "47.2.1", 19293, 19371, ["options-one-three-ca-and-icpac"]),
  claim("47-04", 47, "47.2.2", 19372, 19421, ["options-one-three-ca-and-icpac"]),
  claim("47-05", 47, "47.3.1", 19422, 19488, ["options-one-two-three-tech-tlan-pan"]),
  claim("47-06", 47, "47.3.2", 19489, 19572, ["options-one-two-three-tech-tlan-pan"]),
  claim("47-07", 47, "47.3.3.a", 19573, 19705, [
    "options-one-two-three-tech-tlan-pan",
    "huan-and-pan-numeral-link-not-conjunctor",
  ]),
  claim("47-08", 47, "47.3.3.b", 19706, 19799, ["options-one-two-three-tech-tlan-pan"]),
  claim("47-09", 47, "47.3.3.c", 19800, 19807, ["options-one-two-three-tech-tlan-pan"]),
  claim("47-10", 47, "47.4", 19808, 19865, [
    "associated-entity-ca-matrix",
    "associated-entity-co-c-silent-replacement",
    "associated-entity-not-gentilic",
  ]),
  claim("47-11", 47, "47.5.1", 19866, 19893, [
    "pertinency-direct-relational-source",
    "embedded-possessor-does-not-control-outer-state",
  ]),
  claim("47-12", 47, "47.5.2", 19894, 19927, ["pertinency-associated-entity-source"]),
]);

export function summarizeClassicalNahuatlLessons4547SourceLedger() {
  const byLesson = {};
  const axisIds = new Set();
  for (const entry of CLASSICAL_NAHUATL_LESSONS45_47_SOURCE_SPAN_INVENTORY) {
    byLesson[entry.lesson] = (byLesson[entry.lesson] || 0) + 1;
    entry.axisIds.forEach((axisId) => axisIds.add(axisId));
  }
  return Object.freeze({
    claimCount: CLASSICAL_NAHUATL_LESSONS45_47_SOURCE_SPAN_INVENTORY.length,
    byLesson: Object.freeze(byLesson),
    axisIds: Object.freeze([...axisIds]),
    unclassifiedCount: 0,
    sourceDocument: "ANDREWS_TRANSCRIPTION_CANVAS.md",
  });
}
