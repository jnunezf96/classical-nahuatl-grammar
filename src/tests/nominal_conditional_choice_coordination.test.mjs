import test from 'node:test';import assert from 'node:assert/strict';import vm from 'node:vm';import{readFileSync}from'node:fs';
const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
const slice=(start,end)=>code.slice(code.indexOf(start),code.indexOf(end,code.indexOf(start)));
function control(value,values){return{value,options:values.map(value=>({value,dataset:{}})),disabled:false,required:false,setAttribute(){},replaceChildren(){this.options=[]},appendChild(o){this.options.push(o)}};}
test('inactive personal-name scope retains inner intent then reconciles current family domain',()=>{
 const c=control('inner',['none','inner','outer']),wrapper={setAttribute(){}};c.closest=()=>wrapper;
 const block=slice('      const scopeControl = targetObject.document?.getElementById(\n        "classical-personal-name-affective-scope"','      const selectedScope = active');
 const ctx=vm.createContext({targetObject:{document:{getElementById:()=>c}},active:false,structure:null});
 vm.runInContext(`(()=>{${block}})()`,ctx);assert.equal(c.value,'inner');assert.equal(c.disabled,true);
 ctx.active=true;ctx.structure={allowedAffectiveScopes:['none','inner','outer']};vm.runInContext(`(()=>{${block}})()`,ctx);assert.equal(c.value,'inner');
 ctx.structure={allowedAffectiveScopes:['none']};vm.runInContext(`(()=>{${block}})()`,ctx);assert.equal(c.value,'none');
});
test('inactive patientive analogy retains passive but intransitive active route excludes it',()=>{
 const c=control('passive',['impersonal','passive']),w={setAttribute(){},querySelector:()=>c,querySelectorAll:()=>[c]};
 const block=slice('      targetObject.document?.querySelectorAll?.(\n        "[data-deverbal-patientive-analogy]"','      targetObject.document?.querySelectorAll?.(\n        "[data-deverbal-characteristic-reading]"');
 const ctx=vm.createContext({targetObject:{document:{querySelectorAll:()=>[w]}},active:false,patientiveRoute:false,patientiveFamily:'imperfective-active-core',sourceValence:'specific-projective'});
 vm.runInContext(block,ctx);assert.equal(c.value,'passive');assert.equal(c.disabled,true);
 ctx.active=true;ctx.patientiveRoute=true;vm.runInContext(block,ctx);assert.equal(c.value,'passive');
 ctx.sourceValence='intransitive';vm.runInContext(block,ctx);assert.equal(c.value,'impersonal');assert.equal(c.options[1].disabled,true);
});
test('inactive lexical choice preserves value and options until current owner domain returns',()=>{
 const c=control('silent',['c','silent']),w={setAttribute(){}};c.closest=()=>w;
 const ctx=vm.createContext({targetObject:{document:{getElementById:()=>c,createElement:()=>({})}},active:false,lexicalFrame:null,selectedFamily:'none'});
 const block=slice('      const syncLexicalChoice = ({','      if (frame?.operationFrame) {\n        syncLexicalChoice');vm.runInContext(block+'globalThis.sync=syncLexicalChoice;',ctx);
 ctx.sync({id:'field',values:[],fallback:'ordinary',relevant:false});assert.equal(c.value,'silent');assert.equal(c.options.length,2);assert.equal(c.disabled,true);
 ctx.active=true;ctx.sync({id:'field',values:['c','silent'],ownerInventoryAuthorized:true,relevant:true});assert.equal(c.value,'silent');
 ctx.sync({id:'field',values:['qui'],ownerInventoryAuthorized:true,relevant:true,fallback:'qui'});assert.equal(c.value,'qui');
});
test('inactive active-action reference retains human reading but active absolutive withdraws it',()=>{
 const c=control('human-metaphor',['action','human-metaphor']);c.closest=()=>({setAttribute(){}});
 const block=slice('      const referenceControl = targetObject.document?.getElementById("classical-deverbal-nnc-action-reference")','      if (activeActionReferenceAvailable && frame.operationFrame.humanActionReferenceFrame)');
 const ctx=vm.createContext({targetObject:{document:{getElementById:()=>c}},active:false,frame:null,selectedFamily:'predicate-nominalization',nominalizationKind:'active-action',getClassicalNominalConstructionControlValue:()=> 'absolutive'});
 vm.runInContext(`(()=>{${block}})()`,ctx);assert.equal(c.value,'human-metaphor');assert.equal(c.disabled,true);
 ctx.active=true;ctx.selectedFamily='patientive';vm.runInContext(`(()=>{${block}})()`,ctx);assert.equal(c.value,'human-metaphor');ctx.selectedFamily='predicate-nominalization';ctx.frame={authorizationStatus:'authorized',operationFrame:{nominalizationKind:'active-action'}};ctx.getClassicalNominalConstructionControlValue=()=> 'possessive';vm.runInContext(`(()=>{${block}})()`,ctx);assert.equal(c.value,'human-metaphor');assert.equal(c.disabled,false);
 ctx.getClassicalNominalConstructionControlValue=()=> 'absolutive';vm.runInContext(`(()=>{${block}})()`,ctx);assert.equal(c.value,'action');
});
