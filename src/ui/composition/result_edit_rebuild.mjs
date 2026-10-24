// Editing is an owner reissue along one authenticated occurrence path. The
// untouched siblings stay exact objects; no saved recipe or written form is an
// execution input. Unsupported ancestor families remain unavailable.
const SLOT = 'result-edit-rebuild';
const SIMPLE_SUPPLEMENTATION_FRAMES = new Set([
  'classical-nahuatl-supplementation-order-frame',
  'classical-nahuatl-supplementation-adjunctor-frame',
  'classical-nahuatl-supplementation-recursive-clause-graph-frame',
  'classical-nahuatl-topic-comment-relation-frame',
]);

function capture(runtime, exact, project) {
  if (!exact || typeof exact !== 'object') return null;
  try {
    if (project && project(exact)?.canonicalResult !== exact) return null;
    const value = runtime.captureClassicalGrammarApplicationResult?.(exact, SLOT);
    return runtime.isClassicalGrammarApplicationResultCapture?.(value, SLOT) === true
      && value.canonicalResult === exact
      && value.applicationResult?.authorizationStatus === 'authorized'
      && value.applicationResult.canonicalResult === exact ? value : null;
  } catch { return null; }
}

function supplementation(runtime, exact, project) {
  if (runtime.isClassicalNahuatlSupplementationFrame?.(exact) !== true
    || exact.kind !== 'classical-nahuatl-supplementation-frame'
    || exact.operationKind && exact.operationKind !== 'relation') return null;
  const reference = exact.referenceFrame, order = exact.linearizationFrame?.order;
  // These branches require additional contexts, captured roles or spelling
  // decisions that cannot be recovered completely from this projection.
  if (reference?.referenceMode !== 'shared' || reference.agreementException
    || reference.additionalSharedContacts?.length
    || exact.interveningClauses?.length
    || exact.principalContinuationFrames?.length > 1
    || exact.supplementContinuationFrames?.length > 1
    || !['principal-first', 'supplement-first'].includes(order)
    || !['.', '?', '!'].includes(exact.linearizationFrame?.punctuation)
    || exact.linearizationFrame?.parallelSupplementBoundaryFrame
    || !Array.isArray(exact.operationFrames)
    || exact.operationFrames.some(frame => !SIMPLE_SUPPLEMENTATION_FRAMES.has(frame.kind))) return null;
  const adjunctor = exact.operationFrames.find(frame =>
    frame.kind === 'classical-nahuatl-supplementation-adjunctor-frame');
  if (!adjunctor || adjunctor.adjunctor !== 'none'
    || exact.principalClause?.contextRecords?.length
    || exact.supplementClause?.contextRecords?.length) return null;
  const principal = exact.principalContinuationFrames?.at(-1)
    || runtime.getClassicalNahuatlSupplementationClauseSourceFrame?.(exact.principalClause);
  const adjoined = exact.supplementContinuationFrames?.at(-1)
    || runtime.getClassicalNahuatlSupplementationClauseSourceFrame?.(exact.supplementClause);
  if (!capture(runtime, principal, project) || !capture(runtime, adjoined, project)) return null;
  const choices = Object.freeze({
    relation:'supplementation', supplementationReferenceMode:reference.referenceMode,
    supplementationHeadRole:reference.headRole,
    supplementationContactRole:reference.supplementContactRole,
    supplementationOrder:order,
    ...(reference.headRole === 'object' ? {principalObjectId:reference.principalHead.id} : {}),
    ...(reference.supplementContactRole === 'object' ? {supplementObjectId:reference.supplementContact.id} : {}),
  });
  return {kind:'supplementation', exact, choices,
    children:[{role:'principal',exact:principal},{role:'adjoined',exact:adjoined}]};
}

function supplementationChange(runtime, exact, project) {
  const inputs = runtime.getClassicalNahuatlSupplementationReloadInputs?.(exact);
  if (!inputs || typeof runtime.buildClassicalNahuatlSupplementationReplacementRequest !== 'function') return null;
  const children = [['principal','principalClause','principalContinuationFrames'],
    ['adjoined','supplementClause','supplementContinuationFrames']].map(([role,key,continuations]) => ({role,
      exact: inputs.options[continuations]?.at(-1)
        || runtime.getClassicalNahuatlSupplementationClauseSourceFrame?.(inputs[key])}));
  if (!children.every(child => capture(runtime,child.exact,project)
    && runtime.buildClassicalNahuatlSupplementationReplacementRequest(exact,child.role,child.exact))) return null;
  return {kind:'supplementation',exact,children,requestOwner:true};
}

function conjunction(runtime, exact, project) {
  if (runtime.isClassicalNahuatlClauseConjunctionResultFrame?.(exact) !== true
    || typeof runtime.buildClassicalNahuatlConjunctReplacementRequest !== 'function') return null;
  const children = exact.conjuncts.map((node,index) => ({role:String(index),exact:
    runtime.isClassicalNahuatlClauseCompositionSourceFrame?.(node) === true
      ? runtime.getClassicalNahuatlSupplementationClauseSourceFrame?.(node.envelope) : node}));
  if (!children.every(child => capture(runtime,child.exact,project))
    || !runtime.buildClassicalNahuatlConjunctReplacementRequest(exact,0,children[0]?.exact)) return null;
  return {kind:'conjunction',exact,children};
}

function recipe(runtime, exact, project) {
  if (!capture(runtime, exact, project)) return null;
  const conjoined = conjunction(runtime, exact, project);
  if (conjoined) return conjoined;
  const relation = supplementationChange(runtime, exact, project);
  if (relation) return relation;
  if (runtime.isClassicalNahuatlIssuedParticleSentenceLayerFrame?.(exact) !== true
    || !capture(runtime, exact.canonicalInputFrame, project)) return null;
  const operation = exact.kind === 'classical-nahuatl-sentence-particle-layer-frame'
    ? 'sentence:particle-adjunction'
    : exact.kind === 'classical-nahuatl-sentence-adverbial-layer-frame'
      ? 'sentence:adverbial-adjunction' : '';
  if (!operation) return null;
  return {kind:'particle',exact,operation,
    children:[{role:'host',exact:exact.canonicalInputFrame}]};
}

function controllerFor(runtime, entry, replacements = new Map()) {
  const controller = runtime.createClassicalClauseRelationController?.();
  if (!controller) return null;
  for (const child of entry.children) {
    const exact = replacements.get(child.role) || child.exact;
    if (controller.captureCurrentResult(child.role, exact)?.authorizationStatus !== 'authorized') return null;
  }
  const contract = controller.buildDecisionContract(entry.choices);
  if (contract?.authorizationStatus !== 'authorized') return null;
  // A new typed parent must not silently invalidate a retained grammatical
  // choice. Only the canonical controller may derive contextual facts.
  for (const [key,value] of Object.entries(entry.choices))
    if (key !== 'relation' && contract.operationSelections?.[key] !== value) return null;
  return {controller,contract};
}

function pathTo(runtime, root, target, project, occurrence = null) {
  if (!capture(runtime, root, project) || !capture(runtime, target, project)) return null;
  if (occurrence !== null && (!Array.isArray(occurrence) || occurrence.length % 2
    || occurrence.some((value,index) => index % 2 ? !Number.isInteger(value) || value < 0 : value !== 'children'))) return null;
  const paths = [];
  function visit(exact, path, seen, address = []) {
    if (paths.length > 1 || path.length > 32 || seen.has(exact)) return;
    if (exact === target && (occurrence === null || address.length === occurrence.length)) { paths.push(path); return; }
    const entry = recipe(runtime, exact, project);
    if (!entry) return;
    const next = new Set(seen).add(exact);
    for (const [index,child] of entry.children.entries()) {
      if (occurrence !== null && (occurrence[address.length] !== 'children' || occurrence[address.length+1] !== index)) continue;
      visit(child.exact, [...path,{entry,role:child.role}], next, [...address,'children',index]);
    }
  }
  visit(root, [], new Set());
  return paths.length===1?paths[0]:null;
}

export function canRebuildResultEdit(runtime, root, target, project, occurrence = null) {
  try { return pathTo(runtime, root, target, project, occurrence) !== null; }
  catch { return false; }
}

export function getResultEditReorder(runtime, target, project) {
  try {
    if (!capture(runtime, target, project)) return null;
    const entry = supplementation(runtime, target, project);
    if (!entry) return null;
    const prepared = controllerFor(runtime, entry);
    const decision = prepared?.contract.decisions?.find(item => item.id === 'supplementation-order');
    if (!decision || decision.values?.length < 2) return null;
    return Object.freeze({controller:prepared.controller, choices:entry.choices,
      decisionId:decision.id, currentValue:entry.choices.supplementationOrder,
      values:Object.freeze(decision.values.map(value => Object.freeze({value}))),
      captures:Object.freeze(entry.children.map(child => Object.freeze({...child}))),
    });
  } catch { return null; }
}

function reissue(runtime, entry, role, replacement) {
  if (entry.kind === 'conjunction') {
    const request = runtime.buildClassicalNahuatlConjunctReplacementRequest(entry.exact,Number(role),replacement);
    if (!request) return null;
    const application = runtime.executeClassicalGrammarApplicationRequest?.({operationId:'clause:composition',args:[request]});
    return application?.authorizationStatus === 'authorized' ? application.canonicalResult : null;
  }
  if (entry.kind === 'supplementation') {
    const request=runtime.buildClassicalNahuatlSupplementationReplacementRequest(entry.exact,role,replacement);
    if (!request) return null;
    const result=runtime.executeClassicalGrammarApplicationRequest?.({operationId:'sentence:supplementation',args:[request]});
    return result?.authorizationStatus === 'authorized' ? result.canonicalResult : null;
  }
  const exact = entry.exact;
  const particle = exact.inputParticleResultFrame
    ? {particleResultFrame:exact.inputParticleResultFrame}
    : {particleSourceFrame:exact.particleSourceFrame};
  const host = runtime.isClassicalNahuatlIssuedParticleSentenceLayerFrame?.(replacement) === true
    ? {consumedSentenceFrame:replacement} : {nuclearResultFrame:replacement};
  const options = {...particle,...host,
    ...(entry.operation === 'sentence:particle-adjunction'
      ? {honorificized:exact.honorificizedRequested === true,speakerGender:exact.speakerGender} : {})};
  const application = runtime.executeClassicalGrammarApplicationRequest?.({operationId:entry.operation,args:[options]});
  return application?.authorizationStatus === 'authorized' ? application.canonicalResult : null;
}

// Execution helper only: callers stage a frozen packet and invoke this from
// explicit Make. The returned application is the rebuilt whole, not the child.
export function rebuildResultEdit(runtime, root, target, replacement, project, occurrence = null) {
  try {
    const path = pathTo(runtime, root, target, project, occurrence);
    if (!path || !capture(runtime, replacement, project)) return null;
    if (replacement === target) return capture(runtime, root, project)?.applicationResult || null;
    let next = replacement;
    for (const {entry,role} of [...path].reverse()) {
      next = reissue(runtime, entry, role, next);
      if (!capture(runtime, next, project)) return null;
    }
    return capture(runtime, next, project)?.applicationResult || null;
  } catch { return null; }
}

// Preview leases never become accepted captures. The path itself is rebuilt
// from the accepted root, while replacement authority comes from its lease.
export function previewRebuiltResultEdit(runtime, root, target, childPreview, project, occurrence) {
  try {
    const path = pathTo(runtime,root,target,project,occurrence);
    if (!path || !childPreview?.isCurrent?.()) return null;
    let next = childPreview.canonicalResult;
    const leases = [];
    for (const {entry,role} of [...path].reverse()) {
      let operation, options;
      if (entry.kind === 'conjunction') {
        operation = 'clause:composition';
        options = runtime.buildClassicalNahuatlConjunctReplacementRequest(entry.exact,Number(role),next);
      } else if (entry.kind === 'supplementation') {
        operation = 'sentence:supplementation';
        options = runtime.buildClassicalNahuatlSupplementationReplacementRequest(entry.exact,role,next);
      } else if (entry.kind === 'particle') {
        operation = entry.operation;
        const exact=entry.exact;
        options={...(exact.inputParticleResultFrame?{particleResultFrame:exact.inputParticleResultFrame}:{particleSourceFrame:exact.particleSourceFrame}),
          ...(runtime.isClassicalNahuatlIssuedParticleSentenceLayerFrame?.(next)?{consumedSentenceFrame:next}:{nuclearResultFrame:next}),
          ...(operation==='sentence:particle-adjunction'?{honorificized:exact.honorificizedRequested===true,speakerGender:exact.speakerGender}:{})};
      } else return null;
      if (!options) return null;
      const preview=runtime.previewClassicalGrammarApplicationRequest?.({operationId:operation,args:[options]});
      if (runtime.isClassicalGrammarApplicationPreview?.(preview)!==true) return null;
      leases.push(preview);next=preview.canonicalResult;
    }
    const final=leases.at(-1);
    return final?{surface:final.surface,canonicalResult:next,isCurrent:()=>childPreview.isCurrent()
      && pathTo(runtime,root,target,project,occurrence)!==null
      && leases.every(lease=>runtime.isClassicalGrammarApplicationPreview?.(lease)===true)}:null;
  } catch {return null;}
}
export function isConjunctResultEdit(runtime,root,target,project,occurrence) {
  try {return pathTo(runtime,root,target,project,occurrence)?.some(step=>step.entry.kind==='conjunction')===true;}catch{return false;}
}
