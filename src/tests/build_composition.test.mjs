import test from 'node:test';
import assert from 'node:assert/strict';
import {Element} from './helpers/organization_dom.mjs';
import {orderVncSubjectFields,presentNncBuildOptions} from '../ui/composition/build_composition.mjs';

const field=(key,value=key)=>{
  const label=new Element('label'),control=new Element('select');
  label.dataset.classicalVncAuthorityOrder=key;control.value=value;label.append(control);
  const listener=()=>{};control.addEventListener('change',listener);
  return {label,control,listener};
};

test('Subject person and number read together in DOM order without absorbing Result subject or reference',()=>{
  const source=new Element('section'),result=new Element('section');
  const rows=['subject-person','subject-animacy','subject-humanness','subject-number'].map(key=>field(key));
  source.append(...rows.map(r=>r.label));const resultField=field('subject-person','2sg');result.append(resultField.label);
  const reference=field('context-reference');source.append(reference.label);
  orderVncSubjectFields(source);
  assert.deepEqual(source.children.map(n=>n.dataset.classicalVncAuthorityOrder),['subject-person','subject-number','subject-animacy','subject-humanness','context-reference']);
  const removals=rows.map(r=>r.label.removals);orderVncSubjectFields(source);
  assert.deepEqual(rows.map(r=>r.label.removals),removals,'settled refresh must not move the fields again');
  for(const r of rows){assert.equal(r.label.parentElement,source);assert.equal(r.control.value,r.label.dataset.classicalVncAuthorityOrder);assert.deepEqual(r.control.listeners.change,[r.listener]);}
  assert.equal(resultField.label.parentElement,result);assert.equal(resultField.control.value,'2sg');
});

test('NNC stem labels are readable while exact values, choice identity and unavailable alternatives survive',()=>{
  const label=new Element('label'),control=new Element('select');control.value='yo-matrix';control.dataset.classicalCapabilityChoiceId='predicateFormation';
  const values=['source-stem','yo-matrix','secondary-general-use','analogical-restricted-use','owner-specific-value'];
  const buttons=values.map(value=>{const button=new Element('button');button.dataset.compositionChoiceValue=value;button.textContent=value;return button;});
  for(const value of values){const option=new Element('option');option.value=value;option.textContent=value;option.disabled=value==='secondary-general-use';control.append(option);}
  label.append(control,...buttons);presentNncBuildOptions(label,control,'predicateFormation');
  assert.deepEqual(control.options.map(o=>o.value),values);assert.equal(control.value,'yo-matrix');assert.equal(control.options[2].disabled,true);
  assert.deepEqual(buttons.map(b=>b.textContent),['Source stem','Yō matrix','Secondary general-use stem','Analogical restricted-use stem','owner-specific-value']);
  assert.equal(control.options[4].textContent,'owner-specific-value','unknown owner labels retain their own meaning');
  const relation=new Element('select'),option=new Element('option');option.value='distributive-varietal';option.textContent=option.value;relation.append(option);label.append(relation);
  presentNncBuildOptions(label,relation,'stemFormation');assert.equal(option.textContent,'Distributive / varietal');assert.equal(option.value,'distributive-varietal');
});
