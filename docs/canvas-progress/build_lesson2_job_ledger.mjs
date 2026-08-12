#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const SOURCE_PATH = path.join(ROOT, "docs", "ANDREWS_ATOM_LEDGER.json");
const OUTPUT_PATH = path.join(ROOT, "docs", "canvas-progress", "lesson2-job-ledger.json");
const WRITE = process.argv.includes("--write");

const ACCEPTED_JOB_FAMILIES = new Set([
  "lesson2-sound-and-spelling",
  "lesson2-internal-stem-boundaries",
  "lesson2-syllables-and-supportive-i",
  "lesson2-stress",
  "lesson2-long-consonants",
  "lesson2-progressive-assimilation",
  "lesson2-regressive-assimilation-and-dissimilation",
  "lesson2-consonant-loss",
  "lesson2-other-consonant-changes",
  "lesson2-vowel-elision",
  "lesson2-long-vowel-to-glottal-stop",
  "lesson2-sentence-prosody",
]);

const APPLICATION_OWNED_OPEN_INPUT_ATOM_IDS = Object.freeze([
  "ACI-P050-L032-6A854B5881", "ACI-P050-L034-0CE6C057A3", "ACI-P050-L036-079BB77243", "ACI-P050-L037-A7ED68BC22", "ACI-P050-L041-5B4B525A12", "ACI-P051-L006-3F84F180F0", "ACI-P051-L008-420FE74E92", "ACI-P051-L008-420FE74E92-02", "ACI-P051-L008-420FE74E92-03", "ACI-P051-L008-420FE74E92-05", "ACI-P051-L008-420FE74E92-06", "ACI-P051-L008-420FE74E92-08", "ACI-P051-L015-986907F7FC", "ACI-P051-L018-ED7D149E28",
  "ACI-P051-L026-7282155306", "ACI-P051-L027-097671FEE2", "ACI-P051-L028-D5624DC1DD", "ACI-P051-L031-10C9538B7D", "ACI-P051-L032-84D6EBBE58", "ACI-P051-L034-FE426CEED5", "ACI-P051-L035-BC67855BC4", "ACI-P051-L037-8EAA56F84F-02", "ACI-P052-L005-D67B7A0379", "ACI-P052-L006-A594137899", "ACI-P052-L008-B75C5EBB29", "ACI-P052-L012-28B57C1184", "ACI-P052-L013-5B3C52836A", "ACI-P052-L015-C8ECAEF1C6", "ACI-P052-L016-866D50CD91", "ACI-P052-L019-3D1FA677FB",
  "ACI-P052-L022-B72E6F8124", "ACI-P052-L023-E395C0CE17", "ACI-P052-L024-D598542D29", "ACI-P052-L025-C3515708D9", "ACI-P052-L026-BBB86405FC", "ACI-P052-L031-9C69DED1C4",
]);
const APPLICATION_OWNED_OPEN_INPUT_ATOMS = new Set(APPLICATION_OWNED_OPEN_INPUT_ATOM_IDS);

const LESSON2_CONTEXTUAL_USER_CHOICE_ATOM_IDS = Object.freeze([
  "ACI-P050-L022-A33747C200",
  "ACI-P050-L025-12876984C1",
  "ACI-P050-L027-6ECB43F0B4",
  "ACI-P050-L031-20EA88210A",
  "ACI-P050-L033-8ED17977BE",
  "ACI-P050-L035-9EFC19B9DD",
  "ACI-P051-L024-FA7BB4A79C",
  "ACI-P052-L010-C54302F544",
  "ACI-P052-L014-75267806EC",
  "ACI-P052-L017-66E82EE5B5",
  "ACI-P052-L020-B62AAD1010",
]);

const EXACTLY_IMPLEMENTED_WRITING_ATOMS = Object.freeze({
  ...Object.fromEntries([
    "ACI-P040-L014-ADEC9EA5BA", "ACI-P040-L019-FC803B7069",
    "ACI-P040-L023-C01CE1CCD4", "ACI-P040-L025-9DA46515D8",
    "ACI-P040-L026-0DC2748F9B", "ACI-P040-L027-FCF284FAA9",
    "ACI-P040-L032-E41AC9D0AC", "ACI-P040-L032-1D7BCC5D92",
    "ACI-P040-L035-7F8DE8FC07", "ACI-P040-L036-921E01756F",
    "ACI-P040-L036-921E01756F-02", "ACI-P040-L038-0AA640AA81",
    "ACI-P040-L038-8C88669247", "ACI-P041-L002-78798DC5FC",
    "ACI-P041-L003-48A7223707", "ACI-P041-L004-E95528412D",
    "ACI-P041-L005-C43BD63F9E", "ACI-P041-L009-E5AD8FE012",
    "ACI-P041-L010-B352453433", "ACI-P041-L011-0D176C149F",
    "ACI-P041-L012-FA117920E0", "ACI-P041-L012-FA117920E0-02",
    "ACI-P041-L012-FA117920E0-03", "ACI-P041-L012-FA117920E0-04",
    "ACI-P041-L016-DA8C78CE97", "ACI-P041-L017-0C157E8D2C",
    "ACI-P041-L020-B5F8BE761D", "ACI-P041-L021-915EC47ED6",
    "ACI-P041-L023-A9E8878B46", "ACI-P041-L027-483A400CB1",
    "ACI-P041-L028-D0711ABC8B", "ACI-P041-L034-80C5D44F54",
    "ACI-P041-L036-A2AE8FEE10", "ACI-P041-L037-89AA1E5A6B",
    "ACI-P041-L038-618E249004", "ACI-P041-L039-94EE686CE3",
    "ACI-P041-L040-3B46F87E44", "ACI-P041-L041-0A5390ED12",
    "ACI-P041-L042-A746F8CF58", "ACI-P042-L002-487133CBD3",
    "ACI-P042-L007-76FBE35B6A", "ACI-P042-L009-0B04C64A1A",
    "ACI-P042-L010-3F0BBCCCFF", "ACI-P042-L012-1D19FE24D3",
    "ACI-P042-L013-3D25C97C65", "ACI-P042-L014-CE62BAD7C6",
    "ACI-P042-L017-06B8F9C50D", "ACI-P042-L019-29E356C10F",
    "ACI-P042-L020-51448F6307", "ACI-P042-L020-01D4D9B115",
    "ACI-P042-L024-20B24DB455", "ACI-P042-L027-CD2308A77F-02",
    "ACI-P042-L027-CD2308A77F-03", "ACI-P042-L027-CD2308A77F-04",
    "ACI-P042-L027-CD2308A77F-05",
  ].map(atomId => [atomId, Object.freeze({
    observationKind: "vowel-or-sonorant-normal-application-result",
    observationTest: `src/tests/classical_lesson2_vowel_sonorant_jobs.test.js#${atomId}`,
    mutationTest: `src/tests/classical_lesson2_vowel_sonorant_jobs.test.js#${atomId}-changed-behavior-fails`,
  })])),
  ...Object.fromEntries([
    "ACI-P039-L015-D741EB618B",
    "ACI-P039-L015-D741EB618B-02",
    "ACI-P039-L015-D741EB618B-03",
    "ACI-P039-L025-A0793B2361",
    "ACI-P039-L027-566A4F635F",
    "ACI-P039-L029-9E1CE576E7",
    "ACI-P039-L029-9E1CE576E7-02",
  ].map(atomId => [atomId, Object.freeze({
    observationKind: "phoneme-phone-source-writing-result",
    observationTest: `src/tests/classical_lesson2_spelling_source_jobs.test.js#${atomId}`,
    mutationTest: "src/tests/classical_lesson2_spelling_source_jobs.test.js#broken-source-environment-phone-or-writing",
  })])),
  "ACI-P039-L004-E7E01D8587-02": Object.freeze({
    observationKind: "sigeme-retained-in-formula",
    observationTest: "src/tests/classical_lesson2_sigeme_result.test.js#normal-application",
    mutationTest: "src/tests/classical_lesson2_sigeme_result.test.js#mutation-pronounced-segment",
  }),
  "ACI-P039-L004-E7E01D8587-03": Object.freeze({
    observationKind: "sigeme-omitted-from-pronounced-result",
    observationTest: "src/tests/classical_lesson2_sigeme_result.test.js#normal-application",
    mutationTest: "src/tests/classical_lesson2_sigeme_result.test.js#mutation-pronounced-segment",
  }),
  ...Object.fromEntries([
    "ACI-P039-L008-483475B7F1",
    "ACI-P039-L009-12800DB414",
    "ACI-P039-L010-C014D0FE1B",
    "ACI-P039-L010-9ACAD2E5CB",
    "ACI-P039-L010-9ACAD2E5CB-02",
    "ACI-P039-L010-9ACAD2E5CB-03",
    "ACI-P039-L010-9ACAD2E5CB-04",
    "ACI-P039-L010-9ACAD2E5CB-05",
    "ACI-P043-L012-EBD20BB4BF",
    "ACI-P043-L013-3C5E09B768",
    "ACI-P043-L017-A663631D10",
    "ACI-P043-L022-3DBCFED63B",
    "ACI-P043-L024-287580F016",
    "ACI-P044-L032-7A11C5ED53",
    "ACI-P044-L033-7E95D05969",
    "ACI-P044-L035-6C0893B25C",
    "ACI-P044-L037-CD2F6CB119",
    "ACI-P045-L039-CE4CCD3E27",
    "ACI-P046-L006-9ACDEA625D",
  ].map(atomId => [atomId, Object.freeze({
    observationKind: "contextual-spelling-result",
    observationTest: `src/tests/classical_lesson2_contextual_spelling_jobs.test.js#${atomId}`,
    mutationTest: `src/tests/classical_lesson2_contextual_spelling_jobs.test.js#${atomId}-broken-spelling`,
  })])),
  ...Object.fromEntries([
    "ACI-P039-L003-5036476036",
    "ACI-P039-L004-897BE64FB1",
    "ACI-P039-L004-E7E01D8587",
    "ACI-P039-L007-2C1DE9E201",
    "ACI-P041-L033-5DC2501239",
    "ACI-P041-L033-DABD2BE51F",
    "ACI-P042-L022-D2C248195A",
    "ACI-P042-L027-CD2308A77F",
    "ACI-P043-L015-B702A24041",
    "ACI-P043-L027-98A44BD022",
    "ACI-P044-L030-6CCBCBA244",
    "ACI-P044-L031-9E6CE9402F",
    "ACI-P044-L041-AD9B08BD11",
    "ACI-P045-L030-2527A41ED4",
    "ACI-P045-L031-18802D0BDC",
    "ACI-P045-L032-B859BA5D79",
    "ACI-P045-L033-E0F5380BED",
  ].map(atomId => [atomId, Object.freeze({
    observationKind: "basic-inventory-spelling-result",
    observationTest: `src/tests/classical_lesson2_basic_spelling_jobs.test.js#${atomId}`,
    mutationTest: `src/tests/classical_lesson2_basic_spelling_jobs.test.js#${atomId}-broken-result`,
  })])),
  ...Object.fromEntries([
    "ACI-P046-L021-40B6D61100",
    "ACI-P046-L022-9665D9D2EE",
    "ACI-P046-L022-9665D9D2EE-02",
    "ACI-P046-L022-9665D9D2EE-03",
    "ACI-P046-L024-D0D789C3B1",
    "ACI-P046-L025-4E77FB10D4",
    "ACI-P046-L026-70651956D2",
    "ACI-P046-L027-8FBF6FAAED",
    "ACI-P046-L029-25646A541C",
    "ACI-P046-L029-25646A541C-02",
    "ACI-P046-L029-25646A541C-03",
    "ACI-P046-L031-4CF7032CCC",
    "ACI-P046-L031-4CF7032CCC-02",
    "ACI-P046-L032-8E0B4956C5-02",
    "ACI-P046-L032-8E0B4956C5-03",
    "ACI-P046-L032-8E0B4956C5-04",
    "ACI-P046-L032-8E0B4956C5-05",
    "ACI-P046-L032-8E0B4956C5-06",
    "ACI-P046-L032-8E0B4956C5-07",
    "ACI-P046-L036-545DFECF5A",
    "ACI-P046-L037-BD23B5712F",
    "ACI-P046-L037-BD23B5712F-02",
    "ACI-P046-L037-BD23B5712F-03",
    "ACI-P046-L037-BD23B5712F-04",
    "ACI-P046-L040-0A22B91DC3",
    "ACI-P046-L040-0A22B91DC3-02",
    "ACI-P046-L040-0A22B91DC3-03",
  ].map(atomId => [atomId, Object.freeze({
    observationKind: "syllable-structure-application-result",
    observationTest: `src/tests/classical_lesson2_syllable_support_jobs.test.js#${atomId}`,
    mutationTest: `src/tests/classical_lesson2_syllable_support_jobs.test.js#${atomId}-broken-syllable-result`,
  })])),
  ...Object.fromEntries([
    "ACI-P047-L002-BB982A730E",
    "ACI-P047-L002-9154CBB67D",
    "ACI-P047-L005-DE55B2626F",
    "ACI-P047-L006-941AE6C38C",
    "ACI-P047-L007-B9B2E97833",
    "ACI-P047-L008-FA751C6F0E",
  ].map(atomId => [atomId, Object.freeze({
    observationKind: "supportive-i-application-result",
    observationTest: `src/tests/classical_lesson2_syllable_support_jobs.test.js#${atomId}`,
    mutationTest: `src/tests/classical_lesson2_syllable_support_jobs.test.js#${atomId}-broken-supportive-i-result`,
  })])),
  ...Object.fromEntries([
    "ACI-P046-L009-EFF49EA6AF",
    "ACI-P046-L011-06E359A028",
    "ACI-P046-L011-06E359A028-02",
    "ACI-P046-L011-06E359A028-03",
    "ACI-P046-L011-06E359A028-04",
    "ACI-P046-L011-06E359A028-05",
    "ACI-P046-L014-F4DAC0D6CD",
    "ACI-P046-L016-673C32854A",
    "ACI-P046-L016-611CEFD323",
    "ACI-P046-L016-611CEFD323-02",
    "ACI-P046-L017-F8C9C48474",
    "ACI-P046-L019-E3C2518B7A",
  ].map(atomId => [atomId, Object.freeze({
    observationKind: "open-transition-application-result",
    observationTest: `src/tests/classical_lesson2_open_transition_jobs.test.js#${atomId}`,
    mutationTest: `src/tests/classical_lesson2_open_transition_jobs.test.js#${atomId}-broken-boundary-result`,
  })])),
  ...Object.fromEntries([
    "ACI-P046-L032-8E0B4956C5-08",
    "ACI-P047-L019-47ABC339AF",
    "ACI-P047-L019-321EE487CC",
    "ACI-P047-L020-CA0F776F7A",
  ].map(atomId => [atomId, Object.freeze({
    observationKind: "syllable-boundary-application-result",
    observationTest: `src/tests/classical_lesson2_syllable_support_jobs.test.js#${atomId}`,
    mutationTest: `src/tests/classical_lesson2_syllable_support_jobs.test.js#${atomId}-broken-boundary-result`,
  })])),
  ...Object.fromEntries([
    "ACI-P048-L006-25D05DF809",
    "ACI-P048-L007-7D80962D8F",
    "ACI-P048-L014-75FA4A7118",
    "ACI-P048-L014-6209EBFA5B",
    "ACI-P048-L017-21FD087CB5",
    "ACI-P048-L017-AA7D9FFE1E",
    "ACI-P048-L020-5D3CE9F346",
    "ACI-P048-L021-F4ABE9D684",
    "ACI-P048-L022-E80F04FD5F",
    "ACI-P048-L023-40EA5A1AE2",
    "ACI-P048-L024-D82B147173",
    "ACI-P048-L025-80DD05B6AD",
    "ACI-P048-L026-1D67AB27C4",
    "ACI-P048-L027-3DE404BBB6",
  ].map(atomId => [atomId, Object.freeze({
    observationKind: "long-consonant-application-result",
    observationTest: `src/tests/classical_lesson2_length_progressive_jobs.test.js#${atomId}`,
    mutationTest: `src/tests/classical_lesson2_length_progressive_jobs.test.js#${atomId}-broken-length-result`,
  })])),
  ...Object.fromEntries([
    "ACI-P048-L031-8CCC8F75E7",
    "ACI-P048-L031-93FE5B0669",
    "ACI-P048-L033-9117D5E59C",
    "ACI-P048-L033-4DBE276D8A",
    "ACI-P048-L036-B8514ED37A",
    "ACI-P048-L038-479C0137E2",
    "ACI-P049-L002-B51D7D7656",
    "ACI-P049-L003-AD6AB5D703",
    "ACI-P049-L004-D7CCA4F6F0",
    "ACI-P049-L005-54CFD576ED",
    "ACI-P049-L006-0AE4EA92F1",
    "ACI-P049-L007-91AB12AD1D",
    "ACI-P049-L008-212820251B",
  ].map(atomId => [atomId, Object.freeze({
    observationKind: "progressive-assimilation-application-result",
    observationTest: `src/tests/classical_lesson2_length_progressive_jobs.test.js#${atomId}`,
    mutationTest: `src/tests/classical_lesson2_length_progressive_jobs.test.js#${atomId}-broken-assimilation-result`,
  })])),
  ...Object.fromEntries([
    "ACI-P049-L015-C455C3B960",
    "ACI-P049-L017-858F416ABB",
    "ACI-P049-L025-D67ABE3304",
    "ACI-P049-L026-3F7681258F",
    "ACI-P049-L027-6C08DCFF81",
    "ACI-P049-L035-5545D7F300",
    "ACI-P049-L038-A0960810AA",
    "ACI-P050-L002-2A6FAEECC1",
    "ACI-P050-L003-3F5C1F70A0",
    "ACI-P050-L011-3504D7C808",
    "ACI-P050-L014-BF59E2C201",
    "ACI-P050-L017-467770C28E",
    "ACI-P050-L018-F2730C2E59",
    "ACI-P050-L021-98D398DFAD",
    "ACI-P050-L022-A33747C200",
    "ACI-P050-L023-D4122E6980",
  ].map(atomId => [atomId, Object.freeze({
    observationKind: "regressive-assimilation-application-result",
    observationTest: `src/tests/classical_lesson2_regressive_rule_jobs.test.js#${atomId}`,
    mutationTest: `src/tests/classical_lesson2_regressive_rule_jobs.test.js#${atomId}-broken-regressive-result`,
  })])),
  ...Object.fromEntries([
    "ACI-P050-L028-B8D8FC0DC6", "ACI-P050-L029-420DB9E127", "ACI-P050-L029-420DB9E127-02", "ACI-P050-L031-20EA88210A", "ACI-P050-L033-8ED17977BE", "ACI-P050-L035-9EFC19B9DD", "ACI-P050-L038-FDCDDD3E8C", "ACI-P050-L039-F36B64DA08", "ACI-P051-L002-C2956C7FBE", "ACI-P051-L010-2EE5A7A9B5", "ACI-P051-L012-BC6FF0C48A", "ACI-P051-L017-604F54B6B3",
  ].map(atomId => [atomId, Object.freeze({ observationKind: "consonant-loss-application-result", observationTest: `src/tests/classical_lesson2_loss_shift_elision_jobs.test.js#${atomId}`, mutationTest: `src/tests/classical_lesson2_loss_shift_elision_jobs.test.js#${atomId}-broken-loss-result` })])),
  ...Object.fromEntries([
    "ACI-P051-L019-A6D680E32A", "ACI-P051-L019-97F9BE6EAC", "ACI-P051-L024-FA7BB4A79C", "ACI-P051-L033-C91A77F168", "ACI-P051-L036-56B81394BE", "ACI-P052-L004-6BDC02425C", "ACI-P052-L007-141665CE3D", "ACI-P052-L010-C54302F544", "ACI-P052-L014-75267806EC", "ACI-P052-L017-66E82EE5B5",
  ].map(atomId => [atomId, Object.freeze({ observationKind: "consonant-shift-application-result", observationTest: `src/tests/classical_lesson2_loss_shift_elision_jobs.test.js#${atomId}`, mutationTest: `src/tests/classical_lesson2_loss_shift_elision_jobs.test.js#${atomId}-broken-shift-result` })])),
  ...Object.fromEntries([
    "ACI-P052-L020-B62AAD1010", "ACI-P052-L021-547243D130", "ACI-P052-L027-342C84A888", "ACI-P052-L028-1D946166F0", "ACI-P052-L028-F3ABD9CFDA",
  ].map(atomId => [atomId, Object.freeze({ observationKind: "vowel-elision-application-result", observationTest: `src/tests/classical_lesson2_loss_shift_elision_jobs.test.js#${atomId}`, mutationTest: `src/tests/classical_lesson2_loss_shift_elision_jobs.test.js#${atomId}-broken-elision-result` })])),
  ...Object.fromEntries(APPLICATION_OWNED_OPEN_INPUT_ATOM_IDS.map(atomId => [atomId, Object.freeze({
    observationKind: "application-owned-open-input-phonology",
    observationTest: `src/tests/classical_lesson2_loss_shift_elision_jobs.test.js#${atomId}`,
    mutationTest: `src/tests/classical_lesson2_loss_shift_elision_jobs.test.js#${atomId}-broken-automatic-rule`,
  })])),
  "ACI-P047-L009-EF940827EC": Object.freeze({
    observationKind: "conditional-open-input-user-choice",
    observationTest: "src/tests/classical_source_initial_i_authority.test.js#ACI-P047-L009-EF940827EC",
    mutationTest: "src/tests/classical_source_initial_i_authority.test.js#ACI-P047-L009-EF940827EC-wrong-decision-owner",
  }),
  ...Object.fromEntries([
    "ACI-P052-L032-D1B1B21011", "ACI-P052-L035-9FDE253771", "ACI-P052-L035-48D4C08DCF", "ACI-P052-L038-6C1A02F633", "ACI-P052-L039-740017072D", "ACI-P052-L040-17C6C030DE",
  ].map(atomId => [atomId, Object.freeze({ observationKind: "application-owned-open-input-compound-result", observationTest: `src/tests/classical_lesson2_ui_obligation_jobs.test.js#${atomId}`, mutationTest: `src/tests/classical_lesson2_ui_obligation_jobs.test.js#${atomId}-broken-result` })])),
  ...Object.fromEntries(LESSON2_CONTEXTUAL_USER_CHOICE_ATOM_IDS.map(atomId => [atomId, Object.freeze({
    observationKind: "contextual-user-choice-changes-canonical-lesson2-result",
    observationTest: `src/tests/classical_lesson2_optional_result_controls.test.js#${atomId}`,
    mutationTest: `src/tests/classical_lesson2_optional_result_controls.test.js#${atomId}-broken-result-or-control`,
  })])),
});

const JOB_FAMILIES = Object.freeze([
  ["lesson2-sound-and-spelling", /^§2\.(?:(?:1|2|4)$|3(?:\.|$))/u],
  ["lesson2-internal-stem-boundaries", /^§2\.5$/u],
  ["lesson2-syllables-and-supportive-i", /^§2\.6(?:\.|$)/u],
  ["lesson2-stress", /^§2\.7$/u],
  ["lesson2-long-consonants", /^§2\.8$/u],
  ["lesson2-progressive-assimilation", /^§2\.(?:9$|10(?:\.|$))/u],
  ["lesson2-regressive-assimilation-and-dissimilation", /^§2\.11(?:\.|$)/u],
  ["lesson2-consonant-loss", /^§2\.12(?:\.|$)/u],
  ["lesson2-other-consonant-changes", /^§2\.13(?:\.|$)/u],
  ["lesson2-vowel-elision", /^§2\.14$/u],
  ["lesson2-long-vowel-to-glottal-stop", /^§2\.15$/u],
  ["lesson2-sentence-prosody", /^§2\.16$/u],
]);

// These statements teach pronunciation or interpretation but do not construct
// the written Result. Everything else that is grammar-bearing performs work in
// the writing system as well as helping the reader reverse that work.
const READING_ONLY_GRAMMAR_IDS = new Set([
  "ACI-P040-L015-292B034F76",
  "ACI-P040-L016-EF0B714C26",
  "ACI-P040-L017-6CAFD4507C",
  "ACI-P040-L020-601A8454A2",
  "ACI-P040-L021-F4AE95B8C8",
  "ACI-P040-L028-E5E4FA0E10",
  "ACI-P040-L028-A32E8D4B94",
  "ACI-P040-L028-A32E8D4B94-02",
  "ACI-P040-L029-D50AFEE57F",
  "ACI-P040-L040-05DFB02A6C",
  "ACI-P040-L040-05DFB02A6C-02",
  "ACI-P041-L018-BB55CC2F2F",
  "ACI-P041-L022-A623BC7669",
  "ACI-P042-L004-18E2C62565",
  "ACI-P042-L004-7521DE5E06",
  "ACI-P042-L008-52898F658F",
  "ACI-P042-L015-FE97A19365",
  "ACI-P042-L030-12C02AC2E2",
  "ACI-P042-L030-12C02AC2E2-02",
  "ACI-P042-L033-CB37BD327B-02",
  "ACI-P042-L033-CB37BD327B-03",
  "ACI-P042-L036-CE4E53CC74",
  "ACI-P043-L004-5EDD415D7E",
  "ACI-P043-L004-2F3D745824",
  "ACI-P043-L006-2B9B8DBEE8",
  "ACI-P043-L007-286B262319",
  "ACI-P043-L007-286B262319-02",
  "ACI-P043-L007-286B262319-03",
  "ACI-P043-L031-878278E713",
  "ACI-P043-L032-F7362249C5",
  "ACI-P043-L035-0303177562",
  "ACI-P043-L036-85CE4AA46C",
  "ACI-P043-L040-ED428953E9",
  "ACI-P044-L002-E6F700B460",
  "ACI-P044-L006-0810E3639E",
  "ACI-P044-L009-C82931EE62",
  "ACI-P044-L016-2945480AE5",
  "ACI-P044-L024-A8BA1A95C2",
  "ACI-P045-L002-361913A824",
  "ACI-P045-L003-7ADE7951E8",
  "ACI-P045-L004-BA52DFAA2C",
  "ACI-P045-L007-9384E589BA",
  "ACI-P045-L015-896059A9A2",
  "ACI-P045-L015-896059A9A2-02",
  "ACI-P045-L016-09ADD04091",
  "ACI-P045-L022-A48DEF25B1",
  "ACI-P045-L022-C7C6C233C1",
  "ACI-P047-L023-6987BF2E55",
  "ACI-P047-L043-BCEF23C063",
  "ACI-P048-L008-FBFB9145DF-11",
  "ACI-P048-L013-79A43748AD",
  "ACI-P048-L013-FA50C31933",
  "ACI-P048-L017-C013C1931E",
  "ACI-P050-L042-3F8AE565F6",
  "ACI-P050-L043-1F5C58F4D1",
  "ACI-P050-L044-8B8D433285",
  "ACI-P050-L045-8AC38655AB",
  "ACI-P051-L008-420FE74E92-04",
  "ACI-P051-L029-6AFB969F6C",
  "ACI-P051-L029-6AFB969F6C-02",
  "ACI-P051-L029-6AFB969F6C-03",
  "ACI-P051-L029-6AFB969F6C-04",
  "ACI-P051-L029-6AFB969F6C-05",
  "ACI-P051-L029-6AFB969F6C-06",
  "ACI-P051-L037-8EAA56F84F",
  "ACI-P051-L037-8EAA56F84F-03",
  "ACI-P051-L038-432665DF2C",
  "ACI-P053-L002-19416E3D57",
  "ACI-P053-L002-19416E3D57-02",
  "ACI-P053-L002-19416E3D57-03",
  "ACI-P053-L002-19416E3D57-04",
  "ACI-P053-L004-6D4437733A",
  "ACI-P053-L004-155CA2EB3B",
  "ACI-P053-L007-4C215DB435-02",
]);

const READING_ONLY_EVIDENCE_IDS = new Set([
  "ACI-P039-L015-D741EB618B-04",
  "ACI-P041-L034-73276DDFDA",
  "ACI-P042-L033-CB37BD327B-02",
  "ACI-P044-L024-A8BA1A95C2-02",
  "ACI-P043-L027-98A44BD022-03",
  "ACI-P043-L027-98A44BD022-05",
  "ACI-P047-L025-0BA41ED929",
  "ACI-P047-L026-2C813E6D9D",
  "ACI-P047-L027-21425C499E",
  "ACI-P047-L028-71941218CC",
  "ACI-P047-L029-67BFE31616",
  "ACI-P047-L030-9CFFA1787D",
  "ACI-P047-L031-68BAA8DE61",
  "ACI-P047-L032-888AA1454B",
  "ACI-P047-L033-641ED230F3",
  "ACI-P047-L034-DDB33A645F",
  "ACI-P047-L035-D2E2594088",
  "ACI-P047-L038-7FDC477D96",
  "ACI-P048-L008-FBFB9145DF",
  "ACI-P048-L008-FBFB9145DF-02",
  "ACI-P048-L008-FBFB9145DF-03",
  "ACI-P048-L008-FBFB9145DF-04",
  "ACI-P048-L008-FBFB9145DF-05",
  "ACI-P048-L008-FBFB9145DF-06",
  "ACI-P048-L008-FBFB9145DF-07",
  "ACI-P048-L008-FBFB9145DF-08",
  "ACI-P048-L008-FBFB9145DF-09",
  "ACI-P048-L008-FBFB9145DF-10",
]);

const DECISION_POLICIES = Object.freeze({
  ...Object.fromEntries(LESSON2_CONTEXTUAL_USER_CHOICE_ATOM_IDS.map(atomId => [atomId, Object.freeze({
    decisionOwner: "USER_WHEN_CANVAS_LICENSES_MORE_THAN_ONE_RESULT",
    userInterferenceRequired: true,
    uiControlPolicy: atomId === "ACI-P052-L020-B62AAD1010"
      ? "SHOW_CONTEXTUAL_ELISION_CHECKBOX"
      : "SHOW_CONTEXTUAL_OPTIONAL_RESULT_CHOICE",
    requiredUserInformation: "WHICH_LICENSED_RESULT_TO_WRITE",
  })])),
  "ACI-P047-L009-EF940827EC": Object.freeze({
    decisionOwner: "USER_ONLY_IF_APPLICATION_DOES_NOT_KNOW",
    userInterferenceRequired: false,
    uiControlPolicy: "SHOW_ONLY_FOR_UNKNOWN_INITIAL_I_SOURCE",
    requiredUserInformation: "INITIAL_I_SOURCE_STATUS",
  }),
  "ACI-P048-L017-C013C1931E": Object.freeze({
    decisionOwner: "USER_PRONUNCIATION_CONTEXT",
    userInterferenceRequired: false,
    uiControlPolicy: "READING_OR_PRONUNCIATION_VIEW_ONLY",
    requiredUserInformation: "",
  }),
  ...Object.fromEntries([
    "ACI-P052-L032-D1B1B21011", "ACI-P052-L035-9FDE253771", "ACI-P052-L035-48D4C08DCF", "ACI-P052-L038-6C1A02F633", "ACI-P052-L039-740017072D", "ACI-P052-L040-17C6C030DE",
  ].map(atomId => [atomId, Object.freeze({
    decisionOwner: "APPLICATION_AFTER_USER_SUPPLIES_STRUCTURE",
    userInterferenceRequired: false,
    uiControlPolicy: "REUSE_OPEN_COMPOUND_EMBED_AND_MATRIX_INPUTS",
    requiredUserInformation: "COMPOUND_EMBED_AND_MATRIX",
  })])),
});

function jobFamily(section) {
  return JOB_FAMILIES.find(([, pattern]) => pattern.test(section))?.[0] || "";
}

function writingRole(atom) {
  if (atom.force === "documentary" || atom.force === "analysis") return "";
  if (READING_ONLY_GRAMMAR_IDS.has(atom.atomId)) return "";
  if (atom.force === "evidence") {
    return READING_ONLY_EVIDENCE_IDS.has(atom.atomId) ? "" : "CHECKS_WRITING_GRAMMAR";
  }
  if (atom.projectRole === "result-projection" || atom.projectRole === "derived-realization") {
    return "WRITES_OR_CONTROLS_RESULT";
  }
  if (atom.projectRole === "applicability-or-constraint") {
    return "ALLOWS_BLOCKS_OR_CONSTRAINS_WRITING";
  }
  return "BUILDS_WRITING_MODEL";
}

function writingRequirement(atom, role) {
  if (!role) return "";
  if (role === "CHECKS_WRITING_GRAMMAR") {
    return `Use this Canvas example to check the related Lesson 2 writing rule without allowing the example to invent the rule: ${atom.meaning}`;
  }
  return `The normal application path must perform or enforce this Lesson 2 requirement when it applies: ${atom.meaning}`;
}

function buildLedger() {
  const source = JSON.parse(fs.readFileSync(SOURCE_PATH, "utf8"));
  const columns = source.codebook.atomTuple;
  const atoms = source.atoms
    .map((tuple) => Object.fromEntries(columns.map((column, index) => [column, tuple[index]])))
    .filter((atom) => /^§2(?:\.|$)/u.test(atom.canvasSection));

  const records = atoms.map((atom) => {
    const family = jobFamily(atom.canvasSection);
    const role = writingRole(atom);
    if (!family) throw new Error(`No Lesson 2 family for ${atom.atomId}`);
    const exactImplementation = EXACTLY_IMPLEMENTED_WRITING_ATOMS[atom.atomId] || null;
    const decisionPolicy = DECISION_POLICIES[atom.atomId] || (APPLICATION_OWNED_OPEN_INPUT_ATOMS.has(atom.atomId)
      ? Object.freeze({
        decisionOwner: "APPLICATION_FROM_OPEN_INPUT",
        userInterferenceRequired: false,
        uiControlPolicy: "NO_RESULT_CONTROL_AUTOMATIC_RULE",
        requiredUserInformation: "SOURCE_FORM_OR_STRUCTURE",
      })
      : Object.freeze({
      decisionOwner: role ? "APPLICATION" : "NONE_FOR_WRITING",
      userInterferenceRequired: false,
      uiControlPolicy: "NO_NEW_CONTROL_UNLESS_A_LATER_EXACT_REVIEW_PROVES_ONE_IS_REQUIRED",
      requiredUserInformation: "",
      }));
    return {
      atomId: atom.atomId,
      canvasSection: atom.canvasSection,
      canvasSpan: atom.canvasSpan,
      meaning: atom.meaning,
      sourceForce: atom.force,
      sourceCategory: atom.category,
      jobFamily: family,
      directions: role ? ["WRITING", "READING_AND_INTERPRETATION"] : ["READING_AND_INTERPRETATION"],
      directionClass: role ? "BOTH" : "READING_ONLY",
      writingRole: role,
      readerInterpreterRole: "GUIDES_READER_AND_INTERPRETER",
      normalApplicationRequirement: writingRequirement(atom, role),
      readerRequirement: `Use this atom to guide pronunciation, reading, or interpretation without allowing the guidance to authorize the generated Result: ${atom.meaning}`,
      evidenceAuthorizesGrammar: false,
      decisionOwner: decisionPolicy.decisionOwner,
      userInterferenceRequired: decisionPolicy.userInterferenceRequired,
      uiControlPolicy: decisionPolicy.uiControlPolicy,
      requiredUserInformation: decisionPolicy.requiredUserInformation,
      openInputPolicy: "ACCEPT_ANY_USER_SUPPLIED_FORM",
      writingImplementationStatus: exactImplementation
        ? "EXACTLY_OBSERVED_NORMAL_APPLICATION_BEHAVIOR"
        : role
          ? "ACCEPTED_JOB_NOT_YET_EXACTLY_OBSERVED"
          : "NOT_A_WRITING_JOB",
      observationKind: exactImplementation?.observationKind || "",
      observationTest: exactImplementation?.observationTest || "",
      mutationTest: exactImplementation?.mutationTest || "",
      acceptanceStatus: ACCEPTED_JOB_FAMILIES.has(family)
        ? "ACCEPTED_JOB_NOT_YET_IMPLEMENTED"
        : "PROPOSED_AWAITING_USER_REVIEW",
    };
  });

  const byDirectionClass = { WRITING_ONLY: 0, READING_ONLY: 0, BOTH: 0 };
  const byFamily = {};
  for (const record of records) {
    byDirectionClass[record.directionClass] += 1;
    byFamily[record.jobFamily] = (byFamily[record.jobFamily] || 0) + 1;
  }

  const acceptedJobs = records.filter((record) => (
    record.acceptanceStatus === "ACCEPTED_JOB_NOT_YET_IMPLEMENTED"
  )).length;
  const exactlyImplementedWritingJobs = records.filter((record) => (
    record.writingImplementationStatus
      === "EXACTLY_OBSERVED_NORMAL_APPLICATION_BEHAVIOR"
  )).length;

  return {
    schemaVersion: 1,
    kind: "classical-nahuatl-lesson2-atom-job-ledger",
    source: "ANDREWS_TRANSCRIPTION_CANVAS.md",
    rule: "Every Lesson 2 atom receives a proposed writing, reading, or both job before implementation.",
    counts: {
      lesson2Atoms: records.length,
      assignedJobs: records.length,
      acceptedJobs,
      pendingUserReview: records.length - acceptedJobs,
      unassignedJobs: records.filter((record) => !record.directionClass).length,
      writingJobs: records.filter((record) => Boolean(record.writingRole)).length,
      exactlyImplementedWritingJobs,
      writingJobsAwaitingExactObservation:
        records.filter((record) => Boolean(record.writingRole)).length
        - exactlyImplementedWritingJobs,
      byDirectionClass,
      byFamily,
    },
    invariants: {
      ledgerAuthorizesGrammar: false,
      evidenceAuthorizesGrammar: false,
      evidenceAbsenceBlocksGrammar: false,
      everyWritingJobRequiresNormalApplicationBehavior: true,
      everyAtomGuidesReadingOrChecksWriting: true,
      readerGuidanceDoesNotAuthorizeOrComposeResult: true,
      userInputIsOpenNotWhitelisted: true,
      noUserControlWithoutRequiredUnknownInformation: true,
      applicationOwnsDeterminableGrammarResults: true,
      acceptedStatusRequiresUserReview: true,
    },
    records,
  };
}

const ledger = buildLedger();
const serialized = `${JSON.stringify(ledger, null, 2)}\n`;
if (WRITE) fs.writeFileSync(OUTPUT_PATH, serialized);
else process.stdout.write(serialized);
