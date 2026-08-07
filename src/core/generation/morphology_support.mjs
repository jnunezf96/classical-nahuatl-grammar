// Canonical modern ESM module.

export function createMorphologySupportModule(targetObject = globalThis) {
    // core/generation/morphology_support.js
    // Shared morphology support helpers used across parsing, derivation, generation,
    // output, and preterit context.
    // Global-scope module: all functions defined directly on the global object.
    // Deps (resolved at call time via global scope from script.js / other modules):
    //   TENSE_SUFFIX_RULES, SPECIFIC_VALENCE_PREFIX_SET, NONSPECIFIC_VALENCE_AFFIX_SET
    //   DEFAULT_PATIENTIVO_OWNERSHIP
    //   composeObj1Chain, normalizeValenceMarkerOrder
    //   getTotalVowelCountFromSyllables, getSyllables (phonology.js)

    function normalizeMorphologySupportTenseValue(tenseValue = "") {
      return String(tenseValue || "").trim();
    }
    function applyTenseSuffixRules(tense, pers2) {
      tense = normalizeMorphologySupportTenseValue(tense);
      if (tense === "preterito") {
        return pers2;
      }
      const rules = targetObject.TENSE_SUFFIX_RULES[tense];
      if (!rules || rules[pers2] === undefined) {
        return pers2;
      }
      return rules[pers2];
    }
    const AGENTIVO_NUMBER_SUFFIX_BY_SLOT = {
      "": "",
      t: "meh",
      p: "huān"
    };
    function getAgentivoNumberSuffix(slot = "") {
      return Object.prototype.hasOwnProperty.call(AGENTIVO_NUMBER_SUFFIX_BY_SLOT, slot) ? AGENTIVO_NUMBER_SUFFIX_BY_SLOT[slot] : "";
    }
    function applyAgentivoNumberSuffix(habitualSuffix, slot = "") {
      const base = typeof habitualSuffix === "string" ? habitualSuffix : "";
      return `${base}${getAgentivoNumberSuffix(slot)}`;
    }
    function applyPatientivoAdjectiveNumberSuffix(slot = "") {
      return slot === "t" ? "meh" : "tli";
    }
    function isHualThirdPersonMarker(value = "") {
      return value === "c" || value === "qu" || value === "qui" || value === "quim" || value === "quin";
    }
    function buildDirectionalMarkerChain({
      obj1Base = "",
      obj2 = "",
      obj3 = "",
      pers1 = ""
    }) {
      return targetObject.composeObj1Chain({
        obj1: obj1Base,
        markers: [obj2 || "", obj3 || ""],
        pers1
      });
    }
    function buildHualDirectionalPlan({
      directionalOutputPrefix = "",
      pers1Base = "",
      obj1Base = "",
      obj2 = "",
      obj3 = "",
      directionalRuleMode = "",
      hasSubjectValent = true,
      isTlaFusion = false,
      isIntransitiveVerb = false
    } = {}) {
      const normalizedDirectionalOutputPrefix = String(directionalOutputPrefix || "huāl");
      const normalizedPers1 = String(pers1Base || "");
      const normalizedObj1Base = String(obj1Base || "");
      const normalizedObj2 = String(obj2 || "");
      const normalizedObj3 = String(obj3 || "");
      const normalizedDirectionalRuleMode = String(directionalRuleMode || "");
      const hasRuntimeSecondValent = Boolean(normalizedObj1Base || normalizedObj2 || normalizedObj3 || isTlaFusion);
      const hasRuntimeSpecificObject = [normalizedObj1Base, normalizedObj2, normalizedObj3].some(value => targetObject.SPECIFIC_VALENCE_PREFIX_SET.has(value));
      const effectiveDirectionalRuleMode = normalizedDirectionalRuleMode === "intransitive" && hasRuntimeSecondValent || normalizedDirectionalRuleMode === "nonspecific" && hasRuntimeSpecificObject ? "" : normalizedDirectionalRuleMode;
      const forceIntransitiveDirectional = effectiveDirectionalRuleMode === "intransitive";
      const forceNonspecificDirectional = effectiveDirectionalRuleMode === "nonspecific";
      const placeAfterSpecificProjectiveObject = hasRuntimeSpecificObject && !forceIntransitiveDirectional && !forceNonspecificDirectional;
      return {
        handler: "huāl",
        placeAfterSpecificProjectiveObject,
        directionalOutputPrefix: normalizedDirectionalOutputPrefix,
        effectiveDirectionalRuleMode
      };
    }
    function buildDirectionalSoundSpellingFrame(frameInput = {}, beforeValue = "", afterValue = "", role = "") {
      if (typeof targetObject.buildSoundSpellingFrame !== "function") {
        return null;
      }
      const frame = targetObject.buildSoundSpellingFrame(frameInput);
      if (!frame || !frame.ruleId) {
        return null;
      }
      const normalizedRole = String(role || frame.grammarSlot || "");
      return {
        ...frame,
        segmentRole: normalizedRole,
        sourceSegmentValue: String(beforeValue || ""),
        targetSegmentValue: String(afterValue || "")
      };
    }
    function pushDirectionalLesson2SoundSpellingFrame(frames = [], frameInput = {}, beforeValue = "", afterValue = "", role = "") {
      if (!Array.isArray(frames)) {
        return;
      }
      const frame = buildDirectionalSoundSpellingFrame(frameInput, beforeValue, afterValue, role);
      if (!frame) {
        return;
      }
      const key = [frame.ruleId || "", frame.grammarSlot || "", frame.syllablePosition || "", frame.sourceSurface || "", frame.target || "", Array.isArray(frame.targetCandidates) ? frame.targetCandidates.join("/") : "", frame.segmentRole || "", frame.sourceSegmentValue || "", frame.targetSegmentValue || ""].join(":");
      if (key && frames.some(entry => [entry.ruleId || "", entry.grammarSlot || "", entry.syllablePosition || "", entry.sourceSurface || "", entry.target || "", Array.isArray(entry.targetCandidates) ? entry.targetCandidates.join("/") : "", entry.segmentRole || "", entry.sourceSegmentValue || "", entry.targetSegmentValue || ""].join(":") === key)) {
        return;
      }
      frames.push(frame);
    }
    function realizeHualDirectionalChain({
      pers1 = "",
      obj1 = "",
      tronco = "",
      directionalChainMeta = null
    }) {
      const meta = directionalChainMeta && typeof directionalChainMeta === "object" ? directionalChainMeta : null;
      if (!meta || meta.directionalInputPrefix !== "huāl") {
        return {
          pers1,
          obj1,
          tronco
        };
      }
      const basePers1 = String(meta.pers1Base || meta.baseSubjectPrefix || pers1 || "");
      const baseObj1 = String(meta.obj1Base || meta.baseObjectPrefix || "");
      const baseObj2 = String(meta.obj2 || meta.indirectObjectMarker || "");
      const baseObj3 = String(meta.obj3 || meta.thirdObjectMarker || "");
      const directionalRuleMode = String(meta.directionalRuleMode || "");
      const directionalInputPrefix = String(meta.directionalInputPrefix || "huāl");
      const isIntransitiveVerb = meta.isIntransitiveVerb === true;
      const hasSubjectValent = meta.hasSubjectValent !== false;
      const isTlaFusion = meta.isTlaFusion === true;
      const directionalPlan = meta.directionalPlan && typeof meta.directionalPlan === "object" ? meta.directionalPlan : buildHualDirectionalPlan({
        directionalOutputPrefix: meta.directionalOutputPrefix || directionalInputPrefix,
        pers1Base: basePers1,
        obj1Base: baseObj1,
        obj2: baseObj2,
        obj3: baseObj3,
        directionalRuleMode,
        hasSubjectValent,
        isTlaFusion,
        isIntransitiveVerb
      });
      const directionalOutputPrefix = String(directionalPlan.directionalOutputPrefix || meta.directionalOutputPrefix || directionalInputPrefix || "huāl");
      let realizedPers1 = String(pers1 || "");
      let realizedTronco = String(tronco || "");
      const soundSpellingFrames = [];
      if (realizedTronco.startsWith(directionalInputPrefix)) {
        realizedTronco = realizedTronco.slice(directionalInputPrefix.length);
      }
      const markerChain = buildDirectionalMarkerChain({
        obj1Base: baseObj1,
        obj2: baseObj2,
        obj3: baseObj3,
        pers1: basePers1
      });
      const directionFollowsObject = directionalPlan.placeAfterSpecificProjectiveObject === true;
      let realizedObj1 = directionFollowsObject ? `${markerChain}${directionalOutputPrefix}` : `${directionalOutputPrefix}${markerChain}`;
      if (directionFollowsObject && (markerChain.endsWith("mitz") || markerChain.endsWith("tēch"))) {
        const reducedDirectional = `${markerChain}āl`;
        pushDirectionalLesson2SoundSpellingFrame(soundSpellingFrames, {
          ruleId: markerChain.endsWith("mitz") ? "cn-l2-212-tz-hu-consonant-loss" : "cn-l2-212-ch-hu-consonant-loss",
          source: realizedObj1,
          target: reducedDirectional,
          slot: "directional-prefix",
          syllablePosition: "after-specific-object"
        }, realizedObj1, reducedDirectional, "directional-prefix");
        realizedObj1 = reducedDirectional;
      }
      if (realizedObj1.endsWith("i") && realizedTronco.startsWith("i")) {
        const beforeTronco = realizedTronco;
        realizedTronco = realizedTronco.slice(1);
        pushDirectionalLesson2SoundSpellingFrame(soundSpellingFrames, {
          ruleId: "object-i-stem-i-elision",
          source: "i",
          target: "",
          slot: "stem-initial",
          syllablePosition: "after-i-object"
        }, beforeTronco, realizedTronco, "tronco");
      }
      return {
        pers1: realizedPers1,
        obj1: targetObject.normalizeValenceMarkerOrder(realizedObj1),
        tronco: realizedTronco,
        soundSpellingFrames
      };
    }
    function realizeRegularDirectionalChain({
      pers1 = "",
      obj1 = "",
      tronco = "",
      directionalChainMeta = null
    }) {
      const meta = directionalChainMeta && typeof directionalChainMeta === "object" ? directionalChainMeta : null;
      const directionalInputPrefix = String(meta?.directionalInputPrefix || "");
      const directionalOutputPrefix = String(meta?.directionalOutputPrefix || directionalInputPrefix || "");
      if (!directionalInputPrefix || !directionalOutputPrefix) {
        return {
          pers1,
          obj1,
          tronco,
          soundSpellingFrames: []
        };
      }
      const basePers1 = String(meta.pers1Base || meta.baseSubjectPrefix || pers1 || "");
      const baseObj1 = String(meta.obj1Base || meta.baseObjectPrefix || obj1 || "");
      const baseObj2 = String(meta.obj2 || meta.indirectObjectMarker || "");
      const baseObj3 = String(meta.obj3 || meta.thirdObjectMarker || "");
      const soundSpellingFrames = [];
      let realizedPers1 = String(pers1 || "");
      let realizedTronco = String(tronco || "");
      if (realizedTronco.startsWith(directionalInputPrefix)) {
        realizedTronco = realizedTronco.slice(directionalInputPrefix.length);
      }
      if (/^[aeiu]/.test(directionalOutputPrefix)) {
        if (basePers1 === "ni" || basePers1 === "n") {
          if (realizedPers1 !== "n") {
            pushDirectionalLesson2SoundSpellingFrame(soundSpellingFrames, {
              ruleId: "pers1-ni-before-vowel-n",
              source: realizedPers1 || "ni",
              target: "n",
              slot: "pers1",
              syllablePosition: "pers1-obj1-boundary"
            }, realizedPers1 || "ni", "n", "pers1");
          }
          realizedPers1 = "n";
        } else if (basePers1 === "ti" || basePers1 === "t") {
          if (realizedPers1 !== "t") {
            pushDirectionalLesson2SoundSpellingFrame(soundSpellingFrames, {
              ruleId: "pers1-ti-before-vowel-t",
              source: realizedPers1 || "ti",
              target: "t",
              slot: "pers1",
              syllablePosition: "pers1-obj1-boundary"
            }, realizedPers1 || "ti", "t", "pers1");
          }
          realizedPers1 = "t";
        }
      }
      const markerChain = buildDirectionalMarkerChain({
        obj1Base: baseObj1,
        obj2: baseObj2,
        obj3: baseObj3,
        pers1: basePers1
      });
      return {
        pers1: realizedPers1,
        obj1: targetObject.normalizeValenceMarkerOrder(`${directionalOutputPrefix}${markerChain}`),
        tronco: realizedTronco,
        soundSpellingFrames
      };
    }
    function resolveDirectionalOutputChain({
      pers1 = "",
      obj1 = "",
      tronco = "",
      directionalChainMeta = null
    }) {
      const meta = directionalChainMeta && typeof directionalChainMeta === "object" ? directionalChainMeta : null;
      if (!meta || !meta.directionalInputPrefix || meta.isNounTense === true) {
        return {
          pers1,
          obj1,
          tronco
        };
      }
      if (meta.directionalInputPrefix === "huāl") {
        const realized = realizeHualDirectionalChain({
          pers1,
          obj1,
          tronco,
          directionalChainMeta: meta
        });
        return {
          pers1: realized.pers1,
          obj1: realized.obj1,
          tronco: realized.tronco,
          soundSpellingFrames: Array.isArray(realized.soundSpellingFrames) ? realized.soundSpellingFrames : []
        };
      }
      return realizeRegularDirectionalChain({
        pers1,
        obj1,
        tronco,
        directionalChainMeta: meta
      });
    }
    function adjustPatientivoPossessiveSuffix(suffix, isPossessed, ownershipType = targetObject.DEFAULT_PATIENTIVO_OWNERSHIP, options = {}) {
      if (!isPossessed) {
        return suffix || "";
      }
      const normalizedSuffix = suffix || "";
      const useOrganic = ownershipType === "yo";
      const useZero = ownershipType === "zero";
      const stem = typeof options.stem === "string" ? options.stem : "";
      if (!normalizedSuffix) {
        if (useOrganic && stem.endsWith("l")) {
          return "yo";
        }
        if (useZero) {
          return "";
        }
        return null;
      }
      if (normalizedSuffix.endsWith("meh")) {
        const base = normalizedSuffix.slice(0, -3);
        return useOrganic ? `${base}yohuān` : `${base}huān`;
      }
      if (normalizedSuffix.endsWith("huān")) {
        const base = normalizedSuffix.slice(0, -4);
        return useOrganic ? `${base}yohuān` : normalizedSuffix;
      }
      if (normalizedSuffix === "tli") {
        if (useOrganic) {
          return "yo";
        }
        if (useZero) {
          return "";
        }
        return stem && !/[aeiu]$/.test(stem) ? "" : null;
      }
      if (normalizedSuffix === "in") {
        if (useOrganic) {
          return "yo";
        }
        if (useZero) {
          return "";
        }
        return stem && !/[aeiouāēīō]$/u.test(stem) ? "" : "hu";
      }
      if (normalizedSuffix === "tl") {
        if (useOrganic) {
          return "yo";
        }
        if (useZero) {
          return "";
        }
        return stem && !/[aeiouāēīō]$/u.test(stem) ? "" : "hu";
      }
      return normalizedSuffix;
    }
    function startsWithAny(value, prefixes) {
      return prefixes.some(prefix => value.startsWith(prefix));
    }
    function getTotalVowelCount(verb) {
      return targetObject.getTotalVowelCountFromSyllables(targetObject.getSyllables(verb));
    }

    const api = {};
    api.normalizeMorphologySupportTenseValue = normalizeMorphologySupportTenseValue;
    api.applyTenseSuffixRules = applyTenseSuffixRules;
    Object.defineProperty(api, "AGENTIVO_NUMBER_SUFFIX_BY_SLOT", {
        configurable: true,
        enumerable: true,
        get() { return AGENTIVO_NUMBER_SUFFIX_BY_SLOT; },
    });
    api.getAgentivoNumberSuffix = getAgentivoNumberSuffix;
    api.applyAgentivoNumberSuffix = applyAgentivoNumberSuffix;
    api.applyPatientivoAdjectiveNumberSuffix = applyPatientivoAdjectiveNumberSuffix;
    api.isHualThirdPersonMarker = isHualThirdPersonMarker;
    api.buildDirectionalMarkerChain = buildDirectionalMarkerChain;
    api.buildHualDirectionalPlan = buildHualDirectionalPlan;
    api.buildDirectionalSoundSpellingFrame = buildDirectionalSoundSpellingFrame;
    api.pushDirectionalLesson2SoundSpellingFrame = pushDirectionalLesson2SoundSpellingFrame;
    api.realizeHualDirectionalChain = realizeHualDirectionalChain;
    api.realizeRegularDirectionalChain = realizeRegularDirectionalChain;
    api.resolveDirectionalOutputChain = resolveDirectionalOutputChain;
    api.adjustPatientivoPossessiveSuffix = adjustPatientivoPossessiveSuffix;
    api.startsWithAny = startsWithAny;
    api.getTotalVowelCount = getTotalVowelCount;
    return api;
}

export function installMorphologySupportGlobals(targetObject = globalThis) {
    const api = createMorphologySupportModule(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
