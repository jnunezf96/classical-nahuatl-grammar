// Canonical finite VNC slot owner.
//
// It consumes a typed intransitive VNC Source and an owner-issued nuclear
// clause structure result.  Curriculum labels, stored formulas, display
// receipts, and copied result shapes cannot authorize evaluation.

const SOURCE_KIND = "classical-nahuatl-finite-vnc-source";
const RESULT_KIND = "classical-nahuatl-finite-vnc-slot-result";
const PERSON_DYAD_KIND = "classical-nahuatl-finite-subject-person-dyad";
const NUMBER_DYAD_KIND = "classical-nahuatl-finite-subject-number-dyad";
const TENSE_KIND = "classical-nahuatl-finite-mood-tense-slot";
const VERSION = 1;
const SQUARE_ZERO = "\u2395";
const SOURCE_INVALID = "classical-finite-vnc-source-invalid";
const SOURCE_AUTHORITY_INVALID = "classical-finite-vnc-source-authority-invalid";
const PREREQUISITE_INVALID =
  "classical-finite-vnc-nuclear-clause-prerequisite-invalid";

const SUBJECTS = Object.freeze([
  "1sg",
  "2sg",
  "3sg",
  "1pl",
  "2pl",
  "3pl",
]);

const TENSE_FILLERS = Object.freeze({
  "indicative:present": Object.freeze({
    mood: "indicative",
    tense: "present",
    tns: "0",
    condition: "main-indicative",
  }),
  "indicative:customary-present": Object.freeze({
    mood: "indicative",
    tense: "customary-present",
    tns: "ni",
    condition: "main-indicative",
  }),
  "indicative:imperfect": Object.freeze({
    mood: "indicative",
    tense: "imperfect",
    tns: "ya",
    condition: "main-indicative",
  }),
  "indicative:future": Object.freeze({
    mood: "indicative",
    tense: "future",
    tns: "z",
    condition: "future-preterit-indicative",
  }),
  "indicative:preterit": Object.freeze({
    mood: "indicative",
    tense: "preterit",
    tns: "0",
    condition: "future-preterit-indicative",
  }),
  "indicative:distant-past": Object.freeze({
    mood: "indicative",
    tense: "distant-past",
    tns: "ca",
    condition: "main-indicative",
  }),
  "optative:nonpast": Object.freeze({
    mood: "optative",
    tense: "nonpast",
    tns: "0",
    condition: "nonpast-optative",
  }),
  "optative:past": Object.freeze({
    mood: "optative",
    tense: "past",
    tns: "ni",
    condition: "past-optative",
  }),
  "admonitive:nonpast": Object.freeze({
    mood: "admonitive",
    tense: "nonpast",
    tns: "0",
    classATns: "h",
    condition: "nonpast-admonitive",
  }),
});

const FORBIDDEN_AUTHORITY_KEYS = Object.freeze(new Set([
  "activeLesson",
  "canvasSpan",
  "displayFormula",
  "displayReceiptFrame",
  "displaySurface",
  "exactWitness",
  "formula",
  "formulaArtifact",
  "formulaId",
  "formulaRecord",
  "formulaTemplate",
  "lesson",
  "lesson4Frame",
  "lesson5Frame",
  "lessonMetadata",
  "lineEnd",
  "lineStart",
  "proofFrame",
  "receiptAuthorityFrame",
  "receiptInventory",
  "result",
  "ruleRefs",
  "selectedOutputLogicFrame",
  "sourceDocument",
  "storedAnswer",
  "surface",
  "surfaceForms",
  "witness",
]));

function hasForbiddenAuthorityCarrier(value, seen = new Set()) {
  if (!value || typeof value !== "object" || seen.has(value)) {
    return false;
  }
  seen.add(value);
  for (const key of Reflect.ownKeys(value)) {
    if (
      typeof key !== "string"
      || FORBIDDEN_AUTHORITY_KEYS.has(key)
      || key.startsWith("lesson")
    ) {
      return true;
    }
    let child;
    try {
      child = value[key];
    } catch {
      return true;
    }
    if (hasForbiddenAuthorityCarrier(child, seen)) {
      return true;
    }
  }
  return false;
}

function normalizeToken(value = "") {
  return String(value == null ? "" : value).trim().toLowerCase();
}

function normalizeStem(value = "") {
  return String(value == null ? "" : value)
    .trim()
    .replace(/^-+\s*/u, "")
    .replace(/^\((.*)\)$/u, "$1")
    .trim();
}

function normalizeSubject(value = "") {
  const normalized = normalizeToken(value).replace(/[-\s]/gu, "");
  const aliases = Object.freeze({
    "1": "1sg",
    "1s": "1sg",
    "1sg": "1sg",
    firstsingular: "1sg",
    "2": "2sg",
    "2s": "2sg",
    "2sg": "2sg",
    secondsingular: "2sg",
    "3": "3sg",
    "3s": "3sg",
    "3sg": "3sg",
    thirdsingular: "3sg",
    "1p": "1pl",
    "1pl": "1pl",
    firstplural: "1pl",
    "2p": "2pl",
    "2pl": "2pl",
    secondplural: "2pl",
    "3p": "3pl",
    "3pl": "3pl",
    thirdplural: "3pl",
  });
  return aliases[normalized] || "";
}

function normalizeMood(value = "") {
  const normalized = normalizeToken(value);
  if (normalized === "indicative" || normalized === "indicativo") {
    return "indicative";
  }
  if (normalized === "optative" || normalized === "optativo") {
    return "optative";
  }
  if (normalized === "admonitive" || normalized === "admonitivo") {
    return "admonitive";
  }
  return "";
}

function normalizeTense(value = "", mood = "") {
  const normalized = normalizeToken(value);
  const aliases = Object.freeze({
    present: "present",
    presente: "present",
    "customary-present": "customary-present",
    customarypresent: "customary-present",
    habitual: "customary-present",
    imperfect: "imperfect",
    imperfecto: "imperfect",
    future: "future",
    futuro: "future",
    preterit: "preterit",
    preterito: "preterit",
    "pretérito": "preterit",
    "distant-past": "distant-past",
    distantpast: "distant-past",
    remoto: "distant-past",
    nonpast: "nonpast",
    "non-past": "nonpast",
    past: "past",
    pasado: "past",
  });
  const tense = aliases[normalized] || "";
  return TENSE_FILLERS[`${mood}:${tense}`] ? tense : "";
}

function plainSounds(value = "") {
  return normalizeStem(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/gu, "")
    .toLowerCase()
    .replace(/[^a-z]/gu, "");
}

function followingSound(value = "") {
  return plainSounds(value).slice(0, 1);
}

function finalSound(value = "") {
  return plainSounds(value).slice(-1);
}

function isVowel(sound = "") {
  return /^[aeio]$/u.test(String(sound || "").toLowerCase());
}

function frozen(value) {
  return Object.freeze(value);
}

function formulaCarrier(value = "") {
  return String(value == null ? "" : value);
}

function writtenCarrier(value = "") {
  const normalized = String(value == null ? "" : value);
  return normalized === "0" || normalized === SQUARE_ZERO ? "" : normalized;
}

export function createClassicalNahuatlFiniteVncRuntime(
  targetObject = globalThis,
) {
  const issuedSources = new WeakSet();
  const issuedResults = new WeakSet();
  const issuedPersonDyads = new WeakSet();
  const issuedNumberDyads = new WeakSet();
  const issuedTenseFrames = new WeakSet();

  function getClassicalNahuatlFiniteSubjectPersonDyad(
    subject = "",
    mood = "",
    options = {},
  ) {
    const normalizedSubject = normalizeSubject(subject);
    const normalizedMood = normalizeMood(mood);
    const sound = followingSound(options.followingMaterial || options.stem || "");
    if (!normalizedSubject || !normalizedMood || !sound) {
      throw new Error(SOURCE_INVALID);
    }
    const consonantFollows = !isVowel(sound);
    let baseMorph = "";
    let pers1 = "";
    let variants = [];
    let realizationCondition = "";
    if (normalizedSubject === "3sg" || normalizedSubject === "3pl") {
      baseMorph = "0";
      pers1 = "0";
      variants = ["0"];
      realizationCondition = "third-person-zero";
    } else if (
      normalizedMood === "optative"
      && (normalizedSubject === "2sg" || normalizedSubject === "2pl")
    ) {
      baseMorph = "x";
      pers1 = consonantFollows ? "xi" : "x";
      variants = ["x", "xi"];
      realizationCondition = consonantFollows
        ? "supportive-i-before-consonant"
        : "short-before-vowel";
    } else if (normalizedSubject === "1sg") {
      baseMorph = "n";
      pers1 = consonantFollows ? "ni" : "n";
      variants = ["n", "ni"];
      realizationCondition = consonantFollows
        ? "supportive-i-before-consonant"
        : "short-before-vowel";
    } else if (
      normalizedSubject === "2sg"
      || normalizedSubject === "1pl"
    ) {
      baseMorph = "t";
      pers1 = consonantFollows ? "ti" : "t";
      variants = ["t", "ti"];
      realizationCondition = consonantFollows
        ? "supportive-i-before-consonant"
        : "short-before-vowel";
    } else {
      baseMorph = "am";
      variants = ["am", "an", "az", "ax"];
      if (sound === "z" || sound === "x") {
        pers1 = `a${sound}`;
        realizationCondition = `nasal-assimilation-before-${sound}`;
      } else {
        pers1 = isVowel(sound) || sound === "m" || sound === "p" ? "am" : "an";
        realizationCondition = pers1 === "am"
          ? "am-before-vowel-m-p"
          : "nasal-assimilation-default";
      }
    }
    const supportive = ["n", "t", "x"].includes(baseMorph)
      && pers1 === `${baseMorph}i`;
    const dyad = frozen({
      kind: PERSON_DYAD_KIND,
      version: VERSION,
      subject: normalizedSubject,
      mood: normalizedMood,
      pers1,
      pers2: "0",
      pers2Locus: "subject-case",
      pers2Case: "nominative",
      pers2CaseMorph: "0",
      pers2CaseIsSilentlyPresent: true,
      pers2CaseIsNotGrammaticalAbsence: true,
      pers1Variants: frozen(variants),
      pers1VariantRule: realizationCondition,
      pers1BaseMorph: baseMorph,
      pers1SupportiveVowelPresent: supportive,
      pers1SupportiveVowel: supportive ? "i" : "",
      pers1SupportiveISurfacePolicy:
        "conditional-support-vowel-boundary-action",
      pers1SupportiveISurfaceAction: supportive
        ? "insert"
        : "not-needed",
      pers1SupportiveISurfaceReason: realizationCondition,
      pers1SupportiveIIsOnlyAdditionOrDeletion: false,
      pers1FollowingCarrierSource: "stem",
      followingSound: sound,
      optativeSecondPersonUsesX:
        normalizedMood === "optative"
        && (normalizedSubject === "2sg" || normalizedSubject === "2pl"),
      morphCarrierAnalysis: frozen({
        morphIdentity: baseMorph,
        realizedCarrier: pers1,
        carrierKind: pers1 === "0" ? "sigic" : "phonic",
        morphAndCarrierAreDistinct: true,
        supportiveVowelIsCarrierRealizationNotNewMorph: supportive,
        regularVariantListedFirst: true,
        repertoryNotation: frozen({
          spellingVariants: "/",
          morphicVariants: "~",
        }),
        spellingDoesNotCreateMorphIdentity: true,
        canonicalContrastExample: frozen({
          lexeme: "lord",
          spellingVariantsOfOneMorph: frozen(["tēuc", "tēcu"]),
          sharedMorphicCarrier: "te:kw",
          distinctMorphicVariant: "tēe",
          distinctVariantRealization: "delabialized-/kw/-as-[k]",
        }),
      }),
    });
    issuedPersonDyads.add(dyad);
    return dyad;
  }

  function isClassicalNahuatlFiniteSubjectPersonDyad(frame = null) {
    return Boolean(
      frame
      && issuedPersonDyads.has(frame)
      && frame.kind === PERSON_DYAD_KIND
      && frame.version === VERSION,
    );
  }

  function getClassicalNahuatlFiniteMoodTenseFrame({
    mood = "",
    tense = "",
    verbClass = "",
  } = {}) {
    const normalizedMood = normalizeMood(mood);
    const normalizedTense = normalizeTense(tense, normalizedMood);
    const base = TENSE_FILLERS[`${normalizedMood}:${normalizedTense}`];
    if (!base) {
      throw new Error(SOURCE_INVALID);
    }
    const normalizedClass = normalizeToken(verbClass).toUpperCase();
    const frame = frozen({
      kind: TENSE_KIND,
      version: VERSION,
      mood: base.mood,
      tense: base.tense,
      tns:
        normalizedMood === "admonitive" && normalizedClass === "A"
          ? base.classATns
          : base.tns,
      condition: base.condition,
      verbClass: normalizedClass || "not-specified",
      moodAndTenseFused: true,
    });
    issuedTenseFrames.add(frame);
    return frame;
  }

  function isClassicalNahuatlFiniteMoodTenseFrame(frame = null) {
    return Boolean(
      frame
      && issuedTenseFrames.has(frame)
      && frame.kind === TENSE_KIND
      && frame.version === VERSION,
    );
  }

  function getClassicalNahuatlFiniteSubjectNumberDyad({
    subject = "",
    mood = "",
    tense = "",
    stem = "",
    verbClass = "",
  } = {}) {
    const normalizedSubject = normalizeSubject(subject);
    const normalizedMood = normalizeMood(mood);
    const normalizedTense = normalizeTense(tense, normalizedMood);
    const normalizedStem = normalizeStem(stem);
    const normalizedVerbClass = normalizeToken(verbClass).toUpperCase();
    if (
      !normalizedSubject
      || !normalizedMood
      || !normalizedTense
      || !normalizedStem
    ) {
      throw new Error(SOURCE_INVALID);
    }
    const isPlural = normalizedSubject.endsWith("pl");
    const lastSound = finalSound(normalizedStem);
    const stemFinalSoundKind = isVowel(lastSound) ? "vowel" : "consonant";
    let num1 = "0";
    let num2 = isPlural ? "h" : "0";
    let condition = "main-indicative";
    let num1Variants = ["0"];
    let num2Variants = isPlural ? ["h"] : ["0"];
    let realizationCondition = "main-indicative-zero";
    let alternateNumberDyads = [];

    if (
      normalizedMood === "indicative"
      && normalizedTense === "future"
    ) {
      condition = "future-preterit-indicative";
      num1 = isPlural ? "qu" : SQUARE_ZERO;
      num2 = isPlural ? "eh" : "0";
      num1Variants = isPlural ? ["qu"] : [SQUARE_ZERO, "qui"];
      num2Variants = isPlural ? ["eh"] : ["0"];
      realizationCondition = isPlural
        ? "qu-before-plural-eh"
        : "square-zero-replaces-supportive-qui";
      alternateNumberDyads = isPlural ? [] : ["qui-0"];
    } else if (
      normalizedMood === "indicative"
      && normalizedTense === "preterit"
    ) {
      const classAPreterit = normalizedVerbClass === "A"
        || (!normalizedVerbClass && stemFinalSoundKind === "vowel");
      condition = "future-preterit-indicative";
      num1 = isPlural
        ? "qu"
        : classAPreterit && stemFinalSoundKind === "vowel"
          ? "c"
          : SQUARE_ZERO;
      num2 = isPlural ? "eh" : "0";
      num1Variants = isPlural
        ? ["qu"]
        : classAPreterit && stemFinalSoundKind === "vowel"
          ? ["c"]
          : [SQUARE_ZERO, "qui"];
      num2Variants = isPlural ? ["eh"] : ["0"];
      realizationCondition = isPlural
        ? "qu-before-plural-eh"
        : classAPreterit && stemFinalSoundKind === "vowel"
          ? "c-after-class-a-preterit-vowel"
          : "square-zero-replaces-qui-outside-class-a-vowel";
      alternateNumberDyads =
        !isPlural && num1 === SQUARE_ZERO ? ["qui-0"] : [];
    } else if (
      normalizedMood === "optative"
      && normalizedTense === "nonpast"
    ) {
      condition = "nonpast-optative";
      num1 = isPlural ? "c" : SQUARE_ZERO;
      num2 = isPlural ? "ān" : "0";
      num1Variants = isPlural ? ["c"] : [SQUARE_ZERO];
      num2Variants = isPlural ? ["ān"] : ["0"];
      realizationCondition = isPlural
        ? "nonpast-optative-c-an"
        : "nonpast-optative-square-zero";
    } else if (normalizedMood === "admonitive") {
      condition = "nonpast-admonitive";
      num1 = isPlural ? "t" : SQUARE_ZERO;
      num2 = isPlural ? "in" : "0";
      num1Variants = isPlural ? ["t"] : [SQUARE_ZERO];
      num2Variants = isPlural ? ["in", "ih"] : ["0"];
      realizationCondition = isPlural
        ? "nonpast-admonitive-t-in"
        : "nonpast-admonitive-square-zero";
      alternateNumberDyads = isPlural ? ["t-ih"] : [];
    } else if (
      normalizedMood === "optative"
      && normalizedTense === "past"
    ) {
      condition = "past-optative";
      realizationCondition = "past-optative-zero";
    }

    const inKFamily =
      normalizedMood === "indicative"
      && ["future", "preterit"].includes(normalizedTense);
    const supportiveVowelPresent = inKFamily && num1 === "qui";
    const supportiveVowelSuppressedBySquareZero =
      inKFamily && num1 === SQUARE_ZERO && num1Variants.includes("qui");
    const frame = frozen({
      kind: NUMBER_DYAD_KIND,
      version: VERSION,
      subject: normalizedSubject,
      verbClass: normalizedVerbClass || "not-specified",
      conditioningStem: normalizedStem,
      stemFinalSound: lastSound,
      stemFinalSoundKind,
      num1,
      num2,
      condition,
      num1Variants: frozen(num1Variants),
      num2Variants: frozen(num2Variants),
      num1VariantRule: realizationCondition,
      alternateNumberDyads: frozen(alternateNumberDyads),
      num1BaseMorphSpelling:
        inKFamily && (num1 === "qui" || num1 === SQUARE_ZERO) ? "qu" : num1,
      num1SupportiveVowelPresent: supportiveVowelPresent,
      num1SupportiveVowel: supportiveVowelPresent ? "i" : "",
      num1SupportiveVowelForQui: "i",
      quiIsIrregularSupportiveVowelCarrier: true,
      num1SupportiveVowelSuppressedBySquareZero:
        supportiveVowelSuppressedBySquareZero,
      num1SupportiveISurfacePolicy:
        "conditional-support-vowel-boundary-action",
      num1SupportiveISurfaceAction: supportiveVowelPresent
        ? "insert"
        : supportiveVowelSuppressedBySquareZero
          ? "suppress"
          : "not-needed",
      num1SupportiveISurfaceReason: realizationCondition,
      num1SupportiveIIsOnlyAdditionOrDeletion: false,
      num1LeftCarrierSource:
        normalizedMood === "indicative" && normalizedTense === "future"
          ? "tns"
          : "stem",
      num1LeftSound:
        normalizedMood === "indicative" && normalizedTense === "future"
          ? "z"
          : lastSound,
      dyadRemainsSubjectConnector: true,
      tenseMorphDoesNotOwnNum1: true,
      num1Locus: "subject-number-connector",
      num1MediatesPredicateAndNum2: true,
      preteritSingularCRequiresClassA:
        normalizedMood !== "indicative"
        || normalizedTense !== "preterit"
        || isPlural
        || num1 !== "c"
        || normalizedVerbClass === "A"
        || !normalizedVerbClass,
      num2Locus: "definitive-subject-number",
      num2IsDefinitiveNumberCarrier: true,
    });
    issuedNumberDyads.add(frame);
    return frame;
  }

  function isClassicalNahuatlFiniteSubjectNumberDyad(frame = null) {
    return Boolean(
      frame
      && issuedNumberDyads.has(frame)
      && frame.kind === NUMBER_DYAD_KIND
      && frame.version === VERSION,
    );
  }

  function buildClassicalNahuatlFiniteVncSource(stem = "", options = {}) {
    if (
      !options
      || typeof options !== "object"
      || hasForbiddenAuthorityCarrier(options)
    ) {
      throw new Error(SOURCE_AUTHORITY_INVALID);
    }
    const normalizedStem = normalizeStem(stem);
    const subject = normalizeSubject(
      options.subject || options.subjectPerson || options.subj || "",
    );
    const mood = normalizeMood(options.mood || options.sentenceMood || "");
    const tense = normalizeTense(
      options.tense || options.tenseKey || "",
      mood,
    );
    const verbClass = normalizeToken(
      options.verbClass || options.perfectiveClass || "",
    ).toUpperCase();
    if (!normalizedStem || !subject || !mood || !tense) {
      throw new Error(SOURCE_INVALID);
    }
    const source = frozen({
      kind: SOURCE_KIND,
      version: VERSION,
      stem: normalizedStem,
      subject,
      mood,
      tense,
      verbClass,
      transitivity: "intransitive",
    });
    issuedSources.add(source);
    return source;
  }

  function isClassicalNahuatlFiniteVncSource(source = null) {
    return Boolean(
      source
      && issuedSources.has(source)
      && source.kind === SOURCE_KIND
      && source.version === VERSION,
    );
  }

  function projectFiniteFormula(result) {
    return `#${formulaCarrier(result.personDyad.pers1)}-`
      + `${formulaCarrier(result.personDyad.pers2)}(`
      + `${formulaCarrier(result.stem)})`
      + `${formulaCarrier(result.tenseFrame.tns)}+`
      + `${formulaCarrier(result.numberDyad.num1)}-`
      + `${formulaCarrier(result.numberDyad.num2)}#`;
  }

  function realizeFiniteWritten(result) {
    return [
      result.personDyad.pers1,
      result.stem,
      result.tenseFrame.tns,
      result.numberDyad.num1,
      result.numberDyad.num2,
    ].map(writtenCarrier).join("");
  }

  function evaluateClassicalNahuatlFiniteVncSlots(
    source = null,
    nuclearClauseResult = null,
  ) {
    if (!isClassicalNahuatlFiniteVncSource(source)) {
      throw new Error(SOURCE_AUTHORITY_INVALID);
    }
    const validateNuclear =
      targetObject?.isClassicalNahuatlNuclearClauseResult;
    if (
      typeof validateNuclear !== "function"
      || validateNuclear(nuclearClauseResult) !== true
      || nuclearClauseResult.clauseKind !== "verbal-nuclear-clause"
      || nuclearClauseResult.transitivity !== "intransitive"
      || nuclearClauseResult.slotArity !== "vacant"
      || nuclearClauseResult.stem !== source.stem
    ) {
      throw new Error(PREREQUISITE_INVALID);
    }
    const personDyad = getClassicalNahuatlFiniteSubjectPersonDyad(
      source.subject,
      source.mood,
      { stem: source.stem },
    );
    const tenseFrame = getClassicalNahuatlFiniteMoodTenseFrame({
      mood: source.mood,
      tense: source.tense,
      verbClass: source.verbClass,
    });
    const numberDyad = getClassicalNahuatlFiniteSubjectNumberDyad({
      subject: source.subject,
      mood: source.mood,
      tense: source.tense,
      stem: source.stem,
      verbClass: source.verbClass,
    });
    const result = {
      kind: RESULT_KIND,
      version: VERSION,
      source,
      nuclearClauseResult,
      stem: source.stem,
      subject: source.subject,
      mood: source.mood,
      tense: source.tense,
      verbClass: source.verbClass || "not-specified",
      personDyad,
      tenseFrame,
      numberDyad,
      authorizationStatus: "authorized",
      formulaOutputAllowed: true,
      blocksInput: false,
    };
    result.formulaRealization = projectFiniteFormula(result);
    result.formula = projectFiniteFormula(result);
    result.written = realizeFiniteWritten(result);
    const slotBuilder = targetObject?.buildClassicalNahuatlVncSlotFrame;
    result.vncSlotFrame = typeof slotBuilder === "function"
      ? slotBuilder({
        sourceFrameKind: RESULT_KIND,
        sourceAuthorizationStatus: "authorized",
        stem: source.stem,
        personDyad,
        tenseFrame,
        numberDyad,
        formulaArtifact: result.formula,
      })
      : null;
    const frozenResult = frozen(result);
    issuedResults.add(frozenResult);
    return frozenResult;
  }

  function buildClassicalNahuatlFiniteVncResult(stem = "", options = {}) {
    const source = buildClassicalNahuatlFiniteVncSource(stem, options);
    const buildNuclear = targetObject?.buildClassicalNahuatlNuclearClauseResult;
    if (typeof buildNuclear !== "function") {
      throw new Error(PREREQUISITE_INVALID);
    }
    const nuclear = buildNuclear(source.stem, {
      nuclearClauseKind: "verbal-nuclear-clause",
      transitivity: "intransitive",
      valenceArity: "vacant",
    });
    return evaluateClassicalNahuatlFiniteVncSlots(source, nuclear);
  }

  function isClassicalNahuatlFiniteVncResult(result = null) {
    return Boolean(
      result
      && issuedResults.has(result)
      && result.kind === RESULT_KIND
      && result.version === VERSION
      && isClassicalNahuatlFiniteVncSource(result.source),
    );
  }

  function getClassicalNahuatlFiniteSubjectOptions(
    mood = "",
    options = {},
  ) {
    return SUBJECTS.map((subject) => {
      const dyad = getClassicalNahuatlFiniteSubjectPersonDyad(
        subject,
        mood,
        options,
      );
      return frozen({
        id: subject,
        label: `${subject} ${dyad.pers1}-0`,
        pers1: dyad.pers1,
        pers2: dyad.pers2,
        mood: dyad.mood,
        outputSlot: "pers1-pers2",
      });
    });
  }

  function getClassicalNahuatlFiniteTenseOptions({ verbClass = "" } = {}) {
    return Object.keys(TENSE_FILLERS).map((id) => {
      const [mood, tense] = id.split(":");
      const frame = getClassicalNahuatlFiniteMoodTenseFrame({
        mood,
        tense,
        verbClass,
      });
      return frozen({
        id,
        mood,
        tense,
        tns: frame.tns,
      });
    });
  }

  const api = frozen({
    buildClassicalNahuatlFiniteVncSource,
    isClassicalNahuatlFiniteVncSource,
    getClassicalNahuatlFiniteSubjectPersonDyad,
    isClassicalNahuatlFiniteSubjectPersonDyad,
    getClassicalNahuatlFiniteSubjectNumberDyad,
    isClassicalNahuatlFiniteSubjectNumberDyad,
    getClassicalNahuatlFiniteMoodTenseFrame,
    isClassicalNahuatlFiniteMoodTenseFrame,
    evaluateClassicalNahuatlFiniteVncSlots,
    buildClassicalNahuatlFiniteVncResult,
    isClassicalNahuatlFiniteVncResult,
    getClassicalNahuatlFiniteSubjectOptions,
    getClassicalNahuatlFiniteTenseOptions,
  });
  Object.assign(targetObject, api);
  return api;
}

export function installClassicalNahuatlFiniteVncGlobals(
  targetObject = globalThis,
) {
  return createClassicalNahuatlFiniteVncRuntime(targetObject);
}
