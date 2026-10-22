import {createResultEditSelection} from './result_editing.mjs?v=20261014-result-edit-3';
import {createResultActions} from './result_actions.mjs?v=20261014-result-edit-3&journeyOrganization=20261019-1&presentation=20261019-1';
import {focusNativeChoice} from './flow_design.mjs?v=20261022-reset-eligibility-1&writingSource=20261022-1&makePreview=20261022-1&fixedChoices=20261022-1';
import {installInterfaceTool} from '../interface/interface_runtime.mjs?v=20261012-interface-tool-3';
import {createCompositionPresentation} from './composition_presentation.mjs?v=20261014-task-menu-1&choicesLayout=20261014-4&objectsPlacement=20261014-1&journeyOrganization=20261019-1&presentation=20261019-1&routeShapes=20261021-1&ownerPresentation=20261021-12&makePreview=20261022-1&fixedChoices=20261022-1';
import {loadWorkspaceOrganization,DEFAULT_WORKSPACE_ORGANIZATION} from './workspace_organization_model.mjs?v=20261013-canvas-workspace-1&choicesLayout=20261014-4';
import {bootstrapPromise} from '../../browser/main.mjs?v=20261022-fixed-choices-1&fixedChoices=20261022-1';
// Main workbench presentation. Native handlers and exact owner-issued identities
// remain authoritative; this module never generates grammatical forms.
async function initializeCompositionWorkbench() {
  try { await bootstrapPromise; } catch { return; }
  const doc = document;
  const win = window;
  if (!doc.getElementById('classical-workbench')) return;
  let organizationModel=DEFAULT_WORKSPACE_ORGANIZATION;
  try{organizationModel=await loadWorkspaceOrganization(doc);}catch(error){console.error('Workspace organization:',error);}
  const refreshPresentation=createCompositionPresentation(doc,organizationModel);
  const interfaceTool=await installInterfaceTool(doc);
  let compositionObserver=null;
  const style = doc.createElement('style');
  style.textContent = `
    .classical-result-continuation-card {border:2px solid #315f50!important;background:#f6faf4!important}
    .classical-result-continuation-card__content {font-size:24px!important}
    .composition-local-menu {grid-column:1 / -1;width:100%;min-width:0;margin-top:12px;border-top:1px solid #ccd7ce;padding-top:12px}
    .composition-local-menu #classical-capability-operation-plan {margin:0;width:100%;max-width:none;box-sizing:border-box}
    .composition-selected-label {font-size:12px;color:#315f50;margin:0 0 8px}
    .composition-location-hint {padding:12px;border:1px solid #ccd7ce;border-radius:10px;background:#f6faf4}
  `;
  style.textContent += `
    .composition-role-tray {display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin:12px 0}
    .composition-role-tray button {min-width:0;overflow-wrap:anywhere;padding:12px;text-align:left;border:1px solid #b7c9bf;border-radius:9px;background:#fffdf5;color:#173e34;font:inherit}
    .composition-role-tray button[aria-pressed=true] {background:#173e34;color:white}
    .composition-role-tray small {display:block;font-size:12px;margin-top:5px}
    .composition-parts {display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:10px 0}
    .composition-part {padding:10px;background:#edf4ed;border-radius:8px;font-size:13px}
    .composition-part strong {display:block;margin-bottom:5px}
    .composition-role-guide {font-size:13px;line-height:1.5;margin:8px 0}
  `;
  doc.head.append(style);
  const panelNavigation = doc.querySelector('.classical-four-panel-navigation');
  if (panelNavigation && panelNavigation.dataset.classicalCompositionNavigationBound !== 'true') {
    panelNavigation.addEventListener('click', event => {
      const button = event.target.closest('[data-classical-panel-jump]');
      if (!button || button.dataset.classicalPanelJump === 'classical-path-panel') return;
      const panel = doc.getElementById(button.dataset.classicalPanelJump);
      if (panel) {
        const reduceMotion = win.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
        const navHeight = panelNavigation.getBoundingClientRect().height;
        const top = Math.max(0, panel.getBoundingClientRect().top + win.scrollY - navHeight - 12);
        win.scrollTo({top,behavior:reduceMotion ? 'auto' : 'smooth'});
      }
      for (const item of panelNavigation.querySelectorAll('[data-classical-panel-jump]:not([data-classical-panel-jump="classical-path-panel"])')) {
        if (item === button) item.setAttribute('aria-current', 'step');
        else item.removeAttribute('aria-current');
      }
    });
    panelNavigation.dataset.classicalCompositionNavigationBound = 'true';
  }
  let selected = false;
  let selectedCard = null;
  const selection = createResultEditSelection(win);
  const displayCache = new WeakMap();
  const availabilityCache = new WeakMap();
  const supplyAvailabilityCache = new WeakMap();
  const presentationIdentities = new WeakMap();
  const exactForCard = card => win.getClassicalResultContinuationIdentity?.(card) || presentationIdentities.get(card) || null;
  let requestedAction = '';
  let requestedPartAction = '';
  function setRequestedAction(action, {preserveLegacyIntent = false} = {}) {
    requestedAction = action;
    requestedPartAction = '';
    doc.dispatchEvent(new win.CustomEvent('classical:composition-action-change', {detail:{action,preserveLegacyIntent}}));
  }
  function resultAction(action, detail) {
    const request={...detail,action};
    doc.dispatchEvent(new win.CustomEvent('classical:result-action',{detail:request}));
    if(!request.accepted)return false;
    if(action==='clear'||action==='undo') {
      releaseSourceReturnPresentation(true);
    } else if(action==='change') {
      setRequestedAction('continue');
      requestedPartAction = 'change';
      const operation=doc.getElementById('classical-build-task') || doc.getElementById('classical-capability-navigator-operation-choices') || operationControl;
      if(operation)focusNativeChoice(operation);
    }
    schedule();return true;
  }
  const resultActions=createResultActions(doc,{selection,schedule,
    onSelect:()=>{resultAction('cancel',{root:selection.result,target:selection.target,path:selection.path});setRequestedAction('');},
    onAction:resultAction,
    onAdd:detail=>{if(resultAction('add',detail))beginAction('add');},
  });
  let materialSupplied = false;
  const surface = node => displayCache.get(node) || node?.surfaceRealization || node?.sentenceSurface || node?.surface || '';
  const isRelation = node => win.isClassicalNahuatlSupplementationFrame?.(node) === true;
  function beginAction(kind) {
    const target = selection.target;
    if (!target) return;
    if (kind === 'move') {
      const control = getOrderControl();
      if (!control) return;
      setRequestedAction('move');
      const field = control.closest('.classical-whole-canvas-choice') || control.parentNode;
      field.classList.add('composition-current-choice');field.tabIndex=-1;field.focus();field.scrollIntoView({block:'center'});
      schedule();return;
    }
    const bindingId = kind === 'address' ? 'vocative:principal' : kind === 'implicit' ? 'deleted-principal:dependent' : 'supplementation:principal';
    if (!win.stageClassicalCompositionTarget?.(target,bindingId)) return;
    setRequestedAction(kind);
    materialSupplied = false;
    schedule();
    if (kind==='add'||kind==='ask'||kind==='implicit') doc.getElementById('classical-source-whole')?.focus();
  }
  let scheduled = false;
  const plan = doc.getElementById('classical-capability-operation-plan');
  const operationControl=doc.getElementById('classical-capability-navigator-operation');
  if(operationControl?.dataset.classicalCompositionDisclosureRefreshBound!=='true') {
    operationControl.addEventListener('change',schedule);
    operationControl.dataset.classicalCompositionDisclosureRefreshBound='true';
  }
  for(const type of ['change','input'])doc.addEventListener(type,event=>{
    if(event.target.closest?.('#classical-rule-logic-controls, #classical-grammar-continuation .classical-clause-relation-workflow'))schedule();
  });
  function getOrderControl() {
    const controls=Array.from(doc.querySelectorAll('[data-classical-clause-relation-decision="supplementation-order"]'));
    const visible=control=>!control.parentElement?.closest('[hidden]');
    return controls.find(control=>plan?.contains(control) && visible(control)) || controls.find(visible) || null;
  }
  const home = plan?.parentNode;
  const anchor = doc.createComment('prototype menu original home');
  if (plan) home.insertBefore(anchor, plan);
  style.textContent += `
    .composition-part {min-width:0;overflow-wrap:anywhere}
    .composition-local-menu [hidden] {display:none!important}
    .composition-local-menu .classical-capability-operation-plan {display:grid;grid-template-columns:minmax(0,1fr);gap:8px;padding:12px;border:1px solid #ccd7ce;border-radius:10px;background:#fffdf5;font:inherit}
    .composition-local-menu .classical-capability-operation-plan__choices {display:grid;grid-template-columns:minmax(0,1fr);gap:10px}
    .composition-local-menu :is(select,button,input) {font:inherit;min-height:40px;max-width:100%;box-sizing:border-box}
    .composition-local-menu :is(.classical-capability-operation-plan__status,.classical-capability-operation-plan__fact dd) {font-size:13px;color:#52645a;line-height:1.45;margin:0}
    .composition-local-menu .classical-capability-operation-plan__actions {display:flex;justify-content:flex-end}
    .composition-actions {display:flex;flex-wrap:wrap;gap:8px;margin:12px 0;grid-column:1/-1}
    .composition-actions button,.composition-part {border:1px solid #b7c9bf;color:#173e34;background:#fffdf5;font:inherit;min-height:40px;padding:9px 12px;border-radius:8px;text-align:left;cursor:pointer}
    .composition-part[aria-pressed=true] {border:2px solid #315f50;background:#edf4ed}
    .composition-parts {grid-template-columns:repeat(auto-fit,minmax(180px,1fr));grid-column:1/-1}
    .composition-current-choice {outline:2px solid #315f50;outline-offset:4px;border-radius:6px}
    .composition-selection-path,.composition-pending-hint {grid-column:1/-1;font-size:13px;line-height:1.45;margin:6px 0;color:#52645a}
    @media(max-width:600px) {.composition-actions button {flex:1 1 140px}.composition-role-tray {grid-template-columns:1fr}.classical-result-continuation-card__content {font-size:20px!important}}
  `;
  function update() {
    scheduled = false;
    if (!plan) return;
    const binding = doc.getElementById('classical-capability-navigator-binding');
    const bindingField = doc.getElementById('classical-capability-navigator-binding-field');
    const operation = doc.getElementById('classical-capability-navigator-operation');
    const options = binding ? Array.from(binding.options) : [];
    const roles = options.filter(option => ['supplementation:principal', 'supplementation:adjoined'].includes(option.value));
    let tray = plan.querySelector('.composition-role-tray');
    const active = operation?.value === 'sentence:supplementation' && roles.length > 0;
    if (active && bindingField) {
      if (!tray) {
        tray = doc.createElement('div');
        tray.className = 'composition-role-tray';
        tray.setAttribute('aria-label', 'Sentence role');
        bindingField.before(tray);
        const other = doc.createElement('details');
        other.className = 'composition-other-roles';
        const summary = doc.createElement('summary');
        summary.textContent = 'Other relationships';
        other.append(summary);
        tray.after(other);
        other.append(bindingField);
      }
      const signature = roles.map(option => `${option.value}:${option.disabled}`).join('|') + binding.value;
      if (tray.dataset.signature !== signature) {
        tray.dataset.signature = signature;
        tray.replaceChildren();
        roles.forEach(option => {
          const principal = option.value === 'supplementation:principal';
          const button = doc.createElement('button');
          button.type = 'button';
          button.disabled = option.disabled;
          button.setAttribute('aria-pressed', String(binding.value === option.value));
          button.textContent = principal ? 'Principal' : 'Adjunct';
          const help = doc.createElement('small');
          help.textContent = principal ? 'Contains the head pronoun' : 'Supplies its reference';
          button.append(help);
          button.addEventListener('click', () => {
            binding.value = option.value;
            binding.dispatchEvent(new win.Event('change', {bubbles:true}));
            schedule();
          });
          tray.append(button);
        });
      }
      // Once material is bound, role replacement is an optional change.
      const roleContext=plan.querySelector('.composition-other-roles');
      if(requestedAction && materialSupplied && roleContext && tray.parentNode!==roleContext)roleContext.append(tray);
      if((!requestedAction || !materialSupplied) && roleContext && tray.parentNode===roleContext)roleContext.before(tray);
    } else if (tray) {
      const other = plan.querySelector('.composition-other-roles');
      if (bindingField && other) other.before(bindingField);
      other?.remove();
      tray.remove();
    }
    doc.querySelectorAll('[data-classical-clause-relation-marker-result]').forEach(control => {
      const relation = doc.querySelector('[data-classical-clause-relation-decision="relation"]')?.value;
      const label = control.parentNode.querySelector('.classical-whole-canvas-choice__label');
      if (label) {
        const next = relation === 'supplementation' ? 'Boundary: ca → principal · in → adjunct' : 'Optional marker Result';
        if (label.textContent !== next) label.textContent = next;
      }
    });
    doc.querySelectorAll('[data-classical-clause-relation-decision="supplementation-reference-mode"]').forEach(control => {
      let guide = control.parentNode.querySelector('.composition-role-guide');
      if (!guide) { guide = doc.createElement('p'); guide.className = 'composition-role-guide'; control.after(guide); }
      const message = control.value === 'included'
        ? 'Included reference: the whole adjunct is what the head pronoun refers to.'
        : control.value === 'shared' ? 'Shared reference: a pronoun in each clause refers to the same entity.' : '';
      if (guide.textContent !== message) guide.textContent = message;
    });
    doc.querySelectorAll('[data-classical-user-action="compose-captured-clause-results"]').forEach(button=>{
      if(button.textContent!=='Make Result')button.textContent='Make Result';
    });
    const localChoices=plan.querySelectorAll('[data-classical-clause-relation-decision]');
    const localIds=new Set(Array.from(localChoices).map(control=>control.dataset.classicalClauseRelationDecision));
    doc.querySelectorAll('#classical-grammar-continuation [data-classical-clause-relation-decision]').forEach(control=>{
      const field=control.closest('.classical-whole-canvas-choice');
      const hidden=selected && localIds.has(control.dataset.classicalClauseRelationDecision);
      if(field && field.hidden!==hidden)field.hidden=hidden;
    });
    let cards = Array.from(doc.querySelectorAll('.classical-result-continuation-card'));
    cards.forEach(item => {
      const exact = win.getClassicalResultContinuationIdentity?.(item);
      const content = item.querySelector('.classical-result-continuation-card__content')?.textContent;
      if (exact && content) displayCache.set(exact, content);
    });
    const completed = cards.find(item =>
      win.isClassicalResultContinuationCurrentComposition?.(item)
      || (!requestedAction || requestedAction === 'continue')
        && win.isClassicalResultContinuationAcceptedApplication?.(item));
    if (completed && exactForCard(completed) !== selection.result) {
      selection.accept(exactForCard(completed));setRequestedAction('');materialSupplied=false;selected=true;
    }
    let card = cards.find(item => exactForCard(item) === selection.result);
    if (!card && selected && selection.result) {
      card=doc.createElement('section');card.className='classical-result-continuation-card composition-accepted-result';
      card.setAttribute('aria-label','Accepted sentence');
      const label=doc.createElement('span');label.className='classical-result-continuation-card__scope';label.textContent='Accepted sentence';
      const sentence=doc.createElement('strong');sentence.className='classical-result-continuation-card__content';sentence.textContent=surface(selection.result);
      card.append(label,sentence);presentationIdentities.set(card,selection.result);
      const resultCue=doc.getElementById('composition-result-cue');
      if(resultCue)resultCue.after(card);else doc.getElementById('container-tense-grid')?.prepend(card);
    }
    card ||= completed || cards.at(-1);
    cards.filter(item=>item.classList.contains('composition-accepted-result') && item!==card).forEach(item=>item.remove());
    cards.forEach(candidate => {
      const exact=exactForCard(candidate);
      let supply=candidate.querySelector('.composition-supply');
      const needed=requestedAction==='add'||requestedAction==='ask' ? 'supplementation:adjoined' : '';
      let contract=exact && supplyAvailabilityCache.get(exact);
      if (needed && exact && exact!==selection.result && !supplyAvailabilityCache.has(exact)) {
        contract=win.issueClassicalClauseRelationBindingFrame?.('sentence:supplementation',exact,['adjoined'])||null;
        supplyAvailabilityCache.set(exact,contract);
      }
      if (needed && exact && exact!==selection.result && contract?.bindingIds?.includes(needed)) {
        const scope=candidate.querySelector('.classical-result-continuation-card__scope');
        if(scope && scope.textContent!=='Prepared material')scope.textContent='Prepared material';
        if (!supply) {
          supply=doc.createElement('button');supply.type='button';supply.className='composition-supply classical-whole-canvas-action';supply.textContent='Use as adjunct';
          supply.addEventListener('click',()=>{
            if (!win.stageClassicalCompositionTarget?.(exact,needed)) return;
            materialSupplied=true;schedule();
            const choice=plan.querySelector('[data-classical-clause-relation-decision="supplementation-reference-mode"]');
            const field=choice?.closest('.classical-whole-canvas-choice') || choice?.parentElement || plan;
            field.tabIndex=-1;field.focus();field.scrollIntoView({block:'center'});
          });candidate.append(supply);
        }
      } else supply?.remove();
    });
    // Other Results remain accessible; selection never hides constituent access.
    if (card) {
      const exact = exactForCard(card);
      if (exact && !selected) selection.accept(exact);
      if (selected && exact === selection.result) selectedCard = card;
      card.querySelector('.composition-parts')?.remove();
      if(exact && selection.result!==exact)selection.accept(exact);
      resultActions(card,{exact,requestedAction:requestedPartAction||requestedAction,preserveAcceptedPresentation:true});
      let actions=card.querySelector('.composition-actions');
      if (!actions) {actions=doc.createElement('div');actions.className='composition-actions';actions.setAttribute('aria-label','Sentence actions');card.append(actions);}
      const target=selection.target;
      let availability = target && availabilityCache.get(target);
      if (target && !availabilityCache.has(target)) {
        availability = win.issueClassicalClauseRelationBindingFrame?.('sentence:supplementation', target,['principal','dependent']) || null;
        availabilityCache.set(target, availability);
      }
      const issued = availability?.exactResultIdentityPreserved === true;
      const permits = id => issued && availability?.bindingIds?.includes(id);
      const order=getOrderControl();
      const buttons=[['ask','Ask about this',permits('supplementation:principal')],['address','Address someone',permits('vocative:principal')],['implicit','Leave clause implicit',permits('deleted-principal:dependent')]];
      const actionSignature=buttons.map(([id,label,available])=>`${id}:${available}`).join('|');
      if (actions.dataset.signature!==actionSignature) {
        actions.dataset.signature=actionSignature;actions.replaceChildren();
        buttons.filter(([, , available])=>available).forEach(([id,label])=>{
          const button=doc.createElement('button');button.type='button';button.textContent=label;
          button.addEventListener('click',()=>{if(!selected)selection.accept(exact);selected=true;selectedCard=card;beginAction(id);schedule();});actions.append(button);
        });
      }
      let context=card.querySelector('.composition-pending-hint');
      if (!context) {context=doc.createElement('p');context.className='composition-pending-hint';card.append(context);}
      const messages={change:'Choose a change in Build, then Make Result.',continue:'Choose the next grammatical operation.',move:'Choose the supplement’s placement in Build, then Make Result.',add:'Add another complete clause. Choose its relation, then Make Result.',ask:'Supply an interrogative clause as the adjunct. Grammar determines the resulting roles.',address:'Choose the vocative and speaker context. Grammar determines its form.',implicit:'The selected clause is retained as the omitted principal. Supply the surviving material and choose the deletion.'};
      const message=issued ? messages[requestedPartAction||requestedAction] || '' : 'Select the whole sentence or a completed inner composition to continue.';
      if(context.textContent!==message)context.textContent=message;
      if(context.hidden!==!message)context.hidden=!message;
    }
    const action = card?.querySelector('[data-classical-result-continuation-kind="exact-result-to-source"]');
    if (action && action.dataset.compositionContinuationBound !== 'true') {
      action.dataset.compositionContinuationBound = 'true';
      action.addEventListener('click', () => { selection.accept(win.getClassicalResultContinuationIdentity?.(card)); selected = true; selectedCard = card; setRequestedAction('continue'); schedule(); });
    }
    // One stable home for Grammar, even while Source supplies new material.
    if (plan.parentNode !== home) {
      home.insertBefore(plan, anchor.nextSibling);
    }
    refreshPresentation({action:requestedAction,materialSupplied,card,getIdentity:exactForCard,isCurrentComposition:item=>win.isClassicalResultContinuationCurrentComposition?.(item)});
    interfaceTool.refresh();
    // Our presentation writes are already accounted for in this completed pass.
    // Do not feed those writes back into a second layout pass.
    compositionObserver?.takeRecords();

  }
  function schedule() {
    if (!scheduled) { scheduled = true; requestAnimationFrame(update); }
  }
  function releaseSourceReturnPresentation(preserveLegacyIntent = false) {
    selected=false;selectedCard=null;setRequestedAction('', {preserveLegacyIntent});materialSupplied=false;
    selection.accept(null);
    doc.querySelectorAll('.composition-accepted-result').forEach(card=>card.remove());
    schedule();
  }
  doc.addEventListener('classical:source-committed', () => {
    // Supplying another clause keeps its requested relation. Returning to a
    // stem after Continue withdraws only the old presentation selection.
    if (!requestedAction || requestedAction==='continue') releaseSourceReturnPresentation(true);
  });
  doc.addEventListener('change', event => {
    if(event.target.matches?.('#classical-grammar-workspace-history-node,#classical-grammar-workspace-history-compare-node,.path-build-label select')) schedule();
  });
  doc.addEventListener('classical:interface-model-changed',schedule);
  doc.addEventListener('click', event => {
    if (event.target.closest('#classical-grammar-workspace-history-compare, .composition-disclosure > summary')) schedule();
    if (event.target.closest('#verb-entry-clear')) releaseSourceReturnPresentation();
    if (event.target.closest('[data-composition-disclosure="composition-controls"] > summary, .classical-clause-relation-workflow [data-classical-continuation-menu] > summary')) schedule();
  });
  // Native owners can finish choice visibility without replacing any content.
  // Observe their sections, not our disclosure writes, to avoid a feedback loop.
  compositionObserver=new MutationObserver(records => {
    if (records.some(record => record.type === 'childList'
      || record.target.matches?.('[data-classical-nnc-grammar-section], [data-classical-vnc-authority-disclosure]'))) schedule();
  });
  compositionObserver.observe(doc.getElementById('classical-app-root') || doc.documentElement,
    {childList:true,subtree:true,attributes:true,attributeFilter:['hidden']});
  new win.ResizeObserver(schedule).observe(doc.getElementById('classical-workbench'));
  win.addEventListener('resize',schedule);
  update();
  doc.dispatchEvent(new win.Event('classical:presentation-ready'));
}
initializeCompositionWorkbench().catch(error => {
  document.dispatchEvent(new CustomEvent('classical:presentation-failed', {detail:error}));
  console.error('Failed to prepare the composition interface.', error);
});
