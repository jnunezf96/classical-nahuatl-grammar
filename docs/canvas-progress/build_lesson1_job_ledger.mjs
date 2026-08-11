#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const SOURCE_PATH = path.join(ROOT, "docs", "ANDREWS_ATOM_LEDGER.json");
const OUTPUT_PATH = path.join(ROOT, "docs", "canvas-progress", "lesson1-job-ledger.json");
const WRITE = process.argv.includes("--write");
const EXACTLY_OBSERVED_SECTIONS = new Set([
  "1.1",
  "1.2",
  "1.3",
  "1.4",
  "1.5",
  "1.6",
  "1.7",
  "1.8",
  "1.9",
  "1.10",
]);
const EXACTLY_PRESENTED_READER_ATOMS = new Set([
  "ACI-P018-L003-6F9AEBE144",
  "ACI-P018-L003-6F9AEBE144-02",
  "ACI-P018-L004-8B274196BE",
  "ACI-P018-L005-C65BAEE067",
  "ACI-P018-L007-11699BCBF2",
  "ACI-P018-L008-FC00404AFC",
  "ACI-P018-L008-FC00404AFC-02",
  "ACI-P018-L008-FC00404AFC-03",
  "ACI-P018-L008-FC00404AFC-04",
  "ACI-P018-L008-FC00404AFC-05",
  "ACI-P018-L008-FC00404AFC-06",
  "ACI-P018-L008-FC00404AFC-07",
  "ACI-P018-L008-FC00404AFC-08",
  "ACI-P018-L008-FC00404AFC-09",
  "ACI-P018-L011-9AF60BB546",
  "ACI-P018-L011-9AF60BB546-02",
  "ACI-P018-L011-9AF60BB546-03",
  "ACI-P018-L011-9AF60BB546-04",
]);

const SECTION_1_1_OBSERVATIONS = Object.freeze({
  "ACI-P018-L003-6F9AEBE144": "preliminary-scope-bounded",
  "ACI-P018-L003-6F9AEBE144-02": "preliminary-foundation-not-complete-grammar",
  "ACI-P018-L004-8B274196BE": "general-prerequisites-only",
  "ACI-P018-L005-C65BAEE067": "later-lesson-specific-owners-required",
});

const SECTION_1_4_OBSERVATIONS = Object.freeze({
  "ACI-P021-L022-48DF3CF175": "language-primary-communication-function",
  "ACI-P021-L023-D2A999EFE0": "communication-participant-information-medium-model",
  "ACI-P021-L026-83890507C7": "shared-rules-mediate-communication",
  "ACI-P021-L031-48288E27B5": "carrier-content-coupling",
  "ACI-P021-L032-B7BE6A6831": "duality-or-double-articulation",
  "ACI-P021-L032-B7BE6A6831-02": "carrier-system-classification",
  "ACI-P021-L032-B7BE6A6831-03": "content-system-classification",
  "ACI-P021-L034-F8B1A86183": "phonological-and-sigological-subsystems",
  "ACI-P021-L035-58BD4DB24C": "graphological-system-derived-from-phonology",
});

const SECTION_1_5_OBSERVATIONS = Object.freeze({
  "ACI-P021-L038-3E740B3DBE": "type-level-classification",
  "ACI-P021-L038-3E740B3DBE-02": "token-level-classification",
  "ACI-P021-L038-3E740B3DBE-03": "instance-level-classification",
  "ACI-P021-L040-983AAB2A55": "type-abstract-generalization",
  "ACI-P021-L041-3DE74E00D8": "type-hypothetical-class",
  "ACI-P021-L041-561E318901": "type-eme-label",
  "ACI-P022-L005-407C63958B": "type-slash-notation-check",
  "ACI-P022-L006-BD4AFF6146": "type-representation-selected-by-analyst",
  "ACI-P022-L006-BD4AFF6146-02": "type-representation-explanatory-power",
  "ACI-P022-L006-BD4AFF6146-03": "type-representation-not-frequency",
  "ACI-P022-L009-A44A947808": "token-particularizes-type",
  "ACI-P022-L010-25FF0A0188": "token-represents-and-conforms-to-type",
  "ACI-P022-L010-25FF0A0188-02": "token-may-add-conditioned-variation",
  "ACI-P022-L012-713101D2EB": "token-square-bracket-notation",
  "ACI-P022-L012-713101D2EB-02": "token-square-bracket-notation-check",
  "ACI-P022-L014-088E4694F0": "instance-concrete-one-time-realization",
  "ACI-P022-L015-E4F6215A17": "instance-manifests-token",
  "ACI-P022-L015-A856A07B70": "instance-quotation-notation",
  "ACI-P022-L017-F38C10C17F": "type-limited-token-repertory",
  "ACI-P022-L017-F38C10C17F-02": "token-unbounded-instance-repertory",
  "ACI-P022-L019-91A226D6C8": "type-and-token-mental-constructs",
  "ACI-P022-L019-5C0BC3260E": "type-distills-token-variation",
  "ACI-P022-L019-5C0BC3260E-02": "token-distills-instance-details",
  "ACI-P022-L019-5C0BC3260E-03": "abstraction-from-experienced-contrasts",
  "ACI-P022-L022-29DB1DDE8D": "token-distills-irrelevant-instance-details",
});

const JOB_TYPES = Object.freeze({
  grammar: "BUILD_GRAMMAR",
  model: "BUILD_CODE_MODEL",
  check: "CHECK_GRAMMAR",
  protect: "PROTECT_GRAMMAR",
});

const SECTION_FAMILIES = Object.freeze({
  "1.1": "lesson1-foundation-dependency-model",
  "1.2": "language-specific-grammar-boundary",
  "1.3": "terminology-and-transfer-boundary",
  "1.4": "linguistic-communication-source-model",
  "1.5": "analysis-level-model",
  "1.6": "carrier-content-element-model",
  "1.7": "morpheme-model",
  "1.8": "token-realization-model",
  "1.9": "instance-and-silent-contrast-model",
  "1.10": "level-element-matrix-model",
  "1.11": "structural-rank-and-composition-model",
  "1.12": "governance-and-participant-model",
  "1.13": "translation-and-lexical-provenance-boundary",
});

const GRAMMAR_PROJECT_ROLES = new Set([
  "applicability-or-constraint",
  "canonical-rule-or-alternation",
  "derived-realization",
  "result-projection",
  "source-structure-schema",
]);

const MODEL_REQUIREMENTS = Object.freeze({
  "lesson1-foundation-dependency-model":
    "The project must remain open to later lesson-specific concepts and must never treat the preliminary lesson as the complete grammar",
  "terminology-and-transfer-boundary":
    "The grammar model must use the correct Classical Nahuatl term, definition, or category boundary",
  "linguistic-communication-source-model":
    "The typed source model must keep participants, information, medium, content, and shared rules distinct",
  "analysis-level-model":
    "The code must preserve the difference and direction between type, token, and actual instance",
  "carrier-content-element-model":
    "The code must classify carrier and content elements without confusing sound, writing, silence, or meaning",
  "morpheme-model":
    "The code must model a morpheme as the required carrier-content relationship rather than as a bare string",
  "token-realization-model":
    "The code must preserve the relationship between a type-level element and its regular or irregular token realizations",
  "instance-and-silent-contrast-model":
    "The code must separate actual realizations from abstract units and require contrast before accepting silent structure",
  "level-element-matrix-model":
    "The code must keep every listed element in its correct type, token, or instance level",
  "structural-rank-and-composition-model":
    "The code must preserve unit composition, rank order, recursion, stem boundaries, derivation, and inflection",
  "governance-and-participant-model":
    "The code must keep grammatical functions, form classes, lexical items, and participant roles distinct",
  "translation-and-lexical-provenance-boundary":
    "The code must preserve the stated lexical or interpretive knowledge without letting an English gloss replace Nahuatl structure",
});

const PROTECTION_REQUIREMENTS = Object.freeze({
  "language-specific-grammar-boundary":
    "The application must keep Classical Nahuatl grammar independent from habits, categories, and rules transferred from another language",
  "terminology-and-transfer-boundary":
    "The application must prevent English, Spanish, translation, examples, and inherited labels from deciding Classical Nahuatl grammar",
  "translation-and-lexical-provenance-boundary":
    "The application must preserve this interpretive or source context while preventing translations, glosses, dictionaries, and personal readings from authorizing grammar",
});

function majorSection(section = "") {
  const match = String(section).match(/^§(1\.\d+)/u);
  return match ? match[1] : "";
}

function isCrossReference(meaning = "") {
  return /\b(?:see|section|lesson|§)\b/iu.test(String(meaning));
}

function section13ObservationKind(atom) {
  const meaning = String(atom.meaning || "");
  if (isCrossReference(meaning)) return "later-owner-dependency-retained";
  if (/\bvocable\b/iu.test(meaning)) return "vocable-is-carrier-unit";
  if (
    /nuclear clause(?:s)? as words|word.+only for particles|word.+sentence fragment|never.+nuclear clauses/iu
      .test(meaning)
  ) {
    return "nuclear-clause-not-word";
  }
  if (/\btransitive\b/iu.test(meaning)) {
    return "english-transitivity-rejected";
  }
  if (
    atom.atomId === "ACI-P020-L034-625DF32CBE"
    || /nounword|verbword|adjectiveword|adverbword/iu.test(meaning)
  ) {
    return "form-class-word-conflation-rejected";
  }
  if (/auxiliary verb|modal auxiliary|preposition|postposition/iu.test(meaning)) {
    return "foreign-category-rejected";
  }
  if (/^§1\.3\.4/u.test(atom.canvasSection)) {
    return "classical-structural-terms-retained";
  }
  if (atom.force === "evidence") {
    return "foreign-example-checks-without-authority";
  }
  return "translation-and-foreign-template-rejected";
}

function section13TargetOwner(observationKind) {
  if (observationKind === "vocable-is-carrier-unit") {
    return "classical-concept-classification";
  }
  if (observationKind === "nuclear-clause-not-word") {
    return "classical-nuclear-clause-structure";
  }
  return "classical-terminology-authority";
}

function section13JobType(atom, observationKind) {
  if (atom.force === "evidence") return JOB_TYPES.check;
  if (observationKind === "translation-and-foreign-template-rejected") {
    return JOB_TYPES.protect;
  }
  if (observationKind === "foreign-example-checks-without-authority") {
    return JOB_TYPES.check;
  }
  if (/^§1\.3\.4/u.test(atom.canvasSection)) {
    return atom.force === "analysis" ? JOB_TYPES.protect : JOB_TYPES.model;
  }
  return JOB_TYPES.model;
}

function section16ObservationKind(atom) {
  const meaning = String(atom.meaning || "");
  if (atom.force === "evidence") return "foreign-phoneme-example-check";
  if (/Section 2\.[23] is cited/iu.test(meaning)) return "later-nahuatl-phoneme-owner";
  if (/English|Hindi|for example/iu.test(meaning)) return "foreign-phoneme-example-check";
  if (/cannot be analyzed into smaller linear/iu.test(meaning)) return "element-basic-linear-unit";
  if (/bundle.+simultaneously present features/iu.test(meaning)) return "element-feature-bundle";
  if (/four kinds of basic type-level/iu.test(meaning)) return "four-type-element-kinds";
  if (/first three belong to the carrier/iu.test(meaning)) return "carrier-element-partition";
  if (/fourth belongs to the content/iu.test(meaning)) return "content-element-partition";
  if (/Greek roots/iu.test(meaning)) return "element-greek-root-terminology";
  if (/members of a language's phonological/iu.test(meaning)) return "phoneme-phonological-membership";
  if (/devoid of meaning.+distinguish meanings/iu.test(meaning)) return "phoneme-meaning-distinguishing";
  if (/physical makeup|muscular/iu.test(meaning)) return "phoneme-distinctive-feature-organization";
  if (/enculturated|particular selection and interaction/iu.test(meaning)) return "phoneme-language-specific-identity";
  if (/phonemic inventory.+particular/iu.test(meaning)) return "phoneme-inventory-language-specific";
  if (/single alphabetic letter|one sound, one symbol/iu.test(meaning)) return "phoneme-one-symbol";
  if (/special symbols may be required/iu.test(meaning)) return "phoneme-special-symbols";
  if (/members of a language's graphological/iu.test(meaning)) return "grapheme-graphological-membership";
  if (/visual representation/iu.test(meaning)) return "grapheme-visual-representation";
  if (/set of identically valued/iu.test(meaning)) return "grapheme-identically-valued-set";
  if (/entire range of possible shapes/iu.test(meaning)) return "grapheme-shape-variation";
  if (/one-to-one correspondence|two-to-one correspondence/iu.test(meaning)) return "grapheme-phoneme-correspondence";
  if (/term phonological system rather than carrier/iu.test(meaning)) return "carrier-system-wider-than-phonology";
  if (/phonemes are the only elements serving as carriers/iu.test(meaning)) return "phoneme-only-carrier-assumption-rejected";
  if (/wider term.+carrier system|meaning is carried/iu.test(meaning)) return "sigeme-is-meaning-carrier";
  if (/only one sigeme/iu.test(meaning)) return "sigeme-single-member-inventory";
  if (/single-membered set of meaning-bearing silence/iu.test(meaning)) return "sigeme-meaning-bearing-silence";
  if (/represented by \/Ø\/|oval zero/iu.test(meaning)) return "sigeme-oval-zero-notation";
  if (/slash in \/Ø\//iu.test(meaning)) return "sigeme-slash-distinction";
  if (/only kind of content element/iu.test(meaning)) return "sememe-only-content-element";
  if (/set of meaningfulness/iu.test(meaning)) return "sememe-meaningfulness-set";
  if (/semantic component.+goes beyond/iu.test(meaning)) return "semantic-component-beyond-content-system";
  return "";
}

const SECTION_1_7_OBSERVATIONS = Object.freeze({
  "ACI-P024-L006-EB311DD196": "morpheme-type-and-name",
  "ACI-P024-L007-9F38DD7282": "morpheme-carrier-content-amalgam",
  "ACI-P024-L009-E2B0DA0F5F": "morpheme-formation-parts",
  "ACI-P024-L011-8D1F006496": "morpheme-center-of-duality",
  "ACI-P024-L011-8D1F006496-02": "morpheme-smallest-duality-unit",
  "ACI-P024-L011-8D1F006496-03": "morpheme-duality-section-link",
  "ACI-P024-L012-E4BCEAC1D6": "morpheme-grapheme-exclusion",
  "ACI-P024-L016-0EB898B984": "morpheme-symbiotic-notation",
  "ACI-P024-L016-FC75A2AB0D": "morpheme-fraction-notation-possibility",
  "ACI-P024-L016-FC75A2AB0D-02": "morpheme-economical-lesson-notation",
  "ACI-P024-L019-17DD742EB0": "morpheme-carrier-shorthand",
  "ACI-P024-L020-77C274CB6A": "morpheme-carrier-nonconflation",
  "ACI-P024-L023-6BF471C3F2": "portmanteau-content-cluster",
  "ACI-P024-L023-442014574B": "portmanteau-indivisible-content-cluster",
  "ACI-P024-L027-D0F34C748F": "morpheme-elements-exist-through-cooperation",
  "ACI-P024-L028-D9C8567B28": "carrier-system-exists-through-morphemes",
  "ACI-P024-L028-D9C8567B28-02": "content-system-exists-through-morphemes",
  "ACI-P024-L028-D9C8567B28-03": "systems-cooperate-to-form-morphemes",
  "ACI-P024-L031-AA30EF2A71": "three-morpheme-kinds",
  "ACI-P024-L032-692BC9BC17": "connective-sound-without-sememe",
  "ACI-P024-L032-692BC9BC17-02": "connective-english-example-check",
  "ACI-P024-L033-F69986D35B": "connective-grammatical-not-sememic-meaning",
  "ACI-P024-L035-4E27B2EC8D": "ordinary-sound-plus-meaning",
  "ACI-P024-L035-A253CAAFEA": "ordinary-english-pits-example-check",
  "ACI-P024-L038-CED398A575": "silent-no-sound-plus-meaning",
  "ACI-P024-L039-A742608EF4": "silent-english-pit-two-morpheme-check",
  "ACI-P024-L039-A742608EF4-02": "silent-english-pit-ordinary-check",
  "ACI-P024-L039-A742608EF4-03": "silent-english-singular-zero-check",
  "ACI-P025-L002-246CC44700": "silent-linguistic-economy",
  "ACI-P025-L002-B46A78D758": "silent-default-redundancy",
  "ACI-P025-L006-DD46CD2214": "silent-english-plural-sounded-check",
  "ACI-P025-L006-DD46CD2214-02": "silent-english-present-default-check",
  "ACI-P025-L006-DD46CD2214-03": "silent-english-past-sounded-check",
  "ACI-P025-L008-73FE3E0161": "silent-english-lean-contrast-check",
});

const SECTION_1_8_OBSERVATIONS = Object.freeze({
  "ACI-P025-L009-7C85D92774": "token-four-kind-inventory",
  "ACI-P025-L010-6FE90D230A": "token-four-kind-names",
  "ACI-P025-L010-6913BDD4F0": "token-morph-represents-morpheme",
  "ACI-P025-L013-D86D42970D": "phone-token-noncontrastive-definition",
  "ACI-P025-L014-BA34EC5AAC": "phone-english-t-realization-check",
  "ACI-P025-L014-BA34EC5AAC-02": "phone-exclusive-environment-check",
  "ACI-P025-L014-BA34EC5AAC-03": "phone-post-s-environment-check",
  "ACI-P025-L017-7F505766AE": "phone-single-member-repertory",
  "ACI-P025-L018-CBEA0C32E5": "phone-multiple-member-repertory",
  "ACI-P025-L021-DF42A7FD1E": "phone-regular-definition",
  "ACI-P025-L021-DF42A7FD1E-02": "phone-spanish-regular-example-check",
  "ACI-P025-L023-DC972EE0B6": "phone-irregular-definition",
  "ACI-P025-L023-F2F08D9885": "phone-spanish-z-irregular-check",
  "ACI-P025-L023-F2F08D9885-02": "phone-spanish-mizmo-check",
  "ACI-P025-L023-F2F08D9885-03": "phone-added-voice-check",
  "ACI-P025-L025-7F845F243B": "phone-distant-irregular-definition",
  "ACI-P025-L025-D93A8B370D": "phone-cross-phoneme-identity",
  "ACI-P025-L029-B44E4F4DFD": "phone-nahuatl-repertory-foundation",
  "ACI-P025-L029-13E4A2210F": "phone-lesson2-owner-link",
  "ACI-P025-L032-D94B8184A3": "phone-symbol-specificity",
  "ACI-P025-L034-CD7F522B74": "graph-token-definition",
  "ACI-P025-L034-8F1A289913": "graph-typographic-variation",
  "ACI-P025-L037-71B57177AC": "sig-regular-exists",
  "ACI-P025-L037-71B57177AC-02": "sig-regular-definition",
  "ACI-P025-L037-5D87EC0010": "sig-regular-zero-notation",
  "ACI-P025-L037-5D87EC0010-02": "sigeme-single-token-member",
  "ACI-P025-L038-A7DF113DAB": "sig-irregular-exists",
  "ACI-P025-L039-D796BF4184": "sig-irregular-phoneme-unit",
  "ACI-P025-L040-7EB970CB7A": "sig-irregular-square-zero",
  "ACI-P025-L041-A62D79E925": "seme-token-definition",
  "ACI-P026-L002-51DF5FD7F0": "morph-token-definition",
  "ACI-P026-L002-B7D69FA11C": "morph-regular-irregular-alternative",
  "ACI-P026-L002-B7D69FA11C-02": "morph-meaning-carrier-variation",
  "ACI-P026-L004-8066DAB08F": "morph-notation-follows-morpheme",
  "ACI-P026-L005-633552FA43": "morph-square-bracket-notation",
  "ACI-P026-L006-6B1BAA8392": "morph-english-plural-morpheme-check",
  "ACI-P026-L006-6B1BAA8392-02": "morph-english-plural-content-check",
  "ACI-P026-L007-C09E75D37E": "morph-english-s-check",
  "ACI-P026-L007-C09E75D37E-02": "morph-english-z-check",
  "ACI-P026-L007-C09E75D37E-03": "morph-english-iz-check",
  "ACI-P026-L007-C09E75D37E-04": "morph-english-en-check",
  "ACI-P026-L007-C09E75D37E-05": "morph-english-zero-plural-check",
  "ACI-P026-L007-C09E75D37E-06": "morph-zero-shape-distinct-content-check",
  "ACI-P026-L012-3EB5DA4A5F": "morph-borrowing-analysis-check",
  "ACI-P026-L012-3EB5DA4A5F-02": "morph-data-borrowing-check",
  "ACI-P026-L012-3EB5DA4A5F-03": "morph-seraphim-borrowing-check",
  "ACI-P026-L012-3EB5DA4A5F-04": "morph-amoebae-borrowing-check",
  "ACI-P026-L014-5590222FBC": "morph-phonological-conditioning",
  "ACI-P026-L014-5590222FBC-02": "morph-morphological-conditioning",
});

const SECTION_1_9_OBSERVATIONS = Object.freeze({
  "ACI-P026-L017-F2E410902C": "instance-sound-letter-meaning-manifestations",
  "ACI-P026-L018-26B5D240FE": "form-instance-realizes-morph",
  "ACI-P026-L019-1479F419BE": "instance-variability-boundary",
  "ACI-P026-L019-1479F419BE-02": "phone-instance-variation-check",
  "ACI-P026-L021-9A604EA482": "instances-witness-abstract-levels",
  "ACI-P026-L021-9A604EA482-02": "abstract-level-inference",
  "ACI-P026-L021-9A604EA482-03": "performance-variability-abstraction",
  "ACI-P026-L025-EB718C0962": "silence-excluded-from-instance-elements",
  "ACI-P026-L026-CE060CE499": "sig-no-instance-presence",
  "ACI-P026-L027-64B0BB5E53": "sig-presence-implicit",
  "ACI-P026-L027-BBA1F3CFEF": "occurrence-silence-perception",
  "ACI-P026-L027-BBA1F3CFEF-02": "occurrence-silence-audible",
  "ACI-P026-L027-BBA1F3CFEF-03": "audible-silence-not-grammatical-sig",
  "ACI-P026-L030-609F44BD32": "sound-obscures-morph-structure",
  "ACI-P026-L030-AC7B388C3F": "sounded-morph-recognition-difficulty",
  "ACI-P026-L033-87859D8934": "sigeme-content-recognition-difficulty",
  "ACI-P026-L035-E6075BAF89": "silent-morpheme-requires-sounded-contrast",
  "ACI-P026-L035-BB04FE1D12": "silent-morph-requires-sounded-contrast",
});

const SECTION_1_10_OBSERVATIONS = Object.freeze({
  "ACI-P026-L040-1FEA5C6151": "level-summary-chart-dependency",
  "ACI-P026-L040-1FEA5C6151-02": "sound-instance-level",
  "ACI-P026-L040-1FEA5C6151-03": "letter-instance-level",
  "ACI-P026-L040-1FEA5C6151-04": "meaning-instance-level",
  "ACI-P026-L040-1FEA5C6151-05": "form-instance-level",
  "ACI-P026-L040-1FEA5C6151-06": "phone-token-level",
  "ACI-P026-L040-1FEA5C6151-07": "graph-token-level",
  "ACI-P026-L040-1FEA5C6151-08": "sig-token-level",
  "ACI-P026-L040-1FEA5C6151-09": "seme-token-level",
  "ACI-P026-L040-1FEA5C6151-10": "morph-token-level",
  "ACI-P026-L040-1FEA5C6151-11": "phoneme-type-level",
  "ACI-P026-L040-1FEA5C6151-12": "grapheme-type-level",
  "ACI-P026-L040-1FEA5C6151-13": "sigeme-type-level",
  "ACI-P026-L040-1FEA5C6151-14": "sememe-type-level",
  "ACI-P026-L040-1FEA5C6151-15": "morpheme-type-level",
});

const SECTION_1_11_GENERAL_OBSERVATIONS = Object.freeze({
  "ACI-P027-L005-FCA7823D2B": "elements-form-linear-sequences",
  "ACI-P027-L005-FCA7823D2B-02": "speech-sequences-temporal",
  "ACI-P027-L005-FCA7823D2B-03": "writing-sequences-spatial",
  "ACI-P027-L006-3F63976A21": "valid-sequence-requires-structure",
  "ACI-P027-L007-F8C79B445B": "one-plus-one-yields-one-unit",
  "ACI-P027-L008-6551E0E9EF": "constituents-enter-and-result-as-units",
  "ACI-P027-L011-64FFC88B6B": "cohesion-allows-nonjuxtaposed-constituents",
  "ACI-P027-L012-48D6B92F6E": "latin-discontinuity-translation-check",
  "ACI-P027-L012-48D6B92F6E-02": "latin-discontinuity-gloss-check",
  "ACI-P027-L012-48D6B92F6E-03": "latin-discontinuity-topology-check",
  "ACI-P027-L014-8A719E5B2E": "latin-stylistic-discontinuity-check",
  "ACI-P027-L014-8A719E5B2E-02": "obligatory-discontinuity-admissible",
  "ACI-P027-L014-8A719E5B2E-03": "section-4.4-discontinuity-owner-link",
  "ACI-P027-L017-19C6CC8854": "set-single-member-possible",
  "ACI-P027-L017-19C6CC8854-02": "set-multiple-members-possible",
  "ACI-P027-L017-19C6CC8854-03": "structure-single-constituent-possible",
  "ACI-P027-L017-19C6CC8854-04": "structure-multiple-constituents-possible",
  "ACI-P027-L017-19C6CC8854-05": "structure-normally-multiple-constituents",
  "ACI-P027-L021-C27464F985": "composition-recursive-reapplication",
  "ACI-P027-L021-C181614236": "lower-to-higher-hierarchy-potential",
  "ACI-P027-L025-D95C17714B": "meaningless-meaningful-hierarchy-partition",
});

const SECTION_1_11_1_OBSERVATIONS = Object.freeze({
  "ACI-P027-L027-F1AE271BAC": "meaningless-unit-member-inventory",
  "ACI-P027-L028-8C453A112C": "sememe-and-sigeme-excluded",
  "ACI-P027-L029-11BC838CA2": "carrier-rank-taxonomy",
  "ACI-P028-L004-336CF18BAB": "lower-rank-normally-builds-higher-rank",
  "ACI-P028-L004-336CF18BAB-02": "single-unit-rank-upgrade",
  "ACI-P028-L004-336CF18BAB-03": "vowel-unit-can-form-syllable",
  "ACI-P028-L004-336CF18BAB-04": "syllable-unit-can-form-vocable",
  "ACI-P028-L007-AF1513ED05": "classical-syllable-vowel-center",
  "ACI-P028-L007-AF1513ED05-02": "english-syllabic-consonant-boundary",
  "ACI-P028-L008-971DAE6FDD": "classical-syllable-consonant-margins",
  "ACI-P028-L009-C219AF8581": "syllable-rules-language-specific",
  "ACI-P028-L010-7DA7C5FBDF": "syllable-is-meaningless-unit",
  "ACI-P028-L011-7B70C8EFD3": "vocable-is-meaningless-syllable-unit",
  "ACI-P028-L013-74B969B74F": "english-syllable-example-provenance",
  "ACI-P028-L013-74B969B74F-02": "english-example-concatenation",
  "ACI-P028-L013-74B969B74F-03": "english-example-vocable-analysis",
  "ACI-P028-L013-74B969B74F-04": "english-example-pedagogical-judgment",
  "ACI-P028-L013-74B969B74F-05": "english-example-non-authorizing",
  "ACI-P028-L015-44A676B55A": "word-syllable-view-is-vocable",
  "ACI-P028-L016-238751CF7B": "monosyllable-can-be-vocable",
  "ACI-P028-L017-BAE08C6C65": "polysyllabic-vocable-stress",
  "ACI-P028-L019-07B63C439F": "phonotactics-controls-vocable-structure",
  "ACI-P028-L022-62813AA00D": "carrier-constraints-govern-meaningful-surface",
});

const SECTION_1_11_2_AFFIX_OBSERVATIONS = Object.freeze({
  "ACI-P028-L024-B18B2D0C1E": "meaningful-unit-member-inventory",
  "ACI-P028-L025-700C2B77A6": "morpheme-syllable-rank-separation-result",
  "ACI-P028-L025-E97C8332F3": "morpheme-syllable-structural-contrast",
  "ACI-P028-L030-18197B4561": "morpheme-syllable-coterminality",
  "ACI-P028-L034-49967A83F1": "major-minor-morpheme-inventory",
  "ACI-P028-L036-5C05A44C92": "major-morpheme-representational-center",
  "ACI-P028-L038-F17CDA45C3": "prefix-infix-suffix-inventory",
  "ACI-P028-L038-A263EDE447": "minor-morpheme-affixal-status",
  "ACI-P028-L039-B1A9A86C23": "affix-position-mapping",
  "ACI-P028-L040-FF51E7CE49": "derivational-inflectional-inventory",
  "ACI-P028-L040-3CAC6D3B77": "functional-types-never-confused",
  "ACI-P029-L002-E904B97985": "derivational-information-role",
  "ACI-P029-L004-979657F99C": "derivational-inside-stem-boundary",
  "ACI-P029-L006-F81C4A6A20": "inflectional-syntactical-role",
  "ACI-P029-L006-E42428D8FA": "inflectional-outside-stem-boundary",
  "ACI-P029-L008-9EF4C5B1F2": "inflectional-paradigm-definition",
  "ACI-P029-L011-E857079A2C": "nahuatl-paradigmatic-unit-is-nuclear-clause",
  "ACI-P029-L013-C77A2EA6DE": "inseparable-inflectional-dyad-definition",
  "ACI-P029-L015-735E05A0A6": "dyad-structural-role",
  "ACI-P029-L015-735E05A0A6-02": "section-4.5-dyad-reference",
  "ACI-P029-L016-682536CD59": "inflectional-affix-stem-internal-demotion",
});

const SECTION_1_11_2_HIERARCHY_OBSERVATIONS = Object.freeze({
  "ACI-P029-L019-9DA394C7C5": "meaningful-hierarchy-intake",
  "ACI-P029-L020-380B4F2DEC": "english-spanish-hierarchy-provenance",
  "ACI-P029-L020-380B4F2DEC-02": "nahuatl-hierarchy-provenance",
  "ACI-P029-L020-380B4F2DEC-03": "hierarchy-comparison-purpose",
  "ACI-P029-L021-5DB865513A": "ascending-ranks-grouped-into-stages",
  "ACI-P029-L023-57336AEF67": "higher-rank-requires-lower-stage",
  "ACI-P029-L026-C658EB5AA0": "english-spanish-hierarchy-schema",
  "ACI-P030-L004-D47685394D": "normal-source-and-explicit-upgrade",
  "ACI-P030-L006-518758C8D7": "explicit-higher-to-lower-rank-downgrade",
  "ACI-P030-L006-518758C8D7-02": "nahuatl-nuclear-clause-to-stem-downgrade",
  "ACI-P030-L009-7EF7DE26A3": "root-single-major-morpheme-definition",
});

const SECTION_1_11_2_STEM_OBSERVATIONS = Object.freeze({
  "ACI-P030-L010-AE56B41932": "english-spanish-root-alone-stem-check",
  "ACI-P030-L010-AE56B41932-02": "duck-root-alone-evidence-check",
  "ACI-P030-L010-AE56B41932-03": "friend-root-alone-evidence-check",
  "ACI-P030-L010-AE56B41932-04": "english-spanish-derived-stem-check",
  "ACI-P030-L010-AE56B41932-05": "duck-ling-derived-stem-check",
  "ACI-P030-L010-AE56B41932-06": "friend-ly-derived-stem-check",
  "ACI-P030-L010-AE56B41932-07": "un-friend-ly-derived-stem-check",
  "ACI-P030-L010-AE56B41932-08": "un-friend-li-ness-derived-stem-check",
  "ACI-P030-L011-9FE9D0F679": "nahuatl-root-alone-stem-formation",
  "ACI-P030-L011-9FE9D0F679-02": "nahuatl-root-plus-derivational-affix-stem-formation",
  "ACI-P030-L011-9FE9D0F679-03": "nahuatl-stem-plus-derivational-affix-stem-formation",
  "ACI-P030-L013-583BB05A04": "nahuatl-stock-mediated-stem-formation",
  "ACI-P030-L015-A02A98BF92": "nahuatl-compound-stem-formation",
  "ACI-P030-L017-C89E1B0A51": "stem-lexeme-meaning-component",
  "ACI-P030-L019-3D05203D00": "stem-lexical-item-status",
  "ACI-P030-L020-7F80CAE091": "root-sememe-to-lexeme-upgrade",
  "ACI-P030-L021-208D380F00": "idiom-lexeme-meaning-component",
});

const SECTION_1_11_2_TRANSITION_OBSERVATIONS = Object.freeze({
  "ACI-P030-L023-78EB624A91": "stem-next-rank-dividing-line",
  "ACI-P030-L024-3A51157B24": "nahuatl-transition-distance-comparison",
  "ACI-P030-L025-3E94E1F3BC": "stem-rank-derivation-upper-bound",
  "ACI-P030-L026-A9D90195E5": "post-stem-inflection-domain-onset",
  "ACI-P030-L028-DCA488A819": "english-spanish-post-stem-word-rank",
  "ACI-P030-L029-E82E8935D5": "word-rank-sentence-fragment",
  "ACI-P030-L029-F880F38CDB": "simple-word-sentence-exception",
  "ACI-P030-L030-011B524FE8": "here-word-sentence-check",
  "ACI-P030-L030-99F445C3CC": "now-word-sentence-check",
  "ACI-P030-L030-50B3891D7A": "ouch-word-sentence-check",
  "ACI-P030-L030-9F60B26651": "one-word-sentence-exception-check",
  "ACI-P030-L030-9F60B26651-02": "unspoken-word-implication-check",
  "ACI-P030-L030-9F60B26651-03": "hush-fuller-structure-check",
  "ACI-P030-L030-9F60B26651-04": "now-fuller-structure-check",
  "ACI-P030-L030-9F60B26651-05": "here-fuller-structure-check",
  "ACI-P030-L031-85B88C9F15": "do-it-now-evidence-check",
  "ACI-P030-L031-3B09167131": "put-it-here-evidence-check",
  "ACI-P030-L032-012B1547F4": "english-spanish-paradigmatic-word-analysis",
  "ACI-P030-L032-012B1547F4-02": "english-paradigm-examples-check",
  "ACI-P030-L032-012B1547F4-03": "english-spanish-nonparadigmatic-word-analysis",
  "ACI-P030-L032-012B1547F4-04": "english-nonparadigmatic-examples-check",
  "ACI-P030-L032-012B1547F4-05": "english-comparison-derivational-analysis",
  "ACI-P030-L032-012B1547F4-06": "german-adjective-paradigm-check",
  "ACI-P030-L038-50324DE696": "nonparadigmatic-stem-word-coextensiveness",
  "ACI-P030-L038-50324DE696-02": "nonparadigmatic-word-rank-path",
  "ACI-P030-L038-ED53E96257": "nonparadigmatic-word-condition",
  "ACI-P030-L042-C122DB3208": "nahuatl-post-stem-difference",
  "ACI-P030-L042-1CBA7936F0": "nahuatl-invariant-particle-exception",
  "ACI-P031-L002-6E5362A211": "nahuatl-nuclear-clause-default",
  "ACI-P031-L002-0267836EF6": "lesson-4-nuclear-clause-reference",
  "ACI-P031-L003-DE4CB4E50F": "nuclear-clause-subject-predicate-morphosyntax",
  "ACI-P031-L005-B82FE09E9D": "english-spanish-inflectional-morphology-domain",
});

const SECTION_1_11_2_GROUP_SYNTAX_OBSERVATIONS = Object.freeze({
  "ACI-P031-L007-56E0C6ADEF": "english-spanish-word-group-syntax-onset",
  "ACI-P031-L008-4D20CF03F5": "english-spanish-word-group-definition",
  "ACI-P031-L008-4D20CF03F5-02": "on-the-table-word-group-check",
  "ACI-P031-L008-4D20CF03F5-03": "the-table-object-of-on-check",
  "ACI-P031-L008-4D20CF03F5-04": "english-spanish-clause-group-definition",
  "ACI-P031-L008-4D20CF03F5-05": "before-I-left-clause-group-check",
  "ACI-P031-L008-4D20CF03F5-06": "I-left-object-of-before-check",
  "ACI-P031-L013-C77F349CD4": "nahuatl-group-rank-syntax-onset",
  "ACI-P031-L014-D364C15A04": "nahuatl-group-three-valid-compositions",
  "ACI-P031-L014-944BF6A0F4": "nahuatl-group-shape-documentary-links",
});

const SECTION_1_12_OPENING_OBSERVATIONS = Object.freeze({
  "ACI-P031-L018-805D8A996A": "shared-static-dynamic-facets",
  "ACI-P031-L018-805D8A996A-02": "static-structure-facet",
  "ACI-P031-L018-805D8A996A-03": "dynamic-structure-facet",
  "ACI-P031-L021-F146630E6E": "cooperating-structuring-principles",
  "ACI-P031-L024-D4D08940CA": "additive-concatenation-execution",
  "ACI-P031-L026-388B1CEA5B": "concatenation-one-plus-one-closure",
  "ACI-P031-L026-3E260F7B01": "english-concatenation-introduction",
  "ACI-P031-L027-D6810B1325": "english-noun-noun-group-check",
  "ACI-P031-L028-8889801E87": "english-adjective-group-check",
  "ACI-P031-L029-7A0947340E": "english-expanded-nominal-group-check",
  "ACI-P031-L030-7E3D3D542F": "english-of-preposition-check",
  "ACI-P031-L030-7E3D3D542F-02": "english-nominal-group-check",
  "ACI-P031-L030-7E3D3D542F-03": "english-prepositional-group-analysis",
  "ACI-P031-L030-7E3D3D542F-04": "english-prepositional-result-check",
  "ACI-P031-L030-7E3D3D542F-05": "english-order-non-authority-boundary",
});

const SECTION_1_12_GOVERNANCE_TAXONOMY_OBSERVATIONS = Object.freeze({
  "ACI-P031-L032-D462261F8C": "interaction-justifies-concatenated-unity",
  "ACI-P031-L034-2F173D09B7": "adjunctive-conjunctive-governance-types",
  "ACI-P031-L036-0670EA8C38": "function-unit-coupled-governance-subtypes",
});

const SECTION_1_12_ADJUNCTIVE_OBSERVATIONS = Object.freeze({
  "ACI-P031-L039-9FC956C905": "asymmetric-adjunctive-governance",
  "ACI-P031-L040-71DF516169": "predicate-governs-subject",
  "ACI-P031-L040-71DF516169-02": "he-laughed-sentence-check",
  "ACI-P031-L040-71DF516169-03": "laughed-predicate-check",
  "ACI-P032-L002-AB704A3F74": "predicate-formation-varieties",
  "ACI-P032-L002-AB704A3F74-02": "copulative-predicate-schema",
  "ACI-P032-L002-AB704A3F74-03": "is-Mary-copulative-check",
  "ACI-P032-L002-AB704A3F74-04": "intransitive-predicate-schema",
  "ACI-P032-L002-AB704A3F74-05": "laughed-intransitive-check",
  "ACI-P032-L002-AB704A3F74-06": "transitive-predicate-schema",
  "ACI-P032-L002-AB704A3F74-07": "makes-arrow-transitive-check",
  "ACI-P032-L006-770695376E": "relator-terminus-structure",
  "ACI-P032-L006-770695376E-02": "relator-governs-terminus",
  "ACI-P032-L006-770695376E-03": "on-roof-relation-check",
  "ACI-P032-L006-770695376E-04": "on-relator-check",
  "ACI-P032-L006-770695376E-05": "roof-terminus-check",
  "ACI-P032-L007-80EBFD72B8": "head-governs-modifier",
  "ACI-P032-L008-42DDCD7D96": "function-unit-filler-admissibility",
  "ACI-P032-L010-E7709C9B3F": "language-specific-function-unit-selection",
  "ACI-P032-L010-E7709C9B3F-02": "language-specific-function-unit-order",
  "ACI-P032-L010-E7709C9B3F-03": "language-specific-function-unit-fillers",
  "ACI-P032-L011-D72EE631A2": "optional-adjunctor-introduction",
  "ACI-P032-L014-B344B2D4A8": "adjunctive-grammatical-devices",
  "ACI-P032-L015-0D6A8372E8": "agreement-adjunctive-device",
  "ACI-P032-L015-0D6A8372E8-02": "English-number-correspondence-check",
  "ACI-P032-L015-0D6A8372E8-03": "English-person-number-correspondence-check",
  "ACI-P032-L015-0D6A8372E8-04": "case-adjunctive-device",
  "ACI-P032-L015-0D6A8372E8-05": "English-agreement-case-non-authority",
  "ACI-P032-L016-0E2A598050": "case-device-restatement",
  "ACI-P032-L016-0E2A598050-02": "I-see-him-case-check",
  "ACI-P032-L016-0E2A598050-03": "I-see-him-participant-roles",
  "ACI-P032-L016-0E2A598050-04": "he-sees-me-case-check",
  "ACI-P032-L016-0E2A598050-05": "he-sees-me-participant-roles",
  "ACI-P032-L017-FA729991C5": "later-adjunction-references",
});

const SECTION_1_12_CONJUNCTIVE_OBSERVATIONS = Object.freeze({
  "ACI-P032-L019-124980D461": "equal-conjunctive-governance",
  "ACI-P032-L022-335D17DFDF": "conjunct-form-class-fillers",
  "ACI-P032-L025-54D00BE93F": "lesson-52-conjunction-reference",
});

const SECTION_1_12_PARTICIPANT_PLANE_OBSERVATIONS = Object.freeze({
  "ACI-P032-L026-ADA59A0620": "morphosyntactical-level-structure-distribution",
  "ACI-P032-L026-ADA59A0620-02": "syntactical-level-structure-distribution",
  "ACI-P032-L026-ADA59A0620-03": "morphological-and-syntactical-distribution",
  "ACI-P032-L029-7F658B71D1": "participant-event-relation-units",
  "ACI-P032-L030-55922DAECB": "participant-role-inventory",
  "ACI-P032-L031-AB8A8E2EEE": "Paul-agent-role-check",
  "ACI-P032-L033-DB783927D5": "patient-instrument-role-check",
  "ACI-P032-L035-8614AE1561": "four-conceptual-plane-inventory",
  "ACI-P032-L036-1DB4314953": "conceptual-plane-nonintermingling",
  "ACI-P032-L038-5CFADB0FE4": "English-fostered-confusion-check",
  "ACI-P032-L038-5CFADB0FE4-02": "poor-English-analysis-check",
  "ACI-P032-L038-5CFADB0FE4-03": "Spanish-Nahuatl-conflation-rejected",
  "ACI-P032-L038-5CFADB0FE4-04": "subject-predicate-not-verb-relation",
});

const SECTION_1_13_TRANSLATION_MIRAGE_OBSERVATIONS = Object.freeze({
  "ACI-P032-L041-7040FF94C3": "translation-direct-contact-illusion-blocked",
  "ACI-P032-L042-15726C4274": "translation-mirage-risk-retained",
  "ACI-P033-L002-4D51F4A555": "source-language-verification-required",
  "ACI-P033-L003-4BF4015CE3": "nahuatl-verification-required",
  "ACI-P033-L003-4BF4015CE3-02": "forced-swans-rendering-check",
  "ACI-P033-L006-BE4F0A58EC": "forced-misreading-check",
  "ACI-P033-L007-E77CBBC23D": "translator-tact-nonauthority",
  "ACI-P033-L007-E77CBBC23D-02": "interpretive-choice-boundary",
  "ACI-P033-L007-E77CBBC23D-03": "reader-verification-boundary",
  "ACI-P033-L010-66D17133B2": "translation-is-interpretation",
  "ACI-P033-L010-66D17133B2-02": "historical-time-conditioning",
  "ACI-P033-L010-66D17133B2-03": "social-cultural-conditioning",
  "ACI-P033-L010-66D17133B2-04": "personality-conditioning",
  "ACI-P033-L010-66D17133B2-05": "interpreter-language-structure-conditioning",
  "ACI-P033-L010-66D17133B2-06": "interpreter-language-mastery-conditioning",
  "ACI-P033-L010-66D17133B2-07": "source-language-knowledge-conditioning",
  "ACI-P033-L015-D2ABDEFA57": "alien-to-familiar-reinterpretation",
  "ACI-P033-L015-C59E77BD11": "foreign-system-reinterpretation",
  "ACI-P033-L017-4ED3EBFF2C": "mutual-translation-level-boundary",
  "ACI-P033-L017-4ED3EBFF2C-02": "analogue-not-identity",
  "ACI-P033-L017-4ED3EBFF2C-03": "target-perspective-bias",
  "ACI-P033-L020-ED59A3D7F9": "native-meaning-quality-loss",
});

const SECTION_1_13_ONICIHUAMIC_OBSERVATIONS = Object.freeze({
  "ACI-P033-L021-ADF1056ADD": "onicihuamic-canvas-witness-check",
  "ACI-P033-L021-ADF1056ADD-02": "onicihuamic-widower-meaning",
  "ACI-P033-L021-ADF1056ADD-03": "onicihuamic-first-singular-male-subject",
  "ACI-P033-L021-ADF1056ADD-04": "english-widower-analogue-nonauthority",
  "ACI-P033-L023-0B7415E491": "onicihuamic-literal-structure",
  "ACI-P033-L023-0B7415E491-02": "wife-form-paraphrase-nonauthority",
  "ACI-P033-L023-0B7415E491-03": "wife-regard-paraphrase-nonauthority",
  "ACI-P033-L023-0B7415E491-04": "wife-means-paraphrase-nonauthority",
  "ACI-P033-L023-0B7415E491-05": "wife-cause-paraphrase-nonauthority",
  "ACI-P033-L023-0B7415E491-06": "wife-relation-paraphrase-nonauthority",
  "ACI-P033-L023-0B7415E491-07": "paraphrases-nonexhaustive",
  "ACI-P033-L023-0B7415E491-08": "lesson-30-14-1-owner-dependency",
});

const SECTION_1_13_TRANSLATION_LOSS_OBSERVATIONS = Object.freeze({
  "ACI-P033-L027-B424119E0E": "english-widower-condition-paraphrase",
  "ACI-P033-L027-B424119E0E-02": "english-widower-cultural-expectation",
  "ACI-P033-L027-B424119E0E-03": "widower-lowest-common-denominator",
  "ACI-P033-L032-B9CC020337": "culturally-controlled-experience-loss",
  "ACI-P033-L034-B151411339": "source-nuance-replacement",
  "ACI-P033-L034-B151411339-02": "source-connotation-replacement",
  "ACI-P033-L034-B151411339-03": "source-implication-replacement",
  "ACI-P033-L034-B151411339-04": "source-supposition-replacement",
  "ACI-P033-L034-B151411339-05": "native-unsaid-meaning-knowledge",
  "ACI-P033-L034-B151411339-06": "native-unsaid-meaning-use",
  "ACI-P033-L034-B151411339-07": "translation-mirage-concealment",
  "ACI-P033-L037-38C616CDFE": "cultural-semantic-difference-concealment",
});

const SECTION_1_13_EXOTL_OBSERVATIONS = Object.freeze({
  "ACI-P033-L038-979B2933D1": "exotl-complete-nominal-clause-interpretation",
  "ACI-P033-L041-182265FE6B": "exotl-nahuatl-semantic-weighting-protected",
});

const SECTION_1_13_TARGET_LANGUAGE_DOMINANCE_OBSERVATIONS = Object.freeze({
  "ACI-P034-L002-5032BAB8D5": "language-specific-thinking-loss-protected",
  "ACI-P034-L002-5032BAB8D5-02": "foreignness-conversion-bias-protected",
  "ACI-P034-L002-5032BAB8D5-03": "target-language-dominance-protected",
  "ACI-P034-L004-D49A1980C3": "target-style-advice-nonauthority",
  "ACI-P034-L004-D49A1980C3-02": "target-reader-interest-nonauthority",
  "ACI-P034-L004-D49A1980C3-03": "target-reader-tailoring-nonauthority",
  "ACI-P034-L007-68901E5798": "source-meaning-aim-distinguished",
  "ACI-P034-L009-1B6FA866A8": "source-and-target-audiences-distinguished",
  "ACI-P034-L009-1B6FA866A8-02": "universal-equivalence-faith-rejected",
  "ACI-P034-L009-1B6FA866A8-03": "common-denominator-universality-bounded",
  "ACI-P034-L015-E7382DF2C2": "lived-meaning-detail-loss-protected",
  "ACI-P034-L016-D0A76465EC": "differentia-meaning-loss-protected",
  "ACI-P034-L017-ACBEB07035": "reader-loss-unawareness-protected",
  "ACI-P034-L019-3B414E3B12": "unavoidable-meaning-dislocation-protected",
  "ACI-P034-L019-3B414E3B12-02": "avoidable-mistranslation-dislocation-protected",
  "ACI-P034-L021-C7C39A3891": "dual-loss-translation-mirage-protected",
});

const SECTION_1_13_MISLEADING_TRANSLATION_CONTEXT_OBSERVATIONS = Object.freeze({
  "ACI-P034-L022-2FEC4AB471": "be-of-good-cheer-rendering-check",
  "ACI-P034-L022-2FEC4AB471-02": "rest-in-peace-rendering-check",
  "ACI-P034-L022-2FEC4AB471-03": "fc-six-page-184-provenance-protected",
  "ACI-P034-L024-07A2CE61B6": "rest-in-peace-continuation-check",
  "ACI-P034-L024-E8D2AB4479": "speech-participant-context-protected",
  "ACI-P034-L025-5E8ECB329A": "reader-confidence-nonauthority",
  "ACI-P034-L026-B2CD7926F3": "contextual-sounding-translation-nonauthority",
  "ACI-P034-L026-B2CD7926F3-02": "english-cultural-expectation-nonauthority",
  "ACI-P034-L027-5CB66E435F": "nahuatl-speaker-identity-check",
  "ACI-P034-L027-5CB66E435F-02": "solemn-admonition-context-protected",
  "ACI-P034-L027-5CB66E435F-03": "mere-congratulation-reading-blocked",
});

const SECTION_1_13_TLEH_ADMONITORY_PAIR_OBSERVATIONS = Object.freeze({
  "ACI-P034-L029-96C3C7DFCF": "tleh-ticmomachitia-canonical-question",
  "ACI-P034-L029-96C3C7DFCF-02": "tleh-ticmomachitia-meaning",
  "ACI-P034-L029-96C3C7DFCF-03": "tleh-ticmomachitia-participant-roles",
  "ACI-P034-L029-96C3C7DFCF-04": "tleh-ticmatcatzintli-canonical-question",
  "ACI-P034-L029-96C3C7DFCF-05": "tleh-ticmatcatzintli-meaning",
  "ACI-P034-L029-96C3C7DFCF-06": "tleh-ticmatcatzintli-participant-roles",
  "ACI-P034-L030-0DA56B325E": "comforting-wish-reading-blocked",
  "ACI-P034-L030-0DA56B325E-02": "challenge-pragmatic-force",
  "ACI-P034-L030-0DA56B325E-03": "wake-up-call-pragmatic-force",
  "ACI-P034-L030-0DA56B325E-04": "paired-rhetorical-question-model",
  "ACI-P034-L030-0DA56B325E-05": "paired-question-expected-answer-nothing",
});

const SECTION_1_13_ADMONITORY_CONTEXT_OBSERVATIONS = Object.freeze({
  "ACI-P034-L032-54C24D7AAC": "rough-you-know-nothing-paraphrase",
  "ACI-P034-L033-439B3B7758": "approximate-you-are-ignorant-paraphrase",
  "ACI-P034-L033-439B3B7758-02": "pay-attention-contextual-implication",
  "ACI-P034-L034-2FDA695160": "childbirth-danger-survival-context",
  "ACI-P034-L034-2FDA695160-02": "continuing-danger-context",
  "ACI-P034-L034-2FDA695160-03": "woman-and-child-uncertain-future-context",
  "ACI-P034-L035-AC1435044C": "respectful-address-context",
  "ACI-P034-L035-AC1435044C-02": "honored-addressee-notation",
  "ACI-P034-L035-AC1435044C-03": "respect-motivation-context-check",
  "ACI-P034-L035-AC1435044C-04": "battle-against-death-context",
  "ACI-P034-L037-BBEBA173B3": "pampering-reading-blocked",
});

const SECTION_1_13_TLEH_CLOSING_VOCATIVE_OBSERVATIONS = Object.freeze({
  "ACI-P034-L038-EC58BBE8BB": "return-to-earlier-rhetorical-question",
  "ACI-P034-L038-EC58BBE8BB-02": "closing-question-canvas-witness",
  "ACI-P034-L038-EC58BBE8BB-03": "two-vocatives-same-honored-addressee",
  "ACI-P034-L039-887B294CA5": "rest-in-peace-meaning-rejected",
  "ACI-P034-L039-887B294CA5-02": "principal-clause-you-are-ignorant",
  "ACI-P034-L039-887B294CA5-03": "singular-honorific-subject",
  "ACI-P034-L039-887B294CA5-04": "valued-person-vocative-model",
  "ACI-P034-L039-887B294CA5-05": "our-lady-vocative-model",
  "ACI-P034-L039-887B294CA5-06": "remind-ignorance-pragmatic-force",
  "ACI-P034-L039-887B294CA5-07": "think-carefully-pragmatic-force",
  "ACI-P034-L039-887B294CA5-08": "fc-six-page-185-provenance-protected",
  "ACI-P034-L039-887B294CA5-09": "speech-evidence-nonauthority",
  "ACI-P034-L042-AF216CB166": "take-things-easy-reading-blocked",
  "ACI-P034-L042-AF216CB166-02": "possible-disaster-preparedness-reading",
  "ACI-P034-L043-BC82265E11": "cultural-comfort-translation-mask",
});

const SECTION_1_13_KING_PRAISE_CONTEXT_OBSERVATIONS = Object.freeze({
  "ACI-P035-L004-CF7EDADCCF": "general-thrust-particular-affect-distinction",
  "ACI-P035-L005-D4F5096E32": "king-sentence-canvas-witness-check",
  "ACI-P035-L005-D4F5096E32-02": "published-king-translation-nonauthority",
  "ACI-P035-L006-B152308376": "congratulatory-purpose-check",
  "ACI-P035-L006-B152308376-02": "flattering-purpose-check",
  "ACI-P035-L006-B152308376-03": "newly-chosen-human-king-check",
  "ACI-P035-L006-B152308376-04": "general-purpose-preservation-nonauthority",
});

const SECTION_1_13_KING_PRAISE_ROLE_CONTRAST_OBSERVATIONS = Object.freeze({
  "ACI-P035-L008-4282D34A75": "substituted-merit-form-absent-check",
  "ACI-P035-L008-4282D34A75-02": "possessive-merit-meaning",
  "ACI-P035-L008-4282D34A75-03": "substituted-boon-form-absent-check",
  "ACI-P035-L008-4282D34A75-04": "possessive-boon-meaning",
  "ACI-P035-L008-4282D34A75-05": "actual-merit-form-present-check",
  "ACI-P035-L008-4282D34A75-06": "subject-predicating-merit-meaning",
  "ACI-P035-L008-4282D34A75-07": "actual-boon-form-present-check",
  "ACI-P035-L008-4282D34A75-08": "subject-predicating-boon-meaning",
  "ACI-P035-L008-4282D34A75-09": "subject-possessor-reversal-blocked",
  "ACI-P035-L010-096E47F9BD": "corrected-king-praise-translation",
  "ACI-P035-L010-096E47F9BD-02": "corrected-king-praise-focus-alternative",
  "ACI-P035-L010-096E47F9BD-03": "king-and-city-participant-roles",
  "ACI-P035-L011-CC9710C229": "published-role-reversal-blocked",
  "ACI-P035-L012-D035D58273": "nahuatl-ethos-distance-protected",
});

const SECTION_1_13_LANGUAGE_ACQUISITION_OBSERVATIONS = Object.freeze({
  "ACI-P035-L014-0115D6F835": "translation-acquisition-direction-contrast",
  "ACI-P035-L014-FCAB9E362B": "translation-reader-accommodation",
  "ACI-P035-L015-C657D40829": "learner-source-framework-reorientation",
  "ACI-P035-L016-8600EE4A16": "how-to-say-reduction-blocked",
  "ACI-P035-L016-8600EE4A16-02": "anthropological-understanding-goal",
  "ACI-P035-L018-0AA0C59217": "meaning-over-translation-goal",
  "ACI-P035-L020-DA9CC6C354": "equivalence-initial-instrument",
  "ACI-P035-L020-DA9CC6C354-02": "equivalence-superficiality",
  "ACI-P035-L020-DA9CC6C354-03": "equivalence-misleading-risk",
  "ACI-P035-L020-DA9CC6C354-04": "fuller-foreign-meaning-goal",
  "ACI-P035-L021-EA96211063": "foreign-meaning-difficulty",
  "ACI-P035-L021-EA96211063-02": "learner-success-overestimation",
  "ACI-P035-L021-EA96211063-03": "translation-mirage-overestimation",
});

const SECTION_1_13_DICTIONARY_EQUIVALENCE_OBSERVATIONS = Object.freeze({
  "ACI-P035-L023-D81F9676C8": "wintu-exact-meaning-observation-check",
  "ACI-P035-L023-D81F9676C8-02": "dorothy-lee-citation-protected",
  "ACI-P035-L026-ADF0ACC476": "nahuatl-equivalence-difficulty",
  "ACI-P035-L026-ADF0ACC476-02": "nahuatl-full-meaning-difficulty",
  "ACI-P035-L027-C7717C8419": "no-living-native-speakers-context",
  "ACI-P035-L027-C7717C8419-02": "no-living-native-informants-context",
  "ACI-P035-L028-A584272863": "dictionary-resort-context",
  "ACI-P035-L028-A584272863-02": "dictionary-reliance-deficiency",
  "ACI-P035-L030-41F8979B14": "equivalents-not-direct-meaning",
  "ACI-P035-L030-41F8979B14-02": "compiler-interest-bias",
  "ACI-P035-L030-41F8979B14-03": "compiler-worldview-bias",
  "ACI-P035-L030-41F8979B14-04": "rendering-not-definition-boundary",
});

const SECTION_1_13_DICTIONARY_SOURCE_OBSERVATIONS = Object.freeze({
  "ACI-P035-L034-0B9811FA50": "dictionary-quality-warning",
  "ACI-P035-L034-56025A8250": "molina-premier-dictionary-provenance",
  "ACI-P035-L034-56025A8250-02": "molina-authorship-provenance",
  "ACI-P035-L034-56025A8250-03": "molina-publication-provenance",
  "ACI-P035-L034-56025A8250-04": "spanish-to-nahuatl-direction",
  "ACI-P035-L034-56025A8250-05": "nahuatl-to-spanish-direction",
  "ACI-P035-L036-6EC5060031": "colonial-subduing-purpose",
  "ACI-P035-L036-6EC5060031-02": "sermonizing-colonial-method",
  "ACI-P035-L036-6EC5060031-03": "purpose-prejudice-warning",
  "ACI-P035-L036-6EC5060031-04": "spanish-category-filter-blocked",
});

const SECTION_1_13_IMPORTED_OBJECT_NAMING_OBSERVATIONS = Object.freeze({
  "ACI-P035-L038-0767A17839": "descriptive-imported-object-formation",
  "ACI-P035-L038-0767A17839-02": "clavichord-formation-witness",
  "ACI-P035-L038-0767A17839-03": "clavichord-compositional-meaning",
  "ACI-P035-L038-0767A17839-04": "sail-formation-witness",
  "ACI-P035-L038-0767A17839-05": "sail-compositional-meaning",
  "ACI-P035-L038-0767A17839-06": "dictionary-attestation-nonlimiting",
  "ACI-P035-L042-9432A1A3F1": "native-speaker-coinage-provenance",
  "ACI-P035-L042-9432A1A3F1-02": "new-object-naming-function",
  "ACI-P035-L042-9432A1A3F1-03": "imported-item-preference-context",
  "ACI-P035-L042-9432A1A3F1-04": "colonially-targeted-native-vocabulary-context",
  "ACI-P035-L042-9432A1A3F1-05": "mahomacalli-witness",
  "ACI-P035-L042-9432A1A3F1-06": "mahomatlatlatlauhtilizcalli-witness",
});

const SECTION_1_13_DICTIONARY_SOUND_NOTATION_OBSERVATIONS = Object.freeze({
  "ACI-P036-L005-9C9110AD6B": "sound-marking-required-for-communication",
  "ACI-P036-L005-9C9110AD6B-02": "unmarked-vowel-length-is-unknown",
  "ACI-P036-L005-9C9110AD6B-03": "rare-glottal-marking-is-incomplete",
  "ACI-P036-L005-9C9110AD6B-04": "molina-h-glottal-notation",
  "ACI-P036-L005-9C9110AD6B-05": "andrews-h-glottal-notation",
  "ACI-P036-L005-9C9110AD6B-06": "lesson2-sound-owner-dependency",
});

const SECTION_1_13_DICTIONARY_PROJECTION_CHAIN_OBSERVATIONS = Object.freeze({
  "ACI-P036-L009-F5821058EB": "spanish-semantic-superimposition",
  "ACI-P036-L009-F5821058EB-02": "english-user-greater-disadvantage",
  "ACI-P036-L010-75EAF930F4": "additional-english-interpretive-layer",
  "ACI-P036-L010-75EAF930F4-02": "english-onto-spanish-onto-nahuatl",
  "ACI-P036-L011-AA44D1293C": "simeon-publication-provenance",
  "ACI-P036-L011-AA44D1293C-02": "simeon-nahuatl-french-format",
  "ACI-P036-L011-AA44D1293C-03": "simeon-additional-text-entries",
  "ACI-P036-L013-943D62DC2E": "english-french-spanish-nahuatl-chain",
  "ACI-P036-L013-943D62DC2E-02": "simeon-spanish-translation-provenance",
  "ACI-P036-L015-665A4D398F": "simeon-1977-translation-documentation",
  "ACI-P036-L015-8DBAC8196B": "english-onto-translated-spanish-layer",
  "ACI-P036-L015-8DBAC8196B-02": "each-layer-misreading-risk",
});

const SECTION_1_13_IMAXTLI_DRIFT_OBSERVATIONS = Object.freeze({
  "ACI-P036-L017-6019D79687": "imaxtli-paired-gloss-witness",
  "ACI-P036-L017-6019D79687-02": "imaxtli-one-pubic-hair-reading",
  "ACI-P036-L017-6019D79687-03": "imaxtli-nether-beard-literal-reading",
  "ACI-P036-L017-6019D79687-04": "imaxtli-pubes-patch-reading",
  "ACI-P036-L017-6019D79687-05": "paired-gloss-evidence-nonauthority",
  "ACI-P036-L019-94E9D1DA68": "simeon-french-imaxtli-rendering",
  "ACI-P036-L019-94E9D1DA68-02": "french-beard-down-meaning",
  "ACI-P036-L019-94E9D1DA68-03": "french-beard-growth-drift",
  "ACI-P036-L021-56E7C88CB0": "spanish-beard-rendering",
  "ACI-P036-L021-56E7C88CB0-02": "spanish-upper-lip-fuzz-rendering",
});

const SECTION_1_13_COMMON_NUMBER_LEXICAL_CONTRAST_OBSERVATIONS = Object.freeze({
  "ACI-P036-L022-18FA3D9CB9": "pubic-hair-plucking-verbstem-meaning",
  "ACI-P036-L022-18FA3D9CB9-02": "pubic-patch-shaving-verbstem-meaning",
  "ACI-P036-L022-18FA3D9CB9-03": "simeon-plucking-meaning-collapse",
  "ACI-P036-L022-18FA3D9CB9-04": "simeon-shaving-meaning-collapse",
  "ACI-P036-L022-18FA3D9CB9-05": "spanish-plucking-meaning-collapse",
  "ACI-P036-L022-18FA3D9CB9-06": "spanish-shaving-meaning-collapse",
  "ACI-P036-L024-E64BE26F47": "common-number-one-or-more-reading",
});

const SECTION_1_13_HISTORICAL_SPANISH_OBSERVATIONS = Object.freeze({
  "ACI-P036-L028-052FB969AC": "molina-complete-1571-provenance",
  "ACI-P036-L028-052FB969AC-02": "sixteenth-century-spanish-context",
  "ACI-P036-L029-C10E7D16E1": "historical-usage-interpretation-required",
  "ACI-P036-L029-C10E7D16E1-02": "barba-inferior-historical-witness",
  "ACI-P036-L029-C10E7D16E1-03": "spanish-semantic-change-required",
});

const SECTION_1_13_CALTECHTLI_OBSERVATIONS = Object.freeze({
  "ACI-P036-L030-B38C91C722": "caltechtli-headword-witness",
  "ACI-P036-L030-B38C91C722-02": "caltechtli-molina-gloss-witness",
  "ACI-P036-L031-5817960769": "caltechtli-wall-reading",
  "ACI-P036-L031-5817960769-02": "caltechtli-walkway-misreading",
  "ACI-P036-L032-929590077D": "caltechtli-house-side-surface-composition",
  "ACI-P036-L034-8773CD4D0A": "hazera-not-modern-acera",
  "ACI-P036-L034-8773CD4D0A-02": "hazera-derived-from-haz",
  "ACI-P036-L034-8773CD4D0A-03": "historical-haz-face-meaning",
  "ACI-P036-L034-8773CD4D0A-04": "historical-haz-surface-meaning",
  "ACI-P036-L034-8773CD4D0A-05": "historical-hazera-normal-usage",
});

const SECTION_1_13_CUAUHTLAH_OBSERVATIONS = Object.freeze({
  "ACI-P036-L037-9C47980823": "quauhtla-cuauhtlah-normalization",
  "ACI-P036-L037-9C47980823-02": "mountain-gloss-witness",
  "ACI-P036-L037-9C47980823-03": "grove-gloss-witness",
  "ACI-P036-L037-9C47980823-04": "forest-gloss-witness",
  "ACI-P036-L037-9C47980823-05": "spanish-semantic-imposition-check",
  "ACI-P036-L039-BD7D84E391": "mountain-forest-conflation-rejected",
  "ACI-P036-L039-BD7D84E391-02": "iberian-deforestation-context",
  "ACI-P036-L043-48BE012749": "cuauhtlah-spanish-conflation-blocked",
  "ACI-P037-L002-F2CAF52173": "cuauhtlah-singular-forest-place-result",
  "ACI-P037-L002-5804EB2DBB": "cuauhtlah-plural-forest-place-result",
});

const SECTION_1_13_TLATIA_LENGTH_OBSERVATIONS = Object.freeze({
  "ACI-P037-L005-AF03ADE002": "dictionary-sound-disregard-problem",
  "ACI-P037-L006-9C5D7E55DA": "vowel-length-entry-collapse",
  "ACI-P037-L008-4254BF86A2": "tlatia-entry-split-required",
  "ACI-P037-L008-4254BF86A2-02": "long-vowel-hide-oneself-stem",
  "ACI-P037-L008-4254BF86A2-03": "short-vowel-burn-oneself-stem",
  "ACI-P037-L008-4254BF86A2-04": "vowel-length-internal-structure-contrast",
  "ACI-P037-L008-4254BF86A2-05": "stem-merger-result-loss-blocked",
});

const SECTION_1_13_XIMA_OBJECT_EMBED_OBSERVATIONS = Object.freeze({
  "ACI-P037-L009-1CA3CEF619": "xima-dictionary-collapse-witness",
  "ACI-P037-L009-1CA3CEF619-02": "xima-human-object-reading",
  "ACI-P037-L009-1CA3CEF619-03": "xima-incorporated-stone-reading",
  "ACI-P037-L009-1CA3CEF619-04": "human-object-stone-embed-merger-rejected",
  "ACI-P037-L011-AF64F276AC": "simple-transitive-compound-intransitive-contrast",
  "ACI-P037-L013-6CEC7A61B8": "texima-intransitive-inventory-correction",
});

const SECTION_1_13_TEXOLOUIA_OBSERVATIONS = Object.freeze({
  "ACI-P037-L016-9B9F396CAF": "pestle-instrument-reading",
  "ACI-P037-L016-E57E467B9B": "te-rock-not-teh-someone",
  "ACI-P037-L017-8EC85AF98F": "texolouia-correct-formation",
  "ACI-P037-L019-2514D18E7B": "te-xolo-stone-pestle-nounstem",
});

const SECTION_1_13_CHIMALPOPOCA_OBSERVATIONS = Object.freeze({
  "ACI-P037-L021-4CCD597B87": "dictionary-problems-extend-further",
  "ACI-P037-L022-34DB0685AE": "dictionary-translation-can-be-wrong",
  "ACI-P037-L022-27D75D900E": "smoking-shield-gloss-witness",
  "ACI-P037-L022-27D75D900E-02": "smoking-shield-meaning-rejected",
  "ACI-P037-L022-27D75D900E-03": "chimalpopoca-canonical-owner-dependency",
});

const SECTION_1_13_ACH_IQUIN_OBSERVATIONS = Object.freeze({
  "ACI-P037-L024-7765DF72EF": "wrong-dictionary-head-error",
  "ACI-P037-L024-616429102A": "achi-quin-headword-witness",
  "ACI-P037-L024-616429102A-02": "achi-quin-redirect-witness",
  "ACI-P037-L025-34A5BD6934": "see-achi-witness",
  "ACI-P037-L025-7831CB7A3D": "achi-quin-missegmentation-witness",
  "ACI-P037-L025-7831CB7A3D-02": "je-ne-sais-gloss-witness",
  "ACI-P037-L025-7831CB7A3D-03": "on-ne-sait-quand-gloss-witness",
  "ACI-P037-L025-7831CB7A3D-04": "je-ne-sais-meaning-check",
  "ACI-P037-L025-7831CB7A3D-05": "on-ne-sait-quand-meaning-check",
  "ACI-P037-L026-94063CE428": "achiquin-headword-witness",
  "ACI-P037-L026-94063CE428-02": "achiquin-spanish-gloss-witness",
  "ACI-P037-L027-E8E4805B28": "ach-iquin-gloss-meaning-check",
  "ACI-P037-L028-9C6EB3B02B": "ach-iquin-particle-boundary",
  "ACI-P037-L030-ED1CDB600C": "ach-achi-liaison-identity-contrast",
});

const SECTION_1_13_CUI_CUICA_OBSERVATIONS = Object.freeze({
  "ACI-P037-L034-A8887817C6": "dictionary-grammar-analysis-error",
  "ACI-P037-L035-A5D62592A6": "cuica-sing-headword-witness",
  "ACI-P037-L035-A5D62592A6-02": "xiccuican-misfiled-under-cuica",
  "ACI-P037-L035-A5D62592A6-03": "plural-command-gloss-check",
  "ACI-P037-L035-A5D62592A6-04": "cautious-gloss-check",
  "ACI-P037-L035-A5D62592A6-05": "prudent-gloss-check",
  "ACI-P037-L035-A5D62592A6-06": "wise-gloss-check",
  "ACI-P037-L037-47557F3B55": "avisados-omission-check",
  "ACI-P037-L037-47557F3B55-02": "plural-prudent-wise-reading-check",
  "ACI-P037-L037-47557F3B55-03": "sing-faces-ears-added-reading",
  "ACI-P037-L037-47557F3B55-04": "singing-reading-structurally-rejected",
  "ACI-P037-L040-04631E4CC1": "cui-selected-over-cuica",
});

const SECTION_1_13_DICTIONARY_ROOT_OBSERVATIONS = Object.freeze({
  "ACI-P038-L002-852DEE7B83": "further-examples-space-limit",
  "ACI-P038-L002-852DEE7B83-02": "many-further-dictionary-problems",
  "ACI-P038-L002-852DEE7B83-03": "dictionary-untrustworthiness-supported",
  "ACI-P038-L002-852DEE7B83-04": "molina-more-reliable-than-simeon",
  "ACI-P038-L004-3F2A76679C": "simeon-root-authority-rejected",
  "ACI-P038-L005-1BEB3C20F1": "false-frequentative-claim-witness",
  "ACI-P038-L005-1BEB3C20F1-02": "ratchet-rat-analogy-check",
  "ACI-P038-L005-1BEB3C20F1-03": "tzatzanatza-transitive-source",
  "ACI-P038-L005-1BEB3C20F1-04": "tzahtzi-intransitive-source",
  "ACI-P038-L007-83307DDAC2": "valence-and-glottal-root-contrast",
});

const SECTION_1_13_DICTIONARY_SEMANTIC_LIMIT_OBSERVATIONS = Object.freeze({
  "ACI-P038-L010-A09A9FA9F1": "clear-cut-equivalence-illusion",
  "ACI-P038-L010-A09A9FA9F1-02": "dictionary-correspondence-ill-fitting",
  "ACI-P038-L010-A09A9FA9F1-03": "dictionary-correspondence-partial-overlap",
  "ACI-P038-L013-C19BF92264": "calli-house-ordinary-rendering",
  "ACI-P038-L013-C19BF92264-02": "house-only-sometimes-equivalent",
  "ACI-P038-L013-C19BF92264-03": "calpolli-contextual-renderings",
  "ACI-P038-L013-C19BF92264-04": "acalli-contextual-renderings",
  "ACI-P038-L013-C19BF92264-05": "chinancalli-contextual-rendering",
  "ACI-P038-L013-C19BF92264-06": "tzoncalli-contextual-renderings",
  "ACI-P038-L013-C19BF92264-07": "grammar-mastery-required-by-semantic-limits",
  "ACI-P038-L013-C19BF92264-08": "grammar-does-not-erase-dictionary-limits",
  "ACI-P038-L013-C19BF92264-09": "grammar-maximizes-source-use",
});

const SECTION_1_13_TEXT_INTERPRETATION_OBSERVATIONS = Object.freeze({
  "ACI-P038-L023-4B0DCB91CE": "disappeared-civilization-language-context",
  "ACI-P038-L023-4B0DCB91CE-02": "study-purpose-cultural-understanding",
  "ACI-P038-L023-4B0DCB91CE-03": "faulty-reading-cultural-fiction-risk",
  "ACI-P038-L023-4B0DCB91CE-04": "pedagogy-nonauthority",
  "ACI-P038-L024-A664F9A770": "faulty-reading-interpretation-rejected",
  "ACI-P038-L026-D3B3AB0419": "language-mastery-effort-required",
  "ACI-P038-L026-D3B3AB0419-02": "past-interpreter-mastery-warning",
  "ACI-P038-L028-B157263C0B": "grammar-aversion-guard",
  "ACI-P038-L028-B157263C0B-02": "linguicentrism-guard",
  "ACI-P038-L028-B157263C0B-03": "translation-mirage-guard",
  "ACI-P038-L028-B157263C0B-04": "ethnocentrism-guard",
  "ACI-P038-L028-B157263C0B-05": "forced-personal-invention-rejected",
});

const EXACTLY_OBSERVED_ATOM_IDS = new Set(
  [
    ...Object.keys(SECTION_1_11_GENERAL_OBSERVATIONS),
    ...Object.keys(SECTION_1_11_1_OBSERVATIONS),
    ...Object.keys(SECTION_1_11_2_AFFIX_OBSERVATIONS),
    ...Object.keys(SECTION_1_11_2_HIERARCHY_OBSERVATIONS),
    ...Object.keys(SECTION_1_11_2_STEM_OBSERVATIONS),
    ...Object.keys(SECTION_1_11_2_TRANSITION_OBSERVATIONS),
    ...Object.keys(SECTION_1_11_2_GROUP_SYNTAX_OBSERVATIONS),
    ...Object.keys(SECTION_1_12_OPENING_OBSERVATIONS),
    ...Object.keys(SECTION_1_12_GOVERNANCE_TAXONOMY_OBSERVATIONS),
    ...Object.keys(SECTION_1_12_ADJUNCTIVE_OBSERVATIONS),
    ...Object.keys(SECTION_1_12_CONJUNCTIVE_OBSERVATIONS),
    ...Object.keys(SECTION_1_12_PARTICIPANT_PLANE_OBSERVATIONS),
    ...Object.keys(SECTION_1_13_TRANSLATION_MIRAGE_OBSERVATIONS),
    ...Object.keys(SECTION_1_13_ONICIHUAMIC_OBSERVATIONS),
    ...Object.keys(SECTION_1_13_TRANSLATION_LOSS_OBSERVATIONS),
    ...Object.keys(SECTION_1_13_EXOTL_OBSERVATIONS),
    ...Object.keys(SECTION_1_13_TARGET_LANGUAGE_DOMINANCE_OBSERVATIONS),
    ...Object.keys(SECTION_1_13_MISLEADING_TRANSLATION_CONTEXT_OBSERVATIONS),
    ...Object.keys(SECTION_1_13_TLEH_ADMONITORY_PAIR_OBSERVATIONS),
    ...Object.keys(SECTION_1_13_ADMONITORY_CONTEXT_OBSERVATIONS),
    ...Object.keys(SECTION_1_13_TLEH_CLOSING_VOCATIVE_OBSERVATIONS),
    ...Object.keys(SECTION_1_13_KING_PRAISE_CONTEXT_OBSERVATIONS),
    ...Object.keys(SECTION_1_13_KING_PRAISE_ROLE_CONTRAST_OBSERVATIONS),
    ...Object.keys(SECTION_1_13_LANGUAGE_ACQUISITION_OBSERVATIONS),
    ...Object.keys(SECTION_1_13_DICTIONARY_EQUIVALENCE_OBSERVATIONS),
    ...Object.keys(SECTION_1_13_DICTIONARY_SOURCE_OBSERVATIONS),
    ...Object.keys(SECTION_1_13_IMPORTED_OBJECT_NAMING_OBSERVATIONS),
    ...Object.keys(SECTION_1_13_DICTIONARY_SOUND_NOTATION_OBSERVATIONS),
    ...Object.keys(SECTION_1_13_DICTIONARY_PROJECTION_CHAIN_OBSERVATIONS),
    ...Object.keys(SECTION_1_13_IMAXTLI_DRIFT_OBSERVATIONS),
    ...Object.keys(SECTION_1_13_COMMON_NUMBER_LEXICAL_CONTRAST_OBSERVATIONS),
    ...Object.keys(SECTION_1_13_HISTORICAL_SPANISH_OBSERVATIONS),
    ...Object.keys(SECTION_1_13_CALTECHTLI_OBSERVATIONS),
    ...Object.keys(SECTION_1_13_CUAUHTLAH_OBSERVATIONS),
    ...Object.keys(SECTION_1_13_TLATIA_LENGTH_OBSERVATIONS),
    ...Object.keys(SECTION_1_13_XIMA_OBJECT_EMBED_OBSERVATIONS),
    ...Object.keys(SECTION_1_13_TEXOLOUIA_OBSERVATIONS),
    ...Object.keys(SECTION_1_13_CHIMALPOPOCA_OBSERVATIONS),
    ...Object.keys(SECTION_1_13_ACH_IQUIN_OBSERVATIONS),
    ...Object.keys(SECTION_1_13_CUI_CUICA_OBSERVATIONS),
    ...Object.keys(SECTION_1_13_DICTIONARY_ROOT_OBSERVATIONS),
    ...Object.keys(SECTION_1_13_DICTIONARY_SEMANTIC_LIMIT_OBSERVATIONS),
    ...Object.keys(SECTION_1_13_TEXT_INTERPRETATION_OBSERVATIONS),
  ],
);

function section111GeneralJobType(atom) {
  const observationKind = SECTION_1_11_GENERAL_OBSERVATIONS[atom.atomId] || "";
  if (
    atom.force === "evidence"
    || observationKind.startsWith("latin-")
  ) {
    return JOB_TYPES.check;
  }
  if (
    observationKind.startsWith("elements-")
    || observationKind.startsWith("speech-")
    || observationKind.startsWith("writing-")
    || observationKind.startsWith("valid-sequence-")
    || observationKind.startsWith("one-plus-one-")
    || observationKind.startsWith("constituents-enter-")
    || observationKind === "cohesion-allows-nonjuxtaposed-constituents"
    || observationKind === "obligatory-discontinuity-admissible"
    || observationKind === "composition-recursive-reapplication"
  ) {
    return JOB_TYPES.grammar;
  }
  return JOB_TYPES.model;
}

function section1111JobType(atom) {
  const observationKind = SECTION_1_11_1_OBSERVATIONS[atom.atomId] || "";
  if (
    observationKind === "english-syllabic-consonant-boundary"
    || observationKind === "syllable-rules-language-specific"
    || observationKind === "english-example-non-authorizing"
  ) {
    return JOB_TYPES.protect;
  }
  if (
    observationKind === "meaningless-unit-member-inventory"
    || observationKind === "carrier-rank-taxonomy"
    || observationKind === "syllable-is-meaningless-unit"
    || observationKind === "vocable-is-meaningless-syllable-unit"
    || observationKind.startsWith("english-example-")
    || observationKind === "english-syllable-example-provenance"
  ) {
    return JOB_TYPES.model;
  }
  return JOB_TYPES.grammar;
}

function assignJobType(atom) {
  if (atom.canvasSection.startsWith("§1.11.1")) {
    return section1111JobType(atom);
  }
  if (majorSection(atom.canvasSection) === "1.3") {
    const observationKind = section13ObservationKind(atom);
    return section13JobType(atom, observationKind);
  }
  if (majorSection(atom.canvasSection) === "1.4") {
    return JOB_TYPES.model;
  }
  if (majorSection(atom.canvasSection) === "1.5") {
    return atom.force === "evidence" ? JOB_TYPES.check : JOB_TYPES.model;
  }
  if (majorSection(atom.canvasSection) === "1.6") {
    const observationKind = section16ObservationKind(atom);
    return atom.force === "evidence"
      || observationKind === "foreign-phoneme-example-check"
      ? JOB_TYPES.check
      : JOB_TYPES.model;
  }
  if (majorSection(atom.canvasSection) === "1.7") {
    return atom.force === "evidence"
      || /English|e\.g\.|For example/iu.test(String(atom.meaning || ""))
      ? JOB_TYPES.check
      : JOB_TYPES.model;
  }
  if (majorSection(atom.canvasSection) === "1.8") {
    return atom.force === "evidence"
      || /English|Spanish|borrowed|\[mizmo\]|\[pit-|\[pig-|\[kis-|\[aks-|\[šīp/iu
        .test(String(atom.meaning || ""))
      ? JOB_TYPES.check
      : JOB_TYPES.model;
  }
  if (majorSection(atom.canvasSection) === "1.9") {
    if (atom.semanticOwnerId === "silent-morph-contrast-validation") {
      return JOB_TYPES.grammar;
    }
    return atom.force === "evidence" ? JOB_TYPES.check : JOB_TYPES.model;
  }
  if (majorSection(atom.canvasSection) === "1.10") {
    return atom.force === "evidence" ? JOB_TYPES.check : JOB_TYPES.model;
  }
  if (atom.canvasSection === "§1.11") {
    return section111GeneralJobType(atom);
  }
  if (atom.force === "grammar-bearing") {
    return GRAMMAR_PROJECT_ROLES.has(atom.projectRole)
      ? JOB_TYPES.grammar
      : JOB_TYPES.model;
  }
  if (atom.force === "evidence") return JOB_TYPES.check;
  const section = majorSection(atom.canvasSection);
  if (atom.force === "documentary") {
    return section === "1.1" || isCrossReference(atom.meaning)
      ? JOB_TYPES.model
      : JOB_TYPES.protect;
  }
  if (["1.2", "1.3", "1.13"].includes(section)) {
    if (/grammar is a reasoned description/iu.test(atom.meaning)) {
      return JOB_TYPES.model;
    }
    return JOB_TYPES.protect;
  }
  return JOB_TYPES.model;
}

function requirementFor(jobType, jobFamily, meaning) {
  if (jobType === JOB_TYPES.grammar) {
    return `The normal application path must perform or enforce this exact grammatical requirement: ${meaning}`;
  }
  if (jobType === JOB_TYPES.model) {
    const familyRequirement = MODEL_REQUIREMENTS[jobFamily]
      || "The normal grammar path must use this definition or structural relationship when it validates, builds, or explains grammar";
    return `${familyRequirement}: ${meaning}`;
  }
  if (jobType === JOB_TYPES.check) {
    return `This exact witness must check the related ${jobFamily} behavior without authorizing or limiting that behavior: ${meaning}`;
  }
  const protectionRequirement = PROTECTION_REQUIREMENTS[jobFamily]
    || "The normal application path must preserve this information as context or provenance while preventing it from choosing grammatical structure or Result";
  return `${protectionRequirement}: ${meaning}`;
}

function applicationDirectionFor(section, jobType) {
  if (
    section === "1.13"
    && (jobType === JOB_TYPES.check || jobType === JOB_TYPES.protect)
  ) {
    return "GUIDES_READER_AND_INTERPRETER";
  }
  if (jobType === JOB_TYPES.grammar) return "WRITES_OR_CONTROLS_RESULT";
  if (jobType === JOB_TYPES.model) return "BUILDS_WRITING_MODEL";
  if (jobType === JOB_TYPES.check) return "CHECKS_WRITING_GRAMMAR";
  return "PROTECTS_WRITING_GRAMMAR";
}

function directionalRequirementFor({ applicationDirection, jobType, jobFamily, meaning }) {
  if (applicationDirection === "GUIDES_READER_AND_INTERPRETER") {
    return `This teaches how to read or interpret finished language. It must not compose, select, or change a Result; it may only check evidence or prevent a translation from authorizing Nahuatl grammar: ${meaning}`;
  }
  return requirementFor(jobType, jobFamily, meaning);
}

function directionsFor(applicationDirection) {
  if (applicationDirection === "GUIDES_READER_AND_INTERPRETER") {
    return Object.freeze(["READING_AND_INTERPRETATION"]);
  }
  return Object.freeze(["WRITING", "READING_AND_INTERPRETATION"]);
}

function directionClassFor(directions) {
  const writes = directions.includes("WRITING");
  const reads = directions.includes("READING_AND_INTERPRETATION");
  if (writes && reads) return "BOTH";
  if (writes) return "WRITING_ONLY";
  return "READING_ONLY";
}

function nearestOwner(atoms, index, sectionFamily) {
  if (atoms[index].semanticOwnerId) return atoms[index].semanticOwnerId;
  const section = majorSection(atoms[index].canvasSection);
  for (let distance = 1; distance < atoms.length; distance += 1) {
    for (const candidateIndex of [index - distance, index + distance]) {
      const candidate = atoms[candidateIndex];
      if (!candidate || majorSection(candidate.canvasSection) !== section) continue;
      if (candidate.semanticOwnerId) return candidate.semanticOwnerId;
    }
  }
  return sectionFamily;
}

function buildLedger() {
  const source = JSON.parse(fs.readFileSync(SOURCE_PATH, "utf8"));
  const fields = source.codebook.atomTuple;
  const lessonAtoms = source.atoms
    .map((tuple) => Object.fromEntries(fields.map((field, index) => [field, tuple[index]])))
    .filter((atom) => /^§1\./u.test(atom.canvasSection));
  const records = lessonAtoms.map((atom, index) => {
    const section = majorSection(atom.canvasSection);
    const jobFamily = SECTION_FAMILIES[section];
    const jobType = assignJobType(atom);
    const applicationDirection = applicationDirectionFor(section, jobType);
    const directions = directionsFor(applicationDirection);
    const directionClass = directionClassFor(directions);
    const relatedGrammarOwnerId = nearestOwner(lessonAtoms, index, jobFamily);
    const accepted = EXACTLY_OBSERVED_SECTIONS.has(section)
      || EXACTLY_OBSERVED_ATOM_IDS.has(atom.atomId);
    const observationKind = SECTION_1_12_OPENING_OBSERVATIONS[atom.atomId]
      || SECTION_1_12_GOVERNANCE_TAXONOMY_OBSERVATIONS[atom.atomId]
      || SECTION_1_12_ADJUNCTIVE_OBSERVATIONS[atom.atomId]
      || SECTION_1_12_CONJUNCTIVE_OBSERVATIONS[atom.atomId]
      || SECTION_1_12_PARTICIPANT_PLANE_OBSERVATIONS[atom.atomId]
      || SECTION_1_13_TRANSLATION_MIRAGE_OBSERVATIONS[atom.atomId]
      || SECTION_1_13_ONICIHUAMIC_OBSERVATIONS[atom.atomId]
      || SECTION_1_13_TRANSLATION_LOSS_OBSERVATIONS[atom.atomId]
      || SECTION_1_13_EXOTL_OBSERVATIONS[atom.atomId]
      || SECTION_1_13_TARGET_LANGUAGE_DOMINANCE_OBSERVATIONS[atom.atomId]
      || SECTION_1_13_MISLEADING_TRANSLATION_CONTEXT_OBSERVATIONS[atom.atomId]
      || SECTION_1_13_TLEH_ADMONITORY_PAIR_OBSERVATIONS[atom.atomId]
      || SECTION_1_13_ADMONITORY_CONTEXT_OBSERVATIONS[atom.atomId]
      || SECTION_1_13_TLEH_CLOSING_VOCATIVE_OBSERVATIONS[atom.atomId]
      || SECTION_1_13_KING_PRAISE_CONTEXT_OBSERVATIONS[atom.atomId]
      || SECTION_1_13_KING_PRAISE_ROLE_CONTRAST_OBSERVATIONS[atom.atomId]
      || SECTION_1_13_LANGUAGE_ACQUISITION_OBSERVATIONS[atom.atomId]
      || SECTION_1_13_DICTIONARY_EQUIVALENCE_OBSERVATIONS[atom.atomId]
      || SECTION_1_13_DICTIONARY_SOURCE_OBSERVATIONS[atom.atomId]
      || SECTION_1_13_IMPORTED_OBJECT_NAMING_OBSERVATIONS[atom.atomId]
      || SECTION_1_13_DICTIONARY_SOUND_NOTATION_OBSERVATIONS[atom.atomId]
      || SECTION_1_13_DICTIONARY_PROJECTION_CHAIN_OBSERVATIONS[atom.atomId]
      || SECTION_1_13_IMAXTLI_DRIFT_OBSERVATIONS[atom.atomId]
      || SECTION_1_13_COMMON_NUMBER_LEXICAL_CONTRAST_OBSERVATIONS[atom.atomId]
      || SECTION_1_13_HISTORICAL_SPANISH_OBSERVATIONS[atom.atomId]
      || SECTION_1_13_CALTECHTLI_OBSERVATIONS[atom.atomId]
      || SECTION_1_13_CUAUHTLAH_OBSERVATIONS[atom.atomId]
      || SECTION_1_13_TLATIA_LENGTH_OBSERVATIONS[atom.atomId]
      || SECTION_1_13_XIMA_OBJECT_EMBED_OBSERVATIONS[atom.atomId]
      || SECTION_1_13_TEXOLOUIA_OBSERVATIONS[atom.atomId]
      || SECTION_1_13_CHIMALPOPOCA_OBSERVATIONS[atom.atomId]
      || SECTION_1_13_ACH_IQUIN_OBSERVATIONS[atom.atomId]
      || SECTION_1_13_CUI_CUICA_OBSERVATIONS[atom.atomId]
      || SECTION_1_13_DICTIONARY_ROOT_OBSERVATIONS[atom.atomId]
      || SECTION_1_13_DICTIONARY_SEMANTIC_LIMIT_OBSERVATIONS[atom.atomId]
      || SECTION_1_13_TEXT_INTERPRETATION_OBSERVATIONS[atom.atomId]
      || SECTION_1_1_OBSERVATIONS[atom.atomId]
      || (section === "1.2" && jobType === JOB_TYPES.model
        ? "grammar-definition-used-by-normal-route"
        : section === "1.2"
          ? "foreign-language-transfer-rejected"
          : section === "1.3"
            ? section13ObservationKind(atom)
            : section === "1.4"
              ? SECTION_1_4_OBSERVATIONS[atom.atomId] || ""
              : section === "1.5"
                ? SECTION_1_5_OBSERVATIONS[atom.atomId] || ""
                : section === "1.6"
                  ? section16ObservationKind(atom)
                  : section === "1.7"
                    ? SECTION_1_7_OBSERVATIONS[atom.atomId] || ""
                    : section === "1.8"
                      ? SECTION_1_8_OBSERVATIONS[atom.atomId] || ""
                      : section === "1.9"
                        ? SECTION_1_9_OBSERVATIONS[atom.atomId] || ""
                        : section === "1.10"
                          ? SECTION_1_10_OBSERVATIONS[atom.atomId] || ""
                          : section === "1.11"
                            ? SECTION_1_11_GENERAL_OBSERVATIONS[atom.atomId]
                              || SECTION_1_11_1_OBSERVATIONS[atom.atomId]
                              || SECTION_1_11_2_AFFIX_OBSERVATIONS[atom.atomId]
                              || SECTION_1_11_2_HIERARCHY_OBSERVATIONS[atom.atomId]
                              || SECTION_1_11_2_STEM_OBSERVATIONS[atom.atomId]
                              || SECTION_1_11_2_TRANSITION_OBSERVATIONS[atom.atomId]
                              || SECTION_1_11_2_GROUP_SYNTAX_OBSERVATIONS[atom.atomId]
                              || ""
          : "");
    const targetOwnerId = section === "1.13"
      && SECTION_1_13_KING_PRAISE_ROLE_CONTRAST_OBSERVATIONS[atom.atomId]
      ? "participant-role-analysis"
      : section === "1.13"
      && SECTION_1_13_CHIMALPOPOCA_OBSERVATIONS[atom.atomId]
      ? "translation-authority-boundary"
      : section === "1.13"
      && SECTION_1_13_ACH_IQUIN_OBSERVATIONS[atom.atomId]
      ? "classical-particle-lexical-distinction"
      : section === "1.13"
      && SECTION_1_13_CUI_CUICA_OBSERVATIONS[atom.atomId]
      ? "classical-verbstem-lexicon"
      : section === "1.13"
      && SECTION_1_13_DICTIONARY_ROOT_OBSERVATIONS[atom.atomId]
      ? "classical-verbstem-lexicon"
      : section === "1.13"
      && (SECTION_1_13_DICTIONARY_SEMANTIC_LIMIT_OBSERVATIONS[atom.atomId]
        || SECTION_1_13_TEXT_INTERPRETATION_OBSERVATIONS[atom.atomId])
      ? "translation-authority-boundary"
      : section === "1.13"
      && SECTION_1_13_TLATIA_LENGTH_OBSERVATIONS[atom.atomId]
      ? "classical-phonological-distinction"
      : section === "1.13"
      && (SECTION_1_13_XIMA_OBJECT_EMBED_OBSERVATIONS[atom.atomId]
        || SECTION_1_13_TEXOLOUIA_OBSERVATIONS[atom.atomId])
      ? "classical-object-embed-distinction"
      : section === "1.13"
      && (SECTION_1_13_LANGUAGE_ACQUISITION_OBSERVATIONS[atom.atomId]
        || SECTION_1_13_DICTIONARY_EQUIVALENCE_OBSERVATIONS[atom.atomId]
        || SECTION_1_13_DICTIONARY_SOURCE_OBSERVATIONS[atom.atomId]
        || SECTION_1_13_IMPORTED_OBJECT_NAMING_OBSERVATIONS[atom.atomId]
        || SECTION_1_13_DICTIONARY_SOUND_NOTATION_OBSERVATIONS[atom.atomId]
        || SECTION_1_13_DICTIONARY_PROJECTION_CHAIN_OBSERVATIONS[atom.atomId]
        || SECTION_1_13_IMAXTLI_DRIFT_OBSERVATIONS[atom.atomId]
        || SECTION_1_13_COMMON_NUMBER_LEXICAL_CONTRAST_OBSERVATIONS[atom.atomId]
        || SECTION_1_13_HISTORICAL_SPANISH_OBSERVATIONS[atom.atomId]
        || SECTION_1_13_CALTECHTLI_OBSERVATIONS[atom.atomId]
        || SECTION_1_13_CUAUHTLAH_OBSERVATIONS[atom.atomId])
      ? "translation-authority-boundary"
      : section === "1.13"
      && SECTION_1_13_TLEH_CLOSING_VOCATIVE_OBSERVATIONS[atom.atomId]
      ? "classical-nuclear-clause-structure"
      : section === "1.13"
      && (SECTION_1_13_ADMONITORY_CONTEXT_OBSERVATIONS[atom.atomId]
        || SECTION_1_13_KING_PRAISE_CONTEXT_OBSERVATIONS[atom.atomId])
      ? "translation-authority-boundary"
      : section === "1.13"
      && SECTION_1_13_TLEH_ADMONITORY_PAIR_OBSERVATIONS[atom.atomId]
      ? "classical-nuclear-clause-structure"
      : section === "1.13"
      && SECTION_1_13_MISLEADING_TRANSLATION_CONTEXT_OBSERVATIONS[atom.atomId]
      ? "translation-authority-boundary"
      : section === "1.13"
      && SECTION_1_13_TARGET_LANGUAGE_DOMINANCE_OBSERVATIONS[atom.atomId]
      ? "translation-authority-boundary"
      : section === "1.13"
      && SECTION_1_13_EXOTL_OBSERVATIONS[atom.atomId]
      ? "classical-nuclear-clause-structure"
      : section === "1.13"
      && SECTION_1_13_TRANSLATION_LOSS_OBSERVATIONS[atom.atomId]
      ? "translation-authority-boundary"
      : section === "1.13"
      && SECTION_1_13_ONICIHUAMIC_OBSERVATIONS[atom.atomId]
      ? "classical-incorporated-adverb-supplement-subject"
      : section === "1.13"
      && SECTION_1_13_TRANSLATION_MIRAGE_OBSERVATIONS[atom.atomId]
      ? "translation-authority-boundary"
      : section === "1.11" && observationKind
      ? atom.semanticOwnerId || "linguistic-structure-foundation"
      : section === "1.10"
      ? "linguistic-level-element-matrix"
      : section === "1.9"
      ? atom.semanticOwnerId || "linguistic-analysis-levels"
      : section === "1.8"
      ? atom.semanticOwnerId || "token-element-classification"
      : section === "1.7"
      ? "morpheme-taxonomy"
      : section === "1.6"
      ? atom.canvasSection.startsWith("§1.6.1")
        ? "carrier-phoneme-classification"
        : atom.canvasSection.startsWith("§1.6.2")
          ? "carrier-grapheme-classification"
          : atom.canvasSection.startsWith("§1.6.3")
            ? "carrier-sigeme-classification"
            : atom.canvasSection.startsWith("§1.6.4")
              ? "content-sememe-classification"
              : "linguistic-element-classification"
      : section === "1.5"
      ? "linguistic-analysis-levels"
      : section === "1.4"
      ? "linguistic-communication-structure"
      : section === "1.3"
      ? section13TargetOwner(observationKind)
      : atom.force === "grammar-bearing"
        ? atom.semanticOwnerId || jobFamily
        : jobFamily;
    const observationTestFile = section === "1.13"
      && SECTION_1_13_KING_PRAISE_ROLE_CONTRAST_OBSERVATIONS[atom.atomId]
      ? "src/tests/classical_lesson1_king_praise_role_contrast_jobs.test.js"
      : section === "1.13"
      && SECTION_1_13_LANGUAGE_ACQUISITION_OBSERVATIONS[atom.atomId]
      ? "src/tests/classical_lesson1_language_acquisition_reorientation_jobs.test.js"
      : section === "1.13"
      && SECTION_1_13_DICTIONARY_EQUIVALENCE_OBSERVATIONS[atom.atomId]
      ? "src/tests/classical_lesson1_dictionary_equivalence_limit_jobs.test.js"
      : section === "1.13"
      && SECTION_1_13_DICTIONARY_SOURCE_OBSERVATIONS[atom.atomId]
      ? "src/tests/classical_lesson1_dictionary_source_colonial_filter_jobs.test.js"
      : section === "1.13"
      && SECTION_1_13_IMPORTED_OBJECT_NAMING_OBSERVATIONS[atom.atomId]
      ? "src/tests/classical_lesson1_imported_object_descriptive_naming_jobs.test.js"
      : section === "1.13"
      && SECTION_1_13_DICTIONARY_SOUND_NOTATION_OBSERVATIONS[atom.atomId]
      ? "src/tests/classical_lesson1_dictionary_sound_notation_jobs.test.js"
      : section === "1.13"
      && SECTION_1_13_DICTIONARY_PROJECTION_CHAIN_OBSERVATIONS[atom.atomId]
      ? "src/tests/classical_lesson1_dictionary_projection_chain_jobs.test.js"
      : section === "1.13"
      && SECTION_1_13_IMAXTLI_DRIFT_OBSERVATIONS[atom.atomId]
      ? "src/tests/classical_lesson1_imaxtli_semantic_drift_jobs.test.js"
      : section === "1.13"
      && SECTION_1_13_COMMON_NUMBER_LEXICAL_CONTRAST_OBSERVATIONS[atom.atomId]
      ? "src/tests/classical_lesson1_common_number_lexical_contrast_jobs.test.js"
      : section === "1.13"
      && SECTION_1_13_HISTORICAL_SPANISH_OBSERVATIONS[atom.atomId]
      ? "src/tests/classical_lesson1_historical_spanish_semantic_change_jobs.test.js"
      : section === "1.13"
      && SECTION_1_13_CALTECHTLI_OBSERVATIONS[atom.atomId]
      ? "src/tests/classical_lesson1_caltechtli_reanalysis_jobs.test.js"
      : section === "1.13"
      && SECTION_1_13_CUAUHTLAH_OBSERVATIONS[atom.atomId]
      ? "src/tests/classical_lesson1_cuauhtlah_forest_place_jobs.test.js"
      : section === "1.13"
      && SECTION_1_13_TLATIA_LENGTH_OBSERVATIONS[atom.atomId]
      ? "src/tests/classical_lesson1_tlatia_length_contrast_jobs.test.js"
      : section === "1.13"
      && SECTION_1_13_XIMA_OBJECT_EMBED_OBSERVATIONS[atom.atomId]
      ? "src/tests/classical_lesson1_xima_object_embed_jobs.test.js"
      : section === "1.13"
      && SECTION_1_13_TEXOLOUIA_OBSERVATIONS[atom.atomId]
      ? "src/tests/classical_lesson1_texolouia_stone_pestle_jobs.test.js"
      : section === "1.13"
      && SECTION_1_13_CHIMALPOPOCA_OBSERVATIONS[atom.atomId]
      ? "src/tests/classical_lesson1_chimalpopoca_translation_error_jobs.test.js"
      : section === "1.13"
      && SECTION_1_13_ACH_IQUIN_OBSERVATIONS[atom.atomId]
      ? "src/tests/classical_lesson1_ach_iquin_particle_jobs.test.js"
      : section === "1.13"
      && SECTION_1_13_CUI_CUICA_OBSERVATIONS[atom.atomId]
      ? "src/tests/classical_lesson1_cui_cuica_lexicon_jobs.test.js"
      : section === "1.13"
      && SECTION_1_13_DICTIONARY_ROOT_OBSERVATIONS[atom.atomId]
      ? "src/tests/classical_lesson1_dictionary_root_tzatzanatza_jobs.test.js"
      : section === "1.13"
      && SECTION_1_13_DICTIONARY_SEMANTIC_LIMIT_OBSERVATIONS[atom.atomId]
      ? "src/tests/classical_lesson1_dictionary_semantic_limit_jobs.test.js"
      : section === "1.13"
      && SECTION_1_13_TEXT_INTERPRETATION_OBSERVATIONS[atom.atomId]
      ? "src/tests/classical_lesson1_text_interpretation_discipline_jobs.test.js"
      : section === "1.13"
      && SECTION_1_13_TLEH_CLOSING_VOCATIVE_OBSERVATIONS[atom.atomId]
      ? "src/tests/classical_lesson1_tleh_closing_vocative_jobs.test.js"
      : section === "1.13"
      && SECTION_1_13_ADMONITORY_CONTEXT_OBSERVATIONS[atom.atomId]
      ? "src/tests/classical_lesson1_admonitory_context_jobs.test.js"
      : section === "1.13"
      && SECTION_1_13_KING_PRAISE_CONTEXT_OBSERVATIONS[atom.atomId]
      ? "src/tests/classical_lesson1_king_praise_context_jobs.test.js"
      : section === "1.13"
      && SECTION_1_13_TLEH_ADMONITORY_PAIR_OBSERVATIONS[atom.atomId]
      ? "src/tests/classical_lesson1_tleh_admonitory_pair_jobs.test.js"
      : section === "1.13"
      && SECTION_1_13_MISLEADING_TRANSLATION_CONTEXT_OBSERVATIONS[atom.atomId]
      ? "src/tests/classical_lesson1_misleading_translation_context_jobs.test.js"
      : section === "1.13"
      && SECTION_1_13_TARGET_LANGUAGE_DOMINANCE_OBSERVATIONS[atom.atomId]
      ? "src/tests/classical_lesson1_target_language_dominance_jobs.test.js"
      : section === "1.13"
      && SECTION_1_13_EXOTL_OBSERVATIONS[atom.atomId]
      ? "src/tests/classical_lesson1_exotl_jobs.test.js"
      : section === "1.13"
      && SECTION_1_13_TRANSLATION_LOSS_OBSERVATIONS[atom.atomId]
      ? "src/tests/classical_lesson1_translation_loss_jobs.test.js"
      : section === "1.13"
      && SECTION_1_13_ONICIHUAMIC_OBSERVATIONS[atom.atomId]
      ? "src/tests/classical_lesson1_onicihuamic_jobs.test.js"
      : section === "1.13"
      && SECTION_1_13_TRANSLATION_MIRAGE_OBSERVATIONS[atom.atomId]
      ? "src/tests/classical_lesson1_translation_boundary_jobs.test.js"
      : section === "1.12"
      && SECTION_1_12_PARTICIPANT_PLANE_OBSERVATIONS[atom.atomId]
      ? "src/tests/classical_lesson1_participant_planes_jobs.test.js"
      : section === "1.12"
      && SECTION_1_12_CONJUNCTIVE_OBSERVATIONS[atom.atomId]
      ? "src/tests/classical_lesson1_conjunctive_governance_jobs.test.js"
      : section === "1.12"
      && SECTION_1_12_ADJUNCTIVE_OBSERVATIONS[atom.atomId]
      ? "src/tests/classical_lesson1_adjunctive_governance_jobs.test.js"
      : section === "1.12"
      && SECTION_1_12_GOVERNANCE_TAXONOMY_OBSERVATIONS[atom.atomId]
      ? "src/tests/classical_lesson1_governance_taxonomy_jobs.test.js"
      : section === "1.12"
      && SECTION_1_12_OPENING_OBSERVATIONS[atom.atomId]
      ? "src/tests/classical_lesson1_structure_principles_jobs.test.js"
      : section === "1.11"
      && SECTION_1_11_2_GROUP_SYNTAX_OBSERVATIONS[atom.atomId]
      ? "src/tests/classical_lesson1_group_syntax_jobs.test.js"
      : section === "1.11"
      && SECTION_1_11_2_TRANSITION_OBSERVATIONS[atom.atomId]
      ? "src/tests/classical_lesson1_transition_zone_jobs.test.js"
      : section === "1.11"
      && SECTION_1_11_2_STEM_OBSERVATIONS[atom.atomId]
      ? "src/tests/classical_lesson1_stem_formation_jobs.test.js"
      : section === "1.11"
      && SECTION_1_11_2_HIERARCHY_OBSERVATIONS[atom.atomId]
      ? "src/tests/classical_lesson1_meaningful_hierarchy_jobs.test.js"
      : section === "1.11"
      && SECTION_1_11_2_AFFIX_OBSERVATIONS[atom.atomId]
      ? "src/tests/classical_lesson1_meaningful_affix_jobs.test.js"
      : section === "1.11" && SECTION_1_11_1_OBSERVATIONS[atom.atomId]
      ? "src/tests/classical_lesson1_meaningless_structure_jobs.test.js"
      : section === "1.11" && observationKind
      ? "src/tests/classical_lesson1_combining_foundation_jobs.test.js"
      : section === "1.10"
      ? "src/tests/classical_lesson1_level_matrix_jobs.test.js"
      : section === "1.9"
      ? "src/tests/classical_lesson1_instance_jobs.test.js"
      : section === "1.8"
      ? "src/tests/classical_lesson1_token_jobs.test.js"
      : section === "1.7"
      ? "src/tests/classical_lesson1_morpheme_jobs.test.js"
      : section === "1.6"
      ? "src/tests/classical_lesson1_element_jobs.test.js"
      : section === "1.5"
        ? "src/tests/classical_lesson1_analysis_level_jobs.test.js"
      : section === "1.4"
        ? "src/tests/classical_lesson1_communication_jobs.test.js"
      : section === "1.3"
        ? "src/tests/classical_lesson1_terminology_jobs.test.js"
            : "src/tests/classical_lesson1_foundation.test.js";
    return Object.freeze({
      atomId: atom.atomId,
      canvasSection: atom.canvasSection,
      canvasSpan: atom.canvasSpan,
      meaning: atom.meaning,
      sourceForce: atom.force,
      sourceCategory: atom.category,
      jobType,
      jobFamily,
      directions,
      directionClass,
      writingRole: directions.includes("WRITING") ? applicationDirection : "",
      readerInterpreterRole: "GUIDES_READER_AND_INTERPRETER",
      directionStatus: Object.freeze({
        WRITING: directions.includes("WRITING")
          ? "EXACTLY_OBSERVED"
          : "NOT_APPLICABLE",
        READING_AND_INTERPRETATION: EXACTLY_PRESENTED_READER_ATOMS.has(atom.atomId)
          ? "EXACTLY_PRESENTED"
          : "JOB_ASSIGNED_NOT_YET_PRESENTED",
      }),
      targetOwnerId,
      relatedGrammarOwnerId: atom.force === "grammar-bearing"
        ? atom.semanticOwnerId || ""
        : relatedGrammarOwnerId === jobFamily ? "" : relatedGrammarOwnerId,
      normalApplicationRequirement: directionalRequirementFor({
        applicationDirection,
        jobType,
        jobFamily,
        meaning: atom.meaning,
      }),
      observationKind,
      observationTest: accepted
        ? `${observationTestFile}#${atom.atomId}`
        : "",
      mutationTest: accepted
        ? `${observationTestFile}#mutation:${observationKind}`
        : "",
      ...(EXACTLY_PRESENTED_READER_ATOMS.has(atom.atomId) ? {
        readerObservationTest:
          `src/tests/classical_lesson1_reader_guidance.test.js#${atom.atomId}`,
        readerMutationTest:
          `src/tests/classical_lesson1_reader_guidance.test.js#mutation:${atom.atomId}`,
      } : {}),
      acceptanceStatus: accepted
        ? applicationDirection === "GUIDES_READER_AND_INTERPRETER"
          ? "accepted-reader-interpreter-guidance-observed"
          : "exactly-observed-normal-application-behavior"
        : "job-assigned-not-yet-accepted",
    });
  });
  const countsByJob = Object.fromEntries(Object.values(JOB_TYPES).map(
    (jobType) => [jobType, records.filter((record) => record.jobType === jobType).length],
  ));
  const acceptedRecords = records.filter((record) => (
    record.acceptanceStatus === "exactly-observed-normal-application-behavior"
    || record.acceptanceStatus === "accepted-reader-interpreter-guidance-observed"
  ));
  const acceptedByJob = Object.fromEntries(Object.values(JOB_TYPES).map(
    (jobType) => [
      jobType,
      acceptedRecords.filter((record) => record.jobType === jobType).length,
    ],
  ));
  return {
    schemaVersion: 4,
    kind: "classical-nahuatl-lesson1-atom-job-ledger",
    source: "ANDREWS_TRANSCRIPTION_CANVAS.md",
    rule: "Every Lesson 1 atom receives one real project job before implementation credit is possible.",
    counts: {
      lesson1Atoms: records.length,
      assignedJobs: records.length,
      acceptedJobs: acceptedRecords.length,
      pendingJobs: records.length - acceptedRecords.length,
      unassignedJobs: records.filter((record) => !record.jobType || !record.jobFamily).length,
      byJobType: countsByJob,
      acceptedByJobType: acceptedByJob,
      byWritingRole: Object.fromEntries([
        "WRITES_OR_CONTROLS_RESULT",
        "BUILDS_WRITING_MODEL",
        "CHECKS_WRITING_GRAMMAR",
        "PROTECTS_WRITING_GRAMMAR",
      ].map((role) => [
        role,
        records.filter((record) => record.writingRole === role).length,
      ])),
      byDirectionClass: Object.fromEntries([
        "WRITING_ONLY",
        "READING_ONLY",
        "BOTH",
      ].map((directionClass) => [
        directionClass,
        records.filter((record) => record.directionClass === directionClass).length,
      ])),
      byDirection: {
        WRITING: records.filter((record) => record.directions.includes("WRITING")).length,
        READING_AND_INTERPRETATION: records.filter((record) => (
          record.directions.includes("READING_AND_INTERPRETATION")
        )).length,
      },
      byReaderStatus: {
        EXACTLY_PRESENTED: records.filter((record) => (
          record.directionStatus.READING_AND_INTERPRETATION === "EXACTLY_PRESENTED"
        )).length,
        JOB_ASSIGNED_NOT_YET_PRESENTED: records.filter((record) => (
          record.directionStatus.READING_AND_INTERPRETATION
            === "JOB_ASSIGNED_NOT_YET_PRESENTED"
        )).length,
      },
    },
    invariants: {
      ledgerAuthorizesGrammar: false,
      storedWordingCountsAsImplementation: false,
      evidenceAuthorizesGrammar: false,
      evidenceAbsenceBlocksGrammar: false,
      everyWritingJobRequiresNormalApplicationBehavior: true,
      readerInterpreterGuidanceDoesNotAuthorizeOrComposeResult: true,
      directionIsSeparateFromJob: true,
      oneAtomMayServeBothDirections: true,
      assignedReaderJobDoesNotClaimUserPresentation: true,
    },
    records,
  };
}

const ledger = buildLedger();
const rendered = `${JSON.stringify(ledger, null, 2)}\n`;
if (WRITE) {
  fs.writeFileSync(OUTPUT_PATH, rendered, "utf8");
  process.stdout.write(`wrote ${path.relative(ROOT, OUTPUT_PATH)} with ${ledger.counts.lesson1Atoms} jobs\n`);
} else {
  if (!fs.existsSync(OUTPUT_PATH)) {
    throw new Error(`missing generated ledger: ${path.relative(ROOT, OUTPUT_PATH)}`);
  }
  const current = fs.readFileSync(OUTPUT_PATH, "utf8");
  if (current !== rendered) {
    throw new Error("Lesson 1 job ledger is out of date; run with --write");
  }
  process.stdout.write(`Lesson 1 job ledger is current: ${ledger.counts.lesson1Atoms} jobs\n`);
}
