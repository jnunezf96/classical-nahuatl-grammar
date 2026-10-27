import test from 'node:test';
import assert from 'node:assert/strict';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import {createVncTenseCoordinator} from '../application/classical/vnc_tense_choice_coordination.mjs';
const owner=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
function harness(stem='chōca') {
 const first=owner.evaluateClassicalNahuatlVncApplication({sourceStem:stem,verbClass:'A',sourceValence:'intransitive',subject:'1sg',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active'});
 assert.equal(first.authorizationStatus,'authorized');
 const source=first.resultFrame.sourceMachineryFrame, navigator=owner.getClassicalGrammarApplicationCapabilityNavigator(source);
 const bind=(mood,tense)=>owner.issueClassicalGrammarTypedSourceOperationBindingFrame(navigator,'vnc:application',{subject:'1sg',requestedDerivation:'direct',requestedVoice:'active',mood,tense,...(mood!=='indicative'?{sentenceOptions:{introductoryParticle:'mā'}}:{})});
 return {source,bind,coordinator:createVncTenseCoordinator(owner)};
}
const indic=['present','imperfect','future'], admon=['nonpast'], opt=['nonpast','past','future'];
test('an explicit indicative tense is retained inactive in admonitive, then restored on the same exact Source',()=>{
 const {coordinator:c,bind}=harness();let b=bind('indicative','present');
 let p=c.prepare({binding:b,choiceId:'tense',mood:'indicative',tense:'imperfect',availableTenses:indic,explicitValidated:true});
 let n=bind(p.mood,p.tense);assert(c.commit(b,n,p.receipt));b=n;
 p=c.prepare({binding:b,choiceId:'mood',mood:'admonitive',tense:'nonpast',availableTenses:admon});
 assert.equal(p.tense,'nonpast');assert.equal(p.restored,false);n=bind(p.mood,p.tense);assert(c.commit(b,n,p.receipt));b=n;
 p=c.prepare({binding:b,choiceId:'mood',mood:'indicative',tense:'present',availableTenses:indic});
 assert.equal(p.tense,'imperfect');assert.equal(p.restored,true);n=bind(p.mood,p.tense);assert.equal(n.bindingStatus,'ready');assert(c.commit(b,n,p.receipt));
 const result=owner.executeClassicalGrammarTypedSourceOperationBindingFrame(n);assert.equal(result.authorizationStatus,'authorized');assert.equal(result.canonicalResult.normalizedRequest.tense,'imperfect');
});
test('never restore a tense excluded by current source context, and explicit replacement takes precedence',()=>{
 const {coordinator:c,bind}=harness();let b=bind('indicative','present');let p=c.prepare({binding:b,choiceId:'tense',mood:'indicative',tense:'imperfect',availableTenses:indic,explicitValidated:true});let n=bind(p.mood,p.tense);assert(c.commit(b,n,p.receipt));b=n;
 p=c.prepare({binding:b,choiceId:'mood',mood:'admonitive',tense:'nonpast',availableTenses:admon});n=bind(p.mood,p.tense);assert(c.commit(b,n,p.receipt));b=n;
 p=c.prepare({binding:b,choiceId:'mood',mood:'indicative',tense:'present',availableTenses:['present']});assert.equal(p.tense,'present');assert.equal(p.restored,false);n=bind(p.mood,p.tense);assert(c.commit(b,n,p.receipt));b=n;
 p=c.prepare({binding:b,choiceId:'tense',mood:'indicative',tense:'future',availableTenses:indic,explicitValidated:true});n=bind(p.mood,p.tense);assert(c.commit(b,n,p.receipt));b=n;
 p=c.prepare({binding:b,choiceId:'mood',mood:'admonitive',tense:'nonpast',availableTenses:admon});n=bind(p.mood,p.tense);assert(c.commit(b,n,p.receipt));b=n;
 p=c.prepare({binding:b,choiceId:'mood',mood:'indicative',tense:'present',availableTenses:indic});assert.equal(p.tense,'future');
});
test('copied receipts, copied bindings, another Source and mismatched owner selections cannot carry a saved choice',()=>{
 const h=harness(),c=h.coordinator;const b=h.bind('indicative','present');
 assert.equal(c.prepare({binding:{...b},choiceId:'tense',mood:'indicative',tense:'imperfect',availableTenses:indic,explicitValidated:true}),null);
 const p=c.prepare({binding:b,choiceId:'tense',mood:'indicative',tense:'imperfect',availableTenses:indic,explicitValidated:true});
 assert.equal(c.commit(b,h.bind('indicative','imperfect'),{...p.receipt}),false);
 const other=harness('ēhua');assert.equal(c.commit(b,other.bind('indicative','imperfect'),p.receipt),false);
 assert.equal(c.commit(b,h.bind('indicative','future'),p.receipt),false);
 assert(c.commit(b,h.bind('indicative','imperfect'),p.receipt));assert.equal(c.commit(b,h.bind('indicative','imperfect'),p.receipt),false);
});
test('an unvalidated event or tense outside canonical mood domain cannot become a remembered choice',()=>{
 const {coordinator:c,bind}=harness();let b=bind('indicative','present');let p=c.prepare({binding:b,choiceId:'tense',mood:'indicative',tense:'imperfect',availableTenses:indic,explicitValidated:false});let n=bind(p.mood,p.tense);assert(c.commit(b,n,p.receipt));b=n;
 p=c.prepare({binding:b,choiceId:'mood',mood:'admonitive',tense:'nonpast',availableTenses:admon});n=bind(p.mood,p.tense);assert(c.commit(b,n,p.receipt));b=n;
 p=c.prepare({binding:b,choiceId:'mood',mood:'indicative',tense:'present',availableTenses:indic});assert.equal(p.tense,'present');assert.equal(p.restored,false);
 assert.equal(c.prepare({binding:b,choiceId:'tense',mood:'admonitive',tense:'imperfect',availableTenses:['imperfect'],explicitValidated:true}),null);
});
test('independent mood choices survive unrelated canonical rebindings and never cross Source identity',()=>{
 const {coordinator:c,bind}=harness();let b=bind('indicative','present');let p=c.prepare({binding:b,choiceId:'tense',mood:'indicative',tense:'imperfect',availableTenses:indic,explicitValidated:true});let n=bind(p.mood,p.tense);assert(c.commit(b,n,p.receipt));b=n;
 p=c.prepare({binding:b,choiceId:'mood',mood:'optative',tense:'nonpast',availableTenses:opt});n=bind(p.mood,p.tense);assert(c.commit(b,n,p.receipt));b=n;
 p=c.prepare({binding:b,choiceId:'tense',mood:'optative',tense:'future',availableTenses:opt,explicitValidated:true});n=bind(p.mood,p.tense);assert(c.commit(b,n,p.receipt));b=n;
 const rebinding=bind('optative','future');assert(c.carry(b,rebinding));b=rebinding;
 p=c.prepare({binding:b,choiceId:'mood',mood:'indicative',tense:'present',availableTenses:indic});assert.equal(p.tense,'imperfect');n=bind(p.mood,p.tense);assert(c.commit(b,n,p.receipt));b=n;
 p=c.prepare({binding:b,choiceId:'mood',mood:'optative',tense:'nonpast',availableTenses:opt});assert.equal(p.tense,'future');
 assert.equal(c.carry(b,harness('ēhua').bind('indicative','imperfect')),false);
});
test('prospective tense coordination re-queries the irregular Source for the newly selected mood and cell',async()=>{
 const {buildProspectiveVncTenseFrame}=await import('../application/classical/vnc_tense_choice_coordination.mjs');
 const prior={state:{stem:'ye',subject:'1sg',mood:'admonitive',tense:'nonpast'},machineryFrame:{lesson11ParadigmPlan:{applies:false}}};
 const next=buildProspectiveVncTenseFrame(owner,prior,{ownerBindingFrame:{ownerRequest:{sourceStem:'ye'}}},{subject:'1sg',mood:'indicative',tense:'present'});
 assert.equal(next.state.mood,'indicative');const plan=next.machineryFrame.lesson11ParadigmPlan;assert.equal(plan.irregularityKind,'suppletive');
 assert(plan.allowedParadigmTenses.includes('preterit-as-present'));assert(!plan.allowedParadigmTenses.includes('present'));assert(!plan.allowedParadigmTenses.includes('preterit'));
 assert.equal(prior.state.mood,'admonitive');
});

test('exact Result continuation retains a tense per mood without crossing its issued parent',async()=>{
 const {createVncContinuationTenseCoordinator}=await import('../application/classical/vnc_tense_choice_coordination.mjs');
 const first=owner.evaluateClassicalNahuatlVncApplication({sourceStem:'chōca',verbClass:'A',sourceValence:'intransitive',subject:'1sg',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active'});
 const source=first.resultFrame.sourceMachineryFrame, nav=owner.getClassicalGrammarApplicationCapabilityNavigator(source);
 const req={subject:'1sg',requestedDerivation:'direct',requestedVoice:'active',mood:'indicative',tense:'present'};
 const parent=owner.executeClassicalGrammarTypedSourceOperationBindingFrame(owner.issueClassicalGrammarTypedSourceOperationBindingFrame(nav,'vnc:application',req)).canonicalResult;
 const bind=(mood,tense,p=parent)=>owner.issueClassicalNahuatlVncContinuationBindingFrame('vnc:application',p,{...req,mood,tense});
 const c=createVncContinuationTenseCoordinator(owner);let b=bind('indicative','present');
 assert.equal(c.prepare({frame:{...b},parent,choiceId:'tense',mood:'indicative',tense:'imperfect',availableTenses:indic,explicitValidated:true}),null);
 let p=c.prepare({frame:b,parent,choiceId:'tense',mood:'indicative',tense:'imperfect',availableTenses:indic,explicitValidated:true});let n=bind(p.mood,p.tense);assert(c.commit(b,n,parent,p.receipt));b=n;
 p=c.prepare({frame:b,parent,choiceId:'mood',mood:'optative',tense:'nonpast',availableTenses:opt});n=bind(p.mood,p.tense);assert(c.commit(b,n,parent,p.receipt));b=n;
 p=c.prepare({frame:b,parent,choiceId:'mood',mood:'indicative',tense:'present',availableTenses:indic});assert.equal(p.tense,'imperfect');assert.equal(p.restored,true);
 n=bind(p.mood,p.tense);assert(c.commit(b,n,parent,p.receipt));assert.equal(n.bindingStatus,'ready');assert.equal(n.exactInputResult,parent);assert.equal(n.ownerPreflightResult.normalizedRequest.tense,'imperfect');
 assert.equal(c.carry(n,bind('indicative','imperfect',{...parent}),parent),false);
});
