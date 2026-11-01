import test from 'node:test';import assert from 'node:assert/strict';import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
const o=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
const request=(overrides={})=>({state:'possessive',possessorId:'1sg',subjectMode:'adverbialized',subjectId:'3common',nounstem:{kind:'classical-nahuatl-nnc-nounstem-request',stemId:'tloc-proximity',formation:'option-one',operation:'relational-nnc',sourceKind:'possessor',sourceFormation:'plain-nounstem',sourceVoice:'active',sourceMode:'whole-stem',sourceStem:'tloc',sourceMatrixStem:'tloc',affective:'none'},...overrides});
const ids=f=>f.options.map(x=>x.optionId);
test('relational target choices are issued with the actual decision, retaining fixed and blocked recovery facts',()=>{
 const r=request(),x=o.evaluateClassicalNahuatlRelationalNnc(r);assert.equal(x.authorizationStatus,'authorized');const c=x.choiceOptionProjection;assert(c);assert.deepEqual(ids(c.state),['possessive']);assert.equal(c.state.editable,false);assert.equal(c.subjectId.selectedValue,'3sg');assert.equal(c.subjectId.editable,false);assert.deepEqual(ids(c.subjectMode),['normal','adverbialized']);assert(ids(c.possessorId).includes('2pl'));assert.deepEqual(ids(c.affective),['none','honorific','pejorative']);
 const bad=o.evaluateClassicalNahuatlRelationalNnc(request({subjectMode:'adverbialized',subjectId:'1sg'}));assert.equal(bad.authorizationStatus,'blocked');assert.equal(bad.choiceOptionProjection.subjectId.authoredValue,'1sg');assert.equal(bad.choiceOptionProjection.subjectId.editable,true);assert.deepEqual(ids(bad.choiceOptionProjection.subjectId),['3sg','3common']);
 const upstream=o.requestClassicalVncApplicationResult({sourceStem:'chōca',verbClass:'A',sourceValence:'intransitive',subject:'1sg',mood:'indicative',tense:'imperfect',requestedVoice:'active'});
 assert.equal(upstream.authorizationStatus,'authorized');
 const upstreamRequest={state:'possessive',possessorId:'2pl',subjectMode:'adverbialized',subjectId:'3common',nounstem:{kind:'classical-nahuatl-nnc-nounstem-request',stemId:'n-locative',operation:'relational-nnc',formation:'option-two',sourceFormation:'imperfect-active',upstreamResult:upstream}};
 const mismatch=o.evaluateClassicalNahuatlRelationalNnc(upstreamRequest);assert.equal(mismatch.authorizationStatus,'blocked');assert.deepEqual(ids(mismatch.choiceOptionProjection.possessorId),['1sg']);assert.equal(mismatch.choiceOptionProjection.possessorId.authoredValue,'2pl');assert.equal(mismatch.choiceOptionProjection.possessorId.editable,true);
 const copy=o.evaluateClassicalNahuatlRelationalNnc({...upstreamRequest,nounstem:{...upstreamRequest.nounstem,upstreamResult:{...upstream}}});assert.equal(copy.authorizationStatus,'blocked');assert.deepEqual(copy.choiceOptionProjection,{});
 const fixed=o.buildClassicalNahuatlRelationalNncTypedSourceFrame(r),made=o.evaluateClassicalNahuatlRelationalNnc(fixed);assert.equal(made.navigatorSourceFrame,fixed);assert(Object.values(made.choiceOptionProjection).every(f=>f.editable===false));
});
test('relational owner subject and affective domains also govern direct target evaluation',()=>{
 for(const change of [{subjectMode:'invented'},{subjectMode:'normal',subjectId:'invented'}]){const x=o.evaluateClassicalNahuatlRelationalNnc(request(change));assert.equal(x.authorizationStatus,'blocked');assert(x.choiceOptionProjection.subjectMode.options.length);}
 const changed=o.evaluateClassicalNahuatlRelationalNnc(request({subjectMode:'normal',subjectId:'2pl',possessorId:'3sg'}));assert.equal(changed.authorizationStatus,'authorized');assert.equal(changed.sourceFrame.subjectId,'2pl');
 const r=request();r.nounstem={...r.nounstem,stemId:'c-means-purpose-reason-time',sourceStem:'c',sourceMatrixStem:'c'};const blocked=o.evaluateClassicalNahuatlRelationalNnc(r);assert.equal(blocked.authorizationStatus,'blocked');assert.deepEqual(ids(blocked.choiceOptionProjection.possessorId),['3common']);assert.equal(blocked.choiceOptionProjection.possessorId.authoredValue,'1sg');assert.equal(blocked.choiceOptionProjection.possessorId.editable,true);
});

test('production relational target capture projects and executes its same issued request without rebuilding Source',async()=>{
 const {readFileSync}=await import('node:fs'),{default:vm}=await import('node:vm');
 const decision=await import('../ui/composition/owner_operation_protocol.mjs?issuedBinding=20261028-1&ownerDecision=20261031-1');
 const adapter=await import('../ui/composition/derived_formation_transaction.mjs');
 const {createConstructionSession}=await import('../ui/composition/construction_session.mjs');
 const {executeConstructionPacket}=await import('../ui/composition/construction_packet.mjs');
 const {previewConstructionPacket}=await import('../ui/composition/construction_preview.mjs');
 const ns=o.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:'ā',sourceClass:'tl-1-a'}),no=o.buildClassicalNahuatlOrdinaryNncOperationFrame(ns,{state:'absolutive',subject:'3common',predicateFormation:'source-stem'}),source=o.requestClassicalOrdinaryNncResult(ns,no);
 const binding={operationId:'nnc:relational',exactResult:source,ownerBindingFrame:o.issueClassicalNahuatlFormationResultBindingFrame('nnc:relational',source),selectedBindingId:'relational-source:ordinary-nnc-general-use:ca-means'},ingress=o.getClassicalGrammarApplicationCapabilityNavigator(source);
 const initial={state:'absolutive',subjectMode:'adverbialized',subjectId:'3common',nounstem:{kind:'classical-nahuatl-nnc-nounstem-request',stemId:'ca-means',operation:'relational-nnc',formation:'option-three',sourceFormation:'ordinary-nnc-general-use',sourceKind:'nounstem',sourceMode:'embed-matrix',sourceMatrixStem:'ca',upstreamResult:source}};
 let reads=0,makes=0;const control={id:'classical-relational-nnc-affective',value:'none',tagName:'SELECT'},doc={getElementById:id=>id===control.id?control:null};
 const target=Object.create(o);Object.defineProperties(target,{document:{value:doc},getClassicalRelationalNncUiRequest:{value:()=>{reads++;return initial;}}});
 const session=createConstructionSession({isSource:x=>x===source,isResult:x=>o.isClassicalNahuatlRelationalResult(x),execute:p=>{makes++;return executeConstructionPacket(o,p)},present:()=>true});
 const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
 const ctx=vm.createContext({...adapter,...decision,ClassicalConstructionSession:session,ClassicalChoicePreflightTransaction:{},targetObject:target,ActiveClassicalGrammarCapabilityNavigator:ingress,
 ClassicalDerivedFormationScopes:new WeakMap(),ClassicalNominalSourceVncRefusals:new WeakSet(),getClassicalNativeDerivedIngress:()=>null,readClassicalNominalSourceContext:()=>null,
 getActiveClassicalGrammarResultBinding:()=>binding,applyClassicalRelationalExactResultBinding:r=>r,syncOwnerOperationDecisionControls:()=>true,
 HandledClassicalContinuationChoiceEvents:new WeakSet(),scheduleClassicalVncReloadSave:()=>{}});
 for(const name of ['getClassicalRetainedOwnerRequest','getClassicalRelationalChoicePresentation','captureClassicalOwnerRequestChoiceIntent','readClassicalDerivedFormationSnapshot','stageClassicalRelationalOwnerChoice']){
  const a=code.indexOf(`    function ${name}(`),b=code.indexOf('\n    }',a)+6;vm.runInContext(code.slice(a,b),ctx);
 }
 const stage=()=>{const s=ctx.readClassicalDerivedFormationSnapshot('nnc:relational',source,binding,null);assert(s?.contract.ready,s?.contract.blockReason);session.stage({source,route:{operation:'nnc:relational',binding:binding.selectedBindingId},slots:s.captures,operationContract:s,execution:adapter.projectDerivedFormationExecution(s),ready:s.contract.ready});return s;};
 ctx.syncClassicalCapabilityApplyOperationState=stage;stage();const before=session.position;
 ctx.captureClassicalOwnerRequestChoiceIntent(control,'honorific');assert.equal(control.value,'none');assert.equal(ctx.stageClassicalRelationalOwnerChoice(control,{}),true);
 let s=session.position.operationContract;assert.equal(s.contract.request.nounstem.affective,'honorific');assert.equal(s.contract.request.nounstem.upstreamResult,source);assert.equal(reads,1);assert.equal(session.position.accepted,before.accepted);assert.equal(makes,0);
 const p=adapter.projectDerivedFormationExecution(s);assert.equal(previewConstructionPacket(o,p).canonicalResult,s.contract.preview);assert.equal(session.make(),true);assert.equal(makes,1);const accepted=session.position.accepted;
 ctx.ClassicalChoicePreflightTransaction={};ctx.captureClassicalOwnerRequestChoiceIntent(control,'pejorative');ctx.stageClassicalRelationalOwnerChoice(control,{});s=session.position.operationContract;assert.equal(s.contract.preview.sourceFrame.affective,'pejorative');assert.equal(session.position.accepted,accepted);assert.equal(makes,1);assert.equal(reads,1);
 assert.equal(ctx.captureClassicalOwnerRequestChoiceIntent(control,'invented'),null);
});
