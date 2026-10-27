import {snapshotGrammarInputs} from "../input_snapshot.mjs";
import {reduplicate} from "./reduplicative_realization.mjs";
import {CLASSICAL_NAHUATL_VNC_SEMANTIC_MOODS, CLASSICAL_NAHUATL_VNC_SEMANTIC_TENSES_BY_MOOD} from "./vnc_layer_evaluator.mjs?andrewsRelease=20261024-1";

// Canonical Andrews-only denominal VNC grammar.
//
// This module owns executable semantic structure. Exact Canvas spans, claim
// dispositions, coverage counts, and witnesses remain in tests/docs.

const VERSION = 1;
const GCD_ID =
  "classical-denominal-vnc:typed-nnc-source>licensed-verbalization>participant-projection>class-boundary>finite-vnc";
const LCM_ID =
  "classical-denominal-vnc:complete-licensed-distinction-space";

const HOSTILE_AUTHORITY_KEYS = Object.freeze([
  "answer",
  "authorizationStatus",
  "canvasAnswer",
  "derivedClass",
  "derivedStem",
  "displayFormula",
  "displayText",
  "formula",
  "formulaArtifact",
  "generationAllowed",
  "lesson",
  "lessonMetadata",
  "result",
  "selectedFormula",
  "sourceAuthority",
  "surface",
  "surfaceArtifact",
  "targetClass",
  "targetStem",
]);
const PATH_INVENTORY_SELECTION_KEYS = Object.freeze([
  "classChoice",
  "classChoices",
  "operationId",
  "operationPath",
  "selectedOperationId",
  "sourceOperationFrame",
]);
const EXACT_NNC_SOURCE_REQUEST_FIELDS = Object.freeze([
  "nounStem",
  "sourceNounStem",
  "sourceNounClass",
  "sourceStem",
  "nounRoot",
  "sourceVerbStem",
  "sourceKind",
  "sourceState",
  "possessor",
  "sourceSubject",
  "sourceSubjectPerson",
  "sourceSubjectAnimacy",
  "sourceSubjectHumanness",
  "sourceSubjectNumber",
  "sourceObjectRequests",
  "objectRequests",
  "includedPossessorFamily",
  "sourceInitialISelection",
  "sourceInitialIKind",
  "numeralStem",
  "timeMatrix",
  "sourceOperationFrame",
]);

const VOWELS = "aāeēiīoō";
const TIME_MATRICES = Object.freeze(["ilhui", "yohua-l", "mētz", "xihui"]);
const INCLUDED_POSSESSOR_FAMILIES = Object.freeze([
  "proxy",
  "recompense",
  "misfortune",
  "temporal-pan",
]);
// Known Source meanings are facts, not interchangeable operation modes.
// The ordinary semantic families remain productive for analyzed Sources;
// the special misfortune and relational-pan types keep their lexical limits.
const INCLUDED_POSSESSOR_SOURCE_MEANINGS = new Map([
  ["ixxiptla", "proxy"], ["huihhui", "proxy"], ["patillō", "proxy"],
  ["icnōpil", "recompense"], ["ilhuil", "recompense"], ["mahcēhual", "recompense"],
  ["tlahuēlil", "misfortune"], ["centzontlahuēlil", "misfortune"],
  ["pan", "temporal-pan"],
]);
const SOURCE_PROJECTED_DOUBLE_OBJECT_OPERATION_IDS = Object.freeze([
  "ti-a-causative-double-inceptive",
  "ti-a-causative-double-possession",
  "applicative-huia-double-object",
]);
const INTRANSITIVE_TLA_STEMS = Object.freeze(["ilhui", "xō", "tla"]);
const DESTOCKAL_YA_STEMS = Object.freeze([
  "tlap-i-hui",
  "cuetl-ā-hui",
  "cōz-ā-hui",
  "yam-ā-ni",
  "to-tō-ni",
]);
const CAUSATIVE_TLA_STEMS = Object.freeze([
  "mahui-z",
  "pā",
  "pa",
  "xapo",
  "icn-iuh",
  "icn-īuh",
  "tla-zo-h",
  "yāō",
  "ih-zō",
]);
const INSTRUMENTAL_AZ_NOUNSTEMS = Object.freeze([
  "te-nām-āz", "tepon-āz", "tzō-tzop-āz", "ma-tzō-tzop-āz",
  "tzi-tzic-āz", "tle-hcu-āz", "pi-āz", "ā-pi-āz", "te-ā-pi-āz",
  "mamal-hu-āz", "māma-l-hu-āz", "tla-pi-pi-l-hu-āz",
  "cuauh-tla-pi-pī-l-hu-āz", "ā-pi-pi-l-hu-āz",
  "te-ā-pi-l-hu-āz", "ā-yōl-hu-āz", "ā-ol-hu-āz",
  "tla-tze-tzel-hu-āz", "tla-ht-ō-l-hu-āz", "tla-hcal-hu-āz",
  "te-hcuil-hu-āz", "neh-ne-hcuil-hu-āz", "tzon-hu-āz",
  "tla-chpān-hu-az", "tla-chpān-hu-āz", "ehca-hu-āz",
  "cuauh-ehca-hu-āz", "me-ca-ehca-hu-āz", "cuauh-pana-hu-āz",
  "cuap-pana-hu-āz", "tzicua-hu-āz", "tzica-hu-āz",
]);
const INTRANSITIVE_O_A_USE_STEMS = Object.freeze([
  "āyacach",
  "qui-quiz",
  "nacaz",
  "chol",
  "cama-chāl",
  "cuic-ō-yā-n",
  "tih-tiānquiz",
  "tōl",
  "tōz",
  "eucx",
  "aucx",
  "iucx",
  "īl",
  "pa-t",
  "tepon-āz",
  "tla-pi-āz",
]);
const INTRANSITIVE_O_A_PRODUCE_STEMS = Object.freeze(["tamal", "tla-xca-l"]);
const APPLICATIVE_HUIA_PRODUCE_STEMS = Object.freeze(["cē-hua-l", "tla-xca-l"]);
const HYPOTHETICAL_I_L_HUIA_STEMS = Object.freeze(["tepon-āz"]);
const TI_IA_APPLICATIVE_SOURCE_STEMS = Object.freeze(["cuica-ti", "nāhua-ti"]);
const ADVERBIAL_HUIA_STEMS = Object.freeze([
  "ilihuiz",
  "no-h-mah",
  "nōncuah",
  "m-0-ahci-0-cā",
]);
const RELATIONAL_O_A_TRANSITIVE_STEMS = Object.freeze([
  "quech-pan",
  "ne-tech",
  "cal-pan",
  "tequi-pan",
]);
const RELATIONAL_O_A_INTRANSITIVE_STEMS = Object.freeze(["tequi-pan"]);
const RELATIONAL_HUIA_STEMS = Object.freeze([
  "quech-pan",
  "ne-tech",
  "icxi-pan",
  "icxi-tlān",
  "icxi-ne-tech",
  "ach-to-pa",
  "cuauh-t-icpa-c",
]);
const LIMITED_INCEPTIVE_A_STEMS = Object.freeze(["tlāhui", "oh-hui"]);
// Lexical rank and formation facts, not a completed noun or a stored output.
// §16.7 supplies bound ix- 'total'; §54.2.2 attests its hui formation and
// contrasts direct causative tiā with the productive hui-ya → liā route.
const BOUND_NOMINAL_SOURCE_ANALYSES = Object.freeze({
  ix: Object.freeze({meaning: "total", sourceRank: "bound-nominal-stem",
    initialIKind: "supportive", initialIAnalysisScope: "attested-denominal-hui-formation-and-its-continuations", initialOperationIds: Object.freeze(["inceptive-hui"]),
    directHuiCausative: "tiā", sourceAuthority: "Andrews §§16.7, 54.2.2; original printed p.570 italic i"}),
});
const I_HUI_CAUSATIVE_SOURCE_STEMS = Object.freeze([
  "tlīl",
  "tamal",
  "cuetl-a-x",
  "tepi-tōn",
  "hueh-ca-pan",
]);
const A_HUI_CAUSATIVE_SOURCE_STEMS = Object.freeze(["pil-i-ch"]);
const TRANSITIVE_IA_SOURCE_STEMS = Object.freeze([
  "tēm-mach",
  "tla-h-mach",
  "tle-quech",
  "ā-l-pich",
  "tla-quech",
  "ah-huach",
  "peh-pech",
  "chāl",
  "tlāl",
  "icn-ēl",
  "tlahu-ēl",
  "izcal",
  "ocuil",
  "toc",
  "i-tō-n",
]);
const PATIENTIVE_CHAIN_SOURCES = Object.freeze({
  "il-o-ā": "il-ō-ch-ti-ā",
  "cōl-o-ā": "cōl-ō-ch-ti-ā",
  "tlal-o-ā": "tlal-ō-ch-ti-ā",
});

function deepFreeze(value, seen = new WeakSet()) {
  if (!value || typeof value !== "object" || seen.has(value) || Object.isFrozen(value)) {
    return value;
  }
  seen.add(value);
  Object.values(value).forEach(entry => deepFreeze(entry, seen));
  return Object.freeze(value);
}

function text(value = "") {
  if (
    typeof value !== "string"
    && !(typeof value === "number" && Number.isFinite(value))
  ) return "";
  return String(value).normalize("NFC").trim();
}

function key(value = "") {
  return text(value).toLowerCase().replace(/[()[\]{}#]/gu, "").replace(/⎕/gu, "0");
}

function normalizeStem(value = "") {
  const stem = key(value)
    .replace(/\s+/gu, "")
    .replace(/^-+|-+$/gu, "")
    .replace(/--+/gu, "-");
  return /^[\p{L}\p{M}0-]+$/u.test(stem) ? stem : "";
}

function compactStem(value = "") {
  return normalizeStem(value).replace(/-/gu, "");
}

function lastSound(value = "") {
  return Array.from(compactStem(value)).at(-1) || "";
}

function isVowel(value = "") {
  return new RegExp(`^[${VOWELS}]$`, "u").test(key(value));
}

function join(...parts) {
  return parts.map(normalizeStem).filter(Boolean).join("-");
}

function stripFinalMorpheme(stem = "", morpheme = "") {
  const source = normalizeStem(stem);
  const suffix = normalizeStem(morpheme);
  if (!source || !suffix) return "";
  if (source === suffix) return "";
  return source.endsWith(`-${suffix}`)
    ? source.slice(0, -(suffix.length + 1))
    : "";
}

function findHostileAuthorityPath(
  value,
  path = "request",
  seen = new WeakSet(),
  ignoredFields = new Set()
) {
  const valueType = typeof value;
  if (
    !value
    || (valueType !== "object" && valueType !== "function")
    || seen.has(value)
  ) return "";
  seen.add(value);
  for (const propertyKey of Reflect.ownKeys(value)) {
    if (typeof propertyKey !== "string") {
      return `${path}.[symbol]`;
    }
    const field = propertyKey;
    const nextPath = `${path}.${field}`;
    const descriptor = Object.getOwnPropertyDescriptor(value, field);
    if (!descriptor || !Object.prototype.hasOwnProperty.call(descriptor, "value")) {
      return nextPath;
    }
    if (ignoredFields.has(field)) continue;
    const entry = descriptor.value;
    if (HOSTILE_AUTHORITY_KEYS.includes(field)
      && entry !== undefined
      && entry !== null
      && entry !== "") {
      return nextPath;
    }
    if (entry && (typeof entry === "object" || typeof entry === "function")) {
      const nested = findHostileAuthorityPath(entry, nextPath, seen);
      if (nested) return nested;
    }
  }
  return "";
}

function operationSpec({
  id,
  family,
  label,
  sourceKind,
  sourceState = "absolutive",
  classPolicy,
  objectCount = 0,
  continuationOf = [],
  semanticReadings = [],
  limited = false,
  lexical = false,
  attestation = "attested",
}) {
  return deepFreeze({
    id,
    family,
    label,
    sourceKind,
    sourceState,
    classPolicy,
    objectCount,
    continuationOf,
    semanticReadings,
    limited,
    lexical,
    attestation,
  });
}

const OPERATION_SPECS = Object.freeze([
  operationSpec({ id: "inceptive-ti", family: "inceptive-ti", label: "inceptive/stative ti", sourceKind: "nounstem", classPolicy: "ti-by-source-final", semanticReadings: ["become", "become-like", "be"] }),
  operationSpec({ id: "inceptive-hui", family: "inceptive-hui", label: "inceptive/stative hui", sourceKind: "nounstem", classPolicy: "hui-by-source-final", semanticReadings: ["become", "become-like", "be"], limited: true }),
  operationSpec({ id: "inceptive-root-ya", family: "root-ya", label: "nounroot plus ya", sourceKind: "nounroot-or-stem-as-root", classPolicy: "ya-a-or-b", semanticReadings: ["become", "become-like", "be"] }),
  operationSpec({ id: "inceptive-ti-ya", family: "ti-ya", label: "deverbal ti-ya", sourceKind: "generated-vnc", sourceState: "derived", classPolicy: "ya-a-or-b", continuationOf: ["inceptive-ti"] }),
  operationSpec({ id: "inceptive-hui-ya", family: "hui-ya", label: "deverbal hui-ya", sourceKind: "generated-vnc", sourceState: "derived", classPolicy: "fixed-b", continuationOf: ["inceptive-hui"] }),
  operationSpec({ id: "destockal-ya", family: "destockal-ya", label: "destockal ni/hui plus ya", sourceKind: "destockal-ni-hui-vnc", sourceState: "derived", classPolicy: "fixed-b" }),
  operationSpec({ id: "inceptive-a", family: "inceptive-a", label: "limited inceptive/stative ā", sourceKind: "nounstem", classPolicy: "fixed-c", limited: true, lexical: true }),
  operationSpec({ id: "deverbal-yo-hua", family: "deverbal-yo-hua", label: "deverbal yō nounstem plus hua", sourceKind: "deverbal-yo-nounstem", classPolicy: "fixed-a", semanticReadings: ["become-filled", "become-covered"] }),
  operationSpec({ id: "included-possessor-ti", family: "included-possessor-ti", label: "included possessor plus ti", sourceKind: "possessive-nnc-predicate", sourceState: "possessive", classPolicy: "fixed-a", lexical: true }),
  operationSpec({ id: "possession-ti", family: "possession-ti", label: "ti of possession", sourceKind: "nounstem", classPolicy: "ti-by-source-final", semanticReadings: ["have", "possess"] }),
  operationSpec({ id: "ti-hui-lia-causative", family: "ti-hui-lia-causative", label: "single-object liā causative", sourceKind: "generated-vnc", sourceState: "derived", classPolicy: "fixed-c", objectCount: 1, continuationOf: ["inceptive-ti", "inceptive-hui", "possession-ti"] }),
  operationSpec({ id: "ya-lia-causative", family: "ya-lia-causative", label: "delete ya and add liā causative", sourceKind: "generated-vnc", sourceState: "derived", classPolicy: "fixed-c", objectCount: 1, continuationOf: ["inceptive-root-ya", "inceptive-ti-ya", "inceptive-hui-ya"] }),
  operationSpec({ id: "ya-lia-applicative", family: "ya-lia-applicative", label: "delete ya and add liā applicative", sourceKind: "generated-vnc", sourceState: "derived", classPolicy: "fixed-c", objectCount: 1, continuationOf: ["inceptive-root-ya", "inceptive-ti-ya", "inceptive-hui-ya"], limited: true }),
  operationSpec({ id: "destockal-a-causative", family: "destockal-a-causative", label: "source ni/hui plus causative ā", sourceKind: "destockal-ni-hui-vnc", sourceState: "derived", classPolicy: "fixed-c", objectCount: 1 }),
  operationSpec({ id: "ti-a-causative-single", family: "ti-a-causative-single", label: "first-type single-object causative a", sourceKind: "generated-vnc", sourceState: "derived", classPolicy: "first-type-single-causative", objectCount: 1, continuationOf: ["inceptive-ti", "inceptive-hui", "possession-ti", "included-possessor-ti"] }),
  operationSpec({ id: "ti-a-causative-double-inceptive", family: "ti-a-causative-double-inceptive", label: "first-type double-object inceptive ti-ā", sourceKind: "possessive-nnc-predicate", sourceState: "possessive", classPolicy: "fixed-c", objectCount: 2 }),
  operationSpec({ id: "ti-a-causative-double-possession", family: "ti-a-causative-double-possession", label: "first-type double-object possession ti-ā", sourceKind: "possessive-nnc-predicate", sourceState: "possessive", classPolicy: "fixed-c", objectCount: 2 }),
  operationSpec({ id: "patientive-chain-ti-a", family: "patientive-chain-ti-a", label: "o-ā through patientive nounstem to ti-ā", sourceKind: "lexical-o-a-vnc", sourceState: "derived", classPolicy: "fixed-c", objectCount: 1, lexical: true, limited: true }),
  operationSpec({ id: "ti-ia-applicative", family: "ti-ia-applicative", label: "replace final i of ti and add iā", sourceKind: "generated-vnc", sourceState: "derived", classPolicy: "fixed-c", objectCount: 1, continuationOf: ["inceptive-ti", "possession-ti"], limited: true }),
  operationSpec({ id: "temporal-tia", family: "temporal-tia", label: "temporal intransitive tiā", sourceKind: "temporal-compound-nounstem", classPolicy: "fixed-c" }),
  operationSpec({ id: "denominal-causative-tla", family: "causative-tla", label: "denominal causative tla", sourceKind: "nounstem", classPolicy: "fixed-a", objectCount: 1, limited: true }),
  operationSpec({ id: "causative-tla-ti-lia-applicative", family: "tla-ti-lia-applicative", label: "replace causative tla with ti-liā", sourceKind: "generated-vnc", sourceState: "derived", classPolicy: "fixed-c", objectCount: 2, continuationOf: ["denominal-causative-tla"] }),
  operationSpec({ id: "intransitive-tla", family: "intransitive-tla", label: "limited intransitive tla", sourceKind: "nounstem", classPolicy: "fixed-a", limited: true, lexical: true }),
  operationSpec({ id: "intransitive-tla-ti-a-causative", family: "intransitive-tla-ti-a", label: "replace intransitive tla with ti-ā", sourceKind: "generated-vnc", sourceState: "derived", classPolicy: "fixed-c", objectCount: 1, continuationOf: ["intransitive-tla"] }),
  operationSpec({ id: "intransitive-tla-ti-lia-applicative", family: "intransitive-tla-ti-lia", label: "replace intransitive tla with ti-liā", sourceKind: "generated-vnc", sourceState: "derived", classPolicy: "fixed-c", objectCount: 2, continuationOf: ["intransitive-tla"] }),
  operationSpec({ id: "intransitive-o-a-use", family: "intransitive-o-a", label: "intransitive o-ā: use or apply", sourceKind: "nounstem", classPolicy: "fixed-c", semanticReadings: ["use-apply"], limited: true }),
  operationSpec({ id: "intransitive-o-a-produce", family: "intransitive-o-a", label: "intransitive o-ā: produce", sourceKind: "nounstem", classPolicy: "fixed-c", semanticReadings: ["produce"], limited: true }),
  operationSpec({ id: "applicative-huia-use", family: "applicative-huia", label: "huiā applicative: use or apply", sourceKind: "nounstem", classPolicy: "fixed-c", objectCount: 1, semanticReadings: ["use-apply"] }),
  operationSpec({ id: "applicative-huia-produce", family: "applicative-huia", label: "huiā applicative: produce for", sourceKind: "nounstem", classPolicy: "fixed-c", objectCount: 1, semanticReadings: ["produce-for"], limited: true }),
  operationSpec({ id: "applicative-huia-double-object", family: "applicative-huia-double", label: "possessive-source two-object huiā", sourceKind: "possessive-nnc-predicate", sourceState: "possessive", classPolicy: "fixed-c", objectCount: 2, lexical: true, limited: true }),
  operationSpec({ id: "o-a-to-i-l-huia", family: "o-a-to-il-huia", label: "o-ā to hypothetical i-hui to i-l-huiā", sourceKind: "generated-vnc", sourceState: "derived", classPolicy: "fixed-c", objectCount: 1, continuationOf: ["intransitive-o-a-use", "intransitive-o-a-produce"], limited: true }),
  operationSpec({ id: "o-a-to-a-l-huia", family: "o-a-to-al-huia", label: "o-ā to hypothetical a-hui to a-l-huiā", sourceKind: "generated-vnc", sourceState: "derived", classPolicy: "fixed-c", objectCount: 1, continuationOf: ["intransitive-o-a-use", "intransitive-o-a-produce"], limited: true, attestation: "category-only" }),
  operationSpec({ id: "adverbial-huia", family: "adverbial-huia", label: "adverbial nounstem plus huiā", sourceKind: "adverbial-nounstem", classPolicy: "fixed-c", objectCount: 1, lexical: true }),
  operationSpec({ id: "relational-o-a-transitive", family: "relational-o-a", label: "relational-matrix o-ā transitive", sourceKind: "relational-compound-or-predicate", classPolicy: "fixed-c", objectCount: 1, lexical: true }),
  operationSpec({ id: "relational-o-a-intransitive", family: "relational-o-a", label: "exceptional relational-matrix o-ā intransitive", sourceKind: "relational-compound-or-predicate", classPolicy: "fixed-c", lexical: true, limited: true }),
  operationSpec({ id: "relational-huia", family: "relational-huia", label: "relational-matrix huiā applicative", sourceKind: "relational-compound-or-predicate", classPolicy: "fixed-c", objectCount: 1, lexical: true }),
  operationSpec({ id: "denominal-i-hui", family: "denominal-i-hui", label: "denominal i-hui intransitive", sourceKind: "nounstem", classPolicy: "fixed-b" }),
  operationSpec({ id: "denominal-a-hui", family: "denominal-a-hui", label: "denominal a-hui intransitive", sourceKind: "nounstem", classPolicy: "fixed-b" }),
  operationSpec({ id: "i-hui-to-o-a", family: "i-hui-to-o-a", label: "causative o-ā from generated i-hui", sourceKind: "generated-vnc", sourceState: "derived", classPolicy: "fixed-c", objectCount: 1, continuationOf: ["denominal-i-hui"] }),
  operationSpec({ id: "a-hui-to-o-a", family: "a-hui-to-o-a", label: "causative o-ā from generated a-hui", sourceKind: "generated-vnc", sourceState: "derived", classPolicy: "fixed-c", objectCount: 1, continuationOf: ["denominal-a-hui"] }),
  operationSpec({ id: "transitive-i-a", family: "transitive-i-a", label: "restricted transitive denominal i-ā", sourceKind: "nounstem-plus-stock-i", classPolicy: "fixed-c", objectCount: 1, lexical: true, limited: true }),
]);

const OPERATION_BY_ID = new Map(OPERATION_SPECS.map(spec => [spec.id, spec]));

const LCM_AXES = Object.freeze([
  ["source-rank", "nounroot, nounstem, NNC predicate, or generated VNC source"],
  ["source-state", "absolutive versus possessive source state"],
  ["source-complexity", "simple, derived, compound, numeral, pronominal, agentive, adverbial, or relational source"],
  ["source-attestation", "productive, limited, lexical, or unattested source"],
  ["source-num1-retention", "exceptional possessive num1 retained inside the source"],
  ["source-possessor-retention", "included possessor remains possessive inside the verbstem"],
  ["source-possessor-transformation", "possessor becomes an applicative object in double-object ti-ā"],
  ["source-subject-transformation", "source NNC subject becomes a causative object in double-object ti-ā"],
  ["inceptive-ti", "inceptive or stative ti"],
  ["inceptive-hui", "less productive inceptive or stative hui"],
  ["root-ya", "nounroot or downgraded nounstem plus ya"],
  ["ti-ya", "deverbal ti plus ya"],
  ["hui-ya", "deverbal hui plus ya"],
  ["destockal-ya", "destockal ni or hui plus ya"],
  ["inceptive-a", "limited intransitive ā distinct from causative ā"],
  ["deverbal-yo-hua", "deverbal yō nounstem plus hua"],
  ["included-possessor-ti", "possessive predicate plus included possessor plus ti"],
  ["possession-ti", "homophonous possession ti distinct from inceptive ti"],
  ["ti-class-by-source-final", "consonant source A; vowel source A or B"],
  ["hui-class-by-source-final", "consonant source A; vowel source B"],
  ["ya-class", "ya source A, B, or both; B perfective y to x or z"],
  ["hua-class", "hua source Class A despite spelling confusion with o-ā"],
  ["lia-causative", "single-object second-type liā from ti or hui"],
  ["ya-replacement-lia", "delete ya before causative or applicative liā"],
  ["destockal-causative-source", "causative uses ni or hui source rather than the preferred ya finite stem"],
  ["ti-a-single", "first-type single-object ti-ā"],
  ["ti-a-double", "first-type double-object ti-ā from a possessive source"],
  ["patientive-chain", "o-ā through patientive nounstem and ti to causative ti-ā"],
  ["tia-homophony", "t-iā, ti-ā, and connective tiā remain distinct typed operations"],
  ["ti-ia-applicative", "replacive ti stem without final i plus applicative iā"],
  ["temporal-tia", "unitary intransitive tiā on numeral plus time-segment compounds"],
  ["causative-tla", "Class A denominal causative tla"],
  ["causative-tla-applicative", "replace tla with ti before liā"],
  ["intransitive-tla", "very limited intransitive tla distinct from causative tla"],
  ["intransitive-tla-continuations", "replace intransitive tla with ti before ā or liā"],
  ["intransitive-o-a", "Class C intransitive o-ā whose ā is not causative"],
  ["oa-use-reading", "use or apply the noun entity"],
  ["oa-production-reading", "produce the noun entity"],
  ["applicative-huia", "Class C single-object huiā counterpart"],
  ["huia-double-object", "limited possessive-source huiā with two objects"],
  ["oa-hypothetical-source", "o-ā to i-l-huiā or a-l-huiā through a hypothetical intransitive source"],
  ["adverbial-huia", "adverbialized nounstem plus huiā"],
  ["relational-o-a", "relational-matrix o-ā, usually transitive and exceptionally intransitive"],
  ["relational-huia", "relational-matrix single-object huiā"],
  ["denominal-i-hui", "nounstem plus i-hui, Class B"],
  ["denominal-a-hui", "nounstem plus a-hui, Class B"],
  ["ihui-ahui-causative", "generated i-hui or a-hui source to causative o-ā, Class C"],
  ["ihui-no-causative", "some i-hui or a-hui stems lack a causative counterpart"],
  ["transitive-i-a", "restricted nounstem plus stock i plus causative ā with no intransitive counterpart"],
  ["ia-source-analysis", "w-final huiā ambiguity, nounstem-final i, and i-hui-source alternatives"],
  ["valence", "intransitive, single-object, or double-object result"],
  ["finite-class", "Class A, B, or C realization"],
  ["scalar-paradigm-identity", "prepared coordinates equal scalar canonical VNC evaluation"],
  ["authority-boundary", "lesson metadata, formulas, surfaces, and caller targets never authorize generation"],
].map(([axisId, description]) => deepFreeze({ axisId, description })));

export const CLASSICAL_NAHUATL_DENOMINAL_VNC_GCD = deepFreeze({
  identityId: GCD_ID,
  stageOrder: [
    "typed-nnc-source",
    "licensed-denominal-operation",
    "participant-valence-projection",
    "class-boundary-realization",
    "finite-vnc-result",
  ],
  smallestSharedInvariant:
    "A typed nominal source is consumed by one licensed verbalization; its participants and valence are projected before the canonical VNC class and boundary machinery realizes a finite result.",
});

export const CLASSICAL_NAHUATL_DENOMINAL_VNC_LCM = deepFreeze({
  identityId: LCM_ID,
  routeCount: OPERATION_SPECS.length,
  attestedRouteCount: OPERATION_SPECS.filter(spec => spec.attestation === "attested").length,
  categoryOnlyRouteCount: OPERATION_SPECS.filter(spec => spec.attestation === "category-only").length,
  axes: LCM_AXES,
  operations: OPERATION_SPECS,
});

function blocked(kind, blockReason, extra = {}) {
  return deepFreeze({
    kind,
    version: VERSION,
    authorizationStatus: "blocked",
    blockReason,
    typedGrammarAuthority: true,
    callerSuppliedAuthorityAccepted: false,
    lessonMetadataAuthority: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
    ...extra,
  });
}

function normalizePossessor(value = "") {
  const normalized = key(value).replace(/-/gu, "");
  return ({
    "1sg": "n-o",
    "2sg": "m-o",
    "3sg": "i",
    "3common": "i",
    "1pl": "t-o",
    "2pl": "am-o",
    "3pl": "i-m",
    te: "tē",
    tla: "tla",
    no: "n-o",
    mo: "m-o",
    "i0": "i",
    to: "t-o",
    amo: "am-o",
    im: "i-m",
    tē: "tē",
  })[normalized] || "";
}

function normalizePerson(value = "") {
  const normalized = key(value);
  return ["1sg", "2sg", "3sg", "3common", "1pl", "2pl", "3pl"].includes(normalized)
    ? normalized
    : "";
}

function hasMaterialRequestValue(value) {
  if (Array.isArray(value)) return value.length > 0;
  if (value && typeof value === "object") return true;
  return value !== undefined && value !== null && value !== "";
}

function normalizeSourceRequest(request = {}, exactNncBinding = null) {
  const exact = exactNncBinding?.authorizationStatus === "authorized";
  const exactPossessor = exact ? exactNncBinding.possessor : request.possessor;
  const possessorPerson = normalizePerson(exactPossessor);
  return deepFreeze({
    nounStem: exact
      ? exactNncBinding.nounStem
      : normalizeStem(request.nounStem || request.sourceNounStem || request.sourceStem),
    nounRoot: exact ? exactNncBinding.nounRoot : normalizeStem(request.nounRoot),
    sourceVerbStem: exact
      ? exactNncBinding.sourceVerbStem
      : normalizeStem(request.sourceVerbStem),
    sourceKind: exact
      ? exactNncBinding.sourceKind
      : key(request.sourceKind || "nounstem"),
    sourceState: exact
      ? exactNncBinding.sourceState
      : key(request.sourceState || "absolutive"),
    possessor: normalizePossessor(exactPossessor),
    possessorPerson,
    includedPossessorFamily: exact
      ? ""
      : key(request.includedPossessorFamily),
    includedPossessorSourceAnalysis: request.includedPossessorSourceAnalysis || null,
    sourceIdentityStem: exact
      && exactNncBinding.canonicalNncSourceProjection?.stemOperation?.predicateFormation === "source-stem"
      ? normalizeStem(exactNncBinding.canonicalNncSourceProjection.sourceIdentityStem)
      : exact ? exactNncBinding.nounStem
        : normalizeStem(request.nounStem || request.sourceNounStem || request.sourceStem),
    lexicalMeaningPreserved: !exact
      || !exactNncBinding.canonicalNncSourceProjection?.stemOperation
      || exactNncBinding.canonicalNncSourceProjection.stemOperation.predicateFormation === "source-stem",
    sourceInitialISelection: key(
      exactNncBinding?.canonicalBoundNominalSourceFrame?.sourceInitialISelection
      || request.sourceInitialISelection || request.sourceInitialIKind,
    ),
    numeralStem: normalizeStem(request.numeralStem),
    timeMatrix: normalizeStem(request.timeMatrix),
    sourceOperationFrame: exact
      ? exactNncBinding.sourceOperationFrame
      : request.sourceOperationFrame || null,
    canonicalNncResult: exact ? exactNncBinding.canonicalNncResult : null,
    canonicalBoundNominalSourceFrame: exact ? exactNncBinding.canonicalBoundNominalSourceFrame || null : null,
    ...(exactNncBinding?.canonicalNominalRankCorrectionFrame?{canonicalNominalRankCorrectionFrame:exactNncBinding.canonicalNominalRankCorrectionFrame}:{}),
    canonicalNncSourceFrame: exact ? exactNncBinding.canonicalNncSourceFrame || null : null,
    verbalStemPreparationFrame: exact ? exactNncBinding.verbalStemPreparationFrame || null : null,
    canonicalNncSourceProjection: exact
      ? exactNncBinding.canonicalNncSourceProjection
      : null,
    sourceNounClass: exact ? exactNncBinding.sourceNounClass : key(request.sourceNounClass),
    classChoice: text(request.classChoice).toUpperCase(),
    subject: normalizePerson(request.subject) || "3sg",
    subjectPerson: key(request.subjectPerson),
    subjectAnimacy: key(request.subjectAnimacy),
    subjectHumanness: key(request.subjectHumanness),
    subjectNumber: key(request.subjectNumber),
    sourceSubject: exact
      ? exactNncBinding.sourceSubject
      : request.sourceOperationFrame?.sourceFrame?.canonicalBoundNominalSourceFrame
        ? request.sourceOperationFrame.sourceFrame.sourceSubject
      : normalizePerson(request.sourceSubject) || "3sg",
    mood: key(request.mood || "indicative"),
    tense: key(request.tense || "present"),
    objectPeople: Array.isArray(request.objectPeople)
      ? request.objectPeople.map(key)
      : [key(request.objectPerson || "3sg"), key(request.secondObjectPerson || "3sg")],
    outputScope: key(request.outputScope || "single"),
    exclamatory: request.exclamatory === true
      || request.sentenceOptions?.exclamatory === true
      || request.sentenceOptions?.punctuation === "!"
      || request.sentenceOptions?.punctuationMode === "exclamation"
      || request.sentenceOptions?.sentenceType === "exclamation",
    sentenceType: key(request.sentenceOptions?.sentenceType),
    sentenceOptions: request.sentenceOptions && typeof request.sentenceOptions === "object"
      ? request.sentenceOptions
      : {},
  });
}

function includedPossessorFactsForSource(source) {
  const sourceStem = source.sourceIdentityStem || source.nounStem || source.nounRoot || source.sourceVerbStem;
  const relationalPan = !source.sourceNounClass || source.sourceNounClass === "zero";
  const knownFamily = source.lexicalMeaningPreserved
    && (compactStem(sourceStem) !== "pan" || relationalPan)
    ? INCLUDED_POSSESSOR_SOURCE_MEANINGS.get(compactStem(sourceStem)) || "" : "";
  const analysis = source.includedPossessorSourceAnalysis;
  const submittedFamily = source.includedPossessorFamily;
  if (analysis && (
    typeof analysis !== "object" || Array.isArray(analysis)
    || Object.keys(analysis).some(field => !["sourceStem", "meaningFamily", "lexicalStatus"].includes(field))
    || normalizeStem(analysis.sourceStem) !== sourceStem
    || (analysis.lexicalStatus && analysis.lexicalStatus !== "included-possessor-source-analysis")
    || !INCLUDED_POSSESSOR_FAMILIES.includes(key(analysis.meaningFamily))
  )) return blocked("classical-included-possessor-source-facts", "included-possessor-source-analysis-invalid");
  const analyzedFamily = analysis ? key(analysis.meaningFamily) : "";
  if ((submittedFamily && !INCLUDED_POSSESSOR_FAMILIES.includes(submittedFamily))
    || (submittedFamily && analyzedFamily && submittedFamily !== analyzedFamily)
    || (knownFamily && [submittedFamily, analyzedFamily].some(family => family && family !== knownFamily))) {
    return blocked("classical-included-possessor-source-facts", "included-possessor-source-meaning-conflict");
  }
  const meaningFamily = knownFamily || analyzedFamily || submittedFamily;
  if (!knownFamily && meaningFamily && !["proxy", "recompense"].includes(meaningFamily)) {
    return blocked("classical-included-possessor-source-facts", "included-possessor-special-source-required");
  }
  return deepFreeze({
    kind: "classical-included-possessor-source-facts",
    authorizationStatus: sourceStem ? "authorized" : "blocked",
    blockReason: sourceStem ? "" : "denominal-source-stem-required",
    sourceStem, meaningFamily,
    familySelectionRequired: !knownFamily,
    allowedAnalysisFamilies: knownFamily ? [] : ["proxy", "recompense"],
    requiredTense: meaningFamily === "misfortune" ? "preterit" : "",
    requiredExclamatory: meaningFamily === "misfortune",
    // This preserves the owner's existing expected availability; it is
    // distinct from misfortune's obligatory single-tense context.
    expectedTenses: meaningFamily === "recompense" ? ["present", "preterit", "future"] : [],
    callerSuppliedAuthorityAccepted: false,
  });
}

function deriveTemporalParts(source) {
  if (source.numeralStem && TIME_MATRICES.includes(source.timeMatrix)) {
    return { numeralStem: source.numeralStem, timeMatrix: source.timeMatrix };
  }
  const nounStem = source.nounStem;
  for (const timeMatrix of TIME_MATRICES) {
    if (nounStem.endsWith(`-${timeMatrix}`) && nounStem.length > timeMatrix.length + 1) {
      return {
        numeralStem: nounStem.slice(0, -(timeMatrix.length + 1)),
        timeMatrix,
      };
    }
  }
  return null;
}

function isClassNeutralPossessionTiSource(frame, receipts) {
  const receipt = frame && receipts?.get(frame);
  return Boolean(receipt && Object.isFrozen(frame)
    && frame.kind === "classical-nahuatl-class-neutral-possession-ti-source"
    && frame.operationId === "possession-ti"
    && frame.sourceFrame === receipt.sourceFrame
    && frame.targetStem === receipt.targetStem
    && frame.targetClass === "" && frame.classClaimed === false
    && frame.finiteGenerationAllowed === false
    && frame.possibleClasses === receipt.possibleClasses
    && frame.alternatives === receipt.alternatives
    && Object.isFrozen(frame.possibleClasses) && Object.isFrozen(frame.alternatives));
}

function sourceFrameForRequest(source, issuedOperationFrames, affectiveMatrixSourceFrame = null,
  classNeutralPossessionSources = null, consumingOperationId = "") {
  const prior = source.sourceOperationFrame;
  const classNeutral = isClassNeutralPossessionTiSource(prior, classNeutralPossessionSources);
  if (prior && (!issuedOperationFrames.has(prior) && !classNeutral
    || classNeutral && (consumingOperationId !== "ti-a-causative-single"
      || source.sourceKind !== "generated-vnc" || source.sourceState !== "derived"))) {
    return blocked(
      "classical-nahuatl-denominal-vnc-source-frame",
      "denominal-source-operation-frame-not-issued-by-service"
    );
  }
  if (prior && source.sourceKind === "possessive-nnc-predicate") return blocked(
    "classical-nahuatl-denominal-vnc-source-frame", "denominal-possessive-nnc-source-cannot-be-operation-frame");
  const sourceStem = prior?.targetStem || source.sourceVerbStem || source.nounStem || source.nounRoot;
  if (!sourceStem) {
    return blocked(
      "classical-nahuatl-denominal-vnc-source-frame",
      "denominal-source-stem-required"
    );
  }
  const includedPossessorSourceFacts = prior?.sourceFrame?.includedPossessorSourceFacts
    || includedPossessorFactsForSource(source);
  if (includedPossessorSourceFacts.authorizationStatus !== "authorized") {
    return blocked("classical-nahuatl-denominal-vnc-source-frame", includedPossessorSourceFacts.blockReason);
  }
  const canonicalNncResult = source.canonicalNncResult
    || prior?.sourceFrame?.canonicalNncResult
    || null;
  const canonicalNncSourceProjection = source.canonicalNncSourceProjection
    || prior?.sourceFrame?.canonicalNncSourceProjection
    || null;
  return deepFreeze({
    kind: "classical-nahuatl-denominal-vnc-source-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    blockReason: "",
    nounStem: source.nounStem,
    nounRoot: source.nounRoot,
    sourceStem,
    sourceKind: source.sourceKind,
    sourceState: source.sourceState,
    possessor: source.possessor,
    possessorPerson: source.possessorPerson,
    includedPossessorFamily: includedPossessorSourceFacts.meaningFamily,
    includedPossessorSourceFacts,
    sourceSubject: source.sourceSubject,
    mood: source.mood,
    tense: source.tense,
    exclamatory: source.exclamatory,
    sentenceType: source.sentenceType,
    numeralStem: source.numeralStem,
    timeMatrix: source.timeMatrix,
    canonicalNncResult,
    canonicalNncSourceProjection,
    ...(source.canonicalNominalRankCorrectionFrame || prior?.sourceFrame?.canonicalNominalRankCorrectionFrame
      ?{canonicalNominalRankCorrectionFrame:source.canonicalNominalRankCorrectionFrame || prior.sourceFrame.canonicalNominalRankCorrectionFrame}:{}),
    canonicalNncSourceFrame: source.canonicalNncSourceFrame || prior?.sourceFrame?.canonicalNncSourceFrame || null,
    canonicalBoundNominalSourceFrame: source.canonicalBoundNominalSourceFrame || prior?.sourceFrame?.canonicalBoundNominalSourceFrame || null,
    verbalStemPreparationFrame: source.verbalStemPreparationFrame || prior?.sourceFrame?.verbalStemPreparationFrame || null,
    exactSourceIdentityPreserved: Boolean(source.canonicalNncSourceFrame || prior?.sourceFrame?.canonicalNncSourceFrame
      || source.canonicalBoundNominalSourceFrame || prior?.sourceFrame?.canonicalBoundNominalSourceFrame),
    sourceNounClass:
      source.sourceNounClass || prior?.sourceFrame?.sourceNounClass || "",
    sourceInitialISelection: source.sourceInitialISelection
      || prior?.sourceFrame?.sourceInitialISelection || "",
    exactResultIdentityPreserved: Boolean(canonicalNncResult),
    affectiveMatrixSourceFrame: prior?.sourceFrame?.affectiveMatrixSourceFrame
      || affectiveMatrixSourceFrame,
    priorOperationFrame: prior,
    ...(classNeutral ? {classNeutralPossessionSource: prior} : {}),
    priorOperationId: prior?.operationId || "",
    priorTargetClass: prior?.targetClass || "",
    priorObjectCount: Number(prior?.objectCount || 0),
    typedGrammarAuthority: true,
    callerSuppliedAuthorityAccepted: false,
    lessonMetadataAuthority: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

function classesForSpec(spec, sourceFrame) {
  if (spec.classPolicy === "first-type-single-causative") {
    return sourceFrame.priorOperationId === "inceptive-hui" ? ["B"] : ["C"];
  }
  if (spec.classPolicy === "fixed-a") return ["A"];
  if (spec.classPolicy === "fixed-b") return ["B"];
  if (spec.classPolicy === "fixed-c") return ["C"];
  if (spec.classPolicy === "ya-a-or-b") return ["A", "B"];
  if (spec.classPolicy === "hui-by-source-final") {
    return isVowel(lastSound(sourceFrame.nounStem || sourceFrame.sourceStem))
      ? ["B"]
      : ["A"];
  }
  if (spec.classPolicy === "ti-by-source-final") {
    return isVowel(lastSound(sourceFrame.nounStem || sourceFrame.sourceStem))
      ? ["A", "B"]
      : ["A"];
  }
  return [];
}

function isPanTargetPossessor(sourceFrame) {
  // §54.3.4: common nonanimate reference changes relational pan's reading.
  // The established Source meaning, not target spelling, licenses causation.
  return sourceFrame?.includedPossessorFamily === "temporal-pan"
    && sourceFrame.possessorPerson === "3common" && sourceFrame.possessor === "i";
}
function operationInapplicabilityReason(spec, sourceFrame) {
  // §25.5.2 and §54.2.3b.ii supply actual hui-ya ancestry before ya is
  // deleted. §54.2.2's shorter correspondence does not independently
  // authorize adding liā to a bare hui frame. Keep its old path signature
  // inspectable through blockedPathChoices; never silently insert ya.
  if (spec?.id === "ti-hui-lia-causative"
    && sourceFrame?.priorOperationId === "inceptive-hui") {
    return "independent-hui-lia-analysis-not-established";
  }
  // §54.5.1b normally follows an absolutive inceptive. §54.3.4
  // separately licenses relational pan with a common nonanimate possessor.
  return spec?.id === "ti-a-causative-single"
    && sourceFrame?.priorOperationId === "included-possessor-ti"
    && !isPanTargetPossessor(sourceFrame.priorOperationFrame?.sourceFrame)
    ? "included-possessor-single-object-causative-not-licensed" : "";
}

function isOperationApplicable(spec, sourceFrame) {
  if (operationInapplicabilityReason(spec, sourceFrame)) return false;
  const bound = sourceFrame.canonicalBoundNominalSourceFrame;
  if (bound && !sourceFrame.priorOperationFrame
    && !bound.lexicalAnalysis.initialOperationIds.includes(spec.id)) return false;
  if (bound?.lexicalAnalysis.directHuiCausative === "tiā"
    && sourceFrame.priorOperationId === "inceptive-hui"
    && spec.id === "ti-hui-lia-causative") return false;
  if (sourceFrame.verbalStemPreparationFrame && !sourceFrame.priorOperationFrame
    && spec.id !== sourceFrame.verbalStemPreparationFrame.operationId) return false;
  const nounStem = sourceFrame.nounStem;
  const sourceStem = sourceFrame.sourceStem;
  const priorId = sourceFrame.priorOperationId;
  const priorSourceStem = sourceFrame.priorOperationFrame?.sourceFrame?.nounStem || "";
  if (spec.continuationOf.length && !spec.continuationOf.includes(priorId)) return false;
  switch (spec.id) {
    case "inceptive-ti":
    case "inceptive-hui":
    case "possession-ti":
    case "denominal-i-hui":
    case "denominal-a-hui":
      return Boolean(nounStem && sourceFrame.sourceState === "absolutive");
    case "inceptive-root-ya":
      return Boolean(sourceFrame.nounRoot || nounStem);
    case "inceptive-ti-ya":
    case "inceptive-hui-ya":
    case "ti-hui-lia-causative":
    case "ya-lia-causative":
    case "causative-tla-ti-lia-applicative":
    case "intransitive-tla-ti-a-causative":
    case "intransitive-tla-ti-lia-applicative":
      return Boolean(priorId);
    case "ti-a-causative-single":
      // §24.3.1a applies to a genuine denominal hui formation. Stock i-hui/
      // a-hui has its separate o-ā continuation (§24.7); ClassA ix-hui has
      // the separate type-two tiā formation (§54.2.2).
      return Boolean(priorId && (priorId !== "inceptive-hui"
        || sourceFrame.priorTargetClass === "B"
          && sourceFrame.priorObjectCount === 0
          && /-hui$/u.test(sourceFrame.priorOperationFrame?.targetStem || "")));
    case "ya-lia-applicative":
      return priorId === "inceptive-root-ya" && priorSourceStem === "ce";
    case "ti-ia-applicative":
      return TI_IA_APPLICATIVE_SOURCE_STEMS.includes(sourceStem);
    case "o-a-to-i-l-huia":
      return HYPOTHETICAL_I_L_HUIA_STEMS.includes(priorSourceStem);
    case "o-a-to-a-l-huia":
      return false;
    case "i-hui-to-o-a":
      return sourceFrame.affectiveMatrixSourceFrame?.availableContinuations
        ?.includes("causative") === true
        || I_HUI_CAUSATIVE_SOURCE_STEMS.includes(priorSourceStem);
    case "a-hui-to-o-a":
      return A_HUI_CAUSATIVE_SOURCE_STEMS.includes(priorSourceStem);
    case "destockal-ya":
    case "destockal-a-causative":
      return sourceFrame.sourceKind === "destockal-ni-hui-vnc"
        && DESTOCKAL_YA_STEMS.includes(sourceStem);
    case "inceptive-a":
      return LIMITED_INCEPTIVE_A_STEMS.includes(nounStem);
    case "deverbal-yo-hua":
      return sourceFrame.sourceKind === "deverbal-yo-nounstem"
        && /-(?:yō|zō|lō)$/u.test(nounStem);
    case "included-possessor-ti":
      return !priorId && sourceFrame.sourceKind === "possessive-nnc-predicate"
        && sourceFrame.sourceState === "possessive"
        && Boolean(sourceFrame.possessor)
        && INCLUDED_POSSESSOR_FAMILIES.includes(sourceFrame.includedPossessorFamily)
        && (
          sourceFrame.includedPossessorFamily !== "recompense"
          || ["present", "preterit", "future"].includes(sourceFrame.tense)
        )
        && (
          sourceFrame.includedPossessorFamily !== "misfortune"
          || (sourceFrame.tense === "preterit" && sourceFrame.exclamatory
            && (!sourceFrame.sentenceType || ["exclamation", "affirmative", "affirmative-assertion"].includes(sourceFrame.sentenceType)))
        );
    case "ti-a-causative-double-inceptive":
    case "ti-a-causative-double-possession":
      return sourceFrame.sourceKind === "possessive-nnc-predicate"
        && sourceFrame.sourceState === "possessive"
        && Boolean(sourceFrame.possessorPerson)
        && Boolean(sourceFrame.sourceSubject)
        && Boolean(nounStem);
    case "patientive-chain-ti-a":
      return Object.hasOwn(PATIENTIVE_CHAIN_SOURCES, sourceStem);
    case "temporal-tia":
      return sourceFrame.sourceKind === "temporal-compound-nounstem"
        && Boolean(deriveTemporalParts(sourceFrame));
    case "denominal-causative-tla":
      return CAUSATIVE_TLA_STEMS.includes(nounStem);
    case "intransitive-tla":
      return INTRANSITIVE_TLA_STEMS.includes(nounStem);
    case "intransitive-o-a-use":
      return INTRANSITIVE_O_A_USE_STEMS.includes(nounStem);
    case "intransitive-o-a-produce":
      return INTRANSITIVE_O_A_PRODUCE_STEMS.includes(nounStem);
    case "applicative-huia-use":
      // §55.3.2a describes a general nounstem use/application formation.
      // Its examples do not authorize stems; the separate produce-for and
      // possessive double-object operations keep their own restrictions.
      return Boolean(nounStem && sourceFrame.sourceKind === "nounstem" && !priorId);
    case "applicative-huia-produce":
      return APPLICATIVE_HUIA_PRODUCE_STEMS.includes(nounStem);
    case "applicative-huia-double-object":
      return sourceFrame.sourceKind === "possessive-nnc-predicate"
        && sourceFrame.sourceState === "possessive"
        && sourceFrame.possessorPerson
        && sourceFrame.sourceSubject
        && nounStem === "cuitla";
    case "adverbial-huia":
      return sourceFrame.sourceKind === "adverbial-nounstem"
        && ADVERBIAL_HUIA_STEMS.includes(nounStem);
    case "relational-o-a-transitive":
      return sourceFrame.sourceKind === "relational-compound-or-predicate"
        && RELATIONAL_O_A_TRANSITIVE_STEMS.includes(nounStem);
    case "relational-o-a-intransitive":
      return sourceFrame.sourceKind === "relational-compound-or-predicate"
        && RELATIONAL_O_A_INTRANSITIVE_STEMS.includes(nounStem);
    case "relational-huia":
      return sourceFrame.sourceKind === "relational-compound-or-predicate"
        && RELATIONAL_HUIA_STEMS.includes(nounStem);
    case "transitive-i-a":
      return sourceFrame.sourceKind === "nounstem-plus-stock-i"
        && TRANSITIVE_IA_SOURCE_STEMS.includes(nounStem)
        && ["ch", "l", "c", "n"].some(final => compactStem(nounStem).endsWith(final));
    default:
      return false;
  }
}

function buildTargetStem(spec, sourceFrame, huiBoundaryFrame = null) {
  const nounStem = sourceFrame.nounStem;
  const priorStem = sourceFrame.priorOperationFrame?.targetStem || sourceFrame.sourceStem;
  switch (spec.id) {
    case "inceptive-ti":
    case "possession-ti":
      return join(nounStem, "ti");
    case "inceptive-hui": {
      const plainStem = huiBoundaryFrame
        ? join(huiBoundaryFrame.suffixBase, "hui")
        : compactStem(nounStem).endsWith("w") || /(?:uh|hui)$/u.test(nounStem)
          ? join(nounStem.replace(/(?:uh|hui)$/u, ""), "hui")
          : join(nounStem, "hui");
      // The issued preparation supplies verbal rank and lexical shape; the
      // shared sound utility supplies no license or frequentative meaning.
      return sourceFrame.verbalStemPreparationFrame?.stemShape === "short"
        ? reduplicate(plainStem, "short") : plainStem;
    }
    case "inceptive-root-ya":
      return join(sourceFrame.nounRoot || nounStem, "ya");
    case "inceptive-ti-ya":
    case "inceptive-hui-ya":
    case "destockal-ya":
      return join(priorStem, "ya");
    case "inceptive-a":
      return join(nounStem, "ā");
    case "deverbal-yo-hua":
      return join(nounStem, "hua");
    case "included-possessor-ti":
      return join(sourceFrame.possessor, nounStem, "ti");
    case "ti-hui-lia-causative":
      return join(priorStem, "liā");
    case "ya-lia-causative":
    case "ya-lia-applicative":
      return join(stripFinalMorpheme(priorStem, "ya"), "liā");
    case "destockal-a-causative":
      return join(priorStem, "ā");
    case "ti-a-causative-single":
      if (sourceFrame.priorOperationId === "inceptive-hui") {
        return join(priorStem.replace(/i$/u, ""), "a");
      }
      return join(priorStem, "ā");
    case "ti-a-causative-double-inceptive":
    case "ti-a-causative-double-possession":
      return join(nounStem, "ti", "ā");
    case "patientive-chain-ti-a":
      return PATIENTIVE_CHAIN_SOURCES[priorStem] || "";
    case "ti-ia-applicative":
      return join(stripFinalMorpheme(priorStem, "ti"), "t", "iā");
    case "temporal-tia": {
      const temporal = deriveTemporalParts(sourceFrame);
      const timeMatrix = temporal?.timeMatrix === "xihui" ? "xiuh" : temporal?.timeMatrix;
      return temporal ? join(temporal.numeralStem, timeMatrix, "tiā") : "";
    }
    case "denominal-causative-tla":
    case "intransitive-tla":
      return join(nounStem, "tla");
    case "causative-tla-ti-lia-applicative":
    case "intransitive-tla-ti-lia-applicative":
      return join(stripFinalMorpheme(priorStem, "tla"), "ti", "liā");
    case "intransitive-tla-ti-a-causative":
      return join(stripFinalMorpheme(priorStem, "tla"), "ti", "ā");
    case "intransitive-o-a-use":
    case "intransitive-o-a-produce":
    case "relational-o-a-transitive":
    case "relational-o-a-intransitive":
      return join(nounStem, "o", "ā");
    case "applicative-huia-use":
    case "applicative-huia-produce":
    case "applicative-huia-double-object":
    case "adverbial-huia":
    case "relational-huia":
      return join(nounStem, "huiā");
    case "o-a-to-i-l-huia":
      return join(stripFinalMorpheme(stripFinalMorpheme(priorStem, "ā"), "o"), "i", "l", "huiā");
    case "o-a-to-a-l-huia":
      return join(stripFinalMorpheme(stripFinalMorpheme(priorStem, "ā"), "o"), "a", "l", "huiā");
    case "denominal-i-hui":
      return join(nounStem, "i", "hui");
    case "denominal-a-hui":
      return join(nounStem, "a", "hui");
    case "i-hui-to-o-a":
      return join(stripFinalMorpheme(stripFinalMorpheme(priorStem, "hui"), "i"), "o", "ā");
    case "a-hui-to-o-a":
      return join(stripFinalMorpheme(stripFinalMorpheme(priorStem, "hui"), "a"), "o", "ā");
    case "transitive-i-a":
      return join(nounStem === "toc" ? "toqu" : nounStem, "i", "ā");
    default:
      return "";
  }
}

function buildObjectRequests(spec, source, sourceFrame = null) {
  const people = source.objectPeople;
  if (!spec.objectCount) return [];
  if (spec.objectCount === 1) {
    const reflexive = people[0] === "reflexive";
    const nonspecific = ["non-specific-human", "non-specific-nonhuman"].includes(people[0])
      && (spec.id === "applicative-huia-use"
        || spec.id === "ti-a-causative-single"
          && (sourceFrame?.priorOperationId === "inceptive-hui"
            && sourceFrame.priorTargetClass === "B"
            || sourceFrame?.priorOperationId === "possession-ti"
            || isPanTargetPossessor(sourceFrame?.priorOperationFrame?.sourceFrame))
        || sourceFrame?.affectiveMatrixSourceFrame?.causativeObjectKinds?.includes(people[0]));
    return [{
      objectId: "denominal-object-1",
      objectKind: nonspecific ? people[0]
        : reflexive ? "reflexive" : "specific-projective",
      objectPerson: nonspecific ? "" : reflexive ? source.subject : (people[0] || "3sg"),
      ...(people[0] === "3common"
        ? { animacy: "nonanimate", humanness: "nonhuman" } : {}),
      governor: spec.family.includes("applicative") || spec.family.includes("huia")
        ? "applicative"
        : "causative",
      derivationalLevel: 1,
    }];
  }
  const directPossessiveProjection =
    SOURCE_PROJECTED_DOUBLE_OBJECT_OPERATION_IDS.includes(spec.id);
  const possessiveTiACausative = directPossessiveProjection
    && spec.family.startsWith("ti-a-causative-double-");
  // §54.5.2b causes the causer to possess the incorporated entity. Its
  // holder is therefore reflexive; the NNC subject is still that entity.
  const possessionSelfHolder = spec.id === "ti-a-causative-double-possession";
  // In §54.5.2a the exact nominal entity changes case/function, not
  // referential constitution. Keep its semantic facts alongside the formal
  // agreement scalar; the finite owner issues the objective causee frame.
  // §54.5.2b instead has the newly imported reflexive causer in this position.
  const nominalCauseeParticipant = spec.id === "ti-a-causative-double-inceptive"
    ? sourceFrame?.canonicalNncSourceProjection?.subjectParticipantFrame
    : null;
  const priorObjectRequests = source.sourceOperationFrame?.objectRequests || [];
  const firstObjectPerson = possessionSelfHolder
    ? source.subject
    : directPossessiveProjection
    ? source.sourceSubject
    : priorObjectRequests[0]?.objectPerson || people[0] || "3sg";
  const secondObjectPerson = directPossessiveProjection
    ? source.possessorPerson
    : people[1] || "3sg";
  return [{
    objectId: "denominal-object-1",
    objectKind: possessionSelfHolder ? "reflexive" : "specific-projective",
    objectPerson: firstObjectPerson,
    ...(nominalCauseeParticipant ? { participantFrame: nominalCauseeParticipant } : {}),
    governor: possessiveTiACausative ? "causative" : "directive",
    derivationalLevel: 1,
  }, {
    objectId: "denominal-object-2",
    objectKind: (possessiveTiACausative && secondObjectPerson === source.subject
      && (people[1] === "reflexive" || ["1sg", "2sg"].includes(source.subject)))
      || (spec.id === "applicative-huia-double-object" && people[1] === "reflexive")
      ? "reflexive" : "specific-projective",
    objectPerson: secondObjectPerson,
    governor: possessiveTiACausative || spec.family.includes("applicative") || spec.family.includes("huia")
      ? "applicative"
      : "causative",
    derivationalLevel: 2,
  }];
}

function buildFiniteRequest(operationFrame, source, generatedPossessorInitialI = false) {
  const sourceObjectRequests = operationFrame.objectRequests;
  const singleReflexiveObject = sourceObjectRequests.length === 1
    && sourceObjectRequests[0].objectKind === "reflexive";
  const nominal = operationFrame.sourceFrame.canonicalNncSourceProjection;
  // This initial vowel belongs to the authenticated incorporated possessor,
  // not to an unresolved lexical initial-i analysis of the original noun.
  const includedPossessorInitialI = operationFrame.operationId === "included-possessor-ti"
    && nominal?.canonicalResultFrame === operationFrame.sourceFrame.canonicalNncResult
    && nominal?.state === "possessive"
    && ["3sg", "3pl"].includes(nominal.possessor)
    && operationFrame.sourceFrame.possessor === normalizePossessor(nominal.possessor)
    && nominal.stateSlots?.some(slot => slot.role === "st1" && /^[iī]$/u.test(slot.carrier));
  return {
    sourceStem: operationFrame.targetStem,
    verbClass: operationFrame.targetClass,
    sourceValence: singleReflexiveObject
      ? "mainline-reflexive"
      : sourceObjectRequests.length === 1
        && sourceObjectRequests[0].objectKind === "non-specific-nonhuman"
        ? "projective-nonhuman"
      : sourceObjectRequests.length === 1
        && sourceObjectRequests[0].objectKind === "non-specific-human"
        ? "projective-human"
      : sourceObjectRequests.length
        ? "specific-projective"
        : "intransitive",
    objectKind: singleReflexiveObject ? "reflexive" : "",
    objectPerson: singleReflexiveObject
      ? sourceObjectRequests[0].objectPerson
      : "",
    sourceObjectRequests,
    sourceInitialISelection: includedPossessorInitialI || generatedPossessorInitialI
      ? "real" : source.sourceInitialISelection,
    // This Source is the newly formed verb, not the nominal Source whose
    // subject can independently project into a causative object.
    subject: source.subject === "3common" ? "3sg" : source.subject,
    sourceSubject: source.subject,
    sourceSubjectPerson: source.subjectPerson,
    sourceSubjectAnimacy: source.subjectAnimacy
      || (source.subject === "3common" ? "nonanimate" : ""),
    sourceSubjectHumanness: source.subjectHumanness,
    sourceSubjectNumber: source.subjectNumber
      || (source.subject === "3common" ? "common" : ""),
    mood: source.mood,
    tense: source.tense,
    requestedDerivation: "direct",
    requestedVoice: "active",
    outputScope: source.outputScope,
    sentenceOptions: {
      sentenceType: "affirmative-assertion",
      ...source.sentenceOptions,
      ...(source.sentenceType === "exclamation" ? { sentenceType: "affirmative-assertion" } : {}),
      ...(source.exclamatory ? { punctuationMode: "exclamation" } : {}),
    },
  };
}

export function createClassicalNahuatlDenominalVncGrammarApi(targetObject = globalThis) {
  const reloadInputs=new WeakMap();
  function resolveExactHuiBoundary(sourceFrame) {
    const projection = sourceFrame.canonicalNncSourceProjection;
    if (!projection) return null;
    const nounStem = sourceFrame.nounStem;
    const lexicalSource = projection.canonicalSourceFrame;
    const sourceStemOperation = projection.stemOperation?.predicateFormation === "source-stem";
    let useStemFrame = null;
    // Only the source-stem operation preserves this lexical use-stem analysis.
    // A changed matrix must not inherit the old Source's ephemeral vowel.
    if (sourceStemOperation && /hui$/u.test(nounStem)) {
      if (typeof targetObject.buildClassicalNahuatlNounstemSourceFrame !== "function") {
        return { authorizationStatus: "blocked", blockReason: "denominal-hui-use-stem-capability-required" };
      }
      useStemFrame = targetObject.buildClassicalNahuatlNounstemSourceFrame(lexicalSource.stem, {
        state: "absolutive", nounClass: lexicalSource.nounClass,
        classSelectionAuthority: lexicalSource.lexicalSelectionAuthority,
        classMembershipOptions: lexicalSource.classMembershipOptions,
        generalUseShape: lexicalSource.useShape,
        tlSubclass: lexicalSource.subclass.replace(/^tl-/u, ""),
        ephemeralFinalVowel: lexicalSource.ephemeralFinalVowel,
        truncationRepair: lexicalSource.truncationRepair,
      });
      if (useStemFrame.authorizationStatus !== "authorized") return useStemFrame;
    }
    const ephemeralIExposesW = Boolean(useStemFrame
      && useStemFrame.generalUseShape === "truncated"
      && useStemFrame.ephemeralFinalVowel === "i"
      && /hu$/u.test(useStemFrame.underlyingGeneralUseStem));
    const finalW = /(?:uh|w)$/u.test(nounStem);
    const coalesces = finalW || ephemeralIExposesW;
    const suffixBase = ephemeralIExposesW
      ? nounStem.slice(0, -3)
      : finalW ? nounStem.replace(/(?:uh|w)$/u, "") : nounStem;
    return deepFreeze({
      kind: "classical-denominal-hui-exact-source-boundary",
      authorizationStatus: "authorized", blockReason: "",
      useStemFrame, sourceStemOperation, ephemeralIExposesW,
      sourceStem: nounStem, suffixBase, coalesces,
      boundaryOperation: coalesces ? "w-plus-w-coalescence" : "retain-source-final-before-hui",
      formulaStringAuthority: false, surfaceStringAuthority: false,
    });
  }
  const issuedSourceFrames = new WeakSet();
  const issuedInventories = new WeakSet();
  const issuedPathInventories = new WeakSet();
  const issuedOperationFrames = new WeakSet();
  const classNeutralPossessionSources = new WeakMap();
  const issuedGrammarFrames = new WeakSet();
  const issuedResultFrames = new WeakSet();
  const issuedPlans = new WeakSet();
  const issuedCoordinateFrames = new WeakSet();
  const issuedUiFrames = new WeakSet();
  const issuedBoundNominalSources = new WeakSet();
  const boundNominalSourceCache = new Map();
  const boundNominalBindings = new WeakMap();
  const issuedInstrumentalAzSourceFrames = new WeakSet();
  const issuedExactNncDerivedRequests = new WeakSet();

  function buildClassicalNahuatlBoundNominalSourceFrame(request = {}) {
    if (!request || typeof request !== "object" || Array.isArray(request)) return blocked(
      "classical-nahuatl-bound-nominal-source-frame", "bound-nominal-source-analysis-required");
    const stem = normalizeStem(request.nounStem);
    const lexicalAnalysis = BOUND_NOMINAL_SOURCE_ANALYSES[stem];
    const unexpected = Reflect.ownKeys(request).find(key => !["nounStem", "sourceInitialISelection"].includes(key));
    const initialI = key(request.sourceInitialISelection || lexicalAnalysis?.initialIKind);
    if (!lexicalAnalysis || unexpected || initialI !== lexicalAnalysis.initialIKind) return blocked(
      "classical-nahuatl-bound-nominal-source-frame", unexpected ? "bound-nominal-source-only-accepts-nominal-analysis"
        : !lexicalAnalysis ? "bound-nominal-rank-not-established"
          : "bound-nominal-source-initial-i-analysis-required",
      {sourceRank: lexicalAnalysis?.sourceRank || "", requiredChoiceIds: lexicalAnalysis && !unexpected ? ["sourceInitialISelection"] : []});
    const cacheKey = `${stem}|${initialI}`;
    if (boundNominalSourceCache.has(cacheKey)) return boundNominalSourceCache.get(cacheKey);
    const frame = deepFreeze({kind: "classical-nahuatl-bound-nominal-source-frame", version: VERSION,
      authorizationStatus: "authorized", blockReason: "", stem, nounStem: stem,
      sourceRank: lexicalAnalysis.sourceRank, meaning: lexicalAnalysis.meaning,
      sourceKind: "nounstem", sourceState: "absolutive", sourceInitialISelection: initialI,
      lexicalAnalysis, ordinaryNncAuthorized: false, ordinaryNounClassClaimed: false,
      typedGrammarAuthority: true, callerSuppliedAuthorityAccepted: false,
      formulaStringAuthority: false, surfaceStringAuthority: false});
    issuedBoundNominalSources.add(frame);boundNominalSourceCache.set(cacheKey, frame);return frame;
  }
  function isClassicalNahuatlBoundNominalSourceFrame(frame = null) {
    return Boolean(issuedBoundNominalSources.has(frame) && Object.isFrozen(frame)
      && frame.kind === "classical-nahuatl-bound-nominal-source-frame"
      && frame.lexicalAnalysis === BOUND_NOMINAL_SOURCE_ANALYSES[frame.stem]
      && frame.sourceRank === "bound-nominal-stem" && frame.sourceKind === "nounstem"
      && frame.sourceInitialISelection === frame.lexicalAnalysis.initialIKind
      && frame.ordinaryNncAuthorized === false && frame.ordinaryNounClassClaimed === false);
  }

  function issueClassicalNahuatlBoundNominalDenominalBindingFrame(exactSourceFrame = null, selections = {}) {
    const validSource = isClassicalNahuatlBoundNominalSourceFrame(exactSourceFrame);
    const allowed = ["pathChoiceId", "subject", "mood", "tense", "objectPerson"];
    const invalid = !selections || typeof selections !== "object" || Array.isArray(selections)
      || Reflect.ownKeys(selections).some(field => !allowed.includes(field));
    const inventory = validSource && !invalid
      ? getClassicalNahuatlDenominalVncOperationPathInventory({canonicalBoundNominalSourceFrame: exactSourceFrame}) : null;
    const paths = inventory?.pathChoices || [];
    const selected = paths.find(path => path.pathChoiceId === selections?.pathChoiceId);
    const options = values => values.map(value => Object.freeze({optionId: value, label: value,
      availabilityStatus: "available", ownerOptionProjected: true, ownerOptionAuthority: false, grammarAuthority: false}));
    const projection = {pathChoiceId: paths.map(path => Object.freeze({...options([path.pathChoiceId])[0], label: path.pathLabel})),
      subject: options(["1sg", "2sg", "3sg", "1pl", "2pl", "3pl"]),
      mood: options(CLASSICAL_NAHUATL_VNC_SEMANTIC_MOODS),
      tense: options(CLASSICAL_NAHUATL_VNC_SEMANTIC_TENSES_BY_MOOD[selections?.mood || "indicative"] || []),
      ...(selected?.controlRequirements.resultObjectPeople ? {objectPerson: options(["1sg", "2sg", "3sg", "1pl", "2pl", "3pl"])} : {})};
    const mismatch = Object.entries(selections || {}).find(([field, value]) =>
      !projection[field]?.some(option => option.optionId === value));
    const requiredChoiceIds = validSource && !invalid && !mismatch
      ? Object.keys(projection).filter(field => !selections[field]) : [];
    let blockReason = !validSource ? "bound-nominal-exact-issued-source-required"
      : invalid ? "bound-nominal-selection-not-supported" : mismatch ? "bound-nominal-selection-not-licensed" : "";
    let request = null;
    if (!blockReason && !requiredChoiceIds.length) {
      request = deepFreeze({...selected.sourceRequest, operationPath: selected.operationPath,
        classChoices: selected.classChoices, classChoice: selected.finalClassChoice,
        subject: selections.subject, mood: selections.mood, tense: selections.tense,
        objectPeople: selected.controlRequirements.resultObjectPeople ? [selections.objectPerson] : [],
        sentenceOptions: {negative: false, antecessive: false}});
      const preflight = evaluateClassicalNahuatlDenominalVnc(request);
      if (preflight.authorizationStatus !== "authorized") blockReason = preflight.blockReason;
    }
    const bindingStatus = blockReason ? "rejected" : requiredChoiceIds.length ? "choices-required" : "ready";
    const frame = deepFreeze({kind: "classical-nahuatl-bound-nominal-denominal-binding-frame", version: VERSION,
      authorizationStatus: blockReason ? "blocked" : "authorized", bindingStatus, blockReason,
      exactSourceFrame: validSource ? exactSourceFrame : null,
      callerSelections: !invalid ? {...selections} : {}, effectiveSelections: !invalid ? {...selections} : {},
      requiredChoiceIds, choiceOptionProjection: projection, ownerRequest: bindingStatus === "ready" ? request : null,
      executionArgs: bindingStatus === "ready" ? [request] : [],
      callerSuppliedAuthorityAccepted: false, grammarAuthority: false});
    boundNominalBindings.set(frame, {source: validSource ? exactSourceFrame : null, request});return frame;
  }
  function isClassicalNahuatlBoundNominalDenominalBindingFrame(frame = null) {
    const context = boundNominalBindings.get(frame);
    return Boolean(context && Object.isFrozen(frame) && frame.exactSourceFrame === context.source
      && (!context.source || isClassicalNahuatlBoundNominalSourceFrame(context.source))
      && ["ready", "choices-required", "rejected"].includes(frame.bindingStatus)
      && (frame.bindingStatus !== "ready" || frame.executionArgs[0] === context.request
        && context.request.canonicalBoundNominalSourceFrame === context.source));
  }

  const correctedNominalSources=new WeakMap(),correctedNominalContexts=new WeakMap(),correctedNominalBindings=new WeakMap();
  function resolveClassicalNahuatlNominalRankCorrectedSourceFrame(request={}) {
    if(!request || typeof request!=="object" || Object.keys(request).some(k=>!["enteredStem","valence"].includes(k)))return null;
    const record=targetObject.resolveClassicalNahuatlCanonicalSourceStemRecord?.({enteredStem:request.enteredStem,basalUnit:"vnc",valence:request.valence});
    const analysis=record?.canonicalNominalSourceRankCorrection;
    if(targetObject.isClassicalNahuatlCanonicalSourceStemRecord?.(record)!==true || !analysis)return null;
    if(correctedNominalSources.has(record))return correctedNominalSources.get(record);
    // Canonical nominal lexical facts, including any existing finer analysis,
    // are derived by the nominal owner; no caller class override is imported.
    const nominal=targetObject.buildClassicalNahuatlOrdinaryNncSourceFrame?.({stem:record.stem});
    if(targetObject.isClassicalNahuatlOrdinaryNncSourceFrame?.(nominal)!==true || nominal.nounClass!==analysis.coarseNounClass)return null;
    const frame=deepFreeze({kind:"classical-nahuatl-nominal-rank-corrected-source-frame",version:VERSION,
      sourceStem:record.stem,sourceRank:"nounstem",sourceClass:analysis.coarseNounClass,sourceKind:"nounstem",
      actualBasalUnit:"nnc",canonicalSourceStemRecord:record,sourceAnalysis:analysis,canonicalNncSourceFrame:nominal,
      originalPickerRank:"vnc",explicitRankCorrection:true,independentVncUseLicensed:false,grammarAuthority:false});
    correctedNominalSources.set(record,frame);correctedNominalContexts.set(frame,{record,analysis,nominal});return frame;
  }
  function isClassicalNahuatlNominalRankCorrectedSourceFrame(frame=null) {
    const c=frame&&correctedNominalContexts.get(frame);
    return Boolean(c&&Object.isFrozen(frame)&&targetObject.isClassicalNahuatlCanonicalSourceStemRecord?.(c.record)
      &&c.record.canonicalNominalSourceRankCorrection===c.analysis&&frame.sourceAnalysis===c.analysis
      &&frame.canonicalNncSourceFrame===c.nominal&&targetObject.isClassicalNahuatlOrdinaryNncSourceFrame?.(c.nominal)
      &&frame.sourceStem===c.record.stem&&frame.actualBasalUnit==="nnc"&&frame.independentVncUseLicensed===false);
  }
  function getClassicalNahuatlNominalRankCorrectedDenominalRequest(frame=null) {
    if(!isClassicalNahuatlNominalRankCorrectedSourceFrame(frame))return null;
    const preparation=issueClassicalNahuatlDenominalVerbalStemPreparation(frame.canonicalNncSourceFrame,{operationId:frame.sourceAnalysis.licensedOperationId,stemShape:"plain"});
    return isClassicalNahuatlDenominalVerbalStemPreparation(preparation)?deepFreeze({canonicalNncSourceFrame:frame.canonicalNncSourceFrame,
      verbalStemPreparationFrame:preparation,canonicalNominalRankCorrectionFrame:frame}):null;
  }
  function issueClassicalNahuatlNominalSourceDenominalBindingFrame(exactSourceFrame=null,selections={}) {
    if(isClassicalNahuatlBoundNominalSourceFrame(exactSourceFrame))return issueClassicalNahuatlBoundNominalDenominalBindingFrame(exactSourceFrame,selections);
    const valid=isClassicalNahuatlNominalRankCorrectedSourceFrame(exactSourceFrame),sourceRequest=valid?getClassicalNahuatlNominalRankCorrectedDenominalRequest(exactSourceFrame):null;
    const allowed=["pathChoiceId","subject","mood","tense"];
    let reason=!valid?"nominal-rank-exact-issued-source-required":!selections||typeof selections!=="object"||Object.keys(selections).some(k=>!allowed.includes(k))?"nominal-rank-selection-not-supported":"";
    const inventory=!reason?getClassicalNahuatlDenominalVncOperationPathInventory(sourceRequest):null;
    const paths=(inventory?.pathChoices||[]).filter(p=>p.operationPath.length===1&&p.operationPath[0]===exactSourceFrame.sourceAnalysis.licensedOperationId&&p.finalClassChoice===exactSourceFrame.sourceAnalysis.independentlyLicensedTargetClass);
    const options=values=>values.map(value=>({optionId:value,value,label:value,availabilityStatus:"available",grammarAuthority:false}));
    const projection={pathChoiceId:paths.map(p=>({...options([p.pathChoiceId])[0],label:p.pathLabel})),subject:options(["1sg","2sg","3sg","1pl","2pl","3pl"]),mood:options(["indicative"]),tense:options(["present"])};
    if(!reason&&Object.entries(selections).some(([k,v])=>!projection[k]?.some(o=>o.optionId===v)))reason="nominal-rank-selection-not-licensed";
    const required=!reason?Object.keys(projection).filter(k=>!selections[k]):[];
    let request=null;
    if(!reason&&!required.length){const selected=paths.find(p=>p.pathChoiceId===selections.pathChoiceId);
      request=deepFreeze({...sourceRequest,operationPath:selected.operationPath,classChoices:selected.classChoices,classChoice:selected.finalClassChoice,
        subject:selections.subject,mood:selections.mood,tense:selections.tense,objectPeople:[],sentenceOptions:{negative:false,antecessive:false}});
      const preflight=evaluateClassicalNahuatlDenominalVnc(request);if(preflight.authorizationStatus!=="authorized")reason=preflight.blockReason;
    }
    const status=reason?"rejected":required.length?"choices-required":"ready";
    const frame=deepFreeze({kind:"classical-nahuatl-nominal-source-denominal-binding-frame",version:VERSION,bindingStatus:status,authorizationStatus:reason?"blocked":"authorized",blockReason:reason,
      exactSourceFrame:valid?exactSourceFrame:null,callerSelections:{...selections},effectiveSelections:{...selections},requiredChoiceIds:required,choiceOptionProjection:projection,
      ownerRequest:status==="ready"?request:null,executionArgs:status==="ready"?[request]:[],grammarAuthority:false});
    correctedNominalBindings.set(frame,{source:valid?exactSourceFrame:null,request});return frame;
  }
  function isClassicalNahuatlNominalSourceDenominalBindingFrame(frame=null) {
    if(isClassicalNahuatlBoundNominalDenominalBindingFrame(frame))return true;
    const c=frame&&correctedNominalBindings.get(frame);
    return Boolean(c&&Object.isFrozen(frame)&&frame.exactSourceFrame===c.source&&(!c.source||isClassicalNahuatlNominalRankCorrectedSourceFrame(c.source))
      &&["ready","choices-required","rejected"].includes(frame.bindingStatus)
      &&(frame.bindingStatus!=="ready"||frame.executionArgs[0]===c.request&&c.request.canonicalNominalRankCorrectionFrame===c.source));
  }
  const verbalStemPreparations = new WeakMap();
  const verbalStemPreparationCache = new WeakMap();
  function getClassicalNahuatlDenominalVerbalStemShapeInventory(exactSource = null, operationId = "inceptive-hui") {
    if (targetObject.isClassicalNahuatlOrdinaryNncSourceFrame?.(exactSource) !== true
      || !["inceptive-hui","inceptive-ti"].includes(operationId)) return blocked(
      "classical-denominal-verbal-stem-shape-inventory", "denominal-verbal-shape-exact-noun-source-required");
    // §54.2.2 attests this lexical stem shape. It does not restrict the
    // productive plain hui operation to an inventory of named stems.
    const shortShapeAttested = operationId === "inceptive-hui" && exactSource.stem === "xō" && exactSource.nounClass === "tl";
    return deepFreeze({
      kind: "classical-denominal-verbal-stem-shape-inventory",
      authorizationStatus: "authorized", blockReason: "",
      canonicalNncSourceFrame: exactSource, operationId,
      options: [
        {value: "plain", label: "Plain", formationStatus: "productive", greenReadingStatus: "unclaimed"},
        ...(shortShapeAttested ? [{value: "short", label: "Reduplicated", formationStatus: "attested", stemRank: "verbal"}] : []),
      ],
      selectionRequired: shortShapeAttested,
      grammarAuthority: false,
    });
  }
  function issueClassicalNahuatlDenominalVerbalStemPreparation(exactSource = null, selection = {}) {
    const operationId = key(selection.operationId || "inceptive-hui");
    const stemShape = key(selection.stemShape);
    const inventory = getClassicalNahuatlDenominalVerbalStemShapeInventory(exactSource, operationId);
    if (inventory.authorizationStatus !== "authorized" || !inventory.options.some(option => option.value === stemShape)) return blocked(
      "classical-denominal-verbal-stem-preparation", "denominal-verbal-stem-shape-not-established");
    let cache = verbalStemPreparationCache.get(exactSource);
    if (!cache) {cache = new Map(); verbalStemPreparationCache.set(exactSource, cache);}
    const cacheKey = `${operationId}|${stemShape}`;
    if (cache.has(cacheKey)) return cache.get(cacheKey);
    const frame = deepFreeze({
      kind: "classical-denominal-verbal-stem-preparation", version: VERSION,
      authorizationStatus: "authorized", blockReason: "",
      canonicalNncSourceFrame: exactSource, operationId, stemShape,
      sourceRank: "nounstem", preparationRank: "verbstem",
      formationStatus: inventory.options.find(option => option.value === stemShape).formationStatus,
      nounstemReduplicationApplied: false, frequentativeMeaningAdded: false,
      typedGrammarAuthority: true, callerSuppliedAuthorityAccepted: false,
    });
    verbalStemPreparations.set(frame, {exactSource, operationId, stemShape});
    cache.set(cacheKey, frame); return frame;
  }
  function isClassicalNahuatlDenominalVerbalStemPreparation(frame = null) {
    const custody = frame && verbalStemPreparations.get(frame);
    return Boolean(custody && frame.authorizationStatus === "authorized"
      && frame.kind === "classical-denominal-verbal-stem-preparation"
      && frame.version === VERSION && Object.isFrozen(frame)
      && frame.canonicalNncSourceFrame === custody.exactSource
      && targetObject.isClassicalNahuatlOrdinaryNncSourceFrame?.(custody.exactSource) === true
      && frame.operationId === custody.operationId && frame.stemShape === custody.stemShape
      && frame.preparationRank === "verbstem" && frame.nounstemReduplicationApplied === false);
  }

  const compoundContinuationProjections = new WeakMap();
  function getDenominalNncSourceProjection(result) {
    const ordinary = targetObject.getClassicalNahuatlNncContinuationSourceConstituents?.(result);
    if (ordinary) return ordinary;
    const citation = targetObject.getClassicalNahuatlCompoundNncRestrictedUseCitationProjection?.(result);
    if (citation?.authorizationStatus !== "authorized"
      || citation.canonicalResultFrame !== result
      || targetObject.isClassicalNahuatlCompoundNncRestrictedUseCitationProjection?.(citation) !== true
      || (result.operationFrame?.yoMatrixFrame
        && result.operationFrame.yoMatrixFrame.authorizationStatus !== "authorized")) return null;
    const existing = compoundContinuationProjections.get(result);
    if (existing) return existing;
    const state = result.typedSlotFrame.slots.state.arity === "vacant"
      ? "absolutive" : "possessive";
    const projection = deepFreeze({
      ...citation,
      nncType: "ordinary",
      predicateStem: citation.sourcePredicateStem,
      state,
      possessor: state === "possessive" ? result.operationFrame.possessor || "" : "",
      subjectParticipantFrame: result.typedSlotFrame.slots.subject.participantFrame,
      sourceNounClass: citation.nounClass,
      sourceKind: result.operationFrame.yoMatrixFrame
        ? "deverbal-yo-nounstem"
        : state === "possessive" ? "possessive-nnc-predicate" : "nounstem",
    });
    compoundContinuationProjections.set(result, projection);
    return projection;
  }

  function resolveClassicalNahuatlDenominalExactNncBinding(request = {}) {
    if (request.canonicalBoundNominalSourceFrame) {
      const source = request.canonicalBoundNominalSourceFrame;
      const conflict = !issuedExactNncDerivedRequests.has(request)
        && (request.canonicalNncResult || request.canonicalNncSourceFrame || request.sourceOperationFrame
          || EXACT_NNC_SOURCE_REQUEST_FIELDS.some(field => hasMaterialRequestValue(request[field])));
      if (!isClassicalNahuatlBoundNominalSourceFrame(source) || conflict) return blocked(
        "classical-denominal-exact-bound-nominal-binding", "bound-nominal-exact-source-rank-or-identity-mismatch");
      return {authorizationStatus: "authorized", canonicalBoundNominalSourceFrame: source,
        canonicalNncResult: null, canonicalNncSourceProjection: null, nounStem: source.nounStem,
        nounRoot: "", sourceVerbStem: "", sourceKind: "nounstem", sourceState: "absolutive",
        sourceNounClass: "", sourceSubject: "", possessor: "", sourceOperationFrame: null};
    }
    if (request.canonicalNominalRankCorrectionFrame) {
      const correction=request.canonicalNominalRankCorrectionFrame;
      if(!isClassicalNahuatlNominalRankCorrectedSourceFrame(correction)
        || request.canonicalNncSourceFrame!==correction.canonicalNncSourceFrame
        || request.verbalStemPreparationFrame?.operationId!==correction.sourceAnalysis.licensedOperationId)return blocked(
          "classical-denominal-exact-noun-source-binding","nominal-rank-correction-exact-source-mismatch");
    }
    if (request.canonicalNncSourceFrame || request.verbalStemPreparationFrame) {
      const source = request.canonicalNncSourceFrame;
      const preparation = request.verbalStemPreparationFrame;
      if (request.canonicalNncResult || !isClassicalNahuatlDenominalVerbalStemPreparation(preparation)
        || targetObject.isClassicalNahuatlOrdinaryNncSourceFrame?.(source) !== true
        || preparation.canonicalNncSourceFrame !== source) return blocked(
        "classical-denominal-exact-noun-source-binding", "denominal-verbal-preparation-exact-source-mismatch");
      const conflictingField = issuedExactNncDerivedRequests.has(request) ? ""
        : EXACT_NNC_SOURCE_REQUEST_FIELDS.find(field => hasMaterialRequestValue(request[field]));
      if (conflictingField) return blocked("classical-denominal-exact-noun-source-binding",
        "denominal-exact-nnc-source-fields-are-mutually-exclusive", {rejectedSourcePath: `request.${conflictingField}`});
      return deepFreeze({authorizationStatus: "authorized", blockReason: "",
        canonicalNncResult: null, canonicalNncSourceProjection: null,
        canonicalNncSourceFrame: source, verbalStemPreparationFrame: preparation,
        ...(request.canonicalNominalRankCorrectionFrame?{canonicalNominalRankCorrectionFrame:request.canonicalNominalRankCorrectionFrame}:{}),
        nounStem: source.stem, nounRoot: "", sourceVerbStem: "", sourceKind: "nounstem",
        sourceState: "absolutive", sourceNounClass: source.nounClass,
        sourceSubject: "3sg", possessor: "", sourceOperationFrame: null});
    }
    const canonicalNncResult = request?.canonicalNncResult || null;
    if (!canonicalNncResult) return null;
    const internalDerivedRequest = issuedExactNncDerivedRequests.has(request);
    const conflictingField = internalDerivedRequest
      ? ""
      : EXACT_NNC_SOURCE_REQUEST_FIELDS.find(field => (
        hasMaterialRequestValue(request?.[field])
      )) || "";
    if (conflictingField) {
      return deepFreeze({
        authorizationStatus: "blocked",
        blockReason: "denominal-exact-nnc-source-fields-are-mutually-exclusive",
        rejectedSourcePath: `request.${conflictingField}`,
      });
    }
    if (
      typeof targetObject.getClassicalNahuatlNncContinuationSourceConstituents
        !== "function"
    ) {
      return deepFreeze({
        authorizationStatus: "blocked",
        blockReason: "denominal-exact-nnc-projection-capability-unavailable",
      });
    }
    let projection = null;
    try {
      projection = getDenominalNncSourceProjection(canonicalNncResult);
    } catch {
      projection = null;
    }
    if (
      !projection
      || projection.canonicalResultFrame !== canonicalNncResult
      || projection.canonicalSourceFrame !== canonicalNncResult?.sourceFrame
      || projection.canonicalOperationFrame !== canonicalNncResult?.operationFrame
      || projection.typedSlotFrame !== canonicalNncResult?.typedSlotFrame
      || projection.projectionRole !== "read-only-source-constituents"
      || projection.continuationMode !== "licensed-operation-only"
    ) {
      return deepFreeze({
        authorizationStatus: "blocked",
        blockReason: "denominal-exact-nnc-result-not-issued-by-canonical-owner",
      });
    }
    if (projection.nncType !== "ordinary") {
      return deepFreeze({
        authorizationStatus: "blocked",
        blockReason: "denominal-exact-nnc-source-rank-not-supported",
        canonicalNncResult,
        canonicalNncSourceProjection: projection,
      });
    }
    const nounStem = normalizeStem(projection.predicateStem);
    const sourceState = key(projection.state);
    const baseSourceKind = sourceState === "possessive"
      ? "possessive-nnc-predicate"
      : sourceState === "absolutive"
        ? "nounstem"
        : "";
    const sourceKind = internalDerivedRequest
      ? key(request.sourceKind) || baseSourceKind
      : projection.sourceKind || baseSourceKind;
    const sourceKindSupported = sourceState === "possessive"
      ? sourceKind === "possessive-nnc-predicate"
      : ["nounstem", "nounroot-or-stem-as-root", ...(projection.sourceKind === "deverbal-yo-nounstem" ? ["deverbal-yo-nounstem"] : [])].includes(sourceKind);
    const sourceSubject = normalizePerson(
      projection.subjectParticipantFrame?.agreement
    );
    if (!nounStem || !baseSourceKind || !sourceKindSupported || !sourceSubject) {
      return deepFreeze({
        authorizationStatus: "blocked",
        blockReason: "denominal-exact-nnc-projection-incomplete",
        canonicalNncResult,
        canonicalNncSourceProjection: projection,
      });
    }
    return deepFreeze({
      authorizationStatus: "authorized",
      blockReason: "",
      canonicalNncResult,
      canonicalNncSourceProjection: projection,
      nounStem,
      nounRoot: sourceKind === "nounroot-or-stem-as-root" ? nounStem : "",
      sourceVerbStem: "",
      sourceKind,
      sourceState,
      possessor: projection.possessor || "",
      sourceSubject,
      sourceOperationFrame: null,
      sourceNounClass: projection.sourceNounClass || "",
      exactResultIdentityPreserved: true,
    });
  }

  function getClassicalNahuatlIncludedPossessorSourceFacts(request = {}) {
    const hostilePath = findHostileAuthorityPath(request, "request", new WeakSet(),
      new Set(["canonicalNncResult", "sourceOperationFrame"]));
    if (hostilePath) return blocked("classical-included-possessor-source-facts",
      "denominal-caller-authority-fields-rejected", { rejectedAuthorityPath: hostilePath });
    const exact = resolveClassicalNahuatlDenominalExactNncBinding(request);
    if (exact?.authorizationStatus === "blocked") return blocked(
      "classical-included-possessor-source-facts", exact.blockReason);
    if (request.sourceOperationFrame) {
      if (!issuedOperationFrames.has(request.sourceOperationFrame)) return blocked(
        "classical-included-possessor-source-facts", "denominal-source-operation-frame-not-issued-by-service");
      if (key(request.sourceKind) === "possessive-nnc-predicate") return blocked(
        "classical-included-possessor-source-facts", "denominal-possessive-nnc-source-cannot-be-operation-frame");
      return request.sourceOperationFrame.sourceFrame.includedPossessorSourceFacts;
    }
    return includedPossessorFactsForSource(normalizeSourceRequest(request, exact));
  }

  function buildClassicalNahuatlInstrumentalAzSourceAuthorization(
    nounStem = ""
  ) {
    const normalizedStem = normalizeStem(nounStem);
    const lexical = INSTRUMENTAL_AZ_NOUNSTEMS.includes(
      normalizedStem
    ) || normalizedStem === "tla-pi-āz";
    const connectorClass = /l-hu-āz$/u.test(normalizedStem)
      ? "hu-after-l"
      : /n-hu-(?:āz|az)$/u.test(normalizedStem)
        ? "hu-after-n"
        : /a-hu-āz$/u.test(normalizedStem)
          ? "hu-after-a"
          : "none";
    const licensedContinuations = [
      ...(INSTRUMENTAL_AZ_NOUNSTEMS.includes(normalizedStem)
        ? ["huiā"]
        : []),
      ...(["tepon-āz", "tla-pi-āz"].includes(normalizedStem)
        ? ["o-ā"]
        : []),
    ];
    const frame = deepFreeze({
      kind: "classical-nahuatl-instrumental-az-source-authorization",
      version: VERSION,
      authorizationStatus: lexical ? "authorized" : "blocked",
      blockReason: lexical
        ? ""
        : "instrumental-az-source-not-in-closed-lexical-inventory",
      nounStem: normalizedStem,
      matrixNounstem: lexical ? "āz" : "",
      sourceConstituents: lexical
        ? normalizedStem.split("-")
        : [],
      connectorClass: lexical ? connectorClass : "",
      connectorSelectionAuthority:
        "lexical-and-boundary-conditioned-read-only",
      connectorIsUserChoice: false,
      licensedContinuations,
      productiveForUnknownSources: false,
      typedGrammarAuthority: true,
      callerSuppliedAuthorityAccepted: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
      lessonMetadataAuthority: false,
    });
    if (lexical) issuedInstrumentalAzSourceFrames.add(frame);
    return frame;
  }

  function isClassicalNahuatlInstrumentalAzSourceAuthorization(frame = null) {
    return Boolean(
      issuedInstrumentalAzSourceFrames.has(frame)
      && frame?.kind
        === "classical-nahuatl-instrumental-az-source-authorization"
      && frame.version === VERSION
      && frame.authorizationStatus === "authorized"
      && frame.matrixNounstem === "āz"
      && frame.connectorIsUserChoice === false
      && frame.productiveForUnknownSources === false
      && frame.typedGrammarAuthority === true
      && frame.callerSuppliedAuthorityAccepted === false
      && frame.formulaStringAuthority === false
      && frame.surfaceStringAuthority === false
      && frame.lessonMetadataAuthority === false
      && Object.isFrozen(frame)
    );
  }

  function buildClassicalNahuatlDenominalVncSourceFrame(request = {}) {
    const hostilePath = findHostileAuthorityPath(
      request,
      "request",
      new WeakSet(),
      new Set(["sourceOperationFrame", "canonicalNncResult", "canonicalNncSourceFrame", "verbalStemPreparationFrame", "canonicalBoundNominalSourceFrame", "canonicalNominalRankCorrectionFrame"])
    );
    if (hostilePath) {
      return blocked(
        "classical-nahuatl-denominal-vnc-source-frame",
        "denominal-caller-authority-fields-rejected",
        { rejectedAuthorityPath: hostilePath }
      );
    }
    const exactNncBinding =
      resolveClassicalNahuatlDenominalExactNncBinding(request);
    if (exactNncBinding?.authorizationStatus === "blocked") {
      return blocked(
        "classical-nahuatl-denominal-vnc-source-frame",
        exactNncBinding.blockReason,
        {
          rejectedSourcePath: exactNncBinding.rejectedSourcePath || "",
          canonicalNncResult: exactNncBinding.canonicalNncResult || null,
          canonicalNncSourceProjection:
            exactNncBinding.canonicalNncSourceProjection || null,
        }
      );
    }
    const source = normalizeSourceRequest(request, exactNncBinding);
    // Resolve the bound affective-matrix family through its canonical owner.
    // The receipt is created here; caller fields and spelling do not grant it.
    const affectiveCandidate = source.sourceKind === "nounstem"
      ? targetObject.buildClassicalNahuatlAffectiveDenominalSourceFrame?.({
        affectiveMatrix: source.nounStem,
        denominalKind: "inchoative",
        source: { embedStem: source.nounStem, embedClass: source.sourceNounClass || "tli" },
      })
      : null;
    const affectiveMatrixSourceFrame =
      targetObject.isClassicalNahuatlAffectiveDenominalSourceFrame?.(affectiveCandidate)
        ? affectiveCandidate : null;
    const frame = sourceFrameForRequest(
      source, issuedOperationFrames, affectiveMatrixSourceFrame
      , classNeutralPossessionSources, key(request.operationId || request.selectedOperationId)
    );
    if (frame.authorizationStatus === "authorized") issuedSourceFrames.add(frame);
    return frame;
  }

  function isClassicalNahuatlDenominalVncSourceFrame(frame = null) {
    const exactProjection = frame?.canonicalNncResult
      && typeof targetObject.getClassicalNahuatlNncContinuationSourceConstituents
        === "function"
      ? getDenominalNncSourceProjection(frame.canonicalNncResult)
      : null;
    const exactCarrierValid = frame?.canonicalNncResult
      ? frame.exactResultIdentityPreserved === true
        && exactProjection === frame.canonicalNncSourceProjection
        && exactProjection?.canonicalResultFrame === frame.canonicalNncResult
        && (
          frame.priorOperationFrame
            ? frame.priorOperationFrame.sourceFrame?.canonicalNncResult
                === frame.canonicalNncResult
              && frame.priorOperationFrame.sourceFrame
                ?.canonicalNncSourceProjection
                === frame.canonicalNncSourceProjection
            : normalizeStem(exactProjection?.predicateStem) === frame.nounStem
              && key(exactProjection?.state) === frame.sourceState
        )
      : frame?.canonicalNncSourceProjection === null
        && frame?.exactResultIdentityPreserved === false;
    return Boolean(
      frame
      && issuedSourceFrames.has(frame)
      && frame.kind === "classical-nahuatl-denominal-vnc-source-frame"
      && frame.version === VERSION
      && frame.authorizationStatus === "authorized"
      && frame.typedGrammarAuthority === true
      && frame.callerSuppliedAuthorityAccepted === false
      && frame.lessonMetadataAuthority === false
      && frame.formulaStringAuthority === false
      && frame.surfaceStringAuthority === false
      && frame.sourceStem
      && (!frame.canonicalBoundNominalSourceFrame || (
        isClassicalNahuatlBoundNominalSourceFrame(frame.canonicalBoundNominalSourceFrame)
        && frame.sourceNounClass === ""))
      && (!frame.canonicalNncSourceFrame || (
        isClassicalNahuatlDenominalVerbalStemPreparation(frame.verbalStemPreparationFrame)
        && frame.verbalStemPreparationFrame.canonicalNncSourceFrame === frame.canonicalNncSourceFrame
        && frame.exactSourceIdentityPreserved === true))
      && exactCarrierValid
      && (frame.priorOperationFrame?.kind !== "classical-nahuatl-class-neutral-possession-ti-source"
        || frame.classNeutralPossessionSource === frame.priorOperationFrame
          && isClassNeutralPossessionTiSource(frame.priorOperationFrame, classNeutralPossessionSources))
    );
  }

  function getClassicalNahuatlDenominalVncOperationInventory(request = {}) {
    const sourceFrame = buildClassicalNahuatlDenominalVncSourceFrame(request);
    if (!isClassicalNahuatlDenominalVncSourceFrame(sourceFrame)) {
      return blocked(
        "classical-nahuatl-denominal-vnc-operation-inventory",
        sourceFrame.blockReason || "denominal-source-frame-not-authorized",
        { sourceFrame }
      );
    }
    const options = OPERATION_SPECS
      .filter(spec => isOperationApplicable(spec, sourceFrame))
      .map(spec => {
        const classOptions = classesForSpec(spec, sourceFrame);
        return deepFreeze({
          operationId: spec.id,
          family: spec.family,
          label: spec.label,
          classOptions,
          classSelectionRequired: classOptions.length > 1,
          objectCount: spec.objectCount,
          semanticReadings: spec.semanticReadings,
          limited: spec.limited,
          lexical: spec.lexical,
          attestation: spec.attestation,
        });
      });
    const inventory = deepFreeze({
      kind: "classical-nahuatl-denominal-vnc-operation-inventory",
      version: VERSION,
      authorizationStatus: options.length ? "authorized" : "blocked",
      blockReason: options.length ? "" : "no-andrews-licensed-denominal-operation-for-source",
      sourceFrame,
      options,
      automaticOperationId: options.length === 1 ? options[0].operationId : "",
      operationSelectionRequired: options.length > 1,
      typedGrammarAuthority: true,
      callerSuppliedAuthorityAccepted: false,
      lessonMetadataAuthority: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
    if (options.length) issuedInventories.add(inventory);
    return inventory;
  }

  function isClassicalNahuatlDenominalVncOperationInventory(frame = null) {
    return Boolean(
      frame
      && issuedInventories.has(frame)
      && frame.kind === "classical-nahuatl-denominal-vnc-operation-inventory"
      && frame.version === VERSION
      && frame.authorizationStatus === "authorized"
      && isClassicalNahuatlDenominalVncSourceFrame(frame.sourceFrame)
      && Array.isArray(frame.options)
      && frame.options.length
    );
  }

  function deriveClassicalNahuatlDenominalVncOperation(request = {}) {
    const inventory = getClassicalNahuatlDenominalVncOperationInventory(request);
    if (!isClassicalNahuatlDenominalVncOperationInventory(inventory)) {
      return blocked(
        "classical-nahuatl-denominal-vnc-operation-frame",
        operationInapplicabilityReason(
          OPERATION_BY_ID.get(key(request.operationId || request.selectedOperationId)),
          inventory.sourceFrame
        ) || inventory.blockReason || "denominal-operation-inventory-not-authorized",
        { sourceFrame: inventory.sourceFrame || null }
      );
    }
    const exactNncBinding =
      resolveClassicalNahuatlDenominalExactNncBinding(request);
    const source = normalizeSourceRequest(request, exactNncBinding);
    const operationId = key(request.operationId || request.selectedOperationId || inventory.automaticOperationId);
    const selected = inventory.options.find(option => option.operationId === operationId) || null;
    const spec = OPERATION_BY_ID.get(operationId) || null;
    if (!selected || !spec) {
      return blocked(
        "classical-nahuatl-denominal-vnc-operation-frame",
        operationInapplicabilityReason(spec, inventory.sourceFrame) || (operationId
          ? "selected-denominal-operation-not-licensed-for-source"
          : "denominal-operation-selection-required"),
        { sourceFrame: inventory.sourceFrame, inventory }
      );
    }
    if (inventory.sourceFrame.verbalStemPreparationFrame && !inventory.sourceFrame.priorOperationFrame
      && operationId !== inventory.sourceFrame.verbalStemPreparationFrame.operationId) return blocked(
      "classical-nahuatl-denominal-vnc-operation-frame", "denominal-verbal-preparation-operation-mismatch");
    const targetClass = selected.classOptions.length === 1
      ? selected.classOptions[0]
      : selected.classOptions.includes(source.classChoice)
        ? source.classChoice
        : "";
    if (!targetClass) {
      return blocked(
        "classical-nahuatl-denominal-vnc-operation-frame",
        "denominal-target-class-selection-required",
        { sourceFrame: inventory.sourceFrame, inventory, selectedOperationId: operationId }
      );
    }
    const huiBoundaryFrame = spec.id === "inceptive-hui"
      ? resolveExactHuiBoundary(inventory.sourceFrame) : null;
    if (huiBoundaryFrame?.authorizationStatus === "blocked") {
      return blocked("classical-nahuatl-denominal-vnc-operation-frame",
        huiBoundaryFrame.blockReason, { sourceFrame: inventory.sourceFrame });
    }
    const includedPossessorBoundaryFrame = spec.id === "included-possessor-ti"
      ? resolveIncludedPossessorBoundary(inventory.sourceFrame) : null;
    if (spec.id === "included-possessor-ti" && !includedPossessorBoundaryFrame) {
      return blocked("classical-nahuatl-denominal-vnc-operation-frame",
        "included-possessor-writing-owner-required", {sourceFrame: inventory.sourceFrame});
    }
    const targetStem = includedPossessorBoundaryFrame
      ? join(...includedPossessorBoundaryFrame.realizedTargetMorphs)
      : buildTargetStem(spec, inventory.sourceFrame, huiBoundaryFrame);
    if (!targetStem) {
      return blocked(
        "classical-nahuatl-denominal-vnc-operation-frame",
        "denominal-target-stem-could-not-be-derived",
        { sourceFrame: inventory.sourceFrame, selectedOperationId: operationId }
      );
    }
    if ((spec.id === "applicative-huia-double-object" || spec.family.startsWith("ti-a-causative-double-"))
      && source.objectPeople[1] === "reflexive"
      && source.possessorPerson !== source.subject) {
      return blocked("classical-nahuatl-denominal-vnc-operation-frame",
        "denominal-possessor-reflexive-coordinate-mismatch", {sourceFrame: inventory.sourceFrame});
    }
    const objectRequests = deepFreeze(buildObjectRequests(spec, source, inventory.sourceFrame));
    const frame = deepFreeze({
      kind: "classical-nahuatl-denominal-vnc-operation-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      blockReason: "",
      operationId,
      family: spec.family,
      sourceFrame: inventory.sourceFrame,
      sourceStem: inventory.sourceFrame.sourceStem,
      includedPossessorBoundaryFrame,
      targetStem,
      targetClass,
      ...(spec.id === "ti-a-causative-single" && inventory.sourceFrame.priorOperationId === "inceptive-hui"
        ? {causativeFormationFrame: deepFreeze({
          kind:"classical-denominal-type-one-causative-formation",
          procedure:"replace-final-i-with-short-causative-a",
          sourceOperationFrame:inventory.sourceFrame.priorOperationFrame,
          sourceStem:inventory.sourceFrame.priorOperationFrame.targetStem,
          sourceClass:"B",targetStem,targetClass:"B",
          causativeMorpheme:"a",perfectiveCausativeCarrier:"⎕",
          finiteSourceParticipantAsserted:false,
        })} : {}),
      ...(huiBoundaryFrame ? { huiBoundaryFrame } : {}),
      objectCount: objectRequests.length,
      objectRequests,
      participantProjection: objectRequests.length === 2
        ? deepFreeze({
          kind: "possessive-nnc-double-object-projection",
          sourceSubject: source.sourceSubject,
          sourceSubjectTargetRole: spec.id === "ti-a-causative-double-possession"
            ? "incorporated-possessed-entity" : "causative-object",
          ...(spec.id === "ti-a-causative-double-possession" ? {
            sourceNncSubjectReferenceFrame:
              inventory.sourceFrame.canonicalNncSourceProjection
                ?.subjectParticipantFrame || null,
            possessionHolder: source.subject,
            possessionHolderTargetRole: "reflexive-causative-object",
            causerAndPossessionHolderCoreferential: true,
          } : {}),
          sourcePossessor: source.possessorPerson,
          sourcePossessorTargetRole: "applicative-object",
        })
        : objectRequests.length === 1
          ? "one-derived-object-function"
          : "no-object-function",
      classPolicy: spec.classPolicy,
      semanticReading: selected.semanticReadings.length === 1
        ? selected.semanticReadings[0]
        : key(request.semanticReading),
      lcmAxisIds: LCM_AXES
        .filter(axis => axis.axisId === "authority-boundary"
          || axis.axisId === "finite-class"
          || axis.axisId === "valence"
          || axis.axisId.includes(spec.family.split("-").slice(0, 2).join("-")))
        .map(axis => axis.axisId),
      typedGrammarAuthority: true,
      callerSuppliedAuthorityAccepted: false,
      lessonMetadataAuthority: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
    issuedOperationFrames.add(frame);
    return frame;
  }

  function isClassicalNahuatlDenominalVncOperationFrame(frame = null) {
    return Boolean(
      frame
      && issuedOperationFrames.has(frame)
      && frame.kind === "classical-nahuatl-denominal-vnc-operation-frame"
      && frame.version === VERSION
      && frame.authorizationStatus === "authorized"
      && OPERATION_BY_ID.has(frame.operationId)
      && isClassicalNahuatlDenominalVncSourceFrame(frame.sourceFrame)
      && frame.targetStem
      && ["A", "B", "C"].includes(frame.targetClass)
      && Array.isArray(frame.objectRequests)
      && frame.objectRequests.length === frame.objectCount
      && frame.typedGrammarAuthority === true
      && frame.callerSuppliedAuthorityAccepted === false
      && frame.lessonMetadataAuthority === false
      && frame.formulaStringAuthority === false
      && frame.surfaceStringAuthority === false
    );
  }

  function getClassicalNahuatlDenominalVncOperationPathInventory(request = {}) {
    const hostilePath = findHostileAuthorityPath(
      request,
      "request",
      new WeakSet(),
      new Set(["canonicalNncResult", "canonicalNncSourceFrame", "verbalStemPreparationFrame", "canonicalBoundNominalSourceFrame", "canonicalNominalRankCorrectionFrame"])
    );
    if (hostilePath) {
      return blocked(
        "classical-nahuatl-denominal-vnc-operation-path-inventory",
        "denominal-caller-authority-fields-rejected",
        { rejectedAuthorityPath: hostilePath }
      );
    }
    const callerSelectionField = PATH_INVENTORY_SELECTION_KEYS.find(field => {
      const value = request?.[field];
      return Array.isArray(value)
        ? value.length > 0
        : value && typeof value === "object"
          ? Object.keys(value).length > 0
          : value !== undefined && value !== null && value !== "";
    });
    if (callerSelectionField) {
      return blocked(
        "classical-nahuatl-denominal-vnc-operation-path-inventory",
        "denominal-path-inventory-selection-fields-rejected",
        { rejectedSelectionPath: `request.${callerSelectionField}` }
      );
    }

    const exactNncBinding =
      resolveClassicalNahuatlDenominalExactNncBinding(request);
    if (exactNncBinding?.authorizationStatus === "blocked") {
      return blocked(
        "classical-nahuatl-denominal-vnc-operation-path-inventory",
        exactNncBinding.blockReason,
        {
          rejectedSourcePath: exactNncBinding.rejectedSourcePath || "",
          canonicalNncResult: exactNncBinding.canonicalNncResult || null,
          canonicalNncSourceProjection:
            exactNncBinding.canonicalNncSourceProjection || null,
        }
      );
    }
    const normalizedSource = normalizeSourceRequest(request, exactNncBinding);
    const includedPossessorSourceFacts = includedPossessorFactsForSource(normalizedSource);
    if (includedPossessorSourceFacts.authorizationStatus !== "authorized") return blocked(
      "classical-nahuatl-denominal-vnc-operation-path-inventory", includedPossessorSourceFacts.blockReason);
    const sourceStem = normalizeStem(
      normalizedSource.nounStem
      || normalizedSource.nounRoot
      || normalizedSource.sourceVerbStem
    );
    if (!sourceStem) {
      return blocked(
        "classical-nahuatl-denominal-vnc-operation-path-inventory",
        "denominal-source-stem-required"
      );
    }
    const explicitSourceKind = exactNncBinding ? "" : key(request.sourceKind);
    const explicitSourceState = exactNncBinding
      ? exactNncBinding.sourceState
      : key(request.sourceState);
    const pathChoices = [];
    const blockedPathChoices = [];
    const pathChoiceIds = new Set();

    function buildRootRequest(spec) {
      if (exactNncBinding?.canonicalBoundNominalSourceFrame
        && !exactNncBinding.canonicalBoundNominalSourceFrame.lexicalAnalysis.initialOperationIds.includes(spec.id)) return null;
      if (exactNncBinding?.verbalStemPreparationFrame && spec.id !== exactNncBinding.verbalStemPreparationFrame.operationId) return null;
      if (spec.continuationOf.length || spec.attestation === "category-only") {
        return null;
      }
      if (
        exactNncBinding
        && (
          spec.sourceState !== exactNncBinding.sourceState
          || (
            exactNncBinding.sourceState === "absolutive"
            && !["nounstem", "nounroot-or-stem-as-root", ...(exactNncBinding.sourceKind === "deverbal-yo-nounstem" ? ["deverbal-yo-nounstem"] : [])].includes(
              spec.sourceKind
            )
          )
          || (
            exactNncBinding.sourceState === "possessive"
            && spec.sourceKind !== "possessive-nnc-predicate"
          )
        )
      ) {
        return null;
      }
      if (
        explicitSourceKind
        && explicitSourceKind !== "auto"
        && explicitSourceKind !== spec.sourceKind
      ) {
        return null;
      }
      if (
        explicitSourceState
        && explicitSourceState !== "auto"
        && explicitSourceState !== spec.sourceState
      ) {
        return null;
      }
      const sourceIsVnc = [
        "destockal-ni-hui-vnc",
        "lexical-o-a-vnc",
      ].includes(spec.sourceKind);
      const sourceIsRoot = spec.sourceKind === "nounroot-or-stem-as-root";
      const possessiveSourceDiscovery = !exactNncBinding
        && spec.sourceKind === "possessive-nnc-predicate"
          ? {
            // These values let the owner enumerate structurally available
            // possessive-source paths before the user makes their dependent
            // Source selections. They never leave the inventory as a Source
            // request and therefore cannot authorize a Result.
            sourceSubject: "3sg",
            possessor: includedPossessorSourceFacts.meaningFamily === "temporal-pan"
              ? "3common" : "3sg",
          }
          : {};
      const rootRequest = {
        ...request,
        ...possessiveSourceDiscovery,
        ...(spec.id === "included-possessor-ti" ? {
          // A structural discovery probe does not leave the inventory as
          // executable Source analysis or sentence selections.
          ...(!includedPossessorSourceFacts.meaningFamily ? {
            includedPossessorSourceAnalysis: {
              sourceStem: includedPossessorSourceFacts.sourceStem,
              meaningFamily: "proxy",
            },
          } : {}),
          ...(includedPossessorSourceFacts.requiredTense ? {
            tense: includedPossessorSourceFacts.requiredTense,
            exclamatory: includedPossessorSourceFacts.requiredExclamatory,
          } : includedPossessorSourceFacts.expectedTenses.length
            && !includedPossessorSourceFacts.expectedTenses.includes(normalizedSource.tense) ? {
            tense: includedPossessorSourceFacts.expectedTenses[0],
          } : {}),
        } : {}),
        nounStem: sourceIsVnc ? "" : sourceStem,
        nounRoot: sourceIsRoot ? sourceStem : "",
        sourceVerbStem: sourceIsVnc ? sourceStem : "",
        sourceKind: spec.sourceKind,
        sourceState: spec.sourceState,
        operationId: "",
        selectedOperationId: "",
        operationPath: undefined,
        classChoice: "",
        classChoices: undefined,
        sourceOperationFrame: null,
      };
      if (exactNncBinding) issuedExactNncDerivedRequests.add(rootRequest);
      return rootRequest;
    }

    function deriveVariants(stepRequest, spec) {
      const inventory = getClassicalNahuatlDenominalVncOperationInventory(
        stepRequest
      );
      if (!isClassicalNahuatlDenominalVncOperationInventory(inventory)) {
        return [];
      }
      const option = inventory.options.find(
        candidate => candidate.operationId === spec.id
      );
      if (!option) return [];
      return option.classOptions.flatMap(classChoice => {
        const variantRequest = {
          ...stepRequest,
          operationId: spec.id,
          classChoice,
        };
        if (stepRequest.canonicalNncResult || stepRequest.canonicalBoundNominalSourceFrame || stepRequest.canonicalNncSourceFrame) {
          issuedExactNncDerivedRequests.add(variantRequest);
        }
        const operationFrame = deriveClassicalNahuatlDenominalVncOperation(
          variantRequest
        );
        return isClassicalNahuatlDenominalVncOperationFrame(operationFrame)
          ? [{
            operationFrame,
            classSelectionRequired: option.classSelectionRequired,
          }]
          : [];
      });
    }

    function appendChoice({
      rootRequest,
      pathFrames,
      classChoices,
      classSelectionOperationIds,
    }) {
      const operationFrame = pathFrames.at(-1);
      const operationSpecRecord = OPERATION_BY_ID.get(
        operationFrame.operationId
      );
      const operationPath = pathFrames.map(frame => frame.operationId);
      const classSignature = operationPath
        .map(operationId => `${operationId}:${classChoices[operationId] || ""}`)
        .join(">");
      const pathChoiceId = `${rootRequest.sourceKind}|${classSignature}`;
      if (pathChoiceIds.has(pathChoiceId)) return;
      pathChoiceIds.add(pathChoiceId);
      const pathLabel = pathFrames.map(frame => {
        const spec = OPERATION_BY_ID.get(frame.operationId);
        const selectedClass = classChoices[frame.operationId] || "";
        const label = frame.operationId === "ti-a-causative-single"
          && isPanTargetPossessor(frame.sourceFrame.priorOperationFrame?.sourceFrame)
          ? "cause to hit a target" : spec.label;
        return classSelectionOperationIds.includes(frame.operationId)
          ? `${label} · Class ${selectedClass}` : label;
      }).join(" → ");
      const includedPossessor = operationPath.includes(
        "included-possessor-ti"
      );
      const sourceProjectedDoubleObject =
        SOURCE_PROJECTED_DOUBLE_OBJECT_OPERATION_IDS.includes(
          operationSpecRecord.id
        );
      const controlRequirements = deepFreeze({
        sourceSubject: sourceProjectedDoubleObject,
        sourcePossessor:
          rootRequest.sourceKind === "possessive-nnc-predicate",
        sourcePossessorValues: operationFrame.operationId === "ti-a-causative-single"
          && isPanTargetPossessor(operationFrame.sourceFrame.priorOperationFrame?.sourceFrame)
          ? ["3common"]
          : operationFrame.operationId === "included-possessor-ti"
          ? ["1sg", "2sg", "3sg", "1pl", "2pl", "3pl", "te", "tla",
            ...(includedPossessorSourceFacts.meaningFamily === "temporal-pan" ? ["3common"] : [])]
          : ["1sg", "2sg", "3sg", "1pl", "2pl", "3pl"],
        includedPossessorFamily: includedPossessor,
        includedPossessorSourceFacts,
        includedPossessorFiniteContext: includedPossessor && operationFrame.operationId === "included-possessor-ti",
        resultSubject: true,
        resultObjectKinds: operationFrame.objectCount === 1
          ? operationSpecRecord.id === "applicative-huia-use" || operationFrame.causativeFormationFrame
            || operationSpecRecord.id === "ti-a-causative-single"
              && (operationFrame.sourceFrame.priorOperationId === "possession-ti"
                || isPanTargetPossessor(operationFrame.sourceFrame.priorOperationFrame?.sourceFrame))
            ? ["non-specific-human", "non-specific-nonhuman"]
            : operationFrame.sourceFrame.affectiveMatrixSourceFrame?.causativeObjectKinds || []
          : [],
        resultObjectPeople: sourceProjectedDoubleObject
          ? 0
          : operationSpecRecord.objectCount,
        resultPossessorRelation: sourceProjectedDoubleObject,
        resultPossessorRelationOptions: sourceProjectedDoubleObject
          ? ["source-possessor", "reflexive"] : [],
      });
      pathChoices.push(deepFreeze({
        pathChoiceId,
        operationId: operationFrame.operationId,
        operationLabel: operationSpecRecord.label,
        operationPath,
        pathLabel,
        classChoices: { ...classChoices },
        classSelectionOperationIds: [...classSelectionOperationIds],
        finalClassChoice:
          classChoices[operationFrame.operationId] || "",
        controlRequirements,
        sourceKind: rootRequest.sourceKind,
        sourceState: rootRequest.sourceState,
        sourceRequest: rootRequest.canonicalBoundNominalSourceFrame
          ? {canonicalBoundNominalSourceFrame: rootRequest.canonicalBoundNominalSourceFrame}
          : rootRequest.canonicalNncSourceFrame
          ? {canonicalNncSourceFrame: rootRequest.canonicalNncSourceFrame, verbalStemPreparationFrame: rootRequest.verbalStemPreparationFrame,
            ...(rootRequest.canonicalNominalRankCorrectionFrame?{canonicalNominalRankCorrectionFrame:rootRequest.canonicalNominalRankCorrectionFrame}:{})}
          : rootRequest.canonicalNncResult
          ? {
            canonicalNncResult: rootRequest.canonicalNncResult,
          }
          : {
            nounStem: rootRequest.nounStem,
            sourceNounClass: rootRequest.sourceNounClass || "",
            nounRoot: rootRequest.nounRoot,
            sourceVerbStem: rootRequest.sourceVerbStem,
            sourceKind: rootRequest.sourceKind,
            sourceState: rootRequest.sourceState,
          },
      }));
    }

    function visit({
      rootRequest,
      operationFrame,
      pathFrames,
      classChoices,
      classSelectionOperationIds,
    }) {
      appendChoice({
        rootRequest,
        pathFrames,
        classChoices,
        classSelectionOperationIds,
      });
      if (pathFrames.length >= 4) return;
      OPERATION_SPECS
        .filter(spec => (
          spec.attestation !== "category-only"
          && spec.continuationOf.includes(operationFrame.operationId)
        ))
        .forEach(spec => {
          const stepRequest = {
            ...request,
            canonicalNncResult: null,
            canonicalNncSourceFrame: null, verbalStemPreparationFrame: null, canonicalBoundNominalSourceFrame: null,
            nounStem: "",
            nounRoot: "",
            sourceVerbStem: "",
            sourceKind: "generated-vnc",
            sourceState: "derived",
            sourceOperationFrame: operationFrame,
            operationId: "",
            selectedOperationId: "",
            operationPath: undefined,
            classChoice: "",
            classChoices: undefined,
          };
          const continuationSource = { priorOperationId: operationFrame.operationId,
            priorOperationFrame: operationFrame };
          const blockReason = operationInapplicabilityReason(spec, continuationSource);
          if (blockReason) {
            const operationPath = [...pathFrames.map(frame => frame.operationId), spec.id];
            classesForSpec(spec, continuationSource).forEach(targetClass => {
              const blockedClasses = { ...classChoices, [spec.id]: targetClass };
              blockedPathChoices.push(deepFreeze({
                pathChoiceId: `${rootRequest.sourceKind}|${operationPath
                  .map(id => `${id}:${blockedClasses[id] || ""}`).join(">")}`,
                operationId: spec.id,
                operationPath,
                classChoices: blockedClasses,
                authorizationStatus: "blocked",
                blockReason,
                grammarAuthority: false,
              }));
            });
            return;
          }
          deriveVariants(stepRequest, spec).forEach(variant => {
            visit({
              rootRequest,
              operationFrame: variant.operationFrame,
              pathFrames: [...pathFrames, variant.operationFrame],
              classChoices: {
                ...classChoices,
                [spec.id]: variant.operationFrame.targetClass,
              },
              classSelectionOperationIds:
                variant.classSelectionRequired
                  ? [...classSelectionOperationIds, spec.id]
                  : classSelectionOperationIds,
            });
          });
        });
    }

    OPERATION_SPECS.forEach(spec => {
      const rootRequest = buildRootRequest(spec);
      if (!rootRequest) return;
      deriveVariants(rootRequest, spec).forEach(variant => {
        visit({
          rootRequest,
          operationFrame: variant.operationFrame,
          pathFrames: [variant.operationFrame],
          classChoices: {
            [spec.id]: variant.operationFrame.targetClass,
          },
          classSelectionOperationIds:
            variant.classSelectionRequired ? [spec.id] : [],
        });
      });
    });

    // §54.5.1a licenses this adjacent composite even when the intransitive
    // possession-ti stem is unattested. Its unused finite A/B paradigm is
    // not selected merely to reach the independently licensed ā/C result.
    const possessionRoot = buildRootRequest(OPERATION_BY_ID.get("possession-ti"));
    if (possessionRoot) {
      const structural = buildClassNeutralPossessionTiSource(possessionRoot);
      if (structural) {
        const finalRequest = {...request, canonicalNncResult: null,
          canonicalNncSourceFrame: null, canonicalBoundNominalSourceFrame: null,
          canonicalNominalRankCorrectionFrame: null, verbalStemPreparationFrame: null,
          nounStem: "", nounRoot: "", sourceStem: "", sourceVerbStem: "",
          sourceOperationFrame: structural, sourceKind: "generated-vnc", sourceState: "derived",
          operationId: "ti-a-causative-single", operationPath: undefined,
          classChoices: undefined, classChoice: "C"};
        const final = deriveClassicalNahuatlDenominalVncOperation(finalRequest);
        if (isClassicalNahuatlDenominalVncOperationFrame(final)) appendChoice({
          rootRequest: possessionRoot, pathFrames: [structural, final],
          classChoices: {"ti-a-causative-single": "C"}, classSelectionOperationIds: [],
        });
      }
    }

    const operationOptionsById = new Map();
    pathChoices.forEach(choice => {
      const current = operationOptionsById.get(choice.operationId);
      if (current) {
        current.pathChoiceIds.push(choice.pathChoiceId);
        return;
      }
      operationOptionsById.set(choice.operationId, {
        operationId: choice.operationId,
        label: choice.operationLabel,
        pathChoiceIds: [choice.pathChoiceId],
      });
    });
    const operationOptions = [...operationOptionsById.values()]
      .map(option => deepFreeze(option));
    const authorized = pathChoices.length > 0;
    const inventory = deepFreeze({
      kind:
        "classical-nahuatl-denominal-vnc-operation-path-inventory",
      version: VERSION,
      authorizationStatus: authorized ? "authorized" : "blocked",
      blockReason: authorized
        ? ""
        : "no-andrews-licensed-denominal-operation-path-for-source",
      sourceStem,
      includedPossessorSourceFacts,
      canonicalNncResult: exactNncBinding?.canonicalNncResult || null,
      canonicalNncSourceProjection:
        exactNncBinding?.canonicalNncSourceProjection || null,
      canonicalBoundNominalSourceFrame:
        exactNncBinding?.canonicalBoundNominalSourceFrame || null,
      canonicalNncSourceFrame: exactNncBinding?.canonicalNncSourceFrame || null,
      verbalStemPreparationFrame: exactNncBinding?.verbalStemPreparationFrame || null,
      canonicalNominalRankCorrectionFrame: exactNncBinding?.canonicalNominalRankCorrectionFrame || null,
      exactSourceIdentityPreserved:
        Boolean(exactNncBinding?.canonicalBoundNominalSourceFrame
          || exactNncBinding?.canonicalNncSourceFrame),
      exactResultIdentityPreserved: Boolean(exactNncBinding?.canonicalNncResult),
      operationOptions,
      pathChoices,
      blockedPathChoices,
      automaticOperationId:
        operationOptions.length === 1
          ? operationOptions[0].operationId
          : "",
      automaticPathChoiceId:
        pathChoices.length === 1
          ? pathChoices[0].pathChoiceId
          : "",
      operationSelectionRequired: operationOptions.length > 1,
      pathSelectionRequired:
        operationOptions.some(option => option.pathChoiceIds.length > 1),
      typedGrammarAuthority: true,
      callerSuppliedAuthorityAccepted: false,
      lessonMetadataAuthority: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
    if (authorized) issuedPathInventories.add(inventory);
    return inventory;
  }

  function isClassicalNahuatlDenominalVncOperationPathInventory(
    frame = null
  ) {
    const exactProjection = frame?.canonicalNncResult
      && typeof targetObject.getClassicalNahuatlNncContinuationSourceConstituents
        === "function"
      ? getDenominalNncSourceProjection(frame.canonicalNncResult)
      : null;
    const boundSource = frame?.canonicalBoundNominalSourceFrame;
    const nominalSource = frame?.canonicalNncSourceFrame;
    const preparation = frame?.verbalStemPreparationFrame;
    const rankCorrection = frame?.canonicalNominalRankCorrectionFrame;
    const preparedSourceValid = nominalSource
      && targetObject.isClassicalNahuatlOrdinaryNncSourceFrame?.(nominalSource) === true
      && isClassicalNahuatlDenominalVerbalStemPreparation(preparation)
      && preparation.canonicalNncSourceFrame === nominalSource
      && (!rankCorrection || isClassicalNahuatlNominalRankCorrectedSourceFrame(rankCorrection)
        && rankCorrection.canonicalNncSourceFrame === nominalSource
        && preparation.operationId === rankCorrection.sourceAnalysis.licensedOperationId);
    const exactCarrierValid = boundSource
      ? isClassicalNahuatlBoundNominalSourceFrame(boundSource)
        && frame.exactSourceIdentityPreserved === true
        && frame.exactResultIdentityPreserved === false
        && frame.canonicalNncResult === null
        && frame.canonicalNncSourceProjection === null
      : nominalSource
      ? preparedSourceValid
        && frame.exactSourceIdentityPreserved === true
        && frame.exactResultIdentityPreserved === false
        && frame.canonicalNncResult === null
        && frame.canonicalNncSourceProjection === null
      : frame?.canonicalNncResult
      ? frame.exactResultIdentityPreserved === true
        && exactProjection === frame.canonicalNncSourceProjection
        && exactProjection?.canonicalResultFrame === frame.canonicalNncResult
      : frame?.canonicalNncSourceProjection === null
        && frame?.exactResultIdentityPreserved === false;
    return Boolean(
      frame
      && issuedPathInventories.has(frame)
      && frame.kind
        === "classical-nahuatl-denominal-vnc-operation-path-inventory"
      && frame.version === VERSION
      && frame.authorizationStatus === "authorized"
      && Array.isArray(frame.operationOptions)
      && frame.operationOptions.length > 0
      && Array.isArray(frame.pathChoices)
      && frame.pathChoices.length > 0
      && frame.pathChoices.every(choice => (
        choice.operationPath.at(-1) === choice.operationId
        && (
          boundSource
            ? choice.sourceRequest?.canonicalBoundNominalSourceFrame
                === boundSource
              && Reflect.ownKeys(choice.sourceRequest).length === 1
            : frame.canonicalNncResult
            ? choice.sourceRequest?.canonicalNncResult
                === frame.canonicalNncResult
              && Reflect.ownKeys(choice.sourceRequest).length === 1
            : nominalSource
            ? choice.sourceRequest?.canonicalNncSourceFrame === nominalSource
              && choice.sourceRequest?.verbalStemPreparationFrame === preparation
              && (rankCorrection
                ? choice.sourceRequest.canonicalNominalRankCorrectionFrame === rankCorrection
                  && Reflect.ownKeys(choice.sourceRequest).length === 3
                : Reflect.ownKeys(choice.sourceRequest).length === 2)
            : choice.sourceRequest?.sourceKind === choice.sourceKind
              && choice.sourceRequest?.sourceState === choice.sourceState
        )
        && typeof choice.controlRequirements?.sourceSubject === "boolean"
        && typeof choice.controlRequirements?.sourcePossessor === "boolean"
        && typeof choice.controlRequirements?.includedPossessorFamily
          === "boolean"
        && choice.controlRequirements?.resultSubject === true
        && Number.isInteger(
          choice.controlRequirements?.resultObjectPeople
        )
        && choice.controlRequirements.resultObjectPeople >= 0
        && choice.controlRequirements.resultObjectPeople <= 2
      ))
      && frame.typedGrammarAuthority === true
      && frame.callerSuppliedAuthorityAccepted === false
      && frame.lessonMetadataAuthority === false
      && frame.formulaStringAuthority === false
      && frame.surfaceStringAuthority === false
      && exactCarrierValid
      && Object.isFrozen(frame)
    );
  }

  function buildClassNeutralPossessionTiSource(request) {
    const probes = ["A", "B"].map(classChoice => {
      const probe = {...request, operationId: "possession-ti", selectedOperationId: "",
        operationPath: undefined, classChoices: undefined, classChoice};
      if (probe.canonicalNncResult || probe.canonicalBoundNominalSourceFrame || probe.canonicalNncSourceFrame) {
        issuedExactNncDerivedRequests.add(probe);
      }
      return deriveClassicalNahuatlDenominalVncOperation(probe);
    });
    if (!probes.every(isClassicalNahuatlDenominalVncOperationFrame)
      || probes.some((frame, index) => frame.operationId !== "possession-ti"
        || frame.targetClass !== ["A", "B"][index] || frame.objectCount !== 0)
      || probes[0].targetStem !== probes[1].targetStem
      || probes[0].sourceFrame.sourceState !== "absolutive"
      || probes[0].sourceFrame.canonicalNncResult !== probes[1].sourceFrame.canonicalNncResult
      || probes[0].sourceFrame.canonicalNncSourceFrame !== probes[1].sourceFrame.canonicalNncSourceFrame
      || probes[0].sourceFrame.canonicalBoundNominalSourceFrame !== probes[1].sourceFrame.canonicalBoundNominalSourceFrame) return null;
    const sourceFrame = probes[0].sourceFrame;
    const targetStem = probes[0].targetStem;
    const possibleClasses = deepFreeze(["A", "B"]);
    const alternatives = deepFreeze(possibleClasses.map(candidateClass => ({
      candidateClass, targetStem, classSelected: false,
    })));
    const frame = deepFreeze({kind: "classical-nahuatl-class-neutral-possession-ti-source",
      version: VERSION, operationId: "possession-ti", sourceFrame, targetStem,
      targetClass: "", classClaimed: false, finiteGenerationAllowed: false,
      possibleClasses, alternatives, objectCount: 0,
      licensedConsumer: "ti-a-causative-single", licensedConsumerClass: "C",
      typedGrammarAuthority: true, callerSuppliedAuthorityAccepted: false,
      formulaStringAuthority: false, surfaceStringAuthority: false, lessonMetadataAuthority: false});
    // Conditional classed probes are private proof of convergence. Exposing
    // them would accidentally grant finite intermediate authority.
    classNeutralPossessionSources.set(frame, {sourceFrame, targetStem,
      possibleClasses, alternatives, conditionalOperations: probes});
    return frame;
  }

  function deriveClassicalNahuatlDenominalVncOperationPath(request = {}) {
    const hostilePath = findHostileAuthorityPath(
      request,
      "request",
      new WeakSet(),
      new Set(["sourceOperationFrame", "canonicalNncResult", "canonicalNncSourceFrame", "verbalStemPreparationFrame", "canonicalBoundNominalSourceFrame", "canonicalNominalRankCorrectionFrame"])
    );
    if (hostilePath) {
      return blocked(
        "classical-nahuatl-denominal-vnc-operation-frame",
        "denominal-caller-authority-fields-rejected",
        {
          sourceFrame: blocked(
            "classical-nahuatl-denominal-vnc-source-frame",
            "denominal-caller-authority-fields-rejected",
            { rejectedAuthorityPath: hostilePath }
          ),
        }
      );
    }
    const operationPath = Array.isArray(request.operationPath)
      ? request.operationPath.map(key).filter(Boolean)
      : [];
    if (!operationPath.length) {
      return deriveClassicalNahuatlDenominalVncOperation(request);
    }
    if (operationPath.length > 4 || new Set(operationPath).size !== operationPath.length) {
      return blocked(
        "classical-nahuatl-denominal-vnc-operation-frame",
        "denominal-operation-path-invalid"
      );
    }
    const requestedFinalOperation = key(request.operationId || request.selectedOperationId);
    if (requestedFinalOperation
      && requestedFinalOperation !== operationPath[operationPath.length - 1]) {
      return blocked(
        "classical-nahuatl-denominal-vnc-operation-frame",
        "denominal-operation-path-final-mismatch"
      );
    }
    const exactNncBinding =
      resolveClassicalNahuatlDenominalExactNncBinding(request);
    if (exactNncBinding?.authorizationStatus === "blocked") {
      return blocked(
        "classical-nahuatl-denominal-vnc-operation-frame",
        exactNncBinding.blockReason,
        {
          sourceFrame: blocked(
            "classical-nahuatl-denominal-vnc-source-frame",
            exactNncBinding.blockReason,
            {
              rejectedSourcePath: exactNncBinding.rejectedSourcePath || "",
            }
          ),
        }
      );
    }
    let operationFrame = null;
    for (let index = 0; index < operationPath.length; index += 1) {
      const operationId = operationPath[index];
      if (index === 0 && operationPath.length === 2 && operationId === "possession-ti"
        && operationPath[1] === "ti-a-causative-single"
        && !text(request.classChoices?.[operationId])) {
        operationFrame = buildClassNeutralPossessionTiSource(request);
        if (!operationFrame) return blocked("classical-nahuatl-denominal-vnc-operation-frame",
          "class-neutral-possession-ti-source-unavailable");
        continue;
      }
      const spec = OPERATION_BY_ID.get(operationId);
      if (!spec) {
        return blocked(
          "classical-nahuatl-denominal-vnc-operation-frame",
          "denominal-operation-path-contains-unknown-operation"
        );
      }
      const classChoice = text(
        request.classChoices?.[operationId]
        || (index === operationPath.length - 1 ? request.classChoice : "")
      ).toUpperCase();
      const stepRequest = index === 0
        ? {
          ...request,
          ...(exactNncBinding
            ? {
              nounStem: exactNncBinding.nounStem,
              nounRoot: spec.sourceKind === "nounroot-or-stem-as-root"
                ? exactNncBinding.nounStem
                : "",
              sourceVerbStem: "",
            }
            : {}),
          operationId,
          selectedOperationId: "",
          operationPath: undefined,
          sourceKind: request.sourceKind || spec.sourceKind,
          classChoice,
        }
        : {
          ...request,
          canonicalNncResult: null,
          canonicalNncSourceFrame: null, verbalStemPreparationFrame: null, canonicalBoundNominalSourceFrame: null,
          nounStem: "",
          nounRoot: "",
          sourceStem: "",
          sourceVerbStem: "",
          sourceOperationFrame: operationFrame,
          sourceKind: "generated-vnc",
          sourceState: "derived",
          operationId,
          selectedOperationId: "",
          operationPath: undefined,
          classChoice,
        };
      if (index === 0 && exactNncBinding) {
        issuedExactNncDerivedRequests.add(stepRequest);
      }
      if (index === 0 && operationPath.length > 1 && operationId === "included-possessor-ti") {
        const facts = includedPossessorFactsForSource(normalizeSourceRequest(request, exactNncBinding));
        const rootTense = facts.requiredTense || (facts.expectedTenses?.length
          && !facts.expectedTenses.includes(key(request.tense || "present")) ? facts.expectedTenses[0] : "");
        if (rootTense) {
          // Derive the root in its licensed structural context. The final
          // causative's finite coordinate is owned by that later operation.
          stepRequest.tense = rootTense;
          stepRequest.exclamatory = facts.requiredExclamatory;
          stepRequest.sentenceOptions = {sentenceType: "affirmative-assertion",
            punctuationMode: facts.requiredExclamatory ? "exclamation" : "statement"};
        }
      }
      operationFrame = deriveClassicalNahuatlDenominalVncOperation(stepRequest);
      if (!isClassicalNahuatlDenominalVncOperationFrame(operationFrame)) return operationFrame;
    }
    return operationFrame;
  }

  function buildGrammarFrame(operationFrame, canonicalVncFrame) {
    const finite = canonicalVncFrame?.resultFrame?.finiteSurfaceFrame || null;
    const stageStatus = {
      typedNncSource: isClassicalNahuatlDenominalVncSourceFrame(operationFrame?.sourceFrame),
      licensedDenominalOperation: isClassicalNahuatlDenominalVncOperationFrame(operationFrame),
      participantValenceProjection: Array.isArray(operationFrame?.objectRequests)
        && operationFrame.objectRequests.length === operationFrame.objectCount,
      classBoundaryRealization: finite?.authorizationStatus === "authorized"
        && canonicalVncFrame?.resultFrame?.selectedMachineryFrame
        && finite.machineryFrame === canonicalVncFrame.resultFrame.selectedMachineryFrame,
      finiteVncResult: canonicalVncFrame?.authorizationStatus === "authorized"
        && Boolean(canonicalVncFrame?.resultFrame?.formulaRealization)
        && Boolean(canonicalVncFrame?.resultFrame?.surfaceRealization),
    };
    const satisfied = Object.values(stageStatus).every(Boolean);
    const frame = deepFreeze({
      kind: "classical-nahuatl-denominal-vnc-grammar-frame",
      version: VERSION,
      authorizationStatus: satisfied ? "authorized" : "blocked",
      blockReason: satisfied ? "" : "classical-denominal-vnc-gcd-not-satisfied",
      greatestCommonDivisor: {
        identityId: GCD_ID,
        stageOrder: CLASSICAL_NAHUATL_DENOMINAL_VNC_GCD.stageOrder,
        stageStatus,
        satisfied,
      },
      leastCommonMultiple: {
        identityId: LCM_ID,
        routeCount: OPERATION_SPECS.length,
        attestedRouteCount: CLASSICAL_NAHUATL_DENOMINAL_VNC_LCM.attestedRouteCount,
        categoryOnlyRouteCount: CLASSICAL_NAHUATL_DENOMINAL_VNC_LCM.categoryOnlyRouteCount,
        axisCount: LCM_AXES.length,
        licensedRouteSetComplete: OPERATION_SPECS.length === 41,
        licensedAxisSetComplete: LCM_AXES.length === 54,
        selectedOperationId: operationFrame?.operationId || "",
        selectedAxisIds: operationFrame?.lcmAxisIds || [],
      },
      typedGrammarAuthority: true,
      callerSuppliedAuthorityAccepted: false,
      lessonMetadataAuthority: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
    if (satisfied) issuedGrammarFrames.add(frame);
    return frame;
  }

  function isClassicalNahuatlDenominalVncGrammarFrame(frame = null) {
    return Boolean(
      frame
      && issuedGrammarFrames.has(frame)
      && frame.kind === "classical-nahuatl-denominal-vnc-grammar-frame"
      && frame.version === VERSION
      && frame.authorizationStatus === "authorized"
      && frame.greatestCommonDivisor?.identityId === GCD_ID
      && frame.greatestCommonDivisor?.satisfied === true
      && frame.leastCommonMultiple?.identityId === LCM_ID
      && frame.leastCommonMultiple?.licensedRouteSetComplete === true
      && frame.leastCommonMultiple?.licensedAxisSetComplete === true
      && frame.typedGrammarAuthority === true
      && frame.callerSuppliedAuthorityAccepted === false
      && frame.lessonMetadataAuthority === false
      && frame.formulaStringAuthority === false
      && frame.surfaceStringAuthority === false
    );
  }

  function resolveIncludedPossessorBoundary(sourceFrame) {
    const needsPossessorState = ["3sg", "3common"].includes(sourceFrame.possessorPerson)
      && sourceFrame.sourceInitialISelection === "real" && /^ī/u.test(sourceFrame.nounStem);
    const possessorStateFrame = needsPossessorState
      ? targetObject.buildClassicalNahuatlPossessiveStateFrame?.({
        possessor: sourceFrame.possessorPerson, stem: sourceFrame.nounStem,
      }) : null;
    if (needsPossessorState && possessorStateFrame?.authorizationStatus !== "authorized") return null;
    const morphs = sourceFrame.possessor.split("-");
    if (possessorStateFrame) morphs[0] = possessorStateFrame.slots[0].carrier;
    // The included possessor contacts the nominal predicate before ti is
    // attached. Keep the citation and select its owner-issued use variant.
    const nominalSourceVariant = sourceFrame.sourceInitialISelection === "supportive"
      && /^i/u.test(sourceFrame.nounStem)
      ? targetObject.buildClassicalNahuatlNounstemSourceFrame?.(sourceFrame.nounStem, {
        state: "possessive", nounClass: sourceFrame.sourceNounClass,
        classSelectionAuthority: "user-selection", supportiveInitialI: true,
        selectedInitialVariant: ["1sg", "2sg", "1pl", "2pl", "3sg", "3common", "tla"]
          .includes(sourceFrame.possessorPerson) ? "omitted" : "retained",
      }) : null;
    if (sourceFrame.sourceInitialISelection === "supportive" && /^i/u.test(sourceFrame.nounStem)
      && nominalSourceVariant?.authorizationStatus !== "authorized") return null;
    const nominalStem = nominalSourceVariant?.selectedUseStem || sourceFrame.nounStem;
    const writingSource = targetObject.issueClassicalNahuatlLesson2WritingSource?.({
      parts: [
        ...morphs.map((value, index) => ({role: `included-possessor-${index + 1}`, value})),
        ...nominalStem.split("-").filter(Boolean).map((value, index) => ({
          role: `nominal-predicate-${index + 1}`, value,
        })),
        {role: "verbalizer", value: "ti"},
      ],
      boundaryKind: "typed-ordered-morphemes",
    });
    const writtenResult = targetObject.writeClassicalNahuatlLesson2Result?.(writingSource);
    if (targetObject.isClassicalNahuatlLesson2WrittenResult?.(writtenResult) !== true
      || writtenResult.authorizationStatus !== "authorized"
      || writtenResult.source !== writingSource) return null;
    return deepFreeze({
      writingSource, writtenResult, nominalSourceVariant, possessorStateFrame,
      sourcePossessor: sourceFrame.possessor,
      realizedPossessorMorphs: writtenResult.realizedParts.slice(0, morphs.length),
      realizedTargetMorphs: writtenResult.realizedParts,
    });
  }

  function hasGeneratedPossessorInitialI(operationFrame) {
    if (!isClassicalNahuatlDenominalVncOperationFrame(operationFrame)) return false;
    const source = operationFrame.sourceFrame;
    if (operationFrame.operationId === "included-possessor-ti") {
      // The typed operation constructed this carrier (§54.3). It is not a
      // lexical initial-i choice, including on the raw noun analysis path.
      return ["3sg", "3pl", "3common"].includes(source.possessorPerson)
        && source.possessor === normalizePossessor(source.possessorPerson)
        && operationFrame.includedPossessorBoundaryFrame?.sourcePossessor === source.possessor
        && targetObject.isClassicalNahuatlLesson2WrittenResult?.(
          operationFrame.includedPossessorBoundaryFrame.writtenResult) === true
        && operationFrame.targetStem === join(
          ...operationFrame.includedPossessorBoundaryFrame.realizedTargetMorphs);
    }
    return operationFrame.operationId === "ti-a-causative-single"
      && isPanTargetPossessor(source.priorOperationFrame?.sourceFrame)
      && hasGeneratedPossessorInitialI(source.priorOperationFrame)
      && operationFrame.targetStem === join(source.priorOperationFrame.targetStem, "ā");
  }

  function evaluateClassicalNahuatlDenominalVnc(request = {}) {
    const operationFrame = deriveClassicalNahuatlDenominalVncOperationPath(request);
    if (!isClassicalNahuatlDenominalVncOperationFrame(operationFrame)) {
      return blocked(
        "classical-nahuatl-denominal-vnc-result-frame",
        operationFrame.blockReason || "denominal-operation-not-authorized",
        { operationFrame }
      );
    }
    if (typeof targetObject.evaluateClassicalNahuatlVncApplication !== "function") {
      return blocked(
        "classical-nahuatl-denominal-vnc-result-frame",
        "canonical-vnc-application-unavailable",
        { operationFrame }
      );
    }
    const exactNncBinding =
      resolveClassicalNahuatlDenominalExactNncBinding(request);
    const source = normalizeSourceRequest(request, exactNncBinding);
    const finiteRequest = buildFiniteRequest(operationFrame, source, hasGeneratedPossessorInitialI(operationFrame));
    const canonicalVncFrame = operationFrame.causativeFormationFrame
      ? targetObject.evaluateClassicalNahuatlVncApplication(finiteRequest, operationFrame)
      : targetObject.evaluateClassicalNahuatlVncApplication(finiteRequest);
    const grammarFrame = buildGrammarFrame(operationFrame, canonicalVncFrame);
    const authorized = canonicalVncFrame?.authorizationStatus === "authorized"
      && grammarFrame.authorizationStatus === "authorized";
    const frame = deepFreeze({
      kind: "classical-nahuatl-denominal-vnc-result-frame",
      version: VERSION,
      authorizationStatus: authorized ? "authorized" : "blocked",
      blockReason: authorized
        ? ""
        : canonicalVncFrame?.blockReason
          || grammarFrame.blockReason
          || "canonical-denominal-vnc-generation-blocked",
      sourceFrame: operationFrame.sourceFrame,
      canonicalNncResult:
        operationFrame.sourceFrame.canonicalNncResult || null,
      canonicalNncSourceProjection:
        operationFrame.sourceFrame.canonicalNncSourceProjection || null,
      exactResultIdentityPreserved:
        operationFrame.sourceFrame.exactResultIdentityPreserved === true,
      operationFrame,
      grammarFrame,
      canonicalVncFrame: authorized ? canonicalVncFrame : null,
      finalTypedVncSlotFrame: authorized
        ? canonicalVncFrame.resultFrame.finalTypedVncSlotFrame
        : null,
      finiteSurfaceFrame: authorized
        ? canonicalVncFrame.resultFrame.finiteSurfaceFrame
        : null,
      formulaRealization: authorized
        ? canonicalVncFrame.resultFrame.formulaRealization
        : "",
      surfaceRealization: authorized
        ? canonicalVncFrame.resultFrame.surfaceRealization
        : "",
      typedGrammarAuthority: true,
      callerSuppliedAuthorityAccepted: false,
      lessonMetadataAuthority: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
    if (authorized) {issuedResultFrames.add(frame);reloadInputs.set(frame,snapshotGrammarInputs(request,new Set([request.canonicalNncResult,request.canonicalNncSourceFrame,request.canonicalBoundNominalSourceFrame,request.canonicalNominalRankCorrectionFrame,request.verbalStemPreparationFrame,request.sourceOperationFrame].filter(Boolean))));}
    return frame;
  }

  function isClassicalNahuatlDenominalVncResultFrame(frame = null) {
    const exactProjection = frame?.canonicalNncResult
      && typeof targetObject.getClassicalNahuatlNncContinuationSourceConstituents
        === "function"
      ? getDenominalNncSourceProjection(frame.canonicalNncResult)
      : null;
    const exactCarrierValid = frame?.canonicalNncResult
      ? frame.exactResultIdentityPreserved === true
        && frame.sourceFrame?.canonicalNncResult === frame.canonicalNncResult
        && frame.sourceFrame?.canonicalNncSourceProjection
          === frame.canonicalNncSourceProjection
        && exactProjection === frame.canonicalNncSourceProjection
      : frame?.canonicalNncSourceProjection === null
        && frame?.exactResultIdentityPreserved === false;
    return Boolean(
      frame
      && issuedResultFrames.has(frame)
      && frame.kind === "classical-nahuatl-denominal-vnc-result-frame"
      && frame.version === VERSION
      && frame.authorizationStatus === "authorized"
      && isClassicalNahuatlDenominalVncOperationFrame(frame.operationFrame)
      && frame.grammarFrame?.authorizationStatus === "authorized"
      && frame.grammarFrame?.greatestCommonDivisor?.satisfied === true
      && frame.grammarFrame?.leastCommonMultiple?.licensedRouteSetComplete === true
      && frame.grammarFrame?.leastCommonMultiple?.licensedAxisSetComplete === true
      && frame.canonicalVncFrame?.authorizationStatus === "authorized"
      && frame.formulaRealization === frame.canonicalVncFrame.resultFrame.formulaRealization
      && frame.surfaceRealization === frame.canonicalVncFrame.resultFrame.surfaceRealization
      && exactCarrierValid
    );
  }

  function prepareClassicalNahuatlDenominalVncParadigmPlan(request = {}) {
    const operationFrame =
      deriveClassicalNahuatlDenominalVncOperationPath(request);
    if (!isClassicalNahuatlDenominalVncOperationFrame(operationFrame)) {
      return blocked(
        "classical-nahuatl-denominal-vnc-paradigm-plan",
        operationFrame.blockReason || "denominal-operation-not-authorized",
        { operationFrame }
      );
    }
    if (operationFrame.causativeFormationFrame) {
      return blocked(
        "classical-nahuatl-denominal-vnc-paradigm-plan",
        "denominal-causative-formation-paradigm-not-supported",
        { operationFrame }
      );
    }
    if (typeof targetObject.prepareClassicalNahuatlVncParadigmPlan !== "function") {
      return blocked(
        "classical-nahuatl-denominal-vnc-paradigm-plan",
        "canonical-vnc-paradigm-planner-unavailable",
        { operationFrame }
      );
    }
    const exactNncBinding =
      resolveClassicalNahuatlDenominalExactNncBinding(request);
    const source = deepFreeze({
      ...normalizeSourceRequest(request, exactNncBinding),
      outputScope: "paradigm",
    });
    const canonicalPlan = targetObject.prepareClassicalNahuatlVncParadigmPlan(
      buildFiniteRequest(operationFrame, source, hasGeneratedPossessorInitialI(operationFrame))
    );
    const authorized = canonicalPlan?.authorizationStatus === "authorized";
    const plan = deepFreeze({
      kind: "classical-nahuatl-denominal-vnc-paradigm-plan",
      version: VERSION,
      authorizationStatus: authorized ? "authorized" : "blocked",
      blockReason: authorized ? "" : canonicalPlan?.blockReason || "canonical-vnc-paradigm-plan-blocked",
      operationFrame,
      canonicalPlan: authorized ? canonicalPlan : null,
      baseRequest: deepFreeze({
        ...source,
        sourceOperationFrame: operationFrame.sourceFrame.priorOperationFrame,
      }),
      coordinateFields: ["subject", "mood", "tense"],
      typedGrammarAuthority: true,
      callerSuppliedAuthorityAccepted: false,
      lessonMetadataAuthority: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
    if (authorized) issuedPlans.add(plan);
    return plan;
  }

  function isClassicalNahuatlDenominalVncParadigmPlan(frame = null) {
    return Boolean(
      frame
      && issuedPlans.has(frame)
      && frame.kind === "classical-nahuatl-denominal-vnc-paradigm-plan"
      && frame.version === VERSION
      && frame.authorizationStatus === "authorized"
      && isClassicalNahuatlDenominalVncOperationFrame(frame.operationFrame)
      && frame.canonicalPlan?.authorizationStatus === "authorized"
    );
  }

  function projectClassicalNahuatlDenominalVncParadigmCoordinates(plan = null, coordinates = []) {
    if (!isClassicalNahuatlDenominalVncParadigmPlan(plan)
      || typeof targetObject.projectClassicalNahuatlVncParadigmCoordinates !== "function") {
      return deepFreeze([blocked(
        "classical-nahuatl-denominal-vnc-coordinate-frame",
        "denominal-paradigm-plan-not-issued-by-service"
      )]);
    }
    if (!Array.isArray(coordinates)) return Object.freeze([]);
    const hostileCoordinatePath =
      findHostileAuthorityPath(coordinates, "coordinates");
    if (hostileCoordinatePath) {
      return deepFreeze([blocked(
        "classical-nahuatl-denominal-vnc-coordinate-frame",
        "denominal-coordinate-authority-fields-rejected",
        { rejectedAuthorityPath: hostileCoordinatePath }
      )]);
    }
    const canonicalCoordinates = targetObject.projectClassicalNahuatlVncParadigmCoordinates(
      plan.canonicalPlan,
      coordinates
    );
    return deepFreeze(canonicalCoordinates.map((canonicalCoordinate, index) => {
      const authorized = canonicalCoordinate?.authorizationStatus === "authorized";
      const frame = deepFreeze({
        kind: "classical-nahuatl-denominal-vnc-coordinate-frame",
        version: VERSION,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason: authorized ? "" : canonicalCoordinate?.blockReason || "canonical-vnc-coordinate-blocked",
        coordinateIndex: index,
        operationFrame: plan.operationFrame,
        canonicalCoordinate,
        finalTypedVncSlotFrame: authorized ? canonicalCoordinate.typedSlotFrame : null,
        finiteSurfaceFrame: authorized ? canonicalCoordinate.finiteSurfaceFrame : null,
        formulaRealization: authorized ? canonicalCoordinate.formulaRealization : "",
        surfaceRealization: authorized ? canonicalCoordinate.surfaceRealization : "",
        typedGrammarAuthority: true,
        callerSuppliedAuthorityAccepted: false,
        lessonMetadataAuthority: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
      });
      if (authorized) issuedCoordinateFrames.add(frame);
      return frame;
    }));
  }

  function isClassicalNahuatlDenominalVncCoordinateFrame(frame = null) {
    return Boolean(
      frame
      && issuedCoordinateFrames.has(frame)
      && frame.kind === "classical-nahuatl-denominal-vnc-coordinate-frame"
      && frame.version === VERSION
      && frame.authorizationStatus === "authorized"
      && isClassicalNahuatlDenominalVncOperationFrame(frame.operationFrame)
      && frame.canonicalCoordinate?.authorizationStatus === "authorized"
      && frame.formulaRealization === frame.canonicalCoordinate.formulaRealization
      && frame.surfaceRealization === frame.canonicalCoordinate.surfaceRealization
    );
  }

  function buildClassicalNahuatlDenominalVncUiProjection(frame = null) {
    if (!isClassicalNahuatlDenominalVncResultFrame(frame)) {
      return blocked(
        "classical-nahuatl-denominal-vnc-ui-projection",
        "authorized-denominal-result-required"
      );
    }
    const option = OPERATION_BY_ID.get(frame.operationFrame.operationId);
    const projection = deepFreeze({
      kind: "classical-nahuatl-denominal-vnc-ui-projection",
      version: VERSION,
      authorizationStatus: "authorized",
      blockReason: "",
      sourceStem: frame.sourceFrame.sourceStem,
      sourceState: frame.sourceFrame.sourceState,
      operation: option.label,
      targetStem: frame.operationFrame.targetStem,
      targetClass: frame.operationFrame.targetClass,
      objectCount: frame.operationFrame.objectCount,
      formulaRealization: frame.formulaRealization,
      surfaceRealization: frame.surfaceRealization,
      visibleDecisions: deepFreeze({
        operationSelection: true,
        classSelection: classesForSpec(option, frame.sourceFrame).length > 1,
        participantSelection: frame.operationFrame.objectCount > 0,
        subjectMoodTense: true,
      }),
      derivedFacts: deepFreeze({
        sourceRank: option.sourceKind,
        classPolicy: option.classPolicy,
        participantProjection: frame.operationFrame.participantProjection,
      }),
      grammarAuthority: false,
      displayTextAuthority: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
    issuedUiFrames.add(projection);
    return projection;
  }

  function isClassicalNahuatlDenominalVncUiProjection(frame = null) {
    return Boolean(
      frame
      && issuedUiFrames.has(frame)
      && frame.kind === "classical-nahuatl-denominal-vnc-ui-projection"
      && frame.version === VERSION
      && frame.authorizationStatus === "authorized"
      && frame.grammarAuthority === false
      && frame.displayTextAuthority === false
      && frame.formulaStringAuthority === false
      && frame.surfaceStringAuthority === false
    );
  }

  return {
    CLASSICAL_NAHUATL_DENOMINAL_VNC_GCD,
    CLASSICAL_NAHUATL_DENOMINAL_VNC_LCM,
    resolveClassicalNahuatlNominalRankCorrectedSourceFrame,
    isClassicalNahuatlNominalRankCorrectedSourceFrame,
    getClassicalNahuatlNominalRankCorrectedDenominalRequest,
    issueClassicalNahuatlNominalSourceDenominalBindingFrame,
    isClassicalNahuatlNominalSourceDenominalBindingFrame,
    getClassicalNahuatlDenominalVerbalStemShapeInventory,
    issueClassicalNahuatlDenominalVerbalStemPreparation,
    isClassicalNahuatlDenominalVerbalStemPreparation,
    buildClassicalNahuatlInstrumentalAzSourceAuthorization,
    isClassicalNahuatlInstrumentalAzSourceAuthorization,
    buildClassicalNahuatlBoundNominalSourceFrame,
    isClassicalNahuatlBoundNominalSourceFrame,
    issueClassicalNahuatlBoundNominalDenominalBindingFrame,
    isClassicalNahuatlBoundNominalDenominalBindingFrame,
    buildClassicalNahuatlDenominalVncSourceFrame,
    getClassicalNahuatlIncludedPossessorSourceFacts,
    isClassicalNahuatlDenominalVncSourceFrame,
    getClassicalNahuatlDenominalVncOperationInventory,
    isClassicalNahuatlDenominalVncOperationInventory,
    getClassicalNahuatlDenominalVncOperationPathInventory,
    isClassicalNahuatlDenominalVncOperationPathInventory,
    deriveClassicalNahuatlDenominalVncOperation,
    deriveClassicalNahuatlDenominalVncOperationPath,
    isClassicalNahuatlDenominalVncOperationFrame,
    isClassicalNahuatlDenominalVncGrammarFrame,
    getClassicalNahuatlDenominalReloadInputs: frame => reloadInputs.get(frame) || null,
    evaluateClassicalNahuatlDenominalVnc,
    isClassicalNahuatlDenominalVncResultFrame,
    prepareClassicalNahuatlDenominalVncParadigmPlan,
    isClassicalNahuatlDenominalVncParadigmPlan,
    projectClassicalNahuatlDenominalVncParadigmCoordinates,
    isClassicalNahuatlDenominalVncCoordinateFrame,
    buildClassicalNahuatlDenominalVncUiProjection,
    isClassicalNahuatlDenominalVncUiProjection,
  };
}

export function installClassicalNahuatlDenominalVncGrammarGlobals(
  targetObject = globalThis,
  installationContext = {}
) {
  const target = Object.create(targetObject);
  Object.defineProperties(target, Object.getOwnPropertyDescriptors(
    installationContext.moduleDependencyCapabilities || {}
  ));
  Object.assign(
    targetObject,
    createClassicalNahuatlDenominalVncGrammarApi(target)
  );
  return targetObject;
}
