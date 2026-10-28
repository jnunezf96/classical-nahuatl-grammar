import test from 'node:test';
import assert from 'node:assert/strict';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import {createVncBindingIntentCoordinator} from '../application/classical/vnc_binding_intent.mjs';
const owner=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
function fixture(exact=false) {
 const first=owner.evaluateClassicalNahuatlVncApplication({sourceStem:'chōca',verbClass:'A',sourceValence:'intransitive',subject:'3sg',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active'});
 const nav=owner.getClassicalGrammarApplicationCapabilityNavigator(first.resultFrame.sourceMachineryFrame);
 const base={subject:'3sg',requestedDerivation:'direct',requestedVoice:'active',mood:'indicative',tense:'present'};
 const issue=s=>exact?owner.issueClassicalNahuatlVncContinuationBindingFrame('vnc:application',first.resultFrame,s):owner.issueClassicalGrammarTypedSourceOperationBindingFrame(nav,'vnc:application',s);
 const bind=s=>issue({...base,...s});
 return {issue,bind,base,source:exact?first.resultFrame:nav.exactSource,c:createVncBindingIntentCoordinator(owner)};
}
for (const exact of [false,true]) {
 test(`${exact?'exact':'typed'} causative draft survives direct and restores exact source`,()=>{
  const {c,bind,issue,base,source}=fixture(exact);let b=bind({requestedDerivation:'causative',causativeObjectKind:'reflexive'});
  const id=((b.choiceOptionProjection||b.ownerChoiceOptionProjection).derivationOptionId||b.ownerPreflightResult.controlFrame.derivationOptionInventory.options).find(o=>o.availabilityStatus==='available'||o.authorityStatus!=='blocked').optionId;
  b=c.reissue(b,{...base,requestedDerivation:'causative',causativeObjectKind:'reflexive',derivationOptionId:id},{choiceId:'derivationOptionId',explicitValidated:true,issue});
  assert.equal(b.bindingStatus,'ready');
  b=c.reissue(b,base,{choiceId:'requestedDerivation',explicitValidated:true,issue});assert.equal(b.callerSelections.derivationOptionId,undefined);
  b=c.reissue(b,{...base,requestedDerivation:'causative',causativeObjectKind:'reflexive'},{choiceId:'requestedDerivation',explicitValidated:true,issue});
  assert.equal(b.callerSelections.derivationOptionId,id);assert.equal(b.bindingStatus,'ready');assert.equal(exact?b.exactInputResult:b.exactSource,source);
 });
 test(`${exact?'exact':'typed'} nonactive choice remains inactive then restores`,()=>{
  const {c,bind,issue,base}=fixture(exact);let b=bind({requestedVoice:'impersonal'});
  const id=((b.choiceOptionProjection||b.ownerChoiceOptionProjection).nonactiveOptionId||b.ownerPreflightResult.controlFrame.nonactiveOptionInventory.options).find(o=>o.availabilityStatus==='available'||o.authorityStatus!=='blocked').optionId;
  b=c.reissue(b,{...base,requestedVoice:'impersonal',nonactiveOptionId:id},{choiceId:'nonactiveOptionId',explicitValidated:true,issue});
  b=c.reissue(b,base,{choiceId:'requestedVoice',issue});assert.equal(b.callerSelections.nonactiveOptionId,undefined);
  b=c.reissue(b,{...base,requestedVoice:'impersonal'},{choiceId:'requestedVoice',issue});assert.equal(b.callerSelections.nonactiveOptionId,id);
 });
 test(`${exact?'exact':'typed'} refuses copied binding, wrong source, and changed binding kind`,()=>{
  const {c,bind,base,issue}=fixture(exact),b=bind({}),other=fixture(exact),otherKind=fixture(!exact);
  assert.equal(c.reissue({...b},base,{issue}),null);
  assert.equal(c.reissue(b,base,{issue:other.issue}),null);
  assert.equal(c.reissue(b,base,{issue:otherKind.issue}),null);
  assert.equal(c.reissue(b,base,{issue:()=>({...b})}),null);
 });
 test(`${exact?'exact':'typed'} nested sentence memory survives later tense reissue`,()=>{
  const {c,bind,issue,base}=fixture(exact);let b=bind({mood:'optative',tense:'nonpast'});
  const opt={...base,mood:'optative',tense:'nonpast'};
  b=c.reissue(b,{...opt,sentenceOptions:{introductoryParticle:'tlā',prefaceParticle:'ye'}},{choiceId:'prefaceParticle',explicitValidated:true,issue});assert.equal(b.bindingStatus,'ready');
  b=c.reissue(b,{...opt,tense:'future',sentenceOptions:{introductoryParticle:'tlā',prefaceParticle:'ye'}},{choiceId:'tense',explicitValidated:true,issue});
  b=c.reissue(b,{...base},{choiceId:'mood',issue});
  b=c.reissue(b,{...opt,sentenceOptions:{introductoryParticle:'tlā'}},{choiceId:'mood',issue});
  assert.equal(b.callerSelections.tense,'future');assert.equal(b.callerSelections.sentenceOptions.prefaceParticle,'ye');
  const request={...opt,tense:'future',sentenceOptions:{introductoryParticle:'mā'}};
  const n=c.reissue(b,request,{choiceId:'introductoryParticle',explicitValidated:true,issue});request.sentenceOptions.introductoryParticle='forged';
  assert.equal(n.callerSelections.sentenceOptions.introductoryParticle,'mā');
  b=c.reissue(n,{...opt,tense:'future',sentenceOptions:{introductoryParticle:'tlā'}},{choiceId:'introductoryParticle',explicitValidated:true,issue});assert.equal(b.callerSelections.sentenceOptions.prefaceParticle,'ye');
 });
}
test('typed applicative participant memory survives an intervening tense reissue',()=>{
 const {c,bind,issue,base}=fixture();
 const initial={...base,requestedDerivation:'applicative',applicativeObjectKind:'specific-projective',derivationOptionId:'applicative:type-one:optional-final-vowel-replacement:chōca:chōqu-iā'};
 let b=bind(initial);
 b=c.reissue(b,{...initial,applicativeObjectPerson:'2pl'},{choiceId:'applicativeObjectPerson',explicitValidated:true,issue});assert.equal(b.bindingStatus,'ready');
 b=c.reissue(b,{...b.callerSelections,applicativeObjectKind:'nonspecific-human'},{choiceId:'applicativeObjectKind',explicitValidated:true,issue});assert.equal(b.callerSelections.applicativeObjectPerson,undefined);
 b=c.reissue(b,{...b.callerSelections,tense:'imperfect'},{choiceId:'tense',explicitValidated:true,issue});
 b=c.reissue(b,{...b.callerSelections,applicativeObjectKind:'specific-projective'},{choiceId:'applicativeObjectKind',explicitValidated:true,issue});assert.equal(b.callerSelections.applicativeObjectPerson,'2pl');assert.equal(b.bindingStatus,'ready');
 assert.equal(c.reissue(b,{...b.callerSelections,applicativeObjectPerson:'forged'},{choiceId:'applicativeObjectPerson',explicitValidated:true,issue}),null);
});
test('exact rejected reflexive draft remains authentic and correctable without replacing its parent',()=>{
 const first=owner.evaluateClassicalNahuatlVncApplication({sourceStem:'chīhua',verbClass:'B',sourceValence:'mainline-reflexive',subject:'1pl',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active'});
 const nav=owner.getClassicalGrammarApplicationCapabilityNavigator(first.resultFrame.sourceMachineryFrame);
 const base={subject:'1pl',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active'};
 const parent=owner.executeClassicalGrammarTypedSourceOperationBindingFrame(owner.issueClassicalGrammarTypedSourceOperationBindingFrame(nav,'vnc:application',base)).canonicalResult;
 const issue=s=>owner.issueClassicalNahuatlVncContinuationBindingFrame('vnc:application',parent,s),c=createVncBindingIntentCoordinator(owner);
 let b=issue({...base,objectInterpretation:'reciprocal'});
 b=c.reissue(b,{...base,subject:'1sg',objectInterpretation:'reciprocal'},{choiceId:'subject',explicitValidated:true,issue});
 assert.equal(b.bindingStatus,'rejected');assert.equal(b.executionArgs.length,0);assert.equal(b.exactInputResult,parent);
 b=c.reissue(b,{objectInterpretation:'reflexive'},{choiceId:'objectInterpretation',explicitValidated:true,issue});
 assert.equal(b.bindingStatus,'ready');assert.equal(b.callerSelections.subject,'1sg');assert.equal(b.exactInputResult,parent);
});

for(const exact of [false,true])test(`${exact?'exact':'typed'} carry preserves helper memory across an additional owner-issued final binding`,()=>{
 const {c,bind,issue,base}=fixture(exact);const opt={...base,mood:'optative',tense:'nonpast'};
 let b=c.reissue(bind(opt),{...opt,sentenceOptions:{introductoryParticle:'tlā',prefaceParticle:'ye'}},{choiceId:'prefaceParticle',explicitValidated:true,issue});
 b=c.reissue(b,{...b.callerSelections,tense:'future'},{choiceId:'tense',explicitValidated:true,issue});
 const next=issue({...b.callerSelections});assert.notEqual(next,b);assert.equal(c.carry(b,next),true);
 assert.equal(c.carry({...b},next),false);assert.equal(c.carry(b,fixture(exact).bind({})),false);assert.equal(c.carry(b,fixture(!exact).bind({})),false);
 b=c.reissue(next,base,{choiceId:'mood',issue});b=c.reissue(b,{...opt,sentenceOptions:{introductoryParticle:'tlā'}},{choiceId:'mood',issue});
 assert.equal(b.callerSelections.tense,'future');assert.equal(b.callerSelections.sentenceOptions.prefaceParticle,'ye');
});
