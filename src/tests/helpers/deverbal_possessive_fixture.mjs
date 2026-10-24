import {readFileSync} from 'node:fs';
import {createRuntimeInstance} from '../../runtime/create_runtime.mjs';
const shell=readFileSync(new URL('../../ui/shell/classical_shell.mjs',import.meta.url),'utf8');
const attr=(text,key)=>text.match(new RegExp(`\\b${key}="([^"]*)"`))?.[1];
const has=(text,key)=>new RegExp(`(?:^|\\s)${key}(?:\\s|=|$)`).test(text);
export function nativeOptions(id){
 const body=shell.match(new RegExp(`<select\\b[^>]*\\bid="${id}"[^>]*>([\\s\\S]*?)<\\/select>`))?.[1];
 if(!body)throw Error(`missing native domain ${id}`);
 return [...body.matchAll(/<option\b([^>]*)>([\s\S]*?)<\/option>/g)].map(([,a,label])=>({value:attr(a,'value'),label:label.replace(/<[^>]*>/g,'').trim(),disabled:has(a,'disabled'),hidden:has(a,'hidden')}));
}
export const domains={possessors:nativeOptions('classical-rule-logic-nnc-possessor'),families:nativeOptions('classical-deverbal-nnc-family'),nominalizations:nativeOptions('classical-deverbal-nnc-nominalization-kind'),patientives:nativeOptions('classical-deverbal-nnc-patientive-family'),actions:nativeOptions('classical-deverbal-nnc-action-kind'),suffixes:nativeOptions('classical-deverbal-nnc-action-suffix')};
export async function createPossessiveFixture(stem){
 const controls=new Map();
 for(const [,a,body] of shell.matchAll(/<select\b([^>]*)>([\s\S]*?)<\/select>/g)){
  const id=attr(a,'id');if(!id)continue;
  const options=[...body.matchAll(/<option\b([^>]*)>([\s\S]*?)<\/option>/g)].map(([,oa,label])=>({value:attr(oa,'value')||'',textContent:label,disabled:has(oa,'disabled'),hidden:has(oa,'hidden'),selected:has(oa,'selected')}));
  controls.set(id,{id,tagName:'SELECT',value:(options.find(o=>o.selected)||options[0])?.value||'',options,dataset:{},disabled:has(a,'disabled'),hidden:false,getAttribute:()=>null,setAttribute(){},removeAttribute(){},closest:()=>null,addEventListener(){}});
 }
 for(const [,a] of shell.matchAll(/<input\b([^>]*)>/g)){
  const id=attr(a,'id');if(id)controls.set(id,{id,tagName:'INPUT',type:attr(a,'type')||'text',value:attr(a,'value')||'',checked:has(a,'checked'),disabled:has(a,'disabled'),options:[],dataset:{},getAttribute:()=>null,setAttribute(){},closest:()=>null,addEventListener(){}});
 }
 const set=(id,value)=>{const c=controls.get(id);if(!c)throw Error(`missing native control ${id}`);c.value=value;return c;};
 const documentObject={getElementById:id=>controls.get(id)||null,querySelector:()=>null,querySelectorAll:()=>[],addEventListener(){}};
 const r=(await createRuntimeInstance({documentObject})).runtimeObject;
 r.getClassicalSourcePartControlState=()=>({mode:'whole',sourceWholeStem:controls.get('classical-source-whole').value,sourceEmbedStem:'',sourceMatrixStem:''});
 const defaults={'classical-construction-operation':'deverbal-nnc','classical-source-whole':stem,'classical-rule-logic-class':'B','classical-rule-logic-valence':'projective-nonhuman','classical-rule-logic-subject':'3sg','classical-rule-logic-nnc-class':'tl-1-a','classical-rule-logic-nnc-state':'possessive','classical-rule-logic-nnc-subject-person':'3','classical-rule-logic-nnc-subject-number':'singular','classical-rule-logic-nnc-subject-animacy':'animate','classical-rule-logic-nnc-subject-humanness':'human','classical-rule-logic-nnc-possessor':'3sg'};
 for(const [id,value]of Object.entries(defaults))set(id,value);
 // Possessive number is owner-derived; the public sync withdraws the optional
 // absolutive number-variant selector before collecting this request.
 controls.get("classical-deverbal-nnc-number-connector").disabled=true;
 return {r,controls,set,defaults,documentObject};
}
