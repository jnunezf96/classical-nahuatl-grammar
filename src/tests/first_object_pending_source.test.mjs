import test from 'node:test';
import assert from 'node:assert/strict';
import {Element} from './helpers/organization_dom.mjs';
import {organizeSourceComposition} from '../ui/composition/source_composition.mjs';
test('pending specific-object Source keeps its original first-object choice before Apply and restores Build home',()=>{
 const root=new Element('main'),source=new Element(),build=new Element();root.append(source,build);source.id='classical-source-parts';
 const status=new Element();status.id='classical-source-commit-status';root.append(status);
 const commit=new Element();commit.className='classical-source-parts__commit-row';source.append(commit);const apply=new Element('button');apply.id='verb-entry-apply';commit.append(apply);
 const valence=new Element('select');valence.id='classical-rule-logic-valence';valence.value='specific-projective';source.append(valence);
 const label=new Element('label'),object=new Element('select'),tail=new Element();object.id='classical-rule-logic-object';object.value='specific-projective:3common';object.disabled=true;label.append(object);build.append(label,tail);
 let changed=0;object.addEventListener('change',()=>changed++);
 const doc={documentElement:{dataset:{classicalBasalUnit:'vnc'}},getElementById:id=>root.querySelector('#'+id)};
 source.dataset.classicalSourceCommitState='pending';build.hidden=true;organizeSourceComposition(doc);
 assert.equal(label.parentElement,source);assert.equal(label.nextElementSibling,commit);assert.equal(label.hidden,false);assert.equal(object.disabled,false);assert.equal(object.value,'specific-projective:3common');
 object.listeners.change[0]();assert.equal(changed,1);organizeSourceComposition(doc);assert.equal(root.querySelectorAll('#classical-rule-logic-object').length,1);
 source.dataset.classicalSourceCommitState='committed';build.hidden=false;organizeSourceComposition(doc);assert.equal(label.parentElement,build);assert.equal(label.nextElementSibling,tail);
 source.dataset.classicalSourceCommitState='pending';build.hidden=true;valence.value='intransitive';organizeSourceComposition(doc);assert.equal(label.parentElement,build);assert.equal(source.contains(label),false);assert.equal(build.hidden,true);
 valence.value='specific-projective';doc.documentElement.dataset.classicalBasalUnit='nnc';organizeSourceComposition(doc);assert.equal(label.parentElement,build);
});
