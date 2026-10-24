import test from 'node:test';
import assert from 'node:assert/strict';
import {Element} from './helpers/organization_dom.mjs';
const gate=await import('../ui/composition/operation_choice_gate.mjs').catch(()=>null);
function fixture(){
 const root=new Element();root.id='classical-workbench';const build=new Element('section');build.id='classical-authority-panel';root.append(build);
 const plan=new Element();plan.id='classical-capability-operation-plan';build.append(plan);
 const nav=new Element();nav.id='classical-capability-navigator';plan.append(nav);
 const menu=new Element('select');menu.id='classical-build-task';const empty=new Element('option'),option=new Element('option');option.value='option:verb';menu.append(empty,option);menu.value='';nav.append(menu);
 const grid=new Element();grid.className='classical-rule-controls-grid';plan.append(grid);const formula=new Element();formula.dataset.buildFormula='vnc';grid.append(formula);const control=new Element('select');control.value='2sg';control.disabled=true;formula.append(control);
 const choices=new Element();choices.id='classical-capability-operation-choices';plan.append(choices);const portalled=new Element();portalled.dataset.buildOwnerSlot='stem';plan.append(portalled);
 const requirements=new Element('details');requirements.id='classical-capability-navigator-unavailable';plan.append(requirements);
 const source=new Element();source.id='classical-source-panel';root.append(source);
 const doc={getElementById:id=>root.id===id?root:root.querySelector('#'+id),querySelectorAll:s=>root.querySelectorAll(s)};
 return {root,menu,control,grid,choices,portalled,requirements,source,option,doc};
}
test('choices wait for a selected Operation; showing them preserves owner values and availability',()=>{
 assert.ok(gate,'install the presentation gate');const f=fixture();
 assert.equal(gate.syncOperationChoiceGate(f.doc),false);assert.equal(f.root.dataset.compositionOperationSelected,'false');
 for(const n of [f.grid,f.choices,f.portalled])assert.equal(n.dataset.compositionOperationGated,'true');
 assert.equal(f.requirements.dataset.compositionOperationGated,undefined);assert.equal(f.source.dataset.compositionOperationGated,undefined);
 f.menu.value='option:verb';assert.equal(gate.syncOperationChoiceGate(f.doc),true);assert.equal(f.root.dataset.compositionOperationSelected,'true');
 assert.equal(f.control.value,'2sg');assert.equal(f.control.disabled,true);assert.equal(f.grid.hidden,false);
 f.menu.value='';assert.equal(gate.syncOperationChoiceGate(f.doc),false);assert.equal(f.control.value,'2sg');
});
test('a stale or disabled task is not an explicit available selection',()=>{
 assert.ok(gate);const f=fixture();f.menu.value='none';assert.equal(gate.syncOperationChoiceGate(f.doc),false);
 f.menu.value='option:verb';f.option.disabled=true;assert.equal(gate.syncOperationChoiceGate(f.doc),false);
});
test('a native neutral construction default does not select Operation before the user chooses it',async()=>{
 const {createBuildTaskMenu}=await import('../ui/composition/build_task_menu.mjs');
 const f=fixture();f.menu.remove();
 const field=new Element();field.id='classical-capability-navigator-field';f.root.querySelector('#classical-capability-navigator').append(field);
 const native=new Element('select');native.id='classical-capability-navigator-operation';field.append(native);
 const construction=new Element('select');construction.id='classical-construction-operation';construction.dataset.classicalSourceUnit='vnc';construction.value='none';
 const neutral=new Element('option');neutral.value='none';neutral.textContent='Standard formation';neutral.dataset.classicalApplicationOperation='direct';construction.append(neutral);f.root.querySelector('#classical-authority-panel').append(construction);
 f.doc.createElement=tag=>new Element(tag);
 createBuildTaskMenu(f.doc)();const menu=f.doc.getElementById("classical-build-task");
 assert.equal(menu.value,'','an unchosen neutral fallback must remain a placeholder');
 assert.equal(gate.syncOperationChoiceGate(f.doc),false);
});
test('operation presentation hiding never overrides a genuinely hidden owner field',async()=>{
 const {isGrammarOwnerVisible}=await import('../ui/composition/grammar_presentation.mjs');
 const wrapper=new Element(),field=new Element('select');wrapper.dataset.compositionOperationGated='true';wrapper.append(field);
 const root={dataset:{compositionOperationSelected:'false'}};
 const doc={getElementById:()=>root,defaultView:{getComputedStyle:()=>({display:'none'})}};
 assert.equal(isGrammarOwnerVisible(doc,wrapper),true,'operation gate CSS is presentation only');
 wrapper.hidden=true;
 assert.equal(isGrammarOwnerVisible(doc,wrapper),false,'owner hidden remains authoritative');
 wrapper.hidden=false;root.dataset.compositionOperationSelected='true';
 assert.equal(isGrammarOwnerVisible(doc,wrapper),false,'other CSS hiding counts after the operation gate opens');
 root.dataset.compositionOperationSelected='false';field.hidden=true;
 assert.equal(isGrammarOwnerVisible(doc,field),false,'a child owner field remains authoritative');
});
