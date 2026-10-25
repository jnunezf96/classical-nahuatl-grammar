import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
function harness(){
 const make=()=>({hidden:true,disabled:true,dataset:{},attrs:{},setAttribute(k,v){this.attrs[k]=v;}});
 const lane=make(),otherLane=make(),unused=make();
 const labels=[make(),make()];
 const controls=labels.map(label=>({...make(),closest:selector=>selector.includes('grammar-lane')?lane:label}));
 labels.forEach(label=>{label.closest=selector=>selector.includes('grammar-lane')?lane:null;label.dataset.classicalConstructionGrammarLayer='route-specific';});
 lane.children=[...labels,unused];lane.parentElement={querySelectorAll:()=>[]};otherLane.children=[];otherLane.parentElement={querySelectorAll:()=>[]};
 const doc={getElementById:()=>null,querySelectorAll:()=>[lane,otherLane]};
 const ctx=vm.createContext({targetObject:{document:doc},getClassicalCapabilityBindingControlsForChoice:id=>[controls[id==='nominal-embed-relation'?0:1]],getClassicalVncContinuationControlFrame:()=>null});
 for(const name of ['restoreClassicalSentenceConjunctorPicker','syncClassicalPurposiveCoordinateControls','syncClassicalStagedLateOperationPrompt','syncClassicalStagedPersonalNameOuterSubjectPrompt','syncClassicalRelationalResultBindingChoiceVisibility','syncClassicalFrequentativeResultBindingChoice','syncClassicalVncContinuationApplicationPresentation','syncClassicalVncContinuationFormationChoice','syncClassicalVncContinuationParticipantChoices','syncClassicalVncContinuationHonorificParticipantChoice','syncClassicalVncContinuationSentenceChoices','syncClassicalVncContinuationApplicationSentenceChoices','syncClassicalRetainedNominalVncVoiceChoices','syncClassicalOrderedVoiceResultBindingChoices','syncClassicalRetainedVncGrammarOrganizer','syncClassicalOwnerhoodConnectiveChoices','syncClassicalCompoundPrimitiveEmbedChoice','syncClassicalFixedSequenceSourceChoice','syncClassicalSentenceConjunctorPicker','syncClassicalStemLayerChoices'])ctx[name]=()=>false;
 for(const name of ['syncClassicalActiveResultBindingChoiceVisibility','syncClassicalCustomFormationLanes']){
  const start=code.indexOf(`    function ${name}(`),end=code.indexOf('\n    function ',start+1);
  vm.runInContext(code.slice(start,end).split('\n    const ClassicalCompoundPrimitiveEmbedParents')[0],ctx);
 }
 return{ctx,lane,otherLane,unused,labels,controls};
}
test('required nominal relation and route remain reachable through their existing formation lane',()=>{
 const h=harness();const source=Object.freeze({});
 const binding={family:'formation',operationId:'grammar:nominal-construction',exactResult:source,requiredChoiceIds:['nominal-embed-relation','nominal-embed-route']};
 h.ctx.syncClassicalActiveResultBindingChoiceVisibility(binding);
 assert.equal(h.lane.hidden,false,'required controls cannot remain inside a hidden formation lane');
 assert.equal(h.lane.attrs['aria-hidden'],'false');
 h.labels.forEach(label=>assert.equal(label.hidden,false));
 h.controls.forEach(control=>assert.equal(control.disabled,false));
 assert.equal(h.unused.hidden,true);assert.equal(h.otherLane.hidden,true);
 assert.equal(binding.exactResult,source);
 h.ctx.syncClassicalCustomFormationLanes(null);
 assert.equal(h.lane.hidden,true,'leaving the active organizer still withdraws its lane');
});
