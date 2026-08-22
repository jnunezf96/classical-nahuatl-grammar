// Canvas-grounded presentation contract for the semantic VNC operations that
// follow the ordinary source/derivation/voice path.  These records describe
// user-selectable request values only.  They never carry a formula, surface,
// stored answer, or lesson-local execution rule.

const freeze = value => {
  if (Array.isArray(value)) return Object.freeze(value.map(freeze));
  if (!value || typeof value !== "object" || Object.isFrozen(value)) return value;
  Object.values(value).forEach(freeze);
  return Object.freeze(value);
};

const option = ({
  controlId,
  value,
  label,
  tagSuffix,
  lineStart,
  lineEnd,
  applicability,
  outputBehavior,
  canvasStatus = "conditioned-optional",
  selected = false,
  disabled = false,
  optionGroup = "",
}) => freeze({
  controlId,
  value,
  label,
  tagId: `cn-option-vnc-${tagSuffix}`,
  canvasStatus,
  applicability,
  outputBehavior,
  transcriptionLineStart: lineStart,
  transcriptionLineEnd: lineEnd,
  exactWitness: `ANDREWS_TRANSCRIPTION_CANVAS.md:${lineStart}-${lineEnd}`,
  selected,
  disabled,
  optionGroup,
  allowEmptyValue: value === "",
  formulaStringAuthority: false,
  surfaceStringAuthority: false,
});

const switchState = ({
  controlId,
  value,
  tagSuffix,
  lineStart,
  lineEnd,
  applicability,
  outputBehavior,
  canvasStatus = "authorized",
}) => option({
  controlId,
  value,
  label: value,
  tagSuffix,
  lineStart,
  lineEnd,
  applicability,
  outputBehavior,
  canvasStatus,
});

const lateOperation = (
  value,
  label,
  lineStart,
  lineEnd,
  canvasStatus = "conditioned-optional"
) => option({
  controlId: "classical-rule-logic-late-operation",
  value,
  label,
  tagSuffix: `late-operation-${value}`,
  lineStart,
  lineEnd,
  canvasStatus,
  selected: value === "none",
  applicability: value === "none"
    ? "no later semantic VNC operation selected"
    : `typed ${value} VNC operation`,
  outputBehavior: value === "none"
    ? "keeps the canonical source, derivation, and voice result unchanged"
    : `requests the canonical ${value} operation without supplying a formula or surface`,
});

const lateVariant = ({
  value,
  label,
  lineStart,
  lineEnd,
  family,
  canvasStatus = "conditioned-optional",
  selected = false,
}) => option({
  controlId: "classical-rule-logic-late-variant",
  value,
  label,
  tagSuffix: `late-variant-${value || "required"}`,
  lineStart,
  lineEnd,
  canvasStatus,
  selected,
  optionGroup: family,
  applicability: value
    ? `typed ${family.toLowerCase()} operation whose canonical inventory licenses ${value}`
    : "a selected later operation whose licensed formation is not yet selected",
  outputBehavior: value
    ? "selects one semantic operation variant; the evaluator derives the typed result"
    : "leaves the request visibly incomplete and cannot authorize generation",
});

export const CLASSICAL_NAHUATL_VNC_LATE_OPERATION_UI_CONTROL_CONTRACTS =
  freeze({
    "classical-rule-logic-late-operation": [
      lateOperation(
        "none",
        "no added VNC derivation layer",
        9005,
        12221,
        "not-applicable"
      ),
      lateOperation("frequentative", "frequentative", 9005, 9015),
      lateOperation("compound", "verbal compound", 9297, 9318),
      lateOperation("purposive", "purposive", 9967, 10012),
      lateOperation("honorific", "honorific", 11883, 11894),
      lateOperation("reverential", "reverential", 12115, 12134),
      lateOperation("pejorative", "pejorative", 12135, 12175),
    ],
    "classical-rule-logic-late-variant": [
      lateVariant({
        value: "",
        label: "choose when required",
        lineStart: 9005,
        lineEnd: 12221,
        family: "",
        canvasStatus: "required",
        selected: true,
      }),
      lateVariant({
        value: "ordinary-short-glottal",
        label: "short vowel + h",
        lineStart: 9020,
        lineEnd: 9044,
        family: "Frequentative formations",
      }),
      lateVariant({
        value: "ordinary-long",
        label: "long vowel",
        lineStart: 9063,
        lineEnd: 9073,
        family: "Frequentative formations",
      }),
      lateVariant({
        value: "ordinary-short",
        label: "short vowel",
        lineStart: 9074,
        lineEnd: 9086,
        family: "Frequentative formations",
      }),
      lateVariant({
        value: "tla-short-glottal",
        label: "tlah-tla",
        lineStart: 9105,
        lineEnd: 9120,
        family: "Frequentative formations",
      }),
      lateVariant({
        value: "tla-long",
        label: "tlā-tla",
        lineStart: 9105,
        lineEnd: 9120,
        family: "Frequentative formations",
      }),
      lateVariant({
        value: "tla-short-glottal-and-stem-short-glottal",
        label: "tlah-tla plus stem reduplication",
        lineStart: 9105,
        lineEnd: 9120,
        family: "Frequentative formations",
      }),
      lateVariant({
        value: "tla-long-and-stem-long",
        label: "tlā-tla plus stem reduplication",
        lineStart: 9105,
        lineEnd: 9120,
        family: "Frequentative formations",
      }),
      lateVariant({
        value: "reflexive-partial",
        label: "partial reflexive",
        lineStart: 9121,
        lineEnd: 9138,
        family: "Frequentative formations",
      }),
      lateVariant({
        value: "destockal-intransitive",
        label: "destockal intransitive",
        lineStart: 9143,
        lineEnd: 9178,
        family: "Frequentative formations",
      }),
      lateVariant({
        value: "destockal-causative",
        label: "destockal causative",
        lineStart: 9179,
        lineEnd: 9193,
        family: "Frequentative formations",
      }),
      lateVariant({
        value: "destockal-applicative-force",
        label: "tz-a: applicative interpretation",
        lineStart: 9213,
        lineEnd: 9218,
        family: "Frequentative formations",
      }),
      lateVariant({
        value: "destockal-causative-force",
        label: "tz-a: causative interpretation",
        lineStart: 9213,
        lineEnd: 9218,
        family: "Frequentative formations",
      }),
      lateVariant({
        value: "destockal-applicative",
        label: "destockal applicative",
        lineStart: 9219,
        lineEnd: 9233,
        family: "Frequentative formations",
      }),
      lateVariant({
        value: "destockal-type-two",
        label: "destockal type-two causative",
        lineStart: 9234,
        lineEnd: 9237,
        family: "Frequentative formations",
      }),
      lateVariant({
        value: "destockal-lexicalized",
        label: "extinct or fused destockal",
        lineStart: 9194,
        lineEnd: 9212,
        family: "Frequentative formations",
      }),
      lateVariant({
        value: "uncertain-ca",
        label: "uncertain ca type",
        lineStart: 9241,
        lineEnd: 9268,
        family: "Frequentative formations",
      }),
      lateVariant({
        value: "uncertain-ca-causative",
        label: "uncertain ca: causative tz-a",
        lineStart: 9241,
        lineEnd: 9268,
        family: "Frequentative formations",
      }),
      lateVariant({
        value: "uncertain-ca-applicative",
        label: "uncertain ca: applicative tz-a",
        lineStart: 9241,
        lineEnd: 9268,
        family: "Frequentative formations",
      }),
      lateVariant({
        value: "uncertain-ca-fused-tla",
        label: "uncertain ca: fused tla",
        lineStart: 9241,
        lineEnd: 9268,
        family: "Frequentative formations",
      }),
      lateVariant({
        value: "uncertain-tzca",
        label: "uncertain tz-ca type",
        lineStart: 9269,
        lineEnd: 9287,
        family: "Frequentative formations",
      }),
      lateVariant({
        value: "connective-t",
        label: "connective-t matrix",
        lineStart: 9403,
        lineEnd: 9434,
        family: "Compound formations",
      }),
      lateVariant({
        value: "reflexive-matrix",
        label: "reflexive matrix",
        lineStart: 9782,
        lineEnd: 9839,
        family: "Compound formations",
      }),
      lateVariant({
        value: "shared-object",
        label: "shared object",
        lineStart: 9840,
        lineEnd: 9882,
        family: "Compound formations",
      }),
      lateVariant({
        value: "huītz-carry",
        label: "special huītz carry · no connective",
        lineStart: 9435,
        lineEnd: 9577,
        family: "Compound formations",
      }),
      lateVariant({
        value: "future-embed",
        label: "integrated future embed",
        lineStart: 9883,
        lineEnd: 9946,
        family: "Compound formations",
      }),
      lateVariant({
        value: "accompanying-possession",
        label: "accompanying possession",
        lineStart: 9761,
        lineEnd: 9781,
        family: "Compound formations",
      }),
      lateVariant({
        value: "causative",
        label: "causative honorific",
        lineStart: 11895,
        lineEnd: 12066,
        family: "Attitude formations",
      }),
      lateVariant({
        value: "applicative",
        label: "applicative honorific",
        lineStart: 11995,
        lineEnd: 12051,
        family: "Attitude formations",
      }),
      lateVariant({
        value: "preterit-embed",
        label: "preterit-embed attitude",
        lineStart: 12067,
        lineEnd: 12175,
        family: "Attitude formations",
      }),
    ],
    "classical-rule-logic-compound-matrix-class": [
      ...["A", "B", "C", "D"].map((value, index) => option({
        controlId: "classical-rule-logic-compound-matrix-class",
        value,
        label: value,
        tagSuffix: `compound-matrix-class-${value.toLowerCase()}`,
        lineStart: 9435,
        lineEnd: 9656,
        selected: index === 0,
        applicability: `user-supplied typed compound matrix analyzed as Class ${value}`,
        outputBehavior: "supplies matrix inflection class only; it cannot supply a matrix stem or finite result",
      })),
    ],
    "classical-rule-logic-compound-itz-sense": [
      option({
        controlId: "classical-rule-logic-compound-itz-sense",
        value: "",
        label: "choose the lexical analysis",
        tagSuffix: "compound-itz-sense-required",
        lineStart: 9694,
        lineEnd: 9717,
        canvasStatus: "required",
        selected: true,
        applicability: "homophonous itz source whose lexical identity is unresolved",
        outputBehavior: "keeps the compound request blocked until a typed lexical analysis is selected",
      }),
      option({
        controlId: "classical-rule-logic-compound-itz-sense",
        value: "observational",
        label: "look or observe",
        tagSuffix: "compound-itz-sense-observational",
        lineStart: 9694,
        lineEnd: 9717,
        applicability: "itz meaning be observant, alert, or look",
        outputBehavior: "selects the observational lexical source identity before compound generation",
      }),
      option({
        controlId: "classical-rule-logic-compound-itz-sense",
        value: "motion",
        label: "come or go",
        tagSuffix: "compound-itz-sense-motion",
        lineStart: 9694,
        lineEnd: 9717,
        applicability: "homophonous itz meaning come or go",
        outputBehavior: "selects the motion lexical source identity before compound generation",
      }),
    ],
    "classical-rule-logic-compound-event-order": [
      option({
        controlId: "classical-rule-logic-compound-event-order",
        value: "iconic",
        label: "embed then matrix",
        tagSuffix: "compound-event-order-iconic",
        lineStart: 9403,
        lineEnd: 9434,
        canvasStatus: "authorized",
        selected: true,
        applicability: "ordinary connective-t compound event sequence",
        outputBehavior: "keeps the embedded preterit event before the matrix event",
      }),
      option({
        controlId: "classical-rule-logic-compound-event-order",
        value: "hysteron-proteron",
        label: "matrix event first",
        tagSuffix: "compound-event-order-hysteron-proteron",
        lineStart: 9718,
        lineEnd: 9735,
        applicability: "compound whose licensed interpretation reverses event order",
        outputBehavior: "selects the Canvas-licensed hysteron-proteron interpretation",
      }),
    ],
    "classical-rule-logic-compound-nonactive-scope": [
      ...[
        ["none", "none", "not-applicable"],
        ["embed", "embed only", "conditioned-optional"],
        ["matrix", "matrix only", "conditioned-optional"],
        ["both", "embed and matrix", "conditioned-optional"],
      ].map(([value, label, canvasStatus], index) => option({
        controlId: "classical-rule-logic-compound-nonactive-scope",
        value,
        label,
        tagSuffix: `compound-nonactive-scope-${value}`,
        lineStart: 9736,
        lineEnd: 9760,
        canvasStatus,
        selected: index === 0,
        applicability: value === "none"
          ? "active embed and matrix source"
          : `${value} nonactive scope licensed by the typed compound source`,
        outputBehavior: value === "none"
          ? "does not apply a nonactive operation to either compound member"
          : `applies canonical nonactive formation to ${label}`,
      })),
    ],
    "classical-rule-logic-compound-subject-animacy": [
      ...["nonanimate", "animate"].map((value, index) => option({
        controlId: "classical-rule-logic-compound-subject-animacy",
        value,
        label: value,
        tagSuffix: `compound-subject-animacy-${value}`,
        lineStart: 9677,
        lineEnd: 9693,
        selected: index === 0,
        applicability: `typed compound source whose subject has ${value} reference`,
        outputBehavior: "selects referential animacy for the compound gate without supplying a subject morph",
      })),
    ],
    "classical-rule-logic-compound-possessor": [
      option({
        controlId: "classical-rule-logic-compound-possessor",
        value: "",
        label: "choose for accompanying possession",
        tagSuffix: "compound-possessor-required",
        lineStart: 9761,
        lineEnd: 9781,
        canvasStatus: "required",
        selected: true,
        applicability: "accompanying-possession compound without a typed possessor",
        outputBehavior: "keeps the possessive supplement blocked until a possessor is selected",
      }),
      ...["1sg", "2sg", "3sg", "1pl", "2pl", "3pl"].map(value => option({
        controlId: "classical-rule-logic-compound-possessor",
        value,
        label: value,
        tagSuffix: `compound-possessor-${value}`,
        lineStart: 9761,
        lineEnd: 9781,
        canvasStatus: "authorized",
        applicability: `${value} possessor of the typed accompanying-possession predicate`,
        outputBehavior: "fills the possessor coordinate in the canonical NNC supplement",
      })),
    ],
    "classical-rule-logic-frequentative-repetitions": [
      ...[
        ["1", "one"],
        ["2", "two"],
        ["3", "three"],
      ].map(([value, label], index) => option({
        controlId: "classical-rule-logic-frequentative-repetitions",
        value,
        label,
        tagSuffix: `frequentative-repetitions-${value}`,
        lineStart: 9097,
        lineEnd: 9101,
        canvasStatus: index === 0 ? "authorized" : "conditioned-optional",
        selected: index === 0,
        applicability: `${label} licensed frequentative reduplication${value === "1" ? "" : "s"}`,
        outputBehavior: "selects recursion count; the evaluator realizes every reduplicative boundary",
      })),
    ],
    "classical-rule-logic-frequentative-target": [
      ...[
        ["lexical-stem", "lexical stem"],
        ["fused-tla", "fused tla"],
        ["fused-tla-and-lexical-stem", "fused tla and lexical stem"],
        ["mainline-reflexive", "mainline reflexive"],
      ].map(([value, label], index) => option({
        controlId: "classical-rule-logic-frequentative-target",
        value,
        label,
        tagSuffix: `frequentative-target-${value}`,
        lineStart: 9105,
        lineEnd: 9138,
        canvasStatus: index === 0 ? "authorized" : "conditioned-optional",
        selected: index === 0,
        applicability: value === "lexical-stem"
          ? "ordinary frequentative, including a lexical stem beneath fused tla"
          : value === "mainline-reflexive"
            ? "mainline reflexive before a supportive initial i under short-glottal formation"
            : "typed fused-tla Source under a licensed glottal or long frequentative shape",
        outputBehavior: "selects the structurally available reduplication target; copied sounds and participant structure remain automatic",
      })),
    ],
    "classical-rule-logic-frequentative-scope": [
      ...[
        ["open", "leave the reading open"],
        ["action", "repeated action"],
        ["agent", "separate agents"],
        ["patient", "separate patients"],
        ["occasion", "separate occasions"],
        ["place", "separate places"],
      ].map(([value, label], index) => option({
        controlId: "classical-rule-logic-frequentative-scope",
        value,
        label,
        tagSuffix: `frequentative-scope-${value}`,
        lineStart: 9020,
        lineEnd: 9062,
        canvasStatus: index === 0 ? "authorized" : "conditioned-optional",
        selected: index === 0,
        applicability: value === "patient"
          ? "short-glottal frequentative whose typed Source has an object"
          : "short-glottal frequentative whose intended composition identifies this distributive scope",
        outputBehavior: value === "open"
          ? "preserves every licensed contextual scope without forcing a semantic choice"
          : `records ${label} in the typed frequentative Result without supplying its form`,
      })),
    ],
    "classical-rule-logic-purposive-series": [
      ...[
        ["outbound-nonpast-indicative", "outbound nonpast indicative", 10021, 10087],
        ["outbound-past-indicative", "outbound past indicative", 10088, 10111],
        ["outbound-nonpast-optative", "outbound nonpast optative", 10112, 10173],
        ["inbound-nonfuture-indicative", "inbound nonfuture indicative", 10179, 10208],
        ["inbound-future-indicative", "inbound future indicative", 10209, 10231],
        ["inbound-nonpast-optative", "inbound nonpast optative", 10232, 10250],
      ].map(([value, label, lineStart, lineEnd], index) => option({
        controlId: "classical-rule-logic-purposive-series",
        value,
        label,
        tagSuffix: `purposive-series-${value}`,
        lineStart,
        lineEnd,
        canvasStatus: "authorized",
        selected: index === 0,
        applicability: `typed ${label} purposive coordinate`,
        outputBehavior: "selects the purposive direction, mood, tense, and matrix series as one typed coordinate",
      })),
    ],
    "classical-rule-logic-purposive-external": [
      ...[
        ["none", "none", "not-applicable"],
        ["on", "on · thither", "conditioned-optional"],
        ["huāl", "huāl · hither", "conditioned-optional"],
      ].map(([value, label, canvasStatus], index) => option({
        controlId: "classical-rule-logic-purposive-external",
        value,
        label,
        tagSuffix: `purposive-external-${value === "huāl" ? "hual" : value}`,
        lineStart: 10274,
        lineEnd: 10302,
        canvasStatus,
        selected: index === 0,
        applicability: value === "none"
          ? "purposive VNC without an additional stem-external directional"
          : `${value} stem-external directional on a purposive VNC`,
        outputBehavior: value === "none"
          ? "does not add a stem-external directional"
          : `requests canonical ${value} directional realization outside the purposive stem`,
      })),
    ],
    "classical-rule-logic-honored-participant": [
      ...["subject", "object"].map((value, index) => option({
        controlId: "classical-rule-logic-honored-participant",
        value,
        label: value,
        tagSuffix: `honored-participant-${value}`,
        lineStart: 12014,
        lineEnd: 12037,
        selected: index === 0,
        applicability: `${value} entity motivates a licensed honorific or reverential transformation`,
        outputBehavior: "records the honored participant interpretation without changing formula slots directly",
      })),
    ],
    "classical-rule-logic-honorific-stem-alternative": [
      ...[
        ["default", "usual formation", 11895, 12013, "authorized"],
        ["anomalous", "anomalous ihca formation", 11931, 11976, "conditioned-optional"],
        ["type-two-l", "chōca type-two l formation", 11995, 12013, "conditioned-optional"],
        ["type-two-long", "chōca long type-two formation", 11995, 12013, "conditioned-optional"],
      ].map(([value, label, lineStart, lineEnd, canvasStatus], index) => option({
        controlId: "classical-rule-logic-honorific-stem-alternative",
        value,
        label,
        tagSuffix: `honorific-stem-alternative-${value}`,
        lineStart,
        lineEnd,
        canvasStatus,
        selected: index === 0,
        applicability: `${value} stem formation licensed for the selected lexical honorific source`,
        outputBehavior: "selects one lexical stem operation; the evaluator derives the honorific VNC",
      })),
    ],
  });

export const CLASSICAL_NAHUATL_VNC_LATE_OPERATION_UI_SWITCH_CONTRACTS =
  freeze({
    "classical-rule-logic-compound-ya-syncopation": {
      controlId: "classical-rule-logic-compound-ya-syncopation",
      checked: switchState({
        controlId: "classical-rule-logic-compound-ya-syncopation",
        value: "true",
        tagSuffix: "compound-ya-syncopation-enabled",
        lineStart: 9505,
        lineEnd: 9539,
        canvasStatus: "conditioned-optional",
        applicability: "connective-t compound whose matrix has the yā shape",
        outputBehavior: "realizes optional syncopated t-ā instead of ti-yā",
      }),
      unchecked: switchState({
        controlId: "classical-rule-logic-compound-ya-syncopation",
        value: "false",
        tagSuffix: "compound-ya-syncopation-disabled",
        lineStart: 9505,
        lineEnd: 9539,
        applicability: "ordinary connective-t realization before a yā matrix",
        outputBehavior: "keeps the unsyncopated ti-yā sequence",
      }),
    },
    "classical-rule-logic-purposive-irregular-n": {
      controlId: "classical-rule-logic-purposive-irregular-n",
      checked: switchState({
        controlId: "classical-rule-logic-purposive-irregular-n",
        value: "true",
        tagSuffix: "purposive-irregular-n-enabled",
        lineStart: 10139,
        lineEnd: 10163,
        canvasStatus: "conditioned-optional",
        applicability: "plural outbound nonpast-optative purposive coordinate",
        outputBehavior: "selects the free n plural variant with its required preceding long ī",
      }),
      unchecked: switchState({
        controlId: "classical-rule-logic-purposive-irregular-n",
        value: "false",
        tagSuffix: "purposive-irregular-n-disabled",
        lineStart: 10139,
        lineEnd: 10163,
        applicability: "regular plural outbound nonpast-optative purposive coordinate",
        outputBehavior: "keeps the regular h plural realization",
      }),
    },
    "classical-rule-logic-purposive-sounded-future": {
      controlId: "classical-rule-logic-purposive-sounded-future",
      checked: switchState({
        controlId: "classical-rule-logic-purposive-sounded-future",
        value: "true",
        tagSuffix: "purposive-sounded-future-enabled",
        lineStart: 9996,
        lineEnd: 10001,
        canvasStatus: "conditioned-optional",
        applicability: "explicitly requested rare sounded future in a purposive VNC",
        outputBehavior: "retains the attested sounded z future morph and marks it as rare and nonpreferred",
      }),
      unchecked: switchState({
        controlId: "classical-rule-logic-purposive-sounded-future",
        value: "false",
        tagSuffix: "purposive-sounded-future-disabled",
        lineStart: 9980,
        lineEnd: 9995,
        applicability: "ordinary purposive VNC",
        outputBehavior: "uses the normal silent future boundary automatically",
      }),
    },
    "classical-rule-logic-purposive-early-singular-glottal": {
      controlId: "classical-rule-logic-purposive-early-singular-glottal",
      checked: switchState({
        controlId: "classical-rule-logic-purposive-early-singular-glottal",
        value: "true",
        tagSuffix: "purposive-early-singular-glottal-enabled",
        lineStart: 10174,
        lineEnd: 10178,
        canvasStatus: "conditioned-optional",
        applicability: "explicitly requested early singular outbound nonpast-optative purposive variant",
        outputBehavior: "replaces ordinary matrix t-i with the grammarians' marked stem-final glottal variant without changing the preferred paradigm",
      }),
      unchecked: switchState({
        controlId: "classical-rule-logic-purposive-early-singular-glottal",
        value: "false",
        tagSuffix: "purposive-early-singular-glottal-disabled",
        lineStart: 10174,
        lineEnd: 10178,
        applicability: "ordinary singular outbound nonpast-optative purposive coordinate",
        outputBehavior: "keeps the historically supported ordinary t-i singular form",
      }),
    },
  });

export const CLASSICAL_NAHUATL_VNC_LATE_OPERATION_UI_AUTHORITY_TAGS =
  freeze([
    ...Object.values(
      CLASSICAL_NAHUATL_VNC_LATE_OPERATION_UI_CONTROL_CONTRACTS
    ).flat(),
    ...Object.values(
      CLASSICAL_NAHUATL_VNC_LATE_OPERATION_UI_SWITCH_CONTRACTS
    ).flatMap(contract => [contract.checked, contract.unchecked]),
  ]);

export function getClassicalNahuatlVncLateOperationUiControlOptions(
  controlId = ""
) {
  return (
    CLASSICAL_NAHUATL_VNC_LATE_OPERATION_UI_CONTROL_CONTRACTS[
      String(controlId || "").trim()
    ] || []
  ).map(record => ({ ...record }));
}

export function getClassicalNahuatlVncLateOperationUiSwitchContract(
  controlId = ""
) {
  const contract =
    CLASSICAL_NAHUATL_VNC_LATE_OPERATION_UI_SWITCH_CONTRACTS[
      String(controlId || "").trim()
    ];
  return contract
    ? {
        ...contract,
        checked: { ...contract.checked },
        unchecked: { ...contract.unchecked },
      }
    : null;
}

export function getClassicalNahuatlVncLateOperationAuthorityOptionTags() {
  return CLASSICAL_NAHUATL_VNC_LATE_OPERATION_UI_AUTHORITY_TAGS.map(
    record => ({ ...record })
  );
}

export function validateClassicalNahuatlVncLateOperationUiContract() {
  const selectRecords = Object.values(
    CLASSICAL_NAHUATL_VNC_LATE_OPERATION_UI_CONTROL_CONTRACTS
  ).flat();
  const switchContracts = Object.values(
    CLASSICAL_NAHUATL_VNC_LATE_OPERATION_UI_SWITCH_CONTRACTS
  );
  const records =
    CLASSICAL_NAHUATL_VNC_LATE_OPERATION_UI_AUTHORITY_TAGS;
  const tagIds = records.map(record => record.tagId);
  const allowedStatuses = new Set([
    "required",
    "optional",
    "conditioned-optional",
    "authorized",
    "not-applicable",
    "blocked",
    "not-implemented-yet",
  ]);
  const incompleteRecordIds = records
    .filter(record =>
      !record.tagId
      || !record.controlId
      || !record.canvasStatus
      || !allowedStatuses.has(record.canvasStatus)
      || !record.applicability
      || !record.outputBehavior
      || !(record.transcriptionLineStart > 0)
      || record.transcriptionLineEnd < record.transcriptionLineStart
      || !record.exactWitness
      || record.formulaStringAuthority !== false
      || record.surfaceStringAuthority !== false
    )
    .map(record => record.tagId || "<untagged>");
  const controlsWithoutOneSelectedOption = Object.entries(
    CLASSICAL_NAHUATL_VNC_LATE_OPERATION_UI_CONTROL_CONTRACTS
  )
    .filter(([, options]) =>
      options.filter(record => record.selected === true).length !== 1
    )
    .map(([controlId]) => controlId);
  const duplicateTagIds = tagIds.filter(
    (tagId, index) => tagIds.indexOf(tagId) !== index
  );
  return freeze({
    kind: "classical-nahuatl-vnc-late-operation-ui-contract-validation",
    authorizationStatus:
      incompleteRecordIds.length
      || controlsWithoutOneSelectedOption.length
      || duplicateTagIds.length
        ? "blocked"
        : "authorized",
    selectControlCount: Object.keys(
      CLASSICAL_NAHUATL_VNC_LATE_OPERATION_UI_CONTROL_CONTRACTS
    ).length,
    selectOptionCount: selectRecords.length,
    switchControlCount: switchContracts.length,
    authorityTagCount: records.length,
    uniqueAuthorityTagCount: new Set(tagIds).size,
    incompleteRecordIds,
    controlsWithoutOneSelectedOption,
    duplicateTagIds,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

export function createClassicalNahuatlVncLateOperationUiContractApi() {
  return {
    CLASSICAL_NAHUATL_VNC_LATE_OPERATION_UI_CONTROL_CONTRACTS,
    CLASSICAL_NAHUATL_VNC_LATE_OPERATION_UI_SWITCH_CONTRACTS,
    CLASSICAL_NAHUATL_VNC_LATE_OPERATION_UI_AUTHORITY_TAGS,
    getClassicalNahuatlVncLateOperationUiControlOptions,
    getClassicalNahuatlVncLateOperationUiSwitchContract,
    getClassicalNahuatlVncLateOperationAuthorityOptionTags,
    validateClassicalNahuatlVncLateOperationUiContract,
  };
}

export function installClassicalNahuatlVncLateOperationUiContractGlobals(
  targetObject = globalThis
) {
  const api = createClassicalNahuatlVncLateOperationUiContractApi();
  Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
  return api;
}
