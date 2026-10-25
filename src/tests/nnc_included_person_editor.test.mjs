import test from 'node:test';
import assert from 'node:assert/strict';
import {Element} from './helpers/organization_dom.mjs';
import {createGrammarPresentation} from '../ui/composition/grammar_presentation.mjs';
test('the exact included-person editor replaces the ordinary possessor mirror and preserves its listener/value',()=>{
 const root=new Element('main');const doc={createElement:t=>new Element(t),getElementById:id=>root.querySelector('#'+id),querySelector:s=>root.querySelector(s),querySelectorAll:s=>root.querySelectorAll(s),defaultView:{getComputedStyle:()=>({display:'block'})}};
 const add=(parent,tag,id,cls='')=>{const e=new Element(tag);e.id=id;e.className=cls;parent.append(e);return e;};
 const controls=add(root,'section','classical-rule-logic-controls');const grid=add(controls,'div','','classical-rule-controls-grid');const plan=add(controls,'div','classical-capability-operation-plan');Object.assign(plan.dataset,{classicalCapabilityOperationId:'nnc:ordinary',classicalCapabilityTypedSourceBindingOperation:'nnc:ordinary'});
 const host=add(plan,'div','classical-capability-operation-choices');const field=add(host,'label','','classical-capability-operation-plan__choice');const projection=add(field,'select','');Object.assign(projection.dataset,{classicalCapabilityChoiceId:'includedPossessor',classicalCapabilityOwnerProjection:'exact-binding'});
 const nativeField=add(grid,'label','','classical-rule-control'),native=add(nativeField,'select','classical-rule-logic-nnc-possessor');native.value='1sg';const listener=()=>{};native.addEventListener('change',listener);
 for(const value of ['1sg','2sg','3common','1pl','2pl','3pl']){const o=add(projection,'option','');o.value=value;o.dataset.classicalCapabilityOwnerOptionAvailability='available';}
 createGrammarPresentation(doc)();assert.equal(nativeField.dataset.compositionDuplicateControl,'includedPossessor');assert.equal(native.value,'1sg');assert.equal(native.listeners.change[0],listener);assert.equal(projection.options.length,6);
});
