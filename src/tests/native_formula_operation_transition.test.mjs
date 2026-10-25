import test from 'node:test';
import assert from 'node:assert/strict';
import {Element} from './helpers/organization_dom.mjs';
import {hasAvailableNativeFormulaControl} from '../ui/composition/workspace_organization.mjs';

test('an operation transition reveals native choices despite the previous layout gate',()=>{
 const root={dataset:{compositionOperationSelected:'false'}};
 const organizer=new Element('section'),formula=new Element('section'),part=new Element('section'),wrapper=new Element('details'),field=new Element('label'),choice=new Element('select');
 formula.dataset.buildFormula='nnc';part.dataset.buildFormulaPart='predicate';
 formula.hidden=true;part.hidden=true;field.dataset.compositionOperationGated='true';
 choice.value='opaque-quoted-inner';const listener=()=>{};choice.addEventListener('change',listener);
 organizer.append(formula);formula.append(part);part.append(wrapper);wrapper.append(field);field.append(choice);
 const doc={getElementById:()=>root,defaultView:{getComputedStyle:n=>({display:n.hidden||n.dataset.compositionOperationGated!==undefined&&root.dataset.compositionOperationSelected==='false'?'none':'block'})}};
 assert.equal(hasAvailableNativeFormulaControl(doc,wrapper,organizer),true,'the previous task gate is not owner unavailability');
 root.dataset.compositionOperationSelected='true';
 assert.equal(hasAvailableNativeFormulaControl(doc,wrapper,organizer),true,'stale layout wrappers cannot hide an available selector');
 field.hidden=true;assert.equal(hasAvailableNativeFormulaControl(doc,wrapper,organizer),false,'an owner-hidden field stays unavailable');
 field.hidden=false;choice.hidden=true;assert.equal(hasAvailableNativeFormulaControl(doc,wrapper,organizer),false,'an owner-hidden control stays unavailable');
 assert.equal(choice.value,'opaque-quoted-inner');assert.equal(field.children[0],choice);
});
