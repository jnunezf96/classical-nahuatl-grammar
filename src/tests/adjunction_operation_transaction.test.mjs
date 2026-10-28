import test from 'node:test';
import assert from 'node:assert/strict';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
const routes=['time','place','duration','manner','intensification','compared-manner','means','consideration','purpose','condition','concession','consequence','proviso','reason'];
for(const relation of routes)test(`${relation} owner issues current recoverable adjunction frame`,()=>{
 const c=r.createClassicalClauseRelationController(),selections={relation},contract=c.buildDecisionContract(selections);
 assert.ok(contract.currentChoiceFrame);assert.equal(contract.currentChoiceFrame.familyId,relation);assert.equal(contract.currentChoiceFrame.outcome.readyToMake,false);
 assert.equal(c.transitionAdjunctionChoice({selections,expectedFrame:{...contract.currentChoiceFrame},intent:{type:'clear-capture',role:'principal'}}).authorizationStatus,'blocked');
 for(const d of contract.currentChoiceFrame.decisions)assert.ok(d.key);
 assert.equal(c.transitionAdjunctionChoice({selections,expectedFrame:contract.currentChoiceFrame,intent:{type:'set-choice',key:'recursion',value:'both'}}).authorizationStatus,'blocked');
});
import * as a from '../ui/composition/clause_operation_transaction.mjs';
import {projectCanonicalStructure} from '../ui/composition/structure_design.mjs';
const v=(stem='cochi',verbClass='B')=>r.requestClassicalVncApplicationResult({sourceStem:stem,verbClass,sourceValence:'intransitive',subject:'3sg',mood:'indicative',tense:'present',requestedVoice:'active'});
const adverb=stem=>r.requestClassicalAdverbialNncResult({adverbialPotentialFrame:r.buildClassicalNahuatlLexicalAdverbialPotentialFrame({stem})});
const sentence=x=>r.requestClassicalVncSentenceResultFrame(x);
function fixture(relation){
 let principal=v(),adjoined=['time','purpose','condition','concession','proviso','reason'].includes(relation)?v('cuīca','A'):r.requestClassicalPlaceGentilicResult({constructionKind:'place-name',formation:'co',source:{embedStem:'Tlach'},usage:'adverbial'}),marker=null;
 if(relation==='consequence'){const inner=r.createClassicalClauseRelationController();inner.captureCurrentResult('principal',v('cuīca','A'));inner.captureCurrentResult('adjoined',adverb('iuh'));const made=inner.compose({relation:'manner',degree:'first',order:'modifier-head'});assert.equal(made.authorizationStatus,'authorized',made.blockReason);adjoined=made.canonicalResult;}
 if(relation==='reason'){principal=sentence(principal);adjoined=sentence(adjoined);}
 if(relation==='intensification'){const source=r.buildClassicalNahuatlQuantitativePredicateSourceFrame({citation:'miyec',sourceUse:'quantitative-predicate',reference:'nonanimate-common'});principal=r.executeClassicalGrammarApplicationRequest({operationId:'nnc:quantitative-predicate',args:[source,r.buildClassicalNahuatlQuantitativePredicateOperationFrame(source,{})]}).canonicalResult;adjoined=adverb('cencah');}
 const id={condition:'l3-in-tla',concession:'l3-ma-zo',proviso:'l3-ahzo',reason:'l3-ca'}[relation];if(id)marker=r.requestClassicalParticleResult(id);
 const c=r.createClassicalClauseRelationController();for(const[role,x]of Object.entries({principal,adjoined,marker}))if(x)assert.equal(c.captureCurrentResult(role,x).authorizationStatus,'authorized',`${relation}:${role}`);
 const selections={relation,...(!['reason','intensification'].includes(relation)?{order:'modifier-head'}:{}),...(['place','manner','compared-manner'].includes(relation)?{degree:'first'}:{}),...(relation==='place'?{structureProfile:'modification'}:{}),...({time:{relationProfile:'implicit'},purpose:{relationProfile:'unmarked'},condition:{relationProfile:'open'}}[relation]||{})};
 return {c,selections,principal,adjoined,marker};
}
for(const relation of routes)test(`${relation} exact current snapshot executes owner result and projects actual History shape`,()=>{
 const f=fixture(relation),s=a.issueClauseOperationSnapshot(f.c,f.selections,f.principal);assert.ok(s,JSON.stringify({relation:f.c.buildDecisionContract(f.selections).relation,frame:f.c.buildDecisionContract(f.selections).currentChoiceFrame,diagnostics:f.c.buildDecisionContract(f.selections).diagnostics}));assert.equal(s.contract.authorizationStatus,'authorized',JSON.stringify(s.contract.diagnostics));
 const made=f.c.compose(s.selections);assert.equal(made.authorizationStatus,'authorized',made.blockReason);const exact=made.canonicalResult;assert.equal(r.isAdverbialAdjunctionResult(exact),true);assert.equal(exact.sourceContract.principal.issuedResult,f.principal);assert.equal(exact.sourceContract.adjoined.issuedResult,f.adjoined);if(f.marker)assert.equal(exact.sourceContract.marker.issuedResult,f.marker);
 const structure=projectCanonicalStructure(r,exact,x=>({canonicalResult:x,surface:x.surface||x.surfaceRealization||'',operationId:'clause:adverbial-adjunction'}));assert.equal(structure.exact,exact);assert.ok(structure.children.some(x=>x.exact===f.principal));assert.ok(structure.children.some(x=>x.exact===f.adjoined));assert.equal(r.isAdverbialAdjunctionResult({...exact}),false);
 const cleared=a.transitionClauseOperationSnapshot(s,{type:'clear-capture',role:'adjoined'},s.contract.currentChoiceFrame);assert.equal(cleared.authorizationStatus,'authorized');assert.equal(cleared.snapshot.contract.authorizationStatus,'blocked');assert.equal(a.isCurrentClauseOperationSnapshot(s),false);assert.equal(a.transitionClauseOperationSnapshot(cleared.snapshot,{type:'capture',role:'adjoined',result:{...f.adjoined}},cleared.snapshot.contract.currentChoiceFrame).authorizationStatus,'blocked');
 const restored=a.transitionClauseOperationSnapshot(cleared.snapshot,{type:'capture',role:'adjoined',result:f.adjoined},cleared.snapshot.contract.currentChoiceFrame);assert.equal(restored.snapshot.contract.authorizationStatus,'authorized');assert.equal(restored.snapshot.source,f.principal);
 const input=restored.snapshot.contract.currentChoiceFrame.inputs.find(x=>x.role==='marker');if(['condition','concession','reason'].includes(relation))assert.equal(input.required,true);if(relation==='intensification')assert.equal(input.applicability,'inactive');
});

import {createConstructionSession} from '../ui/composition/construction_session.mjs';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
test('actual adjunction choice and marker handlers stage once and reject stale or missing snapshots',()=>{
 const {c,selections,principal,adjoined}=fixture('time'),snapshot=a.issueClauseOperationSnapshot(c,selections,principal);
 const session=createConstructionSession({isSource:x=>[principal,adjoined].includes(x)||r.isClassicalNahuatlParticleResultFrame?.(x),isResult:()=>false});
 const proposal=s=>({source:principal,route:{operation:'clause:adverbial-adjunction'},slots:s.captures,choices:s.selections,operationContract:s,ready:false});session.stage(proposal(snapshot));
 let refreshes=0;
 const ctx=vm.createContext({ADJUNCTION_OPERATION_ROUTES:routes,SUPPLEMENTATION_OPERATION_ROUTES:[],targetObject:r,issueComparisonOperationSnapshot:a.issueClauseOperationSnapshot,isCurrentComparisonOperationSnapshot:a.isCurrentClauseOperationSnapshot,readComparisonOperationSelections:a.readClauseOperationSelections,transitionComparisonOperationSnapshot:a.transitionClauseOperationSnapshot,ClassicalConstructionSession:session,ClassicalClauseRelationSelections:selections,ClassicalComparisonTransitionDraft:null,ActiveClassicalGrammarCapabilityNavigator:{exactSource:principal},ClassicalPositionExecuting:false,ClassicalPositionStaging:false,ActiveClassicalClauseRelationResult:null,ClassicalClauseRelationStatusMessage:'',ActiveClassicalClauseRelationMarkerOptionId:'',ActiveClassicalClauseRelationMarkerResult:null,getClassicalClauseRelationControllerForRendering:()=>c,refreshClassicalClauseRelationWorkflow:()=>{refreshes++;const current=ctx.ClassicalComparisonTransitionDraft||session.position.operationContract;if(current)session.stage(proposal(current));}});
 const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
 for(const name of ['getClassicalComparisonOperationSnapshot','readClassicalClauseSelections','readClassicalClauseContract','applyClassicalComparisonChoiceIntent','setClassicalClauseRelationMarkerOption']){const start=code.indexOf(`    function ${name}(`);vm.runInContext(code.slice(start,code.indexOf('\n    function ',start+20)),ctx);}
 ctx.applyClassicalComparisonChoiceIntent(c,{type:'set-choice',key:'order',value:'head-modifier'},snapshot.contract.currentChoiceFrame);
 assert.equal(session.position.operationContract.selections.order,'head-modifier');assert.equal(refreshes,1);assert.equal(ctx.ClassicalClauseRelationSelections,selections);assert.equal(ctx.ClassicalComparisonTransitionDraft,null);assert.equal(session.position.accepted.result,null);
 assert.equal(ctx.setClassicalClauseRelationMarkerOption(c,'l3-in',snapshot.contract.currentChoiceFrame),false,'old event cannot capture');
 let current=session.position.operationContract;assert.equal(ctx.setClassicalClauseRelationMarkerOption(c,'l3-in',{...current.contract.currentChoiceFrame}),false);
 assert.equal(ctx.setClassicalClauseRelationMarkerOption(c,'l3-in',current.contract.currentChoiceFrame),true);current=session.position.operationContract;assert.equal(current.contract.authorizationStatus,'authorized');assert.equal(current.selections.order,'head-modifier');assert.equal(c.getCapturedCanonicalResult('marker'),ctx.ActiveClassicalClauseRelationMarkerResult);assert.equal(refreshes,2);
 assert.equal(ctx.setClassicalClauseRelationMarkerOption(c,'',current.contract.currentChoiceFrame),true);current=session.position.operationContract;assert.equal(c.getCapturedCanonicalResult('marker'),null);assert.equal(current.contract.currentChoiceFrame.inputs.find(x=>x.role==='marker').required,false);assert.equal(refreshes,3);assert.equal(session.position.accepted.result,null);
 session.stage({...proposal(current),operationContract:null});ctx.applyClassicalComparisonChoiceIntent(c,{type:'set-choice',key:'order',value:'modifier-head'},null);assert.equal(session.position.operationContract,null);assert.equal(ctx.ClassicalClauseRelationSelections,selections);
});
test('proviso marker requirement persists after capture and after clearing the marker',()=>{
 const f=fixture('proviso'),s=a.issueClauseOperationSnapshot(f.c,f.selections,f.principal);assert.equal(s.contract.currentChoiceFrame.inputs.find(x=>x.role==='marker').required,true);
 const cleared=a.transitionClauseOperationSnapshot(s,{type:'clear-capture',role:'marker'},s.contract.currentChoiceFrame);assert.equal(cleared.snapshot.contract.authorizationStatus,'blocked');assert.equal(cleared.snapshot.contract.currentChoiceFrame.inputs.find(x=>x.role==='marker').required,true);
});

test('adjunction actual saved required-slot supply and principal replacement keep owner source and fresh session exact',async()=>{
 const {readFileSync}=await import('node:fs'),{default:vm}=await import('node:vm');const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');const left=v(),right=v(),replacement=v();
 const c=r.createClassicalClauseRelationController();c.captureCurrentResult('principal',left);const selections={relation:'time',relationProfile:'implicit',order:'modifier-head'},snapshot=a.issueClauseOperationSnapshot(c,selections,left);
 const owner=r.issueClassicalClauseRelationBindingFrame('clause:adverbial-adjunction',left,['principal']),binding={family:'clause-relation',operationId:'clause:adverbial-adjunction',exactResult:left,ownerBindingFrame:owner,bindingIds:owner.bindingIds,selectedBindingId:'time:principal',requiredResultRoles:['adjoined']};
 const session=createConstructionSession({isSource:x=>[left,right,replacement].includes(x),isResult:()=>false});session.stage({source:left,route:{operation:'clause:adverbial-adjunction'},operationContract:snapshot,ready:false});
 const ctx=vm.createContext({issueComparisonOperationSnapshot:a.issueClauseOperationSnapshot,isCurrentComparisonOperationSnapshot:a.isCurrentClauseOperationSnapshot,readComparisonOperationSelections:a.readClauseOperationSelections,ActiveClassicalGrammarResultBinding:binding,ActiveClassicalGrammarResultSourceCapture:null,issueClassicalClauseRelationCurrentDiscourseSourceContextFrame:()=>null,ClassicalClauseRelationStatusMessage:'',syncClassicalContinuationTarget(){},syncClassicalGrammarWorkspaceHistory(){},targetObject:{...r,document:{getElementById:()=>null}},ActiveClassicalGrammarCapabilityNavigator:r.getClassicalGrammarApplicationCapabilityNavigator(left),ClassicalConstructionSession:session,ClassicalComparisonTransitionDraft:null,ClassicalClauseRelationSelections:selections,getClassicalClauseRelationControllerForRendering:()=>c,getClassicalResultEditProposal:()=>null,PendingClassicalOrdinaryGrammarBinding:null,PendingClassicalResultEdit:null,getActiveClassicalGrammarTypedSourceOperationBinding:()=>null,syncClassicalPositionFixedChoices(){},ClassicalPositionSources:new WeakSet(),getConstructionLayerReadiness:()=>({ready:true}),hasCurrentClauseProjection:()=>false,getClassicalOwnerIssuedResultProjection:x=>({canonicalResult:x}),getClassicalMissingSourceSlots:()=>[],ClassicalWritingSourceMode:false,freezeConstructionData:x=>x,isDerivedFormationOperation:()=>false,readClassicalPersonalNameSnapshot:()=>null,readClassicalDenominalSnapshot:()=>null,readClassicalPlaceGentilicSnapshot:()=>null,readClassicalVerbalDerivationSnapshot:()=>null,readClassicalDerivedFormationSnapshot:()=>null,readClassicalNominalOperationSnapshot:()=>null,readClassicalIssuedBindingSnapshot:()=>null});
 ctx.getActiveClassicalGrammarResultBinding=()=>ctx.ActiveClassicalGrammarResultBinding;
 ctx.enterClassicalGrammarResultBindingChoice=(id,options)=>{assert.equal(options.allowExecution,false);return c.applyBindingFrame(ctx.ActiveClassicalGrammarResultBinding.ownerBindingFrame,id).authorizationStatus==='authorized';};
 for(const name of ['getClassicalComparisonOperationSnapshot','readClassicalClauseSelections','readClassicalClauseContract','readClassicalConstructionProposal','canClassicalSavedResultFillBinding','supplyClassicalGrammarWorkspaceResultToBinding']){const start=code.indexOf(`    function ${name}(`);vm.runInContext(code.slice(start,code.indexOf('\n    function ',start+20)),ctx);}
 ctx.syncClassicalCapabilityApplyOperationState=()=>session.stage(ctx.readClassicalConstructionProposal({operationId:'clause:adverbial-adjunction',ready:false}));
 assert.equal(ctx.canClassicalSavedResultFillBinding(binding,right),true);assert.equal(ctx.supplyClassicalGrammarWorkspaceResultToBinding({canonicalResult:right}),true);assert.equal(c.getCapturedCanonicalResult('adjoined'),right);assert.equal(ctx.getClassicalComparisonOperationSnapshot().source,left);
 const fresh=ctx.getClassicalComparisonOperationSnapshot(),missing=a.transitionClauseOperationSnapshot(fresh,{type:'clear-capture',role:'principal'},fresh.contract.currentChoiceFrame).snapshot;session.stage({source:left,route:{operation:'clause:adverbial-adjunction'},operationContract:missing,ready:false});ctx.ActiveClassicalGrammarResultBinding={...ctx.ActiveClassicalGrammarResultBinding,requiredResultRoles:['principal']};
 assert.equal(ctx.canClassicalSavedResultFillBinding(ctx.ActiveClassicalGrammarResultBinding,{...replacement}),false);assert.equal(ctx.canClassicalSavedResultFillBinding(ctx.ActiveClassicalGrammarResultBinding,replacement),true);
 assert.equal(ctx.supplyClassicalGrammarWorkspaceResultToBinding({canonicalResult:replacement}),true);const final=ctx.getClassicalComparisonOperationSnapshot();assert.ok(a.isCurrentClauseOperationSnapshot(final));assert.equal(final.source,replacement);assert.equal(ctx.ActiveClassicalGrammarCapabilityNavigator.exactResult,replacement);assert.equal(ctx.ActiveClassicalGrammarResultBinding.exactResult,replacement);assert.equal(final.selections.relationProfile,'implicit');assert.equal(c.getCapturedCanonicalResult('adjoined'),right);assert.equal(ctx.ClassicalComparisonTransitionDraft,null);assert.equal(session.position.accepted.result,null);
});

test('legacy adjunction Compose action delegates only current shared operation and cannot execute old captures',async()=>{
 const {readFileSync}=await import('node:fs'),{default:vm}=await import('node:vm'),code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
 const begin=code.indexOf('          if ([...SUPPLEMENTATION_OPERATION_ROUTES,...ADJUNCTION_OPERATION_ROUTES].includes(selectedRelation))'),end=code.indexOf('          ActiveClassicalClauseRelationResult = composeClassicalClauseRelationFromUserAction',begin);
 const controller={},snapshot={kind:'adjunction-operation-contract',controller,routeId:'time'};let current=snapshot,makes=0;
 const ctx=vm.createContext({ADJUNCTION_OPERATION_ROUTES:routes,SUPPLEMENTATION_OPERATION_ROUTES:[],targetObject:r,selectedRelation:'time',controller,getClassicalComparisonOperationSnapshot:()=>current,isCurrentComparisonOperationSnapshot:x=>x===snapshot,applyClassicalConstructionPosition:()=>makes++});
 const run=()=>vm.runInContext('(function(){'+code.slice(begin,end)+'})()',ctx);run();assert.equal(makes,1);current=null;run();assert.equal(makes,1);current={...snapshot};run();assert.equal(makes,1);
});
test('legacy exact adjunction entry cannot bypass shared acceptance',async()=>{
 const {readFileSync}=await import('node:fs'),{default:vm}=await import('node:vm'),code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');let makes=0;
 const source={},binding={operationId:'clause:adverbial-adjunction',family:'clause-relation',exactResult:source,bindingIds:['time:principal'],selectedBindingId:'time:principal'},snapshot={kind:'adjunction-operation-contract',source};let current=snapshot;
 const ctx=vm.createContext({ActiveClassicalGrammarResultBinding:binding,getClassicalComparisonOperationSnapshot:()=>current,isCurrentComparisonOperationSnapshot:x=>x===snapshot,applyClassicalConstructionPosition:()=>{makes++;return true;},syncClassicalSelectedResultBindingRole:()=>{throw Error('legacy bypass');}});
 const start=code.indexOf('    function enterClassicalGrammarResultBindingChoice(');vm.runInContext(code.slice(start,code.indexOf('\n    function ',start+20)),ctx);assert.equal(ctx.enterClassicalGrammarResultBindingChoice('time:principal'),true);assert.equal(makes,1);current=null;assert.equal(ctx.enterClassicalGrammarResultBindingChoice('time:principal'),false);assert.equal(makes,1);
});
test('adjunction unchanged reconciliation preserves revision and anchor replacement requires its actual current frame',()=>{
 const f=fixture('time'),s=a.issueClauseOperationSnapshot(f.c,f.selections,f.principal),session=createConstructionSession({isSource:x=>[f.principal,f.adjoined].includes(x),isResult:()=>false});
 const proposal=x=>({source:f.principal,route:{operation:'clause:adverbial-adjunction'},slots:x.captures,choices:x.selections,operationContract:x,ready:true});session.stage(proposal(s));const rev=session.position.revision;session.stage(proposal(a.issueClauseOperationSnapshot(f.c,{...f.selections},f.principal)));assert.equal(session.position.revision,rev);
 const binding=r.issueClassicalClauseRelationBindingFrame('clause:adverbial-adjunction',f.principal,['principal']),replacement=v('cuīca','A');
 assert.ok(f.c.prepareAdjunctionAnchorReplacement(binding,'time:principal','principal',replacement,s.selections,s.contract.currentChoiceFrame));
 assert.equal(f.c.prepareAdjunctionAnchorReplacement(binding,'time:principal','principal',replacement,s.selections,{...s.contract.currentChoiceFrame}),null);
 const next=a.transitionClauseOperationSnapshot(s,{type:'set-choice',key:'order',value:'head-modifier'},s.contract.currentChoiceFrame).snapshot;
 assert.equal(f.c.prepareAdjunctionAnchorReplacement(binding,'time:principal','principal',replacement,s.selections,s.contract.currentChoiceFrame),null);assert.ok(f.c.prepareAdjunctionAnchorReplacement(binding,'time:principal','principal',replacement,next.selections,next.contract.currentChoiceFrame));assert.equal(session.position.accepted.result,null);
});
import {clauseMarkerResultLabel} from '../ui/composition/clause_composition.mjs';
test('marker labels use current requirement while retaining reason and optional in distinctions',()=>{
 for(const relation of ['time','condition','proviso','reason']){const f=fixture(relation),contract=f.c.buildDecisionContract(f.selections),required=contract.currentChoiceFrame.inputs.find(x=>x.role==='marker').required;
 assert.equal(clauseMarkerResultLabel(relation,'',required),relation==='reason'?'Required principal-clause introducer':relation==='time'?'Optional marker Result':'Required marker Result');}
 const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');assert.match(code,/: comparisonCapture\?\.required \|\| adjunctionInput\?\.required \? "Required · not captured"/u);assert.match(code,/clauseMarkerResultLabel\(selectedRelation,[^;]*currentChoiceFrame\?\.inputs.find/u);
});

test('actual marker label rendering runs before later decisionContract declaration',()=>{
 const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
 const line=code.split('\n').find(x=>x.includes('markerLabel.textContent = clauseMarkerResultLabel'));
 for(const relation of ['time','condition','proviso','reason']){
  const f=fixture(relation),previewDecisionContract=f.c.buildDecisionContract(f.selections),markerLabel={};
  const render=new Function('previewDecisionContract','markerLabel','selectedRelation','clauseMarkerResultLabel','targetObject',line+'\n const decisionContract=previewDecisionContract; return markerLabel.textContent;');
  assert.equal(render(previewDecisionContract,markerLabel,relation,clauseMarkerResultLabel,{document:{getElementById:()=>({value:''})}}),relation==='reason'?'Required principal-clause introducer':relation==='time'?'Optional marker Result':'Required marker Result');
 }
});
