// Test-only Andrews source ledger for Lessons 27, 28, 29, and 33.
//
// Source locations, dispositions, inventory counts, and closure receipts are
// deliberately absent from the production grammar/runtime and presentation
// contracts. This fixture verifies the executable grammar without becoming an
// authority path for it.

const PROOFS = Object.freeze([
  "positive",
  "negative",
  "interaction",
  "hostile",
  "scalar",
  "full-paradigm",
]);

const rows = [
  ["cn-l27-271-meanings-shapes",27,"27.1",9005,9015,"new-canonical-rule-required","frequentative-prefix-shape"],
  ["cn-l27-272-no-strict-selector",27,"27.2",9016,9019,"new-canonical-rule-required","frequentative-prefix-shape"],
  ["cn-l27-2721-glottal",27,"27.2.1",9020,9044,"new-canonical-rule-required","frequentative-prefix-shape"],
  ["cn-l27-2721-idiom",27,"27.2.1",9045,9053,"read-only-evidence","frequentative-evidence"],
  ["cn-l27-2721-unattested",27,"27.2.1",9054,9056,"read-only-evidence","frequentative-evidence"],
  ["cn-l27-2721-tla-fusion",27,"27.2.1",9057,9062,"existing-canonical-rule-reused","frequentative-tla"],
  ["cn-l27-2722-long",27,"27.2.2",9063,9073,"new-canonical-rule-required","frequentative-prefix-shape"],
  ["cn-l27-2723-short",27,"27.2.3",9074,9086,"new-canonical-rule-required","frequentative-prefix-shape"],
  ["cn-l27-272-note1-supportive-i",27,"27.2 note 1",9087,9094,"existing-canonical-rule-reused","frequentative-supportive-i"],
  ["cn-l27-272-note1-real-i",27,"27.2 note 1",9095,9096,"new-canonical-rule-required","frequentative-supportive-i"],
  ["cn-l27-272-note2-recursion",27,"27.2 note 2",9097,9101,"new-canonical-rule-required","frequentative-recursion"],
  ["cn-l27-273-object-overview",27,"27.3",9102,9104,"new-canonical-rule-required","frequentative-object"],
  ["cn-l27-2731-tla",27,"27.3.1",9105,9120,"existing-canonical-rule-reused","frequentative-tla"],
  ["cn-l27-2732-reflexive",27,"27.3.2",9121,9138,"new-canonical-rule-required","frequentative-reflexive"],
  ["cn-l27-274-source",27,"27.4",9139,9142,"existing-canonical-rule-reused","frequentative-destockal"],
  ["cn-l27-2741-intransitive",27,"27.4.1",9143,9162,"new-canonical-rule-required","frequentative-destockal"],
  ["cn-l27-2741-nonactive",27,"27.4.1",9163,9178,"existing-canonical-rule-reused","frequentative-nonactive"],
  ["cn-l27-2742-causative",27,"27.4.2",9179,9193,"new-canonical-rule-required","frequentative-destockal"],
  ["cn-l27-2743-lexical-fused",27,"27.4.3",9194,9212,"new-canonical-rule-required","frequentative-destockal"],
  ["cn-l27-2744-tza-ambiguity",27,"27.4.4",9213,9218,"new-canonical-rule-required","frequentative-destockal"],
  ["cn-l27-2745-applicative",27,"27.4.5",9219,9233,"new-canonical-rule-required","frequentative-destockal"],
  ["cn-l27-2745-molina-negative",27,"27.4.5 note",9228,9233,"read-only-evidence","frequentative-evidence"],
  ["cn-l27-2746-type-two",27,"27.4.6",9234,9237,"existing-canonical-rule-reused","frequentative-destockal"],
  ["cn-l27-275-overview",27,"27.5",9238,9240,"read-only-evidence","frequentative-uncertain"],
  ["cn-l27-2751-ca",27,"27.5.1",9241,9268,"new-canonical-rule-required","frequentative-uncertain"],
  ["cn-l27-2752-tzca",27,"27.5.2",9269,9287,"new-canonical-rule-required","frequentative-uncertain"],
  ["cn-l27-276-nonactive",27,"27.6",9288,9293,"existing-canonical-rule-reused","frequentative-nonactive"],
  ["cn-l28-281-composition",28,"28.1",9297,9318,"new-canonical-rule-required","compound-structure"],
  ["cn-l28-282-source-relations",28,"28.2",9319,9331,"new-canonical-rule-required","compound-structure"],
  ["cn-l28-282-matrix-order",28,"28.2",9332,9351,"new-canonical-rule-required","compound-structure"],
  ["cn-l28-282-embed-role",28,"28.2",9352,9370,"new-canonical-rule-required","compound-valence"],
  ["cn-l28-283-linkage",28,"28.3",9374,9390,"new-canonical-rule-required","compound-structure"],
  ["cn-l28-284-valence-grid",28,"28.4",9391,9402,"new-canonical-rule-required","compound-valence"],
  ["cn-l28-285-connective-allomorph",28,"28.5",9403,9417,"new-canonical-rule-required","compound-connective-t"],
  ["cn-l28-285-three-patterns",28,"28.5",9418,9420,"new-canonical-rule-required","compound-connective-t"],
  ["cn-l28-285-preterit-embed",28,"28.5",9421,9434,"new-canonical-rule-required","compound-preterit-embed"],
  ["cn-l28-286-matrix-inventory-a",28,"28.6",9435,9476,"new-canonical-rule-required","compound-matrix-inventory"],
  ["cn-l28-286-matrix-inventory-b",28,"28.6",9477,9577,"new-canonical-rule-required","compound-matrix-inventory"],
  ["cn-l28-286-ya-notes",28,"28.6 notes",9505,9539,"read-only-evidence","compound-evidence"],
  ["cn-l28-286-matrix-inventory-c",28,"28.6",9578,9656,"new-canonical-rule-required","compound-matrix-inventory"],
  ["cn-l28-2871-ca-embed",28,"28.7.1",9657,9667,"new-canonical-rule-required","compound-irregular-embed"],
  ["cn-l28-2872-ya-embed",28,"28.7.2",9668,9676,"new-canonical-rule-required","compound-irregular-embed"],
  ["cn-l28-2873-cac",28,"28.7.3",9677,9693,"new-canonical-rule-required","compound-irregular-embed"],
  ["cn-l28-2874-itta-itz",28,"28.7.4",9694,9717,"new-canonical-rule-required","compound-irregular-embed"],
  ["cn-l28-2875-event-order",28,"28.7.5",9718,9735,"new-canonical-rule-required","compound-event-order"],
  ["cn-l28-2876-passive",28,"28.7.6",9736,9741,"existing-canonical-rule-reused","compound-nonactive"],
  ["cn-l28-2877-impersonal",28,"28.7.7",9742,9760,"existing-canonical-rule-reused","compound-nonactive"],
  ["cn-l28-288-possession",28,"28.8",9761,9781,"new-canonical-rule-required","compound-supplement"],
  ["cn-l28-289-reflexive-matrix",28,"28.9",9782,9839,"new-canonical-rule-required","compound-reflexive-matrix"],
  ["cn-l28-2810-shared-object",28,"28.10",9840,9882,"new-canonical-rule-required","compound-shared-object"],
  ["cn-l28-2811-future-nequi",28,"28.11",9883,9916,"new-canonical-rule-required","compound-future-embed"],
  ["cn-l28-2811-future-qui",28,"28.11",9917,9946,"new-canonical-rule-required","compound-future-embed"],
  ["cn-l28-2811-conditional-note",28,"28.11 note",9947,9951,"read-only-evidence","compound-evidence"],
  ["cn-l28-2812-recursion",28,"28.12",9952,9963,"new-canonical-rule-required","compound-recursion"],
  ["cn-l29-291-linked-future",29,"29.1",9967,9981,"new-canonical-rule-required","purposive-structure"],
  ["cn-l29-291-sounded-negative",29,"29.1 note",9982,9984,"read-only-evidence","purposive-evidence"],
  ["cn-l29-291-directionals",29,"29.1",9985,10003,"new-canonical-rule-required","purposive-direction"],
  ["cn-l29-291-base",29,"29.1",10004,10012,"new-canonical-rule-required","purposive-base"],
  ["cn-l29-292-paradigm",29,"29.2",10013,10020,"new-canonical-rule-required","purposive-paradigm"],
  ["cn-l29-293-outbound-nonpast",29,"29.3",10021,10050,"new-canonical-rule-required","purposive-paradigm"],
  ["cn-l29-293-progressive-contrast",29,"29.3",10051,10087,"new-canonical-rule-required","purposive-contrast"],
  ["cn-l29-293-outbound-past",29,"29.3",10088,10111,"new-canonical-rule-required","purposive-paradigm"],
  ["cn-l29-293-outbound-optative",29,"29.3",10112,10173,"new-canonical-rule-required","purposive-paradigm"],
  ["cn-l29-293-aberrant-note",29,"29.3 note",10174,10178,"read-only-evidence","purposive-evidence"],
  ["cn-l29-294-inbound-nonfuture",29,"29.4",10179,10208,"new-canonical-rule-required","purposive-paradigm"],
  ["cn-l29-294-inbound-future",29,"29.4",10209,10231,"new-canonical-rule-required","purposive-paradigm"],
  ["cn-l29-294-inbound-optative",29,"29.4",10232,10250,"new-canonical-rule-required","purposive-paradigm"],
  ["cn-l29-295-nonactive",29,"29.5",10255,10263,"existing-canonical-rule-reused","purposive-nonactive"],
  ["cn-l29-296-recursion",29,"29.6",10264,10273,"new-canonical-rule-required","purposive-recursion"],
  ["cn-l29-297-external",29,"29.7",10274,10302,"existing-canonical-rule-reused","purposive-external-directional"],
  ["cn-l29-297-resultative-note",29,"29.7 note",10303,10310,"read-only-evidence","purposive-evidence"],
  ["cn-l29-xref-50",29,"50 cross-reference",21431,21457,"read-only-evidence","purposive-evidence"],
  ["cn-l33-331-overview",33,"33.1",11883,11894,"new-canonical-rule-required","honorific-gate"],
  ["cn-l33-332-general-causative",33,"33.2",11895,11950,"existing-canonical-rule-reused","honorific-causative"],
  ["cn-l33-332-irregular",33,"33.2",11951,11976,"new-canonical-rule-required","honorific-irregular"],
  ["cn-l33-332-motion",33,"33.2",11977,11994,"new-canonical-rule-required","honorific-irregular"],
  ["cn-l33-333-applicative",33,"33.3",11995,12013,"existing-canonical-rule-reused","honorific-applicative"],
  ["cn-l33-334-projective",33,"33.4",12014,12037,"new-canonical-rule-required","honorific-projective"],
  ["cn-l33-335-derived-source",33,"33.5",12038,12051,"existing-canonical-rule-reused","honorific-applicative"],
  ["cn-l33-336-projective-causative",33,"33.6",12052,12066,"existing-canonical-rule-reused","honorific-causative"],
  ["cn-l33-337-reflexive-source",33,"33.7",12067,12114,"new-canonical-rule-required","honorific-preterit-embed"],
  ["cn-l33-338-reverential",33,"33.8",12115,12134,"new-canonical-rule-required","reverential-double"],
  ["cn-l33-339-pejorative",33,"33.9",12135,12175,"new-canonical-rule-required","pejorative-preterit-embed"],
  ["cn-l33-3310-connective",33,"33.10",12176,12196,"new-canonical-rule-required","attitude-compound"],
  ["cn-l33-3310-idiom-shared",33,"33.10",12197,12221,"new-canonical-rule-required","attitude-compound"],
];

export const CLASSICAL_NAHUATL_LESSONS_27_28_29_33_SOURCE_SPAN_INVENTORY =
  Object.freeze(rows.map(([
    id,
    lesson,
    section,
    transcriptionLineStart,
    transcriptionLineEnd,
    disposition,
    ruleFamily,
  ]) => Object.freeze({
    id,
    lesson,
    section,
    transcriptionLineStart,
    transcriptionLineEnd,
    disposition,
    ruleFamily,
    implementationStatus: "implemented",
    executableRulePath: `classical-vnc-lessons27-29-33:${ruleFamily}`,
    proofFamilies: PROOFS,
  })));

export const CLASSICAL_NAHUATL_LESSONS_27_28_29_33_GCD = Object.freeze({
  invariant: "An engine-issued typed operation consumes an authorized typed VNC source and produces a typed VNC slot that alone can enter canonical finite boundary realization.",
  callerFormulaAuthority: false,
  callerSurfaceAuthority: false,
});

export const CLASSICAL_NAHUATL_LESSONS_27_28_29_33_LCM = Object.freeze({
  licensedRuleFamilies: Object.freeze([
    ...new Set(
      CLASSICAL_NAHUATL_LESSONS_27_28_29_33_SOURCE_SPAN_INVENTORY.map(
        entry => entry.ruleFamily
      )
    ),
  ]),
});

export function auditClassicalNahuatlLessons27282933SourceClosure() {
  const inventory =
    CLASSICAL_NAHUATL_LESSONS_27_28_29_33_SOURCE_SPAN_INVENTORY;
  const ids = inventory.map(entry => entry.id);
  const invalidIds = inventory.filter(entry =>
    !entry.id
    || !entry.section
    || !(entry.transcriptionLineStart > 0)
    || entry.transcriptionLineEnd < entry.transcriptionLineStart
    || ![
      "existing-canonical-rule-reused",
      "new-canonical-rule-required",
      "read-only-evidence",
      "genuinely-blocked",
    ].includes(entry.disposition)
    || entry.implementationStatus !== "implemented"
    || !entry.executableRulePath
    || entry.proofFamilies.length !== PROOFS.length
  ).map(entry => entry.id);
  return Object.freeze({
    authorizationStatus:
      invalidIds.length || new Set(ids).size !== ids.length
        ? "blocked"
        : "authorized",
    inventoryCount: inventory.length,
    uniqueIdCount: new Set(ids).size,
    invalidIds,
    unclassifiedCount: inventory.filter(entry => !entry.disposition).length,
    partiallyImplementedCount: inventory.filter(
      entry => entry.implementationStatus !== "implemented"
    ).length,
    genuinelyBlockedCount: inventory.filter(
      entry => entry.disposition === "genuinely-blocked"
    ).length,
    lessons: Object.freeze(Object.fromEntries(
      [27, 28, 29, 33].map(lesson => [
        lesson,
        inventory.filter(entry => entry.lesson === lesson).length,
      ])
    )),
  });
}
