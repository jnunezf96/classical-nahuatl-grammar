// Canonical modern ESM module.

export function createUiExportApi(targetObject = globalThis) {
  function escapeCSVValue(value = "") {
    const raw = String(value ?? "");
    return /[",\n]/u.test(raw)
      ? `"${raw.replace(/"/gu, "\"\"")}"`
      : raw;
  }

  function normalizeUnifiedVerbOutputObjectSlotCount(value = 0) {
    if (!Number.isFinite(value)) {
      return 0;
    }
    return Math.max(
      0,
      Math.min(targetObject.VERB_OBJECT_SLOT_SCHEMA.length, Number(value)),
    );
  }

  function normalizeUnifiedVerbOutputBooleanText(value = "") {
    if (value === true || value === false) {
      return String(value);
    }
    const text = String(value || "").trim();
    return ["true", "false"].includes(text) ? text : "";
  }

  function getUnifiedVerbOutputGrammarFrame(source = null) {
    if (!source || typeof source !== "object") {
      return null;
    }
    const nestedResults = [
      source.canonicalResult,
      source.result && typeof source.result === "object" ? source.result : null,
    ].filter(Boolean);
    const candidates = [
      source.grammarFrame,
      source.frames,
      ...nestedResults.flatMap(result => [result.grammarFrame, result.frames]),
    ];
    return candidates.find(candidate => (
      candidate
      && typeof targetObject.isIssuedGrammarFrame === "function"
      && targetObject.isIssuedGrammarFrame(candidate)
    )) || null;
  }

  function getUnifiedVerbOutputResultFrame(source = null) {
    return getUnifiedVerbOutputGrammarFrame(source)?.resultFrame || null;
  }

  function getUnifiedVerbOutputSurfaceForms(source = null) {
    const grammarFrame = getUnifiedVerbOutputGrammarFrame(source);
    return grammarFrame
      && typeof targetObject.getIssuedGrammarFrameCanonicalSurfaceForms
        === "function"
      ? targetObject.getIssuedGrammarFrameCanonicalSurfaceForms(grammarFrame)
      : [];
  }

  function getUnifiedVerbOutputFormulaSurfacePairs(source = null) {
    const grammarFrame = getUnifiedVerbOutputGrammarFrame(source);
    return grammarFrame
      && typeof targetObject.getIssuedGrammarFrameCanonicalFormulaSurfacePairs
        === "function"
      ? targetObject.getIssuedGrammarFrameCanonicalFormulaSurfacePairs(
        grammarFrame,
      )
      : [];
  }

  function getUnifiedVerbOutputForm(source = null) {
    return getUnifiedVerbOutputSurfaceForms(source).join(" / ");
  }

  function normalizeUnifiedVerbOutputGrammarMetadata(source = null) {
    const grammarFrame = getUnifiedVerbOutputGrammarFrame(source);
    if (!grammarFrame) {
      return null;
    }
    const authorityFrame = grammarFrame.authorityFrame || {};
    const routeContract = grammarFrame.routeContract || {};
    const diagnosticFrame = grammarFrame.diagnosticFrame || {};
    const resultFrame = grammarFrame.resultFrame || {};
    const sourceEvidence = authorityFrame.sourceEvidence || {};
    const pairs = getUnifiedVerbOutputFormulaSurfacePairs({
      grammarFrame,
    });
    const joinPairField = key => (
      pairs.map(pair => String(pair?.[key] || "").trim())
        .filter(Boolean)
        .join(" | ")
    );
    const primaryDiagnostic = (
      Array.isArray(diagnosticFrame.diagnostics)
        ? diagnosticFrame.diagnostics
        : []
    ).find(Boolean) || {};
    return Object.freeze({
      grammarAuthorityRef: (
        Array.isArray(authorityFrame.andrewsRefs)
          ? authorityFrame.andrewsRefs[0]
          : ""
      ) || "",
      grammarAuthorityRefs: (
        Array.isArray(authorityFrame.andrewsRefs)
          ? authorityFrame.andrewsRefs
          : []
      ).join("|"),
      grammarEvidenceStatus: String(
        authorityFrame.evidenceStatus || "",
      ),
      grammarOrthographyRef: (
        Array.isArray(authorityFrame.orthographyRefs)
          ? authorityFrame.orthographyRefs[0]
          : ""
      ) || "",
      grammarOrthographyRefs: (
        Array.isArray(authorityFrame.orthographyRefs)
          ? authorityFrame.orthographyRefs
          : []
      ).join("|"),
      grammarSourceEvidenceKind: String(
        sourceEvidence.kind || sourceEvidence.sourceKind || "",
      ),
      grammarSourceEvidenceStatus: String(
        sourceEvidence.status || sourceEvidence.evidenceStatus || "",
      ),
      grammarSourceEvidenceTargetAuthority: String(
        sourceEvidence.targetAuthority || "",
      ),
      grammarSourceEvidenceSource: String(
        sourceEvidence.evidenceSource || sourceEvidence.contextSource || "",
      ),
      grammarSourceEvidenceFlags: Object.entries(
        sourceEvidence.boundaries || {},
      ).filter(([, value]) => value === true).map(([key]) => key).sort()
        .join("|"),
      grammarUnitKind: String(grammarFrame.unitFrame?.unitKind || ""),
      grammarRouteFamily: String(routeContract.routeFamily || ""),
      grammarRouteStage: String(routeContract.routeStage || ""),
      grammarGenerationAllowed: normalizeUnifiedVerbOutputBooleanText(
        routeContract.generationAllowed,
      ),
      grammarDiagnosticStatus: String(diagnosticFrame.status || ""),
      grammarDiagnosticId: String(
        primaryDiagnostic.id || primaryDiagnostic.code || "",
      ),
      grammarDiagnosticLayer: String(primaryDiagnostic.failedLayer || ""),
      grammarDiagnosticContractLayer: String(
        primaryDiagnostic.contractLayer || "",
      ),
      grammarResultOk: normalizeUnifiedVerbOutputBooleanText(resultFrame.ok),
      sourceFormulaEcho: joinPairField("sourceFormulaEcho"),
      andrewsFormulaEcho: joinPairField("andrewsFormulaEcho"),
      targetFormulaEcho: joinPairField("targetFormulaEcho"),
      conjugatorFormulaEcho: joinPairField("conjugatorFormulaEcho"),
      sourceToTargetFormulaEcho: joinPairField(
        "sourceToTargetFormulaEcho",
      ),
      andrewsToConjugatorFormulaEcho: joinPairField(
        "andrewsToConjugatorFormulaEcho",
      ),
      formulaSurfacePairs: pairs.map(pair => (
        `${pair.surface}=>${pair.andrewsFormulaEcho}`
        + `=>${pair.conjugatorFormulaEcho}`
      )).join(" | "),
    });
  }

  function normalizeUnifiedVerbOutputEntry(entry = {}, defaults = {}) {
    const source = entry && typeof entry === "object" ? entry : {};
    const grammarFrame = getUnifiedVerbOutputGrammarFrame(source);
    const grammarMetadata = normalizeUnifiedVerbOutputGrammarMetadata({
      grammarFrame,
    });
    const form = getUnifiedVerbOutputForm({
      grammarFrame,
    });
    if (!grammarFrame || !grammarMetadata || !form) {
      return null;
    }
    const normalized = {
      tenseValue: String(source.tenseValue || defaults.tenseValue || ""),
      groupKey: String(source.groupKey || defaults.groupKey || ""),
      sourceMode: source.sourceMode === targetObject.COMBINED_MODE.nonactive
        ? targetObject.COMBINED_MODE.nonactive
        : targetObject.COMBINED_MODE.active,
      block: String(source.block || ""),
      person: String(source.person || ""),
      personSub: String(source.personSub || ""),
      subjectToggle: String(source.subjectToggle || ""),
      object: targetObject.getZeroObjectDisplayValue(source.object || ""),
      object2: targetObject.getZeroObjectDisplayValue(source.object2 || ""),
      object3: targetObject.getZeroObjectDisplayValue(source.object3 || ""),
      form,
      objectSlotCount: normalizeUnifiedVerbOutputObjectSlotCount(
        source.objectSlotCount ?? defaults.objectSlotCount ?? 0,
      ),
      ...grammarMetadata,
    };
    if (!normalized.objectSlotCount) {
      normalized.objectSlotCount = normalizeUnifiedVerbOutputObjectSlotCount(
        targetObject.VERB_OBJECT_SLOT_SCHEMA.reduce(
          (count, slot, index) => (
            normalized[slot.id] ? Math.max(count, index + 1) : count
          ),
          0,
        ),
      );
    }
    Object.defineProperty(normalized, "grammarFrame", {
      configurable: false,
      enumerable: false,
      value: grammarFrame,
    });
    return Object.freeze(normalized);
  }

  function projectUnifiedVerbOutputVisibleRow(row = null) {
    if (!row || !getUnifiedVerbOutputGrammarFrame(row)) {
      return null;
    }
    return Object.freeze({
      subjectToggle: row.subjectToggle,
      sourceMode: row.sourceMode,
      block: row.block,
      person: row.person,
      personSub: row.personSub,
      value: row.form,
      objectSlotCount: row.objectSlotCount,
      objectToggle: row.object,
      objectToggle2: row.object2,
      objectToggle3: row.object3,
      ...normalizeUnifiedVerbOutputGrammarMetadata(row),
    });
  }

  function buildUnifiedVerbOutputBaseKey(entry = {}) {
    return [
      entry.groupKey,
      entry.tenseValue,
      entry.block,
      entry.person,
      entry.personSub,
      entry.subjectToggle,
      entry.object,
      entry.object2,
      entry.object3,
    ].join("|");
  }

  function buildUnifiedVerbOutputSourceKey(entry = {}) {
    return `${buildUnifiedVerbOutputBaseKey(entry)}|`
      + `${entry.sourceMode || targetObject.COMBINED_MODE.active}`;
  }

  function setUnifiedVerbOutputDatasetRows(rows = [], defaults = {}) {
    const normalizedRows = (Array.isArray(rows) ? rows : [])
      .map(entry => normalizeUnifiedVerbOutputEntry(entry, defaults))
      .filter(Boolean);
    const bySourceKey = new Map();
    const grouped = new Map();
    normalizedRows.forEach(entry => {
      const baseKey = buildUnifiedVerbOutputBaseKey(entry);
      bySourceKey.set(buildUnifiedVerbOutputSourceKey(entry), entry);
      const group = grouped.get(baseKey) || {};
      group[entry.sourceMode] = entry;
      grouped.set(baseKey, group);
    });
    targetObject.VerbUnifiedOutputState.rows = normalizedRows;
    targetObject.VerbUnifiedOutputState.bySourceKey = bySourceKey;
    targetObject.VerbUnifiedOutputState.grouped = grouped;
    targetObject.VerbUnifiedOutputState.updatedAt = Date.now();
    return normalizedRows;
  }

  function collectStructuredUnifiedVerbOutputRows(
    container = null,
    defaults = {},
  ) {
    if (!container || typeof container.querySelectorAll !== "function") {
      return [];
    }
    return Array.from(container.querySelectorAll(".tense-block"))
      .flatMap(block => (
        Array.isArray(block.__outputRows) ? block.__outputRows : []
      ))
      .map(entry => normalizeUnifiedVerbOutputEntry(entry, defaults))
      .filter(Boolean);
  }

  function collectVisibleConjugationRows() {
    return (Array.isArray(targetObject.VerbUnifiedOutputState.rows)
      ? targetObject.VerbUnifiedOutputState.rows
      : []
    ).map(projectUnifiedVerbOutputVisibleRow).filter(Boolean);
  }

  function getViewExportSourceModeLabel(
    sourceMode = "",
    classicalLocaleContext = false,
  ) {
    const key = sourceMode === targetObject.COMBINED_MODE.nonactive
      ? "tense-tabs-mode-nonactive"
      : "tense-tabs-mode-active";
    const fallback = sourceMode === targetObject.COMBINED_MODE.nonactive
      ? "nonactive"
      : "active";
    return targetObject.getLocalizedLabel(
      targetObject.UI_LABELS[key],
      classicalLocaleContext,
      fallback,
    );
  }

  function getViewExportObjectHeaders(
    objectSlotCount = 0,
    classicalLocaleContext = false,
  ) {
    const count = normalizeUnifiedVerbOutputObjectSlotCount(objectSlotCount);
    return targetObject.VERB_OBJECT_SLOT_SCHEMA.slice(0, count).map(slot => (
      count >= 2
        ? targetObject.getValence3PlusSlotRoleLabel(
          slot.id,
          classicalLocaleContext,
        ) || slot.exportHeader
        : slot.exportHeader
    ));
  }

  function buildViewExportCSV() {
    const rows = collectVisibleConjugationRows();
    if (!rows.length) {
      return "";
    }
    const verbInput = targetObject.document.getElementById("verb");
    const derivationSelect = targetObject.document.getElementById(
      "derivation-type",
    );
    const inputValue = String(verbInput?.value || "").trim();
    const derivationValue = String(derivationSelect?.value || "").trim();
    const classicalLocaleContext = targetObject.getClassicalLocaleContext();
    const objectSlotCount = rows.reduce(
      (maximum, row) => Math.max(maximum, row.objectSlotCount || 0),
      0,
    );
    const slots = targetObject.VERB_OBJECT_SLOT_SCHEMA.slice(
      0,
      objectSlotCount,
    );
    const header = [
      "input",
      "derivation",
      "subject",
      ...getViewExportObjectHeaders(
        objectSlotCount,
        classicalLocaleContext,
      ),
      "source",
      "block",
      "person",
      "written form",
      "source formula",
      "Andrews formula",
      "complete formula",
      "formula route",
      "Andrews to result",
      "written-formula pairs",
      "contract route",
      "contract stage",
      "generation",
      "Andrews",
      "evidence status",
      "Classical realization",
      "diagnostic",
      "result contract",
    ];
    const lines = rows.map(row => [
      inputValue,
      derivationValue,
      row.subjectToggle,
      ...slots.map(slot => row[`objectToggle${slot.id === "object" ? "" : slot.id.slice(-1)}`] || ""),
      getViewExportSourceModeLabel(
        row.sourceMode,
        classicalLocaleContext,
      ),
      row.block,
      row.person,
      row.value,
      row.sourceFormulaEcho,
      row.andrewsFormulaEcho,
      row.conjugatorFormulaEcho,
      row.sourceToTargetFormulaEcho,
      row.andrewsToConjugatorFormulaEcho,
      row.formulaSurfacePairs,
      row.grammarRouteFamily,
      row.grammarRouteStage,
      row.grammarGenerationAllowed,
      row.grammarAuthorityRefs || row.grammarAuthorityRef,
      row.grammarEvidenceStatus,
      row.grammarOrthographyRefs || row.grammarOrthographyRef,
      row.grammarDiagnosticId,
      row.grammarResultOk,
    ].map(escapeCSVValue).join(","));
    return [header.map(escapeCSVValue).join(","), ...lines].join("\n");
  }

  function downloadViewExportCSV() {
    const csvText = buildViewExportCSV();
    if (!csvText) {
      return false;
    }
    const blob = new targetObject.Blob([csvText], {
      type: "text/csv;charset=utf-8",
    });
    const url = targetObject.URL.createObjectURL(blob);
    const link = targetObject.document.createElement("a");
    link.href = url;
    link.download = "classical-nahuatl-results.csv";
    targetObject.document.body.appendChild(link);
    link.click();
    link.remove();
    targetObject.window.setTimeout(
      () => targetObject.URL.revokeObjectURL(url),
      0,
    );
    return true;
  }

  function initViewExport() {
    const button = targetObject.document.getElementById("view-export-csv");
    if (button) {
      button.addEventListener("click", downloadViewExportCSV);
    }
  }

  return Object.freeze({
    escapeCSVValue,
    normalizeUnifiedVerbOutputObjectSlotCount,
    normalizeUnifiedVerbOutputBooleanText,
    getUnifiedVerbOutputGrammarFrame,
    getUnifiedVerbOutputResultFrame,
    getUnifiedVerbOutputSurfaceForms,
    getUnifiedVerbOutputFormulaSurfacePairs,
    getUnifiedVerbOutputForm,
    normalizeUnifiedVerbOutputGrammarMetadata,
    normalizeUnifiedVerbOutputEntry,
    projectUnifiedVerbOutputVisibleRow,
    buildUnifiedVerbOutputBaseKey,
    buildUnifiedVerbOutputSourceKey,
    setUnifiedVerbOutputDatasetRows,
    collectStructuredUnifiedVerbOutputRows,
    collectVisibleConjugationRows,
    getViewExportSourceModeLabel,
    getViewExportObjectHeaders,
    buildViewExportCSV,
    downloadViewExportCSV,
    initViewExport,
  });
}

export function installUiExportGlobals(targetObject = globalThis) {
  const api = createUiExportApi(targetObject);
  Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
  return api;
}
