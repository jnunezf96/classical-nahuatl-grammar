import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import {createConstructionSession} from '../ui/composition/construction_session.mjs';
import {stageOrdinaryBindingIntent} from '../application/classical/ordinary_binding_intent.mjs';
import * as adapter from '../ui/composition/issued_binding_operation_transaction.mjs';
const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
function fixture(source,navigator,ordinary=null,draft=null){
 const session=createConstructionSession({isSource:x=>x===source});
 const c=vm.createContext({...adapter,targetObject:r,ClassicalOrdinaryNncChoiceMemory:new WeakMap(),ClassicalConstructionSession:session,ActiveClassicalGrammarCapabilityNavigator:navigator,PendingClassicalOrdinaryGrammarBinding:ordinary,getClassicalNncReinflectionDraft:()=>draft});
 const start=code.indexOf('    const ClassicalIssuedBindingSnapshots ='),end=code.indexOf('    function readClassicalConstructionProposal(',start);vm.runInContext(code.slice(start,end),c);return {c,session};
}
test('production projection captures ordinary pending intent, exact reinflection custody, and guarded native candidate',()=>{
 const source=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:'pil',sourceClass:'tli-1'}),nav=r.getClassicalGrammarApplicationCapabilityNavigator(source);
 const issue=s=>r.issueClassicalGrammarTypedSourceOperationBindingFrame(nav,'nnc:ordinary',s),binding=issue({subject:'3sg',humanness:'human',state:'absolutive',predicateFormation:'source-stem'});
 const {c,session}=fixture(source,nav,binding),snapshot=c.readClassicalIssuedBindingSnapshot('nnc:ordinary',source,null,null);assert.equal(snapshot.contract.binding,binding);assert.equal(c.readClassicalIssuedBindingSnapshot('nnc:ordinary',source,null,null),snapshot);
 const gateStart=code.indexOf('      if (["nnc:ordinary","vnc:application","vnc:ordered-voice-application"].includes(operation)'),gateEnd=code.indexOf('      // A stale/invalid replacement',gateStart);assert.ok(gateStart>=0);vm.runInContext('function packetGate(packet,issuedSnapshot,operation,ready=true){'+code.slice(gateStart,gateEnd)+'return {packet,ready};}',c);
 const packet={kind:'typed',operation:'nnc:ordinary',source,binding,choices:binding.effectiveSelections};assert.equal(c.packetGate(packet,snapshot,'nnc:ordinary').ready,true);assert.equal(c.packetGate(packet,null,'nnc:ordinary').ready,false);assert.equal(c.packetGate({...packet,source:{...source}},snapshot,'nnc:ordinary').packet,null);
 session.stage({source,route:{operation:'nnc:ordinary'},operationContract:snapshot});const event=c.captureClassicalIssuedBindingEvent(binding);assert.ok(event);const candidate=issue({...binding.callerSelections,state:'possessive',possessor:'1sg'});assert.equal(c.retainClassicalIssuedBindingCandidate(event,candidate),true);assert.equal(c.retainClassicalIssuedBindingCandidate(event,{...candidate}),false);
 c.PendingClassicalOrdinaryGrammarBinding=candidate;const next=c.readClassicalIssuedBindingSnapshot('nnc:ordinary',source,null,null);assert.equal(next.contract.binding,candidate);session.stage({source,route:{operation:'nnc:ordinary'},operationContract:next});assert.equal(c.retainClassicalIssuedBindingCandidate(event,binding),false);
 const result=r.executeClassicalGrammarTypedSourceOperationBindingFrame(binding).canonicalResult,context=r.getClassicalNahuatlOrdinaryNncReinflectionContext(result),publicNav=r.getClassicalGrammarApplicationCapabilityNavigator(result),b=issue(context.selections);
 const f=fixture(result,publicNav,null,{exact:result,context,binding:b});const exact=f.c.readClassicalIssuedBindingSnapshot('nnc:ordinary',result,null,null);assert.equal(exact.source,result);assert.equal(exact.contract.binding.exactSource,source);
});
test('production projection retains genuine exact VNC binding and refuses a different Source',()=>{
 const source=r.evaluateClassicalNahuatlVncApplication({sourceStem:'chōca',verbClass:'A',sourceValence:'intransitive',subject:'3sg',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active'}).resultFrame,nav=r.getClassicalGrammarApplicationCapabilityNavigator(source);
 const owner=r.issueClassicalNahuatlVncContinuationBindingFrame('vnc:application',source,{subject:'1sg',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active'}),binding={family:'vnc-continuation',ownerBindingFrame:owner};const {c}=fixture(source,nav);
 const snapshot=c.readClassicalIssuedBindingSnapshot('vnc:application',source,binding,null);assert.equal(snapshot.contract.binding,owner);assert.equal(snapshot.source,source);assert.equal(c.readClassicalIssuedBindingSnapshot('vnc:application',{...source},binding,null),null);
});

test('production exact ordinary reissue uses owner dependencies and preserves exact Result through recovery',()=>{
 const source=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:'pil',sourceClass:'tli-1'}),nav=r.getClassicalGrammarApplicationCapabilityNavigator(source),base={subject:'3sg',humanness:'human',state:'absolutive',predicateFormation:'source-stem'};
 const result=r.executeClassicalGrammarTypedSourceOperationBindingFrame(r.issueClassicalGrammarTypedSourceOperationBindingFrame(nav,'nnc:ordinary',base)).canonicalResult;
 const context=r.getClassicalNahuatlOrdinaryNncReinflectionContext(result),publicNav=r.getClassicalGrammarApplicationCapabilityNavigator(result),binding=r.issueClassicalGrammarTypedSourceOperationBindingFrame(nav,'nnc:ordinary',context.selections);
 const {c,session}=fixture(result,publicNav);c.stageOrdinaryBindingIntent=stageOrdinaryBindingIntent;c.ActiveClassicalGrammarResultSourceCapture={canonicalResult:result};c.ActiveClassicalNncReinflectionDraft={exact:result,context,binding,choices:context.selections};c.getClassicalNncReinflectionDraft=()=>c.ActiveClassicalNncReinflectionDraft;
 const start=code.indexOf('    function stageClassicalNncReinflection(');vm.runInContext(code.slice(start,code.indexOf('\n    function ',start+20)),c);
 const stage=()=>{const snapshot=c.readClassicalIssuedBindingSnapshot('nnc:ordinary',result,null,null);assert.ok(snapshot);const packet={kind:'request',operation:'nnc:ordinary',source:result,request:{operationId:'nnc:ordinary',args:[result,c.ActiveClassicalNncReinflectionDraft.choices]},choices:c.ActiveClassicalNncReinflectionDraft.choices};assert.equal(adapter.matchesIssuedBindingExecutionPacket(snapshot,packet),true);assert.equal(adapter.matchesIssuedBindingExecutionPacket(snapshot,{...packet,request:{...packet.request,args:[result,{...packet.choices,subject:'1sg'}]}}),false);session.stage({source:result,route:{operation:'nnc:ordinary'},operationContract:snapshot,ready:false});};stage();
 const possessive=c.stageClassicalNncReinflection({state:'possessive',possessor:'1sg'});assert.ok(possessive);assert.equal(possessive.exact,result);assert.equal(possessive.binding.exactSource,source);stage();
 const absolute=c.stageClassicalNncReinflection({state:'absolutive'});assert.ok(absolute);assert.equal(absolute.choices.possessor,'');assert.equal(absolute.exact,result);stage();
 session.stage({source:result,sourcePending:true,route:{operation:'nnc:ordinary'},operationContract:session.position.operationContract,ready:false});assert.equal(c.stageClassicalNncReinflection({state:'possessive'}),null);
});
