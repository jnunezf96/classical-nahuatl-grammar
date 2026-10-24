import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {Element} from './helpers/organization_dom.mjs';
import {arrangeProjectedFormulaChoices} from '../ui/composition/formula_layout.mjs';
import {projectCanonicalStructure} from '../ui/composition/structure_design.mjs';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
const fixture=JSON.parse(readFileSync(new URL('./fixtures/nonce_clause_harmony_20261023.json',import.meta.url)));
const model=JSON.parse(readFileSync(new URL('../../data/interface_organization.json',import.meta.url)));
const load=()=>import('../ui/composition/clause_composition.mjs');
const doc={createElement:tag=>new Element(tag)};

test('every Inventory clause decision has an explicit language address and unfamiliar decisions retain a fallback',async()=>{
 const {clauseDecisionSlot}=await load();
 for(const id of Object.keys(model.clauseDecisionGroups))assert.notEqual(clauseDecisionSlot(id),'clause-additional',id);
 const controllerSource=readFileSync(new URL('../application/classical/clause_relation_controller.mjs',import.meta.url),'utf8');
 const conditionalIds=[...controllerSource.matchAll(/buildDecision\(\{\s*id:\s*"([^"]+)"/gu)].map(m=>m[1]);
 for(const id of conditionalIds)assert.notEqual(clauseDecisionSlot(id),'clause-additional',`live conditional ${id}`);
 assert.equal(clauseDecisionSlot('future-owner-choice'),'clause-additional');
 assert.equal(clauseDecisionSlot('supplementation-head-role'),'clause-reference');
 assert.equal(clauseDecisionSlot('coordination-relation'),'clause-relation');
 assert.equal(clauseDecisionSlot('complement-order'),'clause-order');
});
test('projected clause decisions preserve exact native fields, options and listeners within their owner host',()=>{
 const host=new Element(),entries=[['relation','clause-relation'],['supplementation-reference-mode','clause-reference'],['supplementation-order','clause-order'],['adjunctor-in','clause-linking'],['speech-directness','clause-context']].map(([choice,slot])=>{
  const field=new Element('label'),control=new Element('select');control.dataset.classicalClauseRelationDecision=choice;control.value='retained';control.setAttribute('aria-describedby','classical-clause-relation-status');
  const option=new Element('option');option.value='unavailable';option.disabled=true;control.append(option);let calls=0;control.addEventListener('change',()=>calls++);field.append(control);host.append(field);
  return {choice,field,control,slot,clause:true,group:'sentence-relationships',calls:()=>calls};
 });
 arrangeProjectedFormulaChoices(doc,host,entries);
 for(const entry of entries){assert.equal(entry.field.parentElement.dataset.buildOwnerSlot,entry.slot);assert.equal(entry.control.value,'retained');assert.equal(entry.control.options[0].disabled,true);assert.equal(entry.control.getAttribute('aria-describedby'),'classical-clause-relation-status');entry.control.listeners.change[0]();assert.equal(entry.calls(),1);}
 const removals=entries.map(e=>e.field.removals||0);arrangeProjectedFormulaChoices(doc,host,entries);assert.deepEqual(entries.map(e=>e.field.removals||0),removals);assert.equal(host.querySelectorAll('select').length,entries.length);
});
test('issued verb clauses expose Subject without asserting an actor role and copied Results remain unprojectable',async()=>{
 const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
 const made=r.executeClassicalGrammarApplicationRequest({operationId:'vnc:application',args:[{sourceStem:fixture.vnc,verbClass:'A',sourceValence:'intransitive',subject:'3sg',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active'}]});assert.equal(made.authorizationStatus,'authorized',made.blockReason);
 const exact=made.canonicalResult,project=value=>{const capture=r.captureClassicalGrammarApplicationResult(value,'structure');return capture.authorizationStatus==='authorized' && capture.canonicalResult===value ? {canonicalResult:value,surface:capture.applicationResult?.presentation?.surface||'',operationId:capture.operationId||''}:null;};
 const tree=projectCanonicalStructure(r,exact,project);assert(tree);assert.equal(tree.unit,'Verb clause');assert.equal(tree.endpoints.find(e=>e.id==='subject').label,'Subject');assert.equal(tree.exact,exact);assert.equal(projectCanonicalStructure(r,{...exact},project),null);
});
test('secondary clause panel distinguishes captured parts, native choices and disclosable read-only structure',async()=>{
 const {organizeClauseWorkflow}=await load();const workflow=new Element('section');
 const facts=new Element();facts.dataset.classicalClauseRelationCurrentResult='issued';
 const entry=new Element();entry.dataset.classicalClauseRelationEntryChoice='true';
 const entryField=new Element('label');entryField.dataset.classicalClauseRelationDecisionField='relation';entryField.hidden=true;entry.append(entryField);
 const marker=new Element('label');marker.dataset.classicalClauseRelationMarkerResultChoice='true';const markerStatus=new Element();markerStatus.dataset.classicalClauseRelationMarkerResultStatus='unavailable';
 const actions=new Element();actions.className='classical-whole-canvas-actions';const button=new Element('button');actions.append(button);
 const cards=new Element();cards.dataset.classicalClauseRelationCaptures='read-only';
 const decisionHeading=new Element('h5');decisionHeading.className='classical-clause-relation-workflow__section-heading';
 const choices=new Element();choices.dataset.classicalClauseRelationDecisionSurface='unresolved-semantic-choices-only';
 const hiddenField=new Element('label');hiddenField.dataset.classicalClauseRelationDecisionField='order';hiddenField.hidden=true;choices.append(hiddenField);
 const derivedHeading=new Element('h5');derivedHeading.className='classical-clause-relation-workflow__section-heading';
 const derived=new Element();derived.dataset.classicalClauseRelationDerived='read-only';derived.textContent='Owner facts';
 const status=new Element();status.id='classical-clause-relation-status';
 workflow.append(facts,entry,actions,cards,marker,markerStatus,decisionHeading,choices,derivedHeading,derived,status);
 organizeClauseWorkflow(doc,workflow);
 assert.equal(cards.parentElement.dataset.clauseWorkflowPart,'clauses');assert.equal(actions.parentElement,cards.parentElement);
 assert.equal(entry.parentElement.dataset.clauseWorkflowPart,'relationship');assert.equal(entry.parentElement.hidden,true);assert.equal(marker.parentElement.dataset.clauseWorkflowPart,'linking');assert.equal(markerStatus.parentElement,marker.parentElement);assert.equal(choices.hidden,true);assert.equal(decisionHeading.hidden,true);
 assert.equal(derived.parentElement.tagName,'DETAILS');assert.equal(derived.textContent,'Owner facts');assert.equal(derived.dataset.classicalClauseRelationDerived,'read-only');assert.equal(status.parentElement,workflow);
 const parent=derived.parentElement;parent.open=true;organizeClauseWorkflow(doc,workflow);assert.equal(derived.parentElement,parent);assert.equal(parent.open,true);
 hiddenField.hidden=false;entryField.hidden=false;organizeClauseWorkflow(doc,workflow);assert.equal(entry.parentElement.hidden,false);assert.equal(choices.hidden,false);assert.equal(decisionHeading.hidden,false);assert.equal(hiddenField.parentElement.dataset.clauseNativeSlot,'clause-order');assert.equal(hiddenField.parentElement.hidden,false);
});

test('an idle exact composite Source does not pretend to be a basal NNC/VNC formula; real routes restore native choices',async()=>{
 const {presentIdleClauseComposition}=await load();
 const root=new Element(),navigator=new Element(),operation=new Element('select'),formula=new Element();
 navigator.id='classical-capability-navigator';navigator.dataset.classicalCapabilitySourceRole='exact-owner-issued-result';operation.id='classical-capability-navigator-operation';operation.value='';formula.dataset.buildFormula='nnc';root.append(navigator,operation,formula);
 const exact={},capture={canonicalResult:exact};const doc={getElementById:id=>root.querySelector(`#${id}`),querySelectorAll:selector=>root.querySelectorAll(selector),defaultView:{getActiveClassicalGrammarResultSourceCapture:()=>capture}};
 const context={sourceScope:exact,operation:'',sources:[{exact,unit:'Clause',children:[{exact:{}},{exact:{}}]}]};
 presentIdleClauseComposition(doc,context);assert.equal(formula.hidden,true);
 assert.equal(formula.dataset.compositionClauseIdle,'true');
 operation.value='clause:composition';presentIdleClauseComposition(doc,context);assert.equal(formula.hidden,false);assert.equal(formula.dataset.compositionClauseIdle,undefined);
 operation.value='';presentIdleClauseComposition(doc,{...context,sourceScope:{...exact}});assert.equal(formula.hidden,false,'copied Source must not match exact projection');
 presentIdleClauseComposition(doc,{...context,sources:[{exact,unit:'Noun clause',children:[]}]});assert.equal(formula.hidden,false,'simple NNC keeps native formula');
 formula.hidden=true;presentIdleClauseComposition(doc,{...context,sources:[]});assert.equal(formula.hidden,true,'unrelated owner hiding remains intact');
});
