import test from 'node:test';
import assert from 'node:assert/strict';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
const o=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
const ids=f=>f.options.map(x=>x.optionId);
const request={constructionKind:'nominal-embed-vnc',source:{embedStem:'cal',embedClass:'zero',embedSourceClass:'zero',matrixStem:'chōca',matrixVerbClass:'A',matrixValence:'intransitive'},relation:'adverb',route:'direct-adverb',adverbRole:'manner',subject:'3sg',mood:'indicative',tense:'present',voice:'active'};
test('nominal receiving decision retains actual reached roles and finite correction before rejection',()=>{
 const ready=o.evaluateClassicalNahuatlNominalConstruction(request);assert.equal(ready.authorizationStatus,'authorized',ready.blockReason);assert(ids(ready.choiceOptionProjection.adverbRole).includes('compared-manner'));assert(ids(ready.choiceOptionProjection.tense).includes('present'));
 const invalid=o.evaluateClassicalNahuatlNominalConstruction({...request,adverbRole:'invented'});assert.equal(invalid.authorizationStatus,'blocked');assert.equal(invalid.choiceOptionProjection.adverbRole.authoredValue,'invented');assert(ids(invalid.choiceOptionProjection.adverbRole).includes('manner'));
 const orientation=o.evaluateClassicalNahuatlNominalConstruction({...request,adverbRole:'compared-manner',orientation:'object'});assert.equal(orientation.authorizationStatus,'blocked');assert.deepEqual(ids(orientation.choiceOptionProjection.orientation),['subject']);assert.equal(orientation.choiceOptionProjection.orientation.authoredValue,'object');
 const tense=o.evaluateClassicalNahuatlNominalConstruction({...request,tense:'invented'});assert.equal(tense.authorizationStatus,'blocked');assert.equal(tense.choiceOptionProjection.tense.authoredValue,'invented');assert(ids(tense.choiceOptionProjection.tense).includes('present'));assert(!ids(tense.choiceOptionProjection.tense).includes('invented'));
});
test('possessor transfer retains an explicit third-person reference choice instead of defaulting to someone else',()=>{
 const source=o.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:'teō',sourceClass:'tl-1-a'});
 const operation=o.buildClassicalNahuatlOrdinaryNncOperationFrame(source,{state:'possessive',possessor:'3sg',subject:'3sg',stemFormation:'plain',predicateFormation:'source-stem',sentenceType:'statement',polarity:'positive',humanness:'human'});
 const noun=o.evaluateClassicalNahuatlOrdinaryNnc(source,operation);assert.equal(noun.authorizationStatus,'authorized',noun.blockReason);
 const projection=o.getClassicalNahuatlNncContinuationSourceConstituents(noun);
 const r={...request,relation:'complement',route:'complement',orientation:'object',complementKind:'considering',source:{...request.source,embedStem:projection.predicateStem,embedClass:'tl',embedSourceClass:'tl-1-a',embedConstituent:{kind:'ordinary-nnc-predicate',stem:projection.predicateStem,resultFrame:noun}}};
 const pending=o.evaluateClassicalNahuatlNominalConstruction(r);assert.equal(pending.authorizationStatus,'blocked');assert.equal(pending.blockReason,'transferred-possessor-reference-choice-required');assert.deepEqual(ids(pending.choiceOptionProjection.embedPossessorCorefersWithSubject),[false,true]);assert.equal(pending.choiceOptionProjection.embedPossessorCorefersWithSubject.selectedValue,undefined);
 for(const choice of [false,true]){const next=o.evaluateClassicalNahuatlNominalConstruction({...r,embedPossessorCorefersWithSubject:choice});assert.equal(next.authorizationStatus,'authorized',next.blockReason);assert.equal(next.operationFrame.targetObjectRequests[0].objectKind,choice?'reflexive':'specific-projective');assert.equal(next.sourceAuthorizationFrame.lexicalFacts.capturedEmbedResult,noun);}
 for(const declared of [false,true]){const bad=o.evaluateClassicalNahuatlNominalConstruction({...r,source:{...r.source,embedPossessorCorefersWithSubject:declared},embedPossessorCorefersWithSubject:!declared});assert.equal(bad.authorizationStatus,'blocked');assert.deepEqual(ids(bad.choiceOptionProjection.embedPossessorCorefersWithSubject),[declared]);}
 const firstOperation=o.buildClassicalNahuatlOrdinaryNncOperationFrame(source,{state:'possessive',possessor:'1sg',subject:'3sg',stemFormation:'plain',predicateFormation:'source-stem',sentenceType:'statement',polarity:'positive',humanness:'human'});
 const firstNoun=o.evaluateClassicalNahuatlOrdinaryNnc(source,firstOperation);assert.equal(firstNoun.authorizationStatus,'authorized');
 const firstSource={...r.source,embedConstituent:{...r.source.embedConstituent,resultFrame:firstNoun}};
 for(const contradiction of [{embedPossessorCorefersWithSubject:false},{subjectReferenceId:'speaker',embedPossessorReferenceId:'someone-else'}]){
  const bad=o.evaluateClassicalNahuatlNominalConstruction({...r,subject:'1sg',source:{...firstSource,...contradiction}});assert.equal(bad.authorizationStatus,'blocked');
 }
 const first=o.evaluateClassicalNahuatlNominalConstruction({...r,subject:'1sg',source:{...r.source,embedPossessorCorefersWithSubject:true},embedPossessorCorefersWithSubject:false});assert.equal(first.authorizationStatus,'blocked');assert.deepEqual(ids(first.choiceOptionProjection.embedPossessorCorefersWithSubject),[true]);
});

test('actual nominal receiving capture retains the offered primitive and exact prepared execution',async()=>{
 const {readFileSync}=await import('node:fs'),vm=await import('node:vm');
 const decision=await import('../ui/composition/owner_operation_protocol.mjs?issuedBinding=20261028-1&ownerDecision=20261031-1');
 const adapter=await import('../ui/composition/nominal_operation_transaction.mjs');
 const {createConstructionSession}=await import('../ui/composition/construction_session.mjs');
 const {executeConstructionPacket}=await import('../ui/composition/construction_packet.mjs');
 const {previewConstructionPacket}=await import('../ui/composition/construction_preview.mjs');
 const initial={...request,source:{...request.source,embedStem:'pil',embedClass:'tli',embedSourceClass:'tli-1'}};
 const source=o.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:'pil',sourceClass:'tli-1'}),ingress=o.getClassicalGrammarApplicationCapabilityNavigator(source),sourceContext=Object.freeze({source,ingress,committed:true});
 let reads=0,makes=0;const control={id:'classical-rule-logic-tense',value:'present',tagName:'SELECT'},doc={getElementById:id=>id===control.id?control:null};
 const target=Object.create(o);Object.defineProperty(target,'document',{value:doc});
 const session=createConstructionSession({isSource:x=>x===source,isResult:x=>o.isClassicalNahuatlNominalConstructionResult(x),execute:p=>{makes++;return executeConstructionPacket(o,p)},present:()=>true});
 const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
 const ctx=vm.createContext({...adapter,...decision,ClassicalConstructionSession:session,ClassicalChoicePreflightTransaction:{},targetObject:target,ActiveClassicalGrammarCapabilityNavigator:ingress,
 ClassicalNominalOperationScopes:new WeakMap(),readClassicalNominalSourceContext:()=>sourceContext,getClassicalNominalConstructionControlValue:()=>request.constructionKind,
 getClassicalPrimitiveCompoundMatrixRequest:()=>null,buildClassicalNominalConstructionUiRequest:()=>{reads++;return initial;},syncOwnerOperationDecisionControls:()=>true,ensureClassicalNncNegativeFormControl:()=>{}});
 for(const name of ['getClassicalRetainedOwnerRequest','getClassicalNominalEmbedChoicePresentation','getClassicalNominalChoicePresentation','captureClassicalOwnerRequestChoiceIntent','readClassicalNominalOperationSnapshot']){
  const a=code.indexOf(`    function ${name}(`);assert(a>=0,name);const b=code.indexOf('\n    }',a)+6;ctx[name]=vm.compileFunction(`return ${code.slice(a,b)}`,[],{contextExtensions:[ctx]})();
 }
 const stage=()=>{const s=ctx.readClassicalNominalOperationSnapshot('grammar:nominal-construction',source,null,null);assert(s?.contract.ready,s?.contract.blockReason);session.stage({source,route:{operation:'grammar:nominal-construction'},slots:s.captures,operationContract:s,execution:adapter.projectNominalOperationExecution(s),ready:true});return s;};
 stage();const before=session.position;assert.equal(decision.findOwnerOperationControlChoice(before.operationContract,control).choiceId,'tense');
 assert(ctx.captureClassicalOwnerRequestChoiceIntent(control,'imperfect'));assert.equal(control.value,'present');const s=stage();
 assert.equal(s.contract.request.tense,'imperfect');assert.equal(reads,1);assert.equal(session.position.accepted,before.accepted);assert.equal(makes,0);
 assert.equal(s.contract.choices.tense,s.contract.preview.choiceOptionProjection.tense);assert.equal(previewConstructionPacket(o,adapter.projectNominalOperationExecution(s)).canonicalResult,s.contract.preview);
 assert.equal(ctx.captureClassicalOwnerRequestChoiceIntent(control,'invented'),null);assert.equal(session.make(),true);assert.equal(makes,1);assert.equal(session.position.accepted.result,s.contract.preview);
 const raw={...initial,tense:'invented'},scope=s.controller,blocked=adapter.issueNominalOperationSnapshot(scope,{ingress,request:raw,sourceContext});assert.equal(blocked.contract.ready,false);assert.equal(blocked.contract.choices.tense.authoredValue,'invented');assert.equal(adapter.projectNominalOperationExecution(blocked),null);assert(ids(blocked.contract.choices.tense).includes('present'));
});
