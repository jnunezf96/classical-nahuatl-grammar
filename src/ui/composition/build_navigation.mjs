import {getBuildOperationReference,inventoryFieldReference,inventoryOptionReference} from './build_navigation_model.mjs?v=20261021-ending-reference-2&interfaceRelease=1.2.36&negativeAttachment=20261025-1';
import {createBuildTaskMenu} from './build_task_menu.mjs?deverbalReload=20261024-8&operationFirst=20261023-2&clickFeedback=20261023-1&v=20261021-ending-reference-2&writingSource=20261022-2&fixedChoices=20261022-1&interfaceRelease=1.2.36&negativeAttachment=20261025-1';

// This adapter owns navigation only. The single native menu/editor, its exact
// Source/Result binding, and explicit Make remain owned by the existing UI.
export function createBuildNavigation(doc){
  const refreshTaskMenu=createBuildTaskMenu(doc);
  let activeTask=null;
  const text=(node,value)=>{if(node.textContent!==value)node.textContent=value;};
  const data=(node,key,value)=>{if(node.dataset[key]!==value)node.dataset[key]=value;};
  const select=()=>doc.getElementById('classical-capability-navigator-operation');
  const operationFor=control=>control.closest?.('[data-classical-capability-operation-id]')?.dataset.classicalCapabilityOperationId||activeTask?.operationId||select()?.value||'unselected';
  const referenceFor=control=>inventoryFieldReference(control,operationFor(control));
  function annotate(){
    for(const control of doc.querySelectorAll('select,input,textarea,button[id]')){
      // Find fields browse a domain; they do not impersonate its source input.
      if(control.dataset.classicalChoiceGroup==='true'||control.dataset.buildTaskDisplay==='true')continue;
      const fieldRef=referenceFor(control);if(!fieldRef)continue;
      data(control,'inventoryFieldRef',fieldRef);
      if(control.dataset.classicalClauseRelationDecision&&!control.id)data(control,'inventoryLegacyRef',`clause-choice:${control.dataset.classicalClauseRelationDecision}`);
      if(control.tagName==='SELECT'){
        for(const option of control.options)data(option,'inventoryOptionRef',inventoryOptionReference(fieldRef,option.value));
        data(control,'inventorySelectedRef',inventoryOptionReference(fieldRef,control.value));
      }else if(control.type==='checkbox')data(control,'inventorySelectedRef',`state:${encodeURIComponent(fieldRef)}:${control.checked?'checked':'unchecked'}`);
      else if(['INPUT','TEXTAREA'].includes(control.tagName))data(control,'inventoryDomainRef',`domain:${encodeURIComponent(fieldRef)}`);
    }
    // Small-choice buttons are proven representations of the existing field.
    for(const mirror of doc.querySelectorAll('[data-composition-choice-for]')){
      const key=mirror.dataset.compositionChoiceFor;
      const control=doc.getElementById(key)||mirror.nativeControl;
      const fieldRef=control&&referenceFor(control);if(!fieldRef)continue;
      for(const button of mirror.querySelectorAll('[data-composition-choice-value]')){
        data(button,'inventoryMirrorsFieldRef',fieldRef);
        data(button,'inventoryOptionRef',inventoryOptionReference(fieldRef,button.dataset.compositionChoiceValue));
      }
    }
  }
  const api={
    fieldReference:referenceFor,
    inspect:()=>({operation:getBuildOperationReference(activeTask?.operationId||select()?.value)||null,
      task:activeTask?{optionRef:activeTask.optionRef,aliasRefs:activeTask.aliasRefs,operationRef:activeTask.operationId}:null,grammarAuthority:false,
      fields:[...doc.querySelectorAll('[data-inventory-field-ref]')].map(control=>({fieldRef:control.dataset.inventoryFieldRef,
        selectedRef:control.dataset.inventorySelectedRef||null,domainRef:control.dataset.inventoryDomainRef||null,
        representation:Boolean(control.dataset.classicalMirrorsControl||control.dataset.inventoryMirrorsFieldRef),
        optionRefs:control.tagName==='SELECT'?[...control.options].map(o=>o.dataset.inventoryOptionRef):[]}))})};
  doc.defaultView.classicalBuildNavigation=api;
  function refresh(){
    const native=select(),host=doc.getElementById('classical-capability-navigator');if(!native||!host)return;
    activeTask=refreshTaskMenu();
    // Operation is the first decision. Retain inventory relationships as
    // references, without a separate navigation step or branch filter.
    doc.getElementById('classical-build-purpose-navigation')?.remove();
    const plan=doc.getElementById('classical-capability-operation-plan');
    let ids=plan.querySelector('[data-build-inventory-inspector]');
    if(!ids){
      ids=doc.createElement('details');ids.className='build-inventory-identities';ids.dataset.buildInventoryInspector='true';
      const summary=doc.createElement('summary');summary.textContent='Interface IDs';
      const selected=doc.createElement('code');selected.dataset.buildOperationReference='true';
      const option=doc.createElement('code');option.dataset.buildOptionReference='true';
      const choices=doc.createElement('ul');choices.dataset.buildChoiceReferences='true';
      ids.append(summary,selected,option,choices);ids.addEventListener('toggle',()=>{if(ids.open)refresh();});
      plan.append(ids);
    }
    text(doc.getElementById('classical-capability-navigator-heading'),'Operation');
    for(const id of ['classical-capability-navigator-operation','classical-capability-navigator-operation-choices'])doc.getElementById(id)?.setAttribute('aria-label','Operation');
    let choicesHeading=doc.getElementById('classical-build-choices-heading');
    if(!choicesHeading){choicesHeading=doc.createElement('span');choicesHeading.id='classical-build-choices-heading';choicesHeading.className='build-flow-label';choicesHeading.textContent='Choices';}
    const firstChoice=doc.getElementById('classical-capability-navigator-binding-field')||doc.getElementById('classical-capability-operation-choices');
    if(firstChoice.previousElementSibling!==choicesHeading)firstChoice.before(choicesHeading);
    const operation=activeTask?.operationId||native.value;
    choicesHeading.hidden=!operation||activeTask?.control.id==='classical-construction-operation';
    ids.hidden=!operation;
    text(ids.querySelector('[data-build-operation-reference]'),operation||'');
    text(ids.querySelector('[data-build-option-reference]'),activeTask?.optionRef||(native.value?inventoryOptionReference('id:classical-capability-navigator-operation',native.value):''));
    annotate();
    if(ids.open){
      const refs=[...doc.querySelectorAll('#classical-capability-operation-choices select,#classical-capability-operation-choices input,#classical-rule-logic-controls select,#classical-rule-logic-controls input')]
        .filter(c=>!c.dataset.classicalCompactChoiceDisplay&&!c.dataset.classicalChoiceGroup&&c.type!=='hidden'&&!c.closest('[hidden]')&&c.dataset.inventorySelectedRef);
      const values=[...new Set(refs.map(c=>c.dataset.inventorySelectedRef))];
      const list=ids.querySelector('[data-build-choice-references]');const signature=JSON.stringify(values);
      if(list.dataset.signature!==signature){data(list,'signature',signature);list.replaceChildren(...values.map(value=>{const li=doc.createElement('li'),code=doc.createElement('code');code.textContent=value;li.append(code);return li;}));}
    }
  }
  return refresh;
}
