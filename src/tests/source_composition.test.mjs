import test from 'node:test';
import assert from 'node:assert/strict';
import {Element} from './helpers/organization_dom.mjs';
import {organizeSourceComposition} from '../ui/composition/source_composition.mjs';

for(const family of ['vnc','nnc'])test(`${family} Source keeps native classification before secondary examples and guidance`,()=>{
  const panel=new Element(),parts=new Element(),guide=new Element('section');panel.id='classical-source-panel';parts.id='classical-source-parts';guide.id=`classical-${family}-source-guide`;panel.append(parts);parts.append(guide);
  const example=new Element('details'),guidance=new Element('details'),field=new Element('label'),choice=new Element('select');
  example.dataset.compositionDisclosure=`classical-${family}-source-${family==='vnc'?'stem-choices':'example'}`;
  guidance.dataset.compositionDisclosure=`classical-${family}-source-guide-input-guidance`;
  example.open=true;guidance.open=false;choice.value='tl-1-a';choice.disabled=true;field.hidden=true;field.append(choice);guide.append(example,field,guidance);
  let calls=0;choice.addEventListener('change',()=>calls++);
  const doc={getElementById:id=>panel.id===id?panel:panel.querySelector(`#${id}`)};
  organizeSourceComposition(doc);
  assert.deepEqual(guide.children,[field,example,guidance]);assert.equal(choice.parentElement,field);assert.equal(guide.parentElement,parts);
  assert.equal(choice.value,'tl-1-a');assert.equal(choice.disabled,true);assert.equal(field.hidden,true);assert.equal(example.open,true);assert.equal(guidance.open,false);
  choice.listeners.change[0]();assert.equal(calls,1);
  const removals=[field,example,guidance].map(n=>n.removals);organizeSourceComposition(doc);assert.deepEqual([field,example,guidance].map(n=>n.removals),removals);
  const conditional=new Element('label');conditional.id='owner-conditional-field';guide.append(conditional);field.hidden=false;choice.disabled=false;
  organizeSourceComposition(doc);assert.deepEqual(guide.children,[field,conditional,example,guidance]);assert.equal(field.hidden,false);assert.equal(choice.disabled,false);
  assert.equal(panel.querySelectorAll('select').length,1);
});
