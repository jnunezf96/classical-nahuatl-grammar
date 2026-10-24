import test from 'node:test';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import {exportClassicalResultReloadRecipe as save,replayClassicalResultReloadRecipe as load,matchesAcceptedVncContinuationBuild,matchesAcceptedNominalCompoundBuild} from '../application/classical/result_reload.mjs';
import {previewConstructionPacket} from '../ui/composition/construction_preview.mjs';
import {executeConstructionPacket} from '../ui/composition/construction_packet.mjs';
import {createConstructionSession} from '../ui/composition/construction_session.mjs';
import {projectResultForEditing} from '../ui/composition/result_editing.mjs';
import {exportClassicalGrammarWorkspaceHistoryReloadState as saveHistory,restoreClassicalGrammarWorkspaceHistoryReloadState as loadHistory} from '../application/classical/grammar_workspace_history.mjs';
const f=JSON.parse(readFileSync(new URL('./fixtures/nonce_nominal_compound_reload_20261024.json',import.meta.url)));
const runtime=async()=>(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
const r=await runtime(),finite={subject:'3sg',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active'};
function execute(r,operationId,args){const a=r.executeClassicalGrammarApplicationRequest({operationId,args});assert.equal(a.authorizationStatus,'authorized',a.blockReason);return a.canonicalResult;}
function noun(r,stem){const s=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem,sourceClass:'tl-1-a'}),o=r.buildClassicalNahuatlOrdinaryNncOperationFrame(s,{state:'absolutive',subject:'3sg'});return execute(r,'nnc:ordinary',[s,o]);}
function compound(r,i=0){const stem=f.verbs[i],n=noun(r,f.nouns[i]),v=execute(r,'vnc:application',[{...finite,sourceStem:stem,verbClass:'A',sourceValence:'specific-projective',objectKind:'specific-projective',objectPerson:'3sg'}]);const request={constructionKind:'nominal-embed-vnc',relation:'object',route:'object',subject:'3sg',mood:'indicative',tense:'present',voice:'active',adverbRole:'means',complementTargetReferenceId:'',embedShapeVariant:'ordinary',embedBoundarySpelling:'',supplementObjectId:'',complementKind:'',embedReduplication:'none',matrixFormation:'ordinary',matrixReduplication:'none',orientation:'not-applicable',possessorReferenceId:'',directionalPrefix:'',nonactiveOptionId:'',source:{objectPerson:'3sg',subjectReferenceId:'matrix-subject',objectReferenceIds:['source-object-1'],possessorReferenceCandidates:[],embedState:'absolutive',possessionKind:'intimate',embedStem:f.nouns[i],embedClass:'tl',embedSourceClass:'tl-1-a',embedConstituent:{kind:'ordinary-nnc',stem:f.nouns[i],resultFrame:n},matrixStem:stem,matrixValence:'specific-projective',matrixVerbClass:'A',matrixConstituent:{kind:'vnc-result',stem,resultFrame:v}}};return {n,v,request,whole:execute(r,'grammar:nominal-construction',[request])};}
const choice=variant=>({lateOperation:'frequentative',lateVariant:variant,frequentativeRepetitions:1,frequentativeTarget:'lexical-stem',frequentativeScope:'open'});
function bind(r,whole,variant='ordinary-long'){const b=r.issueClassicalNahuatlVncContinuationBindingFrame('vnc:derivational-operation',whole,choice(variant));assert.equal(b.bindingStatus,'ready',b.blockReason);assert.equal(b.exactInputResult,whole);return b;}
const packet=(whole,b)=>({kind:'request',operation:b.operationId,source:whole,choices:b.callerSelections,request:{operationId:b.operationId,args:b.executionArgs},signature:JSON.stringify(b.callerSelections)});
function stage(r,accepted,whole,b){const s=createConstructionSession({isSource:()=>true,isResult:x=>Boolean(projectResultForEditing(r,x)),execute:p=>executeConstructionPacket(r,p),present:()=>true});s.restore(accepted,null);s.stage({source:whole,route:{operation:b.operationId},choices:b.callerSelections,slots:[],ready:true,execution:packet(whole,b)});return s;}

test('later stem operations consume the exact whole nominal compound and preserve it through preview/Make',()=>{
 const {whole}=compound(r),nav=r.getClassicalGrammarApplicationCapabilityNavigator(whole),path=nav.operations.find(p=>p.operationId==='vnc:derivational-operation');
 assert(path.ownerBindingInputResult===whole,'the inner verb must not substitute for the latest Result');
 const b=bind(r,whole),before=r.getClassicalGrammarWorkspaceHistorySnapshot(),preview=previewConstructionPacket(r,packet(whole,b));assert(preview?.isCurrent());assert.deepEqual(r.getClassicalGrammarWorkspaceHistorySnapshot(),before);
 const s=stage(r,whole,whole,b);assert.equal(s.position.accepted.result,whole);assert(s.make());const made=s.position.accepted.result;
 assert.equal(made.surfaceRealization,preview.surface);assert(r.getClassicalNahuatlVncContinuationSourceConstituents(made.baseApplicationFrame).canonicalNominalSourceResultFrame===whole);
 const graph=r.getClassicalGrammarApplicationLayerGraph(made);assert(graph?.nodes?.some(n=>n.canonicalResult===whole),'the continued Result graph must retain the whole nominal parent');
 const second=bind(r,whole,'ordinary-short-glottal'),s2=stage(r,made,whole,second);assert.equal(s2.position.accepted.result,made);assert(s2.make());assert.notEqual(s2.position.accepted.result,made);
 assert.notEqual(r.issueClassicalNahuatlVncContinuationBindingFrame(b.operationId,{...whole},choice('ordinary-long')).bindingStatus,'ready');
});

test('nominal compound reload reissues both exact operands once and retains their analysis',async()=>{
 const {whole,n,v}=compound(r,1),recipe=save(r,{result:whole,noun:n,matrix:v});assert(recipe,'nominal compound must have an input graph');
 const fresh=await runtime(),roots=load(fresh,JSON.parse(JSON.stringify(recipe)));assert(roots);
 const facts=roots.result.sourceAuthorizationFrame.lexicalFacts;assert(facts.capturedEmbedResult===roots.noun);assert(facts.capturedMatrixVncResult===roots.matrix);assert.equal(roots.result.wordSurface,whole.wordSurface);assert.equal(roots.result.canonicalResult.normalizedRequest.sourceValence,'intransitive');
 assert.equal(save(r,{result:{...whole}}),null);
});

test('continued compound and its whole Source survive reload and further Make-only edits',async()=>{
 const {whole,n,v}=compound(r,2),b=bind(r,whole),made=execute(r,b.operationId,b.executionArgs),recipe=save(r,{result:made,source:whole,noun:n,matrix:v});assert(recipe);
 const fresh=await runtime(),roots=load(fresh,JSON.parse(JSON.stringify(recipe)));assert(roots);assert.equal(roots.result.surfaceRealization,made.surfaceRealization);
 assert(fresh.getClassicalNahuatlVncContinuationSourceConstituents(roots.result.baseApplicationFrame).canonicalNominalSourceResultFrame===roots.source);
 const next=bind(fresh,roots.source,'ordinary-short-glottal'),s=stage(fresh,roots.result,roots.source,next);assert.equal(s.position.accepted.result,roots.result);assert(s.make());
 const again=save(fresh,{result:s.position.accepted.result,source:roots.source});assert(again);const roots2=load(await runtime(),JSON.parse(JSON.stringify(again)));assert(roots2);assert.equal(roots2.result.surfaceRealization,s.position.accepted.result.surfaceRealization);
});

test('nominal compound history stays supported and forged input graphs cannot flatten or smuggle authority',async()=>{
 const {whole,n,v}=compound(r),recipe=save(r,{result:whole,noun:n,matrix:v});assert(recipe);const history=saveHistory(r);assert.equal(history.status,'supported');const fresh=await runtime();assert(loadHistory(fresh,JSON.parse(JSON.stringify(history))));
 const copy=JSON.parse(JSON.stringify(recipe)),node=copy.nodes.find(n=>n.type==='nominal:compound');assert(node,'nominal input node is explicit');node.request.surface='forged';assert.equal(load(await runtime(),copy),null);
 const forward=JSON.parse(JSON.stringify(recipe)),target=forward.nodes.find(n=>n.type==='nominal:compound');target.request.source.matrixConstituent.resultFrame={resultRef:999};assert.equal(load(await runtime(),forward),null);
});


test('reload Applied receipts require exact nominal operands and the actual accepted choices',async()=>{
 const {whole,n,v,request}=compound(r,1);
 const position={construction:{source:v,sourcePending:false,route:{operation:'grammar:nominal-construction'}},execution:{kind:'request',operation:'grammar:nominal-construction',source:v,request:{operationId:'grammar:nominal-construction',args:[request]}}};
 assert(matchesAcceptedNominalCompoundBuild(r,whole,position));
 assert.equal(matchesAcceptedNominalCompoundBuild(r,whole,{...position,execution:{...position.execution,request:{operationId:'grammar:nominal-construction',args:[{...request,subject:'2sg'}]}}}),false);
 assert.equal(matchesAcceptedNominalCompoundBuild(r,whole,{...position,execution:{...position.execution,request:{operationId:'grammar:nominal-construction',args:[{...request,source:{...request.source,embedConstituent:{...request.source.embedConstituent,resultFrame:{...n}}}}]}}}),false);
 const b=bind(r,whole),made=execute(r,b.operationId,b.executionArgs),ready=bind(r,whole),session=stage(r,made,whole,ready);
 assert(matchesAcceptedVncContinuationBuild(r,made,ready,session.position));
 const changed=bind(r,whole,'ordinary-short-glottal');assert.equal(matchesAcceptedVncContinuationBuild(r,made,changed,stage(r,made,whole,changed).position),false);
});

test('nominal noun compound choices and exact operands survive reload without singular-only flattening',async()=>{
 const a=noun(r,f.nouns[2]),b=noun(r,f.nouns[3]);
 const request={constructionKind:'compound-nnc',structure:'integrated',state:'absolutive',subject:'3pl',animacy:'animate',source:{embedStem:f.nouns[2],embedClass:'tl',embedSourceClass:'tl-1-a',matrixStem:f.nouns[3],matrixClass:'tl',matrixSourceClass:'tl-1-a',embedConstituent:{kind:'ordinary-nnc',stem:f.nouns[2],resultFrame:a},matrixConstituent:{kind:'ordinary-nnc',stem:f.nouns[3],resultFrame:b}}};
 const whole=execute(r,'grammar:nominal-construction',[request]),recipe=save(r,{result:whole,embed:a,matrix:b});assert(recipe);
 const fresh=await runtime(),roots=load(fresh,JSON.parse(JSON.stringify(recipe)));assert(roots);assert.equal(roots.result.wordSurface,whole.wordSurface);assert.equal(roots.result.typedSlotFrame.subjectNumber,'plural');
 assert(fresh.getClassicalNahuatlNominalCompoundReloadInputs(roots.result).source.embedConstituent.resultFrame===roots.embed);
});


test('copied or incompatible whole Source is refused by owner, preview and Make without changing accepted Result',()=>{
 const {whole}=compound(r),valid=bind(r,whole),accepted=stage(r,whole,whole,valid);
 for(const invalid of [{...whole},noun(r,f.nouns[3])]){
  const b=r.issueClassicalNahuatlVncContinuationBindingFrame('vnc:derivational-operation',invalid,choice('ordinary-long'));assert.notEqual(b.bindingStatus,'ready');
  const p={kind:'request',operation:'vnc:derivational-operation',source:invalid,request:{operationId:'vnc:derivational-operation',args:[{...choice('ordinary-long'),sourceApplicationFrame:invalid}]}};
  assert.equal(previewConstructionPacket(r,p),null);
  let rejected;
  try{rejected=executeConstructionPacket(r,p);}catch(error){assert.match(error.message,/classical-grammar-application-request-invalid/);}
  assert(!rejected || rejected.authorizationStatus==='blocked','execution must refuse the invalid whole');
  assert(accepted.position.accepted.result===whole);
 }
 assert(accepted.make());assert.notEqual(accepted.position.accepted.result,whole);
});

test('ordinary object incorporation is ready without the unrelated possessive-adverb supplement choice',()=>{
 const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
 const start=code.indexOf('      const head = targetObject.document?.getElementById?.("classical-nominal-embed-supplement-object");',code.indexOf('function syncClassicalCapabilityApplyOperationState'));
 const end=code.indexOf('      if (missingSupplementHead)',start);assert(start>=0 && end>start);
 const fragment=code.slice(start,end)+'\nmissingSupplementHead;';
 const check=(relation,route)=>vm.runInNewContext(fragment,{binding:{operationId:'grammar:nominal-construction'},targetObject:{document:{getElementById:()=>({disabled:false,value:'',closest:()=>({hidden:false})})}},getClassicalNominalEmbedOperands:()=>true,getClassicalNominalConstructionControlValue:id=>id==='classical-nominal-embed-role'?relation:route});
 assert.equal(check('object','object'),false);assert.equal(check('adverb','direct-adverb'),false);assert.equal(check('adverb','supplement-object'),true);
});
