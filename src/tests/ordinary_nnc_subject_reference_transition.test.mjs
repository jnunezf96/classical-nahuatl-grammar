import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import {createConstructionSession} from '../ui/composition/construction_session.mjs';
const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
const ctx=vm.createContext({targetObject:r});
for(const name of ['getClassicalOrdinaryNncActiveCallerSelections','getClassicalOrdinaryNncNextChoiceProjection']){
 const a=code.indexOf(`    function ${name}(`);assert.ok(a>=0,name);
 vm.runInContext(code.slice(a,code.indexOf('\n    function ',a+20)),ctx);
}
test('ordinary first and second person edits replace stale nonhuman reference while contradictory owner packets reject',()=>{
 const source=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:'oquich',sourceClass:'tli-1'});
 assert.equal(r.isClassicalNahuatlOrdinaryNncSourceFrame(source),true);
 const nav=r.getClassicalGrammarApplicationCapabilityNavigator(source);
 const bind=s=>r.issueClassicalGrammarTypedSourceOperationBindingFrame(nav,'nnc:ordinary',s);
 const original={state:'absolutive',subject:'3pl',humanness:'nonhuman',pluralConnector:'t-in',stemFormation:'plain',predicateFormation:'source-stem'};
 const priorBinding=bind(original);assert.equal(priorBinding.bindingStatus,'ready',priorBinding.blockReason);
 const accepted=r.executeClassicalGrammarTypedSourceOperationBindingFrame(priorBinding).canonicalResult;
 assert.equal(accepted.operationFrame.subjectParticipantFrame.category,'3pl');
 const projection=ctx.getClassicalOrdinaryNncNextChoiceProjection(bind(original));
 for(const subject of ['1sg','2sg','1pl','2pl']){
  const changed={...original,subject};
  const choices=ctx.getClassicalOrdinaryNncActiveCallerSelections(source,changed);
  assert.equal(choices.humanness,'human',subject);
  assert.equal(projection.subject.find(o=>o.optionId===subject)?.availabilityStatus,'available',subject);
  const binding=bind(choices);assert.equal(binding.bindingStatus,'ready',binding.blockReason);
  assert.equal(binding.exactSource,source);assert.equal(binding.effectiveSelections.humanness,'human');
  let executions=0;
  const session=createConstructionSession({isSource:v=>v===source,isResult:r.isClassicalNahuatlOrdinaryNncResult,execute:p=>{executions++;return r.executeClassicalGrammarTypedSourceOperationBindingFrame(p.binding);},present:()=>true});
  session.restore(accepted);
  session.stage({source,route:{operation:'nnc:ordinary'},slots:[{role:'source',exact:source}],choices,legalMoves:[],ready:true,execution:{binding,signature:subject}});
  assert.equal(session.position.accepted.result,accepted);assert.equal(executions,0);
  assert.equal(session.make(),true,session.position.failure?.blockReason);assert.equal(executions,1);
  const made=session.position.accepted.result;
  assert.equal(made.operationFrame.subject,subject);
  assert.equal(made.operationFrame.subjectParticipantFrame.category,subject);
  assert.equal(made.operationFrame.referentialHumanness,'human');
  assert.equal(made.sourceFrame,source);
  const bad={...choices,humanness:'nonhuman'};
  assert.equal(r.buildClassicalNahuatlOrdinaryNncOperationFrame(source,bad).authorizationStatus,'blocked');
  assert.equal(bind(bad).bindingStatus,'rejected');
 }
 for(const humanness of ['human','nonhuman']){
  const choices=ctx.getClassicalOrdinaryNncActiveCallerSelections(source,{...original,humanness});
  assert.equal(choices.humanness,humanness);
  const made=r.executeClassicalGrammarTypedSourceOperationBindingFrame(bind(choices)).canonicalResult;
  assert.equal(made.operationFrame.subjectParticipantFrame.category,'3pl');
  assert.equal(made.operationFrame.referentialHumanness,humanness);
 }
 const common=ctx.getClassicalOrdinaryNncActiveCallerSelections(source,{state:'absolutive',subject:'3common',humanness:'nonhuman'});
 const commonResult=r.executeClassicalGrammarTypedSourceOperationBindingFrame(bind(common)).canonicalResult;
 assert.equal(commonResult.operationFrame.subjectParticipantFrame.category,'3common');
 assert.equal(commonResult.operationFrame.referentialHumanness,'nonhuman');
 assert.equal(r.isClassicalNahuatlOrdinaryNncSourceFrame({...source}),false);
});
