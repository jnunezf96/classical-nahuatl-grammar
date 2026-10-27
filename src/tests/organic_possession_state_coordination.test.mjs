import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import {createOrganicPossessionStateCoordinator} from '../application/classical/organic_possession_choice_coordination.mjs';

const rendering=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
const marker=rendering.indexOf('"[data-deverbal-characteristic-reading]"');
const start=rendering.lastIndexOf('      targetObject.document?.querySelectorAll?.(',marker);
const end=rendering.indexOf('      const exactBinding = active',marker);

function fixture(){
 const reading={disabled:false};
 const readingWrapper={hidden:false,setAttribute(){},querySelectorAll:()=>[reading]};
 const stateWrapper={hidden:false,setAttribute(){}};
 const state={value:'absolutive',disabled:false,dataset:{},closest:()=>stateWrapper};
 const ctx=vm.createContext({coordinateOrganicPossessionState:createOrganicPossessionStateCoordinator(),active:true,activeSourceUnit:'nnc',selectedFamily:'patientive',patientiveFamily:'characteristic-property',reading:'inherent-quality',retainedNominalSource:null,getClassicalNominalConstructionControlValue:()=>ctx.reading,targetObject:{ClassicalSourcePartsCommittedSignature:'source-one',document:{querySelectorAll:()=>[readingWrapper],getElementById:()=>state}}});
 return {ctx,state,stateWrapper,run:()=>vm.runInContext(`{${rendering.slice(start,end)}}`,ctx)};
}

test('organic possession temporarily fixes state and restores the prior choice on the same source',()=>{
 const f=fixture();
 f.run();
 f.ctx.reading='organic-possession';f.run();
 assert.equal(f.state.value,'possessive');assert.equal(f.state.disabled,true);
 f.ctx.reading='inherent-quality';f.run();
 assert.equal(f.state.value,'absolutive');assert.equal(f.state.disabled,false);
});


test('a new committed Source cannot recover the previous Source state',()=>{
 const f=fixture();f.run();
 f.ctx.reading='organic-possession';f.run();
 f.ctx.targetObject.ClassicalSourcePartsCommittedSignature='source-two';f.run();
 f.ctx.reading='inherent-quality';f.run();
 assert.equal(f.state.value,'possessive');
});

test('an explicit replacement is retained on a later organic transition',()=>{
 const f=fixture();f.run();f.ctx.reading='organic-possession';f.run();
 f.ctx.reading='inherent-quality';f.run();
 f.state.value='possessive';f.run();
 f.ctx.reading='organic-possession';f.run();
 f.ctx.reading='inherent-quality';f.run();
 assert.equal(f.state.value,'possessive');
});

test('a different exact Result parent does not recover the prior parent state',()=>{
 const f=fixture();f.ctx.retainedNominalSource={exactResult:{},selectedBindingId:'patientive:characteristic-property'};
 f.run();f.ctx.reading='organic-possession';f.run();
 f.ctx.retainedNominalSource={exactResult:{},selectedBindingId:'patientive:characteristic-property'};f.run();
 f.ctx.reading='inherent-quality';f.run();
 assert.equal(f.state.value,'possessive');
});

test('leaving the characteristic family does not project its old state into a different route',()=>{
 const f=fixture();f.run();
 f.ctx.reading='organic-possession';f.run();
 f.ctx.selectedFamily='patientive-matrix-continuation';f.run();
 assert.equal(f.state.value,'possessive');
 f.ctx.selectedFamily='patientive';f.ctx.reading='inherent-quality';f.run();
 assert.equal(f.state.value,'possessive');
});
