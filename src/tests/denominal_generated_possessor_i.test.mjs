import test from 'node:test';
import assert from 'node:assert/strict';
import {createPossessiveFixture} from './helpers/deverbal_possessive_fixture.mjs';

async function fixture(stem,nounClass){
 const f=await createPossessiveFixture(stem),{controls,set,documentObject}=f;
 documentObject.createElement=tag=>({tagName:tag.toUpperCase(),value:'',textContent:'',hidden:false,disabled:false,dataset:{},setAttribute(){},removeAttribute(){}});
 for(const c of controls.values())if(c.tagName==='SELECT'){
  for(const o of c.options){o.dataset={};o.setAttribute=()=>{};o.removeAttribute=()=>{};}
  c.replaceChildren=()=>{c.options=[]};c.appendChild=o=>{o.remove=()=>{c.options=c.options.filter(x=>x!==o)};c.options.push(o);return o};c.prepend=o=>c.options.unshift(o);
 }
 controls.set('classical-source-parts',{dataset:{classicalBasalUnit:'nnc'}});
 for(const [id,value]of Object.entries({
  'classical-construction-operation':'denominal-vnc','classical-rule-logic-nnc-class':nounClass,
  'classical-denominal-vnc-operation':'included-possessor-ti',
  'classical-denominal-vnc-operation-path':'possessive-nnc-predicate|included-possessor-ti:A',
  'classical-rule-logic-vnc-subject-person':'3','classical-rule-logic-vnc-subject-number':'singular',
  'classical-rule-logic-vnc-subject-animacy':'animate','classical-rule-logic-vnc-subject-humanness':'human',
  'classical-rule-logic-mood':'indicative','classical-rule-logic-tense':'present',
  'classical-rule-logic-vnc-output-scope':'single',
 })) {set(id,value);controls.get(id).disabled=false;}
 controls.get('classical-denominal-vnc-source-possessor').disabled=false;
 return f;
}
for(const [stem,cls,family]of [['pan','zero','temporal-pan'],['tlahuēlil','tli-1','misfortune']])test(`raw ${family} generates real possessor i without lexical i selection`,async()=>{
 const {r,set}=await fixture(stem,cls);
 for(const person of ['3sg','3pl']){
  set('classical-denominal-vnc-source-possessor',person);
  const request=r.buildClassicalNominalConstructionUiRequest();
  assert.equal(request.includedPossessorFamily,family);
  assert.equal(request.sourceInitialISelection,undefined);
  const result=r.evaluateClassicalNahuatlDenominalVnc(request);
  assert.equal(result.authorizationStatus,'authorized',result.blockReason);
  assert.equal(result.operationFrame.sourceFrame.possessorPerson,person);
  assert.match(result.operationFrame.targetStem,person==='3sg'?/^i-/:stem==='tlahuēlil'?/^i-n-/:/^i-m-/);
  const application=r.executeClassicalGrammarApplicationRequest({operationId:'vnc:denominal',args:[request]});
  assert.equal(application.authorizationStatus,'authorized',application.blockReason);
  assert.equal(application.lesson2WritingPass.entered,true);
  assert.ok(result.surfaceRealization);
  const boundary=result.operationFrame.includedPossessorBoundaryFrame;
  assert.equal(boundary.writtenResult.source,boundary.writingSource);
  assert.equal(result.operationFrame.targetStem.replaceAll('-',''),boundary.writtenResult.surface);
  if(family==='misfortune') {assert.equal(request.tense,'preterit');assert.equal(request.exclamatory,true);}
  const chained=r.evaluateClassicalNahuatlDenominalVnc({...request,operationId:'ti-a-causative-single',operationPath:['included-possessor-ti','ti-a-causative-single'],classChoice:'C',classChoices:{'included-possessor-ti':'A','ti-a-causative-single':'C'},objectPeople:['3sg']});
  assert.equal(chained.authorizationStatus,'blocked');
  assert.equal(chained.blockReason,'included-possessor-single-object-causative-not-licensed');
 }
});
test('unresolved lexical i and copied prior operations retain their rejection boundary',async()=>{
 const {r}=await fixture('pan','zero');
 const lexical=r.evaluateClassicalNahuatlDenominalVnc({nounStem:'ixxiptla',sourceKind:'nounstem',sourceState:'absolutive',operationId:'inceptive-ti',classChoice:'B',subject:'3sg',mood:'indicative',tense:'present'});
 assert.equal(lexical.authorizationStatus,'blocked');
 assert.match(lexical.blockReason,/initial-i/);
 const parent=r.evaluateClassicalNahuatlDenominalVnc({nounStem:'pan',sourceKind:'possessive-nnc-predicate',sourceState:'possessive',possessor:'3sg',operationId:'included-possessor-ti',classChoice:'A',subject:'3sg',mood:'indicative',tense:'present'}).operationFrame;
 assert.equal(parent.authorizationStatus,'authorized',parent.blockReason);
 const copied=r.evaluateClassicalNahuatlDenominalVnc({sourceOperationFrame:{...parent},sourceKind:'generated-vnc',sourceState:'derived',operationId:'ti-a-causative-single',classChoice:'C',objectPeople:['3sg'],subject:'3sg',mood:'indicative',tense:'present'});
 assert.equal(copied.authorizationStatus,'blocked');
});

test('the existing possessor chooser exposes source-appropriate included possessors and withdraws unsupported alternatives',async()=>{
 const {r,set,controls}=await fixture('pan','zero');
 const inventory=r.prepareClassicalDenominalVncOperationPathInventory({nounStem:'pan',sourceNounClass:'zero',subject:'3sg',mood:'indicative',tense:'present'});
 const included=inventory.pathChoices.find(p=>p.operationId==='included-possessor-ti');
 assert.deepEqual(Array.from(included.controlRequirements.sourcePossessorValues),['1sg','2sg','3sg','1pl','2pl','3pl','te','tla','3common']);
 for(const possessor of ['te','tla']){
  set('classical-denominal-vnc-source-possessor',possessor);
  const request=r.buildClassicalNominalConstructionUiRequest();
  const option=controls.get('classical-denominal-vnc-source-possessor').options.find(o=>o.value===possessor);
  assert.ok(option&&!option.hidden&&!option.disabled);
  assert.equal(request.possessor,possessor);
  const result=r.evaluateClassicalNahuatlDenominalVnc(request);
  assert.equal(result.authorizationStatus,'authorized',result.blockReason);
  assert.equal(result.operationFrame.sourceFrame.possessor,possessor==='te'?'tē':'tla');
 }
 const next=inventory.pathChoices.find(p=>p.operationId==='ti-a-causative-double-inceptive');
 assert.ok(next);
 set('classical-denominal-vnc-operation',next.operationId);
 set('classical-denominal-vnc-operation-path',next.pathChoiceId);
 const nextRequest=r.buildClassicalNominalConstructionUiRequest();
 assert.equal(nextRequest.possessor,'3sg');
 for(const value of ['te','tla']){
  const option=controls.get('classical-denominal-vnc-source-possessor').options.find(o=>o.value===value);
  assert.ok(option.hidden&&option.disabled);
 }
});

test('pan common nonanimate target retains its possessor through the licensed Class C causative',async()=>{
 const {r,set,controls}=await fixture('pan','zero');
 const request={nounStem:'pan',sourceNounClass:'zero',sourceKind:'possessive-nnc-predicate',sourceState:'possessive',possessor:'3common',subject:'1sg',mood:'indicative',tense:'present',operationId:'ti-a-causative-single',operationPath:['included-possessor-ti','ti-a-causative-single'],classChoices:{'included-possessor-ti':'A','ti-a-causative-single':'C'},classChoice:'C',objectPeople:['non-specific-nonhuman']};
 for(const tense of ['present','preterit']){
  const result=r.evaluateClassicalNahuatlDenominalVnc({...request,tense});
  assert.equal(result.authorizationStatus,'authorized',result.blockReason);
  assert.equal(result.operationFrame.targetClass,'C');
  assert.equal(result.operationFrame.objectRequests[0].objectKind,'non-specific-nonhuman');
  assert.match(result.surfaceRealization,/^nitla/);
  assert.equal(result.operationFrame.targetStem,'i-pan-ti-ā');
  assert.equal(result.operationFrame.sourceFrame.priorOperationFrame.sourceFrame.possessorPerson,'3common');
  assert.match(result.surfaceRealization,tense==='present'?/ipantia$/u:/ipantih/u);
  const app=r.executeClassicalGrammarApplicationRequest({operationId:'vnc:denominal',args:[{...request,tense}]});
  assert.equal(app.authorizationStatus,'authorized',app.blockReason);
 }
 const inventory=r.prepareClassicalDenominalVncOperationPathInventory({nounStem:'pan',sourceNounClass:'zero'});
 const path=inventory.pathChoices.find(p=>p.operationPath.join('|')==='included-possessor-ti|ti-a-causative-single');
 assert.ok(path);assert.deepEqual(Array.from(path.controlRequirements.sourcePossessorValues),['3common']);
 assert.match(path.pathLabel,/cause to hit a target/);
 set('classical-denominal-vnc-operation',path.operationId);
 set('classical-denominal-vnc-operation-path',path.pathChoiceId);
 r.buildClassicalNominalConstructionUiRequest();
 set('classical-denominal-vnc-result-object-1','non-specific-nonhuman');
 const collected=r.buildClassicalNominalConstructionUiRequest();
 assert.equal(collected.possessor,'3common');
 assert.equal(collected.objectPeople[0],'non-specific-nonhuman');
 assert.equal(controls.get('classical-denominal-vnc-source-possessor').value,'3common');
 assert.ok(controls.get('classical-denominal-vnc-result-object-1').options.some(o=>o.value==='non-specific-nonhuman'));
 const collectedResult=r.executeClassicalGrammarApplicationRequest({operationId:'vnc:denominal',args:[collected]});
 assert.equal(collectedResult.authorizationStatus,'authorized',collectedResult.blockReason);

 const ordinary=r.evaluateClassicalNahuatlDenominalVnc({...request,possessor:'3sg'});
 assert.equal(ordinary.blockReason,'included-possessor-single-object-causative-not-licensed');
});
