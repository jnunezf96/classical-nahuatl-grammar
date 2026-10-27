import test from 'node:test';
import assert from 'node:assert/strict';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import {createSentenceChoiceCoordinator} from '../application/classical/sentence_choice_coordination.mjs';
const owner=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
function harness(exact=false) {
 const first=owner.evaluateClassicalNahuatlVncApplication({sourceStem:'chōca',verbClass:'A',sourceValence:'intransitive',subject:'1sg',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active'});
 const nav=owner.getClassicalGrammarApplicationCapabilityNavigator(first.resultFrame.sourceMachineryFrame);
 const base={subject:'1sg',requestedDerivation:'direct',requestedVoice:'active',mood:'indicative',tense:'present'};
 const typed=s=>owner.issueClassicalGrammarTypedSourceOperationBindingFrame(nav,'vnc:application',{...base,...s});
 const parent=owner.executeClassicalGrammarTypedSourceOperationBindingFrame(typed({})).canonicalResult;
 const bind=exact?s=>owner.issueClassicalNahuatlVncContinuationBindingFrame('vnc:application',parent,{...base,...s}):typed;
 return {bind,c:createSentenceChoiceCoordinator(owner),parent};
}
for(const exact of [false,true])test(`${exact?'exact':'typed'} sentence choices stay inactive then restore only within their authorized context`,()=>{
 const {bind,c}=harness(exact);let b=bind({mood:'optative',tense:'nonpast',sentenceOptions:{introductoryParticle:'tlā'}});
 let n=bind({mood:'optative',tense:'nonpast',sentenceOptions:{introductoryParticle:'tlā',prefaceParticle:'ye'}});
 b=c.handoff(b,n,{choiceId:'prefaceParticle',explicitValidated:true,issue:bind});assert.equal(b.bindingStatus,'ready');
 n=bind({mood:'optative',tense:'nonpast',sentenceOptions:{introductoryParticle:'mā'}});
 b=c.handoff(b,n,{choiceId:'introductoryParticle',explicitValidated:true,issue:bind});assert.notEqual(b.callerSelections.sentenceOptions.prefaceParticle,'ye');
 n=bind({mood:'optative',tense:'nonpast',sentenceOptions:{introductoryParticle:'tlā'}});
 b=c.handoff(b,n,{choiceId:'introductoryParticle',explicitValidated:true,issue:bind});assert.equal(b.callerSelections.sentenceOptions.prefaceParticle,'ye');
 const forged=c.handoff({...b},n,{choiceId:'other',issue:bind});assert.equal(forged,n);
});
test('canonical sentence domains obey Andrews omission, intensification, command and admonitive boundaries',()=>{
 const contract=owner.getClassicalNahuatlSentenceChoiceContract;
 assert.equal(typeof contract,'function');
 assert(contract({mood:'optative',tense:'nonpast',subject:'2sg'}).introductoryParticleValues.includes('none'));
 assert(!contract({mood:'optative',tense:'future',subject:'2sg'}).introductoryParticleValues.includes('none'));
 assert.deepEqual(contract({mood:'optative',tense:'nonpast',subject:'1sg',introductoryParticle:'mā'}).prefaceParticleValues,['none','ihyo']);
 assert(contract({mood:'optative',tense:'future',introductoryParticle:'mā'}).introductoryModifierValues.includes('quin'));
 assert(!contract({mood:'optative',tense:'nonpast',introductoryParticle:'mā'}).introductoryModifierValues.includes('quin'));
 assert.deepEqual(contract({mood:'admonitive',polarityMode:'negative'}).introductoryModifierValues,['nēn']);
});
test('an explicit none replaces a retained preface and memory never crosses exact Source identity',()=>{
 const a=harness(),b=harness();let first=a.bind({mood:'optative',tense:'nonpast',sentenceOptions:{introductoryParticle:'tlā',prefaceParticle:'ye'}});
 first=a.c.handoff(a.bind({mood:'optative',tense:'nonpast',sentenceOptions:{introductoryParticle:'tlā'}}),first,{choiceId:'prefaceParticle',explicitValidated:true,issue:a.bind});
 const none=a.bind({mood:'optative',tense:'nonpast',sentenceOptions:{introductoryParticle:'tlā',prefaceParticle:''}});
 let current=a.c.handoff(first,none,{choiceId:'prefaceParticle',explicitValidated:true,issue:a.bind});
 current=a.c.handoff(current,a.bind({mood:'indicative',tense:'present'}),{issue:a.bind});
 current=a.c.handoff(current,a.bind({mood:'optative',tense:'nonpast',sentenceOptions:{introductoryParticle:'tlā'}}),{issue:a.bind});
 assert.notEqual(current.callerSelections.sentenceOptions.prefaceParticle,'ye');
 const foreign=b.bind({mood:'optative',tense:'nonpast',sentenceOptions:{introductoryParticle:'tlā'}});
 assert.equal(a.c.handoff(first,foreign,{issue:b.bind}),foreign);
});
test('particle honorific request remains inactive only on the same issued source and can be explicitly cleared',async()=>{
 const {createParticleHonorificChoiceCoordinator}=await import('../application/classical/sentence_choice_coordination.mjs');
 const h=harness(),b=h.bind({}),c=createParticleHonorificChoiceCoordinator(owner);
 assert.equal(c.select({binding:b,particleId:'l3-o-behold',requested:true,explicit:true}).selected,true);
 assert.equal(c.select({binding:b,particleId:'none',requested:false}).selected,false);
 assert.equal(c.select({binding:b,particleId:'l3-o-behold',requested:false}).selected,true);
 assert.equal(c.select({binding:harness().bind({}),particleId:'l3-o-behold',requested:false}).selected,false);
 assert.equal(c.select({binding:{...b},particleId:'l3-o-behold',requested:true,explicit:true}).selected,false);
 assert.equal(c.select({binding:b,particleId:'l3-o-behold',requested:false,explicit:true}).selected,false);
});
test('antecessive returns only in eligible tense and positive admonitive none survives obligatory negative nēn',()=>{
 const {bind,c}=harness();let b=bind({tense:'imperfect',sentenceOptions:{sentenceAntecessive:true,antecessive:true,outsidePrefixes:['ō#']}});
 b=c.handoff(bind({tense:'imperfect'}),b,{choiceId:'sentenceAntecessive',explicitValidated:true,issue:bind});
 b=c.handoff(b,bind({tense:'present'}),{issue:bind});assert.notEqual(b.callerSelections.sentenceOptions?.sentenceAntecessive,true);
 b=c.handoff(b,bind({tense:'imperfect'}),{issue:bind});assert.equal(b.callerSelections.sentenceOptions.sentenceAntecessive,true);
 let a=bind({mood:'admonitive',tense:'nonpast',sentenceOptions:{introductoryParticle:'mā',introductoryModifier:''}});
 a=c.handoff(bind({mood:'admonitive',tense:'nonpast',sentenceOptions:{introductoryParticle:'mā',introductoryModifier:'nēn'}}),a,{choiceId:'introductoryModifier',explicitValidated:true,issue:bind});
 a=c.handoff(a,bind({mood:'admonitive',tense:'nonpast',sentenceOptions:{introductoryParticle:'mā',introductoryModifier:'nēn',negative:true}}),{issue:bind});assert.equal(a.callerSelections.sentenceOptions.introductoryModifier,'nēn');
 a=c.handoff(a,bind({mood:'admonitive',tense:'nonpast',sentenceOptions:{introductoryParticle:'mā',introductoryModifier:'nēn',negative:false}}),{issue:bind});assert.equal(a.callerSelections.sentenceOptions.introductoryModifier,'');
});
test('applied-source session retains only a nonauthorizing particle preference and resets on a new session',async()=>{
 const {createParticleHonorificChoiceCoordinator}=await import('../application/classical/sentence_choice_coordination.mjs');
 const c=createParticleHonorificChoiceCoordinator(owner),session=c.beginSession(),first=harness().bind({}),renewed=harness().bind({});
 c.select({binding:first,session,particleId:'l3-o-behold',requested:true,explicit:true});
 assert.equal(c.select({binding:renewed,session,particleId:'l3-o-behold'}).selected,true);
 assert.equal(c.select({binding:renewed,session:{...session},particleId:'l3-o-behold'}).selected,false);
 assert.equal(c.select({binding:renewed,session:c.beginSession(),particleId:'l3-o-behold'}).selected,false);
 assert.equal(c.select({binding:{...renewed},session,particleId:'l3-o-behold'}).selected,false);
});
