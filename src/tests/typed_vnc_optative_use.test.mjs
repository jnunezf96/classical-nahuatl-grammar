import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
const fixture=JSON.parse(readFileSync(new URL('./fixtures/nonce_typed_optative_use_20261023.json',import.meta.url)));
function harness(subject='1sg'){
 const first=r.requestClassicalVncApplicationResult({sourceStem:fixture.stems[0],verbClass:'A',sourceValence:'intransitive',subject,mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active'});
 assert.equal(first.authorizationStatus,'authorized');
 const source=first.resultFrame.sourceMachineryFrame,navigator=r.getClassicalGrammarApplicationCapabilityNavigator(source);
 let binding=r.issueClassicalGrammarTypedSourceOperationBindingFrame(navigator,'vnc:application',{subject,mood:'optative',tense:'nonpast',requestedDerivation:'direct',requestedVoice:'active',sentenceOptions:{introductoryParticle:'mā'}});
 assert.equal(binding.bindingStatus,'ready');
 const wrapper={hidden:true,setAttribute(){}};
 const control={value:'auto',disabled:true,options:['auto','wish-sentence','command-sentence','exhortation-sentence'].map(value=>({value})),setAttribute(){},closest:()=>wrapper};
 const ctx=vm.createContext({targetObject:{...r,document:{getElementById:id=>id==='classical-rule-logic-optative-use'?control:null}},ActiveClassicalGrammarCapabilityNavigator:navigator,getActiveClassicalGrammarTypedSourceOperationBinding:()=>binding});
 for(const name of ['getClassicalOptativeSentenceUseChoices','syncClassicalOptativeSentenceUseControl','getClassicalTypedVncOptativeUseSelections']){
  const start=code.indexOf(`    function ${name}(`),end=code.indexOf('\n    function ',start+1);vm.runInContext(code.slice(start,end),ctx);
 }
 return {ctx,source,navigator,control,wrapper,get binding(){return binding;},stage(use){const selections=ctx.getClassicalTypedVncOptativeUseSelections(binding,use);assert(selections);binding=r.issueClassicalGrammarTypedSourceOperationBindingFrame(navigator,'vnc:application',selections);return binding;}};
}

test('typed optative availability follows the current exact binding despite an indicative native mirror',()=>{
 for(const subject of ['1sg','2sg']){
  const h=harness(subject);h.ctx.syncClassicalOptativeSentenceUseControl({mood:'indicative',tense:'present'},'3sg');
  assert.equal(h.wrapper.hidden,false);assert.equal(h.control.disabled,false);
  assert.deepEqual(h.control.options.filter(o=>!o.disabled).map(o=>o.value),['auto','wish-sentence',subject==='1sg'?'exhortation-sentence':'command-sentence']);
 }
});

test('Wish and Exhortation/Command stage exact owner intent and only explicit execution accepts it',()=>{
 for(const subject of ['1sg','2sg']){
  const h=harness(subject),before=r.getClassicalGrammarWorkspaceHistorySnapshot();
  for(const use of ['wish-sentence',subject==='1sg'?'exhortation-sentence':'command-sentence']){
   h.stage(use);assert.equal(h.binding.bindingStatus,'ready',h.binding.blockReason);assert.equal(h.binding.exactSource,h.source);
   assert.equal(h.binding.callerSelections.sentenceOptions.sentenceType,use);
   assert.deepEqual(r.getClassicalGrammarWorkspaceHistorySnapshot(),before);
  }
  const result=r.executeClassicalGrammarTypedSourceOperationBindingFrame(h.binding);
  assert.equal(result.authorizationStatus,'authorized');
  assert.equal(result.canonicalResult.normalizedRequest.sentenceOptions.sentenceType,subject==='1sg'?'exhortation-sentence':'command-sentence');
 }
});

test('an incompatible use, copied binding, or different source cannot authorize the typed adapter',()=>{
 const h=harness();assert.equal(h.ctx.getClassicalTypedVncOptativeUseSelections(h.binding,'command-sentence'),null);
 assert.equal(h.ctx.getClassicalTypedVncOptativeUseSelections({...h.binding},'wish-sentence'),null);
 h.ctx.ActiveClassicalGrammarCapabilityNavigator={...h.navigator,exactSource:{}};
 assert.equal(h.ctx.getClassicalTypedVncOptativeUseSelections(h.binding,'wish-sentence'),null);
});
