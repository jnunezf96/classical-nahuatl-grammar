import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
const request=(stem='ē-hua',c='A',variant='connective-t')=>({sourceStem:'chōca',verbClass:'A',sourceValence:variant==='shared-object'?'specific-projective':'intransitive',objectKind:'specific-projective',objectPerson:'3sg',subject:'3sg',mood:'indicative',tense:'present',voice:'active',lateOperation:'compound',lateVariant:variant,compoundMatrixStem:stem,compoundMatrixClass:c});
function project(stem,c,variant='connective-t',owner=r){
 const control={value:c,options:['A','B','C','D'].map(value=>({value}))};
 const start=code.includes('      const automaticCompoundMatrixClasses =')?code.indexOf('      const automaticCompoundMatrixClasses ='):code.indexOf('      const matrixClassControl =');
 const end=code.indexOf('      const eventOrderControl =',start);
 const ctx=vm.createContext({targetObject:{...owner,document:{getElementById:()=>control}},compoundMatrixStem:stem,variant,surfaceFrame:{state:request(stem,c,variant)},validTargetBinding:false,targetOwner:null});
 vm.runInContext(code.slice(start,end),ctx);
 const a=code.indexOf('        "classical-rule-logic-compound-matrix-class":',end),b=code.indexOf('        "classical-rule-logic-compound-itz-sense":',a);
 ctx.operation='compound';vm.runInContext('visible=('+code.slice(a,b).split(':').slice(1).join(':').trim().replace(/,$/,'')+');',ctx);
 return {value:control.value,values:control.options.filter(x=>!x.disabled&&!x.hidden).map(x=>x.value),visible:ctx.visible};
}
test('actual matrix class projection follows owner-fixed facts and productive alternatives',()=>{
 assert.deepEqual(project('chōca','B'),{value:'A',values:['A'],visible:false});
 assert.deepEqual(project('nemi','B'),{value:'B',values:['A','B'],visible:true});
 assert.deepEqual(project('ē-hua','B'),{value:'B',values:['A','B'],visible:true});
 assert.deepEqual(project('m-o-cāhua','B','reflexive-matrix'),{value:'B',values:['A','B'],visible:true});
 assert.deepEqual(project('cāhua','B','shared-object'),{value:'B',values:['A','B'],visible:true});
 assert.deepEqual(project('tla-nequi','A','future-embed'),{value:'B',values:['B'],visible:false});
 assert.equal(project('','A').visible,false);
 assert.deepEqual(project('ē-hua','C'),{value:'C',values:['A','B'],visible:true});
});
test('owner descriptor is the class derivation authority, with raw invalid request rejection preserved',()=>{
 assert.equal(typeof r.getClassicalNahuatlCompoundMatrixClassChoices,'function');
 for(const [stem,c,variant,selected] of [['ē-hua','A','connective-t','A'],['ē-hua','B','connective-t','B'],['nemi','A','connective-t','A'],['nemi','B','connective-t','B'],['chōca','B','connective-t','A'],['m-o-cāhua','B','reflexive-matrix','B'],['cāhua','B','shared-object','B'],['tla-nequi','A','future-embed','B']]){
  const q=request(stem,c,variant),d=r.getClassicalNahuatlCompoundMatrixClassChoices(q),made=r.evaluateClassicalNahuatlLateVncDerivation(q);
  assert.equal(d.selected,selected);assert.equal(made.authorizationStatus,'authorized',made.blockReason);assert.equal(made.matrixApplicationFrame.normalizedRequest.verbClass,selected);
 }
 const invalid=r.evaluateClassicalNahuatlLateVncDerivation(request('ē-hua','C'));assert.equal(invalid.authorizationStatus,'blocked');assert.equal(invalid.blockReason,'e-hua-matrix-requires-licensed-a-or-b-class-history');
});
test('actual authored class reader and owner snapshot preserve class B without accepting staged work',async()=>{
 const start=code.indexOf('      const compoundMatrixClass ='),end=code.indexOf('      const compoundMatrixNonactiveOptionId =',start);
 const ctx=vm.createContext({overrides:{compoundMatrixClass:'B'},getClassicalRuleLogicSurfaceControlValue:()=>''});vm.runInContext(code.slice(start,end)+'\nselected=compoundMatrixClass;',ctx);assert.equal(ctx.selected,'B');
 const {createConstructionSession}=await import('../ui/composition/construction_session.mjs');
 const {createVerbalDerivationScope,issueVerbalDerivationSnapshot,projectVerbalDerivationExecution}=await import('../ui/composition/verbal_derivation_transaction.mjs');
 const source=r.evaluateClassicalNahuatlVncApplication({...request(),requestedDerivation:'direct',requestedVoice:'active'}),ingress={};let executions=0;
 const session=createConstructionSession({isSource:x=>x===source,execute:()=>{executions++;}}),scope=createVerbalDerivationScope({owner:r,source,session,getIngress:()=>ingress});
 const binding=r.issueClassicalNahuatlVncContinuationBindingFrame('vnc:derivational-operation',source,{lateOperation:'compound',lateVariant:'connective-t',compoundMatrixStem:'ē-hua',compoundMatrixClass:ctx.selected});assert.equal(binding.bindingStatus,'ready');
 const snapshot=issueVerbalDerivationSnapshot(scope,{ingress,binding}),packet=projectVerbalDerivationExecution(snapshot);
 assert.equal(packet.request.args,binding.executionArgs);assert.equal(snapshot.contract.preview.matrixApplicationFrame.normalizedRequest.verbClass,'B');
 session.stage({source,route:{operation:'vnc:derivational-operation'},operationContract:snapshot,choices:{compoundMatrixClass:'B'},slots:snapshot.captures,legalMoves:[],ready:true,execution:packet});assert.equal(executions,0);assert.equal(session.position.accepted.result,null);
});

test('exact recursive matrix class takes precedence over a raw UI class claim',()=>{
 const inner=r.evaluateClassicalNahuatlLateVncDerivation(request('ē-hua','B'));
 const q={...request('', 'A'),compoundMatrixClosureFrame:inner};
 const d=r.getClassicalNahuatlCompoundMatrixClassChoices(q);
 assert.deepEqual(d.values,['B']);assert.equal(d.selected,'B');assert.equal(d.selectionRequired,false);
 const made=r.evaluateClassicalNahuatlLateVncDerivation(q);assert.equal(made.authorizationStatus,'authorized',made.blockReason);assert.equal(made.operationFrame.targetClass,'B');assert.equal(made.operationFrame.operationFacts.recursiveMatrixFrame===inner,true);
 const copied=r.evaluateClassicalNahuatlLateVncDerivation({...q,compoundMatrixClosureFrame:{...inner}});assert.equal(copied.authorizationStatus,'blocked');
});

test('exact nominal matrix class remains fixed and rejects a conflicting raw class',()=>{
 const ns=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:'pil',sourceClass:'tli-1'}),no=r.buildClassicalNahuatlOrdinaryNncOperationFrame(ns,{state:'absolutive',subject:'3sg',predicateFormation:'source-stem',humanness:'human'});
 const embed=r.executeClassicalGrammarApplicationRequest({operationId:'nnc:ordinary',args:[ns,no]}).canonicalResult;
 const matrix=r.executeClassicalGrammarApplicationRequest({operationId:'vnc:application',args:[{sourceStem:'caqui',verbClass:'B',sourceValence:'specific-projective',objectKind:'specific-projective',objectPerson:'3sg',subject:'3sg',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active'}]}).canonicalResult;
 const nominal=r.executeClassicalGrammarApplicationRequest({operationId:'grammar:nominal-construction',args:[{constructionKind:'nominal-embed-vnc',relation:'object',route:'object',subject:'3sg',mood:'indicative',tense:'present',voice:'active',embedReduplication:'none',matrixFormation:'ordinary',matrixReduplication:'none',orientation:'not-applicable',source:{embedStem:'pil',embedClass:'tli',embedSourceClass:'tli-1',embedConstituent:{kind:'ordinary-nnc',stem:'pil',resultFrame:embed},matrixStem:'caqui',matrixValence:'specific-projective',matrixVerbClass:'B',matrixConstituent:{kind:'vnc-result',stem:'caqui',resultFrame:matrix}}}]}).canonicalResult;
 const q={...request('',''),compoundMatrixVncResultFrame:nominal},d=r.getClassicalNahuatlCompoundMatrixClassChoices(q);assert.deepEqual(d.values,['B']);assert.equal(d.selected,'B');assert.equal(d.selectionRequired,false);
 const made=r.evaluateClassicalNahuatlLateVncDerivation(q);assert.equal(made.authorizationStatus,'authorized',made.blockReason);assert.equal(made.operationFrame.targetClass,'B');assert.equal(made.operationFrame.operationFacts.nominalMatrixResultFrame===nominal,true);
 const conflict=r.evaluateClassicalNahuatlLateVncDerivation({...q,compoundMatrixClass:'A'});assert.equal(conflict.blockReason,'typed-matrix-request-continuity-required');
 const copied=r.evaluateClassicalNahuatlLateVncDerivation({...q,compoundMatrixVncResultFrame:{...nominal}});assert.equal(copied.authorizationStatus,'blocked');
});
