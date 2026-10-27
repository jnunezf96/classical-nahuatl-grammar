import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import {createOrganicPossessionStateCoordinator} from '../application/classical/organic_possession_choice_coordination.mjs';

const rendering=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
const marker=rendering.indexOf('"[data-deverbal-characteristic-reading]"');
const start=rendering.lastIndexOf('      targetObject.document?.querySelectorAll?.(',marker);
const end=rendering.indexOf('      const exactBinding = active',marker);
function setup(selectedFamily){
 const reading={disabled:false};
 const readingWrapper={hidden:false,setAttribute(){},querySelectorAll:()=>[reading]};
 const stateWrapper={hidden:false,setAttribute(){}};
 const state={value:'absolutive',disabled:false,dataset:{},closest:()=>stateWrapper};
 const ctx=vm.createContext({coordinateOrganicPossessionState:createOrganicPossessionStateCoordinator(),retainedNominalSource:null,active:true,activeSourceUnit:'nnc',patientiveRoute:true,patientiveFamily:'characteristic-property',selectedFamily,getClassicalNominalConstructionControlValue:()=> 'organic-possession',targetObject:{document:{querySelectorAll:()=>[readingWrapper],getElementById:()=>state}}});
 return{ctx,reading,readingWrapper,state,stateWrapper,run:()=>vm.runInContext(`{${rendering.slice(start,end)}}`,ctx)};
}
test('inherited characteristic reading cannot force compound continuation State',()=>{
 for(const family of ['patientive-embed-continuation','patientive-matrix-continuation']){
  const s=setup(family);s.run();
  assert.equal(s.readingWrapper.hidden,true,`${family} has no new characteristic reading`);
  assert.equal(s.reading.disabled,true);
  assert.equal(s.state.value,'absolutive');assert.equal(s.state.disabled,false);
 }
 const s=setup('patientive');s.run();
 assert.equal(s.readingWrapper.hidden,false);assert.equal(s.reading.disabled,false);
 assert.equal(s.state.value,'possessive');assert.equal(s.state.disabled,true);
 s.ctx.selectedFamily='patientive-matrix-continuation';s.run();
 assert.equal(s.state.disabled,false);assert.equal(s.stateWrapper.hidden,false);
 assert.equal(s.state.dataset.classicalDerivedOrganicPossessionState,undefined);
 s.state.value='absolutive';s.run();assert.equal(s.state.value,'absolutive');
});
