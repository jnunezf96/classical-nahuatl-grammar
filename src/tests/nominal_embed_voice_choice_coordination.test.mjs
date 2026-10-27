import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import {createNominalEmbedVoiceChoiceCoordinator} from '../application/classical/nominal_embed_voice_choice_coordination.mjs';

const rendering=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
const start=rendering.indexOf('    function getClassicalRetainedNominalVncVoiceContext() {');
const end=rendering.indexOf('    function getClassicalVncContinuationBlockGuidance(',start);
assert.ok(start>=0 && end>start);

function fixture() {
 const matrix={},embed={},voiceControl={value:'passive'};
 const wrapper={hidden:false,setAttribute(){}};
 const listeners={};
 const control={value:'',disabled:false,dataset:{},isConnected:true,options:[],setAttribute(){},closest:()=>wrapper,
   replaceChildren(...options){this.options=options;},addEventListener(type,fn){(listeners[type]??=[]).push(fn);},
   dispatch(type){for(const fn of listeners[type]||[])fn({type,target:this,currentTarget:this});}};
 const issuedOwners=new WeakSet();
 let binding={operationId:'grammar:nominal-construction',selectedBindingId:'nominal-embed:matrix-vnc-result',exactResult:matrix,ownerBindingFrame:{exactResult:matrix},additionalResults:{'nominal-embed-constituent':embed}};
 issuedOwners.add(binding.ownerBindingFrame);
 let allowed=[{optionId:'lō:compound',label:'lō'}, {optionId:'hua:compound',label:'hua'}];
 let route='passive-barrier',role='adverb',projectionAvailable=true;
 const doc={getElementById:id=>id==='classical-rule-logic-nonactive-family'?control:voiceControl,createElement:()=>({})};
 const target={document:doc,getClassicalNahuatlVncContinuationSourceConstituents:()=>projectionAvailable?({sourceSubject:'3sg'}):null,
   issueClassicalNahuatlVncContinuationBindingFrame:(_id,result)=>({exactInputResult:result,ownerInputAcceptanceProven:true,ownerPreflightResult:{controlFrame:{allowedVoices:['active','passive']}}}),
   isClassicalNahuatlVncContinuationBindingFrame:b=>b?.ownerInputAcceptanceProven===true,
   isClassicalNahuatlFormationResultBindingFrame:b=>issuedOwners.has(b)};
 const ctx=vm.createContext({nominalEmbedVoiceChoiceCoordinator:createNominalEmbedVoiceChoiceCoordinator(),targetObject:target,getClassicalRetainedNominalEmbedBinding:()=>binding,
   getClassicalNominalEmbedOperands:b=>b.selectedBindingId==='nominal-embed:embed-nnc-result' ? ({matrixResult:b.additionalResults['nominal-matrix-vnc-result'],embedResult:b.exactResult}) : ({matrixResult:b.exactResult,embedResult:b.additionalResults['nominal-embed-constituent']}),
   getClassicalExactVncConstructionConstituent:r=>r&&r===(binding.selectedBindingId==='nominal-embed:embed-nnc-result'?binding.additionalResults['nominal-matrix-vnc-result']:binding.exactResult)?{resultFrame:r}:null,
   getClassicalExactNncConstructionConstituent:r=>r&&r===(binding.selectedBindingId==='nominal-embed:embed-nnc-result'?binding.exactResult:binding.additionalResults['nominal-embed-constituent'])?{resultFrame:r}:null,
   getClassicalNominalConstructionControlValue:(_id,fallback)=>fallback,
   buildClassicalNominalConstructionUiRequest:()=>({constructionKind:'nominal-embed-vnc',relation:role,route,voice:voiceControl.value,subject:'3sg',mood:'indicative',tense:'present',source:{matrixConstituent:{resultFrame:binding.selectedBindingId==='nominal-embed:embed-nnc-result'?binding.additionalResults['nominal-matrix-vnc-result']:binding.exactResult},embedConstituent:{resultFrame:binding.selectedBindingId==='nominal-embed:embed-nnc-result'?binding.exactResult:binding.additionalResults['nominal-embed-constituent']}}}),
   getClassicalNominalVncTargetVoiceOptions:()=>['active','passive'],applyClassicalRuleLogicSelectOptionAvailability:()=>{},
   getClassicalIncorporatedMatrixNonactiveOptions:req=>req.voice==='passive'?allowed:[]});
 vm.runInContext(rendering.slice(start,end),ctx);
 return {ctx,control,wrapper,voiceControl,matrix,embed,sync:()=>ctx.syncClassicalRetainedNominalVncVoiceChoices(),setBinding:v=>binding=v,setProjection:v=>projectionAvailable=v,setAllowed:v=>allowed=v,setRoute:v=>route=v,issueBinding:(nextMatrix,nextEmbed)=>{const b={operationId:'grammar:nominal-construction',selectedBindingId:'nominal-embed:matrix-vnc-result',exactResult:nextMatrix,ownerBindingFrame:{exactResult:nextMatrix},additionalResults:{'nominal-embed-constituent':nextEmbed}};issuedOwners.add(b.ownerBindingFrame);return b;},issueNounBinding:(nextMatrix,nextEmbed)=>{const b={operationId:'grammar:nominal-construction',selectedBindingId:'nominal-embed:embed-nnc-result',exactResult:nextEmbed,ownerBindingFrame:{exactResult:nextEmbed},additionalResults:{'nominal-matrix-vnc-result':nextMatrix}};issuedOwners.add(b.ownerBindingFrame);return b;},binding:()=>binding};
}

test('same exact embedded route retains an explicitly chosen formation only while inactive',()=>{
 const f=fixture();f.sync();f.control.value='lō:compound';f.control.dispatch('change');
 f.voiceControl.value='active';f.sync();assert.equal(f.control.value,'');
 f.voiceControl.value='passive';f.sync();assert.equal(f.control.value,'lō:compound');
});


test('a different exact matrix or embed cannot revive the prior choice',()=>{
 for(const which of ['matrix','embed']) {
  const f=fixture();f.sync();f.control.value='lō:compound';f.control.dispatch('change');
  f.voiceControl.value='active';f.sync();
  f.setBinding(f.issueBinding(which==='matrix'?{}:f.matrix,which==='embed'?{}:f.embed));
  f.voiceControl.value='passive';f.sync();assert.equal(f.control.value,'');
 }
});

test('a changed route or withdrawn owner option cannot revive the prior choice',()=>{
 for(const which of ['route','option']) {
  const f=fixture();f.sync();f.control.value='lō:compound';f.control.dispatch('change');
  f.voiceControl.value='active';f.sync();
  if(which==='route')f.setRoute('direct-adverb');
  else f.setAllowed([{optionId:'hua:compound',label:'hua'}, {optionId:'other',label:'other'}]);
  f.voiceControl.value='passive';f.sync();assert.equal(f.control.value,'');
 }
});

test('forged binding and disconnected control cannot record a reusable choice',()=>{
 const f=fixture();f.sync();f.control.isConnected=false;
 f.control.value='lō:compound';f.control.dispatch('change');f.control.isConnected=true;
 f.voiceControl.value='active';f.sync();f.voiceControl.value='passive';f.sync();assert.equal(f.control.value,'');
 const authentic=f.binding();
 const forged={...authentic,ownerBindingFrame:{...authentic.ownerBindingFrame}};
 f.setBinding(forged);f.control.value='lō:compound';f.control.dispatch('change');
 f.setBinding(authentic);f.voiceControl.value='active';f.sync();f.voiceControl.value='passive';f.sync();assert.equal(f.control.value,'');
});

test('an explicit changed formation replaces the remembered selection',()=>{
 const f=fixture();f.sync();f.control.value='lō:compound';f.control.dispatch('change');
 f.control.value='hua:compound';f.control.dispatch('change');
 f.voiceControl.value='active';f.sync();f.voiceControl.value='passive';f.sync();assert.equal(f.control.value,'hua:compound');
});

test('a formation remembered for one nonactive voice cannot cross into another',()=>{
 const coordinator=createNominalEmbedVoiceChoiceCoordinator();
 const scope={matrix:{},embed:{},bindingId:'matrix',structure:'adverb'};
 const choices=[{optionId:'lō:compound'}];
 assert.equal(coordinator.record(scope,'passive','lō:compound',choices),true);
 assert.equal(coordinator.resolve(scope,'active',[]),'');
 assert.equal(coordinator.resolve(scope,'impersonal',choices),'');
 assert.equal(coordinator.resolve(scope,'passive',choices),'');
});

test('the visibility exemption requires the complete supported owner context',()=>{
 for(const missing of ['embed','primary','projection']) {
  const f=fixture();assert.ok(f.ctx.getClassicalRetainedNominalVncVoiceContext());
  if(missing==='embed') f.setBinding(f.issueBinding(f.matrix,null));
  if(missing==='primary') f.setBinding({...f.binding(),selectedBindingId:'unrelated-role'});
  if(missing==='projection') f.setProjection(false);
  assert.equal(f.ctx.getClassicalRetainedNominalVncVoiceContext(),null);
 }
});


test('noun-primary exact route projects and restores the owner-licensed formation',()=>{
 const f=fixture();f.setBinding(f.issueNounBinding(f.matrix,f.embed));
 assert.ok(f.ctx.getClassicalRetainedNominalVncVoiceContext());
 f.sync();assert.equal(f.wrapper.hidden,false);
 f.control.value='lō:compound';f.control.dispatch('change');
 f.voiceControl.value='active';f.sync();assert.equal(f.control.value,'');
 f.voiceControl.value='passive';f.sync();assert.equal(f.control.value,'lō:compound');
});

test('noun-primary memory cannot cross a parent or exact binding role',()=>{
 for(const change of ['matrix','embed','role']) {
  const f=fixture();f.setBinding(f.issueNounBinding(f.matrix,f.embed));
  f.sync();f.control.value='lō:compound';f.control.dispatch('change');
  f.voiceControl.value='active';f.sync();
  if(change==='matrix')f.setBinding(f.issueNounBinding({},f.embed));
  if(change==='embed')f.setBinding(f.issueNounBinding(f.matrix,{}));
  if(change==='role')f.setBinding(f.issueBinding(f.matrix,f.embed));
  f.voiceControl.value='passive';f.sync();assert.equal(f.control.value,'');
 }
});
