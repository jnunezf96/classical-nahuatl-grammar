// Presentation keeps exact references only to scope the draft. They cannot
// authorize grammar; native controls and their existing handlers do that work.
const contexts=new WeakMap(), appliedRoutes=new WeakMap(), appliedReaders=new WeakMap();
export const setChoiceDesignContext=(root,context)=>{if(root)contexts.set(root,context);};
const readContext=root=>{const value=contexts.get(root);return typeof value==='function' ? value() : value;};
export const setAppliedRoutePresentation=(root,reader)=>{if(root)appliedReaders.set(root,reader);};
export function classifyNativeChoice(options,selected,disabled=false,ownerFixed=false) {
  const offered=options.filter(option=>option.value && !option.hidden);
  const enabled=offered.filter(option=>!option.disabled);
  if(disabled)return ownerFixed && enabled.length===1 && enabled[0].value===selected ? 'fixed' : 'menu';
  if(!enabled.length)return 'menu';
  if(enabled.length===1)return enabled[0].value===selected ? 'fixed' : 'menu';
  return offered.length<=4 && offered.every(option=>option.label.length<=34) ? 'buttons' : 'menu';
}
const sameContext=(a,b)=>Boolean(a?.input && a.input===b?.input
  && a.operation===b.operation && a.binding===b.binding);
export function createChoiceDraftTracker() {
  let scope=null;
  let accepted=null;
  const baseline=new Map(), pendingBaseline=new Map();
  const changedFrom=(reference,context,fields)=>sameContext(scope,context) ? fields.filter(field=>reference.has(field.id)
    && reference.get(field.id).value!==field.value).map(field=>field.id) : [];
  return {
    observe(context,fields) {
      if(!sameContext(scope,context)) {scope=context?.input ? {...context} : null;baseline.clear();pendingBaseline.clear();accepted=context?.accepted;}
      if(!scope)return;
      if(accepted!==context.accepted) {pendingBaseline.clear();accepted=context.accepted;}
      for(const field of fields) {
        if(!baseline.has(field.id))baseline.set(field.id,{...field});
        if(!pendingBaseline.has(field.id))pendingBaseline.set(field.id,{...field});
      }
    },
    changed(context,fields) {
      return changedFrom(pendingBaseline,context,fields);
    },
    resetChanged(context,fields,canRestore=()=>true) {return changedFrom(baseline,context,fields).filter(id=>canRestore(baseline.get(id)));},
    restore(context,currentContext,stage) {
      if(!sameContext(scope,context))return false;
      const initial={...scope};
      for(const field of baseline.values()) {
        if(!sameContext(initial,currentContext()))return false;
        stage({...field});
      }
      return true;
    },
  };
}
// Read-only current Source relevance. This never admits or executes an owner.
export function getWritingSourcePresentation(doc) {
  if(doc.getElementById?.('classical-workbench')?.dataset?.classicalWritingSourceMode!=='true')return null;
  const runtime=doc.defaultView,binding=runtime?.getActiveClassicalGrammarTypedSourceOperationBinding?.();
  const source=binding?.exactSource,navigator=binding?.navigator;
  const current=runtime?.isClassicalGrammarTypedSourceOperationBindingFrame?.(binding)===true
    && runtime?.isClassicalNahuatlTranscriptionSourceFrame?.(source)===true
    && runtime?.isClassicalGrammarApplicationCapabilityNavigator?.(navigator)===true
    && navigator.exactSource===source;
  return {binding:current?binding:null,choiceIds:new Set(current?Object.keys(binding.choiceOptionProjection || {}):[]),
    operationIds:new Set(current?navigator.operations.filter(operation=>operation.availabilityStatus==='available'
      && operation.sourceIdentityMatched===true && operation.ownerPreflightFrameValidated===true).map(operation=>operation.operationId):[])};
}
const fieldsSelector='#classical-rule-logic-controls select[id], #classical-rule-logic-controls select[data-classical-capability-choice-id], #classical-rule-logic-controls select[data-classical-clause-relation-decision], #classical-rule-logic-controls input[id]:not([type="hidden"]), #classical-grammar-continuation .classical-clause-relation-workflow select[id], #classical-grammar-continuation .classical-clause-relation-workflow select[data-classical-clause-relation-decision]';
function grammarControls(doc) {
  const writing=getWritingSourcePresentation(doc);
  const controls=[...doc.querySelectorAll(fieldsSelector)].filter(control=>
    (!writing || writing.choiceIds.has(control.dataset.classicalCapabilityChoiceId)
      && control.closest('#classical-capability-operation-choices'))
    && !control.closest('[hidden], [data-composition-duplicate-control], [data-composition-target-subject-agreement], [data-composition-native-choice-mirror], [data-classical-source-identity-controls], #classical-capability-navigator, #classical-capability-required-result-field')
    && !control.hasAttribute('data-classical-choice-group')
    // Compact menus forward to this exact owner control. Make recreates it
    // without the display marker, so its legal choice must survive both forms.
    && (!control.hasAttribute('data-classical-compact-choice-original')
      || Boolean(control.dataset.classicalClauseRelationDecision)
      || (control.dataset.classicalCapabilityOwnerProjection==='exact-binding'
        && control.closest('#classical-capability-operation-choices')))
    && control.id!=='classical-built-in-particle-choices'
    && !/output-scope|classical-construction-operation|source-|filter|search|example/u.test(control.id)
    && ['SELECT','INPUT'].includes(control.tagName));
  return controls.filter((control,index)=>controls.findIndex(other=>controlKey(other)===controlKey(control))===index);
}
const controlKey=control=>control.id || (control.dataset.classicalCapabilityChoiceId ? `owner-choice:${control.dataset.classicalCapabilityChoiceId}` : `clause-choice:${control.dataset.classicalClauseRelationDecision}`);
const findControl=(doc,key)=>grammarControls(doc).find(control=>controlKey(control)===key);
const fieldValue=control=>control.type==='checkbox' ? control.checked : control.value;
function canRestoreNativeChoice(control,field) {
  return Boolean(control && !control.disabled && !control.readOnly
    && (control.tagName!=='SELECT' || [...control.options].some(option=>option.value===field.value
      && (!option.disabled || field.value==='') && !option.hidden)));
}
// Result-local Order has its own edit handler. Include it only in presentation,
// never in the native grammar-dispatch collector or generated button mirrors.
export function getPendingChoiceControls(doc,nativeControls=null) {
  const controls=nativeControls ? [...nativeControls] : grammarControls(doc),order=doc.getElementById('classical-result-edit-order');
  if(order && !order.disabled && !order.closest('[hidden]') && !controls.includes(order))controls.push(order);
  return controls;
}
function controlLabel(control) {
  return (control.labels?.[0]?.querySelector('.control-label-text,.classical-rule-control__label')?.textContent
    || control.labels?.[0]?.childNodes[0]?.textContent || control.getAttribute('aria-label') || control.id)
    .split(' · ')[0].trim();
}
function renderChips(doc,host,key,labels) {
  if(!host)return;
  let tray=host.querySelector(`[data-composition-facts="${key}"]`);
  if(!tray) {
    tray=doc.createElement('div');tray.className='composition-fact-chips';tray.dataset.compositionFacts=key;
    tray.setAttribute('role','list');tray.setAttribute('aria-label',key==='applied' ? 'Applied route' : 'Selected route choices');
    host.append(tray);
  }
  const signature=JSON.stringify(labels);
  if(tray.dataset.signature!==signature) {
    tray.dataset.signature=signature;tray.replaceChildren(...labels.map(label=>{
      const chip=doc.createElement('span');chip.setAttribute('role','listitem');chip.textContent=label;return chip;
    }));
  }
  if(tray.hidden!==!labels.length)tray.hidden=!labels.length;
}
function projectSourceSubjectFacts(doc,root,context) {
  const active=Boolean(context?.input && context.targetSubject && context.sourceSubjectFacts?.subject);
  if(root.dataset.compositionTargetSubject!==String(active))root.dataset.compositionTargetSubject=String(active);
  let facts=doc.querySelector('[data-composition-source-subject-facts]');
  let duplicate=null;
  if(active) {
    if(!facts) {
      facts=doc.createElement('p');facts.dataset.compositionSourceSubjectFacts='true';
      facts.className='composition-fixed-value';facts.setAttribute('role','note');
      doc.getElementById('classical-continuation-target')?.after(facts);
    }
    const text=`Source subject: ${context.sourceSubjectFacts.subject}`;
    if(facts.textContent!==text)facts.textContent=text;
    // These native IDs now represent the owner's target selections. The
    // inherited Source remains the authenticated read-only fact above.
    for(const id of ['classical-rule-logic-subject','classical-rule-logic-vnc-subject-person','classical-rule-logic-vnc-subject-number']) {
      const control=doc.getElementById(id),host=control?.closest('label, [data-classical-rule-control]');
      if(!control || !host)continue;
      for(const name of ['data-classical-result-source-fact','data-classical-result-source-fact-owner'])if(host.hasAttribute(name))host.removeAttribute(name);
      const availability=control.disabled?'disabled':'enabled',input=control.disabled?'not-required':'required';
      if(host.dataset.classicalControlAvailability!==availability)host.dataset.classicalControlAvailability=availability;
      if(host.dataset.classicalAuthorityUserInput!==input)host.dataset.classicalAuthorityUserInput=input;
    }
    const agreement=doc.getElementById('classical-rule-logic-subject')?.closest('[data-classical-vnc-subject-agreement-mirror]');
    const axes=['person','number'].map(axis=>doc.getElementById(`classical-rule-logic-vnc-subject-${axis}`));
    if(agreement && axes.every(control=>control?.closest('label') && !control.closest('label').closest('[hidden],[aria-hidden="true"]'))) {
      duplicate=agreement;
      if(agreement.dataset.compositionTargetSubjectAgreement!=='true')agreement.dataset.compositionTargetSubjectAgreement='true';
    }
  }
  if(facts && facts.hidden===active)facts.hidden=!active;
  // Own only this projection marker, never the native owner's hidden/ARIA state.
  for(const host of doc.querySelectorAll('[data-composition-target-subject-agreement]'))if(host!==duplicate)host.removeAttribute('data-composition-target-subject-agreement');
}
export function createChoiceDesign(doc) {
  const tracker=createChoiceDraftTracker();
  const mirrors=new Map();
  function restore() {
    const root=doc.getElementById('classical-workbench');
    const context=readContext(root);
    tracker.restore(context,()=>readContext(root),field=>{
      const control=findControl(doc,field.id);
      if(!control || !grammarControls(doc).includes(control) || !canRestoreNativeChoice(control,field))return;
      if(fieldValue(control)===field.value)return;
      if(control.type==='checkbox')control.checked=field.value;else control.value=field.value;
      control.dispatchEvent(new doc.defaultView.Event('change',{bubbles:true}));
    });
    refresh();
  }
  function projectChoice(control) {
    if(control.tagName!=='SELECT')return;
    const options=[...control.options].map(option=>({value:option.value,label:option.textContent.trim(),
      disabled:option.disabled || Boolean(option.parentElement?.tagName==='OPTGROUP' && option.parentElement.disabled),
      hidden:option.hidden || Boolean(option.parentElement?.tagName==='OPTGROUP' && option.parentElement.hidden),
      // Number owners hide incompatible siblings for compactness. Keep their
      // native restrictions while showing those declared alternatives as facts.
      showWhenFixed:control.id==='classical-rule-logic-nnc-subject-number' && option.disabled
        && option.dataset.classicalCanvasOptionAvailability==='disabled-by-current-mood'}));
    const ownerFixed=control.dataset.classicalCanvasSelectAvailability==='disabled-single-canvas-choice'
      || control.dataset.compositionPositionDerivedFixed==='true';
    const kind=control.dataset.classicalCompactChoiceDisplay==='true' ? 'menu' : classifyNativeChoice(options,control.value,control.disabled,ownerFixed);
    let mirror=mirrors.get(controlKey(control));
    if(kind==='menu') {
      mirror?.remove();mirrors.delete(controlKey(control));
      control.removeAttribute('data-composition-choice-mirror');
      if(control.dataset.compositionOriginalTabIndex!==undefined) {
        const index=control.dataset.compositionOriginalTabIndex;
        if(index)control.setAttribute('tabindex',index);else control.removeAttribute('tabindex');
        delete control.dataset.compositionOriginalTabIndex;
        control.removeAttribute('aria-hidden');
      }
      return;
    }
    const signature=JSON.stringify([kind,options]);
    if(!mirror || mirror.dataset.signature!==signature || mirror.nativeControl!==control) {
      mirror?.remove();mirror=doc.createElement('div');mirror.dataset.compositionChoiceFor=controlKey(control);
      mirror.dataset.signature=signature;mirror.nativeControl=control;
      mirror.className='composition-choice-buttons';mirror.dataset.compositionChoiceFixed=String(kind==='fixed');
      mirror.setAttribute('role','group');mirror.setAttribute('aria-label',controlLabel(control));
      control.after(mirror);mirrors.set(controlKey(control),mirror);
      for(const option of options.filter(option=>option.value && (!option.hidden || kind==='fixed' && option.showWhenFixed))) {
        const button=doc.createElement('button');button.type='button';button.textContent=option.label;
        button.dataset.compositionChoiceValue=option.value;button.disabled=option.disabled;
        if(kind==='buttons')button.addEventListener('click',()=>{
          const native=findControl(doc,controlKey(control));
          const offered=[...native?.options || []].find(item=>item.value===option.value);
          if(!native || native.disabled || !offered || offered.disabled || offered.hidden
            || offered.parentElement?.tagName==='OPTGROUP' && (offered.parentElement.disabled || offered.parentElement.hidden)
            || native.value===option.value)return;
          if(doc.defaultView.dispatchClassicalConstructionChoice) {
            if(!doc.defaultView.dispatchClassicalConstructionChoice(native,option.value))return;
          } else {
            native.value=option.value;
            native.dispatchEvent(new doc.defaultView.Event('change',{bubbles:true}));
          }
          refresh();
          [...(mirrors.get(controlKey(control))?.children || [])].find(item=>item.dataset.compositionChoiceValue===native.value)?.focus({preventScroll:true});
        });mirror.append(button);
      }
    }
    for(const button of mirror.children) {
      button.disabled=kind==='fixed' || control.disabled || Boolean(options.find(option=>option.value===button.dataset.compositionChoiceValue)?.disabled);
      const selected=button.dataset.compositionChoiceValue===control.value;
      button.setAttribute('aria-pressed',String(selected));
      button.title=kind==='fixed' && selected ? 'Selected by the current construction'
        : button.disabled ? 'Unavailable for the current construction' : '';
    }
    control.dataset.compositionChoiceMirror=kind;
    if(control.dataset.compositionOriginalTabIndex===undefined)control.dataset.compositionOriginalTabIndex=control.getAttribute('tabindex') || '';
    control.setAttribute('tabindex','-1');control.setAttribute('aria-hidden','true');
  }
  function refresh() {
    const root=doc.getElementById('classical-workbench');if(!root)return;
    const context=readContext(root);
    projectSourceSubjectFacts(doc,root,context);
    const nativeControls=grammarControls(doc),controls=getPendingChoiceControls(doc,nativeControls);
    // Badge projection reads this refresh's exact native inventory. Clicks and
    // Reset still resolve live controls when the user acts.
    const nativeControlByKey=new Map(nativeControls.map(control=>[controlKey(control),control]));
    const fields=nativeControls.map(control=>({id:controlKey(control),value:fieldValue(control)}));
    tracker.observe(context,fields);
    const dirty=new Set(context?.position ? controls.filter(control=>context.position.pending.includes(
      control.id==='classical-result-edit-order'?'order':context.choiceId(control))).map(controlKey) : tracker.changed(context,fields));
    for(const [id,mirror] of mirrors)if(!controls.some(control=>controlKey(control)===id)) {
      mirror.remove();mirrors.delete(id);
      const native=mirror.nativeControl;native?.removeAttribute('data-composition-choice-mirror');native?.removeAttribute('aria-hidden');native?.removeAttribute('tabindex');
      if(native)delete native.dataset.compositionOriginalTabIndex;
    }
    for(const control of controls) {
      if(nativeControls.includes(control))projectChoice(control);
      const host=control.closest('label') || control.parentElement;
      host.classList.toggle('composition-choice-pending',dirty.has(controlKey(control)));
      host.dataset.compositionPendingField=dirty.has(controlKey(control)) ? controlKey(control) : '';
    }
    // Clear withdrawn fields as well as the current inventory.
    for(const node of root.querySelectorAll('[data-composition-pending-field]'))if(!dirty.has(node.dataset.compositionPendingField))node.classList.remove('composition-choice-pending');
    for(const details of root.querySelectorAll('.composition-disclosure')) {
      const count=[...dirty].filter(id=>details.contains(nativeControlByKey.get(id))).length;
      const summary=details.querySelector(':scope > summary');if(!summary)continue;
      let badge=summary.querySelector('[data-composition-pending-count]');
      if(count && !badge){badge=doc.createElement('span');badge.dataset.compositionPendingCount='true';badge.className='composition-pending-count';summary.append(badge);}
      if(badge){if(badge.textContent!==String(count))badge.textContent=String(count);badge.setAttribute('aria-label',`${count} pending ${count===1?'change':'changes'}`);if(badge.hidden!==!count)badge.hidden=!count;}
    }
    const plan=doc.getElementById('classical-capability-operation-plan');
    let reset=doc.getElementById('composition-reset-choices');
    if(!reset && plan){reset=doc.createElement('button');reset.id='composition-reset-choices';reset.type='button';reset.textContent='Reset choices';reset.addEventListener('click',restore);plan.append(reset);}
    if(reset){reset.disabled=!context?.input || !tracker.resetChanged(context,fields,field=>canRestoreNativeChoice(nativeControlByKey.get(field.id),field)).length;reset.hidden=!context?.input;}
    const factIds=/contact|head-role|reference-mode|principal-(choice|role)|order|marker|rule-logic-(mood|tense|polarity)|nominal-embed-role/u;
    const clauseRoute=doc.getElementById('classical-capability-navigator')?.dataset.classicalCapabilityBindingFamily==='clause-relation';
    const facts=nativeControls.filter(control=>factIds.test(controlKey(control)) && control.tagName==='SELECT' && !control.disabled && control.value
      && (!clauseRoute || control.dataset.classicalClauseRelationDecision || control.dataset.classicalCapabilityChoiceId))
      .map(control=>`${controlLabel(control)}: ${[...control.options].find(option=>option.value===control.value)?.textContent.trim() || ''}`);
    renderChips(doc,plan,'draft',[...new Set(facts)].slice(0,6));
    const receipt=appliedReaders.get(root)?.();
    const prior=appliedRoutes.get(root);
    if(receipt && (prior?.result!==receipt.result || !prior?.labels.length))appliedRoutes.set(root,receipt);
    renderChips(doc,doc.querySelector('#classical-result-panel .classical-result-continuation-card'),'applied',appliedRoutes.get(root)?.labels || []);
    const parents=context?.parents || [];
    let earlier=doc.getElementById('composition-earlier-results');
    if(!earlier && parents.length){earlier=doc.createElement('details');earlier.id='composition-earlier-results';earlier.className='composition-disclosure';const summary=doc.createElement('summary');summary.textContent='Earlier Results';earlier.append(summary,doc.createElement('div'));doc.getElementById('classical-source-panel')?.append(earlier);}
    if(earlier) {
      const signature=JSON.stringify(parents);
      if(earlier.dataset.signature!==signature) {
        earlier.dataset.signature=signature;
        earlier.lastElementChild.replaceChildren(...parents.map(parent=>{
          const card=doc.createElement('div');card.className='composition-source-card';
          const form=doc.createElement('span');form.className='composition-source-card__form';form.textContent=parent.surface;
          const operation=doc.createElement('span');operation.className='composition-source-card__role';operation.textContent=parent.operation;
          card.append(form,operation);return card;
        }));
      }
      if(earlier.hidden!==!parents.length)earlier.hidden=!parents.length;
    }
  }
  return refresh;
}

export {grammarControls as getNativeGrammarControls};
