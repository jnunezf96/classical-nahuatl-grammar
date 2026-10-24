// Visual projection of the existing Source and native route chooser. The
// original controls retain their values, availability, handlers and authority.
import {readRouteChoicePresentation} from './candidate_design.mjs?v=20261021-route-shapes-1';
export function createRouteDesign(doc) {
  let requiredSignature='';
  const setText=(node,value)=>{if(node && node.textContent!==value)node.textContent=value;};
  const routineMessages=new Set([
    'Choose the next grammatical operation.',
    'Canonical operation applied. Review Result before continuing it as Source.',
    "Exact Result retained as the navigator's next typed Source. Each canonical owner decides its additional choices.",
    'The exact Source is staged. Complete the Grammar choices, then Apply.',
    'The exact Source is staged. Complete the Build choices, then Apply.',
    'Complete the Build choices, then Make Result.',
    'Exact Result retained. Owner choices are ready; Make Result.',
    'Choices updated. Make Result to apply them.',
    'Choices complete. Make Result.',
    'Ready. Make Result.',
    'Exact Result retained. Complete the highlighted owner choices.',
    'Result added. Complete any remaining choices, then Make Result.',
  ]);
  return function refreshRouteDesign() {
    const root=doc.getElementById('classical-workbench');
    const plan=doc.getElementById('classical-capability-operation-plan');
    const navigator=doc.getElementById('classical-capability-navigator');
    const operation=doc.getElementById('classical-capability-navigator-operation');
    if(!root)return;
    root.dataset.compositionDesign='path';
    setText(doc.getElementById('classical-capability-operation-plan-heading'),'Route');
    setText(doc.getElementById('composition-clause-settings-heading'),'Choices');
    operation?.setAttribute('aria-label','Route');
    doc.getElementById('classical-capability-navigator-operation-choices')?.setAttribute('aria-label','Route');
    const requiredIds=(plan?.dataset.classicalBindingRequiredControlIds || '').split('|').filter(Boolean);
    const signature=`${operation?.value || ''}:${requiredIds.join('|')}`;
    if(signature!==requiredSignature) {
      for(const id of requiredIds) {
        const control=doc.getElementById(id);
        if(!control || control.disabled || control.closest('[hidden]'))continue;
        for(let parent=control.parentElement;parent && parent!==root;parent=parent.parentElement)
          if(parent.tagName==='DETAILS')parent.open=true;
      }
      requiredSignature=signature;
    }

    // Show the current controller's published capture roles beside Source.
    // These strings are read-only labels, never reconstructed grammar inputs.
    const binding=doc.getElementById('classical-capability-navigator-binding');
    const captured=navigator?.dataset.classicalCapabilityBindingFamily==='clause-relation'
      && navigator.dataset.classicalCapabilityEnteredOperation===operation?.value
      && operation?.value && binding?.value && !binding.closest('[hidden]')
      ? Array.from(doc.querySelectorAll('#classical-grammar-continuation [data-classical-clause-relation-capture-role][data-classical-capture-authority="issued-application-result"]'))
        .map(node=>({
          role:node.dataset.classicalClauseRelationCaptureRole,
          label:node.querySelector('.grammar-inspector__title')?.textContent.trim(),
          form:node.querySelector('[data-line-label="realization"] .grammar-inspector__line-value')?.textContent.trim(),
        })).filter(record=>record.form && record.label)
      : [];
    const supplied=doc.getElementById('classical-binding-source-readout');
    if(supplied && !supplied.hidden
      && supplied.dataset.classicalBindingSourceOperation===operation?.value
      && navigator?.dataset.classicalCapabilityEnteredOperation===operation?.value
      && supplied.dataset.classicalBindingSourceFamily===navigator.dataset.classicalCapabilityBindingFamily) {
      for(const row of supplied.querySelectorAll('[data-classical-binding-source-role]')) {
        const record={role:row.dataset.classicalBindingSourceRole,
          label:row.querySelector('dt')?.textContent.trim(),form:row.querySelector('dd')?.textContent.trim()};
        if(record.label && record.form && !captured.some(existing=>existing.role===record.role))captured.push(record);
      }
    }
    let sources=doc.querySelector('[data-composition-source-cards]');
    if(captured.length) {
      if(!sources) {
        sources=doc.createElement('div');
        sources.className='composition-source-cards';
        sources.dataset.compositionSourceCards='true';
        sources.setAttribute('role','group');
        sources.setAttribute('aria-label','Captured Sources');
        doc.getElementById('classical-source-panel')?.append(sources);
      }
      const signature=JSON.stringify(captured);
      if(sources.dataset.signature!==signature) {
        sources.dataset.signature=signature;
        sources.replaceChildren();
        for(const record of captured) {
          const card=doc.createElement('div');
          card.className='composition-source-card';
          card.dataset.compositionSourceRole=record.role;
          const label=doc.createElement('span');label.className='composition-source-card__role';label.textContent=record.label;
          const form=doc.createElement('span');form.className='composition-source-card__form';form.textContent=record.form;
          card.append(label,form);sources.append(card);
        }
      }
      sources.hidden=false;
    } else if(sources && !sources.hidden)sources.hidden=true;
    supplied?.classList.toggle('composition-source-readout-projected',Boolean(captured.length));

    // The existing compact chooser already publishes semantic families and
    // narrows its own operation/range menus. Project that group control only.
    const tools=navigator?.querySelector('[data-classical-compact-choice-tools]');
    const group=tools?.querySelector('select[data-classical-choice-group]');
    let families=navigator?.querySelector('[data-composition-route-families]');
    if(group && !group.hidden && operation && !operation.disabled) {
      if(!families) {
        families=doc.createElement('div');
        families.className='composition-route-families';
        families.dataset.compositionRouteFamilies='true';
        families.setAttribute('role','group');
        families.setAttribute('aria-label','Route families');
        tools.closest('label').before(families);
      }
      const options=Array.from(group.options).filter(option=>option.value && !option.hidden);
      const signature=options.map(option=>`${option.value}|${option.textContent}|${option.disabled}`).join('\n');
      // A native refresh can replace the group even if its options are equal.
      if(families.nativeGroup!==group || families.dataset.signature!==signature) {
        families.nativeGroup=group;
        families.dataset.signature=signature;
        families.replaceChildren();
        for(const option of options) {
          const button=doc.createElement('button');
          button.type='button';
          button.dataset.compositionRouteFamily=option.value;
          button.textContent=option.textContent;
          button.addEventListener('click',()=>{
            const current=navigator.querySelector('[data-classical-compact-choice-tools] select[data-classical-choice-group]');
            const offered=Array.from(current?.options || []).find(item=>item.value===button.dataset.compositionRouteFamily);
            if(!current || current.disabled || !offered || offered.disabled || offered.hidden || operation.disabled)return;
            if(current.value===offered.value)return;
            current.value=offered.value;
            current.dispatchEvent(new doc.defaultView.Event('change',{bubbles:true}));
            refreshRouteDesign();
          });
          families.append(button);
        }
      }
      for(const button of families.children) {
        const option=options.find(item=>item.value===button.dataset.compositionRouteFamily);
        button.disabled=Boolean(group.disabled || option?.disabled);
        button.setAttribute('aria-pressed',String(button.dataset.compositionRouteFamily===group.value));
      }
      group.dataset.compositionRouteGroupMirror='true';
      families.hidden=false;
    } else {
      families?.remove();
      group?.removeAttribute('data-composition-route-group-mirror');
    }

    const routeState=readRouteChoicePresentation(root);
    const copy=doc.getElementById('classical-capability-navigator-operation-choices');
    const display=copy&&!copy.closest('[hidden]')?copy:operation;
    const routeLabel=(tools?.closest('label')||operation?.closest('label'));
    const offered=Array.from(display?.options||[]).filter(option=>option.value&&!option.hidden&&!option.disabled&&!option.parentElement?.disabled&&routeState?.shapes.some(item=>item.operationId===option.value&&item.shape));
    const available=Array.from(display?.options||[]).filter(option=>option.value&&!option.hidden&&!option.disabled&&!option.parentElement?.disabled);
    let shapes=navigator?.querySelector('[data-composition-offered-shapes]');
    if(!doc.defaultView.classicalBuildNavigation&&routeState&&offered.length&&offered.length===available.length&&operation&&!operation.disabled) {
      if(!shapes){shapes=doc.createElement('div');shapes.className='composition-offered-shapes';shapes.dataset.compositionOfferedShapes='true';shapes.setAttribute('role','group');shapes.setAttribute('aria-label','Offered routes');(tools?.closest('label')||operation.closest('label')).after(shapes);}
      const signature=JSON.stringify(offered.map(option=>[option.value,option.textContent,routeState.shapes.find(item=>item.operationId===option.value)?.shape]));
      if(shapes.sourceScope!==routeState.sourceScope||shapes.dataset.signature!==signature) {
        shapes.sourceScope=routeState.sourceScope;shapes.dataset.signature=signature;shapes.replaceChildren();
        for(const option of offered) {
          const shape=routeState.shapes.find(item=>item.operationId===option.value)?.shape;
          const button=doc.createElement('button');button.type='button';button.className='composition-offered-route';button.dataset.compositionOfferedRoute=option.value;
          const name=doc.createElement('span');name.textContent=option.textContent;button.append(name);
          if(shape) {const diagram=doc.createElement('span');diagram.className='composition-operation-shape';diagram.setAttribute('role','img');diagram.setAttribute('aria-label',`${shape.inputs[0]} → ${shape.outputs[0]}`);
            for(const [type,klass] of [[shape.inputs[0],`composition-shape-piece composition-shape-${shape.inputs[0].toLowerCase().replace(/ /gu,'-')}`],['→','composition-shape-operator'],[shape.outputs[0],`composition-shape-piece composition-shape-${shape.outputs[0].toLowerCase().replace(/ /gu,'-')} composition-shape-target`]]){const piece=doc.createElement('span');piece.className=klass;piece.textContent=type;diagram.append(piece);}button.append(diagram);}
          button.addEventListener('click',()=>{
            const live=readRouteChoicePresentation(root),mirror=doc.getElementById('classical-capability-navigator-operation-choices');
            const active=mirror&&!mirror.closest('[hidden]')?mirror:operation;
            const present=Array.from(active.options).find(item=>item.value===option.value);
            const original=Array.from(operation.options).find(item=>item.value===option.value);
            if(live?.sourceScope!==routeState.sourceScope||!live.shapes.some(item=>item.operationId===option.value&&item.shape)||!present||present.hidden||present.disabled||present.parentElement?.disabled||!original||original.hidden||original.disabled||original.parentElement?.disabled||operation.disabled)return;
            if(operation.value===option.value)return;
            operation.value=option.value;operation.dispatchEvent(new doc.defaultView.Event('change',{bubbles:true}));refreshRouteDesign();
          });shapes.append(button);
        }
      }
      for(const button of shapes.children)button.setAttribute('aria-pressed',String(button.dataset.compositionOfferedRoute===operation.value));
      shapes.hidden=false;
      if(routeLabel && !routeLabel.hasAttribute('data-composition-route-cards'))routeLabel.setAttribute('data-composition-route-cards','true');
    }else {
      if(shapes&&!shapes.hidden)shapes.hidden=true;
      if(routeLabel?.hasAttribute('data-composition-route-cards'))routeLabel.removeAttribute('data-composition-route-cards');
    }

    if(plan && navigator && operation) {
      let status=plan.querySelector('[data-composition-route-status]');
      if(!status) {
        status=doc.createElement('span');
        status.className='composition-route-status';
        status.dataset.compositionRouteStatus='true';
        status.setAttribute('role','status');
        status.setAttribute('aria-live','polite');
        doc.getElementById('classical-capability-operation-plan-heading')?.after(status);
      }
      const sourcePending=doc.getElementById('classical-source-parts')?.dataset.classicalSourceCommitState==='pending';
      const make=doc.getElementById('classical-capability-apply-operation');
      const position=doc.defaultView?.getClassicalConstructionPosition?.();
      const selectedTask=doc.getElementById('classical-build-task')?.value||operation.value;
      const state=sourcePending ? 'Source pending' : selectedTask ? make?.dataset.classicalCapabilityApplyState==='applied' ? 'Applied' : position?.ready || !make?.disabled ? 'Ready' : 'Choices pending' : 'Select route';
      setText(status,state);
      status.dataset.compositionPending=String(sourcePending || Boolean(selectedTask));
    }
    // Quiet only known routine prose. Owner-specific errors and inspectable
    // analysis are preserved. No grammatical explanation is introduced here.
    const currentLabel=Array.from(operation?.options || []).find(option=>option.value===operation.value)?.textContent;
    for(const node of root.querySelectorAll('.classical-capability-navigator__status,.classical-capability-operation-plan__status,.classical-result-continuation-card__note,.classical-rule-surface__action-status,[role="note"],#composition-grammar-action-status')) {
      const message=node.textContent.trim();
      node.classList.toggle('composition-path-routine',routineMessages.has(message)
        || Boolean(currentLabel && (message===`${currentLabel} is ready. Apply when you are satisfied with the choices.`
          || message===`${currentLabel} is ready. Use Make Result when you are satisfied with the choices.`)));
    }
  };
}
