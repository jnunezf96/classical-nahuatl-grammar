import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import {projectCanonicalStructure,projectClauseStructure,structurePresentationSignature,getClassicalSharedContactLabel} from '../ui/composition/structure_design.mjs';
import {getResultEditTargets,createResultEditSelection} from '../ui/composition/result_editing.mjs';
import {presentIdleClauseComposition} from '../ui/composition/clause_composition.mjs';
import {Element} from './helpers/organization_dom.mjs';
const fixture=JSON.parse(readFileSync(new URL('./fixtures/nonce_conjunction_interface_20261023.json',import.meta.url)));
const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
const project=exact=>{const c=r.captureClassicalGrammarApplicationResult(exact,'conjunction-interface');return c.authorizationStatus==='authorized'&&c.canonicalResult===exact?{canonicalResult:exact,surface:c.applicationResult?.presentation?.surface||exact.surfaceRealization||'',operationId:c.operationId||''}:null;};
const nncs=fixture.nnc.map(stem=>{const source=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem,sourceClass:'tl-1-a'});const nav=r.getClassicalGrammarApplicationCapabilityNavigator(source);const binding=r.issueClassicalGrammarTypedSourceOperationBindingFrame(nav,'nnc:ordinary',{subject:'3sg',animacy:'animate',humanness:'human',state:'absolutive',predicateFormation:'source-stem'});const made=r.executeClassicalGrammarTypedSourceOperationBindingFrame(binding);assert.equal(made.authorizationStatus,'authorized',made.blockReason);return made.canonicalResult;});
const vnc=r.executeClassicalGrammarApplicationRequest({operationId:'vnc:application',args:[{sourceStem:fixture.vnc,verbClass:'A',sourceValence:'intransitive',subject:'3sg',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active'}]}).canonicalResult;
const selections={relation:'conjunction',coordinationRelation:'unmarked',coordinationType:'additive',clauseLevel:'principal',polarity:'positive',leftContext:'present',rightwardModifier:'none',modifierAdjunctor:'none',sharedModifierScope:'none',sharedModifier:'none',adjoinedFunction:'none',identicalAdjoinedClauseEllipsis:'none',boundaryPunctuation:'none'};
function controller(parents=nncs.slice(0,2)){const c=r.createClassicalClauseRelationController();parents.forEach((exact,index)=>assert.equal(c.captureCurrentResult(['principal','adjoined','dependent'][index],exact).authorizationStatus,'authorized'));return c;}
function compose(c,s=selections){const result=c.compose(s);assert.equal(result.authorizationStatus,'authorized',result.blockReason);return result.canonicalResult;}

test('Andrews52.1: draft conjunct labels express equal rank while capture IDs remain intact',()=>{
 const c=controller(),state=projectClauseStructure(r,c,selections,project);
 assert.deepEqual(state.sources.map(s=>s.role),['principal','adjoined']);
 assert.deepEqual(state.sources.map(s=>s.label),['First conjunct','Second conjunct']);
 assert.deepEqual(state.sources.map(s=>s.exact),nncs.slice(0,2));
 const before=structurePresentationSignature(state),changed={...state,sources:state.sources.map(s=>({...s,label:'Different'}))};
 assert.notEqual(structurePresentationSignature(changed),before,'label changes must refresh cards');
 const supplement=projectClauseStructure(r,c,{relation:'supplementation',supplementationReferenceMode:'shared',supplementationHeadRole:'subject',supplementationContactRole:'subject',supplementationOrder:'principal-first'},project);
 assert.equal(supplement.sources[0].label,undefined,'other grammatical relations keep their own roles');
});
test('an accepted conjunction exposes exact children and Part paths; copied/forged roots cannot create targets',()=>{
 const exact=compose(controller()),tree=projectCanonicalStructure(r,exact,project);
 assert.equal(tree.unit,'Clause');assert.deepEqual(tree.children.map(c=>c.role),['First conjunct','Second conjunct']);assert.deepEqual(tree.children.map(c=>c.exact),nncs.slice(0,2));
 assert.equal(tree.endpoints.length,0,'the whole must not assert a single subject');
 const targets=getResultEditTargets(r,exact);assert.deepEqual(targets.map(t=>t.label),['Whole result','First conjunct','Second conjunct']);assert.equal(targets[1].node,nncs[0]);assert.equal(targets[2].parent,exact);
 const selection=createResultEditSelection(r);selection.accept(exact);assert.equal(selection.select(targets[2].path),true);assert.equal(selection.target,nncs[1]);assert.equal(selection.result,exact,'inspection never replaces accepted whole');
 assert.deepEqual(getResultEditTargets(r,{...exact}),[]);assert.equal(projectCanonicalStructure(r,{...exact,conjuncts:[...exact.conjuncts,{...exact.conjuncts[0]}]},project),null);assert.equal(selection.select(['conjuncts',0]),false);
});
test('nested/three-way mixed NNC and VNC conjunctions retain the complete hierarchy',()=>{
 const inner=compose(controller([nncs[0],vnc]));const outer=compose(controller([inner,nncs[1],nncs[2]]));
 const tree=projectCanonicalStructure(r,outer,project);assert.deepEqual(tree.children.map(c=>c.exact),[inner,nncs[1],nncs[2]]);assert.equal(tree.children[2].role,'Third conjunct');assert.deepEqual(tree.children[0].children.map(c=>c.exact),[nncs[0],vnc]);assert.equal(tree.children[0].children[1].unit,'Verb clause');
 assert.equal(getResultEditTargets(r,outer).length,6);
});
test('the real owner-projected conjunction hides idle nuclear Build only, and a new operation restores it',()=>{
 const exact=compose(controller()),tree=projectCanonicalStructure(r,exact,project),root=new Element(),nav=new Element(),op=new Element('select'),formula=new Element();nav.id='classical-capability-navigator';nav.dataset.classicalCapabilitySourceRole='exact-owner-issued-result';op.id='classical-capability-navigator-operation';op.value='';formula.dataset.buildFormula='nnc';root.append(nav,op,formula);
 const doc={getElementById:id=>root.querySelector(`#${id}`),querySelectorAll:q=>root.querySelectorAll(q),defaultView:{getActiveClassicalGrammarResultSourceCapture:()=>({canonicalResult:exact})}};
 const state={sourceScope:exact,sources:[tree]};presentIdleClauseComposition(doc,state);assert.equal(formula.hidden,true);op.value='clause:composition';presentIdleClauseComposition(doc,state);assert.equal(formula.hidden,false);assert.equal(formula.dataset.compositionClauseIdle,undefined);
});
test('Andrews52.3: absent left is unavailable for unmarked/adjoined; marked principal consumes only the right conjunct',()=>{
 const c=controller();const bad={...selections,leftContext:'absent'},contract=c.buildDecisionContract(bad),decision=contract.decisions.find(d=>d.id==='left-context');
 assert.equal(contract.authorizationStatus,'blocked');assert(decision.values.includes('absent'),'keep the alternative inspectable');assert.equal(decision.optionAvailability.find(o=>o.value==='absent').status,'incompatible');assert.equal(decision.resolved,false);assert.equal(c.compose(bad).authorizationStatus,'blocked');
 assert.equal(c.buildDecisionContract({...bad,coordinationRelation:'marked',clauseLevel:'adjoined',adjoinedFunction:'supplementary-subject'}).authorizationStatus,'blocked');
 const adjoined={...selections,coordinationRelation:'marked',clauseLevel:'adjoined',adjoinedFunction:'supplementary-subject'};
 assert.equal(c.buildDecisionContract(adjoined).authorizationStatus,'authorized');assert.equal(compose(c,adjoined).relationFrame.level,'adjoined','unusual marked adjoined conjunction remains licensed');
 const ordinary=compose(c);assert.equal(ordinary.conjuncts.length,2);
 const special={...bad,coordinationRelation:'marked'},specialContract=c.buildDecisionContract(special);assert.equal(specialContract.authorizationStatus,'authorized',specialContract.blockReason);assert.equal(specialContract.derived.conjunctCount,1);
 const staged=projectClauseStructure(r,c,special,project);assert.deepEqual(staged.sources.map(s=>s.exact),[nncs[0]]);assert.equal(staged.sources[0].label,'Right conjunct');assert.equal(c.getCapturedCanonicalResult('adjoined'),nncs[1],'stored alternative remains intact');
 const single=controller([nncs[0]]);assert.equal(single.buildDecisionContract(special).authorizationStatus,'authorized');assert.equal(compose(single,special).conjuncts.length,1,'no artificial second capture required');
 const made=compose(c,special),tree=projectCanonicalStructure(r,made,project);assert.equal(made.conjuncts.length,1);assert.equal(tree.children[0].role,'Right conjunct');assert.equal(tree.children[0].exact,nncs[0]);assert.equal(ordinary.conjuncts.length,2,'staging/special Make does not mutate prior Result');
 const restored=projectClauseStructure(r,c,selections,project);assert.equal(restored.sources.length,2);assert.equal(compose(c).conjuncts.length,2);
});

test('completed conjunction readiness follows the canonical owner for coupled options before Make',()=>{
 const c=controller();const before=r.getClassicalGrammarWorkspaceHistorySnapshot();
 const bad={...selections,coordinationRelation:'marked',leftContext:'absent',coordinationType:'adversative'};
 const contract=c.buildDecisionContract(bad);
 assert.equal(contract.authorizationStatus,'blocked','one right conjunct cannot satisfy the owner’s two-conjunct adversative rule');assert.match(contract.blockReason,/adversative/);
 assert.equal(c.preview(bad),null);assert.equal(c.compose(bad).authorizationStatus,'blocked');
 assert.equal(c.buildDecisionContract({...selections,modifierAdjunctor:'in'}).authorizationStatus,'blocked','additive without a licensed rightward modifier must not advertise readiness');
 assert.equal(c.buildDecisionContract(selections).authorizationStatus,'authorized');assert.deepEqual(r.getClassicalGrammarWorkspaceHistorySnapshot(),before,'preflight never writes accepted history');
 const raw=r.evaluateClassicalNahuatlClauseConjunction;let calls=0;r.evaluateClassicalNahuatlClauseConjunction=(...args)=>{calls++;return raw(...args);};
 try{const fresh=controller();fresh.buildDecisionContract(selections);const first=calls;fresh.buildDecisionContract(selections);assert.equal(calls,first,'reuse owner evaluation for unchanged exact captures and options');fresh.buildDecisionContract({...selections,boundaryPunctuation:'comma'});assert(calls>first,'changed owner option invalidates cached preflight');}finally{r.evaluateClassicalNahuatlClauseConjunction=raw;}
});

test('discontinuous staged order puts the exact intervening clause between the head and modifier',()=>{
 const parents={principal:nncs[0],adjoined:nncs[1],dependent:vnc};
 const c=controller([parents.principal,parents.adjoined,parents.dependent]);
 const before=r.getClassicalGrammarWorkspaceHistorySnapshot();
 for(const [order,expected] of [
  ['discontinuous-head-first',['principal','dependent','in','adjoined']],
  ['discontinuous-modifier-first',['in','adjoined','dependent','principal']],
 ]){
  const contract={relation:'adjectival-modification',unresolvedDecisionIds:[],derived:{
   requiredCaptureRoles:Object.keys(parents),topology:'discontinuous',order,adjunctor:'in',
  }};
  const {spatial}=projectClauseStructure(r,c,{},project,contract);
  assert.equal(spatial.pending,true);
  assert.deepEqual(spatial.pieces.map(piece=>piece.captureRole || piece.text),expected);
  for(const piece of spatial.pieces.filter(piece=>piece.kind==='unit')){
   assert.equal(piece.source===parents[piece.captureRole],true);
  }
  assert.equal(spatial.pieces.find(piece=>piece.captureRole==='dependent').role,'Intervening clause');
  assert.equal(projectClauseStructure(r,c,{},project,{...contract,unresolvedDecisionIds:['order']}).spatial,null);
 }
 assert.deepEqual(r.getClassicalGrammarWorkspaceHistorySnapshot(),before);
});

test('equal Peter sentences retain distinct owner contacts in draft and Result structure',()=>{
 const finite=r.executeClassicalGrammarApplicationRequest({operationId:'vnc:application',args:[{
  sourceStem:'itt-a',verbClass:'A',sourceValence:'specific-projective',objectKind:'specific-projective',
  objectPerson:'3sg',subject:'3sg',mood:'indicative',tense:'preterit',
 }]}).canonicalResult;
 const principal=r.executeClassicalGrammarApplicationRequest({operationId:'vnc:sentence-result',args:[
  finite,{antecessive:true,punctuationMode:'statement'},
 ]}).canonicalResult;
 const source=r.issueCanonicalNncSourceFrame({stem:'Petoloh',sourceClass:'zero'});
 const adjunct=r.executeClassicalGrammarApplicationRequest({operationId:'nnc:ordinary',args:[
  source,r.issueCanonicalNncOperationFrame(source,{subject:'3sg',state:'absolutive'}),
 ]}).canonicalResult;
 const c=controller([principal,adjunct]);
 for(const [headRole,headId,contact] of [
  ['subject','subject','Subject ↔ Subject'],
  ['object','source-object-1','Object ↔ Subject'],
 ]){
  const selections={relation:'supplementation',supplementationReferenceMode:'shared',
   supplementationOrder:'principal-first',supplementationHeadRole:headRole,supplementationContactRole:'subject'};
  const before=r.getClassicalGrammarWorkspaceHistorySnapshot();
  const draft=projectClauseStructure(r,c,selections,project);
  assert.equal(draft.link?.left.id,headId);
  assert.equal(draft.link?.right.id,'subject');
  assert.deepEqual(r.getClassicalGrammarWorkspaceHistorySnapshot(),before);
  const exact=compose(c,selections);
  assert.equal(exact.surfaceRealization,'Ōquittac Petoloh.');
  const view=projectCanonicalStructure(r,exact,project);
  assert.equal(Object.fromEntries(view.facts).Contact,contact);
  const roleName=headRole==='subject'?'Subject':'Object';
  assert.equal(getClassicalSharedContactLabel(r,exact),`Principal ${roleName} ↔ Adjunct Subject`);
  assert.equal(getClassicalSharedContactLabel(r,{...exact}),'');
  assert.equal(Object.fromEntries(view.facts)['Principal contact'],headId);
  assert.equal(c.getCapturedCanonicalResult('principal')===principal,true);
  assert.equal(c.getCapturedCanonicalResult('adjoined')===adjunct,true);
 }
});
