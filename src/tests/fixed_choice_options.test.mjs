import test from 'node:test';
import assert from 'node:assert/strict';
import {Element} from './helpers/organization_dom.mjs';
import {createChoiceDesign,setChoiceDesignContext} from '../ui/composition/choice_design.mjs';

function fixture({id='classical-rule-logic-vnc-subject-humanness',options=[['human',true],['nonhuman',false]],value='nonhuman',disabled=true}={}) {
 const elements=[],create=tag=>{
  const el=new Element(tag);elements.push(el);
  el.removeAttribute=name=>{delete el.attributes[name];if(name.startsWith('data-'))delete el.dataset[name.slice(5).replace(/-([a-z])/g,(_,c)=>c.toUpperCase())];};
  el.classList.remove=name=>{el.className=el.className.split(/\s+/).filter(c=>c!==name).join(' ');};
  el.classList.toggle=(name,on)=>{if(on)el.classList.add(name);else el.classList.remove(name);};
  el.focus=()=>{};el.dispatchEvent=event=>{for(const f of el.listeners[event.type]||[])f(event);};return el;
 };
 const root=create('div');root.id='classical-workbench';const panel=create('div');panel.id='classical-rule-logic-controls';root.append(panel);
 const host=create('label');panel.append(host);const select=create('select');select.id=id;host.append(select);select.value=value;select.disabled=disabled;select.labels=[];
 select.dataset.classicalCanvasSelectAvailability='disabled-single-canvas-choice';
 for(const [value,disabled,hidden=false,marked=false] of options){const o=create('option');o.value=value;o.textContent=value;o.disabled=disabled;o.hidden=hidden;if(marked)o.dataset.classicalCanvasOptionAvailability='disabled-by-current-mood';select.append(o);}
 const originalClosest=select.closest.bind(select);select.closest=q=>q==='label'?host:q==='optgroup'?null:q.includes(':')||q.includes('[hidden]')||q.includes('duplicate')?null:originalClosest(q);
 const doc={defaultView:{Event:class{constructor(type){this.type=type;}}},getElementById:id=>elements.find(n=>n.id===id)||null,createElement:create,
  querySelector:q=>q==='#classical-result-panel .classical-result-continuation-card'?null:root.querySelector(q),
  querySelectorAll:q=>q.startsWith('#classical-rule-logic-controls select[id]')?[select]:root.querySelectorAll(q)};
 const source={},accepted={};setChoiceDesignContext(root,{input:source,accepted,operation:'test',binding:'test'});
 let changes=0;select.addEventListener('change',()=>changes++);
 const refresh=createChoiceDesign(doc);
 return {root,select,refresh,buttons:()=>host.querySelectorAll('button'),mirror:()=>host.children.find(n=>n.dataset.compositionChoiceFor===id),changes:()=>changes,source,accepted};
}

test('fixed selected value keeps large button presentation and unavailable siblings, without accepting clicks',()=>{
 const f=fixture();f.refresh();const buttons=f.buttons();
 assert.equal(f.mirror().className,'composition-choice-buttons');assert.deepEqual(buttons.map(b=>b.textContent),['human','nonhuman']);
 assert.deepEqual(buttons.map(b=>b.getAttribute('aria-pressed')),['false','true']);assert(buttons.every(b=>b.disabled));
 for(const button of buttons)button.dispatchEvent({type:'click'});
 assert.equal(f.select.value,'nonhuman');assert.equal(f.changes(),0);
 f.select.disabled=false;f.select.options[0].disabled=false;f.refresh();
 let human=f.buttons().find(b=>b.textContent==='human');assert.equal(human.disabled,false);human.dispatchEvent({type:'click'});assert.equal(f.select.value,'human');assert.equal(f.changes(),1);
 f.select.disabled=true;f.select.options[1].disabled=true;f.refresh();assert.equal(f.buttons().length,2);assert(f.buttons().every(b=>b.disabled));
});

test('fixed NNC Number shows its owner-disabled hidden siblings, while unrelated hidden options remain private',()=>{
 const f=fixture({id:'classical-rule-logic-nnc-subject-number',value:'common',options:[['singular',true,true,true],['common',false],['plural',true,true,true],['internal',true,true],['future',false,true]]});
 f.refresh();assert.deepEqual(f.buttons().map(b=>b.textContent),['singular','common','plural']);assert(f.buttons().every(b=>b.disabled));
 assert.deepEqual(f.select.options.map(o=>o.hidden),[true,false,true,true,true],'native visibility is untouched');
 for(const b of f.buttons())b.dispatchEvent({type:'click'});assert.equal(f.select.value,'common');assert.equal(f.changes(),0);
 const other=fixture({options:[['secret',true,true,true],['nonhuman',false]]});other.refresh();assert.deepEqual(other.buttons().map(b=>b.textContent),['nonhuman']);
});

test('option-group restrictions disable alternatives and stale buttons cannot bypass a newly disabled group',()=>{
 const f=fixture({disabled:false,options:[['human',false],['nonhuman',false],['other',false]]});
 const group=new Element('optgroup');f.select.prepend(group);group.append(f.select.options.find(o=>o.value==='human'));
 f.refresh();let human=f.buttons().find(b=>b.textContent==='human');assert.equal(human.disabled,false);
 group.disabled=true;human.dispatchEvent({type:'click'});assert.equal(f.select.value,'nonhuman');assert.equal(f.changes(),0);
 f.refresh();assert.equal(f.buttons().find(b=>b.textContent==='human').disabled,true);
 group.hidden=true;f.refresh();assert.deepEqual(f.buttons().map(b=>b.textContent),['nonhuman','other']);
});


test('optional third voice layer retains the native keep alternative after choosing its sole added layer',async()=>{
 const {readFileSync}=await import('node:fs');
 const shell=readFileSync(new URL('../ui/shell/classical_shell.mjs',import.meta.url),'utf8');
 const tag=shell.match(/<select\s+id="classical-rule-logic-voice-layer-3"[^>]*>/u)?.[0] || '';
 const f=fixture({id:'classical-rule-logic-voice-layer-3',value:'nonactive-lō',disabled:false,options:[['',false],['nonactive-lō',false]]});
 delete f.select.dataset.classicalCanvasSelectAvailability;
 if(tag.includes('data-classical-compact-choice-display="true"'))f.select.dataset.classicalCompactChoiceDisplay='true';
 f.refresh();
 assert.equal(f.mirror(),undefined,'Keep is a real owner alternative: the sole nonempty value must not become fixed');
 assert.equal(f.select.getAttribute('aria-hidden'),null);
 assert.deepEqual(f.select.options.map(o=>o.value),['','nonactive-lō']);
 f.select.value='';f.select.dispatchEvent({type:'change'});f.refresh();
 assert.equal(f.select.value,'');assert.equal(f.changes(),1);assert.equal(f.mirror(),undefined);
});
