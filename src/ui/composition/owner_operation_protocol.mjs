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
 const field=decision?.choices?.[key];
 const presentation=decision?.presentation?.choices?.[key];
 if(!field||!presentation)return field;
 return {...field,...presentation,options:presentation.optionIds
   ?field.options.filter(option=>presentation.optionIds.includes(option.optionId)):field.options};
}
const resolveDecisionChoices=decision=>Object.keys(decision?.choices||{}).map(key=>resolveDecisionChoice(decision,key));
export function projectOwnerOperationChoice(snapshot,key,options={}) {
 const decision=projectOwnerOperationDecision(snapshot,options);
 const field=resolveDecisionChoice(decision,key);
 if(!field||key==='grammarAuthority')return null;
 return Array.isArray(field)?Object.freeze({inputKind:'enum',options:field,editable:true,applicable:true}):field;
}
const sameChoice=(a,b)=>typeof a==='boolean'||typeof b==='boolean'?a===b:String(a)===String(b);
export function isOwnerOperationChoiceAllowed(snapshot,key,value,options={}) {
 const field=projectOwnerOperationChoice(snapshot,key,options);
 if(!field||field.editable===false||field.applicable===false)return false;
 if(field.inputKind==='text')return typeof value==='string';
 if(field.inputKind!=='enum')return false;
 return field.options?.some(option=>option.availabilityStatus==='available'&&sameChoice(option.optionId,value))===true;
}
export function projectOwnerOperationChoiceMove(snapshot,key,id,options={}) {
 const field=projectOwnerOperationChoice(snapshot,key,options);
 if(!field||field.editable===false||field.applicable===false)return null;
 if(field.inputKind==='text')return Object.freeze({type:'choice',id,ownerChoiceId:key});
 if(field.inputKind!=='enum')return null;
 const values=Object.freeze(field.options.filter(option=>option.availabilityStatus==='available').map(option=>option.optionId));
 return values.length?Object.freeze({type:'choice',id,ownerChoiceId:key,values}):null;
}

export function findOwnerOperationControlChoice(snapshot, controlId, options={}) {
 const decision=projectOwnerOperationDecision(snapshot,options);
 for(const field of resolveDecisionChoices(decision)) {
  if(field?.controlId===controlId)return field;
  const part=field?.controlParts?.find(x=>x.controlId===controlId);
  if(part)return {...field,controlPart:part};
 }
 return null;
}
export function getOwnerOperationDecisionControls(snapshot, document) {
 const decision=projectOwnerOperationDecision(snapshot);
 return Array.from(new Set(resolveDecisionChoices(decision).flatMap(field=>
  [field?.controlId,...(field?.controlParts||[]).map(part=>part.controlId)]
    .filter(Boolean).map(id=>document?.getElementById(id)).filter(Boolean))));
}
const subjectPart=(value,part)=>part==='person'?String(value).slice(0,1)
 :String(value).endsWith('common')?'common':String(value).endsWith('pl')?'plural':'singular';
export function readOwnerOperationControlValue(field, value, document) {
 if(field?.controlPart) {
  const parts=field.controlParts;
  return field.options.find(option=>parts.every(part=>subjectPart(option.optionId,part.part)===String(
    part===field.controlPart?value:document.getElementById(part.controlId)?.value)))?.optionId ?? null;
 }
 return field?.options?.some(x=>typeof x.optionId==='boolean')?value===true||value==='true':value;
}
export function projectOwnerOperationControlMove(snapshot, control, options={}) {
 const field=findOwnerOperationControlChoice(snapshot,control?.id,options);
 const move=field&&projectOwnerOperationChoiceMove(snapshot,field.choiceId,control.id,options);
 if(!move)return null;
 const values=field.controlPart?Array.from(new Set(field.options.filter(option=>option.availabilityStatus==='available'
   && field.controlParts.every(part=>part===field.controlPart||subjectPart(option.optionId,part.part)===String(control.ownerDocument?.getElementById(part.controlId)?.value)))
   .map(option=>subjectPart(option.optionId,field.controlPart.part)))):move.values;
 return {...move,...(values?{values:control.type==='checkbox'?values:values.map(String)}:{})};
}
const presentationStates=new WeakMap();
export function restoreOwnerOperationDecisionControls(document) {
 const states=document&&presentationStates.get(document);if(!states)return false;
 for(const [control,state] of states) {
  control.disabled=state.presentationLifetime==='operation'||state.disabled;control.required=state.presentationLifetime==='operation'?false:state.required;
  if(state.ariaDisabled===null)control.removeAttribute?.('aria-disabled');else if(state.ariaDisabled!==undefined)control.setAttribute?.('aria-disabled',state.ariaDisabled);
  if(state.presentationLifetime==='operation')control.setAttribute?.('aria-disabled','true');
  if(state.host){state.host.hidden=state.presentationLifetime==='operation'||state.hidden;state.host.setAttribute?.('aria-hidden',String(state.host.hidden));}
  for(const [option,flags] of state.options){option.hidden=flags.hidden;option.disabled=flags.disabled;}
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
    options:Array.from(new Set(original.options.filter(x=>x.availabilityStatus==='available').map(x=>subjectPart(x.optionId,part.part))))
      .map(optionId=>({optionId,label:optionId,availabilityStatus:'available'}))}))];
  for(const field of projections) {
  if(!field?.controlId)continue;
  const control=document.getElementById(field.controlId);
  if(!control)continue;
  const host=control.closest?.('.classical-rule-control');
  let states=presentationStates.get(document);if(!states){states=new Map();presentationStates.set(document,states);}
  if(!states.has(control))states.set(control,{presentationLifetime:field.presentationLifetime,disabled:control.disabled,required:control.required,ariaDisabled:control.getAttribute?.('aria-disabled'),host,hidden:host?.hidden,
    options:Array.from(control.options||[]).map(option=>[option,{hidden:option.hidden,disabled:option.disabled}])});
  if(host){host.hidden=field.applicable!==true;host.setAttribute?.('aria-hidden',String(host.hidden));}
  control.disabled=field.applicable!==true||field.editable!==true||field.inputKind==='enum'&&!field.options?.some(x=>x.availabilityStatus==='available');
  control.setAttribute?.('aria-disabled',String(control.disabled));
  control.required=field.required===true;
  control.setAttribute?.('aria-required',String(control.required));
  control.dataset.ownerChoiceId=field.choiceId;
  const selected=field.authoredValue!==undefined&&field.authoredValue!==''?field.authoredValue:field.selectedValue;
  if(control.tagName==='SELECT'&&field.inputKind==='enum') {
   const offered=field.options||[];
   for(const option of Array.from(control.options||[])) {
    const entry=offered.find(x=>String(x.optionId)===option.value);
    option.hidden=!entry||entry.availabilityStatus!=='available';option.disabled=option.hidden;
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
export function readOwnerOperationControlIntent(snapshot, document, prior={}, editedControl=null) {
 const decision=projectOwnerOperationDecision(snapshot);
 if(!decision)return null;
 const intent={...prior};
 if(editedControl) {
  const field=findOwnerOperationControlChoice(snapshot,editedControl.id);
  if(field?.editable===true&&field.applicable===true)intent[field.choiceId]=readOwnerOperationControlValue(field,
    editedControl.type==='checkbox'?editedControl.checked:editedControl.value,document);
  return Object.freeze(intent);
 }
 for(const field of resolveDecisionChoices(decision)) {
  if(!field?.controlId||field.editable!==true||field.applicable!==true)continue;
  const control=document?.getElementById(field.controlId);
  if(!control||editedControl&&editedControl!==control)continue;
  const value=control.type==='checkbox'?control.checked:control.value;
  // Parsing preserves intent; admission happens before dispatch, validation at
  // owner issuance. A forged direct event cannot become an executable request.
  intent[field.choiceId]=field.options?.some(x=>typeof x.optionId==='boolean')
    ? value===true||value==='true':value;
 }
 return Object.freeze(intent);
}
