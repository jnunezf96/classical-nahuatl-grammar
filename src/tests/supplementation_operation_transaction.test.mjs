import test from 'node:test';
import assert from 'node:assert/strict';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
const routes=['supplementation','vocative','rumored-report','deleted-principal','negative-ac-plural','contextual-first-person-realization','exclamatory-utterance','such-that-adjunction'];
for(const relation of routes)test(`${relation} issues current owner frame even while required inputs are absent`,()=>{
 const c=r.createClassicalClauseRelationController(),contract=c.buildDecisionContract({relation});
 assert.ok(contract.currentChoiceFrame);assert.equal(contract.currentChoiceFrame.familyId,relation);
 assert.equal(contract.currentChoiceFrame.outcome.readyToMake,contract.authorizationStatus==='authorized');
 for(const d of contract.currentChoiceFrame.decisions)assert.ok(d.key,`${relation}:${d.id}`);
 assert.equal(c.transitionSentenceChoice({selections:{relation},expectedFrame:{...contract.currentChoiceFrame},intent:{type:'clear-capture',role:'principal'}}).authorizationStatus,'blocked');
});
import {issueClauseOperationSnapshot,isCurrentClauseOperationSnapshot,transitionClauseOperationSnapshot} from '../ui/composition/clause_operation_transaction.mjs';
const noun=subject=>{const source=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:'oquich',sourceClass:'tli-1'});const b=r.issueClassicalGrammarTypedSourceOperationBindingFrame(r.getClassicalGrammarApplicationCapabilityNavigator(source),'nnc:ordinary',{subject,humanness:'human',state:'absolutive',predicateFormation:'source-stem',...(subject.endsWith('pl')?{pluralConnector:'t-in'}:{})});return r.executeClassicalGrammarTypedSourceOperationBindingFrame(b).canonicalResult;};
test('shared snapshot preserves actual branded context and exact captures, invalidates changed context, restores required input',()=>{
 const left=noun('3sg'),right=noun('3sg'),c=r.createClassicalClauseRelationController();
 const context=c.issueDiscourseSourceContextFrame({speakerGender:'male',speakerGroupMembership:'member'});
 c.captureCurrentResult('principal',left);c.captureCurrentResult('adjoined',right,context);
 const choices={relation:'supplementation',supplementationReferenceMode:'shared',supplementationHeadRole:'subject',supplementationContactRole:'subject',supplementationOrder:'principal-first'};
 const snapshot=issueClauseOperationSnapshot(c,choices,left);assert.ok(snapshot);assert.equal(snapshot.contract.authorizationStatus,'authorized');
 assert.equal(snapshot.captures.find(x=>x.role==='adjoined:discourse-context').exact,context);
 assert.equal(isCurrentClauseOperationSnapshot(snapshot),true);
 const cleared=transitionClauseOperationSnapshot(snapshot,{type:'clear-capture',role:'adjoined'},snapshot.contract.currentChoiceFrame);assert.ok(cleared.snapshot);assert.equal(cleared.snapshot.contract.authorizationStatus,'blocked');assert.equal(isCurrentClauseOperationSnapshot(snapshot),false);
 const copied=transitionClauseOperationSnapshot(cleared.snapshot,{type:'capture',role:'adjoined',result:{...right},context},cleared.snapshot.contract.currentChoiceFrame);assert.equal(copied.authorizationStatus,'blocked');
 const restored=transitionClauseOperationSnapshot(cleared.snapshot,{type:'capture',role:'adjoined',result:right,context},cleared.snapshot.contract.currentChoiceFrame);assert.equal(restored.authorizationStatus,'authorized');assert.equal(restored.snapshot.contract.authorizationStatus,'authorized');
 assert.equal(restored.snapshot.captures.find(x=>x.role==='adjoined:discourse-context').exact,context);
 const made=c.compose(restored.snapshot.selections);assert.equal(made.authorizationStatus,'authorized',made.blockReason);
 c.captureCurrentResult('adjoined',right,c.issueDiscourseSourceContextFrame({speakerGender:'female',speakerGroupMembership:'member'}));assert.equal(isCurrentClauseOperationSnapshot(restored.snapshot),false);
});
import {createIssuedBindingOperationScope,issueIssuedBindingOperationSnapshot,matchesIssuedBindingExecutionPacket} from '../ui/composition/issued_binding_operation_transaction.mjs';
import {createConstructionSession} from '../ui/composition/construction_session.mjs';
test('lexicalized fixed typed ingress preserves issued source and exact binding without new choices',()=>{
 const source=r.resolveClassicalNahuatlLexicalizedNncSourceFrame({enteredStem:'michin īīx',sourceUse:'lexicalized-nnc'}),navigator=r.getClassicalGrammarApplicationCapabilityNavigator(source);
 const binding=r.issueClassicalGrammarTypedSourceOperationBindingFrame(navigator,'sentence:supplementation',{});
 const session=createConstructionSession({isSource:x=>x===source,isResult:()=>true});
 const scope=createIssuedBindingOperationScope({owner:r,source,operationId:'sentence:supplementation',ingressKind:'typed',navigator,session,getIngress:()=>navigator,reissue:selections=>r.issueClassicalGrammarTypedSourceOperationBindingFrame(navigator,'sentence:supplementation',selections)});
 const snapshot=issueIssuedBindingOperationSnapshot(scope,binding,navigator);assert.ok(snapshot);assert.deepEqual(snapshot.contract.choices,{});
 const packet={kind:'typed',operation:'sentence:supplementation',source,binding,choices:binding.effectiveSelections};assert.equal(matchesIssuedBindingExecutionPacket(snapshot,packet),true);assert.equal(matchesIssuedBindingExecutionPacket(snapshot,{...packet,binding:{...binding}}),false);
 const made=r.executeClassicalGrammarTypedSourceOperationBindingFrame(snapshot.contract.binding);assert.equal(made.authorizationStatus,'authorized',made.blockReason);
 assert.equal(issueIssuedBindingOperationSnapshot(scope,{...binding},navigator),null);
});

import * as a from '../ui/composition/clause_operation_transaction.mjs';
test('actual saved required-slot supply and principal replacement keep owner source and fresh session exact',async()=>{
 const {readFileSync}=await import('node:fs'),{default:vm}=await import('node:vm');const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');const left=noun('3sg'),right=noun('3sg'),replacement=noun('3sg');
 const c=r.createClassicalClauseRelationController();c.captureCurrentResult('principal',left);const selections={relation:'supplementation',supplementationReferenceMode:'shared',supplementationHeadRole:'subject',supplementationContactRole:'subject',supplementationOrder:'principal-first'},snapshot=a.issueClauseOperationSnapshot(c,selections,left);
 const owner=r.issueClassicalClauseRelationBindingFrame('sentence:supplementation',left,['principal']),binding={family:'clause-relation',operationId:'sentence:supplementation',exactResult:left,ownerBindingFrame:owner,bindingIds:owner.bindingIds,selectedBindingId:'supplementation:principal',requiredResultRoles:['adjoined']};
 const session=createConstructionSession({isSource:x=>[left,right,replacement].includes(x),isResult:()=>false});session.stage({source:left,route:{operation:'sentence:supplementation'},operationContract:snapshot,ready:false});
 const ctx=vm.createContext({issueComparisonOperationSnapshot:a.issueClauseOperationSnapshot,isCurrentComparisonOperationSnapshot:a.isCurrentClauseOperationSnapshot,readComparisonOperationSelections:a.readClauseOperationSelections,ActiveClassicalGrammarResultBinding:binding,ActiveClassicalGrammarResultSourceCapture:null,issueClassicalClauseRelationCurrentDiscourseSourceContextFrame:()=>null,ClassicalClauseRelationStatusMessage:'',syncClassicalContinuationTarget(){},syncClassicalGrammarWorkspaceHistory(){},targetObject:{...r,document:{getElementById:()=>null}},ActiveClassicalGrammarCapabilityNavigator:r.getClassicalGrammarApplicationCapabilityNavigator(left),ClassicalConstructionSession:session,ClassicalComparisonTransitionDraft:null,ClassicalClauseRelationSelections:selections,getClassicalClauseRelationControllerForRendering:()=>c,getClassicalResultEditProposal:()=>null,PendingClassicalOrdinaryGrammarBinding:null,PendingClassicalResultEdit:null,getActiveClassicalGrammarTypedSourceOperationBinding:()=>null,syncClassicalPositionFixedChoices(){},ClassicalPositionSources:new WeakSet(),getConstructionLayerReadiness:()=>({ready:true}),hasCurrentClauseProjection:()=>false,getClassicalOwnerIssuedResultProjection:x=>({canonicalResult:x}),getClassicalMissingSourceSlots:()=>[],ClassicalWritingSourceMode:false,freezeConstructionData:x=>x,isDerivedFormationOperation:()=>false,readClassicalPersonalNameSnapshot:()=>null,readClassicalDenominalSnapshot:()=>null,readClassicalPlaceGentilicSnapshot:()=>null,readClassicalVerbalDerivationSnapshot:()=>null,readClassicalDerivedFormationSnapshot:()=>null,readClassicalNominalOperationSnapshot:()=>null,readClassicalIssuedBindingSnapshot:()=>null});
 ctx.getActiveClassicalGrammarResultBinding=()=>ctx.ActiveClassicalGrammarResultBinding;
 ctx.enterClassicalGrammarResultBindingChoice=(id,options)=>{assert.equal(options.allowExecution,false);return c.applyBindingFrame(ctx.ActiveClassicalGrammarResultBinding.ownerBindingFrame,id).authorizationStatus==='authorized';};
 for(const name of ['getClassicalComparisonOperationSnapshot','readClassicalClauseSelections','readClassicalClauseContract','readClassicalConstructionProposal','canClassicalSavedResultFillBinding','supplyClassicalGrammarWorkspaceResultToBinding']){const start=code.indexOf(`    function ${name}(`);vm.runInContext(code.slice(start,code.indexOf('\n    function ',start+20)),ctx);}
 ctx.syncClassicalCapabilityApplyOperationState=()=>session.stage(ctx.readClassicalConstructionProposal({operationId:'sentence:supplementation',ready:false}));
 assert.equal(ctx.canClassicalSavedResultFillBinding(binding,right),true);assert.equal(ctx.supplyClassicalGrammarWorkspaceResultToBinding({canonicalResult:right}),true);assert.equal(c.getCapturedCanonicalResult('adjoined'),right);assert.equal(ctx.getClassicalComparisonOperationSnapshot().source,left);
 const fresh=ctx.getClassicalComparisonOperationSnapshot(),missing=a.transitionClauseOperationSnapshot(fresh,{type:'clear-capture',role:'principal'},fresh.contract.currentChoiceFrame).snapshot;session.stage({source:left,route:{operation:'sentence:supplementation'},operationContract:missing,ready:false});ctx.ActiveClassicalGrammarResultBinding={...ctx.ActiveClassicalGrammarResultBinding,requiredResultRoles:['principal']};
 assert.equal(ctx.canClassicalSavedResultFillBinding(ctx.ActiveClassicalGrammarResultBinding,{...replacement}),false);assert.equal(ctx.canClassicalSavedResultFillBinding(ctx.ActiveClassicalGrammarResultBinding,replacement),true);
 assert.equal(ctx.supplyClassicalGrammarWorkspaceResultToBinding({canonicalResult:replacement}),true);const final=ctx.getClassicalComparisonOperationSnapshot();assert.ok(a.isCurrentClauseOperationSnapshot(final));assert.equal(final.source,replacement);assert.equal(ctx.ActiveClassicalGrammarCapabilityNavigator.exactResult,replacement);assert.equal(ctx.ActiveClassicalGrammarResultBinding.exactResult,replacement);assert.equal(final.selections.supplementationReferenceMode,'shared');assert.equal(c.getCapturedCanonicalResult('adjoined'),right);assert.equal(ctx.ClassicalComparisonTransitionDraft,null);assert.equal(session.position.accepted.result,null);
});


const v=(sourceStem,extra={})=>{const made=r.executeClassicalGrammarApplicationRequest({operationId:'vnc:application',args:[{sourceStem,verbClass:sourceStem==='mati'?'B':'A',sourceValence:'intransitive',subject:'3sg',mood:'indicative',tense:'present',requestedVoice:'active',requestedDerivation:'direct',sourceInitialISelection:'real',...extra}]});assert.equal(made.authorizationStatus,'authorized',`${sourceStem}:${made.blockReason}`);return made.canonicalResult;};
const particle=id=>r.executeClassicalGrammarApplicationRequest({operationId:'particle:result',args:[r.buildClassicalNahuatlParticleSourceFrame(id)]}).canonicalResult;
const cases=[
 {relation:'vocative',parents:()=>({principal:noun('3sg')}),choices:{vocativeCompanion:'standalone'},context:{speakerGender:'male'}},
 {relation:'rumored-report',parents:()=>({principal:v('il',{sourceValence:'specific-projective',objectKind:'specific-projective',objectPerson:'3sg',tense:'preterit'}),adjoined:v('yā',{subject:'3pl',tense:'preterit'})}),choices:{mach:'present',fuseQuilMach:'fused',reportAdjunctor:'in'}},
 {relation:'deleted-principal',parents:()=>({principal:v('nanquilia',{subject:'1sg',sourceValence:'specific-projective',objectKind:'specific-projective',objectPerson:'3pl'}),dependent:v('ilhuia',{subject:'1sg',sourceValence:'multiple-object',objectRequests:[{objectId:'reported-supplement',objectKind:'specific-projective',objectPerson:'3sg',governor:'directive',derivationalLevel:1},{objectId:'addressees',objectKind:'specific-projective',objectPerson:'3pl',governor:'applicative',derivationalLevel:2}]}),adjoined:v('yā',{subject:'3pl',tense:'preterit'})}),choices:{speechDirectness:'direct'}},
 {relation:'negative-ac-plural',parents:()=>({principal:v('ā',{subject:'3pl',tense:'present',sentenceOptions:{sentenceType:'assertion',negative:true}})}),choices:{}},
 {relation:'contextual-first-person-realization',parents:()=>({principal:v('mati',{subject:'1sg',sourceValence:'mainline-reflexive',objectKind:'reflexive'})}),choices:{contextualSilentFirstPerson:'present'}},
 {relation:'exclamatory-utterance',parents:()=>({principal:particle('l58-oc-eh')}),choices:{exclamatoryPersonalPronounVariant:'default'}},
 {relation:'such-that-adjunction',parents:()=>({principal:particle('l58-quemah')}),choices:{}}
];
for(const item of cases)test(`${item.relation} genuine owner path remains executable through shared snapshot`,()=>{
 const c=r.createClassicalClauseRelationController(),parents=item.parents(),selections={relation:item.relation,...item.choices};
 for(const [role,result]of Object.entries(parents)){assert.ok(result,`${item.relation}:${role}`);assert.equal(c.captureCurrentResult(role,result,item.context?c.issueDiscourseSourceContextFrame(item.context):null).authorizationStatus,'authorized');}
 const snapshot=a.issueClauseOperationSnapshot(c,selections,parents.principal);assert.ok(snapshot);assert.equal(snapshot.contract.authorizationStatus,'authorized',JSON.stringify(snapshot.contract.diagnostics));
 const made=c.compose(snapshot.selections);assert.equal(made.authorizationStatus,'authorized',made.blockReason);
 for(const [role,result]of Object.entries(parents))assert.equal(snapshot.captures.find(x=>x.role===role).exact,result);
});

test('actual production choice handler publishes supplementation session without writing legacy intent',async()=>{
 const {readFileSync}=await import('node:fs'),{default:vm}=await import('node:vm');const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
 for(const item of [{choices:{relation:'supplementation',supplementationReferenceMode:'shared',supplementationHeadRole:'subject',supplementationContactRole:'subject',supplementationOrder:'principal-first'},left:noun('3sg'),right:noun('3sg')}]){const selections=item.choices,left=item.left,right=item.right;
 const c=r.createClassicalClauseRelationController();c.captureCurrentResult('principal',left);c.captureCurrentResult('adjoined',right);const snapshot=a.issueClauseOperationSnapshot(c,selections,left);
 const session=createConstructionSession({isSource:x=>[left,right].includes(x),isResult:()=>false});const proposal=s=>({source:left,route:{operation:'sentence:supplementation'},slots:s.captures,choices:s.selections,operationContract:s,ready:false});session.stage(proposal(snapshot));
 const ctx=vm.createContext({SUPPLEMENTATION_OPERATION_ROUTES:routes,targetObject:r,issueComparisonOperationSnapshot:a.issueClauseOperationSnapshot,isCurrentComparisonOperationSnapshot:a.isCurrentClauseOperationSnapshot,readComparisonOperationSelections:a.readClauseOperationSelections,transitionComparisonOperationSnapshot:a.transitionClauseOperationSnapshot,ClassicalConstructionSession:session,ClassicalClauseRelationSelections:selections,ClassicalComparisonTransitionDraft:null,ActiveClassicalGrammarCapabilityNavigator:{exactSource:left},ClassicalPositionExecuting:false,ClassicalPositionStaging:false,ActiveClassicalClauseRelationResult:null,ClassicalClauseRelationStatusMessage:'',getClassicalClauseRelationControllerForRendering:()=>c,refreshClassicalClauseRelationWorkflow:()=>{const current=ctx.ClassicalComparisonTransitionDraft||session.position.operationContract;if(current)session.stage(proposal(current));}});
 for(const name of ['getClassicalComparisonOperationSnapshot','readClassicalClauseSelections','readClassicalClauseContract','applyClassicalComparisonChoiceIntent']){const start=code.indexOf(`    function ${name}(`);vm.runInContext(code.slice(start,code.indexOf('\n    function ',start+20)),ctx);}
 const key='supplementationOrder',value='supplement-first';
 ctx.applyClassicalComparisonChoiceIntent(c,{type:'set-choice',key,value},snapshot.contract.currentChoiceFrame);assert.equal(ctx.ClassicalClauseRelationSelections,selections);assert.equal(session.position.operationContract.selections[key],value);assert.equal(ctx.readClassicalClauseContract(c),session.position.operationContract.contract);assert.equal(session.position.accepted.result,null);
 session.stage({...proposal(session.position.operationContract),operationContract:null});
 const legacy=ctx.ClassicalClauseRelationSelections;ctx.applyClassicalComparisonChoiceIntent(c,{type:'set-choice',key,value:'principal-first'},null);assert.equal(ctx.ClassicalClauseRelationSelections,legacy);assert.equal(session.position.operationContract,null,'missing snapshot never falls through to legacy writer');
 const fresh={relation:'conjunction',coordinationRelation:'marked',clauseLevel:'principal'};ctx.ClassicalClauseRelationSelections=fresh;assert.equal(ctx.readClassicalClauseSelections(),fresh,'explicit auh ingress wins');
 }
});
test('rumor mach inactive preference returns through current snapshot without executing during transitions',()=>{
 const item=cases.find(x=>x.relation==='rumored-report'),parents=item.parents(),c=r.createClassicalClauseRelationController();for(const [role,x]of Object.entries(parents))c.captureCurrentResult(role,x);
 const selections={relation:item.relation,...item.choices};let s=a.issueClauseOperationSnapshot(c,selections,parents.principal);
 s=a.transitionClauseOperationSnapshot(s,{type:'set-choice',key:'mach',value:'absent'},s.contract.currentChoiceFrame).snapshot;assert.equal(s.selections.fuseQuilMach,'fused');assert.equal(s.contract.operationSelections.fuseQuilMach,'separate');
 s=a.transitionClauseOperationSnapshot(s,{type:'set-choice',key:'mach',value:'present'},s.contract.currentChoiceFrame).snapshot;assert.equal(s.contract.operationSelections.fuseQuilMach,'fused');assert.equal(s.contract.authorizationStatus,'authorized');
});
import {createClassicalClauseRelationControllerGlobals} from '../application/classical/clause_relation_controller.mjs';
import {executeConstructionPacket} from '../ui/composition/construction_packet.mjs';
test('frozen such-that explicit packet returns capturable application',()=>{
 const source=particle('l58-quemah'),c=r.createClassicalClauseRelationController();c.captureCurrentResult('principal',source,c.issueDiscourseSourceContextFrame({speakerGender:'male'}));const selections={relation:'such-that-adjunction'},s=a.issueClauseOperationSnapshot(c,selections,source),state=c.getState();
 const captures=Object.entries(state.captures).map(([role,x])=>({role,exact:c.getCapturedCanonicalResult(role),discourseContext:x.discourseSourceContext||null}));
 const packet={kind:'clause',operation:'sentence:supplementation',source,controller:c,choices:s.selections,captures};const made=executeConstructionPacket(r,packet);assert.equal(made?.authorizationStatus,'authorized',made?.blockReason||'no application');assert.equal(r.isClassicalNahuatlSupplementationFrame(made.canonicalResult),true);assert.equal(r.getClassicalNahuatlSupplementationClauseSourceFrame(made.canonicalResult.principalClause),source);assert.equal(r.isClassicalNahuatlSupplementationFrame({...made.canonicalResult}),false);assert.equal(r.captureClassicalGrammarApplicationResult({...made.canonicalResult},'copied-frozen').authorizationStatus,'blocked');
});
test('legacy supplementation Compose action delegates only current shared operation and cannot execute old captures',async()=>{
 const {readFileSync}=await import('node:fs'),{default:vm}=await import('node:vm'),code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
 const begin=code.indexOf('          if (SUPPLEMENTATION_OPERATION_ROUTES.includes(selectedRelation))'),end=code.indexOf('          ActiveClassicalClauseRelationResult = composeClassicalClauseRelationFromUserAction',begin);
 const controller={},snapshot={kind:'supplementation-operation-contract',controller,routeId:'supplementation'};let current=snapshot,makes=0;
 const ctx=vm.createContext({SUPPLEMENTATION_OPERATION_ROUTES:routes,targetObject:r,selectedRelation:'supplementation',controller,getClassicalComparisonOperationSnapshot:()=>current,isCurrentComparisonOperationSnapshot:x=>x===snapshot,applyClassicalConstructionPosition:()=>makes++});
 const run=()=>vm.runInContext('(function(){'+code.slice(begin,end)+'})()',ctx);run();assert.equal(makes,1);current=null;run();assert.equal(makes,1);current={...snapshot};run();assert.equal(makes,1);
});
test('legacy exact supplementation entry cannot bypass shared acceptance',async()=>{
 const {readFileSync}=await import('node:fs'),{default:vm}=await import('node:vm'),code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');let makes=0;
 const source={},binding={operationId:'sentence:supplementation',family:'clause-relation',exactResult:source,bindingIds:['supplementation:principal'],selectedBindingId:'supplementation:principal'},snapshot={kind:'supplementation-operation-contract',source};let current=snapshot;
 const ctx=vm.createContext({ActiveClassicalGrammarResultBinding:binding,getClassicalComparisonOperationSnapshot:()=>current,isCurrentComparisonOperationSnapshot:x=>x===snapshot,applyClassicalConstructionPosition:()=>{makes++;return true;},syncClassicalSelectedResultBindingRole:()=>{throw Error('legacy bypass');}});
 const start=code.indexOf('    function enterClassicalGrammarResultBindingChoice(');vm.runInContext(code.slice(start,code.indexOf('\n    function ',start+20)),ctx);assert.equal(ctx.enterClassicalGrammarResultBindingChoice('supplementation:principal'),true);assert.equal(makes,1);current=null;assert.equal(ctx.enterClassicalGrammarResultBindingChoice('supplementation:principal'),false);assert.equal(makes,1);
});
import {projectCanonicalStructure} from '../ui/composition/structure_design.mjs';
test('frozen such-that accepted structure remains inspectable without inventing productive clause contacts',()=>{
 const source=particle('l58-quemah'),c=r.createClassicalClauseRelationController();c.captureCurrentResult('principal',source);const made=c.compose({relation:'such-that-adjunction'}),exact=made.canonicalResult;
 assert.equal(made.authorizationStatus,'authorized');
 const project=x=>x===exact?{canonicalResult:x,surface:exact.surfaceRealization,operationId:'sentence:supplementation'}:x===source?{canonicalResult:x,surface:source.surfaceRealization||source.surface||'quēmah',operationId:'particle:result'}:null;
 const structure=projectCanonicalStructure(r,exact,project);assert.equal(structure.exact,exact);assert.equal(structure.children[0].exact,source);assert.deepEqual(structure.endpoints,[]);
 assert.equal(r.buildClassicalNahuatlSupplementationClauseEnvelope(exact).authorizationStatus,'blocked');assert.equal(r.getCanonicalAdverbialAdjunctionSourceUnit(exact).ok,false);assert.equal(r.isClassicalNahuatlSupplementationFrame({...exact}),false);
 const ordinary=r.createClassicalClauseRelationController();ordinary.captureCurrentResult('principal',noun('3sg'));ordinary.captureCurrentResult('adjoined',noun('3sg'));const result=ordinary.compose({relation:'supplementation',supplementationReferenceMode:'shared',supplementationHeadRole:'subject',supplementationContactRole:'subject',supplementationOrder:'principal-first'});assert.equal(result.authorizationStatus,'authorized');assert.equal(r.isClassicalNahuatlSupplementationClauseEnvelope(r.buildClassicalNahuatlSupplementationClauseEnvelope(result.canonicalResult)),true);
});
