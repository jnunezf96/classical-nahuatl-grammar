// Test-only Canvas source ledger. Never install this module in production.

const SOURCE_DOCUMENT = "ANDREWS_TRANSCRIPTION_CANVAS.md";

function claim(id, section, lineStart, lineEnd, category, disposition, canonicalObjectIds, proofFamily) {
  return Object.freeze({
    id,
    lesson: 44,
    section,
    sourceDocument: SOURCE_DOCUMENT,
    transcriptionLineStart: lineStart,
    transcriptionLineEnd: lineEnd,
    category,
    disposition,
    implementationStatus: "implemented",
    canonicalObjectIds: Object.freeze(canonicalObjectIds),
    proofFamily,
    proofIds: Object.freeze([
      `${id}:positive`,
      `${id}:negative`,
      `${id}:scalar-batch`,
      `${id}:hostile`,
    ]),
    lessonMetadataAuthority: false,
    sourceTextAuthority: false,
    displayTextAuthority: false,
  });
}

export const CLASSICAL_LESSON44_SOURCE_LEDGER = Object.freeze([
  claim("l44-01-overview", "44.1", 17296, 17312, "adverbial-nuclear-overview", "canonical-rule", ["lesson44/gcd", "lesson44/lcm/domains"], "architecture"),
  claim("l44-02-degrees", "44.2", 17313, 17326, "degree-system", "canonical-rule", ["lesson44/degree/first", "lesson44/degree/second", "lesson44/degree/source-restrictions"], "degree"),
  claim("l44-03-vnc-intro", "44.3", 17330, 17334, "vnc-lexical-gate", "canonical-rule", ["lesson44/vnc/lexical-potential"], "lexical-gate"),
  claim("l44-04-vnc-cencah", "44.3.1", 17335, 17338, "vnc-record", "lexical-record", ["lesson44/source/44.3-cencah"], "vnc"),
  claim("l44-05-vnc-hualcah", "44.3.2", 17339, 17343, "vnc-record-collocation", "lexical-record", ["lesson44/source/44.3-hualcah", "lesson44/restriction/oc-hualcah"], "vnc"),
  claim("l44-06-vnc-cemihcac", "44.3.3", 17344, 17346, "vnc-record", "lexical-record", ["lesson44/source/44.3-cemihcac"], "vnc"),
  claim("l44-07-vnc-ihui", "44.3.4", 17347, 17349, "vnc-record", "lexical-record", ["lesson44/source/44.3-ihui"], "vnc"),
  claim("l44-08-vnc-iuh", "44.3.5", 17350, 17362, "vnc-record-contrast", "lexical-record", ["lesson44/source/44.3-iuh", "lesson44/negative/iuhqui-not-adverbial"], "vnc"),
  claim("l44-09-vnc-ihuihuih", "44.3.6", 17363, 17367, "vnc-obsolete-source", "lexical-record", ["lesson44/source/44.3-ihuihuih"], "vnc"),
  claim("l44-10-vnc-ici", "44.3.7", 17369, 17374, "vnc-record", "lexical-record", ["lesson44/source/44.3-ici"], "vnc"),
  claim("l44-11-vnc-iz", "44.3.8", 17375, 17390, "vnc-record-contrast", "lexical-record", ["lesson44/source/44.3-iz", "lesson44/negative/izqui-not-adverbial"], "vnc"),
  claim("l44-12-vnc-nohmah", "44.3.9", 17391, 17397, "vnc-conjectural-source", "lexical-record", ["lesson44/source/44.3-nohmah", "lesson44/contrast/nohmah-vnc-possessive"], "vnc"),
  claim("l44-13-vnc-yehua", "44.3.10", 17398, 17401, "vnc-record", "lexical-record", ["lesson44/source/44.3-yehua"], "vnc"),
  claim("l44-14-vnc-iyoh", "44.3.11", 17402, 17409, "vnc-record-collocation", "lexical-record", ["lesson44/source/44.3-iyoh", "lesson44/restriction/iyoh-zan-za"], "vnc"),
  claim("l44-15-vnc-motquiticah", "44.3.12", 17411, 17419, "vnc-connective-t", "lexical-record", ["lesson44/source/44.3-motquiticah"], "vnc"),
  claim("l44-16-vnc-mahciticah", "44.3.13", 17420, 17424, "vnc-connective-t", "lexical-record", ["lesson44/source/44.3-mahciticah"], "vnc"),
  claim("l44-17-nnc-overview-first", "44.4.1", 17425, 17458, "nnc-first-degree", "canonical-rule-plus-lexical-records", ["lesson44/nnc/first-degree", "lesson44/source/44.4-cemilhuitl", "lesson44/source/44.4-tequitl", "lesson44/source/44.4-inchan"], "nnc-degree"),
  claim("l44-18-nnc-second", "44.4.2", 17459, 17465, "nnc-second-degree", "canonical-rule-plus-lexical-record", ["lesson44/nnc/second-degree", "lesson44/source/44.4-cenyohoal"], "nnc-degree"),
  claim("l44-19-nnc-derived-stems", "44.4-note", 17466, 17469, "distributive-varietal-affinity", "productive-rule-plus-lexical-records", ["lesson44/nnc/derived-stem-potential", "lesson44/source/44.4-cecemilhuitl", "lesson44/source/44.4-cecenyohual", "lesson44/source/44.4-inchahchan"], "nnc-derived"),
  claim("l44-20-particle-nel", "44.5.1", 17470, 17472, "particle-looking-nnc", "lexical-record", ["lesson44/source/44.5-nel"], "particle-looking"),
  claim("l44-21-particle-huel", "44.5.2", 17473, 17490, "particle-looking-nnc-negative-contrast", "lexical-record-plus-restrictions", ["lesson44/source/44.5-huel", "lesson44/negative/ahhuel", "lesson44/contrast/flawed-hueli"], "particle-looking"),
  claim("l44-22-particle-nen", "44.5.3", 17491, 17504, "particle-looking-nnc-embed", "lexical-record-plus-incorporation", ["lesson44/source/44.5-nen", "lesson44/incorporation/nen"], "particle-looking"),
  claim("l44-23-particle-mo", "44.5.4", 17505, 17569, "particle-looking-nnc-question-negative-scope", "lexical-record-plus-sentence-restrictions", ["lesson44/source/44.5-mo", "lesson44/negative/ahmo-camo", "lesson44/scope/negative-adjunct"], "particle-looking"),
  claim("l44-24-particle-cuel", "44.5.5", 17570, 17579, "particle-looking-obsolete-source", "lexical-record", ["lesson44/source/44.5-cuel"], "particle-looking"),
  claim("l44-25-particle-mach", "44.5.6", 17580, 17600, "particle-looking-nnc-idiom-homophone", "lexical-record-plus-negative", ["lesson44/source/44.5-mach", "lesson44/negative/kinship-mach"], "particle-looking"),
  claim("l44-26-particle-quen", "44.5.7", 17601, 17621, "particle-looking-fused-adjunctor", "lexical-record-plus-collocations", ["lesson44/source/44.5-quen", "lesson44/quen/fused-in"], "particle-looking"),
  claim("l44-27-other-intro", "44.6", 17622, 17629, "other-absolutive-overview", "canonical-rule", ["lesson44/family/other-absolutive"], "other-absolutive"),
  claim("l44-28-other-time", "44.6", 17630, 17671, "time-duration-inventory", "lexical-records", ["lesson44/lcm/time-duration"], "other-absolutive"),
  claim("l44-29-other-place-manner", "44.6", 17673, 17717, "place-manner-degree-inventory", "lexical-records-plus-boundaries", ["lesson44/lcm/place-manner-degree", "lesson44/boundary/pani-final-i"], "other-absolutive"),
  claim("l44-30-other-stress-collocations", "44.6", 17719, 17738, "stress-group-and-unknown-collocations", "typed-collocation-plus-evidence-only-uncertainty", ["lesson44/stress/yeh-eh", "lesson44/evidence/yequeneh-yeceh-unknown"], "collocation"),
  claim("l44-31-preterit-general", "44.7", 17739, 17761, "preterit-agentive-productive-generalization", "canonical-productive-rule-plus-records", ["lesson44/preterit-agentive/general-use", "lesson44/preterit-agentive/regular-intransitive"], "preterit-agentive"),
  claim("l44-32-preterit-obsolete", "44.7", 17763, 17772, "preterit-agentive-obsolete-source", "productive-rule-plus-records", ["lesson44/preterit-agentive/obsolete-source"], "preterit-agentive"),
  claim("l44-33-preterit-root-plus-ya", "44.7", 17773, 17787, "preterit-agentive-root-plus-ya", "productive-rule-plus-records", ["lesson44/preterit-agentive/root-plus-ya", "lesson44/preterit-agentive/full-stem"], "preterit-agentive"),
  claim("l44-34-preterit-irregular", "44.7", 17788, 17791, "preterit-agentive-irregular", "lexical-record", ["lesson44/source/44.7-ichtaca"], "preterit-agentive"),
  claim("l44-35-preterit-transitive", "44.7", 17792, 17800, "preterit-agentive-transitive", "restricted-productive-route-plus-records", ["lesson44/preterit-agentive/transitive"], "preterit-agentive"),
  claim("l44-36-preterit-reflexive", "44.7", 17801, 17818, "preterit-agentive-reflexive", "canonical-rule-plus-lexical-exceptions", ["lesson44/preterit-agentive/reflexive-shuntline", "lesson44/preterit-agentive/reflexive-mainline-lexicalized"], "preterit-agentive"),
  claim("l44-37-preterit-incorporation-note", "44.7-note", 17819, 17820, "cross-reference-incorporation", "reused-canonical-operation", ["lesson44/incorporation/preterit-agentive", "lesson30/incorporated-adverb"], "interaction"),
  claim("l44-38-possessive-overview", "44.8", 17821, 17825, "possessive-state-overview", "canonical-rule", ["lesson44/possessive/first-degree-only", "lesson44/defer/45-47"], "possessive"),
  claim("l44-39-possessive-iyohca", "44.8.1", 17826, 17833, "possessive-active-action", "lexical-records", ["lesson44/source/44.8-iyohca", "lesson44/source/44.8-noyohca", "lesson44/source/44.8-moyohca"], "possessive"),
  claim("l44-40-possessive-nohmah", "44.8.2.a", 17834, 17845, "possessive-patientive-conjectural", "lexical-records-plus-uncertainty", ["lesson44/source/44.8-nonohmah", "lesson44/source/44.8-tonohmah"], "possessive"),
  claim("l44-41-possessive-nohmatca", "44.8.2.b", 17846, 17858, "possessive-active-action-conjectural", "lexical-records-plus-uncertainty", ["lesson44/source/44.8-nonohmatca", "lesson44/source/44.8-tonohmatca"], "possessive"),
  claim("l44-42-possessive-note", "44.8-note", 17859, 17873, "analysis-conflict-honorific-lexicalization", "evidence-only-uncertainty", ["lesson44/evidence/carochi-conflict", "lesson44/evidence/honorific-unexplained", "lesson44/evidence/lexicalization-possible"], "evidence-only"),
  claim("l44-43-incorporation-operation", "44.9", 17874, 17886, "external-versus-incorporated-scope", "canonical-operation", ["lesson44/incorporation/subject-discard", "lesson44/incorporation/scope"], "incorporation"),
  claim("l44-44-incorporation-idioms", "44.9", 17887, 17891, "incorporation-idiomatic-results", "lexical-evidence", ["lesson44/incorporation/idiomatic-possibility"], "incorporation"),
  claim("l44-45-incorporation-pani", "44.9", 17892, 17901, "incorporation-boundary", "canonical-boundary-rule-plus-evidence", ["lesson44/boundary/pani-final-i-loss", "lesson44/incorporation/pan"], "incorporation"),
  claim("l44-46-incorporation-compound-only", "44.9", 17902, 17908, "compound-only-adverbials", "lexical-records-plus-canonical-operation", ["lesson44/source/44.9-nal", "lesson44/source/44.9-nepan"], "incorporation"),
]);

export const CLASSICAL_LESSON44_SOURCE_SPAN = Object.freeze({
  sourceDocument: SOURCE_DOCUMENT,
  lineStart: 17296,
  lineEnd: 17908,
});

