import test from 'node:test';
import assert from 'node:assert/strict';
import {Element} from './helpers/organization_dom.mjs';
import {organizeSourceComposition} from '../ui/composition/source_composition.mjs';
test('constituted relational choices stay with Source while pending; exact-result choices return to Build',()=>{
 const root=new Element('main');
 const add=(p,id)=>{const n=new Element();n.id=id;p.append(n);return n;};
 const source=add(root,'classical-source-parts'),status=add(source,'classical-source-commit-status');
 const build=add(root,'classical-rule-logic-controls');
 const authority=add(build,'classical-relational-nnc-authority'),tail=add(build,'tail');
 const field=add(authority,'classical-relational-nnc-possessor');field.value='1sg';
 const picker=add(source,'classical-nnc-source-example');picker.selectedOptions=[{dataset:{classicalRelationalStemId:'huan-company'}}];
 const doc={getElementById:id=>root.querySelector('#'+id)};
 organizeSourceComposition(doc);
 assert.equal(authority.parentElement,source);assert.equal(authority.nextElementSibling,status);
 source.dataset.classicalSourceCommitState='pending';build.hidden=true;
 organizeSourceComposition(doc);
 assert.equal(authority.parentElement,source);assert.equal(field.value,'1sg');
 authority.dataset.classicalRelationalResultBinding='exact-owner-issued-result';
 organizeSourceComposition(doc);
 assert.equal(authority.parentElement,build);assert.equal(authority.nextElementSibling,tail);
 assert.equal(field.value,'1sg');
});
test('raw derived Source borrows original verb controls and restores hidden homes for ordinary Source',()=>{
 const root=new Element('main');const add=(p,id,tag='div')=>{const n=new Element(tag);n.id=id;p.append(n);return n;};
 const source=add(root,'classical-source-parts');add(source,'classical-source-commit-status');
 const build=add(root,'build'),authority=add(build,'classical-relational-nnc-authority');
 const picker=add(source,'classical-nnc-source-example');picker.selectedOptions=[{dataset:{classicalRelationalStemId:'n-locative'}}];
 const original=add(root,'original');const fields=[];
 for(const id of ['classical-rule-logic-class','classical-rule-logic-valence','classical-rule-logic-nonactive-family']){
  const field=add(original,id+'-label','label');field.hidden=true;const control=add(field,id,'select');control.value=id;fields.push({field,control});
 }
 const doc={getElementById:id=>root.querySelector('#'+id)};
 authority.dataset.classicalRelationalRawVerbalSource='true';organizeSourceComposition(doc);
 for(const {field,control} of fields){assert.equal(field.parentElement,authority);assert.equal(field.firstElementChild,control);}
 authority.dataset.classicalRelationalRawVerbalSource='false';organizeSourceComposition(doc);
 for(const {field,control} of fields){assert.equal(field.parentElement,original);assert.equal(field.hidden,true);assert.equal(control.value,control.id);}
});
test('additional verbal Source objects remain before commit while pending and return for nominal sources',()=>{
 const root=new Element('main'),source=new Element(),build=new Element();root.append(source,build);
 source.id='classical-source-parts';
 const status=new Element();status.id='classical-source-commit-status';root.append(status);
 const objects=new Element('details');objects.id='classical-source-object-details';objects.open=true;build.append(objects);
 const doc={documentElement:{dataset:{classicalBasalUnit:'vnc'}},getElementById:id=>root.querySelector('#'+id)};
 organizeSourceComposition(doc);assert.equal(objects.parentElement,source);assert.equal(source.contains(objects),true);assert.equal(objects.open,true);
 source.dataset.classicalSourceCommitState='pending';build.hidden=true;organizeSourceComposition(doc);assert.equal(objects.parentElement,source);
 doc.documentElement.dataset.classicalBasalUnit='nnc';organizeSourceComposition(doc);assert.equal(objects.parentElement,build);
});
test('raw relational controls stay inside the Source editor when its live status is outside',()=>{
 const root=new Element('main');const add=(p,id,tag='div')=>{const n=new Element(tag);n.id=id;p.append(n);return n;};
 const container=add(root,'container-inputs'),status=add(container,'classical-source-commit-status');
 const editor=add(container,'source-editor','details'),source=add(editor,'classical-source-parts');
 const lane=add(source,'source-lane'),commit=add(lane,'source-commit');commit.className='classical-source-parts__commit-row';add(commit,'verb-entry-apply','button');
 const build=add(root,'classical-rule-logic-controls'),authority=add(build,'classical-relational-nnc-authority');
 const field=add(authority,'classical-relational-nnc-state','select');field.value='absolutive';
 const picker=add(source,'classical-nnc-source-example');picker.selectedOptions=[{dataset:{classicalRelationalStemId:'n-locative'}}];
 const doc={getElementById:id=>root.querySelector('#'+id)};
 organizeSourceComposition(doc);organizeSourceComposition(doc);
 assert.equal(authority.parentElement,lane,'raw controls belong to the editable Source, not the active Result status');
 assert.equal(authority.nextElementSibling,commit);assert.equal(editor.contains(authority),true);
 assert.equal(status.parentElement,container);assert.equal(field.value,'absolutive','placement must not rewrite raw Source analysis to match the accepted Result');
 authority.dataset.classicalRelationalResultBinding='exact-owner-issued-result';organizeSourceComposition(doc);
 assert.equal(authority.parentElement,build,'an exact relational binding still owns its Build choices');
});
