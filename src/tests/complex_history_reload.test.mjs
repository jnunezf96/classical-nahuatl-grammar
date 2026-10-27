import test from 'node:test';
import assert from 'node:assert/strict';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import {exportClassicalGrammarWorkspaceHistoryReloadState as save,restoreClassicalGrammarWorkspaceHistoryReloadState as restore} from '../application/classical/grammar_workspace_history.mjs';
const runtime=async()=>{const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;return r;};
const record=(r,result,label)=>r.completeClassicalGrammarWorkspaceUserAction(r.beginClassicalGrammarWorkspaceUserAction(label),result);
const numeral=(r,value)=>r.executeClassicalGrammarApplicationRequest({operationId:'grammar:nominal-construction',args:[{constructionKind:'cardinal-numeral-nnc',value,classifier:'basic',countKind:'ordinary',subject:'3common',state:'absolutive',animacy:'nonanimate'}]}).canonicalResult;
test('partial history preserves ancestor-complete siblings, clears omitted selection, and next Make starts a real root',async()=>{
 const r=await runtime(),a=numeral(r,1),b=numeral(r,2),c=numeral(r,3);
 const first=record(r,a,'Supported');
 const lost=record(r,b,'Unavailable');
 const dependent=record(r,c,'Dependent');
 r.forkClassicalGrammarWorkspaceHistory(first.nodeId,'Supported sibling');
 const sibling=record(r,numeral(r,5),'Sibling');
 r.continueClassicalGrammarWorkspaceFrom(dependent.nodeId);
 // Simulate a genuinely issued future family without its replay adapter, not a forged Result.
 const limited=Object.create(r);Object.defineProperty(limited,'getClassicalNahuatlNominalConstructionReloadInputs',{value:v=>v===b?null:r.getClassicalNahuatlNominalConstructionReloadInputs(v)});
 const saved=save(limited);assert.equal(saved.status,'partial');assert.deepEqual(saved.nodes.map(n=>n.nodeId),[first.nodeId,sibling.nodeId]);assert.equal(saved.branches.find(b=>b.branchId===sibling.branchId).anchorNodeId,first.nodeId);assert.deepEqual(saved.omitted.map(n=>[n.nodeId,n.reason]),[[lost.nodeId,'unsupported-result'],[dependent.nodeId,'ancestor-unavailable']]);assert.equal(saved.currentNodeId,'');assert.equal(saved.currentBranchId,'');
 const fresh=await runtime();assert(restore(fresh,JSON.parse(JSON.stringify(saved))));const snapshot=fresh.getClassicalGrammarWorkspaceHistorySnapshot();assert.equal(snapshot.currentNodeId,'');assert.equal(snapshot.currentBranchId,'');assert.equal(snapshot.nodes.length,2);assert.equal(fresh.recoverClassicalGrammarWorkspaceResult(),null);
 const made=numeral(fresh,4),next=record(fresh,made,'New Make');assert.equal(next.parentNodeId,'');assert.notEqual(next.branchId,first.branchId);
 for(const mutation of [s=>s.omitted.push({...s.omitted[0]}),s=>s.omitted[0].nodeId=s.nodes[0].nodeId]){const bad=structuredClone(saved);mutation(bad);assert.equal(restore(fresh,bad),false);}
});
test('one replay graph preserves accepted Result identity in History and rejects copied shared roots',async()=>{
 const {exportClassicalResultReloadRecipe:exportGraph,replayClassicalResultReloadRecipe:replayGraph}=await import('../application/classical/result_reload.mjs');
 const r=await runtime(),a=numeral(r,1),node=record(r,a,'Accepted numeral'),history=save(r);
 const graph=exportGraph(r,{result:a,historyEntry0:a});assert.equal(graph.roots.result,graph.roots.historyEntry0);
 const fresh=await runtime(),roots=replayGraph(fresh,structuredClone(graph));assert(restore(fresh,history,{[node.nodeId]:roots.historyEntry0}));assert.equal(fresh.recoverClassicalGrammarWorkspaceResult(node.nodeId).canonicalResult,roots.result);
 assert.equal(restore(fresh,history,{[node.nodeId]:{...roots.result}}),false);assert.equal(restore(fresh,history,{wrong:roots.result}),false);
});
test('History graph budget cannot evict supported accepted work',async()=>{
 const {readFileSync}=await import('node:fs'),vm=await import('node:vm');
 const {exportClassicalResultReloadRecipe:exportGraph}=await import('../application/classical/result_reload.mjs');
 const r=await runtime(),current=numeral(r,1),historyRoots={};for(let i=0;i<128;i++)historyRoots[`historyEntry${i}`]=numeral(r,2);
 assert(exportGraph(r,historyRoots));assert.equal(exportGraph(r,{result:current,...historyRoots}),null);
 const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');const a=code.indexOf('          const coreRoots = { result: current'),b=code.indexOf('\n          if (mixedRecipe) {',a);
 const ctx=vm.createContext({targetObject:r,exportClassicalResultReloadRecipe:exportGraph,current,source:null,captures:{},operandRoots:{},historyRoots,history:{status:'supported'},historyGraphRoots:{},historyEntries:Array(128)});
 const result=vm.runInContext(code.slice(a,b)+'\n({mixedRecipe,mixedHistory,mixedHistoryRoots})',ctx);
 assert(result.mixedRecipe);assert.equal(result.mixedHistory.status,'unsupported');assert.equal(result.mixedHistory.reason,'combined-graph-limit');assert.equal(result.mixedHistoryRoots,undefined);assert.deepEqual(Object.keys(result.mixedRecipe.roots),['result']);
});
