import {installClauseSelectionReaders} from './helpers/clause_selection_reader_fixture.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import {createConstructionSession} from '../ui/composition/construction_session.mjs';
import {exportClassicalResultReloadRecipe} from '../application/classical/result_reload.mjs';

const {runtimeObject:r}=await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}});
const rendering=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
const extract=name=>{
  const start=rendering.indexOf(`    function ${name}(`);
  assert.ok(start>=0,name);
  return rendering.slice(start,rendering.indexOf('\n    function ',start+20));
};
function issue(operationId,...args){
  const receipt=r.executeClassicalGrammarApplicationRequest({operationId,args});
  assert.equal(receipt.authorizationStatus,'authorized',receipt.blockReason);
  return receipt.canonicalResult;
}
function learned(subject){
  const vnc=issue('vnc:application',{sourceStem:'mati',verbClass:'B',sourceValence:'projective-nonhuman',objectKind:'nonspecific-nonhuman',subject,mood:'indicative',tense:'customary-present'});
  return issue('nnc:deverbal-construction',{constructionKind:'predicate-nominalization',nominalizationKind:'customary-agentive-full',canonicalVncResult:vnc,subject,state:'absolutive',numberConnector:'silent'});
}
function ordinary(stem){
  const source=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem,sourceClass:'zero'});
  return issue('nnc:ordinary',source,r.buildClassicalNahuatlOrdinaryNncOperationFrame(source,{subject:'3sg',state:'absolutive'}));
}
function controller(principal,adjoined){
  const c=r.createClassicalClauseRelationController();
  for(const[role,parent]of Object.entries({principal,adjoined})){
    const capture=c.captureCurrentResult(role,parent);
    assert.equal(capture.authorizationStatus,'authorized',capture.blockReason);
  }
  return c;
}
const base=learned('1sg'),predicate=learned('2sg'),ic=ordinary('īc');
const pointReceipt=controller(predicate,ic).compose({relation:'manner',degree:'second',structureProfile:'modification',order:'modifier-head'});
assert.equal(pointReceipt.authorizationStatus,'authorized',pointReceipt.blockReason);
const point=pointReceipt.canonicalResult;
const selections=value=>({relation:'comparison',comparisonRoute:'question-how-much-more',questionCollocation:value,sentenceType:'none'});
const source=result=>r.buildClassicalComparisonSourceUnit({sourceResult:result});

class Element{
  constructor(tag){this.tagName=tag.toUpperCase();this.children=[];this.dataset={};this.listeners={};}
  setAttribute(){} append(...children){this.children.push(...children);}
  appendChild(child){this.children.push(child);} addEventListener(type,listener){this.listeners[type]=listener;}
}
function generatedChoice(c,choices){
  let executions=0;
  const session=createConstructionSession({isSource:x=>x===base||x===point,isResult:x=>x===base||r.isClassicalComparisonResultFrame(x),execute:packet=>{executions++;return c.compose(packet.choices);},present:()=>true});
  session.restore(base);
  const ctx={getClassicalClauseRelationControllerForRendering:()=>c,targetObject:{...r,document:{createElement:tag=>new Element(tag)}},ActiveClassicalGrammarResultBinding:null,ClassicalClauseRelationSelections:{...choices},ActiveClassicalClauseRelationResult:null,ClassicalExplicitClauseRelationIntent:'',ClassicalClauseRelationStatusMessage:'',formatClassicalClauseRelationValue:x=>x,compactClassicalChoiceMenu(){},
    refreshClassicalClauseRelationWorkflow(){
      const d=c.buildDecisionContract(ctx.ClassicalClauseRelationSelections);
      session.stage({source:base,route:{operation:'comparison'},slots:[{role:'principal',exact:base},{role:'adjoined',exact:point}],choices:{...ctx.ClassicalClauseRelationSelections},legalMoves:[],ready:d.authorizationStatus==='authorized',execution:{choices:{...ctx.ClassicalClauseRelationSelections},signature:JSON.stringify(ctx.ClassicalClauseRelationSelections)}});
    }};
  vm.createContext(ctx);installClauseSelectionReaders(ctx);
  for(const name of ['CLASSICAL_CLAUSE_RELATION_DECISION_KEYS','CLASSICAL_CLAUSE_RELATION_DECISION_LABELS']){
    const start=rendering.indexOf(`    const ${name} = Object.freeze({`);
    vm.runInContext(rendering.slice(start,rendering.indexOf('\n    });',start)+8),ctx);
  }
  for(const name of ['applyClassicalComparisonChoiceIntent','setClassicalClauseRelationDecision','createClassicalClauseRelationDecisionControl'])vm.runInContext(extract(name),ctx);
  const contract=c.buildDecisionContract(choices);
  const decision=contract.decisions.find(d=>d.id==='question-collocation');
  assert.ok(decision);
  const select=ctx.createClassicalClauseRelationDecisionControl(decision,contract.currentChoiceFrame).children.find(e=>e.tagName==='SELECT');
  return {session,select,get executions(){return executions;},change(value){select.value=value;select.listeners.change();}};
}

// Andrews 53.6 (Canvas 22934–22938) gives both long collocations. The contrasting
// constructions in 53.5.2b/c (22889–22904) introduce their comparison point by īc.
for(const[value,words,formula]of [
  ['oc-yeh-cencah-hualcah','oc yeh cencah huālcah','oc + yeh + cencah + #0-0(huālcah)0-0#'],
  ['oc-yeh-cencah-tlapanahuia','oc yeh cencah tlapanahuia','oc + yeh + cencah + #0-0+tla(pan-a-huiā)0+0-0#']
])test(`AD131 ${value}: authenticated īc point survives picker, staging and explicit Make`,()=>{
  const pointSource=source(point);
  assert.equal(pointSource.authorizationStatus,'authorized',pointSource.blockReason);
  assert.equal(pointSource.baseUnitKind,'composition');
  assert.equal(pointSource.ownerOperationId,'clause:adverbial-adjunction');
  assert.equal(pointSource.ownerSourceKind,'composition-ast');
  assert.equal(pointSource.surface,'īc titlamatini');
  assert.equal(pointSource.formula,point.formulaRecord.formula);
  assert.equal(r.getClassicalComparisonCanonicalSourceResult(pointSource),point);
  assert.equal(r.isAdverbialAdjunctionResult(point),true);
  assert.equal(point.sourceContract.principal.issuedResult,predicate);
  assert.equal(point.sourceContract.adjoined.issuedResult,ic);
  assert.equal(point.ruleProfile.relation,'manner');
  assert.equal(point.ruleProfile.degree,'second');
  assert.equal(point.ruleProfile.structure,'simple');
  assert.equal(point.ruleProfile.order,'modifier-head');
  assert.equal(point.embeddedSurface,'īc titlamatini');
  const binding=r.issueClassicalClauseRelationBindingFrame('clause:comparison',point,['adjoined']);
  assert.equal(binding.authorizationStatus,'authorized',binding.blockReason);
  assert.ok(binding.bindingIds.includes('comparison:adjoined'));
  assert.equal(binding.exactResult,point);
  const c=controller(base,point),choices=selections(value);
  assert.ok(c.issueRelationAvailabilityContract().availableRelations.includes('comparison'));
  const preview=c.preview(choices);
  assert.ok(preview?.isCurrent());
  const expected=`nitlamatini, quēn ${words} īc titlamatini`;
  assert.equal(preview.surface,expected);
  const ui=generatedChoice(c,choices);
  assert.ok(ui.select.children.some(option=>option.value===value&&!option.disabled));
  ui.change(value);
  assert.equal(ui.executions,0);
  assert.equal(ui.session.position.accepted.result,base);
  assert.equal(ui.session.make(),true,ui.session.position.failure?.blockReason);
  assert.equal(ui.executions,1);
  const result=ui.session.position.accepted.result,op=result.operationFrame;
  assert.equal(result.surface,expected);
  assert.equal(op.routeId,'question-how-much-more');
  assert.equal(op.choices.questionCollocation.id,value);
  assert.ok(result.formula.includes(`quēn + ${formula} + ${point.formulaRecord.formula}`),result.formula);
  assert.equal(r.getClassicalComparisonCanonicalSourceResult(op.sourceSlots.baseClause),base);
  assert.equal(r.getClassicalComparisonCanonicalSourceResult(op.sourceSlots.degreeClause),point);
  assert.equal(c.getCapturedCanonicalResult('principal'),base);
  assert.equal(c.getCapturedCanonicalResult('adjoined'),point);
});

test('AD131 copied and forged adverbial parents fail owner, picker, preview and execution',()=>{
  const choices=selections('oc-yeh-cencah-hualcah');
  for(const hostile of [
    {...point},
    {...point,sourceContract:{...point.sourceContract,principal:{...point.sourceContract.principal,issuedResult:base}}},
    {kind:'adverbial-adjunction-ast',supported:true,ok:true,strictAuthority:true,surface:'īc titlamatini',formulaRecord:point.formulaRecord}
  ]){
    assert.equal(r.isAdverbialAdjunctionResult(hostile),false);
    const badSource=source(hostile);
    assert.equal(badSource.authorizationStatus,'blocked');
    const c=r.createClassicalClauseRelationController();
    assert.equal(c.captureCurrentResult('principal',base).authorizationStatus,'authorized');
    assert.equal(c.captureCurrentResult('adjoined',hostile).authorizationStatus,'blocked');
    const binding=r.issueClassicalClauseRelationBindingFrame('clause:comparison',hostile,['adjoined']);
    assert.equal(binding.authorizationStatus,'blocked');
    assert.deepEqual(binding.bindingIds,[]);
    assert.equal(c.buildDecisionContract(choices).authorizationStatus,'blocked');
    assert.equal(c.preview(choices),null);
    assert.equal(c.compose(choices).authorizationStatus,'blocked');
    const request={routeId:'question-how-much-more',slots:{baseClause:source(base),degreeClause:badSource},choices:{questionCollocation:choices.questionCollocation,sentenceType:'none'}};
    assert.equal(r.requestClassicalComparisonResult(request).authorizationStatus,'blocked');
    assert.equal(r.executeClassicalGrammarApplicationRequest({operationId:'clause:comparison',args:[request]}).authorizationStatus,'blocked');
  }
});

test('AD131 comparison continuation explicitly retains the existing unsupported reload recovery',()=>{
  const made=controller(base,point).compose(selections('oc-yeh-cencah-hualcah'));
  assert.equal(made.authorizationStatus,'authorized',made.blockReason);
  assert.equal(exportClassicalResultReloadRecipe(r,{result:made.canonicalResult,source:point}),null);
  const block={dataset:{},style:{},setAttribute(){}};
  const storage=new Map(),url='https://example.invalid/grammar';
  const ctx={getClassicalClauseRelationControllerForRendering:()=>c,targetObject:{...r,document:{getElementById:id=>id==='classical-rule-logic-surface'?block:null,defaultView:{location:{href:url},sessionStorage:{setItem:(k,v)=>storage.set(k,v)}}}},classicalVncReloadPersistenceReady:true,classicalUnsupportedResultReloadPending:false,classicalVncAcceptedBasalReloadState:null,ActiveClassicalGrammarResultSourceCapture:{canonicalResult:point},PendingClassicalResultEdit:null,ActiveClassicalClauseRelationController:null,ActiveClassicalGrammarResultBinding:null,ActiveClassicalRuleLogicSurfaceFrame:null,ActiveClassicalCapabilityApplicationResult:null,
    CLASSICAL_VNC_RELOAD_SESSION_KEY:'test',exportClassicalResultReloadRecipe,
    exportClassicalGrammarWorkspaceHistoryReloadState:()=>null,getClassicalHistoryReloadSelection:()=>null,getActiveClassicalCapabilityApplicationResult:()=>null,getClassicalSgrOwnerIssuedProjection:()=>null,getClassicalVisibleAcceptedResult:()=>({canonicalResult:made.canonicalResult}),snapshotResultEditReload:()=>null,showClassicalHistoryReloadNotice(){},clearClassicalRuleLogicSurfaceBlock(){},clearClassicalGrammarResultSourceContinuation(){},syncClassicalCapabilityNavigator(){},syncClassicalCapabilityApplyOperationState(){}};
  vm.createContext(ctx);installClauseSelectionReaders(ctx);
  for(const name of ['saveClassicalVncReloadSession','restoreClassicalUnsupportedResultReload','renderClassicalUnsupportedResultReload'])vm.runInContext(extract(name),ctx);
  assert.equal(ctx.saveClassicalVncReloadSession(),false);
  const saved=JSON.parse(storage.get('test'));
  assert.equal(saved.kind,'unsupported-derived-result');
  assert.equal(ctx.restoreClassicalUnsupportedResultReload(saved,url),true);
  assert.equal(block.textContent,"This Result can't be restored after reload. Apply a Source to start a new build.");
  assert.equal(block.dataset.classicalResultPresentationAuthority,'false');
  assert.equal(block.dataset.classicalNahuatlAuthorizedResultCanFeedNextSource,'false');
  assert.equal(ctx.ActiveClassicalCapabilityApplicationResult,null);
});

test('AD131 admission excludes a genuine incompatible particle and copied comparison wrapper',()=>{
  const particle=r.requestClassicalParticleResult(r.buildClassicalNahuatlParticleSourceFrame('l3-in'));
  const choices=selections('oc-yeh-cencah-tlapanahuia');
  const badSource=source(particle);
  assert.equal(badSource.authorizationStatus,'blocked');
  const binding=r.issueClassicalClauseRelationBindingFrame('clause:comparison',particle,['adjoined']);
  assert.equal(binding.authorizationStatus,'blocked');
  assert.deepEqual(binding.bindingIds,[]);
  const c=r.createClassicalClauseRelationController();
  c.captureCurrentResult('principal',base);
  c.captureCurrentResult('adjoined',particle);
  assert.equal(c.buildDecisionContract(choices).authorizationStatus,'blocked');
  assert.equal(c.preview(choices),null);
  assert.equal(c.compose(choices).authorizationStatus,'blocked');
  const request={routeId:'question-how-much-more',slots:{baseClause:source(base),degreeClause:badSource},choices:{questionCollocation:choices.questionCollocation,sentenceType:'none'}};
  assert.equal(r.requestClassicalComparisonResult(request).authorizationStatus,'blocked');
  assert.equal(r.executeClassicalGrammarApplicationRequest({operationId:'clause:comparison',args:[request]}).authorizationStatus,'blocked');
  const pointSource=source(point);
  assert.equal(pointSource.authorizationStatus,'authorized');
  const copied={...pointSource};
  assert.equal(r.isClassicalComparisonSourceUnit(copied),false);
  assert.equal(r.getClassicalComparisonCanonicalSourceResult(copied),null);
  request.slots.degreeClause=copied;
  assert.equal(source(copied).authorizationStatus,'blocked');
  assert.throws(()=>r.requestClassicalComparisonResult(request),/forbidden-authority/u);
  assert.throws(()=>r.executeClassicalGrammarApplicationRequest({operationId:'clause:comparison',args:[request]}),/forbidden-authority/u);
});
