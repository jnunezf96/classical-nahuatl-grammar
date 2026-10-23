import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {declaredChoiceAddress,CONDITIONAL_NATIVE_FIELDS,nativeChoiceAddress} from '../ui/composition/build_choice_catalog.mjs';
import {formulaChoiceSlot,STEM_CHOICE_SECTIONS,NOUNSTEM_CHOICE_SECTIONS} from '../ui/composition/formula_layout.mjs';
const model=JSON.parse(readFileSync(new URL('../../data/interface_organization.json',import.meta.url)));

test('every declared projected binding has an explicit language address, including conditional and scoped decisions',()=>{
  for(const [key,group] of Object.entries({...model.choiceGroups,irregularStemChoice:'formation',objectSelection:'participants'})){
    const operation=key.startsWith('grammar:nominal-construction:')?'grammar:nominal-construction':'';
    const id=operation?key.slice(operation.length+1):key;
    assert(group==='material'||declaredChoiceAddress(id,operation)||Object.hasOwn(STEM_CHOICE_SECTIONS,id)||Object.hasOwn(NOUNSTEM_CHOICE_SECTIONS,id)||Object.hasOwn(NOUNSTEM_CHOICE_SECTIONS,key),`Missing explicit address: ${key}`);
    assert.notEqual(formulaChoiceSlot(id,group,'nnc',operation),'additional',key);
  }
  for(const id of Object.keys(model.clauseDecisionGroups))assert.equal(formulaChoiceSlot(id,'sentence-relationships','nnc'),'sentence',id);
});

test('cross-position conditional choices retain Andrews roles instead of inheriting a broad collector caption',()=>{
  for(const [id,group,collector,family,expected] of [
    ['classical-rule-logic-admonitive-plural-ending','clause-settings','tense','vnc','subject'],
    ['classical-rule-logic-directional','clause-settings','tense','vnc','direction'],
    ['classical-rule-logic-prefix-stack','clause-settings','tense','vnc','sentence'],
    ['classical-rule-logic-nnc-metaphorical-use','participants','state','nnc','subject'],
    ['classical-rule-logic-nnc-possessor-reduplication','formation','nounstem','nnc','state'],
    ['classical-rule-logic-tla-fusion','participants','valence','vnc','construction'],
    ['classical-calendar-boundary','formation','nounstem','nnc','construction'],
    ['classical-deverbal-nnc-affinity','formation','nounstem','nnc','nounstem'],
    ['classical-nominal-incorporated-object','participants','predicate','vnc','construction'],
    ['classical-rule-logic-optative-use','clause-settings','','vnc','sentence'],
  ])assert.equal(nativeChoiceAddress(id,group,collector,family),expected,id);
  assert.equal(formulaChoiceSlot('metaphoricalUse','participants','nnc'),'subject');
  assert.equal(formulaChoiceSlot('sentenceAntecessive','clause-settings','vnc'),'sentence');
});

test('the five conditionally public inputs absent from the older model have explicit organization addresses',()=>{
  for(const id of ['classical-deverbal-nnc-action-reference','classical-deverbal-nnc-affinity','classical-deverbal-nnc-patientive-embed-orientation','classical-nominal-incorporated-object','classical-rule-logic-optative-use']){
    assert(CONDITIONAL_NATIVE_FIELDS[id],id);
    assert.notEqual(nativeChoiceAddress(id,CONDITIONAL_NATIVE_FIELDS[id]),'additional',id);
  }
  // Source identity inputs and read-only status facts do not become decisions.
  for(const id of ['classical-rule-logic-nnc-class','classical-rule-logic-class','classical-personal-name-sentence-operation-status'])assert(!CONDITIONAL_NATIVE_FIELDS[id],id);
});
