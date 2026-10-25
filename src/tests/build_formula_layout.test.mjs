import test from 'node:test';
import assert from 'node:assert/strict';
import {getNativeGrammarControls} from '../ui/composition/choice_design.mjs';
import {isGrammarOwnerVisible} from '../ui/composition/grammar_presentation.mjs';
import {Element} from './helpers/organization_dom.mjs';
import {arrangeNuclearClauseSlots,formulaChoiceSlot,arrangeProjectedFormulaChoices,stemCollectorCaption,vncSubjectCaption,uniteCoreStemChoices,uniteNounstemChoices,arrangeProjectedClauseChoices,preserveDisclosureChoice} from '../ui/composition/formula_layout.mjs';

import {ownerChoiceRoots,ownerChoiceHost,findOwnerChoice,clearOwnerChoicePortals} from '../ui/composition/owner_choice_roots.mjs?v=20261023-core-1';

function fixture(family) {
  const doc={createElement:tag=>new Element(tag)};
  const organizer=new Element();
  const kinds=family==='vnc'?['verbstem','subject','valence','tense','sentence']:['state','nounstem','predicate','subject','sentence'];
  const entries=kinds.map(kind=>{
    const wrapper=new Element('details'),section=new Element('section'),control=new Element('select');
    control.id=`${family}-${kind}`;control.value='retained';control.disabled=kind==='predicate';
    section.append(control);wrapper.append(section);organizer.append(wrapper);
    const listener=()=>{};control.addEventListener('change',listener);
    return {kind,wrapper,section,control,listener};
  });
  return {doc,organizer,entries,get:kind=>entries.find(row=>row.kind===kind)};
}

test('VNC Subject surrounds a Predicate with Core (valence + stem) and tense',()=>{
  const f=fixture('vnc');arrangeNuclearClauseSlots(f.doc,f.organizer,'vnc',f.entries);
  const part=id=>f.organizer.querySelector(`[data-build-formula-part="${id}"]`);
  assert.equal(f.get('subject').wrapper.parentElement,part('subject'));
  assert.equal(part('core').parentElement,part('predicate'));
  assert.equal(f.get('valence').wrapper.parentElement,part('core'));
  assert.equal(f.get('verbstem').wrapper.parentElement,part('core'));
  assert(part('core').children.indexOf(f.get('valence').wrapper)<part('core').children.indexOf(f.get('verbstem').wrapper));
  assert.equal(f.get('tense').wrapper.parentElement,part('predicate'));
  assert.equal(f.get('sentence').wrapper.parentElement,f.organizer);
  assert.match(f.organizer.querySelector('[data-build-formula-pattern]').textContent,/person.*valence.*STEM.*tense.*number/);
});

test('projected owner choices use inventory groups while distinguishing Subject, Core and State',()=>{
  const f=fixture('vnc'),host=new Element();
  const inputs=[['requestedDerivation','formation','stem'],['causativeObjectKind','participants','valence'],['causativeResultSubject','participants','result-subject'],['possessor','participants','state'],['tense','clause-settings','tense'],['numberForm','participants','subject'],['animacy','participants','reference'],['humanness','participants','reference'],['subjectHumanness','participants','subject'],['unknown','participants','reference']];
  const entries=inputs.map(([choice,group,expected])=>{const field=new Element('label');field.append(new Element('select'));host.append(field);assert.equal(formulaChoiceSlot(choice,group),expected);return {choice,group,field};});
  arrangeProjectedFormulaChoices(f.doc,host,entries);
  for(const [i,entry]of entries.entries())assert.equal(entry.field.parentElement.dataset.buildOwnerSlot,inputs[i][2]);
  assert.equal(host.querySelectorAll('select').length,inputs.length);
  arrangeProjectedFormulaChoices(f.doc,host,entries);
  assert.equal(host.querySelectorAll('select').length,inputs.length);
});

test('stem choices include derivation and voice without swallowing valence or construction decisions',()=>{
  for(const id of ['requestedDerivation','derivationOptionId','requestedVoice','voice','nonactiveOptionId','stemFormation','frequentativeRepetitions','purposiveSeries'])assert.equal(formulaChoiceSlot(id,'formation'),'stem',id);
  assert.equal(formulaChoiceSlot('predicateFormation','formation'),'predicate');
  for(const id of ['calendar-boundary','nominalization-kind','unknownFormation'])assert.equal(formulaChoiceSlot(id,'formation'),'construction',id);
  for(const id of ['causativeObjectKind','applicativeObjectKind','applicativeObjectPerson'])assert.equal(formulaChoiceSlot(id,'participants'),'valence',id);
  assert.equal(formulaChoiceSlot('causativeResultSubject','participants'),'result-subject');
  assert.equal(formulaChoiceSlot('purposiveIrregularPluralN','formation'),'subject');
  assert.equal(formulaChoiceSlot('purposiveExternalDirectional','formation'),'direction');
  assert.equal(formulaChoiceSlot('frequentativeTarget','formation'),'reduplication');
  assert.equal(formulaChoiceSlot('sourceNonactiveOptionId','material'),'material');
  assert.equal(stemCollectorCaption(false),'Stem');
  assert.equal(stemCollectorCaption(true),'Stem and related choices');
});

test('Stem presents derivation, its formation and later voice in order while preserving native controls',()=>{
  const f=fixture('vnc'),host=new Element();
  const entries=['requestedVoice','derivationOptionId','requestedDerivation','nonactiveOptionId'].map(choice=>{
    const field=new Element('label'),control=new Element('select');field.append(control);host.append(field);
    control.value=choice;control.disabled=choice==='nonactiveOptionId';
    const listener=()=>{};control.addEventListener('change',listener);
    return {field,control,listener,choice,group:'formation',hidden:false};
  });
  arrangeProjectedFormulaChoices(f.doc,host,entries);
  const stem=host.querySelector('[data-build-owner-slot="stem"]');
  assert.equal(stem.firstElementChild.textContent,'Stem');
  assert.deepEqual(stem.children.slice(1).map(field=>entries.find(e=>e.field===field).choice),['requestedDerivation','derivationOptionId','requestedVoice','nonactiveOptionId']);
  arrangeProjectedFormulaChoices(f.doc,host,entries);
  for(const entry of entries){assert.equal(entry.control.value,entry.choice);assert.equal(entry.control.disabled,entry.choice==='nonactiveOptionId');assert.deepEqual(entry.control.listeners.change,[entry.listener]);}
  assert.equal(host.querySelectorAll('select').length,4);
});

test('transformation choices distinguish source agreement from the result subject',()=>{
  assert.equal(vncSubjectCaption(),'Subject');
  assert.equal(vncSubjectCaption({nativeVoice:'passive'}),'Source subject');
  assert.equal(vncSubjectCaption({nativeDerivation:'causative'}),'Source subject');
  assert.equal(vncSubjectCaption({derivation:'direct',voice:'active',nativeDerivation:'causative',nativeVoice:'passive'}),'Subject');
  assert.equal(vncSubjectCaption({voice:'passive'}),'Source subject');
  assert.equal(vncSubjectCaption({voice:'impersonal'}),'Source subject');
  assert.equal(vncSubjectCaption({derivation:'causative'}),'Source subject');
  assert.equal(vncSubjectCaption({derivation:'applicative'}),'Source subject');
  assert.equal(vncSubjectCaption({isTarget:true,voice:'passive',derivation:'causative'}),'Result subject');
});

test('NNC keeps State and nounstem within Predicate and number-only endings with Subject',()=>{
  const f=fixture('nnc');f.get('nounstem').numberOnly=true;
  arrangeNuclearClauseSlots(f.doc,f.organizer,'nnc',f.entries);
  const part=id=>f.organizer.querySelector(`[data-build-formula-part="${id}"]`);
  assert.equal(f.get('state').wrapper.parentElement,part('predicate'));
  assert.equal(f.get('predicate').wrapper.parentElement,part('predicate'));
  assert.equal(f.get('nounstem').wrapper.parentElement,part('subject'));
  assert.equal(part('core'),null);
});

test('refresh preserves controls, listeners, selections, availability and settled DOM placement',()=>{
  const f=fixture('vnc');arrangeNuclearClauseSlots(f.doc,f.organizer,'vnc',f.entries);
  const positions=f.entries.map(row=>[row.wrapper.parentElement,row.wrapper.removals]);
  arrangeNuclearClauseSlots(f.doc,f.organizer,'vnc',f.entries);
  for(const [i,row] of f.entries.entries()){
    assert.equal(row.wrapper.parentElement,positions[i][0]);assert.equal(row.wrapper.removals,positions[i][1]);
    assert.equal(row.control.value,'retained');assert.deepEqual(row.control.listeners.change,[row.listener]);
    assert.equal(row.section.contains(row.control),true);
  }
  assert.equal(f.organizer.querySelectorAll('[data-build-formula]').length,1);
});


test('nominal number endings return to Predicate when nounstem choices are available again',()=>{
  const f=fixture('nnc');f.get('nounstem').numberOnly=true;
  arrangeNuclearClauseSlots(f.doc,f.organizer,'nnc',f.entries);
  f.get('nounstem').numberOnly=false;
  arrangeNuclearClauseSlots(f.doc,f.organizer,'nnc',f.entries);
  assert.equal(f.get('nounstem').wrapper.parentElement.dataset.buildFormulaPart,'predicate');
  assert.equal(f.organizer.querySelectorAll('select').length,5);
});

function portalFixture(family='vnc'){
  const f=fixture(family),root=new Element(),host=new Element();host.id='classical-capability-operation-choices';
  root.append(host,f.organizer);
  f.doc.documentElement=root;f.doc.getElementById=id=>root.querySelector(`#${id}`);
  const native=f.get(family==='vnc'?'verbstem':'nounstem');native.wrapper.open=false;
  const summary=new Element('summary');summary.textContent='Stem';native.wrapper.prepend(summary);
  const field=new Element('label'),control=new Element('select');control.dataset.classicalCapabilityChoiceId='requestedVoice';control.value='active';
  const listener=()=>{};control.addEventListener('change',listener);field.append(control);host.append(field);
  const entries=[{field,choice:'requestedVoice',group:'formation',hidden:false}];
  arrangeNuclearClauseSlots(f.doc,f.organizer,family,f.entries);
  if(family==='nnc'){entries[0].choice='predicateFormation';entries[0].family='nnc';control.dataset.classicalCapabilityChoiceId='predicateFormation';}
  arrangeProjectedFormulaChoices(f.doc,host,entries);
  return {...f,host,root,field,control,entriesProjected:entries,listener};
}

test('one Stem location in Core retains logical owner and native ancestry across refresh',()=>{
  const f=portalFixture(),native=f.get('verbstem');
  uniteCoreStemChoices(f.doc,f.organizer);
  const shared=f.organizer.querySelector('[data-build-unified-stem]');
  assert.equal(shared.parentElement.dataset.buildFormulaPart,'core');
  assert.equal(native.wrapper.parentElement,shared);
  assert.equal(native.control.parentElement,native.section);
  assert.equal(f.field.parentElement.parentElement,shared);
  assert.equal(ownerChoiceHost(f.control,f.doc),f.host);
  assert.equal(findOwnerChoice(f.doc,'[data-classical-capability-choice-id="requestedVoice"]'),f.control);
  assert.equal(ownerChoiceRoots(f.doc).length,2);
  const positions=[shared.removals,native.wrapper.removals,f.field.removals];
  arrangeNuclearClauseSlots(f.doc,f.organizer,'vnc',f.entries);
  arrangeProjectedFormulaChoices(f.doc,f.host,f.entriesProjected);
  uniteCoreStemChoices(f.doc,f.organizer);
  assert.deepEqual([shared.removals,native.wrapper.removals,f.field.removals],positions);
  assert.equal(f.control.value,'active');assert.deepEqual(f.control.listeners.change,[f.listener]);
  assert.equal(f.root.querySelectorAll('[data-classical-capability-choice-id="requestedVoice"]').length,1);
});

test('owner reset removes portalled fields while preserving native Stem controls and fallback',()=>{
  const f=portalFixture(),native=f.get('verbstem');uniteCoreStemChoices(f.doc,f.organizer);
  clearOwnerChoicePortals(f.doc);f.host.replaceChildren();
  assert.equal(findOwnerChoice(f.doc,'[data-classical-capability-choice-id]'),null);
  assert.equal(ownerChoiceHost(f.control,f.doc),null);
  assert(f.root.contains(native.control));assert.equal(native.control.parentElement,native.section);
  uniteCoreStemChoices(f.doc,f.organizer);
  assert.equal(native.wrapper.open,false);assert.equal(native.wrapper.dataset.unifiedStemInline,undefined);
  // A new projection can re-enter the same shared section, without retaining
  // stale fields or the old listener. Other families restore normal placement.
  const field=new Element('label'),control=new Element('select');control.dataset.classicalCapabilityChoiceId='requestedVoice';field.append(control);f.host.append(field);
  arrangeProjectedFormulaChoices(f.doc,f.host,[{field,choice:'requestedVoice',group:'formation'}]);uniteCoreStemChoices(f.doc,f.organizer);
  assert.equal(findOwnerChoice(f.doc,'[data-classical-capability-choice-id]'),control);
  uniteCoreStemChoices(f.doc,f.organizer,false);
  assert(f.host.contains(control));assert.equal(ownerChoiceRoots(f.doc).length,1);
  assert.equal(native.wrapper.dataset.unifiedStemInline,undefined);
});


test('native choice capture includes the exact portalled owner control once and drops it on reset',()=>{
  const f=portalFixture();uniteCoreStemChoices(f.doc,f.organizer);
  f.control.id='';f.control.dataset.classicalCompactChoiceOriginal='true';f.control.dataset.classicalCapabilityOwnerProjection='exact-binding';
  f.doc.querySelectorAll=selector=>selector.startsWith('#classical-rule-logic-controls select[id]')
    ?f.root.querySelectorAll('[data-classical-capability-choice-id]'):f.root.querySelectorAll(selector);
  const closest=f.control.closest.bind(f.control);
  f.control.closest=selector=>selector.includes('[hidden]')?null:closest(selector);
  assert.deepEqual(getNativeGrammarControls(f.doc),[f.control]);
  assert.equal(getNativeGrammarControls(f.doc)[0].value,'active');
  clearOwnerChoicePortals(f.doc);f.host.replaceChildren();
  assert.deepEqual(getNativeGrammarControls(f.doc),[]);
});


test('NNC formation addresses distinguish nounstem from State, Subject number and other contexts',()=>{
  for(const id of ['stemFormation','predicateFormation','predicatePluralization','nominalization-kind','action-kind','action-suffix','patientive-family','root-stock-allomorph','compound-structure'])assert.equal(formulaChoiceSlot(id,'formation','nnc'),'nounstem',id);
  assert.equal(formulaChoiceSlot('predicateFormation','formation','vnc'),'predicate');
  assert.equal(formulaChoiceSlot('stemFormation','formation','vnc'),'stem');
  assert.equal(formulaChoiceSlot('sourceNonactiveOptionId','material','nnc'),'material');
  assert.equal(formulaChoiceSlot('root-stock-noun-class','material','nnc'),'material');
  assert.equal(formulaChoiceSlot('possessorReduplication','formation','nnc'),'state');
  assert.equal(formulaChoiceSlot('action-reference','formation','nnc'),'reference');
  for(const id of ['pluralConnector','singularConnector','numberForm'])assert.equal(formulaChoiceSlot(id,'participants','nnc'),'subject');
  for(const id of ['ordinaryNumberVariant','grossPossessiveNumberVariant'])assert.equal(formulaChoiceSlot(id,'formation','nnc','grammar:nominal-construction'),'subject');
  assert.equal(formulaChoiceSlot('numeralVariant','formation','nnc','grammar:nominal-construction'),'nounstem');
  assert.equal(formulaChoiceSlot('numeralVariant','formation','nnc','other'),'construction');
  for(const id of ['calendar-boundary','continuation-relation','nominal-embed-route','similarityReduplicationShape','unknown'])assert.equal(formulaChoiceSlot(id,'formation','nnc'),'construction',id);
});

test('NNC unifies generated and native nounstem under Predicate, separate from State and Core',()=>{
  const f=portalFixture('nnc'),native=f.get('nounstem');uniteNounstemChoices(f.doc,f.organizer);
  const shared=f.organizer.querySelector('[data-build-unified-stem]');
  assert.equal(shared.parentElement.dataset.buildFormulaPart,'predicate');
  assert.equal(shared.querySelector('[data-build-owner-slot="nounstem"]').firstElementChild.textContent,'Nounstem');
  assert.equal(native.wrapper.parentElement,shared);assert.equal(native.control.parentElement,native.section);
  assert.equal(f.get('state').wrapper.parentElement,shared.parentElement);
  assert.equal(f.organizer.querySelector('[data-build-formula-part="core"]'),null);
  assert.equal(ownerChoiceHost(f.control,f.doc),f.host);
  const removals=[shared.removals,native.wrapper.removals];
  arrangeNuclearClauseSlots(f.doc,f.organizer,'nnc',f.entries);arrangeProjectedFormulaChoices(f.doc,f.host,f.entriesProjected);uniteNounstemChoices(f.doc,f.organizer);
  assert.deepEqual([shared.removals,native.wrapper.removals],removals);
  assert.deepEqual(f.control.listeners.change,[f.listener]);
});

test('NNC Subject-only endings leave unified Nounstem and return without losing the collector',()=>{
  const f=portalFixture('nnc'),native=f.get('nounstem');uniteNounstemChoices(f.doc,f.organizer);
  native.numberOnly=true;arrangeNuclearClauseSlots(f.doc,f.organizer,'nnc',f.entries);uniteNounstemChoices(f.doc,f.organizer);
  assert.equal(native.wrapper.parentElement.dataset.buildFormulaPart,'subject');
  assert.equal(native.wrapper.dataset.unifiedStemInline,undefined);
  assert.equal(f.field.parentElement.parentElement.parentElement.dataset.buildFormulaPart,'predicate');
  native.numberOnly=false;arrangeNuclearClauseSlots(f.doc,f.organizer,'nnc',f.entries);uniteNounstemChoices(f.doc,f.organizer);
  assert.equal(native.wrapper.parentElement.dataset.buildUnifiedStem,'nnc');
  clearOwnerChoicePortals(f.doc);f.host.replaceChildren();uniteNounstemChoices(f.doc,f.organizer);
  assert(f.root.contains(native.control));assert.equal(native.wrapper.open,false);
  assert.equal(ownerChoiceHost(f.control,f.doc),null);
});


test('joint native/projection slots preserve conditional controls, ownership and disclosure state',()=>{
  const f=portalFixture('vnc');
  const choices=[['subject','participants','subject'],['causativeObjectKind','participants','valence'],['tense','clause-settings','tense'],['directionalPrefix','clause-settings','direction'],['negative','sentence-relationships','sentence']];
  const sentence=new Element('details');sentence.dataset.workspaceSentenceChoices='vnc';f.organizer.append(sentence);
  for(const entry of f.entries){entry.wrapper.open=false;entry.section.dataset.classicalVncAuthorityDisclosure=entry.kind;}
  const fields=choices.map(([choice,group])=>{const field=new Element('label'),control=new Element('select');control.dataset.classicalCapabilityChoiceId=choice;control.value=choice;control.disabled=choice==='negative';field.hidden=choice==='negative';field.append(control);f.host.append(field);const listener=()=>{};control.addEventListener('change',listener);return {choice,group,field,control,listener,family:'vnc',hidden:field.hidden};});
  arrangeProjectedFormulaChoices(f.doc,f.host,fields);arrangeProjectedClauseChoices(f.doc,f.organizer,'vnc');
  for(const [i,entry]of fields.entries()){
    const slot=choices[i][2],bucket=entry.field.parentElement;
    assert.equal(bucket.dataset.buildOwnerSlot,slot);
    assert.equal(ownerChoiceHost(entry.control,f.doc),f.host);
    assert.equal(bucket.parentElement,slot==='direction'?f.organizer.querySelector('[data-build-formula-part="core"]'):slot==='sentence'?sentence:f.get(slot).wrapper);
  }
  const positions=fields.map(e=>e.field.parentElement.removals);
  arrangeProjectedFormulaChoices(f.doc,f.host,fields);arrangeProjectedClauseChoices(f.doc,f.organizer,'vnc');
  assert.deepEqual(fields.map(e=>e.field.parentElement.removals),positions);
  for(const entry of fields){assert.equal(entry.control.value,entry.choice);assert.deepEqual(entry.control.listeners.change,[entry.listener]);}
  assert(fields.at(-1).field.hidden);assert(fields.at(-1).control.disabled);
  for(const kind of ['subject','valence','tense'])assert.equal(f.get(kind).wrapper.open,false);
  arrangeProjectedClauseChoices(f.doc,f.organizer,'nnc',false);
  assert.equal(ownerChoiceHost(fields[0].control,f.doc),f.host);
  clearOwnerChoicePortals(f.doc);f.host.replaceChildren();
  for(const entry of f.entries)assert(f.root.contains(entry.control));
  for(const entry of fields)assert.equal(ownerChoiceHost(entry.control,f.doc),null);
});

test('a transformed Source subject collector does not absorb Result agreement',()=>{
  const f=portalFixture('vnc'),native=f.get('subject');
  const summary=new Element('summary');summary.textContent='Source subject';native.wrapper.prepend(summary);
  const field=new Element('label'),control=new Element('select');control.dataset.classicalCapabilityChoiceId='subject';field.append(control);f.host.append(field);
  arrangeProjectedFormulaChoices(f.doc,f.host,[{choice:'subject',group:'participants',field,family:'vnc'}]);
  arrangeProjectedClauseChoices(f.doc,f.organizer,'vnc');
  assert.equal(field.parentElement.parentElement.dataset.buildFormulaPart,'subject');
  assert(!native.wrapper.contains(control));assert(native.wrapper.contains(native.control));
});


test('derived portal visibility cannot oscillate an exact owner mirror; owner gates still apply',()=>{
  const control=new Element('select'),field=new Element('label'),bucket=new Element('section'),collector=new Element('section');
  bucket.dataset.buildOwnerSlot='state';bucket.hidden=true;field.append(control);bucket.append(field);collector.append(bucket);
  const doc={defaultView:{getComputedStyle:n=>({display:n.hidden?'none':'block'})}};
  assert.equal(isGrammarOwnerVisible(doc,control),true);
  field.hidden=true;assert.equal(isGrammarOwnerVisible(doc,control),false);
  field.hidden=false;collector.hidden=true;assert.equal(isGrammarOwnerVisible(doc,control),false);
});


test('a collapse click is retained before a synchronous refresh and its later native toggle',()=>{
 const summary=new Element('summary'),details=new Element('details'),state=new Map();details.open=true;
 preserveDisclosureChoice(summary,details,state,'nnc-subject');
 for(const click of summary.listeners.click)click();
 assert.equal(state.get('nnc-subject'),false,'refresh must see the intended collapse before native toggle fires');
 details.open=false;for(const toggle of details.listeners.toggle)toggle();assert.equal(state.get('nnc-subject'),false);
 for(const click of summary.listeners.click)click();assert.equal(state.get('nnc-subject'),true);
 details.open=true;for(const toggle of details.listeners.toggle)toggle();assert.equal(state.get('nnc-subject'),true);
});

test('NNC State precedes its projected possession detail in one native disclosure across refresh',()=>{
  const f=portalFixture('nnc'),native=f.get('state');native.section.dataset.classicalNncGrammarSection='state';
  const fields=['possessor','state','possessorReduplication'].map(choice=>{
    const field=new Element('label'),control=new Element('select');control.dataset.classicalCapabilityChoiceId=choice;control.value=choice;field.append(control);f.host.append(field);
    return {choice,group:'participants',field,control,family:'nnc'};
  });
  arrangeProjectedFormulaChoices(f.doc,f.host,fields);arrangeProjectedClauseChoices(f.doc,f.organizer,'nnc');
  const bucket=fields[0].field.parentElement;
  assert(native.wrapper.children.indexOf(native.section)<native.wrapper.children.indexOf(bucket),'native State introduces possession');
  assert.deepEqual(bucket.children.slice(1).map(field=>field.querySelector('select').dataset.classicalCapabilityChoiceId),['state','possessor','possessorReduplication']);
  const removals=bucket.removals;arrangeProjectedFormulaChoices(f.doc,f.host,fields);arrangeProjectedClauseChoices(f.doc,f.organizer,'nnc');
  assert.equal(bucket.removals,removals);assert.equal(native.control.parentElement,native.section);assert.equal(ownerChoiceHost(fields[0].control,f.doc),f.host);
});

test('decision groups remain contiguous inside retained formula slots without moving settled controls',()=>{
 const {doc}=fixture('vnc');const host=new Element('section');
 const entries=[['subject','participants'],['numberForm','formation'],['subjectHumanness','participants']].map(([choice,group])=>{
  const field=new Element('label');field.append(new Element('select'));host.append(field);return {field,choice,group};
 });
 const groups=[{id:'formation',order:0},{id:'participants',order:1}];
 arrangeProjectedFormulaChoices(doc,host,entries,groups);
 const bucket=entries[0].field.parentElement;
 assert.deepEqual(bucket.children.slice(1),[entries[1].field,entries[0].field,entries[2].field]);
 const heading=new Element('h3');heading.dataset.workspaceChoiceHeading='participants';entries[0].field.before(heading);
 const moves=entries.map(entry=>entry.field.removals||0);
 arrangeProjectedFormulaChoices(doc,host,entries,groups);
 assert.deepEqual(entries.map(entry=>entry.field.removals||0),moves);
 assert.ok(entries.every(entry=>entry.field.parentElement===bucket));
});


test('decision heading precedes the first structurally ordered field, independent of caller order',async()=>{
 const {organizeWorkspaceDecisionHeadings}=await import('../ui/composition/workspace_organization.mjs');
 const {doc}=fixture('vnc');const host=new Element('section');
 const entries=['possessor','state'].map(choice=>{const field=new Element('label');field.append(new Element('select'));host.append(field);return {field,choice,group:'participants'};});
 const groups=[{id:'participants',label:'Participants',order:0}];
 arrangeProjectedFormulaChoices(doc,host,entries,groups);organizeWorkspaceDecisionHeadings(doc,entries,groups);
 const bucket=entries[0].field.parentElement;const heading=bucket.querySelector('[data-workspace-choice-heading]');
 assert.equal(heading.nextElementSibling,entries[1].field);
 const moves=entries.map(entry=>entry.field.removals||0);
 arrangeProjectedFormulaChoices(doc,host,entries,groups);organizeWorkspaceDecisionHeadings(doc,entries,groups);
 assert.deepEqual(entries.map(entry=>entry.field.removals||0),moves);assert.equal(heading.nextElementSibling,entries[1].field);
});
