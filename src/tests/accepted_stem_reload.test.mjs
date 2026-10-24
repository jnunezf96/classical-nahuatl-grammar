import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import * as reload from '../application/classical/result_reload.mjs';
import {createConstructionSession} from '../ui/composition/construction_session.mjs';
import {executeConstructionPacket,freezeConstructionData} from '../ui/composition/construction_packet.mjs';
import {projectResultForEditing} from '../ui/composition/result_editing.mjs';
const f=JSON.parse(readFileSync(new URL('./fixtures/nonce_accepted_stem_reload_20261024.json',import.meta.url)));
const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
const runtime=async()=>(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
const r=await runtime();
const source=(r,stem)=>r.executeClassicalGrammarApplicationRequest({operationId:'vnc:application',args:[{sourceStem:stem,sourceValence:'intransitive',verbClass:'A',subject:'1sg',mood:'indicative',tense:'future',requestedDerivation:'direct',requestedVoice:'active'}]}).canonicalResult;
const choices=(matrix='nequi',tense='preterit')=>({lateOperation:'compound',lateVariant:'future-embed',compoundMatrixStem:matrix,subject:'1sg',mood:'indicative',tense});
const bind=(r,a,c=choices())=>r.issueClassicalNahuatlVncContinuationBindingFrame('vnc:derivational-operation',a,c);
const packet=(a,b)=>freezeConstructionData({kind:'request',operation:b.operationId,source:a,request:{operationId:b.operationId,args:b.executionArgs},choices:b.callerSelections,layers:[],signature:JSON.stringify(b.callerSelections)});
function make(r,a,c){const b=bind(r,a,c);assert.equal(b.bindingStatus,'ready',b.blockReason);const x=r.executeClassicalGrammarApplicationRequest(packet(a,b).request);assert.equal(x.authorizationStatus,'authorized',x.blockReason);return x.canonicalResult;}
async function roundtrip(r,result,source){const recipe=reload.exportClassicalResultReloadRecipe(r,{result,source});assert(recipe);const next=await runtime(),roots=reload.replayClassicalResultReloadRecipe(next,JSON.parse(JSON.stringify(recipe)));assert(roots);return {r:next,...roots,recipe};}
function restore(r,accepted,a,b,session){
 const record={family:'vnc-continuation',exactResult:a,ownerBindingFrame:b,operationId:b.operationId};
 const ctx=vm.createContext({targetObject:r,ClassicalConstructionSession:session,classicalRestoredAcceptedBuild:null,getActiveClassicalGrammarTypedSourceOperationBinding:()=>null,getActiveClassicalGrammarResultBinding:operation=>operation===b.operationId?record:null,ActiveClassicalGrammarResultBinding:record,ActiveClassicalGrammarResultSourceCapture:{canonicalResult:a},matchesAcceptedVncContinuationBuild:reload.matchesAcceptedVncContinuationBuild});
 const start=code.indexOf('    function restoreClassicalReloadPosition('),end=code.indexOf('\n    function ',start+1);vm.runInContext(code.slice(start,end),ctx);ctx.restoreClassicalReloadPosition(accepted);
}
function session(r,a,b){const s=createConstructionSession({isSource:()=>true,isResult:x=>Boolean(projectResultForEditing(r,x)),execute:p=>executeConstructionPacket(r,p),present:()=>true});const p=packet(a,b),proposal={source:a,route:{operation:b.operationId},slots:[],choices:b.callerSelections,ready:true,execution:p};s.stage({...proposal,choices:{...b.callerSelections,lateOperation:'none'},execution:{...p,signature:'before-restoration'}});s.stage(proposal);return {s,proposal};}

test('reload graph retains exact future parent identity across accepted compound and Source roots',async()=>{
 for(const [i,c] of [choices(),choices('qui','imperfect')].entries()){
  const a=source(r,f.stems[i]),made=make(r,a,c),loaded=await roundtrip(r,made,a);
  assert(loaded.source===loaded.result.baseApplicationFrame,'saved Source must be the exact parent of the accepted compound');
  assert.equal(loaded.result.surfaceRealization,made.surfaceRealization);
  assert.equal(reload.exportClassicalResultReloadRecipe(loaded.r,{result:{...loaded.result},source:loaded.source}),null);
 }
});
test('public reload restores Applied and clears pending without execution; a real edit still requires Make',async()=>{
 const a=source(r,f.stems[2]),made=make(r,a),loaded=await roundtrip(r,made,a),now=loaded.r,b=bind(now,loaded.source),{s,proposal}=session(now,loaded.source,b),before=now.getClassicalGrammarWorkspaceHistorySnapshot();
 assert(s.position.pending.length);s.restore(loaded.result,null);restore(now,loaded.result,loaded.source,b,s);s.stage(proposal);
 assert.equal(s.position.accepted.result,loaded.result);assert.equal(s.position.applied,true);assert.equal(s.position.pending.length,0);assert.equal(s.position.ready,false);assert.deepEqual(now.getClassicalGrammarWorkspaceHistorySnapshot(),before);assert.equal(s.make(),false);
 const changed=bind(now,loaded.source,choices('qui','imperfect')),pending={...proposal,choices:changed.callerSelections,execution:packet(loaded.source,changed)};s.stage(pending);assert.equal(s.position.applied,false);assert(s.position.pending.length);assert.equal(s.position.accepted.result,loaded.result);assert.deepEqual(now.getClassicalGrammarWorkspaceHistorySnapshot(),before);assert(s.make());assert.notEqual(s.position.accepted.result,loaded.result);
 const twice=await roundtrip(now,s.position.accepted.result,loaded.source),b2=bind(twice.r,twice.source,choices('qui','imperfect')),{s:s2,proposal:p2}=session(twice.r,twice.source,b2);restore(twice.r,twice.result,twice.source,b2,s2);s2.stage(p2);assert.equal(s2.position.pending.length,0);assert.equal(s2.position.applied,true);
});
test('changed matrix or finite coordinate is not absorbed into the accepted baseline on reload',async()=>{
 const a=source(r,f.stems[3]),made=make(r,a),loaded=await roundtrip(r,made,a);
 for(const c of [choices('nequi','future'),choices('qui','imperfect')]){
  const b=bind(loaded.r,loaded.source,c),{s,proposal}=session(loaded.r,loaded.source,b),before=loaded.r.getClassicalGrammarWorkspaceHistorySnapshot();restore(loaded.r,loaded.result,loaded.source,b,s);s.stage(proposal);
  assert.equal(s.position.applied,false);assert(s.position.pending.length);assert.equal(s.position.accepted.result,loaded.result);assert.deepEqual(loaded.r.getClassicalGrammarWorkspaceHistorySnapshot(),before);
 }
});

test('copied, foreign, equal-looking unrelated Source and stale execution cannot acknowledge an accepted build',async()=>{
 const a=source(r,f.stems[0]),made=make(r,a),loaded=await roundtrip(r,made,a),now=loaded.r,b=bind(now,loaded.source),{s}=session(now,loaded.source,b);
 assert(reload.matchesAcceptedVncContinuationBuild(now,loaded.result,b,s.position));
 assert.equal(reload.matchesAcceptedVncContinuationBuild(now,{...loaded.result},b,s.position),false);
 assert.equal(reload.matchesAcceptedVncContinuationBuild(now,loaded.result,{...b},s.position),false);
 assert.equal(reload.matchesAcceptedVncContinuationBuild(r,loaded.result,b,s.position),false);
 const other=source(now,f.stems[0]),unrelated=bind(now,other),separate=session(now,other,unrelated);assert.notEqual(other,loaded.source);
 assert.equal(reload.matchesAcceptedVncContinuationBuild(now,loaded.result,unrelated,separate.s.position),false);
 for(const execution of [{...s.position.execution,request:{operationId:b.operationId,args:[{...b.ownerRequest}]}},{...s.position.execution,layers:[{operationId:'sentence:particle-adjunction'}]}])assert.equal(reload.matchesAcceptedVncContinuationBuild(now,loaded.result,b,{...s.position,execution}),false);
 assert.equal(reload.matchesAcceptedVncContinuationBuild(now,loaded.result,b,{...s.position,construction:{...s.position.construction,sourcePending:true}}),false);
});
test('forged future-object graph cannot invent a matrix, change subject, smuggle authority or create a forward edge',async()=>{
 const a=source(r,f.stems[1]),made=make(r,a),recipe=reload.exportClassicalResultReloadRecipe(r,{result:made,source:a}),next=await runtime();
 for(const alter of [node=>node.step.request.compoundMatrixStem='mati',node=>node.step.request.subject='2sg',node=>node.step.request.targetStem='forged',node=>node.source=999]){
  const copy=JSON.parse(JSON.stringify(recipe)),node=copy.nodes.find(node=>node.type==='vnc:future-object');alter(node);assert.equal(reload.replayClassicalResultReloadRecipe(next,copy),null);
 }
});
test('same accepted Result ignores a nonmatching receipt and keeps a pending draft',async()=>{
 const {createConstructionPosition}=await import('../ui/composition/construction_position.mjs'),a={},other={},result={},store=createConstructionPosition({isSource:()=>true,isResult:x=>x===result});
 const p={source:a,route:{operation:'vnc:derivational-operation'},slots:[],choices:{tense:'preterit'},execution:{signature:'accepted'},ready:true};store.stage(p);store.restore(result);store.stage({...p,choices:{tense:'future'},execution:{signature:'pending'}});const before=store.position;
 store.restore(result,{construction:{...before.construction,source:other},choices:before.choices,executionSignature:'pending'});assert.equal(store.position,before);assert.equal(store.position.pending.length,1);assert.equal(store.position.accepted.receipt,null);
});
