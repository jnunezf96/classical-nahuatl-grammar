import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {Element} from './helpers/organization_dom.mjs';
import {createChoiceDesign,setChoiceDesignContext} from '../ui/composition/choice_design.mjs';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import {createPossessiveFixture} from './helpers/deverbal_possessive_fixture.mjs';
const corpus=JSON.parse(readFileSync(new URL('./fixtures/nonce_interface_repairs_20261024.json',import.meta.url)));
const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');

function fixture(){
  const elements=[],create=tag=>{
    const el=new Element(tag);elements.push(el);el.classList.remove=name=>el.className=el.className.split(/\s+/).filter(c=>c!==name).join(' ');
    el.classList.toggle=(name,on)=>on?el.classList.add(name):el.classList.remove(name);
    el.removeAttribute=name=>{delete el.attributes[name];};el.dispatchEvent=event=>{for(const f of el.listeners[event.type]||[])f(event);};return el;
  };
  const root=create('div');root.id='classical-workbench';const panel=create('div');panel.id='classical-rule-logic-controls';root.append(panel);
  const host=create('label');host.className='classical-rule-control';panel.append(host);const select=create('select');select.id='classical-rule-logic-compound-nonactive-scope';select.labels=[];host.append(select);
  for(const [value,label]of [['none','none'],['embed','Embed'],['matrix','Matrix'],['both','Both']]){const o=create('option');o.value=value;o.textContent=label;select.append(o);}select.value='both';
  const originalClosest=select.closest.bind(select);select.closest=q=>q.includes(':')||q.includes('[hidden]')||q.includes('duplicate')?null:originalClosest(q);
  const doc={defaultView:{Event:class{constructor(type){this.type=type;}}},createElement:create,getElementById:id=>elements.find(n=>n.id===id)||null,
    querySelector:q=>q==='#classical-result-panel .classical-result-continuation-card'?null:root.querySelector(q),
    querySelectorAll:q=>q.startsWith('#classical-rule-logic-controls select[id]')?[select]:root.querySelectorAll(q)};
  const ctx=vm.createContext({targetObject:{document:doc},ActiveClassicalGrammarResultBinding:null,ActiveClassicalVncResultSourceContinuation:null,
    syncClassicalPurposiveCoordinateControls(){},syncClassicalLateVariantControlForOperation:()=>({variantControl:null,licensedVariants:new Set(['future-embed','connective-t'])}),isClassicalRecursiveCompoundContinuationFrame:()=>false,
    syncFutureObjectChoices(){},syncClassicalStemLayerChoices(){},syncClassicalCompoundMatrixFormation(){}});
  for(const name of ['getClassicalCompoundNonactiveScopeValues','syncClassicalLessons27282933Closure']){
    const start=code.indexOf(`    function ${name}(`);if(start<0)continue;const end=code.indexOf('\n    function ',start+1);vm.runInContext(code.slice(start,end),ctx);
  }
  const sync=(voice,variant='future-embed')=>ctx.syncClassicalLessons27282933Closure({basalUnit:'vnc',state:{stem:corpus.verbStems.short[0],lateOperation:'compound',lateVariant:variant,compoundMatrixStem:variant==='future-embed'?'nequi':'nemi',vncVoice:voice==='tla-impersonal'?'impersonal':voice,vncVoiceOperation:voice}});
  setChoiceDesignContext(root,{input:{},accepted:{},operation:'vnc:derivational-operation',binding:'test'});
  return {root,host,select,sync,refresh:createChoiceDesign(doc)};
}

for(const voice of ['passive','impersonal','tla-impersonal'])test(`${voice} future embed retains only Embed as applicable and shows disabled placement alternatives`,()=>{
  const h=fixture();h.sync(voice);
  assert.equal(h.host.hidden,false,'fixed placement remains inspectable');assert.equal(h.select.value,'embed');
  assert.deepEqual(h.select.options.filter(o=>!o.disabled).map(o=>o.value),['embed']);
  for(const value of ['matrix','both']){const option=h.select.options.find(o=>o.value===value);assert(option.disabled);assert.equal(option.hidden,false);}
  h.refresh();const buttons=h.host.querySelectorAll('button');
  assert.deepEqual(buttons.map(button=>button.textContent).filter(label=>['Embed','Matrix','Both'].includes(label)),['Embed','Matrix','Both']);
  assert(buttons.every(button=>button.disabled));
  for(const button of buttons)button.dispatchEvent({type:'click'});assert.equal(h.select.value,'embed');
  h.refresh();assert(h.host.querySelectorAll('button').every(button=>button.disabled),'fixed proxy must not re-enable a forbidden placement');
});

test('ordinary connective compound scope domains survive leaving the future-embed route',()=>{
  const h=fixture();h.sync('passive');h.sync('passive','connective-t');
  assert.deepEqual(h.select.options.filter(o=>!o.disabled).map(o=>o.value),['embed','both']);
  h.sync('impersonal','connective-t');assert.deepEqual(h.select.options.filter(o=>!o.disabled).map(o=>o.value),['embed','matrix','both']);
  h.sync('active','future-embed');assert.deepEqual(h.select.options.filter(o=>!o.disabled).map(o=>o.value),['none']);assert(h.host.hidden);
});

test('actual raw state collection cannot retain a stale matrix-only scope for a future embed',async()=>{
  const h=await createPossessiveFixture(corpus.verbStems.medium[0]);
  h.documentObject.removeEventListener=()=>{};
  const instance=await createRuntimeInstance({documentObject:h.documentObject,collectModuleInspectionDescriptors:true});
  const r=Object.create(instance.runtimeObject);Object.defineProperties(r,instance.moduleInspectionDescriptors);
  const state=r.getClassicalRuleLogicSurfaceState({basalUnit:'vnc',stem:corpus.verbStems.medium[0],subject:'2sg',vncVoice:'passive',vncVoiceOperation:'passive',voice:'passive',requestedVoice:'passive',lateOperation:'compound',lateVariant:'future-embed',compoundMatrixStem:'nequi',compoundNonactiveScope:'both'});
  assert.equal(state.compoundNonactiveScope,'embed');
});
