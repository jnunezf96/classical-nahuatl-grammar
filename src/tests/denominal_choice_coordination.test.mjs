import test from 'node:test';import assert from 'node:assert/strict';import vm from 'node:vm';import{readFileSync}from'node:fs';import{createPossessiveFixture}from'./helpers/deverbal_possessive_fixture.mjs';
const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
test('licensed verbal stem shape survives inactive path but a new genuine Source withdraws it',async()=>{
 const {r}=await createPossessiveFixture('');const source=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:'xō',sourceClass:'tl'});
 const control={value:'',dataset:{},options:[],closest:()=>({setAttribute(){}}),replaceChildren(){this.options=[]},appendChild(o){this.options.push(o)}};
 const target=Object.create(r);Object.defineProperty(target,'document',{value:{getElementById:()=>control,createElement:()=>({})}});
 const ctx=vm.createContext({targetObject:target,ActiveClassicalGrammarResultSourceCapture:null,ActiveClassicalGrammarCapabilityNavigator:{exactSource:source,inputRole:'exact-owner-issued-source'}});
 const a=code.indexOf('    function syncClassicalDenominalVerbalStemShape('),b=code.indexOf('    function syncClassicalDenominalVncControls()',a);vm.runInContext(code.slice(a,b),ctx);
 const hui={operationPath:['inceptive-hui']};ctx.syncClassicalDenominalVerbalStemShape(hui);control.value='short';let ready=ctx.syncClassicalDenominalVerbalStemShape(hui);assert.equal(r.isClassicalNahuatlDenominalVerbalStemPreparation(ready.verbalStemPreparationFrame),true);
 assert.equal(ctx.syncClassicalDenominalVerbalStemShape({operationPath:['inceptive-ti']}),null);assert.equal(control.disabled,true);assert.equal(control.value,'short');
 ready=ctx.syncClassicalDenominalVerbalStemShape(hui);assert.equal(ready.verbalStemPreparationFrame.stemShape,'short');assert.equal(ready.verbalStemPreparationFrame.canonicalNncSourceFrame,source);
 ctx.ActiveClassicalGrammarCapabilityNavigator.exactSource=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:'xō',sourceClass:'tl'});ctx.syncClassicalDenominalVerbalStemShape(hui);assert.equal(control.value,'');
 assert.equal(r.issueClassicalNahuatlDenominalVerbalStemPreparation({...source},{stemShape:'short'}).authorizationStatus,'blocked');
});
async function fixture(){
 const f=await createPossessiveFixture('cal'),{controls,set,documentObject}=f;
 documentObject.createElement=tag=>({tagName:tag.toUpperCase(),value:'',textContent:'',hidden:false,disabled:false,dataset:{},setAttribute(){},removeAttribute(){}});
 for(const c of controls.values())if(c.tagName==='SELECT'){for(const o of c.options){o.dataset={};o.setAttribute=()=>{};o.removeAttribute=()=>{};}c.replaceChildren=()=>{c.options=[]};c.appendChild=o=>{o.remove=()=>{c.options=c.options.filter(x=>x!==o)};c.options.push(o);return o};c.prepend=o=>c.options.unshift(o);}
 controls.set('classical-source-parts',{dataset:{classicalBasalUnit:'nnc'}});
 for(const[id,value]of Object.entries({'classical-construction-operation':'denominal-vnc','classical-rule-logic-nnc-class':'li','classical-denominal-vnc-operation':'applicative-huia-use','classical-rule-logic-vnc-subject-person':'1','classical-rule-logic-vnc-subject-number':'singular','classical-rule-logic-vnc-subject-animacy':'animate','classical-rule-logic-vnc-subject-humanness':'human','classical-rule-logic-mood':'indicative','classical-rule-logic-tense':'present','classical-rule-logic-vnc-output-scope':'single'})){set(id,value);controls.get(id).disabled=false;}return f;
}
test('inactive result object retains nonspecific choice without entering intransitive request',async()=>{
 const {r,set,controls}=await fixture();r.buildClassicalNominalConstructionUiRequest();set('classical-denominal-vnc-result-object-1','non-specific-nonhuman');const first=r.buildClassicalNominalConstructionUiRequest();assert.deepEqual(first.objectPeople,['non-specific-nonhuman']);assert.equal(r.evaluateClassicalNahuatlDenominalVnc(first).authorizationStatus,'authorized');
 set('classical-denominal-vnc-operation','inceptive-ti');const inactive=r.buildClassicalNominalConstructionUiRequest();assert.deepEqual(inactive.objectPeople,[]);assert.equal(r.evaluateClassicalNahuatlDenominalVnc(inactive).authorizationStatus,'authorized');assert.equal(controls.get('classical-denominal-vnc-result-object-1').value,'non-specific-nonhuman');
 set('classical-denominal-vnc-operation','applicative-huia-use');const back=r.buildClassicalNominalConstructionUiRequest();assert.deepEqual(back.objectPeople,['non-specific-nonhuman']);assert.equal(r.evaluateClassicalNahuatlDenominalVnc(back).authorizationStatus,'authorized');
});
