// Canonical modern ESM module.

export function createParsingApi(targetObject = globalThis, installationContext = null) {
    const grammarFrameOwnerCapability = installationContext?.grammarFrameOwnerCapability || null;
    const CLASSICAL_DIRECTIONAL_PREFIXES = Object.freeze(["huāl", "on"]);
    function normalizeMovingTargetCoreText(value = "") {
      const placeholderProtected = targetObject.convertRegexInputSupportiveMarkersToEnvelope(String(value || ""));
      return normalizeRegexSpecialSerialShorthandCore(restoreBracketSupportiveMarkers(placeholderProtected.replace(/\//g, "-").toLowerCase()));
    }
    function getCurrentRegexRuntimeTarget() {
      return typeof targetObject !== "undefined" && targetObject || (typeof globalThis !== "undefined" ? globalThis : null);
    }
    function isClassicalNahuatlCurrentRegexBoundaryContext(value = "", options = {}) {
      if (options.classicalNahuatl === true || options.classical === true) {
        return true;
      }
      const runtimeTarget = getCurrentRegexRuntimeTarget();
      return typeof runtimeTarget?.isClassicalNahuatlPublicRuntime === "function"
        ? runtimeTarget.isClassicalNahuatlPublicRuntime()
        : false;
    }
    function getMovingTargetOuterPieceDescriptors(semantic = {}) {
      const pieces = [];
      const addLexicalEmbedPieces = (embed = "") => {
        targetObject.getComposerEmbedTokens(embed).forEach(token => {
          const normalized = targetObject.normalizeComposerStem(token);
          if (normalized) {
            pieces.push({
              type: "lexical",
              value: normalized
            });
          }
        });
      };
      const addValencePiece = (token = "") => {
        const normalized = normalizeEntradaGrammarValenceSurfaceToken(token);
        if (normalized) {
          pieces.push({
            type: "valence",
            value: normalized
          });
        }
      };
      const directionalPrefix = targetObject.normalizeComposerStem(semantic?.directional?.prefix || "");
      if (directionalPrefix) {
        pieces.push({
          type: "directional",
          value: directionalPrefix
        });
      }
      const transitivity = semantic?.transitivity || targetObject.COMPOSER_TRANSITIVITY.intransitive;
      if (transitivity === targetObject.COMPOSER_TRANSITIVITY.intransitive) {
        addLexicalEmbedPieces(semantic?.valence?.intransitive?.embed || "");
        addValencePiece(semantic?.valence?.intransitive?.token || "");
        return pieces;
      }
      if (transitivity === targetObject.COMPOSER_TRANSITIVITY.transitive) {
        addLexicalEmbedPieces(semantic?.valence?.primary?.embed || "");
        addValencePiece(semantic?.valence?.primary?.token || "");
        return pieces;
      }
      addLexicalEmbedPieces(semantic?.valence?.secondary?.embed || semantic?.valence?.primary?.embed || "");
      const secondaryPair = targetObject.parseComposerSecondaryValenceSelection(semantic?.valence?.secondary?.raw || "");
      let firstToken = secondaryPair.first || semantic?.valence?.primary?.token || "";
      let secondToken = secondaryPair.second || semantic?.valence?.secondary?.token || "";
      addValencePiece(firstToken);
      addValencePiece(secondToken);
      return pieces;
    }
    function formatMovingTargetOuterPiece(piece = null) {
      if (!piece || !piece.value) {
        return "";
      }
      return piece.type === "lexical" ? `(${piece.value})` : piece.value;
    }
    function buildMovingTargetRegexFromCoreAndPieces({
      transitivity = targetObject.COMPOSER_TRANSITIVITY.intransitive,
      coreText = "",
      outerPieces = []
    } = {}) {
      const normalizedCore = normalizeMovingTargetCoreText(coreText);
      if (!normalizedCore) {
        return "";
      }
      const normalizedPieces = (Array.isArray(outerPieces) ? outerPieces : []).map(piece => formatMovingTargetOuterPiece(piece)).filter(Boolean);
      const isPlaceholderCore = /^_+[a-z0-9]*$/i.test(normalizedCore);
      if (!normalizedPieces.length && isPlaceholderCore) {
        if (transitivity === targetObject.COMPOSER_TRANSITIVITY.intransitive) {
          return normalizedCore;
        }
        return `-${normalizedCore}`;
      }
      const wrappedCore = `(${normalizedCore})`;
      if (transitivity === targetObject.COMPOSER_TRANSITIVITY.intransitive) {
        return normalizedPieces.length ? `${normalizedPieces.join("+")}+${wrappedCore}` : wrappedCore;
      }
      const transitiveCore = `-${wrappedCore}`;
      return normalizedPieces.length ? `${normalizedPieces.join("+")}${transitiveCore}` : transitiveCore;
    }
    function stripPrefixOnce(value = "", prefix = "") {
      const source = String(value || "");
      const matchPrefix = String(prefix || "");
      return source.startsWith(matchPrefix) ? source.slice(matchPrefix.length) : source;
    }
    function getComposerDisplayExternalValenceSegments(semantic = {}) {
      const transitivity = semantic?.transitivity || targetObject.COMPOSER_TRANSITIVITY.intransitive;
      const toSurface = (token = "") => normalizeEntradaGrammarValenceSurfaceToken(token);
      if (transitivity === targetObject.COMPOSER_TRANSITIVITY.intransitive) {
        const token = toSurface(semantic?.valence?.intransitive?.token || "");
        return token ? [token] : [];
      }
      if (transitivity === targetObject.COMPOSER_TRANSITIVITY.transitive) {
        const token = toSurface(semantic?.valence?.primary?.token || "");
        return token ? [token] : [];
      }
      const secondaryPair = targetObject.parseComposerSecondaryValenceSelection(semantic?.valence?.secondary?.raw || "");
      let slotOneValue = toSurface(secondaryPair.first || "");
      let slotTwoValue = toSurface(secondaryPair.second || "");
      if (!slotOneValue && !slotTwoValue) {
        slotOneValue = toSurface(semantic?.valence?.primary?.token || "");
        slotTwoValue = toSurface(semantic?.valence?.secondary?.token || "");
      }
      return [slotOneValue, slotTwoValue].filter(Boolean);
    }
    function stripLeadingComposerDisplaySegments(screenCore = "", targetSegments = []) {
      const parts = String(screenCore || "").split("-").map(part => String(part || "").trim()).filter(Boolean);
      const removed = [];
      let index = 0;
      const normalizedTargets = (Array.isArray(targetSegments) ? targetSegments : []).map(segment => String(segment || "").trim().toLowerCase()).filter(Boolean);
      while (index < normalizedTargets.length && removed.length < Math.max(0, parts.length - 1) && parts[removed.length] && parts[removed.length].toLowerCase() === normalizedTargets[index]) {
        removed.push(parts[removed.length]);
        index += 1;
      }
      return {
        removed,
        remaining: parts.slice(removed.length).join("-")
      };
    }
    function buildComposerDisplayVerbFromEnvelope(dashPrefix = "", coreText = "", options = {}) {
      const normalizedDashPrefix = String(dashPrefix || "").startsWith("--") ? "--" : String(dashPrefix || "").startsWith("-") ? "-" : "";
      let workingCore = String(coreText || "").trim();
      if (!workingCore) {
        return normalizedDashPrefix;
      }
      const semantic = options.semantic && typeof options.semantic === "object" ? options.semantic : null;
      const semanticTransitivity = String(semantic?.transitivity || "");
      const composerCoreDashPrefix = semanticTransitivity === targetObject.COMPOSER_TRANSITIVITY.transitive || semanticTransitivity === targetObject.COMPOSER_TRANSITIVITY.bitransitive ? "-" : normalizedDashPrefix;
      let directionalPrefix = "";
      const semanticDirectional = String(semantic?.directional?.prefix || "").trim().toLowerCase();
      const directionalMatch = workingCore.match(/^\[([a-z]+)\]\//i);
      if (semanticDirectional && workingCore.startsWith(`[${semanticDirectional}]/`)) {
        directionalPrefix = semanticDirectional;
        workingCore = workingCore.slice(semanticDirectional.length + 3);
      } else if (directionalMatch && isDirectionalPrefixToken(directionalMatch[1] || "")) {
        directionalPrefix = String(directionalMatch[1] || "").toLowerCase();
        workingCore = workingCore.slice(directionalMatch[0].length);
      }
      const screenCore = normalizeComposerScreenCoreValue(workingCore, options);
      const semanticExternalSegments = semantic ? getComposerDisplayExternalValenceSegments(semantic) : [];
      const stripped = stripLeadingComposerDisplaySegments(screenCore, semanticExternalSegments);
      let outsideSegments = [];
      if (directionalPrefix) {
        outsideSegments.push(directionalPrefix);
      }
      if (stripped.removed.length) {
        outsideSegments.push(...stripped.removed);
      }
      if (!outsideSegments.length) {
        let externalMarker = "";
        const externalMarkerMatch = workingCore.match(/^((?:TA|TE|MU|T|M))-(.+)$/);
        if (externalMarkerMatch) {
          externalMarker = String(externalMarkerMatch[1] || "").toLowerCase();
          workingCore = String(externalMarkerMatch[2] || "");
        }
        if (!directionalPrefix && !externalMarker) {
          return buildRegexDisplayVerb(composerCoreDashPrefix, screenCore);
        }
        const fallbackOutsideSegments = [];
        if (directionalPrefix) {
          fallbackOutsideSegments.push(directionalPrefix);
        }
        if (externalMarker) {
          fallbackOutsideSegments.push(externalMarker);
        }
        const fallbackWrappedCore = buildRegexDisplayVerb(composerCoreDashPrefix, normalizeComposerScreenCoreValue(workingCore, options));
        return `${fallbackOutsideSegments.join("+")}${fallbackWrappedCore}`;
      }
      const remainingCore = stripped.remaining || screenCore;
      if (!remainingCore) {
        return buildRegexDisplayVerb(composerCoreDashPrefix, screenCore);
      }
      const outsideText = outsideSegments.join("+");
      const wrappedCore = buildRegexDisplayVerb(composerCoreDashPrefix, remainingCore);
      return `${outsideText}${wrappedCore}`;
    }
    function buildComposerDisplayVerbFromMovingTargetParts(parsed = null, options = {}) {
      if (!parsed || parsed.isValid !== true) {
        return "";
      }
      const transitivity = parsed.transitivity || targetObject.COMPOSER_TRANSITIVITY.intransitive;
      const dashPrefix = transitivity === targetObject.COMPOSER_TRANSITIVITY.transitive || transitivity === targetObject.COMPOSER_TRANSITIVITY.bitransitive ? "-" : "";
      const outsidePieces = (Array.isArray(parsed.outerPieces) ? parsed.outerPieces : []).map(piece => formatComposerDisplayMovingTargetPiece(piece, options)).filter(Boolean);
      const screenCore = normalizeComposerScreenCoreValue(parsed.coreText || "", options);
      const wrappedCore = buildRegexDisplayVerb(dashPrefix, screenCore);
      if (!outsidePieces.length) {
        return wrappedCore;
      }
      return `${outsidePieces.join("+")}${wrappedCore}`;
    }
    function serializeRegexInputValue(rawValue = "") {
      const raw = String(rawValue || "").trim();
      if (!raw) {
        return "";
      }
      const shorthandDisplayValue = serializeRegexSpecialSerialShorthandValue(raw);
      if (shorthandDisplayValue) {
        return shorthandDisplayValue;
      }
      const operationFrame = buildCurrentRegexParseOperationFrameFromRawInput(raw);
      const typedValue = serializeRegexInputValueFromOperationFrame(raw, operationFrame);
      if (typedValue) {
        return serializeRegexSpecialSerialShorthandValue(typedValue) || typedValue;
      }
      return raw;
    }
    function findFinalTopLevelWrappedCore(rawValue = "") {
      const raw = String(rawValue || "").trim();
      if (!raw.endsWith(")")) {
        return null;
      }
      let depth = 0;
      let startIndex = -1;
      for (let index = raw.length - 1; index >= 0; index -= 1) {
        const char = raw[index];
        if (char === ")") {
          depth += 1;
        } else if (char === "(") {
          depth -= 1;
          if (depth === 0) {
            startIndex = index;
            break;
          }
          if (depth < 0) {
            return null;
          }
        }
      }
      if (startIndex < 0) {
        return null;
      }
      return {
        startIndex,
        coreText: raw.slice(startIndex + 1, -1),
        prefix: raw.slice(0, startIndex)
      };
    }
    function splitTopLevelByPlus(rawValue = "") {
      const raw = String(rawValue || "");
      const parts = [];
      let depth = 0;
      let current = "";
      for (let index = 0; index < raw.length; index += 1) {
        const char = raw[index];
        if (char === "(") {
          depth += 1;
          current += char;
          continue;
        }
        if (char === ")") {
          depth -= 1;
          if (depth < 0) {
            return null;
          }
          current += char;
          continue;
        }
        if (char === "+" && depth === 0) {
          if (!current.trim()) {
            return null;
          }
          parts.push(current.trim());
          current = "";
          continue;
        }
        current += char;
      }
      if (depth !== 0 || !current.trim()) {
        return null;
      }
      parts.push(current.trim());
      return parts;
    }
    function parseMovingTargetOuterPiece(rawPiece = "") {
      const raw = String(rawPiece || "").trim();
      if (!raw) {
        return null;
      }
      const lexicalMatch = raw.match(/^\(([^()]+)\)$/);
      if (lexicalMatch) {
        return {
          type: "lexical",
          value: targetObject.normalizeComposerStem(lexicalMatch[1] || "")
        };
      }
      const normalized = targetObject.normalizeComposerStem(raw);
      if (!normalized) {
        return null;
      }
      if (isDirectionalPrefixToken(normalized)) {
        return {
          type: "directional",
          value: normalized
        };
      }
      if (targetObject.getComposerValenceFamilyToken(normalized)) {
        return {
          type: "valence",
          value: normalized
        };
      }
      return null;
    }
    function buildEmbeddedSlashObjectSlotSourceFrame(rawValue = "", currentRegexParseOperationFrame = null, spec = null) {
      const raw = String(rawValue || "").trim();
      const parseFrameMismatch = getCurrentRegexParseOperationMismatch(raw, currentRegexParseOperationFrame);
      const parsed = parseFrameMismatch ? null : buildMovingTargetParsedFromCurrentRegexParseOperationFrame(currentRegexParseOperationFrame);
      const sourceCoreText = String(parsed?.originalCoreText || parsed?.coreText || "").trim();
      const transitivity = parsed?.transitivity || spec?.transitivity || "";
      let blockReason = "";
      if (!raw) {
        blockReason = "empty-source";
      } else if (parseFrameMismatch) {
        blockReason = parseFrameMismatch;
      } else if (!parsed || parsed.isValid !== true) {
        blockReason = "missing-current-regex-parse-target-frame";
      } else if (transitivity === targetObject.COMPOSER_TRANSITIVITY.intransitive) {
        blockReason = "intransitive-source";
      } else if (!sourceCoreText || !sourceCoreText.includes("/")) {
        blockReason = "missing-slash-boundary";
      }
      const slashIndex = !blockReason ? sourceCoreText.indexOf("/") : -1;
      const left = slashIndex >= 0 ? String(sourceCoreText.slice(0, slashIndex) || "").trim().toLowerCase() : "";
      const right = slashIndex >= 0 ? String(sourceCoreText.slice(slashIndex + 1) || "").trim().toLowerCase() : "";
      if (!blockReason && (slashIndex <= 0 || slashIndex === sourceCoreText.length - 1 || !left || !right)) {
        blockReason = "incomplete-slash-boundary";
      } else if (!blockReason && (left.startsWith("[i]") || left.startsWith("[y]"))) {
        blockReason = "supportive-left-boundary";
      } else if (!blockReason && getBracketDirectionalPrefixToken(left)) {
        blockReason = "directional-left-boundary";
      } else if (!blockReason && targetObject.getComposerValenceFamilyToken(left)) {
        blockReason = "valence-left-boundary";
      } else if (!blockReason && targetObject.REGEX_ENVELOPE_OBJECT_MARKERS.includes(left.toUpperCase())) {
        blockReason = "object-marker-left-boundary";
      }
      const normalizedEmbed = targetObject.normalizeRuleBase(left);
      const normalizedMatrix = targetObject.normalizeRuleBase(right);
      const specAdjacentEmbed = targetObject.normalizeRuleBase(spec?.adjacentEmbed || "");
      if (!blockReason && specAdjacentEmbed && specAdjacentEmbed !== normalizedEmbed) {
        blockReason = "contradictory-adjacent-embed";
      }
      const supported = !blockReason;
      return {
        kind: "embedded-slash-object-slot-source-frame",
        version: 1,
        sourceLayer: "original-current-regex-core-boundary",
        routeOperation: "embedded-slash-object-slot-count",
        sourceRawInput: raw,
        currentRegexParseOperationFrame,
        currentRegexParseTargetSignature: currentRegexParseOperationFrame?.targetSignature || "",
        sourceCoreText,
        normalizedCoreText: String(parsed?.coreText || ""),
        transitivity,
        slashBoundary: {
          kind: "adjacent-core-embed-slash-boundary",
          left: normalizedEmbed,
          right: normalizedMatrix,
          sourceLeft: left,
          sourceRight: right
        },
        sourceTokenStream: [...(normalizedEmbed ? [{
          role: "adjacent-core-embed",
          value: normalizedEmbed,
          sourceLayer: "original-current-regex-core-boundary",
          ownsObjectSlot: supported
        }] : []), ...(normalizedMatrix ? [{
          role: "matrix",
          value: normalizedMatrix,
          sourceLayer: "original-current-regex-core-boundary",
          ownsObjectSlot: false
        }] : [])],
        objectSlotFrame: supported ? {
          kind: "embedded-slash-object-slot-frame",
          slotId: "embeddedObj1",
          role: "embedded-adjacent-core-object-slot",
          token: normalizedEmbed,
          ownerLayer: "embedded-slash-object-slot-source-frame"
        } : null,
        targetFrame: supported ? {
          kind: "embedded-slash-object-slot-count-target-frame",
          objectSlotCount: 1,
          embeddedValenceCount: 1
        } : null,
        blockReason,
        supported
      };
    }
    function buildEmbeddedSlashObjectSlotOperationFrame(sourceFrame = null, targetFrame = null) {
      if (!sourceFrame || sourceFrame.kind !== "embedded-slash-object-slot-source-frame") {
        return {
          kind: "andrews-embedded-slash-object-slot-operation-frame",
          version: 1,
          status: "blocked",
          blockReason: "missing-source-frame",
          supported: false
        };
      }
      if (sourceFrame.routeOperation !== "embedded-slash-object-slot-count") {
        return {
          kind: "andrews-embedded-slash-object-slot-operation-frame",
          version: 1,
          sourceFrame,
          status: "blocked",
          blockReason: "contradictory-route-operation",
          supported: false
        };
      }
      if (sourceFrame.supported !== true || sourceFrame.blockReason) {
        return {
          kind: "andrews-embedded-slash-object-slot-operation-frame",
          version: 1,
          sourceFrame,
          status: "blocked",
          blockReason: sourceFrame.blockReason || "unsupported-source-frame",
          supported: false
        };
      }
      const resolvedTarget = targetFrame || sourceFrame.targetFrame || null;
      if (!resolvedTarget || resolvedTarget.kind !== "embedded-slash-object-slot-count-target-frame") {
        return {
          kind: "andrews-embedded-slash-object-slot-operation-frame",
          version: 1,
          sourceFrame,
          targetFrame: resolvedTarget,
          status: "blocked",
          blockReason: "missing-target-frame",
          supported: false
        };
      }
      if (resolvedTarget.objectSlotCount !== 1 || resolvedTarget.embeddedValenceCount !== 1) {
        return {
          kind: "andrews-embedded-slash-object-slot-operation-frame",
          version: 1,
          sourceFrame,
          targetFrame: resolvedTarget,
          status: "blocked",
          blockReason: "contradictory-target-frame",
          supported: false
        };
      }
      return {
        kind: "andrews-embedded-slash-object-slot-operation-frame",
        version: 1,
        routeOperation: "embedded-slash-object-slot-count",
        sourceFrame,
        targetFrame: resolvedTarget,
        objectSlotFrame: sourceFrame.objectSlotFrame,
        objectSlotCount: 1,
        embeddedValenceCount: 1,
        status: "authorized",
        supported: true
      };
    }
    function getEmbeddedSlashObjectSlotFrameMismatch(rawValue = "", operationFrame = null) {
      const sourceFrame = buildEmbeddedSlashObjectSlotSourceFrame(rawValue, operationFrame?.sourceFrame?.currentRegexParseOperationFrame || null);
      if (!operationFrame || operationFrame.kind !== "andrews-embedded-slash-object-slot-operation-frame") {
        return "missing-operation-frame";
      }
      if (operationFrame.status !== "authorized" || operationFrame.supported !== true) {
        return operationFrame.blockReason || "blocked-operation-frame";
      }
      if (!operationFrame.sourceFrame || operationFrame.sourceFrame.kind !== sourceFrame.kind) {
        return "missing-source-frame";
      }
      if (operationFrame.sourceFrame.sourceRawInput !== sourceFrame.sourceRawInput) {
        return "contradictory-source-frame";
      }
      if (operationFrame.sourceFrame.sourceCoreText !== sourceFrame.sourceCoreText) {
        return "contradictory-source-core";
      }
      if (!operationFrame.targetFrame || operationFrame.targetFrame.kind !== "embedded-slash-object-slot-count-target-frame") {
        return "missing-target-frame";
      }
      if (operationFrame.targetFrame.objectSlotCount !== 1 || operationFrame.targetFrame.embeddedValenceCount !== 1) {
        return "contradictory-target-frame";
      }
      return "";
    }
    function getEmbeddedSlashTransitiveObjSlotCount(rawValue = "", operationFrame = null) {
      const mismatch = getEmbeddedSlashObjectSlotFrameMismatch(rawValue, operationFrame);
      if (mismatch) {
        return null;
      }
      return operationFrame.objectSlotCount;
    }
    function getEmbeddedSlashTransitiveObjSlotCountFromSourceFrame(rawValue = "", currentRegexParseOperationFrame = null, spec = null) {
      const sourceFrame = buildEmbeddedSlashObjectSlotSourceFrame(rawValue, currentRegexParseOperationFrame, spec);
      const operationFrame = buildEmbeddedSlashObjectSlotOperationFrame(sourceFrame);
      return getEmbeddedSlashTransitiveObjSlotCount(rawValue, operationFrame);
    }
    function getMovingTargetAdjacentEmbedParts(coreText = "", options = {}) {
      const normalizedCore = targetObject.convertEnvelopeSupportiveMarkersToRegexInput(normalizeRegexCoreTokenCase(String(coreText || "").trim())).toLowerCase();
      const originalCoreText = String(options.originalCoreText || coreText || "").trim();
      const explicitSlashBoundary = originalCoreText.includes("/");
      if (isClassicalNahuatlCurrentRegexBoundaryContext(originalCoreText || normalizedCore, options) && !explicitSlashBoundary) {
        return null;
      }
      if (!normalizedCore || !normalizedCore.includes("-")) {
        return null;
      }
      const segments = normalizedCore.split("-").map(segment => String(segment || "").trim()).filter(Boolean);
      if (segments.length !== 2) {
        return null;
      }
      const [embed, stem] = segments;
      if (!embed || !stem) {
        return null;
      }
      if (embed.startsWith("[i]") || embed.startsWith("[y]")) {
        return null;
      }
      if (isDirectionalPrefixToken(embed)) {
        return null;
      }
      if (targetObject.getComposerValenceFamilyToken(embed)) {
        return null;
      }
      if (targetObject.REGEX_ENVELOPE_OBJECT_MARKERS.includes(embed.toUpperCase())) {
        return null;
      }
      return {
        embed,
        stem
      };
    }
    function parseMovingTargetRegexInput(rawValue = "") {
      const raw = String(rawValue || "").trim();
      if (!raw || raw.includes("?")) {
        return {
          isValid: false,
          regexValue: ""
        };
      }
      const finalCore = findFinalTopLevelWrappedCore(raw);
      if (!finalCore) {
        return {
          isValid: false,
          regexValue: ""
        };
      }
      const coreText = normalizeMovingTargetCoreText(String(finalCore.coreText || "").trim()).replace(/^-+/, "");
      if (!coreText || /[()]/.test(coreText)) {
        return {
          isValid: false,
          regexValue: ""
        };
      }
      const prefix = finalCore.prefix;
      let transitivity = targetObject.COMPOSER_TRANSITIVITY.intransitive;
      let outerPrefix = "";
      if (!prefix) {
        transitivity = targetObject.COMPOSER_TRANSITIVITY.intransitive;
      } else if (prefix === "-") {
        transitivity = targetObject.COMPOSER_TRANSITIVITY.transitive;
      } else if (prefix.endsWith("+")) {
        transitivity = targetObject.COMPOSER_TRANSITIVITY.intransitive;
        outerPrefix = prefix.slice(0, -1);
      } else if (prefix.endsWith("-")) {
        transitivity = targetObject.COMPOSER_TRANSITIVITY.transitive;
        outerPrefix = prefix.slice(0, -1);
      } else {
        return {
          isValid: false,
          regexValue: ""
        };
      }
      const outerRawPieces = outerPrefix ? splitTopLevelByPlus(outerPrefix) : [];
      if (outerPrefix && !outerRawPieces) {
        return {
          isValid: false,
          regexValue: ""
        };
      }
      const parsedPieces = [];
      let directionalPrefix = "";
      for (let index = 0; index < outerRawPieces.length; index += 1) {
        const parsedPiece = parseMovingTargetOuterPiece(outerRawPieces[index]);
        if (!parsedPiece || !parsedPiece.value) {
          return {
            isValid: false,
            regexValue: ""
          };
        }
        if (parsedPiece.type === "directional") {
          if (index !== 0 || directionalPrefix) {
            return {
              isValid: false,
              regexValue: ""
            };
          }
          directionalPrefix = parsedPiece.value;
        }
        parsedPieces.push(parsedPiece);
      }
      const valenceCount = parsedPieces.filter(piece => piece.type === "valence").length;
      const resolvedTransitivity = transitivity === targetObject.COMPOSER_TRANSITIVITY.transitive && valenceCount >= 2 ? targetObject.COMPOSER_TRANSITIVITY.bitransitive : transitivity;
      const regexValue = buildMovingTargetRegexFromCoreAndPieces({
        transitivity: resolvedTransitivity,
        coreText,
        outerPieces: parsedPieces
      });
      return {
        isValid: Boolean(regexValue),
        regexValue,
        transitivity: resolvedTransitivity,
        outerPieces: parsedPieces,
        directionalPrefix,
        coreText,
        originalCoreText: String(finalCore.coreText || "").trim()
      };
    }
    function normalizeCurrentRegexParseOuterPieces(outerPieces = []) {
      return (Array.isArray(outerPieces) ? outerPieces : []).map(piece => {
        const type = String(piece?.type || "");
        const value = type === "valence" ? targetObject.normalizeComposerSecondaryValenceSurfaceToken(piece?.value || "") || targetObject.normalizeComposerValenceToken(piece?.value || "") : targetObject.normalizeComposerStem(piece?.value || "");
        return type && value ? Object.freeze({
          kind: "current-regex-parse-outer-piece-frame",
          type,
          value
        }) : null;
      }).filter(Boolean);
    }
    const ISSUED_CURRENT_REGEX_PARSE_OPERATION_FRAMES = new WeakSet();
    const ISSUED_CURRENT_REGEX_ENTRADA_SOURCE_FRAMES = new WeakSet();
    const ISSUED_ENTRADA_GRAMMAR_OBJECTS = new WeakSet();
    function buildCurrentRegexParseSourceFrame(rawValue = "") {
      const rawInput = String(rawValue || "").trim();
      return Object.freeze({
        kind: "current-regex-parse-source-frame",
        version: 1,
        routeFamily: "current-regex-parser",
        routeStage: "parse-current-regex-input",
        sourceRawInput: rawInput,
        sourceSignature: rawInput,
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false
      });
    }
    function buildCurrentRegexParseTargetFrame(sourceFrame = null) {
      if (!sourceFrame || sourceFrame.kind !== "current-regex-parse-source-frame") {
        return null;
      }
      const parsed = parseMovingTargetRegexInput(sourceFrame.sourceRawInput || "");
      if (!parsed || parsed.isValid !== true || !parsed.regexValue) {
        return null;
      }
      const outerPieces = normalizeCurrentRegexParseOuterPieces(parsed.outerPieces);
      const targetFrame = {
        kind: "current-regex-parse-target-frame",
        sourceSignature: sourceFrame.sourceSignature,
        isValid: true,
        regexValue: String(parsed.regexValue || ""),
        transitivity: parsed.transitivity || targetObject.COMPOSER_TRANSITIVITY.intransitive,
        outerPieces: Object.freeze(outerPieces),
        directionalPrefix: targetObject.normalizeComposerStem(parsed.directionalPrefix || ""),
        coreText: String(parsed.coreText || ""),
        originalCoreText: String(parsed.originalCoreText || "")
      };
      targetFrame.targetSignature = JSON.stringify({
        sourceSignature: targetFrame.sourceSignature,
        regexValue: targetFrame.regexValue,
        transitivity: targetFrame.transitivity,
        outerPieces: outerPieces.map(piece => ({
          type: piece.type,
          value: piece.value
        })),
        directionalPrefix: targetFrame.directionalPrefix,
        coreText: targetFrame.coreText,
        originalCoreText: targetFrame.originalCoreText
      });
      return Object.freeze(targetFrame);
    }
    function buildCurrentRegexParseOperationFrame(sourceFrame = null) {
      const targetFrame = buildCurrentRegexParseTargetFrame(sourceFrame);
      if (!sourceFrame || sourceFrame.kind !== "current-regex-parse-source-frame" || !targetFrame) {
        return null;
      }
      const operationFrame = Object.freeze({
        kind: "andrews-typed-operation-frame",
        operationId: "andrews-current-regex-parse",
        routeFamily: "current-regex-parser",
        routeStage: "parse-current-regex-input",
        operationApplied: "parse-current-regex-input-to-typed-target",
        sourceFrameKind: sourceFrame.kind,
        sourceSignature: sourceFrame.sourceSignature,
        targetFrame,
        targetSignature: targetFrame.targetSignature,
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false
      });
      ISSUED_CURRENT_REGEX_PARSE_OPERATION_FRAMES.add(operationFrame);
      return operationFrame;
    }
    function getCurrentRegexParseOperationMismatch(rawValue = "", operationFrame = null) {
      const sourceFrame = buildCurrentRegexParseSourceFrame(rawValue);
      const expectedTargetFrame = buildCurrentRegexParseTargetFrame(sourceFrame);
      if (!expectedTargetFrame) {
        return "current-regex-parse-target-frame-required";
      }
      if (!operationFrame || operationFrame.kind !== "andrews-typed-operation-frame" || operationFrame.operationId !== "andrews-current-regex-parse" || operationFrame.routeFamily !== "current-regex-parser" || operationFrame.routeStage !== "parse-current-regex-input" || operationFrame.operationApplied !== "parse-current-regex-input-to-typed-target" || operationFrame.sourceFrameKind !== sourceFrame.kind || operationFrame.sourceSignature !== sourceFrame.sourceSignature || operationFrame.consumesRenderedInput !== false || operationFrame.displayStringsAuthorizeGrammar !== false) {
        return "current-regex-parse-operation-frame-required";
      }
      const targetFrame = operationFrame.targetFrame || null;
      if (!targetFrame || targetFrame.kind !== expectedTargetFrame.kind || targetFrame.sourceSignature !== expectedTargetFrame.sourceSignature || targetFrame.regexValue !== expectedTargetFrame.regexValue || targetFrame.transitivity !== expectedTargetFrame.transitivity || targetFrame.directionalPrefix !== expectedTargetFrame.directionalPrefix || targetFrame.coreText !== expectedTargetFrame.coreText || targetFrame.originalCoreText !== expectedTargetFrame.originalCoreText || targetFrame.targetSignature !== expectedTargetFrame.targetSignature || operationFrame.targetSignature !== expectedTargetFrame.targetSignature) {
        return "current-regex-parse-contradictory-target-frame";
      }
      return "";
    }
    function buildMovingTargetParsedFromCurrentRegexParseOperationFrame(operationFrame = null) {
      const targetFrame = operationFrame?.targetFrame || null;
      if (!targetFrame || targetFrame.kind !== "current-regex-parse-target-frame") {
        return null;
      }
      return {
        isValid: true,
        regexValue: String(targetFrame.regexValue || ""),
        transitivity: targetFrame.transitivity || targetObject.COMPOSER_TRANSITIVITY.intransitive,
        outerPieces: normalizeCurrentRegexParseOuterPieces(targetFrame.outerPieces).map(piece => ({
          type: piece.type,
          value: piece.value
        })),
        directionalPrefix: targetObject.normalizeComposerStem(targetFrame.directionalPrefix || ""),
        coreText: String(targetFrame.coreText || ""),
        originalCoreText: String(targetFrame.originalCoreText || "")
      };
    }
    function isCurrentRegexParseOperationFrameRecognized(rawValue = "", operationFrame = null) {
      return !getCurrentRegexParseOperationMismatch(rawValue, operationFrame);
    }
    function buildCurrentRegexParseOperationFrameFromRawInput(rawValue = "") {
      const sourceFrame = buildCurrentRegexParseSourceFrame(rawValue);
      return buildCurrentRegexParseOperationFrame(sourceFrame);
    }
    function isCurrentRegexParseInputRecognized(rawValue = "") {
      const operationFrame = buildCurrentRegexParseOperationFrameFromRawInput(rawValue);
      return isCurrentRegexParseOperationFrameRecognized(rawValue, operationFrame);
    }
    function buildCurrentRegexShorthandParseOperationFrameFromRawInput(rawValue = "") {
      const shorthandSourceFrame = buildCurrentRegexShorthandSourceFrame(rawValue);
      const shorthandOperationFrame = buildCurrentRegexShorthandOperationFrame(shorthandSourceFrame);
      const shorthandInput = getCurrentRegexShorthandParseInput(rawValue, shorthandOperationFrame);
      if (!shorthandInput) {
        return null;
      }
      return buildCurrentRegexParseOperationFrameFromRawInput(shorthandInput);
    }
    function isCurrentRegexShorthandParseInputRecognized(rawValue = "") {
      const shorthandSourceFrame = buildCurrentRegexShorthandSourceFrame(rawValue);
      const shorthandOperationFrame = buildCurrentRegexShorthandOperationFrame(shorthandSourceFrame);
      const shorthandInput = getCurrentRegexShorthandParseInput(rawValue, shorthandOperationFrame);
      if (!shorthandInput) {
        return false;
      }
      const parseOperationFrame = buildCurrentRegexParseOperationFrameFromRawInput(shorthandInput);
      return isCurrentRegexParseOperationFrameRecognized(shorthandInput, parseOperationFrame);
    }
    function serializeRegexInputValueFromOperationFrame(rawValue = "", operationFrame = null) {
      const raw = String(rawValue || "").trim();
      if (!raw) {
        return "";
      }
      const mismatch = getCurrentRegexParseOperationMismatch(raw, operationFrame);
      if (mismatch) {
        return "";
      }
      return String(operationFrame?.targetFrame?.regexValue || "");
    }

    // ─── CanonicalVerbSpec ────────────────────────────────────────────────────────
    // Intermediate upstream object using composer vocabulary as canonical field
    // names. Both the regex parsing path and the composer semantic path produce
    // one of these, which is then consumed by buildVerbMetaFromCanonicalSpec().
    //
    // Fields (composer vocabulary → regex syntax alias):
    //   matrixStem       – the verb root                    (matrix.stem)
    //   adjacentEmbed    – slash-adjacent embed prefix      (matrix.adjacentEmbed / hasSuffixSeparator)
    //   transitivity     – "intransitive"|"transitive"|…    (transitivity / hasLeadingDash)
    //   valenceTokens    – object markers [primary, …]      (valence.primary.token / outerValenceTokens)
    //   valenceEmbeds    – lexical bound prefixes           (valence.primary.embed / outerLexicalPrefixes)
    //   directionalPrefix– directional prefix token         (directional.prefix)
    //   supportiveMarker – "i"|"y"|""                       (supportiveMarker / hasOptionalSupportiveI)
    //   tiCausativeClass – "become"|"have"|""               (ti.causativeClass)
    // ─────────────────────────────────────────────────────────────────────────────

    // Builds a CanonicalVerbSpec from the output of parseMovingTargetRegexInput().
    function buildCanonicalVerbSpecFromMovingTargetParsed(rawValue, movingTargetParsed, tiInputMetadata, parseOperationFrame = null) {
      if (!movingTargetParsed || movingTargetParsed.isValid !== true) {
        return null;
      }
      const parsed = movingTargetParsed;
      const outerPieces = Array.isArray(parsed.outerPieces) ? parsed.outerPieces : [];
      // directionalPrefix — composer: directional.prefix
      const directionalPrefix = targetObject.normalizeComposerStem(parsed.directionalPrefix || "");
      // valenceTokens — composer: valence.primary.token, valence.secondary.token
      const valenceTokens = outerPieces.filter(piece => piece && piece.type === "valence" && piece.value).map(piece => normalizeEntradaGrammarValenceSurfaceToken(piece.value)).filter(Boolean);
      // valenceEmbeds — composer: valence.primary.embed (lexical bound prefixes)
      const valenceEmbeds = outerPieces.filter(piece => piece && piece.type === "lexical" && piece.value).map(piece => targetObject.normalizeRuleBase(piece.value)).filter(Boolean);
      // supportiveMarker — composer: supportiveMarker ("i"|"y"|"")
      const markedCore = targetObject.convertEnvelopeSupportiveMarkersToRegexInput(normalizeRegexCoreTokenCase(String(parsed.coreText || "").trim()));
      const supportiveSourceFrame = targetObject.buildOptionalSupportiveMarkedSurfaceSourceFrame({
        precedingSurface: `${directionalPrefix}${valenceTokens.join("")}${valenceEmbeds.join("")}`,
        markedSurface: markedCore,
        inputFormat: targetObject.SUPPORTIVE_MARKER_FORMAT.envelope,
        outputFormat: targetObject.SUPPORTIVE_MARKER_FORMAT.envelope,
        preserveMarkers: false,
        sourceKind: "parse-verb-input-core",
        sourceRole: "tronco"
      });
      const supportiveOperationFrame = targetObject.buildOptionalSupportiveMarkedSurfaceOperationFrame(supportiveSourceFrame);
      const supportiveResolution = targetObject.resolveOptionalSupportiveMarkedSurface({
        precedingSurface: `${directionalPrefix}${valenceTokens.join("")}${valenceEmbeds.join("")}`,
        markedSurface: markedCore,
        inputFormat: targetObject.SUPPORTIVE_MARKER_FORMAT.envelope,
        outputFormat: targetObject.SUPPORTIVE_MARKER_FORMAT.envelope,
        preserveMarkers: false,
        sourceFrame: supportiveSourceFrame,
        operationFrame: supportiveOperationFrame
      });
      const supportiveMarker = supportiveResolution.markerLetter || "";
      // adjacentEmbed — composer: matrix.adjacentEmbed (slash-adjacent prefix)
      const plainCore = String(supportiveResolution.plainSurface || markedCore || "").trim().toLowerCase();
      const sourceBoundaryOptions = {
        originalCoreText: String(parsed.originalCoreText || parsed.coreText || ""),
        rawValue: String(rawValue || "")
      };
      const surfaceAdjacentCoreEmbed = getMovingTargetAdjacentEmbedParts(plainCore, sourceBoundaryOptions);
      const surfaceCoreInput = surfaceAdjacentCoreEmbed
        ? plainCore
        : targetObject.collapseSerialStemDashInputFromSourceFrame(plainCore);
      const inlineSurface = targetObject.parseInlineTiCausativeClassFromBase(surfaceCoreInput);
      const normalizedCoreBase = String(inlineSurface.base || plainCore || "").trim().toLowerCase();
      const supportFreeCore = stripLeadingSupportiveLetterFromCoreSurface(normalizedCoreBase, supportiveMarker);
      const ruleAdjacentCoreEmbed = getMovingTargetAdjacentEmbedParts(supportFreeCore, sourceBoundaryOptions);
      const ruleCoreInput = ruleAdjacentCoreEmbed
        ? supportFreeCore
        : targetObject.collapseSerialStemDashInputFromSourceFrame(supportFreeCore);
      const inlineRuleBase = targetObject.parseInlineTiCausativeClassFromBase(ruleCoreInput);
      const normalizedRuleCoreBase = String(inlineRuleBase.base || supportFreeCore || "").trim().toLowerCase();
      const transitivity = parsed.transitivity || targetObject.COMPOSER_TRANSITIVITY.intransitive;
      const adjacentCoreEmbed = getMovingTargetAdjacentEmbedParts(normalizedCoreBase, sourceBoundaryOptions);
      const adjacentEmbed = adjacentCoreEmbed ? targetObject.normalizeRuleBase(adjacentCoreEmbed.embed) : "";
      // matrixStem — composer: matrix.stem (the rightmost verb root)
      const matrixStem = targetObject.normalizeRuleBase(adjacentCoreEmbed ? adjacentCoreEmbed.stem : normalizedCoreBase);
      const normalizedRuleAdjacentCoreEmbed = getMovingTargetAdjacentEmbedParts(normalizedRuleCoreBase, sourceBoundaryOptions);
      const matrixRuleBase = targetObject.normalizeRuleBase(normalizedRuleAdjacentCoreEmbed ? normalizedRuleAdjacentCoreEmbed.stem : normalizedRuleCoreBase);
      // tiCausativeClass — composer: ti.causativeClass
      const tiCausativeClass = tiInputMetadata?.tiCausativeClass || inlineSurface.tiCausativeClass || inlineRuleBase.tiCausativeClass || "";
      return {
        matrixStem,
        matrixRuleBase,
        adjacentEmbed,
        transitivity,
        valenceTokens,
        valenceEmbeds,
        directionalPrefix,
        supportiveMarker,
        tiCausativeClass
      };
    }

    // Builds a CanonicalVerbSpec from the output of buildComposerSemanticState().
    function buildCanonicalVerbSpecFromComposerSemantic(semantic = {}) {
      if (!semantic || typeof semantic !== "object") {
        return null;
      }
      const transitivity = semantic.transitivity || targetObject.COMPOSER_TRANSITIVITY.intransitive;
      // matrixStem — the active slot's verb root
      const matrixStem = targetObject.normalizeRuleBase(String(semantic.matrix?.stem || semantic.matrix?.regexStem || "").trim().toLowerCase());
      // adjacentEmbed — slash-adjacent embed prefix inside the core slot
      const adjacentEmbed = targetObject.normalizeRuleBase(String(semantic.matrix?.adjacentEmbed || "").trim().toLowerCase());
      // valenceTokens — primary and secondary object markers per transitivity
      const valenceTokensRaw = [];
      if (transitivity === targetObject.COMPOSER_TRANSITIVITY.intransitive) {
        const tok = normalizeEntradaGrammarValenceSurfaceToken(semantic.valence?.intransitive?.token || "");
        if (tok) valenceTokensRaw.push(tok);
      } else {
        const tok = normalizeEntradaGrammarValenceSurfaceToken(semantic.valence?.primary?.token || "");
        if (tok) valenceTokensRaw.push(tok);
        if (transitivity === targetObject.COMPOSER_TRANSITIVITY.bitransitive) {
          const tok2 = normalizeEntradaGrammarValenceSurfaceToken(semantic.valence?.secondary?.token || "");
          if (tok2) valenceTokensRaw.push(tok2);
        }
      }
      const valenceTokens = valenceTokensRaw.filter(Boolean);
      // valenceEmbeds — lexical bound prefixes paired with the valence slots
      const valenceEmbedsRaw = [];
      if (transitivity === targetObject.COMPOSER_TRANSITIVITY.intransitive) {
        const emb = targetObject.normalizeRuleBase(semantic.valence?.intransitive?.embed || "");
        if (emb) valenceEmbedsRaw.push(emb);
      } else {
        const emb = targetObject.normalizeRuleBase(semantic.valence?.primary?.embed || "");
        if (emb) valenceEmbedsRaw.push(emb);
        if (transitivity === targetObject.COMPOSER_TRANSITIVITY.bitransitive) {
          const emb2 = targetObject.normalizeRuleBase(semantic.valence?.secondary?.embed || "");
          if (emb2) valenceEmbedsRaw.push(emb2);
        }
      }
      const valenceEmbeds = valenceEmbedsRaw.filter(Boolean);
      const directionalPrefix = targetObject.normalizeComposerStem(semantic.directional?.prefix || "");
      const supportiveMarker = targetObject.normalizeSupportiveMarkerValue(semantic.supportiveMarker || "");
      const surfaceCorePath = adjacentEmbed ? `${adjacentEmbed}-${matrixStem}` : matrixStem;
      const supportFreeCorePath = stripLeadingSupportiveLetterFromCoreSurface(surfaceCorePath, supportiveMarker);
      const ruleAdjacentCoreEmbed = getMovingTargetAdjacentEmbedParts(supportFreeCorePath);
      const matrixRuleBase = targetObject.normalizeRuleBase(ruleAdjacentCoreEmbed ? ruleAdjacentCoreEmbed.stem : supportFreeCorePath);
      const tiCausativeClass = targetObject.normalizeTiCausativeClass(semantic.ti?.causativeClass || "");
      return {
        matrixStem,
        matrixRuleBase,
        adjacentEmbed,
        transitivity,
        valenceTokens,
        valenceEmbeds,
        directionalPrefix,
        supportiveMarker,
        tiCausativeClass
      };
    }
    const ENTRADA_GRAMMAR_OBJECT_LAYER_ORDER = Object.freeze(["morph-boundary-frame", "formula-boundary", "stem-frame", "valence-frame", "object-frame", "route-frame", "function-use-frame"]);
    const ENTRADA_GRAMMAR_OBJECT_ANTI_CONFLATION_RULES = Object.freeze(["Lesson 1 morph/allomorph evidence is staged before formula boundaries.", "Stem behavior is staged separately from valence behavior.", "Valence behavior is staged separately from object slot ownership.", "Object slots remain structural slots until the valence frame is fixed.", "Function-use is downstream and may annotate only already licensed readings."]);
    const ENTRADA_GRAMMAR_OBJECT_EARLY_ALLOMORPH_BY_SURFACE = Object.freeze({
      nēch: Object.freeze({
        formulaMorph: "n-ēch",
        morphs: Object.freeze(["n", "ēch"])
      }),
      tēch: Object.freeze({
        formulaMorph: "t-ēch",
        morphs: Object.freeze(["t", "ēch"])
      }),
      mitz: Object.freeze({
        formulaMorph: "m-itz",
        morphs: Object.freeze(["m", "itz"])
      }),
      amēch: Object.freeze({
        formulaMorph: "am-ēch",
        morphs: Object.freeze(["am", "ēch"])
      }),
      qui: Object.freeze({
        formulaMorph: "qui-0",
        morphs: Object.freeze(["qui", "0"])
      }),
      c: Object.freeze({
        formulaMorph: "c-0",
        morphs: Object.freeze(["c", "0"])
      }),
      qu: Object.freeze({
        formulaMorph: "qu-0",
        morphs: Object.freeze(["qu", "0"])
      }),
      quim: Object.freeze({
        formulaMorph: "qu-im",
        morphs: Object.freeze(["qu", "im"])
      }),
      quin: Object.freeze({
        formulaMorph: "qu-in",
        morphs: Object.freeze(["qu", "in"])
      })
    });
    const ENTRADA_GRAMMAR_OBJECT_SURFACE_BY_EARLY_ALLOMORPH = Object.freeze(Object.fromEntries(Object.entries(ENTRADA_GRAMMAR_OBJECT_EARLY_ALLOMORPH_BY_SURFACE).map(([surfaceMorph, frame]) => [frame.formulaMorph, surfaceMorph])));
    function cloneEntradaGrammarObjectRecord(record = null) {
      if (!record || typeof record !== "object") {
        return null;
      }
      try {
        return JSON.parse(JSON.stringify(record));
      } catch (_error) {
        return null;
      }
    }
    function hasEntradaGrammarFormulaSlotEvidence(sourceFormulaSlots = null, sourceFormulaEcho = "") {
      return Boolean(sourceFormulaSlots && typeof sourceFormulaSlots === "object" && Object.keys(sourceFormulaSlots).length) || Boolean(String(sourceFormulaEcho || "").trim());
    }
    function getEntradaGrammarFormulaSlotObjectValue(slot = null) {
      if (!slot || typeof slot !== "object") {
        return "";
      }
      return String(slot.token || slot.prefix || slot.displayPrefix || slot.surface || slot.value || "").trim();
    }
    function getEntradaGrammarFormulaSlotStemValue(slot = null) {
      if (!slot || typeof slot !== "object") {
        return "";
      }
      return String(slot.stem || slot.displayStem || slot.token || slot.surface || slot.value || "").trim();
    }
    function normalizeEntradaGrammarMorphToken(value = "") {
      return String(value || "").trim().toLowerCase();
    }
    function getEntradaGrammarEarlyAllomorphFrameForSurface(surfaceMorph = "") {
      const normalized = normalizeEntradaGrammarMorphToken(surfaceMorph);
      if (!normalized) {
        return null;
      }
      const frame = ENTRADA_GRAMMAR_OBJECT_EARLY_ALLOMORPH_BY_SURFACE[normalized];
      if (!frame) {
        return null;
      }
      return {
        surfaceMorph: normalized,
        formulaMorph: frame.formulaMorph,
        morphs: Array.from(frame.morphs)
      };
    }
    function getEntradaGrammarSurfaceForEarlyAllomorph(formulaMorph = "") {
      return ENTRADA_GRAMMAR_OBJECT_SURFACE_BY_EARLY_ALLOMORPH[normalizeEntradaGrammarMorphToken(formulaMorph)] || "";
    }
    function getEntradaGrammarFormulaMorphForSurface(surfaceMorph = "") {
      const frame = getEntradaGrammarEarlyAllomorphFrameForSurface(surfaceMorph);
      return frame?.formulaMorph || normalizeEntradaGrammarMorphToken(surfaceMorph);
    }
    function normalizeEntradaGrammarValenceSurfaceToken(value = "") {
      return targetObject.normalizeComposerSecondaryValenceSurfaceToken(value) || targetObject.normalizeComposerValenceToken(value) || getEntradaGrammarEarlyAllomorphFrameForSurface(value)?.surfaceMorph || "";
    }
    function getEntradaGrammarMorphicVariantsForSurface(surfaceMorph = "") {
      const normalizedSurface = normalizeEntradaGrammarMorphToken(surfaceMorph);
      const variants = new Set();
      if (normalizedSurface) {
        variants.add(normalizedSurface);
      }
      const allomorphFrame = getEntradaGrammarEarlyAllomorphFrameForSurface(normalizedSurface);
      if (allomorphFrame?.formulaMorph) {
        variants.add(allomorphFrame.formulaMorph);
      }
      const surfaceFromFormula = getEntradaGrammarSurfaceForEarlyAllomorph(normalizedSurface);
      if (surfaceFromFormula) {
        variants.add(surfaceFromFormula);
      }
      return variants;
    }
    function entradaGrammarFormulaObjectValueCoversToken(formulaValue = "", token = "") {
      const normalizedFormulaValue = normalizeEntradaGrammarMorphToken(formulaValue);
      if (!normalizedFormulaValue) {
        return false;
      }
      return getEntradaGrammarMorphicVariantsForSurface(token).has(normalizedFormulaValue);
    }
    function buildEntradaGrammarFormulaObjectCoverage({
      objectSlots = [],
      sourceFormulaSlots = null
    } = {}) {
      const slots = sourceFormulaSlots && typeof sourceFormulaSlots === "object" ? sourceFormulaSlots : {};
      const requiredObjectSlots = (Array.isArray(objectSlots) ? objectSlots : []).filter(entry => entry?.ownsObjectSlot === true).map(entry => ({
        slotId: String(entry.slotId || "").trim(),
        token: String(entry.token || "").trim()
      })).filter(entry => entry.slotId && entry.token);
      const missingObjectSlots = requiredObjectSlots.filter(entry => {
        const formulaValue = getEntradaGrammarFormulaSlotObjectValue(slots[entry.slotId]);
        if (entradaGrammarFormulaObjectValueCoversToken(formulaValue, entry.token)) {
          return false;
        }
        if (entry.token === "mo" && entradaGrammarFormulaObjectValueCoversToken(getEntradaGrammarFormulaSlotObjectValue(slots.reflexivo), "mo")) {
          return false;
        }
        return true;
      });
      return {
        requiredObjectSlots,
        missingObjectSlots,
        objectSlotsCovered: missingObjectSlots.length === 0
      };
    }
    function buildEntradaGrammarObjectValenceSlots(spec = null) {
      const transitivity = spec?.transitivity || targetObject.COMPOSER_TRANSITIVITY.intransitive;
      const tokens = Array.isArray(spec?.valenceTokens) ? spec.valenceTokens.map(entry => normalizeEntradaGrammarValenceSurfaceToken(entry)).filter(Boolean) : [];
      const embeds = Array.isArray(spec?.valenceEmbeds) ? spec.valenceEmbeds.map(entry => targetObject.normalizeRuleBase(entry)).filter(Boolean) : [];
      return tokens.map((token, index) => {
        const ownsObjectSlot = transitivity !== targetObject.COMPOSER_TRANSITIVITY.intransitive;
        const slotId = ownsObjectSlot ? `obj${index + 1}` : `valence${index + 1}`;
        const formulaMorph = getEntradaGrammarFormulaMorphForSurface(token);
        const allomorphFrame = getEntradaGrammarEarlyAllomorphFrameForSurface(token);
        return {
          slotId,
          token,
          formulaMorph,
          allomorphicFormulaMorph: allomorphFrame ? allomorphFrame.formulaMorph : "",
          morphs: allomorphFrame ? allomorphFrame.morphs : [token],
          embed: embeds[index] || "",
          role: ownsObjectSlot ? "object-marker" : "valence-marker",
          ownsObjectSlot,
          sourceLayer: ownsObjectSlot ? "object-frame" : "valence-frame"
        };
      });
    }
    function buildEntradaGrammarObjectObjectVector(valenceSlots = []) {
      const vector = {
        obj1: "",
        obj2: "",
        obj3: "",
        reflexivo: ""
      };
      (Array.isArray(valenceSlots) ? valenceSlots : []).filter(entry => entry?.ownsObjectSlot === true).forEach(entry => {
        if (Object.prototype.hasOwnProperty.call(vector, entry.slotId)) {
          vector[entry.slotId] = entry.token || "";
        }
        if (entry.slotId === "obj1" && entry.token === "mo") {
          vector.reflexivo = "mo";
        }
      });
      return vector;
    }
    function buildEntradaGrammarObjectCandidateFormulaSlots({
      spec = null,
      objectVector = null
    } = {}) {
      const slots = {};
      const matrixStem = String(spec?.matrixStem || "").trim();
      if (matrixStem) {
        slots.predicateStem = {
          slot: "predicateStem",
          stem: matrixStem,
          ruleBase: String(spec?.matrixRuleBase || matrixStem),
          adjacentEmbed: String(spec?.adjacentEmbed || ""),
          ownerLayer: "stem-frame"
        };
      }
      ["obj1", "obj2", "obj3", "reflexivo"].forEach(slotId => {
        const value = String(objectVector?.[slotId] || "").trim();
        if (value) {
          const formulaMorph = getEntradaGrammarFormulaMorphForSurface(value);
          slots[slotId] = {
            slot: slotId,
            token: formulaMorph,
            surfaceToken: value,
            allomorphicFormulaMorph: formulaMorph !== value ? formulaMorph : "",
            ownerLayer: "object-frame"
          };
        }
      });
      return slots;
    }
    function buildEntradaGrammarObjectMorphBoundaryFrame({
      spec = null,
      valenceSlots = [],
      sourceFormulaSlots = null,
      sourceFormulaEcho = "",
      sourceBlock = "#1 Entrada"
    } = {}) {
      const slots = sourceFormulaSlots && typeof sourceFormulaSlots === "object" ? sourceFormulaSlots : {};
      const objectMorphs = (Array.isArray(valenceSlots) ? valenceSlots : []).map(slot => {
        const surfaceMorph = normalizeEntradaGrammarMorphToken(slot.token || "");
        if (!surfaceMorph) {
          return null;
        }
        const formulaSlotMorph = getEntradaGrammarFormulaSlotObjectValue(slots[slot.slotId]);
        const allomorphFrame = getEntradaGrammarEarlyAllomorphFrameForSurface(surfaceMorph);
        const formulaMorph = formulaSlotMorph || allomorphFrame?.formulaMorph || surfaceMorph;
        const governingFrame = typeof targetObject.buildClassicalValenceGoverningFrame === "function" ? targetObject.buildClassicalValenceGoverningFrame(surfaceMorph, {
          stem: spec?.matrixStem || "",
          visibleFormulaPrefix: formulaMorph
        }) : null;
        return {
          slotId: String(slot.slotId || ""),
          role: String(slot.role || ""),
          surfaceMorph,
          formulaMorph,
          morphs: allomorphFrame?.morphs || [surfaceMorph],
          allomorphyKind: allomorphFrame ? "lesson-1-morph-boundary-object-prefix" : "lesson-1-morph-boundary-same-surface",
          governingFrame,
          governingFrameKind: governingFrame?.kind || "",
          governingPath: governingFrame?.governingPath || "",
          governingSlotId: governingFrame?.valencePosition || "",
          valencePosition: governingFrame?.valencePosition || "",
          predicatePositionStatus: governingFrame?.predicatePositionStatus || "",
          sourceSections: governingFrame?.sourceSections || [],
          va: governingFrame?.va || null,
          va1: governingFrame?.va1 || null,
          va2: governingFrame?.va2 || null,
          ownerLayer: String(slot.sourceLayer || ""),
          beforeFormulaBoundary: true
        };
      }).filter(Boolean);
      const predicateFormulaStem = getEntradaGrammarFormulaSlotStemValue(slots.predicateStem);
      const predicateSurfaceStem = normalizeEntradaGrammarMorphToken(spec?.matrixStem || "");
      const stemAllomorphs = predicateFormulaStem && predicateSurfaceStem && normalizeEntradaGrammarMorphToken(predicateFormulaStem) !== predicateSurfaceStem ? [{
        slotId: "predicateStem",
        role: "predicate-stem",
        formulaMorph: normalizeEntradaGrammarMorphToken(predicateFormulaStem),
        surfaceMorph: predicateSurfaceStem,
        allomorphyKind: "lesson-1-morph-boundary-stem-shape",
        ownerLayer: "stem-frame",
        beforeFormulaBoundary: true
      }] : [];
      const governedObjectMorphs = objectMorphs.filter(entry => entry.governingFrame);
      const objectAllomorphs = objectMorphs.filter(entry => entry.formulaMorph !== entry.surfaceMorph).map(entry => ({
        slotId: entry.slotId,
        role: entry.role,
        surfaceMorph: entry.surfaceMorph,
        formulaMorph: entry.formulaMorph,
        morphs: entry.morphs,
        allomorphyKind: entry.allomorphyKind,
        ownerLayer: entry.ownerLayer,
        beforeFormulaBoundary: entry.beforeFormulaBoundary
      }));
      const allomorphs = [...objectAllomorphs, ...stemAllomorphs];
      return {
        kind: "andrews-lesson-1-entrada-morph-boundary-frame",
        version: 1,
        sourceLesson: "Andrews Lesson 1",
        sourceSections: ["Andrews §1.8", "Andrews §1.11", "Andrews Lesson 4"],
        stageBlock: String(sourceBlock || "#1 Entrada"),
        evaluationOrder: "before-formula-boundary",
        sourceLayer: "morph-boundary-frame",
        beforeFormulaBoundary: true,
        formulaBoundaryConsumesMorphEvidence: true,
        formulaSlotIsLiteralSpelling: false,
        allomorphyIsEntradaEvidence: true,
        functionUseEvaluationOrder: "last",
        sourceFormulaEcho: String(sourceFormulaEcho || "").trim(),
        valenceGoverningFrame: typeof targetObject.getClassicalValenceGoverningInventory === "function" ? targetObject.getClassicalValenceGoverningInventory() : null,
        objectMorphs,
        governedObjectMorphs,
        stemAllomorphs,
        allomorphs
      };
    }
    function buildEntradaGrammarObjectFromCanonicalVerbSpec(spec = null, {
      rawInput = "",
      sourceBlock = "#1 Entrada",
      sourceUnit = "CNV",
      sourceKind = "verbal-nuclear-clause",
      sourceFormulaSlots = null,
      sourceFormulaEcho = "",
      routeRecordId = "",
      currentRegexParseOperationFrame = null,
      currentRegexEntradaGrammarObjectSourceFrame = null,
      currentRegexEntradaGrammarObjectOperationFrame = null,
      currentRegexEntradaGrammarObjectTargetFrame = null
    } = {}) {
      if (!spec || typeof spec !== "object") {
        return null;
      }
      const transitivity = spec.transitivity || targetObject.COMPOSER_TRANSITIVITY.intransitive;
      const valenceSlots = buildEntradaGrammarObjectValenceSlots(spec);
      const objectSlots = valenceSlots.filter(entry => entry.ownsObjectSlot === true);
      const objectVector = buildEntradaGrammarObjectObjectVector(valenceSlots);
      const explicitFormulaSlots = sourceFormulaSlots && typeof sourceFormulaSlots === "object" ? cloneEntradaGrammarObjectRecord(sourceFormulaSlots) : null;
      const formulaEvidencePresent = hasEntradaGrammarFormulaSlotEvidence(explicitFormulaSlots, sourceFormulaEcho);
      const formulaObjectCoverage = buildEntradaGrammarFormulaObjectCoverage({
        objectSlots,
        sourceFormulaSlots: explicitFormulaSlots
      });
      const typedCurrentRegexSourceAuthorizesValence = Boolean(
        ISSUED_CURRENT_REGEX_PARSE_OPERATION_FRAMES.has(currentRegexParseOperationFrame)
        && ISSUED_CURRENT_REGEX_ENTRADA_SOURCE_FRAMES.has(currentRegexEntradaGrammarObjectSourceFrame)
        && currentRegexEntradaGrammarObjectSourceFrame.currentRegexParseOperationFrame === currentRegexParseOperationFrame
        && currentRegexEntradaGrammarObjectSourceFrame.sourceRawInput === String(rawInput || "").trim()
        && !currentRegexEntradaGrammarObjectSourceFrame.blockReason
        && !getCurrentRegexParseOperationMismatch(rawInput, currentRegexParseOperationFrame)
      );
      const resolvedValenceFrameFixed = typedCurrentRegexSourceAuthorizesValence;
      const candidateFormulaSlots = buildEntradaGrammarObjectCandidateFormulaSlots({
        spec,
        objectVector
      });
      const morphBoundaryFrame = buildEntradaGrammarObjectMorphBoundaryFrame({
        spec,
        valenceSlots,
        sourceFormulaSlots: explicitFormulaSlots,
        sourceFormulaEcho,
        sourceBlock
      });
      const entradaGrammarObject = {
        kind: "andrews-entrada-grammar-object",
        version: 1,
        sourceBlock: String(sourceBlock || "#1 Entrada"),
        rawInput: String(rawInput || ""),
        currentRegexParseOperationFrame,
        currentRegexEntradaGrammarObjectSourceFrame,
        currentRegexEntradaGrammarObjectOperationFrame,
        currentRegexEntradaGrammarObjectTargetFrame,
        layerOrder: Array.from(ENTRADA_GRAMMAR_OBJECT_LAYER_ORDER),
        sourceUnit: String(sourceUnit || "CNV"),
        sourceKind: String(sourceKind || "verbal-nuclear-clause"),
        morphBoundaryFrame,
        formulaBoundaryFrame: {
          stageBlock: String(sourceBlock || "#1 Entrada"),
          formulaType: String(sourceUnit || "CNV"),
          frameFixed: formulaEvidencePresent,
          valenceFrameFixed: resolvedValenceFrameFixed,
          sourceFormulaEcho: String(sourceFormulaEcho || "").trim(),
          sourceFormulaSlots: explicitFormulaSlots,
          candidateFormulaSlots,
          candidateSlotsDoNotLicenseFunctionUse: true,
          formulaEvidenceAuthorizesValence: false,
          formulaEvidenceIsDocumentaryOnly: true,
          formulaEvidencePresent,
          objectSlotsCovered: formulaObjectCoverage.objectSlotsCovered,
          missingObjectSlots: formulaObjectCoverage.missingObjectSlots
        },
        stemFrame: {
          matrixStem: String(spec.matrixStem || ""),
          matrixRuleBase: String(spec.matrixRuleBase || spec.matrixStem || ""),
          adjacentEmbed: String(spec.adjacentEmbed || ""),
          directionalPrefix: String(spec.directionalPrefix || ""),
          supportiveMarker: String(spec.supportiveMarker || ""),
          tiCausativeClass: String(spec.tiCausativeClass || ""),
          rank: "verbstem",
          sourceLayer: "stem-frame"
        },
        valenceFrame: {
          transitivity,
          tokens: valenceSlots.map(entry => entry.token),
          lexicalEmbeds: Array.isArray(spec.valenceEmbeds) ? spec.valenceEmbeds.map(entry => targetObject.normalizeRuleBase(entry)).filter(Boolean) : [],
          slots: valenceSlots,
          frameFixed: resolvedValenceFrameFixed,
          fixedBy: resolvedValenceFrameFixed ? "issued-current-regex-parse-operation" : "",
          sourceLayer: "valence-frame"
        },
        objectFrame: {
          slots: objectSlots,
          vector: objectVector,
          hasObjectSlots: objectSlots.length > 0,
          slotOwnership: objectSlots.length ? "entrada-object-frame" : "none",
          frameFixed: resolvedValenceFrameFixed,
          sourceLayer: "object-frame"
        },
        routeFrame: {
          routeRecordId: String(routeRecordId || ""),
          routeRankingAllowed: resolvedValenceFrameFixed,
          requiresFixedValenceFrameBeforeFunctionUse: true,
          sourceLayer: "route-frame"
        },
        functionUseFrame: {
          status: "deferred",
          evaluationOrder: "last",
          downstreamOfValenceFrame: true,
          mayAnnotateLicensedReadingsOnly: true,
          consumesValenceObjectStructure: false,
          createsValenceObjectStructure: false,
          relocatesValenceObjectStructure: false,
          reclassifiesValenceObjectStructure: false,
          sourceLayer: "function-use-frame"
        },
        antiConflationRules: Array.from(ENTRADA_GRAMMAR_OBJECT_ANTI_CONFLATION_RULES)
      };
      ISSUED_ENTRADA_GRAMMAR_OBJECTS.add(entradaGrammarObject);
      return entradaGrammarObject;
    }
    function isIssuedEntradaGrammarObject(entradaGrammarObject = null) {
      return Boolean(
        entradaGrammarObject
        && typeof entradaGrammarObject === "object"
        && entradaGrammarObject.kind === "andrews-entrada-grammar-object"
        && ISSUED_ENTRADA_GRAMMAR_OBJECTS.has(entradaGrammarObject)
      );
    }
    function buildEntradaGrammarObjectFromComposerSemantic(semantic = null, options = {}) {
      const spec = buildCanonicalVerbSpecFromComposerSemantic(semantic || {});
      return buildEntradaGrammarObjectFromCanonicalVerbSpec(spec, options);
    }
    function buildEntradaGrammarObjectFromMovingTargetParsed(rawValue = "", movingTargetParsed = null, tiInputMetadata = null, options = {}) {
      const spec = buildCanonicalVerbSpecFromMovingTargetParsed(rawValue, movingTargetParsed, tiInputMetadata);
      return buildEntradaGrammarObjectFromCanonicalVerbSpec(spec, {
        rawInput: rawValue,
        ...options
      });
    }
    function buildCurrentRegexEntradaGrammarObjectSourceFrame(rawValue = "", currentRegexParseOperationFrame = null) {
      const raw = String(rawValue || "").trim();
      const parseFrameMismatch = getCurrentRegexParseOperationMismatch(raw, currentRegexParseOperationFrame);
      const targetFrame = parseFrameMismatch ? null : currentRegexParseOperationFrame?.targetFrame;
      const sourceSignature = JSON.stringify({
        raw,
        parseTargetSignature: currentRegexParseOperationFrame?.targetSignature || ""
      });
      const sourceFrame = Object.freeze({
        kind: "current-regex-entrada-grammar-object-source-frame",
        version: 1,
        routeFamily: "current-regex-parser",
        routeStage: "build-entrada-grammar-object",
        sourceRawInput: raw,
        sourceSignature,
        currentRegexParseOperationFrame: parseFrameMismatch ? null : currentRegexParseOperationFrame,
        currentRegexParseTargetSignature: currentRegexParseOperationFrame?.targetSignature || "",
        currentRegexParseTargetFrameKind: targetFrame?.kind || "",
        sourceCoreText: String(targetFrame?.coreText || ""),
        sourceTransitivity: targetFrame?.transitivity || "",
        blockReason: parseFrameMismatch || "",
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false
      });
      ISSUED_CURRENT_REGEX_ENTRADA_SOURCE_FRAMES.add(sourceFrame);
      return sourceFrame;
    }
    function buildCurrentRegexEntradaGrammarObjectTargetFrame(sourceFrame = null, entradaGrammarObject = null) {
      const blockReason = String(sourceFrame?.blockReason || "");
      if (blockReason || !sourceFrame || sourceFrame.kind !== "current-regex-entrada-grammar-object-source-frame" || !entradaGrammarObject || entradaGrammarObject.kind !== "andrews-entrada-grammar-object") {
        return Object.freeze({
          kind: "current-regex-entrada-grammar-object-target-frame",
          version: 1,
          sourceSignature: sourceFrame?.sourceSignature || "",
          currentRegexParseTargetSignature: sourceFrame?.currentRegexParseTargetSignature || "",
          ok: false,
          blockReason: blockReason || "entrada-grammar-object-target-required",
          targetSignature: JSON.stringify({
            sourceSignature: sourceFrame?.sourceSignature || "",
            ok: false,
            blockReason: blockReason || "entrada-grammar-object-target-required"
          })
        });
      }
      const stemFrame = entradaGrammarObject.stemFrame || {};
      const valenceFrame = entradaGrammarObject.valenceFrame || {};
      const objectFrame = entradaGrammarObject.objectFrame || {};
      const formulaBoundaryFrame = entradaGrammarObject.formulaBoundaryFrame || {};
      const targetFrame = {
        kind: "current-regex-entrada-grammar-object-target-frame",
        version: 1,
        sourceSignature: sourceFrame.sourceSignature,
        currentRegexParseTargetSignature: sourceFrame.currentRegexParseTargetSignature,
        ok: true,
        entradaGrammarObjectKind: entradaGrammarObject.kind,
        rawInput: String(entradaGrammarObject.rawInput || ""),
        matrixStem: String(stemFrame.matrixStem || ""),
        matrixRuleBase: String(stemFrame.matrixRuleBase || ""),
        transitivity: String(valenceFrame.transitivity || ""),
        valenceTokens: Array.isArray(valenceFrame.tokens) ? valenceFrame.tokens.map(token => String(token || "")) : [],
        objectVector: objectFrame.vector && typeof objectFrame.vector === "object" ? {
          ...objectFrame.vector
        } : {},
        valenceFrameFixed: valenceFrame.frameFixed === true,
        formulaEvidencePresent: formulaBoundaryFrame.formulaEvidencePresent === true,
        objectSlotsCovered: formulaBoundaryFrame.objectSlotsCovered === true,
        blockReason: ""
      };
      targetFrame.targetSignature = JSON.stringify({
        sourceSignature: targetFrame.sourceSignature,
        currentRegexParseTargetSignature: targetFrame.currentRegexParseTargetSignature,
        ok: targetFrame.ok,
        rawInput: targetFrame.rawInput,
        matrixStem: targetFrame.matrixStem,
        matrixRuleBase: targetFrame.matrixRuleBase,
        transitivity: targetFrame.transitivity,
        valenceTokens: targetFrame.valenceTokens,
        objectVector: targetFrame.objectVector,
        valenceFrameFixed: targetFrame.valenceFrameFixed,
        formulaEvidencePresent: targetFrame.formulaEvidencePresent,
        objectSlotsCovered: targetFrame.objectSlotsCovered,
        blockReason: targetFrame.blockReason
      });
      return Object.freeze(targetFrame);
    }
    function buildCurrentRegexEntradaGrammarObjectOperationFrame(sourceFrame = null, entradaGrammarObject = null) {
      if (!sourceFrame || sourceFrame.kind !== "current-regex-entrada-grammar-object-source-frame") {
        return null;
      }
      const targetFrame = buildCurrentRegexEntradaGrammarObjectTargetFrame(sourceFrame, entradaGrammarObject);
      if (targetFrame.ok !== true) {
        return null;
      }
      return Object.freeze({
        kind: "andrews-typed-operation-frame",
        operationId: "andrews-current-regex-entrada-grammar-object",
        routeFamily: "current-regex-parser",
        routeStage: "build-entrada-grammar-object",
        operationApplied: "build-entrada-grammar-object-from-typed-current-regex-target",
        sourceFrameKind: sourceFrame.kind,
        sourceSignature: sourceFrame.sourceSignature,
        targetFrame,
        targetSignature: targetFrame.targetSignature,
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false
      });
    }
    function getCurrentRegexEntradaGrammarObjectOperationMismatch(rawValue = "", operationFrame = null) {
      const parseOperationFrame = buildCurrentRegexParseOperationFrameFromRawInput(rawValue);
      const expectedEntradaGrammarObject = buildEntradaGrammarObjectFromCurrentRegexParseOperationFrame(rawValue, parseOperationFrame);
      const expectedOperationFrame = expectedEntradaGrammarObject?.currentRegexEntradaGrammarObjectOperationFrame || null;
      if (!operationFrame || !expectedOperationFrame || operationFrame.kind !== "andrews-typed-operation-frame" || operationFrame.operationId !== expectedOperationFrame.operationId || operationFrame.routeFamily !== expectedOperationFrame.routeFamily || operationFrame.routeStage !== expectedOperationFrame.routeStage || operationFrame.operationApplied !== expectedOperationFrame.operationApplied || operationFrame.sourceFrameKind !== expectedOperationFrame.sourceFrameKind || operationFrame.sourceSignature !== expectedOperationFrame.sourceSignature || operationFrame.consumesRenderedInput !== false || operationFrame.displayStringsAuthorizeGrammar !== false) {
        return "current-regex-entrada-grammar-object-operation-frame-required";
      }
      const targetFrame = operationFrame.targetFrame || null;
      const expectedTargetFrame = expectedOperationFrame.targetFrame || null;
      if (!targetFrame || targetFrame.kind !== expectedTargetFrame.kind || targetFrame.sourceSignature !== expectedTargetFrame.sourceSignature || targetFrame.currentRegexParseTargetSignature !== expectedTargetFrame.currentRegexParseTargetSignature || targetFrame.ok !== expectedTargetFrame.ok || targetFrame.rawInput !== expectedTargetFrame.rawInput || targetFrame.matrixStem !== expectedTargetFrame.matrixStem || targetFrame.matrixRuleBase !== expectedTargetFrame.matrixRuleBase || targetFrame.transitivity !== expectedTargetFrame.transitivity || JSON.stringify(targetFrame.valenceTokens || []) !== JSON.stringify(expectedTargetFrame.valenceTokens || []) || JSON.stringify(targetFrame.objectVector || {}) !== JSON.stringify(expectedTargetFrame.objectVector || {}) || targetFrame.valenceFrameFixed !== expectedTargetFrame.valenceFrameFixed || targetFrame.formulaEvidencePresent !== expectedTargetFrame.formulaEvidencePresent || targetFrame.objectSlotsCovered !== expectedTargetFrame.objectSlotsCovered || targetFrame.blockReason !== expectedTargetFrame.blockReason || targetFrame.targetSignature !== expectedTargetFrame.targetSignature || operationFrame.targetSignature !== expectedTargetFrame.targetSignature) {
        return "current-regex-entrada-grammar-object-contradictory-target-frame";
      }
      return "";
    }
    function buildEntradaGrammarObjectFromCurrentRegexParseOperationFrame(rawValue = "", currentRegexParseOperationFrame = null, tiInputMetadata = null, options = {}) {
      const raw = String(rawValue || "").trim();
      const sourceFrame = buildCurrentRegexEntradaGrammarObjectSourceFrame(raw, currentRegexParseOperationFrame);
      if (sourceFrame.blockReason) {
        return null;
      }
      const operationParsed = buildMovingTargetParsedFromCurrentRegexParseOperationFrame(currentRegexParseOperationFrame);
      const spec = buildCanonicalVerbSpecFromMovingTargetParsed(raw, operationParsed, tiInputMetadata, currentRegexParseOperationFrame);
      const entradaGrammarObject = buildEntradaGrammarObjectFromCanonicalVerbSpec(spec, {
        rawInput: raw,
        ...options,
        currentRegexParseOperationFrame,
        currentRegexEntradaGrammarObjectSourceFrame: sourceFrame
      });
      if (!entradaGrammarObject) {
        return null;
      }
      const operationFrame = buildCurrentRegexEntradaGrammarObjectOperationFrame(sourceFrame, entradaGrammarObject);
      if (!operationFrame) {
        return null;
      }
      entradaGrammarObject.currentRegexEntradaGrammarObjectOperationFrame = operationFrame;
      entradaGrammarObject.currentRegexEntradaGrammarObjectTargetFrame = operationFrame.targetFrame;
      return entradaGrammarObject;
    }
    function getCompoundAstExternalObjectSlotId(index = 0) {
      const numeric = Number(index);
      return `obj${Number.isFinite(numeric) && numeric >= 0 ? numeric + 1 : 1}`;
    }
    function buildCompoundAstExternalObjectSlots(compoundAst = null) {
      const tokens = Array.isArray(compoundAst?.valency?.tokens) ? compoundAst.valency.tokens : [];
      return tokens.map((token, index) => ({
        slotId: getCompoundAstExternalObjectSlotId(index),
        prefix: String(token || ""),
        owner: "source-valence-frame"
      })).filter(slot => slot.prefix);
    }
    function buildCompoundAstRouteFrame(compoundAst = null) {
      if (!compoundAst || typeof compoundAst !== "object") {
        return null;
      }
      const embeds = Array.isArray(compoundAst.embeds) ? compoundAst.embeds : [];
      const lexicalEmbeds = embeds.filter(entry => entry?.kind === "lexical");
      const sourceExternalObjectSlots = buildCompoundAstExternalObjectSlots(compoundAst);
      const remainingExternalObjectSlots = sourceExternalObjectSlots.map(slot => ({
        ...slot,
        owner: "unfixed-matrix-route-frame"
      }));
      const matrixValence = String(compoundAst.valency?.transitivity || "");
      const sourceFormula = lexicalEmbeds.length ? "NNC + VNC = compound VNC" : "VNC + VNC = compound VNC";
      const routeFrame = {
        kind: "andrews-compound-ast-route-frame",
        version: 1,
        sourceFormula,
        andrewsSection: lexicalEmbeds.length ? "Andrews Lesson 30" : "Andrews Lesson 28",
        generationStatus: "diagnostic-only",
        generationAllowed: false,
        sourcePrincipalVnc: {
          role: "matrix",
          stem: String(compoundAst.matrix?.stem || ""),
          ruleBase: String(compoundAst.matrix?.ruleBase || compoundAst.matrix?.stem || ""),
          matrixPosition: "after embed",
          valence: matrixValence,
          externalObjectSlots: sourceExternalObjectSlots.map(slot => ({
            ...slot
          }))
        },
        sourceAdjunctNnc: lexicalEmbeds[0] ? {
          role: String(lexicalEmbeds[0].role || ""),
          stem: String(lexicalEmbeds[0].value || ""),
          source: String(lexicalEmbeds[0].source || "")
        } : null,
        sourceAdjunctNncs: lexicalEmbeds.map(entry => ({
          role: String(entry.role || ""),
          stem: String(entry.value || ""),
          source: String(entry.source || "")
        })),
        sourceEmbeds: embeds.map(entry => ({
          role: String(entry.role || ""),
          kind: String(entry.kind || ""),
          value: String(entry.value || ""),
          source: String(entry.source || "")
        })),
        matrixValence,
        matrixValenceFrameFixed: false,
        embedRole: embeds.length === 1 ? String(embeds[0]?.role || "") : "multiple-parser-embed-roles",
        embedRoleStatus: "parser-role-unresolved-until-route-frame",
        consumedObjectSlot: "",
        consumedObjectSlotOwnedBy: "none",
        valenceDelta: {
          sourceExternalObjectSlotCount: sourceExternalObjectSlots.length,
          consumedObjectSlotCount: 0,
          remainingExternalObjectSlotCount: remainingExternalObjectSlots.length,
          unresolvedUntilValenceFrameFixed: true
        },
        sourceExternalObjectSlots,
        remainingExternalObjectSlots,
        routeFrameLicensesEmbedRole: false,
        routeFrameLicensesObjectSlotOwnership: false,
        finalFormulaShapeDoesNotLicenseRole: true,
        finalFormulaShapeDoesNotLicenseObjectSlots: true,
        functionUseDoesNotLicenseObjectSlots: true,
        sourceRouteFrameRequired: true,
        objectSlotOwnership: {
          kind: "compound-ast-object-slot-ownership-frame",
          matrixValence,
          matrixValenceFrameFixed: false,
          matrixValenceFrameMustBeFixedBeforeObjectSlotOwnership: true,
          routeFrameOwnsObjectSlotLicensing: false,
          routeFrameLicensesObjectSlotOwnership: false,
          sourceExternalObjectSlots: sourceExternalObjectSlots.map(slot => ({
            ...slot
          })),
          remainingExternalObjectSlots: remainingExternalObjectSlots.map(slot => ({
            ...slot
          })),
          consumedObjectSlot: "",
          consumedObjectSlotOwnedBy: "none",
          sourceExternalObjectSlotsOwnedBy: sourceExternalObjectSlots.length ? "source-valence-frame" : "none",
          remainingExternalObjectSlotsOwnedBy: remainingExternalObjectSlots.length ? "unfixed-matrix-route-frame" : "none",
          functionUseOwnsObjectSlots: false,
          finalFormulaShapeOwnsObjectSlots: false,
          functionUseMayAnnotateLicensedReadingsOnly: true
        }
      };
      return routeFrame;
    }
    function buildCompoundAstMetadata({
      sourceRawVerb = "",
      displayVerb = "",
      displayCore = "",
      verb = "",
      analysisVerb = "",
      matrixStem = "",
      matrixRuleBase = "",
      transitivity = "",
      outerValenceTokens = [],
      outerLexicalPrefixes = [],
      structuralOuterPieces = [],
      coreStructuralPrefixParts = [],
      embeddedPrefix = "",
      sourcePrefix = "",
      sourceBase = "",
      verbSegment = "",
      parts = [],
      hasCompoundMarker = false,
      hasSlashMarker = false,
      hasSuffixSeparator = false,
      hasBoundMarker = false,
      hasImpersonalTlaPrefix = false,
      hasSpecificValence = false,
      hasNonspecificValence = false,
      isMarkedTransitive = false,
      isTlaFusion = false,
      valenceSlotCount = 0
    } = {}) {
      const normalizedOuterPieces = (Array.isArray(structuralOuterPieces) ? structuralOuterPieces : []).map((piece, index) => ({
        type: String(piece?.type || ""),
        value: targetObject.normalizeRuleBase(piece?.value || ""),
        index
      })).filter(piece => piece.type && piece.value);
      const normalizedCorePieces = (Array.isArray(coreStructuralPrefixParts) ? coreStructuralPrefixParts : []).map((piece, index) => ({
        type: String(piece?.type || ""),
        value: targetObject.normalizeRuleBase(piece?.value || ""),
        index
      })).filter(piece => piece.type && piece.value);
      const hasCompoundStructure = Boolean(hasCompoundMarker || normalizedCorePieces.some(piece => piece.type === "adjacent-embed") || normalizedOuterPieces.some(piece => piece.type === "lexical"));
      if (!hasCompoundStructure) {
        return null;
      }
      const embeds = [];
      normalizedOuterPieces.forEach(piece => {
        if (piece.type === "directional") {
          return;
        }
        const isLexical = piece.type === "lexical";
        const role = isLexical ? "outer-lexical" : hasImpersonalTlaPrefix ? "impersonal-valence" : "outer-valence";
        embeds.push({
          role,
          kind: piece.type,
          value: piece.value,
          source: "outer",
          index: piece.index,
          explicit: !isLexical
        });
      });
      normalizedCorePieces.filter(piece => piece.type === "adjacent-embed").forEach(piece => {
        embeds.push({
          role: "adjacent-core-embed",
          kind: "lexical",
          value: piece.value,
          source: "core",
          index: piece.index,
          explicit: false
        });
      });
      if (!embeds.length) {
        return null;
      }
      const compoundAst = {
        version: 1,
        kind: "compound",
        matrix: {
          role: "matrix",
          stem: targetObject.normalizeRuleBase(matrixStem || sourceBase || ""),
          ruleBase: targetObject.normalizeRuleBase(matrixRuleBase || sourceBase || matrixStem || "")
        },
        embeds,
        source: {
          rawInput: String(sourceRawVerb || ""),
          displayVerb: String(displayVerb || ""),
          displayCore: String(displayCore || ""),
          verb: String(verb || ""),
          analysisVerb: String(analysisVerb || ""),
          embeddedPrefix: String(embeddedPrefix || ""),
          sourcePrefix: String(sourcePrefix || ""),
          sourceBase: String(sourceBase || ""),
          verbSegment: String(verbSegment || ""),
          parts: Array.isArray(parts) ? parts.filter(Boolean) : []
        },
        valency: {
          transitivity: String(transitivity || ""),
          tokens: (Array.isArray(outerValenceTokens) ? outerValenceTokens : []).filter(Boolean),
          slotCount: Number.isFinite(valenceSlotCount) ? valenceSlotCount : 0,
          hasSpecific: hasSpecificValence === true,
          hasNonspecific: hasNonspecificValence === true,
          isMarkedTransitive: isMarkedTransitive === true,
          isTlaFusion: isTlaFusion === true
        },
        flags: {
          hasCompoundMarker: hasCompoundMarker === true,
          hasSlashMarker: hasSlashMarker === true,
          hasSuffixSeparator: hasSuffixSeparator === true,
          hasBoundMarker: hasBoundMarker === true,
          hasImpersonalTlaPrefix: hasImpersonalTlaPrefix === true
        },
        outerPieces: normalizedOuterPieces,
        corePieces: normalizedCorePieces,
        lexicalPrefixes: (Array.isArray(outerLexicalPrefixes) ? outerLexicalPrefixes : []).map(value => targetObject.normalizeRuleBase(value)).filter(Boolean)
      };
      const compoundRouteFrame = buildCompoundAstRouteFrame(compoundAst);
      compoundAst.sourceRouteFrame = compoundRouteFrame;
      compoundAst.routeFrame = compoundRouteFrame;
      compoundAst.objectSlotOwnership = compoundRouteFrame?.objectSlotOwnership || null;
      return compoundAst;
    }
    function resolveOrdinaryNncParseFixture(value = "") {
      if (typeof targetObject.resolveOrdinaryNncFixture !== "function") {
        return null;
      }
      return targetObject.resolveOrdinaryNncFixture({
        stem: value
      });
    }
    function buildOrdinaryNncParseClassification(role = "", value = "") {
      const normalizedValue = targetObject.normalizeRuleBase(value);
      if (!normalizedValue) {
        return null;
      }
      const candidate = resolveOrdinaryNncParseFixture(normalizedValue);
      if (!candidate || !candidate.fixture) {
        return null;
      }
      return {
        kind: "ordinary-nnc-fixture-classification",
        outputKind: candidate.outputKind || candidate.clauseKind || "nominal-nuclear-clause",
        clauseKind: candidate.clauseKind || "nominal-nuclear-clause",
        role,
        value: normalizedValue,
        normalizedInput: candidate.normalizedInput || normalizedValue,
        fixture: {
          id: candidate.fixture.id || "",
          stem: candidate.fixture.stem || "",
          lemma: candidate.fixture.lemma || "",
          nounClass: candidate.fixture.nounClass || "",
          animacy: candidate.fixture.animacy || "",
          aliases: Array.isArray(candidate.fixture.aliases) ? [...candidate.fixture.aliases] : [],
          sourceRefs: Array.isArray(candidate.fixture.sourceRefs) ? [...candidate.fixture.sourceRefs] : []
        }
      };
    }
    function buildOrdinaryNncFixtureClassifications({
      matrixStem = "",
      lexicalBoundPrefixes = [],
      compoundAst = null
    } = {}) {
      const candidates = [];
      const seen = new Set();
      const addCandidate = (role = "", value = "") => {
        const normalizedValue = targetObject.normalizeRuleBase(value);
        const key = `${role}|${normalizedValue}`;
        if (!role || !normalizedValue || seen.has(key)) {
          return;
        }
        seen.add(key);
        candidates.push({
          role,
          value: normalizedValue
        });
      };
      addCandidate("matrix", matrixStem);
      (Array.isArray(lexicalBoundPrefixes) ? lexicalBoundPrefixes : []).forEach(value => addCandidate("outer-lexical", value));
      (Array.isArray(compoundAst?.embeds) ? compoundAst.embeds : []).filter(entry => entry?.kind === "lexical" && entry?.role).forEach(entry => addCandidate(entry.role, entry.value));
      return candidates.map(candidate => buildOrdinaryNncParseClassification(candidate.role, candidate.value)).filter(Boolean);
    }

    // Universal downstream builder: derives the full verbMeta from a CanonicalVerbSpec.
    // rawValue and rawParsed are optional and used only for display/provenance fields.
    function buildVerbMetaFromCanonicalSpec(spec, rawValue, rawParsed, tiInputMetadata, parseOperationFrame = null) {
      if (!spec) return null;
      const {
        matrixStem,
        matrixRuleBase,
        adjacentEmbed: coreEmbeddedPrefix,
        transitivity,
        valenceTokens: outerValenceTokens,
        valenceEmbeds: outerLexicalPrefixes,
        directionalPrefix,
        supportiveMarker,
        tiCausativeClass
      } = spec;
      const optionalSupportiveLetter = supportiveMarker;
      const hasOptionalSupportiveI = Boolean(optionalSupportiveLetter);
      const lexicalSourcePrefix = outerLexicalPrefixes.join("");
      const isIntransitiveOuterValenceCompound = transitivity === targetObject.COMPOSER_TRANSITIVITY.intransitive && outerValenceTokens.length > 0 && !outerLexicalPrefixes.length && !coreEmbeddedPrefix;
      const isOuterLexicalBoundValence = transitivity !== targetObject.COMPOSER_TRANSITIVITY.intransitive && outerLexicalPrefixes.length > 0 && outerValenceTokens.length > 0 && !coreEmbeddedPrefix;
      const isOuterLexicalBoundValenceWithAdjacentEmbed = transitivity !== targetObject.COMPOSER_TRANSITIVITY.intransitive && outerLexicalPrefixes.length > 0 && outerValenceTokens.length > 0 && Boolean(coreEmbeddedPrefix);
      const embeddedPrefix = isIntransitiveOuterValenceCompound ? outerValenceTokens.join("") : isOuterLexicalBoundValenceWithAdjacentEmbed ? coreEmbeddedPrefix : `${lexicalSourcePrefix}${coreEmbeddedPrefix}`;
      const analysisCore = isIntransitiveOuterValenceCompound ? matrixStem : isOuterLexicalBoundValence ? matrixStem : isOuterLexicalBoundValenceWithAdjacentEmbed ? `${embeddedPrefix}${matrixStem}` : `${outerValenceTokens.join("")}${embeddedPrefix}${matrixStem}`;
      const verbCore = isIntransitiveOuterValenceCompound ? `${embeddedPrefix}${matrixStem}` : transitivity !== targetObject.COMPOSER_TRANSITIVITY.intransitive && outerLexicalPrefixes.length > 0 && outerValenceTokens.length > 0 && (!coreEmbeddedPrefix || isOuterLexicalBoundValenceWithAdjacentEmbed) ? `${lexicalSourcePrefix}${outerValenceTokens.join("")}${coreEmbeddedPrefix}${matrixStem}` : `${analysisCore}`;
      const verb = `${directionalPrefix}${verbCore}`;
      const analysisVerb = analysisCore || verb;
      const rawAnalysisVerb = analysisVerb;
      const exactBaseVerb = targetObject.normalizeRuleBase(matrixRuleBase || matrixStem);
      const hasLeadingDash = transitivity !== targetObject.COMPOSER_TRANSITIVITY.intransitive;
      const dashCount = hasLeadingDash ? 1 : 0;
      const hasDoubleDash = false;
      const baseObjectSlots = transitivity === targetObject.COMPOSER_TRANSITIVITY.bitransitive ? 2 : transitivity === targetObject.COMPOSER_TRANSITIVITY.transitive ? 1 : 0;
      const embeddedSlashObjectSlotSourceFrameCandidate = buildEmbeddedSlashObjectSlotSourceFrame(rawValue, parseOperationFrame, spec);
      const embeddedSlashObjectSlotOperationFrameCandidate = buildEmbeddedSlashObjectSlotOperationFrame(embeddedSlashObjectSlotSourceFrameCandidate);
      const embeddedValenceCount = embeddedSlashObjectSlotOperationFrameCandidate.supported === true ? embeddedSlashObjectSlotOperationFrameCandidate.embeddedValenceCount : 0;
      const embeddedSlashObjectSlotSourceFrame = embeddedValenceCount > 0 ? embeddedSlashObjectSlotSourceFrameCandidate : null;
      const embeddedSlashObjectSlotOperationFrame = embeddedValenceCount > 0 ? embeddedSlashObjectSlotOperationFrameCandidate : null;
      const isMarkedTransitive = baseObjectSlots > 0;
      const isSpecificToken = (token = "") => targetObject.SPECIFIC_VALENCE_PREFIX_SET.has(token);
      const isNonspecificToken = (token = "") => targetObject.NONSPECIFIC_VALENCE_AFFIX_SET.has(token);
      const hasSpecificValence = outerValenceTokens.some(token => isSpecificToken(token));
      const hasNonspecificValence = outerValenceTokens.some(token => isNonspecificToken(token));
      const trailingValenceTokens = outerValenceTokens.slice(1);
      const hasNonactiveSpecificValence = trailingValenceTokens.some(token => isSpecificToken(token));
      const hasNonactiveNonspecificValence = trailingValenceTokens.some(token => isNonspecificToken(token));
      const hasConsecutiveSpecificValences = outerValenceTokens.length >= 2 && outerValenceTokens.every(token => isSpecificToken(token));
      const directionalRuleMode = computeDirectionalRuleModeCore({
        directionalPrefix,
        hasSpecificValence,
        hasNonspecificValence,
        derivationValencyDelta: 0,
        isNonactive: false,
        phase: "resolved"
      });
      const directObjectToken = "";
      const indirectObjectMarker = "";
      const structuralOuterPieces = [...(directionalPrefix ? [{
        type: "directional",
        value: directionalPrefix
      }] : []), ...outerLexicalPrefixes.map(value => ({
        type: "lexical",
        value
      })), ...outerValenceTokens.map(value => ({
        type: "valence",
        value
      }))];
      const coreStructuralPrefixParts = [];
      if (optionalSupportiveLetter) {
        coreStructuralPrefixParts.push({
          type: "supportive",
          value: optionalSupportiveLetter
        });
      }
      if (coreEmbeddedPrefix) {
        coreStructuralPrefixParts.push({
          type: "adjacent-embed",
          value: coreEmbeddedPrefix
        });
      }
      const parts = embeddedPrefix ? [embeddedPrefix, matrixStem].filter(Boolean) : [matrixStem].filter(Boolean);
      const verbSegment = embeddedPrefix ? `${embeddedPrefix}-${matrixStem}` : matrixStem;
      const objectSegment = "";
      const hasCompoundMarker = Boolean(embeddedPrefix) || isIntransitiveOuterValenceCompound;
      const hasSuffixSeparator = Boolean(coreEmbeddedPrefix);
      const hasSlashMarker = Boolean(coreEmbeddedPrefix);
      const hasBoundMarker = isOuterLexicalBoundValence || isOuterLexicalBoundValenceWithAdjacentEmbed;
      const boundPrefixes = isOuterLexicalBoundValence || isOuterLexicalBoundValenceWithAdjacentEmbed ? [...outerLexicalPrefixes, ...outerValenceTokens] : [];
      const boundExplicitFlags = isOuterLexicalBoundValence || isOuterLexicalBoundValenceWithAdjacentEmbed ? [...outerLexicalPrefixes.map(() => false), ...outerValenceTokens.map(() => true)] : [];
      const fusionPrefixes = isIntransitiveOuterValenceCompound ? [] : isOuterLexicalBoundValence || isOuterLexicalBoundValenceWithAdjacentEmbed ? [...outerLexicalPrefixes, ...outerValenceTokens] : outerValenceTokens.slice();
      const isTlaFusion = fusionPrefixes.length > 0 && Boolean(analysisVerb);
      const finalYaAnalysis = targetObject.analyzeFinalYaStructure(exactBaseVerb, {
        isTransitive: isMarkedTransitive
      });
      const normalizedAnalysisVerb = analysisVerb;
      const normalizedVerb = verb;
      const currentRegexShorthandSourceFrame = tiInputMetadata?.currentRegexShorthandSourceFrame || null;
      const currentRegexShorthandOperationFrame = tiInputMetadata?.currentRegexShorthandOperationFrame || null;
      const sourceRawVerb = String(rawValue || "");
      const displayVerb = tiInputMetadata?.displayVerb || (rawParsed ? rawParsed.regexValue : "") || "";
      const displayCore = tiInputMetadata?.displayCore || (rawParsed ? rawParsed.coreText : "") || "";
      const compoundAst = buildCompoundAstMetadata({
        sourceRawVerb,
        displayVerb,
        displayCore,
        verb: normalizedVerb,
        analysisVerb: normalizedAnalysisVerb,
        matrixStem,
        matrixRuleBase: exactBaseVerb,
        transitivity,
        outerValenceTokens,
        outerLexicalPrefixes,
        structuralOuterPieces,
        coreStructuralPrefixParts,
        embeddedPrefix,
        sourcePrefix: lexicalSourcePrefix,
        sourceBase: exactBaseVerb,
        verbSegment,
        parts,
        hasCompoundMarker,
        hasSlashMarker,
        hasSuffixSeparator,
        hasBoundMarker,
        hasImpersonalTlaPrefix: isIntransitiveOuterValenceCompound,
        hasSpecificValence,
        hasNonspecificValence,
        isMarkedTransitive,
        isTlaFusion,
        valenceSlotCount: baseObjectSlots
      });
      const ordinaryNncFixtureClassifications = buildOrdinaryNncFixtureClassifications({
        matrixStem: exactBaseVerb,
        lexicalBoundPrefixes: outerLexicalPrefixes,
        compoundAst
      });
      const entradaGrammarObject = buildEntradaGrammarObjectFromCanonicalVerbSpec(spec, {
        rawInput: sourceRawVerb
      });
      const canonical = {
        parseLanguage: "current-regex",
        verb: normalizedVerb,
        analysisVerb: normalizedAnalysisVerb,
        rawAnalysisVerb,
        ruleBase: exactBaseVerb,
        fullRuleBase: exactBaseVerb,
        hasSlashMarker,
        hasLeadingDash,
        dashCount,
        objectSegment,
        verbSegment,
        objectToken: directObjectToken,
        directObjectToken,
        indirectObjectMarker,
        parts,
        structuralOuterPieces,
        coreStructuralPrefixParts,
        embeddedPrefix,
        boundPrefixes,
        boundExplicitFlags,
        lexicalBoundPrefixes: outerLexicalPrefixes,
        lexicalBoundPrefix: lexicalSourcePrefix,
        fusionPrefixes,
        directionalPrefix,
        directionalPrefixFromSlash: "",
        directionalRuleModeProvisional: directionalRuleMode,
        directionalRuleMode,
        hasImpersonalTlaPrefix: isIntransitiveOuterValenceCompound,
        hasOptionalSupportiveI,
        optionalSupportiveLetter,
        hasSuffixSeparator,
        hasCompoundMarker,
        hasBoundMarker,
        hasSpecificValence,
        hasNonspecificValence,
        hasNonactiveSpecificValence,
        hasNonactiveNonspecificValence,
        hasConsecutiveSpecificValences,
        valenceSlotCount: baseObjectSlots,
        embeddedValenceCount,
        totalValenceSlotCount: baseObjectSlots,
        embeddedSlashObjectSlotSourceFrame,
        embeddedSlashObjectSlotOperationFrame,
        hasFinalYaSuffix: finalYaAnalysis.hasFinalYaSuffix === true,
        finalYaHost: finalYaAnalysis.finalYaHost || "",
        finalYaHostKind: finalYaAnalysis.finalYaHostKind || "",
        bareRootPlusYaBase: finalYaAnalysis.bareRootPlusYaBase || "",
        bareRootPlusYaBasePronounceable: finalYaAnalysis.bareRootPlusYaBasePronounceable || "",
        rootPlusYaBase: finalYaAnalysis.isRootPlusYa ? finalYaAnalysis.bareRootPlusYaBase || "" : "",
        rootPlusYaBasePronounceable: finalYaAnalysis.isRootPlusYa ? finalYaAnalysis.bareRootPlusYaBasePronounceable || "" : "",
        isRootPlusYa: finalYaAnalysis.isRootPlusYa === true,
        isMarkedTransitive,
        isTlaFusion,
        sourcePrefix: lexicalSourcePrefix,
        sourceBase: exactBaseVerb,
        slashCompositeRuleBase: "",
        currentRegexShorthandSourceFrame,
        currentRegexShorthandOperationFrame,
        compoundAst,
        ordinaryNncFixtureClassifications,
        entradaGrammarObject
      };
      const semanticObjectSlotCount = Number.isFinite(tiInputMetadata?.semanticObjectSlotCount) ? Math.max(0, Math.min(targetObject.MAX_OBJECT_SLOTS, Number(tiInputMetadata.semanticObjectSlotCount) || 0)) : baseObjectSlots;
      return {
        parseLanguage: "current-regex",
        sourceRawVerb,
        verb: normalizedVerb,
        analysisVerb: normalizedAnalysisVerb,
        rawAnalysisVerb,
        hasCompoundMarker,
        hasSlashMarker,
        hasSuffixSeparator,
        hasImpersonalTlaPrefix: isIntransitiveOuterValenceCompound,
        hasOptionalSupportiveI,
        optionalSupportiveLetter,
        hasBoundMarker,
        isMarkedTransitive,
        isTlaFusion,
        hasFinalYaSuffix: canonical.hasFinalYaSuffix,
        finalYaHost: canonical.finalYaHost,
        finalYaHostKind: canonical.finalYaHostKind,
        bareRootPlusYaBase: canonical.bareRootPlusYaBase,
        bareRootPlusYaBasePronounceable: canonical.bareRootPlusYaBasePronounceable,
        rootPlusYaBase: canonical.rootPlusYaBase,
        rootPlusYaBasePronounceable: canonical.rootPlusYaBasePronounceable,
        isRootPlusYa: canonical.isRootPlusYa,
        directionalPrefix,
        directionalPrefixFromSlash: "",
        directionalRuleModeProvisional: directionalRuleMode,
        directionalRuleMode,
        hasSpecificValence,
        hasNonspecificValence,
        hasNonactiveSpecificValence,
        hasNonactiveNonspecificValence,
        hasConsecutiveSpecificValences,
        directObjectToken,
        indirectObjectMarker,
        structuralOuterPieces,
        coreStructuralPrefixParts,
        displayVerb,
        displayCore,
        coreText: displayCore,
        dashPrefix: tiInputMetadata?.dashPrefix || (hasLeadingDash ? "-" : ""),
        hasExternalObjectDash: tiInputMetadata?.hasExternalObjectDash === true,
        semanticObjectSlotCount,
        exactBaseVerb,
        hasLeadingDash,
        dashCount,
        hasDoubleDash,
        valenceSlotCount: baseObjectSlots,
        embeddedValenceCount,
        totalValenceSlotCount: baseObjectSlots,
        embeddedSlashObjectSlotSourceFrame,
        embeddedSlashObjectSlotOperationFrame,
        parts,
        embeddedPrefix,
        fusionPrefixes,
        boundPrefixes,
        boundExplicitFlags,
        lexicalBoundPrefixes: outerLexicalPrefixes,
        sourcePrefix: lexicalSourcePrefix,
        sourceBase: exactBaseVerb,
        objectSegment,
        verbSegment,
        objectToken: directObjectToken,
        currentRegexShorthandSourceFrame,
        currentRegexShorthandOperationFrame,
        canonical,
        compoundAst,
        ordinaryNncFixtureClassifications,
        entradaGrammarObject,
        canonicalRuleBase: canonical.ruleBase,
        canonicalFullRuleBase: canonical.fullRuleBase,
        tiCausativeClass
      };
    }
    function buildParsedVerbFromMovingTargetInput(rawValue = "", movingTargetParsed = null, tiInputMetadata = null, parseOperationFrame = null, options = {}) {
      const parseInput = String(options.parseInput || rawValue || "");
      const mismatch = getCurrentRegexParseOperationMismatch(parseInput, parseOperationFrame);
      if (mismatch) {
        return null;
      }
      const operationParsed = buildMovingTargetParsedFromCurrentRegexParseOperationFrame(parseOperationFrame);
      if (!operationParsed || operationParsed.isValid !== true) {
        return null;
      }
      const spec = buildCanonicalVerbSpecFromMovingTargetParsed(rawValue, operationParsed, tiInputMetadata, parseOperationFrame);
      if (!spec) return null;
      const parsedVerb = buildVerbMetaFromCanonicalSpec(spec, rawValue, operationParsed, tiInputMetadata, parseOperationFrame);
      if (!parsedVerb) {
        return null;
      }
      parsedVerb.currentRegexParseOperationFrame = parseOperationFrame;
      if (parsedVerb.canonical && typeof parsedVerb.canonical === "object") {
        parsedVerb.canonical.currentRegexParseOperationFrame = parseOperationFrame;
      }
      return parsedVerb;
    }
    function isVerbValueAllowed(rawValue) {
      return getInvalidVerbCharacters(rawValue).length === 0 && getInvalidVerbLetters(rawValue).length === 0 && !getInvalidVerbStructure(rawValue, {
        allowPartial: true
      });
    }
    function getInputGateRightmostStem(rawValue, parsedVerb = null) {
      if (parsedVerb && typeof parsedVerb.exactBaseVerb === "string" && parsedVerb.exactBaseVerb) {
        return parsedVerb.exactBaseVerb;
      }
      const raw = (targetObject.getRawInputTiCausativeMetadata(rawValue).normalizedInput || String(rawValue || "")).toLowerCase();
      const cleaned = raw.replace(targetObject.COMPOUND_ALLOWED_RE, "").replace(/\s+/g, "");
      const cleanedSupportive = targetObject.hasOptionalSupportiveMarker(cleaned) ? targetObject.replaceOptionalSupportiveMarkersWithLetters(cleaned) : cleaned;
      return getExactBaseVerbFromCleaned(cleanedSupportive);
    }
    function startsWithConsonantCluster(stem) {
      const letters = targetObject.splitVerbLetters(stem);
      return letters.length >= 2 && targetObject.isVerbLetterConsonant(letters[0]) && targetObject.isVerbLetterConsonant(letters[1]);
    }
    function evaluateVerbStemInputGate(rawValue, parsedVerb = null) {
      const stem = getInputGateRightmostStem(rawValue, parsedVerb);
      if (!stem) {
        return {
          stem: "",
          gateStem: "",
          basePronounceable: false,
          supportiveCandidate: "",
          supportivePronounceable: false,
          isValid: false
        };
      }
      // Keep reduplicated inputs aligned with their base stem gate behavior.
      const gateStem = targetObject.getNonReduplicatedRoot(stem) || stem;
      const basePronounceable = targetObject.isSyllableSequencePronounceable(gateStem);
      const letters = targetObject.splitVerbLetters(gateStem);
      const startsWithConsonant = letters.length > 0 && targetObject.isVerbLetterConsonant(letters[0]);
      const startsWithVowel = letters.length > 0 && targetObject.isVerbLetterVowel(letters[0]);
      const hasOptionalSupportiveMarkerFlag = targetObject.hasOptionalSupportiveMarker(rawValue) || Boolean(parsedVerb?.hasOptionalSupportiveI);
      const hasInitialCluster = startsWithConsonantCluster(gateStem);
      const requiresExplicitSupportiveI = hasInitialCluster && !hasOptionalSupportiveMarkerFlag;
      const supportiveCandidate = startsWithConsonant && !startsWithVowel ? `i${gateStem}` : "";
      const supportivePronounceable = supportiveCandidate ? targetObject.isSyllableSequencePronounceable(supportiveCandidate) : false;
      const canUseBaseAsTyped = basePronounceable && !requiresExplicitSupportiveI;
      const canUseSupportiveFallback = supportivePronounceable && !requiresExplicitSupportiveI;
      return {
        stem,
        gateStem,
        basePronounceable: canUseBaseAsTyped,
        supportiveCandidate,
        supportivePronounceable: canUseSupportiveFallback,
        isValid: canUseBaseAsTyped || canUseSupportiveFallback
      };
    }
    function getAuthoritativeDerivationalSourceForRawInputGate({
      tense = "",
      patientivoSource = ""
    } = {}) {
      if (tense === "patientivo" && targetObject.isStrictPatientivoDerivationSource(patientivoSource)) {
        return patientivoSource;
      }
      if (!targetObject.isPatientivoAdjectiveTense(tense)) {
        return "";
      }
      const adjectiveSource = targetObject.getPatientivoAdjectiveSourceForTense(tense);
      return targetObject.isStrictPatientivoDerivationSource(adjectiveSource) ? adjectiveSource : "";
    }

    // === Verb Parsing ===
    const DEFAULT_NONSPECIFIC_VALENCE_AFFIXES = Object.freeze(["tla", "tē", "mo", "ne"]);
    const DEFAULT_NONSPECIFIC_VALENCE_AFFIX_SET = new Set(DEFAULT_NONSPECIFIC_VALENCE_AFFIXES);
    const EXPLICIT_VALENCE_SHORTHAND_MAP = Object.freeze({
      m: "mo"
    });
    function getNonspecificValenceAffixSetForMatching() {
      return targetObject.NONSPECIFIC_VALENCE_AFFIX_SET.size ? targetObject.NONSPECIFIC_VALENCE_AFFIX_SET : DEFAULT_NONSPECIFIC_VALENCE_AFFIX_SET;
    }
    function normalizeExplicitValenceToken(value = "") {
      const normalized = String(value || "").trim().toLowerCase().normalize("NFC").replace(/[^\p{L}]/gu, "");
      if (!normalized) {
        return "";
      }
      const mapped = EXPLICIT_VALENCE_SHORTHAND_MAP[normalized] || normalized;
      return isNonspecificValenceAffixToken(mapped, {
        explicit: true
      }) ? mapped : "";
    }
    function isNonspecificValenceAffixToken(value = "", options = {}) {
      const token = String(value || "").trim().toLowerCase().normalize("NFC").replace(/[^\p{L}]/gu, "");
      if (!token) {
        return false;
      }
      if (getNonspecificValenceAffixSetForMatching().has(token)) {
        return true;
      }
      // "(m)" is an explicit surface shorthand for reflexive mo before a vowel-initial stem.
      if (options.explicit === true && token === "m") {
        return true;
      }
      return false;
    }
    function getExplicitValenceTokenFromSegment(segment = "") {
      const normalized = String(segment || "").trim().toLowerCase();
      const match = normalized.match(/^\(([^)]+)\)(?=[/-]|$)/);
      if (!match) {
        return "";
      }
      return normalizeExplicitValenceToken(match[1] || "");
    }
    function splitCompoundPartsWithExplicitFlags(segment = "") {
      const rawParts = String(segment || "").split(/[|~#\\/?-]/).map(part => String(part || "").trim()).filter(Boolean);
      const parts = [];
      const explicitFlags = [];
      rawParts.forEach(rawPart => {
        const explicitToken = getExplicitValenceTokenFromSegment(rawPart);
        const normalizedPart = explicitToken || rawPart.replace(/[()]/g, "");
        if (!normalizedPart) {
          return;
        }
        parts.push(normalizedPart);
        explicitFlags.push(Boolean(explicitToken));
      });
      return {
        parts,
        explicitFlags
      };
    }
    function isFusionPrefixTokenForParsing(token = "", explicitFlag = false) {
      if (targetObject.FUSION_PREFIXES.has(token)) {
        return !isNonspecificValenceAffixToken(token) || explicitFlag === true;
      }
      return explicitFlag === true && token === "m";
    }
    function isObjectMarkerTokenForParsing(token = "", explicitFlag = false) {
      if (targetObject.OBJECT_MARKERS.has(token)) {
        return !isNonspecificValenceAffixToken(token) || explicitFlag === true;
      }
      return explicitFlag === true && token === "m";
    }
    function getValenceSlotsFromCleaned(cleaned) {
      const slots = [];
      let token = "";
      for (let i = 0; i < cleaned.length; i += 1) {
        const char = cleaned[i];
        if (char === "-") {
          slots.push(token);
          token = "";
          continue;
        }
        token += char;
      }
      return slots;
    }
    function getExactBaseVerbFromCleaned(cleaned) {
      if (!cleaned) {
        return "";
      }
      const segments = cleaned.split(/[-/]/).filter(Boolean);
      if (!segments.length) {
        return "";
      }
      const lastSegment = segments[segments.length - 1];
      const markerRe = targetObject.COMPOUND_MARKER_RE || /[|~#()\[\]\\/?-]/g;
      return lastSegment.replace(markerRe, "");
    }
    function stripLeadingSupportiveLetterFromCoreSurface(coreSurface = "", supportiveMarker = "") {
      const normalizedCoreSurface = String(coreSurface || "").trim().toLowerCase();
      const normalizedSupportiveMarker = targetObject.normalizeSupportiveMarkerValue(supportiveMarker);
      if (!normalizedCoreSurface || !normalizedSupportiveMarker) {
        return normalizedCoreSurface;
      }
      if (!normalizedCoreSurface.startsWith(normalizedSupportiveMarker)) {
        return normalizedCoreSurface;
      }
      return normalizedCoreSurface.slice(normalizedSupportiveMarker.length);
    }
    const SLASH_MATRIX_FUSED_RULEBASES = new Set(["ti"]);
    const SLASH_MATRIX_FUSED_SUFFIXES = Object.freeze(["awi", "iwi", "uwi", "ewi", "awa", "iwa", "uwa", "ewa", "wi", "wa"]);
    function shouldFuseSlashMatrixRuleBase(matrixBase = "") {
      if (!matrixBase) {
        return false;
      }
      if (SLASH_MATRIX_FUSED_RULEBASES.has(matrixBase)) {
        return true;
      }
      return SLASH_MATRIX_FUSED_SUFFIXES.some(suffix => matrixBase.endsWith(suffix));
    }
    function getLexicalBoundPrefixes(boundPrefixes = [], boundExplicitFlags = []) {
      const explicitFlags = Array.isArray(boundExplicitFlags) ? boundExplicitFlags : [];
      return (Array.isArray(boundPrefixes) ? boundPrefixes : []).map(prefix => getBracketDirectionalPrefixToken(String(prefix || "")) || String(prefix || "")).map(prefix => targetObject.normalizeRuleBase(prefix)).filter((prefix, index) => {
        if (!prefix) {
          return false;
        }
        if (isDirectionalPrefixToken(prefix)) {
          return false;
        }
        if (targetObject.SPECIFIC_VALENCE_PREFIX_SET.has(prefix)) {
          return false;
        }
        const explicitFlag = explicitFlags[index] === true;
        if (explicitFlag && isNonspecificValenceAffixToken(prefix, {
          explicit: true
        })) {
          return false;
        }
        return true;
      });
    }
    function getExplicitBoundNonspecificPrefixes(boundPrefixes = [], boundExplicitFlags = []) {
      const explicitFlags = Array.isArray(boundExplicitFlags) ? boundExplicitFlags : [];
      return (Array.isArray(boundPrefixes) ? boundPrefixes : []).map(prefix => getBracketDirectionalPrefixToken(String(prefix || "")) || String(prefix || "")).map(prefix => targetObject.normalizeRuleBase(prefix)).filter((prefix, index) => {
        if (!prefix) {
          return false;
        }
        if (isDirectionalPrefixToken(prefix)) {
          return false;
        }
        return explicitFlags[index] === true && isNonspecificValenceAffixToken(prefix, {
          explicit: true
        });
      });
    }
    function getSlashMatrixCompositeRuleBase({
      hasSlashMarker = false,
      hasBoundMarker = false,
      hasImpersonalTlaPrefix = false,
      boundPrefixes = [],
      boundExplicitFlags = [],
      analysisVerb = "",
      sourceVerb = ""
    } = {}) {
      if (!hasSlashMarker || !hasBoundMarker || hasImpersonalTlaPrefix) {
        return "";
      }
      const matrixBase = targetObject.normalizeRuleBase(analysisVerb || sourceVerb || "");
      if (!shouldFuseSlashMatrixRuleBase(matrixBase)) {
        return "";
      }
      const lexicalBoundPrefixes = getLexicalBoundPrefixes(boundPrefixes, boundExplicitFlags);
      if (!lexicalBoundPrefixes.length) {
        return "";
      }
      return `${lexicalBoundPrefixes.join("")}${matrixBase}`;
    }
    function resolveCanonicalSourceSplit(verbMeta = {}, {
      verb = "",
      analysisVerb = ""
    } = {}) {
      const meta = verbMeta || {};
      const sourceVerb = String(verb || meta.verb || "");
      const sourceAnalysis = String(analysisVerb || meta.analysisVerb || sourceVerb);
      const parseLanguage = String(meta.parseLanguage || meta.inputLanguage || meta.canonical?.parseLanguage || meta.canonical?.inputLanguage || "");
      if (parseLanguage === "current-regex") {
        const lexicalBoundPrefixes = Array.isArray(meta.lexicalBoundPrefixes) ? meta.lexicalBoundPrefixes.filter(Boolean) : Array.isArray(meta.canonical?.lexicalBoundPrefixes) ? meta.canonical.lexicalBoundPrefixes.filter(Boolean) : [];
        const lexicalBoundPrefix = lexicalBoundPrefixes.join("");
        const sourcePrefix = String(meta.sourcePrefix || meta.canonical?.sourcePrefix || lexicalBoundPrefix || "");
        const sourceBase = targetObject.normalizeRuleBase(meta.sourceBase || meta.canonical?.sourceBase || meta.exactBaseVerb || meta.canonicalRuleBase || meta.canonical?.ruleBase || sourceAnalysis || sourceVerb || "");
        return {
          sourceVerb,
          sourceAnalysis,
          hasSlashMarker: false,
          hasBoundMarker: meta.hasBoundMarker === true || Array.isArray(meta.boundPrefixes) && meta.boundPrefixes.length > 0,
          hasImpersonalTlaPrefix: meta.hasImpersonalTlaPrefix === true,
          directionalPrefix: String(meta.directionalPrefix || meta.canonical?.directionalPrefix || ""),
          directionalPrefixFromSlash: "",
          boundPrefixes: Array.isArray(meta.boundPrefixes) ? meta.boundPrefixes : [],
          boundExplicitFlags: Array.isArray(meta.boundExplicitFlags) ? meta.boundExplicitFlags : [],
          lexicalBoundPrefixes,
          lexicalBoundPrefix,
          sourcePrefix,
          matrixBase: sourceBase,
          slashCompositeBase: "",
          sourceBase
        };
      }
      const hasSlashMarker = meta.hasSlashMarker === true;
      const hasBoundMarker = meta.hasBoundMarker === true || Array.isArray(meta.boundPrefixes) && meta.boundPrefixes.length > 0;
      const hasImpersonalTlaPrefix = meta.hasImpersonalTlaPrefix === true;
      const boundPrefixes = Array.isArray(meta.boundPrefixes) ? meta.boundPrefixes : [];
      const boundExplicitFlags = Array.isArray(meta.boundExplicitFlags) ? meta.boundExplicitFlags : [];
      const directionalPrefix = String(meta.directionalPrefix || "");
      const directionalPrefixFromSlash = String(meta.directionalPrefixFromSlash || meta.canonical && meta.canonical.directionalPrefixFromSlash || "");
      const lexicalBoundPrefixes = getLexicalBoundPrefixes(boundPrefixes, boundExplicitFlags);
      const lexicalBoundPrefix = lexicalBoundPrefixes.join("");
      const fusionPrefixes = Array.isArray(meta.fusionPrefixes) ? meta.fusionPrefixes : [];
      const grammaticalPrefixes = fusionPrefixes.filter(Boolean);
      if (meta.indirectObjectMarker && !grammaticalPrefixes.includes(meta.indirectObjectMarker)) {
        grammaticalPrefixes.push(meta.indirectObjectMarker);
      }
      if (meta.directObjectToken && !grammaticalPrefixes.includes(meta.directObjectToken)) {
        grammaticalPrefixes.push(meta.directObjectToken);
      }
      const includeDirectionalFromSlash = Boolean(directionalPrefix && directionalPrefixFromSlash && directionalPrefixFromSlash === directionalPrefix);
      const sourcePrefixParts = includeDirectionalFromSlash ? [directionalPrefix, ...lexicalBoundPrefixes] : lexicalBoundPrefixes;
      const sourcePrefix = sourcePrefixParts.join("");
      const matrixBase = targetObject.normalizeRuleBase(sourceAnalysis || sourceVerb || "");
      const slashCompositeBase = getSlashMatrixCompositeRuleBase({
        hasSlashMarker,
        hasBoundMarker,
        hasImpersonalTlaPrefix,
        boundPrefixes,
        boundExplicitFlags,
        analysisVerb: sourceAnalysis || sourceVerb || "",
        sourceVerb: sourceVerb || sourceAnalysis || ""
      });
      return {
        sourceVerb,
        sourceAnalysis,
        hasSlashMarker,
        hasBoundMarker,
        hasImpersonalTlaPrefix,
        directionalPrefix,
        directionalPrefixFromSlash,
        boundPrefixes,
        boundExplicitFlags,
        lexicalBoundPrefixes,
        lexicalBoundPrefix,
        sourcePrefix,
        matrixBase,
        slashCompositeBase,
        sourceBase: slashCompositeBase || targetObject.stripLeadingPrefixes(matrixBase, grammaticalPrefixes)
      };
    }
    function getEmbeddedVerbPrefixFromParts(parts = []) {
      const list = Array.isArray(parts) ? parts : [];
      if (list.length <= 1) {
        return "";
      }
      const prefixParts = list.slice(0, -1).filter(part => part && !isDirectionalPrefixToken(part));
      return prefixParts.length ? prefixParts.join("") : "";
    }
    function getValenceCategoryFromToken(token) {
      if (!token) {
        return "specific";
      }
      const explicitValenceToken = getExplicitValenceTokenFromSegment(token);
      if (explicitValenceToken && isNonspecificValenceAffixToken(explicitValenceToken, {
        explicit: true
      })) {
        return "nonspecific";
      }
      const parts = token.split(targetObject.COMPOUND_MARKER_SPLIT_RE).filter(Boolean);
      const suffix = parts.length ? parts[parts.length - 1] : "";
      if (!suffix) {
        return "specific";
      }
      if (isNonspecificValenceAffixToken(suffix)) {
        return "embedded";
      }
      if (targetObject.SPECIFIC_VALENCE_PREFIX_SET.has(suffix)) {
        return "specific";
      }
      return "embedded";
    }
    function hasConsecutiveSpecificValences(valenceSlots) {
      let prevCategory = "";
      for (let i = 0; i < valenceSlots.length; i += 1) {
        const category = getValenceCategoryFromToken(valenceSlots[i]);
        if (category === "embedded") {
          continue;
        }
        if (prevCategory === "specific" && category === "specific") {
          return true;
        }
        prevCategory = category;
      }
      return false;
    }
    function computeDirectionalRuleModeCore({
      directionalPrefix = "",
      hasSpecificValence = false,
      hasNonspecificValence = false,
      derivationValencyDelta = 0,
      isNonactive = false,
      phase = "resolved"
    }) {
      if (!directionalPrefix || !isDirectionalPrefixToken(directionalPrefix)) {
        return "";
      }
      if (hasSpecificValence) {
        return "transitive";
      }
      if (phase === "resolved" && !isNonactive && derivationValencyDelta > 0) {
        return "transitive";
      }
      if (hasNonspecificValence) {
        return "nonspecific";
      }
      return "intransitive";
    }
    function resolveDirectionalRuleMode(parsedVerb, options = {}) {
      if (!parsedVerb) {
        return "";
      }
      const directionalPrefix = parsedVerb.directionalPrefix || "";
      const isNonactive = options.isNonactive === true;
      const derivationType = Object.values(targetObject.DERIVATION_TYPE).includes(options.derivationType) ? options.derivationType : parsedVerb.derivationType || "";
      const derivationDelta = Number.isFinite(parsedVerb.derivationValencyDelta) ? parsedVerb.derivationValencyDelta : targetObject.getDerivationValencyDelta(derivationType);
      const hasSpecificValence = isNonactive ? parsedVerb.hasNonactiveSpecificValence : parsedVerb.hasSpecificValence;
      const hasNonspecificValence = isNonactive ? parsedVerb.hasNonactiveNonspecificValence : parsedVerb.hasNonspecificValence;
      const resolvedMode = computeDirectionalRuleModeCore({
        directionalPrefix,
        hasSpecificValence,
        hasNonspecificValence,
        derivationValencyDelta: derivationDelta,
        isNonactive,
        phase: "resolved"
      });
      parsedVerb.directionalRuleModeResolved = resolvedMode;
      parsedVerb.directionalRuleMode = resolvedMode;
      return resolvedMode;
    }
    function getDirectionalRulesForPrefix(prefix, stage) {
      if (!prefix) {
        return [];
      }
      const rules = targetObject.DIRECTIONAL_RULES.length ? targetObject.DIRECTIONAL_RULES : targetObject.DEFAULT_DIRECTIONAL_RULES;
      return rules.filter(rule => {
        if (!rule || rule.enabled === false) {
          return false;
        }
        if (!Array.isArray(rule.prefixes) || !rule.prefixes.includes(prefix)) {
          return false;
        }
        if (!stage) {
          return true;
        }
        return Array.isArray(rule.stages) && rule.stages.includes(stage);
      });
    }
    function applyDirectionalRules(context, stage) {
      let next = {
        ...context
      };
      const rules = getDirectionalRulesForPrefix(next.directionalInputPrefix, stage);
      rules.forEach(rule => {
        if (next.isNounTense && rule.applyToNouns === false) {
          return;
        }
        if (!next.isNounTense && rule.applyToVerbs === false) {
          return;
        }
        const handler = DIRECTIONAL_RULE_HANDLERS.get(rule.handler);
        if (handler) {
          const updated = handler(next, rule, stage);
          if (updated) {
            next = updated;
          }
        }
      });
      return next;
    }
    function applyHualDirectionalRule(context, rule, stage) {
      let {
        subjectPrefix,
        objectPrefix,
        verb,
        directionalPlan,
        directionalOutputPrefix,
        directionalInputPrefix,
        baseSubjectPrefix,
        baseSubjectSuffix,
        baseObjectPrefix,
        isIntransitiveVerb,
        hasSubjectValent,
        isTlaFusion,
        indirectObjectMarker,
        forceTransitiveDirectional,
        forceIntransitiveDirectional,
        forceNonspecificDirectional,
        directionalRuleMode,
        tense,
        thirdObjectMarker,
        isNounTense
      } = context;
      if (stage === "prefix") {
        directionalPlan = targetObject.buildHualDirectionalPlan({
          directionalOutputPrefix,
          pers1Base: baseSubjectPrefix,
          obj1Base: baseObjectPrefix,
          obj2: indirectObjectMarker,
          obj3: thirdObjectMarker,
          directionalRuleMode,
          hasSubjectValent,
          isTlaFusion,
          isIntransitiveVerb
        });
        directionalOutputPrefix = directionalPlan.directionalOutputPrefix;
      }
      if (stage === "post-elision" && !isNounTense && verb.startsWith(directionalInputPrefix)) {
        verb = verb.slice(directionalInputPrefix.length);
      }
      return {
        ...context,
        subjectPrefix,
        objectPrefix,
        verb,
        directionalPlan,
        directionalOutputPrefix
      };
    }
    function applyHualNounPlacement(context) {
      if (!context.isNounTense) {
        return context;
      }
      if (context.directionalInputPrefix !== "huāl") {
        return context;
      }
      const nounObjectPrefixes = new Set(["tla", "tē", "mo"]);
      if (!nounObjectPrefixes.has(context.objectPrefix)) {
        return context;
      }
      const verb = context.verb || "";
      if (!verb.startsWith("huāl")) {
        return context;
      }
      const stem = verb.slice("huāl".length);
      if (!stem) {
        return context;
      }
      return {
        ...context,
        objectPrefix: `huāl${context.objectPrefix}`,
        verb: stem
      };
    }
    const DIRECTIONAL_RULE_HANDLERS = new Map([["hual-placement", applyHualDirectionalRule], ["hual-noun-placement", applyHualNounPlacement]]);
    function buildCurrentRegexShorthandSourceFrame(rawValue = "") {
      const raw = String(rawValue || "").trim();
      const protectedSupportives = raw.replace(/\[[iy]\]/gi, "__supportive__");
      const hasQuestion = raw.includes("?");
      const hasFormulaEnvelopeCharacters = /[()[\]+]/.test(protectedSupportives);
      const hasSlashBoundary = protectedSupportives.includes("/");
      const hasLeadingDash = raw.startsWith("-");
      const bare = hasLeadingDash ? raw.slice(1).trim() : raw;
      const normalizedBare = bare && !bare.startsWith("-") ? normalizeRegexSpecialSerialShorthandCore(bare) : "";
      const targetInput = normalizedBare ? `${hasLeadingDash ? "-" : ""}(${normalizedBare})` : "";
      let blockReason = "";
      if (!raw) {
        blockReason = "empty-source";
      } else if (hasQuestion) {
        blockReason = "search-source";
      } else if (hasFormulaEnvelopeCharacters) {
        blockReason = "already-formula-envelope";
      } else if (hasSlashBoundary) {
        blockReason = "boundary-present";
      } else if (!bare) {
        blockReason = "missing-core";
      } else if (bare.startsWith("-")) {
        blockReason = "double-dash-source";
      } else if (!targetInput) {
        blockReason = "missing-target-input";
      }
      return {
        kind: "current-regex-shorthand-source-frame",
        version: 1,
        routeOperation: "current-regex-shorthand-envelope-realization",
        sourceLayer: "original-current-regex-input",
        sourceRawInput: raw,
        protectedSourceInput: protectedSupportives,
        hasQuestion,
        hasFormulaEnvelopeCharacters,
        hasSlashBoundary,
        hasLeadingDash,
        bareCore: bare,
        normalizedBareCore: normalizedBare,
        targetInput,
        targetFrame: targetInput ? {
          kind: "current-regex-shorthand-target-frame",
          regexInput: targetInput,
          normalizedCore: normalizedBare,
          transitivity: hasLeadingDash ? targetObject.COMPOSER_TRANSITIVITY.transitive : targetObject.COMPOSER_TRANSITIVITY.intransitive
        } : null,
        blockReason,
        supported: !blockReason
      };
    }
    function buildCurrentRegexShorthandOperationFrame(sourceFrame = null, targetFrame = null) {
      if (!sourceFrame || sourceFrame.kind !== "current-regex-shorthand-source-frame") {
        return {
          kind: "andrews-current-regex-shorthand-operation-frame",
          version: 1,
          status: "blocked",
          blockReason: "missing-source-frame",
          supported: false
        };
      }
      if (sourceFrame.routeOperation !== "current-regex-shorthand-envelope-realization") {
        return {
          kind: "andrews-current-regex-shorthand-operation-frame",
          version: 1,
          sourceFrame,
          status: "blocked",
          blockReason: "contradictory-route-operation",
          supported: false
        };
      }
      if (sourceFrame.supported !== true || sourceFrame.blockReason) {
        return {
          kind: "andrews-current-regex-shorthand-operation-frame",
          version: 1,
          sourceFrame,
          status: "blocked",
          blockReason: sourceFrame.blockReason || "unsupported-source-frame",
          supported: false
        };
      }
      const expectedTarget = sourceFrame.targetFrame || null;
      const resolvedTarget = targetFrame || expectedTarget;
      if (!resolvedTarget || resolvedTarget.kind !== "current-regex-shorthand-target-frame") {
        return {
          kind: "andrews-current-regex-shorthand-operation-frame",
          version: 1,
          sourceFrame,
          targetFrame: resolvedTarget || null,
          status: "blocked",
          blockReason: "missing-target-frame",
          supported: false
        };
      }
      if (resolvedTarget.regexInput !== sourceFrame.targetInput) {
        return {
          kind: "andrews-current-regex-shorthand-operation-frame",
          version: 1,
          sourceFrame,
          targetFrame: resolvedTarget,
          status: "blocked",
          blockReason: "contradictory-target-frame",
          supported: false
        };
      }
      return {
        kind: "andrews-current-regex-shorthand-operation-frame",
        version: 1,
        routeOperation: "current-regex-shorthand-envelope-realization",
        sourceFrame,
        targetFrame: resolvedTarget,
        targetInput: resolvedTarget.regexInput,
        status: "authorized",
        supported: true
      };
    }
    function getCurrentRegexShorthandFrameMismatch(rawValue = "", operationFrame = null) {
      const sourceFrame = buildCurrentRegexShorthandSourceFrame(rawValue);
      if (!operationFrame || operationFrame.kind !== "andrews-current-regex-shorthand-operation-frame") {
        return "missing-operation-frame";
      }
      if (operationFrame.status !== "authorized" || operationFrame.supported !== true) {
        return operationFrame.blockReason || "blocked-operation-frame";
      }
      if (!operationFrame.sourceFrame || operationFrame.sourceFrame.kind !== sourceFrame.kind) {
        return "missing-source-frame";
      }
      if (operationFrame.sourceFrame.sourceRawInput !== sourceFrame.sourceRawInput) {
        return "contradictory-source-frame";
      }
      if (operationFrame.sourceFrame.routeOperation !== sourceFrame.routeOperation) {
        return "contradictory-route-operation";
      }
      if (operationFrame.sourceFrame.targetInput !== sourceFrame.targetInput) {
        return "contradictory-source-target-frame";
      }
      if (!operationFrame.targetFrame || operationFrame.targetFrame.kind !== "current-regex-shorthand-target-frame") {
        return "missing-target-frame";
      }
      if (operationFrame.targetFrame.regexInput !== sourceFrame.targetInput) {
        return "contradictory-target-frame";
      }
      if (operationFrame.targetInput !== sourceFrame.targetInput) {
        return "contradictory-operation-target";
      }
      if (sourceFrame.supported !== true || sourceFrame.blockReason) {
        return sourceFrame.blockReason || "unsupported-source-frame";
      }
      return "";
    }
    function getCurrentRegexShorthandParseInput(rawValue = "", operationFrame = null) {
      const mismatch = getCurrentRegexShorthandFrameMismatch(rawValue, operationFrame);
      if (mismatch) {
        return "";
      }
      return String(operationFrame.targetFrame.regexInput || "");
    }
    function getCurrentRegexShorthandParseInputFromSourceFrame(rawValue = "") {
      const sourceFrame = buildCurrentRegexShorthandSourceFrame(rawValue);
      const operationFrame = buildCurrentRegexShorthandOperationFrame(sourceFrame);
      return getCurrentRegexShorthandParseInput(rawValue, operationFrame);
    }
    function buildEmptyParsedVerb(rawValue = "", tiInputMetadata = null) {
      const displayVerb = String(tiInputMetadata?.displayVerb || rawValue || "");
      const displayCore = String(tiInputMetadata?.displayCore || "");
      const sourceRawVerb = String(rawValue || "");
      const tiCausativeClass = String(tiInputMetadata?.tiCausativeClass || "");
      const dashPrefix = String(tiInputMetadata?.dashPrefix || "");
      const semanticObjectSlotCount = Number.isFinite(tiInputMetadata?.semanticObjectSlotCount) ? Math.max(0, Math.min(targetObject.MAX_OBJECT_SLOTS, Number(tiInputMetadata.semanticObjectSlotCount) || 0)) : 0;
      const canonical = {
        parseLanguage: "current-regex",
        verb: "",
        analysisVerb: "",
        rawAnalysisVerb: "",
        ruleBase: "",
        fullRuleBase: "",
        hasSlashMarker: false,
        hasLeadingDash: dashPrefix === "-",
        dashCount: dashPrefix === "-" ? 1 : 0,
        objectSegment: "",
        verbSegment: "",
        objectToken: "",
        directObjectToken: "",
        indirectObjectMarker: "",
        parts: [],
        embeddedPrefix: "",
        boundPrefixes: [],
        boundExplicitFlags: [],
        lexicalBoundPrefixes: [],
        lexicalBoundPrefix: "",
        fusionPrefixes: [],
        directionalPrefix: "",
        directionalPrefixFromSlash: "",
        directionalRuleModeProvisional: "",
        directionalRuleMode: "",
        hasImpersonalTlaPrefix: false,
        hasOptionalSupportiveI: false,
        optionalSupportiveLetter: "",
        hasSuffixSeparator: false,
        hasCompoundMarker: false,
        hasBoundMarker: false,
        hasSpecificValence: false,
        hasNonspecificValence: false,
        hasNonactiveSpecificValence: false,
        hasNonactiveNonspecificValence: false,
        hasConsecutiveSpecificValences: false,
        valenceSlotCount: semanticObjectSlotCount,
        embeddedValenceCount: 0,
        totalValenceSlotCount: semanticObjectSlotCount,
        hasFinalYaSuffix: false,
        finalYaHost: "",
        finalYaHostKind: "",
        bareRootPlusYaBase: "",
        bareRootPlusYaBasePronounceable: "",
        rootPlusYaBase: "",
        rootPlusYaBasePronounceable: "",
        isRootPlusYa: false,
        isMarkedTransitive: semanticObjectSlotCount > 0,
        isTlaFusion: false,
        sourcePrefix: "",
        sourceBase: "",
        slashCompositeRuleBase: "",
        compoundAst: null,
        ordinaryNncFixtureClassifications: []
      };
      return {
        parseLanguage: "current-regex",
        sourceRawVerb,
        verb: "",
        analysisVerb: "",
        rawAnalysisVerb: "",
        hasCompoundMarker: false,
        hasSlashMarker: false,
        hasSuffixSeparator: false,
        hasImpersonalTlaPrefix: false,
        hasOptionalSupportiveI: false,
        optionalSupportiveLetter: "",
        hasBoundMarker: false,
        isMarkedTransitive: semanticObjectSlotCount > 0,
        isTlaFusion: false,
        hasFinalYaSuffix: false,
        finalYaHost: "",
        finalYaHostKind: "",
        bareRootPlusYaBase: "",
        bareRootPlusYaBasePronounceable: "",
        rootPlusYaBase: "",
        rootPlusYaBasePronounceable: "",
        isRootPlusYa: false,
        directionalPrefix: "",
        directionalPrefixFromSlash: "",
        directionalRuleModeProvisional: "",
        directionalRuleMode: "",
        hasSpecificValence: false,
        hasNonspecificValence: false,
        hasNonactiveSpecificValence: false,
        hasNonactiveNonspecificValence: false,
        hasConsecutiveSpecificValences: false,
        directObjectToken: "",
        indirectObjectMarker: "",
        displayVerb,
        displayCore,
        coreText: displayCore,
        dashPrefix,
        hasExternalObjectDash: tiInputMetadata?.hasExternalObjectDash === true,
        semanticObjectSlotCount,
        exactBaseVerb: "",
        hasLeadingDash: dashPrefix === "-",
        dashCount: dashPrefix === "-" ? 1 : 0,
        hasDoubleDash: false,
        valenceSlotCount: semanticObjectSlotCount,
        embeddedValenceCount: 0,
        totalValenceSlotCount: semanticObjectSlotCount,
        parts: [],
        embeddedPrefix: "",
        fusionPrefixes: [],
        boundPrefixes: [],
        boundExplicitFlags: [],
        lexicalBoundPrefixes: [],
        sourcePrefix: "",
        sourceBase: "",
        objectSegment: "",
        verbSegment: "",
        objectToken: "",
        canonical,
        compoundAst: null,
        ordinaryNncFixtureClassifications: [],
        canonicalRuleBase: "",
        canonicalFullRuleBase: "",
        tiCausativeClass
      };
    }
    function parseVerbInput(value) {
      const sourceRawVerb = String(value || "");
      const tiInputMetadata = targetObject.getRawInputTiCausativeMetadata(sourceRawVerb);
      const currentRegexParseSourceFrame = buildCurrentRegexParseSourceFrame(sourceRawVerb);
      const currentRegexParseOperationFrame = buildCurrentRegexParseOperationFrame(currentRegexParseSourceFrame);
      const movingTargetParsed = buildMovingTargetParsedFromCurrentRegexParseOperationFrame(currentRegexParseOperationFrame);
      if (movingTargetParsed?.isValid) {
        const directParsed = buildParsedVerbFromMovingTargetInput(sourceRawVerb, movingTargetParsed, tiInputMetadata, currentRegexParseOperationFrame);
        if (directParsed) {
          return directParsed;
        }
      }
      const shorthandSourceFrame = buildCurrentRegexShorthandSourceFrame(sourceRawVerb);
      const shorthandOperationFrame = buildCurrentRegexShorthandOperationFrame(shorthandSourceFrame);
      const shorthandInput = getCurrentRegexShorthandParseInput(sourceRawVerb, shorthandOperationFrame);
      if (shorthandInput) {
        const shorthandParseSourceFrame = buildCurrentRegexParseSourceFrame(shorthandInput);
        const shorthandParseOperationFrame = buildCurrentRegexParseOperationFrame(shorthandParseSourceFrame);
        const shorthandParsed = buildMovingTargetParsedFromCurrentRegexParseOperationFrame(shorthandParseOperationFrame);
        if (shorthandParsed?.isValid) {
          const shorthandMetadata = {
            ...tiInputMetadata,
            normalizedBase: shorthandParsed.regexValue,
            normalizedInput: shorthandParsed.regexValue,
            displayVerb: tiInputMetadata.displayVerb || sourceRawVerb,
            displayCore: tiInputMetadata.displayCore || shorthandParsed.coreText || "",
            dashPrefix: tiInputMetadata.dashPrefix || (shorthandParsed.transitivity === targetObject.COMPOSER_TRANSITIVITY.intransitive ? "" : "-"),
            currentRegexShorthandSourceFrame: shorthandSourceFrame,
            currentRegexShorthandOperationFrame: shorthandOperationFrame,
            hasExternalObjectDash: tiInputMetadata.hasExternalObjectDash === true || shorthandParsed.transitivity !== targetObject.COMPOSER_TRANSITIVITY.intransitive,
            semanticObjectSlotCount: Number.isFinite(tiInputMetadata.semanticObjectSlotCount) ? tiInputMetadata.semanticObjectSlotCount : shorthandParsed.transitivity === targetObject.COMPOSER_TRANSITIVITY.bitransitive ? 2 : shorthandParsed.transitivity === targetObject.COMPOSER_TRANSITIVITY.transitive ? 1 : 0
          };
          const directParsed = buildParsedVerbFromMovingTargetInput(sourceRawVerb, shorthandParsed, shorthandMetadata, shorthandParseOperationFrame, {
            parseInput: shorthandInput
          });
          if (directParsed) {
            return directParsed;
          }
        }
      }
      return buildEmptyParsedVerb(sourceRawVerb, tiInputMetadata);
    }
    function getParsedSyllableAnalysisTarget(rawVerb, options = {}) {
      const parsed = parseVerbInput(rawVerb);
      const target = options.analysis ? parsed.analysisVerb : parsed.verb;
      return targetObject.applySyllableAnalysisTargetOptions(target, options);
    }

    // === Suppletive Stem Paths ===

    function startsWithClassicalVelarSeries(raw) {
      const letters = targetObject.splitVerbLetters(String(raw || ""));
      const first = letters[0] || "";
      return first === "c" || first === "qu" || first === "cu";
    }
    function getDisambiguationPrefixCandidates(core) {
      const candidates = new Set();
      const normalized = String(core || "");
      if (!normalized) {
        return [];
      }
      CLASSICAL_DIRECTIONAL_PREFIXES.forEach(prefix => {
        if (normalized.startsWith(prefix) && normalized.length > prefix.length) {
          candidates.add(prefix);
        }
      });
      targetObject.NONSPECIFIC_VALENCE_PREFIXES.forEach(prefix => {
        if (normalized.startsWith(prefix) && normalized.length > prefix.length) {
          candidates.add(prefix);
        }
      });
      return Array.from(candidates).sort((a, b) => b.length - a.length);
    }
    function getDisambiguationAffixCandidates(core) {
      const candidates = new Set();
      const normalized = String(core || "");
      if (!normalized) {
        return [];
      }
      targetObject.NONSPECIFIC_VALENCE_AFFIXES.forEach(affix => {
        if (normalized.startsWith(affix) && normalized.length > affix.length) {
          candidates.add(affix);
        }
      });
      return Array.from(candidates).sort((a, b) => b.length - a.length);
    }
    function getDisambiguationSuffixCandidates(core) {
      const normalized = String(core || "");
      if (!normalized) {
        return [];
      }
      const suffixes = ["kwi", "kwa"];
      const candidates = [];
      suffixes.forEach(suffix => {
        if (!normalized.endsWith(suffix)) {
          return;
        }
        const prefix = normalized.slice(0, -suffix.length);
        if (prefix.length < 2) {
          return;
        }
        candidates.push({
          prefix,
          suffix
        });
      });
      return candidates;
    }
    function getDisambiguationKnownSuffixCandidates(core, options = {}) {
      const normalized = String(core || "");
      const baseInfo = targetObject.VerbDisambiguationBaseInfo;
      if (!normalized || !baseInfo.size) {
        return [];
      }
      const markerRe = targetObject.COMPOUND_MARKER_RE || /[|~#()\[\]\\/?-]/g;
      if (markerRe) {
        markerRe.lastIndex = 0;
        if (markerRe.test(normalized)) {
          return [];
        }
      }
      const syllables = targetObject.splitVerbSyllables(normalized);
      if (syllables.length < 2) {
        return [];
      }
      const candidates = [];
      const seen = new Set();
      const isValidSuffixStart = index => {
        const syllable = syllables[index];
        return !!(syllable && syllable.nucleus);
      };
      const addCandidate = (prefix, suffix) => {
        const allowShortPrefix = prefix.length === 1 && targetObject.VOWELS.includes(prefix);
        if (!allowShortPrefix && prefix.length < 2 || suffix.length < 2) {
          return;
        }
        const key = `${prefix}/${suffix}`;
        if (seen.has(key)) {
          return;
        }
        seen.add(key);
        candidates.push({
          prefix,
          suffix
        });
      };
      const wantsTransitive = options.isTransitive === true;
      const wantsIntransitive = options.isTransitive === false;
      for (let i = 1; i <= syllables.length - 1; i += 1) {
        if (!isValidSuffixStart(i)) {
          continue;
        }
        const prefix = syllables.slice(0, i).map(syllable => syllable.text).join("");
        const suffix = syllables.slice(i).map(syllable => syllable.text).join("");
        const info = baseInfo.get(suffix.toLowerCase());
        if (!info) {
          continue;
        }
        if (wantsTransitive && !info.transitive) {
          continue;
        }
        if (wantsIntransitive && !info.intransitive) {
          continue;
        }
        if (info) {
          const displaySuffix = info.displayBase || suffix;
          addCandidate(prefix, displaySuffix);
          break;
        }
      }
      return candidates;
    }
    function getDisambiguationLongSplitCandidates(core) {
      const normalized = String(core || "");
      if (!normalized) {
        return [];
      }
      const markerRe = targetObject.COMPOUND_MARKER_RE || /[|~#()\[\]\\/?-]/g;
      if (markerRe) {
        markerRe.lastIndex = 0;
        if (markerRe.test(normalized)) {
          return [];
        }
      }
      const syllables = targetObject.splitVerbSyllables(normalized);
      const letterCount = targetObject.getVerbLetterCount(normalized);
      const isLong = syllables.length >= targetObject.VERB_DISAMBIGUATION_LONG_SYLLABLES || letterCount >= targetObject.VERB_DISAMBIGUATION_LONG_LETTERS;
      if (!isLong || syllables.length < 3) {
        return [];
      }
      const candidates = [];
      const seen = new Set();
      const isValidSuffixStart = index => {
        const syllable = syllables[index];
        return !!(syllable && syllable.nucleus);
      };
      const addCandidate = (prefix, suffix) => {
        if (prefix.length < 2 || suffix.length < 2) {
          return;
        }
        const key = `${prefix}/${suffix}`;
        if (seen.has(key)) {
          return;
        }
        seen.add(key);
        candidates.push({
          prefix,
          suffix
        });
      };
      const positions = [];
      if (syllables.length >= 4) {
        for (let i = 2; i <= syllables.length - 2; i += 1) {
          positions.push(i);
        }
        const midpoint = syllables.length / 2;
        positions.sort((a, b) => Math.abs(a - midpoint) - Math.abs(b - midpoint));
        positions.forEach(index => {
          if (!isValidSuffixStart(index)) {
            return;
          }
          const prefix = syllables.slice(0, index).map(syllable => syllable.text).join("");
          const suffix = syllables.slice(index).map(syllable => syllable.text).join("");
          addCandidate(prefix, suffix);
        });
      }
      return candidates;
    }
    function getShapePatternLabels(context) {
      if (typeof targetObject.getPretUniversalShapeLabels === "function") {
        return targetObject.getPretUniversalShapeLabels(context);
      }
      if (!context) {
        return [];
      }
      const descriptorState = context.descriptorState || {};
      const shapeDescriptors = Array.isArray(descriptorState.shapeDescriptors) ? descriptorState.shapeDescriptors : [];
      if (typeof targetObject.formatPretDescriptorLabel === "function") {
        return shapeDescriptors.map(descriptor => targetObject.formatPretDescriptorLabel(descriptor, {
          activeRightEdgeProfile: context.rightEdgeProfile
        })).filter(Boolean);
      }
      return [];
    }
    function getPretClassSignatureFromParsed(parsedVerb) {
      if (!parsedVerb || !parsedVerb.verb) {
        return null;
      }
      const isTransitive = targetObject.getBaseObjectSlots(parsedVerb) > 0;
      const contextOptions = targetObject.buildPretContextOptionsFromMeta(parsedVerb);
      const resolvedBundle = targetObject.resolvePretUniversalContextBundle({
        verb: parsedVerb.verb,
        analysisVerb: parsedVerb.analysisVerb || parsedVerb.verb,
        analysisTarget: parsedVerb.analysisVerb || parsedVerb.verb,
        isTransitive,
        contextOptions,
        includeSummary: true
      });
      const context = resolvedBundle.context;
      const summary = resolvedBundle.summary;
      let classList = "";
      if (summary && typeof summary.resolvedClassList === "string" && summary.resolvedClassList) {
        classList = summary.resolvedClassList;
      } else if (summary && typeof summary.classList === "string") {
        classList = summary.classList;
      } else {
        const candidates = targetObject.getPretUniversalClassCandidates(context);
        classList = candidates.size ? typeof targetObject.formatPretUniversalClassList === "function" ? targetObject.formatPretUniversalClassList(candidates) : Array.from(candidates).sort().join("/") : "";
      }
      const shapeLabels = summary && Array.isArray(summary.shapeLabels) ? summary.shapeLabels.slice() : getShapePatternLabels(context);
      return {
        classList,
        shapeLabels,
        parsedVerb
      };
    }
    function getPretClassSignatureFromValue(rawValue) {
      return getPretClassSignatureFromParsed(parseVerbInput(rawValue));
    }
    function getDisambiguationSourceCoreFromParsed(parsedBase = null) {
      if (!parsedBase || typeof parsedBase !== "object") {
        return "";
      }
      return targetObject.normalizeRuleBase(parsedBase.canonical?.sourceBase || parsedBase.sourceBase || parsedBase.exactBaseVerb || parsedBase.canonicalRuleBase || parsedBase.analysisVerb || parsedBase.verb || "");
    }
    function buildVerbDisambiguationSourceFrame(rawValue = "", parsedBase = null) {
      const parsed = parsedBase || parseVerbInput(rawValue);
      const sourceRawInput = String(rawValue || "").trim();
      const sourceCore = getDisambiguationSourceCoreFromParsed(parsed);
      const hasLeadingDash = parsed?.hasLeadingDash === true || String(parsed?.dashPrefix || "").startsWith("-");
      const sourceDisplayMirror = targetObject.stripOptionalSupportiveI(parsed?.displayVerb || "");
      const hasBoundaryMarker = parsed?.hasSlashMarker === true || parsed?.canonical?.hasSlashMarker === true;
      const coreStructuralPrefixParts = Array.isArray(parsed?.canonical?.coreStructuralPrefixParts) ? parsed.canonical.coreStructuralPrefixParts : Array.isArray(parsed?.coreStructuralPrefixParts) ? parsed.coreStructuralPrefixParts : [];
      const sourceTokenStream = [...coreStructuralPrefixParts.map((piece, index) => ({
        role: String(piece?.type || ""),
        value: targetObject.normalizeRuleBase(piece?.value || ""),
        index,
        sourceLayer: "canonical-core-structural-prefix-parts"
      })).filter(piece => piece.role && piece.value), ...(sourceCore ? [{
        role: "matrix",
        value: sourceCore,
        index: coreStructuralPrefixParts.length,
        sourceLayer: "canonical-source-base"
      }] : [])];
      const boundaryFreeCore = hasBoundaryMarker && sourceTokenStream.length ? sourceTokenStream.filter(piece => piece.role !== "supportive").map(piece => piece.value).join("") : "";
      const blockReason = sourceCore ? "" : "missing-structured-source-core";
      return {
        kind: "verb-disambiguation-source-frame",
        version: 1,
        sourceLayer: "current-regex-parse-structure",
        routeOperation: "verb-disambiguation-candidate-generation",
        sourceRawInput,
        sourceCore,
        hasLeadingDash,
        dashPrefix: hasLeadingDash ? "-" : "",
        hasBoundaryMarker,
        sourceTokenStream,
        boundaryFreeCore,
        sourceDisplayMirror,
        blockReason,
        supported: !blockReason
      };
    }
    function buildVerbDisambiguationCandidateFrames(sourceFrame = null, options = {}) {
      if (!sourceFrame || sourceFrame.kind !== "verb-disambiguation-source-frame") {
        return [];
      }
      const core = String(sourceFrame.sourceCore || "");
      if (!core) {
        return [];
      }
      const hasLeadingDash = sourceFrame.hasLeadingDash === true;
      const isTransitive = options.isTransitive === true;
      const candidates = [];
      const seen = new Set();
      const addCandidateFrame = (candidateValue = "", kind = "", allowSameClass = false, metadata = {}) => {
        const normalizedValue = String(candidateValue || "").trim();
        if (!normalizedValue || seen.has(normalizedValue)) {
          return;
        }
        seen.add(normalizedValue);
        candidates.push({
          kind: "verb-disambiguation-candidate-frame",
          routeOperation: "verb-disambiguation-candidate-generation",
          candidateKind: String(kind || ""),
          value: normalizedValue,
          allowSameClass: allowSameClass === true,
          sourceCore: core,
          sourceLayer: "verb-disambiguation-source-frame",
          ...metadata
        });
      };
      const supportiveCandidate = (() => {
        if (!targetObject.isSupportiveIClusterBase(core)) {
          return "";
        }
        const letters = targetObject.splitVerbLetters(core);
        const nextCore = letters.slice(1).join("");
        if (!nextCore) {
          return "";
        }
        const marker = targetObject.getRegexOptionalSupportiveMarkerForLetter(letters[0]);
        const candidateCore = `${marker}${nextCore}`;
        return `${hasLeadingDash ? "-" : ""}${candidateCore}`;
      })();
      if (sourceFrame.hasBoundaryMarker && sourceFrame.boundaryFreeCore) {
        addCandidateFrame(`${hasLeadingDash ? "-" : ""}${sourceFrame.boundaryFreeCore}`, "boundary-free-token-stream", false, {
          sourceTokenStream: sourceFrame.sourceTokenStream.map(piece => ({
            ...piece
          }))
        });
      }
      if (supportiveCandidate) {
        addCandidateFrame(supportiveCandidate, "supportive-marker", true);
      }
      const affixes = getDisambiguationAffixCandidates(core);
      affixes.forEach(affix => {
        const remainder = core.slice(affix.length);
        if (!remainder) {
          return;
        }
        if ((affix === "tē" || affix === "tla") && remainder.startsWith("n") && startsWithClassicalVelarSeries(remainder.slice(1))) {
          return;
        }
        const candidateValue = `${hasLeadingDash ? "-" : ""}${affix}-${remainder}`;
        addCandidateFrame(candidateValue, "affix-boundary", true, {
          affix,
          remainder
        });
      });
      const prefixes = getDisambiguationPrefixCandidates(core);
      prefixes.forEach(prefix => {
        const remainder = core.slice(prefix.length);
        if (!remainder) {
          return;
        }
        if ((prefix === "tē" || prefix === "tla") && remainder.startsWith("n") && startsWithClassicalVelarSeries(remainder.slice(1))) {
          return;
        }
        const candidateValue = `${hasLeadingDash ? "-" : ""}${prefix}/${remainder}`;
        addCandidateFrame(candidateValue, "prefix-boundary", false, {
          prefix,
          remainder
        });
      });
      const suffixCandidates = getDisambiguationSuffixCandidates(core);
      suffixCandidates.forEach(candidate => {
        const candidateValue = `${hasLeadingDash ? "-" : ""}${candidate.prefix}/${candidate.suffix}`;
        addCandidateFrame(candidateValue, "suffix-boundary", true, candidate);
      });
      const knownSuffixCandidates = getDisambiguationKnownSuffixCandidates(core, {
        isTransitive
      });
      knownSuffixCandidates.forEach(candidate => {
        const candidateValue = `${hasLeadingDash ? "-" : ""}${candidate.prefix}/${candidate.suffix}`;
        addCandidateFrame(candidateValue, "known-suffix-boundary", true, candidate);
      });
      if (!knownSuffixCandidates.length) {
        const longSplitCandidates = getDisambiguationLongSplitCandidates(core);
        longSplitCandidates.forEach(candidate => {
          const candidateValue = `${hasLeadingDash ? "-" : ""}${candidate.prefix}/${candidate.suffix}`;
          addCandidateFrame(candidateValue, "long-split-boundary", true, candidate);
        });
      }
      return candidates;
    }
    function buildVerbDisambiguationOperationFrame(sourceFrame = null, options = {}) {
      if (!sourceFrame || sourceFrame.kind !== "verb-disambiguation-source-frame") {
        return {
          kind: "andrews-verb-disambiguation-operation-frame",
          version: 1,
          status: "blocked",
          blockReason: "missing-source-frame",
          supported: false
        };
      }
      if (sourceFrame.routeOperation !== "verb-disambiguation-candidate-generation") {
        return {
          kind: "andrews-verb-disambiguation-operation-frame",
          version: 1,
          sourceFrame,
          status: "blocked",
          blockReason: "contradictory-route-operation",
          supported: false
        };
      }
      if (sourceFrame.supported !== true || sourceFrame.blockReason) {
        return {
          kind: "andrews-verb-disambiguation-operation-frame",
          version: 1,
          sourceFrame,
          status: "blocked",
          blockReason: sourceFrame.blockReason || "unsupported-source-frame",
          supported: false
        };
      }
      const candidateFrames = buildVerbDisambiguationCandidateFrames(sourceFrame, options);
      return {
        kind: "andrews-verb-disambiguation-operation-frame",
        version: 1,
        routeOperation: "verb-disambiguation-candidate-generation",
        sourceFrame,
        candidateFrames,
        status: "authorized",
        supported: true
      };
    }
    function getVerbDisambiguationFrameMismatch(rawValue = "", operationFrame = null) {
      const sourceFrame = buildVerbDisambiguationSourceFrame(rawValue);
      if (!operationFrame || operationFrame.kind !== "andrews-verb-disambiguation-operation-frame") {
        return "missing-operation-frame";
      }
      if (operationFrame.status !== "authorized" || operationFrame.supported !== true) {
        return operationFrame.blockReason || "blocked-operation-frame";
      }
      if (!operationFrame.sourceFrame || operationFrame.sourceFrame.kind !== sourceFrame.kind) {
        return "missing-source-frame";
      }
      if (operationFrame.sourceFrame.sourceRawInput !== sourceFrame.sourceRawInput) {
        return "contradictory-source-frame";
      }
      if (operationFrame.sourceFrame.sourceCore !== sourceFrame.sourceCore) {
        return "contradictory-source-core";
      }
      if (operationFrame.sourceFrame.routeOperation !== sourceFrame.routeOperation) {
        return "contradictory-route-operation";
      }
      if (!Array.isArray(operationFrame.candidateFrames)) {
        return "missing-candidate-frames";
      }
      return "";
    }
    function buildVerbDisambiguationCandidatesFromOperationFrame(rawValue = "", operationFrame = null) {
      const mismatch = getVerbDisambiguationFrameMismatch(rawValue, operationFrame);
      if (mismatch) {
        return {
          suggestions: [],
          patterns: [],
          sourceFrame: null,
          operationFrame: null,
          blockReason: mismatch
        };
      }
      const parsedBase = parseVerbInput(rawValue);
      const sourceFrame = operationFrame.sourceFrame;
      const signatureCache = new Map();
      const getCachedSignature = value => {
        if (!value) {
          return null;
        }
        if (signatureCache.has(value)) {
          return signatureCache.get(value);
        }
        const signature = getPretClassSignatureFromValue(value);
        signatureCache.set(value, signature || null);
        return signature || null;
      };
      const original = getPretClassSignatureFromParsed(parsedBase);
      if (!original) {
        return {
          suggestions: [],
          patterns: [],
          sourceFrame,
          operationFrame,
          blockReason: "missing-original-signature"
        };
      }
      signatureCache.set(sourceFrame.sourceRawInput, original);
      const suggestions = [];
      const seen = new Set();
      const originalClassList = original.classList;
      const patternSet = new Set(original.shapeLabels || []);
      const patterns = Array.from(patternSet);
      const maxDashCount = Math.max(1, Math.min(2, Number.isFinite(parsedBase.dashCount) ? parsedBase.dashCount : 0));
      (Array.isArray(operationFrame.candidateFrames) ? operationFrame.candidateFrames : []).forEach(candidateFrame => {
        if (!candidateFrame || candidateFrame.kind !== "verb-disambiguation-candidate-frame" || candidateFrame.routeOperation !== operationFrame.routeOperation || candidateFrame.sourceCore !== sourceFrame.sourceCore) {
          return;
        }
        const candidateValue = String(candidateFrame.value || "").trim();
        if (!candidateValue || candidateValue === sourceFrame.sourceRawInput || candidateValue === sourceFrame.sourceDisplayMirror || seen.has(candidateValue)) {
          return;
        }
        const candidateDashCount = (candidateValue.match(/-/g) || []).length;
        if (candidateDashCount > maxDashCount) {
          return;
        }
        const candidate = getCachedSignature(candidateValue);
        if (!candidate || !candidate.classList) {
          return;
        }
        const allowSameClass = candidateFrame.allowSameClass === true;
        if (candidate.classList === originalClassList && !allowSameClass) {
          return;
        }
        seen.add(candidateValue);
        suggestions.push({
          value: candidateValue,
          classList: candidate.classList,
          shapeLabels: candidate.shapeLabels || []
        });
      });
      return {
        suggestions: suggestions.slice(0, targetObject.VERB_DISAMBIGUATION_LIMIT),
        patterns,
        sourceFrame,
        operationFrame
      };
    }
    function buildVerbDisambiguationCandidates(rawValue) {
      const parsedBase = parseVerbInput(rawValue);
      const sourceFrame = buildVerbDisambiguationSourceFrame(rawValue, parsedBase);
      const operationFrame = buildVerbDisambiguationOperationFrame(sourceFrame, {
        isTransitive: targetObject.getBaseObjectSlots(parsedBase) > 0
      });
      return buildVerbDisambiguationCandidatesFromOperationFrame(rawValue, operationFrame);
    }

    // === CSV Export ===
    // === Input Validation ===
    function isRecognizedCurrentRegexValue(rawValue, {
      allowPartial = false
    } = {}) {
      const trimmed = String(rawValue || "").trim();
      if (!trimmed) {
        return false;
      }
      if (isCurrentRegexParseInputRecognized(trimmed)) {
        return true;
      }
      if (isCurrentRegexShorthandParseInputRecognized(trimmed)) {
        return true;
      }
      if (allowPartial && isAllowedPartialRegexEnvelopeValue(trimmed)) {
        return true;
      }
      return false;
    }
    function getInvalidVerbCharacters(rawValue) {
      if (isRecognizedCurrentRegexValue(rawValue, {
        allowPartial: true
      })) {
        return [];
      }
      const raw = targetObject.getRawInputTiCausativeMetadata(rawValue).normalizedInput || String(rawValue || "");
      const invalid = new Set();
      for (const char of raw) {
        if (/[a-z0-9|~#()\[\]{}\/\s-]/i.test(char)) {
          continue;
        }
        invalid.add(char);
      }
      return Array.from(invalid);
    }
    function getInvalidVerbLetters(rawValue) {
      if (isRecognizedCurrentRegexValue(rawValue, {
        allowPartial: true
      })) {
        return [];
      }
      const raw = (targetObject.getRawInputTiCausativeMetadata(rawValue).normalizedInput || String(rawValue || "")).toLowerCase();
      const cleaned = raw.replace(targetObject.COMPOUND_MARKER_RE, "").replace(/\s+/g, "");
      const letters = targetObject.splitVerbLetters(cleaned);
      const invalid = new Set();
      letters.forEach(letter => {
        if (!letter) {
          return;
        }
        if (/^[0-9]+$/.test(letter)) {
          return;
        }
        if (targetObject.DIGRAPH_SET.has(letter)) {
          return;
        }
        if (targetObject.VALID_VOWEL_SET.has(letter)) {
          return;
        }
        if (targetObject.VALID_CONSONANTS.has(letter)) {
          return;
        }
        invalid.add(letter);
      });
      return Array.from(invalid);
    }
    function getInvalidVerbEnvelopeStructure(rawValue, options = {}) {
      const raw = (targetObject.getRawInputTiCausativeMetadata(rawValue).normalizedInput || String(rawValue || "")).toLowerCase();
      const cleaned = raw.replace(targetObject.COMPOUND_ALLOWED_RE, "").replace(/\s+/g, "");
      const allowPartial = options.allowPartial === true;
      if (cleaned.includes("/-") || cleaned.includes("-/")) {
        return "separator";
      }
      const markerRe = targetObject.COMPOUND_MARKER_RE || /[|~#()\[\]\\/?-]/g;
      const tokens = [];
      const separators = [];
      let current = "";
      for (let i = 0; i < cleaned.length; i += 1) {
        const char = cleaned[i];
        if (char === "/" || char === "-") {
          tokens.push(current);
          separators.push(char);
          current = "";
        } else {
          current += char;
        }
      }
      tokens.push(current);
      const isNonspecificToken = token => targetObject.NONSPECIFIC_VALENCE_AFFIX_SET.has(token);
      const isPrefixToken = token => targetObject.SPECIFIC_VALENCE_PREFIX_SET.has(token) || isNonspecificToken(token);
      for (let i = 0; i < separators.length; i += 1) {
        const sep = separators[i];
        const leftRaw = tokens[i] ?? "";
        const rightRaw = tokens[i + 1] ?? "";
        const left = leftRaw.replace(markerRe, "");
        const right = rightRaw.replace(markerRe, "");
        if (!right) {
          if (allowPartial && i === separators.length - 1) {
            return "";
          }
          if (sep === "-") {
            let hasNonEmptyLater = false;
            let onlyDashes = true;
            for (let j = i + 1; j < separators.length; j += 1) {
              if (separators[j] !== "-") {
                onlyDashes = false;
                break;
              }
              const nextToken = (tokens[j + 1] ?? "").replace(markerRe, "");
              if (nextToken) {
                hasNonEmptyLater = true;
                break;
              }
            }
            if (onlyDashes && hasNonEmptyLater) {
              continue;
            }
          }
          return "separator";
        }
        if (sep === "/") {
          // PREFIX/ can bind only to nonspecific or verbstem (not to specific prefixes).
          const rightIsPrefix = separators[i + 1] === "/";
          if (isPrefixToken(right) && !isNonspecificToken(right)) {
            return "separator";
          }
          if (rightIsPrefix && !isNonspecificToken(right)) {
            const nextRaw = tokens[i + 2] ?? "";
            const next = nextRaw.replace(markerRe, "");
            const allowImpersonalTlaRightEmbed = left === "tla" && Boolean(right) && Boolean(next) && !isPrefixToken(right);
            const leftDirectionalFromBracket = getBracketDirectionalPrefixToken(leftRaw.replace(/^-+/, ""));
            const allowDirectionalRightEmbed = Boolean(leftDirectionalFromBracket) && Boolean(right) && Boolean(next) && !isPrefixToken(right);
            if (!allowImpersonalTlaRightEmbed && !allowDirectionalRightEmbed) {
              return "separator";
            }
          }
        }
      }
      const valenceSlots = getValenceSlotsFromCleaned(cleaned);
      if (valenceSlots.length >= 2) {
        for (let i = 0; i < valenceSlots.length; i += 1) {
          if (getValenceCategoryFromToken(valenceSlots[i]) === "embedded") {
            return "embedded-between-dashes";
          }
        }
      }
      return "";
    }
    function getInvalidVerbStructure(rawValue, options = {}) {
      const expectRegexEnvelope = options.expectRegexEnvelope === true ? true : options.expectRegexEnvelope === false ? false : true;
      const allowPartial = options.allowPartial === true;
      const trimmed = String(rawValue || "").trim();
      if (!trimmed) {
        return "";
      }
      if (isCurrentRegexParseInputRecognized(trimmed)) {
        return "";
      }
      if (isCurrentRegexShorthandParseInputRecognized(trimmed)) {
        return "";
      }
      if (allowPartial && isAllowedPartialRegexEnvelopeValue(trimmed)) {
        return "";
      }
      if (trimmed.includes("?")) {
        return "search";
      }
      if (expectRegexEnvelope) {
        return "core-envelope";
      }
      return "core-envelope";
    }
    function getInvalidVerbStructureMessage(invalidStructure = "", options = {}) {
      switch (String(invalidStructure || "")) {
        case "search":
          return "La búsqueda con ? ya no forma parte del regex.";
        case "core-envelope":
          return "Regex usa solo la gramática nueva: (...) o -(...) con piezas exteriores unidas por +.";
        case "core-empty":
          return "El core no puede ir vacío.";
        case "unsupported-parentheses":
          return "Regex nuevo usa valencias exteriores y [i] o [y]; no uses la notación anterior.";
        case "supportive-marker":
          return "Regex usa [i] o [y] como apoyo opcional.";
        case "dash":
          return "El regex nuevo solo usa -(...) para núcleos transitivos.";
        case "separator":
          return "El verbo contiene separadores inválidos.";
        default:
          return "La estructura del regex es inválida.";
      }
    }
    function serializeCanonicalRegexEnvelope(rawValue = "") {
      const raw = String(rawValue || "").trim();
      if (!raw) {
        return "";
      }
      return serializeRegexInputValue(raw) || raw;
    }
    function normalizeComposerScreenCoreValue(value = "", options = {}) {
      const preserveSupportiveMarkers = options.preserveSupportiveMarkers === true;
      const supportivePattern = /\[([iy])\]/g;
      const supportiveReplacement = preserveSupportiveMarkers ? "[$1]" : "$1";
      const boundSupportiveIPattern = /(^|[-/])\[i\]([a-z]+)\/i([a-z]+)/gi;
      return String(value || "").replace(/\[([a-z]+)\]/gi, match => getBracketDirectionalPrefixToken(match) || match).replace(boundSupportiveIPattern, (_match, separator, embed, stem) => {
        const normalizedSeparator = String(separator || "");
        const normalizedEmbed = String(embed || "").toLowerCase();
        const normalizedStem = `i${String(stem || "").toLowerCase()}`;
        if (preserveSupportiveMarkers) {
          return `${normalizedSeparator}[i]${normalizedEmbed}/${normalizedStem}`;
        }
        return `${normalizedSeparator}i${normalizedEmbed}/${normalizedStem}`;
      }).replace(/\//g, "-").toLowerCase().replace(supportivePattern, supportiveReplacement).replace(/\((tla|tē|mo|ne|m)\)/gu, "$1");
    }
    function restoreBracketSupportiveMarkers(value = "") {
      return String(value || "").replace(/__supportive_i__/gi, "[i]").replace(/__supportive_y__/gi, "[y]");
    }
    function stripBracketSupportiveMarkersForDisplay(value = "") {
      return String(value || "").replace(/\[i\]/gi, "i").replace(/\[y\]/gi, "y").replace(/\/i\//gi, "i").replace(/\/y\//gi, "y");
    }
    function formatComposerDisplayMovingTargetPiece(piece = null, options = {}) {
      if (!piece || !piece.value) {
        return "";
      }
      const value = normalizeComposerScreenCoreValue(piece.value, options);
      if (!value) {
        return "";
      }
      if (piece.type === "lexical") {
        return `(${value})`;
      }
      return value;
    }
    // Core parsing functions extracted to src/core/parsing/parsing.mjs

    function triggerInputShake(target) {
      if (!target || !target.classList) {
        return;
      }
      target.classList.remove("shake");
      void target.offsetWidth;
      target.classList.add("shake");
      if (target._shakeTimeout) {
        targetObject.clearTimeout(target._shakeTimeout);
      }
      target._shakeTimeout = targetObject.setTimeout(() => {
        target.classList.remove("shake");
      }, 350);
    }
    function handleVerbBeforeInput(event) {
      if (event.isComposing) {
        return;
      }
      if (event.inputType && event.inputType.startsWith("delete")) {
        return;
      }
      const data = event.data;
      if (!data) {
        return;
      }
      const target = event.target;
      if (!target || typeof target.value !== "string") {
        return;
      }
      const value = target.value;
      const start = target.selectionStart ?? value.length;
      const end = target.selectionEnd ?? value.length;
      const writableSelection = target.id === "verb" ? targetObject.getVerbInputWritableSelection(value) : null;
      const selectionInsideWritableSlot = Boolean(writableSelection && (start === end && start >= writableSelection.start && start <= writableSelection.end || end > writableSelection.start && start < writableSelection.end));
      if (selectionInsideWritableSlot) {
        const nextValue = value.slice(0, writableSelection.start) + data + value.slice(writableSelection.end);
        if (nextValue.includes("/-") || nextValue.includes("-/")) {
          event.preventDefault();
          triggerInputShake(target);
          return;
        }
        event.preventDefault();
        target.value = nextValue;
        if (typeof target.setSelectionRange === "function") {
          const caret = writableSelection.start + data.length;
          target.setSelectionRange(caret, caret);
        }
        targetObject.dispatchTextInputUpdate(target);
        return;
      }
      const nextValue = value.slice(0, start) + data + value.slice(end);
      if (nextValue.includes("/-") || nextValue.includes("-/")) {
        event.preventDefault();
        triggerInputShake(target);
      }
    }

    // === Verb Parsing ===
    // Extracted to src/core/parsing/parsing.mjs

    function isPerfectiveTense(tense) {
      return targetObject.PRETERITO_CLASS_TENSES.has(tense) || targetObject.PRETERITO_UNIVERSAL_ORDER.includes(tense) || tense === "preterito" || targetObject.isPotencialActiveTense(tense) || tense === "pasado-remoto-adverbio-activo";
    }
    function getEmptyNonactiveStemMetadataResult() {
      return {
        nonactiveStems: null,
        nonactiveAllStems: null,
        nonactiveAllStemSpecs: null,
        derivedNonactiveStems: null
      };
    }
    function buildNonactiveDerivationOptions({
      verb = "",
      analysisVerb = "",
      objectPrefix = "",
      parsedVerb = null,
      directionalPrefix = "",
      tense = "",
      tenseMode = "",
      derivationMode = "",
      preferredNonactiveBaseVerb = "",
      preferredNonactiveSourceMeta = null,
      preferredNonactiveSourcePrefix = "",
      selectedSuffix = undefined
    }) {
      return {
        verb,
        analysisVerb,
        objectPrefix,
        parsedVerb,
        directionalPrefix,
        tense,
        tenseMode,
        derivationMode,
        preferredNonactiveBaseVerb,
        preferredNonactiveSourceMeta,
        preferredNonactiveSourcePrefix,
        selectedSuffix
      };
    }
    function getLexicallyAttestedValencyReducedTransitiveVariant(baseVerb = "", targetObjectSlots = 0) {
      if (!baseVerb || !targetObject.BASIC_DATA_CANONICAL_MAP.size) {
        return null;
      }
      const normalizedBase = targetObject.normalizeRuleBase(baseVerb);
      if (!normalizedBase) {
        return null;
      }
      const normalizedTargetSlots = Math.max(0, Math.min(targetObject.MAX_OBJECT_SLOTS, Number(targetObjectSlots) || 0));
      const nonRedupBase = targetObject.normalizeRuleBase(targetObject.getNonReduplicatedRoot(normalizedBase) || normalizedBase);
      const directCandidates = Array.from(
        new Set([normalizedBase, nonRedupBase].filter(Boolean))
      );
      for (const candidate of directCandidates) {
        const info = targetObject.BASIC_DATA_CANONICAL_MAP.get(candidate.toLowerCase());
        const parsed = info?.transitiveParsed || null;
        if (parsed && targetObject.getBaseObjectSlots(parsed) === normalizedTargetSlots) {
          return parsed;
        }
      }
      const matches = [];
      targetObject.BASIC_DATA_CANONICAL_MAP.forEach(info => {
        const parsed = info?.transitiveParsed || null;
        if (!parsed || targetObject.getBaseObjectSlots(parsed) !== normalizedTargetSlots) {
          return;
        }
        const parsedBase = targetObject.normalizeRuleBase(parsed.canonicalRuleBase || parsed.canonical?.ruleBase || parsed.verb || "");
        const parsedNonRedup = targetObject.normalizeRuleBase(targetObject.getNonReduplicatedRoot(parsedBase) || parsedBase);
        if (!parsedNonRedup || parsedNonRedup !== nonRedupBase) {
          return;
        }
        matches.push({
          parsed,
          isExactRedup: Boolean(exactRedupCandidate && parsedBase === exactRedupCandidate),
          isExactBase: parsedBase === normalizedBase,
          length: targetObject.getVerbLetterCount(parsedBase)
        });
      });
      matches.sort((left, right) => {
        if (left.isExactRedup !== right.isExactRedup) {
          return left.isExactRedup ? -1 : 1;
        }
        if (left.isExactBase !== right.isExactBase) {
          return left.isExactBase ? -1 : 1;
        }
        return left.length - right.length;
      });
      return matches[0]?.parsed || null;
    }
    function resolvePotencialHabitualReducedNonactiveSource({
      parsedVerb = null,
      verb = "",
      analysisVerb = "",
      objectPrefix = "",
      tense = "",
      tenseMode = "",
      derivationMode = ""
    }) {
      if (!parsedVerb || !targetObject.isPotencialHabitualTense(tense) || tenseMode !== targetObject.TENSE_MODE.adjetivo || derivationMode !== targetObject.DERIVATION_MODE.nonactive) {
        return null;
      }
      const sourceObjectSlots = targetObject.getBaseObjectSlots(parsedVerb);
      if (sourceObjectSlots < 2 || !targetObject.SUSTANTIVO_VERBAL_TRANSITIVE_PREFIXES.has(objectPrefix)) {
        return null;
      }
      const source = targetObject.getNonactiveDerivationSource(parsedVerb, verb, analysisVerb);
      const baseVerb = targetObject.stripBoundSourcePrefixFromNonactiveBase(source.baseVerb || "", source.prefix || "", parsedVerb, {
        sourceChain: source.chain || null
      });
      if (!baseVerb) {
        return null;
      }
      const reducedParsed = getLexicallyAttestedValencyReducedTransitiveVariant(baseVerb, Math.max(0, sourceObjectSlots - 1));
      if (!reducedParsed) {
        return null;
      }
      const reducedBaseVerb = targetObject.normalizeRuleBase(reducedParsed.canonicalRuleBase || reducedParsed.canonical?.ruleBase || reducedParsed.analysisVerb || reducedParsed.verb || "");
      if (!reducedBaseVerb || reducedBaseVerb === targetObject.normalizeRuleBase(baseVerb)) {
        return null;
      }
      return {
        preferredNonactiveBaseVerb: reducedBaseVerb,
        preferredNonactiveSourceMeta: reducedParsed,
        preferredNonactiveSourcePrefix: source.prefix || ""
      };
    }
    function applyNonactiveDerivationFromOptions({
      isNonactive = false,
      derivationType = "",
      causativeAllStems = null,
      applicativeAllStems = null,
      derivationOptions = null
    }) {
      return targetObject.applyNonactiveDerivation({
        ...(derivationOptions || {}),
        isNonactive,
        derivationType,
        causativeAllStems,
        applicativeAllStems
      });
    }
    function getParsedVerbNonactiveStemMetadata(parsedVerb, options = {}) {
      if (!parsedVerb || !parsedVerb.verb) {
        return getEmptyNonactiveStemMetadataResult();
      }
      const derivationType = Object.values(targetObject.DERIVATION_TYPE).includes(options.derivationType) ? options.derivationType : targetObject.DERIVATION_TYPE.direct;
      const objectPrefix = typeof options.objectPrefix === "string" ? options.objectPrefix : "";
      const uniqueStems = targetObject.uniqueNonEmptyValues;
      const parsedWithDerivation = {
        ...parsedVerb,
        derivationType,
        derivationValencyDelta: targetObject.getDerivationValencyDelta(derivationType)
      };
      const emptyResult = getEmptyNonactiveStemMetadataResult();
      let verb = parsedWithDerivation.verb || "";
      let analysisVerb = parsedWithDerivation.analysisVerb || verb;
      const forwardDerivation = targetObject.applySelectedForwardDerivation({
        derivationType,
        derivationOptions: buildNonactiveDerivationOptions({
          verb,
          analysisVerb,
          objectPrefix,
          parsedVerb: parsedWithDerivation,
          directionalPrefix: parsedWithDerivation.directionalPrefix || "",
          selectedSuffix: null
        }),
        uniqueStems
      });
      if (forwardDerivation.blocked) {
        return emptyResult;
      }
      ({
        verb,
        analysisVerb
      } = targetObject.extractForwardDerivationState(forwardDerivation, {
        verb,
        analysisVerb
      }));
      const causativeAllStems = forwardDerivation.causativeAllStems;
      const applicativeAllStems = forwardDerivation.applicativeAllStems;
      const nonactiveDerivation = applyNonactiveDerivationFromOptions({
        isNonactive: true,
        derivationType,
        causativeAllStems,
        applicativeAllStems,
        derivationOptions: buildNonactiveDerivationOptions({
          verb,
          analysisVerb,
          objectPrefix,
          parsedVerb: parsedWithDerivation,
          directionalPrefix: parsedWithDerivation.directionalPrefix || "",
          selectedSuffix: null
        })
      });
      ({
        verb,
        analysisVerb
      } = targetObject.extractForwardDerivationState(nonactiveDerivation, {
        verb,
        analysisVerb
      }));
      const nonactiveStems = uniqueStems([verb, analysisVerb]);
      const nonactiveAllStems = uniqueStems(Array.isArray(nonactiveDerivation.nonactiveAllStems) ? nonactiveDerivation.nonactiveAllStems : nonactiveStems);
      const nonactiveAllStemSpecs = Array.isArray(nonactiveDerivation.nonactiveAllStemSpecs) ? targetObject.getUniqueMorphStemSpecs(nonactiveDerivation.nonactiveAllStemSpecs) : null;
      const derivedNonactiveStems = derivationType === targetObject.DERIVATION_TYPE.direct ? null : nonactiveAllStems;
      return {
        nonactiveStems: nonactiveStems.length ? nonactiveStems : null,
        nonactiveAllStems: nonactiveAllStems.length ? nonactiveAllStems : null,
        nonactiveAllStemSpecs: nonactiveAllStemSpecs && nonactiveAllStemSpecs.length ? nonactiveAllStemSpecs : null,
        derivedNonactiveStems: derivedNonactiveStems && derivedNonactiveStems.length ? derivedNonactiveStems : null
      };
    }
    function buildParsedVerbForTab(tabId, rawValue, options = {}) {
      const raw = typeof rawValue === "string" ? rawValue : "";
      const rawTiMetadata = targetObject.getRawInputTiCausativeMetadata(raw);
      const effectiveRaw = options.useSearchBase === false ? raw : targetObject.getSearchInputBase(raw);
      const tiInputMetadata = targetObject.getRawInputTiCausativeMetadata(effectiveRaw);
      const parseInput = tiInputMetadata.normalizedInput || effectiveRaw;
      const parsed = parseVerbInput(parseInput);
      const derivationType = Object.values(targetObject.DERIVATION_TYPE).includes(options.derivationType) ? options.derivationType : targetObject.DERIVATION_TYPE.direct;
      const derivationValencyDelta = targetObject.getDerivationValencyDelta(derivationType);
      const explicitTiCausativeClass = targetObject.normalizeTiCausativeClass(options.tiCausativeClass || "");
      const tiCausativeClass = explicitTiCausativeClass || tiInputMetadata.tiCausativeClass || rawTiMetadata.tiCausativeClass || "";
      const parsedWithContext = {
        ...parsed,
        tabId: tabId || "",
        derivationType,
        derivationValencyDelta,
        tiCausativeClass
      };
      const includeNonactiveStemMetadata = options.includeNonactiveStemMetadata !== false;
      if (!includeNonactiveStemMetadata) {
        return parsedWithContext;
      }
      const nonactiveStemMetadata = getParsedVerbNonactiveStemMetadata(parsedWithContext, {
        derivationType,
        objectPrefix: options.objectPrefix
      });
      return {
        ...parsedWithContext,
        ...nonactiveStemMetadata
      };
    }
    function createEmptyComposerRegexState(rawValue = "") {
      void rawValue;
      return {
        mode: targetObject.VERB_INPUT_MODE.composer,
        transitivity: targetObject.COMPOSER_TRANSITIVITY.intransitive,
        valenceIntransitive: "",
        valenceIntransitiveEmbed: "",
        valence: "",
        valenceEmbedPrimary: "",
        valenceSecondary: "",
        valenceEmbedSecondary: "",
        slotAEmbed: "",
        slotAStem: "",
        slotBEmbed: "",
        slotBStem: "",
        slotCEmbed: "",
        slotCStem: "",
        directionalPrefix: "",
        embedPrefix: "",
        supportiveMarker: "",
        syllableMode: targetObject.COMPOSER_SYLLABLE_MODE.multisyllable,
        tiCausativeClass: "",
        sourceStructureSelectionSource: ""
      };
    }
    function buildComposerStateFromCurrentRegexParsedTarget(parsed = null, rawValue = "") {
      const state = createEmptyComposerRegexState(rawValue);
      if (!parsed || parsed.isValid !== true) {
        return state;
      }
      const normalizedCore = String(parsed.coreText || "").trim();
      const inline = targetObject.parseInlineTiCausativeClassFromBase(normalizedCore);
      const coreText = String(inline.base || normalizedCore || "").trim();
      const outerLexical = (Array.isArray(parsed.outerPieces) ? parsed.outerPieces : []).filter(piece => piece && piece.type === "lexical" && piece.value).map(piece => targetObject.normalizeComposerStem(piece.value)).filter(Boolean).join("-");
      const outerValences = (Array.isArray(parsed.outerPieces) ? parsed.outerPieces : []).filter(piece => piece && piece.type === "valence" && piece.value).map(piece => normalizeEntradaGrammarValenceSurfaceToken(piece.value)).filter(Boolean);
      const adjacentCoreEmbed = getMovingTargetAdjacentEmbedParts(coreText, {
        originalCoreText: parsed.originalCoreText || coreText,
        rawValue
      });
      const normalizedCoreStem = targetObject.normalizeComposerStem(coreText);
      const supportiveMarker = targetObject.normalizeSupportiveMarkerValue(targetObject.getRegexOptionalSupportiveMarkerLetter(coreText));
      const activeStem = adjacentCoreEmbed ? targetObject.normalizeComposerStem(adjacentCoreEmbed.stem) : normalizedCoreStem;
      const activeEmbed = adjacentCoreEmbed ? targetObject.normalizeComposerEmbedValue(adjacentCoreEmbed.embed) : "";
      state.transitivity = parsed.transitivity || targetObject.COMPOSER_TRANSITIVITY.intransitive;
      state.directionalPrefix = targetObject.normalizeComposerStem(parsed.directionalPrefix || "");
      state.supportiveMarker = supportiveMarker;
      state.tiCausativeClass = targetObject.normalizeTiCausativeClass(inline.tiCausativeClass || "");
      state.sourceStructureSelectionSource = adjacentCoreEmbed ? "typed-explicit-slash-boundary" : "typed-source-core";
      if (state.transitivity === targetObject.COMPOSER_TRANSITIVITY.intransitive) {
        state.valenceIntransitive = outerValences[0] || "";
        state.valenceIntransitiveEmbed = state.valenceIntransitive ? outerLexical : "";
        state.slotAStem = activeStem;
        state.slotAEmbed = state.valenceIntransitive ? activeEmbed : targetObject.normalizeComposerEmbedValue(activeEmbed || outerLexical);
        state.embedPrefix = state.slotAEmbed;
      } else if (state.transitivity === targetObject.COMPOSER_TRANSITIVITY.transitive) {
        state.valence = outerValences[0] || "";
        state.valenceEmbedPrimary = outerLexical;
        state.slotBStem = activeStem;
        state.slotBEmbed = activeEmbed;
        state.embedPrefix = state.slotBEmbed;
      } else {
        const firstValence = outerValences[0] || "";
        const secondValence = outerValences[1] || "";
        state.valenceSecondary = targetObject.encodeComposerSecondaryValenceSelection(firstValence, secondValence);
        state.valenceEmbedSecondary = outerLexical;
        state.slotCStem = activeStem;
        state.slotCEmbed = activeEmbed;
        state.embedPrefix = state.slotCEmbed;
      }
      const syllables = targetObject.getComposerStemSyllableCount(targetObject.getComposerActiveStemValue(state));
      state.syllableMode = syllables === 1 ? targetObject.COMPOSER_SYLLABLE_MODE.monosyllable : targetObject.COMPOSER_SYLLABLE_MODE.multisyllable;
      return state;
    }
    function buildComposerStateFromCurrentRegexParseOperationFrame(rawValue = "", currentRegexParseOperationFrame = null) {
      const raw = String(rawValue || "").trim();
      const mismatch = getCurrentRegexParseOperationMismatch(raw, currentRegexParseOperationFrame);
      if (mismatch) {
        const state = createEmptyComposerRegexState(rawValue);
        state.currentRegexParseBlockedReason = mismatch;
        return state;
      }
      const parsed = buildMovingTargetParsedFromCurrentRegexParseOperationFrame(currentRegexParseOperationFrame);
      return buildComposerStateFromCurrentRegexParsedTarget(parsed, raw);
    }
    function buildComposerStateFromMovingTargetParsed(parsed = null, rawValue = "", currentRegexParseOperationFrame = null) {
      if (!currentRegexParseOperationFrame) {
        const state = createEmptyComposerRegexState(rawValue);
        state.currentRegexParseBlockedReason = "current-regex-parse-operation-frame-required";
        return state;
      }
      return buildComposerStateFromCurrentRegexParseOperationFrame(rawValue, currentRegexParseOperationFrame);
    }
    function normalizeRegexCoreTokenCase(value = "", options = {}) {
      const forceUppercaseMarkers = options.forceUppercaseMarkers === true;
      const protectedSupportives = String(value || "").replace(/(?:\/([iy])\/|\[([iy])\])/gi, (_match, letterA, letterB) => `__regex_supportive_${String(letterA || letterB || "").toLowerCase()}__`);
      return protectedSupportives.replace(/\//g, "-").split(/([-\u0000])/).map(part => {
        if (part === "-") {
          return "-";
        }
        const trimmed = String(part || "").trim();
        if (!trimmed) {
          return "";
        }
        const restoredSupportives = trimmed.replace(/__regex_supportive_i__/gi, "[i]").replace(/__regex_supportive_y__/gi, "[y]");
        if (restoredSupportives !== trimmed) {
          return restoredSupportives;
        }
        if (/^\[[a-z]+\]$/i.test(trimmed)) {
          return `[${trimmed.slice(1, -1).toLowerCase()}]`;
        }
        const supportiveMatch = trimmed.match(/^\[([iy])\]/i);
        if (supportiveMatch) {
          const supportiveLetter = String(supportiveMatch[1] || "").toLowerCase();
          const remainder = trimmed.slice(supportiveMatch[0].length).toLowerCase();
          return `${targetObject.getRegexOptionalSupportiveMarkerForLetter(supportiveLetter)}${remainder}`;
        }
        const normalized = trimmed.toLowerCase();
        const shouldUppercaseMarker = targetObject.REGEX_ENVELOPE_OBJECT_MARKERS.includes(trimmed.toUpperCase()) && (forceUppercaseMarkers || trimmed === trimmed.toUpperCase());
        return shouldUppercaseMarker ? trimmed.toUpperCase() : normalized;
      }).join("");
    }
    function parseComposerPlaceholderBase(rawValue = "") {
      const raw = String(rawValue || "").trim();
      if (!raw) {
        return null;
      }
      const match = raw.match(/^(--|-)?(_+(?:[a-z]+)?)$/i);
      if (!match) {
        return null;
      }
      const dashPrefix = match[1] === "--" ? "--" : match[1] === "-" ? "-" : "";
      const coreText = String(match[2] || "").toLowerCase();
      if (!coreText) {
        return null;
      }
      return {
        dashPrefix,
        coreText,
        displayCore: coreText,
        displayVerb: buildRegexDisplayVerb(dashPrefix, coreText)
      };
    }
    function normalizeRegexSpecialSerialShorthandCore(coreValue = "") {
      const normalized = String(coreValue || "").trim().toLowerCase();
      if (!normalized) {
        return "";
      }
      return targetObject.REGEX_SPECIAL_SERIAL_SHORTHAND_CORE_MAP[normalized] || normalized;
    }
    function serializeRegexSpecialSerialShorthandValue(rawValue = "") {
      const raw = String(rawValue || "").trim();
      if (!raw) {
        return "";
      }
      const shorthandMatch = raw.match(/^(--|-)?(_wi-auto|_wiauto)$/i);
      if (shorthandMatch) {
        const dashPrefix = shorthandMatch[1] === "--" ? "--" : shorthandMatch[1] === "-" ? "-" : "";
        const displayCore = targetObject.REGEX_SPECIAL_SERIAL_CANONICAL_DISPLAY_MAP[String(shorthandMatch[2] || "").toLowerCase()] || "";
        return displayCore ? `${dashPrefix}${displayCore}` : "";
      }
      const wrappedMatch = raw.match(/^(--|-)?\((_wi-auto|_wiauto)\)$/i);
      if (wrappedMatch) {
        const dashPrefix = wrappedMatch[1] === "--" ? "--" : wrappedMatch[1] === "-" ? "-" : "";
        const displayCore = targetObject.REGEX_SPECIAL_SERIAL_CANONICAL_DISPLAY_MAP[String(wrappedMatch[2] || "").toLowerCase()] || "";
        return displayCore ? `${dashPrefix}${displayCore}` : "";
      }
      return "";
    }
    function serializeComposerPlaceholderValenceScreen(rawValue = "") {
      const raw = String(rawValue || "").trim();
      if (!raw) {
        return "";
      }
      const directMatch = raw.match(/^(--|-)?\((tla|tē|mo|ne)\)-(_+(?:[\p{L}]+)?)$/iu);
      if (directMatch) {
        const dashPrefix = directMatch[1] === "--" ? "--" : directMatch[1] === "-" ? "-" : "";
        const token = String(directMatch[2] || "").toLowerCase();
        const placeholderStem = String(directMatch[3] || "").toLowerCase();
        return `${dashPrefix}(${token})-${placeholderStem}`;
      }
      const wrappedMatch = raw.match(/^(--|-)?\(\((tla|tē|mo|ne)\)-(_+(?:[\p{L}]+)?)\)$/iu);
      if (wrappedMatch) {
        const dashPrefix = wrappedMatch[1] === "--" ? "--" : wrappedMatch[1] === "-" ? "-" : "";
        const token = String(wrappedMatch[2] || "").toLowerCase();
        const placeholderStem = String(wrappedMatch[3] || "").toLowerCase();
        return `${dashPrefix}(${token})-${placeholderStem}`;
      }
      return "";
    }
    function convertRegexCoreUppercaseMarkersToEnvelopeExplicitMarkers(value = "") {
      return String(value || "").replace(/(^|[-/])((?:TLA|TĒ|MO|NE|M))(?=$|[-/])/gu, (_match, separator, token) => `${separator}(${String(token || "").toLowerCase()})`);
    }
    function getRegexCoreMainObjectCount(coreText = "") {
      const normalized = String(coreText || "").trim();
      if (!normalized) {
        return 0;
      }
      const splitIndex = normalized.lastIndexOf("-");
      if (splitIndex <= 0 || splitIndex >= normalized.length - 1) {
        return 0;
      }
      const head = normalized.slice(0, splitIndex).trim();
      const tail = normalized.slice(splitIndex + 1).trim();
      return head && tail ? 1 : 0;
    }
    function buildRegexDisplayVerb(dashPrefix = "", coreText = "", options = {}) {
      const normalizedDashPrefix = String(dashPrefix || "").startsWith("-") ? "-" : "";
      let normalizedCore = normalizeRegexCoreTokenCase(coreText, options);
      while (normalizedCore.startsWith("-")) {
        normalizedCore = normalizedCore.slice(1);
      }
      if (!normalizedCore) {
        return normalizedDashPrefix;
      }
      return `${normalizedDashPrefix}(${normalizedCore})`;
    }
    function parseRegexCore(coreText = "", options = {}) {
      const rawCore = String(coreText || "").trim();
      if (!rawCore) {
        return {
          rawCore,
          coreText: "",
          displayCore: "",
          coreObjectCount: 0,
          isValid: false,
          invalidReason: options.allowEmpty === true ? "" : "core-empty"
        };
      }
      const withoutRegexMarkers = rawCore.replace(targetObject.REGEX_OPTIONAL_SUPPORTIVE_MARKER_RE, "");
      if (/[()]/.test(rawCore)) {
        return {
          rawCore,
          coreText: rawCore,
          displayCore: "",
          coreObjectCount: 0,
          isValid: false,
          invalidReason: "unsupported-parentheses"
        };
      }
      if (/[{}]/.test(withoutRegexMarkers)) {
        return {
          rawCore,
          coreText: rawCore,
          displayCore: "",
          coreObjectCount: 0,
          isValid: false,
          invalidReason: "supportive-marker"
        };
      }
      const displayCore = normalizeRegexCoreTokenCase(rawCore);
      return {
        rawCore,
        coreText: displayCore,
        displayCore,
        coreObjectCount: getRegexCoreMainObjectCount(displayCore),
        isValid: true,
        invalidReason: ""
      };
    }
    function serializeRegexEnvelope({
      dashPrefix = "",
      coreText = ""
    } = {}) {
      return buildRegexDisplayVerb(dashPrefix, coreText);
    }
    function serializeRegexCore(coreState = {}) {
      if (typeof coreState === "string") {
        return normalizeRegexCoreTokenCase(coreState);
      }
      if (coreState && typeof coreState === "object") {
        if (typeof coreState.coreText === "string" && coreState.coreText) {
          return normalizeRegexCoreTokenCase(coreState.coreText);
        }
        if (typeof coreState.displayCore === "string" && coreState.displayCore) {
          return normalizeRegexCoreTokenCase(coreState.displayCore);
        }
      }
      return "";
    }
    function isAllowedPartialRegexEnvelopeValue(rawValue = "") {
      const trimmed = String(rawValue || "").trim();
      if (!trimmed) {
        return true;
      }
      if (trimmed.includes("?")) {
        return false;
      }
      if (isCurrentRegexParseInputRecognized(trimmed)) {
        return true;
      }
      const strippedSupportive = trimmed.replace(/(?:\/[iy]\/|\[[iy]\])/gi, "");
      if (/[^a-z0-9()+-]/i.test(strippedSupportive)) {
        return false;
      }
      let depth = 0;
      for (let index = 0; index < strippedSupportive.length; index += 1) {
        const char = strippedSupportive[index];
        if (char === "(") {
          depth += 1;
        } else if (char === ")") {
          depth -= 1;
          if (depth < 0) {
            return false;
          }
        }
      }
      return depth >= 0;
    }
    function getStemLeadingSupportiveLetter(stem = "") {
      const normalized = targetObject.normalizeComposerStem(stem);
      if (!normalized) {
        return "";
      }
      if (normalized.startsWith("i")) {
        return "i";
      }
      if (normalized.startsWith("y")) {
        return "y";
      }
      return "";
    }
    function resolveComposerSupportiveMarkerCandidate({
      stem = "",
      embed = ""
    } = {}) {
      const fromStem = getStemLeadingSupportiveLetter(stem);
      if (fromStem) {
        return fromStem;
      }
      return getStemLeadingSupportiveLetter(embed);
    }
    function resolveOptionalSupportiveLetter(letter = "", analysisVerb = "") {
      const explicit = String(letter || "").trim().toLowerCase();
      if (explicit === "i" || explicit === "y") {
        return explicit;
      }
      const fromAnalysis = getStemLeadingSupportiveLetter(analysisVerb);
      if (fromAnalysis) {
        return fromAnalysis;
      }
      return "i";
    }
    function getDirectionalPrefixesSource() {
      return CLASSICAL_DIRECTIONAL_PREFIXES;
    }
    function isDirectionalPrefixToken(value = "") {
      const token = String(value || "");
      if (!token) {
        return false;
      }
      return getDirectionalPrefixesSource().includes(token);
    }
    function getBracketDirectionalPrefixToken(value = "") {
      const token = String(value || "").trim().toLowerCase();
      const match = token.match(/^\[([a-z]+)\]$/);
      if (!match) {
        return "";
      }
      const directional = match[1];
      return isDirectionalPrefixToken(directional) ? directional : "";
    }

    const api = {};
    api.normalizeMovingTargetCoreText = normalizeMovingTargetCoreText;
    api.getCurrentRegexRuntimeTarget = getCurrentRegexRuntimeTarget;
    api.isClassicalNahuatlCurrentRegexBoundaryContext = isClassicalNahuatlCurrentRegexBoundaryContext;
    api.getMovingTargetOuterPieceDescriptors = getMovingTargetOuterPieceDescriptors;
    api.formatMovingTargetOuterPiece = formatMovingTargetOuterPiece;
    api.buildMovingTargetRegexFromCoreAndPieces = buildMovingTargetRegexFromCoreAndPieces;
    api.stripPrefixOnce = stripPrefixOnce;
    api.getComposerDisplayExternalValenceSegments = getComposerDisplayExternalValenceSegments;
    api.stripLeadingComposerDisplaySegments = stripLeadingComposerDisplaySegments;
    api.buildComposerDisplayVerbFromEnvelope = buildComposerDisplayVerbFromEnvelope;
    api.buildComposerDisplayVerbFromMovingTargetParts = buildComposerDisplayVerbFromMovingTargetParts;
    api.serializeRegexInputValue = serializeRegexInputValue;
    api.findFinalTopLevelWrappedCore = findFinalTopLevelWrappedCore;
    api.splitTopLevelByPlus = splitTopLevelByPlus;
    api.parseMovingTargetOuterPiece = parseMovingTargetOuterPiece;
    api.buildEmbeddedSlashObjectSlotSourceFrame = buildEmbeddedSlashObjectSlotSourceFrame;
    api.buildEmbeddedSlashObjectSlotOperationFrame = buildEmbeddedSlashObjectSlotOperationFrame;
    api.getEmbeddedSlashObjectSlotFrameMismatch = getEmbeddedSlashObjectSlotFrameMismatch;
    api.getEmbeddedSlashTransitiveObjSlotCount = getEmbeddedSlashTransitiveObjSlotCount;
    api.getEmbeddedSlashTransitiveObjSlotCountFromSourceFrame = getEmbeddedSlashTransitiveObjSlotCountFromSourceFrame;
    api.getMovingTargetAdjacentEmbedParts = getMovingTargetAdjacentEmbedParts;
    api.parseMovingTargetRegexInput = parseMovingTargetRegexInput;
    api.normalizeCurrentRegexParseOuterPieces = normalizeCurrentRegexParseOuterPieces;
    api.buildCurrentRegexParseSourceFrame = buildCurrentRegexParseSourceFrame;
    api.buildCurrentRegexParseTargetFrame = buildCurrentRegexParseTargetFrame;
    api.buildCurrentRegexParseOperationFrame = buildCurrentRegexParseOperationFrame;
    api.getCurrentRegexParseOperationMismatch = getCurrentRegexParseOperationMismatch;
    api.buildMovingTargetParsedFromCurrentRegexParseOperationFrame = buildMovingTargetParsedFromCurrentRegexParseOperationFrame;
    api.isCurrentRegexParseOperationFrameRecognized = isCurrentRegexParseOperationFrameRecognized;
    api.buildCurrentRegexParseOperationFrameFromRawInput = buildCurrentRegexParseOperationFrameFromRawInput;
    api.isCurrentRegexParseInputRecognized = isCurrentRegexParseInputRecognized;
    api.buildCurrentRegexShorthandParseOperationFrameFromRawInput = buildCurrentRegexShorthandParseOperationFrameFromRawInput;
    api.isCurrentRegexShorthandParseInputRecognized = isCurrentRegexShorthandParseInputRecognized;
    api.serializeRegexInputValueFromOperationFrame = serializeRegexInputValueFromOperationFrame;
    api.buildCanonicalVerbSpecFromMovingTargetParsed = buildCanonicalVerbSpecFromMovingTargetParsed;
    api.buildCanonicalVerbSpecFromComposerSemantic = buildCanonicalVerbSpecFromComposerSemantic;
    Object.defineProperty(api, "ENTRADA_GRAMMAR_OBJECT_LAYER_ORDER", {
        configurable: true,
        enumerable: true,
        get() { return ENTRADA_GRAMMAR_OBJECT_LAYER_ORDER; },
    });
    Object.defineProperty(api, "ENTRADA_GRAMMAR_OBJECT_ANTI_CONFLATION_RULES", {
        configurable: true,
        enumerable: true,
        get() { return ENTRADA_GRAMMAR_OBJECT_ANTI_CONFLATION_RULES; },
    });
    Object.defineProperty(api, "ENTRADA_GRAMMAR_OBJECT_EARLY_ALLOMORPH_BY_SURFACE", {
        configurable: true,
        enumerable: true,
        get() { return ENTRADA_GRAMMAR_OBJECT_EARLY_ALLOMORPH_BY_SURFACE; },
    });
    Object.defineProperty(api, "ENTRADA_GRAMMAR_OBJECT_SURFACE_BY_EARLY_ALLOMORPH", {
        configurable: true,
        enumerable: true,
        get() { return ENTRADA_GRAMMAR_OBJECT_SURFACE_BY_EARLY_ALLOMORPH; },
    });
    api.cloneEntradaGrammarObjectRecord = cloneEntradaGrammarObjectRecord;
    api.hasEntradaGrammarFormulaSlotEvidence = hasEntradaGrammarFormulaSlotEvidence;
    api.getEntradaGrammarFormulaSlotObjectValue = getEntradaGrammarFormulaSlotObjectValue;
    api.getEntradaGrammarFormulaSlotStemValue = getEntradaGrammarFormulaSlotStemValue;
    api.normalizeEntradaGrammarMorphToken = normalizeEntradaGrammarMorphToken;
    api.getEntradaGrammarEarlyAllomorphFrameForSurface = getEntradaGrammarEarlyAllomorphFrameForSurface;
    api.getEntradaGrammarSurfaceForEarlyAllomorph = getEntradaGrammarSurfaceForEarlyAllomorph;
    api.getEntradaGrammarFormulaMorphForSurface = getEntradaGrammarFormulaMorphForSurface;
    api.normalizeEntradaGrammarValenceSurfaceToken = normalizeEntradaGrammarValenceSurfaceToken;
    api.getEntradaGrammarMorphicVariantsForSurface = getEntradaGrammarMorphicVariantsForSurface;
    api.entradaGrammarFormulaObjectValueCoversToken = entradaGrammarFormulaObjectValueCoversToken;
    api.buildEntradaGrammarFormulaObjectCoverage = buildEntradaGrammarFormulaObjectCoverage;
    api.buildEntradaGrammarObjectValenceSlots = buildEntradaGrammarObjectValenceSlots;
    api.buildEntradaGrammarObjectObjectVector = buildEntradaGrammarObjectObjectVector;
    api.buildEntradaGrammarObjectCandidateFormulaSlots = buildEntradaGrammarObjectCandidateFormulaSlots;
    api.buildEntradaGrammarObjectMorphBoundaryFrame = buildEntradaGrammarObjectMorphBoundaryFrame;
    api.isIssuedEntradaGrammarObject = isIssuedEntradaGrammarObject;
    api.buildEntradaGrammarObjectFromCanonicalVerbSpec = buildEntradaGrammarObjectFromCanonicalVerbSpec;
    api.buildEntradaGrammarObjectFromComposerSemantic = buildEntradaGrammarObjectFromComposerSemantic;
    api.buildEntradaGrammarObjectFromMovingTargetParsed = buildEntradaGrammarObjectFromMovingTargetParsed;
    api.buildCurrentRegexEntradaGrammarObjectSourceFrame = buildCurrentRegexEntradaGrammarObjectSourceFrame;
    api.buildCurrentRegexEntradaGrammarObjectTargetFrame = buildCurrentRegexEntradaGrammarObjectTargetFrame;
    api.buildCurrentRegexEntradaGrammarObjectOperationFrame = buildCurrentRegexEntradaGrammarObjectOperationFrame;
    api.getCurrentRegexEntradaGrammarObjectOperationMismatch = getCurrentRegexEntradaGrammarObjectOperationMismatch;
    api.buildEntradaGrammarObjectFromCurrentRegexParseOperationFrame = buildEntradaGrammarObjectFromCurrentRegexParseOperationFrame;
    api.getCompoundAstExternalObjectSlotId = getCompoundAstExternalObjectSlotId;
    api.buildCompoundAstExternalObjectSlots = buildCompoundAstExternalObjectSlots;
    api.buildCompoundAstRouteFrame = buildCompoundAstRouteFrame;
    api.buildCompoundAstMetadata = buildCompoundAstMetadata;
    api.resolveOrdinaryNncParseFixture = resolveOrdinaryNncParseFixture;
    api.buildOrdinaryNncParseClassification = buildOrdinaryNncParseClassification;
    api.buildOrdinaryNncFixtureClassifications = buildOrdinaryNncFixtureClassifications;
    api.buildVerbMetaFromCanonicalSpec = buildVerbMetaFromCanonicalSpec;
    api.buildParsedVerbFromMovingTargetInput = buildParsedVerbFromMovingTargetInput;
    api.isVerbValueAllowed = isVerbValueAllowed;
    api.getInputGateRightmostStem = getInputGateRightmostStem;
    api.startsWithConsonantCluster = startsWithConsonantCluster;
    api.evaluateVerbStemInputGate = evaluateVerbStemInputGate;
    api.getAuthoritativeDerivationalSourceForRawInputGate = getAuthoritativeDerivationalSourceForRawInputGate;
    Object.defineProperty(api, "DEFAULT_NONSPECIFIC_VALENCE_AFFIXES", {
        configurable: true,
        enumerable: true,
        get() { return DEFAULT_NONSPECIFIC_VALENCE_AFFIXES; },
    });
    Object.defineProperty(api, "DEFAULT_NONSPECIFIC_VALENCE_AFFIX_SET", {
        configurable: true,
        enumerable: true,
        get() { return DEFAULT_NONSPECIFIC_VALENCE_AFFIX_SET; },
    });
    Object.defineProperty(api, "EXPLICIT_VALENCE_SHORTHAND_MAP", {
        configurable: true,
        enumerable: true,
        get() { return EXPLICIT_VALENCE_SHORTHAND_MAP; },
    });
    api.getNonspecificValenceAffixSetForMatching = getNonspecificValenceAffixSetForMatching;
    api.normalizeExplicitValenceToken = normalizeExplicitValenceToken;
    api.isNonspecificValenceAffixToken = isNonspecificValenceAffixToken;
    api.getExplicitValenceTokenFromSegment = getExplicitValenceTokenFromSegment;
    api.splitCompoundPartsWithExplicitFlags = splitCompoundPartsWithExplicitFlags;
    api.isFusionPrefixTokenForParsing = isFusionPrefixTokenForParsing;
    api.isObjectMarkerTokenForParsing = isObjectMarkerTokenForParsing;
    api.getValenceSlotsFromCleaned = getValenceSlotsFromCleaned;
    api.getExactBaseVerbFromCleaned = getExactBaseVerbFromCleaned;
    api.stripLeadingSupportiveLetterFromCoreSurface = stripLeadingSupportiveLetterFromCoreSurface;
    Object.defineProperty(api, "SLASH_MATRIX_FUSED_RULEBASES", {
        configurable: true,
        enumerable: true,
        get() { return SLASH_MATRIX_FUSED_RULEBASES; },
    });
    Object.defineProperty(api, "SLASH_MATRIX_FUSED_SUFFIXES", {
        configurable: true,
        enumerable: true,
        get() { return SLASH_MATRIX_FUSED_SUFFIXES; },
    });
    api.shouldFuseSlashMatrixRuleBase = shouldFuseSlashMatrixRuleBase;
    api.getLexicalBoundPrefixes = getLexicalBoundPrefixes;
    api.getExplicitBoundNonspecificPrefixes = getExplicitBoundNonspecificPrefixes;
    api.getSlashMatrixCompositeRuleBase = getSlashMatrixCompositeRuleBase;
    api.resolveCanonicalSourceSplit = resolveCanonicalSourceSplit;
    api.getEmbeddedVerbPrefixFromParts = getEmbeddedVerbPrefixFromParts;
    api.getValenceCategoryFromToken = getValenceCategoryFromToken;
    api.hasConsecutiveSpecificValences = hasConsecutiveSpecificValences;
    api.computeDirectionalRuleModeCore = computeDirectionalRuleModeCore;
    api.resolveDirectionalRuleMode = resolveDirectionalRuleMode;
    api.getDirectionalRulesForPrefix = getDirectionalRulesForPrefix;
    api.applyDirectionalRules = applyDirectionalRules;
    api.applyHualDirectionalRule = applyHualDirectionalRule;
    api.applyHualNounPlacement = applyHualNounPlacement;
    Object.defineProperty(api, "DIRECTIONAL_RULE_HANDLERS", {
        configurable: true,
        enumerable: true,
        get() { return DIRECTIONAL_RULE_HANDLERS; },
    });
    api.buildCurrentRegexShorthandSourceFrame = buildCurrentRegexShorthandSourceFrame;
    api.buildCurrentRegexShorthandOperationFrame = buildCurrentRegexShorthandOperationFrame;
    api.getCurrentRegexShorthandFrameMismatch = getCurrentRegexShorthandFrameMismatch;
    api.getCurrentRegexShorthandParseInput = getCurrentRegexShorthandParseInput;
    api.getCurrentRegexShorthandParseInputFromSourceFrame = getCurrentRegexShorthandParseInputFromSourceFrame;
    api.buildEmptyParsedVerb = buildEmptyParsedVerb;
    api.parseVerbInput = parseVerbInput;
    api.getParsedSyllableAnalysisTarget = getParsedSyllableAnalysisTarget;
    api.startsWithClassicalVelarSeries = startsWithClassicalVelarSeries;
    api.getDisambiguationPrefixCandidates = getDisambiguationPrefixCandidates;
    api.getDisambiguationAffixCandidates = getDisambiguationAffixCandidates;
    api.getDisambiguationSuffixCandidates = getDisambiguationSuffixCandidates;
    api.getDisambiguationKnownSuffixCandidates = getDisambiguationKnownSuffixCandidates;
    api.getDisambiguationLongSplitCandidates = getDisambiguationLongSplitCandidates;
    api.getShapePatternLabels = getShapePatternLabels;
    api.getPretClassSignatureFromParsed = getPretClassSignatureFromParsed;
    api.getPretClassSignatureFromValue = getPretClassSignatureFromValue;
    api.getDisambiguationSourceCoreFromParsed = getDisambiguationSourceCoreFromParsed;
    api.buildVerbDisambiguationSourceFrame = buildVerbDisambiguationSourceFrame;
    api.buildVerbDisambiguationCandidateFrames = buildVerbDisambiguationCandidateFrames;
    api.buildVerbDisambiguationOperationFrame = buildVerbDisambiguationOperationFrame;
    api.getVerbDisambiguationFrameMismatch = getVerbDisambiguationFrameMismatch;
    api.buildVerbDisambiguationCandidatesFromOperationFrame = buildVerbDisambiguationCandidatesFromOperationFrame;
    api.buildVerbDisambiguationCandidates = buildVerbDisambiguationCandidates;
    api.isRecognizedCurrentRegexValue = isRecognizedCurrentRegexValue;
    api.getInvalidVerbCharacters = getInvalidVerbCharacters;
    api.getInvalidVerbLetters = getInvalidVerbLetters;
    api.getInvalidVerbEnvelopeStructure = getInvalidVerbEnvelopeStructure;
    api.getInvalidVerbStructure = getInvalidVerbStructure;
    api.getInvalidVerbStructureMessage = getInvalidVerbStructureMessage;
    api.serializeCanonicalRegexEnvelope = serializeCanonicalRegexEnvelope;
    api.normalizeComposerScreenCoreValue = normalizeComposerScreenCoreValue;
    api.restoreBracketSupportiveMarkers = restoreBracketSupportiveMarkers;
    api.stripBracketSupportiveMarkersForDisplay = stripBracketSupportiveMarkersForDisplay;
    api.formatComposerDisplayMovingTargetPiece = formatComposerDisplayMovingTargetPiece;
    api.triggerInputShake = triggerInputShake;
    api.handleVerbBeforeInput = handleVerbBeforeInput;
    api.isPerfectiveTense = isPerfectiveTense;
    api.getEmptyNonactiveStemMetadataResult = getEmptyNonactiveStemMetadataResult;
    api.buildNonactiveDerivationOptions = buildNonactiveDerivationOptions;
    api.getLexicallyAttestedValencyReducedTransitiveVariant = getLexicallyAttestedValencyReducedTransitiveVariant;
    api.resolvePotencialHabitualReducedNonactiveSource = resolvePotencialHabitualReducedNonactiveSource;
    api.applyNonactiveDerivationFromOptions = applyNonactiveDerivationFromOptions;
    api.getParsedVerbNonactiveStemMetadata = getParsedVerbNonactiveStemMetadata;
    api.buildParsedVerbForTab = buildParsedVerbForTab;
    api.createEmptyComposerRegexState = createEmptyComposerRegexState;
    api.buildComposerStateFromCurrentRegexParsedTarget = buildComposerStateFromCurrentRegexParsedTarget;
    api.buildComposerStateFromCurrentRegexParseOperationFrame = buildComposerStateFromCurrentRegexParseOperationFrame;
    api.buildComposerStateFromMovingTargetParsed = buildComposerStateFromMovingTargetParsed;
    api.normalizeRegexCoreTokenCase = normalizeRegexCoreTokenCase;
    api.parseComposerPlaceholderBase = parseComposerPlaceholderBase;
    api.normalizeRegexSpecialSerialShorthandCore = normalizeRegexSpecialSerialShorthandCore;
    api.serializeRegexSpecialSerialShorthandValue = serializeRegexSpecialSerialShorthandValue;
    api.serializeComposerPlaceholderValenceScreen = serializeComposerPlaceholderValenceScreen;
    api.convertRegexCoreUppercaseMarkersToEnvelopeExplicitMarkers = convertRegexCoreUppercaseMarkersToEnvelopeExplicitMarkers;
    api.getRegexCoreMainObjectCount = getRegexCoreMainObjectCount;
    api.buildRegexDisplayVerb = buildRegexDisplayVerb;
    api.parseRegexCore = parseRegexCore;
    api.serializeRegexEnvelope = serializeRegexEnvelope;
    api.serializeRegexCore = serializeRegexCore;
    api.isAllowedPartialRegexEnvelopeValue = isAllowedPartialRegexEnvelopeValue;
    api.getStemLeadingSupportiveLetter = getStemLeadingSupportiveLetter;
    api.resolveComposerSupportiveMarkerCandidate = resolveComposerSupportiveMarkerCandidate;
    api.resolveOptionalSupportiveLetter = resolveOptionalSupportiveLetter;
    api.getDirectionalPrefixesSource = getDirectionalPrefixesSource;
    api.isDirectionalPrefixToken = isDirectionalPrefixToken;
    api.getBracketDirectionalPrefixToken = getBracketDirectionalPrefixToken;
    return api;
}

export function installParsingGlobals(targetObject = globalThis, installationContext = null) {
    const api = createParsingApi(targetObject, installationContext);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
