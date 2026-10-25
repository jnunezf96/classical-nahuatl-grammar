import test from 'node:test';
import assert from 'node:assert/strict';
import {Element} from './helpers/organization_dom.mjs';
import {createGrammarPresentation} from '../ui/composition/grammar_presentation.mjs';
function fixture(subjectValues){
 const root=new Element('main');root.id='classical-workbench';
 const doc={createElement:tag=>new Element(tag),getElementById:id=>root.querySelector('#'+id),querySelector:s=>root.querySelector(s),querySelectorAll:s=>root.querySelectorAll(s),defaultView:{getComputedStyle:()=>({display:'block'})}};
 const add=(parent,tag,id,cls='')=>{const n=new Element(tag);n.id=id;n.className=cls;parent.append(n);return n;};
 const controls=add(root,'section','classical-rule-logic-controls');
 const grid=add(controls,'div','','classical-rule-controls-grid');
 const plan=add(controls,'div','classical-capability-operation-plan');Object.assign(plan.dataset,{classicalCapabilityOperationId:'nnc:ordinary',classicalCapabilityTypedSourceBindingOperation:'nnc:ordinary'});
 const host=add(plan,'div','classical-capability-operation-choices');
 function options(select,values){for(const value of values){const o=add(select,'option','');o.value=value;o.dataset.classicalCapabilityOwnerOptionAvailability='available';}select.value=values[0];}
 const field=add(host,'label','','classical-capability-operation-plan__choice');
 const projection=add(field,'select','');Object.assign(projection.dataset,{classicalCapabilityChoiceId:'subject',classicalCapabilityOwnerProjection:'exact-binding'});options(projection,subjectValues);
 const personField=add(grid,'label','','classical-rule-control');personField.hidden=true;
 const person=add(personField,'select','classical-rule-logic-nnc-subject-person');options(person,['3']);person.disabled=true;
 const numberField=add(grid,'label','','classical-rule-control');
 const number=add(numberField,'select','classical-rule-logic-nnc-subject-number');options(number,['singular','plural']);
 return {refresh:createGrammarPresentation(doc),numberField,number,projection};
}
test('a singular-only owner Subject menu cannot hide the available native plural coordinate when Person is fixed',()=>{
 const h=fixture(['1sg','2sg','3sg']);h.refresh();assert.equal(h.numberField.dataset.compositionDuplicateControl,undefined);assert.equal(h.number.value,'singular');
});
test('a complete owner Subject domain can replace the native Number mirror',()=>{
 const h=fixture(['1sg','2sg','3sg','3pl']);h.refresh();assert.equal(h.numberField.dataset.compositionDuplicateControl,'subject');
});
