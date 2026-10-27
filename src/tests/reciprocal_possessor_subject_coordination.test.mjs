import test from 'node:test';
import assert from 'node:assert/strict';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import {createClassicalNahuatlNncLayerEvaluatorApi} from '../core/classical/nnc_layer_evaluator.mjs';
import {createUiRenderingApi} from '../ui/rendering/rendering.mjs';
const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
// Productive nonce fixture, not an attested Andrews lexical example.
const source=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:'poxmel',sourceClass:'tli-1'});
const choices=subject=>({subject,animacy:'animate',humanness:'human',state:'possessive',possessor:'reciprocal',stemFormation:'plain',predicateFormation:'source-stem'});
test('Andrews 13.1-13.4 keeps the ne possessor distinct from independently inflected subjects',()=>{
 const nav=r.getClassicalGrammarApplicationCapabilityNavigator(source);
 for(const subject of ['1sg','2sg','3sg','1pl','2pl','3pl']) {
  const domain=r.getCanonicalNncOperationSelectionFrame(source,choices(subject));assert(domain.possessorValues.includes('reciprocal'),subject);
  const binding=r.issueClassicalGrammarTypedSourceOperationBindingFrame(nav,'nnc:ordinary',choices(subject));assert.equal(binding.bindingStatus,'ready',`${subject}: ${binding.blockReason}`);
  const made=r.executeClassicalGrammarTypedSourceOperationBindingFrame(binding);assert.equal(made.authorizationStatus,'authorized',`${subject}: ${made.blockReason}`);
  const op=made.canonicalResult.operationFrame || made.canonicalResult;assert.equal(op.possessor,'reciprocal');
 }
});
test('independent typed Source and state conditions remain mandatory',()=>{
 const nav=r.getClassicalGrammarApplicationCapabilityNavigator(source);
 const invalid=r.issueClassicalGrammarTypedSourceOperationBindingFrame(nav,'nnc:ordinary',{...choices('1sg'),state:'absolutive'});assert.notEqual(invalid.bindingStatus,'ready');
 const fake=r.getCanonicalNncOperationSelectionFrame({...source},choices('1sg'));assert.notEqual(fake.authorizationStatus,'authorized');
 const raw=r.buildClassicalNahuatlPossessiveNncFrame('poxmel',{subject:'1sg',possessor:'ne',singularConnector:'0'});
 assert.equal(raw.authorizationStatus,'authorized',raw.blockReason);assert.equal(raw.stateFrame.possessorRole,'reciprocal');assert.equal(raw.stateFrame.slots[0].carrier,'ne');
});
test('full paradigm keeps third-person ne while subject agreement remains independent',()=>{
 const api=createClassicalNahuatlNncLayerEvaluatorApi(r);
 const f=api.buildClassicalNahuatlPossessiveNncFrame('poxmel',{subject:'3sg',possessor:'ne',singularConnector:'0'});
 for(const [referent,expected] of [['animate',['1sg','2sg','3sg','1pl','2pl','3pl']],['nonanimate',['3common']]]) {
  const p=api.buildClassicalNahuatlPossessiveParadigmPlan(f.possessiveParadigmContractFrame,{referent});
  assert.equal(p.authorizationStatus,'authorized',p.blockReason);
  assert.equal(r.inspectRegisteredGrammarContract(r.getDefaultGrammarContractRegistry(),p).status,'valid');
  assert.deepEqual(p.coordinates.filter(c=>c.possessorIdentity==='reciprocal').map(c=>c.subject),expected);
 }
});
test('ordinary Source paradigm includes every permitted subject with reciprocal possessor',()=>{
 const p=r.prepareClassicalNahuatlOrdinaryNncParadigmPlan(source,{
  states:['possessive'],subjects:['1sg','2sg','3sg','1pl','2pl','3pl'],possessors:['reciprocal'],
  humanness:'human',predicateFormation:'source-stem',
 });
 assert.equal(p.authorizationStatus,'authorized',p.blockReason);
 assert.deepEqual([...new Set(p.coordinates.map(c=>c.subject))],['1sg','2sg','3sg','1pl','2pl','3pl']);
 assert(p.coordinates.every(c=>c.possessor==='reciprocal'));
});
test('the existing full-paradigm presentation accepts each canonical possessor map without dropping common number',()=>{
 const ui=createUiRenderingApi(r);const frame=ui.buildClassicalNncParadigmFrame({
  basalUnit:'nnc',stem:'pah',nncState:'possessive',nncOutputScope:'paradigm',nncPossessor:'2sg',
  nncAnimacy:'animate',nncStemRelation:'plain',nncClausePosition:'initial',
  sentenceSurfaceMode:'statement',sentenceNegativeMode:'positive',
 });
 assert.equal(frame.authorizationStatus,'authorized',frame.blockReason);
 assert.deepEqual([...new Set(frame.rows.filter(row=>row.state.nncPossessor==='reciprocal')
  .map(row=>row.state.subject))],['1sg','2sg','3sg','1pl','2pl','3pl']);
 const group=frame.mapFrame.stateViews.find(view=>view.state==='possessive').possessorGroups.find(g=>g.key==='specific');
 assert.equal(group.matrix.authorizationStatus,'authorized');assert(group.matrix.noMapDropped);assert(group.matrix.noMapDuplicated);
 assert(group.matrix.positions.some(position=>position.person==='third' && position.number==='common' && position.possessor==='3common'));
 assert(group.matrix.positions.filter(position=>position.number==='common' && position.person!=='third')
  .every(position=>position.map===null));
 assert(frame.mapFrame.noSourceRowDropped);assert(frame.mapFrame.noSourceRowDuplicated);
 assert.equal(frame.rowCount,frame.mapFrame.representedSourceRowCount);
 assert.equal(frame.rowCount,frame.smithVisualFrame.displayEntryCount);
});
