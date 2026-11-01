// Source-analysis choices consume canonical owners; they do not authorize execution.
export function resolveVncSourceClassChoice(owner, stem = "", options = {}, context = {}) {
  const current=context.sourceDecision;
  if(owner.isClassicalSourceAuthoringDecision?.(current) === true && current.unit === "vnc"
    && (current.applyPayload?.sourceInput.stem || current.classContext?.normalizedStem) === stem)return current.classDecision;
  return owner.getClassicalVncSourceAuthoringClassDecision?.(stem,{...options,
    sourceLexemeId:options.sourceLexemeId || context.sourceLexemeId || ""}) || null;
}
export function resolveNncSourceClassValues(owner, stem = "", options = {}) {
  const current=options.sourceDecision;
  if(owner.isClassicalSourceAuthoringDecision?.(current) === true && current.unit === "nnc")
    return current.sourceAuthorization?.authorizationStatus === "authorized"
      ? Object.freeze([...new Set([...(current.nncDecision?.allowedClassIds || []),current.declaration.source.sourceClass].filter(Boolean))])
      : current.ownerhoodDecision ? Object.freeze([...new Set([...(current.nncDecision?.allowedClassIds || []),
      ...current.ownerhoodDecision.options.map(option=>option.sourceClass)])]) : current.nncDecision?.allowedClassIds || Object.freeze([]);
  return owner.getClassicalNahuatlOrdinaryNncSourceClassChoices?.({stem,
    ...((options.sourceUse || options.sourceFrame?.sourceUse)?{sourceUse:options.sourceUse || options.sourceFrame.sourceUse}:{}),
    ...(options.compoundStem?{embedStem:options.sourceFrame?.embedStem || "",matrixStem:options.sourceFrame?.matrixStem || ""}:{}),
    supportiveInitialI:options.sourceFrame?.supportiveInitialI === true}) || Object.freeze([]);
}

export function resolveIrregularSourceAlternatives(lesson11Plan) {
      return lesson11Plan?.authorizationStatus === "authorized"
        ? [
          ...(lesson11Plan.defaultStemOverride ? [{ stemOverride: lesson11Plan.defaultStemOverride, label: "preferred form" }] : []),
          ...(lesson11Plan.selectedAlternativeStem ? [{ stemOverride: lesson11Plan.selectedAlternativeStem, label: lesson11Plan.usageStatus === "dialectal-not-good-usage" ? "selected dialectal form · Andrews calls this not good usage" : "selected alternative" }] : []),
          ...(lesson11Plan.authorizedAlternatives || []).map(alternative => ({
            stemOverride: alternative.stemOverride || "",
            label: alternative.preference === "default" ? "preferred form" : alternative.usage === "dialectal-not-good-usage" ? "dialectal form · Andrews calls this not good usage" : "authorized alternative"
          }))
        ].filter((record, index, list) => record.stemOverride && list.findIndex(candidate => candidate.stemOverride === record.stemOverride) === index)
        : [];
}

// Owner defaults are displayed as such; an incompatible explicit request is
// retained for correction, never replaced by the first available interpretation.
export function resolvePersonalNameSourceChoice(owner, {exactSource = false, resolution = null, requestedFamily = ''} = {}) {
  const requestedValue=String(requestedFamily || '').trim();
  const authentic=exactSource && owner.isPersonalNameNncExactSourceResolution?.(resolution) === true;
  const rawStructure=!exactSource && requestedValue ? owner.getPersonalNameNncSourceFamilyStructure?.(requestedValue):null;
  const values=exactSource ? authentic ? [...resolution.compatibleSourceFamilyIds] : []
    : [...new Set([...(owner.getPersonalNameNncLcm?.()?.sourceFamilies || []).map(spec=>spec.id),...(rawStructure?[requestedValue]:[])])];
  const ownerDefault=authentic && values.includes(resolution.selectedSourceFamily) ? resolution.selectedSourceFamily:'';
  const selectedValue=requestedValue || ownerDefault;
  const resolved=values.includes(selectedValue);
  return Object.freeze({values:Object.freeze(values),requestedValue,selectedValue,resolved,exactSource,
    selectionBasis:requestedValue?'explicit-request':ownerDefault?'canonical-default':'unresolved',
    structure:resolved?owner.getPersonalNameNncSourceFamilyStructure?.(selectedValue) || null:null,
    sourceReference:'Andrews §56.2',executionAuthority:false});
}

export function resolveCoarseNominalSourceFacts(owner, stem = "", sourceClass = "") {
  return owner.getClassicalNahuatlOrdinaryNncSourceClassFacts?.({stem,sourceClass}) || null;
}
export function resolveNncSourceChoiceDomain(owner, stem = "", options = {}, context = {}) {
  const current=options.sourceDecision;
  const frame=current?.applyPayload?.sourceFrame || options.sourceFrame;
  const values=resolveNncSourceClassValues(owner,stem,{...options,...(context.generalUse?{sourceUse:"general-use"}:{})});
  const sourceClass=frame?.familyId === "nominal-compound-source" ? frame.sourceClass:"";
  return Object.freeze({values:sourceClass?Object.freeze([sourceClass]):values,
    coarseClasses:Object.freeze((current?.ownerhoodDecision?.options || []).map(option=>({value:option.sourceClass,label:option.sourceClass}))),executionAuthority:false});
}

// Keep the requested ti alternative in the existing draft control. Only the
// currently authorized owner cell decides whether that request contributes.
export function resolveIrregularSourceRequest(owner, stem, cell, requestedValue = '') {
  const plan=owner.buildClassicalNahuatlIrregularVncParadigmPlan?.(stem,cell);
  return plan?.authorizationStatus === 'authorized'
    && plan.irregularityKind === 'conditioned-ti-perfective'
    && resolveIrregularSourceAlternatives(plan).length < 2 ? '' : requestedValue;
}
