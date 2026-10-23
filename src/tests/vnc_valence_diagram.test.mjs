import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import vm from 'node:vm';

const fixture=JSON.parse(readFileSync(new URL('./fixtures/nonce_vnc_valence_diagram_20261023.json',import.meta.url),'utf8'));
const instance=await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}},collectModuleInspectionDescriptors:true});
const r=Object.create(instance.runtimeObject);
Object.defineProperties(r,instance.moduleInspectionDescriptors);
const application=(sourceStem,sourceValence,extra={})=>{
  const app=r.evaluateClassicalNahuatlVncApplication({sourceStem,verbClass:'A',sourceValence,subject:'1sg',requestedDerivation:'direct',requestedVoice:'active',outputScope:'single',...extra});
  assert.equal(app.authorizationStatus,'authorized',app.blockReason);
  return app;
};
const diagramFor=app=>{
  const slots=app.resultFrame.finalTypedVncSlotFrame;
  const diagram=r.requestClassicalVncDiagrammaticFrame(slots);
  assert.equal(diagram.authorizationStatus,'authorized',diagram.blockReason);
  assert.equal(diagram.linearFormula,r.renderClassicalNahuatlVncSlotFrameFormula(slots));
  assert.deepEqual(diagram.rows.map(row=>row.role),['Subject','Core','Tense']);
  assert.equal(diagram.rows[1].expression,`${slots.slots.prePredicate.length?`+${slots.slots.prePredicate.map(slot=>slot.formulaCarrier||slot.carrier).join('+')}`:''}(${slots.slots.predicate.stem})`);
  return {slots,diagram};
};

test('accepted VNC analysis finds the exact final typed slots rather than losing Diagram and General',()=>{
  const source=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
  const name='getClassicalNominalConstructionDiagrammaticFrame';
  const start=source.indexOf(`    function ${name}(`),end=source.indexOf('\n    function ',start+1);
  const context=vm.createContext({targetObject:r});vm.runInContext(source.slice(start,end),context);
  for(const stem of fixture.cases.map(row=>row.sourceStem)){
    const app=application(stem,'specific-projective',{objectPerson:'3sg'});
    const diagram=context[name](app,'vnc');
    assert.equal(diagram?.authorizationStatus,'authorized');
    assert.equal(diagram.linearFormula,r.renderClassicalNahuatlVncSlotFrameFormula(app.resultFrame.finalTypedVncSlotFrame));
    assert(diagram.generalLinearFormula);assert(diagram.generalRows.length);
    assert.equal(diagram.valenceRows.length,1);
  }
});

test('multiple-valence projection preserves prefix order and typed history as separate facts',()=>{
  const f=fixture.cases[0],{slots,diagram}=diagramFor(application(f.sourceStem,'multiple-object',{objectRequests:f.objectRequests}));
  assert.equal(diagram.derivationMetadataAvailable,true);
  assert.deepEqual(diagram.valenceRows.map(row=>row.objectId),['later-specific','earlier-human']);
  assert.deepEqual(diagram.valenceRows.map(row=>row.derivationalLevel),[2,1]);
  assert.deepEqual(diagram.valenceRows.map(row=>row.valenceArity),['dyadic','monadic']);
  diagram.valenceRows.forEach((row,index)=>{
    const slot=slots.slots.prePredicate[index],position=slot.objectPositionFrame;
    assert.equal(row.slotId,slot.id);assert.equal(row.prefixOrder,index+1);
    assert.equal(row.formulaCarrier,slot.formulaCarrier||slot.carrier);
    assert.equal(row.expression,`+${row.formulaCarrier}`);
    for(const field of ['objectId','governor','derivationalLevel','prominence','sounded'])assert.equal(row[field],position[field]);
    assert.equal(row.silencingRule,position.silencingRule||'');
  });
  assert(diagram.ruleRefs.some(ref=>ref.section==='23.4'));
  assert(diagram.ruleRefs.some(ref=>ref.section==='23.5'));
  assert(!diagram.ruleRefs.some(ref=>ref.section==='6.3'));
});

test('silent dyadic shuntline positions stay visible and copied projections cannot authorize',()=>{
  const f=fixture.cases[1],{slots,diagram}=diagramFor(application(f.sourceStem,'multiple-object',{objectRequests:f.objectRequests}));
  const row=diagram.valenceRows.find(row=>row.objectId==='earlier-specific');
  const slot=slots.slots.prePredicate.find(slot=>slot.objectPositionFrame?.objectId===row.objectId);
  assert.equal(row.sounded,false);assert.equal(row.prominence,'shuntline');
  assert.equal(row.formulaCarrier,slot.formulaCarrier||slot.carrier);
  assert.equal(row.valenceArity,'dyadic');assert(row.silencingRule);
  assert.equal(r.isClassicalNahuatlVncDiagrammaticFrame(diagram),true);
  assert.equal(r.isClassicalNahuatlVncDiagrammaticFrame({...diagram}),false);
  assert.equal(r.isClassicalNahuatlVncDiagrammaticFrame(JSON.parse(JSON.stringify(diagram))),false);
});

test('compact monadic, dyadic and vacant slots retain forms without inventing derivational history',()=>{
  const stem=fixture.cases[2].sourceStem;
  for(const [valence,extra,arity] of [['projective-human',{},'monadic'],['specific-projective',{objectPerson:'3sg'},'dyadic'],['intransitive',{},'vacant']]){
    const {slots,diagram}=diagramFor(application(stem,valence,extra));
    assert.equal(diagram.valenceArity,arity);
    assert.equal(diagram.derivationMetadataAvailable,false);
    assert.equal(diagram.valenceRows.length,arity==='vacant'?0:1);
    for(const row of diagram.valenceRows){
      assert.equal(row.formulaCarrier,slots.slots.prePredicate[0].carrier);
      assert.equal(row.valenceArity,arity);
      assert.equal(row.objectId,'');assert.equal(row.governor,'');
      assert.equal(row.derivationalLevel,null);assert.equal(row.prominence,'');
      assert.equal(row.sounded,null);
    }
  }
  const blocked=r.requestClassicalVncDiagrammaticFrame(null);
  assert.notEqual(blocked.authorizationStatus,'authorized');
  assert.deepEqual(blocked.valenceRows,[]);
  assert.equal(blocked.derivationMetadataAvailable,false);
});
