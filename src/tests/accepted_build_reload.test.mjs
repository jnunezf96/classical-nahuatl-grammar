import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import * as reload from '../application/classical/result_reload.mjs';
const fixture=JSON.parse(readFileSync(new URL('./fixtures/nonce_accepted_build_reload_20261023.json',import.meta.url)));
const makeRuntime=async()=>(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
const r=await makeRuntime(),fresh=await makeRuntime();
function replay(result){const recipe=reload.exportClassicalResultReloadRecipe(r,{result});assert(recipe);const roots=reload.replayClassicalResultReloadRecipe(fresh,JSON.parse(JSON.stringify(recipe)));assert(roots?.result);return roots.result;}
function bind(result,expectedSource){assert.equal(typeof reload.reissueClassicalAcceptedBuildBinding,'function');return reload.reissueClassicalAcceptedBuildBinding(fresh,result,expectedSource);}
function noun(stem){const source=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem,sourceClass:'tl-1-a'});const nav=r.getClassicalGrammarApplicationCapabilityNavigator(source);const binding=r.issueClassicalGrammarTypedSourceOperationBindingFrame(nav,'nnc:ordinary',{subject:'3pl',animacy:'animate',humanness:'human',state:'possessive',possessor:'1sg',possessorReduplication:true,predicateFormation:'yo-matrix'});assert.equal(binding.bindingStatus,'ready');return r.executeClassicalGrammarTypedSourceOperationBindingFrame(binding).canonicalResult;}
function verb(stem,derivation='applicative'){
 const base=r.requestClassicalVncApplicationResult({sourceStem:stem,verbClass:'A',sourceValence:derivation==='causative'?'intransitive':'specific-projective',object:'3sg',subject:'1sg',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active'});assert.equal(base.authorizationStatus,'authorized');
 const nav=r.getClassicalGrammarApplicationCapabilityNavigator(base.resultFrame.sourceMachineryFrame);
 const choices={subject:'1sg',mood:'optative',tense:'nonpast',requestedDerivation:derivation,requestedVoice:'active',sentenceOptions:{introductoryParticle:'mā',sentenceType:'exhortation-sentence'},...(derivation==='applicative'?{applicativeObjectKind:'nonspecific-human'}:{})};
 let binding=r.issueClassicalGrammarTypedSourceOperationBindingFrame(nav,'vnc:application',choices);
 const option=binding.choiceOptionProjection.derivationOptionId.find(o=>o.availabilityStatus==='available'&&o.optionId.includes('type-two'));
 assert(option);binding=r.issueClassicalGrammarTypedSourceOperationBindingFrame(nav,'vnc:application',{...choices,derivationOptionId:option.optionId});assert.equal(binding.bindingStatus,'ready',binding.blockReason);
 const made=r.executeClassicalGrammarTypedSourceOperationBindingFrame(binding);assert.equal(made.authorizationStatus,'authorized');return r.requestClassicalVncSentenceResultFrame(made.canonicalResult);
}

test('NNC reload restores the accepted possession, reduplication, nounstem and number coordinate',()=>{
 for(const stem of fixture.nnc){const original=noun(stem),result=replay(original),before=fresh.getClassicalGrammarWorkspaceHistorySnapshot(),b=bind(result);
 assert.equal(b.bindingStatus,'ready');assert.equal(b.exactSource,result.sourceFrame);
 for(const [key,value] of Object.entries({subject:'3pl',animacy:'animate',humanness:'human',state:'possessive',possessor:'1sg',possessorReduplication:true,predicateFormation:'yo-matrix'}))assert.equal(b.callerSelections[key],value,key);
 assert.deepEqual(fresh.getClassicalGrammarWorkspaceHistorySnapshot(),before);
 assert.equal(result.surfaceRealization,original.surfaceRealization);assert.equal(typeof result.surfaceRealization,'string');
 const edited=fresh.issueClassicalGrammarTypedSourceOperationBindingFrame(b.navigator,b.operationId,{...b.callerSelections,possessor:'2sg'});assert.equal(edited.bindingStatus,'ready');assert.equal(result.operationFrame.possessor,'1sg');assert.deepEqual(fresh.getClassicalGrammarWorkspaceHistorySnapshot(),before);
 const made=fresh.executeClassicalGrammarTypedSourceOperationBindingFrame(edited);assert.equal(made.canonicalResult.operationFrame.possessor,'2sg');assert.notEqual(made.canonicalResult,result);
 }
});
test('VNC sentence reload restores the original Source and conditional derivation, object and sentence intent',()=>{
 for(const [i,stem]of fixture.vnc.entries()){const result=replay(verb(stem,i?'causative':'applicative')),application=result.vncApplicationFrame,b=bind(result);
 assert.equal(b.bindingStatus,'ready',b.blockReason);assert.equal(b.exactSource,application.resultFrame.sourceMachineryFrame);
 assert.equal(b.callerSelections.requestedDerivation,i?'causative':'applicative');assert.match(b.callerSelections.derivationOptionId,/type-two/);
 assert.equal(b.callerSelections.requestedVoice,'active');assert.equal(b.callerSelections.subject,'1sg');assert.equal(b.callerSelections.mood,'optative');assert.equal(b.callerSelections.tense,'nonpast');
 assert.equal(b.callerSelections.sentenceOptions.sentenceType,'exhortation-sentence');if(!i)assert.equal(b.callerSelections.applicativeObjectKind,'nonspecific-human');
 const remade=fresh.executeClassicalGrammarTypedSourceOperationBindingFrame(b);assert.equal(remade.authorizationStatus,'authorized');assert.equal(remade.canonicalResult.resultFrame.surfaceRealization,application.resultFrame.surfaceRealization);assert.equal(remade.canonicalResult.resultFrame.sourceMachineryFrame,b.exactSource);
 const accepted=result,history=fresh.getClassicalGrammarWorkspaceHistorySnapshot();
 const edited=fresh.issueClassicalGrammarTypedSourceOperationBindingFrame(b.navigator,b.operationId,{...b.callerSelections,sentenceOptions:{...b.callerSelections.sentenceOptions,sentenceType:'wish-sentence'}});
 assert.equal(edited.bindingStatus,'ready');assert.equal(result,accepted);assert.deepEqual(fresh.getClassicalGrammarWorkspaceHistorySnapshot(),history);
 const made=fresh.executeClassicalGrammarTypedSourceOperationBindingFrame(edited);assert.equal(made.authorizationStatus,'authorized');assert.equal(made.canonicalResult.normalizedRequest.sentenceOptions.sentenceType,'wish-sentence');assert.notEqual(made.canonicalResult,application);
 }
});
test('restored Build rejects copied Results, foreign runtime and unrelated exact Source',()=>{
 const result=replay(noun(fixture.nnc[0]));assert.equal(bind({...result}),null);assert.equal(reload.reissueClassicalAcceptedBuildBinding(r,result),null);
 const other=fresh.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:fixture.nnc[1],sourceClass:'tl-1-a'});assert.equal(bind(result,other),null);assert.equal(bind(result,result.sourceFrame).bindingStatus,'ready');
});
test('repeated reissuance stages only and preserves accepted ownership and History',()=>{
 const result=replay(verb(fixture.vnc[0])),before=fresh.getClassicalGrammarWorkspaceHistorySnapshot();for(let i=0;i<2;i++){const b=bind(result);assert.equal(b.exactSource,result.vncApplicationFrame.resultFrame.sourceMachineryFrame);assert.deepEqual(fresh.getClassicalGrammarWorkspaceHistorySnapshot(),before);}
});

test('public reload adapter restores an editor without accepting, and refuses a different captured Source',()=>{
 const result=replay(noun(fixture.nnc[0]));const accepted={canonicalResult:result};let staged=null,executions=0;
 const operation={value:''};const ctx=vm.createContext({
 targetObject:{...fresh,document:{getElementById:id=>id==='classical-capability-navigator-operation'?operation:null},executeClassicalGrammarApplicationRequest(){executions++;throw Error('reload editor must not execute');}},
 reissueClassicalAcceptedBuildBinding:reload.reissueClassicalAcceptedBuildBinding,
 ActiveClassicalGrammarResultSourceCapture:null,ActiveClassicalCapabilityApplicationResult:accepted,ActiveClassicalGrammarCapabilityNavigator:null,
 ActiveClassicalCapabilityCommittedTypedSource:null,ActiveClassicalCapabilityCommittedTypedSourceSignature:'',ActiveClassicalGrammarResultBinding:null,
 getClassicalGrammarExactTypedSourceIdentitySignature:source=>source.stem,
 syncClassicalCapabilityNavigator(){},rememberClassicalTypedSourceCapabilitySelection(){},
 stageClassicalGrammarTypedSourceOperationBinding(op,choices){staged=fresh.issueClassicalGrammarTypedSourceOperationBindingFrame(ctx.ActiveClassicalGrammarCapabilityNavigator,op,choices);return staged;},
 getClassicalOrdinaryNncControlProjection:()=>({state:{}}),syncClassicalRuleLogicControlsForSurfaceFrame(){},syncClassicalCapabilityApplyOperationState(){},
 });
 const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8'),a=code.indexOf('    function restoreClassicalAcceptedBuildChoices(');assert(a>=0,'reload must reconnect the accepted owner to Build');const z=code.indexOf('\n    function ',a+1);vm.runInContext(code.slice(a,z),ctx);
 assert.equal(ctx.restoreClassicalAcceptedBuildChoices(result),true);assert.equal(staged.exactSource,result.sourceFrame);assert.equal(staged.callerSelections.possessor,'1sg');assert.equal(operation.value,'nnc:ordinary');assert.equal(ctx.ActiveClassicalCapabilityApplicationResult,accepted);assert.equal(executions,0);
 ctx.ActiveClassicalGrammarResultSourceCapture={canonicalResult:{}};assert.equal(ctx.restoreClassicalAcceptedBuildChoices(result),false);
});

test('public reload restores an Applied position receipt and later edits still require explicit Make',async()=>{
 const {createConstructionSession}=await import('../ui/composition/construction_session.mjs');
 const result=replay(noun(fixture.nnc[0])),binding=bind(result);let executions=0;
 const session=createConstructionSession({isSource:x=>x===binding.exactSource,isResult:x=>x===result,execute(){executions++;},present:()=>true});
 const proposal={source:binding.exactSource,route:{operation:binding.operationId},choices:{possessor:'1sg'},slots:[],ready:true,execution:{signature:'accepted',binding}};
 session.stage({...proposal,choices:{possessor:'3sg'},execution:{...proposal.execution,signature:'old-hash'}});
 session.stage(proposal);assert.equal(session.position.pending.length,1);
 const ctx=vm.createContext({targetObject:fresh,ClassicalConstructionSession:session,classicalRestoredAcceptedBuild:{result,binding},getActiveClassicalGrammarTypedSourceOperationBinding:()=>binding});
 const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8'),a=code.indexOf('    function restoreClassicalReloadPosition(');assert(a>=0);const z=code.indexOf('\n    function ',a+1);vm.runInContext(code.slice(a,z),ctx);
 ctx.restoreClassicalReloadPosition(result);session.stage(proposal);assert.equal(session.position.applied,true);assert.equal(session.position.pending.length,0);assert.equal(session.position.ready,false);assert.equal(session.position.accepted.result,result);assert.equal(executions,0);
 session.stage({...proposal,choices:{possessor:'2sg'},execution:{...proposal.execution,signature:'edited'}});assert.equal(session.position.applied,false);assert.equal(session.position.ready,true);assert.equal(session.position.accepted.result,result);assert.equal(executions,0);
});

test('a nonmatching receipt cannot absorb an unaccepted draft into the restored baseline',async()=>{
 const {createConstructionPosition}=await import('../ui/composition/construction_position.mjs');
 const source={},other={},result={};const store=createConstructionPosition({isSource:x=>x===source||x===other,isResult:x=>x===result});
 const proposal={source,route:{operation:'nnc:ordinary'},slots:[],choices:{possessor:'1sg'},ready:true,execution:{signature:'first'}};
 store.stage(proposal);store.stage({...proposal,choices:{possessor:'2sg'},execution:{signature:'draft'}});
 const historyReceipt={construction:{...store.position.construction,source:other},choices:store.position.choices,executionSignature:'draft'};
 store.restore(result,historyReceipt);assert.equal(store.position.pending.length,1);assert.equal(store.position.baseline.possessor,'1sg');assert.equal(store.position.choices.possessor,'2sg');assert.equal(store.position.accepted.result,result);
});
