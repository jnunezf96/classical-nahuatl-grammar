import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import {previewConstructionPacket} from '../ui/composition/construction_preview.mjs';
import {executeConstructionPacket} from '../ui/composition/construction_packet.mjs';
import {createConstructionSession} from '../ui/composition/construction_session.mjs';
import {projectResultForEditing} from '../ui/composition/result_editing.mjs';
import {exportClassicalResultReloadRecipe,replayClassicalResultReloadRecipe} from '../application/classical/result_reload.mjs';
const f=JSON.parse(readFileSync(new URL('./fixtures/nonce_future_object_20261024.json',import.meta.url)));
const runtime=async()=>(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
const r=await runtime();
const base={subject:'1sg',mood:'indicative',tense:'future',requestedDerivation:'direct',requestedVoice:'active'};
function future(r,stem,extra={}){const a=r.executeClassicalGrammarApplicationRequest({operationId:'vnc:application',args:[{sourceStem:stem,sourceValence:'intransitive',verbClass:'A',...base,...extra}]});assert.equal(a.authorizationStatus,'authorized',a.blockReason);return a.canonicalResult;}
function bind(r,a,extra={}){return r.issueClassicalNahuatlVncContinuationBindingFrame('vnc:derivational-operation',a,{...base,lateOperation:'compound',lateVariant:'future-embed',compoundMatrixStem:'nequi',...extra});}
function make(r,b){assert.equal(b.bindingStatus,'ready',b.blockReason);const a=r.executeClassicalGrammarApplicationRequest({operationId:'vnc:derivational-operation',args:b.executionArgs});assert.equal(a.authorizationStatus,'authorized',a.blockReason);return a.canonicalResult;}
test('nequi fixed class B and canonical finite matrix govern the incorporated predicate, including plural preterit',()=>{
 for(const [i,subject] of ['1sg','1pl'].entries())for(const compoundMatrixClass of ['','A','B','D']){
  const a=future(r,f.stems[i],{subject}),b=bind(r,a,{subject,tense:'preterit',compoundMatrixClass}),c=make(r,b);
  const matrix=r.evaluateClassicalNahuatlVncApplication({sourceStem:'nequi',sourceValence:'specific-projective',verbClass:'B',subject,objectKind:'specific-projective',objectPerson:'3sg',mood:'indicative',tense:'preterit',requestedDerivation:'direct',requestedVoice:'active'});
  assert.equal(c.matrixApplicationFrame.normalizedRequest.verbClass,'B');
  assert.equal(c.matrixApplicationFrame.resultFrame.finalTypedVncSlotFrame.slots.predicate.stem,matrix.resultFrame.finalTypedVncSlotFrame.slots.predicate.stem);
  assert.equal(c.operationFrame.targetStem,`${f.stems[i]}-z-nec`);
  for(const key of ["num1","num2"])assert.equal(c.finalTypedVncSlotFrame.slots.number[key],matrix.resultFrame.finalTypedVncSlotFrame.slots.number[key]);
  assert.equal(c.operationFrame.operationFacts.futureEmbedTense,'future');
 }
});
test('future Source and its transitive object survive, preview does not accept, Make alone accepts',()=>{
 const a=future(r,f.stems[2],{sourceValence:'specific-projective',objectKind:'specific-projective',objectPerson:'3pl'}),history=r.getClassicalGrammarWorkspaceHistorySnapshot();
 const b=bind(r,a,{tense:'present'});assert.equal(b.bindingStatus,'ready',b.blockReason);assert.equal(b.exactInputResult,a);assert.equal(b.ownerRequest.sourceApplicationFrame,a);
 const packet={kind:'request',operation:'vnc:derivational-operation',source:a,request:{operationId:'vnc:derivational-operation',args:b.executionArgs}};
 const preview=previewConstructionPacket(r,packet);assert(preview?.isCurrent());assert.deepEqual(r.getClassicalGrammarWorkspaceHistorySnapshot(),history);assert.equal(projectResultForEditing(r,preview.canonicalResult),null);
 const s=createConstructionSession({isSource:()=>true,isResult:x=>Boolean(projectResultForEditing(r,x)),execute:p=>executeConstructionPacket(r,p),present:()=>true});s.restore(a,null);s.stage({source:a,route:{operation:'vnc:derivational-operation'},choices:b.callerSelections,slots:[],ready:true,execution:packet});assert.equal(s.position.accepted.result,a);assert(s.make());
 const c=s.position.accepted.result,facts=c.operationFrame.operationFacts;
 assert.equal(c.surfaceRealization,preview.surface);assert.equal(c.baseApplicationFrame,a);assert.equal(facts.futureSupplementationFrame.authorizationStatus,'authorized');assert.equal(facts.matrixObjectCarrierSuppressed,true);assert.equal(facts.principalAndSupplementSubjectsCoreferential,true);
 const topology=slots=>slots.map(({id,role,kind,carrier,va1,va2})=>({id,role,kind,carrier,va1,va2}));
 assert.deepEqual(topology(c.finalTypedVncSlotFrame.slots.prePredicate),topology(a.resultFrame.finalTypedVncSlotFrame.slots.prePredicate));
});
test('qui is imperfect-only; unsupported matrices and copied Source are rejected',()=>{
 const a=future(r,f.stems[3]);const c=make(r,bind(r,a,{compoundMatrixStem:'qui',tense:'imperfect'}));assert(c.surfaceRealization.endsWith('zquiya'));
 for(const extra of [{compoundMatrixStem:'qui',tense:'present'},{compoundMatrixStem:'mati',tense:'present'}]){const b=bind(r,a,extra);assert.notEqual(b.bindingStatus,'ready');assert.equal(r.executeClassicalGrammarApplicationRequest({operationId:'vnc:derivational-operation',args:b.executionArgs||[b.ownerRequest]}).authorizationStatus,'blocked');}
 assert.notEqual(bind(r,structuredClone(a)).bindingStatus,'ready');
});
test('reload reissues the accepted finite compound and its exact future Source without flattening',async()=>{
 const a=future(r,f.stems[4]),c=make(r,bind(r,a,{tense:'preterit'})),recipe=exportClassicalResultReloadRecipe(r,{result:c,source:a});assert(recipe);
 const next=await runtime(),roots=replayClassicalResultReloadRecipe(next,JSON.parse(JSON.stringify(recipe)));assert(roots);assert.equal(roots.result.surfaceRealization,c.surfaceRealization);assert.equal(roots.result.operationFrame.targetStem,`${f.stems[4]}-z-nec`);assert.equal(roots.source.normalizedRequest.tense,'future');
 const again=make(next,bind(next,roots.source,{tense:'future'}));assert.equal(again.operationFrame.targetStem,`${f.stems[4]}-z-nequi`);assert(again.surfaceRealization.endsWith('znequiz'));
});

test('matrix picker stages the existing native choice, shows fixed analyses, and scopes finite labels',async()=>{
 const {syncFutureObjectChoices}=await import('../ui/composition/future_object_choices.mjs');
 const {Element}=await import('./helpers/organization_dom.mjs');
 const body=new Element('div'),document={createElement:tag=>new Element(tag),getElementById:id=>body.querySelector('#'+id),defaultView:{Event:class{constructor(type,options){this.type=type;this.bubbles=options.bubbles;}}}};
 const label=new Element('label'),native=new Element('input');native.id='classical-rule-logic-compound-matrix';native.value='nequi';label.append(native);body.append(label);
 for(const id of ['mood','tense']){const w=new Element('label'),l=new Element('span'),c=new Element('select');l.className='classical-rule-control__label';l.textContent=id;c.id='classical-rule-logic-'+id;w.append(l,c);body.append(w);}
 let event;native.dispatchEvent=x=>event=x;
 const state={lateOperation:'compound',lateVariant:'future-embed',compoundMatrixStem:'tla-nequi'};
 syncFutureObjectChoices(document,state);const menu=document.getElementById('classical-future-object-matrix');assert.equal(menu.value,'nequi');assert.equal(menu.dataset.classicalMirrorsControl,native.id);assert(native.hidden);assert(!menu.hidden);assert.equal(menu.options.length,3);assert.equal(body.querySelector('.classical-rule-control__label').textContent,'Matrix mood');
 menu.value='qui';menu.listeners.change[0]();assert.equal(native.value,'qui');assert.equal(event.type,'change');assert(event.bubbles);
 syncFutureObjectChoices(document,{lateOperation:'compound',lateVariant:'connective-t'});assert(!native.hidden);assert(menu.hidden);assert.equal(body.querySelector('.classical-rule-control__label').textContent,'Mood');
});

test('public reload restores the parent layer before its conditional formation and matrix input',async()=>{
 const vm=await import('node:vm'),code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
 const late={id:'classical-rule-logic-late-operation',tagName:'SELECT',value:'none',options:[{value:'none'},{value:'compound'}]},variant={id:'classical-rule-logic-late-variant',tagName:'SELECT',value:'',options:[{value:''},{value:'future-embed',disabled:true}]},matrix={id:'classical-rule-logic-compound-matrix',tagName:'INPUT',value:''},operation={id:'classical-capability-navigator-operation',value:'',options:[{value:'vnc:derivational-operation'}]};
 let projected;const controls=[late,variant,matrix],ctx=vm.createContext({targetObject:{document:{getElementById:id=>[...controls,operation].find(x=>x.id===id)}},getClassicalCapabilityBindingControlsForChoice:key=>({lateOperation:[late],lateVariant:[variant],compoundMatrixStem:[matrix]})[key]||[],getClassicalSourceObjectControls:()=>[],getClassicalVncBasalReloadControls:()=>controls,updateClassicalCapabilityNavigatorSelection(){},syncClassicalLateVariantControlForOperation:value=>variant.options[1].disabled=value!=='compound',ActiveClassicalGrammarResultBinding:{bindingIds:['selected']},enterClassicalGrammarResultBindingChoice:()=>true,restoreClassicalVncPendingResultContinuation:()=>false,restoreClassicalVncReloadSourceEditorState(){},getClassicalRuleLogicSurfaceState:()=>({lateOperation:late.value,lateVariant:variant.value,compoundMatrixStem:matrix.value}),syncClassicalLessons27282933Closure:frame=>projected=frame,syncClassicalCapabilityApplyOperationState(){}});
 for(const name of ['getClassicalVncReloadChoiceControls','restoreClassicalVncReloadChoices']){const start=code.indexOf('    function '+name+'('),end=code.indexOf('\n    function ',start+1);vm.runInContext(code.slice(start,end),ctx);}
 assert(ctx.getClassicalVncReloadChoiceControls().includes(matrix));
 ctx.restoreClassicalVncReloadChoices({operationId:'vnc:derivational-operation',controls:[{id:late.id,value:'compound'},{id:variant.id,value:'future-embed'},{id:matrix.id,value:'nequi'}]});assert.equal(variant.value,'future-embed');assert.equal(matrix.value,'nequi');assert.equal(projected.state.lateVariant,'future-embed');assert.equal(projected.state.compoundMatrixStem,'nequi');
});

test('captured first-person future cannot acquire a different subject through incorporation or a forged reload recipe',async()=>{
 const a=future(r,f.stems[1]);
 for(const subject of ['2sg','3pl']){const b=bind(r,a,{subject,tense:'present'});assert.notEqual(b.bindingStatus,'ready');assert.equal(b.blockReason,'future-embed-subject-coreference-required');}
 const c=make(r,bind(r,a,{tense:'present'})),recipe=exportClassicalResultReloadRecipe(r,{result:c}),copy=JSON.parse(JSON.stringify(recipe));copy.nodes[0].recipe.steps.at(-1).request.subject='2sg';
 assert.equal(replayClassicalResultReloadRecipe(await runtime(),copy),null);
});

test('matching passive Result subject remains valid although its original active sourceSubject differs',()=>{
 const stem=f.stems[1],a=future(r,stem,{sourceValence:'specific-projective',sourceSubject:'1sg',sourceObjectRequests:[{kind:'specific-projective',person:'2sg'}],objectKind:'specific-projective',objectPerson:'2sg',subject:'2sg',requestedVoice:'passive',nonactiveOptionId:`ō:${stem.slice(0,-2)}x-ō`});
 assert.equal(a.normalizedRequest.sourceSubject,'1sg');assert.equal(a.normalizedRequest.subject,'2sg');
 const c=make(r,bind(r,a,{subject:'2sg',tense:'present'}));assert.equal(c.baseApplicationFrame,a);assert.equal(c.operationFrame.operationFacts.principalAndSupplementSubjectsCoreferential,true);assert.equal(c.operationFrame.operationFacts.futureEmbedTense,'future');
});
