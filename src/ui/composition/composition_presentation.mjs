import {syncOperationChoiceGate} from './operation_choice_gate.mjs?v=20261023-2';
import {organizeClauseWorkflow,presentIdleClauseComposition} from './clause_composition.mjs?v=20261023-4&andrewsRelease=20261024-1';
import {preserveDisclosureChoice} from './formula_layout.mjs?clauseHarmony=20261023-5&v=20261023-slots-17&andrewsRelease=20261024-1&interfaceRelease=1.2.36';
import {organizeSourceComposition} from './source_composition.mjs?embedVoiceVisibility=20261026-1&v=20261023-source-composition-1&interfaceRelease=1.2.36';
import {createFlowDesign} from './flow_design.mjs?v=20261022-reset-eligibility-1&writingSource=20261022-1&makePreview=20261022-1&fixedChoices=20261022-1';
import {createLiveDesign} from './live_design.mjs?v=20261008-apple-panel-navigation-7';
import {createGrammarPresentation,reconcileOrdinaryNncSharedChoices} from './grammar_presentation.mjs?operationFirst=20261023-4&clickFeedback=20261023-1&allBuild=20261023-4&coreStem=20261023-1&v=20261014-construction-click-1&choicesLayout=20261014-4&ownerPresentation=20261021-2&interfaceRelease=1.2.36';
import {createWorkspacePresentation} from './workspace_presentation.mjs?clickFeedback=20261023-1&v=20261023-whole-fit-1';
// Presentation only: existing controls, handlers and owner availability survive.
import {createResultInformation} from './result_information.mjs?v=20261023-result-composition-1&reader=42-6-227&journeyOrganization=20261019-1&writingSource=20261022-1';
import {createPathPresentation} from './path_presentation.mjs?undoBuild=20261028-1&v=20261011-path-targets-7&routeShapes=20261021-1&writtenPreview=20261022-1&writingSource=20261022-1';
import {createRouteDesign} from './route_design.mjs?clauseHarmony=20261023-5&clickFeedback=20261023-1&v=20261014-task-menu-1&routeShapes=20261021-1';
import {createStructureDesign,readStructureDesignContext} from './structure_design.mjs?choiceArchitecture=20261026-6&icDimension=20261026-1&reasonPresentation=20261026-1&nucleusEdit=20261024-9&clauseHarmony=20261023-5&v=20261011-structure-15&routeShapes=20261021-1&clauseCoordinate=20261021-1&resetEligibility=20261022-1&writingSource=20261022-1&makePreview=20261022-1&fixedChoices=20261022-1&interfaceRelease=1.2.36&choiceGuidance=20261027-2';
import {createChoiceDesign} from './choice_design.mjs?clickFeedback=20261023-1&coreStem=20261023-1&v=20261022-reset-eligibility-1&writingSource=20261022-1&fixedChoices=20261022-1';
import {createWorkspaceOrganization} from './workspace_organization.mjs?clauseHarmony=20261023-5&formulaSlots=20261023-22&v=20261014-task-menu-1&choicesLayout=20261014-4&objectsPlacement=20261014-1&ownerOrganization=20261024-andrews-decisions&startupDelivery=20261022-1&andrewsRelease=20261024-1&interfaceRelease=1.2.36';
import {createBuildConstructionPresentation} from './build_constructions.mjs?v=20261014-construction-click-1&choicesLayout=20261014-4';
import {createBuildNavigation} from './build_navigation.mjs?sourceLabel=20261026-1&deverbalReload=20261024-8&operationFirst=20261023-4&clickFeedback=20261023-1&v=20261021-ending-reference-2&writingSource=20261022-2&fixedChoices=20261022-1&interfaceRelease=1.2.36&negativeAttachment=20261025-1';
import {presentParticleComposition} from './particle_composition.mjs?v=20261023-particle-composition-2&negativeAttachment=20261025-1';

export function hasVisibleCompositionControls(node,disclosure){
  if(!node)return false;
  return [...node.querySelectorAll('select,input,button')].some(control=>{
    if(control.type==='hidden'||control.dataset?.compositionChoiceMirror||control.dataset?.classicalCompactChoiceOriginal)return false;
    // Availability belongs to native content. A collapsed or previously hidden
    // presentation wrapper must not prevent the next projection from appearing.
    for(let current=control;current&&current!==disclosure;current=current.parentElement){
      const style=node.ownerDocument.defaultView.getComputedStyle(current);
      if(current.hidden||style.display==='none'||style.visibility==='hidden'||current.getAttribute?.('aria-hidden')==='true')return false;
    }
    return true;
  });
}

export function getClassicalNncGrammarSectionsToReveal({
  operationId = '',
  enabledSections = [],
  userCollapsedSections = [],
} = {}) {
  const primarySections = operationId === 'nnc:ordinary'
    ? ['subject', 'state', 'nounstem']
    : operationId === 'nnc:sentence-surface' ? ['sentence'] : [];
  const enabled = new Set(enabledSections);
  const collapsed = new Set(userCollapsedSections);
  return primarySections.filter(section => enabled.has(section) && !collapsed.has(section));
}

export function createCompositionPresentation(doc,organizationModel) {
  const organizePath=createPathPresentation(doc);
  const organizeDesign=createLiveDesign(doc);
  const organizeGrammar=createGrammarPresentation(doc,{constructionPlacement:'build'});
  const organizeResult=createResultInformation(doc);
  const organizeWorkspace=createWorkspacePresentation(doc);
  const organizeRoute=createRouteDesign(doc);
  const organizeChoices=createChoiceDesign(doc);
  const organizeStructure=createStructureDesign(doc);
  const organizeFlow=createFlowDesign(doc,()=>readStructureDesignContext(doc.getElementById('classical-workbench')));
  const disclosureState = new Map();
  const organizeWorkspaceFromCanvas=createWorkspaceOrganization(doc,organizationModel,disclosureState);
  const organizeBuildConstructions=createBuildConstructionPresentation(doc);
  const organizeBuildNavigation=createBuildNavigation(doc);
  const organizeChoicesLayout=organizeWorkspaceFromCanvas.choicesLayout;
  let lastAction='';
  const text = (node, value) => { if (node && node.textContent !== value) node.textContent = value; };
  function disclose(node, label, key, initiallyOpen=false) {
    if (!node) return;
    if (key === 'composition-controls') {
      const nested = node.querySelector(':scope > details[data-classical-continuation-menu]');
      if (nested) {
        for (const child of Array.from(nested.children)) {
          if (child.tagName !== 'SUMMARY') node.insertBefore(child, nested);
        }
        nested.remove();
      }
    }
    let details = node.parentElement;
    if (!details?.classList.contains('composition-disclosure')) {
      details = doc.querySelector(`[data-composition-disclosure="${key}"]`);
    }
    if (!details) {
      details = doc.createElement('details');
      details.className = 'composition-disclosure';
      details.dataset.compositionDisclosure=key;
      details.open = disclosureState.has(key) ? disclosureState.get(key) : initiallyOpen;
      const summary = doc.createElement('summary');
      summary.textContent = label;
      node.before(details);details.append(summary,node);
      preserveDisclosureChoice(summary,details,disclosureState,key);
    }
    if(node.parentElement!==details) {
      // The native composition renderer replaces this projection on each choice.
      // A reused disclosure must not retain the previous projection or handlers.
      if(key==='composition-controls') {
        for(const previous of Array.from(details.children)) {
          if(previous!==node && previous.matches('.classical-clause-relation-workflow'))previous.remove();
        }
      }
      details.append(node);
    }
    const hidden=node.hidden||(key==='composition-controls'&&!hasVisibleCompositionControls(node,details));
    if(details.hidden!==hidden)details.hidden=hidden;
    return details;
  }
  function cue(id, headingId, message) {
    let node = doc.getElementById(id);
    if (!node) {
      node = doc.createElement('p');node.id=id;node.className='composition-stage-cue';
      node.setAttribute('role','status');node.setAttribute('aria-live','polite');
      doc.getElementById(headingId)?.closest('.panel-block-title')?.after(node);
    }
    text(node,message);
    return node;
  }
  function revealNncGrammarSectionsForOperation() {
    const operationId=doc.getElementById('classical-capability-navigator-operation')?.value || '';
    if(!operationId)return;
    const groups=new Map();
    for(const kind of ['subject','state','nounstem','sentence']) {
      const section=doc.querySelector(`[data-classical-nnc-grammar-section="${kind}"]`);
      const key=`nnc-${kind}`;
      const details=section?.parentElement?.classList.contains('composition-disclosure')
        ? section.parentElement : doc.querySelector(`[data-composition-disclosure="${key}"]`);
      if(section && details)groups.set(kind,{section,key,details});
    }
    const enabledSections=[...groups].filter(([,group])=>
      [...group.section.querySelectorAll('select,input:not([type="hidden"]),button')]
        .some(control=>!control.disabled && !control.hidden
          && !control.closest('[hidden]')
          && doc.defaultView.getComputedStyle(control).display!=='none')
    ).map(([kind])=>kind);
    const userCollapsedSections=[...groups].filter(([,group])=>
      disclosureState.get(group.key)===false
    ).map(([kind])=>kind);
    for(const kind of getClassicalNncGrammarSectionsToReveal({
      operationId,enabledSections,userCollapsedSections,
    })) {
      const group=groups.get(kind);
      // Reveal newly relevant choices unless the person explicitly collapsed
      // this section. Reopening a previously expanded section on a new
      // operation is predictable; a stored `true` is not a user preference.
      if(group && disclosureState.get(group.key)!==false)group.details.open=true;
    }
  }
  const operationControl=doc.getElementById('classical-capability-navigator-operation');
  if(operationControl?.dataset.classicalNncDisclosureHandler!=='true') {
    operationControl.addEventListener('change',revealNncGrammarSectionsForOperation);
    operationControl.dataset.classicalNncDisclosureHandler='true';
  }
  return ({action='',materialSupplied=false,card=null,getIdentity,isCurrentComposition}) => {
    // A recovery message may replace the output, but the panel still needs its name.
    const sentenceHeading=doc.getElementById('classical-stage-result-heading');
    text(sentenceHeading,'Result');
    const sentenceTitle=sentenceHeading?.closest('.panel-block-title');
    if(sentenceTitle) {
      sentenceTitle.hidden=false;
      sentenceTitle.removeAttribute('aria-hidden');
    }
    // The prototype presents all three stages together. Native output-view
    // navigation may hide the whole Grammar container after continuation.
    // Restore its stage only when an owner-issued Result is available; each
    // individual control keeps its owner's hidden/disabled state.
    const hasIssuedResult=Array.from(doc.querySelectorAll('#classical-rule-logic-surface .classical-result-continuation-card'))
      .some(node=>!node.closest('[data-composition-information="analysis"]') && Boolean(getIdentity?.(node)));
    if(hasIssuedResult && doc.getElementById('ui-density-advanced')?.getAttribute('aria-pressed')==='true') {
      const grammar=doc.getElementById('classical-rule-logic-controls');
      if(grammar?.hidden)grammar.hidden=false;
      if(grammar?.parentElement?.classList.contains('formula-controls-grid') && grammar.parentElement.hidden)
        grammar.parentElement.hidden=false;
    }
    const plan=doc.getElementById('classical-capability-operation-plan');
    const needsIntervener=plan?.dataset.classicalCapabilityOperationId==='sentence:supplementation'
      && (plan.dataset.classicalCapabilityRequiredResultRoles||'').split('|').includes('dependent')
      && (plan.dataset.classicalCapabilityRequiredChoiceIds||'').split('|').includes('discontinuous-head-position');
    const overview=disclose(doc.querySelector('[data-classical-composition-path-summary]'),'Overview','overview');
    overview?.classList.add('composition-overview');
    const sourceAnalysis=doc.querySelector('[data-classical-source-outline-section="analysis"]');
    if(sourceAnalysis) {
      // The native shell requires this section to stay a direct child of its root.
      // Only its read-only contents move; native refresh may put them back.
      let details=sourceAnalysis.querySelector(':scope > [data-composition-disclosure="source-details"]');
      if(!details) {
        details=doc.createElement('details');details.className='composition-disclosure';
        details.dataset.compositionDisclosure='source-details';
        const summary=doc.createElement('summary');summary.textContent='Source details';
        details.append(summary);sourceAnalysis.append(details);
      }
      const contents=['classical-source-readout','classical-source-constitution','classical-source-internal-morphs'].map(id=>doc.getElementById(id)).filter(Boolean);
      for(const node of contents)if(node.parentElement!==details)details.append(node);
      details.hidden=contents.every(node=>node.hidden);
      sourceAnalysis.classList.add('composition-source-details');
    }
    for(const guide of doc.querySelectorAll('#classical-nnc-source-guide .classical-nnc-source-guide__rule')) {
      disclose(guide,'Input guidance',guide.closest('[id]')?.id+'-input-guidance');
    }
    // These routine prompts repeat the stage cue or the enabled action.
    // Match only known presentation messages; actionable owner statuses stay visible.
    const routine=new Set(['Choose an operation.','Choose an available operation for this Source.',
      'Next: choose an operation for this Result.','Choices complete. Make Result.',
      'Operation applied. Review the exact Result, then Continue from it when ready.',
      'Applied once by the canonical owner. The Result has not replaced Source yet.',
      'Applied by the canonical clause owner. Review the Result, then Continue.']);
    for(const id of ['classical-capability-navigator-status','classical-capability-operation-plan-status']) {
      const status=doc.getElementById(id);
      status?.classList.toggle('composition-routine-message',routine.has(status.textContent.trim()));
    }
    const sourceCue=cue('composition-source-cue','classical-stage-source-heading',
      needsIntervener ? 'Prepare an intervening clause.' : ['add','ask'].includes(action) ? materialSupplied ? 'Adjunct ready. Choose the change in Build.' : action==='ask' ? 'Prepare an interrogative adjunct.' : 'Prepare an adjunct.'
      : action==='implicit' ? 'Prepare the material that remains.' : 'Start with a stem, or reuse a sentence.');
    const sourceStatus=doc.getElementById('classical-source-commit-status');
    const sourceBadge=sourceStatus?.querySelector('[data-classical-source-commit-badge]')?.textContent.trim();
    // The starting instruction is useful while Source is empty. Once a source
    // is applied or being edited, its native status and Edit Source control
    // already describe the state; keep task-specific prompts visible.
    if(sourceCue)sourceCue.hidden=!action && !needsIntervener && Boolean(sourceBadge) && sourceBadge!=='Waiting';
    const operation=doc.getElementById('classical-build-task')||doc.getElementById('classical-capability-navigator-operation');
    const sourceParts=doc.getElementById('classical-source-parts');
    const sourcePending=sourceParts?.dataset.classicalSourceCommitState==='pending';
    const sourceHasError=Boolean(sourceParts?.dataset.classicalSourceSoundErrorReason);
    const makeButton=doc.getElementById('classical-capability-apply-operation');
    const grammarMessage=sourceHasError ? ''
      : sourcePending ? 'Use this Source before making a Result.'
      : operation?.disabled ? ''
      : operation && !operation.value ? 'Choose an operation to see its required choices.'
      : operation?.value && makeButton?.disabled ? ''
      : operation?.value ? 'Review the choices, then Make Result.'
      : action==='move' ? 'Change the order. Then Make Result.'
      : action ? 'Choose the pending change. Then Make Result.'
      : 'Change the clause settings, then Make Result.';
    const grammarCue=cue('composition-grammar-cue','classical-stage-grammar-heading',grammarMessage);
    if(grammarCue)grammarCue.hidden=!grammarMessage;
    const resultCue=cue('composition-result-cue','classical-stage-result-heading',action ? 'Your accepted sentence stays here while you prepare a change.' : 'Keep this sentence or prepare its next change.');
    const acceptedResult=typeof doc.defaultView?.getClassicalConstructionPosition==='function'
      ? doc.defaultView.getClassicalConstructionPosition()?.accepted?.result
      : readStructureDesignContext(doc.getElementById('classical-workbench'))?.acceptedResult;
    if(resultCue)resultCue.hidden=!acceptedResult;
    disclose(doc.querySelector('.classical-capability-operation-plan__facts'),'What changes','change-details');
    disclose(doc.getElementById('classical-applied-grammar-account'),'Applied grammar','applied-grammar');
    const context=disclose(doc.getElementById('classical-source-context-controls'),'Speaker and reference','source-context');
    if(action==='address' && lastAction!==action && context)context.open=true;
    for (const kind of ['subject','valence','verbstem','tense','sentence']) {
      const label={subject:doc.getElementById('classical-workbench')?.dataset.compositionTargetSubject==='true' ? 'Result subject' : 'Subject',
        valence:'Objects',verbstem:'Verbstem',tense:'Tense',sentence:'Sentence'}[kind];
      const disclosure=disclose(doc.querySelector(`[data-classical-vnc-authority-disclosure="${kind}"]`),label,`vnc-${kind}`,kind==='subject');
      if(kind==='subject') {
        const summary=disclosure?.querySelector(':scope > summary');
        text([...summary?.childNodes||[]].find(node=>node.nodeType===3),label);
      }
    }
    for (const kind of ['subject','state','nounstem','predicate','sentence']) {
      const section=doc.querySelector(`[data-classical-nnc-grammar-section="${kind}"]`);
      const key=`nnc-${kind}`;
      disclose(section,
        {subject:'Subject',state:'State',nounstem:'Nounstem',predicate:'Predicate',sentence:'Sentence'}[kind],key,false);
    }
    revealNncGrammarSectionsForOperation();
    for (const id of ['classical-vnc-source-stem-choices','classical-nnc-source-example']) {
      disclose(doc.getElementById(id)?.closest('label'),'Try an example',id);
    }
    disclose(doc.querySelector('#classical-grammar-continuation > .classical-clause-relation-workflow'),'Clause details','composition-controls');
    organizeResult({card,action,getIdentity,isCurrentComposition});
    organizePath();
    const guide=doc.getElementById('classical-vnc-source-class-guidance');
    const stemClass=doc.getElementById('classical-rule-logic-class');
    const fixed=stemClass?.value && Array.from(stemClass.options).filter(option=>option.value && !option.disabled).length===1;
    // Keep the owner's unresolved-class guidance visible whenever a decision remains.
    if (guide) guide.classList.toggle('composition-resolved-guidance',Boolean(fixed));
    const intro=doc.querySelector('#classical-source-continuation .classical-source-continuation__intro');
    text(intro,'Use a complete Result as the principal or adjunct.');
    text(doc.getElementById('classical-capability-operation-plan-heading'),'Route');
    text(doc.getElementById('classical-result-outline-structure-analysis-heading'),'Sentence');
    text(doc.getElementById('classical-result-outline-continuation-heading'),'More ways to continue');
    const label=card?.querySelector('.classical-result-continuation-card__scope');
    text(label,action ? 'Accepted sentence' : 'Sentence');
    organizeGrammar({action});
    organizeDesign();
    organizeWorkspace({action,materialSupplied});
    organizeRoute();
    organizeChoices();
    organizeFlow(organizeStructure());
    organizeWorkspaceFromCanvas();
    organizeBuildConstructions();
    organizeBuildNavigation();
    organizeChoicesLayout();
    organizeSourceComposition(doc);
    presentParticleComposition(doc,{acceptedResult,card,action});
    presentIdleClauseComposition(doc,readStructureDesignContext(doc.getElementById('classical-workbench')));
    for(const workflow of doc.querySelectorAll('.classical-clause-relation-workflow'))organizeClauseWorkflow(doc,workflow);
    const composition=doc.querySelector('[data-composition-disclosure="composition-controls"]');
    if(composition){
      const content=composition.querySelector(':scope > .classical-clause-relation-workflow');
      const hidden=!hasVisibleCompositionControls(content,composition);
      if(composition.hidden!==hidden)composition.hidden=hidden;
    }
    syncOperationChoiceGate(doc);
    // Final placement/gating can reveal native editors after the first mirror
    // pass. Reconcile only those shared fields, without reparenting the plan.
    if(reconcileOrdinaryNncSharedChoices(doc))organizeChoicesLayout();
    lastAction=action;
  };
}
