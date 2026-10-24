import {findOwnerChoice} from './owner_choice_roots.mjs?v=20261023-core-1';
// Organize existing controls. Owner projections still decide choices/readiness;
// the presentation never changes a field value or executes an operation.
export function isGrammarOwnerVisible(doc,node){
    if(!node)return false;
    for(let current=node;current;current=current.parentElement) {
      // Derived layout visibility cannot decide whether an exact projection
      // replaces a native mirror. Its own owner field/collector still can.
      if(current.dataset.compositionOperationGated!==undefined) {
        if(current.hidden)return false;
        if(doc.getElementById?.('classical-workbench')?.dataset.compositionOperationSelected==='false')continue;
      }
      if(current.dataset.buildOwnerSlot!==undefined||current.dataset.buildFormulaPart!==undefined
        ||current.dataset.buildFormula!==undefined||current.dataset.buildFormulaSlot!==undefined
        ||current.id==='classical-capability-operation-choices')continue;
      if(current.hidden || !current.classList.contains('composition-empty-group')
        && !current.hasAttribute('data-composition-native-choice-mirror')
        && !current.hasAttribute('data-composition-mirrored-choice')
        && !current.hasAttribute('data-composition-choice-mirror')
        && !current.hasAttribute('data-classical-compact-choice-original')
        && !current.hasAttribute('data-composition-duplicate-control')
        && doc.defaultView.getComputedStyle(current).display==='none')return false;
    }
    return true;
}

export function createGrammarPresentation(doc,{constructionPlacement='legacy'}={}) {
  const requiredSignatures=new WeakMap();
  let previousSentenceFields=new Set();
  const moveAfter=(node,anchor)=>{
    if(node && anchor && anchor.nextElementSibling!==node)anchor.after(node);
  };
  const ownerVisible=node=>isGrammarOwnerVisible(doc,node);
  return function refreshGrammar({action=''}={}) {
    const plan=doc.getElementById('classical-capability-operation-plan');
    const controls=doc.getElementById('classical-rule-logic-controls');
    const grid=controls?.querySelector(':scope > .classical-rule-controls-grid')||plan?.querySelector(':scope > .classical-rule-controls-grid');
    if(!plan || !grid)return;
    const duplicates=new Map();
    const duplicate=(node,key)=>{if(node)duplicates.set(node,key);};

    // Both projected operation choices and the native clause settings precede
    // the one Make action. Explanation and browsing follow the action.
    const choices=doc.getElementById('classical-capability-operation-choices');
    const status=doc.getElementById('classical-capability-operation-plan-status');
    const actions=controls.querySelector('.classical-capability-operation-plan__actions');
    moveAfter(status,choices);
      moveAfter(actions,doc.getElementById('composition-grammar-action-status') || grid);
    const facts=doc.querySelector('[data-composition-disclosure="change-details"]');
    // The Build presenter owns these sections when active. Moving them to a
    // legacy location and back on refresh cancels an open native select popup.
    if(constructionPlacement==='legacy') {
      moveAfter(facts,actions);
      moveAfter(doc.getElementById('classical-capability-navigator-unavailable'),facts || actions);
      moveAfter(doc.getElementById('classical-stem-construction-menu'),doc.getElementById('classical-capability-navigator-unavailable') || facts || actions);
    }
    const particles=doc.getElementById('classical-particle-menu');
    if(particles?.parentElement===grid)
      moveAfter(particles,grid.querySelector(':scope > [data-classical-vnc-authority-organizer]'));
    const applied=doc.querySelector('[data-composition-disclosure="applied-grammar"]');
    const continuation=doc.getElementById('classical-grammar-continuation');
    if(applied && continuation && continuation.parentElement===doc.getElementById('panel-stack-pane-tense'))
      moveAfter(applied,continuation);

    let heading=doc.getElementById('composition-clause-settings-heading');
    if(!heading){
      heading=doc.createElement('h3');heading.id='composition-clause-settings-heading';
      heading.className='composition-grammar-section-heading';heading.textContent='Clause settings';
      grid.before(heading);
    }
    grid.setAttribute('aria-labelledby',heading.id);
    const cue=doc.getElementById('composition-grammar-cue');
    const stageTitle=doc.getElementById('classical-stage-grammar-heading')?.closest('.panel-block-title');
    moveAfter(cue,action ? stageTitle : heading);

    // Native task fields use this status as a plan insertion anchor. Retain it
    // there, and present its current message once beside the existing Make.
    let actionStatus=doc.getElementById('composition-grammar-action-status');
    if(status && actions) {
      if(!actionStatus) {
        actionStatus=doc.createElement('p');actionStatus.id='composition-grammar-action-status';
        actionStatus.className='composition-grammar-action-status';
        actionStatus.setAttribute('role','status');actionStatus.setAttribute('aria-live','polite');
      }
      const message=status.textContent.trim();
      if(actionStatus.textContent!==message)actionStatus.textContent=message;
      const quiet=status.hidden || !message || status.classList.contains('composition-routine-message');
      if(actionStatus.hidden!==quiet)actionStatus.hidden=quiet;
      if(actions.previousElementSibling!==actionStatus)actions.before(actionStatus);
      if(!status.hasAttribute('data-composition-status-relayed'))status.dataset.compositionStatusRelayed='true';
    }

    // These native fields mirror the same pending typed VNC coordinates.
    // Only the exact binding's editable projection can replace their display.
    // Unique formation/object choices and captured continuation paths stay put.
    const typedVnc=plan.dataset.classicalCapabilityOperationId==='vnc:application'
      && plan.dataset.classicalCapabilityTypedSourceBindingOperation==='vnc:application';
    for(const [choiceId,field] of [
      ['requestedDerivation',controls.querySelector('.calc-operator--derivation')],
      ['admonitivePluralEnding',doc.getElementById('classical-rule-logic-admonitive-plural-ending')?.closest('.classical-rule-control,label')],
      ['requestedVoice',doc.getElementById('classical-rule-logic-vnc-voice')?.closest('.classical-rule-control')],
      ['causativeObjectKind',doc.getElementById('classical-rule-logic-causative-causee-valence')?.closest('.classical-rule-control')],
      ['derivationOptionId',doc.getElementById('classical-rule-logic-derivation-option')?.closest('.classical-rule-control')],
    ]) {
      const projection=findOwnerChoice(doc,`[data-classical-capability-choice-id="${choiceId}"][data-classical-capability-owner-projection="exact-binding"]`);
      // The typed owner supplies this optional field's complete domain,
      // including its absence. A prior plural Result cannot supply a fallback.
      const mirrored=typedVnc && (choiceId==='admonitivePluralEnding'
        || projection && !projection.disabled && ownerVisible(projection));
      if(field) {
        if(mirrored && field.dataset.compositionMirroredChoice!==choiceId)field.dataset.compositionMirroredChoice=choiceId;
        else if(!mirrored && field.hasAttribute('data-composition-mirrored-choice'))field.removeAttribute('data-composition-mirrored-choice');
      }
    }

    // A combined native participant field can be replaced only when both
    // projected coordinates preserve its available specific-person choices.
    // Otherwise its complete native menu remains the one effective editor.
    const enabledValues=control=>new Set(Array.from(control?.options || [])
      .filter(option=>option.value && !option.disabled && !option.hidden)
      .map(option=>option.value));
    const covers=(values,required)=>required.size>0 && [...required].every(value=>values.has(value));
    const projectedChoice=choiceId=>{
      const control=findOwnerChoice(doc,`[data-classical-capability-choice-id="${choiceId}"][data-classical-capability-owner-projection="exact-binding"]`);
      const field=control?.closest('.classical-capability-operation-plan__choice,label');
      const values=new Set(Array.from(control?.options || []).filter(option=>
        option.value && !option.disabled && !option.hidden
        && option.dataset.classicalCapabilityOwnerOptionAvailability==='available').map(option=>option.value));
      return {control,field,values,available:Boolean(typedVnc && control && !control.disabled && ownerVisible(control) && values.size)};
    };
    const nativeChoice=controlId=>{
      const control=doc.getElementById(controlId),field=control?.closest('.classical-rule-control,label');
      return {control,field,values:enabledValues(control),available:Boolean(control && !control.disabled && !control.readOnly && ownerVisible(control))};
    };
    const markNative=(field,key,mirrored)=>{
      if(!field)return;
      if(mirrored)field.dataset.compositionMirroredChoice=key;
      else if(field.hasAttribute('data-composition-mirrored-choice'))field.removeAttribute('data-composition-mirrored-choice');
    };
    const markProjection=(projection,controlId,fallback)=>{
      if(!projection.field)return;
      if(fallback)projection.field.dataset.compositionNativeChoiceMirror=controlId;
      else if(projection.field.hasAttribute('data-composition-native-choice-mirror'))projection.field.removeAttribute('data-composition-native-choice-mirror');
    };
    const nonactiveId='classical-rule-logic-nonactive-family';
    const nativeNonactive=nativeChoice(nonactiveId),projectedNonactive=projectedChoice('nonactiveOptionId');
    const completeNonactive=projectedNonactive.available && covers(projectedNonactive.values,nativeNonactive.values);
    markNative(nativeNonactive.field,'nonactiveOptionId',completeNonactive);
    markProjection(projectedNonactive,nonactiveId,!completeNonactive && nativeNonactive.available
      && projectedNonactive.available && covers(nativeNonactive.values,projectedNonactive.values));

    const applicativeId='classical-rule-logic-applicative-object';
    const nativeApplicative=nativeChoice(applicativeId);
    const projectedKind=projectedChoice('applicativeObjectKind'),projectedPerson=projectedChoice('applicativeObjectPerson');
    const nativeKinds=new Set([...nativeApplicative.values].map(value=>value.split(':')[0]));
    const nativePersons=new Set([...nativeApplicative.values].filter(value=>value.startsWith('specific-projective:')).map(value=>value.split(':')[1]));
    const needsPerson=projectedKind.control?.value==='specific-projective'
      || !projectedKind.control?.value && projectedKind.values.has('specific-projective');
    const completeApplicative=projectedKind.available && covers(projectedKind.values,nativeKinds)
      && (!needsPerson || projectedPerson.available && covers(projectedPerson.values,nativePersons));
    markNative(nativeApplicative.field,'applicativeObjectKind',completeApplicative);
    const nativeFallback=!completeApplicative && nativeApplicative.available && projectedKind.available
      && covers(nativeKinds,projectedKind.values)
      && (!projectedPerson.available || covers(nativePersons,projectedPerson.values));
    markProjection(projectedKind,applicativeId,nativeFallback);
    markProjection(projectedPerson,applicativeId,nativeFallback && projectedPerson.available);

    // Ordinary NNC native controls collect joint choices through the canonical
    // selection owner. Generated editors can probe a smaller complete-request
    // domain (e.g. possession before a possessor). Prefer the native group only
    // for resolved projections fully covered by its real enabled option values.
    const typedNnc=plan.dataset.classicalCapabilityOperationId==='nnc:ordinary'
      && plan.dataset.classicalCapabilityTypedSourceBindingOperation==='nnc:ordinary';
    const typedPronominal=plan.dataset.classicalCapabilityOperationId==='nnc:pronominal'
      && plan.dataset.classicalCapabilityTypedSourceBindingOperation==='nnc:pronominal';
    for(const [choiceId,controlId] of [
      ['state','classical-rule-logic-nnc-state'],
      ['possessor','classical-rule-logic-nnc-possessor'],
      ['animacy','classical-rule-logic-nnc-subject-animacy'],
    ]) {
      const projection=findOwnerChoice(doc,`[data-classical-capability-choice-id="${choiceId}"][data-classical-capability-owner-projection="exact-binding"]`);
      const field=projection?.closest('.classical-capability-operation-plan__choice');
      if(!field)continue;
      const native=doc.getElementById(controlId);
      const nativeValues=new Set(Array.from(native?.options || []).filter(option=>option.value && !option.disabled && !option.hidden).map(option=>option.value));
      const projectedValues=Array.from(projection.options).filter(option=>option.value && !option.disabled && !option.hidden && option.dataset.classicalCapabilityOwnerOptionAvailability==='available').map(option=>option.value);
      const resolved=!projection.disabled && !projection.required && projection.getAttribute('aria-required')!=='true'
        && projection.value && !projection.selectedOptions[0]?.disabled;
      const pendingFallback=choiceId!=='possessor' && !projection.required
        && projection.getAttribute('aria-required')!=='true' && !projection.value;
      const mirrored=typedNnc && (resolved||pendingFallback) && ownerVisible(projection) && ownerVisible(native)
        && !native.disabled && !native.readOnly
        && nativeValues.has(native?.value) && (pendingFallback||native.value===projection.value) && projectedValues.length>0
        && (pendingFallback||projectedValues.includes(projection.value)) && projectedValues.every(value=>nativeValues.has(value));
      if(mirrored) {
        if(field.dataset.compositionNativeChoiceMirror!==controlId)field.dataset.compositionNativeChoiceMirror=controlId;
      } else if(field.hasAttribute('data-composition-native-choice-mirror'))field.removeAttribute('data-composition-native-choice-mirror');
    }

    // Subject is a joint Person/Number decision. A completed-request menu may
    // omit plural while its ending is unresolved; retain the native pending
    // editor until the projected domain covers those available staging paths.
    const subjectProjection=findOwnerChoice(doc,'[data-classical-capability-choice-id="subject"][data-classical-capability-owner-projection="exact-binding"]');
    const subjectField=subjectProjection?.closest('.classical-capability-operation-plan__choice');
    if(subjectField) {
      const person=nativeChoice('classical-rule-logic-nnc-subject-person');
      const number=nativeChoice('classical-rule-logic-nnc-subject-number');
      const pendingValues=({control,values})=>control?.disabled || control?.readOnly
        ? new Set(values.has(control.value)?[control.value]:[]) : values;
      const nativeDomain=new Set();
      for(const p of pendingValues(person))for(const n of pendingValues(number)) {
        if(['1','2','3'].includes(p) && ['singular','plural'].includes(n))nativeDomain.add(`${p}${n==='singular'?'sg':'pl'}`);
        if(p==='3' && n==='common')nativeDomain.add('3common');
      }
      const projectedValues=new Set(Array.from(subjectProjection.options || []).filter(option=>
        option.value && !option.disabled && !option.hidden
        && option.dataset.classicalCapabilityOwnerOptionAvailability==='available').map(option=>option.value));
      const nativePending=typedNnc && ownerVisible(subjectProjection)
        && ownerVisible(person.control) && ownerVisible(number.control)
        && (person.available || number.available)
        && person.values.has(person.control?.value) && number.values.has(number.control?.value);
      const fallback=nativePending && nativeDomain.size>0 && !covers(projectedValues,nativeDomain)
        && (projectedValues.size===0 || covers(nativeDomain,projectedValues));
      markProjection({field:subjectField},'classical-rule-logic-nnc-subject-number',fallback);
    }

    // The plural ending is the same pending decision in both representations.
    // Keep the native staging domain when the completed owner projection is
    // narrower; otherwise the exact owner editor is the single visible writer.
    const endingProjection=findOwnerChoice(doc,'[data-classical-capability-choice-id="pluralConnector"][data-classical-capability-owner-projection="exact-binding"]');
    const endingField=endingProjection?.closest('.classical-capability-operation-plan__choice');
    let endingProjectionReplacesNative=false;
    if(endingField) {
      const native=nativeChoice('classical-rule-logic-nnc-plural-connector');
      const projectedValues=new Set(Array.from(endingProjection.options || []).filter(option=>
        option.value && !option.disabled && !option.hidden
        && option.dataset.classicalCapabilityOwnerOptionAvailability==='available').map(option=>option.value));
      const complete=!endingProjection.disabled && !endingProjection.readOnly
        && covers(projectedValues,native.values);
      endingProjectionReplacesNative=typedNnc && ownerVisible(endingProjection) && complete;
      const fallback=typedNnc && ownerVisible(endingProjection) && native.available
        && native.values.size>0 && !complete
        && (projectedValues.size===0 || covers(native.values,projectedValues));
      markProjection({field:endingField},'classical-rule-logic-nnc-plural-connector',fallback);
    }

    // An exact owner editor is the current writer. The older clause settings
    // retain their native values/listeners but cannot display a second answer.
    const ownerFields={subject:['subject-person','subject-number'],
      humanness:['subject-humanness'],animacy:['subject-animacy'],state:['state'],
      possessor:['possessor'],possessorReduplication:['possessor-reduplication'],metaphoricalUse:['metaphorical-use'],predicateFormation:['predicate-form'],stemFormation:['stem-relation'],
      pluralConnector:['plural-connector']};
    const pronominalFields={subject:['subject-person','subject-number'],
      humanness:['subject-humanness'],animacy:['subject-animacy'],
      numberForm:['plural-connector'],predicatePluralization:['quantity-plural-formation'],
      clausePosition:['clause-position'],adjunctorInMode:['dependent-clause-in'],
      doubledFirstPlural:['doubled-first-plural'],specialHumanUse:['special-human-use']};
    const currentOwnerFields=typedNnc?ownerFields:typedPronominal?pronominalFields:{};
    for(const [choiceId,nativeIds] of Object.entries(currentOwnerFields)) {
      const projection=findOwnerChoice(doc,`[data-classical-capability-choice-id="${choiceId}"][data-classical-capability-owner-projection="exact-binding"]`);
      if(!projection || !ownerVisible(projection) || projection.closest('[data-composition-native-choice-mirror]'))continue;
      if(typedNnc && choiceId==='pluralConnector'&&!endingProjectionReplacesNative)continue;
      if(typedPronominal && (projection.disabled || projection.readOnly
        || !Array.from(projection.options || []).some(option=>option.value && !option.disabled && !option.hidden
          && option.dataset.classicalCapabilityOwnerOptionAvailability==='available')))continue;
      for(const suffix of nativeIds)duplicate(doc.getElementById(`classical-rule-logic-nnc-${suffix}`)?.closest('.classical-rule-control,label'),choiceId);
    }
    const typedParticle=plan.dataset.classicalCapabilityOperationId==='particle:result'
      && plan.dataset.classicalCapabilityTypedSourceBindingOperation==='particle:result';
    if(typedParticle && findOwnerChoice(doc,'[data-classical-capability-choice-id="particleId"][data-classical-capability-owner-projection="exact-binding"]'))
      duplicate(grid,'inactive-nuclear');
    const navigator=doc.getElementById('classical-capability-navigator');
    const operation=doc.getElementById('classical-capability-navigator-operation');
    const clauseContext=navigator?.dataset.classicalCapabilityBindingFamily==='clause-relation'
      && navigator.dataset.classicalCapabilityEnteredOperation===operation?.value
      && Boolean(operation?.value);
    const legacy=continuation?.querySelector('.classical-clause-relation-workflow');
    if(clauseContext)duplicate(grid,'inactive-nuclear');
    if(legacy && !clauseContext)duplicate(legacy,'inactive-composition');
    if(legacy && clauseContext) {
      for(const control of legacy.querySelectorAll('[data-classical-clause-relation-decision]')) {
        const id=control.dataset.classicalClauseRelationDecision;
        const current=plan.querySelector(`[data-classical-clause-relation-decision="${id}"],[data-classical-capability-choice-id="clause-choice:${id}"]`);
        if(current && ownerVisible(current))duplicate(control.closest('.classical-whole-canvas-choice,label'),id);
      }
      if(doc.getElementById('classical-capability-apply-operation'))duplicate(legacy.querySelector('[data-classical-user-action="compose-captured-clause-results"]'),'make');
    }
    for(const node of doc.querySelectorAll('[data-composition-duplicate-control]'))if(!duplicates.has(node))node.removeAttribute('data-composition-duplicate-control');
    for(const [node,key] of duplicates)if(node.dataset.compositionDuplicateControl!==key)node.setAttribute('data-composition-duplicate-control',key);

    // Sentence-layer bindings already publish their unresolved choice IDs.
    // Match those IDs to their existing controls; compact choosers retain the
    // native field wrapper even when the original select itself is hidden.
    const requiredSentenceFields=new Set();
    const sentenceControls={
      'sentence-adverbial-id':'sentence-adverbial',
      sentenceParticle:'sentence-particle',
      sentenceType:'sentence-surface',
      'sentence-kind':'sentence-surface',
      negative:'polarity',
    };
    for(const choiceId of (plan.dataset.classicalCapabilityRequiredChoiceIds || '').split('|')) {
      const controlId=sentenceControls[choiceId];
      const field=controlId && doc.getElementById(`classical-rule-logic-${controlId}`)?.closest('.classical-rule-control');
      if(field && ownerVisible(field))requiredSentenceFields.add(field);
    }
    for(const field of requiredSentenceFields) {
      if(previousSentenceFields.has(field))continue;
      for(let parent=field.parentElement;parent && parent!==controls;parent=parent.parentElement)
        if(parent.tagName==='DETAILS')parent.open=true;
    }
    previousSentenceFields=requiredSentenceFields;
    for(const disclosure of controls.querySelectorAll('.composition-disclosure')) {
      const section=disclosure.querySelector(':scope > [data-classical-vnc-authority-disclosure],:scope > [data-classical-nnc-grammar-section]');
      if(!section)continue;
      const fields=Array.from(section.querySelectorAll('select,input:not([type="hidden"]),button')).filter(ownerVisible);
      // A mirrored group with no remaining fields should not leave an empty row.
      const empty=!section.hidden && fields.length===0 && Boolean(section.querySelector('[data-composition-mirrored-choice]'));
      disclosure.classList.toggle('composition-empty-group',empty);
      const required=fields.filter(field=>!field.disabled && (field.required || field.getAttribute('aria-required')==='true'));
      const signature=required.map(field=>field.id || field.dataset.classicalCapabilityChoiceId || field.name).join('|');
      if(signature && requiredSignatures.get(disclosure)!==signature)disclosure.open=true;
      requiredSignatures.set(disclosure,signature);
    }
  };
}
