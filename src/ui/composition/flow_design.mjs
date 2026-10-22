import {createMakePreview} from './make_preview.mjs?v=20261022-1';
import {getNativeGrammarControls,getPendingChoiceControls} from './choice_design.mjs?v=20261022-reset-eligibility-1&writingSource=20261022-1&fixedChoices=20261022-1';
// Navigation and layout only. The one native Make element keeps its handler.
const key=control=>control.id || (control.dataset.classicalCapabilityChoiceId?`owner-choice:${control.dataset.classicalCapabilityChoiceId}`:`clause-choice:${control.dataset.classicalClauseRelationDecision}`);
const makeReceivers=new WeakMap();
export const notifyExplicitMakeResult=(root,before,after)=>makeReceivers.get(root)?.(before,after);
export function resolveSourceSlotFocus(doc,slot) {
  if(!slot?.pickerRole)return null;
  const field=doc.getElementById('classical-capability-required-result-field'),native=doc.getElementById('classical-capability-required-result');
  if(!field || field.closest('[hidden]') || !native || native.disabled)return null;
  const copy=doc.getElementById(`${native.id}-choices`);
  if(copy?.dataset.classicalMirrorsControl===native.id && !copy.disabled && !copy.closest('[hidden]'))return copy;
  return !native.hasAttribute('data-classical-compact-choice-original') && native.getAttribute('aria-hidden')!=='true'?native:null;
}
function focusTarget(doc,control) {
  const mirror=[...doc.querySelectorAll('[data-composition-choice-for]')].find(node=>node.nativeControl===control);
  if(mirror)return [...mirror.children].find(node=>node.dataset.compositionChoiceValue===control.value && !node.disabled)
    || [...mirror.children].find(node=>!node.disabled) || null;
  return control.getAttribute('aria-hidden')!=='true'?control:null;
}
export function getPendingNavigationFields(doc) {
  return getPendingChoiceControls(doc).filter(control=>!control.disabled && !control.readOnly
    && control.closest('[data-composition-pending-field]')?.dataset.compositionPendingField===key(control))
    .map(control=>({key:key(control),label:(control.labels?.[0]?.querySelector('.control-label-text,.classical-rule-control__label,.classical-whole-canvas-choice__label,.classical-capability-operation-plan__choice-label')?.textContent
      || control.labels?.[0]?.childNodes[0]?.textContent || control.getAttribute('aria-label') || control.id).split(' · ')[0].trim(),target:focusTarget(doc,control)}))
    .filter(field=>field.label && field.target && !field.target.closest('[hidden]'));
}
export function createResultArrivalTracker() {
  let armed=false,before=null;
  return {arm(exact){before=exact;armed=true;},cancel(){armed=false;before=null;},finish(exact){const changed=armed && Boolean(exact) && exact!==before;armed=false;before=null;return changed;}};
}
export function resolveDecisionFocus(doc,decisions) {
  for(const decision of decisions) {
    const controls=getNativeGrammarControls(doc).filter(control=>!control.disabled
      && (control.dataset.classicalClauseRelationDecision===decision.id || control.dataset.classicalCapabilityChoiceId===`clause-choice:${decision.id}`)
      && [...control.options||[]].some(option=>option.value===decision.value && !option.disabled && !option.hidden));
    const control=controls.find(c=>doc.getElementById('classical-capability-operation-plan')?.contains(c)) || controls[0];
    if(!control)continue;
    const mirror=[...doc.querySelectorAll('[data-composition-choice-for]')].find(node=>node.nativeControl===control);
    if(mirror) {
      const button=[...mirror.children].find(node=>node.dataset.compositionChoiceValue===decision.value && !node.disabled);
      if(button && !button.closest('[hidden]'))return button;
    } else if(control.getAttribute('aria-hidden')!=='true' && !control.closest('[hidden]'))return control;
  }
  return null;
}
export function focusNativeChoice(target) {
  for(let parent=target.parentElement;parent;parent=parent.parentElement)if(parent.tagName==='DETAILS')parent.open=true;
  target.focus({preventScroll:true});target.scrollIntoView({block:'center',behavior:'auto'});
}
export function highlightSourceDecision(doc,target) {
  const mirror=target.closest?.('[data-composition-choice-for]');
  const native=mirror?.nativeControl || target;
  const id=native.dataset?.classicalClauseRelationDecision || native.dataset?.classicalCapabilityChoiceId?.replace(/^clause-choice:/u,'');
  const value=target.dataset?.compositionChoiceValue || native.value;
  for(const endpoint of doc.querySelectorAll('[data-composition-focus-decisions]')) {
    const decisions=JSON.parse(endpoint.dataset.compositionFocusDecisions||'[]');
    endpoint.classList.toggle('composition-contact-focused',Boolean(id && decisions.some(d=>d.id===id && d.value===value)));
  }
}
export function createFlowDesign(doc,read=()=>null) {
  const refreshMakePreview=createMakePreview(doc);
  const write=(node,value)=>{if(node.textContent!==value)node.textContent=value;};
  const arrival=createResultArrivalTracker();let cueTimer=null;
  makeReceivers.set(doc.getElementById('classical-workbench'),(before,after)=>{
    arrival.arm(before);
    if(!arrival.finish(after) || read()?.acceptedResult!==after)return;
    doc.defaultView.queueMicrotask(()=>doc.defaultView.requestAnimationFrame(()=>{
      if(read()?.acceptedResult!==after)return;
      const panel=doc.getElementById('classical-result-panel'),heading=doc.getElementById('classical-stage-result-heading');
      if(!panel || !heading)return;
      const card=panel.querySelector('.classical-result-continuation-card') || panel;
      if(cueTimer!==null)doc.defaultView.clearTimeout(cueTimer);
      panel.querySelectorAll('.composition-result-arrived').forEach(node=>node.classList.remove('composition-result-arrived'));
      card.classList.add('composition-result-arrived');heading.tabIndex=-1;focusNativeChoice(heading);
      const root=doc.getElementById('classical-workbench');root.dataset.compositionResultArrival=String(Number(root.dataset.compositionResultArrival||0)+1);
      for(const button of root.querySelectorAll('[data-classical-panel-jump]')) {
        if(button.dataset.classicalPanelJump==='classical-result-panel')button.setAttribute('aria-current','step');else button.removeAttribute('aria-current');
      }
      cueTimer=doc.defaultView.setTimeout(()=>{card.classList.remove('composition-result-arrived');cueTimer=null;},2400);
    }));
  });
  const closePending=restore=>{
    const list=doc.getElementById('composition-pending-navigation'),button=doc.querySelector('[data-composition-flow-pending]');
    if(list)list.hidden=true;if(button){button.setAttribute('aria-expanded','false');if(restore)button.focus({preventScroll:true});}
  };
  doc.addEventListener('click',event=>{if(!event.target.closest?.('.composition-pending-navigation-wrap'))closePending(false);});
  doc.addEventListener('keydown',event=>{if(event.key==='Escape' && !doc.getElementById('composition-pending-navigation')?.hidden){event.preventDefault();closePending(true);}});
  return function refresh(state) {
    const root=doc.getElementById('classical-workbench'),nav=root?.querySelector('.classical-four-panel-navigation');
    const make=doc.getElementById('classical-capability-apply-operation');if(!root || !nav || !make)return;
    let bar=doc.getElementById('composition-current-flow');
    if(!bar) {
      bar=doc.createElement('div');bar.id='composition-current-flow';bar.className='composition-current-flow';bar.setAttribute('role','group');bar.setAttribute('aria-label','Current Source and Make');
      const source=doc.createElement('span');source.className='composition-current-source';
      const label=doc.createElement('span');label.textContent='Source';
      const form=doc.createElement('span');form.dataset.compositionCurrentSource='true';source.append(label,form);
      const wrap=doc.createElement('div');wrap.className='composition-pending-navigation-wrap';
      const pending=doc.createElement('button');pending.type='button';pending.className='composition-flow-pending';pending.dataset.compositionFlowPending='true';pending.setAttribute('aria-expanded','false');pending.setAttribute('aria-controls','composition-pending-navigation');
      const list=doc.createElement('div');list.id='composition-pending-navigation';list.className='composition-pending-navigation';list.hidden=true;list.setAttribute('role','group');list.setAttribute('aria-label','Pending choices');
      pending.addEventListener('click',()=>{if(!getPendingNavigationFields(doc).length)return;list.hidden=!list.hidden;pending.setAttribute('aria-expanded',String(!list.hidden));if(!list.hidden)list.querySelector('button')?.focus({preventScroll:true});});
      wrap.append(pending,list);bar.append(source,wrap);nav.append(bar);
    }
    // Moving the original avoids a second action or a stale readiness mirror.
    if(make.parentElement!==bar)bar.append(make);
    const form=bar.querySelector('[data-composition-current-source]');
    const source=state?.sourceSurface || '';
    write(form,source);if(form.title!==source)form.title=source;
    const fields=getPendingNavigationFields(doc),count=fields.length;
    const pending=bar.querySelector('[data-composition-flow-pending]');write(pending,`${count} ${count===1?'change':'changes'}`);pending.setAttribute('aria-label',`${count} pending ${count===1?'change':'changes'}`);if(pending.hidden!==!count)pending.hidden=!count;
    const list=doc.getElementById('composition-pending-navigation'),signature=JSON.stringify(fields.map(field=>[field.key,field.label]));
    if(list.dataset.signature!==signature) {
      list.dataset.signature=signature;list.replaceChildren(...fields.map(field=>{
        const button=doc.createElement('button');button.type='button';button.textContent=field.label;button.dataset.compositionPendingTarget=field.key;
        button.addEventListener('click',()=>{const current=getPendingNavigationFields(doc).find(item=>item.key===field.key);closePending(false);if(current)focusNativeChoice(current.target);});return button;
      }));
    }
    if(!count)closePending(false);
    refreshMakePreview();
    const height=`${Math.ceil(nav.getBoundingClientRect().height)+12}px`;
    if(root.style.getPropertyValue('--composition-nav-offset')!==height)root.style.setProperty('--composition-nav-offset',height);
  };
}
