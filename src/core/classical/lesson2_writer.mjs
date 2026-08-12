// Andrews Lesson 2 owns the passage from ordered grammatical parts to a
// finished written Classical Nahuatl form. Other grammar owners select and
// order morphs; this owner alone joins them and realizes their boundaries.

const LESSON2_WRITING_FAMILIES = Object.freeze([
  "sound-and-spelling",
  "internal-stem-boundaries",
  "syllables-and-supportive-i",
  "stress",
  "long-consonants",
  "progressive-assimilation",
  "regressive-assimilation-and-dissimilation",
  "consonant-loss",
  "other-consonant-changes",
  "vowel-elision",
  "long-vowel-to-glottal-stop",
  "sentence-prosody",
]);

const ENDING_CONSONANTS = Object.freeze([
  "ch", "tl", "tz", "qu", "cu", "hu", "uh",
  "c", "x", "z", "s", "m", "n", "p", "t", "l", "y", "h",
]);

const STARTING_CONSONANTS = ENDING_CONSONANTS;

function cleanPart(value = "") {
  return String(value == null ? "" : value)
    .normalize("NFC")
    .trim()
    .replace(/^\((.*)\)$/u, "$1")
    .replace(/^-|-$/gu, "");
}

function boundarySpelling(value, side) {
  const candidates = side === "right"
    ? STARTING_CONSONANTS
    : ENDING_CONSONANTS;
  return candidates.find(candidate => (
    side === "right" ? value.startsWith(candidate) : value.endsWith(candidate)
  )) || "";
}

function boundarySound(spelling, morph, side, normalizeSound) {
  if (!spelling) return "";
  if (spelling === "c") {
    const following = side === "right" ? morph.slice(1, 2) : "";
    return following === "e" || following === "i" ? "s" : "k";
  }
  if (spelling === "qu") return "k";
  if (spelling === "cu" || spelling === "uc") return "kw";
  if (spelling === "hu" || spelling === "uh") return "w";
  return normalizeSound(spelling);
}

export function createClassicalNahuatlLesson2WriterApi(targetObject = globalThis) {
  const issuedSources = new WeakSet();
  const issuedResults = new WeakMap();

  function issueClassicalNahuatlLesson2WritingSource(specification = {}) {
    const allowedKeys = new Set(["parts", "boundaryKind"]);
    const hasForbiddenField = !specification
      || typeof specification !== "object"
      || Reflect.ownKeys(specification).some(key => !allowedKeys.has(String(key)));
    const rawParts = Array.isArray(specification?.parts)
      ? specification.parts
      : [];
    const parts = rawParts.map(part => Object.freeze({
      role: String(part?.role || "morph"),
      value: cleanPart(part?.value),
      supportiveI: String(part?.supportiveI || ""),
    }));
    const authorized = !hasForbiddenField && parts.length > 0 && parts.every(part => (
      part.value
      && !/[\s#()]/u.test(part.value)
      && !targetObject.getInvalidClassicalNahuatlGraphemes(part.value).length
    ));
    const source = Object.freeze({
      kind: "classical-nahuatl-lesson2-writing-source",
      version: 1,
      authorizationStatus: authorized ? "authorized" : "blocked",
      blockReason: authorized
        ? ""
        : hasForbiddenField
          ? "lesson2-caller-supplied-result-forbidden"
          : "lesson2-ordered-grammatical-parts-required",
      parts: Object.freeze(parts),
      boundaryKind: String(specification?.boundaryKind || "morph"),
      orderedGrammarPartsOnly: true,
      callerSuppliedSurfaceAuthority: false,
      formulaStringAuthority: false,
      lessonMetadataAuthority: false,
    });
    if (authorized) issuedSources.add(source);
    return source;
  }

  function isClassicalNahuatlLesson2WritingSource(source = null) {
    return Boolean(
      source
      && issuedSources.has(source)
      && source.kind === "classical-nahuatl-lesson2-writing-source"
      && source.version === 1
      && source.authorizationStatus === "authorized"
      && source.orderedGrammarPartsOnly === true
      && source.callerSuppliedSurfaceAuthority === false
      && source.formulaStringAuthority === false
      && source.lessonMetadataAuthority === false
      && Object.isFrozen(source)
    );
  }

  function writeClassicalNahuatlLesson2Result(source = null) {
    if (!isClassicalNahuatlLesson2WritingSource(source)) {
      return Object.freeze({
        kind: "classical-nahuatl-lesson2-written-result",
        version: 1,
        authorizationStatus: "blocked",
        blockReason: "lesson2-owner-issued-writing-source-required",
        surface: "",
      });
    }
    const supportiveVowelActions = [];
    const realizedParts = source.parts.map((part, index) => {
      if (part.supportiveI !== "insert-before-consonant") return part.value;
      const following = source.parts[index + 1]?.value || "";
      const insert = Boolean(following && !/^[aāeēiīoō]/u.test(following));
      supportiveVowelActions.push(Object.freeze({
        partIndex: index,
        status: insert ? "applied" : "checked-not-applicable",
        source: part.value,
        result: insert ? `${part.value}i` : part.value,
      }));
      return insert ? `${part.value}i` : part.value;
    });
    const boundaryActions = [];
    for (let index = 0; index < realizedParts.length - 1; index += 1) {
      const left = realizedParts[index];
      const right = realizedParts[index + 1];
      const leftSpelling = boundarySpelling(left, "left");
      const rightSpelling = boundarySpelling(right, "right");
      const leftSound = boundarySound(
        leftSpelling,
        left,
        "left",
        targetObject.normalizeClassicalNahuatlAssimilationSound,
      );
      const rightSound = boundarySound(
        rightSpelling,
        right,
        "right",
        targetObject.normalizeClassicalNahuatlAssimilationSound,
      );
      const frame = targetObject.buildClassicalNahuatlAssimilationFrame({
        leftConsonant: leftSound,
        rightConsonant: rightSound,
        sourceLeftMorpheme: left,
        sourceRightMorpheme: right,
        grammaticalConstruction: true,
      });
      if (frame?.authorizationStatus !== "authorized" || !frame.outputForm) {
        boundaryActions.push(Object.freeze({
          boundaryIndex: index,
          status: "checked-not-applicable",
          sourceLeft: left,
          sourceRight: right,
          resultLeft: left,
          resultRight: right,
          ruleId: "",
        }));
        continue;
      }
      realizedParts[index] = frame.realizedLeftMorpheme;
      realizedParts[index + 1] = frame.realizedRightMorpheme;
      boundaryActions.push(Object.freeze({
        boundaryIndex: index,
        status: "applied",
        sourceLeft: left,
        sourceRight: right,
        resultLeft: realizedParts[index],
        resultRight: realizedParts[index + 1],
        ruleId: frame.selectedRuleId,
      }));
    }
    const appliedRuleIds = boundaryActions
      .filter(action => action.status === "applied" && action.ruleId)
      .map(action => action.ruleId);
    const ownedFamilyIds = new Set([
      "sound-and-spelling",
      "internal-stem-boundaries",
      ...(supportiveVowelActions.length
        ? ["syllables-and-supportive-i"]
        : []),
      ...(appliedRuleIds.some(ruleId => ruleId.includes("-210-"))
        ? ["progressive-assimilation"]
        : []),
      ...(appliedRuleIds.some(ruleId => ruleId.includes("-211-"))
        ? ["regressive-assimilation-and-dissimilation"]
        : []),
    ]);
    const familyChecks = Object.freeze(LESSON2_WRITING_FAMILIES.map(familyId => (
      Object.freeze({
        familyId,
        checked: ownedFamilyIds.has(familyId),
        status: ownedFamilyIds.has(familyId)
          ? "performed-by-lesson2-owner"
          : "not-yet-centralized",
      })
    )));
    const surface = realizedParts.join("");
    const result = Object.freeze({
      kind: "classical-nahuatl-lesson2-written-result",
      version: 1,
      authorizationStatus: surface ? "authorized" : "blocked",
      blockReason: surface ? "" : "lesson2-writing-produced-no-result",
      source,
      surface,
      realizedParts: Object.freeze(realizedParts),
      boundaryActions: Object.freeze(boundaryActions),
      supportiveVowelActions: Object.freeze(supportiveVowelActions),
      familyChecks,
      ownedWritingFamilyIds: Object.freeze([...ownedFamilyIds]),
      remainingWritingFamilyIds: Object.freeze(
        LESSON2_WRITING_FAMILIES.filter(familyId => !ownedFamilyIds.has(familyId)),
      ),
      allWritingFamiliesChecked: familyChecks.every(check => check.checked),
      writtenByLesson2: true,
      callerSuppliedSurfaceAuthority: false,
      formulaStringAuthority: false,
      lessonMetadataAuthority: false,
    });
    issuedResults.set(result, Object.freeze({ source, surface }));
    return result;
  }

  function isClassicalNahuatlLesson2WrittenResult(result = null) {
    const receipt = result && typeof result === "object"
      ? issuedResults.get(result)
      : null;
    return Boolean(
      receipt
      && result.kind === "classical-nahuatl-lesson2-written-result"
      && result.version === 1
      && result.authorizationStatus === "authorized"
      && result.source === receipt.source
      && result.surface === receipt.surface
      && result.writtenByLesson2 === true
      && result.familyChecks?.length === 12
      && result.ownedWritingFamilyIds?.length >= 2
      && result.remainingWritingFamilyIds?.length
        === 12 - result.ownedWritingFamilyIds.length
      && result.callerSuppliedSurfaceAuthority === false
      && result.formulaStringAuthority === false
      && result.lessonMetadataAuthority === false
      && Object.isFrozen(result)
    );
  }

  return Object.freeze({
    CLASSICAL_NAHUATL_LESSON2_WRITING_FAMILIES: LESSON2_WRITING_FAMILIES,
    issueClassicalNahuatlLesson2WritingSource,
    isClassicalNahuatlLesson2WritingSource,
    writeClassicalNahuatlLesson2Result,
    isClassicalNahuatlLesson2WrittenResult,
  });
}

export function installClassicalNahuatlLesson2WriterGlobals(
  targetObject = globalThis,
  installationContext = {},
) {
  const writerTarget = Object.create(targetObject);
  Object.defineProperties(
    writerTarget,
    Object.getOwnPropertyDescriptors(
      installationContext?.moduleDependencyCapabilities || {},
    ),
  );
  const api = createClassicalNahuatlLesson2WriterApi(writerTarget);
  Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
  return api;
}
