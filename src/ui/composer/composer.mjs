// Canonical modern ESM module.

import {
  CLASSICAL_NAHUATL_VNC_DERIVATION_TYPES,
  normalizeClassicalNahuatlVncDerivationType,
  validateClassicalNahuatlVncDerivationTypeSelection,
} from "../../core/classical/vnc_derivation_evaluator.mjs?v=20260823-rhyme-coordinate-preservation-240";
import {
  GENERATION_SOURCE_TRANSITIVITY,
  GENERATION_SOURCE_TRANSITIVITY_ORDER,
  GENERATION_SOURCE_SLOT_BY_TRANSITIVITY,
  normalizeGenerationSourceTransitivity,
  validateGenerationSourceTransitivitySelection,
  validateGenerationSourceTransitivityControlInventory,
} from "../../core/generation/valency.mjs?v=20260726-lessons2-58-one-system-094";
import {
  buildClassicalResultOutputScopeSelectionFrame,
} from "../../core/output/scope.mjs?v=20260726-lessons2-58-one-system-094";

export function createUiComposerRuntime(targetObject = globalThis) {
    // === Verb Composer ===
    function getComposerSlotKeyForTransitivity(transitivity) {
      return COMPOSER_SLOT_KEY_BY_TRANSITIVITY[transitivity] || "a";
    }
    function isComposerTransitivitySelected(state = VerbComposerState) {
      return COMPOSER_TRANSITIVITY_ORDER.includes(String(state?.transitivity || ""));
    }
    function getComposerSourceTransitivityControlInventoryFrame() {
      const documentObject = typeof targetObject.document !== "undefined" ? targetObject.document : null;
      if (!documentObject || typeof documentObject.querySelectorAll !== "function") {
        return Object.freeze({
          kind: "generation-source-transitivity-control-inventory-validation-frame",
          authorizationStatus: "not-applicable",
          blockReason: "",
          structuralControlsAreNotCanvasValenceAuthority: true,
        });
      }
      const hiddenSelect = documentObject.getElementById?.("composer-transitivity") || null;
      const hiddenSelectValues = Array.from(hiddenSelect?.options || [], option => String(option?.value || "")).filter(Boolean);
      const visibleGroupValues = Array.from(documentObject.querySelectorAll(".verb-composer__slot-tabs--transitivity"), group => Array.from(group.querySelectorAll?.("[data-composer-transitivity]") || [], button => String(button.getAttribute?.("data-composer-transitivity") || "")));
      const slotShellValues = Array.from(documentObject.querySelectorAll("[data-composer-slot-shell]"), shell => String(shell.getAttribute?.("data-composer-slot-shell") || ""));
      return validateGenerationSourceTransitivityControlInventory({
        hiddenSelectValues,
        visibleGroupValues,
        slotShellValues,
      });
    }
    function getComposerSlotConfig(slotKey) {
      return COMPOSER_SLOT_CONFIG[slotKey] || COMPOSER_SLOT_CONFIG.a;
    }
    function getComposerSlotStateKeys(slotKey) {
      return getComposerSlotConfig(slotKey).state;
    }
    function syncComposerActiveStemAndEmbedFromState() {
      const activeSlot = getComposerActiveSlotFromState();
      const stateKeys = getComposerSlotStateKeys(activeSlot);
      const embedValue = normalizeComposerEmbedValue(VerbComposerState[stateKeys.embed] || "");
      VerbComposerState.embedPrefix = ComposerEmbedOpenState[activeSlot] ? embedValue : "";
    }
    function getComposerActiveSlotFromState() {
      return getComposerSlotKeyForTransitivity(VerbComposerState.transitivity);
    }
    function getComposerActiveStemValue(state = VerbComposerState) {
      const source = state && typeof state === "object" ? state : VerbComposerState;
      const slotKey = getComposerSlotKeyForTransitivity(source?.transitivity);
      const stateKeys = getComposerSlotStateKeys(slotKey);
      return normalizeComposerStem(source?.[stateKeys.stem] || "");
    }
    function setComposerActiveSlotStem(stemValue) {
      const stem = normalizeComposerStem(stemValue || "");
      const slot = getComposerActiveSlotFromState();
      const stateKeys = getComposerSlotStateKeys(slot);
      VerbComposerState[stateKeys.stem] = stem;
    }
    function getVerbComposerElements() {
      const slots = COMPOSER_SLOT_KEYS.reduce((acc, slotKey) => {
        const config = getComposerSlotConfig(slotKey);
        acc[slotKey] = {
          topRow: targetObject.document.querySelector(`[data-composer-top-row="${slotKey}"]`),
          embedField: targetObject.document.querySelector(`[data-composer-embed-field="${slotKey}"]`),
          prefixToggleButton: targetObject.document.querySelector(`[data-composer-prefix-toggle="${slotKey}"]`),
          matrixField: targetObject.document.querySelector(`[data-composer-matrix-field="${slotKey}"]`),
          serialTypeChips: targetObject.document.querySelector(`[data-composer-serial-type-chips="${slotKey}"]`),
          embedInput: targetObject.document.getElementById(config.ids.embed),
          stemInput: targetObject.document.getElementById(config.ids.stem),
          objectInput: targetObject.document.getElementById(config.ids.objectEmbed)
        };
        return acc;
      }, {});
      const slotAEmbedInput = slots.a?.embedInput || null;
      const slotAStemInput = slots.a?.stemInput || null;
      const slotAValenceLeftEmbedInput = slots.a?.objectInput || null;
      const slotBEmbedInput = slots.b?.embedInput || null;
      const slotBStemInput = slots.b?.stemInput || null;
      const slotBValenceLeftEmbedInput = slots.b?.objectInput || null;
      const slotCEmbedInput = slots.c?.embedInput || null;
      const slotCStemInput = slots.c?.stemInput || null;
      const slotCValenceLeftEmbedInput = slots.c?.objectInput || null;
      const activeSlot = getComposerActiveSlotFromState();
      const matrixStemInput = slots[activeSlot]?.stemInput || slotAStemInput || slotBStemInput || slotCStemInput;
      const embedStemInput = slots[activeSlot]?.embedInput || slotAEmbedInput || slotBEmbedInput || slotCEmbedInput;
      return {
        panel: targetObject.document.getElementById("verb-composer"),
        entryBoardTabsHost: targetObject.document.getElementById("verb-entry-board-tabs"),
        entryBoardButtons: targetObject.document.querySelectorAll("[data-composer-entry-board]"),
        slots,
        slotAEmbedInput,
        slotAStemInput,
        slotAValenceLeftEmbedInput,
        slotAStemAffixSelect: targetObject.document.getElementById("composer-stem-a-affix"),
        slotBEmbedInput,
        slotBStemInput,
        slotBValenceLeftEmbedInput,
        slotBStemAffixSelect: targetObject.document.getElementById("composer-stem-b-affix"),
        slotCEmbedInput,
        slotCStemInput,
        slotCValenceLeftEmbedInput,
        slotCStemAffixSelect: targetObject.document.getElementById("composer-stem-c-affix"),
        activeSlot,
        matrixStemInput,
        stemInput: matrixStemInput,
        transitivitySelect: targetObject.document.getElementById("composer-transitivity"),
        transitivitySlotButtons: targetObject.document.querySelectorAll("[data-composer-transitivity]"),
        valenceSelectIntransitive: targetObject.document.getElementById("composer-valence-a"),
        valenceChipsIntransitive: targetObject.document.getElementById("composer-valence-a-chips"),
        valenceIntransitiveEmbedInput: slotAValenceLeftEmbedInput,
        valenceSelect: targetObject.document.getElementById("composer-valence"),
        valenceChips: targetObject.document.getElementById("composer-valence-chips"),
        valenceEmbedPrimaryInput: slotBValenceLeftEmbedInput,
        valenceSelectSecondary: targetObject.document.getElementById("composer-valence-2"),
        valenceChipsSecondary: targetObject.document.getElementById("composer-valence-2-chips"),
        valenceEmbedSecondaryInput: slotCValenceLeftEmbedInput,
        directionalField: targetObject.document.getElementById("composer-directional-field"),
        directionalHosts: targetObject.document.querySelectorAll("[data-composer-directional-host]"),
        directionalSelect: targetObject.document.getElementById("composer-directional"),
        directionalChips: targetObject.document.getElementById("composer-directional-chips"),
        matrixStemAffixSelectBySlot: {
          a: targetObject.document.getElementById("composer-stem-a-affix"),
          b: targetObject.document.getElementById("composer-stem-b-affix"),
          c: targetObject.document.getElementById("composer-stem-c-affix")
        },
        matrixStemAffixPickerBySlot: {
          a: targetObject.document.querySelector('[data-composer-matrix-affix-picker="a"]'),
          b: targetObject.document.querySelector('[data-composer-matrix-affix-picker="b"]'),
          c: targetObject.document.querySelector('[data-composer-matrix-affix-picker="c"]')
        },
        matrixStemAffixTriggerBySlot: {
          a: targetObject.document.getElementById("composer-stem-a-affix-trigger"),
          b: targetObject.document.getElementById("composer-stem-b-affix-trigger"),
          c: targetObject.document.getElementById("composer-stem-c-affix-trigger")
        },
        matrixStemAffixTriggerValueBySlot: {
          a: targetObject.document.getElementById("composer-stem-a-affix-trigger-value"),
          b: targetObject.document.getElementById("composer-stem-b-affix-trigger-value"),
          c: targetObject.document.getElementById("composer-stem-c-affix-trigger-value")
        },
        matrixStemAffixPopoverBySlot: {
          a: targetObject.document.getElementById("composer-stem-a-affix-popover"),
          b: targetObject.document.getElementById("composer-stem-b-affix-popover"),
          c: targetObject.document.getElementById("composer-stem-c-affix-popover")
        },
        matrixStemAffixChipGroupsBySlot: {
          a: targetObject.document.querySelector('[data-composer-matrix-affix-chip-groups="a"]'),
          b: targetObject.document.querySelector('[data-composer-matrix-affix-chip-groups="b"]'),
          c: targetObject.document.querySelector('[data-composer-matrix-affix-chip-groups="c"]')
        },
        embedStemInput,
        embedInput: embedStemInput,
        clearTextboxesButton: targetObject.document.getElementById("composer-clear-textboxes"),
        supportiveICheckbox: targetObject.document.getElementById("composer-supportive-i"),
        hint: targetObject.document.getElementById("verb-composer-hint")
      };
    }
    function getVerbDisambiguationElements() {
      return {
        wrapper: targetObject.document.getElementById("verb-disambiguation"),
        label: targetObject.document.getElementById("verb-disambiguation-label"),
        options: targetObject.document.getElementById("verb-disambiguation-options")
      };
    }
    function isVerbDisambiguationEnabled() {
      return true;
    }
    function clearVerbDisambiguation() {
      targetObject.VerbDisambiguationState.suggestions = [];
      targetObject.VerbDisambiguationState.patterns = [];
      const {
        wrapper,
        options,
        label
      } = getVerbDisambiguationElements();
      if (options) {
        options.innerHTML = "";
      }
      if (label) {
        label.textContent = "";
      }
      if (wrapper) {
        wrapper.classList.add("is-empty");
      }
    }
    function renderVerbDisambiguation(payload) {
      const {
        wrapper,
        options,
        label
      } = getVerbDisambiguationElements();
      if (!wrapper || !options || !label) {
        return;
      }
      options.innerHTML = "";
      const suggestions = Array.isArray(payload?.suggestions) ? payload.suggestions : [];
      const patterns = Array.isArray(payload?.patterns) ? payload.patterns : [];
      targetObject.VerbDisambiguationState.suggestions = suggestions;
      targetObject.VerbDisambiguationState.patterns = patterns;
      if (!suggestions.length) {
        wrapper.classList.add("is-empty");
        label.textContent = "";
        return;
      }
      label.textContent = "Quisiste decir";
      suggestions.forEach(item => {
        const button = targetObject.document.createElement("button");
        button.type = "button";
        button.className = "verb-disambiguation__option";
        button.textContent = item.value;
        const titleParts = [];
        if (item.classList) {
          titleParts.push(`clases ${item.classList}`);
        }
        if (item.shapeLabels && item.shapeLabels.length) {
          titleParts.push(`descriptor ${item.shapeLabels.join(", ")}`);
        }
        if (titleParts.length) {
          button.title = titleParts.join(" · ");
        }
        button.addEventListener("click", event => {
          event.preventDefault();
          applyVerbInputReplacement(item.value);
          clearVerbDisambiguation();
        });
        options.appendChild(button);
      });
      void patterns;
      wrapper.classList.remove("is-empty");
    }
    function updateVerbDisambiguation(rawValue = null) {
      const {
        wrapper,
        options
      } = getVerbDisambiguationElements();
      if (!wrapper || !options) {
        return;
      }
      if (!isVerbDisambiguationEnabled()) {
        clearVerbDisambiguation();
        return;
      }
      const verbInput = targetObject.document.getElementById("verb");
      const value = rawValue !== null ? String(rawValue || "") : String(verbInput?.value || "");
      if (!value || targetObject.isSearchModeInput(value)) {
        clearVerbDisambiguation();
        return;
      }
      const baseValue = targetObject.getSearchInputBase(value).trim();
      if (!baseValue) {
        clearVerbDisambiguation();
        return;
      }
      const payload = targetObject.buildVerbDisambiguationCandidates(baseValue);
      renderVerbDisambiguation(payload);
    }
    function getEmptyVerbInputMeta() {
      const derivationType = targetObject.getActiveDerivationType();
      return {
        verb: "",
        analysisVerb: "",
        rawAnalysisVerb: "",
        hasCompoundMarker: false,
        hasSlashMarker: false,
        hasSuffixSeparator: false,
        hasBoundMarker: false,
        hasImpersonalTlaPrefix: false,
        hasOptionalSupportiveI: false,
        optionalSupportiveLetter: "",
        isMarkedTransitive: false,
        sourceRawVerb: "",
        directionalPrefix: "",
        directionalRuleModeProvisional: "",
        directionalRuleMode: "",
        hasSpecificValence: false,
        hasNonspecificValence: false,
        hasNonactiveSpecificValence: false,
        hasNonactiveNonspecificValence: false,
        hasConsecutiveSpecificValences: false,
        directObjectToken: "",
        indirectObjectMarker: "",
        isTlaFusion: false,
        displayVerb: "",
        exactBaseVerb: "",
        hasLeadingDash: false,
        dashCount: 0,
        valenceSlotCount: 0,
        embeddedValenceCount: 0,
        totalValenceSlotCount: 0,
        fusionPrefixes: [],
        boundPrefixes: [],
        tiCausativeClass: "",
        derivationType,
        derivationValencyDelta: targetObject.getDerivationValencyDelta(derivationType),
        rawInputVerb: "",
        screenDisplayVerb: "",
        regexInputVerb: "",
        parseInputVerb: "",
        inputMode: VERB_INPUT_MODE.composer,
        orthographyClassification: null
      };
    }
    function getParsedVerbForTab(tabId, rawValue, options = {}) {
      const derivationType = Object.values(DERIVATION_TYPE).includes(options.derivationType) ? options.derivationType : targetObject.getActiveDerivationType();
      const tiCausativeClass = targetObject.normalizeTiCausativeClass(options.tiCausativeClass || getComposerActiveTiCausativeClass() || "");
      return targetObject.buildParsedVerbForTab(tabId, rawValue, {
        ...options,
        derivationType,
        tiCausativeClass
      });
    }
    function getVerbInputMeta() {
      const verbInput = targetObject.document.getElementById("verb");
      if (!verbInput) {
        return getEmptyVerbInputMeta();
      }
      const raw = verbInput.value;
      const troncoInputSource = resolveVerbInputSource(raw);
      const derivationType = targetObject.getActiveDerivationType();
      const parsed = getParsedVerbForTab("verb-input", troncoInputSource.parseValue, {
        derivationType
      });
      const baseValue = targetObject.getSearchInputBase(troncoInputSource.parseValue);
      const parsedWithInputSource = {
        ...parsed,
        rawInputVerb: troncoInputSource.rawValue,
        screenDisplayVerb: troncoInputSource.displayValue,
        regexInputVerb: troncoInputSource.regexValue,
        parseInputVerb: troncoInputSource.parseValue,
        inputMode: troncoInputSource.mode,
        orthographyClassification: typeof targetObject.classifyOrthographyInput === "function" ? targetObject.classifyOrthographyInput(troncoInputSource.parseValue || troncoInputSource.rawValue || "") : null
      };
      if (!targetObject.isComposerTemplateOnlyBaseValue(baseValue)) {
        return parsedWithInputSource;
      }
      return {
        ...parsedWithInputSource,
        verb: "",
        analysisVerb: "",
        rawAnalysisVerb: "",
        displayVerb: "",
        exactBaseVerb: ""
      };
    }
    function isComposerFieldVisibleForSupportiveToggle(fieldEl) {
      if (!fieldEl || fieldEl.hidden) {
        return false;
      }
      if (typeof targetObject.window === "undefined" || typeof targetObject.window.getComputedStyle !== "function") {
        return true;
      }
      const style = targetObject.window.getComputedStyle(fieldEl);
      if (!style || style.display === "none" || style.visibility === "hidden") {
        return false;
      }
      if (typeof fieldEl.getClientRects !== "function") {
        return true;
      }
      return fieldEl.getClientRects().length > 0;
    }
    function resolveComposerSupportiveIToggleHost(slotKey = "", slotRefs = null) {
      const refs = slotRefs || getVerbComposerElements().slots[slotKey] || {};
      const candidates = [];
      const addCandidate = (fieldEl, canShow = true) => {
        if (!fieldEl || !canShow || !isComposerFieldVisibleForSupportiveToggle(fieldEl)) {
          return;
        }
        const rect = typeof fieldEl.getBoundingClientRect === "function" ? fieldEl.getBoundingClientRect() : {
          top: 0,
          left: 0
        };
        candidates.push({
          fieldEl,
          top: Number(rect.top) || 0,
          left: Number(rect.left) || 0
        });
      };
      const embedVisible = isComposerEmbedTextboxVisibleForSlot(slotKey, refs.embedInput || null);
      addCandidate(refs.embedField, embedVisible);
      addCandidate(refs.matrixField, true);
      if (!candidates.length) {
        return refs.matrixField || refs.embedField || null;
      }
      candidates.sort((a, b) => {
        const topDelta = a.top - b.top;
        if (Math.abs(topDelta) > 2) {
          return topDelta;
        }
        return a.left - b.left;
      });
      return candidates[0].fieldEl || null;
    }
    function stripComposerOptionalSupportiveMarker(value = "") {
      return targetObject.replaceOptionalSupportiveMarkersWithLetters(value || "");
    }
    function getComposerOrderedRootInputEntries(slotKey = "", slotRefs = null) {
      const refs = slotRefs || getVerbComposerElements().slots[slotKey] || {};
      const entries = [];
      const addEntry = (fieldEl, inputEl, canShow = true) => {
        if (!fieldEl || !inputEl || !canShow || !isComposerFieldVisibleForSupportiveToggle(fieldEl)) {
          return;
        }
        const rect = fieldEl.getBoundingClientRect();
        entries.push({
          fieldEl,
          inputEl,
          top: Number(rect.top) || 0,
          left: Number(rect.left) || 0
        });
      };
      const embedVisible = isComposerEmbedTextboxVisibleForSlot(slotKey, refs.embedInput || null);
      addEntry(refs.embedField, refs.embedInput || null, embedVisible);
      addEntry(refs.matrixField, refs.stemInput || null, true);
      entries.sort((a, b) => {
        const topDelta = a.top - b.top;
        if (Math.abs(topDelta) > 2) {
          return topDelta;
        }
        return a.left - b.left;
      });
      return entries;
    }
    function syncComposerSupportiveIInputMarkers(slots = {}, activeSlot = "") {
      void activeSlot;
      COMPOSER_SLOT_KEYS.forEach(slotKey => {
        const slotRefs = slots?.[slotKey] || {};
        if (slotRefs.embedInput) {
          slotRefs.embedInput.value = stripComposerOptionalSupportiveMarker(slotRefs.embedInput.value || "");
        }
        if (slotRefs.stemInput) {
          slotRefs.stemInput.value = stripComposerOptionalSupportiveMarker(slotRefs.stemInput.value || "");
        }
      });
      // Supportive i/y is serialized in regex (#verb) only; keep raíz textboxes unmarked/editable.
    }
    function syncComposerSupportiveITogglePlacement() {
      const {
        panel,
        slots
      } = getVerbComposerElements();
      const row = targetObject.document.getElementById("composer-supportive-i-row");
      if (!row) {
        return;
      }
      const activeSlot = getComposerActiveSlotFromState();
      const slotRefs = slots?.[activeSlot] || {};
      const host = resolveComposerSupportiveIToggleHost(activeSlot, slotRefs);
      const panelHidden = Boolean(panel && panel.classList.contains("is-hidden"));
      const showToggle = isVerbInputModeComposer() && Boolean(host) && !panelHidden;
      syncComposerSupportiveIInputMarkers(slots, activeSlot);
      if (!showToggle) {
        row.hidden = true;
        row.setAttribute("aria-hidden", "true");
        return;
      }
      if (row.parentElement !== host) {
        host.appendChild(row);
      }
      row.hidden = false;
      row.setAttribute("aria-hidden", "false");
    }
    function getComposerEmbedValueForSlot(slotKey, slotRefs = null) {
      void slotRefs;
      const stateKeys = getComposerSlotStateKeys(slotKey);
      const stateValue = normalizeComposerEmbedValue(VerbComposerState[stateKeys.embed] || "");
      return stateValue;
    }
    function syncComposerEmbedSlotUi(slotKey, slotRefs = null) {
      if (!COMPOSER_SLOT_CONFIG[slotKey]) {
        return;
      }
      const refs = slotRefs || getVerbComposerElements().slots[slotKey] || {};
      const topRow = refs.topRow || null;
      const embedField = refs.embedField || null;
      const toggleButton = refs.prefixToggleButton || null;
      const embedInput = refs.embedInput || null;
      const embedValue = getComposerEmbedValueForSlot(slotKey, refs);
      const isFilled = Boolean(embedValue);
      const isOpen = true;
      const isPreview = false;
      const isVisible = true;
      if (topRow) {
        topRow.classList.toggle("is-embed-open", isOpen);
        topRow.classList.toggle("is-embed-preview", isPreview);
        topRow.classList.toggle("is-embed-filled", isFilled);
      }
      if (embedField) {
        embedField.setAttribute("aria-hidden", "false");
      }
      if (embedInput) {
        embedInput.disabled = false;
        embedInput.tabIndex = 0;
        embedInput.setAttribute("aria-hidden", String(!isVisible));
      }
      if (toggleButton) {
        toggleButton.hidden = true;
        toggleButton.disabled = true;
        toggleButton.setAttribute("aria-hidden", "true");
        toggleButton.setAttribute("aria-expanded", "true");
        toggleButton.setAttribute("aria-pressed", "true");
      }
    }
    function syncComposerEmbedUiFromState() {
      const {
        slots
      } = getVerbComposerElements();
      COMPOSER_SLOT_KEYS.forEach(slotKey => {
        ComposerEmbedOpenState[slotKey] = true;
        ComposerEmbedPreviewState[slotKey] = false;
        syncComposerEmbedSlotUi(slotKey, slots[slotKey] || {});
      });
      syncComposerSlotChipVisibility();
    }
    function setComposerEmbedPreviewState(slotKey, isPreview) {
      if (!COMPOSER_SLOT_CONFIG[slotKey]) {
        return;
      }
      ComposerEmbedPreviewState[slotKey] = Boolean(isPreview);
      syncComposerEmbedSlotUi(slotKey);
      syncComposerSlotChipVisibility();
    }
    function toggleComposerEmbedOpen(slotKey) {
      if (!COMPOSER_SLOT_CONFIG[slotKey]) {
        return;
      }
      const {
        slots
      } = getVerbComposerElements();
      const refs = slots[slotKey] || {};
      const stateKeys = getComposerSlotStateKeys(slotKey);
      if (refs.embedInput) {
        VerbComposerState[stateKeys.embed] = normalizeComposerEmbedValue(refs.embedInput.value || "");
      }
      const currentlyOpen = Boolean(ComposerEmbedOpenState[slotKey]);
      const nextOpen = !currentlyOpen;
      ComposerEmbedOpenState[slotKey] = nextOpen;
      ComposerEmbedPreviewState[slotKey] = false;
      if (slotKey === getComposerActiveSlotFromState()) {
        VerbComposerState.embedPrefix = nextOpen ? normalizeComposerEmbedValue(VerbComposerState[stateKeys.embed] || "") : "";
        applyComposerStateToVerbInput({
          triggerGenerate: true
        });
      }
      syncComposerEmbedSlotUi(slotKey, refs);
      syncComposerSlotChipVisibility();
      scheduleComposerSlotChipVisibilitySync();
      if (nextOpen) {
        focusComposerSlotEntryTarget(refs.embedInput || getComposerPreferredEntryInput(), {
          selectAll: true
        });
      }
    }
    function isComposerRootEmbedInput(inputEl) {
      if (!inputEl || String(inputEl.tagName || "").toUpperCase() !== "INPUT") {
        return false;
      }
      const inputId = String(inputEl.id || "");
      return COMPOSER_ROOT_EMBED_INPUT_IDS.has(inputId);
    }
    function bindComposerRootEmbedReadonlyShield(inputEl) {
      if (!isComposerRootEmbedInput(inputEl)) {
        return;
      }
      if (inputEl.dataset.autofillShieldBound === "true") {
        return;
      }
      const unlock = () => {
        inputEl.removeAttribute("readonly");
      };
      const relock = () => {
        inputEl.setAttribute("readonly", "readonly");
      };
      inputEl.addEventListener("focus", unlock);
      inputEl.addEventListener("pointerdown", unlock, {
        passive: true
      });
      inputEl.addEventListener("touchstart", unlock, {
        passive: true
      });
      inputEl.addEventListener("blur", relock);
      inputEl.dataset.autofillShieldBound = "true";
      relock();
    }
    function applyNoAutofillAttributes(inputEl) {
      if (!inputEl) {
        return;
      }
      const isRootEmbedInput = isComposerRootEmbedInput(inputEl);
      const autocompleteToken = isRootEmbedInput ? "new-password" : "off";
      inputEl.autocomplete = autocompleteToken;
      inputEl.setAttribute("autocomplete", autocompleteToken);
      inputEl.setAttribute("autocorrect", "off");
      inputEl.setAttribute("autocapitalize", "none");
      inputEl.setAttribute("spellcheck", "false");
      inputEl.setAttribute("data-lpignore", "true");
      inputEl.setAttribute("data-1p-ignore", "true");
      inputEl.setAttribute("data-form-type", "other");
      if (isRootEmbedInput) {
        inputEl.setAttribute("aria-autocomplete", "none");
        inputEl.setAttribute("autofill", "off");
        inputEl.inputMode = "text";
        bindComposerRootEmbedReadonlyShield(inputEl);
      }
      if (inputEl.tagName === "INPUT") {
        const inputType = String(inputEl.type || "").toLowerCase();
        const isTextLike = inputType === "text" || inputType === "search";
        if (isTextLike) {
          const idSeed = (inputEl.id || "field").replace(/[^a-z0-9_-]/gi, "").toLowerCase() || "field";
          if (!inputEl.dataset.autofillAlias) {
            inputEl.dataset.autofillAlias = `naf-${idSeed}-${AUTOFILL_ALIAS_SALT}`;
          }
          inputEl.setAttribute("name", inputEl.dataset.autofillAlias);
        }
      }
    }
    function enforceNoAutofillOnTextboxes(root = targetObject.document) {
      if (!root || typeof root.querySelectorAll !== "function") {
        return;
      }
      const forms = root.querySelectorAll("form");
      forms.forEach(formEl => {
        formEl.setAttribute("autocomplete", "off");
      });
      const inputs = root.querySelectorAll("input[type=\"text\"], input[type=\"search\"], textarea");
      inputs.forEach(inputEl => applyNoAutofillAttributes(inputEl));
    }
    function getComposerChipOptionSignature(selectEl) {
      if (!selectEl || !selectEl.options) {
        return "";
      }
      return Array.from(selectEl.options).map(option => `${option.value}::${option.textContent}`).join("||");
    }
    function syncComposerChipGroup(container, selectEl, source = "other") {
      if (!container || !selectEl) {
        return;
      }
      const optionSignature = getComposerChipOptionSignature(selectEl);
      const previousSignature = container.dataset.optionSignature || "";
      if (optionSignature !== previousSignature) {
        container.innerHTML = "";
        const options = Array.from(selectEl.options);
        options.forEach(option => {
          const optionValue = String(option.value ?? "");
          // Hide explicit "Sin ..." chips. Pressing an active chip again clears to empty.
          if (!optionValue) {
            return;
          }
          const button = targetObject.document.createElement("button");
          button.type = "button";
          button.className = "verb-chip";
          button.dataset.chipValue = optionValue;
          button.textContent = option.textContent;
          button.addEventListener("click", () => {
            if (button.disabled) {
              return;
            }
            const currentValue = String(selectEl.value ?? "");
            selectEl.value = currentValue === optionValue ? "" : optionValue;
            onVerbComposerControlChange(source);
          });
          container.appendChild(button);
        });
        container.dataset.optionSignature = optionSignature;
      }
      const buttons = Array.from(container.querySelectorAll(".verb-chip"));
      buttons.forEach(button => {
        const value = button.dataset.chipValue ?? "";
        const option = Array.from(selectEl.options).find(item => item.value === value);
        const isDisabled = Boolean(selectEl.disabled) || Boolean(option?.disabled);
        const isActive = String(selectEl.value) === value;
        button.disabled = isDisabled;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
      });
    }
    function getComposerSecondaryInventorySelectionEntries(tokens = []) {
      const inventory = getComposerSecondaryValenceInventory();
      const normalizedTokens = (Array.isArray(tokens) ? tokens : []).map(token => normalizeComposerSecondaryValenceSurfaceToken(token)).filter(Boolean).slice(0, COMPOSER_SECONDARY_VALENCE_INVENTORY_LIMIT);
      if (!normalizedTokens.length) {
        return [];
      }
      const usedIndexes = new Set();
      const entries = [];
      normalizedTokens.forEach((token, orderIndex) => {
        const nextIndex = inventory.findIndex((candidate, poolIndex) => candidate === token && !usedIndexes.has(poolIndex));
        if (nextIndex < 0) {
          return;
        }
        usedIndexes.add(nextIndex);
        entries.push({
          token,
          index: nextIndex,
          order: orderIndex
        });
      });
      return entries;
    }
    function encodeComposerSecondaryInventoryTokens(tokens = []) {
      const normalizedTokens = (Array.isArray(tokens) ? tokens : []).map(token => normalizeComposerSecondaryValenceSurfaceToken(token)).filter(Boolean).slice(0, COMPOSER_SECONDARY_VALENCE_INVENTORY_LIMIT);
      if (!normalizedTokens.length) {
        return "";
      }
      if (normalizedTokens.length === 1) {
        return encodeComposerSecondaryValenceSelection("", normalizedTokens[0]);
      }
      return encodeComposerSecondaryValenceSelection(normalizedTokens[0], normalizedTokens[1]);
    }
    function syncComposerSecondaryValenceChipInventory(container, selectEl, source = "other") {
      if (!container || !selectEl) {
        return;
      }
      const families = COMPOSER_SECONDARY_VALENCE_FAMILY_ORDER.slice();
      const buttonSpecs = families.flatMap(family => {
        const capacity = Math.max(1, Number(COMPOSER_SECONDARY_VALENCE_INVENTORY_CAPACITY[family] || 1));
        return Array.from({
          length: capacity
        }, (_unused, ordinal) => ({
          family,
          ordinal
        }));
      });
      const inventorySignature = buttonSpecs.map(spec => `${spec.family}:${spec.ordinal}`).join("|");
      if (container.dataset.secondaryInventorySignature !== inventorySignature) {
        container.innerHTML = "";
        buttonSpecs.forEach(spec => {
          const button = targetObject.document.createElement("button");
          button.type = "button";
          button.className = "verb-chip";
          button.dataset.chipFamily = spec.family;
          button.dataset.chipOrdinal = String(spec.ordinal);
          button.textContent = spec.family;
          button.addEventListener("click", () => {
            if (button.disabled) {
              return;
            }
            const clickedFamily = String(button.dataset.chipFamily || "").trim().toLowerCase();
            const clickedOrdinal = Math.max(0, Number(button.dataset.chipOrdinal || 0));
            const currentTokens = getComposerSecondaryValenceTokens(selectEl.value);
            const familyInventory = getComposerSecondaryValenceFamilyInventoryForContext(clickedFamily, {
              state: VerbComposerState,
              scope: "secondary",
              secondaryTokens: currentTokens,
              secondaryIndex: clickedOrdinal
            });
            if (!clickedFamily || !familyInventory.length) {
              return;
            }
            const familyIndexes = currentTokens.map((token, index) => ({
              token: normalizeComposerSecondaryValenceSurfaceToken(token),
              family: getComposerValenceFamilyToken(token),
              index
            })).filter(entry => entry.family === clickedFamily);
            let nextTokens = currentTokens.map(token => normalizeComposerSecondaryValenceSurfaceToken(token)).filter(Boolean);
            const familySelection = familyIndexes[clickedOrdinal] || null;
            if (familySelection) {
              const targetIndex = familySelection.index;
              const reserved = nextTokens.filter((_token, index) => index !== targetIndex);
              const nextVariant = getComposerNextFamilySurfaceToken(clickedFamily, familySelection.token, {
                reservedTokens: reserved,
                allowClear: true,
                state: VerbComposerState,
                scope: "secondary",
                secondaryTokens: nextTokens,
                secondaryIndex: targetIndex
              });
              if (!nextVariant) {
                nextTokens = nextTokens.filter((_token, index) => index !== targetIndex);
              } else {
                nextTokens[targetIndex] = nextVariant;
              }
            } else {
              if (nextTokens.length >= COMPOSER_SECONDARY_VALENCE_INVENTORY_LIMIT || clickedOrdinal > familyIndexes.length) {
                return;
              }
              const insertionIndex = familyIndexes.length ? familyIndexes[familyIndexes.length - 1].index + 1 : Math.min(clickedOrdinal, nextTokens.length);
              const previewTokens = nextTokens.slice();
              previewTokens.splice(insertionIndex, 0, clickedFamily);
              const nextUnused = getComposerNextFamilySurfaceToken(clickedFamily, "", {
                reservedTokens: nextTokens,
                state: VerbComposerState,
                scope: "secondary",
                secondaryTokens: previewTokens,
                secondaryIndex: insertionIndex
              });
              if (!nextUnused) {
                return;
              }
              if (familyIndexes.length) {
                const lastFamilyIndex = familyIndexes[familyIndexes.length - 1].index;
                nextTokens.splice(lastFamilyIndex + 1, 0, nextUnused);
              } else {
                nextTokens.push(nextUnused);
              }
            }
            selectEl.value = encodeComposerSecondaryInventoryTokens(nextTokens);
            onVerbComposerControlChange(source);
          });
          container.appendChild(button);
        });
        container.dataset.secondaryInventorySignature = inventorySignature;
      }
      const selectedTokens = getComposerSecondaryValenceTokens(selectEl.value);
      const counts = selectedTokens.reduce((acc, token) => {
        const family = getComposerValenceFamilyToken(token);
        if (!family) {
          return acc;
        }
        acc[family] = (acc[family] || 0) + 1;
        return acc;
      }, {});
      const totalSelected = selectedTokens.length;
      const buttons = Array.from(container.querySelectorAll(".verb-chip"));
      buttons.forEach(button => {
        const family = String(button.dataset.chipFamily || "").trim().toLowerCase();
        const ordinal = Math.max(0, Number(button.dataset.chipOrdinal || 0));
        const capacity = Number(COMPOSER_SECONDARY_VALENCE_INVENTORY_CAPACITY[family] || 0);
        const tokenCount = Number(counts[family] || 0);
        const isActive = tokenCount > ordinal;
        const atTokenLimit = tokenCount >= capacity;
        const atTotalLimit = totalSelected >= COMPOSER_SECONDARY_VALENCE_INVENTORY_LIMIT;
        const canOpenThisOrdinal = ordinal <= tokenCount;
        const isDisabled = Boolean(selectEl.disabled) || !isActive && (!canOpenThisOrdinal || atTotalLimit || atTokenLimit);
        button.disabled = isDisabled;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
        const activeTokens = selectedTokens.filter(token => getComposerValenceFamilyToken(token) === family);
        button.setAttribute("aria-label", activeTokens[ordinal] ? `${family} ${ordinal + 1}. Actual ${activeTokens[ordinal]}.` : `${family} ${ordinal + 1}`);
      });
    }
    function isComposerEmbedTextboxVisibleForSlot(slotKey, embedInput = null) {
      const stateVisible = Boolean(ComposerEmbedOpenState[slotKey] || ComposerEmbedPreviewState[slotKey]);
      if (!embedInput) {
        return stateVisible;
      }
      const ariaHidden = embedInput.getAttribute("aria-hidden");
      if (ariaHidden === "true") {
        return false;
      }
      if (ariaHidden === "false") {
        return true;
      }
      return stateVisible;
    }
    function scheduleComposerSlotChipVisibilitySync() {
      if (typeof targetObject.window === "undefined" || typeof targetObject.window.requestAnimationFrame !== "function") {
        return;
      }
      targetObject.window.requestAnimationFrame(() => {
        syncComposerSlotChipVisibility();
      });
    }
    function syncComposerSlotChipVisibility() {
      const {
        matrixStemAffixSelectBySlot
      } = getVerbComposerElements();
      COMPOSER_SLOT_KEYS.forEach(slotKey => {
        const matrixContainer = matrixStemAffixSelectBySlot?.[slotKey] || null;
        if (!matrixContainer) {
          return;
        }
        matrixContainer.hidden = false;
        matrixContainer.classList.remove("is-hidden-by-slot-toggle");
        matrixContainer.setAttribute("aria-hidden", "false");
      });
    }
    function syncComposerTransitivitySlotButtons() {
      const {
        transitivitySlotButtons,
        transitivitySelect
      } = getVerbComposerElements();
      const hasSelectedTransitivity = isComposerTransitivitySelected();
      if (transitivitySelect) {
        transitivitySelect.value = hasSelectedTransitivity ? VerbComposerState.transitivity : "";
      }
      syncComposerSlotPanelVisibility();
      syncComposerEntryBoardTabsPlacement();
      syncComposerSlotTabsLabels();
      if (!transitivitySlotButtons || !transitivitySlotButtons.length) {
        return;
      }
      transitivitySlotButtons.forEach((button, index) => {
        const token = button.getAttribute("data-composer-transitivity") || "";
        const isActive = hasSelectedTransitivity && token === VerbComposerState.transitivity;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
        button.setAttribute("aria-selected", String(isActive));
        button.tabIndex = isActive || !hasSelectedTransitivity && index === 0 ? 0 : -1;
      });
    }
    function getComposerTransitivityTabsLabel() {
      return getUiCopyLabel("composer-transitivity-label", "Verbal valence");
    }
    function syncComposerSlotTabsLabel(slotTabs) {
      if (!slotTabs) {
        return;
      }
      if (!slotTabs.querySelector("[data-composer-transitivity]")) {
        return;
      }
      const labelText = getComposerTransitivityTabsLabel();
      slotTabs.setAttribute("aria-label", labelText);
      const labelEl = Array.from(slotTabs.children).find(child => child.classList && child.classList.contains("verb-composer__slot-tabs-label")) || null;
      if (labelEl) {
        labelEl.remove();
      }
    }
    function syncComposerSlotTabsLabels(root = targetObject.document) {
      if (!root || typeof root.querySelectorAll !== "function") {
        return;
      }
      Array.from(root.querySelectorAll(".verb-composer__slot-tabs")).forEach(syncComposerSlotTabsLabel);
    }
    function getComposerEntryBoardTabsLabel() {
      return getUiCopyLabel("composer-entry-board-label", "Clause type");
    }
    function syncComposerEntryBoardTabsLabel(entryBoardTabs) {
      if (!entryBoardTabs) {
        return;
      }
      const labelText = getComposerEntryBoardTabsLabel();
      entryBoardTabs.setAttribute("aria-label", labelText);
      entryBoardTabs.dataset.hasLabel = "true";
      let labelEl = Array.from(entryBoardTabs.children).find(child => child.classList && child.classList.contains("verb-entry-board-tabs-label")) || null;
      if (!labelEl) {
        labelEl = targetObject.document.createElement("span");
        labelEl.className = "verb-entry-board-tabs-label";
        labelEl.setAttribute("aria-hidden", "true");
        entryBoardTabs.insertBefore(labelEl, entryBoardTabs.firstElementChild || null);
      }
      labelEl.textContent = labelText;
    }
    function syncComposerEntryBoardTabsPlacement() {
      const stagePanel = targetObject.document.getElementById("composer-slot-stage");
      const entryBoardTabs = targetObject.document.getElementById("verb-entry-board-tabs");
      if (!stagePanel || !entryBoardTabs) {
        return;
      }
      if (entryBoardTabs.parentElement !== stagePanel || stagePanel.firstElementChild !== entryBoardTabs) {
        stagePanel.insertBefore(entryBoardTabs, stagePanel.firstElementChild || null);
      }
      syncComposerEntryBoardTabsLabel(entryBoardTabs);
    }
    function syncComposerUtilityActionsPlacement() {
      const utilityActions = targetObject.document.querySelector(".verb-block__utility-actions");
      const titleToolbar = targetObject.document.querySelector("#container-inputs .panel-block-title .verb-block__top-controls");
      if (!titleToolbar || !utilityActions) {
        return;
      }
      if (utilityActions.parentElement !== titleToolbar) {
        titleToolbar.appendChild(utilityActions);
      }
      titleToolbar.classList.remove("is-utility-replanted");
      titleToolbar.removeAttribute("aria-hidden");
    }
    function getComposerOperationBoard() {
      return getClassicalBasalUnitFromRuntime() === CLASSICAL_BASAL_UNIT.nnc
        ? "nnc"
        : getComposerEntryBoard();
    }
    function getComposerOperationOrderLabel(board = "") {
      if (board === "nnc") {
        return "Nominal clause: source -> matrix stem; result -> pers1-pers2 -> num1-num2 connector -> reference";
      }
      return "Verbal clause: board -> verbal valence -> directional -> embed -> object 1/object 2 -> matrix stem";
    }
    function getComposerMatrixFieldLabel({
      nncActive = false,
      activeBoard = ""
    } = {}) {
      if (nncActive) {
        return "Matrix stem";
      }
      void activeBoard;
      return "Matrix stem";
    }
    function getComposerMatrixInputTagLabel({
      nncActive = false,
      activeBoard = ""
    } = {}) {
      if (nncActive) {
        return "base";
      }
      void activeBoard;
      return "base";
    }
    function setComposerOperationSlotMetadata(element, slot = "", order = "") {
      if (!element) {
        return;
      }
      if (slot) {
        element.dataset.operationSlot = slot;
        element.style.order = String(order || "");
      } else {
        delete element.dataset.operationSlot;
        element.style.order = "";
      }
    }
    function syncComposerOperationSlotOrderMetadata(stagePanel = targetObject.document.getElementById("composer-slot-stage")) {
      if (!stagePanel) {
        return;
      }
      const board = getComposerOperationBoard();
      stagePanel.dataset.operationBoard = board;
      stagePanel.dataset.operationOrder = getComposerOperationOrderLabel(board);
      stagePanel.setAttribute("aria-description", stagePanel.dataset.operationOrder);
      const entryBoardTabs = targetObject.document.getElementById("verb-entry-board-tabs");
      const transitivityTabs = Array.from(stagePanel.children).find(child => child.classList && child.classList.contains("verb-composer__slot-tabs")) || null;
      const topRow = Array.from(stagePanel.children).find(child => child.classList && child.classList.contains("verb-composer__top-row")) || null;
      const bottomRow = Array.from(stagePanel.children).find(child => child.classList && child.classList.contains("verb-composer__bottom-row")) || null;
      const matrixField = topRow?.querySelector(".verb-composer__matrix-field") || null;
      const embedField = topRow?.querySelector(".verb-composer__embed-field") || null;
      const directionalHost = bottomRow?.querySelector(".verb-composer__directional-host") || null;
      const objectPair = bottomRow?.querySelector(".verb-composer__object-pair") || null;
      setComposerOperationSlotMetadata(entryBoardTabs, "entry-board", 1);
      setComposerOperationSlotMetadata(transitivityTabs, "vnc-valency-shell", 2);
      if (board === "nnc") {
        setComposerOperationSlotMetadata(matrixField, "nnc-predicate", 10);
        setComposerOperationSlotMetadata(embedField, "inactive-embed", "");
        setComposerOperationSlotMetadata(directionalHost, "inactive-directional", "");
        setComposerOperationSlotMetadata(objectPair, "inactive-object-valency", "");
        return;
      }
      setComposerOperationSlotMetadata(directionalHost, "directional-prefix", 10);
      setComposerOperationSlotMetadata(embedField, "incorporated-prefix", 20);
      setComposerOperationSlotMetadata(objectPair, "object-valency", 30);
      setComposerOperationSlotMetadata(matrixField, "predicate-core", 40);
    }
    function syncComposerSlotPanelVisibility() {
      const stagePanel = targetObject.document.getElementById("composer-slot-stage");
      const slotShells = Array.from(targetObject.document.querySelectorAll("[data-composer-slot-shell]"));
      const directionalField = targetObject.document.getElementById("composer-directional-field");
      if (!stagePanel || !slotShells.length) {
        return;
      }
      const selectedToken = isComposerTransitivitySelected() ? VerbComposerState.transitivity : "";
      const activeToken = selectedToken || COMPOSER_TRANSITIVITY.intransitive;
      const moveSlotTabsToPanelRoot = panel => {
        if (!panel) {
          return;
        }
        const directSlotTabs = Array.from(panel.children).find(child => child.classList && child.classList.contains("verb-composer__slot-tabs")) || null;
        const slotTabs = directSlotTabs || panel.querySelector(".verb-composer__slot-tabs");
        if (!slotTabs) {
          return;
        }
        if (slotTabs.parentElement !== panel || panel.firstElementChild !== slotTabs) {
          panel.insertBefore(slotTabs, panel.firstElementChild || null);
        }
        syncComposerSlotTabsLabel(slotTabs);
      };
      const moveSlotContentChildren = (fromEl, toEl) => {
        if (!fromEl || !toEl) {
          return;
        }
        Array.from(fromEl.children).forEach(child => {
          const isTopRow = child.classList?.contains("verb-composer__top-row");
          const isBottomRow = child.classList?.contains("verb-composer__bottom-row");
          const isTransitivityTabs = child.classList?.contains("verb-composer__slot-tabs");
          if (isTopRow || isBottomRow || isTransitivityTabs) {
            toEl.appendChild(child);
          }
        });
      };
      const currentToken = String(stagePanel.dataset.activeTransitivity || "");
      const currentTopRow = Array.from(stagePanel.children).find(child => child.classList?.contains("verb-composer__top-row")) || null;
      const currentSlotKey = String(currentTopRow?.getAttribute("data-composer-top-row") || "");
      const currentShell = slotShells.find(shell => (shell.getAttribute("data-composer-slot-shell") || "") === currentToken) || slotShells.find(shell => shell.id === `composer-slot-${currentSlotKey}`) || null;
      const activeShell = slotShells.find(shell => (shell.getAttribute("data-composer-slot-shell") || "") === activeToken) || null;
      if (currentShell && currentShell !== activeShell) {
        moveSlotContentChildren(stagePanel, currentShell);
      }
      if (activeShell && activeShell !== currentShell) {
        moveSlotContentChildren(activeShell, stagePanel);
      }
      if (activeShell && !stagePanel.querySelector(":scope > .verb-composer__top-row")) {
        moveSlotContentChildren(activeShell, stagePanel);
      }
      slotShells.forEach(moveSlotTabsToPanelRoot);
      moveSlotTabsToPanelRoot(stagePanel);
      syncComposerEntryBoardTabsPlacement();
      syncComposerUtilityActionsPlacement();
      slotShells.forEach(shell => {
        shell.hidden = true;
        shell.setAttribute("aria-hidden", "true");
        shell.setAttribute("aria-current", "false");
      });
      stagePanel.dataset.activeTransitivity = activeToken;
      stagePanel.setAttribute("data-slot-transitivity", selectedToken);
      stagePanel.classList.add("is-active-slot");
      stagePanel.hidden = false;
      stagePanel.setAttribute("aria-hidden", "false");
      stagePanel.setAttribute("aria-current", "true");
      stagePanel.setAttribute("aria-label", !selectedToken ? "Transitivity group not selected" : activeToken === COMPOSER_TRANSITIVITY.bitransitive ? "Bitransitive group" : activeToken === COMPOSER_TRANSITIVITY.transitive ? "Transitive group" : "Intransitive group");
      const activeDirectionalHost = stagePanel.querySelector("[data-composer-directional-host]");
      if (directionalField && activeDirectionalHost && directionalField.parentElement !== activeDirectionalHost) {
        activeDirectionalHost.appendChild(directionalField);
      }
      syncComposerOperationSlotOrderMetadata(stagePanel);
    }
    function transposeComposerSlotTextboxes(fromTransitivity, toTransitivity) {
      const sourceSlot = getComposerSlotKeyForTransitivity(fromTransitivity);
      const targetSlot = getComposerSlotKeyForTransitivity(toTransitivity);
      if (!sourceSlot || !targetSlot || sourceSlot === targetSlot) {
        return;
      }
      const {
        slots
      } = getVerbComposerElements();
      const source = slots[sourceSlot];
      const target = slots[targetSlot];
      if (!source || !target) {
        return;
      }
      if (source.embedInput && target.embedInput) {
        target.embedInput.value = source.embedInput.value;
      }
      if (source.stemInput && target.stemInput) {
        const sourceStemRawValue = source.stemInput.value || "";
        const sourceSelectedType = COMPOSER_SERIAL_SLOT_TYPE_BY_SLOT[sourceSlot] || "auto";
        const sourceEditableRoot = extractComposerSerialEditableRoot(sourceStemRawValue, sourceSelectedType);
        const shouldCarryEditableRoot = Boolean(sourceEditableRoot && isComposerFixedSerialType(sourceSelectedType));
        target.stemInput.value = shouldCarryEditableRoot ? sourceEditableRoot : getComposerCanonicalStemFromInputValue(sourceStemRawValue, sourceSlot);
      }
      if (source.objectInput && target.objectInput) {
        target.objectInput.value = source.objectInput.value;
      }
    }
    function carryComposerEmbedVisibilityAcrossTransitivity(fromTransitivity, toTransitivity) {
      const sourceSlot = getComposerSlotKeyForTransitivity(fromTransitivity);
      const targetSlot = getComposerSlotKeyForTransitivity(toTransitivity);
      if (!sourceSlot || !targetSlot || sourceSlot === targetSlot) {
        return;
      }
      const sourceEmbedVisible = Boolean(ComposerEmbedOpenState[sourceSlot] || ComposerEmbedPreviewState[sourceSlot]);
      ComposerEmbedOpenState[targetSlot] = sourceEmbedVisible;
      ComposerEmbedPreviewState[targetSlot] = false;
    }
    function syncComposerChipGroupsFromState() {
      const {
        valenceSelectIntransitive,
        valenceChipsIntransitive,
        valenceSelect,
        valenceChips,
        valenceSelectSecondary,
        valenceChipsSecondary,
        directionalSelect,
        directionalChips
      } = getVerbComposerElements();
      syncComposerTransitivitySlotButtons();
      syncComposerValenceFamilyChipGroup(valenceChipsIntransitive, valenceSelectIntransitive, getComposerAllowedValenceFamilies(COMPOSER_TRANSITIVITY.intransitive), "other");
      syncComposerValenceFamilyChipGroup(valenceChips, valenceSelect, getComposerAllowedValenceFamilies(COMPOSER_TRANSITIVITY.transitive), "other");
      syncComposerSecondaryValenceChipInventory(valenceChipsSecondary, valenceSelectSecondary, "other");
      syncComposerChipGroup(directionalChips, directionalSelect, "other");
      syncComposerSlotChipVisibility();
    }
    function getComposerMatrixRootTokensForSlot(slotKey = "") {
      const slotConfig = getComposerSlotConfig(slotKey);
      const transitivity = slotConfig?.transitivity || COMPOSER_TRANSITIVITY.intransitive;
      return COMPOSER_MATRIX_ROOT_TOKENS[transitivity] || COMPOSER_MATRIX_ROOT_TOKENS[COMPOSER_TRANSITIVITY.intransitive];
    }
    function getComposerMatrixEmbedStem(embedValue = "") {
      const embedTokens = getComposerEmbedTokens(embedValue);
      if (embedTokens.length) {
        return embedTokens[embedTokens.length - 1];
      }
      return normalizeComposerStem(embedValue);
    }
    function getComposerLastNucleusFromStem(stemValue = "") {
      const normalizedStem = normalizeComposerStem(stemValue);
      if (!normalizedStem) {
        return "";
      }
      const letters = targetObject.splitVerbLetters(normalizedStem);
      for (let i = letters.length - 1; i >= 0; i -= 1) {
        if (targetObject.isVerbLetterVowel(letters[i])) {
          return letters[i];
        }
      }
      return "";
    }
    function getComposerNiCyclePrefixVowelsFromEmbed(embedStem = "") {
      const lastNucleus = getComposerLastNucleusFromStem(embedStem);
      if (lastNucleus === "a" || lastNucleus === "i") {
        return COMPOSER_MATRIX_ROOT_NI_SHORT_VOWELS.slice();
      }
      if (lastNucleus === "e" || lastNucleus === "u") {
        return COMPOSER_MATRIX_ROOT_NI_FULL_VOWELS.slice();
      }
      return COMPOSER_MATRIX_ROOT_NI_FULL_VOWELS.slice();
    }
    function getComposerNiFamilyCycleForms(token = "", embedStem = "") {
      const normalizedToken = normalizeComposerStem(token);
      if (!COMPOSER_MATRIX_ROOT_NI_CYCLE_BASES.has(normalizedToken)) {
        return [];
      }
      const forms = [];
      const prefixVowels = getComposerNiCyclePrefixVowelsFromEmbed(embedStem);
      prefixVowels.forEach(vowel => {
        forms.push(`${vowel}${normalizedToken}`);
      });
      return Array.from(new Set(forms));
    }
    function getComposerNiFamilyStemVariant(stemValue = "") {
      const normalizedStem = normalizeComposerStem(stemValue);
      if (!normalizedStem) {
        return null;
      }
      const bases = ["nia", "ni", "na"];
      for (let i = 0; i < bases.length; i += 1) {
        const base = bases[i];
        if (normalizedStem === base) {
          return {
            base,
            prefix: ""
          };
        }
        if (normalizedStem.endsWith(base) && normalizedStem.length === base.length + 1) {
          const prefix = normalizedStem[0];
          if (COMPOSER_MATRIX_ROOT_NI_FULL_VOWELS.includes(prefix)) {
            return {
              base,
              prefix
            };
          }
        }
      }
      return null;
    }
    function getComposerMatrixTokenCycleForms({
      token = "",
      embedStem = "",
      transitivity = COMPOSER_TRANSITIVITY.intransitive
    } = {}) {
      const niForms = getComposerNiFamilyCycleForms(token, embedStem);
      if (niForms.length) {
        return niForms;
      }
      void transitivity;
      return [];
    }
    function isComposerMatrixTokenActiveForStem({
      token = "",
      stem = "",
      transitivity = COMPOSER_TRANSITIVITY.intransitive
    } = {}) {
      const normalizedToken = normalizeComposerStem(token);
      const normalizedStem = normalizeComposerStem(stem);
      if (!normalizedToken || !normalizedStem) {
        return false;
      }
      if (COMPOSER_MATRIX_ROOT_NI_CYCLE_BASES.has(normalizedToken)) {
        if (normalizedStem.endsWith(normalizedToken) && normalizedStem.length === normalizedToken.length + 1 && COMPOSER_MATRIX_ROOT_NI_FULL_VOWELS.includes(normalizedStem[0])) {
          return true;
        }
      }
      if (normalizedToken === normalizedStem) {
        return true;
      }
      if (transitivity !== COMPOSER_TRANSITIVITY.intransitive) {
        return false;
      }
      if (normalizedToken === "ya" && normalizedStem === "tiya") {
        return true;
      }
      return false;
    }
    function maybeRefreshComposerManualMatrixStemFromEmbed() {
      if (!VerbComposerState.stemManualOverride) {
        return false;
      }
      const activeSlot = getComposerActiveSlotFromState();
      const slotConfig = getComposerSlotConfig(activeSlot);
      const stateKeys = getComposerSlotStateKeys(activeSlot);
      const currentStem = normalizeComposerStem(VerbComposerState[stateKeys.stem] || "");
      const embedValue = VerbComposerState[stateKeys.embed] || "";
      const embedStem = getComposerMatrixEmbedStem(embedValue);
      void slotConfig;
      const niVariant = getComposerNiFamilyStemVariant(currentStem);
      if (!niVariant) {
        return false;
      }
      const niCycleForms = getComposerNiFamilyCycleForms(niVariant.base, embedStem);
      if (!niCycleForms.length) {
        if (!currentStem) {
          return false;
        }
        if (normalizeComposerEmbedValue(embedValue)) {
          return false;
        }
        VerbComposerState[stateKeys.stem] = "";
        return true;
      }
      if (niCycleForms.includes(currentStem)) {
        return false;
      }
      const refreshedNiStem = niCycleForms[0] || "";
      if (!refreshedNiStem || refreshedNiStem === currentStem) {
        return false;
      }
      VerbComposerState[stateKeys.stem] = refreshedNiStem;
      return true;
    }
    function resolveComposerMatrixRootTokenSelection({
      token = "",
      currentStem = "",
      embedStem = "",
      transitivity = COMPOSER_TRANSITIVITY.intransitive
    } = {}) {
      const normalizedToken = normalizeComposerStem(token);
      const normalizedCurrentStem = normalizeComposerStem(currentStem);
      if (!normalizedToken) {
        return "";
      }
      if (COMPOSER_MATRIX_ROOT_NI_CYCLE_BASES.has(normalizedToken)) {
        const niCycleForms = getComposerNiFamilyCycleForms(normalizedToken, embedStem);
        return niCycleForms[0] || "";
      }
      if (transitivity === COMPOSER_TRANSITIVITY.intransitive && normalizedToken === "ya" && COMPOSER_MATRIX_ROOT_YA_BASES.has(normalizedCurrentStem)) {
        return `${normalizedCurrentStem}ya`;
      }
      return normalizedToken;
    }
    function getComposerSerialSpecFromStem(stemValue = "") {
      const rawStem = String(stemValue || "").toLowerCase().trim();
      const normalizedStem = normalizeComposerStem(rawStem);
      if (!normalizedStem) {
        return {
          slotCount: 1,
          mask: "_",
          suffix: "",
          family: "monomorphemic",
          isPolymorphemic: false
        };
      }
      const orderedSuffixes = Object.keys(COMPOSER_SERIAL_SUFFIX_SLOT_COUNT).sort((left, right) => right.length - left.length);
      let matchedSuffix = "";
      for (let index = 0; index < orderedSuffixes.length; index += 1) {
        const suffix = orderedSuffixes[index];
        if (normalizedStem.endsWith(suffix)) {
          matchedSuffix = suffix;
          break;
        }
      }
      const slotCount = Math.max(1, Number(COMPOSER_SERIAL_SUFFIX_SLOT_COUNT[matchedSuffix] || 1));
      return {
        slotCount,
        mask: Array.from({
          length: slotCount
        }, () => "_").join("-"),
        suffix: matchedSuffix,
        family: matchedSuffix || "monomorphemic",
        isPolymorphemic: slotCount > 1
      };
    }
    function buildComposerSerialMask(slotCount = 1) {
      const count = Math.max(1, Number(slotCount || 1));
      return Array.from({
        length: count
      }, () => "_").join("-");
    }
    function getComposerSerialInputTemplate(selectedType = "auto", slotCount = 1) {
      const type = String(selectedType || "auto").toLowerCase();
      if (type === "mono") {
        return {
          pattern: "[a-z_]+",
          placeholder: "_",
          title: "Mascara serial: escribe letras a-z en el segmento."
        };
      }
      if (type === "ti-have" || type === "ti-become") {
        return {
          pattern: "[a-z_]+ti",
          placeholder: "_ti",
          title: "Mascara serial: raizti."
        };
      }
      if (type === "ta") {
        return {
          pattern: "[a-z_]+ta",
          placeholder: "_ta",
          title: "Mascara serial: raizta."
        };
      }
      if (type === "ya") {
        return {
          pattern: "[a-z_]+ya",
          placeholder: "_ya",
          title: "Mascara serial: raizya."
        };
      }
      if (type === "ua") {
        return {
          pattern: "[a-z_]+ua",
          placeholder: "_ua",
          title: "Mascara serial: raizua."
        };
      }
      const count = Math.max(1, Number(slotCount || 1));
      if (count <= 1) {
        return {
          pattern: "[a-z_]+",
          placeholder: "_",
          title: "Mascara serial: escribe letras a-z en el segmento."
        };
      }
      if (count === 2) {
        return {
          pattern: "[a-z_]+",
          placeholder: "__",
          title: "Mascara serial general: segmentos continuos."
        };
      }
      return {
        pattern: "[a-z_]+",
        placeholder: "___",
        title: "Mascara serial general: segmentos continuos."
      };
    }
    function getComposerSerialTypeOptionByValue(value = "") {
      const token = String(value || "").trim().toLowerCase();
      return COMPOSER_SERIAL_TYPE_OPTIONS.find(option => option.value === token) || null;
    }
    function getComposerMatrixAffixSpecialCatalog(slotKey = "") {
      void slotKey;
      return [];
    }
    function getComposerMatrixAffixSpecialGroups(slotKey = "") {
      void slotKey;
      return [];
    }
    function getComposerMatrixAffixSpecialEntry(slotKey = "", {
      key = "",
      value = "",
      serialType = "",
      templateSuffix = ""
    } = {}) {
      const catalog = getComposerMatrixAffixSpecialCatalog(slotKey);
      if (!catalog.length) {
        return null;
      }
      const normalizedKey = String(key || "").trim().toLowerCase();
      if (normalizedKey) {
        const keyMatch = catalog.find(entry => entry.key === normalizedKey);
        if (keyMatch) {
          return keyMatch;
        }
      }
      const normalizedSerialType = String(serialType || "").trim().toLowerCase();
      if (normalizedSerialType && normalizedSerialType !== "auto" && normalizedSerialType !== "mono") {
        const serialMatch = catalog.find(entry => entry.serialType === normalizedSerialType);
        if (serialMatch) {
          return serialMatch;
        }
      }
      const normalizedValue = String(value || "").trim().toLowerCase();
      if (normalizedValue) {
        const valueMatch = catalog.find(entry => entry.value === normalizedValue);
        if (valueMatch) {
          return valueMatch;
        }
      }
      const normalizedTemplateSuffix = normalizeComposerStem(templateSuffix);
      if (normalizedTemplateSuffix) {
        const templateMatches = catalog.filter(entry => entry.templateSuffix === normalizedTemplateSuffix && !entry.serialType);
        if (templateMatches.length === 1) {
          return templateMatches[0];
        }
      }
      return null;
    }
    function getComposerMatrixAffixStateFromEntry(entry = null) {
      if (!entry) {
        return null;
      }
      return {
        kind: entry.kind || "manual",
        key: entry.key || "manual",
        shortLabel: entry.shortLabel || "",
        detailLabel: entry.detailLabel || entry.label || "Free",
        triggerPrefix: entry.triggerPrefix || getComposerMatrixAffixTriggerPrefix(entry.kind || "manual"),
        value: entry.value || "",
        serialType: entry.serialType || "",
        templateSuffix: entry.templateSuffix || ""
      };
    }
    function getComposerSerialDisplaySpec({
      slotKey = "",
      normalizedStem = "",
      inferredSpec = null
    } = {}) {
      const stem = normalizeComposerStem(normalizedStem);
      const spec = inferredSpec || getComposerSerialSpecFromStem(stem);
      const safeSlotKey = COMPOSER_SLOT_KEYS.includes(slotKey) ? slotKey : "a";
      const selectedType = COMPOSER_SERIAL_SLOT_TYPE_BY_SLOT[safeSlotKey] || "auto";
      const selectedOption = getComposerSerialTypeOptionByValue(selectedType);
      if (selectedOption && selectedOption.value !== "auto") {
        const selectedSlotCount = Math.max(1, Number(selectedOption.slotCount || 1));
        COMPOSER_SERIAL_SLOT_PREF_BY_SLOT[safeSlotKey] = selectedSlotCount;
        return {
          slotCount: selectedSlotCount,
          mask: buildComposerSerialMask(selectedSlotCount),
          suffix: selectedOption.value,
          family: selectedOption.family || selectedOption.value,
          isPolymorphemic: selectedSlotCount > 1,
          selectedType: selectedOption.value
        };
      }
      if (spec.slotCount > 1) {
        COMPOSER_SERIAL_SLOT_PREF_BY_SLOT[safeSlotKey] = spec.slotCount;
      }
      // Auto mode should not force pre-existing serial dashes.
      // Only surface multi-slot masks when a serial stem is actually present/inferred.
      const resolvedSlotCount = spec.slotCount > 1 ? spec.slotCount : 1;
      return {
        slotCount: resolvedSlotCount,
        mask: buildComposerSerialMask(resolvedSlotCount),
        suffix: spec.suffix || "",
        family: spec.slotCount > 1 ? spec.family : resolvedSlotCount > 1 ? "serial" : spec.family,
        isPolymorphemic: resolvedSlotCount > 1,
        selectedType: "auto"
      };
    }
    function splitComposerSerialSegmentsFromStem(stemValue = "") {
      const normalizedStem = normalizeComposerStem(stemValue);
      const serialSpec = getComposerSerialSpecFromStem(normalizedStem);
      if (!normalizedStem || serialSpec.slotCount <= 1) {
        return {
          normalizedStem,
          serialSpec,
          segments: normalizedStem ? [normalizedStem] : []
        };
      }
      if (serialSpec.suffix === "ua") {
        return {
          normalizedStem,
          serialSpec,
          segments: [normalizedStem.slice(0, -2), "u", "a"]
        };
      }
      if (serialSpec.suffix === "ti") {
        return {
          normalizedStem,
          serialSpec,
          segments: [normalizedStem.slice(0, -2), "ti"]
        };
      }
      if (serialSpec.suffix === "ya") {
        return {
          normalizedStem,
          serialSpec,
          segments: [normalizedStem.slice(0, -2), "ya"]
        };
      }
      return {
        normalizedStem,
        serialSpec,
        segments: [normalizedStem]
      };
    }
    function getComposerSlotKeyByStemInput(stemInput = null) {
      if (!stemInput || !stemInput.id) {
        return "";
      }
      const inputId = String(stemInput.id || "");
      return COMPOSER_SLOT_KEYS.find(slotKey => getComposerSlotConfig(slotKey)?.ids?.stem === inputId) || "";
    }
    function getComposerSlotInputDescriptor(inputEl = null) {
      if (!inputEl || !inputEl.id) {
        return null;
      }
      const inputId = String(inputEl.id || "");
      for (const slotKey of COMPOSER_SLOT_KEYS) {
        const config = getComposerSlotConfig(slotKey);
        if (config?.ids?.stem === inputId) {
          return {
            slotKey,
            role: "stem",
            stateKey: config.state.stem
          };
        }
        if (config?.ids?.embed === inputId) {
          return {
            slotKey,
            role: "embed",
            stateKey: config.state.embed
          };
        }
        if (config?.ids?.objectEmbed === inputId) {
          return {
            slotKey,
            role: "objectEmbed",
            stateKey: config.state.objectEmbed
          };
        }
      }
      return null;
    }
    function getComposerSlotEntryRoleLabel(role = "") {
      if (role === "stem") {
        return "base";
      }
      if (role === "objectEmbed") {
        return "object embed";
      }
      return "embed";
    }
    function getComposerSerialEditableSegmentIndexes(selectedType = "auto", slotCount = 1) {
      const count = Math.max(1, Number(slotCount || 1));
      if (count <= 1) {
        return [0];
      }
      const fixed = getComposerSerialFixedSegments(selectedType, count);
      const editable = [];
      for (let index = 0; index < count; index += 1) {
        if (!fixed[index]) {
          editable.push(index);
        }
      }
      return editable.length ? editable : [0];
    }
    function resolveComposerSerialEditableSegmentIndex(selectedType = "auto", slotCount = 1, desiredIndex = 0) {
      const count = Math.max(1, Number(slotCount || 1));
      const boundedDesiredIndex = Math.max(0, Math.min(Number(desiredIndex || 0), count - 1));
      const editable = getComposerSerialEditableSegmentIndexes(selectedType, count);
      if (editable.includes(boundedDesiredIndex)) {
        return boundedDesiredIndex;
      }
      let fallback = editable[0];
      for (let index = 0; index < editable.length; index += 1) {
        const editableIndex = editable[index];
        if (editableIndex <= boundedDesiredIndex) {
          fallback = editableIndex;
          continue;
        }
        break;
      }
      return fallback;
    }
    function buildComposerSegmentsFromFixedSelectedType(stemValue = "", selectedType = "auto", slotCount = 1, options = {}) {
      const stem = normalizeComposerStem(stemValue);
      const count = Math.max(1, Number(slotCount || 1));
      if (!stem || count <= 1) {
        return null;
      }
      const fixed = getComposerSerialFixedSegments(selectedType, count);
      const editable = getComposerSerialEditableSegmentIndexes(selectedType, count);
      // Supported fixed serial families are root + fixed suffix chunks.
      if (editable.length !== 1 || editable[0] !== 0 || fixed[0]) {
        return null;
      }
      let suffix = "";
      for (let index = 1; index < count; index += 1) {
        const fixedToken = fixed[index] || "";
        if (!fixedToken) {
          return null;
        }
        suffix += fixedToken;
      }
      if (!suffix) {
        return null;
      }
      const previousEditableRoot = normalizeComposerStem(options.previousEditableRoot || "");
      let editableRoot = stem;
      if (stem.endsWith(suffix) && stem.length >= suffix.length) {
        editableRoot = stem.slice(0, -suffix.length);
      } else if (previousEditableRoot && stem.startsWith(previousEditableRoot)) {
        const typedSuffixFragment = stem.slice(previousEditableRoot.length);
        if (suffix.startsWith(typedSuffixFragment)) {
          // Preserve the previous root when the user edits inside the locked suffix.
          editableRoot = previousEditableRoot;
        }
      }
      const segments = Array.from({
        length: count
      }, () => "");
      segments[0] = editableRoot;
      for (let index = 1; index < count; index += 1) {
        segments[index] = fixed[index] || "";
      }
      return segments;
    }
    function sanitizeComposerSerialSegmentsFromRaw(rawValue = "", slotCount = 1, selectedType = "auto") {
      const count = Math.max(1, Number(slotCount || 1));
      if (count <= 1) {
        return [normalizeComposerStem(rawValue)];
      }
      const rawSegments = String(rawValue || "").toLowerCase().split("-");
      const segments = rawSegments.slice(0, count).map(segment => normalizeComposerStem(segment || ""));
      while (segments.length < count) {
        segments.push("");
      }
      const appendToEditableSegment = (value = "", desiredIndex = count - 1) => {
        const extra = normalizeComposerStem(value || "");
        if (!extra) {
          return;
        }
        const targetIndex = resolveComposerSerialEditableSegmentIndex(selectedType, count, desiredIndex);
        segments[targetIndex] = `${segments[targetIndex] || ""}${extra}`;
      };
      const fixedSegments = getComposerSerialFixedSegments(selectedType, count);
      for (let index = 0; index < count; index += 1) {
        const fixedToken = fixedSegments[index] || "";
        if (!fixedToken) {
          continue;
        }
        const segment = segments[index] || "";
        if (!segment || segment === fixedToken) {
          continue;
        }
        let extra = "";
        if (segment.startsWith(fixedToken)) {
          extra = segment.slice(fixedToken.length);
        } else {
          extra = segment;
        }
        segments[index] = fixedToken;
        appendToEditableSegment(extra, index);
      }
      const overflow = normalizeComposerStem(rawSegments.slice(count).join(""));
      appendToEditableSegment(overflow, count - 1);
      return segments;
    }
    function buildComposerLockedSerialSegmentsFromStem(normalizedStem = "", slotCount = 1, options = {}) {
      const count = Math.max(1, Number(slotCount || 1));
      const stem = normalizeComposerStem(normalizedStem);
      if (count <= 1) {
        return [stem];
      }
      if (!stem) {
        return Array.from({
          length: count
        }, () => "");
      }
      const preferSplitFromStem = options.preferSplitFromStem !== false;
      if (preferSplitFromStem) {
        const splitInfo = splitComposerSerialSegmentsFromStem(stem);
        const splitSegments = Array.isArray(splitInfo.segments) ? splitInfo.segments.map(segment => normalizeComposerStem(segment)) : [];
        const hasStructuredSplit = splitSegments.length > 1;
        if (hasStructuredSplit) {
          const normalized = splitSegments.slice(0, count);
          while (normalized.length < count) {
            normalized.push("");
          }
          return normalized;
        }
      }
      const selectedType = String(options.selectedType || "auto").toLowerCase();
      const selectedTypeSegments = buildComposerSegmentsFromFixedSelectedType(stem, selectedType, count, {
        previousEditableRoot: options.previousEditableRoot || ""
      });
      if (selectedTypeSegments) {
        return selectedTypeSegments;
      }
      const fallback = [stem];
      while (fallback.length < count) {
        fallback.push("");
      }
      return fallback.slice(0, count);
    }
    function getComposerSerialFixedSegments(selectedType = "auto", slotCount = 1) {
      const type = String(selectedType || "auto").toLowerCase();
      const count = Math.max(1, Number(slotCount || 1));
      const fixed = Array.from({
        length: count
      }, () => "");
      if ((type === "ti-have" || type === "ti-become") && count >= 2) {
        fixed[count - 1] = "ti";
        return fixed;
      }
      if (type === "ta" && count >= 2) {
        fixed[count - 1] = "ta";
        return fixed;
      }
      if (type === "ya" && count >= 2) {
        fixed[count - 1] = "ya";
        return fixed;
      }
      if (type === "ua" && count >= 3) {
        fixed[count - 2] = "u";
        fixed[count - 1] = "a";
        return fixed;
      }
      return fixed;
    }
    function applyComposerSerialFixedSegments(segments = [], selectedType = "auto", slotCount = 1) {
      const count = Math.max(1, Number(slotCount || 1));
      const normalized = Array.from({
        length: count
      }, (_unused, index) => normalizeComposerStem(Array.isArray(segments) ? segments[index] || "" : ""));
      const fixed = getComposerSerialFixedSegments(selectedType, count);
      for (let index = 0; index < count; index += 1) {
        if (fixed[index]) {
          normalized[index] = fixed[index];
        }
      }
      return normalized;
    }
    function getComposerCanonicalStemFromSerialSegments(segments = [], selectedType = "auto", slotCount = 1) {
      const count = Math.max(1, Number(slotCount || 1));
      const normalizedSegments = Array.from({
        length: count
      }, (_unused, index) => normalizeComposerStem(Array.isArray(segments) ? segments[index] || "" : ""));
      const editableIndexes = getComposerSerialEditableSegmentIndexes(selectedType, count);
      const hasEditableContent = editableIndexes.some(index => Boolean(normalizedSegments[index]));
      if (!hasEditableContent) {
        return "";
      }
      const locked = applyComposerSerialFixedSegments(normalizedSegments, selectedType, count);
      return normalizeComposerStem(locked.join(""));
    }
    function getComposerCanonicalStemFromInputValue(rawValue = "", slotKey = "a") {
      const safeSlotKey = COMPOSER_SLOT_KEYS.includes(slotKey) ? slotKey : "a";
      const selectedType = COMPOSER_SERIAL_SLOT_TYPE_BY_SLOT[safeSlotKey] || "auto";
      const stemInput = getVerbComposerElements().slots[safeSlotKey]?.stemInput || null;
      const dropdownTemplateSuffix = getComposerStemInputTemplateSuffix(stemInput, safeSlotKey);
      const normalizedStem = normalizeComposerStem(rawValue);
      if (selectedType === "auto" && dropdownTemplateSuffix) {
        return resolveComposerLockedTemplateStem(normalizedStem, dropdownTemplateSuffix, {
          slotKey: safeSlotKey,
          surfaceValue: rawValue
        }).canonicalStem;
      }
      const inferredSpec = getComposerSerialSpecFromStem(normalizedStem);
      const displaySpec = getComposerSerialDisplaySpec({
        slotKey: safeSlotKey,
        normalizedStem,
        inferredSpec
      });
      const slotCount = Math.max(1, Number(displaySpec.slotCount || 1));
      const segments = String(rawValue || "").includes("-") ? sanitizeComposerSerialSegmentsFromRaw(rawValue, slotCount, displaySpec.selectedType) : buildComposerLockedSerialSegmentsFromStem(normalizedStem, slotCount, {
        preferSplitFromStem: true,
        selectedType: displaySpec.selectedType
      });
      return getComposerCanonicalStemFromSerialSegments(segments, displaySpec.selectedType, slotCount);
    }
    function getComposerTiCausativeClassFromSerialType(selectedType = "") {
      const type = String(selectedType || "").toLowerCase();
      if (type === "ti-have" || type === "tia-have") {
        return "have";
      }
      if (type === "ti-become" || type === "tia-become") {
        return "become";
      }
      return "";
    }
    function isComposerFixedSerialType(selectedType = "") {
      const type = String(selectedType || "").toLowerCase();
      return ["ti-have", "ti-become", "ta", "ya", "ua"].includes(type);
    }
    function extractComposerSerialEditableRoot(stemValue = "", selectedType = "auto") {
      const type = String(selectedType || "auto").toLowerCase();
      if (!isComposerFixedSerialType(type)) {
        return normalizeComposerStem(stemValue);
      }
      const option = getComposerSerialTypeOptionByValue(type);
      const slotCount = Math.max(1, Number(option?.slotCount || 1));
      const rawValue = String(stemValue || "");
      const normalizedStem = normalizeComposerStem(rawValue);
      if (!normalizedStem) {
        return "";
      }
      const segments = rawValue.includes("-") ? sanitizeComposerSerialSegmentsFromRaw(rawValue, slotCount, type) : buildComposerLockedSerialSegmentsFromStem(normalizedStem, slotCount, {
        preferSplitFromStem: true,
        selectedType: type
      });
      const editableIndexes = getComposerSerialEditableSegmentIndexes(type, slotCount);
      const editableRoot = editableIndexes.map(index => normalizeComposerStem(segments[index] || "")).join("");
      return normalizeComposerStem(editableRoot);
    }
    function getComposerStemInputTemplateSuffix(stemInput = null, slotKey = "") {
      void slotKey;
      return normalizeComposerStem(stemInput?.dataset?.dropdownTemplateSuffix || "");
    }
    function extractComposerTemplateEditableRoot(stemValue = "", templateSuffix = "") {
      const suffix = normalizeComposerStem(templateSuffix);
      const normalizedStem = normalizeComposerStem(stemValue);
      if (!suffix || !normalizedStem) {
        return suffix ? "" : normalizedStem;
      }
      if (normalizedStem.endsWith(suffix) && normalizedStem.length >= suffix.length) {
        return normalizedStem.slice(0, -suffix.length);
      }
      return normalizedStem;
    }
    function resolveComposerLockedTemplateStem(stemValue = "", templateSuffix = "", options = {}) {
      const suffix = normalizeComposerStem(templateSuffix);
      const stem = normalizeComposerStem(stemValue);
      const slotKey = COMPOSER_SLOT_KEYS.includes(options.slotKey) ? options.slotKey : "a";
      if (!suffix) {
        return {
          editableRoot: stem,
          displayStem: stem,
          canonicalStem: stem,
          editableBoundary: stem.length
        };
      }
      const previousEditableRoot = normalizeComposerStem(options.previousEditableRoot || "");
      let editableRoot = stem;
      if (!stem) {
        editableRoot = "";
      } else if (stem.endsWith(suffix) && stem.length >= suffix.length) {
        editableRoot = stem.slice(0, -suffix.length);
      } else if (previousEditableRoot && stem.startsWith(previousEditableRoot)) {
        const typedSuffixFragment = stem.slice(previousEditableRoot.length);
        if (suffix.startsWith(typedSuffixFragment)) {
          editableRoot = previousEditableRoot;
        } else if (typedSuffixFragment.startsWith(suffix)) {
          editableRoot = `${previousEditableRoot}${typedSuffixFragment.slice(suffix.length)}`;
        }
      }
      const normalizedRoot = normalizeComposerStem(editableRoot);
      const canonicalStem = normalizedRoot ? `${normalizedRoot}${suffix}` : "";
      const displayStem = normalizedRoot ? canonicalStem : `_${suffix}`;
      return {
        editableRoot: normalizedRoot,
        displayStem,
        canonicalStem,
        editableBoundary: normalizedRoot ? normalizedRoot.length : 1
      };
    }
    function getComposerEditableRootForCurrentAffixState(slotKey = "", stemInput = null) {
      if (!stemInput || !COMPOSER_SLOT_CONFIG[slotKey]) {
        return "";
      }
      const selectedType = String(COMPOSER_SERIAL_SLOT_TYPE_BY_SLOT[slotKey] || "auto").trim().toLowerCase();
      const templateSuffix = getComposerStemInputTemplateSuffix(stemInput, slotKey);
      if (selectedType === "auto" && templateSuffix) {
        return extractComposerTemplateEditableRoot(stemInput.value || "", templateSuffix);
      }
      if (isComposerFixedSerialType(selectedType)) {
        return extractComposerSerialEditableRoot(stemInput.value || "", selectedType);
      }
      return normalizeComposerStem(stemInput.value || "");
    }
    function getComposerActiveTiCausativeClass() {
      if (!isVerbInputModeComposer()) {
        return "";
      }
      const activeSlot = getComposerActiveSlotFromState();
      const selectedType = COMPOSER_SERIAL_SLOT_TYPE_BY_SLOT[activeSlot] || "auto";
      return getComposerTiCausativeClassFromSerialType(selectedType);
    }
    function getComposerMaskedSerialSegments(segments = [], slotCount = 1) {
      const count = Math.max(1, Number(slotCount || 1));
      const normalizedSegments = Array.from({
        length: count
      }, (_unused, index) => normalizeComposerStem(Array.isArray(segments) ? segments[index] || "" : ""));
      return normalizedSegments.map(segment => segment || "_");
    }
    function formatComposerSerialSegmentsForTextbox(segments = [], slotCount = 1) {
      const count = Math.max(1, Number(slotCount || 1));
      return getComposerMaskedSerialSegments(segments, count).join("");
    }
    function isComposerSerialPlaceholderSegment(segment = "") {
      return /^_+$/.test(String(segment || ""));
    }
    function getComposerSerialMaskContextFromRaw(rawValue = "", slotKey = "a") {
      const safeSlotKey = COMPOSER_SLOT_KEYS.includes(slotKey) ? slotKey : "a";
      const selectedType = COMPOSER_SERIAL_SLOT_TYPE_BY_SLOT[safeSlotKey] || "auto";
      const stemInput = getVerbComposerElements().slots[safeSlotKey]?.stemInput || null;
      const dropdownTemplateSuffix = getComposerStemInputTemplateSuffix(stemInput, safeSlotKey);
      const normalizedStem = normalizeComposerStem(rawValue);
      if (selectedType === "auto" && dropdownTemplateSuffix) {
        const stateKeys = getComposerSlotStateKeys(safeSlotKey);
        const previousStem = normalizeComposerStem(VerbComposerState[stateKeys.stem] || "");
        const previousEditableRoot = extractComposerTemplateEditableRoot(previousStem, dropdownTemplateSuffix);
        const lockedTemplate = resolveComposerLockedTemplateStem(normalizedStem, dropdownTemplateSuffix, {
          previousEditableRoot,
          slotKey: safeSlotKey
        });
        return {
          slotCount: 1,
          selectedType: "template",
          isFixedType: true,
          formattedValue: lockedTemplate.displayStem,
          segmentRanges: [{
            index: 0,
            start: 0,
            end: lockedTemplate.editableBoundary,
            isEditable: true
          }, {
            index: 1,
            start: lockedTemplate.editableBoundary,
            end: lockedTemplate.displayStem.length,
            isEditable: false
          }].filter(range => range.end > range.start)
        };
      }
      const inferredSpec = getComposerSerialSpecFromStem(normalizedStem);
      const displaySpec = getComposerSerialDisplaySpec({
        slotKey: safeSlotKey,
        normalizedStem,
        inferredSpec
      });
      const slotCount = Math.max(1, Number(displaySpec.slotCount || 1));
      const segments = String(rawValue || "").includes("-") ? sanitizeComposerSerialSegmentsFromRaw(rawValue, slotCount, displaySpec.selectedType) : buildComposerLockedSerialSegmentsFromStem(normalizedStem, slotCount, {
        preferSplitFromStem: true,
        selectedType: displaySpec.selectedType
      });
      const lockedSegments = applyComposerSerialFixedSegments(segments, displaySpec.selectedType, slotCount);
      const maskedSegments = getComposerMaskedSerialSegments(lockedSegments, slotCount);
      const editableIndexes = new Set(getComposerSerialEditableSegmentIndexes(displaySpec.selectedType, slotCount));
      const segmentRanges = [];
      let cursor = 0;
      for (let index = 0; index < slotCount; index += 1) {
        const segmentText = String(maskedSegments[index] || "");
        const start = cursor;
        const end = start + segmentText.length;
        segmentRanges.push({
          index,
          start,
          end,
          isEditable: editableIndexes.has(index)
        });
        cursor = end;
      }
      return {
        slotCount,
        selectedType: displaySpec.selectedType,
        isFixedType: isComposerFixedSerialType(selectedType),
        formattedValue: maskedSegments.join(""),
        segmentRanges
      };
    }
    function isComposerPositionInEditableRange(segmentRanges = [], position = 0) {
      const pos = Number(position);
      return (Array.isArray(segmentRanges) ? segmentRanges : []).some(range => range.isEditable && pos >= range.start && pos < range.end);
    }
    function hasComposerSelectionLockedOverlap(segmentRanges = [], start = 0, end = 0) {
      const from = Math.max(0, Number(start || 0));
      const to = Math.max(from, Number(end || 0));
      return (Array.isArray(segmentRanges) ? segmentRanges : []).some(range => !range.isEditable && from < range.end && to > range.start);
    }
    function getComposerPreferredEditableBoundary(segmentRanges = [], options = {}) {
      const preferEnd = options.preferEnd !== false;
      const editableRanges = (Array.isArray(segmentRanges) ? segmentRanges : []).filter(range => range.isEditable);
      if (!editableRanges.length) {
        return 0;
      }
      const target = preferEnd ? editableRanges[editableRanges.length - 1] : editableRanges[0];
      return preferEnd ? target.end : target.start;
    }
    function findComposerNearestEditablePosition(segmentRanges = [], fromPosition = 0, direction = "backward") {
      const maxEnd = (Array.isArray(segmentRanges) ? segmentRanges : []).reduce((max, range) => Math.max(max, Number(range.end || 0)), 0);
      if (!maxEnd) {
        return -1;
      }
      const bounded = Math.max(0, Math.min(Number(fromPosition || 0), maxEnd - 1));
      if (direction === "forward") {
        for (let pos = bounded; pos < maxEnd; pos += 1) {
          if (isComposerPositionInEditableRange(segmentRanges, pos)) {
            return pos;
          }
        }
        return -1;
      }
      for (let pos = bounded; pos >= 0; pos -= 1) {
        if (isComposerPositionInEditableRange(segmentRanges, pos)) {
          return pos;
        }
      }
      return -1;
    }
    function isComposerTemplateOnlyMaskValue(context = null, rawValue = "") {
      if (!context || !context.isFixedType) {
        return false;
      }
      const value = String(rawValue || "");
      const editableRanges = (Array.isArray(context.segmentRanges) ? context.segmentRanges : []).filter(range => range.isEditable);
      if (!editableRanges.length) {
        return false;
      }
      return editableRanges.every(range => !/[a-z]/i.test(value.slice(range.start, range.end)));
    }
    function prepareComposerTemplateMaskOverwrite(event, stemInput, slotKey = "a") {
      if (!event || !stemInput) {
        return false;
      }
      let dropdownTemplateSuffix = getComposerStemInputTemplateSuffix(stemInput, slotKey);
      const key = String(event.key || "");
      const isPrintable = key.length === 1 && !event.ctrlKey && !event.metaKey;
      if (!isPrintable) {
        return false;
      }
      const value = String(stemInput.value || "");
      if (!value || typeof stemInput.setSelectionRange !== "function") {
        return false;
      }
      const context = getComposerSerialMaskContextFromRaw(value, slotKey);
      if (!isComposerTemplateOnlyMaskValue(context, value)) {
        return false;
      }
      stemInput.setSelectionRange(0, value.length);
      return false;
    }
    function enforceComposerLockedSuffixDeletion(event, stemInput, slotKey = "a") {
      if (!event || !stemInput) {
        return false;
      }
      let dropdownTemplateSuffix = getComposerStemInputTemplateSuffix(stemInput, slotKey);
      const key = String(event.key || "");
      if (key !== "Backspace" && key !== "Delete") {
        return false;
      }
      const context = getComposerSerialMaskContextFromRaw(stemInput.value || "", slotKey);
      if (!context.isFixedType) {
        return false;
      }
      const valueLength = String(stemInput.value || "").length;
      const selectionStart = typeof stemInput.selectionStart === "number" ? stemInput.selectionStart : valueLength;
      const selectionEnd = typeof stemInput.selectionEnd === "number" ? stemInput.selectionEnd : selectionStart;
      const start = Math.max(0, Math.min(selectionStart, valueLength));
      const end = Math.max(start, Math.min(selectionEnd, valueLength));
      const hasSelection = end > start;
      if (hasSelection) {
        if (!hasComposerSelectionLockedOverlap(context.segmentRanges, start, end)) {
          return false;
        }
        event.preventDefault();
        const chars = Array.from(String(stemInput.value || ""));
        for (let index = end - 1; index >= start; index -= 1) {
          if (isComposerPositionInEditableRange(context.segmentRanges, index)) {
            chars.splice(index, 1);
          }
        }
        stemInput.value = chars.join("");
        applyComposerSerialFormattingToStemInput(stemInput, {
          preserveCaret: true,
          slotKey,
          preferSplitFromStem: true
        });
        if (typeof stemInput.setSelectionRange === "function") {
          const fallbackCaret = getComposerPreferredEditableBoundary(context.segmentRanges, {
            preferEnd: true
          });
          const caret = Math.max(0, Math.min(start, String(stemInput.value || "").length, fallbackCaret));
          stemInput.setSelectionRange(caret, caret);
        }
        onVerbComposerControlChange("matrix-stem");
        return true;
      }
      const targetPosition = key === "Backspace" ? findComposerNearestEditablePosition(context.segmentRanges, start - 1, "backward") : findComposerNearestEditablePosition(context.segmentRanges, start, "forward");
      const deletePosition = key === "Backspace" ? start - 1 : start;
      const isDeletingLockedPosition = deletePosition >= 0 && !isComposerPositionInEditableRange(context.segmentRanges, deletePosition);
      if (!isDeletingLockedPosition) {
        return false;
      }
      if (isComposerTemplateOnlyMaskValue(context, stemInput.value || "")) {
        event.preventDefault();
        if (typeof stemInput.setSelectionRange === "function") {
          stemInput.setSelectionRange(0, valueLength);
        }
        return true;
      }
      event.preventDefault();
      const chars = Array.from(String(stemInput.value || ""));
      if (targetPosition >= 0 && targetPosition < chars.length) {
        chars.splice(targetPosition, 1);
      }
      stemInput.value = chars.join("");
      applyComposerSerialFormattingToStemInput(stemInput, {
        preserveCaret: true,
        slotKey,
        preferSplitFromStem: true
      });
      if (typeof stemInput.setSelectionRange === "function") {
        const preferredBoundary = getComposerPreferredEditableBoundary(context.segmentRanges, {
          preferEnd: true
        });
        const caretTarget = targetPosition >= 0 ? targetPosition : preferredBoundary;
        const caret = Math.max(0, Math.min(caretTarget, String(stemInput.value || "").length));
        stemInput.setSelectionRange(caret, caret);
      }
      onVerbComposerControlChange("matrix-stem");
      return true;
    }
    function mapComposerCaretToLockedMask(rawValue = "", formattedValue = "", caretStart = 0, slotCount = 1, selectedType = "auto", lockedSegments = []) {
      const count = Math.max(1, Number(slotCount || 1));
      const formatted = String(formattedValue || "");
      if (!formatted) {
        return 0;
      }
      if (count <= 1) {
        return Math.max(0, Math.min(Number(caretStart || 0), formatted.length));
      }
      const maskedSegments = getComposerMaskedSerialSegments(lockedSegments, count);
      const editableIndexes = getComposerSerialEditableSegmentIndexes(selectedType, count);
      const editableSet = new Set(editableIndexes);
      const totalEditableLength = editableIndexes.reduce((sum, index) => sum + String(maskedSegments[index] || "").length, 0);
      const raw = String(rawValue || "");
      const boundedRawCaret = Math.max(0, Math.min(Number(caretStart || 0), raw.length));
      const prefix = raw.slice(0, boundedRawCaret);
      let remainingEditableOffset = Math.max(0, Math.min(prefix.replace(/[^a-z_]/gi, "").length, totalEditableLength));
      let caret = 0;
      for (let index = 0; index < count; index += 1) {
        const segment = String(maskedSegments[index] || "");
        const segmentLength = segment.length;
        if (!editableSet.has(index)) {
          caret += segmentLength;
          continue;
        }
        if (remainingEditableOffset <= segmentLength) {
          caret += remainingEditableOffset;
          return Math.max(0, Math.min(caret, formatted.length));
        }
        remainingEditableOffset -= segmentLength;
        caret += segmentLength;
      }
      return Math.max(0, Math.min(caret, formatted.length));
    }
    function formatComposerStemForInputDisplay(stemValue = "", options = {}) {
      const slotKey = COMPOSER_SLOT_KEYS.includes(options.slotKey) ? options.slotKey : "a";
      const normalizedStem = normalizeComposerStem(stemValue);
      const templateSuffix = normalizeComposerStem(options.templateSuffix || "");
      if (templateSuffix) {
        return resolveComposerLockedTemplateStem(normalizedStem, templateSuffix, {
          slotKey
        }).displayStem;
      }
      const inferredSpec = getComposerSerialSpecFromStem(normalizedStem);
      const displaySpec = getComposerSerialDisplaySpec({
        slotKey,
        normalizedStem,
        inferredSpec
      });
      if (displaySpec.selectedType === "auto") {
        // In auto mode, keep manual typing literal; do not coerce to template masks like "_ya".
        return normalizedStem;
      }
      const segments = buildComposerLockedSerialSegmentsFromStem(normalizedStem, displaySpec.slotCount, {
        preferSplitFromStem: options.preferSplitFromStem !== false,
        selectedType: displaySpec.selectedType
      });
      const lockedSegments = applyComposerSerialFixedSegments(segments, displaySpec.selectedType, displaySpec.slotCount);
      return formatComposerSerialSegmentsForTextbox(lockedSegments, displaySpec.slotCount);
    }
    function applyComposerSerialFormattingToStemInput(stemInput, options = {}) {
      if (!stemInput) {
        return "";
      }
      const slotKey = COMPOSER_SLOT_KEYS.includes(options.slotKey) ? options.slotKey : getComposerSlotKeyByStemInput(stemInput) || "a";
      const stateKeys = getComposerSlotStateKeys(slotKey);
      const preserveCaret = options.preserveCaret !== false;
      const rawValue = String(stemInput.value || "");
      const caretStart = typeof stemInput.selectionStart === "number" ? stemInput.selectionStart : rawValue.length;
      const normalizedStem = normalizeComposerStem(rawValue);
      const inferredSpec = getComposerSerialSpecFromStem(normalizedStem);
      const displaySpec = getComposerSerialDisplaySpec({
        slotKey,
        normalizedStem,
        inferredSpec
      });
      let dropdownTemplateSuffix = getComposerStemInputTemplateSuffix(stemInput, slotKey);
      const previousStem = normalizeComposerStem(VerbComposerState[stateKeys.stem] || "");
      if (displaySpec.selectedType === "auto" && dropdownTemplateSuffix) {
        const previousEditableRoot = extractComposerTemplateEditableRoot(previousStem, dropdownTemplateSuffix);
        const lockedTemplate = resolveComposerLockedTemplateStem(normalizedStem, dropdownTemplateSuffix, {
          previousEditableRoot,
          slotKey
        });
        if (stemInput.value !== lockedTemplate.displayStem) {
          stemInput.value = lockedTemplate.displayStem;
          if (preserveCaret && targetObject.document.activeElement === stemInput && typeof stemInput.setSelectionRange === "function") {
            const caret = Math.max(0, Math.min(caretStart, lockedTemplate.editableBoundary));
            stemInput.setSelectionRange(caret, caret);
          }
        }
        return lockedTemplate.canonicalStem;
      }
      if (displaySpec.selectedType === "auto" && !dropdownTemplateSuffix) {
        // Auto mode should not autocorrect typed stems into serial templates.
        if (stemInput.value !== normalizedStem) {
          stemInput.value = normalizedStem;
          if (preserveCaret && targetObject.document.activeElement === stemInput && typeof stemInput.setSelectionRange === "function") {
            const caret = Math.max(0, Math.min(caretStart, normalizedStem.length));
            stemInput.setSelectionRange(caret, caret);
          }
        }
        return normalizedStem;
      }
      const previousEditableRoot = extractComposerSerialEditableRoot(previousStem, displaySpec.selectedType);
      const slotCount = Math.max(1, Number(displaySpec.slotCount || 1));
      const segments = rawValue.includes("-") ? sanitizeComposerSerialSegmentsFromRaw(rawValue, slotCount, displaySpec.selectedType) : buildComposerLockedSerialSegmentsFromStem(normalizedStem, slotCount, {
        preferSplitFromStem: options.preferSplitFromStem !== false,
        selectedType: displaySpec.selectedType,
        previousEditableRoot
      });
      const lockedSegments = applyComposerSerialFixedSegments(segments, displaySpec.selectedType, slotCount);
      const formattedStem = formatComposerSerialSegmentsForTextbox(lockedSegments, slotCount);
      const displayStem = formattedStem;
      if (stemInput.value !== displayStem) {
        stemInput.value = displayStem;
        if (preserveCaret && targetObject.document.activeElement === stemInput && typeof stemInput.setSelectionRange === "function") {
          const caret = mapComposerCaretToLockedMask(rawValue, displayStem, caretStart, slotCount, displaySpec.selectedType, lockedSegments);
          stemInput.setSelectionRange(caret, caret);
        }
      }
      return getComposerCanonicalStemFromSerialSegments(lockedSegments, displaySpec.selectedType, slotCount);
    }
    function syncComposerMatrixSerialUi() {
      const {
        slots
      } = getVerbComposerElements();
      const activeSlot = getComposerActiveSlotFromState();
      COMPOSER_SLOT_KEYS.forEach(slotKey => {
        const slotRefs = slots[slotKey] || {};
        const matrixField = slotRefs.matrixField || null;
        const stateKeys = getComposerSlotStateKeys(slotKey);
        const stemSource = slotRefs.stemInput?.value || VerbComposerState[stateKeys.stem] || "";
        const normalizedStem = slotRefs.stemInput ? applyComposerSerialFormattingToStemInput(slotRefs.stemInput, {
          preserveCaret: true,
          slotKey,
          preferSplitFromStem: true
        }) : normalizeComposerStem(stemSource);
        const inferredSpec = getComposerSerialSpecFromStem(normalizedStem);
        const serialSpec = getComposerSerialDisplaySpec({
          slotKey,
          normalizedStem,
          inferredSpec
        });
        const selectedType = COMPOSER_SERIAL_SLOT_TYPE_BY_SLOT[slotKey] || "auto";
        if (slotRefs.stemInput) {
          const serialInputTemplate = getComposerSerialInputTemplate(selectedType, serialSpec.slotCount);
          slotRefs.stemInput.dataset.serialSlots = String(serialSpec.slotCount);
          slotRefs.stemInput.dataset.serialFamily = serialSpec.family;
          slotRefs.stemInput.dataset.serialType = selectedType;
          slotRefs.stemInput.setAttribute("pattern", serialInputTemplate.pattern);
          slotRefs.stemInput.setAttribute("title", serialInputTemplate.title);
          slotRefs.stemInput.placeholder = "";
        }
        if (matrixField) {
          matrixField.dataset.serialSlots = String(serialSpec.slotCount);
          matrixField.dataset.serialFamily = serialSpec.family;
          matrixField.dataset.serialType = selectedType;
          matrixField.classList.toggle("is-serial-polymorphemic", serialSpec.isPolymorphemic);
          matrixField.classList.toggle("is-serial-monomorphemic", !serialSpec.isPolymorphemic);
          matrixField.classList.toggle("is-active-slot", slotKey === activeSlot);
        }
      });
      const containerInputs = targetObject.document.getElementById("container-inputs");
      if (!containerInputs) {
        return;
      }
      const activeStateKeys = getComposerSlotStateKeys(activeSlot);
      const activeStem = slots[activeSlot]?.stemInput?.value || VerbComposerState[activeStateKeys.stem] || "";
      const activeSpec = getComposerSerialDisplaySpec({
        slotKey: activeSlot,
        normalizedStem: activeStem
      });
      containerInputs.dataset.serialActiveSlots = String(activeSpec.slotCount);
      containerInputs.dataset.serialActiveFamily = activeSpec.family;
      containerInputs.dataset.serialActiveType = COMPOSER_SERIAL_SLOT_TYPE_BY_SLOT[activeSlot] || "auto";
    }
    function getComposerTemplateSuffixFromSerialType(selectedType = "") {
      const type = String(selectedType || "").toLowerCase();
      if (type === "ti-have" || type === "ti-become") {
        return "ti";
      }
      if (type === "tia-have" || type === "tia-become") {
        return "tia";
      }
      if (type === "ta") {
        return "ta";
      }
      if (type === "ya") {
        return "ya";
      }
      if (type === "ua") {
        return "ua";
      }
      return "";
    }
    function getComposerMatrixComboboxValueForSerialType(selectedType = "") {
      const type = String(selectedType || "").toLowerCase();
      if (type === "ti-become") {
        return "_ti1";
      }
      if (type === "ti-have") {
        return "_ti2";
      }
      if (type === "tia-become") {
        return "_tia1";
      }
      if (type === "tia-have") {
        return "_tia2";
      }
      const templateSuffix = getComposerTemplateSuffixFromSerialType(type);
      return templateSuffix ? `_${templateSuffix}` : "_";
    }
    function applyComposerSerialTypeSelection({
      slotKey = "",
      selectedType = "",
      stemInput = null,
      matrixTokens = []
    } = {}) {
      const serialOption = getComposerSerialTypeOptionByValue(selectedType);
      if (!serialOption || !COMPOSER_SLOT_KEYS.includes(slotKey)) {
        return false;
      }
      const latestStemInput = stemInput || getVerbComposerElements().slots[slotKey]?.stemInput || null;
      const preservedRoot = latestStemInput ? getComposerEditableRootForCurrentAffixState(slotKey, latestStemInput) : "";
      COMPOSER_SERIAL_SLOT_TYPE_BY_SLOT[slotKey] = selectedType;
      if (serialOption.slotCount > 0) {
        COMPOSER_SERIAL_SLOT_PREF_BY_SLOT[slotKey] = serialOption.slotCount;
      }
      if (latestStemInput) {
        delete latestStemInput.dataset.dropdownTemplateSuffix;
        latestStemInput.value = preservedRoot;
        applyComposerSerialFormattingToStemInput(latestStemInput, {
          preserveCaret: true,
          slotKey,
          preferSplitFromStem: true
        });
      }
      syncComposerMatrixSerialUi();
      syncComposerSerialTypeChips();
      onVerbComposerControlChange("matrix-stem");
      return true;
    }
    function applyComposerTemplateSuffixSelection({
      slotKey = "",
      templateSuffix = "",
      stemInput = null,
      tiCausativeClass = ""
    } = {}) {
      if (!COMPOSER_SLOT_KEYS.includes(slotKey)) {
        return false;
      }
      const normalizedSuffix = normalizeComposerStem(templateSuffix);
      if (!normalizedSuffix) {
        return false;
      }
      const latestStemInput = stemInput || getVerbComposerElements().slots[slotKey]?.stemInput || null;
      if (!latestStemInput) {
        return false;
      }
      const preservedRoot = getComposerEditableRootForCurrentAffixState(slotKey, latestStemInput);
      void tiCausativeClass;
      COMPOSER_SERIAL_SLOT_TYPE_BY_SLOT[slotKey] = "auto";
      latestStemInput.dataset.dropdownTemplateSuffix = normalizedSuffix;
      latestStemInput.value = preservedRoot;
      applyComposerSerialFormattingToStemInput(latestStemInput, {
        preserveCaret: true,
        slotKey,
        preferSplitFromStem: true
      });
      syncComposerMatrixSerialUi();
      syncComposerSerialTypeChips();
      onVerbComposerControlChange("matrix-stem");
      return true;
    }
    function focusComposerStemInputAtEditableBoundary(stemInput = null, slotKey = "") {
      void slotKey;
      return focusComposerSlotEntryTarget(stemInput || getComposerPreferredEntryInput(), {
        selectAll: false
      });
    }
    function getComposerSerialTypeChipLabel(value = "") {
      const normalizedValue = String(value || "").trim().toLowerCase();
      if (normalizedValue === "ti-have") {
        return "ti (tener)";
      }
      if (normalizedValue === "ti-become") {
        return "ti (ser)";
      }
      const option = getComposerSerialTypeOptionByValue(normalizedValue);
      return option?.label || normalizedValue;
    }
    function shouldShowComposerTiChoiceChips(slotKey = "", stemInput = null) {
      const slotConfig = getComposerSlotConfig(slotKey);
      if (slotConfig?.transitivity !== COMPOSER_TRANSITIVITY.intransitive || !stemInput) {
        return false;
      }
      const selectedType = String(COMPOSER_SERIAL_SLOT_TYPE_BY_SLOT[slotKey] || "auto").trim().toLowerCase();
      if (selectedType === "ti-have" || selectedType === "ti-become") {
        return true;
      }
      const dropdownTemplateSuffix = getComposerStemInputTemplateSuffix(stemInput, slotKey);
      if (dropdownTemplateSuffix) {
        return false;
      }
      const normalizedStem = normalizeComposerStem(String(stemInput.value || ""));
      return normalizedStem.endsWith("ti");
    }
    function syncComposerSerialTypeChips() {
      const {
        slots
      } = getVerbComposerElements();
      const isComposer = isVerbInputModeComposer();
      const activeSlot = getComposerActiveSlotFromState();
      COMPOSER_SLOT_KEYS.forEach(slotKey => {
        const slotRefs = slots[slotKey] || {};
        const chipsContainer = slotRefs.serialTypeChips || null;
        const stemInput = slotRefs.stemInput || null;
        if (!chipsContainer) {
          return;
        }
        const slotConfig = getComposerSlotConfig(slotKey);
        const supportsSerialTypeChips = slotConfig?.transitivity === COMPOSER_TRANSITIVITY.intransitive;
        const visibleOptions = supportsSerialTypeChips ? ["ti-become", "ti-have"].map(value => getComposerSerialTypeOptionByValue(value)).filter(Boolean) : [];
        const optionSignature = visibleOptions.map(option => `${option.value}:${getComposerSerialTypeChipLabel(option.value)}`).join("|");
        if ((chipsContainer.dataset.optionSignature || "") !== optionSignature) {
          chipsContainer.innerHTML = "";
          visibleOptions.forEach(option => {
            const button = targetObject.document.createElement("button");
            button.type = "button";
            button.className = "verb-chip";
            button.dataset.serialType = option.value;
            button.dataset.serialSlot = slotKey;
            button.textContent = getComposerSerialTypeChipLabel(option.value);
            button.title = option.label;
            button.addEventListener("click", () => {
              if (button.disabled) {
                return;
              }
              const currentType = String(COMPOSER_SERIAL_SLOT_TYPE_BY_SLOT[slotKey] || "auto").trim().toLowerCase();
              if (currentType === option.value) {
                clearComposerMatrixAffixSelection(slotKey, getVerbComposerElements().slots[slotKey]?.stemInput || null);
                return;
              }
              applyComposerSerialTypeSelection({
                slotKey,
                selectedType: option.value,
                stemInput: getVerbComposerElements().slots[slotKey]?.stemInput || null,
                matrixTokens: getComposerMatrixRootTokensForSlot(slotKey)
              });
            });
            chipsContainer.appendChild(button);
          });
          chipsContainer.dataset.optionSignature = optionSignature;
        }
        const shouldShow = isComposer && supportsSerialTypeChips && slotKey === activeSlot && shouldShowComposerTiChoiceChips(slotKey, stemInput);
        chipsContainer.hidden = !shouldShow;
        chipsContainer.setAttribute("aria-hidden", String(!shouldShow));
        const selectedType = COMPOSER_SERIAL_SLOT_TYPE_BY_SLOT[slotKey] || "auto";
        const buttons = Array.from(chipsContainer.querySelectorAll(".verb-chip"));
        const isDisabled = !shouldShow;
        buttons.forEach(button => {
          const value = button.dataset.serialType || "";
          const isActive = value === selectedType;
          button.disabled = isDisabled;
          button.setAttribute("aria-disabled", String(isDisabled));
          button.classList.toggle("is-active", isActive);
          button.setAttribute("aria-pressed", String(isActive));
        });
      });
    }
    function getComposerMatrixComboboxOptionMatch(slotKey = "", rawValue = "") {
      if (!COMPOSER_SLOT_CONFIG[slotKey]) {
        return null;
      }
      const typedValue = String(rawValue || "").trim().toLowerCase();
      if (!typedValue) {
        return null;
      }
      const {
        matrixStemAffixSelectBySlot
      } = getVerbComposerElements();
      const optionList = matrixStemAffixSelectBySlot?.[slotKey] || null;
      if (!optionList || !optionList.options) {
        return null;
      }
      const option = Array.from(optionList.options).find(candidate => String(candidate.value || "").trim().toLowerCase() === typedValue);
      if (!option) {
        return null;
      }
      const templateSuffix = normalizeComposerStem(option.dataset.templateSuffix || String(option.value || "").replace(/^_+/, ""));
      const serialType = String(option.dataset.serialType || "").trim().toLowerCase();
      return {
        value: String(option.value || ""),
        templateSuffix,
        serialType
      };
    }
    function shouldHandleComposerMatrixComboboxSelection(event = null, stemInput = null) {
      if (!stemInput || String(stemInput.tagName || "").toUpperCase() !== "INPUT") {
        return false;
      }
      const listId = String(stemInput.getAttribute("list") || "").trim();
      if (!listId) {
        return false;
      }
      const currentValue = String(stemInput.value || "").trim();
      if (!currentValue || !currentValue.startsWith("_")) {
        return false;
      }
      if (!event) {
        return true;
      }
      const eventType = String(event.type || "").toLowerCase();
      if (eventType === "change") {
        return true;
      }
      if (eventType !== "input") {
        return false;
      }
      const inputType = String(event.inputType || "");
      if (inputType === "insertReplacementText") {
        return true;
      }
      // Fallback for engines that do not report inputType for datalist selection.
      if (!inputType && event.isTrusted) {
        return true;
      }
      return false;
    }
    function applyComposerMatrixComboboxMatch(slotKey = "", stemInput = null, match = null) {
      if (!stemInput || !COMPOSER_SLOT_CONFIG[slotKey] || !match) {
        return false;
      }
      if (match.serialType && match.serialType !== "auto") {
        return applyComposerSerialTypeSelection({
          slotKey,
          selectedType: match.serialType,
          stemInput,
          matrixTokens: getComposerMatrixRootTokensForSlot(slotKey)
        });
      }
      return applyComposerTemplateSuffixSelection({
        slotKey,
        templateSuffix: match.templateSuffix,
        stemInput
      });
    }
    function handleComposerMatrixComboboxSelection(slotKey = "", stemInput = null) {
      if (!stemInput || !COMPOSER_SLOT_CONFIG[slotKey]) {
        return false;
      }
      const match = getComposerMatrixComboboxOptionMatch(slotKey, stemInput.value || "");
      if (!match) {
        return false;
      }
      return applyComposerMatrixComboboxMatch(slotKey, stemInput, match);
    }
    function handleComposerMatrixAffixDropdownSelection(slotKey = "", optionList = null, stemInput = null) {
      if (!optionList || !stemInput || !COMPOSER_SLOT_CONFIG[slotKey]) {
        return false;
      }
      const selectedValue = String(optionList.value || "").trim();
      if (!selectedValue) {
        return false;
      }
      const match = getComposerMatrixComboboxOptionMatch(slotKey, selectedValue);
      optionList.value = "";
      if (!match) {
        return false;
      }
      return applyComposerMatrixComboboxMatch(slotKey, stemInput, match);
    }
    function getComposerMatrixAffixSerialLabel(serialType = "", {
      short = false
    } = {}) {
      const type = String(serialType || "").trim().toLowerCase();
      if (!type || type === "auto" || type === "mono") {
        return short ? "" : "Free";
      }
      if (type === "ti-have") {
        return short ? "-ti tener" : "-ti (tener)";
      }
      if (type === "ti-become") {
        return short ? "-ti ser" : "-ti (ser)";
      }
      if (type === "tia-have") {
        return short ? "-tia tener" : "-tia (tener)";
      }
      if (type === "tia-become") {
        return short ? "-tia ser" : "-tia (ser)";
      }
      const templateSuffix = getComposerTemplateSuffixFromSerialType(type);
      return templateSuffix ? `-${templateSuffix}` : short ? "" : "Free";
    }
    function getComposerMatrixAffixTriggerPrefix(kind = "manual") {
      return kind === "serial" ? "Series" : "Derivation";
    }
    function getComposerMatrixTokenCategoryLabel(slotKey = "", token = "") {
      const normalizedToken = normalizeComposerStem(token);
      const transitivity = getComposerSlotConfig(slotKey)?.transitivity || "";
      if ((transitivity === COMPOSER_TRANSITIVITY.transitive || transitivity === COMPOSER_TRANSITIVITY.bitransitive) && normalizedToken === "ia") {
        return "Matrix root · ia";
      }
      return "Matrix root";
    }
    function buildComposerMatrixTokenEntry(slotKey = "", token = "", value = "") {
      const normalizedToken = normalizeComposerStem(token);
      if (!normalizedToken) {
        return null;
      }
      const categoryLabel = getComposerMatrixTokenCategoryLabel(slotKey, normalizedToken);
      const meta = String(categoryLabel).trim();
      return {
        kind: "token",
        key: `token:${normalizedToken}`,
        value: value || `_${normalizedToken}`,
        label: `-${normalizedToken}`,
        shortLabel: `-${normalizedToken}`,
        meta,
        detailLabel: [`-${normalizedToken}`, meta].filter(Boolean).join(" · ")
      };
    }
    function getComposerMatrixAffixCurrentState(slotKey = "", stemInput = null) {
      const selectedType = String(COMPOSER_SERIAL_SLOT_TYPE_BY_SLOT[slotKey] || "auto").trim().toLowerCase();
      if (selectedType === "mono") {
        return {
          kind: "manual",
          key: "manual",
          shortLabel: "",
          detailLabel: "Free",
          triggerPrefix: getComposerMatrixAffixTriggerPrefix("manual")
        };
      }
      if (selectedType !== "auto") {
        const specialState = getComposerMatrixAffixStateFromEntry(getComposerMatrixAffixSpecialEntry(slotKey, {
          serialType: selectedType
        }));
        if (specialState) {
          return specialState;
        }
        const shortLabel = getComposerMatrixAffixSerialLabel(selectedType, {
          short: true
        });
        return {
          kind: "serial",
          key: `serial:${selectedType}`,
          shortLabel,
          detailLabel: `Series ${getComposerMatrixAffixSerialLabel(selectedType)}`,
          triggerPrefix: getComposerMatrixAffixTriggerPrefix("serial"),
          serialType: selectedType
        };
      }
      const templateSuffix = getComposerStemInputTemplateSuffix(stemInput, slotKey);
      if (templateSuffix) {
        const specialState = getComposerMatrixAffixStateFromEntry(getComposerMatrixAffixSpecialEntry(slotKey, {
          value: `_${templateSuffix}`,
          serialType: "",
          templateSuffix
        }));
        if (specialState) {
          return specialState;
        }
        const tokenEntry = buildComposerMatrixTokenEntry(slotKey, templateSuffix, `_${templateSuffix}`);
        return {
          ...tokenEntry,
          triggerPrefix: getComposerMatrixAffixTriggerPrefix("token"),
          serialType: ""
        };
      }
      const typedValue = String(stemInput?.value || "").trim().toLowerCase();
      if (typedValue.startsWith("_")) {
        const match = getComposerMatrixComboboxOptionMatch(slotKey, typedValue);
        if (match) {
          const normalizedSerialType = String(match.serialType || "auto").trim().toLowerCase();
          const specialState = getComposerMatrixAffixStateFromEntry(getComposerMatrixAffixSpecialEntry(slotKey, {
            value: match.value,
            serialType: normalizedSerialType,
            templateSuffix: match.templateSuffix
          }));
          if (specialState) {
            return specialState;
          }
          if (normalizedSerialType !== "auto" && normalizedSerialType !== "mono") {
            const shortLabel = getComposerMatrixAffixSerialLabel(normalizedSerialType, {
              short: true
            });
            return {
              kind: "serial",
              key: `serial:${normalizedSerialType}`,
              shortLabel,
              detailLabel: `Series ${getComposerMatrixAffixSerialLabel(normalizedSerialType)}`,
              triggerPrefix: getComposerMatrixAffixTriggerPrefix("serial"),
              serialType: normalizedSerialType
            };
          }
          const normalizedSuffix = normalizeComposerStem(match.templateSuffix || match.value || "");
          if (normalizedSuffix) {
            return {
              ...buildComposerMatrixTokenEntry(slotKey, normalizedSuffix, String(match.value || "").trim().toLowerCase()),
              triggerPrefix: getComposerMatrixAffixTriggerPrefix("token")
            };
          }
        }
      }
      return {
        kind: "manual",
        key: "manual",
        shortLabel: "",
        detailLabel: "Free",
        triggerPrefix: getComposerMatrixAffixTriggerPrefix("manual")
      };
    }
    function buildComposerMatrixAffixPickerGroups(slotKey = "", optionList = null, currentState = null) {
      const options = Array.from(optionList?.options || []);
      const optionValues = new Set(options.map(option => String(option.value || "").trim().toLowerCase()).filter(Boolean));
      const manualGroup = {
        label: "",
        entries: [{
          kind: "manual",
          key: "manual",
          label: "Free",
          meta: "Sin guia",
          shortLabel: "",
          detailLabel: "Free"
        }]
      };
      const specialCatalog = getComposerMatrixAffixSpecialCatalog(slotKey).filter(entry => optionValues.has(entry.value));
      if (specialCatalog.length) {
        const groups = [manualGroup];
        getComposerMatrixAffixSpecialGroups(slotKey).forEach(group => {
          const groupEntries = specialCatalog.filter(entry => entry.groupKey === group.key).map(entry => ({
            ...entry
          }));
          if (currentState && currentState.key && !groupEntries.some(entry => entry.key === currentState.key)) {
            const currentEntry = getComposerMatrixAffixSpecialEntry(slotKey, {
              key: currentState.key
            });
            if (currentEntry && currentEntry.groupKey === group.key) {
              groupEntries.push({
                ...currentEntry
              });
            }
          }
          if (groupEntries.length) {
            groups.push({
              label: group.label,
              entries: groupEntries
            });
          }
        });
        return groups;
      }
      const rootEntries = getComposerMatrixRootTokensForSlot(slotKey).map(token => normalizeComposerStem(token)).filter(Boolean).filter(token => optionValues.has(`_${token}`)).map(token => buildComposerMatrixTokenEntry(slotKey, token)).filter(Boolean);
      if (currentState && currentState.kind === "token" && currentState.value && !rootEntries.some(entry => entry.key === currentState.key) && optionValues.has(String(currentState.value || "").trim().toLowerCase())) {
        const suffix = normalizeComposerStem(String(currentState.value || "").replace(/^_+/, ""));
        if (suffix) {
          const currentTokenEntry = buildComposerMatrixTokenEntry(slotKey, suffix);
          if (currentTokenEntry) {
            rootEntries.push(currentTokenEntry);
          }
        }
      }
      const serialEntries = COMPOSER_SERIAL_TYPE_OPTIONS.filter(option => option.value !== "mono").map(option => {
        const value = String(getComposerMatrixComboboxValueForSerialType(option.value) || "").trim().toLowerCase();
        if (!value || !optionValues.has(value)) {
          return null;
        }
        return {
          kind: "serial",
          key: `serial:${option.value}`,
          value,
          serialType: option.value,
          label: getComposerMatrixAffixSerialLabel(option.value),
          shortLabel: getComposerMatrixAffixSerialLabel(option.value, {
            short: true
          }),
          meta: "Series",
          detailLabel: `Series ${getComposerMatrixAffixSerialLabel(option.value)}`
        };
      }).filter(Boolean);
      const rootGroups = Array.from(rootEntries.reduce((map, entry) => {
        const label = String(entry?.meta || "Root");
        if (!map.has(label)) {
          map.set(label, []);
        }
        map.get(label).push(entry);
        return map;
      }, new Map()).entries()).map(([label, entries]) => ({
        label,
        entries
      }));
      return [manualGroup, ...rootGroups, {
        label: "Series",
        entries: serialEntries
      }].filter(group => Array.isArray(group.entries) && group.entries.length);
    }
    function clearComposerMatrixAffixPopoverPosition(popover = null) {
      if (!popover) {
        return;
      }
      popover.style.left = "";
      popover.style.right = "";
      popover.style.top = "";
      popover.style.bottom = "";
      delete popover.dataset.placement;
    }
    function getComposerViewportDimensions() {
      if (typeof targetObject.window === "undefined") {
        return {
          width: 0,
          height: 0
        };
      }
      const docEl = targetObject.document.documentElement || null;
      const visualViewport = targetObject.window.visualViewport || null;
      const widthCandidates = [Number(targetObject.window.innerWidth) || 0, Number(docEl?.clientWidth) || 0, Number(visualViewport?.width) || 0].filter(value => value > 0);
      const heightCandidates = [Number(targetObject.window.innerHeight) || 0, Number(docEl?.clientHeight) || 0, Number(visualViewport?.height) || 0].filter(value => value > 0);
      return {
        width: widthCandidates.length ? Math.floor(Math.min(...widthCandidates)) : 0,
        height: heightCandidates.length ? Math.floor(Math.min(...heightCandidates)) : 0
      };
    }
    function positionComposerMatrixAffixPopover(slotKey = "") {
      if (typeof targetObject.window === "undefined" || !COMPOSER_SLOT_KEYS.includes(slotKey)) {
        return;
      }
      const {
        matrixStemAffixPickerBySlot,
        matrixStemAffixPopoverBySlot
      } = getVerbComposerElements();
      const picker = matrixStemAffixPickerBySlot?.[slotKey] || null;
      const popover = matrixStemAffixPopoverBySlot?.[slotKey] || null;
      if (!picker || !popover || !popover.matches(':popover-open')) {
        return;
      }
      clearComposerMatrixAffixPopoverPosition(popover);
      const {
        width: viewportWidth,
        height: viewportHeight
      } = getComposerViewportDimensions();
      const margin = 12;
      const gap = 8;
      const pickerRect = picker.getBoundingClientRect();
      const composerRect = (picker.closest(".verb-block__controls") || picker.closest("#verb-composer"))?.getBoundingClientRect() || null;
      const topBoundary = Math.max(margin, Math.floor((Number(composerRect?.top) || 0) + margin));
      popover.style.left = `${pickerRect.left}px`;
      popover.style.right = "auto";
      popover.style.top = `${pickerRect.bottom + gap}px`;
      popover.style.bottom = "auto";
      const popoverRect = popover.getBoundingClientRect();
      const popoverWidth = Math.ceil(popoverRect.width || 0);
      const popoverHeight = Math.ceil(popoverRect.height || 0);
      const minLeft = margin;
      const maxLeft = viewportWidth - margin - popoverWidth;
      const desiredLeft = pickerRect.left;
      const clampedLeft = Math.min(Math.max(desiredLeft, minLeft), Math.max(minLeft, maxLeft));
      const spaceBelow = Math.max(0, Math.floor(viewportHeight - pickerRect.bottom - gap - margin));
      const spaceAbove = Math.max(0, Math.floor(pickerRect.top - gap - topBoundary));
      const placeAbove = popoverHeight > spaceBelow && spaceAbove > spaceBelow;
      popover.style.left = `${Number.isFinite(clampedLeft) ? clampedLeft : 0}px`;
      if (placeAbove) {
        popover.style.top = "auto";
        popover.style.bottom = `${viewportHeight - pickerRect.top + gap}px`;
        popover.dataset.placement = "top";
      } else {
        popover.style.top = `${pickerRect.bottom + gap}px`;
        popover.style.bottom = "auto";
        popover.dataset.placement = "bottom";
      }
    }
    function positionOpenComposerMatrixAffixPopover() {
      if (!ComposerMatrixAffixOpenSlot) {
        return;
      }
      positionComposerMatrixAffixPopover(ComposerMatrixAffixOpenSlot);
    }
    function focusComposerMatrixAffixPopoverItem(slotKey = "", {
      last = false
    } = {}) {
      const {
        matrixStemAffixPopoverBySlot
      } = getVerbComposerElements();
      const popover = matrixStemAffixPopoverBySlot?.[slotKey] || null;
      if (!popover || !popover.matches(':popover-open')) {
        return false;
      }
      const buttons = Array.from(popover.querySelectorAll('button[role="menuitemradio"]:not(:disabled)'));
      const target = buttons[last ? buttons.length - 1 : 0] || null;
      if (!target || typeof target.focus !== "function") {
        return false;
      }
      target.focus({
        preventScroll: true
      });
      return true;
    }
    function setComposerMatrixAffixPopoverOpen(slotKey = "", nextOpen = false) {
      const {
        matrixStemAffixPickerBySlot,
        matrixStemAffixTriggerBySlot,
        matrixStemAffixPopoverBySlot
      } = getVerbComposerElements();
      const normalizedSlot = COMPOSER_SLOT_KEYS.includes(slotKey) ? slotKey : "";
      const activeSlot = nextOpen ? normalizedSlot : "";
      COMPOSER_SLOT_KEYS.forEach(candidateSlot => {
        const picker = matrixStemAffixPickerBySlot?.[candidateSlot] || null;
        const trigger = matrixStemAffixTriggerBySlot?.[candidateSlot] || null;
        const popover = matrixStemAffixPopoverBySlot?.[candidateSlot] || null;
        const isOpen = Boolean(activeSlot) && candidateSlot === activeSlot;
        if (picker) {
          picker.classList.toggle("is-open", isOpen);
        }
        if (trigger) {
          trigger.classList.toggle("is-open", isOpen);
          trigger.setAttribute("aria-expanded", String(isOpen));
        }
        if (popover) {
          const isCurrentlyOpen = popover.matches(':popover-open');
          if (isOpen && !isCurrentlyOpen) popover.showPopover();else if (!isOpen && isCurrentlyOpen) popover.hidePopover();
          popover.setAttribute("aria-hidden", String(!isOpen));
          if (!isOpen) {
            clearComposerMatrixAffixPopoverPosition(popover);
          }
        }
      });
      ComposerMatrixAffixOpenSlot = activeSlot;
      if (activeSlot) {
        positionComposerMatrixAffixPopover(activeSlot);
      }
    }
    function clearComposerMatrixAffixSelection(slotKey = "", stemInput = null) {
      if (!stemInput || !COMPOSER_SLOT_CONFIG[slotKey]) {
        return false;
      }
      const previousType = String(COMPOSER_SERIAL_SLOT_TYPE_BY_SLOT[slotKey] || "auto").trim().toLowerCase();
      const currentValue = String(stemInput.value || "");
      if (currentValue.trim().startsWith("_")) {
        stemInput.value = "";
      } else if (isComposerFixedSerialType(previousType)) {
        stemInput.value = extractComposerSerialEditableRoot(currentValue, previousType);
      }
      COMPOSER_SERIAL_SLOT_TYPE_BY_SLOT[slotKey] = "auto";
      delete stemInput.dataset.dropdownTemplateSuffix;
      applyComposerSerialFormattingToStemInput(stemInput, {
        preserveCaret: true,
        slotKey,
        preferSplitFromStem: true
      });
      onVerbComposerControlChange("matrix-stem");
      focusTextInputAtEnd(stemInput);
      return true;
    }
    function applyComposerMatrixAffixPickerSelection(slotKey = "", entry = null, optionList = null, stemInput = null) {
      if (!entry || !stemInput || !COMPOSER_SLOT_CONFIG[slotKey]) {
        return false;
      }
      const currentState = getComposerMatrixAffixCurrentState(slotKey, stemInput);
      if (entry.kind !== "manual" && currentState?.key === entry.key) {
        return clearComposerMatrixAffixSelection(slotKey, stemInput);
      }
      if (entry.kind === "manual") {
        return clearComposerMatrixAffixSelection(slotKey, stemInput);
      }
      if (entry.kind === "serial") {
        return applyComposerSerialTypeSelection({
          slotKey,
          selectedType: entry.serialType,
          stemInput,
          matrixTokens: getComposerMatrixRootTokensForSlot(slotKey)
        });
      }
      if (entry.kind === "token") {
        return applyComposerTemplateSuffixSelection({
          slotKey,
          templateSuffix: String(entry.value || "").replace(/^_+/, ""),
          stemInput,
          tiCausativeClass: getComposerTiCausativeClassFromSerialType(entry.serialType || "")
        });
      }
      if (!optionList) {
        return false;
      }
      optionList.value = entry.value || "";
      return handleComposerMatrixAffixDropdownSelection(slotKey, optionList, stemInput);
    }
    function syncComposerMatrixAffixPickers() {
      const {
        panel,
        slots,
        matrixStemAffixSelectBySlot,
        matrixStemAffixPickerBySlot,
        matrixStemAffixTriggerBySlot,
        matrixStemAffixTriggerValueBySlot,
        matrixStemAffixPopoverBySlot,
        matrixStemAffixChipGroupsBySlot
      } = getVerbComposerElements();
      const isComposer = isVerbInputModeComposer();
      const activeSlot = getComposerActiveSlotFromState();
      if (!isComposer || panel?.classList.contains("is-hidden") || ComposerMatrixAffixOpenSlot && ComposerMatrixAffixOpenSlot !== activeSlot) {
        setComposerMatrixAffixPopoverOpen("", false);
      }
      COMPOSER_SLOT_KEYS.forEach(slotKey => {
        const optionList = matrixStemAffixSelectBySlot?.[slotKey] || null;
        const picker = matrixStemAffixPickerBySlot?.[slotKey] || null;
        const trigger = matrixStemAffixTriggerBySlot?.[slotKey] || null;
        const triggerValue = matrixStemAffixTriggerValueBySlot?.[slotKey] || null;
        const popover = matrixStemAffixPopoverBySlot?.[slotKey] || null;
        const groupsHost = matrixStemAffixChipGroupsBySlot?.[slotKey] || null;
        const stemInput = slots[slotKey]?.stemInput || null;
        if (!optionList || !picker || !trigger || !triggerValue || !popover || !groupsHost || !stemInput) {
          return;
        }
        const currentState = getComposerMatrixAffixCurrentState(slotKey, stemInput);
        const isActive = currentState.key !== "manual";
        const isOpen = ComposerMatrixAffixOpenSlot === slotKey;
        picker.classList.toggle("is-active", isActive);
        picker.classList.toggle("is-open", isOpen);
        picker.classList.toggle("is-empty", !isActive && !isOpen);
        trigger.classList.toggle("is-active", isActive);
        const triggerPrefix = trigger.querySelector(".verb-composer__matrix-affix-trigger-prefix");
        if (triggerPrefix) {
          triggerPrefix.textContent = currentState.triggerPrefix || getComposerMatrixAffixTriggerPrefix("manual");
          const shouldHidePrefix = false;
          triggerPrefix.hidden = shouldHidePrefix;
          triggerPrefix.setAttribute("aria-hidden", String(shouldHidePrefix));
        }
        if (currentState.shortLabel) {
          triggerValue.textContent = currentState.shortLabel;
          triggerValue.hidden = false;
          triggerValue.setAttribute("aria-hidden", "false");
        } else {
          triggerValue.textContent = "";
          triggerValue.hidden = true;
          triggerValue.setAttribute("aria-hidden", "true");
        }
        const slotLabel = slotKey.toUpperCase();
        trigger.setAttribute("aria-label", currentState.detailLabel && currentState.shortLabel ? `Abrir opciones derivativas, casilla ${slotLabel}. Actual ${currentState.detailLabel}.` : `Abrir opciones derivativas, casilla ${slotLabel}.`);
        delete trigger.dataset.andrewsJudgment;
        delete trigger.dataset.andrewsRange;
        trigger.title = "";
        groupsHost.innerHTML = "";
        const groups = buildComposerMatrixAffixPickerGroups(slotKey, optionList, currentState);
        groups.forEach(group => {
          const groupEl = targetObject.document.createElement("div");
          groupEl.className = "verb-composer__matrix-affix-popover-group";
          if (group.label) {
            const label = targetObject.document.createElement("span");
            label.className = "verb-composer__matrix-affix-popover-label";
            label.textContent = group.label;
            groupEl.appendChild(label);
          }
          const grid = targetObject.document.createElement("div");
          grid.className = "verb-composer__matrix-affix-chip-grid";
          group.entries.forEach(entry => {
            const button = targetObject.document.createElement("button");
            button.type = "button";
            button.className = "verb-chip verb-composer__matrix-affix-chip";
            if (entry.kind === "manual") {
              button.classList.add("verb-composer__matrix-affix-chip--manual");
            }
            if (entry.isBlocked) {
              button.classList.add("is-empty");
            }
            if (entry.isExpected) {
              button.classList.add("is-expected");
            }
            const isCurrent = entry.key === currentState.key;
            button.classList.toggle("is-active", isCurrent);
            button.disabled = Boolean(entry.isBlocked);
            button.setAttribute("aria-disabled", String(Boolean(entry.isBlocked)));
            button.setAttribute("role", "menuitemradio");
            button.setAttribute("aria-checked", String(isCurrent));
            button.setAttribute("aria-label", entry.detailLabel || entry.label);
            const label = targetObject.document.createElement("span");
            label.className = "verb-composer__matrix-affix-chip-label";
            label.textContent = entry.label;
            button.appendChild(label);
            if (entry.meta) {
              const meta = targetObject.document.createElement("span");
              meta.className = "verb-composer__matrix-affix-chip-meta";
              meta.textContent = entry.isExpected ? `Esperado · ${entry.meta}` : entry.meta;
              button.appendChild(meta);
            }
            button.addEventListener("click", () => {
              const applied = applyComposerMatrixAffixPickerSelection(slotKey, entry, optionList, stemInput);
              setComposerMatrixAffixPopoverOpen("", false);
              if (applied) {
                focusComposerStemInputAtEditableBoundary(stemInput, slotKey);
              }
            });
            grid.appendChild(button);
          });
          groupEl.appendChild(grid);
          groupsHost.appendChild(groupEl);
        });
        if (isOpen) {
          positionComposerMatrixAffixPopover(slotKey);
        }
      });
    }
    function syncComposerMatrixStemAffixSelects() {
      const {
        matrixStemAffixSelectBySlot
      } = getVerbComposerElements();
      COMPOSER_SLOT_KEYS.forEach(slotKey => {
        const optionList = matrixStemAffixSelectBySlot?.[slotKey] || null;
        if (!optionList) {
          return;
        }
        const isSelect = String(optionList.tagName || "").toUpperCase() === "SELECT";
        const tokens = COMPOSER_MATRIX_ROOT_TOKENS_ALL;
        const entries = [];
        const seenValues = new Set();
        const addEntry = ({
          value = "",
          templateSuffix = "",
          serialType = "auto",
          label = ""
        } = {}) => {
          const normalizedValue = String(value || "").trim().toLowerCase();
          if (!normalizedValue || seenValues.has(normalizedValue)) {
            return;
          }
          seenValues.add(normalizedValue);
          entries.push({
            value: normalizedValue,
            templateSuffix: normalizeComposerStem(templateSuffix || normalizedValue.replace(/^_+/, "")),
            serialType: String(serialType || "auto").trim().toLowerCase(),
            label: String(label || normalizedValue)
          });
        };
        getComposerMatrixAffixSpecialCatalog(slotKey).forEach(entry => {
          addEntry({
            value: entry.value,
            templateSuffix: entry.templateSuffix,
            serialType: entry.serialType,
            label: entry.value
          });
        });
        COMPOSER_SERIAL_TYPE_OPTIONS.forEach(serialOption => {
          const templateSuffix = getComposerTemplateSuffixFromSerialType(serialOption.value);
          const templateValue = getComposerMatrixComboboxValueForSerialType(serialOption.value);
          addEntry({
            value: templateValue,
            templateSuffix,
            serialType: serialOption.value,
            label: templateValue
          });
        });
        tokens.forEach(token => {
          const normalizedToken = normalizeComposerStem(token);
          if (!normalizedToken) {
            return;
          }
          addEntry({
            value: `_${normalizedToken}`,
            templateSuffix: normalizedToken,
            serialType: "auto",
            label: `_${normalizedToken}`
          });
        });
        const optionSignature = entries.map(entry => `${entry.value}:${entry.serialType}`).join("|");
        if ((optionList.dataset.optionSignature || "") !== optionSignature) {
          optionList.innerHTML = "";
          if (isSelect) {
            const placeholderOption = targetObject.document.createElement("option");
            placeholderOption.value = "";
            placeholderOption.textContent = "Matrix root options";
            optionList.appendChild(placeholderOption);
          }
          entries.forEach(entry => {
            const option = targetObject.document.createElement("option");
            option.value = entry.value;
            option.label = entry.label;
            option.textContent = entry.label;
            option.dataset.templateSuffix = entry.templateSuffix;
            option.dataset.serialType = entry.serialType;
            optionList.appendChild(option);
          });
          optionList.dataset.optionSignature = optionSignature;
        }
        if (isSelect) {
          optionList.value = "";
        }
      });
      syncComposerMatrixAffixPickers();
    }
    function isVerbInputModeComposer() {
      return VerbComposerState.mode === VERB_INPUT_MODE.composer;
    }
    function normalizeComposerEntryBoard(value = "") {
      void value;
      return COMPOSER_ENTRY_BOARD.general;
    }
    function getComposerEntryBoard() {
      return normalizeComposerEntryBoard(VerbComposerState.entryBoard);
    }
    function getVerbRegexPlaceholder() {
      return "_";
    }
    function updateVerbInputPlaceholder() {
      const verbInput = targetObject.document.getElementById("verb");
      if (!verbInput) {
        return;
      }
      verbInput.placeholder = getVerbRegexPlaceholder();
      if (typeof targetObject.renderVerbMirror === "function") {
        targetObject.renderVerbMirror();
      }
    }
    function hasClassicalNahuatlComposerMacron(value = "") {
      return /[āēīō]/iu.test(String(value || ""));
    }
    function normalizeClassicalNahuatlComposerStem(value = "") {
      const normalized = String(value || "").trim().toLowerCase();
      if (/[kw]/u.test(normalized)) {
        return "";
      }
      return normalized.replace(/[^a-zāēīō]/gu, "");
    }
    function normalizeComposerStem(value) {
      return normalizeClassicalNahuatlComposerStem(value);
    }
    function getComposerEmbedTokens(value) {
      if (Array.isArray(value)) {
        return value.map(token => normalizeComposerStem(token)).filter(Boolean);
      }
      const raw = String(value || "").trim();
      if (!raw) {
        return [];
      }
      return raw.split("/").map(token => normalizeComposerStem(token)).filter(Boolean);
    }
    function normalizeComposerEmbedValue(value) {
      return getComposerEmbedTokens(value).join("/");
    }
    function normalizeClassicalFuenteSourcePartStem(value = "") {
      const rawSource = String(value || "").trim().replace(/^\((.*)\)$/u, "$1").trim().toLowerCase();
      const transcriptionFrame = rawSource.includes("/")
        && typeof targetObject.buildClassicalNahuatlCompactTranscriptionFrame === "function"
        ? targetObject.buildClassicalNahuatlCompactTranscriptionFrame(rawSource)
        : null;
      const source = targetObject.isClassicalNahuatlTranscriptionFrame?.(transcriptionFrame)
        && transcriptionFrame.authorizationStatus === "authorized"
        ? transcriptionFrame.surface
        : rawSource;
      return source.replace(/\s+/gu, "").replace(/[^a-zāēīō0-]/gu, "").replace(/-{2,}/gu, "-").replace(/^-|-$/gu, "");
    }
    function normalizeComposerSecondaryValenceSurfaceToken(value) {
      const token = String(value || "").trim().toLowerCase().normalize("NFC");
      const positionalMatch = token.match(/^(tla|tē|mo)-[12]$/u);
      if (positionalMatch) {
        return positionalMatch[1];
      }
      return Object.prototype.hasOwnProperty.call(COMPOSER_SECONDARY_VALENCE_FAMILY_BY_TOKEN, token) ? token : "";
    }
    function getComposerValenceFamilyToken(value) {
      const surfaceToken = normalizeComposerSecondaryValenceSurfaceToken(value);
      return surfaceToken ? COMPOSER_SECONDARY_VALENCE_FAMILY_BY_TOKEN[surfaceToken] || "" : "";
    }
    function normalizeComposerValenceToken(value) {
      return getComposerValenceFamilyToken(value);
    }
    function getComposerSecondaryValenceInventory() {
      const sourceInventory = [
        ...DEFAULT_COMPOSER_SECONDARY_VALENCE_INVENTORY,
        ...(Array.isArray(targetObject.NONSPECIFIC_VALENCE_AFFIXES) ? targetObject.NONSPECIFIC_VALENCE_AFFIXES : [])
      ];
      const grouped = new Map();
      COMPOSER_SECONDARY_VALENCE_FAMILY_ORDER.forEach(family => {
        grouped.set(family, []);
      });
      sourceInventory.forEach(token => {
        const normalized = normalizeComposerSecondaryValenceSurfaceToken(token);
        const family = getComposerValenceFamilyToken(normalized);
        if (!normalized || !family) {
          return;
        }
        const bucket = grouped.get(family);
        if (!bucket || bucket.includes(normalized)) {
          return;
        }
        bucket.push(normalized);
      });
      return COMPOSER_SECONDARY_VALENCE_FAMILY_ORDER.flatMap(family => grouped.get(family) || []);
    }
    function getComposerSecondaryValenceFamilyInventory(family = "") {
      const normalizedFamily = getComposerValenceFamilyToken(family) || String(family || "").trim().toLowerCase();
      if (!normalizedFamily) {
        return [];
      }
      return getComposerSecondaryValenceInventory().filter(token => getComposerValenceFamilyToken(token) === normalizedFamily);
    }
    function getComposerSecondaryValenceOptionEntries() {
      const entries = [];
      const seen = new Set();
      const addEntry = (value = "", label = "") => {
        const normalizedValue = String(value || "").trim();
        if (seen.has(normalizedValue)) {
          return;
        }
        seen.add(normalizedValue);
        entries.push({
          value: normalizedValue,
          label: label || normalizedValue || "No prefix"
        });
      };
      addEntry("", "No prefix");
      COMPOSER_SECONDARY_VALENCE_OPTIONS.forEach(value => {
        if (!value) {
          return;
        }
        if (value === "tla" || value === "mo") {
          // Keep family-only inherited values available through the chip UI, not as distinct options here.
          return;
        }
        addEntry(value, value);
      });
      const inventory = getComposerSecondaryValenceInventory();
      inventory.forEach(token => {
        addEntry(token, token);
      });
      inventory.forEach(firstToken => {
        inventory.forEach(secondToken => {
          const familyCounts = {};
          [firstToken, secondToken].forEach(token => {
            const family = getComposerValenceFamilyToken(token);
            if (!family) {
              return;
            }
            familyCounts[family] = (familyCounts[family] || 0) + 1;
          });
          const isAllowedPair = Object.entries(familyCounts).every(([family, count]) => count <= Number(COMPOSER_SECONDARY_VALENCE_INVENTORY_CAPACITY[family] || 0));
          if (!isAllowedPair) {
            return;
          }
          const encoded = encodeComposerSecondaryValenceSelection(firstToken, secondToken);
          if (!encoded) {
            return;
          }
          const parsed = parseComposerSecondaryValenceSelection(encoded);
          const first = normalizeComposerSecondaryValenceSurfaceToken(parsed.first);
          const second = normalizeComposerSecondaryValenceSurfaceToken(parsed.second);
          if (!first || !second) {
            return;
          }
          addEntry(encoded, `${first}+${second}`);
        });
      });
      return entries;
    }
    function getComposerAllowedValenceFamilies(transitivity) {
      if (transitivity === COMPOSER_TRANSITIVITY.intransitive) {
        return ["tla"];
      }
      return COMPOSER_SECONDARY_VALENCE_FAMILY_ORDER.slice();
    }
    function parseComposerSecondaryValenceSelection(value) {
      const token = String(value || "").trim().toLowerCase().normalize("NFC");
      if (token.includes("+")) {
        const rawParts = token.split("+");
        const parts = rawParts.map(part => normalizeComposerSecondaryValenceSurfaceToken(part));
        if (rawParts.length === 2 && parts.every(Boolean)) {
          return {
            first: parts[0],
            second: parts[1]
          };
        }
      }
      if (token === "tla-1") {
        return {
          first: "tla",
          second: ""
        };
      }
      if (token === "tē-1") {
        return {
          first: "tē",
          second: ""
        };
      }
      if (token === "mo-1") {
        return {
          first: "mo",
          second: ""
        };
      }
      if (token === "tla-2") {
        return {
          first: "",
          second: "tla"
        };
      }
      if (token === "tē-2") {
        return {
          first: "",
          second: "tē"
        };
      }
      if (token === "mo-2" || token === "mo") {
        return {
          first: "",
          second: "mo"
        };
      }
      const single = normalizeComposerSecondaryValenceSurfaceToken(token);
      return {
        first: "",
        second: single
      };
    }
    function normalizeComposerSecondaryValenceSelection(value = "") {
      const raw = String(value || "").trim();
      if (!raw) {
        return "";
      }
      const parsed = parseComposerSecondaryValenceSelection(raw);
      const normalized = encodeComposerSecondaryValenceSelection(parsed.first, parsed.second);
      return normalized && getComposerSecondaryValenceOptionEntries().some(entry => entry.value === normalized) ? normalized : "";
    }
    function canonicalizeComposerSecondaryValencePair(firstValue, secondValue) {
      const first = normalizeComposerSecondaryValenceSurfaceToken(firstValue);
      const second = normalizeComposerSecondaryValenceSurfaceToken(secondValue);
      const firstFamily = getComposerValenceFamilyToken(first);
      const secondFamily = getComposerValenceFamilyToken(second);
      if (!first || !second || !firstFamily || !secondFamily || firstFamily === secondFamily) {
        return {
          first,
          second
        };
      }
      const hasMo = firstFamily === "mo" || secondFamily === "mo";
      if (hasMo) {
        const moToken = firstFamily === "mo" ? first : second;
        const other = firstFamily === "mo" ? second : first;
        return {
          first: moToken,
          second: other
        };
      }
      const hasTe = firstFamily === "tē" || secondFamily === "tē";
      const hasTla = firstFamily === "tla" || secondFamily === "tla";
      if (hasTe && hasTla) {
        return {
          first: firstFamily === "tē" ? first : second,
          second: firstFamily === "tla" ? first : second
        };
      }
      return {
        first,
        second
      };
    }
    function getComposerSecondaryValenceTokens(value) {
      const parsed = parseComposerSecondaryValenceSelection(value);
      const first = normalizeComposerSecondaryValenceSurfaceToken(parsed.first);
      const second = normalizeComposerSecondaryValenceSurfaceToken(parsed.second);
      if (first && second) {
        return [first, second];
      }
      const single = second || first;
      return single ? [single] : [];
    }
    function encodeComposerSecondaryValenceSelection(firstValue, secondValue) {
      const canonicalPair = canonicalizeComposerSecondaryValencePair(firstValue, secondValue);
      const first = normalizeComposerSecondaryValenceSurfaceToken(canonicalPair.first);
      const second = normalizeComposerSecondaryValenceSurfaceToken(canonicalPair.second);
      if (first && second) {
        return `${first}+${second}`;
      }
      const canonicalToken = second || first;
      if (canonicalToken) {
        return canonicalToken;
      }
      return "";
    }
    function getComposerDirectionalPrefixInventory() {
      const configured = Array.isArray(targetObject.DIRECTIONAL_PREFIXES) && targetObject.DIRECTIONAL_PREFIXES.length
        ? targetObject.DIRECTIONAL_PREFIXES
        : DEFAULT_COMPOSER_DIRECTIONAL_PREFIXES;
      const allowed = new Set(DEFAULT_COMPOSER_DIRECTIONAL_PREFIXES);
      return Array.from(new Set(configured.map(value => String(value || "").trim().toLowerCase().normalize("NFC")).filter(value => allowed.has(value))));
    }
    function normalizeComposerDirectionalPrefix(value = "") {
      const token = String(value || "").trim().toLowerCase().normalize("NFC");
      return getComposerDirectionalPrefixInventory().includes(token) ? token : "";
    }
    function getComposerBracketDirectionalPrefixToken(value = "") {
      const token = String(value || "").trim().toLowerCase().normalize("NFC");
      const match = token.match(/^\[([\p{L}]+)\]$/u);
      return match ? normalizeComposerDirectionalPrefix(match[1]) : "";
    }
    function getLegacyComposerSourceToken(value = "") {
      const source = String(value || "").trim().toLowerCase().normalize("NFC");
      const directionalMatch = source.match(/\[(wal|w|kw|k)\]/u);
      if (directionalMatch) {
        return directionalMatch[1];
      }
      const valenceMatch = source.match(/(?:^|[\/+])\((ta|tajta|te|tejte|mu|mujmu)\)(?=-)/u);
      return valenceMatch?.[1] || "";
    }
    function normalizeComposerFollowerSurfaceForNucleusCheck(value = "") {
      return targetObject.replaceOptionalSupportiveMarkersWithLetters(targetObject.convertEnvelopeSupportiveMarkersToRegexInput(String(value || ""))).trim().toLowerCase();
    }
    function composerFollowerStartsWithNucleus(value = "") {
      const normalized = normalizeComposerFollowerSurfaceForNucleusCheck(value);
      return Boolean(normalized) && targetObject.VOWEL_START_RE.test(normalized);
    }
    function buildComposerOptionalValenceSlotSegment(value = "", leftEmbed = "") {
      if (value) {
        const leftSegment = leftEmbed ? `${leftEmbed}/` : "";
        return `${leftSegment}(${value})-`;
      }
      const embedTokens = getComposerEmbedTokens(leftEmbed);
      if (embedTokens.length) {
        return embedTokens.map(token => `${token}-`).join("");
      }
      return "-";
    }
    function resolveComposerSemanticFollowerSegments(semantic = {}, options = {}) {
      const matrixStem = semantic.matrix?.stem || "";
      const matrixAdjacentEmbed = semantic.matrix?.adjacentEmbed || "";
      const hasMatrixStem = semantic.matrix?.hasStem === true;
      const matrixRegexStem = semantic.matrix?.regexStem || "";
      const realizedMatrixStemBase = semantic.matrix?.realizedStemBase || matrixRegexStem;
      const supportiveMarker = targetObject.normalizeSupportiveMarkerValue(semantic?.supportiveMarker || "");
      const tiClassSuffix = semantic.ti?.classSuffix || "";
      if (!matrixRegexStem) {
        return {
          transitiveStem: "",
          supportiveStem: "",
          supportiveEmbed: ""
        };
      }
      const appendTiClassSuffix = (stemValue = "") => {
        const stem = String(stemValue || "");
        if (!tiClassSuffix || !stem) {
          return stem;
        }
        if (/ti[12]$/i.test(stem)) {
          return stem;
        }
        if (/ti$/i.test(stem)) {
          return `${stem}${tiClassSuffix}`;
        }
        return stem;
      };
      const supportiveStemBase = appendTiClassSuffix(realizedMatrixStemBase);
      const normalizedMatrixAdjacentEmbed = hasMatrixStem ? normalizeComposerMatrixAdjacentEmbed(matrixAdjacentEmbed, matrixStem, supportiveMarker) : normalizeComposerEmbedValue(matrixAdjacentEmbed);
      const supportiveRootPath = applyComposerSupportiveMarkerToRootPath({
        embed: normalizedMatrixAdjacentEmbed,
        stem: supportiveStemBase,
        supportiveMarker,
        precedingSurface: options.precedingSurface || ""
      });
      const supportiveStem = supportiveRootPath.stem;
      const supportiveEmbed = supportiveRootPath.embed;
      return {
        transitiveStem: supportiveEmbed ? `${supportiveEmbed}/${supportiveStem}` : supportiveStem,
        supportiveStem,
        supportiveEmbed
      };
    }
    function getComposerSecondaryValenceFamilyInventoryForContext(family = "", options = {}) {
      void options;
      return getComposerSecondaryValenceFamilyInventory(family);
    }
    function getComposerPreferredFamilyBaseToken(family = "") {
      const normalizedFamily = getComposerValenceFamilyToken(family) || String(family || "").trim().toLowerCase();
      if (!normalizedFamily) {
        return "";
      }
      return normalizedFamily;
    }
    function normalizeComposerValenceTokenForCurrentContext(token = "", options = {}) {
      void options;
      const normalizedToken = normalizeComposerSecondaryValenceSurfaceToken(token);
      return normalizedToken || "";
    }
    function shouldUseNhBeforeMatrixStem(matrixStem, supportiveMarker = "") {
      const normalizedMatrix = normalizeComposerStem(matrixStem);
      if (!normalizedMatrix) {
        return false;
      }
      // Keep selected matrix-button families from forcing n->nh on the adjacent embed.
      if (COMPOSER_MATRIX_NH_BLOCKED_STEMS.has(normalizedMatrix)) {
        return false;
      }
      if (targetObject.hasSupportiveMarkerValue(supportiveMarker)) {
        return true;
      }
      const letters = targetObject.splitVerbLetters(normalizedMatrix);
      if (!letters.length) {
        return false;
      }
      return targetObject.isVerbLetterVowel(letters[0]);
    }
    function normalizeComposerMatrixAdjacentEmbed(embedValue, matrixStem, supportiveMarker = "") {
      const embedTokens = getComposerEmbedTokens(embedValue);
      if (!embedTokens.length) {
        return "";
      }
      if (!shouldUseNhBeforeMatrixStem(matrixStem, supportiveMarker)) {
        return embedTokens.join("/");
      }
      const lastIndex = embedTokens.length - 1;
      const lastToken = embedTokens[lastIndex];
      if (lastToken.endsWith("n") && !lastToken.endsWith("nh")) {
        embedTokens[lastIndex] = `${lastToken}h`;
      }
      return embedTokens.join("/");
    }
    function applyComposerSupportiveMarkerToRootPath({
      embed = "",
      stem = "",
      supportiveMarker = "",
      precedingSurface = ""
    } = {}) {
      const cleanEmbed = stripComposerOptionalSupportiveMarker(embed || "");
      const cleanStem = stripComposerOptionalSupportiveMarker(stem || "");
      const normalizedMarker = targetObject.normalizeSupportiveMarkerValue(supportiveMarker);
      if (!normalizedMarker) {
        return {
          embed: cleanEmbed,
          stem: cleanStem
        };
      }
      const resolveSegment = (segmentValue = "") => {
        const leadingLetter = targetObject.getStemLeadingSupportiveLetter(segmentValue) || normalizedMarker;
        if (!leadingLetter) {
          return String(segmentValue || "");
        }
        const markedSurface = targetObject.markOptionalSupportiveSurface(segmentValue, leadingLetter, targetObject.SUPPORTIVE_MARKER_FORMAT.envelope);
        const supportiveSourceFrame = targetObject.buildOptionalSupportiveMarkedSurfaceSourceFrame({
          precedingSurface,
          markedSurface,
          inputFormat: targetObject.SUPPORTIVE_MARKER_FORMAT.envelope,
          outputFormat: targetObject.SUPPORTIVE_MARKER_FORMAT.envelope,
          preserveMarkers: true,
          sourceKind: "composer-optional-supportive-segment",
          sourceRole: "tronco"
        });
        const supportiveOperationFrame = targetObject.buildOptionalSupportiveMarkedSurfaceOperationFrame(supportiveSourceFrame);
        return targetObject.resolveOptionalSupportiveMarkedSurface({
          precedingSurface,
          markedSurface,
          inputFormat: targetObject.SUPPORTIVE_MARKER_FORMAT.envelope,
          outputFormat: targetObject.SUPPORTIVE_MARKER_FORMAT.envelope,
          preserveMarkers: true,
          sourceFrame: supportiveSourceFrame,
          operationFrame: supportiveOperationFrame
        }).outputSurface || String(segmentValue || "");
      };
      if (targetObject.getStemLeadingSupportiveLetter(cleanEmbed)) {
        return {
          embed: resolveSegment(cleanEmbed),
          stem: cleanStem
        };
      }
      if (targetObject.getStemLeadingSupportiveLetter(cleanStem)) {
        return {
          embed: cleanEmbed,
          stem: resolveSegment(cleanStem)
        };
      }
      return {
        embed: cleanEmbed,
        stem: cleanStem
      };
    }
    function shouldProjectBoundSupportiveMarkerToComposerInputs({
      embed = "",
      stem = "",
      supportiveMarker = "",
      hasBoundMarker = false,
      hasSlashMarker = false
    } = {}) {
      const cleanEmbed = normalizeComposerEmbedValue(embed || "");
      const cleanStem = normalizeComposerStem(stem || "");
      return targetObject.normalizeSupportiveMarkerValue(supportiveMarker) === "i" && hasBoundMarker === true && hasSlashMarker === true && Boolean(cleanEmbed) && cleanStem.startsWith("i");
    }
    function projectBoundSupportiveMarkerToComposerInputs({
      embed = "",
      stem = "",
      supportiveMarker = "",
      hasBoundMarker = false,
      hasSlashMarker = false
    } = {}) {
      const cleanEmbed = normalizeComposerEmbedValue(embed || "");
      const cleanStem = normalizeComposerStem(stem || "");
      if (!shouldProjectBoundSupportiveMarkerToComposerInputs({
        embed: cleanEmbed,
        stem: cleanStem,
        supportiveMarker,
        hasBoundMarker,
        hasSlashMarker
      })) {
        return {
          embed: cleanEmbed,
          stem: cleanStem
        };
      }
      const embedTokens = getComposerEmbedTokens(cleanEmbed);
      if (!embedTokens.length) {
        return {
          embed: cleanEmbed,
          stem: cleanStem
        };
      }
      if (!embedTokens[0].startsWith("i")) {
        embedTokens[0] = `i${embedTokens[0]}`;
      }
      return {
        embed: embedTokens.join("/"),
        stem: cleanStem
      };
    }
    function shouldSerializeBoundSupportiveMarkerFromComposerInputs({
      embed = "",
      stem = "",
      supportiveMarker = ""
    } = {}) {
      const cleanEmbed = normalizeComposerEmbedValue(embed || "");
      const cleanStem = normalizeComposerStem(stem || "");
      const firstEmbedToken = getComposerEmbedTokens(cleanEmbed)[0] || "";
      return targetObject.normalizeSupportiveMarkerValue(supportiveMarker) === "i" && Boolean(cleanEmbed) && Boolean(cleanStem) && firstEmbedToken.startsWith("i");
    }
    function resolveComposerMarkedSupportiveRootPath({
      embed = "",
      stem = "",
      supportiveMarker = "",
      precedingSurface = ""
    } = {}) {
      const cleanEmbed = normalizeComposerEmbedValue(embed || "");
      const cleanStem = normalizeComposerStem(stem || "");
      const normalizedMarker = targetObject.normalizeSupportiveMarkerValue(supportiveMarker);
      if (shouldSerializeBoundSupportiveMarkerFromComposerInputs({
        embed: cleanEmbed,
        stem: cleanStem,
        supportiveMarker: normalizedMarker
      })) {
        const embedTokens = getComposerEmbedTokens(cleanEmbed);
        const regexEmbedTokens = embedTokens.slice();
        regexEmbedTokens[0] = regexEmbedTokens[0].replace(/^i/, "");
        const regexEmbed = normalizeComposerEmbedValue(regexEmbedTokens);
        const regexStem = cleanStem;
        const markedEmbed = `${targetObject.getOptionalSupportiveMarkerForLetter("i")}${regexEmbed}`;
        return {
          embed: markedEmbed,
          stem: regexStem,
          combined: `${markedEmbed}/${regexStem}`
        };
      }
      const resolved = applyComposerSupportiveMarkerToRootPath({
        embed: cleanEmbed,
        stem: cleanStem,
        supportiveMarker: normalizedMarker,
        precedingSurface
      });
      return {
        embed: resolved.embed,
        stem: resolved.stem,
        combined: resolved.embed ? `${resolved.embed}/${resolved.stem}` : resolved.stem
      };
    }
    function getComposerStemSyllableCount(stem) {
      const normalizedStem = normalizeComposerStem(stem);
      if (!normalizedStem) {
        return 0;
      }
      const syllables = targetObject.getSyllables(normalizedStem, {
        analysis: true,
        assumeFinalV: true
      });
      if (Array.isArray(syllables) && syllables.length) {
        return syllables.filter(syllable => syllable && syllable.nucleus).length;
      }
      return targetObject.getTotalVowelCount(normalizedStem);
    }
    function getComposerSupportiveMarker(state = VerbComposerState) {
      return targetObject.normalizeSupportiveMarkerValue(state?.supportiveMarker || "");
    }
    function getComposerSupportiveMarkerCandidate(state = VerbComposerState) {
      const source = state && typeof state === "object" ? state : VerbComposerState;
      const slotKey = getComposerSlotKeyForTransitivity(source?.transitivity);
      const stateKeys = getComposerSlotStateKeys(slotKey);
      return targetObject.resolveComposerSupportiveMarkerCandidate({
        stem: source?.[stateKeys.stem] || "",
        embed: source?.[stateKeys.embed] || source?.embedPrefix || ""
      });
    }
    function canComposerUseSupportiveMarker(state = VerbComposerState) {
      return Boolean(getComposerSupportiveMarkerCandidate(state));
    }
    function syncComposerSupportiveMarkerFromState() {
      const currentMarker = getComposerSupportiveMarker();
      if (!currentMarker) {
        VerbComposerState.supportiveMarker = "";
        return "";
      }
      const candidateMarker = getComposerSupportiveMarkerCandidate();
      VerbComposerState.supportiveMarker = candidateMarker || "";
      return VerbComposerState.supportiveMarker;
    }
    function syncComposerSupportiveIAvailability() {
      const {
        supportiveICheckbox
      } = getVerbComposerElements();
      if (!supportiveICheckbox) {
        return;
      }
      syncComposerSupportiveMarkerFromState();
      const canUse = canComposerUseSupportiveMarker();
      const isOn = targetObject.hasSupportiveMarkerValue(getComposerSupportiveMarker());
      const shouldDisable = !canUse && !isOn;
      supportiveICheckbox.disabled = shouldDisable;
      supportiveICheckbox.setAttribute("aria-disabled", String(shouldDisable));
      supportiveICheckbox.checked = isOn;
      const checkboxWrapper = supportiveICheckbox.closest(".verb-composer__checkbox");
      if (checkboxWrapper) {
        checkboxWrapper.classList.toggle("is-blocked", shouldDisable);
      }
      syncComposerSupportiveITogglePlacement();
    }
    function getUiCopyLabel(labelKey = "", fallback = "") {
      return targetObject.getLocalizedLabel(UI_LABELS[labelKey], targetObject.getClassicalLocaleContext(), fallback);
    }
    function updateVerbComposerHint() {
      const {
        hint
      } = getVerbComposerElements();
      if (!hint) {
        return;
      }
      if (!isVerbInputModeComposer()) {
        hint.textContent = getUiCopyLabel("composer-hint-regex-dev", "Pattern: type the pattern directly on the surface.");
        return;
      }
      const stem = getComposerActiveStemValue();
      const syllableCount = getComposerStemSyllableCount(stem);
      if (!stem) {
        hint.textContent = getUiCopyLabel("composer-hint-define-roots", "Define matrix root and embedded root to build the form.");
        return;
      }
      const directionalPrefix = normalizeComposerDirectionalPrefix(VerbComposerState.directionalPrefix || "");
      if (directionalPrefix) {
        hint.textContent = `Detected syllables (base): ${syllableCount || 0}. Directional in guide position: [${directionalPrefix}]/ at the start of the block.`;
        return;
      }
      hint.textContent = `Detected syllables (matrix root): ${syllableCount || 0}.`;
    }
    function syncComposerSecondaryValenceOptions(selectEl) {
      if (!selectEl) {
        return;
      }
      const entries = getComposerSecondaryValenceOptionEntries();
      const signature = entries.map(entry => `${entry.value}:${entry.label}`).join("|");
      if ((selectEl.dataset.optionSignature || "") === signature) {
        return;
      }
      selectEl.innerHTML = "";
      entries.forEach(entry => {
        const option = targetObject.document.createElement("option");
        option.value = entry.value;
        option.textContent = entry.label;
        selectEl.appendChild(option);
      });
      selectEl.dataset.optionSignature = signature;
    }
    function getComposerAllowedValenceOptions(transitivity) {
      const options = new Set([""]);
      const scope = transitivity === COMPOSER_TRANSITIVITY.intransitive ? "intransitive" : "primary";
      getComposerAllowedValenceFamilies(transitivity).forEach(family => {
        getComposerSecondaryValenceFamilyInventoryForContext(family, {
          state: VerbComposerState,
          scope
        }).forEach(token => {
          options.add(token);
        });
      });
      return options;
    }
    function syncComposerSingleValenceOptions(selectEl, families = []) {
      if (!selectEl) {
        return;
      }
      const entries = [{
        value: "",
        label: "No prefix"
      }];
      const scope = selectEl?.id === "composer-valence-a" ? "intransitive" : "primary";
      (Array.isArray(families) ? families : []).forEach(family => {
        getComposerSecondaryValenceFamilyInventoryForContext(family, {
          state: VerbComposerState,
          scope
        }).forEach(token => {
          entries.push({
            value: token,
            label: token
          });
        });
      });
      const signature = entries.map(entry => `${entry.value}:${entry.label}`).join("|");
      if ((selectEl.dataset.optionSignature || "") === signature) {
        return;
      }
      selectEl.innerHTML = "";
      entries.forEach(entry => {
        const option = targetObject.document.createElement("option");
        option.value = entry.value;
        option.textContent = entry.label;
        selectEl.appendChild(option);
      });
      selectEl.dataset.optionSignature = signature;
    }
    function getComposerNextFamilySurfaceToken(family = "", currentToken = "", {
      reservedTokens = [],
      allowClear = false,
      state = VerbComposerState,
      scope = "primary",
      secondaryTokens = [],
      secondaryIndex = 0
    } = {}) {
      const reserved = new Set((Array.isArray(reservedTokens) ? reservedTokens : []).map(token => normalizeComposerSecondaryValenceSurfaceToken(token)).filter(Boolean));
      const inventory = getComposerSecondaryValenceFamilyInventoryForContext(family, {
        state,
        scope,
        secondaryTokens,
        secondaryIndex
      }).filter(token => !reserved.has(token));
      if (!inventory.length) {
        return "";
      }
      const normalizedCurrent = normalizeComposerSecondaryValenceSurfaceToken(currentToken);
      const currentIndex = inventory.indexOf(normalizedCurrent);
      if (currentIndex < 0) {
        return inventory[0];
      }
      if (currentIndex >= inventory.length - 1) {
        return allowClear ? "" : inventory[0];
      }
      return inventory[currentIndex + 1] || inventory[0];
    }
    function syncComposerValenceFamilyChipGroup(container, selectEl, families = [], source = "other") {
      if (!container || !selectEl) {
        return;
      }
      const normalizedFamilies = (Array.isArray(families) ? families : []).map(family => String(family || "").trim().toLowerCase()).filter(Boolean);
      const optionSignature = normalizedFamilies.join("|");
      if ((container.dataset.familySignature || "") !== optionSignature) {
        container.innerHTML = "";
        normalizedFamilies.forEach(family => {
          const button = targetObject.document.createElement("button");
          button.type = "button";
          button.className = "verb-chip";
          button.dataset.chipFamily = family;
          button.textContent = family;
          button.addEventListener("click", () => {
            if (button.disabled) {
              return;
            }
            const currentToken = normalizeComposerSecondaryValenceSurfaceToken(selectEl.value);
            const currentFamily = getComposerValenceFamilyToken(currentToken);
            const scope = selectEl?.id === "composer-valence-a" ? "intransitive" : "primary";
            const nextToken = currentFamily === family ? getComposerNextFamilySurfaceToken(family, currentToken, {
              allowClear: true,
              state: VerbComposerState,
              scope
            }) : getComposerNextFamilySurfaceToken(family, "", {
              state: VerbComposerState,
              scope
            });
            selectEl.value = nextToken;
            onVerbComposerControlChange(source);
          });
          container.appendChild(button);
        });
        container.dataset.familySignature = optionSignature;
      }
      const currentToken = normalizeComposerSecondaryValenceSurfaceToken(selectEl.value);
      const currentFamily = getComposerValenceFamilyToken(currentToken);
      const buttons = Array.from(container.querySelectorAll(".verb-chip"));
      buttons.forEach(button => {
        const family = String(button.dataset.chipFamily || "");
        const isDisabled = Boolean(selectEl.disabled);
        const isActive = currentFamily === family;
        button.disabled = isDisabled;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
        button.setAttribute("aria-label", isActive && currentToken ? `${family}. Actual ${currentToken}.` : family);
      });
    }
    function syncComposerValenceAvailability() {
      const {
        valenceSelectIntransitive,
        valenceIntransitiveEmbedInput,
        valenceEmbedPrimaryInput,
        valenceEmbedSecondaryInput,
        valenceSelect,
        valenceSelectSecondary
      } = getVerbComposerElements();
      if (!valenceSelectIntransitive || !valenceSelect || !valenceSelectSecondary) {
        return;
      }
      syncComposerSingleValenceOptions(valenceSelectIntransitive, getComposerAllowedValenceFamilies(COMPOSER_TRANSITIVITY.intransitive));
      syncComposerSingleValenceOptions(valenceSelect, getComposerAllowedValenceFamilies(COMPOSER_TRANSITIVITY.transitive));
      syncComposerSecondaryValenceOptions(valenceSelectSecondary);
      const allowedIntransitive = getComposerAllowedValenceOptions(COMPOSER_TRANSITIVITY.intransitive);
      Array.from(valenceSelectIntransitive.options).forEach(option => {
        option.disabled = !allowedIntransitive.has(option.value);
      });
      VerbComposerState.valenceIntransitive = normalizeComposerValenceTokenForCurrentContext(VerbComposerState.valenceIntransitive, {
        state: VerbComposerState,
        scope: "intransitive"
      });
      if (!allowedIntransitive.has(VerbComposerState.valenceIntransitive)) {
        VerbComposerState.valenceIntransitive = "";
      }
      valenceSelectIntransitive.value = VerbComposerState.valenceIntransitive;
      if (valenceIntransitiveEmbedInput) {
        const showEmbed = VerbComposerState.transitivity === COMPOSER_TRANSITIVITY.intransitive && getComposerValenceFamilyToken(VerbComposerState.valenceIntransitive) === "tla";
        const embedField = valenceIntransitiveEmbedInput.closest(".verb-composer__stem-field");
        if (embedField) {
          embedField.hidden = !showEmbed;
          embedField.setAttribute("aria-hidden", String(!showEmbed));
          const embedLabel = embedField.querySelector(".verb-composer__sub-label");
          if (embedLabel) {
            embedLabel.hidden = !showEmbed;
            embedLabel.setAttribute("aria-hidden", String(!showEmbed));
          }
        }
        valenceIntransitiveEmbedInput.hidden = !showEmbed;
        valenceIntransitiveEmbedInput.readOnly = !showEmbed;
        valenceIntransitiveEmbedInput.classList.toggle("is-blocked", !showEmbed);
        valenceIntransitiveEmbedInput.setAttribute("aria-disabled", String(!showEmbed));
      }
      const allowedPrimary = getComposerAllowedValenceOptions(COMPOSER_TRANSITIVITY.transitive);
      Array.from(valenceSelect.options).forEach(option => {
        option.disabled = !allowedPrimary.has(option.value);
      });
      const isBitransitive = VerbComposerState.transitivity === COMPOSER_TRANSITIVITY.bitransitive;
      VerbComposerState.valence = normalizeComposerValenceTokenForCurrentContext(VerbComposerState.valence, {
        state: VerbComposerState,
        scope: "primary"
      });
      if (!allowedPrimary.has(VerbComposerState.valence)) {
        VerbComposerState.valence = "";
      }
      valenceSelect.disabled = isBitransitive;
      valenceSelect.value = VerbComposerState.valence;
      const allowedSecondary = new Set(getComposerSecondaryValenceOptionEntries().map(entry => entry.value));
      Array.from(valenceSelectSecondary.options).forEach(option => {
        option.disabled = !allowedSecondary.has(option.value);
      });
      const normalizedSecondaryTokens = getComposerSecondaryValenceTokens(VerbComposerState.valenceSecondary).map((token, index, tokens) => normalizeComposerValenceTokenForCurrentContext(token, {
        state: VerbComposerState,
        scope: "secondary",
        secondaryTokens: tokens,
        secondaryIndex: index
      })).filter(Boolean);
      VerbComposerState.valenceSecondary = encodeComposerSecondaryInventoryTokens(normalizedSecondaryTokens);
      if (!allowedSecondary.has(VerbComposerState.valenceSecondary)) {
        VerbComposerState.valenceSecondary = "";
      }
      valenceSelectSecondary.value = VerbComposerState.valenceSecondary;
      if (valenceEmbedPrimaryInput) {
        valenceEmbedPrimaryInput.readOnly = isBitransitive;
        valenceEmbedPrimaryInput.classList.toggle("is-blocked", isBitransitive);
        valenceEmbedPrimaryInput.setAttribute("aria-disabled", String(isBitransitive));
      }
      if (valenceEmbedSecondaryInput) {
        valenceEmbedSecondaryInput.readOnly = false;
        valenceEmbedSecondaryInput.classList.remove("is-blocked");
        valenceEmbedSecondaryInput.setAttribute("aria-disabled", "false");
      }
      syncComposerChipGroupsFromState();
    }
    function getComposerSlotEmbedForRegex(slotKey = "", embedValue = "") {
      const normalizedEmbed = normalizeComposerEmbedValue(embedValue || "");
      if (!normalizedEmbed) {
        return "";
      }
      void slotKey;
      return normalizedEmbed;
    }
    function buildComposerSemanticState(state = {}) {
      const sourceTransitivitySelectionFrame = validateGenerationSourceTransitivitySelection(state.transitivity || "");
      if (sourceTransitivitySelectionFrame.authorizationStatus === "blocked") {
        return {
          transitivity: "",
          sourceTransitivitySelectionFrame,
          blocked: true,
          blockReason: sourceTransitivitySelectionFrame.blockReason,
          slots: {},
          valence: {},
          matrix: {
            stem: "",
            regexStem: "",
            realizedStemBase: "",
            hasStem: false,
          },
        };
      }
      const transitivity = sourceTransitivitySelectionFrame.sourceTransitivity || COMPOSER_TRANSITIVITY.intransitive;
      const requestedValenceIntransitive = String(state.valenceIntransitive || "").trim();
      const requestedValence = String(state.valence || "").trim();
      const requestedValenceSecondary = String(state.valenceSecondary || "").trim();
      const requestedDirectionalPrefix = String(state.directionalPrefix || "").trim();
      const valenceIntransitive = normalizeComposerSecondaryValenceSurfaceToken(requestedValenceIntransitive);
      const valence = normalizeComposerSecondaryValenceSurfaceToken(requestedValence);
      const valenceSecondaryRaw = normalizeComposerSecondaryValenceSelection(requestedValenceSecondary);
      const valenceSecondaryTokens = getComposerSecondaryValenceTokens(valenceSecondaryRaw);
      const valenceSecondary = valenceSecondaryTokens[valenceSecondaryTokens.length - 1] || "";
      const directionalPrefix = normalizeComposerDirectionalPrefix(requestedDirectionalPrefix);
      const invalidSourceFields = [
        requestedValenceIntransitive && !valenceIntransitive ? "valenceIntransitive" : "",
        requestedValence && !valence ? "valence" : "",
        requestedValenceSecondary && !valenceSecondaryRaw ? "valenceSecondary" : "",
        requestedDirectionalPrefix && !directionalPrefix ? "directionalPrefix" : ""
      ].filter(Boolean);
      if (invalidSourceFields.length) {
        return {
          transitivity,
          sourceTransitivitySelectionFrame,
          blocked: true,
          blockReason: `invalid-classical-composer-source:${invalidSourceFields.join(",")}`,
          invalidSourceFields: Object.freeze(invalidSourceFields),
          directional: {
            prefix: ""
          },
          slots: {},
          valence: {},
          matrix: {
            stem: "",
            regexStem: "",
            realizedStemBase: "",
            hasStem: false
          }
        };
      }
      const slotAStem = normalizeComposerStem(state.slotAStem || "");
      const slotAEmbed = getComposerSlotEmbedForRegex("a", state.slotAEmbed || "");
      const slotBStem = normalizeComposerStem(state.slotBStem || "");
      const slotBEmbed = getComposerSlotEmbedForRegex("b", state.slotBEmbed || "");
      const slotCStem = normalizeComposerStem(state.slotCStem || "");
      const slotCEmbed = getComposerSlotEmbedForRegex("c", state.slotCEmbed || "");
      const valenceIntransitiveEmbed = normalizeComposerEmbedValue(state.valenceIntransitiveEmbed || "");
      const valenceEmbedPrimary = normalizeComposerEmbedValue(state.valenceEmbedPrimary || "");
      const valenceEmbedSecondary = normalizeComposerEmbedValue(state.valenceEmbedSecondary || "");
      const matrixStem = transitivity === COMPOSER_TRANSITIVITY.bitransitive ? slotCStem : transitivity === COMPOSER_TRANSITIVITY.transitive ? slotBStem : slotAStem;
      const matrixAdjacentEmbed = transitivity === COMPOSER_TRANSITIVITY.bitransitive ? slotCEmbed : transitivity === COMPOSER_TRANSITIVITY.transitive ? slotBEmbed : slotAEmbed;
      const activeSlot = transitivity === COMPOSER_TRANSITIVITY.bitransitive ? "c" : transitivity === COMPOSER_TRANSITIVITY.transitive ? "b" : "a";
      const activeStemInput = getVerbComposerElements().slots?.[activeSlot]?.stemInput || null;
      const selectedSerialType = COMPOSER_SERIAL_SLOT_TYPE_BY_SLOT[activeSlot] || "auto";
      const selectedSerialOption = getComposerSerialTypeOptionByValue(selectedSerialType);
      const selectedSerialSlotCount = Math.max(1, Number(selectedSerialOption?.slotCount || 1));
      const stateTiCausativeClass = targetObject.normalizeTiCausativeClass(state.tiCausativeClass || "");
      const tiCausativeClass = targetObject.normalizeTiCausativeClass(stateTiCausativeClass || getComposerActiveTiCausativeClass() || getComposerTiCausativeClassFromSerialType(selectedSerialType));
      const tiClassSuffix = tiCausativeClass === "become" ? "1" : tiCausativeClass === "have" ? "2" : "";
      const activeTemplateSuffix = getComposerStemInputTemplateSuffix(activeStemInput, activeSlot);
      const hasMatrixStem = Boolean(matrixStem);
      const hasSelectionStructure = Boolean(directionalPrefix || valenceIntransitive || valenceIntransitiveEmbed || valence || valenceSecondaryRaw || valenceEmbedPrimary || valenceEmbedSecondary || matrixAdjacentEmbed || transitivity !== COMPOSER_TRANSITIVITY.intransitive);
      const isComposerTemplateMode = state?.mode === VERB_INPUT_MODE.composer || isVerbInputModeComposer();
      const matrixPlaceholderStem = activeTemplateSuffix ? `_${activeTemplateSuffix}` : getComposerSerialInputTemplate(selectedSerialType, selectedSerialSlotCount).placeholder || "_";
      const templateCanonicalStem = activeTemplateSuffix ? resolveComposerLockedTemplateStem(matrixStem || matrixPlaceholderStem, activeTemplateSuffix, {
        slotKey: activeSlot
      }).canonicalStem : "";
      const matrixRegexStem = activeTemplateSuffix ? templateCanonicalStem || (hasSelectionStructure || isComposerTemplateMode ? matrixPlaceholderStem : "") : hasMatrixStem ? matrixStem : hasSelectionStructure || isComposerTemplateMode ? matrixPlaceholderStem : "";
      const formatValenceToken = (token = "") => {
        const surface = normalizeComposerSecondaryValenceSurfaceToken(token) || normalizeComposerValenceToken(token);
        if (!surface) {
          return "";
        }
        return `(${surface})`;
      };
      const appendTiClassSuffix = (stemValue = "") => {
        const stem = String(stemValue || "");
        if (!tiClassSuffix || !stem) {
          return stem;
        }
        if (/ti[12]$/i.test(stem)) {
          return stem;
        }
        if (/ti$/i.test(stem)) {
          return `${stem}${tiClassSuffix}`;
        }
        return stem;
      };
      const realizedMatrixStemBase = hasMatrixStem && !activeTemplateSuffix ? normalizeComposerStem(matrixStem) : matrixRegexStem;
      const supportiveMarker = targetObject.normalizeSupportiveMarkerValue(state.supportiveMarker || "");
      const semanticState = {
        transitivity,
        sourceTransitivitySelectionFrame,
        supportiveMarker,
        directional: {
          prefix: directionalPrefix
        },
        slots: {
          a: {
            stem: slotAStem,
            embed: slotAEmbed
          },
          b: {
            stem: slotBStem,
            embed: slotBEmbed
          },
          c: {
            stem: slotCStem,
            embed: slotCEmbed
          }
        },
        valence: {
          intransitive: {
            token: valenceIntransitive,
            embed: valenceIntransitiveEmbed
          },
          primary: {
            token: valence,
            embed: valenceEmbedPrimary
          },
          secondary: {
            raw: valenceSecondaryRaw,
            token: valenceSecondary,
            embed: valenceEmbedSecondary
          }
        },
        ti: {
          causativeClass: tiCausativeClass,
          classSuffix: tiClassSuffix
        },
        matrix: {
          stem: matrixStem,
          adjacentEmbed: matrixAdjacentEmbed,
          hasStem: hasMatrixStem,
          hasSelectionStructure,
          isComposerTemplateMode,
          placeholderStem: matrixPlaceholderStem,
          templateSuffix: activeTemplateSuffix,
          templateCanonicalStem,
          regexStem: matrixRegexStem,
          realizedStemBase: realizedMatrixStemBase
        }
      };
      const entradaGrammarObject = typeof targetObject.buildEntradaGrammarObjectFromComposerSemantic === "function" ? targetObject.buildEntradaGrammarObjectFromComposerSemantic(semanticState, {
        rawInput: serializeComposerSemanticToRegexInput(semanticState)
      }) : null;
      if (entradaGrammarObject) {
        Object.defineProperty(semanticState, "entradaGrammarObject", {
          configurable: true,
          enumerable: false,
          value: entradaGrammarObject
        });
      }
      return semanticState;
    }
    function serializeComposerSemanticToRegexInput(semantic = {}) {
      if (semantic?.sourceTransitivitySelectionFrame?.authorizationStatus === "blocked" || semantic?.blocked === true) {
        return "";
      }
      const transitivity = semantic?.transitivity || COMPOSER_TRANSITIVITY.intransitive;
      const supportiveMarker = targetObject.normalizeSupportiveMarkerValue(semantic?.supportiveMarker || "");
      const tiClassSuffix = semantic?.ti?.classSuffix || "";
      const appendTiClassSuffix = (stemValue = "") => {
        const stem = String(stemValue || "");
        if (!tiClassSuffix || !stem) {
          return stem;
        }
        if (/ti[12]$/i.test(stem)) {
          return stem;
        }
        if (/ti$/i.test(stem)) {
          return `${stem}${tiClassSuffix}`;
        }
        return stem;
      };
      const matrixRegexStem = String(semantic?.matrix?.regexStem || "").trim();
      const matrixStem = String(semantic?.matrix?.stem || "").trim();
      const hasMatrixStem = semantic?.matrix?.hasStem === true;
      const realizedMatrixStemBase = appendTiClassSuffix(semantic?.matrix?.realizedStemBase || matrixRegexStem || matrixStem);
      const normalizedMatrixAdjacentEmbed = hasMatrixStem ? normalizeComposerMatrixAdjacentEmbed(semantic?.matrix?.adjacentEmbed || "", matrixStem, supportiveMarker) : normalizeComposerEmbedValue(semantic?.matrix?.adjacentEmbed || "");
      const resolvedRootPath = applyComposerSupportiveMarkerToRootPath({
        embed: normalizedMatrixAdjacentEmbed,
        stem: realizedMatrixStemBase,
        supportiveMarker,
        precedingSurface: ""
      });
      const coreText = resolvedRootPath.embed ? `${resolvedRootPath.embed}/${resolvedRootPath.stem}` : resolvedRootPath.stem;
      if (!coreText) {
        return "";
      }
      return targetObject.buildMovingTargetRegexFromCoreAndPieces({
        transitivity,
        coreText,
        outerPieces: targetObject.getMovingTargetOuterPieceDescriptors(semantic)
      });
    }
    // Current regex is the only visible verb language.
    // Composer edits structural state, then serializes directly to current regex.
    function buildComposerModeBundle(state, rawFallback = "") {
      const legacySourceToken = getLegacyComposerSourceToken(rawFallback);
      if (legacySourceToken) {
        return {
          regexValue: "",
          selectionRequired: "classical-source-spelling",
          blocked: true,
          blockReason: `legacy-classical-source-token:${legacySourceToken}`
        };
      }
      if (!isComposerTransitivitySelected(state)) {
        return {
          regexValue: getComposerActiveStemValue(state),
          selectionRequired: "transitivity"
        };
      }
      const fallback = String(rawFallback || "");
      const semantic = buildComposerSemanticState(state);
      const regexValue = serializeComposerSemanticToRegexInput(semantic) || targetObject.serializeRegexInputValue(fallback) || fallback;
      if (!regexValue) {
        return {
          regexValue: ""
        };
      }
      return {
        regexValue,
        entradaGrammarObject: semantic.entradaGrammarObject || null
      };
    }

    // The visible verb language is current regex. Composer edits structure and syncs to it.
    function resolveVerbInputSource(rawValue = "", options = {}) {
      const raw = String(rawValue || "");
      void options;
      const composerDisplayBundle = buildComposerModeBundle(VerbComposerState, raw);
      const directRegexValue = targetObject.serializeRegexInputValue(raw) || raw;
      const regexValue = composerDisplayBundle.selectionRequired ? composerDisplayBundle.regexValue || "" : directRegexValue || composerDisplayBundle.regexValue || "";
      return {
        mode: VERB_INPUT_MODE.composer,
        source: "composer",
        rawValue: raw,
        displayValue: regexValue,
        regexValue,
        parseValue: regexValue,
        entradaGrammarObject: composerDisplayBundle.entradaGrammarObject || null
      };
    }
    function createEmptyEntradaUrlStateSnapshot() {
      const slots = {};
      COMPOSER_SLOT_KEYS.forEach(slotKey => {
        slots[slotKey] = {
          embed: "",
          stem: "",
          objectEmbed: "",
          serialType: "auto",
          templateSuffix: ""
        };
      });
      return {
        version: ENTRADA_URL_SEGMENT_VERSION,
        input: "",
        sourceLexemeId: "",
        board: COMPOSER_ENTRY_BOARD.general,
        panel: "inputs",
        derivationType: "direct",
        derivedVnc: "",
        vncOutputScope: "single",
        sentence: {
          combination: "none",
          particle: "none",
          particleHonorificized: false,
          adverbial: "none",
          polarity: "positive",
          surface: "statement",
          introductoryParticle: "none",
          prefaceParticle: "none",
          introductoryModifier: "none",
          antecessive: false,
          invalidFields: []
        },
        transitivity: "",
        valenceIntransitive: "",
        valence: "",
        valenceSecondary: "",
        directionalPrefix: "",
        supportiveMarker: "",
        slots,
        classicalNnc: {
          active: false,
          sourceClass: "",
          tl2ARealization: "retain-2a",
          subject: "3common",
          state: "absolutive",
          pluralConnector: "",
          predicateOptionId: "source-stem",
          possessorReduplication: false,
          possessor: "3sg",
          stemRelation: "plain",
          outputScope: "single",
          animacy: "animate",
          humanness: "human",
          metaphoricalUse: false,
          clausePosition: "initial",
          quantityPluralFormation: "",
          doubledFirstPlural: false,
          adjunctorInMode: "none",
          dependentClauseIntroducedByIn: false,
          specialHumanUse: false
        }
      };
    }
    function getEntradaUrlNestedValue(source = {}, path = []) {
      return path.reduce((current, key) => current && typeof current === "object" ? current[key] : undefined, source);
    }
    function setEntradaUrlNestedValue(target = {}, path = [], value = "") {
      if (!target || !Array.isArray(path) || !path.length) {
        return;
      }
      let cursor = target;
      path.slice(0, -1).forEach(key => {
        if (!cursor[key] || typeof cursor[key] !== "object") {
          cursor[key] = {};
        }
        cursor = cursor[key];
      });
      cursor[path[path.length - 1]] = value;
    }
    function getEntradaUrlSegmentFieldKeys() {
      return ENTRADA_URL_SEGMENT_SCHEMA.map(entry => entry.key);
    }
    function normalizeEntradaUrlBoard(value = "") {
      void value;
      return COMPOSER_ENTRY_BOARD.general;
    }
    function normalizeEntradaUrlPanel(value = "") {
      const normalized = String(value || "").trim().toLowerCase();
      if (normalized === "authority" || normalized === "formula" || normalized === "tense") {
        return "formula";
      }
      if (normalized === "result" || normalized === "output") {
        return "output";
      }
      return "inputs";
    }
    function normalizeEntradaUrlDerivationType(value = "") {
      const requested = String(value || "").trim();
      return normalizeClassicalNahuatlVncDerivationType(requested) || (requested ? "" : "direct");
    }
    function normalizeEntradaUrlBoolean(value = false) {
      if (value === true) {
        return true;
      }
      const normalized = String(value || "").trim().toLowerCase();
      return normalized === "1" || normalized === "true" || normalized === "yes" || normalized === "on";
    }
    function normalizeEntradaUrlTransitivity(value = "") {
      return normalizeGenerationSourceTransitivity(value);
    }
    function normalizeEntradaUrlSerialType(value = "") {
      const normalized = String(value || "").trim().toLowerCase();
      if (!normalized) {
        return "auto";
      }
      if (normalized === "auto") {
        return "auto";
      }
      return getComposerSerialTypeOptionByValue(normalized) ? normalized : "auto";
    }
    function normalizeEntradaUrlStateSnapshot(snapshot = null) {
      const source = snapshot && typeof snapshot === "object" ? snapshot : {};
      const next = createEmptyEntradaUrlStateSnapshot();
      const read = (path, fallback = "") => {
        const value = getEntradaUrlNestedValue(source, path);
        return value === undefined || value === null ? fallback : value;
      };
      const validComposerFieldKeys = new Set(["input", "sourceLexemeId", "valenceIntransitive", "valence", "valenceSecondary", "directionalPrefix"]);
      const invalidComposerFields = new Set(
        (Array.isArray(source.invalidComposerFields) ? source.invalidComposerFields : [])
          .filter(field => validComposerFieldKeys.has(field))
      );
      const normalizeComposerUrlField = (field, value, normalize) => {
        const requested = String(value || "").trim();
        const normalized = normalize(requested);
        if (requested && !normalized) {
          invalidComposerFields.add(field);
        }
        return normalized;
      };
      const requestedInput = String(read(["input"], "") || "").trim();
      if (getLegacyComposerSourceToken(requestedInput)) {
        invalidComposerFields.add("input");
        next.input = "";
      } else {
        next.input = targetObject.serializeRegexInputValue(requestedInput) || requestedInput;
      }
      const sourceLexemeSelectionFrame =
        buildClassicalVncSourceLexemeSelectionFrame(
          next.input,
          read(["sourceLexemeId"], "")
        );
      next.sourceLexemeId = sourceLexemeSelectionFrame.sourceLexemeId;
      if (sourceLexemeSelectionFrame.authorizationStatus === "blocked") {
        invalidComposerFields.add("sourceLexemeId");
      }
      Object.defineProperty(next, "sourceLexemeSelectionFrame", {
        configurable: true,
        value: sourceLexemeSelectionFrame
      });
      next.board = normalizeEntradaUrlBoard(read(["board"], ""));
      next.panel = normalizeEntradaUrlPanel(read(["panel"], ""));
      const requestedDerivationType = String(read(["derivationType"], "") || "").trim() || "direct";
      next.derivationTypeValidationFrame = validateClassicalNahuatlVncDerivationTypeSelection(requestedDerivationType);
      next.derivationType = next.derivationTypeValidationFrame.derivationType;
      next.derivedVnc = normalizeEntradaUrlDerivedVncCapsule(read(["derivedVnc"], ""));
      const requestedVncOutputScope = String(read(["vncOutputScope"], "") || "").trim();
      const vncOutputScopeExplicit = Array.isArray(source.presentFields)
        ? source.presentFields.includes("vncOutputScope")
        : Object.prototype.hasOwnProperty.call(source, "vncOutputScope");
      const vncOutputScopeSelectionFrame = buildClassicalResultOutputScopeSelectionFrame(requestedVncOutputScope, {
        role: "vnc",
        explicit: vncOutputScopeExplicit,
        provenance: "entrada-url-vnc-output"
      });
      next.vncOutputScope = vncOutputScopeSelectionFrame.outputScope;
      Object.defineProperty(next, "vncOutputScopeSelectionFrame", {
        configurable: true,
        value: vncOutputScopeSelectionFrame
      });
      const requestedSourceTransitivity = String(read(["transitivity"], "") || "").trim();
      next.sourceTransitivitySelectionFrame = validateGenerationSourceTransitivitySelection(requestedSourceTransitivity);
      next.transitivity = next.sourceTransitivitySelectionFrame.sourceTransitivity;
      next.valenceIntransitive = normalizeComposerUrlField("valenceIntransitive", read(["valenceIntransitive"], ""), normalizeComposerSecondaryValenceSurfaceToken);
      next.valence = normalizeComposerUrlField("valence", read(["valence"], ""), normalizeComposerSecondaryValenceSurfaceToken);
      next.valenceSecondary = normalizeComposerUrlField("valenceSecondary", read(["valenceSecondary"], ""), normalizeComposerSecondaryValenceSelection);
      next.directionalPrefix = normalizeComposerUrlField("directionalPrefix", read(["directionalPrefix"], ""), normalizeComposerDirectionalPrefix);
      next.supportiveMarker = targetObject.normalizeSupportiveMarkerValue(read(["supportiveMarker"], ""));
      COMPOSER_SLOT_KEYS.forEach(slotKey => {
        const slot = next.slots[slotKey];
        const rawSlotEmbed = read(["slots", slotKey, "embed"], "");
        const rawSlotStem = read(["slots", slotKey, "stem"], "");
        const rawInput = String(read(["input"], "") || "");
        const preserveClassicalFuenteSourceParts = slotKey === "a" && Boolean(rawSlotEmbed || /[()āēīō-]/iu.test(rawInput));
        slot.embed = preserveClassicalFuenteSourceParts ? normalizeClassicalFuenteSourcePartStem(rawSlotEmbed) : normalizeComposerEmbedValue(rawSlotEmbed);
        slot.stem = preserveClassicalFuenteSourceParts ? normalizeClassicalFuenteSourcePartStem(rawSlotStem) : normalizeComposerStem(rawSlotStem);
        slot.objectEmbed = normalizeComposerEmbedValue(read(["slots", slotKey, "objectEmbed"], ""));
        slot.serialType = normalizeEntradaUrlSerialType(read(["slots", slotKey, "serialType"], "auto"));
        slot.templateSuffix = normalizeComposerStem(read(["slots", slotKey, "templateSuffix"], ""));
      });
      const classicalSource = source.classicalNnc && typeof source.classicalNnc === "object" ? source.classicalNnc : {};
      const normalizeChoice = (value, allowedValues, fallback) => {
        const normalized = String(value || "").trim();
        return allowedValues.includes(normalized) ? normalized : fallback;
      };
      const sentenceSource = source.sentence && typeof source.sentence === "object" ? source.sentence : {};
      const sentenceInvalidFields = [];
      const normalizeSentenceChoice = (field, allowedValues, fallback) => {
        const requested = String(sentenceSource[field] ?? fallback).trim();
        if (allowedValues.includes(requested)) {
          return requested;
        }
        sentenceInvalidFields.push(field);
        return fallback;
      };
      const requestedSentenceParticle = String(sentenceSource.particle || "none").trim();
      const requestedSentenceCombination = String(sentenceSource.combination || "none").trim();
      const sentenceCombinationEntry = requestedSentenceCombination === "none"
        ? null
        : typeof targetObject.findClassicalNahuatlParticleCombinationShortcutEntry === "function"
          ? targetObject.findClassicalNahuatlParticleCombinationShortcutEntry(requestedSentenceCombination)
          : null;
      if (requestedSentenceCombination !== "none" && !sentenceCombinationEntry) {
        sentenceInvalidFields.push("combination");
      }
      next.sentence.combination = sentenceCombinationEntry?.shortcutId || "none";
      const sentenceParticleEntry = requestedSentenceParticle === "none"
        ? null
        : typeof targetObject.findClassicalNahuatlSentenceParticleEntry === "function"
          ? targetObject.findClassicalNahuatlSentenceParticleEntry(requestedSentenceParticle)
          : null;
      if (requestedSentenceParticle !== "none" && !sentenceParticleEntry) {
        sentenceInvalidFields.push("particle");
      }
      next.sentence.particle = sentenceParticleEntry?.id || "none";
      const requestedSentenceParticleHonorificized = normalizeEntradaUrlBoolean(sentenceSource.particleHonorificized);
      if (requestedSentenceParticleHonorificized && !["l3-o-behold", "l3-auh-interjection", "l3-ca-no-zo"].includes(next.sentence.particle)) {
        sentenceInvalidFields.push("particleHonorificized");
      }
      next.sentence.particleHonorificized = requestedSentenceParticleHonorificized
        && ["l3-o-behold", "l3-auh-interjection", "l3-ca-no-zo"].includes(next.sentence.particle);
      const requestedSentenceAdverbial = String(sentenceSource.adverbial || "none").trim();
      const sentenceAdverbialEntry = requestedSentenceAdverbial === "none"
        ? null
        : typeof targetObject.findClassicalNahuatlSentenceAdverbialEntry === "function"
          ? targetObject.findClassicalNahuatlSentenceAdverbialEntry(requestedSentenceAdverbial)
          : null;
      if (requestedSentenceAdverbial !== "none" && !sentenceAdverbialEntry) {
        sentenceInvalidFields.push("adverbial");
      }
      next.sentence.adverbial = sentenceAdverbialEntry?.id || "none";
      next.sentence.polarity = normalizeSentenceChoice("polarity", ["positive", "negative"], "positive");
      next.sentence.surface = normalizeSentenceChoice("surface", ["statement", "question", "exclamation"], "statement");
      next.sentence.introductoryParticle = normalizeSentenceChoice("introductoryParticle", ["none", "mā", "tlā"], "none");
      next.sentence.prefaceParticle = normalizeSentenceChoice("prefaceParticle", ["none", "ihyo", "ye"], "none");
      next.sentence.introductoryModifier = normalizeSentenceChoice("introductoryModifier", ["none", "cuēl", "ye-cuēl", "cuēl-eh", "ye-cuēl-eh", "tēl", "quin", "nēn"], "none");
      next.sentence.antecessive = normalizeEntradaUrlBoolean(sentenceSource.antecessive);
      next.sentence.invalidFields = sentenceInvalidFields;
      next.classicalNnc.active = normalizeEntradaUrlBoolean(classicalSource.active);
      const requestedNncSourceClass = normalizeChoice(
        classicalSource.sourceClass,
        ["", "tl-1-a", "tl-1-b", "tl-2-a", "tl-2-a-to-1-a", "tl-2-b-a", "tl-2-b-i", "tl-2-c", "tli-1", "tli-2", "in", "zero"],
        ""
      );
      next.classicalNnc.sourceClass = requestedNncSourceClass
        === "tl-2-a-to-1-a"
          ? "tl-2-a"
          : requestedNncSourceClass;
      next.classicalNnc.tl2ARealization = normalizeChoice(
        classicalSource.tl2ARealization,
        ["retain-2a", "reclassify-1a"],
        requestedNncSourceClass === "tl-2-a-to-1-a"
          ? "reclassify-1a"
          : "retain-2a"
      );
      if (
        next.classicalNnc.sourceClass
        && typeof targetObject.issueCanonicalNncSourceFrame === "function"
      ) {
        const routeNncStem = String(next.input || "")
          .trim()
          .replace(/^\((.*)\)$/u, "$1");
        const canonicalRouteSource = routeNncStem
          ? targetObject.issueCanonicalNncSourceFrame({
              stem: routeNncStem,
              ...(next.slots.a.embed ? { embedStem: next.slots.a.embed } : {}),
              ...(next.slots.a.stem && next.slots.a.embed
                ? { matrixStem: next.slots.a.stem }
                : {})
            })
          : null;
        if (
          canonicalRouteSource?.authorizationStatus === "authorized"
          && canonicalRouteSource?.openStemSource !== true
          && next.classicalNnc.tl2ARealization !== "reclassify-1a"
        ) {
          next.classicalNnc.sourceClass = "";
        }
      }
      next.classicalNnc.subject = normalizeChoice(classicalSource.subject, ["1sg", "2sg", "3sg", "3common", "1pl", "2pl", "3pl"], "3common");
      next.classicalNnc.state = normalizeChoice(classicalSource.state, ["absolutive", "possessive"], "absolutive");
      next.classicalNnc.pluralConnector = normalizeChoice(
        classicalSource.pluralConnector,
        ["", "t-in", "m-eh", "0-h"],
        ""
      );
      next.classicalNnc.predicateOptionId = normalizeChoice(classicalSource.predicateOptionId, ["source-stem", "yo-matrix", "secondary-general-use", "analogical-restricted-use", "tl-2a-to-1a", "tec-title"], "source-stem");
      if (next.classicalNnc.predicateOptionId === "tl-2a-to-1a") {
        next.classicalNnc.sourceClass = "tl-2-a";
        next.classicalNnc.tl2ARealization = "reclassify-1a";
        next.classicalNnc.predicateOptionId = "source-stem";
      }
      next.classicalNnc.possessorReduplication = normalizeEntradaUrlBoolean(classicalSource.possessorReduplication);
      next.classicalNnc.possessor = normalizeChoice(classicalSource.possessor, ["reciprocal", "nonspecific-human", "nonspecific-nonhuman", "1sg", "2sg", "3sg", "1pl", "2pl", "3pl"], "3sg");
      next.classicalNnc.stemRelation = normalizeChoice(classicalSource.stemRelation, ["plain", "affinity", "distributive-varietal"], "plain");
      const requestedNncOutputScope = String(classicalSource.outputScope ?? "").trim();
      const nncOutputScopeExplicit = Array.isArray(source.presentFields)
        ? source.presentFields.includes("classicalNncOutputScope")
        : Object.prototype.hasOwnProperty.call(classicalSource, "outputScope");
      const nncOutputScopeSelectionFrame = buildClassicalResultOutputScopeSelectionFrame(requestedNncOutputScope, {
        role: "nnc",
        explicit: nncOutputScopeExplicit,
        provenance: "entrada-url-cn-output"
      });
      next.classicalNnc.outputScope = nncOutputScopeSelectionFrame.outputScope;
      Object.defineProperty(next.classicalNnc, "outputScopeSelectionFrame", {
        configurable: true,
        value: nncOutputScopeSelectionFrame
      });
      next.classicalNnc.animacy = normalizeChoice(
        classicalSource.animacy,
        ["animate", "nonanimate"],
        "animate"
      );
      next.classicalNnc.humanness = normalizeChoice(
        classicalSource.humanness,
        ["human", "nonhuman", "unspecified"],
        "human"
      );
      next.classicalNnc.metaphoricalUse =
        next.classicalNnc.animacy === "animate"
        && normalizeEntradaUrlBoolean(classicalSource.metaphoricalUse);
      next.classicalNnc.clausePosition = normalizeChoice(classicalSource.clausePosition, ["initial", "noninitial"], "initial");
      next.classicalNnc.quantityPluralFormation = normalizeChoice(
        classicalSource.quantityPluralFormation,
        ["", "internal-n", "plain-variant"],
        ""
      );
      next.classicalNnc.doubledFirstPlural = normalizeEntradaUrlBoolean(classicalSource.doubledFirstPlural);
      next.classicalNnc.dependentClauseIntroducedByIn = normalizeEntradaUrlBoolean(classicalSource.dependentClauseIntroducedByIn);
      next.classicalNnc.adjunctorInMode = normalizeChoice(
        classicalSource.adjunctorInMode,
        ["none", "dependent-clause", "fused-tlein", "fused-tlei", "fused-tlen", "fused-aquin", "fused-aqui"],
        next.classicalNnc.dependentClauseIntroducedByIn ? "dependent-clause" : "none"
      );
      next.classicalNnc.specialHumanUse = normalizeEntradaUrlBoolean(classicalSource.specialHumanUse);
      const presentFields = Array.isArray(source.presentFields) ? source.presentFields.filter(field => getEntradaUrlSegmentFieldKeys().includes(field)) : null;
      if (presentFields) {
        Object.defineProperty(next, "presentFields", {
          configurable: true,
          enumerable: false,
          value: presentFields
        });
      }
      Object.defineProperty(next, "invalidComposerFields", {
        configurable: true,
        enumerable: false,
        value: Object.freeze(Array.from(invalidComposerFields))
      });
      return next;
    }
    function shouldApplyEntradaUrlSlotStemOverride(normalized = {}, slotKey = "") {
      const routeStem = normalizeClassicalNahuatlComposerStem(normalized?.slots?.[slotKey]?.stem || "");
      const stateKeys = getComposerSlotStateKeys(slotKey);
      const inputStem = normalizeClassicalNahuatlComposerStem(VerbComposerState[stateKeys.stem] || "");
      if (!hasClassicalNahuatlComposerMacron(normalized.input || inputStem || routeStem)) {
        return true;
      }
      if (!routeStem) {
        return true;
      }
      return !inputStem || inputStem === routeStem;
    }
    function getClassicalEntradaUrlSlotKeyFromFieldKey(fieldKey = "") {
      const match = String(fieldKey || "").match(/^slot([ABC])(Embed|Stem)$/u);
      return match ? match[1].toLowerCase() : "";
    }
    function getClassicalEntradaUrlSourceSelectionFrame(snapshot = {}) {
      if (typeof targetObject.requestClassicalVncSourceSelectionFrame !== "function") {
        return null;
      }
      const input = String(snapshot?.input || "").trim();
      if (!input || !input.includes("-")) {
        return null;
      }
      const sourceEmbedStem = normalizeComposerEmbedValue(snapshot?.slots?.a?.embed || "");
      const sourceMatrixStem = normalizeComposerStem(snapshot?.slots?.a?.stem || "");
      return targetObject.requestClassicalVncSourceSelectionFrame(input, {
        sourceSelectionKind: sourceEmbedStem || sourceMatrixStem ? "embed-matrix" : "",
        sourceEmbedStem,
        sourceMatrixStem
      });
    }
    function shouldBlockClassicalEntradaUrlSlotMirror(snapshot = {}, fieldKey = "") {
      const slotKey = getClassicalEntradaUrlSlotKeyFromFieldKey(fieldKey);
      if (!slotKey) {
        return false;
      }
      const sourceSelectionFrame = getClassicalEntradaUrlSourceSelectionFrame(snapshot);
      return sourceSelectionFrame?.userSelectionContradictsTypedSource === true
        || (
          sourceSelectionFrame?.selectedSourceKind === "internal-morphemes"
          && sourceSelectionFrame?.explicitUserSelection !== true
        );
    }
    function shouldTreatEntradaUrlSlotAsClassicalFuenteSourceParts(snapshot = {}, slotKey = "") {
      if (slotKey !== "a") {
        return false;
      }
      const input = String(snapshot?.input || "").trim();
      if (!input) {
        return false;
      }
      const sourceEmbedStem = normalizeComposerEmbedValue(snapshot?.slots?.a?.embed || "");
      const sourceMatrixStem = normalizeComposerStem(snapshot?.slots?.a?.stem || "");
      if (!sourceEmbedStem && !sourceMatrixStem) {
        return false;
      }
      const documentObject = typeof targetObject.document !== "undefined" ? targetObject.document : null;
      const sourcePartsRoot = documentObject?.getElementById?.("classical-source-parts") || null;
      return Boolean(sourcePartsRoot || input);
    }
    function getCurrentEntradaUrlStateSnapshot() {
      const verbEl = typeof targetObject.document !== "undefined" ? targetObject.document.getElementById("verb") : null;
      const sourcePartsRoot = typeof targetObject.document !== "undefined" ? targetObject.document.getElementById("classical-source-parts") : null;
      const builtSourceFrame = sourcePartsRoot && typeof getClassicalTypedBuiltSourceFrame === "function" ? getClassicalTypedBuiltSourceFrame(verbEl?.value || "") : null;
      const nncActive = getClassicalBasalUnitFromRuntime() === CLASSICAL_BASAL_UNIT.nnc;
      const snapshot = normalizeEntradaUrlStateSnapshot({
        input: builtSourceFrame?.displaySource || verbEl?.value || "",
        sourceLexemeId:
          getClassicalVncSourceGuideElements().sourceLexemeChoice?.value || "",
        board: getComposerEntryBoard(),
        panel: targetObject.document.querySelector(".panel-stack")?.getAttribute?.("data-active-pane")
          || targetObject.document.querySelector("[data-panel-stack-tab].is-active")?.getAttribute?.("data-panel-stack-tab")
          || "inputs",
        derivationType: typeof targetObject.getActiveDerivationType === "function"
          ? targetObject.getActiveDerivationType()
          : "direct",
        derivedVnc: buildEntradaUrlDerivedVncCapsule(),
        vncOutputScope: typeof getClassicalBasalUnitFromRuntime === "function" && getClassicalBasalUnitFromRuntime() === "vnc"
          ? targetObject.document.getElementById("classical-rule-logic-vnc-output-scope")?.value ?? "single"
          : "single",
        sentence: {
          combination: targetObject.document.getElementById("classical-rule-logic-particle-combination-shortcut")?.value || "none",
          particle: targetObject.document.getElementById("classical-rule-logic-sentence-particle")?.value || "none",
          particleHonorificized: targetObject.document.getElementById("classical-rule-logic-sentence-particle-honorific")?.checked === true,
          adverbial: targetObject.document.getElementById("classical-rule-logic-sentence-adverbial")?.value || "none",
          polarity: targetObject.document.getElementById("classical-rule-logic-polarity")?.value || "positive",
          surface: targetObject.document.getElementById("classical-rule-logic-sentence-surface")?.value || "statement",
          introductoryParticle: targetObject.document.getElementById("classical-rule-logic-introductory-particle")?.value || "none",
          prefaceParticle: targetObject.document.getElementById("classical-rule-logic-preface-particle")?.value || "none",
          introductoryModifier: targetObject.document.getElementById("classical-rule-logic-introductory-modifier")?.value || "none",
          antecessive: targetObject.document.getElementById("classical-rule-logic-prefix-stack")?.checked === true
        },
        transitivity: VerbComposerState.transitivity || "",
        valenceIntransitive: VerbComposerState.valenceIntransitive || "",
        valence: VerbComposerState.valence || "",
        valenceSecondary: VerbComposerState.valenceSecondary || "",
        directionalPrefix: VerbComposerState.directionalPrefix || "",
        supportiveMarker: VerbComposerState.supportiveMarker || "",
        slots: COMPOSER_SLOT_KEYS.reduce((acc, slotKey) => {
          const stateKeys = getComposerSlotStateKeys(slotKey);
          acc[slotKey] = {
            embed: VerbComposerState[stateKeys.embed] || "",
            stem: VerbComposerState[stateKeys.stem] || "",
            objectEmbed: VerbComposerState[stateKeys.objectEmbed] || "",
            serialType: COMPOSER_SERIAL_SLOT_TYPE_BY_SLOT[slotKey] || "auto",
            templateSuffix: getComposerStemInputTemplateSuffix(getVerbComposerElements().slots?.[slotKey]?.stemInput || null, slotKey)
          };
          return acc;
        }, {}),
        classicalNnc: {
          active: nncActive,
          sourceClass: targetObject.document.getElementById("classical-rule-logic-nnc-class")?.value || "",
          tl2ARealization: targetObject.document.getElementById("classical-rule-logic-nnc-tl2a-realization")?.value || "retain-2a",
          subject: targetObject.document.getElementById("classical-rule-logic-subject")?.value || "3common",
          state: targetObject.document.getElementById("classical-rule-logic-nnc-state")?.value || "absolutive",
          pluralConnector:
            targetObject.document.getElementById("classical-rule-logic-nnc-state")?.value === "absolutive"
              ? targetObject.document.getElementById("classical-rule-logic-nnc-plural-connector")?.value || ""
              : "",
          predicateOptionId: targetObject.document.getElementById("classical-rule-logic-nnc-predicate-form")?.value || "source-stem",
          possessorReduplication: targetObject.document.getElementById("classical-rule-logic-nnc-possessor-reduplication")?.checked === true,
          possessor: targetObject.document.getElementById("classical-rule-logic-nnc-possessor")?.value || "3sg",
          stemRelation: targetObject.document.getElementById("classical-rule-logic-nnc-stem-relation")?.value || "plain",
          outputScope: targetObject.document.getElementById("classical-rule-logic-nnc-output-scope")?.value ?? "single",
          animacy: targetObject.document.getElementById("classical-rule-logic-nnc-subject-animacy")?.value || "animate",
          humanness: targetObject.document.getElementById("classical-rule-logic-nnc-subject-humanness")?.value || "human",
          metaphoricalUse: targetObject.document.getElementById("classical-rule-logic-nnc-metaphorical-use")?.checked === true,
          clausePosition: targetObject.document.getElementById("classical-rule-logic-nnc-clause-position")?.value || "initial",
          quantityPluralFormation: targetObject.document.getElementById("classical-rule-logic-nnc-quantity-plural-formation")?.value || "",
          doubledFirstPlural: targetObject.document.getElementById("classical-rule-logic-nnc-doubled-first-plural")?.checked === true,
          adjunctorInMode: targetObject.document.getElementById("classical-rule-logic-nnc-dependent-clause-in")?.value || "none",
          dependentClauseIntroducedByIn: targetObject.document.getElementById("classical-rule-logic-nnc-dependent-clause-in")?.value === "dependent-clause",
          specialHumanUse: targetObject.document.getElementById("classical-rule-logic-nnc-special-human-use")?.checked === true
        }
      });
      const sourcePartControls = typeof getClassicalSourcePartControlElements === "function" ? getClassicalSourcePartControlElements() : {};
      if (sourcePartControls.root) {
        const sourceParts = getClassicalSourcePartControlState();
        const isEmbedMatrix = sourceParts.mode === CLASSICAL_SOURCE_PARTS_MODE.embedMatrix
          || sourceParts.sourceSelectionKind === "embed-matrix";
        snapshot.input = builtSourceFrame?.displaySource || snapshot.input || "";
        snapshot.slots.a.embed = isEmbedMatrix ? sourceParts.sourceEmbedStem : "";
        snapshot.slots.a.stem = isEmbedMatrix ? sourceParts.sourceMatrixStem : "";
      }
      return normalizeEntradaUrlStateSnapshot(snapshot);
    }
    function shouldIncludeEntradaUrlSegmentField(snapshot = {}, field = {}) {
      if (shouldBlockClassicalEntradaUrlSlotMirror(snapshot, field.key || "")) {
        return false;
      }
      const value = getEntradaUrlNestedValue(snapshot, field.path);
      const defaultValue = field.defaultValue ?? "";
      if (field.classicalNncOnly) {
        return snapshot?.classicalNnc?.active === true && value !== undefined && value !== null && !(String(value) === "" && String(defaultValue) === "");
      }
      if (field.derivedVncOnly) {
        return ["causative", "applicative"].includes(snapshot?.derivationType) && String(value || "") !== "";
      }
      if (field.key === "classicalNncEnabled") {
        // The leading `nnc` segment names the clause kind. Keep the explicit
        // activation field as state so a freshly opened link can initialize
        // the NNC controls before restoring their individual selections.
        return value === true;
      }
      if (field.key === "board") {
        return value && value !== COMPOSER_ENTRY_BOARD.general;
      }
      if (value === undefined || value === null) {
        return false;
      }
      return String(value) !== String(defaultValue);
    }
    function encodeEntradaUrlSegmentValue(value = "") {
      return encodeURIComponent(String(value ?? ""));
    }
    function decodeEntradaUrlSegmentValue(value = "") {
      try {
        return decodeURIComponent(String(value || ""));
      } catch (error) {
        return String(value || "");
      }
    }
    function normalizeEntradaUrlDerivedVncCapsule(value = "") {
      const selectedIndexByControlIndex = new Map();
      String(value || "").split(".").forEach(entry => {
        if (!/^[0-9a-z][0-9a-z]+$/u.test(entry)) {
          return;
        }
        const controlIndex = Number.parseInt(entry.slice(0, 1), 36);
        const selectedIndex = Number.parseInt(entry.slice(1), 36);
        if (!Number.isInteger(controlIndex) || controlIndex < 0 || controlIndex >= ENTRADA_URL_DERIVED_VNC_CONTROL_SPECS.length || !Number.isInteger(selectedIndex) || selectedIndex < 0 || selectedIndex >= 36) {
          return;
        }
        selectedIndexByControlIndex.set(controlIndex, selectedIndex);
      });
      return Array.from(selectedIndexByControlIndex.entries())
        .sort((left, right) => left[0] - right[0])
        .map(([controlIndex, selectedIndex]) => `${controlIndex.toString(36)}${selectedIndex.toString(36)}`)
        .join(".");
    }
    function getEntradaUrlDerivedVncControlSelectedIndex(control = null, spec = {}) {
      if (!control) {
        return -1;
      }
      if (spec.type === "checkbox") {
        return control.checked === true ? 1 : 0;
      }
      if (Array.isArray(spec.values)) {
        return spec.values.indexOf(String(control.value || ""));
      }
      return Number.isInteger(control.selectedIndex) ? control.selectedIndex : -1;
    }
    function buildEntradaUrlDerivedVncCapsule() {
      if (typeof targetObject.document === "undefined") {
        return "";
      }
      const derivationType = typeof targetObject.getActiveDerivationType === "function" ? targetObject.getActiveDerivationType() : "direct";
      if (!["causative", "applicative"].includes(derivationType)) {
        return "";
      }
      return ENTRADA_URL_DERIVED_VNC_CONTROL_SPECS.reduce((entries, spec, controlIndex) => {
        if (spec.legacySentence === true) {
          return entries;
        }
        const control = targetObject.document.getElementById(spec.id);
        const selectedIndex = getEntradaUrlDerivedVncControlSelectedIndex(control, spec);
        const defaultIndex = spec.type === "checkbox"
          ? spec.defaultValue === true ? 1 : 0
          : Array.isArray(spec.values)
            ? spec.values.indexOf(spec.defaultValue)
            : Array.from(control?.options || []).findIndex(option => option.value === spec.defaultValue);
        if (selectedIndex < 0 || selectedIndex === defaultIndex) {
          return entries;
        }
        entries.push(`${controlIndex.toString(36)}${selectedIndex.toString(36)}`);
        return entries;
      }, []).join(".");
    }
    function getEntradaUrlDerivedVncCapsuleSelections(capsule = "") {
      return normalizeEntradaUrlDerivedVncCapsule(capsule).split(".").filter(Boolean).map(entry => ({
        controlIndex: Number.parseInt(entry.slice(0, 1), 36),
        selectedIndex: Number.parseInt(entry.slice(1), 36)
      }));
    }
    function applyEntradaUrlDerivedVncStateToControls(snapshot = {}) {
      if (typeof targetObject.document === "undefined" || !["causative", "applicative"].includes(snapshot?.derivationType)) {
        return false;
      }
      const selections = getEntradaUrlDerivedVncCapsuleSelections(snapshot.derivedVnc || "");
      let appliedAny = false;
      if (!selections.length) {
        return appliedAny;
      }
      let previousSignature = "";
      for (let pass = 0; pass < 5; pass += 1) {
        selections.forEach(({ controlIndex, selectedIndex }) => {
          const spec = ENTRADA_URL_DERIVED_VNC_CONTROL_SPECS[controlIndex];
          const control = spec ? targetObject.document.getElementById(spec.id) : null;
          if (!control) {
            return;
          }
          if (spec.type === "checkbox") {
            const checked = selectedIndex === 1;
            if (control.checked !== checked) {
              control.checked = checked;
              appliedAny = true;
            }
            return;
          }
          const requestedValue = Array.isArray(spec.values)
            ? spec.values[selectedIndex]
            : control.options?.[selectedIndex]?.value;
          if (requestedValue === undefined || requestedValue === null || !Array.from(control.options || []).some(option => option.value === requestedValue && option.disabled !== true)) {
            return;
          }
          if (control.value !== requestedValue) {
            control.value = requestedValue;
            appliedAny = true;
          }
        });
        const signature = selections.map(({ controlIndex }) => {
          const spec = ENTRADA_URL_DERIVED_VNC_CONTROL_SPECS[controlIndex];
          const control = spec ? targetObject.document.getElementById(spec.id) : null;
          return `${controlIndex}:${getEntradaUrlDerivedVncControlSelectedIndex(control, spec)}`;
        }).join("|");
        if (signature === previousSignature) {
          break;
        }
        previousSignature = signature;
        if (typeof targetObject.renderClassicalRuleLogicSurfaceBlock === "function") {
          targetObject.renderClassicalRuleLogicSurfaceBlock();
        }
      }
      return appliedAny;
    }
    function buildEntradaUrlSegmentString(snapshot = null) {
      const normalized = normalizeEntradaUrlStateSnapshot(snapshot || getCurrentEntradaUrlStateSnapshot());
      if (normalized.invalidComposerFields?.length) {
        return "";
      }
      const segments = [ENTRADA_URL_SEGMENT_PREFIX, ENTRADA_URL_SEGMENT_VERSION];
      ENTRADA_URL_SEGMENT_SCHEMA.forEach(field => {
        if (!shouldIncludeEntradaUrlSegmentField(normalized, field)) {
          return;
        }
        const value = getEntradaUrlNestedValue(normalized, field.path);
        const segment = field.key === "input"
          ? normalized.classicalNnc.active === true ? "nnc" : "vnc"
          : field.segment;
        segments.push(segment, encodeEntradaUrlSegmentValue(typeof value === "boolean" ? value ? "1" : "0" : value));
      });
      return segments.length > 2 ? segments.join("/") : "";
    }
    function parseEntradaUrlSegmentString(value = "") {
      const rawSource = String(value || "").trim();
      if (!rawSource) {
        return null;
      }
      const hashStart = rawSource.indexOf("#");
      const rawHash = hashStart >= 0 ? rawSource.slice(hashStart + 1) : rawSource.replace(/^#/, "");
      const rawSegments = rawHash.split("/").filter(segment => segment !== "");
      if (!rawSegments.length || rawSegments[0] !== ENTRADA_URL_SEGMENT_PREFIX) {
        return null;
      }
      let index = 1;
      if (rawSegments[index] === ENTRADA_URL_SEGMENT_VERSION) {
        index += 1;
      } else if (/^v\d+$/u.test(String(rawSegments[index] || ""))) {
        return null;
      }
      const snapshot = createEmptyEntradaUrlStateSnapshot();
      const presentFields = [];
      for (; index < rawSegments.length; index += 2) {
        const segmentKey = rawSegments[index];
        const field = ENTRADA_URL_SEGMENT_FIELD_BY_SEGMENT[segmentKey];
        if (!field) {
          continue;
        }
        const valueSegment = rawSegments[index + 1] ?? "";
        const decodedValue = decodeEntradaUrlSegmentValue(valueSegment);
        const normalizedValue = field.type === "boolean" ? normalizeEntradaUrlBoolean(decodedValue) : decodedValue;
        setEntradaUrlNestedValue(snapshot, field.path, normalizedValue);
        presentFields.push(field.key);
        if (field.key === "input" && segmentKey === "nnc") {
          snapshot.classicalNnc.active = true;
          presentFields.push("classicalNncEnabled");
        }
      }
      snapshot.presentFields = presentFields;
      return normalizeEntradaUrlStateSnapshot(snapshot);
    }
    function buildEntradaUrlHash(snapshot = null) {
      const segmentString = buildEntradaUrlSegmentString(snapshot);
      return segmentString ? `#${segmentString}` : "";
    }
    function readEntradaUrlStateSnapshotFromLocation(locationLike = null) {
      const sourceLocation = locationLike || (typeof targetObject.window !== "undefined" ? targetObject.window.location : null);
      if (!sourceLocation) {
        return null;
      }
      return parseEntradaUrlSegmentString(sourceLocation.hash || "");
    }
    function hasEntradaUrlExplicitField(snapshot = {}, fieldKey = "") {
      const presentFields = Array.isArray(snapshot?.presentFields) ? snapshot.presentFields : null;
      return !presentFields || presentFields.includes(fieldKey);
    }
    function assignEntradaUrlComposerField(snapshot = {}, fieldKey = "", assign = () => {}) {
      if (!hasEntradaUrlExplicitField(snapshot, fieldKey)) {
        return;
      }
      assign();
    }
    function applyClassicalVncSourceLexemeRestoredState(snapshot = {}) {
      const {
        root,
        sourceLexemeFact: fact,
        sourceLexemeChoiceField: choiceField,
        sourceLexemeChoice: choice
      } = getClassicalVncSourceGuideElements();
      const selectionFrame = snapshot?.sourceLexemeSelectionFrame
        || buildClassicalVncSourceLexemeSelectionFrame(
          snapshot?.input || "",
          snapshot?.sourceLexemeId || ""
        );
      if (selectionFrame.authorizationStatus === "blocked") {
        return false;
      }
      const selectionRequired =
        selectionFrame.sourceLexemeSelectionRequired === true;
      const expectedOptionValues = selectionRequired
        ? ["", ...selectionFrame.availableSourceLexemeIds]
        : [];
      const actualOptionValues = Array.from(choice?.options || []).map(option =>
        String(option?.value || "")
      );
      const controlInventoryMatches = !selectionRequired || Boolean(
        choice
        && actualOptionValues.length === expectedOptionValues.length
        && actualOptionValues.every((value, index) =>
          value === expectedOptionValues[index]
        )
      );
      if (!controlInventoryMatches) {
        return false;
      }
      if (choiceField) {
        choiceField.hidden = !selectionRequired;
      }
      if (choice) {
        choice.disabled = !selectionRequired;
        choice.required = selectionRequired;
        choice.setAttribute?.("aria-required", String(selectionRequired));
        choice.value = selectionRequired
          ? selectionFrame.sourceLexemeId
          : "";
        if (choice.dataset) {
          choice.dataset.classicalSourceLexemeStem = selectionRequired
            ? selectionFrame.sourceStem
            : "";
          choice.dataset.classicalSourceLexemeInventoryStatus =
            selectionRequired ? "canonical-match" : "not-applicable";
        }
      }
      if (root?.dataset) {
        if (selectionRequired) {
          root.dataset.classicalVncSourceLexemeChoiceStem =
            selectionFrame.sourceStem;
          root.dataset.classicalVncSourceLexemeSelection =
            selectionFrame.sourceLexemeId;
        } else {
          delete root.dataset.classicalVncSourceLexemeChoiceStem;
          root.dataset.classicalVncSourceLexemeSelection = "not-applicable";
        }
      }
      if (fact) {
        fact.hidden = !selectionRequired;
        fact.textContent = selectionRequired
          ? "Lexical Source: this pach-i-hui verbstem names distinct pressed-down and satiated lexemes. Choose the intended Source meaning; causative formation remains a Grammar operation."
          : "";
      }
      return true;
    }
    function applyClassicalNncEntradaUrlStateToControls(snapshot = {}) {
      if (typeof targetObject.document === "undefined" || snapshot?.classicalNnc?.active !== true) {
        return false;
      }
      const explicitKeys = ["classicalNncSourceClass", "classicalNncTl2ARealization", "classicalNncSubject", "classicalNncState", "classicalNncPluralConnector", "classicalNncPredicateOptionId", "classicalNncPossessorReduplication", "classicalNncPossessor", "classicalNncStemRelation", "classicalNncOutputScope", "classicalNncAnimacy", "classicalNncHumanness", "classicalNncMetaphoricalUse", "classicalNncClausePosition", "classicalNncQuantityPluralFormation", "classicalNncDoubledFirstPlural", "classicalNncDependentClauseIntroducedByIn", "classicalNncSpecialHumanUse"];
      if (!explicitKeys.some(key => hasEntradaUrlExplicitField(snapshot, key))) {
        return false;
      }
      const subjectValue = String(snapshot.classicalNnc?.subject || "3common");
      const subjectMatch = subjectValue.match(/^([123])(sg|pl)$/u);
      const subjectPerson = subjectValue === "3common" ? "3" : subjectMatch?.[1] || "3";
      const subjectNumber = subjectValue === "3common" ? "common" : subjectMatch?.[2] === "pl" ? "plural" : "singular";
      const animacyValue = String(snapshot.classicalNnc?.animacy || "animate");
      const valuesByControl = {
        "classical-rule-logic-nnc-class": snapshot.classicalNnc?.sourceClass,
        "classical-rule-logic-nnc-tl2a-realization": snapshot.classicalNnc?.tl2ARealization,
        "classical-rule-logic-subject": snapshot.classicalNnc?.subject,
        "classical-rule-logic-nnc-subject-person": subjectPerson,
        "classical-rule-logic-nnc-subject-number": subjectNumber,
        "classical-rule-logic-nnc-subject-animacy": animacyValue === "nonanimate" ? "nonanimate" : "animate",
        "classical-rule-logic-nnc-subject-humanness": snapshot.classicalNnc?.humanness || "human",
        "classical-rule-logic-nnc-metaphorical-use": snapshot.classicalNnc?.metaphoricalUse === true,
        "classical-rule-logic-nnc-state": snapshot.classicalNnc?.state,
        "classical-rule-logic-nnc-plural-connector": snapshot.classicalNnc?.pluralConnector,
        "classical-rule-logic-nnc-predicate-form": snapshot.classicalNnc?.predicateOptionId,
        "classical-rule-logic-nnc-possessor-reduplication": snapshot.classicalNnc?.possessorReduplication,
        "classical-rule-logic-nnc-possessor": snapshot.classicalNnc?.possessor,
        "classical-rule-logic-nnc-stem-relation": snapshot.classicalNnc?.stemRelation,
        "classical-rule-logic-nnc-output-scope": snapshot.classicalNnc?.outputScope,
        "classical-rule-logic-nnc-clause-position": snapshot.classicalNnc?.clausePosition,
        "classical-rule-logic-nnc-quantity-plural-formation": snapshot.classicalNnc?.quantityPluralFormation,
        "classical-rule-logic-nnc-doubled-first-plural": snapshot.classicalNnc?.doubledFirstPlural,
        "classical-rule-logic-nnc-dependent-clause-in": snapshot.classicalNnc?.adjunctorInMode || (snapshot.classicalNnc?.dependentClauseIntroducedByIn ? "dependent-clause" : "none"),
        "classical-rule-logic-nnc-special-human-use": snapshot.classicalNnc?.specialHumanUse
      };
      let changed = false;
      Object.entries(valuesByControl).forEach(([controlId, value]) => {
        const control = targetObject.document.getElementById(controlId);
        if (!control || value === undefined || value === null) {
          return;
        }
        const normalizedValue = String(value);
        if (control.type === "checkbox") {
          const checked = value === true || normalizedValue === "true" || normalizedValue === "metaphorical";
          if (control.checked !== checked) {
            control.checked = checked;
            changed = true;
          }
          return;
        }
        if (control.tagName === "SELECT" && !Array.from(control.options || []).some(option => option.value === normalizedValue)) {
          return;
        }
        if (control.value !== normalizedValue) {
          control.value = normalizedValue;
          changed = true;
        }
      });
      return changed;
    }
    function applyEntradaUrlSentenceStateToControls(snapshot = {}) {
      if (typeof targetObject.document === "undefined") {
        return false;
      }
      const valuesByField = {
        sentenceCombination: ["classical-rule-logic-particle-combination-shortcut", snapshot.sentence?.combination],
        sentenceParticle: ["classical-rule-logic-sentence-particle", snapshot.sentence?.particle],
        sentenceParticleHonorificized: ["classical-rule-logic-sentence-particle-honorific", snapshot.sentence?.particleHonorificized],
        sentenceAdverbial: ["classical-rule-logic-sentence-adverbial", snapshot.sentence?.adverbial],
        sentencePolarity: ["classical-rule-logic-polarity", snapshot.sentence?.polarity],
        sentenceSurface: ["classical-rule-logic-sentence-surface", snapshot.sentence?.surface],
        sentenceIntroductoryParticle: ["classical-rule-logic-introductory-particle", snapshot.sentence?.introductoryParticle],
        sentencePrefaceParticle: ["classical-rule-logic-preface-particle", snapshot.sentence?.prefaceParticle],
        sentenceIntroductoryModifier: ["classical-rule-logic-introductory-modifier", snapshot.sentence?.introductoryModifier],
        sentenceAntecessive: ["classical-rule-logic-prefix-stack", snapshot.sentence?.antecessive]
      };
      let changed = false;
      Object.entries(valuesByField).forEach(([fieldKey, [controlId, value]]) => {
        if (!hasEntradaUrlExplicitField(snapshot, fieldKey)) {
          return;
        }
        const control = targetObject.document.getElementById(controlId);
        if (!control) {
          return;
        }
        if (control.type === "checkbox") {
          const checked = value === true;
          if (control.checked !== checked) {
            control.checked = checked;
            changed = true;
          }
          return;
        }
        const normalizedValue = String(value ?? "");
        if (control.tagName === "SELECT" && !Array.from(control.options || []).some(option => option.value === normalizedValue)) {
          return;
        }
        if (control.value !== normalizedValue) {
          control.value = normalizedValue;
          changed = true;
        }
      });
      if (hasEntradaUrlExplicitField(snapshot, "sentenceCombination")
        && snapshot.sentence?.combination !== "none") {
        changed = applyClassicalParticleCombinationShortcut(
          snapshot.sentence?.combination
        ) || changed;
      }
      return changed;
    }
    function applyEntradaUrlStateSnapshot(snapshot = null, options = {}) {
      if (!snapshot || typeof snapshot !== "object") {
        return false;
      }
      if (snapshot.sourceTransitivitySelectionFrame?.authorizationStatus === "blocked") {
        return false;
      }
      const normalized = normalizeEntradaUrlStateSnapshot(snapshot);
      if (normalized.invalidComposerFields?.length) {
        return false;
      }
      if (hasEntradaUrlExplicitField(normalized, "derivationType") && normalized.derivationTypeValidationFrame?.authorizationStatus === "blocked") {
        return false;
      }
      if (normalized.sourceTransitivitySelectionFrame?.authorizationStatus === "blocked") {
        return false;
      }
      if (hasEntradaUrlExplicitField(normalized, "classicalNncOutputScope") && normalized.classicalNnc?.outputScopeSelectionFrame?.authorizationStatus === "blocked") {
        return false;
      }
      if (hasEntradaUrlExplicitField(normalized, "vncOutputScope") && normalized.vncOutputScopeSelectionFrame?.authorizationStatus === "blocked") {
        return false;
      }
      if (Array.isArray(normalized.sentence?.invalidFields) && normalized.sentence.invalidFields.some(field => hasEntradaUrlExplicitField(normalized, `sentence${field.charAt(0).toUpperCase()}${field.slice(1)}`))) {
        return false;
      }
      const triggerGenerate = options.triggerGenerate !== false;
      const immediateRefresh = options.immediateRefresh === true;
      const verbEl = typeof targetObject.document !== "undefined" ? targetObject.document.getElementById("verb") : null;
      let sourceLexemeRestorationApplied = true;
      targetObject
        .clearClassicalGrammarResultSourceContinuation?.(
          "url-or-restored-state-transaction"
        );
      IsApplyingEntradaUrlSegments = true;
      try {
        if (verbEl && hasEntradaUrlExplicitField(normalized, "input")) {
          verbEl.value = normalized.input;
          verbEl.dataset.prevValue = normalized.input;
        }
        if (hasEntradaUrlExplicitField(normalized, "classicalNncEnabled")) {
          applyClassicalBasalUnitMode(
            normalized.classicalNnc.active
              ? CLASSICAL_BASAL_UNIT.nnc
              : CLASSICAL_BASAL_UNIT.vnc,
            { syncSurface: false }
          );
        }
        applyClassicalNncEntradaUrlStateToControls(normalized);
        if (hasEntradaUrlExplicitField(normalized, "panel") && typeof targetObject.setLeftPanelStackMode === "function") {
          targetObject.setLeftPanelStackMode(normalized.panel);
        }
        if (hasEntradaUrlExplicitField(normalized, "derivationType") && typeof targetObject.setActiveDerivationType === "function") {
          targetObject.setActiveDerivationType(normalized.derivationType);
          targetObject.updateDerivationTypeControl?.();
        }
        VerbComposerState.mode = VERB_INPUT_MODE.composer;
        VerbComposerState.entryBoard = COMPOSER_ENTRY_BOARD.general;
        if (verbEl && normalized.input) {
          syncComposerStateFromVerbInput(normalized.input);
          VerbComposerState.entryBoard = COMPOSER_ENTRY_BOARD.general;
        }
        assignEntradaUrlComposerField(normalized, "transitivity", () => {
          VerbComposerState.transitivity = normalized.transitivity;
        });
        assignEntradaUrlComposerField(normalized, "valenceIntransitive", () => {
          VerbComposerState.valenceIntransitive = normalized.valenceIntransitive;
        });
        assignEntradaUrlComposerField(normalized, "valence", () => {
          VerbComposerState.valence = normalized.valence;
        });
        assignEntradaUrlComposerField(normalized, "valenceSecondary", () => {
          VerbComposerState.valenceSecondary = normalized.valenceSecondary;
        });
        assignEntradaUrlComposerField(normalized, "directionalPrefix", () => {
          VerbComposerState.directionalPrefix = normalized.directionalPrefix;
        });
        assignEntradaUrlComposerField(normalized, "supportiveMarker", () => {
          VerbComposerState.supportiveMarker = normalized.supportiveMarker;
        });
        COMPOSER_SLOT_KEYS.forEach(slotKey => {
          const upperSlot = slotKey.toUpperCase();
          const stateKeys = getComposerSlotStateKeys(slotKey);
          const classicalSourceSelectionFrame = getClassicalEntradaUrlSourceSelectionFrame(normalized);
          const classicalFuenteSourceParts = shouldTreatEntradaUrlSlotAsClassicalFuenteSourceParts(normalized, slotKey);
          assignEntradaUrlComposerField(normalized, `slot${upperSlot}Embed`, () => {
            if (classicalFuenteSourceParts) {
              VerbComposerState[stateKeys.embed] = "";
              return;
            }
            if (classicalSourceSelectionFrame?.userSelectionContradictsTypedSource === true
              || (
                classicalSourceSelectionFrame?.selectedSourceKind === "internal-morphemes"
                && classicalSourceSelectionFrame?.explicitUserSelection !== true
              )) {
              VerbComposerState[stateKeys.embed] = "";
              return;
            }
            VerbComposerState[stateKeys.embed] = normalized.slots[slotKey].embed;
          });
          assignEntradaUrlComposerField(normalized, `slot${upperSlot}Stem`, () => {
            if (classicalFuenteSourceParts) {
              return;
            }
            if (classicalSourceSelectionFrame?.selectedSourceKind === "internal-morphemes"
              && classicalSourceSelectionFrame?.explicitUserSelection !== true) {
              VerbComposerState[stateKeys.stem] = classicalSourceSelectionFrame.stem || VerbComposerState[stateKeys.stem] || "";
              return;
            }
            if (shouldApplyEntradaUrlSlotStemOverride(normalized, slotKey)) {
              VerbComposerState[stateKeys.stem] = normalized.slots[slotKey].stem;
            }
          });
          assignEntradaUrlComposerField(normalized, `slot${upperSlot}ObjectEmbed`, () => {
            VerbComposerState[stateKeys.objectEmbed] = normalized.slots[slotKey].objectEmbed;
          });
          assignEntradaUrlComposerField(normalized, `slot${upperSlot}SerialType`, () => {
            COMPOSER_SERIAL_SLOT_TYPE_BY_SLOT[slotKey] = normalized.slots[slotKey].serialType;
          });
          assignEntradaUrlComposerField(normalized, `slot${upperSlot}TemplateSuffix`, () => {
            const stemInput = getVerbComposerElements().slots?.[slotKey]?.stemInput || null;
            if (!stemInput?.dataset) {
              return;
            }
            const suffix = normalized.slots[slotKey].templateSuffix;
            if (suffix) {
              stemInput.dataset.dropdownTemplateSuffix = suffix;
            } else {
              delete stemInput.dataset.dropdownTemplateSuffix;
            }
          });
        });
        if (normalized.input && !getComposerActiveStemValue()) {
          setComposerActiveSlotStem(normalized.input);
        }
        syncComposerActiveStemAndEmbedFromState();
        VerbComposerState.syllableMode = getComposerStemSyllableCount(getComposerActiveStemValue()) === 1 ? COMPOSER_SYLLABLE_MODE.monosyllable : COMPOSER_SYLLABLE_MODE.multisyllable;
        renderVerbComposerFromState();
        applyComposerStateToVerbInput({
          triggerGenerate,
          immediateRefresh
        });
        sourceLexemeRestorationApplied =
          applyClassicalVncSourceLexemeRestoredState(normalized);
        applyEntradaUrlDerivedVncStateToControls(normalized);
        applyEntradaUrlSentenceStateToControls(normalized);
        if (hasEntradaUrlExplicitField(normalized, "vncOutputScope")) {
          const vncOutputScopeControl = targetObject.document.getElementById("classical-rule-logic-vnc-output-scope");
          if (vncOutputScopeControl && vncOutputScopeControl.value !== normalized.vncOutputScope) {
            vncOutputScopeControl.value = normalized.vncOutputScope;
            targetObject.renderClassicalRuleLogicSurfaceBlock?.();
          }
        }
        if (!triggerGenerate && verbEl && normalized.input && !verbEl.value) {
          verbEl.value = normalized.input;
          verbEl.dataset.prevValue = normalized.input;
        }
      } finally {
        IsApplyingEntradaUrlSegments = false;
      }
      if (!sourceLexemeRestorationApplied) {
        return false;
      }
      // Source reconstruction and its dependent controls are now stable.
      // Restore explicit NNC grammar choices before producing the Result.
      applyClassicalNncEntradaUrlStateToControls(normalized);
      // URL restoration is a state transaction. Its finalizer must project the
      // restored typed state into Result for either nuclear-clause kind, even
      // during the initial non-generating restore. Previously only NNC received
      // this final render, leaving a restored VNC with authorized engine output
      // but an empty #3 Result panel.
      if (normalized.input && typeof targetObject.renderClassicalRuleLogicSurfaceBlock === "function") {
        targetObject.renderClassicalRuleLogicSurfaceBlock();
      }
      if (options.syncUrl === true) {
        syncEntradaUrlSegmentsFromCurrentState({
          replace: true
        });
      }
      return true;
    }
    function applyEntradaUrlSegmentsFromLocation(options = {}) {
      const sourceLocation = options.location
        || (typeof targetObject.window !== "undefined"
          ? targetObject.window.location
          : null);
      const snapshot = readEntradaUrlStateSnapshotFromLocation(sourceLocation);
      if (!snapshot) {
        const retiredLegacyHash = /^#entrada(?:\/|$)/u.test(
          String(sourceLocation?.hash || "")
        );
        if (retiredLegacyHash) {
          const historyObject = options.history
            || targetObject.window?.history;
          const cleanUrl = `${sourceLocation?.pathname || ""}${sourceLocation?.search || ""}`;
          if (typeof historyObject?.replaceState === "function") {
            historyObject.replaceState(null, "", cleanUrl || "/");
          } else if (sourceLocation) {
            sourceLocation.hash = "";
          }
          [
            "verb",
            "classical-source-whole",
            "classical-source-embed",
            "classical-source-matrix"
          ].forEach(id => {
            const input = targetObject.document?.getElementById?.(id);
            if (input) input.value = "";
          });
          ClassicalSourcePartsCommittedSignature = "";
          setClassicalSourcePartsPendingState(false);
          targetObject.clearClassicalVncResultSourceContinuation?.(
            "retired-legacy-url"
          );
          targetObject.clearClassicalRuleLogicSurfaceBlock?.();
          const resultBlock = targetObject.document?.getElementById?.(
            "classical-rule-logic-surface"
          );
          if (resultBlock) {
            resultBlock.replaceChildren?.();
            resultBlock.innerHTML = "";
            resultBlock.hidden = true;
            if (resultBlock.dataset) {
              delete resultBlock.dataset.classicalNahuatlSurfaceVisible;
              delete resultBlock.dataset.classicalNahuatlSurfaceStatus;
              delete resultBlock.dataset.classicalNahuatlSurfaceFormula;
            }
          }
          targetObject.setLeftPanelStackMode?.("inputs");
        }
        return false;
      }
      return applyEntradaUrlStateSnapshot(snapshot, options);
    }
    function syncEntradaUrlSegmentsFromCurrentState(options = {}) {
      if (IsApplyingEntradaUrlSegments || typeof targetObject.window === "undefined") {
        return "";
      }
      const locationObject = options.location || targetObject.window.location;
      const historyObject = options.history || targetObject.window.history;
      if (!locationObject) {
        return "";
      }
      const nextHash = buildEntradaUrlHash();
      const currentHash = String(locationObject.hash || "");
      if (!nextHash && !currentHash.startsWith(`#${ENTRADA_URL_SEGMENT_PREFIX}`)) {
        return "";
      }
      if (currentHash === nextHash) {
        return nextHash;
      }
      const nextUrl = `${locationObject.pathname || ""}${locationObject.search || ""}${nextHash}`;
      if (options.replace !== false && historyObject && typeof historyObject.replaceState === "function") {
        historyObject.replaceState(null, "", nextUrl || nextHash || locationObject.pathname || "");
      } else {
        locationObject.hash = nextHash;
      }
      return nextHash;
    }
    function queueEntradaUrlSegmentSync() {
      if (IsApplyingEntradaUrlSegments || typeof targetObject.window === "undefined") {
        return;
      }
      if (EntradaUrlSegmentSyncTimer) {
        targetObject.window.clearTimeout(EntradaUrlSegmentSyncTimer);
      }
      EntradaUrlSegmentSyncTimer = targetObject.window.setTimeout(() => {
        EntradaUrlSegmentSyncTimer = null;
        syncEntradaUrlSegmentsFromCurrentState({
          replace: true
        });
      }, 0);
    }
    function scheduleClassicalResultScopeRefresh() {
      if (typeof targetObject.window === "undefined") {
        return false;
      }
      if (ClassicalResultScopeRefreshTimer) {
        targetObject.window.clearTimeout(ClassicalResultScopeRefreshTimer);
      }
      ClassicalResultScopeRefreshTimer = targetObject.window.setTimeout(() => {
        ClassicalResultScopeRefreshTimer = null;
        if (typeof targetObject.renderClassicalRuleLogicSurfaceBlock === "function") {
          targetObject.renderClassicalRuleLogicSurfaceBlock();
        }
      }, 0);
      return true;
    }
    function isEntradaUrlSyncEventTarget(target = null) {
      if (!target || typeof target.closest !== "function") {
        return false;
      }
      return Boolean(target.closest("#container-inputs, #classical-authority-panel, #classical-result-panel"));
    }
    function isEntradaUrlImmediateSyncEventTarget(target = null) {
      if (!target || typeof target.closest !== "function") {
        return false;
      }
      if (target.closest("[data-derivation-type]")) {
        return true;
      }
      if (target.closest("[data-classical-result-scope-control]")) {
        return true;
      }
      const derivationType = typeof targetObject.getActiveDerivationType === "function" ? targetObject.getActiveDerivationType() : "direct";
      return ["causative", "applicative"].includes(derivationType)
        && Boolean(target.closest("[data-classical-rule-logic-control]"));
    }
    function initEntradaUrlSegments() {
      if (typeof targetObject.document === "undefined" || typeof targetObject.window === "undefined") {
        return false;
      }
      if (EntradaUrlSegmentsInitialized) {
        return true;
      }
      EntradaUrlSegmentsInitialized = true;
      applyEntradaUrlSegmentsFromLocation({
        triggerGenerate: false,
        immediateRefresh: false
      });
      const handleEntradaMutation = event => {
        const target = event?.target || null;
        const isLiveTextEdit = event?.type === "input" && Boolean(target?.matches?.('input[type="text"], input[type="search"], textarea'));
        if ((event?.type === "input" || event?.type === "change") && isClassicalCausativeParticipantControl(target)) {
          syncEntradaUrlSegmentsFromCurrentState({
            replace: true
          });
          scheduleClassicalCausativeParticipantControlRefresh(event);
          return;
        }
        if ((event?.type === "click" || event?.type === "change" || event?.type === "input") && isEntradaUrlImmediateSyncEventTarget(target)) {
          if (EntradaUrlSegmentSyncTimer) {
            targetObject.window.clearTimeout(EntradaUrlSegmentSyncTimer);
            EntradaUrlSegmentSyncTimer = null;
          }
          syncEntradaUrlSegmentsFromCurrentState({
            replace: true
          });
          if (
            (event?.type === "input" || event?.type === "change")
            && target?.closest?.("[data-classical-result-scope-control]")
          ) {
            scheduleClassicalResultScopeRefresh();
          }
          return;
        }
        if (!isLiveTextEdit && isEntradaUrlSyncEventTarget(target)) {
          queueEntradaUrlSegmentSync();
        }
      };
      // Capture derived Authority edits before their renderer listeners replace
      // dynamic controls, so an immediate refresh cannot lose the new choice.
      targetObject.document.addEventListener("input", handleEntradaMutation, true);
      targetObject.document.addEventListener("change", handleEntradaMutation, true);
      targetObject.document.addEventListener("click", handleEntradaMutation);
      targetObject.document.addEventListener("app:panel-stack-changed", queueEntradaUrlSegmentSync);
      targetObject.window.addEventListener("hashchange", () => {
        applyEntradaUrlSegmentsFromLocation({
          triggerGenerate: true,
          immediateRefresh: true
        });
      });
      queueEntradaUrlSegmentSync();
      return true;
    }
    function resolveComposerDirectionalPrefixFromBase(baseValue = "") {
      const base = String(baseValue || "").toLowerCase();
      if (!base) {
        return "";
      }
      const tokens = base.split(/[-/]/).map(token => String(token || "").trim().toLowerCase().replace(/^-+/, "")).filter(Boolean);
      for (let index = 0; index < tokens.length; index += 1) {
        const bracketDirectional = getComposerBracketDirectionalPrefixToken(tokens[index]);
        if (bracketDirectional) {
          return bracketDirectional;
        }
      }
      return "";
    }
    function resolveComposerValenceSequenceFromParsed(parsed, baseValue) {
      if (!parsed) {
        return [];
      }
      if (parsed.hasImpersonalTlaPrefix) {
        return ["tla"];
      }
      const normalizeValenceToken = value => String(value || "").trim();
      const inOptions = value => {
        const token = normalizeValenceToken(value);
        return Boolean(getComposerValenceFamilyToken(token));
      };
      const sequence = [];
      const addToken = value => {
        const token = normalizeValenceToken(value);
        if (inOptions(token)) {
          sequence.push(token);
        }
      };
      // Parser-first: reverberate parsed structure into composer selections.
      addToken(parsed.indirectObjectMarker);
      addToken(parsed.directObjectToken);
      const fusionPrefixes = Array.isArray(parsed.fusionPrefixes) ? parsed.fusionPrefixes : [];
      for (let index = 0; index < fusionPrefixes.length; index += 1) {
        addToken(fusionPrefixes[index]);
      }
      if (sequence.length) {
        return sequence;
      }
      const valenceSlots = Array.isArray(parsed.valenceSlots) ? parsed.valenceSlots : [];
      for (let index = 0; index < valenceSlots.length; index += 1) {
        addToken(valenceSlots[index]);
      }
      if (sequence.length) {
        return sequence;
      }
      // Fallback for partial developer typing only when separators are structurally valid.
      if (targetObject.getInvalidVerbStructure(baseValue, {
        allowPartial: true,
        expectRegexEnvelope: false
      })) {
        return sequence;
      }
      const base = String(baseValue || "");
      const matches = base.matchAll(/(?:^|[-/])\(([^)]+)\)(?=-|\/)/g);
      for (const match of matches) {
        addToken(targetObject.normalizeExplicitValenceToken(match[1]));
      }
      return sequence;
    }
    function resolveComposerValenceEmbedStateFromBase(baseValue, resolvedValences = [], resolvedDirectional = "") {
      const result = {
        primary: "",
        secondary: "",
        global: ""
      };
      if (targetObject.getInvalidVerbStructure(baseValue, {
        allowPartial: true,
        expectRegexEnvelope: false
      })) {
        return result;
      }
      const rawParts = String(baseValue || "").split(/[-/]/).map(part => String(part || "").trim().toLowerCase().replace(/^-+/, "")).filter(Boolean);
      const normalizedParts = rawParts.map(part => normalizeComposerStem(part));
      if (normalizedParts.length < 2) {
        return result;
      }
      const directionalToken = normalizeComposerDirectionalPrefix(resolvedDirectional);
      const isDirectionalPartAtIndex = index => {
        const rawToken = rawParts[index] || "";
        return Boolean(getComposerBracketDirectionalPrefixToken(rawToken));
      };
      let startIndex = 0;
      if (directionalToken && normalizedParts[0] === directionalToken) {
        startIndex = 1;
      } else if (isDirectionalPartAtIndex(0)) {
        startIndex = 1;
      }
      const nonStemParts = normalizedParts.slice(startIndex, -1);
      const nonStemRawParts = rawParts.slice(startIndex, -1);
      if (!nonStemParts.length) {
        return result;
      }
      const isValenceToken = token => Boolean(token) && Boolean(getComposerValenceFamilyToken(token)) && token !== "";
      const expectedValenceCount = (Array.isArray(resolvedValences) ? resolvedValences : [resolvedValences]).map(token => normalizeComposerStem(token)).filter(token => isValenceToken(token)).length;
      const consumedEmbedIndexes = new Set();
      const valenceEmbeds = [];
      if (expectedValenceCount > 0) {
        for (let index = 0; index < nonStemParts.length; index += 1) {
          const token = nonStemParts[index];
          if (!isValenceToken(token)) {
            continue;
          }
          let embedToken = "";
          const prevIndex = index - 1;
          if (prevIndex >= 0 && !consumedEmbedIndexes.has(prevIndex)) {
            const previous = nonStemParts[prevIndex];
            const previousRaw = nonStemRawParts[prevIndex] || "";
            const previousIsDirectional = previous === directionalToken || Boolean(getComposerBracketDirectionalPrefixToken(previousRaw));
            if (previous && !isValenceToken(previous) && !previousIsDirectional && !OBJECT_MARKERS.has(previous)) {
              embedToken = previous;
              consumedEmbedIndexes.add(prevIndex);
            }
          }
          valenceEmbeds.push(embedToken);
        }
      }
      const mappedEmbeds = expectedValenceCount > 0 ? valenceEmbeds.slice(0, expectedValenceCount) : [];
      result.primary = mappedEmbeds[0] || "";
      result.secondary = mappedEmbeds[1] || "";
      const globalTokens = [];
      for (let index = 0; index < nonStemParts.length; index += 1) {
        const token = nonStemParts[index];
        const rawToken = nonStemRawParts[index] || "";
        if (!token || consumedEmbedIndexes.has(index) || isValenceToken(token)) {
          continue;
        }
        if (token === directionalToken || Boolean(getComposerBracketDirectionalPrefixToken(rawToken))) {
          continue;
        }
        if (OBJECT_MARKERS.has(token)) {
          continue;
        }
        globalTokens.push(token);
      }
      result.global = normalizeComposerEmbedValue(globalTokens);
      return result;
    }
    function resolveComposerNoPrefixValenceEmbedsFromBase(baseValue, resolvedDirectional = "") {
      if (targetObject.getInvalidVerbStructure(baseValue, {
        allowPartial: true,
        expectRegexEnvelope: false
      })) {
        return [];
      }
      const raw = String(baseValue || "");
      const lastDashIndex = raw.lastIndexOf("-");
      if (lastDashIndex <= 0) {
        return [];
      }
      const directionalToken = normalizeComposerDirectionalPrefix(resolvedDirectional);
      const prefixChunk = raw.slice(0, lastDashIndex);
      return prefixChunk.split(/[-/]/).map(part => String(part || "").trim().toLowerCase().replace(/^-+/, "")).filter(Boolean).map(rawToken => ({
        rawToken,
        token: normalizeComposerStem(rawToken)
      })).filter(({
        token
      }) => Boolean(token)).filter(({
        rawToken,
        token
      }) => {
        if (!token) {
          return false;
        }
        if (token === directionalToken || Boolean(getComposerBracketDirectionalPrefixToken(rawToken))) {
          return false;
        }
        if (getComposerValenceFamilyToken(token)) {
          return false;
        }
        if (OBJECT_MARKERS.has(token)) {
          return false;
        }
        return true;
      }).map(({
        token
      }) => token);
    }
    function resolveComposerEmbedFromParsed(parsed, resolvedValences = [], resolvedDirectional = "", baseValue = "") {
      if (!parsed) {
        return "";
      }
      const normalizeToken = value => normalizeComposerStem(value);
      const directionalToken = normalizeComposerDirectionalPrefix(resolvedDirectional);
      const valenceTokenSet = new Set((Array.isArray(resolvedValences) ? resolvedValences : [resolvedValences]).map(token => normalizeToken(token)).filter(Boolean));
      const embedded = [];
      const addTokens = tokens => {
        tokens.forEach(token => {
          const rawToken = String(token || "").trim().toLowerCase();
          const normalized = normalizeToken(rawToken);
          if (!normalized) {
            return;
          }
          if (normalized === directionalToken || Boolean(getComposerBracketDirectionalPrefixToken(rawToken))) {
            return;
          }
          if (valenceTokenSet.has(normalized) || getComposerValenceFamilyToken(normalized)) {
            return;
          }
          if (OBJECT_MARKERS.has(normalized)) {
            return;
          }
          embedded.push(normalized);
        });
      };
      const boundPrefixes = Array.isArray(parsed.boundPrefixes) ? parsed.boundPrefixes : [];
      const boundExplicitFlags = Array.isArray(parsed.boundExplicitFlags) ? parsed.boundExplicitFlags : [];
      const fusionPrefixes = Array.isArray(parsed.fusionPrefixes) ? parsed.fusionPrefixes : [];
      const lexicalBoundPrefixes = Array.isArray(parsed.lexicalBoundPrefixes) ? parsed.lexicalBoundPrefixes : Array.isArray(parsed.canonical?.lexicalBoundPrefixes) ? parsed.canonical.lexicalBoundPrefixes : targetObject.getLexicalBoundPrefixes(boundPrefixes, boundExplicitFlags);
      if (lexicalBoundPrefixes.length) {
        addTokens(lexicalBoundPrefixes);
      } else if (boundPrefixes.length) {
        addTokens(boundPrefixes);
      } else if (fusionPrefixes.length) {
        addTokens(fusionPrefixes);
      }
      return normalizeComposerEmbedValue(embedded);
    }
    function parseComposerStateFromRegexValue(rawValue) {
      const currentRegexParseOperationFrame = targetObject.buildCurrentRegexParseOperationFrameFromRawInput(rawValue);
      const state = targetObject.buildComposerStateFromCurrentRegexParseOperationFrame(rawValue, currentRegexParseOperationFrame);
      return state && typeof state === "object" ? state : targetObject.createEmptyComposerRegexState(rawValue);
    }
    function renderVerbComposerFromState() {
      const {
        panel,
        entryBoardTabsHost,
        entryBoardButtons,
        slots,
        transitivitySelect,
        valenceSelectIntransitive,
        valenceSelect,
        valenceSelectSecondary,
        directionalSelect,
        clearTextboxesButton,
        supportiveICheckbox
      } = getVerbComposerElements();
      const isComposer = isVerbInputModeComposer();
      const activeBoard = getComposerEntryBoard();
      const nncActive = getClassicalBasalUnitFromRuntime() === CLASSICAL_BASAL_UNIT.nnc;
      const verbInput = targetObject.document.getElementById("verb");
      const verbMirror = getVerbMirror();
      const verbMirrorContent = getVerbMirrorContent();
      targetObject.document.body.classList.toggle("is-composer-input-mode", isComposer);
      if (verbInput) {
        const isCommittedSourceMirror =
          verbInput.dataset.classicalSourceInputRole === "machine-mirror"
          || verbInput.dataset.classicalSourceMirror === "runtime-only";
        verbInput.readOnly = isCommittedSourceMirror;
        verbInput.setAttribute(
          "aria-readonly",
          String(isCommittedSourceMirror)
        );
        verbInput.tabIndex = isCommittedSourceMirror ? -1 : 0;
      }
      if (verbMirror) {
        verbMirror.setAttribute("aria-hidden", "true");
      }
      if (verbMirrorContent) {
        verbMirrorContent.setAttribute("contenteditable", "false");
        verbMirrorContent.tabIndex = -1;
        verbMirrorContent.setAttribute("aria-hidden", "true");
        verbMirrorContent.setAttribute("aria-readonly", "true");
      }
      updateVerbInputPlaceholder();
      if (panel) {
        panel.classList.toggle("is-hidden", !isComposer);
        panel.setAttribute("aria-hidden", String(!isComposer));
        panel.inert = !isComposer;
        panel.dataset.entryBoard = nncActive ? "nnc" : activeBoard;
      }
      if (entryBoardTabsHost) {
        entryBoardTabsHost.hidden = false;
        entryBoardTabsHost.setAttribute("aria-hidden", "false");
      }
      const placeholder = targetObject.document.getElementById("verb-composer-placeholder");
      if (placeholder) {
        placeholder.hidden = isComposer;
        placeholder.setAttribute("aria-hidden", String(isComposer));
      }
      updateCalcInputModeButtons();
      if (clearTextboxesButton) {
        clearTextboxesButton.disabled = !isComposer;
        clearTextboxesButton.setAttribute("aria-disabled", String(!isComposer));
      }
      Array.from(entryBoardButtons || []).forEach(button => {
        const board = normalizeComposerEntryBoard(button.getAttribute("data-composer-entry-board") || "");
        const isActive = isComposer && board === activeBoard;
        button.dataset.sourceTargetPerception = "clause-type-source-route-options";
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
        button.tabIndex = 0;
      });
      COMPOSER_SLOT_KEYS.forEach(slotKey => {
        const slotRefs = slots[slotKey] || {};
        const stateKeys = getComposerSlotStateKeys(slotKey);
        if (slotRefs.embedInput) {
          slotRefs.embedInput.value = normalizeComposerEmbedValue(VerbComposerState[stateKeys.embed] || "");
        }
        if (slotRefs.stemInput) {
          const rawStem = normalizeComposerStem(VerbComposerState[stateKeys.stem] || "");
          const matrixInputRow = slotRefs.stemInput.closest(".verb-composer__matrix-input-row");
          const matrixInputTag = matrixInputRow ? matrixInputRow.querySelector(".verb-composer__tagged-input-tag") : null;
          const matrixLabel = slotRefs.matrixField ? slotRefs.matrixField.querySelector(".verb-composer__matrix-head > .verb-composer__sub-label") : null;
          if (matrixLabel) {
            matrixLabel.textContent = getComposerMatrixFieldLabel({
              nncActive,
              activeBoard
            });
          }
          if (matrixInputTag) {
            matrixInputTag.textContent = getComposerMatrixInputTagLabel({
              nncActive,
              activeBoard
            });
          }
          slotRefs.stemInput.placeholder = "";
          slotRefs.stemInput.value = formatComposerStemForInputDisplay(rawStem, {
            slotKey,
            preferSplitFromStem: true,
            templateSuffix: getComposerStemInputTemplateSuffix(slotRefs.stemInput, slotKey)
          });
        }
        if (slotRefs.objectInput) {
          slotRefs.objectInput.value = normalizeComposerEmbedValue(VerbComposerState[stateKeys.objectEmbed] || "");
        }
      });
      if (transitivitySelect) {
        transitivitySelect.value = isComposerTransitivitySelected() ? VerbComposerState.transitivity : "";
      }
      if (valenceSelectIntransitive) {
        VerbComposerState.valenceIntransitive = normalizeComposerSecondaryValenceSurfaceToken(VerbComposerState.valenceIntransitive);
        valenceSelectIntransitive.value = VerbComposerState.valenceIntransitive;
      }
      if (valenceSelect) {
        VerbComposerState.valence = normalizeComposerSecondaryValenceSurfaceToken(VerbComposerState.valence);
        valenceSelect.value = VerbComposerState.valence;
      }
      if (valenceSelectSecondary) {
        VerbComposerState.valenceSecondary = normalizeComposerSecondaryValenceSelection(VerbComposerState.valenceSecondary);
        valenceSelectSecondary.value = VerbComposerState.valenceSecondary;
      }
      if (directionalSelect) {
        VerbComposerState.directionalPrefix = normalizeComposerDirectionalPrefix(VerbComposerState.directionalPrefix || "");
        directionalSelect.value = VerbComposerState.directionalPrefix;
      }
      syncComposerSupportiveMarkerFromState();
      if (supportiveICheckbox) {
        supportiveICheckbox.checked = targetObject.hasSupportiveMarkerValue(getComposerSupportiveMarker());
      }
      syncComposerEmbedUiFromState();
      syncComposerActiveStemAndEmbedFromState();
      syncComposerSupportiveIAvailability();
      syncComposerValenceAvailability();
      syncComposerChipGroupsFromState();
      syncComposerMatrixStemAffixSelects();
      syncComposerMatrixSerialUi();
      syncComposerSerialTypeChips();
      syncComposerSlotEntryButtons();
      syncComposerSupportiveITogglePlacement();
      updateVerbComposerHint();
      syncVerbScreenCalculatorState();
      targetObject.updateCalcSummaryAndStatus();
    }
    function syncComposerStateFromVerbInput(rawValue = "") {
      const baseValue = String(targetObject.getSearchInputBase(rawValue || "") || "").toLowerCase().trim();
      if (getClassicalBasalUnitFromRuntime() === CLASSICAL_BASAL_UNIT.nnc) {
        const stem = normalizeClassicalFuenteSourcePartStem(baseValue.replace(/[()]/g, ""));
        VerbComposerState.transitivity = "";
        VerbComposerState.valenceIntransitive = "";
        VerbComposerState.valenceIntransitiveEmbed = "";
        VerbComposerState.valence = "";
        VerbComposerState.valenceEmbedPrimary = "";
        VerbComposerState.valenceSecondary = "";
        VerbComposerState.valenceEmbedSecondary = "";
        VerbComposerState.slotAEmbed = "";
        VerbComposerState.slotAStem = stem;
        VerbComposerState.slotBEmbed = "";
        VerbComposerState.slotBStem = "";
        VerbComposerState.slotCEmbed = "";
        VerbComposerState.slotCStem = "";
        VerbComposerState.directionalPrefix = "";
        VerbComposerState.embedPrefix = "";
        VerbComposerState.supportiveMarker = "";
        VerbComposerState.syllableMode = getComposerStemSyllableCount(stem) === 1 ? COMPOSER_SYLLABLE_MODE.monosyllable : COMPOSER_SYLLABLE_MODE.multisyllable;
        VerbComposerState.sourceBase = stem;
        VerbComposerState.stemManualOverride = true;
        return;
      }
      if (!baseValue) {
        VerbComposerState.sourceBase = "";
        VerbComposerState.stemManualOverride = false;
        return;
      }
      const next = parseComposerStateFromRegexValue(rawValue);
      const nextTiCausativeClass = targetObject.normalizeTiCausativeClass(targetObject.getRawInputTiCausativeMetadata(rawValue).tiCausativeClass || "");
      VerbComposerState.transitivity = next.transitivity;
      VerbComposerState.valenceIntransitive = normalizeComposerSecondaryValenceSurfaceToken(next.valenceIntransitive);
      VerbComposerState.valenceIntransitiveEmbed = next.valenceIntransitiveEmbed;
      VerbComposerState.valence = normalizeComposerSecondaryValenceSurfaceToken(next.valence);
      VerbComposerState.valenceEmbedPrimary = next.valenceEmbedPrimary;
      VerbComposerState.valenceSecondary = normalizeComposerSecondaryValenceSelection(next.valenceSecondary);
      VerbComposerState.valenceEmbedSecondary = next.valenceEmbedSecondary;
      VerbComposerState.slotAEmbed = next.slotAEmbed;
      VerbComposerState.slotAStem = next.slotAStem;
      VerbComposerState.slotBEmbed = next.slotBEmbed;
      VerbComposerState.slotBStem = next.slotBStem;
      VerbComposerState.slotCEmbed = next.slotCEmbed;
      VerbComposerState.slotCStem = next.slotCStem;
      VerbComposerState.directionalPrefix = normalizeComposerDirectionalPrefix(next.directionalPrefix)
        || resolveComposerDirectionalPrefixFromBase(baseValue);
      VerbComposerState.embedPrefix = next.embedPrefix;
      VerbComposerState.supportiveMarker = targetObject.normalizeSupportiveMarkerValue(next.supportiveMarker || "");
      VerbComposerState.syllableMode = next.syllableMode;
      const activeSlot = next.transitivity === COMPOSER_TRANSITIVITY.bitransitive ? "c" : next.transitivity === COMPOSER_TRANSITIVITY.transitive ? "b" : "a";
      const activeStem = activeSlot === "c" ? next.slotCStem : activeSlot === "b" ? next.slotBStem : next.slotAStem;
      const normalizedActiveStem = normalizeComposerStem(activeStem || "");
      if (/ti$/i.test(normalizedActiveStem)) {
        COMPOSER_SERIAL_SLOT_TYPE_BY_SLOT[activeSlot] = nextTiCausativeClass === "become" ? "ti-become" : nextTiCausativeClass === "have" ? "ti-have" : "auto";
      }
      const isPlainSource = /^[a-z]+$/.test(baseValue);
      if (isPlainSource) {
        VerbComposerState.sourceBase = normalizeComposerStem(baseValue);
        VerbComposerState.stemManualOverride = false;
      }
    }
    function applyComposerStateToVerbInput(options = {}) {
      const triggerGenerate = options.triggerGenerate !== false;
      const immediateRefresh = options.immediateRefresh === true;
      const verbEl = targetObject.document.getElementById("verb");
      if (!verbEl) {
        return;
      }
      const composerDisplayBundle = buildComposerModeBundle(VerbComposerState, verbEl.value || "");
      const nextBase = isVerbInputModeComposer() ? composerDisplayBundle.regexValue : composerDisplayBundle.regexValue;
      VerbComposerState.isApplying = true;
      try {
        verbEl.value = nextBase;
        if (triggerGenerate) {
          verbEl.dispatchEvent(new targetObject.Event("input", {
            bubbles: true
          }));
          if (immediateRefresh) {
            scheduleVerbInputRefresh(verbEl.value, {
              immediate: true,
              source: "immediate"
            });
          }
        }
      } finally {
        VerbComposerState.isApplying = false;
      }
    }
    function shouldComposerControlChangeRefreshImmediately(source = "") {
      const normalizedSource = String(source || "").trim().toLowerCase();
      if (!normalizedSource) {
        return false;
      }
      if (normalizedSource.includes("chip") || normalizedSource.includes("button") || normalizedSource.includes("toggle") || normalizedSource === "supportive") {
        return true;
      }
      const activeElement = targetObject.document.activeElement;
      const isTextLikeComposerInput = Boolean(activeElement && activeElement.tagName === "INPUT" && ["text", "search"].includes(String(activeElement.type || "").toLowerCase()) && activeElement.classList?.contains("verb-composer__input") && !activeElement.readOnly && !activeElement.disabled);
      // Keep typing in composer textboxes debounced; all other interactions refresh now.
      return !isTextLikeComposerInput;
    }
    function collectComposerStateFromControls({
      preserveSupportiveState = false
    } = {}) {
      const {
        slots,
        transitivitySelect,
        valenceSelectIntransitive,
        valenceSelect,
        valenceSelectSecondary,
        directionalSelect,
        supportiveICheckbox
      } = getVerbComposerElements();
      if (COMPOSER_TRANSITIVITY_ORDER.includes(transitivitySelect?.value)) {
        VerbComposerState.transitivity = transitivitySelect.value;
      } else if (!isComposerTransitivitySelected()) {
        VerbComposerState.transitivity = "";
      }
      VerbComposerState.valenceIntransitive = normalizeComposerSecondaryValenceSurfaceToken(valenceSelectIntransitive?.value || "");
      VerbComposerState.valence = normalizeComposerSecondaryValenceSurfaceToken(valenceSelect?.value || "");
      VerbComposerState.valenceSecondary = normalizeComposerSecondaryValenceSelection(valenceSelectSecondary?.value || "");
      COMPOSER_SLOT_KEYS.forEach(slotKey => {
        const stateKeys = getComposerSlotStateKeys(slotKey);
        const slotRefs = slots[slotKey] || {};
        const previousStem = normalizeComposerStem(VerbComposerState[stateKeys.stem] || "");
        const nextEmbed = normalizeComposerEmbedValue(slotRefs.embedInput?.value || "");
        let nextStem = getComposerCanonicalStemFromInputValue(slotRefs.stemInput?.value || "", slotKey);
        if (!nextStem && nextEmbed && previousStem) {
          nextStem = previousStem;
        }
        VerbComposerState[stateKeys.embed] = nextEmbed;
        VerbComposerState[stateKeys.stem] = nextStem;
        VerbComposerState[stateKeys.objectEmbed] = normalizeComposerEmbedValue(slotRefs.objectInput?.value || "");
      });
      VerbComposerState.directionalPrefix = normalizeComposerDirectionalPrefix(directionalSelect?.value || "");
      syncComposerActiveStemAndEmbedFromState();
      VerbComposerState.syllableMode = getComposerStemSyllableCount(getComposerActiveStemValue()) === 1 ? COMPOSER_SYLLABLE_MODE.monosyllable : COMPOSER_SYLLABLE_MODE.multisyllable;
      const supportiveRequested = Boolean(supportiveICheckbox?.checked);
      const currentSupportiveMarker = getComposerSupportiveMarker();
      const candidateSupportiveMarker = getComposerSupportiveMarkerCandidate();
      if (supportiveRequested) {
        VerbComposerState.supportiveMarker = candidateSupportiveMarker || (preserveSupportiveState ? currentSupportiveMarker : "") || "";
      } else {
        VerbComposerState.supportiveMarker = "";
      }
    }
    function maybeDeriveComposerStemFromSelectionsSource() {
      if (VerbComposerState.stemManualOverride) {
        return null;
      }
      const sourceBase = normalizeComposerStem(VerbComposerState.sourceBase || "");
      if (!sourceBase) {
        return null;
      }
      const derived = deriveComposerStemFromSelections(sourceBase, VerbComposerState);
      if (derived && derived.stem) {
        setComposerActiveSlotStem(derived.stem);
      }
      return derived;
    }
    function deriveComposerStemFromSelections(rawBase, state) {
      const baseStem = normalizeComposerStem(rawBase);
      const fallbackStem = normalizeComposerStem(state?.stem || "");
      const result = {
        stem: baseStem || fallbackStem,
        consumed: [],
        warnings: []
      };
      if (!baseStem) {
        result.warnings.push("No hay base para componer.");
        return result;
      }
      let working = baseStem;
      const directionalPrefix = normalizeComposerDirectionalPrefix(state?.directionalPrefix || "");
      if (directionalPrefix) {
        if (working.startsWith(directionalPrefix)) {
          working = working.slice(directionalPrefix.length);
          result.consumed.push(`[${directionalPrefix}]/`);
        } else {
          result.warnings.push(`La base no inicia con el direccional ${directionalPrefix}.`);
        }
      }
      const secondaryPair = state?.transitivity === COMPOSER_TRANSITIVITY.bitransitive ? parseComposerSecondaryValenceSelection(state?.valenceSecondary || "") : {
        first: "",
        second: ""
      };
      const primaryValence = state?.transitivity === COMPOSER_TRANSITIVITY.intransitive ? normalizeComposerStem(state?.valenceIntransitive || "") : state?.transitivity === COMPOSER_TRANSITIVITY.bitransitive ? normalizeComposerStem(secondaryPair.first || "") : normalizeComposerStem(state?.valence || "");
      const secondaryValence = state?.transitivity === COMPOSER_TRANSITIVITY.bitransitive ? normalizeComposerStem(secondaryPair.second || "") : "";
      const isIntransitiveTla = state?.transitivity === COMPOSER_TRANSITIVITY.intransitive && primaryValence === "tla";
      const embedTokens = isIntransitiveTla ? [] : getComposerEmbedTokens(state?.embedPrefix || "");
      embedTokens.forEach(embedToken => {
        if (working.startsWith(embedToken)) {
          working = working.slice(embedToken.length);
          result.consumed.push(`${embedToken}/`);
          return;
        }
        result.warnings.push(`No se detectó embed ${embedToken}/ en la base.`);
      });
      const valenceItems = [];
      if (state?.transitivity === COMPOSER_TRANSITIVITY.bitransitive) {
        const governingEmbed = normalizeComposerEmbedValue(state?.valenceEmbedSecondary || state?.valenceEmbedPrimary || "");
        const governingSlot = !primaryValence ? 1 : !secondaryValence ? 2 : 0;
        valenceItems.push({
          token: primaryValence,
          embed: governingSlot === 1 ? governingEmbed : "",
          embedSeparator: primaryValence ? "/" : "-"
        });
        valenceItems.push({
          token: secondaryValence,
          embed: governingSlot === 2 ? governingEmbed : "",
          embedSeparator: secondaryValence ? "/" : "-"
        });
      } else {
        if (primaryValence) {
          valenceItems.push({
            token: primaryValence,
            embed: state?.transitivity === COMPOSER_TRANSITIVITY.intransitive ? normalizeComposerEmbedValue(state?.valenceIntransitiveEmbed || "") : normalizeComposerEmbedValue(state?.valenceEmbedPrimary || ""),
            embedSeparator: "/"
          });
        } else {
          const dashEmbed = normalizeComposerEmbedValue(state?.valenceEmbedPrimary || "");
          if (dashEmbed) {
            valenceItems.push({
              token: "",
              embed: dashEmbed,
              embedSeparator: "-"
            });
          }
        }
        if (secondaryValence) {
          valenceItems.push({
            token: secondaryValence,
            embed: normalizeComposerEmbedValue(state?.valenceEmbedSecondary || ""),
            embedSeparator: "/"
          });
        }
      }
      valenceItems.forEach(({
        token: valenceToken,
        embed: valenceEmbed,
        embedSeparator = "/"
      }) => {
        const embedTokensForValence = getComposerEmbedTokens(valenceEmbed);
        embedTokensForValence.forEach(embedToken => {
          if (working.startsWith(embedToken)) {
            working = working.slice(embedToken.length);
            result.consumed.push(`${embedToken}${embedSeparator}`);
            return;
          }
          const valenceLabel = valenceToken || "valencia sin prefijo";
          result.warnings.push(`No se detectó embed ${embedToken}${embedSeparator} para ${valenceLabel}.`);
        });
        if (!valenceToken) {
          return;
        }
        if (working.startsWith(valenceToken)) {
          working = working.slice(valenceToken.length);
          result.consumed.push(`${valenceToken}-`);
          return;
        }
        result.warnings.push(`No se detectó ${valenceToken}- después de los prefijos iniciales.`);
      });
      if (isIntransitiveTla) {
        const postTlaEmbedTokens = getComposerEmbedTokens(state?.embedPrefix || "");
        postTlaEmbedTokens.forEach(embedToken => {
          if (working.startsWith(embedToken)) {
            working = working.slice(embedToken.length);
            result.consumed.push(`${embedToken}/`);
            return;
          }
          result.warnings.push(`No se detectó embed ${embedToken}/ después de tla/.`);
        });
      }
      if (!working) {
        result.stem = fallbackStem || baseStem;
        result.warnings.push("No root remained after applying the selections.");
        return result;
      }
      result.stem = working;
      return result;
    }
    function applyComposerSyllableModeDefaultFromStem() {
      const syllableCount = getComposerStemSyllableCount(getComposerActiveStemValue());
      VerbComposerState.syllableMode = syllableCount === 1 ? COMPOSER_SYLLABLE_MODE.monosyllable : COMPOSER_SYLLABLE_MODE.multisyllable;
    }
    function updateCalcInputModeButtons() {
      // Older input-mode buttons were removed when visible regex and composer display converged.
    }
    function setComposerEntryBoard(board = "", options = {}) {
      const nextBoard = normalizeComposerEntryBoard(board);
      const currentBoard = getComposerEntryBoard();
      if (currentBoard === nextBoard && options.force !== true) {
        return;
      }
      const verbEl = targetObject.document.getElementById("verb");
      if (!VerbComposerState.isApplying) {
        syncComposerStateFromVerbInput(verbEl?.value || "");
      }
      VerbComposerState.entryBoard = nextBoard;
      renderVerbComposerFromState();
      applyComposerStateToVerbInput({
        triggerGenerate: true,
        immediateRefresh: true
      });
    }
    function populateComposerDirectionalOptions() {
      const {
        directionalSelect
      } = getVerbComposerElements();
      if (!directionalSelect) {
        return;
      }
      const previousValue = directionalSelect.value || VerbComposerState.directionalPrefix || "";
      directionalSelect.innerHTML = "";
      const baseOption = targetObject.document.createElement("option");
      baseOption.value = "";
      baseOption.textContent = "No directional";
      directionalSelect.appendChild(baseOption);
      const prefixes = getComposerDirectionalPrefixInventory();
      prefixes.forEach(prefix => {
        const option = targetObject.document.createElement("option");
        option.value = prefix;
        option.textContent = prefix;
        directionalSelect.appendChild(option);
      });
      const normalizedPreviousValue = normalizeComposerDirectionalPrefix(previousValue);
      directionalSelect.value = prefixes.includes(normalizedPreviousValue) ? normalizedPreviousValue : "";
      VerbComposerState.directionalPrefix = directionalSelect.value;
      syncComposerChipGroupsFromState();
    }
    function setVerbInputMode(mode, options = {}) {
      const currentMode = VERB_INPUT_MODE.composer;
      const nextMode = VERB_INPUT_MODE.composer;
      void mode;
      VerbComposerState.mode = nextMode;
      const shouldSync = options.syncFromInput !== false;
      const verbEl = targetObject.document.getElementById("verb");
      if (shouldSync) {
        syncComposerStateFromVerbInput(verbEl?.value || "");
      }
      renderVerbComposerFromState();
      if (verbEl) {
        const composerDisplayBundle = buildComposerModeBundle(VerbComposerState, verbEl.value || "");
        const nextDisplayValue = composerDisplayBundle.regexValue || targetObject.serializeRegexInputValue(verbEl.value || "");
        if (nextDisplayValue !== verbEl.value) {
          verbEl.value = nextDisplayValue;
          verbEl.dataset.prevValue = nextDisplayValue;
          if (typeof targetObject.renderVerbMirror === "function") {
            targetObject.renderVerbMirror();
          }
        }
      }
      clearVerbDisambiguation();
      dispatchAppEvent("app:verb-input-mode-changed", {
        mode: nextMode
      });
    }
    function bindComposerStemTabNavigation(pairs = []) {
      // Tab behavior is managed by the global keyboard handler:
      // it now cycles between main verb input and active composer textbox.
      void pairs;
    }
    function onVerbComposerControlChange(source = "") {
      if (!isVerbInputModeComposer()) {
        return;
      }
      const verbEl = targetObject.document.getElementById("verb");
      if (source === "supportive") {
        const supportiveControl = getVerbComposerElements().supportiveICheckbox;
        const supportiveOn = supportiveControl ? Boolean(supportiveControl.checked) : targetObject.hasSupportiveMarkerValue(getComposerSupportiveMarker());
        // Keep optional-i scoped to the matrix stem composition path.
        // Wrapping the first global "i" can target embeds or valence segments.
        VerbComposerState.supportiveMarker = supportiveOn ? getComposerSupportiveMarkerCandidate() || getComposerSupportiveMarker() || "" : "";
        collectComposerStateFromControls({
          preserveSupportiveState: true
        });
        VerbComposerState.supportiveMarker = supportiveOn ? getComposerSupportiveMarkerCandidate() || getComposerSupportiveMarker() || "" : "";
        maybeDeriveComposerStemFromSelectionsSource();
        applyComposerSyllableModeDefaultFromStem();
        syncComposerValenceAvailability();
        renderVerbComposerFromState();
        applyComposerStateToVerbInput({
          triggerGenerate: true,
          immediateRefresh: true
        });
        void verbEl;
        return;
      }
      collectComposerStateFromControls();
      let refreshedManualMatrixStem = false;
      if (source === "matrix-stem") {
        VerbComposerState.stemManualOverride = true;
      } else {
        refreshedManualMatrixStem = maybeRefreshComposerManualMatrixStemFromEmbed();
        maybeDeriveComposerStemFromSelectionsSource();
      }
      if (source === "matrix-stem") {
        applyComposerSyllableModeDefaultFromStem();
      } else if (!VerbComposerState.stemManualOverride || refreshedManualMatrixStem) {
        applyComposerSyllableModeDefaultFromStem();
      }
      syncComposerValenceAvailability();
      renderVerbComposerFromState();
      applyComposerStateToVerbInput({
        triggerGenerate: true,
        immediateRefresh: shouldComposerControlChangeRefreshImmediately(source)
      });
    }
    function clearVerbComposerTextboxInputs() {
      if (!isVerbInputModeComposer()) {
        return;
      }
      COMPOSER_SLOT_KEYS.forEach(slotKey => {
        const stateKeys = getComposerSlotStateKeys(slotKey);
        ComposerEmbedOpenState[slotKey] = false;
        ComposerEmbedPreviewState[slotKey] = false;
        VerbComposerState[stateKeys.embed] = "";
        VerbComposerState[stateKeys.stem] = "";
        VerbComposerState[stateKeys.objectEmbed] = "";
        const stemInput = getVerbComposerElements().slots[slotKey]?.stemInput || null;
        if (stemInput) {
          delete stemInput.dataset.dropdownTemplateSuffix;
        }
      });
      VerbComposerState.embedPrefix = "";
      VerbComposerState.sourceBase = "";
      VerbComposerState.stemManualOverride = false;
      VerbComposerState.syllableMode = COMPOSER_SYLLABLE_MODE.multisyllable;
      renderVerbComposerFromState();
      applyComposerStateToVerbInput({
        triggerGenerate: true
      });
    }
    function isEditableTextInput(element) {
      return Boolean(element && element.tagName === "INPUT" && element.type === "text" && !element.disabled && !element.readOnly);
    }
    function isFocusableTextInput(element, options = {}) {
      const allowReadOnly = options.allowReadOnly === true;
      return Boolean(element && element.tagName === "INPUT" && element.type === "text" && !element.disabled && (allowReadOnly || !element.readOnly));
    }
    function dispatchTextInputUpdate(element) {
      if (!element) {
        return;
      }
      element.dispatchEvent(new targetObject.Event("input", {
        bubbles: true
      }));
    }
    function removeLastTextUnit(value) {
      const units = targetObject.splitVerbLetters(String(value || ""));
      if (units.length <= 1) {
        return "";
      }
      return units.slice(0, -1).join("");
    }
    function getComposerPreferredEntryInput() {
      const {
        matrixStemInput,
        embedStemInput
      } = getVerbComposerElements();
      return matrixStemInput || embedStemInput || null;
    }
    function getComposerSlotEntryTargetInput() {
      const inputId = String(ComposerVerbSlotEntryTarget?.inputId || "");
      const inputEl = inputId ? targetObject.document.getElementById(inputId) : null;
      if (inputEl && getComposerSlotInputDescriptor(inputEl)) {
        return inputEl;
      }
      return getComposerPreferredEntryInput();
    }
    function clearComposerSlotEntryTarget() {
      ComposerVerbSlotEntryTarget = null;
      syncComposerSlotEntryButtons();
    }
    function getComposerSlotEntryStateValue(inputEl = null, descriptor = null) {
      const resolvedDescriptor = descriptor || getComposerSlotInputDescriptor(inputEl);
      if (!resolvedDescriptor) {
        return "";
      }
      const rawValue = VerbComposerState[resolvedDescriptor.stateKey] || "";
      if (resolvedDescriptor.role === "stem") {
        return formatComposerStemForInputDisplay(normalizeComposerStem(rawValue), {
          slotKey: resolvedDescriptor.slotKey,
          preferSplitFromStem: true,
          templateSuffix: getComposerStemInputTemplateSuffix(inputEl, resolvedDescriptor.slotKey)
        });
      }
      return normalizeComposerEmbedValue(rawValue);
    }
    function getComposerSlotEntryTargetSelection(inputEl = null) {
      const inputId = String(inputEl?.id || "");
      if (!inputId || ComposerVerbSlotEntryTarget?.inputId !== inputId) {
        const length = getComposerSlotEntryStateValue(inputEl).length;
        return {
          start: length,
          end: length
        };
      }
      const valueLength = getComposerSlotEntryStateValue(inputEl).length;
      const start = Math.max(0, Math.min(Number(ComposerVerbSlotEntryTarget.selectionStart) || 0, valueLength));
      const end = Math.max(start, Math.min(Number(ComposerVerbSlotEntryTarget.selectionEnd) || start, valueLength));
      return {
        start,
        end
      };
    }
    function setComposerSlotEntryTarget(inputEl = null, options = {}) {
      if (!inputEl || !getComposerSlotInputDescriptor(inputEl)) {
        clearComposerSlotEntryTarget();
        return false;
      }
      const valueLength = getComposerSlotEntryStateValue(inputEl).length;
      const selectAll = options.selectAll !== false;
      const start = selectAll ? 0 : valueLength;
      const end = selectAll ? valueLength : valueLength;
      ComposerVerbSlotEntryTarget = {
        inputId: inputEl.id,
        selectionStart: start,
        selectionEnd: end
      };
      syncComposerSlotEntryButtons();
      return true;
    }
    function getComposerVerbInputRangeForSlot(inputEl = null, verbValueOverride = null) {
      const verbEl = targetObject.document.getElementById("verb");
      if (!verbEl || !inputEl) {
        return null;
      }
      const descriptor = getComposerSlotInputDescriptor(inputEl);
      const verbValue = verbValueOverride === null ? String(verbEl.value || "") : String(verbValueOverride || "");
      const slotValue = getComposerSlotEntryStateValue(inputEl, descriptor).trim();
      if (slotValue) {
        const index = descriptor?.role === "stem" ? verbValue.lastIndexOf(slotValue) : verbValue.indexOf(slotValue);
        if (index >= 0) {
          return {
            start: index,
            end: index + slotValue.length
          };
        }
      }
      const writable = getVerbInputWritableSelection(verbValue);
      if (writable) {
        return writable;
      }
      const end = verbValue.length;
      return {
        start: end,
        end
      };
    }
    function focusComposerSlotEntryTarget(inputEl = null, options = {}) {
      const targetInput = inputEl || getComposerSlotEntryTargetInput();
      if (!targetInput || !setComposerSlotEntryTarget(targetInput, options)) {
        return focusVisibleVerbSurfaceAtEnd();
      }
      const verbEl = targetObject.document.getElementById("verb");
      if (!isFocusableTextInput(verbEl, {
        allowReadOnly: true
      }) || typeof verbEl.focus !== "function") {
        return false;
      }
      verbEl.focus();
      const range = getComposerVerbInputRangeForSlot(targetInput);
      if (range && typeof verbEl.setSelectionRange === "function") {
        const selection = getComposerSlotEntryTargetSelection(targetInput);
        const valueLength = getComposerSlotEntryStateValue(targetInput).length;
        const startOffset = Math.max(0, Math.min(selection.start, valueLength));
        const endOffset = Math.max(startOffset, Math.min(selection.end, valueLength));
        const rangeText = String(verbEl.value || "").slice(range.start, range.end);
        if (!valueLength && /^_+/.test(rangeText)) {
          verbEl.setSelectionRange(range.start, range.end);
        } else {
          verbEl.setSelectionRange(range.start + startOffset, range.start + endOffset);
        }
      }
      return true;
    }
    function getComposerSlotEntryButtonForInput(inputEl = null) {
      const inputId = String(inputEl?.id || "");
      if (!inputId) {
        return null;
      }
      const selector = `.verb-composer__slot-entry-button[data-composer-slot-input-id="${escapeAttributeSelectorValue(inputId)}"]`;
      return inputEl.closest(".verb-composer__tagged-input-shell")?.querySelector(selector) || null;
    }
    function buildComposerSlotEntryButton(inputEl = null) {
      if (!inputEl || !inputEl.id) {
        return null;
      }
      const descriptor = getComposerSlotInputDescriptor(inputEl);
      if (!descriptor) {
        return null;
      }
      const button = targetObject.document.createElement("button");
      button.type = "button";
      button.className = "verb-composer__slot-entry-button";
      button.dataset.composerSlotInputId = inputEl.id;
      button.dataset.composerSlotRole = descriptor.role;
      button.dataset.composerSlotKey = descriptor.slotKey;
      button.setAttribute("aria-controls", "verb");
      button.addEventListener("click", event => {
        event.preventDefault();
        focusComposerSlotEntryTarget(inputEl, {
          selectAll: true
        });
      });
      const label = targetObject.document.createElement("span");
      label.className = "verb-composer__slot-entry-label";
      const value = targetObject.document.createElement("span");
      value.className = "verb-composer__slot-entry-value";
      button.appendChild(label);
      button.appendChild(value);
      return button;
    }
    function getComposerSlotEntryButtonLabel(inputEl = null, descriptor = null) {
      const field = inputEl?.closest?.(".verb-composer__stem-field, .verb-composer__matrix-field, .verb-composer__bottom-field") || null;
      const directSubLabel = Array.from(field?.children || []).find(child => child?.classList?.contains("verb-composer__sub-label"));
      const directText = String(directSubLabel?.textContent || "").trim();
      const matrixText = String(field?.querySelector?.(".verb-composer__matrix-head > .verb-composer__sub-label")?.textContent || "").trim();
      const tagText = String(inputEl?.closest?.(".verb-composer__tagged-input-shell")?.querySelector?.(".verb-composer__tagged-input-tag")?.textContent || "").trim();
      if (descriptor?.role === "stem") {
        return matrixText || directText || getComposerMatrixFieldLabel({
          nncActive: getClassicalBasalUnitFromRuntime() === CLASSICAL_BASAL_UNIT.nnc,
          activeBoard: getComposerEntryBoard()
        });
      }
      return directText || matrixText || tagText || getComposerSlotEntryRoleLabel(descriptor?.role);
    }
    function isComposerNncStemSlot(inputEl = null, descriptor = null) {
      const resolvedDescriptor = descriptor || getComposerSlotInputDescriptor(inputEl);
      return Boolean(
        resolvedDescriptor?.role === "stem"
        && getClassicalBasalUnitFromRuntime() === CLASSICAL_BASAL_UNIT.nnc
      );
    }
    function getComposerSlotEntryButtonVisibleText(inputEl = null, descriptor = null, value = "") {
      const normalizedValue = String(value || "").trim();
      if (isComposerNncStemSlot(inputEl, descriptor)) {
        return normalizedValue ? `(${normalizedValue})` : "";
      }
      return getComposerSlotEntryButtonLabel(inputEl, descriptor);
    }
    function syncComposerSlotEntryButton(inputEl = null) {
      if (!inputEl || !inputEl.id || !getComposerSlotInputDescriptor(inputEl)) {
        return;
      }
      const shell = inputEl.closest(".verb-composer__tagged-input-shell");
      if (!shell || typeof shell.querySelector !== "function" || typeof shell.appendChild !== "function") {
        return;
      }
      inputEl.classList.add("is-hidden-control");
      inputEl.tabIndex = -1;
      inputEl.setAttribute("aria-hidden", "true");
      const descriptor = getComposerSlotInputDescriptor(inputEl);
      const field = inputEl.closest(".verb-composer__stem-field, .verb-composer__matrix-field, .verb-composer__bottom-field");
      shell.classList.add("has-slot-entry-button");
      field?.classList?.add("has-slot-entry-button");
      const labelText = getComposerSlotEntryButtonLabel(inputEl, descriptor);
      let button = getComposerSlotEntryButtonForInput(inputEl);
      if (!button) {
        button = buildComposerSlotEntryButton(inputEl);
        if (!button) {
          return;
        }
        shell.appendChild(button);
      }
      const value = getComposerSlotEntryStateValue(inputEl, descriptor).trim();
      const visibleText = getComposerSlotEntryButtonVisibleText(inputEl, descriptor, value);
      const labelNode = button.querySelector(".verb-composer__slot-entry-label");
      const valueNode = button.querySelector(".verb-composer__slot-entry-value");
      if (labelNode) {
        labelNode.textContent = visibleText;
      }
      if (valueNode) {
        valueNode.textContent = "";
      }
      button.classList.toggle("is-empty", !value);
      button.classList.toggle("is-active", ComposerVerbSlotEntryTarget?.inputId === inputEl.id);
      button.setAttribute("aria-pressed", String(ComposerVerbSlotEntryTarget?.inputId === inputEl.id));
      button.title = `${labelText}: escribir en #verb`;
      button.setAttribute("aria-label", `${labelText}, escribir en entrada principal`);
    }
    function syncComposerSlotEntryButtons() {
      if (typeof targetObject.document === "undefined") {
        return;
      }
      const {
        slots
      } = getVerbComposerElements();
      COMPOSER_SLOT_KEYS.forEach(slotKey => {
        const slotRefs = slots[slotKey] || {};
        [slotRefs.embedInput || null, slotRefs.stemInput || null, slotRefs.objectInput || null].forEach(syncComposerSlotEntryButton);
      });
    }
    function getComposerSlotEntryInsertionText(event) {
      if (event.inputType === "insertFromPaste") {
        return event.clipboardData?.getData("text/plain") || event.dataTransfer?.getData("text/plain") || event.data || "";
      }
      return event.data || "";
    }
    function getComposerDeleteForwardValue(value = "", end = 0) {
      const before = String(value || "").slice(0, end);
      const after = String(value || "").slice(end);
      const units = targetObject.splitVerbLetters(after);
      return before + units.slice(1).join("");
    }
    function applyComposerSlotEntryTargetInputValue(targetInput = null, nextValue = "") {
      const descriptor = getComposerSlotInputDescriptor(targetInput);
      if (!targetInput || !descriptor) {
        return false;
      }
      targetInput.value = nextValue;
      if (descriptor.role === "stem") {
        VerbComposerState.stemManualOverride = true;
      }
      collectComposerStateFromControls();
      let refreshedManualMatrixStem = false;
      if (descriptor.role === "stem") {
        applyComposerSyllableModeDefaultFromStem();
      } else {
        refreshedManualMatrixStem = maybeRefreshComposerManualMatrixStemFromEmbed();
        maybeDeriveComposerStemFromSelectionsSource();
        if (!VerbComposerState.stemManualOverride || refreshedManualMatrixStem) {
          applyComposerSyllableModeDefaultFromStem();
        }
      }
      syncComposerValenceAvailability();
      renderVerbComposerFromState();
      applyComposerStateToVerbInput({
        triggerGenerate: true,
        immediateRefresh: true
      });
      return true;
    }
    function handleComposerVerbSlotBeforeInput(event) {
      if (!isVerbInputModeComposer() || !ComposerVerbSlotEntryTarget?.inputId || event?.target?.id !== "verb" || event.isComposing) {
        return false;
      }
      const targetInput = targetObject.document.getElementById(ComposerVerbSlotEntryTarget.inputId);
      if (!targetInput || !getComposerSlotInputDescriptor(targetInput)) {
        clearComposerSlotEntryTarget();
        return false;
      }
      const inputType = String(event.inputType || "");
      const currentValue = String(targetInput.value || "");
      const selection = getComposerSlotEntryTargetSelection(targetInput);
      let nextValue = currentValue;
      let nextCaret = selection.start;
      if (inputType.startsWith("insert")) {
        const insertion = getComposerSlotEntryInsertionText(event);
        if (!insertion) {
          return false;
        }
        nextValue = currentValue.slice(0, selection.start) + insertion + currentValue.slice(selection.end);
        nextCaret = selection.start + insertion.length;
      } else if (inputType === "deleteContentBackward") {
        if (selection.start !== selection.end) {
          nextValue = currentValue.slice(0, selection.start) + currentValue.slice(selection.end);
          nextCaret = selection.start;
        } else if (selection.start > 0) {
          const before = currentValue.slice(0, selection.start);
          const nextBefore = removeLastTextUnit(before);
          nextValue = nextBefore + currentValue.slice(selection.end);
          nextCaret = nextBefore.length;
        }
      } else if (inputType === "deleteContentForward") {
        if (selection.start !== selection.end) {
          nextValue = currentValue.slice(0, selection.start) + currentValue.slice(selection.end);
          nextCaret = selection.start;
        } else {
          nextValue = getComposerDeleteForwardValue(currentValue, selection.end);
          nextCaret = selection.start;
        }
      } else {
        return false;
      }
      event.preventDefault();
      if (typeof event.stopImmediatePropagation === "function") {
        event.stopImmediatePropagation();
      }
      ComposerVerbSlotEntryTarget.selectionStart = nextCaret;
      ComposerVerbSlotEntryTarget.selectionEnd = nextCaret;
      applyComposerSlotEntryTargetInputValue(targetInput, nextValue);
      focusComposerSlotEntryTarget(targetInput, {
        selectAll: false
      });
      return true;
    }
    function handleComposerVerbSlotInput(event) {
      if (ComposerVerbSlotEntryInputSyncing || VerbComposerState.isApplying || !isVerbInputModeComposer() || !ComposerVerbSlotEntryTarget?.inputId || event?.target?.id !== "verb" || event.isComposing) {
        return false;
      }
      const targetInput = targetObject.document.getElementById(ComposerVerbSlotEntryTarget.inputId);
      if (!targetInput || !getComposerSlotInputDescriptor(targetInput)) {
        clearComposerSlotEntryTarget();
        return false;
      }
      const verbEl = event.target;
      const previousVerbValue = ComposerVerbSlotEntryLastVerbValue;
      const nextVerbValue = String(verbEl.value || "");
      if (previousVerbValue === nextVerbValue) {
        ComposerVerbSlotEntryLastVerbValue = nextVerbValue;
        return false;
      }
      const range = getComposerVerbInputRangeForSlot(targetInput, previousVerbValue);
      if (!range) {
        ComposerVerbSlotEntryLastVerbValue = nextVerbValue;
        return false;
      }
      const prefix = previousVerbValue.slice(0, range.start);
      const suffix = previousVerbValue.slice(range.end);
      if (!nextVerbValue.startsWith(prefix) || !nextVerbValue.endsWith(suffix)) {
        clearComposerSlotEntryTarget();
        return false;
      }
      const nextSlotValue = nextVerbValue.slice(prefix.length, nextVerbValue.length - suffix.length);
      const selectionStart = typeof verbEl.selectionStart === "number" ? verbEl.selectionStart : prefix.length + nextSlotValue.length;
      const nextCaret = Math.max(0, Math.min(selectionStart - prefix.length, nextSlotValue.length));
      ComposerVerbSlotEntryInputSyncing = true;
      try {
        ComposerVerbSlotEntryTarget.selectionStart = nextCaret;
        ComposerVerbSlotEntryTarget.selectionEnd = nextCaret;
        applyComposerSlotEntryTargetInputValue(targetInput, nextSlotValue);
        focusComposerSlotEntryTarget(targetInput, {
          selectAll: false
        });
      } finally {
        ComposerVerbSlotEntryInputSyncing = false;
      }
      return true;
    }
    function getComposerStemInputPreferredCaret(inputEl) {
      if (!isEditableTextInput(inputEl)) {
        return null;
      }
      const slotKey = getComposerSlotKeyByStemInput(inputEl);
      if (!slotKey) {
        return null;
      }
      const rawValue = String(inputEl.value || "");
      const normalizedStem = normalizeComposerStem(rawValue);
      const inferredSpec = getComposerSerialSpecFromStem(normalizedStem);
      const displaySpec = getComposerSerialDisplaySpec({
        slotKey,
        normalizedStem,
        inferredSpec
      });
      const slotCount = Math.max(1, Number(displaySpec.slotCount || 1));
      if (slotCount <= 1) {
        return rawValue.length;
      }
      const segments = rawValue.includes("-") ? sanitizeComposerSerialSegmentsFromRaw(rawValue, slotCount, displaySpec.selectedType) : buildComposerLockedSerialSegmentsFromStem(normalizedStem, slotCount, {
        preferSplitFromStem: true,
        selectedType: displaySpec.selectedType
      });
      const lockedSegments = applyComposerSerialFixedSegments(segments, displaySpec.selectedType, slotCount);
      const maskedSegments = getComposerMaskedSerialSegments(lockedSegments, slotCount);
      const targetSegmentIndex = resolveComposerSerialEditableSegmentIndex(displaySpec.selectedType, slotCount, slotCount - 1);
      let caret = 0;
      for (let index = 0; index < targetSegmentIndex; index += 1) {
        const segment = maskedSegments[index] || "";
        caret += segment.length;
      }
      const activeSegment = maskedSegments[targetSegmentIndex] || "";
      if (!isComposerSerialPlaceholderSegment(activeSegment)) {
        caret += activeSegment.length;
      }
      return Math.max(0, Math.min(caret, rawValue.length));
    }
    function getVerbInputWritableSelection(value = "") {
      const rawValue = String(value || "");
      if (!rawValue) {
        return null;
      }
      const placeholderMatch = rawValue.match(/_+[a-z0-9]*/i);
      if (!placeholderMatch || typeof placeholderMatch.index !== "number") {
        return null;
      }
      return {
        start: placeholderMatch.index,
        end: placeholderMatch.index + placeholderMatch[0].length
      };
    }
    function applyVerbInputWritableSelection(inputEl, options = {}) {
      if (!isFocusableTextInput(inputEl, {
        allowReadOnly: true
      }) || typeof inputEl.setSelectionRange !== "function") {
        return false;
      }
      const selection = getVerbInputWritableSelection(inputEl.value);
      if (!selection) {
        return false;
      }
      const force = options.force === true;
      const valueLength = String(inputEl.value || "").length;
      const selectionStart = typeof inputEl.selectionStart === "number" ? inputEl.selectionStart : valueLength;
      const selectionEnd = typeof inputEl.selectionEnd === "number" ? inputEl.selectionEnd : selectionStart;
      const isWholeValueSelected = selectionStart === 0 && selectionEnd === valueLength;
      const isAtValueEnd = selectionStart === valueLength && selectionEnd === valueLength;
      if (!force && !isWholeValueSelected && !isAtValueEnd) {
        return false;
      }
      inputEl.setSelectionRange(selection.start, selection.end);
      return true;
    }
    function focusTextInputAtEnd(inputEl) {
      if (!isFocusableTextInput(inputEl, {
        allowReadOnly: true
      }) || typeof inputEl.focus !== "function") {
        return false;
      }
      inputEl.focus();
      if (typeof inputEl.setSelectionRange === "function") {
        const preferredCaret = getComposerStemInputPreferredCaret(inputEl);
        const caret = Number.isFinite(preferredCaret) ? Number(preferredCaret) : String(inputEl.value || "").length;
        inputEl.setSelectionRange(caret, caret);
      }
      return true;
    }
    function isComposerTextboxInputElement(element) {
      return Boolean(isEditableTextInput(element) && element.classList?.contains("verb-composer__input"));
    }
    function getComposerAvailableTextboxForKeyboardNavigation() {
      if (!isVerbInputModeComposer()) {
        return null;
      }
      const {
        matrixStemInput,
        embedStemInput
      } = getVerbComposerElements();
      const candidates = [matrixStemInput, embedStemInput].filter(Boolean);
      for (let index = 0; index < candidates.length; index += 1) {
        const candidate = candidates[index];
        if (!isEditableTextInput(candidate)) {
          continue;
        }
        if (candidate.getAttribute("aria-hidden") === "true") {
          continue;
        }
        if (candidate.hidden) {
          continue;
        }
        return candidate;
      }
      return null;
    }
    function handleVerbTextboxTabShortcut(event) {
      const isTabKey = event.key === "Tab" && !event.altKey && !event.ctrlKey && !event.metaKey;
      if (!isTabKey) {
        return false;
      }
      const verbEl = targetObject.document.getElementById("verb");
      const composerTextbox = getComposerAvailableTextboxForKeyboardNavigation();
      if (!isFocusableTextInput(verbEl, {
        allowReadOnly: true
      }) || !isFocusableTextInput(composerTextbox, {
        allowReadOnly: true
      })) {
        return false;
      }
      const activeElement = targetObject.document.activeElement;
      const activeIsVerb = activeElement === verbEl;
      const activeIsComposerTextbox = activeElement === composerTextbox || isComposerTextboxInputElement(activeElement);
      if (!activeIsVerb && !activeIsComposerTextbox) {
        return false;
      }
      const nextTarget = activeIsVerb ? composerTextbox : verbEl;
      if (!focusTextInputAtEnd(nextTarget)) {
        return false;
      }
      event.preventDefault();
      event.stopPropagation();
      return true;
    }
    function shouldLetNativeEnterSelectControl(element) {
      if (!element || typeof element !== "object") {
        return false;
      }
      const tagName = String(element.tagName || "").toUpperCase();
      if (tagName === "BUTTON" || tagName === "SELECT" || tagName === "TEXTAREA") {
        return true;
      }
      if (tagName === "A" && typeof element.getAttribute === "function" && element.getAttribute("href")) {
        return true;
      }
      if (tagName === "INPUT") {
        const type = String(element.type || "").toLowerCase();
        // Text-like inputs should keep Enter fallback behavior (generate).
        const textLikeTypes = new Set(["", "text", "search", "url", "tel", "email", "password", "number"]);
        if (!textLikeTypes.has(type)) {
          return true;
        }
      }
      if (typeof element.getAttribute === "function" && element.getAttribute("role") === "button") {
        return true;
      }
      return false;
    }
    function escapeAttributeSelectorValue(value = "") {
      return String(value || "").replace(/\\/g, "\\\\").replace(/"/g, "\\\"");
    }
    function isDisplayOnlyVerbMirrorElement(element) {
      void element;
      return false;
    }
    function shouldLetNativeSpaceBehavior(element) {
      if (!element || typeof element !== "object") {
        return false;
      }
      if (isDisplayOnlyVerbMirrorElement(element)) {
        return false;
      }
      if (isEditableTextInput(element)) {
        return true;
      }
      if (element.isContentEditable) {
        return true;
      }
      if (typeof element.closest === "function" && element.closest("[contenteditable=\"true\"]")) {
        return true;
      }
      if (shouldLetNativeEnterSelectControl(element)) {
        return true;
      }
      if (typeof element.getAttribute === "function") {
        const role = String(element.getAttribute("role") || "").toLowerCase();
        if (role === "tab" || role === "option" || role === "menuitem" || role === "switch" || role === "checkbox" || role === "radio") {
          return true;
        }
      }
      return false;
    }
    function shouldLetNativeDeleteBehavior(element) {
      if (!element || typeof element !== "object") {
        return false;
      }
      if (isDisplayOnlyVerbMirrorElement(element)) {
        return false;
      }
      if (isEditableTextInput(element)) {
        return true;
      }
      if (element.isContentEditable) {
        return true;
      }
      if (typeof element.closest === "function" && element.closest("[contenteditable=\"true\"]")) {
        return true;
      }
      return false;
    }
    function captureTenseTabsFocusState(container) {
      if (!container) {
        return null;
      }
      const activeElement = targetObject.document.activeElement;
      if (!activeElement || !container.contains(activeElement)) {
        return null;
      }
      if (typeof activeElement.getAttribute !== "function") {
        return null;
      }
      const tenseValue = activeElement.getAttribute("data-tense-value");
      if (tenseValue) {
        return {
          type: "tense-button",
          tenseValue,
          tenseGroup: activeElement.getAttribute("data-tense-group") || "",
          tenseColumn: activeElement.getAttribute("data-tense-column") || ""
        };
      }
      if (activeElement.id) {
        return {
          type: "id",
          id: activeElement.id
        };
      }
      return null;
    }
    function restoreTenseTabsFocusState(container, focusState) {
      if (!container || !focusState) {
        return;
      }
      let target = null;
      if (focusState.type === "tense-button" && focusState.tenseValue) {
        const selectorParts = [`[data-tense-value="${escapeAttributeSelectorValue(focusState.tenseValue)}"]`];
        if (focusState.tenseGroup) {
          selectorParts.push(`[data-tense-group="${escapeAttributeSelectorValue(focusState.tenseGroup)}"]`);
        }
        if (focusState.tenseColumn) {
          selectorParts.push(`[data-tense-column="${escapeAttributeSelectorValue(focusState.tenseColumn)}"]`);
        }
        target = container.querySelector(selectorParts.join(""));
      } else if (focusState.type === "id" && focusState.id) {
        const byId = targetObject.document.getElementById(focusState.id);
        if (byId && container.contains(byId)) {
          target = byId;
        }
      }
      if (!target || target.disabled || typeof target.focus !== "function") {
        return;
      }
      target.focus({
        preventScroll: true
      });
    }
    function serializeTenseGroupRows(groups = [], visibleTenseSet = new Set()) {
      return groups.map(group => {
        const tenses = (group?.tenses || []).filter(tenseValue => visibleTenseSet.has(tenseValue));
        if (!tenses.length) {
          return "";
        }
        return `${group?.heading || ""}:${tenses.join(",")}`;
      }).filter(Boolean).join("|");
    }
    function getVerbSemanticTenseGroupKey(tenseValue = "") {
      const tense = String(tenseValue || "").trim().toLowerCase();
      if (!tense) {
        return "past";
      }
      if (typeof ACTIVE_ADJECTIVE_TENSE_SET !== "undefined" && ACTIVE_ADJECTIVE_TENSE_SET.has(tense)) {
        return "adjectival";
      }
      if (tense === "pasado-remoto-adverbio-activo") {
        return "adverbial";
      }
      if (tense === "optativo") {
        return "optative";
      }
      if (tense.startsWith("presente")) {
        return "present";
      }
      if (tense === "futuro") {
        return "future";
      }
      return "past";
    }
    function getVerbSemanticTenseGroups(visibleTenses = []) {
      const groups = [{
        key: "optative",
        heading: {
          labelEs: "Optative VNC"
        },
        hoverTitle: {
          labelEs: "Optative mood of the verbal nuclear clause."
        },
        tenses: []
      }, {
        key: "present",
        heading: {
          labelEs: "Indicative VNC · nonpast imperfective"
        },
        hoverTitle: {
          labelEs: "Indicative tenses over the imperfective stem."
        },
        tenses: []
      }, {
        key: "past",
        heading: {
          labelEs: "Indicative VNC · past"
        },
        hoverTitle: {
          labelEs: "Imperfect, preterit, and distant past according to stem and tense slot."
        },
        tenses: []
      }, {
        key: "future",
        heading: {
          labelEs: "Indicative VNC · projective"
        },
        hoverTitle: {
          labelEs: "Indicative future over the imperfective stem."
        },
        tenses: []
      }, {
        key: "adjectival",
        heading: {
          labelEs: "VNC in adjectival function"
        },
        hoverTitle: {
          labelEs: "Andrews: adjectival function without creating a formal class outside VNC/NNC."
        },
        tenses: []
      }, {
        key: "adverbial",
        heading: {
          labelEs: "VNC in adverbial function"
        },
        hoverTitle: {
          labelEs: "Andrews: adverbial function visible as a VNC route, not as an additional formal class."
        },
        tenses: []
      }];
      const byKey = new Map(groups.map(group => [group.key, group]));
      (Array.isArray(visibleTenses) ? visibleTenses : []).forEach(tenseValue => {
        const key = getVerbSemanticTenseGroupKey(tenseValue);
        const target = byKey.get(key) || byKey.get("past");
        if (target) {
          target.tenses.push(tenseValue);
        }
      });
      return groups;
    }
    function buildTenseTabsDomSignature({
      classicalLocaleContext = false,
      tenseMode = "",
      isNonactiveMode = false,
      sourceScope = targetObject.VERB_SOURCE_SCOPE.both,
      activeGroup = "",
      selectedNonactiveSuffix = null,
      isNominalMode = false,
      shouldShowUniversalTabs = false,
      activeColumnTenses = [],
      nounNonactiveTenses = [],
      verbSemanticGroups = [],
      modeGroups = null,
      visibleTenseSet = new Set(),
      universalOrder = []
    }) {
      const nominalSignature = isNominalMode ? `grouped:l:${serializeTenseGroupRows(modeGroups?.left || [], visibleTenseSet)}|r:${serializeTenseGroupRows(modeGroups?.right || [], visibleTenseSet)}` : "";
      const semanticSignature = !isNominalMode ? Array.isArray(verbSemanticGroups) ? verbSemanticGroups.map(group => `${group.key || ""}:${(group.tenses || []).join(",")}`).join("|") : "" : "";
      const groupedSignature = !isNominalMode && modeGroups ? `l:${serializeTenseGroupRows(modeGroups.left, visibleTenseSet)}|r:${serializeTenseGroupRows(modeGroups.right, visibleTenseSet)}` : "";
      const universalSignature = shouldShowUniversalTabs ? universalOrder.join(",") : "";
      return ["classical", tenseMode || "", isNonactiveMode ? "nonactive" : "active", sourceScope || "", activeGroup || "", selectedNonactiveSuffix || "", isNominalMode ? "nominal" : "verb", nominalSignature, semanticSignature, groupedSignature, shouldShowUniversalTabs ? "universal:on" : "universal:off", universalSignature].join("::");
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
        title: active ? "Active available" : "Active with no result",
        available: active === true
      }, {
        key: "nonactive",
        label: "NA",
        title: nonactive ? "Nonactive available" : "Nonactive with no result",
        available: nonactive === true
      }];
      button.dataset.activePresence = entries[0].available ? "available" : "absent";
      button.dataset.nonactivePresence = entries[1].available ? "available" : "absent";
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
    function updateExistingTenseTabsDom({
      container,
      universalContainer = null,
      endsWithConsonant = false,
      resolveTenseAvailabilityRecord,
      blockedNominalTenseSet = new Set(),
      isNominalMode = false,
      shouldShowUniversalTabs = false,
      availability = [],
      activeGroup = "",
      selectedTense = "",
      selectedUniversal = "",
      isClassTenseSelected = false,
      currentCombinedMode = COMBINED_MODE.active,
      selectionState = null
    }) {
      const mainWrap = container?.querySelector(".tense-tabs-main");
      if (!mainWrap || typeof resolveTenseAvailabilityRecord !== "function") {
        return false;
      }
      const classicalLocaleContext = targetObject.getClassicalLocaleContext();
      mainWrap.setAttribute("role", "tablist");
      mainWrap.setAttribute("aria-label", typeof targetObject.getAndrewsFirstTenseTabsAriaLabel === "function" ? targetObject.getAndrewsFirstTenseTabsAriaLabel(targetObject.getActiveTenseMode()) : "VNC tense/mood slot");
      const mainButtons = Array.from(mainWrap.querySelectorAll(".tense-tab[data-tense-group=\"main\"][data-tense-value]"));
      if (!mainButtons.length) {
        return false;
      }
      mainButtons.forEach(button => {
        const tenseValue = button.dataset.tenseValue || "";
        const buttonCombinedMode = button.dataset.combinedMode || "";
        const resolvedCombinedMode = buttonCombinedMode === COMBINED_MODE.nonactive ? COMBINED_MODE.nonactive : COMBINED_MODE.active;
        let activePresence = false;
        let nonactivePresence = false;
        const hasOutput = (() => {
          if (!buttonCombinedMode && isNominalMode) {
            const activeRecord = resolveTenseAvailabilityRecord(tenseValue, COMBINED_MODE.active);
            const nonactiveRecord = resolveTenseAvailabilityRecord(tenseValue, COMBINED_MODE.nonactive);
            const activeOutput = targetObject.resolveTenseAvailabilityHasOutput(activeRecord);
            const nonactiveOutput = targetObject.resolveTenseAvailabilityHasOutput(nonactiveRecord);
            activePresence = activeOutput === true;
            nonactivePresence = nonactiveOutput === true;
            const availabilityState = activeRecord?.availabilityState || nonactiveRecord?.availabilityState || "";
            button.dataset.availabilityState = availabilityState;
            if (activeRecord === null && nonactiveRecord === null) {
              return null;
            }
            return activeOutput === true || nonactiveOutput === true;
          }
          const availabilityRecord = resolveTenseAvailabilityRecord(tenseValue, resolvedCombinedMode);
          const output = targetObject.resolveTenseAvailabilityHasOutput(availabilityRecord);
          if (resolvedCombinedMode === COMBINED_MODE.nonactive) {
            nonactivePresence = output === true;
          } else {
            activePresence = output === true;
          }
          button.dataset.availabilityState = availabilityRecord?.availabilityState || "";
          return output;
        })();
        const isActive = activeGroup === targetObject.CONJUGATION_GROUPS.tense && tenseValue === selectedTense && (!buttonCombinedMode || buttonCombinedMode === currentCombinedMode);
        const isBlockedNominalTense = blockedNominalTenseSet instanceof Set && blockedNominalTenseSet.has(tenseValue);
        button.classList.toggle("is-active", isActive);
        button.classList.toggle("is-empty", hasOutput === false || isBlockedNominalTense);
        button.setAttribute("role", "tab");
        button.setAttribute("aria-selected", String(isActive));
        if (typeof targetObject.getAndrewsFirstTenseHoverTitle === "function") {
          button.title = targetObject.getAndrewsFirstTenseHoverTitle(tenseValue, targetObject.getActiveTenseMode());
        }
        if (typeof targetObject.applyAndrewsTenseAuthorityDataset === "function") {
          targetObject.applyAndrewsTenseAuthorityDataset(button, {
            tenseValue,
            mode: targetObject.getActiveTenseMode()
          });
        }
        const selectionAuthority = typeof targetObject.applyAndrewsTenseTabSelectionAuthorityDataset === "function" ? targetObject.applyAndrewsTenseTabSelectionAuthorityDataset(button, {
          tenseValue,
          mode: targetObject.getActiveTenseMode(),
          hasOutput,
          endsWithConsonant,
          isBlockedNominalTense
        }) : null;
        if (isNominalMode) {
          setTensePresenceBadges(button, {
            active: activePresence,
            nonactive: nonactivePresence
          });
        }
        button.disabled = selectionAuthority ? selectionAuthority.disabled : endsWithConsonant || hasOutput === false || isBlockedNominalTense;
      });
      const universalRoot = universalContainer || container;
      const universalWrap = universalRoot?.querySelector(".tense-tabs-universal");
      if (!shouldShowUniversalTabs) {
        return !universalWrap;
      }
      if (!universalWrap) {
        return false;
      }
      universalWrap.setAttribute("aria-label", typeof targetObject.getAndrewsFirstUniversalTabsAriaLabel === "function" ? targetObject.getAndrewsFirstUniversalTabsAriaLabel() : "Perfective stem classes");
      const universalButtons = Array.from(universalWrap.querySelectorAll(".tense-tab[data-tense-group=\"universal\"][data-tense-value]"));
      if (universalButtons.length !== availability.length) {
        return false;
      }
      const availabilityByTense = new Map(availability.map(entry => [entry.tenseValue, entry || null]));
      const hasEveryUniversalButton = universalButtons.every(button => availabilityByTense.has(button.dataset.tenseValue || ""));
      if (!hasEveryUniversalButton) {
        return false;
      }
      universalButtons.forEach(button => {
        const tenseValue = button.dataset.tenseValue || "";
        const availabilityRecord = availabilityByTense.get(tenseValue) || null;
        const available = targetObject.resolveTenseAvailabilityIsAvailable(availabilityRecord) === true;
        const activeRecord = resolveTenseAvailabilityRecord(tenseValue, COMBINED_MODE.active);
        const nonactiveRecord = resolveTenseAvailabilityRecord(tenseValue, COMBINED_MODE.nonactive);
        const activePresence = targetObject.resolveTenseAvailabilityHasOutput(activeRecord) === true;
        const nonactivePresence = targetObject.resolveTenseAvailabilityHasOutput(nonactiveRecord) === true;
        const hasOutput = activePresence || nonactivePresence;
        button.dataset.availabilityState = availabilityRecord?.availabilityState || "";
        const classKey = targetObject.PRET_UNIVERSAL_CLASS_BY_TENSE[tenseValue];
        const isUniversalActive = activeGroup === targetObject.CONJUGATION_GROUPS.universal && tenseValue === selectedUniversal && available;
        const isClassActive = activeGroup === targetObject.CONJUGATION_GROUPS.tense && isClassTenseSelected && classKey && (selectionState?.classFilter || null) === classKey;
        button.classList.toggle("is-active", isUniversalActive || isClassActive);
        button.classList.toggle("is-empty", hasOutput === false);
        button.setAttribute("role", "tab");
        button.setAttribute("aria-selected", String(isUniversalActive || isClassActive));
        if (typeof targetObject.getAndrewsFirstTenseHoverTitle === "function") {
          button.title = targetObject.getAndrewsFirstTenseHoverTitle(tenseValue, targetObject.getActiveTenseMode());
        }
        if (typeof targetObject.applyAndrewsTenseAuthorityDataset === "function") {
          targetObject.applyAndrewsTenseAuthorityDataset(button, {
            tenseValue,
            mode: targetObject.getActiveTenseMode()
          });
        }
        const selectionAuthority = typeof targetObject.applyAndrewsTenseTabSelectionAuthorityDataset === "function" ? targetObject.applyAndrewsTenseTabSelectionAuthorityDataset(button, {
          tenseValue,
          mode: targetObject.getActiveTenseMode(),
          hasOutput,
          isAvailable: available,
          endsWithConsonant,
          isUniversal: true
        }) : null;
        button.disabled = selectionAuthority ? selectionAuthority.disabled : endsWithConsonant || !available || hasOutput === false;
      });
      return true;
    }
    function getScreenCalculatorAnsFallbackFromForm(rawFormOverride = null) {
      const rawForm = rawFormOverride == null ? String(VerbScreenAnsState.form || "") : String(rawFormOverride || "");
      if (!rawForm) {
        return "";
      }
      const firstForm = rawForm.split(/\s*\/\s*/g).map(token => token.trim()).find(Boolean) || "";
      return normalizeComposerStem(firstForm.replace(/\s+/g, ""));
    }
    function rememberScreenCalculatorAnsState({
      generatedText = "",
      parsedVerb = null,
      stemProvenance = null,
      tense = ""
    } = {}) {
      const normalizedForm = String(generatedText || "").trim();
      if (!normalizedForm || normalizedForm === "—") {
        return;
      }
      const regexBase = String(parsedVerb?.displayVerb || "").trim();
      const composerStem = getComposerActiveStemValue();
      const parsedStemFromRegex = regexBase ? getComposerActiveStemValue(parseComposerStateFromRegexValue(regexBase)) : "";
      const provenanceStem = normalizeComposerStem(targetObject.getProvenancePrimaryStemSurface(stemProvenance));
      const resolvedStem = composerStem || parsedStemFromRegex || provenanceStem || regexBase || getScreenCalculatorAnsFallbackFromForm(normalizedForm);
      VerbScreenAnsState.form = normalizedForm;
      VerbScreenAnsState.regexBase = regexBase;
      VerbScreenAnsState.stem = resolvedStem;
      VerbScreenAnsState.provenance = stemProvenance || null;
      VerbScreenAnsState.tense = String(tense || "");
      syncVerbScreenCalculatorState();
    }
    function getVerbScreenCalculatorButtons() {
      return {
        ansButton: targetObject.document.getElementById("verb-key-ans"),
        modeButton: targetObject.document.getElementById("verb-key-mode"),
        transitivityButton: targetObject.document.getElementById("verb-key-transitivity"),
        supportiveIButton: targetObject.document.getElementById("verb-key-supportive-i"),
        acButton: targetObject.document.getElementById("verb-key-ac"),
        ceButton: targetObject.document.getElementById("verb-key-ce"),
        delButton: targetObject.document.getElementById("verb-key-del"),
        equalsButton: targetObject.document.getElementById("verb-key-eq")
      };
    }
    function createBlockedRegexSupportiveIToggleInfo(rawValue = "", blockReason = "") {
      return {
        canToggle: false,
        hasMarker: false,
        nextValue: rawValue,
        blockReason: String(blockReason || "")
      };
    }
    function buildCurrentRegexSupportiveToggleSourceFrame(rawValue = "", currentRegexParseOperationFrame = null) {
      const raw = String(rawValue || "").trim();
      const parseFrameMismatch = targetObject.getCurrentRegexParseOperationMismatch(raw, currentRegexParseOperationFrame);
      const targetFrame = parseFrameMismatch ? null : currentRegexParseOperationFrame?.targetFrame;
      const sourceSignature = JSON.stringify({
        raw,
        parseTargetSignature: currentRegexParseOperationFrame?.targetSignature || ""
      });
      return Object.freeze({
        kind: "current-regex-supportive-toggle-source-frame",
        version: 1,
        routeFamily: "current-regex-parser",
        routeStage: "toggle-current-regex-supportive-marker",
        sourceRawInput: raw,
        sourceSignature,
        currentRegexParseOperationFrame: parseFrameMismatch ? null : currentRegexParseOperationFrame,
        currentRegexParseTargetSignature: currentRegexParseOperationFrame?.targetSignature || "",
        currentRegexParseTargetFrameKind: targetFrame?.kind || "",
        sourceCoreText: String(targetFrame?.coreText || ""),
        sourceTransitivity: targetFrame?.transitivity || "",
        sourceOuterPieces: Object.freeze(targetObject.normalizeCurrentRegexParseOuterPieces(targetFrame?.outerPieces || [])),
        blockReason: parseFrameMismatch || "",
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false
      });
    }
    function buildCurrentRegexSupportiveToggleNextValueFromTarget(targetFrame = null, nextCore = "") {
      if (!targetFrame || targetFrame.kind !== "current-regex-parse-target-frame") {
        return "";
      }
      const nextRegex = targetObject.buildMovingTargetRegexFromCoreAndPieces({
        transitivity: targetFrame.transitivity,
        coreText: nextCore,
        outerPieces: targetFrame.outerPieces
      });
      return targetObject.serializeRegexInputValue(nextRegex) || nextRegex;
    }
    function buildCurrentRegexSupportiveToggleTargetFrame(sourceFrame = null) {
      const raw = String(sourceFrame?.sourceRawInput || "");
      const parseTargetFrame = sourceFrame?.currentRegexParseOperationFrame?.targetFrame || null;
      const coreValue = String(parseTargetFrame?.coreText || "");
      let blockReason = String(sourceFrame?.blockReason || "");
      let canToggle = false;
      let hasMarker = false;
      let nextCore = coreValue;
      let nextValue = raw;
      let sourceStem = "";
      let supportiveLetter = "";
      if (!blockReason && (!sourceFrame || sourceFrame.kind !== "current-regex-supportive-toggle-source-frame")) {
        blockReason = "current-regex-supportive-toggle-source-frame-required";
      }
      if (!blockReason && (!parseTargetFrame || parseTargetFrame.kind !== "current-regex-parse-target-frame")) {
        blockReason = "current-regex-parse-target-frame-required";
      }
      if (!blockReason && !coreValue.trim()) {
        blockReason = "empty-current-regex-core";
      }
      const markerLetter = blockReason ? "" : targetObject.getRegexOptionalSupportiveMarkerLetter(coreValue);
      if (!blockReason && markerLetter) {
        hasMarker = true;
        canToggle = true;
        supportiveLetter = markerLetter;
        nextCore = coreValue.replace(targetObject.REGEX_OPTIONAL_SUPPORTIVE_MARKER_RE, (_match, letter) => String(letter || "").toLowerCase());
        nextValue = buildCurrentRegexSupportiveToggleNextValueFromTarget(parseTargetFrame, nextCore);
      } else if (!blockReason) {
        const cleanedCore = targetObject.replaceOptionalSupportiveMarkersWithLetters(coreValue);
        sourceStem = normalizeComposerStem(targetObject.getExactBaseVerbFromCleaned(cleanedCore));
        supportiveLetter = targetObject.getStemLeadingSupportiveLetter(sourceStem);
        if (!supportiveLetter) {
          blockReason = "missing-leading-supportive-letter";
        } else {
          const stemIndex = coreValue.toLowerCase().lastIndexOf(sourceStem);
          if (stemIndex < 0) {
            blockReason = "source-stem-not-found-in-current-regex-core";
          } else {
            const marker = targetObject.getRegexOptionalSupportiveMarkerForLetter(supportiveLetter);
            const markedStem = `${marker}${sourceStem.slice(1)}`;
            nextCore = `${coreValue.slice(0, stemIndex)}${markedStem}${coreValue.slice(stemIndex + sourceStem.length)}`;
            nextValue = buildCurrentRegexSupportiveToggleNextValueFromTarget(parseTargetFrame, nextCore);
            canToggle = true;
          }
        }
      }
      const targetFrame = {
        kind: "current-regex-supportive-toggle-target-frame",
        version: 1,
        sourceSignature: sourceFrame?.sourceSignature || "",
        currentRegexParseTargetSignature: sourceFrame?.currentRegexParseTargetSignature || "",
        canToggle,
        hasMarker,
        sourceCoreText: coreValue,
        nextCore,
        nextValue,
        sourceStem,
        supportiveLetter,
        blockReason
      };
      targetFrame.targetSignature = JSON.stringify({
        sourceSignature: targetFrame.sourceSignature,
        currentRegexParseTargetSignature: targetFrame.currentRegexParseTargetSignature,
        canToggle: targetFrame.canToggle,
        hasMarker: targetFrame.hasMarker,
        sourceCoreText: targetFrame.sourceCoreText,
        nextCore: targetFrame.nextCore,
        nextValue: targetFrame.nextValue,
        sourceStem: targetFrame.sourceStem,
        supportiveLetter: targetFrame.supportiveLetter,
        blockReason: targetFrame.blockReason
      });
      return Object.freeze(targetFrame);
    }
    function buildCurrentRegexSupportiveToggleOperationFrame(sourceFrame = null) {
      if (!sourceFrame || sourceFrame.kind !== "current-regex-supportive-toggle-source-frame") {
        return null;
      }
      const targetFrame = buildCurrentRegexSupportiveToggleTargetFrame(sourceFrame);
      return Object.freeze({
        kind: "andrews-typed-operation-frame",
        operationId: "andrews-current-regex-supportive-toggle",
        routeFamily: "current-regex-parser",
        routeStage: "toggle-current-regex-supportive-marker",
        operationApplied: "toggle-current-regex-supportive-marker-from-typed-target",
        sourceFrameKind: sourceFrame.kind,
        sourceSignature: sourceFrame.sourceSignature,
        targetFrame,
        targetSignature: targetFrame.targetSignature,
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false
      });
    }
    function getCurrentRegexSupportiveToggleOperationMismatch(rawValue = "", operationFrame = null) {
      const currentRegexParseOperationFrame = targetObject.buildCurrentRegexParseOperationFrameFromRawInput(rawValue);
      const sourceFrame = buildCurrentRegexSupportiveToggleSourceFrame(rawValue, currentRegexParseOperationFrame);
      const expectedOperationFrame = buildCurrentRegexSupportiveToggleOperationFrame(sourceFrame);
      if (!operationFrame || operationFrame.kind !== "andrews-typed-operation-frame" || operationFrame.operationId !== "andrews-current-regex-supportive-toggle" || operationFrame.routeFamily !== "current-regex-parser" || operationFrame.routeStage !== "toggle-current-regex-supportive-marker" || operationFrame.operationApplied !== "toggle-current-regex-supportive-marker-from-typed-target" || operationFrame.sourceFrameKind !== sourceFrame.kind || operationFrame.sourceSignature !== sourceFrame.sourceSignature || operationFrame.consumesRenderedInput !== false || operationFrame.displayStringsAuthorizeGrammar !== false) {
        return "current-regex-supportive-toggle-operation-frame-required";
      }
      const targetFrame = operationFrame.targetFrame || null;
      const expectedTargetFrame = expectedOperationFrame?.targetFrame || null;
      if (!targetFrame || !expectedTargetFrame || targetFrame.kind !== expectedTargetFrame.kind || targetFrame.sourceSignature !== expectedTargetFrame.sourceSignature || targetFrame.currentRegexParseTargetSignature !== expectedTargetFrame.currentRegexParseTargetSignature || targetFrame.canToggle !== expectedTargetFrame.canToggle || targetFrame.hasMarker !== expectedTargetFrame.hasMarker || targetFrame.sourceCoreText !== expectedTargetFrame.sourceCoreText || targetFrame.nextCore !== expectedTargetFrame.nextCore || targetFrame.nextValue !== expectedTargetFrame.nextValue || targetFrame.sourceStem !== expectedTargetFrame.sourceStem || targetFrame.supportiveLetter !== expectedTargetFrame.supportiveLetter || targetFrame.blockReason !== expectedTargetFrame.blockReason || targetFrame.targetSignature !== expectedTargetFrame.targetSignature || operationFrame.targetSignature !== expectedTargetFrame.targetSignature) {
        return "current-regex-supportive-toggle-contradictory-target-frame";
      }
      return "";
    }
    function getRegexSupportiveIToggleInfoFromOperationFrame(rawValue = "", operationFrame = null) {
      const mismatch = getCurrentRegexSupportiveToggleOperationMismatch(rawValue, operationFrame);
      if (mismatch) {
        return createBlockedRegexSupportiveIToggleInfo(rawValue, mismatch);
      }
      const targetFrame = operationFrame.targetFrame || {};
      return {
        canToggle: targetFrame.canToggle === true,
        hasMarker: targetFrame.hasMarker === true,
        nextValue: String(targetFrame.nextValue || rawValue),
        blockReason: String(targetFrame.blockReason || "")
      };
    }
    function getRegexSupportiveIToggleInfo(rawValue = "") {
      const currentRegexParseOperationFrame = targetObject.buildCurrentRegexParseOperationFrameFromRawInput(rawValue);
      const sourceFrame = buildCurrentRegexSupportiveToggleSourceFrame(rawValue, currentRegexParseOperationFrame);
      const operationFrame = buildCurrentRegexSupportiveToggleOperationFrame(sourceFrame);
      return getRegexSupportiveIToggleInfoFromOperationFrame(rawValue, operationFrame);
    }
    function getSupportiveYRuleSummary() {
      return "Regla y: #+(y)V>yV; C+(y)V>CV; V+(y)e>Ve; i+(y)V>iV; X+(y)Vj(y)V>XVjV.";
    }
    function getSupportiveToggleGuidance({
      mode = VERB_INPUT_MODE.composer,
      unavailable = false,
      active = false
    } = {}) {
      const ruleSummary = getSupportiveYRuleSummary();
      if (mode === VERB_INPUT_MODE.regex) {
        if (unavailable) {
          return `Pattern: available if the stem starts with i/y or already contains [i] or [y]. ${ruleSummary}`;
        }
        return `${active ? "Pattern: remove" : "Pattern: add"} optional [i] or [y]. ${ruleSummary}`;
      }
      if (unavailable) {
        return `Available only if the left root starts with i or y. ${ruleSummary}`;
      }
      return `${active ? "Remove" : "Apply"} optional supportive i/y. ${ruleSummary}`;
    }
    function syncVerbScreenCalculatorState() {
      const {
        ansButton,
        modeButton,
        transitivityButton,
        supportiveIButton,
        equalsButton
      } = getVerbScreenCalculatorButtons();
      const hasAns = Boolean(VerbScreenAnsState.stem || VerbScreenAnsState.regexBase || VerbScreenAnsState.form);
      const hasCopyText = Boolean(VerbScreenAnsState.form);
      if (ansButton) {
        ansButton.disabled = !hasAns;
        ansButton.setAttribute("aria-disabled", String(!hasAns));
        ansButton.title = hasAns ? "Restore last root or generated form" : "Generate first to enable the previous result";
      }
      const isComposer = isVerbInputModeComposer();
      if (modeButton) {
        modeButton.classList.toggle("is-active", isComposer);
        modeButton.setAttribute("aria-pressed", String(isComposer));
        modeButton.title = "Structured source active.";
      }
      const currentTransitivity = VerbComposerState.transitivity;
      const transitivityLabelMap = {
        [COMPOSER_TRANSITIVITY.intransitive]: "Intransitive",
        [COMPOSER_TRANSITIVITY.transitive]: "Transitive",
        [COMPOSER_TRANSITIVITY.bitransitive]: "Bitransitive"
      };
      if (transitivityButton) {
        const readable = transitivityLabelMap[currentTransitivity] || "not selected";
        const transitivityUnavailable = !isComposer;
        transitivityButton.disabled = transitivityUnavailable;
        transitivityButton.setAttribute("aria-disabled", String(transitivityUnavailable));
        transitivityButton.classList.toggle("is-active", !transitivityUnavailable && isComposerTransitivitySelected() && currentTransitivity !== COMPOSER_TRANSITIVITY.intransitive);
        transitivityButton.setAttribute("aria-pressed", String(!transitivityUnavailable && isComposerTransitivitySelected() && currentTransitivity !== COMPOSER_TRANSITIVITY.intransitive));
        transitivityButton.title = transitivityUnavailable ? "Available only in Selections" : `Current verbal valence: ${readable}.`;
        transitivityButton.setAttribute("aria-label", transitivityUnavailable ? "Verbal valence available only in Selections" : `Current verbal valence ${readable}. Change verbal valence`);
      }
      if (supportiveIButton) {
        const {
          supportiveICheckbox
        } = getVerbComposerElements();
        if (isComposer) {
          const supportiveOn = Boolean(supportiveICheckbox?.checked);
          const supportiveUnavailable = Boolean(supportiveICheckbox?.disabled);
          const supportiveGuidance = getSupportiveToggleGuidance({
            mode: VERB_INPUT_MODE.composer,
            unavailable: supportiveUnavailable,
            active: supportiveOn
          });
          supportiveIButton.disabled = supportiveUnavailable;
          supportiveIButton.setAttribute("aria-disabled", String(supportiveUnavailable));
          supportiveIButton.classList.toggle("is-active", !supportiveUnavailable && supportiveOn);
          supportiveIButton.setAttribute("aria-pressed", String(!supportiveUnavailable && supportiveOn));
          supportiveIButton.title = supportiveGuidance;
          supportiveIButton.setAttribute("aria-label", supportiveGuidance);
        } else {
          const verbInput = targetObject.document.getElementById("verb");
          const toggleInfo = getRegexSupportiveIToggleInfo(verbInput?.value || "");
          const regexHasMarker = toggleInfo.hasMarker;
          const regexUnavailable = !toggleInfo.canToggle;
          const regexSupportiveGuidance = getSupportiveToggleGuidance({
            mode: VERB_INPUT_MODE.regex,
            unavailable: regexUnavailable,
            active: regexHasMarker
          });
          supportiveIButton.disabled = regexUnavailable;
          supportiveIButton.setAttribute("aria-disabled", String(regexUnavailable));
          supportiveIButton.classList.toggle("is-active", !regexUnavailable && regexHasMarker);
          supportiveIButton.setAttribute("aria-pressed", String(!regexUnavailable && regexHasMarker));
          supportiveIButton.title = regexSupportiveGuidance;
          supportiveIButton.setAttribute("aria-label", regexSupportiveGuidance);
        }
      }
      if (equalsButton) {
        equalsButton.disabled = !hasCopyText;
        equalsButton.setAttribute("aria-disabled", String(!hasCopyText));
        equalsButton.title = hasCopyText ? "Copy result" : "Generate first to copy";
      }
    }
    function runScreenCalculatorAC() {
      targetObject.clearAllToggleStateMaps({
        resetNonactiveSuffix: true
      });
      targetObject.mutateConjugationSelectionState({
        group: targetObject.CONJUGATION_GROUPS.tense,
        classFilter: null
      });
      if (Object.values(DERIVATION_TYPE).includes(DERIVATION_TYPE.direct)) {
        targetObject.setActiveDerivationType(DERIVATION_TYPE.direct);
        const derivationSelect = targetObject.document.getElementById("derivation-type");
        if (derivationSelect) {
          derivationSelect.value = DERIVATION_TYPE.direct;
        }
      }
      if (targetObject.getActiveTenseMode() === TENSE_MODE.verbo && targetObject.getCombinedMode() !== COMBINED_MODE.active) {
        targetObject.setCombinedMode(COMBINED_MODE.active);
        targetObject.updateCombinedModeTabs();
      }
      const verbInput = targetObject.document.getElementById("verb");
      if (isVerbInputModeComposer()) {
        syncComposerStateFromVerbInput("");
        renderVerbComposerFromState();
        applyComposerStateToVerbInput({
          triggerGenerate: true
        });
        focusComposerSlotEntryTarget(getComposerPreferredEntryInput(), {
          selectAll: true
        });
        targetObject.updateTenseModeTabs();
        targetObject.updateDerivationTypeControl();
        targetObject.renderTenseTabs();
        const verbMeta = getVerbInputMeta();
        targetObject.renderActiveConjugations({
          verb: verbMeta.displayVerb,
          objectPrefix: targetObject.getCurrentObjectPrefix()
        });
        syncVerbScreenCalculatorState();
        return;
      }
      if (!verbInput) {
        return;
      }
      verbInput.value = "";
      dispatchTextInputUpdate(verbInput);
      verbInput.focus();
      targetObject.updateTenseModeTabs();
      targetObject.updateDerivationTypeControl();
      targetObject.renderTenseTabs();
      const verbMeta = getVerbInputMeta();
      targetObject.renderActiveConjugations({
        verb: verbMeta.displayVerb,
        objectPrefix: targetObject.getCurrentObjectPrefix()
      });
      syncVerbScreenCalculatorState();
    }
    function runScreenCalculatorCE() {
      const verbInput = targetObject.document.getElementById("verb");
      if (isVerbInputModeComposer()) {
        const preferredInput = getComposerSlotEntryTargetInput();
        if (preferredInput && preferredInput.value) {
          preferredInput.value = "";
          dispatchTextInputUpdate(preferredInput);
        }
        focusComposerSlotEntryTarget(preferredInput, {
          selectAll: false
        });
        return;
      }
      const active = targetObject.document.activeElement;
      if (isEditableTextInput(active)) {
        if (active.value) {
          active.value = "";
          dispatchTextInputUpdate(active);
        }
        active.focus();
        return;
      }
      if (!verbInput || !verbInput.value) {
        return;
      }
      verbInput.value = "";
      dispatchTextInputUpdate(verbInput);
      verbInput.focus();
    }
    function runScreenCalculatorDEL() {
      const verbInput = targetObject.document.getElementById("verb");
      if (isVerbInputModeComposer()) {
        const preferredInput = getComposerSlotEntryTargetInput();
        if (preferredInput) {
          const nextValue = removeLastTextUnit(preferredInput.value);
          if (nextValue !== preferredInput.value) {
            preferredInput.value = nextValue;
            dispatchTextInputUpdate(preferredInput);
          }
          focusComposerSlotEntryTarget(preferredInput, {
            selectAll: false
          });
        }
        return;
      }
      const active = targetObject.document.activeElement;
      if (isEditableTextInput(active)) {
        const nextValue = removeLastTextUnit(active.value);
        if (nextValue !== active.value) {
          active.value = nextValue;
          dispatchTextInputUpdate(active);
        }
        active.focus();
        return;
      }
      if (!verbInput) {
        return;
      }
      const nextValue = removeLastTextUnit(verbInput.value);
      if (nextValue === verbInput.value) {
        return;
      }
      verbInput.value = nextValue;
      dispatchTextInputUpdate(verbInput);
      verbInput.focus();
    }
    function runScreenCalculatorANS() {
      const verbInput = targetObject.document.getElementById("verb");
      const ansStem = normalizeComposerStem(VerbScreenAnsState.stem || "");
      const ansRegexBase = String(VerbScreenAnsState.regexBase || "").trim();
      const fallbackFromForm = getScreenCalculatorAnsFallbackFromForm();
      if (isVerbInputModeComposer()) {
        const preferredInput = getComposerSlotEntryTargetInput();
        const nextStem = ansStem || ansRegexBase || fallbackFromForm;
        if (!preferredInput || !nextStem) {
          return;
        }
        preferredInput.value = nextStem;
        dispatchTextInputUpdate(preferredInput);
        focusComposerSlotEntryTarget(preferredInput, {
          selectAll: false
        });
        return;
      }
      if (!verbInput) {
        return;
      }
      const nextBase = ansRegexBase || ansStem || fallbackFromForm;
      if (!nextBase) {
        return;
      }
      verbInput.value = targetObject.serializeRegexInputValue(nextBase) || nextBase;
      dispatchTextInputUpdate(verbInput);
      verbInput.focus();
    }
    function runScreenCalculatorModeToggle() {
      setVerbInputMode(VERB_INPUT_MODE.composer, {
        syncFromInput: true
      });
      const verbInput = targetObject.document.getElementById("verb");
      verbInput?.focus();
      syncVerbScreenCalculatorState();
    }
    function runScreenCalculatorCycleTransitivity(direction = 1) {
      if (!isVerbInputModeComposer()) {
        syncVerbScreenCalculatorState();
        return false;
      }
      const {
        transitivitySelect
      } = getVerbComposerElements();
      const current = COMPOSER_TRANSITIVITY_ORDER.includes(transitivitySelect?.value) ? transitivitySelect.value : VerbComposerState.transitivity;
      const currentIndex = COMPOSER_TRANSITIVITY_ORDER.indexOf(current);
      if (!COMPOSER_TRANSITIVITY_ORDER.length) {
        syncVerbScreenCalculatorState();
        return false;
      }
      const step = direction < 0 ? -1 : 1;
      const nextIndex = currentIndex < 0 ? step < 0 ? COMPOSER_TRANSITIVITY_ORDER.length - 1 : 0 : (currentIndex + step + COMPOSER_TRANSITIVITY_ORDER.length) % COMPOSER_TRANSITIVITY_ORDER.length;
      const next = COMPOSER_TRANSITIVITY_ORDER[nextIndex];
      transposeComposerSlotTextboxes(current, next);
      carryComposerEmbedVisibilityAcrossTransitivity(current, next);
      if (transitivitySelect) {
        transitivitySelect.value = next;
      }
      onVerbComposerControlChange("other");
      focusComposerSlotEntryTarget(getComposerPreferredEntryInput(), {
        selectAll: false
      });
      return true;
    }
    function runScreenCalculatorToggleSupportiveI() {
      if (!isVerbInputModeComposer()) {
        const verbInput = targetObject.document.getElementById("verb");
        if (!verbInput) {
          syncVerbScreenCalculatorState();
          return;
        }
        const toggleInfo = getRegexSupportiveIToggleInfo(verbInput.value);
        if (!toggleInfo.canToggle) {
          syncVerbScreenCalculatorState();
          return;
        }
        verbInput.value = toggleInfo.nextValue;
        dispatchTextInputUpdate(verbInput);
        verbInput.focus();
        syncVerbScreenCalculatorState();
        return;
      }
      const {
        supportiveICheckbox
      } = getVerbComposerElements();
      const canEnable = canComposerUseSupportiveMarker();
      const hasSupportiveMarker = targetObject.hasSupportiveMarkerValue(getComposerSupportiveMarker());
      if (!hasSupportiveMarker && !canEnable) {
        syncComposerSupportiveIAvailability();
        syncVerbScreenCalculatorState();
        return;
      }
      const nextState = !hasSupportiveMarker;
      VerbComposerState.supportiveMarker = nextState ? getComposerSupportiveMarkerCandidate() || getComposerSupportiveMarker() || "" : "";
      if (supportiveICheckbox) {
        supportiveICheckbox.checked = nextState;
        supportiveICheckbox.focus();
      }
      onVerbComposerControlChange("supportive");
      syncVerbScreenCalculatorState();
    }
    function copyTextToClipboard(text) {
      if (!text) {
        return Promise.resolve(false);
      }
      if (targetObject.navigator?.clipboard?.writeText) {
        return targetObject.navigator.clipboard.writeText(text).then(() => true).catch(() => false);
      }
      try {
        const temp = targetObject.document.createElement("textarea");
        temp.value = text;
        temp.setAttribute("readonly", "true");
        temp.style.position = "fixed";
        temp.style.top = "-9999px";
        temp.style.opacity = "0";
        targetObject.document.body.appendChild(temp);
        temp.select();
        const ok = targetObject.document.execCommand("copy");
        targetObject.document.body.removeChild(temp);
        return Promise.resolve(ok);
      } catch (_error) {
        return Promise.resolve(false);
      }
    }
    function runScreenCalculatorCopy() {
      const text = String(VerbScreenAnsState.form || "").trim();
      if (!text) {
        return;
      }
      void copyTextToClipboard(text);
    }
    var CLASSICAL_BASAL_UNIT = Object.freeze({
      vnc: "vnc",
      nnc: "nnc"
    });
    function normalizeClassicalBasalUnit(value = "") {
      const normalized = String(value || "").trim().toLowerCase();
      if (normalized === CLASSICAL_BASAL_UNIT.nnc || normalized === "cnn" || normalized === "nominal") {
        return CLASSICAL_BASAL_UNIT.nnc;
      }
      return CLASSICAL_BASAL_UNIT.vnc;
    }
    function getClassicalBasalUnitFromRuntime() {
      const controls = targetObject.document?.getElementById?.(
        "classical-basal-unit-controls"
      );
      if (controls?.dataset?.classicalBasalUnit) {
        return normalizeClassicalBasalUnit(
          controls.dataset.classicalBasalUnit
        );
      }
      const activeButton = targetObject.document?.querySelector?.(
        'button[data-classical-basal-unit][aria-pressed="true"]'
      );
      if (activeButton?.dataset?.classicalBasalUnit) {
        return normalizeClassicalBasalUnit(
          activeButton.dataset.classicalBasalUnit
        );
      }
      const activeMode = typeof targetObject.getActiveTenseMode === "function" ? targetObject.getActiveTenseMode() : "";
      if (typeof TENSE_MODE !== "undefined" && activeMode === TENSE_MODE?.sustantivo) {
        return CLASSICAL_BASAL_UNIT.nnc;
      }
      return CLASSICAL_BASAL_UNIT.vnc;
    }
    function syncClassicalConstructionSourceUnitAvailability(unit = "") {
      const activeUnit = normalizeClassicalBasalUnit(
        unit || getClassicalBasalUnitFromRuntime()
      );
      const construction = targetObject.document?.getElementById?.(
        "classical-construction-operation"
      );
      if (!construction) {
        return activeUnit;
      }
      const exactContinuationActive =
        construction.dataset?.classicalCapabilityContinuationActive
          === "true";
      const continuationIncompatibleOperationIds = new Set(
        String(
          construction.dataset
            ?.classicalCapabilityIncompatibleApplicationOperations || ""
        ).split("|").map(value => value.trim()).filter(Boolean)
      );
      Array.from(construction.options || []).forEach(option => {
        const sourceUnit = String(
          option.dataset?.classicalSourceUnit || ""
        ).trim();
        const sourceCompatible = !sourceUnit
          || sourceUnit === "any"
          || sourceUnit === activeUnit;
        const applicationOperationId = String(
          option.dataset?.classicalApplicationOperation || ""
        ).trim();
        const effectiveApplicationOperationId =
          applicationOperationId === "direct"
            ? activeUnit === CLASSICAL_BASAL_UNIT.nnc
              ? "nnc:ordinary"
              : "vnc:application"
            : applicationOperationId;
        const continuationCompatible = !exactContinuationActive
          || !effectiveApplicationOperationId
          || !continuationIncompatibleOperationIds.has(
            effectiveApplicationOperationId
          );
        const available = sourceCompatible && continuationCompatible;
        option.hidden = !available;
        option.disabled = !available;
        option.dataset.classicalCapabilityStatus = !sourceCompatible
          ? "source-unit-incompatible"
          : continuationCompatible
            ? exactContinuationActive
              ? "exact-continuation-not-incompatible"
              : "source-unit-compatible"
            : "exact-continuation-incompatible";
      });
      const sourceGroups = Array.from(
        construction.querySelectorAll?.("optgroup") || []
      );
      sourceGroups.forEach(group => {
        const groupUnit = String(
          group.dataset?.classicalOperationSourceGroup || ""
        ).trim();
        const available = Array.from(group.children || []).some(
          option => option.hidden !== true && option.disabled !== true
        );
        group.hidden = !available;
        group.disabled = !available;
        group.label = groupUnit === activeUnit
          ? `Available from the current ${activeUnit.toUpperCase()} Source`
          : `Requires ${groupUnit === CLASSICAL_BASAL_UNIT.nnc ? "an" : "a"} ${groupUnit.toUpperCase()} Source`;
      });
      const selectedOption = construction.selectedOptions?.[0] || null;
      const selectedSourceUnit = String(
        selectedOption?.dataset?.classicalSourceUnit || ""
      ).trim();
      if (
        selectedOption
        && (
          selectedOption.hidden === true
          || selectedOption.disabled === true
          || (
            selectedSourceUnit
            && selectedSourceUnit !== "any"
            && selectedSourceUnit !== activeUnit
          )
        )
      ) {
        construction.value = "none";
      }
      construction.dataset.classicalSourceUnit = activeUnit;
      const directOption = construction.querySelector?.('option[value="none"]');
      if (directOption) {
        directOption.textContent = activeUnit === CLASSICAL_BASAL_UNIT.vnc
          ? "No added operation layer · VNC Source → VNC Result"
          : "No added operation layer · NNC Source → NNC Result";
      }
      return activeUnit;
    }
    function populateClassicalSentenceParticleControl() {
      const control = targetObject.document?.getElementById?.("classical-rule-logic-sentence-particle");
      const entries = typeof targetObject.getClassicalNahuatlSentenceParticleEntries === "function"
        ? targetObject.getClassicalNahuatlSentenceParticleEntries()
        : [];
      if (!control || !Array.isArray(entries)) return false;
      const selectedValue = String(control.value || "none");
      Array.from(control.children || []).forEach(child => child.remove());
      const noneOption = targetObject.document.createElement("option");
      noneOption.value = "none";
      noneOption.textContent = "none";
      noneOption.dataset.classicalAuthorityRole = "no-sentence-particle";
      control.appendChild(noneOption);
      const groupLabels = new Map([
        ["clause-introducer", "Clause introducers"],
        ["adjunctor", "Adjunctors"],
        ["conjunctor", "Conjunctors"],
        ["interjection", "Interjections"],
        ["negation", "Negative expressions"],
        ["collocation", "Particle combinations"]
      ]);
      const groups = new Map();
      entries.forEach(entry => {
        const groupKey = String(entry.functionScope || "").trim();
        if (!groups.has(groupKey)) {
          const group = targetObject.document.createElement("optgroup");
          group.label = groupLabels.get(groupKey) || "Other particle functions";
          group.dataset.classicalParticleFunctionScope = groupKey;
          groups.set(groupKey, group);
          control.appendChild(group);
        }
        const option = targetObject.document.createElement("option");
        option.value = entry.id;
        option.textContent = [entry.sourceForm, entry.gloss]
          .filter(Boolean)
          .join(" · ");
        option.dataset.classicalParticleFunctionScope = entry.functionScope || "";
        option.dataset.classicalParticlePlacement = entry.placement?.scope || "";
        option.dataset.classicalAuthorityRole = "typed-lesson3-inventory-choice";
        groups.get(groupKey).appendChild(option);
      });
      control.value = Array.from(control.options || []).some(option => option.value === selectedValue) ? selectedValue : "none";
      return true;
    }
    function populateClassicalParticleCombinationShortcutControl() {
      const control = targetObject.document?.getElementById?.("classical-rule-logic-particle-combination-shortcut");
      const entries = typeof targetObject.getClassicalNahuatlParticleCombinationShortcutEntries === "function"
        ? targetObject.getClassicalNahuatlParticleCombinationShortcutEntries()
        : [];
      if (!control || !Array.isArray(entries)) return false;
      const selectedValue = String(control.value || "none");
      Array.from(control.children || []).forEach(child => child.remove());
      const noneOption = targetObject.document.createElement("option");
      noneOption.value = "none";
      noneOption.textContent = "Choose a combination";
      control.appendChild(noneOption);
      const negativeGroup = targetObject.document.createElement("optgroup");
      negativeGroup.label = "Negative forms";
      const combinationGroup = targetObject.document.createElement("optgroup");
      combinationGroup.label = "Particle combinations";
      entries.forEach(entry => {
        const option = targetObject.document.createElement("option");
        option.value = entry.shortcutId;
        option.textContent = `${entry.choiceSummary} → ${entry.sourceForm}`;
        option.title = entry.gloss || "";
        option.dataset.classicalAuthorityRole = "non-authorizing-lesson3-shortcut";
        (entry.polarity === "negative" ? negativeGroup : combinationGroup).appendChild(option);
      });
      if (negativeGroup.children.length) control.appendChild(negativeGroup);
      if (combinationGroup.children.length) control.appendChild(combinationGroup);
      control.value = Array.from(control.options || []).some(option => option.value === selectedValue)
        ? selectedValue
        : "none";
      return true;
    }
    const CLASSICAL_BUILT_IN_PARTICLE_CONTROL_ID = "classical-built-in-particle";
    const CLASSICAL_BUILT_IN_PARTICLE_CATEGORIES = Object.freeze({
      "clause-introducer": "Clause introducers",
      collocation: "Particle collocations",
      negation: "Negativizing particles",
      honorificized: "Honorificized particles"
    });
    const CLASSICAL_HONORIFICIZED_PARTICLE_BASES = Object.freeze({
      "l3-otzin": "l3-o-behold",
      "l3-auhtzin": "l3-auh-interjection",
      "l3-ca-no-zotzin": "l3-ca-no-zo"
    });
    const CLASSICAL_HONORIFICIZED_PARTICLES_BY_BASE = Object.freeze(
      Object.fromEntries(Object.entries(CLASSICAL_HONORIFICIZED_PARTICLE_BASES)
        .map(([honorificizedId, baseId]) => [baseId, honorificizedId]))
    );
    function getClassicalBuiltInParticleEntries(category = "") {
      const entries = (typeof targetObject.getClassicalNahuatlParticleEntries === "function"
        ? targetObject.getClassicalNahuatlParticleEntries()
        : []).filter(entry => entry.functionScope === category);
      if (!["collocation", "negation"].includes(category)) return entries;
      const selectableIds = new Set(getClassicalParticleCombinationShortcutEntries()
        .map(entry => entry.shortcutId));
      return entries.filter(entry => selectableIds.has(entry.id));
    }
    function populateClassicalBuiltInParticleControls() {
      const control = targetObject.document?.getElementById?.(CLASSICAL_BUILT_IN_PARTICLE_CONTROL_ID);
      if (!control) return false;
      const selectedValue = String(control.value || "none");
      Array.from(control.children || []).forEach(child => child.remove());
      const none = targetObject.document.createElement("option");
      none.value = "none";
      none.textContent = "Choose a built-in particle";
      control.appendChild(none);
      Object.entries(CLASSICAL_BUILT_IN_PARTICLE_CATEGORIES).forEach(([category, label]) => {
        const group = targetObject.document.createElement("optgroup");
        group.label = label;
        getClassicalBuiltInParticleEntries(category).forEach(entry => {
          const option = targetObject.document.createElement("option");
          option.value = entry.id;
          const canonicalParticleForm = category === "clause-introducer"
            && typeof targetObject.requestClassicalParticleResult === "function"
            ? targetObject.requestClassicalParticleResult(entry.id)?.surface || entry.sourceForm
            : entry.sourceForm;
          option.textContent = [canonicalParticleForm, entry.gloss].filter(Boolean).join(" · ");
          option.dataset.classicalBuiltInParticleCategory = category;
          option.dataset.classicalAuthorityRole = "non-authorizing-canonical-particle-picker";
          group.appendChild(option);
        });
        control.appendChild(group);
      });
      control.value = Array.from(control.options || []).some(option => option.value === selectedValue)
        ? selectedValue
        : "none";
      return true;
    }
    function setClassicalParticlePolarityControl(value = "positive") {
      const control = targetObject.document?.getElementById?.("classical-rule-logic-polarity");
      if (control) control.value = value;
      targetObject.document?.querySelectorAll?.('[data-classical-segment-control="classical-rule-logic-polarity"]')
        ?.forEach(button => {
          const active = button.dataset.classicalSegmentValue === value;
          button.classList.toggle("is-active", active);
          button.setAttribute("aria-pressed", active ? "true" : "false");
        });
      return control;
    }
    function syncClassicalBuiltInParticleControls() {
      const control = targetObject.document?.getElementById?.(CLASSICAL_BUILT_IN_PARTICLE_CONTROL_ID);
      if (!control) return false;
      control.value = "none";
      const shortcutId = targetObject.document?.getElementById?.("classical-rule-logic-particle-combination-shortcut")?.value || "none";
      const honorificized = targetObject.document?.getElementById?.("classical-rule-logic-sentence-particle-honorific")?.checked === true;
      const baseId = shortcutId !== "none" ? shortcutId : ClassicalParticleMatrixIndividualId;
      const honorificizedId = honorificized ? CLASSICAL_HONORIFICIZED_PARTICLES_BY_BASE[baseId] || "" : "";
      if (honorificizedId && control.querySelector?.(`option[value="${honorificizedId}"]`)) {
        control.value = honorificizedId;
        return true;
      }
      const selectedEntry = (typeof targetObject.getClassicalNahuatlParticleEntries === "function"
        ? targetObject.getClassicalNahuatlParticleEntries()
        : []).find(entry => entry.id === shortcutId);
      if (selectedEntry && control.querySelector?.(`option[value="${selectedEntry.id}"]`)) {
        control.value = selectedEntry.id;
      }
      return true;
    }
    let ClassicalParticleCombinationDraftSegments = [];
    let ClassicalParticleMatrixIndividualId = "none";
    let ClassicalParticleMatrixIndividualKind = "particle";
    function clearClassicalCombinationInternalInputs() {
      [
        "classical-rule-logic-introductory-particle",
        "classical-rule-logic-preface-particle",
        "classical-rule-logic-introductory-modifier"
      ].forEach(id => {
        const control = targetObject.document?.getElementById?.(id);
        if (control) control.value = "none";
      });
      const antecessive = targetObject.document?.getElementById?.("classical-rule-logic-prefix-stack");
      if (antecessive) antecessive.checked = false;
      return true;
    }
    function getClassicalParticleCombinationSequenceSegments(entry = null) {
      return Array.from(entry?.formulaSegments || [])
        .filter(segment => !["ah#", "ca#"].includes(segment))
        .map(segment => ({
          "nō": "no",
          yoc: "oc"
        })[segment] || segment);
    }
    function getClassicalParticleCombinationShortcutEntries() {
      return typeof targetObject.getClassicalNahuatlParticleCombinationShortcutEntries === "function"
        ? targetObject.getClassicalNahuatlParticleCombinationShortcutEntries()
        : [];
    }
    function classicalParticleCombinationStartsWith(sequence = [], prefix = []) {
      return prefix.every((segment, index) => sequence[index] === segment);
    }
    function getClassicalParticleMatrixEntries() {
      const polarity = targetObject.document?.getElementById?.("classical-rule-logic-polarity")?.value || "positive";
      return getClassicalParticleCombinationShortcutEntries()
        .filter(entry => entry.polarity === polarity);
    }
    function getClassicalParticleMatrixIndividualEntries() {
      const polarity = targetObject.document?.getElementById?.("classical-rule-logic-polarity")?.value || "positive";
      const tense = targetObject.document?.getElementById?.("classical-rule-logic-tense")?.value || "present";
      const excludedIds = new Set([
        "l3-ah-negative",
        "l3-ca-negative",
        "l3-e-vocative"
      ]);
      if (polarity !== "negative") excludedIds.add("l3-zo");
      if (!["preterit", "distant-past", "distant-past-as-past", "imperfect", "past"].includes(tense)) {
        excludedIds.add("l3-o-antecessive");
      }
      return (typeof targetObject.getClassicalNahuatlParticleEntries === "function"
        ? targetObject.getClassicalNahuatlParticleEntries()
        : [])
        .filter(entry => entry.formulaSegments?.length === 1 && !excludedIds.has(entry.id))
        .map(entry => ({ ...entry, matrixKind: "particle" }));
    }
    function getClassicalParticleMatrixCombinationSegment(entry = null) {
      if (entry?.id === "l3-no-adverbial") return "no";
      return String(entry?.sourceForm || "");
    }
    function populateClassicalParticleMatrixSelect(select, choices, value, placeholder) {
      Array.from(select.children || []).forEach(child => child.remove());
      const none = targetObject.document.createElement("option");
      none.value = "";
      none.textContent = placeholder;
      select.appendChild(none);
      choices.forEach(choice => {
        const option = targetObject.document.createElement("option");
        option.value = choice;
        option.textContent = choice;
        select.appendChild(option);
      });
      select.value = choices.includes(value) ? value : "";
    }
    function resolveClassicalParticleMatrix() {
      const entries = getClassicalParticleMatrixEntries();
      const polarity = targetObject.document?.getElementById?.("classical-rule-logic-polarity")?.value || "positive";
      const shortcutControl = targetObject.document?.getElementById?.("classical-rule-logic-particle-combination-shortcut");
      const particleControl = targetObject.document?.getElementById?.("classical-rule-logic-sentence-particle");
      const adverbialControl = targetObject.document?.getElementById?.("classical-rule-logic-sentence-adverbial");
      const exact = entries.filter(entry => {
        const sequence = getClassicalParticleCombinationSequenceSegments(entry);
        return sequence.length === ClassicalParticleCombinationDraftSegments.length
          && classicalParticleCombinationStartsWith(sequence, ClassicalParticleCombinationDraftSegments);
      });
      if (polarity === "negative"
        && ClassicalParticleMatrixIndividualId !== "none"
        && ClassicalParticleCombinationDraftSegments.length === 1
        && exact.length) {
        if (shortcutControl) shortcutControl.value = exact[0].shortcutId;
        applyClassicalParticleCombinationShortcut(exact[0].shortcutId);
        return exact[0];
      }
      if (ClassicalParticleMatrixIndividualId !== "none"
        && ClassicalParticleCombinationDraftSegments.length === 1) {
        clearClassicalParticleCombinationAppliedResult();
        if (shortcutControl) shortcutControl.value = "none";
        if (ClassicalParticleMatrixIndividualKind === "adverbial") {
          if (adverbialControl) adverbialControl.value = ClassicalParticleMatrixIndividualId;
        } else if (particleControl?.querySelector?.(`option[value="${ClassicalParticleMatrixIndividualId}"]`)) {
          particleControl.value = ClassicalParticleMatrixIndividualId;
        } else if (adverbialControl?.querySelector?.(`option[value="${ClassicalParticleMatrixIndividualId}"]`)) {
          adverbialControl.value = ClassicalParticleMatrixIndividualId;
          ClassicalParticleMatrixIndividualKind = "adverbial";
        } else if (["l3-ma", "l3-tla"].includes(ClassicalParticleMatrixIndividualId)) {
          const mood = targetObject.document?.getElementById?.("classical-rule-logic-mood");
          const introductory = targetObject.document?.getElementById?.("classical-rule-logic-introductory-particle");
          if (mood) mood.value = "optative";
          if (introductory) introductory.value = ClassicalParticleMatrixIndividualId === "l3-ma" ? "mā" : "tlā";
        } else if (ClassicalParticleMatrixIndividualId === "l3-o-antecessive") {
          const antecessive = targetObject.document?.getElementById?.("classical-rule-logic-prefix-stack");
          if (antecessive) antecessive.checked = true;
        }
        return null;
      }
      if (exact.length) {
        const chosen = exact.find(entry => entry.shortcutId === shortcutControl?.value) || exact[0];
        if (shortcutControl) shortcutControl.value = chosen.shortcutId;
        applyClassicalParticleCombinationShortcut(chosen.shortcutId);
        return chosen;
      }
      clearClassicalParticleCombinationAppliedResult();
      if (ClassicalParticleCombinationDraftSegments.length === 1 && particleControl) {
        const segment = ClassicalParticleCombinationDraftSegments[0];
        const entry = (typeof targetObject.getClassicalNahuatlSentenceParticleEntries === "function"
          ? targetObject.getClassicalNahuatlSentenceParticleEntries()
          : []).find(candidate => candidate.sourceForm === segment && candidate.formulaSegments?.length === 1);
        if (entry) particleControl.value = entry.id;
      }
      return null;
    }
    function clearClassicalParticleCombinationAppliedResult() {
      const quickControl = targetObject.document?.getElementById?.("classical-rule-logic-particle-combination-shortcut");
      const particleControl = targetObject.document?.getElementById?.("classical-rule-logic-sentence-particle");
      const adverbialControl = targetObject.document?.getElementById?.("classical-rule-logic-sentence-adverbial");
      if (quickControl) quickControl.value = "none";
      if (particleControl) {
        Array.from(particleControl.options || []).forEach(option => {
          if (option.dataset.classicalShortcutOriginalText) {
            option.textContent = option.dataset.classicalShortcutOriginalText;
            delete option.dataset.classicalShortcutOriginalText;
          }
        });
        particleControl.value = "none";
      }
      if (adverbialControl) adverbialControl.value = "none";
      clearClassicalCombinationInternalInputs();
      return particleControl;
    }
    function renderClassicalParticleCombinationBuilder() {
      const parts = targetObject.document?.getElementById?.("classical-particle-matrix-slots");
      const status = targetObject.document?.getElementById?.("classical-particle-matrix-status");
      if (!parts || !status) return false;
      const tense = targetObject.document?.getElementById?.("classical-rule-logic-tense")?.value || "present";
      const incompatibleAntecessive = ClassicalParticleMatrixIndividualId === "l3-o-antecessive"
        && !["preterit", "distant-past", "distant-past-as-past", "imperfect", "past"].includes(tense);
      if (incompatibleAntecessive) {
        ClassicalParticleCombinationDraftSegments = [];
        ClassicalParticleMatrixIndividualId = "none";
        ClassicalParticleMatrixIndividualKind = "particle";
      }
      const quickControl = targetObject.document.getElementById("classical-rule-logic-particle-combination-shortcut");
      const selectedEntry = typeof targetObject.findClassicalNahuatlParticleCombinationShortcutEntry === "function"
        ? targetObject.findClassicalNahuatlParticleCombinationShortcutEntry(quickControl?.value || "none")
        : null;
      if (selectedEntry) {
        const selectedSegments = getClassicalParticleCombinationSequenceSegments(selectedEntry);
        if (selectedSegments.join("\u0000") !== ClassicalParticleCombinationDraftSegments.join("\u0000")) {
          ClassicalParticleCombinationDraftSegments = selectedSegments;
          ClassicalParticleMatrixIndividualId = "none";
          ClassicalParticleMatrixIndividualKind = "particle";
        }
      }
      const entries = getClassicalParticleMatrixEntries();
      const individualEntries = getClassicalParticleMatrixIndividualEntries();
      const normalizedSegments = [];
      ClassicalParticleCombinationDraftSegments.forEach((segment, index) => {
        if (normalizedSegments.length !== index) return;
        const prefix = normalizedSegments.slice();
        const licensed = new Set();
        entries.forEach(entry => {
          const sequence = getClassicalParticleCombinationSequenceSegments(entry);
          if (sequence.length > index && classicalParticleCombinationStartsWith(sequence, prefix)) {
            licensed.add(sequence[index]);
          }
        });
        if (index === 0) individualEntries.forEach(entry => {
          licensed.add(getClassicalParticleMatrixCombinationSegment(entry));
        });
        if (licensed.has(segment)) normalizedSegments.push(segment);
      });
      ClassicalParticleCombinationDraftSegments = normalizedSegments;
      const combinationSegments = normalizedSegments.slice();
      Array.from(parts.children || []).forEach(child => child.remove());
      const maxSlots = 4;
      for (let index = 0; index < maxSlots; index += 1) {
        if (index > 0 && combinationSegments.length < index) break;
        const prefix = combinationSegments.slice(0, index);
        const choices = new Set();
        entries.forEach(entry => {
          const sequence = getClassicalParticleCombinationSequenceSegments(entry);
          if (sequence.length > index && classicalParticleCombinationStartsWith(sequence, prefix)) {
            choices.add(sequence[index]);
          }
        });
        const slotIndividualEntries = index === 0
          ? individualEntries
          : [];
        slotIndividualEntries.forEach(entry => {
          choices.add(getClassicalParticleMatrixCombinationSegment(entry));
        });
        const segment = combinationSegments[index] || "";
        if (!choices.size && index > 0) break;
        const field = targetObject.document.createElement("label");
        field.className = "classical-particle-combination-builder__field";
        const label = targetObject.document.createElement("span");
        label.className = "classical-particle-combination-builder__field-label";
        label.textContent = `Particle ${index + 1}`;
        const select = targetObject.document.createElement("select");
        select.className = "classical-particle-combination-builder__part-select";
        select.dataset.combinationPartIndex = String(index);
        if (index === 0) {
          Array.from(select.children || []).forEach(child => child.remove());
          const none = targetObject.document.createElement("option");
          none.value = "";
          none.textContent = "none";
          select.appendChild(none);
          const group = targetObject.document.createElement("optgroup");
          group.label = "Individual particle options";
          slotIndividualEntries.forEach(entry => {
            const option = targetObject.document.createElement("option");
            option.value = `${entry.matrixKind}:${entry.id}`;
            option.textContent = [entry.sourceForm, entry.gloss].filter(Boolean).join(" · ");
            option.dataset.particleSegment = getClassicalParticleMatrixCombinationSegment(entry);
            option.dataset.particleKind = entry.matrixKind;
            group.appendChild(option);
          });
          select.appendChild(group);
          if (ClassicalParticleMatrixIndividualId !== "none") {
            select.value = `${ClassicalParticleMatrixIndividualKind}:${ClassicalParticleMatrixIndividualId}`;
          } else if (segment) {
            const matching = slotIndividualEntries.find(entry => (
              getClassicalParticleMatrixCombinationSegment(entry) === segment
            ));
            select.value = matching ? `${matching.matrixKind}:${matching.id}` : "";
          }
        } else {
          populateClassicalParticleMatrixSelect(
            select,
            Array.from(choices),
            segment,
            "no additional particle"
          );
        }
        field.append(label, select);
        parts.appendChild(field);
      }
      const exactEntries = entries.filter(entry => {
        const sequence = getClassicalParticleCombinationSequenceSegments(entry);
        return sequence.length === combinationSegments.length
          && classicalParticleCombinationStartsWith(sequence, combinationSegments);
      });
      const selectedIndividual = individualEntries.find(entry => (
        entry.id === ClassicalParticleMatrixIndividualId
      )) || null;
      const selectedExactEntry = exactEntries.find(entry => entry.shortcutId === quickControl?.value)
        || exactEntries[0]
        || null;
      if (exactEntries.length > 1) {
        const field = targetObject.document.createElement("label");
        field.className = "classical-particle-combination-builder__field";
        const label = targetObject.document.createElement("span");
        label.className = "classical-particle-combination-builder__field-label";
        label.textContent = "Written form";
        const select = targetObject.document.createElement("select");
        select.className = "classical-particle-combination-builder__variant-select";
        select.dataset.combinationVariant = "true";
        exactEntries.forEach(entry => {
          const option = targetObject.document.createElement("option");
          option.value = entry.shortcutId;
          option.textContent = entry.sourceForm;
          select.appendChild(option);
        });
        select.value = selectedExactEntry?.shortcutId || exactEntries[0].shortcutId;
        field.append(label, select);
        parts.appendChild(field);
      }
      status.textContent = selectedExactEntry
        ? [selectedExactEntry.sourceForm, selectedExactEntry.gloss].filter(Boolean).join(" · ")
        : selectedIndividual && combinationSegments.length === 1
          ? [selectedIndividual.sourceForm, selectedIndividual.gloss].filter(Boolean).join(" · ")
        : combinationSegments.length
          ? "Choose a licensed next particle."
          : "Choose an individual particle. More choices appear only when a combination is licensed.";
      syncClassicalBuiltInParticleControls();
      return true;
    }
    function completeClassicalParticleCombinationDraft() {
      const entries = getClassicalParticleCombinationShortcutEntries();
      const currentPolarity = targetObject.document?.getElementById?.("classical-rule-logic-polarity")?.value || "positive";
      const exactEntries = entries.filter(entry => {
        const sequence = getClassicalParticleCombinationSequenceSegments(entry);
        return sequence.length === ClassicalParticleCombinationDraftSegments.length
          && classicalParticleCombinationStartsWith(sequence, ClassicalParticleCombinationDraftSegments);
      });
      const polarityMatches = exactEntries.filter(entry => entry.polarity === currentPolarity);
      const candidates = polarityMatches.length ? polarityMatches : exactEntries;
      if (candidates.length !== 1) return false;
      const quickControl = targetObject.document?.getElementById?.("classical-rule-logic-particle-combination-shortcut");
      if (quickControl) quickControl.value = candidates[0].shortcutId;
      applyClassicalParticleCombinationShortcut(candidates[0].shortcutId);
      return true;
    }
    function initClassicalParticleCombinationBuilder() {
      const root = targetObject.document?.getElementById?.("classical-particle-matrix");
      if (!root || root.dataset.bound === "true") return false;
      root.dataset.bound = "true";
      root.addEventListener("change", event => {
        const variantControl = event.target?.closest?.("[data-combination-variant]");
        if (variantControl) {
          const shortcutControl = targetObject.document?.getElementById?.("classical-rule-logic-particle-combination-shortcut");
          if (shortcutControl) shortcutControl.value = variantControl.value;
          applyClassicalParticleCombinationShortcut(variantControl.value);
          renderClassicalParticleCombinationBuilder();
          const particleControl = targetObject.document.getElementById("classical-rule-logic-sentence-particle");
          refreshClassicalRuleLogicSurfaceFromControl(particleControl);
          return;
        }
        const partControl = event.target?.closest?.("[data-combination-part-index]");
        if (!partControl) return;
        const index = Number(partControl.dataset.combinationPartIndex);
        const rawValue = String(partControl.value || "");
        const selectedOption = partControl.selectedOptions?.[0];
        const isIndividual = rawValue.startsWith("particle:") || rawValue.startsWith("adverbial:");
        const value = isIndividual
          ? String(selectedOption?.dataset?.particleSegment || "")
          : rawValue;
        ClassicalParticleMatrixIndividualId = index === 0 && isIndividual
          ? rawValue.slice(rawValue.indexOf(":") + 1)
          : "none";
        ClassicalParticleMatrixIndividualKind = index === 0 && isIndividual
          ? String(selectedOption?.dataset?.particleKind || "particle")
          : "particle";
        ClassicalParticleCombinationDraftSegments = value
          ? [...ClassicalParticleCombinationDraftSegments.slice(0, index), value]
          : ClassicalParticleCombinationDraftSegments.slice(0, index);
        if (index > 0) ClassicalParticleMatrixIndividualId = "none";
        resolveClassicalParticleMatrix();
        renderClassicalParticleCombinationBuilder();
        const particleControl = targetObject.document.getElementById("classical-rule-logic-sentence-particle");
        refreshClassicalRuleLogicSurfaceFromControl(particleControl);
      });
      renderClassicalParticleCombinationBuilder();
      return true;
    }
    function applyClassicalBuiltInParticle(category = "", entryId = "none") {
      const honorificControl = targetObject.document?.getElementById?.("classical-rule-logic-sentence-particle-honorific");
      if (honorificControl) honorificControl.checked = false;
      if (!entryId || entryId === "none") {
        clearClassicalParticleCombinationAppliedResult();
        ClassicalParticleCombinationDraftSegments = [];
        ClassicalParticleMatrixIndividualId = "none";
        ClassicalParticleMatrixIndividualKind = "particle";
        renderClassicalParticleCombinationBuilder();
        refreshClassicalRuleLogicSurfaceFromControl();
        return true;
      }
      if (category === "honorificized") {
        const baseId = CLASSICAL_HONORIFICIZED_PARTICLE_BASES[entryId] || "";
        if (!baseId) return false;
        const shortcut = typeof targetObject.findClassicalNahuatlParticleCombinationShortcutEntry === "function"
          ? targetObject.findClassicalNahuatlParticleCombinationShortcutEntry(baseId)
          : null;
        if (shortcut) {
          const shortcutControl = targetObject.document?.getElementById?.("classical-rule-logic-particle-combination-shortcut");
          if (shortcutControl) shortcutControl.value = shortcut.shortcutId;
          applyClassicalParticleCombinationShortcut(shortcut.shortcutId);
        } else {
          const baseEntry = getClassicalParticleMatrixIndividualEntries().find(entry => entry.id === baseId);
          if (!baseEntry) return false;
          setClassicalParticlePolarityControl("positive");
          ClassicalParticleMatrixIndividualId = baseEntry.id;
          ClassicalParticleMatrixIndividualKind = baseEntry.matrixKind;
          ClassicalParticleCombinationDraftSegments = [getClassicalParticleMatrixCombinationSegment(baseEntry)];
          resolveClassicalParticleMatrix();
        }
        if (honorificControl) honorificControl.checked = true;
      } else {
        const shortcut = typeof targetObject.findClassicalNahuatlParticleCombinationShortcutEntry === "function"
          ? targetObject.findClassicalNahuatlParticleCombinationShortcutEntry(entryId)
          : null;
        if (!shortcut) return false;
        const shortcutControl = targetObject.document?.getElementById?.("classical-rule-logic-particle-combination-shortcut");
        if (shortcutControl) shortcutControl.value = shortcut.shortcutId;
        applyClassicalParticleCombinationShortcut(shortcut.shortcutId);
      }
      renderClassicalParticleCombinationBuilder();
      const particleControl = targetObject.document?.getElementById?.("classical-rule-logic-sentence-particle");
      refreshClassicalRuleLogicSurfaceFromControl(particleControl);
      return true;
    }
    function initClassicalBuiltInParticleControls() {
      const root = targetObject.document?.getElementById?.("classical-built-in-particles");
      if (!root || root.dataset.bound === "true") return false;
      root.dataset.bound = "true";
      root.addEventListener("change", event => {
        const control = event.target?.closest?.("[data-classical-built-in-particle]");
        if (!control) return;
        const category = control.selectedOptions?.[0]?.dataset?.classicalBuiltInParticleCategory || "";
        applyClassicalBuiltInParticle(category, control.value || "none");
      });
      syncClassicalBuiltInParticleControls();
      return true;
    }
    function applyClassicalParticleCombinationShortcut(shortcutId = "none") {
      const entry = typeof targetObject.findClassicalNahuatlParticleCombinationShortcutEntry === "function"
        ? targetObject.findClassicalNahuatlParticleCombinationShortcutEntry(shortcutId)
        : null;
      if (!entry) return false;
      clearClassicalCombinationInternalInputs();
      const combinationSegments = getClassicalParticleCombinationSequenceSegments(entry);
      const moodControl = targetObject.document?.getElementById?.("classical-rule-logic-mood");
      if (combinationSegments.length > 1
        && combinationSegments.includes("mā")
        && moodControl?.value === "optative") {
        moodControl.value = "indicative";
      }
      ClassicalParticleMatrixIndividualId = "none";
      ClassicalParticleMatrixIndividualKind = "particle";
      ClassicalParticleCombinationDraftSegments = combinationSegments;
      const particleControl = targetObject.document?.getElementById?.("classical-rule-logic-sentence-particle");
      const adverbialControl = targetObject.document?.getElementById?.("classical-rule-logic-sentence-adverbial");
      const polarityControl = targetObject.document?.getElementById?.("classical-rule-logic-polarity");
      if (particleControl) {
        Array.from(particleControl.options || []).forEach(option => {
          if (option.dataset.classicalShortcutOriginalText) {
            option.textContent = option.dataset.classicalShortcutOriginalText;
            delete option.dataset.classicalShortcutOriginalText;
          }
        });
        particleControl.value = entry.particleId;
        const selectedOption = particleControl.selectedOptions?.[0];
        if (selectedOption && entry.particleChoice) {
          selectedOption.dataset.classicalShortcutOriginalText = selectedOption.textContent;
          selectedOption.textContent = entry.particleChoice;
        }
      }
      if (adverbialControl) adverbialControl.value = entry.adverbialId;
      if (polarityControl) polarityControl.value = entry.polarity;
      targetObject.document?.querySelectorAll?.('[data-classical-segment-control="classical-rule-logic-polarity"]')
        ?.forEach(button => {
          const active = button.dataset.classicalSegmentValue === entry.polarity;
          button.classList.toggle("is-active", active);
          button.setAttribute("aria-pressed", active ? "true" : "false");
        });
      return true;
    }
    function populateClassicalSentenceAdverbialControl() {
      const control = targetObject.document?.getElementById?.("classical-rule-logic-sentence-adverbial");
      const entries = typeof targetObject.getClassicalNahuatlSentenceAdverbialEntries === "function"
        ? targetObject.getClassicalNahuatlSentenceAdverbialEntries()
        : [];
      if (!control || !Array.isArray(entries)) return false;
      const selectedValue = String(control.value || "none");
      Array.from(control.children || []).forEach(child => child.remove());
      const noneOption = targetObject.document.createElement("option");
      noneOption.value = "none";
      noneOption.textContent = "none";
      noneOption.dataset.classicalAuthorityRole = "no-sentence-adverbial";
      control.appendChild(noneOption);
      const group = targetObject.document.createElement("optgroup");
      group.label = "Adverbial modifiers";
      group.dataset.classicalParticleFunctionScope = "adverbial-modifier";
      control.appendChild(group);
      entries.forEach(entry => {
        const option = targetObject.document.createElement("option");
        option.value = entry.id;
        option.textContent = [entry.sourceForm, entry.gloss].filter(Boolean).join(" · ");
        option.dataset.classicalParticleFunctionScope = entry.functionScope || "";
        option.dataset.classicalParticlePlacement = entry.placement?.scope || "";
        option.dataset.classicalAuthorityRole = "typed-lesson3-adverbial-choice";
        group.appendChild(option);
      });
      control.value = Array.from(control.options || []).some(option => option.value === selectedValue) ? selectedValue : "none";
      return true;
    }
    function getClassicalBasalUnitDatasetTargets() {
      if (typeof targetObject.document === "undefined") {
        return [];
      }
      return [targetObject.document.documentElement, targetObject.document.body, targetObject.document.querySelector(".panel-grid"), targetObject.document.querySelector(".panel-main-column"), targetObject.document.querySelector(".panel-output-column"), targetObject.document.getElementById("container-inputs"), targetObject.document.getElementById("panel-stack-pane-tense"), targetObject.document.getElementById("container-tense-grid"), targetObject.document.getElementById("classical-basal-unit-controls")].filter(Boolean);
    }
    const CLASSICAL_SOURCE_PARTS_MODE = Object.freeze({
      wholeStem: "whole-stem",
      embedMatrix: "embed-matrix"
    });
    const CLASSICAL_SOURCE_ANALYSIS_KIND = Object.freeze({
      internalMorphemes: "internal-morphemes"
    });
    let ClassicalSourcePartsCommittedSignature = "";
    function normalizeClassicalSourcePartsMode(value = "") {
      const normalized = String(value || "").trim().toLowerCase();
      const aliases = {
        whole: CLASSICAL_SOURCE_PARTS_MODE.wholeStem,
        "whole-stem": CLASSICAL_SOURCE_PARTS_MODE.wholeStem,
        compound: CLASSICAL_SOURCE_PARTS_MODE.embedMatrix,
        "embed-matrix": CLASSICAL_SOURCE_PARTS_MODE.embedMatrix
      };
      return aliases[normalized] || CLASSICAL_SOURCE_PARTS_MODE.wholeStem;
    }
    function getClassicalSourcePartsModeLabel(mode = "") {
      const normalizedMode = normalizeClassicalSourcePartsMode(mode);
      if (normalizedMode === CLASSICAL_SOURCE_PARTS_MODE.embedMatrix) {
        return "embed + matrix";
      }
      return "stem";
    }
    function getClassicalSourcePartControlElements() {
      if (typeof targetObject.document === "undefined") {
        return {};
      }
      return {
        root: targetObject.document.getElementById("classical-source-parts"),
        modeButtons: Array.from(targetObject.document.querySelectorAll("button[data-classical-source-parts-kind]")),
        wholeInput: targetObject.document.getElementById("classical-source-whole"),
        embedInput: targetObject.document.getElementById("classical-source-embed"),
        matrixInput: targetObject.document.getElementById("classical-source-matrix"),
        internalMorphs: targetObject.document.getElementById("classical-source-internal-morphs")
      };
    }
    function getClassicalNncSourceGuideElements() {
      if (typeof targetObject.document === "undefined") {
        return {};
      }
      return {
        root: targetObject.document.getElementById("classical-nnc-source-guide"),
        select: targetObject.document.getElementById("classical-nnc-source-example")
      };
    }
    function getClassicalVncSourceGuideElements() {
      if (typeof targetObject.document === "undefined") {
        return {};
      }
      return {
        root: targetObject.document.getElementById("classical-vnc-source-guide"),
        select: targetObject.document.getElementById("classical-vnc-source-stem"),
        initialIFact: targetObject.document.getElementById("classical-vnc-source-initial-i"),
        initialIChoiceField: targetObject.document.getElementById("classical-vnc-source-initial-i-choice-field"),
        initialIChoice: targetObject.document.getElementById("classical-vnc-source-initial-i-choice"),
        sourceLexemeFact: targetObject.document.getElementById("classical-vnc-source-lexeme-fact"),
        sourceLexemeChoiceField: targetObject.document.getElementById("classical-vnc-source-lexeme-choice-field"),
        sourceLexemeChoice: targetObject.document.getElementById("classical-vnc-source-lexeme-choice")
      };
    }
    function getClassicalCanonicalSourceStemInventory(unit = "") {
      return typeof targetObject.getClassicalNahuatlCanonicalSourceStemInventory === "function"
        ? targetObject.getClassicalNahuatlCanonicalSourceStemInventory(unit)
        : [];
    }
    function populateClassicalVncSourceStemPicker() {
      const { select } = getClassicalVncSourceGuideElements();
      if (!select || select.dataset?.classicalCanonicalInventoryPopulated === "true") {
        return select || null;
      }
      const inventory = getClassicalCanonicalSourceStemInventory("vnc");
      inventory.forEach(record => {
        const option = targetObject.document.createElement("option");
        option.value = `${record.valenceDisplay}|${record.stem}`;
        option.textContent = record.citation;
        option.dataset.classicalVncSourceStem = record.stem;
        option.dataset.classicalVncSourceValenceDisplay = record.valenceDisplay;
        option.dataset.classicalVncSourceDefaultValence = record.defaultSourceValence || "";
        option.dataset.classicalVncSourceSection = record.sourceSection;
        option.dataset.classicalVncSourceInitialIKind = record.initialIAnalysis?.kind || "not-applicable";
        option.dataset.classicalSourceAuthorizes = "none";
        select.appendChild(option);
      });
      select.dataset.classicalCanonicalInventoryPopulated = "true";
      return select;
    }
    function applyClassicalVncBuiltInSourceValenceDefault(root = null, option = null, options = {}) {
      const stem = normalizeClassicalFuenteSourcePartStem(
        option?.dataset?.classicalVncSourceStem || ""
      );
      const defaultValence = String(
        option?.dataset?.classicalVncSourceDefaultValence || ""
      ).trim();
      const valenceControl = targetObject.document?.getElementById?.(
        "classical-rule-logic-valence"
      );
      if (
        !root
        || !stem
        || !valenceControl
        || !["intransitive", "specific-projective"].includes(defaultValence)
      ) {
        return false;
      }
      const signature = `${stem}|${defaultValence}`;
      const force = options.force === true;
      if (!force && root.dataset?.classicalVncBuiltInDefaultSignature === signature) {
        return false;
      }
      if (root.dataset) {
        root.dataset.classicalVncBuiltInDefaultSignature = signature;
      }
      if (!force && valenceControl.value !== "intransitive") {
        return false;
      }
      if (valenceControl.value === defaultValence) {
        return false;
      }
      valenceControl.value = defaultValence;
      valenceControl.dataset.classicalBuiltInSourceDefault = signature;
      if (options.refresh === true) {
        valenceControl.dataset.classicalBuiltInDefaultDispatch = "true";
        targetObject.window?.setTimeout?.(() => {
          valenceControl.dispatchEvent(new targetObject.Event("change", {
            bubbles: true
          }));
        }, 0);
      }
      return true;
    }
    function getClassicalVncCanonicalInitialIRecord(sourceStem = "", sourceValence = "") {
      const stem = normalizeClassicalFuenteSourcePartStem(sourceStem);
      const valenceDisplay = String(sourceValence || "").trim() === "intransitive" ? "intransitive" : "transitive";
      return getClassicalCanonicalSourceStemInventory("vnc").find(record => record?.stem === stem && record?.valenceDisplay === valenceDisplay) || null;
    }
    function getClassicalVncSourceLexemeRecord(sourceStem = "", sourceValence = "") {
      const stem = normalizeClassicalFuenteSourcePartStem(sourceStem);
      if (!stem) {
        return null;
      }
      const valenceDisplay = String(sourceValence || "").trim() === "intransitive"
        ? "intransitive"
        : "transitive";
      const exact = getClassicalCanonicalSourceStemInventory("vnc").filter(record => (
        record?.stem === stem
        && record?.valenceDisplay === valenceDisplay
        && record?.sourceLexemeSelectionRequired === true
      ));
      if (exact.length === 1) {
        return exact[0];
      }
      const stemOnly = getClassicalCanonicalSourceStemInventory("vnc").filter(record => (
        record?.stem === stem
        && record?.sourceLexemeSelectionRequired === true
      ));
      return stemOnly.length === 1 ? stemOnly[0] : null;
    }
    function buildClassicalVncSourceLexemeSelectionFrame(sourceStem = "", sourceLexemeId = "", sourceValence = "") {
      const normalizedStem = normalizeClassicalFuenteSourcePartStem(
        stripClassicalSourceDisplayWrapping(sourceStem)
      );
      const requestedSourceLexemeId = String(sourceLexemeId || "").trim().toLowerCase();
      const record = getClassicalVncSourceLexemeRecord(
        normalizedStem,
        sourceValence
      );
      const selectionRequired = record?.sourceLexemeSelectionRequired === true;
      const availableSourceLexemeIds = Array.isArray(record?.sourceLexemeIds)
        ? [...record.sourceLexemeIds]
        : [];
      const accepted = selectionRequired
        ? availableSourceLexemeIds.includes(requestedSourceLexemeId)
        : !requestedSourceLexemeId;
      const blockReason = selectionRequired && !requestedSourceLexemeId
        ? "canonical-source-lexeme-selection-required"
        : requestedSourceLexemeId && !record
          ? "canonical-source-lexeme-selection-not-applicable"
          : requestedSourceLexemeId && !accepted
            ? "canonical-source-lexeme-selection-not-lexically-authorized"
            : "";
      return Object.freeze({
        kind: "classical-vnc-source-lexeme-ui-selection-frame",
        version: 1,
        authorizationStatus: blockReason ? "blocked" : "authorized",
        blockReason,
        sourceStem: normalizedStem,
        sourceLexemeId: accepted ? requestedSourceLexemeId : "",
        requestedSourceLexemeId,
        sourceLexemeSelectionRequired: selectionRequired,
        availableSourceLexemeIds: Object.freeze(availableSourceLexemeIds),
        canonicalSourceRecord: record,
        restoredStateAuthority: false,
        urlStateAuthority: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false
      });
    }
    function syncClassicalVncSourceLexemeFact(root = null, select = null, options = {}) {
      const {
        sourceLexemeFact: fact,
        sourceLexemeChoiceField: choiceField,
        sourceLexemeChoice: choice
      } = getClassicalVncSourceGuideElements();
      const sourceParts = getClassicalSourcePartControlState();
      const sourceStem = sourceParts.mode === CLASSICAL_SOURCE_PARTS_MODE.embedMatrix
        ? ""
        : sourceParts.sourceWholeStem;
      const sourceValence = targetObject.document?.getElementById?.("classical-rule-logic-valence")?.value
        || String(select?.selectedOptions?.[0]?.dataset?.classicalVncSourceValenceDisplay || "");
      const selectionFrame = buildClassicalVncSourceLexemeSelectionFrame(
        sourceStem,
        choice?.value || "",
        sourceValence
      );
      const sourceRecord = selectionFrame.canonicalSourceRecord;
      const expectedOptionValues = sourceRecord
        ? ["", ...selectionFrame.availableSourceLexemeIds]
        : [];
      const actualOptionValues = Array.from(choice?.options || []).map(option =>
        String(option?.value || "")
      );
      const optionInventoryMatches = Boolean(
        sourceRecord
        && actualOptionValues.length === expectedOptionValues.length
        && actualOptionValues.every((value, index) =>
          value === expectedOptionValues[index]
        )
      );
      const active = options.active !== false;
      const choiceApplies = active
        && selectionFrame.sourceLexemeSelectionRequired
        && optionInventoryMatches;
      const previousStem = String(
        root?.dataset?.classicalVncSourceLexemeChoiceStem || ""
      );
      if (choiceField) {
        choiceField.hidden = !choiceApplies;
      }
      if (choice) {
        choice.disabled = !choiceApplies;
        choice.required = choiceApplies;
        choice.setAttribute?.("aria-required", String(choiceApplies));
        if (
          !choiceApplies
          || previousStem !== sourceStem
          || !selectionFrame.availableSourceLexemeIds.includes(
            String(choice.value || "")
          )
        ) {
          choice.value = "";
        }
        if (choice.dataset) {
          choice.dataset.classicalSourceLexemeStem = choiceApplies
            ? sourceStem
            : "";
          choice.dataset.classicalSourceLexemeInventoryStatus =
            optionInventoryMatches ? "canonical-match" : "blocked-mismatch";
        }
      }
      if (root?.dataset) {
        if (choiceApplies) {
          root.dataset.classicalVncSourceLexemeChoiceStem = sourceStem;
          root.dataset.classicalVncSourceLexemeSelection =
            String(choice?.value || "") || "required";
        } else {
          delete root.dataset.classicalVncSourceLexemeChoiceStem;
          root.dataset.classicalVncSourceLexemeSelection = "not-applicable";
        }
      }
      if (fact) {
        fact.hidden = !choiceApplies;
        fact.textContent = choiceApplies
          ? "Lexical Source: this pach-i-hui verbstem names distinct pressed-down and satiated lexemes. Choose the intended Source meaning; causative formation remains a Grammar operation."
          : "";
      }
      return Object.freeze({
        ...selectionFrame,
        choiceApplies,
        optionInventoryMatches,
        sourceLexemeId: choiceApplies ? String(choice?.value || "") : ""
      });
    }
    function syncClassicalVncSourceInitialIFact(root = null, select = null) {
      const {
        initialIFact: fact,
        initialIChoiceField: choiceField,
        initialIChoice: choice
      } = getClassicalVncSourceGuideElements();
      const sourceParts = getClassicalSourcePartControlState();
      const sourceStem = sourceParts.mode === CLASSICAL_SOURCE_PARTS_MODE.embedMatrix
        ? ""
        : sourceParts.sourceWholeStem;
      const sourceValence = targetObject.document?.getElementById?.("classical-rule-logic-valence")?.value || "intransitive";
      const canonicalRecord = getClassicalVncCanonicalInitialIRecord(sourceStem, sourceValence)
        || getClassicalVncCanonicalInitialIRecord(sourceStem, String(select?.selectedOptions?.[0]?.dataset?.classicalVncSourceValenceDisplay || ""));
      const canonicalKind = String(canonicalRecord?.initialIAnalysis?.kind || "").trim();
      const initialI = /^[iī]/iu.test(sourceStem);
      const userChoiceApplies = initialI
        && !canonicalKind;
      if (choiceField) {
        choiceField.hidden = !userChoiceApplies;
      }
      if (choice) {
        choice.disabled = !userChoiceApplies;
        choice.required = userChoiceApplies;
        if (userChoiceApplies) {
          if (root?.dataset?.classicalVncSourceInitialIChoiceStem !== sourceStem) {
            choice.value = "";
          }
          if (root?.dataset) {
            root.dataset.classicalVncSourceInitialIChoiceStem = sourceStem;
          }
        } else {
          choice.value = "";
          if (root?.dataset) {
            delete root.dataset.classicalVncSourceInitialIChoiceStem;
          }
        }
      }
      const selectedKind = userChoiceApplies
        ? ["real", "supportive", "contextual"].includes(
            String(choice?.value || ""),
          )
          ? String(choice.value)
          : ""
        : "";
      const kind = canonicalKind
        || (userChoiceApplies ? selectedKind || "unresolved" : "not-applicable");
      const visible = initialI;
      if (root?.dataset) {
        root.dataset.classicalVncSourceInitialI = visible ? kind || "unresolved" : "not-applicable";
        root.dataset.classicalVncSourceInitialISelection = userChoiceApplies ? selectedKind : "";
      }
      if (!fact) {
        return visible;
      }
      fact.hidden = !visible;
      fact.textContent = !visible
        ? ""
        : canonicalKind
          ? `Initial i: ${canonicalKind === "contextual" ? "context-sensitive" : canonicalKind} (canonical source fact)`
          : selectedKind
            ? `Initial i: ${selectedKind === "contextual" ? "context-sensitive" : selectedKind} (Source choice)`
            : "Initial i: choose its Source analysis before generating.";
      return visible;
    }
    function syncClassicalVncSourceGuide(unit = "") {
      const { root } = getClassicalVncSourceGuideElements();
      const select = populateClassicalVncSourceStemPicker();
      if (!root || !select) {
        return false;
      }
      const activeUnit = normalizeClassicalBasalUnit(unit || getClassicalBasalUnitFromRuntime());
      const active = activeUnit === CLASSICAL_BASAL_UNIT.vnc;
      root.hidden = !active;
      root.setAttribute("aria-hidden", String(!active));
      select.disabled = !active;
      if (!active) {
        syncClassicalVncSourceLexemeFact(root, select, {
          active: false
        });
        return false;
      }
      const sourceParts = getClassicalSourcePartControlState();
      const sourceStem = sourceParts.mode === CLASSICAL_SOURCE_PARTS_MODE.embedMatrix
        ? ""
        : sourceParts.sourceWholeStem;
      const matches = Array.from(select.options || []).filter(option => normalizeClassicalFuenteSourcePartStem(option.dataset?.classicalVncSourceStem || "") === sourceStem);
      const current = select.selectedOptions?.[0] || null;
      const currentStem = normalizeClassicalFuenteSourcePartStem(current?.dataset?.classicalVncSourceStem || "");
      if (sourceStem && matches.length === 1 && currentStem !== sourceStem) {
        select.value = matches[0].value;
      } else if (!sourceStem || currentStem && currentStem !== sourceStem || matches.length > 1 && currentStem !== sourceStem) {
        select.value = "";
      }
      root.dataset.classicalVncSourceSelection = select.value ? "canonical-stem" : "user-verbstem";
      if (select.value) {
        applyClassicalVncBuiltInSourceValenceDefault(
          root,
          select.selectedOptions?.[0] || null,
          { refresh: true }
        );
      } else if (root.dataset) {
        delete root.dataset.classicalVncBuiltInDefaultSignature;
      }
      syncClassicalVncSourceInitialIFact(root, select);
      syncClassicalVncSourceLexemeFact(root, select);
      return true;
    }
    function syncClassicalNncSourceGuide(unit = "") {
      const {
        root,
        select
      } = getClassicalNncSourceGuideElements();
      if (!root || !select) {
        return false;
      }
      populateClassicalRelationalNncStemOptions();
      const activeUnit = normalizeClassicalBasalUnit(unit || getClassicalBasalUnitFromRuntime());
      const active = activeUnit === CLASSICAL_BASAL_UNIT.nnc;
      root.hidden = !active;
      root.setAttribute("aria-hidden", String(!active));
      select.disabled = !active;
      if (!active) {
        return false;
      }
      const nounstemCitations = new Map(getClassicalCanonicalSourceStemInventory("nnc").map(record => [record.stem, record.citation]));
      Array.from(select.options || []).forEach(option => {
        const stem = normalizeClassicalFuenteSourcePartStem(option.dataset?.classicalNncSourceStem || "");
        if (stem && nounstemCitations.has(stem)) {
          option.textContent = nounstemCitations.get(stem);
          option.dataset.classicalSourceAuthorizes = "none";
        }
      });
      const sourceParts = getClassicalSourcePartControlState();
      const canonicalOptionFromParts =
        sourceParts.mode === CLASSICAL_SOURCE_PARTS_MODE.embedMatrix
          ? findClassicalNncSourceExampleOptionByParts(
            select,
            sourceParts.sourceEmbedStem,
            sourceParts.sourceMatrixStem
          )
          : null;
      const selectedCanonicalStem =
        root.dataset.classicalNncSourceSelection === "canonical-nounstem"
          ? normalizeClassicalFuenteSourcePartStem(
            root.dataset.classicalNncSourceSelectedStem || ""
          )
          : "";
      const sourceStem = selectedCanonicalStem
        || normalizeClassicalFuenteSourcePartStem(
          canonicalOptionFromParts?.dataset?.classicalNncSourceStem || ""
        )
        || (sourceParts.mode === CLASSICAL_SOURCE_PARTS_MODE.embedMatrix
          ? joinClassicalSourceEmbedMatrix(
            sourceParts.sourceEmbedStem,
            sourceParts.sourceMatrixStem
          )
          : sourceParts.sourceWholeStem);
      const currentOption = select.selectedOptions?.[0] || null;
      const relationalStemId = String(currentOption?.dataset?.classicalRelationalStemId || "");
      const selectedOption = relationalStemId
        ? currentOption
        : canonicalOptionFromParts
          || Array.from(select.options || []).find(option => normalizeClassicalFuenteSourcePartStem(option.dataset?.classicalNncSourceStem || "") === sourceStem);
      const currentStem = normalizeClassicalFuenteSourcePartStem(currentOption?.dataset?.classicalNncSourceStem || "");
      if (!relationalStemId && sourceStem && selectedOption && currentStem !== sourceStem) {
        select.value = selectedOption.value;
      } else if (!relationalStemId && (!sourceStem || currentStem && currentStem !== sourceStem)) {
        select.value = "";
      }
      const selectedStructure = getClassicalNncSourceExampleSelection(select.selectedOptions?.[0] || null);
      if (!relationalStemId && select.value && selectedStructure.sourceMode !== CLASSICAL_SOURCE_PARTS_MODE.embedMatrix && sourceParts.mode !== CLASSICAL_SOURCE_PARTS_MODE.embedMatrix) {
        setClassicalSourcePartsMode(CLASSICAL_SOURCE_PARTS_MODE.wholeStem);
      }
      root.dataset.classicalNncSourceSelection = relationalStemId
        ? "canonical-relational-nounstem"
        : select.value ? "canonical-nounstem" : "user-nounstem";
      root.dataset.classicalNncSourceMode = relationalStemId
        ? "relational"
        : select.value ? selectedStructure.sourceMode : sourceParts.mode;
      if (!relationalStemId && select.value) {
        root.dataset.classicalNncSourceSelectedStem =
          selectedStructure.sourceStem;
      } else if (!relationalStemId) {
        delete root.dataset.classicalNncSourceSelectedStem;
      }
      return true;
    }
    function getClassicalNncSourceExampleSelection(option = null) {
      const dataset = option?.dataset || {};
      return {
        sourceStem: normalizeClassicalFuenteSourcePartStem(dataset.classicalNncSourceStem || ""),
        sourceMode: String(dataset.classicalNncSourceMode || "whole-stem").trim() === CLASSICAL_SOURCE_ANALYSIS_KIND.internalMorphemes
          ? CLASSICAL_SOURCE_ANALYSIS_KIND.internalMorphemes
          : normalizeClassicalSourcePartsMode(dataset.classicalNncSourceMode || "whole-stem"),
        sourceEmbedStem: normalizeClassicalFuenteSourcePartStem(dataset.classicalNncSourceEmbed || ""),
        sourceMatrixStem: normalizeClassicalFuenteSourcePartStem(dataset.classicalNncSourceMatrix || ""),
        ...(dataset.classicalRelationalStemId
          ? { relationalStemId: String(dataset.classicalRelationalStemId).trim() }
          : {}),
        sourceContract: "stem-only",
        exampleAuthority: "not-authority"
      };
    }
    function findClassicalNncSourceExampleOptionByParts(
      select = null,
      embedStem = "",
      matrixStem = ""
    ) {
      const normalizedEmbed = normalizeClassicalFuenteSourcePartStem(embedStem);
      const normalizedMatrix = normalizeClassicalFuenteSourcePartStem(matrixStem);
      if (!select || !normalizedEmbed || !normalizedMatrix) {
        return null;
      }
      const matches = Array.from(select.options || []).filter(option => {
        if (option.dataset?.classicalRelationalStemId) {
          return false;
        }
        const selection = getClassicalNncSourceExampleSelection(option);
        return selection.sourceMode === CLASSICAL_SOURCE_PARTS_MODE.embedMatrix
          && selection.sourceEmbedStem === normalizedEmbed
          && selection.sourceMatrixStem === normalizedMatrix;
      });
      return matches.length === 1 ? matches[0] : null;
    }
    function isCanonicalDirectNncSourceFrame(sourceFrame = null) {
      return Boolean(
        sourceFrame?.authorizationStatus === "authorized"
        && [
          "classical-nahuatl-ordinary-nnc-source-frame",
          "classical-nahuatl-pronominal-nnc-source-frame"
        ].includes(sourceFrame.kind)
      );
    }
    function applyClassicalNncSourceExampleSelection() {
      const {
        root,
        select
      } = getClassicalNncSourceGuideElements();
      const option = select?.selectedOptions?.[0] || null;
      const selection = getClassicalNncSourceExampleSelection(option);
      const sourceStem = selection.sourceStem;
      if (!root || !select) {
        return false;
      }
      const relationalSelection = Boolean(selection.relationalStemId);
      const openSourceClassControl = targetObject.document.getElementById(
        "classical-rule-logic-nnc-class"
      );
      if (relationalSelection && openSourceClassControl) {
        openSourceClassControl.value = "";
      }
      if (targetObject.document?.body) {
        targetObject.document.body.dataset.classicalRelationalNncMode = String(relationalSelection);
      }
      if (relationalSelection) {
        root.dataset.classicalNncSourceSelection = "canonical-relational-nounstem";
        root.dataset.classicalNncSourceSelectedStem = sourceStem;
        root.dataset.classicalNncSourceSelectedType = "relational";
        root.dataset.classicalNncSourceMode = "relational";
        syncClassicalRelationalNncUiControls();
        return true;
      }
      syncClassicalRelationalNncUiControls();
      if (!sourceStem) {
        return false;
      }
      const sourceMode = selection.sourceMode;
      const compoundSelection = sourceMode === CLASSICAL_SOURCE_PARTS_MODE.embedMatrix;
      if (compoundSelection && (!selection.sourceEmbedStem || !selection.sourceMatrixStem)) {
        return false;
      }
      let canonicalSource = null;
      if (
        openSourceClassControl
        && typeof targetObject.issueCanonicalNncSourceFrame === "function"
      ) {
        canonicalSource = targetObject.issueCanonicalNncSourceFrame({
          stem: sourceStem,
          ...(compoundSelection
            ? {
                embedStem: selection.sourceEmbedStem,
                matrixStem: selection.sourceMatrixStem
              }
            : {})
        });
        openSourceClassControl.value =
          canonicalSource?.authorizationStatus === "authorized"
          && canonicalSource?.kind
            === "classical-nahuatl-ordinary-nnc-source-frame"
            ? canonicalSource.sourceClass || ""
            : "";
      }
      if (
        canonicalSource?.authorizationStatus === "authorized"
        && canonicalSource?.kind
          === "classical-nahuatl-ordinary-nnc-source-frame"
        && ["animate", "nonanimate"].includes(
          canonicalSource.referentialAnimacy
        )
      ) {
        const sourceAnimacyControl = targetObject.document.getElementById(
          "classical-rule-logic-nnc-subject-animacy"
        );
        const sourcePersonControl = targetObject.document.getElementById(
          "classical-rule-logic-nnc-subject-person"
        );
        const sourceNumberControl = targetObject.document.getElementById(
          "classical-rule-logic-nnc-subject-number"
        );
        const sourceHumannessControl = targetObject.document.getElementById(
          "classical-rule-logic-nnc-subject-humanness"
        );
        const metaphoricalUseControl = targetObject.document.getElementById(
          "classical-rule-logic-nnc-metaphorical-use"
        );
        if (sourceAnimacyControl) {
          sourceAnimacyControl.value = canonicalSource.referentialAnimacy;
        }
        if (sourcePersonControl) {
          sourcePersonControl.value = "3";
        }
        if (sourceNumberControl) {
          sourceNumberControl.value =
            canonicalSource.referentialAnimacy === "nonanimate"
              ? "common"
              : "singular";
        }
        if (sourceHumannessControl) {
          sourceHumannessControl.value = canonicalSource.referentialAnimacy === "nonanimate"
            ? "nonhuman"
            : "human";
        }
        if (metaphoricalUseControl) {
          metaphoricalUseControl.checked = false;
        }
      }
      setClassicalSourcePartsMode(compoundSelection ? CLASSICAL_SOURCE_PARTS_MODE.embedMatrix : CLASSICAL_SOURCE_PARTS_MODE.wholeStem, {
        clearValues: true,
        clearWhole: compoundSelection,
        preserveDirectNncGeneration:
          isCanonicalDirectNncSourceFrame(canonicalSource)
      });
      const {
        wholeInput,
        embedInput,
        matrixInput
      } = getClassicalSourcePartControlElements();
      const eventTarget = compoundSelection ? matrixInput : wholeInput;
      if (!eventTarget || compoundSelection && !embedInput) {
        return false;
      }
      if (compoundSelection) {
        embedInput.value = selection.sourceEmbedStem;
        matrixInput.value = selection.sourceMatrixStem;
      } else {
        wholeInput.value = sourceStem;
      }
      root.dataset.classicalNncSourceSelection = "canonical-nounstem";
      root.dataset.classicalNncSourceSelectedStem = sourceStem;
      root.dataset.classicalNncSourceMode = sourceMode;
      root.dataset.classicalNncSourceEmbed = selection.sourceEmbedStem;
      root.dataset.classicalNncSourceMatrix = selection.sourceMatrixStem;
      eventTarget.dispatchEvent(new targetObject.Event("input", {
        bubbles: true
      }));
      eventTarget.dispatchEvent(new targetObject.Event("change", {
        bubbles: true
      }));
      return true;
    }
    function applyClassicalVncSourceStemSelection() {
      const { root, select } = getClassicalVncSourceGuideElements();
      const option = select?.selectedOptions?.[0] || null;
      const sourceStem = normalizeClassicalFuenteSourcePartStem(option?.dataset?.classicalVncSourceStem || "");
      if (!root || !select || !sourceStem) {
        return false;
      }
      setClassicalSourcePartsMode(CLASSICAL_SOURCE_PARTS_MODE.wholeStem, {
        clearValues: true
      });
      const {
        wholeInput
      } = getClassicalSourcePartControlElements();
      if (!wholeInput) {
        return false;
      }
      wholeInput.value = sourceStem;
      applyClassicalVncBuiltInSourceValenceDefault(root, option, {
        force: true
      });
      root.dataset.classicalVncSourceSelection = "canonical-stem";
      root.dataset.classicalVncSourceSelectedStem = sourceStem;
      root.dataset.classicalVncSourceSelectedValenceDisplay = String(option.dataset.classicalVncSourceValenceDisplay || "");
      syncClassicalVncSourceInitialIFact(root, select);
      syncClassicalVncSourceLexemeFact(root, select);
      wholeInput.dispatchEvent(new targetObject.Event("input", { bubbles: true }));
      wholeInput.dispatchEvent(new targetObject.Event("change", { bubbles: true }));
      return true;
    }
    function getClassicalSourcePartControlState() {
      const {
        root,
        wholeInput,
        embedInput,
        matrixInput
      } = getClassicalSourcePartControlElements();
      const mode = normalizeClassicalSourcePartsMode(root?.dataset?.classicalSourcePartsMode || "whole-stem");
      const sourceWholeStem = normalizeClassicalFuenteSourcePartStem(wholeInput?.value || "");
      const sourceEmbedStem = normalizeClassicalFuenteSourcePartStem(embedInput?.value || "");
      const sourceMatrixStem = normalizeClassicalFuenteSourcePartStem(matrixInput?.value || "");
      const userPartsActive = mode === CLASSICAL_SOURCE_PARTS_MODE.embedMatrix;
      const sourceSelectionKind = userPartsActive ? "embed-matrix" : mode;
      return {
        mode,
        sourceSelectionKind,
        sourceWholeStem,
        sourceEmbedStem: userPartsActive ? sourceEmbedStem : "",
        sourceMatrixStem: userPartsActive ? sourceMatrixStem : "",
        sourcePartsSource: userPartsActive || sourceWholeStem
          ? "fuente-user"
          : ""
      };
    }
    function setClassicalSourcePartsMode(mode = "", options = {}) {
      const normalizedMode = normalizeClassicalSourcePartsMode(mode);
      const {
        root,
        modeButtons,
        wholeInput,
        embedInput,
        matrixInput,
        internalMorphs
      } = getClassicalSourcePartControlElements();
      if (root?.dataset) {
        root.dataset.classicalSourcePartsMode = normalizedMode;
      }
      modeButtons.forEach(button => {
        const buttonMode = normalizeClassicalSourcePartsMode(button.getAttribute("data-classical-source-parts-kind") || "");
        const active = buttonMode === normalizedMode;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", String(active));
      });
      const embedMatrixEnabled = normalizedMode === CLASSICAL_SOURCE_PARTS_MODE.embedMatrix;
      if (wholeInput) {
        wholeInput.disabled = embedMatrixEnabled;
        wholeInput.setAttribute?.("aria-disabled", String(embedMatrixEnabled));
        if (embedMatrixEnabled && options.clearWhole === true) {
          wholeInput.value = "";
        }
      }
      [embedInput, matrixInput].filter(Boolean).forEach(input => {
        input.disabled = !embedMatrixEnabled;
        input.setAttribute?.("aria-disabled", String(!embedMatrixEnabled));
        if (!embedMatrixEnabled && options.clearValues === true) {
          input.value = "";
        }
      });
      if (internalMorphs && normalizedMode === CLASSICAL_SOURCE_PARTS_MODE.embedMatrix) {
        internalMorphs.hidden = true;
        internalMorphs.setAttribute("aria-hidden", "true");
      }
      const constructionControl = targetObject.document?.getElementById?.(
        "classical-construction-operation"
      ) || null;
      if (constructionControl
        && getClassicalBasalUnitFromRuntime() === CLASSICAL_BASAL_UNIT.nnc) {
        if (embedMatrixEnabled && options.preserveDirectNncGeneration === true) {
          constructionControl.value = "none";
          delete constructionControl.dataset.classicalSourcePartsDerivedOperation;
        } else if (!embedMatrixEnabled
          && constructionControl.dataset.classicalSourcePartsDerivedOperation === "true") {
          constructionControl.value = "none";
          delete constructionControl.dataset.classicalSourcePartsDerivedOperation;
        }
      }
      const sourceInput = typeof targetObject.document !== "undefined" ? targetObject.document.getElementById("verb") : null;
      if (sourceInput) {
        sourceInput.readOnly = true;
        if (sourceInput.dataset) {
          sourceInput.dataset.classicalSourceInputRole = "machine-mirror";
          sourceInput.dataset.classicalSourceMirror = "runtime-only";
        }
      }
    }
    function getClassicalEntradaUrlSourcePartsFromLocation() {
      if (typeof targetObject.window === "undefined") {
        return {
          sourceWholeStem: "",
          sourceEmbedStem: "",
          sourceMatrixStem: ""
        };
      }
      const hash = String(targetObject.window.location?.hash || "");
      const getHashPart = (key = "") => {
        const match = hash.match(new RegExp(`/${key}/([^/]+)`, "u"));
        if (!match?.[1]) {
          return "";
        }
        try {
          return decodeURIComponent(match[1]);
        } catch (_error) {
          return match[1];
        }
      };
      const sourceEmbedStem = normalizeClassicalFuenteSourcePartStem(getHashPart("a-embed"));
      const sourceMatrixStem = sourceEmbedStem ? normalizeClassicalFuenteSourcePartStem(getHashPart("a-stem")) : "";
      const snapshot = typeof readEntradaUrlStateSnapshotFromLocation === "function" ? readEntradaUrlStateSnapshotFromLocation(targetObject.window.location) : null;
      const sourceWholeStem = normalizeClassicalFuenteSourcePartStem(stripClassicalSourceDisplayWrapping(snapshot?.input || getHashPart("verb") || ""));
      return {
        sourceWholeStem,
        sourceEmbedStem,
        sourceMatrixStem
      };
    }
    function syncClassicalSourcePartsToEntradaUrl(options = {}) {
      if (typeof targetObject.window === "undefined") {
        return "";
      }
      const locationObject = options.location || targetObject.window.location;
      const historyObject = options.history || targetObject.window.history;
      if (!locationObject) {
        return "";
      }
      const controlState = getClassicalSourcePartControlState();
      const currentSnapshot = readEntradaUrlStateSnapshotFromLocation(locationObject) || getCurrentEntradaUrlStateSnapshot();
      const builtSourceFrame = typeof syncClassicalBuiltSourceToVerbInput === "function" ? syncClassicalBuiltSourceToVerbInput() : null;
      const isEmbedMatrix = controlState.mode === CLASSICAL_SOURCE_PARTS_MODE.embedMatrix
        || controlState.sourceSelectionKind === "embed-matrix";
      const sourceEmbedStem = isEmbedMatrix ? controlState.sourceEmbedStem : "";
      const sourceMatrixStem = isEmbedMatrix ? controlState.sourceMatrixStem : "";
      const nextSnapshot = normalizeEntradaUrlStateSnapshot({
        ...currentSnapshot,
        input: builtSourceFrame?.displaySource || currentSnapshot?.input || "",
        sourceLexemeId:
          getClassicalVncSourceGuideElements().sourceLexemeChoice?.value || "",
        slots: {
          ...(currentSnapshot?.slots || {}),
          a: {
            ...(currentSnapshot?.slots?.a || {}),
            embed: sourceEmbedStem,
            stem: sourceMatrixStem
          }
        }
      });
      const nextHash = buildEntradaUrlHash(nextSnapshot);
      const currentHash = String(locationObject.hash || "");
      if (currentHash === nextHash) {
        return nextHash;
      }
      const nextUrl = `${locationObject.pathname || ""}${locationObject.search || ""}${nextHash}`;
      if (options.replace !== false && historyObject && typeof historyObject.replaceState === "function") {
        historyObject.replaceState(null, "", nextUrl || nextHash || locationObject.pathname || "");
      } else {
        locationObject.hash = nextHash;
      }
      return nextHash;
    }
    function getClassicalSourcePartsEvaluationSignature() {
      const state = getClassicalSourcePartControlState();
      return JSON.stringify({
        unit: getClassicalBasalUnitFromRuntime(),
        mode: state.mode,
        sourceSelectionKind: state.sourceSelectionKind,
        sourceWholeStem: state.sourceWholeStem,
        sourceEmbedStem: state.sourceEmbedStem,
        sourceMatrixStem: state.sourceMatrixStem,
        sourcePartsSource: state.sourcePartsSource,
        sourceInitialISelection: (() => {
          const choice = getClassicalVncSourceGuideElements().initialIChoice;
          return choice && choice.disabled !== true
            ? String(choice.value || "")
            : "";
        })(),
        sourceLexemeId: getClassicalVncSourceGuideElements().sourceLexemeChoice?.value || ""
      });
    }
    function hasCommittableClassicalSourceParts(state = null) {
      const sourceState = state || getClassicalSourcePartControlState();
      if (sourceState.mode === CLASSICAL_SOURCE_PARTS_MODE.embedMatrix) {
        return Boolean(sourceState.sourceEmbedStem || sourceState.sourceMatrixStem);
      }
      return Boolean(sourceState.sourceWholeStem);
    }
    function setClassicalSourcePartsPendingState(pending = false) {
      const root = targetObject.document?.getElementById?.("classical-source-parts") || null;
      const applyButton = targetObject.document?.getElementById?.("verb-entry-apply") || null;
      if (root?.dataset) {
        root.dataset.classicalSourceCommitState = pending ? "pending" : "committed";
      }
      if (applyButton?.dataset) {
        applyButton.dataset.classicalSourceCommitState = pending ? "pending" : "committed";
      }
      if (applyButton) {
        applyButton.setAttribute("aria-label", pending ? "Generate output from the pending entered stem" : "Generate output from the entered stem");
      }
      return pending;
    }
    function commitClassicalSourcePartsEvaluation(options = {}) {
      let sourceState = getClassicalSourcePartControlState();
      if (!hasCommittableClassicalSourceParts(sourceState)) {
        const root = targetObject.document?.getElementById?.("classical-source-parts") || null;
        setClassicalSourcePartsPendingState(
          root?.dataset?.classicalSourceCommitState === "pending"
        );
        return false;
      }
      const {
        wholeInput,
        embedInput,
        matrixInput
      } = getClassicalSourcePartControlElements();
      const activeInputs = sourceState.mode === CLASSICAL_SOURCE_PARTS_MODE.embedMatrix
        ? [embedInput, matrixInput]
        : [wholeInput];
      for (const input of activeInputs.filter(Boolean)) {
        const soundSource = String(input.value || "").normalize("NFC").trim();
        if (!/\/[^/]+\//u.test(soundSource)) continue;
        const transcriptionFrame = typeof targetObject.buildClassicalNahuatlCompactTranscriptionFrame === "function"
          ? targetObject.buildClassicalNahuatlCompactTranscriptionFrame(soundSource)
          : null;
        if (!targetObject.isClassicalNahuatlTranscriptionFrame?.(transcriptionFrame)
          || transcriptionFrame.authorizationStatus !== "authorized") {
          return false;
        }
        input.dataset.classicalTranscriptionSoundSource = soundSource;
        input.dataset.classicalTranscriptionWrittenResult = transcriptionFrame.surface;
        input.value = transcriptionFrame.surface;
      }
      sourceState = getClassicalSourcePartControlState();
      const signature = getClassicalSourcePartsEvaluationSignature();
      if (options.force !== true && signature === ClassicalSourcePartsCommittedSignature) {
        setClassicalSourcePartsPendingState(false);
        return false;
      }
      ClassicalSourcePartsCommittedSignature = signature;
      setClassicalSourcePartsPendingState(false);
      syncClassicalSourcePartsToEntradaUrl();
      syncClassicalSourceReadout();
      syncClassicalVncSourceGuide();
      syncClassicalNncSourceGuide();
      ClassicalSourcePartsCommittedSignature = getClassicalSourcePartsEvaluationSignature();
      const sourceInput = targetObject.document.getElementById("verb");
      if (sourceInput && typeof scheduleVerbInputRefresh === "function") {
        scheduleVerbInputRefresh(sourceInput.value, {
          immediate: true,
          source: options.source || "classical-source-parts"
        });
      } else {
        refreshClassicalRuleLogicSurfaceFromControl();
      }
      return true;
    }
    function clearClassicalSourcePartsEvaluation(options = {}) {
      const {
        root,
        wholeInput,
        embedInput,
        matrixInput,
        internalMorphs
      } = getClassicalSourcePartControlElements();
      if (!root) {
        return false;
      }
      targetObject.clearClassicalVncResultSourceContinuation?.(
        options.source || "source-cleared"
      );
      setClassicalSourcePartsMode(CLASSICAL_SOURCE_PARTS_MODE.wholeStem, {
        clearValues: true
      });
      [wholeInput, embedInput, matrixInput].filter(Boolean).forEach(input => {
        input.value = "";
        delete input.dataset.classicalTranscriptionSoundSource;
        delete input.dataset.classicalTranscriptionWrittenResult;
      });
      if (internalMorphs) {
        internalMorphs.replaceChildren();
        internalMorphs.hidden = true;
        internalMorphs.setAttribute("aria-hidden", "true");
      }
      const vncGuide = getClassicalVncSourceGuideElements();
      const nncGuide = getClassicalNncSourceGuideElements();
      if (vncGuide.select) vncGuide.select.value = "";
      if (vncGuide.initialIChoice) vncGuide.initialIChoice.value = "";
      if (vncGuide.sourceLexemeChoice) {
        vncGuide.sourceLexemeChoice.value = "";
      }
      if (nncGuide.select) nncGuide.select.value = "";
      [
        [vncGuide.root, [
          "classicalVncSourceSelectedStem",
          "classicalVncSourceSelectedValenceDisplay",
          "classicalVncSourceInitialIChoiceStem",
          "classicalVncSourceLexemeChoiceStem"
        ]],
        [nncGuide.root, [
          "classicalNncSourceSelectedStem",
          "classicalNncSourceMode",
          "classicalNncSourceEmbed",
          "classicalNncSourceMatrix"
        ]]
      ].forEach(([guide, keys]) => {
        if (!guide?.dataset) return;
        keys.forEach(key => delete guide.dataset[key]);
      });
      [
        "classical-rule-logic-class",
        "classical-rule-logic-nnc-class",
        "classical-rule-logic-causative-source-nonactive"
      ].map(id => targetObject.document?.getElementById?.(id))
        .filter(Boolean)
        .forEach(control => {
          control.value = "";
        });
      const sourceVoice = targetObject.document?.getElementById?.(
        "classical-rule-logic-causative-source-voice"
      );
      if (sourceVoice) sourceVoice.value = "active";
      const operation = targetObject.document?.getElementById?.(
        "classical-construction-operation"
      );
      if (operation) {
        operation.value = "none";
        delete operation.dataset.classicalSourcePartsDerivedOperation;
      }
      const sourceInput = targetObject.document?.getElementById?.("verb");
      if (sourceInput) {
        sourceInput.value = "_";
        if (sourceInput.dataset) {
          sourceInput.dataset.prevValue = "_";
        }
      }
      syncClassicalBuiltSourceToVerbInput();
      syncClassicalSourcePartsToEntradaUrl();
      syncClassicalVncSourceGuide();
      syncClassicalNncSourceGuide();
      syncClassicalSourceReadout();
      ClassicalSourcePartsCommittedSignature =
        getClassicalSourcePartsEvaluationSignature();
      setClassicalSourcePartsPendingState(false);
      operation?.dispatchEvent(new targetObject.Event("change", {
        bubbles: true
      }));
      targetObject.cancelScheduledVerbInputRefresh?.();
      targetObject.clearClassicalRuleLogicSurfaceBlock?.();
      targetObject.renderVerbMirror?.();
      wholeInput?.focus?.();
      return true;
    }
    function syncClassicalSourcePartControlsFromRuntime() {
      const {
        root,
        wholeInput,
        embedInput,
        matrixInput
      } = getClassicalSourcePartControlElements();
      if (!root || root.dataset.classicalSourcePartsInitialized === "true") {
        return;
      }
      const restoredSnapshot =
        typeof readEntradaUrlStateSnapshotFromLocation === "function"
          ? readEntradaUrlStateSnapshotFromLocation(targetObject.window?.location)
          : null;
      const {
        sourceWholeStem,
        sourceEmbedStem,
        sourceMatrixStem
      } = getClassicalEntradaUrlSourcePartsFromLocation();
      if (wholeInput && sourceWholeStem && !sourceEmbedStem && !sourceMatrixStem) {
        wholeInput.value = sourceWholeStem;
      }
      if (embedInput && sourceEmbedStem) {
        embedInput.value = sourceEmbedStem;
      }
      if (matrixInput && sourceMatrixStem) {
        matrixInput.value = sourceMatrixStem;
      }
      const directNncRoute = /(?:^|\/)cn\/1(?:\/|$)/u.test(
        String(targetObject.window?.location?.hash || "")
      );
      const sourceExampleSelect = getClassicalNncSourceGuideElements().select;
      const canonicalOptionFromParts =
        directNncRoute
          ? findClassicalNncSourceExampleOptionByParts(
            sourceExampleSelect,
            sourceEmbedStem,
            sourceMatrixStem
          )
          : null;
      const canonicalRouteStem = normalizeClassicalFuenteSourcePartStem(
        canonicalOptionFromParts?.dataset?.classicalNncSourceStem
          || sourceWholeStem
      );
      const canonicalNncSource =
        directNncRoute
        && canonicalRouteStem
        && typeof targetObject.issueCanonicalNncSourceFrame === "function"
          ? targetObject.issueCanonicalNncSourceFrame({
            stem: canonicalRouteStem,
            ...(sourceEmbedStem ? { embedStem: sourceEmbedStem } : {}),
            ...(sourceMatrixStem ? { matrixStem: sourceMatrixStem } : {})
          })
          : null;
      const directCanonicalNncRoute =
        directNncRoute && isCanonicalDirectNncSourceFrame(canonicalNncSource);
      if (directCanonicalNncRoute) {
        const nncSourceGuide = getClassicalNncSourceGuideElements().root;
        if (nncSourceGuide?.dataset) {
          nncSourceGuide.dataset.classicalNncSourceSelection =
            "canonical-nounstem";
          nncSourceGuide.dataset.classicalNncSourceSelectedStem =
            canonicalRouteStem;
        }
        if (sourceExampleSelect && canonicalOptionFromParts) {
          sourceExampleSelect.value = canonicalOptionFromParts.value;
        }
      }
      setClassicalSourcePartsMode(
        sourceEmbedStem || sourceMatrixStem ? "embed-matrix" : "whole-stem",
        { preserveDirectNncGeneration: directCanonicalNncRoute }
      );
      syncClassicalBuiltSourceToVerbInput();
      applyClassicalNncEntradaUrlStateToControls(restoredSnapshot);
      ClassicalSourcePartsCommittedSignature = getClassicalSourcePartsEvaluationSignature();
      setClassicalSourcePartsPendingState(false);
      root.dataset.classicalSourcePartsInitialized = "true";
    }
    function getClassicalSourceSelectionOptionsFromRuntime() {
      const controlState = getClassicalSourcePartControlState();
      if (controlState.sourcePartsSource) {
        return controlState;
      }
      return {
        sourceSelectionKind: "",
        sourceWholeStem: "",
        sourceEmbedStem: "",
        sourceMatrixStem: "",
        sourcePartsSource: ""
      };
    }
    function stripClassicalSourceDisplayWrapping(value = "") {
      return String(value || "").trim().replace(/^\((.*)\)$/u, "$1");
    }
    function wrapClassicalSourceDisplayStem(value = "") {
      const stem = stripClassicalSourceDisplayWrapping(value);
      return stem && stem !== "_" ? `(${stem})` : "_";
    }
    function joinClassicalSourceEmbedMatrix(embedStem = "", matrixStem = "") {
      const embed = normalizeClassicalFuenteSourcePartStem(embedStem);
      const matrix = normalizeClassicalFuenteSourcePartStem(matrixStem);
      if (embed && matrix) {
        const writingSource = typeof targetObject.issueClassicalNahuatlLesson2WritingSource === "function"
          ? targetObject.issueClassicalNahuatlLesson2WritingSource({
              parts: [
                { role: "embed", value: embed },
                { role: "matrix", value: matrix }
              ],
              boundaryKind: "compound"
            })
          : null;
        const writtenResult = typeof targetObject.writeClassicalNahuatlLesson2Result === "function"
          ? targetObject.writeClassicalNahuatlLesson2Result(writingSource)
          : null;
        if (targetObject.isClassicalNahuatlLesson2WrittenResult?.(writtenResult)
          && writtenResult.authorizationStatus === "authorized") {
          return writtenResult.surface;
        }
        return `${embed}-${matrix}`;
      }
      return embed || matrix || "";
    }
    function getClassicalTypedBuiltSourceFrame(sourceValue = "", sourceSelectionOptions = null) {
      const {
        wholeInput,
        embedInput,
        matrixInput
      } = getClassicalSourcePartControlElements();
      const selectedOptions = sourceSelectionOptions || getClassicalSourceSelectionOptionsFromRuntime();
      const controlState = getClassicalSourcePartControlState();
      const mode = normalizeClassicalSourcePartsMode(controlState.mode || selectedOptions?.mode || "");
      const inputSurface = stripClassicalSourceDisplayWrapping(sourceValue);
      const wholeSurface = normalizeClassicalFuenteSourcePartStem(wholeInput?.value || controlState.sourceWholeStem || selectedOptions?.sourceWholeStem || inputSurface || "");
      const rawEmbedSurface = normalizeClassicalFuenteSourcePartStem(embedInput?.value || selectedOptions?.sourceEmbedStem || "");
      const rawMatrixSurface = normalizeClassicalFuenteSourcePartStem(matrixInput?.value || selectedOptions?.sourceMatrixStem || "");
      const embedSurface = rawEmbedSurface || "_";
      const matrixSurface = rawMatrixSurface || "_";
      const hasParts = mode === CLASSICAL_SOURCE_PARTS_MODE.embedMatrix || selectedOptions?.sourceSelectionKind === "embed-matrix";
      const nncSourceGuide = targetObject.document?.getElementById?.(
        "classical-nnc-source-guide"
      );
      const canonicalNncSourceStem =
        getClassicalBasalUnitFromRuntime() === CLASSICAL_BASAL_UNIT.nnc
        && nncSourceGuide?.dataset?.classicalNncSourceSelection
          === "canonical-nounstem"
          ? normalizeClassicalFuenteSourcePartStem(
            nncSourceGuide.dataset.classicalNncSourceSelectedStem || ""
          )
          : "";
      const builtStem = canonicalNncSourceStem
        || (mode === CLASSICAL_SOURCE_PARTS_MODE.embedMatrix || hasParts
          ? joinClassicalSourceEmbedMatrix(rawEmbedSurface, rawMatrixSurface)
          : wholeSurface);
      const displaySource = wrapClassicalSourceDisplayStem(builtStem || wholeSurface || inputSurface);
      const modeLabel = getClassicalSourcePartsModeLabel(hasParts ? CLASSICAL_SOURCE_PARTS_MODE.embedMatrix : mode);
      const partsSurface = hasParts ? [rawEmbedSurface || "embed", rawMatrixSurface || "matrix"].join(" + ") : "_";
      return {
        mode,
        modeLabel,
        inputSurface: wholeSurface || inputSurface || "_",
        wholeSurface,
        embedSurface,
        matrixSurface,
        hasParts,
        builtStem,
        displaySource,
        partsSurface,
        verbInputRole: hasParts ? "machine-mirror:built-from-typed-source-parts" : "machine-mirror",
        status: hasParts ? "built from embed + matrix" : modeLabel,
        statusKind: hasParts ? "built-source" : mode
      };
    }
    function syncClassicalBuiltSourceToVerbInput(options = {}) {
      if (typeof targetObject.document === "undefined") {
        return null;
      }
      const sourceInput = targetObject.document.getElementById("verb");
      if (!sourceInput) {
        return null;
      }
      const frame = getClassicalTypedBuiltSourceFrame(sourceInput.value || "", options.sourceSelectionOptions || null);
      const mirrorValue = frame.displaySource || "_";
      sourceInput.readOnly = true;
      if (sourceInput.dataset) {
        sourceInput.dataset.classicalSourceInputRole = frame.verbInputRole || "machine-mirror";
        sourceInput.dataset.classicalSourceMirror = "runtime-only";
      }
      if (sourceInput.value !== mirrorValue) {
        sourceInput.value = mirrorValue;
        if (sourceInput.dataset) {
          sourceInput.dataset.prevValue = mirrorValue;
        }
      }
      return frame;
    }
    function getClassicalSourceReadoutFrame(unit = "") {
      const activeUnit = normalizeClassicalBasalUnit(unit || getClassicalBasalUnitFromRuntime());
      const sourceInput = targetObject.document.getElementById("verb");
      const sourceValenceControl = targetObject.document.getElementById("classical-rule-logic-valence");
      const sourceClassControl = targetObject.document.getElementById("classical-rule-logic-class");
      const rawSourceValue = String(sourceInput?.value || "").trim() || "_";
      const sourceSelectionOptions = getClassicalSourceSelectionOptionsFromRuntime();
      const builtSourceFrame = getClassicalTypedBuiltSourceFrame(rawSourceValue, sourceSelectionOptions);
      const sourceValue = builtSourceFrame.displaySource || rawSourceValue;
      const sourceSelectionFrame = activeUnit === CLASSICAL_BASAL_UNIT.vnc && typeof targetObject.requestClassicalVncSourceSelectionFrame === "function" ? targetObject.requestClassicalVncSourceSelectionFrame(sourceValue, sourceSelectionOptions) : null;
      const boundaryStem = sourceSelectionFrame?.stem || "";
      const boundaryMorphs = Array.isArray(sourceSelectionFrame?.selectedInternalMorphs) ? sourceSelectionFrame.selectedInternalMorphs.join(" | ") : "";
      const boundaryRoles = sourceSelectionFrame?.sourceReadoutRole || "";
      const sourceConstitution = activeUnit === CLASSICAL_BASAL_UNIT.vnc && typeof targetObject.buildClassicalNahuatlVncSourceConstitutionProjection === "function" ? targetObject.buildClassicalNahuatlVncSourceConstitutionProjection({
        sourceStem: sourceValue,
        sourceValence: sourceValenceControl?.value || "intransitive",
        verbClass: sourceClassControl?.value || "",
        derivationType: "direct"
      }) : null;
      const machine = sourceSelectionFrame?.selectedSourceKind === "embed-matrix" && sourceSelectionFrame.userSelectionContradictsTypedSource === true
        ? "typed Source rejects the requested compound-stem split"
        : sourceSelectionFrame?.selectedSourceKind === "embed-matrix" && sourceSelectionFrame.userSelectionTypedSourceAuthorized === true
          ? "typed Source contains embed + matrix"
          : sourceSelectionFrame?.selectedSourceKind === "embed-matrix"
            ? "user-entered compound stem"
            : sourceSelectionFrame?.selectedSourceKind === "internal-morphemes"
              ? "typed polymorphemic one-stem source"
              : sourceSelectionFrame?.selectedSourceKind === "whole-stem"
                ? "typed whole verbstem"
                : "typed Source pending";
      if (activeUnit === CLASSICAL_BASAL_UNIT.nnc) {
        if (isClassicalRelationalNncUiModeEnabled()) {
          const relationalRequest = getClassicalRelationalNncUiRequest();
          const nounstemRequest = relationalRequest.nounstem || {};
          const sourceMode = String(nounstemRequest.sourceMode || "");
          const sourceEmbed = String(nounstemRequest.sourceEmbedStem || "").trim();
          const sourceMatrix = String(nounstemRequest.sourceMatrixStem || "").trim();
          const selectedNounstem = sourceMode === CLASSICAL_SOURCE_PARTS_MODE.embedMatrix
            ? joinClassicalSourceEmbedMatrix(sourceEmbed, sourceMatrix)
            : sourceMatrix;
          return {
            unit: activeUnit,
            sourceValue: wrapClassicalSourceDisplayStem(selectedNounstem),
            rank: "nounstem",
            machine: "Source commits one nounstem request",
            authorizes: "none",
            lineStart: "17963",
            lineEnd: "18021",
            stem: selectedNounstem || "_",
            morphs: sourceMode === CLASSICAL_SOURCE_PARTS_MODE.embedMatrix
              ? [sourceEmbed, sourceMatrix].filter(Boolean).join(" | ")
              : selectedNounstem || "_",
            roles: sourceMode === CLASSICAL_SOURCE_PARTS_MODE.embedMatrix
              ? `embed: ${sourceEmbed || "_"} | matrix: ${sourceMatrix || "_"}`
              : "stem"
          };
        }
        const normalizedNncStem = normalizeClassicalFuenteSourcePartStem(sourceValue);
        const sourceExampleSelect = targetObject.document.getElementById("classical-nnc-source-example");
        const selectedSourceExample = sourceExampleSelect?.selectedOptions?.[0] || null;
        const selectedExampleStem = normalizeClassicalFuenteSourcePartStem(selectedSourceExample?.dataset?.classicalNncSourceStem || "");
        const selectedExampleMatches = Boolean(selectedExampleStem && selectedExampleStem === normalizedNncStem);
        const sourceIdentity =
          typeof targetObject.deriveClassicalNncSourceIdentity === "function"
            ? targetObject.deriveClassicalNncSourceIdentity(
              normalizedNncStem,
              {
                sourceEmbedStem: builtSourceFrame.hasParts
                  ? builtSourceFrame.embedSurface || ""
                  : "",
                sourceMatrixStem: builtSourceFrame.hasParts
                  ? builtSourceFrame.matrixSurface || ""
                  : ""
              }
            )
            : null;
        const sourceKind = sourceIdentity?.recognized
          ? String(sourceIdentity.nncType || "ordinary").replace(/-/gu, " ")
          : "unlicensed nounstem";
        const sourceMorphs = normalizedNncStem.includes("-") ? normalizedNncStem.split("-").join(" | ") : normalizedNncStem;
        let sourceRoles = `one nominal predicate stem · ${sourceKind}`;
        if (builtSourceFrame.hasParts) {
          sourceRoles = `embed: ${builtSourceFrame.embedSurface || "_"} | matrix: ${builtSourceFrame.matrixSurface || "_"} · ${sourceKind}`;
        } else if (selectedExampleMatches && selectedSourceExample?.dataset?.classicalNncSourceMode === CLASSICAL_SOURCE_ANALYSIS_KIND.internalMorphemes) {
          sourceRoles = normalizedNncStem.split("-").map((morph, index) => morph === "0" ? "0: zero morph" : `${morph}: ${index === 0 ? "root" : "internal morph"}`).join(" | ");
        }
        return {
          unit: activeUnit,
          sourceValue,
          rank: `NNC stem source · ${sourceKind}`,
          machine: "Source determines NNC identity; Authority supplies grammatical choices",
          authorizes: "none",
          lineStart: "2326",
          lineEnd: "2334",
          stem: sourceValue,
          morphs: sourceMorphs || "_",
          roles: sourceRoles
        };
      }
      return {
        unit: activeUnit,
        sourceValue,
        rank: "VNC stem source",
        machine,
        authorizes: "none",
        sourceSelectionKind: sourceSelectionFrame?.selectedSourceKind || "",
        sourceSelectedBy: sourceSelectionFrame?.selectedBy || "",
        userSelectionTypedSourceAuthorized: sourceSelectionFrame?.userSelectionTypedSourceAuthorized === true,
        userSelectionContradictsTypedSource: sourceSelectionFrame?.userSelectionContradictsTypedSource === true,
        builtSource: builtSourceFrame,
        lineStart: sourceSelectionFrame?.ruleRefs?.at?.(-1)?.lineStart ? String(sourceSelectionFrame.ruleRefs.at(-1).lineStart) : "2326",
        lineEnd: sourceSelectionFrame?.ruleRefs?.at?.(-1)?.lineEnd ? String(sourceSelectionFrame.ruleRefs.at(-1).lineEnd) : "2339",
        stem: boundaryStem || builtSourceFrame.builtStem || sourceValue,
        valence: String(sourceValenceControl?.selectedOptions?.[0]?.textContent || sourceValenceControl?.value || "intransitive").trim(),
        stemClass: sourceClassControl?.value ? `Class ${sourceClassControl.value}` : "Class unresolved",
        morphs: boundaryMorphs || "_",
        roles: sourceSelectionFrame?.sourceReadoutRole
          || boundaryRoles
          || (sourceSelectionFrame?.selectedSourceKind === "whole-stem"
            ? "one whole verbstem"
            : builtSourceFrame.status)
          || "one whole verbstem",
        constitution: sourceConstitution
      };
    }
    function syncClassicalSourceReadout(unit = "") {
      if (typeof targetObject.document === "undefined") {
        return null;
      }
      const readout = targetObject.document.getElementById("classical-source-readout");
      if (!readout) {
        return null;
      }
      const builtSourceFrame = syncClassicalBuiltSourceToVerbInput();
      const frame = getClassicalSourceReadoutFrame(unit);
      readout.dataset.classicalSourceUnit = frame.unit;
      readout.dataset.classicalSourceValue = frame.sourceValue;
      readout.dataset.classicalSourceAuthorizes = frame.authorizes;
      readout.dataset.classicalSourceSelectionKind = frame.sourceSelectionKind || "";
      readout.dataset.classicalSourceSelectedBy = frame.sourceSelectedBy || "";
      readout.dataset.classicalUserSourceSelectionAuthorized = String(frame.userSelectionTypedSourceAuthorized === true);
      readout.dataset.classicalUserSourceSelectionContradictsTypedSource = String(frame.userSelectionContradictsTypedSource === true);
      readout.dataset.classicalSourceBuiltStem = frame.builtSource?.builtStem || builtSourceFrame?.builtStem || "";
      readout.dataset.classicalSourceBuiltMode = frame.builtSource?.mode || builtSourceFrame?.mode || "";
      readout.hidden = frame.unit === CLASSICAL_BASAL_UNIT.vnc;
      readout.setAttribute("aria-hidden", String(readout.hidden));
      const sourceEl = targetObject.document.getElementById("classical-source-readout-value");
      const rankEl = targetObject.document.getElementById("classical-source-readout-rank");
      const valenceEl = targetObject.document.getElementById("classical-source-readout-valence");
      const classEl = targetObject.document.getElementById("classical-source-readout-class");
      const morphsEl = targetObject.document.getElementById("classical-source-readout-morphs");
      const rolesEl = targetObject.document.getElementById("classical-source-readout-roles");
      const constitutionEl = targetObject.document.getElementById("classical-source-constitution");
      const sourceIdentityEl = targetObject.document.getElementById("classical-source-identity-controls");
      const internalMorphsEl = targetObject.document.getElementById("classical-source-internal-morphs");
      const relationalSourceFormation = String(
        targetObject.document
          .getElementById("classical-relational-nnc-source-formation")
          ?.value || ""
      );
      const relationalCompositionNeedsVncSource =
        frame.unit === CLASSICAL_BASAL_UNIT.nnc
        && isClassicalRelationalNncUiModeEnabled()
        && [
          "preterit-agentive",
          "active-action",
          "imperfect-active",
          "imperfect-passive",
          "imperfect-impersonal",
          "present-yohua",
          "perfective-active",
          "perfective-impersonal-tla",
        ].includes(relationalSourceFormation);
      if (sourceIdentityEl) {
        sourceIdentityEl.hidden =
          frame.unit !== CLASSICAL_BASAL_UNIT.vnc
          && !relationalCompositionNeedsVncSource;
        sourceIdentityEl.setAttribute("aria-hidden", String(sourceIdentityEl.hidden));
      }
      if (sourceEl) {
        sourceEl.textContent = frame.sourceValue;
      }
      if (rankEl) {
        rankEl.textContent = frame.rank;
      }
      if (valenceEl) {
        valenceEl.textContent = frame.valence || "";
        valenceEl.closest?.("[data-classical-source-readout-item]")?.toggleAttribute(
          "hidden",
          frame.unit !== CLASSICAL_BASAL_UNIT.vnc
            && !relationalCompositionNeedsVncSource
        );
      }
      if (classEl) {
        classEl.textContent = frame.stemClass || "";
        classEl.closest?.("[data-classical-source-readout-item]")?.toggleAttribute(
          "hidden",
          frame.unit !== CLASSICAL_BASAL_UNIT.vnc
            && !relationalCompositionNeedsVncSource
        );
      }
      if (morphsEl) {
        morphsEl.textContent = frame.morphs;
      }
      if (rolesEl) {
        const constitutionParts = Array.isArray(frame.constitution?.parts) ? frame.constitution.parts : [];
        constitutionEl?.toggleAttribute?.("hidden", frame.unit !== CLASSICAL_BASAL_UNIT.vnc || !constitutionParts.length);
        rolesEl.replaceChildren?.();
        if (constitutionParts.length && typeof targetObject.document.createElement === "function") {
          const appendConstitutionJoin = (text, className) => {
            const join = targetObject.document.createElement("span");
            join.className = className;
            join.textContent = text;
            join.setAttribute("aria-hidden", "true");
            rolesEl.appendChild(join);
          };
          constitutionParts.forEach((part, index) => {
            if (index > 0) {
              appendConstitutionJoin("+", "classical-source-constitution__plus");
            }
            const token = targetObject.document.createElement("span");
            token.className = "classical-source-constitution__part";
            token.dataset.classicalSourceConstitutionRole = part.role;
            const segment = targetObject.document.createElement("span");
            segment.className = "classical-source-constitution__segment";
            segment.textContent = part.segment;
            token.append(segment);
            rolesEl.appendChild(token);
            if (part.role === "stock formative") {
              appendConstitutionJoin("→ stock", "classical-source-constitution__stage");
            }
          });
          appendConstitutionJoin(`→ ${frame.stemClass} verbstem`, "classical-source-constitution__stage");
          rolesEl.setAttribute("aria-label", constitutionParts.map(part => `${part.segment}, ${part.role}`).join("; "));
        } else {
          rolesEl.textContent = frame.roles;
          rolesEl.removeAttribute?.("aria-label");
        }
        if (internalMorphsEl) {
          internalMorphsEl.replaceChildren?.();
          constitutionParts.forEach((part, index) => {
            const field = targetObject.document.createElement("label");
            field.className = "classical-source-internal-morphs__field";
            field.dataset.classicalSourceInternalMorphIndex = String(index);
            const label = targetObject.document.createElement("span");
            label.className = "classical-source-parts__label";
            label.textContent = part.role ? `${part.role.charAt(0).toUpperCase()}${part.role.slice(1)}` : "Morpheme";
            const value = targetObject.document.createElement("span");
            value.className = "classical-source-internal-morphs__value";
            value.textContent = part.segment;
            value.setAttribute("role", "textbox");
            value.setAttribute("aria-readonly", "true");
            value.setAttribute("aria-label", `${part.role}: ${part.segment}`);
            field.append(label, value);
            internalMorphsEl.appendChild(field);
          });
          internalMorphsEl.hidden = frame.unit !== CLASSICAL_BASAL_UNIT.vnc
            || !constitutionParts.length;
          internalMorphsEl.setAttribute("aria-hidden", String(internalMorphsEl.hidden));
        }
      }
      targetObject.syncClassicalSourceNestingStructure?.();
      return frame;
    }
    function syncClassicalBasalUnitControls(unit = "") {
      if (typeof targetObject.document === "undefined") {
        return CLASSICAL_BASAL_UNIT.vnc;
      }
      const activeUnit = normalizeClassicalBasalUnit(unit || getClassicalBasalUnitFromRuntime());
      const activeScope = activeUnit === CLASSICAL_BASAL_UNIT.nnc ? "nominal-nuclear-clause" : "verbal-nuclear-clause";
      const nuclearClauseAuthority = "true";
      getClassicalBasalUnitDatasetTargets().forEach(target => {
        if (!target?.dataset) {
          return;
        }
        target.dataset.classicalBasalUnit = activeUnit;
        target.dataset.classicalBasalUnitAuthority = activeScope;
        target.dataset.classicalBasalNuclearClauseAuthority = nuclearClauseAuthority;
        target.dataset.classicalGrammarRuleSource = "Andrews";
      });
      targetObject.document.querySelectorAll("[data-classical-authority-follows-source]").forEach(target => {
        if (!target?.dataset) {
          return;
        }
        target.dataset.classicalAuthorityFollowsSource = "true";
        target.dataset.classicalAuthoritySourceUnit = activeUnit;
        target.dataset.classicalAuthorityMirrorRole = "engine-sync-not-user-authority";
      });
      targetObject.document.querySelectorAll("[data-classical-source-board-mirror]").forEach(target => {
        if (!target?.dataset) {
          return;
        }
        target.dataset.classicalSourceBoardMirror = "true";
        target.dataset.classicalSourceBoardSourceUnit = activeUnit;
        target.dataset.classicalSourceBoardMirrorRole = "engine-sync-not-user-source";
      });
      const controls = targetObject.document.getElementById("classical-basal-unit-controls");
      if (controls) {
        controls.setAttribute("aria-label", `Classical Nahuatl basal unit: ${activeUnit.toUpperCase()}`);
      }
      targetObject.document.querySelectorAll("button[data-classical-basal-unit]").forEach(button => {
        const buttonUnit = normalizeClassicalBasalUnit(button.getAttribute("data-classical-basal-unit") || "");
        const isActive = buttonUnit === activeUnit;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
        button.setAttribute("aria-selected", String(isActive));
      });
      syncClassicalVncSourceGuide(activeUnit);
      syncClassicalNncSourceGuide(activeUnit);
      syncClassicalConstructionSourceUnitAvailability(activeUnit);
      syncClassicalSourceReadout(activeUnit);
      syncClassicalRelationalNncUiControls();
      return activeUnit;
    }
    function refreshClassicalBasalUnitRenderedOutput() {
      if (typeof targetObject.renderTenseTabs === "function") {
        targetObject.renderTenseTabs();
      }
      if (typeof targetObject.renderActiveConjugations === "function" && typeof getVerbInputMeta === "function") {
        const verbMeta = getVerbInputMeta();
        targetObject.renderActiveConjugations({
          verb: verbMeta.displayVerb,
          objectPrefix: typeof targetObject.getCurrentObjectPrefix === "function" ? targetObject.getCurrentObjectPrefix() : ""
        });
      }
      if (typeof targetObject.updateTenseModeTabs === "function") {
        targetObject.updateTenseModeTabs();
      }
      syncVerbScreenCalculatorState();
    }
    function applyClassicalBasalUnitSurface(unit = "") {
      const activeUnit = normalizeClassicalBasalUnit(unit);
      if (activeUnit === CLASSICAL_BASAL_UNIT.nnc) {
        if (typeof targetObject.setActiveUnitMode === "function" && typeof TENSE_MODE !== "undefined" && TENSE_MODE?.sustantivo) {
          targetObject.setActiveUnitMode(TENSE_MODE.sustantivo);
        }
      } else {
        if (typeof targetObject.setActiveUnitMode === "function" && typeof TENSE_MODE !== "undefined" && TENSE_MODE?.verbo) {
          targetObject.setActiveUnitMode(TENSE_MODE.verbo);
        }
      }
      if (typeof setComposerEntryBoard === "function" && typeof COMPOSER_ENTRY_BOARD !== "undefined") {
        setComposerEntryBoard(COMPOSER_ENTRY_BOARD.general || "general", {
          force: true
        });
      } else if (typeof renderVerbComposerFromState === "function") {
        renderVerbComposerFromState();
      }
      if (
        activeUnit === CLASSICAL_BASAL_UNIT.vnc
        && typeof applyComposerStateToVerbInput === "function"
      ) {
        applyComposerStateToVerbInput({
          triggerGenerate: true,
          immediateRefresh: true
        });
      } else {
        refreshClassicalBasalUnitRenderedOutput();
      }
    }
    function applyClassicalBasalUnitMode(unit = "", options = {}) {
      const activeUnit = syncClassicalBasalUnitControls(unit);
      if (options.syncSurface !== false) {
        applyClassicalBasalUnitSurface(activeUnit);
      }
      syncClassicalBasalUnitControls(activeUnit);
      return activeUnit;
    }
    const CLASSICAL_RELATIONAL_NNC_SOURCE_KIND_BY_STEM = Object.freeze({
      "n-locative": "nounstem",
      "yan-locative": "perfective-core",
      "tlah-abundance-place": "nounstem",
      "co-c-specific-location": "nounstem",
      "ca-interval-distance": "quantitive",
      "pa-direction": "nounstem",
      "pa-frequency": "numeral",
      "nal-far-bank": "water-stem",
      "chi-direction-toward": "ground-stem",
      "ic-downward-direction": "body-part-stem",
      "teuh-similarity": "nounstem",
      "tzalan-between": "nounstem",
      "huic-direction": "nounstem",
      "ca-means": "nounstem",
      "icpac-top": "nounstem",
      "tech-contact": "nounstem",
      "tlan-bottom": "nounstem",
      "pan-surface-time": "nounstem"
    });
    const CLASSICAL_RELATIONAL_NNC_STEM_LABELS = Object.freeze({
      "huan-company": "huān · company",
      "tloc-proximity": "tloc · proximity",
      "pal-favor": "pal · favor",
      "c-means-purpose-reason-time": "c · means / purpose / reason / time",
      "n-locative": "n · place / time",
      "yan-locative": "yā-n · perfective place",
      "tlah-abundance-place": "tlah · abundant place",
      "co-c-specific-location": "co / c · specific location",
      "ca-interval-distance": "ca · interval / distance",
      "pa-direction": "pa · direction",
      "pa-frequency": "pa · frequency",
      "nal-far-bank": "nāl · far bank",
      "chi-direction-toward": "chi · direction toward",
      "ic-downward-direction": "ic · downward direction",
      "teuh-similarity": "teuh · similarity / manner",
      "tzalan-between": "tzālan · between / among",
      "huic-direction": "huic · direction",
      "ca-means": "ca · means",
      "icpac-top": "icpac · top",
      "tech-contact": "tech · contact",
      "tlan-bottom": "tlan · bottom / adjacency",
      "pan-surface-time": "pan · surface / place / time"
    });
    function isClassicalRelationalNncUiModeEnabled() {
      const selected = getClassicalNncSourceGuideElements().select?.selectedOptions?.[0] || null;
      return Boolean(selected?.dataset?.classicalRelationalStemId);
    }
    function getClassicalRelationalNncUiElements() {
      const byId = id => targetObject.document?.getElementById?.(id) || null;
      return {
        authority: byId("classical-relational-nnc-authority"),
        stem: byId("classical-nnc-source-example"),
        operation: byId("classical-relational-nnc-operation"),
        operationField: byId("classical-relational-nnc-operation-field"),
        option: byId("classical-relational-nnc-option"),
        optionField: byId("classical-relational-nnc-usage-field"),
        sourceFormation: byId("classical-relational-nnc-source-formation"),
        sourceFormationField: byId("classical-relational-nnc-source-formation-field"),
        pertinencySource: byId("classical-relational-nnc-pertinency-source"),
        pertinencySourceField: byId("classical-relational-nnc-pertinency-source-field"),
        state: byId("classical-relational-nnc-state"),
        stateField: byId("classical-relational-nnc-state-field"),
        possessor: byId("classical-relational-nnc-possessor"),
        possessorField: byId("classical-relational-nnc-possessor-field"),
        subjectMode: byId("classical-relational-nnc-subject-mode"),
        subject: byId("classical-relational-nnc-subject"),
        subjectField: byId("classical-relational-nnc-subject-field"),
        affective: byId("classical-relational-nnc-affective"),
        affectiveField: byId("classical-relational-nnc-affective-field")
      };
    }
    function populateClassicalRelationalNncStemOptions() {
      const { stem } = getClassicalRelationalNncUiElements();
      if (!stem || stem.dataset.classicalRelationalInventoryPopulated === "true") {
        return stem;
      }
      const inventory = typeof targetObject.getClassicalNahuatlRelationalStemInventory === "function"
        ? targetObject.getClassicalNahuatlRelationalStemInventory()
        : [];
      const group = targetObject.document.createElement("optgroup");
      group.label = "Relational nounstems";
      group.dataset.classicalRelationalNncInventory = "derived";
      inventory.forEach(entry => {
        const option = targetObject.document.createElement("option");
        option.value = `relational:${entry.stemId}`;
        option.textContent = CLASSICAL_RELATIONAL_NNC_STEM_LABELS[entry.stemId] || entry.stemId.replace(/-/gu, " ");
        option.dataset.optionGroup = entry.optionGroup;
        option.dataset.allowedOptions = entry.allowedOptions.join(" ");
        option.dataset.relationalKind = entry.relationalKind;
        option.dataset.classicalRelationalStemId = entry.stemId;
        option.dataset.classicalNncSourceStem = entry.classicalMatrix;
        option.dataset.classicalNncSourceMode = "whole-stem";
        option.dataset.classicalNncSourceMatrix = entry.classicalMatrix;
        option.dataset.classicalRelationalFixedEmbed = entry.fixedEmbeddedStem || "";
        option.dataset.classicalRelationalDefaultEmbed = entry.defaultEmbeddedStem || "";
        group.appendChild(option);
      });
      stem.appendChild(group);
      stem.dataset.classicalRelationalInventoryPopulated = "true";
      return stem;
    }
    function buildClassicalRelationalNncDeverbalUpstreamResult(
      sourceFormation,
      sourceStem,
    ) {
      const sourceValenceSelection = String(
        targetObject.document?.getElementById?.("classical-rule-logic-valence")?.value
        || "intransitive"
      );
      const verbClass = String(
        targetObject.document?.getElementById?.("classical-rule-logic-class")?.value
        || "B"
      );
      const sourceSubject = String(
        targetObject.document?.getElementById?.("classical-rule-logic-subject")?.value
        || "3sg"
      );
      if (["preterit-agentive", "active-action"].includes(sourceFormation)) {
        if (typeof targetObject.requestClassicalDeverbalNncResult !== "function") {
          return null;
        }
        const reflexive = sourceValenceSelection.includes("reflexive");
        const reciprocal = sourceValenceSelection.includes("reciprocal");
        const sourceValence = sourceValenceSelection === "intransitive"
          ? "intransitive"
          : "single-object";
        const sourceObjectPattern = reflexive
          ? "reflexive"
          : reciprocal
            ? "reciprocal"
            : sourceValenceSelection === "projective-human"
              ? "nonspecific-human"
              : sourceValenceSelection === "projective-nonhuman"
                ? "nonspecific-nonhuman"
                : "none";
        return targetObject.requestClassicalDeverbalNncResult({
          constructionKind: "predicate-nominalization",
          nominalizationKind: sourceFormation,
          source: {
            sourceStage: sourceFormation === "preterit-agentive"
              ? "preterit-predicate"
              : "distant-past-predicate",
            sourceStem,
            verbClass,
            sourceVoice: "active",
            sourceValence,
            sourceObjectPattern,
            sourceSubject,
          },
          subject: "3sg",
          state: "absolutive",
        });
      }
      const vncFormationProfiles = {
        "imperfect-active": {
          tense: "imperfect",
          requestedVoice: "active",
        },
        "imperfect-passive": {
          tense: "imperfect",
          requestedVoice: "passive",
        },
        "imperfect-impersonal": {
          tense: "imperfect",
          requestedVoice: "impersonal",
        },
        "present-yohua": {
          tense: "present",
          requestedVoice: "active",
        },
        "perfective-active": {
          tense: "preterit",
          requestedVoice: "active",
        },
        "perfective-impersonal-tla": {
          tense: "preterit",
          requestedVoice: "impersonal",
          nonactiveOptionId: "tla-impersonal",
        },
      };
      const vncProfile = vncFormationProfiles[sourceFormation];
      if (
        !vncProfile
        || typeof targetObject.requestClassicalVncApplicationResult !== "function"
      ) {
        return null;
      }
      return targetObject.requestClassicalVncApplicationResult({
        sourceStem,
        verbClass,
        sourceValence: sourceValenceSelection,
        subject: sourceSubject,
        mood: "indicative",
        ...vncProfile,
      });
    }
    function getClassicalRelationalNncUiRequest() {
      const elements = getClassicalRelationalNncUiElements();
      const selectedStem = elements.stem?.selectedOptions?.[0] || null;
      const stemId = String(selectedStem?.dataset?.classicalRelationalStemId || "");
      const operation = String(elements.operation?.value || "relational-nnc");
      const option = operation === "compound-embed"
        ? "option-four"
        : String(elements.option?.value || "option-two");
      const sourceParts = getClassicalSourcePartControlState();
      const sourceMode = operation === "relational-nnc" && option === "option-one"
        ? CLASSICAL_SOURCE_PARTS_MODE.wholeStem
        : CLASSICAL_SOURCE_PARTS_MODE.embedMatrix;
      const sourceEmbedStem = sourceMode === CLASSICAL_SOURCE_PARTS_MODE.embedMatrix
        ? sourceParts.sourceEmbedStem
        : "";
      const sourceMatrixStem = sourceMode === CLASSICAL_SOURCE_PARTS_MODE.embedMatrix
        ? sourceParts.sourceMatrixStem
        : sourceParts.sourceWholeStem;
      const selectedSourceFormation =
        operation === "relational-nnc"
        && ["n-locative", "yan-locative"].includes(stemId)
        && option === "option-two"
          ? String(elements.sourceFormation?.value || "plain-nounstem")
          : "plain-nounstem";
      const ownerIssuedDerivedSource = buildClassicalRelationalNncDeverbalUpstreamResult(
        selectedSourceFormation,
        sourceEmbedStem,
      );
      const sourceKind = option === "option-one"
        ? "possessor"
        : selectedSourceFormation === "can-interrogative"
          ? "interrogative-empty"
          : selectedSourceFormation === "can-modified"
            ? "interrogative-modifier"
            : CLASSICAL_RELATIONAL_NNC_SOURCE_KIND_BY_STEM[stemId] || "nounstem";
      const state = operation === "relational-nnc" && option === "option-one"
        ? "possessive"
        : String(elements.state?.value || "absolutive");
      const possessorId = stemId === "c-means-purpose-reason-time"
        ? "3common"
        : state === "possessive"
          ? String(elements.possessor?.value || "3sg")
          : "";
      const request = {
        nounstem: {
          kind: "classical-nahuatl-nnc-nounstem-request",
          stemId,
          operation,
          formation: option,
          ...(!ownerIssuedDerivedSource && operation === "relational-nnc"
            ? {
              sourceKind,
              sourceFormation: selectedSourceFormation,
              sourceVoice: "active",
            }
            : {}),
          sourceMode,
          ...(ownerIssuedDerivedSource
            ? { upstreamResult: ownerIssuedDerivedSource }
            : operation === "relational-nnc"
              ? {
                sourceStem: option === "option-one"
                  ? sourceMatrixStem
                  : selectedSourceFormation === "can-interrogative"
                    ? ""
                    : sourceEmbedStem,
                sourceEmbedStem: selectedSourceFormation === "can-interrogative"
                  ? ""
                  : sourceEmbedStem,
                sourceMatrixStem,
              }
              : operation === "compound-embed"
                ? {
                  downstreamTargetStem: sourceMatrixStem,
                }
                : {
                  sourceStem: [sourceEmbedStem, sourceMatrixStem]
                    .filter(Boolean)
                    .join("-"),
                }),
          affective: String(elements.affective?.value || "none"),
          pertinencySourceKind: String(
            elements.pertinencySource?.value || "direct-relational"
          )
        },
        state,
        possessorId,
        subjectMode: String(elements.subjectMode?.value || "adverbialized"),
        subjectId: String(elements.subject?.value || "3common"),
      };
      if (
        operation === "pertinency"
        && elements.pertinencySource?.value === "associated-entity"
        && typeof targetObject.requestClassicalRelationalNncResult === "function"
      ) {
        const associatedRequest = {
          ...request,
          nounstem: {
            ...request.nounstem,
            operation: "associated-entity",
            pertinencySourceKind: "direct-relational",
          },
        };
        const associatedResult =
          targetObject.requestClassicalRelationalNncResult(associatedRequest);
        delete request.nounstem.sourceStem;
        request.nounstem.upstreamResult = associatedResult;
      }
      return request;
    }
    function applyClassicalRelationalNncSourceStructure(selectedStem = null, formation = "") {
      const relationalElements = getClassicalRelationalNncUiElements();
      const stem = selectedStem || relationalElements.stem?.selectedOptions?.[0] || null;
      const lexicalMatrixStem = String(
        stem?.dataset?.classicalNncSourceMatrix
        || stem?.dataset?.classicalNncSourceStem
        || ""
      ).trim();
      if (!stem?.dataset?.classicalRelationalStemId || !lexicalMatrixStem) {
        return false;
      }
      const operation = String(
        relationalElements.operation?.value || "relational-nnc"
      );
      const sourceFormation = String(
        relationalElements.sourceFormation?.value || "plain-nounstem"
      );
      const option = operation === "compound-embed"
        ? "option-four"
        : String(formation || relationalElements.option?.value || "option-two");
      const {
        root,
        wholeInput,
        embedInput,
        matrixInput,
      } = getClassicalSourcePartControlElements();
      if (!root || !wholeInput || !embedInput || !matrixInput) {
        return false;
      }
      const simpleStem = operation === "relational-nnc" && option === "option-one";
      const compoundEmbed = operation === "compound-embed";
      const selectedStemId = String(stem.dataset.classicalRelationalStemId || "");
      const previousStemId = String(root.dataset.classicalRelationalNncStemId || "");
      const previousOperation = String(
        root.dataset.classicalRelationalNncOperation || ""
      );
      const fixedEmbed = normalizeClassicalFuenteSourcePartStem(stem.dataset.classicalRelationalFixedEmbed || "");
      const defaultEmbed = normalizeClassicalFuenteSourcePartStem(stem.dataset.classicalRelationalDefaultEmbed || "");
      setClassicalSourcePartsMode(
        simpleStem ? CLASSICAL_SOURCE_PARTS_MODE.wholeStem : CLASSICAL_SOURCE_PARTS_MODE.embedMatrix
      );
      if (simpleStem) {
        wholeInput.value = normalizeClassicalFuenteSourcePartStem(lexicalMatrixStem.replace("/", ""));
        wholeInput.readOnly = true;
        wholeInput.setAttribute("aria-readonly", "true");
      } else if (compoundEmbed) {
        wholeInput.readOnly = false;
        wholeInput.removeAttribute("aria-readonly");
        embedInput.value = normalizeClassicalFuenteSourcePartStem(
          lexicalMatrixStem.replace("/", "")
        );
        embedInput.readOnly = true;
        embedInput.setAttribute("aria-readonly", "true");
        matrixInput.value = normalizeClassicalFuenteSourcePartStem(
          previousOperation === "compound-embed"
            ? matrixInput.value || "poh"
            : "poh"
        );
        matrixInput.readOnly = false;
        matrixInput.removeAttribute("aria-readonly");
      } else {
        wholeInput.readOnly = false;
        wholeInput.removeAttribute("aria-readonly");
        embedInput.value = sourceFormation === "can-interrogative"
          ? ""
          : normalizeClassicalFuenteSourcePartStem(
            fixedEmbed
            || (selectedStemId !== previousStemId ? defaultEmbed : "")
            || embedInput.value
            || root.dataset.classicalRelationalNncLastEmbed
            || "cal"
          );
        const matrixStem = lexicalMatrixStem === "co/c"
          ? /[aeiouāēīō]$/u.test(embedInput.value) ? "c" : "co"
          : normalizeClassicalFuenteSourcePartStem(lexicalMatrixStem);
        matrixInput.value = matrixStem;
        matrixInput.readOnly = true;
        matrixInput.setAttribute("aria-readonly", "true");
        embedInput.readOnly =
          Boolean(fixedEmbed) || sourceFormation === "can-interrogative";
        embedInput.toggleAttribute(
          "aria-readonly",
          Boolean(fixedEmbed) || sourceFormation === "can-interrogative"
        );
        if (sourceFormation !== "can-interrogative") {
          root.dataset.classicalRelationalNncLastEmbed = embedInput.value;
        }
      }
      getClassicalSourcePartControlElements().modeButtons.forEach(button => {
        button.disabled = true;
        button.setAttribute("aria-disabled", "true");
      });
      root.dataset.classicalSourceParts = "relational-nounstem";
      root.dataset.classicalRelationalNncSourceMode = simpleStem ? "stem" : "embed-matrix";
      root.dataset.classicalRelationalNncOperation = operation;
      root.dataset.classicalRelationalNncStemId = selectedStemId;
      syncClassicalBuiltSourceToVerbInput();
      return true;
    }
    function syncClassicalRelationalNncUiControls({ render = false } = {}) {
      const elements = getClassicalRelationalNncUiElements();
      const stemControl = populateClassicalRelationalNncStemOptions();
      if (!stemControl) {
        return false;
      }
      const activeUnit = normalizeClassicalBasalUnit(getClassicalBasalUnitFromRuntime());
      const nncActive = activeUnit === CLASSICAL_BASAL_UNIT.nnc;
      const selectedStem = stemControl.selectedOptions?.[0] || null;
      const modeActive = nncActive && Boolean(selectedStem?.dataset?.classicalRelationalStemId);
      if (targetObject.document?.body) {
        targetObject.document.body.dataset.classicalRelationalNncMode = String(modeActive);
      }
      if (elements.authority) {
        elements.authority.hidden = !modeActive;
        elements.authority.setAttribute("aria-hidden", String(!modeActive));
      }
      if (!modeActive) {
        const sourceParts = getClassicalSourcePartControlElements();
        if (sourceParts.root?.dataset?.classicalSourceParts === "relational-nounstem") {
          sourceParts.root.dataset.classicalSourceParts = "user-defined";
          delete sourceParts.root.dataset.classicalRelationalNncSourceMode;
          delete sourceParts.root.dataset.classicalRelationalNncStemId;
          [sourceParts.wholeInput, sourceParts.embedInput, sourceParts.matrixInput].filter(Boolean).forEach(input => {
            input.readOnly = false;
            input.removeAttribute("aria-readonly");
          });
          sourceParts.modeButtons.forEach(button => {
            button.disabled = false;
            button.setAttribute("aria-disabled", "false");
          });
        }
        if (nncActive) {
          syncClassicalSourceReadout(CLASSICAL_BASAL_UNIT.nnc);
        }
        return false;
      }
      const allowedOptions = String(selectedStem?.dataset?.allowedOptions || "")
        .split(/\s+/u)
        .filter(Boolean);
      const operation = String(
        elements.operation?.value || "relational-nnc"
      );
      const displayedOptions = operation === "compound-embed"
        ? ["option-four"]
        : allowedOptions.filter(value => value !== "option-four");
      const previousOption = String(elements.option?.value || "");
      if (elements.option) {
        const usageLabels = {
          "option-one": "simple possessive NNC",
          "option-two": "integrated compound NNC",
          "option-three": "linked compound NNC",
          "option-four": "relational stem embedded in a compound"
        };
        elements.option.replaceChildren();
        displayedOptions.forEach(value => {
          const option = targetObject.document.createElement("option");
          option.value = value;
          option.textContent = usageLabels[value] || value.replace("option-", "option ");
          elements.option.appendChild(option);
        });
        elements.option.value = displayedOptions.includes(previousOption)
          ? previousOption
          : displayedOptions.includes("option-two")
            ? "option-two"
            : displayedOptions[0] || "option-one";
      }
      const option = String(elements.option?.value || "option-two");
      const selectedStemId = String(selectedStem?.dataset?.classicalRelationalStemId || "");
      const sourceFormationChoices = {
        "n-locative": [
          ["plain-nounstem", "nounstem"],
          ["preterit-agentive", "preterit-agentive general-use stem"],
          ["active-action", "active-action general-use stem"],
          ["can-interrogative", "interrogative cā-n"],
          ["can-modified", "modified interrogative X-cā-n"],
          ["imperfect-active", "active imperfect predicate"],
          ["imperfect-passive", "passive imperfect predicate"],
          ["imperfect-impersonal", "impersonal imperfect predicate"],
          ["present-yohua", "present yohua predicate"],
        ],
        "yan-locative": [
          ["perfective-active", "active perfective core"],
          ["perfective-impersonal-tla", "tla-impersonal perfective core"],
        ],
      };
      const availableSourceFormations =
        sourceFormationChoices[selectedStemId] || [];
      if (elements.sourceFormation && availableSourceFormations.length) {
        const priorSourceFormation = String(
          elements.sourceFormation.value || ""
        );
        elements.sourceFormation.replaceChildren();
        availableSourceFormations.forEach(([value, label]) => {
          const sourceFormationOption =
            targetObject.document.createElement("option");
          sourceFormationOption.value = value;
          sourceFormationOption.textContent = label;
          elements.sourceFormation.appendChild(sourceFormationOption);
        });
        elements.sourceFormation.value = availableSourceFormations.some(
          ([value]) => value === priorSourceFormation
        )
          ? priorSourceFormation
          : availableSourceFormations[0][0];
      }
      const derivedSourceFormation = String(
        elements.sourceFormation?.value || "plain-nounstem"
      );
      applyClassicalRelationalNncSourceStructure(selectedStem, option);
      const sourceFormationAvailable =
        operation === "relational-nnc"
        && ["n-locative", "yan-locative"].includes(selectedStemId)
        && option === "option-two";
      const sourceFormationState = {
        "preterit-agentive": "absolutive",
        "active-action": "possessive",
        "can-interrogative": "absolutive",
        "can-modified": "absolutive",
        "imperfect-active": "possessive",
        "imperfect-passive": "possessive",
        "imperfect-impersonal": "absolutive",
        "present-yohua": "absolutive",
        "perfective-active": "possessive",
        "perfective-impersonal-tla": "absolutive",
      }[derivedSourceFormation] || "";
      const fixedState =
        operation === "relational-nnc"
        && (
          option === "option-one"
          || Boolean(sourceFormationState)
        );
      const state = operation === "relational-nnc"
        && option === "option-one"
        ? "possessive"
        : sourceFormationState
          || String(elements.state?.value || "absolutive");
      if (elements.state) {
        elements.state.value = state;
        elements.state.disabled = fixedState;
      }
      if (elements.stateField) elements.stateField.hidden = fixedState;
      if (elements.optionField) {
        elements.optionField.hidden = ["associated-entity", "pertinency"].includes(
          operation
        );
      }
      if (elements.sourceFormationField) {
        elements.sourceFormationField.hidden = !sourceFormationAvailable;
      }
      if (elements.pertinencySourceField) {
        elements.pertinencySourceField.hidden = operation !== "pertinency";
      }
      if (elements.possessorField) elements.possessorField.hidden = state !== "possessive";
      if (elements.possessor) {
        const fixedThird = selectedStemId === "c-means-purpose-reason-time";
        elements.possessor.disabled = fixedThird;
        if (fixedThird) elements.possessor.value = "3sg";
      }
      if (elements.subjectField) elements.subjectField.hidden = elements.subjectMode?.value !== "normal";
      if (elements.affectiveField) {
        elements.affectiveField.hidden = operation !== "relational-nnc";
      }
      if (elements.affective) {
        elements.affective.disabled = operation !== "relational-nnc";
        if (elements.affective.disabled) elements.affective.value = "none";
      }
      syncClassicalSourceReadout(CLASSICAL_BASAL_UNIT.nnc);
      if (render && typeof targetObject.renderClassicalRuleLogicSurfaceBlock === "function") {
        targetObject.renderClassicalRuleLogicSurfaceBlock();
      }
      return true;
    }
    function initClassicalRelationalNncUiControls() {
      const elements = getClassicalRelationalNncUiElements();
      const nounstemSelect = populateClassicalRelationalNncStemOptions();
      if (!nounstemSelect) {
        return false;
      }
      if (nounstemSelect.dataset.classicalRelationalNncBound === "true") {
        syncClassicalRelationalNncUiControls();
        return true;
      }
      [
        elements.state,
        elements.possessor,
        elements.subjectMode,
        elements.subject,
        elements.affective,
        elements.pertinencySource,
      ]
        .filter(Boolean)
        .forEach(control => control.addEventListener("change", () => {
          syncClassicalRelationalNncUiControls({ render: true });
        }));
      elements.option?.addEventListener("change", () => {
        syncClassicalRelationalNncUiControls();
        commitClassicalSourcePartsEvaluation({
          force: true,
          source: "classical-relational-nnc-formation"
        });
      });
      [elements.operation, elements.sourceFormation]
        .filter(Boolean)
        .forEach(control => control.addEventListener("change", () => {
          syncClassicalRelationalNncUiControls();
          commitClassicalSourcePartsEvaluation({
            force: true,
            source: "classical-relational-nnc-operation"
          });
        }));
      nounstemSelect.dataset.classicalRelationalNncBound = "true";
      syncClassicalRelationalNncUiControls();
      return true;
    }
    function initClassicalBasalUnitControls() {
      if (typeof targetObject.document === "undefined") {
        return;
      }
      const buttons = Array.from(targetObject.document.querySelectorAll("button[data-classical-basal-unit]"));
      if (!buttons.length) {
        return;
      }
      initClassicalRelationalNncUiControls();
      buttons.forEach(button => {
        button.addEventListener("click", () => {
          applyClassicalBasalUnitMode(button.getAttribute("data-classical-basal-unit") || "");
        });
      });
      const sourceInput = targetObject.document.getElementById("verb");
      if (sourceInput) {
        sourceInput.addEventListener("change", () => {
          targetObject
            .clearClassicalVncResultSourceContinuation?.(
              "source-mirror-edited"
            );
          scheduleVerbInputRefresh(sourceInput.value, {
            immediate: true,
            source: "source-mirror-change"
          });
        });
      }
      syncClassicalSourcePartControlsFromRuntime();
      const {
        root,
        modeButtons,
        wholeInput,
        embedInput,
        matrixInput
      } = getClassicalSourcePartControlElements();
      const {
        root: nncSourceGuide,
        select: nncSourceExample
      } = getClassicalNncSourceGuideElements();
      const {
        select: vncSourceStemPicker,
        initialIChoice: vncSourceInitialIChoice,
        sourceLexemeChoice: vncSourceLexemeChoice
      } = getClassicalVncSourceGuideElements();
      const handleSourcePartsChange = (event = null) => {
        targetObject
          .clearClassicalVncResultSourceContinuation?.(
            "source-constituent-edited"
          );
        const relationalEmbedEdit = isClassicalRelationalNncUiModeEnabled()
          && event?.target === embedInput;
        if (relationalEmbedEdit && root?.dataset) {
          root.dataset.classicalRelationalNncLastEmbed = normalizeClassicalFuenteSourcePartStem(embedInput?.value || "");
        }
        if (event?.isTrusted === true && nncSourceExample && !relationalEmbedEdit) {
          nncSourceExample.value = "";
          if (nncSourceGuide?.dataset) {
            nncSourceGuide.dataset.classicalNncSourceSelection = "user-nounstem";
            delete nncSourceGuide.dataset.classicalNncSourceSelectedStem;
            delete nncSourceGuide.dataset.classicalNncSourceSelectedType;
          }
        }
        setClassicalSourcePartsPendingState(getClassicalSourcePartsEvaluationSignature() !== ClassicalSourcePartsCommittedSignature);
      };
      nncSourceExample?.addEventListener("change", () => {
        if (applyClassicalNncSourceExampleSelection()) {
          if (isClassicalRelationalNncUiModeEnabled()) {
            syncClassicalRelationalNncUiControls();
            commitClassicalSourcePartsEvaluation({
              force: true,
              source: "classical-relational-nnc-source"
            });
            return;
          }
          commitClassicalSourcePartsEvaluation({
            force: true,
            source: "classical-source-example"
          });
        }
      });
      populateClassicalVncSourceStemPicker();
      vncSourceStemPicker?.addEventListener("change", () => {
        targetObject
          .clearClassicalVncResultSourceContinuation?.(
            "canonical-source-picker-changed"
          );
        if (applyClassicalVncSourceStemSelection()) {
          commitClassicalSourcePartsEvaluation({
            force: true,
            source: "classical-source-picker"
          });
        }
      });
      vncSourceInitialIChoice?.addEventListener("change", () => {
        targetObject
          .clearClassicalVncResultSourceContinuation?.(
            "source-initial-i-changed"
          );
        syncClassicalVncSourceInitialIFact(getClassicalVncSourceGuideElements().root, vncSourceStemPicker);
        commitClassicalSourcePartsEvaluation({
          force: true,
          source: "classical-source-initial-i"
        });
      });
      vncSourceLexemeChoice?.addEventListener("change", () => {
        targetObject
          .clearClassicalVncResultSourceContinuation?.(
            "source-lexeme-changed"
          );
        syncClassicalVncSourceLexemeFact(
          getClassicalVncSourceGuideElements().root,
          vncSourceStemPicker
        );
        commitClassicalSourcePartsEvaluation({
          force: true,
          source: "classical-source-lexeme"
        });
      });
      modeButtons.forEach(button => {
        button.addEventListener("click", () => {
          const mode = normalizeClassicalSourcePartsMode(button.getAttribute("data-classical-source-parts-kind") || "");
          if (nncSourceExample) {
            nncSourceExample.value = "";
          }
          setClassicalSourcePartsMode(mode, {
            clearValues: mode === "whole-stem"
          });
          handleSourcePartsChange();
          commitClassicalSourcePartsEvaluation({
            source: "classical-source-mode"
          });
          if (mode === "embed-matrix" && embedInput && typeof embedInput.focus === "function") {
            embedInput.focus();
          } else if (wholeInput && typeof wholeInput.focus === "function") {
            wholeInput.focus();
          }
        });
      });
      [wholeInput, embedInput, matrixInput].filter(Boolean).forEach(input => {
        input.addEventListener("input", handleSourcePartsChange);
        input.addEventListener("change", event => {
          handleSourcePartsChange(event);
        });
      });
      const syncFromExistingControl = () => {
        if (typeof targetObject.window !== "undefined" && typeof targetObject.window.setTimeout === "function") {
          targetObject.window.setTimeout(() => syncClassicalBasalUnitControls(), 0);
          return;
        }
        syncClassicalBasalUnitControls();
      };
      targetObject.document.querySelectorAll("[data-tense-mode]").forEach(control => {
        control.addEventListener("click", syncFromExistingControl);
      });
      syncClassicalBasalUnitControls();
      refreshClassicalRuleLogicSurfaceFromControl();
    }
    const CLASSICAL_CAUSATIVE_PARTICIPANT_CONTROL_REQUEST_KEYS = Object.freeze({
      "classical-rule-logic-derivation-option": "derivationOptionId",
      "classical-rule-logic-causative-causee-valence": "causativeObjectKind",
      "classical-rule-logic-causative-specific-shuntline-realization": "causativeSpecificShuntlineRealization"
    });
    const CLASSICAL_NONACTIVE_FORMATION_CONTROL_ID = "classical-rule-logic-nonactive-family";
    let ClassicalCausativeParticipantControlEventsInitialized = false;
    let ClassicalNonactiveFormationControlEventsInitialized = false;
    let ClassicalCausativeParticipantControlRefreshTimer = null;
    let PendingClassicalCausativeParticipantControlOverrides = null;
    const HandledClassicalCausativeParticipantChangeEvents = new WeakSet();
    const HandledClassicalNonactiveFormationChangeEvents = new WeakSet();
    function isClassicalCausativeParticipantControl(control = null) {
      return Boolean(CLASSICAL_CAUSATIVE_PARTICIPANT_CONTROL_REQUEST_KEYS[String(control?.id || "")]);
    }
    function getClassicalCausativeParticipantControlRequestOverrides(control = null) {
      const requestKey = CLASSICAL_CAUSATIVE_PARTICIPANT_CONTROL_REQUEST_KEYS[String(control?.id || "")] || "";
      if (!requestKey) {
        return {};
      }
      if (requestKey === "derivationOptionId") {
        return {
          derivationOptionId: String(control?.value || "").trim()
        };
      }
      return Object.entries(CLASSICAL_CAUSATIVE_PARTICIPANT_CONTROL_REQUEST_KEYS).reduce((overrides, [controlId, participantRequestKey]) => {
        if (participantRequestKey === "derivationOptionId") {
          return overrides;
        }
        const participantControl = controlId === control.id
          ? control
          : targetObject.document?.getElementById?.(controlId) || null;
        if (participantControl) {
          overrides[participantRequestKey] = String(participantControl.value || "").trim();
        }
        return overrides;
      }, {});
    }
    function isClassicalNonactiveFormationControl(control = null) {
      return String(control?.id || "") === CLASSICAL_NONACTIVE_FORMATION_CONTROL_ID;
    }
    function getClassicalNonactiveFormationControlRequestOverrides(control = null) {
      if (!isClassicalNonactiveFormationControl(control)) {
        return {};
      }
      return {
        nonactiveOptionId: String(control?.value || "").trim()
      };
    }
    function getClassicalPreservedNonactiveFormationRequestOverrides(
      control = null
    ) {
      if (isClassicalNonactiveFormationControl(control)) {
        return getClassicalNonactiveFormationControlRequestOverrides(control);
      }
      const formationControl = targetObject.document?.getElementById?.(
        CLASSICAL_NONACTIVE_FORMATION_CONTROL_ID
      ) || null;
      const voiceControl = targetObject.document?.getElementById?.(
        "classical-rule-logic-vnc-voice"
      ) || null;
      const selectedOptionId = String(
        formationControl?.value || ""
      ).trim();
      const selectedOption = selectedOptionId
        ? Array.from(formationControl?.options || []).find(
          option => option.value === selectedOptionId
        ) || null
        : null;
      const nonactiveVoice = ["passive", "impersonal"].includes(
        String(voiceControl?.value || "").trim()
      );
      return nonactiveVoice
        && selectedOptionId
        && selectedOption
        && selectedOption.disabled !== true
        ? { nonactiveOptionId: selectedOptionId }
        : {};
    }
    function refreshClassicalRuleLogicSurfaceFromControl(control = null) {
      if (typeof targetObject.renderClassicalRuleLogicSurfaceBlock !== "function") {
        return;
      }
      const rendered = targetObject.renderClassicalRuleLogicSurfaceBlock({
        ...getClassicalCausativeParticipantControlRequestOverrides(control),
        ...getClassicalPreservedNonactiveFormationRequestOverrides(control)
      });
      const derivationType = typeof targetObject.getActiveDerivationType === "function" ? targetObject.getActiveDerivationType() : "direct";
      if (["causative", "applicative"].includes(derivationType)) {
        syncEntradaUrlSegmentsFromCurrentState({
          replace: true
        });
      }
      return rendered;
    }
    function scheduleClassicalCausativeParticipantControlRefresh(event = null) {
      const control = event?.target || null;
      if (!isClassicalCausativeParticipantControl(control) || typeof targetObject.window?.setTimeout !== "function") {
        return false;
      }
      if (event) {
        HandledClassicalCausativeParticipantChangeEvents.add(event);
      }
      PendingClassicalCausativeParticipantControlOverrides = getClassicalCausativeParticipantControlRequestOverrides(control);
      if (ClassicalCausativeParticipantControlRefreshTimer) {
        targetObject.window.clearTimeout(ClassicalCausativeParticipantControlRefreshTimer);
      }
      ClassicalCausativeParticipantControlRefreshTimer = targetObject.window.setTimeout(() => {
        const overrides = PendingClassicalCausativeParticipantControlOverrides || {};
        ClassicalCausativeParticipantControlRefreshTimer = null;
        PendingClassicalCausativeParticipantControlOverrides = null;
        if (typeof targetObject.renderClassicalRuleLogicSurfaceBlock === "function") {
          targetObject.renderClassicalRuleLogicSurfaceBlock(overrides);
        }
        syncEntradaUrlSegmentsFromCurrentState({
          replace: true
        });
      }, 0);
      return true;
    }
    function handleClassicalCausativeParticipantControlChange(event = null) {
      const control = event?.target || null;
      if (!isClassicalCausativeParticipantControl(control)) {
        return false;
      }
      if (event && HandledClassicalCausativeParticipantChangeEvents.has(event)) {
        return true;
      }
      if (event) {
        HandledClassicalCausativeParticipantChangeEvents.add(event);
      }
      refreshClassicalRuleLogicSurfaceFromControl(control);
      return true;
    }
    function bindClassicalCausativeParticipantControlEvents(control = null) {
      if (!isClassicalCausativeParticipantControl(control)
        || control.dataset?.classicalCausativeParticipantEventBound === "true"
        || typeof control.addEventListener !== "function") {
        return false;
      }
      control.addEventListener("input", handleClassicalCausativeParticipantControlChange);
      control.addEventListener("change", handleClassicalCausativeParticipantControlChange);
      control.dataset.classicalCausativeParticipantEventBound = "true";
      return true;
    }
    function handleClassicalNonactiveFormationControlChange(event = null) {
      const control = event?.target || null;
      if (!isClassicalNonactiveFormationControl(control)) {
        return false;
      }
      if (event && HandledClassicalNonactiveFormationChangeEvents.has(event)) {
        return true;
      }
      if (event) {
        HandledClassicalNonactiveFormationChangeEvents.add(event);
      }
      refreshClassicalRuleLogicSurfaceFromControl(control);
      return true;
    }
    function handleClassicalCausativeParticipantRevisionClick(event = null) {
      const eventTarget = event?.target || null;
      const revisionButton = typeof eventTarget?.closest === "function"
        ? eventTarget.closest("[data-classical-segment-control]")
        : eventTarget;
      const controlId = String(revisionButton?.dataset?.classicalSegmentControl || "");
      if (!CLASSICAL_CAUSATIVE_PARTICIPANT_CONTROL_REQUEST_KEYS[controlId] || revisionButton?.disabled) {
        return false;
      }
      const control = targetObject.document?.getElementById?.(controlId) || null;
      const value = String(revisionButton?.dataset?.classicalSegmentValue || "");
      const intentionalReset = revisionButton?.dataset?.classicalSegmentReset === "true";
      if (!control || !value && !intentionalReset || control.value === value) {
        return false;
      }
      control.value = value;
      refreshClassicalRuleLogicSurfaceFromControl(control);
      return true;
    }
    function initClassicalCausativeParticipantControlEvents() {
      if (ClassicalCausativeParticipantControlEventsInitialized) {
        return false;
      }
      const documentObject = targetObject.document;
      if (!documentObject || typeof documentObject.addEventListener !== "function") {
        return false;
      }
      // Native selects emit input before change. Commit on input so a generic
      // rerender cannot detach the control before its participant choice is
      // carried into the typed request; change remains the keyboard/fallback
      // path. Capture also covers controls installed after the static snapshot,
      // and the WeakSet deduplicates each delegated/direct event.
      documentObject.addEventListener("input", handleClassicalCausativeParticipantControlChange, true);
      documentObject.addEventListener("change", handleClassicalCausativeParticipantControlChange, true);
      documentObject.addEventListener("click", handleClassicalCausativeParticipantRevisionClick);
      ClassicalCausativeParticipantControlEventsInitialized = true;
      return true;
    }
    function initClassicalNonactiveFormationControlEvents() {
      if (ClassicalNonactiveFormationControlEventsInitialized) {
        return false;
      }
      const documentObject = targetObject.document;
      if (!documentObject || typeof documentObject.addEventListener !== "function") {
        return false;
      }
      // The Authority shell can arrive after the static control snapshot. The
      // delegated path therefore carries this genuine user choice explicitly
      // into the application request, while the WeakSet prevents a duplicate
      // render when the direct listener is also present.
      documentObject.addEventListener("input", handleClassicalNonactiveFormationControlChange, true);
      ClassicalNonactiveFormationControlEventsInitialized = true;
      return true;
    }
    function isClassicalPanelContractSurfaceRequested() {
      if (typeof targetObject.window === "undefined") {
        return false;
      }
      const search = String(targetObject.window.location.search || "");
      if (!search) {
        return false;
      }
      try {
        return new targetObject.URLSearchParams(search).get("basal") === "panel-contract";
      } catch (error) {
        return search.includes("basal=panel-contract");
      }
    }
    function renderInitialClassicalPanelContractSurface() {
      if (!isClassicalPanelContractSurfaceRequested()) {
        return false;
      }
      if (typeof targetObject.renderClassicalRuleLogicSurfaceBlock !== "function") {
        return false;
      }
      syncClassicalBasalUnitControls(CLASSICAL_BASAL_UNIT.vnc);
      const rendered = targetObject.renderClassicalRuleLogicSurfaceBlock({
        basalUnit: CLASSICAL_BASAL_UNIT.vnc
      });
      if (rendered && typeof targetObject.setLeftPanelStackMode === "function") {
        targetObject.setLeftPanelStackMode("output");
      }
      return rendered;
    }
    function initVerbScreenCalculator() {
      populateClassicalSentenceParticleControl();
      populateClassicalSentenceAdverbialControl();
      populateClassicalParticleCombinationShortcutControl();
      populateClassicalBuiltInParticleControls();
      initClassicalParticleCombinationBuilder();
      initClassicalBuiltInParticleControls();
      applyEntradaUrlSegmentsFromLocation({
        triggerGenerate: false,
        immediateRefresh: false
      });
      if ((targetObject.document?.getElementById?.("classical-rule-logic-particle-combination-shortcut")?.value || "none") !== "none") {
        clearClassicalCombinationInternalInputs();
      }
      renderClassicalParticleCombinationBuilder();
      const {
        ansButton,
        modeButton,
        transitivityButton,
        supportiveIButton,
        acButton,
        ceButton,
        delButton,
        equalsButton
      } = getVerbScreenCalculatorButtons();
      const classicalBasalButtons = targetObject.document.querySelectorAll("button[data-classical-basal-unit]");
      const classicalRuleLogicControls = targetObject.document.querySelectorAll("[data-classical-rule-logic-control]");
      initClassicalCausativeParticipantControlEvents();
      initClassicalNonactiveFormationControlEvents();
      if (!ansButton && !modeButton && !transitivityButton && !supportiveIButton && !acButton && !ceButton && !delButton && !equalsButton && !classicalBasalButtons.length && !classicalRuleLogicControls.length) {
        return;
      }
      ansButton?.addEventListener("click", () => runScreenCalculatorANS());
      modeButton?.addEventListener("click", () => runScreenCalculatorModeToggle());
      transitivityButton?.addEventListener("click", () => runScreenCalculatorCycleTransitivity());
      supportiveIButton?.addEventListener("click", () => runScreenCalculatorToggleSupportiveI());
      acButton?.addEventListener("click", () => runScreenCalculatorAC());
      ceButton?.addEventListener("click", () => runScreenCalculatorCE());
      delButton?.addEventListener("click", () => runScreenCalculatorDEL());
      equalsButton?.addEventListener("click", () => runScreenCalculatorCopy());
      initClassicalBasalUnitControls();
      classicalRuleLogicControls.forEach(control => {
        if (isClassicalNonactiveFormationControl(control)) {
          control.addEventListener("input", handleClassicalNonactiveFormationControlChange);
          return;
        }
        if (isClassicalCausativeParticipantControl(control)) {
          // Keep the delegated listener for controls installed after this static
          // snapshot, but let already-present selects commit at the first native
          // selection event before another listener can replace the control.
          bindClassicalCausativeParticipantControlEvents(control);
          return;
        }
        control.addEventListener("change", event => {
          if (control.id === "classical-rule-logic-valence" && control.dataset) {
            if (control.dataset.classicalBuiltInDefaultDispatch === "true") {
              delete control.dataset.classicalBuiltInDefaultDispatch;
            } else {
              delete control.dataset.classicalBuiltInSourceDefault;
            }
          }
          const shortcutControl = targetObject.document?.getElementById?.("classical-rule-logic-particle-combination-shortcut");
          const subjectFamily = control.id.includes("-vnc-subject-")
            ? "vnc"
            : control.id.includes("-nnc-subject-")
              ? "nnc"
              : "";
          if (subjectFamily) {
            const subjectControlPrefix = `classical-rule-logic-${subjectFamily}-subject`;
            const personControl = targetObject.document?.getElementById?.(`${subjectControlPrefix}-person`);
            const animacyControl = targetObject.document?.getElementById?.(`${subjectControlPrefix}-animacy`);
            const humannessControl = targetObject.document?.getElementById?.(`${subjectControlPrefix}-humanness`);
            const numberControl = targetObject.document?.getElementById?.(`${subjectControlPrefix}-number`);
            const agreementControl = targetObject.document?.getElementById?.("classical-rule-logic-subject");
            if (control.id === `${subjectControlPrefix}-humanness` && humannessControl?.value === "human") {
              if (animacyControl) animacyControl.value = "animate";
            }
            if (control.id === `${subjectControlPrefix}-humanness` && humannessControl?.value === "nonhuman") {
              if (personControl) personControl.value = "3";
            }
            if (personControl?.value !== "3") {
              if (animacyControl) animacyControl.value = "animate";
              if (humannessControl) humannessControl.value = "human";
            }
            const nonanimate = animacyControl?.value === "nonanimate";
            if (nonanimate) {
              if (personControl) personControl.value = "3";
              if (humannessControl) humannessControl.value = "nonhuman";
              if (numberControl) numberControl.value = "common";
            } else if (numberControl?.value === "common") {
              numberControl.value = "singular";
            }
            if (agreementControl) {
              agreementControl.value = nonanimate
                ? subjectFamily === "nnc" ? "3common" : "3sg"
                : `${personControl?.value || "3"}${numberControl?.value === "plural" ? "pl" : "sg"}`;
            }
          }
          if (control.id === "classical-rule-logic-particle-combination-shortcut") {
            applyClassicalParticleCombinationShortcut(control.value);
          } else if (shortcutControl && [
            "classical-rule-logic-sentence-particle",
            "classical-rule-logic-sentence-adverbial",
            "classical-rule-logic-polarity"
          ].includes(control.id)) {
            shortcutControl.value = "none";
            if (control.id !== "classical-rule-logic-polarity") {
              ClassicalParticleCombinationDraftSegments = [];
            }
          }
          if (control.id === "classical-rule-logic-polarity"
            && ClassicalParticleCombinationDraftSegments.length) {
            resolveClassicalParticleMatrix();
          }
          if ([
            "classical-construction-operation",
            "classical-rule-logic-late-operation",
          ].includes(control.id)) {
            targetObject.reconcileClassicalCompositionOperationControls?.(
              control.id
            );
          }
          if (control.id === "classical-construction-operation") {
            delete control.dataset.classicalSourcePartsDerivedOperation;
            syncClassicalConstructionSourceUnitAvailability(
              getClassicalBasalUnitFromRuntime()
            );
          }
          if ([
            "classical-rule-logic-class",
            "classical-rule-logic-valence",
            "classical-rule-logic-subject",
            "classical-rule-logic-vnc-subject-person",
            "classical-rule-logic-vnc-subject-animacy",
            "classical-rule-logic-vnc-subject-humanness",
            "classical-rule-logic-vnc-subject-number",
            "classical-rule-logic-object"
          ].includes(control.id)) {
            targetObject
              .clearClassicalGrammarResultSourceContinuation?.(
                "typed-source-control-changed"
              );
          }
          if (control.id === "classical-rule-logic-valence") {
            syncClassicalVncSourceGuide();
          }
          refreshClassicalRuleLogicSurfaceFromControl(control);
          renderClassicalParticleCombinationBuilder();
          if (control.closest?.("[data-classical-source-identity-controls]")) {
            syncClassicalSourceReadout(getClassicalBasalUnitFromRuntime());
          }
        });
        control.addEventListener("input", () => {
          if (control.tagName === "SELECT") {
            return;
          }
          refreshClassicalRuleLogicSurfaceFromControl(control);
          if (control.closest?.("[data-classical-source-identity-controls]")) {
            syncClassicalSourceReadout(getClassicalBasalUnitFromRuntime());
          }
        });
      });
      targetObject.document.addEventListener("change", event => {
        const control = event?.target?.closest?.(
          ".classical-construction-source-controls [data-classical-rule-logic-control]"
        );
        if (!control || typeof targetObject.window?.setTimeout !== "function") {
          return;
        }
        targetObject.window.setTimeout(() => {
          refreshClassicalRuleLogicSurfaceFromControl(control);
        }, 0);
      }, true);
      targetObject.document.querySelectorAll("[data-classical-segment-control]").forEach(option => {
        if (CLASSICAL_CAUSATIVE_PARTICIPANT_CONTROL_REQUEST_KEYS[String(option.dataset?.classicalSegmentControl || "")]) {
          return;
        }
        option.addEventListener("click", () => {
          if (option.disabled) {
            return;
          }
          const control = targetObject.document.getElementById(option.dataset.classicalSegmentControl || "");
          const value = String(option.dataset.classicalSegmentValue || "");
          const intentionalReset = option.dataset.classicalSegmentReset === "true";
          if (!control || !value && !intentionalReset || control.value === value) {
            return;
          }
          control.value = value;
          control.dispatchEvent(new targetObject.Event("change", {
            bubbles: true
          }));
        });
      });
      renderInitialClassicalPanelContractSurface();
      syncVerbScreenCalculatorState();
    }
    function initCalcInputModeButtons() {
      updateCalcInputModeButtons();
    }
    function handleComposerDoubleEscapeShortcut(event) {
      if (event?.key !== "Escape" || event?.repeat) {
        return false;
      }
      if (!isVerbInputModeComposer()) {
        LastComposerEscapeTs = 0;
        return false;
      }
      const now = Date.now();
      const withinWindow = LastComposerEscapeTs > 0 && now - LastComposerEscapeTs <= COMPOSER_ESC_DOUBLE_CLEAR_WINDOW_MS;
      LastComposerEscapeTs = now;
      if (!withinWindow) {
        return false;
      }
      LastComposerEscapeTs = 0;
      clearVerbComposerTextboxInputs();
      return true;
    }
    function handleComposerDoubleSpaceShortcut(event) {
      if (event?.key !== " " || event?.repeat) {
        return false;
      }
      const now = Date.now();
      const withinWindow = LastComposerSpaceTs > 0 && now - LastComposerSpaceTs <= COMPOSER_SPACE_DOUBLE_READY_WINDOW_MS;
      LastComposerSpaceTs = now;
      if (!withinWindow) {
        return false;
      }
      LastComposerSpaceTs = 0;
      if (!isVerbInputModeComposer()) {
        setVerbInputMode(VERB_INPUT_MODE.composer, {
          syncFromInput: true
        });
      }
      focusComposerSlotEntryTarget(getComposerPreferredEntryInput(), {
        selectAll: false
      });
      syncVerbScreenCalculatorState();
      return true;
    }
    function syncVerbComposerFieldGroupRoles() {
      const fields = Array.from(targetObject.document.querySelectorAll(".verb-composer__field"));
      if (!fields.length) {
        return;
      }
      fields.forEach((field, index) => {
        field.setAttribute("role", "group");
        const existingLabel = String(field.getAttribute("aria-label") || "").trim();
        if (existingLabel) {
          return;
        }
        const inlineLabel = String(field.querySelector(".verb-composer__sub-label")?.textContent || "").trim();
        if (inlineLabel) {
          field.setAttribute("aria-label", `Grupo ${inlineLabel}`);
          return;
        }
        field.setAttribute("aria-label", `Grupo ${index + 1}`);
      });
    }
    function initVerbComposer() {
      const {
        slots,
        entryBoardButtons,
        matrixStemAffixSelectBySlot,
        matrixStemAffixPickerBySlot,
        matrixStemAffixTriggerBySlot,
        transitivitySelect,
        transitivitySlotButtons,
        valenceSelectIntransitive,
        valenceSelect,
        valenceSelectSecondary,
        directionalSelect,
        clearTextboxesButton,
        supportiveICheckbox
      } = getVerbComposerElements();
      const slotNavigationPairs = COMPOSER_SLOT_KEYS.map(slotKey => ({
        embedInput: slots[slotKey]?.embedInput || null,
        matrixInput: slots[slotKey]?.stemInput || null,
        objectInput: slots[slotKey]?.objectInput || null
      }));
      const slotStemInputs = COMPOSER_SLOT_KEYS.map(slotKey => ({
        slotKey,
        stemInput: slots[slotKey]?.stemInput || null
      })).filter(entry => Boolean(entry.stemInput));
      const slotOtherControls = COMPOSER_SLOT_KEYS.flatMap(slotKey => [slots[slotKey]?.objectInput || null, slots[slotKey]?.embedInput || null]).filter(Boolean);
      populateComposerDirectionalOptions();
      syncVerbComposerFieldGroupRoles();
      bindComposerStemTabNavigation(slotNavigationPairs);
      Array.from(entryBoardButtons || []).forEach(button => {
        button.addEventListener("click", () => {
          const board = button.getAttribute("data-composer-entry-board") || "";
          if (!isVerbInputModeComposer()) {
            setVerbInputMode(VERB_INPUT_MODE.composer, {
              syncFromInput: true
            });
          }
          setComposerEntryBoard(board, {
            force: true
          });
          focusComposerSlotEntryTarget(getComposerPreferredEntryInput(), {
            selectAll: true
          });
          syncVerbScreenCalculatorState();
        });
      });
      slotStemInputs.forEach(({
        slotKey,
        stemInput
      }) => {
        stemInput.addEventListener("keydown", event => {
          prepareComposerTemplateMaskOverwrite(event, stemInput, slotKey);
          enforceComposerLockedSuffixDeletion(event, stemInput, slotKey);
        });
        stemInput.addEventListener("input", event => {
          if (shouldHandleComposerMatrixComboboxSelection(event, stemInput) && handleComposerMatrixComboboxSelection(slotKey, stemInput)) {
            return;
          }
          applyComposerSerialFormattingToStemInput(stemInput, {
            preserveCaret: true,
            slotKey
          });
          onVerbComposerControlChange("matrix-stem");
        });
        stemInput.addEventListener("change", event => {
          if (shouldHandleComposerMatrixComboboxSelection(event, stemInput) && handleComposerMatrixComboboxSelection(slotKey, stemInput)) {
            return;
          }
          applyComposerSerialFormattingToStemInput(stemInput, {
            preserveCaret: false,
            slotKey
          });
          onVerbComposerControlChange("matrix-stem");
        });
      });
      COMPOSER_SLOT_KEYS.forEach(slotKey => {
        const optionList = matrixStemAffixSelectBySlot?.[slotKey] || null;
        const stemInput = slots[slotKey]?.stemInput || null;
        if (!optionList || !stemInput) {
          return;
        }
        if (String(optionList.tagName || "").toUpperCase() !== "SELECT") {
          return;
        }
        optionList.addEventListener("change", () => {
          handleComposerMatrixAffixDropdownSelection(slotKey, optionList, stemInput);
        });
      });
      COMPOSER_SLOT_KEYS.forEach(slotKey => {
        const picker = matrixStemAffixPickerBySlot?.[slotKey] || null;
        const trigger = matrixStemAffixTriggerBySlot?.[slotKey] || null;
        if (!picker || !trigger) {
          return;
        }
        trigger.addEventListener("pointerdown", event => {
          event.preventDefault();
          const shouldOpen = ComposerMatrixAffixOpenSlot !== slotKey;
          setComposerMatrixAffixPopoverOpen(slotKey, shouldOpen);
        });
      });
      targetObject.document.addEventListener("pointerdown", event => {
        if (!ComposerMatrixAffixOpenSlot) {
          return;
        }
        const openSlot = ComposerMatrixAffixOpenSlot;
        const picker = matrixStemAffixPickerBySlot?.[openSlot] || null;
        if (picker && picker.contains(event.target)) {
          return;
        }
        setComposerMatrixAffixPopoverOpen(openSlot, false);
      });
      COMPOSER_SLOT_KEYS.forEach(slotKey => {
        const slotRefs = slots[slotKey] || {};
        const toggleButton = slotRefs.prefixToggleButton;
        if (!toggleButton) {
          return;
        }
        toggleButton.addEventListener("mouseenter", () => setComposerEmbedPreviewState(slotKey, true));
        toggleButton.addEventListener("mouseleave", () => setComposerEmbedPreviewState(slotKey, false));
        toggleButton.addEventListener("focus", () => setComposerEmbedPreviewState(slotKey, true));
        toggleButton.addEventListener("blur", () => setComposerEmbedPreviewState(slotKey, false));
        toggleButton.addEventListener("click", () => {
          toggleComposerEmbedOpen(slotKey);
        });
      });
      if (transitivitySlotButtons?.length) {
        transitivitySlotButtons.forEach(button => {
          button.addEventListener("click", () => {
            const token = button.getAttribute("data-composer-transitivity") || "";
            if (!Object.values(COMPOSER_TRANSITIVITY).includes(token)) {
              return;
            }
            const previousToken = COMPOSER_TRANSITIVITY_ORDER.includes(transitivitySelect?.value) ? transitivitySelect.value : VerbComposerState.transitivity;
            transposeComposerSlotTextboxes(previousToken, token);
            carryComposerEmbedVisibilityAcrossTransitivity(previousToken, token);
            if (transitivitySelect) {
              transitivitySelect.value = token;
            }
            onVerbComposerControlChange("other");
          });
        });
      }
      const controls = [transitivitySelect, valenceSelectIntransitive, valenceSelect, valenceSelectSecondary, directionalSelect, ...slotOtherControls].filter(Boolean);
      controls.forEach(control => {
        control.addEventListener("input", () => onVerbComposerControlChange("other"));
        control.addEventListener("change", () => onVerbComposerControlChange("other"));
      });
      if (clearTextboxesButton) {
        clearTextboxesButton.addEventListener("click", () => {
          clearVerbComposerTextboxInputs();
        });
      }
      if (supportiveICheckbox) {
        supportiveICheckbox.addEventListener("change", () => onVerbComposerControlChange("supportive"));
      }
      const verbEl = targetObject.document.getElementById("verb");
      if (verbEl && verbEl.dataset.composerSlotRouterBound !== "1") {
        verbEl.addEventListener("beforeinput", handleComposerVerbSlotBeforeInput);
        verbEl.addEventListener("input", handleComposerVerbSlotInput);
        verbEl.addEventListener("pointerdown", () => {
          clearComposerSlotEntryTarget();
        });
        verbEl.dataset.composerSlotRouterBound = "1";
      }
      if (typeof targetObject.window !== "undefined" && typeof targetObject.window.addEventListener === "function") {
        targetObject.window.addEventListener("resize", () => {
          syncComposerSupportiveITogglePlacement();
          syncComposerSlotPanelVisibility();
          if (ComposerMatrixAffixOpenSlot) {
            setComposerMatrixAffixPopoverOpen(ComposerMatrixAffixOpenSlot, false);
          }
        }, {
          passive: true
        });
        targetObject.window.addEventListener("scroll", () => {
          if (ComposerMatrixAffixOpenSlot) {
            setComposerMatrixAffixPopoverOpen(ComposerMatrixAffixOpenSlot, false);
          }
        }, {
          passive: true
        });
      }
      syncComposerStateFromVerbInput(verbEl?.value || "");
      if (!getComposerActiveStemValue()) {
        VerbComposerState.syllableMode = COMPOSER_SYLLABLE_MODE.multisyllable;
      }
      syncComposerChipGroupsFromState();
      setVerbInputMode(VERB_INPUT_MODE.composer, {
        syncFromInput: false
      });
      renderVerbComposerFromState();
    }

    // === Verb Input & Lexicon ===
    // === Verb Input & Lexicon ===
    function getVerbMirror() {
      return null;
    }
    function getVerbMirrorContent() {
      return null;
    }
    function focusVerbMirrorAtEnd() {
      return false;
    }
    function focusVisibleVerbSurfaceAtEnd() {
      const verbInput = targetObject.document.getElementById("verb");
      if (!isFocusableTextInput(verbInput, {
        allowReadOnly: true
      }) || typeof verbInput.focus !== "function") {
        return false;
      }
      verbInput.focus();
      if (applyVerbInputWritableSelection(verbInput, {
        force: true
      })) {
        return true;
      }
      return focusTextInputAtEnd(verbInput);
    }
    function loadVerbLexiconData() {
      targetObject.VerbDisambiguationBaseInfo = new Map();
      targetObject.BASIC_DATA_CANONICAL_MAP = new Map();
      targetObject.resetDerivationalLookupCaches();
      return Promise.resolve();
    }
    function parseCSVRow(line) {
      const cells = [];
      let current = "";
      let inQuotes = false;
      for (let i = 0; i < line.length; i += 1) {
        const char = line[i];
        if (char === "\"") {
          if (inQuotes && line[i + 1] === "\"") {
            current += "\"";
            i += 1;
          } else {
            inQuotes = !inQuotes;
          }
        } else if (char === "," && !inQuotes) {
          cells.push(current);
          current = "";
        } else {
          current += char;
        }
      }
      cells.push(current);
      return cells;
    }
    function parseCSVRows(text) {
      return String(text || "").split(/\r?\n/).map(line => line.trimEnd()).filter(line => line !== "").map(line => parseCSVRow(line));
    }
    function parseVerbEntryToken(token) {
      const raw = String(token || "").trim();
      if (!raw) {
        return {
          base: "",
          transitive: false,
          intransitive: false
        };
      }
      let base = raw;
      let transitive = false;
      let intransitive = false;
      if (raw.startsWith("(-)")) {
        base = raw.slice(3);
        transitive = true;
        intransitive = true;
      } else if (raw.startsWith("-")) {
        base = raw.slice(1);
        transitive = true;
      } else {
        intransitive = true;
      }
      base = base.trim();
      return {
        base,
        transitive,
        intransitive
      };
    }
    function parseVerbLexiconCSV(text) {
      const entriesByBase = new Map();
      parseCSVRows(text).forEach((row, index) => {
        const firstCell = row[0] ? String(row[0]).trim() : "";
        if (!firstCell) {
          return;
        }
        if (index === 0 && firstCell.toLowerCase() === "lx") {
          return;
        }
        const entry = parseVerbEntryToken(firstCell);
        const base = entry.base;
        const transitive = entry.transitive;
        const intransitive = entry.intransitive;
        if (!base) {
          return;
        }
        const key = base.toLowerCase();
        const existing = entriesByBase.get(key) || {
          base,
          transitive: false,
          intransitive: false
        };
        existing.transitive = existing.transitive || transitive;
        existing.intransitive = existing.intransitive || intransitive;
        entriesByBase.set(key, existing);
      });
      return Array.from(entriesByBase.values());
    }
    function stripOptionalSupportiveI(value) {
      return targetObject.stripOptionalSupportiveMarkers(value || "");
    }
    function hasCompoundMarkers(value) {
      const markerRe = targetObject.COMPOUND_MARKER_RE || /[|~#()\[\]\\/?-]/g;
      if (!markerRe) {
        return false;
      }
      markerRe.lastIndex = 0;
      return markerRe.test(String(value || ""));
    }
    function isSupportiveIClusterBase(base) {
      if (!base || hasCompoundMarkers(base)) {
        return false;
      }
      const letters = targetObject.splitVerbLetters(base);
      if (letters.length < 3 || letters[0] !== "i" && letters[0] !== "y") {
        return false;
      }
      return targetObject.isVerbLetterConsonant(letters[1]) && targetObject.isVerbLetterConsonant(letters[2]);
    }
    function formatSupportiveIBaseDisplay(base) {
      if (!isSupportiveIClusterBase(base)) {
        return base;
      }
      const letters = targetObject.splitVerbLetters(base);
      const core = letters.slice(1).join("");
      if (!core) {
        return base;
      }
      return `${targetObject.getRegexOptionalSupportiveMarkerForLetter(letters[0])}${core}`;
    }
    function buildVerbBaseInfo(entries) {
      const map = new Map();
      if (!Array.isArray(entries)) {
        return map;
      }
      const hasNonHyphenMarker = base => /[|~#()\[\]\\/?]/.test(base);
      const addEntry = (key, entry, displayBase) => {
        if (!key) {
          return;
        }
        const existing = map.get(key) || {
          transitive: false,
          intransitive: false,
          displayBase: displayBase || entry.base
        };
        existing.transitive = existing.transitive || entry.transitive;
        existing.intransitive = existing.intransitive || entry.intransitive;
        if (!existing.displayBase) {
          existing.displayBase = displayBase || entry.base;
        }
        map.set(key, existing);
      };
      entries.forEach(entry => {
        if (!entry || !entry.base) {
          return;
        }
        const base = entry.base;
        const displayBase = formatSupportiveIBaseDisplay(base);
        const baseKey = base.toLowerCase();
        addEntry(baseKey, entry, displayBase);
        if (base.includes("-") && !hasNonHyphenMarker(base)) {
          const normalizedKey = base.replace(/-/g, "").toLowerCase();
          if (normalizedKey && normalizedKey !== baseKey) {
            addEntry(normalizedKey, entry, displayBase);
          }
        }
      });
      return map;
    }
    function buildCanonicalVerbMapFromCSV(text) {
      const map = new Map();
      if (typeof targetObject.parseVerbInput !== "function") {
        return map;
      }
      parseCSVRows(text).forEach((row, index) => {
        const firstCell = row[0] ? String(row[0]).trim() : "";
        if (!firstCell) {
          return;
        }
        if (index === 0 && firstCell.toLowerCase() === "lx") {
          return;
        }
        const entry = parseVerbEntryToken(firstCell);
        const base = entry.base;
        if (!base) {
          return;
        }
        const addVariant = isTransitive => {
          const raw = isTransitive ? `-${base}` : base;
          let parsed = null;
          try {
            parsed = targetObject.parseVerbInput(raw);
          } catch (error) {
            parsed = null;
          }
          if (!parsed) {
            return;
          }
          const key = String(parsed.canonical && parsed.canonical.verb || parsed.verb || base).toLowerCase();
          if (!key) {
            return;
          }
          const existing = map.get(key) || {
            base,
            transitive: false,
            intransitive: false,
            transitiveParsed: null,
            intransitiveParsed: null
          };
          if (isTransitive) {
            existing.transitive = true;
            existing.transitiveParsed = existing.transitiveParsed || parsed;
          } else {
            existing.intransitive = true;
            existing.intransitiveParsed = existing.intransitiveParsed || parsed;
          }
          map.set(key, existing);
        };
        if (entry.intransitive) {
          addVariant(false);
        }
        if (entry.transitive) {
          addVariant(true);
        }
      });
      return map;
    }
    function syncInputPopupOverlayActiveState() {
      const inputsPane = targetObject.document.getElementById("panel-stack-pane-inputs");
      const inputsContainer = targetObject.document.getElementById("container-inputs");
      const verbBlock = targetObject.document.getElementById("verb-block");
      const verbScreen = verbBlock?.querySelector(".verb-block__screen") || null;
      const legendPanel = targetObject.document.getElementById("keyboard-legend");
      const popupActive = Boolean(ComposerMatrixAffixOpenSlot) || Boolean(legendPanel && !legendPanel.hidden && legendPanel.classList.contains("is-open"));
      [inputsPane, inputsContainer, verbBlock, verbScreen].forEach(element => {
        if (!element) {
          return;
        }
        element.classList.toggle("is-popup-overlay-active", popupActive);
      });
    }
    function cancelScheduledVerbInputRefresh() {
      if (!targetObject.VerbInputRefreshTimer) {
        return;
      }
      targetObject.clearTimeout(targetObject.VerbInputRefreshTimer);
      targetObject.VerbInputRefreshTimer = null;
    }
    function cancelDeferredToggleAvailabilityPass() {
      if (!targetObject.ToggleAvailabilityIdleTimer) {
        return;
      }
      targetObject.clearTimeout(targetObject.ToggleAvailabilityIdleTimer);
      targetObject.ToggleAvailabilityIdleTimer = null;
    }
    function runDeferredToggleAvailabilityPass() {
      targetObject.ToggleAvailabilityIdleTimer = null;
      if (targetObject.VerbInputRefreshTimer) {
        return;
      }
      const verbMeta = getVerbInputMeta();
      const previousContext = targetObject.VerbRenderContext;
      targetObject.VerbRenderContext = "deferred-availability";
      try {
        targetObject.renderTenseTabs();
        // Keep causative subtype button availability in sync after the user
        // finishes typing (idle pass mirrors the immediate refresh above).
        if (typeof targetObject.updateDerivationTypeControl === "function") {
          targetObject.updateDerivationTypeControl();
        }
        targetObject.renderActiveConjugations({
          verb: verbMeta.displayVerb,
          objectPrefix: targetObject.getCurrentObjectPrefix()
        });
      } finally {
        targetObject.VerbRenderContext = previousContext;
      }
    }
    function scheduleDeferredToggleAvailabilityPass() {
      if (targetObject.VerbRenderContext !== "typing") {
        return;
      }
      cancelDeferredToggleAvailabilityPass();
      targetObject.ToggleAvailabilityIdleTimer = targetObject.setTimeout(runDeferredToggleAvailabilityPass, targetObject.TOGGLE_AVAILABILITY_IDLE_MS);
    }
    function runVerbInputRefresh() {
      targetObject.VerbInputRefreshTimer = null;
      const verbInput = targetObject.document.getElementById("verb");
      const value = verbInput ? verbInput.value : targetObject.VerbInputRefreshPendingValue;
      const refreshSource = targetObject.VerbInputRefreshPendingSource || "typing";
      targetObject.VerbInputRefreshPendingSource = "typing";
      const previousContext = targetObject.VerbRenderContext;
      targetObject.VerbRenderContext = refreshSource;
      try {
        if (typeof targetObject.commitVerbInputEditingState === "function") {
          targetObject.commitVerbInputEditingState(verbInput, {
            syncUrl: refreshSource !== "classical-source-parts"
          });
        }
        if (refreshSource !== "typing") {
          cancelDeferredToggleAvailabilityPass();
        }
        targetObject.renderTenseTabs();
        // Re-probe causative subtype availability whenever the verb changes so
        // that Tipo 1 / Tipo 2 buttons reflect the new verb's options and any
        // now-invalid active subtype is auto-reset to "Ambos".
        if (typeof targetObject.updateDerivationTypeControl === "function") {
          targetObject.updateDerivationTypeControl();
        }
        targetObject.generateNuclearClauseSurface();
        const verbMeta = getVerbInputMeta();
        targetObject.renderActiveConjugations({
          verb: verbMeta.displayVerb,
          objectPrefix: targetObject.getCurrentObjectPrefix()
        });
        targetObject.maybeAutoScrollToConjugationRow(value);
      } finally {
        targetObject.VerbRenderContext = previousContext;
      }
    }
    function scheduleVerbInputRefresh(rawValue = "", options = {}) {
      const immediate = options.immediate === true;
      const source = typeof options.source === "string" && options.source ? options.source : immediate ? "immediate" : "typing";
      targetObject.VerbInputRefreshPendingValue = String(rawValue || "");
      targetObject.VerbInputRefreshPendingSource = source;
      cancelDeferredToggleAvailabilityPass();
      cancelScheduledVerbInputRefresh();
      if (immediate) {
        runVerbInputRefresh();
        return;
      }
      targetObject.VerbInputRefreshTimer = targetObject.setTimeout(runVerbInputRefresh, targetObject.VERB_INPUT_REFRESH_DEBOUNCE_MS);
    }
    function resolveSilentGenerationTiCausativeClass(options = {}) {
      const override = options && typeof options.override === "object" && options.override ? options.override : {};
      const explicitClass = targetObject.normalizeTiCausativeClass(options.tiCausativeClass || override.tiCausativeClass || options.parsedVerb?.tiCausativeClass || override.parsedVerb?.tiCausativeClass || "");
      if (explicitClass) {
        return explicitClass;
      }
      const overrideFormula = options?.posicionesFormula && typeof options.posicionesFormula === "object" ? options.posicionesFormula : override?.posicionesFormula && typeof override.posicionesFormula === "object" ? override.posicionesFormula : {};
      const overrideVerb = String(overrideFormula.tronco || override.tronco || "");
      const overrideVerbMetadata = targetObject.getRawInputTiCausativeMetadata(overrideVerb);
      const inlineOverrideClass = targetObject.normalizeTiCausativeClass(overrideVerbMetadata.tiCausativeClass || "");
      if (inlineOverrideClass) {
        return inlineOverrideClass;
      }
      const normalizedOverrideRuleBase = targetObject.normalizeRuleBase(String(overrideVerbMetadata.normalizedBase || overrideVerb || "").toLowerCase());
      if (!normalizedOverrideRuleBase.endsWith("ti")) {
        return "";
      }
      const verbInput = typeof targetObject.document !== "undefined" ? targetObject.document.getElementById("verb") : null;
      const activeInputClass = targetObject.normalizeTiCausativeClass(targetObject.getRawInputTiCausativeMetadata(verbInput?.value || "").tiCausativeClass);
      if (activeInputClass) {
        return activeInputClass;
      }
      return targetObject.normalizeTiCausativeClass(getComposerActiveTiCausativeClass());
    }
    function buildSilentGenerationCacheKey(options = {}) {
      const override = options && typeof options.override === "object" && options.override ? options.override : {};
      const tiCausativeClass = resolveSilentGenerationTiCausativeClass(options);
      const overrideFormula = options?.posicionesFormula && typeof options.posicionesFormula === "object" ? options.posicionesFormula : override?.posicionesFormula && typeof override.posicionesFormula === "object" ? override.posicionesFormula : {};
      const encodeValue = value => {
        const raw = String(value || "");
        return `${raw.length}:${raw}`;
      };
      const encodeFlag = value => value === true ? "1" : "0";
      const keyParts = [
        encodeFlag(options.allowPassiveObject === true),
        encodeFlag(options.skipValidation === true),
        encodeValue(overrideFormula.pers1 || override.pers1),
        encodeValue(overrideFormula.pers2 || overrideFormula.num2 || override.pers2 || override.num2),
        encodeValue(overrideFormula.obj1 || override.obj1),
        encodeValue(overrideFormula.obj2 || override.obj2),
        encodeValue(overrideFormula.obj3 || override.obj3),
        encodeValue(overrideFormula.tronco || override.tronco),
        encodeValue(overrideFormula.tiempo || override.tiempo),
        encodeValue(overrideFormula.poseedor || override.poseedor),
        encodeValue(override.patientivoOwnership),
        encodeValue(override.patientivoSource),
        encodeValue(override.predicateNominalSourceTense),
        encodeValue(targetObject.getPatientivoNominalSuffixCacheToken(override.patientivoNominalSuffix)),
        encodeValue(override.tenseMode),
        encodeValue(override.derivationMode),
        encodeValue(override.derivationType),
        encodeValue(override.voiceMode),
        encodeFlag(override.preservePassiveSubject === true),
        encodeFlag(override.allowPassiveObject === true),
        encodeValue(tiCausativeClass),
        encodeValue(targetObject.getActiveTenseMode()),
        encodeValue(targetObject.getActiveDerivationMode()),
        encodeValue(targetObject.getActiveDerivationType()),
        encodeValue(targetObject.getActiveVoiceMode()),
        encodeValue(targetObject.getCombinedMode()),
        encodeValue(targetObject.buildConjugationSelectionStateCacheToken()),
        encodeValue(targetObject.getSelectedNonactiveSuffix()),
        encodeValue(targetObject.getActiveCausativeSubtype())
      ];
      return keyParts.join("|");
    }
    function getCachedSilentNuclearClauseSurface(options = {}) {
      if (!options || options.silent !== true) {
        return targetObject.generateNuclearClauseSurface(options);
      }
      const cacheKey = buildSilentGenerationCacheKey(options);
      if (targetObject.SilentGenerationCache.has(cacheKey)) {
        return targetObject.SilentGenerationCache.get(cacheKey);
      }
      const result = targetObject.generateNuclearClauseSurface(options);
      targetObject.SilentGenerationCache.set(cacheKey, result);
      if (targetObject.SilentGenerationCache.size > targetObject.SILENT_GENERATION_CACHE_LIMIT) {
        const firstKey = targetObject.SilentGenerationCache.keys().next().value;
        if (firstKey !== undefined) {
          targetObject.SilentGenerationCache.delete(firstKey);
        }
      }
      return result;
    }
    function applyVerbInputReplacement(value) {
      const verbInput = targetObject.document.getElementById("verb");
      if (!verbInput) {
        return;
      }
      targetObject.mutateConjugationSelectionState({
        classFilter: null
      });
      const nextValue = targetObject.serializeRegexInputValue(value);
      verbInput.value = nextValue;
      targetObject.VerbInputState.lastNonSearchValue = nextValue;
      verbInput.dataset.lastClassVerb = targetObject.parseVerbInput(nextValue).verb;
      if (typeof targetObject.renderVerbMirror === "function") {
        targetObject.renderVerbMirror();
      }
      scheduleVerbInputRefresh(nextValue, {
        immediate: true,
        source: "immediate"
      });
      focusVisibleVerbSurfaceAtEnd();
    }
    var VERB_INPUT_MODE = {
      composer: "composer",
      regex: "regex"
    };
    var COMPOSER_TRANSITIVITY = GENERATION_SOURCE_TRANSITIVITY;
    var COMPOSER_ENTRY_BOARD = {
      general: "general"
    };
    var COMPOSER_SYLLABLE_MODE = {
      monosyllable: "monosyllable",
      multisyllable: "multisyllable"
    };
    var COMPOSER_VALENCE_OPTIONS = ["", "tla", "tē", "mo"];
    var COMPOSER_SECONDARY_VALENCE_OPTIONS = ["", "tē-2", "tla-2", "mo-2", "tē+tē", "tla+tla", "tē+tla", "mo+tla", "mo+tē",
    // Accepted canonical Classical source values.
    "tla", "tē", "mo"];
    var COMPOSER_SECONDARY_VALENCE_INVENTORY_LIMIT = 2;
    var COMPOSER_SECONDARY_VALENCE_INVENTORY_CAPACITY = Object.freeze({
      tē: 2,
      tla: 2,
      mo: 1
    });
    var COMPOSER_SECONDARY_VALENCE_FAMILY_ORDER = Object.freeze(["tla", "tē", "mo"]);
    var COMPOSER_SECONDARY_VALENCE_FAMILY_BY_TOKEN = Object.freeze({
      tla: "tla",
      tlahtla: "tla",
      tē: "tē",
      tēhtē: "tē",
      mo: "mo",
      mohmo: "mo"
    });
    var DEFAULT_COMPOSER_SECONDARY_VALENCE_INVENTORY = Object.freeze(["tla", "tlahtla", "tē", "tēhtē", "mo", "mohmo"]);
    var DEFAULT_COMPOSER_DIRECTIONAL_PREFIXES = Object.freeze(["huāl", "on"]);
    var COMPOSER_ROOT_EMBED_INPUT_IDS = new Set(["composer-embed", "composer-valence-embed-1", "composer-valence-embed-2"]);
    var ComposerVerbSlotEntryTarget = null;
    var ComposerVerbSlotEntryLastVerbValue = "";
    var ComposerVerbSlotEntryInputSyncing = false;
    var AUTOFILL_ALIAS_SALT = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
    var COMPOSER_ESC_DOUBLE_CLEAR_WINDOW_MS = 450;
    var COMPOSER_SPACE_DOUBLE_READY_WINDOW_MS = 450;
    var COMPOSER_TRANSITIVITY_ORDER = GENERATION_SOURCE_TRANSITIVITY_ORDER;
    var ALT_SHORTCUT_DEFINITIONS = Object.freeze([{
      id: "mode-verb",
      key: "v",
      label: "⌥/Alt + V",
      selector: "[data-tense-mode=\"verbo\"]",
      legendDescription: "verbo",
      fallbackDescription: "verbo"
    }, {
      id: "mode-noun",
      key: "s",
      label: "⌥/Alt + S",
      selector: "[data-tense-mode=\"sustantivo\"]",
      legendDescription: "sustantivo",
      fallbackDescription: "sustantivo"
    }, {
      id: "voice-active",
      key: "a",
      label: "⌥/Alt + A",
      action: "set-combined-mode-active",
      fallbackDescription: "voz activa",
      requireVerbMode: true
    }, {
      id: "voice-nonactive",
      key: "n",
      label: "⌥/Alt + N",
      action: "set-combined-mode-nonactive",
      fallbackDescription: "voz no activa",
      requireVerbMode: true
    }, {
      id: "derivation-direct",
      key: "d",
      label: "⌥/Alt + D",
      selector: "[data-derivation-type=\"direct\"]",
      legendDescription: "directo",
      fallbackDescription: "directo"
    }, {
      id: "derivation-causative",
      key: "c",
      label: "⌥/Alt + C",
      selector: "[data-derivation-type=\"causative\"]",
      legendDescription: "causativo",
      fallbackDescription: "causativo"
    }, {
      id: "derivation-applicative",
      key: "p",
      label: "⌥/Alt + P",
      selector: "[data-derivation-type=\"applicative\"]",
      legendDescription: "aplicativo",
      fallbackDescription: "aplicativo"
    }, {
      id: "keyboard-legend",
      key: "k",
      label: "⌥/Alt + K",
      selector: "#keyboard-legend-trigger",
      legendDescription: "mostrar atajos",
      fallbackDescription: "mostrar atajos"
    }]);
    var KEYBOARD_LEGEND_BASE_ENTRIES = Object.freeze([{
      label: "Tab",
      description: "alternar entre verbo y caja activa"
    }, {
      label: "⌥/Alt + ← / →",
      description: "transitividad ±"
    }, {
      label: "Space",
      description: "foco en #verb"
    }, {
      label: "Esc",
      description: "cerrar/cancelar"
    }, {
      label: "Esc x2",
      description: "limpiar cajas del compositor"
    }, {
      label: "Delete / Backspace",
      description: "borrar una unidad"
    }, {
      label: "Shift + Delete / Backspace",
      description: "limpiar una caja de texto"
    }, {
      label: "⌥/Alt + Delete / Backspace",
      description: "reiniciar cajas y selecciones"
    }, {
      label: "Enter",
      description: "activar control enfocado"
    }, {
      label: "Consejo",
      description: "escribe para ver sugerencias o haz clic en un verbo de la lista"
    }]);
    var ESCAPE_OVERLAY_HANDLERS = [];
    var ESCAPE_OVERLAY_HANDLER_SEQUENCE = 0;
    var COMPOSER_MATRIX_ROOT_TOKENS = Object.freeze({
      [COMPOSER_TRANSITIVITY.intransitive]: Object.freeze(["ni", "na", "ti", "ya", "ua"]),
      [COMPOSER_TRANSITIVITY.transitive]: Object.freeze(["nia", "na", "tia", "ia", "ua"]),
      [COMPOSER_TRANSITIVITY.bitransitive]: Object.freeze(["nia", "na", "tia", "ia", "ua"])
    });
    var COMPOSER_MATRIX_ROOT_TOKENS_ALL = Object.freeze(Array.from(new Set(Object.values(COMPOSER_MATRIX_ROOT_TOKENS).flat().map(token => normalizeComposerStem(token)).filter(Boolean))));
    var COMPOSER_MATRIX_ROOT_YA_BASES = new Set(["ti"]);
    var COMPOSER_MATRIX_ROOT_NI_CYCLE_BASES = new Set(["ni", "na", "nia"]);
    var COMPOSER_MATRIX_ROOT_NI_SHORT_VOWELS = Object.freeze(["a", "i"]);
    var COMPOSER_MATRIX_ROOT_NI_FULL_VOWELS = Object.freeze(["a", "e", "i", "u"]);
    var COMPOSER_MATRIX_NH_BLOCKED_STEMS = new Set(["ia", "ua", "nia", "tia"]);
    var COMPOSER_SERIAL_SUFFIX_SLOT_COUNT = Object.freeze({
      ua: 3,
      ti: 2,
      ya: 2
    });
    var COMPOSER_SERIAL_DEFAULT_SLOT_COUNT = 3;
    var COMPOSER_SERIAL_SLOT_PREF_BY_SLOT = {
      a: COMPOSER_SERIAL_DEFAULT_SLOT_COUNT,
      b: COMPOSER_SERIAL_DEFAULT_SLOT_COUNT,
      c: COMPOSER_SERIAL_DEFAULT_SLOT_COUNT
    };
    var COMPOSER_SERIAL_TYPE_OPTIONS = Object.freeze([{
      value: "mono",
      label: "mono",
      slotCount: 1,
      family: "monomorphemic"
    }, {
      value: "ti-have",
      label: "ti: tener",
      slotCount: 2,
      family: "ti"
    }, {
      value: "ti-become",
      label: "ti: ser",
      slotCount: 2,
      family: "ti"
    }, {
      value: "ta",
      label: "ta",
      slotCount: 2,
      family: "ta"
    }, {
      value: "ya",
      label: "ya",
      slotCount: 2,
      family: "ya"
    }, {
      value: "ua",
      label: "ua",
      slotCount: 3,
      family: "ua"
    }]);
    var COMPOSER_SERIAL_SLOT_TYPE_BY_SLOT = {
      a: "auto",
      b: "auto",
      c: "auto"
    };
    function dispatchAppEvent(name = "", detail = {}) {
      if (!name || typeof targetObject.document === "undefined" || typeof targetObject.document.dispatchEvent !== "function") {
        return;
      }
      const payload = detail && typeof detail === "object" ? detail : {};
      if (typeof targetObject.CustomEvent === "function") {
        targetObject.document.dispatchEvent(new targetObject.CustomEvent(name, {
          detail: payload
        }));
        return;
      }
      if (typeof targetObject.document.createEvent === "function") {
        const fallbackEvent = targetObject.document.createEvent("CustomEvent");
        fallbackEvent.initCustomEvent(name, false, false, payload);
        targetObject.document.dispatchEvent(fallbackEvent);
      }
    }
    var COMPOSER_SLOT_CONFIG = {
      a: {
        transitivity: COMPOSER_TRANSITIVITY.intransitive,
        ids: {
          embed: "composer-embed",
          stem: "composer-stem-a",
          objectEmbed: "composer-valence-a-embed-left"
        },
        state: {
          embed: "slotAEmbed",
          stem: "slotAStem",
          objectEmbed: "valenceIntransitiveEmbed"
        }
      },
      b: {
        transitivity: COMPOSER_TRANSITIVITY.transitive,
        ids: {
          embed: "composer-valence-embed-1",
          stem: "composer-stem-b",
          objectEmbed: "composer-valence-left-1"
        },
        state: {
          embed: "slotBEmbed",
          stem: "slotBStem",
          objectEmbed: "valenceEmbedPrimary"
        }
      },
      c: {
        transitivity: COMPOSER_TRANSITIVITY.bitransitive,
        ids: {
          embed: "composer-valence-embed-2",
          stem: "composer-stem-c",
          objectEmbed: "composer-valence-left-2"
        },
        state: {
          embed: "slotCEmbed",
          stem: "slotCStem",
          objectEmbed: "valenceEmbedSecondary"
        }
      }
    };
    var COMPOSER_SLOT_KEYS = ["a", "b", "c"];
    var COMPOSER_SLOT_KEY_BY_TRANSITIVITY = GENERATION_SOURCE_SLOT_BY_TRANSITIVITY;
    var ENTRADA_URL_SEGMENT_PREFIX = "classical";
    var ENTRADA_URL_SEGMENT_VERSION = "v1";
    // Positional option indexes keep the share URL short. Versioned capsules
    // fail closed when their control-coordinate schema no longer matches.
    var ENTRADA_URL_DERIVED_VNC_CONTROL_SPECS = Object.freeze([
      { id: "classical-rule-logic-subject", defaultValue: "1sg" },
      { id: "classical-rule-logic-mood", defaultValue: "indicative" },
      { id: "classical-rule-logic-tense", defaultValue: "present" },
      { id: "classical-rule-logic-class", defaultValue: "" },
      { id: "classical-rule-logic-derivation-option", defaultValue: "" },
      { id: "classical-rule-logic-causative-source-voice", defaultValue: "active" },
      { id: "classical-rule-logic-causative-source-nonactive", defaultValue: "" },
      { id: "classical-rule-logic-causative-causee-valence", defaultValue: "" },
      { id: "classical-rule-logic-causative-specific-shuntline-realization", defaultValue: "silent" },
      { id: "classical-rule-logic-applicative-object", defaultValue: "specific-projective:3sg" },
      { id: "classical-rule-logic-construction", defaultValue: "none" },
      { id: "classical-rule-logic-lexical-reading", defaultValue: "unspecified" },
      { id: "classical-rule-logic-vnc-voice", defaultValue: "active" },
      { id: "classical-rule-logic-voice-layer-2", defaultValue: "" },
      { id: "classical-rule-logic-voice-layer-3", defaultValue: "" },
      { id: "classical-rule-logic-nonactive-family", defaultValue: "" },
      { id: "classical-rule-logic-valence", defaultValue: "intransitive" },
      { id: "classical-rule-logic-object", defaultValue: "specific-projective:3sg" },
      { id: "classical-rule-logic-object-interpretation", defaultValue: "reflexive" },
      { id: "classical-rule-logic-tla-fusion", defaultValue: false, type: "checkbox" },
      { id: "classical-rule-logic-directional", defaultValue: "none" },
      { id: "classical-rule-logic-prefix-stack", defaultValue: false, type: "checkbox", legacySentence: true },
      { id: "classical-rule-logic-polarity", defaultValue: "positive", values: ["positive", "negative"], legacySentence: true },
      { id: "classical-rule-logic-sentence-surface", defaultValue: "statement", legacySentence: true },
      { id: "classical-rule-logic-introductory-particle", defaultValue: "none", legacySentence: true },
      { id: "classical-rule-logic-preface-particle", defaultValue: "none", legacySentence: true },
      { id: "classical-rule-logic-introductory-modifier", defaultValue: "none", legacySentence: true },
      { id: "classical-rule-logic-vnc-output-scope", defaultValue: "single" },
      { id: "classical-rule-logic-sentence-particle", defaultValue: "none", legacySentence: true },
      { id: "classical-rule-logic-sentence-particle-honorific", defaultValue: false, type: "checkbox", legacySentence: true },
      { id: "classical-rule-logic-sentence-adverbial", defaultValue: "none", legacySentence: true },
      { id: "classical-rule-logic-particle-combination-shortcut", defaultValue: "none", legacySentence: true },
      { id: "classical-rule-logic-causative-result-subject", defaultValue: "3sg" },
      { id: "classical-rule-logic-vnc-subject-animacy", defaultValue: "animate" },
      { id: "classical-rule-logic-vnc-subject-humanness", defaultValue: "human" }
    ]);
    var ENTRADA_URL_SEGMENT_SCHEMA = Object.freeze([{
      key: "input",
      segment: "vnc",
      path: ["input"],
      defaultValue: ""
    }, {
      key: "sourceLexemeId",
      segment: "source-lexeme",
      path: ["sourceLexemeId"],
      defaultValue: ""
    }, {
      key: "board",
      segment: "board",
      path: ["board"],
      defaultValue: COMPOSER_ENTRY_BOARD.general
    }, {
      key: "panel",
      segment: "screen",
      path: ["panel"],
      defaultValue: "inputs"
    }, {
      key: "derivationType",
      segment: "derivation",
      path: ["derivationType"],
      defaultValue: "direct"
    }, {
      key: "derivedVnc",
      segment: "v",
      path: ["derivedVnc"],
      defaultValue: "",
      derivedVncOnly: true
    }, {
      key: "vncOutputScope",
      segment: "vnc-output",
      path: ["vncOutputScope"],
      defaultValue: "single"
    }, {
      key: "sentenceCombination",
      segment: "sentence-combination",
      path: ["sentence", "combination"],
      defaultValue: "none"
    }, {
      key: "sentenceParticle",
      segment: "sentence-particle",
      path: ["sentence", "particle"],
      defaultValue: "none"
    }, {
      key: "sentenceParticleHonorificized",
      segment: "sentence-honorific",
      path: ["sentence", "particleHonorificized"],
      defaultValue: false,
      type: "boolean"
    }, {
      key: "sentenceAdverbial",
      segment: "sentence-adverbial",
      path: ["sentence", "adverbial"],
      defaultValue: "none"
    }, {
      key: "sentencePolarity",
      segment: "sentence-polarity",
      path: ["sentence", "polarity"],
      defaultValue: "positive"
    }, {
      key: "sentenceSurface",
      segment: "sentence-type",
      path: ["sentence", "surface"],
      defaultValue: "statement"
    }, {
      key: "sentenceIntroductoryParticle",
      segment: "sentence-intro",
      path: ["sentence", "introductoryParticle"],
      defaultValue: "none"
    }, {
      key: "sentencePrefaceParticle",
      segment: "sentence-preface",
      path: ["sentence", "prefaceParticle"],
      defaultValue: "none"
    }, {
      key: "sentenceIntroductoryModifier",
      segment: "sentence-modifier",
      path: ["sentence", "introductoryModifier"],
      defaultValue: "none"
    }, {
      key: "sentenceAntecessive",
      segment: "sentence-antecessive",
      path: ["sentence", "antecessive"],
      defaultValue: false,
      type: "boolean"
    }, {
      key: "transitivity",
      segment: "tr",
      path: ["transitivity"],
      defaultValue: ""
    }, {
      key: "slotAEmbed",
      segment: "a-embed",
      path: ["slots", "a", "embed"],
      defaultValue: ""
    }, {
      key: "slotAStem",
      segment: "a-stem",
      path: ["slots", "a", "stem"],
      defaultValue: ""
    }, {
      key: "slotAObjectEmbed",
      segment: "a-object",
      path: ["slots", "a", "objectEmbed"],
      defaultValue: ""
    }, {
      key: "slotBEmbed",
      segment: "b-embed",
      path: ["slots", "b", "embed"],
      defaultValue: ""
    }, {
      key: "slotBStem",
      segment: "b-stem",
      path: ["slots", "b", "stem"],
      defaultValue: ""
    }, {
      key: "slotBObjectEmbed",
      segment: "b-object",
      path: ["slots", "b", "objectEmbed"],
      defaultValue: ""
    }, {
      key: "slotCEmbed",
      segment: "c-embed",
      path: ["slots", "c", "embed"],
      defaultValue: ""
    }, {
      key: "slotCStem",
      segment: "c-stem",
      path: ["slots", "c", "stem"],
      defaultValue: ""
    }, {
      key: "slotCObjectEmbed",
      segment: "c-object",
      path: ["slots", "c", "objectEmbed"],
      defaultValue: ""
    }, {
      key: "valenceIntransitive",
      segment: "val-a",
      path: ["valenceIntransitive"],
      defaultValue: ""
    }, {
      key: "valence",
      segment: "val-b",
      path: ["valence"],
      defaultValue: ""
    }, {
      key: "valenceSecondary",
      segment: "val-c",
      path: ["valenceSecondary"],
      defaultValue: ""
    }, {
      key: "directionalPrefix",
      segment: "dir",
      path: ["directionalPrefix"],
      defaultValue: ""
    }, {
      key: "supportiveMarker",
      segment: "support",
      path: ["supportiveMarker"],
      defaultValue: ""
    }, {
      key: "slotASerialType",
      segment: "a-serial",
      path: ["slots", "a", "serialType"],
      defaultValue: "auto"
    }, {
      key: "slotBSerialType",
      segment: "b-serial",
      path: ["slots", "b", "serialType"],
      defaultValue: "auto"
    }, {
      key: "slotCSerialType",
      segment: "c-serial",
      path: ["slots", "c", "serialType"],
      defaultValue: "auto"
    }, {
      key: "slotATemplateSuffix",
      segment: "a-suffix",
      path: ["slots", "a", "templateSuffix"],
      defaultValue: ""
    }, {
      key: "slotBTemplateSuffix",
      segment: "b-suffix",
      path: ["slots", "b", "templateSuffix"],
      defaultValue: ""
    }, {
      key: "slotCTemplateSuffix",
      segment: "c-suffix",
      path: ["slots", "c", "templateSuffix"],
      defaultValue: ""
    }, {
      key: "classicalNncEnabled",
      segment: "cn",
      path: ["classicalNnc", "active"],
      defaultValue: false,
      type: "boolean"
    }, {
      key: "classicalNncSourceClass",
      segment: "cn-source-class",
      path: ["classicalNnc", "sourceClass"],
      defaultValue: "",
      classicalNncOnly: true
    }, {
      key: "classicalNncTl2ARealization",
      segment: "cn-tl2a-realization",
      path: ["classicalNnc", "tl2ARealization"],
      defaultValue: "retain-2a",
      classicalNncOnly: true
    }, {
      key: "classicalNncSubject",
      segment: "cn-subj",
      path: ["classicalNnc", "subject"],
      defaultValue: "3common",
      classicalNncOnly: true
    }, {
      key: "classicalNncState",
      segment: "cn-state",
      path: ["classicalNnc", "state"],
      defaultValue: "absolutive",
      classicalNncOnly: true
    }, {
      key: "classicalNncPluralConnector",
      segment: "cn-plural",
      path: ["classicalNnc", "pluralConnector"],
      defaultValue: "",
      classicalNncOnly: true
    }, {
      key: "classicalNncPredicateOptionId",
      segment: "cn-l15-operation",
      path: ["classicalNnc", "predicateOptionId"],
      defaultValue: "source-stem",
      classicalNncOnly: true
    }, {
      key: "classicalNncPossessorReduplication",
      segment: "cn-l15-redup",
      path: ["classicalNnc", "possessorReduplication"],
      defaultValue: false,
      type: "boolean",
      classicalNncOnly: true
    }, {
      key: "classicalNncPossessor",
      segment: "cn-poss",
      path: ["classicalNnc", "possessor"],
      defaultValue: "3sg",
      classicalNncOnly: true
    }, {
      key: "classicalNncStemRelation",
      segment: "cn-relation",
      path: ["classicalNnc", "stemRelation"],
      defaultValue: "plain",
      classicalNncOnly: true
    }, {
      key: "classicalNncOutputScope",
      segment: "cn-output",
      path: ["classicalNnc", "outputScope"],
      defaultValue: "single",
      classicalNncOnly: true
    }, {
      key: "classicalNncAnimacy",
      segment: "cn-animacy",
      path: ["classicalNnc", "animacy"],
      defaultValue: "animate",
      classicalNncOnly: true
    }, {
      key: "classicalNncHumanness",
      segment: "cn-humanness",
      path: ["classicalNnc", "humanness"],
      defaultValue: "human",
      classicalNncOnly: true
    }, {
      key: "classicalNncMetaphoricalUse",
      segment: "cn-metaphorical",
      path: ["classicalNnc", "metaphoricalUse"],
      defaultValue: false,
      type: "boolean",
      classicalNncOnly: true
    }, {
      key: "classicalNncClausePosition",
      segment: "cn-position",
      path: ["classicalNnc", "clausePosition"],
      defaultValue: "initial",
      classicalNncOnly: true
    }, {
      key: "classicalNncQuantityPluralFormation",
      segment: "cn-l16-quantity-plural",
      path: ["classicalNnc", "quantityPluralFormation"],
      defaultValue: "",
      classicalNncOnly: true
    }, {
      key: "classicalNncDoubledFirstPlural",
      segment: "cn-l16-double",
      path: ["classicalNnc", "doubledFirstPlural"],
      defaultValue: false,
      type: "boolean",
      classicalNncOnly: true
    }, {
      key: "classicalNncAdjunctorInMode",
      segment: "cn-l16-adjunctor",
      path: ["classicalNnc", "adjunctorInMode"],
      defaultValue: "none",
      classicalNncOnly: true
    }, {
      key: "classicalNncDependentClauseIntroducedByIn",
      segment: "cn-l16-in",
      path: ["classicalNnc", "dependentClauseIntroducedByIn"],
      defaultValue: false,
      type: "boolean",
      classicalNncOnly: true
    }, {
      key: "classicalNncSpecialHumanUse",
      segment: "cn-l16-human",
      path: ["classicalNnc", "specialHumanUse"],
      defaultValue: false,
      type: "boolean",
      classicalNncOnly: true
    }]);
    var ENTRADA_URL_SEGMENT_FIELD_BY_SEGMENT = ENTRADA_URL_SEGMENT_SCHEMA.reduce((acc, field) => {
      acc[field.segment] = field;
      return acc;
    }, {});
    // `verb` is the former shared VNC/NNC route label. Keep it readable so
    // existing saved links continue to open and are rewritten canonically.
    ENTRADA_URL_SEGMENT_FIELD_BY_SEGMENT.verb = ENTRADA_URL_SEGMENT_FIELD_BY_SEGMENT.vnc;
    ENTRADA_URL_SEGMENT_FIELD_BY_SEGMENT.nnc = ENTRADA_URL_SEGMENT_FIELD_BY_SEGMENT.vnc;
    var EntradaUrlSegmentSyncTimer = null;
    var ClassicalResultScopeRefreshTimer = null;
    var EntradaUrlSegmentsInitialized = false;
    var IsApplyingEntradaUrlSegments = false;
    var VerbComposerState = {
      mode: VERB_INPUT_MODE.composer,
      entryBoard: COMPOSER_ENTRY_BOARD.general,
      transitivity: "",
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
      syllableMode: COMPOSER_SYLLABLE_MODE.multisyllable,
      stem: "",
      sourceBase: "",
      stemManualOverride: false,
      isApplying: false
    };
    var ComposerEmbedOpenState = {
      a: false,
      b: false,
      c: false
    };
    var ComposerEmbedPreviewState = {
      a: false,
      b: false,
      c: false
    };
    var LastComposerEscapeTs = 0;
    var LastComposerSpaceTs = 0;
    var ComposerMatrixAffixOpenSlot = "";
    var VerbScreenAnsState = {
      stem: "",
      regexBase: "",
      form: "",
      provenance: null,
      tense: ""
    };
    var DERIVATIONAL_RULES = {};
    var DERIVATIONAL_RULES_DOCS = {};
    var VALENCE_NEUTRAL_RULES = {};
    var OBJECT_MARKERS = new Set();
    var FUSION_PREFIXES = new Set();
    var NONANIMATE_NOUN_TENSES = new Set();
    var SUBJECT_COMBINATIONS = [];
    var SUBJECT_PERSON_GROUPS = [];
    var SUBJECT_PERSON_NUMBER_ORDER = [];
    var SUBJECT_TOGGLE_ALL = "";
    var OBJECT_TOGGLE_ALL = "";
    var SUSTANTIVO_VERBAL_TRANSITIVE_PREFIXES = new Set();
    var SUSTANTIVO_VERBAL_PREFIXES = [""];
    var POSSESSIVE_PREFIXES = [];
    var POSSESSIVE_PREFIX_LABELS = new Map();
    var POSSESSOR_LABELS = {};
    var POSSESSIVE_TO_OBJECT_PREFIX = {};
    var OBJECT_LABELS = {};
    var OBJECT_ROLE_LABELS = {};
    var NOUN_OBJECT_LABELS = {};
    var VERB_BLOCK_LABELS = {};
    var NONACTIVE_GENERIC_LABELS = {};
    var NONACTIVE_PERSON_SUB_LABELS = {};
    var NONACTIVE_PERSON_CATEGORY_LABELS = {};
    var PERSON_GROUP_LABELS = {};
    var PERSON_SUB_LABELS = {};
    var TOGGLE_LABELS = {};
    var PLACEHOLDER_LABELS = {};
    var PATIENTIVO_OWNERSHIP_LABELS = {};
    var NUMBER_LABELS = {
      singular: {
        es: "singular",
        na: "isel"
      },
      plural: {
        es: "plural",
        na: "imiaka"
      }
    };
    var ADJECTIVE_DISTRIBUTIVE_PLURAL_SUB_LABELS = Object.freeze({
      first: {
        labelEs: "cada uno de nosotros",
        labelEs: "cada uno de nosotros"
      },
      second: {
        labelEs: "cada uno de ustedes",
        labelEs: "cada uno de ustedes"
      },
      thirdHuman: {
        labelEs: "cada uno de ellos/ellas",
        labelEs: "cada uno de ellos/ellas"
      }
    });
    var VOICE_MODE = {};
    var PASSIVE_IMPERSONAL_SUBJECT_MAP = {};
    var PASSIVE_IMPERSONAL_DIRECT_OBJECTS = new Set();
    var DERIVATION_MODE = {};
    var NONACTIVE_SUFFIX_ORDER = ["lu", "u", "wa", "luwa", "uwa", "walu"];
    var NONACTIVE_SUFFIX_LABELS = {};
    var NONACTIVE_SUFFIX_DESCRIPTIONS = {};
    var NONACTIVE_PREFIX_LABEL = {
      labelEs: "no activo",
      labelEs: "te muselia"
    };
    var COMBINED_MODE = {};
    var INSTRUMENTIVO_MODE = {};
    var TENSE_MODE = {};
    var TENSE_ORDER = [];
    var TENSE_LABELS = {};
    var UI_LABELS = {};
    var ADJECTIVE_ACTIVE_TENSE_IDS = Object.freeze({
      preterito: "adjetivo-preterito",
      perfecto: "adjetivo-perfecto",
      preteritoTik: "adjetivo-preterito-tik",
      perfectoTik: "adjetivo-perfecto-tik",
      preteritoNaj: "adjetivo-preterito-naj",
      perfectoNaj: "adjetivo-perfecto-naj"
    });
    var PATIENTIVO_ADJECTIVE_TENSE_IDS = Object.freeze({
      nonactive: "adjetivo-patientivo-no-activo",
      perfectivo: "adjetivo-patientivo-perfectivo"
    });
    var PATIENTIVO_ADJECTIVE_TENSE_ORDER = Object.freeze([PATIENTIVO_ADJECTIVE_TENSE_IDS.nonactive, PATIENTIVO_ADJECTIVE_TENSE_IDS.perfectivo]);
    var PATIENTIVO_ADJECTIVE_TENSE_SET = new Set(PATIENTIVO_ADJECTIVE_TENSE_ORDER);
    var PATIENTIVO_ADJECTIVE_SOURCE_BY_TENSE = Object.freeze({
      [PATIENTIVO_ADJECTIVE_TENSE_IDS.nonactive]: "nonactive",
      [PATIENTIVO_ADJECTIVE_TENSE_IDS.perfectivo]: "perfectivo"
    });
    var ACTIVE_ADJECTIVE_TENSE_ORDER = Object.freeze([ADJECTIVE_ACTIVE_TENSE_IDS.preterito, ADJECTIVE_ACTIVE_TENSE_IDS.perfecto, ADJECTIVE_ACTIVE_TENSE_IDS.preteritoTik, ADJECTIVE_ACTIVE_TENSE_IDS.perfectoTik, ADJECTIVE_ACTIVE_TENSE_IDS.preteritoNaj, ADJECTIVE_ACTIVE_TENSE_IDS.perfectoNaj]);
    var ACTIVE_ADJECTIVE_TENSE_SET = new Set(ACTIVE_ADJECTIVE_TENSE_ORDER);
    var ACTIVE_ADJECTIVE_TAB_TENSE_ORDER = Object.freeze(["potencial", ...ACTIVE_ADJECTIVE_TENSE_ORDER, ...PATIENTIVO_ADJECTIVE_TENSE_ORDER]);
    var ACTIVE_ADJECTIVE_TAB_TENSE_SET = new Set(ACTIVE_ADJECTIVE_TAB_TENSE_ORDER);
    var NONACTIVE_ADJECTIVE_TAB_TENSE_ORDER = Object.freeze(["potencial-habitual"]);
    var NONACTIVE_ADJECTIVE_TAB_TENSE_SET = new Set(NONACTIVE_ADJECTIVE_TAB_TENSE_ORDER);
    var ADJECTIVE_TAB_TENSE_ORDER = Object.freeze([...ACTIVE_ADJECTIVE_TAB_TENSE_ORDER, ...NONACTIVE_ADJECTIVE_TAB_TENSE_ORDER]);
    var TRONCO_ACTIVE_ADJECTIVE_TENSE_SET = new Set([ADJECTIVE_ACTIVE_TENSE_IDS.preteritoTik, ADJECTIVE_ACTIVE_TENSE_IDS.perfectoTik, ADJECTIVE_ACTIVE_TENSE_IDS.preteritoNaj, ADJECTIVE_ACTIVE_TENSE_IDS.perfectoNaj]);
    var TRONCO_NAJ_ACTIVE_ADJECTIVE_TENSE_SET = new Set([ADJECTIVE_ACTIVE_TENSE_IDS.preteritoNaj, ADJECTIVE_ACTIVE_TENSE_IDS.perfectoNaj]);
    var INTRANSITIVE_ONLY_ACTIVE_ADJECTIVE_TENSE_SET = new Set([ADJECTIVE_ACTIVE_TENSE_IDS.preterito, ADJECTIVE_ACTIVE_TENSE_IDS.perfecto, ADJECTIVE_ACTIVE_TENSE_IDS.preteritoTik, ADJECTIVE_ACTIVE_TENSE_IDS.perfectoTik, ADJECTIVE_ACTIVE_TENSE_IDS.preteritoNaj, ADJECTIVE_ACTIVE_TENSE_IDS.perfectoNaj]);
    var PERFECT_ACTIVE_ADJECTIVE_TENSE_SET = new Set([ADJECTIVE_ACTIVE_TENSE_IDS.perfecto, ADJECTIVE_ACTIVE_TENSE_IDS.perfectoTik, ADJECTIVE_ACTIVE_TENSE_IDS.perfectoNaj]);
    function getInjectedRuntimeConfigPaths() {
      const runtimeConfig = typeof globalThis !== "undefined" && globalThis.__CLASSICAL_RUNTIME_CONFIG__ ? globalThis.__CLASSICAL_RUNTIME_CONFIG__ : null;
      if (runtimeConfig && runtimeConfig.paths && typeof runtimeConfig.paths === "object") {
        return runtimeConfig.paths;
      }
      if (typeof globalThis !== "undefined" && globalThis.__CLASSICAL_RUNTIME_PATHS__ && typeof globalThis.__CLASSICAL_RUNTIME_PATHS__ === "object") {
        return globalThis.__CLASSICAL_RUNTIME_PATHS__;
      }
      return null;
    }
    var RUNTIME_PATHS = getInjectedRuntimeConfigPaths() || {};
    var STATIC_LABELS_PATH = RUNTIME_PATHS.STATIC_LABELS_PATH || "data/static_labels.json";
    var STATIC_OPTIONS_PATH = RUNTIME_PATHS.STATIC_OPTIONS_PATH || "data/static_options.json";
    var STATIC_GROUPS_PATH = RUNTIME_PATHS.STATIC_GROUPS_PATH || "data/static_groups.json";
    var STATIC_ORDERS_PATH = RUNTIME_PATHS.STATIC_ORDERS_PATH || "data/static_orders.json";
    var STATIC_RULES_PATH = RUNTIME_PATHS.STATIC_RULES_PATH || "data/static_rules.json";
    var STATIC_PHONOLOGY_PATH = RUNTIME_PATHS.STATIC_PHONOLOGY_PATH || "data/static_phonology.json";
    var STATIC_MODES_PATH = RUNTIME_PATHS.STATIC_MODES_PATH || "data/static_modes.json";
    var STATIC_MISC_PATH = RUNTIME_PATHS.STATIC_MISC_PATH || "data/static_misc.json";
    var STATIC_REDUP_PATH = RUNTIME_PATHS.STATIC_REDUP_PATH || "data/static_redup.json";
    var STATIC_CONSTANTS_PATH = RUNTIME_PATHS.STATIC_CONSTANTS_PATH || "data/static_constants.json";
    var STATIC_DIRECTIONAL_RULES_PATH = RUNTIME_PATHS.STATIC_DIRECTIONAL_RULES_PATH || "data/static_directional_rules.json";
    var STATIC_ALLOMORPHY_RULES_PATH = RUNTIME_PATHS.STATIC_ALLOMORPHY_RULES_PATH || "data/static_allomorphy_rules.json";
    var STATIC_PARSE_TESTS_PATH = RUNTIME_PATHS.STATIC_PARSE_TESTS_PATH || "data/static_parse_tests.json";
    var STATIC_DERIVATIONAL_RULES_PATH = RUNTIME_PATHS.STATIC_DERIVATIONAL_RULES_PATH || "data/static_derivational_rules.json";
    var STATIC_VALENCE_NEUTRAL_PATH = RUNTIME_PATHS.STATIC_VALENCE_NEUTRAL_PATH || "data/static_valence_neutral.json";
    var TENSE_DESCRIPTIONS = {};
    var DERIVATION_TYPE = Object.fromEntries(CLASSICAL_NAHUATL_VNC_DERIVATION_TYPES.map(type => [type, type]));
    var mergeLabelMap = (base, override) => override && typeof override === "object" ? {
      ...base,
      ...override
    } : base;
    var mergeNumberLabels = (base, override) => {
      if (!override || typeof override !== "object") {
        return base;
      }
      const next = {
        ...base
      };
      Object.entries(override).forEach(([key, labels]) => {
        if (!labels || typeof labels !== "object") {
          return;
        }
        next[key] = {
          ...(base[key] || {}),
          ...labels
        };
      });
      return next;
    };

    const api = {};
    api.getComposerSlotKeyForTransitivity = getComposerSlotKeyForTransitivity;
    api.isComposerTransitivitySelected = isComposerTransitivitySelected;
    api.getComposerSlotConfig = getComposerSlotConfig;
    api.getComposerSlotStateKeys = getComposerSlotStateKeys;
    api.syncComposerActiveStemAndEmbedFromState = syncComposerActiveStemAndEmbedFromState;
    api.getComposerActiveSlotFromState = getComposerActiveSlotFromState;
    api.getComposerActiveStemValue = getComposerActiveStemValue;
    api.setComposerActiveSlotStem = setComposerActiveSlotStem;
    api.getVerbComposerElements = getVerbComposerElements;
    api.getVerbDisambiguationElements = getVerbDisambiguationElements;
    api.isVerbDisambiguationEnabled = isVerbDisambiguationEnabled;
    api.clearVerbDisambiguation = clearVerbDisambiguation;
    api.renderVerbDisambiguation = renderVerbDisambiguation;
    api.updateVerbDisambiguation = updateVerbDisambiguation;
    api.getEmptyVerbInputMeta = getEmptyVerbInputMeta;
    api.getParsedVerbForTab = getParsedVerbForTab;
    api.getVerbInputMeta = getVerbInputMeta;
    api.isComposerFieldVisibleForSupportiveToggle = isComposerFieldVisibleForSupportiveToggle;
    api.resolveComposerSupportiveIToggleHost = resolveComposerSupportiveIToggleHost;
    api.stripComposerOptionalSupportiveMarker = stripComposerOptionalSupportiveMarker;
    api.getComposerOrderedRootInputEntries = getComposerOrderedRootInputEntries;
    api.syncComposerSupportiveIInputMarkers = syncComposerSupportiveIInputMarkers;
    api.syncComposerSupportiveITogglePlacement = syncComposerSupportiveITogglePlacement;
    api.getComposerEmbedValueForSlot = getComposerEmbedValueForSlot;
    api.syncComposerEmbedSlotUi = syncComposerEmbedSlotUi;
    api.syncComposerEmbedUiFromState = syncComposerEmbedUiFromState;
    api.setComposerEmbedPreviewState = setComposerEmbedPreviewState;
    api.toggleComposerEmbedOpen = toggleComposerEmbedOpen;
    api.isComposerRootEmbedInput = isComposerRootEmbedInput;
    api.bindComposerRootEmbedReadonlyShield = bindComposerRootEmbedReadonlyShield;
    api.applyNoAutofillAttributes = applyNoAutofillAttributes;
    api.enforceNoAutofillOnTextboxes = enforceNoAutofillOnTextboxes;
    api.getComposerChipOptionSignature = getComposerChipOptionSignature;
    api.syncComposerChipGroup = syncComposerChipGroup;
    api.getComposerSecondaryInventorySelectionEntries = getComposerSecondaryInventorySelectionEntries;
    api.encodeComposerSecondaryInventoryTokens = encodeComposerSecondaryInventoryTokens;
    api.syncComposerSecondaryValenceChipInventory = syncComposerSecondaryValenceChipInventory;
    api.isComposerEmbedTextboxVisibleForSlot = isComposerEmbedTextboxVisibleForSlot;
    api.scheduleComposerSlotChipVisibilitySync = scheduleComposerSlotChipVisibilitySync;
    api.syncComposerSlotChipVisibility = syncComposerSlotChipVisibility;
    api.getComposerSourceTransitivityControlInventoryFrame = getComposerSourceTransitivityControlInventoryFrame;
    api.syncComposerTransitivitySlotButtons = syncComposerTransitivitySlotButtons;
    api.getComposerTransitivityTabsLabel = getComposerTransitivityTabsLabel;
    api.syncComposerSlotTabsLabel = syncComposerSlotTabsLabel;
    api.syncComposerSlotTabsLabels = syncComposerSlotTabsLabels;
    api.getComposerEntryBoardTabsLabel = getComposerEntryBoardTabsLabel;
    api.syncComposerEntryBoardTabsLabel = syncComposerEntryBoardTabsLabel;
    api.syncComposerEntryBoardTabsPlacement = syncComposerEntryBoardTabsPlacement;
    api.syncComposerUtilityActionsPlacement = syncComposerUtilityActionsPlacement;
    api.getComposerOperationBoard = getComposerOperationBoard;
    api.getComposerOperationOrderLabel = getComposerOperationOrderLabel;
    api.getComposerMatrixFieldLabel = getComposerMatrixFieldLabel;
    api.getComposerMatrixInputTagLabel = getComposerMatrixInputTagLabel;
    api.setComposerOperationSlotMetadata = setComposerOperationSlotMetadata;
    api.syncComposerOperationSlotOrderMetadata = syncComposerOperationSlotOrderMetadata;
    api.syncComposerSlotPanelVisibility = syncComposerSlotPanelVisibility;
    api.isClassicalRelationalNncUiModeEnabled = isClassicalRelationalNncUiModeEnabled;
    api.getClassicalRelationalNncUiRequest = getClassicalRelationalNncUiRequest;
    api.syncClassicalRelationalNncUiControls = syncClassicalRelationalNncUiControls;
    api.initClassicalRelationalNncUiControls = initClassicalRelationalNncUiControls;
    api.transposeComposerSlotTextboxes = transposeComposerSlotTextboxes;
    api.carryComposerEmbedVisibilityAcrossTransitivity = carryComposerEmbedVisibilityAcrossTransitivity;
    api.syncComposerChipGroupsFromState = syncComposerChipGroupsFromState;
    api.getComposerMatrixRootTokensForSlot = getComposerMatrixRootTokensForSlot;
    api.getComposerMatrixEmbedStem = getComposerMatrixEmbedStem;
    api.getComposerLastNucleusFromStem = getComposerLastNucleusFromStem;
    api.getComposerNiCyclePrefixVowelsFromEmbed = getComposerNiCyclePrefixVowelsFromEmbed;
    api.getComposerNiFamilyCycleForms = getComposerNiFamilyCycleForms;
    api.getComposerNiFamilyStemVariant = getComposerNiFamilyStemVariant;
    api.getComposerMatrixTokenCycleForms = getComposerMatrixTokenCycleForms;
    api.isComposerMatrixTokenActiveForStem = isComposerMatrixTokenActiveForStem;
    api.maybeRefreshComposerManualMatrixStemFromEmbed = maybeRefreshComposerManualMatrixStemFromEmbed;
    api.resolveComposerMatrixRootTokenSelection = resolveComposerMatrixRootTokenSelection;
    api.getComposerSerialSpecFromStem = getComposerSerialSpecFromStem;
    api.buildComposerSerialMask = buildComposerSerialMask;
    api.getComposerSerialInputTemplate = getComposerSerialInputTemplate;
    api.getComposerSerialTypeOptionByValue = getComposerSerialTypeOptionByValue;
    api.getComposerMatrixAffixSpecialCatalog = getComposerMatrixAffixSpecialCatalog;
    api.getComposerMatrixAffixSpecialGroups = getComposerMatrixAffixSpecialGroups;
    api.getComposerMatrixAffixSpecialEntry = getComposerMatrixAffixSpecialEntry;
    api.getComposerMatrixAffixStateFromEntry = getComposerMatrixAffixStateFromEntry;
    api.getComposerSerialDisplaySpec = getComposerSerialDisplaySpec;
    api.splitComposerSerialSegmentsFromStem = splitComposerSerialSegmentsFromStem;
    api.getComposerSlotKeyByStemInput = getComposerSlotKeyByStemInput;
    api.getComposerSlotInputDescriptor = getComposerSlotInputDescriptor;
    api.getComposerSlotEntryRoleLabel = getComposerSlotEntryRoleLabel;
    api.getComposerSerialEditableSegmentIndexes = getComposerSerialEditableSegmentIndexes;
    api.resolveComposerSerialEditableSegmentIndex = resolveComposerSerialEditableSegmentIndex;
    api.buildComposerSegmentsFromFixedSelectedType = buildComposerSegmentsFromFixedSelectedType;
    api.sanitizeComposerSerialSegmentsFromRaw = sanitizeComposerSerialSegmentsFromRaw;
    api.buildComposerLockedSerialSegmentsFromStem = buildComposerLockedSerialSegmentsFromStem;
    api.getComposerSerialFixedSegments = getComposerSerialFixedSegments;
    api.applyComposerSerialFixedSegments = applyComposerSerialFixedSegments;
    api.getComposerCanonicalStemFromSerialSegments = getComposerCanonicalStemFromSerialSegments;
    api.getComposerCanonicalStemFromInputValue = getComposerCanonicalStemFromInputValue;
    api.getComposerTiCausativeClassFromSerialType = getComposerTiCausativeClassFromSerialType;
    api.isComposerFixedSerialType = isComposerFixedSerialType;
    api.extractComposerSerialEditableRoot = extractComposerSerialEditableRoot;
    api.getComposerStemInputTemplateSuffix = getComposerStemInputTemplateSuffix;
    api.extractComposerTemplateEditableRoot = extractComposerTemplateEditableRoot;
    api.resolveComposerLockedTemplateStem = resolveComposerLockedTemplateStem;
    api.getComposerEditableRootForCurrentAffixState = getComposerEditableRootForCurrentAffixState;
    api.getComposerActiveTiCausativeClass = getComposerActiveTiCausativeClass;
    api.getComposerMaskedSerialSegments = getComposerMaskedSerialSegments;
    api.formatComposerSerialSegmentsForTextbox = formatComposerSerialSegmentsForTextbox;
    api.isComposerSerialPlaceholderSegment = isComposerSerialPlaceholderSegment;
    api.getComposerSerialMaskContextFromRaw = getComposerSerialMaskContextFromRaw;
    api.isComposerPositionInEditableRange = isComposerPositionInEditableRange;
    api.hasComposerSelectionLockedOverlap = hasComposerSelectionLockedOverlap;
    api.getComposerPreferredEditableBoundary = getComposerPreferredEditableBoundary;
    api.findComposerNearestEditablePosition = findComposerNearestEditablePosition;
    api.isComposerTemplateOnlyMaskValue = isComposerTemplateOnlyMaskValue;
    api.prepareComposerTemplateMaskOverwrite = prepareComposerTemplateMaskOverwrite;
    api.enforceComposerLockedSuffixDeletion = enforceComposerLockedSuffixDeletion;
    api.mapComposerCaretToLockedMask = mapComposerCaretToLockedMask;
    api.formatComposerStemForInputDisplay = formatComposerStemForInputDisplay;
    api.applyComposerSerialFormattingToStemInput = applyComposerSerialFormattingToStemInput;
    api.syncComposerMatrixSerialUi = syncComposerMatrixSerialUi;
    api.getComposerTemplateSuffixFromSerialType = getComposerTemplateSuffixFromSerialType;
    api.getComposerMatrixComboboxValueForSerialType = getComposerMatrixComboboxValueForSerialType;
    api.applyComposerSerialTypeSelection = applyComposerSerialTypeSelection;
    api.applyComposerTemplateSuffixSelection = applyComposerTemplateSuffixSelection;
    api.focusComposerStemInputAtEditableBoundary = focusComposerStemInputAtEditableBoundary;
    api.getComposerSerialTypeChipLabel = getComposerSerialTypeChipLabel;
    api.shouldShowComposerTiChoiceChips = shouldShowComposerTiChoiceChips;
    api.syncComposerSerialTypeChips = syncComposerSerialTypeChips;
    api.getComposerMatrixComboboxOptionMatch = getComposerMatrixComboboxOptionMatch;
    api.shouldHandleComposerMatrixComboboxSelection = shouldHandleComposerMatrixComboboxSelection;
    api.applyComposerMatrixComboboxMatch = applyComposerMatrixComboboxMatch;
    api.handleComposerMatrixComboboxSelection = handleComposerMatrixComboboxSelection;
    api.handleComposerMatrixAffixDropdownSelection = handleComposerMatrixAffixDropdownSelection;
    api.getComposerMatrixAffixSerialLabel = getComposerMatrixAffixSerialLabel;
    api.getComposerMatrixAffixTriggerPrefix = getComposerMatrixAffixTriggerPrefix;
    api.getComposerMatrixTokenCategoryLabel = getComposerMatrixTokenCategoryLabel;
    api.buildComposerMatrixTokenEntry = buildComposerMatrixTokenEntry;
    api.getComposerMatrixAffixCurrentState = getComposerMatrixAffixCurrentState;
    api.buildComposerMatrixAffixPickerGroups = buildComposerMatrixAffixPickerGroups;
    api.clearComposerMatrixAffixPopoverPosition = clearComposerMatrixAffixPopoverPosition;
    api.getComposerViewportDimensions = getComposerViewportDimensions;
    api.positionComposerMatrixAffixPopover = positionComposerMatrixAffixPopover;
    api.positionOpenComposerMatrixAffixPopover = positionOpenComposerMatrixAffixPopover;
    api.focusComposerMatrixAffixPopoverItem = focusComposerMatrixAffixPopoverItem;
    api.setComposerMatrixAffixPopoverOpen = setComposerMatrixAffixPopoverOpen;
    api.clearComposerMatrixAffixSelection = clearComposerMatrixAffixSelection;
    api.applyComposerMatrixAffixPickerSelection = applyComposerMatrixAffixPickerSelection;
    api.syncComposerMatrixAffixPickers = syncComposerMatrixAffixPickers;
    api.syncComposerMatrixStemAffixSelects = syncComposerMatrixStemAffixSelects;
    api.isVerbInputModeComposer = isVerbInputModeComposer;
    api.normalizeComposerEntryBoard = normalizeComposerEntryBoard;
    api.getComposerEntryBoard = getComposerEntryBoard;
    api.getVerbRegexPlaceholder = getVerbRegexPlaceholder;
    api.updateVerbInputPlaceholder = updateVerbInputPlaceholder;
    api.hasClassicalNahuatlComposerMacron = hasClassicalNahuatlComposerMacron;
    api.normalizeClassicalNahuatlComposerStem = normalizeClassicalNahuatlComposerStem;
    api.normalizeComposerStem = normalizeComposerStem;
    api.getComposerEmbedTokens = getComposerEmbedTokens;
    api.normalizeComposerEmbedValue = normalizeComposerEmbedValue;
    api.normalizeClassicalFuenteSourcePartStem = normalizeClassicalFuenteSourcePartStem;
    api.normalizeComposerSecondaryValenceSurfaceToken = normalizeComposerSecondaryValenceSurfaceToken;
    api.getComposerValenceFamilyToken = getComposerValenceFamilyToken;
    api.normalizeComposerValenceToken = normalizeComposerValenceToken;
    api.getComposerSecondaryValenceInventory = getComposerSecondaryValenceInventory;
    api.getComposerSecondaryValenceFamilyInventory = getComposerSecondaryValenceFamilyInventory;
    api.getComposerSecondaryValenceOptionEntries = getComposerSecondaryValenceOptionEntries;
    api.getComposerAllowedValenceFamilies = getComposerAllowedValenceFamilies;
    api.parseComposerSecondaryValenceSelection = parseComposerSecondaryValenceSelection;
    api.normalizeComposerSecondaryValenceSelection = normalizeComposerSecondaryValenceSelection;
    api.canonicalizeComposerSecondaryValencePair = canonicalizeComposerSecondaryValencePair;
    api.getComposerSecondaryValenceTokens = getComposerSecondaryValenceTokens;
    api.encodeComposerSecondaryValenceSelection = encodeComposerSecondaryValenceSelection;
    api.getComposerDirectionalPrefixInventory = getComposerDirectionalPrefixInventory;
    api.normalizeComposerDirectionalPrefix = normalizeComposerDirectionalPrefix;
    api.getComposerBracketDirectionalPrefixToken = getComposerBracketDirectionalPrefixToken;
    api.getLegacyComposerSourceToken = getLegacyComposerSourceToken;
    api.normalizeComposerFollowerSurfaceForNucleusCheck = normalizeComposerFollowerSurfaceForNucleusCheck;
    api.composerFollowerStartsWithNucleus = composerFollowerStartsWithNucleus;
    api.buildComposerOptionalValenceSlotSegment = buildComposerOptionalValenceSlotSegment;
    api.resolveComposerSemanticFollowerSegments = resolveComposerSemanticFollowerSegments;
    api.getComposerSecondaryValenceFamilyInventoryForContext = getComposerSecondaryValenceFamilyInventoryForContext;
    api.getComposerPreferredFamilyBaseToken = getComposerPreferredFamilyBaseToken;
    api.normalizeComposerValenceTokenForCurrentContext = normalizeComposerValenceTokenForCurrentContext;
    api.shouldUseNhBeforeMatrixStem = shouldUseNhBeforeMatrixStem;
    api.normalizeComposerMatrixAdjacentEmbed = normalizeComposerMatrixAdjacentEmbed;
    api.applyComposerSupportiveMarkerToRootPath = applyComposerSupportiveMarkerToRootPath;
    api.shouldProjectBoundSupportiveMarkerToComposerInputs = shouldProjectBoundSupportiveMarkerToComposerInputs;
    api.projectBoundSupportiveMarkerToComposerInputs = projectBoundSupportiveMarkerToComposerInputs;
    api.shouldSerializeBoundSupportiveMarkerFromComposerInputs = shouldSerializeBoundSupportiveMarkerFromComposerInputs;
    api.resolveComposerMarkedSupportiveRootPath = resolveComposerMarkedSupportiveRootPath;
    api.getComposerStemSyllableCount = getComposerStemSyllableCount;
    api.getComposerSupportiveMarker = getComposerSupportiveMarker;
    api.getComposerSupportiveMarkerCandidate = getComposerSupportiveMarkerCandidate;
    api.canComposerUseSupportiveMarker = canComposerUseSupportiveMarker;
    api.syncComposerSupportiveMarkerFromState = syncComposerSupportiveMarkerFromState;
    api.syncComposerSupportiveIAvailability = syncComposerSupportiveIAvailability;
    api.getUiCopyLabel = getUiCopyLabel;
    api.updateVerbComposerHint = updateVerbComposerHint;
    api.syncComposerSecondaryValenceOptions = syncComposerSecondaryValenceOptions;
    api.getComposerAllowedValenceOptions = getComposerAllowedValenceOptions;
    api.syncComposerSingleValenceOptions = syncComposerSingleValenceOptions;
    api.getComposerNextFamilySurfaceToken = getComposerNextFamilySurfaceToken;
    api.syncComposerValenceFamilyChipGroup = syncComposerValenceFamilyChipGroup;
    api.syncComposerValenceAvailability = syncComposerValenceAvailability;
    api.getComposerSlotEmbedForRegex = getComposerSlotEmbedForRegex;
    api.buildComposerSemanticState = buildComposerSemanticState;
    api.serializeComposerSemanticToRegexInput = serializeComposerSemanticToRegexInput;
    api.buildComposerModeBundle = buildComposerModeBundle;
    api.resolveVerbInputSource = resolveVerbInputSource;
    api.createEmptyEntradaUrlStateSnapshot = createEmptyEntradaUrlStateSnapshot;
    api.getEntradaUrlNestedValue = getEntradaUrlNestedValue;
    api.setEntradaUrlNestedValue = setEntradaUrlNestedValue;
    api.getEntradaUrlSegmentFieldKeys = getEntradaUrlSegmentFieldKeys;
    api.normalizeEntradaUrlBoard = normalizeEntradaUrlBoard;
    api.normalizeEntradaUrlPanel = normalizeEntradaUrlPanel;
    api.normalizeEntradaUrlDerivationType = normalizeEntradaUrlDerivationType;
    api.normalizeEntradaUrlBoolean = normalizeEntradaUrlBoolean;
    api.normalizeEntradaUrlTransitivity = normalizeEntradaUrlTransitivity;
    api.normalizeEntradaUrlSerialType = normalizeEntradaUrlSerialType;
    api.normalizeEntradaUrlStateSnapshot = normalizeEntradaUrlStateSnapshot;
    api.shouldApplyEntradaUrlSlotStemOverride = shouldApplyEntradaUrlSlotStemOverride;
    api.getClassicalEntradaUrlSlotKeyFromFieldKey = getClassicalEntradaUrlSlotKeyFromFieldKey;
    api.getClassicalEntradaUrlSourceSelectionFrame = getClassicalEntradaUrlSourceSelectionFrame;
    api.shouldBlockClassicalEntradaUrlSlotMirror = shouldBlockClassicalEntradaUrlSlotMirror;
    api.shouldTreatEntradaUrlSlotAsClassicalFuenteSourceParts = shouldTreatEntradaUrlSlotAsClassicalFuenteSourceParts;
    api.getCurrentEntradaUrlStateSnapshot = getCurrentEntradaUrlStateSnapshot;
    api.shouldIncludeEntradaUrlSegmentField = shouldIncludeEntradaUrlSegmentField;
    api.encodeEntradaUrlSegmentValue = encodeEntradaUrlSegmentValue;
    api.decodeEntradaUrlSegmentValue = decodeEntradaUrlSegmentValue;
    api.normalizeEntradaUrlDerivedVncCapsule = normalizeEntradaUrlDerivedVncCapsule;
    api.buildEntradaUrlDerivedVncCapsule = buildEntradaUrlDerivedVncCapsule;
    api.getEntradaUrlDerivedVncCapsuleSelections = getEntradaUrlDerivedVncCapsuleSelections;
    api.applyEntradaUrlDerivedVncStateToControls = applyEntradaUrlDerivedVncStateToControls;
    api.buildEntradaUrlSegmentString = buildEntradaUrlSegmentString;
    api.parseEntradaUrlSegmentString = parseEntradaUrlSegmentString;
    api.buildEntradaUrlHash = buildEntradaUrlHash;
    api.readEntradaUrlStateSnapshotFromLocation = readEntradaUrlStateSnapshotFromLocation;
    api.hasEntradaUrlExplicitField = hasEntradaUrlExplicitField;
    api.assignEntradaUrlComposerField = assignEntradaUrlComposerField;
    api.applyClassicalVncSourceLexemeRestoredState = applyClassicalVncSourceLexemeRestoredState;
    api.applyClassicalNncEntradaUrlStateToControls = applyClassicalNncEntradaUrlStateToControls;
    api.applyEntradaUrlSentenceStateToControls = applyEntradaUrlSentenceStateToControls;
    api.applyEntradaUrlStateSnapshot = applyEntradaUrlStateSnapshot;
    api.applyEntradaUrlSegmentsFromLocation = applyEntradaUrlSegmentsFromLocation;
    api.syncEntradaUrlSegmentsFromCurrentState = syncEntradaUrlSegmentsFromCurrentState;
    api.queueEntradaUrlSegmentSync = queueEntradaUrlSegmentSync;
    api.isEntradaUrlSyncEventTarget = isEntradaUrlSyncEventTarget;
    api.isEntradaUrlImmediateSyncEventTarget = isEntradaUrlImmediateSyncEventTarget;
    api.initEntradaUrlSegments = initEntradaUrlSegments;
    api.resolveComposerDirectionalPrefixFromBase = resolveComposerDirectionalPrefixFromBase;
    api.resolveComposerValenceSequenceFromParsed = resolveComposerValenceSequenceFromParsed;
    api.resolveComposerValenceEmbedStateFromBase = resolveComposerValenceEmbedStateFromBase;
    api.resolveComposerNoPrefixValenceEmbedsFromBase = resolveComposerNoPrefixValenceEmbedsFromBase;
    api.resolveComposerEmbedFromParsed = resolveComposerEmbedFromParsed;
    api.parseComposerStateFromRegexValue = parseComposerStateFromRegexValue;
    api.renderVerbComposerFromState = renderVerbComposerFromState;
    api.syncComposerStateFromVerbInput = syncComposerStateFromVerbInput;
    api.applyComposerStateToVerbInput = applyComposerStateToVerbInput;
    api.shouldComposerControlChangeRefreshImmediately = shouldComposerControlChangeRefreshImmediately;
    api.collectComposerStateFromControls = collectComposerStateFromControls;
    api.maybeDeriveComposerStemFromSelectionsSource = maybeDeriveComposerStemFromSelectionsSource;
    api.deriveComposerStemFromSelections = deriveComposerStemFromSelections;
    api.applyComposerSyllableModeDefaultFromStem = applyComposerSyllableModeDefaultFromStem;
    api.updateCalcInputModeButtons = updateCalcInputModeButtons;
    api.setComposerEntryBoard = setComposerEntryBoard;
    api.populateComposerDirectionalOptions = populateComposerDirectionalOptions;
    api.setVerbInputMode = setVerbInputMode;
    api.bindComposerStemTabNavigation = bindComposerStemTabNavigation;
    api.onVerbComposerControlChange = onVerbComposerControlChange;
    api.clearVerbComposerTextboxInputs = clearVerbComposerTextboxInputs;
    api.isEditableTextInput = isEditableTextInput;
    api.isFocusableTextInput = isFocusableTextInput;
    api.dispatchTextInputUpdate = dispatchTextInputUpdate;
    api.removeLastTextUnit = removeLastTextUnit;
    api.getComposerPreferredEntryInput = getComposerPreferredEntryInput;
    api.getComposerSlotEntryTargetInput = getComposerSlotEntryTargetInput;
    api.clearComposerSlotEntryTarget = clearComposerSlotEntryTarget;
    api.getComposerSlotEntryStateValue = getComposerSlotEntryStateValue;
    api.getComposerSlotEntryTargetSelection = getComposerSlotEntryTargetSelection;
    api.setComposerSlotEntryTarget = setComposerSlotEntryTarget;
    api.getComposerVerbInputRangeForSlot = getComposerVerbInputRangeForSlot;
    api.focusComposerSlotEntryTarget = focusComposerSlotEntryTarget;
    api.getComposerSlotEntryButtonForInput = getComposerSlotEntryButtonForInput;
    api.buildComposerSlotEntryButton = buildComposerSlotEntryButton;
    api.getComposerSlotEntryButtonLabel = getComposerSlotEntryButtonLabel;
    api.isComposerNncStemSlot = isComposerNncStemSlot;
    api.getComposerSlotEntryButtonVisibleText = getComposerSlotEntryButtonVisibleText;
    api.syncComposerSlotEntryButton = syncComposerSlotEntryButton;
    api.syncComposerSlotEntryButtons = syncComposerSlotEntryButtons;
    api.getComposerSlotEntryInsertionText = getComposerSlotEntryInsertionText;
    api.getComposerDeleteForwardValue = getComposerDeleteForwardValue;
    api.applyComposerSlotEntryTargetInputValue = applyComposerSlotEntryTargetInputValue;
    api.handleComposerVerbSlotBeforeInput = handleComposerVerbSlotBeforeInput;
    api.handleComposerVerbSlotInput = handleComposerVerbSlotInput;
    api.getComposerStemInputPreferredCaret = getComposerStemInputPreferredCaret;
    api.getVerbInputWritableSelection = getVerbInputWritableSelection;
    api.applyVerbInputWritableSelection = applyVerbInputWritableSelection;
    api.focusTextInputAtEnd = focusTextInputAtEnd;
    api.isComposerTextboxInputElement = isComposerTextboxInputElement;
    api.getComposerAvailableTextboxForKeyboardNavigation = getComposerAvailableTextboxForKeyboardNavigation;
    api.handleVerbTextboxTabShortcut = handleVerbTextboxTabShortcut;
    api.shouldLetNativeEnterSelectControl = shouldLetNativeEnterSelectControl;
    api.escapeAttributeSelectorValue = escapeAttributeSelectorValue;
    api.isDisplayOnlyVerbMirrorElement = isDisplayOnlyVerbMirrorElement;
    api.shouldLetNativeSpaceBehavior = shouldLetNativeSpaceBehavior;
    api.shouldLetNativeDeleteBehavior = shouldLetNativeDeleteBehavior;
    api.captureTenseTabsFocusState = captureTenseTabsFocusState;
    api.restoreTenseTabsFocusState = restoreTenseTabsFocusState;
    api.serializeTenseGroupRows = serializeTenseGroupRows;
    api.getVerbSemanticTenseGroupKey = getVerbSemanticTenseGroupKey;
    api.getVerbSemanticTenseGroups = getVerbSemanticTenseGroups;
    api.buildTenseTabsDomSignature = buildTenseTabsDomSignature;
    api.setTensePresenceBadges = setTensePresenceBadges;
    api.updateExistingTenseTabsDom = updateExistingTenseTabsDom;
    api.getScreenCalculatorAnsFallbackFromForm = getScreenCalculatorAnsFallbackFromForm;
    api.rememberScreenCalculatorAnsState = rememberScreenCalculatorAnsState;
    api.getVerbScreenCalculatorButtons = getVerbScreenCalculatorButtons;
    api.createBlockedRegexSupportiveIToggleInfo = createBlockedRegexSupportiveIToggleInfo;
    api.buildCurrentRegexSupportiveToggleSourceFrame = buildCurrentRegexSupportiveToggleSourceFrame;
    api.buildCurrentRegexSupportiveToggleNextValueFromTarget = buildCurrentRegexSupportiveToggleNextValueFromTarget;
    api.buildCurrentRegexSupportiveToggleTargetFrame = buildCurrentRegexSupportiveToggleTargetFrame;
    api.buildCurrentRegexSupportiveToggleOperationFrame = buildCurrentRegexSupportiveToggleOperationFrame;
    api.getCurrentRegexSupportiveToggleOperationMismatch = getCurrentRegexSupportiveToggleOperationMismatch;
    api.getRegexSupportiveIToggleInfoFromOperationFrame = getRegexSupportiveIToggleInfoFromOperationFrame;
    api.getRegexSupportiveIToggleInfo = getRegexSupportiveIToggleInfo;
    api.getSupportiveYRuleSummary = getSupportiveYRuleSummary;
    api.getSupportiveToggleGuidance = getSupportiveToggleGuidance;
    api.syncVerbScreenCalculatorState = syncVerbScreenCalculatorState;
    api.runScreenCalculatorAC = runScreenCalculatorAC;
    api.runScreenCalculatorCE = runScreenCalculatorCE;
    api.runScreenCalculatorDEL = runScreenCalculatorDEL;
    api.runScreenCalculatorANS = runScreenCalculatorANS;
    api.runScreenCalculatorModeToggle = runScreenCalculatorModeToggle;
    api.runScreenCalculatorCycleTransitivity = runScreenCalculatorCycleTransitivity;
    api.runScreenCalculatorToggleSupportiveI = runScreenCalculatorToggleSupportiveI;
    api.copyTextToClipboard = copyTextToClipboard;
    api.runScreenCalculatorCopy = runScreenCalculatorCopy;
    api.populateClassicalSentenceParticleControl = populateClassicalSentenceParticleControl;
    api.populateClassicalSentenceAdverbialControl = populateClassicalSentenceAdverbialControl;
    Object.defineProperty(api, "CLASSICAL_BASAL_UNIT", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_BASAL_UNIT; },
        set(value) { CLASSICAL_BASAL_UNIT = value; },
    });
    api.normalizeClassicalBasalUnit = normalizeClassicalBasalUnit;
    api.getClassicalBasalUnitFromRuntime = getClassicalBasalUnitFromRuntime;
    api.syncClassicalConstructionSourceUnitAvailability =
      syncClassicalConstructionSourceUnitAvailability;
    api.getClassicalBasalUnitDatasetTargets = getClassicalBasalUnitDatasetTargets;
    Object.defineProperty(api, "CLASSICAL_SOURCE_PARTS_MODE", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_SOURCE_PARTS_MODE; },
    });
    Object.defineProperty(api, "ClassicalSourcePartsCommittedSignature", {
        configurable: true,
        enumerable: true,
        get() { return ClassicalSourcePartsCommittedSignature; },
        set(value) { ClassicalSourcePartsCommittedSignature = value; },
    });
    api.normalizeClassicalSourcePartsMode = normalizeClassicalSourcePartsMode;
    api.getClassicalSourcePartsModeLabel = getClassicalSourcePartsModeLabel;
    api.getClassicalSourcePartControlElements = getClassicalSourcePartControlElements;
    api.getClassicalNncSourceGuideElements = getClassicalNncSourceGuideElements;
    api.getClassicalVncSourceGuideElements = getClassicalVncSourceGuideElements;
    api.getClassicalVncSourceLexemeRecord = getClassicalVncSourceLexemeRecord;
    api.buildClassicalVncSourceLexemeSelectionFrame = buildClassicalVncSourceLexemeSelectionFrame;
    api.syncClassicalVncSourceLexemeFact = syncClassicalVncSourceLexemeFact;
    api.syncClassicalNncSourceGuide = syncClassicalNncSourceGuide;
    api.syncClassicalVncSourceGuide = syncClassicalVncSourceGuide;
    api.populateClassicalVncSourceStemPicker = populateClassicalVncSourceStemPicker;
    api.applyClassicalVncSourceStemSelection = applyClassicalVncSourceStemSelection;
    api.getClassicalNncSourceExampleSelection = getClassicalNncSourceExampleSelection;
    api.findClassicalNncSourceExampleOptionByParts =
      findClassicalNncSourceExampleOptionByParts;
    api.applyClassicalNncSourceExampleSelection = applyClassicalNncSourceExampleSelection;
    api.getClassicalSourcePartControlState = getClassicalSourcePartControlState;
    api.setClassicalSourcePartsMode = setClassicalSourcePartsMode;
    api.getClassicalEntradaUrlSourcePartsFromLocation = getClassicalEntradaUrlSourcePartsFromLocation;
    api.syncClassicalSourcePartsToEntradaUrl = syncClassicalSourcePartsToEntradaUrl;
    api.getClassicalSourcePartsEvaluationSignature = getClassicalSourcePartsEvaluationSignature;
    api.commitClassicalSourcePartsEvaluation = commitClassicalSourcePartsEvaluation;
    api.clearClassicalSourcePartsEvaluation = clearClassicalSourcePartsEvaluation;
    api.syncClassicalSourcePartControlsFromRuntime = syncClassicalSourcePartControlsFromRuntime;
    api.getClassicalSourceSelectionOptionsFromRuntime = getClassicalSourceSelectionOptionsFromRuntime;
    api.stripClassicalSourceDisplayWrapping = stripClassicalSourceDisplayWrapping;
    api.wrapClassicalSourceDisplayStem = wrapClassicalSourceDisplayStem;
    api.joinClassicalSourceEmbedMatrix = joinClassicalSourceEmbedMatrix;
    api.getClassicalTypedBuiltSourceFrame = getClassicalTypedBuiltSourceFrame;
    api.syncClassicalBuiltSourceToVerbInput = syncClassicalBuiltSourceToVerbInput;
    api.getClassicalSourceReadoutFrame = getClassicalSourceReadoutFrame;
    api.syncClassicalSourceReadout = syncClassicalSourceReadout;
    api.syncClassicalBasalUnitControls = syncClassicalBasalUnitControls;
    api.refreshClassicalBasalUnitRenderedOutput = refreshClassicalBasalUnitRenderedOutput;
    api.applyClassicalBasalUnitSurface = applyClassicalBasalUnitSurface;
    api.applyClassicalBasalUnitMode = applyClassicalBasalUnitMode;
    api.initClassicalBasalUnitControls = initClassicalBasalUnitControls;
    api.isClassicalCausativeParticipantControl = isClassicalCausativeParticipantControl;
    api.getClassicalCausativeParticipantControlRequestOverrides = getClassicalCausativeParticipantControlRequestOverrides;
    api.bindClassicalCausativeParticipantControlEvents = bindClassicalCausativeParticipantControlEvents;
    api.isClassicalNonactiveFormationControl = isClassicalNonactiveFormationControl;
    api.getClassicalNonactiveFormationControlRequestOverrides = getClassicalNonactiveFormationControlRequestOverrides;
    api.refreshClassicalRuleLogicSurfaceFromControl = refreshClassicalRuleLogicSurfaceFromControl;
    api.scheduleClassicalCausativeParticipantControlRefresh = scheduleClassicalCausativeParticipantControlRefresh;
    api.handleClassicalCausativeParticipantControlChange = handleClassicalCausativeParticipantControlChange;
    api.handleClassicalCausativeParticipantRevisionClick = handleClassicalCausativeParticipantRevisionClick;
    api.initClassicalCausativeParticipantControlEvents = initClassicalCausativeParticipantControlEvents;
    api.handleClassicalNonactiveFormationControlChange = handleClassicalNonactiveFormationControlChange;
    api.initClassicalNonactiveFormationControlEvents = initClassicalNonactiveFormationControlEvents;
    api.isClassicalPanelContractSurfaceRequested = isClassicalPanelContractSurfaceRequested;
    api.renderInitialClassicalPanelContractSurface = renderInitialClassicalPanelContractSurface;
    api.initVerbScreenCalculator = initVerbScreenCalculator;
    api.initCalcInputModeButtons = initCalcInputModeButtons;
    api.handleComposerDoubleEscapeShortcut = handleComposerDoubleEscapeShortcut;
    api.handleComposerDoubleSpaceShortcut = handleComposerDoubleSpaceShortcut;
    api.syncVerbComposerFieldGroupRoles = syncVerbComposerFieldGroupRoles;
    api.initVerbComposer = initVerbComposer;
    api.getVerbMirror = getVerbMirror;
    api.getVerbMirrorContent = getVerbMirrorContent;
    api.focusVerbMirrorAtEnd = focusVerbMirrorAtEnd;
    api.focusVisibleVerbSurfaceAtEnd = focusVisibleVerbSurfaceAtEnd;
    api.loadVerbLexiconData = loadVerbLexiconData;
    api.parseCSVRow = parseCSVRow;
    api.parseCSVRows = parseCSVRows;
    api.parseVerbEntryToken = parseVerbEntryToken;
    api.parseVerbLexiconCSV = parseVerbLexiconCSV;
    api.stripOptionalSupportiveI = stripOptionalSupportiveI;
    api.hasCompoundMarkers = hasCompoundMarkers;
    api.isSupportiveIClusterBase = isSupportiveIClusterBase;
    api.formatSupportiveIBaseDisplay = formatSupportiveIBaseDisplay;
    api.buildVerbBaseInfo = buildVerbBaseInfo;
    api.buildCanonicalVerbMapFromCSV = buildCanonicalVerbMapFromCSV;
    api.syncInputPopupOverlayActiveState = syncInputPopupOverlayActiveState;
    api.cancelScheduledVerbInputRefresh = cancelScheduledVerbInputRefresh;
    api.cancelDeferredToggleAvailabilityPass = cancelDeferredToggleAvailabilityPass;
    api.runDeferredToggleAvailabilityPass = runDeferredToggleAvailabilityPass;
    api.scheduleDeferredToggleAvailabilityPass = scheduleDeferredToggleAvailabilityPass;
    api.runVerbInputRefresh = runVerbInputRefresh;
    api.scheduleVerbInputRefresh = scheduleVerbInputRefresh;
    api.resolveSilentGenerationTiCausativeClass = resolveSilentGenerationTiCausativeClass;
    api.buildSilentGenerationCacheKey = buildSilentGenerationCacheKey;
    api.getCachedSilentNuclearClauseSurface = getCachedSilentNuclearClauseSurface;
    api.applyVerbInputReplacement = applyVerbInputReplacement;
    Object.defineProperty(api, "VERB_INPUT_MODE", {
        configurable: true,
        enumerable: true,
        get() { return VERB_INPUT_MODE; },
        set(value) { VERB_INPUT_MODE = value; },
    });
    Object.defineProperty(api, "COMPOSER_TRANSITIVITY", {
        configurable: true,
        enumerable: true,
        get() { return COMPOSER_TRANSITIVITY; },
        set(value) { COMPOSER_TRANSITIVITY = value; },
    });
    Object.defineProperty(api, "COMPOSER_ENTRY_BOARD", {
        configurable: true,
        enumerable: true,
        get() { return COMPOSER_ENTRY_BOARD; },
        set(value) { COMPOSER_ENTRY_BOARD = value; },
    });
    Object.defineProperty(api, "COMPOSER_SYLLABLE_MODE", {
        configurable: true,
        enumerable: true,
        get() { return COMPOSER_SYLLABLE_MODE; },
        set(value) { COMPOSER_SYLLABLE_MODE = value; },
    });
    Object.defineProperty(api, "COMPOSER_VALENCE_OPTIONS", {
        configurable: true,
        enumerable: true,
        get() { return COMPOSER_VALENCE_OPTIONS; },
        set(value) { COMPOSER_VALENCE_OPTIONS = value; },
    });
    Object.defineProperty(api, "COMPOSER_SECONDARY_VALENCE_OPTIONS", {
        configurable: true,
        enumerable: true,
        get() { return COMPOSER_SECONDARY_VALENCE_OPTIONS; },
        set(value) { COMPOSER_SECONDARY_VALENCE_OPTIONS = value; },
    });
    Object.defineProperty(api, "COMPOSER_SECONDARY_VALENCE_INVENTORY_LIMIT", {
        configurable: true,
        enumerable: true,
        get() { return COMPOSER_SECONDARY_VALENCE_INVENTORY_LIMIT; },
        set(value) { COMPOSER_SECONDARY_VALENCE_INVENTORY_LIMIT = value; },
    });
    Object.defineProperty(api, "COMPOSER_SECONDARY_VALENCE_INVENTORY_CAPACITY", {
        configurable: true,
        enumerable: true,
        get() { return COMPOSER_SECONDARY_VALENCE_INVENTORY_CAPACITY; },
        set(value) { COMPOSER_SECONDARY_VALENCE_INVENTORY_CAPACITY = value; },
    });
    Object.defineProperty(api, "COMPOSER_SECONDARY_VALENCE_FAMILY_ORDER", {
        configurable: true,
        enumerable: true,
        get() { return COMPOSER_SECONDARY_VALENCE_FAMILY_ORDER; },
        set(value) { COMPOSER_SECONDARY_VALENCE_FAMILY_ORDER = value; },
    });
    Object.defineProperty(api, "COMPOSER_SECONDARY_VALENCE_FAMILY_BY_TOKEN", {
        configurable: true,
        enumerable: true,
        get() { return COMPOSER_SECONDARY_VALENCE_FAMILY_BY_TOKEN; },
        set(value) { COMPOSER_SECONDARY_VALENCE_FAMILY_BY_TOKEN = value; },
    });
    Object.defineProperty(api, "DEFAULT_COMPOSER_SECONDARY_VALENCE_INVENTORY", {
        configurable: true,
        enumerable: true,
        get() { return DEFAULT_COMPOSER_SECONDARY_VALENCE_INVENTORY; },
        set(value) { DEFAULT_COMPOSER_SECONDARY_VALENCE_INVENTORY = value; },
    });
    Object.defineProperty(api, "COMPOSER_ROOT_EMBED_INPUT_IDS", {
        configurable: true,
        enumerable: true,
        get() { return COMPOSER_ROOT_EMBED_INPUT_IDS; },
        set(value) { COMPOSER_ROOT_EMBED_INPUT_IDS = value; },
    });
    Object.defineProperty(api, "ComposerVerbSlotEntryTarget", {
        configurable: true,
        enumerable: true,
        get() { return ComposerVerbSlotEntryTarget; },
        set(value) { ComposerVerbSlotEntryTarget = value; },
    });
    Object.defineProperty(api, "ComposerVerbSlotEntryLastVerbValue", {
        configurable: true,
        enumerable: true,
        get() { return ComposerVerbSlotEntryLastVerbValue; },
        set(value) { ComposerVerbSlotEntryLastVerbValue = value; },
    });
    Object.defineProperty(api, "ComposerVerbSlotEntryInputSyncing", {
        configurable: true,
        enumerable: true,
        get() { return ComposerVerbSlotEntryInputSyncing; },
        set(value) { ComposerVerbSlotEntryInputSyncing = value; },
    });
    Object.defineProperty(api, "AUTOFILL_ALIAS_SALT", {
        configurable: true,
        enumerable: true,
        get() { return AUTOFILL_ALIAS_SALT; },
        set(value) { AUTOFILL_ALIAS_SALT = value; },
    });
    Object.defineProperty(api, "COMPOSER_ESC_DOUBLE_CLEAR_WINDOW_MS", {
        configurable: true,
        enumerable: true,
        get() { return COMPOSER_ESC_DOUBLE_CLEAR_WINDOW_MS; },
        set(value) { COMPOSER_ESC_DOUBLE_CLEAR_WINDOW_MS = value; },
    });
    Object.defineProperty(api, "COMPOSER_SPACE_DOUBLE_READY_WINDOW_MS", {
        configurable: true,
        enumerable: true,
        get() { return COMPOSER_SPACE_DOUBLE_READY_WINDOW_MS; },
        set(value) { COMPOSER_SPACE_DOUBLE_READY_WINDOW_MS = value; },
    });
    Object.defineProperty(api, "COMPOSER_TRANSITIVITY_ORDER", {
        configurable: true,
        enumerable: true,
        get() { return COMPOSER_TRANSITIVITY_ORDER; },
        set(value) { COMPOSER_TRANSITIVITY_ORDER = value; },
    });
    Object.defineProperty(api, "ALT_SHORTCUT_DEFINITIONS", {
        configurable: true,
        enumerable: true,
        get() { return ALT_SHORTCUT_DEFINITIONS; },
        set(value) { ALT_SHORTCUT_DEFINITIONS = value; },
    });
    Object.defineProperty(api, "KEYBOARD_LEGEND_BASE_ENTRIES", {
        configurable: true,
        enumerable: true,
        get() { return KEYBOARD_LEGEND_BASE_ENTRIES; },
        set(value) { KEYBOARD_LEGEND_BASE_ENTRIES = value; },
    });
    Object.defineProperty(api, "ESCAPE_OVERLAY_HANDLERS", {
        configurable: true,
        enumerable: true,
        get() { return ESCAPE_OVERLAY_HANDLERS; },
        set(value) { ESCAPE_OVERLAY_HANDLERS = value; },
    });
    Object.defineProperty(api, "ESCAPE_OVERLAY_HANDLER_SEQUENCE", {
        configurable: true,
        enumerable: true,
        get() { return ESCAPE_OVERLAY_HANDLER_SEQUENCE; },
        set(value) { ESCAPE_OVERLAY_HANDLER_SEQUENCE = value; },
    });
    Object.defineProperty(api, "COMPOSER_MATRIX_ROOT_TOKENS", {
        configurable: true,
        enumerable: true,
        get() { return COMPOSER_MATRIX_ROOT_TOKENS; },
        set(value) { COMPOSER_MATRIX_ROOT_TOKENS = value; },
    });
    Object.defineProperty(api, "COMPOSER_MATRIX_ROOT_TOKENS_ALL", {
        configurable: true,
        enumerable: true,
        get() { return COMPOSER_MATRIX_ROOT_TOKENS_ALL; },
        set(value) { COMPOSER_MATRIX_ROOT_TOKENS_ALL = value; },
    });
    Object.defineProperty(api, "COMPOSER_MATRIX_ROOT_YA_BASES", {
        configurable: true,
        enumerable: true,
        get() { return COMPOSER_MATRIX_ROOT_YA_BASES; },
        set(value) { COMPOSER_MATRIX_ROOT_YA_BASES = value; },
    });
    Object.defineProperty(api, "COMPOSER_MATRIX_ROOT_NI_CYCLE_BASES", {
        configurable: true,
        enumerable: true,
        get() { return COMPOSER_MATRIX_ROOT_NI_CYCLE_BASES; },
        set(value) { COMPOSER_MATRIX_ROOT_NI_CYCLE_BASES = value; },
    });
    Object.defineProperty(api, "COMPOSER_MATRIX_ROOT_NI_SHORT_VOWELS", {
        configurable: true,
        enumerable: true,
        get() { return COMPOSER_MATRIX_ROOT_NI_SHORT_VOWELS; },
        set(value) { COMPOSER_MATRIX_ROOT_NI_SHORT_VOWELS = value; },
    });
    Object.defineProperty(api, "COMPOSER_MATRIX_ROOT_NI_FULL_VOWELS", {
        configurable: true,
        enumerable: true,
        get() { return COMPOSER_MATRIX_ROOT_NI_FULL_VOWELS; },
        set(value) { COMPOSER_MATRIX_ROOT_NI_FULL_VOWELS = value; },
    });
    Object.defineProperty(api, "COMPOSER_MATRIX_NH_BLOCKED_STEMS", {
        configurable: true,
        enumerable: true,
        get() { return COMPOSER_MATRIX_NH_BLOCKED_STEMS; },
        set(value) { COMPOSER_MATRIX_NH_BLOCKED_STEMS = value; },
    });
    Object.defineProperty(api, "COMPOSER_SERIAL_SUFFIX_SLOT_COUNT", {
        configurable: true,
        enumerable: true,
        get() { return COMPOSER_SERIAL_SUFFIX_SLOT_COUNT; },
        set(value) { COMPOSER_SERIAL_SUFFIX_SLOT_COUNT = value; },
    });
    Object.defineProperty(api, "COMPOSER_SERIAL_DEFAULT_SLOT_COUNT", {
        configurable: true,
        enumerable: true,
        get() { return COMPOSER_SERIAL_DEFAULT_SLOT_COUNT; },
        set(value) { COMPOSER_SERIAL_DEFAULT_SLOT_COUNT = value; },
    });
    Object.defineProperty(api, "COMPOSER_SERIAL_SLOT_PREF_BY_SLOT", {
        configurable: true,
        enumerable: true,
        get() { return COMPOSER_SERIAL_SLOT_PREF_BY_SLOT; },
        set(value) { COMPOSER_SERIAL_SLOT_PREF_BY_SLOT = value; },
    });
    Object.defineProperty(api, "COMPOSER_SERIAL_TYPE_OPTIONS", {
        configurable: true,
        enumerable: true,
        get() { return COMPOSER_SERIAL_TYPE_OPTIONS; },
        set(value) { COMPOSER_SERIAL_TYPE_OPTIONS = value; },
    });
    Object.defineProperty(api, "COMPOSER_SERIAL_SLOT_TYPE_BY_SLOT", {
        configurable: true,
        enumerable: true,
        get() { return COMPOSER_SERIAL_SLOT_TYPE_BY_SLOT; },
        set(value) { COMPOSER_SERIAL_SLOT_TYPE_BY_SLOT = value; },
    });
    api.dispatchAppEvent = dispatchAppEvent;
    Object.defineProperty(api, "COMPOSER_SLOT_CONFIG", {
        configurable: true,
        enumerable: true,
        get() { return COMPOSER_SLOT_CONFIG; },
        set(value) { COMPOSER_SLOT_CONFIG = value; },
    });
    Object.defineProperty(api, "COMPOSER_SLOT_KEYS", {
        configurable: true,
        enumerable: true,
        get() { return COMPOSER_SLOT_KEYS; },
        set(value) { COMPOSER_SLOT_KEYS = value; },
    });
    Object.defineProperty(api, "COMPOSER_SLOT_KEY_BY_TRANSITIVITY", {
        configurable: true,
        enumerable: true,
        get() { return COMPOSER_SLOT_KEY_BY_TRANSITIVITY; },
        set(value) { COMPOSER_SLOT_KEY_BY_TRANSITIVITY = value; },
    });
    Object.defineProperty(api, "ENTRADA_URL_SEGMENT_PREFIX", {
        configurable: true,
        enumerable: true,
        get() { return ENTRADA_URL_SEGMENT_PREFIX; },
        set(value) { ENTRADA_URL_SEGMENT_PREFIX = value; },
    });
    Object.defineProperty(api, "ENTRADA_URL_SEGMENT_VERSION", {
        configurable: true,
        enumerable: true,
        get() { return ENTRADA_URL_SEGMENT_VERSION; },
        set(value) { ENTRADA_URL_SEGMENT_VERSION = value; },
    });
    Object.defineProperty(api, "ENTRADA_URL_SEGMENT_SCHEMA", {
        configurable: true,
        enumerable: true,
        get() { return ENTRADA_URL_SEGMENT_SCHEMA; },
        set(value) { ENTRADA_URL_SEGMENT_SCHEMA = value; },
    });
    Object.defineProperty(api, "ENTRADA_URL_SEGMENT_FIELD_BY_SEGMENT", {
        configurable: true,
        enumerable: true,
        get() { return ENTRADA_URL_SEGMENT_FIELD_BY_SEGMENT; },
        set(value) { ENTRADA_URL_SEGMENT_FIELD_BY_SEGMENT = value; },
    });
    Object.defineProperty(api, "EntradaUrlSegmentSyncTimer", {
        configurable: true,
        enumerable: true,
        get() { return EntradaUrlSegmentSyncTimer; },
        set(value) { EntradaUrlSegmentSyncTimer = value; },
    });
    Object.defineProperty(api, "EntradaUrlSegmentsInitialized", {
        configurable: true,
        enumerable: true,
        get() { return EntradaUrlSegmentsInitialized; },
        set(value) { EntradaUrlSegmentsInitialized = value; },
    });
    Object.defineProperty(api, "IsApplyingEntradaUrlSegments", {
        configurable: true,
        enumerable: true,
        get() { return IsApplyingEntradaUrlSegments; },
        set(value) { IsApplyingEntradaUrlSegments = value; },
    });
    Object.defineProperty(api, "VerbComposerState", {
        configurable: true,
        enumerable: true,
        get() { return VerbComposerState; },
        set(value) { VerbComposerState = value; },
    });
    Object.defineProperty(api, "ComposerEmbedOpenState", {
        configurable: true,
        enumerable: true,
        get() { return ComposerEmbedOpenState; },
        set(value) { ComposerEmbedOpenState = value; },
    });
    Object.defineProperty(api, "ComposerEmbedPreviewState", {
        configurable: true,
        enumerable: true,
        get() { return ComposerEmbedPreviewState; },
        set(value) { ComposerEmbedPreviewState = value; },
    });
    Object.defineProperty(api, "LastComposerEscapeTs", {
        configurable: true,
        enumerable: true,
        get() { return LastComposerEscapeTs; },
        set(value) { LastComposerEscapeTs = value; },
    });
    Object.defineProperty(api, "LastComposerSpaceTs", {
        configurable: true,
        enumerable: true,
        get() { return LastComposerSpaceTs; },
        set(value) { LastComposerSpaceTs = value; },
    });
    Object.defineProperty(api, "ComposerMatrixAffixOpenSlot", {
        configurable: true,
        enumerable: true,
        get() { return ComposerMatrixAffixOpenSlot; },
        set(value) { ComposerMatrixAffixOpenSlot = value; },
    });
    Object.defineProperty(api, "VerbScreenAnsState", {
        configurable: true,
        enumerable: true,
        get() { return VerbScreenAnsState; },
        set(value) { VerbScreenAnsState = value; },
    });
    Object.defineProperty(api, "DERIVATIONAL_RULES", {
        configurable: true,
        enumerable: true,
        get() { return DERIVATIONAL_RULES; },
        set(value) { DERIVATIONAL_RULES = value; },
    });
    Object.defineProperty(api, "DERIVATIONAL_RULES_DOCS", {
        configurable: true,
        enumerable: true,
        get() { return DERIVATIONAL_RULES_DOCS; },
        set(value) { DERIVATIONAL_RULES_DOCS = value; },
    });
    Object.defineProperty(api, "VALENCE_NEUTRAL_RULES", {
        configurable: true,
        enumerable: true,
        get() { return VALENCE_NEUTRAL_RULES; },
        set(value) { VALENCE_NEUTRAL_RULES = value; },
    });
    Object.defineProperty(api, "OBJECT_MARKERS", {
        configurable: true,
        enumerable: true,
        get() { return OBJECT_MARKERS; },
        set(value) { OBJECT_MARKERS = value; },
    });
    Object.defineProperty(api, "FUSION_PREFIXES", {
        configurable: true,
        enumerable: true,
        get() { return FUSION_PREFIXES; },
        set(value) { FUSION_PREFIXES = value; },
    });
    Object.defineProperty(api, "NONANIMATE_NOUN_TENSES", {
        configurable: true,
        enumerable: true,
        get() { return NONANIMATE_NOUN_TENSES; },
        set(value) { NONANIMATE_NOUN_TENSES = value; },
    });
    Object.defineProperty(api, "SUBJECT_COMBINATIONS", {
        configurable: true,
        enumerable: true,
        get() { return SUBJECT_COMBINATIONS; },
        set(value) { SUBJECT_COMBINATIONS = value; },
    });
    Object.defineProperty(api, "SUBJECT_PERSON_GROUPS", {
        configurable: true,
        enumerable: true,
        get() { return SUBJECT_PERSON_GROUPS; },
        set(value) { SUBJECT_PERSON_GROUPS = value; },
    });
    Object.defineProperty(api, "SUBJECT_PERSON_NUMBER_ORDER", {
        configurable: true,
        enumerable: true,
        get() { return SUBJECT_PERSON_NUMBER_ORDER; },
        set(value) { SUBJECT_PERSON_NUMBER_ORDER = value; },
    });
    Object.defineProperty(api, "SUBJECT_TOGGLE_ALL", {
        configurable: true,
        enumerable: true,
        get() { return SUBJECT_TOGGLE_ALL; },
        set(value) { SUBJECT_TOGGLE_ALL = value; },
    });
    Object.defineProperty(api, "OBJECT_TOGGLE_ALL", {
        configurable: true,
        enumerable: true,
        get() { return OBJECT_TOGGLE_ALL; },
        set(value) { OBJECT_TOGGLE_ALL = value; },
    });
    Object.defineProperty(api, "SUSTANTIVO_VERBAL_TRANSITIVE_PREFIXES", {
        configurable: true,
        enumerable: true,
        get() { return SUSTANTIVO_VERBAL_TRANSITIVE_PREFIXES; },
        set(value) { SUSTANTIVO_VERBAL_TRANSITIVE_PREFIXES = value; },
    });
    Object.defineProperty(api, "SUSTANTIVO_VERBAL_PREFIXES", {
        configurable: true,
        enumerable: true,
        get() { return SUSTANTIVO_VERBAL_PREFIXES; },
        set(value) { SUSTANTIVO_VERBAL_PREFIXES = value; },
    });
    Object.defineProperty(api, "POSSESSIVE_PREFIXES", {
        configurable: true,
        enumerable: true,
        get() { return POSSESSIVE_PREFIXES; },
        set(value) { POSSESSIVE_PREFIXES = value; },
    });
    Object.defineProperty(api, "POSSESSIVE_PREFIX_LABELS", {
        configurable: true,
        enumerable: true,
        get() { return POSSESSIVE_PREFIX_LABELS; },
        set(value) { POSSESSIVE_PREFIX_LABELS = value; },
    });
    Object.defineProperty(api, "POSSESSOR_LABELS", {
        configurable: true,
        enumerable: true,
        get() { return POSSESSOR_LABELS; },
        set(value) { POSSESSOR_LABELS = value; },
    });
    Object.defineProperty(api, "POSSESSIVE_TO_OBJECT_PREFIX", {
        configurable: true,
        enumerable: true,
        get() { return POSSESSIVE_TO_OBJECT_PREFIX; },
        set(value) { POSSESSIVE_TO_OBJECT_PREFIX = value; },
    });
    Object.defineProperty(api, "OBJECT_LABELS", {
        configurable: true,
        enumerable: true,
        get() { return OBJECT_LABELS; },
        set(value) { OBJECT_LABELS = value; },
    });
    Object.defineProperty(api, "OBJECT_ROLE_LABELS", {
        configurable: true,
        enumerable: true,
        get() { return OBJECT_ROLE_LABELS; },
        set(value) { OBJECT_ROLE_LABELS = value; },
    });
    Object.defineProperty(api, "NOUN_OBJECT_LABELS", {
        configurable: true,
        enumerable: true,
        get() { return NOUN_OBJECT_LABELS; },
        set(value) { NOUN_OBJECT_LABELS = value; },
    });
    Object.defineProperty(api, "VERB_BLOCK_LABELS", {
        configurable: true,
        enumerable: true,
        get() { return VERB_BLOCK_LABELS; },
        set(value) { VERB_BLOCK_LABELS = value; },
    });
    Object.defineProperty(api, "NONACTIVE_GENERIC_LABELS", {
        configurable: true,
        enumerable: true,
        get() { return NONACTIVE_GENERIC_LABELS; },
        set(value) { NONACTIVE_GENERIC_LABELS = value; },
    });
    Object.defineProperty(api, "NONACTIVE_PERSON_SUB_LABELS", {
        configurable: true,
        enumerable: true,
        get() { return NONACTIVE_PERSON_SUB_LABELS; },
        set(value) { NONACTIVE_PERSON_SUB_LABELS = value; },
    });
    Object.defineProperty(api, "NONACTIVE_PERSON_CATEGORY_LABELS", {
        configurable: true,
        enumerable: true,
        get() { return NONACTIVE_PERSON_CATEGORY_LABELS; },
        set(value) { NONACTIVE_PERSON_CATEGORY_LABELS = value; },
    });
    Object.defineProperty(api, "PERSON_GROUP_LABELS", {
        configurable: true,
        enumerable: true,
        get() { return PERSON_GROUP_LABELS; },
        set(value) { PERSON_GROUP_LABELS = value; },
    });
    Object.defineProperty(api, "PERSON_SUB_LABELS", {
        configurable: true,
        enumerable: true,
        get() { return PERSON_SUB_LABELS; },
        set(value) { PERSON_SUB_LABELS = value; },
    });
    Object.defineProperty(api, "TOGGLE_LABELS", {
        configurable: true,
        enumerable: true,
        get() { return TOGGLE_LABELS; },
        set(value) { TOGGLE_LABELS = value; },
    });
    Object.defineProperty(api, "PLACEHOLDER_LABELS", {
        configurable: true,
        enumerable: true,
        get() { return PLACEHOLDER_LABELS; },
        set(value) { PLACEHOLDER_LABELS = value; },
    });
    Object.defineProperty(api, "PATIENTIVO_OWNERSHIP_LABELS", {
        configurable: true,
        enumerable: true,
        get() { return PATIENTIVO_OWNERSHIP_LABELS; },
        set(value) { PATIENTIVO_OWNERSHIP_LABELS = value; },
    });
    Object.defineProperty(api, "NUMBER_LABELS", {
        configurable: true,
        enumerable: true,
        get() { return NUMBER_LABELS; },
        set(value) { NUMBER_LABELS = value; },
    });
    Object.defineProperty(api, "ADJECTIVE_DISTRIBUTIVE_PLURAL_SUB_LABELS", {
        configurable: true,
        enumerable: true,
        get() { return ADJECTIVE_DISTRIBUTIVE_PLURAL_SUB_LABELS; },
        set(value) { ADJECTIVE_DISTRIBUTIVE_PLURAL_SUB_LABELS = value; },
    });
    Object.defineProperty(api, "VOICE_MODE", {
        configurable: true,
        enumerable: true,
        get() { return VOICE_MODE; },
        set(value) { VOICE_MODE = value; },
    });
    Object.defineProperty(api, "PASSIVE_IMPERSONAL_SUBJECT_MAP", {
        configurable: true,
        enumerable: true,
        get() { return PASSIVE_IMPERSONAL_SUBJECT_MAP; },
        set(value) { PASSIVE_IMPERSONAL_SUBJECT_MAP = value; },
    });
    Object.defineProperty(api, "PASSIVE_IMPERSONAL_DIRECT_OBJECTS", {
        configurable: true,
        enumerable: true,
        get() { return PASSIVE_IMPERSONAL_DIRECT_OBJECTS; },
        set(value) { PASSIVE_IMPERSONAL_DIRECT_OBJECTS = value; },
    });
    Object.defineProperty(api, "DERIVATION_MODE", {
        configurable: true,
        enumerable: true,
        get() { return DERIVATION_MODE; },
        set(value) { DERIVATION_MODE = value; },
    });
    Object.defineProperty(api, "NONACTIVE_SUFFIX_ORDER", {
        configurable: true,
        enumerable: true,
        get() { return NONACTIVE_SUFFIX_ORDER; },
        set(value) { NONACTIVE_SUFFIX_ORDER = value; },
    });
    Object.defineProperty(api, "NONACTIVE_SUFFIX_LABELS", {
        configurable: true,
        enumerable: true,
        get() { return NONACTIVE_SUFFIX_LABELS; },
        set(value) { NONACTIVE_SUFFIX_LABELS = value; },
    });
    Object.defineProperty(api, "NONACTIVE_SUFFIX_DESCRIPTIONS", {
        configurable: true,
        enumerable: true,
        get() { return NONACTIVE_SUFFIX_DESCRIPTIONS; },
        set(value) { NONACTIVE_SUFFIX_DESCRIPTIONS = value; },
    });
    Object.defineProperty(api, "NONACTIVE_PREFIX_LABEL", {
        configurable: true,
        enumerable: true,
        get() { return NONACTIVE_PREFIX_LABEL; },
        set(value) { NONACTIVE_PREFIX_LABEL = value; },
    });
    Object.defineProperty(api, "COMBINED_MODE", {
        configurable: true,
        enumerable: true,
        get() { return COMBINED_MODE; },
        set(value) { COMBINED_MODE = value; },
    });
    Object.defineProperty(api, "INSTRUMENTIVO_MODE", {
        configurable: true,
        enumerable: true,
        get() { return INSTRUMENTIVO_MODE; },
        set(value) { INSTRUMENTIVO_MODE = value; },
    });
    Object.defineProperty(api, "TENSE_MODE", {
        configurable: true,
        enumerable: true,
        get() { return TENSE_MODE; },
        set(value) { TENSE_MODE = value; },
    });
    Object.defineProperty(api, "TENSE_ORDER", {
        configurable: true,
        enumerable: true,
        get() { return TENSE_ORDER; },
        set(value) { TENSE_ORDER = value; },
    });
    Object.defineProperty(api, "TENSE_LABELS", {
        configurable: true,
        enumerable: true,
        get() { return TENSE_LABELS; },
        set(value) { TENSE_LABELS = value; },
    });
    Object.defineProperty(api, "UI_LABELS", {
        configurable: true,
        enumerable: true,
        get() { return UI_LABELS; },
        set(value) { UI_LABELS = value; },
    });
    Object.defineProperty(api, "ADJECTIVE_ACTIVE_TENSE_IDS", {
        configurable: true,
        enumerable: true,
        get() { return ADJECTIVE_ACTIVE_TENSE_IDS; },
        set(value) { ADJECTIVE_ACTIVE_TENSE_IDS = value; },
    });
    Object.defineProperty(api, "PATIENTIVO_ADJECTIVE_TENSE_IDS", {
        configurable: true,
        enumerable: true,
        get() { return PATIENTIVO_ADJECTIVE_TENSE_IDS; },
        set(value) { PATIENTIVO_ADJECTIVE_TENSE_IDS = value; },
    });
    Object.defineProperty(api, "PATIENTIVO_ADJECTIVE_TENSE_ORDER", {
        configurable: true,
        enumerable: true,
        get() { return PATIENTIVO_ADJECTIVE_TENSE_ORDER; },
        set(value) { PATIENTIVO_ADJECTIVE_TENSE_ORDER = value; },
    });
    Object.defineProperty(api, "PATIENTIVO_ADJECTIVE_TENSE_SET", {
        configurable: true,
        enumerable: true,
        get() { return PATIENTIVO_ADJECTIVE_TENSE_SET; },
        set(value) { PATIENTIVO_ADJECTIVE_TENSE_SET = value; },
    });
    Object.defineProperty(api, "PATIENTIVO_ADJECTIVE_SOURCE_BY_TENSE", {
        configurable: true,
        enumerable: true,
        get() { return PATIENTIVO_ADJECTIVE_SOURCE_BY_TENSE; },
        set(value) { PATIENTIVO_ADJECTIVE_SOURCE_BY_TENSE = value; },
    });
    Object.defineProperty(api, "ACTIVE_ADJECTIVE_TENSE_ORDER", {
        configurable: true,
        enumerable: true,
        get() { return ACTIVE_ADJECTIVE_TENSE_ORDER; },
        set(value) { ACTIVE_ADJECTIVE_TENSE_ORDER = value; },
    });
    Object.defineProperty(api, "ACTIVE_ADJECTIVE_TENSE_SET", {
        configurable: true,
        enumerable: true,
        get() { return ACTIVE_ADJECTIVE_TENSE_SET; },
        set(value) { ACTIVE_ADJECTIVE_TENSE_SET = value; },
    });
    Object.defineProperty(api, "ACTIVE_ADJECTIVE_TAB_TENSE_ORDER", {
        configurable: true,
        enumerable: true,
        get() { return ACTIVE_ADJECTIVE_TAB_TENSE_ORDER; },
        set(value) { ACTIVE_ADJECTIVE_TAB_TENSE_ORDER = value; },
    });
    Object.defineProperty(api, "ACTIVE_ADJECTIVE_TAB_TENSE_SET", {
        configurable: true,
        enumerable: true,
        get() { return ACTIVE_ADJECTIVE_TAB_TENSE_SET; },
        set(value) { ACTIVE_ADJECTIVE_TAB_TENSE_SET = value; },
    });
    Object.defineProperty(api, "NONACTIVE_ADJECTIVE_TAB_TENSE_ORDER", {
        configurable: true,
        enumerable: true,
        get() { return NONACTIVE_ADJECTIVE_TAB_TENSE_ORDER; },
        set(value) { NONACTIVE_ADJECTIVE_TAB_TENSE_ORDER = value; },
    });
    Object.defineProperty(api, "NONACTIVE_ADJECTIVE_TAB_TENSE_SET", {
        configurable: true,
        enumerable: true,
        get() { return NONACTIVE_ADJECTIVE_TAB_TENSE_SET; },
        set(value) { NONACTIVE_ADJECTIVE_TAB_TENSE_SET = value; },
    });
    Object.defineProperty(api, "ADJECTIVE_TAB_TENSE_ORDER", {
        configurable: true,
        enumerable: true,
        get() { return ADJECTIVE_TAB_TENSE_ORDER; },
        set(value) { ADJECTIVE_TAB_TENSE_ORDER = value; },
    });
    Object.defineProperty(api, "TRONCO_ACTIVE_ADJECTIVE_TENSE_SET", {
        configurable: true,
        enumerable: true,
        get() { return TRONCO_ACTIVE_ADJECTIVE_TENSE_SET; },
        set(value) { TRONCO_ACTIVE_ADJECTIVE_TENSE_SET = value; },
    });
    Object.defineProperty(api, "TRONCO_NAJ_ACTIVE_ADJECTIVE_TENSE_SET", {
        configurable: true,
        enumerable: true,
        get() { return TRONCO_NAJ_ACTIVE_ADJECTIVE_TENSE_SET; },
        set(value) { TRONCO_NAJ_ACTIVE_ADJECTIVE_TENSE_SET = value; },
    });
    Object.defineProperty(api, "INTRANSITIVE_ONLY_ACTIVE_ADJECTIVE_TENSE_SET", {
        configurable: true,
        enumerable: true,
        get() { return INTRANSITIVE_ONLY_ACTIVE_ADJECTIVE_TENSE_SET; },
        set(value) { INTRANSITIVE_ONLY_ACTIVE_ADJECTIVE_TENSE_SET = value; },
    });
    Object.defineProperty(api, "PERFECT_ACTIVE_ADJECTIVE_TENSE_SET", {
        configurable: true,
        enumerable: true,
        get() { return PERFECT_ACTIVE_ADJECTIVE_TENSE_SET; },
        set(value) { PERFECT_ACTIVE_ADJECTIVE_TENSE_SET = value; },
    });
    api.getInjectedRuntimeConfigPaths = getInjectedRuntimeConfigPaths;
    Object.defineProperty(api, "RUNTIME_PATHS", {
        configurable: true,
        enumerable: true,
        get() { return RUNTIME_PATHS; },
        set(value) { RUNTIME_PATHS = value; },
    });
    Object.defineProperty(api, "STATIC_LABELS_PATH", {
        configurable: true,
        enumerable: true,
        get() { return STATIC_LABELS_PATH; },
        set(value) { STATIC_LABELS_PATH = value; },
    });
    Object.defineProperty(api, "STATIC_OPTIONS_PATH", {
        configurable: true,
        enumerable: true,
        get() { return STATIC_OPTIONS_PATH; },
        set(value) { STATIC_OPTIONS_PATH = value; },
    });
    Object.defineProperty(api, "STATIC_GROUPS_PATH", {
        configurable: true,
        enumerable: true,
        get() { return STATIC_GROUPS_PATH; },
        set(value) { STATIC_GROUPS_PATH = value; },
    });
    Object.defineProperty(api, "STATIC_ORDERS_PATH", {
        configurable: true,
        enumerable: true,
        get() { return STATIC_ORDERS_PATH; },
        set(value) { STATIC_ORDERS_PATH = value; },
    });
    Object.defineProperty(api, "STATIC_RULES_PATH", {
        configurable: true,
        enumerable: true,
        get() { return STATIC_RULES_PATH; },
        set(value) { STATIC_RULES_PATH = value; },
    });
    Object.defineProperty(api, "STATIC_PHONOLOGY_PATH", {
        configurable: true,
        enumerable: true,
        get() { return STATIC_PHONOLOGY_PATH; },
        set(value) { STATIC_PHONOLOGY_PATH = value; },
    });
    Object.defineProperty(api, "STATIC_MODES_PATH", {
        configurable: true,
        enumerable: true,
        get() { return STATIC_MODES_PATH; },
        set(value) { STATIC_MODES_PATH = value; },
    });
    Object.defineProperty(api, "STATIC_MISC_PATH", {
        configurable: true,
        enumerable: true,
        get() { return STATIC_MISC_PATH; },
        set(value) { STATIC_MISC_PATH = value; },
    });
    Object.defineProperty(api, "STATIC_REDUP_PATH", {
        configurable: true,
        enumerable: true,
        get() { return STATIC_REDUP_PATH; },
        set(value) { STATIC_REDUP_PATH = value; },
    });
    Object.defineProperty(api, "STATIC_CONSTANTS_PATH", {
        configurable: true,
        enumerable: true,
        get() { return STATIC_CONSTANTS_PATH; },
        set(value) { STATIC_CONSTANTS_PATH = value; },
    });
    Object.defineProperty(api, "STATIC_DIRECTIONAL_RULES_PATH", {
        configurable: true,
        enumerable: true,
        get() { return STATIC_DIRECTIONAL_RULES_PATH; },
        set(value) { STATIC_DIRECTIONAL_RULES_PATH = value; },
    });
    Object.defineProperty(api, "STATIC_ALLOMORPHY_RULES_PATH", {
        configurable: true,
        enumerable: true,
        get() { return STATIC_ALLOMORPHY_RULES_PATH; },
        set(value) { STATIC_ALLOMORPHY_RULES_PATH = value; },
    });
    Object.defineProperty(api, "STATIC_PARSE_TESTS_PATH", {
        configurable: true,
        enumerable: true,
        get() { return STATIC_PARSE_TESTS_PATH; },
        set(value) { STATIC_PARSE_TESTS_PATH = value; },
    });
    Object.defineProperty(api, "STATIC_DERIVATIONAL_RULES_PATH", {
        configurable: true,
        enumerable: true,
        get() { return STATIC_DERIVATIONAL_RULES_PATH; },
        set(value) { STATIC_DERIVATIONAL_RULES_PATH = value; },
    });
    Object.defineProperty(api, "STATIC_VALENCE_NEUTRAL_PATH", {
        configurable: true,
        enumerable: true,
        get() { return STATIC_VALENCE_NEUTRAL_PATH; },
        set(value) { STATIC_VALENCE_NEUTRAL_PATH = value; },
    });
    Object.defineProperty(api, "TENSE_DESCRIPTIONS", {
        configurable: true,
        enumerable: true,
        get() { return TENSE_DESCRIPTIONS; },
        set(value) { TENSE_DESCRIPTIONS = value; },
    });
    Object.defineProperty(api, "DERIVATION_TYPE", {
        configurable: true,
        enumerable: true,
        get() { return DERIVATION_TYPE; },
        set(value) { DERIVATION_TYPE = value; },
    });
    Object.defineProperty(api, "mergeLabelMap", {
        configurable: true,
        enumerable: true,
        get() { return mergeLabelMap; },
        set(value) { mergeLabelMap = value; },
    });
    Object.defineProperty(api, "mergeNumberLabels", {
        configurable: true,
        enumerable: true,
        get() { return mergeNumberLabels; },
        set(value) { mergeNumberLabels = value; },
    });
    return api;
}

export function installUiComposerGlobals(
    targetObject = globalThis,
    installationContext = {},
) {
    const composerTarget = Object.create(targetObject);
    Object.defineProperties(
      composerTarget,
      Object.getOwnPropertyDescriptors(
        installationContext?.moduleDependencyCapabilities || {},
      ),
    );
    const api = createUiComposerRuntime(composerTarget);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
