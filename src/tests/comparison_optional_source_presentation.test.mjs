import {installClauseSelectionReaders} from './helpers/clause_selection_reader_fixture.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import {createConstructionSession} from '../ui/composition/construction_session.mjs';
import {createStructureDesign,projectClauseStructure,comparisonCapturePresentation,setStructureDesignContext} from '../ui/composition/structure_design.mjs';
import {Element} from './helpers/organization_dom.mjs';
const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
const project=exact=>{const c=r.captureClassicalGrammarApplicationResult(exact,'optional-source-presentation');return c.authorizationStatus==='authorized'&&c.canonicalResult===exact?{canonicalResult:exact,surface:exact.wordSurface||exact.surface,operationId:c.operationId}:null;};
function noun(stem,sourceClass){const source=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem,sourceClass});const nav=r.getClassicalGrammarApplicationCapabilityNavigator(source);const binding=r.issueClassicalGrammarTypedSourceOperationBindingFrame(nav,'nnc:ordinary',{subject:'3common',animacy:'nonanimate',humanness:'nonhuman',state:'absolutive',predicateFormation:'source-stem'});const receipt=r.executeClassicalGrammarTypedSourceOperationBindingFrame(binding);assert.equal(receipt.authorizationStatus,'authorized',receipt.blockReason);return receipt.canonicalResult;}

test('captured optional comparison Source is inspectable and clears through the owner without replacing accepted Result',()=>{
  const cal=noun('cal','tli-1'),tepe=noun('tepe','tl-1-a'),c=r.createClassicalClauseRelationController();
  for(const[role,exact]of Object.entries({principal:cal,adjoined:tepe}))assert.equal(c.captureCurrentResult(role,exact).authorizationStatus,'authorized');
  const choices={relation:'comparison',comparisonRoute:'similarity-incorporated-nehnequi',degreeMarker:'achi',sentenceType:'none'};
  const receipt=c.compose(choices);assert.equal(receipt.authorizationStatus,'authorized',receipt.blockReason);const accepted=receipt.canonicalResult;
  const root=new Element();root.id='classical-workbench';const source=new Element();source.id='classical-source-panel';const original=new Element();original.id='classical-grammar-continuation';root.append(source,original);
  const create=tag=>{const e=new Element(tag);e.click=()=>e.listeners.click?.forEach(f=>f());e.classList.toggle=(name,on)=>{if(on)e.classList.add(name);else e.className=e.className.split(/\s+/).filter(c=>c!==name).join(' ');};return e;};
  const doc={createElement:create,addEventListener(){},getElementById:id=>id===root.id?root:root.querySelector('#'+id),querySelector:s=>root.querySelector(s),querySelectorAll:s=>root.querySelectorAll(s)};
  let executions=0;
  const session=createConstructionSession({isSource:x=>x===cal,isResult:x=>r.isClassicalComparisonResultFrame(x),execute:p=>{executions++;return c.compose(p.choices);},present:()=>true});session.restore(accepted);
  const binding={};let state;
  const ctx={comparisonCapturePresentation,targetObject:{document:doc},ClassicalClauseRelationSelections:{...choices},ActiveClassicalClauseRelationResult:receipt,
    formatClassicalClauseRelationValue:x=>x,createGrammarInspectorLine:()=>create('span'),
    appendClassicalWholeCanvasPanelActionRow(card,actions){for(const action of actions){const b=create('button');b.textContent=action.label;b.dataset.classicalUserAction=action.action;b.addEventListener('click',action.onClick);card.append(b);}},
    refreshClassicalClauseRelationWorkflow(){const contract=c.buildDecisionContract(ctx.ClassicalClauseRelationSelections);session.stage({source:cal,route:{operation:'comparison'},slots:[{role:'principal',exact:cal}],choices:{...ctx.ClassicalClauseRelationSelections},legalMoves:[],ready:contract.authorizationStatus==='authorized',execution:{choices:{...ctx.ClassicalClauseRelationSelections},signature:JSON.stringify(ctx.ClassicalClauseRelationSelections)}});state={...projectClauseStructure(r,c,ctx.ClassicalClauseRelationSelections,project),sourceScope:cal,bindingScope:binding,operation:'clause:comparison',bindingId:'comparison:principal'};},
  };
  vm.createContext(ctx);installClauseSelectionReaders(ctx);
  for(const name of ['applyClassicalComparisonChoiceIntent','shouldPreserveClassicalComparisonCaptureChoices','resetClassicalClauseRelationSelections','appendClassicalClauseRelationCaptureCard']){const start=code.indexOf(`    function ${name}(`);assert.ok(start>=0);vm.runInContext(code.slice(start,code.indexOf('\n    function ',start+20)),ctx);}
  ctx.refreshClassicalClauseRelationWorkflow();
  assert.deepEqual(state.sources.map(s=>[s.role,s.exact]),[['principal',cal],['adjoined',tepe]]);
  assert.equal(state.sources.find(s=>s.role==='adjoined').optionalCapture,true);
  ctx.appendClassicalClauseRelationCaptureCard(original,c,'adjoined',{captured:true,unitType:'nnc',surface:'Tepetl.'});
  setStructureDesignContext(root,()=>state);const refresh=createStructureDesign(doc);refresh();
  const clear=source.querySelector('[data-composition-clear-capture="adjoined"]');assert.ok(clear,'optional Source card exposes the existing clear action');
  const currentState=state;state={...state,bindingScope:{}};clear.click();assert.equal(c.getCapturedCanonicalResult('adjoined'),tepe,'stale binding cannot clear');state=currentState;
  clear.click();
  assert.equal(c.getCapturedCanonicalResult('adjoined'),null);
  assert.equal(ctx.ClassicalClauseRelationSelections.comparisonRoute,choices.comparisonRoute);
  assert.equal(ctx.ClassicalClauseRelationSelections.degreeMarker,'achi');
  assert.equal(ctx.ActiveClassicalClauseRelationResult,null);
  assert.equal(session.position.accepted.result,accepted);assert.equal(executions,0);
  assert.deepEqual(state.sources.map(s=>s.role),['principal'],'uncaptured optional roles create no phantom card');
  assert.equal(session.make(),true,session.position.failure?.blockReason);assert.equal(executions,1);
  assert.equal(session.position.accepted.result.surface,'achi mocalnehnequi');
  assert.equal(session.position.accepted.result.operationFrame.sourceSlots.comparand,undefined);
  assert.equal(accepted.surface,'tepetl achi mocalnehnequi');
});

test('complement Source projection retains the filled complement and required locative auxiliary',()=>{
 const cal=noun('cal','tli-1'),tepe=noun('tepe','tl-1-a');
 const principal=r.executeClassicalGrammarApplicationRequest({operationId:'vnc:application',args:[{sourceStem:'tōcāyōtiā',verbClass:'C',sourceValence:'projective-nonhuman',subject:'3sg',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active'}]}).canonicalResult;
 assert.equal(principal.authorizationStatus,'authorized');
 const c=r.createClassicalClauseRelationController();
 for(const[role,exact]of Object.entries({principal,adjoined:cal,dependent:tepe}))assert.equal(c.captureCurrentResult(role,exact).authorizationStatus,'authorized');
 const choices={relation:'object-complement',semanticCategory:'designation',linkKind:'object-subject',designationStructure:'tla-locative-supplement-plus-place-name',complementOrder:'principal-complement'};
 const contract=c.buildDecisionContract(choices);assert.equal(contract.derived.operationFamily,'complement');assert.equal(contract.derived.auxiliaryRequired,true);
 // No composition is asserted here: this checks faithful presentation of
 // genuine captured parents while the grammar owner retains all authority.
 const state=projectClauseStructure(r,c,choices,project);
 assert.deepEqual(state.sources.map(s=>s.role),['principal','adjoined','dependent']);
 assert.ok(state.sources[0].exact===principal&&state.sources[1].exact===cal&&state.sources[2].exact===tepe,'exact captured identities retained');
 const ordinary=projectClauseStructure(r,c,{...choices,designationStructure:'ordinary-object-complement'},project);
 assert.deepEqual(ordinary.sources.map(s=>s.role),['principal','adjoined'],'inactive auxiliary is not represented as an input');
});
