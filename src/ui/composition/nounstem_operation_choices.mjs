// Presentation only. Each entry names an existing exact-Result binding role.
// The caller supplies current owner availability and must revalidate the exact
// Result when onSelect delegates to the native navigator/binding controls.
const roleLabels=Object.freeze({
  'compound-nnc:embed-result':'Use as a compound embed',
  'compound-nnc:matrix-result':'Use as a compound matrix',
  'affective-nnc:embed-result':'Form an affective noun',
  'adjectival-nnc:source-result':'Change quality',
});
const menus=new WeakMap();
const roleOptionRef=id=>`option:id%3Aclassical-capability-navigator-binding:${encodeURIComponent(id)}`;

/**
 * state: {host, options:[{bindingId,label?,optionRef?,available}],
 * selectedBindingId?, onSelect(bindingId, optionRef):boolean}.
 * host owns placement; the module never moves existing grammar controls.
 * A true synchronous callback result confirms the revalidated native handoff.
 */
export function syncNounstemOperationChoices(document,state={}){
  if(!document)return null;
  let record=menus.get(document);
  if(!state.host){
    if(record){record.state={options:[]};record.field.hidden=true;record.menu.disabled=true;}
    return record?.menu||null;
  }
  if(!record){
    const field=document.createElement('label');field.className='classical-rule-control';
    field.dataset.classicalNounstemOperationField='true';
    field.dataset.classicalPresentationOnly='true';field.dataset.classicalGrammarAuthority='false';
    const label=document.createElement('span');label.className='classical-rule-control__label';label.textContent='Nounstem operation';
    const menu=document.createElement('select');menu.id='classical-nounstem-operation';
    menu.dataset.buildTaskDisplay='true';menu.dataset.classicalMirrorsControl='classical-capability-navigator-binding';
    menu.setAttribute('aria-label','Nounstem operation');
    field.append(label,menu);record={field,menu,state:{},signature:''};menus.set(document,record);
    menu.addEventListener('change',event=>{
      event?.stopPropagation?.();
      const current=record.state;
      const option=current.options.find(row=>row.bindingId===menu.value&&row.available===true);
      const displayed=Array.from(menu.options||[]).find(row=>row.value===menu.value&&!row.disabled&&!row.hidden);
      if(!menu.disabled&&option&&displayed&&current.onSelect?.(option.bindingId,option.optionRef)===true)return;
      menu.value=current.options.some(row=>row.bindingId===current.selectedBindingId&&row.available===true)
        ? current.selectedBindingId:'';
    });
  }
  const seen=new Set();
  const options=(state.options||[]).filter(row=>row&&Object.hasOwn(roleLabels,row.bindingId)
    &&!seen.has(row.bindingId)&&seen.add(row.bindingId)).map(row=>({
      bindingId:row.bindingId,label:row.label||roleLabels[row.bindingId],
      optionRef:row.optionRef||roleOptionRef(row.bindingId),available:row.available===true,
    }));
  record.state={...state,options};
  const {field,menu}=record;
  if(field.parentElement!==state.host)state.host.append(field);
  const signature=JSON.stringify(options);
  if(signature!==record.signature){
    record.signature=signature;menu.replaceChildren();
    const placeholder=document.createElement('option');placeholder.value='';placeholder.textContent='Choose a nounstem operation';menu.append(placeholder);
    for(const row of options){
      const option=document.createElement('option');option.value=row.bindingId;option.textContent=row.label;option.disabled=!row.available;
      option.dataset.inventoryOptionRef=row.optionRef;option.dataset.classicalBindingId=row.bindingId;menu.append(option);
    }
  }
  menu.value=options.some(row=>row.bindingId===state.selectedBindingId&&row.available)?state.selectedBindingId:'';
  menu.disabled=!options.some(row=>row.available);field.hidden=!options.length;
  return menu;
}

// These are headings over the existing native values, not new grammar enums.
// Ownerhood is nominalized-predicate formation (§35); z/liz and patientive
// nounstem derivation differ from predicate nominalization (§§37–39).
const deverbalGroups=Object.freeze([
  {id:'predicate',label:'Predicate nominalization',values:['predicate-nominalization','predicate-citation','ownerhood','double-nucleus-ownerhood']},
  {id:'nounstem',label:'Deverbal nounstems',values:['deverbal-action','patientive']},
  {id:'continuation',label:'Continue a noun',values:['nominal-continuation','verbal-continuation','patientive-embed-continuation','patientive-matrix-continuation','vocative']},
]);
export function groupDeverbalFamilyOptions(document){
  const control=document?.getElementById('classical-deverbal-nnc-family');
  if(!control)return null;
  const selected=control.value,options=Array.from(control.options||[]);
  for(const definition of deverbalGroups){
    const members=options.filter(option=>definition.values.includes(option.value));
    let group=Array.from(control.children||[]).find(node=>node.dataset?.deverbalFamilyGroup===definition.id);
    if(!members.length){group?.remove();continue;}
    if(!group){group=document.createElement('optgroup');group.dataset.deverbalFamilyGroup=definition.id;control.append(group);}
    group.label=definition.label;
    const children=Array.from(group.children||[]);
    if(children.length!==members.length||members.some((option,index)=>children[index]!==option))
      for(const option of members)group.append(option);
  }
  // Unknown future owner values remain untouched, rather than silently being
  // assigned grammatical scope by this finite presentation grouping.
  control.value=selected;
  return control;
}
