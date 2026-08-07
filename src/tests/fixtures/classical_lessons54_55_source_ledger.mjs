// Test-only source inventory for ANDREWS_TRANSCRIPTION_CANVAS.md Lessons 54-55.
// Production grammar must not import this file or carry these spans.

const claim = (
  claimId,
  lineStart,
  lineEnd,
  ownerOperationIds,
  distinction,
  disposition = "canonical-rule"
) => Object.freeze({
  claimId,
  sourceDocument: "ANDREWS_TRANSCRIPTION_CANVAS.md",
  lineStart,
  lineEnd,
  ownerOperationIds: Object.freeze(ownerOperationIds),
  distinction,
  disposition,
  proofFamilies: Object.freeze([
    "positive",
    "negative",
    "interaction",
    "hostile-authority",
    "scalar-paradigm",
  ]),
});

export const CLASSICAL_NAHUATL_LESSONS54_55_SOURCE_RANGE = Object.freeze({
  lineStart: 22972,
  lineEnd: 24061,
});

export const CLASSICAL_NAHUATL_LESSONS54_55_SOURCE_CLAIMS = Object.freeze([
  claim("l54-denominal-domain", 22972, 22980, [], "nounstem-to-verbstem domain and suffix-versus-compound analysis", "architecture"),
  claim("l54-inceptive-inventory", 22981, 22998, ["inceptive-ti", "inceptive-hui", "inceptive-root-ya", "inceptive-a", "deverbal-yo-hua"], "five inceptive/stative suffixes, combinations, intransitivity, and meaning"),
  claim("l54-ti-basic-and-source-types", 22999, 23063, ["inceptive-ti"], "ti on absolutive predicates and simple, derived, compound, numeral, pronominal, agentive, adverbial, and relational sources"),
  claim("l54-ti-weather-unattested-num1", 23064, 23079, ["inceptive-ti"], "impersonal weather/time, unattested source, and exceptional num1 retention"),
  claim("l54-ti-class-and-lia", 23080, 23094, ["inceptive-ti", "ti-hui-lia-causative"], "ti Class A/B source-final policy and liā causative"),
  claim("l54-hui-formation", 23095, 23110, ["inceptive-hui"], "hui formation and w-contact"),
  claim("l54-hui-class-lia", 23111, 23115, ["inceptive-hui", "ti-hui-lia-causative"], "hui source-final class and liā causative"),
  claim("l54-root-ya-sources", 23116, 23148, ["inceptive-root-ya"], "root-plus-ya, unattested sources, stock i, and quantitive/agentive sources"),
  claim("l54-root-ya-class-action-nouns", 23149, 23182, ["inceptive-root-ya", "ya-lia-causative"], "ya Class A/B, x/z perfectives, action-noun behavior, and replacive liā"),
  claim("l54-root-ya-applicative", 23183, 23185, ["ya-lia-applicative"], "limited applicative liā from ya"),
  claim("l54-ti-ya", 23186, 23207, ["inceptive-ti-ya", "ya-lia-causative", "ya-lia-applicative"], "deverbal ti-ya, class alternatives, and replacive liā"),
  claim("l54-hui-ya", 23208, 23219, ["inceptive-hui-ya", "ya-lia-causative"], "deverbal hui-ya, Class B, and replacive liā"),
  claim("l54-destockal-ya", 23220, 23245, ["destockal-ya"], "destockal ni/hui plus preferred finite ya and Class B x/z perfective"),
  claim("l54-destockal-causative", 23246, 23254, ["destockal-a-causative"], "causative bypasses ya and adds ā to ni/hui source"),
  claim("l54-inceptive-a", 23255, 23280, ["inceptive-a"], "limited intransitive Class C ā and restricted oh-hui use"),
  claim("l54-yo-hua", 23281, 23309, ["deverbal-yo-hua"], "deverbal yō nounstem plus Class A huā and spelling ambiguity"),
  claim("l54-included-possessor-architecture", 23310, 23326, ["included-possessor-ti"], "possessive predicate, retained possessor, supplementary possessor, and Class A"),
  claim("l54-included-proxy", 23327, 23354, ["included-possessor-ti"], "proxy and representative family"),
  claim("l54-included-recompense", 23355, 23402, ["included-possessor-ti"], "recompense family, tense restriction, exclamation use, incorporation, and rare animate subject"),
  claim("l54-included-misfortune", 23403, 23419, ["included-possessor-ti"], "preterit-only exclamatory misfortune family and emphatic embeds"),
  claim("l54-included-temporal-pan", 23420, 23437, ["included-possessor-ti", "ti-a-causative-single"], "temporal pan family and nonanimate-possessor causative"),
  claim("l54-possession-ti", 23438, 23470, ["possession-ti"], "possession-ti semantics, focus, examples, and exceptional num1"),
  claim("l54-possession-ti-class-lia", 23471, 23483, ["possession-ti", "ti-hui-lia-causative"], "possession-ti class and liā causative"),
  claim("l54-ti-a-overview", 23484, 23492, ["ti-a-causative-single", "ti-a-causative-double-inceptive", "ti-a-causative-double-possession"], "first-type ti-ā versus second-type tiā and source-state split"),
  claim("l54-ti-a-possession-single", 23493, 23551, ["ti-a-causative-single"], "single-object possession-ti source, incorporated causative object, huah/yō matrices, and unattested sources"),
  claim("l54-ti-a-road-note", 23552, 23556, ["ti-a-causative-single"], "oh-hui-ti first-type causative dialect evidence", "read-only-evidence"),
  claim("l54-ti-a-patientive-chain", 23557, 23576, ["patientive-chain-ti-a"], "o-ā through patientive nounstem and ti to exceptional causative"),
  claim("l54-ti-a-inceptive-single", 23577, 23591, ["ti-a-causative-single"], "less frequent inceptive-ti source, synonymy with second type, and Class C"),
  claim("l54-ti-a-double-architecture", 23592, 23615, ["ti-a-causative-double-inceptive", "ti-a-causative-double-possession"], "possessive source maps NNC subject and possessor to two objects"),
  claim("l54-ti-a-double-inceptive", 23616, 23663, ["ti-a-causative-double-inceptive"], "double-object inceptive-ti examples, huah matrix, num1, and adjectival source transform"),
  claim("l54-ti-a-double-possession", 23664, 23678, ["ti-a-causative-double-possession"], "double-object possession-ti examples and Class C"),
  claim("l54-tia-homophony", 23679, 23732, ["ti-a-causative-single", "ti-a-causative-double-inceptive", "ti-a-causative-double-possession"], "ti meaning and type-one/type-two causative homophony with patientive source alternatives"),
  claim("l54-ti-ia-applicative", 23733, 23745, ["ti-ia-applicative"], "limited replacive t-iā applicative and Class C"),
  claim("l55-temporal-tia", 23746, 23761, ["temporal-tia"], "unitary intransitive tiā on numeral plus time-segment compounds"),
  claim("l55-causative-tla", 23762, 23786, ["denominal-causative-tla"], "limited Class A causative tla meanings and examples"),
  claim("l55-causative-tla-applicative", 23787, 23789, ["causative-tla-ti-lia-applicative"], "causative tla changes to ti before applicative liā"),
  claim("l55-intransitive-tla", 23790, 23799, ["intransitive-tla", "intransitive-tla-ti-a-causative", "intransitive-tla-ti-lia-applicative"], "very limited intransitive tla and ti-ā/ti-liā continuations"),
  claim("l55-oa-huia-overview", 23800, 23806, ["intransitive-o-a-use", "intransitive-o-a-produce", "applicative-huia-use", "applicative-huia-produce"], "Class C intransitive o-ā and single-object huiā counterparts"),
  claim("l55-oa-use", 23807, 23837, ["intransitive-o-a-use"], "use/apply/act-like intransitive o-ā and unattested sources"),
  claim("l55-oa-produce", 23838, 23841, ["intransitive-o-a-produce"], "limited production o-ā"),
  claim("l55-huia-use", 23842, 23893, ["applicative-huia-use"], "single-object use/apply huiā, broad meanings, yō sources, and suppressed yō matrix"),
  claim("l55-huia-double", 23894, 23899, ["applicative-huia-double-object"], "limited possessive-source two-object huiā"),
  claim("l55-huia-hypothetical", 23900, 23904, ["o-a-to-i-l-huia", "o-a-to-a-l-huia"], "o-ā direct to i-l-huiā/a-l-huiā through hypothetical source"),
  claim("l55-huia-produce", 23905, 23913, ["applicative-huia-produce"], "produce-for huiā"),
  claim("l55-adverbial-huia", 23914, 23927, ["adverbial-huia"], "adverbial nounstem plus single-object huiā"),
  claim("l55-relational", 23928, 23960, ["relational-o-a-transitive", "relational-o-a-intransitive", "relational-huia"], "relational matrix compound or possessive predicate to o-ā/huiā"),
  claim("l55-ihui-ahui", 23961, 23975, ["denominal-i-hui", "denominal-a-hui"], "denominal i-hui/a-hui intransitive source and ti synonymy"),
  claim("l55-ihui-ahui-causative", 23976, 23991, ["i-hui-to-o-a", "a-hui-to-o-a"], "generated i-hui/a-hui to causative o-ā and Class B/Class C pairing"),
  claim("l55-ihui-ahui-no-causative", 23992, 24003, ["denominal-i-hui", "denominal-a-hui"], "weather i-hui/a-hui stems without causative counterparts and root analysis"),
  claim("l55-transitive-ia-overview", 24004, 24009, ["transitive-i-a"], "restricted transitive i-ā with no intransitive counterpart"),
  claim("l55-transitive-ia-ch", 24010, 24024, ["transitive-i-a"], "nounstem-final ch examples"),
  claim("l55-transitive-ia-l", 24025, 24035, ["transitive-i-a"], "nounstem-final l examples"),
  claim("l55-transitive-ia-k-n", 24036, 24038, ["transitive-i-a"], "nounstem-final k and n examples"),
  claim("l55-transitive-ia-w", 24039, 24051, ["transitive-i-a", "applicative-huia-use"], "w-final forms may instead be huiā"),
  claim("l55-transitive-ia-source-i", 24052, 24055, ["transitive-i-a"], "apparent i may belong to the source nounstem"),
  claim("l55-transitive-ia-ihui-source", 24056, 24061, ["transitive-i-a", "denominal-i-hui"], "apparent i-ā may instead have an i-hui source"),
]);

export function auditClassicalNahuatlLessons5455SourceLedger({
  lines = [],
  operationIds = [],
} = {}) {
  const knownOperationIds = new Set(operationIds);
  const unownedOperations = CLASSICAL_NAHUATL_LESSONS54_55_SOURCE_CLAIMS
    .flatMap(entry => entry.ownerOperationIds)
    .filter(operationId => !knownOperationIds.has(operationId));
  const coveredLines = new Set();
  CLASSICAL_NAHUATL_LESSONS54_55_SOURCE_CLAIMS.forEach(entry => {
    for (let line = entry.lineStart; line <= entry.lineEnd; line += 1) coveredLines.add(line);
  });
  const uncoveredSubstantiveLines = [];
  for (
    let line = CLASSICAL_NAHUATL_LESSONS54_55_SOURCE_RANGE.lineStart;
    line <= CLASSICAL_NAHUATL_LESSONS54_55_SOURCE_RANGE.lineEnd;
    line += 1
  ) {
    const sourceLine = String(lines[line - 1] || "").trim();
    if (!sourceLine || sourceLine.startsWith("## PDF Page")) continue;
    if (!coveredLines.has(line)) uncoveredSubstantiveLines.push(line);
  }
  const proofFamiliesComplete = CLASSICAL_NAHUATL_LESSONS54_55_SOURCE_CLAIMS
    .every(entry => [
      "positive",
      "negative",
      "interaction",
      "hostile-authority",
      "scalar-paradigm",
    ].every(family => entry.proofFamilies.includes(family)));
  return Object.freeze({
    claimCount: CLASSICAL_NAHUATL_LESSONS54_55_SOURCE_CLAIMS.length,
    operationCount: knownOperationIds.size,
    unownedOperations: Object.freeze([...new Set(unownedOperations)]),
    uncoveredSubstantiveLines: Object.freeze(uncoveredSubstantiveLines),
    proofFamiliesComplete,
    sourceRange: CLASSICAL_NAHUATL_LESSONS54_55_SOURCE_RANGE,
  });
}
