import test from 'node:test';
import assert from 'node:assert/strict';
import {Element} from './helpers/organization_dom.mjs';
const presentation=await import('../ui/composition/nounstem_operation_choices.mjs').catch(error=>{
 if(error.code==='ERR_MODULE_NOT_FOUND')return {};throw error;
});
function documentFixture(){
 const root=new Element('section');root.id='classical-workbench';
 const doc={createElement:tag=>new Element(tag),getElementById:id=>root.querySelector('#'+id),querySelector:selector=>root.querySelector(selector),querySelectorAll:selector=>root.querySelectorAll(selector)};
 const host=new Element('div');host.id='nounstem';root.append(host);
 return {doc,root,host};
}
const values=['predicate-nominalization','predicate-citation','deverbal-action','nominal-continuation','verbal-continuation','patientive','patientive-embed-continuation','patientive-matrix-continuation','ownerhood','vocative','double-nucleus-ownerhood'];
const optionRef=id=>`option:id%3Aclassical-capability-navigator-binding:${encodeURIComponent(id)}`;

test('contextual Nounstem menu delegates only offered existing roles and rechecks the latest projection',()=>{
 assert.equal(typeof presentation.syncNounstemOperationChoices,'function');
 const {doc,host}=documentFixture();let calls=[];
 const option={bindingId:'affective-nnc:embed-result',label:'Form an affective noun',optionRef:optionRef('affective-nnc:embed-result'),available:true};
 const state={host,options:[option],onSelect:(id,ref)=>{calls.push([id,ref]);return true;}};
 const menu=presentation.syncNounstemOperationChoices(doc,state);
 assert.equal(menu.id,'classical-nounstem-operation');assert.equal(menu.getAttribute('aria-label'),'Nounstem operation');
 assert.equal(menu.options.find(row=>row.value===option.bindingId).dataset.inventoryOptionRef,option.optionRef);
 menu.value=option.bindingId;menu.listeners.change[0]();assert.deepEqual(calls,[[option.bindingId,option.optionRef]]);
 presentation.syncNounstemOperationChoices(doc,{...state,options:[{...option,available:false}]});
 menu.value=option.bindingId;menu.listeners.change[0]();assert.equal(calls.length,1,'withdrawn role must not reach callback');
 assert.equal(menu.value,'');assert.equal(menu.options.find(row=>row.value===option.bindingId).disabled,true);
});

test('contextual chooser preserves exact role addresses, rejects unknown roles and never replaces native noun choices',()=>{
 assert.equal(typeof presentation.syncNounstemOperationChoices,'function');
 const {doc,host}=documentFixture();const native=new Element('select');native.id='classical-rule-logic-nnc-stem-relation';native.value='affinity';host.append(native);
 const ids=['compound-nnc:embed-result','compound-nnc:matrix-result','affective-nnc:embed-result','adjectival-nnc:source-result'];
 const opts=ids.map(bindingId=>({bindingId,available:true,optionRef:optionRef(bindingId)}));
 let calls=0;const menu=presentation.syncNounstemOperationChoices(doc,{host,options:[...opts,{bindingId:'invented:stem',available:true}],onSelect:()=>{calls++;return false;}});
 assert.deepEqual(menu.options.filter(row=>row.value).map(row=>row.value),ids);
 assert.equal(native.parentElement,host);assert.equal(native.value,'affinity');
 menu.value=ids[1];menu.listeners.change[0]();assert.equal(calls,1);assert.equal(menu.value,'','rejected owner handoff remains unselected');
 const again=presentation.syncNounstemOperationChoices(doc,{host,options:opts,selectedBindingId:ids[1]});
 assert.equal(again,menu);assert.equal(menu.listeners.change.length,1);assert.equal(menu.value,ids[1]);
 assert.equal(host.querySelectorAll('#classical-nounstem-operation').length,1);
 assert.equal(native.listeners.change,undefined,'presentation dispatches no native change or Make');
});

test('deverbal family grouping retains all eleven native option nodes, values, state and listeners',()=>{
 assert.equal(typeof presentation.groupDeverbalFamilyOptions,'function');
 const {doc,host}=documentFixture();const family=new Element('select');family.id='classical-deverbal-nnc-family';host.append(family);
 const options=values.map(value=>{const row=new Element('option');row.value=value;row.textContent=value;family.append(row);return row;});
 options[5].disabled=true;let calls=0;family.addEventListener('change',()=>calls++);family.value='patientive-matrix-continuation';
 const added=new Element('option');added.value='future-owner-value';family.append(added);
 presentation.groupDeverbalFamilyOptions(doc);
 assert.equal(family.value,'patientive-matrix-continuation');assert.equal(calls,0);assert.equal(family.options.length,12);
 for(const original of options)assert(family.options.includes(original));assert.equal(options[5].disabled,true);
 const groups=family.children.filter(row=>row.tagName==='OPTGROUP');
 assert.deepEqual(groups.map(group=>group.label),['Predicate nominalization','Deverbal nounstems','Continue a noun']);
 assert.deepEqual(groups[1].options.map(row=>row.value),['deverbal-action','patientive']);
 assert.equal(added.parentElement,family,'unclassified future owner value stays intact');
 const parentByNode=options.map(option=>option.parentElement);presentation.groupDeverbalFamilyOptions(doc);
 assert.deepEqual(options.map(option=>option.parentElement),parentByNode);assert.equal(family.listeners.change.length,1);
});

async function integratedFixture(){
 const {readFileSync}=await import('node:fs');const vm=await import('node:vm');
 const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
 const {doc,root,host}=documentFixture();const selector=new Element('select');selector.id='classical-capability-navigator-operation';
 const option=new Element('option');option.value='grammar:nominal-construction';selector.append(option);root.append(selector);
 const exact=Object.freeze({id:'exact-made-nnc'}),ids=['affective-nnc:embed-result','adjectival-nnc:source-result'];
 const owner=Object.freeze({authorizationStatus:'authorized',exactResult:exact,bindingIds:ids});const issued=new WeakSet([owner]);
 const nav={inputRole:'exact-owner-issued-result',exactResult:exact,operations:[{operationId:option.value,availabilityStatus:'available',ownerBindingFrameValidated:true,ownerBindingFrame:owner,ownerBindingInputResult:exact}]};
 let active=null,entered=[],changes=0;
 const ctx=vm.createContext({targetObject:{document:doc,isClassicalGrammarApplicationCapabilityNavigator:packet=>packet===nav,
  isClassicalNahuatlFormationResultBindingFrame:packet=>issued.has(packet)},ActiveClassicalGrammarCapabilityNavigator:nav,
  getClassicalBasalUnitFromSurfaceForRendering:()=> 'nnc',getClassicalNncGrammarPresentation:()=>({groups:{nounstem:{body:host}}}),
  getActiveClassicalGrammarResultBinding:()=>active,syncNounstemOperationChoices:presentation.syncNounstemOperationChoices,
  enterClassicalGrammarResultBindingChoice(id,settings){entered.push([id,settings.allowExecution]);active={...active,selectedBindingId:id};return true;},
 });
 doc.defaultView={Event:class{constructor(type,settings){this.type=type;Object.assign(this,settings);}}};
 selector.dispatchEvent=()=>{changes++;active={exactResult:exact,ownerBindingFrame:owner,bindingIds:ids};return true;};
 for(const name of ['getClassicalNounstemOperationOwner','syncClassicalNounstemOperationChoices']){
  const start=code.indexOf(`    function ${name}(`);assert(start>=0,name+' must be integrated');
  const end=code.indexOf('\n    function ',start+1);vm.runInContext(code.slice(start,end),ctx);
 }
 return {ctx,doc,host,selector,nav,owner,exact,get changes(){return changes;},get entered(){return entered;}};
}

test('integrated Nounstem action revalidates exact owner custody and delegates through the native route without Make',async()=>{
 const h=await integratedFixture();h.ctx.syncClassicalNounstemOperationChoices({basalUnit:'nnc'});
 const menu=h.doc.getElementById('classical-nounstem-operation');assert(menu);
 assert.deepEqual(menu.options.filter(option=>option.value).map(option=>option.value),['affective-nnc:embed-result','adjectival-nnc:source-result']);
 menu.value='affective-nnc:embed-result';menu.listeners.change[0]();
 assert.equal(h.changes,1);assert.deepEqual(h.entered,[['affective-nnc:embed-result',false]]);
 h.ctx.ActiveClassicalGrammarCapabilityNavigator={...h.nav,exactResult:{id:'different-result'}};
 menu.value='adjectival-nnc:source-result';menu.listeners.change[0]();
 assert.equal(h.changes,1,'stale Result cannot activate a displayed old offer');
});

test('integrated Nounstem action rejects a copied owner frame and never exposes a Source-editor substitute',async()=>{
 const h=await integratedFixture();h.nav.operations[0]={...h.nav.operations[0],ownerBindingFrame:{...h.owner}};
 h.ctx.syncClassicalNounstemOperationChoices({basalUnit:'nnc'});
 assert.equal(h.doc.getElementById('classical-nounstem-operation'),null);assert.equal(h.changes,0);
});

test('retained intransitive incorporation withdraws stale Source-object controls while preserving prospective objects and Source editor',async()=>{
 const {readFileSync}=await import('node:fs'),vm=await import('node:vm');
 const {createRuntimeInstance}=await import('../runtime/create_runtime.mjs');
 const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
 const f=JSON.parse(readFileSync(new URL('./fixtures/nonce_stem_nominal_possession_20261024.json',import.meta.url)));
 const stem=f.nouns[1]+'a',source=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem,sourceClass:'tl-1-a'});
 const noun=r.executeClassicalGrammarApplicationRequest({operationId:'nnc:ordinary',args:[source,r.buildClassicalNahuatlOrdinaryNncOperationFrame(source,{state:'absolutive',subject:'3sg'})]}).canonicalResult;
 const verb=r.executeClassicalGrammarApplicationRequest({operationId:'vnc:application',args:[{sourceStem:f.verbs[2],sourceValence:'specific-projective',verbClass:'A',subject:'3sg',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active',objectKind:'specific-projective',objectPerson:'3sg'}]}).canonicalResult;
 const made=r.executeClassicalGrammarApplicationRequest({operationId:'grammar:nominal-construction',args:[{constructionKind:'nominal-embed-vnc',relation:'object',route:'object',subject:'3sg',mood:'indicative',tense:'present',voice:'active',source:{embedStem:stem,embedClass:'tl',embedSourceClass:'tl-1-a',embedConstituent:{kind:'ordinary-nnc',stem,resultFrame:noun},matrixStem:f.verbs[2],matrixValence:'specific-projective',matrixVerbClass:'A',matrixConstituent:{kind:'vnc-result',stem:f.verbs[2],resultFrame:verb}}}]}).canonicalResult;
 assert(made);const owner=r.issueClassicalNahuatlVncContinuationBindingFrame('vnc:derivational-operation',made,{});
 assert.equal(owner.ownerInputAcceptanceProven,true);assert.equal(owner.continuationSourceProjection.sourceObjectRequests.length,0);
 const {doc,root}=documentFixture(),controls=new Element('div');controls.id='classical-rule-logic-controls';root.append(controls);
 const organizer=new Element('div');controls.append(organizer);const valence=new Element('section');organizer.append(valence);
 const body=new Element('div');body.dataset.classicalVncAuthorityStage='valence';valence.append(body);
 const field=new Element('label');field.className='classical-rule-control';field.dataset.classicalVncAuthorityOrder='predicate-object';body.append(field);
 const object=new Element('select');object.id='classical-rule-logic-object';object.value='specific-projective:3sg';field.append(object);
 const futureField=new Element('label');futureField.className='classical-rule-control';futureField.dataset.classicalVncAuthorityOrder='verbstem-applicative-object';futureField.hidden=true;body.append(futureField);
 const futureObject=new Element('select');futureObject.id='classical-rule-logic-applicative-object';futureObject.value='specific-projective:2sg';futureField.append(futureObject);
 const editor=new Element('select');editor.id='classical-rule-logic-valence';editor.value='specific-projective';root.append(editor);
 const selector=new Element('select');selector.id='classical-capability-navigator-operation';selector.value='vnc:derivational-operation';root.append(selector);
 const binding={family:'vnc-continuation',operationId:'vnc:derivational-operation',exactResult:made,ownerBindingFrame:owner};
 const ctx=vm.createContext({targetObject:{...r,document:doc},ActiveClassicalGrammarCapabilityNavigator:r.getClassicalGrammarApplicationCapabilityNavigator(made),ActiveClassicalGrammarResultBinding:binding,
  getClassicalVncAuthorityProgressivePresentation:()=>({organizer,valence}),normalizeClassicalBasalUnitForRendering:value=>value,syncClassicalRetainedNominalVncVoiceChoices:()=>false});
 const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
 for(const name of ['syncClassicalVncAuthorityProgressivePresentation','syncClassicalRetainedVncGrammarOrganizer']){
  const start=code.indexOf(`    function ${name}(`),end=code.indexOf('\n    function ',start+1);vm.runInContext(code.slice(start,end),ctx);
 }
 assert.equal(ctx.syncClassicalRetainedVncGrammarOrganizer(binding),true);
 assert.equal(field.hidden,true);assert.equal(object.disabled,true);assert.equal(valence.hidden,true);
 assert.equal(object.value,'specific-projective:3sg','withdrawal preserves the old Source selection for its own editor');assert.equal(editor.value,'specific-projective');
 futureField.hidden=false;ctx.syncClassicalRetainedVncGrammarOrganizer(binding);
 assert.equal(futureField.hidden,false);assert.equal(futureObject.disabled,false);assert.equal(futureObject.value,'specific-projective:2sg');assert.equal(valence.hidden,false,'prospective applicative choices keep their own Objects section');
});

test('programmatic exact binding entry projects only an offered native role without dispatching another action',async()=>{
 const {readFileSync}=await import('node:fs'),vm=await import('node:vm');
 const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
 const {doc,root}=documentFixture(),select=new Element('select');select.id='classical-capability-navigator-binding';root.append(select);
 const id='affective-nnc:embed-result',option=new Element('option');option.value=id;select.append(option);select.value='';
 let changes=0;select.addEventListener('change',()=>changes++);
 const name='syncClassicalSelectedResultBindingRole',start=code.indexOf(`    function ${name}(`);assert(start>=0);
 const ctx=vm.createContext({targetObject:{document:doc}}),end=code.indexOf('\n    function ',start+1);vm.runInContext(code.slice(start,end),ctx);
 const binding={bindingIds:[id]};assert.equal(ctx[name](binding,id),true);assert.equal(select.value,id);assert.equal(changes,0);
 select.value='';option.disabled=true;assert.equal(ctx[name](binding,id),false);assert.equal(select.value,'');
 option.disabled=false;assert.equal(ctx[name]({bindingIds:[]},id),false);assert.equal(select.value,'');
 const entryStart=code.indexOf('    function enterClassicalGrammarResultBindingChoice('),entryEnd=code.indexOf('\n    function ',entryStart+1);
 assert.match(code.slice(entryStart,entryEnd),/syncClassicalSelectedResultBindingRole\(current, normalizedBindingId\)/);
});
