import {runCompositionAction} from './action_feedback.mjs?v=20261023-1';
import {getResultEditTargets,projectResultForEditing} from './result_editing.mjs?nucleusEdit=20261024-9&innerParticle=20261024-1&v=20261023-conjunction-1&interfaceRelease=1.2.36';
import {canRebuildResultEdit,getResultEditReorder} from './result_edit_rebuild.mjs?nucleusEdit=20261024-9&innerParticle=20261024-1&mixedInner=20261024-1&v=20261023-conjunct-edit-1&interfaceRelease=1.2.36';
import {inventoryOptionReference} from './build_navigation_model.mjs?interfaceRelease=1.2.36';

const ORDER_FIELD='clause-choice:sentence:supplementation:supplementation-order';
const ACTIONS=['continue','change','add','reorder','remove','undo','clear'];
const actionLabel=action=>action[0].toUpperCase()+action.slice(1);
const text=(node,value)=>{if(node.textContent!==value)node.textContent=value;};
const editAction=edit=>['reorder','remove'].includes(edit?.action)?edit.action
  : edit?.intent==='add'?'add':edit?.action||'';
const pendingAction=position=>position?.execution?.kind==='result-edit'
  ? editAction(position.execution.edit)
  : /^result-edit:/u.test(position?.construction?.route?.binding||'')
    ? position.construction.route.binding.slice('result-edit:'.length) : '';

// This section stages exact, owner-backed edits. Its controls never execute an
// operation or replace the accepted Result; the existing Make action does that.
export function createResultActions(doc,{selection,onSelect,onAction,onAdd,schedule}={}){
  const runtime=doc.defaultView||{};
  const project=exact=>projectResultForEditing(runtime,exact);
  const section=doc.createElement('section');section.id='classical-result-editing';
  const heading=doc.createElement('h3');heading.textContent='Work with Result';
  const targetField=doc.createElement('label'),targetLabel=doc.createElement('span'),targetSelect=doc.createElement('select');
  targetLabel.textContent='Part';targetSelect.id='classical-result-edit-target';
  targetSelect.dataset.inventoryFieldRef=`id:${targetSelect.id}`;
  targetField.append(targetLabel,targetSelect);
  const buttons=doc.createElement('div');buttons.className='composition-result-edit-actions';
  buttons.setAttribute('role','group');buttons.setAttribute('aria-label','Selected part actions');
  const workspaceHeading=doc.createElement('h4');workspaceHeading.className='composition-result-workspace-heading';workspaceHeading.textContent='Workspace';
  const workspaceButtons=doc.createElement('div');workspaceButtons.className='composition-result-edit-actions';
  workspaceButtons.setAttribute('role','group');workspaceButtons.setAttribute('aria-label','Workspace actions');
  const controls=new Map();
  const orderField=doc.createElement('label'),orderLabel=doc.createElement('span'),orderSelect=doc.createElement('select');
  orderLabel.textContent='Order';orderSelect.id='classical-result-edit-order';
  orderSelect.dataset.inventoryFieldRef=`id:${orderSelect.id}`;
  orderSelect.dataset.inventoryMirrorsFieldRef=ORDER_FIELD;
  orderField.append(orderLabel,orderSelect);orderField.hidden=true;
  const status=doc.createElement('p');status.id='classical-result-edit-status';status.setAttribute('role','status');
  const limits=doc.createElement('details');limits.className='composition-disclosure composition-result-action-limits';
  const limitsHeading=doc.createElement('summary');limitsHeading.textContent='Unavailable actions';
  const limitsList=doc.createElement('ul');limits.append(limitsHeading,limitsList);
  section.append(heading,targetField,buttons,limits,orderField,status,workspaceHeading,workspaceButtons);
  let renderedRoot=null,targetSignature='',orderSignature='',limitsSignature='',lastPaneContext=null;

  function context(){
    const view=selection?.snapshot?.();
    if(!renderedRoot||(view?view.result:selection?.result)!==renderedRoot||!project(renderedRoot))return null;
    const record=view?view.record:selection.record;
    if(!record||!project(record.node))return null;
    return {root:renderedRoot,target:record.node,path:[...record.path],record,targets:view?.targets};
  }
  function capability(detail){
    if(!detail)return {change:false,add:false,reorder:null,remove:false,undo:false,clear:false};
    const {root,target,record}=detail;
    const rebuild=canRebuildResultEdit(runtime,root,target,project,record.path);
    let navigator=null,binding=null,reorder=null;
    let change=false;
    if(rebuild && typeof runtime.hasClassicalGrammarApplicationAvailableOperation==='function') {
      try{change=runtime.hasClassicalGrammarApplicationAvailableOperation(target)===true;}catch{}
    } else if(rebuild) {
      try{navigator=runtime.getClassicalGrammarApplicationCapabilityNavigator?.(target);}catch{}
      change=runtime.isClassicalGrammarApplicationCapabilityNavigator?.(navigator)===true
        &&navigator.exactResult===target&&navigator.operations?.some(operation=>operation.availabilityStatus==='available')===true;
    }
    try{binding=runtime.issueClassicalClauseRelationBindingFrame?.('sentence:supplementation',target,['principal']);}catch{}
    const add=(root===target||rebuild)&&runtime.isClassicalClauseRelationBindingFrame?.(binding)===true
      &&binding.exactResult===target&&binding.exactResultIdentityPreserved===true
      &&binding.bindingIds?.includes('supplementation:principal')===true;
    if(rebuild)reorder=getResultEditReorder(runtime,target,project);
    return {continue:root!==target && runtime.isClassicalNahuatlVncSentenceResultFrame?.(root)===true
      && root.vncApplicationFrame===target && runtime.isClassicalNahuatlVncApplicationFrame?.(target)===true,change,add,reorder,remove:Boolean(record.removableTo&&project(record.removableTo)),
      undo:Boolean(doc.getElementById('classical-grammar-workspace-history-undo')
        &&!doc.getElementById('classical-grammar-workspace-history-undo').disabled),clear:true};
  }
  function emit(action,extra={}){
    const detail=context();if(!detail)return;
    const available=capability(detail);
    if(action==='order'){
      if(pendingAction(runtime.getClassicalConstructionPosition?.())!=='reorder'
        ||!available.reorder?.values.some(item=>item.value===extra.value))return;
    }else if(!available[action])return;
    const payload={root:detail.root,target:detail.target,path:detail.path,...extra};
    if(action==='add'&&typeof onAdd==='function')onAdd(payload);
    else onAction?.(action,payload);
    schedule?.();
  }
  for(const action of ACTIONS){
    const button=doc.createElement('button');button.type='button';button.id=`classical-result-action-${action}`;
    button.textContent=actionLabel(action);button.dataset.inventoryFieldRef=`id:${button.id}`;
    if(action==='undo')button.dataset.inventoryMirrorsFieldRef='id:classical-grammar-workspace-history-undo';
    if(action==='clear')button.dataset.inventoryMirrorsFieldRef='id:verb-entry-clear';
    button.addEventListener('click',()=>{
      const before=runtime.getClassicalConstructionPosition?.(),part=context();
      runCompositionAction(doc,button,()=>emit(action),{label:`${actionLabel(action)}…`,
        isCurrent:()=>runtime.getClassicalConstructionPosition?.()===before && context()?.root===part?.root && context()?.target===part?.target
          && JSON.stringify(context()?.path)===JSON.stringify(part?.path)});
    });
    (['undo','clear'].includes(action)?workspaceButtons:buttons).append(button);controls.set(action,button);
  }
  targetSelect.addEventListener('change',()=>{
    if(!context())return;
    let path;try{path=JSON.parse(targetSelect.value);}catch{return;}
    if(!selection.select(path))return;
    onSelect?.();schedule?.();
  });
  orderSelect.addEventListener('change',()=>emit('order',{value:orderSelect.value}));

  function partLabel(record,targets){
    const roles=targets.filter(parent=>parent.path.length>0&&parent.path.length<=record.path.length
      &&parent.path.every((key,index)=>key===record.path[index])).map(parent=>parent.role||parent.label);
    const label=roles.length?roles.join(' / '):'Whole result';
    const surface=project(record.node)?.surface;
    return surface?`${label} — ${surface}`:label;
  }
  function updateOptions(select,options,signature,current){
    if(signature!==current){
      select.replaceChildren(...options.map(({value,label,field})=>{
        const option=doc.createElement('option');option.value=value;option.textContent=label;
        option.dataset.inventoryOptionRef=inventoryOptionReference(field,value);return option;
      }));
    }
    return signature;
  }
  function paneContext(card,detail,position,requestedAction){
    const construction=position?.construction,undo=doc.getElementById('classical-grammar-workspace-history-undo');
    const plan=doc.getElementById('classical-capability-operation-plan');
    const fieldState=id=>{const field=doc.getElementById(id);return [field?.value,field?.disabled];};
    return [card,detail?.root,detail?.target,JSON.stringify(detail?.path),position?.accepted?.result,position?.accepted?.receipt,
      construction?.source,construction?.sourcePending,construction?.sourceDraft,construction?.route?.operation,construction?.route?.binding,
      ...(construction?.slots||[]).flatMap(slot=>[slot.role,slot.exact]),'end-slots',
      pendingAction(position),position?.choices?.order,requestedAction,undo,undo?.disabled,
      ...fieldState('classical-capability-navigator-binding'),...fieldState('classical-capability-required-result'),
      plan?.dataset?.classicalCapabilityRequiredResultRoles,plan?.dataset?.classicalCapabilityRequiredChoiceIds,
      runtime.hasClassicalGrammarApplicationAvailableOperation,runtime.getClassicalGrammarApplicationCapabilityNavigator,runtime.isClassicalGrammarApplicationCapabilityNavigator,
      runtime.issueClassicalClauseRelationBindingFrame,runtime.isClassicalClauseRelationBindingFrame,
      runtime.captureClassicalGrammarApplicationResult,runtime.isClassicalGrammarApplicationResultCapture];
  }
  return function refresh(card,{exact,requestedAction='',preserveAcceptedPresentation=false}={}){
    renderedRoot=exact||null;
    if(section.parentNode!==card&&card)card.append(section);
    const position=runtime.getClassicalConstructionPosition?.(),detail=context();
    const nextPaneContext=paneContext(card,detail,position,requestedAction);
    // Unrelated Build choices do not redraw the accepted Result's actions.
    // This retains presentation only: emit() always checks current owner authority.
    if(preserveAcceptedPresentation && detail && position?.accepted?.result===detail.root
      && position.construction?.sourcePending===false && position.pending?.length
      && lastPaneContext?.length===nextPaneContext.length
      && nextPaneContext.every((value,index)=>value===lastPaneContext[index]))return;
    lastPaneContext=nextPaneContext;
    const available=capability(detail);
    const targets=detail?(detail.targets||getResultEditTargets(runtime,exact)):[];
    const options=targets.map(record=>({value:JSON.stringify(record.path),label:partLabel(record,targets),field:`id:${targetSelect.id}`}));
    targetSignature=updateOptions(targetSelect,options,JSON.stringify(options),targetSignature);
    const selectedValue=detail?JSON.stringify(detail.path):'';
    if(targetSelect.value!==selectedValue)targetSelect.value=selectedValue;
    targetSelect.disabled=!detail;
    targetSelect.dataset.inventorySelectedRef=inventoryOptionReference(`id:${targetSelect.id}`,selectedValue);
    section.hidden=!detail;
    const reasons={continue:'Select the sentence’s verb clause to use it as the next Source.',change:'No offered operation can change this part while retaining its whole Result.',
      add:'This part cannot serve as the principal of a new clause relation while retaining its whole Result.',
      reorder:'This part has no owner-supported order change that can retain its whole Result.',
      remove:'This part has no optional outer attachment that can be removed while retaining an exact Result.',
      undo:'There is no previous workspace state to restore.',clear:'There is no accepted Result to clear.'};
    for(const [action,button] of controls){
      if(action==='continue')button.hidden=!available.continue;
      const enabled=Boolean(available[action]);
      if(button.disabled===enabled)button.disabled=!enabled;
      const title=enabled?'':reasons[action];if(button.title!==title)button.title=title;
    }
    const unavailable=['change','add','reorder','remove'].filter(action=>!available[action]);
    const nextLimitsSignature=unavailable.join('|');
    if(nextLimitsSignature!==limitsSignature){
      limitsSignature=nextLimitsSignature;
      limitsList.replaceChildren(...unavailable.map(action=>{
        const item=doc.createElement('li');item.textContent=`${actionLabel(action)}: ${reasons[action]}`;return item;
      }));
    }
    limits.hidden=!unavailable.length;
    const pending=pendingAction(position);
    const showOrder=pending==='reorder'&&Boolean(available.reorder);
    if(orderField.hidden===showOrder)orderField.hidden=!showOrder;
    const ownerValues=showOrder?available.reorder.values.filter(item=>['principal-first','supplement-first'].includes(item.value)):[];
    const orderOptions=ownerValues.length?[{value:'',label:'Choose order',field:ORDER_FIELD},...ownerValues.map(({value})=>({value,
      label:value==='principal-first'?'Principal first':'Supplement first',field:ORDER_FIELD}))]:[];
    orderSignature=updateOptions(orderSelect,orderOptions,JSON.stringify(orderOptions),orderSignature);
    const value=ownerValues.some(item=>item.value===position?.choices?.order)?position.choices.order:'';
    if(orderSelect.value!==value)orderSelect.value=value;
    orderSelect.disabled=!showOrder;
    orderSelect.dataset.inventorySelectedRef=inventoryOptionReference(ORDER_FIELD,value);
    const selected=detail?partLabel(detail.record,targets):'Whole result';
    const action=pending||requestedAction;
    const quiet=!action&&detail?.path.length===0;
    if(status.hidden!==quiet)status.hidden=quiet;
    text(status,pending==='remove'?`${selected} · Remove. Removal pending. Make Result to apply.`:`${selected}${action?` · ${actionLabel(action)}`:''}`);
  };
}
