import {getEmbeddedStartupData} from "../../bootstrap/startup_data.mjs?v=20261022-startup-1";
const GROUPS=['material','formation','participants','clause-settings','sentence-relationships','existing-choices'];
const VOCABULARY=['material','materialHeading','build','sentence','history','diagnostics'];
const SECTIONS={vnc:['verbstem','subject','valence','tense','sentence'],nnc:['state','nounstem','predicate','subject','sentence']};
const object=(value,name)=>{if(!value||typeof value!=='object'||Array.isArray(value))throw new Error(`${name} must be an object.`);return value;};
const keys=(value,allowed)=>{for(const key of Object.keys(value))if(!allowed.includes(key))throw new Error(`Unsupported organization setting: ${key}`);};
const caption=value=>{if(typeof value!=='string'||!value.trim()||value.length>200)throw new Error('Organization captions must be nonempty text of at most 200 characters.');return value;};
export const DEFAULT_WORKSPACE_ORGANIZATION={version:1,
  vocabulary:{material:'Material',materialHeading:'Source material',build:'Build',sentence:'Sentence',history:'History',diagnostics:'Diagnostics'},
  groups:GROUPS.map((id,order)=>({id,label:['Inputs and readings','Formation','Participants','Clause/sentence form','Linking and attachment','Additional choices'][order],order})),
  choiceGroups:{},clauseDecisionGroups:{},nativeFields:{},nativeSections:SECTIONS};
export function validateWorkspaceOrganization(model){
  object(model,'Organization model');keys(model,['version','vocabulary','groups','choiceGroups','clauseDecisionGroups','nativeFields','nativeSections']);
  if(model.version!==1)throw new Error('Organization model requires version 1.');
  object(model.vocabulary,'Vocabulary');keys(model.vocabulary,VOCABULARY);
  const vocabulary=Object.fromEntries(VOCABULARY.map(key=>[key,caption(model.vocabulary[key])]));
  if(!Array.isArray(model.groups)||model.groups.length!==GROUPS.length)throw new Error('Every supported group must occur exactly once.');
  const seen=new Set(),orders=new Set();
  const groups=model.groups.map(group=>{object(group,'Group');keys(group,['id','label','order']);
    if(!GROUPS.includes(group.id)||seen.has(group.id))throw new Error('Every supported group must occur exactly once.');
    if(!Number.isInteger(group.order)||group.order<0||group.order>=GROUPS.length||orders.has(group.order))throw new Error('Each group order must occur exactly once.');
    seen.add(group.id);orders.add(group.order);return {id:group.id,label:caption(group.label),order:group.order};});
  const bindings=value=>{object(value,'Choice groups');return Object.fromEntries(Object.entries(value).map(([key,group])=>{
    if(!/^[A-Za-z_$][\w$:.-]*$/u.test(key))throw new Error(`Unsupported choice identity: ${key}`);
    if(!GROUPS.includes(group))throw new Error(`Unknown group: ${group}`);return [key,group];}));};
  object(model.nativeSections,'Native sections');keys(model.nativeSections,['vnc','nnc']);
  const nativeSections=Object.fromEntries(Object.entries(SECTIONS).map(([family,required])=>{
    const value=model.nativeSections[family];if(!Array.isArray(value)||value.length!==required.length||new Set(value).size!==required.length||required.some(section=>!value.includes(section)))throw new Error(`Every ${family} native section must occur exactly once.`);
    return [family,[...value]];}));
  return {version:1,vocabulary,groups,choiceGroups:bindings(model.choiceGroups),clauseDecisionGroups:bindings(model.clauseDecisionGroups),nativeFields:bindings(model.nativeFields||{}),nativeSections};
}

export async function loadWorkspaceOrganization(doc,{reload=false}={}){
  const embedded=getEmbeddedStartupData(doc,"data/interface_organization.json");
  if(!reload&&embedded!==undefined)return validateWorkspaceOrganization(embedded);
  const response=await doc.defaultView.fetch(new URL('../../../data/interface_organization.json',import.meta.url),{cache:'no-store'});
  if(!response.ok)throw new Error(`Organization model load failed: HTTP ${response.status}`);
  return validateWorkspaceOrganization(await response.json());
}
