import test from 'node:test';
import assert from 'node:assert/strict';
import {createConstructionSession} from '../ui/composition/construction_session.mjs';
import {createClassicalGrammarWorkspaceHistory} from '../application/classical/grammar_workspace_history.mjs';
const source=Object.freeze({source:true}),old=Object.freeze({id:'old'}),next=Object.freeze({id:'next'});
const app=Object.freeze({authorizationStatus:'authorized',operationId:'test',canonicalResult:next});
function fixture({execute=()=>app,present=()=>true,prepareCommit,onChange=()=>{}}={}) {
 const history=createClassicalGrammarWorkspaceHistory({captureClassicalGrammarApplicationResult:x=>x===app?Object.freeze({applicationResult:app,canonicalResult:next}):null,isClassicalGrammarApplicationResultCapture:x=>x?.applicationResult===app,isClassicalGrammarApplicationResult:x=>x===app});
 const session=createConstructionSession({isSource:x=>x===source,isResult:x=>x===old||x===next,execute,present,onChange,prepareCommit:prepareCommit||(()=>{const token=history.prepareRecord(app);return{commit:()=>history.commitRecord(token),publish(){}};})});
 session.restore(old);session.stage({source,choices:{x:1},route:{operation:'test'},ready:true,execution:{signature:'one'}});return{session,history};
}
test('history rejection and execution errors preserve accepted result and permit explicit retry',()=>{
 let fail=true;const {session,history}=fixture({prepareCommit:()=>fail?null:{commit:()=>true,publish(){}}});
 assert.equal(session.make(),false);assert.equal(session.position.accepted.result,old);assert.equal(history.snapshot().nodeCount,0);assert.equal(session.position.ready,true);
 fail=false;assert.equal(session.make(),true);assert.equal(session.position.accepted.result,next);
 const f=fixture({execute(){throw Error('execution unavailable');}});assert.equal(f.session.make(),false);assert.equal(f.session.position.accepted.result,old);assert.equal(f.session.position.ready,true);
});
test('partial presentation failure happens after coherent commit and retry does not execute or record again',()=>{
 let executions=0,presentations=0,visible=old;const {session,history}=fixture({execute(){executions++;return app;},present(){visible=next;if(++presentations===1)throw Error('partial display');return true;}});
 assert.equal(session.make(),true);assert.equal(session.position.accepted.result,next);assert.equal(history.snapshot().nodeCount,1);assert.equal(visible,next);assert.ok(session.position.presentationFailure);
 assert.equal(session.recoverPresentation(),true);assert.equal(executions,1);assert.equal(history.snapshot().nodeCount,1);assert.equal(session.position.presentationFailure,null);
});
test('history preparation is inert; stale and copied preparations cannot commit',()=>{
 const {history}=fixture();const before=history.snapshot(),p=history.prepareRecord(app);assert.equal(history.snapshot().revision,before.revision);assert.equal(history.commitRecord({...p}),null);
 const q=history.prepareRecord(app);assert.ok(history.commitRecord(p));assert.equal(history.commitRecord(q),null);assert.equal(history.snapshot().nodeCount,1);
});
test('invalid history record never changes sequences or creates a branch',()=>{
 const {history}=fixture();const before=history.snapshot();assert.equal(history.record(app,{parentNodeId:'absent'}),null);assert.deepEqual(history.snapshot().branches,before.branches);assert.equal(history.snapshot().revision,before.revision);assert.equal(history.record(app).nodeId,'history-1');
});
test('clear after display failure releases recovery and permits a new valid Make',()=>{
 let fail=true;const {session,history}=fixture({present(){if(fail)throw Error('display');return true;}});assert.equal(session.make(),true);
 session.stage({source,route:{operation:'test'},legalMoves:[{type:'clear',id:'all'}]});assert.equal(session.dispatch({type:'clear',id:'all',revision:session.position.revision},()=>({source:null,ready:false})),true);
 assert.equal(session.position.accepted.result,null);assert.equal(session.position.presentationFailure,null);
 fail=false;session.stage({source,route:{operation:'test'},ready:true,execution:{signature:'two'}});assert.equal(session.make(),true);assert.equal(history.snapshot().nodeCount,2);
});
test('execution rejection remains blocked, while commit refusal retains prior state',()=>{
 const blocked=fixture({execute:()=>({authorizationStatus:'blocked',blockReason:'owner-rejected'})});assert.equal(blocked.session.make(),false);assert.equal(blocked.session.position.ready,false);assert.equal(blocked.history.snapshot().nodeCount,0);
 const f=fixture({prepareCommit:()=>({commit:()=>false})});assert.equal(f.session.make(),false);assert.equal(f.session.position.accepted.result,old);assert.equal(f.session.position.construction.source,source);assert.equal(f.history.snapshot().nodeCount,0);
});
test('commit cannot restage or replace acceptance and notifications see coherent state',()=>{
 let session,history,observed=[];
 ({session,history}=fixture({prepareCommit(){
   const token=history.prepareRecord(app);
   return {commit(){assert.equal(session.stage({source:null}),false);assert.equal(session.restore(next),false);return history.commitRecord(token);},
     publish(){observed.push([session.position.accepted.result,history.snapshot().nodeCount]);}};
 }}));
 assert.equal(session.make(),true);assert.deepEqual(observed,[[next,1]]);
});
test('first Result and post-presentation notification failures recover without another Make',()=>{
 let failure=false,calls=0;const {session,history}=fixture({onChange(){if(failure)throw Error('notify');},execute(){calls++;return app;}});
 session.stage({source,route:{operation:'test'},legalMoves:[{type:'clear',id:'all'}]});session.dispatch({type:'clear',id:'all',revision:session.position.revision},()=>({source:null}));session.stage({source,route:{operation:'test'},ready:true,execution:{signature:'first'}});
 failure=true;assert.equal(session.make(),true);assert.equal(history.snapshot().nodeCount,1);assert.equal(session.position.accepted.result,next);assert.ok(session.position.presentationFailure);
 failure=false;assert.equal(session.recoverPresentation(),true);assert.equal(calls,1);assert.equal(history.snapshot().nodeCount,1);
});
test('postacceptance interface completion runs after recovery and only once',()=>{
 let fail=true,after=0;const {session}=fixture({present(){return !fail;}});session.make(undefined,{afterPresent(){after++;}});assert.equal(after,0);fail=false;assert.equal(session.recoverPresentation(),true);assert.equal(after,1);assert.equal(session.recoverPresentation(),false);assert.equal(after,1);
});
test('partial postacceptance restoration retries current accepted account without executing again',()=>{
 let count=0,first=true,recovered;
 const oldApp=Object.freeze({authorizationStatus:'authorized',canonicalResult:old,operationId:'test'});
 let session;({session}=fixture({execute(){count++;return app;},present(){return true;}}));
 session.make(undefined,{afterPresent(){session.restore(old,{application:oldApp});if(first){first=false;throw Error('post restore display');}}});
 assert.equal(session.position.accepted.result,old);assert.ok(session.position.presentationFailure);
 assert.equal(session.recoverPresentation(),true);assert.equal(session.position.accepted.result,old);assert.equal(count,1);
});
test('actual postacceptance renderer completion does not repeat material action after notification failure',async()=>{
 const {readFileSync}=await import('node:fs'),{default:vm}=await import('node:vm');const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
 let retained=0,syncs=0;const ctx=vm.createContext({clearClassicalAcceptanceRecoveryStatus(){},retainClassicalResultEditMaterial(){retained++;},syncClassicalGrammarWorkspaceHistory(){if(++syncs===1)throw Error('history display');},targetObject:{setLeftPanelStackMode(){}},PendingClassicalResultEdit:null});
 const start=code.indexOf('    function completeClassicalConstructionPresentation(');vm.runInContext(code.slice(start,code.indexOf('\n    function ',start+20)),ctx);
 const completion={core:false},position={execution:{kind:'typed'}};assert.throws(()=>ctx.completeClassicalConstructionPresentation(position,{intent:'add'},app,completion));ctx.completeClassicalConstructionPresentation(position,{intent:'add'},app,completion);assert.equal(retained,1);assert.equal(syncs,2);
});
test('actual Make handler delegates History once and display recovery never begins another action',async()=>{
 const {readFileSync}=await import('node:fs'),{default:vm}=await import('node:vm');const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
 let makes=0,recoveries=0,completion=0;const position={revision:4,construction:{route:{operation:'test'}},execution:{kind:'typed'}};
 const fake={position,make(rev,context){makes++;assert.equal(rev,4);context.afterPresent(app);return true;},recoverPresentation(){recoveries++;return true;}};
 const ctx=vm.createContext({ClassicalConstructionSession:fake,PendingClassicalResultEdit:null,targetObject:{},completeClassicalConstructionPresentation(){completion++;},syncClassicalCapabilityApplyOperationState(){}});
 const start=code.indexOf('    function applyClassicalConstructionPosition(');vm.runInContext(code.slice(start,code.indexOf('\n    function ',start+20)),ctx);assert.equal(ctx.applyClassicalConstructionPosition(),true);assert.equal(makes,1);assert.equal(completion,1);
 position.presentationFailure={};assert.equal(ctx.applyClassicalConstructionPosition(),true);assert.equal(makes,1);assert.equal(recoveries,1);
});

test('restoring the same accepted Result recovers its failed display without stranding retry',()=>{
 let fail=true;const {session,history}=fixture({present(){return !fail;}});session.make();assert.ok(session.position.presentationFailure);fail=false;
 assert.equal(session.restore(next,session.position.accepted.receipt),true);assert.equal(session.position.presentationFailure,null);assert.equal(history.snapshot().nodeCount,1);assert.equal(session.recoverPresentation(),false);
});

test('assembled runtime exposes prepared History transactions to rendering and rejects copied actions',async()=>{
 const {createRuntimeInstance}=await import('../runtime/create_runtime.mjs');const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
 assert.equal(typeof r.prepareClassicalGrammarWorkspaceUserAction,'function');
 const source=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:'cal',sourceClass:'tli-1'}),application=r.executeClassicalGrammarApplicationRequest({operationId:'nnc:ordinary',args:[source,r.buildClassicalNahuatlOrdinaryNncOperationFrame(source,{subject:'3common',state:'absolutive'})]});
 const action=r.beginClassicalGrammarWorkspaceUserAction('nnc:ordinary');assert.equal(r.prepareClassicalGrammarWorkspaceUserAction({...action},application),null);
 const tx=r.prepareClassicalGrammarWorkspaceUserAction(action,application);assert.ok(tx);assert.equal(r.getClassicalGrammarWorkspaceHistorySnapshot().nodeCount,0);assert.ok(tx.commit());assert.equal(tx.commit(),null);assert.equal(r.prepareClassicalGrammarWorkspaceUserAction(action,application),null);assert.equal(r.getClassicalGrammarWorkspaceHistorySnapshot().nodeCount,1);
});
test('successful recovery clears only its own stale message, preserving owner diagnostics',async()=>{
 const {readFileSync}=await import('node:fs'),{default:vm}=await import('node:vm');const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
 const name='clearClassicalAcceptanceRecoveryStatus',start=code.indexOf(`    function ${name}(`);assert.ok(start>=0);
 const status={textContent:'Retry display',dataset:{classicalAcceptanceRecoveryMessage:'Retry display'}};const ctx=vm.createContext({targetObject:{document:{getElementById:()=>status}}});vm.runInContext(code.slice(start,code.indexOf('\n    function ',start+20)),ctx);ctx[name]();assert.equal(status.textContent,'Accepted Result ready.');assert.equal(status.dataset.classicalAcceptanceRecoveryMessage,undefined);
 status.textContent='Choose a licensed object';status.dataset.classicalAcceptanceRecoveryMessage='Retry display';ctx[name]();assert.equal(status.textContent,'Choose a licensed object');
});
