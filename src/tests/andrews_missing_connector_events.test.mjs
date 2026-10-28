import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import * as adapter from '../ui/composition/issued_binding_operation_transaction.mjs';
import {createVncBindingIntentCoordinator} from '../application/classical/vnc_binding_intent.mjs';
import {createFiniteConnectorCoordinator} from '../application/classical/finite_connector_choice_coordination.mjs';
import {buildProspectiveVncTenseFrame} from '../application/classical/vnc_tense_choice_coordination.mjs';
import {createConstructionSession} from '../ui/composition/construction_session.mjs';
const {runtimeObject:r}=await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}});
const text=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
const extract=name=>{const start=text.indexOf(`    function ${name}(`);assert.ok(start>=0,name);return text.slice(start,text.indexOf('\n    function ',start+20));};
// Unused saved seed178564287 sibling, selected before grammar outcomes.
const stem='tlēlohuotlāyāoā',verbClass='C';
const preview=r.evaluateClassicalNahuatlVncApplication({sourceStem:stem,verbClass,sourceValence:'intransitive',subject:'3sg',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active'});
assert.equal(preview.authorizationStatus,'authorized');
const source=preview.resultFrame.sourceMachineryFrame,nav=r.getClassicalGrammarApplicationCapabilityNavigator(source);
const base={subject:'1sg',mood:'indicative',tense:'future',requestedDerivation:'direct',requestedVoice:'active'};
const bind=selections=>r.issueClassicalGrammarTypedSourceOperationBindingFrame(nav,'vnc:application',selections);
const options=binding=>(binding.choiceOptionProjection.finiteSingularConnector||[]).filter(x=>x.availabilityStatus==='available').map(x=>x.optionId);

class Element{
 constructor(tag='div',value=''){this.tagName=tag.toUpperCase();this.children=[];this.dataset={};this.listeners={};this.value=value;this.disabled=false;this.readOnly=false;}
 append(...nodes){this.children.push(...nodes);}appendChild(n){this.children.push(n);return n;}
 replaceChildren(...nodes){this.children=[...nodes];}setAttribute(){}hasAttribute(){return false;}
 addEventListener(type,fn){this.listeners[type]=fn;}
 closest(selector){return selector==='#classical-rule-logic-controls'?{}:null;}
 get options(){return this.children.flatMap(n=>n.tagName==='OPTGROUP'?n.children:[n]);}
}
function fixture(initial=bind(base)){
 const nodes={'classical-capability-operation-choices':new Element(),'classical-capability-operation-plan-status':new Element(),
  'classical-capability-operation-plan':new Element(),'classical-rule-logic-finite-singular-connector':new Element('select','silent'),
  'classical-rule-logic-subject':new Element('select','1sg'),'classical-rule-logic-mood':new Element('select','indicative'),
  'classical-rule-logic-tense':new Element('select','future')};
 for(const [id,node] of Object.entries(nodes))node.id=id;
 const doc={getElementById:id=>nodes[id]||null,createElement:tag=>new Element(tag),querySelector:selector=>{
  const id=selector.match(/data-classical-capability-choice-id=["']([^"']+)/)?.[1];return id?field(id):null;
 },querySelectorAll:()=>[]};
 let executions=0;
 const previous=r.executeClassicalGrammarTypedSourceOperationBindingFrame(bind({...base,subject:'3sg',mood:'indicative',tense:'present'}));
 assert.equal(previous.authorizationStatus,'authorized');const accepted=previous.canonicalResult;
 const session=createConstructionSession({isSource:v=>v===source,isResult:v=>r.isClassicalNahuatlVncApplicationFrame(v),
  execute:packet=>{executions++;return r.executeClassicalGrammarTypedSourceOperationBindingFrame(packet.binding);},present:()=>true});
 session.restore(accepted);
 const scope=adapter.createIssuedBindingOperationScope({owner:r,source,operationId:'vnc:application',ingressKind:'typed',navigator:nav,session,getIngress:()=>nav,reissue:bind});let snapshot=adapter.issueIssuedBindingOperationSnapshot(scope,initial,nav);session.stage({source,route:{operation:'vnc:application'},operationContract:snapshot});
 const ctx={buildProspectiveVncTenseFrame,ClassicalVncBindingIntent:createVncBindingIntentCoordinator(r),ClassicalFiniteConnectorChoices:createFiniteConnectorCoordinator(r),ClassicalVncSentenceControlKeys:{},projectClassicalVncIntentControls(){},syncClassicalObjectMeaningChoice(){},getClassicalSpecializedTypedVncControlProjection:()=>null,getActiveClassicalRuleLogicSurfaceFrame:()=>null,getClassicalRuleLogicSurfaceState:()=>({}),getClassicalRuleLogicVncSubjectFrame:()=>({animacy:'animate',humanness:'human'}),getClassicalTypedVncControlProjection:()=>null,captureClassicalIssuedBindingEvent:binding=>binding===snapshot.contract.binding?{snapshot,event:adapter.captureIssuedBindingChoiceFrame(snapshot)}:null,retainClassicalIssuedBindingCandidate(context,binding){const next=adapter.adoptIssuedBindingOperationCandidate(context.snapshot,binding,context.event);if(!next)return false;snapshot=next;return true;},targetObject:{...r,document:doc,getActiveDerivationType:()=> 'direct'},ActiveClassicalGrammarTypedSourceOperationBinding:initial,
  ActiveClassicalGrammarResultBinding:null,ActiveClassicalGrammarCapabilityNavigator:nav,
  ClassicalTypedSourceBindingSelectionSignatures:new WeakMap(),HandledClassicalContinuationChoiceEvents:new WeakSet(),
  getActiveClassicalGrammarTypedSourceOperationBinding:()=>ctx.ActiveClassicalGrammarTypedSourceOperationBinding,
  getClassicalOrdinaryNncNextChoiceProjection:b=>b.choiceOptionProjection,
  getClassicalTypedSourceSelectionSignature:JSON.stringify,formatClassicalCapabilityChoiceLabel:x=>x,formatClassicalCapabilityOperationLabel:x=>x,formatClassicalClauseRelationValue:x=>x,
  syncClassicalVncChoiceEditSubject(){},clearOwnerChoicePortals(){},restoreClassicalTypedCompoundClassOptionPresentation(){},restoreClassicalNumericTargetPresentation(){},syncClassicalNumericTargetPresentation(){},
  syncClassicalPendingInherentSubjectPresentation(){},clearClassicalImperfectiveObjectOwnerOptions(){},syncClassicalCausativeSourceConstituentChoices(){},
  clearClassicalGrammarTypedSourceOperationBinding:()=>assert.fail('current owner binding lost'),
  getClassicalVncContinuationDraftMoodSelections:()=>({mood:nodes['classical-rule-logic-mood'].value,tense:nodes['classical-rule-logic-tense'].value,
   introductoryParticle:'none',introductoryModifier:'none',prefaceParticle:'none',prefixStackMode:'none',sentenceSurfaceMode:'statement',polarityMode:'positive'}),
  getClassicalOptativeSentenceUseChoices:()=>['auto'],parseClassicalRuleLogicSurfaceObjectSelection:()=>({objectKind:'none'}),
  getClassicalRuleLogicSurfaceSentenceOptions:()=>({sentenceType:'affirmative-assertion'}),normalizeClassicalRuleLogicSurfaceDirectionalPrefix:x=>x,
  getClassicalCurrentGrammarControlSurfaceFrame:()=>null,syncClassicalRuleLogicMoodBoundControlOptions(){},syncClassicalRuleLogicLesson11TenseOptions(){},
  syncClassicalCapabilityApplyOperationState(){const b=ctx.ActiveClassicalGrammarTypedSourceOperationBinding;
   session.stage({source,operationContract:snapshot,route:{operation:'vnc:application'},slots:[{role:'source',exact:source}],choices:{...b.callerSelections},legalMoves:[],ready:b.bindingStatus==='ready',execution:{binding:b,signature:JSON.stringify(b.callerSelections)}});},
  stageClassicalGrammarTypedSourceOperationBinding(operation,selections){ctx.ActiveClassicalGrammarTypedSourceOperationBinding=bind(selections);ctx.syncClassicalGrammarTypedSourceOperationChoices(ctx.ActiveClassicalGrammarTypedSourceOperationBinding);return ctx.ActiveClassicalGrammarTypedSourceOperationBinding;}
 };
 vm.createContext(ctx);
 const mapStart=text.indexOf('    const CLASSICAL_CAPABILITY_BINDING_CONTROL_IDS = Object.freeze({'),mapEnd=text.indexOf('\n    });',mapStart)+8;
 vm.runInContext(text.slice(mapStart,mapEnd),ctx);
 for(const name of ['getClassicalCapabilityBindingControl','getClassicalCapabilityBindingControlsForChoice','getClassicalVncContinuationBindingSelections','syncClassicalGrammarTypedSourceOperationChoices'])vm.runInContext(extract(name),ctx);
 const handlerStart=text.indexOf('      const typedDerivationButtonChoice = typedSourceBinding?.operationId === "vnc:application"');
 const handlerEnd=text.indexOf('\n      if (stageClassicalOrdinaryGrammarControlChange(control))',handlerStart);
 vm.runInContext('function editNative(control,event={}) {const typedSourceBinding=getActiveClassicalGrammarTypedSourceOperationBinding();'+text.slice(handlerStart,handlerEnd)+'return false;}',ctx);
 ctx.syncClassicalGrammarTypedSourceOperationChoices(initial);
 function field(id){return nodes['classical-capability-operation-choices'].children.find(n=>n.dataset.classicalCapabilityRequiredChoiceId===id)?.children.find(n=>n.tagName==='SELECT');}
 return{ctx,nodes,field,session,accepted,get active(){return ctx.ActiveClassicalGrammarTypedSourceOperationBinding;},get executions(){return executions;},
  select(value){const c=field('finiteSingularConnector');assert.ok(c,'current owner exposes plural ending');c.value=value;c.listeners.change();},
  edit(id,value){const c=nodes[id];c.value=value;assert.equal(ctx.editNative(c,{}),true,'actual typed native edit handles this coordinate');},
  collect:()=>ctx.getClassicalVncContinuationBindingSelections(ctx.ActiveClassicalGrammarTypedSourceOperationBinding)};
}


test('generated finite connector editor stages actual events and retires dependent choice before Make',()=>{
 const ui=fixture();assert.equal(ui.field('finiteSingularConnector').value,'silent');
 ui.select('qui');assert.equal(ui.active.bindingStatus,'ready',ui.active.blockReason);
 assert.equal(ui.collect().finiteSingularConnector,'qui');assert.equal(ui.executions,0);assert.ok(ui.session.position.accepted.result===ui.accepted);
 assert.equal(ui.session.make(),true,ui.session.position.failure?.blockReason);
 const accepted=ui.session.position.accepted.result;assert.equal(accepted.resultFrame.finalTypedVncSlotFrame.slots.number.num1,'qui');
 ui.edit('classical-rule-logic-tense','present');assert.equal(ui.active.bindingStatus,'ready',ui.active.blockReason);
 assert.equal(ui.active.callerSelections.finiteSingularConnector,undefined);assert.equal(ui.field('finiteSingularConnector'),undefined);
 assert.ok(ui.session.position.accepted.result===accepted);assert.equal(ui.executions,1);
 ui.edit('classical-rule-logic-tense','future');assert.equal(ui.field('finiteSingularConnector').value,'qui','existing coordinator restores the explicit licensed connector');
 ui.select('qui');ui.edit('classical-rule-logic-subject','1pl');
 assert.equal(ui.active.bindingStatus,'ready',ui.active.blockReason);assert.equal(ui.field('finiteSingularConnector'),undefined);
 assert.ok(ui.session.position.accepted.result===accepted);assert.equal(ui.executions,1);
});

test('saved continuation choices retain the connector as input and reject caller authority',()=>{
 const ctx={};vm.createContext(ctx);vm.runInContext(extract('validateClassicalVncReloadApplicationSelections'),ctx);
 for(const finiteSingularConnector of ['silent','qui']){
  const selected={...base,finiteSingularConnector,sentenceOptions:{irregularStemChoice:"",sentenceType:"affirmative-assertion",punctuationMode:"statement",negative:false,outsidePrefixes:[]}};
  assert.equal(ctx.validateClassicalVncReloadApplicationSelections(selected)?.finiteSingularConnector,finiteSingularConnector);
  assert.equal(ctx.validateClassicalVncReloadApplicationSelections({...base,sentenceOptions:{finiteSingularConnector}})?.sentenceOptions.finiteSingularConnector,finiteSingularConnector);
 }
 assert.equal(ctx.validateClassicalVncReloadApplicationSelections({...base,finiteSingularConnector:'qui',finalTypedVncSlotFrame:{}}),null);
});
