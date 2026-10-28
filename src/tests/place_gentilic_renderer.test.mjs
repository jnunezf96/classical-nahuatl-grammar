import test from 'node:test';import assert from 'node:assert/strict';import vm from 'node:vm';import {readFileSync} from 'node:fs';
import {createPossessiveFixture} from './helpers/deverbal_possessive_fixture.mjs';
import {createConstructionSession} from '../ui/composition/construction_session.mjs';
import {freezeConstructionData,executeConstructionPacket} from '../ui/composition/construction_packet.mjs';
import {previewConstructionPacket} from '../ui/composition/construction_preview.mjs';
import {createPlaceGentilicScope,issuePlaceGentilicSnapshot,projectPlaceGentilicExecution,isCurrentPlaceGentilicSnapshot,capturePlaceGentilicChoiceFrame} from '../ui/composition/place_gentilic_transaction.mjs';
const {r:owner}=await createPossessiveFixture('cal'),code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
test('production place preview and Make share exact issued request, no independent packet fallback',()=>{
 const source=owner.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:'cal'}),ingress={},context={source,ingress,committed:true,declaration:{mode:'whole-stem',sourceWholeStem:'cal'}};let executions=0;
 const session=createConstructionSession({isSource:x=>x===source,isResult:x=>owner.isPlaceGentilicNncFrame(x),execute:p=>{executions++;return executeConstructionPacket(owner,p);},present:()=>true}),scope=createPlaceGentilicScope({owner,source,session,getIngress:()=>ingress,getSourceContext:()=>context}),snapshot=issuePlaceGentilicSnapshot(scope,{ingress,sourceContext:context,request:{constructionKind:'place-name',formation:'co',source:{embedStem:'cal'},usage:'adverbial'}});
 const ctx=vm.createContext({targetObject:owner,PendingClassicalOrdinaryGrammarBinding:null,captureClassicalPositionLayers:()=>[],getClassicalParticleChoiceEditContext:()=>null,ClassicalPositionSources:new Set([source]),getClassicalOwnerIssuedResultProjection:()=>null,getClassicalPositionIdentity:()=> 'source-1',freezeConstructionData,projectPlaceGentilicExecution,ClassicalConstructionSession:session,previewConstructionPacket,api:{}});
 const start=code.indexOf('    function captureClassicalConstructionPacket('),end=code.indexOf('    function syncClassicalPositionFixedChoices(',start);vm.runInContext(code.slice(start,end),ctx);
 assert.equal(ctx.captureClassicalConstructionPacket('nnc:place-gentilic',source,null,null),null);
 const packet=ctx.captureClassicalConstructionPacket('nnc:place-gentilic',source,null,null,null,null,null,snapshot);assert.equal(packet.request.args[0],snapshot.contract.request);
 session.stage({source,route:{operation:'nnc:place-gentilic'},operationContract:snapshot,slots:snapshot.captures,execution:packet,ready:true});const event=capturePlaceGentilicChoiceFrame(snapshot);assert.ok(event);assert.equal(isCurrentPlaceGentilicSnapshot(snapshot,{...event}),false);
 const pstart=code.indexOf('    api.previewClassicalConstructionPosition ='),pend=code.indexOf('    api.getClassicalPendingResultEditPath',pstart);vm.runInContext(code.slice(pstart,pend),ctx);
 const preview=ctx.api.previewClassicalConstructionPosition(session.position);assert.ok(preview?.isCurrent());assert.equal(executions,0);assert.equal(session.position.accepted.result,null);assert.equal(session.make(),true);assert.equal(executions,1);assert.equal(session.position.accepted.result.wordSurface,'calco');assert.equal(preview.isCurrent(),false);
});
test('production place controls carry current issued frame including compact originals',()=>{
 const source=owner.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:'cal'}),ingress={},context={source,ingress,committed:true,declaration:{mode:'whole-stem',sourceWholeStem:'cal'}},session=createConstructionSession({isSource:x=>x===source}),scope=createPlaceGentilicScope({owner,source,session,getIngress:()=>ingress,getSourceContext:()=>context}),snapshot=issuePlaceGentilicSnapshot(scope,{ingress,sourceContext:context,request:{constructionKind:'place-name',formation:'co',source:{embedStem:'cal'},usage:'adverbial'}});
 session.stage({source,route:{operation:'nnc:place-gentilic'},operationContract:snapshot,slots:snapshot.captures,ready:true,execution:projectPlaceGentilicExecution(snapshot)});
 const control={id:'classical-place-gentilic-formation',isConnected:true,disabled:false,closest:s=>s==='#classical-rule-logic-controls'?{}:null};
 const ctx=vm.createContext({ClassicalConstructionSession:session,ClassicalNominalNativeChoiceFrames:new WeakMap(),ClassicalNominalTypedControlKeys:{},targetObject:{document:{getElementById:id=>id===control.id?control:null}},getNativeGrammarControls:()=>[],isCurrentPlaceGentilicSnapshot,capturePlaceGentilicChoiceFrame});
 const start=code.indexOf('    function syncClassicalNominalNativeChoiceFrames('),end=code.indexOf('    const ClassicalIssuedBindingSnapshots',start);vm.runInContext(code.slice(start,end),ctx);
 assert.equal(ctx.canClassicalNominalNativeChoice(control),false);ctx.syncClassicalNominalNativeChoiceFrames();assert.equal(ctx.canClassicalNominalNativeChoice(control),true);assert.equal(ctx.canClassicalNominalNativeChoice({...control}),false);
 session.stage({...session.position.construction,sourcePending:true,operationContract:snapshot,ready:false,execution:null});assert.equal(ctx.canClassicalNominalNativeChoice(control),false);
});
test('actual typed staging reissues from current place event and rejects departed or copied binding',async()=>{
 const adapter=await import('../ui/composition/place_gentilic_transaction.mjs');
 const source=owner.buildClassicalNahuatlPlaceNominalSourceFrame({embedStem:'coch',matrixStem:'to'}),navigator=owner.getClassicalGrammarApplicationCapabilityNavigator(source),session=createConstructionSession({isSource:x=>x===source}),scope=createPlaceGentilicScope({owner,source,session,getIngress:()=>navigator});
 const binding=owner.issueClassicalGrammarTypedSourceOperationBindingFrame(navigator,'nnc:place-gentilic',{}),snapshot=issuePlaceGentilicSnapshot(scope,{ingress:navigator,binding});
 session.stage({source,route:{operation:'nnc:place-gentilic'},operationContract:snapshot,slots:snapshot.captures,ready:false,execution:null});
 let ctx;ctx=vm.createContext({...adapter,targetObject:owner,ClassicalConstructionSession:session,ActiveClassicalGrammarCapabilityNavigator:navigator,ActiveClassicalGrammarTypedSourceOperationBinding:binding,ClassicalTypedSourceBindingSelectionSignatures:new WeakMap(),getActiveClassicalGrammarTypedSourceOperationBinding:()=>ctx.ActiveClassicalGrammarTypedSourceOperationBinding,clearClassicalGrammarTypedSourceOperationBinding:()=>{throw Error('unexpected admission failure');},syncClassicalSourceFiniteStage:()=>false,syncClassicalGrammarTypedSourceOperationChoices:()=>{}});
 const helpers=code.indexOf('    function captureClassicalIssuedBindingEvent('),helpersEnd=code.indexOf('    function readClassicalConstructionProposal(',helpers);vm.runInContext(code.slice(helpers,helpersEnd),ctx);
 const start=code.indexOf('    function getClassicalTypedSourceSelectionSignature('),end=code.indexOf('    function syncClassicalVncChoiceEditSubject(',start);vm.runInContext(code.slice(start,end),ctx);
 const ready=ctx.stageClassicalGrammarTypedSourceOperationBinding('nnc:place-gentilic',{constructionKind:'place-name',formation:'n-can'});assert.equal(ready.bindingStatus,'ready');assert.equal(ready.exactSource,source);assert.equal(session.position.accepted.result,null);
 // Before reconciliation publishes the new binding snapshot, a second control event
 // cannot claim the old snapshot using the new or a copied binding.
 assert.equal(ctx.stageClassicalGrammarTypedSourceOperationBinding('nnc:place-gentilic',{constructionKind:'place-name',formation:''}),null);
 const next=issuePlaceGentilicSnapshot(scope,{ingress:navigator,binding:ready});session.stage({source,route:{operation:'nnc:place-gentilic'},operationContract:next,slots:next.captures,ready:true,execution:projectPlaceGentilicExecution(next)});
 ctx.ActiveClassicalGrammarTypedSourceOperationBinding={...ready};assert.equal(ctx.stageClassicalGrammarTypedSourceOperationBinding('nnc:place-gentilic',{constructionKind:'place-name'}),null);
 ctx.ActiveClassicalGrammarTypedSourceOperationBinding=ready;session.stage({...session.position.construction,sourcePending:true,operationContract:next,ready:false,execution:null});assert.equal(ctx.stageClassicalGrammarTypedSourceOperationBinding('nnc:place-gentilic',{constructionKind:'place-name'}),null);
});
