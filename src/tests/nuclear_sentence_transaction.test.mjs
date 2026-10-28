import test from 'node:test';
import assert from 'node:assert/strict';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import {createConstructionSession} from '../ui/composition/construction_session.mjs';
const a=await import('../ui/composition/nuclear_sentence_transaction.mjs').catch(()=>({}));
const o=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
function harness(source,operationId){const ingress={},session=createConstructionSession({isSource:x=>x===source});let active=ingress;return {ingress,session,scope:a.createNuclearSentenceScope({owner:o,source,operationId,session,getIngress:()=>active}),leave(){active={};}};}
test('NNC sentence snapshot requires exact current navigator probe and owns authored options and layers',()=>{
 assert.equal(typeof a.createNuclearSentenceScope,'function');
 const ns=o.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:'chicāhuac',sourceClass:'zero'}),app=o.executeClassicalGrammarApplicationRequest({operationId:'nnc:ordinary',args:[ns,o.buildClassicalNahuatlOrdinaryNncOperationFrame(ns,{subject:'3sg',state:'absolutive',predicateFormation:'source-stem',humanness:'human'})]}),source=app.canonicalResult;assert.equal(app.authorizationStatus,'authorized',app.blockReason);
 const navigator=o.getClassicalGrammarApplicationCapabilityNavigator(source),operation=navigator.operations.find(x=>x.operationId==='nnc:sentence-surface'),h=harness(source,'nnc:sentence-surface');
 assert.equal(operation.ownerProbeResultValidated,true);
 const options={sentenceType:'assertion',polarity:'positive'},layers=[];
 const s=a.issueNuclearSentenceSnapshot(h.scope,{ingress:h.ingress,navigator,operation,options,layers});
 assert.equal(s?.contract.ready,true,s?.contract.blockReason);assert.equal(s.contract.request.args[0],operation.ownerProbeInputResult);assert.equal(a.projectNuclearSentenceExecution(s).request,s.contract.request);
 options.polarity='negative';assert.equal(s.contract.intent.polarity,'positive');
 assert.equal(a.issueNuclearSentenceSnapshot(h.scope,{ingress:h.ingress,navigator,operation:{...operation},options:{sentenceType:'assertion',polarity:'positive'}}),null);
 assert.equal(a.issueNuclearSentenceSnapshot(h.scope,{ingress:h.ingress,navigator:{...navigator},operation,options:{}}),null);
 h.leave();assert.equal(a.projectNuclearSentenceExecution(s),null);
});
test('VNC sentence snapshot retains genuine preflight request and stable recapture identity',()=>{
 assert.equal(typeof a.createNuclearSentenceScope,'function');
 const source=o.requestClassicalVncApplicationResult({sourceStem:'cochi',verbClass:'A',sourceValence:'intransitive',subject:'3sg',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active'}),id='vnc:sentence-result';
 const binding=o.issueClassicalNahuatlVncContinuationBindingFrame(id,source,{sentenceType:'assertion-sentence'}),h=harness(source,id);
 assert.equal(binding.bindingStatus,'ready',binding.blockReason);
 const s=a.issueNuclearSentenceSnapshot(h.scope,{ingress:h.ingress,binding,layers:[]});assert.equal(s?.contract.ready,true,s?.contract.blockReason);
 assert.ok(s.contract.request.args===binding.executionArgs,'exact owner execution args');assert.ok(s.contract.signatureArgs===binding.executionArgs||s.contract.signatureArgs[0].ownerRequest===binding.ownerRequest,'owner stable args');
 assert.equal(a.issueNuclearSentenceSnapshot(h.scope,{ingress:h.ingress,binding:{...binding}}),null);
 const app=o.executeClassicalGrammarApplicationRequest(s.contract.request);assert.equal(app.authorizationStatus,'authorized');
 assert.ok(a.issueNuclearSentenceSnapshot(h.scope,{ingress:h.ingress,binding,layers:[]})===s,'unchanged snapshot');
});
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import {freezeConstructionData} from '../ui/composition/construction_packet.mjs';
const renderer=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
function extract(name){const i=renderer.indexOf(`    function ${name}(`);assert(i>=0,name);return renderer.slice(i,renderer.indexOf('\n    function ',i+20));}
test('production packet uses current sentence request and layer recipe without reading live layer controls',()=>{
 const source=o.requestClassicalVncApplicationResult({sourceStem:'cochi',verbClass:'A',sourceValence:'intransitive',subject:'3sg',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active'}),id='vnc:sentence-result',binding=o.issueClassicalNahuatlVncContinuationBindingFrame(id,source,{}),h=harness(source,id);
 const layers=[{operationId:'sentence:adverbial-adjunction',particleId:'l3-no-adverbial'}],s=a.issueNuclearSentenceSnapshot(h.scope,{ingress:h.ingress,binding,layers});assert.equal(s.contract.ready,true);
 const ctx=vm.createContext({...a,targetObject:o,PendingClassicalOrdinaryGrammarBinding:null,captureClassicalPositionLayers(){throw Error('parallel DOM layer read');},ClassicalPositionSources:new WeakSet([source]),getClassicalPositionIdentity:()=>1,getClassicalOwnerIssuedResultProjection:()=>null,freezeConstructionData});vm.runInContext(extract('captureClassicalConstructionPacket'),ctx);
 const packet=ctx.captureClassicalConstructionPacket(id,source,{family:'vnc-continuation',exactResult:source,ownerBindingFrame:binding},null,null,null,null,null,null,null,null,s);
 assert.ok(packet.request===s.contract.request);assert.ok(packet.layers===s.contract.layers);assert.equal(ctx.captureClassicalConstructionPacket(id,source,null,null),null);
 layers[0].particleId='changed';assert.equal(packet.layers[0].particleId,'l3-no-adverbial');
});
test('production NNC native transaction owns edited control and rejects later stale DOM reconciliation',()=>{
 const ns=o.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:'chicāhuac',sourceClass:'zero'}),source=o.executeClassicalGrammarApplicationRequest({operationId:'nnc:ordinary',args:[ns,o.buildClassicalNahuatlOrdinaryNncOperationFrame(ns,{subject:'3sg',state:'absolutive'})]}).canonicalResult;
 const nav=o.getClassicalGrammarApplicationCapabilityNavigator(source),session=createConstructionSession({isSource:x=>x===source}),controls={};
 for(const [id,value] of Object.entries({'classical-rule-logic-sentence-surface':'assertion','classical-rule-logic-polarity':'positive'}))controls[id]={id,value,type:'select-one',isConnected:true,disabled:false,closest:s=>s==='[data-classical-source-identity-controls]'?null:{}};
 const layer={id:'classical-rule-logic-sentence-adverbial',value:'none',type:'select-one',isConnected:true,disabled:false,closest:s=>s==='[data-classical-source-identity-controls]'?null:{}},mirror={id:'layer-mirror',value:'none',dataset:{classicalCompactChoiceDisplay:'true',classicalMirrorsControl:layer.id}};controls[layer.id]=layer;
 const ctx=vm.createContext({...a,targetObject:{...o,document:{getElementById:id=>controls[id]||null}},ActiveClassicalGrammarCapabilityNavigator:nav,ClassicalConstructionSession:session,ClassicalChoicePreflightTransaction:null,ClassicalNuclearSentenceScopes:new WeakMap(),getNativeGrammarControls:()=>[...Object.values(controls).filter(x=>x!==layer),mirror],getClassicalNncSentenceContext:()=>null,captureClassicalPositionLayers:()=>layer.value==='none'?[]:[{operationId:'sentence:adverbial-adjunction',particleId:layer.value}],canClassicalNominalNativeChoice:()=>true});
 vm.runInContext(extract('getClassicalNuclearSentenceControls')+extract('getClassicalNncSentenceTaskExecutionArgs')+extract('readClassicalNuclearSentenceSnapshot')+extract('captureClassicalNuclearSentenceChoiceIntent'),ctx);
 const read=()=>ctx.readClassicalNuclearSentenceSnapshot('nnc:sentence-surface',source,null),stage=s=>session.stage({source,route:{operation:'nnc:sentence-surface'},operationContract:s,slots:[],choices:s.contract.intent,ready:s.contract.ready,execution:a.projectNuclearSentenceExecution(s)});
 const first=read();assert.equal(first.contract.ready,true);stage(first);const accepted=session.position.accepted;
 controls['classical-rule-logic-polarity'].value='negative';assert.ok(read()===first,'unaccepted DOM mutation cannot create intent');assert.equal(controls['classical-rule-logic-polarity'].value,'positive');
 ctx.ClassicalChoicePreflightTransaction={};controls['classical-rule-logic-polarity'].value='negative';ctx.captureClassicalNuclearSentenceChoiceIntent(controls['classical-rule-logic-polarity'],'negative');const next=read();assert.equal(next.contract.intent.polarity,'negative');stage(next);assert.ok(session.position.accepted===accepted);
 ctx.ClassicalChoicePreflightTransaction={};ctx.captureClassicalNuclearSentenceChoiceIntent({...controls['classical-rule-logic-polarity'],value:'positive'},'positive');assert.equal(ctx.ClassicalChoicePreflightTransaction.nuclearIntent,undefined);assert.ok(read()===next);
 ctx.ClassicalChoicePreflightTransaction={};layer.value='l3-no-adverbial';ctx.captureClassicalNuclearSentenceChoiceIntent(layer,layer.value);const layered=read();assert.equal(layered.contract.layers[0].particleId,'l3-no-adverbial');assert.ok(a.projectNuclearSentenceExecution(layered).layers===layered.contract.layers);stage(layered);
 ctx.ClassicalChoicePreflightTransaction={};layer.value='none';ctx.captureClassicalNuclearSentenceChoiceIntent({...mirror,isConnected:false},'none');assert.equal(ctx.ClassicalChoicePreflightTransaction.nuclearIntent,undefined);assert.ok(read()===layered);assert.equal(layer.value,'l3-no-adverbial');
});
test('both actual direct sentence entry points require current session and never execute independently',()=>{
 const source=o.requestClassicalVncApplicationResult({sourceStem:'cochi',verbClass:'A',sourceValence:'intransitive',subject:'3sg',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active'}),id='vnc:sentence-result',binding=o.issueClassicalNahuatlVncContinuationBindingFrame(id,source,{}),h=harness(source,id),s=a.issueNuclearSentenceSnapshot(h.scope,{ingress:h.ingress,binding});
 h.session.stage({source,route:{operation:id},operationContract:s,slots:[],choices:{},ready:true,execution:a.projectNuclearSentenceExecution(s)});
 let calls=0;const ctx=vm.createContext({...a,ClassicalConstructionSession:h.session,ActiveClassicalGrammarCapabilityNavigator:h.ingress,ActiveClassicalGrammarResultBinding:{operationId:id,exactResult:source,ownerBindingFrame:binding,bindingIds:['sentence']},applyClassicalConstructionPosition:()=>{calls++;return true;}});
 vm.runInContext(extract('enterClassicalGrammarResultBindingChoice')+extract('updateClassicalCapabilityNavigatorSelection'),ctx);
 assert.equal(ctx.enterClassicalGrammarResultBindingChoice('sentence'),true);assert.equal(ctx.updateClassicalCapabilityNavigatorSelection({value:id},{execute:true}),true);assert.equal(calls,2);
 h.leave();assert.equal(ctx.enterClassicalGrammarResultBindingChoice('sentence'),false);assert.equal(ctx.updateClassicalCapabilityNavigatorSelection({value:id},{execute:true}),null);assert.equal(calls,2);
});
test('wrapped NNC context and current navigator slot remain distinct exact references',()=>{
 const ns=o.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:'chicāhuac',sourceClass:'zero'}),noun=o.executeClassicalGrammarApplicationRequest({operationId:'nnc:ordinary',args:[ns,o.buildClassicalNahuatlOrdinaryNncOperationFrame(ns,{subject:'3sg',state:'absolutive'})]}).canonicalResult;
 const sentenceApp=o.executeClassicalGrammarApplicationRequest({operationId:'nnc:sentence-surface',args:[o.getClassicalGrammarApplicationCapabilityNavigator(noun).operations.find(x=>x.operationId==='nnc:sentence-surface').ownerProbeInputResult,{sentenceType:'assertion',polarity:'positive'}]});assert.equal(sentenceApp.authorizationStatus,'authorized',sentenceApp.blockReason);const source=sentenceApp.canonicalResult;
 const context=source?.sentenceFrame||source;assert.ok(o.isClassicalNahuatlIssuedNncSentenceSurfaceFrame(context));
 const navigator=o.getClassicalGrammarApplicationCapabilityNavigator(source),operation=navigator.operations.find(x=>x.operationId==='nnc:sentence-surface'),h=harness(source,'nnc:sentence-surface');
 assert.ok(operation.ownerProbeInputResult===context,'current owner accepts the exact sentence context itself');
 const s=a.issueNuclearSentenceSnapshot(h.scope,{ingress:h.ingress,navigator,operation,context,options:{sentenceType:'question',polarity:'positive',predicateKind:context.predicateKind}});
 assert.equal(s?.contract.ready,true,s?.contract.blockReason);assert.ok(s.source===source);assert.ok(s.contract.context===context);assert.ok(s.contract.request.args[0]===operation.ownerProbeInputResult);
 assert.equal(a.issueNuclearSentenceSnapshot(h.scope,{ingress:h.ingress,navigator,operation,context:{...context},options:{}}),null);
});
test('authentic equal VNC reissue retains binding while changed decision and stale event stay distinct',()=>{
 const source=o.requestClassicalVncApplicationResult({sourceStem:'cochi',verbClass:'A',sourceValence:'intransitive',subject:'3sg',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active'}),id='vnc:sentence-result',binding=o.issueClassicalNahuatlVncContinuationBindingFrame(id,source,{}),h=harness(source,id),s=a.issueNuclearSentenceSnapshot(h.scope,{ingress:h.ingress,binding});
 h.session.stage({source,route:{operation:id},operationContract:s,slots:[],choices:{},ready:true,execution:a.projectNuclearSentenceExecution(s)});const event=a.captureNuclearSentenceChoiceFrame(s);
 const equal=o.issueClassicalNahuatlVncContinuationBindingFrame(id,source,{});assert.ok(a.retainNuclearSentenceBinding(s,equal,event)===binding);
 const changed=o.issueClassicalNahuatlVncContinuationBindingFrame(id,source,{sentenceType:'yes-no-question',questionMode:'intonation'});assert.ok(a.retainNuclearSentenceBinding(s,changed,event)===changed);assert.equal(a.retainNuclearSentenceBinding(s,{...changed},event),null);
 h.leave();assert.equal(a.retainNuclearSentenceBinding(s,changed,event),null);
});
test('actual VNC reissue entry keeps owner-normalized controls and equal recapture does not advance position',()=>{
 const source=o.requestClassicalVncApplicationResult({sourceStem:'cochi',verbClass:'A',sourceValence:'intransitive',subject:'3sg',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active'}),id='vnc:sentence-result',nav=o.getClassicalGrammarApplicationCapabilityNavigator(source),binding=o.issueClassicalNahuatlVncContinuationBindingFrame(id,source,{}),session=createConstructionSession({isSource:x=>x===source});
 const control={id:'classical-rule-logic-sentence-surface',value:'assertion-sentence',type:'select-one',isConnected:true,disabled:false,closest:s=>s==='[data-classical-source-identity-controls]'?null:{}};
 const ctx=vm.createContext({...a,isParticleOperation:()=>false,targetObject:{...o,document:{getElementById:id=>id===control.id?control:null}},ClassicalConstructionSession:session,ActiveClassicalGrammarCapabilityNavigator:nav,ClassicalNuclearSentenceScopes:new WeakMap(),ClassicalChoicePreflightTransaction:null,
 ActiveClassicalGrammarResultBinding:{family:'vnc-continuation',operationId:id,exactResult:source,ownerBindingFrame:binding,bindingIds:binding.bindingIds,requiredChoiceIds:binding.requiredChoiceIds,requiredResultRoles:binding.requiredResultRoles},
 getNativeGrammarControls:()=>[control],getClassicalNncSentenceContext:()=>null,captureClassicalPositionLayers:()=>[],canClassicalNominalNativeChoice:()=>true,
 syncClassicalSelectedResultBindingRole(){},stageClassicalRelationalResultBindingChoicePrompts(){},getClassicalNominalConstructionControlValue:()=>'',bindClassicalFormationResultChoiceControls(){},syncClassicalActiveResultBindingChoiceVisibility(){},syncClassicalGrammarWorkspaceHistory(){},syncClassicalVncContinuationFormationChoice(){},getClassicalCapabilityBindingControl:()=>null,syncClassicalRequiredResultChooser(){},syncClassicalCapabilityApplyOperationState(){},
 bindClassicalVncContinuationChoiceControls:b=>{control.value=(b.ownerBindingFrame.effectiveSelections||b.ownerBindingFrame.callerSelections).sentenceType||'assertion-sentence';}});
 vm.runInContext(['getClassicalNuclearSentenceControls','readClassicalNuclearSentenceSnapshot','captureClassicalNuclearSentenceChoiceIntent','captureClassicalIssuedBindingEvent','retainClassicalIssuedBindingCandidate','enterClassicalGrammarResultBindingChoice'].map(extract).join('\n'),ctx);
 const read=()=>ctx.readClassicalNuclearSentenceSnapshot(id,source,ctx.ActiveClassicalGrammarResultBinding),stage=s=>session.stage({source,route:{operation:id},operationContract:s,slots:[],choices:s.contract.intent,ready:s.contract.ready,execution:a.projectNuclearSentenceExecution(s)});
 const first=read();stage(first);const revision=session.position.revision;
 ctx.ClassicalChoicePreflightTransaction={};control.value='yes-no-question';ctx.captureClassicalNuclearSentenceChoiceIntent(control,control.value);
 assert.equal(ctx.enterClassicalGrammarResultBindingChoice(binding.bindingIds[0],{allowExecution:false,editedControl:control,vncSelections:{sentenceType:'yes-no-question',questionMode:'intonation'}}),true);
 const next=read();assert.equal(next.contract.intent.sentenceType,'yes-no-question');assert.equal(next.contract.controls[control.id],control.value);assert.equal(session.position.revision,revision,'handler does not stage midway');stage(next);
 o.executeClassicalGrammarApplicationRequest(next.contract.request);const stableRevision=session.position.revision;
 ctx.ClassicalChoicePreflightTransaction={};assert.equal(ctx.enterClassicalGrammarResultBindingChoice(binding.bindingIds[0],{allowExecution:false,vncSelections:{sentenceType:'yes-no-question',questionMode:'intonation'}}),true);
 assert.ok(read()===next);stage(next);assert.equal(session.position.revision,stableRevision);
});
test('canonical compact sentence layer originals receive snapshot custody instead of mirror state',()=>{
 const original={id:'layer',value:'none',dataset:{},closest:()=>null},mirror={id:'layer-choices',value:'none',dataset:{classicalCompactChoiceDisplay:'true',classicalMirrorsControl:'layer'}};
 const ctx=vm.createContext({targetObject:{document:{getElementById:id=>id==='layer'?original:null}},getNativeGrammarControls:()=>[mirror]});vm.runInContext(extract('getClassicalNuclearSentenceControls'),ctx);
 const controls=ctx.getClassicalNuclearSentenceControls();assert.equal(controls.size,1);assert.ok(controls.has(original));assert.ok(!controls.has(mirror));
});
test('actual nuclear readiness projects existing sentence controls before reading owner choices',()=>{
 const calls=[],button={dataset:{},setAttribute(){}},select={value:'nnc:sentence-surface'},source={},ctx=vm.createContext({...a,targetObject:{document:{getElementById:id=>id==='classical-capability-apply-operation'?button:null}},ClassicalWritingSourceMode:false,PendingClassicalResultEdit:null,PendingClassicalOrdinaryGrammarBinding:null,PendingClassicalRawConstructionRequest:null,PendingClassicalRawAttitudeRequest:null,PendingClassicalRawRootStockRequest:null,PendingClassicalRawAffectiveRequest:null,ActiveClassicalGrammarCapabilityNavigator:{exactResult:source},getClassicalNominalConstructionControlValue:()=>'',getActiveClassicalGrammarTypedSourceOperationBinding:()=>null,syncClassicalPronominalDependentClauseRecovery:()=>false,bindClassicalResultMakeButton(){},getClassicalNncReinflectionDraft:()=>null,getActiveClassicalGrammarResultBinding:()=>null,organizeClassicalNncSentenceTask:()=>calls.push('organize'),readClassicalNuclearSentenceSnapshot:()=>{calls.push('read');return {contract:{ready:true}};}});
 vm.runInContext(extract('updateClassicalNativeApplyOperationState'),ctx);assert.equal(ctx.updateClassicalNativeApplyOperationState(select).ready,true);assert.deepEqual(calls,['organize','read']);assert.equal(button.disabled,false);
});
test('actual segmented polarity button dispatch reaches current canonical input and snapshot without accepting',()=>{
 const ns=o.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:'chicāhuac',sourceClass:'zero'}),source=o.executeClassicalGrammarApplicationRequest({operationId:'nnc:ordinary',args:[ns,o.buildClassicalNahuatlOrdinaryNncOperationFrame(ns,{subject:'3sg',state:'absolutive'})]}).canonicalResult,nav=o.getClassicalGrammarApplicationCapabilityNavigator(source),session=createConstructionSession({isSource:x=>x===source});
 const listeners={},queue=[],control={id:'classical-rule-logic-polarity',value:'positive',type:'hidden',dataset:{},isConnected:true,disabled:false,closest:s=>s==='#classical-rule-logic-controls'?{}:null};
 const buttons=['positive','negative'].map(value=>({dataset:{classicalSegmentControl:control.id,classicalSegmentValue:value},disabled:false,classList:{toggle(){}},setAttribute(){},addEventListener(type,fn){this[type]=fn;}}));
 const doc={getElementById:id=>id===control.id?control:null,querySelectorAll:()=>buttons,addEventListener:(type,fn)=>listeners[type]=fn};
 const ctx=vm.createContext({...a,targetObject:{...o,document:doc,queueMicrotask:fn=>queue.push(fn),getClassicalConstructionPosition:()=>session.position,Event:class {constructor(type){this.type=type;}}},ClassicalConstructionSession:session,ActiveClassicalGrammarCapabilityNavigator:nav,ClassicalNuclearSentenceScopes:new WeakMap(),ClassicalChoicePreflightTransaction:null,ClassicalNominalNativeChoiceFrames:new WeakMap(),ClassicalNominalTypedControlKeys:{},ClassicalPositionStaging:false,ClassicalPositionExecuting:false,PendingClassicalResultEdit:null,ClassicalComparisonTransitionDraft:null,getNativeGrammarControls:()=>[],getClassicalNncSentenceContext:()=>null,captureClassicalPositionLayers:()=>[],reconcileClassicalNewNativeChoiceOffer:()=>false,captureClassicalDenominalChoiceIntent(){},getClassicalChoiceDispatchReadiness:()=>true,CLASSICAL_CAUSATIVE_PARTICIPANT_CONTROL_REQUEST_KEYS:{},runCompositionAction:(_doc,_option,action)=>action()});
 for(const name of ['getClassicalPositionChoiceId','getClassicalNuclearSentenceControls','getClassicalNncSentenceTaskExecutionArgs','readClassicalNuclearSentenceSnapshot','captureClassicalNuclearSentenceChoiceIntent','syncClassicalNominalNativeChoiceFrames','canClassicalNominalNativeChoice','bindClassicalPositionMoves'])vm.runInContext(extract(name),ctx);
 const proposal=()=>{const s=ctx.readClassicalNuclearSentenceSnapshot('nnc:sentence-surface',source,null);return {source,route:{operation:'nnc:sentence-surface'},operationContract:s,slots:[],choices:{polarity:s.contract.intent.polarity},ready:s.contract.ready,execution:a.projectNuclearSentenceExecution(s),legalMoves:[{type:'choice',id:'polarity',values:buttons.map(b=>b.dataset.classicalSegmentValue)}]};};ctx.readClassicalConstructionProposal=proposal;ctx.syncClassicalConstructionPositionApplyState=()=>ctx.syncClassicalNominalNativeChoiceFrames();session.stage(proposal());ctx.syncClassicalNominalNativeChoiceFrames();ctx.bindClassicalPositionMoves();
 control.dispatchEvent=event=>{listeners[event.type]({type:event.type,target:control,preventDefault(){},stopImmediatePropagation(){}});while(queue.length)queue.shift()();};
 const composer=readFileSync(new URL('../ui/composer/composer.mjs',import.meta.url),'utf8'),start=composer.indexOf('      targetObject.document.querySelectorAll("[data-classical-segment-control]").forEach(option => {');vm.runInContext(composer.slice(start,composer.indexOf('      renderInitialClassicalPanelContractSurface();',start)),ctx);
 buttons[1].click();assert.equal(session.position.operationContract.contract.intent.polarity,'negative');assert.equal(session.position.execution.request.args[1].polarity,'negative');assert.equal(session.position.accepted.result,null);
 buttons[0].click();assert.equal(session.position.operationContract.contract.intent.polarity,'positive');const retained=session.position.operationContract;control.isConnected=false;buttons[1].click();assert.ok(proposal().operationContract===retained);assert.equal(control.value,'positive');
});
