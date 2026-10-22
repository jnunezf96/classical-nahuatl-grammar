import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import {createConstructionSession} from '../ui/composition/construction_session.mjs';
import * as packets from '../ui/composition/construction_packet.mjs';
import {Element} from './helpers/organization_dom.mjs';
import {createCompositionPresentation} from '../ui/composition/composition_presentation.mjs';
import {createClassicalGrammarWorkspaceHistory} from '../application/classical/grammar_workspace_history.mjs';
import * as choiceDesign from '../ui/composition/choice_design.mjs';
import {focusNativeChoice} from '../ui/composition/flow_design.mjs';
import {createPathPresentation,setPathHistoryPresentation,resolvePathTargets} from '../ui/composition/path_presentation.mjs';
import {createResultInformation} from '../ui/composition/result_information.mjs';
const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
const fixture=JSON.parse(readFileSync(new URL('./fixtures/nonce_writing_source_fixture.json',import.meta.url),'utf8'));
const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
const compound=r.executeClassicalGrammarApplicationRequest({operationId:'grammar:nominal-construction',args:[fixture.request]});assert.equal(compound.authorizationStatus,'authorized');
function harness({documentCapture=false,initialApplication=compound,composition=false,navigatorLifecycle=false,dependencyLifecycle=false,basalLifecycle=false,cardLifecycle=false,historyLifecycle=false,relevanceLifecycle=false}={}){
 const compound=initialApplication;
 const page=new Element('main');page.id='classical-workbench';
 let doc,dispatchNode;
 const element=tag=>{const node=new Element(tag);node.style={};node.ownerDocument=doc;
  node.removeAttribute=function(key){delete this.attributes[key];if(key.startsWith('data-'))delete this.dataset[key.slice(5).replace(/-([a-z])/g,(_,c)=>c.toUpperCase())];};
  node.classList.remove=(...names)=>{node.className=node.className.split(/\s+/).filter(c=>!names.includes(c)).join(' ');};
  node.classList.toggle=(name,on)=>{const present=node.classList.contains(name);if(on??!present)node.classList.add(name);else node.classList.remove(name);};
  node.focus=()=>{doc.activeElement=node;};node.scrollIntoView=()=>{};node.cloneNode=deep=>{const copy=element(tag);copy.id=node.id;copy.className=node.className;copy.value=node.value;copy.textContent=node.textContent;copy.disabled=node.disabled;copy.hidden=node.hidden;Object.assign(copy.dataset,node.dataset);Object.assign(copy.attributes,node.attributes);if(deep)for(const child of node.children)copy.append(child.cloneNode(true));return copy;};
  Object.defineProperty(node,'innerHTML',{set(value){if(!value.startsWith('<label class="path-build-label"'))throw Error('unexpected fixture markup');this.replaceChildren();const label=element('label');label.className='path-build-label';label.append(element('select'));this.append(label);for(const [tag,cls]of [['div','path-targets'],['p','path-target-caption'],['p','path-target-note']]){const n=element(tag);n.className=cls;this.append(n);}}});node.getBoundingClientRect=()=>({height:30,top:0,bottom:30});node.dispatchEvent=event=>dispatchNode(node,event.type);return node;};
 const add=(tag,id,parent=page)=>{const node=element(tag);node.id=id;parent.append(node);return node;};
 const basal=add('div','classical-basal-unit-controls');basal.dataset.classicalBasalUnit='vnc';const basalButtons=['vnc','nnc'].map(unit=>{const b=add('button','basal-'+unit,basal);b.dataset.classicalBasalUnit=unit;return b;});
 const entry=add('button','classical-writing-source-entry'),section=add('section','classical-transcription-source');section.hidden=true;
 const kind=add('select','classical-writing-source-kind',section);kind.value='sounds';
 for(const value of ['sounds','particle-group','compound']){const option=new Element('option');option.value=value;kind.append(option);}
 const sourceEditor=add('details','source-editor');sourceEditor.dataset.compositionSourceEditor='true';sourceEditor.open=false;sourceEditor.append(section);
 const rawField=add('label','classical-writing-sounds-field',section),input=add('input','classical-transcription-source-input',rawField);input.dataset.classicalWritingSoundInput='true';input.className='classical-source-parts__input';
 const parts=add('div','classical-writing-compound-parts',section),apply=add('button','classical-transcription-source-apply',section);add('p','classical-transcription-source-status',section);
 const verb=add('section','verb-block'),sourceParts=add('div','classical-source-parts',verb);sourceParts.dataset.classicalSourceCommitState='committed';const keyboard=add('details','classical-transcription-keyboard',sourceParts);
 const authority=dependencyLifecycle?add('section','classical-authority-panel'):page,workspace=dependencyLifecycle?add('div','grammar-workspace',authority):page;if(dependencyLifecycle)workspace.className='calc-operators formula-controls-grid';
 const build=add('section',composition?'classical-rule-logic-controls':'build',workspace);build.dataset.classicalWorkbenchStage='grammar';
 const legacy=add('label','legacy-grammar',build),mood=add('select','legacy-mood',legacy);mood.dataset.classicalRuleLogicControl='mood';
 const navigatorRoot=add('section','classical-capability-navigator',build);add('h3','classical-capability-navigator-heading',navigatorRoot);if(navigatorLifecycle)add('div','classical-capability-navigator-pathways',navigatorRoot);
 const nav=add('select','classical-capability-navigator-operation',navigatorRoot),plan=add('div','classical-capability-operation-plan',build),choices=add('div','classical-capability-operation-choices',plan);add('p','classical-capability-operation-plan-status',plan);
 const make=add('button','classical-capability-apply-operation',plan),optional=add('div','classical-transcription-optional-controls',sourceParts);
 const selectField=add('label','classical-transcription-optional-result-field',optional),select=add('select','classical-transcription-optional-result',selectField);
 const elisionField=add('label','classical-transcription-elision-field',optional),elision=add('input','classical-transcription-elision',elisionField);elision.type='checkbox';
 const nominal=add('details','nominal-organizer',build);nominal.dataset.classicalNncGrammarOrganizer='true';nominal.className='classical-nnc-grammar-organizer';const polarity=add('select','classical-rule-logic-polarity',nominal);for(const value of ['positive','negative']){const option=element('option');option.value=value;polarity.append(option);}polarity.value='positive';
 const particleMenu=add('details','classical-particle-menu',build),particleSlot=add('select','classical-particle-slot-0',particleMenu);for(const value of ['','particle:l3-ca']){const option=element('option');option.value=value;particleSlot.append(option);}particleSlot.value='';
 const result=add('div','classical-rule-logic-surface');
 if(dependencyLifecycle){sourceParts.dataset.classicalSourceCommitState='pending';const status=add('p','classical-source-commit-status',sourceParts);const badge=add('span','source-badge',status),message=add('span','source-message',status);badge.dataset.classicalSourceCommitBadge='true';message.dataset.classicalSourceCommitMessage='true';add('input','verb');}
 let history=null;
 if(historyLifecycle){const root=add('section','classical-grammar-workspace-history'),body=add('div','history-body',root);body.className='classical-grammar-workspace-history__body';for(const id of ['node','compare-node']){const label=add('label','history-'+id+'-label',body);add('select','classical-grammar-workspace-history-'+id,label);}const actions=add('div','history-actions',body);actions.className='classical-grammar-workspace-history__actions';for(const id of ['undo','fork','continue','supply','compare'])add('button','classical-grammar-workspace-history-'+id,actions);add('p','classical-grammar-workspace-history-status',root);}
 const documentListeners={},queue=[];
 doc={addEventListener:(type,listener)=>(documentListeners[type]||=[]).push(listener),getElementById:id=>page.id===id?page:page.querySelector('#'+id),querySelector:s=>page.querySelector(s),querySelectorAll:s=>page.querySelectorAll(s),createElement:element,activeElement:null};
 for(const node of [page,...page.querySelectorAll('*')])node.ownerDocument=doc;
 doc.defaultView={innerWidth:1200,innerHeight:900,getComputedStyle:node=>({display:node.hidden?'none':'block',visibility:'visible'}),ResizeObserver:class{observe(){}},requestAnimationFrame(){},addEventListener(){},Event:class{constructor(type,options){this.type=type;Object.assign(this,options);}}};
 const target=Object.create(r);Object.defineProperty(target,'document',{value:doc});Object.defineProperty(target,'Event',{value:doc.defaultView.Event});Object.defineProperty(target,'getClassicalSourcePartControlState',{value:()=>({})});Object.defineProperty(target,'queueMicrotask',{value:callback=>queue.push(callback)});
 for(const name of ['beginClassicalGrammarWorkspaceUserAction','completeClassicalGrammarWorkspaceUserAction','cancelClassicalGrammarWorkspaceUserAction','setLeftPanelStackMode'])Object.defineProperty(target,name,{value:()=>null});
 Object.defineProperty(target,'getActiveClassicalGrammarTypedSourceOperationBinding',{value:()=>ctx?.getActiveClassicalGrammarTypedSourceOperationBinding()});
 if(dependencyLifecycle)Object.defineProperty(target,'syncClassicalSourceCommitPresentation',{value:()=>ctx.syncClassicalSourceCommitPresentation()});
 Object.defineProperty(target,'issueClassicalTranscriptionSourceFrame',{value:rows=>r.issueClassicalTranscriptionSourceFrame(Array.from(rows,row=>({segments:Array.from(row.segments)})))});
 Object.defineProperty(target,'issueClassicalNahuatlWritingSourceFromParticleGroup',{value:rows=>r.issueClassicalNahuatlWritingSourceFromParticleGroup(Array.from(rows))});
 Object.defineProperty(target,'issueClassicalNahuatlWritingSourceFromApplication',{value:(app,rows)=>r.issueClassicalNahuatlWritingSourceFromApplication(app,Array.from(rows,row=>({role:row.role,segments:Array.from(row.segments)})))});
 Object.defineProperty(target,'issueClassicalGrammarTypedSourceOperationBindingFrame',{value:(nav,op,selection)=>r.issueClassicalGrammarTypedSourceOperationBindingFrame(nav,op,{...selection})});
 let executions=0;const sources=new WeakSet();let ctx;
 const session=createConstructionSession({isSource:v=>sources.has(v),isResult:v=>v===compound?.canonicalResult||r.isClassicalNahuatlTranscriptionFrame(v),
  execute:packet=>{executions++;return packets.executeConstructionPacket(r,packet);},present:app=>ctx.renderClassicalTranscriptionSurfaceBlock(app)});
 const receipt=Object.freeze({application:compound});if(compound)session.restore(compound.canonicalResult,receipt);
 const project=exact=>{const capture=r.captureClassicalGrammarApplicationResult(exact,'writing-lifecycle');return exact&&capture?.canonicalResult===exact?{canonicalResult:exact,applicationResult:capture.applicationResult,surface:exact.surface||exact.wordSurface}:null;};
 ctx=vm.createContext({targetObject:target,ClassicalConstructionSession:session,ClassicalPositionSources:sources,
  ActiveClassicalTypedSourceCapabilitySelection:null,ActiveClassicalSentenceConjunctorSource:null,ActiveClassicalSentenceRelationalEntry:null,
  ClassicalGrammarDependencyPresentationRoots:new WeakSet(),normalizeClassicalNahuatlMachinerySourceValue:value=>String(value||'').trim(),getSourceClassRequirement:()=>null,
  ClassicalWritingSourceMode:false,ActiveClassicalWritingSource:null,ClassicalWritingContextApplication:null,ClassicalWritingHiddenPresentation:new Map(),ClassicalTranscriptionOptionalControlRoots:new WeakSet(),
  ActiveClassicalGrammarCapabilityNavigator:null,ActiveClassicalGrammarTypedSourceOperationBinding:null,ActiveClassicalGrammarResultSourceCapture:null,ActiveClassicalGrammarResultBinding:null,
  PendingClassicalOrdinaryGrammarBinding:null,PendingClassicalOrdinarySentenceOptions:null,PendingClassicalRawConstructionRequest:null,
  ClassicalChoicePreflightTransaction:null,PendingClassicalResultEdit:null,ClassicalPositionExecuting:false,ClassicalPositionStaging:false,ClassicalPositionRestoring:false,
  ClassicalPositionIdentities:new WeakMap(),ClassicalPositionIdentitySequence:0,ClassicalTypedSourceBindingSelectionSignatures:new WeakMap(),
  CLASSICAL_RESULT_HEADING_ID:'result-heading',ActiveClassicalRuleLogicSurfaceFrame:null,ActiveClassicalCapabilityApplicationResult:null,
  getClassicalSgrOwnerIssuedProjection:frame=>project(frame),ClassicalResultContinuationIdentities:new WeakMap(),isClassicalAcceptedApplicationContinuationIdentity:(exact,application)=>application?.canonicalResult===exact,getClassicalOwnerIssuedResultProjection:project,getClassicalVisibleAcceptedResult:()=>project(session.position.accepted.result),
  getActiveClassicalCapabilityApplicationResult:()=>null,getActiveClassicalGrammarResultBinding:()=>null,getClassicalResultEditProposal:()=>null,
  getClassicalMissingSourceSlots:()=>[],getWritingSourcePresentation:choiceDesign.getWritingSourcePresentation,focusNativeChoice,getNativeGrammarControls:relevanceLifecycle?choiceDesign.getNativeGrammarControls:()=>[select,elision],getClassicalPositionChoiceId:n=>n.dataset.classicalCapabilityChoiceId||n.id,
  getClassicalBasalUnitFromRuntime:()=>basal.dataset.classicalBasalUnit,getClassicalNominalConstructionControlValue:()=> 'none',getClassicalPositionChoiceControls:()=>[],syncClassicalPositionFixedChoices(){},bindClassicalPositionMoves(){},clearClassicalPreparedAttitudeResult(){},
  restoreClassicalTypedCompoundClassOptionPresentation(){},restoreClassicalNumericTargetPresentation(){},
  bindClassicalGrammarResultSourceInvalidation(){},syncClassicalContinuationTarget(){},syncClassicalGrammarResultBindingChoices(){},syncClassicalCapabilityClosureStatus(){},disableClassicalNncChoicesUntilOperationSelected(){},getActiveClassicalRuleLogicSurfaceFrame:()=>null,
  getClassicalCapabilityRouteDestination:()=> 'grammar',formatClassicalCapabilityOperationLabel:id=>id,getClassicalNominalContinuationMenuPresentation:()=>null,
  clearClassicalGrammarTypedSourceOperationBinding(){ctx.ActiveClassicalGrammarTypedSourceOperationBinding=null;},
  syncClassicalSourceFiniteStage:()=>false,syncClassicalGrammarWorkspaceHistory(){},notifyExplicitMakeResult(){},
  exposeClassicalRuleLogicSurfaceFrameToBrowser(){},applyClassicalResultRootSemantics(){},markClassicalResultPrimaryAnswer(){},syncClassicalSourceGrammarResultSurface(){},createGrammarInspectorChip:()=>new Element('span'),
  formatClassicalClauseRelationValue:v=>v,freezeConstructionData:packets.freezeConstructionData,getConstructionLayerReadiness:packets.getConstructionLayerReadiness,
  matchesConstructionWitness:packets.matchesConstructionWitness,getConstructionPacketOrigin:packets.getConstructionPacketOrigin,
  syncClassicalCapabilityNavigator(){const n=r.getClassicalGrammarApplicationCapabilityNavigator(ctx.ActiveClassicalWritingSource);ctx.ActiveClassicalGrammarCapabilityNavigator=n;nav.replaceChildren(...(n?.operations||[]).map(item=>{const option=new Element('option');option.value=item.operationId;option.dataset.classicalCapabilityStatus=item.availabilityStatus;return option;}));},
 });
 if(navigatorLifecycle){const start=code.indexOf('    const CLASSICAL_CAPABILITY_PATHWAY_GROUPS ='),end=code.indexOf('    function getClassicalCapabilityPathwayGroup(',start);vm.runInContext(code.slice(start,end),ctx);ctx.CLASSICAL_CAPABILITY_ANALYSIS_ONLY_OPERATION_IDS=new Set();ctx.CLASSICAL_CAPABILITY_NAVIGATOR_FRAME_ID='classical-capability-navigator-frame';}
 const names=['isClassicalWritingSourceCommitted','getClassicalGrammarDependencyPresentationState','ensureClassicalGrammarDependencyGuidance','syncClassicalGrammarDependencyPresentation',...(navigatorLifecycle?['getClassicalCapabilityPathwayGroup','projectClassicalCapabilityNavigatorFrame','isClassicalGrammarExactTypedSource','getClassicalGrammarExactTypedSourceIdentitySignature','getClassicalCapabilityNavigatorFrame','rememberClassicalTypedSourceCapabilitySelection','syncClassicalCapabilityNavigator','updateClassicalCapabilityNavigatorSelection','clearClassicalGrammarTypedSourceOperationBinding','clearClassicalImperfectiveObjectOwnerOptions']:[]),...(cardLifecycle?['refreshClassicalAcceptedResultContinuationCards','createClassicalResultContinuationCard']:[]),'getClassicalTranscriptionOwnerSegmentTokens','parseClassicalTranscriptionSourceInput','getClassicalWritingCompoundInputParts','setClassicalWritingSourcePending','syncClassicalWritingSourceFields','syncClassicalWritingPresentation','setClassicalWritingSourceMode','installClassicalWritingSourceEntry','commitClassicalWritingSource','applyClassicalTranscriptionSource',
 'getActiveClassicalGrammarTypedSourceOperationBinding','getClassicalGrammarTypedSourceNncSelections','getClassicalTypedSourceSelectionSignature','stageClassicalGrammarTypedSourceOperationBinding','syncClassicalGrammarTypedSourceOperationChoices','syncClassicalLesson2OptionalResultControls','renderSelectedClassicalLesson2OptionalResult',
 ...(documentCapture?['bindClassicalPositionMoves','reconcileClassicalNewNativeChoiceOffer','getClassicalChoiceDispatchReadiness','dispatchClassicalConstructionChoice']:[]),'syncClassicalPronominalDependentClauseRecovery','getClassicalPositionIdentity','captureClassicalPositionLayers','captureClassicalConstructionPacket','readClassicalConstructionProposal','updateClassicalNativeApplyOperationState','syncClassicalCapabilityApplyOperationState','syncClassicalConstructionPositionApplyState','bindClassicalResultMakeButton','applyClassicalConstructionPosition','updateClassicalTranscriptionSourceStatus','setClassicalTranscriptionGrammarMode','renderClassicalTranscriptionSurfaceBlock'];
 for(const name of names){const start=code.indexOf(`    function ${name}(`),end=code.indexOf('\n    function ',start+1);assert(start>=0,name);vm.runInContext(code.slice(start,end),ctx);}
 const fire=(node,type)=>{if(type==='click'&&node.disabled)return;let stopped=false;const event={target:node,type,preventDefault(){},stopImmediatePropagation(){stopped=true;}};for(const listener of documentListeners[type]||[])listener(event);if(!stopped)for(let current=node;current;current=current.parentElement)for(const listener of [...(current.listeners[type]||[])])listener(event);while(queue.length)queue.shift()();};
 dispatchNode=fire;
 doc.defaultView.dispatchClassicalConstructionChoice=(control,value)=>ctx.dispatchClassicalConstructionChoice(control,value);
 let refreshComposition=null;
 if(composition){
  const shell=readFileSync(new URL('../ui/shell/classical_shell.mjs',import.meta.url),'utf8'),start=shell.indexOf('    function syncClassicalSourceNestingStructure('),end=shell.indexOf('    function installClassicalSourcePathSync(',start);
  vm.runInContext(shell.slice(start,end),ctx);if(dependencyLifecycle){const begin=shell.indexOf('    function syncClassicalSourceCommitPresentation('),finish=shell.indexOf('    function installClassicalSourceCommitPresentation(',begin);vm.runInContext(shell.slice(begin,finish),ctx);}refreshComposition=createCompositionPresentation(doc);
 }
 if(basalLifecycle){
  Object.defineProperty(target,'getClassicalBasalUnitFromRuntime',{value:()=>ctx.getClassicalBasalUnitFromRuntime()});
  const composer=readFileSync(new URL('../ui/composer/composer.mjs',import.meta.url),'utf8');ctx.CLASSICAL_BASAL_UNIT={vnc:'vnc',nnc:'nnc'};
  ctx.getClassicalBasalUnitDatasetTargets=()=>[basal];
  for(const name of ['syncClassicalVncSourceGuide','syncClassicalNncSourceGuide','syncClassicalConstructionSourceUnitAvailability','syncClassicalSourceReadout','syncClassicalRelationalNncUiControls','syncClassicalSourceObjectRows'])ctx[name]=()=>{};
  for(const name of ['normalizeClassicalBasalUnit','getClassicalBasalUnitFromRuntime','syncClassicalBasalUnitControls']){const begin=composer.indexOf(`    function ${name}(`),end=composer.indexOf('\n    function ',begin+1);vm.runInContext(composer.slice(begin,end),ctx);}
 }
 if(historyLifecycle){
  history=createClassicalGrammarWorkspaceHistory({captureClassicalGrammarApplicationResult:r.captureClassicalGrammarApplicationResult,isClassicalGrammarApplicationResultCapture:r.isClassicalGrammarApplicationResultCapture,isClassicalGrammarApplicationResult:r.isClassicalGrammarApplicationResult,getClassicalGrammarApplicationCapabilityNavigator:r.getClassicalGrammarApplicationCapabilityNavigator,isClassicalGrammarApplicationCapabilityNavigator:r.isClassicalGrammarApplicationCapabilityNavigator});
  for(const [name,fn]of Object.entries({recoverClassicalGrammarWorkspaceResult:id=>history.recover(id),getClassicalGrammarWorkspaceHistorySnapshot:()=>history.snapshot(),isClassicalGrammarWorkspaceHistorySnapshot:v=>history.isSnapshot(v),continueClassicalGrammarWorkspaceFrom:id=>history.continueFrom(id),undoClassicalGrammarWorkspaceHistory:()=>history.undo()}))Object.defineProperty(target,name,{value:fn});
  Object.assign(ctx,{ClassicalVncResultSourceCommitInProgress:false,ActiveClassicalVncResultSourceContinuation:null,ActiveClassicalVncResultSourceApplicationFrame:null,ActiveClassicalVncResultSourceProjection:null,ActiveClassicalCapabilityContinuedTypedSource:null,ActiveClassicalCapabilityCommittedTypedSource:null,ActiveClassicalCapabilityCommittedTypedSourceSignature:'',ClassicalVncResultSourceControlSnapshots:new Map(),classicalHistoryReloadNotice:'',ActiveClassicalClauseRelationResult:null,ClassicalPositionCleared:false,
   removeClassicalVncResultSourceDynamicOptions(){},retainClassicalPrimitiveNominalSourceForMatrix(){return false;},syncClassicalRelationalResultBindingChoiceVisibility(){},renderClassicalCapabilityApplicationResultForReview:app=>ctx.renderClassicalTranscriptionSurfaceBlock(app),setClassicalWholeCanvasActionStatus:message=>{doc.getElementById('classical-grammar-workspace-history-status').textContent=message;},stageClassicalCompositeOuterRelation(){},createClassicalWorkspaceProvenanceProjector:()=>()=>null,setPathHistoryPresentation,resolvePathTargets,syncClassicalRequiredResultChooser(){}});
  for(const name of ['getActiveClassicalCapabilityApplicationResult','getClassicalVisibleAcceptedResult','clearClassicalVncResultSourceContinuation','restoreClassicalLateVncCaptureSourceMirror','restoreClassicalOrdinaryNncCaptureSourceMirror','restoreClassicalNominalEmbedCaptureSourceMirror','activateClassicalGrammarWorkspaceCapture','getClassicalHistoryBuildPresentation','syncClassicalDomProvenance','restoreClassicalHistoryCapture','syncClassicalGrammarWorkspaceHistory']){const start=code.indexOf(`    function ${name}(`),end=code.indexOf('\n    function ',start+1);vm.runInContext(code.slice(start,end),ctx);}
 }
 {for(const name of ['getActiveClassicalGrammarTypedSourceOperationBinding','isClassicalGrammarTypedSourceOperationBindingFrame','isClassicalNahuatlTranscriptionSourceFrame','isClassicalGrammarApplicationCapabilityNavigator','isClassicalGrammarApplicationResultCapture','isClassicalNahuatlTranscriptionFrame'])doc.defaultView[name]=(...args)=>target[name](...args);}
 ctx.installClassicalWritingSourceEntry();
 return {ctx,page,doc,history,sourceEditor,nominal,polarity,particleMenu,particleSlot,basal,basalButtons,entry,section,kind,input,parts,apply,sourceParts,keyboard,make,select,elision,elisionField,result,session,receipt,fire,refreshComposition,get executions(){return executions;}};
}

test('real Writing entry, Source Apply, native Build and shared Make preserve whole owner custody and ordinary reversal',()=>{
 const h=harness();h.fire(h.entry,'click');assert.equal(h.section.hidden,false);assert.equal(h.sourceParts.dataset.classicalSourceCommitState,'pending');assert.equal(h.executions,0);
 h.kind.value='particle-group';h.fire(h.kind,'change');h.fire(h.apply,'click');
 assert.equal(h.executions,0);assert(h.session.position.accepted.result===compound.canonicalResult);assert(h.session.position.accepted.receipt===h.receipt);
 assert.equal(h.make.disabled,false);assert.equal(h.elisionField.hidden,false);assert.equal(h.select.value,'ordinary');
 assert.equal(h.result.children.length,0,'Source Apply has displayed no Result');
 const source=h.ctx.ActiveClassicalWritingSource;h.fire(h.make,'click');assert.equal(h.executions,1);const ordinary=h.session.position.accepted.result;assert.equal(ordinary.surface,'zā oc');
 assert.equal(h.make.disabled,true);assert(h.result.querySelector('[data-classical-transcription-surface]').textContent==='zā oc');
 h.elision.checked=true;h.fire(h.elision,'change');assert(h.session.position.accepted.result===ordinary);assert.equal(h.executions,1);assert.equal(h.make.disabled,false);assert(h.ctx.ActiveClassicalWritingSource===source);
 h.fire(h.make,'click');assert.equal(h.executions,2);const elided=h.session.position.accepted.result;assert.equal(elided.surface,'zāc');assert(elided.sourceFrame===source);assert.equal(elided.dependencyResults.length,1);
 h.elision.checked=false;h.fire(h.elision,'change');assert(h.session.position.accepted.result===elided);assert.equal(h.executions,2);h.fire(h.make,'click');assert.equal(h.executions,3);assert.equal(h.session.position.accepted.result.surface,'zā oc');
 h.kind.value='sounds';h.fire(h.kind,'change');assert.equal(h.make.disabled,true);assert.equal(h.executions,3);const accepted=h.session.position.accepted.result;
 h.input.value=fixture.morphParts.flatMap(p=>p.segments).join('');h.fire(h.input,'input');assert(h.session.position.accepted.result===accepted);assert.equal(h.executions,3);
});

test('actual accepted compound Source fields retain every morph, stage optional writing, and preserve pending Source custody',()=>{
 const h=harness();h.fire(h.entry,'click');h.kind.value='compound';h.fire(h.kind,'change');
 const fields=h.parts.querySelectorAll('[data-classical-writing-morph-role]');assert.equal(fields.length,fixture.morphParts.length);
 for(const part of fixture.morphParts){const field=fields.find(n=>n.dataset.classicalWritingMorphRole===part.role);assert(field,part.role);field.value=part.segments.join('');}
 h.fire(h.apply,'click');assert.equal(h.executions,0);assert(h.session.position.accepted.result===compound.canonicalResult);assert.equal(h.make.disabled,false);
 const source=h.ctx.ActiveClassicalWritingSource;assert(source.writingContext.exactInputResult===compound.canonicalResult);assert.equal(source.writingContext.morphParts.find(p=>p.role==='subject-number-1').sourceValue,'uh');
 const alternative=h.select.options.find(option=>option.value!=='ordinary');assert(alternative);h.select.value=alternative.value;h.fire(h.select,'change');assert.equal(h.executions,0);h.fire(h.make,'click');
 assert.equal(h.executions,1);const made=h.session.position.accepted.result;assert(made.sourceFrame===source);assert(made.surface.startsWith('no'));assert(made.surface.endsWith('uh'));assert(made.surface.includes('hquī'));
 fields.find(n=>n.dataset.classicalWritingMorphRole==='matrix').value='/k/a';h.fire(fields.find(n=>n.dataset.classicalWritingMorphRole==='matrix'),'input');
 assert.equal(h.make.disabled,true);assert(h.session.position.accepted.result===made);assert.equal(h.executions,1);h.fire(h.apply,'click');assert.equal(h.make.disabled,true);assert(h.session.position.accepted.result===made);
});


test('document capture and native Writing listeners agree on staged owner choice and shared Make',()=>{
 const h=harness({documentCapture:true});h.fire(h.entry,'click');h.kind.value='particle-group';h.fire(h.kind,'change');h.fire(h.apply,'click');
 const source=h.ctx.ActiveClassicalWritingSource;assert.equal(h.executions,0);h.fire(h.make,'click');assert.equal(h.executions,1);
 const ordinary=h.session.position.accepted.result;h.elision.checked=true;h.fire(h.elision,'change');
 assert(h.session.position.accepted.result===ordinary);assert(h.ctx.ActiveClassicalWritingSource===source);assert.equal(h.make.disabled,false);
 h.fire(h.make,'click');assert.equal(h.executions,2);assert.equal(h.session.position.accepted.result.surface,'zāc');
 h.elision.checked=false;h.fire(h.elision,'change');h.fire(h.make,'click');assert.equal(h.executions,3);assert.equal(h.session.position.accepted.result.surface,'zā oc');
});


test('native kw+k choices stage ordinary, delabialized, ordered dissimilation and reversal on the same complete Source',()=>{
 const fixture=JSON.parse(readFileSync(new URL('./fixtures/nonce_writing_kwk_fixture.json',import.meta.url),'utf8'));
 const application=r.executeClassicalGrammarApplicationRequest({operationId:'grammar:nominal-construction',args:[fixture.request]});assert.equal(application.authorizationStatus,'authorized');
 const h=harness({documentCapture:true,initialApplication:application});h.fire(h.entry,'click');h.kind.value='compound';h.fire(h.kind,'change');
 const fields=h.parts.querySelectorAll('[data-classical-writing-morph-role]');for(const part of fixture.morphParts)fields.find(n=>n.dataset.classicalWritingMorphRole===part.role).value=part.segments.join('');
 h.fire(h.apply,'click');const source=h.ctx.ActiveClassicalWritingSource;assert.equal(h.executions,0);assert(source.writingContext.exactApplicationResult===application);
 const variants=Array.from(h.select.options).map(option=>option.value);assert.equal(variants.length,3);
 const surfaces=[];
 for(const variant of [...variants,'ordinary']){
  const accepted=h.session.position.accepted.result,receipt=h.session.position.accepted.receipt,before=h.executions;
  h.select.value=variant;h.fire(h.select,'change');assert(h.session.position.accepted.result===accepted);assert(h.session.position.accepted.receipt===receipt);assert.equal(h.executions,before);
  assert(h.ctx.ActiveClassicalWritingSource===source);h.fire(h.make,'click');assert.equal(h.executions,before+1);
  const made=h.session.position.accepted.result;assert(made.sourceFrame===source);assert(made.surface.startsWith('no'));assert(made.surface.endsWith('uh'));surfaces.push(made.surface);
  if(variant.includes('>'))assert.deepEqual([...made.dependencyResults].map(row=>row.selectedRuleId),['cn-l2-213-kw-exposed-k','cn-l2-211-regressive-dissimilation-kk-hk']);
 }
 assert.equal(new Set(surfaces).size,3);assert.equal(surfaces[0],surfaces[3]);
});


test('actual Source housekeeping and composition mirrors retain Writing hosts after accepted Make and subsequent edits',()=>{
 const h=harness({documentCapture:true,composition:true});h.fire(h.entry,'click');h.kind.value='compound';h.fire(h.kind,'change');
 for(const part of fixture.morphParts)h.parts.querySelectorAll('[data-classical-writing-morph-role]').find(n=>n.dataset.classicalWritingMorphRole===part.role).value=part.segments.join('');
 h.fire(h.apply,'click');h.refreshComposition({});h.fire(h.make,'click');assert.equal(h.executions,1);
 const source=h.ctx.ActiveClassicalWritingSource,ordinary=h.session.position.accepted.result;
 h.ctx.syncClassicalSourceNestingStructure();h.refreshComposition({});
 assert(h.select.closest('#classical-capability-operation-choices'),'Writing choices stay in Build after native Source housekeeping');
 assert(h.keyboard.closest('#classical-transcription-source'),'Writing keyboard stays with its current Source');
 const moves=h.select.parentElement.parentElement.removals||0;
 h.ctx.syncClassicalSourceNestingStructure();h.refreshComposition({});assert.equal(h.select.parentElement.parentElement.removals||0,moves);
 const mirror=h.page.querySelector('[data-composition-choice-for="classical-transcription-optional-result"]');assert(mirror,'real composition creates a compact native mirror');
 const alternative=mirror.children.find(button=>button.dataset.compositionChoiceValue!=='ordinary');assert(alternative);h.fire(alternative,'click');
 assert(h.session.position.accepted.result===ordinary);assert(h.ctx.ActiveClassicalWritingSource===source);assert.equal(h.make.disabled,false);
 assert.equal(h.make.getAttribute('aria-label'),'Make Result');h.fire(h.make,'click');assert.equal(h.executions,2);assert(h.session.position.accepted.result.surface.includes('hquī'));
 h.ctx.syncClassicalSourceNestingStructure();h.refreshComposition({});assert(h.select.closest('#classical-capability-operation-choices'));
 const optional=h.session.position.accepted.result;
 const ordinaryButton=h.page.querySelector('[data-composition-choice-for="classical-transcription-optional-result"]').children.find(button=>button.dataset.compositionChoiceValue==='ordinary');
 h.fire(ordinaryButton,'click');assert(h.session.position.accepted.result===optional);assert.equal(h.executions,2);assert.equal(h.make.getAttribute('aria-label'),'Make Result');
 h.fire(h.make,'click');assert.equal(h.executions,3);assert.equal(h.session.position.accepted.result.surface,ordinary.surface);
 const accepted=h.session.position.accepted.result;h.ctx.setClassicalWritingSourceMode(false);h.ctx.syncClassicalSourceNestingStructure();
 assert.equal(h.page.dataset.classicalWritingSourceMode,'false');assert(h.sourceParts.contains(h.keyboard));assert(h.sourceParts.contains(h.select));assert(h.session.position.accepted.result===accepted);assert.equal(h.executions,3);
});


test('actual navigator Source replacement preserves one native Writing editor and rebuilds its current owner domain',()=>{
 const h=harness({documentCapture:true,composition:true,navigatorLifecycle:true});h.fire(h.entry,'click');h.kind.value='compound';h.fire(h.kind,'change');
 for(const part of fixture.morphParts)h.parts.querySelectorAll('[data-classical-writing-morph-role]').find(n=>n.dataset.classicalWritingMorphRole===part.role).value=part.segments.join('');
 h.fire(h.apply,'click');h.refreshComposition({});h.fire(h.make,'click');assert.equal(h.executions,1);
 const editor=h.doc.getElementById('classical-transcription-optional-controls'),select=h.select,checkbox=h.elision;
 const firstSource=h.ctx.ActiveClassicalWritingSource,firstAccepted=h.session.position.accepted.result,firstReceipt=h.session.position.accepted.receipt;
 const oldVariant=select.options.find(option=>option.value!=='ordinary').value;
 h.kind.value='particle-group';h.fire(h.kind,'change');assert(h.session.position.accepted.result===firstAccepted);assert.equal(h.make.disabled,true);
 h.fire(h.apply,'click');h.refreshComposition({});assert(h.ctx.ActiveClassicalWritingSource!==firstSource);assert(h.session.position.accepted.result===firstAccepted);assert(h.session.position.accepted.receipt===firstReceipt);assert.equal(h.executions,1);
 assert(h.doc.getElementById('classical-transcription-optional-controls')===editor,'the retained native editor survives real navigator clearing');assert(h.doc.getElementById('classical-transcription-elision')===checkbox);assert.equal(h.elisionField.hidden,false);
 assert(!Array.from(select.options).some(option=>option.value===oldVariant),'old compound option withdrawn');
 h.fire(h.make,'click');assert.equal(h.session.position.accepted.result.surface,'zā oc');const ordinary=h.session.position.accepted.result;
 checkbox.checked=true;h.fire(checkbox,'change');assert(h.session.position.accepted.result===ordinary);assert.equal(h.executions,2);h.fire(h.make,'click');assert.equal(h.session.position.accepted.result.surface,'zāc');assert.equal(h.executions,3);
 const elided=h.session.position.accepted.result;h.kind.value='sounds';h.fire(h.kind,'change');h.input.value=fixture.morphParts.flatMap(part=>part.segments).join('');h.fire(h.input,'input');h.fire(h.apply,'click');h.refreshComposition({});
 assert(h.doc.getElementById('classical-transcription-optional-controls')===editor);assert(h.session.position.accepted.result===elided);assert.equal(h.elisionField.hidden,true);assert.equal(checkbox.checked,false);assert.deepEqual(Array.from(select.options).map(option=>option.value),['ordinary']);
 h.fire(h.make,'click');assert.equal(h.executions,4);const rawAccepted=h.session.position.accepted.result;
 h.ctx.setClassicalWritingSourceMode(false);h.ctx.clearClassicalGrammarTypedSourceOperationBinding('operation-changed');h.ctx.syncClassicalSourceNestingStructure();assert(h.doc.getElementById('classical-transcription-optional-controls')===editor);
 h.fire(h.entry,'click');assert(h.doc.getElementById('classical-transcription-optional-controls')===editor);assert(h.doc.getElementById('classical-transcription-elision')===checkbox);assert(h.session.position.accepted.result===rawAccepted);assert.equal(h.executions,4);
 h.kind.value='particle-group';h.fire(h.kind,'change');h.fire(h.apply,'click');h.refreshComposition({});assert(h.doc.getElementById('classical-transcription-optional-controls')===editor);checkbox.checked=true;h.fire(checkbox,'change');assert(h.session.position.accepted.result===rawAccepted);h.fire(h.make,'click');assert.equal(h.executions,5);assert.equal(h.session.position.accepted.result.surface,'zāc');
});


test('cold Writing Apply and reentry use the real committed Writing Source for Build dependency and top caption',()=>{
 const h=harness({documentCapture:true,composition:true,navigatorLifecycle:true,dependencyLifecycle:true,initialApplication:null});
 h.ctx.syncClassicalGrammarDependencyPresentation();assert.equal(h.doc.getElementById('classical-rule-logic-controls').getAttribute('aria-hidden'),'true');
 h.fire(h.entry,'click');h.kind.value='particle-group';h.fire(h.kind,'change');h.fire(h.apply,'click');
 assert.equal(h.executions,0);assert.equal(h.session.position.accepted.result,null);
 h.ctx.syncClassicalGrammarDependencyPresentation();h.ctx.syncClassicalSourceCommitPresentation();
 const controls=h.doc.getElementById('classical-rule-logic-controls'),workspace=h.doc.getElementById('grammar-workspace'),plan=h.doc.getElementById('classical-capability-operation-plan');
 assert.equal(controls.dataset.classicalGrammarDependencyState,'ready','genuine committed Writing Source is independent of empty native VNC/NNC fields');
 assert.equal(controls.getAttribute('aria-hidden'),'false');assert.equal(workspace.getAttribute('aria-hidden'),'false');assert.equal(h.doc.getElementById('source-message').textContent,'Using zā + oc.');
 assert.equal(plan.dataset.classicalCapabilityOperationId,'orthography:transcription');
 h.sourceParts.dataset.classicalSourceCommitState='pending';assert.equal(h.ctx.syncClassicalGrammarDependencyPresentation(),'ready','unrelated native pending cannot hide the genuine committed Writing Source');h.ctx.syncClassicalSourceCommitPresentation();assert.equal(h.sourceParts.dataset.classicalSourceCommitState,'committed');
 const exactWritingSource=h.ctx.ActiveClassicalWritingSource;h.ctx.ActiveClassicalWritingSource={...exactWritingSource};assert.equal(h.ctx.syncClassicalGrammarDependencyPresentation(),'pending','copied Source cannot advertise ready Build');h.ctx.ActiveClassicalWritingSource=exactWritingSource;assert.equal(h.ctx.syncClassicalGrammarDependencyPresentation(),'ready');
 h.fire(h.make,'click');assert.equal(h.executions,1);const ordinary=h.session.position.accepted.result;
 h.ctx.setClassicalWritingSourceMode(false);h.sourceParts.dataset.classicalSourceCommitState='pending';h.doc.getElementById('verb').value=fixture.request.source.matrixStem;h.ctx.syncClassicalGrammarDependencyPresentation();assert.equal(controls.getAttribute('aria-hidden'),'true');
 h.fire(h.entry,'click');h.ctx.syncClassicalSourceCommitPresentation();h.ctx.syncClassicalGrammarDependencyPresentation();assert(h.session.position.accepted.result===ordinary);assert.equal(h.executions,1);assert.equal(controls.getAttribute('aria-hidden'),'false');assert.equal(workspace.getAttribute('aria-hidden'),'false');assert.equal(h.doc.getElementById('source-message').textContent,'Using zā + oc.');assert.equal(plan.dataset.classicalCapabilityOperationId,'orthography:transcription');
 h.elision.checked=true;h.fire(h.elision,'change');assert.equal(h.make.disabled,false);assert(h.session.position.accepted.result===ordinary);h.fire(h.make,'click');assert.equal(h.executions,2);assert.equal(h.session.position.accepted.result.surface,'zāc');
 const elided=h.session.position.accepted.result;h.kind.value='sounds';h.fire(h.kind,'change');h.input.value=fixture.morphParts.flatMap(part=>part.segments).join('');h.fire(h.input,'input');h.ctx.syncClassicalGrammarDependencyPresentation();assert.equal(controls.getAttribute('aria-hidden'),'true');assert.equal(h.make.disabled,true);assert(h.session.position.accepted.result===elided);assert.equal(h.executions,2);
 h.fire(h.apply,'click');h.ctx.syncClassicalGrammarDependencyPresentation();assert.equal(controls.getAttribute('aria-hidden'),'false');assert.equal(workspace.getAttribute('aria-hidden'),'false');assert.equal(h.executions,2);assert(h.session.position.accepted.result===elided);h.fire(h.make,'click');assert.equal(h.executions,3);
});


test('required n+p Source native Apply and Make keep every original morph and exact accepted parent',()=>{
 const f=JSON.parse(readFileSync(new URL('./fixtures/nonce_writing_required_np_fixture.json',import.meta.url),'utf8'));
 const application=r.executeClassicalGrammarApplicationRequest({operationId:'grammar:nominal-construction',args:[f.request]});assert.equal(application.authorizationStatus,'authorized');
 const h=harness({documentCapture:true,composition:true,navigatorLifecycle:true,dependencyLifecycle:true,initialApplication:application});
 h.fire(h.entry,'click');h.kind.value='compound';h.fire(h.kind,'change');for(const part of f.morphParts)h.parts.querySelectorAll('[data-classical-writing-morph-role]').find(node=>node.dataset.classicalWritingMorphRole===part.role).value=part.segments.join('');
 h.fire(h.apply,'click');h.refreshComposition({});assert.equal(h.executions,0);assert(h.session.position.accepted.result===application.canonicalResult);assert(h.session.position.accepted.receipt===h.receipt);
 const source=h.ctx.ActiveClassicalWritingSource;assert(r.isClassicalNahuatlTranscriptionSourceFrame(source));assert(source.writingContext.exactApplicationResult===application);assert.equal(source.writingContext.morphParts.length,8);assert.equal(source.writingContext.morphParts.find(p=>p.role==='embed').segments.at(-1),'/n/');assert.deepEqual(Array.from(h.select.options).map(o=>o.value),['ordinary']);assert.equal(h.make.disabled,false);
 h.fire(h.make,'click');assert.equal(h.executions,1);const made=h.session.position.accepted.result;assert(made.sourceFrame===source);assert(made.baselineWrittenResult===application.lesson2WritingOutputs.find(row=>row.role==='word').writtenResult);assert.equal(made.surface,'notlonīlōyāxāmpāquipoxonēuh');assert.equal(made.dependencyResults[0].optional,false);
});

test('actual native basal painter and Writing refresh agree without changing the grammatical native unit',()=>{
 const h=harness({basalLifecycle:true});h.ctx.syncClassicalBasalUnitControls('nnc');assert.equal(h.basalButtons[1].getAttribute('aria-pressed'),'true');
 h.fire(h.entry,'click');assert.equal(h.basal.dataset.classicalBasalUnit,'nnc');for(const b of h.basalButtons){assert.equal(b.getAttribute('aria-pressed'),'false');assert.equal(b.classList.contains('is-active'),false);}
 h.ctx.syncClassicalBasalUnitControls();h.ctx.syncClassicalWritingPresentation();for(const b of h.basalButtons)assert.equal(b.getAttribute('aria-pressed'),'false');assert.equal(h.ctx.getClassicalBasalUnitFromRuntime(),'nnc');
 h.ctx.setClassicalWritingSourceMode(false);assert.equal(h.basalButtons[1].getAttribute('aria-pressed'),'true');assert.equal(h.basalButtons[0].getAttribute('aria-pressed'),'false');assert.equal(h.ctx.getClassicalBasalUnitFromRuntime(),'nnc');assert.equal(h.executions,0);assert(h.session.position.accepted.receipt===h.receipt);
});

test('accepted Writing native card edits its exact Source and variant without generic continuation or execution',()=>{
 const h=harness({cardLifecycle:true,navigatorLifecycle:true});h.fire(h.entry,'click');h.kind.value='particle-group';h.fire(h.kind,'change');h.fire(h.apply,'click');h.elision.checked=true;h.fire(h.elision,'change');h.fire(h.make,'click');
 const accepted=h.session.position.accepted.result,receipt=h.session.position.accepted.receipt,source=accepted.sourceFrame;h.ctx.ActiveClassicalCapabilityApplicationResult=receipt.application;
 const card=h.ctx.createClassicalResultContinuationCard(accepted);assert(card);h.result.append(card);const action=card.querySelector('[data-classical-result-continuation-kind="writing-source-edit"]');assert(action,'Writing offers its real editor, not generic grammatical continuation');assert.equal(action.textContent,'Edit Writing Source');assert.equal(card.querySelector('[data-classical-result-continuation-kind="exact-result-to-source"]'),null);
 const organize=createResultInformation(h.doc),identity=node=>h.ctx.ClassicalResultContinuationIdentities.get(node);organize({card,getIdentity:identity,isCurrentComposition:()=>false});
 assert(action.closest('[data-composition-result-continuation="true"]'));assert.equal(action.parentElement.getAttribute('aria-label'),'Edit Writing Source');assert.equal(action.closest('[data-composition-information="analysis"]'),null,'native edit action stays beside the visible accepted Result');
 assert.equal(action.dataset.compositionContinuationBound,undefined);
 h.ctx.refreshClassicalAcceptedResultContinuationCards(receipt.application);assert.equal(action.textContent,'Edit Writing Source');h.ctx.setClassicalWritingSourceMode(false);h.fire(action,'click');assert(h.ctx.ActiveClassicalWritingSource===source);assert.equal(h.elision.checked,true);assert(h.session.position.accepted.result===accepted);assert(h.session.position.accepted.receipt===receipt);assert.equal(h.executions,1);
 h.elision.checked=false;h.fire(h.elision,'change');h.fire(h.make,'click');const newAccepted=h.session.position.accepted.result;h.ctx.setClassicalWritingSourceMode(false);h.fire(action,'click');assert.equal(h.ctx.ClassicalWritingSourceMode,false,'stale card cannot restore an old accepted Source');assert(h.session.position.accepted.result===newAccepted);assert.equal(h.executions,2);
});


test('actual History Undo and Return restore each exact Writing Source and binding without making',()=>{
 const corpus=JSON.parse(readFileSync(new URL('./fixtures/nonce_writing_history_fixture.json',import.meta.url),'utf8'));
 const h=harness({navigatorLifecycle:true,historyLifecycle:true});
 const makeRaw=segments=>{h.fire(h.entry,'click');h.kind.value='sounds';h.fire(h.kind,'change');h.input.value=segments.join('');h.fire(h.input,'input');h.fire(h.apply,'click');h.fire(h.make,'click');const result=h.session.position.accepted.result;assert(r.isClassicalNahuatlTranscriptionFrame(result));return result;};
 const first=makeRaw(corpus.segments[0]),firstNode=h.history.record(first),second=makeRaw(corpus.segments[1]),secondNode=h.history.record(second);assert.equal(h.executions,2);
 h.ctx.syncClassicalGrammarWorkspaceHistory();h.fire(h.doc.getElementById('classical-grammar-workspace-history-undo'),'click');assert(h.session.position.accepted.result===first);assert(h.ctx.ActiveClassicalWritingSource===first.sourceFrame);assert(h.session.position.construction.source===first.sourceFrame);assert.equal(h.input.value,corpus.segments[0].join(''));assert(h.ctx.getActiveClassicalGrammarTypedSourceOperationBinding()?.exactSource===first.sourceFrame);assert.equal(h.session.position.accepted.receipt,null);assert.equal(h.executions,2);
 const select=h.doc.getElementById('classical-grammar-workspace-history-node');select.value=secondNode.nodeId;h.fire(select,'change');const action=h.doc.getElementById('classical-grammar-workspace-history-continue');assert.equal(action.textContent,'Edit Writing Source');h.fire(action,'click');assert(h.session.position.accepted.result===second);assert(h.ctx.ActiveClassicalWritingSource===second.sourceFrame);assert(h.session.position.construction.source===second.sourceFrame);assert.equal(h.input.value,corpus.segments[1].join(''));assert.equal(h.executions,2);assert.equal(h.session.position.accepted.receipt,null);
 const accepted=h.session.position.accepted.result,source=h.ctx.ActiveClassicalWritingSource;assert.equal(h.ctx.restoreClassicalHistoryCapture({...h.history.recover(firstNode.nodeId)},'copied'),false);assert(h.session.position.accepted.result===accepted);assert(h.ctx.ActiveClassicalWritingSource===source);assert.equal(h.executions,2);
});

test('History restoration validates current Writing parents before mutation and restores an actual selected optional variant',()=>{
 const h=harness({documentCapture:true,navigatorLifecycle:true,historyLifecycle:true});h.fire(h.entry,'click');h.kind.value='particle-group';h.fire(h.kind,'change');h.fire(h.apply,'click');h.elision.checked=true;h.fire(h.elision,'change');h.fire(h.make,'click');const elided=h.session.position.accepted.result,node=h.history.record(elided),capture=h.history.recover(node.nodeId);
 h.kind.value='sounds';h.fire(h.kind,'change');h.input.value=fixture.morphParts.flatMap(p=>p.segments).join('');h.fire(h.input,'input');h.fire(h.apply,'click');h.fire(h.make,'click');const later=h.session.position.accepted.result;h.history.record(later);const laterReceipt=h.session.position.accepted.receipt,laterSource=h.ctx.ActiveClassicalWritingSource;
 const validator=r.isClassicalNahuatlParticleSourceFrame,parent=elided.sourceFrame.writingContext.parentSources[0];try{r.isClassicalNahuatlParticleSourceFrame=value=>value!==parent&&validator(value);h.ctx.syncClassicalGrammarWorkspaceHistory();const selected=h.doc.getElementById('classical-grammar-workspace-history-node');selected.value=node.nodeId;h.fire(selected,'change');assert.equal(h.doc.getElementById('classical-grammar-workspace-history-continue').disabled,true);assert.equal(h.doc.getElementById('classical-grammar-workspace-history-undo').disabled,true);assert.equal(h.ctx.restoreClassicalHistoryCapture(capture,'unavailable'),false);assert(h.session.position.accepted.result===later);assert(h.session.position.accepted.receipt===laterReceipt);assert(h.ctx.ActiveClassicalWritingSource===laterSource);assert.equal(h.executions,2);}finally{r.isClassicalNahuatlParticleSourceFrame=validator;}
 assert.equal(h.ctx.restoreClassicalHistoryCapture({...capture,canonicalResult:{...elided,sourceFrame:{...elided.sourceFrame}}},'grafted'),false);assert(h.session.position.accepted.result===later);
 assert.equal(h.ctx.restoreClassicalHistoryCapture(capture,'Writing Source restored.'),true);assert(h.session.position.accepted.result===elided);assert(h.ctx.ActiveClassicalWritingSource===elided.sourceFrame);assert(h.session.position.construction.source===elided.sourceFrame);assert.equal(h.elision.checked,true);assert.equal(h.kind.value,'particle-group');const restoredReceipt=h.session.position.accepted.receipt;assert.equal(restoredReceipt,null);assert.equal(h.executions,2);
 h.elision.checked=false;h.fire(h.elision,'change');assert(h.session.position.accepted.result===elided);assert(h.session.position.accepted.receipt===restoredReceipt);assert.equal(h.executions,2);h.fire(h.make,'click');assert.equal(h.executions,3);assert.equal(h.session.position.accepted.result.surface,'zā oc');
});


test('Writing shared presentation and actual native collector retain only current owner choices and routes',()=>{
 const h=harness({documentCapture:true,composition:true,navigatorLifecycle:true,relevanceLifecycle:true});h.fire(h.entry,'click');h.kind.value='particle-group';h.fire(h.kind,'change');h.fire(h.apply,'click');h.refreshComposition({});h.ctx.syncClassicalWritingPresentation();
 assert.equal(h.nominal.hidden,true,'retained nominal sentence organizer is irrelevant to genuine Writing Source');assert.equal(h.particleMenu.hidden,true);
 h.ctx.syncClassicalCapabilityApplyOperationState();const source=h.ctx.ActiveClassicalWritingSource,position=h.session.position;
 assert(position.legalMoves.filter(m=>m.type==='choice').every(m=>m.id==='writingVariant'));assert(position.legalMoves.filter(m=>m.type==='route').every(m=>m.id==='orthography:transcription'));assert(!Object.hasOwn(position.choices,'classical-particle-slot-0'));assert(!Object.hasOwn(position.choices,'polarity'));
 assert(choiceDesign.getNativeGrammarControls(h.doc).every(control=>control.dataset.classicalCapabilityChoiceId==='writingVariant'));
 h.elision.checked=true;h.fire(h.elision,'change');assert.equal(h.executions,0);h.fire(h.make,'click');assert.equal(h.executions,1);assert.equal(h.session.position.accepted.result.surface,'zāc');assert(h.ctx.ActiveClassicalWritingSource===source);
 const original=h.ctx.ActiveClassicalGrammarTypedSourceOperationBinding;h.ctx.ActiveClassicalGrammarTypedSourceOperationBinding={...original};assert.deepEqual(choiceDesign.getNativeGrammarControls(h.doc),[]);h.ctx.ActiveClassicalGrammarTypedSourceOperationBinding=original;
 h.ctx.setClassicalWritingSourceMode(false);assert.equal(h.nominal.hidden,false);assert.equal(h.particleMenu.hidden,false);assert.equal(choiceDesign.getWritingSourcePresentation(h.doc),null);assert(h.doc.getElementById('classical-rule-logic-polarity')===h.polarity);assert(h.doc.getElementById('classical-particle-slot-0')===h.particleSlot);assert.equal(h.polarity.value,'positive');assert.equal(h.polarity.disabled,false);
});

test('explicit Writing Edit and History restore open the real collapsed Source editor; refresh keeps it collapsed',()=>{
 const h=harness({cardLifecycle:true,navigatorLifecycle:true,historyLifecycle:true});h.fire(h.entry,'click');h.kind.value='particle-group';h.fire(h.kind,'change');h.fire(h.apply,'click');h.fire(h.make,'click');const accepted=h.session.position.accepted.result,receipt=h.session.position.accepted.receipt;h.ctx.ActiveClassicalCapabilityApplicationResult=receipt.application;
 const card=h.ctx.createClassicalResultContinuationCard(accepted),action=card.querySelector('[data-classical-result-continuation-kind="writing-source-edit"]');h.sourceEditor.open=false;h.ctx.syncClassicalWritingPresentation();assert.equal(h.sourceEditor.open,false);
 h.fire(action,'click');assert.equal(h.sourceEditor.open,true);assert(h.doc.activeElement===h.kind);assert(h.session.position.accepted.result===accepted);assert(h.session.position.accepted.receipt===receipt);assert.equal(h.executions,1);
 const node=h.history.record(accepted),capture=h.history.recover(node.nodeId);h.sourceEditor.open=false;assert.equal(h.ctx.restoreClassicalHistoryCapture(capture,'Writing Source restored.'),true);assert.equal(h.sourceEditor.open,true);assert(h.doc.activeElement===h.kind);assert.equal(h.executions,1);h.sourceEditor.open=false;h.ctx.syncClassicalWritingPresentation();assert.equal(h.sourceEditor.open,false);
});

test('actual History path presenter agrees with the selected exact Writing capture label and retains native refusal',()=>{
 const h=harness({navigatorLifecycle:true,historyLifecycle:true});h.fire(h.entry,'click');h.kind.value='particle-group';h.fire(h.kind,'change');h.fire(h.apply,'click');h.fire(h.make,'click');const accepted=h.session.position.accepted.result,node=h.history.record(accepted);h.ctx.syncClassicalGrammarWorkspaceHistory();const present=createPathPresentation(h.doc);present();
 const button=h.doc.getElementById('classical-grammar-workspace-history-continue');assert.equal(button.textContent,'Edit Writing Source');assert.match(button.title,/Writing Source/u);button.disabled=true;present();assert.equal(button.disabled,true,'presentation cannot override owner refusal');assert.equal(button.textContent,'Edit Writing Source');assert.equal(h.executions,1);assert(h.history.recover(node.nodeId).canonicalResult===accepted);
 const nativeNode=h.history.record(compound.canonicalResult);h.ctx.syncClassicalGrammarWorkspaceHistory();const native=h.doc.getElementById('classical-grammar-workspace-history-node');native.value=nativeNode.nodeId;h.fire(native,'change');present();assert.equal(button.textContent,'Use as Source');assert.match(button.title,/next Source/u);assert(h.session.position.accepted.result===accepted);assert.equal(h.executions,1);
});

test('Writing observed proposal excludes retained sentence fields and independent particle-root routes',()=>{
 const h=harness({navigatorLifecycle:true,relevanceLifecycle:true});h.fire(h.entry,'click');h.kind.value='particle-group';h.fire(h.kind,'change');h.fire(h.apply,'click');h.ctx.syncClassicalCapabilityApplyOperationState();
 assert(h.session.position.legalMoves.filter(m=>m.type==='choice').every(m=>m.id==='writingVariant'),'only genuine Writing owner choice IDs belong to this proposal');
 assert(h.session.position.legalMoves.filter(m=>m.type==='route').every(m=>m.id==='orthography:transcription'),'independent particle root is not a Writing Source operation');
});
