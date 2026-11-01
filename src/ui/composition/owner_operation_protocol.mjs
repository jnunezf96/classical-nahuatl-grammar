// Custody and coordination only. Adapters retain all owner-specific authority.
const issued = new WeakMap();
export function areOwnerOperationSnapshotsEquivalent(a,b) {
 const protocol=issued.get(a);
 return Boolean(protocol && protocol===issued.get(b) && (a===b || protocol.equivalent(a,b)));
}
export function createOwnerOperationProtocol(adapter) {
 const protocol=Object.freeze({equivalent:adapter.equivalent,project});
 const owns=s=>Boolean(s && issued.get(s)===protocol);
 function issue(controller,selections,source,contract=null,prior=null,ingress=prior?.ingress || selections) {
  if(!adapter.select(selections))return null;
  // Adapter projects immutable intent; canonical objects remain exact captures.
  const intent=adapter.projectIntent(selections);
  contract ||= adapter.buildContract(controller,intent);
  if(!adapter.isCurrentFrame(controller,contract,intent))return null;
  const captures=Object.freeze(adapter.projectCaptures(controller,contract,intent).map(x=>Object.freeze({...x})));
  const retained=owns(prior)&&prior.controller===controller&&prior.source===source;
  if(!captures.some(x=>x.exact===source)&&!retained)return null;
  const snapshot=Object.freeze({kind:adapter.kind,routeId:adapter.routeId(intent),controller,source,ingress,selections:intent,contract,captures});
  issued.set(snapshot,protocol);return snapshot;
 }
 function authentic(snapshot) {
  if(!owns(snapshot)||!adapter.isCurrentFrame(snapshot.controller,snapshot.contract,snapshot.selections))return false;
  if(typeof snapshot.controller.getIngress==='function'&&snapshot.controller.getIngress()!==snapshot.ingress)return false;
  const captures=adapter.projectCaptures(snapshot.controller,snapshot.contract,snapshot.selections);
  return captures.length===snapshot.captures.length&&snapshot.captures.every((x,i)=>captures[i].role===x.role&&captures[i].exact===x.exact);
 }
 function isCurrent(snapshot,expectation=null) {
  return authentic(snapshot)&&(!adapter.isCurrentSnapshot||adapter.isCurrentSnapshot(snapshot,expectation));
 }
 function project(snapshot,{current=false,event=null}={}) {
  return (current?isCurrent(snapshot,event):authentic(snapshot))?snapshot.contract:null;
 }
 function readSelections(snapshot,legacy,source) {
  return owns(snapshot)&&snapshot.ingress===legacy&&adapter.select(legacy)&&snapshot.source===source?snapshot.selections:legacy;
 }
 function transition(snapshot,intent,expectedFrame) {
  if(!isCurrent(snapshot,expectedFrame)||!adapter.isCurrentFrame(snapshot.controller,snapshot.contract,snapshot.selections,expectedFrame))
   return Object.freeze({handled:true,authorizationStatus:'blocked',blockReason:adapter.staleReason});
  const result=adapter.transition(snapshot.controller,snapshot.selections,intent,expectedFrame);
  if(result.authorizationStatus!=='authorized')return result;
  return Object.freeze({...result,snapshot:issue(snapshot.controller,result.selections,snapshot.source,result.contract,snapshot)});
 }
 return Object.freeze({issue,isCurrent,readSelections,transition});
}

// Every consumer reads the same retained adapter decision. Projection adds no
// grammatical permission and never reconstructs a request from presentation.
export function projectOwnerOperationDecision(snapshot,options={}) {
 return issued.get(snapshot)?.project(snapshot,options)||null;
}
function resolveDecisionChoice(decision,key) {
 const ownerField=decision?.choices?.[key];
 if(!ownerField||key==='grammarAuthority')return null;
 // Existing bindings issue option arrays. Retain that exact owner domain and
 // use their captured intent/effective selections, never the current DOM.
 const field=Array.isArray(ownerField)?{
  choiceId:key,inputKind:ownerField[0]?.inputKind==='text'?'text':'enum',options:ownerField,editable:ownerField.length>0,applicable:ownerField.length>0,
  controlChoiceId:key,
  valueKind:ownerField[0]?.valueKind || (typeof decision.effectiveSelections?.[key]==='boolean'?'boolean':'string'),
  authoredValue:decision.authoredSelections?.[key],selectedValue:decision.effectiveSelections?.[key],
  required:decision.requiredChoiceIds?.includes(key)===true
 }:ownerField;
 const presentation=decision?.presentation?.choices?.[key];
 if(!presentation)return field;
 // Addresses and a subset of an existing domain are presentation. Semantic
 // flags, selected values and replacement option records cannot grant authority.
 const address=Object.fromEntries(['controlId','controlParts','presentationLifetime','valueAliases']
  .filter(name=>Object.hasOwn(presentation,name)).map(name=>[name,presentation[name]]));
 return {...field,...address,options:presentation.optionIds&&field.options
   ?field.options.filter(option=>presentation.optionIds.includes(option.optionId)):field.options};
}
const resolveDecisionChoices=decision=>{
 const fields=Object.keys(decision?.choices||{}).map(key=>resolveDecisionChoice(decision,key));
 // One native address may present distinct consuming coordinates in different
 // owner branches. The current applicable field owns it; inactive alternatives
 // must not overwrite its domain or intercept its event.
 const addresses=new Map();
 for(const field of fields)if(field?.controlId){const prior=addresses.get(field.controlId);if(!prior||prior.applicable!==true&&field.applicable===true)addresses.set(field.controlId,field);}
 return fields.map(field=>field?.controlId&&addresses.get(field.controlId)!==field?{...field,controlId:"",controlParts:[]}:field);
};
export function projectOwnerOperationChoice(snapshot,key,options={}) {
 const decision=projectOwnerOperationDecision(snapshot,options);
 const field=resolveDecisionChoice(decision,key);
 if(!field||key==='grammarAuthority')return null;
 return field;
}
const presentationValue=(field,value)=>Object.entries(field.valueAliases||{}).find(([,canonical])=>canonical===value)?.[0]??value;
const sameChoice=(a,b)=>typeof a==='boolean'||typeof b==='boolean'?a===b:String(a)===String(b);
export function isOwnerOperationChoiceAllowed(snapshot,key,value,options={}) {
 const field=projectOwnerOperationChoice(snapshot,key,options);
 if(!field||field.editable===false||field.applicable===false)return false;
 if(field.inputKind==='text')return typeof value==='string';
 if(field.inputKind!=='enum')return false;
 return field.options?.some(option=>option.availabilityStatus==='available'&&sameChoice(option.optionId,field.valueKind==='boolean'&&typeof option.optionId==='string'?String(value):value))===true;
}
export function projectOwnerOperationChoiceMove(snapshot,key,id,options={}) {
 const field=projectOwnerOperationChoice(snapshot,key,options);
 if(!field||field.editable===false||field.applicable===false)return null;
 if(field.inputKind==='text')return Object.freeze({type:'choice',id,ownerChoiceId:key});
 if(field.inputKind!=='enum')return null;
 const values=Object.freeze(field.options.filter(option=>option.availabilityStatus==='available').map(option=>option.optionId));
 return values.length?Object.freeze({type:'choice',id,ownerChoiceId:key,values}):null;
}

export function findOwnerOperationControlChoice(snapshot, controlOrId, options={}) {
 const decision=projectOwnerOperationDecision(snapshot,options);
 const controlId=typeof controlOrId==='string'?controlOrId:controlOrId?.id;
 const generatedChoiceId=typeof controlOrId==='object'?controlOrId?.dataset?.classicalCapabilityChoiceId:null;
 for(const field of resolveDecisionChoices(decision)) {
  if(field?.controlId && field.controlId===controlId || generatedChoiceId && field?.controlChoiceId===generatedChoiceId)return field;
  const part=field?.controlParts?.find(x=>x.controlId===controlId);
  if(part)return {...field,controlPart:part};
 }
 return null;
}
export function getOwnerOperationDecisionControls(snapshot, document) {
 const decision=projectOwnerOperationDecision(snapshot);
 const fields=resolveDecisionChoices(decision);
 const generated=Array.from(document?.querySelectorAll?.('[data-classical-capability-choice-id]')||[])
   .filter(control=>fields.some(field=>field?.controlChoiceId===control.dataset?.classicalCapabilityChoiceId));
 return Array.from(new Set([...generated,...fields.flatMap(field=>
  [field?.controlId,...(field?.controlParts||[]).map(part=>part.controlId)]
    .filter(Boolean).map(id=>document?.getElementById(id)).filter(Boolean))]));
}
const subjectPart=(value,part)=>part==='person'?String(value).slice(0,1)
 :String(value).endsWith('common')?'common':String(value).endsWith('pl')?'plural':'singular';
const subjectPartOptions=(field,editedPart,readPart)=>field.options.filter(option=>option.availabilityStatus==='available'
 && field.controlParts.every(part=>part===editedPart||subjectPart(option.optionId,part.part)===String(readPart(part))));
export function readOwnerOperationControlValue(field, value, document) {
 if(field?.controlPart) {
  const parts=field.controlParts;
  return field.options.find(option=>option.availabilityStatus==='available'&&parts.every(part=>subjectPart(option.optionId,part.part)===String(
    part===field.controlPart?value:document.getElementById(part.controlId)?.value)))?.optionId ?? null;
 }
 if(field?.valueAliases&&Object.hasOwn(field.valueAliases,String(value)))value=field.valueAliases[String(value)];
 if(field?.valueKind==='boolean'||field?.options?.some(x=>typeof x.optionId==='boolean')) {
  if(value===true||value==='true')return true;
  if(value===false||value==='false')return false;
 }
 return value;
}
export function projectOwnerOperationControlMove(snapshot, control, options={}) {
 const field=findOwnerOperationControlChoice(snapshot,control,options);
 const move=field&&projectOwnerOperationChoiceMove(snapshot,field.choiceId,control.id||control.dataset?.classicalCapabilityChoiceId,options);
 if(!move)return null;
 const values=field.controlPart?Array.from(new Set(subjectPartOptions(field,field.controlPart,part=>control.ownerDocument?.getElementById(part.controlId)?.value)
   .map(option=>subjectPart(option.optionId,field.controlPart.part)))):move.values;
 return {...move,...(values?{values:control.type==='checkbox'&&field.valueKind==='boolean'?values.map(x=>x===true||x==='true'):control.type==='checkbox'?values:values.map(value=>String(presentationValue(field,value)))}:{})};
}
const presentationStates=new WeakMap();
export function restoreOwnerOperationDecisionControls(document) {
 const states=document&&presentationStates.get(document);if(!states)return false;
 for(const [control,state] of states) {
  control.disabled=state.presentationLifetime==='operation'||state.disabled;control.required=state.presentationLifetime==='operation'?false:state.required;
  if(state.ariaDisabled===null)control.removeAttribute?.('aria-disabled');else if(state.ariaDisabled!==undefined)control.setAttribute?.('aria-disabled',state.ariaDisabled);
  if(state.presentationLifetime==='operation')control.setAttribute?.('aria-disabled','true');
  if(state.host){state.host.hidden=state.presentationLifetime==='operation'||state.hidden;state.host.setAttribute?.('aria-hidden',String(state.host.hidden));if(state.presentationLifetime==='operation')state.host.setAttribute?.('aria-disabled','true');else if(state.hostAriaDisabled===null)state.host.removeAttribute?.('aria-disabled');else if(state.hostAriaDisabled!==undefined)state.host.setAttribute?.('aria-disabled',state.hostAriaDisabled);}
  for(const [option,flags] of state.options){option.hidden=flags.hidden;option.disabled=flags.disabled;if(flags.textContent!==undefined)option.textContent=flags.textContent;}
  delete control.dataset.ownerChoiceId;
 }
 presentationStates.delete(document);return true;
}
export function syncOwnerOperationDecisionControls(snapshot, document) {
 const decision=projectOwnerOperationDecision(snapshot);
 if(!decision||!document)return false;
 for(const original of resolveDecisionChoices(decision)) {
  const canonical=decision.choices[original?.choiceId];
  // An alias replaces its canonical presentation address. Empty addresses
  // deliberately leave a separate Source-authoring control with its owner.
  const withdrawn=original?.controlId && canonical?.controlId && original.controlId!==canonical.controlId
    ? [{...canonical,applicable:false,editable:false}] : [];
  const projections=[...withdrawn,original,...(original?.controlParts||[]).map(part=>({...original,controlId:part.controlId,
    selectedValue:subjectPart(original.selectedValue,part.part),authoredValue:original.authoredValue===undefined?undefined:subjectPart(original.authoredValue,part.part),
    options:Array.from(new Set(subjectPartOptions(original,part,other=>subjectPart(original.authoredValue!==undefined&&original.authoredValue!==''?original.authoredValue:original.selectedValue,other.part)).map(x=>subjectPart(x.optionId,part.part))))
      .map(optionId=>({optionId,label:optionId,availabilityStatus:'available'}))}))];
  for(const projected of projections) {
  const field=projected?.valueAliases?{...projected,selectedValue:presentationValue(projected,projected.selectedValue),authoredValue:presentationValue(projected,projected.authoredValue),options:projected.options?.map(option=>({...option,optionId:presentationValue(projected,option.optionId)}))}:projected;
  if(!field?.controlId)continue;
  const control=document.getElementById(field.controlId);
  if(!control)continue;
  const host=control.closest?.('.classical-rule-control');
  let states=presentationStates.get(document);if(!states){states=new Map();presentationStates.set(document,states);}
  if(!states.has(control))states.set(control,{presentationLifetime:field.presentationLifetime,disabled:control.disabled,required:control.required,ariaDisabled:control.getAttribute?.('aria-disabled'),host,hidden:host?.hidden,hostAriaDisabled:host?.getAttribute?.('aria-disabled'),
    options:Array.from(control.options||[]).map(option=>[option,{hidden:option.hidden,disabled:option.disabled,textContent:option.textContent}])});
  if(host){host.hidden=field.applicable!==true;host.setAttribute?.('aria-hidden',String(host.hidden));}
  control.disabled=field.applicable!==true||field.editable!==true||field.inputKind==='enum'&&!field.options?.some(x=>x.availabilityStatus==='available');
  control.setAttribute?.('aria-disabled',String(control.disabled));
  host?.setAttribute?.('aria-disabled',String(control.disabled));
  control.required=field.required===true;
  control.setAttribute?.('aria-required',String(control.required));
  control.dataset.ownerChoiceId=field.choiceId;
  const selected=field.authoredValue!==undefined&&field.authoredValue!==''?field.authoredValue:field.selectedValue;
  if(control.tagName==='SELECT'&&field.inputKind==='enum') {
   const offered=field.options||[];
   for(const option of Array.from(control.options||[])) {
    const entry=offered.find(x=>String(x.optionId)===option.value);
    option.hidden=!entry||entry.availabilityStatus!=='available';option.disabled=option.hidden;
    if(entry?.label!==undefined)option.textContent=entry.label;
   }
   for(const entry of offered) if(!Array.from(control.options||[]).some(x=>x.value===String(entry.optionId))) {
    const option=document.createElement('option');option.value=String(entry.optionId);option.textContent=entry.label||option.value;
    option.disabled=entry.availabilityStatus!=='available';option.hidden=option.disabled;control.appendChild(option);
   }
   if(selected!==undefined&&!Array.from(control.options||[]).some(x=>x.value===String(selected))) {
    const option=document.createElement('option');option.value=String(selected);option.textContent=String(selected)||'Choose';
    option.disabled=true;control.appendChild(option);
   }
   for(const group of Array.from(control.querySelectorAll?.('optgroup')||[])) {
    group.hidden=!Array.from(group.querySelectorAll('option')).some(x=>!x.hidden);group.disabled=group.hidden;
   }
  }
  // Retain authored invalid choices for owner rejection and explicit recovery.
  if(selected!==undefined&&field.applicable===true) {
   if(control.type==='checkbox')control.checked=selected===true;
   else if(typeof selected!=='object')control.value=String(selected);
  }
 }
 }
 return true;
}
function writeOwnerOperationChoiceIntent(intent,field,value) {
  const path=field.requestPath || [field.choiceId];
  let node=intent;
  for(const key of path.slice(0,-1)){node[key]={...(node[key]||{})};node=node[key];}
  node[path.at(-1)]=value;
  const option=field.options?.find(item=>item.availabilityStatus==='available'&&sameChoice(item.optionId,value));
  for(const written of option?.writeRequestValues || []) {
   let parent=intent;
   for(const key of written.path.slice(0,-1)){parent[key]={...(parent[key]||{})};parent=parent[key];}
   parent[written.path.at(-1)]=written.value;
  }
  for(const withdrawn of option?.withdrawRequestPaths || []) {
   let parent=intent;
   for(const key of withdrawn.slice(0,-1)){
    if(!parent[key]||typeof parent[key]!=='object'){parent=null;break;}
    parent[key]={...parent[key]};parent=parent[key];
   }
   if(parent)delete parent[withdrawn.at(-1)];
  }
}
export function readOwnerOperationChoiceIntent(snapshot,prior,choiceId,value,options={}) {
 const decision=projectOwnerOperationDecision(snapshot,options),field=resolveDecisionChoice(decision,choiceId);
 if(!field||!isOwnerOperationChoiceAllowed(snapshot,choiceId,value,options))return null;
 const option=field.options?.find(item=>item.availabilityStatus==='available'&&sameChoice(item.optionId,value));
 if(prior===decision.authoredSelections&&option?.nextSelections)return option.nextSelections;
 const intent={...prior};writeOwnerOperationChoiceIntent(intent,field,value);return Object.freeze(intent);
}
export function readOwnerOperationControlIntent(snapshot, document, prior={}, editedControl=null, editedValue=undefined) {
 const decision=projectOwnerOperationDecision(snapshot);
 if(!decision)return null;
 const intent={...prior};

 if(editedControl) {
  const field=findOwnerOperationControlChoice(snapshot,editedControl);
  const parsed=readOwnerOperationControlValue(field,editedValue!==undefined?editedValue:editedControl.type==='checkbox'?editedControl.checked:editedControl.value,document);
  const option=field?.options?.find(item=>item.availabilityStatus==='available'&&sameChoice(item.optionId,parsed));
  if(prior===decision.authoredSelections && option?.nextSelections)return option.nextSelections;
  if(field?.editable===true&&field.applicable===true)writeOwnerOperationChoiceIntent(intent,field,readOwnerOperationControlValue(field,
    editedValue!==undefined?editedValue:editedControl.type==='checkbox'?editedControl.checked:editedControl.value,document));
  return Object.freeze(intent);
 }
 for(const field of resolveDecisionChoices(decision)) {
  if(!field?.controlId||field.editable!==true||field.applicable!==true)continue;
  const control=document?.getElementById(field.controlId);
  if(!control||editedControl&&editedControl!==control)continue;
  const value=control.type==='checkbox'?control.checked:control.value;
  // Parsing preserves intent; admission happens before dispatch, validation at
  // owner issuance. A forged direct event cannot become an executable request.
  writeOwnerOperationChoiceIntent(intent,field,readOwnerOperationControlValue(field,value,document));
 }
 return Object.freeze(intent);
}
