// Source admission uses the existing Canvas class contract; it never chooses
// between the grammatical analyses that contract leaves to the user.
export function getVncSourceClassRequirement(runtime, state = null) {
  if (runtime.getClassicalBasalUnitFromRuntime?.() !== "vnc") return null;
  state ||= runtime.getClassicalSourcePartControlState?.();
  if (!state) return null;
  const compound = state.mode === "embed-matrix";
  const stem = String(compound
    ? [state.sourceEmbedStem, state.sourceMatrixStem].filter(Boolean).join("-")
    : state.sourceWholeStem || "").trim();
  // Sound notation is validated and normalized by explicit Use Source first.
  if (!stem || stem.includes("/")) return null;
  if (!compound && runtime.isClassicalNahuatlNonactiveCarrierSourceFrame?.(
    runtime.resolveClassicalNahuatlNonactiveCarrierSourceFrame?.({enteredStem:stem,valence:"intransitive"})) === true) return null;
  if (!compound && (runtime.isClassicalNahuatlRestrictedContainingVncSourceFrame?.(
    runtime.resolveClassicalNahuatlRestrictedContainingVncSourceFrame?.({enteredStem:stem,valence:"intransitive",sourceLexemeId:runtime.getClassicalVncSourceLexemeId?.() || ""})) === true
    || runtime.isClassicalNahuatlNominalRankCorrectedSourceFrame?.(
    runtime.resolveClassicalNahuatlNominalRankCorrectedSourceFrame?.({enteredStem:stem,valence:"intransitive"})) === true)) return null;
  if (!compound && runtime.isClassicalNahuatlAnalyticalVncSourceFrame?.(
    runtime.resolveClassicalNahuatlAnalyticalVncSourceFrame?.({enteredStem:stem,valence:"intransitive"})) === true) return null;
  if (!compound && runtime.isClassicalNahuatlPreformedVncSourceFrame?.(
    runtime.resolveClassicalNahuatlPreformedVncSourceFrame?.({enteredStem:stem,valence:"intransitive"})) === true) return null;
  if (!compound && runtime.isClassicalNahuatlImperfectiveVncSourceFrame?.(
    runtime.resolveClassicalNahuatlImperfectiveVncSourceFrame?.({enteredStem:stem,valence:runtime.document?.getElementById?.("classical-rule-logic-valence")?.value || "intransitive"})) === true) return null;
  const documentObject = runtime.document;
  const selection = runtime.getClassicalRuleLogicCanvasClassSelection?.(stem, {
    requestedClassId: documentObject?.getElementById?.("classical-rule-logic-class")?.value || "",
    valence: documentObject?.getElementById?.("classical-rule-logic-valence")?.value || "",
    sourceEmbedStem: compound ? state.sourceEmbedStem || "" : "",
    sourceMatrixStem: compound ? state.sourceMatrixStem || "" : "",
  });
  return selection && !selection.selectedClassId
    ? { fieldId: "classical-rule-logic-class", stemKind: "verbstem", allowedClassIds: selection.allowedClassIds }
    : null;
}

export function getSourceClassRequirement(runtime, state = null) {
  const current=runtime.getClassicalSourceAuthoringDecision?.();
  if(runtime.isClassicalSourceAuthoringDecision?.(current) === true) {
    if(current.authorizationStatus === "authorized")return null;
    const parts=current.declaration.parts || {};
    const base={stemKind:current.unit === "vnc"?"verbstem":"nounstem",blockReason:current.blockReason,sourceDecision:current};
    if(parts.mode === "two-nucleus-nnc")return {...base,fieldId:"classical-double-nucleus-analysis",sourceAnalysis:true,
      message:"Complete both nuclei and choose their Source analysis."};
    if(current.structureDecision?.authorizationStatus === "blocked" || current.blockReason.includes("embed-matrix-pair")) {
      const compound=parts.mode === "embed-matrix";
      return {...base,fieldId:compound ? !parts.sourceEmbedStem?"classical-source-embed":"classical-source-matrix":"classical-source-whole",
        message:compound?"Complete both Source parts.":"Enter a Source."};
    }
    if(current.objectDecision?.authorizationStatus === "blocked")return {...base,fieldId:"classical-source-object-count",message:"Check the Source objects."};
    if(current.initialIDecision?.selectionRequired)return {...base,fieldId:"classical-vnc-source-initial-i-choice",message:"Choose the initial-i analysis, then Apply."};
    if(current.nncDecision?.blockReason === "ordinary-nnc-supportive-initial-i-requires-initial-i")
      return {...base,fieldId:"classical-rule-logic-nnc-initial-i",message:"Check the initial-i analysis."};
    return {...base,fieldId:current.unit === "vnc"?"classical-rule-logic-class":"classical-rule-logic-nnc-class"};
  }

  const double = runtime.getClassicalDoubleNucleusSourceDraft?.();
  if (double) return double.ready ? null : {
    fieldId: "classical-double-nucleus-analysis", stemKind: "two-nucleus Source", sourceAnalysis: true,
  };
  const unit = runtime.getClassicalBasalUnitFromRuntime?.();
  if (unit === "vnc") return getVncSourceClassRequirement(runtime, state);
  if (unit !== "nnc" || runtime.document?.body?.dataset.classicalRelationalNncMode === "true") return null;
  state ||= runtime.getClassicalSourcePartControlState?.();
  if (!state) return null;
  const compound = state.mode === "embed-matrix";
  const stem = String(compound
    ? [state.sourceEmbedStem, state.sourceMatrixStem].filter(Boolean).join("-")
    : state.sourceWholeStem || "").trim();
  if (!stem || stem.includes("/")) return null;
  const value = id => runtime.document?.getElementById?.(id)?.value || "";
  const sourceClass = value("classical-rule-logic-nnc-class");
  const sourceUse = value("classical-rule-logic-nnc-source-use") || "nounstem";
  if (!compound && sourceUse === "nounstem" && /^[1-9][0-9]*$/u.test(stem)) {
    const numeric=runtime.buildClassicalNahuatlNominalConstructionTypedSourceFrame?.({value:Number(stem)});
    if (runtime.isClassicalNahuatlNominalConstructionTypedSourceFrame?.(numeric) === true) return null;
  }
  if (!compound && !sourceClass && sourceUse === "nounstem") {
    const lexical = runtime.buildClassicalNahuatlLexicalAdverbialPotentialFrame?.({stem});
    if (runtime.isClassicalNahuatlAdverbialPotentialFrame?.(lexical) === true
      && lexical.authorizationStatus === "authorized"
      && ((lexical.sourceInputMode === "owner-issued-lexical-adverbial-nnc-source"
          && lexical.lexicalNncSourceFrame?.ordinaryNounParadigmAuthorized === false)
        || (lexical.sourceInputMode === "owner-issued-lexical-adverbial-vnc-source"
          && lexical.lexicalVncSourceFrame?.ordinaryVncUseAuthorized === false))) return null;
  }
  const identity = runtime.deriveClassicalNncSourceIdentity?.(stem, compound ? state : {}, {
    sourceClass: sourceClass === "tl-2-a"
      && value("classical-rule-logic-nnc-tl2a-realization") === "reclassify-1a"
      ? "tl-2-a-to-1-a" : sourceClass,
    sourceUse,
    supportiveInitialI: /^[iī]/u.test(stem.replace(/^\(/u, ""))
      && value("classical-rule-logic-nnc-initial-i") === "supportive",
  });
  // Other NNC families and consuming-owner operands need no ordinary class.
  // Preserve all other owner block reasons rather than relabelling them.
  return !identity?.recognized
    && identity?.blockedSourceFrame?.blockReason === "lexical-noun-class-selection-required"
    ? { fieldId: "classical-rule-logic-nnc-class", stemKind: "nounstem" }
    : null;
}
