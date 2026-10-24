import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import {createConstructionSession} from '../ui/composition/construction_session.mjs';
import {executeConstructionPacket} from '../ui/composition/construction_packet.mjs';
import {createClassicalGrammarWorkspaceHistory} from '../application/classical/grammar_workspace_history.mjs';

// Internal owner/API lifecycle contracts remain useful after removal of the
// public Writing lane. Do not fabricate its retired Source controls or claim
// these API paths are public journeys. Current public input is tested in
// long_vowel_input.test.mjs and legacy_long_vowel_checks.test.mjs.
const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
const fixture=name=>JSON.parse(readFileSync(new URL(`./fixtures/${name}`,import.meta.url),'utf8'));
const fresh=fixture('nonce_writing_long_vowel_fixture.json');
const raw=word=>r.issueClassicalTranscriptionSourceFrame([{segments:word.segments}]);
const bind=(source,writingVariant='ordinary')=>r.issueClassicalGrammarTypedSourceOperationBindingFrame(
  r.getClassicalGrammarApplicationCapabilityNavigator(source),'orthography:transcription',{writingVariant});
const compound=name=>{
  const f=fixture(name),application=r.executeClassicalGrammarApplicationRequest({operationId:'grammar:nominal-construction',args:[f.request]});
  assert.equal(application.authorizationStatus,'authorized',application.blockReason);
  const source=r.issueClassicalNahuatlWritingSourceFromApplication(application,f.morphParts);
  assert.equal(r.isClassicalNahuatlTranscriptionSourceFrame(source),true);
  return {f,application,source};
};
function sessionFor(parent=null){
  let executions=0;
  const session=createConstructionSession({isSource:r.isClassicalNahuatlTranscriptionSourceFrame,
    isResult:value=>value===parent?.canonicalResult || r.isClassicalNahuatlTranscriptionFrame(value),
    execute:packet=>{executions++;return executeConstructionPacket(r,packet);},present:()=>true});
  const receipt=parent?Object.freeze({application:parent}):null;
  if(parent)assert.equal(session.restore(parent.canonicalResult,receipt),true);
  const stage=(source,variant='ordinary')=>{
    const binding=bind(source,variant);assert.equal(r.isClassicalGrammarTypedSourceOperationBindingFrame(binding),true);
    return session.stage({source,route:{operation:'orthography:transcription',binding:'typed-source'},slots:[],
      choices:{writingVariant:binding.effectiveSelections.writingVariant},legalMoves:[],ready:binding.bindingStatus==='ready',
      execution:{kind:'typed',operation:'orthography:transcription',source,binding}});
  };
  return {session,receipt,stage,get executions(){return executions;}};
}
const historyFor=()=>createClassicalGrammarWorkspaceHistory({
  captureClassicalGrammarApplicationResult:r.captureClassicalGrammarApplicationResult,
  isClassicalGrammarApplicationResultCapture:r.isClassicalGrammarApplicationResultCapture,
  isClassicalGrammarApplicationResult:r.isClassicalGrammarApplicationResult,
  getClassicalGrammarApplicationCapabilityNavigator:r.getClassicalGrammarApplicationCapabilityNavigator,
  isClassicalGrammarApplicationCapabilityNavigator:r.isClassicalGrammarApplicationCapabilityNavigator});

test('internal Writing Source replacement and pending edits retain accepted custody until explicit session Make',()=>{
  const h=sessionFor(),first=raw(fresh.words[0]),second=raw(fresh.words[1]);
  assert.equal(h.stage(first),true);assert.equal(h.executions,0);assert.equal(h.session.position.accepted.result,null);
  assert.equal(h.session.make(),true);const accepted=h.session.position.accepted.result,receipt=h.session.position.accepted.receipt;
  assert.equal(accepted.surface,fresh.words[0].stem);assert(accepted.sourceFrame===first);assert.equal(h.executions,1);
  assert.equal(h.session.stage({source:first,sourcePending:true,sourceDraft:{sounds:fresh.words[1].stem},
    route:h.session.position.construction.route,slots:[],choices:h.session.position.choices,legalMoves:[],ready:false,execution:null}),true);
  assert.equal(h.session.make(),false);assert(h.session.position.accepted.result===accepted);assert(h.session.position.accepted.receipt===receipt);
  assert.equal(h.stage(second),true);assert(h.session.position.accepted.result===accepted);assert(h.session.position.accepted.receipt===receipt);assert.equal(h.executions,1);
  assert.equal(h.session.make(),true);assert(h.session.position.accepted.result.sourceFrame===second);assert.equal(h.session.position.accepted.result.surface,fresh.words[1].stem);assert.equal(h.executions,2);
});

for(const [label,file,variantCount] of [['kk','nonce_writing_source_fixture.json',2],['ordered kw+k','nonce_writing_kwk_fixture.json',3]]){
  test(`internal ${label} whole-writing variants stage against the same genuine compound and preserve receipt until Make`,()=>{
    const {application,source}=compound(file),h=sessionFor(application),owner=bind(source).ownerBindingFrame;
    const variants=owner.choiceOptionProjection.writingVariant.map(choice=>choice.value);assert.equal(variants.length,variantCount);
    const surfaces=[];
    for(const variant of [...variants,'ordinary']){
      const accepted=h.session.position.accepted.result,receipt=h.session.position.accepted.receipt,before=h.executions;
      assert.equal(h.stage(source,variant),true);assert(h.session.position.accepted.result===accepted);assert(h.session.position.accepted.receipt===receipt);assert.equal(h.executions,before);
      assert.equal(h.session.make(),true);const made=h.session.position.accepted.result;assert(made.sourceFrame===source);assert(made.writingContext.exactApplicationResult===application);assert.equal(r.isClassicalNahuatlTranscriptionFrame(made),true);surfaces.push(made.surface);
    }
    assert.equal(new Set(surfaces.slice(0,-1)).size,variantCount);assert.equal(surfaces.at(-1),surfaces[0]);
    if(label==='ordered kw+k')assert.deepEqual(h.session.journal.filter(row=>row.type==='make').map(row=>row.position.accepted.result.dependencyResults.length),[0,1,2,0]);
  });
}

test('internal required n+p whole-writing Make retains original morphs and the actual mandatory writer baseline',()=>{
  const {application,source}=compound('nonce_writing_required_np_fixture.json'),h=sessionFor(application);
  assert.equal(source.writingContext.morphParts.length,8);assert.equal(source.writingContext.morphParts.find(part=>part.role==='embed').segments.at(-1),'/n/');
  assert.deepEqual(bind(source).choiceOptionProjection.writingVariant.map(choice=>choice.value),['ordinary']);
  assert.equal(h.stage(source),true);assert(h.session.position.accepted.result===application.canonicalResult);assert(h.session.position.accepted.receipt===h.receipt);assert.equal(h.executions,0);
  assert.equal(h.session.make(),true);const made=h.session.position.accepted.result;
  assert(made.sourceFrame===source);assert(made.baselineWrittenResult===application.lesson2WritingOutputs.find(row=>row.role==='word').writtenResult);
  assert.equal(made.dependencyResults[0].selectedRuleId,'cn-l2-211-regressive-n-p-mp');assert.equal(made.dependencyResults[0].optional,false);assert.equal(h.executions,1);
});

test('internal History Undo and Return recover exact Writing accounts; reconnecting a genuine Source is staging only',()=>{
  const h=sessionFor(),history=historyFor(),firstSource=raw(fresh.words[0]),secondSource=raw(fresh.words[1]);
  h.stage(firstSource);assert.equal(h.session.make(),true);const first=h.session.position.accepted.result,firstNode=history.record(h.session.position.accepted.receipt.application);
  h.stage(secondSource);assert.equal(h.session.make(),true);const second=h.session.position.accepted.result,secondNode=history.record(h.session.position.accepted.receipt.application);
  const undone=history.undo();assert(undone.canonicalResult===first);assert.equal(r.isClassicalGrammarApplicationResultCapture(undone),true);assert.equal(h.executions,2);
  assert.equal(h.session.restore(undone.canonicalResult),true);assert.equal(h.session.position.accepted.receipt,null);assert.equal(h.stage(undone.canonicalResult.sourceFrame),true);assert(h.session.position.accepted.result===first);assert(h.session.position.construction.source===firstSource);assert.equal(h.executions,2);
  const returned=history.continueFrom(secondNode.nodeId);assert(returned.canonicalResult===second);assert.equal(h.session.restore(returned.canonicalResult),true);h.stage(secondSource);assert(h.session.position.accepted.result===second);assert.equal(h.executions,2);
  assert(history.recover(firstNode.nodeId).canonicalResult===first);assert.equal(h.session.restore({...first}),false);assert(h.session.position.accepted.result===second);
});

test('internal fixed-group optional restoration stages its real variant without claiming a public Writing editor',()=>{
  const h=sessionFor(),history=historyFor(),source=r.issueClassicalNahuatlWritingSourceFromParticleGroup(['l3-za','l3-oc'].map(id=>r.buildClassicalNahuatlParticleSourceFrame(id)));
  const elision=bind(source).choiceOptionProjection.writingVariant.find(choice=>choice.elision).value;
  h.stage(source,elision);assert.equal(h.session.make(),true);const elided=h.session.position.accepted.result,node=history.record(h.session.position.accepted.receipt.application);
  h.stage(raw(fresh.words[1]));assert.equal(h.session.make(),true);
  const capture=history.continueFrom(node.nodeId);assert.equal(h.session.restore(capture.canonicalResult),true);assert.equal(h.stage(capture.canonicalResult.sourceFrame,capture.canonicalResult.operationFrame.writingVariant),true);
  assert(h.session.position.accepted.result===elided);assert.equal(h.session.position.accepted.receipt,null);assert.equal(h.session.position.choices.writingVariant,elision);assert.equal(h.executions,2);
  h.stage(source,'ordinary');assert(h.session.position.accepted.result===elided);assert.equal(h.executions,2);assert.equal(h.session.make(),true);assert.equal(h.session.position.accepted.result.surface,'zā oc');
});

test('internal History cannot restore a copied or currently invalid required-boundary Result',()=>{
  const {source}=compound('nonce_writing_required_np_fixture.json'),h=sessionFor(),history=historyFor();h.stage(source);assert.equal(h.session.make(),true);const first=h.session.position.accepted.result,node=history.record(h.session.position.accepted.receipt.application);
  h.stage(raw(fresh.words[0]));assert.equal(h.session.make(),true);const later=h.session.position.accepted.result,receipt=h.session.position.accepted.receipt,laterSource=h.session.position.construction.source;
  assert.equal(h.session.restore({...first,sourceFrame:{...source}}),false);assert(h.session.position.accepted.result===later);
  const owner=r.buildClassicalNahuatlAssimilationFrame;
  try{r.buildClassicalNahuatlAssimilationFrame=()=>null;assert.equal(r.isClassicalNahuatlTranscriptionSourceFrame(source),false);assert.equal(r.isClassicalNahuatlTranscriptionFrame(first),false);assert.equal(h.session.restore(history.recover(node.nodeId).canonicalResult),false);assert(h.session.position.accepted.result===later);assert(h.session.position.accepted.receipt===receipt);assert(h.session.position.construction.source===laterSource);assert.equal(h.executions,2);}finally{r.buildClassicalNahuatlAssimilationFrame=owner;}
  assert.equal(r.isClassicalNahuatlTranscriptionFrame(first),true);assert.equal(h.session.restore(first),true);assert.equal(h.stage(source),true);assert(h.session.position.accepted.result===first);assert.equal(h.executions,2);
});
