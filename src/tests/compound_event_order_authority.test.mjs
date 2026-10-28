import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import * as domains from '../core/classical/compound_choice_contract.mjs?eventOrder=20261028-1';
import {getClassicalNahuatlVncLateOperationUiControlOptions} from '../core/classical/vnc_late_operation_ui_contract.mjs';
const owner=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
const section=(start,end)=>code.slice(code.indexOf(start),code.indexOf(end,code.indexOf(start)));
function readEventOrder(value,matrix='yāuh'){
 const context=vm.createContext({overrides:{compoundEventOrder:value},compoundMatrixStem:matrix,sourceValue:'chōca',getClassicalRuleLogicSurfaceControlValue:()=>'',...domains});
 vm.runInContext(section('      const requestedCompoundEventOrder =','      const requestedCompoundNonactiveScope =')+'\nresult=compoundEventOrder;',context);
 return context.result;
}
const request=value=>({sourceStem:'chōca',verbClass:'A',sourceValence:'intransitive',subject:'3sg',mood:'indicative',tense:'present',voice:'active',lateOperation:'compound',lateVariant:'connective-t',compoundMatrixStem:'yāuh',compoundEventOrder:value});
test('actual interface request preserves both owner-authorized orders outside the old lexical whitelist',()=>{
 for(const value of ['iconic','hysteron-proteron']){
  const result=owner.evaluateClassicalNahuatlLateVncDerivation(request(value));
  assert.equal(result.authorizationStatus,'authorized',result.blockReason);
  assert.equal(readEventOrder(value),value,'interface must not replace owner-authorized intent');
  assert.equal(result.operationFrame.operationFacts.eventOrder,value);
 }
});
test('actual presentation retains owner event-order choice and selection for an ordinary matrix',()=>{
 const offered=getClassicalNahuatlVncLateOperationUiControlOptions('classical-rule-logic-compound-event-order');
 assert.deepEqual(offered.filter(x=>!x.disabled).map(x=>x.value),[...domains.getCompoundEventOrderDomain()]);
 const control={value:'hysteron-proteron',options:[...offered.map(x=>({value:x.value})),{value:'translation-order'}]};
 const context=vm.createContext({targetObject:{...owner,document:{getElementById:()=>control}},compoundMatrixStem:'yāuh',sourceStem:'chōca',surfaceFrame:{state:{}},...domains});
 vm.runInContext(section('      const eventOrderControl =','      const compoundVoiceOperation =')+'\nresult=eventOrderChoiceAvailable;',context);
 assert.equal(context.result,true);assert.equal(control.value,'hysteron-proteron');
 assert.deepEqual(control.options.filter(x=>!x.hidden&&!x.disabled).map(x=>x.value),[...domains.getCompoundEventOrderDomain()]);
 assert.equal(control.options.at(-1).disabled,true);
});
test('invalid event order reaches owner rejection rather than being silently rewritten',()=>{
 const value=readEventOrder('translation-order');assert.equal(value,'translation-order');
 const result=owner.evaluateClassicalNahuatlLateVncDerivation(request(value));
 assert.equal(result.authorizationStatus,'blocked');assert.match(result.blockReason,/licensed-compound-event-order-required/);
});
test('owner-authorized reverse choice survives shared preview and explicit Make with exact Source',async()=>{
 const {createConstructionSession}=await import('../ui/composition/construction_session.mjs');
 const {createVerbalDerivationScope,issueVerbalDerivationSnapshot,projectVerbalDerivationExecution}=await import('../ui/composition/verbal_derivation_transaction.mjs');
 const source=owner.evaluateClassicalNahuatlVncApplication({...request('iconic'),requestedDerivation:'direct',requestedVoice:'active'});
 assert.equal(source.authorizationStatus,'authorized');
 let executions=0;const ingress={};
 const session=createConstructionSession({isSource:x=>x===source,isResult:x=>owner.isClassicalNahuatlClosureFrame(x),execute:packet=>{executions++;return owner.executeClassicalGrammarApplicationRequest(packet.request);},present:()=>true});
 const scope=createVerbalDerivationScope({owner,source,session,getIngress:()=>ingress});
 for(const value of ['iconic','hysteron-proteron']){
  const binding=owner.issueClassicalNahuatlVncContinuationBindingFrame('vnc:derivational-operation',source,{lateOperation:'compound',lateVariant:'connective-t',compoundMatrixStem:'yāuh',compoundEventOrder:readEventOrder(value)});
  assert.equal(binding.bindingStatus,'ready',binding.blockReason);
  const snapshot=issueVerbalDerivationSnapshot(scope,{ingress,binding});
  const packet=projectVerbalDerivationExecution(snapshot);
  assert.equal(packet.request.args,binding.executionArgs);
  assert.equal(snapshot.contract.preview.operationFrame.operationFacts.eventOrder,value);
  session.stage({source,route:{operation:'vnc:derivational-operation'},slots:snapshot.captures,operationContract:snapshot,choices:{compoundEventOrder:value},legalMoves:[],ready:true,execution:packet});
  assert.equal(session.position.accepted.result,null);assert.equal(executions,0);
 }
 assert.equal(session.make(),true);assert.equal(executions,1);
 assert.equal(session.position.accepted.receipt.construction.source,source);
 assert.equal(session.position.accepted.result.operationFrame.operationFacts.eventOrder,'hysteron-proteron');
 assert.equal(session.position.accepted.result.operationFrame.operationFacts.interpretedFirstEvent,'matrix');
});
