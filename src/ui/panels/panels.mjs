// Canonical modern ESM module.

export function createUiPanelsContext(targetObject = globalThis) {
    var UI_DENSITY_MODE = globalThis.UI_DENSITY_MODE || Object.freeze({
      simple: "simple",
      advanced: "advanced"
    });
    var NonactiveSelectionContextSignature = "";
    function getObjectCategory(prefix) {
      if (!prefix) {
        return "intransitive";
      }
      if (prefix === "mu") {
        return "reflexive";
      }
      if (prefix === "ta" || prefix === "te") {
        return "indirect";
      }
      return "direct";
    }
    function getObjectValenceCategory(prefix) {
      if (!prefix) {
        return "";
      }
      if (targetObject.NONSPECIFIC_VALENCE_AFFIX_SET.has(prefix)) {
        return "nonspecific";
      }
      if (targetObject.SPECIFIC_VALENCE_PREFIX_SET.has(prefix) || prefix === "k") {
        return "specific";
      }
      return "specific";
    }
    function getValenceCategoryLabel(category, classicalLocaleContext = false) {
      return category ? targetObject.getLocalizedLabel(targetObject.VALENCE_CATEGORY_LABELS[category], classicalLocaleContext, "") : "";
    }
    function getObjectValenceLabel(prefix, classicalLocaleContext = false) {
      const category = getObjectValenceCategory(prefix);
      return getValenceCategoryLabel(category, classicalLocaleContext);
    }
    function getObjectValenceLabelForGroup(prefixes, classicalLocaleContext = false) {
      const categories = new Set();
      prefixes.forEach(prefix => {
        const category = getObjectValenceCategory(prefix);
        if (category) {
          categories.add(category);
        }
      });
      if (!categories.size) {
        return "";
      }
      if (categories.size === 1) {
        const only = categories.values().next().value;
        return getValenceCategoryLabel(only, classicalLocaleContext);
      }
      const ordered = ["specific", "nonspecific"];
      const labels = ordered.filter(category => categories.has(category)).map(category => getValenceCategoryLabel(category, classicalLocaleContext)).filter(Boolean);
      return labels.join(" / ");
    }
    function hashSignatureToUInt32(signature = "") {
      let hash = 2166136261;
      const text = String(signature || "");
      for (let index = 0; index < text.length; index += 1) {
        hash ^= text.charCodeAt(index);
        hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
      }
      return hash >>> 0;
    }
    function normalizePrefixForComboPalette(prefix = "", options = {}) {
      const value = prefix || "";
      if (!value) {
        return "0";
      }
      if (value === targetObject.OBJECT_TOGGLE_ALL) {
        return "*";
      }
      if (options.collapseProjective && targetObject.VALENCE4_SPECIFIC_REPRESENTATIVE_PREFIXES.has(value)) {
        return "ki";
      }
      if (options.collapseSilentSpecific && targetObject.VALENCE4_SPECIFIC_REPRESENTATIVE_PREFIXES.has(value)) {
        return "0";
      }
      return value;
    }
    function buildBlockComboPaletteSignature({
      valency = 0,
      objectPrefix = "",
      indirectObjectMarker = "",
      thirdObjectMarker = "",
      derivationType = "",
      possessorPrefix = "",
      ownership = "",
      mode = "verb"
    }) {
      const hasMixedSelection = [objectPrefix, indirectObjectMarker, thirdObjectMarker, possessorPrefix].some(value => value === targetObject.OBJECT_TOGGLE_ALL);
      if (hasMixedSelection) {
        return "mixed";
      }
      const numericValency = Number.isFinite(Number(valency)) ? Math.max(1, Number(valency)) : 1;
      if (mode === "noun") {
        const normalizedObject = normalizePrefixForComboPalette(objectPrefix);
        const normalizedIndirect = normalizePrefixForComboPalette(indirectObjectMarker);
        const normalizedThird = normalizePrefixForComboPalette(thirdObjectMarker);
        const normalizedPossessor = normalizePrefixForComboPalette(possessorPrefix);
        const normalizedOwnership = ownership ? String(ownership) : "default";
        return `noun|v${numericValency}|${normalizedObject}|${normalizedIndirect}|${normalizedThird}|${normalizedPossessor}|${normalizedOwnership}`;
      }
      if (numericValency >= 4) {
        return `verb|v4|${targetObject.getObj1Obj2Obj3Signature({
          obj1: objectPrefix,
          obj2: indirectObjectMarker,
          obj3: thirdObjectMarker
        })}`;
      }
      if (numericValency === 3) {
        const normalized = targetObject.resolveDisplayObj1Obj2({
          obj1: objectPrefix,
          obj2: indirectObjectMarker,
          derivationType
        });
        const mainline = normalizePrefixForComboPalette(normalized.obj1 || "", {
          collapseProjective: true
        });
        const shuntline = normalizePrefixForComboPalette(normalized.obj2 || "", {
          collapseProjective: false
        });
        return `verb|v3|${mainline}|${shuntline}`;
      }
      if (numericValency === 2) {
        const normalizedObject = normalizePrefixForComboPalette(objectPrefix, {
          collapseProjective: true
        });
        return `verb|v2|${normalizedObject}`;
      }
      return `verb|v1|${normalizePrefixForComboPalette(objectPrefix, {
        collapseProjective: true
      })}`;
    }
    const COMBO_PALETTE_THEME_HUES = Object.freeze([26,
    // warm earth
    34,
    // sand / ochre
    44,
    // gold
    146,
    // leaf green
    168,
    // accent-cool teal
    186,
    // aqua-teal
    202,
    // direct blue
    342 // reflexive rose
    ]);
    function getComboPaletteSwatch(signature = "") {
      if (!signature || signature === "mixed") {
        return {
          background: "rgba(236, 230, 215, 0.86)",
          border: "rgba(132, 116, 91, 0.52)",
          text: "rgba(64, 53, 38, 0.95)",
          shadow: "0 12px 24px rgba(94, 70, 43, 0.16)"
        };
      }
      const hash = hashSignatureToUInt32(signature);
      const hueBase = COMBO_PALETTE_THEME_HUES[hash % COMBO_PALETTE_THEME_HUES.length];
      const hueShift = (hash >>> 8) % 9 - 4;
      const hue = (hueBase + hueShift + 360) % 360;
      const saturation = 46 + (hash >>> 13) % 10;
      const bgLightness = 90 + (hash >>> 18) % 4;
      const borderLightness = 54 + (hash >>> 22) % 9;
      const textLightness = 23 + (hash >>> 27) % 9;
      const shadowAlpha = 0.12 + (hash >>> 5) % 6 * 0.012;
      return {
        background: `hsl(${hue} ${saturation}% ${bgLightness}%)`,
        border: `hsl(${hue} ${Math.max(34, saturation - 12)}% ${borderLightness}%)`,
        text: `hsl(${hue} ${Math.max(28, saturation - 16)}% ${textLightness}%)`,
        shadow: `0 12px 24px hsla(${hue}, ${Math.max(30, saturation - 14)}%, 34%, ${shadowAlpha.toFixed(3)})`
      };
    }
    function applyTenseBlockComboPalette(tenseBlock, signature = "") {
      if (!tenseBlock) {
        return;
      }
      const normalizedSignature = signature || "mixed";
      const swatch = getComboPaletteSwatch(normalizedSignature);
      tenseBlock.classList.add("tense-block--combo-palette");
      tenseBlock.dataset.comboSignature = normalizedSignature;
      tenseBlock.style.setProperty("--combo-block-bg", swatch.background);
      tenseBlock.style.setProperty("--combo-block-border", swatch.border);
      tenseBlock.style.setProperty("--combo-block-text", swatch.text);
      tenseBlock.style.setProperty("--combo-block-shadow", swatch.shadow);
    }
    function applyObjectSectionCategory(sectionEl, prefix) {
      if (!sectionEl) {
        return;
      }
      sectionEl.classList.remove("object-section--direct", "object-section--indirect", "object-section--reflexive", "object-section--te");
      const category = getObjectCategory(prefix);
      if (category !== "intransitive") {
        sectionEl.classList.add(`object-section--${category}`);
      }
      if (prefix === "te") {
        sectionEl.classList.add("object-section--te");
      }
    }
    function applyConjugationRowClasses(row, objectPrefix) {
      if (!row) {
        return;
      }
      row.classList.add(`conjugation-row--${getObjectCategory(objectPrefix)}`);
      if (objectPrefix === "te") {
        row.classList.add("conjugation-row--te");
      }
    }

    // === UI Panels & Tabs ===
    function renderVerbMirror() {
      return;
    }
    function handleVerbMirrorBeforeInput(event) {
      void event;
    }
    function getVerbPrefixText(rawValue) {
      const raw = String(rawValue || "");
      const match = raw.match(/\[[iy]\]|[a-z0-9]/i);
      if (!match) {
        return raw;
      }
      const index = match.index || 0;
      return index > 0 ? raw.slice(0, index) : "";
    }
    function initUiScaleControl() {
      const scaleInput = targetObject.document.getElementById("ui-scale");
      if (!scaleInput) {
        return;
      }
      const valueEl = targetObject.document.getElementById("ui-scale-value");
      const root = targetObject.document.documentElement;
      const baseAdjustRaw = targetObject.getComputedStyle(root).getPropertyValue("--font-size-adjust");
      const baseAdjust = Number.parseFloat(baseAdjustRaw) || 0;
      const minValue = Number.parseFloat(scaleInput.min) || -6;
      const maxValue = Number.parseFloat(scaleInput.max) || 6;
      const safeMin = Math.max(minValue, -3);
      if (safeMin !== minValue) {
        scaleInput.min = String(safeMin);
      }
      const clampValue = value => Math.min(maxValue, Math.max(safeMin, value));
      const formatValue = value => value > 0 ? `+${value}` : `${value}`;
      const applyScale = offset => {
        const nextAdjust = baseAdjust + offset;
        root.style.setProperty("--font-size-adjust", `${nextAdjust}px`);
        if (valueEl) {
          valueEl.textContent = formatValue(offset);
        }
      };
      let initialOffset = Number.parseFloat(scaleInput.value) || 0;
      try {
        const saved = targetObject.window.localStorage ? targetObject.localStorage.getItem(targetObject.UI_SCALE_STORAGE_KEY) : null;
        if (saved !== null && saved !== "") {
          const savedValue = Number.parseFloat(saved);
          if (!Number.isNaN(savedValue)) {
            initialOffset = savedValue;
          }
        }
      } catch {
        initialOffset = Number.parseFloat(scaleInput.value) || 0;
      }
      initialOffset = clampValue(initialOffset);
      scaleInput.value = String(initialOffset);
      applyScale(initialOffset);
      scaleInput.addEventListener("input", () => {
        const offset = clampValue(Number.parseFloat(scaleInput.value) || 0);
        scaleInput.value = String(offset);
        applyScale(offset);
        try {
          if (targetObject.window.localStorage) {
            targetObject.localStorage.setItem(targetObject.UI_SCALE_STORAGE_KEY, String(offset));
          }
        } catch {
          // Ignore storage failures.
        }
      });
    }
    function normalizeUiDensityMode(mode = "") {
      if (mode === UI_DENSITY_MODE.advanced) {
        return UI_DENSITY_MODE.advanced;
      }
      return UI_DENSITY_MODE.simple;
    }
    function getActiveUiDensityMode() {
      if (targetObject.document.body?.classList.contains("is-ui-advanced")) {
        return UI_DENSITY_MODE.advanced;
      }
      return UI_DENSITY_MODE.simple;
    }
    function getClassicalNahuatlTabAuthorityFrame() {
      const classicalMode = targetObject.CLASSICAL_NAHUATL_PUBLIC_RUNTIME?.profileId || "classical-nahuatl";
      const wallFrame = typeof targetObject.buildClassicalNahuatlProfileWallFrame === "function" ? targetObject.buildClassicalNahuatlProfileWallFrame(classicalMode) : null;
      return {
        kind: "classical-nahuatl-tab-authority-frame",
        version: 1,
        active: true,
        tabMode: classicalMode,
        activeMode: classicalMode,
        authorityScope: "public-classical-runtime",
        profileWallKind: wallFrame?.kind || "",
        separationMechanism: "deployment-boundary",
        spellingInspection: wallFrame?.spellingInspection || "not-performed",
        sourceAuthority: wallFrame?.sourceAuthority || "Andrews transcription",
        grammarAuthority: wallFrame?.grammarAuthority || "Andrews transcription",
        sourceDocument: wallFrame?.sourceDocument || "ANDREWS_TRANSCRIPTION_CANVAS.md",
        outputLanguage: wallFrame?.outputLanguage || "Classical Nahuatl",
        outputAuthority: wallFrame?.outputAuthority || "Andrews transcription",
        orthographyAuthority: wallFrame?.orthographyAuthority || "Andrews transcription",
        orthographyPolicy: wallFrame?.orthographyPolicy || "transcription-direct",
        sharedRuntimePolicy: wallFrame?.sharedRuntimePolicy || "classical-only-runtime",
        classicalOutputImport: wallFrame?.classicalOutputImport || "authorized-within-classical-lane"
      };
    }
    function applyClassicalNahuatlTabAuthorityDataset(root = targetObject.document.body) {
      const frame = getClassicalNahuatlTabAuthorityFrame();
      if (!root?.dataset) {
        return frame;
      }
      root.dataset.classicalNahuatlTabAuthority = frame.active ? "active" : "inactive";
      root.dataset.classicalNahuatlAuthorityScope = frame.authorityScope;
      root.dataset.classicalNahuatlProfileWall = frame.profileWallKind || "";
      root.dataset.classicalNahuatlSeparationMechanism = frame.separationMechanism || "";
      root.dataset.classicalNahuatlSpellingInspection = frame.spellingInspection || "";
      root.dataset.classicalNahuatlSourceAuthority = frame.sourceAuthority;
      root.dataset.classicalNahuatlGrammarAuthority = frame.grammarAuthority;
      root.dataset.classicalNahuatlSourceDocument = frame.sourceDocument;
      root.dataset.classicalNahuatlOutputLanguage = frame.outputLanguage;
      root.dataset.classicalNahuatlOutputAuthority = frame.outputAuthority;
      root.dataset.classicalNahuatlOrthographyAuthority = frame.orthographyAuthority;
      root.dataset.classicalNahuatlOrthographyPolicy = frame.orthographyPolicy;
      root.dataset.classicalNahuatlClassicalOutputImport = frame.classicalOutputImport;
      root.dataset.classicalNahuatlSharedRuntimePolicy = frame.sharedRuntimePolicy;
      return frame;
    }
    function filterTenseOrderForUiDensity(tenses = [], mode = targetObject.getActiveTenseMode()) {
      const list = Array.isArray(tenses) ? tenses : [];
      if (getActiveUiDensityMode() !== UI_DENSITY_MODE.simple) {
        return list.slice();
      }
      if (mode !== targetObject.TENSE_MODE.verbo) {
        return list.slice();
      }
      return list.filter(tenseValue => !targetObject.UI_DENSITY_ADVANCED_TENSES.has(tenseValue));
    }
    function getUiDensityButtons() {
      return Array.from(targetObject.document.querySelectorAll("[data-ui-density]"));
    }
    function getVerbSourceScopeButtons() {
      return Array.from(targetObject.document.querySelectorAll("[data-verb-source-scope]"));
    }
    function syncVerbSourceScopeControl() {
      const control = targetObject.document.getElementById("verb-source-scope-control");
      const buttons = getVerbSourceScopeButtons();
      const shouldShow = getActiveUiDensityMode() !== UI_DENSITY_MODE.simple;
      if (control) {
        control.hidden = !shouldShow;
        control.classList.toggle("is-hidden", !shouldShow);
        control.setAttribute("aria-hidden", String(!shouldShow));
        control.setAttribute("aria-disabled", String(!shouldShow));
        control.setAttribute("aria-label", targetObject.getUiCopyLabel("verb-source-scope-label", "Voz"));
      }
      const activeScope = targetObject.getVerbSourceScope();
      buttons.forEach(button => {
        const buttonScope = button.getAttribute("data-verb-source-scope") || "";
        const isActive = buttonScope === activeScope;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
        button.disabled = !shouldShow;
        button.setAttribute("aria-disabled", String(!shouldShow));
      });
    }
    function applyVerbSourceScope(scope, anchor = null) {
      if (scope !== targetObject.VERB_SOURCE_SCOPE.active && scope !== targetObject.VERB_SOURCE_SCOPE.nonactive && scope !== targetObject.VERB_SOURCE_SCOPE.both) {
        return;
      }
      targetObject.setVerbSourceScope(scope, {
        syncLock: true,
        respectLock: false
      });
      const update = () => {
        targetObject.updateCombinedModeTabs();
        syncVerbSourceScopeControl();
        renderTenseTabs();
        const verbMeta = targetObject.getVerbInputMeta();
        targetObject.renderActiveConjugations({
          verb: verbMeta.displayVerb,
          objectPrefix: targetObject.getCurrentObjectPrefix()
        });
      };
      if (anchor) {
        targetObject.preserveViewportAnchorPosition(anchor, update);
        return;
      }
      update();
    }
    function initVerbSourceScopeControl() {
      getVerbSourceScopeButtons().forEach(button => {
        button.addEventListener("click", () => {
          if (getActiveUiDensityMode() === UI_DENSITY_MODE.simple) {
            return;
          }
          applyVerbSourceScope(button.getAttribute("data-verb-source-scope") || "", button);
        });
      });
      syncVerbSourceScopeControl();
    }
    function captureUiDensityGrammarSnapshot() {
      return {
        tenseMode: targetObject.getActiveTenseMode(),
        combinedMode: targetObject.getCombinedMode(),
        sourceScope: targetObject.getVerbSourceScope(),
        derivationType: targetObject.getActiveDerivationType(),
        nonactiveSuffix: targetObject.getSelectedNonactiveSuffix(),
        selectionState: targetObject.buildConjugationSelectionState()
      };
    }
    function restoreUiDensityGrammarSnapshot(snapshot) {
      if (!snapshot || typeof snapshot !== "object") {
        return false;
      }
      if (Object.values(targetObject.TENSE_MODE).includes(snapshot.tenseMode)) {
        targetObject.setActiveTenseMode(snapshot.tenseMode);
      }
      if (Object.values(targetObject.COMBINED_MODE).includes(snapshot.combinedMode)) {
        targetObject.setCombinedMode(snapshot.combinedMode);
      }
      if (snapshot.sourceScope === targetObject.VERB_SOURCE_SCOPE.active || snapshot.sourceScope === targetObject.VERB_SOURCE_SCOPE.nonactive || snapshot.sourceScope === targetObject.VERB_SOURCE_SCOPE.both) {
        targetObject.setVerbSourceScope(snapshot.sourceScope, {
          syncCombinedMode: false
        });
      }
      if (Object.values(targetObject.DERIVATION_TYPE).includes(snapshot.derivationType)) {
        targetObject.setActiveDerivationType(snapshot.derivationType);
        const select = targetObject.document.getElementById("derivation-type");
        if (select) {
          select.value = snapshot.derivationType;
        }
      }
      if (snapshot.nonactiveSuffix === null) {
        targetObject.setSelectedNonactiveSuffix(null);
      } else if (typeof snapshot.nonactiveSuffix === "string") {
        targetObject.setSelectedNonactiveSuffix(snapshot.nonactiveSuffix);
      }
      targetObject.updateTenseModeTabs();
      targetObject.updateDerivationTypeControl();
      renderTenseTabs();
      targetObject.applyConjugationSelectionState(targetObject.extractConjugationSelectionState(snapshot, {
        tenseMode: snapshot.tenseMode,
        tenseValue: snapshot.tenseTab,
        universalTenseValue: snapshot.pretUniversalTab
      }), {
        tenseMode: snapshot.tenseMode,
        availabilityEntries: targetObject.PreteritoUniversalAvailabilityCache
      });
      renderTenseTabs();
      const verbMeta = targetObject.getVerbInputMeta();
      const selectionState = targetObject.getCurrentResolvedConjugationSelectionState();
      targetObject.renderAllOutputs({
        verb: verbMeta.displayVerb,
        objectPrefix: targetObject.getCurrentObjectPrefix(),
        tense: selectionState.group === targetObject.CONJUGATION_GROUPS.universal ? selectionState.universalTenseValue : selectionState.tenseValue || targetObject.TENSE_ORDER[0] || "presente"
      });
      return true;
    }
    function forceDirectDerivationForSimpleMode() {
      if (targetObject.getActiveDerivationType() === targetObject.DERIVATION_TYPE.direct) {
        return;
      }
      targetObject.setActiveDerivationType(targetObject.DERIVATION_TYPE.direct);
      const select = targetObject.document.getElementById("derivation-type");
      if (select) {
        select.value = targetObject.DERIVATION_TYPE.direct;
      }
      targetObject.updateDerivationTypeControl();
      renderTenseTabs();
      const verbMeta = targetObject.getVerbInputMeta();
      targetObject.renderActiveConjugations({
        verb: verbMeta.displayVerb,
        objectPrefix: targetObject.getCurrentObjectPrefix()
      });
    }
    function forceSimpleModeGrammarDefaults() {
      const defaultTenseMode = targetObject.TENSE_MODE.verbo;
      if (targetObject.getActiveTenseMode() !== defaultTenseMode) {
        targetObject.setActiveTenseMode(defaultTenseMode);
      }
      if (targetObject.getVerbSourceScope() !== targetObject.VERB_SOURCE_SCOPE.active) {
        targetObject.setVerbSourceScope(targetObject.VERB_SOURCE_SCOPE.active, {
          syncCombinedMode: false,
          syncLock: false,
          respectLock: true
        });
      }
      if (targetObject.getCombinedMode() !== targetObject.COMBINED_MODE.active) {
        targetObject.setCombinedMode(targetObject.COMBINED_MODE.active);
        targetObject.updateCombinedModeTabs();
      }
      forceDirectDerivationForSimpleMode();
      targetObject.updateTenseModeTabs();
      renderTenseTabs();
      const verbMeta = targetObject.getVerbInputMeta();
      targetObject.renderActiveConjugations({
        verb: verbMeta.displayVerb,
        objectPrefix: targetObject.getCurrentObjectPrefix()
      });
    }
    function applyUiDensityMode(mode = "", {
      persist = true
    } = {}) {
      const nextMode = normalizeUiDensityMode(mode);
      const previousMode = getActiveUiDensityMode();
      const enteringSimple = previousMode !== UI_DENSITY_MODE.simple && nextMode === UI_DENSITY_MODE.simple;
      const leavingSimple = previousMode === UI_DENSITY_MODE.simple && nextMode !== UI_DENSITY_MODE.simple;
      const body = targetObject.document.body;
      const classicalDisplayOnly = body?.classList.contains("is-language-classical") === true;
      if (body) {
        body.classList.toggle("is-ui-simple", nextMode === UI_DENSITY_MODE.simple);
        body.classList.toggle("is-ui-advanced", nextMode === UI_DENSITY_MODE.advanced);
      }
      const buttons = getUiDensityButtons();
      buttons.forEach(button => {
        const buttonMode = normalizeUiDensityMode(button.getAttribute("data-ui-density") || "");
        const isActive = buttonMode === nextMode;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
      });
      if (enteringSimple && !classicalDisplayOnly) {
        targetObject.UiDensityGrammarSnapshot = captureUiDensityGrammarSnapshot();
        forceSimpleModeGrammarDefaults();
      } else if (leavingSimple && !classicalDisplayOnly && targetObject.UiDensityGrammarSnapshot) {
        restoreUiDensityGrammarSnapshot(targetObject.UiDensityGrammarSnapshot);
        targetObject.UiDensityGrammarSnapshot = null;
      } else if (leavingSimple && !classicalDisplayOnly && targetObject.getActiveTenseMode() === targetObject.TENSE_MODE.verbo) {
        targetObject.setVerbSourceScope(targetObject.VERB_SOURCE_SCOPE.both, {
          syncCombinedMode: false
        });
      }
      syncVerbSourceScopeControl();
      targetObject.syncComposerSlotChipVisibility();
      targetObject.scheduleComposerSlotChipVisibilitySync();
      targetObject.dispatchAppEvent("app:ui-density-changed", {
        mode: nextMode,
        previousMode
      });
      if (!persist) {
        return;
      }
      try {
        if (targetObject.window.localStorage) {
          targetObject.localStorage.setItem(targetObject.UI_DENSITY_STORAGE_KEY, nextMode);
        }
      } catch {
        // Ignore storage failures.
      }
    }
    function initializeClassicalNahuatlPublicRuntime() {
      const body = targetObject.document.body;
      if (body) {
        body.classList.add("is-language-classical");
      }
      return applyClassicalNahuatlTabAuthorityDataset(body);
    }
    function initUiDensityControl() {
      const buttons = getUiDensityButtons();
      let initialMode = UI_DENSITY_MODE.simple;
      try {
        const saved = targetObject.window.localStorage ? targetObject.localStorage.getItem(targetObject.UI_DENSITY_STORAGE_KEY) : null;
        if (saved) {
          initialMode = normalizeUiDensityMode(saved);
        }
      } catch {
        initialMode = UI_DENSITY_MODE.simple;
      }
      applyUiDensityMode(initialMode, {
        persist: false
      });
      buttons.forEach(button => {
        button.addEventListener("click", () => {
          const mode = button.getAttribute("data-ui-density") || "";
          applyUiDensityMode(mode);
        });
      });
    }
    function initZoomFontLock() {
      // Browser zoom is an accessibility input, not a layout disturbance to
      // cancel. Older builds divided the root font size by viewport scale,
      // which visually neutralized desktop zoom and defeated text reflow.
      // Retain this initializer as a stable public hook while explicitly
      // restoring native browser scaling on every platform.
      const root = targetObject.document.documentElement;
      if (!root) {
        return;
      }
      root.style.removeProperty("font-size");
      root.dataset.classicalNativeZoom = "enabled";
    }
    function registerEscapeOverlayHandler({
      id = "",
      priority = 0,
      isOpen = null,
      onEscape = null
    } = {}) {
      const overlayId = String(id || "");
      if (!overlayId || typeof isOpen !== "function" || typeof onEscape !== "function") {
        return;
      }
      const nextHandler = {
        id: overlayId,
        priority: Number.isFinite(priority) ? priority : 0,
        sequence: ++targetObject.ESCAPE_OVERLAY_HANDLER_SEQUENCE,
        isOpen,
        onEscape
      };
      const existingIndex = targetObject.ESCAPE_OVERLAY_HANDLERS.findIndex(entry => entry.id === overlayId);
      if (existingIndex >= 0) {
        targetObject.ESCAPE_OVERLAY_HANDLERS[existingIndex] = nextHandler;
        return;
      }
      targetObject.ESCAPE_OVERLAY_HANDLERS.push(nextHandler);
    }
    function closeEscapeManagedOverlay(event = null) {
      const handlers = targetObject.ESCAPE_OVERLAY_HANDLERS.filter(entry => entry && typeof entry.isOpen === "function" && entry.isOpen()).sort((left, right) => {
        const priorityDelta = (right.priority || 0) - (left.priority || 0);
        if (priorityDelta !== 0) {
          return priorityDelta;
        }
        return (right.sequence || 0) - (left.sequence || 0);
      });
      for (let index = 0; index < handlers.length; index += 1) {
        const handler = handlers[index];
        if (!handler || typeof handler.onEscape !== "function") {
          continue;
        }
        if (handler.onEscape(event) === false) {
          continue;
        }
        return true;
      }
      return false;
    }
    function matchesAltShortcutKey(event, key = "") {
      const normalizedKey = String(key || "").toLowerCase();
      if (!normalizedKey) {
        return false;
      }
      const eventKey = String(event?.key || "").toLowerCase();
      const eventCode = String(event?.code || "");
      return eventKey === normalizedKey || eventCode === `Key${normalizedKey.toUpperCase()}`;
    }
    function resolveAltShortcutLegendDescription(definition = {}) {
      if (!definition) {
        return "";
      }
      const directDescription = String(definition.legendDescription || "").trim();
      if (directDescription) {
        return directDescription;
      }
      if (definition.selector) {
        const target = targetObject.document.querySelector(definition.selector);
        const text = String(target?.textContent || "").trim();
        if (text) {
          return text.toLowerCase();
        }
      }
      return String(definition.fallbackDescription || "").trim();
    }
    function buildKeyboardLegendEntries() {
      const baseEntries = targetObject.KEYBOARD_LEGEND_BASE_ENTRIES.map(entry => ({
        ...entry
      }));
      const altEntries = [];
      targetObject.ALT_SHORTCUT_DEFINITIONS.forEach(definition => {
        const description = resolveAltShortcutLegendDescription(definition);
        if (!definition.label || !description) {
          return;
        }
        altEntries.push({
          label: definition.label,
          description
        });
      });
      return [...baseEntries.slice(0, 3), ...altEntries, ...baseEntries.slice(3)];
    }
    function buildKeyboardLegendSections() {
      const entries = buildKeyboardLegendEntries();
      return [{
        title: "Mover",
        entries: entries.filter(entry => ["Tab", "Space", "Enter", "Esc", "Esc x2"].includes(entry.label))
      }, {
        title: "Atajos",
        entries: entries.filter(entry => String(entry.label || "").startsWith("⌥/Alt +"))
      }, {
        title: "Edicion",
        entries: entries.filter(entry => ["Delete / Backspace", "Shift + Delete / Backspace", "⌥/Alt + Delete / Backspace"].includes(entry.label))
      }, {
        title: "Nota",
        entries: entries.filter(entry => entry.label === "Consejo"),
        note: true
      }].filter(section => Array.isArray(section.entries) && section.entries.length);
    }
    function renderKeyboardLegendEntries() {
      const list = targetObject.document.getElementById("keyboard-legend-list");
      if (!list) {
        return;
      }
      list.innerHTML = "";
      const sections = buildKeyboardLegendSections();
      sections.forEach(section => {
        const card = targetObject.document.createElement("section");
        card.className = `keyboard-legend-section${section.note ? " keyboard-legend-section--note" : ""}`;
        const heading = targetObject.document.createElement("h3");
        heading.className = "keyboard-legend-section__title";
        heading.textContent = section.title;
        card.appendChild(heading);
        const sectionList = targetObject.document.createElement("div");
        sectionList.className = "keyboard-legend-section__list";
        section.entries.forEach(entry => {
          const row = targetObject.document.createElement("div");
          row.className = `keyboard-legend-item${section.note ? " keyboard-legend-item--note" : ""}`;
          if (!section.note) {
            const key = targetObject.document.createElement("span");
            key.className = "keyboard-legend-item__key";
            key.textContent = entry.label;
            row.appendChild(key);
          }
          const text = targetObject.document.createElement("span");
          text.className = "keyboard-legend-item__text";
          text.textContent = entry.description;
          row.appendChild(text);
          sectionList.appendChild(row);
        });
        card.appendChild(sectionList);
        list.appendChild(card);
      });
    }
    function resetKeyboardLegendPopoverPosition(panel = null) {
      if (!panel) {
        return;
      }
      panel.style.removeProperty("position");
      panel.style.removeProperty("left");
      panel.style.removeProperty("top");
      panel.style.removeProperty("right");
      panel.style.removeProperty("bottom");
      panel.style.removeProperty("transform");
      panel.style.removeProperty("max-width");
    }
    function positionKeyboardLegendPopover() {
      const trigger = targetObject.document.getElementById("keyboard-legend-trigger");
      const panel = targetObject.document.getElementById("keyboard-legend");
      if (!trigger || !panel || panel.hidden) {
        return;
      }
      if (typeof targetObject.window === "undefined" || typeof targetObject.window.getComputedStyle !== "function") {
        return;
      }
      const isDesktop = typeof targetObject.window.matchMedia === "function" && targetObject.window.matchMedia("(min-width: 769px)").matches;
      if (!isDesktop) {
        resetKeyboardLegendPopoverPosition(panel);
        return;
      }
      const visualViewport = targetObject.window.visualViewport || null;
      const viewportWidth = Math.max(0, Number(visualViewport?.width) || targetObject.window.innerWidth || targetObject.document.documentElement.clientWidth || 0);
      const viewportHeight = Math.max(0, Number(visualViewport?.height) || targetObject.window.innerHeight || targetObject.document.documentElement.clientHeight || 0);
      const viewportOffsetLeft = Number(visualViewport?.offsetLeft) || 0;
      const viewportOffsetTop = Number(visualViewport?.offsetTop) || 0;
      const gap = 8;
      const margin = 16;
      const maxWidth = Math.max(240, viewportWidth - margin * 2);
      panel.style.position = "fixed";
      panel.style.right = "auto";
      panel.style.bottom = "auto";
      panel.style.transform = "none";
      panel.style.maxWidth = `${Math.round(maxWidth)}px`;
      const triggerRect = trigger.getBoundingClientRect();
      const panelRect = panel.getBoundingClientRect();
      const panelWidth = Math.min(panelRect.width || panel.offsetWidth || maxWidth, maxWidth);
      const panelHeight = Math.min(panelRect.height || panel.offsetHeight || 0, Math.max(120, viewportHeight - margin * 2));
      const availableLeft = triggerRect.left - gap - margin;
      const availableRight = viewportWidth - triggerRect.right - gap - margin;
      let left = viewportOffsetLeft + triggerRect.left - gap - panelWidth;
      if (availableLeft < panelWidth && availableRight >= panelWidth) {
        left = viewportOffsetLeft + triggerRect.right + gap;
      } else if (availableLeft < panelWidth && availableRight < panelWidth) {
        left = viewportOffsetLeft + Math.max(margin, Math.min(triggerRect.left + (triggerRect.width - panelWidth) / 2, viewportWidth - margin - panelWidth));
      }
      const minLeft = viewportOffsetLeft + margin;
      const maxLeft = viewportOffsetLeft + viewportWidth - margin - panelWidth;
      left = Math.min(Math.max(left, minLeft), Math.max(minLeft, maxLeft));
      let top = viewportOffsetTop + triggerRect.top + (triggerRect.height - panelHeight) / 2;
      const minTop = viewportOffsetTop + margin;
      const maxTop = viewportOffsetTop + viewportHeight - margin - panelHeight;
      top = Math.min(Math.max(top, minTop), Math.max(minTop, maxTop));
      panel.style.left = `${Math.round(left)}px`;
      panel.style.top = `${Math.round(top)}px`;
    }
    function initKeyboardLegendPopover() {
      const trigger = targetObject.document.getElementById("keyboard-legend-trigger");
      const panel = targetObject.document.getElementById("keyboard-legend");
      const closeButton = targetObject.document.getElementById("keyboard-legend-close");
      if (!trigger || !panel) {
        return;
      }
      let isOpen = false;
      const setOpen = (nextOpen, {
        focusTrigger = false
      } = {}) => {
        isOpen = Boolean(nextOpen);
        panel.hidden = !isOpen;
        panel.classList.toggle("is-open", isOpen);
        trigger.setAttribute("aria-expanded", String(isOpen));
        if (isOpen) {
          renderKeyboardLegendEntries();
          if (typeof targetObject.window !== "undefined" && typeof targetObject.window.requestAnimationFrame === "function") {
            targetObject.window.requestAnimationFrame(() => positionKeyboardLegendPopover());
          } else {
            positionKeyboardLegendPopover();
          }
        } else {
          resetKeyboardLegendPopoverPosition(panel);
        }
        targetObject.syncInputPopupOverlayActiveState();
        if (focusTrigger && typeof trigger.focus === "function") {
          trigger.focus({
            preventScroll: true
          });
        }
      };
      const closePopover = ({
        focusTrigger = false
      } = {}) => setOpen(false, {
        focusTrigger
      });
      const togglePopover = () => setOpen(!isOpen);
      trigger.addEventListener("click", event => {
        event.preventDefault();
        togglePopover();
      });
      if (closeButton) {
        closeButton.addEventListener("click", event => {
          event.preventDefault();
          closePopover({
            focusTrigger: true
          });
        });
      }
      targetObject.document.addEventListener("click", event => {
        if (!isOpen) {
          return;
        }
        const target = event.target;
        if (panel.contains(target) || trigger.contains(target)) {
          return;
        }
        closePopover();
      });
      registerEscapeOverlayHandler({
        id: "keyboard-legend",
        priority: 30,
        isOpen: () => isOpen,
        onEscape: () => {
          closePopover({
            focusTrigger: true
          });
          return true;
        }
      });
      const syncPopoverPosition = () => {
        if (!isOpen) {
          return;
        }
        positionKeyboardLegendPopover();
      };
      if (typeof targetObject.window !== "undefined" && typeof targetObject.window.addEventListener === "function") {
        targetObject.window.addEventListener("resize", syncPopoverPosition, {
          passive: true
        });
        targetObject.window.addEventListener("scroll", syncPopoverPosition, {
          passive: true
        });
      }
      if (targetObject.window.visualViewport && typeof targetObject.window.visualViewport.addEventListener === "function") {
        targetObject.window.visualViewport.addEventListener("resize", syncPopoverPosition);
        targetObject.window.visualViewport.addEventListener("scroll", syncPopoverPosition);
      }
      renderKeyboardLegendEntries();
      setOpen(false);
    }
    function resolveNonactiveSuffixOptionMap({
      verbMeta = null,
      verb = "",
      analysisVerb = ""
    } = {}) {
      const isTransitive = targetObject.isNonactiveTransitiveByObj1(targetObject.getCurrentObjectPrefix(), verbMeta);
      const options = targetObject.resolveLiveNonactiveOptions({
        verbMeta,
        verb,
        analysisVerb,
        isTransitive,
        rootPlusYaBase: verbMeta?.rootPlusYaBase
      });
      return targetObject.buildNonactiveOptionMap(options);
    }
    function buildNonactiveSelectionContextSignature({
      verbMeta = null,
      verb = "",
      analysisVerb = ""
    } = {}) {
      const sourceKey = String(verbMeta?.exactBaseVerb || verbMeta?.canonicalRuleBase || verbMeta?.analysisVerb || analysisVerb || verbMeta?.displayVerb || verb || "").trim().toLowerCase();
      const objectPrefix = typeof targetObject.getCurrentObjectPrefix === "function" ? String(targetObject.getCurrentObjectPrefix() || "") : "";
      const derivationType = typeof targetObject.getActiveDerivationType === "function" ? String(targetObject.getActiveDerivationType() || "") : "";
      const transitivity = targetObject.isNonactiveTransitiveByObj1(objectPrefix, verbMeta) ? "transitive" : "intransitive";
      return `${sourceKey}|${derivationType}|${objectPrefix}|${transitivity}`;
    }
    function normalizeSelectedNonactiveSuffix(optionMap = new Map(), selectionSignature = "") {
      let selected = targetObject.getSelectedNonactiveSuffix();
      if (selectionSignature && NonactiveSelectionContextSignature && selectionSignature !== NonactiveSelectionContextSignature) {
        selected = null;
        targetObject.setSelectedNonactiveSuffix(null);
      }
      NonactiveSelectionContextSignature = selectionSignature || "";
      if (targetObject.shouldForceAllNonactiveOptions()) {
        selected = null;
        targetObject.setSelectedNonactiveSuffix(null);
      }
      if (selected && !optionMap.has(selected)) {
        selected = null;
        targetObject.setSelectedNonactiveSuffix(null);
      }
      return selected;
    }
    function renderNonactiveTabs({
      verbMeta,
      verb,
      analysisVerb,
      hasVerb,
      endsWithConsonant
    }) {
      const container = targetObject.document.getElementById("nonactive-tabs");
      if (!container) {
        return;
      }
      const previousFocusSuffix = (() => {
        const activeElement = targetObject.document.activeElement;
        if (!activeElement || !container.contains(activeElement)) {
          return "";
        }
        if (typeof activeElement.getAttribute !== "function") {
          return "";
        }
        return activeElement.getAttribute("data-nonactive-suffix") || "";
      })();
      const classicalLocaleContext = false;
      const tenseMode = targetObject.getActiveTenseMode();
      const isVerbMode = tenseMode === targetObject.TENSE_MODE.verbo;
      const shouldShowNonactiveTabs = isVerbMode;
      container.setAttribute("role", "tablist");
      container.setAttribute("aria-label", targetObject.getLocalizedLabel({
        labelEs: "Derivación no activa",
        labelEs: "Derivación no activa"
      }, classicalLocaleContext, "Derivación no activa"));
      container.classList.toggle("is-hidden", !shouldShowNonactiveTabs);
      container.classList.toggle("is-disabled", !shouldShowNonactiveTabs);
      container.setAttribute("aria-hidden", String(!shouldShowNonactiveTabs));
      container.setAttribute("aria-disabled", String(!shouldShowNonactiveTabs));
      if (!shouldShowNonactiveTabs) {
        if (container.childElementCount) {
          container.innerHTML = "";
        }
        targetObject.NonactiveTabsDomSignature = "";
        NonactiveSelectionContextSignature = "";
        return;
      }
      const optionMap = resolveNonactiveSuffixOptionMap({
        verbMeta,
        verb,
        analysisVerb
      });
      const selectionSignature = buildNonactiveSelectionContextSignature({
        verbMeta,
        verb,
        analysisVerb
      });
      let selected = normalizeSelectedNonactiveSuffix(optionMap, selectionSignature);
      const signature = `${classicalLocaleContext ? "na" : "es"}|${targetObject.NONACTIVE_SUFFIX_ORDER.join(",")}`;
      const existingGrid = container.querySelector(".nonactive-tabs-grid");
      const existingButtons = new Map(Array.from(container.querySelectorAll(".nonactive-tab[data-nonactive-suffix]")).map(button => [button.dataset.nonactiveSuffix || "", button]));
      const canReuseDom = signature === targetObject.NonactiveTabsDomSignature && existingGrid && targetObject.NONACTIVE_SUFFIX_ORDER.every(suffix => existingButtons.has(suffix));
      const applyButtonState = (button, suffix) => {
        if (!button) {
          return;
        }
        const isAvailable = optionMap.has(suffix);
        const isActive = isAvailable && suffix === selected;
        button.disabled = endsWithConsonant || !hasVerb || !isAvailable;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("role", "tab");
        button.setAttribute("aria-selected", String(isActive));
        applyAndrewsTenseAuthorityDataset(button, {
          tenseValue: suffix,
          mode: targetObject.TENSE_MODE.verbo,
          blockKind: "CNV no-activo"
        });
      };
      if (canReuseDom) {
        container.querySelectorAll(".nonactive-tabs-heading").forEach(node => node.remove());
        targetObject.NONACTIVE_SUFFIX_ORDER.forEach(suffix => {
          const button = existingButtons.get(suffix);
          if (!button) {
            return;
          }
          const label = button.querySelector(".tense-tab-label");
          if (label) {
            label.textContent = targetObject.getLocalizedLabel(targetObject.NONACTIVE_SUFFIX_LABELS[suffix], classicalLocaleContext, suffix);
          }
          applyButtonState(button, suffix);
        });
        if (previousFocusSuffix) {
          const previousButton = existingGrid.querySelector(`[data-nonactive-suffix="${targetObject.escapeAttributeSelectorValue(previousFocusSuffix)}"]`);
          if (previousButton && !previousButton.disabled && typeof previousButton.focus === "function") {
            previousButton.focus({
              preventScroll: true
            });
          }
        }
        return;
      }
      container.innerHTML = "";
      const grid = targetObject.document.createElement("div");
      grid.className = "nonactive-tabs-grid";
      container.appendChild(grid);
      targetObject.NONACTIVE_SUFFIX_ORDER.forEach(suffix => {
        const button = targetObject.document.createElement("button");
        button.type = "button";
        button.className = "tense-tab nonactive-tab";
        button.dataset.nonactiveSuffix = suffix;
        button.setAttribute("role", "tab");
        button.setAttribute("aria-selected", "false");
        const label = targetObject.document.createElement("span");
        label.className = "tense-tab-label";
        label.textContent = targetObject.getLocalizedLabel(targetObject.NONACTIVE_SUFFIX_LABELS[suffix], classicalLocaleContext, suffix);
        button.appendChild(label);
        applyButtonState(button, suffix);
        button.addEventListener("click", () => {
          const current = targetObject.getSelectedNonactiveSuffix();
          targetObject.setSelectedNonactiveSuffix(current === suffix ? null : suffix);
          targetObject.preserveViewportAnchorPosition(button, () => {
            renderTenseTabs();
            const verbMeta = targetObject.getVerbInputMeta();
            targetObject.renderActiveConjugations({
              verb: verbMeta.displayVerb,
              objectPrefix: targetObject.getCurrentObjectPrefix()
            });
          });
        });
        grid.appendChild(button);
      });
      targetObject.NonactiveTabsDomSignature = signature;
      if (previousFocusSuffix) {
        const previousButton = grid.querySelector(`[data-nonactive-suffix="${targetObject.escapeAttributeSelectorValue(previousFocusSuffix)}"]`);
        if (previousButton && !previousButton.disabled && typeof previousButton.focus === "function") {
          previousButton.focus({
            preventScroll: true
          });
        }
      }
    }
    function getPanelConjugationRenderableSurface(result = null) {
      if (!result) {
        return "";
      }
      if (typeof targetObject.getConjugationRenderableSurface === "function") {
        return targetObject.getConjugationRenderableSurface(result);
      }
      return getPanelConjugationRenderableSurfaceForms(result).join(" / ");
    }
    function splitPanelConjugationRenderableSurfaceText(value = "") {
      return String(value || "").split(/\s*\/\s*/g).map(entry => String(entry || "").trim()).filter(entry => entry && entry !== "—");
    }
    function getPanelConjugationRenderableSurfaceForms(result = null) {
      if (!result) {
        return [];
      }
      const grammarFrame = (result?.grammarFrame && typeof result.grammarFrame === "object" ? result.grammarFrame : null) || (result?.frames && typeof result.frames === "object" ? result.frames : null);
      const frameResult = grammarFrame?.resultFrame && typeof grammarFrame.resultFrame === "object" ? grammarFrame.resultFrame : null;
      const hasResultFrame = Boolean(frameResult);
      const forms = [];
      if (Array.isArray(frameResult?.surfaceForms)) {
        forms.push(...frameResult.surfaceForms);
      }
      if (frameResult?.surface) {
        forms.push(frameResult.surface);
      }
      if (hasResultFrame) {
        return forms.flatMap(entry => splitPanelConjugationRenderableSurfaceText(entry)).filter((entry, index, list) => entry && list.indexOf(entry) === index);
      }
      if (!hasResultFrame && Array.isArray(result?.surfaceForms)) {
        forms.push(...result.surfaceForms);
      }
      if (!hasResultFrame && result?.surface) {
        forms.push(result.surface);
      }
      if (!hasResultFrame && result?.result) {
        forms.push(result.result);
      }
      return forms.flatMap(entry => splitPanelConjugationRenderableSurfaceText(entry)).filter((entry, index, list) => entry && list.indexOf(entry) === index);
    }
    function isConjugationResultVisible({
      result,
      subjectPrefix,
      subjectSuffix,
      objectPrefix,
      comboObjectPrefix,
      enforceInvalidCombo = true,
      hideReflexive = false
    }) {
      if (!getPanelConjugationRenderableSurface(result)) {
        return false;
      }
      const diagnosticRecord = targetObject.getConjugationMaskState({
        result,
        subjectPrefix,
        subjectSuffix,
        objectPrefix,
        comboObjectPrefix,
        enforceInvalidCombo
      });
      return diagnosticRecord.hasVisibleResult && !hideReflexive;
    }
    function buildVerbModeGenerateOverride({
      isNonactiveMode = false,
      derivationType = ""
    } = {}) {
      const tenseModeVerb = targetObject.TENSE_MODE.verbo || "verbo";
      const derivationModeActive = targetObject.DERIVATION_MODE.active || "active";
      const derivationModeNonactive = targetObject.DERIVATION_MODE.nonactive || "nonactive";
      const voiceModeActive = targetObject.VOICE_MODE.active || "active";
      const voiceModePassive = targetObject.VOICE_MODE.passive || "passive-impersonal";
      const resolvedDerivationType = Object.values(targetObject.DERIVATION_TYPE).includes(derivationType) ? derivationType : targetObject.getActiveDerivationType();
      return {
        tenseMode: tenseModeVerb,
        derivationMode: isNonactiveMode ? derivationModeNonactive : derivationModeActive,
        voiceMode: isNonactiveMode ? voiceModePassive : voiceModeActive,
        derivationType: resolvedDerivationType
      };
    }
    function buildTenseAvailabilityRecord({
      tenseValue = "",
      combinedMode = targetObject.COMBINED_MODE.active,
      source = "",
      summary = null,
      available = null,
      hasOutput = null
    }) {
      const realizedSummary = summary && typeof summary === "object" ? targetObject.realizeToggleAvailabilitySummary(summary) : null;
      const resolvedHasOutput = typeof hasOutput === "boolean" ? hasOutput : realizedSummary ? realizedSummary.availabilityState === targetObject.CONJUGATION_AVAILABILITY_STATE.viable : null;
      const resolvedAvailable = typeof available === "boolean" ? available : resolvedHasOutput === true ? true : resolvedHasOutput === false ? false : null;
      const availabilityState = realizedSummary ? realizedSummary.availabilityState : resolvedHasOutput === true ? targetObject.CONJUGATION_AVAILABILITY_STATE.viable : resolvedAvailable === false ? targetObject.CONJUGATION_AVAILABILITY_STATE.impossible : "";
      return {
        tenseValue: String(tenseValue || ""),
        combinedMode,
        source: source || "",
        available: resolvedAvailable === true,
        hasOutput: resolvedHasOutput === true,
        availabilityState,
        summary: realizedSummary
      };
    }
    function resolveTenseAvailabilityHasOutput(record = null) {
      if (!record || typeof record !== "object") {
        return null;
      }
      return record.hasOutput === true;
    }
    function resolveTenseAvailabilityIsAvailable(record = null) {
      if (!record || typeof record !== "object") {
        return null;
      }
      return record.available === true;
    }
    function resolveActiveVerbTenseAvailabilityRecord({
      verb,
      tenseValue,
      objectPrefixes,
      subjectSelections,
      availabilityMemo = null,
      availabilityMemoContext = ""
    }) {
      const shouldUseAvailabilityMemo = availabilityMemo instanceof Map;
      const modeOverride = buildVerbModeGenerateOverride({
        isNonactiveMode: false
      });
      let summary = targetObject.createToggleAvailabilityRealizationSummary();
      for (const objectPrefix of objectPrefixes) {
        for (const {
          selection
        } of subjectSelections) {
          const availabilityKey = ["active-availability", availabilityMemoContext, verb || "", tenseValue || "", selection.subjectPrefix || "", selection.subjectSuffix || "", objectPrefix || ""].join("|");
          const availabilityRecord = shouldUseAvailabilityMemo && availabilityMemo.has(availabilityKey) ? availabilityMemo.get(availabilityKey) : (() => {
            const result = targetObject.getCachedSilentGenerateWord({
              silent: true,
              skipValidation: true,
              override: {
                ...modeOverride,
                subjectPrefix: selection.subjectPrefix,
                subjectSuffix: selection.subjectSuffix,
                objectPrefix,
                verb,
                tense: tenseValue
              }
            }) || {};
            const maskState = targetObject.getConjugationMaskState({
              result,
              subjectPrefix: selection.subjectPrefix,
              subjectSuffix: selection.subjectSuffix,
              objectPrefix
            });
            const evaluation = targetObject.buildConjugationEvaluationRecord({
              result,
              maskState
            });
            if (shouldUseAvailabilityMemo) {
              availabilityMemo.set(availabilityKey, evaluation);
            }
            return evaluation;
          })();
          targetObject.recordToggleAvailabilityRealization(summary, availabilityRecord);
        }
      }
      return buildTenseAvailabilityRecord({
        tenseValue,
        combinedMode: targetObject.COMBINED_MODE.active,
        source: "verb-active-tense-tab",
        summary
      });
    }
    function resolveNonactiveVerbTenseAvailabilityRecord({
      verb,
      tenseValue,
      objectPrefixGroups,
      activeValency,
      nonactiveAvailableSlots,
      hasPromotableObject,
      fusionMarkers,
      availabilityMemo = null,
      availabilityMemoContext = ""
    }) {
      const resolvedFusionMarkers = Array.isArray(fusionMarkers) ? fusionMarkers : [];
      const shouldUseAvailabilityMemo = availabilityMemo instanceof Map;
      const modeOverride = buildVerbModeGenerateOverride({
        isNonactiveMode: true
      });
      let summary = targetObject.createToggleAvailabilityRealizationSummary();
      const checkRow = ({
        objectPrefix,
        subjectOverride,
        allowPassiveObject
      }) => {
        const availabilityKey = ["nonactive-availability", availabilityMemoContext, verb || "", tenseValue || "", String(activeValency || 0), String(nonactiveAvailableSlots || 0), hasPromotableObject ? "1" : "0", resolvedFusionMarkers.join(","), objectPrefix || "", subjectOverride?.subjectPrefix || "", subjectOverride?.subjectSuffix || "", allowPassiveObject ? "1" : "0"].join("|");
        if (shouldUseAvailabilityMemo && availabilityMemo.has(availabilityKey)) {
          const cachedRecord = availabilityMemo.get(availabilityKey);
          targetObject.recordToggleAvailabilityRealization(summary, cachedRecord);
          return cachedRecord.hasVisibleResult;
        }
        const overridePayload = {
          ...modeOverride,
          objectPrefix,
          verb,
          tense: tenseValue
        };
        if (subjectOverride) {
          overridePayload.subjectPrefix = subjectOverride.pers1;
          overridePayload.subjectSuffix = subjectOverride.pers2;
          overridePayload.preservePassiveSubject = true;
        }
        const result = targetObject.getCachedSilentGenerateWord({
          silent: true,
          skipValidation: true,
          allowPassiveObject,
          override: overridePayload
        }) || {};
        const hideReflexive = !!(result && result.isReflexive && getObjectCategory(objectPrefix) !== "reflexive");
        const maskState = targetObject.getConjugationMaskState({
          result,
          subjectPrefix: subjectOverride?.subjectPrefix || "",
          subjectSuffix: subjectOverride?.subjectSuffix || "",
          objectPrefix
        });
        const evaluation = targetObject.buildConjugationEvaluationRecord({
          result,
          maskState,
          extraDiagnostics: hideReflexive ? [targetObject.buildConjugationDiagnosticEntry(targetObject.CONJUGATION_DIAGNOSTIC_IDS.reflexiveHidden, "masked", {
            source: "result"
          })] : []
        });
        targetObject.recordToggleAvailabilityRealization(summary, evaluation);
        if (shouldUseAvailabilityMemo) {
          availabilityMemo.set(availabilityKey, evaluation);
        }
        return evaluation.hasVisibleResult;
      };
      for (const objectGroup of objectPrefixGroups) {
        const {
          prefixes
        } = objectGroup;
        const isDirectGroup = prefixes.every(prefix => targetObject.PASSIVE_IMPERSONAL_DIRECT_OBJECTS.has(prefix));
        const isPassiveNonactive = isDirectGroup;
        const forceImpersonal = isPassiveNonactive && !hasPromotableObject;
        const allowSubjectToggle = isPassiveNonactive && activeValency >= 2 && !forceImpersonal;
        const allowObjectToggle = isPassiveNonactive && nonactiveAvailableSlots > 0;
        let passiveSubjectPrefixes = allowSubjectToggle ? Array.from(targetObject.PASSIVE_IMPERSONAL_DIRECT_OBJECTS) : [];
        let objectTogglePrefixes = isDirectGroup && allowObjectToggle ? Array.from(new Set([...passiveSubjectPrefixes, ...Array.from(targetObject.OBJECT_MARKERS)])) : prefixes;
        if (allowSubjectToggle && allowObjectToggle && resolvedFusionMarkers.length >= 2) {
          const subjectMarker = resolvedFusionMarkers[0];
          const objectMarker = resolvedFusionMarkers[1];
          const constrainedSubject = targetObject.getNonactiveSlotPrefixes(subjectMarker, "subject");
          const constrainedObject = targetObject.getNonactiveSlotPrefixes(objectMarker, "object");
          if (constrainedSubject) {
            passiveSubjectPrefixes = constrainedSubject;
          }
          if (constrainedObject) {
            objectTogglePrefixes = constrainedObject;
          }
        }
        const allowPassiveObject = isDirectGroup && allowObjectToggle;
        const isIntransitiveOnly = prefixes.length === 1 && prefixes[0] === "";
        if (forceImpersonal || isIntransitiveOnly) {
          if (checkRow({
            objectPrefix: "",
            subjectOverride: null,
            allowPassiveObject
          })) {
            return buildTenseAvailabilityRecord({
              tenseValue,
              combinedMode: targetObject.COMBINED_MODE.nonactive,
              source: "verb-nonactive-tense-tab",
              summary
            });
          }
          continue;
        }
        if (isDirectGroup) {
          const subjectSelections = passiveSubjectPrefixes.filter(prefix => prefix !== "");
          const objectSelections = allowObjectToggle ? objectTogglePrefixes : [""];
          for (const subjectPrefix of subjectSelections) {
            const subjectOverride = targetObject.getPassiveSubjectOverride(subjectPrefix);
            if (!subjectOverride) {
              continue;
            }
            for (const objectPrefix of objectSelections) {
              if (checkRow({
                objectPrefix,
                subjectOverride,
                allowPassiveObject
              })) {
                return buildTenseAvailabilityRecord({
                  tenseValue,
                  combinedMode: targetObject.COMBINED_MODE.nonactive,
                  source: "verb-nonactive-tense-tab",
                  summary
                });
              }
            }
          }
          continue;
        }
        for (const objectPrefix of prefixes) {
          if (!objectPrefix) {
            continue;
          }
          if (checkRow({
            objectPrefix,
            subjectOverride: null,
            allowPassiveObject: false
          })) {
            return buildTenseAvailabilityRecord({
              tenseValue,
              combinedMode: targetObject.COMBINED_MODE.nonactive,
              source: "verb-nonactive-tense-tab",
              summary
            });
          }
        }
      }
      return buildTenseAvailabilityRecord({
        tenseValue,
        combinedMode: targetObject.COMBINED_MODE.nonactive,
        source: "verb-nonactive-tense-tab",
        summary
      });
    }
    function buildUnifiedVerbTenseAvailabilityMatrix({
      tenses = [],
      resolveTenseAvailabilityRecord = null
    }) {
      const matrix = new Map([[targetObject.COMBINED_MODE.active, new Map()], [targetObject.COMBINED_MODE.nonactive, new Map()]]);
      if (typeof resolveTenseAvailabilityRecord !== "function") {
        return matrix;
      }
      const list = Array.isArray(tenses) ? tenses : [];
      list.forEach(tenseValue => {
        matrix.get(targetObject.COMBINED_MODE.active).set(tenseValue, resolveTenseAvailabilityRecord(tenseValue, targetObject.COMBINED_MODE.active));
        matrix.get(targetObject.COMBINED_MODE.nonactive).set(tenseValue, resolveTenseAvailabilityRecord(tenseValue, targetObject.COMBINED_MODE.nonactive));
      });
      return matrix;
    }
    function setTensePresenceBadges(button, {
      active = false,
      nonactive = false
    } = {}) {
      if (!button) {
        return;
      }
      const entries = [{
        key: "active",
        label: "A",
        title: active ? "Activo disponible" : "Activo sin resultado",
        available: active === true
      }, {
        key: "nonactive",
        label: "NA",
        title: nonactive ? "No activo disponible" : "No activo sin resultado",
        available: nonactive === true
      }];
      button.dataset.activePresence = entries[0].available ? "available" : "absent";
      button.dataset.nonactivePresence = entries[1].available ? "available" : "absent";
      if (Number(button.dataset.andrewsRouteSuboperationCount || 0) > 0) {
        Array.from(button.children || []).find(child => child.classList?.contains("tense-tab-presence"))?.remove?.();
        button.dataset.presenceBadgeDisplay = "suppressed-by-andrews-operational-layer";
        return;
      }
      let row = Array.from(button.children || []).find(child => child.classList?.contains("tense-tab-presence"));
      if (!row) {
        row = targetObject.document.createElement("span");
        row.className = "tense-tab-presence";
        row.setAttribute("aria-hidden", "false");
        button.appendChild(row);
      }
      row.innerHTML = "";
      entries.forEach(entry => {
        const badge = targetObject.document.createElement("span");
        badge.className = `tense-tab-presence__badge ${entry.available ? "is-present" : "is-absent"}`;
        badge.dataset.presenceMode = entry.key;
        badge.textContent = entry.label;
        badge.title = entry.title;
        badge.setAttribute("aria-label", entry.title);
        row.appendChild(badge);
      });
    }
    function getAndrewsFirstTenseTabsAriaLabel(tenseMode = targetObject.TENSE_MODE.verbo) {
      if (tenseMode === targetObject.TENSE_MODE.verbo) {
        return "Ranura tiempo/modo de la CNV";
      }
      if (targetObject.isNominalTenseMode(tenseMode)) {
        return "Función nominal sin ranura tiempo de CNN";
      }
      return "Opciones de salida";
    }
    function getAndrewsFirstUniversalTabsAriaLabel() {
      return "Clases de tronco perfectivo";
    }
    const ANDREWS_TENSE_AUTHORITY_BY_TENSE = Object.freeze({
      presente: Object.freeze({
        scope: "andrews-licensed",
        source: "Andrews",
        sourceRefs: Object.freeze(["Andrews 5.4.1", "Andrews 5.5", "Andrews 7"]),
        slot: "tns",
        family: "indicative-imperfective-present",
        label: "Andrews logic",
        title: "Andrews Lecciones 5 y 7: presente indicativo, tronco imperfectivo, ranura tiempo Ø."
      }),
      "presente-habitual": Object.freeze({
        scope: "andrews-licensed",
        source: "Andrews",
        sourceRefs: Object.freeze(["Andrews 5.4.1", "Andrews 5.5", "Andrews 7"]),
        slot: "tns",
        family: "indicative-imperfective-customary-present",
        label: "Andrews logic",
        title: "Andrews Lecciones 5 y 7: presente habitual indicativo sobre tronco imperfectivo."
      }),
      imperfecto: Object.freeze({
        scope: "andrews-licensed",
        source: "Andrews",
        sourceRefs: Object.freeze(["Andrews 5.4.1", "Andrews 5.5", "Andrews 7"]),
        slot: "tns",
        family: "indicative-imperfective-past",
        label: "Andrews logic",
        title: "Andrews Lecciones 5 y 7: imperfecto indicativo, tronco imperfectivo, morfo ya."
      }),
      futuro: Object.freeze({
        scope: "andrews-licensed",
        source: "Andrews",
        sourceRefs: Object.freeze(["Andrews 5.4.2", "Andrews 5.5", "Andrews 7"]),
        slot: "tns",
        family: "indicative-imperfective-future",
        label: "Andrews logic",
        title: "Andrews Lecciones 5 y 7: futuro indicativo, tronco imperfectivo, morfo s."
      }),
      preterito: Object.freeze({
        scope: "andrews-licensed",
        source: "Andrews",
        sourceRefs: Object.freeze(["Andrews 5.4.2", "Andrews 5.5", "Andrews 7"]),
        slot: "tns",
        family: "indicative-perfective-preterit",
        label: "Andrews logic",
        title: "Andrews Lecciones 5 y 7: preterito indicativo, tronco perfectivo, morfo Ø."
      }),
      "pasado-remoto": Object.freeze({
        scope: "andrews-licensed",
        source: "Andrews",
        sourceRefs: Object.freeze(["Andrews 5.4.1", "Andrews 5.5", "Andrews 7"]),
        slot: "tns",
        family: "indicative-perfective-distant-past",
        label: "Andrews logic",
        title: "Andrews Lecciones 5 y 7: pasado remoto indicativo, tronco perfectivo, morfo ka."
      }),
      optativo: Object.freeze({
        scope: "andrews-licensed",
        source: "Andrews",
        sourceRefs: Object.freeze(["Andrews 5.4.3", "Andrews 5.5", "Andrews 9"]),
        slot: "tns",
        family: "optative-nonpast",
        label: "Andrews logic",
        title: "Andrews Lecciones 5 y 9: optativo no pasado."
      }),
      "preterito-universal-1": Object.freeze({
        scope: "andrews-licensed",
        source: "Andrews",
        sourceRefs: Object.freeze(["Andrews 7"]),
        slot: "stem-class",
        family: "perfective-stem-class-a",
        label: "Andrews logic",
        title: "Andrews Leccion 7: clase A de tronco perfectivo."
      }),
      "preterito-universal-2": Object.freeze({
        scope: "andrews-licensed",
        source: "Andrews",
        sourceRefs: Object.freeze(["Andrews 7"]),
        slot: "stem-class",
        family: "perfective-stem-class-b",
        label: "Andrews logic",
        title: "Andrews Leccion 7: clase B de tronco perfectivo."
      }),
      "preterito-universal-4": Object.freeze({
        scope: "andrews-licensed",
        source: "Andrews",
        sourceRefs: Object.freeze(["Andrews 7"]),
        slot: "stem-class",
        family: "perfective-stem-class-c",
        label: "Andrews logic",
        title: "Andrews Leccion 7: clase C de tronco perfectivo."
      }),
      "preterito-universal-3": Object.freeze({
        scope: "andrews-licensed",
        source: "Andrews",
        sourceRefs: Object.freeze(["Andrews 7"]),
        slot: "stem-class",
        family: "perfective-stem-class-d",
        label: "Andrews logic",
        title: "Andrews Leccion 7: clase D de tronco perfectivo."
      })
    });
    const issuedAndrewsTenseAuthorityFrames = new WeakSet();
    function cloneAndrewsTenseAuthorityFrame(frame = null) {
      if (!frame || typeof frame !== "object") {
        return null;
      }
      return {
        ...frame,
        sourceRefs: Array.isArray(frame.sourceRefs) ? Array.from(frame.sourceRefs) : []
      };
    }
    function issueAndrewsTenseAuthorityFrame(frame = null) {
      const clone = cloneAndrewsTenseAuthorityFrame(frame);
      if (!clone) {
        return null;
      }
      Object.freeze(clone.sourceRefs);
      Object.freeze(clone);
      issuedAndrewsTenseAuthorityFrames.add(clone);
      return clone;
    }
    function normalizeAndrewsSourceTargetFormulaType(value = "") {
      return String(value || "").trim().toUpperCase();
    }
    function getAndrewsSourceTargetFormulaTransition(sourceFormulaType = "", targetFormulaType = "") {
      const source = normalizeAndrewsSourceTargetFormulaType(sourceFormulaType);
      const target = normalizeAndrewsSourceTargetFormulaType(targetFormulaType);
      return source && target ? `${source}->${target}` : "";
    }
    function getAndrewsSourceTargetRouteClass(formulaTransition = "") {
      const transition = String(formulaTransition || "").trim().toUpperCase();
      if (transition === "CNV->CNN") {
        return "verbal-source-to-nominal-target";
      }
      if (transition === "CNN->CNN") {
        return "nominal-source-to-nominal-target";
      }
      if (transition === "CNN->CNV") {
        return "nominal-source-to-verbal-target";
      }
      if (transition === "CNV->CNV") {
        return "verbal-source-to-verbal-target";
      }
      if (/CNV\/CNN|CNN\/CNV|CNV\+CNN|CNN\+CNV|CN\+CN/.test(transition)) {
        return "mixed-compound-source-target-route";
      }
      return transition ? "other-source-target-route" : "unclassified-source-target-route";
    }
    function getAndrewsSourceTargetRouteUiHost(formulaTransition = "", requestedHost = "") {
      const explicitHost = String(requestedHost || "").trim();
      if (explicitHost) {
        return explicitHost;
      }
      const transition = String(formulaTransition || "").trim().toUpperCase();
      if (transition === "CNV->CNN") {
        return "nominal-output-tab-or-block";
      }
      if (transition === "CNN->CNN") {
        return "nominal-route-directory-or-output-continuation";
      }
      if (transition === "CNN->CNV") {
        return "andrews-route-directory-or-output-continuation";
      }
      if (transition === "CNV->CNV") {
        return "verb-derivation-controls-or-output-continuation";
      }
      if (getAndrewsSourceTargetRouteClass(transition) === "mixed-compound-source-target-route") {
        return "mixed-compound-route-directory";
      }
      return "andrews-route-diagnostic";
    }
    function getAndrewsTenseSourceTargetRouteSpec(tenseValue = "", mode = targetObject.TENSE_MODE.verbo) {
      const normalizedTense = String(tenseValue || "").trim();
      const normalizedMode = String(mode || "").trim();
      if (normalizedTense === "selection-required") {
        return {
          formulaTransition: "CNV/CNN->CNV/CNN",
          routeBranch: "route-selection-required",
          uiHost: "output-route-selection-gate"
        };
      }
      if (normalizedMode === targetObject.TENSE_MODE.verbo && typeof targetObject.NONACTIVE_SUFFIX_ORDER !== "undefined" && Array.isArray(targetObject.NONACTIVE_SUFFIX_ORDER) && targetObject.NONACTIVE_SUFFIX_ORDER.includes(normalizedTense)) {
        return {
          formulaTransition: "CNV->CNV",
          routeBranch: "nonactive-verbstem",
          uiHost: "verb-derivation-controls-or-output-continuation"
        };
      }
      if (normalizedMode === targetObject.TENSE_MODE.verbo && normalizedTense) {
        return {
          formulaTransition: "CNV->CNV",
          routeBranch: "finite-cnv-tense-frame",
          uiHost: "verb-tense-tab"
        };
      }
      if (targetObject.isNominalTenseMode(normalizedMode)) {
        return {
          formulaTransition: "CNN->CNN",
          routeBranch: "canonical-nnc-operation",
          uiHost: "generic-construction-control"
        };
      }
      if (normalizedMode === targetObject.TENSE_MODE.particula) {
        return {
          formulaTransition: "PARTICLE_CANDIDATE->PARTICLE_BOUNDARY",
          routeBranch: "particle-boundary",
          uiHost: "particle-boundary-block"
        };
      }
      return {
        formulaTransition: "",
        routeBranch: "",
        uiHost: "andrews-route-diagnostic"
      };
    }
    function getAndrewsTenseSourceTargetRouteAuthorityFrame(tenseValue = "", mode = targetObject.TENSE_MODE.verbo) {
      const spec = getAndrewsTenseSourceTargetRouteSpec(tenseValue, mode);
      const formulaTransition = spec.formulaTransition || "";
      const [sourceFromTransition = "", targetFromTransition = ""] = formulaTransition.split("->");
      const sourceFormulaType = sourceFromTransition || "";
      const targetFormulaType = targetFromTransition || "";
      const resolvedTransition = formulaTransition || getAndrewsSourceTargetFormulaTransition(sourceFormulaType, targetFormulaType);
      const routeClass = getAndrewsSourceTargetRouteClass(resolvedTransition);
      const uiHost = getAndrewsSourceTargetRouteUiHost(resolvedTransition, spec.uiHost);
      const operationalLayer = getAndrewsCnvCnnOperationalLayerForTense(tenseValue, mode);
      const operationalCoverageAudit = operationalLayer && typeof targetObject.auditAndrewsCnvCnnOperationalLayerCoverage === "function" ? targetObject.auditAndrewsCnvCnnOperationalLayerCoverage(operationalLayer.label || tenseValue) : null;
      const routeSuboperations = Array.isArray(operationalLayer?.operations) ? operationalLayer.operations : [];
      const routeSuboperationItems = routeSuboperations.map(operation => ({
        id: operation.id || "",
        family: operation.family || "",
        andrewsSection: operation.andrewsSection || "",
        operation: operation.operation || "",
        generationStatus: operation.generationStatus || "",
        routeStage: operation.routeStage || ""
      }));
      return {
        authority: "semantic source-target diagnostic",
        logicAuthority: "ANDREWS_TRANSCRIPTION_CANVAS.md",
        tenseValue: String(tenseValue || ""),
        mode: String(mode || ""),
        routeIds: [],
        matchedRouteIds: [],
        registryStatus: "retired-parallel-route-registry",
        formulaTransition: resolvedTransition,
        sourceFormulaType,
        targetFormulaType,
        routeClass,
        routeBranch: spec.routeBranch || "",
        uiHost,
        routeFamilies: [],
        routeKinds: [],
        sourceGateStatus: "",
        sourceEvidenceStatus: "",
        generationAllowed: false,
        generationGate: "diagnostic-does-not-authorize-generation",
        operationalLayerKind: operationalLayer?.kind || "",
        routeSuboperationCount: operationalLayer?.operationCount || 0,
        routeSuboperationIds: Array.isArray(operationalLayer?.operationIds) ? Array.from(operationalLayer.operationIds) : [],
        routeSuboperationItems,
        routeSuboperationFamilies: Array.from(new Set(routeSuboperations.map(operation => operation.family || "").filter(Boolean))),
        routeSuboperationSections: Array.from(new Set(routeSuboperations.map(operation => operation.andrewsSection || "").filter(Boolean))),
        routeSuboperationSourceRequirementKeys: Array.isArray(operationalLayer?.sourceRequirementKeys) ? Array.from(operationalLayer.sourceRequirementKeys) : [],
        routeSuboperationTransformKeys: Array.isArray(operationalLayer?.transformKeys) ? Array.from(operationalLayer.transformKeys) : [],
        routeSuboperationBuildKeys: Array.isArray(operationalLayer?.buildKeys) ? Array.from(operationalLayer.buildKeys) : [],
        routeSuboperationGeneratedCount: operationalLayer?.generationSummary?.generatedCount || 0,
        routeSuboperationSourceGatedCount: operationalLayer?.generationSummary?.sourceGatedCount || 0,
        routeSuboperationDiagnosticOnlyCount: operationalLayer?.generationSummary?.diagnosticOnlyCount || 0,
        routeSuboperationCoverageAuditKind: operationalCoverageAudit?.kind || "",
        routeSuboperationCoverageComplete: operationalCoverageAudit?.complete === true,
        routeSuboperationExpectedSectionCount: operationalCoverageAudit?.expectedSectionCount || 0,
        routeSuboperationRepresentedSectionCount: operationalCoverageAudit?.representedSectionCount || 0,
        routeSuboperationMissingSectionCount: Array.isArray(operationalCoverageAudit?.missingSections) ? operationalCoverageAudit.missingSections.length : 0,
        routeSuboperationMissingSections: Array.isArray(operationalCoverageAudit?.missingSections) ? Array.from(operationalCoverageAudit.missingSections) : [],
        classicalSpellingRole: "structural-only",
        outputSpellingAuthority: "Andrews transcription"
      };
    }
    function getAndrewsCnvCnnOperationalLayerForTense(tenseValue = "", mode = targetObject.TENSE_MODE.verbo) {
      const normalizedTense = String(tenseValue || "").trim();
      if (!normalizedTense || typeof targetObject.getAndrewsCnvCnnOperationalLayer !== "function") {
        return null;
      }
      const layer = targetObject.getAndrewsCnvCnnOperationalLayer(normalizedTense);
      if (!layer || !layer.operationCount) {
        return null;
      }
      const normalizedMode = String(mode || "").trim();
      if (!targetObject.isNominalTenseMode(normalizedMode)) {
        return null;
      }
      return layer;
    }
    function getAndrewsCnvCnnOperationalLayerDisplayText(sourceTargetRoute = null) {
      const count = Number(sourceTargetRoute?.routeSuboperationCount || 0);
      if (!count) {
        return "";
      }
      const sections = Array.isArray(sourceTargetRoute.routeSuboperationSections) ? sourceTargetRoute.routeSuboperationSections.slice(0, 3).filter(Boolean) : [];
      const suffix = sections.length ? `: ${sections.join(", ")}` : "";
      return `${count} ops${suffix}`;
    }
    function syncAndrewsTenseOperationalLayerElement(element = null, sourceTargetRoute = null) {
      const count = Number(sourceTargetRoute?.routeSuboperationCount || 0);
      if (!element || typeof element.querySelector !== "function") {
        return;
      }
      if (element.classList?.contains?.("tense-block")) {
        syncAndrewsTenseBlockOperationalLayerElement(element, sourceTargetRoute);
        return;
      }
      if (!element.classList?.contains?.("tense-tab")) {
        return;
      }
      if (count) {
        Array.from(element.children || []).find(child => child.classList?.contains("tense-tab-presence"))?.remove?.();
        if (element.dataset) {
          element.dataset.presenceBadgeDisplay = "suppressed-by-andrews-operational-layer";
        }
      }
      let summary = element.querySelector(":scope > .tense-tab-operational-layer");
      if (!count) {
        summary?.remove?.();
        return;
      }
      if (!summary && typeof targetObject.document !== "undefined" && typeof targetObject.document.createElement === "function") {
        summary = targetObject.document.createElement("span");
        summary.className = "tense-tab-operational-layer";
        summary.setAttribute("aria-hidden", "true");
        element.appendChild(summary);
      }
      if (!summary) {
        return;
      }
      summary.textContent = getAndrewsCnvCnnOperationalLayerDisplayText(sourceTargetRoute);
      summary.title = Array.isArray(sourceTargetRoute.routeSuboperationIds) ? sourceTargetRoute.routeSuboperationIds.join(" | ") : "";
    }
    function syncAndrewsTenseBlockOperationalLayerElement(element = null, sourceTargetRoute = null) {
      const count = Number(sourceTargetRoute?.routeSuboperationCount || 0);
      if (!element || typeof element.querySelector !== "function") {
        return;
      }
      let panel = element.querySelector(":scope > .tense-block-operational-layer");
      if (!count) {
        panel?.remove?.();
        return;
      }
      const title = element.querySelector(":scope > .tense-block__title");
      if (!title || typeof targetObject.document === "undefined" || typeof targetObject.document.createElement !== "function") {
        if (title === null && element.dataset && element.dataset.andrewsOperationalLayerSyncPending !== "true" && typeof targetObject.setTimeout === "function") {
          element.dataset.andrewsOperationalLayerSyncPending = "true";
          targetObject.setTimeout(() => {
            if (element.dataset) {
              element.dataset.andrewsOperationalLayerSyncPending = "";
            }
            syncAndrewsTenseBlockOperationalLayerElement(element, sourceTargetRoute);
          }, 0);
        }
        return;
      }
      if (!panel) {
        panel = targetObject.document.createElement("details");
        panel.className = "tense-block-operational-layer";
        title.insertAdjacentElement("afterend", panel);
      }
      panel.dataset.andrewsOperationalLayer = sourceTargetRoute.operationalLayerKind || "";
      panel.dataset.andrewsRouteSuboperationCount = String(count);
      panel.dataset.andrewsRouteSuboperationIds = Array.isArray(sourceTargetRoute.routeSuboperationIds) ? sourceTargetRoute.routeSuboperationIds.join("|") : "";
      panel.dataset.andrewsRouteSuboperationCoverageComplete = String(sourceTargetRoute.routeSuboperationCoverageComplete === true);
      panel.dataset.andrewsRouteSuboperationMissingSectionCount = String(sourceTargetRoute.routeSuboperationMissingSectionCount || 0);
      panel.innerHTML = "";
      const summary = targetObject.document.createElement("summary");
      summary.className = "tense-block-operational-layer__summary";
      const summaryLabel = targetObject.document.createElement("span");
      summaryLabel.className = "tense-block-operational-layer__summary-label";
      summaryLabel.textContent = "Operaciones";
      const summaryCount = targetObject.document.createElement("span");
      summaryCount.className = "tense-block-operational-layer__summary-count";
      summaryCount.textContent = String(count);
      const summaryCoverage = targetObject.document.createElement("span");
      summaryCoverage.className = "tense-block-operational-layer__summary-coverage";
      summaryCoverage.textContent = sourceTargetRoute.routeSuboperationCoverageComplete ? "cobertura Andrews" : `${sourceTargetRoute.routeSuboperationMissingSectionCount || 0} faltantes`;
      summary.append(summaryLabel, summaryCount, summaryCoverage);
      panel.appendChild(summary);
      const list = targetObject.document.createElement("div");
      list.className = "tense-block-operational-layer__list";
      appendAndrewsOperationalLayerOperationRows(list, sourceTargetRoute, "tense-block-operational-layer");
      panel.appendChild(list);
    }
    function appendAndrewsOperationalLayerOperationRows(list = null, sourceTargetRoute = null, classPrefix = "tense-block-operational-layer") {
      if (!list || typeof targetObject.document === "undefined" || typeof targetObject.document.createElement !== "function") {
        return;
      }
      const items = Array.isArray(sourceTargetRoute.routeSuboperationItems) ? sourceTargetRoute.routeSuboperationItems : [];
      items.forEach(operation => {
        const row = targetObject.document.createElement("div");
        row.className = `${classPrefix}__op`;
        row.dataset.operationId = operation.id || "";
        row.dataset.operationFamily = operation.family || "";
        row.dataset.operationSection = operation.andrewsSection || "";
        row.dataset.operationStatus = operation.generationStatus || "";
        const section = targetObject.document.createElement("span");
        section.className = `${classPrefix}__section`;
        section.textContent = operation.andrewsSection || "";
        const name = targetObject.document.createElement("span");
        name.className = `${classPrefix}__name`;
        name.textContent = operation.operation || operation.id || "";
        const family = targetObject.document.createElement("span");
        family.className = `${classPrefix}__family`;
        family.textContent = operation.family || operation.generationStatus || "";
        row.append(section, name, family);
        list.appendChild(row);
      });
    }
    function syncAndrewsTenseTabsOperationalLayerPanel(root = null, {
      mode = ""
    } = {}) {
      const scope = root || (typeof targetObject.document !== "undefined" ? targetObject.document : null);
      if (!scope || typeof scope.querySelector !== "function" || typeof targetObject.document === "undefined" || typeof targetObject.document.createElement !== "function") {
        return null;
      }
      let panel = scope.querySelector(":scope > .tense-tabs-operational-layer-panel");
      const tabs = Array.from(scope.querySelectorAll(".tense-tab--andrews-operational-layer[data-tense-value]"));
      const activeTab = tabs.find(tab => tab.classList?.contains("is-active")) || tabs.find(tab => String(tab.getAttribute?.("aria-selected") || "") === "true") || tabs[0] || null;
      const count = Number(activeTab?.dataset?.andrewsRouteSuboperationCount || 0);
      if (!activeTab || !count) {
        panel?.remove?.();
        return null;
      }
      const descriptor = getAndrewsTenseAuthorityDomDescriptor(activeTab, {
        mode
      });
      const sourceTargetRoute = getAndrewsTenseSourceTargetRouteAuthorityFrame(descriptor.tenseValue, descriptor.mode);
      if (!sourceTargetRoute.routeSuboperationCount) {
        panel?.remove?.();
        return null;
      }
      if (!panel) {
        panel = targetObject.document.createElement("details");
        panel.className = "tense-tabs-operational-layer-panel";
        scope.appendChild(panel);
      }
      panel.dataset.andrewsTenseValue = descriptor.tenseValue;
      panel.dataset.andrewsTenseMode = descriptor.mode;
      panel.dataset.andrewsOperationalLayer = sourceTargetRoute.operationalLayerKind || "";
      panel.dataset.andrewsRouteSuboperationCount = String(sourceTargetRoute.routeSuboperationCount || 0);
      panel.dataset.andrewsRouteSuboperationIds = sourceTargetRoute.routeSuboperationIds.join("|");
      panel.dataset.andrewsRouteSuboperationCoverageComplete = String(sourceTargetRoute.routeSuboperationCoverageComplete === true);
      panel.dataset.andrewsRouteSuboperationMissingSectionCount = String(sourceTargetRoute.routeSuboperationMissingSectionCount || 0);
      panel.innerHTML = "";
      const summary = targetObject.document.createElement("summary");
      summary.className = "tense-tabs-operational-layer-panel__summary";
      const label = targetObject.document.createElement("span");
      label.className = "tense-tabs-operational-layer-panel__label";
      label.textContent = activeTab.querySelector(".tense-tab-label")?.textContent?.trim() || descriptor.tenseValue;
      const countBadge = targetObject.document.createElement("span");
      countBadge.className = "tense-tabs-operational-layer-panel__count";
      countBadge.textContent = `${sourceTargetRoute.routeSuboperationCount} operaciones`;
      const coverageBadge = targetObject.document.createElement("span");
      coverageBadge.className = "tense-tabs-operational-layer-panel__coverage";
      coverageBadge.textContent = sourceTargetRoute.routeSuboperationCoverageComplete ? "cobertura Andrews" : `${sourceTargetRoute.routeSuboperationMissingSectionCount || 0} faltantes`;
      summary.append(label, countBadge, coverageBadge);
      panel.appendChild(summary);
      const list = targetObject.document.createElement("div");
      list.className = "tense-tabs-operational-layer-panel__list";
      appendAndrewsOperationalLayerOperationRows(list, sourceTargetRoute, "tense-tabs-operational-layer-panel");
      panel.appendChild(list);
      return panel;
    }
    function getAndrewsTenseAuthorityFrame(tenseValue = "", mode = targetObject.TENSE_MODE.verbo) {
      const normalizedMode = String(mode || "").trim();
      const normalizedTense = String(tenseValue || "").trim();
      if (normalizedTense === "selection-required") {
        return issueAndrewsTenseAuthorityFrame({
          scope: "andrews-output-gate",
          source: "Andrews",
          sourceRefs: ["Andrews output route gate"],
          slot: "route-selection-required",
          family: "output-selection",
          label: "Andrews output gate",
          title: "Output remains blocked until an Andrews-compatible route selection fixes the grammar frame."
        });
      }
      if (targetObject.isNominalTenseMode(normalizedMode)) {
        return issueAndrewsTenseAuthorityFrame({
          scope: "andrews-nominal-route",
          source: "Andrews",
          sourceRefs: ["Andrews nominal CNN route"],
          slot: "no-vnc-tns",
          family: normalizedTense || "nominal-route",
          label: "Andrews nominal route",
          title: "CNN routes do not expose a VNC tense slot; Andrews controls the nominal source route."
        });
      }
      if (normalizedMode === targetObject.TENSE_MODE.particula) {
        return issueAndrewsTenseAuthorityFrame({
          scope: "andrews-particle-boundary",
          source: "Andrews",
          sourceRefs: ["Andrews 3"],
          slot: "no-vnc-tns",
          family: normalizedTense || "particle-boundary",
          label: "Andrews particle boundary",
          title: "Particula mode is not a CNV tense route; Andrews controls the particle boundary and Classical realization."
        });
      }
      if (
        normalizedMode === targetObject.TENSE_MODE.verbo
        && typeof targetObject.getAndrewsCnvTenseLogicAuthorityFrame === "function"
      ) {
        const coreFrame = cloneAndrewsTenseAuthorityFrame(
          targetObject.getAndrewsCnvTenseLogicAuthorityFrame(normalizedTense)
        );
        const directFrame = cloneAndrewsTenseAuthorityFrame(
          ANDREWS_TENSE_AUTHORITY_BY_TENSE[normalizedTense]
        );
        const nonactiveFrame = coreFrame?.scope === "andrews-licensed"
          && coreFrame?.slot === "derived-stem"
          && coreFrame?.family === "nonactive-verbstem";
        const matchingFiniteFrame = coreFrame?.scope === "andrews-licensed"
          && directFrame?.scope === "andrews-licensed"
          && coreFrame.slot === directFrame.slot
          && coreFrame.family === directFrame.family;
        if (nonactiveFrame) {
          return issueAndrewsTenseAuthorityFrame(coreFrame);
        }
        if (matchingFiniteFrame) {
          return issueAndrewsTenseAuthorityFrame(directFrame);
        }
      }
      return issueAndrewsTenseAuthorityFrame({
        scope: "unknown",
        source: "unclassified",
        sourceRefs: [],
        slot: "andrews-frame-required",
        family: normalizedTense || "unknown",
        label: "unclassified",
        title: "An Andrews grammar frame is required before Classical output can be generated."
      });
    }
    function getAndrewsTenseGenerationGateFrame(authorityFrame = null) {
      const issuedFrame = issuedAndrewsTenseAuthorityFrames.has(authorityFrame)
        ? authorityFrame
        : null;
      const scope = String(issuedFrame?.scope || "").trim();
      const slot = String(issuedFrame?.slot || "").trim();
      if (scope === "andrews-licensed") {
        return {
          logicRole: slot === "derived-stem" ? "derived-stem-logic-source" : "grammar-logic-source",
          generationGate: "andrews-licensed-generation",
          outputRole: "orthography-realization",
          boundaryRealizationRole: "classical-boundary-realization-only",
          classicalOutputImport: "blocked"
        };
      }
      if (scope === "andrews-nominal-route") {
        return {
          logicRole: "nominal-route-logic-source",
          generationGate: "andrews-nominal-route-no-vnc-tns",
          outputRole: "orthography-realization",
          boundaryRealizationRole: "classical-boundary-realization-only",
          classicalOutputImport: "blocked"
        };
      }
      if (scope === "andrews-particle-boundary") {
        return {
          logicRole: "particle-boundary-logic-source",
          generationGate: "andrews-particle-boundary-no-vnc-tns",
          outputRole: "orthography-realization",
          boundaryRealizationRole: "classical-boundary-realization-only",
          classicalOutputImport: "blocked"
        };
      }
      if (scope === "andrews-output-gate") {
        return {
          logicRole: "route-selection-gate",
          generationGate: "route-selection-required",
          outputRole: "blocked-until-route-selection",
          boundaryRealizationRole: "not-a-grammar-gate",
          classicalOutputImport: "blocked"
        };
      }
      return {
        logicRole: "andrews-frame-required",
        generationGate: "unclassified-andrews-frame-required",
        outputRole: "blocked-until-andrews-frame",
        boundaryRealizationRole: "not-a-grammar-gate",
        classicalOutputImport: "blocked"
      };
    }
    function getAndrewsTenseGenerationGateValue(tenseValue = "", mode = targetObject.TENSE_MODE.verbo) {
      return getAndrewsTenseGenerationGateFrame(getAndrewsTenseAuthorityFrame(tenseValue, mode)).generationGate || "";
    }
    function isAndrewsCnvTenseGenerationGateAllowed(tenseValue = "", mode = targetObject.TENSE_MODE.verbo) {
      return getAndrewsTenseGenerationGateValue(tenseValue, mode) === "andrews-licensed-generation";
    }
    function getAndrewsTenseAuthorityElementContract(element = null) {
      const classList = element?.classList || null;
      const renderedTag = String(element?.tagName || "").trim().toLowerCase();
      const isTab = !!classList?.contains("tense-tab");
      const isBlock = !!classList?.contains("tense-block");
      if (isTab) {
        return {
          role: "tense-tab",
          contract: "button.tense-tab",
          expectedTag: "button",
          renderedTag,
          diagnostic: renderedTag && renderedTag !== "button" ? "tense-tab-not-button" : ""
        };
      }
      if (isBlock) {
        return {
          role: "tense-block",
          contract: "div.tense-block",
          expectedTag: "div",
          renderedTag,
          diagnostic: renderedTag && renderedTag !== "div" ? "tense-block-not-div" : ""
        };
      }
      return {
        role: "",
        contract: "",
        expectedTag: "",
        renderedTag: "",
        diagnostic: ""
      };
    }
    function getAndrewsTenseExecutorGateFrame(authorityFrame = null) {
      const generationGate = getAndrewsTenseGenerationGateFrame(authorityFrame);
      const gateValue = generationGate?.generationGate || "";
      const generationAllowed = gateValue === "andrews-licensed-generation";
      return {
        generationGate: gateValue,
        routeStage: generationAllowed ? "cnv-finite-output" : "andrews-cnv-tense-logic-gate",
        generationAllowed,
        formulaShellPolicy: generationAllowed ? "formula-shell-allowed" : "blocked-before-formula-shell",
        surfacePolicy: generationAllowed ? "classical-boundary-realization-required" : "blocked-before-surface",
        fallbackPolicy: generationAllowed ? "surface-output-not-grammar-authority" : "blocked-no-target-stem-fallback"
      };
    }
    function getAndrewsTenseTabSelectionAuthorityState({
      tenseValue = "",
      mode = targetObject.TENSE_MODE.verbo,
      hasOutput = null,
      isAvailable = null,
      endsWithConsonant = false,
      isBlockedNominalTense = false,
      isUniversal = false
    } = {}) {
      const normalizedMode = String(mode || "").trim() || targetObject.TENSE_MODE.verbo;
      const frame = getAndrewsTenseAuthorityFrame(tenseValue, normalizedMode);
      const generationGate = getAndrewsTenseGenerationGateFrame(frame);
      const blockedReasons = [];
      if (endsWithConsonant) {
        blockedReasons.push("input-orthography-boundary");
      }
      if (isBlockedNominalTense) {
        blockedReasons.push("andrews-nominal-source-blocked");
      }
      if (normalizedMode === targetObject.TENSE_MODE.verbo && generationGate.generationGate !== "andrews-licensed-generation") {
        blockedReasons.push(generationGate.generationGate || "not-andrews-grammar-gate");
      }
      if (isUniversal && isAvailable === false) {
        blockedReasons.push("andrews-stem-class-unavailable");
      }
      const outputAvailability = hasOutput === true ? "surface-available" : hasOutput === false ? "surface-unavailable" : "surface-uncomputed";
      const blocked = blockedReasons.length > 0;
      const outputAvailabilityRole = blocked ? "selection-hard-gate" : hasOutput === false ? "orthography-output-probe-not-grammar-gate" : "orthography-realization";
      return {
        frame,
        generationGate,
        selectionGate: blocked ? "blocked" : "selectable",
        blocked,
        disabled: blocked,
        blockedReasons,
        outputAvailability,
        outputAvailabilityRole
      };
    }
    function buildAndrewsTenseTabClickAuthorityModel(selectionTargetFrame = null, diagnosticId = "") {
      const hasSelectionTarget = selectionTargetFrame && typeof selectionTargetFrame === "object" && selectionTargetFrame.kind === "andrews-tense-tab-selection-audit-target-frame";
      const sourceFrame = hasSelectionTarget ? {
        kind: "andrews-tense-tab-click-authority-source-frame",
        version: 1,
        selectionGate: selectionTargetFrame.selectionGate || "",
        selectionBlocked: selectionTargetFrame.blocked === true,
        selectionDisabled: selectionTargetFrame.disabled === true,
        selectionBlockedReasons: String(selectionTargetFrame.selectionBlocked || "").split("|").map(entry => entry.trim()).filter(Boolean),
        selectionAuthority: selectionTargetFrame.selectionAuthority || "",
        selectionLogicAuthority: selectionTargetFrame.selectionLogicAuthority || "",
        selectionGrammarGate: selectionTargetFrame.selectionGrammarGate || "",
        selectionOutputRole: selectionTargetFrame.selectionOutputRole || "",
        selectionOrthographyBoundary: selectionTargetFrame.selectionOrthographyBoundary || "",
        selectionClassicalOutputImport: selectionTargetFrame.selectionClassicalOutputImport || ""
      } : null;
      const blockedReasons = [];
      if (!sourceFrame) {
        blockedReasons.push(diagnosticId || "andrews-selection-audit-operation-frame-missing");
      }
      if (sourceFrame?.selectionGate === "blocked") {
        blockedReasons.push("andrews-selection-gate-blocked");
      }
      if (sourceFrame?.selectionDisabled === true) {
        blockedReasons.push("andrews-selection-disabled");
      }
      sourceFrame?.selectionBlockedReasons.forEach(reason => {
        if (reason && !blockedReasons.includes(reason)) {
          blockedReasons.push(reason);
        }
      });
      const blocked = blockedReasons.length > 0;
      const targetFrame = {
        kind: "andrews-tense-tab-click-authority-target-frame",
        version: 1,
        clickGate: blocked ? "blocked" : "allowed",
        blocked,
        blockedReasons,
        selectionGate: sourceFrame?.selectionGate || "",
        selectionAuthority: sourceFrame?.selectionAuthority || "",
        selectionLogicAuthority: sourceFrame?.selectionLogicAuthority || "",
        selectionGrammarGate: sourceFrame?.selectionGrammarGate || "",
        selectionOutputRole: sourceFrame?.selectionOutputRole || "",
        selectionOrthographyBoundary: sourceFrame?.selectionOrthographyBoundary || "",
        selectionClassicalOutputImport: sourceFrame?.selectionClassicalOutputImport || ""
      };
      return {
        kind: "andrews-tense-tab-click-authority-model",
        version: 1,
        sourceFrame,
        operationFrame: {
          kind: "andrews-tense-tab-click-authority-operation-frame",
          version: 1,
          status: sourceFrame ? "authorized" : "blocked",
          operation: "authorize-tense-tab-click-from-selection-target-frame",
          sourceFrame,
          targetFrame
        },
        targetFrame
      };
    }
    function getAndrewsTenseTabClickAuthorityState(element = null) {
      const selectionModelTarget = getAndrewsTenseTabSelectionAuditModelTarget(element);
      const clickAuthorityModel = buildAndrewsTenseTabClickAuthorityModel(selectionModelTarget.targetFrame, selectionModelTarget.diagnosticId);
      const targetFrame = clickAuthorityModel.targetFrame || {};
      const blockedReasons = Array.isArray(targetFrame.blockedReasons) ? targetFrame.blockedReasons : [];
      return {
        selectionGate: targetFrame.selectionGate || "",
        clickGate: targetFrame.clickGate || "blocked",
        blocked: targetFrame.blocked !== false,
        blockedReasons,
        clickAuthorityModel
      };
    }
    function applyAndrewsTenseTabClickAuthorityDataset(element = null) {
      const state = getAndrewsTenseTabClickAuthorityState(element);
      if (element) {
        Object.defineProperty(element, "andrewsTenseTabClickAuthorityModel", {
          configurable: true,
          enumerable: false,
          writable: true,
          value: state.clickAuthorityModel
        });
      }
      if (element?.dataset) {
        element.dataset.andrewsClickGate = state.clickGate;
        element.dataset.andrewsClickBlocked = state.blockedReasons.join("|");
        element.dataset.andrewsClickAuthority = "ANDREWS_TRANSCRIPTION_CANVAS.md";
      }
      return state;
    }
    function isAndrewsTenseTabClickAllowed(element = null) {
      return getAndrewsTenseTabClickAuthorityState(element).blocked !== true;
    }
    function buildAndrewsTenseTabSelectionAuditModel(state = {}, {
      selected = false,
      ariaSelected = false,
      nativeDisabled = false
    } = {}) {
      const generationGate = state.generationGate && typeof state.generationGate === "object" ? state.generationGate : {};
      const sourceFrame = {
        kind: "andrews-tense-tab-selection-audit-source-frame",
        version: 1,
        selectionGate: state.selectionGate || "",
        blocked: state.blocked === true,
        disabled: state.disabled === true,
        blockedReasons: Array.isArray(state.blockedReasons) ? state.blockedReasons.map(entry => String(entry || "").trim()).filter(Boolean) : [],
        outputAvailability: state.outputAvailability || "",
        outputAvailabilityRole: state.outputAvailabilityRole || "",
        generationGate: generationGate.generationGate || "",
        outputRole: generationGate.outputRole || "",
        classicalOutputImport: generationGate.classicalOutputImport || "blocked",
        orthographyBoundary: "classical-visible-realization",
        logicAuthority: "ANDREWS_TRANSCRIPTION_CANVAS.md",
        authority: "ANDREWS_TRANSCRIPTION_CANVAS.md"
      };
      const targetFrame = {
        kind: "andrews-tense-tab-selection-audit-target-frame",
        version: 1,
        selectionGate: sourceFrame.selectionGate,
        selectable: sourceFrame.selectionGate === "selectable",
        blocked: sourceFrame.selectionGate === "blocked",
        selected: Boolean(selected) && sourceFrame.selectionGate !== "blocked",
        ariaSelected: Boolean(ariaSelected) && sourceFrame.selectionGate !== "blocked",
        blockedSelected: false,
        outputProbeOnly: sourceFrame.outputAvailabilityRole === "orthography-output-probe-not-grammar-gate",
        hardGate: sourceFrame.outputAvailabilityRole === "selection-hard-gate",
        disabled: sourceFrame.disabled,
        nativeDisabled: Boolean(nativeDisabled),
        missingSelectionMetadata: false,
        selectionAuthority: sourceFrame.authority,
        selectionLogicAuthority: sourceFrame.logicAuthority,
        selectionGrammarGate: sourceFrame.generationGate,
        selectionOutputRole: sourceFrame.outputRole,
        selectionOrthographyBoundary: sourceFrame.orthographyBoundary,
        selectionClassicalOutputImport: sourceFrame.classicalOutputImport,
        selectionSurfaceProbeRole: sourceFrame.outputAvailabilityRole,
        selectionBoundaryRealizationRole: sourceFrame.outputAvailabilityRole,
        selectionBlocked: sourceFrame.blockedReasons.join("|")
      };
      return {
        kind: "andrews-tense-tab-selection-audit-model",
        version: 1,
        sourceFrame,
        operationFrame: {
          kind: "andrews-tense-tab-selection-audit-operation-frame",
          version: 1,
          status: "authorized",
          operation: "audit-tense-tab-selection-from-state-frame",
          sourceFrame,
          targetFrame
        },
        targetFrame
      };
    }
    function getEmptyAndrewsTenseTabSelectionAuditRecord(diagnosticId = "") {
      const diagnostics = diagnosticId ? [diagnosticId] : [];
      return {
        isTab: true,
        selectionGate: "",
        selectable: false,
        blocked: false,
        selected: false,
        ariaSelected: false,
        blockedSelected: false,
        outputProbeOnly: false,
        hardGate: false,
        disabled: false,
        nativeDisabled: false,
        missingSelectionMetadata: true,
        diagnostics,
        ok: diagnostics.length === 0
      };
    }
    function getAndrewsTenseTabSelectionAuditModelTarget(element = null) {
      const model = element?.andrewsTenseTabSelectionAuditModel && typeof element.andrewsTenseTabSelectionAuditModel === "object" ? element.andrewsTenseTabSelectionAuditModel : null;
      const operationFrame = model?.operationFrame && typeof model.operationFrame === "object" ? model.operationFrame : null;
      if (!model || model.kind !== "andrews-tense-tab-selection-audit-model" || !operationFrame || operationFrame.kind !== "andrews-tense-tab-selection-audit-operation-frame" || operationFrame.status !== "authorized" || operationFrame.operation !== "audit-tense-tab-selection-from-state-frame") {
        return {
          targetFrame: null,
          diagnosticId: "andrews-selection-audit-operation-frame-missing"
        };
      }
      const sourceFrame = operationFrame.sourceFrame && typeof operationFrame.sourceFrame === "object" ? operationFrame.sourceFrame : null;
      const targetFrame = operationFrame.targetFrame && typeof operationFrame.targetFrame === "object" ? operationFrame.targetFrame : null;
      if (!sourceFrame || sourceFrame.kind !== "andrews-tense-tab-selection-audit-source-frame" || !targetFrame || targetFrame.kind !== "andrews-tense-tab-selection-audit-target-frame") {
        return {
          targetFrame: null,
          diagnosticId: "andrews-selection-audit-source-or-target-frame-missing"
        };
      }
      const expected = {
        selectionGate: sourceFrame.selectionGate || "",
        selectable: sourceFrame.selectionGate === "selectable",
        blocked: sourceFrame.selectionGate === "blocked",
        disabled: sourceFrame.disabled === true,
        outputProbeOnly: sourceFrame.outputAvailabilityRole === "orthography-output-probe-not-grammar-gate",
        hardGate: sourceFrame.outputAvailabilityRole === "selection-hard-gate",
        missingSelectionMetadata: false,
        selectionAuthority: sourceFrame.authority || "",
        selectionLogicAuthority: sourceFrame.logicAuthority || "",
        selectionGrammarGate: sourceFrame.generationGate || "",
        selectionOutputRole: sourceFrame.outputRole || "",
        selectionOrthographyBoundary: sourceFrame.orthographyBoundary || "",
        selectionClassicalOutputImport: sourceFrame.classicalOutputImport || "",
        selectionSurfaceProbeRole: sourceFrame.outputAvailabilityRole || "",
        selectionBoundaryRealizationRole: sourceFrame.outputAvailabilityRole || "",
        selectionBlocked: Array.isArray(sourceFrame.blockedReasons) ? sourceFrame.blockedReasons.join("|") : ""
      };
      const mismatched = Object.entries(expected).some(([key, expectedValue]) => String(targetFrame[key] ?? "").trim() !== String(expectedValue ?? ""));
      if (mismatched || targetFrame.blocked === true && (targetFrame.selected === true || targetFrame.ariaSelected === true) || targetFrame.blockedSelected !== (targetFrame.blocked === true && targetFrame.selected === true)) {
        return {
          targetFrame: null,
          diagnosticId: "andrews-selection-audit-contradictory-target-frame"
        };
      }
      return {
        targetFrame,
        diagnosticId: ""
      };
    }
    function applyAndrewsTenseTabSelectionAuthorityDataset(element = null, options = {}) {
      if (!element || !element.dataset) {
        return getAndrewsTenseTabSelectionAuthorityState(options);
      }
      const state = getAndrewsTenseTabSelectionAuthorityState(options);
      element.dataset.andrewsSelectionGate = state.selectionGate;
      element.dataset.andrewsSelectionBlocked = state.blockedReasons.join("|");
      element.dataset.andrewsOutputAvailability = state.outputAvailability;
      element.dataset.andrewsOutputAvailabilityRole = state.outputAvailabilityRole;
      element.dataset.andrewsSelectionAuthority = "ANDREWS_TRANSCRIPTION_CANVAS.md";
      element.dataset.andrewsSelectionLogicAuthority = "ANDREWS_TRANSCRIPTION_CANVAS.md";
      element.dataset.andrewsSelectionGrammarGate = state.generationGate?.generationGate || "";
      element.dataset.andrewsSelectionOutputRole = state.generationGate?.outputRole || "";
      element.dataset.andrewsSelectionOrthographyBoundary = "classical-visible-realization";
      element.dataset.andrewsSelectionClassicalOutputImport = state.generationGate?.classicalOutputImport || "blocked";
      element.dataset.andrewsSelectionSurfaceProbeRole = state.outputAvailabilityRole;
      element.dataset.andrewsSelectionBoundaryRealizationRole = state.outputAvailabilityRole;
      element.dataset.andrewsSelectionDisabled = String(state.disabled);
      if (typeof element.setAttribute === "function") {
        element.setAttribute("aria-disabled", String(state.disabled));
      }
      const elementContract = getAndrewsTenseAuthorityElementContract(element);
      if (elementContract.contract === "button.tense-tab" || typeof element.disabled === "boolean") {
        element.disabled = state.disabled;
      }
      const classList = element.classList;
      if (classList?.contains("tense-tab")) {
        if (state.blocked) {
          classList.toggle("is-active", false);
        }
        classList.toggle("tense-tab--andrews-selection-allowed", !state.blocked);
        classList.toggle("tense-tab--andrews-selection-blocked", state.blocked);
        classList.toggle("tense-tab--andrews-output-pending", !state.blocked && state.outputAvailability === "surface-unavailable");
      }
      if (state.blocked && typeof element.setAttribute === "function") {
        element.setAttribute("aria-selected", "false");
      }
      const selectedNow = Boolean(classList?.contains("is-active")) || typeof element.getAttribute === "function" && String(element.getAttribute("aria-selected") || "") === "true";
      const ariaSelectedNow = typeof element.getAttribute === "function" && String(element.getAttribute("aria-selected") || "") === "true";
      const selectionAuditModel = buildAndrewsTenseTabSelectionAuditModel(state, {
        selected: selectedNow,
        ariaSelected: ariaSelectedNow,
        nativeDisabled: element.disabled === true
      });
      Object.defineProperty(element, "andrewsTenseTabSelectionAuditModel", {
        configurable: true,
        enumerable: false,
        writable: true,
        value: selectionAuditModel
      });
      element.dataset.andrewsSelectionSelected = String(selectedNow);
      element.dataset.andrewsSelectionSelectedRole = state.blocked ? "blocked-gate-cannot-be-selected" : "ui-selection-state";
      applyAndrewsTenseTabClickAuthorityDataset(element);
      if (element.dataset.andrewsTenseAuthority) {
        const audit = getAndrewsTenseAuthorityDatasetAuditRecord(element);
        element.dataset.andrewsAuthorityAudit = audit.ok ? "ok" : "diagnostic";
        element.dataset.andrewsAuthorityMissing = audit.missing.join("|");
        element.dataset.andrewsAuthorityDiagnostics = audit.diagnostics.join("|");
        classList?.toggle("tense-tab--andrews-audit-warning", !audit.ok);
      }
      return state;
    }
    function applyAndrewsTenseAuthorityDataset(element = null, {
      tenseValue = "",
      mode = targetObject.TENSE_MODE.verbo,
      blockKind = ""
    } = {}) {
      if (!element || !element.dataset) {
        return null;
      }
      const frame = getAndrewsTenseAuthorityFrame(tenseValue, mode);
      const generationGate = getAndrewsTenseGenerationGateFrame(frame);
      const isCoreCnvMode = String(mode || "") === targetObject.TENSE_MODE.verbo && frame.scope !== "andrews-output-gate";
      const coreFrame = isCoreCnvMode && typeof targetObject.getAndrewsCnvTenseLogicAuthorityFrame === "function" ? targetObject.getAndrewsCnvTenseLogicAuthorityFrame(tenseValue) : null;
      const coreGenerationGate = coreFrame && typeof targetObject.getAndrewsCnvTenseLogicGenerationGateFrame === "function" ? targetObject.getAndrewsCnvTenseLogicGenerationGateFrame(coreFrame) : null;
      const executorGate = coreFrame ? getAndrewsTenseExecutorGateFrame(frame) : null;
      const sourceTargetRoute = getAndrewsTenseSourceTargetRouteAuthorityFrame(tenseValue, mode);
      const elementContract = getAndrewsTenseAuthorityElementContract(element);
      const sourceRefs = Array.isArray(frame.sourceRefs) ? frame.sourceRefs.filter(Boolean) : [];
      element.dataset.andrewsTenseValue = String(tenseValue || "");
      element.dataset.andrewsTenseAuthority = frame.scope || "";
      element.dataset.andrewsTenseSource = frame.source || "";
      element.dataset.andrewsTenseSourceRefs = sourceRefs.join("|");
      element.dataset.andrewsTenseSlot = frame.slot || "";
      element.dataset.andrewsTenseFamily = frame.family || "";
      element.dataset.andrewsTenseMode = String(mode || "");
      element.dataset.andrewsGrammarLogicAuthority = "ANDREWS_TRANSCRIPTION_CANVAS.md";
      element.dataset.andrewsClassicalSpellingRole = "structural-only";
      element.dataset.andrewsOrthographyBoundary = "classical-visible-realization";
      element.dataset.classicalOutputBoundary = "orthography-realization";
      element.dataset.andrewsOutputSpellingAuthority = "Andrews transcription";
      element.dataset.andrewsOrthographyRealizationPath = "andrews-logic-then-classical-contextual-realization";
      element.dataset.andrewsLogicRole = generationGate.logicRole || "";
      element.dataset.andrewsGenerationGate = generationGate.generationGate || "";
      element.dataset.andrewsOutputRole = generationGate.outputRole || "";
      element.dataset.classicalBoundaryRealizationRole = generationGate.boundaryRealizationRole || "";
      element.dataset.classicalOutputImport = generationGate.classicalOutputImport || "blocked";
      element.dataset.andrewsCoreGenerationAuthority = coreFrame?.scope || "";
      element.dataset.andrewsCoreGenerationGate = coreGenerationGate?.generationGate || "";
      element.dataset.andrewsCoreTenseSource = coreFrame?.source || "";
      element.dataset.andrewsCoreTenseSlot = coreFrame?.slot || "";
      element.dataset.andrewsCoreTenseFamily = coreFrame?.family || "";
      element.dataset.andrewsCoreLogicRole = coreGenerationGate?.logicRole || "";
      element.dataset.andrewsCoreOutputRole = coreGenerationGate?.outputRole || "";
      element.dataset.andrewsCoreBoundaryRealizationRole = coreGenerationGate?.boundaryRealizationRole || "";
      element.dataset.andrewsCoreClassicalOutputImport = coreGenerationGate?.classicalOutputImport || "";
      element.dataset.andrewsExecutorGenerationGate = executorGate?.generationGate || "";
      element.dataset.andrewsExecutorRouteStage = executorGate?.routeStage || "";
      element.dataset.andrewsExecutorGenerationAllowed = executorGate ? String(executorGate.generationAllowed === true) : "";
      element.dataset.andrewsExecutorFormulaShellPolicy = executorGate?.formulaShellPolicy || "";
      element.dataset.andrewsExecutorSurfacePolicy = executorGate?.surfacePolicy || "";
      element.dataset.andrewsExecutorFallbackPolicy = executorGate?.fallbackPolicy || "";
      element.dataset.andrewsRouteAuthority = sourceTargetRoute.authority || "";
      element.dataset.andrewsRouteLogicAuthority = sourceTargetRoute.logicAuthority || "";
      element.dataset.andrewsSourceTargetRoute = sourceTargetRoute.formulaTransition || "";
      element.dataset.andrewsSourceTargetRouteClass = sourceTargetRoute.routeClass || "";
      element.dataset.andrewsSourceFormulaType = sourceTargetRoute.sourceFormulaType || "";
      element.dataset.andrewsTargetFormulaType = sourceTargetRoute.targetFormulaType || "";
      element.dataset.andrewsRouteRegistryIds = sourceTargetRoute.routeIds.join("|");
      element.dataset.andrewsRouteRegistryMatchedIds = sourceTargetRoute.matchedRouteIds.join("|");
      element.dataset.andrewsRouteRegistryStatus = sourceTargetRoute.registryStatus || "";
      element.dataset.andrewsRouteFamilies = sourceTargetRoute.routeFamilies.join("|");
      element.dataset.andrewsRouteKinds = sourceTargetRoute.routeKinds.join("|");
      element.dataset.andrewsRouteBranch = sourceTargetRoute.routeBranch || "";
      element.dataset.andrewsRouteUiHost = sourceTargetRoute.uiHost || "";
      element.dataset.andrewsRouteSourceGateStatus = sourceTargetRoute.sourceGateStatus || "";
      element.dataset.andrewsRouteSourceEvidenceStatus = sourceTargetRoute.sourceEvidenceStatus || "";
      element.dataset.andrewsRouteGenerationGate = sourceTargetRoute.generationGate || "";
      element.dataset.andrewsRouteGenerationAllowed = String(sourceTargetRoute.generationAllowed === true);
      element.dataset.andrewsRouteClassicalSpellingRole = sourceTargetRoute.classicalSpellingRole || "";
      element.dataset.andrewsRouteOutputSpellingAuthority = sourceTargetRoute.outputSpellingAuthority || "";
      element.dataset.andrewsRouteOperationalLayer = sourceTargetRoute.operationalLayerKind || "";
      element.dataset.andrewsRouteSuboperationCount = String(sourceTargetRoute.routeSuboperationCount || 0);
      element.dataset.andrewsRouteSuboperationIds = sourceTargetRoute.routeSuboperationIds.join("|");
      element.dataset.andrewsRouteSuboperationFamilies = sourceTargetRoute.routeSuboperationFamilies.join("|");
      element.dataset.andrewsRouteSuboperationSections = sourceTargetRoute.routeSuboperationSections.join("|");
      element.dataset.andrewsRouteSuboperationSourceRequirementKeys = sourceTargetRoute.routeSuboperationSourceRequirementKeys.join("|");
      element.dataset.andrewsRouteSuboperationTransformKeys = sourceTargetRoute.routeSuboperationTransformKeys.join("|");
      element.dataset.andrewsRouteSuboperationBuildKeys = sourceTargetRoute.routeSuboperationBuildKeys.join("|");
      element.dataset.andrewsRouteSuboperationGeneratedCount = String(sourceTargetRoute.routeSuboperationGeneratedCount || 0);
      element.dataset.andrewsRouteSuboperationSourceGatedCount = String(sourceTargetRoute.routeSuboperationSourceGatedCount || 0);
      element.dataset.andrewsRouteSuboperationDiagnosticOnlyCount = String(sourceTargetRoute.routeSuboperationDiagnosticOnlyCount || 0);
      element.dataset.andrewsRouteSuboperationCoverageAudit = sourceTargetRoute.routeSuboperationCoverageAuditKind || "";
      element.dataset.andrewsRouteSuboperationCoverageComplete = String(sourceTargetRoute.routeSuboperationCoverageComplete === true);
      element.dataset.andrewsRouteSuboperationExpectedSectionCount = String(sourceTargetRoute.routeSuboperationExpectedSectionCount || 0);
      element.dataset.andrewsRouteSuboperationRepresentedSectionCount = String(sourceTargetRoute.routeSuboperationRepresentedSectionCount || 0);
      element.dataset.andrewsRouteSuboperationMissingSectionCount = String(sourceTargetRoute.routeSuboperationMissingSectionCount || 0);
      element.dataset.andrewsRouteSuboperationMissingSections = sourceTargetRoute.routeSuboperationMissingSections.join("|");
      element.dataset.andrewsAuthorityElementContract = elementContract.contract || "";
      element.dataset.andrewsAuthorityExpectedTag = elementContract.expectedTag || "";
      element.dataset.andrewsAuthorityRenderedTag = elementContract.renderedTag || "";
      if (blockKind) {
        element.dataset.andrewsBlockKind = blockKind;
      }
      const classList = element.classList;
      if (classList?.contains("tense-tab")) {
        classList.toggle("tense-tab--andrews-authority", frame.scope === "andrews-licensed");
        classList.toggle("tense-tab--andrews-nominal-route", frame.scope === "andrews-nominal-route");
        classList.toggle("tense-tab--andrews-particle-boundary", frame.scope === "andrews-particle-boundary");
        classList.toggle("tense-tab--andrews-output-gate", frame.scope === "andrews-output-gate");
        classList.toggle("tense-tab--andrews-generation-gate", generationGate.generationGate === "andrews-licensed-generation");
        classList.toggle("tense-tab--andrews-unclassified", frame.scope === "unknown");
        classList.toggle("tense-tab--source-target-cnv-cnn", sourceTargetRoute.formulaTransition === "CNV->CNN");
        classList.toggle("tense-tab--source-target-cnn-cnn", sourceTargetRoute.formulaTransition === "CNN->CNN");
        classList.toggle("tense-tab--source-target-cnn-cnv", sourceTargetRoute.formulaTransition === "CNN->CNV");
        classList.toggle("tense-tab--source-target-cnv-cnv", sourceTargetRoute.formulaTransition === "CNV->CNV");
        classList.toggle("tense-tab--source-target-mixed", sourceTargetRoute.routeClass === "mixed-compound-source-target-route");
        classList.toggle("tense-tab--andrews-operational-layer", Number(sourceTargetRoute.routeSuboperationCount || 0) > 0);
      }
      if (classList?.contains("tense-block")) {
        classList.toggle("tense-block--andrews-authority", frame.scope === "andrews-licensed");
        classList.toggle("tense-block--andrews-nominal-route", frame.scope === "andrews-nominal-route");
        classList.toggle("tense-block--andrews-particle-boundary", frame.scope === "andrews-particle-boundary");
        classList.toggle("tense-block--andrews-output-gate", frame.scope === "andrews-output-gate");
        classList.toggle("tense-block--andrews-generation-gate", generationGate.generationGate === "andrews-licensed-generation");
        classList.toggle("tense-block--andrews-unclassified", frame.scope === "unknown");
        classList.toggle("tense-block--source-target-cnv-cnn", sourceTargetRoute.formulaTransition === "CNV->CNN");
        classList.toggle("tense-block--source-target-cnn-cnn", sourceTargetRoute.formulaTransition === "CNN->CNN");
        classList.toggle("tense-block--source-target-cnn-cnv", sourceTargetRoute.formulaTransition === "CNN->CNV");
        classList.toggle("tense-block--source-target-cnv-cnv", sourceTargetRoute.formulaTransition === "CNV->CNV");
        classList.toggle("tense-block--source-target-mixed", sourceTargetRoute.routeClass === "mixed-compound-source-target-route");
        classList.toggle("tense-block--andrews-operational-layer", Number(sourceTargetRoute.routeSuboperationCount || 0) > 0);
      }
      syncAndrewsTenseOperationalLayerElement(element, sourceTargetRoute);
      const audit = getAndrewsTenseAuthorityDatasetAuditRecord(element);
      element.dataset.andrewsAuthorityAudit = audit.ok ? "ok" : "diagnostic";
      element.dataset.andrewsAuthorityMissing = audit.missing.join("|");
      element.dataset.andrewsAuthorityDiagnostics = audit.diagnostics.join("|");
      if (classList?.contains("tense-tab")) {
        classList.toggle("tense-tab--andrews-audit-warning", !audit.ok);
      }
      if (classList?.contains("tense-block")) {
        classList.toggle("tense-block--andrews-audit-warning", !audit.ok);
      }
      const status = [frame.label, frame.title].filter(Boolean).join(": ");
      if (status) {
        const existingTitle = String(element.title || "").trim();
        const operationalStatus = getAndrewsCnvCnnOperationalLayerDisplayText(sourceTargetRoute);
        const statusWithOperations = operationalStatus ? `${status} ${operationalStatus}` : status;
        element.title = existingTitle && !existingTitle.includes(status) ? `${existingTitle} ${statusWithOperations}` : existingTitle || statusWithOperations;
      }
      return frame;
    }
    function getAndrewsTenseAuthorityExpectedDataset(element = null, {
      mode = "",
      blockKind = ""
    } = {}) {
      if (!element || !element.dataset) {
        return null;
      }
      const descriptor = getAndrewsTenseAuthorityDomDescriptor(element, {
        mode,
        blockKind
      });
      const normalizedMode = String(descriptor.mode || "").trim() || targetObject.TENSE_MODE.verbo;
      const normalizedTense = String(descriptor.tenseValue || "").trim();
      const canCompare = Boolean(normalizedTense) || targetObject.isNominalTenseMode(normalizedMode) || normalizedMode === targetObject.TENSE_MODE.particula;
      if (!canCompare) {
        return null;
      }
      const frame = getAndrewsTenseAuthorityFrame(normalizedTense, normalizedMode);
      const generationGate = getAndrewsTenseGenerationGateFrame(frame);
      const isCoreCnvMode = normalizedMode === targetObject.TENSE_MODE.verbo && frame.scope !== "andrews-output-gate";
      const coreFrame = isCoreCnvMode && typeof targetObject.getAndrewsCnvTenseLogicAuthorityFrame === "function" ? targetObject.getAndrewsCnvTenseLogicAuthorityFrame(normalizedTense) : null;
      const coreGenerationGate = coreFrame && typeof targetObject.getAndrewsCnvTenseLogicGenerationGateFrame === "function" ? targetObject.getAndrewsCnvTenseLogicGenerationGateFrame(coreFrame) : null;
      const executorGate = coreFrame ? getAndrewsTenseExecutorGateFrame(frame) : null;
      const sourceTargetRoute = getAndrewsTenseSourceTargetRouteAuthorityFrame(normalizedTense, normalizedMode);
      const elementContract = getAndrewsTenseAuthorityElementContract(element);
      const sourceRefs = Array.isArray(frame.sourceRefs) ? frame.sourceRefs.filter(Boolean) : [];
      return {
        descriptor,
        frame,
        dataset: {
          andrewsTenseValue: normalizedTense,
          andrewsTenseAuthority: frame.scope || "",
          andrewsTenseSource: frame.source || "",
          andrewsTenseSourceRefs: sourceRefs.join("|"),
          andrewsTenseSlot: frame.slot || "",
          andrewsTenseFamily: frame.family || "",
          andrewsTenseMode: normalizedMode,
          andrewsGrammarLogicAuthority: "ANDREWS_TRANSCRIPTION_CANVAS.md",
          andrewsClassicalSpellingRole: "structural-only",
          andrewsOrthographyBoundary: "classical-visible-realization",
          classicalOutputBoundary: "orthography-realization",
          andrewsOutputSpellingAuthority: "Andrews transcription",
          andrewsOrthographyRealizationPath: "andrews-logic-then-classical-contextual-realization",
          andrewsLogicRole: generationGate.logicRole || "",
          andrewsGenerationGate: generationGate.generationGate || "",
          andrewsOutputRole: generationGate.outputRole || "",
          classicalBoundaryRealizationRole: generationGate.boundaryRealizationRole || "",
          classicalOutputImport: generationGate.classicalOutputImport || "blocked",
          andrewsCoreGenerationAuthority: coreFrame?.scope || "",
          andrewsCoreGenerationGate: coreGenerationGate?.generationGate || "",
          andrewsCoreTenseSource: coreFrame?.source || "",
          andrewsCoreTenseSlot: coreFrame?.slot || "",
          andrewsCoreTenseFamily: coreFrame?.family || "",
          andrewsCoreLogicRole: coreGenerationGate?.logicRole || "",
          andrewsCoreOutputRole: coreGenerationGate?.outputRole || "",
          andrewsCoreBoundaryRealizationRole: coreGenerationGate?.boundaryRealizationRole || "",
          andrewsCoreClassicalOutputImport: coreGenerationGate?.classicalOutputImport || "",
          andrewsExecutorGenerationGate: executorGate?.generationGate || "",
          andrewsExecutorRouteStage: executorGate?.routeStage || "",
          andrewsExecutorGenerationAllowed: executorGate ? String(executorGate.generationAllowed === true) : "",
          andrewsExecutorFormulaShellPolicy: executorGate?.formulaShellPolicy || "",
          andrewsExecutorSurfacePolicy: executorGate?.surfacePolicy || "",
          andrewsExecutorFallbackPolicy: executorGate?.fallbackPolicy || "",
          andrewsRouteAuthority: sourceTargetRoute.authority || "",
          andrewsRouteLogicAuthority: sourceTargetRoute.logicAuthority || "",
          andrewsSourceTargetRoute: sourceTargetRoute.formulaTransition || "",
          andrewsSourceTargetRouteClass: sourceTargetRoute.routeClass || "",
          andrewsSourceFormulaType: sourceTargetRoute.sourceFormulaType || "",
          andrewsTargetFormulaType: sourceTargetRoute.targetFormulaType || "",
          andrewsRouteRegistryIds: sourceTargetRoute.routeIds.join("|"),
          andrewsRouteRegistryMatchedIds: sourceTargetRoute.matchedRouteIds.join("|"),
          andrewsRouteRegistryStatus: sourceTargetRoute.registryStatus || "",
          andrewsRouteFamilies: sourceTargetRoute.routeFamilies.join("|"),
          andrewsRouteKinds: sourceTargetRoute.routeKinds.join("|"),
          andrewsRouteBranch: sourceTargetRoute.routeBranch || "",
          andrewsRouteUiHost: sourceTargetRoute.uiHost || "",
          andrewsRouteSourceGateStatus: sourceTargetRoute.sourceGateStatus || "",
          andrewsRouteSourceEvidenceStatus: sourceTargetRoute.sourceEvidenceStatus || "",
          andrewsRouteGenerationGate: sourceTargetRoute.generationGate || "",
          andrewsRouteGenerationAllowed: String(sourceTargetRoute.generationAllowed === true),
          andrewsRouteClassicalSpellingRole: sourceTargetRoute.classicalSpellingRole || "",
          andrewsRouteOutputSpellingAuthority: sourceTargetRoute.outputSpellingAuthority || "",
          andrewsRouteOperationalLayer: sourceTargetRoute.operationalLayerKind || "",
          andrewsRouteSuboperationCount: String(sourceTargetRoute.routeSuboperationCount || 0),
          andrewsRouteSuboperationIds: sourceTargetRoute.routeSuboperationIds.join("|"),
          andrewsRouteSuboperationFamilies: sourceTargetRoute.routeSuboperationFamilies.join("|"),
          andrewsRouteSuboperationSections: sourceTargetRoute.routeSuboperationSections.join("|"),
          andrewsRouteSuboperationSourceRequirementKeys: sourceTargetRoute.routeSuboperationSourceRequirementKeys.join("|"),
          andrewsRouteSuboperationTransformKeys: sourceTargetRoute.routeSuboperationTransformKeys.join("|"),
          andrewsRouteSuboperationBuildKeys: sourceTargetRoute.routeSuboperationBuildKeys.join("|"),
          andrewsRouteSuboperationGeneratedCount: String(sourceTargetRoute.routeSuboperationGeneratedCount || 0),
          andrewsRouteSuboperationSourceGatedCount: String(sourceTargetRoute.routeSuboperationSourceGatedCount || 0),
          andrewsRouteSuboperationDiagnosticOnlyCount: String(sourceTargetRoute.routeSuboperationDiagnosticOnlyCount || 0),
          andrewsRouteSuboperationCoverageAudit: sourceTargetRoute.routeSuboperationCoverageAuditKind || "",
          andrewsRouteSuboperationCoverageComplete: String(sourceTargetRoute.routeSuboperationCoverageComplete === true),
          andrewsRouteSuboperationExpectedSectionCount: String(sourceTargetRoute.routeSuboperationExpectedSectionCount || 0),
          andrewsRouteSuboperationRepresentedSectionCount: String(sourceTargetRoute.routeSuboperationRepresentedSectionCount || 0),
          andrewsRouteSuboperationMissingSectionCount: String(sourceTargetRoute.routeSuboperationMissingSectionCount || 0),
          andrewsRouteSuboperationMissingSections: sourceTargetRoute.routeSuboperationMissingSections.join("|"),
          andrewsAuthorityElementContract: elementContract.contract || "",
          andrewsAuthorityExpectedTag: elementContract.expectedTag || "",
          andrewsAuthorityRenderedTag: elementContract.renderedTag || ""
        }
      };
    }
    function getAndrewsTenseAuthorityCanonicalMismatches(element = null, options = {}) {
      const expected = getAndrewsTenseAuthorityExpectedDataset(element, options);
      if (!expected) {
        return [];
      }
      const dataset = element?.dataset || {};
      return Object.entries(expected.dataset).filter(([key, expectedValue]) => String(dataset[key] || "") !== String(expectedValue || "")).map(([key]) => `${key.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`)}-mismatch`);
    }
    function getAndrewsTenseAuthorityExpectedClasses(element = null, options = {}) {
      const expected = getAndrewsTenseAuthorityExpectedDataset(element, options);
      const classList = element?.classList || null;
      if (!expected || !classList) {
        return null;
      }
      const isTab = classList.contains("tense-tab");
      const isBlock = classList.contains("tense-block");
      if (!isTab && !isBlock) {
        return null;
      }
      const prefix = isTab ? "tense-tab" : "tense-block";
      const scope = expected.frame.scope || "";
      const generationGate = getAndrewsTenseGenerationGateFrame(expected.frame);
      const routeClass = expected.dataset.andrewsSourceTargetRouteClass || "";
      const sourceTargetRoute = expected.dataset.andrewsSourceTargetRoute || "";
      const expectedState = new Map([[`${prefix}--andrews-authority`, scope === "andrews-licensed"], [`${prefix}--andrews-nominal-route`, scope === "andrews-nominal-route"], [`${prefix}--andrews-particle-boundary`, scope === "andrews-particle-boundary"], [`${prefix}--andrews-output-gate`, scope === "andrews-output-gate"], [`${prefix}--andrews-generation-gate`, generationGate.generationGate === "andrews-licensed-generation"], [`${prefix}--andrews-unclassified`, scope === "unknown"], [`${prefix}--source-target-cnv-cnn`, sourceTargetRoute === "CNV->CNN"], [`${prefix}--source-target-cnn-cnn`, sourceTargetRoute === "CNN->CNN"], [`${prefix}--source-target-cnn-cnv`, sourceTargetRoute === "CNN->CNV"], [`${prefix}--source-target-cnv-cnv`, sourceTargetRoute === "CNV->CNV"], [`${prefix}--source-target-mixed`, routeClass === "mixed-compound-source-target-route"]]);
      return {
        prefix,
        expectedState
      };
    }
    function getAndrewsTenseAuthorityClassMismatches(element = null, options = {}) {
      const expected = getAndrewsTenseAuthorityExpectedClasses(element, options);
      const classList = element?.classList || null;
      if (!expected || !classList) {
        return [];
      }
      return Array.from(expected.expectedState.entries()).filter(([className, shouldHaveClass]) => classList.contains(className) !== shouldHaveClass).map(([className, shouldHaveClass]) => shouldHaveClass ? `${className}-class-missing` : `${className}-class-stale`);
    }
    function getEmptyAndrewsTenseBlockOutputRowAuditRecord(diagnosticId = "") {
      return {
        grammarRouteFamily: "",
        grammarRouteStage: "",
        grammarDiagnosticId: diagnosticId || "andrews-output-row-audit-model-missing",
        grammarLogicAuthority: "",
        grammarSpellingEvidenceRole: "",
        grammarClassicalSpellingRole: "",
        grammarOrthographyBoundary: "",
        grammarSpellingAuthority: "",
        grammarClassicalSurfaceImport: "",
        grammarResultOk: "",
        grammarSourceContextTargetAuthority: "",
        grammarSourceEvidenceTargetAuthority: "",
        grammarGenerationAllowed: ""
      };
    }
    function getAndrewsTenseBlockOutputRowAuditRecord(row = null) {
      const model = row?.andrewsTenseBlockOutputRowAuditModel && typeof row.andrewsTenseBlockOutputRowAuditModel === "object" ? row.andrewsTenseBlockOutputRowAuditModel : null;
      const operationFrame = model?.operationFrame && typeof model.operationFrame === "object" ? model.operationFrame : null;
      if (!model || model.kind !== "andrews-tense-block-output-row-audit-model" || !operationFrame || operationFrame.kind !== "andrews-tense-block-output-row-audit-operation-frame" || operationFrame.status !== "authorized" || operationFrame.operation !== "audit-output-row-from-grammar-frame") {
        return getEmptyAndrewsTenseBlockOutputRowAuditRecord("andrews-output-row-audit-operation-frame-missing");
      }
      const sourceFrame = operationFrame.sourceFrame && typeof operationFrame.sourceFrame === "object" ? operationFrame.sourceFrame : null;
      const targetFrame = operationFrame.targetFrame && typeof operationFrame.targetFrame === "object" ? operationFrame.targetFrame : null;
      if (!sourceFrame || sourceFrame.kind !== "andrews-tense-block-output-row-audit-source-frame" || !targetFrame || targetFrame.kind !== "andrews-tense-block-output-row-audit-target-frame") {
        return getEmptyAndrewsTenseBlockOutputRowAuditRecord("andrews-output-row-audit-source-or-target-frame-missing");
      }
      const expected = {
        grammarRouteFamily: String(sourceFrame.routeContract?.routeFamily || "").trim(),
        grammarRouteStage: String(sourceFrame.routeContract?.routeStage || "").trim(),
        grammarGenerationAllowed: String(sourceFrame.routeContract?.generationAllowed === true),
        grammarDiagnosticId: String(sourceFrame.diagnosticFrame?.diagnosticId || "").trim(),
        grammarLogicAuthority: String(sourceFrame.authorityFrame?.grammarAuthority || "").trim(),
        grammarSpellingEvidenceRole: String(sourceFrame.orthographyFrame?.spellingEvidenceRole || "").trim(),
        grammarClassicalSpellingRole: String(sourceFrame.orthographyFrame?.classicalSpellingRole || "").trim(),
        grammarOrthographyBoundary: String(sourceFrame.orthographyFrame?.orthographyBoundary || "").trim(),
        grammarSpellingAuthority: String(sourceFrame.orthographyFrame?.spellingAuthority || "").trim(),
        grammarClassicalSurfaceImport: String(sourceFrame.orthographyFrame?.classicalSurfaceImport || "").trim(),
        grammarResultOk: String(sourceFrame.resultFrame?.ok === true),
        grammarSourceContextTargetAuthority: String(sourceFrame.authorityFrame?.sourceContextTargetAuthority || "").trim(),
        grammarSourceEvidenceTargetAuthority: String(sourceFrame.authorityFrame?.sourceEvidenceTargetAuthority || "").trim()
      };
      const mismatched = Object.entries(expected).some(([key, expectedValue]) => String(targetFrame[key] || "").trim() !== expectedValue);
      if (mismatched) {
        return getEmptyAndrewsTenseBlockOutputRowAuditRecord("andrews-output-row-audit-contradictory-target-frame");
      }
      return expected;
    }
    function getAndrewsTenseBlockOutputAuditRecord(element = null) {
      const classList = element?.classList || null;
      const isBlock = !!classList?.contains("tense-block");
      const dataset = element?.dataset || {};
      const generationGate = String(dataset.andrewsGenerationGate || "").trim();
      const executorGenerationGate = String(dataset.andrewsExecutorGenerationGate || "").trim();
      const effectiveGenerationGate = executorGenerationGate || generationGate;
      const executorRouteStage = String(dataset.andrewsExecutorRouteStage || "").trim();
      const outputRole = String(dataset.andrewsOutputRole || "").trim();
      const rowNodes = isBlock && typeof element?.querySelectorAll === "function" ? Array.from(element.querySelectorAll(".conjugation-row")) : [];
      const rowCount = rowNodes.length;
      const placeholderCount = isBlock && typeof element?.querySelectorAll === "function" ? Array.from(element.querySelectorAll(".tense-placeholder")).length : 0;
      const rowGrammarRecords = rowNodes.map(row => getAndrewsTenseBlockOutputRowAuditRecord(row));
      const getDistinctRowValues = key => Array.from(new Set(rowGrammarRecords.map(record => String(record[key] || "").trim()).filter(Boolean))).sort();
      const grammarRouteFamilies = getDistinctRowValues("grammarRouteFamily");
      const grammarRouteStages = getDistinctRowValues("grammarRouteStage");
      const grammarDiagnosticIds = getDistinctRowValues("grammarDiagnosticId");
      const grammarLogicAuthorities = getDistinctRowValues("grammarLogicAuthority");
      const grammarSpellingEvidenceRoles = getDistinctRowValues("grammarSpellingEvidenceRole");
      const grammarClassicalSpellingRoles = getDistinctRowValues("grammarClassicalSpellingRole");
      const grammarOrthographyBoundaries = getDistinctRowValues("grammarOrthographyBoundary");
      const grammarSpellingAuthorities = getDistinctRowValues("grammarSpellingAuthority");
      const grammarClassicalSurfaceImports = getDistinctRowValues("grammarClassicalSurfaceImport");
      const grammarResultStates = getDistinctRowValues("grammarResultOk");
      const grammarSourceContextTargetAuthorities = getDistinctRowValues("grammarSourceContextTargetAuthority");
      const grammarSourceEvidenceTargetAuthorities = getDistinctRowValues("grammarSourceEvidenceTargetAuthority");
      const isAndrewsTargetAuthority = (value = "") => String(value || "").includes("Andrews");
      const grammarRouteContractMissingCount = rowGrammarRecords.filter(record => !String(record.grammarRouteFamily || "").trim() || !String(record.grammarRouteStage || "").trim() || !String(record.grammarGenerationAllowed || "").trim()).length;
      const hardBlockedGates = new Set(["not-andrews-grammar-gate", "unclassified-andrews-frame-required", "route-selection-required"]);
      const hardBlockedRouteStages = new Set(["andrews-cnv-tense-logic-gate"]);
      const grammarGenerationAllowedCount = rowGrammarRecords.filter(record => String(record.grammarGenerationAllowed || "") === "true").length;
      const grammarGenerationBlockedRowCount = rowGrammarRecords.filter(record => String(record.grammarGenerationAllowed || "") === "false").length;
      const blockedGrammarRows = rowGrammarRecords.filter(record => String(record.grammarGenerationAllowed || "") === "false");
      const generatedGrammarRows = rowGrammarRecords.filter(record => String(record.grammarGenerationAllowed || "") === "true");
      const grammarBlockedResultOkCount = blockedGrammarRows.filter(record => String(record.grammarResultOk || "").trim() === "true").length;
      const grammarGeneratedBlockedRouteContractCount = generatedGrammarRows.filter(record => hardBlockedRouteStages.has(String(record.grammarRouteStage || "").trim()) || hardBlockedGates.has(String(record.grammarDiagnosticId || "").trim())).length;
      const grammarGeneratedResultNotOkCount = generatedGrammarRows.filter(record => String(record.grammarResultOk || "").trim() !== "true").length;
      const grammarLogicAuthorityMissingCount = generatedGrammarRows.filter(record => String(record.grammarLogicAuthority || "").trim() !== "Andrews").length;
      const grammarSpellingEvidenceRoleMismatchCount = generatedGrammarRows.filter(record => String(record.grammarSpellingEvidenceRole || "").trim() !== "classical-boundary-realization-only").length;
      const grammarSourceContextAuthorityMismatchCount = generatedGrammarRows.filter(record => {
        const value = String(record.grammarSourceContextTargetAuthority || "").trim();
        return value && !isAndrewsTargetAuthority(value);
      }).length;
      const grammarSourceEvidenceAuthorityMismatchCount = generatedGrammarRows.filter(record => {
        const value = String(record.grammarSourceEvidenceTargetAuthority || "").trim();
        return value && !isAndrewsTargetAuthority(value);
      }).length;
      const grammarClassicalSpellingRoleMismatchCount = generatedGrammarRows.filter(record => String(record.grammarClassicalSpellingRole || "").trim() !== "structural-only").length;
      const grammarOrthographyBoundaryMissingCount = generatedGrammarRows.filter(record => String(record.grammarOrthographyBoundary || "").trim() !== "classical-visible-realization").length;
      const grammarSpellingAuthorityMismatchCount = generatedGrammarRows.filter(record => String(record.grammarSpellingAuthority || "").trim() !== "Andrews transcription").length;
      const grammarClassicalSurfaceImportNotBlockedCount = generatedGrammarRows.filter(record => String(record.grammarClassicalSurfaceImport || "").trim() !== "blocked").length;
      const hardBlocked = isBlock && hardBlockedGates.has(effectiveGenerationGate);
      const diagnostics = [];
      if (hardBlocked && rowCount > 0) {
        diagnostics.push("blocked-andrews-generation-block-has-output-rows");
      }
      if (hardBlocked && grammarGenerationAllowedCount > 0) {
        diagnostics.push("blocked-andrews-generation-block-has-allowed-route-rows");
      }
      if (grammarRouteContractMissingCount > 0) {
        diagnostics.push("output-row-missing-andrews-route-contract");
      }
      if (grammarBlockedResultOkCount > 0) {
        diagnostics.push("blocked-andrews-route-row-result-ok");
      }
      if (grammarGeneratedBlockedRouteContractCount > 0) {
        diagnostics.push("generated-row-uses-blocked-andrews-route-contract");
      }
      if (grammarGeneratedResultNotOkCount > 0) {
        diagnostics.push("generated-row-result-not-ok");
      }
      if (grammarLogicAuthorityMissingCount > 0) {
        diagnostics.push("generated-row-missing-andrews-logic-authority");
      }
      if (grammarSpellingEvidenceRoleMismatchCount > 0) {
        diagnostics.push("generated-row-spelling-evidence-role-mismatch");
      }
      if (grammarSourceContextAuthorityMismatchCount > 0) {
        diagnostics.push("generated-row-source-context-authority-not-andrews");
      }
      if (grammarSourceEvidenceAuthorityMismatchCount > 0) {
        diagnostics.push("generated-row-source-evidence-authority-not-andrews");
      }
      if (grammarClassicalSpellingRoleMismatchCount > 0) {
        diagnostics.push("generated-row-classical-spelling-role-not-structural-only");
      }
      if (grammarOrthographyBoundaryMissingCount > 0) {
        diagnostics.push("generated-row-missing-classical-orthography-boundary");
      }
      if (grammarSpellingAuthorityMismatchCount > 0) {
        diagnostics.push("generated-row-spelling-authority-not-andrews-transcription");
      }
      if (grammarClassicalSurfaceImportNotBlockedCount > 0) {
        diagnostics.push("generated-row-classical-output-import-not-blocked");
      }
      const outputScope = !isBlock ? "" : hardBlocked ? "blocked-output" : effectiveGenerationGate === "andrews-licensed-generation" ? "andrews-generated-output" : effectiveGenerationGate === "andrews-nominal-route-no-vnc-tns" ? "andrews-nominal-output" : effectiveGenerationGate === "andrews-particle-boundary-no-vnc-tns" ? "andrews-particle-output" : outputRole || "andrews-output-frame";
      return {
        isBlock,
        generationGate,
        executorGenerationGate,
        effectiveGenerationGate,
        executorRouteStage,
        outputRole,
        outputScope,
        rowCount,
        placeholderCount,
        grammarRouteFamilies,
        grammarRouteStages,
        grammarDiagnosticIds,
        grammarLogicAuthorities,
        grammarSpellingEvidenceRoles,
        grammarClassicalSpellingRoles,
        grammarOrthographyBoundaries,
        grammarSpellingAuthorities,
        grammarClassicalSurfaceImports,
        grammarResultStates,
        grammarSourceContextTargetAuthorities,
        grammarSourceEvidenceTargetAuthorities,
        grammarRouteContractMissingCount,
        grammarGenerationAllowedCount,
        grammarGenerationBlockedRowCount,
        grammarBlockedResultOkCount,
        grammarGeneratedBlockedRouteContractCount,
        grammarGeneratedResultNotOkCount,
        grammarLogicAuthorityMissingCount,
        grammarSpellingEvidenceRoleMismatchCount,
        grammarSourceContextAuthorityMismatchCount,
        grammarSourceEvidenceAuthorityMismatchCount,
        grammarClassicalSpellingRoleMismatchCount,
        grammarOrthographyBoundaryMissingCount,
        grammarSpellingAuthorityMismatchCount,
        grammarClassicalSurfaceImportNotBlockedCount,
        hardBlocked,
        diagnostics,
        ok: diagnostics.length === 0
      };
    }
    function applyAndrewsTenseBlockOutputAuditDataset(element = null) {
      const record = getAndrewsTenseBlockOutputAuditRecord(element);
      if (!record.isBlock || !element?.dataset) {
        return record;
      }
      element.dataset.andrewsBlockOutputScope = record.outputScope;
      element.dataset.andrewsBlockOutputRowCount = String(record.rowCount);
      element.dataset.andrewsBlockOutputPlaceholderCount = String(record.placeholderCount);
      element.dataset.andrewsBlockRouteFamilies = record.grammarRouteFamilies.join("|");
      element.dataset.andrewsBlockRouteStages = record.grammarRouteStages.join("|");
      element.dataset.andrewsBlockRouteDiagnosticIds = record.grammarDiagnosticIds.join("|");
      element.dataset.andrewsBlockRowLogicAuthorities = record.grammarLogicAuthorities.join("|");
      element.dataset.andrewsBlockRowSpellingEvidenceRoles = record.grammarSpellingEvidenceRoles.join("|");
      element.dataset.andrewsBlockRowClassicalSpellingRoles = record.grammarClassicalSpellingRoles.join("|");
      element.dataset.andrewsBlockRowOrthographyBoundaries = record.grammarOrthographyBoundaries.join("|");
      element.dataset.andrewsBlockRowSpellingAuthorities = record.grammarSpellingAuthorities.join("|");
      element.dataset.andrewsBlockRowClassicalImports = record.grammarClassicalSurfaceImports.join("|");
      element.dataset.andrewsBlockRowResultStates = record.grammarResultStates.join("|");
      element.dataset.andrewsBlockRowSourceContextAuthorities = record.grammarSourceContextTargetAuthorities.join("|");
      element.dataset.andrewsBlockRowSourceEvidenceAuthorities = record.grammarSourceEvidenceTargetAuthorities.join("|");
      element.dataset.andrewsBlockRowRouteContractMissingCount = String(record.grammarRouteContractMissingCount);
      element.dataset.andrewsBlockRouteGenerationAllowedCount = String(record.grammarGenerationAllowedCount);
      element.dataset.andrewsBlockRouteGenerationBlockedRowCount = String(record.grammarGenerationBlockedRowCount);
      element.dataset.andrewsBlockRouteBlockedResultOkCount = String(record.grammarBlockedResultOkCount);
      element.dataset.andrewsBlockRouteGeneratedBlockedContractCount = String(record.grammarGeneratedBlockedRouteContractCount);
      element.dataset.andrewsBlockRouteGeneratedResultNotOkCount = String(record.grammarGeneratedResultNotOkCount);
      element.dataset.andrewsBlockRowLogicAuthorityMissingCount = String(record.grammarLogicAuthorityMissingCount);
      element.dataset.andrewsBlockRowSpellingEvidenceRoleMismatchCount = String(record.grammarSpellingEvidenceRoleMismatchCount);
      element.dataset.andrewsBlockRowSourceContextAuthorityMismatchCount = String(record.grammarSourceContextAuthorityMismatchCount);
      element.dataset.andrewsBlockRowSourceEvidenceAuthorityMismatchCount = String(record.grammarSourceEvidenceAuthorityMismatchCount);
      element.dataset.andrewsBlockRowClassicalSpellingRoleMismatchCount = String(record.grammarClassicalSpellingRoleMismatchCount);
      element.dataset.andrewsBlockRowOrthographyBoundaryMissingCount = String(record.grammarOrthographyBoundaryMissingCount);
      element.dataset.andrewsBlockRowSpellingAuthorityMismatchCount = String(record.grammarSpellingAuthorityMismatchCount);
      element.dataset.andrewsBlockRowClassicalImportNotBlockedCount = String(record.grammarClassicalSurfaceImportNotBlockedCount);
      element.dataset.andrewsBlockOutputAudit = record.ok ? "ok" : "diagnostic";
      element.dataset.andrewsBlockOutputDiagnostics = record.diagnostics.join("|");
      const classList = element.classList;
      classList?.toggle("tense-block--andrews-output-blocked", record.outputScope === "blocked-output");
      classList?.toggle("tense-block--andrews-output-generated", record.outputScope === "andrews-generated-output");
      classList?.toggle("tense-block--andrews-output-nominal", record.outputScope === "andrews-nominal-output");
      classList?.toggle("tense-block--andrews-output-particle", record.outputScope === "andrews-particle-output");
      classList?.toggle("tense-block--andrews-output-leak-diagnostic", record.diagnostics.includes("blocked-andrews-generation-block-has-output-rows") || record.diagnostics.includes("output-row-missing-andrews-route-contract") || record.diagnostics.includes("blocked-andrews-route-row-result-ok") || record.diagnostics.includes("generated-row-uses-blocked-andrews-route-contract") || record.diagnostics.includes("generated-row-result-not-ok"));
      classList?.toggle("tense-block--andrews-authority-leak-diagnostic", record.diagnostics.includes("generated-row-missing-andrews-logic-authority") || record.diagnostics.includes("generated-row-spelling-evidence-role-mismatch") || record.diagnostics.includes("generated-row-source-context-authority-not-andrews") || record.diagnostics.includes("generated-row-source-evidence-authority-not-andrews"));
      classList?.toggle("tense-block--andrews-orthography-leak-diagnostic", record.diagnostics.includes("generated-row-classical-spelling-role-not-structural-only") || record.diagnostics.includes("generated-row-missing-classical-orthography-boundary") || record.diagnostics.includes("generated-row-spelling-authority-not-andrews-transcription") || record.diagnostics.includes("generated-row-classical-output-import-not-blocked"));
      classList?.toggle("tense-block--andrews-audit-warning", !record.ok);
      return record;
    }
    function getAndrewsTenseAuthorityDatasetAuditRecord(element = null) {
      const dataset = element?.dataset || {};
      const elementContract = getAndrewsTenseAuthorityElementContract(element);
      const authority = String(dataset.andrewsTenseAuthority || "");
      const slot = String(dataset.andrewsTenseSlot || "");
      const family = String(dataset.andrewsTenseFamily || "");
      const requiredKeys = ["andrewsTenseAuthority", "andrewsTenseSource", "andrewsTenseSlot", "andrewsTenseFamily", "andrewsTenseMode", "andrewsGrammarLogicAuthority", "andrewsClassicalSpellingRole", "andrewsOrthographyBoundary", "classicalOutputBoundary", "andrewsOutputSpellingAuthority", "andrewsOrthographyRealizationPath", "andrewsLogicRole", "andrewsGenerationGate", "andrewsOutputRole", "classicalBoundaryRealizationRole", "classicalOutputImport", "andrewsRouteAuthority", "andrewsRouteLogicAuthority", "andrewsSourceTargetRoute", "andrewsSourceTargetRouteClass", "andrewsSourceFormulaType", "andrewsTargetFormulaType", "andrewsRouteRegistryStatus", "andrewsRouteUiHost", "andrewsRouteGenerationGate", "andrewsRouteGenerationAllowed", "andrewsRouteClassicalSpellingRole", "andrewsRouteOutputSpellingAuthority"];
      const missing = requiredKeys.filter(key => !String(dataset[key] || ""));
      const diagnostics = [];
      if (dataset.andrewsGrammarLogicAuthority !== "ANDREWS_TRANSCRIPTION_CANVAS.md") {
        diagnostics.push("andrews-grammar-authority-missing");
      }
      if (dataset.andrewsClassicalSpellingRole !== "structural-only") {
        diagnostics.push("classical-spelling-role-not-structural-only");
      }
      if (dataset.andrewsOrthographyBoundary !== "classical-visible-realization") {
        diagnostics.push("andrews-orthography-boundary-missing");
      }
      if (dataset.classicalOutputBoundary !== "orthography-realization") {
        diagnostics.push("classical-output-boundary-missing");
      }
      if (dataset.andrewsOutputSpellingAuthority !== "Andrews transcription") {
        diagnostics.push("andrews-output-spelling-authority-missing");
      }
      if (dataset.andrewsOrthographyRealizationPath !== "andrews-logic-then-classical-contextual-realization") {
        diagnostics.push("andrews-orthography-realization-path-missing");
      }
      if (dataset.classicalOutputImport !== "blocked") {
        diagnostics.push("classical-output-import-not-blocked");
      }
      if (dataset.andrewsRouteLogicAuthority !== "ANDREWS_TRANSCRIPTION_CANVAS.md") {
        diagnostics.push("andrews-source-target-route-authority-missing");
      }
      if (dataset.andrewsRouteClassicalSpellingRole !== "structural-only") {
        diagnostics.push("andrews-source-target-route-classical-spelling-not-structural");
      }
      if (dataset.andrewsRouteOutputSpellingAuthority !== "Andrews transcription") {
        diagnostics.push("andrews-source-target-route-output-spelling-authority-missing");
      }
      if (dataset.andrewsTenseMode === targetObject.TENSE_MODE.sustantivo && dataset.andrewsTargetFormulaType === "CNV") {
        diagnostics.push("nominal-output-tab-has-verbal-target-route");
      }
      if (dataset.andrewsTenseMode === targetObject.TENSE_MODE.sustantivo && (dataset.andrewsSourceTargetRoute === "CNN->CNV" || dataset.andrewsSourceTargetRoute === "CNV->CNV")) {
        diagnostics.push("nominal-output-tab-uses-non-nominal-route-host");
      }
      if (elementContract.diagnostic) {
        diagnostics.push(elementContract.diagnostic);
      }
      if (elementContract.contract && dataset.andrewsAuthorityElementContract && dataset.andrewsAuthorityElementContract !== elementContract.contract) {
        diagnostics.push("andrews-authority-element-contract-mismatch");
      }
      if (elementContract.expectedTag && dataset.andrewsAuthorityExpectedTag && dataset.andrewsAuthorityExpectedTag !== elementContract.expectedTag) {
        diagnostics.push("andrews-authority-expected-tag-mismatch");
      }
      if (elementContract.renderedTag && dataset.andrewsAuthorityRenderedTag && dataset.andrewsAuthorityRenderedTag !== elementContract.renderedTag) {
        diagnostics.push("andrews-authority-rendered-tag-mismatch");
      }
      if (elementContract.contract === "button.tense-tab" && (dataset.andrewsSelectionGate || element?.andrewsTenseTabSelectionAuditModel)) {
        const selectionModelTarget = getAndrewsTenseTabSelectionAuditModelTarget(element);
        const targetFrame = selectionModelTarget.targetFrame;
        if (!targetFrame) {
          diagnostics.push(selectionModelTarget.diagnosticId || "andrews-selection-audit-operation-frame-missing");
        }
        const expectedSelectionDisabled = targetFrame?.disabled === true;
        const expectedSelectionSelected = targetFrame?.selected === true;
        const expectedAriaSelected = targetFrame?.ariaSelected === true;
        const isSelectionActive = Boolean(element?.classList?.contains("is-active"));
        const ariaSelected = typeof element?.getAttribute === "function" ? String(element.getAttribute("aria-selected") || "") : "";
        const isSelectionMarkedSelected = String(dataset.andrewsSelectionSelected || "") === "true" || isSelectionActive || ariaSelected === "true";
        if (targetFrame && dataset.andrewsSelectionGate !== targetFrame.selectionGate) {
          diagnostics.push("andrews-selection-gate-mismatch");
        }
        if (targetFrame && dataset.andrewsSelectionAuthority !== targetFrame.selectionAuthority) {
          diagnostics.push("andrews-selection-authority-mismatch");
        }
        if (targetFrame && dataset.andrewsSelectionLogicAuthority !== targetFrame.selectionLogicAuthority) {
          diagnostics.push("andrews-selection-logic-authority-missing");
        }
        if (targetFrame && dataset.andrewsSelectionGrammarGate !== targetFrame.selectionGrammarGate) {
          diagnostics.push("andrews-selection-grammar-gate-mismatch");
        }
        if (targetFrame && dataset.andrewsSelectionOutputRole !== targetFrame.selectionOutputRole) {
          diagnostics.push("andrews-selection-output-role-mismatch");
        }
        if (targetFrame && dataset.andrewsSelectionOrthographyBoundary !== targetFrame.selectionOrthographyBoundary) {
          diagnostics.push("andrews-selection-orthography-boundary-missing");
        }
        if (targetFrame && dataset.andrewsSelectionClassicalOutputImport !== targetFrame.selectionClassicalOutputImport) {
          diagnostics.push("andrews-selection-classical-output-import-not-blocked");
        }
        if (targetFrame && dataset.andrewsSelectionSurfaceProbeRole !== targetFrame.selectionSurfaceProbeRole) {
          diagnostics.push("andrews-selection-surface-probe-role-mismatch");
        }
        if (targetFrame && dataset.andrewsSelectionBoundaryRealizationRole !== targetFrame.selectionBoundaryRealizationRole) {
          diagnostics.push("andrews-selection-evidence-role-mismatch");
        }
        if (targetFrame && dataset.andrewsSelectionBlocked !== targetFrame.selectionBlocked) {
          diagnostics.push("andrews-selection-blocked-reasons-mismatch");
        }
        if (targetFrame && dataset.andrewsSelectionDisabled !== String(expectedSelectionDisabled)) {
          diagnostics.push("andrews-selection-disabled-mismatch");
        }
        if (targetFrame && String(dataset.andrewsSelectionSelected || "") !== String(expectedSelectionSelected)) {
          diagnostics.push("andrews-selection-selected-mismatch");
        }
        if (targetFrame && isSelectionActive !== expectedSelectionSelected) {
          diagnostics.push("andrews-selection-blocked-tab-active");
        }
        if (targetFrame && ariaSelected === "true" !== expectedAriaSelected) {
          diagnostics.push("andrews-selection-blocked-tab-aria-selected");
        }
        if (targetFrame && expectedSelectionDisabled && isSelectionMarkedSelected) {
          diagnostics.push("andrews-selection-blocked-tab-selected");
        }
        if (targetFrame && typeof element?.disabled === "boolean" && element.disabled !== expectedSelectionDisabled) {
          diagnostics.push("andrews-selection-native-disabled-mismatch");
        }
        if (targetFrame && typeof element?.getAttribute === "function") {
          const ariaDisabled = String(element.getAttribute("aria-disabled") || "");
          if (ariaDisabled && ariaDisabled !== String(expectedSelectionDisabled)) {
            diagnostics.push("andrews-selection-aria-disabled-mismatch");
          }
        }
      }
      if (elementContract.contract === "button.tense-tab" && dataset.andrewsClickGate) {
        const expectedClickAuthority = getAndrewsTenseTabClickAuthorityState(element);
        if (dataset.andrewsClickGate !== expectedClickAuthority.clickGate) {
          diagnostics.push("andrews-click-gate-mismatch");
        }
        if (dataset.andrewsClickBlocked !== expectedClickAuthority.blockedReasons.join("|")) {
          diagnostics.push("andrews-click-blocked-reasons-mismatch");
        }
        if (dataset.andrewsClickAuthority !== "ANDREWS_TRANSCRIPTION_CANVAS.md") {
          diagnostics.push("andrews-click-authority-mismatch");
        }
      }
      if ((authority === "andrews-nominal-route" || authority === "andrews-particle-boundary") && slot !== "no-vnc-tns") {
        diagnostics.push("non-cnv-route-has-vnc-tense-slot");
      }
      if (authority === "unknown") {
        diagnostics.push("unclassified-authority-frame");
      }
      if (authority === "unknown" && slot !== "andrews-frame-required") {
        diagnostics.push("unclassified-authority-slot-mismatch");
      }
      if (authority === "andrews-output-gate" && slot !== "route-selection-required") {
        diagnostics.push("output-gate-slot-mismatch");
      }
      if (family === "nonactive-verbstem" && slot !== "derived-stem") {
        diagnostics.push("nonactive-suffix-not-derived-stem");
      }
      if (authority === "andrews-licensed" && dataset.andrewsGenerationGate !== "andrews-licensed-generation") {
        diagnostics.push("andrews-licensed-generation-gate-missing");
      }
      if (authority === "andrews-licensed" && dataset.classicalBoundaryRealizationRole !== "classical-boundary-realization-only") {
        diagnostics.push("andrews-licensed-boundary-realization-role-mismatch");
      }
      if (dataset.andrewsTenseMode === targetObject.TENSE_MODE.verbo && dataset.andrewsCoreGenerationAuthority && dataset.andrewsTenseAuthority !== dataset.andrewsCoreGenerationAuthority) {
        diagnostics.push("andrews-core-generation-authority-mismatch");
      }
      if (dataset.andrewsTenseMode === targetObject.TENSE_MODE.verbo && dataset.andrewsCoreTenseSource && dataset.andrewsTenseSource !== dataset.andrewsCoreTenseSource) {
        diagnostics.push("andrews-core-tense-source-mismatch");
      }
      if (dataset.andrewsTenseMode === targetObject.TENSE_MODE.verbo && dataset.andrewsCoreTenseSlot && dataset.andrewsTenseSlot !== dataset.andrewsCoreTenseSlot) {
        diagnostics.push("andrews-core-tense-slot-mismatch");
      }
      if (dataset.andrewsTenseMode === targetObject.TENSE_MODE.verbo && dataset.andrewsCoreTenseFamily && dataset.andrewsTenseFamily !== dataset.andrewsCoreTenseFamily) {
        diagnostics.push("andrews-core-tense-family-mismatch");
      }
      if (dataset.andrewsTenseMode === targetObject.TENSE_MODE.verbo && dataset.andrewsCoreLogicRole && dataset.andrewsLogicRole !== dataset.andrewsCoreLogicRole) {
        diagnostics.push("andrews-core-logic-role-mismatch");
      }
      if (dataset.andrewsTenseMode === targetObject.TENSE_MODE.verbo && dataset.andrewsCoreGenerationGate && dataset.andrewsGenerationGate !== dataset.andrewsCoreGenerationGate) {
        diagnostics.push("andrews-core-generation-gate-mismatch");
      }
      if (dataset.andrewsTenseMode === targetObject.TENSE_MODE.verbo && dataset.andrewsCoreOutputRole && dataset.andrewsOutputRole !== dataset.andrewsCoreOutputRole) {
        diagnostics.push("andrews-core-output-role-mismatch");
      }
      if (dataset.andrewsTenseMode === targetObject.TENSE_MODE.verbo && dataset.andrewsCoreBoundaryRealizationRole && dataset.classicalBoundaryRealizationRole !== dataset.andrewsCoreBoundaryRealizationRole) {
        diagnostics.push("andrews-core-boundary-realization-role-mismatch");
      }
      if (dataset.andrewsTenseMode === targetObject.TENSE_MODE.verbo && dataset.andrewsCoreClassicalOutputImport && dataset.classicalOutputImport !== dataset.andrewsCoreClassicalOutputImport) {
        diagnostics.push("andrews-core-classical-output-import-mismatch");
      }
      if (dataset.andrewsTenseMode === targetObject.TENSE_MODE.verbo && dataset.andrewsCoreGenerationGate && dataset.andrewsExecutorGenerationGate !== dataset.andrewsCoreGenerationGate) {
        diagnostics.push("andrews-executor-generation-gate-mismatch");
      }
      if (dataset.andrewsTenseMode === targetObject.TENSE_MODE.verbo && dataset.andrewsExecutorGenerationGate === "andrews-licensed-generation" && dataset.andrewsExecutorRouteStage !== "cnv-finite-output") {
        diagnostics.push("andrews-executor-route-stage-mismatch");
      }
      if (dataset.andrewsTenseMode === targetObject.TENSE_MODE.verbo && dataset.andrewsExecutorGenerationGate && dataset.andrewsExecutorGenerationGate !== "andrews-licensed-generation" && dataset.andrewsExecutorRouteStage !== "andrews-cnv-tense-logic-gate") {
        diagnostics.push("andrews-executor-route-stage-mismatch");
      }
      if (dataset.andrewsTenseMode === targetObject.TENSE_MODE.verbo && dataset.andrewsExecutorGenerationGate === "andrews-licensed-generation" && dataset.andrewsExecutorGenerationAllowed !== "true") {
        diagnostics.push("andrews-executor-generation-allowed-mismatch");
      }
      if (dataset.andrewsTenseMode === targetObject.TENSE_MODE.verbo && dataset.andrewsExecutorGenerationGate && dataset.andrewsExecutorGenerationGate !== "andrews-licensed-generation" && dataset.andrewsExecutorGenerationAllowed !== "false") {
        diagnostics.push("andrews-executor-generation-allowed-mismatch");
      }
      if (dataset.andrewsTenseMode === targetObject.TENSE_MODE.verbo && dataset.andrewsExecutorGenerationGate && dataset.andrewsExecutorGenerationGate !== "andrews-licensed-generation" && dataset.andrewsExecutorFormulaShellPolicy !== "blocked-before-formula-shell") {
        diagnostics.push("andrews-executor-formula-shell-policy-mismatch");
      }
      if (dataset.andrewsTenseMode === targetObject.TENSE_MODE.verbo && dataset.andrewsExecutorGenerationGate && dataset.andrewsExecutorGenerationGate !== "andrews-licensed-generation" && dataset.andrewsExecutorFallbackPolicy !== "blocked-no-target-stem-fallback") {
        diagnostics.push("andrews-executor-fallback-policy-mismatch");
      }
      const canonicalMismatches = getAndrewsTenseAuthorityCanonicalMismatches(element);
      canonicalMismatches.forEach(diagnostic => {
        if (!diagnostics.includes(diagnostic)) {
          diagnostics.push(diagnostic);
        }
      });
      const classMismatches = getAndrewsTenseAuthorityClassMismatches(element);
      classMismatches.forEach(diagnostic => {
        if (!diagnostics.includes(diagnostic)) {
          diagnostics.push(diagnostic);
        }
      });
      const blockOutputAudit = getAndrewsTenseBlockOutputAuditRecord(element);
      blockOutputAudit.diagnostics.forEach(diagnostic => {
        if (!diagnostics.includes(diagnostic)) {
          diagnostics.push(diagnostic);
        }
      });
      return {
        tagName: String(element?.tagName || "").toLowerCase(),
        elementContract,
        authority,
        slot,
        family,
        logicRole: String(dataset.andrewsLogicRole || ""),
        generationGate: String(dataset.andrewsGenerationGate || ""),
        outputRole: String(dataset.andrewsOutputRole || ""),
        missing,
        diagnostics,
        canonicalMismatches,
        classMismatches,
        blockOutputAudit,
        ok: missing.length === 0 && diagnostics.length === 0
      };
    }
    function auditAndrewsTenseAuthorityAnnotatedDom(root = null) {
      const scope = root || (typeof targetObject.document !== "undefined" ? targetObject.document : null);
      if (!scope || typeof scope.querySelectorAll !== "function") {
        return {
          checked: 0,
          ok: true,
          missingCount: 0,
          diagnosticCount: 0,
          records: []
        };
      }
      const records = Array.from(scope.querySelectorAll(".tense-tab, .tense-block")).map(element => getAndrewsTenseAuthorityDatasetAuditRecord(element));
      const missingCount = records.filter(record => record.missing.length > 0).length;
      const diagnosticCount = records.filter(record => record.diagnostics.length > 0).length;
      return {
        checked: records.length,
        ok: missingCount === 0 && diagnosticCount === 0,
        missingCount,
        diagnosticCount,
        records
      };
    }
    function summarizeAndrewsTenseBlockOutputAudit(root = null) {
      const scope = root || (typeof targetObject.document !== "undefined" ? targetObject.document : null);
      if (!scope || typeof scope.querySelectorAll !== "function") {
        return {
          checked: 0,
          ok: true,
          rowCount: 0,
          placeholderCount: 0,
          grammarGenerationAllowedCount: 0,
          grammarGenerationBlockedRowCount: 0,
          grammarGeneratedBlockedRouteContractCount: 0,
          grammarGeneratedResultNotOkCount: 0,
          grammarLogicAuthorityMissingCount: 0,
          grammarSpellingEvidenceRoleMismatchCount: 0,
          grammarSourceContextAuthorityMismatchCount: 0,
          grammarSourceEvidenceAuthorityMismatchCount: 0,
          grammarClassicalSpellingRoleMismatchCount: 0,
          grammarOrthographyBoundaryMissingCount: 0,
          grammarSpellingAuthorityMismatchCount: 0,
          grammarClassicalSurfaceImportNotBlockedCount: 0,
          grammarRouteContractMissingCount: 0,
          hardBlockedCount: 0,
          grammarBlockedResultOkCount: 0,
          diagnosticCount: 0,
          records: []
        };
      }
      const records = Array.from(scope.querySelectorAll(".tense-block")).map(element => getAndrewsTenseBlockOutputAuditRecord(element));
      const rowCount = records.reduce((sum, record) => sum + (record.rowCount || 0), 0);
      const placeholderCount = records.reduce((sum, record) => sum + (record.placeholderCount || 0), 0);
      const grammarGenerationAllowedCount = records.reduce((sum, record) => sum + (record.grammarGenerationAllowedCount || 0), 0);
      const grammarGenerationBlockedRowCount = records.reduce((sum, record) => sum + (record.grammarGenerationBlockedRowCount || 0), 0);
      const grammarGeneratedBlockedRouteContractCount = records.reduce((sum, record) => sum + (record.grammarGeneratedBlockedRouteContractCount || 0), 0);
      const grammarGeneratedResultNotOkCount = records.reduce((sum, record) => sum + (record.grammarGeneratedResultNotOkCount || 0), 0);
      const grammarLogicAuthorityMissingCount = records.reduce((sum, record) => sum + (record.grammarLogicAuthorityMissingCount || 0), 0);
      const grammarSpellingEvidenceRoleMismatchCount = records.reduce((sum, record) => sum + (record.grammarSpellingEvidenceRoleMismatchCount || 0), 0);
      const grammarSourceContextAuthorityMismatchCount = records.reduce((sum, record) => sum + (record.grammarSourceContextAuthorityMismatchCount || 0), 0);
      const grammarSourceEvidenceAuthorityMismatchCount = records.reduce((sum, record) => sum + (record.grammarSourceEvidenceAuthorityMismatchCount || 0), 0);
      const grammarClassicalSpellingRoleMismatchCount = records.reduce((sum, record) => sum + (record.grammarClassicalSpellingRoleMismatchCount || 0), 0);
      const grammarOrthographyBoundaryMissingCount = records.reduce((sum, record) => sum + (record.grammarOrthographyBoundaryMissingCount || 0), 0);
      const grammarSpellingAuthorityMismatchCount = records.reduce((sum, record) => sum + (record.grammarSpellingAuthorityMismatchCount || 0), 0);
      const grammarClassicalSurfaceImportNotBlockedCount = records.reduce((sum, record) => sum + (record.grammarClassicalSurfaceImportNotBlockedCount || 0), 0);
      const grammarRouteContractMissingCount = records.reduce((sum, record) => sum + (record.grammarRouteContractMissingCount || 0), 0);
      const grammarBlockedResultOkCount = records.reduce((sum, record) => sum + (record.grammarBlockedResultOkCount || 0), 0);
      const hardBlockedCount = records.filter(record => record.hardBlocked).length;
      const diagnosticCount = records.filter(record => record.diagnostics.length > 0).length;
      return {
        checked: records.length,
        ok: diagnosticCount === 0,
        rowCount,
        placeholderCount,
        grammarGenerationAllowedCount,
        grammarGenerationBlockedRowCount,
        grammarGeneratedBlockedRouteContractCount,
        grammarGeneratedResultNotOkCount,
        grammarLogicAuthorityMissingCount,
        grammarSpellingEvidenceRoleMismatchCount,
        grammarSourceContextAuthorityMismatchCount,
        grammarSourceEvidenceAuthorityMismatchCount,
        grammarClassicalSpellingRoleMismatchCount,
        grammarOrthographyBoundaryMissingCount,
        grammarSpellingAuthorityMismatchCount,
        grammarClassicalSurfaceImportNotBlockedCount,
        grammarRouteContractMissingCount,
        grammarBlockedResultOkCount,
        hardBlockedCount,
        diagnosticCount,
        records
      };
    }
    function getAndrewsTenseTabSelectionAuditRecord(element = null) {
      const classList = element?.classList || null;
      const isTab = !!classList?.contains("tense-tab");
      const diagnostics = [];
      if (!isTab) {
        return {
          isTab,
          selectionGate: "",
          selectable: false,
          blocked: false,
          selected: false,
          ariaSelected: false,
          blockedSelected: false,
          outputProbeOnly: false,
          hardGate: false,
          disabled: false,
          nativeDisabled: false,
          missingSelectionMetadata: false,
          diagnostics,
          ok: true
        };
      }
      const selectionModelTarget = getAndrewsTenseTabSelectionAuditModelTarget(element);
      const targetFrame = selectionModelTarget.targetFrame;
      if (!targetFrame) {
        return getEmptyAndrewsTenseTabSelectionAuditRecord(selectionModelTarget.diagnosticId || "andrews-selection-audit-operation-frame-missing");
      }
      const authorityRecord = getAndrewsTenseAuthorityDatasetAuditRecord(element);
      authorityRecord.diagnostics.filter(diagnostic => String(diagnostic || "").startsWith("andrews-selection-")).forEach(diagnostic => {
        if (!diagnostics.includes(diagnostic)) {
          diagnostics.push(diagnostic);
        }
      });
      return {
        isTab,
        selectionGate: targetFrame.selectionGate || "",
        selectable: targetFrame.selectable === true,
        blocked: targetFrame.blocked === true,
        selected: targetFrame.selected === true,
        ariaSelected: targetFrame.ariaSelected === true,
        blockedSelected: targetFrame.blockedSelected === true,
        outputProbeOnly: targetFrame.outputProbeOnly === true,
        hardGate: targetFrame.hardGate === true,
        disabled: targetFrame.disabled === true,
        nativeDisabled: targetFrame.nativeDisabled === true,
        missingSelectionMetadata: false,
        diagnostics,
        ok: diagnostics.length === 0
      };
    }
    function summarizeAndrewsTenseTabSelectionAudit(root = null) {
      const scope = root || (typeof targetObject.document !== "undefined" ? targetObject.document : null);
      if (!scope || typeof scope.querySelectorAll !== "function") {
        return {
          checked: 0,
          ok: true,
          selectableCount: 0,
          blockedCount: 0,
          selectedCount: 0,
          blockedSelectedCount: 0,
          outputProbeOnlyCount: 0,
          hardGateCount: 0,
          disabledCount: 0,
          nativeDisabledCount: 0,
          missingSelectionMetadataCount: 0,
          diagnosticCount: 0,
          logicAuthorityMismatchCount: 0,
          grammarGateMismatchCount: 0,
          orthographyBoundaryMissingCount: 0,
          classicalImportNotBlockedCount: 0,
          surfaceProbeRoleMismatchCount: 0,
          disabledMismatchCount: 0,
          activeMismatchCount: 0,
          records: []
        };
      }
      const records = Array.from(scope.querySelectorAll(".tense-tab")).map(element => getAndrewsTenseTabSelectionAuditRecord(element));
      const countDiagnostic = diagnosticId => records.filter(record => record.diagnostics.includes(diagnosticId)).length;
      const diagnosticCount = records.filter(record => record.diagnostics.length > 0).length;
      const missingSelectionMetadataCount = records.filter(record => record.missingSelectionMetadata).length;
      return {
        checked: records.length,
        ok: missingSelectionMetadataCount === 0 && diagnosticCount === 0,
        selectableCount: records.filter(record => record.selectable).length,
        blockedCount: records.filter(record => record.blocked).length,
        selectedCount: records.filter(record => record.selected).length,
        blockedSelectedCount: records.filter(record => record.blockedSelected).length,
        outputProbeOnlyCount: records.filter(record => record.outputProbeOnly).length,
        hardGateCount: records.filter(record => record.hardGate).length,
        disabledCount: records.filter(record => record.disabled).length,
        nativeDisabledCount: records.filter(record => record.nativeDisabled).length,
        missingSelectionMetadataCount,
        diagnosticCount,
        logicAuthorityMismatchCount: countDiagnostic("andrews-selection-logic-authority-missing"),
        grammarGateMismatchCount: countDiagnostic("andrews-selection-grammar-gate-mismatch"),
        orthographyBoundaryMissingCount: countDiagnostic("andrews-selection-orthography-boundary-missing"),
        classicalImportNotBlockedCount: countDiagnostic("andrews-selection-classical-output-import-not-blocked"),
        surfaceProbeRoleMismatchCount: countDiagnostic("andrews-selection-surface-probe-role-mismatch"),
        disabledMismatchCount: countDiagnostic("andrews-selection-disabled-mismatch") + countDiagnostic("andrews-selection-native-disabled-mismatch") + countDiagnostic("andrews-selection-aria-disabled-mismatch"),
        activeMismatchCount: countDiagnostic("andrews-selection-selected-mismatch") + countDiagnostic("andrews-selection-blocked-tab-active") + countDiagnostic("andrews-selection-blocked-tab-aria-selected") + countDiagnostic("andrews-selection-blocked-tab-selected"),
        records
      };
    }
    function getAndrewsTenseAuthorityDomDescriptor(element = null, {
      mode = "",
      blockKind = ""
    } = {}) {
      const dataset = element?.dataset || {};
      const classList = element?.classList || null;
      const fallbackMode = String(mode || "").trim() || String(dataset.tenseMode || "").trim() || String(dataset.andrewsTenseMode || "").trim() || (typeof targetObject.getActiveTenseMode === "function" ? targetObject.getActiveTenseMode() : "") || targetObject.TENSE_MODE.verbo;
      const tenseValue = String(dataset.tenseValue || dataset.andrewsTenseValue || dataset.nonactiveSuffix || (classList?.contains("tense-block--selection-required") ? "selection-required" : "") || "").trim();
      return {
        tenseValue,
        mode: fallbackMode,
        blockKind: String(dataset.andrewsBlockKind || blockKind || (classList?.contains("tense-block") ? "dom-audit-tense-block" : "dom-audit-tense-tab"))
      };
    }
    function syncAndrewsTenseAuthorityDomAudit(root = null, {
      annotateMissing = true,
      mode = "",
      blockKind = ""
    } = {}) {
      const scope = root || (typeof targetObject.document !== "undefined" ? targetObject.document : null);
      if (!scope || typeof scope.querySelectorAll !== "function") {
        return {
          checked: 0,
          annotated: 0,
          ok: true,
          missingCount: 0,
          diagnosticCount: 0,
          records: []
        };
      }
      let annotated = 0;
      let repaired = 0;
      let selectionAnnotated = 0;
      let selectionRepaired = 0;
      if (annotateMissing) {
        Array.from(scope.querySelectorAll(".tense-tab, .tense-block")).forEach(element => {
          if (!element?.dataset) {
            return;
          }
          const descriptor = getAndrewsTenseAuthorityDomDescriptor(element, {
            mode,
            blockKind
          });
          const record = getAndrewsTenseAuthorityDatasetAuditRecord(element);
          const canonicalMismatches = getAndrewsTenseAuthorityCanonicalMismatches(element, {
            mode: descriptor.mode,
            blockKind: descriptor.blockKind
          });
          const classMismatches = getAndrewsTenseAuthorityClassMismatches(element, {
            mode: descriptor.mode,
            blockKind: descriptor.blockKind
          });
          const needsInitialAnnotation = !element.dataset.andrewsTenseAuthority;
          const needsRepair = !needsInitialAnnotation && (record.missing.length > 0 || canonicalMismatches.length > 0 || classMismatches.length > 0);
          if (!needsInitialAnnotation && !needsRepair) {
            return;
          }
          applyAndrewsTenseAuthorityDataset(element, getAndrewsTenseAuthorityDomDescriptor(element, {
            mode,
            blockKind
          }));
          if (needsRepair) {
            repaired += 1;
          } else {
            annotated += 1;
          }
        });
      }
      Array.from(scope.querySelectorAll(".tense-block")).forEach(element => {
        applyAndrewsTenseBlockOutputAuditDataset(element);
        const record = getAndrewsTenseAuthorityDatasetAuditRecord(element);
        element.classList?.toggle("tense-block--andrews-audit-warning", !record.ok);
      });
      Array.from(scope.querySelectorAll(".tense-tab")).forEach(element => {
        const selectionRecord = getAndrewsTenseTabSelectionAuditRecord(element);
        if (selectionRecord.missingSelectionMetadata || selectionRecord.diagnostics.length > 0) {
          const descriptor = getAndrewsTenseAuthorityDomDescriptor(element, {
            mode,
            blockKind
          });
          applyAndrewsTenseTabSelectionAuthorityDataset(element, {
            tenseValue: descriptor.tenseValue,
            mode: descriptor.mode
          });
          if (selectionRecord.missingSelectionMetadata) {
            selectionAnnotated += 1;
          } else {
            selectionRepaired += 1;
          }
        } else {
          applyAndrewsTenseTabClickAuthorityDataset(element);
        }
        const record = getAndrewsTenseAuthorityDatasetAuditRecord(element);
        element.classList?.toggle("tense-tab--andrews-audit-warning", !record.ok);
      });
      syncAndrewsTenseTabsOperationalLayerPanel(scope, {
        mode
      });
      const blockOutputAudit = summarizeAndrewsTenseBlockOutputAudit(scope);
      const tabSelectionAudit = summarizeAndrewsTenseTabSelectionAudit(scope);
      const audit = auditAndrewsTenseAuthorityAnnotatedDom(scope);
      if (scope.dataset) {
        scope.dataset.andrewsAuthorityAudit = audit.ok ? "ok" : "diagnostic";
        scope.dataset.andrewsAuthorityChecked = String(audit.checked);
        scope.dataset.andrewsAuthorityAnnotated = String(annotated);
        scope.dataset.andrewsAuthorityRepaired = String(repaired);
        scope.dataset.andrewsAuthorityMissingCount = String(audit.missingCount);
        scope.dataset.andrewsAuthorityDiagnosticCount = String(audit.diagnosticCount);
        scope.dataset.andrewsTabSelectionAudit = tabSelectionAudit.ok ? "ok" : "diagnostic";
        scope.dataset.andrewsTabSelectionChecked = String(tabSelectionAudit.checked);
        scope.dataset.andrewsTabSelectionAnnotated = String(selectionAnnotated);
        scope.dataset.andrewsTabSelectionRepaired = String(selectionRepaired);
        scope.dataset.andrewsTabSelectionSelectableCount = String(tabSelectionAudit.selectableCount);
        scope.dataset.andrewsTabSelectionBlockedCount = String(tabSelectionAudit.blockedCount);
        scope.dataset.andrewsTabSelectionSelectedCount = String(tabSelectionAudit.selectedCount);
        scope.dataset.andrewsTabSelectionBlockedSelectedCount = String(tabSelectionAudit.blockedSelectedCount);
        scope.dataset.andrewsTabSelectionOutputProbeOnlyCount = String(tabSelectionAudit.outputProbeOnlyCount);
        scope.dataset.andrewsTabSelectionHardGateCount = String(tabSelectionAudit.hardGateCount);
        scope.dataset.andrewsTabSelectionDisabledCount = String(tabSelectionAudit.disabledCount);
        scope.dataset.andrewsTabSelectionNativeDisabledCount = String(tabSelectionAudit.nativeDisabledCount);
        scope.dataset.andrewsTabSelectionMissingCount = String(tabSelectionAudit.missingSelectionMetadataCount);
        scope.dataset.andrewsTabSelectionDiagnosticCount = String(tabSelectionAudit.diagnosticCount);
        scope.dataset.andrewsTabSelectionLogicAuthorityMismatchCount = String(tabSelectionAudit.logicAuthorityMismatchCount);
        scope.dataset.andrewsTabSelectionGrammarGateMismatchCount = String(tabSelectionAudit.grammarGateMismatchCount);
        scope.dataset.andrewsTabSelectionOrthographyBoundaryMissingCount = String(tabSelectionAudit.orthographyBoundaryMissingCount);
        scope.dataset.andrewsTabSelectionClassicalImportNotBlockedCount = String(tabSelectionAudit.classicalImportNotBlockedCount);
        scope.dataset.andrewsTabSelectionSurfaceProbeRoleMismatchCount = String(tabSelectionAudit.surfaceProbeRoleMismatchCount);
        scope.dataset.andrewsTabSelectionDisabledMismatchCount = String(tabSelectionAudit.disabledMismatchCount);
        scope.dataset.andrewsTabSelectionActiveMismatchCount = String(tabSelectionAudit.activeMismatchCount);
        scope.dataset.andrewsBlockOutputChecked = String(blockOutputAudit.checked);
        scope.dataset.andrewsBlockOutputRowCount = String(blockOutputAudit.rowCount);
        scope.dataset.andrewsBlockOutputPlaceholderCount = String(blockOutputAudit.placeholderCount);
        scope.dataset.andrewsBlockRouteGenerationAllowedCount = String(blockOutputAudit.grammarGenerationAllowedCount);
        scope.dataset.andrewsBlockRouteGenerationBlockedRowCount = String(blockOutputAudit.grammarGenerationBlockedRowCount);
        scope.dataset.andrewsBlockRouteBlockedResultOkCount = String(blockOutputAudit.grammarBlockedResultOkCount);
        scope.dataset.andrewsBlockRouteGeneratedBlockedContractCount = String(blockOutputAudit.grammarGeneratedBlockedRouteContractCount);
        scope.dataset.andrewsBlockRouteGeneratedResultNotOkCount = String(blockOutputAudit.grammarGeneratedResultNotOkCount);
        scope.dataset.andrewsBlockRowLogicAuthorityMissingCount = String(blockOutputAudit.grammarLogicAuthorityMissingCount);
        scope.dataset.andrewsBlockRowSpellingEvidenceRoleMismatchCount = String(blockOutputAudit.grammarSpellingEvidenceRoleMismatchCount);
        scope.dataset.andrewsBlockRowSourceContextAuthorityMismatchCount = String(blockOutputAudit.grammarSourceContextAuthorityMismatchCount);
        scope.dataset.andrewsBlockRowSourceEvidenceAuthorityMismatchCount = String(blockOutputAudit.grammarSourceEvidenceAuthorityMismatchCount);
        scope.dataset.andrewsBlockRowClassicalSpellingRoleMismatchCount = String(blockOutputAudit.grammarClassicalSpellingRoleMismatchCount);
        scope.dataset.andrewsBlockRowOrthographyBoundaryMissingCount = String(blockOutputAudit.grammarOrthographyBoundaryMissingCount);
        scope.dataset.andrewsBlockRowSpellingAuthorityMismatchCount = String(blockOutputAudit.grammarSpellingAuthorityMismatchCount);
        scope.dataset.andrewsBlockRowClassicalImportNotBlockedCount = String(blockOutputAudit.grammarClassicalSurfaceImportNotBlockedCount);
        scope.dataset.andrewsBlockRowRouteContractMissingCount = String(blockOutputAudit.grammarRouteContractMissingCount);
        scope.dataset.andrewsBlockOutputHardBlockedCount = String(blockOutputAudit.hardBlockedCount);
        scope.dataset.andrewsBlockOutputDiagnosticCount = String(blockOutputAudit.diagnosticCount);
      }
      return {
        ...audit,
        annotated,
        repaired,
        selectionAnnotated,
        selectionRepaired,
        tabSelectionAudit,
        blockOutputAudit
      };
    }
    function getAndrewsFirstTenseHoverTitle(tenseValue = "", mode = targetObject.TENSE_MODE.verbo) {
      const frame = getAndrewsTenseAuthorityFrame(tenseValue, mode);
      return frame.title || "Andrews dirige la logica y la realizacion clasica contextual.";
    }
    function getAndrewsFirstGroupHoverTitle(group = null) {
      if (!group || typeof group !== "object") {
        return "";
      }
      return targetObject.getLocalizedLabel(group.hoverTitle, targetObject.getClassicalLocaleContext(), "") || targetObject.getLocalizedLabel(group.title, targetObject.getClassicalLocaleContext(), "") || "";
    }
    function buildFormalReroutedFunctionTenseGroups(tenseMode = "", visibleTenses = []) {
      const normalizedMode = String(tenseMode || "").trim();
      if (normalizedMode !== targetObject.TENSE_MODE.adjetivo && normalizedMode !== targetObject.TENSE_MODE.adverbio) {
        return null;
      }
      const visibleTenseSet = new Set(Array.isArray(visibleTenses) ? visibleTenses : []);
      const sourceModes = normalizedMode === targetObject.TENSE_MODE.adverbio ? [targetObject.TENSE_MODE.verbo] : [targetObject.TENSE_MODE.verbo, targetObject.TENSE_MODE.sustantivo];
      const mergeGroups = (side = "left") => sourceModes.flatMap(mode => Array.isArray(targetObject.TENSE_LINGUISTIC_GROUPS[mode]?.[side]) ? targetObject.TENSE_LINGUISTIC_GROUPS[mode][side] : []).map(group => ({
        ...group,
        tenses: Array.isArray(group?.tenses) ? group.tenses.filter(tenseValue => visibleTenseSet.has(tenseValue)) : []
      })).filter(group => group.tenses.length);
      return {
        left: mergeGroups("left"),
        right: mergeGroups("right")
      };
    }
    function renderTenseTabs() {
      const container = targetObject.document.getElementById("tense-tabs");
      if (!container) {
        return;
      }
      const outputUniversalContainer = targetObject.document.getElementById("output-universal-tabs");
      const outputControlsContainer = targetObject.document.getElementById("output-result-controls");
      const focusState = targetObject.captureTenseTabsFocusState(container) || targetObject.captureTenseTabsFocusState(outputUniversalContainer);
      const classicalLocaleContext = false;
      targetObject.updateTenseModeTabs();
      const currentCombinedMode = targetObject.getCombinedMode();
      const isNonactiveMode = targetObject.getActiveTenseMode() === targetObject.TENSE_MODE.verbo && currentCombinedMode === targetObject.COMBINED_MODE.nonactive;
      targetObject.document.body.classList.toggle("is-nonactive-mode", isNonactiveMode);
      const verbMeta = targetObject.getVerbInputMeta();
      const verb = verbMeta.verb;
      const analysisVerb = verbMeta.analysisVerb || verb;
      const displayVerb = verbMeta.displayVerb;
      targetObject.renderDerivationAntiderivativePanel(verbMeta);
      const endsWithConsonant = verb !== "" && !targetObject.VOWEL_END_RE.test(verb);
      const hasVerb = verb !== "" && targetObject.VOWEL_RE.test(verb);
      const tenseMode = targetObject.getActiveTenseMode();
      if (tenseMode === targetObject.TENSE_MODE.particula) {
        container.innerHTML = "";
        targetObject.TenseTabsDomSignature = "particula";
        if (outputUniversalContainer) {
          outputUniversalContainer.innerHTML = "";
          outputUniversalContainer.hidden = true;
        }
        if (outputControlsContainer) {
          outputControlsContainer.hidden = true;
        }
        syncVerbSourceScopeControl();
        return;
      }
      const sourceScope = targetObject.getVerbSourceScope();
      const nonactiveSuffixOptionMap = tenseMode === targetObject.TENSE_MODE.verbo ? resolveNonactiveSuffixOptionMap({
        verbMeta,
        verb,
        analysisVerb
      }) : new Map();
      const selectedNonactiveSuffix = tenseMode === targetObject.TENSE_MODE.verbo ? normalizeSelectedNonactiveSuffix(nonactiveSuffixOptionMap) : null;
      const allowedTensesRaw = targetObject.getTenseOrderForMode(tenseMode);
      const allowedTenses = filterTenseOrderForUiDensity(allowedTensesRaw, tenseMode);
      const isNominalMode = targetObject.isNominalTenseMode(tenseMode);
      const nounActiveTenses = isNominalMode ? targetObject.getNounTenseOrderForCombinedMode(targetObject.COMBINED_MODE.active, tenseMode) : [];
      const nounNonactiveTenses = isNominalMode ? targetObject.getNounTenseOrderForCombinedMode(targetObject.COMBINED_MODE.nonactive, tenseMode) : [];
      const nounVisibleTenses = isNominalMode ? sourceScope === targetObject.VERB_SOURCE_SCOPE.active ? nounActiveTenses : sourceScope === targetObject.VERB_SOURCE_SCOPE.nonactive ? nounNonactiveTenses : Array.from(new Set([...nounActiveTenses, ...nounNonactiveTenses])) : [];
      const blockedNominalTenseSet = (() => {
        if (tenseMode !== targetObject.TENSE_MODE.adjetivo || !hasVerb) {
          return new Set();
        }
        if (targetObject.getBaseObjectSlots(verbMeta) <= 0) {
          return new Set();
        }
        return new Set(nounVisibleTenses.filter(tenseValue => targetObject.isIntransitiveOnlyActiveAdjectiveTense(tenseValue)));
      })();
      const dualSourceNominalTenses = new Set(["patientivo"]);
      const nonactiveNominalSet = new Set(nounNonactiveTenses);
      const activeColumnTenses = isNominalMode ? nounActiveTenses.filter(tenseValue => !nonactiveNominalSet.has(tenseValue) || dualSourceNominalTenses.has(tenseValue)) : [];
      const visibleTenses = isNominalMode ? nounVisibleTenses : allowedTenses;
      const verbSemanticGroups = !isNominalMode && tenseMode === targetObject.TENSE_MODE.verbo ? targetObject.getVerbSemanticTenseGroups(visibleTenses) : [];
      const modeGroups = buildFormalReroutedFunctionTenseGroups(tenseMode, visibleTenses) || targetObject.TENSE_LINGUISTIC_GROUPS[tenseMode] || targetObject.TENSE_LINGUISTIC_GROUPS.verbo;
      const visibleTenseSet = new Set(visibleTenses);
      let requestedSelectionState = targetObject.getCurrentResolvedConjugationSelectionState({
        tenseMode
      });
      const selectedTenseValue = requestedSelectionState.tenseValue;
      if (!visibleTenseSet.has(selectedTenseValue) || blockedNominalTenseSet.has(selectedTenseValue)) {
        requestedSelectionState = {
          ...requestedSelectionState,
          tenseValue: visibleTenses.find(tenseValue => !blockedNominalTenseSet.has(tenseValue)) || allowedTenses.find(tenseValue => !blockedNominalTenseSet.has(tenseValue)) || targetObject.TENSE_ORDER.find(tenseValue => !blockedNominalTenseSet.has(tenseValue)) || visibleTenses[0] || allowedTenses[0] || targetObject.TENSE_ORDER[0]
        };
      }
      const shouldShowUniversalTabs = tenseMode === targetObject.TENSE_MODE.verbo;
      const shouldComputeUniversalAvailability = shouldShowUniversalTabs && targetObject.VerbRenderContext !== "typing";
      let availability = shouldShowUniversalTabs ? targetObject.PreteritoUniversalAvailabilityCache : [];
      if (shouldShowUniversalTabs) {
        const needsAvailabilityCompute = shouldComputeUniversalAvailability || !Array.isArray(availability) || availability.length !== targetObject.PRETERITO_UNIVERSAL_ORDER.length;
        if (needsAvailabilityCompute) {
          const isTransitive = targetObject.isObj1ValencyFilled(targetObject.getCurrentObjectPrefix(), verbMeta);
          const derivationType = verbMeta.derivationType || targetObject.getActiveDerivationType();
          let availabilityTargets = [{
            verb,
            analysisVerb
          }];
          if (derivationType === targetObject.DERIVATION_TYPE.causative) {
            const causativeDerivation = targetObject.applyCausativeDerivation({
              isCausative: true,
              verb,
              analysisVerb,
              objectPrefix: targetObject.getCurrentObjectPrefix(),
              parsedVerb: verbMeta,
              directionalPrefix: verbMeta.directionalPrefix
            });
            if (causativeDerivation.noCausativeStem) {
              availabilityTargets = [];
            } else {
              const stems = Array.isArray(causativeDerivation.causativeAllStems) && causativeDerivation.causativeAllStems.length ? causativeDerivation.causativeAllStems : [causativeDerivation.verb];
              availabilityTargets = stems.map(stem => {
                let stemAnalysis = stem;
                if (verbMeta.directionalPrefix && stem.startsWith(verbMeta.directionalPrefix)) {
                  stemAnalysis = stem.slice(verbMeta.directionalPrefix.length);
                }
                return {
                  verb: stem,
                  analysisVerb: stemAnalysis
                };
              });
            }
          } else if (derivationType === targetObject.DERIVATION_TYPE.applicative) {
            const applicativeDerivation = targetObject.applyApplicativeDerivation({
              isApplicative: true,
              verb,
              analysisVerb,
              objectPrefix: targetObject.getCurrentObjectPrefix(),
              parsedVerb: verbMeta,
              directionalPrefix: verbMeta.directionalPrefix
            });
            if (applicativeDerivation.noApplicativeStem) {
              availabilityTargets = [];
            } else {
              const stems = Array.isArray(applicativeDerivation.applicativeAllStems) && applicativeDerivation.applicativeAllStems.length ? applicativeDerivation.applicativeAllStems : [applicativeDerivation.verb];
              availabilityTargets = stems.map(stem => {
                let stemAnalysis = stem;
                if (verbMeta.directionalPrefix && stem.startsWith(verbMeta.directionalPrefix)) {
                  stemAnalysis = stem.slice(verbMeta.directionalPrefix.length);
                }
                return {
                  verb: stem,
                  analysisVerb: stemAnalysis
                };
              });
            }
          }
          const canResolveClassPolicy = typeof targetObject.buildPretUniversalContext === "function" && typeof targetObject.getPretUniversalVariantsByClass === "function" && typeof targetObject.resolvePretClassPolicy === "function";
          const subjectSuffixes = ["", "t"];
          const baseObjectPrefix = targetObject.getCurrentObjectPrefix();
          const resolveAllowedClassesForTarget = target => {
            const allowed = new Set();
            if (!target || !canResolveClassPolicy) {
              return allowed;
            }
            const analysisVerbTarget = target.analysisVerb || target.verb || "";
            const forceClassBOnly = targetObject.shouldForceClassBOnlyForVerbMode({
              tenseMode,
              combinedMode: currentCombinedMode
            });
            const contextOptions = typeof targetObject.buildPretContextOptionsFromMeta === "function" ? targetObject.buildPretContextOptionsFromMeta(verbMeta, {
              derivationType,
              forceClassBOnly
            }) : {
              hasSlashMarker: verbMeta.hasSlashMarker,
              hasSuffixSeparator: verbMeta.hasSuffixSeparator,
              hasLeadingDash: verbMeta.hasLeadingDash,
              hasBoundMarker: verbMeta.hasBoundMarker,
              hasCompoundMarker: verbMeta.hasCompoundMarker,
              hasImpersonalTlaPrefix: verbMeta.hasImpersonalTlaPrefix,
              hasOptionalSupportiveI: verbMeta.hasOptionalSupportiveI,
              hasNonspecificValence: targetObject.resolveHasNonspecificValence(verbMeta),
              exactBaseVerb: verbMeta.exactBaseVerb || "",
              rootPlusYaBase: verbMeta.rootPlusYaBase,
              rootPlusYaBasePronounceable: verbMeta.rootPlusYaBasePronounceable,
              derivationType,
              forceClassBOnly
            };
            const context = targetObject.buildPretUniversalContext(target.verb, analysisVerbTarget, isTransitive, contextOptions);
            if (!context) {
              return allowed;
            }
            const variantsByClass = targetObject.getPretUniversalVariantsByClass(context);
            if (!variantsByClass || !variantsByClass.size) {
              return allowed;
            }
            const hasClassA = variantsByClass.has("A");
            const hasClassB = variantsByClass.has("B");
            variantsByClass.forEach((variants, classKey) => {
              if (!variants || !variants.length) {
                return;
              }
              if (classKey !== "A" && classKey !== "B") {
                allowed.add(classKey);
                return;
              }
              const allowsForAnySuffix = subjectSuffixes.some(suffix => {
                const policy = targetObject.resolvePretClassPolicy({
                  context,
                  tense: "preterito",
                  isTransitive,
                  classFilter: classKey,
                  baseObjectPrefix,
                  hasClassA,
                  hasClassB,
                  allowAllClasses: false,
                  subjectSuffix: suffix
                });
                if (!policy) {
                  return true;
                }
                if (classKey === "A") {
                  return !policy.shouldSkipClassA;
                }
                return !policy.shouldSkipClassB && !policy.shouldMaskClassBSelection;
              });
              if (allowsForAnySuffix) {
                allowed.add(classKey);
              }
            });
            return allowed;
          };
          const allowedClasses = new Set();
          if (hasVerb && availabilityTargets.length) {
            availabilityTargets.forEach(target => {
              resolveAllowedClassesForTarget(target).forEach(classKey => allowedClasses.add(classKey));
            });
          }
          if (!canResolveClassPolicy && availabilityTargets.length) {
            availabilityTargets.forEach(target => {
              targetObject.PRETERITO_UNIVERSAL_ORDER.forEach(tenseValue => {
                const variants = targetObject.getPretUniversalVariants(target.verb, tenseValue, isTransitive, target.analysisVerb, targetObject.buildPretVariantsOptionsFromMeta(verbMeta, {
                  derivationType
                }));
                if (variants && variants.length) {
                  const classKey = targetObject.PRET_UNIVERSAL_CLASS_BY_TENSE[tenseValue];
                  if (classKey) {
                    allowedClasses.add(classKey);
                  }
                }
              });
            });
          }
          availability = targetObject.PRETERITO_UNIVERSAL_ORDER.map(tenseValue => {
            const classKey = targetObject.PRET_UNIVERSAL_CLASS_BY_TENSE[tenseValue];
            const isAvailable = hasVerb && !!(classKey && allowedClasses.has(classKey));
            return buildTenseAvailabilityRecord({
              tenseValue,
              combinedMode: targetObject.COMBINED_MODE.active,
              source: "pret-universal-class",
              available: isAvailable,
              hasOutput: isAvailable
            });
          });
          targetObject.PreteritoUniversalAvailabilityCache = availability;
        }
      } else {
        targetObject.PreteritoUniversalAvailabilityCache = [];
        availability = [];
      }
      const selectionState = targetObject.resolveConjugationSelectionState(requestedSelectionState, {
        tenseMode,
        availabilityEntries: availability
      });
      const rawSelectionState = targetObject.buildConjugationSelectionState({
        tenseMode
      });
      if (rawSelectionState.group !== selectionState.group || rawSelectionState.tenseValue !== selectionState.tenseValue || rawSelectionState.universalTenseValue !== selectionState.universalTenseValue || rawSelectionState.classFilter !== selectionState.classFilter) {
        targetObject.applyResolvedConjugationSelectionState(selectionState);
      }
      const activeGroup = selectionState.group;
      const selectedTense = selectionState.tenseValue;
      const isClassTenseSelected = targetObject.PRETERITO_CLASS_TENSES.has(selectedTense);
      const tenseOutputCache = new Map();
      const shouldComputeTenseOutput = targetObject.VerbRenderContext !== "typing";
      const availabilityProbeMemo = new Map();
      const availabilityMemoContextByMode = new Map();
      const getAvailabilityMemoContextForMode = (combinedMode = targetObject.COMBINED_MODE.active) => {
        const resolvedCombinedMode = combinedMode === targetObject.COMBINED_MODE.nonactive ? targetObject.COMBINED_MODE.nonactive : targetObject.COMBINED_MODE.active;
        if (!availabilityMemoContextByMode.has(resolvedCombinedMode)) {
          const modeIsNonactive = resolvedCombinedMode === targetObject.COMBINED_MODE.nonactive;
          availabilityMemoContextByMode.set(resolvedCombinedMode, buildAvailabilityMemoContext({
            tenseMode,
            isNonactiveMode: modeIsNonactive,
            derivationType: verbMeta.derivationType || targetObject.getActiveDerivationType(),
            derivationMode: modeIsNonactive ? targetObject.DERIVATION_MODE.nonactive : targetObject.DERIVATION_MODE.active,
            voiceMode: modeIsNonactive ? targetObject.VOICE_MODE.passive : targetObject.VOICE_MODE.active
          }));
        }
        return availabilityMemoContextByMode.get(resolvedCombinedMode);
      };
      const verbOutputContextsByMode = (() => {
        if (tenseMode !== targetObject.TENSE_MODE.verbo) {
          return null;
        }
        const subjectSelections = targetObject.getSubjectPersonSelections();
        const fusionMarkers = verbMeta.isTlaFusion ? (verbMeta.fusionPrefixes || []).filter(prefix => targetObject.FUSION_PREFIXES.has(prefix)) : [];
        const buildVerbOutputContextForMode = (modeIsNonactive = false) => {
          const nonactiveConfig = modeIsNonactive ? targetObject.getNonactiveObjectPrefixGroups(verbMeta) : null;
          const objectPrefixGroups = targetObject.getVerbObjectPrefixGroups(verbMeta, modeIsNonactive, nonactiveConfig);
          const objectPrefixes = Array.from(new Set(objectPrefixGroups.flatMap(group => group.prefixes)));
          const valencySummary = modeIsNonactive ? targetObject.getVerbValencySummary(verbMeta) : null;
          return {
            isNonactiveMode: modeIsNonactive,
            objectPrefixes,
            objectPrefixGroups,
            subjectSelections,
            valencySummary,
            fusionMarkers
          };
        };
        return new Map([[targetObject.COMBINED_MODE.active, buildVerbOutputContextForMode(false)], [targetObject.COMBINED_MODE.nonactive, buildVerbOutputContextForMode(true)]]);
      })();
      const resolveTenseAvailabilityRecord = (tenseValue, combinedMode = currentCombinedMode) => {
        if (!shouldComputeTenseOutput) {
          return null;
        }
        if (!hasVerb || endsWithConsonant) {
          return null;
        }
        const resolvedCombinedMode = combinedMode === targetObject.COMBINED_MODE.nonactive ? targetObject.COMBINED_MODE.nonactive : targetObject.COMBINED_MODE.active;
        if (isNominalMode) {
          return null;
        }
        if (!verbOutputContextsByMode) {
          return null;
        }
        const cacheKey = `${resolvedCombinedMode}:${tenseValue}`;
        if (tenseOutputCache.has(cacheKey)) {
          return tenseOutputCache.get(cacheKey);
        }
        const verbOutputContext = verbOutputContextsByMode.get(resolvedCombinedMode);
        if (!verbOutputContext) {
          return null;
        }
        const availabilityMemoContext = getAvailabilityMemoContextForMode(resolvedCombinedMode);
        const availabilityRecord = resolveVerbTenseAvailabilityRecord({
          tenseValue,
          verbOutputContext,
          hasVerb,
          endsWithConsonant,
          isNonactiveMode: verbOutputContext.isNonactiveMode,
          displayVerb,
          availabilityProbeMemo,
          availabilityMemoContext,
          tenseOutputCache: null
        });
        tenseOutputCache.set(cacheKey, availabilityRecord);
        return availabilityRecord;
      };
      const rerenderActiveConjugations = tenseOverride => {
        const currentVerb = targetObject.getVerbInputMeta().displayVerb;
        const payload = {
          verb: currentVerb,
          objectPrefix: targetObject.getCurrentObjectPrefix()
        };
        if (tenseOverride !== undefined) {
          payload.tense = tenseOverride;
        }
        targetObject.renderActiveConjugations(payload);
      };
      const unifiedAvailabilityMatrix = tenseMode === targetObject.TENSE_MODE.verbo ? buildUnifiedVerbTenseAvailabilityMatrix({
        tenses: [...visibleTenses, ...targetObject.PRETERITO_UNIVERSAL_ORDER],
        resolveTenseAvailabilityRecord
      }) : null;
      const selectedUniversal = selectionState.universalTenseValue;
      const shouldShowOutputControls = tenseMode === targetObject.TENSE_MODE.verbo;
      if (outputControlsContainer) {
        outputControlsContainer.hidden = !shouldShowOutputControls;
      }
      syncVerbSourceScopeControl();
      if (!shouldShowOutputControls && outputUniversalContainer) {
        outputUniversalContainer.innerHTML = "";
        outputUniversalContainer.hidden = true;
      }
      const tenseTabsSignature = targetObject.buildTenseTabsDomSignature({
        classicalLocaleContext,
        tenseMode,
        isNonactiveMode,
        sourceScope,
        activeGroup,
        selectedNonactiveSuffix,
        isNominalMode,
        shouldShowUniversalTabs,
        activeColumnTenses,
        nounNonactiveTenses,
        verbSemanticGroups,
        modeGroups,
        visibleTenseSet,
        universalOrder: targetObject.PRETERITO_UNIVERSAL_ORDER
      });
      const shouldReuseDom = tenseMode !== targetObject.TENSE_MODE.verbo && targetObject.TenseTabsDomSignature === tenseTabsSignature;
      if (shouldReuseDom) {
        const updated = targetObject.updateExistingTenseTabsDom({
          container,
          endsWithConsonant,
          resolveTenseAvailabilityRecord,
          blockedNominalTenseSet,
          isNominalMode,
          shouldShowUniversalTabs,
          availability,
          activeGroup,
          selectedTense,
          selectedUniversal,
          isClassTenseSelected,
          currentCombinedMode,
          selectionState
        });
        if (updated) {
          targetObject.restoreTenseTabsFocusState(container, focusState);
          return;
        }
      }
      container.innerHTML = "";
      const buildTenseButton = (tenseValue, {
        columnKey = "",
        combinedMode = ""
      } = {}) => {
        const button = targetObject.document.createElement("button");
        button.type = "button";
        button.className = "tense-tab";
        button.setAttribute("role", "tab");
        button.dataset.tenseValue = tenseValue;
        button.dataset.tenseGroup = "main";
        const resolvedCombinedMode = combinedMode === targetObject.COMBINED_MODE.nonactive ? targetObject.COMBINED_MODE.nonactive : combinedMode === targetObject.COMBINED_MODE.active ? targetObject.COMBINED_MODE.active : "";
        if (columnKey) {
          button.dataset.tenseColumn = columnKey;
        }
        if (resolvedCombinedMode) {
          button.dataset.combinedMode = resolvedCombinedMode;
        }
        const isActive = activeGroup === targetObject.CONJUGATION_GROUPS.tense && tenseValue === selectedTense && (!resolvedCombinedMode || resolvedCombinedMode === currentCombinedMode);
        if (isActive) {
          button.classList.add("is-active");
        }
        button.setAttribute("aria-selected", String(isActive));
        const getAvailabilityRecordForMode = mode => {
          const resolvedMode = mode === targetObject.COMBINED_MODE.nonactive ? targetObject.COMBINED_MODE.nonactive : targetObject.COMBINED_MODE.active;
          return unifiedAvailabilityMatrix instanceof Map ? unifiedAvailabilityMatrix.get(resolvedMode)?.get(tenseValue) ?? resolveTenseAvailabilityRecord(tenseValue, resolvedMode) : resolveTenseAvailabilityRecord(tenseValue, resolvedMode);
        };
        let activeRecord = null;
        let nonactiveRecord = null;
        let availabilityRecord = null;
        const hasOutput = (() => {
          if (tenseMode === targetObject.TENSE_MODE.verbo || isNominalMode) {
            activeRecord = getAvailabilityRecordForMode(targetObject.COMBINED_MODE.active);
            nonactiveRecord = getAvailabilityRecordForMode(targetObject.COMBINED_MODE.nonactive);
            if (!resolvedCombinedMode) {
              if (activeRecord === null && nonactiveRecord === null) {
                return null;
              }
              return resolveTenseAvailabilityHasOutput(activeRecord) === true || resolveTenseAvailabilityHasOutput(nonactiveRecord) === true;
            }
          }
          const modeForButton = resolvedCombinedMode || currentCombinedMode;
          availabilityRecord = getAvailabilityRecordForMode(modeForButton);
          if (modeForButton === targetObject.COMBINED_MODE.nonactive) {
            nonactiveRecord = availabilityRecord;
          } else {
            activeRecord = availabilityRecord;
          }
          return resolveTenseAvailabilityHasOutput(availabilityRecord);
        })();
        const activeOutput = resolveTenseAvailabilityHasOutput(activeRecord) === true;
        const nonactiveOutput = resolveTenseAvailabilityHasOutput(nonactiveRecord) === true;
        button.dataset.availabilityState = activeRecord?.availabilityState || nonactiveRecord?.availabilityState || availabilityRecord?.availabilityState || "";
        const isBlockedNominalTense = blockedNominalTenseSet.has(tenseValue);
        if (hasOutput === false || isBlockedNominalTense) {
          button.classList.add("is-empty");
        }
        const label = targetObject.document.createElement("span");
        label.className = "tense-tab-label";
        label.textContent = targetObject.getLocalizedLabel(targetObject.TENSE_LABELS[tenseValue], classicalLocaleContext, tenseValue);
        button.appendChild(label);
        button.title = getAndrewsFirstTenseHoverTitle(tenseValue, tenseMode);
        applyAndrewsTenseAuthorityDataset(button, {
          tenseValue,
          mode: tenseMode
        });
        const selectionAuthority = applyAndrewsTenseTabSelectionAuthorityDataset(button, {
          tenseValue,
          mode: tenseMode,
          hasOutput,
          endsWithConsonant,
          isBlockedNominalTense
        });
        if (isNominalMode) {
          setTensePresenceBadges(button, {
            active: activeOutput,
            nonactive: nonactiveOutput
          });
        }
        button.disabled = selectionAuthority.disabled;
        button.addEventListener("click", () => {
          applyAndrewsTenseTabClickAuthorityDataset(button);
          if (!isAndrewsTenseTabClickAllowed(button)) {
            return;
          }
          const currentSelectionState = targetObject.getCurrentResolvedConjugationSelectionState({
            tenseMode
          });
          const wasActive = currentSelectionState.group === targetObject.CONJUGATION_GROUPS.tense && tenseValue === currentSelectionState.tenseValue && (!resolvedCombinedMode || targetObject.getCombinedMode() === resolvedCombinedMode);
          if (resolvedCombinedMode && targetObject.getCombinedMode() !== resolvedCombinedMode) {
            targetObject.setCombinedMode(resolvedCombinedMode);
            targetObject.updateCombinedModeTabs();
          }
          targetObject.mutateConjugationSelectionState({
            tenseMode,
            group: targetObject.CONJUGATION_GROUPS.tense,
            tenseValue,
            classFilter: targetObject.PRETERITO_CLASS_TENSES.has(tenseValue) && wasActive ? null : currentSelectionState.classFilter
          }, {
            tenseMode,
            availabilityEntries: availability
          });
          const updateSelectedTense = () => {
            renderTenseTabs();
            rerenderActiveConjugations(tenseValue);
          };
          if (typeof targetObject.isThreeColumnPanelLayout === "function" && targetObject.isThreeColumnPanelLayout() && button.closest?.("#panel-stack-pane-tense")) {
            updateSelectedTense();
            return;
          }
          targetObject.preserveViewportAnchorPosition(button, updateSelectedTense);
        });
        return button;
      };
      const mainWrap = targetObject.document.createElement("div");
      mainWrap.className = "tense-tabs-main";
      mainWrap.setAttribute("role", "tablist");
      mainWrap.setAttribute("aria-label", getAndrewsFirstTenseTabsAriaLabel(tenseMode));
      const appendTenseGroups = (groups, columnEl, columnKey = "") => {
        groups.forEach(group => {
          const groupTenses = group.tenses.filter(tenseValue => visibleTenseSet.has(tenseValue));
          if (!groupTenses.length) {
            return;
          }
          const groupEl = targetObject.document.createElement("div");
          groupEl.className = "tense-tabs-group";
          if (group.heading) {
            const heading = targetObject.document.createElement("div");
            heading.className = "tense-tabs-heading";
            heading.textContent = targetObject.getLocalizedLabel(group.heading, classicalLocaleContext, "");
            const hoverTitle = getAndrewsFirstGroupHoverTitle(group);
            if (hoverTitle) {
              heading.title = hoverTitle;
            }
            groupEl.appendChild(heading);
          }
          groupTenses.forEach(tenseValue => {
            const button = buildTenseButton(tenseValue, {
              columnKey
            });
            groupEl.appendChild(button);
          });
          columnEl.appendChild(groupEl);
        });
      };
      const columns = [];
      if (isNominalMode) {
        const nominalColumn = targetObject.document.createElement("div");
        nominalColumn.className = "tense-tabs-column";
        appendTenseGroups(modeGroups.left || [], nominalColumn, "left");
        appendTenseGroups(modeGroups.right || [], nominalColumn, "right");
        columns.push(nominalColumn);
        mainWrap.classList.add("tense-tabs-main--semantic-single");
      } else if (verbSemanticGroups.length) {
        const verbColumn = targetObject.document.createElement("div");
        verbColumn.className = "tense-tabs-column";
        appendTenseGroups(verbSemanticGroups, verbColumn, "verb");
        columns.push(verbColumn);
        mainWrap.classList.add("tense-tabs-main--semantic-single");
      } else {
        const leftColumn = targetObject.document.createElement("div");
        leftColumn.className = "tense-tabs-column";
        const rightColumn = targetObject.document.createElement("div");
        rightColumn.className = "tense-tabs-column";
        appendTenseGroups(modeGroups.left, leftColumn, "left");
        appendTenseGroups(modeGroups.right, rightColumn, "right");
        columns.push(leftColumn, rightColumn);
      }
      columns.forEach(columnEl => {
        mainWrap.appendChild(columnEl);
      });
      container.appendChild(mainWrap);
      if (outputUniversalContainer) {
        outputUniversalContainer.innerHTML = "";
        outputUniversalContainer.hidden = !shouldShowOutputControls;
        outputUniversalContainer.setAttribute("role", "tablist");
        outputUniversalContainer.setAttribute("aria-label", targetObject.getLocalizedLabel({
          labelEs: getAndrewsFirstUniversalTabsAriaLabel(),
          labelEs: getAndrewsFirstUniversalTabsAriaLabel()
        }, classicalLocaleContext, getAndrewsFirstUniversalTabsAriaLabel()));
        if (shouldShowOutputControls) {
          const universalWrap = targetObject.document.createElement("div");
          universalWrap.className = "tense-tabs-universal";
          const activeUniversal = selectedUniversal;
          availability.forEach(entry => {
            const tenseValue = entry?.tenseValue || "";
            const available = resolveTenseAvailabilityIsAvailable(entry) === true;
            const button = targetObject.document.createElement("button");
            button.type = "button";
            button.className = "tense-tab";
            button.setAttribute("role", "tab");
            button.dataset.tenseValue = tenseValue;
            button.dataset.tenseGroup = "universal";
            button.dataset.tenseColumn = "universal";
            const activeRecord = unifiedAvailabilityMatrix instanceof Map ? unifiedAvailabilityMatrix.get(targetObject.COMBINED_MODE.active)?.get(tenseValue) : resolveTenseAvailabilityRecord(tenseValue, targetObject.COMBINED_MODE.active);
            const nonactiveRecord = unifiedAvailabilityMatrix instanceof Map ? unifiedAvailabilityMatrix.get(targetObject.COMBINED_MODE.nonactive)?.get(tenseValue) : resolveTenseAvailabilityRecord(tenseValue, targetObject.COMBINED_MODE.nonactive);
            button.dataset.availabilityState = entry?.availabilityState || "";
            const activeOutput = resolveTenseAvailabilityHasOutput(activeRecord) === true;
            const nonactiveOutput = resolveTenseAvailabilityHasOutput(nonactiveRecord) === true;
            const hasOutput = activeOutput || nonactiveOutput;
            if (hasOutput === false) {
              button.classList.add("is-empty");
            }
            const classKey = targetObject.PRET_UNIVERSAL_CLASS_BY_TENSE[tenseValue];
            if (activeGroup === targetObject.CONJUGATION_GROUPS.universal && tenseValue === activeUniversal && available) {
              button.classList.add("is-active");
            } else if (activeGroup === targetObject.CONJUGATION_GROUPS.tense && isClassTenseSelected && classKey && selectionState.classFilter === classKey) {
              button.classList.add("is-active");
            }
            const classDetail = targetObject.getPretUniversalClassDetail(tenseValue);
            const label = targetObject.document.createElement("span");
            label.className = "tense-tab-label";
            label.textContent = classDetail ? targetObject.getLocalizedLabel(classDetail.label, classicalLocaleContext, tenseValue) : tenseValue;
            button.appendChild(label);
            button.title = getAndrewsFirstTenseHoverTitle(tenseValue, tenseMode);
            applyAndrewsTenseAuthorityDataset(button, {
              tenseValue,
              mode: tenseMode
            });
            const selectionAuthority = applyAndrewsTenseTabSelectionAuthorityDataset(button, {
              tenseValue,
              mode: tenseMode,
              hasOutput,
              isAvailable: available,
              endsWithConsonant,
              isUniversal: true
            });
            button.setAttribute("aria-selected", String(button.classList.contains("is-active")));
            button.disabled = selectionAuthority.disabled;
            button.addEventListener("click", () => {
              applyAndrewsTenseTabClickAuthorityDataset(button);
              if (!isAndrewsTenseTabClickAllowed(button)) {
                return;
              }
              const currentSelectionState = targetObject.getCurrentResolvedConjugationSelectionState({
                tenseMode
              });
              const classSelectionActive = targetObject.PRETERITO_CLASS_TENSES.has(currentSelectionState.tenseValue);
              if (currentSelectionState.group === targetObject.CONJUGATION_GROUPS.universal && tenseValue === currentSelectionState.universalTenseValue) {
                targetObject.mutateConjugationSelectionState({
                  tenseMode,
                  group: targetObject.CONJUGATION_GROUPS.tense
                }, {
                  tenseMode,
                  availabilityEntries: availability
                });
                targetObject.preserveViewportAnchorPosition(button, () => {
                  renderTenseTabs();
                  rerenderActiveConjugations(currentSelectionState.tenseValue);
                });
                return;
              }
              if (currentSelectionState.group === targetObject.CONJUGATION_GROUPS.tense && classSelectionActive && classKey) {
                targetObject.mutateConjugationSelectionState({
                  tenseMode,
                  classFilter: currentSelectionState.classFilter === classKey ? null : classKey
                }, {
                  tenseMode,
                  availabilityEntries: availability
                });
                targetObject.preserveViewportAnchorPosition(button, () => {
                  renderTenseTabs();
                  rerenderActiveConjugations(currentSelectionState.tenseValue);
                });
                return;
              }
              targetObject.mutateConjugationSelectionState({
                tenseMode,
                group: targetObject.CONJUGATION_GROUPS.universal,
                universalTenseValue: tenseValue
              }, {
                tenseMode,
                availabilityEntries: availability
              });
              targetObject.preserveViewportAnchorPosition(button, () => {
                renderTenseTabs();
                rerenderActiveConjugations();
              });
            });
            universalWrap.appendChild(button);
          });
          outputUniversalContainer.appendChild(universalWrap);
        }
      }
      renderNonactiveTabs({
        verbMeta,
        verb,
        analysisVerb,
        hasVerb,
        endsWithConsonant
      });
      targetObject.TenseTabsDomSignature = tenseTabsSignature;
      targetObject.restoreTenseTabsFocusState(container, focusState);
      targetObject.restoreTenseTabsFocusState(outputUniversalContainer, focusState);
    }
    function mapDerivationStemsToAvailabilityTargets({
      stems = [],
      directionalPrefix = ""
    }) {
      return stems.map(stem => {
        const stemAnalysis = targetObject.stripDirectionalPrefixFromStem(stem, directionalPrefix);
        return {
          verb: stem,
          analysisVerb: stemAnalysis
        };
      });
    }
    function buildDerivationAvailabilityCoreOptions({
      verb = "",
      analysisVerb = "",
      objectPrefix = "",
      verbMeta = null
    }) {
      return {
        verb,
        analysisVerb,
        objectPrefix,
        parsedVerb: verbMeta,
        directionalPrefix: verbMeta?.directionalPrefix
      };
    }
    function buildDerivationAvailabilityTargets({
      derivationType = "",
      verb = "",
      analysisVerb = "",
      objectPrefix = "",
      verbMeta = null
    }) {
      const baseTargets = [{
        verb,
        analysisVerb
      }];
      const coreOptions = buildDerivationAvailabilityCoreOptions({
        verb,
        analysisVerb,
        objectPrefix,
        verbMeta
      });
      const forwardConfig = targetObject.getForwardDerivationConfig(derivationType);
      if (!forwardConfig) {
        return {
          availabilityTargets: baseTargets
        };
      }
      const forwardDerivation = targetObject.applySelectedForwardDerivation({
        derivationType,
        derivationOptions: coreOptions,
        enabled: true
      });
      if (forwardDerivation.blocked) {
        return {
          availabilityTargets: []
        };
      }
      const stems = targetObject.resolveDerivedStemList(forwardDerivation[forwardConfig.resultField], forwardDerivation.verb || verb);
      return {
        availabilityTargets: mapDerivationStemsToAvailabilityTargets({
          stems,
          directionalPrefix: verbMeta?.directionalPrefix
        })
      };
    }
    function buildPretUniversalTenseAvailability({
      hasVerb = false,
      availabilityTargets = [],
      isTransitive = false,
      verbMeta = null,
      derivationType = ""
    }) {
      return targetObject.PRETERITO_UNIVERSAL_ORDER.map(tenseValue => {
        if (!hasVerb) {
          return buildTenseAvailabilityRecord({
            tenseValue,
            combinedMode: targetObject.COMBINED_MODE.active,
            source: "pret-universal-class",
            available: false,
            hasOutput: false
          });
        }
        if (!availabilityTargets.length) {
          return buildTenseAvailabilityRecord({
            tenseValue,
            combinedMode: targetObject.COMBINED_MODE.active,
            source: "pret-universal-class",
            available: false,
            hasOutput: false
          });
        }
        const hasVariants = availabilityTargets.some(target => {
          const variants = targetObject.getPretUniversalVariants(target.verb, tenseValue, isTransitive, target.analysisVerb, targetObject.buildPretVariantsOptionsFromMeta(verbMeta, {
            derivationType
          }));
          return !!(variants && variants.length);
        });
        return buildTenseAvailabilityRecord({
          tenseValue,
          combinedMode: targetObject.COMBINED_MODE.active,
          source: "pret-universal-class",
          available: hasVariants,
          hasOutput: hasVariants
        });
      });
    }
    function buildAvailabilityMemoContext({
      tenseMode = "",
      isNonactiveMode = false,
      derivationType = "",
      derivationMode = "",
      voiceMode = ""
    }) {
      return [tenseMode, isNonactiveMode ? "nonactive" : "active", derivationType || "", derivationMode || "", voiceMode || ""].join("|");
    }
    function buildVerbOutputContextForTenseTabs({
      tenseMode,
      isNonactiveMode,
      verbMeta
    }) {
      if (tenseMode !== targetObject.TENSE_MODE.verbo) {
        return null;
      }
      const nonactiveConfig = isNonactiveMode ? targetObject.getNonactiveObjectPrefixGroups(verbMeta) : null;
      const objectPrefixGroups = targetObject.getVerbObjectPrefixGroups(verbMeta, isNonactiveMode, nonactiveConfig);
      const objectPrefixes = Array.from(new Set(objectPrefixGroups.flatMap(group => group.prefixes)));
      const valencySummary = isNonactiveMode ? targetObject.getVerbValencySummary(verbMeta) : null;
      const fusionMarkers = verbMeta.isTlaFusion ? (verbMeta.fusionPrefixes || []).filter(prefix => targetObject.FUSION_PREFIXES.has(prefix)) : [];
      return {
        objectPrefixes,
        objectPrefixGroups,
        subjectSelections: targetObject.getSubjectPersonSelections(),
        valencySummary,
        fusionMarkers
      };
    }
    function resolveVerbTenseAvailabilityRecord({
      tenseValue,
      verbOutputContext,
      hasVerb,
      endsWithConsonant,
      isNonactiveMode,
      displayVerb,
      availabilityProbeMemo,
      availabilityMemoContext = "",
      tenseOutputCache
    }) {
      if (!verbOutputContext || !hasVerb || endsWithConsonant) {
        return null;
      }
      if (tenseOutputCache instanceof Map && tenseOutputCache.has(tenseValue)) {
        return tenseOutputCache.get(tenseValue);
      }
      let availabilityRecord = buildTenseAvailabilityRecord({
        tenseValue,
        combinedMode: isNonactiveMode ? targetObject.COMBINED_MODE.nonactive : targetObject.COMBINED_MODE.active,
        source: isNonactiveMode ? "verb-nonactive-tense-tab" : "verb-active-tense-tab",
        available: false,
        hasOutput: false
      });
      if (isNonactiveMode) {
        const summary = verbOutputContext.valencySummary;
        if (summary) {
          availabilityRecord = resolveNonactiveVerbTenseAvailabilityRecord({
            verb: displayVerb,
            tenseValue,
            objectPrefixGroups: verbOutputContext.objectPrefixGroups,
            activeValency: summary.baseValency,
            nonactiveAvailableSlots: summary.nonactiveObjectSlots,
            hasPromotableObject: summary.baseObjectSlots > summary.fusionObjectSlots,
            fusionMarkers: verbOutputContext.fusionMarkers,
            availabilityMemo: availabilityProbeMemo,
            availabilityMemoContext
          });
        }
      } else {
        availabilityRecord = resolveActiveVerbTenseAvailabilityRecord({
          verb: displayVerb,
          tenseValue,
          objectPrefixes: verbOutputContext.objectPrefixes,
          subjectSelections: verbOutputContext.subjectSelections,
          availabilityMemo: availabilityProbeMemo,
          availabilityMemoContext
        });
      }
      if (tenseOutputCache instanceof Map) {
        tenseOutputCache.set(tenseValue, availabilityRecord);
      }
      return availabilityRecord;
    }
    function renderPretUniversalTabs() {
      renderTenseTabs();
    }

    const api = {};
    Object.defineProperty(api, "UI_DENSITY_MODE", {
        configurable: true,
        enumerable: true,
        get() { return UI_DENSITY_MODE; },
        set(value) { UI_DENSITY_MODE = value; },
    });
    Object.defineProperty(api, "NonactiveSelectionContextSignature", {
        configurable: true,
        enumerable: true,
        get() { return NonactiveSelectionContextSignature; },
        set(value) { NonactiveSelectionContextSignature = value; },
    });
    api.getObjectCategory = getObjectCategory;
    api.getObjectValenceCategory = getObjectValenceCategory;
    api.getValenceCategoryLabel = getValenceCategoryLabel;
    api.getObjectValenceLabel = getObjectValenceLabel;
    api.getObjectValenceLabelForGroup = getObjectValenceLabelForGroup;
    api.hashSignatureToUInt32 = hashSignatureToUInt32;
    api.normalizePrefixForComboPalette = normalizePrefixForComboPalette;
    api.buildBlockComboPaletteSignature = buildBlockComboPaletteSignature;
    Object.defineProperty(api, "COMBO_PALETTE_THEME_HUES", {
        configurable: true,
        enumerable: true,
        get() { return COMBO_PALETTE_THEME_HUES; },
    });
    api.getComboPaletteSwatch = getComboPaletteSwatch;
    api.applyTenseBlockComboPalette = applyTenseBlockComboPalette;
    api.applyObjectSectionCategory = applyObjectSectionCategory;
    api.applyConjugationRowClasses = applyConjugationRowClasses;
    api.renderVerbMirror = renderVerbMirror;
    api.handleVerbMirrorBeforeInput = handleVerbMirrorBeforeInput;
    api.getVerbPrefixText = getVerbPrefixText;
    api.initUiScaleControl = initUiScaleControl;
    api.normalizeUiDensityMode = normalizeUiDensityMode;
    api.getActiveUiDensityMode = getActiveUiDensityMode;
    api.getClassicalNahuatlTabAuthorityFrame = getClassicalNahuatlTabAuthorityFrame;
    api.applyClassicalNahuatlTabAuthorityDataset = applyClassicalNahuatlTabAuthorityDataset;
    api.filterTenseOrderForUiDensity = filterTenseOrderForUiDensity;
    api.getUiDensityButtons = getUiDensityButtons;
    api.getVerbSourceScopeButtons = getVerbSourceScopeButtons;
    api.syncVerbSourceScopeControl = syncVerbSourceScopeControl;
    api.applyVerbSourceScope = applyVerbSourceScope;
    api.initVerbSourceScopeControl = initVerbSourceScopeControl;
    api.captureUiDensityGrammarSnapshot = captureUiDensityGrammarSnapshot;
    api.restoreUiDensityGrammarSnapshot = restoreUiDensityGrammarSnapshot;
    api.forceDirectDerivationForSimpleMode = forceDirectDerivationForSimpleMode;
    api.forceSimpleModeGrammarDefaults = forceSimpleModeGrammarDefaults;
    api.applyUiDensityMode = applyUiDensityMode;
    api.initializeClassicalNahuatlPublicRuntime = initializeClassicalNahuatlPublicRuntime;
    api.initUiDensityControl = initUiDensityControl;
    api.initZoomFontLock = initZoomFontLock;
    api.registerEscapeOverlayHandler = registerEscapeOverlayHandler;
    api.closeEscapeManagedOverlay = closeEscapeManagedOverlay;
    api.matchesAltShortcutKey = matchesAltShortcutKey;
    api.resolveAltShortcutLegendDescription = resolveAltShortcutLegendDescription;
    api.buildKeyboardLegendEntries = buildKeyboardLegendEntries;
    api.buildKeyboardLegendSections = buildKeyboardLegendSections;
    api.renderKeyboardLegendEntries = renderKeyboardLegendEntries;
    api.resetKeyboardLegendPopoverPosition = resetKeyboardLegendPopoverPosition;
    api.positionKeyboardLegendPopover = positionKeyboardLegendPopover;
    api.initKeyboardLegendPopover = initKeyboardLegendPopover;
    api.resolveNonactiveSuffixOptionMap = resolveNonactiveSuffixOptionMap;
    api.buildNonactiveSelectionContextSignature = buildNonactiveSelectionContextSignature;
    api.normalizeSelectedNonactiveSuffix = normalizeSelectedNonactiveSuffix;
    api.renderNonactiveTabs = renderNonactiveTabs;
    api.getPanelConjugationRenderableSurface = getPanelConjugationRenderableSurface;
    api.splitPanelConjugationRenderableSurfaceText = splitPanelConjugationRenderableSurfaceText;
    api.getPanelConjugationRenderableSurfaceForms = getPanelConjugationRenderableSurfaceForms;
    api.isConjugationResultVisible = isConjugationResultVisible;
    api.buildVerbModeGenerateOverride = buildVerbModeGenerateOverride;
    api.buildTenseAvailabilityRecord = buildTenseAvailabilityRecord;
    api.resolveTenseAvailabilityHasOutput = resolveTenseAvailabilityHasOutput;
    api.resolveTenseAvailabilityIsAvailable = resolveTenseAvailabilityIsAvailable;
    api.resolveActiveVerbTenseAvailabilityRecord = resolveActiveVerbTenseAvailabilityRecord;
    api.resolveNonactiveVerbTenseAvailabilityRecord = resolveNonactiveVerbTenseAvailabilityRecord;
    api.buildUnifiedVerbTenseAvailabilityMatrix = buildUnifiedVerbTenseAvailabilityMatrix;
    api.setTensePresenceBadges = setTensePresenceBadges;
    api.getAndrewsFirstTenseTabsAriaLabel = getAndrewsFirstTenseTabsAriaLabel;
    api.getAndrewsFirstUniversalTabsAriaLabel = getAndrewsFirstUniversalTabsAriaLabel;
    Object.defineProperty(api, "ANDREWS_TENSE_AUTHORITY_BY_TENSE", {
        configurable: false,
        enumerable: true,
        get() { return ANDREWS_TENSE_AUTHORITY_BY_TENSE; },
    });
    api.cloneAndrewsTenseAuthorityFrame = cloneAndrewsTenseAuthorityFrame;
    api.normalizeAndrewsSourceTargetFormulaType = normalizeAndrewsSourceTargetFormulaType;
    api.getAndrewsSourceTargetFormulaTransition = getAndrewsSourceTargetFormulaTransition;
    api.getAndrewsSourceTargetRouteClass = getAndrewsSourceTargetRouteClass;
    api.getAndrewsSourceTargetRouteUiHost = getAndrewsSourceTargetRouteUiHost;
    api.getAndrewsTenseSourceTargetRouteSpec = getAndrewsTenseSourceTargetRouteSpec;
    api.getAndrewsTenseSourceTargetRouteAuthorityFrame = getAndrewsTenseSourceTargetRouteAuthorityFrame;
    api.getAndrewsCnvCnnOperationalLayerForTense = getAndrewsCnvCnnOperationalLayerForTense;
    api.getAndrewsCnvCnnOperationalLayerDisplayText = getAndrewsCnvCnnOperationalLayerDisplayText;
    api.syncAndrewsTenseOperationalLayerElement = syncAndrewsTenseOperationalLayerElement;
    api.syncAndrewsTenseBlockOperationalLayerElement = syncAndrewsTenseBlockOperationalLayerElement;
    api.appendAndrewsOperationalLayerOperationRows = appendAndrewsOperationalLayerOperationRows;
    api.syncAndrewsTenseTabsOperationalLayerPanel = syncAndrewsTenseTabsOperationalLayerPanel;
    api.getAndrewsTenseAuthorityFrame = getAndrewsTenseAuthorityFrame;
    api.getAndrewsTenseGenerationGateFrame = getAndrewsTenseGenerationGateFrame;
    api.getAndrewsTenseGenerationGateValue = getAndrewsTenseGenerationGateValue;
    api.isAndrewsCnvTenseGenerationGateAllowed = isAndrewsCnvTenseGenerationGateAllowed;
    api.getAndrewsTenseAuthorityElementContract = getAndrewsTenseAuthorityElementContract;
    api.getAndrewsTenseExecutorGateFrame = getAndrewsTenseExecutorGateFrame;
    api.getAndrewsTenseTabSelectionAuthorityState = getAndrewsTenseTabSelectionAuthorityState;
    api.buildAndrewsTenseTabClickAuthorityModel = buildAndrewsTenseTabClickAuthorityModel;
    api.getAndrewsTenseTabClickAuthorityState = getAndrewsTenseTabClickAuthorityState;
    api.applyAndrewsTenseTabClickAuthorityDataset = applyAndrewsTenseTabClickAuthorityDataset;
    api.isAndrewsTenseTabClickAllowed = isAndrewsTenseTabClickAllowed;
    api.buildAndrewsTenseTabSelectionAuditModel = buildAndrewsTenseTabSelectionAuditModel;
    api.getEmptyAndrewsTenseTabSelectionAuditRecord = getEmptyAndrewsTenseTabSelectionAuditRecord;
    api.getAndrewsTenseTabSelectionAuditModelTarget = getAndrewsTenseTabSelectionAuditModelTarget;
    api.applyAndrewsTenseTabSelectionAuthorityDataset = applyAndrewsTenseTabSelectionAuthorityDataset;
    api.applyAndrewsTenseAuthorityDataset = applyAndrewsTenseAuthorityDataset;
    api.getAndrewsTenseAuthorityExpectedDataset = getAndrewsTenseAuthorityExpectedDataset;
    api.getAndrewsTenseAuthorityCanonicalMismatches = getAndrewsTenseAuthorityCanonicalMismatches;
    api.getAndrewsTenseAuthorityExpectedClasses = getAndrewsTenseAuthorityExpectedClasses;
    api.getAndrewsTenseAuthorityClassMismatches = getAndrewsTenseAuthorityClassMismatches;
    api.getEmptyAndrewsTenseBlockOutputRowAuditRecord = getEmptyAndrewsTenseBlockOutputRowAuditRecord;
    api.getAndrewsTenseBlockOutputRowAuditRecord = getAndrewsTenseBlockOutputRowAuditRecord;
    api.getAndrewsTenseBlockOutputAuditRecord = getAndrewsTenseBlockOutputAuditRecord;
    api.applyAndrewsTenseBlockOutputAuditDataset = applyAndrewsTenseBlockOutputAuditDataset;
    api.getAndrewsTenseAuthorityDatasetAuditRecord = getAndrewsTenseAuthorityDatasetAuditRecord;
    api.auditAndrewsTenseAuthorityAnnotatedDom = auditAndrewsTenseAuthorityAnnotatedDom;
    api.summarizeAndrewsTenseBlockOutputAudit = summarizeAndrewsTenseBlockOutputAudit;
    api.getAndrewsTenseTabSelectionAuditRecord = getAndrewsTenseTabSelectionAuditRecord;
    api.summarizeAndrewsTenseTabSelectionAudit = summarizeAndrewsTenseTabSelectionAudit;
    api.getAndrewsTenseAuthorityDomDescriptor = getAndrewsTenseAuthorityDomDescriptor;
    api.syncAndrewsTenseAuthorityDomAudit = syncAndrewsTenseAuthorityDomAudit;
    api.getAndrewsFirstTenseHoverTitle = getAndrewsFirstTenseHoverTitle;
    api.getAndrewsFirstGroupHoverTitle = getAndrewsFirstGroupHoverTitle;
    api.buildFormalReroutedFunctionTenseGroups = buildFormalReroutedFunctionTenseGroups;
    api.renderTenseTabs = renderTenseTabs;
    api.mapDerivationStemsToAvailabilityTargets = mapDerivationStemsToAvailabilityTargets;
    api.buildDerivationAvailabilityCoreOptions = buildDerivationAvailabilityCoreOptions;
    api.buildDerivationAvailabilityTargets = buildDerivationAvailabilityTargets;
    api.buildPretUniversalTenseAvailability = buildPretUniversalTenseAvailability;
    api.buildAvailabilityMemoContext = buildAvailabilityMemoContext;
    api.buildVerbOutputContextForTenseTabs = buildVerbOutputContextForTenseTabs;
    api.resolveVerbTenseAvailabilityRecord = resolveVerbTenseAvailabilityRecord;
    api.renderPretUniversalTabs = renderPretUniversalTabs;
    [
      "cloneAndrewsTenseAuthorityFrame",
      "getAndrewsTenseAuthorityFrame",
      "getAndrewsTenseGenerationGateFrame",
      "getAndrewsTenseGenerationGateValue",
      "isAndrewsCnvTenseGenerationGateAllowed",
      "getAndrewsTenseExecutorGateFrame",
      "getAndrewsTenseTabSelectionAuthorityState",
      "buildAndrewsTenseTabClickAuthorityModel",
      "getAndrewsTenseTabClickAuthorityState",
      "applyAndrewsTenseTabClickAuthorityDataset",
      "isAndrewsTenseTabClickAllowed",
      "buildAndrewsTenseTabSelectionAuditModel",
      "applyAndrewsTenseTabSelectionAuthorityDataset",
      "applyAndrewsTenseAuthorityDataset",
      "getAndrewsTenseAuthorityExpectedDataset",
      "getAndrewsTenseAuthorityCanonicalMismatches",
      "getAndrewsTenseAuthorityExpectedClasses",
      "getAndrewsTenseAuthorityClassMismatches",
      "getAndrewsTenseAuthorityDatasetAuditRecord",
      "auditAndrewsTenseAuthorityAnnotatedDom",
      "getAndrewsTenseTabSelectionAuditRecord",
      "summarizeAndrewsTenseTabSelectionAudit",
      "getAndrewsTenseAuthorityDomDescriptor",
      "syncAndrewsTenseAuthorityDomAudit"
    ].forEach(name => {
      Object.defineProperty(api, name, {
        configurable: false,
        enumerable: true,
        writable: false,
        value: api[name]
      });
    });
    return api;
}

export function installUiPanelsGlobals(targetObject = globalThis) {
    const api = createUiPanelsContext(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
