import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {buildClassicalNahuatlParticipantFrame} from '../core/classical/participant_frame.mjs';
import {readFileSync} from 'node:fs';
import {createPossessiveFixture} from './helpers/deverbal_possessive_fixture.mjs';
const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
async function fixture(){
 const f=await createPossessiveFixture('mauhcā');
 f.r.getClassicalSourcePartControlState=()=>({mode:'embed-matrix',sourceEmbedStem:'mauhcā',sourceMatrixStem:'quīza'});
 for(const [id,v] of Object.entries({'classical-construction-operation':'nominal-embed-vnc','classical-nominal-embed-role':'adverb','classical-nominal-embed-adverbial-role':'manner','classical-rule-logic-class':'B','classical-rule-logic-valence':'intransitive','classical-rule-logic-vnc-subject-person':'3','classical-rule-logic-vnc-subject-animacy':'animate','classical-rule-logic-vnc-subject-humanness':'human','classical-rule-logic-vnc-subject-number':'plural','classical-rule-logic-mood':'indicative','classical-rule-logic-tense':'preterit','classical-rule-logic-vnc-voice':'active','classical-rule-logic-directional':'huāl','classical-rule-logic-nnc-state':'absolutive'}))f.set(id,v);
 return f;
}
test('Andrews mauhcā-quīza incorporation forwards plural preterit and huāl to its canonical owner',async()=>{
 const {r,set}=await fixture();
 const request=r.buildClassicalNominalConstructionUiRequest();
 assert.equal(request.subject,'3pl');
 const made=r.requestClassicalNominalConstructionResult(request);
 assert.equal(made.authorizationStatus,'authorized',made.blockReason);
 assert.equal(made.canonicalResult.normalizedRequest.sentenceOptions.directionalPrefix,'huāl');
 assert.equal(made.wordSurface,'huālmauhcāquīzqueh');
 set('classical-rule-logic-directional','none');set('classical-rule-logic-vnc-subject-number','singular');
 const plain=r.requestClassicalNominalConstructionResult(r.buildClassicalNominalConstructionUiRequest());
 assert.equal(plain.authorizationStatus,'authorized',plain.blockReason);
 assert.equal(plain.wordSurface,'mauhcāquīz');
});
test('raw incorporation releases the previous nonanimate participant domain without accepting a Result',async()=>{
 const {r,controls,set}=await fixture();
 set('classical-rule-logic-vnc-subject-humanness','nonhuman');set('classical-rule-logic-vnc-subject-number','singular');
 const number=controls.get('classical-rule-logic-vnc-subject-number'),human=controls.get('classical-rule-logic-vnc-subject-humanness');
 number.options.forEach(o=>o.disabled=o.value!=='common');human.options.forEach(o=>o.disabled=o.value!=='nonhuman');
 const start=code.indexOf('      if (["attitude-vnc", "nominal-embed-vnc"].includes(selected)',code.indexOf('function syncClassicalNominalConstructionControlVisibility('));
 const end=code.indexOf('\n      if (typeof syncClassicalContextualFlawedSubjectControls',start);
 const accepted={same:true};
 const c=vm.createContext({selected:'nominal-embed-vnc',ActiveClassicalGrammarResultBinding:null,ActiveClassicalGrammarResultSourceCapture:null,targetObject:r,accepted,
 getClassicalNominalConstructionControlValue:(id,f)=>controls.get(id)?.value||f,
 getClassicalRuleLogicSurfaceControlValue:(id,f)=>controls.get(id)?.value||f,
 buildClassicalNahuatlParticipantFrame,
 applyClassicalRuleLogicSelectOptionAvailability(id,values,selected){const el=controls.get(id);el.options.forEach(o=>o.disabled=!values.includes(o.value));if(selected)el.value=selected;}});
 for(const name of ['getClassicalRuleLogicVncSubjectFrame','syncClassicalVncSubjectFeatureControls']){
 const a=code.indexOf(`    function ${name}(`),b=code.indexOf('\n    function ',a+1);vm.runInContext(code.slice(a,b),c);
 }
 vm.runInContext('function sync(){'+code.slice(start,end)+'}',c);c.sync();
 assert.equal(human.options.find(o=>o.value==='human').disabled,false);
 assert.equal(number.options.find(o=>o.value==='plural').disabled,false);
 set(human.id,'human');set(number.id,'plural');c.sync();
 assert.equal(r.buildClassicalNominalConstructionUiRequest().subject,'3pl');assert.equal(c.accepted,accepted);
 set('classical-rule-logic-vnc-subject-animacy','nonanimate');c.sync();
 assert.equal(number.value,'common');assert.equal(human.value,'nonhuman');
});
