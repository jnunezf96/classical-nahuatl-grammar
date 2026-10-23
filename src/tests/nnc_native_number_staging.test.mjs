import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';

const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
const fixture=JSON.parse(readFileSync(new URL('./fixtures/nonce_nnc_native_number_20261023.json',import.meta.url),'utf8'));
const runtime=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
function harness(stem){
 const source=runtime.buildClassicalNahuatlOrdinaryNncSourceFrame({stem,sourceClass:'tl-1-a'});
 assert.equal(source.authorizationStatus,'authorized');
 const navigator=runtime.getClassicalGrammarApplicationCapabilityNavigator(source);
 const issued=selections=>runtime.issueClassicalGrammarTypedSourceOperationBindingFrame(navigator,'nnc:ordinary',selections);
 let binding=issued({subject:'3sg',animacy:'animate',humanness:'human',state:'absolutive',predicateFormation:'source-stem'});
 assert.equal(binding.bindingStatus,'ready');
 const accepted=runtime.executeClassicalGrammarTypedSourceOperationBindingFrame(binding);
 assert.equal(accepted.authorizationStatus,'authorized');
 binding=issued({...binding.callerSelections,predicateFormation:'yo-matrix'});
 assert.equal(binding.bindingStatus,'ready');
 let currentResult=accepted;
 const number={id:'classical-rule-logic-nnc-subject-number',value:'singular',disabled:false,readOnly:false,
  closest:selector=>selector==='#classical-rule-logic-controls'?{}:null};
 const status={textContent:''};
 const predicate={id:'classical-rule-logic-nnc-predicate-form',value:'source-stem',options:[{value:'source-stem',disabled:false},{value:'yo-matrix',disabled:false}]};
 let syncCalls=0,executions=0,lastProjection=null;
 const state=()=>({subject:number.value==='plural'?'3pl':'3sg',nncAnimacy:'animate',nncHumanness:'human',nncState:'absolutive',nncPredicateOptionId:'source-stem',nncStemRelation:'plain',nncMetaphoricalUse:false,nncPossessor:'',nncNumberForm:''});
 const ctx=vm.createContext({
  targetObject:{...runtime,document:{getElementById:id=>id===number.id?number:id===predicate.id?predicate:id==='classical-capability-operation-plan-status'?status:id==='classical-capability-navigator-operation'?{value:'nnc:ordinary'}:null}},
  ActiveClassicalGrammarResultBinding:null,ActiveClassicalGrammarResultSourceCapture:null,ActiveClassicalGrammarCapabilityNavigator:navigator,
  HandledClassicalContinuationChoiceEvents:new WeakSet(),CLASSICAL_CUSTOM_CONSTRUCTION_SOURCE_ANALYSIS_CONTROL_IDS:[],CLASSICAL_CAPABILITY_BINDING_CONTROL_IDS:{},
  stageClassicalSentenceRelationalMarkerRoute:()=>false,stageClassicalSentenceConjunctorRoute:()=>false,stageClassicalInactiveFiniteChoiceForParticleRoot:()=>false,
  getClassicalNominalConstructionControlValue:()=> 'none',handleClassicalIntermediateBuildTaskReset:()=>false,
  clearClassicalPreparedAttitudeResult(){},getActiveClassicalGrammarTypedSourceOperationBinding:()=>binding,
  getClassicalRuleLogicSurfaceState:state,
  getActiveClassicalCapabilityApplicationResult:()=>currentResult,ClassicalOrdinaryGrammarApplicationBySentence:new WeakMap(),
  getClassicalCanonicalNncContractInspection:()=>({status:'valid'}),
  getClassicalLexicalizedAffectiveParticipantSource:()=>null,getClassicalPreteritAgentiveParticipantChoices:()=>null,
  syncClassicalRuleLogicControlsForSurfaceFrame(frame){syncCalls++;lastProjection=frame;number.value=binding.effectiveSelections.subject.endsWith('pl')?'plural':'singular';},
  normalizeClassicalOrdinaryNncApplicationPossessor:value=>value,
  stageClassicalGrammarTypedSourceOperationBinding(op,selections){binding=issued({...selections});return binding;},
  syncClassicalCapabilityApplyOperationState:()=>({ready:binding.bindingStatus==='ready'}),
 });
 for(const name of ['getClassicalOrdinaryNncActiveCallerSelections','getClassicalGrammarTypedSourceNncSelections','getClassicalTypedNncBindingSurfaceState','syncClassicalTypedNncPredicateMirror','getClassicalOrdinaryNncControlProjection','getClassicalCurrentGrammarControlSurfaceFrame','getClassicalNncAuthorityOptionContract','handleClassicalCapabilityStagedGrammarControlChange']){
  const a=code.indexOf(`    function ${name}(`),b=code.indexOf('\n    function ',a+1);
  vm.runInContext(code.slice(a,b),ctx);
 }
 return {number,predicate,source,accepted,status,mirror(contract){return ctx.syncClassicalTypedNncPredicateMirror(binding,contract);},ordinaryProject(){return ctx.getClassicalOrdinaryNncControlProjection();},project(){const p=ctx.getClassicalCurrentGrammarControlSurfaceFrame();p.state.nncSourceIdentity={typedSourceFrame:source};return {surface:p,contract:ctx.getClassicalNncAuthorityOptionContract(p.state)};},edit(){return ctx.handleClassicalCapabilityStagedGrammarControlChange(number,{});},get binding(){return binding;},get syncCalls(){return syncCalls;},get lastProjection(){return lastProjection;},get currentResult(){return currentResult;},get executions(){return executions;},make(){executions++;currentResult=runtime.executeClassicalGrammarTypedSourceOperationBindingFrame(binding);return currentResult;},stageConnector(){binding=issued({...binding.callerSelections,pluralConnector:'m-eh'});}};
}

test('native Number stages plural before accepted-context synchronization and preserves another pending Stem choice',()=>{
 for(const {stem} of fixture.cases){
  const h=harness(stem);h.number.value='plural';assert.equal(h.edit(),true);
  assert.equal(h.binding.callerSelections.subject,'3pl');
  assert.equal(h.binding.callerSelections.predicateFormation,'yo-matrix');
  assert.equal(h.binding.exactSource,h.source);assert.equal(h.currentResult,h.accepted);assert.equal(h.executions,0);
  assert.equal(h.binding.bindingStatus,'choices-required');assert.match(h.status.textContent,/Make Result|Complete Build/);
  assert.equal(h.number.value,'plural');assert.equal(h.syncCalls,1);
  assert.equal(h.lastProjection.state.subject,'3pl');assert.equal(h.lastProjection.state.nncPredicateOptionId,'yo-matrix');
  assert.equal(h.lastProjection.state.nncTypedSourceFrame,h.source);
 }
});

test('native Number can return to singular without replacing Source or accepting a Result',()=>{
 const h=harness(fixture.cases[0].stem);h.number.value='plural';h.edit();h.number.value='singular';h.edit();
 assert.equal(h.binding.callerSelections.subject,'3sg');assert.equal(h.binding.callerSelections.predicateFormation,'yo-matrix');
 assert.equal(h.binding.bindingStatus,'ready');assert.equal(h.binding.exactSource,h.source);assert.equal(h.currentResult,h.accepted);
 assert.equal(h.executions,0);assert.equal(h.make().authorizationStatus,'authorized');assert.equal(h.executions,1);
});

// The owner still requires its legal number ending; staging does not accept it.
test('plural completion stays pending until explicit Make consumes the same exact Source',()=>{
 const h=harness(fixture.cases[1].stem);h.number.value='plural';h.edit();h.stageConnector();
 assert.equal(h.binding.bindingStatus,'ready');assert.equal(h.currentResult,h.accepted);assert.equal(h.executions,0);
 const made=h.make();assert.equal(made.authorizationStatus,'authorized');
 assert.equal(made.canonicalResult.sourceFrame,h.source);assert.equal(h.binding.callerSelections.subject,'3pl');
 assert.notEqual(made,h.accepted);assert.equal(h.executions,1);
});

test('an incomplete plural binding keeps Stem and participant choices through the real later control projection',()=>{
 const h=harness(fixture.cases[0].stem);h.number.value='plural';h.edit();
 assert.equal(h.binding.bindingStatus,'choices-required');
 const {surface,contract}=h.project();
 assert.equal(surface.state.nncPredicateOptionId,'yo-matrix');assert.equal(surface.state.subject,'3pl');
 assert.equal(surface.state.nncTypedSourceFrame,h.source);
 assert.equal(contract.authorizationStatus,'authorized');assert.equal(contract.selectedPredicateOptionId,'yo-matrix');
 assert.equal(contract.selectedSubject,'3pl');assert.equal(contract.selectedAnimacy,'animate');
 assert.deepEqual(Array.from(contract.stateValues),['absolutive','possessive']);
 assert.equal(h.currentResult,h.accepted);assert.equal(h.executions,0);
});


test('accepted-result repaint without an explicit binding still preserves the matching staged NNC choices',()=>{
 const h=harness(fixture.cases[0].stem);h.number.value='plural';h.edit();
 const p=h.ordinaryProject();
 assert.equal(p.state.nncPredicateOptionId,'yo-matrix');assert.equal(p.state.subject,'3pl');
 assert.equal(p.state.nncTypedSourceFrame,h.source);assert.equal(h.currentResult,h.accepted);
});


test('the native Predicate mirror adopts the pending authored value even when its old value is still legal',()=>{
 const h=harness(fixture.cases[1].stem);h.number.value='plural';h.edit();
 const {contract}=h.project();assert.equal(h.predicate.value,'source-stem');
 assert.equal(h.mirror({...contract,sourceFrame:{}}),false);assert.equal(h.predicate.value,'source-stem');
 assert.equal(h.mirror(contract),true);assert.equal(h.predicate.value,'yo-matrix');
 assert.equal(h.currentResult,h.accepted);assert.equal(h.executions,0);
});
