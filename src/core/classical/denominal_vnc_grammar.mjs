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

const VOWELS = "aāeēiīoō";
const TIME_MATRICES = Object.freeze(["ilhui", "yohua-l", "mētz", "xihui"]);
const INCLUDED_POSSESSOR_FAMILIES = Object.freeze([
  "proxy",
  "recompense",
  "misfortune",
  "temporal-pan",
]);
const INCLUDED_POSSESSOR_STEMS = Object.freeze([
  "ix-xip-tla",
  "hui-hhui",
  "pa-ti-l-lō",
  "icn-ō-pil",
  "il-hui-l",
  "mah-cē-hua-l",
  "tlahu-ēl-i-l",
  "pan",
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
const APPLICATIVE_HUIA_USE_STEMS = Object.freeze([
  "izta",
  "xīcal",
  "tla-chpān-hu-āz",
  "mah-pil",
  "icxi",
  "oc",
  "iztā-c-teō-cuitla",
  "mētz",
  "ā-tōy-a",
  "tla-xapo-ch",
  "cē-tō-ch",
  "ih-ī-yō",
  "yōl-lō",
  "tēuc",
  "oquich",
  "tlahpal-i-uh-0-cā",
  "tōl-tē-0-ca",
  ...INSTRUMENTAL_AZ_NOUNSTEMS,
]);
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
  operationSpec({ id: "deverbal-yo-hua", family: "deverbal-yo-hua", label: "deverbal yō nounstem plus huā", sourceKind: "deverbal-yo-nounstem", classPolicy: "fixed-a", semanticReadings: ["become-filled", "become-covered"] }),
  operationSpec({ id: "included-possessor-ti", family: "included-possessor-ti", label: "included possessor plus ti", sourceKind: "possessive-nnc-predicate", sourceState: "possessive", classPolicy: "fixed-a", lexical: true }),
  operationSpec({ id: "possession-ti", family: "possession-ti", label: "ti of possession", sourceKind: "nounstem", classPolicy: "ti-by-source-final", semanticReadings: ["have", "possess"] }),
  operationSpec({ id: "ti-hui-lia-causative", family: "ti-hui-lia-causative", label: "single-object liā causative", sourceKind: "generated-vnc", sourceState: "derived", classPolicy: "fixed-c", objectCount: 1, continuationOf: ["inceptive-ti", "inceptive-hui", "possession-ti"] }),
  operationSpec({ id: "ya-lia-causative", family: "ya-lia-causative", label: "delete ya and add liā causative", sourceKind: "generated-vnc", sourceState: "derived", classPolicy: "fixed-c", objectCount: 1, continuationOf: ["inceptive-root-ya", "inceptive-ti-ya", "inceptive-hui-ya"] }),
  operationSpec({ id: "ya-lia-applicative", family: "ya-lia-applicative", label: "delete ya and add liā applicative", sourceKind: "generated-vnc", sourceState: "derived", classPolicy: "fixed-c", objectCount: 1, continuationOf: ["inceptive-root-ya", "inceptive-ti-ya", "inceptive-hui-ya"], limited: true }),
  operationSpec({ id: "destockal-a-causative", family: "destockal-a-causative", label: "source ni/hui plus causative ā", sourceKind: "destockal-ni-hui-vnc", sourceState: "derived", classPolicy: "fixed-c", objectCount: 1 }),
  operationSpec({ id: "ti-a-causative-single", family: "ti-a-causative-single", label: "first-type single-object ti-ā", sourceKind: "generated-vnc", sourceState: "derived", classPolicy: "fixed-c", objectCount: 1, continuationOf: ["inceptive-ti", "possession-ti", "included-possessor-ti"] }),
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
  ["deverbal-yo-hua", "deverbal yō nounstem plus huā"],
  ["included-possessor-ti", "possessive predicate plus included possessor plus ti"],
  ["possession-ti", "homophonous possession ti distinct from inceptive ti"],
  ["ti-class-by-source-final", "consonant source A; vowel source A or B"],
  ["hui-class-by-source-final", "consonant source A; vowel source B"],
  ["ya-class", "ya source A, B, or both; B perfective y to x or z"],
  ["hua-class", "huā source Class A despite spelling confusion with o-ā"],
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

function normalizeSourceRequest(request = {}) {
  const possessorPerson = normalizePerson(request.possessor);
  return deepFreeze({
    nounStem: normalizeStem(request.nounStem || request.sourceNounStem || request.sourceStem),
    nounRoot: normalizeStem(request.nounRoot),
    sourceVerbStem: normalizeStem(request.sourceVerbStem),
    sourceKind: key(request.sourceKind || "nounstem"),
    sourceState: key(request.sourceState || "absolutive"),
    possessor: normalizePossessor(request.possessor),
    possessorPerson,
    includedPossessorFamily: key(request.includedPossessorFamily),
    sourceInitialISelection: key(
      request.sourceInitialISelection || request.sourceInitialIKind,
    ),
    numeralStem: normalizeStem(request.numeralStem),
    timeMatrix: normalizeStem(request.timeMatrix),
    sourceOperationFrame: request.sourceOperationFrame || null,
    classChoice: text(request.classChoice).toUpperCase(),
    subject: normalizePerson(request.subject) || "3sg",
    sourceSubject: normalizePerson(request.sourceSubject) || "3sg",
    mood: key(request.mood || "indicative"),
    tense: key(request.tense || "present"),
    objectPeople: Array.isArray(request.objectPeople)
      ? request.objectPeople.map(key)
      : [key(request.objectPerson || "3sg"), key(request.secondObjectPerson || "3sg")],
    outputScope: key(request.outputScope || "single"),
    exclamatory: request.exclamatory === true
      || request.sentenceOptions?.exclamatory === true
      || request.sentenceOptions?.punctuation === "!",
    sentenceOptions: request.sentenceOptions && typeof request.sentenceOptions === "object"
      ? request.sentenceOptions
      : {},
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

function sourceFrameForRequest(source, issuedOperationFrames) {
  const prior = source.sourceOperationFrame;
  if (prior && !issuedOperationFrames.has(prior)) {
    return blocked(
      "classical-nahuatl-denominal-vnc-source-frame",
      "denominal-source-operation-frame-not-issued-by-service"
    );
  }
  const sourceStem = prior?.targetStem || source.sourceVerbStem || source.nounStem || source.nounRoot;
  if (!sourceStem) {
    return blocked(
      "classical-nahuatl-denominal-vnc-source-frame",
      "denominal-source-stem-required"
    );
  }
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
    includedPossessorFamily: source.includedPossessorFamily,
    sourceSubject: source.sourceSubject,
    mood: source.mood,
    tense: source.tense,
    exclamatory: source.exclamatory,
    numeralStem: source.numeralStem,
    timeMatrix: source.timeMatrix,
    priorOperationFrame: prior,
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

function isOperationApplicable(spec, sourceFrame) {
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
    case "ti-a-causative-single":
    case "causative-tla-ti-lia-applicative":
    case "intransitive-tla-ti-a-causative":
    case "intransitive-tla-ti-lia-applicative":
      return Boolean(priorId);
    case "ya-lia-applicative":
      return priorId === "inceptive-root-ya" && priorSourceStem === "ce";
    case "ti-ia-applicative":
      return TI_IA_APPLICATIVE_SOURCE_STEMS.includes(sourceStem);
    case "o-a-to-i-l-huia":
      return HYPOTHETICAL_I_L_HUIA_STEMS.includes(priorSourceStem);
    case "o-a-to-a-l-huia":
      return false;
    case "i-hui-to-o-a":
      return I_HUI_CAUSATIVE_SOURCE_STEMS.includes(priorSourceStem);
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
      return sourceFrame.sourceKind === "possessive-nnc-predicate"
        && sourceFrame.sourceState === "possessive"
        && Boolean(sourceFrame.possessor)
        && INCLUDED_POSSESSOR_FAMILIES.includes(sourceFrame.includedPossessorFamily)
        && INCLUDED_POSSESSOR_STEMS.includes(nounStem)
        && (
          sourceFrame.includedPossessorFamily !== "recompense"
          || ["present", "preterit", "future"].includes(sourceFrame.tense)
        )
        && (
          sourceFrame.includedPossessorFamily !== "misfortune"
          || (sourceFrame.tense === "preterit" && sourceFrame.exclamatory)
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
      return APPLICATIVE_HUIA_USE_STEMS.includes(nounStem);
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

function buildTargetStem(spec, sourceFrame) {
  const nounStem = sourceFrame.nounStem;
  const priorStem = sourceFrame.priorOperationFrame?.targetStem || sourceFrame.sourceStem;
  switch (spec.id) {
    case "inceptive-ti":
    case "possession-ti":
      return join(nounStem, "ti");
    case "inceptive-hui":
      return compactStem(nounStem).endsWith("w") || /(?:uh|hui)$/u.test(nounStem)
        ? join(nounStem.replace(/(?:uh|hui)$/u, ""), "hui")
        : join(nounStem, "hui");
    case "inceptive-root-ya":
      return join(sourceFrame.nounRoot || nounStem, "ya");
    case "inceptive-ti-ya":
    case "inceptive-hui-ya":
    case "destockal-ya":
      return join(priorStem, "ya");
    case "inceptive-a":
      return join(nounStem, "ā");
    case "deverbal-yo-hua":
      return join(nounStem, "huā");
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

function buildObjectRequests(spec, source) {
  const people = source.objectPeople;
  if (!spec.objectCount) return [];
  if (spec.objectCount === 1) {
    const reflexive = people[0] === "reflexive";
    return [{
      objectId: "denominal-object-1",
      objectKind: reflexive ? "reflexive" : "specific-projective",
      objectPerson: reflexive ? source.subject : (people[0] || "3sg"),
      governor: spec.family.includes("applicative") || spec.family.includes("huia")
        ? "applicative"
        : "causative",
      derivationalLevel: 1,
    }];
  }
  const directPossessiveProjection =
    SOURCE_PROJECTED_DOUBLE_OBJECT_OPERATION_IDS.includes(spec.id);
  const priorObjectRequests = source.sourceOperationFrame?.objectRequests || [];
  const firstObjectPerson = directPossessiveProjection
    ? source.sourceSubject
    : priorObjectRequests[0]?.objectPerson || people[0] || "3sg";
  const secondObjectPerson = directPossessiveProjection
    ? source.possessorPerson
    : people[1] || "3sg";
  return [{
    objectId: "denominal-object-1",
    objectKind: "specific-projective",
    objectPerson: firstObjectPerson,
    governor: "directive",
    derivationalLevel: 1,
  }, {
    objectId: "denominal-object-2",
    objectKind: "specific-projective",
    objectPerson: secondObjectPerson,
    governor: spec.family.includes("applicative") || spec.family.includes("huia")
      ? "applicative"
      : "causative",
    derivationalLevel: 2,
  }];
}

function buildFiniteRequest(operationFrame, source) {
  const sourceObjectRequests = operationFrame.objectRequests;
  const singleReflexiveObject = sourceObjectRequests.length === 1
    && sourceObjectRequests[0].objectKind === "reflexive";
  return {
    sourceStem: operationFrame.targetStem,
    verbClass: operationFrame.targetClass,
    sourceValence: singleReflexiveObject
      ? "mainline-reflexive"
      : sourceObjectRequests.length
        ? "specific-projective"
        : "intransitive",
    objectKind: singleReflexiveObject ? "reflexive" : "",
    objectPerson: singleReflexiveObject
      ? sourceObjectRequests[0].objectPerson
      : "",
    sourceObjectRequests,
    sourceInitialISelection: source.sourceInitialISelection,
    subject: source.subject,
    mood: source.mood,
    tense: source.tense,
    requestedDerivation: "direct",
    requestedVoice: "active",
    outputScope: source.outputScope,
    sentenceOptions: source.sentenceOptions,
  };
}

export function createClassicalNahuatlDenominalVncGrammarApi(targetObject = globalThis) {
  const issuedSourceFrames = new WeakSet();
  const issuedInventories = new WeakSet();
  const issuedPathInventories = new WeakSet();
  const issuedOperationFrames = new WeakSet();
  const issuedGrammarFrames = new WeakSet();
  const issuedResultFrames = new WeakSet();
  const issuedPlans = new WeakSet();
  const issuedCoordinateFrames = new WeakSet();
  const issuedUiFrames = new WeakSet();
  const issuedInstrumentalAzSourceFrames = new WeakSet();

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
      new Set(["sourceOperationFrame"])
    );
    if (hostilePath) {
      return blocked(
        "classical-nahuatl-denominal-vnc-source-frame",
        "denominal-caller-authority-fields-rejected",
        { rejectedAuthorityPath: hostilePath }
      );
    }
    const source = normalizeSourceRequest(request);
    const frame = sourceFrameForRequest(source, issuedOperationFrames);
    if (frame.authorizationStatus === "authorized") issuedSourceFrames.add(frame);
    return frame;
  }

  function isClassicalNahuatlDenominalVncSourceFrame(frame = null) {
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
        inventory.blockReason || "denominal-operation-inventory-not-authorized",
        { sourceFrame: inventory.sourceFrame || null }
      );
    }
    const source = normalizeSourceRequest(request);
    const operationId = key(request.operationId || request.selectedOperationId || inventory.automaticOperationId);
    const selected = inventory.options.find(option => option.operationId === operationId) || null;
    const spec = OPERATION_BY_ID.get(operationId) || null;
    if (!selected || !spec) {
      return blocked(
        "classical-nahuatl-denominal-vnc-operation-frame",
        operationId
          ? "selected-denominal-operation-not-licensed-for-source"
          : "denominal-operation-selection-required",
        { sourceFrame: inventory.sourceFrame, inventory }
      );
    }
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
    const targetStem = buildTargetStem(spec, inventory.sourceFrame);
    if (!targetStem) {
      return blocked(
        "classical-nahuatl-denominal-vnc-operation-frame",
        "denominal-target-stem-could-not-be-derived",
        { sourceFrame: inventory.sourceFrame, selectedOperationId: operationId }
      );
    }
    const objectRequests = deepFreeze(buildObjectRequests(spec, source));
    const frame = deepFreeze({
      kind: "classical-nahuatl-denominal-vnc-operation-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      blockReason: "",
      operationId,
      family: spec.family,
      sourceFrame: inventory.sourceFrame,
      sourceStem: inventory.sourceFrame.sourceStem,
      targetStem,
      targetClass,
      objectCount: objectRequests.length,
      objectRequests,
      participantProjection: objectRequests.length === 2
        ? deepFreeze({
          kind: "possessive-nnc-double-object-projection",
          sourceSubject: source.sourceSubject,
          sourceSubjectTargetRole: "causative-object",
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
    const hostilePath = findHostileAuthorityPath(request);
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

    const sourceStem = normalizeStem(
      request.nounStem
      || request.nounRoot
      || request.sourceVerbStem
      || request.sourceStem
    );
    if (!sourceStem) {
      return blocked(
        "classical-nahuatl-denominal-vnc-operation-path-inventory",
        "denominal-source-stem-required"
      );
    }
    const explicitSourceKind = key(request.sourceKind);
    const explicitSourceState = key(request.sourceState);
    const pathChoices = [];
    const pathChoiceIds = new Set();

    function buildRootRequest(spec) {
      if (spec.continuationOf.length || spec.attestation === "category-only") {
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
      const possessiveSourceDiscovery =
        spec.sourceKind === "possessive-nnc-predicate"
          ? {
            // These values let the owner enumerate structurally available
            // possessive-source paths before the user makes their dependent
            // Source selections. They never leave the inventory as a Source
            // request and therefore cannot authorize a Result.
            sourceSubject: "3sg",
            possessor: "3sg",
            ...(spec.id === "included-possessor-ti"
              ? { includedPossessorFamily: "proxy" }
              : {}),
          }
          : {};
      return {
        ...request,
        ...possessiveSourceDiscovery,
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
        const operationFrame = deriveClassicalNahuatlDenominalVncOperation({
          ...stepRequest,
          operationId: spec.id,
          classChoice,
        });
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
        return classSelectionOperationIds.includes(frame.operationId)
          ? `${spec.label} · Class ${selectedClass}`
          : spec.label;
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
        includedPossessorFamily: includedPossessor,
        resultSubject: true,
        resultObjectPeople: sourceProjectedDoubleObject
          ? 0
          : operationSpecRecord.objectCount,
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
        sourceRequest: {
          nounStem: rootRequest.nounStem,
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
      operationOptions,
      pathChoices,
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
        && choice.sourceRequest?.sourceKind === choice.sourceKind
        && choice.sourceRequest?.sourceState === choice.sourceState
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
      && Object.isFrozen(frame)
    );
  }

  function deriveClassicalNahuatlDenominalVncOperationPath(request = {}) {
    const hostilePath = findHostileAuthorityPath(
      request,
      "request",
      new WeakSet(),
      new Set(["sourceOperationFrame"])
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
    let operationFrame = null;
    for (let index = 0; index < operationPath.length; index += 1) {
      const operationId = operationPath[index];
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
          operationId,
          selectedOperationId: "",
          operationPath: undefined,
          sourceKind: request.sourceKind || spec.sourceKind,
          classChoice,
        }
        : {
          ...request,
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
    const source = normalizeSourceRequest(request);
    const finiteRequest = buildFiniteRequest(operationFrame, source);
    const canonicalVncFrame = targetObject.evaluateClassicalNahuatlVncApplication(finiteRequest);
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
    if (authorized) issuedResultFrames.add(frame);
    return frame;
  }

  function isClassicalNahuatlDenominalVncResultFrame(frame = null) {
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
    if (typeof targetObject.prepareClassicalNahuatlVncParadigmPlan !== "function") {
      return blocked(
        "classical-nahuatl-denominal-vnc-paradigm-plan",
        "canonical-vnc-paradigm-planner-unavailable",
        { operationFrame }
      );
    }
    const source = deepFreeze({
      ...normalizeSourceRequest(request),
      outputScope: "paradigm",
    });
    const canonicalPlan = targetObject.prepareClassicalNahuatlVncParadigmPlan(
      buildFiniteRequest(operationFrame, source)
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
    buildClassicalNahuatlInstrumentalAzSourceAuthorization,
    isClassicalNahuatlInstrumentalAzSourceAuthorization,
    buildClassicalNahuatlDenominalVncSourceFrame,
    isClassicalNahuatlDenominalVncSourceFrame,
    getClassicalNahuatlDenominalVncOperationInventory,
    isClassicalNahuatlDenominalVncOperationInventory,
    getClassicalNahuatlDenominalVncOperationPathInventory,
    isClassicalNahuatlDenominalVncOperationPathInventory,
    deriveClassicalNahuatlDenominalVncOperation,
    deriveClassicalNahuatlDenominalVncOperationPath,
    isClassicalNahuatlDenominalVncOperationFrame,
    isClassicalNahuatlDenominalVncGrammarFrame,
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
  targetObject = globalThis
) {
  Object.assign(
    targetObject,
    createClassicalNahuatlDenominalVncGrammarApi(targetObject)
  );
  return targetObject;
}
