import { capitalizeClassicalNahuatlNncSentenceInitial } from "./nnc_layer_evaluator.mjs?andrewsRelease=20261024-1&ownerDecision=20261029-12";
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

const STARTING_CONSONANTS = Object.freeze([
  "ch", "tl", "tz", "qu", "cu", "hu", "uh",
  "c", "x", "z", "s", "m", "n", "p", "t", "l", "y", "h",
]);

const ENDING_CONSONANTS = Object.freeze(["uc", ...STARTING_CONSONANTS]);

function cleanPart(value = "") {
  return String(value == null ? "" : value)
    .normalize("NFC")
    .trim()
    .replace(/^\((.*)\)$/u, "$1")
    .replace(/^-|-$/gu, "");
}

function isFinalVocativeParticle(part, index, parts) {
  // §2.7/18.11: the separately selected particle is written joined with
  // exceptional final stress. It is not an accented lexical-stem grapheme.
  return part.role === "vocative-particle" && part.value === "é"
    && index > 0 && index === parts.length - 1
    && !parts[index - 1].joinAfter && !part.joinAfter && !part.supportiveI;
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
    return ["e", "ē", "i", "ī"].includes(following) ? "s" : "k";
  }
  if (spelling === "qu") return "k";
  if (spelling === "cu" || spelling === "uc") return "kw";
  if (spelling === "hu" || spelling === "uh") return "w";
  return normalizeSound(spelling);
}

export function createClassicalNahuatlLesson2WriterApi(targetObject = globalThis) {
  const issuedSources = new WeakSet();
  const issuedResults = new WeakMap();

  function isBoundVocativeParticleProjection(part, index, parts, boundaryKind) {
    const result = part?.particleResultFrame;
    const profile = result?.lexicalFactFrame?.vocativeProfile;
    // A lexical/operator Result does not assert a complete vocative utterance.
    // Only the current particle owner can authorize its exceptional spelling.
    return Boolean(boundaryKind === "typed-particle-vocable"
      && parts.length === 1 && index === 0 && part.role === "particle"
      && !part.joinAfter && !part.supportiveI
      && targetObject.isClassicalNahuatlParticleResultFrame?.(result) === true
      && result.authorizationStatus === "authorized"
      && result.particleId === "l3-e-vocative"
      && result.surface === "é" && part.value === result.surface
      && result.writtenProjection?.sourceFrame === result.sourceFrame
      && result.writtenProjection?.surface === result.surface
      && result.lexicalFactFrame?.invariant === true
      && profile?.attachmentHost === "preceding-nominal-nuclear-clause"
      && profile.writingAttachment === "obligatory"
      && profile.writtenStressAccent === "required-unique-item");
  }

  function issueClassicalNahuatlLesson2WritingSource(specification = {}) {
    const allowedKeys = new Set(["parts", "boundaryKind", "terminal"]);
    const hasForbiddenField = !specification
      || typeof specification !== "object"
      || Reflect.ownKeys(specification).some(key => !allowedKeys.has(String(key)));
    const rawParts = Array.isArray(specification?.parts)
      ? specification.parts
      : [];
    const parts = rawParts.map(part => {
      const joinAfter = String(part?.joinAfter || "");
      return Object.freeze({
        role: String(part?.role || "morph"),
        value: cleanPart(part?.value),
        supportiveI: String(part?.supportiveI || ""),
        ...(part?.particleResultFrame ? { particleResultFrame: part.particleResultFrame } : {}),
        ...(part?.borrowedNncSourceFrame ? { borrowedNncSourceFrame: part.borrowedNncSourceFrame } : {}),
        ...(part?.borrowedNncResultFrame ? { borrowedNncResultFrame: part.borrowedNncResultFrame } : {}),
        ...(part?.completedWrittenResultFrame ? { completedWrittenResultFrame: part.completedWrittenResultFrame } : {}),
        ...(joinAfter ? { joinAfter } : {}),
      });
    });
    const terminal = String(specification?.terminal || "");
    const sentencePunctuation = part => part.role === "sentence-punctuation"
      && specification.boundaryKind === "sentence-and-vocable-sequence"
      && /^[".!?]$/u.test(part.value)
      && !part.supportiveI;
    const quotationBalanced = parts.filter(part => (
      sentencePunctuation(part) && part.value === '"'
    )).length % 2 === 0;
    const separatorsAuthorized = parts.every(part => (
      ["", " ", ", ", "; ", ": "].includes(part.joinAfter || "")
    )) && ["", ".", "!", "?"].includes(terminal);
    const borrowedOrthographyAuthorized = (part, index = -1) => {
      const result = part.borrowedNncResultFrame;
      const source = part.borrowedNncSourceFrame || result?.sourceFrame;
      if (targetObject.isClassicalNahuatlOrdinaryNncSourceFrame?.(source) !== true
        || source.boundaryFacts?.borrowedOrthographyRetained !== true) return false;
      if (part.borrowedNncSourceFrame && part.value === source.stem) return true;
      if (targetObject.isClassicalNahuatlOrdinaryNncResult?.(result) !== true
        || result.sourceFrame !== source) return false;
      if (part.value === result.surfaceRealization) return true;
      return index === 0 && specification.boundaryKind === "sentence-and-vocable-sequence"
        && targetObject.isClassicalNahuatlIssuedNncSentenceSurfaceFrame?.(result.sentenceFrame) === true
        && part.value === capitalizeClassicalNahuatlNncSentenceInitial(result.surfaceRealization);
    };
    const authorized = !hasForbiddenField && quotationBalanced && parts.length > 0 && parts.every((part, index) => (
      part.value
      && (!part.particleResultFrame || isBoundVocativeParticleProjection(
        part, index, parts, specification.boundaryKind))
      && !/[#()]/u.test(part.value)
      && (!/\s/u.test(part.value) || borrowedOrthographyAuthorized(part, index)
        || (isClassicalNahuatlLesson2WrittenResult(part.completedWrittenResultFrame)
          && part.value === part.completedWrittenResultFrame.surface))
      && (!targetObject.getInvalidClassicalNahuatlGraphemes(part.value).length
        || isFinalVocativeParticle(part, index, parts)
        || isBoundVocativeParticleProjection(part, index, parts, specification.boundaryKind)
        || sentencePunctuation(part)
        || borrowedOrthographyAuthorized(part, index)
        || (isClassicalNahuatlLesson2WrittenResult(part.completedWrittenResultFrame)
          && part.value === part.completedWrittenResultFrame.surface))
    )) && separatorsAuthorized;
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
      terminal,
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
      && source.parts.every((part, index) => !part.particleResultFrame
        || isBoundVocativeParticleProjection(part, index, source.parts, source.boundaryKind))
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
      if (source.parts[index]?.joinAfter
        || source.parts[index]?.role === "sentence-punctuation"
        || source.parts[index + 1]?.role === "sentence-punctuation") {
        boundaryActions.push(Object.freeze({
          boundaryIndex: index,
          status: "separate-vocable-boundary",
          sourceLeft: left,
          sourceRight: right,
          resultLeft: left,
          resultRight: right,
          ruleId: "",
        }));
        continue;
      }
      if (/uh$/u.test(left) && /^[aāeēéiīoō]/u.test(right)) {
        // /w/ is written uh at a closed edge, hu before the following vowel.
        // The ordered grammatical boundary supplies the following vowel.
        realizedParts[index] = left.slice(0, -2) + "hu";
        boundaryActions.push(Object.freeze({
          boundaryIndex: index, status: "applied", sourceLeft: left, sourceRight: right,
          resultLeft: realizedParts[index], resultRight: right,
          ruleId: "2.4-w-pre-vowel-hu-writing", outputSound: "w", spellingStyle: "vowel-contact",
        }));
        continue;
      }
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
      let frame = targetObject.buildClassicalNahuatlAssimilationFrame({
        leftConsonant: leftSound,
        rightConsonant: rightSound,
        sourceLeftMorpheme: left,
        sourceRightMorpheme: right,
        grammaticalConstruction: true,
      });
      // Andrews §§2.11.1, 2.11.3 retain source spelling in typed compounds while
      // describing the assimilated pronunciation. Keep the owner's phonetic
      // analysis and select its existing source-preserving writing style.
      if (["typed-nnc-slots", "ordinary-nnc-slots", "typed-ordered-morphemes"].includes(source.boundaryKind)
        && frame?.authorizationStatus === "authorized"
        && ["cn-l2-211-regressive-nasal-sibilant", "cn-l2-211-regressive-w-bilabial",
          "cn-l2-211-regressive-sibilant-group"]
          .includes(frame.selectedRuleId)) {
        frame = targetObject.buildClassicalNahuatlAssimilationFrame({
          leftConsonant: leftSound,
          rightConsonant: rightSound,
          sourceLeftMorpheme: left,
          sourceRightMorpheme: right,
          grammaticalConstruction: true,
          spellingStyle: "source-preserving",
        });
      }
      // These morphs already carry the grammatical owner's selected spelling.
      // Replaying them must not choose an optional or low-frequency dialectal
      // alternative (§2.11). The grammatical owner's selected spelling stays
      // intact; ordinary required boundary rules still apply.
      if (["typed-ordered-morphemes", "typed-nnc-slots", "ordinary-nnc-slots", "typed-relational-nnc-slots"].includes(source.boundaryKind)
        && (frame?.optional === true || frame?.lowFrequency === true)) {
        boundaryActions.push(Object.freeze({
          boundaryIndex: index,
          status: frame.optional === true
            ? "optional-alternative-not-selected"
            : "low-frequency-alternative-not-selected",
          sourceLeft: left,
          sourceRight: right,
          resultLeft: left,
          resultRight: right,
          ruleId: frame.selectedRuleId,
        }));
        continue;
      }
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
        outputSound: frame.outputSound,
        spellingStyle: frame.spellingStyle,
        ruleId: frame.selectedRuleId,
      }));
    }
    // §2.13.2: an underlying /m/ exposed at the vocable edge is written n.
    // Joined morphs have already undergone their ordinary boundary rules;
    // this does not replace the grammatical stem or an internal m before p.
    for (let index = 0; index < realizedParts.length; index += 1) {
      const part = source.parts[index];
      const value = realizedParts[index];
      const borrowedSource = part.borrowedNncSourceFrame || part.borrowedNncResultFrame?.sourceFrame;
      const protectedBorrowed = targetObject.isClassicalNahuatlOrdinaryNncSourceFrame?.(borrowedSource) === true
        && borrowedSource.boundaryFacts?.borrowedOrthographyRetained === true
        && (part.value === borrowedSource.stem
          || (targetObject.isClassicalNahuatlOrdinaryNncResult?.(part.borrowedNncResultFrame) === true
            && part.borrowedNncResultFrame.sourceFrame === borrowedSource
            && (part.value === part.borrowedNncResultFrame.surfaceRealization
              || (index === 0 && source.boundaryKind === "sentence-and-vocable-sequence"
                && part.value === capitalizeClassicalNahuatlNncSentenceInitial(
                  part.borrowedNncResultFrame.surfaceRealization)))));
      const protectedCompleted = isClassicalNahuatlLesson2WrittenResult(part.completedWrittenResultFrame)
        && part.value === part.completedWrittenResultFrame.surface;
      const exposed = index === realizedParts.length - 1 || Boolean(part.joinAfter)
        || source.parts[index + 1]?.role === "sentence-punctuation";
      if (!exposed || !/m$/u.test(value) || protectedBorrowed || protectedCompleted
        || part.role === "sentence-punctuation") continue;
      const frame = targetObject.buildClassicalNahuatlConsonantPhoneShiftFrame?.({
        sourceConsonant: "m", position: "vocable-final", grammaticalConstruction: true,
      });
      if (targetObject.isClassicalNahuatlTranscriptionAnalysisFrame?.(frame) !== true
        || frame.authorizationStatus !== "authorized"
        || frame.selectedRuleId !== "cn-l2-213-m-exposed-n") continue;
      realizedParts[index] = value.slice(0, -1) + frame.outputSpelling;
      boundaryActions.push(Object.freeze({
        boundaryIndex: index, status: "applied", sourceLeft: value,
        sourceRight: realizedParts[index + 1] || "", resultLeft: realizedParts[index],
        resultRight: realizedParts[index + 1] || "", ruleId: frame.selectedRuleId,
        outputSound: frame.outputSound, spellingStyle: "exposed-vocable-edge",
      }));
    }
    const appliedRuleIds = boundaryActions
      .filter(action => action.status === "applied" && action.ruleId)
      .map(action => action.ruleId);
    const boundVocativeParticle = isBoundVocativeParticleProjection(
      source.parts[0], 0, source.parts, source.boundaryKind,
    );
    const vocativeStressAction = (boundVocativeParticle || isFinalVocativeParticle(
      source.parts.at(-1), source.parts.length - 1, source.parts,
    )) ? Object.freeze({
        partIndex: source.parts.length - 1, status: "applied",
        ruleId: "2.7-vocative-exceptional-stress", writtenParticle: "é",
        stressPosition: boundVocativeParticle ? "bound-particle-projection" : "final-vocative-particle", highPitch: true,
      }) : null;
    const ownedFamilyIds = new Set([
      "sound-and-spelling",
      "internal-stem-boundaries",
      ...(vocativeStressAction ? ["stress"] : []),
      ...(supportiveVowelActions.length
        ? ["syllables-and-supportive-i"]
        : []),
      ...(appliedRuleIds.some(ruleId => ruleId.includes("-210-"))
        ? ["progressive-assimilation"]
        : []),
      ...(appliedRuleIds.some(ruleId => ruleId.includes("-211-"))
        ? ["regressive-assimilation-and-dissimilation"]
        : []),
      ...(appliedRuleIds.some(ruleId => ruleId.includes("-213-"))
        ? ["other-consonant-changes"] : []),
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
    const surface = realizedParts.map((part, index) => (
      `${part}${source.parts[index]?.joinAfter || ""}`
    )).join("") + source.terminal;
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
      vocativeStressAction,
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
      && isClassicalNahuatlLesson2WritingSource(result.source)
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
