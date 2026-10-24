import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {createPossessiveFixture} from './helpers/deverbal_possessive_fixture.mjs';
import {previewConstructionPacket} from '../ui/composition/construction_preview.mjs';
import {executeConstructionPacket} from '../ui/composition/construction_packet.mjs';
import {createConstructionSession} from '../ui/composition/construction_session.mjs';
import {projectResultForEditing} from '../ui/composition/result_editing.mjs';
const corpus=JSON.parse(readFileSync(new URL('./fixtures/nonce_interface_repairs_20261024.json',import.meta.url)));

async function fixture(stem,secondKind='specific-projective'){
  const h=await createPossessiveFixture(stem);
  for(const [id,value]of Object.entries({'classical-deverbal-nnc-family':'predicate-nominalization','classical-deverbal-nnc-nominalization-kind':'passive-action','classical-rule-logic-valence':'specific-projective','classical-rule-logic-object':'specific-projective:3sg','classical-rule-logic-nnc-possessor':'2sg','classical-source-object-count':'2','classical-source-object-2-kind':secondKind,'classical-source-object-2-person':'3sg'}))h.set(id,value);
  const option=h.r.getClassicalNahuatlNonactiveStemOptions(stem,{verbClass:'B',sourceValence:'specific-projective'}).options.find(o=>o.suffixFamily==='ō');
  assert(option,'the actual fresh stem supplies its own nonactive option');h.set('classical-rule-logic-nonactive-family',option.optionId);
  return h;
}

for(const [size,stem]of [['short',corpus.verbStems.short[0]],['medium',corpus.verbStems.medium[0]]]){
  test(`${size} raw passive-action possession changes the owner-promoted mainline patient, preserving its shuntline`,async()=>{
    const h=await fixture(stem),r=h.r,historyBeforeBuild=r.getClassicalGrammarWorkspaceHistorySnapshot();
    const request=r.buildClassicalNominalConstructionUiRequest();
    assert.deepEqual(r.getClassicalGrammarWorkspaceHistorySnapshot(),historyBeforeBuild,'owner-backed Source selection must not accept');
    const source=request.canonicalVncResult;
    assert.equal(source.authorizationStatus,'authorized',source.blockReason);
    assert.deepEqual(source.sourceAnalysisFrame.participantSurfaceObjectRequests.map(({objectId,objectPerson})=>({objectId,objectPerson})),[
      {objectId:'source-object-1',objectPerson:'3sg'},{objectId:'source-object-2',objectPerson:'2sg'},
    ]);
    assert.equal(source.participantProjection.targetSubject.referenceId,'source-object-2');
    assert.equal(source.participantProjection.targetSubject.category,'2sg');
    const result=r.evaluateClassicalNahuatlDeverbalNnc(request);
    assert.equal(result.authorizationStatus,'authorized',result.blockReason);
    assert.equal(result.canonicalResult.possessor,'2sg');assert.equal(result.canonicalResult.subject,'3common');
    assert.equal(result.operationFrame.transformedPossessor,'2sg');
    const packet={kind:'request',operation:'nnc:deverbal-construction',source,request:{operationId:'nnc:deverbal-construction',args:[request]}};
    const before=r.getClassicalGrammarWorkspaceHistorySnapshot(),preview=previewConstructionPacket(r,packet);
    assert(preview?.isCurrent());assert.equal(preview.canonicalResult.canonicalResult.possessor,'2sg');
    assert.deepEqual(r.getClassicalGrammarWorkspaceHistorySnapshot(),before,'preview must not accept');
    const accepted=r.executeClassicalGrammarApplicationRequest({operationId:'vnc:application',args:[{sourceStem:stem,verbClass:'B',sourceValence:'intransitive',subject:'3sg',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active'}]}).canonicalResult;
    const session=createConstructionSession({isSource:value=>value===source,isResult:value=>Boolean(projectResultForEditing(r,value)),execute:p=>executeConstructionPacket(r,p),present:()=>true});
    session.restore(accepted,null);session.stage({source,route:{operation:packet.operation},slots:[],choices:{possessor:'2sg'},ready:true,execution:packet});
    assert.equal(session.position.accepted.result,accepted,'staging retains the previous accepted Result');
    assert(session.make());assert.equal(session.position.accepted.result.canonicalResult.possessor,'2sg');
    assert.equal(session.position.accepted.result.wordSurface,preview.canonicalResult.wordSurface);
  });
}

test('a single specific shuntline plus nonspecific mainline follows the other passive-promotion rule',async()=>{
  const h=await fixture(corpus.verbStems.short[1],'nonspecific-nonhuman'),request=h.r.buildClassicalNominalConstructionUiRequest();
  const source=request.canonicalVncResult;
  assert.equal(source.participantProjection.targetSubject.referenceId,'source-object-1');
  assert.deepEqual(source.sourceAnalysisFrame.participantSurfaceObjectRequests.map(({objectId,objectKind,objectPerson})=>({objectId,objectKind,objectPerson})),[
    {objectId:'source-object-1',objectKind:'specific-projective',objectPerson:'2sg'},
    {objectId:'source-object-2',objectKind:'nonspecific-nonhuman',objectPerson:''},
  ]);
  const result=h.r.evaluateClassicalNahuatlDeverbalNnc(request);assert.equal(result.authorizationStatus,'authorized',result.blockReason);assert.equal(result.canonicalResult.possessor,'2sg');
});

test('an exact retained passive keeps its own patient; copied Sources cannot fall back to a fresh raw Source',async()=>{
  const h=await fixture(corpus.verbStems.medium[1],'nonspecific-nonhuman'),r=h.r;
  const original=r.buildClassicalNominalConstructionUiRequest().canonicalVncResult;
  const binding={operationId:'nnc:deverbal-construction',selectedBindingId:'predicate-nominalization:passive-action',exactResult:original};
  h.set('classical-rule-logic-nnc-possessor','3sg');
  const request=r.buildClassicalNominalConstructionUiRequest(binding);
  assert.equal(request.canonicalVncResult,original);
  const result=r.evaluateClassicalNahuatlDeverbalNnc(request);
  assert.equal(result.authorizationStatus,'authorized',result.blockReason);assert.equal(result.canonicalResult.possessor,'2sg');
  const copied=r.buildClassicalNominalConstructionUiRequest({...binding,exactResult:{...original}});
  assert.equal(r.evaluateClassicalNahuatlDeverbalNnc(copied).authorizationStatus,'blocked');
  assert.equal(r.isClassicalGrammarApplicationPreview(r.previewClassicalGrammarApplicationRequest({operationId:'nnc:deverbal-construction',args:[copied]})),false);
});

test('synchronizing a previous raw preview cannot erase a newly selected editable possessor',async()=>{
  const h=await fixture(corpus.verbStems.short[0]),r=h.r;
  h.set('classical-rule-logic-nnc-possessor','3sg');
  const prior=r.evaluateClassicalNahuatlDeverbalNnc(r.buildClassicalNominalConstructionUiRequest());
  assert.equal(prior.authorizationStatus,'authorized');assert.equal(prior.canonicalResult.possessor,'3sg');
  for(const control of h.controls.values())for(const option of control.options||[])option.dataset={};
  const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
  let binding=null;
  const ctx=vm.createContext({targetObject:{...r,document:h.documentObject},
    getActiveClassicalGrammarResultBinding:()=>binding,
    getClassicalNominalConstructionControlValue:(id,fallback)=>h.controls.get(id)?.value||fallback,
    buildClassicalNominalConstructionUiRequest:(...args)=>r.buildClassicalNominalConstructionUiRequest(...args)});
  for(const name of ['getClassicalRuleLogicFirstAllowedValue','applyClassicalRuleLogicSelectOptionAvailability','getClassicalDeverbalEditablePossessorValues','syncClassicalDeverbalNncStateOptions']){
    const start=code.indexOf(`    function ${name}(`),end=code.indexOf('\n    function ',start+1);assert(start>=0,name);vm.runInContext(code.slice(start,end),ctx);
  }
  ctx.syncClassicalDeverbalNncStateOptions(prior);
  h.set('classical-rule-logic-nnc-possessor','2sg');
  const history=r.getClassicalGrammarWorkspaceHistorySnapshot();
  ctx.syncClassicalDeverbalNncStateOptions(prior);
  assert.equal(h.controls.get('classical-rule-logic-nnc-possessor').value,'2sg','the old frame must not replace an editable pending selection');
  const updated=r.evaluateClassicalNahuatlDeverbalNnc(r.buildClassicalNominalConstructionUiRequest());
  assert.equal(updated.canonicalResult.possessor,'2sg');
  assert.deepEqual(r.getClassicalGrammarWorkspaceHistorySnapshot(),history);
  binding={exactResult:prior.sourceFrame.canonicalVncResult};ctx.syncClassicalDeverbalNncStateOptions(prior);
  assert.equal(h.controls.get('classical-rule-logic-nnc-possessor').value,'3sg','an explicitly retained finite Source still fixes its own participant');
  assert.equal(h.controls.get('classical-rule-logic-nnc-possessor').disabled,true);
});
