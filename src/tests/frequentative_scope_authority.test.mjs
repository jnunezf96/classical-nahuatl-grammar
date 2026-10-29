import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';import vm from 'node:vm';import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
const request=(voice='active',scope='patient')=>({sourceStem:'caqui',verbClass:'B',sourceValence:'specific-projective',derivationType:'direct',requestedDerivation:'direct',objectKind:'specific-projective',objectPerson:'3sg',subject:'3sg',mood:'indicative',tense:'present',requestedVoice:voice,voice,lateOperation:'frequentative',lateVariant:'ordinary-short-glottal',frequentativeScope:scope});
const active=r.evaluateClassicalNahuatlLateVncDerivation(request()),passive=r.evaluateClassicalNahuatlLateVncDerivation(request('passive'));
function project(closure,rawValence='specific-projective'){
 const control={value:'patient',options:['open','action','agent','patient','occasion','place'].map(value=>({value}))};
 const a=code.indexOf('      const frequentativeScopeControl ='),b=code.indexOf('      const frequentativeTargetControl =',a);
 vm.runInNewContext(code.slice(a,b),{targetObject:{...r,document:{getElementById:()=>control}},targetClosure:closure,surfaceFrame:{state:{valence:rawValence}}});return control;
}
test('actual scope projection follows effective passive object loss and preserves rejected authored patient',()=>{
 assert.equal(active.authorizationStatus,'authorized');assert.equal(passive.blockReason,'patient-scope-requires-typed-source-object');
 const a=project(active),p=project(passive);assert.equal(a.options.find(x=>x.value==='patient').disabled,false);assert.equal(p.options.find(x=>x.value==='patient').disabled,true);assert.equal(p.value,'patient');
 const absent=project(null);assert.equal(absent.options.some(x=>!x.disabled),false);const copied=project({...active});assert.equal(copied.options.some(x=>!x.disabled),false);
});
test('authentic owner scope descriptor covers rejected preflight and explicit recovery without raw valence',()=>{
 assert.equal(typeof r.getClassicalNahuatlFrequentativeScopeChoices,'function');const get=r.getClassicalNahuatlFrequentativeScopeChoices;
 assert(get(active).values.includes('patient'));assert.equal(get(passive).values.includes('patient'),false);assert(get(passive).values.includes('open'));
 assert.deepEqual(get({...active}).values,[]);assert.deepEqual(get(null).values,[]);
 const recovered=r.evaluateClassicalNahuatlLateVncDerivation(request('active','open'));assert.equal(recovered.authorizationStatus,'authorized',recovered.blockReason);assert.equal(recovered.operationFrame.operationFacts.semanticScope,'open');assert.equal(get(recovered).values.includes('patient'),true);
 const wrongShape=r.evaluateClassicalNahuatlLateVncDerivation({...request(),lateVariant:'ordinary-long'});assert.equal(wrongShape.blockReason,'frequentative-scope-requires-short-glottal-formation');
});
test('actual request reader retains patient on an intransitive Source for owner rejection',()=>{
 const a=code.indexOf('      const requestedFrequentativeScope ='),b=code.indexOf('      const purposiveSeries =',a),ctx=vm.createContext({overrides:{frequentativeScope:'patient'},requestedValence:'intransitive',getClassicalRuleLogicSurfaceControlValue:()=>''});
 vm.runInContext(code.slice(a,b)+'\nselected=frequentativeScope;',ctx);assert.equal(ctx.selected,'patient');
 const made=r.evaluateClassicalNahuatlLateVncDerivation({...request('active',ctx.selected),sourceStem:'chōca',verbClass:'A',sourceValence:'intransitive',objectKind:'none',objectPerson:''});assert.equal(made.authorizationStatus,'blocked');assert.equal(made.blockReason,'patient-scope-requires-typed-source-object');
});
test('current raw scope rejection and explicit recovery preserve accepted work until Make',async()=>{
 const {createConstructionSession}=await import('../ui/composition/construction_session.mjs');const {createVerbalDerivationScope,issueVerbalDerivationSnapshot,projectVerbalDerivationExecution}=await import('../ui/composition/verbal_derivation_transaction.mjs');
 const source=r.evaluateClassicalNahuatlVncApplication(request()),ingress={},context={source,ingress,committed:true};let executions=0;
 const session=createConstructionSession({isSource:x=>x===source,isResult:x=>r.isClassicalNahuatlClosureFrame(x),execute:packet=>{executions++;return r.executeClassicalGrammarApplicationRequest(packet.request);},present:()=>true});session.restore(active);
 const scope=createVerbalDerivationScope({owner:r,source,session,getIngress:()=>ingress,getSourceContext:()=>context});
 for(const [voice,selection,ready] of [['active','patient',true],['passive','patient',false],['active','open',true]]){
  const snapshot=issueVerbalDerivationSnapshot(scope,{ingress,sourceContext:context,request:request(voice,selection)});assert.ok(snapshot);assert.equal(snapshot.contract.ready,ready);assert.equal(snapshot.contract.request.frequentativeScope,selection);
  const packet=projectVerbalDerivationExecution(snapshot);if(!ready)assert.equal(packet,null);
  session.stage({source,route:{operation:'vnc:derivational-operation'},operationContract:snapshot,slots:snapshot.captures,choices:{frequentativeScope:selection},legalMoves:[],ready,execution:packet});assert.equal(session.position.accepted.result===active,true);assert.equal(executions,0);
 }
 assert.equal(session.make(),true);assert.equal(executions,1);assert.equal(session.position.accepted.result.operationFrame.operationFacts.semanticScope,'open');assert.equal(session.position.accepted.receipt.construction.source===source,true);
});
